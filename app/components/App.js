'use client'
import { useEffect } from 'react'
import CartSidebar from './CartSidebar'
import { useDispatch } from 'react-redux'
import Header from './Header'
import { hideLoading } from '../../redux/slices/cartSlice'
import { usePathname } from 'next/navigation'

export default function App({ children }) {
  const pathname = usePathname()

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(hideLoading())
  }, [dispatch])

  const isAdminRoute = pathname.startsWith('/admin')

  return (
    <div>
      <div className="w-screen h-screen bg-gray-700">
        <Header />
        <main className="p-4 mr-32">{children}</main>
      </div>
      {isAdminRoute && <CartSidebar />}
    </div>
  )
}
