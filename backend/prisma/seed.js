const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando seed de datos...');

  // Limpiar datos existentes
  await prisma.horario.deleteMany({});
  await prisma.grupoMateria.deleteMany({});
  await prisma.profesorCarrera.deleteMany({});
  await prisma.profesorMateria.deleteMany({});
  await prisma.grupo.deleteMany({});
  await prisma.espacio.deleteMany({});
  await prisma.materia.deleteMany({});
  await prisma.profesor.deleteMany({});
  await prisma.periodo.deleteMany({});
  await prisma.carrera.deleteMany({});

  console.log('Base de datos limpiada');

  // ============ CREAR CARRERAS ============
  const carreraIngenieria = await prisma.carrera.create({
    data: {
      nombre: 'Ingeniería en Sistemas',
      codigo: 'ING-SIS',
      descripcion: 'Carrera de Ingeniería en Sistemas Computacionales',
      semestres: 8,
    },
  });

  const carreraAdministracion = await prisma.carrera.create({
    data: {
      nombre: 'Administración de Empresas',
      codigo: 'ADM-EMP',
      descripcion: 'Carrera de Administración de Empresas',
      semestres: 8,
    },
  });

  const carreraContabilidad = await prisma.carrera.create({
    data: {
      nombre: 'Contabilidad',
      codigo: 'CONT',
      descripcion: 'Carrera de Contabilidad',
      semestres: 8,
    },
  });

  const carreraDerecho = await prisma.carrera.create({
    data: {
      nombre: 'Derecho',
      codigo: 'DER',
      descripcion: 'Carrera de Derecho',
      semestres: 10,
    },
  });

  console.log('✓ Carreras creadas');

  // ============ CREAR PROFESORES ============
  const profesor1 = await prisma.profesor.create({
    data: {
      nombre: 'Dr. Carlos Mendoza',
      email: 'carlos.mendoza@universidad.edu',
      cedula: '9876543',
      telefono: '+34 912 345 678',
      departamento: 'Ingeniería',
    },
  });

  const profesor2 = await prisma.profesor.create({
    data: {
      nombre: 'Dra. María López',
      email: 'maria.lopez@universidad.edu',
      cedula: '9876544',
      telefono: '+34 912 345 679',
      departamento: 'Administración',
    },
  });

  const profesor3 = await prisma.profesor.create({
    data: {
      nombre: 'Ing. José García',
      email: 'jose.garcia@universidad.edu',
      cedula: '9876545',
      telefono: '+34 912 345 680',
      departamento: 'Ingeniería',
    },
  });

  const profesor4 = await prisma.profesor.create({
    data: {
      nombre: 'Lic. Ana Martínez',
      email: 'ana.martinez@universidad.edu',
      cedula: '9876546',
      telefono: '+34 912 345 681',
      departamento: 'Contabilidad',
    },
  });

  const profesor5 = await prisma.profesor.create({
    data: {
      nombre: 'Dr. Roberto Fernández',
      email: 'roberto.fernandez@universidad.edu',
      cedula: '9876547',
      telefono: '+34 912 345 682',
      departamento: 'Derecho',
    },
  });

  const profesor6 = await prisma.profesor.create({
    data: {
      nombre: 'Msc. Laura Sánchez',
      email: 'laura.sanchez@universidad.edu',
      cedula: '9876548',
      telefono: '+34 912 345 683',
      departamento: 'Ingeniería',
    },
  });

  console.log('✓ Profesores creados');

  // ============ CREAR ASOCIACIONES PROFESOR-CARRERA ============
  await prisma.profesorCarrera.create({
    data: { profesorId: profesor1.id, carreraId: carreraIngenieria.id },
  });
  await prisma.profesorCarrera.create({
    data: { profesorId: profesor3.id, carreraId: carreraIngenieria.id },
  });
  await prisma.profesorCarrera.create({
    data: { profesorId: profesor6.id, carreraId: carreraIngenieria.id },
  });
  await prisma.profesorCarrera.create({
    data: { profesorId: profesor2.id, carreraId: carreraAdministracion.id },
  });
  await prisma.profesorCarrera.create({
    data: { profesorId: profesor4.id, carreraId: carreraContabilidad.id },
  });
  await prisma.profesorCarrera.create({
    data: { profesorId: profesor5.id, carreraId: carreraDerecho.id },
  });

  console.log('✓ Asociaciones Profesor-Carrera creadas');

  // ============ CREAR MATERIAS ============
  const materia1 = await prisma.materia.create({
    data: {
      nombre: 'Programación I',
      codigo: 'PROG-1',
      creditos: 4,
      semestre: 1,
      descripcion: 'Fundamentos de programación con Python',
    },
  });

  const materia2 = await prisma.materia.create({
    data: {
      nombre: 'Bases de Datos',
      codigo: 'BD',
      creditos: 4,
      semestre: 3,
      descripcion: 'Diseño y modelado de bases de datos relacionales',
    },
  });

  const materia3 = await prisma.materia.create({
    data: {
      nombre: 'Desarrollo Web',
      codigo: 'WEB',
      creditos: 4,
      semestre: 4,
      descripcion: 'Desarrollo de aplicaciones web con React y Node.js',
    },
  });

  const materia4 = await prisma.materia.create({
    data: {
      nombre: 'Administración General',
      codigo: 'ADM-GEN',
      creditos: 3,
      semestre: 1,
      descripcion: 'Principios de administración empresarial',
    },
  });

  const materia5 = await prisma.materia.create({
    data: {
      nombre: 'Contabilidad Financiera',
      codigo: 'CONT-FIN',
      creditos: 3,
      semestre: 2,
      descripcion: 'Principios de contabilidad financiera',
    },
  });

  const materia6 = await prisma.materia.create({
    data: {
      nombre: 'Derecho Constitucional',
      codigo: 'DER-CONS',
      creditos: 4,
      semestre: 1,
      descripcion: 'Estudio de la constitución y derechos fundamentales',
    },
  });

  const materia7 = await prisma.materia.create({
    data: {
      nombre: 'Estructura de Datos',
      codigo: 'EDatos',
      creditos: 4,
      semestre: 2,
      descripcion: 'Estructuras de datos y algoritmos',
    },
  });

  console.log('✓ Materias creadas');

  // ============ CREAR ASOCIACIONES PROFESOR-MATERIA ============
  await prisma.profesorMateria.create({
    data: { profesorId: profesor1.id, materiaId: materia1.id },
  });
  await prisma.profesorMateria.create({
    data: { profesorId: profesor1.id, materiaId: materia2.id },
  });
  await prisma.profesorMateria.create({
    data: { profesorId: profesor3.id, materiaId: materia3.id },
  });
  await prisma.profesorMateria.create({
    data: { profesorId: profesor6.id, materiaId: materia1.id },
  });
  await prisma.profesorMateria.create({
    data: { profesorId: profesor3.id, materiaId: materia7.id },
  });
  await prisma.profesorMateria.create({
    data: { profesorId: profesor2.id, materiaId: materia4.id },
  });
  await prisma.profesorMateria.create({
    data: { profesorId: profesor4.id, materiaId: materia5.id },
  });
  await prisma.profesorMateria.create({
    data: { profesorId: profesor5.id, materiaId: materia6.id },
  });

  console.log('✓ Asociaciones Profesor-Materia creadas');

  // ============ CREAR ESPACIOS (AULAS Y LABORATORIOS) ============
  const espacio1 = await prisma.espacio.create({
    data: {
      nombre: 'Aula 101',
      codigo: 'A101',
      tipo: 'AULA',
      edificio: 'Edificio A',
      piso: 1,
      capacidad: 40,
      recursos: JSON.stringify({ proyector: true, computadora: false }),
    },
  });

  const espacio2 = await prisma.espacio.create({
    data: {
      nombre: 'Aula 102',
      codigo: 'A102',
      tipo: 'AULA',
      edificio: 'Edificio A',
      piso: 1,
      capacidad: 35,
      recursos: JSON.stringify({ proyector: true, pizarra: true }),
    },
  });

  const espacio3 = await prisma.espacio.create({
    data: {
      nombre: 'Laboratorio de Informática',
      codigo: 'LAB-INFO',
      tipo: 'LABORATORIO',
      edificio: 'Edificio B',
      piso: 1,
      capacidad: 30,
      recursos: JSON.stringify({ computadoras: 30, proyector: true, software: 'Visual Studio, Python' }),
    },
  });

  const espacio4 = await prisma.espacio.create({
    data: {
      nombre: 'Laboratorio de Redes',
      codigo: 'LAB-RED',
      tipo: 'LABORATORIO',
      edificio: 'Edificio B',
      piso: 2,
      capacidad: 25,
      recursos: JSON.stringify({ switches: 5, computadoras: 20, proyector: true }),
    },
  });

  const espacio5 = await prisma.espacio.create({
    data: {
      nombre: 'Aula 201',
      codigo: 'A201',
      tipo: 'AULA',
      edificio: 'Edificio A',
      piso: 2,
      capacidad: 50,
      recursos: JSON.stringify({ proyector: true, aire: true }),
    },
  });

  const espacio6 = await prisma.espacio.create({
    data: {
      nombre: 'Auditorio Principal',
      codigo: 'AUD-PRIN',
      tipo: 'AUDITORIO',
      edificio: 'Edificio C',
      piso: 1,
      capacidad: 200,
      recursos: JSON.stringify({ proyector: true, sonido: true, escenario: true }),
    },
  });

  const espacio7 = await prisma.espacio.create({
    data: {
      nombre: 'Aula 103',
      codigo: 'A103',
      tipo: 'AULA',
      edificio: 'Edificio A',
      piso: 1,
      capacidad: 45,
      recursos: JSON.stringify({ proyector: true, pizarra: true }),
    },
  });

  console.log('✓ Espacios creados');

  // ============ CREAR PERÍODO ACADÉMICO ============
  const periodo = await prisma.periodo.create({
    data: {
      nombre: 'Período 2024-1',
      fechaInicio: new Date('2024-02-01'),
      fechaFin: new Date('2024-06-30'),
      estado: 'ACTIVO',
    },
  });

  console.log('✓ Período creado');

  // ============ CREAR GRUPOS ============
  const grupo1 = await prisma.grupo.create({
    data: {
      codigo: 'ING-SIS-1A',
      numero: 1,
      semestre: 1,
      turno: 'DIURNO',
      carreraId: carreraIngenieria.id,
      capacidad: 40,
    },
  });

  const grupo2 = await prisma.grupo.create({
    data: {
      codigo: 'ING-SIS-1B',
      numero: 2,
      semestre: 1,
      turno: 'DIURNO',
      carreraId: carreraIngenieria.id,
      capacidad: 35,
    },
  });

  const grupo3 = await prisma.grupo.create({
    data: {
      codigo: 'ING-SIS-3A',
      numero: 3,
      semestre: 3,
      turno: 'DIURNO',
      carreraId: carreraIngenieria.id,
      capacidad: 30,
    },
  });

  const grupo4 = await prisma.grupo.create({
    data: {
      codigo: 'ING-SIS-4A',
      numero: 4,
      semestre: 4,
      turno: 'DIURNO',
      carreraId: carreraIngenieria.id,
      capacidad: 28,
    },
  });

  const grupo5 = await prisma.grupo.create({
    data: {
      codigo: 'ADM-EMP-1A',
      numero: 1,
      semestre: 1,
      turno: 'DIURNO',
      carreraId: carreraAdministracion.id,
      capacidad: 45,
    },
  });

  const grupo6 = await prisma.grupo.create({
    data: {
      codigo: 'CONT-1A',
      numero: 1,
      semestre: 1,
      turno: 'DIURNO',
      carreraId: carreraContabilidad.id,
      capacidad: 40,
    },
  });

  const grupo7 = await prisma.grupo.create({
    data: {
      codigo: 'DER-1A',
      numero: 1,
      semestre: 1,
      turno: 'DIURNO',
      carreraId: carreraDerecho.id,
      capacidad: 50,
    },
  });

  console.log('✓ Grupos creados');

  // ============ CREAR ASOCIACIONES GRUPO-MATERIA ============
  await prisma.grupoMateria.create({
    data: { grupoId: grupo1.id, materiaId: materia1.id },
  });
  await prisma.grupoMateria.create({
    data: { grupoId: grupo2.id, materiaId: materia1.id },
  });
  await prisma.grupoMateria.create({
    data: { grupoId: grupo3.id, materiaId: materia2.id },
  });
  await prisma.grupoMateria.create({
    data: { grupoId: grupo4.id, materiaId: materia3.id },
  });
  await prisma.grupoMateria.create({
    data: { grupoId: grupo5.id, materiaId: materia4.id },
  });
  await prisma.grupoMateria.create({
    data: { grupoId: grupo6.id, materiaId: materia5.id },
  });
  await prisma.grupoMateria.create({
    data: { grupoId: grupo7.id, materiaId: materia6.id },
  });

  console.log('✓ Asociaciones Grupo-Materia creadas');

  // ============ CREAR HORARIOS ============
  const dias = ['LUNES', 'MARTES', 'MIERCOLES', 'JUEVES', 'VIERNES'];

  // Grupo 1 - Programación I - Lunes, Miércoles y Viernes de 8:00 a 10:00
  await prisma.horario.create({
    data: {
      grupoId: grupo1.id,
      materiaId: materia1.id,
      profesorId: profesor1.id,
      espacioId: espacio1.id,
      periodoId: periodo.id,
      diaSemana: 'LUNES',
      horaInicio: '08:00',
      horaFin: '10:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo1.id,
      materiaId: materia1.id,
      profesorId: profesor1.id,
      espacioId: espacio1.id,
      periodoId: periodo.id,
      diaSemana: 'MIERCOLES',
      horaInicio: '08:00',
      horaFin: '10:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo1.id,
      materiaId: materia1.id,
      profesorId: profesor1.id,
      espacioId: espacio1.id,
      periodoId: periodo.id,
      diaSemana: 'VIERNES',
      horaInicio: '08:00',
      horaFin: '10:00',
    },
  });

  // Grupo 2 - Programación I - Martes y Jueves de 10:00 a 12:00
  await prisma.horario.create({
    data: {
      grupoId: grupo2.id,
      materiaId: materia1.id,
      profesorId: profesor6.id,
      espacioId: espacio2.id,
      periodoId: periodo.id,
      diaSemana: 'MARTES',
      horaInicio: '10:00',
      horaFin: '12:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo2.id,
      materiaId: materia1.id,
      profesorId: profesor6.id,
      espacioId: espacio2.id,
      periodoId: periodo.id,
      diaSemana: 'JUEVES',
      horaInicio: '10:00',
      horaFin: '12:00',
    },
  });

  // Grupo 3 - Bases de Datos en Laboratorio - Lunes, Miércoles y Viernes de 14:00 a 16:00
  await prisma.horario.create({
    data: {
      grupoId: grupo3.id,
      materiaId: materia2.id,
      profesorId: profesor1.id,
      espacioId: espacio3.id,
      periodoId: periodo.id,
      diaSemana: 'LUNES',
      horaInicio: '14:00',
      horaFin: '16:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo3.id,
      materiaId: materia2.id,
      profesorId: profesor1.id,
      espacioId: espacio3.id,
      periodoId: periodo.id,
      diaSemana: 'MIERCOLES',
      horaInicio: '14:00',
      horaFin: '16:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo3.id,
      materiaId: materia2.id,
      profesorId: profesor1.id,
      espacioId: espacio3.id,
      periodoId: periodo.id,
      diaSemana: 'VIERNES',
      horaInicio: '14:00',
      horaFin: '16:00',
    },
  });

  // Grupo 4 - Desarrollo Web - Martes y Jueves de 10:00 a 12:00 (Aula)
  await prisma.horario.create({
    data: {
      grupoId: grupo4.id,
      materiaId: materia3.id,
      profesorId: profesor3.id,
      espacioId: espacio5.id,
      periodoId: periodo.id,
      diaSemana: 'MARTES',
      horaInicio: '12:00',
      horaFin: '14:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo4.id,
      materiaId: materia3.id,
      profesorId: profesor3.id,
      espacioId: espacio5.id,
      periodoId: periodo.id,
      diaSemana: 'JUEVES',
      horaInicio: '12:00',
      horaFin: '14:00',
    },
  });

  // Grupo 5 - Administración General - Lunes y Miércoles de 09:00 a 11:00
  await prisma.horario.create({
    data: {
      grupoId: grupo5.id,
      materiaId: materia4.id,
      profesorId: profesor2.id,
      espacioId: espacio7.id,
      periodoId: periodo.id,
      diaSemana: 'LUNES',
      horaInicio: '09:00',
      horaFin: '11:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo5.id,
      materiaId: materia4.id,
      profesorId: profesor2.id,
      espacioId: espacio7.id,
      periodoId: periodo.id,
      diaSemana: 'MIERCOLES',
      horaInicio: '09:00',
      horaFin: '11:00',
    },
  });

  // Grupo 6 - Contabilidad Financiera - Martes y Jueves de 14:00 a 16:00
  await prisma.horario.create({
    data: {
      grupoId: grupo6.id,
      materiaId: materia5.id,
      profesorId: profesor4.id,
      espacioId: espacio1.id,
      periodoId: periodo.id,
      diaSemana: 'MARTES',
      horaInicio: '14:00',
      horaFin: '16:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo6.id,
      materiaId: materia5.id,
      profesorId: profesor4.id,
      espacioId: espacio1.id,
      periodoId: periodo.id,
      diaSemana: 'JUEVES',
      horaInicio: '14:00',
      horaFin: '16:00',
    },
  });

  // Grupo 7 - Derecho Constitucional - Martes de 10:00 a 12:00, Viernes de 10:00 a 12:00
  await prisma.horario.create({
    data: {
      grupoId: grupo7.id,
      materiaId: materia6.id,
      profesorId: profesor5.id,
      espacioId: espacio6.id,
      periodoId: periodo.id,
      diaSemana: 'MARTES',
      horaInicio: '10:00',
      horaFin: '12:00',
    },
  });

  await prisma.horario.create({
    data: {
      grupoId: grupo7.id,
      materiaId: materia6.id,
      profesorId: profesor5.id,
      espacioId: espacio6.id,
      periodoId: periodo.id,
      diaSemana: 'VIERNES',
      horaInicio: '10:00',
      horaFin: '12:00',
    },
  });

  console.log('✓ Horarios creados');

  console.log('✅ Seed completado exitosamente');
}

main()
  .then(async () => {
    await prisma.$disconnect();
    console.log('Conexión a BD cerrada');
  })
  .catch(async (error) => {
    console.error('❌ Error en seed:', error);
    await prisma.$disconnect();
    process.exit(1);
  });
