import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext';

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(form.username, form.password);
      navigate('/dashboard');
    } catch (err) {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">เข้าสู่ระบบ</h1>
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
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          เข้าสู่ระบบ
        </button>
      </form>
      <p className="mt-4 text-sm">
        ยังไม่มีบัญชี? <a className="text-blue-600" href="/register">สมัครสมาชิก</a>
      </p>
    </div>
  );
}

export default Login;
