'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Star } from 'lucide-react'

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative bg-gradient-to-br from-primary via-primary/95 to-primary/90 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Master Microsoft Copilot
              </h1>
              <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                Premium training & certification for professionals and teams worldwide.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/schedule"
                className="bg-accent hover:bg-accent/90 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl inline-flex items-center justify-center group"
              >
                Join a Live Session
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/corporate-training"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 hover:border-white/50 font-semibold py-4 px-8 rounded-lg transition-all duration-200 backdrop-blur-sm"
              >
                Corporate Training
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Global First Copilot Academy</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-accent" />
                  <span className="text-sm font-medium">Industry Recognized</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">1,247+</div>
                  <div className="text-sm text-gray-300">Professionals Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">98%</div>
                  <div className="text-sm text-gray-300">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">26min</div>
                  <div className="text-sm text-gray-300">Daily Productivity Gain</div>
                </div>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div 
              className={`relative bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 transition-all duration-500 ${
                isHovered ? 'scale-105 shadow-2xl' : 'scale-100 shadow-xl'
              }`}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {/* Copilot UI Mockup */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                </div>
                
                <div className="space-y-3">
                  <div className="h-4 bg-white/20 rounded animate-pulse"></div>
                  <div className="h-4 bg-white/20 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-white/20 rounded w-1/2 animate-pulse"></div>
                </div>
                
                <div className="bg-accent/20 rounded-lg p-4 border border-accent/30">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">AI</span>
                    </div>
                    <div className="flex-1">
                      <div className="h-3 bg-white/30 rounded w-full animate-pulse"></div>
                      <div className="h-2 bg-white/20 rounded w-2/3 mt-2 animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="h-3 bg-white/20 rounded w-full"></div>
                  <div className="h-3 bg-white/20 rounded w-4/5"></div>
                  <div className="h-3 bg-white/20 rounded w-3/4"></div>
                </div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-accent rounded-full flex items-center justify-center animate-bounce">
                <span className="text-white text-xs font-bold">✓</span>
              </div>
              <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-white/20 rounded-full animate-pulse"></div>
            </div>
            
            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-transparent rounded-2xl blur-3xl -z-10"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
