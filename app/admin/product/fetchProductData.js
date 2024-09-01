'use client'
import { useEffect, useState } from 'react'

export function useProductData() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`)
        if (!res.ok) {
          throw new Error('Failed to fetch products')
        }
        const productsData = await res.json()
        setProducts(productsData)
      } catch (error) {
        setError(error.message)
      }
    }

    fetchProducts()
  }, [])

  return { products, error }
}
