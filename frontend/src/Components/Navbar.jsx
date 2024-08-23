import React, { useEffect } from 'react';
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Logout as LogoutIcon, Add as AddIcon, Search as SearchIcon, Person as PersonIcon, Home as HomeIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../redux/User/userslice'; // Adjust the import path as needed
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearBooksByGenre, clearUserEmail } from "../redux/Book/Bookslice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('user');
      dispatch(clearUser()); // Clears the user data in Redux
      dispatch(clearBooksByGenre());
      dispatch(clearUserEmail());
      toast.success('Logged out successfully!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        transition: Bounce,
      });
      navigate('/login'); // Redirects to the login page
    }
  };

  useEffect(() => {
    // Retrieve user data from local storage
    const userData = localStorage.getItem('user');
    if (userData) {
      // Parse the JSON string back to an object
      const user = JSON.parse(userData);
      // Dispatch the user data to Redux
      dispatch(setUser(user));
    }
  }, [dispatch]);

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />

      <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between px-4 py-4 bg-purple-600 items-center">
        <div className='left text-white font-bold text-2xl font-serif flex gap-4'>
          <div>
            <img src="../Images/favicon-32x32.png" alt="Logo" /> {/* Ensure this path is correct relative to the component */}
          </div>
          <div>
            Book Swap
          </div>
        </div>
        <div className='right flex gap-2'>
          <Tooltip title="Home">
            <IconButton size="large" color="inherit" onClick={() => navigate('/')}>
              <HomeIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Search">
            <IconButton size="large" color="inherit" onClick={() => navigate('/search')}>
              <SearchIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Add">
            <IconButton size="large" color="inherit" onClick={() => navigate('/addbook')}>
              <AddIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Profile">
            <IconButton size="large" color="inherit" onClick={() => navigate(`/profile/${user.userid}`)}>
              <PersonIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Logout">
            <IconButton size="large" color="inherit" onClick={logout}>
              <LogoutIcon />
            </IconButton>
          </Tooltip>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
