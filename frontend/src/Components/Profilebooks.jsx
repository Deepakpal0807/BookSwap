import React from 'react';
import { useSelector } from 'react-redux';

const ProfileBooks = () => {
  // Access the grouped books from the Redux store
  const booksByGenre = useSelector((state) => state.books.books);
  console.log(booksByGenre);

  return (
    <div className="p-4">
      {/* Iterate over each genre and its books */}
      {Object.entries(booksByGenre).map(([genre, books], genreIndex) => (
        <div key={genreIndex} className="mb-6">
          <h2 className="text-2xl font-bold mb-2 text-white font-serif border-b-2 border-white mt-8">
  {genre}
</h2>
          {books.length > 0 ? (
            <ul className=" flex flex-row overflow-hidden scrollbar-hide mt-4">
  {books.map((book, bookIndex) => (
  <li 
    key={bookIndex} 
    className="text-white w-32 rounded-2xl mx-3 h-48 border border-white justify-center items-center flex flex-col overflow-hidden text-center"
  >
    {/* Customize the book display as needed */}
    <img src={book.images[0]} alt={book.bookName} className="rounded-2xl w-24 h-28" />
    <div className="flex flex-col items-center justify-center">
      <strong 
        className="font-serif text-red-600 w-full"
        title={book.bookName}  // Shows full name on hover
      >
        {/* Display first 8 characters followed by '...' if the name is longer */}
        {book.bookName.length > 8 ? `${book.bookName.slice(0, 8)}...` : book.bookName}
      </strong>
      <p className="w-full text-center">
      {book.authorName.length > 8 ? `${book.authorName.slice(0, 8)}...` : book.authorName}
      </p>
    </div>
  </li>
))}

            </ul>
          ) : (
            <p className="text-gray-400">No books available in this genre.</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default ProfileBooks;
