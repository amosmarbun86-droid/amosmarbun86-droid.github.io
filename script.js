// =========================
// ☁️ CLOUDINARY CONFIG
// =========================
const CLOUD_NAME = "dkisbfx29";
const UPLOAD_PRESET = "ml_default";

// =========================
// 🔥 FIREBASE CONFIG
// =========================
const decodeSandi = (teksSandi) => atob(teksSandi);

const firebaseConfig = {
  apiKey: decodeSandi("QUl6YVN5RDJRUmlZbnlIV1JxRzNPZ1pjV1ZZQTFhclhQc3ZvRTA="),
  authDomain: decodeSandi("YW1vcy13ZWItb3MuZmlyZWJhc2VhcHAuY29t"),
  projectId: decodeSandi("YW1vcy13ZWItb3M="),
  storageBucket: decodeSandi("YW1vcy13ZWItb3MuZmlyZWJhc3RvcmFnZS5hcHA="),
  messagingSenderId: decodeSandi("NTk4NDM3NDUxMDA="),
  appId: decodeSandi("MTo1OTg0Mzc0NTEwMDp3ZWI6YjI5ZTV5OTYwNTJhM2JmNTY3MmJlOQ=="),
  measurementId: decodeSandi("Ry1aMkY3TVhQU0NI")
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
firebase.analytics();

// =========================
// 🖼️ WALLPAPER
// =========================
const wallpapers = [
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201824/iij3x03m3leuwuca1sem.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776200829/n4vqmisi9iwz09fnf8mp.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201095/m4n5tyz02ffvtymy7ahu.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201174/kdauhikka25fkb8zaudm.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1776201249/pxpbgdjpvoztiyhedtba.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1779433383/x6b6slhdbwgjkf2prdes.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1779434005/butsk5zp5uuf47hevbha.png",
    "https://res.cloudinary.com/dkisbfx29/image/upload/v1779436121/sy1hrqqnyqawyreerawf.png",
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
    if (canvas) canvas.style.display = matrixActive ? "block" : "none";
}

// =========================
// 🔐 LOGIN / LOGOUT (dengan animasi karakter)
// =========================
function login() {
    const pin = document.getElementById("pass").value;
    const character = document.getElementById("loginCharacter");
    const statusText = document.getElementById("login-status-text");
    const loginBtn = document.querySelector("#login button");

    // Reset state animasi sebelumnya
    character.classList.remove("success", "fail");

    if (pin === "101312") {
        // ===== LOGIN BERHASIL =====
        character.classList.add("success");
        statusText.innerText = "AKSES DITERIMA ✅";
        statusText.style.color = "#00ff9f";
        if (loginBtn) loginBtn.disabled = true;

        // Kasih waktu animasi senang jelas dulu sebelum pindah ke desktop
        setTimeout(() => {
            document.getElementById("login").style.display = "none";
            document.getElementById("desktop").style.display = "flex";
            localStorage.setItem("amosLoggedIn", "true");
        }, 1300);

    } else {
        // ===== LOGIN GAGAL =====
        character.classList.add("fail");
        statusText.innerText = "PIN SALAH ❌";
        statusText.style.color = "#ff4d6d";

        // Getarkan input juga biar makin kerasa
        const passInput = document.getElementById("pass");
        passInput.style.transition = "transform 0.1s";
        passInput.classList.add("shake-input");

        // Balikin karakter ke posisi normal setelah animasi sedih selesai
        setTimeout(() => {
            character.classList.remove("fail");
            passInput.classList.remove("shake-input");
        }, 1000);

        // Bersihkan input biar user coba lagi
        passInput.value = "";
        passInput.focus();
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
    if (url && url !== "#") {
        window.open(url, "_blank");
    }
}

// =========================
// 🚀 INITIALIZE SYSTEM
// =========================
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("amosLoggedIn") === "true") {
        document.getElementById("login").style.display = "none";
        document.getElementById("desktop").style.display = "flex";
    }

    // Ganti wallpaper pertama kali + auto ganti tiap 10 detik
    changeWallpaper();
    setInterval(changeWallpaper, 10000);

    // ===== Matrix Effect (Background) =====
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
    const columns = canvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);

    function draw() {
        if (!matrixActive) return;
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

// =========================
// 🕒 CLOCK
// =========================
setInterval(() => {
    const clock = document.getElementById("clock");
    if (clock) clock.innerHTML = new Date().toLocaleTimeString("id-ID");
}, 1000);

// =========================
// 🖥️ AMOS BOOT SYSTEM
// =========================
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

function typeBootLine(element, text) {
    let i = 0;
    const typing = setInterval(() => {
        element.innerHTML += text.charAt(i);
        i++;
        if (i >= text.length) clearInterval(typing);
    }, 40);
}

function addBootLine(text) {
    const line = document.createElement("div");
    line.className = "boot-line";
    bootTerminal.appendChild(line);
    typeBootLine(line, `[ OK ] ${text}`);
    bootTerminal.scrollTop = bootTerminal.scrollHeight;
}

function runBootSequence() {
    bootSound.volume = 0.7;

    const playPromise = bootSound.play();
    if (playPromise !== undefined) {
        playPromise.catch((error) => {
            console.log("Autoplay blocked:", error);
        });
    }

    bootMessages.forEach((msg, index) => {
        setTimeout(() => {
            addBootLine(msg);
            bootStatus.innerText = msg;
            progress += 100 / bootMessages.length;
            bootProgress.style.width = progress + "%";
        }, index * 2500);
    });

    setTimeout(() => {
        const bootScreen = document.getElementById("bootScreen");
        bootScreen.style.transition = "2s";
        bootScreen.style.opacity = "0";
        setTimeout(() => bootScreen.remove(), 2000);
    }, bootMessages.length * 2500 + 4000);
}

runBootSequence();

// =========================
// 🟩 MATRIX EFFECT (Boot Screen)
// =========================
const bootCanvas = document.getElementById("bootMatrix");
const bootCtx = bootCanvas.getContext("2d");

bootCanvas.width = window.innerWidth;
bootCanvas.height = window.innerHeight;

const chars = "AMOS0123456789SYSTEM";
const bootFontSize = 14;
let bootColumns = bootCanvas.width / bootFontSize;
const bootDrops = [];

for (let x = 0; x < bootColumns; x++) {
    bootDrops[x] = 1;
}

function drawMatrix() {
    bootCtx.fillStyle = "rgba(0,0,0,0.08)";
    bootCtx.fillRect(0, 0, bootCanvas.width, bootCanvas.height);

    bootCtx.fillStyle = "#00ff88";
    bootCtx.font = bootFontSize + "px monospace";

    for (let i = 0; i < bootDrops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        bootCtx.fillText(text, i * bootFontSize, bootDrops[i] * bootFontSize);

        if (bootDrops[i] * bootFontSize > bootCanvas.height && Math.random() > 0.975) {
            bootDrops[i] = 0;
        }
        bootDrops[i]++;
    }
}

setInterval(drawMatrix, 25);

window.addEventListener("resize", () => {
    bootCanvas.width = window.innerWidth;
    bootCanvas.height = window.innerHeight;
});

// =========================
// 🪟 WINDOW SYSTEM
// =========================
function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    // File Manager selalu minta password setiap dibuka (bukan kalau sudah terbuka)
    if (id === "filesWindow" && win.style.display !== "flex") filesLock();

    win.style.display = "flex";

    if (id === "filesWindow") {
        const pass = document.getElementById("filesPassInput");
        if (pass) pass.focus();
    }
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    if (id === "filesWindow") {
        if (filesDirty && !confirm("Perubahan belum disimpan. Tutup tanpa menyimpan?")) return;
        filesLock(); // kunci lagi & hapus password dari memori
    }

    win.style.display = "none";
}

// =========================
// 🎵 MUSIC DATA
// =========================
let musicData = [];
let currentIndex = 0;

// Filter aktif saat ini: "all" | "favorites" | "playlist"
let currentFilter = "all";

// Daftar ID lagu yang ditambahkan ke playlist (disimpan lokal di perangkat)
function getPlaylistIds() {
    try {
        return JSON.parse(localStorage.getItem("amosPlaylist")) || [];
    } catch {
        return [];
    }
}

function savePlaylistIds(ids) {
    localStorage.setItem("amosPlaylist", JSON.stringify(ids));
}

// =========================
// 🔄 LOAD MUSIC REALTIME
// =========================
function loadMusic() {
    const musicList = document.getElementById("musicList");
    musicList.innerHTML = "Loading Music...";

    db.collection("music").onSnapshot((snapshot) => {
        musicData = [];
        snapshot.forEach((doc) => {
            const song = doc.data();
            song.id = doc.id; // ID dokumen Firestore
            musicData.push(song);
        });
        applyCurrentFilter();
    });
}

// =========================
// 🔍 FILTER MUSIK (Semua / Favorit / Playlist)
// =========================
function applyCurrentFilter() {
    if (currentFilter === "favorites") {
        renderMusic(musicData.filter((song) => song.favorite === true));
    } else if (currentFilter === "playlist") {
        const ids = getPlaylistIds();
        renderMusic(musicData.filter((song) => ids.includes(song.id)));
    } else {
        renderMusic(musicData);
    }
}

function showAllMusic() {
    currentFilter = "all";
    applyCurrentFilter();
}

function showFavorites() {
    currentFilter = "favorites";
    applyCurrentFilter();
}

function showPlaylist() {
    currentFilter = "playlist";
    applyCurrentFilter();
}

// =========================
// ⭐ FAVORIT / ➕ PLAYLIST
// =========================
function toggleFavorite(id) {
    const song = musicData.find((s) => s.id === id);
    if (!song) return;

    db.collection("music")
        .doc(id)
        .update({ favorite: !song.favorite })
        .catch((error) => console.log(error));
}

function togglePlaylist(id) {
    const ids = getPlaylistIds();
    const index = ids.indexOf(id);

    if (index === -1) {
        ids.push(id);
    } else {
        ids.splice(index, 1);
    }

    savePlaylistIds(ids);
    if (currentFilter === "playlist") applyCurrentFilter();
    else renderMusic(getFilteredForRender());
}

function getFilteredForRender() {
    if (currentFilter === "favorites") return musicData.filter((s) => s.favorite === true);
    if (currentFilter === "playlist") {
        const ids = getPlaylistIds();
        return musicData.filter((s) => ids.includes(s.id));
    }
    return musicData;
}

// =========================
// 🎨 RENDER MUSIC
// =========================
function renderMusic(list) {
    const musicList = document.getElementById("musicList");
    musicList.innerHTML = "";

    if (list.length === 0) {
        musicList.innerHTML = "<p style='padding:10px;opacity:.6;'>Tidak ada lagu.</p>";
        return;
    }

    const playlistIds = getPlaylistIds();

    list.forEach((song) => {
        const realIndex = musicData.findIndex((s) => s.id === song.id);
        const isFavorite = song.favorite === true;
        const isInPlaylist = playlistIds.includes(song.id);

        const div = document.createElement("div");
        div.className = "music-item";
        div.innerHTML = `
            <div>
                <b>${song.name}</b>
                <br>
                <small>⏱ ${song.duration}</small>
            </div>
            <div style="display:flex; gap:5px;">
                <button onclick="playMusic(${realIndex})">▶</button>
                <button onclick="toggleFavorite('${song.id}')">${isFavorite ? "❤️" : "🤍"}</button>
                <button onclick="togglePlaylist('${song.id}')">${isInPlaylist ? "✅" : "➕"}</button>
                <button onclick="deleteMusic('${song.id}')">🗑</button>
            </div>
        `;
        musicList.appendChild(div);
    });
}

// =========================
// ▶️ PLAY MUSIC
// =========================
function playMusic(index) {
    if (index < 0 || index >= musicData.length) return;

    currentIndex = index;
    const song = musicData[currentIndex];

    const player = document.getElementById("player");
    const floatingPlayer = document.getElementById("floatingPlayer");
    const floatingIcon = document.getElementById("floatingIcon");
    const floatingTitle = document.getElementById("floatingTitle");

    player.src = song.url;
    player.play();

    floatingPlayer.style.display = "block";
    floatingIcon.innerHTML = "⏸";
    floatingTitle.innerHTML = song.name;
}

// =========================
// ⏯️ PLAY / PAUSE
// =========================
function togglePlay() {
    const player = document.getElementById("player");
    const floatingIcon = document.getElementById("floatingIcon");

    if (player.paused) {
        player.play();
        floatingIcon.innerHTML = "⏸";
    } else {
        player.pause();
        floatingIcon.innerHTML = "▶";
    }
}

// =========================
// ⏭️ NEXT / ⏮️ PREVIOUS
// =========================
function nextMusic() {
    if (musicData.length === 0) return;

    currentIndex++;
    if (currentIndex >= musicData.length) currentIndex = 0;

    playMusic(currentIndex);
}

function prevMusic() {
    if (musicData.length === 0) return;

    currentIndex--;
    if (currentIndex < 0) currentIndex = musicData.length - 1;

    playMusic(currentIndex);
}

// =========================
// 🎚️ SPEED CONTROL
// =========================
function setSpeed(speed) {
    const player = document.getElementById("player");
    const speedLabel = document.getElementById("speedLabel");

    player.playbackRate = speed;
    speedLabel.innerHTML = speed + "x";
}

// =========================
// 🔀 SHUFFLE
// =========================
function toggleShuffle() {
    if (musicData.length === 0) return;

    const randomIndex = Math.floor(Math.random() * musicData.length);
    playMusic(randomIndex);
}

// =========================
// ⬆️ UPLOAD MUSIC
// =========================
async function uploadMusic() {
    const file = document.getElementById("songFile").files[0];
    const songName = document.getElementById("songName").value;

    if (!file) {
        alert("Pilih file musik!");
        return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", UPLOAD_PRESET);

    try {
        alert("Uploading...");

        const response = await fetch(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/auto/upload`,
            { method: "POST", body: formData }
        );

        const data = await response.json();

        if (data.secure_url) {
            const audio = new Audio(data.secure_url);

            audio.addEventListener("loadedmetadata", function () {
                const minutes = Math.floor(audio.duration / 60);
                const seconds = Math.floor(audio.duration % 60);
                const duration = `${minutes}:${seconds.toString().padStart(2, "0")}`;

                const song = {
                    name: songName || file.name,
                    url: data.secure_url,
                    duration: duration,
                    favorite: false,
                    createdAt: Date.now()
                };

                db.collection("music")
                    .add(song)
                    .then(() => alert("Upload berhasil!"));
            });
        }
    } catch (error) {
        console.log(error);
        alert("Upload gagal!");
    }
}

// =========================
// 🗑️ DELETE MUSIC ONLINE
// =========================
async function deleteMusic(id) {
    const confirmDelete = confirm("Hapus lagu ini?");
    if (!confirmDelete) return;

    try {
        await db.collection("music").doc(id).delete();

        // Bersihkan juga dari playlist lokal kalau ada
        const ids = getPlaylistIds().filter((pid) => pid !== id);
        savePlaylistIds(ids);

        alert("Lagu berhasil dihapus!");
    } catch (error) {
        console.log(error);
        alert("Gagal menghapus lagu!");
    }
}

// =========================
// ⏭️ AUTO NEXT + FLOATING ICON SYNC
// =========================
document.getElementById("player").addEventListener("ended", () => {
    nextMusic();
});

document.getElementById("player").addEventListener("pause", () => {
    document.getElementById("floatingIcon").innerHTML = "▶";
});

document.getElementById("player").addEventListener("play", () => {
    document.getElementById("floatingIcon").innerHTML = "⏸";
});

function hideFloatingPlayer() {
    document.getElementById("floatingPlayer").style.display = "none";
}

// =========================
// 🖱️ DRAG DESKTOP ICONS (SAVE POSITION)
// =========================
const desktopIcons = document.querySelectorAll(".desktop-icon");

let activeIcon = null;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;
let moved = false;

desktopIcons.forEach((icon) => {
    const iconId = icon.id;

    // Muat posisi tersimpan
    const savedX = localStorage.getItem(`${iconId}-x`);
    const savedY = localStorage.getItem(`${iconId}-y`);

    if (savedX && savedY) {
        icon.style.left = savedX + "px";
        icon.style.top = savedY + "px";
    }

    icon.addEventListener("touchstart", (e) => {
        activeIcon = icon;
        moved = false;

        const touch = e.touches[0];
        startX = touch.clientX;
        startY = touch.clientY;

        offsetX = touch.clientX - icon.offsetLeft;
        offsetY = touch.clientY - icon.offsetTop;
    });
});

// Pergerakan drag (global)
document.addEventListener("touchmove", (e) => {
    if (!activeIcon) return;

    const touch = e.touches[0];
    const dx = Math.abs(touch.clientX - startX);
    const dy = Math.abs(touch.clientY - startY);

    if (dx > 8 || dy > 8) moved = true;
    if (!moved) return;

    const newX = touch.clientX - offsetX;
    const newY = touch.clientY - offsetY;

    activeIcon.style.left = newX + "px";
    activeIcon.style.top = newY + "px";
});

// Akhir drag (simpan posisi)
document.addEventListener("touchend", () => {
    if (!activeIcon) return;

    localStorage.setItem(`${activeIcon.id}-x`, parseInt(activeIcon.style.left) || 0);
    localStorage.setItem(`${activeIcon.id}-y`, parseInt(activeIcon.style.top) || 0);

    activeIcon = null;
});

// =========================
// 🎧 FLOATING PLAYER DRAG
// =========================
function initFloatingDrag() {
    const floatingPlayer = document.getElementById("floatingPlayer");

    let floatingDragging = false;
    let floatingOffsetX = 0;
    let floatingOffsetY = 0;

    floatingPlayer.addEventListener("touchstart", (e) => {
        floatingDragging = true;

        const touch = e.touches[0];
        floatingOffsetX = touch.clientX - floatingPlayer.offsetLeft;
        floatingOffsetY = touch.clientY - floatingPlayer.offsetTop;
    });

    document.addEventListener("touchmove", (e) => {
        if (!floatingDragging) return;

        const touch = e.touches[0];
        floatingPlayer.style.left = (touch.clientX - floatingOffsetX) + "px";
        floatingPlayer.style.top = (touch.clientY - floatingOffsetY) + "px";
        floatingPlayer.style.right = "auto";
        floatingPlayer.style.bottom = "auto";
    });

    document.addEventListener("touchend", () => {
        floatingDragging = false;
    });
}

// =========================
// 🚀 START SYSTEM
// =========================
window.addEventListener("load", () => {
    loadMusic();
    initFloatingDrag();
});


// =========================
// 🤖 AMOS AI CHAT (OpenRouter backend di Vercel)
// =========================
const AI_API_URL = "https://openrouter-chat-web.vercel.app/api/chat";
const AI_MAX_HISTORY = 30; // maksimal pesan yang disimpan & dikirim sebagai konteks

let aiPassword = null;
let aiHistory = []; // [{ role: "user" | "assistant", content: "..." }]
let aiBusy = false;

function aiInit() {
    aiPassword = localStorage.getItem("amosAiPassword");

    try {
        aiHistory = JSON.parse(localStorage.getItem("amosAiHistory")) || [];
    } catch {
        aiHistory = [];
    }

    const savedModel = localStorage.getItem("amosAiModel");
    if (savedModel) document.getElementById("aiModel").value = savedModel;

    document.getElementById("aiPassInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") aiSubmitPassword();
    });

    const input = document.getElementById("aiInput");
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            aiSend();
        }
    });
    input.addEventListener("input", () => {
        input.style.height = "auto";
        input.style.height = Math.min(input.scrollHeight, 90) + "px";
    });

    aiRenderAll();
    aiShowGateOrChat();
}

function aiShowGateOrChat() {
    const loggedIn = !!aiPassword;
    document.getElementById("aiGate").style.display = loggedIn ? "none" : "block";
    document.getElementById("aiChat").style.display = loggedIn ? "flex" : "none";
}

function aiSubmitPassword() {
    const input = document.getElementById("aiPassInput");
    const val = input.value.trim();
    if (!val) return;

    aiPassword = val;
    localStorage.setItem("amosAiPassword", val);
    input.value = "";
    document.getElementById("aiGateError").textContent = "";
    aiShowGateOrChat();
}

function aiLogout() {
    aiPassword = null;
    localStorage.removeItem("amosAiPassword");
    aiShowGateOrChat();
}

function aiSaveModel() {
    localStorage.setItem("amosAiModel", document.getElementById("aiModel").value);
}

function aiSaveHistory() {
    aiHistory = aiHistory.slice(-AI_MAX_HISTORY);
    localStorage.setItem("amosAiHistory", JSON.stringify(aiHistory));
}

function aiNewChat() {
    if (aiBusy) return;
    aiHistory = [];
    aiSaveHistory();
    aiRenderAll();
}

// Semua teks dimasukkan lewat textContent (bukan innerHTML) supaya aman dari XSS
function aiAddBubble(role, text) {
    const box = document.getElementById("aiMessages");
    const div = document.createElement("div");
    div.className = "ai-msg " + (role === "user" ? "user" : "ai");
    div.textContent = text;
    box.appendChild(div);
    box.scrollTop = box.scrollHeight;
    return div;
}

function aiRenderAll() {
    const box = document.getElementById("aiMessages");
    box.innerHTML = "";

    if (aiHistory.length === 0) {
        aiAddBubble("assistant", "Halo! Aku AMOS AI. Mau tanya apa hari ini?");
        return;
    }
    aiHistory.forEach((m) => aiAddBubble(m.role, m.content));
}

async function aiSend() {
    if (aiBusy) return;

    const input = document.getElementById("aiInput");
    const text = input.value.trim();
    if (!text) return;

    if (!aiPassword) {
        aiShowGateOrChat();
        return;
    }

    aiBusy = true;
    const sendBtn = document.getElementById("aiSendBtn");
    sendBtn.disabled = true;

    // Kalau masih tampil sapaan awal (belum ada riwayat), bersihkan dulu
    if (aiHistory.length === 0) document.getElementById("aiMessages").innerHTML = "";

    aiHistory.push({ role: "user", content: text });
    aiAddBubble("user", text);
    input.value = "";
    input.style.height = "auto";

    const bubble = aiAddBubble("assistant", "AI sedang mengetik...");
    bubble.classList.add("typing");
    let aiText = "";

    try {
        const response = await fetch(AI_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                messages: aiHistory.slice(-AI_MAX_HISTORY),
                model: document.getElementById("aiModel").value,
                stream: true,
                password: aiPassword
            })
        });

        if (response.status === 401) {
            aiHistory.pop(); // pesan gagal terkirim, jangan disimpan
            aiSaveHistory();
            aiRenderAll();
            aiLogout();
            document.getElementById("aiGateError").textContent = "Password salah, coba lagi.";
            return;
        }

        if (!response.ok || !response.body) {
            bubble.classList.remove("typing");
            bubble.textContent = "Terjadi error saat menghubungi server. Coba lagi beberapa saat.";
            aiHistory.pop();
            aiSaveHistory();
            return;
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = "";
        let firstChunk = true;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop();

            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed.startsWith("data:")) continue;

                const payload = trimmed.slice(5).trim();
                if (payload === "[DONE]") continue;

                try {
                    const json = JSON.parse(payload);
                    const delta = json.choices?.[0]?.delta?.content;
                    if (delta) {
                        if (firstChunk) {
                            bubble.classList.remove("typing");
                            firstChunk = false;
                        }
                        aiText += delta;
                        bubble.textContent = aiText;
                        const box = document.getElementById("aiMessages");
                        box.scrollTop = box.scrollHeight;
                    }
                } catch (e) { /* baris SSE bukan JSON, lewati */ }
            }
        }

        if (!aiText) {
            bubble.classList.remove("typing");
            bubble.textContent = "AI tidak memberikan balasan. Coba kirim ulang pesan.";
            aiHistory.pop();
        } else {
            aiHistory.push({ role: "assistant", content: aiText });
        }
        aiSaveHistory();

    } catch (err) {
        bubble.classList.remove("typing");
        bubble.textContent = err instanceof TypeError
            ? "Tidak bisa terhubung ke server. Periksa koneksi internet kamu."
            : "Terjadi kesalahan: " + err.message;
        aiHistory.pop();
        aiSaveHistory();
    } finally {
        aiBusy = false;
        sendBtn.disabled = false;
    }
}

window.addEventListener("load", aiInit);


// =========================
// 📁 AMOS FILE MANAGER (data di server, password setiap dibuka)
// =========================
const FILES_API_URL = "https://openrouter-chat-web.vercel.app/api/files";

let filesPassword = null;   // hanya di memori, hilang saat window ditutup / dikunci
let filesNodes = [];        // [{ id, type, name, parent, size, updatedAt }]
let filesCurrent = null;    // id folder yang sedang dibuka (null = root)
let filesPending = null;    // { kind: "folder" | "file" | "rename", id }
let filesEditingId = null;
let filesDirty = false;
let filesBusy = false;
let filesViewingNode = null; // file unggahan yang sedang dipratinjau
let filesViewingUrl = null;

function filesSetStatus(text, isError) {
    const el = document.getElementById("filesStatus");
    el.textContent = text || "";
    el.style.color = isError ? "#ff4d6d" : "#00ff9f";
}

function filesLock() {
    filesPassword = null;
    filesNodes = [];
    filesCurrent = null;
    filesPending = null;
    filesEditingId = null;
    filesDirty = false;

    document.getElementById("filesList").innerHTML = "";
    document.getElementById("filesEditText").value = "";
    document.getElementById("filesNameBar").style.display = "none";
    document.getElementById("filesEditor").style.display = "none";
    document.getElementById("filesViewer").style.display = "none";
    document.getElementById("filesViewStage").innerHTML = "";
    filesViewingNode = null;
    filesViewingUrl = null;
    document.getElementById("filesBrowser").style.display = "flex";
    document.getElementById("filesApp").style.display = "none";
    document.getElementById("filesGate").style.display = "block";
    document.getElementById("filesPassInput").value = "";
    filesSetStatus("");
}

async function filesApi(action, data) {
    const response = await fetch(FILES_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action, password: filesPassword, ...(data || {}) })
    });

    let json = {};
    try { json = await response.json(); } catch (e) { /* respons bukan JSON */ }

    if (!response.ok) {
        const err = new Error(json.error || "Terjadi kesalahan di server");
        err.status = response.status;
        throw err;
    }
    return json;
}

function filesErrorText(e) {
    if (e instanceof TypeError) return "Tidak bisa terhubung ke server. Periksa koneksi internet.";
    return e.message;
}

// Kalau password ditolak server (401) → kunci lagi. Selain itu tampilkan pesan.
function filesHandleError(e) {
    if (e.status === 401) {
        filesLock();
        const err = document.getElementById("filesGateError");
        err.style.color = "#ff4d6d";
        err.textContent = "Password salah / sesi berakhir.";
        return;
    }
    filesSetStatus(filesErrorText(e), true);
}

// ----- Buka / kunci -----
async function filesSubmitPassword() {
    if (filesBusy) return;

    const input = document.getElementById("filesPassInput");
    const err = document.getElementById("filesGateError");
    const val = input.value;
    if (!val) return;

    filesBusy = true;
    err.style.color = "#00ff9f";
    err.textContent = "Memeriksa...";
    filesPassword = val;

    try {
        await filesApi("auth");
        input.value = "";
        err.textContent = "";
        document.getElementById("filesGate").style.display = "none";
        document.getElementById("filesApp").style.display = "flex";
    } catch (e) {
        filesPassword = null;
        err.style.color = "#ff4d6d";
        err.textContent = e.status === 401 ? "Password salah." : filesErrorText(e);
        filesBusy = false;
        return;
    }

    filesBusy = false;
    await filesRefresh();
}

// ----- Muat & tampilkan -----
async function filesRefresh() {
    if (!filesPassword) return;
    try {
        filesSetStatus("Memuat...");
        const data = await filesApi("list");
        filesNodes = data.nodes || [];
        if (filesCurrent && !filesNodes.some((n) => n.id === filesCurrent)) filesCurrent = null;
        filesRender();
        filesSetStatus("");
    } catch (e) {
        filesHandleError(e);
    }
}

function filesFormatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    return (bytes / 1024).toFixed(1) + " KB";
}

function filesRenderPath() {
    const path = document.getElementById("filesPath");
    path.innerHTML = "";

    const chain = [];
    let id = filesCurrent;
    let guard = 0;
    while (id && guard++ < 50) {
        const node = filesNodes.find((n) => n.id === id);
        if (!node) break;
        chain.unshift(node);
        id = node.parent || null;
    }

    const root = document.createElement("span");
    root.textContent = "🏠 Root";
    root.addEventListener("click", () => filesOpenFolder(null));
    path.appendChild(root);

    chain.forEach((node) => {
        path.appendChild(document.createTextNode(" / "));
        const seg = document.createElement("span");
        seg.textContent = node.name;
        seg.addEventListener("click", () => filesOpenFolder(node.id));
        path.appendChild(seg);
    });
}

function filesRender() {
    filesRenderPath();

    const list = document.getElementById("filesList");
    list.innerHTML = "";

    const items = filesNodes
        .filter((n) => (n.parent || null) === filesCurrent)
        .sort((a, b) => {
            if (a.type !== b.type) return a.type === "folder" ? -1 : 1;
            return a.name.localeCompare(b.name);
        });

    if (items.length === 0) {
        const empty = document.createElement("div");
        empty.className = "files-empty";
        empty.textContent = "Folder kosong.";
        list.appendChild(empty);
        return;
    }

    items.forEach((node) => {
        const row = document.createElement("div");
        row.className = "files-row";

        const icon = document.createElement("span");
        icon.className = "files-icon";
        icon.textContent = filesNodeIcon(node);

        const name = document.createElement("span");
        name.className = "files-name";
        name.textContent = node.name;
        name.addEventListener("click", () => {
            if (node.type === "folder") filesOpenFolder(node.id);
            else if (node.type === "upload") filesOpenUpload(node);
            else filesOpenFile(node.id);
        });

        const meta = document.createElement("span");
        meta.className = "files-meta";
        meta.textContent = node.type === "folder" ? "" : filesFormatSize(node.size || 0);

        const renameBtn = document.createElement("button");
        renameBtn.textContent = "✏️";
        renameBtn.title = "Ganti nama";
        renameBtn.addEventListener("click", () =>
            filesAsk("rename", node.id, "Nama baru:", node.name)
        );

        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑";
        delBtn.title = "Hapus";
        delBtn.addEventListener("click", () => filesDelete(node));

        row.append(icon, name, meta, renameBtn, delBtn);
        list.appendChild(row);
    });
}

// ----- Navigasi -----
function filesOpenFolder(id) {
    filesCurrent = id;
    filesCancelName();
    filesRender();
}

function filesGoUp() {
    if (!filesCurrent) return;
    const node = filesNodes.find((n) => n.id === filesCurrent);
    filesOpenFolder(node ? node.parent || null : null);
}

// ----- Buat folder / file / ganti nama -----
function filesNewFolder() {
    filesAsk("folder", null, "Nama folder:", "");
}

function filesNewFile() {
    filesAsk("file", null, "Nama file:", "");
}

function filesAsk(kind, id, label, value) {
    filesPending = { kind: kind, id: id };
    document.getElementById("filesNameLabel").textContent = label;
    const input = document.getElementById("filesNameInput");
    input.value = value || "";
    document.getElementById("filesNameBar").style.display = "flex";
    input.focus();
    input.select();
}

function filesCancelName() {
    filesPending = null;
    document.getElementById("filesNameBar").style.display = "none";
    document.getElementById("filesNameInput").value = "";
}

async function filesConfirmName() {
    if (!filesPending || filesBusy) return;

    const name = document.getElementById("filesNameInput").value.trim();
    if (!name) return;

    const pending = filesPending;
    filesBusy = true;

    try {
        filesSetStatus("Menyimpan...");
        if (pending.kind === "rename") {
            await filesApi("update", { id: pending.id, name: name });
        } else {
            await filesApi("create", {
                type: pending.kind,
                name: name,
                parent: filesCurrent,
                content: ""
            });
        }
        filesCancelName();
        filesBusy = false;
        await filesRefresh();
    } catch (e) {
        filesHandleError(e);
    } finally {
        filesBusy = false;
    }
}

// ----- Hapus -----
async function filesDelete(node) {
    if (filesBusy) return;

    const msg = node.type === "folder"
        ? `Hapus folder "${node.name}" beserta SEMUA isinya?`
        : `Hapus file "${node.name}"?`;
    if (!confirm(msg)) return;

    filesBusy = true;
    try {
        filesSetStatus("Menghapus...");
        await filesApi("delete", { id: node.id });
        filesBusy = false;
        await filesRefresh();
    } catch (e) {
        filesHandleError(e);
    } finally {
        filesBusy = false;
    }
}

// ----- Editor file -----
async function filesOpenFile(id) {
    if (filesBusy) return;
    filesBusy = true;

    try {
        filesSetStatus("Membuka...");
        const data = await filesApi("read", { id: id });
        filesEditingId = id;
        filesDirty = false;
        document.getElementById("filesEditTitle").textContent = data.node.name;
        document.getElementById("filesEditText").value = data.content || "";
        document.getElementById("filesBrowser").style.display = "none";
        document.getElementById("filesEditor").style.display = "flex";
        filesSetStatus("");
    } catch (e) {
        filesHandleError(e);
    } finally {
        filesBusy = false;
    }
}

async function filesSaveFile() {
    if (!filesEditingId || filesBusy) return;
    filesBusy = true;

    try {
        filesSetStatus("Menyimpan...");
        await filesApi("update", {
            id: filesEditingId,
            content: document.getElementById("filesEditText").value
        });
        filesDirty = false;
        filesSetStatus("Tersimpan ✅");
    } catch (e) {
        filesHandleError(e);
    } finally {
        filesBusy = false;
    }
}

async function filesCloseEditor() {
    if (filesDirty && !confirm("Perubahan belum disimpan. Tutup tanpa menyimpan?")) return;

    filesEditingId = null;
    filesDirty = false;
    document.getElementById("filesEditText").value = "";
    document.getElementById("filesEditor").style.display = "none";
    document.getElementById("filesBrowser").style.display = "flex";
    await filesRefresh();
}

// ----- Upload foto / musik / file lain (disimpan di Supabase, bucket private) -----
function filesNodeIcon(node) {
    if (node.type === "folder") return "📁";
    if (node.type === "upload") {
        const mime = node.mime || "";
        if (mime.startsWith("image/")) return "🖼️";
        if (mime.startsWith("audio/")) return "🎵";
        if (mime.startsWith("video/")) return "🎬";
        return "📎";
    }
    return "📄";
}

function filesTriggerUpload() {
    if (filesBusy) return;
    document.getElementById("filesUploadInput").click();
}

function filesXhrPut(url, body, headers, onProgress) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("PUT", url);
        Object.keys(headers || {}).forEach((k) => xhr.setRequestHeader(k, headers[k]));
        xhr.upload.onprogress = (e) => {
            if (e.lengthComputable && onProgress) onProgress(Math.round((e.loaded / e.total) * 100));
        };
        xhr.onload = () => resolve({ status: xhr.status, text: xhr.responseText });
        xhr.onerror = () => reject(new TypeError("network"));
        xhr.send(body);
    });
}

// Kirim file langsung ke Supabase lewat link upload sementara dari server
async function filesPutFile(url, file, onProgress) {
    const form = new FormData();
    form.append("cacheControl", "3600");
    form.append("", file);

    let res = await filesXhrPut(url, form, { "x-upsert": "false" }, onProgress);
    if (res.status >= 200 && res.status < 300) return;

    // Cadangan: kirim isi file mentah
    res = await filesXhrPut(
        url,
        file,
        { "Content-Type": file.type || "application/octet-stream", "x-upsert": "true" },
        onProgress
    );
    if (!(res.status >= 200 && res.status < 300)) {
        throw new Error("Upload ke penyimpanan gagal (kode " + res.status + ")");
    }
}

async function filesUploadSelected(fileList) {
    const files = Array.from(fileList || []);
    if (files.length === 0 || filesBusy || !filesPassword) return;

    filesBusy = true;
    const parent = filesCurrent;
    const failed = [];
    let done = 0;

    try {
        for (let i = 0; i < files.length; i++) {
            if (!filesPassword) break; // window dikunci saat upload berjalan
            const file = files[i];
            const label = "Mengunggah " + (i + 1) + "/" + files.length + ": " + file.name;

            try {
                filesSetStatus(label + " (menyiapkan...)");
                const mime = file.type || "application/octet-stream";
                const init = await filesApi("upload-init", {
                    name: file.name, parent: parent, size: file.size, mime: mime
                });

                await filesPutFile(init.uploadUrl, file, (pct) => {
                    filesSetStatus(label + " (" + pct + "%)");
                });

                filesSetStatus(label + " (menyimpan...)");
                await filesApi("upload-commit", {
                    id: init.id, name: file.name, parent: parent, mime: mime, size: file.size
                });
                done++;
            } catch (e) {
                if (e.status === 401) { filesHandleError(e); return; }
                failed.push(file.name + " — " + filesErrorText(e));
            }
        }
    } finally {
        filesBusy = false;
    }

    if (!filesPassword) return;
    await filesRefresh();
    if (failed.length) {
        filesSetStatus("Berhasil " + done + ", gagal " + failed.length + ": " + failed[0], true);
    } else {
        filesSetStatus("Upload selesai ✅ (" + done + " file)");
    }
}

// ----- Pratinjau / unduh file unggahan -----
async function filesOpenUpload(node) {
    if (filesBusy) return;
    filesBusy = true;

    try {
        filesSetStatus("Membuka...");
        const data = await filesApi("download-url", { id: node.id });
        filesViewingNode = node;
        filesViewingUrl = data.url;

        const stage = document.getElementById("filesViewStage");
        stage.innerHTML = "";
        const mime = node.mime || "";
        let el;

        if (mime.startsWith("image/")) {
            el = document.createElement("img");
            el.alt = node.name;
            el.src = data.url;
        } else if (mime.startsWith("audio/")) {
            el = document.createElement("audio");
            el.controls = true;
            el.src = data.url;
        } else if (mime.startsWith("video/")) {
            el = document.createElement("video");
            el.controls = true;
            el.playsInline = true;
            el.src = data.url;
        } else {
            el = document.createElement("div");
            el.className = "files-empty";
            el.textContent = "Tidak ada pratinjau untuk jenis file ini. Ketuk Unduh untuk membukanya.";
        }
        stage.appendChild(el);

        document.getElementById("filesViewTitle").textContent = node.name;
        document.getElementById("filesBrowser").style.display = "none";
        document.getElementById("filesViewer").style.display = "flex";
        filesSetStatus("");
    } catch (e) {
        filesHandleError(e);
    } finally {
        filesBusy = false;
    }
}

async function filesDownloadCurrent() {
    if (!filesViewingNode || filesBusy) return;
    filesBusy = true;

    try {
        filesSetStatus("Menyiapkan unduhan...");
        const data = await filesApi("download-url", { id: filesViewingNode.id, download: true });
        const a = document.createElement("a");
        a.href = data.url;
        a.target = "_blank";
        a.rel = "noopener";
        document.body.appendChild(a);
        a.click();
        a.remove();
        filesSetStatus("");
    } catch (e) {
        filesHandleError(e);
    } finally {
        filesBusy = false;
    }
}

function filesCloseViewer() {
    document.getElementById("filesViewStage").innerHTML = ""; // hentikan audio/video
    filesViewingNode = null;
    filesViewingUrl = null;
    document.getElementById("filesViewer").style.display = "none";
    document.getElementById("filesBrowser").style.display = "flex";
    filesSetStatus("");
}

// ----- Init -----
function filesInit() {
    document.getElementById("filesPassInput").addEventListener("keydown", (e) => {
        if (e.key === "Enter") filesSubmitPassword();
    });

    const nameInput = document.getElementById("filesNameInput");
    nameInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") filesConfirmName();
        if (e.key === "Escape") filesCancelName();
    });

    document.getElementById("filesEditText").addEventListener("input", () => {
        filesDirty = true;
    });

    const uploadInput = document.getElementById("filesUploadInput");
    uploadInput.addEventListener("change", () => {
        const picked = Array.from(uploadInput.files || []);
        uploadInput.value = ""; // supaya file yang sama bisa dipilih lagi
        filesUploadSelected(picked);
    });
}

window.addEventListener("load", filesInit);
