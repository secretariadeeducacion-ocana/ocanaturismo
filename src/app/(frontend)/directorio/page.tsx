import type { Metadata } from 'next'
import type { Where } from 'payload'
import { getPayloadClient } from '@/lib/payload'
import type { Prestador } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Directorio Turístico',
  description: 'Directorio oficial de prestadores de servicios turísticos de Ocaña: hoteles, restaurantes, agencias de viajes, artesanos y más.',
}

const tipoLabel: Record<string, string> = {
  hotel: 'Hotel / Alojamiento',
  restaurante: 'Restaurante',
  agencia: 'Agencia de Viajes',
  artesano: 'Artesano',
  transporte: 'Transporte',
  otro: 'Otro',
}

const tipoEmoji: Record<string, string> = {
  hotel: '🏨',
  restaurante: '🍽️',
  agencia: '✈️',
  artesano: '🎨',
  transporte: '🚌',
  otro: '📋',
}

interface Props {
  searchParams: Promise<{ tipo?: string }>
}

async function getPrestadores(tipo?: string) {
  try {
    const payload = await getPayloadClient()
    const where: Where = tipo
      ? { and: [{ estado: { equals: 'publicado' } }, { tipo: { equals: tipo } }] }
      : { estado: { equals: 'publicado' } }
    const result = await payload.find({
      collection: 'prestadores',
      where,
      limit: 100,
      sort: 'nombre',
    })
    return result.docs as Prestador[]
  } catch {
    return []
  }
}

export default async function DirectorioPage({ searchParams }: Props) {
  const params = await searchParams
  const tipo = params.tipo || ''
  const prestadores = await getPrestadores(tipo)

  const tipos = Object.keys(tipoLabel)

  return (
    <>
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Directorio Turístico</h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Prestadores de servicios turísticos registrados en Ocaña:
            78 hoteles, restaurantes, agencias de viajes, artesanos y más.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filtros */}
        <div className="flex flex-wrap gap-3 mb-10">
          <a
            href="/directorio"
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              !tipo ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Todos
          </a>
          {tipos.map((t) => (
            <a
              key={t}
              href={`?tipo=${t}`}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                tipo === t ? 'bg-gray-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {tipoEmoji[t]} {tipoLabel[t]}
            </a>
          ))}
        </div>

        {prestadores.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {prestadores.map((p) => (
              <div key={p.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="text-3xl mt-1">{tipoEmoji[p.tipo] || '📋'}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 leading-tight">{p.nombre}</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{tipoLabel[p.tipo] || p.tipo}</p>

                    {p.descripcion && (
                      <p className="text-sm text-gray-600 mt-2 line-clamp-2">{p.descripcion}</p>
                    )}

                    <div className="mt-3 space-y-1">
                      {p.direccion && (
                        <p className="text-sm text-gray-500 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          </svg>
                          {p.direccion}
                        </p>
                      )}
                      {p.telefono && (
                        <a href={`tel:${p.telefono}`} className="text-sm text-terracota-600 hover:underline flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                          </svg>
                          {p.telefono}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No hay prestadores disponibles</p>
            <p className="text-sm mt-1">Ejecuta el seed para cargar el directorio</p>
          </div>
        )}
      </div>
    </>
  )
}
