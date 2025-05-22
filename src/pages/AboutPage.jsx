import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import HeaderSection from "../components/HeaderSection";
import AboutImage from "../assets/about-image.jpg";
import {
  IoCardOutline,
  IoChatbubbleOutline,
  IoEyeOutline,
  IoImageOutline,
  IoLocateOutline,
  IoMapOutline,
  IoSearch,
} from "react-icons/io5";
import Footer from "../components/Footer";
import api from "../utils/api";
import { Link } from "react-router-dom";

const AboutPage = () => {
  const [facilities, setFacilities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const getFacilities = async () => {
      const res = await api.get("/facility");
      console.log(res.data);
      setFacilities(res.data.data);
    };
    getFacilities();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen space-y-4">
        <div className="w-12 h-12 border-4 border-[#9c2d41] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[#9c2d41] text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div>
      <Layout />
      <HeaderSection
        title="About"
        subtitle="Get abundant facilities at low prices"
      />
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <img src={AboutImage} width={650} height={579} alt="about image" />
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Who we are
            </h1>
            <p className="text-gray-700 py-5 text-justify">
              KostKita adalah platform pencarian dan pemesanan kos yang hadir
              untuk mempermudah mahasiswa, pekerja, dan perantau dalam menemukan
              hunian yang nyaman, aman, dan sesuai kebutuhan. Berdiri sejak
              2025, kami hadir sebagai jembatan antara pemilik kos dan pencari
              kos di seluruh Indonesia.
            </p>
            <ul className="list-item space-y-6">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoEyeOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Vision: </h4>
                  <p className="text-gray-600">
                    Menjadi platform kos nomor satu di Indonesia yang terpercaya
                    dan user-friendly.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoLocateOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">Mission: </h4>
                  <p className="text-gray-600">
                    Mempermudah akses informasi kos secara real-time dan akurat,
                    memberikan layanan pemesanan dan pembayaran yang aman dan
                    praktis, mendukung pemilik kos dalam mengelola hunian mereka
                    secara digital.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Our features
            </h1>
            <ul className="list-item space-y-6">
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoMapOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">
                    Pencarian Mudah:
                  </h4>
                  <p className="text-gray-600">
                    Filter berdasarkan lokasi, harga, fasilitas, dan tipe kos.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoImageOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">
                    Foto & Detail Lengkap:
                  </h4>
                  <p className="text-gray-600">
                    Lihat kos dengan informasi yang transparan dan terkini.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoChatbubbleOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">
                    Chat Pemilik Langsung:
                  </h4>
                  <p className="text-gray-600">
                    Hubungi pemilik tanpa perlu aplikasi tambahan.
                  </p>
                </div>
              </li>
              <li className="flex gap-5">
                <div className="flex-none mt-1">
                  <IoCardOutline className="size-7" />
                </div>
                <div className="flex-1">
                  <h4 className="text-lg font-semibold mb-1">
                    Pembayaran Online:
                  </h4>
                  <p className="text-gray-600">
                    Pembayaran booking kos tanpa ribet, langsung dari aplikasi.
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <img src={AboutImage} width={650} height={579} alt="about image" />
        </div>
      </div>
      <div className="max-w-screen-xl mx-auto py-20 px-4">
        <div className="grid md:grid-cols-2 gap-8">
          <img src={AboutImage} width={650} height={579} alt="about image" />
          <div>
            <h1 className="text-5xl font-semibold text-gray-900 mb-4">
              Our facilities
            </h1>
            <p className="text-gray-700 py-5 text-justify">
              Selain menawarkan kosan dengan harga yang bersahabat,{" "}
              <span className="font-bold text-blue-600 cursor-pointer">
                <Link to="/home">KostKita </Link>
              </span>
              menyediakan berbagai macam fasilitas yang bermanfaat dan mampu
              bersaing dengan kos-kosan lainnya.
            </p>
            <div className="text-black">
              <p>Beberapa fasilitas yang kami tawarkan:</p>
              {facilities && facilities.length !== 0
                ? facilities.map((item) => item.name).join(", ")
                : "Tidak ada data fasilitas"}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
