const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Obtener todos los profesores
exports.obtenerProfesores = async (req, res) => {
  try {
    const { carreraId, departamento } = req.query;

    const filtros = {};
    if (departamento) filtros.departamento = departamento;

    let profesores = await prisma.profesor.findMany({
      where: filtros,
      include: {
        materias: { include: { materia: true } },
        carreras: { include: { carrera: true } },
      },
      orderBy: { nombre: 'asc' },
    });

    if (carreraId) {
      profesores = profesores.filter((p) => p.carreras.some((c) => c.carreraId === carreraId));
    }

    res.json(profesores);
  } catch (error) {
    console.error('Error en obtenerProfesores:', error);
    res.status(500).json({ error: 'Error al obtener profesores' });
  }
};

// Obtener un profesor por ID
exports.obtenerProfesorPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const profesor = await prisma.profesor.findUnique({
      where: { id },
      include: {
        materias: { include: { materia: true } },
        carreras: { include: { carrera: true } },
        horarios: {
          include: {
            grupo: { include: { carrera: true } },
            materia: true,
            espacio: true,
            periodo: true,
          },
          orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
        },
      },
    });

    if (!profesor) {
      return res.status(404).json({ error: 'Profesor no encontrado' });
    }

    res.json(profesor);
  } catch (error) {
    console.error('Error en obtenerProfesorPorId:', error);
    res.status(500).json({ error: 'Error al obtener profesor' });
  }
};

// Crear un nuevo profesor
exports.crearProfesor = async (req, res) => {
  try {
    const { nombre, email, cedula, telefono, departamento } = req.body;

    if (!nombre || !email || !cedula) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const profesor = await prisma.profesor.create({
      data: {
        nombre,
        email,
        cedula,
        telefono,
        departamento,
      },
    });

    res.status(201).json(profesor);
  } catch (error) {
    console.error('Error en crearProfesor:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El email o cédula del profesor ya existe' });
    }
    res.status(500).json({ error: 'Error al crear profesor' });
  }
};

// Actualizar un profesor
exports.actualizarProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, email, cedula, telefono, departamento } = req.body;

    const profesor = await prisma.profesor.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(email && { email }),
        ...(cedula && { cedula }),
        ...(telefono && { telefono }),
        ...(departamento && { departamento }),
      },
    });

    res.json(profesor);
  } catch (error) {
    console.error('Error en actualizarProfesor:', error);
    res.status(500).json({ error: 'Error al actualizar profesor' });
  }
};

// Eliminar un profesor
exports.eliminarProfesor = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.profesor.delete({
      where: { id },
    });

    res.json({ mensaje: 'Profesor eliminado correctamente' });
  } catch (error) {
    console.error('Error en eliminarProfesor:', error);
    res.status(500).json({ error: 'Error al eliminar profesor' });
  }
};

// Obtener horarios de un profesor
exports.obtenerHorariosProfesor = async (req, res) => {
  try {
    const { id } = req.params;
    const { periodoId } = req.query;

    const filtros = { profesorId: id };
    if (periodoId) filtros.periodoId = periodoId;

    const horarios = await prisma.horario.findMany({
      where: filtros,
      include: {
        grupo: { include: { carrera: true } },
        materia: true,
        espacio: true,
        periodo: true,
      },
      orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
    });

    res.json(horarios);
  } catch (error) {
    console.error('Error en obtenerHorariosProfesor:', error);
    res.status(500).json({ error: 'Error al obtener horarios del profesor' });
  }
};
