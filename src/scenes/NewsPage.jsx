
import NavBar from "./NavBar";
import Footer from "./Footer";





export const NewsPage=()=>{




    return(
        <>

        <NavBar />

        <div className="h-[auto] pb-16">

            <div className="w-[80%] xs:max-md:w-[100%] py-8 h-auto mx-auto">

               

                <div className="w-[80%] flex flex-col gap-y-4 h-auto mx-auto">
                   
                    <img className="h-[400px] mx-auto w-[100%]" src={require('./1.jpeg')} />
                    <p className="font-Abel xs:max-md:text-[1.4rem] text-[2rem] font-bold ">The Not Company: A Maker of dairy Produt and plant based subsititution in China.</p>
                    <p className="font-Livvic xs:max-md:text-sm">In China, the consumption trends of dairy products and the emergence of plant-based substitutes are shaping a dynamic food landscape. Traditionally, dairy consumption was limited due to cultural preferences and dietary habits focused more on grains, vegetables, and meats. However, as urbanization accelerates and incomes rise, there has been a noticeable shift towards including dairy in daily diets. Milk, yogurt, and cheese are increasingly popular among urban consumers, driven by their nutritional benefits and perceived health advantages. This trend is further bolstered by the influence of Western dietary patterns and a desire for modern, convenient food options. Concurrently, plant-based substitutes are gaining traction, especially among health-conscious and environmentally aware consumers. These alternatives, such as soy milk, almond milk, and plant-based yogurts and cheeses, appeal to those seeking dairy-free options for health reasons or ethical considerations. The market is witnessing innovation from both traditional dairy producers expanding their product lines and new entrants promoting sustainable plant-based alternatives. As China continues to evolve economically and culturally, the dairy and plant-based sectors are poised for continued growth and diversification, catering to a population increasingly attuned to health, sustainability, and culinary innovation.</p>
                </div>


            </div>




        </div>

        
        <Footer />
        </>
    )
}



export default NewsPage;














