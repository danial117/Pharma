
import NavBar from "./NavBar"
import Footer from "./Footer"
import { useEffect,useState } from "react"
import api from "../utils/api";





export const UserOrder=()=>{
    const [orders,setOrders]=useState([])




    useEffect(()=>{
        api.get('/order/userOrders',{},).then((response)=>{
            setOrders(response.data)
          })

        

    },[])

    const sortedOrders = orders.sort((a, b) => {
        if (a.paymentStatus === 'Pending' && b.paymentStatus !== 'Pending') {
            return -1; // a comes before b
        }
        if (a.paymentStatus !== 'Pending' && b.paymentStatus === 'Pending') {
            return 1; // b comes before a
        }
        return 0; // no change in order
    });

  




    return(
        
        <>
        <NavBar />
        <div className="h-[500px] p-6">

            <div className="">
                <p className="font-Lexend text-[2rem]">My Orders</p>
                <div className="p-6 w-[100%] grid grid-cols-5 gap-y-2">
                    
                    <div><p className='text-gray-800 sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[12px] font-bold font-Lexend'>Order ID</p></div>
                 
                    <div><p className='text-gray-800 sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[12px] font-bold font-Lexend'>Amount</p></div>
                    <div><p className='text-gray-800 sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[12px] font-bold font-Lexend'>Created On</p></div>
                    <div><p className='text-gray-800 sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[12px] font-bold font-Lexend'>Payment</p></div>
                    <div><p className='text-gray-800 sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[12px] font-bold font-Lexend'>Status</p></div>

                    {sortedOrders.map((order,index) => (
                     <>
                        <div key={index}><p onClick={()=>{if(index === 0 && order.paymentStatus==='Pending' ){window.location.href='/order'}}} className={`text-left sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[10px] ${index ===0 &&  order.paymentStatus==='Pending' && 'underline hover:text-blue-900 cursor-pointer text-blue-500'}`}>{order.orderNumber}</p></div>
                        <div><p  className="text-left sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[10px] ml-2">{order.totalAmount} $</p></div>
                        <div><p className="text-left sm:max-md:text-[10px] ml-2 xs:max-sm:text-[8px] md:max-lg:text-[10px]">{new Date(order.createdAt).toLocaleDateString()}</p></div>
                        <div><p className="text-left sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[10px]">{order.paymentStatus}</p></div>
                        <div><p className="text-left sm:max-md:text-[10px] xs:max-sm:text-[8px] md:max-lg:text-[10px]">{order.orderStatus}</p></div>
                        </>
                   
                ))}

                </div>
            </div>

        </div>
        
        
        <Footer />
        </>

    )







}












