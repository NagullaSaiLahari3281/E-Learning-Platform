let courses = [
  {
    title: "HTML Basics",
    desc: "Learn HTML step by step",
    image: "assets/html.png",
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Text Machine Language",
      "Hyperlinks Text Language"
    ],
    answer: 0
  },
  {
    title: "CSS Mastery",
    desc: "Learn CSS styling",
    image: "assets/css.png",
    question: "Which property is used to change text color?",
    options: ["font-style", "color", "background"],
    answer: 1
  },
  {
    title: "JavaScript",
    desc: "Learn JS interactivity",
    image: "assets/js.png",
    question: "Which keyword is used to declare variable?",
    options: ["var", "int", "string"],
    answer: 0
  }
];

let selectedCourse = null;

//  Load Courses

function loadCourses(data = courses) {
  let container = document.getElementById("courses");
  container.innerHTML = "";

  data.forEach((course, index) => {
    container.innerHTML += `
      <div class="course">
        <img src="${course.image}" alt="${course.title}">
        <h3>${course.title}</h3>
        <p>${course.desc}</p>

        <button onclick="enroll(${index})">Enroll</button>
        <button onclick="viewLesson(${index})">View</button>
        <button onclick="openQuiz(${index})">Take Quiz</button>
      </div>
    `;
  });
}

//  Enroll Course

function enroll(index) {
  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];

  let courseName = courses[index].title;

  if (!enrolled.includes(courseName)) {
    enrolled.push(courseName);
    localStorage.setItem("enrolled", JSON.stringify(enrolled));

    alert("✅ Enrolled Successfully!");
    updateDashboard();
  } else {
    alert("⚠ Already enrolled!");
  }
}


// Dashboard

function updateDashboard() {
  let dashboard = document.getElementById("dashboard");
  dashboard.innerHTML = "";

  let enrolled = JSON.parse(localStorage.getItem("enrolled")) || [];
  enrolled = enrolled.filter(item => typeof item === "string");

  if (enrolled.length === 0) {
    dashboard.innerHTML = "<p>No courses enrolled yet</p>";
    return;
  }

  enrolled.forEach(course => {
    let div = document.createElement("div");
    div.classList.add("dashboard-item");

    div.innerHTML = `
      ${course}<br>
      ✔ Enrolled
    `;

    dashboard.appendChild(div);
  });
}

//  Search

function searchCourses() {
  let value = document.getElementById("search").value.toLowerCase();

  let filtered = courses.filter(course =>
    course.title.toLowerCase().includes(value)
  );

  loadCourses(filtered);
}

//  Lesson

function viewLesson(index) {
  document.getElementById("lessonTitle").innerText = courses[index].title;
  document.getElementById("lessonContent").innerText =
    "This is lesson content for " + courses[index].title;

  document.getElementById("lessonBox").style.display = "block";
}

function closeLesson() {
  document.getElementById("lessonBox").style.display = "none";
}

//  Quiz

function openQuiz(index) {
  selectedCourse = courses[index];

  document.getElementById("question").innerText = selectedCourse.question;

  let answersDiv = document.getElementById("answers");
  answersDiv.innerHTML = "";

  selectedCourse.options.forEach((opt, i) => {
    answersDiv.innerHTML += `
      <div>
        <input type="radio" name="quiz" value="${i}"> ${opt}
      </div>
    `;
  });

  document.getElementById("quizBox").style.display = "block";
}

//  Submit Quiz

function submitQuiz() {
  let selected = document.querySelector('input[name="quiz"]:checked');

  if (!selected) {
    alert("⚠ Please select an answer!");
    return;
  }

  if (parseInt(selected.value) === selectedCourse.answer) {
    alert("🎉 Correct Answer!");
  } else {
    alert("❌ Wrong Answer!");
  }

  document.getElementById("quizBox").style.display = "none";
}

loadCourses();
updateDashboard();