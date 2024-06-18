
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




const submitMsg = document.querySelector(".submit-msg")

submitMsg.addEventListener("click", async (e) => {
  e.preventDefault()
  try {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;
    const alertmsg = document.getElementById("alertmsg");


    const response = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name, email, message })
    })

    if(!response.ok){
      throw new Error("Netwrok response was not ok")
    }

    const data = await response.json();
    alertmsg.textContent = data.message;
    document.getElementById("contactForm").reset();
  }
  catch (err) {
    console.error("Error:", err)
    alertmsg.textContent = "Something went wrong!"
  }
})