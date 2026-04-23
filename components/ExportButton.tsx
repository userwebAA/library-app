'use client'

interface Book {
  id: string
  title: string
  author: string
  category: string
  rentalPrice: number | null
  salePrice: number | null
  stock: number
  isbn: string | null
  publisher: string | null
  publishedYear: number | null
}

interface ExportButtonProps {
  books: Book[]
}

export default function ExportButton({ books }: ExportButtonProps) {
  const exportToCSV = () => {
    const headers = ['Titre', 'Auteur', 'Catégorie', 'Prix Location', 'Prix Vente', 'Stock', 'ISBN', 'Éditeur', 'Année']
    
    const csvData = books.map(book => [
      book.title,
      book.author,
      book.category,
      book.rentalPrice?.toFixed(2) || '-',
      book.salePrice?.toFixed(2) || '-',
      book.stock,
      book.isbn || '-',
      book.publisher || '-',
      book.publishedYear || '-'
    ])

    const csvContent = [
      headers.join(','),
      ...csvData.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n')

    const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    
    link.setAttribute('href', url)
    link.setAttribute('download', `catalogue_livres_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <button
      onClick={exportToCSV}
      className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 shadow-lg flex items-center gap-2 text-sm"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
      Exporter CSV ({books.length})
    </button>
  )
}
