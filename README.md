# OcanaTurismo

Sitio web oficial de turismo del municipio de **Ocaña, Norte de Santander, Colombia**.

Alineado con el **Plan de Desarrollo Turístico Convencional 2023-2034** y el Plan de Desarrollo Municipal "Ocaña Renovada 2024-2027", línea estratégica "Ocaña Potencia Regional".

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| **Next.js 15** (App Router) | Framework frontend |
| **Payload CMS v3** | Panel de administración headless |
| **PostgreSQL** | Base de datos (Neon en producción) |
| **Tailwind CSS v3** | Estilos |
| **Vercel** | Despliegue |

---

## Instalación local

### Prerrequisitos

- Node.js 20+
- PostgreSQL corriendo localmente (o cuenta en [Neon](https://neon.tech))

### 1. Clonar e instalar

```bash
git clone <repo-url>
cd ocanaturismo
npm install
```

### 2. Configurar variables de entorno

```bash
cp .env.example .env
```

Edita `.env` con tus valores:

```env
# PostgreSQL local
DATABASE_URI=postgresql://postgres:postgres@localhost:5432/ocanaturismo

# Secret seguro de Payload (mínimo 32 caracteres)
PAYLOAD_SECRET=cambia-esto-por-un-secreto-muy-seguro-aqui

# URL del sitio
NEXT_PUBLIC_SERVER_URL=http://localhost:3000
```

### 3. Crear la base de datos (PostgreSQL local)

```bash
createdb ocanaturismo
```

O con Docker:

```bash
docker run --name ocana-db -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=ocanaturismo -p 5432:5432 -d postgres:16
```

### 4. Ejecutar en desarrollo

```bash
npm run dev
```

El sitio estará disponible en `http://localhost:3000`.
El panel de administración en `http://localhost:3000/admin`.

### 5. Crear usuario administrador

Al abrir `/admin` por primera vez, Payload te pedirá crear un usuario.
Usa tu correo y una contraseña segura.

### 6. Cargar datos de semilla

El seed usa la **REST API** de Payload, por lo que el servidor **debe estar corriendo** antes de ejecutarlo.

```bash
# Terminal 1 — servidor corriendo
npm run dev

# Terminal 2 — seed (con credenciales del admin que creaste en el paso anterior)
SEED_EMAIL=tu@correo.com SEED_PASSWORD=TuContraseña npm run seed
```

En Windows (PowerShell):

```powershell
$env:SEED_EMAIL="tu@correo.com"; $env:SEED_PASSWORD="TuContraseña"; npm run seed
```

Esto carga los datos oficiales del **Plan de Desarrollo Turístico 2023-2034**:
- 25 atractivos turísticos (religiosos, históricos, naturales, gastronómicos)
- 5 rutas turísticas
- 7 eventos culturales y religiosos
- 15 prestadores de servicios (hoteles y artesanos)

> Si omites las variables de entorno, el seed usa `admin@ocanaturismo.com` / `Admin1234!` como credenciales por defecto.

---

## Despliegue en Vercel + Neon PostgreSQL

### Costo total del MVP: ~$12 USD/año (solo el dominio)

| Servicio | Plan | Costo |
|---|---|---|
| **Vercel** | Hobby | Gratis |
| **Neon** | Free (0.5 GB) | Gratis |
| **Cloudinary** | Free (25 GB media) | Gratis |
| **Dominio** ocanaturismo.com | Namecheap/GoDaddy | ~$12 USD/año |

### Paso 1: Crear base de datos en Neon

1. Ir a [neon.tech](https://neon.tech) y crear cuenta gratuita
2. Crear un nuevo proyecto: **ocanaturismo**
3. Copiar el **Connection string** (formato: `postgresql://...@...neon.tech/neondb?sslmode=require`)

### Paso 2: Desplegar en Vercel

```bash
# Instalar CLI de Vercel
npm i -g vercel

# Desde la carpeta del proyecto
vercel

# Seguir las instrucciones del asistente
```

O conectar el repositorio desde [vercel.com](https://vercel.com/new).

### Paso 3: Configurar variables de entorno en Vercel

En el dashboard de Vercel → Settings → Environment Variables, añadir:

| Variable | Valor |
|---|---|
| `DATABASE_URI` | La connection string de Neon |
| `PAYLOAD_SECRET` | Mínimo 32 caracteres aleatorios |
| `NEXT_PUBLIC_SERVER_URL` | `https://www.ocanaturismo.com` |

### Paso 4: Cargar datos de semilla en producción

Una vez desplegado:

```bash
# Con las variables de entorno de producción
DATABASE_URI="tu-uri-de-neon" PAYLOAD_SECRET="tu-secret" npm run seed
```

O ejecutarlo desde el panel de Vercel usando una función edge/cron (avanzado).

### Paso 5: Conectar el dominio www.ocanaturismo.com

1. En Vercel → Settings → Domains
2. Añadir `ocanaturismo.com` y `www.ocanaturismo.com`
3. En tu proveedor de dominio (Namecheap/GoDaddy), apuntar los DNS a Vercel:
   - **CNAME** `www` → `cname.vercel-dns.com`
   - **A** `@` → `76.76.21.21`
4. Esperar propagación DNS (5-30 minutos)

---

## Estructura del proyecto

```
ocanaturismo/
├── src/
│   ├── app/
│   │   ├── (frontend)/          # Páginas públicas del sitio
│   │   │   ├── page.tsx         # Inicio
│   │   │   ├── descubre/        # Descubre Ocaña
│   │   │   ├── atractivos/      # Listado y detalle
│   │   │   ├── rutas/           # Rutas turísticas
│   │   │   ├── eventos/         # Agenda
│   │   │   ├── directorio/      # Prestadores
│   │   │   ├── noticias/        # Blog
│   │   │   ├── institucional/   # Info institucional
│   │   │   └── contacto/        # Formulario
│   │   ├── (payload)/admin/     # Panel de Payload CMS
│   │   ├── api/[...slug]/       # API routes de Payload
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── collections/             # Colecciones de Payload CMS
│   │   ├── Atractivos.ts
│   │   ├── Rutas.ts
│   │   ├── Eventos.ts
│   │   ├── Prestadores.ts
│   │   ├── Noticias.ts
│   │   ├── Paginas.ts
│   │   ├── Galerias.ts
│   │   ├── Medios.ts
│   │   └── Usuarios.ts
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   └── ui/
│   │       ├── AtractivoCard.tsx
│   │       ├── EventoCard.tsx
│   │       └── RutaCard.tsx
│   └── lib/
│       ├── payload.ts           # Cliente Payload
│       ├── seedData.ts          # Datos oficiales
│       └── seed.ts              # Script de seed
├── payload.config.ts            # Configuración Payload CMS
├── next.config.ts
├── tailwind.config.ts
└── .env.example
```

---

## Panel de administración

Acceder en: `http://localhost:3000/admin` (desarrollo) o `https://www.ocanaturismo.com/admin` (producción).

### Colecciones disponibles

| Colección | Ruta pública |
|---|---|
| Atractivos | `/atractivos/[slug]` |
| Rutas | `/rutas/[slug]` |
| Eventos | `/eventos/[slug]` |
| Prestadores | `/directorio` |
| Noticias | `/noticias/[slug]` |
| Páginas | Estáticas |
| Galerías | Próximamente |
| Medios | Archivos e imágenes |

---

## Funcionalidades futuras (cimientos incluidos)

- **Mapa interactivo**: Los campos `coordenadas` (latitud/longitud) están en la colección `atractivos`
- **Multilenguaje**: Estructura de App Router lista para `next-intl`
- **Formularios**: Backend preparado en API routes de Payload
- **Analítica**: Añadir Vercel Analytics con una línea en `layout.tsx`
- **PWA**: Compatible con `next-pwa`
- **Imágenes Cloudinary**: Reemplazar `upload: true` en `Medios.ts` por el adapter de Cloudinary

---

## Contexto institucional

- **Alcaldía de Ocaña** — Administración 2024-2027
- **Plan de Desarrollo**: "Ocaña Renovada 2024-2027"
- **Línea estratégica**: "Ocaña Potencia Regional"
- **Plan Turístico**: Convencional del Municipio de Ocaña 2023-2034
- **Secretaría responsable**: Educación, Cultura y Turismo
- **Dominio objetivo**: `www.ocanaturismo.com`
