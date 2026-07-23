import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { addDonation } from '../services/api';

function DonationForm() {

const navigate = useNavigate();

const [formData, setFormData] = useState({
donor_id: '',
resource_type: '',
quantity: '',
location: ''
});

useEffect(() => {

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
if (entry.isIntersecting) {
entry.target.classList.add('show-animation');
}
});
});

document.querySelectorAll('.fade-up').forEach((el) => {
observer.observe(el);
});

return () => observer.disconnect();

}, []);

const handleChange = (e) => {
setFormData({
...formData,
[e.target.name]: e.target.value
});
};

const handleSubmit = async (e) => {

e.preventDefault();

try {

await addDonation(formData);

toast.success('Donation added successfully!');

setFormData({
donor_id: '',
resource_type: '',
quantity: '',
location: ''
});

} catch (err) {

console.log(err);

toast.error('Failed to add donation');

}

};

return (

<div className="main-container">

<style>{`

@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family:'Poppins',sans-serif;
}

body{
overflow-x:hidden;
}

/* MAIN PAGE */

.main-container{
min-height:100vh;
display:flex;
justify-content:center;
align-items:center;
padding:40px 20px;
position:relative;
overflow:hidden;

/* Background Image */

background:
linear-gradient(
rgba(0,0,0,0.72),
rgba(0,0,0,0.78)
),
url('https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?q=80&w=1974&auto=format&fit=crop');

background-size:cover;
background-position:center;
background-repeat:no-repeat;
}

/* Orange Glow */

.main-container::before{
content:'';
position:absolute;
top:-150px;
left:-150px;
width:450px;
height:450px;
background:rgba(255,120,0,0.28);
filter:blur(120px);
border-radius:50%;
animation:glowFloat 8s ease-in-out infinite;
}

.main-container::after{
content:'';
position:absolute;
bottom:-200px;
right:-200px;
width:500px;
height:500px;
background:rgba(255,170,0,0.18);
filter:blur(130px);
border-radius:50%;
animation:glowFloat 10s ease-in-out infinite;
}

@keyframes glowFloat{

0%{
transform:translateY(0px);
}

50%{
transform:translateY(-25px);
}

100%{
transform:translateY(0px);
}

}

/* Floating Elements */

.bg-animation{
position:absolute;
width:100%;
height:100%;
top:0;
left:0;
overflow:hidden;
z-index:0;
}

.bg-animation span{
position:absolute;
display:block;
border-radius:50%;
background:rgba(255,255,255,0.06);
backdrop-filter:blur(5px);
animation:floatUp 18s linear infinite;
bottom:-180px;
}

.bg-animation span:nth-child(1){
left:12%;
width:120px;
height:120px;
animation-delay:0s;
}

.bg-animation span:nth-child(2){
left:30%;
width:80px;
height:80px;
animation-delay:2s;
animation-duration:14s;
}

.bg-animation span:nth-child(3){
left:52%;
width:140px;
height:140px;
animation-delay:4s;
}

.bg-animation span:nth-child(4){
left:72%;
width:90px;
height:90px;
animation-delay:1s;
}

.bg-animation span:nth-child(5){
left:88%;
width:150px;
height:150px;
animation-delay:5s;
}

@keyframes floatUp{

0%{
transform:translateY(0) rotate(0deg);
opacity:1;
}

100%{
transform:translateY(-1200px) rotate(720deg);
opacity:0;
}

}

/* Fade Animation */

.fade-up{
opacity:0;
transform:translateY(60px);
transition:all 1s ease;
}

.show-animation{
opacity:1;
transform:translateY(0);
}

/* CARD */

.glass-card{
position:relative;
width:100%;
max-width:620px;
padding:55px 50px;
border-radius:35px;

background:rgba(18,18,18,0.42);

backdrop-filter:blur(18px);

border:1px solid rgba(255,255,255,0.08);

box-shadow:
0 10px 50px rgba(0,0,0,0.45),
0 0 40px rgba(255,120,0,0.12);

overflow:hidden;
z-index:2;

animation:cardFloat 5s ease-in-out infinite;
}

@keyframes cardFloat{

0%{
transform:translateY(0px);
}

50%{
transform:translateY(-8px);
}

100%{
transform:translateY(0px);
}

}

/* Light Reflection */

.glass-card::before{
content:'';
position:absolute;
top:-120px;
right:-120px;
width:260px;
height:260px;
background:rgba(255,170,0,0.08);
border-radius:50%;
filter:blur(40px);
}

.glass-card::after{
content:'';
position:absolute;
bottom:-140px;
left:-140px;
width:280px;
height:280px;
background:rgba(255,94,0,0.08);
border-radius:50%;
filter:blur(45px);
}

/* ICON */

.icon-box{
width:95px;
height:95px;
display:flex;
justify-content:center;
align-items:center;
font-size:3rem;
border-radius:28px;

background:
linear-gradient(
135deg,
#ff7b00,
#ffb347
);

box-shadow:
0 10px 30px rgba(255,140,0,0.35);

margin-bottom:28px;

animation:pulse 2s infinite;

position:relative;
z-index:2;
}

@keyframes pulse{

0%{
transform:scale(1);
}

50%{
transform:scale(1.07);
}

100%{
transform:scale(1);
}

}

/* TEXT */

.title{
font-size:3rem;
font-weight:800;
margin-bottom:10px;

background:
linear-gradient(
to right,
#ffffff,
#ffd9a0
);

-webkit-background-clip:text;
-webkit-text-fill-color:transparent;

position:relative;
z-index:2;
}

.subtitle{
font-size:1rem;
line-height:1.9;
color:rgba(255,255,255,0.78);
margin-bottom:35px;
position:relative;
z-index:2;
}

/* LABELS */

.custom-label{
display:block;
margin-bottom:10px;
font-size:0.95rem;
font-weight:600;
color:#ffd59e;
}

/* INPUTS */

.custom-input{
width:100%;
padding:16px 18px !important;

border-radius:18px !important;

background:rgba(255,255,255,0.07) !important;

border:1px solid rgba(255,255,255,0.08) !important;

color:white !important;

font-size:0.95rem !important;

transition:all 0.35s ease !important;

box-shadow:none !important;
}

.custom-input::placeholder{
color:rgba(255,255,255,0.4);
}

.custom-input:focus{

background:rgba(255,255,255,0.11) !important;

border-color:#ffb347 !important;

transform:translateY(-2px);

box-shadow:
0 0 18px rgba(255,170,0,0.2) !important;
}

.custom-input option{
color:black;
}

/* BUTTONS */

.submit-btn{
width:100%;
padding:16px;
border:none;
border-radius:18px;

background:
linear-gradient(
135deg,
#ff6b00,
#ffb347
);

font-size:1rem;
font-weight:700;
color:white;

transition:all 0.35s ease;

box-shadow:
0 10px 30px rgba(255,120,0,0.3);
}

.submit-btn:hover{
transform:translateY(-4px);
box-shadow:
0 16px 40px rgba(255,140,0,0.45);
}

.back-btn{
width:100%;
padding:15px;

border-radius:18px;

background:rgba(255,255,255,0.06);

border:1px solid rgba(255,255,255,0.08);

color:white;

font-weight:600;

transition:all 0.35s ease;
}

.back-btn:hover{

background:rgba(255,255,255,0.12);

transform:translateY(-3px);
}

/* RESPONSIVE */

@media(max-width:768px){

.glass-card{
padding:35px 25px;
}

.title{
font-size:2.2rem;
}

.icon-box{
width:75px;
height:75px;
font-size:2.3rem;
}

.subtitle{
font-size:0.92rem;
}

}

`}</style>

{/* Floating Shapes */}

<div className="bg-animation">

<span></span>
<span></span>
<span></span>
<span></span>
<span></span>

</div>

{/* Main Card */}

<div className="glass-card fade-up">

<div className="icon-box">
🎁
</div>

<h1 className="title">
Add Donation
</h1>

<p className="subtitle">
Help families affected by disasters with food, water,
medicine, clothes, and shelter essentials.
Your contribution can bring hope to someone in need.
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
className="btn submit-btn mb-3"
>
✨ Submit Donation
</button>

<button
type="button"
className="btn back-btn"
onClick={() => navigate('/donor-dashboard')}
>
← Back to Dashboard
</button>

</form>

</div>

</div>

);

}

export default DonationForm;