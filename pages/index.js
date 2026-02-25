import { useEffect } from "react";

export default function Home() {

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  async function onSuccess(token) {
    const res = await fetch("/api/verify", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token })
    });

    const data = await res.json();
    if (data.success) {
      window.location.href = data.redirect;
    } else {
      alert("Verification failed");
    }
  }

  return (
    <div style={{ padding: 100, textAlign: "center" }}>
      <h1>Security Verification</h1>

      <div
        className="cf-turnstile"
        data-sitekey={process.env.NEXT_PUBLIC_SITE_KEY}
        data-callback="onSuccess"
      ></div>

      <script dangerouslySetInnerHTML={{
        __html: `window.onSuccess=${onSuccess}`
      }} />
    </div>
  );
}