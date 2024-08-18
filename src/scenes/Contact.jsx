

import Footer from "./Footer";

import NavBar from './NavBar'
import { useState } from "react";


const Contact=()=>{

    // State hooks for form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  // State hooks for validation errors
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });

  // Form submission handler
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior

    // Validate form fields
    const validationErrors = {
      name: name.trim() === '' ? 'Name is required' : '',
      email: email.trim() === '' ? 'Email is required' : !/\S+@\S+\.\S+/.test(email) ? 'Email is invalid' : '',
      message: message.trim() === '' ? 'Message is required' : ''
    };

    setErrors(validationErrors);

    // If there are validation errors, stop form submission
    if (Object.values(validationErrors).some(error => error !== '')) {
      return;
    }

    // Create an object with form data
    const formData = { name, email, message };

    // Perform form submission (e.g., send data to an API)
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/contact/request`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.status === 201) {
        setName('');
        setEmail('');
        setMessage('');
        alert('Thank you for contacting us!');
      } else {
        alert('There was an error submitting the form. Please try again later.');
      }
    } catch (error) {
     
      alert('There was an error submitting the form. Please try again later.');
    }
  };
  




    return(

        <>
            <NavBar />

            <div className="bg-gray-100">
                <div className="flex  pt-12 pb-32 px-12 flex-row xs:max-md:flex-col xs:max-md:gap-y-12 w-full h-auto">
                    <div className="basis-[70%] xs:max-md:basis-[100%] xs:max-md:mx-auto xs:max-md:w-[80%] w-[50%] mx-auto flex flex-col gap-y-2">
                        <p className="font-Lexend text-[2.5rem]">Get in Touch</p>
                        <p className="font-Livvic text-[1.3rem]">Please fill out the form in order to make query.</p>
                        <input 
                type="text" 
                placeholder="Name" 
                className={`focus:outline-none w-[70%] xs:max-md:w-full font-Poppins border-2 p-2 rounded-md text-[20px] ${errors.name ? 'border-red-500' : 'border-gray-300'}`} 
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
              
              <input 
                type="email" 
                placeholder="Your Email Address" 
                className={`focus:outline-none w-[70%] xs:max-md:w-full font-Poppins border-2 p-2 rounded-md text-[20px] ${errors.email ? 'border-red-500' : 'border-gray-300'}`} 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
              
              <textarea 
                placeholder="Message" 
                className={`focus:outline-none w-[70%] xs:max-md:w-full font-Poppins border-2 p-2 rounded-md text-[20px] ${errors.message ? 'border-red-500' : 'border-gray-300'}`} 
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
                        <button onClick={handleSubmit} className="bg-emerald-500 font-Poppins text-xl text-white py-2 rounded-md w-[30%]">Send</button>

                    
                    </div>

                    <div className="flex xs:max-md:w-[90%] xs:max-md:mx-auto flex-col xs:max-md:grid xs:max-md: grid-cols-2 gap-y-8">

                        <div>
                          
                            <p className="font-Abel xs:max-md:text-[1.4rem] text-[1.8rem]">Connect with us:</p>
                            <p className="font-Abel xs:max-md:text-sm text-lg">For any support or any questions:</p>
                            <p className="font-Abel xs:max-md:text-sm text-lg">Email us at <span className="text-blue-700">infovit@gmail.com</span></p>
                            


                        </div>


                        <div>
                          
                            <p className="font-Abel xs:max-md:text-[1.4rem] text-[1.8rem]">Pixpa USA</p>
                            <p className="font-Abel xs:max-md:text-sm text-lg">501 Silverside Road, Suite 105,</p>
                            <p className="font-Abel xs:max-md:text-sm text-lg">Wilmington, Delaware 19809</p>
                            <p className="font-Abel xs:max-md:text-sm text-lg">USA</p>
                            


                        </div>






                    </div>


                </div>
            
            </div>



            <Footer/>
        
        
        
        </>
    )



}


export default Contact;








