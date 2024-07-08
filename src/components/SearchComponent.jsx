import React, { useEffect, useState } from 'react';
import { Inventory2Rounded, SearchRounded } from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import { TruncateText } from '../utility functions/TranctuateText';







const SearchComponent = ({ isMobile }) => {
  const [search, setSearch] = useState({ product: '', brand: '' });
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


  useEffect(()=>{
   
      const timeoutId = setTimeout(() => {
        if (search.product.length > 1 || search.brand.length > 1) {
         
          

          fetch(`/api/products/search?product=${search.product}&brand=${search.brand}`, {
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
      }, 3000);

      return () => clearTimeout(timeoutId);
  },[search.product,search.brand])






  return (
    <div>
      <div className="flex w-full flex-row">
        <div className="w-[70%] xs:max-sm:w-[100%] flex flex-row xs:max-sm:py-2 py-4 bg-white">
          <div className="w-[50%] xs:max-sm:w-[70%] mx-2 border-gray-300 border-r-2 flex flex-row">
            <div className="mx-2 xs:max-sm:mx-[4px] my-auto text-emerald-600">
              <Inventory2Rounded />
            </div>
            <input
              placeholder="Search your products"
              className="w-[70%] xs:max-sm:w-[70%] text-xs focus:outline-none"
              type="text"
              name="product"
              value={search.product}
              onChange={handleInputChange}
              onBlur={()=>{!barHovered && setBar(false)}}
            />
          </div>
          <div className='my-auto'>
            <input
              
              placeholder="Search your brands"
              className="w-[90%] text-xs focus:outline-none"
              type="text"
              name="brand"
              value={search.brand}
              onChange={handleInputChange}
              onBlur={()=>{!barHovered && setBar(false)}}
            />
          </div>
        </div>
        <div onClick={()=>setBar(!bar)} className="py-2 px-6 xs:max-sm:px-[2px] text-white bg-emerald-500">
          <SearchRounded style={{ fontSize: isMobile ? 25 : 40, cursor: 'pointer' }} />
        </div>
      </div>



{bar &&
      <div onMouseEnter={() => setBarHovered(true)} // Set barHovered to true on mouse enter
      onMouseLeave={() => setBarHovered(false)} // Set barHovered to false on mouse leave
       className="w-[70%] searchbox h-[300px] overflow-y-scroll bg-white">


       { 

       suggestions.map((data,index)=>{

        return(

        <div onClick={()=>{navigate(`/productPage/${data._id}`)}} key={index} className="w-full cursor-pointer border-b-2 border-gray-400">
          <div className="flex py-2 justify-between flex-row w-[90%] gap-x-2 mx-auto">
            <div className='flex flex-row gap-y-2'>
            <img className="w-[40px] h-auto" src={`/api/assets/images/${data.productImage}`} alt="Product" />
           
            <TruncateText 
                   text={data.name}
                   maxLength={40}
                    className="my-auto font-Abel cursor-pointer"
              />
            </div>
            <p className="my-auto font-bold font-Abel">${data.price}</p>
           
          </div>
        </div>
         )
        })
}



      </div>
}




    </div>
  );
};

export default SearchComponent;
