import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPayloadClient } from '@/lib/payload'
import type { Noticia } from '@/payload-types'

interface Props {
  params: Promise<{ slug: string }>
}

async function getNoticia(slug: string) {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'noticias',
      where: { slug: { equals: slug } },
      limit: 1,
    })
    return result.docs[0] as Noticia | undefined
  } catch {
    return undefined
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const noticia = await getNoticia(slug)
  if (!noticia) return { title: 'No encontrado' }
  return { title: noticia.titulo, description: noticia.extracto || undefined }
}

export default async function NoticiaPage({ params }: Props) {
  const { slug } = await params
  const noticia = await getNoticia(slug)
  if (!noticia) notFound()

  return (
    <>
      <div className="bg-gradient-to-r from-blue-800 to-gray-900 text-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <nav className="text-sm text-blue-300 flex items-center gap-2 mb-6">
            <Link href="/" className="hover:text-white">Inicio</Link>
            <span>/</span>
            <Link href="/noticias" className="hover:text-white">Noticias</Link>
          </nav>
          <h1 className="font-display text-3xl md:text-4xl font-bold mb-4">{noticia.titulo}</h1>
          <div className="flex items-center gap-4 text-sm text-blue-200">
            {noticia.fecha && (
              <span>
                {new Date(noticia.fecha).toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' })}
              </span>
            )}
            {noticia.autor && <span>Por {noticia.autor}</span>}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {noticia.extracto && (
          <p className="text-xl text-gray-600 border-l-4 border-terracota-400 pl-4 mb-8 italic">
            {noticia.extracto}
          </p>
        )}
        {noticia.contenido && (
          <div className="prose prose-gray max-w-none">
            <RichTextRenderer content={noticia.contenido as Record<string, unknown>} />
          </div>
        )}
        <div className="mt-10 pt-6 border-t border-gray-200">
          <Link href="/noticias" className="text-terracota-600 hover:text-terracota-700 font-medium flex items-center gap-1">
            ← Volver a noticias
          </Link>
        </div>
      </div>
    </>
  )
}

function RichTextRenderer({ content }: { content: Record<string, unknown> }) {
  try {
    const root = content as { root?: { children?: Array<{ type: string; children?: Array<{ text?: string }> }> } }
    return (
      <>
        {(root.root?.children || []).map((node, i) => {
          if (node.type === 'paragraph') {
            const text = node.children?.map((c) => c.text || '').join('') || ''
            return text ? <p key={i}>{text}</p> : null
          }
          return null
        })}
      </>
    )
  } catch {
    return null
  }
}
