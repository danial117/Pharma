import { useEffect,useState } from "react";

import { CheckRounded } from "@mui/icons-material";
import NavBar from "./NavBar"
import Footer from "./Footer";
import { useSelector } from "react-redux";
import { EditRounded } from "@mui/icons-material";
import PayPalButtonComponent from "../components/PaypalButtonComponent";
import api from "../utils/api";
import { TruncateText } from "../utility functions/TranctuateText";
const Order=()=>{

    const user=useSelector((state)=>state.user)
    const cartItems=useSelector((state)=>state.cartItems)
    const [totalPrice, setTotalPrice] = useState(0);
    const accessToken=useSelector((state)=>state.accessToken)
    const [products,setProducts]=useState([])
    const [orderProcess,setOrderProcess]=useState(1)
    const [address,setAddress]=useState({})

      const [edit,setEdit]=useState(false);
      const [formData, setFormData] = useState({
        email:'',
        firstName: '',
        lastName: '',
        streetAddress: '',
        state: '',
        city:''
      });
      const [errors, setErrors] = useState({});
      const [submitted, setSubmitted] = useState(false);
















      const validateForm = () => {
        const newErrors = {};
        // Name validation
        if (formData.firstName && formData.firstName.length < 3) {
          newErrors.firstName = 'Name should be at least 3 characters long.';
        }
        if (!formData.firstName) {
            newErrors.firstName = 'First Name is required.';
        }
        if (!formData.lastName) {
            newErrors.lastName = 'lastName is required.';
        }

        if (formData.lastName && formData.lastName.length < 3) {
            newErrors.lastName = 'Name should be at least 3 characters long.';
          }
    

        // Email validation
        if (!formData.email.endsWith('@gmail.com')) {
          newErrors.email = 'Email should end with @gmail.com.';
        }
       
        if (!formData.state) {
            newErrors.state = 'State is required.';
        }
    
        if (!formData.streetAddress) {
            newErrors.streetAddress = 'Street Address is required.';
        }
    
        if (!formData.city) {
            newErrors.city = 'City is required.';
        }
       
        return newErrors;
      };














      useEffect(()=>{

         api.get('/order').then((response)=>response.data).then((data)=>{
       
       const items=  data.items.map((item)=>{
            return item.product
         })

         

         setProducts(items)
         setTotalPrice(data.totalAmount)

         



         })


      },[])







      useEffect(()=>{
          api.get('/address/')
        .then((response)=>response.data).then((data)=>setAddress(data));
        
        
      },[])





















      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };







      const handlePaymentSuccess = () => {
        setOrderProcess(3);
      };











      const handleSubmit = async(e) => {

        e.preventDefault();
        const validationErrors = validateForm();

        if(!edit && user.email){
            formData.email=user.email;
        }

        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
          }
          else{
            setErrors({})
          }
        // Process the form data (e.g., send it to the server)
        await api.post('/address/create', JSON.stringify(formData), {
          headers: {
            'Content-Type': 'application/json',
          },
        }).then((response)=>response.data).then((data)=>{

       
          setAddress(data)
          setOrderProcess(2)

          setFormData({
            email:'',
        firstName: '',
        lastName: '',
        streetAddress: '',
        state: '',
        city:''
          });
        
        
        })
       
      };










      const RemoveAddress=async()=>{
      const response=  await api.delete('/address',{},{headers:{'Content-Type':'application/json'}}).then((response)=>{
        if(response.status=200){
          setAddress({})
        }
      })
      

      }








      const Checkout=async()=>{

        await fetch(`/api/user/address/`,{
            method:'GET',
            
        }).then((response)=>response.json()).then(()=>{

        })

        





      }
    
    

      



   






  






    return(
    <>

    <NavBar />
    


    <div className=" w-[100%] p-8">



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
          orderProcess === 1

          &&

          !address._id

          &&

          <div className="border-2 border-gray-200">
          <form>
             <div className="flex flex-col gap-y-8">
             <div className="w-full border-b-2 border-gray-200 p-8 ">
                 
     {  edit ? <input className="focus:outline-none w-full bg-gray-100 border-2 p-2  border-gray-300 rounded-sm" name='email' value={edit ? formData.email : user.email} onChange={handleChange}  type="text" placeholder="Enter Email Address *" /> :
                 <div className="border-gray-300 rounded-sm text-gray-300 flex flex-row justify-between   bg-gray-100 border-2 p-2"><p>{user.email}</p>  <div className="text-black"><EditRounded onClick={()=>setEdit(true)} style={{cursor:'pointer'}}/> </div>   </div>
                 }
                  {edit && errors.email && <p className="text-red-500">{errors.email}</p>}
             </div>

             <div className="w-full flex border-b-2 border-gray-200 p-8 flex-row gap-x-4">
                 <div className="w-full">
                 <input className="focus:outline-none w-full bg-gray-100 border-2 border-gray-300 rounded-md p-2"
                 value={formData.firstName} onChange={handleChange}
                 name="firstName"
                 type="text"
                 placeholder="First Name *" />
                  {errors.firstName && <p className="text-red-500 ">{errors.firstName}</p>} 
                  </div>
                  <div className="w-full">
                 <input className="focus:outline-none w-full bg-gray-100 border-2 border-gray-300 rounded-md p-2" name="lastName" type="text"  value={formData.lastName} onChange={handleChange} placeholder="Last Name *" />
                 {errors.lastName && <p className="text-red-500">{errors.lastName}</p>}
                 </div>
             </div>



             <div className="p-8 flex flex-col gap-y-14">
             <div className="w-full ">
                 <input className="focus:outline-none w-full bg-gray-100 border-2 p-2  border-gray-300 rounded-md "  value={formData.state} onChange={handleChange} name="state"  type="text" placeholder="State" />
                 {errors.state && <p className="text-red-500">{errors.state}</p>}
             </div>


             <div className="w-full">
                 <input className="focus:outline-none w-full bg-gray-100 border-2 p-2  border-gray-300 rounded-md"  value={formData.streetAddress} onChange={handleChange} name="streetAddress"  type="text" placeholder="Street Address 1" />
                 {errors.streetAddress && <p className="text-red-500">{errors.streetAddress}</p>}
             </div>

         

             <div className="w-full flex  flex-col gap-y-2">
                 <input className="focus:outline-none w-full bg-gray-100 border-2 border-gray-300 rounded-md p-2"  value={formData.city} onChange={handleChange} name="city"  type="text" placeholder="City *" />
                 {errors.city && <p className="text-red-500">{errors.city}</p>}
                
             </div>

             <div>
                 <button type="submit" onClick={handleSubmit} className="bg-black text-white rounded-md py-2 px-4">Enter Address</button>
             </div>
             

            </div>



           



             </div>
             </form>
             </div>


        }









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
              <p className=" text-lg font-Lexend">{address.city} , 20459</p>


              </div>

            </div>

            <div className="bg-gray-200 xs:max-sm:px-2 w-full py-4 px-12">
              <div className="flex flex-row gap-x-4">

                <button onClick={()=>{setAddress({})}} className=" py-2 px-4 rounded-md xs:max-sm:text-sm font-Lexend bg-white">Edit</button>
                <button onClick={RemoveAddress} className=" py-2 px-6 xs:max-sm:px-2 xs:max-sm:text-sm rounded-md font-Lexend bg-white">Remove</button>
                <button onClick={()=>{setOrderProcess(2)}} className=" py-2 px-6 xs:max-sm:px-2 xs:max-sm:text-sm rounded-md font-Lexend bg-white">Confirm</button>


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
                        <p className="font-Lexend  md:max-lg:text-sm">${totalPrice}</p>

                    </div>


                    <div className="flex flex-row justify-between">
                        <p className="font-Lexend md:max-lg:text-sm">Shipping & Handling</p>
                        <p className="font-Lexend md:max-lg:text-sm">$0.00</p>

                    </div>


                    <div className="flex flex-row justify-between">
                        <p className="font-Lexend  md:max-lg:text-sm">Tax</p>
                        <p className="font-Lexend  md:max-lg:text-sm">$0.00</p>

                    </div>


                    <div className="flex flex-row border-b-2 pb-4 border-gray-200 mt-6 justify-between">
                        <p className="font-Lexend text-[1.3rem]">Total</p>
                        <p className="font-Lexend">${totalPrice}</p>

                    </div>
                    <div  className="text-center p-4 my-auto w-[60%] mx-auto bg-black text-white">Continue to Checkout</div>

                    

                </div>
                </div>











                <div className="mt-8 ">

                <p className="bg-gray-200 p-4 font-Lexend">Your Basket</p>











          <div className="h-[40vh] overflow-y-scroll">

















          {

            products.map((data,index)=>{


                return(

             
          
          
          <div className="m-4 pb-2 border-b-2 border-gray-500 ">
                <div className="grid grid-cols-2">
                      <div className="flex flex-row">
                        <div className=''>
                            <div className='w-[100%] flex  h-[100px]'>
                            <img className='w-[80%]  h-[70px] mx-auto  ' src={`/api/assets/images/${data.productImage}`} />
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
                            <p className='text-Livvic text-[14px] text-gray-700'>{data.options}</p>
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










