'use client'
import Link from 'next/link'

export default function Header() {
  return (
    <header>
      <nav className="flex justify-between items-center h-16 w-full px-5 shadow-md bg-gray-800 text-white">
        <Link href="/" className="text-lg font-bold">
          Samar Book Depot.
        </Link>
      </nav>
    </header>
  )
}
