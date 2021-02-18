function check() {
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    if (username === "Demouser" && password === "Demouser") {
      alert("SUCCESS");
      sessionStorage.setItem("firstname", "Demouser");
      window.location = "entry2.html";
    } else if (username === "Roseindia" && password === "Roseindia") {
      alert("SUCCESS");
      sessionStorage.setItem("firstname", "Roseindia");
      window.location = "entry2.html";
    } else {
      alert("Error Password or Username");
    }
  }

  function setTheme(themeName) {
    sessionStorage.setItem("theme", themeName);
    document.documentElement.className = themeName;
    if (sessionStorage.getItem("theme") === "theme-dark") {
    document.body.style.backgroundColor= '#243133';
    } else {
    document.body.style.backgroundColor= '#fbfbfe'
    }
  }
  function toggleTheme() {
    if (sessionStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-light");
    } else {
      setTheme("theme-dark");
    }
  }
  (function () {
    if (sessionStorage.getItem("theme") === "theme-dark") {
      setTheme("theme-dark");
    } else {
      setTheme("theme-light");
    }
  })();