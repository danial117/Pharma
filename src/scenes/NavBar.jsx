
import { KeyboardArrowDownRounded,ShoppingCartRounded,MenuRounded,CloseRounded,AccountCircle } from "@mui/icons-material";
import { useEffect, useState,useContext } from "react";
import LoginWidget from "../widget/LoginWidget";
import Cart from "../widget/Cart";
import { useMediaQuery } from "@mui/material";
import { useSelector } from "react-redux";
import { CartContext } from "../cartContext/cartContext";
import { Menu, MenuItem, IconButton, Avatar } from '@mui/material';
import { useDispatch } from "react-redux";
import { setLogoutAsync } from "../state";
import { TruncateText } from "../utility functions/TranctuateText";
import { useLocation } from "react-router-dom";












const NavBar=()=>{

    const isMobile = useMediaQuery('(min-width:768px)');
    const isMobileCategories = useMediaQuery('(min-width:1024px)');
    const { cart, toggleCart } = useContext(CartContext);
    const dispatch=useDispatch()
    const [categories,setCategories]=useState(false)
    const location = useLocation();
    const pathname= location.pathname
  const [toggleMenu,setToggleMenu] = useState(false)
  const user=useSelector((state)=>state.user)
  const accessToken=useSelector((state)=>state.accessToken)
  const [profilePicture,setProfilePicture]=useState(false)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    
    if(accessToken){
    setAnchorEl(event.currentTarget);
  }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  
  

  useEffect(()=>{
   
  },[user])





    return(
        <nav style={{userSelect:'none'}} className="w-[100%] border-b-2 border-gray-300 ">
        <div className="flex w-[100%] border-b-2 border-gray-700 mx-auto xs:max-md:justify-between flex-row">
            <div className="Logo  basis-[10%]  ">
                 <p onClick={()=>{window.location.href='/'}}   className="text-[2rem] ml-4 cursor-pointer md:max-lg:text-center md:max-lg:my-2 md:max-lg:text-[1.6rem]">Info<span>vit</span></p>

            </div>
           {isMobile && <div className="flex text-center my-auto justify-center   className='font-Abel text-lg' mx-auto gap-x-16 md:max-lg:gap-x-4 basis-[70%] md:max-lg:basis-[80%] mx-auto flex-row">
                <p onClick={()=>{window.location.href='/'}} className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>Home <span><KeyboardArrowDownRounded/></span></p>
                <p onClick={()=>{window.location.href='/about'}} className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>About <span><KeyboardArrowDownRounded/></span></p>
                <p onClick={()=>{window.location.href='/news'}} className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>News <span><KeyboardArrowDownRounded/></span></p>
                <p  onClick={()=>{window.location.href='/contact'}} className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>Contact Us <span><KeyboardArrowDownRounded/></span></p>
               {!isMobileCategories && <p  onClick={()=>{window.location.href='/categories'}} className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>Categories<span><KeyboardArrowDownRounded/></span></p> }
            </div>}

          {isMobile &&  <div className="basis-[20%] md:max-lg:basis-[30%] md:max-lg:justify-end md:max-lg:gap-x-6  w-full gap-x-8 flex flex-row py-2 ml-auto mr-[4px]">
                <ShoppingCartRounded onClick={toggleCart} style={{cursor:'pointer',fontSize:30,margin:'auto 0'}}/>
                <button onClick={()=>{window.location.href='/createAccount'}}  className="px-4  md:max-lg:text-[12px] md:max-lg:px-2   text-emerald-600 border-2 border-emerald-300  rounded-md text-sm  font-Poppins">
                    Sign Up
                </button>
                <div className="flex flex-col justify-center">
             {user && user.profilePicture ?     
             
              <img onClick={handleClick} src={user.profilePicture} className="w-[30px] cursor-pointer rounded-full mx-auto h-auto"  />

             

             :
                <AccountCircle onClick={handleClick} style={{fontSize:30,cursor:'pointer',margin:'auto'}}/>}
              {user &&  
              <TruncateText
              text={user.name}
              maxLength={8}
              className={'font-Lexend my-auto text-xs'}
              
             />}
               <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Account Settings</MenuItem>
        <MenuItem onClick={()=>{window.location.href='/userOrders'; handleClose()}}>Orders</MenuItem>
        <MenuItem onClick={toggleCart}>Cart</MenuItem>
        <MenuItem onClick={()=>{ dispatch(setLogoutAsync({}));   handleClose()}}>Logout</MenuItem>
      </Menu> 
                </div>


            </div>}

            { !isMobile &&
            <div className="my-auto">
              <div className="flex mr-2 flex-row gap-x-4">
           
                 <ShoppingCartRounded onClick={toggleCart} style={{cursor:'pointer'}}/>
                 <MenuRounded onClick={()=>{setToggleMenu(!toggleMenu)}}  style={{cursor:'pointer'}}/>
                 <div className="flex flex-col justify-center">
            <div className="flex flex-row gap-y-2">
             {user && user.profilePicture ?     
                      
              <img onClick={handleClick} src={user.profilePicture} className="w-[30px] cursor-pointer rounded-full mx-auto h-auto"  />

             

             :
                <AccountCircle onClick={handleClick} style={{fontSize:30,cursor:'pointer',margin:'auto'}}/>}
              {user && 
              <TruncateText
              text={user.name}
              maxLength={10}
              className={'font-Lexend my-auto text-xs'}
              
             />
              
              }
              </div>
              <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Account Settings</MenuItem>
        <MenuItem  onClick={()=>{window.location.href='/userOrders'; handleClose()}}>Orders</MenuItem>
        <MenuItem onClick={toggleCart}>Cart</MenuItem>
        <MenuItem onClick={()=>{ dispatch(setLogoutAsync({}));   handleClose()}}>Logout</MenuItem>
      </Menu>
                </div>


              </div>
                </div>

            }

           
              { toggleMenu &&
              
              <div className="w-[30%] h-[100vh] right-0 z-[1000] fixed bg-gray-200"> 
                <div className="absolute text-emerald-500 right-[3%] top-[3%]">
                  <CloseRounded onClick={()=>{setToggleMenu(!toggleMenu)}} style={{fontSize:'40px',cursor:'pointer'}}/>
                </div>
                   <div className="flex w-[80%] text-white mx-auto gap-y-6 mt-24 text-black flex-col ">
                    <p onClick={()=>{window.location.href='/'}} className="font-Abel border-2 bg-emerald-500 cursor-pointer  text-center p-2 border-emerald-500">Home</p>
                    <p onClick={()=>{window.location.href='/about'}}  className="font-Abel border-2 bg-emerald-500 cursor-pointer text-center p-2 border-emerald-500">About</p>
                    <p onClick={()=>{window.location.href='/createAccount'}} className="font-Abel border-2 bg-emerald-500 cursor-pointer  text-center p-2 border-emerald-500">Sign Up</p>
                    <p onClick={()=>{window.location.href='/news'}}  className="font-Abel border-2 bg-emerald-500 cursor-pointer text-center p-2 border-emerald-500">News</p>
                    <p onClick={()=>{window.location.href='/contact'}}  className="font-Abel border-2 bg-emerald-500 cursor-pointer text-center p-2 border-emerald-500">Contact</p>
                   {!isMobileCategories && <p onClick={()=>{window.location.href='/categories'}}  className="font-Abel border-2 bg-emerald-500 cursor-pointer text-center p-2 border-emerald-500">Categories</p>}

                   </div>

                    </div>}
            

        </div>





















        
{  isMobileCategories && pathname !== '/categories' &&    <div className="relative bg-white  xs:max-ml:top-0 z-[999]  w-[100%]">
       




        <div className="flex w-[100%]  grid py-2 px-4 grid-cols-8 mx-auto xs:max-md:justify-between flex-row">
        <div onClick={()=>setCategories(1)} className={`w-full ${categories===1 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm   ${categories ===1 && 'bg-white border-t-8  border-l-[1px] border-l-black border-r-[1px] border-r-black absolute z-[12]  border-emerald-500'} font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900`}>Vitamins & Supplements</p></div>
        <div onClick={()=>setCategories(2)} className={`w-full ${categories===2 && 'relative'}`}>  <p className={`text-center   ml:max-lg:text-sm  ${categories ===2 && ' bg-white border-t-8  border-l-[1px] border-l-black border-r-[1px] border-r-black absolute z-[12]  border-emerald-500'} font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900`}>Gastrointestinal Health</p></div>
        <div onClick={()=>setCategories(3)} className={`w-full ${categories===3 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm  ${categories ===3 && ' bg-white border-t-8  border-l-[1px] border-l-black border-r-[1px] border-r-black absolute z-[12]  border-emerald-500'} font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px]`}>Protein Products</p></div>
          
        <div onClick={()=>setCategories(4)} className={`w-full  ${categories===4 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm  ${categories ===4 && ' bg-white border-t-8  border-l-[1px] border-l-black border-r-[1px] border-r-black absolute z-[12]  border-emerald-500'} font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px]`}>Optimal Weight</p></div>
        <div onClick={()=>setCategories(5)} className={`w-full  ${categories===5 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm  ${categories ===5 && ' bg-white border-t-8  border-l-[1px] border-l-black border-r-[1px] border-r-black absolute z-[12]  border-emerald-500'} font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px]`}>Oral Health</p></div>
        <div onClick={()=>setCategories(6)} className={`w-full  ${categories===6 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm  ${categories ===6 && ' bg-white border-t-8  border-l-[1px] border-l-black border-r-[1px] border-r-black absolute z-[12]  border-emerald-500'} font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px]`}>Brands</p></div>
        <div onClick={()=>setCategories(7)} className={`w-full  ${categories===7 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm  ${categories ===7 && ' bg-white border-t-8  border-l-[1px] border-l-black border-r-[1px] border-r-black absolute z-[12]  border-emerald-500'} font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px]`}>Skin Healthcare</p></div>
        <div  className='w-full '>  <p className={`text-center bg-emerald-500   font-Abel font-bold cursor-pointer w-[80%] text-lg text-white p-4 ml:max-lg:text-sm rounded-bl-xl rounded-tr-xl`}>Best Sellers</p></div>


        </div>














{   categories &&
        <div className="w-[95%] ml:max-lg:top-[54px] top-[70px] mx-4 border-[1px] border-black bg-white absolute z-[10]  h-[500px] ">
          
          <div className="text-emerald-500  absolute top-2 right-5">
            <CloseRounded onClick={()=>setCategories(false)} style={{fontSize:40,cursor:'pointer'}}/>
          
          </div>






{ categories ===1 &&        
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-4 font-Poppins text-[1.5rem]">Vitamins & Supplements</p>
           <div className=" gap-x-6 gap-y-4 grid grid-cols-4 mx-auto">
            <div className="flex flex-col gap-y-2">
              <p className="text-emerald-600 font-bold">Featured</p>
              <p className="font-Livvic text-sm">GPL-1 Weight loss</p>
              <p className="font-Livvic text-sm">GPL-1 Support</p>
              <p className="font-Livvic text-sm">Sale</p>
              <p className="font-Livvic text-sm">New</p>
              <p className="font-Livvic text-sm">Trending</p>

            </div>

            <div className="flex flex-col gap-y-2">
              <p className="text-emerald-600 font-bold">Multivitamins </p>
              <p className="font-Livvic text-sm">Men's Vitamins</p>
              <p className="font-Livvic text-sm">Women's MultiVitamins</p>
              <p className="font-Livvic text-sm">Children Multivitamins</p>
              <p className="font-Livvic text-sm">Whole Food Vitamins</p>
              

            </div>

            <div className="flex flex-col gap-y-2">
              <p className="text-emerald-600 font-bold">Letter Vitamins </p>
              <p className="font-Livvic text-sm">Vitamin A</p>
              <p className="font-Livvic text-sm">Vitamin B</p>
              <p className="font-Livvic text-sm">Vitamin C</p>
              <p className="font-Livvic text-sm">Vitamin D</p>
              <p className="font-Livvic text-sm">Vitamin E</p>
              

            </div>

            <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Minerals</p>
  <p className="font-Livvic text-sm">Magnesium</p>
  <p className="font-Livvic text-sm">Zinc</p>
  <p className="font-Livvic text-sm">Calcium</p>
  <p className="font-Livvic text-sm">Iron</p>
  <p className="font-Livvic text-sm">Potassium</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Shop By Concern</p>
  <p className="font-Livvic text-sm">Joint Support</p>
  <p className="font-Livvic text-sm">Women's Health</p>
  <p className="font-Livvic text-sm">Men's Health</p>
  <p className="font-Livvic text-sm">Healthy Aging</p>
  <p className="font-Livvic text-sm">Hair, Skin & Nails</p>
  <p className="font-Livvic text-sm">Bone Health</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Popular</p>
  <p className="font-Livvic text-sm">Super Greens & Superfoods</p>
  <p className="font-Livvic text-sm">Pet Care</p>
  <p className="font-Livvic text-sm">Pill Cases & Accessories</p>
  <p className="font-Livvic text-sm">NAC - N-Acetyl-L-Cysteine</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Children's Health</p>
  <p className="font-Livvic text-sm">Children's Multivitamins</p>
  <p className="font-Livvic text-sm">Children's Supplements</p>
  <p className="font-Livvic text-sm">Children's Digestive Support</p>
  <p className="font-Livvic text-sm">Children's Immune Support</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>


            </div>


           </div>

}











{ categories ===2 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-4 font-Poppins text-[1.5rem]">Gastrointestinal Health</p>
           <div className=" gap-x-6 gap-y-4 grid grid-cols-4 mx-auto">
          


           <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Featured</p>
  <p className="font-Livvic text-sm">SALE</p>
  <p className="font-Livvic text-sm">New</p>
  <p className="font-Livvic text-sm">Best Sellers</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Greens For Digestion</p>
  <p className="font-Livvic text-sm">GLP-1 Weight Loss</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Probiotics</p>
  <p className="font-Livvic text-sm">Women's Probiotics</p>
  <p className="font-Livvic text-sm">Men's Probiotics</p>
  <p className="font-Livvic text-sm">Children's Probiotics</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Enzymes</p>
  <p className="font-Livvic text-sm">Digestive Enzymes</p>
  <p className="font-Livvic text-sm">Targeted Enzymes</p>
  <p className="font-Livvic text-sm">Other Enzymes</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Fiber</p>
  <p className="font-Livvic text-sm">Psyllium</p>
  <p className="font-Livvic text-sm">Other Fiber</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Cleanse & Detox</p>
  <p className="font-Livvic text-sm">Total Body Cleanse</p>
  <p className="font-Livvic text-sm">Liver Cleanse</p>
  <p className="font-Livvic text-sm">Detox Support</p>
  <p className="font-Livvic text-sm">Detox Teas</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Other Digestive Support</p>
  <p className="font-Livvic text-sm">Milk Thistle</p>
  <p className="font-Livvic text-sm">Aloe Vera</p>
  <p className="font-Livvic text-sm">Charcoal</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>




            </div>


           </div>


}



































{ categories ===3 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-4 font-Poppins text-[1.5rem]">Protein Products</p>
           <div className=" gap-x-6 gap-y-4 grid grid-cols-4 mx-auto">
          


            <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Brain Health</p>
  <p className="font-Livvic text-sm">Omega-3 Fatty Acids</p>
  <p className="font-Livvic text-sm">Phosphatidylserine</p>
  <p className="font-Livvic text-sm">Ginkgo Biloba</p>
  <p className="font-Livvic text-sm">Acetyl-L-Carnitine</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Heart Health</p>
  <p className="font-Livvic text-sm">Coenzyme Q10 (CoQ10)</p>
  <p className="font-Livvic text-sm">Omega-3 Fish Oil</p>
  <p className="font-Livvic text-sm">Hawthorn Berry</p>
  <p className="font-Livvic text-sm">L-Arginine</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Digestive Health</p>
  <p className="font-Livvic text-sm">Probiotics</p>
  <p className="font-Livvic text-sm">Digestive Enzymes</p>
  <p className="font-Livvic text-sm">Fiber Supplements</p>
  <p className="font-Livvic text-sm">Peppermint Oil</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Skin Health</p>
  <p className="font-Livvic text-sm">Collagen Supplements</p>
  <p className="font-Livvic text-sm">Hyaluronic Acid</p>
  <p className="font-Livvic text-sm">Vitamin E Oil</p>
  <p className="font-Livvic text-sm">Retinol</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>



            </div>


           </div>


}


















{ categories ===4 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-4 font-Poppins text-[1.5rem]">Optimal Weight</p>
           <div className=" gap-x-6 gap-y-4 grid grid-cols-4 mx-auto">
          


           <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Featured</p>
  <p className="font-Livvic text-sm">GLP-1 Weight Loss</p>
  <p className="font-Livvic text-sm">GLP-1 Support</p>
  <p className="font-Livvic text-sm">50% Off The Vitamin Shoppe Favorites</p>
  <p className="font-Livvic text-sm">New</p>
  <p className="font-Livvic text-sm">SALE</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Metabolism Support</p>
  <p className="font-Livvic text-sm">Fat Burners & Thermogenics</p>
  <p className="font-Livvic text-sm">Stimulant-Free Support</p>
  <p className="font-Livvic text-sm">Blood Sugar Support</p>
  <p className="font-Livvic text-sm">CLA</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Dietary Support</p>
  <p className="font-Livvic text-sm">Appetite Support</p>
  <p className="font-Livvic text-sm">Water Control</p>
  <p className="font-Livvic text-sm">Carb Blockers</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Meal Replacements</p>
  <p className="font-Livvic text-sm">Meal Replacement Powders</p>
  <p className="font-Livvic text-sm">Meal Replacement Bars</p>
  <p className="font-Livvic text-sm">Meal Replacement Shakes</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Exercise And Fitness</p>
  <p className="font-Livvic text-sm">Yoga</p>
  <p className="font-Livvic text-sm">Fitness Accessories</p>
  <p className="font-Livvic text-sm">Shaker Cups</p>
  <p className="font-Livvic text-sm">Recovery</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Healthy Lifestyle</p>
  <p className="font-Livvic text-sm">Keto</p>
  <p className="font-Livvic text-sm">Mediterranean</p>
  <p className="font-Livvic text-sm">Low Carb</p>
  <p className="font-Livvic text-sm">Meal Prep Bags & Accessories</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>




            </div>


           </div>


}




























{ categories ===5 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-4 font-Poppins text-[1.5rem]">Oral Health</p>
           <div className=" gap-x-6 gap-y-4 grid grid-cols-4 mx-auto">
          


           <div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Featured</p>
  <p class="font-Livvic text-sm">Toothpaste Specials</p>
  <p class="font-Livvic text-sm">Mouthwash Deals</p>
  <p class="font-Livvic text-sm">Oral Care Kits</p>
  <p class="font-Livvic text-sm">New Arrivals</p>
  <p class="font-Livvic text-sm">SALE</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Toothpaste</p>
  <p class="font-Livvic text-sm">Whitening Toothpaste</p>
  <p class="font-Livvic text-sm">Fluoride-Free Toothpaste</p>
  <p class="font-Livvic text-sm">Sensitive Teeth Toothpaste</p>
  <p class="font-Livvic text-sm">Natural Toothpaste</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Mouthwash</p>
  <p class="font-Livvic text-sm">Antibacterial Mouthwash</p>
  <p class="font-Livvic text-sm">Alcohol-Free Mouthwash</p>
  <p class="font-Livvic text-sm">Fluoride Mouthwash</p>
  <p class="font-Livvic text-sm">Natural Mouthwash</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Dental Floss</p>
  <p class="font-Livvic text-sm">Waxed Dental Floss</p>
  <p class="font-Livvic text-sm">Unwaxed Dental Floss</p>
  <p class="font-Livvic text-sm">Flavored Dental Floss</p>
  <p class="font-Livvic text-sm">Dental Tape</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Oral Care Accessories</p>
  <p class="font-Livvic text-sm">Electric Toothbrushes</p>
  <p class="font-Livvic text-sm">Manual Toothbrushes</p>
  <p class="font-Livvic text-sm">Tongue Scrapers</p>
  <p class="font-Livvic text-sm">Dental Picks</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>





            </div>


           </div>


}







































{ categories ===7 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-4 font-Poppins text-[1.5rem]">Skin Healthcare</p>
           <div className=" gap-x-6 gap-y-4 grid grid-cols-4 mx-auto">
          


           <div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Featured</p>
  <p class="font-Livvic text-sm">New Natural Arrivals</p>
  <p class="font-Livvic text-sm">Best Sellers</p>
  <p class="font-Livvic text-sm">Organic Skincare Favorites</p>
  <p class="font-Livvic text-sm">SALE</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Cleansers & Toners</p>
  <p class="font-Livvic text-sm">Gentle Cleansing Milk</p>
  <p class="font-Livvic text-sm">Balancing Face Toner</p>
  <p class="font-Livvic text-sm">Micellar Water</p>
  <p class="font-Livvic text-sm">Hydrating Facial Mists</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Moisturizers & Serums</p>
  <p class="font-Livvic text-sm">Organic Face Cream</p>
  <p class="font-Livvic text-sm">Hydrating Serums</p>
  <p class="font-Livvic text-sm">Anti-Aging Moisturizers</p>
  <p class="font-Livvic text-sm">Facial Oils</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Masks</p>
  <p class="font-Livvic text-sm">Clay Masks</p>
  <p class="font-Livvic text-sm">Sheet Masks</p>
  <p class="font-Livvic text-sm">Exfoliating Masks</p>
  <p class="font-Livvic text-sm">Moisturizing Gel Masks</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Beauty Supplements</p>
  <p class="font-Livvic text-sm">Collagen Supplements</p>
  <p class="font-Livvic text-sm">Biotin Supplements</p>
  <p class="font-Livvic text-sm">Hair, Skin & Nails Vitamins</p>
  <p class="font-Livvic text-sm">Antioxidant Blends</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Natural Extract Beauty</p>
  <p class="font-Livvic text-sm">Rosehip Seed Oil</p>
  <p class="font-Livvic text-sm">Tea Tree Oil</p>
  <p class="font-Livvic text-sm">Lavender Essential Oil</p>
  <p class="font-Livvic text-sm">Chamomile Extract</p>
  <p class="font-Livvic text-sm">Shop All</p>
</div>






            </div>


           </div>


}

















































{ categories ===6 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-4 font-Poppins text-[1.5rem]">Brands</p>
           <div className=" gap-x-6 gap-y-4 grid grid-cols-4 mx-auto">
          

           <div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Featured</p>
  <p class="font-Livvic text-sm">Gorilla Mind</p>
  <p class="font-Livvic text-sm">G.O.A.T. Fuel</p>
  <p class="font-Livvic text-sm">Vital Proteins</p>
  <p class="font-Livvic text-sm">Ryse</p>
  <p class="font-Livvic text-sm">BUM Energy</p>
  <p class="font-Livvic text-sm">JOCKO FUEL</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">New</p>
  <p class="font-Livvic text-sm">Akasha Superfoods</p>
  <p class="font-Livvic text-sm">Humann</p>
  <p class="font-Livvic text-sm">Built Brands</p>
  <p class="font-Livvic text-sm">BATTLE BARS</p>
  <p class="font-Livvic text-sm">H-PROOF</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Popular</p>
  <p class="font-Livvic text-sm">Force Factor</p>
  <p class="font-Livvic text-sm">EHP Labs</p>
  <p class="font-Livvic text-sm">Alani Nu</p>
  <p class="font-Livvic text-sm">Celsius</p>
  <p class="font-Livvic text-sm">Clean Simple Eats</p>
  <p class="font-Livvic text-sm">RAW</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Our Family Of Brands</p>
  <p class="font-Livvic text-sm">The Vitamin Shoppe</p>
  <p class="font-Livvic text-sm">BodyTech & BodyTech Elite</p>
  <p class="font-Livvic text-sm">Plnt</p>
  <p class="font-Livvic text-sm">Vthrive</p>
  <p class="font-Livvic text-sm">True Athlete</p>
  <p class="font-Livvic text-sm">TrueYou</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Web Exclusives</p>
  <p class="font-Livvic text-sm">Codeage</p>
  <p class="font-Livvic text-sm">HTWO Hydrogen Water</p>
  <p class="font-Livvic text-sm">Amen</p>
  <p class="font-Livvic text-sm">ReadyWise</p>
  <p class="font-Livvic text-sm">Further Food</p>
  <p class="font-Livvic text-sm">Swolverine</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Earth-Friendly</p>
  <p class="font-Livvic text-sm">Garden Of Life</p>
  <p class="font-Livvic text-sm">Orgain</p>
  <p class="font-Livvic text-sm">New Chapter</p>
  <p class="font-Livvic text-sm">Form Nutrition</p>
  <p class="font-Livvic text-sm">Olly</p>
  <p class="font-Livvic text-sm">True Grace</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Vegan</p>
  <p class="font-Livvic text-sm">Ora Organic</p>
  <p class="font-Livvic text-sm">Future Kind</p>
  <p class="font-Livvic text-sm">MaryRuth's</p>
  <p class="font-Livvic text-sm">Blessed</p>
  <p class="font-Livvic text-sm">SunWarrior</p>
  <p class="font-Livvic text-sm">Huel</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Black-Led</p>
  <p class="font-Livvic text-sm">Body Complete Rx</p>
  <p class="font-Livvic text-sm">Peak And Valley</p>
  <p class="font-Livvic text-sm">Camille Rose</p>
  <p class="font-Livvic text-sm">Vibrant Health</p>
  <p class="font-Livvic text-sm">SheaMoisture</p>
  <p class="font-Livvic text-sm">Alaffia</p>
</div>







            </div>


           </div>


}

























           




        </div>


}




        </div>
}



























        
    

      {cart &&  <Cart />}




        






    </nav>
    )
}



export default NavBar;







