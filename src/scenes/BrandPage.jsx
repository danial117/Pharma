
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
import Skeleton from "../skeleton/skeleton"
import { useQuery } from "@tanstack/react-query"
import { Inventory2Rounded,SearchRounded } from "@mui/icons-material"

const RenderSkeletons = () => {
  return [1, 2, 3, 4, 5, 6].map((index) => (
    <div key={index} className="flex gap-y-[4px] border-2 bg-white rounded-md border-emerald-500 flex-col">
      <div className="w-[90%] h-[150px] cursor-pointer sm:max-md:w-[100%] xs:max-sm:w-[100%] mt-2 border-b-2 border-gray-200 mx-auto">
        {/* Skeleton for image */}
        <Skeleton />
      </div>
      <div className="mt-[5px] relative w-[90%] mx-auto h-[30px] flex flex-col">
        {/* Skeleton for brand */}
        <Skeleton />
      </div>
      <div className="m-2 relative w-[90%] mx-auto h-[120px] flex flex-col">
        {/* Skeleton for description or other data */}
        <Skeleton />
      </div>
    </div>
  ));
};



const BrandPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {brandName}=useParams();
    const [page,setPage]=useState(1)
    
    const cartItems = useSelector((state) => state.cartItems);
    const cartItemIds = cartItems.map(item => item._id);
    const [products,setProducts]=useState([])
    const { cart, toggleCart } = useContext(CartContext);
    const [search,setSearch]=useState('')
    const brand=encodeURIComponent(brandName.replace('/','-'))
  




    const FetchBrands=async()=>{
      
      await  fetch(`${process.env.REACT_APP_API_URL}/brands/name/${brand}?page=${page}&limit=16`,{
          method:'GET'
         }).then((response)=>response.json()).then((result)=>{products.push(...result);  setPage(page+1)})
     }





    






    const { isLoading,refetch } = useQuery({
      queryKey: ['brand'],
       queryFn: FetchBrands,
       refetchOnWindowFocus: false
     })

 
     
     


     const SearchProductByName=async()=>{

      if(search)
    { 
      
    
    await  fetch(`${process.env.REACT_APP_API_URL}/products?productName=${search}&brand=${brand}&limit=16`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{setProducts(result);    })
  }else{
   
    
   
      await  fetch(`${process.env.REACT_APP_API_URL}/brands/name/${brand}?page=1&limit=16`,{
        method:'GET'
       }).then((response)=>response.json()).then((result)=>{setProducts(result);  setPage(page+1)})
  
     }
    }


     const { isLoading:isLoadingSearchProducts,refetch:refetchSearch } = useQuery({
      queryKey: ['brand'],
       queryFn: SearchProductByName,
       refetchOnWindowFocus: false,
       enabled: false
     })


    
  
    return (
      <>
        <NavBar />

      
  <div className="w-full h-auto bg-gray-200">
        <div className="container w-full flex flex-col mx-auto p-4 pb-24">


            
        <div className="flex w-[40%] xs:max-lg:w-[100%] mx-auto flex-row">
        <div className="w-full   flex flex-row xs:max-sm:py-2 py-4 bg-white">
         
            <div className="mx-2 xs:max-sm:mx-[4px] my-auto text-emerald-600">
              <Inventory2Rounded />
            </div>
            <input
              placeholder="Search your products"
              className="w-[70%] xs:max-sm:w-[70%] ml-2  text-md focus:outline-none"
              type="text"
              name="product"
              value={search}
              onChange={(e)=>{setSearch(e.target.value)}}
              
            />
          </div>
         
       
        <div onClick={refetchSearch}  className="py-2 px-6 xs:max-sm:px-2 text-white bg-emerald-500">
          <SearchRounded onClick={SearchProductByName} style={{ fontSize: 40, cursor: 'pointer' }} />
        </div>
      </div>




            <p className="font-Abel py-6 text-[1.7rem]">Results:</p>
          <div className="grid w-full grid-cols-1 md:grid-cols-3 gap-6">

          {!isLoadingSearchProducts ? (
      Array.isArray(products) && products.map((data, index) => {
        const carted = cartItemIds.includes(data._id);

        return (
          <div key={index} className="flex gap-y-2 border-2 bg-white rounded-md border-emerald-500 flex-col">
            {/* Product Image */}
            <div
              onClick={() => navigate(`/productPage/${data._id}`)}
              className="w-[90%] cursor-pointer sm:max-md:w-[100%] xs:max-sm:w-[100%] mt-6 border-b-2 pb-2 border-gray-200 mx-auto"
            >
              <img
                className="w-[50%] h-[200px] mx-auto"
                src={`${process.env.REACT_APP_API_URL}/assets/products/md/${data?.productImage?.medium ?? '404.jpeg'}`}
                alt={data.name}
              />
            </div>

            {/* Product Details */}
            <div className="m-2 relative h-[180px] flex flex-col">
              <p className="font-Abel text-[12px] xs:max-sm:text-[10px] font-bold text-emerald-400 my-[2px]">
                {data?.brand}
              </p>
              <p
                onClick={() => navigate(`/productPage/${data._id}`)}
                className="font-Lexend cursor-pointer xs:max-sm:text-[10px] text-gray-800"
              >
                {data.name}
              </p>
              <p className="font-Poppins xs:max-sm:text-[14px] text-gray-600">
                {data?.options[0]?.option}
              </p>
              <div className="grid w-full absolute bottom-2 py-2 grid-cols-2 xs:max-sm:grid-cols-1 xs:max-sm:gap-y-2 gap-x-2">
                <div className="bg-gray-200 xs:max-sm:py-[2px] sm:max-md:py-[2px] font-Abel py-2 xs:max-sm:text-[16px] text-[20px] rounded-md text-center">
                  ${data.options[0].price}
                </div>
                {carted ? (
                  <div
                    onClick={toggleCart}
                    style={{ userSelect: 'none' }}
                    className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300"
                  >
                    View in cart
                  </div>
                ) : (
                  <div
                    onClick={() => dispatch(addItemToCartAsync({ product: { ...data, option: { id: data.options[0].id, price: data.options[0].price } } }))}
                    className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300"
                  >
                    Add to cart
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <RenderSkeletons />
    )}




{(isLoading ||  isLoadingSearchProducts) &&
  <RenderSkeletons /> // Capitalized to make it a valid React component
}

          </div>
          <div onClick={refetch} className="border-2 mx-auto cursor-pointer  xs:max-sm:w-[80%]  sm:max-md:w-[30%] py-4   w-[20%] mt-24 border-emerald-500  rounded-md">
                <p className="font-Abel text-center text-emerald-500">Show all Products</p>
            </div>

        </div>


        </div>
  
        <Footer />
      </>
    );
  };
  
  export default BrandPage;