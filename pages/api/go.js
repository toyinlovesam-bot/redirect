import crypto from "crypto";

function sign(data) {
  return crypto
    .createHmac("sha256", process.env.REDIRECT_SECRET)
    .update(data)
    .digest("hex");
}

export default function handler(req, res) {
  const { ts, sig } = req.query;

  if (!ts || sig !== sign(ts)) {
    return res.status(403).send("Invalid");
  }

  if (Date.now() - parseInt(ts) > 30000) {
    return res.status(403).send("Expired");
  }

  res.redirect("https://google.com");
}