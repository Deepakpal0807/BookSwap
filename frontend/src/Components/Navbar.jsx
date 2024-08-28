import React, { useEffect, useState } from 'react';
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from 'react-router-dom';
import { Logout as LogoutIcon, Add as AddIcon, Search as SearchIcon, Person as PersonIcon, Home as HomeIcon, Menu as MenuIcon, Close as CloseIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, setUser } from '../redux/User/userslice';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { clearBooksByGenre, clearUserEmail } from "../redux/Book/Bookslice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const logout = () => {
    if (window.confirm("Are you sure you want to logout?")) {
      localStorage.removeItem('user');
      dispatch(clearUser());
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
      navigate('/login');
    }
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      dispatch(setUser(user));
    }
  }, [dispatch]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

      <nav className="flex justify-between px-4 py-4 items-center bg-purple-600 ">
        <div className='left text-white font-bold text-2xl font-serif flex gap-4' onClick={() => navigate('/')}>
          <div>
            <img src="../Images/favicon-32x32.png" alt="Logo" />
          </div>
          <div className='font-serif text-black'>
            Book Swap
          </div>
        </div>
        <div className='right flex gap-2 items-center'>
          <div className='md:hidden text-2xl'>
            <IconButton size="large" color="inherit" onClick={toggleMenu}>
              {menuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          </div>
          {/* Icons in Navbar (Visible only on md and larger screens) */}
          <div className="hidden md:flex gap-2 ">
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
        </div>
      </nav>

      {/* Icons list below navbar (Visible only on small screens) */}
      {menuOpen && (
        <div className="md:hidden flex flex-col items-start gap-4 mt-4 px-4">
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => navigate('/')}>
            <HomeIcon />
            <span >Home</span>
          </div>
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => navigate('/search')}>
            <SearchIcon />
            <span >Search</span>
          </div>
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={() => navigate('/addbook')}>
            <AddIcon />
            <span >Add</span>
          </div>
          <div className="flex items-center gap-2 text-white cursor-pointer " onClick={() => navigate(`/profile/${user.userid}`)}>
            <PersonIcon />
            <span >Profile</span>
          </div>
          <div className="flex items-center gap-2 text-white cursor-pointer" onClick={logout}>
            <LogoutIcon />
            <span >Logout</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
