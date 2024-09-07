import NavBar from "./NavBar";
import Footer from "./Footer";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AccessTimeRounded } from "@mui/icons-material";
import SpinnerRotating from "../skeleton/spinner";
export const NewsPage = () => {
    const { newsId } = useParams();
    const [news, setNews] = useState(null); // Changed to null to indicate loading state

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/news/id/${newsId}`);
                setNews(response.data);
            } catch (error) {
                console.error('Error fetching news data:', error);
            }
        };

        fetchNews();
    }, [newsId]);

    if (!news) {
        return <SpinnerRotating/>; // Simple loading state
    }

    return (
        <>
            <NavBar />

            <div className="h-[auto] pb-16">
                <div className="w-[80%] xs:max-md:w-[100%] py-8 h-auto mx-auto">
                    <div className="w-[80%] flex flex-col gap-y-4 h-auto mx-auto">
                        <img className="h-[400px] mx-auto w-[100%]" src={`${process.env.REACT_APP_API_URL}/assets/news/${news.imageUrl}`} alt={news.title} />
                        <div className="flex my-2 flex-row gap-x-6">
                            <button className="font-Poppins bg-black p-2 rounded-full text-xs text-white">
                                {news.topic}
                            </button>
                            <div className="flex my-auto flex-row gap-x-2">
                                <AccessTimeRounded style={{ fontSize: '22px' }} />
                                <p className="text-xs my-auto font-Lexend">
                                    {new Date(news.timestamp).toLocaleDateString()} {/* Format the date */}
                                </p>
                            </div>
                        </div>
                        <p className="font-Abel xs:max-md:text-[1.4rem] text-[2rem] font-bold">{news.title}</p>
                        <p className="font-Livvic xs:max-md:text-sm">{news.content}</p>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

export default NewsPage;















