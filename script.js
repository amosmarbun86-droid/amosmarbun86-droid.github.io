/* ==========================================
   1. FIREBASE & CLOUDINARY CONFIG
   ========================================== */
const firebaseConfig = {
    apiKey: "AIzaSyD2QRiYnyHWRqG3OgZcWV9YA1arXPsvoE0",
    authDomain: "amos-web-os.firebaseapp.com",
    projectId: "amos-web-os",
    storageBucket: "amos-web-os.firebasestorage.app",
    messagingSenderId: "59843745100",
    appId: "1:59843745100:web:b29e5996052a3bf5672be9",
    measurementId: "G-Z2F7MXPSCH"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Cloudinary Keys
const CLOUD_NAME = "dkisbfx29";
const UPLOAD_PRESET = "ml_default";

/* ==========================================
   2. WALLPAPER SYSTEM
   ========================================== */
const wallpapers = [
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201824/iij3x03m3leuwuca1sem.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776200829/n4vqmisi9iwz09fnf8mp.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201095/m4n5tyz02ffvtymy7ahu.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201174/kdauhikka25fkb8zaudm.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201249/pxpbgdjpvoztiyhedtba.png"
];

function changeWallpaper() {
    const random = wallpapers[Math.floor(Math.random() * wallpapers.length)];
    document.body.style.backgroundImage = `url('${random}')`;
    localStorage.setItem("wallpaper", random);
}

/* ==========================================
   3. CORE SYSTEM (LOGIN & UI)
   ========================================== */
document.addEventListener("DOMContentLoaded", () => {
    const saved = localStorage.getItem("wallpaper");
    if (saved) document.body.style.backgroundImage = `url('${saved}')`;
    changeWallpaper();
    setInterval(changeWallpaper, 10000);

    if (localStorage.getItem("amosLoggedIn") === "true") {
        document.getElementById("login").style.display = "none";
        document.getElementById("desktop").style.display = "flex";
        loadMusic();
        renderDesktopApps();
    }

    const pinInput = document.getElementById("pass");
    if (pinInput) {
        pinInput.addEventListener("keydown", e => { if (e.key === "Enter") login(); });
    }
    
    if(matrixEnabled) drawMatrix();
});

function login() {
    const pin = document.getElementById("pass").value;
    if (pin === "101312") {
        document.getElementById("login").style.display = "none";
        document.getElementById("desktop").style.display = "flex";
        localStorage.setItem("amosLoggedIn", "true");
        loadMusic();
        renderDesktopApps();
    } else {
        alert("PIN salah!");
    }
}

function logout() {
    localStorage.removeItem("amosLoggedIn");
    location.reload();
}

function toggleSidebar() {
    document.getElementById("sidebar").classList.toggle("active");
}

function openApp(id) {
    document.getElementById(id).style.display = "flex";
    if (id === "appstore") renderAppStore();
}

function closeApp(id) {
    document.getElementById(id).style.display = "none";
}

function toggleStart() {
    const menu = document.getElementById("startMenu");
    menu.style.display = menu.style.display === "flex" ? "none" : "flex";
}

setInterval(() => {
    const clockEl = document.getElementById("clock");
    if(clockEl) clockEl.innerHTML = new Date().toLocaleTimeString("id-ID");
}, 1000);

/* ==========================================
   4. TERMINAL LOGIC
   ========================================== */
const cmdInput = document.getElementById("cmdInput");
const terminalOutput = document.getElementById("terminalOutput");
if(cmdInput) {
    cmdInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            let cmd = this.value;
            this.value = "";
            terminalOutput.innerHTML += "> " + cmd + "<br>";
            if (cmd === "halo") terminalOutput.innerHTML += "AI: Halo Amos!<br>";
            else if (cmd === "status") terminalOutput.innerHTML += "AI: Sistem normal.<br>";
            else terminalOutput.innerHTML += "AI: Perintah tidak dikenali.<br>";
        }
    });
}

/* ==========================================
   5. MUSIC SYSTEM & CLOUDINARY UPLOAD
   ========================================== */
const player = document.getElementById("player");
const musicList = document.getElementById("musicList");
const floatingPlayer = document.getElementById("floatingPlayer");
const floatingTitle = document.getElementById("floatingTitle");
let musicData = [];
let currentIndex = 0;
let isShuffle = false;

async function uploadMusic() {
    const fileInput = document.getElementById("songFile");
    const nameInput = document.getElementById("songName");
    const file = fileInput.files[0];
    const name = nameInput.value;

    if (!file || !name) return alert("Isi judul dan pilih file!");

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("folder", "music");

    try {
        const res = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
            { method: "POST", body: formData }
        );
        const data = await res.json();

        if (data.secure_url) {
            await db.collection("files").add({
                name: name,
                url: data.secure_url,
                folder: "music",
                createdAt: Date.now()
            });
            alert("Berhasil Upload!");
            fileInput.value = "";
            nameInput.value = "";
            loadMusic();
        }
    } catch (err) {
        alert("Gagal Upload: " + err.message);
    }
}

function loadMusic() {
    musicData = [];
    if(!musicList) return;
    musicList.innerHTML = "Memuat...";
    db.collection("files").where("folder", "==", "music").orderBy("createdAt", "desc").get().then(snap => {
        musicList.innerHTML = "";
        snap.forEach(doc => musicData.push(doc.data()));
        renderMusic(musicData);
    });
}

function renderMusic(list) {
    musicList.innerHTML = "";
    list.forEach(song => {
        const div = document.createElement("div");
        div.className = "music-item";
        const data = encodeURIComponent(JSON.stringify(song));
        div.innerHTML = `
            <div><div>${song.name}</div></div>
            <div style="display:flex; gap:5px;">
                <button onclick="playMusic('${data}')">▶</button>
            </div>`;
        musicList.appendChild(div);
    });
}

function playMusic(data) {
    const song = JSON.parse(decodeURIComponent(data));
    currentIndex = musicData.findIndex(s => s.url === song.url);
    player.src = song.url;
    player.play();
    document.getElementById("floatingIcon").innerText = "⏸";
    if(floatingPlayer) floatingPlayer.style.display = "flex";
    if(floatingTitle) floatingTitle.innerText = song.name;
}

function togglePlay() {
    const icon = document.getElementById("floatingIcon");
    if (player.paused) {
        player.play();
        icon.innerText = "⏸";
    } else {
        player.pause();
        icon.innerText = "▶";
    }
}

function nextMusic() {
    if (musicData.length === 0) return;
    currentIndex = (currentIndex + 1) % musicData.length;
    playMusic(encodeURIComponent(JSON.stringify(musicData[currentIndex])));
}

/* ==========================================
   6. APP STORE & DESKTOP LOGIC
   ========================================== */
const appStoreData = [
    { name: "Calculator", icon: "📊", appId: "calc" },
    { name: "To Do List", icon: "📝", appId: "todo" },
    { name: "Mini Browser", icon: "🌐", appId: "browser" },
    { name: "Weather", icon: "☁️", appId: "weather" }
];

function renderAppStore() {
    const appList = document.getElementById("appList");
    if(!appList) return;
    appList.innerHTML = "";
    appStoreData.forEach(app => {
        const div = document.createElement("div");
        div.style.cssText = "background:#001a12; border:1px solid #00ff9f; padding:10px; border-radius:8px; text-align:center;";
        div.innerHTML = `<div style="font-size:30px">${app.icon}</div><div>${app.name}</div><button onclick="installApp('${app.appId}')">Install</button>`;
        appList.appendChild(div);
    });
}

function installApp(appId) {
    let installed = JSON.parse(localStorage.getItem("installedApps")) || [];
    if (installed.find(a => a.appId === appId)) return alert("App sudah terinstall!");
    installed.push(appStoreData.find(a => a.appId === appId));
    localStorage.setItem("installedApps", JSON.stringify(installed));
    renderDesktopApps();
}

function renderDesktopApps() {
    const desktop = document.getElementById("desktopIcons");
    if(!desktop) return;
    desktop.innerHTML = "";
    let installed = JSON.parse(localStorage.getItem("installedApps")) || [];
    installed.forEach(app => {
        const div = document.createElement("div");
        div.className = "app-icon";
        div.innerHTML = `<div>${app.icon}</div><span>${app.name}</span>`;
        div.onclick = () => openApp(app.appId);
        desktop.appendChild(div);
    });
}

/* ==========================================
   7. UTILS (CALC, TODO, WEATHER)
   ========================================== */
function hitung() {
    try { document.getElementById("calcResult").innerText = eval(document.getElementById("calcInput").value); }
    catch { document.getElementById("calcResult").innerText = "Error"; }
}

function addTodo() {
    const input = document.getElementById("todoInput");
    if (!input.value.trim()) return;
    const li = document.createElement("li");
    li.textContent = input.value;
    li.onclick = () => li.remove();
    document.getElementById("todoList").appendChild(li);
    input.value = "";
}

async function getWeather() {
    const kota = document.getElementById("cityInput").value || "Medan";
    try {
        const res = await fetch(`https://wttr.in/${kota}?format=3`);
        document.getElementById("weatherResult").innerText = await res.text();
    } catch { document.getElementById("weatherResult").innerText = "Gagal ambil cuaca"; }
}

/* ==========================================
   8. MATRIX EFFECT
   ========================================== */
const canvas = document.getElementById("bgCanvas");
const ctx = canvas ? canvas.getContext("2d") : null;
let matrixEnabled = localStorage.getItem("matrixEnabled") !== "false";
let animationId;
const letters = "AMOSWEBOS123456789";
const fontSize = 16;
let columns = Math.floor(window.innerWidth / fontSize);
let drops = Array(columns).fill(1);

function drawMatrix() {
    if (!matrixEnabled || !ctx) return;
    ctx.fillStyle = "rgba(0,0,0,0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#00ff9f";
    ctx.font = fontSize + "px monospace";
    for (let i = 0; i < drops.length; i++) {
        const text = letters[Math.floor(Math.random() * letters.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
        drops[i]++;
    }
    animationId = requestAnimationFrame(drawMatrix);
}

function toggleMatrix() {
    matrixEnabled = !matrixEnabled;
    localStorage.setItem("matrixEnabled", matrixEnabled);
    if (matrixEnabled) drawMatrix();
    else { cancelAnimationFrame(animationId); ctx.clearRect(0, 0, canvas.width, canvas.height); }
}

/* ==========================================
   9. DRAG & EXTERNAL
   ========================================== */
document.querySelectorAll(".window").forEach(win => {
    let isDragging = false;
    let offsetX, offsetY;
    const titleBar = win.querySelector(".titlebar");
    if(!titleBar) return;

    const startDrag = (e) => {
        isDragging = true;
        const rect = win.getBoundingClientRect();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        offsetX = clientX - rect.left;
        offsetY = clientY - rect.top;
    };
    const drag = (e) => {
        if (!isDragging) return;
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;
        win.style.left = (clientX - offsetX) + "px";
        win.style.top = (clientY - offsetY) + "px";
        win.style.transform = "none";
    };
    titleBar.addEventListener("mousedown", startDrag);
    titleBar.addEventListener("touchstart", startDrag);
    document.addEventListener("mousemove", drag);
    document.addEventListener("touchmove", drag);
    document.addEventListener("mouseup", () => isDragging = false);
    document.addEventListener("touchend", () => isDragging = false);
});

function openExternal(url) { window.open(url, "_blank"); }
  
