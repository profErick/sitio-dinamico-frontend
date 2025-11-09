# Frontend React + Vite - Gestión de Servicios

Frontend desarrollado con React 18, Vite y Bootstrap 5 para consumir la API REST del backend Django.

## 🚀 Características

- **Listado de Servicios** con búsqueda, filtros y ordenación
- **Detalle de Servicio** con información completa y solicitudes relacionadas
- **Crear/Editar Servicios** con validación en cliente
- **Crear Solicitudes** enlazadas a servicios
- **Diseño Responsivo** con Bootstrap 5
- **Manejo de Errores** con mensajes claros
- **Estados de Carga** e indicadores visuales
- **Confirmaciones** antes de eliminar

## 📋 Requisitos

- Node.js 18 o superior
- npm o yarn
- Backend Django corriendo (ver [README del backend](../backend/README.md))

## 🔧 Instalación

### 1. Instalar dependencias

```bash
npm install
```

### 2. Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con la URL de tu backend:

**Desarrollo:**
```env
VITE_API_BASE_URL=http://localhost:8000/api
```

**Producción:**
```env
VITE_API_BASE_URL=https://tu-backend.onrender.com/api
```

### 3. Ejecutar en desarrollo

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

### 4. Build para producción

```bash
npm run build
```

Los archivos optimizados se generarán en la carpeta `dist/`

### 5. Preview del build

```bash
npm run preview
```

## 📁 Estructura del Proyecto

```
frontend/
├── src/
│   ├── api/
│   │   ├── axios.js          # Configuración de axios
│   │   └── services.js       # Funciones API
│   ├── components/
│   │   ├── ServiceForm.jsx   # Formulario de servicio
│   │   ├── ServiceList.jsx   # Lista de servicios
│   │   ├── ServiceFilters.jsx # Filtros y búsqueda
│   │   └── RequestForm.jsx   # Formulario de solicitud
│   ├── pages/
│   │   ├── ServicesPage.jsx      # Listado de servicios
│   │   ├── ServiceDetailPage.jsx # Detalle de servicio
│   │   ├── ServiceCreatePage.jsx # Crear servicio
│   │   └── ServiceEditPage.jsx   # Editar servicio
│   ├── App.jsx               # Componente principal
│   ├── router.jsx            # Configuración de rutas
│   ├── main.jsx              # Punto de entrada
│   └── index.css             # Estilos globales
├── index.html
├── package.json
├── vite.config.js
├── netlify.toml              # Configuración para Netlify
├── .env.example
└── README.md
```

## 🎨 Funcionalidades

### Listado de Servicios

- **Búsqueda por texto**: Busca en nombre y descripción
- **Filtros**:
  - Por categoría (Web, Móvil, Cloud, Data, Seguridad, Consultoría)
  - Por estado (Activo/Inactivo)
  - Por rango de precio (mínimo y máximo)
- **Ordenación**: Por precio (asc/desc) o fecha (asc/desc)
- **Paginación**: 20 servicios por página
- **Acciones**: Ver detalle, Editar, Eliminar

### Detalle de Servicio

- Muestra toda la información del servicio
- Lista de solicitudes relacionadas
- Formulario para crear nueva solicitud
- Botón para editar el servicio

### Crear/Editar Servicio

- Formulario completo con validación
- Campos requeridos marcados con *
- Validación en tiempo real
- Feedback visual (verde/válido, rojo/inválido)

### Crear Solicitud

- Formulario simple con validación
- Se crea enlazada al servicio actual
- Validación de email y campos requeridos

## 🔌 Configuración de la API

El cliente HTTP está configurado en `src/api/axios.js` y usa la variable de entorno `VITE_API_BASE_URL`.

### Endpoints utilizados

- `GET /api/servicios/` - Listar servicios
- `GET /api/servicios/{id}/` - Obtener servicio
- `POST /api/servicios/` - Crear servicio
- `PUT /api/servicios/{id}/` - Actualizar servicio
- `DELETE /api/servicios/{id}/` - Eliminar servicio (soft delete)
- `GET /api/servicios/{id}/solicitudes/` - Listar solicitudes
- `POST /api/servicios/{id}/solicitudes/` - Crear solicitud

## 🚢 Despliegue en Netlify

### Prerrequisitos

Antes de desplegar el frontend, asegúrate de que:
1. ✅ El backend está desplegado y funcionando (Render o Railway)
2. ✅ Tienes la URL pública del backend (ej: `https://tu-backend.onrender.com`)
3. ✅ El endpoint `/api/health` del backend responde correctamente

### 1. Preparar el Proyecto Localmente

#### Verificar Build Local

Antes de desplegar, verifica que el build funciona localmente:

```bash
# Instalar dependencias
npm install

# Crear build de producción
npm run build

# Verificar que se creó la carpeta dist/
ls dist/
```

Si el build es exitoso, verás la carpeta `dist/` con los archivos optimizados.

#### Configurar .env para Producción

Crea un archivo `.env.production` (opcional, para pruebas locales):
```env
VITE_API_BASE_URL=https://tu-backend.onrender.com/api
```

**Nota:** En Netlify, las variables se configuran en el panel, no necesitas este archivo.

### 2. Crear Sitio en Netlify

#### Opción A: Desde GitHub/GitLab (Recomendado)

1. Ve a [Netlify Dashboard](https://app.netlify.com/)
2. Click en **"Add new site"** → **"Import an existing project"**
3. Selecciona **"Deploy with GitHub"** (o GitLab/Bitbucket)
4. Autoriza Netlify a acceder a tu repositorio
5. Selecciona el repositorio `sitio-dinamico`
6. Configura:
   - **Base directory**: `frontend` (si el frontend está en una subcarpeta)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

#### Opción B: Arrastrar y Soltar (Manual)

1. Ejecuta `npm run build` localmente
2. Ve a [Netlify Drop](https://app.netlify.com/drop)
3. Arrastra la carpeta `dist` al área de drop
4. Netlify desplegará automáticamente

### 3. Configurar Variables de Entorno

**IMPORTANTE:** Configura esto ANTES del primer despliegue.

1. En Netlify Dashboard, ve a tu sitio
2. Click en **"Site settings"** → **"Environment variables"**
3. Click en **"Add variable"** y agrega:

```
VITE_API_BASE_URL = https://tu-backend.onrender.com/api
```

**Reemplaza `https://tu-backend.onrender.com/api` con la URL real de tu backend desplegado.**

**Ejemplos:**
- Render: `https://sitio-dinamico-backend.onrender.com/api`
- Railway: `https://sitio-dinamico-backend.railway.app/api`

4. Click en **"Save"**

### 4. Configuración del Build

El archivo `netlify.toml` ya está configurado, pero puedes verificar/ajustar en el panel:

1. Ve a **"Site settings"** → **"Build & deploy"** → **"Build settings"**
2. Verifica:
   - **Base directory**: `frontend` (si aplica)
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`

### 5. Redirección SPA (Single Page Application)

El archivo `netlify.toml` ya incluye la configuración de redirección:

```toml
[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Esto asegura que todas las rutas de React Router funcionen correctamente.

### 6. Desplegar

#### Primera Vez (Desde GitHub)

1. Netlify detectará automáticamente el `netlify.toml`
2. Click en **"Deploy site"**
3. Netlify ejecutará:
   - `npm install`
   - `npm run build`
   - Desplegará la carpeta `dist/`
4. Espera 2-5 minutos para que termine el despliegue

#### Despliegues Subsecuentes

Cada vez que hagas `git push` a la rama principal, Netlify desplegará automáticamente.

### 7. Verificar Despliegue

Una vez desplegado, tu frontend estará disponible en:
```
https://tu-sitio.netlify.app
```

**Verificaciones iniciales:**
1. Abre la URL en el navegador
2. Verifica que la página carga correctamente
3. Abre la consola del navegador (F12) y verifica que no hay errores de conexión
4. Verifica que las peticiones al backend se hacen correctamente

### 8. Verificación Funcional Completa

#### ✅ 1. Health Check del Backend

Abre en el navegador o usa curl:
```
GET https://tu-backend.onrender.com/api/health
```

**Respuesta esperada:**
```json
{"status":"ok"}
```

#### ✅ 2. Crear Servicio desde el Frontend

1. Ve a `https://tu-sitio.netlify.app/servicios/crear`
2. Completa el formulario con datos válidos
3. Click en "Crear Servicio"
4. Verifica que:
   - Se muestra mensaje de éxito
   - Se redirige a la lista de servicios
   - El nuevo servicio aparece en la lista

**Verificar en Base de Datos:**
- Conecta a PostgreSQL desde Render/Railway
- Ejecuta: `SELECT * FROM services_servicio ORDER BY id DESC LIMIT 1;`
- Verifica que el servicio se creó con todos los campos

#### ✅ 3. Crear Solicitud desde el Detalle

1. Ve al detalle de un servicio: `https://tu-sitio.netlify.app/servicios/{id}`
2. Click en "Nueva" en la sección de Solicitudes
3. Completa el formulario de solicitud
4. Verifica que:
   - Se muestra mensaje de éxito
   - La solicitud aparece en la lista del servicio

**Verificar en Base de Datos:**
- Ejecuta: `SELECT * FROM services_solicitudcliente ORDER BY id DESC LIMIT 1;`
- Verifica que la solicitud está relacionada con el servicio correcto

#### ✅ 4. Filtros, Orden y Paginación

1. Ve a la lista de servicios
2. **Filtros:**
   - Selecciona una categoría → Verifica que solo muestra servicios de esa categoría
   - Filtra por precio mínimo/máximo → Verifica el rango
   - Filtra por estado activo/inactivo → Verifica el filtro
3. **Búsqueda:**
   - Escribe en el campo de búsqueda → Verifica que filtra por nombre/descripción
4. **Ordenación:**
   - Selecciona "Precio: Menor a Mayor" → Verifica el orden
   - Selecciona "Fecha: Más Reciente" → Verifica el orden
5. **Paginación:**
   - Si hay más de 20 servicios, verifica que aparece la paginación
   - Navega entre páginas y verifica que funciona

#### ✅ 5. Pruebas Unitarias del Backend

Antes de desplegar, ejecuta localmente:
```bash
cd backend
python manage.py test
```

**Todos los tests deben pasar:**
- ✅ Tests de modelos
- ✅ Tests de serializers
- ✅ Tests de vistas

#### ✅ 6. Seed Data Cargada y Visible

1. En el backend desplegado, ejecuta (desde la consola de Render/Railway):
   ```bash
   python manage.py seed_services
   ```
2. En el frontend, verifica que:
   - Se muestran 10 servicios en la lista
   - Cada servicio tiene información completa
   - Las solicitudes aparecen en los detalles de los servicios

### 9. Capturas para el Informe

#### Lista con Filtros Activos
- Captura de la página de servicios con filtros aplicados
- Muestra: categoría seleccionada, rango de precio, búsqueda activa

#### Formulario en Error y en Éxito
- **Error:** Captura del formulario con campos inválidos (ej: precio negativo)
- **Éxito:** Captura del mensaje de éxito después de crear/editar

#### Detalle con Solicitudes
- Captura de la página de detalle mostrando:
  - Información completa del servicio
  - Lista de solicitudes relacionadas
  - Formulario para crear nueva solicitud

#### Respuesta JSON en Postman
- Captura de Postman mostrando:
  - Request: `GET /api/servicios/`
  - Response: JSON con lista de servicios paginada
  - Headers y status code

#### Tabla en DB Mostrando 10+ Campos
- Captura de la base de datos PostgreSQL mostrando:
  - Tabla `services_servicio` con todos los campos visibles
  - Al menos un registro completo con los 10 campos del modelo

### 10. Troubleshooting

**Error: "Failed to fetch" o CORS error**
- Verifica que `VITE_API_BASE_URL` está configurado correctamente en Netlify
- Verifica que `CORS_ALLOWED_ORIGINS` en el backend incluye tu dominio de Netlify
- Revisa la consola del navegador para ver el error exacto

**Error: "404 Not Found" en rutas**
- Verifica que `netlify.toml` tiene la configuración de redirects
- Verifica que el archivo está en la raíz del frontend

**Error: "Build failed"**
- Revisa los logs de build en Netlify
- Verifica que `package.json` tiene todas las dependencias
- Asegúrate de que el comando `npm run build` funciona localmente

**Las peticiones no llegan al backend**
- Verifica que `VITE_API_BASE_URL` está configurado en Netlify (no en `.env`)
- Verifica que la URL del backend es correcta y accesible
- Prueba el endpoint directamente en el navegador

### 11. Actualizar Variables de Entorno

Si necesitas cambiar la URL del backend después del despliegue:

1. Ve a **"Site settings"** → **"Environment variables"**
2. Edita `VITE_API_BASE_URL`
3. Click en **"Save"**
4. Ve a **"Deploys"** → **"Trigger deploy"** → **"Deploy site"**
5. Netlify reconstruirá con la nueva variable

### 12. Dominio Personalizado (Opcional)

1. Ve a **"Site settings"** → **"Domain management"**
2. Click en **"Add custom domain"**
3. Sigue las instrucciones para configurar DNS
4. Actualiza `CORS_ALLOWED_ORIGINS` en el backend con el nuevo dominio

## 🧪 Scripts Disponibles

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Crear build de producción
npm run build

# Preview del build local
npm run preview
```

## 🎯 Validaciones

### Servicio

- **Nombre**: Requerido, no vacío
- **Descripción**: Requerida, no vacía
- **Precio**: Requerido, número >= 0
- **Nivel de Prioridad**: Requerido, entre 1 y 5
- **Email Responsable**: Requerido, formato válido
- **Tiempo Estimado**: Requerido, número >= 0

### Solicitud

- **Nombre Cliente**: Requerido, no vacío
- **Email Cliente**: Requerido, formato válido
- **Mensaje**: Requerido, no vacío

## 🐛 Manejo de Errores

- Errores de validación se muestran debajo de cada campo
- Errores de API se muestran en alertas Bootstrap
- Confirmaciones antes de eliminar servicios
- Mensajes de éxito después de operaciones exitosas

## 📱 Diseño Responsivo

- **Desktop**: Grid de 3 columnas para servicios
- **Tablet**: Grid de 2 columnas
- **Mobile**: Grid de 1 columna
- Navbar colapsable en móviles
- Formularios adaptativos

## 🔒 Seguridad

- Validación en cliente y servidor
- Sanitización de datos de entrada
- Manejo seguro de errores sin exponer información sensible

## 🛠️ Tecnologías Utilizadas

- **React 18**: Biblioteca de UI
- **Vite**: Build tool y dev server
- **React Router DOM**: Enrutamiento
- **Axios**: Cliente HTTP
- **Bootstrap 5**: Framework CSS
- **Bootstrap Icons**: Iconos

## 📝 Notas

- Asegúrate de que el backend esté corriendo antes de iniciar el frontend
- En desarrollo, el backend debe estar en `http://localhost:8000`
- En producción, actualiza `VITE_API_BASE_URL` con la URL de tu backend desplegado
- Los cambios en `.env` requieren reiniciar el servidor de desarrollo

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 👤 Autor

Desarrollado para el proyecto sitio-dinamico.

---

**Nota**: Recuerda configurar `VITE_API_BASE_URL` correctamente según tu entorno (desarrollo o producción).

# sitio-dinamico-frontend
