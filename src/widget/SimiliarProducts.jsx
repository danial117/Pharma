
import { useEffect,useState } from 'react'


import { useNavigate } from 'react-router-dom';
import { TruncateText } from '../utility functions/TranctuateText';


const SimiliarProducts=()=>{

    const [products,setProducts]=useState([]);
    const navigate=useNavigate()

    useEffect(()=>{

        
        fetch(`${process.env.REACT_APP_API_URL}/products?page=1&limit=3`,{
         method:'GET'
        }).then((response)=>response.json()).then((result)=>{setProducts(result)})
     
     
         },[])


    return(
       


        <div className="w-[80%]  mx-auto my-6 h-auto">

            <p className='font-Lexend my-4 text-[1.5rem]'>Similiar Products</p>

        <div className="w-[100%] basis-[70%] gap-x-4 gap-y-4  grid grid-cols-3 xs:max-md:grid-cols-2">
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    {
                        products.map((data,index)=>{




                            return(

                                <div key={index} onClick={()=>navigate(`/productPage/${data._id}`)}  className="flex cursor-pointer justify-between gap-y-2 border-2 bg-white rounded-md border-emerald-500 flex-col">
                                <div className=" w-[90%]  mt-6 h-[150px] border-b-2 pb-2 border-gray-200  mx-auto">
                                    <img className="w-[50%] h-[100%] mx-auto my-auto" src={`${process.env.REACT_APP_API_URL}/assets/products/${data.productImage}`}/>
        
                                </div>
                                <div className="m-2">
                                <p className="font-Abel text-[12px] font-bold text-emerald-400 my-[2px]">{data.brand}</p>
                               
                                <TruncateText 
                                           text={data.name}
                                           maxLength={30}
                                          
                                           className="font-Lexend xs:max-sm:text-[10px] cursor-pointer text-gray-800"
                                     />
                                <p className="font-Poppins xs:max-sm:text-[13px] text-gray-600">{data.options}</p>
                               
                                    <div className="bg-gray-200 font-Abel py-2 xs:max-sm:py-[4px] xs:max-sm:text-[13px] text-[20px] rounded-md text-center">${data.price}</div>
                                    
                               
                                </div>
        
        
                            </div>


                            )
                        })
                        
}
            </div>

        </div>
        
        
        
        
        
    )



}



export default SimiliarProducts;







