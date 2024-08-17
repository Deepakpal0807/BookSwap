import React, { lazy, Suspense, useState } from "react";
import { useSelector } from "react-redux";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import {
  Email as EmailIcon,
  LocationCity as CityIcon,
  LocationOn as StateIcon,
  PinDrop as PincodeIcon,
  CalendarToday as CalendarIcon,
} from "@mui/icons-material";
import Profilebooks from "../Components/Profilebooks";
import Avatar from "../Images/Avatar.jpg";
import moment from "moment";

const Navbar = lazy(() => import("../Components/Navbar"));

const Profile = () => {
  // Retrieve the user data from Redux
  const user = useSelector((state) => state.user.user);
  const [isClick, setIsClick] = useState(false);

  // Function to calculate how long the user has joined us using moment.js
  const timeSinceJoined = (joinedDate) => {
    return moment(joinedDate).fromNow(); // e.g., "3 years ago"
  };

  const joinedDate = user.joineddate; // Assume this is in a valid date format

  const handleImageClick = () => {
    setIsClick((prevIsClick) => !prevIsClick); // Toggle the state immediately
  
    if (!isClick) {
      // Only set the timeout if isClick is currently false
      setTimeout(() => {
        setIsClick((prevIsClick) => !prevIsClick); // Toggle back after 4 seconds
        // alert("Image resize");
      }, 4000);
    }
  };
  return (
    <div className="flex flex-col h-screen overflow-auto">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Navbar />
      </Suspense>
      <div className="flex-grow mt-4 mx-2 rounded-xl">
        <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
          <div className="absolute bottom-0 left-0 right-0 top-0 bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
        </div>
        <Grid2 container spacing={2} className="overflow">
          <Grid2
            item
            xs={12}
            md={5}
            lg={4}
            className="flex h-[86vh] rounded-3xl"
          >
            <div
              className={`w-full flex flex-col items-center justify-center p-4 font-serif rounded-3xl border border-white transition-opacity duration-500 `}
            >
              <div className="absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
              <img
                src={user.avatarUrl || Avatar}
                alt={`${user.name}'s avatar`}
                onClick={handleImageClick}
                className={`rounded-full border-2 border-white transition-transform duration-500 ${
                  isClick ? "w-[400px] h-[400px] " : "w-[200px] h-[200px] mb-4 "
                }`}
              />
              {!isClick && (
                <div className="text-center flex flex-col items-center text-white font-serif">
                  <h2 className="6pp-heading text-2xl font-bold">
                    {user.name}
                  </h2>
                  <p className="6pp-body flex items-center justify-center">
                    <IconButton sx={{ color: "white" }}>
                      <EmailIcon />
                    </IconButton>
                    {user.email}
                  </p>
                  <p className="6pp-body flex items-center justify-center">
                    <IconButton sx={{ color: "white" }}>
                      <StateIcon />
                    </IconButton>
                    {user.state}
                  </p>
                  <p className="6pp-body flex items-center justify-center">
                    <IconButton sx={{ color: "white" }}>
                      <CityIcon />
                    </IconButton>
                    {user.city}
                  </p>
                  <p className="6pp-body flex items-center justify-center">
                    <IconButton sx={{ color: "white" }}>
                      <PincodeIcon />
                    </IconButton>
                    {user.pincode}
                  </p>
                  <p className="6pp-body flex items-center justify-center">
                    <IconButton sx={{ color: "white" }}>
                      <CalendarIcon />
                    </IconButton>
                    Joined: {timeSinceJoined(joinedDate)}
                  </p>
                </div>
              )}
            </div>
          </Grid2>
          <Grid2 item xs={12} md={7} lg={8} className="flex h-[86vh]">
            <div className="h-full w-full flex items-center border border-black justify-center rounded-3xl">
              <Profilebooks />
            </div>
          </Grid2>
        </Grid2>
      </div>
    </div>
  );
};

export default Profile;
