'use client'
import { LogIn } from 'lucide-react'
import { signIn } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function Login() {
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const response = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    })
    if (response.error) {
      console.log('Invalid email or password. Please try again.') // Set an appropriate error message
    } else {
      router.push('/admin/product')
    }
  }
  return (
    <main>
      <div className="flex items-center min-h-screen lg:justify-center">
        <div className="flex flex-col overflow-hidden bg-white rounded-md shadow-lg max md:flex-row md:flex-1 lg:max-w-screen-md">
          <div className="p-4 py-2 text-white bg-cyan-900 shadow-[rgba(0,0,0,0.25)_0px_54px_55px,rgba(0,0,0,0.12)_0px_-12px_30px,rgba(0,0,0,0.12)_0px_4px_6px,rgba(0,0,0,0.17)_0px_12px_13px,rgba(0,0,0,0.09)_0px_-3px_5px] md:w-80 md:flex-shrink-0 md:flex md:flex-col md:items-center md:justify-evenly">
            <div className="my-3 font-bold tracking-wider text-center">
              <Image
                src="/logo_transparent.png"
                alt="Logo"
                width={280}
                height={300}
                className="mix-blend-hard-light"
              />
              {/* <h1 className="flex align-middle text-3xl">Samar Book Depo</h1> */}
              {/* <h3 className="flex justify-center text-lg">Billing App</h3> */}
              <h3 className="flex justify-center">Created By</h3>
              <h1 className="flex justify-center text-lg">Hassan Zohaib</h1>
              <div className="flex flex-row justify-center mt-2">
                <h2 className="flex justify-center text-md">Contact</h2>
                <h2 className="flex justify-center text-md ml-3">
                  +92 310 6025 047
                </h2>
              </div>
            </div>
            <p className="mt-6 font-normal text-center text-gray-300 md:mt-0"></p>
          </div>
          <div className="p-5 bg-gray-400 md:flex-1">
            <h3 className="my-4 text-2xl font-semibold text-gray-700 text-center">
              Account Login
            </h3>
            <form className="flex flex-col space-y-5" onSubmit={handleSubmit}>
              <div className="flex flex-col space-y-1">
                <label className="text-sm font-semibold text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="john@gmail.com"
                  autoFocus
                  className="focus:bg-gray-700 focus:text-white px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex flex-col space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-semibold text-gray-700">
                    Password
                  </label>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="*******"
                  className="focus:bg-gray-700 focus:text-white px-4 py-2 transition duration-300 border border-gray-300 rounded focus:border-transparent focus:outline-none focus:ring-4 focus:ring-blue-200"
                />
              </div>
              <div className="flex items-center space-x-2"></div>
              <div>
                <button
                  type="submit"
                  className="w-full primary-button text-xl font-bold flex flex-row"
                >
                  <LogIn />
                  <div className="ml-3">Log in</div>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}
