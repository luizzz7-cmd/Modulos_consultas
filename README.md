# 📖 Sistema de Consulta de Horarios Académicos

Una aplicación web moderna y completa para consultar horarios académicos, disponibilidad de aulas y laboratorios en instituciones educativas.

## 🎯 Descripción del Proyecto

### ¿Qué es?
Es una plataforma web que centraliza toda la información de horarios académicos en una interfaz intuitiva y fácil de usar. Los usuarios pueden:

- Consultar horarios de profesores
- Ver disponibilidad de aulas y laboratorios
- Buscar materias y grupos académicos
- Explorar información de carreras
- Importar horarios masivamente desde archivos CSV
- Acceder a un panel administrativo para gestionar datos

### ¿Para quién está pensada?
- **Estudiantes**: Para verificar sus horarios y disponibilidad de espacios
- **Profesores**: Para consultar sus asignaciones y horarios
- **Personal administrativo**: Para gestionar y actualizar información académica
- **Institución educativa**: Para tener centralizado toda la información de horarios

### Problema que resuelve
- Elimina la necesidad de consultar múltiples documentos o sistemas
- Centraliza toda la información académica en un solo lugar
- Permite identificar conflictos de horarios rápidamente
- Facilita el manejo de cambios de horarios
- Optimiza la gestión de espacios educativos

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0**: Librería JavaScript para construir interfaces interactivas
- **Vite 5.0.8**: Bundler y dev server rápido
- **Tailwind CSS 3.3.6**: Framework de CSS utility-first para estilos modernos
- **Axios 1.6.2**: Cliente HTTP para consumir APIs
- **Lucide React 0.263.1**: Librería de iconos SVG

### Backend
- **Node.js**: Entorno de ejecución JavaScript
- **Express 4.18.2**: Framework web minimalista
- **Prisma 5.7.0**: ORM para Node.js con soporte a PostgreSQL
- **PostgeSQL 12+**: Base de datos relacional
- **CORS 2.8.5**: Middleware para manejo de CORS
- **Multer 1.4.5**: Middleware para manejo de uploads de archivos
- **CSV-parser 3.0.0**: Librería para parsear archivos CSV

## 📁 Estructura del Proyecto

```
horarios-academicos/
├── frontend/                          # Aplicación React
│   ├── src/
│   │   ├── components/               # Componentes reutilizables
│   │   │   ├── SideBar.jsx          # Barra lateral de navegación
│   │   │   ├── NavBar.jsx           # Barra superior
│   │   │   ├── Card.jsx             # Componente de tarjeta
│   │   │   ├── Table.jsx            # Componentes para tablas
│   │   │   ├── Modal.jsx            # Componente modal
│   │   │   ├── Button.jsx           # Componente botón
│   │   │   ├── Alert.jsx            # Componente de alertas
│   │   │   └── HorarioCard.jsx      # Tarjeta de horario
│   │   ├── pages/                   # Páginas de la aplicación
│   │   │   ├── HomePage.jsx         # Página de inicio
│   │   │   ├── AulasPage.jsx        # Consulta de aulas
│   │   │   ├── ProfesoresPage.jsx   # Consulta de profesores
│   │   │   ├── MateriasPage.jsx     # Consulta de materias
│   │   │   ├── GruposPage.jsx       # Consulta de grupos
│   │   │   ├── CarrerasPage.jsx     # Consulta de carreras
│   │   │   ├── HorariosPage.jsx     # Vista de horarios
│   │   │   ├── AdminPage.jsx        # Panel administrativo
│   │   │   └── ImportarPage.jsx     # Importación de CSV
│   │   ├── services/
│   │   │   └── api.js               # Servicio de API (Axios)
│   │   ├── hooks/                   # Custom hooks
│   │   ├── App.jsx                  # Componente raíz
│   │   ├── main.jsx                 # Punto de entrada
│   │   └── index.css                # Estilos globales
│   ├── index.html                   # HTML principal
│   ├── package.json                 # Dependencias del frontend
│   ├── vite.config.js              # Configuración de Vite
│   ├── tailwind.config.js          # Configuración de Tailwind
│   └── postcss.config.js           # Configuración de PostCSS
│
└── backend/                          # Servidor Express + Prisma
    ├── src/
    │   ├── controllers/             # Lógica de negocio
    │   │   ├── horarioController.js
    │   │   ├── espacioController.js
    │   │   ├── profesorController.js
    │   │   ├── materiaController.js
    │   │   ├── grupoController.js
    │   │   ├── carreraController.js
    │   │   └── csvController.js
    │   ├── routes/                  # Definición de rutas API
    │   │   ├── horarioRoutes.js
    │   │   ├── espacioRoutes.js
    │   │   ├── profesorRoutes.js
    │   │   ├── materiaRoutes.js
    │   │   ├── grupoRoutes.js
    │   │   ├── carreraRoutes.js
    │   │   └── csvRoutes.js
    │   ├── middleware/              # Middleware personalizado
    │   │   └── uploadMiddleware.js  # Configuración de Multer
    │   ├── uploads/                 # Almacenamiento de archivos CSV
    │   └── index.js                 # Servidor principal
    ├── prisma/
    │   ├── schema.prisma           # Definición del modelo de datos
    │   └── seed.js                 # Datos iniciales
    ├── package.json                # Dependencias del backend
    └── .env.example               # Variables de entorno ejemplo
```

## 🚀 Instrucciones de Instalación

### Requisitos Previos
- Node.js 16+ instalado ([descargar](https://nodejs.org/))
- PostgreSQL 12+ instalado ([descargar](https://www.postgresql.org/download/))
- Visual Studio Code o editor de tu preferencia
- Git (opcional, pero recomendado)

### Paso 1: Clonar o Descargar el Proyecto

```bash
# Si usas git:
git clone <url-del-repositorio>
cd horarios-academicos

# O simplemente descarga los archivos
```

### Paso 2: Instalar Dependencias del Backend

```bash
cd backend
npm install
```

### Paso 3: Configurar Base de Datos PostgreSQL

1. **Abre PostgreSQL** (en Windows: pgAdmin o psql)

2. **Crea una base de datos nueva**:
   ```sql
   CREATE DATABASE horarios_db;
   ```

3. **Copia `.env.example` a `.env`** y configura la URL de conexión:
   ```bash
   cp .env.example .env
   ```

4. **Edita el archivo `.env`** con tus credenciales PostgreSQL:
   ```
   DATABASE_URL="postgresql://tu_usuario:tu_contraseña@localhost:5432/horarios_db"
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:3000
   ```

   **Ejemplo con usuario y contraseña por defecto de PostgreSQL:**
   ```
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/horarios_db"
   ```

### Paso 4: Ejecutar Migraciones de Prisma

```bash
# Genera el cliente de Prisma
npm run prisma:generate

# Ejecuta las migraciones
npm run prisma:migrate

# Ejecuta los seeds (datos iniciales)
npm run prisma:seed
```

O ejecuta ambas con un solo comando:
```bash
npm run db:setup
```

### Paso 5: Iniciar el Backend

```bash
npm run dev
```

Deberías ver:
```
✅ Servidor ejecutándose en http://localhost:5000
📝 API disponible en http://localhost:5000/api
```

### Paso 6: Instalar Dependencias del Frontend

```bash
# En una nueva terminal
cd frontend
npm install
```

### Paso 7: Crear Variables de Entorno del Frontend

```bash
cp .env.example .env.local
```

El contenido está bien por defecto, pero verifica que sea:
```
VITE_API_URL=http://localhost:5000/api
```

### Paso 8: Iniciar el Frontend

```bash
npm run dev
```

Deberías ver algo como:
```
  VITE v5.0.8  ready in 123 ms

  ➜  Local:   http://localhost:3000/
```

### Paso 9: Acceder a la Aplicación

Abre tu navegador y ve a:
```
http://localhost:3000
```

🎉 **¡La aplicación está lista para usar!**

## 📝 Variables de Entorno

### Backend (.env)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `DATABASE_URL` | Conexión a PostgreSQL | `postgresql://user:pass@localhost:5432/horarios_db` |
| `PORT` | Puerto del servidor | `5000` |
| `NODE_ENV` | Ambiente (development/production) | `development` |
| `FRONTEND_URL` | URL del frontend para CORS | `http://localhost:3000` |

### Frontend (.env.local)

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `VITE_API_URL` | URL de la API backend | `http://localhost:5000/api` |

## 🗄️ Modelo de Base de Datos

### Tablas Principales

#### **carreras**
Almacena información de las carreras académicas.
```
- id (PK): UUID único
- nombre: Nombre de la carrera ej: "Ingeniería en Sistemas"
- codigo: Código único ej: "ING-SIS"
- descripcion: Descripción opcional
- semestres: Número de semestres (default 8)
- createdAt, updatedAt: Timestamps
```

#### **profesores**
Información de los docentes.
```
- id (PK): UUID único
- nombre: Nombre completo
- email: Email único
- cedula: Cédula única de identidad
- telefono: Número de contacto
- departamento: Departamento al que pertenece
```

#### **materias**
Asignaturas o cursos.
```
- id (PK): UUID único
- nombre: Nombre de la materia
- codigo: Código único
- creditos: Número de créditos
- semestre: Semestre en el que se imparte
- descripcion: Descripción opcional
```

#### **grupos**
Agrupaciones de estudiantes.
```
- id (PK): UUID único
- codigo: Código del grupo ej: "ING-SIS-1A"
- numero: Número del grupo
- semestre: Semestre del grupo
- turno: DIURNO, NOCTURNO, ESPECIAL
- carreraId (FK): Referencia a carrera
- capacidad: Número máximo de estudiantes
```

#### **espacios**
Aulas, laboratorios y auditorios.
```
- id (PK): UUID único
- nombre: Nombre único ej: "Aula 101"
- codigo: Código único
- tipo: AULA, LABORATORIO, AUDITORIO
- edificio: Nombre del edificio
- piso: Número de piso
- capacidad: Capacidad de personas
- recursos: JSON con equipamiento (proyector, computadoras, etc)
```

#### **periodos**
Períodos académicos.
```
- id (PK): UUID único
- nombre: Nombre del período ej: "2024-1"
- fechaInicio: Fecha de inicio
- fechaFin: Fecha de fin
- estado: ACTIVO, INACTIVO, FINALIZADO
```

#### **horarios**
Asignaciones de clases.
```
- id (PK): UUID único
- grupoId (FK): Grupo que toma la clase
- materiaId (FK): Materia que se imparte
- profesorId (FK): Profesor que imparte
- espacioId (FK): Aula/Laboratorio
- periodoId (FK): Período académico
- diaSemana: LUNES, MARTES, ..., SABADO
- horaInicio: HH:MM
- horaFin: HH:MM
- observaciones: Notas adicionales
- UNIQUE: (espacioId, diaSemana, horaInicio, periodoId)
```

### Tablas de Relación

#### **profesor_materias**
Relación muchos-a-muchos entre profesores y materias.

#### **profesor_carreras**
Relación muchos-a-muchos entre profesores y carreras.

#### **grupo_materias**
Relación muchos-a-muchos entre grupos y materias.

### Restricciones Implementadas

✅ No hay traslapes en el mismo aula en el mismo horario
✅ Un profesor no puede tener dos clases simultáneamente
✅ Un grupo no puede tener dos materias simultáneamente
✅ Validaciones de integridad referencial

## 🔄 Flujo General de la Aplicación

```
USUARIO INICIA LA APP
           ↓
      HOMEPAGE
      ¿Qué buscar?
           ↓
    [Opción seleccionada]
           ↓
    ┌─────────────────────────────────────────────┐
    │ - Aulas/Laboratorios (browse horarios)      │
    │ - Profesores (horarios del profesor)        │
    │ - Materias (dónde se imparte)               │
    │ - Grupos (horarios del grupo)               │
    │ - Carreras (información general)            │
    │ - Horarios (visualización por día)          │
    │ - Administración (gestionar datos)          │
    │ - Importar CSV (cargar masivamente)         │
    └─────────────────────────────────────────────┘
           ↓
    VER RESULTADOS Y DETALLES
           ↓
    ¿MÁS ACCIONES?
    Sí → Búsqueda/Filtrado
    No → Volver al inicio o cerrar
```

## 📤 Funcionalidad de Importación CSV

### ¿Cómo funciona?

1. **Descargar plantilla**: Obtén un ejemplo de CSV correctamente formatado
2. **Llenar datos**: Completa el CSV con los horarios de tu institución
3. **Subir archivo**: Arrastra o selecciona el archivo en la interfaz
4. **Validación**: El sistema valida cada fila antes de importar
5. **Vista previa**: Muestra qué registros se importarán y cuáles tienen errores
6. **Importar**: Confirma la importación

### Estructura Exacta del CSV

```csv
carrera,grupo,semestre,materia,profesor,tipo_espacio,aula,dia,hora_inicio,hora_fin,turno,edificio,piso,observaciones
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,LUNES,08:00,10:00,DIURNO,Edificio A,1,Primera clase del semestre
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,MIERCOLES,08:00,10:00,DIURNO,Edificio A,1,
ADM-EMP,ADM-EMP-1A,1,Administración General,Dra. María López,AULA,Aula 103,LUNES,09:00,11:00,DIURNO,Edificio A,1,
CONT,CONT-1A,1,Contabilidad Financiera,Lic. Ana Martínez,AULA,Aula 102,MARTES,14:00,16:00,DIURNO,Edificio A,1,
```

### Descripción de Columnas

#### **Columnas OBLIGATORIAS:**

| Columna | Tipo | Ejemplo | Notas |
|---------|------|---------|-------|
| `carrera` | texto | ING-SIS | Código único de carrera |
| `grupo` | texto | ING-SIS-1A | Identificador del grupo |
| `semestre` | número | 1 | Semestre del grupo (1-8) |
| `materia` | texto | Programación I | Nombre de la materia |
| `profesor` | texto | Dr. Carlos Mendoza | Nombre completo |
| `tipo_espacio` | texto | AULA | AULA, LABORATORIO o AUDITORIO |
| `aula` | texto | Aula 101 | Identificador único del espacio |
| `dia` | texto | LUNES | LUNES, MARTES, MIERCOLES, JUEVES, VIERNES, SABADO |
| `hora_inicio` | texto | 08:00 | Formato HH:MM (00:00 a 23:59) |
| `hora_fin` | texto | 10:00 | Formato HH:MM (mayor que hora_inicio) |

#### **Columnas OPCIONALES:**

| Columna | Tipo | Ejemplo |
|---------|------|---------|
| `turno` | texto | DIURNO, NOCTURNO, ESPECIAL |
| `edificio` | texto | Edificio A |
| `piso` | número | 1 |
| `observaciones` | texto | Primera clase del semestre |

### Validaciones del CSV

❌ **Se rechazarán registros con:**
- Campos obligatorios vacíos
- Formato de hora inválido (no HH:MM)
- Día de la semana inválido
- Tipo de espacio inválido
- Traslapes en el mismo aula, día y hora
- Profesor con dos clases simultáneamente
- Grupo con dos materias simultáneamente

✅ **Se aceptarán registros que:**
- Tengan todos los campos obligatorios
- Tengan formato correcto
- No causen conflictos

### Ejemplo Completo de CSV

```csv
carrera,grupo,semestre,materia,profesor,tipo_espacio,aula,dia,hora_inicio,hora_fin,turno,edificio,piso,observaciones
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,LUNES,08:00,10:00,DIURNO,Edificio A,1,Primera clase
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,MIERCOLES,08:00,10:00,DIURNO,Edificio A,1,
ING-SIS,ING-SIS-1A,1,Programación I,Dr. Carlos Mendoza,AULA,Aula 101,VIERNES,08:00,10:00,DIURNO,Edificio A,1,
ING-SIS,ING-SIS-1B,1,Programación I,Msc. Laura Sánchez,AULA,Aula 102,MARTES,10:00,12:00,DIURNO,Edificio A,1,
ING-SIS,ING-SIS-1B,1,Programación I,Msc. Laura Sánchez,AULA,Aula 102,JUEVES,10:00,12:00,DIURNO,Edificio A,1,
ING-SIS,ING-SIS-3A,3,Bases de Datos,Dr. Carlos Mendoza,LABORATORIO,Laboratorio de Informática,LUNES,14:00,16:00,DIURNO,Edificio B,1,Requiere Lab
ING-SIS,ING-SIS-3A,3,Bases de Datos,Dr. Carlos Mendoza,LABORATORIO,Laboratorio de Informática,MIERCOLES,14:00,16:00,DIURNO,Edificio B,1,
ING-SIS,ING-SIS-3A,3,Bases de Datos,Dr. Carlos Mendoza,LABORATORIO,Laboratorio de Informática,VIERNES,14:00,16:00,DIURNO,Edificio B,1,
ADM-EMP,ADM-EMP-1A,1,Administración General,Dra. María López,AULA,Aula 103,LUNES,09:00,11:00,DIURNO,Edificio A,1,
ADM-EMP,ADM-EMP-1A,1,Administración General,Dra. María López,AULA,Aula 103,MIERCOLES,09:00,11:00,DIURNO,Edificio A,1,
CONT,CONT-1A,1,Contabilidad Financiera,Lic. Ana Martínez,AULA,Aula 201,MARTES,14:00,16:00,DIURNO,Edificio A,2,
CONT,CONT-1A,1,Contabilidad Financiera,Lic. Ana Martínez,AULA,Aula 201,JUEVES,14:00,16:00,DIURNO,Edificio A,2,
DER,DER-1A,1,Derecho Constitucional,Dr. Roberto Fernández,AUDITORIO,Auditorio Principal,MARTES,10:00,12:00,DIURNO,Edificio C,1,
DER,DER-1A,1,Derecho Constitucional,Dr. Roberto Fernández,AUDITORIO,Auditorio Principal,VIERNES,10:00,12:00,DIURNO,Edificio C,1,
```

## 🐛 Problemas Comunes y Soluciones

### Error: "No se puede conectar a PostgreSQL"

**Solución:**
1. Verifica que PostgreSQL está corriendo:
   ```bash
   # Windows: Abre Services y busca PostgreSQL
   # macOS: brew services list | grep postgres
   # Linux: sudo systemctl status postgresql
   ```

2. Verifica las credenciales en `.env`:
   ```
   DATABASE_URL="postgresql://usuario:contraseña@localhost:5432/horarios_db"
   ```

3. Verifica que la base de datos existe:
   ```sql
   \l  -- lista bases de datos
   ```

### Error: "Puerto 5000 ya está en uso"

**Solución:**
Cambia el puerto en `.env`:
```
PORT=5001
```

Y en el frontend, actualiza `.env.local`:
```
VITE_API_URL=http://localhost:5001/api
```

### Error al importar CSV: "Traslape de horarios"

**Solución:**
Asegúrate de que no hay:
- La misma aula en el mismo día/hora
- El mismo profesor en dos clases simultáneamente
- El mismo grupo en dos materias simultáneamente

### Frontend no ve datos (CORS error)

**Solución:**
1. Verifica que el backend está corriendo en `http://localhost:5000`
2. Verifica que FRONTEND_URL en `.env` del backend es correcto
3. Reinicia ambos servidores

### Base de datos vacía

**Solución:**
Vuelve a ejecutar los seeds:
```bash
cd backend
npm run prisma:seed
```

## 🚀 Futuras Mejoras Sugeridas

### Autenticación y Roles
- [ ] Sistema de login con JWT
- [ ] Roles: admin, profesor, estudiante
- [ ] Permisos según rol

### Mejoras en Horarios
- [ ] Exportación a Excel/PDF
- [ ] Calendario interactivo tipo Google Calendar
- [ ] Notificaciones de cambios
- [ ] Historial de cambios

### Funcionalidades Avanzadas
- [ ] Integración con calendario (Google Calendar, Outlook)
- [ ] Disponibilidad en tiempo real
- [ ] Generador automático de horarios (algoritmo)
- [ ] Reportes analíticos
- [ ] Dashboard con estadísticas

### Mejoras Técnicas
- [ ] Testing automático (Jest, Vitest)
- [ ] CI/CD pipeline
- [ ] Dockerización
- [ ] Caché con Redis
- [ ] Búsqueda ElasticSearch

### Experiencia de Usuario
- [ ] Tema oscuro
- [ ] Internacionalización (i18n)
- [ ] Modo offline
- [ ] PWA (aplicación progresiva)

## 📊 Datos Precargados

La aplicación viene con datos de ejemplo:

**Carreras:**
- Ingeniería en Sistemas (ING-SIS)
- Administración de Empresas (ADM-EMP)
- Contabilidad (CONT)
- Derecho (DER)

**Profesores:**
- Dr. Carlos Mendoza (Ingeniería)
- Dra. María López (Administración)
- Ing. José García (Ingeniería)
- Lic. Ana Martínez (Contabilidad)
- Dr. Roberto Fernández (Derecho)
- Msc. Laura Sánchez (Ingeniería)

**Espacios:**
- Aulas: 101, 102, 103, 201
- Laboratorios: Laboratorio de Informática, Laboratorio de Redes
- Auditorios: Auditorio Principal

**Horarios:** Completos para el período 2024-1

## 📞 Soporte

Para reportar problemas o sugerencias:
1. Revisa la sección de "Problemas Comunes"
2. Verifica toda la configuración
3. Comprueba los logs del servidor
4. Contacta al equipo de desarrollo

## 📄 Licencia

Este proyecto es de código abierto y está disponible para uso educativo.

---

**Versión:** 1.0.0  
**Última actualización:** 2024  
**Desarrollado por:** Equipo de Programación Web
