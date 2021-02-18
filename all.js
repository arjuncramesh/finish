var x = sessionStorage.getItem("firstname");
// if (!x) {
//   window.location = "index.html";
// }
let mob = sessionStorage.getItem("mobileNumber");
let otp123 = sessionStorage.getItem("otp");
function generateOTP() {
  mobileNumber = document.getElementById("otp").value;
  sessionStorage.setItem("mobileNumber", mobileNumber);
  let digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 4; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  sessionStorage.setItem("otp", OTP);
  console.log(OTP);
  window.location.replace("number.html");
  return false;
}


function pageUrl() {
  if (x === "Roseindia") {
    window.location = "dis.html";
    return false;
  }
  if (x === "Demouser") {
    window.location = "6th.html";
    return false;
  }
}

function otpgen() {
  let verfyOtp = document.getElementById("verify").value;
  let OTP = sessionStorage.getItem("otp");
  if (verfyOtp === OTP) {
    alert("success");
    localStorage.removeItem("otp");
    if (x === "Roseindia") {
      window.location = "den.html";
      return false;
    }
    if (x === "Demouser") {
      window.location = "5th.html";
      return false;
    }
    return false;
  } else {
    alert("failed");
  }
}
// 5th page local storage data upload
var imageUrl = null;
function imageToDataUri(img, width, height) {
  var canvas = document.createElement("canvas"),
    ctx = canvas.getContext("2d");
  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(img, 0, 0, width, height);
  return canvas.toDataURL();
}
async function PreviewImage() {
  var oFReader = new FileReader();
  let imageSrc;
  oFReader.readAsDataURL(document.getElementById("default-file").files[0]);

  oFReader.onload = async function (oFREvent) {
    const src = await oFREvent.target.result;
    document.getElementById("preview_img").src = src;
    imageUrl = src;
    return src;
  };
}
async function Create() {
  let data1 = document.getElementById("data1").value;
  let data2 = document.getElementById("data2").value;
  let data3 = document.getElementById("data3").value;
  let bannerImage = document.getElementById("preview_img");
  let cafelist = document.getElementById("cafelist");
  if (data1 && data2 && data3 && bannerImage) {
    let li = document.createElement("div");
    let name = document.createElement("span");
    let city = document.createElement("span");
    let Adhar = document.createElement("span");
    li.setAttribute("data-id", data1);
    name.textContent = data1;
    city.textContent = data2;
    Adhar.textContent = data3;
    mainData = {
      name: data1,
      city: data2,
      adhar: data3,
      img: imageUrl,
    };
    try {
      localStorage.setItem(localStorage.length + 1, JSON.stringify(mainData));
    } catch (error) {
      alert("failed");
    }
    // localStorage.setItem(localStorage.length + 1, JSON.stringify(mainData));
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(Adhar);
    cafelist.appendChild(li);
  }
}

function myFunction() {
  let cafelist = document.getElementById("cafelist");
  for (i = 1; i <= localStorage.length; i++) {
    let data1 = localStorage.getItem(i);
    var obj = JSON.parse(data1);
    let li = document.createElement("div");
    let name = document.createElement("span");
    let city = document.createElement("span");
    let Adhar = document.createElement("span");
    let image = document.createElement("img");
    image.src = obj.img;
    name.textContent = obj.name;
    city.textContent = obj.city;
    Adhar.textContent = obj.adhar;
    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(Adhar);
    li.appendChild(image).style.maxWidth = "100px";
    li.classList.add("show-details");
    cafelist.appendChild(li);
  }
}
window.onload = myFunction;

var arr = [];
for (i = 0; i < localStorage.length; i++) {
  let data1 = localStorage.getItem(i);
  arr[i] = data1;
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