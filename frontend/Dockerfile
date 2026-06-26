# Usar la misma versión ligera de Python que tienes en tu máquina
FROM python:3.10-slim

# Directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar todos tus archivos (dashboard.html, index.html, login.js, script.js, etc.)
COPY . .

# Exponer el puerto del frontend
EXPOSE 3000

# Ejecutar el comando exacto que usas en tu consola local
CMD ["python3", "-m", "http.server", "3000"]