# 📋 Tablero Kanban Colaborativo en Tiempo Real

Sistema de gestión de tareas tipo Trello con funcionalidades de colaboración en tiempo real y exportación automatizada.

## 🌟 Características Principales

- ✨ Colaboración en tiempo real
- 🔄 Drag & Drop para mover tareas
- 📊 Columnas personalizables
- 📧 Exportación vía email

## 🛠️ Tecnologías Utilizadas

### Frontend
- React.js
- Socket.io Client
- Drag & Drop
- TypeScript

### Backend
- NestJS
- Socket.io
- MongoDB
- Prisma ORM

### Automatización
- N8N (v1.106.3)
- Webhooks
- CSV Generation
- Email Service

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js >= 18
- MongoDB
- Docker
- pnpm

### Variables de Entorno

```env
# Backend
DATABASE_URL="mongodb://localhost:27017/kanban?directConnection=true"
N8N_WEBHOOK_URL=http://localhost:5678/webhook/kanban-export
```

### Instalación Manual

1. **Iniciar los contenedores de MongoDB y n8n**
```bash
docker compose up -d
```

2. **Backend**
```bash
cd backend
pnpm install
pnpx prisma generate
pnpm start:dev
```

3. **Frontend**
```bash
cd frontend
pnpm install
pnpm dev
```

## 💡 Uso

### Tablero Kanban
1. Accede a la aplicación en `http://localhost:5173`
2. Crea nuevas columnas para organizar tus tareas
3. Añade tareas a las columnas
4. Arrastra y suelta las tareas entre columnas
5. Observa cómo los cambios se sincronizan en tiempo real

### Exportación de Backlog
1. Haz clic en el botón "Exportar Backlog"
2. Configura el email de destino
3. Espera la notificación de envío exitoso
4. Revisa tu correo para encontrar el archivo CSV

## 📁 Estructura del Proyecto

```
useTeam-PT/
├── README.md
├── frontend/
│   ├── package.json
│   └── src/
├── backend/
│   ├── package.json
│   ├── src/
│   └── docker-compose.yml
└── n8n/
    ├── workflow.json
    └── setup-instructions.md
```

## 📊 Formato del CSV Exportado

El archivo CSV incluye los siguientes campos:
- ID de tarea
- Título
- Descripción
- Columna actual
- Fecha de creación

## 🔄 Flujo de Exportación

1. Usuario solicita exportación desde el frontend
2. Backend procesa la solicitud
3. N8N recibe webhook y extrae datos
4. Generación y estructuración del CSV
5. Envío por email
