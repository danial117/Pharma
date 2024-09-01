'use client'
import React from 'react'
import { useSelector } from 'react-redux'

export default function Table() {
  const { cartItems, totalPrice } = useSelector((state) => state.cart)

  return (
    <>
      <table width="100%" className="mb-10">
        <thead>
          <tr className="bg-gray-100 p-1">
            <td className="font-bold">Name</td>
            <td className="font-bold">Quantity</td>
            <td className="font-bold">Price</td>
            <td className="font-bold">Amount</td>
          </tr>
        </thead>
        {cartItems.map((item) => (
          <React.Fragment key={item.id}>
            <tbody>
              <tr className="h-10">
                <td>{item.name}</td>
                <td>{item.qty}</td>
                <td>{item.price}</td>
                <td>{item.price * item.qty}</td>
              </tr>
            </tbody>
          </React.Fragment>
        ))}
      </table>

      <div>
        <h2 className="flex items-end justify-end text-gray-800 text-4xl font-bold">
          Total. {totalPrice}
        </h2>
      </div>
    </>
  )
}
