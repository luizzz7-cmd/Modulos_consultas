const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Obtener todos los grupos
exports.obtenerGrupos = async (req, res) => {
  try {
    const { carreraId, semestre, turno } = req.query;

    const filtros = {};
    if (carreraId) filtros.carreraId = carreraId;
    if (semestre) filtros.semestre = parseInt(semestre);
    if (turno) filtros.turno = turno.toUpperCase();

    const grupos = await prisma.grupo.findMany({
      where: filtros,
      include: {
        carrera: true,
        materias: { include: { materia: true } },
      },
      orderBy: { codigo: 'asc' },
    });

    res.json(grupos);
  } catch (error) {
    console.error('Error en obtenerGrupos:', error);
    res.status(500).json({ error: 'Error al obtener grupos' });
  }
};

// Obtener un grupo por ID
exports.obtenerGrupoPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const grupo = await prisma.grupo.findUnique({
      where: { id },
      include: {
        carrera: true,
        materias: { include: { materia: true } },
        horarios: {
          include: {
            materia: true,
            profesor: true,
            espacio: true,
            periodo: true,
          },
          orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
        },
      },
    });

    if (!grupo) {
      return res.status(404).json({ error: 'Grupo no encontrado' });
    }

    res.json(grupo);
  } catch (error) {
    console.error('Error en obtenerGrupoPorId:', error);
    res.status(500).json({ error: 'Error al obtener grupo' });
  }
};

// Crear un nuevo grupo
exports.crearGrupo = async (req, res) => {
  try {
    const { codigo, numero, semestre, turno, carreraId, capacidad } = req.body;

    if (!codigo || !numero || !semestre || !carreraId) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const grupo = await prisma.grupo.create({
      data: {
        codigo,
        numero: parseInt(numero),
        semestre: parseInt(semestre),
        turno: turno ? turno.toUpperCase() : 'DIURNO',
        carreraId,
        capacidad: parseInt(capacidad) || 40,
      },
      include: {
        carrera: true,
      },
    });

    res.status(201).json(grupo);
  } catch (error) {
    console.error('Error en crearGrupo:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El grupo ya existe para esta combinación de carrera, semestre y turno' });
    }
    res.status(500).json({ error: 'Error al crear grupo' });
  }
};

// Actualizar un grupo
exports.actualizarGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { codigo, numero, semestre, turno, capacidad } = req.body;

    const grupo = await prisma.grupo.update({
      where: { id },
      data: {
        ...(codigo && { codigo }),
        ...(numero && { numero: parseInt(numero) }),
        ...(semestre && { semestre: parseInt(semestre) }),
        ...(turno && { turno: turno.toUpperCase() }),
        ...(capacidad && { capacidad: parseInt(capacidad) }),
      },
    });

    res.json(grupo);
  } catch (error) {
    console.error('Error en actualizarGrupo:', error);
    res.status(500).json({ error: 'Error al actualizar grupo' });
  }
};

// Eliminar un grupo
exports.eliminarGrupo = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.grupo.delete({
      where: { id },
    });

    res.json({ mensaje: 'Grupo eliminado correctamente' });
  } catch (error) {
    console.error('Error en eliminarGrupo:', error);
    res.status(500).json({ error: 'Error al eliminar grupo' });
  }
};

// Obtener horarios de un grupo
exports.obtenerHorariosGrupo = async (req, res) => {
  try {
    const { id } = req.params;
    const { periodoId } = req.query;

    const filtros = { grupoId: id };
    if (periodoId) filtros.periodoId = periodoId;

    const horarios = await prisma.horario.findMany({
      where: filtros,
      include: {
        materia: true,
        profesor: true,
        espacio: true,
        periodo: true,
      },
      orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
    });

    res.json(horarios);
  } catch (error) {
    console.error('Error en obtenerHorariosGrupo:', error);
    res.status(500).json({ error: 'Error al obtener horarios del grupo' });
  }
};
