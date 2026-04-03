const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Obtener todas las materias
exports.obtenerMaterias = async (req, res) => {
  try {
    const { semestre } = req.query;

    const filtros = {};
    if (semestre) filtros.semestre = parseInt(semestre);

    const materias = await prisma.materia.findMany({
      where: filtros,
      include: {
        profesores: { include: { profesor: true } },
      },
      orderBy: { nombre: 'asc' },
    });

    res.json(materias);
  } catch (error) {
    console.error('Error en obtenerMaterias:', error);
    res.status(500).json({ error: 'Error al obtener materias' });
  }
};

// Obtener una materia por ID
exports.obtenerMateriaPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const materia = await prisma.materia.findUnique({
      where: { id },
      include: {
        profesores: { include: { profesor: true } },
        horarios: {
          include: {
            grupo: { include: { carrera: true } },
            profesor: true,
            espacio: true,
            periodo: true,
          },
          orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
        },
      },
    });

    if (!materia) {
      return res.status(404).json({ error: 'Materia no encontrada' });
    }

    res.json(materia);
  } catch (error) {
    console.error('Error en obtenerMateriaPorId:', error);
    res.status(500).json({ error: 'Error al obtener materia' });
  }
};

// Crear una nueva materia
exports.crearMateria = async (req, res) => {
  try {
    const { nombre, codigo, creditos, semestre, descripcion } = req.body;

    if (!nombre || !codigo || !creditos || !semestre) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const materia = await prisma.materia.create({
      data: {
        nombre,
        codigo,
        creditos: parseInt(creditos),
        semestre: parseInt(semestre),
        descripcion,
      },
    });

    res.status(201).json(materia);
  } catch (error) {
    console.error('Error en crearMateria:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El código de la materia ya existe' });
    }
    res.status(500).json({ error: 'Error al crear materia' });
  }
};

// Actualizar una materia
exports.actualizarMateria = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, codigo, creditos, semestre, descripcion } = req.body;

    const materia = await prisma.materia.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(codigo && { codigo }),
        ...(creditos && { creditos: parseInt(creditos) }),
        ...(semestre && { semestre: parseInt(semestre) }),
        ...(descripcion && { descripcion }),
      },
    });

    res.json(materia);
  } catch (error) {
    console.error('Error en actualizarMateria:', error);
    res.status(500).json({ error: 'Error al actualizar materia' });
  }
};

// Eliminar una materia
exports.eliminarMateria = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.materia.delete({
      where: { id },
    });

    res.json({ mensaje: 'Materia eliminada correctamente' });
  } catch (error) {
    console.error('Error en eliminarMateria:', error);
    res.status(500).json({ error: 'Error al eliminar materia' });
  }
};
