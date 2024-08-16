import React from 'react'
import { useParams } from "react-router-dom";

const profileurl = () => {
    const { profileId } = useParams();
    console.log(profileId);

  return (
    <div>profileurl
        
    </div>
  )
}

export default profileurl