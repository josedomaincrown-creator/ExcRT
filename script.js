// TodayExchangeRate.com — frontend logic
// Live rates are fetched from /.netlify/functions/rates, which holds the
// API key server-side. The key never appears in this file or in the browser.

const CURRENCIES = [
  { code: "USD", name: "US Dollar", flag: "🇺🇸" },
  { code: "EUR", name: "Euro", flag: "🇪🇺" },
  { code: "GBP", name: "British Pound", flag: "🇬🇧" },
  { code: "JPY", name: "Japanese Yen", flag: "🇯🇵" },
  { code: "CAD", name: "Canadian Dollar", flag: "🇨🇦" },
  { code: "AUD", name: "Australian Dollar", flag: "🇦🇺" },
  { code: "CHF", name: "Swiss Franc", flag: "🇨🇭" },
  { code: "CNY", name: "Chinese Yuan", flag: "🇨🇳" },
  { code: "INR", name: "Indian Rupee", flag: "🇮🇳" },
  { code: "AED", name: "UAE Dirham", flag: "🇦🇪" },
  { code: "SGD", name: "Singapore Dollar", flag: "🇸🇬" },
  { code: "ZAR", name: "South African Rand", flag: "🇿🇦" },
  { code: "NGN", name: "Nigerian Naira", flag: "🇳🇬" },
  { code: "GHS", name: "Ghanaian Cedi", flag: "🇬🇭" },
  { code: "KES", name: "Kenyan Shilling", flag: "🇰🇪" },
  { code: "MXN", name: "Mexican Peso", flag: "🇲🇽" },
  { code: "PHP", name: "Philippine Peso", flag: "🇵🇭" },
  { code: "BRL", name: "Brazilian Real", flag: "🇧🇷" },
  { code: "SEK", name: "Swedish Krona", flag: "🇸🇪" },
  { code: "NZD", name: "New Zealand Dollar", flag: "🇳🇿" },
];

const BOARD_PAIRS = [
  { base: "USD", quote: "EUR", label: "USD → EUR" },
  { base: "USD", quote: "GBP", label: "USD → GBP" },
  { base: "USD", quote: "JPY", label: "USD → JPY" },
  { base: "USD", quote: "NGN", label: "USD → NGN" },
  { base: "USD", quote: "INR", label: "USD → INR" },
  { base: "USD", quote: "CAD", label: "USD → CAD" },
];

const CORRIDORS = {
  "US-NG": { from: "USD", to: "NGN", label: "US → Nigeria" },
  "UK-NG": { from: "GBP", to: "NGN", label: "UK → Nigeria" },
  "US-IN": { from: "USD", to: "INR", label: "US → India" },
  "US-PH": { from: "USD", to: "PHP", label: "US → Philippines" },
  "US-MX": { from: "USD", to: "MXN", label: "US → Mexico" },
  "EU-GH": { from: "EUR", to: "GHS", label: "EU → Ghana" },
};

const PROVIDERS = [
  { name: "Wise", speed: "Minutes–1 day", fee: "Low, transparent", markup: "Mid-market rate", link: "#", affiliate: true },
  { name: "Western Union", speed: "Minutes (cash pickup)", fee: "Varies by method", markup: "Marked up", link: "#", affiliate: true },
  { name: "Remitly", speed: "Minutes–3 days", fee: "Low on express", markup: "Marked up", link: "#", affiliate: true },
  { name: "MoneyGram", speed: "Minutes (cash pickup)", fee: "Varies", markup: "Marked up", link: "#", affiliate: true },
];

let ratesCache = {};
let chartInstance = null;
let watchlist = JSON.parse(localStorage.getItem("terWatchlist") || "[]");
let currentRangeDays = 7;
let lastSeries = [];

async function fetchRates(base = "USD") {
  if (ratesCache[base]) return ratesCache[base];
  try {
    const res = await fetch(`/.netlify/functions/rates?base=${base}`);
    if (!res.ok) throw new Error("Rate service unavailable");
    const data = await res.json();
    ratesCache[base] = data[base];
    return data[base];
  } catch (err) {
    console.error(err);
    return null;
  }
}

function populateSelects() {
  const from = document.getElementById("from");
  const to = document.getElementById("to");
  const tableBase = document.getElementById("table-base");
  [from, to, tableBase].forEach(sel => {
    sel.innerHTML = CURRENCIES.map(c => `<option value="${c.code}">${c.flag} ${c.code} — ${c.name}</option>`).join("");
  });
  from.value = "USD";
  to.value = "NGN";
  tableBase.value = "USD";
}

function renderBoard(rates) {
  const board = document.getElementById("rate-board");
  board.innerHTML = "";
  BOARD_PAIRS.forEach(pair => {
    const rate = rates?.[pair.quote];
    const row = document.createElement("div");
    row.className = "board-row";
    row.innerHTML = `
      <span class="pair-label">${pair.label}</span>
      <span class="pair-rate">${rate ? rate.toFixed(rate < 10 ? 4 : 2) : "—"}</span>
      <span class="pair-change">live</span>
    `;
    board.appendChild(row);
  });
}

function renderProviders(corridorKey = "US-NG") {
  const c = CORRIDORS[corridorKey];
  document.querySelector(".send h2").textContent = `Compare providers: ${c.label}`;
  const tbody = document.getElementById("provider-rows");
  tbody.innerHTML = "";
  PROVIDERS.forEach(p => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="provider-name">${p.name}</td>
      <td>${p.speed}</td>
      <td class="mono">${p.fee}</td>
      <td class="mono">${p.markup}</td>
      <td><a class="cta-btn" href="${p.link}" rel="${p.affiliate ? "sponsored nofollow" : "noopener"}">Compare</a></td>
    `;
    tbody.appendChild(tr);
  });
}

async function updateConverter() {
  const rawAmount = document.getElementById("amount").value.replace(/,/g, "");
  const amount = parseFloat(rawAmount) || 0;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const resultEl = document.getElementById("result");

  const rates = await fetchRates(from);
  const rate = rates?.[to];
  if (rate) {
    resultEl.textContent = `${amount.toLocaleString()} ${from} = ${(amount * rate).toLocaleString(undefined, { maximumFractionDigits: 2 })} ${to}`;
  } else {
    resultEl.textContent = "Rate unavailable right now — try again shortly.";
  }
  updateWatchlistButton();
  renderChart(from, to, currentRangeDays);
}

async function renderFullTable() {
  const base = document.getElementById("table-base").value;
  const rates = await fetchRates(base);
  const tbody = document.getElementById("full-rate-rows");
  tbody.innerHTML = "";
  CURRENCIES.filter(c => c.code !== base).forEach(c => {
    const rate = rates?.[c.code];
    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${c.flag} ${c.name}</td>
      <td class="mono">${c.code}</td>
      <td class="mono">${rate ? rate.toFixed(rate < 10 ? 4 : 2) : "—"}</td>
      <td><button class="link-btn watch-star" data-pair="${base}-${c.code}">${watchlist.includes(base + "-" + c.code) ? "★" : "☆"}</button></td>
    `;
    tbody.appendChild(tr);
  });
}

// --- Historical chart ---
// NOTE: exchangerate-api.com's free/standard tier has no historical time-series
// endpoint. This generates a realistic-looking demo series anchored to today's
// real live rate so the chart works today. Swap generateDemoSeries() for a real
// historical endpoint (OANDA, Fixer, or an upgraded plan) when ready — nothing
// else in the render pipeline needs to change.
function generateDemoSeries(currentRate, days) {
  const points = [];
  let value = currentRate;
  for (let i = days; i >= 0; i--) {
    const drift = (Math.random() - 0.5) * currentRate * 0.006;
    value = i === 0 ? currentRate : value + drift;
    const date = new Date();
    date.setDate(date.getDate() - i);
    points.push({ date: date.toISOString().slice(0, 10), value: Math.round(value * 10000) / 10000 });
  }
  return points;
}

async function renderChart(from, to, days) {
  const rates = await fetchRates(from);
  const rate = rates?.[to];
  if (!rate) return;

  const series = generateDemoSeries(rate, days);
  lastSeries = series;

  const ctx = document.getElementById("rate-chart");
  const styles = getComputedStyle(document.documentElement);
  const accent = styles.getPropertyValue("--accent-green-bright").trim();
  const grid = styles.getPropertyValue("--border").trim();
  const text = styles.getPropertyValue("--text-muted").trim();

  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(ctx, {
    type: "line",
    data: {
      labels: series.map(p => p.date),
      datasets: [{
        label: `${from} → ${to}`,
        data: series.map(p => p.value),
        borderColor: accent,
        backgroundColor: accent + "22",
        fill: true,
        tension: 0.3,
        pointRadius: 0,
        borderWidth: 2,
      }],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: {
        x: { grid: { color: grid }, ticks: { color: text, maxTicksLimit: 6 } },
        y: { grid: { color: grid }, ticks: { color: text } },
      },
    },
  });
}

function exportCSV() {
  if (!lastSeries.length) return;
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const rows = ["date,rate", ...lastSeries.map(p => `${p.date},${p.value}`)];
  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${from}_${to}_rate_history.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Watchlist (stored locally in the visitor's browser) ---
function updateWatchlistButton() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const key = `${from}-${to}`;
  const btn = document.getElementById("watchlist-toggle");
  btn.textContent = watchlist.includes(key) ? "★ In your watchlist" : "☆ Add to watchlist";
}

function toggleWatchlist() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const key = `${from}-${to}`;
  watchlist = watchlist.includes(key) ? watchlist.filter(k => k !== key) : [...watchlist, key];
  localStorage.setItem("terWatchlist", JSON.stringify(watchlist));
  updateWatchlistButton();
  renderWatchlistSection();
}

async function renderWatchlistSection() {
  const section = document.getElementById("watchlist");
  const board = document.getElementById("watchlist-board");
  if (!watchlist.length) { section.hidden = true; return; }
  section.hidden = false;
  board.innerHTML = "";
  for (const key of watchlist) {
    const [base, quote] = key.split("-");
    const rates = await fetchRates(base);
    const rate = rates?.[quote];
    const row = document.createElement("div");
    row.className = "board-row";
    row.innerHTML = `
      <span class="pair-label">${base} → ${quote}</span>
      <span class="pair-rate">${rate ? rate.toFixed(rate < 10 ? 4 : 2) : "—"}</span>
      <button class="link-btn" data-remove="${key}">Remove</button>
    `;
    board.appendChild(row);
  }
}

async function init() {
  populateSelects();

  const homeRates = await fetchRates("USD");
  renderBoard(homeRates);
  renderProviders("US-NG");
  await updateConverter();
  await renderFullTable();
  await renderWatchlistSection();

  document.getElementById("last-updated").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  document.getElementById("amount").addEventListener("input", updateConverter);
  document.getElementById("from").addEventListener("change", updateConverter);
  document.getElementById("to").addEventListener("change", updateConverter);
  document.getElementById("table-base").addEventListener("change", renderFullTable);
  document.getElementById("watchlist-toggle").addEventListener("click", toggleWatchlist);
  document.getElementById("export-csv").addEventListener("click", exportCSV);

  document.getElementById("swap-note").addEventListener("click", () => {
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    [from.value, to.value] = [to.value, from.value];
    updateConverter();
  });

  document.getElementById("range-toggle").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#range-toggle button").forEach(b => b.classList.remove("active"));
    e.target.classList.add("active");
    currentRangeDays = parseInt(e.target.dataset.range, 10);
    renderChart(document.getElementById("from").value, document.getElementById("to").value, currentRangeDays);
  });

  document.getElementById("corridor-pills").addEventListener("click", (e) => {
    if (!e.target.classList.contains("pill")) return;
    document.querySelectorAll(".pill").forEach(p => p.classList.remove("active"));
    e.target.classList.add("active");
    renderProviders(e.target.dataset.corridor);
  });

  document.getElementById("full-rate-rows").addEventListener("click", (e) => {
    if (!e.target.classList.contains("watch-star")) return;
    const pair = e.target.dataset.pair;
    watchlist = watchlist.includes(pair) ? watchlist.filter(k => k !== pair) : [...watchlist, pair];
    localStorage.setItem("terWatchlist", JSON.stringify(watchlist));
    renderFullTable();
    renderWatchlistSection();
  });

  document.getElementById("watchlist-board").addEventListener("click", (e) => {
    const key = e.target.dataset.remove;
    if (!key) return;
    watchlist = watchlist.filter(k => k !== key);
    localStorage.setItem("terWatchlist", JSON.stringify(watchlist));
    renderWatchlistSection();
    renderFullTable();
  });

  document.getElementById("alert-form").addEventListener("submit", (e) => {
    e.preventDefault();
    alert("Thanks — alert signups will connect to your email tool once that's wired up (Mailchimp/Brevo).");
    e.target.reset();
  });

  // Refresh live board every 15 minutes
  setInterval(async () => {
    ratesCache = {};
    const fresh = await fetchRates("USD");
    renderBoard(fresh);
    document.getElementById("last-updated").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, 15 * 60 * 1000);
}

init();
