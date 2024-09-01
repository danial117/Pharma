import Image from 'next/image'

export default function MainDetails() {
  return (
    <>
      <section className="flex flex-col items-end justify-end">
        <div className="flex flex-row">
          <Image
            src="/logo_transparent.png"
            width={100}
            height={100}
            alt="Logo"
          />
          <h2 className="font-bold text-3xl uppercase mt-6 mb-1">
            Samar Book Depot.
          </h2>
        </div>
        <p>15 km sargodha sillanwali Road Shaeenabad </p>
      </section>
    </>
  )
}
