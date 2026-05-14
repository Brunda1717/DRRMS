import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {registerVictim,getVictims} from '../services/api';
import {toast} from 'react-toastify';

function NGODashboard(){

const navigate=useNavigate();

const ngo_id=localStorage.getItem('user_id');
const name=localStorage.getItem('name');

const [victims,setVictims]=useState([]);
const [loading,setLoading]=useState(true);

const [priorityFilter,setPriorityFilter]=useState('all');
const [searchFilter,setSearchFilter]=useState('');

const [formData,setFormData]=useState({
name:'',
proof_id:'',
phone:'',
address:'',
disaster_area:'',
family_size:'',
priority_level:'medium'
});

useEffect(()=>{
fetchVictims();

const interval=setInterval(()=>{
fetchVictims();
},10000);

return()=>clearInterval(interval);
},[]);

const fetchVictims=async()=>{
try{
const res=await getVictims();
setVictims(res.data);
}catch(err){
console.log(err);
}
setLoading(false);
};

const handleChange=(e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleSubmit=async(e)=>{
e.preventDefault();

try{

await registerVictim({
...formData,
ngo_id
});

toast.success('Victim Registered Successfully!');

setFormData({
name:'',
proof_id:'',
phone:'',
address:'',
disaster_area:'',
family_size:'',
priority_level:'medium'
});

fetchVictims();

}catch(err){

console.log(err);

toast.error('Failed to Register Victim');

}
};

const handleLogout=()=>{
localStorage.clear();
navigate('/');
};

const critical=victims.filter(v=>v.priority_level==='critical').length;
const high=victims.filter(v=>v.priority_level==='high').length;
const medium=victims.filter(v=>v.priority_level==='medium').length;
const low=victims.filter(v=>v.priority_level==='low').length;

const filteredVictims=victims.filter((v)=>{

const priorityMatch=
priorityFilter==='all'
?true
:v.priority_level===priorityFilter;

const searchMatch=
searchFilter===''
?true
:v.name?.toLowerCase().includes(searchFilter.toLowerCase()) ||
v.disaster_area?.toLowerCase().includes(searchFilter.toLowerCase()) ||
v.ngo_name?.toLowerCase().includes(searchFilter.toLowerCase());

return priorityMatch && searchMatch;

});

const getPriorityColor=(level)=>{
if(level==='critical') return '#ff1744';
if(level==='high') return '#ff9100';
if(level==='medium') return '#00c853';
return '#64dd17';
};

return(

<div style={styles.page}>

<style>{`

@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=Sora:wght@600;700;800&display=swap');

*{
font-family:'Outfit',sans-serif;
box-sizing:border-box;
}

body{
margin:0;
padding:0;
overflow-x:hidden;
background:#07111f;
}

/* BACKGROUND EFFECTS */

.bg-circle{
position:absolute;
border-radius:50%;
filter:blur(90px);
opacity:0.25;
animation:float 8s ease-in-out infinite;
}

.bg1{
width:350px;
height:350px;
background:#ff6b35;
top:-100px;
left:-100px;
}

.bg2{
width:300px;
height:300px;
background:#ffd166;
bottom:-120px;
right:-80px;
animation-delay:2s;
}

.bg3{
width:250px;
height:250px;
background:#ff1744;
top:40%;
left:40%;
animation-delay:4s;
}

@keyframes float{
0%{transform:translateY(0px);}
50%{transform:translateY(20px);}
100%{transform:translateY(0px);}
}

/* GLASS CARD */

.glass-card{
background:rgba(255,255,255,0.06);
border:1px solid rgba(255,255,255,0.08);
backdrop-filter:blur(18px);
border-radius:26px;
transition:all 0.35s ease;
position:relative;
overflow:hidden;
}

.glass-card::before{
content:'';
position:absolute;
top:0;
left:-100%;
width:100%;
height:100%;
background:linear-gradient(
90deg,
transparent,
rgba(255,255,255,0.08),
transparent
);
transition:0.8s;
}

.glass-card:hover::before{
left:100%;
}

.glass-card:hover{
transform:translateY(-7px);
border-color:rgba(255,180,100,0.35);
box-shadow:0 25px 60px rgba(0,0,0,0.45);
}

/* HEADER */

.dashboard-title{
font-family:'Sora',sans-serif;
font-size:3rem;
font-weight:800;
color:#fff;
margin:0;
letter-spacing:-0.03em;
}

.dashboard-sub{
color:rgba(255,255,255,0.65);
margin-top:8px;
font-size:0.95rem;
}

/* BUTTONS */

.glow-btn{
background:linear-gradient(135deg,#ff6b35,#ff9f1c);
border:none;
padding:12px 30px;
border-radius:60px;
font-weight:700;
color:white;
font-size:0.92rem;
cursor:pointer;
transition:all 0.3s ease;
}

.glow-btn:hover{
transform:translateY(-3px) scale(1.04);
box-shadow:0 14px 35px rgba(255,107,53,0.45);
}

.outline-btn{
background:transparent;
border:1.5px solid rgba(255,255,255,0.2);
padding:12px 28px;
border-radius:60px;
font-weight:600;
color:#fff;
cursor:pointer;
transition:0.3s;
}

.outline-btn:hover{
background:rgba(255,255,255,0.08);
transform:translateY(-3px);
}

/* METRIC CARDS */

.metric-card{
padding:28px;
border-radius:24px;
overflow:hidden;
position:relative;
transition:0.35s;
}

.metric-card:hover{
transform:translateY(-8px) scale(1.03);
}

.metric-number{
font-size:2.7rem;
font-weight:800;
color:#fff;
margin:10px 0 0;
font-family:'Sora',sans-serif;
}

/* ACTION CARDS */

.action-card{
padding:30px;
border-radius:26px;
cursor:pointer;
transition:all 0.35s ease;
position:relative;
overflow:hidden;
}

.action-card:hover{
transform:translateY(-8px);
box-shadow:0 24px 50px rgba(0,0,0,0.4);
}

.action-card::after{
content:'';
position:absolute;
inset:0;
background:rgba(255,255,255,0);
transition:0.3s;
}

.action-card:hover::after{
background:rgba(255,255,255,0.06);
}

/* INPUTS */

.custom-input{
background:rgba(255,255,255,0.06)!important;
border:1.5px solid rgba(255,255,255,0.08)!important;
color:#fff!important;
border-radius:16px!important;
padding:14px!important;
transition:0.25s!important;
}

.custom-input:focus{
border-color:#ff9f1c!important;
box-shadow:0 0 0 4px rgba(255,159,28,0.18)!important;
background:rgba(255,255,255,0.08)!important;
}

.custom-input::placeholder{
color:rgba(255,255,255,0.35);
}

.custom-input option{
background:#151c2f;
color:white;
}

/* TABLE */

.custom-table{
width:100%;
border-collapse:separate;
border-spacing:0 10px;
}

.custom-table thead th{
padding:16px;
background:rgba(255,159,28,0.12);
color:#ffd166;
font-size:0.78rem;
text-transform:uppercase;
letter-spacing:0.08em;
border:none;
}

.custom-table thead th:first-child{
border-radius:14px 0 0 14px;
}

.custom-table thead th:last-child{
border-radius:0 14px 14px 0;
}

.custom-table tbody tr{
background:rgba(255,255,255,0.04);
transition:0.3s;
}

.custom-table tbody tr:hover{
background:rgba(255,159,28,0.08);
transform:scale(1.01);
}

.custom-table tbody td{
padding:16px;
color:#f5f5f5;
border-top:1px solid rgba(255,255,255,0.05);
border-bottom:1px solid rgba(255,255,255,0.05);
}

.custom-table tbody td:first-child{
border-left:1px solid rgba(255,255,255,0.05);
border-radius:14px 0 0 14px;
}

.custom-table tbody td:last-child{
border-right:1px solid rgba(255,255,255,0.05);
border-radius:0 14px 14px 0;
}

/* BADGE */

.priority-pill{
padding:7px 16px;
border-radius:50px;
font-size:0.75rem;
font-weight:700;
letter-spacing:0.05em;
text-transform:uppercase;
display:inline-block;
}

/* ACTIVITY */

.activity-card{
padding:16px;
border-radius:18px;
transition:0.3s;
border:1px solid rgba(255,255,255,0.05);
}

.activity-card:hover{
background:rgba(255,159,28,0.08);
transform:translateX(6px);
}

/* PROGRESS */

.progress-track{
height:10px;
background:rgba(255,255,255,0.08);
border-radius:30px;
overflow:hidden;
}

.progress-fill{
height:100%;
border-radius:30px;
transition:width 0.6s ease;
}

/* ANIMATIONS */

.fade-up{
animation:fadeUp 0.7s ease both;
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

/* SCROLLBAR */

::-webkit-scrollbar{
width:5px;
}

::-webkit-scrollbar-thumb{
background:#ff9f1c;
border-radius:20px;
}

`}</style>

<div className="bg-circle bg1"/>
<div className="bg-circle bg2"/>
<div className="bg-circle bg3"/>

<div style={styles.container} className="fade-up">

{/* HEADER */}

<div style={styles.header}>

<div>

<h1 className="dashboard-title">
NGO Command Center
</h1>

<p className="dashboard-sub">
Welcome back, {name} · Relief & Victim Management System
</p>

</div>

<div style={{display:'flex',gap:'14px',flexWrap:'wrap'}}>

<button
className="outline-btn"
onClick={()=>navigate('/')}
>
Home
</button>

<button
className="glow-btn"
onClick={handleLogout}
>
Logout
</button>

</div>

</div>

{/* ACTION CARDS */}

<div style={styles.actionGrid}>

<div
className="action-card"
style={{
background:'linear-gradient(135deg,#ff6b35,#ff9f1c)'
}}
onClick={()=>navigate('/request')}
>

<div style={{fontSize:'2.2rem'}}>📦</div>

<h3 style={styles.actionTitle}>
Create Resource Request
</h3>

<p style={styles.actionDesc}>
Request food, water, medicine and emergency resources instantly.
</p>

</div>

<div
className="action-card"
style={{
background:'linear-gradient(135deg,#7b2ff7,#f107a3)'
}}
onClick={()=>navigate('/matches')}
>

<div style={{fontSize:'2.2rem'}}>🚚</div>

<h3 style={styles.actionTitle}>
Track Deliveries
</h3>

<p style={styles.actionDesc}>
Monitor live delivery status and donor-resource matches.
</p>

</div>

</div>

{/* METRICS */}

<div style={styles.metricGrid}>

{[
{
label:'Total Victims',
value:victims.length,
bg:'linear-gradient(135deg,#ff416c,#ff4b2b)'
},
{
label:'Critical',
value:critical,
bg:'linear-gradient(135deg,#b31217,#e52d27)'
},
{
label:'High Priority',
value:high,
bg:'linear-gradient(135deg,#f7971e,#ffd200)'
},
{
label:'Medium / Low',
value:medium+low,
bg:'linear-gradient(135deg,#11998e,#38ef7d)'
}
].map((m,i)=>(

<div
key={i}
className="metric-card glass-card"
style={{background:m.bg}}
>

<p style={{
margin:0,
color:'rgba(255,255,255,0.75)',
fontSize:'0.85rem',
textTransform:'uppercase',
letterSpacing:'0.08em'
}}>
{m.label}
</p>

<h1 className="metric-number">
{m.value}
</h1>

</div>

))}

</div>

{/* PRIORITY SECTION */}

<div className="glass-card" style={styles.section}>

<h3 style={styles.sectionTitle}>
📊 Priority Breakdown
</h3>

{[
{
label:'Critical',
count:critical,
color:'#ff1744'
},
{
label:'High',
count:high,
color:'#ff9100'
},
{
label:'Medium',
count:medium,
color:'#00c853'
},
{
label:'Low',
count:low,
color:'#64dd17'
}
].map((item,i)=>(

<div key={i} style={{marginBottom:'22px'}}>

<div style={{
display:'flex',
justifyContent:'space-between',
marginBottom:'8px'
}}>

<span style={{color:'#fff'}}>
{item.label}
</span>

<span style={{color:'rgba(255,255,255,0.6)'}}>
{item.count} Victims
</span>

</div>

<div className="progress-track">

<div
className="progress-fill"
style={{
width:`${victims.length?(item.count/victims.length)*100:0}%`,
background:item.color
}}
/>

</div>

</div>

))}

</div>

{/* RECENT ACTIVITY */}

<div className="glass-card" style={styles.section}>

<h3 style={styles.sectionTitle}>
🔥 Recent Victims
</h3>

<div style={{maxHeight:'320px',overflowY:'auto'}}>

{victims.slice(0,6).map((v,i)=>(

<div
key={i}
className="activity-card"
style={{marginBottom:'14px'}}
>

<div style={{
display:'flex',
justifyContent:'space-between',
alignItems:'center',
flexWrap:'wrap',
gap:'10px'
}}>

<div>

<h5 style={{
margin:'0 0 6px',
color:'#fff',
fontWeight:'700'
}}>
{v.name}
</h5>

<p style={{
margin:'0 0 4px',
color:'rgba(255,255,255,0.6)',
fontSize:'0.85rem'
}}>
{v.disaster_area} · Family of {v.family_size}
</p>

<small style={{
color:'rgba(255,255,255,0.4)'
}}>
NGO : {v.ngo_name}
</small>

</div>

<span
className="priority-pill"
style={{
background:`${getPriorityColor(v.priority_level)}22`,
color:getPriorityColor(v.priority_level),
border:`1px solid ${getPriorityColor(v.priority_level)}55`
}}
>
{v.priority_level}
</span>

</div>

</div>

))}

</div>

</div>

{/* FORM */}

<div className="glass-card" style={styles.section}>

<h3 style={styles.sectionTitle}>
➕ Register New Victim
</h3>

<form onSubmit={handleSubmit}>

<div style={styles.formGrid}>

<div>

<label style={styles.label}>
Victim Name
</label>

<input
type="text"
className="form-control custom-input"
name="name"
value={formData.name}
onChange={handleChange}
placeholder="Enter victim name"
required
/>

</div>

<div>

<label style={styles.label}>
Proof ID
</label>

<input
type="text"
className="form-control custom-input"
name="proof_id"
value={formData.proof_id}
onChange={handleChange}
placeholder="Aadhaar / Voter ID"
required
/>

</div>

<div>

<label style={styles.label}>
Phone Number
</label>

<input
type="text"
className="form-control custom-input"
name="phone"
value={formData.phone}
onChange={handleChange}
placeholder="Enter phone number"
required
/>

</div>

<div>

<label style={styles.label}>
Disaster Area
</label>

<input
type="text"
className="form-control custom-input"
name="disaster_area"
value={formData.disaster_area}
onChange={handleChange}
placeholder="Enter disaster area"
required
/>

</div>

<div>

<label style={styles.label}>
Family Size
</label>

<input
type="number"
className="form-control custom-input"
name="family_size"
value={formData.family_size}
onChange={handleChange}
placeholder="Family members"
required
/>

</div>

<div>

<label style={styles.label}>
Priority Level
</label>

<select
className="form-select custom-input"
name="priority_level"
value={formData.priority_level}
onChange={handleChange}
>

<option value="low">
Low
</option>

<option value="medium">
Medium
</option>

<option value="high">
High
</option>

<option value="critical">
Critical
</option>

</select>

</div>

</div>

<div style={{marginTop:'20px'}}>

<label style={styles.label}>
Address
</label>

<textarea
rows="4"
className="form-control custom-input"
name="address"
value={formData.address}
onChange={handleChange}
placeholder="Enter full address"
required
/>

</div>

<button
type="submit"
className="glow-btn"
style={{marginTop:'24px'}}
>
Register Victim →
</button>

</form>

</div>

{/* TABLE */}

<div className="glass-card" style={styles.section}>

<div style={{
display:'flex',
justifyContent:'space-between',
alignItems:'center',
marginBottom:'24px',
flexWrap:'wrap',
gap:'16px'
}}>

<h3 style={styles.sectionTitle}>
👥 Registered Victims
</h3>

<div style={{
display:'flex',
gap:'12px',
flexWrap:'wrap'
}}>

<select
className="form-select custom-input"
style={{width:'170px'}}
value={priorityFilter}
onChange={(e)=>setPriorityFilter(e.target.value)}
>

<option value="all">
All Priorities
</option>

<option value="critical">
Critical
</option>

<option value="high">
High
</option>

<option value="medium">
Medium
</option>

<option value="low">
Low
</option>

</select>

<input
type="text"
className="form-control custom-input"
style={{width:'220px'}}
placeholder="Search victims..."
value={searchFilter}
onChange={(e)=>setSearchFilter(e.target.value)}
/>

</div>

</div>

{loading?(
<div style={{
textAlign:'center',
padding:'40px',
color:'rgba(255,255,255,0.5)'
}}>
Loading victims...
</div>
):(

<div style={{overflowX:'auto'}}>

<table className="custom-table">

<thead>

<tr>

<th>Name</th>
<th>Area</th>
<th>Phone</th>
<th>Family</th>
<th>Priority</th>
<th>NGO</th>

</tr>

</thead>

<tbody>

{filteredVictims.map((v,index)=>(

<tr key={index}>

<td style={{fontWeight:'700'}}>
{v.name}
</td>

<td>
{v.disaster_area}
</td>

<td>
{v.phone}
</td>

<td>
{v.family_size}
</td>

<td>

<span
className="priority-pill"
style={{
background:`${getPriorityColor(v.priority_level)}22`,
color:getPriorityColor(v.priority_level),
border:`1px solid ${getPriorityColor(v.priority_level)}55`
}}
>
{v.priority_level}
</span>

</td>

<td>
{v.ngo_name}
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
background:`
linear-gradient(rgba(7,17,31,0.92),rgba(7,17,31,0.96)),
url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=2070&auto=format&fit=crop')
`,
backgroundSize:'cover',
backgroundPosition:'center',
position:'relative',
overflow:'hidden'
},

container:{
maxWidth:'1450px',
margin:'0 auto',
padding:'32px 24px',
position:'relative',
zIndex:2
},

header:{
display:'flex',
justifyContent:'space-between',
alignItems:'center',
marginBottom:'34px',
flexWrap:'wrap',
gap:'20px'
},

actionGrid:{
display:'grid',
gridTemplateColumns:'1fr 1fr',
gap:'22px',
marginBottom:'26px'
},

actionTitle:{
color:'#fff',
fontWeight:'800',
fontSize:'1.3rem',
margin:'14px 0 8px'
},

actionDesc:{
color:'rgba(255,255,255,0.75)',
fontSize:'0.92rem',
margin:0
},

metricGrid:{
display:'grid',
gridTemplateColumns:'repeat(4,1fr)',
gap:'20px',
marginBottom:'26px'
},

section:{
padding:'30px',
marginBottom:'26px'
},

sectionTitle:{
fontFamily:'Sora,sans-serif',
fontWeight:'700',
fontSize:'1.2rem',
color:'#fff',
marginBottom:'24px'
},

formGrid:{
display:'grid',
gridTemplateColumns:'1fr 1fr',
gap:'20px'
},

label:{
display:'block',
marginBottom:'10px',
color:'rgba(255,255,255,0.7)',
fontSize:'0.86rem',
fontWeight:'600'
}

};

export default NGODashboard;