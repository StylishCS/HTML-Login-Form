document.addEventListener("DOMContentLoaded", async function () {
  // document
  //   .getElementById("logout")
  //   .addEventListener("submit", async function (event) {
  //     event.preventDefault();
  //     window.location.href = "index.html";
  //   });

  fetch("https://sevenambola.onrender.com/quotes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "x-auth-token": localStorage.getItem("token"),
    },
  })
    .then(async (res) => {
      let response = await res.json();
      const para = document.createElement("h1");
      const node = document.createTextNode(response.data);
      para.appendChild(node);
      const element = document.getElementById("data");
      element.appendChild(para);
    })
    .catch((err) => {
      console.log("error: ", err);
    });
});

async function logout() {
  localStorage.clear();
  window.location.href = "login.html";
}
