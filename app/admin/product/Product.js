'use client'
import { useState, useRef } from 'react'
import { PackageOpen, Send, X } from 'lucide-react'
import Item from '../../components/Item'

export default function Product() {
  const [show, setShow] = useState(false)

  return (
    <div className="container mx-auto px-4 sm:px-8">
      <button className="primary-button" onClick={() => setShow(!show)}>
        <PackageOpen />
        Add Products
      </button>
      {show && <NewProductModal show={show} setShow={setShow} />}
      <Item />
    </div>
  )
}

const NewProductModal = ({ show, setShow }) => {
  // post form data
  const formRef = useRef(null)

  async function onSubmit(event) {
    event.preventDefault()

    if (!formRef.current) return

    const formData = new FormData(formRef.current)

    try {
      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData,
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      // Handle response if necessary
      const data = await response.json()
      console.log('====================================')
      console.log(data)
      console.log('====================================')

      // Reset form fields
      formRef.current.reset()
    } catch (error) {
      console.error('Error during form submission:', error)
    }
  }

  function showHandler() {
    setShow(!show)
    window.location.reload()
  }

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 overflow-y-auto h-full w-full flex items-center justify-center">
      <div className="p-8 border w-96 shadow-lg rounded-md bg-gray-400">
        <div className="flex flex-row justify-end mb-4">
          <button onClick={showHandler}>
            <X className="text-gray-700 hover:text-red-800" />
          </button>
        </div>
        <div className="flex flex-row justify-center mb-4">
          <div className="text-xl font-semibold">Add Products</div>
        </div>
        <form
          className="flex flex-col space-y-3"
          onSubmit={onSubmit}
          ref={formRef}
        >
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Name"
            className="pl-2 py-2 rounded-md border border-gray-300 focus:bg-gray-700 focus:text-white"
          />
          <label>Price</label>
          <input
            type="number"
            name="price"
            placeholder="Price"
            className="pl-2 py-2 rounded-md border border-gray-300 focus:bg-gray-700 focus:text-white"
          />
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            placeholder="Quantity"
            className="pl-2 py-2 rounded-md border border-gray-300 focus:bg-gray-700 focus:text-white"
          />
          <label>Rate</label>
          <input
            type="number"
            name="rate"
            placeholder="Rate"
            className="pl-2 py-2 rounded-md border border-gray-300 focus:bg-gray-700 focus:text-white"
          />
          <button
            type="submit"
            className="text-white bg-gray-700 px-6 py-4 flex flex-row justify-center hover:bg-gray-900"
          >
            <Send />
            <div className="ml-2">Submit</div>
          </button>
        </form>
      </div>
    </div>
  )
}
