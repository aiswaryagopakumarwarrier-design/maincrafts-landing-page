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
// TASK MANAGER DASHBOARD

const taskInput =
document.getElementById("taskInput");

const addTaskBtn =
document.getElementById("addTaskBtn");

if(taskInput && addTaskBtn){

  const taskList =
  document.getElementById("taskList");

  const searchInput =
  document.getElementById("searchInput");

  const totalTasks =
  document.getElementById("totalTasks");

  const completedTasks =
  document.getElementById("completedTasks");

  let tasks =
  JSON.parse(
    localStorage.getItem("tasks")
  ) || [];

  function saveTasks(){

    localStorage.setItem(
      "tasks",
      JSON.stringify(tasks)
    );

  }

  function updateStats(){

    totalTasks.textContent =
    tasks.length;

    completedTasks.textContent =
    tasks.filter(
      task => task.completed
    ).length;

  }

  function displayTasks(
    searchTerm = ""
  ){

    taskList.innerHTML = "";

    const filteredTasks =
    tasks.filter(task =>
      task.text
      .toLowerCase()
      .includes(
        searchTerm.toLowerCase()
      )
    );

    filteredTasks.forEach((task) => {

      const originalIndex =
      tasks.indexOf(task);

      const taskCard =
      document.createElement("div");

      taskCard.classList.add(
        "task-card"
      );

      if(task.completed){

        taskCard.classList.add(
          "completed"
        );

      }

      taskCard.innerHTML = `
        <span>${task.text}</span>

        <div class="task-actions">

          <button
          class="complete-btn"
          onclick="toggleComplete(${originalIndex})">
          ✓
          </button>

          <button
          class="edit-btn"
          onclick="editTask(${originalIndex})">
          Edit
          </button>

          <button
          class="delete-btn"
          onclick="deleteTask(${originalIndex})">
          Delete
          </button>

        </div>
      `;

      taskList.appendChild(
        taskCard
      );

    });

    updateStats();

  }

  addTaskBtn.addEventListener(
  "click", () => {

    const task =
    taskInput.value.trim();

    if(task === ""){

      alert(
        "Please enter a task"
      );

      return;

    }

    tasks.push({
      text:task,
      completed:false
    });

    saveTasks();

    displayTasks();

    taskInput.value = "";

  });

  window.toggleComplete =
  function(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    displayTasks(
      searchInput.value
    );

  }

  window.deleteTask =
  function(index){

    tasks.splice(index,1);

    saveTasks();

    displayTasks(
      searchInput.value
    );

  }

  window.editTask =
  function(index){

    const updatedTask =
    prompt(
      "Edit Task",
      tasks[index].text
    );

    if(
      updatedTask &&
      updatedTask.trim() !== ""
    ){

      tasks[index].text =
      updatedTask.trim();

      saveTasks();

      displayTasks(
        searchInput.value
      );

    }

  }

  searchInput.addEventListener(
  "keyup", () => {

    displayTasks(
      searchInput.value
    );

  });

  displayTasks();

}