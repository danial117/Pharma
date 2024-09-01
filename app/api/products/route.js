import { NextResponse } from 'next/server'
import prisma from '../../../prisma/client'

export async function POST(req) {
  const formData = await req.formData()

  const name = formData.get('name')
  const price = formData.get('price')
  const quantity = formData.get('quantity')
  const rate = formData.get('rate')

  try {
    // Save to database
    const result = await prisma.products.create({
      data: {
        name,
        quantity,
        price,
        rate,
      },
    })

    return NextResponse.json({ data: result })
  } catch (e) {
    console.error('Error while trying to upload a file\n', e)
    return NextResponse.json(
      { error: `'Something went wrong.' ${e} ` },
      { status: 500 }
    )
  }
}

export async function GET() {
  const products = await prisma.products.findMany()
  return NextResponse.json(products)
}
