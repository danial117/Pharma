import { createContext, useEffect, useRef, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import collect from 'collect.js'

export const State = createContext()

export default function StateContext({ children }) {
  const [userDetails, setUserDetails] = useState({
    name: '',
    address: '',
    email: '',
    phone: '',
    bankName: '',
    bankAccount: '',
    website: '',
  })

  const [clientDetails, setClientDetails] = useState({
    clientName: '',
    clientAddress: '',
    clientPhone: '',
  })

  const [invoiceDetails, setInvoiceDetails] = useState({
    invoiceNumber: '',
    invoiceDate: '',
    dueDate: '',
    notes: '',
  })

  const [invoiceItem, setInvoiceItem] = useState({
    description: '',
    quantity: '',
    price: '',
    amount: '',
  })

  const [list, setList] = useState([])
  const [total, setTotal] = useState(0)
  const [width] = useState(641)
  const [isEditing, setIsEditing] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const componentRef = useRef()

  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience')
    }
  }, [width])

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault()
      const { description, quantity, price } = invoiceItem

      if (!description || !quantity || !price) {
        toast.error('Please fill in all inputs')
      } else {
        setList((prevList) => [
          ...prevList,
          { ...invoiceItem, amount: quantity * price },
        ])
        setInvoiceItem({ description: '', quantity: '', price: '', amount: '' })
        setIsEditing(false)
      }
    },
    [invoiceItem]
  )

  useEffect(() => {
    setInvoiceItem((prev) => ({
      ...prev,
      amount: prev.quantity * prev.price,
    }))
  }, [invoiceItem.quantity, invoiceItem.price])

  const calculateTotal = useCallback(() => {
    const allItems = list.map((item) => item.price)
    setTotal(collect(allItems).sum())
  }, [list])

  useEffect(() => {
    calculateTotal()
  }, [list, calculateTotal])

  const editRow = useCallback(
    (id) => {
      const editingRow = list.find((row) => row.id === id)
      setList(list.filter((row) => row.id !== id))
      setIsEditing(true)
      setInvoiceItem(editingRow)
    },
    [list]
  )

  const deleteRow = useCallback(
    (id) => {
      setList(list.filter((row) => row.id !== id))
      setShowModal(false)
    },
    [list]
  )

  const context = {
    userDetails,
    setUserDetails,
    clientDetails,
    setClientDetails,
    invoiceDetails,
    setInvoiceDetails,
    invoiceItem,
    setInvoiceItem,
    list,
    setList,
    total,
    setTotal,
    width,
    componentRef,
    handleSubmit,
    handlePrint,
    isEditing,
    setIsEditing,
    showModal,
    setShowModal,
    editRow,
    deleteRow,
    showLogoutModal,
    setShowLogoutModal,
  }

  return <State.Provider value={context}>{children}</State.Provider>
}
