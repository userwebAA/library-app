'use client'

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterState) => void
  currentFilters: FilterState
}

export interface FilterState {
  search: string
  category: string
  availability: 'all' | 'available' | 'low' | 'out'
  priceRange: 'all' | 'low' | 'medium' | 'high'
  saleType: 'all' | 'rental' | 'sale' | 'both'
  sortBy: 'newest' | 'oldest' | 'price-asc' | 'price-desc' | 'title' | 'stock'
}

export default function AdvancedFilters({ onFilterChange, currentFilters }: AdvancedFiltersProps) {
  const handleChange = (key: keyof FilterState, value: string) => {
    onFilterChange({ ...currentFilters, [key]: value })
  }

  return (
    <div className="glass-effect rounded-xl p-4 mb-6 border border-white/30 animate-fadeIn">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Availability Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Disponibilité
          </label>
          <select
            value={currentFilters.availability}
            onChange={(e) => handleChange('availability', e.target.value)}
            className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-sm text-gray-900 font-medium"
          >
            <option value="all">Tous</option>
            <option value="available">En stock (&gt; 5)</option>
            <option value="low">Stock faible (1-5)</option>
            <option value="out">Rupture de stock</option>
          </select>
        </div>

        {/* Sort By */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12" />
            </svg>
            Trier par
          </label>
          <select
            value={currentFilters.sortBy}
            onChange={(e) => handleChange('sortBy', e.target.value)}
            className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-sm text-gray-900 font-medium"
          >
            <option value="newest">Plus récent</option>
            <option value="oldest">Plus ancien</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
            <option value="title">Titre (A-Z)</option>
            <option value="stock">Stock disponible</option>
          </select>
        </div>

        {/* Sale Type Filter */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-2">
            <svg className="w-4 h-4 inline mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            Type de Vente
          </label>
          <select
            value={currentFilters.saleType}
            onChange={(e) => handleChange('saleType', e.target.value)}
            className="w-full px-3 py-2 bg-white border-2 border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500 transition-all text-sm text-gray-900 font-medium"
          >
            <option value="all">Tous</option>
            <option value="rental">Location uniquement</option>
            <option value="sale">Vente uniquement</option>
            <option value="both">Location et Vente</option>
          </select>
        </div>

        {/* Reset Filters */}
        <div className="flex items-end">
          <button
            onClick={() => onFilterChange({
              search: '',
              category: '',
              availability: 'all',
              priceRange: 'all',
              saleType: 'all',
              sortBy: 'newest'
            })}
            className="w-full px-4 py-2 bg-gradient-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 rounded-lg font-semibold transition-all duration-300 hover:scale-105 text-sm flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Réinitialiser
          </button>
        </div>
      </div>
    </div>
  )
}
