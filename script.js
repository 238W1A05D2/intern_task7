const userContainer = document.getElementById("userContainer");
const errorMsg = document.getElementById("errorMsg");
const reloadBtn = document.getElementById("reloadBtn");

async function fetchUsers() {
  errorMsg.textContent = '';
  userContainer.innerHTML = '<p>Loading users...</p>';
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    if (!response.ok) throw new Error("Failed to fetch users");

    const users = await response.json();
    displayUsers(users);
  } catch (error) {
    errorMsg.textContent = "⚠️ Unable to fetch users. Check your connection!";
    userContainer.innerHTML = '';
  }
}

function displayUsers(users) {
  userContainer.innerHTML = '';
  users.forEach(user => {
    const card = document.createElement("div");
    card.classList.add("user-card");
    card.innerHTML = `
      <h3>${user.name}</h3>
      <p><strong>Email:</strong> ${user.email}</p>
      <p><strong>City:</strong> ${user.address.city}</p>
      <p><strong>Phone:</strong> ${user.phone}</p>
    `;
    userContainer.appendChild(card);
  });
}

reloadBtn.addEventListener("click", fetchUsers);
window.addEventListener("load", fetchUsers);
