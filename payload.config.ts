import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { fileURLToPath } from 'url'

import { Usuarios } from './src/collections/Usuarios'
import { Medios } from './src/collections/Medios'
import { Atractivos } from './src/collections/Atractivos'
import { Rutas } from './src/collections/Rutas'
import { Eventos } from './src/collections/Eventos'
import { Prestadores } from './src/collections/Prestadores'
import { Noticias } from './src/collections/Noticias'
import { Paginas } from './src/collections/Paginas'
import { Galerias } from './src/collections/Galerias'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Usuarios.slug,
    meta: {
      titleSuffix: '— OcanaTurismo Admin',
    },
  },
  collections: [
    Usuarios,
    Medios,
    Atractivos,
    Rutas,
    Eventos,
    Prestadores,
    Noticias,
    Paginas,
    Galerias,
  ],
  editor: lexicalEditor({}),
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret-cambia-esto',
  typescript: {
    outputFile: path.resolve(dirname, 'src/payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  upload: {
    limits: {
      fileSize: 10000000,
    },
  },
})
