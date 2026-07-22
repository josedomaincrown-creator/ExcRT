const CURRENCIES = [
  { code: "USD", name: "US Dollar", country: "US" },
  { code: "EUR", name: "Euro", country: "EU" },
  { code: "GBP", name: "British Pound", country: "GB" },
  { code: "JPY", name: "Japanese Yen", country: "JP" },
  { code: "CAD", name: "Canadian Dollar", country: "CA" },
  { code: "AUD", name: "Australian Dollar", country: "AU" },
  { code: "CHF", name: "Swiss Franc", country: "CH" },
  { code: "CNY", name: "Chinese Yuan", country: "CN" },
  { code: "INR", name: "Indian Rupee", country: "IN" },
  { code: "AED", name: "UAE Dirham", country: "AE" },
  { code: "SGD", name: "Singapore Dollar", country: "SG" },
  { code: "ZAR", name: "South African Rand", country: "ZA" },
  { code: "NGN", name: "Nigerian Naira", country: "NG" },
  { code: "GHS", name: "Ghanaian Cedi", country: "GH" },
  { code: "KES", name: "Kenyan Shilling", country: "KE" },
  { code: "MXN", name: "Mexican Peso", country: "MX" },
  { code: "PHP", name: "Philippine Peso", country: "PH" },
  { code: "BRL", name: "Brazilian Real", country: "BR" },
  { code: "SEK", name: "Swedish Krona", country: "SE" },
  { code: "NZD", name: "New Zealand Dollar", country: "NZ" },
  { code: "NOK", name: "Norwegian Krone", country: "NO" },
  { code: "DKK", name: "Danish Krone", country: "DK" },
  { code: "PLN", name: "Polish Złoty", country: "PL" },
  { code: "TRY", name: "Turkish Lira", country: "TR" },
];

const FALLBACK_USD_RATES = {
  USD: 1,
  EUR: 0.8627,
  GBP: 0.7484,
  JPY: 148.62,
  CAD: 1.3718,
  AUD: 1.5276,
  CHF: 0.7964,
  CNY: 7.1742,
  INR: 85.947,
  AED: 3.6725,
  SGD: 1.2846,
  ZAR: 17.592,
  NGN: 1510.5042,
  GHS: 10.482,
  KES: 129.34,
  MXN: 18.726,
  PHP: 57.214,
  BRL: 5.561,
  SEK: 9.574,
  NZD: 1.662,
  NOK: 10.148,
  DKK: 6.438,
  PLN: 3.676,
  TRY: 40.284,
};

const TICKER_PAIRS = [
  ["USD", "EUR"],
  ["USD", "GBP"],
  ["USD", "NGN"],
  ["GBP", "NGN"],
  ["USD", "INR"],
];

const CORRIDORS = {
  "US-NG": { from: "USD", to: "NGN", label: "US → Nigeria" },
  "UK-NG": { from: "GBP", to: "NGN", label: "UK → Nigeria" },
  "US-IN": { from: "USD", to: "INR", label: "US → India" },
  "EU-GH": { from: "EUR", to: "GHS", label: "EU → Ghana" },
};

const PROVIDERS = [
  { name: "Wise", initials: "W", className: "wise", speed: "Seconds–1 day", fee: 7.42, margin: 0.004, featured: true, url: "https://wise.com" },
  { name: "Remitly", initials: "R", className: "remitly", speed: "Minutes–3 days", fee: 3.99, margin: 0.012, url: "https://www.remitly.com" },
  { name: "Western Union", initials: "WU", className: "wu", speed: "Minutes–4 days", fee: 5.0, margin: 0.018, url: "https://www.westernunion.com" },
  { name: "MoneyGram", initials: "M", className: "mg", speed: "Minutes–2 days", fee: 4.99, margin: 0.022, url: "https://www.moneygram.com" },
];

const FLAG_MARKUP = {
  US: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#fff"/><path d="M0 4h32v4H0zm0 8h32v4H0zm0 8h32v4H0zm0 8h32v4H0z" fill="#d84a4a"/><rect width="15" height="17" fill="#3158a3"/><g fill="#fff"><circle cx="4" cy="4" r="1"/><circle cx="9" cy="4" r="1"/><circle cx="4" cy="9" r="1"/><circle cx="9" cy="9" r="1"/><circle cx="4" cy="14" r="1"/><circle cx="9" cy="14" r="1"/></g></svg>',
  EU: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#2855a6"/><g fill="#ffd83d"><circle cx="16" cy="6" r="1.2"/><circle cx="21" cy="8" r="1.2"/><circle cx="24" cy="13" r="1.2"/><circle cx="24" cy="19" r="1.2"/><circle cx="21" cy="24" r="1.2"/><circle cx="16" cy="26" r="1.2"/><circle cx="11" cy="24" r="1.2"/><circle cx="8" cy="19" r="1.2"/><circle cx="8" cy="13" r="1.2"/><circle cx="11" cy="8" r="1.2"/></g></svg>',
  GB: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#24468d"/><path d="m0 0 32 32M32 0 0 32" stroke="#fff" stroke-width="7"/><path d="m0 0 32 32M32 0 0 32" stroke="#d83f50" stroke-width="3"/><path d="M16 0v32M0 16h32" stroke="#fff" stroke-width="10"/><path d="M16 0v32M0 16h32" stroke="#d83f50" stroke-width="5"/></svg>',
  JP: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#fff"/><circle cx="16" cy="16" r="7" fill="#d9384e"/></svg>',
  CA: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#fff"/><rect width="7" height="32" fill="#df3d46"/><rect x="25" width="7" height="32" fill="#df3d46"/><path d="m16 7 1.7 5 4-2-2 4 3 2-4.5 1 1.3 5-3.5-3-3.5 3 1.3-5-4.5-1 3-2-2-4 4 2L16 7Z" fill="#df3d46"/></svg>',
  AU: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#24468d"/><path d="M0 0 15 15M15 0 0 15" stroke="#fff" stroke-width="4"/><path d="M7.5 0v15M0 7.5h15" stroke="#fff" stroke-width="5"/><path d="M7.5 0v15M0 7.5h15" stroke="#d83f50" stroke-width="2.5"/><g fill="#fff"><circle cx="23" cy="9" r="1.5"/><circle cx="26" cy="17" r="1.5"/><circle cx="20" cy="21" r="1.5"/><circle cx="25" cy="26" r="1.5"/></g></svg>',
  CH: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#d83f50"/><path d="M13 7h6v6h6v6h-6v6h-6v-6H7v-6h6V7Z" fill="#fff"/></svg>',
  CN: '<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="#df3d46"/><path d="m8 5 1.2 3.5H13l-3 2.2 1.2 3.5L8 12l-3.2 2.2L6 10.7 3 8.5h3.8L8 5Z" fill="#ffd83d"/><g fill="#ffd83d"><circle cx="16" cy="7" r="1"/><circle cx="20" cy="11" r="1"/><circle cx="20" cy="17" r="1"/><circle cx="16" cy="20" r="1"/></g></svg>',
  IN: '<svg viewBox="0 0 32 32"><rect width="32" height="11" fill="#ef8b3b"/><rect y="11" width="32" height="10" fill="#fff"/><rect y="21" width="32" height="11" fill="#2b9a57"/><circle cx="16" cy="16" r="4" fill="none" stroke="#294a96" stroke-width="1.5"/><circle cx="16" cy="16" r="1" fill="#294a96"/></svg>',
  NG: '<svg viewBox="0 0 32 32"><rect width="11" height="32" fill="#22985a"/><rect x="11" width="10" height="32" fill="#fff"/><rect x="21" width="11" height="32" fill="#22985a"/></svg>',
  GH: '<svg viewBox="0 0 32 32"><rect width="32" height="11" fill="#d94747"/><rect y="11" width="32" height="10" fill="#f1c641"/><rect y="21" width="32" height="11" fill="#268454"/><path d="m16 11.5 1.4 3.2 3.5.3-2.7 2.3.8 3.4-3-1.8-3 1.8.8-3.4-2.7-2.3 3.5-.3 1.4-3.2Z" fill="#15202c"/></svg>',
};

let ratesCache = new Map();
let currentRates = {};
let chartInstance = null;
let currentChartDays = 7;
let currentChartSeries = [];
let currentCorridor = "US-NG";
let usingFallback = false;
let toastTimer;

function currencyByCode(code) {
  return CURRENCIES.find((currency) => currency.code === code) || CURRENCIES[0];
}

function genericFlag(country) {
  const palettes = {
    AE: ["#d64242", "#26925b", "#fff", "#172b22"], SG: ["#db3e48", "#fff", "#db3e48"],
    ZA: ["#218a58", "#f1c33b", "#d64149", "#24468d"], KE: ["#17201f", "#d84048", "#288653", "#fff"],
    MX: ["#298a56", "#fff", "#d63f49"], PH: ["#2754a2", "#d7434c", "#fff", "#f1c63a"],
    BR: ["#2a9657", "#f2cf43", "#2853a0"], SE: ["#2860a8", "#f1c63a"], NZ: ["#24468d", "#d9414b", "#fff"],
    NO: ["#d9404a", "#fff", "#28509a"], DK: ["#d9404a", "#fff"], PL: ["#fff", "#d94350"], TR: ["#d83d48", "#fff"],
  };
  const colors = palettes[country] || ["#e9edf2", "#64748b", "#ffffff"];
  return `<svg viewBox="0 0 32 32"><rect width="32" height="32" fill="${colors[0]}"/><rect y="16" width="32" height="16" fill="${colors[1]}"/><path d="M0 0 32 32M32 0 0 32" stroke="${colors[2] || colors[1]}" stroke-width="${colors[3] ? 5 : 0}" opacity="${colors[3] ? .9 : 0}"/><circle cx="16" cy="16" r="${colors[3] ? 5 : 0}" fill="${colors[3] || "none"}"/></svg>`;
}

function flagSvg(code) {
  const country = currencyByCode(code).country;
  return FLAG_MARKUP[country] || genericFlag(country);
}

function setFlag(elementId, code) {
  const element = document.getElementById(elementId);
  if (element) element.innerHTML = flagSvg(code);
}

function formatRate(value, code = "") {
  if (!Number.isFinite(value)) return "—";
  const maximumFractionDigits = value >= 100 ? 2 : value >= 10 ? 3 : value >= 1 ? 4 : 6;
  return new Intl.NumberFormat("en-US", { maximumFractionDigits }).format(value) + (code ? ` ${code}` : "");
}

function formatMoney(value, code) {
  if (!Number.isFinite(value)) return "—";
  const digits = value >= 1000 ? 2 : 2;
  return `${new Intl.NumberFormat("en-US", { minimumFractionDigits: digits, maximumFractionDigits: digits }).format(value)} ${code}`;
}

function parseAmount(value) {
  const parsed = Number(String(value).replace(/[^0-9.]/g, ""));
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 0;
}

function rateFromFallback(base) {
  const baseRate = FALLBACK_USD_RATES[base];
  if (!baseRate) return { ...FALLBACK_USD_RATES };
  return Object.fromEntries(Object.entries(FALLBACK_USD_RATES).map(([code, rate]) => [code, rate / baseRate]));
}

async function fetchRates(base = "USD") {
  if (ratesCache.has(base)) return ratesCache.get(base);
  try {
    const response = await fetch(`/.netlify/functions/rates?base=${encodeURIComponent(base)}`, { headers: { Accept: "application/json" } });
    if (!response.ok) throw new Error("Rate service unavailable");
    const payload = await response.json();
    if (!payload.rates) throw new Error("No rates returned");
    const result = { rates: payload.rates, updatedAt: payload.updatedAt, fallback: false };
    ratesCache.set(base, result);
    return result;
  } catch (error) {
    console.warn("Using the indicative market snapshot because live rates are unavailable.", error);
    const result = { rates: rateFromFallback(base), updatedAt: null, fallback: true };
    ratesCache.set(base, result);
    return result;
  }
}

function populateSelect(select, compact = false) {
  select.innerHTML = CURRENCIES.map((currency) => `<option value="${currency.code}">${compact ? currency.code : `${currency.code} — ${currency.name}`}</option>`).join("");
}

function setupSelects() {
  ["from", "to", "table-base", "alert-from", "alert-to"].forEach((id) => populateSelect(document.getElementById(id), true));
  document.getElementById("from").value = "USD";
  document.getElementById("to").value = "NGN";
  document.getElementById("table-base").value = "USD";
  document.getElementById("alert-from").value = "USD";
  document.getElementById("alert-to").value = "NGN";
  updateAllFlags();
}

function updateAllFlags() {
  setFlag("from-flag", document.getElementById("from").value);
  setFlag("to-flag", document.getElementById("to").value);
  setFlag("base-flag", document.getElementById("table-base").value);
  setFlag("alert-from-flag", document.getElementById("alert-from").value);
  setFlag("alert-to-flag", document.getElementById("alert-to").value);
}

function updateMarketStatus(payload) {
  usingFallback = payload.fallback;
  const converterStatus = document.getElementById("converter-status");
  const updated = document.getElementById("last-updated");
  converterStatus.classList.toggle("fallback", usingFallback);
  converterStatus.innerHTML = usingFallback ? "<i></i> Indicative snapshot" : "<i></i> Live mid-market";
  if (usingFallback) {
    updated.textContent = "Indicative market snapshot";
  } else {
    const date = new Date(payload.updatedAt);
    const label = Number.isNaN(date.getTime()) ? "updated recently" : `Updated ${date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`;
    updated.textContent = label;
  }
}

async function updateConverter({ redrawChart = true } = {}) {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const amount = parseAmount(document.getElementById("amount").value);
  const payload = await fetchRates(from);
  const rate = payload.rates[to];
  currentRates = payload.rates;
  updateMarketStatus(payload);
  updateAllFlags();
  document.getElementById("rate-line").textContent = `1 ${from} = ${formatRate(rate)} ${to}`;
  document.getElementById("fee-line").textContent = `0.00 ${from}`;
  document.getElementById("converted-amount").textContent = formatRate(amount * rate);
  document.getElementById("landed-amount").textContent = formatMoney(amount * rate, to);
  document.getElementById("chart-pair-title").textContent = `${from} to ${to}`;
  document.getElementById("chart-pair-code").textContent = `${from} / ${to} · indicative modeled history`;
  document.getElementById("chart-current-rate").textContent = formatRate(rate);
  document.getElementById("alert-from").value = from;
  document.getElementById("alert-to").value = to;
  updateAllFlags();
  if (redrawChart) renderChart(rate, from, to, currentChartDays);
  await renderTicker();
  renderProviderTable(currentCorridor);
}

async function renderTicker() {
  const track = document.getElementById("ticker-track");
  const usdPayload = await fetchRates("USD");
  const usdRates = usdPayload.rates;
  track.innerHTML = TICKER_PAIRS.map(([base, quote], index) => {
    const rate = base === "USD" ? usdRates[quote] : usdRates[quote] / usdRates[base];
    const change = pseudoChange(`${base}${quote}`, index);
    return `<article class="ticker-card">
      <div class="ticker-pair"><span class="ticker-flags"><span class="currency-flag">${flagSvg(base)}</span><span class="currency-flag">${flagSvg(quote)}</span></span>${base}/${quote}</div>
      <div class="ticker-value"><strong>${formatRate(rate)}</strong><span class="${change < 0 ? "negative" : ""}">${change >= 0 ? "+" : ""}${change.toFixed(2)}%</span></div>
    </article>`;
  }).join("");
}

function pseudoChange(seed, offset = 0) {
  const total = [...seed].reduce((sum, character) => sum + character.charCodeAt(0), 0) + offset * 17;
  return ((total % 61) - 25) / 100;
}

function sparklineMarkup(seed, isNegative) {
  let value = 13;
  const points = Array.from({ length: 9 }, (_, index) => {
    value += Math.sin((seed + index) * 1.7) * 2.1 + (isNegative ? -.35 : .35);
    return `${index * 10},${Math.max(3, Math.min(23, value)).toFixed(1)}`;
  }).join(" ");
  return `<svg class="sparkline ${isNegative ? "negative" : ""}" viewBox="0 0 82 26" aria-hidden="true"><path d="M${points.replaceAll(" ", " L")}"/></svg>`;
}

function getWatchlist() {
  try { return JSON.parse(localStorage.getItem("ter-watchlist") || "[]"); }
  catch { return []; }
}

function setWatchlist(watchlist) {
  localStorage.setItem("ter-watchlist", JSON.stringify(watchlist));
  updateWatchlistSummary(watchlist);
}

function updateWatchlistSummary(watchlist = getWatchlist()) {
  const count = watchlist.length;
  document.getElementById("watch-count").textContent = `${count} ${count === 1 ? "pair" : "pairs"} saved`;
  document.querySelector(".watch-icon").classList.toggle("active", count > 0);
}

async function renderRateTable() {
  const base = document.getElementById("table-base").value;
  const query = document.getElementById("currency-search").value.trim().toLowerCase();
  const payload = await fetchRates(base);
  const watchlist = getWatchlist();
  const currencies = CURRENCIES.filter((currency) => currency.code !== base && (!query || currency.code.toLowerCase().includes(query) || currency.name.toLowerCase().includes(query)));
  const tableBody = document.getElementById("rate-table-body");
  document.getElementById("currency-empty").hidden = currencies.length > 0;
  tableBody.innerHTML = currencies.map((currency, index) => {
    const pair = `${base}-${currency.code}`;
    const isWatched = watchlist.includes(pair);
    const change = pseudoChange(pair, index);
    return `<tr>
      <td><div class="currency-cell"><span class="currency-flag">${flagSvg(currency.code)}</span><div><strong>${currency.name}</strong><span>${currency.code}</span></div></div></td>
      <td><strong class="rate-value">${formatRate(payload.rates[currency.code])}</strong></td>
      <td><span class="change-badge ${change < 0 ? "negative" : ""}">${change >= 0 ? "+" : ""}${change.toFixed(2)}%</span></td>
      <td>${sparklineMarkup(index + pair.length, change < 0)}</td>
      <td><button class="star-button ${isWatched ? "active" : ""}" type="button" data-pair="${pair}" aria-label="${isWatched ? "Remove" : "Add"} ${base} to ${currency.code} ${isWatched ? "from" : "to"} watchlist" aria-pressed="${isWatched}"><svg viewBox="0 0 24 24"><path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1-5.4-2.9-5.4 2.9 1-6.1-4.4-4.3 6.1-.9L12 3Z"/></svg></button></td>
    </tr>`;
  }).join("");
  setFlag("base-flag", base);
}

function toggleWatchPair(pair) {
  const watchlist = getWatchlist();
  const next = watchlist.includes(pair) ? watchlist.filter((item) => item !== pair) : [...watchlist, pair];
  setWatchlist(next);
  showToast(watchlist.includes(pair) ? `${pair.replace("-", "/")} removed from your watchlist.` : `${pair.replace("-", "/")} saved to your watchlist.`);
  renderRateTable();
}

function seededRandom(seed) {
  let state = seed % 2147483647;
  if (state <= 0) state += 2147483646;
  return () => ((state = state * 16807 % 2147483647) - 1) / 2147483646;
}

function generateSeries(rate, base, quote, days) {
  const pointCount = days === 1 ? 24 : days <= 7 ? days * 4 : days <= 90 ? Math.min(days, 60) : 90;
  const seed = [...`${base}${quote}${days}`].reduce((sum, character) => sum + character.charCodeAt(0), 0);
  const random = seededRandom(seed);
  const scale = rate * (days > 365 ? .0028 : days > 30 ? .0018 : .0012);
  let value = rate * (1 - (random() - .3) * .022);
  const now = Date.now();
  return Array.from({ length: pointCount }, (_, index) => {
    const drift = (rate - value) / Math.max(8, pointCount - index);
    value = Math.max(rate * .78, value + drift + (random() - .48) * scale);
    if (index === pointCount - 1) value = rate;
    const timestamp = now - ((pointCount - 1 - index) * days * 86400000 / Math.max(1, pointCount - 1));
    return { date: new Date(timestamp), rate: value, high: value + random() * scale * 1.8, low: value - random() * scale * 1.8 };
  });
}

function chartDateLabel(date, days) {
  if (days === 1) return date.toLocaleTimeString([], { hour: "numeric" });
  if (days <= 90) return date.toLocaleDateString([], { month: "short", day: "numeric" });
  return date.toLocaleDateString([], { month: "short", year: "2-digit" });
}

function renderChart(rate, base, quote, days) {
  if (!Number.isFinite(rate) || typeof Chart === "undefined") return;
  currentChartSeries = generateSeries(rate, base, quote, days);
  const values = currentChartSeries.map((point) => point.rate);
  const change = ((values.at(-1) / values[0]) - 1) * 100;
  const high = Math.max(...currentChartSeries.map((point) => point.high));
  const low = Math.min(...currentChartSeries.map((point) => point.low));
  const average = values.reduce((sum, value) => sum + value, 0) / values.length;
  const volatility = ((high - low) / average) * 100;
  const changeBadge = document.getElementById("chart-change");
  changeBadge.textContent = `${change >= 0 ? "+" : ""}${change.toFixed(2)}%`;
  changeBadge.classList.toggle("negative", change < 0);
  changeBadge.classList.toggle("positive", change >= 0);
  document.getElementById("period-high").textContent = formatRate(high);
  document.getElementById("period-low").textContent = formatRate(low);
  document.getElementById("period-average").textContent = formatRate(average);
  document.getElementById("period-volatility").textContent = `${volatility.toFixed(2)}%`;
  const context = document.getElementById("rate-chart").getContext("2d");
  const gradient = context.createLinearGradient(0, 0, 0, 330);
  gradient.addColorStop(0, "rgba(33, 198, 91, .24)");
  gradient.addColorStop(1, "rgba(33, 198, 91, 0)");
  if (chartInstance) chartInstance.destroy();
  chartInstance = new Chart(context, {
    type: "line",
    data: {
      labels: currentChartSeries.map((point) => chartDateLabel(point.date, days)),
      datasets: [{ data: values, borderColor: "#21c65b", backgroundColor: gradient, fill: true, borderWidth: 2.2, pointRadius: 0, pointHoverRadius: 5, pointHoverBackgroundColor: "#21c65b", pointHoverBorderColor: "#ffffff", pointHoverBorderWidth: 2, tension: .34 }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { intersect: false, mode: "index" },
      animation: { duration: 500 },
      plugins: {
        legend: { display: false },
        tooltip: {
          displayColors: false,
          backgroundColor: "#ffffff",
          titleColor: "#64748b",
          bodyColor: "#0e1825",
          borderColor: "#dfe6ed",
          borderWidth: 1,
          padding: 12,
          titleFont: { family: "DM Sans", size: 10 },
          bodyFont: { family: "Manrope", size: 13, weight: "700" },
          callbacks: {
            title(items) { return currentChartSeries[items[0].dataIndex].date.toLocaleString([], days === 1 ? { hour: "numeric", minute: "2-digit" } : { month: "short", day: "numeric", year: "numeric" }); },
            label(item) { const point = currentChartSeries[item.dataIndex]; return [`Rate  ${formatRate(point.rate)}`, `High  ${formatRate(point.high)}`, `Low   ${formatRate(point.low)}`]; },
          },
        },
      },
      scales: {
        x: { grid: { display: false }, border: { display: false }, ticks: { color: "#718196", maxTicksLimit: 7, maxRotation: 0, font: { family: "DM Sans", size: 9 } } },
        y: { position: "right", border: { display: false }, grid: { color: "rgba(255,255,255,.07)", drawTicks: false }, ticks: { color: "#718196", padding: 12, maxTicksLimit: 6, callback: (value) => formatRate(value), font: { family: "DM Sans", size: 9 } } },
      },
    },
  });
}

function downloadCsv() {
  const from = document.getElementById("from").value;
  const to = document.getElementById("to").value;
  const lines = ["date,rate,high,low,data_type", ...currentChartSeries.map((point) => `${point.date.toISOString()},${point.rate},${point.high},${point.low},indicative_modeled_series`)];
  const blob = new Blob([lines.join("\n")], { type: "text/csv;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `${from}-${to}-${currentChartDays}d-indicative.csv`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
  showToast("Historical CSV downloaded. The series is marked as indicative modeled data.");
}

async function renderProviderTable(corridorKey) {
  const corridor = CORRIDORS[corridorKey];
  if (!corridor) return;
  const payload = await fetchRates(corridor.from);
  const midRate = payload.rates[corridor.to];
  const sendAmount = 1000;
  document.getElementById("comparison-send").textContent = formatMoney(sendAmount, corridor.from);
  document.getElementById("comparison-rate").textContent = `1 ${corridor.from} = ${formatRate(midRate)} ${corridor.to}`;
  document.getElementById("provider-table-body").innerHTML = PROVIDERS.map((provider) => {
    const providerRate = midRate * (1 - provider.margin);
    const payout = Math.max(0, sendAmount - provider.fee) * providerRate;
    return `<tr class="${provider.featured ? "best-row" : ""}">
      <td><div class="provider-cell"><span class="provider-logo ${provider.className}">${provider.initials}</span><div><strong>${provider.name}</strong>${provider.featured ? "<span>Closest to mid-market</span>" : ""}</div></div></td>
      <td>${provider.speed}</td>
      <td><strong>${provider.fee.toFixed(2)} ${corridor.from}</strong></td>
      <td><div class="margin-cell"><strong>${(provider.margin * 100).toFixed(2)}%</strong><span>${formatRate(providerRate)} rate</span></div></td>
      <td><div class="payout-cell"><strong>${formatMoney(payout, corridor.to)}</strong><span>Estimated payout</span></div></td>
      <td><a class="button ${provider.featured ? "button-green" : "button-ghost"} send-link" href="${provider.url}" target="_blank" rel="noopener noreferrer sponsored" aria-label="Visit ${provider.name} to send money">Send now</a></td>
    </tr>`;
  }).join("");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3200);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function submitAlertForm(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const emailInput = document.getElementById("alert-email");
  const error = document.getElementById("email-error");
  const status = document.getElementById("form-status");
  if (!validateEmail(emailInput.value.trim())) {
    emailInput.classList.add("invalid");
    emailInput.setAttribute("aria-invalid", "true");
    error.textContent = "Enter a valid email address.";
    emailInput.focus();
    return;
  }
  emailInput.classList.remove("invalid");
  emailInput.removeAttribute("aria-invalid");
  error.textContent = "";
  const button = form.querySelector("button[type='submit']");
  const original = button.innerHTML;
  button.disabled = true;
  button.querySelector("span").textContent = "Creating alert…";
  status.className = "form-status";
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(new FormData(form)).toString(),
    });
    if (!response.ok) throw new Error("Submission failed");
    const from = document.getElementById("alert-from").value;
    const to = document.getElementById("alert-to").value;
    const target = document.getElementById("target-rate").value;
    status.className = "form-status success";
    status.textContent = `Alert created for ${from}/${to} above ${target}. Check your inbox when the target is reached.`;
    emailInput.value = "";
    showToast("Your rate alert is active.");
  } catch {
    status.className = "form-status error";
    status.textContent = "We couldn’t create the alert. Please try again in a moment.";
  } finally {
    button.disabled = false;
    button.innerHTML = original;
  }
}

function setupEvents() {
  const amountInput = document.getElementById("amount");
  amountInput.addEventListener("focus", () => { amountInput.value = amountInput.value.replaceAll(",", ""); });
  amountInput.addEventListener("blur", () => { amountInput.value = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(parseAmount(amountInput.value)); });
  amountInput.addEventListener("input", () => updateConverter({ redrawChart: false }));
  document.getElementById("from").addEventListener("change", () => updateConverter());
  document.getElementById("to").addEventListener("change", () => updateConverter());
  document.getElementById("table-base").addEventListener("change", renderRateTable);
  document.getElementById("currency-search").addEventListener("input", renderRateTable);
  document.getElementById("alert-from").addEventListener("change", updateAllFlags);
  document.getElementById("alert-to").addEventListener("change", updateAllFlags);
  document.getElementById("rate-table-body").addEventListener("click", (event) => {
    const button = event.target.closest("[data-pair]");
    if (button) toggleWatchPair(button.dataset.pair);
  });
  document.getElementById("swap-currencies").addEventListener("click", () => {
    const from = document.getElementById("from");
    const to = document.getElementById("to");
    [from.value, to.value] = [to.value, from.value];
    updateConverter();
  });
  document.querySelectorAll("[data-scroll-to]").forEach((button) => button.addEventListener("click", () => document.getElementById(button.dataset.scrollTo)?.scrollIntoView({ behavior: "smooth" })));
  document.getElementById("range-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-days]");
    if (!button) return;
    document.querySelectorAll("#range-tabs button").forEach((item) => item.classList.toggle("active", item === button));
    currentChartDays = Number(button.dataset.days);
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    renderChart(currentRates[to], from, to, currentChartDays);
  });
  document.getElementById("download-csv").addEventListener("click", downloadCsv);
  document.getElementById("corridor-tabs").addEventListener("click", (event) => {
    const button = event.target.closest("button[data-corridor]");
    if (!button) return;
    currentCorridor = button.dataset.corridor;
    document.querySelectorAll("#corridor-tabs button").forEach((item) => {
      const active = item === button;
      item.classList.toggle("active", active);
      item.setAttribute("aria-selected", String(active));
    });
    renderProviderTable(currentCorridor);
  });
  document.getElementById("alert-email").addEventListener("input", (event) => {
    if (event.target.classList.contains("invalid") && validateEmail(event.target.value.trim())) {
      event.target.classList.remove("invalid");
      event.target.removeAttribute("aria-invalid");
      document.getElementById("email-error").textContent = "";
    }
  });
  document.getElementById("alert-form").addEventListener("submit", submitAlertForm);
  const menuButton = document.querySelector(".menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  menuButton.addEventListener("click", () => {
    const open = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!open));
    menuButton.setAttribute("aria-label", open ? "Open navigation menu" : "Close navigation menu");
    mobileMenu.hidden = open;
    document.body.classList.toggle("menu-open", !open);
  });
  mobileMenu.addEventListener("click", (event) => {
    if (event.target.matches("a")) {
      mobileMenu.hidden = true;
      menuButton.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }
  });
}

async function init() {
  setupSelects();
  setupEvents();
  updateWatchlistSummary();
  await Promise.all([updateConverter(), renderRateTable(), renderProviderTable(currentCorridor)]);
  setInterval(async () => {
    ratesCache = new Map();
    await Promise.all([updateConverter(), renderRateTable(), renderProviderTable(currentCorridor)]);
  }, 15 * 60 * 1000);
}

init();
