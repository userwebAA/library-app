import { NextResponse, NextRequest } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { books } = body

    if (!books || !Array.isArray(books)) {
      return NextResponse.json({ error: 'Invalid books data' }, { status: 400 })
    }

    // Check if books already exist
    const existingBooks = await prisma.book.findMany({
      where: {
        title: {
          in: books.map((book: any) => book.title)
        }
      }
    })

    if (existingBooks.length > 0) {
      return NextResponse.json({
        message: 'Books already exist',
        existingCount: existingBooks.length,
        books: existingBooks
      }, { status: 200 })
    }

    // Create books
    const createdBooks = await prisma.book.createMany({
      data: books.map((book: any) => ({
        title: book.title,
        author: book.author,
        description: book.description,
        category: book.category,
        rentalPrice: book.rentalPrice,
        salePrice: book.salePrice,
        isForRent: book.isForRent,
        isForSale: book.isForSale,
        isbn: book.isbn,
        publisher: book.publisher,
        publishedYear: book.publishedYear,
        language: book.language,
        pages: book.pages,
        stock: book.stock,
        imageUrl: book.imageUrl
      }))
    })

    // Fetch created books to return them
    const allBooks = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      take: createdBooks.count
    })

    return NextResponse.json({
      message: `Successfully created ${createdBooks.count} sample books`,
      count: createdBooks.count,
      books: allBooks
    })

  } catch (error) {
    console.error('Error creating sample books:', error)
    return NextResponse.json({
      error: 'Failed to create sample books',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function GET() {
  try {
    const books = await prisma.book.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5
    })

    return NextResponse.json({
      message: 'Sample books endpoint is ready',
      recentBooks: books,
      totalBooks: await prisma.book.count()
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}
