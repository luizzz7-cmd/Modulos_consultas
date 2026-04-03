const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Obtener todas las carreras
exports.obtenerCarreras = async (req, res) => {
  try {
    const carreras = await prisma.carrera.findMany({
      include: {
        grupos: true,
        profesores: { include: { profesor: true } },
      },
      orderBy: { nombre: 'asc' },
    });

    res.json(carreras);
  } catch (error) {
    console.error('Error en obtenerCarreras:', error);
    res.status(500).json({ error: 'Error al obtener carreras' });
  }
};

// Obtener una carrera por ID
exports.obtenerCarreraPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const carrera = await prisma.carrera.findUnique({
      where: { id },
      include: {
        grupos: {
          include: {
            materias: { include: { materia: true } },
            horarios: {
              include: {
                materia: true,
                profesor: true,
                espacio: true,
              },
              orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
            },
          },
          orderBy: { semestre: 'asc' },
        },
        profesores: { include: { profesor: true } },
      },
    });

    if (!carrera) {
      return res.status(404).json({ error: 'Carrera no encontrada' });
    }

    res.json(carrera);
  } catch (error) {
    console.error('Error en obtenerCarreraPorId:', error);
    res.status(500).json({ error: 'Error al obtener carrera' });
  }
};

// Crear una nueva carrera
exports.crearCarrera = async (req, res) => {
  try {
    const { nombre, codigo, descripcion, semestres } = req.body;

    if (!nombre || !codigo) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const carrera = await prisma.carrera.create({
      data: {
        nombre,
        codigo,
        descripcion,
        semestres: parseInt(semestres) || 8,
      },
    });

    res.status(201).json(carrera);
  } catch (error) {
    console.error('Error en crearCarrera:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El nombre o código de la carrera ya existe' });
    }
    res.status(500).json({ error: 'Error al crear carrera' });
  }
};

// Actualizar una carrera
exports.actualizarCarrera = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, codigo, descripcion, semestres } = req.body;

    const carrera = await prisma.carrera.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(codigo && { codigo }),
        ...(descripcion && { descripcion }),
        ...(semestres && { semestres: parseInt(semestres) }),
      },
    });

    res.json(carrera);
  } catch (error) {
    console.error('Error en actualizarCarrera:', error);
    res.status(500).json({ error: 'Error al actualizar carrera' });
  }
};

// Eliminar una carrera
exports.eliminarCarrera = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.carrera.delete({
      where: { id },
    });

    res.json({ mensaje: 'Carrera eliminada correctamente' });
  } catch (error) {
    console.error('Error en eliminarCarrera:', error);
    res.status(500).json({ error: 'Error al eliminar carrera' });
  }
};

// Obtener espacios ocupados por una carrera
exports.obtenerEspaciosCarrera = async (req, res) => {
  try {
    const { id } = req.params;
    const { periodoId } = req.query;

    // Primero obtenemos todos los grupos de la carrera
    const grupos = await prisma.grupo.findMany({
      where: { carreraId: id },
      select: { id: true },
    });

    const grupoIds = grupos.map((g) => g.id);

    const filtros = { grupoId: { in: grupoIds } };
    if (periodoId) filtros.periodoId = periodoId;

    const horarios = await prisma.horario.findMany({
      where: filtros,
      include: {
        espacio: true,
        materia: true,
        profesor: true,
        grupo: true,
      },
      orderBy: [{ espacio: { nombre: 'asc' } }, { diaSemana: 'asc' }, { horaInicio: 'asc' }],
    });

    // Agrupar por espacio
    const espaciosPorCarrera = {};
    horarios.forEach((h) => {
      if (!espaciosPorCarrera[h.espacio.id]) {
        espaciosPorCarrera[h.espacio.id] = {
          espacio: h.espacio,
          horarios: [],
        };
      }
      espaciosPorCarrera[h.espacio.id].horarios.push(h);
    });

    res.json(Object.values(espaciosPorCarrera));
  } catch (error) {
    console.error('Error en obtenerEspaciosCarrera:', error);
    res.status(500).json({ error: 'Error al obtener espacios de la carrera' });
  }
};
