// CONFIG WALLPAPER LENGKAP
const wallpapers = [
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201824/iij3x03m3leuwuca1sem.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776200829/n4vqmisi9iwz09fnf8mp.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201095/m4n5tyz02ffvtymy7ahu.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201174/kdauhikka25fkb8zaudm.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201249/pxpbgdjpvoztiyhedtba.png"
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
