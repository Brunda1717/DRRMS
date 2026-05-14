import React,{useState,useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {toast} from 'react-toastify';
import {addDonation} from '../services/api';

function DonationForm(){

const navigate=useNavigate();

const [formData,setFormData]=useState({
donor_id:'',
resource_type:'',
quantity:'',
location:''
});

useEffect(()=>{

const observer=new IntersectionObserver((entries)=>{
entries.forEach((entry)=>{
if(entry.isIntersecting){
entry.target.classList.add('show-animation');
}
});
});

document.querySelectorAll('.fade-up').forEach((el)=>{
observer.observe(el);
});

return()=>observer.disconnect();

},[]);

const handleChange=(e)=>{
setFormData({
...formData,
[e.target.name]:e.target.value
});
};

const handleSubmit=async(e)=>{

e.preventDefault();

try{

await addDonation(formData);

toast.success('Donation added successfully!');

setFormData({
donor_id:'',
resource_type:'',
quantity:'',
location:''
});

}catch(err){

console.log(err);

toast.error('Failed to add donation');

}

};

return(

<div
className="min-vh-100 d-flex align-items-center justify-content-center position-relative overflow-hidden"
style={{
background:'linear-gradient(135deg,#012a4a 0%,#013a63 25%,#01497c 50%,#013a63 75%,#012a4a 100%)',
padding:'40px 20px'
}}
>

<style>{`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

*{
font-family:'Poppins',sans-serif;
}

.fade-up{
opacity:0;
transform:translateY(40px);
transition:all 0.8s ease;
}

.show-animation{
opacity:1;
transform:translateY(0);
}

.glass-card{
width:100%;
max-width:540px;
background:rgba(255,255,255,0.08);
border:1px solid rgba(255,255,255,0.12);
backdrop-filter:blur(18px);
border-radius:28px;
padding:40px;
box-shadow:0 20px 60px rgba(0,0,0,0.35);
position:relative;
overflow:hidden;
}

.glass-card::before{
content:'';
position:absolute;
top:-100px;
right:-100px;
width:220px;
height:220px;
background:rgba(79,195,247,0.15);
border-radius:50%;
filter:blur(20px);
}

.glass-card::after{
content:'';
position:absolute;
bottom:-120px;
left:-120px;
width:240px;
height:240px;
background:rgba(2,136,209,0.12);
border-radius:50%;
filter:blur(20px);
}

.title{
font-size:2.2rem;
font-weight:800;
color:white;
margin-bottom:8px;
position:relative;
z-index:2;
}

.subtitle{
color:rgba(255,255,255,0.65);
margin-bottom:32px;
position:relative;
z-index:2;
}

.custom-label{
color:#b8e7ff;
font-size:0.92rem;
font-weight:600;
margin-bottom:10px;
}

.custom-input{
background:rgba(255,255,255,0.1)!important;
border:1px solid rgba(79,195,247,0.25)!important;
border-radius:16px!important;
padding:14px!important;
color:white!important;
transition:all 0.3s ease!important;
box-shadow:none!important;
}

.custom-input::placeholder{
color:rgba(255,255,255,0.45);
}

.custom-input:focus{
border-color:#4fc3f7!important;
background:rgba(255,255,255,0.14)!important;
transform:translateY(-2px);
box-shadow:0 0 20px rgba(79,195,247,0.25)!important;
}

.custom-input option{
color:black;
}

.submit-btn{
background:linear-gradient(135deg,#0288d1,#4fc3f7);
border:none;
border-radius:18px;
padding:14px;
font-weight:700;
font-size:1rem;
color:white;
transition:all 0.3s ease;
box-shadow:0 10px 30px rgba(79,195,247,0.3);
}

.submit-btn:hover{
transform:translateY(-4px) scale(1.02);
box-shadow:0 15px 40px rgba(79,195,247,0.45);
}

.back-btn{
background:transparent;
border:1px solid rgba(79,195,247,0.35);
border-radius:18px;
padding:12px;
font-weight:600;
color:#4fc3f7;
transition:all 0.3s ease;
}

.back-btn:hover{
background:rgba(79,195,247,0.12);
transform:translateY(-2px);
}

.floating-circle{
position:absolute;
border-radius:50%;
background:rgba(79,195,247,0.08);
animation:float 8s ease-in-out infinite;
}

.circle1{
width:280px;
height:280px;
top:-100px;
left:-100px;
}

.circle2{
width:220px;
height:220px;
bottom:-80px;
right:-80px;
animation-delay:2s;
}

.circle3{
width:120px;
height:120px;
top:20%;
right:10%;
animation-delay:4s;
}

@keyframes float{
0%{
transform:translateY(0px);
}
50%{
transform:translateY(-20px);
}
100%{
transform:translateY(0px);
}
}

.icon-box{
width:70px;
height:70px;
border-radius:20px;
background:linear-gradient(135deg,#0288d1,#4fc3f7);
display:flex;
align-items:center;
justify-content:center;
font-size:2rem;
margin-bottom:20px;
box-shadow:0 10px 30px rgba(79,195,247,0.35);
}

`}</style>

<div className="floating-circle circle1"></div>
<div className="floating-circle circle2"></div>
<div className="floating-circle circle3"></div>

<div className="glass-card fade-up">

<div className="icon-box">
🎁
</div>

<h1 className="title">
Add Donation
</h1>

<p className="subtitle">
Support disaster relief efforts by contributing essential resources to victims in need.
</p>

<form onSubmit={handleSubmit}>

<div className="mb-4">

<label className="custom-label">
Donor ID
</label>

<input
type="number"
className="form-control custom-input"
name="donor_id"
placeholder="Enter donor ID"
value={formData.donor_id}
onChange={handleChange}
required
/>

</div>

<div className="mb-4">

<label className="custom-label">
Resource Type
</label>

<select
className="form-select custom-input"
name="resource_type"
value={formData.resource_type}
onChange={handleChange}
required
>

<option value="">
Select Resource
</option>

<option value="Food Kits">
Food Kits
</option>

<option value="Water Bottles">
Water Bottles
</option>

<option value="Medicines">
Medicines
</option>

<option value="Blankets">
Blankets
</option>

<option value="Clothes">
Clothes
</option>

<option value="Shelter Kits">
Shelter Kits
</option>

</select>

</div>

<div className="mb-4">

<label className="custom-label">
Quantity
</label>

<input
type="number"
className="form-control custom-input"
name="quantity"
placeholder="Enter quantity"
value={formData.quantity}
onChange={handleChange}
required
/>

</div>

<div className="mb-4">

<label className="custom-label">
Location
</label>

<input
type="text"
className="form-control custom-input"
name="location"
placeholder="Enter donation location"
value={formData.location}
onChange={handleChange}
required
/>

</div>

<button
type="submit"
className="btn w-100 submit-btn mb-3"
>
Submit Donation
</button>

<button
type="button"
className="btn w-100 back-btn"
onClick={()=>navigate('/donor-dashboard')}
>
← Back to Dashboard
</button>

</form>

</div>

</div>

);

}

export default DonationForm;