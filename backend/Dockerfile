# Usar la versión ligera de Python
FROM python:3.10-slim

WORKDIR /app

# Copiar el archivo de requerimientos e instalarlos
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copiar todo el código de la carpeta backend (main.py, database.py, sqlite3/)
COPY . .

# Asegurar que exista el directorio para la base de datos
RUN mkdir -p sqlite3

EXPOSE 8000

# Arrancar Uvicorn escuchando en todas las interfaces de red para que Docker lo exponga correctamente
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]