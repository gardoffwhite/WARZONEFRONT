import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

function Dashboard() {
  const { user, logout } = useAuth();
  const [characterName, setCharacterName] = useState("");
  const [tokens, setTokens] = useState(0);
  const [rolledItem, setRolledItem] = useState("");

  const fetchTokens = async () => {
    const res = await axios.get(`https://warzonebackend-3il3.onrender.com/api/tokens/${user.username}`);
    setTokens(res.data.tokens);
  };

  useEffect(() => {
    fetchTokens();
  }, []);

  const handleRoll = async () => {
    if (!characterName) return alert("กรุณาใส่ชื่อตัวละคร");
    try {
      const res = await axios.post("https://warzonebackend-3il3.onrender.com/api/roll", {
        username: user.username,
        characterName,
      });
      setRolledItem(res.data.item);
      fetchTokens();
    } catch (err) {
      alert("ไม่สามารถสุ่มไอเท็มได้: " + err.response?.data?.error);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">สวัสดี {user.username}</h1>
      <p className="mb-2">Token คงเหลือ: <b>{tokens}</b></p>
      <input
        type="text"
        placeholder="ชื่อตัวละคร"
        value={characterName}
        onChange={(e) => setCharacterName(e.target.value)}
        className="border p-2 w-full mb-2 rounded"
      />
      <button onClick={handleRoll} className="bg-purple-600 text-white p-2 rounded w-full mb-4">
        🎲 สุ่มไอเท็ม
      </button>
      {rolledItem && (
        <div className="bg-green-100 p-4 rounded text-center font-bold">
          🎉 ได้รับไอเท็ม: {rolledItem}
        </div>
      )}
      <button onClick={logout} className="mt-6 text-red-500 underline">ออกจากระบบ</button>
    </div>
  );
}

export default Dashboard;
