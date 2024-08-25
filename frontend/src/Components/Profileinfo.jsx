import {
    CalendarToday as CalendarIcon,
    LocationCity as CityIcon,
    Email as EmailIcon,
    PinDrop as PincodeIcon,
    LocationOn as StateIcon,
} from "@mui/icons-material";
import { IconButton } from '@mui/material';
import moment from "moment";
import React, { useState } from 'react';
import { useSelector } from "react-redux";
import Avatar from "../Images/Avatar.jpg";

const Profileinfo = () => {
    const user = useSelector((state) => state.user.user);
    const [imageclick, setimageclick] = useState(false);
    const [isClick, setIsClick] = useState(false);
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
      
  // Function to calculate how long the user has joined us using moment.js
  const timeSinceJoined = (joinedDate) => {
    return moment(joinedDate).fromNow(); // e.g., "3 years ago"
  };

  const joinedDate = user.joineddate; // Assume this is in a valid date format

  return (
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
                      <EmailIcon/>
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
                  {/* <p className="6pp-body flex items-center justify-center">
                    <IconButton sx={{ color: "white" }}>
                      <CityIcon />
                    </IconButton>
                    {user.userid}
                  </p> */}
                </div>
              )}
            </div>
  )
}

export default Profileinfo