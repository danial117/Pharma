import { createContext, useEffect, useRef, useState } from 'react'

export const State = createContext()

export default function StateContext({ children }) {
  const [clientName, setClientName] = useState('')
  const [clientAddress, setClientAddress] = useState('')
  const [clientPhone, setClientPhone] = useState('')
  const [invoiceNumber, setInvoiceNumber] = useState('')
  const [invoiceDate, setInvoiceDate] = useState('')
  const [width] = useState(641)

  const componentRef = useRef()

  const handlePrint = () => {
    window.print()
  }

  useEffect(() => {
    if (window.innerWidth < width) {
      alert('Place your phone in landscape mode for the best experience')
    }
  }, [width])

  const context = {
    clientName,
    setClientName,
    clientAddress,
    setClientAddress,
    clientPhone,
    setClientPhone,
    invoiceNumber,
    setInvoiceNumber,
    invoiceDate,
    setInvoiceDate,
    width,
    componentRef,
    handlePrint,
  }

  return <State.Provider value={context}>{children}</State.Provider>
}
