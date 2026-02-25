import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const file = path.join(process.cwd(), "logs.json");

  let logs = [];
  if (fs.existsSync(file)) {
    logs = JSON.parse(fs.readFileSync(file));
  }

  logs.push({
    ip: req.headers["x-forwarded-for"],
    country: req.headers["cf-ipcountry"],
    asn: req.headers["cf-asn"],
    ua: req.headers["user-agent"],
    timestamp: Date.now()
  });

  fs.writeFileSync(file, JSON.stringify(logs, null, 2));

  res.json({ success: true });
}