const cafeList = document.querySelector('#cafe-list');

// create element & render cafe
function renderCafe(doc){

    let li = document.createElement('div');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');
    let adhar = document.createElement('span');
    var img = document.createElement('img'); 

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';
    img.src =  doc.data().img;
    adhar.textContent = doc.data().adhar;

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross);
    li.appendChild(adhar);
    li.appendChild(img);
    li.classList.add("card");
    cross.classList.add("close");
    img.style.width = "200px";
    cafeList.appendChild(li);

    cross.addEventListener('click', (e) => {
        e.stopPropagation();
        console.log('clicked');
        cafeList.innerHTML='';
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete().then(()=>getData());

    });
}

// getting data
const getData = ()=>{
    console.log('get data');
    db.collection('cafes').get().then(snapshot => {
        console.log(snapshot);
        snapshot.docs.forEach(doc => {
            renderCafe(doc);
        });
    });
}
function setTheme(themeName) {
    sessionStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}
const loadTheme = ()=>{
    if (sessionStorage.getItem('theme') === 'theme-dark') {
        setTheme('theme-dark');
    } else {
        setTheme('theme-light');
    }
}
getData();
loadTheme();