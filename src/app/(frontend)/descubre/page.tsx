import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Descubre Ocaña',
  description:
    'Conoce la historia, geografía, clima y datos generales de Ocaña, Norte de Santander. Ciudad fundada en 1570, cuna de la Gran Convención de 1828.',
}

const datos = [
  { label: 'Fundación', valor: '14 de diciembre de 1570' },
  { label: 'Fundador', valor: 'Francisco Fernández de Contreras' },
  { label: 'Departamento', valor: 'Norte de Santander' },
  { label: 'Apodo histórico', valor: '"Ocaña Independiente" (Simón Bolívar)' },
  { label: 'Clima', valor: 'Favorable todo el año (aprox. 20-22°C)' },
  { label: 'Capacidad hotelera', valor: '78 establecimientos · 1.012 habitaciones · 1.463 camas' },
  { label: 'Atractivos inventariados', valor: '93 (Plan Turístico 2023-2034)' },
  { label: 'Aeropuerto', valor: 'Aguas Claras (vuelos chárter disponibles)' },
]

const conexiones = [
  { origen: 'Cúcuta', via: 'vía Ábrego', tiempo: '6 horas' },
  { origen: 'Bucaramanga', via: 'vía Aguachica', tiempo: '5 horas' },
  { origen: 'Bogotá', via: 'vía Aguachica', tiempo: '5 horas' },
  { origen: 'Barranquilla', via: 'vía Aguachica', tiempo: '8 horas' },
]

export default function DescubrePage() {
  return (
    <>
      {/* Hero */}
      <div className="bg-gradient-to-r from-terracota-800 to-bosque-900 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-terracota-300 font-semibold text-sm uppercase tracking-wider mb-3">
            Norte de Santander · Colombia
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-6">Descubre Ocaña</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Ciudad histórica, religiosa y natural, fundada en 1570 y declarada
            "Ocaña Independiente" por el Libertador Simón Bolívar.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Historia */}
        <section>
          <h2 className="section-title mb-6">Historia</h2>
          <div className="prose prose-lg max-w-none text-gray-700 space-y-4">
            <p>
              Ocaña fue fundada el <strong>14 de diciembre de 1570</strong> por Francisco Fernández de
              Contreras. Su nombre proviene de la ciudad española de Ocaña, en la provincia de Toledo.
              Desde sus inicios, se convirtió en un importante nodo comercial y político de la región.
            </p>
            <p>
              El evento histórico más significativo de la ciudad fue la{' '}
              <strong>Gran Convención de 1828</strong>, reunión constituyente celebrada entre el 9 de
              abril y el 11 de junio en el Convento de San Francisco (hoy Complejo Histórico de la
              Gran Convención). Este evento marcó la historia política de Colombia y fue el escenario
              donde Simón Bolívar expresó su famosa exclamación que le valió a la ciudad el apodo de
              "Ocaña Independiente".
            </p>
            <p>
              La ciudad también fue testigo de la abolición de la esclavitud en Colombia, hecho
              conmemorado con la <strong>Columna de la Libertad de los Esclavos</strong> ubicada en
              la Plaza del 29 de Mayo, único monumento de este tipo en el país.
            </p>
          </div>
        </section>

        {/* Datos generales */}
        <section>
          <h2 className="section-title mb-6">Datos Generales</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {datos.map((d) => (
              <div key={d.label} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <dt className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">{d.label}</dt>
                <dd className="text-gray-800 font-medium">{d.valor}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Cómo llegar */}
        <section>
          <h2 className="section-title mb-2">Cómo Llegar</h2>
          <p className="text-gray-600 mb-6">
            Ocaña está conectada por carretera con las principales ciudades del país.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {conexiones.map((c) => (
              <div key={c.origen} className="flex items-center gap-4 bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
                <div className="w-12 h-12 rounded-full bg-terracota-100 flex items-center justify-center text-terracota-600 flex-shrink-0">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                </div>
                <div>
                  <div className="font-semibold text-gray-800">{c.origen}</div>
                  <div className="text-sm text-gray-500">{c.via} · <span className="font-medium text-terracota-600">{c.tiempo}</span></div>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm text-gray-500">
            * También cuenta con el Aeropuerto Aguas Claras para vuelos chárter.
            Los vuelos comerciales están suspendidos desde 2013.
          </p>
        </section>

        {/* Turismo */}
        <section>
          <h2 className="section-title mb-6">Oferta Turística</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                emoji: '⛪',
                titulo: 'Turismo Religioso',
                desc: 'Ocaña es destino de peregrinación hacia el Santuario de Nuestra Señora de las Gracias de Torcoroma, con festividades el 15 y 16 de agosto.',
              },
              {
                emoji: '🏛️',
                titulo: 'Turismo Histórico',
                desc: 'El Complejo de la Gran Convención, la Columna de la Libertad y sus museos la posicionan como destino de turismo histórico-cultural.',
              },
              {
                emoji: '🌿',
                titulo: 'Ecoturismo',
                desc: 'La Reserva Natural ProAves Hormiguero de Torcoroma alberga el Hormiguero Pico de Hacha (en peligro de extinción) y 79 especies de aves.',
              },
            ].map((item) => (
              <div key={item.titulo} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="text-4xl mb-4">{item.emoji}</div>
                <h3 className="font-display font-semibold text-xl text-gray-800 mb-3">{item.titulo}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="bg-terracota-50 rounded-2xl p-8 text-center border border-terracota-100">
          <h3 className="font-display text-2xl font-bold text-gray-800 mb-3">
            ¿Listo para explorar?
          </h3>
          <p className="text-gray-600 mb-6">
            Consulta los atractivos turísticos, rutas y la agenda de eventos de Ocaña
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/atractivos" className="btn-primary">Ver Atractivos</Link>
            <Link href="/rutas" className="btn-secondary">Ver Rutas</Link>
          </div>
        </div>
      </div>
    </>
  )
}
