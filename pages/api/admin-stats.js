import fs from "fs";
import path from "path";

export default function handler(req, res) {
  const file = path.join(process.cwd(), "logs.json");
  if (!fs.existsSync(file)) return res.json([]);

  res.json(JSON.parse(fs.readFileSync(file)));
}