const fs = require('fs');
const path = require('path');
const csv = require('csv-parser');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

/**
 * Valida y parsea un archivo CSV
 * Estructura esperada del CSV:
 * carrera,grupo,semestre,materia,profesor,tipo_espacio,aula,dia,hora_inicio,hora_fin,turno,edificio,piso,observaciones
 */
exports.importarHorariosCSV = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se ha proporcionado un archivo' });
    }

    const filePath = req.file.path;
    const results = [];
    const errores = [];
    let registrosProcesados = 0;

    // Leer el CSV
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        registrosProcesados++;
        results.push(data);
      })
      .on('end', async () => {
        try {
          const validacionResultado = await validarYProcesarRegistros(results);

          // Limpiar archivo
          fs.unlinkSync(filePath);

          res.json({
            mensaje: 'Importación completada',
            totalRegistros: registrosProcesados,
            registrosValidos: validacionResultado.validos.length,
            registrosErroneos: validacionResultado.erroneos.length,
            detalles: validacionResultado.erroneos.length > 0 ? validacionResultado.erroneos : [] ,
            datosImportados: validacionResultado.validos.length > 0 ? validacionResultado.validos.slice(0, 5) : [],
          });
        } catch (error) {
          console.error('Error al procesar CSV:', error);
          fs.unlinkSync(filePath);
          res.status(500).json({ error: 'Error al procesar el archivo CSV', detalles: error.message });
        }
      })
      .on('error', (error) => {
        console.error('Error al leer CSV:', error);
        if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
        res.status(500).json({ error: 'Error al leer el archivo CSV' });
      });
  } catch (error) {
    console.error('Error en importarHorariosCSV:', error);
    res.status(500).json({ error: 'Error en la importación' });
  }
};

/**
 * Valida y procesa los registros del CSV
 */
async function validarYProcesarRegistros(registros) {
  const validos = [];
  const erroneos = [];
  const diasValidos = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES', 'SABADO'];

  for (let i = 0; i < registros.length; i++) {
    const fila = i + 2; // +1 por header, +1 porque es 1-indexed
    const registro = registros[i];

    try {
      // Validar campos obligatorios
      const camposObligatorios = ['carrera', 'grupo', 'semestre', 'materia', 'profesor', 'tipo_espacio', 'aula', 'dia', 'hora_inicio', 'hora_fin'];
      
      for (const campo of camposObligatorios) {
        if (!registro[campo] || registro[campo].trim() === '') {
          throw new Error(`Campo obligatorio faltante: ${campo}`);
        }
      }

      // Validar formato de hora
      if (!validarFormatoHora(registro.hora_inicio) || !validarFormatoHora(registro.hora_fin)) {
        throw new Error(`Formato de hora inválido. Usa HH:MM (ej: 08:00)`);
      }

      // Validar día
      const dia = registro.dia.trim().toUpperCase();
      if (!diasValidos.includes(dia)) {
        throw new Error(`Día inválido: ${registro.dia}. Debe ser uno de: ${diasValidos.join(', ')}`);
      }

      // Validar tipo de espacio
      const tipoEspacio = registro.tipo_espacio.trim().toUpperCase();
      if (!['AULA', 'LABORATORIO', 'AUDITORIO'].includes(tipoEspacio)) {
        throw new Error(`Tipo de espacio inválido: ${registro.tipo_espacio}`);
      }

      // Buscar o crear carrera
      let carrera = await prisma.carrera.findUnique({
        where: { codigo: registro.carrera.trim() },
      });

      if (!carrera) {
        carrera = await prisma.carrera.create({
          data: {
            codigo: registro.carrera.trim(),
            nombre: registro.carrera.trim(),
            semestres: 8,
          },
        });
      }

      // Buscar o crear profesor
      const nombreProfesor = registro.profesor.trim();
      let profesor = await prisma.profesor.findFirst({
        where: { nombre: nombreProfesor },
      });

      if (!profesor) {
        profesor = await prisma.profesor.create({
          data: {
            nombre: nombreProfesor,
            email: `${nombreProfesor.toLowerCase().replace(/\s+/g, '.')}@universidad.edu`,
            cedula: `P${Math.random().toString().substring(2, 10)}`,
          },
        });
      }

      // Buscar o crear materia
      const nombreMateria = registro.materia.trim();
      let materia = await prisma.materia.findFirst({
        where: { nombre: nombreMateria },
      });

      if (!materia) {
        materia = await prisma.materia.create({
          data: {
            nombre: nombreMateria,
            codigo: nombreMateria.substring(0, 4).toUpperCase() + Math.random().toString().substring(2, 5),
            creditos: 3,
            semestre: parseInt(registro.semestre) || 1,
          },
        });
      }

      // Buscar o crear grupo
      const codigoGrupo = registro.grupo.trim();
      let grupo = await prisma.grupo.findFirst({
        where: { codigo: codigoGrupo },
      });

      if (!grupo) {
        grupo = await prisma.grupo.create({
          data: {
            codigo: codigoGrupo,
            numero: parseInt(codigoGrupo.split('-')[codigoGrupo.split('-').length - 1]) || 1,
            semestre: parseInt(registro.semestre) || 1,
            carreraId: carrera.id,
            turno: registro.turno ? registro.turno.trim().toUpperCase() : 'DIURNO',
            capacidad: 40,
          },
        });
      }

      // Buscar o crear espacio
      const nombreEspacio = registro.aula.trim();
      let espacio = await prisma.espacio.findUnique({
        where: { nombre: nombreEspacio },
      });

      if (!espacio) {
        espacio = await prisma.espacio.create({
          data: {
            nombre: nombreEspacio,
            codigo: nombreEspacio.toUpperCase().replace(/\s+/g, '-'),
            tipo: tipoEspacio,
            edificio: registro.edificio ? registro.edificio.trim() : 'Edificio A',
            piso: registro.piso ? parseInt(registro.piso) : 1,
            capacidad: 40,
          },
        });
      }

      // Buscar período activo o crear uno
      let periodo = await prisma.periodo.findFirst({
        where: { estado: 'ACTIVO' },
      });

      if (!periodo) {
        periodo = await prisma.periodo.create({
          data: {
            nombre: 'Período Actual',
            fechaInicio: new Date(),
            fechaFin: new Date(new Date().getFullYear(), 11, 31),
            estado: 'ACTIVO',
          },
        });
      }

      // Crear horario
      const horario = await prisma.horario.create({
        data: {
          grupoId: grupo.id,
          materiaId: materia.id,
          profesorId: profesor.id,
          espacioId: espacio.id,
          periodoId: periodo.id,
          diaSemana: dia,
          horaInicio: registro.hora_inicio.trim(),
          horaFin: registro.hora_fin.trim(),
          observaciones: registro.observaciones || null,
        },
      });

      validos.push({
        fila,
        status: 'IMPORTADO',
        horario: {
          carrera: carrera.nombre,
          grupo: grupo.codigo,
          materia: materia.nombre,
          profesor: profesor.nombre,
          aula: espacio.nombre,
          dia: dia,
          hora: `${registro.hora_inicio} - ${registro.hora_fin}`,
        },
      });
    } catch (error) {
      erroneos.push({
        fila,
        status: 'ERROR',
        error: error.message,
        datos: registro,
      });
    }
  }

  return { validos, erroneos };
}

/**
 * Valida el formato de hora (HH:MM)
 */
function validarFormatoHora(hora) {
  const patron = /^([01]\d|2[0-3]):([0-5]\d)$/;
  return patron.test(hora.trim());
}

/**
 * Obtener historial de importaciones
 */
exports.obtenerImportaciones = async (req, res) => {
  try {
    const importaciones = await prisma.importacionCSV.findMany({
      orderBy: { createdAt: 'desc' },
    });

    res.json(importaciones);
  } catch (error) {
    console.error('Error en obtenerImportaciones:', error);
    res.status(500).json({ error: 'Error al obtener importaciones' });
  }
};

/**
 * Descargar plantilla de CSV
 */
exports.descargarPlantillaCSV = async (req, res) => {
  try {
    const plantilla = `carrera,grupo,semestre,materia,profesor,tipo_espacio,aula,dia,hora_inicio,hora_fin,turno,edificio,piso,observaciones
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,LUNES,08:00,10:00,DIURNO,Edificio A,1,Primera clase
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,MIERCOLES,08:00,10:00,DIURNO,Edificio A,1,Continuación
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,VIERNES,08:00,10:00,DIURNO,Edificio A,1,Cierre semana
ADM-EMP,ADM-EMP-1A,1,Administración General,Dra. María López,AULA,Aula 103,LUNES,09:00,11:00,DIURNO,Edificio A,1,
ADM-EMP,ADM-EMP-1A,1,Administración General,Dra. María López,AULA,Aula 103,MIERCOLES,09:00,11:00,DIURNO,Edificio A,1,`;

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="plantilla_horarios.csv"');
    res.send(plantilla);
  } catch (error) {
    console.error('Error en descargarPlantillaCSV:', error);
    res.status(500).json({ error: 'Error al descargar plantilla' });
  }
};
