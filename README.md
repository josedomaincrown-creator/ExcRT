# TodayExchangeRate.com — v1 site (Cloudflare Pages)

## What's in here
- `index.html` / `styles.css` / `script.js` — the site itself (converter, rate board, provider comparison, NGN content, alert signup)
- `functions/api/rates.js` — Cloudflare Pages Function proxy that calls the rate API using a hidden server-side key
- `wrangler.toml` — Cloudflare Pages configuration file

## Deploy steps

1. **Push this folder to a GitHub / GitLab repo** (or deploy via Wrangler CLI).
2. **In Cloudflare Dashboard:**
   - Go to **Workers & Pages** → **Create application** → **Pages** → **Connect to Git**.
   - Select your repository.
   - Set **Framework preset** to `None` / `Static`.
   - Set **Build output directory** to `.` (root directory).
3. **Set your API Key Environment Variable:**
   - In Cloudflare Pages Dashboard: Go to **Settings** → **Environment variables**.
   - Click **Add variable**:
     - Key: `EXCHANGE_RATE_API_KEY`
     - Value: *(your exchangerate-api.com key)*
   - Save and trigger a new deployment.
4. **Point your domain** (todayexchangerate.com):
   - Go to **Custom domains** tab in your Cloudflare Pages project → **Add custom domain**.
   - Follow prompt to update CNAME/A records.
5. **Test the live converter:**
   - Open the site and verify rates load from `/api/rates`.
   - If rates fail, check logs under **Functions** → **Real-time Logs** in Cloudflare.

## Security note
Never put the API key directly into `script.js`, `index.html`, or any file sent to the browser. It belongs exclusively in Cloudflare's Environment Variables (`context.env.EXCHANGE_RATE_API_KEY`).
