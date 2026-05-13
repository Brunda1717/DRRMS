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

await updateMatchStatus(matchId,{
delivery_status:newStatus
});

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

const COLORS=['#4fc3f7','#ff9800'];

return(

<div style={styles.page}>

<style>{`
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&family=Playfair+Display:wght@700;800&display=swap');

*{
font-family:'Poppins',sans-serif;
}

.dashboard-card{
background:rgba(255,255,255,0.06);
border:1px solid rgba(79,195,247,0.15);
backdrop-filter:blur(14px);
border-radius:24px;
transition:all 0.35s ease;
overflow:hidden;
}

.dashboard-card:hover{
transform:translateY(-6px);
border-color:#4fc3f7;
box-shadow:0 20px 50px rgba(0,0,0,0.35);
}

.glow-btn{
background:linear-gradient(135deg,#0288d1,#4fc3f7);
border:none;
color:white;
padding:12px 24px;
border-radius:50px;
font-weight:600;
transition:all 0.3s ease;
}

.glow-btn:hover{
transform:translateY(-3px) scale(1.03);
box-shadow:0 10px 25px rgba(79,195,247,0.4);
}

.metric-card{
position:relative;
overflow:hidden;
transition:all 0.35s ease;
}

.metric-card::before{
content:'';
position:absolute;
top:0;
left:-100%;
width:100%;
height:100%;
background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent);
transition:0.7s;
}

.metric-card:hover::before{
left:100%;
}

.metric-card:hover{
transform:translateY(-8px) scale(1.02);
}

.table-row{
transition:all 0.25s ease;
}

.table-row:hover{
background:rgba(79,195,247,0.08);
transform:scale(1.01);
}

.custom-input{
background:rgba(255,255,255,0.06)!important;
border:1px solid rgba(79,195,247,0.2)!important;
color:white!important;
border-radius:14px!important;
padding:12px!important;
}

.custom-input:focus{
box-shadow:0 0 0 0.2rem rgba(79,195,247,0.25)!important;
border-color:#4fc3f7!important;
}

.custom-input::placeholder{
color:#aaa;
}

.activity-item{
transition:all 0.3s ease;
border-radius:14px;
padding:12px;
}

.activity-item:hover{
background:rgba(79,195,247,0.08);
transform:translateX(6px);
}

.progress{
height:12px!important;
border-radius:30px!important;
background:rgba(255,255,255,0.08)!important;
overflow:hidden;
}

.progress-bar{
border-radius:30px!important;
}

.animate-fade{
animation:fadeUp 0.7s ease;
}

@keyframes fadeUp{
from{
opacity:0;
transform:translateY(25px);
}
to{
opacity:1;
transform:translateY(0);
}
}

::-webkit-scrollbar{
width:6px;
}

::-webkit-scrollbar-thumb{
background:#4fc3f7;
border-radius:20px;
}
`}</style>

<div className="container-fluid p-4 animate-fade">

<div className="d-flex justify-content-between align-items-center flex-wrap gap-3 mb-4">

<div>
<h1 style={styles.title}>DRRMS Admin Dashboard</h1>
<p style={styles.subtitle}>Real-time disaster monitoring & intelligent relief management</p>
</div>

<button className="glow-btn" onClick={handleLogout}>
Logout
</button>

</div>

<div className="row mb-4">

<div className="col-md-6 mb-3">
<div className="dashboard-card p-4 h-100" style={styles.blueCard} onClick={()=>navigate('/map')}>

<h3 className="fw-bold text-white mb-2">🗺 Open Disaster Map</h3>

<p className="text-light mb-0">
Monitor hotspot zones, routes & live relief tracking
</p>

</div>
</div>

<div className="col-md-6 mb-3">
<div className="dashboard-card p-4 h-100" style={styles.greenCard}>

<h3 className="fw-bold text-white mb-2">⚡ System Monitoring</h3>

<p className="text-light mb-0">
Live analytics & disaster response insights
</p>

</div>
</div>

</div>

<div className="row mb-4">

<div className="col-md-3 mb-3">
<div className="dashboard-card metric-card text-center p-4" style={styles.card1}>
<h6 className="text-light">Total Donors</h6>
<h1 className="fw-bold text-white">{analytics.totalDonors||0}</h1>
</div>
</div>

<div className="col-md-3 mb-3">
<div className="dashboard-card metric-card text-center p-4" style={styles.card2}>
<h6 className="text-light">Total NGOs</h6>
<h1 className="fw-bold text-white">{analytics.totalNGOs||0}</h1>
</div>
</div>

<div className="col-md-3 mb-3">
<div className="dashboard-card metric-card text-center p-4" style={styles.card3}>
<h6 className="text-light">Total Victims</h6>
<h1 className="fw-bold text-white">{analytics.totalVictims||0}</h1>
</div>
</div>

<div className="col-md-3 mb-3">
<div className="dashboard-card metric-card text-center p-4" style={styles.card4}>
<h6 className="text-light">Total Matches</h6>
<h1 className="fw-bold text-white">{analytics.totalMatches||0}</h1>
</div>
</div>

</div>

<div className="row mb-4">

<div className="col-lg-6 mb-4">

<div className="dashboard-card p-4 h-100">

<h4 className="fw-bold text-white mb-4">
📦 Delivery Progress
</h4>

<div className="mb-4">

<div className="d-flex justify-content-between text-light mb-2">
<span>Delivered</span>
<span>{deliveredCount}</span>
</div>

<div className="progress">
<div className="progress-bar bg-success" style={{
width:`${totalMatches?(deliveredCount/totalMatches)*100:0}%`
}}/>
</div>

</div>

<div className="mb-4">

<div className="d-flex justify-content-between text-light mb-2">
<span>In Transit</span>
<span>{transitCount}</span>
</div>

<div className="progress">
<div className="progress-bar bg-info" style={{
width:`${totalMatches?(transitCount/totalMatches)*100:0}%`
}}/>
</div>

</div>

<div>

<div className="d-flex justify-content-between text-light mb-2">
<span>Pending</span>
<span>{pendingCount}</span>
</div>

<div className="progress">
<div className="progress-bar bg-warning" style={{
width:`${totalMatches?(pendingCount/totalMatches)*100:0}%`
}}/>
</div>

</div>

</div>

</div>

<div className="col-lg-6 mb-4">

<div className="dashboard-card p-4 h-100">

<h4 className="fw-bold text-white mb-4">
📈 Delivery Analytics
</h4>

<div style={{height:'300px'}}>

<ResponsiveContainer width="100%" height="100%">

<PieChart>

<Pie
data={pieData}
cx="50%"
cy="50%"
outerRadius={90}
dataKey="value"
label
>

{pieData.map((entry,index)=>(
<Cell key={index} fill={COLORS[index%COLORS.length]}/>
))}

</Pie>

<Tooltip/>
<Legend/>

</PieChart>

</ResponsiveContainer>

</div>

</div>

</div>

</div>

<div className="dashboard-card p-4 mb-4">

<h4 className="fw-bold text-white mb-4">
🔥 Live Activity Feed
</h4>

<div style={{maxHeight:'320px',overflowY:'auto'}}>

{
matches.slice(0,8).map((m,index)=>(

<div key={index} className="activity-item border-bottom border-secondary">

<div className="d-flex justify-content-between align-items-center flex-wrap gap-2">

<div>

<h6 className="fw-bold text-white mb-1">
{m.donor_name} → {m.victim_name}
</h6>

<p className="mb-1 text-light">
{m.resource_type} | Quantity: {m.matched_quantity}
</p>

<small style={{color:'#9ecae1'}}>
{m.matched_at?new Date(m.matched_at).toLocaleString():'N/A'}
</small>

</div>

<span className={`badge rounded-pill px-3 py-2 bg-${
m.delivery_status==='delivered'
?'success'
:m.delivery_status==='in_transit'
?'info'
:'warning'
}`}>
{m.delivery_status}
</span>

</div>

</div>

))
}

</div>

</div>

<div className="dashboard-card p-4 mb-4">

<h4 className="fw-bold text-white mb-4">
🔍 Search & Filters
</h4>

<div className="row">

<div className="col-md-6 mb-3">

<label className="form-label text-light">
Filter by Status
</label>

<select
className="form-select custom-input"
value={statusFilter}
onChange={(e)=>setStatusFilter(e.target.value)}
>

<option value="all">All</option>
<option value="pending">Pending</option>
<option value="in_transit">In Transit</option>
<option value="delivered">Delivered</option>

</select>

</div>

<div className="col-md-6 mb-3">

<label className="form-label text-light">
Search by Donor
</label>

<input
type="text"
className="form-control custom-input"
placeholder="Enter donor name"
value={donorFilter}
onChange={(e)=>setDonorFilter(e.target.value)}
/>

</div>

</div>

</div>

<div className="dashboard-card p-4 mb-4">

<h4 className="fw-bold text-white mb-4">
📊 System Statistics
</h4>

<div style={{height:'320px'}}>

<ResponsiveContainer width="100%" height="100%">

<BarChart data={barData}>

<CartesianGrid strokeDasharray="3 3" stroke="#355070"/>

<XAxis dataKey="name" stroke="#fff"/>

<YAxis stroke="#fff"/>

<Tooltip/>

<Bar dataKey="count" fill="#4fc3f7" radius={[10,10,0,0]}/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

<div className="dashboard-card p-4">

<h4 className="fw-bold text-white mb-4">
🚚 Live Match Tracking
</h4>

{
loading?(
<div className="text-center text-light">
Loading matches...
</div>
):(

<div className="table-responsive">

<table className="table align-middle text-white">

<thead>

<tr style={{background:'rgba(79,195,247,0.15)'}}>

<th>ID</th>
<th>Victim</th>
<th>Donor</th>
<th>Resource</th>
<th>Priority</th>
<th>Quantity</th>
<th>Status</th>
<th>Matched Time</th>
<th>Update</th>

</tr>

</thead>

<tbody>

{
filteredMatches.map((m,index)=>(

<tr key={index} className="table-row text-white">

<td>{m.match_id}</td>

<td>{m.victim_name}</td>

<td>{m.donor_name}</td>

<td>{m.resource_type}</td>

<td>

<span className={`badge bg-${
m.priority_level==='critical'
?'danger'
:m.priority_level==='high'
?'warning'
:m.priority_level==='medium'
?'info'
:'success'
}`}>
{m.priority_level}
</span>

</td>

<td>{m.matched_quantity}</td>

<td>

<span className={`badge bg-${
m.delivery_status==='delivered'
?'success'
:m.delivery_status==='in_transit'
?'info'
:'warning'
}`}>
{m.delivery_status}
</span>

</td>

<td>
{
m.matched_at
?new Date(m.matched_at).toLocaleString()
:'N/A'
}
</td>

<td>

<select
className="form-select form-select-sm custom-input"
value={m.delivery_status}
onChange={(e)=>handleStatusChange(m.match_id,e.target.value)}
>

<option value="pending">Pending</option>
<option value="in_transit">In Transit</option>
<option value="delivered">Delivered</option>

</select>

</td>

</tr>

))
}

</tbody>

</table>

</div>

)
}

</div>

</div>

</div>

);

}

const styles={

page:{
minHeight:'100vh',
background:'linear-gradient(135deg,#012a4a 0%,#013a63 25%,#01497c 50%,#013a63 75%,#012a4a 100%)'
},

title:{
fontSize:'2.8rem',
fontWeight:'800',
color:'#fff',
fontFamily:'Playfair Display'
},

subtitle:{
color:'rgba(255,255,255,0.7)',
fontSize:'1rem'
},

blueCard:{
background:'linear-gradient(135deg,#0288d1,#4fc3f7)',
cursor:'pointer'
},

greenCard:{
background:'linear-gradient(135deg,#11998e,#38ef7d)'
},

card1:{
background:'linear-gradient(135deg,#36d1dc,#5b86e5)'
},

card2:{
background:'linear-gradient(135deg,#11998e,#38ef7d)'
},

card3:{
background:'linear-gradient(135deg,#ff416c,#ff4b2b)'
},

card4:{
background:'linear-gradient(135deg,#654ea3,#eaafc8)'
}

};

export default AdminDashboard;