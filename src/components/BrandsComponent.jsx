
import IMG from '../assets/1.jpeg'
import { useEffect, useState } from 'react';


const Pagination = ({totalPages , currentPage, onPageChange}) => {
   
  
    const handlePageClick = (pageNumber) => {
      onPageChange(pageNumber); // Pass the new page number to the parent component
    };
  
    const renderPageNumbers = () => {
      const pageNumbers = [];
      const maxPagesToShow = 7; // max pages to show before using ellipsis
  
      const addPageNumber = (page) => (
        <div
        style={{ userSelect: 'none' }}
          key={page}
          className={`w-10 font-Lexend h-10 flex items-center justify-center rounded-full cursor-pointer
            ${currentPage === page ? 'bg-emerald-600 text-white' : 'bg-gray-200 text-gray-700'}
            hover:bg-black hover:text-white transition`}
          onClick={() => handlePageClick(page)}
        >
          {page}
        </div>
      );
  
      if (totalPages <= maxPagesToShow) {
        // If total pages are small, show all pages
        for (let i = 1; i <= totalPages; i++) {
          pageNumbers.push(addPageNumber(i));
        }
      } else {
        // Show first page
        pageNumbers.push(addPageNumber(1));
  
        if (currentPage > 4) {
          // Add ellipsis if currentPage is beyond page 4
          pageNumbers.push(
            <div key="start-ellipsis" className="w-10 h-10 flex items-center justify-center">...</div>
          );
        }
  
        // Determine start and end points for displaying surrounding pages
        const startPage = Math.max(2, currentPage - 1); // start 2 before or at least page 2
        const endPage = Math.min(totalPages - 1, currentPage + 1); // end 2 after or at most page before last
  
        for (let i = startPage; i <= endPage; i++) {
          pageNumbers.push(addPageNumber(i));
        }
  
        if (currentPage < totalPages - 3) {
          // Add ellipsis if currentPage is far from last pages
          pageNumbers.push(
            <div key="end-ellipsis" className="w-10 h-10 flex items-center justify-center">...</div>
          );
        }
  
        // Show last page
        pageNumbers.push(addPageNumber(totalPages));
      }
  
      return pageNumbers;
    };
  
    return <div className="flex space-x-4 justify-center my-16">{renderPageNumbers()}</div>;
  };










const BrandComponent=()=>{
 
    const [brands, setBrands] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
      



    const fetchBrands = (page = 1) => {
      fetch(`${process.env.REACT_APP_API_URL}/brands?page=${page}`)
        .then((response) => response.json())
        .then((data) => {
          setBrands(data.brands); // Assuming the API response contains a 'brands' array
          setTotalPages(data.totalPages); // Assuming the API response contains a 'totalPages' property
        });
    };
  
    useEffect(() => {
      fetchBrands(currentPage);
    }, [currentPage]); // Fetch brands whenever the current page changes
  
    const handlePageChange = (pageNumber) => {
      setCurrentPage(pageNumber);
    };



    return(
        <>
        
        <div className="w-[90%] mx-auto py-12">
            <p className='font-Lexend py-8 text-[2rem]'>Brands:</p>

            <div className=" grid grid-cols-2 xs:max-md:grid-cols-1 gap-y-8 gap-x-24 mx-24 xs:max-md:mx-auto w-[80%]">
           {brands &&  brands.map((data, index) => {
            return(
                
                <div onClick={()=>{window.location.href=`/brand/${data.name}`}} className='border-2 cursor-pointer border-gray-500' key={index}>
                <img className="w-[500px] h-[175px] mx-auto my-auto" src={`${process.env.REACT_APP_API_URL}/assets/brands/${data.brandLogoPath}`} alt={data.name} />
                </div>
             )
              })}


               
            </div>




            <div className='my-24 w-full'>
                <Pagination 
                 totalPages={totalPages}
                 currentPage={currentPage}
                 onPageChange={handlePageChange}
                 />

            </div>


        </div>
        
        </>
    )
}




export default BrandComponent








