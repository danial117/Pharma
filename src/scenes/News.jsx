
import Footer from "./Footer"
import NavBar from "./NavBar"
import { KeyboardArrowLeftRounded,KeyboardArrowRightRounded,AccessTimeRounded } from "@mui/icons-material"








const NewsBlog=()=>{



    return(
    <>
    <NavBar />
    <div >

        <div className="flex md:max-lg:w-[100%] sm:max-md:w-[80%] w-[90%] xs:max-md:w-[100%] p-8 xs:max-md:gap-y-12 gap-x-8 ml-auto xs:max-md:mx-auto xs:max-md:flex-col flex-row">

            <div className="md:max-lg:basis-[50%]  basis-[60%]">


            <div className="w-[90%]  mx-auto">
            <img src={require('./1.jpeg')} className="h-[500px] w-[100%]" alt="Example Image" />
            <div className="flex my-2 flex-row gap-x-6">
                    <button className="font-Poppins bg-black p-2 rounded-full text-xs text-white">Genetics</button>
                    <div className="flex my-auto flex-row gap-x-2">
                        <AccessTimeRounded style={{fontSize:'22px'}} />
                        <p className="text-xs my-auto font-Lexend">24 July,2024</p>

                    </div>

                 </div>
            <p className="font-Lexend my-2 xs:max-md:text-sm font-bold text-xl">The Not Company: A Maker of dairy Produt and plant based subsititution in China.</p>

            </div>

            </div>





            <div className="w-full basis-[40%] md:max-lg:basis-[50%] mx-auto">
               
             <div className="flex xs:max-md:my-6 flex-row justify-between">
                <p className="font-Abel xs:max-md:text-[1.4rem] text-[2rem] mb-4">Recent News:</p>

                <div className="flex cursor-pointer flex-row gap-x-6">
                    <div className="bg-black flex justify-center w-[40px] h-[40px] text-white">
                        <KeyboardArrowLeftRounded style={{fontSize:'40px',margin:'auto'}} />
                    </div>

                    <div className="bg-black cursor-pointer flex justify-center w-[40px] h-[40px] text-white">
                        <KeyboardArrowRightRounded style={{fontSize:'40px',margin:'auto'}} />
                    </div>

                </div>
             
            </div>



                <div className="flex flex-col xs:max-md:gap-y-6 gap-y-4">


                <div className="w-full flex flex-row gap-x-4 ">
                <img src={require('./1.jpeg')} className="h-[100px] w-[100px]" alt="Example Image" />

                <div className="flex flex-col gap-y-2">
                 <div className="flex xs:max-md:gap-x-2 flex-row gap-x-6">
                    <button className="font-Poppins xs:max-md:text-[8px] bg-black p-2 rounded-full text-xs text-white">Genetics</button>
                    <div className="flex my-auto flex-row gap-x-2">
                        <AccessTimeRounded style={{fontSize:'22px'}} />
                        <p className="text-xs xs:max-md:text-[8px] my-auto font-Lexend">24 July,2024</p>

                    </div>

                 </div>
                <p className="font-Lexend text-md xs:max-md:text-xs ">China is affecting the crops by usig GMO technology...</p>
                </div>

                </div>




                <div className="w-full flex flex-row gap-x-4 ">
                <img src={require('./1.jpeg')} className="h-[100px] w-[100px]" alt="Example Image" />

                <div className="flex flex-col gap-y-2">
                 <div className="flex xs:max-md:gap-x-2 flex-row gap-x-6">
                    <button className="font-Poppins xs:max-md:text-[8px] bg-black p-2 rounded-full text-xs text-white">Genetics</button>
                    <div className="flex my-auto flex-row gap-x-2">
                        <AccessTimeRounded style={{fontSize:'22px'}} />
                        <p className="text-xs xs:max-md:text-[8px] my-auto font-Lexend">24 July,2024</p>

                    </div>

                 </div>
                <p className="font-Lexend text-md xs:max-md:text-xs ">China is affecting the crops by usig GMO technology...</p>
                </div>

                </div>







                <div className="w-full flex flex-row gap-x-4 ">
                <img src={require('./1.jpeg')} className="h-[100px] w-[100px]" alt="Example Image" />

                <div className="flex flex-col gap-y-2">
                 <div className="flex xs:max-md:gap-x-2 flex-row gap-x-6">
                    <button className="font-Poppins xs:max-md:text-[8px] bg-black p-2 rounded-full text-xs text-white">Genetics</button>
                    <div className="flex my-auto flex-row gap-x-2">
                        <AccessTimeRounded style={{fontSize:'22px'}} />
                        <p className="text-xs xs:max-md:text-[8px] my-auto font-Lexend">24 July,2024</p>

                    </div>

                 </div>
                <p className="font-Lexend text-md xs:max-md:text-xs ">China is affecting the crops by usig GMO technology...</p>
                </div>

                </div>








                    
                </div>




            </div>






        </div>





    </div>








   
   <Footer />
   
    
    
    </>
    )



}




export default NewsBlog



