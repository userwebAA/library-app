'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Toast from '@/components/Toast'
import AdvancedFilters, { FilterState } from '@/components/AdvancedFilters'
import CompanyLogo from '@/components/CompanyLogo'
import { getCategoryIcon } from '@/lib/categories'

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
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([])
  const [allBooks, setAllBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [filters, setFilters] = useState<FilterState>({
    search: '',
    category: '',
    availability: 'all',
    priceRange: 'all',
    saleType: 'all',
    sortBy: 'newest'
  })

  useEffect(() => {
    fetchBooks()
  }, [])

  const fetchBooks = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/books')
      if (response.ok) {
        const data = await response.json()
        if (Array.isArray(data)) {
          setAllBooks(data)
          setBooks(data)

          // Extract unique categories
          const uniqueCategories = [...new Set(data.map((book: Book) => book.category))]
          setCategories(uniqueCategories)
        } else {
          console.error('API returned non-array data:', data)
          setBooks([])
        }
      } else {
        console.error('Failed to fetch books')
        setBooks([])
      }
    } catch (error) {
      console.error('Error fetching books:', error)
      setBooks([])
    } finally {
      setLoading(false)
    }
  }

  const applyFilters = (newFilters: FilterState) => {
    setFilters(newFilters)

    let filtered = [...allBooks]

    // Search filter
    if (newFilters.search) {
      filtered = filtered.filter(book =>
        book.title.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        book.author.toLowerCase().includes(newFilters.search.toLowerCase()) ||
        book.description.toLowerCase().includes(newFilters.search.toLowerCase())
      )
    }

    // Category filter
    if (newFilters.category) {
      filtered = filtered.filter(book => book.category === newFilters.category)
    }

    // Availability filter
    if (newFilters.availability !== 'all') {
      if (newFilters.availability === 'available') {
        filtered = filtered.filter(book => book.stock > 5)
      } else if (newFilters.availability === 'low') {
        filtered = filtered.filter(book => book.stock > 0 && book.stock <= 5)
      } else if (newFilters.availability === 'out') {
        filtered = filtered.filter(book => book.stock === 0)
      }
    }

    // Price range filter
    if (newFilters.priceRange !== 'all') {
      filtered = filtered.filter(book => {
        const price = book.salePrice || book.rentalPrice || 0
        if (newFilters.priceRange === 'low') return price < 10
        if (newFilters.priceRange === 'medium') return price >= 10 && price <= 30
        if (newFilters.priceRange === 'high') return price > 30
        return true
      })
    }

    // Sale type filter
    if (newFilters.saleType !== 'all') {
      if (newFilters.saleType === 'rental') {
        filtered = filtered.filter(book => book.isForRent && book.rentalPrice && !book.isForSale)
      } else if (newFilters.saleType === 'sale') {
        filtered = filtered.filter(book => book.isForSale && book.salePrice && !book.isForRent)
      } else if (newFilters.saleType === 'both') {
        filtered = filtered.filter(book => book.isForRent && book.isForSale && book.rentalPrice && book.salePrice)
      }
    }

    if (newFilters.sortBy === 'price-asc') {
      filtered.sort((a, b) => (a.salePrice || a.rentalPrice || 0) - (b.salePrice || b.rentalPrice || 0))
    } else if (newFilters.sortBy === 'price-desc') {
      filtered.sort((a, b) => (b.salePrice || b.rentalPrice || 0) - (a.salePrice || a.rentalPrice || 0))
    } else if (newFilters.sortBy === 'title') {
      filtered.sort((a, b) => a.title.localeCompare(b.title))
    } else if (newFilters.sortBy === 'stock') {
      filtered.sort((a, b) => b.stock - a.stock)
    }

    setBooks(filtered)
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
      <div className="min-h-screen bg-gradient-to-br from-[#e8e1d9] via-[#f5f1ec] to-[#e8e1d9]">
        {/* Header - Nouveau style avec barre latérale */}
        <header className="border-b-2 border-[#7a4d3b]/10 bg-white/60 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#7a4d3b] rounded-lg flex items-center justify-center">
                  <CompanyLogo size="md" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-[#7a4d3b] tracking-tight">Books Bazar</h1>
                  <p className="text-xs text-[#7a4d3b]/50">📍 Dakar, Sénégal</p>
                </div>
              </div>
              <nav className="hidden md:flex items-center gap-8">
                <a href="#catalogue" className="text-[#7a4d3b] font-medium hover:text-[#5d3a2b] transition-colors">Catalogue</a>
                <a href="#nouveautes" className="text-[#7a4d3b] font-medium hover:text-[#5d3a2b] transition-colors">Nouveautés</a>
                <a href="#bestsellers" className="text-[#7a4d3b] font-medium hover:text-[#5d3a2b] transition-colors">Best-sellers</a>
                <Link href="/contact" className="px-6 py-2.5 bg-[#7a4d3b] text-white font-medium rounded-lg hover:bg-[#5d3a2b] transition-all shadow-lg shadow-[#7a4d3b]/20">
                  Contact
                </Link>
              </nav>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero Section - Layout en deux colonnes */}
          <section className="py-16 lg:py-24">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Colonne gauche - Texte */}
              <div>
                <div className="inline-block px-4 py-1.5 bg-[#7a4d3b]/10 rounded-full mb-6">
                  <span className="text-sm font-semibold text-[#7a4d3b]">✨ Nouvelle collection 2026</span>
                </div>
                <h2 className="text-5xl lg:text-6xl font-bold text-[#7a4d3b] mb-6 leading-tight">
                  Plongez dans<br />
                  <span className="text-[#5d3a2b]">l'univers des livres</span>
                </h2>
                <p className="text-lg text-[#7a4d3b]/70 mb-8 leading-relaxed">
                  Découvrez notre sélection de livres soigneusement choisis. Location et vente disponibles pour tous les passionnés de lecture.
                </p>

                {/* Search Bar */}
                <div className="relative mb-6">
                  <input
                    type="text"
                    value={filters.search}
                    onChange={(e) => applyFilters({ ...filters, search: e.target.value })}
                    placeholder="Rechercher un livre, un auteur..."
                    className="w-full px-6 py-4 pr-14 rounded-xl bg-white border-2 border-[#e8e1d9] text-[#7a4d3b] placeholder-[#7a4d3b]/40 focus:outline-none focus:border-[#7a4d3b] transition-all shadow-sm"
                  />
                  <button className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#7a4d3b] rounded-lg flex items-center justify-center hover:bg-[#5d3a2b] transition-colors">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </button>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#7a4d3b]">{allBooks.length}+</div>
                    <div className="text-sm text-[#7a4d3b]/60">Livres</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#7a4d3b]">{categories.length}+</div>
                    <div className="text-sm text-[#7a4d3b]/60">Catégories</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-[#7a4d3b]">24/7</div>
                    <div className="text-sm text-[#7a4d3b]/60">Disponible</div>
                  </div>
                </div>
              </div>

              {/* Colonne droite - Illustration/Image */}
              <div className="relative hidden lg:block">
                <div className="relative w-full h-[500px] bg-gradient-to-br from-[#7a4d3b] to-[#5d3a2b] rounded-3xl p-8 shadow-2xl shadow-[#7a4d3b]/20">
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHptMCAwIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30"></div>
                  <div className="relative z-10 flex items-center justify-center h-full text-white text-center">
                    <div>
                      <div className="text-8xl mb-4">📚</div>
                      <p className="text-xl font-semibold">Votre bibliothèque</p>
                      <p className="text-white/70">à portée de main</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Categories Section - Nouveau design */}
          <section className="mb-12">
            <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-[#7a4d3b]/10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-[#7a4d3b]">Explorer par catégorie</h3>
                <span className="text-xs text-[#7a4d3b]/50">{categories.length} catégories</span>
              </div>
              <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => applyFilters({ ...filters, category: '' })}
                  className={`group relative px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${filters.category === ''
                    ? 'bg-gradient-to-r from-[#7a4d3b] to-[#5d3a2b] text-white shadow-xl shadow-[#7a4d3b]/30 scale-105'
                    : 'bg-white text-[#7a4d3b] hover:bg-[#e8e1d9] border-2 border-[#e8e1d9] hover:border-[#7a4d3b]/20 hover:scale-105'
                    }`}
                >
                  <span className="relative z-10">📚 Tous les livres</span>
                  {filters.category === '' && (
                    <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                  )}
                </button>
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => applyFilters({ ...filters, category: cat })}
                    className={`group relative px-6 py-3 rounded-xl font-semibold whitespace-nowrap transition-all duration-300 ${filters.category === cat
                      ? 'bg-gradient-to-r from-[#7a4d3b] to-[#5d3a2b] text-white shadow-xl shadow-[#7a4d3b]/30 scale-105'
                      : 'bg-white text-[#7a4d3b] hover:bg-[#e8e1d9] border-2 border-[#e8e1d9] hover:border-[#7a4d3b]/20 hover:scale-105'
                      }`}
                  >
                    <span className="relative z-10">{getCategoryIcon(cat)} {cat}</span>
                    {filters.category === cat && (
                      <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <AdvancedFilters onFilterChange={applyFilters} currentFilters={filters} />

          {/* Catalogue Section */}
          <section id="catalogue" className="mb-20">
            {loading ? (
              <div className="text-center py-32">
                <div className="inline-block w-12 h-12 border-4 border-[#e8e1d9] border-t-[#7a4d3b] rounded-full animate-spin"></div>
                <p className="mt-4 text-[#7a4d3b]/60 font-medium">Chargement de la bibliothèque...</p>
              </div>
            ) : books.length === 0 ? (
              <div className="text-center py-24 bg-white/50 backdrop-blur-sm rounded-3xl border-2 border-dashed border-[#7a4d3b]/20">
                <div className="text-7xl mb-6">📚</div>
                <h3 className="text-2xl font-bold text-[#7a4d3b] mb-3">Aucun livre trouvé</h3>
                <p className="text-[#7a4d3b]/60 mb-8">Essayez de modifier vos filtres de recherche</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="group"
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#7a4d3b]/10 hover:-translate-y-2">
                      {/* Book Image */}
                      <div className="relative h-80 bg-gradient-to-br from-[#f5f0e8] to-[#e8e1d9] overflow-hidden">
                        {book.imageUrl ? (
                          <Image
                            src={book.imageUrl}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-20">📖</div>
                          </div>
                        )}

                        {/* Overlay gradient on hover */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#7a4d3b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                        {/* Badges */}
                        <div className="absolute top-4 left-4 flex flex-col gap-2">
                          {book.isBestseller && (
                            <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                              ⭐ Best-seller
                            </span>
                          )}
                          {book.isNew && (
                            <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                              ✨ Nouveau
                            </span>
                          )}
                          {book.stock === 0 && (
                            <span className="px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                              Épuisé
                            </span>
                          )}
                        </div>

                        {/* Category badge */}
                        <div className="absolute top-4 right-4">
                          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-[#7a4d3b] text-xs font-semibold rounded-full">
                            {book.category}
                          </span>
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <p className="text-xs text-[#7a4d3b]/50 font-medium mb-1.5">{book.author}</p>
                        <h3 className="font-bold text-[#7a4d3b] text-base mb-3 line-clamp-2 group-hover:text-[#5d3a2b] transition-colors leading-snug">
                          {book.title}
                        </h3>

                        {/* Prices */}
                        <div className="flex items-center justify-between pt-3 border-t border-[#e8e1d9]">
                          <div>
                            {book.isForSale && book.salePrice && (
                              <div className="text-lg font-bold text-[#7a4d3b]">{book.salePrice.toFixed(0)} CFA</div>
                            )}
                            {book.isForRent && book.rentalPrice && (
                              <div className="text-xs text-[#7a4d3b]/50">Location: {book.rentalPrice.toFixed(0)} CFA</div>
                            )}
                          </div>
                          <div className="w-10 h-10 bg-[#7a4d3b] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>

          {/* Best-sellers Section */}
          {books.some(book => book.isBestseller) && (
            <section id="bestsellers" className="mb-20">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-1 h-8 bg-[#7a4d3b] rounded-full"></div>
                  <h2 className="text-3xl font-bold text-[#7a4d3b]">Best-sellers du moment</h2>
                </div>
                <p className="text-[#7a4d3b]/60 ml-8">Les livres les plus populaires de notre collection</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {books.filter(book => book.isBestseller).slice(0, 6).map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="group"
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#7a4d3b]/10 hover:-translate-y-2">
                      <div className="relative h-80 bg-gradient-to-br from-[#f5f0e8] to-[#e8e1d9] overflow-hidden">
                        {book.imageUrl ? (
                          <Image
                            src={book.imageUrl}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-20">📖</div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#7a4d3b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-amber-500 text-white text-xs font-bold rounded-full shadow-lg">
                            ⭐ Best-seller
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-[#7a4d3b]/50 font-medium mb-1.5">{book.author}</p>
                        <h3 className="font-bold text-[#7a4d3b] text-base mb-3 line-clamp-2 group-hover:text-[#5d3a2b] transition-colors leading-snug">
                          {book.title}
                        </h3>
                        <div className="flex items-center justify-between pt-3 border-t border-[#e8e1d9]">
                          <div>
                            {book.isForSale && book.salePrice && (
                              <div className="text-lg font-bold text-[#7a4d3b]">{book.salePrice.toFixed(0)} CFA</div>
                            )}
                            {book.isForRent && book.rentalPrice && (
                              <div className="text-xs text-[#7a4d3b]/50">Location: {book.rentalPrice.toFixed(0)} CFA</div>
                            )}
                          </div>
                          <div className="w-10 h-10 bg-[#7a4d3b] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* New Releases Section */}
          {books.some(book => book.isNew) && (
            <section id="nouveautes" className="mb-20">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-1 h-8 bg-[#7a4d3b] rounded-full"></div>
                  <h2 className="text-3xl font-bold text-[#7a4d3b]">Dernières nouveautés</h2>
                </div>
                <p className="text-[#7a4d3b]/60 ml-8">Les dernières arrivées dans notre librairie</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {books.filter(book => book.isNew).slice(0, 8).map((book) => (
                  <Link
                    key={book.id}
                    href={`/books/${book.id}`}
                    className="group"
                  >
                    <div className="relative bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-[#7a4d3b]/10 hover:-translate-y-2">
                      <div className="relative h-80 bg-gradient-to-br from-[#f5f0e8] to-[#e8e1d9] overflow-hidden">
                        {book.imageUrl ? (
                          <Image
                            src={book.imageUrl}
                            alt={book.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="text-6xl opacity-20">📖</div>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#7a4d3b]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-bold rounded-full shadow-lg">
                            ✨ Nouveau
                          </span>
                        </div>
                      </div>
                      <div className="p-5">
                        <p className="text-xs text-[#7a4d3b]/50 font-medium mb-1.5">{book.author}</p>
                        <h3 className="font-bold text-[#7a4d3b] text-base mb-3 line-clamp-2 group-hover:text-[#5d3a2b] transition-colors leading-snug">
                          {book.title}
                        </h3>
                        <div className="flex items-center justify-between pt-3 border-t border-[#e8e1d9]">
                          <div>
                            {book.isForSale && book.salePrice && (
                              <div className="text-lg font-bold text-[#7a4d3b]">{book.salePrice.toFixed(0)} CFA</div>
                            )}
                            {book.isForRent && book.rentalPrice && (
                              <div className="text-xs text-[#7a4d3b]/50">Location: {book.rentalPrice.toFixed(0)} CFA</div>
                            )}
                          </div>
                          <div className="w-10 h-10 bg-[#7a4d3b] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Footer */}
          <footer className="mt-32 py-12 border-t-2 border-[#7a4d3b]/10">
            <div className="flex flex-col items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#7a4d3b] rounded-lg flex items-center justify-center">
                  <CompanyLogo size="sm" />
                </div>
                <span className="text-xl font-bold text-[#7a4d3b]">Books Bazar</span>
              </div>
              <p className="text-[#7a4d3b]/50 text-sm">Votre librairie en ligne — Vente et location de livres</p>
              <p className="text-[#7a4d3b]/60 text-sm font-medium">📍 Dakar, Sénégal</p>
              <Link href="/contact" className="text-[#7a4d3b] font-medium hover:text-[#5d3a2b] transition-colors">
                Nous contacter
              </Link>
            </div>
          </footer>
        </main>
      </div>
    </>
  )
}
