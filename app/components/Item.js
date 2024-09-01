import ItemRows from './ItemRows'

export default function Item() {
  return (
    <div className="container mx-auto px-4 sm:px-8">
      <div className="py-8">
        <div className="flex flex-col justify-center items-start mb-4"></div>
        <div className="flex justify-center mb-5">
          <h2 className="text-2xl font-semibold leading-tight text-white underline">
            Products
          </h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead className="bg-gray-300">
                <tr>
                  <th className="px-5 py-3 text-center">ID</th>
                  <th className="px-5 py-3 text-center">Name</th>
                  <th className="px-5 py-3 text-center">Price</th>
                  <th className="px-5 py-3 text-center">Quantity</th>
                  <th className="px-5 py-3 text-center">Total</th>
                  <th className="px-5 py-3 text-center">Add</th>
                </tr>
              </thead>
              <>
                <ItemRows />
              </>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
