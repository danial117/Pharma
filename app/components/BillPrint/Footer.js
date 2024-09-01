import { bankData } from '../../../utils/data'

export default function Footer() {
  return (
    <>
      <footer className="footer border-t-2 border-gray-300 pt-5">
        <ul className="flex flex-wrap items-center justify-center">
          <li className=" mr-2">
            <span className="font-bold">Email: </span>
            samarbookdepot@gmail.com
            <br />
          </li>
          <li className=" mr-2">
            <span className="font-bold">Phone number: </span>
            +92 300 7242 408
          </li>
        </ul>
        {bankData.map(({ id, name, holder, number }) => (
          <ul
            className="flex flex-wrap items-center justify-center mt-2"
            key={id}
          >
            <li className=" mr-2">
              <span className="font-bold">Bank: </span>
              {name}
            </li>
            <li className=" mr-2">
              <span className="font-bold">Account holder: </span>
              {holder} <br />
            </li>
            <li className=" mr-2">
              <span className="font-bold"> Account number: </span>
              {number}
            </li>
          </ul>
        ))}
      </footer>

      <p className="text-center px-5 mt-8 text-xs ">
        Built by Hassan Zohaib 0310 6025 047
      </p>
    </>
  )
}
