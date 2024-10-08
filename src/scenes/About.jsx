import NavBar from "./NavBar";

import Footer from "./Footer";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useCMS } from "../cartContext/CmsContext";






const About=()=>{
      const Content=useSelector((state)=>state.content)
      const cmsData = useCMS();


    return(
        <>

        <NavBar />

        <div className="w-full xs:max-sm:mb-16">
            <div className="h-[500px] xs:max-sm:grid-cols-1 xs:max-sm:h-auto grid grid-cols-2 w-full ">
               <div className="py-[4rem] xs:max-sm:pt-12 xs:max-sm:pb-2 w-[70%] mx-auto">
                <p  className="font-Lexend xs:max-sm:text-[1rem] sm:max-md:text-[1.3rem] text-[1.7rem]">{cmsData?.AboutPageImageText1?.text1}</p>
                <p className="font-Abel xs:max-sm:text-[10px] sm:max-md:text-[14px] my-4 text-[1rem]">{cmsData?.AboutPageImageText1?.text2}</p>
                </div>


                <div className="w-[90%] xs:max-sm:w-[80%] mx-auto my-auto">

             <img src={`${process.env.REACT_APP_API_URL}/assets/CMS/${cmsData?.AboutPageImage1}`} className="w-full h-[400px]"  />




               </div>

            </div>

           




        </div>



















        <div className="w-full xs:max-sm:my-16 my-4 ">

            <div style={{backgroundImage: `linear-gradient(to right,rgba(0,0,0,0.7), rgba(0,0,0,0.8)), url(${`${process.env.REACT_APP_API_URL}/assets/CMS/${cmsData?.AboutPageImage2}`})`}}  className="w-full bg-cover bg-center xs:max-sm:h-[400px] h-[500px] my-auto">

             <div className="w-[60%] sm:max-md:w-[80%] xs:max-sm:w-[90%]   mx-auto py-24">
                <p className="text-center xs:max-sm:text-[3rem] sm:max-md:text-[5rem] text-[4rem] font-Abel text-white">{cmsData?.AboutPageImageText2?.text1}</p>
                <p className="text-white xs:max-sm:text-xs font-Livvic">{cmsData?.AboutPageImageText2?.text2}
                </p>


             </div>




            </div>



        </div>

















        <div className="w-full ">
            <div className="h-[500px] xs:max-sm:grid-cols-1 xs:max-sm:h-auto grid grid-cols-2 w-full ">





            <div className="w-[90%] xs:max-sm:w-[80%] xs:max-sm:mx-auto ml-auto my-auto">

<img src={`${process.env.REACT_APP_API_URL}/assets/CMS/${cmsData?.AboutPageImage3}`} className="w-full h-[400px]"  />




  </div>






               <div className="py-[4rem] xs:max-sm:py-8 xs:max-sm:w-[80%]  w-[70%] mx-auto">
                <p  className="font-Lexend sm:max-md:text-[1.3rem] text-[1.7rem]">{cmsData?.AboutPageImageText3?.text1}</p>
                <p className="font-Abel sm:max-md:text-[14px] my-4 xs:max-sm:text-[10px] text-[1rem]">{cmsData?.AboutPageImageText3?.text2}</p>
                </div>


               

            </div>

           




        </div>













        <div className="w-[90%] bg-gray-300 h-auto py-2 rounded-md mx-auto mb-16">
             
             <div className="w-[70%] xs:max-sm:w-[80%] xs:max-sm:py-4 py-8 mx-auto">
            <p className="text-center sm:max-md:text-[1.5rem] my-8 font-Poppins font-bold xs:max-sm:text-[1rem] md:max-lg:text-[2rem] text-[3rem]">Join and be a part of better health care system.</p>

            <div onClick={()=>{window.location.href='/createAccount'}} className="w-[50%] bg-blue-600 xs:max-md:w-[70%] xs:max-sm:py-2 cursor-pointer py-6 mx-auto cursor-pointer text-center b"><p className="font-Lexend text-[1.3rem] xs:max-sm:text-[1rem] text-white">Create an account</p></div>
            </div>







        </div>


        <Footer/>



        
        
        
        
        
        
        
        
        
        
        
        
        
        
        
        </>
    )




}




















export default About;









