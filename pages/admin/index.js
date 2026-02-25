import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

export default function Admin(){

  const [stats,setStats]=useState([]);

  useEffect(()=>{
    fetch("/api/admin-stats")
      .then(r=>r.json())
      .then(d=>setStats(d));
  },[]);

  const countryCounts={};
  stats.forEach(s=>{
    countryCounts[s.country]=(countryCounts[s.country]||0)+1;
  });

  return (
    <div style={{padding:40}}>
      <h1>Traffic Dashboard</h1>
      <h3>Total Visits: {stats.length}</h3>

      <div style={{width:400}}>
        <Pie data={{
          labels:Object.keys(countryCounts),
          datasets:[{data:Object.values(countryCounts)}]
        }}/>
      </div>

      <table border="1" cellPadding="8">
        <thead>
          <tr>
            <th>IP</th><th>Country</th><th>ASN</th><th>Time</th>
          </tr>
        </thead>
        <tbody>
          {stats.slice(-50).reverse().map((s,i)=>(
            <tr key={i}>
              <td>{s.ip}</td>
              <td>{s.country}</td>
              <td>{s.asn}</td>
              <td>{new Date(s.timestamp).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}