import Link from 'next/link'

const tipoConfig: Record<string, { color: string }> = {
  cultural: { color: 'bg-blue-100 text-blue-800' },
  religioso: { color: 'bg-purple-100 text-purple-800' },
  deportivo: { color: 'bg-green-100 text-green-800' },
  gastronomico: { color: 'bg-orange-100 text-orange-800' },
  folclorico: { color: 'bg-pink-100 text-pink-800' },
  otro: { color: 'bg-gray-100 text-gray-800' },
}

const tipoLabel: Record<string, string> = {
  cultural: 'Cultural',
  religioso: 'Religioso',
  deportivo: 'Deportivo',
  gastronomico: 'Gastronómico',
  folclorico: 'Folclórico',
  otro: 'Otro',
}

interface EventoCardProps {
  nombre: string
  slug: string
  tipo?: string
  fechaInicio?: string
  lugar?: string
  organizador?: string
}

export default function EventoCard({ nombre, slug, tipo, fechaInicio, lugar, organizador }: EventoCardProps) {
  const config = tipo ? tipoConfig[tipo] : undefined
  const label = tipo ? tipoLabel[tipo] : ''

  const fecha = fechaInicio
    ? new Date(fechaInicio).toLocaleDateString('es-CO', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
    : null

  return (
    <Link href={`/eventos/${slug}`} className="group block">
      <div className="bg-white rounded-xl border border-gray-200 p-5 card-hover flex gap-4">
        {/* Date block */}
        {fecha && (
          <div className="flex-shrink-0 w-16 text-center">
            <div className="bg-terracota-600 text-white rounded-t-lg py-1 text-xs font-bold uppercase">
              {new Date(fechaInicio!).toLocaleDateString('es-CO', { month: 'short' })}
            </div>
            <div className="bg-terracota-50 border border-terracota-200 rounded-b-lg py-2 text-2xl font-bold text-terracota-700">
              {new Date(fechaInicio!).getDate()}
            </div>
          </div>
        )}

        <div className="flex-1 min-w-0">
          {tipo && (
            <span className={`category-badge ${config?.color} mb-2 inline-block`}>{label}</span>
          )}
          <h3 className="font-display font-semibold text-gray-800 group-hover:text-terracota-600 transition-colors leading-tight">
            {nombre}
          </h3>
          {lugar && <p className="text-gray-500 text-sm mt-1">📍 {lugar}</p>}
          {organizador && <p className="text-gray-400 text-xs mt-1">{organizador}</p>}
        </div>
      </div>
    </Link>
  )
}
