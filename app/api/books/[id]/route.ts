import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const book = await prisma.book.findUnique({
      where: { id },
    })

    if (!book) {
      return NextResponse.json({ error: 'Book not found' }, { status: 404 })
    }

    return NextResponse.json(book)
  } catch (error) {
    console.error('Error fetching book:', error)
    return NextResponse.json({ error: 'Failed to fetch book' }, { status: 500 })
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    console.log('PUT request - Book ID:', id)
    console.log('PUT request - Body:', JSON.stringify(body, null, 2))

    // Check if book exists first
    const existingBook = await prisma.book.findUnique({
      where: { id }
    })

    if (!existingBook) {
      console.error('Book not found with ID:', id)
      return NextResponse.json({
        error: 'Book not found',
        details: `No book found with ID: ${id}`
      }, { status: 404 })
    }

    const updateData: any = {
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

    console.log('Update data:', JSON.stringify(updateData, null, 2))

    const book = await prisma.book.update({
      where: { id },
      data: updateData,
    })

    console.log('Book updated successfully:', book.id)
    return NextResponse.json(book)
  } catch (error) {
    console.error('Error updating book:', error)
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error')
    return NextResponse.json({
      error: 'Failed to update book',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.book.delete({
      where: { id },
    })

    return NextResponse.json({ message: 'Book deleted successfully' })
  } catch (error) {
    console.error('Error deleting book:', error)
    return NextResponse.json({ error: 'Failed to delete book' }, { status: 500 })
  }
}
