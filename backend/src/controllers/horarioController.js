const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Obtener todos los horarios
exports.obtenerHorarios = async (req, res) => {
  try {
    const { grupoId, espacioId, profesorId, materiaId, dia, periodoId } = req.query;

    const filtros = {};
    if (grupoId) filtros.grupoId = grupoId;
    if (espacioId) filtros.espacioId = espacioId;
    if (profesorId) filtros.profesorId = profesorId;
    if (materiaId) filtros.materiaId = materiaId;
    if (dia) filtros.diaSemana = dia.toUpperCase();
    if (periodoId) filtros.periodoId = periodoId;

    const horarios = await prisma.horario.findMany({
      where: filtros,
      include: {
        grupo: { include: { carrera: true } },
        materia: true,
        profesor: true,
        espacio: true,
        periodo: true,
      },
      orderBy: [{ diaSemana: 'asc' }, { horaInicio: 'asc' }],
    });

    res.json(horarios);
  } catch (error) {
    console.error('Error en obtenerHorarios:', error);
    res.status(500).json({ error: 'Error al obtener horarios' });
  }
};

// Obtener un horario por ID
exports.obtenerHorarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const horario = await prisma.horario.findUnique({
      where: { id },
      include: {
        grupo: { include: { carrera: true } },
        materia: true,
        profesor: true,
        espacio: true,
        periodo: true,
      },
    });

    if (!horario) {
      return res.status(404).json({ error: 'Horario no encontrado' });
    }

    res.json(horario);
  } catch (error) {
    console.error('Error en obtenerHorarioPorId:', error);
    res.status(500).json({ error: 'Error al obtener horario' });
  }
};

// Crear un nuevo horario
exports.crearHorario = async (req, res) => {
  try {
    const { grupoId, materiaId, profesorId, espacioId, periodoId, diaSemana, horaInicio, horaFin, observaciones } = req.body;

    // Validaciones
    if (!grupoId || !materiaId || !profesorId || !espacioId || !periodoId || !diaSemana || !horaInicio || !horaFin) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    // Verificar que no existe conflicto en la misma aula
    const conflictoEspacio = await prisma.horario.findFirst({
      where: {
        espacioId,
        diaSemana,
        periodoId,
        OR: [
          { horaInicio: { lt: horaFin }, horaFin: { gt: horaInicio } },
        ],
      },
    });

    if (conflictoEspacio) {
      return res.status(400).json({ error: 'Conflicto: El aula ya está ocupada en ese horario' });
    }

    // Verificar que el profesor no tiene conflicto
    const conflictoProfesor = await prisma.horario.findFirst({
      where: {
        profesorId,
        diaSemana,
        periodoId,
        OR: [
          { horaInicio: { lt: horaFin }, horaFin: { gt: horaInicio } },
        ],
      },
    });

    if (conflictoProfesor) {
      return res.status(400).json({ error: 'Conflicto: El profesor ya tiene clase en ese horario' });
    }

    // Verificar que el grupo no tiene conflicto
    const conflictoGrupo = await prisma.horario.findFirst({
      where: {
        grupoId,
        diaSemana,
        periodoId,
        OR: [
          { horaInicio: { lt: horaFin }, horaFin: { gt: horaInicio } },
        ],
      },
    });

    if (conflictoGrupo) {
      return res.status(400).json({ error: 'Conflicto: El grupo ya tiene clase en ese horario' });
    }

    const horario = await prisma.horario.create({
      data: {
        grupoId,
        materiaId,
        profesorId,
        espacioId,
        periodoId,
        diaSemana: diaSemana.toUpperCase(),
        horaInicio,
        horaFin,
        observaciones,
      },
      include: {
        grupo: { include: { carrera: true } },
        materia: true,
        profesor: true,
        espacio: true,
        periodo: true,
      },
    });

    res.status(201).json(horario);
  } catch (error) {
    console.error('Error en crearHorario:', error);
    res.status(500).json({ error: 'Error al crear horario' });
  }
};

// Actualizar un horario
exports.actualizarHorario = async (req, res) => {
  try {
    const { id } = req.params;
    const { diaSemana, horaInicio, horaFin, observaciones } = req.body;

    const horario = await prisma.horario.update({
      where: { id },
      data: {
        ...(diaSemana && { diaSemana: diaSemana.toUpperCase() }),
        horaInicio,
        horaFin,
        observaciones,
      },
      include: {
        grupo: { include: { carrera: true } },
        materia: true,
        profesor: true,
        espacio: true,
        periodo: true,
      },
    });

    res.json(horario);
  } catch (error) {
    console.error('Error en actualizarHorario:', error);
    res.status(500).json({ error: 'Error al actualizar horario' });
  }
};

// Eliminar un horario
exports.eliminarHorario = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.horario.delete({
      where: { id },
    });

    res.json({ mensaje: 'Horario eliminado correctamente' });
  } catch (error) {
    console.error('Error en eliminarHorario:', error);
    res.status(500).json({ error: 'Error al eliminar horario' });
  }
};

// Consultar disponibilidad de un espacio en horario específico
exports.consultarDisponibilidad = async (req, res) => {
  try {
    const { espacioId, dia, hora, periodoId } = req.query;

    if (!espacioId || !dia || !hora || !periodoId) {
      return res.status(400).json({ error: 'Faltan parámetros: espacioId, dia, hora, periodoId' });
    }

    const horario = await prisma.horario.findFirst({
      where: {
        espacioId,
        diaSemana: dia.toUpperCase(),
        periodoId,
        horaInicio: { lte: hora },
        horaFin: { gt: hora },
      },
      include: {
        grupo: { include: { carrera: true } },
        materia: true,
        profesor: true,
        espacio: true,
      },
    });

    if (horario) {
      res.json({
        disponible: false,
        ocupado_por: {
          materia: horario.materia.nombre,
          profesor: horario.profesor.nombre,
          grupo: horario.grupo.codigo,
          carrera: horario.grupo.carrera.nombre,
          horario_inicio: horario.horaInicio,
          horario_fin: horario.horaFin,
        },
      });
    } else {
      res.json({
        disponible: true,
        mensaje: 'El espacio está disponible en este horario',
      });
    }
  } catch (error) {
    console.error('Error en consultarDisponibilidad:', error);
    res.status(500).json({ error: 'Error al consultar disponibilidad' });
  }
};
