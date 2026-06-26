Markdown

# 🚀 Sistema de Gestión de Casos y Monitoreo - Maqueta Interactiva

Este repositorio contiene la solución a la prueba técnica de desarrollo Full Stack para **INOVISEC**. La aplicación cuenta con un módulo de inicio de sesión seguro, validación criptográfica y un panel operativo con mapa interactivo (GIS).

Toda la aplicación ha sido empaquetada mediante **Docker y Docker Compose**. Esto permite que cualquier persona pueda ejecutar el proyecto completo en segundos con un solo comando, sin instalar Python, librerías o bases de datos locales.

---

## 🛠️ Requisitos Previos

Antes de arrancar, asegúrate de tener instalado en tu computadora:
* **Docker** (Versión 20.10 o superior)
* **Docker Compose** (Incluido en Docker Desktop o de forma nativa en Linux)

---

## 🚀 Instrucciones para Correr la Aplicación

Sigue estos 3 pasos en tu terminal para poner en marcha el proyecto:

### 1. Clonar el repositorio
Descarga el proyecto en tu máquina local y entra a la carpeta:
```bash
git clone https://github.com/acromaticodiego/case-management-system.git
cd case-management-system

2. Construir y encender el entorno (Docker)
docker compose up --build

3. Abrir la aplicación en el navegador
http://localhost:3000/index.html
