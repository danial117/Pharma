

import Facebook from "../assets/svg/facebook"
import Linkedin from "../assets/svg/Linkedin"
import Upwork from "../assets/svg/upwork"
import Fiveer from "../assets/svg/fiveer"

import {LocalPhoneRounded,EmailRounded} from '@mui/icons-material'















const Footer=()=>{


    return(
        <>
        

    <section>

<div className="bg-teal-900   h-auto w-full">

    <div className="w-[60%] xs:max-sm:w-[90%] xs:max-sm:grid-cols-2 xs:max-sm:gap-y-12 sm:max-md:w-[80%] border-b-[1px] border-gray-200 py-8 mx-auto gap-x-12 grid grid-cols-3">


        <div className="flex flex-col gap-y-2">
            <p className="font-bold text-white text-lg font-Lexend">Quick links</p>
            <p className="text-white font-Poppins text-xs">HomePage</p>
            <p className="text-white font-Poppins text-xs">Pro</p>
            <p className="text-white font-Poppins text-xs">Contacts</p>
            <p className="text-white font-Poppins text-xs">Info</p>

        </div>


        <div className="flex flex-col gap-y-2">
            <p className="font-bold text-white text-lg font-Lexend">About us</p>
            <p className="text-white font-Poppins text-xs">Order</p>
            <p className="text-white font-Poppins text-xs">Purchase</p>
            <p className="text-white font-Poppins text-xs">Privacy Policy</p>
            <p className="text-white font-Poppins text-xs">Terms of Sales</p>

        </div>



        <div className="flex flex-col gap-y-2">

            <p className="font-bold text-white text-lg font-Lexend">Contact</p>
            <div className="flex flex-row gap-x-2">
                <div className="text-white">
                    <LocalPhoneRounded />
                </div>

                <p className="text-white font-Abel">123 456 7890</p>

            </div>

            <div className="flex flex-row gap-x-2">
                <div className="text-white">
                    <EmailRounded />
                </div>

                <p className="text-white font-Abel">abc@gmail.com</p>

            </div>

            <p className="my-2 text-white -mb-2 text-lg font-Lexend">Follow Us</p>
            <div className="flex flex-row gap-x-2">
                <Facebook />
                <Upwork />
                <Linkedin/>
                <Fiveer />

            </div>

           

        </div>

       
    </div>



    <div className=" py-6">
        <p className="text-center font-Livvic text-xs text-gray-400">@2024 Info vit.All rights reserved.</p>

    </div>










</div>









</section>




</>
    )
}





export default Footer;





