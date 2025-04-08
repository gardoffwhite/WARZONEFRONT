import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminPage from './pages/AdminPage'; // <-- ตรวจให้แน่ใจว่าชื่อนี้ถูกต้อง

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/" element={<div>Welcome to N-age Warzone</div>} />
      </Routes>
    </Router>
  );
}

export default App;
