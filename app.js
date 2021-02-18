var config = {
  apiKey: "AIzaSyB2DaR5cT5al0rfNeHUvvezE6uWGexjVrc",
  authDomain: "ninja-firestore-tut-47b47.firebaseapp.com",
  projectId: "ninja-firestore-tut-47b47",
  storageBucket: "ninja-firestore-tut-47b47.appspot.com",
  messagingSenderId: "156151797371",
  appId: "1:156151797371:web:f9fd13c7ea6708ca4fb4de",
  measurementId: "G-8Q07Q193H1",
};
if (!firebase.apps.length) {
  firebase.initializeApp(config);
} else {
  firebase.app();
}
var db = firebase.firestore();
db.settings({ timestampsInSnapshots: true });

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

setInterval(function () {
  var date1 = new Date();
  // var date1 = new Date(2000, 0, 1, 9, 0); // 9:00 AM
  var date2 = new Date(2000, 0, 1, 16, 0);
  if (date2 > date1) {
    var dif = date2 - date1;
  } else {
    var dif = date1 - date2;
  }
  if (dif % 3600000 === 0) {
    for (i = 0; i < localStorage.length + 1; i++) {
      let data1 = localStorage.getItem(i + 1);
      var obj = JSON.parse(data1);
      var docData = {
        name: obj.name,
        city: obj.city,
        adhar: obj.adhar,
        img: obj.img,
      };
      if (db) {
        db.collection("cafes")
          .add(docData)
          .then((db) => {
            console.log("Document successfully written!");
          })
          .catch((err) => {
            console.log(err);
          });
      }
      if (i + 1 === localStorage.length) {
        localStorage.clear();
      }
    }
  }
}, 3000);

let insertdata = () => {
  console.log("oob");
  for (i = 0; i <= localStorage.length + 1; i++) {
    let data1 = localStorage.getItem(i + 1);
    var obj = JSON.parse(data1);
    var docData = {
      name: obj.name,
      city: obj.city,
      adhar: obj.adhar,
      img: obj.img,
    };
    if (db) {
      db.collection("cafes")
        .add(docData)
        .then((db) => {
          console.log("Document successfully written!");
        })
        .catch((err) => {
          console.log(err);
        });
    }
    if (i + 1 === localStorage.length) {
      localStorage.clear();
    }
  }
};

function setTheme(themeName) {
  sessionStorage.setItem("theme", themeName);
  document.documentElement.className = themeName;
}
const loadTheme = () => {
  if (sessionStorage.getItem("theme") === "theme-dark") {
    setTheme("theme-dark");
  } else {
    setTheme("theme-light");
  }
};
loadTheme();

// function toggleTheme() {
//   console.log("assad")
//   if (sessionStorage.getItem("theme") === "theme-dark") {
//     console.log("if")
//     setTheme("theme-light");
//   } else {
//     console.log("else")
//     setTheme("theme-dark");
//   }
// }
