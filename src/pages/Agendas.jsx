import { useEffect, useState } from "react";

const Agendas = () => {
  const [items, setItems] = useState([]);
  const data = async () =>
    await fetch("http://localhost:3000/agenda")
      .then((res) => res.json())
      .then((res) => setItems(res));

  useEffect(() => {
    data();
  }, []);
  const handleDelete = async (id) => {
    try {
        await fetch(`http://localhost:3000/agenda/${id}`, {
            method: "DELETE",
        });

        data()
    } catch (error) {
        console.error("Error deleting item:", error);
    }
};

const dateDisplay = (date) => {
  const d = new Date(date)
  const days = ["Ahad","Senin","Selasa","Rabu","Kamis","Jum'at","Sabtu"]
  const months = ["Jan","Feb","Mar","Apr","Mei","Jun","Jul", "Agust", "Sep", "Okt","Nov","Des"]
  return `${days[d.getDay()]}, ${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}
  return (
    <div className="max-w-2xl mx-auto p-2 bg-white shadow-md rounded-md">
      <h1 className="text-xl font-bold mb-4 text-gray-800">Daftar Agenda</h1>
      <div className="my-2 flex justify-end">
        <a href="/agenda/add" className="inline-block px-3 py-1 text-white rounded-md bg-blue-500">Add</a>
      </div>
      {items.length > 0 ? (
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li
              key={index}
              className={"p-4 border border-gray-300 rounded-md shadow-sm hover:shadow-md hover:border-blue-500 transition"+(item.status === "Completed"
                    ? " opacity-60"
                    : " opacity-100")}
            >
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium text-gray-800">
                  {item.title}
                </h3>
                <span className="text-xs font-bold text-gray-500">{dateDisplay(item.date)}</span>
              </div>
              <div className="flex justify-between">
              <p className="text-gray-600 mb-2">{item.description}</p>
              <div className="flex flex-col items-center justify-center gap-2">
                {item.status !== 'Completed' && (<a
                  href={"/agenda/edit/" + item.id}
                  className="mr-2 px-3 py-1 bg-yellow-500 text-white text-sm rounded-md hover:bg-yellow-600 focus:outline-none"
                >
                  Edit
                </a>)}
                <button
                  onClick={()=>handleDelete(item.id)}
                  className="px-3 py-1 bg-red-500 text-white text-sm rounded-md hover:bg-red-600 focus:outline-none"
                >
                  Delete
                </button>
              </div>
              </div>
              <span
                className={
                  "inline-block px-3 py-1 text-sm text-white rounded-md font-bold " +
                  (item.status === "Completed"
                    ? " bg-green-500"
                    : " bg-blue-500")
                }
              >
                {item.status}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">No items available.</p>
      )}
    </div>
  );
};

export default Agendas;
