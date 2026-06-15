'use client'

import Link from 'next/link'
import { useState } from 'react'

const navLinks = [
  { href: '/descubre', label: 'Descubre Ocaña' },
  { href: '/atractivos', label: 'Atractivos' },
  { href: '/rutas', label: 'Rutas' },
  { href: '/eventos', label: 'Eventos' },
  { href: '/directorio', label: 'Directorio' },
  { href: '/noticias', label: 'Noticias' },
  { href: '/institucional', label: 'Institucional' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-terracota-600 font-display font-bold text-xl">Ocaña</span>
            <span className="text-bosque-700 font-display font-bold text-xl">Turismo</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-terracota-600 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-terracota-600"
            aria-label="Menú"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <nav className="lg:hidden bg-white border-t border-gray-100 px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 hover:text-terracota-600 px-3 py-2 text-sm font-medium"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  )
}
