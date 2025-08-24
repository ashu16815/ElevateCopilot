import Link from 'next/link'
import { Linkedin, Youtube, Mail, Phone, Globe } from 'lucide-react'

const Footer = () => {
  const footerLinks = [
    {
      title: "Training",
      links: [
        { name: "Courses", href: "/courses" },
        { name: "Corporate Training", href: "/corporate-training" },
        { name: "Certification", href: "/certification" },
        { name: "Resources", href: "/resources" },
        { name: "Blog", href: "/blog" },
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "FAQ", href: "/faq" },
        { name: "Contact", href: "/contact" },
      ]
    }
  ]

  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: Linkedin },
    { name: 'YouTube', href: '#', icon: Youtube },
  ]

  return (
    <footer className="bg-primary text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">EC</span>
              </div>
              <span className="ml-3 text-xl font-bold font-playfair">
                ElevateCopilot
              </span>
            </div>
            <p className="text-muted mb-4 max-w-md">
              Learn Copilot. Lead with AI. Premium training & certification for professionals and teams worldwide.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-muted hover:text-accent transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Training</h3>
            <ul className="space-y-2">
              {footerLinks[0].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* More Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 font-playfair">Company</h3>
            <ul className="space-y-2">
              {footerLinks[1].links.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-muted hover:text-accent transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-2 text-gray-300">
              <p className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:elevatecopilot@outlook.com" className="hover:text-white transition-colors">
                  elevatecopilot@outlook.com
                </a>
              </p>
              <p className="flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                <a href="https://elevatecopilot.com" className="hover:text-white transition-colors">
                  elevatecopilot.com
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <Mail className="h-4 w-4 text-muted" />
              <a
                href="mailto:elevatecopilot@outlook.com"
                className="text-muted hover:text-accent transition-colors duration-200"
              >
                elevatecopilot@outlook.com
              </a>
            </div>
            <p className="text-muted text-sm">
              © 2025 ElevateCopilot. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
