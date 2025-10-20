import { useState, useEffect } from "react";
import axios from "axios";
import DonorDetails from "./DonorDetails";
import { toast } from "react-toastify";

const telanganaDistricts = [
  "Adilabad","Bhadradri Kothagudem","Hanumakonda","Hyderabad","Jagitial",
  "Jangaon","Jayashankar Bhupalpally","Jogulamba Gadwal","Kamareddy","Karimnagar",
  "Khammam","Komaram Bheem Asifabad","Mahabubabad","Mahabubnagar","Mancherial",
  "Medak","Medchal–Malkajgiri","Mulugu","Nagarkurnool","Nalgonda","Narayanpet",
  "Nirmal","Nizamabad","Peddapalli","Rajanna Sircilla","Ranga Reddy","Sangareddy",
  "Siddipet","Suryapet","Vikarabad","Wanaparthy","Warangal","Yadadri Bhuvanagiri"
];

const andhraDistricts = [
  "Anantapur","Chittoor","East Godavari","Guntur","Krishna","Kurnool",
  "Nellore","Prakasam","Srikakulam","Visakhapatnam","Vizianagaram","West Godavari"
];

const BecomeDonorForm = ({ userId, email }) => {
  const [formData, setFormData] = useState({
    name: "", age: "", weight: "", gender: "", bloodGroup: "", contact: "",
    email: email || "", address: "", city: "", district: "", state: "",
    area: "", lastDonationDate: "", diseaseInfo: ""
  });

  const [donor, setDonor] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  // ✅ Fetch donor by email on mount
  useEffect(() => {
    const fetchDonor = async () => {
      try {
        if (!formData.email) return;
        const res = await axios.get(`${import.meta.env.local.VITE_API_URL}/api/donors/email/${formData.email}`);
        if (res.data && res.data._id) {
          setDonor(res.data);
          setFormData({
            ...res.data,
            lastDonationDate: res.data.lastDonationDate
              ? res.data.lastDonationDate.split("T")[0]
              : "",
          });
        }
      } catch {
        console.log("No donor record found yet");
      }
    };
    fetchDonor();
  }, [formData.email]);

  // ✅ Handle change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "state") setFormData({ ...formData, state: value, district: "" });
    else setFormData({ ...formData, [name]: value });
  };

  // ✅ Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const age = parseInt(formData.age);
    const weight = parseFloat(formData.weight);

    if (age < 18 || age > 65) return toast.error("Age must be between 18 and 65.");
    if (weight < 45) return toast.error("Weight must be at least 45 kg.");

    try {
      let res;

      if (donor) {
        // Update existing donor
        res = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/donors/${donor._id}`,
          { ...formData, userId }
        );

        // ✅ Set updated donor correctly
        setDonor(res.data);
        setFormData({
          ...res.data,
          lastDonationDate: res.data.lastDonationDate
            ? res.data.lastDonationDate.split("T")[0]
            : "",
        });

        toast.success("Details updated successfully!");
      } else {
        // Add new donor
        res = await axios.post(`${import.meta.env.VITE_API_URL}/api/donors`, {
          ...formData,
          userId,
        });

        // The API returns { message, donor }
        setDonor(res.data.donor);
        setFormData({
          ...res.data.donor,
          lastDonationDate: res.data.donor.lastDonationDate
            ? res.data.donor.lastDonationDate.split("T")[0]
            : "",
        });

        toast.success("Donor successfully added!");
      }

      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = () => setIsEditing(true);

  const districtOptions =
    formData.state === "Telangana"
      ? telanganaDistricts
      : formData.state === "Andhra Pradesh"
      ? andhraDistricts
      : [];

  return (
    <div className="max-w-3xl mx-auto mt-20 p-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-red-700 mb-8 text-center">
        Become a Blood Donor
      </h2>

      {donor && !isEditing ? (
        <DonorDetails donor={donor} onEdit={handleEdit} />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-8">
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">

    {/* Full Name */}
    <div>
      <label className="block font-medium">Full Name</label>
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
    </div>

    {/* Age */}
    <div>
      <label className="block font-medium">Age</label>
      <input
        type="number"
        name="age"
        value={formData.age}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
    </div>

    {/* Weight */}
    <div>
      <label className="block font-medium">Weight (kg)</label>
      <input
        type="number"
        name="weight"
        value={formData.weight}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
    </div>

    {/* Gender */}
    <div>
      <label className="block font-medium">Gender</label>
      <select
        name="gender"
        value={formData.gender}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
    </div>

    {/* Blood Group */}
    <div>
      <label className="block font-medium">Blood Group</label>
      <select
        name="bloodGroup"
        value={formData.bloodGroup}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      >
        <option value="">Select</option>
        {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map((group) => (
          <option key={group} value={group}>
            {group}
          </option>
        ))}
      </select>
    </div>

    {/* Contact */}
    <div>
      <label className="block font-medium">Contact</label>
      <input
        type="tel"
        name="contact"
        value={formData.contact}
        onChange={handleChange}
        className="w-full border rounded p-2"
        required
      />
    </div>

    {/* Email */}
    <div>
      <label className="block font-medium">Email</label>
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        className="w-full border rounded p-2 bg-gray-100"
        readOnly
      />
    </div>

    {/* Address */}
    <div>
      <label className="block font-medium">Address</label>
      <input
        type="text"
        name="address"
        value={formData.address}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
    </div>

    {/* City */}
    <div>
      <label className="block font-medium">City</label>
      <input
        type="text"
        name="city"
        value={formData.city}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
    </div>

    {/* State */}
    <div>
      <label className="block font-medium">State</label>
      <select
        name="state"
        value={formData.state}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        <option value="">Select</option>
        <option value="Telangana">Telangana</option>
        <option value="Andhra Pradesh">Andhra Pradesh</option>
      </select>
    </div>

    {/* District */}
    <div>
      <label className="block font-medium">District</label>
      <select
        name="district"
        value={formData.district}
        onChange={handleChange}
        className="w-full border rounded p-2"
      >
        <option value="">Select</option>
        {districtOptions.map((district) => (
          <option key={district} value={district}>
            {district}
          </option>
        ))}
      </select>
    </div>

    {/* Area */}
    <div>
      <label className="block font-medium">Area</label>
      <input
        type="text"
        name="area"
        value={formData.area}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
    </div>

    {/* Last Donation Date */}
    <div>
      <label className="block font-medium">Last Donation Date</label>
      <input
        type="date"
        name="lastDonationDate"
        value={formData.lastDonationDate}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
    </div>

    {/* Disease Info */}
    <div>
      <label className="block font-medium">Disease Info (if any)</label>
      <input
        type="text"
        name="diseaseInfo"
        value={formData.diseaseInfo}
        onChange={handleChange}
        className="w-full border rounded p-2"
      />
    </div>
  </div>

  <div className="flex justify-between mt-6">
    {donor && (
      <button
        type="button"
        onClick={() => setIsEditing(false)}
        className="bg-gray-400 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition"
      >
        Cancel
      </button>
    )}

    <button
      type="submit"
      className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition"
    >
      {donor ? "Save Changes" : "Submit"}
    </button>
  </div>
</form>

      )}
    </div>
  );
};

export default BecomeDonorForm;
