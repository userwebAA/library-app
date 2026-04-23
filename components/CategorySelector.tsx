'use client'

import { useState } from 'react'
import { PREDEFINED_CATEGORIES, getCategoriesByGroup, getCategoryIcon } from '@/lib/categories'

interface CategorySelectorProps {
  value: string
  onChange: (category: string) => void
  placeholder?: string
}

export default function CategorySelector({ value, onChange, placeholder = "Sélectionnez une catégorie" }: CategorySelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  
  const categoriesByGroup = getCategoriesByGroup()
  
  const filteredCategories = searchTerm 
    ? PREDEFINED_CATEGORIES.filter(cat => 
        cat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        cat.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : PREDEFINED_CATEGORIES

  const selectedCategory = PREDEFINED_CATEGORIES.find(cat => cat.name === value)

  return (
    <div className="relative">
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 bg-white border-2 border-slate-200 rounded-xl focus:ring-4 focus:ring-indigo-200 focus:border-indigo-500 transition-all duration-300 text-left flex items-center justify-between shadow-sm hover:shadow-md"
        >
          <div className="flex items-center gap-3">
            {selectedCategory ? (
              <>
                <span className="text-2xl">{selectedCategory.icon}</span>
                <div>
                  <div className="font-semibold text-slate-900">{selectedCategory.name}</div>
                  <div className="text-xs text-slate-500">{selectedCategory.description}</div>
                </div>
              </>
            ) : (
              <>
                <span className="text-2xl">📚</span>
                <span className="text-slate-500">{placeholder}</span>
              </>
            )}
          </div>
          <svg 
            className={`w-5 h-5 text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border-2 border-slate-200 rounded-xl shadow-xl max-h-96 overflow-hidden">
          {/* Search input */}
          <div className="p-3 border-b border-slate-200">
            <div className="relative">
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Rechercher une catégorie..."
                className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-500"
                onClick={(e) => e.stopPropagation()}
              />
            </div>
          </div>

          {/* Categories list */}
          <div className="max-h-80 overflow-y-auto">
            {searchTerm ? (
              // Search results - flat list
              <div className="p-2">
                {filteredCategories.map((category) => (
                  <button
                    key={category.name}
                    type="button"
                    onClick={() => {
                      onChange(category.name)
                      setIsOpen(false)
                      setSearchTerm('')
                    }}
                    className={`w-full px-3 py-2 rounded-lg text-left flex items-center gap-3 transition-colors duration-200 ${
                      value === category.name 
                        ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                        : 'hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span className="text-xl">{category.icon}</span>
                    <div className="flex-1">
                      <div className="font-medium">{category.name}</div>
                      <div className="text-xs text-slate-500">{category.description}</div>
                    </div>
                    {value === category.name && (
                      <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            ) : (
              // Grouped categories
              Object.entries(categoriesByGroup).map(([groupName, categories]) => (
                <div key={groupName} className="border-b border-slate-100 last:border-b-0">
                  <div className="px-3 py-2 bg-slate-50 border-b border-slate-200">
                    <h3 className="text-xs font-semibold text-slate-600 uppercase tracking-wide">{groupName}</h3>
                  </div>
                  <div className="p-2">
                    {categories.map((category) => (
                      <button
                        key={category.name}
                        type="button"
                        onClick={() => {
                          onChange(category.name)
                          setIsOpen(false)
                        }}
                        className={`w-full px-3 py-2 rounded-lg text-left flex items-center gap-3 transition-colors duration-200 ${
                          value === category.name 
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200' 
                            : 'hover:bg-slate-50 text-slate-700'
                        }`}
                      >
                        <span className="text-xl">{category.icon}</span>
                        <div className="flex-1">
                          <div className="font-medium">{category.name}</div>
                          <div className="text-xs text-slate-500">{category.description}</div>
                        </div>
                        {value === category.name && (
                          <svg className="w-5 h-5 text-indigo-600" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Custom category option */}
          <div className="p-3 border-t border-slate-200 bg-slate-50">
            <button
              type="button"
              onClick={() => {
                const customCategory = prompt("Entrez une nouvelle catégorie personnalisée :")
                if (customCategory && customCategory.trim()) {
                  onChange(customCategory.trim())
                  setIsOpen(false)
                  setSearchTerm('')
                }
              }}
              className="w-full px-3 py-2 bg-white border-2 border-dashed border-slate-300 rounded-lg text-left flex items-center gap-3 hover:border-indigo-400 hover:bg-indigo-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span className="text-sm font-medium text-slate-600">Catégorie personnalisée</span>
            </button>
          </div>
        </div>
      )}

      {/* Click outside to close */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}
