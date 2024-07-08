import { ProductionQuantityLimits } from "@mui/icons-material"
import { useState,useEffect,useContext } from "react";
import { KeyboardArrowDownRounded,KeyboardArrowUpRounded,Add,Remove } from "@mui/icons-material";
import NavBar from './NavBar'
import Footer from './Footer'
import SimiliarProducts from "../widget/SimiliarProducts";
import {useParams} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {  addItemToCartAsync } from "../state";
import { CartContext } from "../cartContext/cartContext";
import Cart from "../widget/Cart";
import Skeleton from "../skeleton/skeleton";
import {useQuery} from '@tanstack/react-query'
import {TruncateText} from '../utility functions/TranctuateText'










const ProductPage=()=>{
     const [productDescription,setProductDescription]=useState(false)
     const dispatch=useDispatch()
     const [product,setProduct]=useState(false)
     const { cart, toggleCart } = useContext(CartContext);
     const [quantity,setQuantity]=useState(1)
     const cartItems=useSelector((state)=>state.cartItems)
     const {productId}=useParams();
     const [carted,setCarted] = useState(false);


     const fetchProduct=async ()=>{
       await fetch(`/api/products/id/${productId}`,{
            method:'GET'
        }).then((response)=>response.json()).then((data)=>{setProduct(data); })
    }
       

     const { isLoading, isError, data, error } = useQuery({
        queryKey: [productId],
        queryFn: fetchProduct,
      })

   
    


 
   
    
   

    const handleAddToCart = () => {
        const productToDispatch = {
          name: product.name,
          price: product.price,
          productImage: product.productImage,
          _id: product._id,
        };
    
        dispatch(addItemToCartAsync({ product: productToDispatch, quantity }));
      };


    useEffect(()=>{ 
        
        const foundItem = cartItems.find(item => item._id == productId);
     
if (foundItem) {
  
   setCarted(true)
} else {
 
 setCarted(false)
}

    },[cartItems])







    return(

        <>
        <NavBar />

      
      
      <div  className="h-[auto] my-4">
            <div className="flex flex-row xs:max-md:grid xs:max-md:grid-cols-1">
                <div className="basis-[40%]">

                    <div className="border-2 w-[80%] flex mx-auto h-[500px] border-gray-300 rounded-md">
                        
                    {isLoading ? 
        <div className="w-full h-full">
          <Skeleton />
          </div>
        : 
          <img
            className="w-[60%]  h-[350px] mx-auto my-auto"
            src={`/api/assets/images/${product.productImage}`}
            alt={product.name}
          />
        }

                    </div>



                    

                </div>

                <div className="basis-[30%] xs:max-md:w-[80%]   flex flex-col gap-y-2 mx-auto"> 
                { isLoading ?
                <div className="h-[50px]">
                <Skeleton/>
                </div>
                
                :
                <>
               
                <TruncateText 
                         text={product.name}
                         maxLength={50}
                         className="font-Abel text-[2rem] xs:max-md:text-[1.4rem] font-bold"
                   />

               
                <TruncateText 
                         text={product.brand}
                         maxLength={30}
                         className="font-Lexend underline text-emerald-700"
                   />
                </>
}
               
                   {
                    isLoading ?
                    <div className="h-[30px]">
                        <Skeleton />
                        </div>
                        :
                    
                    <div className="flex mt-4 mb-8 flex-row">
                   {
                    product.details.DietaryRestrictions.map((data,index)=>{

                        return(
                            <p className="font-Lexend bg-gray-100 mx-2 px-[4px]">{data}</p>
                        )
                    })
                   }
                   
                    </div>
                    
                    }
                

                <p className="font-Abel font-bold text-md">Select options:</p>

              

                {

                isLoading ?
                <div className="h-[50px] overflow-hidden w-[30%] rounded-full ">
                  <Skeleton />
                </div>
                
                :
                <div className="px-4 py-2 border-2 border-black md:max-lg:w-[40%] sm:max-md:w-[30%] xs:max-sm:w-[40%] w-[30%] rounded-full bg-gray-100">
                <p className="font-Abel  ">{product.options}</p>
                </div>
                
                 }



                  <div className="flex flex-row gap-x-4">
                <div className="grid grid-cols-3 gap-x-2  my-4  border-[1px] border-blue-900 rounded-md md:max-lg:w-[50%] sm:max-md:w-[30%] xs:max-sm:w-[40%]  w-[35%]">
                    <div onClick={()=>{if(quantity>1){setQuantity(quantity-1)}}} className="text-blue-900    cursor-pointer p-2 bg-gray-300"><Remove style={{fontSize:20}}/></div>
                    <p className="p-2 mx-auto">{quantity}</p>
                    <div onClick={()=>{setQuantity(quantity+1)}} className="text-blue-900 mx-auto cursor-pointer p-2"><Add style={{fontSize:20}}/></div>
                      

                </div>

                   { 
                   isLoading ?
                   <div className="w-[20%] my-auto  h-[40px]">
                    <Skeleton />
                    </div>
                    :
                   
                   <div  className="my-auto  font-Lexend text-lg font-bold"> <p> ${product.price} </p> </div>
                   }


                  </div>









                <div className="border-2 my-4 border-gray-300 rounded-md">
                    {
                        isLoading ?(
                            <div className="h-[30px] ">
                            <Skeleton />
                            </div>
                        ):(
                            carted ?   <p onClick={toggleCart} className="text-center cursor-pointer bg-black text-white text-gray-700 font-Lexend py-2">View in cart</p>       : <p onClick={handleAddToCart} className="text-center cursor-pointer text-gray-700 font-Lexend py-2">Add to cart</p> 

                        )
                    }
               
                </div>

               <div>
                    {
                        isLoading ?

                        <div className="w-full h-[400px]">
                            <Skeleton />

                        </div>







                        :
                        <div className="flex gap-y-2 w-full h-[auto] flex-col">
                      {product.details.Description !== 'undefined' &&  <div onClick={()=>{setProductDescription('Description'); if(productDescription==='Description'){setProductDescription(false)}}} className="cursor-pointer border-b-2 py-2 border-gray-300 ">
                        <div className="flex justify-between">
                        <button className="text-gray-800 text-[13px] font-Lexend">Description</button>
                        <div className="text-gray-400">
                            {productDescription === 'Description'? <KeyboardArrowUpRounded /> :    <KeyboardArrowDownRounded /> }
                        </div>

                          
                        </div>

                        {productDescription === 'Description'&& <p className="font-Livvic text-xs mt-2">
                            {
                                product.details.Description
                            }
                        </p> }
                    </div>
                    }









              {product.details.Warnings !== 'undefined' &&
                    <div onClick={()=>{setProductDescription('Warnings'); if(productDescription==='Warnings'){setProductDescription(false)}}} className="cursor-pointer border-b-2 py-2 border-gray-300 ">
                        <div className="flex justify-between">
                        <button className="text-gray-800 text-[13px] font-Lexend">Warnings</button>
                        <div className="text-gray-400">
                            {productDescription === 'Warnings'? <KeyboardArrowUpRounded /> :    <KeyboardArrowDownRounded /> }
                        </div>

                          
                        </div>

                        {productDescription === 'Warnings'&& <p className="font-Livvic text-xs mt-2">
                            {
                                product.details.Warnings
                            }
                        </p> }
                    </div>

}
                  








{    product.details.Certifications[0] !== 'undefined' &&
                    <div onClick={()=>{setProductDescription('Certificate'); if(productDescription==='Certificate'){setProductDescription(false)}}} className="cursor-pointer border-b-2 py-2 border-gray-300 ">
                        <div className="flex justify-between">
                        <button className="text-gray-800 text-[13px] font-Lexend">Certificate</button>
                        <div className="text-gray-400">
                            {productDescription === 'Certificate'? <KeyboardArrowUpRounded /> :    <KeyboardArrowDownRounded /> }
                        </div>

                          
                        </div>

                        {productDescription === 'Certificate'&& <div className="ml-6  font-Livvic text-xs mt-2">
                        <ul className="list-disc">
                            {
                                
                                product.details.Certifications.map((data)=>{
                                    return(
                                        <li className="my-2">{data}</li>
                                    )
                                })
                              
                               
                              
                            }
                             </ul>
                        </div> }
                    </div>}











{product.details.DietaryRestrictions[0] !== 'undefined' &&
                    <div onClick={()=>{setProductDescription('DietaryRestrictions'); if(productDescription==='DietaryRestrictions'){setProductDescription(false)}}} className="cursor-pointer border-b-2 py-2 border-gray-300 ">
                        <div className="flex justify-between">
                        <button className="text-gray-800 text-[13px] font-Lexend">Dietary Restrictions</button>
                        <div className="text-gray-400">
                            {productDescription === 'DietaryRestrictions'? <KeyboardArrowUpRounded /> :    <KeyboardArrowDownRounded /> }
                        </div>

                          
                        </div>

                        {productDescription === 'DietaryRestrictions'&& <div className="ml-6  font-Livvic text-xs mt-2">
                        <ul className="list-disc">
                            {
                                
                                product.details.DietaryRestrictions.map((data)=>{
                                    return(
                                        <li className="my-2">{data}</li>
                                    )
                                })
                              
                               
                              
                            }
                             </ul>
                        </div> }
                    </div>


}







 




                  { product.details.More !== 'undefined' && <div onClick={()=>{setProductDescription('More'); if(productDescription==='More'){setProductDescription(false)}}} className="cursor-pointer border-b-2 py-2 border-gray-300 ">
                        <div className="flex justify-between">
                        <button className="text-gray-800 text-[13px] font-Lexend">More</button>
                        <div className="text-gray-400">
                            {productDescription === 'More'? <KeyboardArrowUpRounded /> :    <KeyboardArrowDownRounded /> }
                        </div>

                          
                        </div>

                        {productDescription === 'More'&& <p className="font-Livvic text-xs mt-2">
                            {
                                product.details.More
                            }
                        </p> }
                    </div>}








                    
                    
                    </div>
                    }

                    </div>







                    
                    
               

                

                </div>

            </div>


        </div>
        
   


        <SimiliarProducts />

        <Footer />

        {cart && <Cart/>}
        
        
        </>
    )
}







export default ProductPage;





