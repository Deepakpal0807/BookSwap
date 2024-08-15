import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { Home as HomeIcon } from '@mui/icons-material';
import notfound from './found.avif'

const NotFound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center">
      <h1 className="text-6xl font-bold text-blue-500 mb-4">404</h1>
      <p className="text-xl text-gray-700 mb-8">Oops! The page you're looking for doesn't exist.</p>
      <img 
        src={notfound}
        alt="Not Found" 
        className="mb-8 w-[400px]"
      />
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<HomeIcon />} 
        onClick={goHome}
        className="text-white"
      >
        Go Back Home
      </Button>
    </div>
  );
};

export default NotFound;
