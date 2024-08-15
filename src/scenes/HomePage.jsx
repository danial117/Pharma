

import { ShoppingCartRounded,KeyboardArrowDownRounded,Inventory2Rounded,SearchRounded,MedicationRounded,LocalPhoneRounded,EmailRounded, KeyboardArrowLeftRounded, KeyboardArrowRightRounded, CloseRounded} from "@mui/icons-material"
import { useState, useRef,useEffect,useContext } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useMediaQuery } from "@mui/material";
import NavBar from "./NavBar"
import {useNavigate} from 'react-router-dom'
import { addItemToCart, removeItemFromCart, setAccessToken,setItemCart } from "../state";
import { CartContext } from "../cartContext/cartContext";
import SearchComponent from "../components/SearchComponent";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Footer from "./Footer";
import { setUser } from "../state";
import Cart from "../widget/Cart";
import MainPageProducts from "../components/MainPageProducts";
import MainProductCarousal from "../components/MainProductCarousal";
import api from "../utils/api";
import UAParser from 'ua-parser-js';
import AD_1 from '../assets/AD.png'





const HomePage=()=>{

    const isMobile = useMediaQuery('(max-width:1024px)');
    const xs = useMediaQuery('(min-width:576px)');
    const { cart, toggleCart } = useContext(CartContext);
    const [DomContent,setDomContent]=useState([])
    const [showAd,setShowAd]=useState(true)
   const accessToken=useSelector((state)=>state.accessToken)
    const cartItems=useSelector((state)=>state.cartItems);
   const user=useSelector((state)=>state.user)
    const navigate=useNavigate()
    const dispatch=useDispatch()
    const cartItemIds = cartItems.map(item => item._id);
    const Content=useSelector((state)=>state.content)
  

    const [deviceInfo, setDeviceInfo] = useState({});
    
    
    useEffect(() => {
      const parser = new UAParser();
      const result = parser.getResult();
      console.log(result)
      setDeviceInfo(result);
    }, []);
  
 

    const handleSlideRight = () => {
        sliderRef.current.slickNext(); // Move to next slide
        
      };

      const handleSlideLeft = () => {
        sliderRef.current.slickPrev(); // Move to next slide
       
      };






     

      

      useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/user/`, {
              method: 'GET',
              credentials: 'include' // Include cookies in request
            });
            
            if (response.ok) {
              const data = await response.json();
              const { accessToken, ...rest } = data;
              
              dispatch(setUser({ user: rest }));
              dispatch(setAccessToken({ accessToken }));
    
              if (user.email && (user.email.toString() !== data.email.toString())) {
                cartItemIds.forEach((id) => {
                  dispatch(removeItemFromCart({ itemId: id }));
                });
              }
    
              if (accessToken) {
                const cartResponse = await api.get('/cart/');
                if (cartResponse.status === 200 && cartResponse.data) {
                  cartResponse.data.items.forEach((item) => {
                    dispatch(setItemCart({ product: item.product, quantity: item.quantity }));
                  });
                }
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error);
          }
        };
    
        fetchUserData();
      }, []);












    const sliderRef = useRef(null);

    const settings = {
        dots: false,
        infinite: true,
        speed: 4000,
        slidesToShow: !isMobile ? 3 :1,
        slidesToScroll: 1,
        autoplay:true,
        autoplaySpeed: 5000,
        loop:true,
        pauseOnHover: false,
        arrows:false
        
      };

    


    return(
    <>

    <NavBar/>

    {showAd && <section className="h-[250px] relative xs:max-md:h-[150px]">
      <div className="absolute cursor-pointer z-[20] hover:scale-125 text-white top-0  right-4">
      <CloseRounded onClick={()=>setShowAd(false)} style={{fontSize:40}} />
      </div>
      <img src={AD_1} className="h-[100%]  w-[100%]"  />

    </section>
}
    


    


    <section style={{backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.5), rgba(0,0,0,0.1)), url(${require('../assets/Poster1.jpeg')})`}} className="w-[100%] bg-cover bg-center xs:max-sm:h-[400px] h-[500px] relative ">
        

        

        <div className="w-[50%] xs:max-sm:w-[100%] xs:max-sm:py-24 xs:max-sm:px-2 sm:max-md:w-[100%] md:max-lg:w-[80%] py-32 px-12">
            <p className="font-Lexend xs:max-sm:text-[1.6rem] text-white text-[2rem]">Pharma Products</p>

            <div className="border-l-4 mt-4 mb-6 xs:max-sm:w-[80%] w-[60%] pl-4 border-emerald-600 ">
                <p className="text-white xs:max-sm:text-xs text-md font-Livvic">We have plenty of medical products here available for everyone. We care for customers</p>
                

            </div>
           
           <SearchComponent />

                
        </div>



    </section>




    <MainProductCarousal />

    <MainPageProducts />


   






   























        























    <section>

<div className="w-full my-32 xs:max-sm:my-16 sm:max-lg:min-h-[50vh] h-auto">
    <p className="text-center font-Abel font-bold text-[2.5rem]">3 easy steps</p>

    <div className="w-[5%] mx-auto bg-emerald-500 my-4 h-[3px]"></div>

    <p className="text-center w-[50%] xs:max-md:w-[80%] mx-auto font-Livvic text-xs">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quae deserunt adipisci aliquid? Totam minima officia, molestias magnam facere iure laborum.</p>

    <div className="grid grid-cols-3 xs:max-md:grid-cols-1 xs:max-md:gap-y-2 xs:max-lg:w-[90%] my-6 gap-x-6 w-[80%] mx-auto">



        <div className="flex  shadow-lg md:max-lg:p-[10px]   p-[40px]    shadow-gray-300 flex-row">
            <div className="basis-[40%]">
                <SearchRounded style={{fontSize:50}} />
            </div>
            <div>
                <p className='font-Poppins font-bold text-[1.3rem]'>Search</p>
                <p className='font-Livvic text-xs'>Search for the product you want to buy.</p>
            </div>
             
        </div>


        <div className="flex shadow-lg md:max-lg:p-[10px]  p-[40px]    shadow-gray-300 flex-row">
            <div className="basis-[40%]">
                <MedicationRounded style={{fontSize:50}} />
            </div>
            <div>
                <p className='font-Poppins font-bold text-[1.3rem]'>Select</p>
                <p className='font-Livvic text-xs'>Select and add the medication to the cart. </p>
            </div>
             
        </div>



        <div className="flex shadow-lg md:max-lg:p-[10px]  p-[40px]    shadow-gray-300 flex-row">
            <div className="basis-[40%]">
                <ShoppingCartRounded style={{fontSize:50}} />
            </div>
            <div>
                <p className='font-Poppins font-bold text-[1.3rem]'>Checkout</p>
                <p className='font-Livvic text-xs'>Move to checkout for purchasing the products.</p>
            </div>
             
        </div>

    </div>


</div>
</section>







  {cart && <Cart />}

  <Footer />
     
























    
    </>
    )
}




export default HomePage






