'use client'
import { addToCart } from '../../redux/slices/cartSlice'
import { Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

export default function AddToCart({
  product,
  showQty = true,
  redirect = false,
  increasePerClick = false,
}) {
  const dispatch = useDispatch()
  const { cartItems } = useSelector((state) => state.cart)
  const router = useRouter()
  const [qty, setQty] = useState(1)

  const addToCartHandler = () => {
    let newQty = qty
    if (increasePerClick) {
      const existItem = cartItems.find((x) => x.id === product.id)
      if (existItem) {
        if (existItem.qty + 1 <= product.quantity) {
          newQty = existItem.qty + 1
        } else {
          return alert('No more product exist')
        }
      }
    }
    dispatch(addToCart({ ...product, qty: newQty }))

    if (redirect) router.push('/cart')
  }
  return (
    <>
      {product.quantity > 0 && showQty && (
        <div className="mb-2 flex justify-between">
          <div>Qty</div>
          <div>
            <selector
              value={qty}
              onChange={(e) => setQty(Number(e.target.value))}
            >
              {[...Array(product.quantity).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </selector>
          </div>
        </div>
      )}
      <div>
        {product.quantity > 0 ? (
          <button onClick={addToCartHandler} className="default-button-add">
            <Plus />
          </button>
        ) : (
          <button disabled>Out of stock</button>
        )}
      </div>
    </>
  )
}
