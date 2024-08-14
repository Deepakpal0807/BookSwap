import React, { lazy, Suspense } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import { Email as EmailIcon, LocationCity as CityIcon, LocationOn as StateIcon, PinDrop as PincodeIcon, CalendarToday as CalendarIcon } from '@mui/icons-material';
import Profilebooks from '../Components/Profilebooks';

const Navbar = lazy(() => import('../Components/Navbar'));

const Profile = () => {
  const userProfile = {
    name: 'Deepak Pal',
    email: 'fulsinghdeep00@gmail.com',
    city: 'Delhi',
    state: 'Delhi',
    pincode: '110086',
    joinedDate: 'August 11, 2024',
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <div className="flex-grow mt-4 mx-2">
        <Grid2 container spacing={2} className="h-full">
          <Grid2 item xs={12} md={5} lg={4} className="flex h-full">
            <div className="w-full bg-gray-200 flex flex-col items-center justify-center p-4">
              <Typography variant="h5" component="h1" className="font-semibold mb-4">
                Profile
              </Typography>
              <Avatar sx={{ width: 100, height: 100, marginBottom: '16px' }}>
                DP
              </Avatar>
              <div className="text-center flex flex-col items-center">
                <h2 className="text-xl font-semibold">{userProfile.name}</h2>
                <p className="text-gray-600 flex items-center justify-center">
                  <IconButton>
                    <EmailIcon />
                  </IconButton>
                  {userProfile.email}
                </p>
                <p className="text-gray-600 flex items-center justify-center">
                  <IconButton>
                    <StateIcon />
                  </IconButton>
                  {userProfile.state}
                </p>
                <p className="text-gray-600 flex items-center justify-center">
                  <IconButton>
                    <CityIcon />
                  </IconButton>
                  {userProfile.city}
                </p>
                <p className="text-gray-600 flex items-center justify-center">
                  <IconButton>
                    <PincodeIcon />
                  </IconButton>
                  {userProfile.pincode}
                </p>
                <p className="text-gray-500 flex items-center justify-center">
                  <IconButton>
                    <CalendarIcon />
                  </IconButton>
                  Joined: {userProfile.joinedDate}
                </p>
              </div>
            </div>
          </Grid2>
          <Grid2 item xs={12} md={7} lg={8} className="flex h-full">
            <div className="h-full w-full bg-gray-300 flex items-center justify-center">
              <Profilebooks />
            </div>
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
};

export default Profile;
