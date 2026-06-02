// MOBILE MENU

const menuBtn = document.getElementById("menu-btn");
const navLinks = document.querySelector(".nav-links");

if(menuBtn){
  menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });
}

// CONTACT FORM VALIDATION

const form = document.getElementById("contactForm");

if(form){

  form.addEventListener("submit", function(e){

    const name =
    document.getElementById("name").value.trim();

    const email =
    document.getElementById("email").value.trim();

    const message =
    document.getElementById("message").value.trim();

    if(name === "" ||
       email === "" ||
       message === ""){

      alert("Please fill all fields");
      e.preventDefault();
      return;
    }

    if(!email.includes("@")){

      alert("Please enter a valid email address");
      e.preventDefault();
      return;
    }

    alert("Form submitted successfully!");

  });

}