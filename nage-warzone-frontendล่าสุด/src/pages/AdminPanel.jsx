import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../auth/AuthContext";

function AdminPanel() {
  const { logout } = useAuth();
  const [logs, setLogs] = useState([]);
  const [rates, setRates] = useState({});
  const [newRates, setNewRates] = useState({});
  const [username, setUsername] = useState("");
  const [amount, setAmount] = useState(1);

  const fetchLogs = async () => {
    const res = await axios.get("https://warzonebackend-3il3.onrender.com/api/admin/logs");
    setLogs(res.data);
  };

  const handleGiveToken = async () => {
    await axios.post("https://warzonebackend-3il3.onrender.com/api/admin/token", {
      username,
      amount: parseInt(amount),
    });
    alert("เพิ่ม Token สำเร็จ");
  };

  const handleUpdateRates = async () => {
    await axios.post("https://warzonebackend-3il3.onrender.com/api/admin/rates", newRates);
    alert("อัปเดตอัตราการสุ่มสำเร็จ");
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">แผงควบคุมแอดมิน</h1>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">🎁 เพิ่ม Token ให้ผู้ใช้</h2>
        <input
          className="border p-2 mr-2"
          placeholder="ชื่อผู้ใช้"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="number"
          className="border p-2 w-24 mr-2"
          placeholder="จำนวน"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button onClick={handleGiveToken} className="bg-blue-600 text-white p-2 rounded">
          เพิ่ม Token
        </button>
      </div>

      <div className="mb-6">
        <h2 className="font-semibold mb-2">⚙️ ตั้งค่าอัตราการสุ่ม</h2>
        {Object.entries(rates).map(([item, rate]) => (
          <div key={item} className="flex items-center mb-2">
            <span className="w-32">{item}</span>
            <input
              type="number"
              className="border p-1 w-24"
              defaultValue={rate}
              onChange={(e) =>
                setNewRates((prev) => ({ ...prev, [item]: parseInt(e.target.value) }))
              }
            />
          </div>
        ))}
        <button onClick={handleUpdateRates} className="mt-2 bg-green-600 text-white p-2 rounded">
          บันทึกอัตรา
        </button>
      </div>

      <div>
        <h2 className="font-semibold mb-2">📜 ประวัติการสุ่ม</h2>
        <ul className="space-y-1 max-h-80 overflow-y-auto">
          {logs.map((log, index) => (
            <li key={index} className="border p-2 rounded">
              <b>{log.username}</b> สุ่มได้ <b>{log.item}</b> ให้ตัวละคร <b>{log.characterName}</b> 
              <br />
              <small>{new Date(log.timestamp).toLocaleString()}</small>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={logout} className="mt-6 text-red-500 underline">ออกจากระบบ</button>
    </div>
  );
}

export default AdminPanel;
