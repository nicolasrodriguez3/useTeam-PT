# Kanban Board Backend

API REST desarrollada con NestJS para gestionar un tablero Kanban con columnas y tareas en tiempo real.

## Características

- 🔄 Actualizaciones en tiempo real usando WebSockets
- 📊 Gestión de columnas y tareas
- 🚀 API RESTful completa
- 🗃️ Base de datos MongoDB

## Requisitos Previos

- Node.js (v18 o superior)
- MongoDB
- pnpm (gestor de paquetes)

## Configuración del Entorno

1. Instala las dependencias:
   ```bash
   pnpm install
   ```

2. Crea un archivo `.env`:
   ```env
   DATABASE_URL="mongodb://localhost:27017/kanban?directConnection=true"
   ```

## Ejecución

### Desarrollo

```bash
# Iniciar el servidor en modo desarrollo
pnpm run start:dev
```


## Estructura del Proyecto

```
src/
├── board/           # WebSocket Gateway para actualizaciones en tiempo real
├── columns/         # Módulo para gestión de columnas
├── tasks/           # Módulo para gestión de tareas
├── export/          # Módulo para la exportación del tablero
├── common/          # Código compartido (excepciones, etc.)
├── prisma/          # Configuración de Prisma y servicio
└── main.ts          # Punto de entrada de la aplicación
```

## API Endpoints

### Columnas

- `GET /columns` - Obtener todas las columnas
- `POST /columns` - Crear una nueva columna
- `PATCH /columns/:id` - Renombrar una columna
- `DELETE /columns/:id` - Eliminar una columna

### Tareas

- `GET /tasks` - Obtener todas las tareas
- `POST /tasks` - Crear una nueva tarea
- `PATCH /tasks/:id/move` - Mover una tarea
- `DELETE /tasks/:id` - Eliminar una tarea

## WebSocket Events

El servidor emite eventos WebSocket para mantener sincronizados a todos los clientes:

- `boardUpdated` - Emitido cuando hay cambios en el tablero

## Manejo de Errores

La API incluye manejo de errores personalizado para:

- Entidades no encontradas (404)
- Validación de datos (400)
- Posiciones inválidas (400)
- Conflictos de posición (409)

## Tecnologías Principales

- [NestJS](https://nestjs.com/) - Framework de backend
- [Prisma](https://www.prisma.io/) - ORM
- [Socket.io](https://socket.io/) - WebSockets
- [MongoDB](https://www.mongodb.com/) - Base de datos
- [class-validator](https://github.com/typestack/class-validator) - Validación de datos
