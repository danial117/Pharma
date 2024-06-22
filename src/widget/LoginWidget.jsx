




import { useMediaQuery } from "@mui/material";




const LoginWidget=({loginWidget})=>{
     
    
    

    return(
        <>
        
{ 

loginWidget &&

<section>

    <div className="w-[30%] bg-white rounded-lg p-6 absolute top-[10%] right-[15%] z-[999]  ">
     <div>
        <p className="font-Lexend text-[1.4rem]">Login</p>
        <p className="font-Poppins text-md">Welcome Back! Please enter your details</p>

        <div>
            <p className="my-2 font-Lexend text-lg">Email:</p>
            <div className="w-[full] border-2 py-2 rounded-md border-gray-300">
                <input className="mx-2 focus:outline-none"  placeholder="Enter email"/>
            </div>
        </div>

        <div>
            <p className="my-2 font-Lexend text-lg">Password:</p>
            <div className="w-[full] border-2 py-2 rounded-md border-gray-300">
                <input className="mx-2 focus:outline-none"  placeholder=".........."/>
            </div>
        </div>

        <div className="flex my-4 flex-row gap-x-2">
            <div className="border-2 border-gray-300 px-4 rounded-lg"></div>
            <p className="font-Lexend mt-[2px]">Remember me</p>

        </div>

        <button className="text-center w-full font-Poppins text-white bg-emerald-500 py-2 rounded-full">Log in</button>


      <div>
        <div className="my-4 pb-2 w-full border-b-2 border-gray-200">
            <p className="text-emerald-700 text-center font-Lexend">Forgot Password?</p>


        </div>

        <div className="my-4">
            <p className="font-Lexend text-gray-400 text-center">Don't have an account ?</p>
            <p  className="font-Poppins text-center text-gray-800">Sign up</p>

        </div>




        </div>


        </div>




    </div>



</section>

}

</>
    )
}






export default LoginWidget;






