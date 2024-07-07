
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useState } from "react"
import { useEffect } from "react"
import { useDispatch,useSelector } from "react-redux"
import { addItemToCartAsync } from "../state"
import { useNavigate } from "react-router-dom"
import { useParams } from "react-router-dom"
import { useContext } from "react"
import { CartContext } from "../cartContext/cartContext"


const BrandPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {brandId}=useParams();
    const cartItems = useSelector((state) => state.cartItems);
    const cartItemIds = cartItems.map(item => item._id);
    const [products,setProducts]=useState([])
    const { cart, toggleCart } = useContext(CartContext);


    useEffect(()=>{

        fetch(`/api/brands/${brandId}`,{method:'GET'}).then((response)=>response.json()).then((data)=>{
          setProducts(data)
        })

    },[])
  
    return (
      <>
        <NavBar />
  
        <div className="container w-full flex flex-col mx-auto p-4 pb-24">
            <p className="font-Abel py-6 text-[1.7rem]">Brand Results:</p>
          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((data, index) => {
              const carted = cartItemIds.includes(data._id);
  
              return (
                <div key={index} className="flex gap-y-2 border-2 bg-white rounded-md border-emerald-500 flex-col">
                  <div className="w-[90%] sm:max-md:w-[100%] xs:max-sm:w-[100%] mt-6 border-b-2 pb-2 border-gray-200 mx-auto">
                    <img className="w-[50%] h-[100%] mx-auto my-auto" src={`/api/assets/images/${data.productImage}`} alt={data.name} />
                  </div>
                  <div className="m-2 relative h-[180px] flex flex-col">
                    <p className="font-Abel text-[12px] xs:max-sm:text-[10px] font-bold text-emerald-400 my-[2px]">{data.brand}</p>
                    <p onClick={() => { navigate(`/productPage/${data._id}`) }} className="font-Lexend cursor-pointer xs:max-sm:text-[10px] text-gray-800">{data.name}</p>
                    <p className="font-Poppins xs:max-sm:text-[14px] text-gray-600">150 Grams</p>
                    <div className="grid w-full absolute bottom-2 py-2 grid-cols-2 xs:max-sm:grid-cols-1 xs:max-sm:gap-y-2 gap-x-2">
                      <div className="bg-gray-200 xs:max-sm:py-[2px] sm:max-md:py-[2px] font-Abel py-2 xs:max-sm:text-[16px] text-[20px] rounded-md text-center">${data.price}</div>
                      {carted
                        ? <div onClick={toggleCart} style={{ userSelect: 'none' }} className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">View in cart</div>
                        : <div onClick={() => dispatch(addItemToCartAsync({ product: data, quantity: 1 }))} className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">Add to cart</div>}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
  
        <Footer />
      </>
    );
  };
  
  export default BrandPage;