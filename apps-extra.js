// =====================================================
// WEATHER (Open-Meteo, tanpa API key)
// =====================================================
async function weatherLoad() {
    const body = document.getElementById("weatherBody");
    const cityInput = document.getElementById("weatherCity");
    if (!body) return;
    const city = (cityInput && cityInput.value.trim()) || "Medan";
    body.innerHTML = '<div class="weather-loading">Memuat cuaca...</div>';
    try {
        const geoRes = await fetch(
            "https://geocoding-api.open-meteo.com/v1/search?name=" +
            encodeURIComponent(city) + "&count=1&language=id&format=json"
        );
        const geo = await geoRes.json();
        if (!geo.results || !geo.results.length) {
            body.innerHTML = '<div class="weather-error">Kota tidak ditemukan</div>';
            return;
        }
        const g = geo.results[0];
        const lat = g.latitude, lon = g.longitude;
        const label = [g.name, g.admin1, g.country].filter(Boolean).join(", ");
        const wRes = await fetch(
            "https://api.open-meteo.com/v1/forecast?latitude=" + lat +
            "&longitude=" + lon +
            "&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m" +
            "&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=3"
        );
        const w = await wRes.json();
        const c = w.current;
        const icon = weatherIcon(c.weather_code);
        let dailyHtml = "";
        if (w.daily && w.daily.time) {
            for (let i = 0; i < w.daily.time.length; i++) {
                const d = w.daily.time[i];
                const day = new Date(d + "T12:00:00").toLocaleDateString("id-ID", { weekday: "short", day: "numeric", month: "short" });
                dailyHtml += '<div class="weather-day">' +
                    '<span>' + day + '</span>' +
                    '<span>' + weatherIcon(w.daily.weather_code[i]) + '</span>' +
                    '<span>' + Math.round(w.daily.temperature_2m_min[i]) + '° / ' + Math.round(w.daily.temperature_2m_max[i]) + '°</span>' +
                    '</div>';
            }
        }
        body.innerHTML =
            '<div class="weather-main">' +
            '<div class="weather-icon-big">' + icon + '</div>' +
            '<div class="weather-temp">' + Math.round(c.temperature_2m) + '°</div>' +
            '<div class="weather-desc">' + weatherDesc(c.weather_code) + '</div>' +
            '<div class="weather-loc">' + label + '</div>' +
            '</div>' +
            '<div class="weather-meta">' +
            '<span>💧 ' + c.relative_humidity_2m + '%</span>' +
            '<span>💨 ' + Math.round(c.wind_speed_10m) + ' km/h</span>' +
            '</div>' +
            '<div class="weather-daily">' + dailyHtml + '</div>';
    } catch (e) {
        body.innerHTML = '<div class="weather-error">Gagal memuat cuaca</div>';
    }
}

function weatherIcon(code) {
    if (code === 0) return "☀️";
    if (code <= 3) return "⛅";
    if (code <= 48) return "🌫️";
    if (code <= 67) return "🌧️";
    if (code <= 77) return "🌨️";
    if (code <= 82) return "🌦️";
    if (code <= 86) return "❄️";
    if (code >= 95) return "⛈️";
    return "🌡️";
}

function weatherDesc(code) {
    const map = {
        0: "Cerah", 1: "Sebagian cerah", 2: "Berawan sebagian", 3: "Berawan",
        45: "Berkabut", 48: "Kabut beku",
        51: "Gerimis ringan", 53: "Gerimis", 55: "Gerimis lebat",
        61: "Hujan ringan", 63: "Hujan", 65: "Hujan lebat",
        71: "Salju ringan", 73: "Salju", 75: "Salju lebat",
        80: "Hujan lokal", 81: "Hujan lokal sedang", 82: "Hujan lokal lebat",
        95: "Badai", 96: "Badai + hujan es", 99: "Badai lebat"
    };
    return map[code] || "Cuaca kode " + code;
}

// =====================================================
// GITHUB PROJECTS
// =====================================================
async function githubLoad() {
    const stats = document.getElementById("githubStats");
    const list = document.getElementById("githubList");
    if (!stats || !list) return;
    stats.textContent = "Memuat...";
    list.innerHTML = "";
    try {
        const [uRes, rRes] = await Promise.all([
            fetch("https://api.github.com/users/amosmarbun86-droid"),
            fetch("https://api.github.com/users/amosmarbun86-droid/repos?sort=updated&per_page=12")
        ]);
        if (!uRes.ok || !rRes.ok) throw new Error("API error");
        const user = await uRes.json();
        const repos = await rRes.json();
        stats.innerHTML =
            '<div class="gh-stat"><b>' + user.public_repos + '</b><span>Repos</span></div>' +
            '<div class="gh-stat"><b>' + user.followers + '</b><span>Followers</span></div>' +
            '<div class="gh-stat"><b>' + user.following + '</b><span>Following</span></div>';
        list.innerHTML = repos.map(function (r) {
            const lang = r.language ? '<span class="gh-lang">' + r.language + '</span>' : '';
            const stars = r.stargazers_count ? ' ★' + r.stargazers_count : '';
            return '<a class="gh-item" href="' + r.html_url + '" target="_blank" rel="noopener">' +
                '<div class="gh-name">' + r.name + stars + '</div>' +
                '<div class="gh-meta">' + lang + '</div>' +
                '</a>';
        }).join("");
    } catch (e) {
        stats.innerHTML = '<div class="weather-error">Gagal memuat GitHub</div>';
    }
}

// =====================================================
// GAMES
// =====================================================
let gameTimer = null;
let gameState = null;

function gameBack() {
    if (gameTimer) { clearInterval(gameTimer); gameTimer = null; }
    if (gameState && gameState.cleanup) try { gameState.cleanup(); } catch(e) {}
    gameState = null;
    const menu = document.getElementById("gamesMenu");
    const play = document.getElementById("gamesPlay");
    const area = document.getElementById("gameArea");
    if (menu) menu.style.display = "grid";
    if (play) play.style.display = "none";
    if (area) area.innerHTML = "";
}

function gameStart(name) {
    gameBack();
    const menu = document.getElementById("gamesMenu");
    const play = document.getElementById("gamesPlay");
    if (menu) menu.style.display = "none";
    if (play) play.style.display = "flex";
    if (name === "snake") gameSnake();
    else if (name === "tictactoe") gameTicTacToe();
    else if (name === "airplane") gameAirplane();
}

function gameSetScore(n) {
    const el = document.getElementById("gameScore");
    if (el) el.textContent = "Score: " + n;
}

function gameSnake() {
    const area = document.getElementById("gameArea");
    if (!area) return;
    const size = 16, cells = 12;
    area.innerHTML = '<canvas id="snakeCanvas" width="' + (size * cells) + '" height="' + (size * cells) + '"></canvas>' +
        '<div class="game-hint">Geser / panah untuk gerak</div>';
    const canvas = document.getElementById("snakeCanvas");
    const ctx = canvas.getContext("2d");
    let snake = [{ x: 5, y: 5 }, { x: 4, y: 5 }];
    let dir = { x: 1, y: 0 };
    let nextDir = { x: 1, y: 0 };
    let food = { x: 8, y: 8 };
    let score = 0;
    let alive = true;
    gameSetScore(0);

    function placeFood() {
        do {
            food = { x: Math.floor(Math.random() * cells), y: Math.floor(Math.random() * cells) };
        } while (snake.some(s => s.x === food.x && s.y === food.y));
    }

    function draw() {
        ctx.fillStyle = "#0a0f0e";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = "#00ff9f";
        snake.forEach((s, i) => {
            ctx.globalAlpha = i === 0 ? 1 : 0.7;
            ctx.fillRect(s.x * size + 1, s.y * size + 1, size - 2, size - 2);
        });
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#ff4d6d";
        ctx.fillRect(food.x * size + 1, food.y * size + 1, size - 2, size - 2);
        if (!alive) {
            ctx.fillStyle = "rgba(0,0,0,0.6)";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#fff";
            ctx.font = "14px monospace";
            ctx.textAlign = "center";
            ctx.fillText("Game Over", canvas.width / 2, canvas.height / 2);
        }
    }

    function tick() {
        if (!alive) return;
        dir = nextDir;
        const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };
        if (head.x < 0 || head.y < 0 || head.x >= cells || head.y >= cells ||
            snake.some(s => s.x === head.x && s.y === head.y)) {
            alive = false;
            draw();
            return;
        }
        snake.unshift(head);
        if (head.x === food.x && head.y === food.y) {
            score++;
            gameSetScore(score);
            placeFood();
        } else {
            snake.pop();
        }
        draw();
    }

    function setDir(x, y) {
        if (dir.x + x === 0 && dir.y + y === 0) return;
        nextDir = { x, y };
    }

    const onKey = (e) => {
        if (e.key === "ArrowUp") setDir(0, -1);
        if (e.key === "ArrowDown") setDir(0, 1);
        if (e.key === "ArrowLeft") setDir(-1, 0);
        if (e.key === "ArrowRight") setDir(1, 0);
    };
    window.addEventListener("keydown", onKey);

    let touchStart = null;
    canvas.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        touchStart = { x: t.clientX, y: t.clientY };
        e.preventDefault();
    }, { passive: false });
    canvas.addEventListener("touchend", (e) => {
        if (!touchStart) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - touchStart.x, dy = t.clientY - touchStart.y;
        if (Math.abs(dx) > Math.abs(dy)) setDir(dx > 0 ? 1 : -1, 0);
        else setDir(0, dy > 0 ? 1 : -1);
        touchStart = null;
    });

    draw();
    gameTimer = setInterval(tick, 160);
    gameState = { cleanup: () => window.removeEventListener("keydown", onKey) };
}

function gameTicTacToe() {
    const area = document.getElementById("gameArea");
    if (!area) return;
    let board = Array(9).fill("");
    let turn = "X";
    let done = false;
    gameSetScore(0);
    area.innerHTML = '<div class="ttt-board" id="tttBoard"></div><div id="tttStatus" class="game-hint">Giliran: X</div>';
    const boardEl = document.getElementById("tttBoard");
    const status = document.getElementById("tttStatus");

    function check() {
        const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]];
        for (const [a,b,c] of lines) {
            if (board[a] && board[a] === board[b] && board[a] === board[c]) return board[a];
        }
        if (board.every(Boolean)) return "draw";
        return null;
    }

    function render() {
        boardEl.innerHTML = board.map((v, i) =>
            '<button class="ttt-cell" data-i="' + i + '">' + v + '</button>'
        ).join("");
        boardEl.querySelectorAll(".ttt-cell").forEach(btn => {
            btn.onclick = () => {
                const i = +btn.dataset.i;
                if (done || board[i]) return;
                board[i] = turn;
                const res = check();
                if (res === "X" || res === "O") {
                    done = true;
                    status.textContent = res + " menang!";
                    gameSetScore(res === "X" ? 1 : 0);
                } else if (res === "draw") {
                    done = true;
                    status.textContent = "Seri!";
                } else {
                    turn = turn === "X" ? "O" : "X";
                    status.textContent = "Giliran: " + turn;
                }
                render();
            };
        });
    }
    render();
}

function gameAirplane() {
    const area = document.getElementById("gameArea");
    if (!area) return;
    area.innerHTML =
        '<div class="game-hint">Buka game Airplane di tab baru</div>' +
        '<button class="files-btn" style="margin:12px auto;display:block;" onclick="openExternal(\'https://amosmarbun86-droid.github.io/Air-plane-game-/\')">Mainkan Airplane ↗</button>';
    gameSetScore(0);
}



(function(){
  const _open = window.openWindow;
  if (typeof _open === "function") {
    window.openWindow = function(id) {
      _open(id);
      if (id === "weatherWindow" && typeof weatherLoad === "function") weatherLoad();
      if (id === "githubWindow" && typeof githubLoad === "function") githubLoad();
      if (id === "gamesWindow" && typeof gameBack === "function") gameBack();
    };
  }
})();
