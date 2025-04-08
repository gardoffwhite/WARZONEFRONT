// Function to handle login
async function login() {
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;

  if (!username || !password) {
    alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    return;
  }

  try {
    const response = await fetch('https://warzonebackend-3il3.onrender.com/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (data.token) {
      localStorage.setItem('token', data.token);
      alert('ล็อกอินสำเร็จ!');
      document.getElementById('loginBox').classList.add('hidden');
      document.getElementById('mainApp').classList.remove('hidden');
    } else {
      alert('ข้อมูลไม่ถูกต้อง');
    }
  } catch (error) {
    console.error('Error during login:', error);
    alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
  }
}

// Function to handle register
async function register() {
  const username = document.getElementById('registerUsername').value;
  const password = document.getElementById('registerPassword').value;
  const confirmPassword = document.getElementById('registerConfirmPassword').value;

  if (password !== confirmPassword) {
    alert('รหัสผ่านไม่ตรงกัน');
    return;
  }

  try {
    const response = await fetch('https://warzonebackend-3il3.onrender.com/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await response.json();

    if (data.message === 'User registered successfully!') {
      alert('สมัครสมาชิกสำเร็จ');
      document.getElementById('registerBox').classList.add('hidden');
      document.getElementById('loginBox').classList.remove('hidden');
    } else {
      alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    alert('เกิดข้อผิดพลาดในการสมัครสมาชิก');
  }
}

// Toggle between login and register forms
function toggleRegister() {
  document.getElementById('loginBox').classList.toggle('hidden');
  document.getElementById('registerBox').classList.toggle('hidden');
}
