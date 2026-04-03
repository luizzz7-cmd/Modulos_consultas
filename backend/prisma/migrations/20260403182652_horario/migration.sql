-- CreateTable
CREATE TABLE "carreras" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "descripcion" TEXT,
    "semestres" INTEGER NOT NULL DEFAULT 8,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "carreras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profesores" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "cedula" TEXT NOT NULL,
    "telefono" TEXT,
    "departamento" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "profesores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "materias" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "creditos" INTEGER NOT NULL,
    "semestre" INTEGER NOT NULL,
    "descripcion" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupos" (
    "id" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "numero" INTEGER NOT NULL,
    "semestre" INTEGER NOT NULL,
    "turno" TEXT NOT NULL DEFAULT 'DIURNO',
    "carreraId" TEXT NOT NULL,
    "capacidad" INTEGER NOT NULL DEFAULT 40,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "grupos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "espacios" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "codigo" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "edificio" TEXT NOT NULL,
    "piso" INTEGER NOT NULL,
    "capacidad" INTEGER NOT NULL,
    "recursos" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "espacios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "periodos" (
    "id" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "fechaInicio" TIMESTAMP(3) NOT NULL,
    "fechaFin" TIMESTAMP(3) NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'ACTIVO',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "periodos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "horarios" (
    "id" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "profesorId" TEXT NOT NULL,
    "espacioId" TEXT NOT NULL,
    "periodoId" TEXT NOT NULL,
    "diaSemana" TEXT NOT NULL,
    "horaInicio" TEXT NOT NULL,
    "horaFin" TEXT NOT NULL,
    "observaciones" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "horarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profesor_materias" (
    "id" TEXT NOT NULL,
    "profesorId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profesor_materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "profesor_carreras" (
    "id" TEXT NOT NULL,
    "profesorId" TEXT NOT NULL,
    "carreraId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profesor_carreras_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "grupo_materias" (
    "id" TEXT NOT NULL,
    "grupoId" TEXT NOT NULL,
    "materiaId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "grupo_materias_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "importaciones_csv" (
    "id" TEXT NOT NULL,
    "nombreArchivo" TEXT NOT NULL,
    "totalRegistros" INTEGER NOT NULL,
    "registrosValidos" INTEGER NOT NULL,
    "registrosErroneos" INTEGER NOT NULL,
    "detalleErrores" TEXT,
    "usuarioId" TEXT,
    "estado" TEXT NOT NULL DEFAULT 'COMPLETADA',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "importaciones_csv_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "carreras_nombre_key" ON "carreras"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "carreras_codigo_key" ON "carreras"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "profesores_email_key" ON "profesores"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profesores_cedula_key" ON "profesores"("cedula");

-- CreateIndex
CREATE UNIQUE INDEX "materias_codigo_key" ON "materias"("codigo");

-- CreateIndex
CREATE UNIQUE INDEX "grupos_carreraId_numero_semestre_turno_key" ON "grupos"("carreraId", "numero", "semestre", "turno");

-- CreateIndex
CREATE UNIQUE INDEX "espacios_nombre_key" ON "espacios"("nombre");

-- CreateIndex
CREATE UNIQUE INDEX "espacios_codigo_key" ON "espacios"("codigo");

-- CreateIndex
CREATE INDEX "espacios_tipo_idx" ON "espacios"("tipo");

-- CreateIndex
CREATE UNIQUE INDEX "periodos_nombre_key" ON "periodos"("nombre");

-- CreateIndex
CREATE INDEX "horarios_grupoId_idx" ON "horarios"("grupoId");

-- CreateIndex
CREATE INDEX "horarios_materiaId_idx" ON "horarios"("materiaId");

-- CreateIndex
CREATE INDEX "horarios_profesorId_idx" ON "horarios"("profesorId");

-- CreateIndex
CREATE INDEX "horarios_espacioId_idx" ON "horarios"("espacioId");

-- CreateIndex
CREATE INDEX "horarios_diaSemana_idx" ON "horarios"("diaSemana");

-- CreateIndex
CREATE UNIQUE INDEX "horarios_espacioId_diaSemana_horaInicio_periodoId_key" ON "horarios"("espacioId", "diaSemana", "horaInicio", "periodoId");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_materias_profesorId_materiaId_key" ON "profesor_materias"("profesorId", "materiaId");

-- CreateIndex
CREATE UNIQUE INDEX "profesor_carreras_profesorId_carreraId_key" ON "profesor_carreras"("profesorId", "carreraId");

-- CreateIndex
CREATE UNIQUE INDEX "grupo_materias_grupoId_materiaId_key" ON "grupo_materias"("grupoId", "materiaId");

-- AddForeignKey
ALTER TABLE "grupos" ADD CONSTRAINT "grupos_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "carreras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "materias"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_espacioId_fkey" FOREIGN KEY ("espacioId") REFERENCES "espacios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "horarios" ADD CONSTRAINT "horarios_periodoId_fkey" FOREIGN KEY ("periodoId") REFERENCES "periodos"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor_materias" ADD CONSTRAINT "profesor_materias_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor_materias" ADD CONSTRAINT "profesor_materias_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "materias"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor_carreras" ADD CONSTRAINT "profesor_carreras_profesorId_fkey" FOREIGN KEY ("profesorId") REFERENCES "profesores"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "profesor_carreras" ADD CONSTRAINT "profesor_carreras_carreraId_fkey" FOREIGN KEY ("carreraId") REFERENCES "carreras"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo_materias" ADD CONSTRAINT "grupo_materias_grupoId_fkey" FOREIGN KEY ("grupoId") REFERENCES "grupos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "grupo_materias" ADD CONSTRAINT "grupo_materias_materiaId_fkey" FOREIGN KEY ("materiaId") REFERENCES "materias"("id") ON DELETE CASCADE ON UPDATE CASCADE;
