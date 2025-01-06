// src/Chat.jsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:3000"); // Ganti dengan URL server Anda jika perlu

const Chat = () => {
  const [messagesPvt, setMessagesPvt] = useState([]);
  const [input, setInput] = useState("");
  const [receiver, setReceiver] = useState("0");

  const { id } = useParams();

  const users = [
    { id: 0, name: "Ajang" },
    { id: 1, name: "Salim" },
    { id: 2, name: "Aditia" },
  ];

  useEffect(() => {
    socket.emit("registered user", { userId: id });
    socket.emit("start chat", { userId: id });

    socket.on("private message", ({ user, msg }) => {
      setMessagesPvt((prevMessages) => [...prevMessages, { user, msg }]);
    });

    return () => {
      socket.off("private message");
    };
  }, [id]);

  const sendMessagePrivate = (e) => {
    e.preventDefault();
    if (input) {
      const messageData = {
        senderId: parseInt(id),
        receiverId: id === "1" ? receiver : '1',
        msg: input,
      };

      // Emit pesan pribadi
      socket.emit("private message", messageData);

      // Tambahkan pesan ke daftar pesan privat
      const sender = users.find(user => user.id === messageData.senderId);
      const senderMessage = { user: sender, msg: input };

      setMessagesPvt((prevMessages) => [...prevMessages, senderMessage]);

      // Kosongkan input
      setInput("");
      setReceiver("");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h3 className="text-2xl font-bold mb-4">Hallo {id}!</h3>

      <div>
        <h4 className="text-lg font-semibold">Private Chat</h4>
        <ul className="border border-gray-300 rounded-lg p-2 mb-4 max-h-60 overflow-auto">
          {messagesPvt.map((message, index) => (
            <li
              key={index}
              className={`py-1 flex ${
                message.user.id === parseInt(id)
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              <span
                className={`inline-block p-2 rounded-lg ${
                  message.user.id === parseInt(id)
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-black"
                }`}
              >
                {message.user.name}: {message.msg}
              </span>
            </li>
          ))}
        </ul>
        <form onSubmit={sendMessagePrivate} className="flex">
          {id === "1" && (
            <select
              defaultValue={receiver}
              onChange={(e) => setReceiver(e.target.value.toString())}
              className="border border-gray-300 rounded-l-lg p-2 flex-grow mr-1"
            >
              {users.map((user) => user.id !==1 &&(
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              ))}
            </select>
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="border border-gray-300 rounded-l-lg p-2 flex-grow mr-1"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-r-lg px-4"
          >
            Send
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chat;
