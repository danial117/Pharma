import { useEffect, useState } from "react";
import Footer from "./Footer";
import NavBar from "./NavBar";
import { KeyboardArrowLeftRounded, KeyboardArrowRightRounded, AccessTimeRounded } from "@mui/icons-material";
import axios from 'axios'; // Make sure to install axios if you haven't already
import { TruncateText } from "../utility functions/TranctuateText";
import { useQuery } from "@tanstack/react-query";
import Skeleton from "../skeleton/skeleton";



const NewsBlog = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/news?page=1`);
                console.log(response)
                setNews(response.data);
              
            } catch (error) {
                console.error('Error fetching news data:', error);
                
            }
        };

        fetchNews();
    }, []);

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleNextPage = () => {
        if (currentPage && news.length !==0) {
            setCurrentPage(currentPage + 1);
        }
    };


    const FetchNewsClickEvent=async()=>{
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/news?page=${currentPage}`);
            console.log(response)
            setNews(response.data);
          
        } catch (error) {
            console.error('Error fetching news data:', error);
            
        }
    }



      

    const { isLoading, isError, data, error } = useQuery({
        queryKey: [currentPage],
        queryFn: FetchNewsClickEvent,
        refetchOnWindowFocus: false
      });


  
    

    return (
        <>
            <NavBar />
            <div>
            
                <div className="flex md:max-lg:w-[100%] sm:max-md:w-[80%] w-[90%] xs:max-md:w-[100%] p-8 xs:max-md:gap-y-12 gap-x-8 ml-auto xs:max-md:mx-auto xs:max-md:flex-col flex-row">
                {news && !isLoading && news.length > 0 && (  
                    
                    <div onClick={()=>window.location.href=`/news/${news[0]._id}`} className="md:max-lg:basis-[50%] cursor-pointer basis-[60%]">
                       
                            <div className="w-[90%] mx-auto">
                                <img
                                    src={`${process.env.REACT_APP_API_URL}/assets/news/${news[0].imageUrl}`} // Adjust the path based on your project structure
                                    className="h-[500px] w-[100%]"
                                    alt={news[0].title}
                                />
                                <div className="flex my-2 flex-row gap-x-6">
                                    <button className="font-Poppins bg-black p-2 rounded-full text-xs text-white">
                                        {news[0].topic}
                                    </button>
                                    <div className="flex my-auto flex-row gap-x-2">
                                        <AccessTimeRounded style={{ fontSize: '22px' }} />
                                        <p className="text-xs my-auto font-Lexend">
                                            {new Date(news[0].timestamp).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                                <TruncateText
                                          text={news[0].title}
                                          maxLength={70}
                                          className={'font-Lexend my-2 xs:max-md:text-sm font-bold text-xl'}
              
                                         />
                                
                            </div>
                        
                    </div>
                )} 

{ isLoading && (  
                    
                    <div  className="md:max-lg:basis-[50%] cursor-pointer basis-[60%]">
                       
                            <div className="w-[90%] mx-auto">
                                <div
                                     // Adjust the path based on your project structure
                                    className="h-[300px] w-[100%]"
                                    
                                >         
                             <Skeleton />
                                </div>
                                <div className="flex my-2 flex-row gap-x-6">
                                
                                   
                                </div>
                                <div className="w-full h-[100px]">
                                      <Skeleton />
                                      </div>
                                
                            </div>
                        
                    </div>
                )} 
                


                    <div className="w-full basis-[40%] md:max-lg:basis-[50%] mx-auto">
                        <div className="flex xs:max-md:my-6 flex-row justify-between">
                            <p className="font-Abel xs:max-md:text-[1.4rem] text-[2rem] mb-4">
                                Recent News:
                            </p>
                            <div className="flex cursor-pointer flex-row gap-x-6">
                                <div className="bg-black flex justify-center w-[40px] h-[40px] text-white">
                                    <KeyboardArrowLeftRounded onClick={handlePreviousPage} style={{ fontSize: '40px', margin: 'auto' }} />
                                </div>
                                <div className="bg-black cursor-pointer flex justify-center w-[40px] h-[40px] text-white">
                                    <KeyboardArrowRightRounded onClick={handleNextPage} style={{ fontSize: '40px', margin: 'auto' }} />
                                </div>
                            </div>
                        </div>
                      


                        <div className="flex flex-col xs:max-md:gap-y-6 gap-y-4">
                       
                            {news && !isLoading && news.slice(1).map((item) => (
                                <div onClick={()=>window.location.href=`/news/${item._id}`} key={item._id} className="w-full cursor-pointer flex flex-row gap-x-4">
                                    <img
                                        src={`${process.env.REACT_APP_API_URL}/assets/news/${item.imageUrl}`} // Adjust the path based on your project structure
                                        className="h-[100px] w-[100px]"
                                        alt={item.title}
                                    />
                                    <div className="flex flex-col gap-y-2">
                                        <div className="flex xs:max-md:gap-x-2 flex-row gap-x-6">
                                            <button className="font-Poppins xs:max-md:text-[8px] bg-black p-2 rounded-full text-xs text-white">
                                                {item.topic}
                                            </button>
                                            <div className="flex my-auto flex-row gap-x-2">
                                                <AccessTimeRounded style={{ fontSize: '22px' }} />
                                                <p className="text-xs xs:max-md:text-[8px] my-auto font-Lexend">
                                                    {new Date(item.timestamp).toLocaleDateString()}
                                                </p>
                                            </div>
                                        </div>
                                        <div>
                                        <TruncateText
                                          text={item.title}
                                          maxLength={50}
                                          className={'font-Lexend text-md xs:max-md:text-xs'}
              
                                         />
                                         </div>
                                        
                                    </div>
                                </div>
                            ))}
                             {isLoading && [1, 2, 3, 4].map((data, index) =>{ return(
             <div className="w-full cursor-pointer flex flex-row gap-x-4">
             <div
                  // Adjust the path based on your project structure
                 className="h-[100px] w-[100px]"
                
             >
              <Skeleton />
                </div>
             <div className="flex w-full flex-col gap-y-2">
                 
                    <div className="h-[30px] w-[100%]">
                    <Skeleton />
                    </div>

                    <div className="h-[50px] w-[100%]">
                    <Skeleton />
                    </div>
                    
                    
                 
               
                 
             </div>
         </div>
          )
        }
    )
}






                        </div>
                    </div>
                </div>
                {
                                   !isLoading && news.length ===0 && (
                                       <div className="w-full text-center">
                                        <p className="text-[8rem] xs:max-md:text-[2rem] md:max-lg:text-[6rem] my-8">No news found</p>

                                       </div>
                                   )
                               }
            </div>
            <Footer />
        </>
    );
};

export default NewsBlog;
