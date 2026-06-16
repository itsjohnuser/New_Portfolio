// ── CURSOR ──
const cd=document.getElementById("c-dot"),cr=document.getElementById("c-ring");
let mx=0,my=0,rx=0,ry=0;
document.addEventListener("mousemove",e=>{mx=e.clientX;my=e.clientY;cd.style.left=mx+"px";cd.style.top=my+"px"});
(function animR(){rx+=(mx-rx)*.11;ry+=(my-ry)*.11;cr.style.left=rx+"px";cr.style.top=ry+"px";requestAnimationFrame(animR)})();
document.querySelectorAll("a,button,.btn,.pf-btn,.blog-tab,.aq,.proj-link").forEach(el=>{
  el.addEventListener("mouseenter",()=>document.body.classList.add("hovering"));
  el.addEventListener("mouseleave",()=>document.body.classList.remove("hovering"));
});

// ── PARTICLES ──
const canvas=document.getElementById("particles-canvas");
const ctx=canvas.getContext("2d");
let W=canvas.width=window.innerWidth,H=canvas.height=window.innerHeight;
window.addEventListener("resize",()=>{W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight});

// Theme-aware particle colors
window._particleColor = "rgba(108,99,255,.6)";
window._lineColor = "rgba(108,99,255,";

const pts=Array.from({length:55},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}));

function drawParticles(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;
    if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=window._particleColor;
    ctx.fill();
  });
  pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
    const d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<120){
      ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);
      ctx.strokeStyle=window._lineColor + (0.15*(1-d/120))+")";
      ctx.lineWidth=.5;ctx.stroke();
    }
  }));
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── NAV SCROLL ──
const navbar=document.getElementById("navbar");
const sections=document.querySelectorAll("section,[id]");
window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled",window.scrollY>50);
  let cur="";
  sections.forEach(s=>{if(window.scrollY>=s.offsetTop-120)cur=s.id});
  document.querySelectorAll(".nav-links a").forEach(a=>{
    a.classList.toggle("active",a.getAttribute("href")==="#"+cur);
  });
});

// ── MOBILE MENU ──
document.getElementById("hamburger").addEventListener("click",()=>{
  document.getElementById("mobileMenu").classList.toggle("open");
});
function closeMobile(){document.getElementById("mobileMenu").classList.remove("open")}

// ── SMOOTH SCROLL ──
document.querySelectorAll("a[href^='#']").forEach(a=>{
  a.addEventListener("click",e=>{
    const id=a.getAttribute("href");
    if(id==="#")return;
    const el=document.querySelector(id);
    if(el){e.preventDefault();el.scrollIntoView({behavior:"smooth"});closeMobile();}
  });
});

// ── SCROLL REVEAL ──
const ro=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.1});
document.querySelectorAll(".reveal").forEach(el=>ro.observe(el));

// ── ANIMATED BARS ──
const bo=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting){e.target.style.animationPlayState="running";}});
},{threshold:.4});
document.querySelectorAll(".sk-bar,.bar-fill").forEach(b=>{b.style.animationPlayState="paused";bo.observe(b);});

// ── PORTFOLIO FILTER ──
function filterP(cat,btn){
  document.querySelectorAll(".pf-btn").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".proj-card").forEach(c=>{
    c.style.display=(cat==="all"||c.dataset.cat===cat)?"":"none";
  });
}

// ── BLOG FILTER ──
function filterBlog(cat,btn){
  document.querySelectorAll(".blog-tab").forEach(b=>b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll(".blog-card").forEach(c=>{
    c.style.display=(cat==="all"||c.dataset.bcat===cat)?"":"none";
  });
}

// ── AI CHAT — Smart Knowledge Base ──
const KB = [
  {
    k:["skill","technology","tech stack","know","expertise","use","proficient","tools"],
    a:"John Mark's core expertise is in Frontend Engineering: JavaScript (ES6+), React.js, jQuery, HTML5, CSS3, Bootstrap, and Tailwind CSS. He's also skilled in UI/UX design translation (Figma, Adobe XD), Performance Engineering (95% speed leap), and tools like Git, Docker, and Linux."
  },
  {
    k:["react","frontend","front end","ui","interface","component","hooks","tailwind"],
    a:"With 2+ years of experience, John Mark is a specialized Frontend Engineer. He architects interactive, mobile-first UIs using React.js and Tailwind CSS, and has a proven track record of optimizing page load times from 45s to 2s (a 95% speed leap) at Voola Software Solutions Pvt. Ltd."
  },
  {
    k:["voola","experience","work","job","junior","company","years","professional","voola solutions"],
    a:"John Mark is a Junior Software Engineer at Voola Software Solutions Pvt. Ltd. (since Sep 2025). He also interned there from Jan 2024 to Jan 2025. He's expert at UI development, 95% performance optimization, and custom WordPress engineering."
  },
  {
    k:["ai","ml","data","cdac","hpc","visualization","visualizer","ocean","bangalore"],
    a:"John Mark completed a Trainee program in HPC & AI at C-DAC Bangalore (Mar–Aug 2025). He developed the AI for Ocean Cleanup Visualizer, optimizing ingestion scripts by 80% and managing complex spatial data visualization."
  },
  {
    k:["project","portfolio","wekeza","chimcare","ocean","komhar","built","stock"],
    a:"Featured projects: Komhar (Professional Services), Wekeza (Multilingual Fintech with live stock data), Chimcare (US Commercial Infrastructure across 15 states), and AI for Ocean Cleanup Visualizer."
  },
  {
    k:["certif","meta","microsoft","udemy","july","2024","2025","2023"],
    a:"His certifications: Meta Front-End Developer Professional (Coursera, July 2024), SOAR – AI for Educators (Microsoft, Dec 2025), and Full Stack Web Development (Udemy, Jan 2023)."
  },
  {
    k:["hire","why","recommend","best","suitable","fit","performance","speed"],
    a:"You should hire John Mark for his rare mix of high-end UI/UX skills and rigorous performance engineering. He achieved a 95% speed leap in data execution! Expert in React, Tailwind, and Figma-to-code translation, based in Hyderabad."
  },
  {
    k:["education","degree","college","btech","cgpa","audisankara","ap"],
    a:"He holds a B.Tech in Computer Science and Engineering from Audisankara Institute of Technology, AP (2019–2023) with a CGPA of 7.1/10.0."
  },
  {
    k:["contact","email","phone","reach","linkedin","connect","number"],
    a:"Reach John Mark at: 📧 johnarumulla@gmail.com | 📱 +91 8142421367 | 💼 linkedin.com/in/johnmarkarumulla. He's based in Hyderabad and ready to start immediately!"
  }
];

function getAIReply(txt) {
  const t = txt.toLowerCase();
  for (const entry of KB) {
    if (entry.k.some(k => t.includes(k))) return entry.a;
  }
  const fallbacks = [
    "Great question! John Mark is a Frontend Engineer specializing in React.js and UI optimization, based in Hyderabad with 2+ years of experience. Try asking about his skills, projects, certifications, or why you should hire him!",
    "I'd be happy to help! John Mark combines React.js frontend expertise with high-concurrency data visualization skills. Ask me about his technical skills, work experience at Voola, projects like Komhar, or how to get in touch.",
    "John Mark is a performance-driven developer ready to join your team immediately! Try asking about his Voola experience or his React skills."
  ];
  return fallbacks[Math.floor(Math.random() * fallbacks.length)];
}

let aiBusy = false;
function addAIMsg(role, text) {
  const d = document.createElement("div");
  d.className = "cmsg " + role;
  d.innerHTML = '<div class="cav ' + role + '">' + (role === "ai" ? "AI" : "You") + '</div><div class="cbub">' + text + '</div>';
  document.getElementById("aiMsgs").appendChild(d);
  document.getElementById("aiMsgs").scrollTop = 99999;
}
function showTyping() {
  const d = document.createElement("div");
  d.className = "cmsg ai";
  d.id = "aiTyping";
  d.innerHTML = '<div class="cav ai">AI</div><div class="cbub"><div class="typing-dots"><span></span><span></span><span></span></div></div>';
  document.getElementById("aiMsgs").appendChild(d);
  document.getElementById("aiMsgs").scrollTop = 99999;
}
function rmTyping() { const t = document.getElementById("aiTyping"); if (t) t.remove(); }

async function sendAI() {
  const inp = document.getElementById("aiIn");
  const txt = inp.value.trim();
  if (!txt || aiBusy) return;
  inp.value = "";
  aiBusy = true;
  addAIMsg("user", txt);
  showTyping();
  document.getElementById("aiQuick").style.display = "none";
  await new Promise(res => setTimeout(res, 700 + Math.random() * 600));
  const reply = getAIReply(txt);
  rmTyping();
  addAIMsg("ai", reply);
  aiBusy = false;
}
function sendAQ(t) { document.getElementById("aiIn").value = t; sendAI(); }
document.getElementById("aiIn").addEventListener("keydown", e => { if (e.key === "Enter") sendAI(); });

// ── THEME TOGGLE ──
function updateParticleColor(mode) {
  window._particleColor = mode === "day" ? "rgba(108,99,255,0.35)" : "rgba(108,99,255,0.6)";
  window._lineColor = mode === "day" ? "rgba(108,99,255,0.1)" : "rgba(108,99,255,0.15)";
}
function applyTheme(mode) {
  document.body.classList.toggle("day-mode", mode === "day");
  document.getElementById("theme-icon").textContent = mode === "day" ? "☀️" : "🌙";
  localStorage.setItem("jm-theme", mode);
  updateParticleColor(mode);
}
function toggleTheme() {
  const isDay = document.body.classList.contains("day-mode");
  applyTheme(isDay ? "night" : "day");
}
applyTheme(localStorage.getItem("jm-theme") || (window.matchMedia("(prefers-color-scheme: light)").matches ? "day" : "night"));

// ── MATRIX RAIN ──
(function initMatrix() {
  const mc = document.getElementById("matrix-canvas");
  if (!mc) return;
  const mctx = mc.getContext("2d");
  function resizeMatrix() { mc.width = mc.parentElement.offsetWidth; mc.height = mc.parentElement.offsetHeight; }
  resizeMatrix();
  window.addEventListener("resize", resizeMatrix);
  const chars = "01アイウエオカキクケコABCDEF∇σ∫∂λθΣΠ";
  const cols = Math.floor(mc.width / 14);
  const drops = Array(cols).fill(1);
  setInterval(() => {
    mctx.fillStyle = "rgba(0,0,0,0.05)";
    mctx.fillRect(0, 0, mc.width, mc.height);
    mctx.fillStyle = "#6c63ff";
    mctx.font = "11px JetBrains Mono, monospace";
    drops.forEach((y, i) => {
      mctx.fillText(chars[Math.floor(Math.random() * chars.length)], i * 14, y * 14);
      if (y * 14 > mc.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 60);
})();

// ── HERO TYPEWRITER ──
(function heroTypewriter() {
  const roles = [
    "// Frontend Engineer · React Expert",
    "// UI/UX Specialist · Figma & XD",
    "// Performance Engineer · 95% Speedup",
    "// Data Visualization · Python & HPC",
    "// React.js Architect · Mobile-First"
  ];
  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById("heroRole");
  if (!el) return;
  function type() {
    const current = roles[ri];
    el.textContent = current.slice(0, ci + (deleting ? -1 : 1));
    ci += deleting ? -1 : 1;
    if (!deleting && ci === current.length) { deleting = true; setTimeout(type, 2200); }
    else if (deleting && ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); }
    else { setTimeout(type, deleting ? 28 : 55); }
  }
  setTimeout(type, 1200);
})();

// ── INTERACTIVE SPARKS ──
document.addEventListener("click", e => {
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement("div");
    spark.style.cssText = `position:fixed;left:${e.clientX}px;top:${e.clientY}px;width:${4+Math.random()*5}px;height:${4+Math.random()*5}px;background:var(--accent);border-radius:50%;pointer-events:none;z-index:9997;transform:translate(-50%,-50%);animation:spark-fade .6s ease forwards;`;
    const angle = (i / 8) * Math.PI * 2, dist = 30 + Math.random() * 40;
    spark.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    spark.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 650);
  }
});
const sparkStyle = document.createElement("style");
sparkStyle.textContent = "@keyframes spark-fade { 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0)} }";
document.head.appendChild(sparkStyle);
