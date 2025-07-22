# 🎖️ Medals Factory

Aplicación fullstack que permite gestionar países y medallas. Desarrollada con **Laravel** (backend) y **React** (frontend).

---

## 📁 Estructura del proyecto

```
/project-root
├── backend/     → Proyecto Laravel
└── frontend/    → Proyecto React
```

---

## ⚙️ Requisitos

- PHP >= 8.1
- Composer
- Node.js >= 18
- NPM o Yarn
- Laravel (Recomendado: Laravel Herd o XAMPP)
- MySQL o MariaDB
- Git

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo
```

### 2. Configurar el backend (Laravel)

```bash
cd backend
cp .env.example .env
composer install
php artisan key:generate
php artisan migrate --seed   # Ejecuta las migraciones y seeders (opcional)
php artisan serve
```

> El backend correrá en: [http://localhost:8000](http://localhost:8000)

Puedes cambiar la URL base en `frontend/.env` si es necesario.

---

### 3. Configurar el frontend (React)

```bash
cd ../frontend
cp .env.example .env     # o crea uno manualmente con la URL del backend
npm install              # o yarn
npm run dev              # o yarn dev
```

> El frontend correrá en: [http://localhost:5173](http://localhost:5173)

---

## 🔧 Variables de entorno

### 📦 Frontend (`frontend/.env`)
```
VITE_API_URL=http://localhost:8000/api
```

### 🔐 Backend (`backend/.env`)
Configura los accesos a base de datos, correo, etc. en el archivo `.env`.

---

## 🛠️ Scripts útiles

**Backend**

```bash
php artisan migrate:fresh --seed   # Resetear y poblar la BD
php artisan serve                  # Levantar servidor local
```

**Frontend**

```bash
npm run dev      # Levantar en desarrollo
npm run build    # Compilar para producción
```

---

## 👨‍💻 Autor

Desarrollado por [Johny Molano](https://github.com/little-Johny) 🤘  
Licencia: MIT

---

## 🧠 Notas adicionales

- Si usas Laravel Herd o XAMPP, asegúrate de no tener conflictos con puertos.
- Puedes desplegar el backend y frontend en servidores separados o usar Vite proxy para desarrollo.
