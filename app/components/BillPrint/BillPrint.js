'use client'
import { useContext } from 'react'
import ClientDetails from './ClientDetails'
import Dates from './Dates'
import Footer from './Footer'
import Header from './Header'
import MainDetails from './MainDetails'
import Notes from './Notes'
import Table from './Table'
import ReactToPrint from 'react-to-print'
import { State } from '../../../context/stateContext'

function BillPrint() {
  const {
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
    componentRef,
  } = useContext(State)

  const handleClientPhoneChange = (e) => {
    const phone = e.target.value
    // Regular expression to allow numbers with spaces (e.g., "0300 6025 047")
    const phoneRegex = /^[0-9\s]*$/

    if (phoneRegex.test(phone)) {
      setClientPhone(phone)
    } else {
      alert('Please enter a valid phone number in the format "0300 6025 047"')
    }
  }

  return (
    <>
      <main
        className="m-5 p-5 xl:grid grid-row-2 gap-10 items-center"
        style={{
          maxWidth: '1920px',
          margin: 'auto',
        }}
      >
        <section>
          <div className="bg-white p-5 rounded shadow">
            <div className="flex flex-col justify-center">
              <article className="md:grid grid-cols-3 gap-10 md:mt-5">
                <div className="flex flex-col">
                  <label htmlFor="clientName">
                    Enter your client&apos;s name
                  </label>
                  <input
                    type="text"
                    name="clientName"
                    id="clientName"
                    placeholder="Enter your client's name"
                    maxLength={56}
                    autoComplete="off"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="clientAddress">
                    Enter your client&apos;s address
                  </label>
                  <input
                    type="text"
                    name="clientAddress"
                    id="clientAddress"
                    placeholder="Enter your client's address"
                    maxLength={96}
                    autoComplete="off"
                    value={clientAddress}
                    onChange={(e) => setClientAddress(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="clientPhone">Client&apos;s Phone</label>
                  <input
                    type="text"
                    name="clientPhone"
                    id="clientPhone"
                    placeholder="Enter client's Phone"
                    maxLength={56}
                    autoComplete="off"
                    value={clientPhone}
                    onChange={handleClientPhoneChange}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceNumber">Invoice Number</label>
                  <input
                    type="text"
                    name="invoiceNumber"
                    id="invoiceNumber"
                    placeholder="Invoice Number"
                    autoComplete="off"
                    value={invoiceNumber}
                    onChange={(e) => setInvoiceNumber(e.target.value)}
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="invoiceDate">Invoice Date</label>
                  <input
                    type="date"
                    name="invoiceDate"
                    id="invoiceDate"
                    placeholder="Invoice Date"
                    autoComplete="off"
                    value={invoiceDate}
                    onChange={(e) => setInvoiceDate(e.target.value)}
                  />
                </div>
              </article>
            </div>
          </div>
        </section>

        {/* Invoice Preview */}
        <div className="invoice__preview bg-white p-5 rounded-2xl border-4 border-blue-200">
          <ReactToPrint
            trigger={() => (
              <button className="bg-blue-500 ml-5 text-white font-bold py-2 px-8 rounded hover:bg-blue-600 hover:text-white transition-all duration-150 hover:ring-4 hover:ring-blue-400">
                Print / Download
              </button>
            )}
            content={() => componentRef.current}
          />
          <div ref={componentRef} className="p-5">
            <Header />

            <MainDetails />

            <ClientDetails />

            <Dates />

            <Table />

            <Notes />

            <Footer />
          </div>
        </div>
      </main>
    </>
  )
}

export default BillPrint
