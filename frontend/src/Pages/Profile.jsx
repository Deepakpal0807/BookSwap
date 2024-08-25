import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { setBooksByGenre } from "../redux/Book/Bookslice";

const BookDetailsModal = lazy(() => import("../Components/BookDetailsModel"));
const Profileinfo = lazy(() => import("../Components/Profileinfo"));
const Profilebooks = lazy(() => import("../Components/Profilebooks"));
const Navbar = lazy(() => import("../Components/Navbar"));

const Profile = () => {
  const user = useSelector((state) => state.user.user);
  const localuser = JSON.parse(localStorage.getItem("user"));
  const { profileId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to manage the selected book for the modal
  const [selectedBook, setSelectedBook] = useState(null);

  const Books = async () => {
    try {
      const request = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };

      const userEmails = user.email;
      const response = await fetch(
        `http://localhost:3000/books?email=${userEmails}`,
        request
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      const booksByGenre = data.reduce((acc, book) => {
        const genre = book.genre.toUpperCase();
        if (!acc[genre]) {
          acc[genre] = [];
        }
        acc[genre].push(book);
        return acc;
      }, {});

      dispatch(setBooksByGenre(booksByGenre));
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    if (localuser?.userid !== profileId) {
      navigate("/notfound");
    }
    Books();
  }, [localuser, profileId, navigate]);

  const handleBookClick = (book) => {
    setSelectedBook(book); // Set the selected book for the modal
  };

  const handleCloseModal = () => {
    setSelectedBook(null); // Clear the selected book to close the modal
  };

  return (
    <div className={`flex flex-col h-screen overflow-auto `}>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <div className={`flex-grow mt-4 mx-2 rounded-xl ${selectedBook ? 'opacity-50' : 'opacity-100'}`}>
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
        <Grid2 container spacing={2} className="overflow">
          <Grid2 item xs={12} md={5} lg={4} className="flex h-[86vh] rounded-3xl">
            <Profileinfo />
          </Grid2>
          <Grid2 item xs={12} md={7} lg={8} className="flex h-[86vh]">
            <div className="w-full border border-black justify-center rounded-3xl overflow-scroll scrollbar-hide">
              <Profilebooks onBookClick={handleBookClick} />
            </div>
          </Grid2>
        </Grid2>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        {selectedBook && (
          <BookDetailsModal book={selectedBook} onClose={handleCloseModal} />
        )}
      </Suspense>
    </div>
  );
};

export default Profile;
