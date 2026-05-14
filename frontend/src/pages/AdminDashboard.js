import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {getMatches,updateMatchStatus,getAnalytics} from '../services/api';
import {PieChart,Pie,Cell,Tooltip,Legend,ResponsiveContainer,BarChart,Bar,XAxis,YAxis,CartesianGrid} from 'recharts';

function AdminDashboard(){

const navigate=useNavigate();

const [matches,setMatches]=useState([]);
const [analytics,setAnalytics]=useState({});
const [loading,setLoading]=useState(true);
const [statusFilter,setStatusFilter]=useState('all');
const [donorFilter,setDonorFilter]=useState('');

useEffect(()=>{
fetchMatches();
fetchAnalytics();
const interval=setInterval(()=>{
fetchMatches();
fetchAnalytics();
},5000);
return()=>clearInterval(interval);
},[]);

const fetchMatches=async()=>{
try{
const res=await getMatches();
setMatches(res.data);
}catch(err){
console.log(err);
}
setLoading(false);
};

const fetchAnalytics=async()=>{
try{
const res=await getAnalytics();
setAnalytics(res.data);
}catch(err){
console.log(err);
}
};

const handleStatusChange=async(matchId,newStatus)=>{
try{
await updateMatchStatus(matchId,{delivery_status:newStatus});
fetchMatches();
fetchAnalytics();
toast.success('Delivery status updated!');
}catch(err){
console.log(err);
toast.error('Failed to update status');
}
};

const handleLogout=()=>{
localStorage.clear();
navigate('/');
};

const filteredMatches=matches.filter((m)=>{
const statusMatch=statusFilter==='all'?true:m.delivery_status===statusFilter;
const donorMatch=donorFilter===''?true:m.donor_name?.toLowerCase().includes(donorFilter.toLowerCase());
return statusMatch && donorMatch;
});

const deliveredCount=matches.filter(m=>m.delivery_status==='delivered').length;
const transitCount=matches.filter(m=>m.delivery_status==='in_transit').length;
const pendingCount=matches.filter(m=>m.delivery_status==='pending').length;
const totalMatches=matches.length;

const pieData=[
{name:'Delivered',value:analytics.delivered||0},
{name:'Pending',value:analytics.pending||0}
];

const barData=[
{name:'Donors',count:analytics.totalDonors||0},
{name:'NGOs',count:analytics.totalNGOs||0},
{name:'Victims',count:analytics.totalVictims||0},
{name:'Donations',count:analytics.totalDonations||0},
{name:'Requests',count:analytics.totalRequests||0},
{name:'Matches',count:analytics.totalMatches||0}
];

const COLORS=['#00e5ff','#ffb300'];

const getStatusColor=(status)=>{
if(status==='delivered') return '#00e676';
if(status==='in_transit') return '#29b6f6';
return '#ffb300';
};

const getPriorityColor=(level)=>{
if(level==='critical') return '#ff1744';
if(level==='high') return '#ff9100';
if(level==='medium') return '#00b0ff';
return '#69f0ae';
};

return(
<div style={styles.page}>

<style>{`
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Syne:wght@700;800&display=swap');

*{
font-family:'Outfit',sans-serif;
box-sizing:border-box;
scroll-behavior:smooth;
}

body{
margin:0;
padding:0;
background:#02101f;
overflow-x:hidden;
}

/* BACKGROUND */
.bg-overlay{
position:fixed;
inset:0;
background:
linear-gradient(rgba(1,16,31,0.88),rgba(1,16,31,0.92)),
url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop');
background-size:cover;
background-position:center;
z-index:-2;
}

.bg-glow{
position:fixed;
width:700px;
height:700px;
border-radius:50%;
background:radial-gradient(circle,rgba(0,229,255,0.16),transparent 70%);
top:-200px;
right:-180px;
filter:blur(40px);
z-index:-1;
animation:floatGlow 8s ease-in-out infinite alternate;
}

.bg-glow2{
position:fixed;
width:500px;
height:500px;
border-radius:50%;
background:radial-gradient(circle,rgba(0,119,255,0.14),transparent 70%);
bottom:-120px;
left:-120px;
filter:blur(40px);
z-index:-1;
animation:floatGlow2 10s ease-in-out infinite alternate;
}

@keyframes floatGlow{
from{transform:translateY(0px);}
to{transform:translateY(40px);}
}

@keyframes floatGlow2{
from{transform:translateX(0px);}
to{transform:translateX(40px);}
}

/* GLASS CARD */
.g-card{
background:rgba(255,255,255,0.05);
backdrop-filter:blur(18px);
border:1px solid rgba(255,255,255,0.08);
border-radius:24px;
box-shadow:0 10px 40px rgba(0,0,0,0.35);
transition:all 0.35s ease;
position:relative;
overflow:hidden;
}

.g-card::before{
content:'';
position:absolute;
inset:0;
background:linear-gradient(120deg,transparent,rgba(255,255,255,0.05),transparent);
transform:translateX(-100%);
transition:0.8s;
}

.g-card:hover::before{
transform:translateX(100%);
}

.g-card:hover{
transform:translateY(-6px);
border-color:rgba(0,229,255,0.25);
box-shadow:0 25px 60px rgba(0,0,0,0.45);
}

/* HEADER */
.dashboard-title{
font-family:'Syne',sans-serif;
font-size:2.8rem;
font-weight:800;
background:linear-gradient(90deg,#ffffff,#7dd3fc,#38bdf8);
-webkit-background-clip:text;
-webkit-text-fill-color:transparent;
margin:0;
}

.live-pill{
display:flex;
align-items:center;
gap:10px;
padding:10px 18px;
border-radius:50px;
background:rgba(255,255,255,0.06);
border:1px solid rgba(255,255,255,0.08);
color:#dbeafe;
font-size:0.85rem;
font-weight:600;
}

.live-dot{
width:8px;
height:8px;
border-radius:50%;
background:#00e676;
box-shadow:0 0 12px #00e676;
animation:pulse 1.5s infinite;
}

@keyframes pulse{
0%{transform:scale(1);opacity:1;}
50%{transform:scale(1.4);opacity:0.7;}
100%{transform:scale(1);opacity:1;}
}

/* BUTTONS */
.logout-btn{
background:linear-gradient(135deg,#0ea5e9,#2563eb);
border:none;
color:#fff;
padding:12px 24px;
border-radius:14px;
font-weight:700;
cursor:pointer;
transition:all 0.3s ease;
box-shadow:0 8px 20px rgba(37,99,235,0.4);
}

.logout-btn:hover{
transform:translateY(-3px) scale(1.03);
box-shadow:0 14px 28px rgba(37,99,235,0.5);
}

.logout-btn:active{
transform:scale(0.97);
}

/* NAVIGATION CARDS */
.nav-card{
position:relative;
overflow:hidden;
cursor:pointer;
padding:30px;
border-radius:24px;
transition:all 0.35s ease;
}

.nav-card:hover{
transform:translateY(-8px) scale(1.01);
}

.nav-card::after{
content:'';
position:absolute;
width:220px;
height:220px;
background:rgba(255,255,255,0.08);
border-radius:50%;
top:-90px;
right:-90px;
transition:0.5s;
}

.nav-card:hover::after{
transform:scale(1.2);
}

.nav-icon{
font-size:2.6rem;
margin-bottom:14px;
animation:floatIcon 3s ease-in-out infinite;
}

@keyframes floatIcon{
0%{transform:translateY(0px);}
50%{transform:translateY(-6px);}
100%{transform:translateY(0px);}
}

/* METRIC CARDS */
.metric-card{
padding:26px;
position:relative;
overflow:hidden;
}

.metric-card:hover{
transform:translateY(-8px) scale(1.03);
}

.metric-number{
font-family:'Syne',sans-serif;
font-size:2.6rem;
font-weight:800;
color:#fff;
margin:10px 0;
}

/* SECTION TITLE */
.section-title{
font-size:1.1rem;
font-weight:700;
color:#fff;
margin-bottom:22px;
display:flex;
align-items:center;
gap:10px;
}

/* PROGRESS */
.progress-track{
height:12px;
background:rgba(255,255,255,0.08);
border-radius:30px;
overflow:hidden;
}

.progress-fill{
height:100%;
border-radius:30px;
transition:width 0.8s ease;
}

/* ACTIVITY */
.activity-item{
padding:16px;
border-radius:16px;
margin-bottom:14px;
background:rgba(255,255,255,0.03);
border:1px solid rgba(255,255,255,0.05);
transition:all 0.3s ease;
}

.activity-item:hover{
transform:translateX(8px);
background:rgba(0,229,255,0.08);
}

/* FILTERS */
.filter-input,.filter-select{
width:100%;
padding:14px 16px;
border-radius:14px;
background:rgba(255,255,255,0.05);
border:1px solid rgba(255,255,255,0.08);
color:#fff;
outline:none;
transition:all 0.3s ease;
}

.filter-input::placeholder{
color:rgba(255,255,255,0.4);
}

.filter-input:focus,.filter-select:focus{
border-color:#38bdf8;
box-shadow:0 0 0 4px rgba(56,189,248,0.15);
}

.filter-select option{
background:#02101f;
color:#fff;
}

/* TABLE */
.match-table{
width:100%;
border-collapse:separate;
border-spacing:0 10px;
}

.match-table thead th{
padding:16px;
color:#7dd3fc;
font-size:0.78rem;
text-transform:uppercase;
letter-spacing:0.08em;
font-weight:700;
background:rgba(0,229,255,0.08);
}

.match-table thead th:first-child{
border-radius:14px 0 0 14px;
}

.match-table thead th:last-child{
border-radius:0 14px 14px 0;
}

.match-table tbody tr{
background:rgba(255,255,255,0.04);
transition:all 0.3s ease;
}

.match-table tbody tr:hover{
transform:scale(1.01);
background:rgba(0,229,255,0.08);
}

.match-table tbody td{
padding:16px;
color:#e0f2fe;
font-size:0.88rem;
}

.match-table tbody td:first-child{
border-radius:14px 0 0 14px;
}

.match-table tbody td:last-child{
border-radius:0 14px 14px 0;
}

/* PILLS */
.pill{
padding:7px 14px;
border-radius:50px;
font-size:0.72rem;
font-weight:700;
display:inline-flex;
align-items:center;
gap:6px;
text-transform:uppercase;
letter-spacing:0.05em;
}

/* STATUS SELECT */
.status-select{
appearance:none;
background:#082032;
color:#fff;
border:1px solid rgba(0,229,255,0.3);
padding:10px 14px;
border-radius:12px;
outline:none;
font-weight:600;
cursor:pointer;
transition:all 0.3s ease;
}

.status-select:hover{
border-color:#38bdf8;
box-shadow:0 0 16px rgba(56,189,248,0.2);
}

.status-select option{
background:#082032;
color:#ffffff;
}

/* SCROLL */
::-webkit-scrollbar{
width:5px;
}

::-webkit-scrollbar-thumb{
background:#38bdf8;
border-radius:20px;
}

/* FADE */
.fade-in{
animation:fadeUp 0.7s ease;
}

@keyframes fadeUp{
from{
opacity:0;
transform:translateY(30px);
}
to{
opacity:1;
transform:translateY(0);
}
}
`}</style>

<div className="bg-overlay"/>
<div className="bg-glow"/>
<div className="bg-glow2"/>

<div style={styles.container} className="fade-in">

{/* HEADER */}
<div style={styles.header}>
<div>
<h1 className="dashboard-title">DRRMS Admin Dashboard</h1>
<p style={styles.subtitle}>Disaster Relief Resource Monitoring & Analytics System</p>
</div>

<div style={{display:'flex',alignItems:'center',gap:'18px'}}>
<div className="live-pill">
<div className="live-dot"/>
Live Monitoring
</div>
<button className="logout-btn" onClick={handleLogout}>Logout</button>
</div>
</div>

{/* NAV CARDS */}
<div style={styles.navGrid}>

<div className="nav-card g-card" style={{background:'linear-gradient(135deg,#0284c7,#2563eb)'}} onClick={()=>navigate('/map')}>
<div className="nav-icon">🗺️</div>
<h3 style={styles.navTitle}>Disaster Map</h3>
<p style={styles.navDesc}>Track routes, hotspots, victims & live relief movements</p>
</div>

<div className="nav-card g-card" style={{background:'linear-gradient(135deg,#0f766e,#0891b2)'}}>
<div className="nav-icon">⚡</div>
<h3 style={styles.navTitle}>System Analytics</h3>
<p style={styles.navDesc}>Real-time response monitoring with advanced insights</p>
</div>

</div>

{/* METRICS */}
<div style={styles.metricsGrid}>
{[
{label:'Total Donors',value:analytics.totalDonors||0,bg:'linear-gradient(135deg,#2563eb,#38bdf8)'},
{label:'Total NGOs',value:analytics.totalNGOs||0,bg:'linear-gradient(135deg,#059669,#10b981)'},
{label:'Total Victims',value:analytics.totalVictims||0,bg:'linear-gradient(135deg,#dc2626,#f97316)'},
{label:'Total Matches',value:analytics.totalMatches||0,bg:'linear-gradient(135deg,#7c3aed,#a855f7)'}
].map((item,index)=>(
<div key={index} className="g-card metric-card" style={{background:item.bg}}>
<p style={styles.metricLabel}>{item.label}</p>
<h2 className="metric-number">{item.value}</h2>
</div>
))}
</div>

{/* PROGRESS + PIE */}
<div style={styles.doubleGrid}>

<div className="g-card" style={styles.section}>
<div className="section-title">📦 Delivery Progress</div>

{[
{label:'Delivered',count:deliveredCount,color:'#00e676'},
{label:'In Transit',count:transitCount,color:'#29b6f6'},
{label:'Pending',count:pendingCount,color:'#ffb300'}
].map((item,index)=>(
<div key={index} style={{marginBottom:'22px'}}>
<div style={{display:'flex',justifyContent:'space-between',marginBottom:'8px'}}>
<span style={{color:'rgba(255,255,255,0.75)'}}>{item.label}</span>
<span style={{color:'#fff',fontWeight:'700'}}>{item.count}</span>
</div>

<div className="progress-track">
<div
className="progress-fill"
style={{
width:`${totalMatches?(item.count/totalMatches)*100:0}%`,
background:item.color
}}
/>
</div>
</div>
))}
</div>

<div className="g-card" style={styles.section}>
<div className="section-title">📈 Delivery Analytics</div>

<div style={{height:'280px'}}>
<ResponsiveContainer width="100%" height="100%">
<PieChart>
<Pie data={pieData} dataKey="value" outerRadius={95} label>
{pieData.map((_,index)=>(
<Cell key={index} fill={COLORS[index%COLORS.length]}/>
))}
</Pie>

<Tooltip contentStyle={{
background:'#02101f',
border:'1px solid rgba(255,255,255,0.08)',
borderRadius:'14px',
color:'#fff'
}}/>

<Legend wrapperStyle={{color:'#fff'}}/>

</PieChart>
</ResponsiveContainer>
</div>
</div>

</div>

{/* LIVE FEED */}
<div className="g-card" style={{...styles.section,marginBottom:'24px'}}>
<div className="section-title">🔥 Live Activity Feed</div>

<div style={{maxHeight:'320px',overflowY:'auto'}}>
{matches.slice(0,8).map((m,index)=>(
<div key={index} className="activity-item">

<div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'wrap',gap:'14px'}}>

<div>
<p style={{margin:'0 0 4px',fontWeight:'700',color:'#fff'}}>
{m.donor_name} → {m.victim_name}
</p>

<p style={{margin:'0 0 4px',color:'rgba(255,255,255,0.65)',fontSize:'0.84rem'}}>
{m.resource_type} · Quantity {m.matched_quantity}
</p>

<p style={{margin:0,color:'rgba(255,255,255,0.4)',fontSize:'0.74rem'}}>
{m.matched_at?new Date(m.matched_at).toLocaleString():'N/A'}
</p>
</div>

<span
className="pill"
style={{
background:`${getStatusColor(m.delivery_status)}22`,
color:getStatusColor(m.delivery_status),
border:`1px solid ${getStatusColor(m.delivery_status)}55`
}}
>
{m.delivery_status}
</span>

</div>

</div>
))}
</div>
</div>

{/* FILTERS */}
<div className="g-card" style={{...styles.section,marginBottom:'24px'}}>
<div className="section-title">🔍 Search & Filters</div>

<div style={styles.filterGrid}>

<div>
<label style={styles.label}>Filter by Status</label>

<select
className="filter-select"
value={statusFilter}
onChange={e=>setStatusFilter(e.target.value)}
>
<option value="all">All Status</option>
<option value="pending">Pending</option>
<option value="in_transit">In Transit</option>
<option value="delivered">Delivered</option>
</select>
</div>

<div>
<label style={styles.label}>Search by Donor</label>

<input
type="text"
className="filter-input"
placeholder="Enter donor name..."
value={donorFilter}
onChange={e=>setDonorFilter(e.target.value)}
/>
</div>

</div>
</div>

{/* BAR CHART */}
<div className="g-card" style={{...styles.section,marginBottom:'24px'}}>
<div className="section-title">📊 System Statistics</div>

<div style={{height:'320px'}}>
<ResponsiveContainer width="100%" height="100%">
<BarChart data={barData}>
<CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)"/>

<XAxis dataKey="name" stroke="rgba(255,255,255,0.5)"/>

<YAxis stroke="rgba(255,255,255,0.5)"/>

<Tooltip contentStyle={{
background:'#02101f',
border:'1px solid rgba(255,255,255,0.08)',
borderRadius:'14px',
color:'#fff'
}}/>

<Bar dataKey="count" fill="#38bdf8" radius={[12,12,0,0]}/>
</BarChart>
</ResponsiveContainer>
</div>
</div>

{/* MATCH TABLE */}
<div className="g-card" style={styles.section}>

<div className="section-title">🚚 Live Match Tracking</div>

{loading?(
<div style={{padding:'40px',textAlign:'center',color:'rgba(255,255,255,0.5)'}}>
Loading matches...
</div>
):(
<div style={{overflowX:'auto'}}>

<table className="match-table">

<thead>
<tr>
{['ID','Victim','Donor','Resource','Priority','Qty','Status','Matched Time','Update'].map((h)=>(
<th key={h}>{h}</th>
))}
</tr>
</thead>

<tbody>

{filteredMatches.map((m,index)=>(
<tr key={index}>

<td>#{m.match_id}</td>

<td>{m.victim_name}</td>

<td>{m.donor_name}</td>

<td>{m.resource_type}</td>

<td>
<span
className="pill"
style={{
background:`${getPriorityColor(m.priority_level)}22`,
color:getPriorityColor(m.priority_level),
border:`1px solid ${getPriorityColor(m.priority_level)}55`
}}
>
{m.priority_level}
</span>
</td>

<td>{m.matched_quantity}</td>

<td>
<span
className="pill"
style={{
background:`${getStatusColor(m.delivery_status)}22`,
color:getStatusColor(m.delivery_status),
border:`1px solid ${getStatusColor(m.delivery_status)}55`
}}
>
{m.delivery_status}
</span>
</td>

<td style={{color:'rgba(255,255,255,0.5)',fontSize:'0.8rem'}}>
{m.matched_at?new Date(m.matched_at).toLocaleString():'N/A'}
</td>

<td>
<select
className="status-select"
value={m.delivery_status}
onChange={e=>handleStatusChange(m.match_id,e.target.value)}
>
<option value="pending">⏳ Pending</option>
<option value="in_transit">🚚 In Transit</option>
<option value="delivered">✅ Delivered</option>
</select>
</td>

</tr>
))}

</tbody>

</table>

</div>
)}

</div>

</div>

</div>
);
}

const styles={

page:{
minHeight:'100vh',
position:'relative'
},

container:{
maxWidth:'1450px',
margin:'0 auto',
padding:'32px 24px 60px'
},

header:{
display:'flex',
justifyContent:'space-between',
alignItems:'center',
marginBottom:'34px',
gap:'20px',
flexWrap:'wrap'
},

subtitle:{
color:'rgba(255,255,255,0.55)',
marginTop:'6px',
fontSize:'0.92rem'
},

navGrid:{
display:'grid',
gridTemplateColumns:'1fr 1fr',
gap:'24px',
marginBottom:'24px'
},

navTitle:{
fontSize:'1.25rem',
fontWeight:'700',
color:'#fff',
margin:'0 0 8px'
},

navDesc:{
color:'rgba(255,255,255,0.75)',
margin:0,
fontSize:'0.88rem',
lineHeight:'1.6'
},

metricsGrid:{
display:'grid',
gridTemplateColumns:'repeat(4,1fr)',
gap:'22px',
marginBottom:'24px'
},

metricLabel:{
color:'rgba(255,255,255,0.7)',
fontSize:'0.82rem',
textTransform:'uppercase',
letterSpacing:'0.08em',
margin:0
},

doubleGrid:{
display:'grid',
gridTemplateColumns:'1fr 1fr',
gap:'24px',
marginBottom:'24px'
},

section:{
padding:'28px'
},

filterGrid:{
display:'grid',
gridTemplateColumns:'1fr 1fr',
gap:'20px'
},

label:{
display:'block',
marginBottom:'10px',
fontSize:'0.82rem',
fontWeight:'700',
color:'rgba(255,255,255,0.6)',
letterSpacing:'0.06em',
textTransform:'uppercase'
}

};

export default AdminDashboard;