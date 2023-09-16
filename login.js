document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("login_form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      var data = {
        email: email,
        password: password,
      };

      let res;

      // Make API request
      await fetch("https://sevenambola.onrender.com/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then(async function (response) {
          if (response.ok) {
            localStorage.clear();
            res = await response.json();
            const token = res.token;
            const user = res.data;
            console.log(user);
            localStorage.setItem("token", token);
            localStorage.setItem("user", user.name);
            window.location.href = "home.html";
          } else {
            res = await response.json();
            displayFlashMessage(res["msg"]);
          }
        })
        .catch(function (error) {
          console.error("Error posting data:", error);
        });
    });
});

function displayFlashMessage(message) {
  var flashContainer = document.getElementById("flashContainer");
  var flashMessage = document.createElement("div");
  flashMessage.classList.add("flash-message");
  flashMessage.textContent = message;
  flashContainer.appendChild(flashMessage);

  setTimeout(function () {
    flashContainer.removeChild(flashMessage);
  }, 3000);
}
