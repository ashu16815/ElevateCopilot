'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { IS_MISSION } from '@/lib/mode'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = IS_MISSION ? [
    { name: 'Home', href: '/' },
    { name: 'Learn Live (Free)', href: '/events' },
    { name: 'Resources', href: '/resources' },
    { name: 'Impact', href: '/impact' },
    { name: 'Ambassadors', href: '/ambassadors' },
    { name: 'Mission', href: '/mission' },
    { name: 'Press', href: '/press' },
    { name: 'Blog', href: '/blog' },
    { name: 'Contact', href: '/contact' },
  ] : [
    { name: 'Home', href: '/' },
    { name: 'Courses', href: '/courses' },
    { name: 'Corporate Training', href: '/corporate-training' },
    { name: 'Certification', href: '/certification' },
    { name: 'Resources', href: '/resources' },
    { name: 'Blog', href: '/blog' },
    { name: 'Referrals', href: '/referrals' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">EC</span>
              </div>
              <span className="ml-3 text-xl font-bold text-primary font-playfair">
                ElevateCopilot
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-primary hover:text-accent transition-colors duration-200 font-medium"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link
              href={IS_MISSION ? "/events" : "/courses"}
              className="btn-primary"
            >
              {IS_MISSION ? "Join a Live Session" : "Join a Live Session"}
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-primary hover:text-accent transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-primary hover:text-accent transition-colors duration-200 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4">
              <Link
                href={IS_MISSION ? "/events" : "/courses"}
                className="btn-primary block text-center"
                onClick={() => setIsMenuOpen(false)}
              >
                {IS_MISSION ? "Join a Live Session" : "Join a Live Session"}
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header
