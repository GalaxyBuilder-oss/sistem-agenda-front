import { useState } from "react";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    status: "",
    file: null,
  });
  const [message, setMessage] = useState("")

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log("Form Data Submitted:", formData);
    const formDataObject = new FormData();
    formDataObject.append("title", formData.title);
    formDataObject.append("description", formData.description);
    formDataObject.append("date", formData.date);
    formDataObject.append("status", formData.status || "Pending");
    if (formData.file) {
      formDataObject.append("file", formData.file);
    }

    const result = await fetch("http://localhost:3000/agenda", {
      method: "POST",
      body: formDataObject,
      // Headers are not required for FormData; browser sets them automatically.
    });
    console.log(result);
    setMessage("Berhasil Ditambahkan")
  };

  return (
    <>
      {message && (<div>
        {message}
      </div>)}
      <h1 className="font-bold text-2xl">Tambahkan Agenda</h1>
      <div>
        <a href="/agenda" className="text-sm italic"> &lt;&lt; Kembali ke halaman sebelumnya</a>
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full p-4 bg-white shadow-md rounded-md space-y-4"
      >
        {/* Title Input */}
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Judul Agenda
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
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
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
          <label
            htmlFor="status"
            className="block text-sm font-medium text-gray-700"
          >
            Status
          </label>
          <div className="radio-group flex justify-around">
            <div className="flex gap-4">
            <input
              type="radio"
              id="status"
              name="status"
              value="Pending"
              onChange={handleChange}
              className="mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              checked
            />{" "}
            Pending
            </div>
            <div className="flex gap-4">
            <input
              type="radio"
              id="status"
              name="status"
              value="Completed"
              onChange={handleChange}
              className="mt-1 block p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            />{" "}
            Completed
            </div>
          </div>
        </div>

        {/* File Input */}
        <div>
          <label
            htmlFor="file"
            className="block text-sm font-medium text-gray-700"
          >
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
          Tambahkan
        </button>
      </form>
    </>
  );
};

export default Add;
