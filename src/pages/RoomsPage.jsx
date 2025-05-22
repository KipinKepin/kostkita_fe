import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import HeaderSection from "../components/HeaderSection";
import api from "../utils/api";
import { Link } from "react-router-dom";

const RoomsPage = () => {
  const [rooms, setRooms] = useState([]);
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [selectedRoomId, setSelectedRoomId] = useState(null);

  useEffect(() => {
    setLoading(true);

    const getRoomLists = async () => {
      try {
        const response = await api.get("/rent");
        setRooms(response.data.data);
        setFilteredRooms(response.data.data);
      } catch (error) {
        console.error("Failed to fetch room data:", error);
      } finally {
        setLoading(false);
      }
    };
    getRoomLists();
  }, []);

  const filterRooms = (data, keyword) => {
    return data.filter((room) => {
      const name = room.kosan?.name?.toLowerCase() || "";
      const address = room.kosan?.address?.toLowerCase() || "";
      const noKamar = String(room.noKamar || "").toLowerCase();
      const status = room.status?.toLowerCase() || "";
      const price = String(room.kosan?.price || "").toLowerCase();
      const penyewa = room.user?.name?.toLowerCase() || "";

      return (
        name.includes(keyword) ||
        address.includes(keyword) ||
        noKamar.includes(keyword) ||
        status.includes(keyword) ||
        price.includes(keyword) ||
        penyewa.includes(keyword)
      );
    });
  };

  const sortRooms = (data, type, order) => {
    return [...data].sort((a, b) => {
      let valA, valB;

      switch (type) {
        case "name":
          valA = a.kosan?.name || "";
          valB = b.kosan?.name || "";
          break;
        case "address":
          valA = a.kosan?.address || "";
          valB = b.kosan?.address || "";
          break;
        case "status":
          valA = a.status || "";
          valB = b.status || "";
          break;
        case "price":
          valA = a.kosan?.price || 0;
          valB = b.kosan?.price || 0;
          break;
        case "noKamar":
          valA = a.noKamar || "";
          valB = b.noKamar || "";
          break;
        case "penyewa":
          valA = a.user?.name || "";
          valB = b.user?.name || "";
          break;
        default:
          return 0;
      }

      const comparison =
        typeof valA === "string" ? valA.localeCompare(valB) : valA - valB;

      return order === "asc" ? comparison : -comparison;
    });
  };

  useEffect(() => {
    let updatedRooms = filterRooms(rooms, searchTerm.toLowerCase());
    updatedRooms = sortRooms(updatedRooms, sortBy || "status", sortOrder);
    setFilteredRooms(updatedRooms);
  }, [searchTerm, sortBy, sortOrder, rooms]);

  const handleStopSewa = async (id) => {
    setLoading(true);
    try {
      await api.put(`/rent/${id}`);
      const updated = rooms.map((room) =>
        room.id === id ? { ...room, status: "available", user: null } : room
      );
      setRooms(updated);
      const updatedFiltered = filterRooms(updated, searchTerm.toLowerCase());
      setFilteredRooms(
        sortRooms(updatedFiltered, sortBy || "status", sortOrder)
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setShowModal(false);
      setSelectedRoomId(null);
    }
  };

  const confirmStopSewa = (id) => {
    setSelectedRoomId(id);
    setShowModal(true);
  };

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
      <HeaderSection title="Room" subtitle="Cek status kamar sekarang" />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-4 justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Daftar Kamar</h2>
          <div className="flex flex-wrap gap-4 items-center">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Search by</span>
              </label>
              <input
                type="text"
                placeholder="Search here"
                className="input input-bordered"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Sort by</span>
              </label>
              <select
                className="select select-bordered"
                onChange={(e) => setSortBy(e.target.value)}
                value={sortBy}
              >
                <option value="" disabled>
                  Default
                </option>
                <option value="name">Nama Kosan</option>
                <option value="address">Alamat Kosan</option>
                <option value="noKamar">Nomor Kamar</option>
                <option value="status">Status</option>
                <option value="price">Harga</option>
                <option value="penyewa">Penyewa</option>
              </select>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Order</span>
              </label>
              <select
                className="select select-bordered"
                onChange={(e) => setSortOrder(e.target.value)}
                value={sortOrder}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>No</th>
                <th>Nama Kosan</th>
                <th>Alamat Kosan</th>
                <th>No Kamar</th>
                <th>Status</th>
                <th>Penyewa</th>
                <th>Harga</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.map((room, index) => (
                <tr key={room.id}>
                  <td>{index + 1}</td>
                  <td>{room.kosan?.name}</td>
                  <td>{room.kosan?.address}</td>
                  <td>{room.noKamar}</td>
                  <td>
                    <span
                      className={`badge ${
                        room.status === "available"
                          ? "badge-success"
                          : "badge-error"
                      }`}
                    >
                      {room.status}
                    </span>
                  </td>
                  <td>{room.user?.name || "-"}</td>
                  <td>Rp{room.kosan?.price.toLocaleString()}</td>
                  <td className="text-center">
                    {room.status === "booked" ? (
                      <button
                        onClick={() => confirmStopSewa(room.id)}
                        className="bg-[#C81737FF] hover:bg-[#9c2d41] text-white px-4 py-2 rounded-md cursor-pointer"
                      >
                        Hentikan sewa
                      </button>
                    ) : (
                      <p>-</p>
                    )}
                  </td>
                </tr>
              ))}
              {filteredRooms.length === 0 && (
                <tr>
                  <td colSpan="8" className="text-center py-4">
                    Tidak ada kamar ditemukan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL KONFIRMASI */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-sm w-full shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Konfirmasi</h2>
            <p>Apakah Anda yakin ingin menghentikan sewa kamar ini?</p>
            <div className="mt-6 flex justify-end gap-3">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
                onClick={() => setShowModal(false)}
              >
                Batal
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={() => handleStopSewa(selectedRoomId)}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RoomsPage;
