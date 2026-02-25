import crypto from "crypto";

function sign(data) {
  return crypto
    .createHmac("sha256", process.env.REDIRECT_SECRET)
    .update(data)
    .digest("hex");
}

export default async function handler(req, res) {

  const { token } = req.body;
  const ip = req.headers["x-forwarded-for"];

  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: process.env.TURNSTILE_SECRET,
        response: token,
        remoteip: ip
      })
    }
  );

  const data = await response.json();

  if (!data.success) {
    return res.json({ success: false });
  }

  await fetch(`${process.env.BASE_URL}/api/log`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });

  const ts = Date.now().toString();
  const sig = sign(ts);

  res.json({
    success: true,
    redirect: `/api/go?ts=${ts}&sig=${sig}`
  });
}