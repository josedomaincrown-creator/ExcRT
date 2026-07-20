export async function onRequestGet(context) {
  const apiKey = context.env.exchangerateapi;
  const base = context.request.url.searchParams.get("base") || "USD";
  const res = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/${base}`);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" }
  });
}
