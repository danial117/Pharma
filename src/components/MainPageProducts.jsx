import { useEffect,useState,useContext } from "react";
import { SearchRounded } from "@mui/icons-material";
import { CartContext } from "../cartContext/cartContext";
import { useMediaQuery } from "@mui/material";
import { addItemToCartAsync } from "../state";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {TruncateText} from '../utility functions/TranctuateText'







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


    

     const SearchProductByName=()=>{
        if(search !== false)
      { 
        
        
         fetch(`/api/products?type=${search}&page=${searchPage}&limit=6`,{
            method:'GET'
             }).then((response)=>response.json()).then((result)=>{setProducts(result); setSelect(5);   })
            }
     }







    useEffect(()=>{

  if(select === 1){
   
  

   fetch(`/api/products?page=${page}&limit=6`,{
    method:'GET'
   }).then((response)=>response.json()).then((result)=>{setProducts(result);  setPage(page+1)})
}
   else if(select ===2){
    fetch(`/api/brands?page=${page}&limit=6`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{setBrands(result);setPage(page+1);})
   }

   else if(select ===3){
    fetch(`/api/products?type=skin&&page=${page}&limit=6`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{setProducts(result);setPage(page+1); })
   }

   else if(select ===4){
    fetch(`/api/products?type=oral&&page=${page}&limit=6`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{setProducts(result);setPage(page+1); })
   }


    },[select])


    const RequestProducts=()=>{

    if(select ===1){
        fetch(`/api/products?page=${page}&limit=6`,{
    method:'GET'
     }).then((response)=>response.json()).then((result)=>{products.push(...result);setPage(page+1); })

}  else if(select ===2){
    fetch(`/api/brands?page=${page}&limit=6`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{setBrands(result);setPage(page+1); })
   }

   else if(select ===3){
    fetch(`/api/products?type=skin&&page=${page}&limit=6`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{setProducts(result);setPage(page+1); })
   }

   else if(select ===4){
    fetch(`/api/products?type=oral&&page=${page}&limit=6`,{
        method:'GET'
         }).then((response)=>response.json()).then((result)=>{setProducts(result);setPage(page+1); })
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
           <p className="font-Poppins text-cyan-900 text-[1.3rem] sm:max-lg:mt-14 sm:max-lg:text-[1rem] my-6">Product Category</p>

           <div className="flex flex-row gap-x-12 w-[100%] mx-auto">
            <div className="w-[100%] xs:max-sm:hidden basis-[30%]">
                <div className="flex gap-y-2 flex-col">
                    <div onClick={()=>{setSelect(1); setPage(1)}} className={`pl-6 cursor-pointer sm:max-md:pl-2 md:max-lg:text-sm sm:max-md:text-[10px]  rounded-md ${select===1 ? 'bg-emerald-500 text-white' :'bg-white text-cyan-900'} text-[16px] font-Livvic  w-full py-4`}>All pharmacutical medicines</div>
                    <div onClick={()=>{ setSelect(2); setPage(1); }} className={`pl-6  cursor-pointer sm:max-md:pl-2 md:max-lg:text-sm sm:max-md:text-[10px]  rounded-md  text-[16px] ${select===2 ? 'bg-emerald-500 text-white' :'bg-white text-cyan-900'} font-Livvic  w-full py-4`}>Brands</div>
                    <div onClick={()=>{setSelect(3); setPage(1);}} className={`pl-6  cursor-pointer sm:max-md:pl-2 md:max-lg:text-sm sm:max-md:text-[10px]  rounded-md text-[16px] ${select===3 ? 'bg-emerald-500 text-white' :'bg-white text-cyan-900'} font-Livvic  w-full py-4`}>Skin care medications</div>
                    <div  onClick={()=>{setSelect(4); setPage(1);}} className={`pl-6 cursor-pointer  sm:max-md:pl-2 md:max-lg:text-sm sm:max-md:text-[10px]  rounded-md  text-[16px] ${select===4 ? 'bg-emerald-500 text-white' :'bg-white text-cyan-900'} font-Livvic  w-full py-4`}>Oral health medications</div>

                </div>


            </div>

            <div className="w-[100%] xs:max-sm:basis-[100%] basis-[70%] gap-x-4 gap-y-4 sm:max-lg:grid-cols-2 xs:max-sm:grid-cols-2  grid grid-cols-3">
                    
                    
                    
                    
                    
                    
                    
           {  
           select===2 && 
           brands.map((data,index)=>{

            return(
                <div onClick={()=>{window.location.href=`/brand/${data._id}`}} key={index} className="w-[100%] cursor-pointer mx-auto">

                <img className="h-[150px]" src={data.logoUrl}  />


            </div>

            )
           })      
                    
           

         }














                  {  
                  (select === 1 || select === 3 || select === 4 || select ===5) &&
                   products.map((data,index)=>{
                     const carted=cartItemIds.includes(data._id)
                    
                    return(   

                   
                    
                    <div key={index} className="flex  gap-y-2 border-2 bg-white rounded-md border-emerald-500 flex-col">
                        <div className=" w-[90%] sm:max-md:w-[100%] xs:max-sm:w-[100%] mt-6 border-b-2 pb-2 border-gray-200  mx-auto">
                            <img className="w-[50%] h-[100%] mx-auto my-auto" src={`/api/assets/images/${data.productImage}`}/>

                        </div>
                        <div className="m-2 relative h-[180px] flex flex-col ">
                        <p className="font-Abel text-[12px] xs:max-sm:text-[10px] font-bold text-emerald-400 my-[2px]">{data.brand}</p>
                       
                        <TruncateText 
                         text={data.name}
                         maxLength={30}
                         onClick={()=>{navigate(`/productPage/${data._id}`)}}
                         className="font-Lexend cursor-pointer sm:max-md:text-[12px] xs:max-sm:text-[10px] text-gray-800"
                   />
                        <p className="font-Poppins xs:max-sm:text-[14px] text-gray-600">{data.options}</p>
                        <div  className="grid w-full absolute bottom-2 py-2 grid-cols-2 xs:max-sm:grid-cols-1 xs:max-sm:gap-y-2 gap-x-2 ">
                            <div className="bg-gray-200 xs:max-sm:py-[2px] sm:max-md:py-[2px] font-Abel py-2 xs:max-sm:text-[16px] text-[20px] rounded-md text-center">${data.price}</div>
                           {carted ?   <div style={{userSelect:'none'}} onClick={toggleCart}  className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">View in cart</div>      : <div onClick={()=>dispatch(addItemToCartAsync({product:data,quantity:1}))}  className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">Add to cart</div>}
                        </div>
                        </div>


                    </div>
                    
                )})  
                    }














                   
                    
                   














            </div>


           </div>








           <div onClick={RequestProducts} className="border-2 ml-[34%] cursor-pointer xs:max-sm:mx-auto xs:max-sm:w-[50%]  sm:max-md:w-[30%] sm:max-md:ml-[36%] py-2   w-[20%] mt-6 border-emerald-500  rounded-md">
                <p className="font-Abel text-center text-emerald-500">Show all Products</p>
            </div>





       </div>
      



    </section>

    )
}


export default MainPageProducts





