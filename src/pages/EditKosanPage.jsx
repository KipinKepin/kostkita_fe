import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../utils/api";
import Layout from "../components/Layout";
import Footer from "../components/Footer";
import HeaderSection from "../components/HeaderSection";

const EditKosanPage = () => {
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
    // Ambil fasilitas
    api
      .get("/facility")
      .then((res) => setAvailableFacilities(res.data.data))
      .catch((err) => console.error("Failed to fetch facilities:", err));

    // Ambil data kos untuk diedit
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
      .catch((err) => console.error("Failed to fetch room data:", err));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFacilityChange = (e) => {
    const facId = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      facility: prev.facility.some((f) => f.id === facId)
        ? prev.facility.filter((f) => f.id !== facId)
        : [...prev.facility, { id: facId }],
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
      await api.put(`/kos/${id}`, payload);
      navigate("/manage-room");
    } catch (err) {
      console.error("Failed to update room:", err);
    }
  };

  return (
    <div>
      <Layout />
      <HeaderSection title="edit kosan" subtitle="edit data kosan" />
      <div className="p-6 min-h-screen bg-base-200 flex justify-center items-center">
        <div className="card w-full max-w-2xl shadow-xl bg-base-100">
          <div className="card-body">
            <h2 className="card-title text-2xl mb-4 justify-center">
              Edit Kosan
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
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
              <textarea
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
                className="textarea textarea-bordered w-full"
                required
              />

              <div>
                <p className="font-semibold mb-2">Fasilitas:</p>
                {availableFacilities.length === 0 ? (
                  <p className="text-sm text-gray-500">Memuat fasilitas...</p>
                ) : (
                  <div className="grid grid-cols-2 gap-2">
                    {availableFacilities.map((f) => (
                      <label key={f.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          value={f.id}
                          checked={form.facility.some((fac) => fac.id === f.id)}
                          onChange={handleFacilityChange}
                          className="checkbox checkbox-primary"
                        />
                        <span>{f.name}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate("/manage-room")}
                  className="btn btn-outline btn-error"
                >
                  Batal
                </button>
                <button type="submit" className="btn btn-primary">
                  Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EditKosanPage;
