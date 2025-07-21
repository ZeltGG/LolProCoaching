# 🎮 LoLProCoaching

Plataforma web desarrollada para jugadores de **League of Legends** que buscan mejorar su nivel competitivo mediante sesiones de coaching personalizadas.

---

## 📁 Estructura del Proyecto

Este repositorio contiene un proyecto full stack dividido en:

- **/frontend** – Aplicación Angular para el usuario.
- **/backend** – API RESTful construida con Node.js, Express y MongoDB.

---

## 🚀 Tecnologías Usadas

### Frontend (Angular)
- Angular 17 + Standalone components
- Angular Router
- Reactive Forms
- AuthGuard
- Bootstrap / CSS personalizado

### Backend (Node.js + Express)
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Tokens (JWT)
- Dotenv
- CORS

---

## 🔐 Funcionalidades principales

- ✅ Registro e inicio de sesión con autenticación JWT
- ✅ Protección de rutas con `authGuard`
- ✅ Creación y gestión de sesiones de coaching
- ✅ Formulario reactivo con validaciones
- ✅ Visualización de sesiones en tarjetas modernas
- ✅ Diseño moderno inspirado en plataformas gamer (estilo ProGuides)

---

## 🛠️ Cómo ejecutar el proyecto localmente

1. Clonar el repositorio

Copiar
Editar
git clone https://github.com/ZeltGG/LoLProCoaching.git
cd LoLProCoaching

2. Configurar el backend

Copiar
Editar
cd backend
npm install
cp .env.example .env
Edita el archivo .env con tus propias variables:

env
Copiar
Editar
PORT=4000
MONGODB_URI=mongodb+srv://<usuario>:<password>@cluster.mongodb.net/lolpro
JWT_SECRET=tu_clave_secreta_super_segura
Luego, inicia el servidor:


Copiar
Editar
npm start
El backend correrá en http://localhost:4000

3. Ejecutar el frontend

Copiar
Editar
cd ../frontend
npm install
ng serve
La aplicación estará disponible en http://localhost:4200
