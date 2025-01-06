import { useState } from "react";

const Home = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [agendas, setAgendas] = useState([]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !description) return;

        const newAgenda = { title, description };
        setAgendas([...agendas, newAgenda]);
        setTitle('');
        setDescription('');
    };

    return (
        <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
            <h1 className="text-xl font-bold mb-4">Pencatatan Agenda</h1>
            <form onSubmit={handleSubmit} className="mb-4">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                />
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="border border-gray-300 rounded p-2 w-full mb-2"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    Add Agenda
                </button>
            </form>
            <ul>
                {agendas.map((agenda, index) => (
                    <li key={index} className="border-b py-2">
                        <h2 className="font-semibold">{agenda.title}</h2>
                        <p>{agenda.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home