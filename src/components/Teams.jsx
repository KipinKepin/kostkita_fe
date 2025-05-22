import React from "react";
import "../styles/OurTeam.css";

const Teams = () => {
  return (
    <div className="cont relative w-screen flex justify-center items-center flex-wrap">
      <div className="cards relative w-[300px] h-[400px] bg-red-500 rounded-md">
        <div className="imgBx absolute top-0 left-0 w-full h-full rounded-md">
          <img
            src="https://wallpapers.com/images/hd/cool-neon-blue-profile-picture-u9y9ydo971k9mdcf.jpg"
            alt="image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Teams;
