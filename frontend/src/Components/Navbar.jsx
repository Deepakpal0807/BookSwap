import React from 'react';
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Logout as Logouticon, Add as Addicon, Search as Searchicon, Person as PersonIcon, Home as Homeicon } from "@mui/icons-material";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light flex justify-between px-4 py-4 bg-blue-500 items-center">
      <div className='left text-white font-bold text-2xl font-serif flex gap-4'>
        <div>
          <img src="../Images/favicon-32x32.png" alt="" />
        </div>
        <div>
          Book Swap
        </div>
      </div>
      <div className='right flex  gap-2'>
      <Tooltip title="Search">
          <IconButton size="large" color="inherit" onClick={() => navigate('/')}>
          <Homeicon/>
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
          <IconButton size="large" color="inherit" onClick={() => navigate('/login')}>
            <Logouticon />
          </IconButton>
        </Tooltip>
      </div>
    </nav>
  );
}

export default Navbar;
