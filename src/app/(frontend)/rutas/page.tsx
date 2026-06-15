import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import RutaCard from '@/components/ui/RutaCard'
import type { Ruta } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Rutas Turísticas',
  description: 'Recorre Ocaña por rutas diseñadas: la Ruta de la Gran Convención, Ruta Religiosa, Ruta de Naturaleza y más.',
}

async function getRutas() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'rutas',
      where: { estado: { equals: 'publicado' } },
      limit: 50,
    })
    return result.docs as Ruta[]
  } catch {
    return []
  }
}

export default async function RutasPage() {
  const rutas = await getRutas()

  return (
    <>
      <div className="bg-gradient-to-r from-bosque-800 to-bosque-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Rutas Turísticas</h1>
          <p className="text-bosque-200 text-lg max-w-2xl mx-auto">
            Itinerarios diseñados para aprovechar al máximo tu visita a Ocaña.
            Desde recorridos históricos hasta aventuras en la naturaleza.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {rutas.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rutas.map((r) => (
              <RutaCard
                key={r.id}
                nombre={r.nombre}
                slug={r.slug}
                duracion={r.duracion || undefined}
                dificultad={r.dificultad as 'baja' | 'media' | 'alta' | undefined}
                numAtractivos={Array.isArray(r.atractivos) ? r.atractivos.length : 0}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No hay rutas disponibles aún</p>
            <p className="text-sm mt-1">Ejecuta el seed para cargar los datos</p>
          </div>
        )}
      </div>
    </>
  )
}
