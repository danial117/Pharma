'use client'
import { ShoppingBag, Trash2 } from 'lucide-react'
import { addToCart, removeFromCart } from '../../redux/slices/cartSlice'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'

export default function CartSidebar() {
  const { loading, cartItems, totalPrice } = useSelector((state) => state.cart)

  const dispatch = useDispatch()

  const addToCartHandler = (product, qty) => {
    dispatch(addToCart({ ...product, qty }))
  }

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }

  return (
    <div className="fixed top-0 right-0 w-44 h-full shadow-lg border-l border-l-gray-700 overflow-scroll">
      {loading ? (
        <div className="py-5 px-2">Loading...</div>
      ) : cartItems.length === 0 ? (
        <div className="py-5 px-2 text-white">Cart is empty</div>
      ) : (
        <>
          <div className="p-2 flex flex-col items-center border-b border-b-gray-800">
            <div className="text-white dark:text-gray-800">subtotal</div>
            <div className=" font-bold text-orange-700">Rs. {totalPrice}</div>
          </div>
          <div className="flex items-center my-4">
            <Link href="/admin/cart" className="primary-button w-full mx-2">
              <ShoppingBag /> Cart
            </Link>
          </div>
          {cartItems.map((item) => {
            return (
              <div
                key={item.id}
                className="p-2 flex flex-col items-center border-b border-b-gray-600"
              >
                <div className="flex flex-row">
                  <div className="flex items-center mr-6 font-semibold text-xl text-white">
                    {item.name}
                  </div>
                  <select
                    value={item.qty}
                    onChange={(e) =>
                      addToCartHandler(item, Number(e.target.value))
                    }
                  >
                    {[...Array(item.qty).keys()].map((x) => (
                      <option key={x + 1} value={x + 1}>
                        {x + 1}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  className="default-button mt-2 flex flex-row"
                  onClick={() => removeFromCartHandler(item.id)}
                >
                  <Trash2 />
                  Delete
                </button>
              </div>
            )
          })}
        </>
      )}
    </div>
  )
}
