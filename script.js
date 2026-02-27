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
const pts=Array.from({length:55},()=>({x:Math.random()*W,y:Math.random()*H,r:Math.random()*1.5+.5,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}));
function drawParticles(){
  ctx.clearRect(0,0,W,H);
  pts.forEach(p=>{
    p.x+=p.vx;p.y+=p.vy;
    if(p.x<0)p.x=W;if(p.x>W)p.x=0;
    if(p.y<0)p.y=H;if(p.y>H)p.y=0;
    ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle="rgba(108,99,255,.6)";ctx.fill();
  });
  pts.forEach((a,i)=>pts.slice(i+1).forEach(b=>{
    const d=Math.hypot(a.x-b.x,a.y-b.y);
    if(d<120){ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.strokeStyle="rgba(108,99,255,"+(0.15*(1-d/120))+")";ctx.lineWidth=.5;ctx.stroke();}
  }));
  requestAnimationFrame(drawParticles);
}
drawParticles();

// ── NAV SCROLL ──
const navbar=document.getElementById("navbar");
const sections=document.querySelectorAll("section,[id]");
window.addEventListener("scroll",()=>{
  navbar.classList.toggle("scrolled",window.scrollY>50);
  document.getElementById("back-top").classList.toggle("show",window.scrollY>400);
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

// ── AI CHAT — Smart Knowledge Base (CORS-safe, zero API key needed) ──
const KB = [
  {
    k:["skill","technology","tech stack","know","expertise","use","proficient","tools"],
    a:"John Mark's core skills are React.js, JavaScript ES6+, HTML5, CSS3, and Python. On the AI/ML side he works with TensorFlow, Scikit-learn, NumPy, and Pandas — plus hands-on LLM & GenAI experience from his C-DAC HPC-AI certification. He also uses PostgreSQL, MySQL, REST APIs, Git, Linux, and Bootstrap."
  },
  {
    k:["react","frontend","front end","ui","interface","component","hooks"],
    a:"John Mark has 1.5+ years of hands-on React.js experience building production-ready responsive web apps at Datagaint IT Services. He's skilled in React Hooks, component architecture, performance optimization, and API integration — and scored 90% in Advanced React on his Meta Front-End Developer certification."
  },
  {
    k:["ai","ml","machine learning","tensorflow","artificial intelligence","cdac","hpc","llm","genai","generative"],
    a:"John Mark holds an Advanced Certificate in HPC & AI from C-DAC — India's premier computing institute. He built real ML models with TensorFlow & Scikit-learn for the AI Ocean Cleanup project (real-time waste image classification). He also has experience with LLMs, Generative AI, and AI agent workflows from his C-DAC coursework."
  },
  {
    k:["experience","work","job","intern","datagaint","company","years","professional"],
    a:"He worked as a Front-End Developer at Datagaint IT Services Pvt. Ltd., Vijayawada from July 2023 to February 2025 — about 1.5 years. He built high-performance React apps, integrated REST APIs, reduced response times by 20%, and contributed across the full SDLC including Jasmine automated testing."
  },
  {
    k:["project","portfolio","built","made","amazon","ocean","myntra","movie","littlelemon","exchange"],
    a:"John Mark's key projects: AI for Ocean Cleanup (TensorFlow ML waste detection), Amazon Clone (full-stack React e-commerce), Littlelemon Restaurant (React), Myntra Clone (UI/CSS), MovieSearch App (API integration), and Exchange Rate Calculator. Each project demonstrates a different skill dimension."
  },
  {
    k:["certif","meta","coursera","microsoft","hackerrank","freecodecamp","grade","score"],
    a:"His certifications: SOAR AI for Educators (Microsoft, Dec 2025), Meta Front-End Developer Professional (Coursera — 87–100% across all 9 courses including 100% in Version Control & 99% in Intro to Frontend), C-DAC HPC-AI (Aug 2025), Full Stack Web Dev (Udemy, Jan 2023), JS Algorithms (freeCodeCamp), JS Basics (HackerRank)."
  },
  {
    k:["hire","why","recommend","best","suitable","good for","fit","candidate","should i","worth"],
    a:"John Mark brings a rare combination: proven React.js frontend experience (1.5 yrs, 20% API performance gain) + advanced AI/ML expertise (C-DAC HPC-AI certified). He's immediately available, based in Hyderabad, open to onsite/hybrid/remote, and has both technical depth and strong communication skills. Very few freshers have this dual profile!"
  },
  {
    k:["salary","ctc","expect","package","pay","compensation","lpa"],
    a:"John Mark is open to discussing compensation based on the role, company, and responsibilities. Contact him directly at johnarumulla@gmail.com or +91 8142421367 to have that conversation."
  },
  {
    k:["contact","email","phone","reach","linkedin","connect","number","mobile"],
    a:"You can reach John Mark at: 📧 johnarumulla@gmail.com | 📱 +91 8142421367 | 💼 linkedin.com/in/johnmarkarumulla. He's based in Hyderabad and ready to connect immediately!"
  },
  {
    k:["education","degree","college","btech","university","cgpa","grade","audisankara","gudur"],
    a:"John Mark holds a B.Tech in Computer Science & Engineering from Audisankara Institute of Technology, Gudur, Andhra Pradesh (2019–2023), CGPA 7.1/10. He also completed an Advanced Certificate in HPC & AI at C-DAC in August 2025 — a prestigious post-graduate level program."
  },
  {
    k:["available","join","notice","start","when","location","hyderabad","remote","onsite","hybrid"],
    a:"John Mark is immediately available — no notice period! He's based in Hyderabad, India, and is open to onsite, hybrid, or fully remote positions anywhere in India."
  },
  {
    k:["database","sql","mysql","postgresql","backend","server","api","rest"],
    a:"John Mark works with MySQL and PostgreSQL for databases, and has solid REST API integration skills from his internship at Datagaint (where he optimized response times by 20%). He's also familiar with Node.js basics and full-stack architecture from his Udemy Full Stack course."
  },
  {
    k:["python","numpy","pandas","scikit","data","preprocessing","pipeline"],
    a:"John Mark uses Python for ML and data engineering tasks — NumPy and Pandas for preprocessing, Scikit-learn for model building, and TensorFlow for deep learning. His AI Ocean Cleanup project demonstrates clean, testable ML pipelines built from scratch."
  },
];

function getAIReply(txt) {
  const t = txt.toLowerCase();
  for (const entry of KB) {
    if (entry.k.some(k => t.includes(k))) return entry.a;
  }
  const fallbacks = [
    "Great question! John Mark is a Software Engineer specializing in React.js and AI/ML, based in Hyderabad with 1.5+ years of experience. He's immediately available for full-time roles. Try asking about his skills, projects, certifications, or why you should hire him!",
    "I'd be happy to help! John Mark combines React.js frontend expertise with C-DAC-certified AI/ML skills — a rare combo for a fresher. Ask me about his technical skills, work experience, projects, or how to get in touch.",
    "John Mark is an innovative developer ready to join your team immediately! Ask me: 'What are his skills?', 'Tell me about his AI projects', 'Why should I hire him?', or 'How do I contact him?'"
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

function rmTyping() {
  const t = document.getElementById("aiTyping");
  if (t) t.remove();
}

async function sendAI() {
  const inp = document.getElementById("aiIn");
  const txt = inp.value.trim();
  if (!txt || aiBusy) return;
  inp.value = "";
  aiBusy = true;
  addAIMsg("user", txt);
  showTyping();
  document.getElementById("aiQuick").style.display = "none";
  // Realistic thinking delay
  await new Promise(res => setTimeout(res, 700 + Math.random() * 600));
  const reply = getAIReply(txt);
  rmTyping();
  addAIMsg("ai", reply);
  aiBusy = false;
}

function sendAQ(t) {
  document.getElementById("aiIn").value = t;
  sendAI();
}

document.getElementById("aiIn").addEventListener("keydown", function(e) {
  if (e.key === "Enter") sendAI();
});

// ── DAY / NIGHT THEME TOGGLE ──
function getPreferredTheme() {
  const saved = localStorage.getItem("jm-theme");
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "day" : "night";
}
function applyTheme(mode) {
  if (mode === "day") {
    document.body.classList.add("day-mode");
    document.getElementById("theme-icon").textContent = "☀️";
  } else {
    document.body.classList.remove("day-mode");
    document.getElementById("theme-icon").textContent = "🌙";
  }
  localStorage.setItem("jm-theme", mode);
  // Update particles color for day mode
  updateParticleColor(mode);
}
function toggleTheme() {
  const isDay = document.body.classList.contains("day-mode");
  applyTheme(isDay ? "night" : "day");
}
// Apply on load
applyTheme(getPreferredTheme());

// Auto-switch based on time of day (if no preference saved)
(function autoTimeTheme() {
  if (localStorage.getItem("jm-theme")) return; // respect manual choice
  const hr = new Date().getHours();
  applyTheme((hr >= 6 && hr < 19) ? "day" : "night");
})();

// ── PARTICLE COLOR UPDATE FOR DAY/NIGHT ──
function updateParticleColor(mode) {
  window._particleColor = mode === "day"
    ? "rgba(108,99,255,0.35)"
    : "rgba(108,99,255,0.6)";
  window._lineColor = mode === "day"
    ? "rgba(108,99,255,0.1)"
    : "rgba(108,99,255,0.15)";
}
updateParticleColor("night");

// Override drawParticles to use dynamic color
(function() {
  // Patch the existing draw loop with color-aware version
  window._particleColor = "rgba(108,99,255,.6)";
  window._lineColor = "rgba(108,99,255,";
})();

// ── MATRIX RAIN (AI Section) ──
(function initMatrix() {
  const mc = document.getElementById("matrix-canvas");
  if (!mc) return;
  const mctx = mc.getContext("2d");
  function resizeMatrix() {
    const parent = mc.parentElement;
    mc.width = parent.offsetWidth;
    mc.height = parent.offsetHeight;
  }
  resizeMatrix();
  window.addEventListener("resize", resizeMatrix);
  const chars = "01アイウエオカキクケコABCDEF∇σ∫∂λθΣΠ";
  const cols = Math.floor(mc.width / 14);
  const drops = Array(cols).fill(1);
  function drawMatrix() {
    mctx.fillStyle = "rgba(0,0,0,0.05)";
    mctx.fillRect(0, 0, mc.width, mc.height);
    mctx.fillStyle = "#6c63ff";
    mctx.font = "11px JetBrains Mono, monospace";
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      mctx.fillText(ch, i * 14, y * 14);
      if (y * 14 > mc.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }
  setInterval(drawMatrix, 60);
})();

// ── CODE RAIN IN PHOTO (subtle) ──
(function initCodeRain() {
  const wrap = document.querySelector(".photo-inner");
  if (!wrap) return;
  const rainCanvas = document.createElement("canvas");
  rainCanvas.style.cssText = "position:absolute;inset:0;z-index:2;pointer-events:none;opacity:0.045;border-radius:inherit;";
  wrap.style.position = "relative";
  wrap.appendChild(rainCanvas);
  const rc = rainCanvas.getContext("2d");
  function resize() { rainCanvas.width = wrap.offsetWidth; rainCanvas.height = wrap.offsetHeight; }
  resize();
  const rchars = "01∇σλΣ";
  const rcols = Math.floor(rainCanvas.width / 10);
  const rdrops = Array(rcols).fill(1);
  function drawRain() {
    rc.fillStyle = "rgba(0,0,0,0.08)";
    rc.fillRect(0, 0, rainCanvas.width, rainCanvas.height);
    rc.fillStyle = "#43e97b";
    rc.font = "9px monospace";
    rdrops.forEach((y, i) => {
      const ch = rchars[Math.floor(Math.random() * rchars.length)];
      rc.fillText(ch, i * 10, y * 10);
      if (y * 10 > rainCanvas.height && Math.random() > 0.97) rdrops[i] = 0;
      rdrops[i]++;
    });
  }
  setInterval(drawRain, 80);
})();

// ── HERO ROLE TYPEWRITER ──
(function heroTypewriter() {
  const roles = [
    "// Software Engineer · React & AI Dev",
    "// Frontend Developer · React.js",
    "// AI/ML Engineer · TensorFlow",
    "// Full Stack Developer · Python",
    "// C-DAC HPC-AI Graduate · LLMs"
  ];
  let ri = 0, ci = 0, deleting = false;
  const el = document.getElementById("heroRole");
  if (!el) return;
  function type() {
    const current = roles[ri];
    if (!deleting) {
      el.textContent = current.slice(0, ci + 1);
      ci++;
      if (ci === current.length) { deleting = true; setTimeout(type, 2200); return; }
      setTimeout(type, 55);
    } else {
      el.textContent = current.slice(0, ci - 1);
      ci--;
      if (ci === 0) { deleting = false; ri = (ri + 1) % roles.length; setTimeout(type, 300); return; }
      setTimeout(type, 28);
    }
  }
  setTimeout(type, 1200);
})();

// ── BAR FILL GLOW ──
document.querySelectorAll(".bar-fill,.sk-bar").forEach(bar => {
  const obs2 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.animationPlayState = "running";
        setTimeout(() => e.target.classList.add("glowing"), 1500);
      }
    });
  }, {threshold:.5});
  obs2.observe(bar);
});

// ── CONTACT CARD STAGGER ANIMATION ──
document.querySelectorAll(".contact-card-anim").forEach((card, i) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(24px)";
  card.style.transition = `opacity .5s ease ${i * 0.1}s, transform .5s ease ${i * 0.1}s, border-color .3s, box-shadow .3s`;
  const obs3 = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.opacity = "1";
        e.target.style.transform = "translateY(0)";
      }
    });
  }, {threshold:.2});
  obs3.observe(card);
});

// ── CURSOR TRAIL (AI particle bursts on click) ──
document.addEventListener("click", function(e) {
  for (let i = 0; i < 8; i++) {
    const spark = document.createElement("div");
    spark.style.cssText = `
      position:fixed;left:${e.clientX}px;top:${e.clientY}px;
      width:${4 + Math.random()*5}px;height:${4 + Math.random()*5}px;
      background:var(--accent);border-radius:50%;pointer-events:none;z-index:9997;
      transform:translate(-50%,-50%);
      animation: spark-fade .6s ease forwards;
    `;
    const angle = (i / 8) * Math.PI * 2;
    const dist = 30 + Math.random() * 40;
    spark.style.setProperty("--dx", Math.cos(angle) * dist + "px");
    spark.style.setProperty("--dy", Math.sin(angle) * dist + "px");
    document.body.appendChild(spark);
    setTimeout(() => spark.remove(), 650);
  }
});
// Add spark keyframe dynamically
const sparkStyle = document.createElement("style");
sparkStyle.textContent = "@keyframes spark-fade { 0%{opacity:1;transform:translate(-50%,-50%) scale(1)} 100%{opacity:0;transform:translate(calc(-50% + var(--dx)), calc(-50% + var(--dy))) scale(0)} }";
document.head.appendChild(sparkStyle);
