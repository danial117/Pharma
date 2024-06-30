

import Footer from "./Footer";

import NavBar from './NavBar'

const Contact=()=>{




    return(

        <>
            <NavBar />

            <div className="bg-gray-100">
                <div className="flex  pt-12 pb-32 px-12 flex-row xs:max-md:flex-col xs:max-md:gap-y-12 w-full h-auto">
                    <div className="basis-[70%] xs:max-md:basis-[100%] xs:max-md:mx-auto xs:max-md:w-[80%] w-[50%] mx-auto flex flex-col gap-y-2">
                        <p className="font-Lexend text-[2.5rem]">Get in Touch</p>
                        <p className="font-Livvic text-[1.3rem]">Please fill out the form in order to make query.</p>
                        <input type="text" placeholder="Name" className="focus:outline-none w-[70%] xs:max-md:w-full font-Poppins border-2 border-gray-300 p-2 rounded-md text-[20px]" />
                        <input type="text" placeholder="Your Email Address" className="focus:outline-none w-[70%] xs:max-md:w-full font-Poppins border-2 border-gray-300 p-2 rounded-md text-[20px]" />
                        
                        <textarea placeholder="Message" className="focus:outline-none w-[70%] xs:max-md:w-full font-Poppins border-2 border-gray-300 p-2 rounded-md text-[20px]" rows={4} />

                    
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








