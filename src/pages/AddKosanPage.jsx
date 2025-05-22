import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import api from "../utils/api";
import HeaderSection from "../components/HeaderSection";
import { IoPinOutline } from "react-icons/io5";

const AddKosanPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    price: "",
    stockKamar: "",
    address: "",
    latitude: "",
    longitude: "",
    facility: [],
  });

  const [availableFacilities, setAvailableFacilities] = useState([]);

  useEffect(() => {
    api
      .get("/facility")
      .then((res) => setAvailableFacilities(res.data.data))
      .catch((err) => console.error("Failed to fetch facilities:", err));

    api
      .get(`/kos`)
      .then(({ data }) => {
        const d = data.data;
        setForm({
          name: d.name || "",
          price: d.price || "",
          stockKamar: d.stockKamar || "",
          address: d.address || "",
          latitude: d.latitude || "",
          longitude: d.longitude || "",
          facility: Array.isArray(d.facilities)
            ? d.facilities.map((f) => ({ id: Number(f.id) }))
            : [],
        });
      })
      .catch((err) => console.error("Failed to fetch room:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (e) => {
    const id = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      facility: prev.facility.some((f) => f.id === id)
        ? prev.facility.filter((f) => f.id !== id)
        : [...prev.facility, { id }],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...form,
        price: Number(form.price),
        stockKamar: Number(form.stockKamar),
      };
      await api.post("/kos", payload);
      navigate("/manage-rooms");
    } catch (err) {
      console.error("Failed to add room:", err);
    }
  };

  return (
    <>
      <Layout />
      <HeaderSection title="Add Kosan" subtitle="add a new kosan" />
      <div className="min-h-screen bg-base-200 flex justify-center items-center py-12 px-4">
        <div className="card w-full max-w-xl shadow-lg bg-base-100">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">Add New Room</h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {["name", "price", "stockKamar", "latitude", "longitude"].map(
                (field) => (
                  <input
                    key={field}
                    type={
                      field === "price" || field === "stockKamar"
                        ? "number"
                        : "text"
                    }
                    name={field}
                    placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                    value={form[field]}
                    onChange={handleChange}
                    className="input input-bordered w-full"
                    required
                  />
                )
              )}
              <Link
                to="https://maps.google.com/"
                target="_blank"
                className="flex items-center justify-end text-blue-600 underline"
              >
                <IoPinOutline />
                <span>Go to maps</span>
              </Link>
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              />

              <div>
                <p className="font-semibold">Facilities:</p>
                {availableFacilities.length === 0 ? (
                  <p className="text-sm text-gray-500">Loading facilities...</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableFacilities.map((f) => (
                      <label key={f.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          value={f.id}
                          checked={form.facility.some((fac) => fac.id === f.id)}
                          onChange={handleFacilityChange}
                          className="checkbox checkbox-sm checkbox-primary"
                        />
                        <span className="text-sm">{f.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="card-actions justify-end">
                <button
                  type="button"
                  className="btn btn-outline bg-gray-600 hover:bg-gray-700 text-white"
                  onClick={() => navigate("/manage-room")}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn bg-[#9c2d41] hover:bg-[#C81737FF] text-white"
                >
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AddKosanPage;
