import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const books = await prisma.book.findMany()

    const totalBooks = books.length
    const totalValue = books.reduce((sum, book) => {
      const price = book.salePrice || book.rentalPrice || 0
      return sum + (price * book.stock)
    }, 0)
    
    const lowStock = books.filter(book => book.stock > 0 && book.stock <= 5).length
    const outOfStock = books.filter(book => book.stock === 0).length
    
    const booksWithPrice = books.filter(book => book.salePrice || book.rentalPrice)
    const averagePrice = booksWithPrice.length > 0
      ? booksWithPrice.reduce((sum, book) => sum + (book.salePrice || book.rentalPrice || 0), 0) / booksWithPrice.length
      : 0

    const mostExpensive = books.reduce((max, book) => {
      const price = book.salePrice || book.rentalPrice || 0
      const maxPrice = max ? (max.salePrice || max.rentalPrice || 0) : 0
      return price > maxPrice ? book : max
    }, books[0] as typeof books[0] | null)

    return NextResponse.json({
      totalBooks,
      totalValue,
      lowStock,
      outOfStock,
      averagePrice,
      mostExpensive: mostExpensive ? {
        title: mostExpensive.title,
        price: mostExpensive.salePrice || mostExpensive.rentalPrice || 0
      } : null
    })
  } catch (error) {
    console.error('Error fetching stats:', error)
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 })
  }
}
