import React, { useEffect, useState } from "react";
import { IoBedOutline, IoPeopleOutline, IoPin } from "react-icons/io5";
import { Link } from "react-router-dom";
import HeroImage from "../assets/hero.jpg";
import api from "../utils/api";

const Card = () => {
  const [kost, setKost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    setError("");
    try {
      const getKost = async () => {
        const response = await api.get("/kos");
        console.log(response.data);
        setKost(response.data.data);
      };
      getKost();
    } catch (error) {
      console.error("error: ", error);
      setError("Error fetching datas");
    } finally {
      setLoading(false);
    }
  }, []);

  console.log(kost);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      {kost && kost.length !== 0 ? (
        kost.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-lg rounded-sm transition duration-100 hover:shadow-sm"
          >
            <div className="h-[260px] w-auto rounded-t-sm relative">
              <img
                src={HeroImage}
                width={384}
                height={256}
                alt="room image"
                className="w-full h-full object-cover rounded-t-sm"
              />
            </div>
            <div className="p-8">
              <h4 className="text-xl font-medium">
                <Link
                  href="#"
                  className="hover:text-gray-800 transition duration-150"
                >
                  {item.name}
                </Link>
              </h4>
              <h4 className="text-xl mb-3">
                <span className="font-semibold text-gray-600">
                  Rp {item.price.toLocaleString("ID-id")}
                </span>
                <span>/Bulan</span>
              </h4>
              <div className="flex items-center space-x-1 mb-3">
                <IoPin />
                <small>{item.address}</small>
              </div>
              <div className="flex items-center space-x-1 mb-3">
                <IoBedOutline />
                <span>{item.stockKamar} kamar</span>
              </div>
              <div className="pt-6 flex justify-center">
                <Link
                  className="px-6 py-2 w-full text-center bg-[#9c2d41] text-white hover:bg-[#C81737FF] rounded-sm"
                  to={"/"}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No data found</p>
      )}
    </>
  );
};

export default Card;
