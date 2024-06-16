// Toggle bar- code

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-btn');
    const toggleIcon = document.querySelector('.toggle-btn i');
    const dropDownMenu = document.querySelector('.dropdown-menu');

    toggleBtn.onclick = function() {
        dropDownMenu.classList.toggle('open');
        const isOpen = dropDownMenu.classList.contains('open');

        toggleIcon.className = isOpen ? 
            'fa-solid fa-xmark' :
            'fa-solid fa-bars';
    };
});

document
.getElementById("contactForm")
.addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const messageElement = document.getElementById("message");

  try {
    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (response.ok) {
      messageElement.textContent = "User created successfully!";
      messageElement.style.color = "green";
      fetchUsers();
    } else {
      messageElement.textContent = "Error creating user";
    }
  } catch (error) {
    messageElement.textContent = "Error creating user";
  }
});

async function fetchUsers() {
try {
  const response = await fetch("/api/users");
  const users = await response.json();
  const contactForm = document.getElementById("contactForm");
  usersList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = `${user.name} - ${user.email}`;
    usersList.appendChild(li);
  });
} catch (error) {
  console.error("Error fetching users:", error);
}
}

// Fetch users on page load
fetchUsers();