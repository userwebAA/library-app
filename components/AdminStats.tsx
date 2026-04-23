'use client'

import { useEffect, useState } from 'react'

interface Stats {
  totalBooks: number
  totalValue: number
  lowStock: number
  outOfStock: number
  averagePrice: number
  mostExpensive: { title: string; price: number } | null
}

export default function AdminStats() {
  const [stats, setStats] = useState<Stats>({
    totalBooks: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0,
    averagePrice: 0,
    mostExpensive: null
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/books/stats')
      if (response.ok) {
        const data = await response.json()
        setStats(data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-effect rounded-xl p-5 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-3"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 animate-fadeIn">
      {/* Total Books */}
      <div className="glass-effect rounded-xl p-5 border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Total Livres</p>
            <p className="text-3xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              {stats.totalBooks}
            </p>
          </div>
          <div className="p-3 bg-gradient-to-br from-indigo-100 to-purple-100 rounded-xl">
            <svg className="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
        </div>
      </div>

      {/* Total Value */}
      <div className="glass-effect rounded-xl p-5 border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Valeur Totale</p>
            <p className="text-3xl font-black bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
              {stats.totalValue.toFixed(0)} CFA
            </p>
          </div>
          <div className="p-3 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-xl">
            <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Low Stock */}
      <div className="glass-effect rounded-xl p-5 border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Stock Faible</p>
            <p className="text-3xl font-black bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent">
              {stats.lowStock}
            </p>
          </div>
          <div className="p-3 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl">
            <svg className="w-8 h-8 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="glass-effect rounded-xl p-5 border border-white/30 hover:shadow-xl transition-all duration-300 hover:scale-105">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">Rupture Stock</p>
            <p className="text-3xl font-black bg-gradient-to-r from-rose-600 to-red-600 bg-clip-text text-transparent">
              {stats.outOfStock}
            </p>
          </div>
          <div className="p-3 bg-gradient-to-br from-rose-100 to-red-100 rounded-xl">
            <svg className="w-8 h-8 text-rose-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
