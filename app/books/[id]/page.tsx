'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import Toast from '@/components/Toast'

interface Book {
  id: string
  title: string
  author: string
  description: string
  rentalPrice: number | null
  salePrice: number | null
  isForRent: boolean
  isForSale: boolean
  isBestseller: boolean
  isNew: boolean
  imageUrl: string | null
  category: string
  isbn: string | null
  publisher: string | null
  publishedYear: number | null
  language: string
  pages: number | null
  stock: number
  createdAt: string
  updatedAt: string
}

export default function BookDetail() {
  const params = useParams()
  const router = useRouter()
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)

  useEffect(() => {
    if (params.id) {
      fetchBook()
    }
  }, [params.id])

  const fetchBook = async () => {
    try {
      const response = await fetch(`/api/books/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setBook(data)
        setToast({ message: 'Livre chargé avec succès', type: 'success' })
      } else {
        setToast({ message: 'Livre introuvable', type: 'error' })
        setTimeout(() => router.push('/'), 2000)
      }
    } catch (error) {
      setToast({ message: 'Erreur de connexion au serveur', type: 'error' })
      setTimeout(() => router.push('/'), 2000)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-20 h-20 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1s' }}></div>
          </div>
          <p className="mt-6 text-slate-600 font-medium text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  if (!book) {
    return null
  }

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2NjdlZWEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6bTAgMjBjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnptLTIwIDBjMC0xLjEuOS0yIDItMnMyIC45IDIgMi0uOSAyLTIgMi0yLS45LTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

        <header className="relative backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link href="/" className="group inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 text-sm font-medium transition-all duration-300 hover:gap-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Retour à la bibliothèque
            </Link>
          </div>
        </header>

        <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="glass-effect rounded-2xl shadow-lg overflow-hidden border border-white/30 animate-fadeIn">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-8">
              <div className="relative group">
                <div className="aspect-[3/4] bg-gradient-to-br from-slate-100 to-slate-200 relative rounded-xl overflow-hidden shadow-lg">
                  {book.imageUrl ? (
                    <Image
                      src={book.imageUrl}
                      alt={book.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-slate-300 group-hover:text-indigo-400 transition-colors duration-300">
                        <svg className="w-32 h-32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
              </div>

              <div className="flex flex-col space-y-4">
                <div className="animate-slideIn">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-200 shadow-sm">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                    </svg>
                    {book.category}
                  </span>
                </div>

                <div className="animate-fadeIn" style={{ animationDelay: '0.1s' }}>
                  <h1 className="text-3xl font-bold text-slate-900 mb-2 leading-tight">
                    {book.title}
                  </h1>
                  <p className="text-lg text-slate-600 font-medium flex items-center gap-1.5">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    {book.author}
                  </p>
                </div>

                <div className="flex flex-col gap-2 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                  {book.isForRent && book.rentalPrice && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-slate-600 font-medium">📚 Prix de location:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        {book.rentalPrice.toFixed(0)} CFA
                      </span>
                    </div>
                  )}
                  {book.isForSale && book.salePrice && (
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm text-slate-600 font-medium">💰 Prix de vente:</span>
                      <span className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                        {book.salePrice.toFixed(0)} CFA
                      </span>
                    </div>
                  )}
                  {book.isForRent && book.isForSale && (
                    <div className="text-xs text-slate-500 italic mt-1">
                      Disponible à la location ET à la vente
                    </div>
                  )}
                </div>

                <div className="mb-4">
                  {book.stock > 0 ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 rounded-xl border border-emerald-200 shadow-sm">
                      <div className="p-1.5 bg-emerald-100 rounded-full">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Disponible en stock</p>
                        <p className="text-xs">{book.stock} exemplaire{book.stock > 1 ? 's' : ''}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-50 to-red-50 text-rose-700 rounded-xl border border-rose-200 shadow-sm">
                      <div className="p-1.5 bg-rose-100 rounded-full">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-semibold text-sm">Rupture de stock</p>
                        <p className="text-xs">Bientôt disponible</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 pt-4 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
                  <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Description
                  </h2>
                  <p className="text-slate-700 leading-relaxed text-sm whitespace-pre-line">{book.description}</p>
                </div>

                <div className="bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl p-4 space-y-3 animate-fadeIn" style={{ animationDelay: '0.5s' }}>
                  <h2 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Informations détaillées
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {book.isbn && (
                      <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg">
                        <div className="p-1.5 bg-indigo-100 rounded-lg">
                          <svg className="w-4 h-4 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase">ISBN</p>
                          <p className="text-slate-900 text-sm font-medium">{book.isbn}</p>
                        </div>
                      </div>
                    )}

                    {book.publisher && (
                      <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg">
                        <div className="p-1.5 bg-purple-100 rounded-lg">
                          <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase">Éditeur</p>
                          <p className="text-slate-900 text-sm font-medium">{book.publisher}</p>
                        </div>
                      </div>
                    )}

                    {book.publishedYear && (
                      <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg">
                        <div className="p-1.5 bg-pink-100 rounded-lg">
                          <svg className="w-4 h-4 text-pink-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase">Année</p>
                          <p className="text-slate-900 text-sm font-medium">{book.publishedYear}</p>
                        </div>
                      </div>
                    )}

                    <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg">
                      <div className="p-1.5 bg-teal-100 rounded-lg">
                        <svg className="w-4 h-4 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-500 uppercase">Langue</p>
                        <p className="text-slate-900 text-sm font-medium">{book.language}</p>
                      </div>
                    </div>

                    {book.pages && (
                      <div className="flex items-start gap-2 p-2.5 bg-white rounded-lg">
                        <div className="p-1.5 bg-amber-100 rounded-lg">
                          <svg className="w-4 h-4 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-500 uppercase">Pages</p>
                          <p className="text-slate-900 text-sm font-medium">{book.pages}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
