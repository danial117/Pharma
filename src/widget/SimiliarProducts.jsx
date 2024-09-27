
import { useEffect,useState } from 'react'


import { useNavigate } from 'react-router-dom';
import { TruncateText } from '../utility functions/TranctuateText';
import Skeleton from '../skeleton/skeleton';
import { useQuery } from "@tanstack/react-query";


const renderSkeletons = () => {
    return [1, 2, 3, 4, 5, 6].map((index) => (
      <div key={index} className="flex gap-y-[4px] border-2 bg-white rounded-md border-emerald-500 flex-col">
        <div className="w-[90%] h-[150px] cursor-pointer sm:max-md:w-[100%] xs:max-sm:w-[100%] mt-2 border-b-2 border-gray-200 mx-auto">
          {/* Skeleton for image */}
          <Skeleton />
        </div>
      
        <div className="m-2 relative w-[90%] mx-auto h-[60px] flex flex-col">
          {/* Skeleton for description or other data */}
          <Skeleton />
        </div>
      </div>
    ));
  };




const SimiliarProducts=({productName,category,brand})=>{
 
    const [products,setProducts]=useState([]);
    const navigate=useNavigate();

    const FetchSimiliarProduct=async()=>{

        await fetch(`${process.env.REACT_APP_API_URL}/products?name=${productName}&category=${category}&brand=${brand}&limit=6`,{
         method:'GET'
        }).then((response)=>response.json()).then((result)=>{setProducts(result)})
 }


         const { isLoading, isError, data, error } = useQuery({
            queryKey: [productName],
             queryFn: FetchSimiliarProduct,
             refetchOnWindowFocus: false
           })

  
    return(
       


        <div className="w-[80%]  mx-auto my-6 h-auto">

            <p className='font-Lexend my-4 text-[1.5rem]'>Similiar Products</p>


      


        <div className="w-[100%] basis-[70%] gap-x-4 gap-y-4  grid grid-cols-3 xs:max-md:grid-cols-2">
        {isLoading ? (
        renderSkeletons()
      ) : (
                    
    
                        products.map((data,index)=>{




                            return(

                                <div key={index} onClick={()=>navigate(`/productPage/${data._id}`)}  className="flex cursor-pointer justify-between gap-y-2 border-2 bg-white rounded-md border-emerald-500 flex-col">
                                <div className=" w-[90%]  mt-6 h-[150px] border-b-2 pb-2 border-gray-200  mx-auto">
                                    <img className="w-[100px] h-[140px] mx-auto my-auto" src={`${process.env.REACT_APP_API_URL}/assets/products/md/${data.productImage.medium}`}/>
        
                                </div>
                                <div className="m-2">
                                <p className="font-Abel text-[12px] font-bold text-emerald-400 my-[2px]">{data.brand}</p>
                               


                                <TruncateText 
                                           text={data.name}
                                           maxLength={30}
                                          
                                           className="font-Lexend xs:max-sm:text-[10px] cursor-pointer text-gray-800"
                                     />
                                <p className="font-Poppins xs:max-sm:text-[13px] text-gray-600">{data.options[0].options}</p>
                               
                                    <div className="bg-gray-200 font-Abel py-2 xs:max-sm:py-[4px] xs:max-sm:text-[13px] text-[20px] rounded-md text-center">${data.options[0].price}</div>
                                    
                               
                                </div>
        
        
                            </div>


                            )
                        })
                        

)}
            </div>
   

        </div>
        
        
        
        
        
    )



}



export default SimiliarProducts;







