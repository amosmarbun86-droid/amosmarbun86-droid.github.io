// =======================
// ☁️ CLOUDINARY CONFIG
// =======================

const CLOUD_NAME = "dkisbfx29";

const UPLOAD_PRESET = "ml_default";

/* =========================
   FIREBASE CONFIG
========================= */

const firebaseConfig = {

  apiKey: "AIzaSyD2QRiYnyHWRqG3OgZcWV9YA1arXPsvoE0",

  authDomain: "amos-web-os.firebaseapp.com",

  projectId: "amos-web-os",

  storageBucket: "amos-web-os.firebasestorage.app",

  messagingSenderId: "59843745100",

  appId: "1:59843745100:web:b29e5996052a3bf5672be9",

  measurementId: "G-Z2F7MXPSCH"

};

// INITIALIZE FIREBASE

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

firebase.analytics();

// CONFIG WALLPAPER LENGKAP
const wallpapers = [
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201824/iij3x03m3leuwuca1sem.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776200829/n4vqmisi9iwz09fnf8mp.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201095/m4n5tyz02ffvtymy7ahu.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201174/kdauhikka25fkb8zaudm.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201249/pxpbgdjpvoztiyhedtba.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1779433383/x6b6slhdbwgjkf2prdes.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1779434005/butsk5zp5uuf47hevbha.png",
];

let matrixActive = true;

function changeWallpaper() {
    const random = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    document.body.style.backgroundImage = `url('${random}')`;
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
}

function toggleMatrix() {
    matrixActive = !matrixActive;
    const canvas = document.getElementById("bgCanvas");
    if(canvas) canvas.style.display = matrixActive ? "block" : "none";
}

function login() {
    const pin = document.getElementById("pass").value;
    if (pin === "101312") {
        document.getElementById("login").style.display = "none";
        document.getElementById("desktop").style.display = "flex";
        localStorage.setItem("amosLoggedIn", "true");
    } else {
        alert("PIN SALAH!");
    }
}

function logout() {
    localStorage.removeItem("amosLoggedIn");
    location.reload();
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

function openExternal(url) {
    if(url && url !== "#") {
        window.open(url, "_blank");
    }
}

// INITIALIZE SYSTEM
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("amosLoggedIn") === "true") {
        document.getElementById("login").style.display = "none";
        document.getElementById("desktop").style.display = "flex";
    }
    
    // Jalankan ganti wallpaper pertama kali
    changeWallpaper();
    
    // SET INTERVAL AUTO WALLPAPER: 10 DETIK (10000 ms)
    setInterval(changeWallpaper, 10000);
    
    // Matrix Effect Logic
    const canvas = document.getElementById("bgCanvas");
    const ctx = canvas.getContext("2d");
    
    function resize() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    const letters = "AMOS101312";
    const fontSize = 16;
    let columns = canvas.width / fontSize;
    let drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        if(!matrixActive) return;
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff9f";
        ctx.font = fontSize + "px monospace";
        for (let i = 0; i < drops.length; i++) {
            const text = letters[Math.floor(Math.random() * letters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i]++;
        }
    }
    setInterval(draw, 33);
});

// CLOCK SYSTEM
setInterval(() => {
    const clock = document.getElementById("clock");
    if(clock) clock.innerHTML = new Date().toLocaleTimeString("id-ID");
}, 1000);

/* =========================
   AMOS BOOT SYSTEM
========================= */

const bootMessages = [
    "Initializing AMOS Kernel...",
    "Loading AI Engine...",
    "Connecting Cloud Node...",
    "Starting Security Layer...",
    "Loading Media System...",
    "Preparing Desktop...",
    "Launching AMOS Ecosystem..."
];

const bootTerminal = document.getElementById("bootTerminal");
const bootStatus = document.getElementById("bootStatus");
const bootProgress = document.querySelector(".boot-progress");

const bootSound = document.getElementById("bootSound");
let progress = 0;

function typeBootLine(element, text){

    let i = 0;

    const typing = setInterval(()=>{

        element.innerHTML += text.charAt(i);

        i++;

        if(i >= text.length){
            clearInterval(typing);
        }

    }, 40);

}

function addBootLine(text){

    const line = document.createElement("div");

    line.className = "boot-line";

    bootTerminal.appendChild(line);

    typeBootLine(line, `[ OK ] ${text}`);

    bootTerminal.scrollTop = bootTerminal.scrollHeight;
}

function runBootSequence(){
    
bootSound.volume = 0.7;

const playPromise = bootSound.play();

if(playPromise !== undefined){

    playPromise.catch(error => {

        console.log("Autoplay blocked:", error);

    });

}
   bootMessages.forEach((msg, index)=>{
   
        

        setTimeout(()=>{

            addBootLine(msg);

            bootStatus.innerText = msg;

            progress += 100 / bootMessages.length;

            bootProgress.style.width = progress + "%";

        }, index * 2500);

    });

    setTimeout(()=>{

        document.getElementById("bootScreen").style.transition = "2s";

        document.getElementById("bootScreen").style.opacity = "0";

        setTimeout(()=>{

            document.getElementById("bootScreen").remove();

        },2000);

    }, bootMessages.length * 2500 + 4000);

}

runBootSequence();

/* =========================
   MATRIX EFFECT
========================= */

const canvas = document.getElementById("bootMatrix");

const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const chars = "AMOS0123456789SYSTEM";
const fontSize = 14;

let columns = canvas.width / fontSize;

const drops = [];

for(let x=0; x<columns; x++){
    drops[x]=1;
}

function drawMatrix(){

    ctx.fillStyle = "rgba(0,0,0,0.08)";
    ctx.fillRect(0,0,canvas.width,canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = fontSize + "px monospace";

    for(let i=0; i<drops.length; i++){

        const text = chars[Math.floor(Math.random()*chars.length)];

        ctx.fillText(text, i*fontSize, drops[i]*fontSize);

        if(drops[i]*fontSize > canvas.height && Math.random() > 0.975){
            drops[i]=0;
        }

        drops[i]++;
    }

}

setInterval(drawMatrix,25);

window.addEventListener("resize",()=>{

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

});

/* =========================
   WINDOW SYSTEM
========================= */

function openWindow(id){

    const win = document.getElementById(id);

    if(win){

        win.style.display = "flex";

    }

}

function closeWindow(id){

    const win = document.getElementById(id);

    if(win){

        win.style.display = "none";

    }

}
/* =========================
   MUSIC DATA
========================= */

let musicData = [];

let currentIndex = 0;

/* =========================
   LOAD MUSIC REALTIME
========================= */

function loadMusic(){

    const musicList =
    document.getElementById("musicList");

    musicList.innerHTML =
    "Loading Music...";

    db.collection("music")

    .onSnapshot((snapshot)=>{

        musicData = [];

        snapshot.forEach((doc)=>{

            const song =
            doc.data();

            // FIREBASE DOCUMENT ID

            song.id = doc.id;

            musicData.push(song);

        });

        renderMusic(musicData);

    });

}

/* =========================
   RENDER MUSIC
========================= */

function renderMusic(list){

    const musicList =
    document.getElementById("musicList");

    musicList.innerHTML = "";

    list.forEach((song,index)=>{

        const div =
        document.createElement("div");

        div.className = "music-item";

        div.innerHTML = `

        <div>

            <b>${song.name}</b>

            <br>

            <small>

                ⏱ ${song.duration}

            </small>

        </div>

        <div style="display:flex; gap:5px;">

            <button onclick="playMusic(${index})">

                ▶

            </button>

            <button onclick="deleteMusic('${song.id}')">

                🗑

            </button>

        </div>

        `;

        musicList.appendChild(div);

    });

}

/* =========================
   PLAY MUSIC
========================= */

function playMusic(index){

    currentIndex = index;

    const song =
    musicData[currentIndex];

    const player =
    document.getElementById("player");

    const floatingPlayer =
    document.getElementById("floatingPlayer");

    const floatingIcon =
    document.getElementById("floatingIcon");

    const floatingTitle =
    document.getElementById("floatingTitle");

    player.src = song.url;

    player.play();

    floatingPlayer.style.display = "block";

    floatingIcon.innerHTML = "⏸";

    floatingTitle.innerHTML =
    song.name;

}

/* =========================
   PLAY / PAUSE
========================= */

function togglePlay(){

    const player =
    document.getElementById("player");

    const floatingIcon =
    document.getElementById("floatingIcon");

    if(player.paused){

        player.play();

        floatingIcon.innerHTML = "⏸";

    }else{

        player.pause();

        floatingIcon.innerHTML = "▶";

    }

}

/* =========================
   NEXT MUSIC
========================= */

function nextMusic(){

    currentIndex++;

    if(currentIndex >= musicData.length){

        currentIndex = 0;

    }

    playMusic(currentIndex);

}

/* =========================
   PREVIOUS MUSIC
========================= */

function prevMusic(){

    currentIndex--;

    if(currentIndex < 0){

        currentIndex =
        musicData.length - 1;

    }

    playMusic(currentIndex);

}

/* =========================
   SPEED CONTROL
========================= */

function setSpeed(speed){

    const player =
    document.getElementById("player");

    const speedLabel =
    document.getElementById("speedLabel");

    player.playbackRate = speed;

    speedLabel.innerHTML =
    speed + "x";

}

/* =========================
   SHUFFLE
========================= */

function toggleShuffle(){

    if(musicData.length === 0) return;

    const randomIndex =
    Math.floor(Math.random() * musicData.length);

    playMusic(randomIndex);

}

/* =========================
   UPLOAD MUSIC
========================= */

async function uploadMusic(){

    const file =
    document.getElementById("songFile").files[0];

    const songName =
    document.getElementById("songName").value;

    if(!file){

        alert("Pilih file musik!");

        return;

    }

    const formData =
    new FormData();

    formData.append("file", file);

    formData.append(
        "upload_preset",
        UPLOAD_PRESET
    );

    try{

        alert("Uploading...");

        const response =
        await fetch(

        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,

        {

            method:"POST",

            body:formData

        }

        );

        const data =
        await response.json();

        if(data.secure_url){

            const audio =
            new Audio(data.secure_url);

            audio.addEventListener(

            "loadedmetadata",

            function(){

                const minutes =
                Math.floor(audio.duration / 60);

                const seconds =
                Math.floor(audio.duration % 60);

                const duration =

                `${minutes}:${seconds
                .toString()
                .padStart(2,'0')}`;

                const song = {

                    name:
                    songName || file.name,

                    url:
                    data.secure_url,

                    duration:
                    duration,

                    createdAt:
                    Date.now()

                };

                db.collection("music")

                .add(song)

                .then(()=>{

                    alert("Upload berhasil!");

                });

            });

        }

    }catch(error){

        console.log(error);

        alert("Upload gagal!");

    }

}

/* =========================
   DELETE MUSIC ONLINE
========================= */

async function deleteMusic(id){

    const confirmDelete =
    confirm("Hapus lagu ini?");

    if(!confirmDelete) return;

    try{

        await db.collection("music")

        .doc(id)

        .delete();

        alert("Lagu berhasil dihapus!");

    }catch(error){

        console.log(error);

        alert("Gagal menghapus lagu!");

    }

}

/* =========================
   AUTO NEXT
========================= */

document.getElementById("player")

.addEventListener("ended",()=>{

    nextMusic();

});
document.getElementById("player")

.addEventListener("pause",()=>{

    document.getElementById("floatingIcon")
    .innerHTML = "▶";

});

document.getElementById("player")

.addEventListener("play",()=>{

    document.getElementById("floatingIcon")
    .innerHTML = "⏸";

});
function hideFloatingPlayer(){

    document.getElementById("floatingPlayer")
    .style.display = "none";

}

/* =========================
   DRAG DESKTOP ICONS SAVE
========================= */

const desktopIcons =
document.querySelectorAll(".desktop-icon");

let activeIcon = null;

let startX = 0;
let startY = 0;

let offsetX = 0;
let offsetY = 0;

let moved = false;

desktopIcons.forEach(icon=>{

    const iconId = icon.id;

    // LOAD POSITION

    const savedX =
    localStorage.getItem(`${iconId}-x`);

    const savedY =
    localStorage.getItem(`${iconId}-y`);

    if(savedX && savedY){

        icon.style.left =
        savedX + "px";

        icon.style.top =
        savedY + "px";

    }

    icon.addEventListener(

    "touchstart",

    (e)=>{

        activeIcon = icon;

        moved = false;

        const touch = e.touches[0];

        startX = touch.clientX;

        startY = touch.clientY;

        offsetX =

        touch.clientX -
        icon.offsetLeft;

        offsetY =

        touch.clientY -
        icon.offsetTop;

    }

    );

});

/* GLOBAL MOVE */

document.addEventListener(

"touchmove",

(e)=>{

    if(!activeIcon) return;

    const touch = e.touches[0];

    const dx =
    Math.abs(touch.clientX - startX);

    const dy =
    Math.abs(touch.clientY - startY);

    // DRAG THRESHOLD

    if(dx > 8 || dy > 8){

        moved = true;

    }

    if(!moved) return;

    const newX =
    touch.clientX - offsetX;

    const newY =
    touch.clientY - offsetY;

    activeIcon.style.left =
    newX + "px";

    activeIcon.style.top =
    newY + "px";

}

);

/* END DRAG */

document.addEventListener(

"touchend",

()=>{

    if(!activeIcon) return;

    // SAVE POSITION

    localStorage.setItem(

    `${activeIcon.id}-x`,

    parseInt(activeIcon.style.left)

    );

    localStorage.setItem(

    `${activeIcon.id}-y`,

    parseInt(activeIcon.style.top)

    );

    activeIcon = null;

}

);
/* =========================
   FLOATING PLAYER DRAG
========================= */

function initFloatingDrag(){

    const floatingPlayer =

    document.getElementById(
    "floatingPlayer"
    );

    let floatingDragging = false;

    let floatingOffsetX = 0;

    let floatingOffsetY = 0;

    floatingPlayer.addEventListener(

    "touchstart",

    (e)=>{

        floatingDragging = true;

        const touch = e.touches[0];

        floatingOffsetX =

        touch.clientX -
        floatingPlayer.offsetLeft;

        floatingOffsetY =

        touch.clientY -
        floatingPlayer.offsetTop;

    }

    );

    document.addEventListener(

    "touchmove",

    (e)=>{

        if(!floatingDragging) return;

        const touch = e.touches[0];

        floatingPlayer.style.left =

        (touch.clientX - floatingOffsetX)
        + "px";

        floatingPlayer.style.top =

        (touch.clientY - floatingOffsetY)
        + "px";

        floatingPlayer.style.right =
        "auto";

        floatingPlayer.style.bottom =
        "auto";

    }

    );

    document.addEventListener(

    "touchend",

    ()=>{

        floatingDragging = false;

    }

    );

}
/* =========================
   START SYSTEM
========================= */

window.addEventListener("load",()=>{

    loadMusic();

    initFloatingDrag();

});
