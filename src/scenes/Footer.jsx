

import Facebook from "../assets/svg/facebook"
import Linkedin from "../assets/svg/Linkedin"
import Upwork from "../assets/svg/upwork"
import Fiveer from "../assets/svg/fiveer"

import {LocalPhoneRounded,EmailRounded} from '@mui/icons-material'
import { useCMS } from '../cartContext/CmsContext'











const Footer=()=>{
    const cmsData = useCMS();

    return(
        <>
        

    <section className="">

<div className="bg-teal-900   h-auto w-full">

    <div className="w-[60%] xs:max-sm:w-[90%] xs:max-sm:grid-cols-2 xs:max-sm:gap-y-12 sm:max-md:w-[80%] border-b-[1px] border-gray-200 py-8 mx-auto gap-x-12 grid grid-cols-3">


        <div className="flex flex-col gap-y-2">
            <p className="font-bold  text-white text-lg font-Lexend">Quick links</p>
            <p onClick={()=>{window.location.href='/'}} className="text-white cursor-pointer font-Poppins text-xs">HomePage</p>
            <p onClick={()=>{window.location.href='/createAccount'}} className="text-white cursor-pointer font-Poppins text-xs">Account</p>
            <p onClick={()=>{window.location.href='/contact'}} className="text-white cursor-pointer font-Poppins text-xs">Contacts</p>
            <p onClick={()=>{window.location.href='/about'}} className="text-white cursor-pointer font-Poppins text-xs">Info</p>

        </div>


        <div className="flex flex-col gap-y-2">
            <p onClick={()=>{window.location.href='/about'}} className="font-bold  cursor-pointer text-white text-lg font-Lexend">About us</p>
            <p onClick={()=>{window.location.href='/order'}} className="text-white  cursor-pointer font-Poppins text-xs">Order</p>
            <p onClick={()=>{window.location.href='/userOrders'}} className="text-white  cursor-pointer font-Poppins text-xs">Purchase</p>
            <p onClick={()=>{window.location.href='/'}} className="text-white  cursor-pointer font-Poppins text-xs">Privacy Policy</p>
            <p onClick={()=>{window.location.href='/'}} className="text-white cursor-pointer  font-Poppins text-xs">Terms of Sales</p>

        </div>



        <div className="flex flex-col gap-y-2">

            <p className="font-bold text-white text-lg font-Lexend">Contact</p>
          

            <div className="flex flex-row gap-x-2">
                <div className="text-white">
                    <EmailRounded />
                </div>

                <p className="text-white font-Abel">{cmsData.FooterContent?.email}</p>

            </div>
vcfcvvc            <p className="my-2 text-white -mb-2 text-lg font-Lexend">Follow Us</p>
            <div className="flex flex-row gap-x-2">
                <a className="cursor-pointer" href={cmsData?.FooterContent?.facebookLink} target="_blank" rel="noopener noreferrer">
        <Facebook />
      </a>
      <a className="cursor-pointer" href={cmsData?.FooterContent?.twitterLink} target="_blank" rel="noopener noreferrer">
        <Upwork />
      </a>
      <a className="cursor-pointer" href={cmsData?.FooterContent?.youtubeLink} target="_blank" rel="noopener noreferrer">
        <Linkedin />
      </a>
      <a className="cursor-pointer" href={cmsData?.FooterContent?.instagramLink} target="_blank" rel="noopener noreferrer">
        <Fiveer />
      </a>
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





