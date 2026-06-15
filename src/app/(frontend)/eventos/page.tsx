import type { Metadata } from 'next'
import { getPayloadClient } from '@/lib/payload'
import EventoCard from '@/components/ui/EventoCard'
import type { Evento } from '@/payload-types'

export const metadata: Metadata = {
  title: 'Agenda de Eventos',
  description: 'Agenda de eventos culturales, religiosos y turísticos de Ocaña. Desfile de los Genitores, Fiesta de Torcoroma, Semana Santa y más.',
}

async function getEventos() {
  try {
    const payload = await getPayloadClient()
    const result = await payload.find({
      collection: 'eventos',
      where: { estado: { equals: 'publicado' } },
      limit: 50,
      sort: 'fechaInicio',
    })
    return result.docs as Evento[]
  } catch {
    return []
  }
}

export default async function EventosPage() {
  const eventos = await getEventos()

  return (
    <>
      <div className="bg-gradient-to-r from-purple-800 to-terracota-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Agenda de Eventos</h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Festividades culturales, religiosas y turísticas que hacen de Ocaña
            un destino vibrante durante todo el año.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {eventos.length > 0 ? (
          <div className="space-y-4">
            {eventos.map((e) => (
              <EventoCard
                key={e.id}
                nombre={e.nombre}
                slug={e.slug}
                tipo={e.tipo || undefined}
                fechaInicio={e.fechaInicio}
                lugar={e.lugar || undefined}
                organizador={e.organizador || undefined}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-lg font-medium">No hay eventos programados</p>
            <p className="text-sm mt-1">Ejecuta el seed para cargar la agenda oficial</p>
          </div>
        )}
      </div>
    </>
  )
}
