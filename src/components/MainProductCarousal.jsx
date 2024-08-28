

import { KeyboardArrowLeftRounded,KeyboardArrowRightRounded } from '@mui/icons-material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useMediaQuery } from '@mui/material';
import {useRef,useEffect,useState,useContext} from 'react'
import { CartContext } from '../cartContext/cartContext';
import { useDispatch,useSelector } from 'react-redux';
import { addItemToCartAsync } from '../state';
import { TruncateText } from '../utility functions/TranctuateText';
import Skeleton from '../skeleton/skeleton';
import { useQuery } from '@tanstack/react-query';


const MainProductCarousal=()=>{
    const isMobile = useMediaQuery('(max-width:1024px)');
    const xs = useMediaQuery('(min-width:576px)');
    const [products,setProducts]=useState([])
    const dispatch=useDispatch()
    const { cart, toggleCart } = useContext(CartContext);
    const cartItems=useSelector((state)=>state.cartItems);
    const cartItemIds = cartItems.map(item => item._id);
    





    const handleSlideRight = () => {
        sliderRef.current.slickNext(); // Move to next slide
        
      };

      const handleSlideLeft = () => {
        sliderRef.current.slickPrev(); // Move to next slide
       
      };
      



     const FetchCarousalProduct=async()=>{

        
       await fetch(`${process.env.REACT_APP_API_URL}/products?page=1&limit=4`,{
         method:'GET'
        }).then((response)=>response.json()).then((result)=>{setProducts(result)})
     
     
         }

         const { isLoading, isError, data, error } = useQuery({
            queryKey: 'carousalProducts',
            queryFn: FetchCarousalProduct,
            enabled:true,
            refetchOnWindowFocus: false
          });
        
     

      const sliderRef = useRef(null);

      const settings = {
          dots: false,
          infinite: true,
          speed: 1300,
          slidesToShow: !isMobile ? 3 :1,
          slidesToScroll: 1,
          autoplay:true,
          autoplaySpeed: 3000,
          loop:true,
          pauseOnHover: false,
          arrows:false
          
        };
  
      



    return(
        <section> 

        <div  style={{backgroundImage: `linear-gradient(to right,rgba(5, 150, 105,0.7), rgba(5, 150, 105,0.8)), url(${require('../assets/Poster1.jpeg')})`}}   className="w-full relative md:max-lg:h-auto  my-24 bg-center bg-cover h-auto">

            <div onClick={handleSlideLeft} className="absolute cursor-pointer text-gray-700 bg-white rounded-full top-[35%]  xs:max-lg:left-[2%] left-[8%]">
                <KeyboardArrowLeftRounded style={{fontSize:xs?60:40}} />
            </div>

            <div onClick={handleSlideRight} className="absolute cursor-pointer text-gray-700 bg-white rounded-full top-[35%]  xs:max-lg:right-[2%] right-[8%]">
                <KeyboardArrowRightRounded style={{fontSize:xs?60:40}} />
            </div>





        <Slider  ref={sliderRef}  className=" py-12 xs:max-sm:py-4 xs:max-sm:my-2 my-6 flex gap-x-6  w-[70%] mx-auto " {...settings}>


       { isLoading ?
        [1,2,3,4].map((data,index)=>{
            return(
            <div  className="flex  gap-y-[4px] border-2 bg-white rounded-md border-emerald-500 flex-col">
             
   <div className=" w-[90%] h-[150px] cursor-pointer sm:max-md:w-[100%] xs:max-sm:w-[100%] mt-2 border-b-2  border-gray-200  mx-auto">
                    <Skeleton  />
                  </div>
                  
                  
                  <div className="mt-[5px] relative w-[90%] mx-auto h-[30px] flex flex-col ">
                  <Skeleton />
                  </div>

                  <div className="m-2 relative w-[90%] mx-auto h-[120px] flex flex-col ">
                  <Skeleton />
                  </div>


              </div>
            )
            })







        :


           
          
            products.map((data,index)=>{
                const carted=cartItemIds.includes(data._id)


                return(
                    <div key={index} className="pl-4 xs:max-sm:pl-[2px]">
                    <div className="flex gap-y-2 h-[350px]  bg-white rounded-md flex-col">
                                    <div onClick={()=>{window.location.href=`/productPage/${data._id}`}} className="cursor-pointer w-[90%] h-[50%] mt-6  pb-2 border-gray-200  mx-auto">
                                        <img className="w-[50%] h-[100%] mx-auto my-auto" src={`${process.env.REACT_APP_API_URL}/assets/products/md/${data.productImage.medium}`}/>
            
                                    </div>
                                    <div className="m-2 flex flex-col gap-y-auto h-full justify-between">
                                   
                                    <TruncateText 
                         text={data.brand}
                         maxLength={30}
                         className="font-Abel text-[12px] font-bold text-emerald-400 my-[2px]"
                   />
                                    
                                    <TruncateText 
                                           text={data.name}
                                           maxLength={30}
                                           onClick={()=>{window.location.href=`/productPage/${data._id}`}}
                                           className="font-Lexend cursor-pointer text-gray-800"
                                     />
                                    <p className="font-Poppins text-gray-600">{data.options[0]?.option}</p>
                                    <div  className="grid py-2 grid-cols-2 gap-x-2 ">
                                        <div className="bg-gray-200 font-Abel py-2 text-[20px] rounded-md text-center">${data.options[0]?.price}</div>
                                        {carted ?   <div style={{userSelect:'none'}} onClick={toggleCart}  className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">View in cart</div>      : <div onClick={()=>dispatch(addItemToCartAsync({ product: { ...data, option:{id: data.options[0].id,price:data.options[0].price}}}))}  className="text-md border-2 cursor-pointer rounded-md py-2 sm:max-md:text-xs xs:max-sm:text-xs font-Abel text-center border-gray-300">Add to cart</div>}
                                    </div>
                                    </div>
            
            
                                </div>
                                </div>
            

                )
            })
          
        }
           

                    



                 
                 





            </Slider>





          










            </div>











    </section>


    )
}



export default MainProductCarousal;












