import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const Edit = () => {
  const {id} = useParams()
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    status: "Pending",
    file: null,
  });

  // Fetch data agenda berdasarkan ID
  const fetchAgenda = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/agenda/${id}`);
      if (response.ok) {
        const data = await response.json();
        setFormData({
          title: data.title || "",
          description: data.description || "",
          date: data.date || "",
          status: data.status || "Pending",
          file: null, // File tidak bisa dimuat ulang
        });
      } else {
        console.error("Failed to fetch agenda data.");
      }
    } catch (error) {
      console.error("Error fetching agenda:", error);
    }
  };

  // Load data agenda saat komponen di-mount
  useEffect(() => {
    if (id) {
      fetchAgenda(id);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataObject = new FormData();
    formDataObject.append("title", formData.title);
    formDataObject.append("description", formData.description);
    formDataObject.append("date", formData.date);
    formDataObject.append("status", formData.status);
    if (formData.file) {
      formDataObject.append("file", formData.file);
    }

    try {
      const response = await fetch(`http://localhost:3000/agenda/${id}`, {
        method: "PUT",
        body: formDataObject,
      });

      if (response.ok) {
        alert("Item updated successfully!");
        // Redirect or perform further actions
      } else {
        console.error("Failed to update item");
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <div className="w-full h-[100vh] flex flex-col justify-center items-center">
      <h1 className="text-2xl font-bold">Perbaharui {formData.title}</h1>
    <form onSubmit={handleSubmit} className="w-1/2 mx-auto p-4 bg-white shadow-md rounded-md space-y-4">
      <div>
        <a href="/agenda" className="text-blue-500 hover:underline italic">
          &lt;&lt; Kembali Ke Halaman Utama
        </a>
      </div>

      {/* Title Input */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Judul
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter title"
          required
        />
      </div>

      {/* Description Input */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Keterangan
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter description"
          rows="4"
          required
        ></textarea>
      </div>

      {/* Date Input */}
      <div>
        <label htmlFor="date" className="block text-sm font-medium text-gray-700">
          Tanggal Upload
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          required
        />
      </div>

      {/* Status Input */}
      <div>
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">
          Status
        </label>
        <div className="flex space-x-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="Pending"
              checked={formData.status === "Pending"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span>Pending</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="status"
              value="Completed"
              checked={formData.status === "Completed"}
              onChange={handleChange}
              className="form-radio h-4 w-4 text-blue-500"
            />
            <span>Completed</span>
          </label>
        </div>
      </div>

      {/* File Input */}
      <div>
        <label htmlFor="file" className="block text-sm font-medium text-gray-700">
          File
        </label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={handleChange}
          className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Perbaharui
      </button>
    </form>
    </div>
  );
};

export default Edit;
