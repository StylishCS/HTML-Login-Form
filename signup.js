document.addEventListener("DOMContentLoaded", async function () {
  document
    .getElementById("signup_form")
    .addEventListener("submit", async function (event) {
      event.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const con_password = document.getElementById("con_password").value;

      if (password != con_password) {
        alert("passwords doesn't match");
      } else {
        var data = {
          name: name,
          email: email,
          password: password,
        };

        let res;

        // Make API request
        await fetch("https://sevenambola.onrender.com/users/signup", {
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
              const user = res;
              console.log(res);
              localStorage.setItem("token", token);
              localStorage.setItem("user", user.email);
              window.location.href = "otp.html";
            }
            res = await response.json();
            console.log(res);
          })
          .catch(function (error) {
            console.log("Error posting data:", error);
          });
      }
    });
});
