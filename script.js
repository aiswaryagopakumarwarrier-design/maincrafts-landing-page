// MOBILE MENU

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

if (menuBtn) {
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// CONTACT FORM + LOCAL STORAGE

const form = document.getElementById("contactForm");

if (form) {

  form.addEventListener("submit", function(e) {

    e.preventDefault();

    const name =
      document.getElementById("name").value.trim();

    const email =
      document.getElementById("email").value.trim();

    const message =
      document.getElementById("message").value.trim();

    if (
      name === "" ||
      email === "" ||
      message === ""
    ) {
      alert("Please fill all fields");
      return;
    }

    if (!email.includes("@")) {
      alert("Please enter a valid email address");
      return;
    }

    const formData = {
      name: name,
      email: email,
      message: message
    };

    let submissions =
      JSON.parse(
        localStorage.getItem("submissions")
      ) || [];

    submissions.push(formData);

    localStorage.setItem(
      "submissions",
      JSON.stringify(submissions)
    );

    alert("Form submitted successfully!");

    form.reset();

  });

}

// DISPLAY SAVED SUBMISSIONS

const submissionList =
  document.getElementById("submissionList");

if (submissionList) {

  const submissions =
    JSON.parse(
      localStorage.getItem("submissions")
    ) || [];

  if (submissions.length === 0) {

    submissionList.innerHTML =
      "<p>No submissions found.</p>";

  } else {

    submissions.forEach((data) => {

      const card =
        document.createElement("div");

      card.classList.add("card");

      card.innerHTML = `
        <h3>${data.name}</h3>
        <p><strong>Email:</strong> ${data.email}</p>
        <p>${data.message}</p>
      `;

      submissionList.appendChild(card);

    });

  }

}