
import { useEffect,useState } from 'react'


import { useNavigate } from 'react-router-dom';




const SimiliarProducts=()=>{

    const [products,setProducts]=useState([]);
    const navigate=useNavigate()

    useEffect(()=>{

        
        fetch(`http://localhost:3002/products?page=1&limit=3`,{
         method:'GET'
        }).then((response)=>response.json()).then((result)=>{setProducts(result)})
     
     
         },[])


    return(
       


        <div className="w-[80%]  mx-auto my-6 h-auto">

            <p className='font-Lexend my-4 text-[1.5rem]'>Similiar Products</p>

        <div className="w-[100%] basis-[70%] gap-x-4 gap-y-4  grid grid-cols-3">
                    
                    
                    
                    
                    
                    
                    
                    
                    
                    {
                        products.map((data,index)=>{




                            return(

                                <div key={index} className="flex justify-between gap-y-2 border-2 bg-white rounded-md border-emerald-500 flex-col">
                                <div onClick={()=>navigate(`/productPage/${data._id}`)} className=" w-[90%] cursor-pointer mt-6 h-[150px] border-b-2 pb-2 border-gray-200  mx-auto">
                                    <img className="w-[50%] h-[100%] mx-auto my-auto" src={`http://localhost:3002/assets/images/${data.productImage}`}/>
        
                                </div>
                                <div className="m-2">
                                <p className="font-Abel text-[12px] font-bold text-emerald-400 my-[2px]">{data.brand}</p>
                                <p className="font-Lexend text-gray-800">{data.name}</p>
                                <p className="font-Poppins text-gray-600">150 Grams</p>
                                <div  className="grid py-2 grid-cols-2 gap-x-2 ">
                                    <div className="bg-gray-200 font-Abel py-2 text-[20px] rounded-md text-center">${data.price}</div>
                                    
                                </div>
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







