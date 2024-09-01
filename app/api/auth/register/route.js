import { NextResponse } from 'next/server'
import { hash } from 'bcrypt'
import prisma from '../../../../prisma/client'

export async function POST(request) {
  try {
    const { name, email, hashPassword } = await request.json()
    const password = await hash(hashPassword, 10)
    // Save to database
    const result = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    })

    return NextResponse.json({ data: result }, { status: 201 })
  } catch (e) {
    console.error('Error', e.message)
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    )
  }
}
