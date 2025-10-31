const API_BASE = 'http://localhost:5000/api';


async function loadServices() {
const el = document.getElementById('services-list');
if(!el) return;
try{
const res = await fetch(`${API_BASE}/services`);
const arr = await res.json();
el.innerHTML = arr.map(s => `
<div class="card">
<div class="service-title"><strong>${s.title}</strong></div>
<div class="small">${s.short || ''}</div>
<p>${s.description || ''}</p>
</div>
`).join('');
}catch(e){ el.innerHTML = '<p>Could not load services.</p>'; }
}


async function loadOpportunities(){
const el = document.getElementById('opps-list');
if(!el) return;
try{
const res = await fetch(`${API_BASE}/opportunities`);
const arr = await res.json();
el.innerHTML = arr.map(o=>`
<div class="card">
<strong>${o.role}</strong>
<div class="small">${o.type} • ${o.duration || 'N/A'}</div>
<p>${o.description || ''}</p>
<button class="btn" onclick="applyOppt('${o._id}')">Apply</button>
</div>
`).join('');
}catch(e){ el.innerHTML = '<p>Could not load opportunities.</p>'; }
}


async function applyOppt(id){
const name = prompt('Your name');
const email = prompt('Email');
const resume = prompt('Link to resume (optional)');
if(!name || !email) return alert('Name and email required');
try{
const res = await fetch(`${API_BASE}/opportunities/${id}/apply`,{
method:'POST',headers:{'content-type':'application/json'},body: JSON.stringify({name,email,resume})
});
if(res.ok) alert('Application submitted'); else alert('Failed to apply');
}catch(e){alert('Network error')}
}


async function submitContactForm(e){
e.preventDefault();
const f = e.target;
const data = { name:f.name.value, email:f.email.value, message:f.message.value };
try{
const res = await fetch(`${API_BASE}/messages`, { method:'POST', headers:{'content-type':'application/json'}, body: JSON.stringify(data) });
if(res.ok){ alert('Message sent'); f.reset(); } else alert('Failed to send');
}catch(e){alert('Network error')}
}


document.addEventListener('DOMContentLoaded', ()=>{
loadServices(); loadOpportunities();
const contactForm = document.getElementById('contact-form');
if(contactForm) contactForm.addEventListener('submit', submitContactForm);
});