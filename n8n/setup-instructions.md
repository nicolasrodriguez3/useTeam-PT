# 🚀 Configuración de N8N para Exportación del tablero

Este documento proporciona las instrucciones detalladas para configurar y ejecutar N8N en el proyecto del Tablero Kanban.

## 📋 Prerequisitos

- Docker instalado en tu sistema
- Acceso al backend del proyecto Kanban
- Puerto 5678 disponible

## 🛠️ Instalación

El archivo `docker-compose.yml` ubicado dentro de la carpeta `backend` va a levantar tambien el servicio de N8N.

## 🔧 Configuración del Workflow

1. Accede a la interfaz de N8N en `http://localhost:5678`
2. Importa el workflow desde el archivo `workflow.json` proporcionado
3. Configura las credenciales necesarias para el envio de emails

## 📝 Configuración del Webhook

1. En el workflow, localiza el nodo "Webhook"
2. Copia la URL del webhook
3. Actualiza la variable `N8N_WEBHOOK_URL` en el backend del proyecto
