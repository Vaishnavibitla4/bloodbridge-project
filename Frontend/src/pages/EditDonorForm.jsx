import React, { useState } from 'react';

const EditDonorForm = ({ donor, userId, onCancel, onUpdate }) => {
  const [formData, setFormData] = useState(donor);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/donor/update/${userId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok) {
        alert('Donor details updated successfully');
        onUpdate(data.donor);
      } else {
        alert(data.message || 'Update failed');
      }
    } catch (err) {
      console.error('Error updating donor:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-blue-700 mb-4">✏ Edit Donor Details</h2>

      <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Full Name" className="w-full px-4 py-2 border rounded-md" />
      <input type="number" name="age" value={formData.age} onChange={handleChange} required placeholder="Age" className="w-full px-4 py-2 border rounded-md" />
      <input type="number" name="weight" value={formData.weight} onChange={handleChange} required placeholder="Weight" className="w-full px-4 py-2 border rounded-md" />
      <input type="text" name="contact" value={formData.contact} onChange={handleChange} required placeholder="Contact Number" className="w-full px-4 py-2 border rounded-md" />
      <input type="text" name="address" value={formData.address} onChange={handleChange} required placeholder="Address" className="w-full px-4 py-2 border rounded-md" />
      <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="City" className="w-full px-4 py-2 border rounded-md" />
      <input type="text" name="district" value={formData.district} onChange={handleChange} required placeholder="District" className="w-full px-4 py-2 border rounded-md" />
      <input type="text" name="state" value={formData.state} onChange={handleChange} required placeholder="State" className="w-full px-4 py-2 border rounded-md" />
      <input type="text" name="area" value={formData.area} onChange={handleChange} required placeholder="Area" className="w-full px-4 py-2 border rounded-md" />
      <input type="date" name="lastDonationDate" value={formData.lastDonationDate?.slice(0, 10)} onChange={handleChange} className="w-full px-4 py-2 border rounded-md" />
      <input type="text" name="diseaseInfo" value={formData.diseaseInfo} onChange={handleChange} placeholder="Disease Info" className="w-full px-4 py-2 border rounded-md" />

      <div className="flex gap-4">
        <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700">Save Changes</button>
        <button type="button" onClick={onCancel} className="bg-gray-400 text-white py-2 px-4 rounded-md hover:bg-gray-500">Cancel</button>
      </div>
    </form>
  );
};

export default EditDonorForm;