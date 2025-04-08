import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password.length < 4) {
      setError('รหัสผ่านต้องมีอย่างน้อย 4 ตัวอักษร');
      return;
    }

    try {
      await register(form.username, form.password);
      navigate('/login');
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">สมัครสมาชิก</h1>
      <form onSubmit={handleSubmit} className="space-y-4 w-80">
        <input
          type="text"
          placeholder="ชื่อผู้ใช้"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
          className="border w-full p-2 rounded"
        />
        <input
          type="password"
          placeholder="รหัสผ่าน"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          className="border w-full p-2 rounded"
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button type="submit" className="bg-green-500 text-white p-2 rounded w-full">
          สมัครสมาชิก
        </button>
      </form>
      <p className="mt-4 text-sm">
        มีบัญชีอยู่แล้ว? <a className="text-blue-600" href="/login">เข้าสู่ระบบ</a>
      </p>
    </div>
  );
}

export default Register;
