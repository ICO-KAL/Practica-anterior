# Practica anterior

Aplicación Node.js lista para ejecutarse con Docker y desplegarse automáticamente con GitHub Actions.

## Qué hace el flujo

Cada push a la rama main:

1. construye la imagen Docker,
2. la sube a Docker Hub,
3. dispara el deploy en Render.

## Secrets necesarios en GitHub

Configura estos secretos en el repositorio:

- `DOCKER_USERNAME`: usuario de Docker Hub.
- `DOCKER_PASSWORD`: access token de Docker Hub.
- `RENDER_API_KEY`: API key de Render.
- `RENDER_SERVICE_ID`: identificador del servicio en Render.

## Ejecución local

```bash
npm install
npm start
```

La app usa estas variables de entorno opcionales:

- `PORT`
- `DB_HOST`
- `DB_PORT`
- `DB_NAME`
- `DB_USER`
- `DB_PASSWORD`
- `FALLBACK_MESSAGE`

## Deploy en Render

Crea un Web Service tipo Docker en Render apuntando a este repositorio. Luego agrega el `RENDER_SERVICE_ID` y la `RENDER_API_KEY` en GitHub para que el despliegue se active automáticamente.
