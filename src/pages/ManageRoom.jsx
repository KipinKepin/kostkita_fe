import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import HeaderSection from "../components/HeaderSection";
import { useNavigate } from "react-router-dom";
import {
  IoAdd,
  IoPencilOutline,
  IoSearchOutline,
  IoTrashBinOutline,
} from "react-icons/io5";
import api from "../utils/api";
import Footer from "../components/Footer";

const ManageRoom = () => {
  const navigate = useNavigate();
  const [kos, setKos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchKosan = async () => {
    setLoading(true);
    try {
      const res = await api.get("/kos");
      console.log(res.data.data);

      setKos(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (err) {
      console.error("Fetch error:", err);
      setKos([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchKosan();
  }, []);

  const handleDeleteKos = async (id) => {
    setLoading(true);
    try {
      const res = await api.delete(`/kos/${id}`);
      console.log("hapus kos berhasil", res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      fetchKosan();
    }
  };

  const filteredKos = kos.filter((k) =>
    k.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen w-screen space-y-4">
        <div className="w-12 h-12 border-4 border-[#9c2d41] border-t-transparent rounded-full animate-spin"></div>
        <span className="text-[#9c2d41] text-lg font-semibold">Loading...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200">
      <Layout />
      <HeaderSection title="Manage Room" subtitle="Atur kosan sekarang" />
      <div className="px-6 py-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <button
            onClick={() => navigate("/add-room")}
            className="btn bg-[#9c2d41] text-white hover:bg-[#C81737FF] rounded-md"
          >
            <IoAdd className="w-5 h-5" />
            Add Room
          </button>

          <div className="form-control w-full md:w-80">
            <label className="input input-bordered flex items-center gap-2">
              <IoSearchOutline />
              <input
                type="text"
                className="grow"
                placeholder="Search by name, number, status, price..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </label>
          </div>
        </div>

        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="table table-zebra w-full">
            <thead className="bg-[#f6cbb7] text-black">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Available</th>
                <th>Address</th>
                <th>Facilities</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredKos.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-4">
                    No rooms found.
                  </td>
                </tr>
              ) : (
                filteredKos.map((room) => (
                  <tr key={room.id}>
                    <td>{room.id}</td>
                    <td>{room.name}</td>
                    <td>Rp {room.price.toLocaleString("id-ID")}</td>
                    <td>{room.stockKamar} kamar</td>
                    <td>
                      {
                        room.kamar.filter((k) => k.status === "available")
                          .length
                      }{" "}
                      kamar tersedia
                    </td>
                    <td>{room.address}</td>
                    <td>{room.facilities?.map((f) => f.name).join(", ")}</td>
                    <td className="flex gap-2">
                      <button
                        onClick={() => navigate(`/edit-room/${room.id}`)}
                        className="btn btn-sm btn-primary"
                      >
                        <IoPencilOutline className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => {
                          if (
                            confirm(
                              `Apakah anda yakin ingin menghapus ${room.name}?`
                            )
                          ) {
                            handleDeleteKos(room.id);
                          }
                        }}
                        className="btn btn-sm btn-error"
                      >
                        <IoTrashBinOutline className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ManageRoom;
