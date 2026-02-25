import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const blockedASNs = new Set(["16509","15169","8075","14061","9009"]);

export function middleware(req) {

  const asn = req.headers.get("cf-asn");
  if (blockedASNs.has(asn)) {
    return new NextResponse("VPN/Hosting Blocked", { status: 403 });
  }

  if (req.nextUrl.pathname.startsWith("/admin")) {
    const token = req.cookies.get("admin_token")?.value;
    if (!token) {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }

    try {
      jwt.verify(token, process.env.ADMIN_SECRET);
    } catch {
      return NextResponse.redirect(new URL("/admin/login", req.url));
    }
  }

  return NextResponse.next();
}