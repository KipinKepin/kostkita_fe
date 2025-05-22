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
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    stockKamar: "",
    address: "",
    latitude: "",
    longitude: "",
    facility: [],
  });

  const [errors, setErrors] = useState({});

  const [availableFacilities, setAvailableFacilities] = useState([]);

  useEffect(() => {
    api
      .get("/facility")
      .then((res) => setAvailableFacilities(res.data.data))
      .catch((err) => console.error("Failed to fetch facilities:", err));

    if (id) {
      api
        .get(`/kos/${id}`)
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
    }
  }, [id]);

  const validateForm = () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Name is required";

    if (!form.price) newErrors.price = "Price is required";
    else if (isNaN(Number(form.price)) || Number(form.price) <= 0)
      newErrors.price = "Price must be a positive number";

    if (!form.stockKamar) newErrors.stockKamar = "Stock is required";
    else if (isNaN(Number(form.stockKamar)) || Number(form.stockKamar) < 1)
      newErrors.stockKamar = "Stock must be at least 1";

    if (!form.latitude.trim()) newErrors.latitude = "Latitude is required";
    else if (
      isNaN(Number(form.latitude)) ||
      Number(form.latitude) < -90 ||
      Number(form.latitude) > 90
    )
      newErrors.latitude = "Latitude must be a number between -90 and 90";

    if (!form.longitude.trim()) newErrors.longitude = "Longitude is required";
    else if (
      isNaN(Number(form.longitude)) ||
      Number(form.longitude) < -180 ||
      Number(form.longitude) > 180
    )
      newErrors.longitude = "Longitude must be a number between -180 and 180";

    if (!form.address.trim()) newErrors.address = "Address is required";

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Hapus error ketika user mulai mengubah input
    setErrors((prev) => ({ ...prev, [name]: undefined }));
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

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setLoading(true);
      const payload = {
        ...form,
        price: Number(form.price),
        stockKamar: Number(form.stockKamar),
        latitude: Number(form.latitude),
        longitude: Number(form.longitude),
      };

      if (id) {
        await api.put(`/kos/${id}`, payload);
      } else {
        await api.post("/kos", payload);
      }
      navigate("/manage-room");
    } catch (err) {
      console.error("Failed to add room:", err);
    } finally {
      setLoading(false);
    }
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
    <>
      <Layout />
      <HeaderSection
        title={id ? "Edit Kosan" : "Add Kosan"}
        subtitle={id ? "edit your kosan" : "add a new kosan"}
      />
      <div className="min-h-screen bg-base-200 flex justify-center items-center py-12 px-4">
        <div className="card w-full max-w-xl shadow-lg bg-base-100">
          <div className="card-body">
            <h2 className="card-title justify-center text-2xl">
              {id ? "Edit Room" : "Add New Room"}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4 mt-4">
              {["name", "price", "stockKamar", "latitude", "longitude"].map(
                (field) => (
                  <div key={field}>
                    <input
                      type={
                        field === "price" || field === "stockKamar"
                          ? "number"
                          : "text"
                      }
                      name={field}
                      placeholder={
                        field.charAt(0).toUpperCase() + field.slice(1)
                      }
                      value={form[field]}
                      onChange={handleChange}
                      className={`input input-bordered w-full ${
                        errors[field] ? "border-red-500" : ""
                      }`}
                      required
                    />
                    {errors[field] && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors[field]}
                      </p>
                    )}
                  </div>
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
              <div>
                <textarea
                  name="address"
                  placeholder="Address"
                  value={form.address}
                  onChange={handleChange}
                  className={`textarea textarea-bordered w-full ${
                    errors.address ? "border-red-500" : ""
                  }`}
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <div>
                <p className="font-semibold">Facilities:</p>
                {availableFacilities.length === 0 ? (
                  <p className="text-sm text-gray-500">Loading facilities...</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    {availableFacilities.map((f) => (
                      <label
                        key={f.id}
                        className="flex items-center space-x-2 cursor-pointer"
                      >
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
