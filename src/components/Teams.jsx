import React from "react";
import "../styles/OurTeam.css";
import { IoLogoTwitter } from "react-icons/io";

const Teams = () => {
  return (
    <div className="cont relative w-screen flex justify-center items-center flex-wrap">
      <div className="cards relative w-[300px] h-[400px] bg-red-500 rounded-md">
        <div className="imgBx absolute top-0 left-0 w-full h-full rounded-md">
          <img
            src="https://scontent-cgk2-2.cdninstagram.com/v/t51.29350-15/403916183_3285692041729812_6078972897833907675_n.webp?stp=dst-jpg_e35_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6IkNBUk9VU0VMX0lURU0uaW1hZ2VfdXJsZ2VuLjEwODB4MTA4MC5zZHIuZjI5MzUwLmRlZmF1bHRfaW1hZ2UifQ&_nc_ht=scontent-cgk2-2.cdninstagram.com&_nc_cat=100&_nc_oc=Q6cZ2QEfyxuwkM98lIi4Z91kdLWSl_iKYIkJxBZ3FbBtoKoVgz7Rr65HeHCVAp4QTbfhFDw&_nc_ohc=R-X-ENtn9VAQ7kNvwHzi7ew&_nc_gid=GuCZBbByei_MJmipRMLQwQ&edm=ACpohRwBAAAA&ccb=7-5&ig_cache_key=MzI0MTcwNTI5ODQxOTM0OTc0Mw%3D%3D.3-ccb7-5&oh=00_AfLTKQFYFb8n5NG7RZLTd86lhekoQu5oQOr80wX68uWnnw&oe=68349FF4&_nc_sid=2d3a3f"
            alt="image"
            className="absolute top-0 left-0 w-full h-full object-cover"
          />
        </div>
        <div className="content">
          <div className="details">
            <h2>
              Via Aja <br />
              <span>21 Years Fullstack</span>
            </h2>
            <ul className="social_icons">
              <li>
                <a href="">
                  <IoLogoTwitter />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teams;
