import React, { Suspense, useEffect, useState,lazy } from 'react';
const BookDetailsModal=lazy(()=> import("../Components/BookDetailsModel"))
const Home = () => {
    const [allBooks, setAllBooks] = useState([]);
    const [groupedBooks, setGroupedBooks] = useState({});
    const [selectedBook, setSelectedBook] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const request = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            };
            const result = await fetch("http://localhost:3000/getallbook", request);
            const data = await result.json();
            setAllBooks(data);
            groupBooksByGenre(data);
        };

        const groupBooksByGenre = (books) => {
            const grouped = books.reduce((acc, book) => {
                const genre = book.genre || 'Other'; // Fallback to 'Other' if genre is not specified
                if (!acc[genre]) {
                    acc[genre] = [];
                }
                acc[genre].push(book);
                return acc;
            }, {});
            setGroupedBooks(grouped);
        };

        fetchBooks();
    }, []);

    const handleCloseModal=()=>{
        setSelectedBook(null);
    }

    const onBookClick = (book) => {
        // Handle book click, possibly open a modal
        setSelectedBook(book);
    };

    return (
        <div className='bg-radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%) py-4 px-4 pt-6'>
            <div class="fixed inset-0 -z-10 h-[100vh] w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <Suspense fallback={<div>Loading...</div>}>
                {Object.keys(groupedBooks).map((genre, index) => (
                    <div key={index} className="genre-section">
                        <h2 className="text-white font-serif border-b-2 text-2xl mb-4 px-4 pt-8">{genre}</h2>
                        <ul className="flex flex-row  overflow-scroll scrollbar-hide mt-4 border border-white bg-gray-900 py-4 rounded-2xl">
                        <div class="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
                            {groupedBooks[genre].map((book, bookIndex) => (
                                <li
                                    key={bookIndex}
                                    className="text-white min-w-32 rounded-2xl mx-3 h-48 border border-white justify-center items-center flex flex-col overflow-hidden text-center cursor-pointer bg-black"
                                    onClick={() => onBookClick(book)} // Trigger modal on click
                                >
                                    <img src={book.images[0]} alt={book.bookName} className="rounded-2xl w-24 h-28" />
                                    <div className="flex flex-col items-center justify-center">
                                        <strong
                                            className="font-serif text-red-600 w-full"
                                            title={book.bookName}
                                        >
                                            {book.bookName.length > 8 ? `${book.bookName.slice(0, 8)}...` : book.bookName}
                                        </strong>
                                        <p className="w-full text-center font-serif">
                                            {book.authorName.length > 8 ? `${book.authorName.slice(0, 8)}...` : book.authorName}
                                        </p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
                {/* <div>This is the all books component...</div> */}
            </Suspense>
            {selectedBook && (
          <BookDetailsModal book={selectedBook}  
          onClose={handleCloseModal} />
        )}
        </div>
    );
};

export default Home;
