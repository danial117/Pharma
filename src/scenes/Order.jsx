import { useEffect,useState } from "react";

import { CheckRounded } from "@mui/icons-material";
import NavBar from "./NavBar"
import Footer from "./Footer";
import { useSelector,useDispatch } from "react-redux";
import { EditRounded } from "@mui/icons-material";
import PayPalButtonComponent from "../components/PaypalButtonComponent";
import api from "../utils/api";
import { TruncateText } from "../utility functions/TranctuateText";
import { useNavigate } from "react-router-dom";
import { removeItemFromCart } from "../state";
import ReactGA from 'react-ga4';
import SpinnerRotating from "../skeleton/spinner";
import FullscriptLogo from "../assets/svg/fullscript";




const Order=()=>{
    
    const navigate=useNavigate();
    const dispatch=useDispatch()
    
    const [totalPrice, setTotalPrice] = useState(0);
    const [address,setAddress]=useState({})
    const [products,setProducts]=useState([])
    const [orderProcess,setOrderProcess]=useState(1)
    const cartItems=useSelector((state)=>state.cartItems);
    const [order,setOrder]=useState(false)
    const cartItemIds = cartItems.map(item => item._id);
    const [loading,setLoading]=useState(false);
    
     





     const PayPalEventClick = () => {
      // Track PayPal button click
      ReactGA.event({
          category: 'Ecommerce',
          action: 'Paypal Event initiated',
          label: 'PayPal Checkout'
      });
      // Handle PayPal button click logic here
  };









    












      useEffect(()=>{

        const fetchOrder = async () => {
          try {
            setLoading(true)
            const response = await api.get('/order/createOrder');
            
            if (response.status === 201) {
              
              const removePromises = cartItemIds.map((itemId) => {
                console.log(itemId);
                return dispatch(removeItemFromCart({ itemId }));
              });
              
             await Promise.all(removePromises)
                .then(() => {
                  console.log('All items removed from cart successfully.');
                  // You can add any additional logic here if needed, e.g., redirect, UI update
                })
                .catch((error) => {
                  console.error('Error removing items from cart:', error);
                });
            }
          } catch (error) {
            console.error('Error creating order:', error);
          } finally {
            // Always run the second request
            try {
              const orderResponse = await api.get('/order');
              if (orderResponse.status === 404) {
                window.location.href = '/';
              } else {
                const data = orderResponse.data;
                const items = data.items.map((item) => item.product);
                setOrder(data);
                setProducts(items);
                setTotalPrice(data.totalAmount);
                setLoading(false)
              }
            } catch (error) {
              setLoading(false)
              console.error('Error fetching order:', error);
            }
          }
        };
    
        fetchOrder();
        


      },[])







      useEffect(()=>{

          api.get('/address/')
        .then((response)=>response.data).then((data)=>setAddress(data));
        
        
      },[])





















      







      const handlePaymentSuccess = () => {
        setOrderProcess(3);
      };











     












      









   





  






    return(
    <>

    <NavBar />
    
   {loading && <SpinnerRotating />}

    <div className=" w-[100%] ">

   <div className="mt-2 xs:max-md:mt-4 flex  mb-6">
      <div className="flex  mx-auto  justify-center flex-row">
        <FullscriptLogo />
        <p className="font-Lexend text-gray-500 text-[1.4rem] xs:max-sm:text-lg  my-6">Powered By Fullscript</p>
      </div>
    </div>
    



    {   
       orderProcess===3 &&
       <div className="w-[100%]    h-[100vh] bg-white">

          <div className="w-full pt-16 flex my-auto flex-col gap-y-2">
            <div className="bg-green-500 flex mx-auto  rounded-full h-[150px] w-[150px]">
              <CheckRounded style={{margin:'auto',fontSize:120,color:'white'}}/>
            </div>




         
         <div className="py-8">
            <p className=" flex flex-col gap-y-12 font-Lexend text-center text-[2rem]">Order Placed Successfully!</p>
            <p className="font-Livvic text-center text-md">We've sent you an email the order details.</p>

         </div>


          </div>

       </div>

}






{
  orderProcess !==3 &&

     <div className="flex flex-row xs:max-md:grid xs:max-md:grid-cols-1 gap-y-6 gap-x-6 w-[100%]">

            <div className="basis-[60%] flex flex-col gap-y-4  ">


        <div>
        <div onClick={()=>{if(orderProcess!==1){setOrderProcess(1)}}} className={`w-full  ${orderProcess==2 && 'cursor-pointer'} bg-black p-4`}>
          <p className="text-white  font-Lexend text-xl">1. Shipping Address</p>
        </div>
      








        {
          orderProcess===1 && address._id && 
          <div>
          <div className="w-full bg-green-200 border-2 h-auto flex flex-row border-gray-300">
            <div className="my-auto mx-2 flex">

              <div className="p-4 flex rounded-full my-auto text-white bg-green-500">
                <CheckRounded />

              </div>


              </div>
            <div className="p-4 flex flex-col gap-y-2">
              <p className=" text-xl font-Lexend">{address.firstName} {address.lastName}</p>
              <p className=" text-lg font-Lexend">{address.streetAddress}</p>
              <p className=" text-lg font-Lexend">{address.state}</p>
              <p className=" text-lg font-Lexend">{address.city} ,{address.zip}</p>


              </div>

            </div>

            <div className="bg-gray-200 xs:max-sm:px-2 w-full py-4 px-12">
              <div className="flex flex-row gap-x-4">

                <button onClick={()=>{window.location.href='/address'}} className=" py-2 px-4 rounded-md xs:max-sm:text-sm font-Lexend bg-white">Edit</button>
                <button onClick={()=>{setOrderProcess(2); PayPalEventClick()}} className=" py-2 px-6 xs:max-sm:px-2 xs:max-sm:text-sm rounded-md font-Lexend bg-white">Confirm</button>


                </div>

              </div>

            </div>
        }

        
       
                </div>


        <div>
                <div className="w-full bg-black p-4">
          <p className="text-white font-Lexend text-xl">2. Payment</p>
          </div>


        {  
        orderProcess === 2 &&
          <div className="w-full py-4 border-2 border-gray-300 bg-white">
            <div className="w-[80%] mx-auto">
            <PayPalButtonComponent 
               onPaymentSuccess={handlePaymentSuccess}
             />
            </div> 
        </div>
        }


        </div>



       

              







            </div>












            <div className="basis-[30%] h-auto">


                <div className="border-gray-200  h-auto border-2">

                <p className="bg-gray-200 p-4 font-Lexend">Order Summary</p>


                <div className="flex p-4 flex-col gap-y-2">

                    <div className="flex flex-row justify-between">
                        <p className="font-Lexend  md:max-lg:text-sm">SubTotal</p>
                        <p className="font-Lexend  md:max-lg:text-sm">${order.itemsAmount}</p>

                    </div>


                    <div className="flex flex-row justify-between">
                        <p className="font-Lexend md:max-lg:text-sm">Shipping & Handling</p>
                        <p className="font-Lexend md:max-lg:text-sm">$0.00</p>

                    </div>


                    <div className="flex flex-row border-b-2 pb-2 border-gray-200 justify-between">
                        <p className="font-Lexend  md:max-lg:text-sm">Tax</p>
                        <p className="font-Lexend  md:max-lg:text-sm">${order.tax}</p>

                    </div>


                    <div className="flex flex-row  mt-2 justify-between">
                        <p className="font-Lexend text-[1.3rem]">Total</p>
                        <p className="font-Lexend">${totalPrice}</p>

                    </div>
                    

                    

                </div>
                </div>











                <div className="mt-8 ">

                <p className="bg-gray-200 p-4 font-Lexend">Your Basket</p>











          <div className="h-[40vh] overflow-y-scroll">

















          {

            products.map((data,index)=>{


                return(

             
          
          
          <div className="m-4 pb-2 border-b-2 border-gray-500 ">
                <div onClick={() => navigate(`/productPage/${data._id}`)} className="grid cursor-pointer grid-cols-2">
                      <div  className="flex flex-row">
                        <div className=''>
                            <div className='w-[100%] flex  h-[100px]'>
                            <img className='w-[80%]  h-[70px] mx-auto  ' src={`${process.env.REACT_APP_API_URL}/assets/products/sm/${data.productImage.small}`} />
                            </div>

                        </div>

                        <div className='w-[60%]'>
                                     
                            <TruncateText 
                   text={data.name}
                   maxLength={20}
                    className="font-Lexend text-[14px]"
              />

                            
                            <TruncateText 
                   text={data.brand}
                   maxLength={15}
                    className="font-Poppins text-xs underline text-emerald-500"
              />
                            <p className='text-Livvic text-[14px] text-gray-700'>{data.option}</p>
                        </div>

                    </div>
                    

                  
                       

                        <div className="my-auto"> 
                            <p className='font-Abel text-end'>${data.price}</p>
                        </div>

                   

                </div>


            </div>

)
})
          
}








           







            </div>









                    
                </div>
























            </div>















        </div>


}









    </div>
  

















    <Footer />
    
    
    
    
    
    
    
    
    
    
    
    </>


    )

}


export default Order;










