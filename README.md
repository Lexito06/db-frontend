# 🐉 Dragon Ball Universe - Frontend

Una aplicación web moderna desarrollada con Nuxt.js que consume datos del universo de Dragon Ball a través de una API REST personalizada construida en Laravel.

## 🌟 Características

- **Interfaz moderna y responsiva** construida con Nuxt.js
- **Renderizado del lado del servidor (SSR)** para mejor SEO y rendimiento
- **Consumo de API REST** personalizada desarrollada en Laravel
- **Datos actualizados** del universo Dragon Ball
- **Navegación fluida** entre personajes, transformaciones y sagas
- **Diseño adaptativo** optimizado para dispositivos móviles y desktop

## 📋 Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- [Node.js](https://nodejs.org/) (versión 16 o superior)
- [npm](https://www.npmjs.com/) o [yarn](https://yarnpkg.com/)
- Acceso a la [API de Dragon Ball Laravel](https://github.com/Lexito06/db-api)

## 🛠️ Instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/Lexito06/db-frontend
   cd db-frontend
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   ```

3. **Configura las variables de entorno**
   ```bash
   cp .env.example .env
   ```
   
   Edita el archivo `.env` y configura la URL de tu API:
   ```env
   NUXT_PUBLIC_API_BASE_URL=http://localhost:8000/api
   ```

4. **Inicia el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   ```

La aplicación estará disponible en `http://localhost:3000`

## 🏗️ Scripts disponibles

```bash
# Desarrollo
npm run dev

# Construcción para producción
npm run build

# Vista previa de la build de producción
npm run preview

# Análisis de la aplicación
npm run analyze

# Linting del código
npm run lint

# Formateo del código
npm run format
```

## 🔧 Configuración

### Variables de entorno

| Variable | Descripción | Valor por defecto |
|----------|-------------|-------------------|
| `NUXT_PUBLIC_API_BASE_URL` | URL base de la API Laravel | `http://localhost:8000/api` |
| `NUXT_PUBLIC_APP_NAME` | Nombre de la aplicación | `Dragon Ball Universe` |

### API Endpoints utilizados

La aplicación consume los siguientes endpoints de la API Laravel:

- `GET /personaje` - Lista de personajes
- `GET /personaje/{id}` - Detalle de un personaje
- `GET /planeta` - Lista de planetas


## 🎨 Tecnologías utilizadas

- **[Nuxt.js 3](https://nuxt.com/)** - Framework de Vue.js para aplicaciones web
- **[Vue.js 3](https://vuejs.org/)** - Framework JavaScript progresivo
- **[TypeScript](https://www.typescriptlang.org/)** - Superset de JavaScript con tipado estático
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[Pinia](https://pinia.vuejs.org/)** - Gestión de estado para Vue
- **[Axios](https://axios-http.com/)** - Cliente HTTP para realizar peticiones a la API

## 🔗 Proyectos relacionados

- **[Dragon Ball Laravel API](https://github.com/Lexito06/db-api)** - API REST backend que proporciona los datos

## 📞 Contacto

- **Autor**: Dalian Timotei Stetcu Stepanov
- **Email**: dalianstetcu@gmail.com
- **GitHub**: [Lexito06](https://github.com/Lexito06)
- **LinkedIn**: [Dalian Timotei Stetcu Stepanov](https://www.linkedin.com/in/dalian-timotei-stetcu-stepanov-aa59a6345/)

---

## 🙏 Agradecimientos

- [Dragon Ball API](https://dragonball-api.com/) por proporcionar los datos
- Comunidad de Laravel por las herramientas y documentación
- Toei Animation por crear el universo de Dragon Ball
- AlboradaIT por la ayuda, educación y posibilidad de trabajar con ellos ♥

---

⭐ Si este proyecto te ha sido útil, ¡no olvides darle una estrella!