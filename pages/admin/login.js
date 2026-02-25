import { useState } from "react";

export default function Login() {
  const [u,setU]=useState("");
  const [p,setP]=useState("");

  async function login(){
    const res = await fetch("/api/admin-login",{
      method:"POST",
      headers:{ "Content-Type":"application/json"},
      body:JSON.stringify({username:u,password:p})
    });
    const data = await res.json();
    if(data.success) window.location.href="/admin";
  }

  return (
    <div style={{padding:100}}>
      <h2>Admin Login</h2>
      <input placeholder="Username" onChange={e=>setU(e.target.value)} />
      <br/>
      <input type="password" placeholder="Password" onChange={e=>setP(e.target.value)} />
      <br/>
      <button onClick={login}>Login</button>
    </div>
  );
}