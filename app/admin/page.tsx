'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Toast from '@/components/Toast'
import ConfirmDialog from '@/components/ConfirmDialog'
import AdminStats from '@/components/AdminStats'
import ExportButton from '@/components/ExportButton'
import CompanyLogo from '@/components/CompanyLogo'
import CategorySelector from '@/components/CategorySelector'
import { SAMPLE_BOOKS, createSampleBooks } from '@/lib/sampleBooks'

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

export default function AdminDashboard() {
  const router = useRouter()
  const [books, setBooks] = useState<Book[]>([])
  const [showForm, setShowForm] = useState(false)
  const [editingBook, setEditingBook] = useState<Book | null>(null)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null)
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; bookId: string; bookTitle: string }>({ show: false, bookId: '', bookTitle: '' })
  const [deleteAllConfirm, setDeleteAllConfirm] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    description: '',
    rentalPrice: '',
    salePrice: '',
    isForRent: true,
    isForSale: true,
    isBestseller: false,
    isNew: false,
    imageUrl: '',
    category: '',
    isbn: '',
    publisher: '',
    publishedYear: '',
    language: 'Français',
    pages: '',
    stock: '0',
  })

  useEffect(() => {
    // Vérifier l'authentification
    const isAuthenticated = localStorage.getItem('admin_authenticated')
    if (isAuthenticated === 'true') {
      // Vérifier si la session n'est pas trop ancienne (24h)
      const loginTime = localStorage.getItem('admin_login_time')
      if (loginTime) {
        const loginDate = new Date(loginTime)
        const now = new Date()
        const hoursDiff = (now.getTime() - loginDate.getTime()) / (1000 * 60 * 60)

        if (hoursDiff > 24) {
          // Session expirée
          localStorage.removeItem('admin_authenticated')
          localStorage.removeItem('admin_login_time')
          setIsLoggedIn(false)
          return
        }
      }
      setIsLoggedIn(true)
      fetchBooks()
    }
  }, [router])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'shaimaalex2003') {
      localStorage.setItem('admin_authenticated', 'true')
      localStorage.setItem('admin_login_time', new Date().toISOString())
      setIsLoggedIn(true)
      setLoginError('')
      fetchBooks()
    } else {
      setLoginError('Mot de passe incorrect')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated')
    localStorage.removeItem('admin_login_time')
    setIsLoggedIn(false)
    setPassword('')
    router.push('/')
  }

  const fetchBooks = async () => {
    try {
      const response = await fetch('/api/books')
      const data = await response.json()

      if (Array.isArray(data)) {
        setBooks(data)
      } else {
        console.error('API returned non-array data:', data)
        setBooks([])
        setToast({ message: 'Erreur lors du chargement des livres', type: 'error' })
      }
    } catch (error) {
      console.error('Error fetching books:', error)
      setBooks([])
      setToast({ message: 'Erreur lors du chargement des livres', type: 'error' })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    try {
      const url = editingBook ? `/api/books/${editingBook.id}` : '/api/books'
      const method = editingBook ? 'PUT' : 'POST'

      const bookData = {
        ...formData,
        rentalPrice: formData.rentalPrice ? parseFloat(formData.rentalPrice) : null,
        salePrice: formData.salePrice ? parseFloat(formData.salePrice) : null,
        stock: parseInt(formData.stock) || 0,
        publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : null,
        pages: formData.pages ? parseInt(formData.pages) : null,
        isbn: formData.isbn || null,
        publisher: formData.publisher || null,
        imageUrl: formData.imageUrl || null,
      }

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      })

      if (response.ok) {
        resetForm()
        fetchBooks()
        setToast({
          message: editingBook ? 'Livre modifié avec succès!' : 'Livre ajouté avec succès!',
          type: 'success'
        })
      } else {
        setToast({ message: 'Erreur lors de la sauvegarde', type: 'error' })
      }
    } catch (error) {
      setToast({ message: 'Erreur lors de la sauvegarde', type: 'error' })
    }
  }

  const handleEdit = (book: Book) => {
    setEditingBook(book)
    setFormData({
      title: book.title,
      author: book.author,
      description: book.description,
      rentalPrice: book.rentalPrice?.toString() || '',
      salePrice: book.salePrice?.toString() || '',
      isForRent: book.isForRent,
      isForSale: book.isForSale,
      isBestseller: book.isBestseller,
      isNew: book.isNew,
      imageUrl: book.imageUrl || '',
      category: book.category,
      isbn: book.isbn || '',
      publisher: book.publisher || '',
      publishedYear: book.publishedYear?.toString() || '',
      language: book.language,
      pages: book.pages?.toString() || '',
      stock: book.stock.toString(),
    })
    setShowForm(true)
  }

  const handleDeleteClick = (book: Book) => {
    setDeleteConfirm({ show: true, bookId: book.id, bookTitle: book.title })
  }

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetch(`/api/books/${deleteConfirm.bookId}`, { method: 'DELETE' })
      if (response.ok) {
        fetchBooks()
        setToast({ message: 'Livre supprimé avec succès!', type: 'success' })
      } else {
        setToast({ message: 'Erreur lors de la suppression', type: 'error' })
      }
    } catch (error) {
      setToast({ message: 'Erreur lors de la suppression', type: 'error' })
    } finally {
      setDeleteConfirm({ show: false, bookId: '', bookTitle: '' })
    }
  }

  const resetForm = () => {
    setFormData({
      title: '',
      author: '',
      description: '',
      rentalPrice: '',
      salePrice: '',
      isForRent: true,
      isForSale: true,
      isBestseller: false,
      isNew: false,
      imageUrl: '',
      category: '',
      isbn: '',
      publisher: '',
      publishedYear: '',
      language: 'Français',
      pages: '',
      stock: '0',
    })
    setEditingBook(null)
    setShowForm(false)
  }

  const handleAddSampleBooks = async () => {
    try {
      const result = await createSampleBooks()
      if (result) {
        setToast({
          message: `✅ ${result.count} livres exemples ont été ajoutés avec succès !`,
          type: 'success'
        })
        await fetchBooks()
      } else {
        setToast({
          message: '❌ Erreur lors de l\'ajout des livres exemples',
          type: 'error'
        })
      }
    } catch (error) {
      console.error('Error adding sample books:', error)
      setToast({
        message: '❌ Erreur lors de l\'ajout des livres exemples',
        type: 'error'
      })
    }
  }

  const handleDeleteAllBooks = () => {
    setDeleteAllConfirm(true)
  }

  const handleDeleteAllConfirm = async () => {
    setDeleteAllConfirm(false)

    try {
      const deletePromises = books.map(book =>
        fetch(`/api/books/${book.id}`, { method: 'DELETE' })
      )

      await Promise.all(deletePromises)

      setToast({
        message: `✅ Tous les livres (${books.length}) ont été supprimés avec succès !`,
        type: 'success'
      })
      await fetchBooks()
    } catch (error) {
      console.error('Error deleting all books:', error)
      setToast({
        message: '❌ Erreur lors de la suppression des livres',
        type: 'error'
      })
    }
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
      {deleteConfirm.show && (
        <ConfirmDialog
          title="Confirmer la suppression"
          message={`Êtes-vous sûr de vouloir supprimer "${deleteConfirm.bookTitle}" ? Cette action est irréversible.`}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setDeleteConfirm({ show: false, bookId: '', bookTitle: '' })}
        />
      )}
      {deleteAllConfirm && (
        <ConfirmDialog
          title="⚠️ ATTENTION - Suppression de tous les livres"
          message={`Êtes-vous absolument sûr de vouloir supprimer TOUS les livres (${books.length}) ? Cette action est IRRÉVERSIBLE !`}
          onConfirm={handleDeleteAllConfirm}
          onCancel={() => setDeleteAllConfirm(false)}
        />
      )}

      {!isLoggedIn ? (
        // Formulaire de login
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2NjdlZWEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6bTAgMjBjMC0xLjEuOS0yIDItMnMyIC45IDI 6Mi0uOSAyLTI 2i0yLS45LTItMnptLTIwIDBjMC0xLjEuOS0yIDItMnMyIC45IDI 6i0uOSAyLTI 6i0yLS45LTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
          <div className="relative z-10 w-full max-w-md">
            <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-white/20">
              <div className="text-center mb-8">
                <CompanyLogo size="lg" />
                <h1 className="text-3xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mt-4">
                  Admin Login
                </h1>
                <p className="text-slate-600 mt-2">Entrez votre mot de passe pour accéder au tableau de bord</p>
              </div>
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                    placeholder="Entrez le mot de passe"
                    autoFocus
                  />
                  {loginError && (
                    <p className="text-red-600 text-sm mt-2 font-medium">{loginError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  Se connecter
                </button>
              </form>
              <div className="mt-6 text-center">
                <Link
                  href="/"
                  className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                >
                  ← Retour au site
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        // Dashboard
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiM2NjdlZWEiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMS4xLjktMiAyLTJzMiAuOSAyIDItLjkgMi0yIDItMi0uOS0yLTJ6bTAgMjBjMC0xLjEuOS0yIDItMnMyIC45IDI 6Mi0uOSAyLTI 6i0yLS45LTItMnptLTIwIDBjMC0xLjEuOS0yIDItMnMyIC45IDI 6i0uOSAyLTI 6i0yLS45LTItMnoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>

          <header className="relative backdrop-blur-md bg-white/80 shadow-lg border-b border-white/20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-3 animate-slideIn">
                  <CompanyLogo size="sm" />
                  <div>
                    <h1 className="text-2xl font-black bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Tableau de Bord
                    </h1>
                    <p className="text-xs text-slate-600 font-medium">Gestion de votre bibliothèque</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link
                    href="/"
                    className="group inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 font-semibold text-sm transition-all duration-300 hover:gap-2"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Retour
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="group inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold text-sm transition-all duration-300"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                    Déconnexion
                  </button>
                  <span
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Ajouter
                  </span>
                  <span
                    onClick={handleAddSampleBooks}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                    Exemples
                  </span>
                  <span
                    onClick={handleDeleteAllBooks}
                    className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-red-600 to-rose-600 text-white rounded-lg font-semibold text-sm shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                    Supprimer tout
                  </span>
                </div>
              </div>
            </div>
          </header>

          <main className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <AdminStats />

            <div className="mb-8 flex items-center justify-between">
              <ExportButton books={books} />
              <button
                onClick={() => setShowForm(!showForm)}
                className="group relative px-6 py-2.5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg text-sm font-medium shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {showForm ? (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Annuler
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      Ajouter un livre
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>

            {showForm && (
              <div className="glass-effect rounded-2xl shadow-lg p-6 mb-8 border border-white/30 animate-fadeIn">
                <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                  <div className="p-1.5 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-lg">
                    <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  {editingBook ? 'Modifier le livre' : 'Nouveau livre'}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Titre *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Auteur *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.author}
                        onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Catégorie *
                      </label>
                      <CategorySelector
                        value={formData.category}
                        onChange={(category) => setFormData({ ...formData, category })}
                        placeholder="Sélectionnez une catégorie"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Prix de location (CFA)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.rentalPrice}
                        onChange={(e) => setFormData({ ...formData, rentalPrice: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                        placeholder="Prix de location"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Prix de vente (CFA)
                      </label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.salePrice}
                        onChange={(e) => setFormData({ ...formData, salePrice: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                        placeholder="Prix de vente"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-3">
                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Options de vente
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.isForRent}
                            onChange={(e) => setFormData({ ...formData, isForRent: e.target.checked })}
                            className="w-5 h-5 text-indigo-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                          />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                            📚 Disponible à la location
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.isForSale}
                            onChange={(e) => setFormData({ ...formData, isForSale: e.target.checked })}
                            className="w-5 h-5 text-indigo-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all"
                          />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-indigo-600 transition-colors">
                            💰 Disponible à la vente
                          </span>
                        </label>
                      </div>
                    </div>

                    <div className="md:col-span-2">
                      <label className="block text-xs font-semibold text-slate-700 mb-3">
                        <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                        </svg>
                        Mise en avant
                      </label>
                      <div className="flex gap-6">
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.isBestseller}
                            onChange={(e) => setFormData({ ...formData, isBestseller: e.target.checked })}
                            className="w-5 h-5 text-amber-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-amber-200 focus:border-amber-500 transition-all"
                          />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-amber-600 transition-colors">
                            ⭐ Best-seller
                          </span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer group">
                          <input
                            type="checkbox"
                            checked={formData.isNew}
                            onChange={(e) => setFormData({ ...formData, isNew: e.target.checked })}
                            className="w-5 h-5 text-emerald-600 border-2 border-slate-300 rounded focus:ring-2 focus:ring-emerald-200 focus:border-emerald-500 transition-all"
                          />
                          <span className="text-sm font-medium text-slate-700 group-hover:text-emerald-600 transition-colors">
                            🆕 Nouveauté
                          </span>
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Stock *
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Image du livre
                      </label>
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => {
                            const input = document.createElement('input')
                            input.type = 'file'
                            input.accept = 'image/*'
                            input.onchange = (e) => {
                              const file = (e.target as HTMLInputElement).files?.[0]
                              if (file) {
                                const reader = new FileReader()
                                reader.onloadend = () => {
                                  setFormData({ ...formData, imageUrl: reader.result as string })
                                }
                                reader.readAsDataURL(file)
                              }
                            }
                            input.click()
                          }}
                          className="px-6 py-3 bg-gradient-to-r from-indigo-100 to-purple-100 hover:from-indigo-200 hover:to-purple-200 text-indigo-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105 border-2 border-indigo-200"
                        >
                          📷 Choisir une image
                        </button>
                        {formData.imageUrl && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-emerald-600 font-medium">✓ Image sélectionnée</span>
                            <button
                              type="button"
                              onClick={() => setFormData({ ...formData, imageUrl: '' })}
                              className="text-rose-600 hover:text-rose-700 font-semibold"
                            >
                              ✕
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        ISBN
                      </label>
                      <input
                        type="text"
                        value={formData.isbn}
                        onChange={(e) => setFormData({ ...formData, isbn: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Éditeur
                      </label>
                      <input
                        type="text"
                        value={formData.publisher}
                        onChange={(e) => setFormData({ ...formData, publisher: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Année de publication
                      </label>
                      <input
                        type="number"
                        value={formData.publishedYear}
                        onChange={(e) => setFormData({ ...formData, publishedYear: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Langue
                      </label>
                      <input
                        type="text"
                        value={formData.language}
                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Nombre de pages
                      </label>
                      <input
                        type="number"
                        value={formData.pages}
                        onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                        className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">
                      Description *
                    </label>
                    <textarea
                      required
                      rows={6}
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-slate-900 shadow-sm hover:shadow-md"
                    />
                  </div>

                  <div className="flex gap-4 pt-4">
                    <button
                      type="submit"
                      className="group relative px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                      <span className="relative z-10">{editingBook ? 'Modifier' : 'Ajouter'}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                    <button
                      type="button"
                      onClick={resetForm}
                      className="px-8 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-xl font-semibold transition-all duration-300 hover:scale-105"
                    >
                      Annuler
                    </button>
                  </div>
                </form>
              </div>
            )}

            <div className="glass-effect rounded-3xl shadow-2xl overflow-hidden border border-white/30 animate-fadeIn">
              <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-purple-50">
                <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                  <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Liste des livres ({books.length})
                </h2>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gradient-to-r from-slate-50 to-slate-100">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                        Titre
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                        Auteur
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                        Prix Location
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                        Prix Vente
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                        Stock
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-black text-slate-600 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white/50 divide-y divide-slate-200">
                    {books.map((book, index) => (
                      <tr key={book.id} className="hover:bg-white/80 transition-colors duration-200 animate-fadeIn" style={{ animationDelay: `${index * 0.05}s` }}>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-semibold text-slate-900">{book.title}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-slate-600 font-medium">{book.author}</div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className="px-3 py-1.5 text-xs font-bold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full border border-indigo-200">
                            {book.category}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {book.rentalPrice ? `${book.rentalPrice.toFixed(0)} CFA` : '-'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            {book.salePrice ? `${book.salePrice.toFixed(0)} CFA` : '-'}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-semibold text-slate-900">{book.stock}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleEdit(book)}
                              className="px-3 py-1.5 text-sm bg-indigo-100 hover:bg-indigo-200 text-indigo-700 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                            >
                              Modifier
                            </button>
                            <button
                              onClick={() => handleDeleteClick(book)}
                              className="px-3 py-1.5 text-sm bg-rose-100 hover:bg-rose-200 text-rose-700 rounded-lg font-medium transition-all duration-200 hover:scale-105"
                            >
                              Supprimer
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </main>
        </div>
      )}
    </>
  )
}
