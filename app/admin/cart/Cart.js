'use client'
import { ArrowLeft, PrinterCheck, Trash2 } from 'lucide-react'
import AddToCart from '../../../app/components/AddToCart'
import { removeFromCart } from '../../../redux/slices/cartSlice'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'

export default function Cart() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { loading, cartItems, totalPrice } = useSelector((state) => state.cart)

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id))
  }
  return (
    <div>
      <div className="flex flex-row">
        <Link href="/admin/product" className="primary-button">
          <ArrowLeft size={25} />
          Add More Items
        </Link>
      </div>
      <div className="flex justify-center">
        <h1 className="mt-4 text-2xl font-bold underline mb-4 text-white">
          List Items
        </h1>
      </div>
      {loading ? (
        <div>Loading....</div>
      ) : cartItems.length === 0 ? (
        <div>
          List is Empty{' '}
          <Link href="/admin/product" className="primary-button">
            Add Items
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-4 md:gap-5">
          <div className="overflow-x-auto md:col-span-3">
            <table className="min-w-full ">
              <thead className="border-b bg-gray-300">
                <tr>
                  <th className="p-5 text-center">Product</th>
                  <th className="p-5 text-center">Quantity</th>
                  <th className="p-5 text-center">Price</th>
                  <th className="p-5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="bg-gray-300">
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td className="p-5 text-center">
                      {/* <Link href={`/product/${item.id}`}>{item.name}</Link> */}
                      {item.name}
                    </td>
                    <td className="p-5 text-center ">
                      <div className="flex flex-row justify-center">
                        {item.qty}
                      </div>
                    </td>
                    <td className="p-5 text-center">Rs. {item.price}</td>
                    <td className="p-5 text-right">
                      <div className="flex flex-row  justify-center">
                        <button
                          className="default-button mr-3"
                          onClick={() => removeFromCartHandler(item.id)}
                        >
                          <Trash2 />
                        </button>
                        <AddToCart
                          product={item}
                          showQty={false}
                          increasePerClick={true}
                          redirect={false}
                        />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="card p-5">
            <ul>
              <li>
                <div className="pb-3 text-xl text-white">
                  Subtotal ( {cartItems.reduce((a, c) => a + c.qty, 0)} ) : Rs.{' '}
                  {totalPrice}
                </div>
              </li>
              <li>
                <button
                  className="primary-button w-60 flex flex-row"
                  onClick={() => router.push('/admin/bill')}
                >
                  <PrinterCheck />
                  Procees To Print
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}
