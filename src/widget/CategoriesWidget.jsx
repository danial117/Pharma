

import { useState } from "react"
import { CloseRounded } from "@mui/icons-material"
import NavBar from "../scenes/NavBar"





const Categories=()=>{

    const [categories,setCategories]=useState(1)










    return(
      <>
        <NavBar />

        <div className="relative mt-2 bg-white  xs:max-ml:top-0 z-[999]  w-[100%]">
       




        <div className="flex w-[90%] xs:max-ml:w-[95%] mx-auto xs:max-md:grid-cols-3 xs:max-md:text-sm xs:max-md:gap-y-12 md:max-ml:grid-cols-4 md:max-ml:gap-y-8  grid py-2 px-4 grid-cols-8 mx-auto xs:max-md:justify-between flex-row">
        <div onClick={()=>setCategories(1)} className={`w-full ${categories===1 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm xs:max-md:text-[14px]  font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ${categories ===1 && 'bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '} `}>Vitamins & Supplements</p></div>
        <div onClick={()=>setCategories(2)} className={`w-full ${categories===2 && 'relative'}`}>  <p className={`text-center   ml:max-lg:text-sm xs:max-md:text-[14px]  font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ${categories ===2 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Gastrointestinal Health</p></div>
        <div onClick={()=>setCategories(3)} className={`w-full ${categories===3 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm  xs:max-md:text-[14px] font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px]  ${categories ===3 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Targeted Health Solutions</p></div>
          
        <div onClick={()=>setCategories(4)} className={`w-full  ${categories===4 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm xs:max-md:text-[14px]  font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px]  ${categories ===4 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Optimal Weight</p></div>
        <div onClick={()=>setCategories(5)} className={`w-full  ${categories===5 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm xs:max-md:text-[14px]  font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px]  ${categories ===5 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Oral Health</p></div>
        <div onClick={()=>setCategories(6)} className={`w-full  ${categories===6 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm xs:max-md:text-[14px]  font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px]  ${categories ===6 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Brands</p></div>
        <div onClick={()=>setCategories(7)} className={`w-full  ${categories===7 && 'relative'}`}>  <p className={`text-center  ml:max-lg:text-sm xs:max-md:text-[14px]  font-Abel font-bold cursor-pointer w-[80%] text-lg text-emerald-900 ml:max-lg:pb-[20px]  ${categories ===7 && ' bg-white  absolute z-[12] scale-125  border-b-8 border-emerald-500 text-emerald-800 '}`}>Skin Healthcare</p></div>
        <div  className='w-full '>  <p className={`text-center bg-emerald-500   font-Abel font-bold cursor-pointer w-[80%] text-lg text-white p-4 ml:max-lg:text-sm xs:max-md:text-[14px] rounded-bl-xl rounded-tr-xl`}>Best Sellers</p></div>


        </div>














{   categories &&
        <div className="w-[95%]   mx-auto   z-[10]  h-auto ">
          
          





          { categories ===1 &&        
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins  text-[1.5rem]">Vitamins & Supplements</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
            

            <div className="flex flex-col gap-y-2">
              <p className="text-emerald-600 font-bold">Multivitamins </p>
              <p onClick={()=>{window.location.href='/category/Men-vitamins'}} className="font-Livvic cursor-pointer hover:underline text-sm">Men's Vitamins</p>
              <p onClick={()=>window.location.href='/category/Women-vitamins'} className="font-Livvic cursor-pointer hover:underline text-sm">Women's MultiVitamins</p>
              <p onClick={()=>window.location.href='/category/Children-vitamins'} className="font-Livvic cursor-pointer hover:underline text-sm">Children Multivitamins</p>
              <p onClick={()=>window.location.href='/category/Vitamins'} className="font-Livvic cursor-pointer hover:underline text-sm">All Vitamins</p>
              

            </div>

            <div className="flex flex-col gap-y-2">
              <p  className="text-emerald-600 font-bold">Letter Vitamins </p>
              <p onClick={()=>window.location.href='/category/Vitamin-A'} className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin A</p>
              <p onClick={()=>window.location.href='/category/Vitamin-B'} className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin B</p>
              <p onClick={()=>window.location.href='/category/Vitamin-C'} className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin C</p>
              <p onClick={()=>window.location.href='/category/Vitamin-D'} className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin D</p>
              <p onClick={()=>window.location.href='/category/Vitamin-E'} className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin E</p>
              

            </div>

            <div className="flex flex-col gap-y-2">
  <p  className="text-emerald-600 font-bold">Minerals</p>
  <p onClick={()=>window.location.href='/category/Magnesium'} className="font-Livvic cursor-pointer hover:underline text-sm">Magnesium</p>
  <p onClick={()=>window.location.href='/category/Zinc'} className="font-Livvic cursor-pointer hover:underline text-sm">Zinc</p>
  <p onClick={()=>window.location.href='/category/Calcium'} className="font-Livvic cursor-pointer hover:underline text-sm">Calcium</p>
  <p onClick={()=>window.location.href='/category/Iron'} className="font-Livvic cursor-pointer hover:underline text-sm">Iron</p>
  <p onClick={()=>window.location.href='/category/Potassium'} className="font-Livvic cursor-pointer hover:underline text-sm">Potassium</p>
  <p onClick={()=>window.location.href='/category/Minerals'} className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Shop By Concern</p>
  <p onClick={()=>window.location.href='/category/joint-supports'} className="font-Livvic cursor-pointer hover:underline text-sm">Joint Support</p>
  <p onClick={()=>window.location.href='/category/Women-joint'} className="font-Livvic cursor-pointer hover:underline text-sm">Women's Health</p>
  <p onClick={()=>window.location.href='/category/Men-joint'} className="font-Livvic cursor-pointer hover:underline text-sm">Men's Health</p>
  <p onClick={()=>window.location.href='/category/Healthy-joint'} className="font-Livvic cursor-pointer hover:underline text-sm">Healthy Aging</p>
  <p onClick={()=>window.location.href='/category/Bone-health'} className="font-Livvic cursor-pointer hover:underline text-sm">Bone Health</p>
</div>



<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Children's Health</p>
  <p onClick={()=>window.location.href='/category/Children-vitamins'} className="font-Livvic cursor-pointer hover:underline text-sm">Children's Multivitamins</p>
  <p onClick={()=>window.location.href='/category/Childern-supplements'} className="font-Livvic cursor-pointer hover:underline text-sm">Children's Supplements</p>
  <p onClick={()=>window.location.href='/category/Children-digestive-supplements'} className="font-Livvic cursor-pointer hover:underline text-sm">Children's Digestive Support</p>
  <p onClick={()=>window.location.href='/category/Children-immune-supplements'} className="font-Livvic cursor-pointer hover:underline text-sm">Children's Immune Support</p>
  <p onClick={()=>window.location.href='/category/Childern-supplements'} className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>


            </div>


           </div>

}











{ categories ===2 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins  text-[1.5rem]">Gastrointestinal Health</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


       



<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Probiotics</p>
  <p onClick={()=>window.location.href='/category/Women-probiotics'} className="font-Livvic cursor-pointer hover:underline text-sm">Women's Probiotics</p>
  <p onClick={()=>window.location.href='/category/Men-probiotics'} className="font-Livvic cursor-pointer hover:underline text-sm">Men's Probiotics</p>
  <p onClick={()=>window.location.href='/category/Childern-probiotics'} className="font-Livvic cursor-pointer hover:underline text-sm">Children's Probiotics</p>
  <p onClick={()=>window.location.href='/category/Probiotics'} className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Enzymes</p>
  <p onClick={()=>window.location.href='/category/Digestive-enzymes'} className="font-Livvic cursor-pointer hover:underline text-sm">Digestive Enzymes</p>
  <p onClick={()=>window.location.href='/category/Targeted-enzymes'} className="font-Livvic cursor-pointer hover:underline text-sm">Targeted Enzymes</p>
  <p onClick={()=>window.location.href='/category/Enzymes'} className="font-Livvic cursor-pointer hover:underline text-sm">Other Enzymes</p>
  <p onClick={()=>window.location.href='/category/Enzymes'} className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Fiber</p>
  <p onClick={()=>window.location.href='/category/Psyllium'} className="font-Livvic hover:underline cursor-pointer text-sm">Psyllium</p>
  <p onClick={()=>window.location.href='/category/Fibers'} className="font-Livvic hover:underline cursor-pointer text-sm">Other Fiber</p>
  <p onClick={()=>window.location.href='/category/Fibers'} className="font-Livvic hover:underline cursor-pointer text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Cleanse & Detox</p>
  <p onClick={()=>window.location.href='/category/Body-cleansers'} className="font-Livvic cursor-pointer hover:underline text-sm">Total Body Cleanse</p>
  <p onClick={()=>window.location.href='/category/Liver-cleansers'} className="font-Livvic cursor-pointer hover:underline text-sm">Liver Cleanse</p>
  <p onClick={()=>window.location.href='/category/Detox-supports'} className="font-Livvic cursor-pointer hover:underline text-sm">Detox Support</p>
  <p onClick={()=>window.location.href='/category/Detox-teas'} className="font-Livvic cursor-pointer hover:underline text-sm">Detox Teas</p>
  <p onClick={()=>window.location.href='/category/Body-detoxs-and-cleansers'} className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Other Digestive Support</p>
  <p onClick={()=>window.location.href='/category/Milk-thistle'} className="font-Livvic cursor-pointer hover:underline text-sm">Milk Thistle</p>
  <p onClick={()=>window.location.href='/category/Aloe-vera'} className="font-Livvic cursor-pointer hover:underline text-sm">Aloe Vera</p>
  <p onClick={()=>window.location.href='/category/Charcoal'} className="font-Livvic cursor-pointer hover:underline text-sm">Charcoal</p>
  <p onClick={()=>window.location.href='/category/Digestive-supports'} className="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>




            </div>


           </div>


}



































{ categories ===3 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins  text-[1.5rem]">Targeted Health Solutions</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


           <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Brain Health</p>
  <p onClick={() => window.location.href = '/category/Omega-3-Fatty-Acids'} className="font-Livvic cursor-pointer hover:underline text-sm">Omega-3 Fatty Acids</p>
  <p onClick={() => window.location.href = '/category/Phosphatidylserine'} className="font-Livvic cursor-pointer hover:underline text-sm">Phosphatidylserine</p>
  <p onClick={() => window.location.href = '/category/Ginkgo-Biloba'} className="font-Livvic cursor-pointer hover:underline text-sm">Ginkgo Biloba</p>
  <p onClick={() => window.location.href = '/category/Acetyl-L-Carnitine'} className="font-Livvic cursor-pointer hover:underline text-sm">Acetyl-L-Carnitine</p>
  <p onClick={() => window.location.href = '/category/Brain-Health'} className="font-Livvic cursor-pointer hover:underline text-sm">Brain Health</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Heart Health</p>
  <p onClick={() => window.location.href = '/category/Coenzyme-Q10'} className="font-Livvic cursor-pointer hover:underline text-sm">Coenzyme Q10</p>
  <p onClick={() => window.location.href = '/category/Omega-3-Fish-Oil'} className="font-Livvic cursor-pointer hover:underline text-sm">Omega-3 Fish Oil</p>
  <p onClick={() => window.location.href = '/category/Hawthorn-Berry'} className="font-Livvic cursor-pointer hover:underline text-sm">Hawthorn Berry</p>
  <p onClick={() => window.location.href = '/category/L-Arginine'} className="font-Livvic cursor-pointer hover:underline text-sm">L-Arginine</p>
  <p onClick={() => window.location.href = '/category/Heart-Health'} className="font-Livvic cursor-pointer hover:underline text-sm">Heart Health</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Digestive Health</p>
  <p onClick={() => window.location.href = '/category/Probiotics'} className="font-Livvic cursor-pointer hover:underline text-sm">Probiotics</p>
  <p onClick={() => window.location.href = '/category/Digestive-Enzymes'} className="font-Livvic cursor-pointer hover:underline text-sm">Digestive Enzymes</p>
  <p onClick={() => window.location.href = '/category/Fiber-Supplements'} className="font-Livvic cursor-pointer hover:underline text-sm">Fiber Supplements</p>
  <p onClick={() => window.location.href = '/category/Peppermint-Oil'} className="font-Livvic cursor-pointer hover:underline text-sm">Peppermint Oil</p>
  <p onClick={() => window.location.href = '/category/Digestive-Health'} className="font-Livvic cursor-pointer hover:underline text-sm">Digestive Health</p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Skin Health</p>
  <p onClick={() => window.location.href = '/category/Collagen-Supplements'} className="font-Livvic cursor-pointer hover:underline text-sm">Collagen Supplements</p>
  <p onClick={() => window.location.href = '/category/Hyaluronic-Acid'} className="font-Livvic cursor-pointer hover:underline text-sm">Hyaluronic Acid</p>
  <p onClick={() => window.location.href = '/category/Vitamin-E-Oil'} className="font-Livvic cursor-pointer hover:underline text-sm">Vitamin E Oil</p>
  <p onClick={() => window.location.href = '/category/Retinol'} className="font-Livvic cursor-pointer hover:underline text-sm">Retinol</p>
  <p onClick={() => window.location.href = '/category/Skin-Health'} className="font-Livvic cursor-pointer hover:underline text-sm">Skin Health</p>
</div>



            </div>


           </div>


}


















{ categories ===4 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Optimal Weight</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


   
           <div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Metabolism supports</p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Fat-burners-and-thermongrnics'}
  >
    Fat burners and thermongrnics
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Stimulant-free-support'}
  >
    Stimulant free support
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/CLA'}
  >
    CLA
  </p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Dietary supports</p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Appetite-supports'}
  >
    Appetite supports
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Water-control'}
  >
    Water control
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Carb-blockers'}
  >
    Carb blockers
  </p>
</div>

<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Meal replacements</p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Meal-replacement-powders'}
  >
    Meal replacement powders
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Meal-replacement-bars'}
  >
    Meal replacement bars
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Meal-replacement-shakes'}
  >
    Meal replacement shakes
  </p>
</div>



<div className="flex flex-col gap-y-2">
  <p className="text-emerald-600 font-bold">Healthy lifestyle</p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Keto'}
  >
    Keto
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Low-carb'}
  >
    Low carb
  </p>
  <p
    className="font-Livvic cursor-pointer hover:underline text-sm"
    onClick={() => window.location.href = '/category/Mediterranean'}
  >
    Mediterranean
  </p>
</div>




            </div>


           </div>


}




























{ categories ===5 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Oral Health</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


        

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Toothpaste</p>
  <p onClick={()=>window.location.href='/category/Whitening-toothpastes'} class="font-Livvic cursor-pointer hover:underline text-sm">Whitening Toothpaste</p>
  <p onClick={()=>window.location.href='/category/Flouride-free-toothpastes'} class="font-Livvic cursor-pointer hover:underline text-sm">Fluoride-Free Toothpaste</p>
  <p onClick={()=>window.location.href='/category/Sensitive-teeth-toothpastes'} class="font-Livvic cursor-pointer hover:underline text-sm">Sensitive Teeth Toothpaste</p>
  <p onClick={()=>window.location.href='/category/Natural-toothpastes'} class="font-Livvic cursor-pointer hover:underline text-sm">Natural Toothpaste</p>
  <p onClick={()=>window.location.href='/category/Toothpastes'} class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Mouthwash</p>
  <p onClick={()=>window.location.href='/category/Antibacterial-mouthwashers'} class="font-Livvic cursor-pointer hover:underline text-sm">Antibacterial Mouthwash</p>
  <p onClick={()=>window.location.href='/category/Alcohol-free-mouthwashers'} class="font-Livvic cursor-pointer hover:underline text-sm">Alcohol-Free Mouthwash</p>
  <p onClick={()=>window.location.href='/category/Flouride-mouthwashers'} class="font-Livvic cursor-pointer hover:underline text-sm">Fluoride Mouthwash</p>
  <p onClick={()=>window.location.href='/category/Natural-mouthwashers'} class="font-Livvic cursor-pointer hover:underline text-sm">Natural Mouthwash</p>
  <p onClick={()=>window.location.href='/category/Mouthwashers'} class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Dental Floss</p>
  <p onClick={()=>window.location.href='/category/Waxed-dental-floss'} class="font-Livvic cursor-pointer hover:underline text-sm">Waxed Dental Floss</p>
  <p onClick={()=>window.location.href='/category/Unwaxed-dental-floss'} class="font-Livvic cursor-pointer hover:underline text-sm">Unwaxed Dental Floss</p>
  <p onClick={()=>window.location.href='/category/Flavored-dental-floss'} class="font-Livvic cursor-pointer hover:underline text-sm">Flavored Dental Floss</p>
  <p onClick={()=>window.location.href='/category/Dental-tape'} class="font-Livvic cursor-pointer hover:underline text-sm">Dental Tape</p>
  <p onClick={()=>window.location.href='/category/Dental-floss'} class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Oral Care Accessories</p>
  <p onClick={()=>window.location.href='/category/Electric-toothbrushes'} class="font-Livvic cursor-pointer hover:underline text-sm">Electric Toothbrushes</p>
  <p onClick={()=>window.location.href='/category/Manual-toothbrushes'} class="font-Livvic cursor-pointer hover:underline text-sm">Manual Toothbrushes</p>
  <p onClick={()=>window.location.href='/category/Tongue-toothbrushes'} class="font-Livvic cursor-pointer hover:underline text-sm">Tongue Scrapers</p>
  <p onClick={()=>window.location.href='/category/Dental-picks'} class="font-Livvic cursor-pointer hover:underline text-sm">Dental Picks</p>
  <p onClick={()=>window.location.href='/category/Oral-care-accessories'} class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>





            </div>


           </div>


}







































{ categories ===7 &&
           <div className="w-full p-4">
           <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Skin Healthcare</p>
           <div className=" gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16  sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">
          


        

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Cleansers & Toners</p>
  <p onClick={()=>window.location.href='/category/Cleansing-milk'} class="font-Livvic cursor-pointer hover:underline text-sm">Gentle Cleansing Milk</p>
  <p onClick={()=>window.location.href='/category/Face-toners'} class="font-Livvic cursor-pointer hover:underline text-sm">Balancing Face Toner</p>
  <p onClick={()=>window.location.href='/category/Micellar-water'} class="font-Livvic cursor-pointer hover:underline text-sm">Micellar Water</p>
  <p onClick={()=>window.location.href='/category/Hydrating-facial-mist'} class="font-Livvic cursor-pointer hover:underline text-sm">Hydrating Facial Mists</p>
  <p onClick={()=>window.location.href='/category/Cleansers-and-toners'} class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Moisturizers & Serums</p>
  <p onClick={()=>window.location.href='/category/Organic-face-creams'} class="font-Livvic cursor-pointer hover:underline text-sm">Organic Face Cream</p>
  <p onClick={()=>window.location.href='/category/Hydrating-serums'} class="font-Livvic cursor-pointer hover:underline text-sm">Hydrating Serums</p>
  <p onClick={()=>window.location.href='/category/Anti-aging-moisturizers'} class="font-Livvic cursor-pointer hover:underline text-sm">Anti-Aging Moisturizers</p>
  <p onClick={()=>window.location.href='/category/Facial-oil'} class="font-Livvic cursor-pointer hover:underline text-sm">Facial Oils</p>
  <p onClick={()=>window.location.href='/category/Moisturizers-serums'} class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p  class="text-emerald-600 font-bold">Masks</p>
  <p onClick={()=>window.location.href='/category/Clay-masks'} class="font-Livvic cursor-pointer hover:underline text-sm">Clay Masks</p>
  <p onClick={()=>window.location.href='/category/Sheet-masks'} class="font-Livvic cursor-pointer hover:underline text-sm">Sheet Masks</p>
  <p onClick={()=>window.location.href='/category/Exfoliating-masks'} class="font-Livvic cursor-pointer hover:underline text-sm">Exfoliating Masks</p>
  <p onClick={()=>window.location.href='/category/Moisturizing-gel-masks'} class="font-Livvic cursor-pointer hover:underline text-sm">Moisturizing Gel Masks</p>
  <p onClick={()=>window.location.href='/category/Face-masks'} class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Beauty Supplements</p>
  <p onClick={()=>window.location.href='/category/Collagen-supplements'}  class="font-Livvic cursor-pointer hover:underline text-sm">Collagen Supplements</p>
  <p onClick={()=>window.location.href='/category/Biotin-supplements'}  class="font-Livvic cursor-pointer hover:underline text-sm">Biotin Supplements</p>
  <p onClick={()=>window.location.href='/category/Antioxidant-blends'}  class="font-Livvic cursor-pointer hover:underline text-sm">Antioxidant Blends</p>
  <p onClick={()=>window.location.href='/category/Beauty-supplements'}  class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>

<div class="flex flex-col gap-y-2">
  <p class="text-emerald-600 font-bold">Natural Extract Beauty</p>
  <p onClick={()=>window.location.href='/category/Rosehip-seed-oil'}  class="font-Livvic cursor-pointer hover:underline text-sm">Rosehip Seed Oil</p>
  <p onClick={()=>window.location.href='/category/Tea-tree-oil'}  class="font-Livvic cursor-pointer hover:underline text-sm">Tea Tree Oil</p>
  <p onClick={()=>window.location.href='/category/Lavender-essential-oil'}  class="font-Livvic cursor-pointer hover:underline text-sm">Lavender Essential Oil</p>
  <p onClick={()=>window.location.href='/category/Chamomile-oil'}  class="font-Livvic cursor-pointer hover:underline text-sm">Chamomile Extract</p>
  <p onClick={()=>window.location.href='/category/Natural-beauty-extracts'}  class="font-Livvic cursor-pointer hover:underline text-sm">Shop All</p>
</div>






            </div>


           </div>


}















































{ categories ===6 &&
  <div className="w-full p-4">
    <p className="font-bold text-emerald-700 py-8 font-Poppins text-[1.5rem]">Brands</p>
    <div className="gap-x-6 gap-y-4 sm:max-md:grid-cols-3 xs:max-sm:grid-cols-2 xs:max-sm:gap-y-16 sm:max-md:gap-y-24 md:max-ml:gap-y-18 grid grid-cols-4 mx-auto">

      <div className="flex flex-col gap-y-2">
        <p className="text-emerald-600 font-bold">New</p>
        <p onClick={() => window.location.href='/category/Designs-for-Health'} className="font-Livvic cursor-pointer hover:underline text-sm">Designs for Health</p>
        <p onClick={() => window.location.href='/category/Pure-Encapsulations'} className="font-Livvic cursor-pointer hover:underline text-sm">Pure Encapsulations</p>
        <p onClick={() => window.location.href='/category/Thorn'} className="font-Livvic cursor-pointer hover:underline text-sm">Thorne Research</p>
        <p onClick={() => window.location.href='/category/Orthomolecular-Products'} className="font-Livvic cursor-pointer hover:underline text-sm">Orthomolecular Medicine</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-emerald-600 font-bold">Popular</p>
        <p onClick={() => window.location.href='/category/Metagenics'} className="font-Livvic cursor-pointer hover:underline text-sm">Metagenics</p>
        <p onClick={() => window.location.href='/category/Xymogen'} className="font-Livvic cursor-pointer hover:underline text-sm">Xymogen</p>
        <p onClick={() => window.location.href='/category/Klaire-Labs/SFI-Health'} className="font-Livvic cursor-pointer hover:underline text-sm">Klaire Labs</p>
        <p onClick={() => window.location.href='/category/Jarrow-Formulas'} className="font-Livvic cursor-pointer hover:underline text-sm">Jarrow Formulas</p>
        <p onClick={() => window.location.href='/category/Life-Extension'} className="font-Livvic cursor-pointer hover:underline text-sm">Life Extension</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-emerald-600 font-bold">Our Family Of Brands</p>
        <p onClick={() => window.location.href='/category/Douglas-Laboratories'} className="font-Livvic cursor-pointer hover:underline text-sm">Douglas Laboratories</p>
        <p onClick={() => window.location.href='/category/Standard-Process'} className="font-Livvic cursor-pointer hover:underline text-sm">Standard Process</p>
        <p onClick={() => window.location.href='/category/Nutramax-Labs'} className="font-Livvic cursor-pointer hover:underline text-sm">Nutramax Labs</p>       
        <p onClick={() => window.location.href='/category/Enzymedica'} className="font-Livvic cursor-pointer hover:underline text-sm">Enzymedica</p>
        <p onClick={() => window.location.href='/category/Vital-Nutrients'} className="font-Livvic cursor-pointer hover:underline text-sm">Vital Nutrients</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-emerald-600 font-bold">Web Exclusives</p>
        <p onClick={() => window.location.href='/category/BioMatrix'} className="font-Livvic cursor-pointer hover:underline text-sm">BioMatrix</p>
        <p onClick={() => window.location.href='/category/Designs-for-Health'} className="font-Livvic cursor-pointer hover:underline text-sm">Designs for Health</p>
        <p onClick={() => window.location.href='/category/Pterostilbene'} className="font-Livvic cursor-pointer hover:underline text-sm">Pterostilbene</p>
        <p onClick={() => window.location.href='/category/Sovereign-Silver'} className="font-Livvic cursor-pointer hover:underline text-sm">Sovereign Silver</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-emerald-600 font-bold">Earth-Friendly</p>
        <p onClick={() => window.location.href='/category/Garden-of-Life'} className="font-Livvic cursor-pointer hover:underline text-sm">Garden of Life</p>
        <p onClick={() => window.location.href='/category/Natures-Way'} className="font-Livvic cursor-pointer hover:underline text-sm">Nature's Way</p>
        <p onClick={() => window.location.href='/category/New-Chapter'} className="font-Livvic cursor-pointer hover:underline text-sm">New Chapter</p>
        <p onClick={() => window.location.href='/category/MegaFood'} className="font-Livvic cursor-pointer hover:underline text-sm">MegaFood</p>
        <p onClick={() => window.location.href='/category/Vital-Nutrients'} className="font-Livvic cursor-pointer hover:underline text-sm">Vital Nutrients</p>
        <p onClick={() => window.location.href='/category/Herb-Pharm'} className="font-Livvic cursor-pointer hover:underline text-sm">Herb Pharm</p>
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="text-emerald-600 font-bold">Vegan</p>
        <p onClick={() => window.location.href='/category/Sunwarrior'} className="font-Livvic cursor-pointer hover:underline text-sm">Sunwarrior</p>
        <p onClick={() => window.location.href='/category/Deva'} className="font-Livvic cursor-pointer hover:underline text-sm">Deva</p>
        <p onClick={() => window.location.href='/category/Garden-of-Life'} className="font-Livvic cursor-pointer hover:underline text-sm">Garden of Life</p>
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
















