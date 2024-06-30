
import NavBar from "./NavBar"
import Footer from "./Footer"






export const UserOrder=()=>{




    return(
        
        <>
        <NavBar />
        <div className="h-[500px] p-6">

            <div>
                <p className="font-Lexend text-[2rem]">My Orders</p>
                <div className="flex gap-x-14 p-6 flex-row">
                    <p className='text-gray-800 font-Lexend'>Orders</p>
                    <p className='text-gray-800 font-Lexend'>Items</p>
                    <p className='text-gray-800 font-Lexend'>Created On</p>
                    <p className='text-gray-800 font-Lexend'>Payment</p>
                    <p className='text-gray-800 font-Lexend'>Status</p>

                </div>
            </div>

        </div>
        
        
        <Footer />
        </>

    )







}












