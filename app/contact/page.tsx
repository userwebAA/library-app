'use client'

import Link from 'next/link'
import CompanyLogo from '@/components/CompanyLogo'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#f5f1ec]">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#e8e1d9]/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-3">
              <CompanyLogo size="lg" />
              <h1 className="text-2xl font-serif text-[#7a4d3b] font-bold tracking-tight">Books Bazar</h1>
            </Link>
            <nav className="flex items-center space-x-8">
              <Link href="/" className="text-sm text-[#7a4d3b]/60 hover:text-[#7a4d3b] transition-colors">Accueil</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Title */}
        <div className="mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif text-[#7a4d3b] font-bold tracking-tight mb-3">Contactez-nous</h2>
          <p className="text-[#7a4d3b]/50 max-w-lg">
            Une question ? N'hésitez pas à nous contacter ou à nous suivre sur les réseaux sociaux.
          </p>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 mb-16">
          {/* Email */}
          <a
            href="mailto:shaimader14@gmail.com"
            className="flex items-center gap-5 bg-white rounded-2xl p-6 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-[#7a4d3b]/8 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#7a4d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#7a4d3b]/40 mb-0.5">Email</p>
              <p className="text-[#7a4d3b] font-medium group-hover:text-[#5d3a2b] transition-colors">shaimader14@gmail.com</p>
            </div>
            <svg className="w-4 h-4 text-[#7a4d3b]/30 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>

          {/* Téléphone */}
          <a
            href="tel:+221777280311"
            className="flex items-center gap-5 bg-white rounded-2xl p-6 hover:shadow-md transition-all group"
          >
            <div className="w-12 h-12 bg-[#7a4d3b]/8 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-[#7a4d3b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[#7a4d3b]/40 mb-0.5">Téléphone</p>
              <p className="text-[#7a4d3b] font-medium group-hover:text-[#5d3a2b] transition-colors">+221 777 28 03 11</p>
            </div>
            <svg className="w-4 h-4 text-[#7a4d3b]/30 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        {/* Réseaux Sociaux */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-serif text-[#7a4d3b] font-bold">Suivez-nous</h3>
            <div className="h-px flex-1 bg-[#e8e1d9] ml-6"></div>
          </div>

          <div className="space-y-4">
            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@booksbazar221"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-white rounded-2xl p-6 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.1-1.83-1.18-3.14-3.21-3.22-5.43-.02-1.28.21-2.57.74-3.73.9-1.91 2.71-3.41 4.78-3.81 1.4-.29 2.9-.15 4.18.45.02 1.44-.04 2.89-.04 4.33-1.18-.57-2.51-1.08-3.85-.72-1.07.27-2.03 1.11-2.31 2.23-.09.37-.09.75-.06 1.12.15 1.56 1.47 2.92 3.02 2.87 1.18-.03 2.31-.87 2.63-2.02.17-.63.11-1.29.12-1.94.01-2.78-.01-5.56.02-8.34z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#7a4d3b]/40 mb-0.5">TikTok</p>
                <p className="text-[#7a4d3b] font-medium group-hover:text-[#5d3a2b] transition-colors">@booksbazar221</p>
              </div>
              <svg className="w-4 h-4 text-[#7a4d3b]/30 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/bookbazar.sn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-5 bg-white rounded-2xl p-6 hover:shadow-md transition-all group"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 rounded-xl flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zM12 16a4 4 0 110-8 4 4 0 010 8zm4.965-10.405a1.44 1.44 0 112.881.001 1.44 1.44 0 01-2.881-.001z" />
                </svg>
              </div>
              <div>
                <p className="text-xs text-[#7a4d3b]/40 mb-0.5">Instagram</p>
                <p className="text-[#7a4d3b] font-medium group-hover:text-[#5d3a2b] transition-colors">@bookbazar.sn</p>
              </div>
              <svg className="w-4 h-4 text-[#7a4d3b]/30 ml-auto group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 py-8 border-t border-[#e8e1d9]/60 text-center">
          <p className="text-sm text-[#7a4d3b]/40">Books Bazar — Votre librairie en ligne</p>
        </footer>
      </main>
    </div>
  )
}
