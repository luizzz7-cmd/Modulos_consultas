const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Obtener todos los espacios
exports.obtenerEspacios = async (req, res) => {
  try {
    const { tipo, edificio } = req.query;

    const filtros = {};
    if (tipo) filtros.tipo = tipo.toUpperCase();
    if (edificio) filtros.edificio = edificio;

    const espacios = await prisma.espacio.findMany({
      where: filtros,
      orderBy: { nombre: 'asc' },
    });

    res.json(espacios);
  } catch (error) {
    console.error('Error en obtenerEspacios:', error);
    res.status(500).json({ error: 'Error al obtener espacios' });
  }
};

// Obtener un espacio por ID
exports.obtenerEspacioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const espacio = await prisma.espacio.findUnique({
      where: { id },
      include: {
        horarios: {
          include: {
            grupo: { include: { carrera: true } },
            materia: true,
            profesor: true,
            periodo: true,
          },
          orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
        },
      },
    });

    if (!espacio) {
      return res.status(404).json({ error: 'Espacio no encontrado' });
    }

    res.json(espacio);
  } catch (error) {
    console.error('Error en obtenerEspacioPorId:', error);
    res.status(500).json({ error: 'Error al obtener espacio' });
  }
};

// Crear un nuevo espacio
exports.crearEspacio = async (req, res) => {
  try {
    const { nombre, codigo, tipo, edificio, piso, capacidad, recursos } = req.body;

    if (!nombre || !codigo || !tipo || !edificio || !piso) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const espacio = await prisma.espacio.create({
      data: {
        nombre,
        codigo,
        tipo: tipo.toUpperCase(),
        edificio,
        piso: parseInt(piso),
        capacidad: parseInt(capacidad) || 30,
        recursos: recursos ? JSON.stringify(recursos) : null,
      },
    });

    res.status(201).json(espacio);
  } catch (error) {
    console.error('Error en crearEspacio:', error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: 'El nombre o código del espacio ya existe' });
    }
    res.status(500).json({ error: 'Error al crear espacio' });
  }
};

// Actualizar un espacio
exports.actualizarEspacio = async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, codigo, tipo, edificio, piso, capacidad, recursos } = req.body;

    const espacio = await prisma.espacio.update({
      where: { id },
      data: {
        ...(nombre && { nombre }),
        ...(codigo && { codigo }),
        ...(tipo && { tipo: tipo.toUpperCase() }),
        ...(edificio && { edificio }),
        ...(piso && { piso: parseInt(piso) }),
        ...(capacidad && { capacidad: parseInt(capacidad) }),
        ...(recursos && { recursos: JSON.stringify(recursos) }),
      },
    });

    res.json(espacio);
  } catch (error) {
    console.error('Error en actualizarEspacio:', error);
    res.status(500).json({ error: 'Error al actualizar espacio' });
  }
};

// Eliminar un espacio
exports.eliminarEspacio = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.espacio.delete({
      where: { id },
    });

    res.json({ mensaje: 'Espacio eliminado correctamente' });
  } catch (error) {
    console.error('Error en eliminarEspacio:', error);
    res.status(500).json({ error: 'Error al eliminar espacio' });
  }
};
