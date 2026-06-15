import Link from 'next/link'
import Image from 'next/image'

const dificultadConfig = {
  baja: { label: 'Dificultad baja', color: 'text-green-600' },
  media: { label: 'Dificultad media', color: 'text-yellow-600' },
  alta: { label: 'Dificultad alta', color: 'text-red-600' },
}

interface RutaCardProps {
  nombre: string
  slug: string
  descripcionCorta?: string
  imagen?: string
  duracion?: string
  dificultad?: 'baja' | 'media' | 'alta'
  numAtractivos?: number
}

export default function RutaCard({
  nombre,
  slug,
  descripcionCorta,
  imagen,
  duracion,
  dificultad,
  numAtractivos,
}: RutaCardProps) {
  const diff = dificultad ? dificultadConfig[dificultad] : null

  return (
    <Link href={`/rutas/${slug}`} className="group block">
      <div className="bg-white rounded-xl overflow-hidden shadow-md card-hover h-full flex flex-col">
        <div className="relative h-48 bg-gradient-to-br from-bosque-200 to-bosque-400 overflow-hidden">
          {imagen ? (
            <Image
              src={imagen}
              alt={nombre}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-16 h-16 text-bosque-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
              </svg>
            </div>
          )}
          <div className="absolute top-3 left-3 bg-bosque-700/80 text-white text-xs font-semibold px-3 py-1 rounded-full">
            Ruta
          </div>
        </div>

        <div className="p-5 flex flex-col flex-1">
          <h3 className="font-display font-semibold text-gray-800 text-lg group-hover:text-bosque-700 transition-colors">
            {nombre}
          </h3>
          {descripcionCorta && (
            <p className="text-gray-500 text-sm mt-2 line-clamp-2 flex-1">{descripcionCorta}</p>
          )}

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-gray-600">
            {duracion && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                {duracion}
              </span>
            )}
            {numAtractivos !== undefined && (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
                {numAtractivos} atractivos
              </span>
            )}
            {diff && (
              <span className={`font-medium ${diff.color}`}>{diff.label}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
