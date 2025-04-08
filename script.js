const api = "https://warzonebackend-3il3.onrender.com";
let token = "";

function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;
  const confirm = document.getElementById("register-confirm").value;

  if (password !== confirm) {
    alert("Passwords do not match");
    return;
  }

  fetch(api + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => alert(data.message || "Registered"))
  .catch(err => alert("Error registering"));
}

function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  fetch(api + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  })
  .then(res => res.json())
  .then(data => {
    if (data.token) {
      token = data.token;
      document.getElementById("player-name").innerText = username;
      document.getElementById("auth-section").style.display = "none";
      document.getElementById("main-section").style.display = "block";
    } else {
      alert(data.message || "Login failed");
    }
  })
  .catch(err => alert("Error logging in"));
}

function logout() {
  token = "";
  document.getElementById("auth-section").style.display = "block";
  document.getElementById("main-section").style.display = "none";
}

function drawItem() {
  const characterName = document.getElementById("character-name").value;
  if (!characterName) {
    alert("Enter character name first");
    return;
  }

  fetch(api + "/items/draw", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ characterName })
  })
  .then(res => res.json())
  .then(data => {
    document.getElementById("result").innerText = data.item
      ? `You received: ${data.item.name}`
      : "Failed to draw item";
  })
  .catch(err => alert("Error drawing item"));
}
