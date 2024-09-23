import { useEffect,useState,useContext } from "react";
import { SearchRounded } from "@mui/icons-material";
import { CartContext } from "../cartContext/cartContext";
import { useMediaQuery } from "@mui/material";
import { addItemToCartAsync } from "../state";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {TruncateText} from '../utility functions/TranctuateText'
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../skeleton/skeleton";

const renderSkeletons = () => {
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


const MainPageProducts=()=>{
     const navigate=useNavigate()
    const [products,setProducts]=useState([]);

    const [select,setSelect]=useState(1)
    const [page,setPage]=useState(1)
    const isMobile = useMediaQuery('(max-width:1024px)');
    const dispatch=useDispatch()
    const { cart, toggleCart } = useContext(CartContext);
    const cartItems=useSelector((state)=>state.cartItems);
    const cartItemIds = cartItems.map(item => item._id);
     const [brands,setBrands]=useState([])
     const [search,setSearch]=useState(false)
     const [searchPage,setSearchPage]=useState(1)
    


    

   



     const RequestProducts=async()=>{

      
           await fetch(`${process.env.REACT_APP_API_URL}/products?page=${page}&limit=28`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{products.push(...result);setPage(page+1); })
    
           
        }
    
    





    
        const FetchProduct=async()=>{

         await  fetch(`${process.env.REACT_APP_API_URL}/products?page=${page}&limit=40`,{
             method:'GET'
            }).then((response)=>response.json()).then((result)=>{setProducts(result);  setPage(page+1)})
          
         
        
        
        
        
        }













         
         const { isLoading:isLoadingFetchProducts, isError, data, error } = useQuery({
            queryKey: ['product'],
             queryFn: FetchProduct,
             refetchOnWindowFocus: false
           })
         
          

          const {isLoading: isLoadingRequestProducts,refetch } = useQuery({
            queryKey: ['requestProducts'],
             queryFn: RequestProducts,
             enabled:false,
             refetchOnWindowFocus: false
           })
         
          console.log(isLoadingRequestProducts)



          const SearchProductByName=async()=>{

            if(search !== false)
          { 
            
            
             fetch(`${process.env.REACT_APP_API_URL}/products?type=${search}&page=${searchPage}&limit=16`,{
                method:'GET'
                 }).then((response)=>response.json()).then((result)=>{setProducts(result);    })
                }
         }












  


    
    

    

      
    



    return(

        <section className="bg-gray-200 md:max-lg:h-auto py-12 h-auto w-full">
        <div className="pt-6 xs:max-sm:w-[80%] mx-auto">
            <p className="text-center text-cyan-900 xs:max-sm:text-[1.4rem] font-Lexend font-bold text-[1.8rem] ">Pharma Medicines</p>
            <p className="text-center xs:max-sm:text-xs text-cyan-900 font-Livvic ">We have every kind of medicine you need in the everyday life.</p>
        </div>

       <div className="w-[30%] xs:max-lg:w-[60%] my-4 flex flex-row mx-auto">
           <div className="bg-white w-[80%] xs:max-sm:py-[10px] py-[18px] ">
            <input onChange={(e)=>{setSearch(e.target.value)}} placeholder="Search Product" type="text" className="text-gray-300 focus:outline-none ml-4 text-xs" />
           


           </div>
           <div className="text-white cursor-pointer bg-emerald-500 xs:max-sm:px-2 px-6 py-2">
            <SearchRounded onClick={SearchProductByName} style={{fontSize:isMobile?30 :40}} />
           </div>


       </div>




       
       <div className="w-[80%] xs:max-lg:w-[85%] mx-auto">
           <p className="font-Poppins text-cyan-900 text-[1.3rem] sm:max-lg:mt-14 sm:max-lg:text-[1rem] my-6">All Products:</p>

           <div className="flex flex-row gap-x-12 w-[100%] mx-auto">
         

            <div className="w-[100%] xs:max-sm:basis-[100%] basis-[100%] gap-x-4 gap-y-4 sm:max-lg:grid-cols-3 xs:max-sm:grid-cols-2  grid grid-cols-4">
                    
                    
        















      {isLoadingFetchProducts ? (
        renderSkeletons()
      ) : (
        (select === 1 ) &&
        products.map((data, index) => {
          const carted = cartItemIds.includes(data._id);

          return (
            <div key={index} className="flex gap-y-2 border-2 bg-white rounded-md border-emerald-500 flex-col">
              <div onClick={() => navigate(`/productPage/${data._id}`)} className="w-[90%] cursor-pointer sm:max-md:w-[100%] xs:max-sm:w-[100%] mt-6 border-b-2 pb-2 border-gray-200 mx-auto">
                <img className="w-[100px] h-[175px] mx-auto my-auto" src={`${process.env.REACT_APP_API_URL}/assets/products/md/${data.productImage.medium}`} alt="Product" />
              </div>
              <div className="m-2 relative h-[180px] flex flex-col">
                <p onClick={() => navigate(`/productPage/${data._id}`)} className="cursor-pointer font-Abel text-[12px] xs:max-sm:text-[10px] font-bold text-emerald-400 my-[2px]">{data.brand}</p>
                <TruncateText
                  text={data.name}
                  maxLength={30}
                  onClick={() => navigate(`/productPage/${data._id}`)}
                  className="font-Lexend cursor-pointer sm:max-md:text-[12px] xs:max-sm:text-[10px] text-gray-800"
                />
                <p className="font-Poppins xs:max-sm:text-[14px] text-gray-600">{data.options[0]?.option}</p>
                <div className="grid w-full absolute bottom-2 py-2 grid-cols-2 xs:max-sm:grid-cols-1 xs:max-sm:gap-y-2 gap-x-2">
                  <div className="bg-gray-200 xs:max-sm:py-[2px] sm:max-md:py-[2px] font-Abel py-2 xs:max-sm:text-[16px] text-[20px] rounded-md text-center">${data.options[0]?.price}</div>
                  {carted ? <div style={{ userSelect: 'none' }} onClick={toggleCart} className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">View in cart</div> : <div onClick={() => dispatch(addItemToCartAsync({ product: { ...data, option:{id: data.options[0].id,price:data.options[0].price} }, quantity: 1 }))} className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">Add to cart</div>}
                </div>
              </div>
            </div>
          );
        })
      )}

      {/* Conditionally render skeletons for requestProducts */}
      {isLoadingRequestProducts && renderSkeletons()}
    















                   
                    
                   














            </div>


           </div>








           <div onClick={refetch} className="border-2 ml-[34%] cursor-pointer xs:max-sm:mx-auto xs:max-sm:w-[50%]  sm:max-md:w-[30%] sm:max-md:ml-[36%] py-2   w-[20%] mt-6 border-emerald-500  rounded-md">
                <p className="font-Abel text-center text-emerald-500">Show all Products</p>
            </div>





       </div>
      



    </section>

    )
}


export default MainPageProducts





