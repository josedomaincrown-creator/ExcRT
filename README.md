# TodayExchangeRate.com — v1 site

## What's in here
- `index.html` / `styles.css` / `script.js` — the site itself (converter, rate board, provider comparison, NGN content, alert signup)
- `netlify/functions/rates.js` — serverless proxy that calls the rate API using a hidden server-side key
- `netlify.toml` — Netlify config

## Deploy steps (today)

1. **Push this folder to a GitHub repo** (or drag-and-drop deploy directly in Netlify — either works for v1).
2. **In Netlify:** New site from Git (or drag the folder into the Netlify dashboard for a manual deploy).
3. **Set your API key as an environment variable — do this before the key touches anything else:**
   - Netlify dashboard → Site configuration → Environment variables → Add variable
   - Key: `EXCHANGE_RATE_API_KEY`
   - Value: (your exchangerate-api.com key)
   - Redeploy after adding it — env vars only apply on the next build/deploy.
4. **Point your domain** (todayexchangerate.com) at the Netlify site: Domain settings → Add custom domain, then update your DNS (A/CNAME records) at wherever the domain is registered.
5. **Test the live converter** — open the site, confirm the board shows real numbers, not "—". If it doesn't, check Netlify's function logs (Functions tab) for the error.

## What's in v2 (feature set pulled from XE, Wise, OANDA, X-Rates)
- **Universal converter** — any of 20 major currencies, not just NGN pairs (XE/Google-style)
- **Full rate table** — all 20 currencies against any base you pick, sortable by base (XE's rate table)
- **Historical chart** — 7D/1M/3M/1Y/5Y range toggle with CSV export (OANDA-style; see note below)
- **Watchlist** — star any pair, saved locally in the visitor's browser, no login required
- **Mid-market rate transparency** — explicit "this is the benchmark rate, not a quote" framing (Wise's core trust signal)
- **Multi-corridor comparison** — US/UK/EU → Nigeria, India, Philippines, Mexico, Ghana, selectable via pills, not hardcoded to one country
- **For Business section** — API access inquiry, positions the site for a B2B data-licensing angle later

## What's still placeholder / needs real data before this is "done"
- **Historical chart uses generated demo data**, not real history — clearly marked in `script.js` (`generateDemoSeries`). exchangerate-api.com's standard tier doesn't include a time-series endpoint; you'll need OANDA, Fixer, or an upgraded plan to get real historical data. The chart code itself won't need to change, just the data source.
- Provider comparison table (`script.js` → `PROVIDERS` array) has dummy fee/speed text and `#` links — replace with real figures and your actual affiliate links once approved by Wise/Western Union/Remitly.
- Alert signup form just shows a browser alert — wire it to Mailchimp or Brevo's form action/API once you pick one.
- NGN parallel-market rate isn't in here yet — this API only gives official/interbank rates. That's a separate data source you'll need to add (see the startup guide, section 3.1) — worth keeping even though the homepage framing is now global, since it's still your strongest differentiator under the hood.
- Only one page exists (the homepage). Programmatic per-pair SEO landing pages (USD-NGN, GBP-NGN, etc. as standalone URLs) are the next build step.

## Security note
Never put the API key directly into `script.js`, `index.html`, or any file that ships to the browser. It only belongs in Netlify's environment variables, read server-side by `rates.js`. If it's ever been pasted anywhere public (chat, GitHub, a doc), rotate it on exchangerate-api.com's dashboard.
