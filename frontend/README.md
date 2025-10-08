# 🎨 Frontend - Tablero Kanban Colaborativo

Interfaz de usuario para el sistema de gestión de tareas tipo Trello con funcionalidades de colaboración en tiempo real.

## ⚡️ Tecnologías Principales

- ⚛️ React 19
- 🎯 TypeScript
- 🎨 TailwindCSS
- 📦 Vite
- 🔄 Socket.io Client
- 🎭 DnD Kit (Drag and Drop)

## 🚀 Inicio Rápido

### Prerequisites

```bash
node >= 18
pnpm >= 8
```

### Instalación

1. Instala las dependencias:
```bash
npm install -g pnpm
pnpm install
```

2. Inicia el servidor de desarrollo:
```bash
pnpm dev
```

La aplicación estará disponible en `http://localhost:5173`


## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── components/     # Componentes React
│   │   ├── Board.tsx   # Componente principal del tablero
│   │   ├── Column.tsx  # Componente de columna
│   │   └── Task.tsx    # Componente de tarea
│   ├── hooks/          # Custom hooks
│   │   └── useSocket.ts
│   ├── services/       # Servicios API
│   │   └── api.ts
│   ├── App.tsx         # Componente raíz
│   └── main.tsx        # Punto de entrada
├── public/             # Archivos públicos
└── index.html          # Archivo HTML principal
```

## 🎮 Características Principales

### Tablero Kanban
- Interfaz intuitiva tipo Trello
- Drag and Drop entre columnas
- Animaciones suaves
- Diseño responsive

### Colaboración en Tiempo Real
- Sincronización instantánea de cambios
- Notificaciones de actualizaciones
- Estado compartido entre usuarios

### Exportación de Backlog
- Interfaz para configurar exportación
- Selección de campos a exportar
- Notificaciones de estado de exportación

## 🔧 Configuración

### Drag and Drop
El sistema utiliza `@dnd-kit` para manejar las interacciones de arrastrar y soltar:

```tsx
import { DndContext, DragOverlay } from '@dnd-kit/core'
import { SortableContext } from '@dnd-kit/sortable'
```

### WebSocket
La conexión en tiempo real se maneja a través de Socket.io:

```tsx
import { useSocket } from '../hooks/useSocket'
```

## 📚 Recursos Adicionales

- [Documentación de React](https://react.dev)
- [Guía de DnD Kit](https://docs.dndkit.com/)
- [Socket.io Client Docs](https://socket.io/docs/v4/client-api)
