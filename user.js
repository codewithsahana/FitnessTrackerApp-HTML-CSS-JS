window.onload = function () {
  if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
  } else {
    const username = localStorage.getItem("username");
    document.getElementById("username").textContent = username;
  }
};
// Function to reset the logout timer
function resetLogoutTimer() {
  clearTimeout(logoutTimer);
  logoutTimer = setTimeout(logout, 300000); // 300,000 ms = 5 minutes
}
// Event listener for the logout button
logoutButton.addEventListener("click", logout);
// Event listeners for user activity
document.addEventListener("mousemove", resetLogoutTimer);
document.addEventListener("keypress", resetLogoutTimer);
document.addEventListener("scroll", resetLogoutTimer);
document.addEventListener("click", resetLogoutTimer);
// Initial setup of the logout timer
resetLogoutTimer();
function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("username");
  window.location.href = "index.html";
}
// // Warn the user when they try to navigate away from the page
window.addEventListener("beforeunload", (event) => {
  event.preventDefault();
  event.returnValue = "";
  logout(); // Log out the user before leaving
});

//user data details

function saveUserDetails() {
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const dob = document.getElementById("dob").value;
  const gender = document.getElementById("gender").value;
  // Save user details logic (e.g., to local storage or a server)
  console.log(
    `User Details - Weight: ${weight}, Height: ${height}, DOB: ${dob}, Gender: ${gender}`
  );
}
//meal tracking
document
  .getElementById("meal-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const meal = document.getElementById("meal").value;
    const calories = parseInt(document.getElementById("calories").value);
    addMeal(meal, calories);
    updateTotalCalories(calories);
    // Clear the input fields
    document.getElementById("meal").value = "";
    document.getElementById("calories").value = "";
  });
function addMeal(meal, calories) {
  const mealList = document.getElementById("meal-list").querySelector("ul");
  const mealItem = document.createElement("li");
  mealItem.textContent = `Meal: ${meal}, Calories: ${calories}`;
  mealList.appendChild(mealItem);
}
function updateTotalCalories(calories) {
  const totalCaloriesElement = document.getElementById("total-calories");
  const currentTotal = parseInt(totalCaloriesElement.textContent);
  const newTotal = currentTotal + calories;
  totalCaloriesElement.textContent = newTotal;
}
//workout tracking
document
  .getElementById("workout-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const workoutDay = document.getElementById("workout-day").value;
    const workoutType = document.getElementById("workout-type").value;
    const workoutHours = parseFloat(
      document.getElementById("workout-hours").value
    );
    const caloriesBurnt = parseInt(
      document.getElementById("calories-burnt").value
    );
    addWorkout(workoutDay, workoutType, workoutHours, caloriesBurnt);
    // Clear the input fields
    document.getElementById("workout-day").value = "";
    document.getElementById("workout-type").value = "";
    document.getElementById("workout-hours").value = "";
    document.getElementById("calories-burnt").value = "";
  });
function addWorkout(workoutDay, workoutType, workoutHours, caloriesBurnt) {
  const workoutList = document
    .getElementById("workout-list")
    .querySelector("ul");
  const workoutItem = document.createElement("li");
  workoutItem.textContent = `Day: ${workoutDay}, Workout: ${workoutType}, Hours: ${workoutHours}, Calories Burnt: ${caloriesBurnt}`;
  workoutList.appendChild(workoutItem);
}
//goal setting
document
  .getElementById("goal-form")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const weightliftingGoal =
      document.getElementById("weightlifting-goal").value;
    const weightGoal = document.getElementById("weight-goal").value;
    setGoals(weightliftingGoal, weightGoal);
    // Clear the input fields
    document.getElementById("weightlifting-goal").value = "";
    document.getElementById("weight-goal").value = "";
  });
function setGoals(weightliftingGoal, weightGoal) {
  const currentWeightliftingGoal = document.getElementById(
    "current-weightlifting-goal"
  );
  const currentWeightGoal = document.getElementById("current-weight-goal");
  currentWeightliftingGoal.textContent = `Weightlifting Goal: ${weightliftingGoal} kg`;
  currentWeightGoal.textContent = `Weight Gain/Loss Goal: ${weightGoal} kg`;
  console.log(
    `Goals Set - Weightlifting Goal: ${weightliftingGoal} kg, Weight Gain/Loss Goal: ${weightGoal} kg`
  );
}
//your monthly progress report
document
  .getElementById("progress-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission
    const date = document.getElementById("progress-date").value;
    const weightchange = document.getElementById("weight-change").value;
    const weightlift = document.getElementById("weightlifting-number").value;
    const bodyreps = document.getElementById("body-weight-reps").value;
    const hoursworkout = document.getElementById("hours-workout").value;
    const cardio = document.getElementById("cardio-done").value;
    // Import jsPDF
    const { jsPDF } = window.jspdf;
    // Create a new PDF document
    const doc = new jsPDF();
    // Add text to the PDF
    doc.text("Your Monthly Report:-", 10, 20);
    doc.text(`Date: ${date}`, 10, 30);
    doc.text(`Weight-Change: ${weightchange}`, 10, 40);
    doc.text(`Weight-Lift: ${weightlift}`, 10, 50);
    doc.text(`Body-Reps: ${bodyreps}`, 10, 60);
    doc.text(`Hours-Workout: ${hoursworkout}`, 10, 70);
    doc.text(`Cardio: ${cardio}`, 10, 80);
    // Save the PDF
    doc.save("monthly-fitness-report.pdf");
  });
