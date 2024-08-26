import React, { lazy, useState, useEffect, Suspense } from 'react';
import { useForm } from 'react-hook-form';

const Navbar = lazy(() => import('../Components/Navbar'));
const BookDetailsModal = lazy(() => import("../Components/BookDetailsModel"));

const Search = () => {
  const { register, handleSubmit } = useForm();
  const [searchResults, setSearchResults] = useState([]);
  const [backgroundHeight, setBackgroundHeight] = useState('100vh'); // Default height
  const [selectedBook, setSelectedBook] = useState(null);

  const updateBackgroundHeight = (resultsLength) => {
    // Determine screen width
    const screenWidth = window.innerWidth;
    const isSmallScreen = screenWidth < 1024; // Tailwind 'lg' breakpoint is 1024px

    // Adjust background height based on screen width and number of results
    const baseHeight = resultsLength > 0 ? Math.max(resultsLength * 43, 100) + 20 : 100;
    const newHeight = isSmallScreen ? `${baseHeight * 1.2}vh` : `${baseHeight}vh`;
    setBackgroundHeight(newHeight);
  };

  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book for the modal
  };

  const handleCloseModal = () => {
    setSelectedBook(null); // Clear the selected book to close the modal
  };

  const onSubmit = async (data) => {
    try {
      // Convert all fields to uppercase
      const upperCaseData = Object.fromEntries(
        Object.entries(data).map(([key, value]) => [key, value ? value.toUpperCase() : ''])
      );

      console.log(upperCaseData);

      const queryParams = new URLSearchParams(upperCaseData).toString();
      const request = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      };

      const response = await fetch(`http://localhost:3000/search?${queryParams}`, request);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const result = await response.json();
      setSearchResults(result);

      // Update background height based on search results and screen width
      updateBackgroundHeight(result.length);

      console.log(result);
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };

  useEffect(() => {
    // Update background height on window resize
    const handleResize = () => updateBackgroundHeight(searchResults.length);
    console.log(searchResults);
    // Add resize event listener
    window.addEventListener('resize', handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [searchResults.length]); // Update background height when search results change

  return (
    <div className="w-full overflow-x-hidden"> {/* Added overflow-x-hidden */}
      <Navbar />
      
      <div className="flex flex-col justify-center items-center"
        style={{ background: 'radial-gradient(125% 125% at 50% 10%, #000 40%, #63e 100%)' }}>
        <div className="absolute inset-0 -z-10 h-full w-full px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
        <div className="px-8 pt-8 w-full"> {/* Added w-full */}
        
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4 w-full"> {/* Added w-full */}
            <div className="flex flex-col md:flex-row gap-3 w-[80vw] mx-auto">
              <input
                type="text"
                {...register('bookName')}
                placeholder="Search by Book Name"
                className="w-full p-2 border rounded-2xl border-white"
              />
              <input
                type="text"
                {...register('authorName')}
                placeholder="Search by Author Name"
                className="w-full p-2 border border-gray-300 rounded-2xl"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-[80vw] mx-auto">
              <select
                {...register('genre')}
                className="w-full p-2 border border-gray-300 rounded-3xl"
              >
                 <option value="">Select Genre</option>
              <option value="Fiction">Fiction</option>
              <option value="Non-Fiction">Non-Fiction</option>
              <option value="Fantasy">Fantasy</option>
              <option value="Science Fiction">Science Fiction</option>
              <option value="Mystery">Mystery</option>
              <option value="Thriller">Thriller</option>
              <option value="Romance">Romance</option>
              <option value="Horror">Horror</option>
              <option value="Biography">Biography</option>
              <option value="Autobiography">Autobiography</option>
              <option value="Self-Help">Self-Help</option>
              <option value="History">History</option>
              <option value="Travel">Travel</option>
              <option value="Poetry">Poetry</option>
              <option value="Children's Books">Children's Books</option>
              <option value="Young Adult">Young Adult</option>
              <option value="Graphic Novels">Graphic Novels</option>
              <option value="Other">Other</option>
                {/* other options */}
              </select>
              <button type="submit" className="p-2 bg-purple-600 text-white rounded-2xl w-full md:w-[30%]">
                Search
              </button>
            </div>
          </form>
        </div>
        
        <div className="allbooks mt-8 w-full"
      >
        {searchResults.length > 0 ? (
          <ul>
            {searchResults.map((book, index) => (
              <div
                key={index}
                className='text-white flex flex-col lg:flex-row md:mx-[11vw] mx-[6vw] mb-4 border-white border-2 rounded-2xl bg-gray-800 cursor-pointer'
                onClick={() => handleBookClick(book)} // Corrected this line
              >
                <div className='image-container flex flex-col md:flex-row w-full md:w-[40vw] px-8 my-4'>
                  {/* Only show one image on small screens and two images on larger screens */}
                  {book.images.length > 0 && (
                    <div className='flex flex-row'>
                      <img
                        src={book.images[0]}
                        alt={`Image of ${book.bookName}`}
                        className='w-[80px] md:w-[100px] object-cover h-auto mx-3 mb-3 md:mb-0 rounded-2xl border-4 border-white'
                      />
                      {book.images.length > 1 && (
                        <img
                          src={book.images[1]}
                          alt={`Image of ${book.bookName}`}
                          className='w-[80px] md:w-[100px] object-cover h-auto mx-3 mb-3 md:mb-0 rounded-2xl border-4 border-white'
                        />
                      )}
                      {book.images.length > 2 && (
                        <img
                          src={book.images[2]}
                          alt={`Image of ${book.bookName}`}
                          className='w-[60px] md:w-[100px] object-cover h-auto mx-3 mb-3 md:mb-0 rounded-2xl border-4 border-white'
                        />
                      )}
                    </div>
                  )}
                </div>
                <div className='text-details flex flex-col mx-6 mb-4 justify-center items-start flex-1 lg:mx-4'>
                  <h2 className='text-lg font-bold font-serif text-white'>Book Name: {book.bookName}</h2>
                  <p className='text-lg font-serif font-semibold text-white'>Author: {book.authorName}</p>
                  <p className='text-lg font-semibold font-serif text-white'>Price: {book.price}</p>
                </div>
              </div>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
        <Suspense fallback={<div>Loading...</div>}>
          {selectedBook && (
            <BookDetailsModal book={selectedBook} onClose={handleCloseModal} />
          )}
        </Suspense>
      </div>
      </div>
    </div>
  );
};

export default Search;





