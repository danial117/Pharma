import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, setAccessToken, addItemToCartAsync,setItemCart } from '../state';
import { removeItemFromCart } from '../state';
import NavBar from './NavBar';
import Footer from './Footer';
import '../styles/styles.css';
import api from '../utils/api';
import ReactGA from 'react-ga4'
import { useNavigate } from 'react-router-dom';
import SpinnerRotating from '../skeleton/spinner';



const SignUp = () => {
  const dispatch = useDispatch();
  const Navigate=useNavigate()
  const [login, setLogin] = useState(true);
  const accessToken = useSelector((state) => state.accessToken);
  const cartItems = useSelector((state) => state.cartItems);
  const cartItemIds = cartItems.map((item) => item._id);
  const [loading,setLoading]=useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    // Clear error message when user starts typing
    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const UserRegisterationEvent = () => {
    // Track PayPal button click
    ReactGA.event({
        category: 'Ecommerce',
        action: 'Users Registered',
        label: 'Form submission'
    });
  }


    const UserSignedInEvent = () => {
      // Track PayPal button click
      ReactGA.event({
          category: 'Ecommerce',
          action: 'Users Logged',
          label: 'Form submission'
      });
    }
    

    const GoogleSignEvent = () => {
      // Track PayPal button click
      ReactGA.event({
          category: 'Ecommerce',
          action: 'Google Button Clicked',
          label: '3rd party'
      });
    }



  const validateForm = () => {
    let valid = true;
    const newErrors = {};

    // Validate name
    if (!formData.name.trim() && !login) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    // Validate email
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
      valid = false;
    }

    // Validate password
    if (!formData.password.trim()) {
      newErrors.password = 'Password is required';
      valid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
      valid = false;
    }

    if (!formData.phone.trim() && !login){
      newErrors.phone = 'Phone number is required';
      valid = false;

    } else if( !/^\d{3}-\d{3}-\d{4}$/.test(formData.phone) && !login) {
      newErrors.phone = 'Phone number must be in XXX-XXX-XXXX format';
      valid = false;
    }

    // Validate phone (optional, add your own validation logic)
    // if (formData.phone && !/^\d{10}$/.test(formData.phone)) {
    //   newErrors.phone = 'Phone number is invalid';
    //   valid = false;
    // }

    setErrors(newErrors);
    return valid;
  };




  const SubmissionSwitch=()=>{ setLogin(!login);
   setFormData({ name: '',
    email: '',
    password: '',
    phone: ''});

    setErrors({
      name: '',
      email: '',
      password: '',
      phone: '',
    })


    }




  const SignUpSubmit = async(e) => {
    e.preventDefault();
    if (validateForm()) {
     
      try{
          
      setLoading(true)
      if (accessToken) {
        cartItemIds.forEach((id) => {
          dispatch(removeItemFromCart({ itemId: id }));
        });

       

        fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        })
          .then((response) =>{if(response.status===409){
            alert('The user already exists.');
            setFormData({
              name: '',
              email: '',
              password: '',
              phone: '',
            })

          }else
         {
           return response.json()
          }
          })
          .then((data) => {
            dispatch(setUser({ user: data.userData }));
            dispatch(setAccessToken({ accessToken: data.accessToken }));
            UserRegisterationEvent();
            window.location.href = '/';
          });
      } else {
      const response=await fetch(`${process.env.REACT_APP_API_URL}/user/signup`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify(formData),
        })
         

          if(response){
           
             if(response.status===201) {
            
              const data=await response.json()
             
              dispatch(setUser({ user: data.userData }));
              dispatch(setAccessToken({ accessToken: data.accessToken }));
              UserRegisterationEvent()
                
                const dispatchPromises = [];
                cartItems.forEach((product) => {  
                            
                        dispatchPromises.push(dispatch(addItemToCartAsync({ product:product,quantity:product.quantity })));  
                });

                Promise.all(dispatchPromises)
                    .then(() => {
                       
                        window.location.href = '/';
                    })
                    .catch((error) => {
                        console.error('Error dispatching actions:', error)                      
                    });     
                }
                if(response.status===409){
                  alert('The user already exists.');
                  setFormData({
                    name: '',
                    email: '',
                    password: '',
                    phone: '',
                  })

                }
          }
      }
    
  }catch (error) {
    alert('An error occured during signup')
    setLoading(false)
    
} finally {
    setLoading(false);
    window.location.href = '/';
}
 }

    
  };














  const LoginSubmit =async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true)

      try{

      if (accessToken) {
        cartItemIds.forEach((id) => {
          dispatch(removeItemFromCart({ itemId: id }));
        });
        

       await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({email:formData.email,password:formData.password}),
        })
          .then((response) =>
          { 
           if(response.status===401){
            alert('Incorrect email or password')
           }else{
            response.json()
           }
            
          }
          )
          .then((data) => {
            Promise.all([
              dispatch(setUser({ user: data.modifiedUser })),
              dispatch(setAccessToken({ accessToken: data.accessToken })),
          ])
              .then(() => {
                  UserSignedInEvent();
                  window.location.href = '/';
              })

          });
      } else {
        
          const response = await fetch(`${process.env.REACT_APP_API_URL}/user/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            credentials: 'include',
            body: JSON.stringify(formData),
          });
        
          if (response.status === 401) {
            alert('Incorrect email or password');
            return;
          }
        
          const data = await response.json(); // Parse the response JSON
        
          // Dispatch your actions
         
        
         
        
       
          if(data){
            UserSignedInEvent();
            dispatch(setUser({ user: data.modifiedUser }));
            dispatch(setAccessToken({ accessToken: data.accessToken }));
            
            api.get('/cart/').then((response)=>
              { if (response.status === 200 && response.data) {
                
                // Create promises for adding items from the response to the cart
                const addToCartPromises = response.data.items.map((item) => {
                  const product = item.product;
                  
                  // Find the selected option based on the `option` id
                  const selectedOption = product.options.find(option => option.id === item.option);
                  
                  if (selectedOption) {
                    // Create the product structure to dispatch
                    const productToDispatch = {
                      name: product.name,
                      option: selectedOption, // Add the selected option
                      productImage: product.productImage,
                      _id: product._id,
                    };
                    
                    // Dispatch the action to add the item to the cart
                    return dispatch(setItemCart({ product: productToDispatch, quantity: item.quantity }));
                  }})
              
                // Once all items from the response are added, process the cartItems
                Promise.all(addToCartPromises)
                  .then(() => {
                    // Find products in cartItems that are NOT in response.data.items
                    const missingProducts = cartItems.filter((product) => {
                      return !response.data.items.some((item) => item._id === product._id);
                    });
              
                    // Dispatch actions for the missing products
                    const addItemToCartAsyncPromises = missingProducts.map((product) => {
                      return dispatch(addItemToCartAsync({ product: product, quantity: product.quantity }));
                    });
              
                    // Return the promise to chain with the previous one
                    return Promise.all(addItemToCartAsyncPromises);
                  })
                  .then(() => {
                    // After all dispatch operations are complete, redirect to another page
                    // window.location.href = '/';
                  })
                  .catch((error) => {
                    console.error('Error in dispatching actions:', error);
                  });
              }
              }
             )
          }
        }
    }catch (error) {
      
      setLoading(false)
      // Handle error if needed
  } finally {
   
      setLoading(false);
     
  }
    }
  };





  return (
    <>
    {loading && <SpinnerRotating />}
      <NavBar />

      <div
        className="w-full h-auto py-auto sm:max-md:py-4"
        style={{
          background:
            'linear-gradient(to right,rgba(34, 211,238,1), rgba(2, 132, 199,1))',
        }}
      >
        <div className="w-[80%] xs:max-md:grid-cols-1 xs:max-md:w-[90%] md:max-lg:w-[90%] pt-4 pb-12 mx-auto grid grid-cols-2">
          <div className="bg-white">
            <div className="w-[70%] xs:max-sm:w-[100%] sm:max-lg:w-[90%] xs:max-sm:p-4 p-12 mx-auto">
              <p className="font-Lexend text-center text-[2rem]">Info.vit</p>
              <p className="font-Abel text-center">Create an account</p>

              <div className="container w-full my-4">
                <a onClick={GoogleSignEvent} href={`${process.env.REACT_APP_API_URL}/oauth2/redirect/google/`}>
                  <div class="g-sign-in-button">
                    <div class="content-wrapper">
                      <div class="logo-wrapper">
                        <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google Logo" />
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

              <div className="flex flex-col gap-y-6 mt-8">
                <form onSubmit={login ? LoginSubmit : SignUpSubmit} className="flex flex-col gap-y-6 mt-8">
                  {!login && (
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Name"
                      className={`focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%] ${errors.name ? 'border-red-500' : ''}`}
                    />

                  )}
                  {errors.name && <p className="text-red-500 text-xs">{errors.name}</p>}
                  <input
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                    className={`focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%] ${errors.email ? 'border-red-500' : ''}`}
                  />
                  {errors.email && <p className="text-red-500 text-xs">{errors.email}</p>}
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className={`focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%] ${errors.password ? 'border-red-500' : ''}`}
                  />
                 {login && <p onClick={()=>window.location.href='/account-security/forgot-password'} className='font-Livvic cursor-pointer  hover:underline text-sm text-blue-800 -mt-4'>forgot password</p>}
                  {errors.password && <p className="text-red-500 text-xs">{errors.password}</p>}
                  {!login && (
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone"
                      className={`focus:outline-none font-Poppins border-b-2 border-gray-600 w-[90%] ${errors.phone ? 'border-red-500' : ''}`}
                    />
                  )}
                  {errors.phone && <p className="text-red-500 text-xs">{errors.phone}</p>}
                  <button type="submit" className="w-[90%] bg-blue-600 py-2 cursor-pointer text-center">
                    <p className="font-Lexend text-white">Get Started</p>
                  </button>
                </form>
              </div>

              {!login ? (
                <p className="font-Lexend text-xs text-center mt-28">
                  Already have an account?{' '}
                  <span onClick={SubmissionSwitch} className="text-blue-600 cursor-pointer">
                    login
                  </span>
                </p>
              ) : (
                <p onClick={SubmissionSwitch}
                  
                  className="font-Lexend text-xs text-center mt-28">
                  Don't have an account?{' '}
                  <span className="text-blue-600 cursor-pointer">Create an account</span>
                </p>
              )}
            </div>
          </div>

          <div
            style={{ backgroundImage: `linear-gradient(to right,rgba(34, 211,238,0.9), rgba(2, 132, 199,0.5)), url(${require('../assets/Poster1.jpeg')})` }}
            className="w-full xs:max-md:hidden bg-cover bg-center h-full"
          >
            <div className="p-12 flex w-[80%] md:max-lg:w-[90%] flex-col gap-y-6">
              <p className="text-[2rem] font-bold text-white font-Abel">A Better Health.</p>
              <p class="font-Poppins text-white text-[1.2rem]">
                We are here for every medicine you require. We will take care of every need
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default SignUp;
