'use client'
import { useEffect, useState } from 'react'
import AddToCart from './AddToCart'

export default function ItemRows() {
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

  if (error) {
    console.log(`Error: ${error}`)
  }

  return (
    <tbody className="bg-gray-300">
      {products.map((item) => (
        <tr key={item.id}>
          <td className="p-5 text-center">
            <p className="text-lg font-medium">{item.id}</p>
          </td>
          <td className="p-5 text-center">
            <p className="text-lg font-medium">{item.name}</p>
          </td>
          <td className="p-5 text-center">
            <p className="text-lg font-medium">Rs. {item.price}</p>
          </td>
          <td className="p-5 text-center">
            <p className="text-lg font-medium">{item.quantity}</p>
          </td>
          <td className="p-5 text-center">
            <p className="text-lg font-medium">
              Rs. {item.price * item.quantity}
            </p>
          </td>
          <td className="p-5 text-center">
            <AddToCart
              product={item}
              showQty={false}
              increasePerClick={true}
              redirect={false}
            />
          </td>
        </tr>
      ))}
    </tbody>
  )
}
