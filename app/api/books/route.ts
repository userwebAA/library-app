import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search') || ''
    const category = searchParams.get('category') || ''
    const author = searchParams.get('author') || ''

    const where: any = {}

    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ]
    }

    if (category) {
      where.category = category
    }

    if (author) {
      where.author = { contains: author, mode: 'insensitive' }
    }

    const books = await prisma.book.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    })

    return NextResponse.json(books)
  } catch (error) {
    console.error('Error fetching books:', error)
    return NextResponse.json({ error: 'Failed to fetch books' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const createData: any = {
      title: body.title,
      author: body.author,
      description: body.description,
      category: body.category,
      language: body.language || 'Français',
      rentalPrice: body.rentalPrice ? parseFloat(body.rentalPrice) : null,
      salePrice: body.salePrice ? parseFloat(body.salePrice) : null,
      isForRent: body.isForRent !== undefined ? Boolean(body.isForRent) : true,
      isForSale: body.isForSale !== undefined ? Boolean(body.isForSale) : true,
      isBestseller: body.isBestseller !== undefined ? Boolean(body.isBestseller) : false,
      isNew: body.isNew !== undefined ? Boolean(body.isNew) : false,
      stock: parseInt(body.stock) || 0,
      publishedYear: body.publishedYear ? parseInt(body.publishedYear) : null,
      pages: body.pages ? parseInt(body.pages) : null,
      isbn: body.isbn || null,
      publisher: body.publisher || null,
      imageUrl: body.imageUrl || null,
    }

    if (body.isbn !== undefined && body.isbn !== '') {
      createData.isbn = body.isbn
    }

    if (body.publisher !== undefined && body.publisher !== '') {
      createData.publisher = body.publisher
    }

    if (body.publishedYear !== undefined && body.publishedYear !== null && body.publishedYear !== '') {
      createData.publishedYear = typeof body.publishedYear === 'number' ? body.publishedYear : parseInt(body.publishedYear)
    }

    if (body.pages !== undefined && body.pages !== null && body.pages !== '') {
      createData.pages = typeof body.pages === 'number' ? body.pages : parseInt(body.pages)
    }

    const book = await prisma.book.create({
      data: createData,
    })

    return NextResponse.json(book, { status: 201 })
  } catch (error) {
    console.error('Error creating book:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({
      error: 'Failed to create book',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
