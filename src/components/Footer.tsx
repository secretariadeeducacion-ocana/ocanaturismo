import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-terracota-400 font-display font-bold text-xl">Ocaña</span>
              <span className="text-bosque-400 font-display font-bold text-xl">Turismo</span>
            </div>
            <p className="text-sm text-gray-400 leading-relaxed">
              Portal oficial de turismo del municipio de Ocaña, Norte de Santander.
              <span className="block mt-1 italic">"Ocaña, Potencia Regional"</span>
            </p>
          </div>

          {/* Links rápidos */}
          <div>
            <h3 className="text-white font-semibold mb-4">Explorar</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/atractivos', label: 'Atractivos Turísticos' },
                { href: '/rutas', label: 'Rutas Turísticas' },
                { href: '/eventos', label: 'Agenda de Eventos' },
                { href: '/directorio', label: 'Directorio Turístico' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-terracota-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institucional */}
          <div>
            <h3 className="text-white font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2 text-sm">
              {[
                { href: '/descubre', label: 'Descubre Ocaña' },
                { href: '/institucional', label: 'Secretaría de Turismo' },
                { href: '/noticias', label: 'Noticias' },
                { href: '/contacto', label: 'Contacto' },
              ].map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="hover:text-terracota-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contacto</h3>
            <address className="not-italic text-sm space-y-2 text-gray-400">
              <p>Secretaría de Educación, Cultura y Turismo</p>
              <p>Complejo Histórico de la Gran Convención</p>
              <p>Calle 11 con Carrera 9, Barrio San Francisco</p>
              <p>Ocaña, Norte de Santander</p>
            </address>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Alcaldía de Ocaña — Todos los derechos reservados</p>
          <p>Alineado con el Plan de Desarrollo Municipal "Ocaña Renovada 2024-2027"</p>
        </div>
      </div>
    </footer>
  )
}
