import React, { useEffect, useState } from 'react';
import { Inventory2Rounded, SearchRounded } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { TruncateText } from '../utility functions/TranctuateText';
import Skeleton from '../skeleton/skeleton';
import { useQuery } from '@tanstack/react-query';





const SearchComponent = ({ isMobile }) => {
  const [search, setSearch] = useState({ product: '' });
  const [suggestions,setSuggestion]=useState([])
  const [barHovered, setBarHovered] = useState(false);
  const [bar,setBar]=useState(false)
  const [changeCount, setChangeCount] = useState(0);
  const navigate=useNavigate()
  
 
  const handleInputChange = async(e) => {
   
    const { name, value } = e.target;
    setSearch((prevSearch) => ({
      ...prevSearch,
      [name]: value,
    }));
    setChangeCount(prevCount => prevCount + 1);
   

  };


  
   
  const SearchProductBar=async()=>{

  
      
        if (search.product.length > 1 ) {
         
          

      await  fetch(`http://localhost:3002/products/search?product=${search.product}`, {
            method: 'GET',
          })
            .then((response) => response.json())
            .then((data) => {      
              setSuggestion(data.products);
              if(suggestions.length>0){
                setBar(true);
              }
             
              setChangeCount(0); // Reset the counter after fetching data
            });
        }
     

      
    }


  

   const { isLoading:isLoadingSearchProducts, isError, data, error } = useQuery({
            queryKey: ['searchBar',search.product,search.brand],
             queryFn: SearchProductBar,
             refetchOnWindowFocus: false
           })

  
   console.log(isLoadingSearchProducts)













  return (
    <div>
      <div className="flex w-full flex-row">
        <div className="w-[70%] xs:max-sm:w-[100%] flex flex-row xs:max-sm:py-2 py-4 bg-white">
         
            <div className="mx-2 xs:max-sm:mx-[4px] my-auto text-emerald-600">
              <Inventory2Rounded />
            </div>
            <input
              placeholder="Search your products"
              className="w-[70%] xs:max-sm:w-[70%] ml-2  text-md focus:outline-none"
              type="text"
              name="product"
              value={search.product}
              onChange={handleInputChange}
              onBlur={()=>{!barHovered && setBar(false)}}
            />
          </div>
         
       
        <div onClick={()=>setBar(!bar)} className="py-2 px-6 xs:max-sm:px-2 text-white bg-emerald-500">
          <SearchRounded style={{ fontSize: isMobile ? 25 : 40, cursor: 'pointer' }} />
        </div>
      </div>



      {bar &&
  (
    isLoadingSearchProducts ?
      (
        <div
          onMouseEnter={() => setBarHovered(true)}
          onMouseLeave={() => setBarHovered(false)}
          className="w-[70%] xs:max-sm:w-[90%] searchbox h-[300px]  xs:max-md:h-[250px] overflow-y-scroll bg-white"
        >
          {[1, 2, 3, 4].map((data, index) =>{ return(
            <div key={index} className="w-full flex flex-col gap-y-[4px]  ">
              
              <div className=' w-full p-2 mx-auto h-[60px]'>
              <Skeleton />
              </div>

            </div>
          )}
          
          )}
        </div>
      )
      :
      (
        <div
          onMouseEnter={() => setBarHovered(true)}
          onMouseLeave={() => setBarHovered(false)}
          className="w-[70%] xs:max-sm:w-[90%] searchbox h-[300px] xs:max-md:h-[250px] overflow-y-scroll bg-white"
        >
          {suggestions.map((data, index) => (
            <div onClick={() => navigate(`/productPage/${data._id}`)} key={index} className="w-full cursor-pointer border-b-2 border-gray-400">
              <div className="flex py-2 justify-between items-center w-[90%] gap-x-2 mx-auto">
                <div className='flex gap-x-2 items-center'>
                  <img className="w-[40px] h-auto" src={`http://localhost:3002/assets/images/${data.productImage}`} alt="Product" />
                  <TruncateText
                    text={data.name}
                    maxLength={40}
                    className="my-auto font-Abel cursor-pointer"
                  />
                </div>
                <p className="my-auto font-bold font-Abel">${data.price}</p>
              </div>
            </div>
          ))}
        </div>
      )
  )
}




    </div>
  );
};

export default SearchComponent;
