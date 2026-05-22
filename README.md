# 👕 Tienda de Camisetas - E-Commerce (Sprint 3)

¡Bienvenido al repositorio de la Tienda de Camisetas! Este proyecto es una plataforma de comercio electrónico desarrollada con **Node.js** y **Express**, que en este Sprint dio el salto definitivo hacia la persistencia de datos real utilizando **SQLite**.

## 🚀 Características del Sprint 3
* **Persistencia en Base de Datos:** Migración completa del sistema de archivos JSON a una base de datos relacional con SQLite (`better-sqlite3`).
* **Carrito de Compras Blindado:** El carrito de compras se gestiona en la sesión del usuario (`express-session`), validando existencias y calculando precios/totales en tiempo real directamente desde la base de datos para evitar fraudes.
* **Normalización y Seguridad de IDs:** Implementación de un sistema centralizado de validación de IDs que ataja errores y devuelve respuestas HTTP 400 (Bad Request) o 404 (Not Found) según corresponda.
* **Código Limpio:** Eliminación total de dependencias antiguas de archivos de texto (`fs`, `path`) y código muerto.

## 🛠️ Tecnologías utilizadas
* **Backend:** Node.js, Express
* **Base de datos:** SQLite3
* **Motor de plantillas:** EJS & Express EJS Layouts
* **Estilos:** CSS3 nativo
* **Control de versiones:** Git & GitHub

## 💻 Cómo hacer funcionar el proyecto localmente

Seguí estos pasos para levantar el entorno de desarrollo en tu computadora:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/LisandroNR/E-Commerce-Sprint-1.git](https://github.com/LisandroNR/E-Commerce-Sprint-1.git)
cd E-Commerce-Sprint-1
```

### 2. Instalar dependencias
Instalá los módulos necesarios (Express, Better-SQLite3, EJS, etc.) ejecutando:
```bash
npm install
```

### 3. Iniciar el servidor
Levantá la aplicación con Node.js:
```bash
node app.js
```

### 4. Acceder al navegador
Abrí tu navegador web e ingresá a la siguiente dirección:
```text
http://localhost:3000
```

---
*Desarrollado de forma prolija y estructurada para la entrega final del Sprint 3.*