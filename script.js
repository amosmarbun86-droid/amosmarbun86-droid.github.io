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

function login() {
    const pin = document.getElementById("pass").value;
    const character = document.getElementById("loginCharacter");
    const statusText = document.getElementById("login-status-text");
    const loginBtn = document.querySelector("#login button");

    character.classList.remove("success", "fail");

    if (pin === "101312") {
        character.classList.add("success");
        statusText.innerText = "AKSES DITERIMA ✅";
        statusText.style.color = "#00ff9f";
        if (loginBtn) loginBtn.disabled = true;

        showToast("Login berhasil", "success");

        setTimeout(() => {
            document.getElementById("login").style.display = "none";
            document.getElementById("desktop").style.display = "flex";
            localStorage.setItem("amosLoggedIn", "true");
        }, 1300);
    } else {
        character.classList.add("fail");
        statusText.innerText = "PIN SALAH ❌";
        statusText.style.color = "#ff4d6d";

        const passInput = document.getElementById("pass");
        passInput.style.transition = "transform 0.1s";
        passInput.classList.add("shake-input");

        showToast("PIN salah", "error");

        setTimeout(() => {
            character.classList.remove("fail");
            passInput.classList.remove("shake-input");
        }, 1000);

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

function loadTheme() {
    const savedTheme = localStorage.getItem("amosThemeMode") || "dark";
    document.body.setAttribute("data-theme", savedTheme);
    const select = document.getElementById("themeMode");
    if (select) select.value = savedTheme;
    const toggle = document.getElementById("notificationsEnabled");
    if (toggle) toggle.checked = localStorage.getItem("amosNotificationsEnabled") !== "false";
    const soundToggle = document.getElementById("soundEnabled");
    if (soundToggle) soundToggle.checked = localStorage.getItem("amosSoundEnabled") !== "false";
}

function applyTheme(theme) {
    const nextTheme = theme || localStorage.getItem("amosThemeMode") || "dark";
    localStorage.setItem("amosThemeMode", nextTheme);
    document.body.setAttribute("data-theme", nextTheme);
    const select = document.getElementById("themeMode");
    if (select) select.value = nextTheme;
}

function toggleTheme() {
    const current = document.body.getAttribute("data-theme") === "light" ? "light" : "dark";
    const next = current === "dark" ? "light" : "dark";
    applyTheme(next);
    showToast(`Tema diubah ke ${next === "light" ? "Light" : "Dark"}`, "info");
}

function saveSettings() {
    const themeMode = document.getElementById("themeMode")?.value || "dark";
    const notificationsEnabled = document.getElementById("notificationsEnabled")?.checked !== false;
    const soundEnabled = document.getElementById("soundEnabled")?.checked !== false;

    localStorage.setItem("amosThemeMode", themeMode);
    localStorage.setItem("amosNotificationsEnabled", String(notificationsEnabled));
    localStorage.setItem("amosSoundEnabled", String(soundEnabled));
    applyTheme(themeMode);
    showToast("Pengaturan tersimpan", "success");
}

function showToast(message, type = "info") {
    const enabled = localStorage.getItem("amosNotificationsEnabled") !== "false";
    if (!enabled) return;

    const container = document.getElementById("toastContainer");
    if (!container) return;

    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.textContent = message;
    container.appendChild(toast);

    setTimeout(() => {
        toast.remove();
    }, 2800);
}

function addNotification(title, message, type = "info") {
    const list = document.getElementById("notificationList");
    if (!list) return;

    const item = document.createElement("div");
    item.className = `notification-item ${type}`;
    item.innerHTML = `<strong>${title}</strong><span>${message}</span>`;
    list.prepend(item);

    const maxItems = 12;
    while (list.children.length > maxItems) {
        list.removeChild(list.lastChild);
    }
}

function toggleNotificationCenter() {
    const panel = document.getElementById("notificationCenter");
    if (!panel) return;
    panel.classList.toggle("active");
}

function renderNotificationCenter() {
    const list = document.getElementById("notificationList");
    if (!list) return;
    list.innerHTML = "";
    const items = [
        { title: "System", message: "AMOS OS siap dipakai", type: "success" },
        { title: "Theme", message: "Mode sekarang mengikuti preferensi pengguna", type: "info" },
        { title: "Notes", message: "Catatan bisa disimpan di perangkat ini", type: "info" }
    ];

    items.forEach((item) => {
        const el = document.createElement("div");
        el.className = `notification-item ${item.type}`;
        el.innerHTML = `<strong>${item.title}</strong><span>${item.message}</span>`;
        list.appendChild(el);
    });
}

function createNotesDefault() {
    const defaultNotes = [
        { id: Date.now(), title: "Goals", text: "- Launch portfolio update\n- Finish AI assistant polish\n- Review UI improvements" },
        { id: Date.now() + 1, title: "Quick ideas", text: "- Add custom theme\n- Improve file manager\n- Add more shortcuts" }
    ];
    const saved = localStorage.getItem("amosNotes");
    if (!saved) localStorage.setItem("amosNotes", JSON.stringify(defaultNotes));
}

function getNotes() {
    try {
        return JSON.parse(localStorage.getItem("amosNotes")) || [];
    } catch {
        return [];
    }
}

function saveNotes(notes) {
    localStorage.setItem("amosNotes", JSON.stringify(notes));
}

function addNote() {
    const notes = getNotes();
    const nextNote = {
        id: Date.now() + Math.random(),
        title: `Catatan ${notes.length + 1}`,
        text: ""
    };
    notes.unshift(nextNote);
    saveNotes(notes);
    renderNotes();
    showToast("Catatan baru dibuat", "success");
}

function updateNote(id, field, value) {
    const notes = getNotes();
    const idx = notes.findIndex((note) => note.id === id);
    if (idx !== -1) {
        notes[idx][field] = value;
        saveNotes(notes);
    }
}

function deleteNote(id) {
    const notes = getNotes().filter((note) => note.id !== id);
    saveNotes(notes);
    renderNotes();
    showToast("Catatan dihapus", "info");
}

function renderNotes() {
    const list = document.getElementById("notesList");
    if (!list) return;

    const notes = getNotes();
    list.innerHTML = "";

    if (!notes.length) {
        list.innerHTML = '<div class="notes-empty">Belum ada catatan. Klik tombol di atas untuk membuat baru.</div>';
        return;
    }

    notes.forEach((note) => {
        const card = document.createElement("div");
        card.className = "note-card";

        const titleInput = document.createElement("input");
        titleInput.type = "text";
        titleInput.value = note.title || "Untitled";
        titleInput.addEventListener("input", (event) => {
            updateNote(note.id, "title", event.target.value || "Untitled");
        });

        const textArea = document.createElement("textarea");
        textArea.value = note.text || "";
        textArea.placeholder = "Tulis isi catatan...";
        textArea.addEventListener("input", (event) => {
            updateNote(note.id, "text", event.target.value);
        });

        const actions = document.createElement("div");
        actions.className = "note-actions";

        const saveBtn = document.createElement("button");
        saveBtn.textContent = "Save";
        saveBtn.onclick = () => {
            updateNote(note.id, "title", titleInput.value || "Untitled");
            updateNote(note.id, "text", textArea.value);
            showToast("Catatan disimpan", "success");
        };

        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => deleteNote(note.id);

        actions.appendChild(saveBtn);
        actions.appendChild(delBtn);

        card.appendChild(titleInput);
        card.appendChild(textArea);
        card.appendChild(actions);
        list.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("amosLoggedIn") === "true") {
        document.getElementById("login").style.display = "none";
        document.getElementById("desktop").style.display = "flex";
    }

    loadTheme();
    createNotesDefault();
    renderNotes();
    renderNotificationCenter();

    changeWallpaper();
    setInterval(changeWallpaper, 10000);

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

    const themeSelect = document.getElementById("themeMode");
    if (themeSelect) {
        themeSelect.value = localStorage.getItem("amosThemeMode") || "dark";
    }

    const notifToggle = document.getElementById("notificationsEnabled");
    if (notifToggle) {
        notifToggle.checked = localStorage.getItem("amosNotificationsEnabled") !== "false";
    }

    const soundToggle = document.getElementById("soundEnabled");
    if (soundToggle) {
        soundToggle.checked = localStorage.getItem("amosSoundEnabled") !== "false";
    }

    const themeState = localStorage.getItem("amosThemeMode") || "dark";
    document.body.setAttribute("data-theme", themeState);
    showToast("AMOS OS siap digunakan", "success");
    addNotification("System", "Versi fase 1 aktif", "success");
});

setInterval(() => {
    const clock = document.getElementById("clock");
    if (clock) clock.innerHTML = new Date().toLocaleTimeString("id-ID");
}, 1000);

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
    if (bootSound) {
        bootSound.volume = 0.7;
        const playPromise = bootSound.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.log("Autoplay blocked:", error);
            });
        }
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

let windowTopZ = 9999;

function openWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    if (id === "filesWindow" && win.style.display !== "flex") filesLock();
    win.style.display = "flex";
    win.style.zIndex = ++windowTopZ;

    if (id === "filesWindow") {
        const pass = document.getElementById("filesPassInput");
        if (pass) pass.focus();
    }

    if (id === "terminalWindow") termOpen();
}

function closeWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    if (id === "filesWindow") {
        if (filesDirty && !confirm("Perubahan belum disimpan. Tutup tanpa menyimpan?")) return;
        filesLock();
    }

    if (id === "terminalWindow") termClose();
    win.style.display = "none";
}

let musicData = [];
let currentIndex = 0;
let currentFilter = "all";

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

function loadMusic() {
    const musicList = document.getElementById("musicList");
    musicList.innerHTML = "Loading Music...";

    db.collection("music").onSnapshot((snapshot) => {
        musicData = [];
        snapshot.forEach((doc) => {
            const song = doc.data();
            song.id = doc.id;
            musicData.push(song);
        });
        applyCurrentFilter();
    });
}

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

function setSpeed(speed) {
    const player = document.getElementById("player");
    const speedLabel = document.getElementById("speedLabel");

    player.playbackRate = speed;
    speedLabel.innerHTML = speed + "x";
}

function toggleShuffle() {
    if (musicData.length === 0) return;
    const randomIndex = Math.floor(Math.random() * musicData.length);
    playMusic(randomIndex);
}

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

async function deleteMusic(id) {
    const confirmDelete = confirm("Hapus lagu ini?");
    if (!confirmDelete) return;

    try {
        await db.collection("music").doc(id).delete();
        const ids = getPlaylistIds().filter((pid) => pid !== id);
        savePlaylistIds(ids);
        alert("Lagu berhasil dihapus!");
    } catch (error) {
        console.log(error);
        alert("Gagal menghapus lagu!");
    }
}

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

const desktopIcons = document.querySelectorAll(".desktop-icon");
let activeIcon = null;
let startX = 0;
let startY = 0;
let offsetX = 0;
let offsetY = 0;
let moved = false;

desktopIcons.forEach((icon) => {
    const iconId = icon.id;
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

document.addEventListener("touchend", () => {
    if (!activeIcon) return;

    localStorage.setItem(`${activeIcon.id}-x`, parseInt(activeIcon.style.left) || 0);
    localStorage.setItem(`${activeIcon.id}-y`, parseInt(activeIcon.style.top) || 0);

    activeIcon = null;
});

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

window.addEventListener("load", () => {
    loadMusic();
    initFloatingDrag();
    loadTheme();
    renderNotes();
    renderNotificationCenter();
    createNotesDefault();
});

const AI_API_URL = "https://openrouter-chat-web.vercel.app/api/chat";
const AI_MAX_HISTORY = 30;

let aiPassword = null;
let aiHistory = [];
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
            aiHistory.pop();
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
                } catch (e) { }
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

const FILES_API_URL = "https://openrouter-chat-web.vercel.app/api/files";

let filesPassword = null;
let filesNodes = [];
let filesCurrent = null;
let filesPending = null;
let filesEditingId = null;
let filesDirty = false;
let filesBusy = false;
let filesViewingNode = null;
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
    try { json = await response.json(); } catch (e) { }

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
        renameBtn.addEventListener("click", () => filesAsk("rename", node.id, "Nama baru:", node.name));

        const delBtn = document.createElement("button");
        delBtn.textContent = "🗑";
        delBtn.title = "Hapus";
        delBtn.addEventListener("click", () => filesDelete(node));

        row.append(icon, name, meta, renameBtn, delBtn);
        list.appendChild(row);
    });
}

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

async function filesPutFile(url, file, onProgress) {
    const form = new FormData();
    form.append("cacheControl", "3600");
    form.append("", file);

    let res = await filesXhrPut(url, form, { "x-upsert": "false" }, onProgress);
    if (res.status >= 200 && res.status < 300) return;

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
            if (!filesPassword) break;
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
        uploadInput.value = "";
        filesUploadSelected(picked);
    });
}

window.addEventListener("load", filesInit);

let termInstance = null;
let termFitAddon = null;
let termSession = 0;
let termPassword = null;
let termNodes = [];
let termCwd = null;
let termLine = "";
let termCursor = 0;
let termHistory = [];
let termHistIdx = 0;
let termHistDraft = "";
let termBusy = false;
let termMode = "shell";
let termPassCb = null;
let termAbort = null;
let termAiHistory = [];

const TERM_ROOT = { id: null, type: "folder", name: "~" };
const TERM_C = {
    reset: "\x1b[0m", red: "\x1b[31m", green: "\x1b[32m", yellow: "\x1b[33m",
    blue: "\x1b[1;34m", magenta: "\x1b[35m", cyan: "\x1b[36m", dim: "\x1b[90m", boldGreen: "\x1b[1;32m"
};

function termColor(name, text) {
    return TERM_C[name] + text + TERM_C.reset;
}

function termWrite(text) {
    if (!termInstance) return;
    termInstance.write(String(text).replace(/\r?\n/g, "\r\n"));
}

function termPathOf(id) {
    if (!id) return "~";
    const parts = [];
    let cur = id;
    let guard = 0;
    while (cur && guard++ < 50) {
        const n = termNodes.find((x) => x.id === cur);
        if (!n) break;
        parts.unshift(n.name);
        cur = n.parent || null;
    }
    return "~/" + parts.join("/");
}

function termNodeById(id) {
    if (!id) return TERM_ROOT;
    return termNodes.find((n) => n.id === id) || null;
}

function termFindChild(parentId, name) {
    const lower = name.toLowerCase();
    return termNodes.find((n) => (n.parent || null) === parentId && n.name.toLowerCase() === lower) || null;
}

function termResolve(path) {
    let cur;
    if (path.startsWith("/") || path === "~" || path.startsWith("~/")) cur = TERM_ROOT;
    else cur = termNodeById(termCwd) || TERM_ROOT;

    for (const p of path.split("/")) {
        if (p === "" || p === "." || p === "~") continue;
        if (p === "..") {
            cur = cur.id ? (termNodeById(cur.parent || null) || TERM_ROOT) : TERM_ROOT;
            continue;
        }
        if (cur.type !== "folder") return null;
        const child = termFindChild(cur.id, p);
        if (!child) return null;
        cur = child;
    }
    return cur;
}

function termSplitPath(path) {
    const idx = path.lastIndexOf("/");
    if (idx === -1) return { dirPath: ".", base: path };
    return { dirPath: path.slice(0, idx) || "/", base: path.slice(idx + 1) };
}

function termPromptText() {
    return TERM_C.boldGreen + "amos@os" + TERM_C.reset + ":" + TERM_C.blue + termPathOf(termCwd) + TERM_C.reset + "$ ";
}

function termShowPrompt() {
    if (!termInstance) return;
    termInstance.write(termPromptText());
}

function termRedraw() {
    if (!termInstance) return;
    termInstance.write("\r\x1b[K" + termPromptText() + termLine);
    const back = termLine.length - termCursor;
    if (back > 0) termInstance.write("\x1b[" + back + "D");
}

function termSetLine(text) {
    termLine = text;
    termCursor = text.length;
    termRedraw();
}

function termTokenize(line) {
    const tokens = [];
    let cur = "";
    let inTok = false;
    let quote = null;

    for (let i = 0; i < line.length; i++) {
        const ch = line[i];

        if (quote) {
            if (ch === quote) quote = null;
            else if (ch === "\\" && quote === '"' && i + 1 < line.length) cur += line[++i];
            else cur += ch;
            continue;
        }
        if (ch === '"' || ch === "'") { quote = ch; inTok = true; continue; }
        if (ch === "\\" && i + 1 < line.length) { cur += line[++i]; inTok = true; continue; }
        if (/\s/.test(ch)) {
            if (inTok) { tokens.push({ t: cur, op: false }); cur = ""; inTok = false; }
            continue;
        }
        if (ch === ">") {
            if (inTok) { tokens.push({ t: cur, op: false }); cur = ""; inTok = false; }
            if (line[i + 1] === ">") { tokens.push({ t: ">>", op: true }); i++; }
            else tokens.push({ t: ">", op: true });
            continue;
        }
        cur += ch;
        inTok = true;
    }
    if (quote) throw new Error("tanda kutip belum ditutup");
    if (inTok) tokens.push({ t: cur, op: false });
    return tokens;
}

function termParse(line) {
    const tokens = termTokenize(line);
    const args = [];
    let redirect = null;
    for (let i = 0; i < tokens.length; i++) {
        const tk = tokens[i];
        if (tk.op) {
            const target = tokens[i + 1];
            if (!target || target.op) throw new Error("tujuan redirect kosong");
            redirect = { append: tk.t === ">>", path: target.t };
            i++;
        } else {
            args.push(tk.t);
        }
    }
    return { args: args, redirect: redirect };
}

async function termApi(action, data) {
    const response = await fetch(FILES_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: action, password: termPassword, ...(data || {}) })
    });
    let json = {};
    try { json = await response.json(); } catch (e) { }
    if (!response.ok) {
        const err = new Error(json.error || "Terjadi kesalahan di server");
        err.status = response.status;
        throw err;
    }
    return json;
}

async function termReload() {
    const data = await termApi("list");
    termNodes = data.nodes || [];
    if (termCwd && !termNodes.some((n) => n.id === termCwd)) termCwd = null;
}

function termFail(e) {
    if (!termInstance) return;
    if (e && e.name === "AbortError") return;
    if (e && e.status === 401) {
        termPassword = null;
        termNodes = [];
        termCwd = null;
        termWrite(termColor("red", "Password salah atau sesi berakhir. Ketik: login\n"));
        return;
    }
    const msg = e instanceof TypeError
        ? "Tidak bisa terhubung ke server. Periksa koneksi internet."
        : (e && e.message) || "Terjadi kesalahan";
    termWrite(termColor("red", msg + "\n"));
}

function termRequireLogin() {
    if (termPassword) return true;
    termWrite(termColor("yellow", "Belum login. Ketik: login\n"));
    return false;
}

function termReadPassword(label) {
    return new Promise((resolve) => {
        termMode = "password";
        termPassCb = resolve;
        termLine = "";
        termCursor = 0;
        termWrite(label);
    });
}

function termFmtSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / 1024 / 1024).toFixed(1) + " MB";
}

async function termCreate(path, type, content) {
    const { dirPath, base } = termSplitPath(path);
    const dir = termResolve(dirPath);
    if (!dir || dir.type !== "folder") throw new Error("folder tujuan tidak ada: " + dirPath);
    if (!base || base === "." || base === "..") throw new Error("nama tidak valid: " + path);
    if (termFindChild(dir.id, base)) throw new Error("sudah ada: " + path);
    await termApi("create", { type: type, name: base, parent: dir.id, content: content || "" });
    await termReload();
}

const TERM_WINDOWS = [
    { key: "ai", label: "AI", win: "aiWindow" },
    { key: "browser", label: "Browser", win: "browserWindow" },
    { key: "music", label: "Music", win: "musicWindow" },
    { key: "files", label: "Files", win: "filesWindow" },
    { key: "notes", label: "Notes", win: "notesWindow" }
];

function termSlug(text) {
    return String(text).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function termLaunchers() {
    const list = TERM_WINDOWS.map((w) => ({ key: w.key, label: w.label, win: w.win }));
    document.querySelectorAll("#sidebar .side-item").forEach((el) => {
        const m = (el.getAttribute("onclick") || "").match(/openExternal\('([^']+)'\)/);
        if (!m || m[1] === "#") return;
        const label = (el.textContent || "").replace(/\s+/g, " ").trim();
        const key = termSlug(label);
        if (key && !list.some((x) => x.key === key)) list.push({ key: key, label: label, url: m[1] });
    });
    return list;
}

const TERM_HELP = [
    "Perintah umum:",
    "  help, clear, echo, date, whoami, uname, history, exit",
    "Buka aplikasi:",
    "  apps                daftar jendela & halaman menu sidebar",
    "  open <nama>         buka (mis. open files, open lock)",
    "Akun:",
    "  login / logout      masuk ke File Manager (password server)",
    "  ailogin             simpan password chat AI",
    "File (setelah login):",
    "  ls [-l] [folder]    daftar isi",
    "  cd <folder>         pindah folder (cd .. naik, cd ~ ke root)",
    "  pwd                 lokasi sekarang",
    "  mkdir <nama>...     buat folder",
    "  touch <nama>...     buat file kosong",
    "  cat <file>          tampilkan isi file teks",
    "  echo teks > file    tulis ke file (>> untuk menambah)",
    "  rm [-r] <nama>...   hapus file / folder",
    "  mv <lama> <baru>    ganti nama",
    "AI:",
    "  ai <pertanyaan>     tanya AI (Ctrl+C untuk batal)",
    "Tab = lengkapi, ↑/↓ = riwayat"
].join("\n") + "\n";

const TERM_COMMANDS = {
    help: async () => { termWrite(TERM_HELP); },
    clear: async () => { termWrite("\x1b[2J\x1b[3J\x1b[H"); },
    date: async () => { termWrite(new Date().toLocaleString("id-ID") + "\n"); },
    whoami: async () => { termWrite("amos\n"); },
    uname: async () => { termWrite("AmosOS 1.0 (browser)\n"); },
    history: async () => {
        termHistory.forEach((h, i) => termWrite(String(i + 1).padStart(4, " ") + "  " + h + "\n"));
    },
    exit: async () => { closeWindow("terminalWindow"); },
    apps: async () => {
        const list = termLaunchers();
        termWrite(termColor("cyan", "Jendela Amos OS:") + "\n  " + list.filter((x) => x.win).map((x) => x.key).join(", ") + "\n");
        termWrite(termColor("cyan", "Halaman (tab baru):") + "\n  " + list.filter((x) => x.url).map((x) => x.key).join(", ") + "\n");
        termWrite(termColor("dim", "Pakai: open <nama>  (nama boleh disingkat, mis. open lock)") + "\n");
    },
    open: async (args) => {
        const query = termSlug(args.join(" "));
        if (!query) { termWrite("pemakaian: open <nama>  (ketik 'apps' untuk daftar)\n"); return; }
        if (query === "terminal") { termWrite("Terminal sudah terbuka.\n"); return; }

        const list = termLaunchers();
        let found = list.filter((x) => x.key === query);
        if (!found.length) found = list.filter((x) => x.key.includes(query));
        if (!found.length) throw new Error("tidak ada aplikasi '" + args.join(" ") + "'. Ketik 'apps' untuk daftar.");
        if (found.length > 1) {
            termWrite("Maksud kamu yang mana? " + found.map((x) => x.key).join(", ") + "\n");
            return;
        }

        const app = found[0];
        if (app.win) {
            openWindow(app.win);
            termWrite("Membuka " + app.label + " di depan Terminal. Tutup dengan ✕ untuk kembali; buka Terminal lagi lewat ikonnya.\n");
            return;
        }
        const opened = window.open(app.url, "_blank");
        if (!opened) termWrite(termColor("yellow", "Browser memblokir popup. Izinkan popup untuk situs ini lalu ulangi.\n"));
        else termWrite("Membuka " + app.label + " di tab baru...\n");
    },
    echo: async (args, redirect) => {
        const text = args.join(" ");
        if (!redirect) { termWrite(text + "\n"); return; }
        if (!termRequireLogin()) return;

        const target = termResolve(redirect.path);
        if (target && target.type === "folder") throw new Error("'" + redirect.path + "' adalah folder");
        if (target && target.type === "upload") throw new Error("'" + redirect.path + "' bukan file teks");

        if (!target) {
            await termCreate(redirect.path, "file", text + "\n");
            return;
        }
        let content = text + "\n";
        if (redirect.append) {
            const data = await termApi("read", { id: target.id });
            const old = data.content || "";
            content = old + (old && !old.endsWith("\n") ? "\n" : "") + content;
        }
        await termApi("update", { id: target.id, content: content });
        await termReload();
    },
    login: async () => {
        const pw = await termReadPassword("Password File Manager: ");
        if (!pw) return;
        termPassword = pw;
        try {
            await termReload();
            termWrite(termColor("green", "Login berhasil.\n"));
        } catch (e) {
            termPassword = null;
            termNodes = [];
            if (e.status === 401) termWrite(termColor("red", "Password salah.\n"));
            else termFail(e);
        }
    },
    logout: async () => {
        termPassword = null;
        termNodes = [];
        termCwd = null;
        termWrite("Logout. Password dihapus dari memori.\n");
    },
    ailogin: async () => {
        const pw = await termReadPassword("Password chat AI: ");
        if (!pw) return;
        aiPassword = pw;
        localStorage.setItem("amosAiPassword", pw);
        if (typeof aiShowGateOrChat === "function") aiShowGateOrChat();
        termWrite(termColor("green", "Password AI tersimpan di perangkat ini.\n"));
    },
    ls: async (args) => {
        if (!termRequireLogin()) return;
        let long = false;
        const paths = [];
        args.forEach((a) => {
            if (a.startsWith("-") && a.length > 1) { if (a.includes("l")) long = true; }
            else paths.push(a);
        });

        const node = termResolve(paths[0] || ".");
        if (!node) throw new Error("tidak ada: " + paths[0]);

        const items = node.type === "folder"
            ? termNodes.filter((n) => (n.parent || null) === node.id)
            : [node];
        items.sort((a, b) => {
            if ((a.type === "folder") !== (b.type === "folder")) return a.type === "folder" ? -1 : 1;
            return a.name.localeCompare(b.name);
        });

        if (items.length === 0) return;

        const label = (n) => {
            if (n.type === "folder") return termColor("blue", n.name + "/");
            if (n.type === "upload") return termColor("magenta", n.name);
            return n.name;
        };

        if (!long) {
            termWrite(items.map(label).join("  ") + "\n");
            return;
        }
        items.forEach((n) => {
            const kind = n.type === "folder" ? "d" : (n.type === "upload" ? "u" : "-");
            const size = n.type === "folder" ? "-" : termFmtSize(n.size || 0);
            const when = n.updatedAt ? new Date(n.updatedAt).toISOString().slice(0, 16).replace("T", " ") : "";
            termWrite(kind + "  " + size.padStart(9, " ") + "  " + when + "  " + label(n) + "\n");
        });
    },
    cd: async (args) => {
        if (!termRequireLogin()) return;
        const node = termResolve(args[0] || "~");
        if (!node) throw new Error("tidak ada: " + args[0]);
        if (node.type !== "folder") throw new Error("bukan folder: " + args[0]);
        termCwd = node.id;
    },
    pwd: async () => {
        if (!termRequireLogin()) return;
        termWrite(termPathOf(termCwd) + "\n");
    },
    mkdir: async (args) => {
        if (!termRequireLogin()) return;
        if (!args.length) { termWrite("pemakaian: mkdir <nama>...\n"); return; }
        for (const p of args) {
            try { await termCreate(p, "folder", ""); }
            catch (e) { if (e.status === 401) throw e; termWrite(termColor("red", "mkdir: " + e.message + "\n")); }
        }
    },
    touch: async (args) => {
        if (!termRequireLogin()) return;
        if (!args.length) { termWrite("pemakaian: touch <nama>...\n"); return; }
        for (const p of args) {
            if (termResolve(p)) continue;
            try { await termCreate(p, "file", ""); }
            catch (e) { if (e.status === 401) throw e; termWrite(termColor("red", "touch: " + e.message + "\n")); }
        }
    },
    cat: async (args) => {
        if (!termRequireLogin()) return;
        if (!args.length) { termWrite("pemakaian: cat <file>...\n"); return; }
        for (const p of args) {
            const node = termResolve(p);
            if (!node) { termWrite(termColor("red", "cat: tidak ada: " + p + "\n")); continue; }
            if (node.type === "folder") { termWrite(termColor("red", "cat: '" + p + "' adalah folder\n")); continue; }
            if (node.type === "upload") {
                termWrite(termColor("red", "cat: '" + p + "' bukan file teks (buka lewat File Manager)\n"));
                continue;
            }
            const data = await termApi("read", { id: node.id });
            const content = data.content || "";
            termWrite(content + (content && !content.endsWith("\n") ? "\n" : ""));
        }
    },
    rm: async (args) => {
        if (!termRequireLogin()) return;
        let recursive = false;
        const targets = [];
        args.forEach((a) => {
            if (a.startsWith("-") && a.length > 1) { if (/[rR]/.test(a)) recursive = true; }
            else targets.push(a);
        });
        if (!targets.length) { termWrite("pemakaian: rm [-r] <nama>...\n"); return; }

        for (const t of targets) {
            const node = termResolve(t);
            if (!node) { termWrite(termColor("red", "rm: tidak ada: " + t + "\n")); continue; }
            if (!node.id) { termWrite(termColor("red", "rm: root tidak bisa dihapus\n")); continue; }
            if (node.type === "folder" && !recursive) {
                termWrite(termColor("red", "rm: '" + t + "' adalah folder (pakai rm -r)\n"));
                continue;
            }
            await termApi("delete", { id: node.id });
            termWrite("dihapus: " + t + "\n");
            await termReload();
        }
    },
    mv: async (args) => {
        if (!termRequireLogin()) return;
        if (args.length !== 2) { termWrite("pemakaian: mv <lama> <baru>  (hanya ganti nama)\n"); return; }
        if (args[1].includes("/")) throw new Error("mv hanya bisa ganti nama, tidak bisa pindah folder");
        const node = termResolve(args[0]);
        if (!node || !node.id) throw new Error("tidak ada: " + args[0]);
        await termApi("update", { id: node.id, name: args[1] });
        await termReload();
    },
    ai: async (args) => {
        const prompt = args.join(" ").trim();
        if (!prompt) { termWrite("pemakaian: ai <pertanyaan>\n"); return; }
        if (!aiPassword) { termWrite(termColor("yellow", "Belum ada password AI. Ketik: ailogin\n")); return; }

        termAiHistory.push({ role: "user", content: prompt });
        termAiHistory = termAiHistory.slice(-10);

        const controller = new AbortController();
        termAbort = controller;
        let text = "";

        try {
            const modelEl = document.getElementById("aiModel");
            const response = await fetch(AI_API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                signal: controller.signal,
                body: JSON.stringify({
                    messages: termAiHistory,
                    model: (modelEl && modelEl.value) || "openai/gpt-4o-mini",
                    stream: true,
                    password: aiPassword
                })
            });

            if (response.status === 401) {
                termAiHistory.pop();
                aiPassword = null;
                localStorage.removeItem("amosAiPassword");
                if (typeof aiShowGateOrChat === "function") aiShowGateOrChat();
                termWrite(termColor("red", "Password AI salah. Ketik: ailogin\n"));
                return;
            }
            if (!response.ok || !response.body) {
                termAiHistory.pop();
                termWrite(termColor("red", "Server AI bermasalah. Coba lagi nanti.\n"));
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = "";

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
                        const delta = json.choices && json.choices[0] && json.choices[0].delta && json.choices[0].delta.content;
                        if (delta) {
                            text += delta;
                            termWrite(delta);
                        }
                    } catch (e) { }
                }
            }

            if (text) {
                termAiHistory.push({ role: "assistant", content: text });
                termWrite("\n");
            } else {
                termAiHistory.pop();
                termWrite("(AI tidak memberi balasan)\n");
            }
        } catch (e) {
            if (e.name === "AbortError") {
                termAiHistory.pop();
                termWrite(termColor("dim", "\n^C dibatalkan\n"));
            } else {
                termAiHistory.pop();
                throw e;
            }
        }
    }
};

async function termExecute(line) {
    const trimmed = line.trim();
    if (!trimmed) return;

    if (termHistory[termHistory.length - 1] !== trimmed) termHistory.push(trimmed);
    if (termHistory.length > 100) termHistory.shift();

    let parsed;
    try {
        parsed = termParse(trimmed);
    } catch (e) {
        termWrite(termColor("red", e.message + "\n"));
        return;
    }
    if (!parsed.args.length) { termWrite(termColor("red", "perintah kosong\n")); return; }

    const name = parsed.args[0].toLowerCase();
    const fn = Object.prototype.hasOwnProperty.call(TERM_COMMANDS, name) ? TERM_COMMANDS[name] : null;
    if (!fn) {
        termWrite(termColor("red", name + ": perintah tidak ditemukan. Ketik 'help'.\n"));
        return;
    }
    if (parsed.redirect && name !== "echo") {
        termWrite(termColor("red", "redirect (>) hanya bisa dipakai dengan echo\n"));
        return;
    }

    try {
        await fn(parsed.args.slice(1), parsed.redirect);
    } catch (e) {
        termFail(e);
    } finally {
        termAbort = null;
    }
}

async function termSubmit() {
    const session = termSession;
    const line = termLine;
    termLine = "";
    termCursor = 0;
    termWrite("\r\n");
    termBusy = true;

    await termExecute(line);

    if (session !== termSession) return;
    termBusy = false;
    termHistIdx = termHistory.length;
    termShowPrompt();
}

function termHistoryNav(dir) {
    if (!termHistory.length) return;
    if (termHistIdx >= termHistory.length) termHistDraft = termLine;

    if (dir < 0) termHistIdx = Math.max(0, termHistIdx - 1);
    else termHistIdx = Math.min(termHistory.length, termHistIdx + 1);

    termSetLine(termHistIdx >= termHistory.length ? termHistDraft : termHistory[termHistIdx]);
}

function termHandleEscape(params, final) {
    if (final === "A") termHistoryNav(-1);
    else if (final === "B") termHistoryNav(1);
    else if (final === "C") { if (termCursor < termLine.length) { termCursor++; termRedraw(); } }
    else if (final === "D") { if (termCursor > 0) { termCursor--; termRedraw(); } }
    else if (final === "H" || (final === "~" && (params === "1" || params === "7"))) { termCursor = 0; termRedraw(); }
    else if (final === "F" || (final === "~" && (params === "4" || params === "8"))) { termCursor = termLine.length; termRedraw(); }
    else if (final === "~" && params === "3") {
        if (termCursor < termLine.length) {
            termLine = termLine.slice(0, termCursor) + termLine.slice(termCursor + 1);
            termRedraw();
        }
    }
}

function termComplete() {
    const before = termLine.slice(0, termCursor);
    const m = before.match(/(?:^|\s)([^\s]*)$/);
    const token = m ? m[1] : "";
    const tokenStart = before.length - token.length;
    const isFirst = before.slice(0, tokenStart).trim() === "";

    let candidates = [];
    const firstWord = before.trim().split(/\s+/)[0];
    if (isFirst) {
        candidates = Object.keys(TERM_COMMANDS).filter((n) => n.startsWith(token.toLowerCase()));
    } else if (firstWord === "open") {
        candidates = termLaunchers().map((x) => x.key).filter((k) => k.startsWith(token.toLowerCase()));
    } else if (termPassword) {
        const slash = token.lastIndexOf("/");
        const dirPart = slash === -1 ? "" : token.slice(0, slash + 1);
        const namePart = token.slice(slash + 1).toLowerCase();
        const dir = termResolve(dirPart || ".");
        if (dir && dir.type === "folder") {
            candidates = termNodes
                .filter((n) => (n.parent || null) === dir.id && n.name.toLowerCase().startsWith(namePart))
                .map((n) => dirPart + n.name.replace(/ /g, "\\ ") + (n.type === "folder" ? "/" : ""));
        }
    }
    if (!candidates.length) return;

    let completion;
    if (candidates.length === 1) {
        completion = candidates[0] + (isFirst ? " " : "");
    } else {
        let prefix = candidates[0];
        candidates.forEach((c) => {
            while (!c.startsWith(prefix)) prefix = prefix.slice(0, -1);
        });
        if (prefix.length > token.length) {
            completion = prefix;
        } else {
            termWrite("\r\n" + candidates.join("  ") + "\r\n");
            termRedraw();
            return;
        }
    }

    termLine = termLine.slice(0, tokenStart) + completion + termLine.slice(termCursor);
    termCursor = tokenStart + completion.length;
    termRedraw();
}

function termHandlePasswordInput(data) {
    let i = 0;
    while (i < data.length) {
        const ch = data[i];

        if (ch === "\x1b") {
            const m = data.slice(i).match(/^\x1b(?:\[[0-9;]*[A-Za-z~]|O[A-Za-z])/);
            i += m ? m[0].length : 1;
            continue;
        }
        if (ch === "\r" || ch === "\n") {
            termWrite("\r\n");
            const pw = termLine;
            termLine = "";
            termCursor = 0;
            termMode = "shell";
            const cb = termPassCb;
            termPassCb = null;
            if (cb) cb(pw);
            return;
        }
        if (ch === "\x03") {
            termWrite("^C\r\n");
            termLine = "";
            termMode = "shell";
            const cb = termPassCb;
            termPassCb = null;
            if (cb) cb("");
            return;
        }
        if (ch === "\x7f" || ch === "\b") termLine = termLine.slice(0, -1);
        else if (ch >= " ") termLine += ch;
        i++;
    }
}

function termHandleInput(data) {
    if (!termInstance) return;
    if (termMode === "password") { termHandlePasswordInput(data); return; }
    if (termBusy) {
        if (data.indexOf("\x03") !== -1 && termAbort) termAbort.abort();
        return;
    }

    let i = 0;
    while (i < data.length) {
        const ch = data[i];

        if (ch === "\x1b") {
            const rest = data.slice(i);
            const m = rest.match(/^\x1b\[([0-9;]*)([A-Za-z~])/ ) || rest.match(/^\x1bO()([A-Za-z])/);
            if (m) { termHandleEscape(m[1], m[2]); i += m[0].length; }
            else i++;
            continue;
        }
        if (ch === "\r" || ch === "\n") { termSubmit(); return; }

        if (ch === "\x7f" || ch === "\b") {
            if (termCursor > 0) {
                termLine = termLine.slice(0, termCursor - 1) + termLine.slice(termCursor);
                termCursor--;
                termRedraw();
            }
        } else if (ch === "\x03") {
            termWrite("^C\r\n");
            termLine = "";
            termCursor = 0;
            termHistIdx = termHistory.length;
            termShowPrompt();
        } else if (ch === "\x0c") {
            termInstance.write("\x1b[2J\x1b[3J\x1b[H");
            termRedraw();
        } else if (ch === "\t") {
            termComplete();
        } else if (ch === "\x01") {
            termCursor = 0;
            termRedraw();
        } else if (ch === "\x05") {
            termCursor = termLine.length;
            termRedraw();
        } else if (ch === "\x15") {
            termLine = termLine.slice(termCursor);
            termCursor = 0;
            termRedraw();
        } else if (ch >= " ") {
            const atEnd = termCursor === termLine.length;
            termLine = termLine.slice(0, termCursor) + ch + termLine.slice(termCursor);
            termCursor++;
            if (atEnd) termInstance.write(ch);
            else termRedraw();
        }
        i++;
    }
}

function termFitNow() {
    try { if (termFitAddon) termFitAddon.fit(); } catch (e) { }
}

function termOpen() {
    const host = document.getElementById("termHost");
    if (!host) return;

    if (termInstance) {
        termFitNow();
        termInstance.focus();
        return;
    }
    if (typeof Terminal === "undefined" || typeof FitAddon === "undefined") {
        host.textContent = "Library terminal (xterm.js) gagal dimuat. Periksa koneksi internet lalu buka ulang.";
        return;
    }

    termSession++;
    termPassword = null;
    termNodes = [];
    termCwd = null;
    termLine = "";
    termCursor = 0;
    termHistIdx = termHistory.length;
    termBusy = false;
    termMode = "shell";
    termPassCb = null;
    termAbort = null;
    termAiHistory = [];

    host.textContent = "";
    termInstance = new Terminal({
        cursorBlink: true,
        fontSize: 14,
        fontFamily: '"Courier New", monospace',
        theme: { background: "#000c08", foreground: "#00ff9f", cursor: "#00ff9f" }
    });
    termFitAddon = new FitAddon.FitAddon();
    termInstance.loadAddon(termFitAddon);
    termInstance.open(host);
    termFitNow();
    termInstance.onData(termHandleInput);

    termWrite(termColor("boldGreen", "AMOS TERMINAL") + "\n");
    termWrite("Ketik 'help' untuk daftar perintah. Untuk file, ketik 'login'.\n");
    termShowPrompt();
    termInstance.focus();
}

function termClose() {
    termSession++;
    if (termAbort) termAbort.abort();
    if (termPassCb) {
        const cb = termPassCb;
        termPassCb = null;
        cb("");
    }
    termPassword = null;
    termNodes = [];
    termCwd = null;
    termLine = "";
    termCursor = 0;
    termBusy = false;
    termMode = "shell";
    termAiHistory = [];

    if (termInstance) {
        termInstance.dispose();
        termInstance = null;
        termFitAddon = null;
    }
    const host = document.getElementById("termHost");
    if (host) host.textContent = "";
}

function termInit() {
    const keys = { tab: "\t", up: "\x1b[A", down: "\x1b[B", left: "\x1b[D", right: "\x1b[C", ctrlc: "\x03", clear: "\x0c" };
    document.querySelectorAll(".term-key").forEach((btn) => {
        btn.addEventListener("click", () => {
            const seq = keys[btn.dataset.seq];
            if (seq) termHandleInput(seq);
            if (termInstance) termInstance.focus();
        });
    });
    window.addEventListener("resize", () => { if (termInstance) termFitNow(); });
}

window.addEventListener("load", termInit);

window.addEventListener("load", () => {
    document.querySelectorAll(".app-window").forEach((w) => {
        w.addEventListener("pointerdown", () => { w.style.zIndex = ++windowTopZ; });
    });
});

window.addEventListener("load", () => {
    document.querySelectorAll("#sidebar .side-item").forEach((item) => {
        item.setAttribute("data-role", "sidebar-item");
    });
});

if (typeof window !== "undefined") {
    window.addEventListener("DOMContentLoaded", () => {
        const theme = localStorage.getItem("amosThemeMode") || "dark";
        document.body.setAttribute("data-theme", theme);
        renderNotes();
        renderNotificationCenter();
    });
}

const _origShowToast = typeof showToast === "function" ? showToast : null;
if (_origShowToast) {
    const _safeToast = (message, type = "info") => {
        const enabled = localStorage.getItem("amosNotificationsEnabled") !== "false";
        if (!enabled) return;
        _origShowToast(message, type);
    };
    window.showToast = _safeToast;
}

window.addNotification = addNotification;
window.toggleNotificationCenter = toggleNotificationCenter;
window.toggleTheme = toggleTheme;
window.saveSettings = saveSettings;
window.addNote = addNote;
window.renderNotes = renderNotes;
window.deleteNote = deleteNote;
window.updateNote = updateNote;

if (typeof window !== "undefined") {
    window.addEventListener("load", () => {
        if (document.getElementById("notificationCenter")) {
            renderNotificationCenter();
        }
    });
}

if (typeof module !== "undefined") module.exports = {}
