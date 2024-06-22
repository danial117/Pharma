

import NavBar from "./NavBar"
import Footer from "./Footer"
import '../styles/styles.css'
import { useState } from "react"
import {setUser, setAccessToken} from '../state'
import { useDispatch } from "react-redux"






 const SignUp=()=>{

   const [login, setLogin]=useState(true)
   const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: ''
  });


 const dispatch=useDispatch()













  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const SignUpSubmit = (e) => {
    e.preventDefault();
    // Process the form data (e.g., send it to the server)
     fetch('http://localhost:3002/user/signup',{
      method:'POST',
      headers:{"Content-Type":'application/json'},
      credentials:'include',
      body:JSON.stringify(formData)
     }).then((response)=>response.json()).then((data)=>{ dispatch(setUser({user:data.userData}));  dispatch(setAccessToken({accessToken:data.accessToken}));})
   
  };



  const LoginSubmit = (e) => {
    console.log('login')
    e.preventDefault();
    // Process the form data (e.g., send it to the server)
     fetch('http://localhost:3002/user/login',{
      method:'POST',
      headers:{"Content-Type":'application/json'},
      credentials:'include',
      body:JSON.stringify(formData)
     }).then((response)=>response.json()).then((data)=>{dispatch(setUser({user:data.modifiedUser})); dispatch(setAccessToken({accessToken:data.accessToken})); window.location.href='/' })
   
  };



  






    return(
        <>
     <NavBar />

     <div className="w-full h-auto py-auto sm:max-md:py-4" style={{background:'linear-gradient(to right,rgba(34, 211,238,1), rgba(2, 132, 199,1))'}}>

        <div className="w-[80%] xs:max-md:grid-cols-1 xs:max-md:w-[90%]   md:max-lg:w-[90%]  pt-4 pb-12  mx-auto grid grid-cols-2"> 
          <div className="bg-white">
           <div className="w-[70%] xs:max-sm:w-[100%] sm:max-lg:w-[90%] xs:max-sm:p-4  p-12 mx-auto">
            <p className="font-Lexend text-center text-[2rem]">Info.vit</p>
            <p className="font-Abel text-center">Create an account</p>






            <div class="container w-full my-4">
      <a  href="http://localhost:3002/oauth2/redirect/google">
        <div class="g-sign-in-button">
          <div class="content-wrapper">
            <div class="logo-wrapper">
            <img src="https://developers.google.com/identity/images/g-logo.png"></img>
            </div>
            <span class="text-container">
             
              <span>Sign in with Google</span>
            </span>
          </div>
        </div>
      </a>
    </div>

   <div className="mx-auto w-[15%] text-center bg-gray-100">
    <p className=" font-Poppins text-xs">* or *</p>
    </div>





            <div className="flex flex-col  gap-y-6 mt-8">


            <form onSubmit={login? LoginSubmit: SignUpSubmit} className="flex flex-col gap-y-6 mt-8">
                {!login && (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Name"
                    className="focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%]"
                  />
                )}
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email"
                  className="focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%]"
                />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%]"
                />
                {!login && (
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone"
                    className="focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%]"
                  />
                )}
                <button type="submit" className="w-[90%] bg-blue-600 py-2 cursor-pointer text-center">
                  <p className="font-Lexend text-white">Get Started</p>
                </button>
              </form>



     
            </div>

           {!login ? <p  className="font-Lexend text-xs text-center mt-28">Already have an account? <span onClick={()=>setLogin(!login)} className="text-blue-600 cursor-pointer">login</span></p>  :
           <p onClick={()=>setLogin(!login)} className="font-Lexend text-xs text-center mt-28">Don't have an account? <span  className="text-blue-600 cursor-pointer">Create an account</span></p>

}

           </div>
           </div>

           <div style={{backgroundImage: `linear-gradient(to right,rgba(34, 211,238,0.9), rgba(2, 132, 199,0.5)), url(${require('../assets/Poster1.jpeg')})`}}  className="w-full xs:max-md:hidden bg-cover bg-center h-full">
             
            <div className="p-12 flex w-[80%] md:max-lg:w-[90%] flex-col gap-y-6">
                <p className="text-[2rem] font-bold text-white font-Abel">A Better Health.</p>
                <p class='font-Poppins text-white text-[1.2rem]'>We are here for every medicine you require. We wil take care of every need</p>


            </div>
            
           


           </div>
          


        </div>


       
     </div>


     <Footer/>
        
        </>
    )
 }



export default SignUp














