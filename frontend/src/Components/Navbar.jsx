import React, { useEffect } from 'react';
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Logout as Logouticon, Add as Addicon, Search as Searchicon, Person as PersonIcon, Home as Homeicon } from "@mui/icons-material";
import { useDispatch } from 'react-redux';
import { clearUser, setUser } from '../redux/User/userslice'; // Adjust the import path as needed

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logout = () => {
    localStorage.removeItem('user');
    dispatch(clearUser()); // Clears the user data in Redux
    navigate('/login'); // Redirects to the login page
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
    <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between px-4 py-4 bg-blue-500 items-center">
      <div className='left text-white font-bold text-2xl font-serif flex gap-4'>
        <div>
          <img src="../Images/favicon-32x32.png" alt="Logo" />
        </div>
        <div>
          Book Swap
        </div>
      </div>
      <div className='right flex gap-2'>
        <Tooltip title="Home">
          <IconButton size="large" color="inherit" onClick={() => navigate('/')}>
            <Homeicon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Search">
          <IconButton size="large" color="inherit" onClick={() => navigate('/search')}>
            <Searchicon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Add">
          <IconButton size="large" color="inherit" onClick={() => navigate('/addbook')}>
            <Addicon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Profile">
          <IconButton size="large" color="inherit" onClick={() => navigate('/profile')}>
            <PersonIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Logout">
          <IconButton size="large" color="inherit" onClick={logout}>
            <Logouticon />
          </IconButton>
        </Tooltip>
      </div>
    </nav>
  );
};

export default Navbar;
