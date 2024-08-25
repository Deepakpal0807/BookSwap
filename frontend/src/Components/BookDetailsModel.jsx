import React from "react";
import moment from "moment";

const BookDetailsModal = ({ book, onClose }) => {
  if (!book) return null;

  const timeSinceJoined = (joinedDate) => {
    return moment(joinedDate).fromNow(); // e.g., "3 years ago"
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Background overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-60" onClick={onClose}></div>

      {/* Modal content */}
      <div className="relative flex flex-col  w-[90vw] max-w-4xl max-h-[85vh] rounded-3xl overflow-auto p-6 z-10 items-center border scrollbar-hide justify-around  bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
        {/* Background gradient */}
        {/* <div className="absolute inset-0 -z-10 w-full h-full bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)] rounded-3xl"></div> */}

        {/* Close button */}
        <button
          className="absolute top-4 right-4 text-white text-2xl"
          onClick={onClose}
        >
          &times;
        </button>

        {/* Book images */}
        <div className="flex flex-wrap justify-center gap-4 mt-4 mb-8">
          {book.images.map((image, ind) => (
            <img
              key={ind}
              src={image}
              alt="book"
              className="h-[20vh] w-[20vh] md:h-[25vh] md:w-[25vh] lg:h-[30vh] lg:w-[30vh] rounded-xl border border-white object-cover"
            />
          ))}
        </div>
       

        {/* Book details */}
        <div className="text-center">
          <h2 className="text-white font-serif text-xl md:text-2xl mb-2">
            Book Name: {book.bookName}
          </h2>
          <h2 className="text-white font-serif text-xl md:text-2xl mb-2">
            Author Name: {book.authorName}
          </h2>
          <h2 className="text-white font-serif text-lg md:text-xl mb-2">
            Description: {book.description}
          </h2>
          <h2 className="text-white font-serif text-lg md:text-xl mb-2">
            Price: ₹{book.price}
          </h2>
          <h2 className="text-white font-serif text-lg md:text-xl mb-2">
            Updated: {timeSinceJoined(book.createdAt)}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsModal;
