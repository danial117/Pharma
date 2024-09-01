import Image from 'next/image'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="flex flex-row justify-center">
      <div className="mt-32">
        <Image
          src="/logo_transparent.png"
          alt="Hero Image"
          width={200}
          height={200}
          className="ml-10"
        />
        <div className="mb-10 items-center">
          <h1 className="text-xl font-bold  text-white">
            Samar Book Depot Billing App
          </h1>
        </div>
        <div className="items-center">
          <Link
            href="/login"
            className=" text-white bg-gray-800 px-8 py-4 flex flex-row justify-center hover:bg-black text-center text-2xl"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
