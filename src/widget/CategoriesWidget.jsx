

import { useState } from "react"
import { CloseRounded } from "@mui/icons-material"
import NavBar from "../scenes/NavBar"





const Categories=()=>{

    const [categories,setCategories]=useState(1)










    return(
      <>
        <NavBar />

        <div className="relative bg-white  xs:max-ml:top-0 z-[999]  w-[100%]">
       




        <div className="flex w-[90%] mx-auto xs:max-md:grid-cols-3 xs:max-md:text-sm xs:max-md:gap-y-8 md:max-ml:grid-cols-4 md:max-ml:gap-y-8  grid py-2 px-4 grid-cols-8 mx-auto xs:max-md:justify-between flex-row">
        <div onClick={()=>setCategories(1)} className={`w-full ${categories===1 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm   font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ${categories ===1 && 'bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '} `}>Vitamins & Supplements</p></div>
        <div onClick={()=>setCategories(2)} className={`w-full ${categories===2 && 'relative'}`}>  <p className={`text-center   ml:max-lg:text-sm   font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ${categories ===2 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Gastrointestinal Health</p></div>
        <div onClick={()=>setCategories(3)} className={`w-full ${categories===3 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm   font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px] ${categories ===3 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Protein Products</p></div>
          
        <div onClick={()=>setCategories(4)} className={`w-full  ${categories===4 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm   font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px] ${categories ===4 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Optimal Weight</p></div>
        <div onClick={()=>setCategories(5)} className={`w-full  ${categories===5 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm   font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px] ${categories ===5 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Oral Health</p></div>
        <div onClick={()=>setCategories(6)} className={`w-full  ${categories===6 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm   font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px] ${categories ===6 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Brands</p></div>
        <div onClick={()=>setCategories(7)} className={`w-full  ${categories===7 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm   font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px] pb-[28px] ${categories ===7 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Skin Healthcare</p></div>
        <div  className='w-full '>  <p className={`text-center bg-emerald-500   font-Abel font-bold cursor-pointer w-[80%] text-lg text-white p-4 ml:max-lg:text-sm rounded-bl-xl rounded-tr-xl`}>Best Sellers</p></div>


        </div>














{   categories &&
        <div className="w-[95%]   mx-auto bg-white  z-[10]  h-auto ">
          
          






{ categories ===1 &&        
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins  text-[1.5rem]">Vitamins & Supplements</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
            <div className="flex flex-col gap-y-2">
              <p className="text-emerald-600  cursor-pointer  font-bold">Featured</p>
              <p className="font-Livvic cursor-pointer hover:underline text-smr:underline text-sm">GPL-1 Weight loss</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">GPL-1 Support</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Sale</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">New</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Trending</p>

            </div>

            <div className="flex flex-col gap-y-2">
              <p className="text-emerald-600 font-bold">Multivitamins </p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Men's Vitamins</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Women's MultiVitamins</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Children Multivitamins</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Whole Food Vitamins</p>
              

            </div>

            <div className="flex flex-col gap-y-2">
              <p className="text-emerald-600 font-bold">Letter Vitamins </p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin A</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin B</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin C</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin D</p>
              <p className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin E</p>
              

            </div>

            <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Minerals</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Magnesium</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Zinc</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Calcium</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Iron</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Potassium</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Shop By Concern</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Joint Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Women's Health</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Men's Health</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Healthy Aging</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Hair, Skin & Nails</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Bone Health</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Popular</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Super Greens & Superfoods</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Pet Care</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Pill Cases & Accessories</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">NAC - N-Acetyl-L-Cysteine</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Children's Health</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Children's Multivitamins</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Children's Supplements</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Children's Digestive Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Children's Immune Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>


            </div>


           </div>

}











{ categories ===2 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins  text-[1.5rem]">Gastrointestinal Health</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


           <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Featured</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">SALE</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">New</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Best Sellers</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Greens For Digestion</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">GLP-1 Weight Loss</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Probiotics</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Women's Probiotics</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Men's Probiotics</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Children's Probiotics</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Enzymes</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Digestive Enzymes</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Targeted Enzymes</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Other Enzymes</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Fiber</p>
  <p className="font-Livvic text-sm">Psyllium</p>
  <p className="font-Livvic text-sm">Other Fiber</p>
  <p className="font-Livvic text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Cleanse & Detox</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Total Body Cleanse</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Liver Cleanse</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Detox Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Detox Teas</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Other Digestive Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Milk Thistle</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Aloe Vera</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Charcoal</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>




            </div>


           </div>


}



































{ categories ===3 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins  text-[1.5rem]">Protein Products</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


            <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Brain Health</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Omega-3 Fatty Acids</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Phosphatidylserine</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Ginkgo Biloba</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Acetyl-L-Carnitine</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Heart Health</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Coenzyme Q10 (CoQ10)</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Omega-3 Fish Oil</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Hawthorn Berry</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">L-Arginine</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Digestive Health</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Probiotics</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Digestive Enzymes</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Fiber Supplements</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Peppermint Oil</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Skin Health</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Collagen Supplements</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Hyaluronic Acid</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin E Oil</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Retinol</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>



            </div>


           </div>


}


















{ categories ===4 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Optimal Weight</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


           <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Featured</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">GLP-1 Weight Loss</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">GLP-1 Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">50% Off The Vitamin Shoppe Favorites</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">New</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">SALE</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Metabolism Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Fat Burners & Thermogenics</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Stimulant-Free Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Blood Sugar Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">CLA</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Dietary Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Appetite Support</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Water Control</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Carb Blockers</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Meal Replacements</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Meal Replacement Powders</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Meal Replacement Bars</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Meal Replacement Shakes</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Exercise And Fitness</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Yoga</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Fitness Accessories</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shaker Cups</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Recovery</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Healthy Lifestyle</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Keto</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Mediterranean</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Low Carb</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Meal Prep Bags & Accessories</p>
  <p className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>




            </div>


           </div>


}




























{ categories ===5 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Oral Health</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


           <div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Featured</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Toothpaste Specials</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Mouthwash Deals</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Oral Care Kits</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">New Arrivals</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">SALE</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Toothpaste</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Whitening Toothpaste</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Fluoride-Free Toothpaste</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Sensitive Teeth Toothpaste</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Natural Toothpaste</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Mouthwash</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Antibacterial Mouthwash</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Alcohol-Free Mouthwash</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Fluoride Mouthwash</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Natural Mouthwash</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Dental Floss</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Waxed Dental Floss</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Unwaxed Dental Floss</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Flavored Dental Floss</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Dental Tape</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Oral Care Accessories</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Electric Toothbrushes</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Manual Toothbrushes</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Tongue Scrapers</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Dental Picks</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>





            </div>


           </div>


}







































{ categories ===7 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Skin Healthcare</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


           <div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Featured</p>
  <p class="font-Livvic text-sm">New Natural Arrivals</p>
  <p class="font-Livvic text-sm">Best Sellers</p>
  <p class="font-Livvic text-sm">Organic Skincare Favorites</p>
  <p class="font-Livvic text-sm">SALE</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Cleansers & Toners</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Gentle Cleansing Milk</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Balancing Face Toner</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Micellar Water</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Hydrating Facial Mists</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Moisturizers & Serums</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Organic Face Cream</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Hydrating Serums</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Anti-Aging Moisturizers</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Facial Oils</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Masks</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Clay Masks</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Sheet Masks</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Exfoliating Masks</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Moisturizing Gel Masks</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Beauty Supplements</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Collagen Supplements</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Biotin Supplements</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Hair, Skin & Nails Vitamins</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Antioxidant Blends</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Natural Extract Beauty</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Rosehip Seed Oil</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Tea Tree Oil</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Lavender Essential Oil</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Chamomile Extract</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>






            </div>


           </div>


}

















































{ categories ===6 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Brands</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          

           <div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Featured</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Gorilla Mind</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">G.O.A.T. Fuel</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Vital Proteins</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Ryse</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">BUM Energy</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">JOCKO FUEL</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">New</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Akasha Superfoods</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Humann</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Built Brands</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">BATTLE BARS</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">H-PROOF</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Popular</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Force Factor</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">EHP Labs</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Alani Nu</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Celsius</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Clean Simple Eats</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">RAW</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Our Family Of Brands</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">The Vitamin Shoppe</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">BodyTech & BodyTech Elite</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Plnt</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Vthrive</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">True Athlete</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">TrueYou</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Web Exclusives</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Codeage</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">HTWO Hydrogen Water</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Amen</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">ReadyWise</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Further Food</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Swolverine</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Earth-Friendly</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Garden Of Life</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Orgain</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">New Chapter</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Form Nutrition</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Olly</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">True Grace</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Vegan</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Ora Organic</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Future Kind</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">MaryRuth's</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Blessed</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">SunWarrior</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Huel</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Black-Led</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Body Complete Rx</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Peak And Valley</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Camille Rose</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Vibrant Health</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">SheaMoisture</p>
  <p class="font-Livvic cursor-pointer hover:underline text-sm">Alaffia</p>
</div>







            </div>


           </div>


}

























           




        </div>


}




        </div>
        </>









    )






}





export default Categories;
















