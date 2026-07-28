# 👕 Tienda de Camisetas - Backend & E-Commerce Público (Sprint / Final)

¡Bienvenido al repositorio principal de la Tienda de Camisetas! Este proyecto representa el núcleo de nuestra plataforma de comercio electrónico. En esta etapa final, el sistema evolucionó para funcionar en dos frentes simultáneos: como una tienda pública completa renderizada del lado del servidor y como una **API REST** robusta que alimenta al panel de administrador externo.

## 🚀 Características del Sprint Final
* **Arquitectura Dual:** El servidor ahora maneja las vistas públicas de la tienda mediante EJS y expone endpoints de la API (en rutas `/api/...`) para ser consumidos por el Frontend de React.
* **Gestión Inteligente de Imágenes:** Implementación de lógica dinámica para procesar y renderizar tanto enlaces externos (URLs de internet) como archivos locales de forma transparente sin romper la interfaz.
* **Catálogo Dinámico y Búsqueda:** Sistema de filtrado por categorías directamente desde la barra de navegación y un buscador funcional para encontrar camisetas por nombre.
* **Diseño UI Mejorado:** Implementación de Flexbox y Grid para asegurar tarjetas de productos simétricas, una vista de detalle estilizada y una sección de productos relacionados responsiva.
* **Persistencia en Base de Datos Relacional:** Gestión completa de Productos y Categorías con SQLite (`better-sqlite3`), manteniendo el carrito blindado mediante `express-session`.

## 🛠️ Tecnologías utilizadas
* **Backend:** Node.js, Express
* **Base de datos:** SQLite3
* **Motor de plantillas:** EJS & Express EJS Layouts
* **Integración API:** CORS (para comunicación con React)
* **Estilos:** CSS3 nativo
* **Control de versiones:** Git & GitHub

## 💻 Cómo hacer funcionar el proyecto localmente

Seguí estos pasos para levantar el entorno de desarrollo en tu computadora:

### 1. Clonar el repositorio
```bash
git clone [https://github.com/LisandroNR/E-Commerce-Sprint-3.git](https://github.com/LisandroNR/E-Commerce-Sprint-3.git)
cd E-Commerce-Sprint-3
```

### 2. Instalar dependencias
Instalá los módulos necesarios (Express, Better-SQLite3, EJS, CORS, etc.) ejecutando:
```bash
npm install
```

### 3. Iniciar el servidor
Levantá la aplicación con Node.js:
```bash
npm start
```

### 4. Acceder al navegador
Abrí tu navegador web e ingresá a la siguiente dirección para ver la tienda pública:
```text
http://localhost:3000
```
*La API estará escuchando en el mismo puerto lista para conectarse con el Panel de Administrador.*

---
*Desarrollado de forma prolija y estructurada para la entrega final del proyecto.*
