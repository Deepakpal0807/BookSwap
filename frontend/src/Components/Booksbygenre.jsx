import { useSelector } from 'react-redux';

const Component = () => {
  const booksByGenre = useSelector((state) => state.books.booksByGenre);

  // Now you can use booksByGenre in your component
  console.log(booksByGenre);
  
  return (
    <div>
      {/* {Object.keys(booksByGenre).map((genre) => (
        <div key={genre}>
          <h3>{genre}</h3>
          {booksByGenre[genre].map((book) => (
            <div key={book.bookName}>{book.bookName}</div>
          ))}
        </div>
      ))} */}
      heelo
    </div>
  );
};
