

import { CloseRounded, SearchRounded } from "@mui/icons-material"
import { useState} from "react"
import UserData from "./searchQueryRendering";
import { useFetch } from "../context/SearchQueryContext";
import { ArrowBackIosNewRounded } from "@mui/icons-material";
import { httpClient } from "../dataProvider";









const SearchData=()=>{
  const { setIsFetching,isFetching } = useFetch();

    const [searchInput,setSearchInput]=useState('')
    const [searchBar,setSearchBar]=useState(true)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('User');
  const [data,setData]=useState(false)

  const apiUrl=process.env.VITE_API_URL

    
     const AdminSearchQuery=async()=>{

       if(searchInput.length>0){

       await httpClient(`${apiUrl}/admin/search/${selectedCategory}/${searchInput}`)
       .then((response)=>response.json)
       .then((data)=>{console.log(data); setData(data); setIsFetching(true)})
       .catch((error) => {
        console.error('Fetch error:', error);
        setIsFetching(false);
        // Handle the error here, e.g., show a notification to the user
    })
    
     }
     }




  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setIsDropdownOpen(false);
  };

  return (
    <>
    {isFetching && <div onClick={()=>window.location.href='/'} className="text-white z-[1000] flex cursor-pointer flex-row gap-x-[1px] absolute top-2 left-2">
        <ArrowBackIosNewRounded style={{fontSize:30}} />
        <p className="font-Lexend text-lg my-[2px]">Back</p>
      </div>}
      {!isFetching && searchBar && <div  className="text-black z-[200] hover:text-white flex  flex-row gap-x-[1px] fixed top-2 right-2">
        <CloseRounded onClick={()=>setSearchBar(false)} className="cursor-pointer" style={{fontSize:50}} />
       
      </div>}

      {!searchBar && <div  className="text-black z-[200] hover:text-emerald-500 flex  flex-row gap-x-[1px] fixed top-14 right-2">
        <SearchRounded onClick={()=>setSearchBar(true)} className="cursor-pointer" style={{fontSize:40}} />
       
      </div>}

   {   searchBar &&
   <>
    <div className={`w-[100%] fixed ${isFetching && 'relative'}  top-0 z-[100] h-[150px] bg-sky-700`}>
      



        <div className=" ">
      <div className="flex py-8   xs:max-sm:ml-2 flex-row items-center">
        <div className="bg-white xs:max-sm:w-[90%]  rounded-sm mx-auto flex items-center">
          <SearchRounded onClick={AdminSearchQuery} className="border-r-2 cursor-pointer p-2 border-black" style={{ fontSize: 60, color: 'black' }} />
          <input
            onChange={(e) => setSearchInput(e.target.value)}
            value={searchInput}
            type="text"
 
            placeholder="Search any query"
            className="focus:outline-none xs:max-sm:w-[80%] ml-2 xs:max-sm:text-sm text-lg font-Lexend"
          />
          <div className="relative ml-4">
            <button onClick={toggleDropdown} className="bg-gray-200 text-gray-800 xs:max-sm:px-2   px-6 py-4 ">
              {selectedCategory}
            </button>
            {isDropdownOpen && (
              <div className="absolute top-full left-0 mt-2 bg-white border rounded-md shadow-lg xs:max-sm:w-28 w-48 z-10">
                <button
                  onClick={() => handleCategorySelect('User')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  User
                </button>
                <button
                  onClick={() => handleCategorySelect('Address')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Address
                </button>
                <button
                  onClick={() => handleCategorySelect('Order')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                  Order
                </button>
                <button
                  onClick={() => handleCategorySelect('Product')}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left"
                >
                 Product
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      </div>



    </div>

    <div className="h-auto  z-[20] bg-slate-100 w-full">
        <div className="w-[80%]   mx-auto">
            <UserData user={data.user} order={data.order} cart={data.cart} address={data.address} product={data.product} brand={data.brand}/>
        </div>
    </div>

</>
}




    </>

  );
};
export default SearchData
