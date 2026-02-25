import jwt from "jsonwebtoken";

export default function handler(req, res) {

  const { username, password } = req.body;

  if (
    username === process.env.ADMIN_USER &&
    password === process.env.ADMIN_PASS
  ) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.ADMIN_SECRET,
      { expiresIn: "2h" }
    );

    res.setHeader(
      "Set-Cookie",
      `admin_token=${token}; HttpOnly; Path=/; Secure; SameSite=Strict`
    );

    return res.json({ success: true });
  }

  res.status(401).json({ success: false });
}