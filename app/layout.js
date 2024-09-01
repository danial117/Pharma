import { Inter } from 'next/font/google'
import './globals.css'
import ChildLayout from './admin/Layout/ChildLayout'
import AuthProvider from './auth/Provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Samar Book Depot Billing App',
  description: 'Created by Hassan Zohaib.',
}

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang="en">
        <body className={inter.className}>
          <ChildLayout>{children}</ChildLayout>
        </body>
      </html>
    </AuthProvider>
  )
}
