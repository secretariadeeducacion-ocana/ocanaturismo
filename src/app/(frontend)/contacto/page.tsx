import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Contacta a la Secretaría de Educación, Cultura y Turismo de Ocaña para información turística.',
}

export default function ContactoPage() {
  return (
    <>
      <div className="bg-gradient-to-r from-terracota-700 to-bosque-800 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">Contacto</h1>
          <p className="text-terracota-100 text-lg">
            ¿Tienes preguntas sobre el turismo en Ocaña? Estamos aquí para ayudarte.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Formulario */}
          <div>
            <h2 className="font-display text-2xl font-bold text-gray-800 mb-6">Envíanos un mensaje</h2>
            <form className="space-y-5" action="#" method="POST">
              <div>
                <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-1">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracota-500 focus:border-transparent outline-none transition-all"
                  placeholder="Tu nombre"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracota-500 focus:border-transparent outline-none transition-all"
                  placeholder="tu@correo.com"
                />
              </div>
              <div>
                <label htmlFor="asunto" className="block text-sm font-medium text-gray-700 mb-1">
                  Asunto
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracota-500 focus:border-transparent outline-none transition-all bg-white"
                >
                  <option value="">Selecciona un asunto</option>
                  <option value="informacion">Información turística general</option>
                  <option value="atractivos">Consulta sobre atractivos</option>
                  <option value="eventos">Información sobre eventos</option>
                  <option value="directorio">Registro en directorio de prestadores</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
              <div>
                <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows={5}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-terracota-500 focus:border-transparent outline-none transition-all resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              <button
                type="submit"
                className="btn-primary w-full"
              >
                Enviar mensaje
              </button>
              <p className="text-xs text-gray-400 text-center">
                * Este formulario está en desarrollo. Por ahora, contáctanos directamente.
              </p>
            </form>
          </div>

          {/* Información de contacto */}
          <div className="space-y-6">
            <h2 className="font-display text-2xl font-bold text-gray-800">Información de contacto</h2>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200 space-y-5">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-terracota-100 flex items-center justify-center text-terracota-600 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Dirección</h3>
                  <address className="not-italic text-gray-600 text-sm">
                    Secretaría de Educación, Cultura y Turismo<br />
                    Complejo Histórico de la Gran Convención<br />
                    Calle 11 con Carrera 9, Barrio San Francisco<br />
                    Ocaña, Norte de Santander, Colombia
                  </address>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-terracota-100 flex items-center justify-center text-terracota-600 flex-shrink-0">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Horario de atención</h3>
                  <p className="text-gray-600 text-sm">
                    Lunes a Viernes<br />
                    8:00 AM – 12:00 PM<br />
                    2:00 PM – 6:00 PM
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa placeholder */}
            <div className="rounded-2xl overflow-hidden border border-gray-200 h-64 bg-gradient-to-br from-bosque-100 to-bosque-200 flex items-center justify-center">
              <div className="text-center text-bosque-500">
                <svg className="w-12 h-12 mx-auto mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                </svg>
                <p className="text-sm font-medium">Mapa interactivo próximamente</p>
                <p className="text-xs mt-1">Integración con Mapbox / Google Maps</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
