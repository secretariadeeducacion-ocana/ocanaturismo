import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import type { Noticia } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Noticias',
  description: 'Últimas noticias y novedades del turismo en Ocaña, Norte de Santander.',
}

async function getNoticias() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'noticias',
      where: { estado: { equals: 'publicado' } },
      limit: 30,
      sort: '-fecha',
    })
    return result.docs as Noticia[]
  } catch {
    return []
  }
}

const catColor: Record<string, string> = {
  noticias: 'bg-blue-100 text-blue-800',
  turismo: 'bg-terracota-100 text-terracota-800',
  cultura: 'bg-purple-100 text-purple-800',
  naturaleza: 'bg-green-100 text-green-800',
  gastronomia: 'bg-orange-100 text-orange-800',
}

export default async function NoticiasPage() {
  const noticias = await getNoticias()

  return (
    <>
      <div className="bg-gradient-to-r from-blue-800 to-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Noticias</h1>
          <p className="text-blue-100 text-lg">Novedades del turismo y la cultura en Ocaña</p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {noticias.length > 0 ? (
          <div className="space-y-6">
            {noticias.map((n) => (
              <Link key={n.id} href={`/noticias/${n.slug}`} className="group block">
                <article className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className="flex-1">
                      {n.categoria && (
                        <span className={`category-badge ${catColor[n.categoria] || 'bg-gray-100 text-gray-800'} mb-3 inline-block`}>
                          {n.categoria}
                        </span>
                      )}
                      <h2 className="font-display text-xl font-bold text-gray-800 group-hover:text-terracota-600 transition-colors mb-2">
                        {n.titulo}
                      </h2>
                      {n.extracto && <p className="text-gray-600 text-sm line-clamp-2">{n.extracto}</p>}
                      <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                        {n.fecha && (
                          <span>{new Date(n.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        )}
                        {n.autor && <span>Por {n.autor}</span>}
                      </div>
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No hay noticias publicadas aún</p>
            <p className="text-sm mt-1">Las noticias se gestionan desde el panel de administración</p>
            <Link href="/admin" className="mt-4 inline-block text-terracota-600 hover:underline text-sm">
              Ir al panel admin →
            </Link>
          </div>
        )}
      </div>
    </>
  )
}
