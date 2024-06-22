
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

const NavBar=()=>{

    const isMobile = useMediaQuery('(min-width:768px)');
    const { cart, toggleCart } = useContext(CartContext);
    const dispatch=useDispatch()
 
  const [toggleMenu,setToggleMenu] = useState(false)
  const user=useSelector((state)=>state.user)
  const [profilePicture,setProfilePicture]=useState(false)

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };



  

  useEffect(()=>{
   
  },[user])





    return(
        <nav style={{userSelect:'none'}} className="w-[100%] border-b-2 border-gray-300 ">
        <div className="flex w-[100%] mx-auto xs:max-md:justify-between flex-row">
            <div className="Logo  basis-[10%]  ">
                 <p  className="text-[2rem] ml-4 cursor-pointer md:max-lg:text-center md:max-lg:my-2 md:max-lg:text-[1.6rem]">Info<span>vit</span></p>

            </div>
           {isMobile && <div className="flex text-center my-auto justify-center   className='font-Abel text-lg' mx-auto gap-x-16 md:max-lg:gap-x-4 basis-[70%] md:max-lg:basis-[80%] mx-auto flex-row">
                <p onClick={()=>{window.location.href='/'}} className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>Home <span><KeyboardArrowDownRounded/></span></p>
                <p onClick={()=>{window.location.href='/about'}} className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>About <span><KeyboardArrowDownRounded/></span></p>
                <p className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>News <span><KeyboardArrowDownRounded/></span></p>
                <p className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>Info <span><KeyboardArrowDownRounded/></span></p>
                <p className='font-Lexend cursor-pointer md:max-lg:text-[14px] text-lg'>Contact Us <span><KeyboardArrowDownRounded/></span></p>
            </div>}

          {isMobile &&  <div className="basis-[20%] md:max-lg:basis-[20%] md:max-lg:justify-end md:max-lg:gap-x-4  w-full gap-x-6 flex flex-row py-2 ml-auto mr-[4px]">
                <ShoppingCartRounded onClick={toggleCart} style={{cursor:'pointer',fontSize:30,margin:'auto'}}/>
                <button onClick={()=>{window.location.href='/createAccount'}}  className="px-4  md:max-lg:text-[12px] md:max-lg:px-2  text-emerald-600 border-2 border-emerald-300  rounded-md text-sm  font-Poppins">
                    Sign Up
                </button>
                <div className="flex flex-col justify-center">
             {user && user.profilePicture ?     
             
              <img onClick={handleClick} src={user.profilePicture} className="w-[30px] cursor-pointer rounded-full mx-auto h-auto"  />

             

             :
                <AccountCircle onClick={handleClick} style={{fontSize:30,cursor:'pointer',margin:'auto'}}/>}
              {user &&  <p className="font-Lexend text-xs">{ user.name}</p>}
                <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>Account Settings</MenuItem>
        <MenuItem onClick={()=>{ dispatch(setLogoutAsync({}));   handleClose()}}>Logout</MenuItem>
      </Menu>
                </div>


            </div>}

            { !isMobile &&
            <div className="my-auto">
              <div className="flex flex-row gap-x-4">
                 <ShoppingCartRounded onClick={toggleCart} style={{cursor:'pointer'}}/>
                 <MenuRounded onClick={()=>{setToggleMenu(!toggleMenu)}}  style={{cursor:'pointer'}}/>
              </div>
                </div>

            }

           
              { toggleMenu &&
              
              <div className="w-[30%] h-[100vh] right-0 z-[999] fixed bg-white"> 
                <div className="absolute text-emerald-500 right-[3%] top-[3%]">
                  <CloseRounded onClick={()=>{setToggleMenu(!toggleMenu)}} style={{fontSize:'40px',cursor:'pointer'}}/>
                </div>
                   <div className="flex w-[80%] text-white mx-auto gap-y-6 mt-24 text-black flex-col ">
                    <p onClick={()=>{window.location.href='/'}} className="font-Abel border-2 bg-emerald-500 cursor-pointer  text-center p-2 border-emerald-500">Home</p>
                    <p onClick={()=>{window.location.href='/info'}} className="font-Abel border-2 bg-emerald-500 cursor-pointer text-center p-2 border-emerald-500">Info</p>
                    <p onClick={()=>{window.location.href='/about'}}  className="font-Abel border-2 bg-emerald-500 cursor-pointer text-center p-2 border-emerald-500">About</p>
                    <p onClick={()=>{window.location.href='/createAccount'}} className="font-Abel border-2 bg-emerald-500 cursor-pointer  text-center p-2 border-emerald-500">Sign Up</p>
                    <p  className="font-Abel border-2 bg-emerald-500 cursor-pointer text-center p-2 border-emerald-500">News</p>

                   </div>

                    </div>}
            

        </div>




        
    

      {cart &&  <Cart />}




        






    </nav>
    )
}



export default NavBar;







