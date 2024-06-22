



import { CloseRounded,Add,Remove,KeyboardArrowLeftRounded } from '@mui/icons-material';
import { useEffect, useState,useContext } from 'react';
import { useMediaQuery } from '@mui/material';
import { useSelector } from 'react-redux';
import { incrementItemQuantity,decrementItemQuantity,removeItemFromCartAsync } from '../state';
import { useDispatch } from 'react-redux';
import { CartContext } from '../cartContext/cartContext';
import api from '../utils/api';


const Cart=()=>{
    const [hide,setHide]=useState(false)
    const isMobile = useMediaQuery('(max-width:768px)');
    const cartItems=useSelector((state)=>state.cartItems);
    const user=useSelector((state)=>state.user)
    const accessToken=useSelector((state)=>state.accessToken)
    const dispatch=useDispatch()
    const { cart, toggleCart } = useContext(CartContext);
    const [totalPrice, setTotalPrice] = useState(0);
    const cartItemIds = cartItems.map(item =>
       { 
        const product={product:item._id,quantity:item.quantity}
        return product
    });



    const CartCheckout=async()=>{

     
     

          await api.get(`/order/createOrder`,{ 
               headers:{'Authorization': `Bearer ${accessToken}`}
             }).then((response)=>{

             if(response.status === 201){
             cartItemIds.map((data)=>{
                 dispatch(removeItemFromCartAsync({itemId:data.product}))
                })
                
                window.location.href='/order'
             }
             })
            
        
       

    }




    useEffect(() => {
   
    
        // Calculate individual total prices when the cart changes
        const individualTotals = cartItems.map((item) => {
          const individualTotal = item.price * item.quantity;
          return individualTotal;
        });
        
        
        // Calculate total price by summing individual totals
        const totalPrice = individualTotals.reduce((acc, total) => acc + total, 0).toFixed(2);
    
       
        setTotalPrice(totalPrice);
      }, [cartItems]);




      const RemoveCartItem=async(productId)=>{

        
         
                dispatch(removeItemFromCartAsync({itemId:productId}))
        

      }
  








    return(
        <>

        <div className={`fixed ${hide? 'hidden':'visible'}  z-[999] top-[0%] xs:max-md:w-[100%]  bg-gray-100 right-[0%] w-[40%] `}>


            <div className='relative h-[100vh] '>
            <div className='p-2 h-[80vh] overflow-y-scroll'>
            <div className='flex '>
            <div className='hover:scale-125 cursor-pointer'>
                <KeyboardArrowLeftRounded onClick={toggleCart} style={{fontSize:30,cursor:'pointer'}}/>
            </div>

            <p className=" font-Poppins mx-auto my-2">Cart({cartItems.length})</p>
            </div>



           







            {
                cartItems.map((data,index)=>{

                    return(


               

            <div key={index} className="m-4 pb-2 border-b-2 border-gray-500 ">
                <div className="grid grid-cols-2">
                    <div className="flex flex-row">
                        <div className=''>
                            <div className='w-[100%] flex  h-[100px]'>
                            <img className='w-[80%]  h-[70px] mx-auto  ' src={`http://localhost:3002/assets/images/${data.productImage}`} />
                            </div>

                        </div>

                        <div className='w-[60%]'>
                            <p className='font-Lexend text-[14px]'>{data.name}</p>
                            <p className='font-Poppins text-xs underline text-emerald-500'>{data.brand}</p>
                            <p className='text-Livvic text-[14px] text-gray-700'>1 ounce</p>
                        </div>

                    </div>
                    

                    <div className=''>
                        <div className='flex justify-end'>
                            <CloseRounded onClick={()=>{RemoveCartItem(data._id)}} style={{cursor:'pointer'}} />
                        </div>

                        <div className=''>
                        <div className="grid grid-cols-3 gap-x-2  my-4  border-[1px] rounded-md w-[40%] md:max-lg:w-[60%] ml-auto ">
                    <div onClick={()=>{dispatch(decrementItemQuantity({itemId:data._id}))}} className="px-auto  cursor-pointer  bg-gray-300"><Remove style={{fontSize:20}}/></div>
                    <p className=" mx-auto">{data.quantity}</p>
                    <div onClick={()=>{dispatch(incrementItemQuantity({itemId:data._id}))}} className=" px-auto my-auto  cursor-pointer "><Add style={{fontSize:20}}/></div>

                </div>
                        </div>

                        <div>
                            <p className='font-Abel text-end'>${data.price}</p>
                        </div>

                    </div>

                </div>


            </div>



)
})
}










           





           
















            </div>

            <div className='w-[100%] absolute bottom-0 bg-white h-[25vh]'>
                <div className='w-[80%] mt-4  mx-auto'>
                    <div className='flex flex-row justify-between'>
                        <p className='font-Abel text-emerald-600'>Savings</p>
                        <p className='font-Abel text-emerald-600'>0.00$</p>

                    </div>

                    <div className='flex flex-row justify-between'>
                        <p className='font-Abel '>Subtotal</p>
                        <p className='font-Abel '>${totalPrice}$</p>

                    </div>

                    <div className='my-2'>
                        <button onClick={CartCheckout} className='flex w-[80%] justify-center cursor-pointer p-4 rounded-full bg-black mx-auto text-white'>Continue to checkout</button>
                    </div>
                    <p className='text-center text-xs text-gray-500 font-Livvic'>Taxes and shipping calculated at checkout.</p>


                </div>


            </div>


            </div>








        </div>
        
        
        
        
        
        
        
        
        </>
    )
}





export default Cart;








