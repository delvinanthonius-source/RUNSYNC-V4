"use client";
import { useState, useEffect, useRef } from "react";
import { Activity, Flame, Utensils, Calendar, ChevronRight, ChevronLeft, Zap, Target, Clock, TrendingUp, Heart, CheckCircle, Play, Droplets, LayoutGrid, Smartphone, RotateCcw, MousePointerClick, Wifi, BatteryFull, Signal, ArrowRight, Sparkles, Search, Plus, Minus, X, Award, Bell, ChevronDown, RefreshCw, ShoppingCart, BarChart3, Star, Trash2, Circle, User, Dumbbell, Apple, Coffee, Store, Package } from "lucide-react";

/* ═══════════ FONTS ═══════════ */
if(typeof document!=="undefined"&&!document.querySelector('link[data-rs]')){const l=document.createElement("link");l.href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:wght@300;400;500;600;700&display=swap";l.rel="stylesheet";l.setAttribute("data-rs","1");document.head.appendChild(l)}

/* ═══════════ DESIGN TOKENS ═══════════ */
const T={bg:"#08080d",bg2:"#050507",s:"rgba(255,255,255,0.04)",s2:"rgba(255,255,255,0.07)",b:"rgba(255,255,255,0.08)",b2:"rgba(255,255,255,0.14)",tx:"#f5f5fa",tx2:"#a0a0b0",tx3:"#666673",tx4:"#3a3a44",teal:"#5eead4",purple:"#a78bfa",coral:"#fb7185",amber:"#fbbf24",green:"#4ade80",blue:"#60a5fa",red:"#f87171"};
const F={d:"'Syne',sans-serif",b:"'DM Sans',sans-serif"};

/* ═══════════ CATEGORY COLORS ═══════════ */
const CAT_COL={Karbohidrat:T.amber,Protein:T.coral,Sayuran:T.green,Snack:T.purple,Minuman:T.blue,Warung:"#fb923c",Minimarket:T.teal};

/* ═══════════ INDONESIAN FOOD DATABASE ═══════════ */
const FOOD_DB=[
  {id:1,name:"Nasi Putih",portion:"1 piring (150g)",cal:195,carb:43,protein:4,fat:0.3,cat:"Karbohidrat"},
  {id:2,name:"Nasi Goreng",portion:"1 piring",cal:450,carb:55,protein:12,fat:18,cat:"Karbohidrat"},
  {id:3,name:"Nasi Uduk",portion:"1 piring",cal:390,carb:52,protein:8,fat:16,cat:"Karbohidrat"},
  {id:4,name:"Lontong / Ketupat",portion:"2 potong",cal:160,carb:36,protein:3,fat:0.2,cat:"Karbohidrat"},
  {id:5,name:"Mie Goreng Instan",portion:"1 bungkus",cal:380,carb:50,protein:8,fat:16,cat:"Karbohidrat"},
  {id:6,name:"Oatmeal",portion:"1 mangkok (40g)",cal:150,carb:27,protein:5,fat:3,cat:"Karbohidrat"},
  {id:7,name:"Roti Gandum",portion:"2 lembar",cal:140,carb:26,protein:6,fat:2,cat:"Karbohidrat"},
  {id:8,name:"Kentang Rebus",portion:"1 buah sedang",cal:130,carb:30,protein:3,fat:0.1,cat:"Karbohidrat"},
  {id:9,name:"Ubi Jalar Rebus",portion:"1 buah",cal:115,carb:27,protein:2,fat:0.1,cat:"Karbohidrat"},
  {id:10,name:"Ayam Dada Panggang",portion:"1 potong (100g)",cal:165,carb:0,protein:31,fat:3.6,cat:"Protein"},
  {id:11,name:"Ayam Goreng Tepung",portion:"1 potong",cal:280,carb:12,protein:22,fat:16,cat:"Protein"},
  {id:12,name:"Telur Rebus",portion:"2 butir",cal:140,carb:1,protein:12,fat:10,cat:"Protein"},
  {id:13,name:"Telur Dadar",portion:"2 butir",cal:180,carb:2,protein:12,fat:14,cat:"Protein"},
  {id:14,name:"Ikan Bakar",portion:"1 ekor sedang",cal:200,carb:0,protein:34,fat:6,cat:"Protein"},
  {id:15,name:"Tempe Goreng",portion:"3 potong",cal:170,carb:8,protein:14,fat:10,cat:"Protein"},
  {id:16,name:"Tahu Goreng",portion:"3 potong",cal:150,carb:4,protein:10,fat:11,cat:"Protein"},
  {id:17,name:"Rendang Daging",portion:"1 potong",cal:220,carb:3,protein:18,fat:15,cat:"Protein"},
  {id:18,name:"Sate Ayam",portion:"5 tusuk",cal:250,carb:8,protein:20,fat:15,cat:"Protein"},
  {id:19,name:"Ikan Tongkol Balado",portion:"1 potong",cal:180,carb:4,protein:28,fat:6,cat:"Protein"},
  {id:20,name:"Udang Goreng",portion:"5 ekor",cal:160,carb:4,protein:22,fat:6,cat:"Protein"},
  {id:21,name:"Greek Yogurt",portion:"1 cup (150g)",cal:130,carb:8,protein:15,fat:4,cat:"Protein"},
  {id:22,name:"Ayam Geprek",portion:"1 porsi",cal:350,carb:20,protein:28,fat:18,cat:"Protein"},
  {id:23,name:"Gado-gado",portion:"1 porsi",cal:320,carb:28,protein:14,fat:18,cat:"Sayuran"},
  {id:24,name:"Sayur Bayam",portion:"1 mangkok",cal:45,carb:6,protein:3,fat:1,cat:"Sayuran"},
  {id:25,name:"Sayur Asem",portion:"1 mangkok",cal:60,carb:12,protein:2,fat:0.5,cat:"Sayuran"},
  {id:26,name:"Capcay",portion:"1 porsi",cal:120,carb:10,protein:6,fat:7,cat:"Sayuran"},
  {id:27,name:"Tumis Kangkung",portion:"1 porsi",cal:80,carb:6,protein:3,fat:5,cat:"Sayuran"},
  {id:28,name:"Sop Sayur",portion:"1 mangkok",cal:70,carb:10,protein:3,fat:2,cat:"Sayuran"},
  {id:29,name:"Lalapan Mentah",portion:"1 set",cal:25,carb:5,protein:1,fat:0.2,cat:"Sayuran"},
  {id:30,name:"Pecel",portion:"1 porsi",cal:280,carb:22,protein:10,fat:18,cat:"Sayuran"},
  {id:31,name:"Pisang",portion:"1 buah",cal:90,carb:23,protein:1,fat:0.3,cat:"Snack"},
  {id:32,name:"Apel",portion:"1 buah",cal:72,carb:19,protein:0.4,fat:0.2,cat:"Snack"},
  {id:33,name:"Jeruk",portion:"1 buah",cal:60,carb:15,protein:1,fat:0.2,cat:"Snack"},
  {id:34,name:"Mangga",portion:"1 buah",cal:100,carb:25,protein:1,fat:0.4,cat:"Snack"},
  {id:35,name:"Pisang + Selai Kacang",portion:"1 porsi",cal:180,carb:30,protein:5,fat:7,cat:"Snack"},
  {id:36,name:"Granola Bar",portion:"1 bar",cal:140,carb:22,protein:3,fat:5,cat:"Snack"},
  {id:37,name:"Kacang Almond",portion:"1 genggam (28g)",cal:164,carb:6,protein:6,fat:14,cat:"Snack"},
  {id:38,name:"Roti + Selai Madu",portion:"2 lembar",cal:200,carb:38,protein:5,fat:3,cat:"Snack"},
  {id:39,name:"Kopi Hitam",portion:"1 gelas",cal:5,carb:0,protein:0,fat:0,cat:"Minuman"},
  {id:40,name:"Kopi Susu Gula Aren",portion:"1 gelas",cal:150,carb:22,protein:4,fat:5,cat:"Minuman"},
  {id:41,name:"Teh Manis",portion:"1 gelas",cal:80,carb:20,protein:0,fat:0,cat:"Minuman"},
  {id:42,name:"Susu Full Cream",portion:"1 gelas (250ml)",cal:150,carb:12,protein:8,fat:8,cat:"Minuman"},
  {id:43,name:"Jus Jeruk Segar",portion:"1 gelas",cal:110,carb:26,protein:2,fat:0.5,cat:"Minuman"},
  {id:44,name:"Air Kelapa",portion:"1 gelas",cal:45,carb:9,protein:2,fat:0.5,cat:"Minuman"},
  {id:45,name:"Whey Protein",portion:"1 scoop",cal:120,carb:3,protein:24,fat:1.5,cat:"Minuman"},
  {id:46,name:"Nasi Padang Komplit",portion:"1 porsi",cal:650,carb:70,protein:35,fat:25,cat:"Warung"},
  {id:47,name:"Bakso + Mie",portion:"1 mangkok",cal:400,carb:45,protein:18,fat:15,cat:"Warung"},
  {id:48,name:"Soto Ayam + Nasi",portion:"1 porsi",cal:380,carb:42,protein:20,fat:14,cat:"Warung"},
  {id:49,name:"Rawon + Nasi",portion:"1 porsi",cal:420,carb:45,protein:25,fat:15,cat:"Warung"},
  {id:50,name:"Pecel Lele + Nasi",portion:"1 porsi",cal:480,carb:50,protein:28,fat:18,cat:"Warung"},
  {id:51,name:"Nasi Kuning Komplit",portion:"1 porsi",cal:500,carb:60,protein:18,fat:20,cat:"Warung"},
  {id:52,name:"Bubur Ayam",portion:"1 mangkok",cal:300,carb:40,protein:15,fat:8,cat:"Warung"},
  {id:53,name:"Mie Ayam",portion:"1 mangkok",cal:420,carb:52,protein:16,fat:16,cat:"Warung"},
  {id:54,name:"Siomay Bandung",portion:"5 buah + bumbu",cal:280,carb:25,protein:14,fat:14,cat:"Warung"},
  {id:55,name:"Gorengan (Bakwan)",portion:"3 buah",cal:300,carb:30,protein:5,fat:18,cat:"Warung"},
  {id:56,name:"Martabak Telur",portion:"2 potong",cal:350,carb:25,protein:16,fat:22,cat:"Warung"},
  {id:57,name:"Yakult",portion:"1 botol",cal:50,carb:12,protein:1,fat:0,cat:"Minimarket"},
  {id:58,name:"Roti Sari Roti Coklat",portion:"1 bungkus",cal:280,carb:42,protein:6,fat:10,cat:"Minimarket"},
  {id:59,name:"Ultra Milk 250ml",portion:"1 kotak",cal:125,carb:12,protein:7,fat:5,cat:"Minimarket"},
  {id:60,name:"Pop Mie",portion:"1 cup",cal:340,carb:44,protein:7,fat:14,cat:"Minimarket"},
  {id:61,name:"Energen",portion:"1 sachet",cal:130,carb:24,protein:3,fat:3,cat:"Minimarket"},
  {id:62,name:"Soyjoy",portion:"1 bar",cal:130,carb:17,protein:4,fat:5,cat:"Minimarket"},
];

const FOOD_CATS=["Semua","Karbohidrat","Protein","Sayuran","Snack","Minuman","Warung","Minimarket"];

/* ═══════════ TRAINING SESSIONS ═══════════ */
const TRAIN={
  beginner:[
    {day:"Senin",type:"Run/Walk",dur:"20 min",detail:"1 min lari, 2 min jalan — ulangi 6 kali",int:"Rendah"},
    {day:"Rabu",type:"Rest Aktif",dur:"30 min",detail:"Jalan santai atau stretching",int:"Sangat Rendah"},
    {day:"Jumat",type:"Run/Walk",dur:"25 min",detail:"2 min lari, 2 min jalan — ulangi 6 kali",int:"Rendah"},
    {day:"Minggu",type:"Long Walk",dur:"35 min",detail:"Jalan cepat konstan",int:"Rendah"},
  ],
  intermediate:[
    {day:"Senin",type:"Easy Run",dur:"30 min",detail:"Pace santai, bisa ngobrol",int:"Sedang"},
    {day:"Rabu",type:"Interval",dur:"35 min",detail:"8x400m cepat + warmup/cooldown",int:"Tinggi"},
    {day:"Jumat",type:"Tempo Run",dur:"30 min",detail:"15 min tempo, 5 min easy",int:"Sedang-Tinggi"},
    {day:"Minggu",type:"Long Run",dur:"50 min",detail:"Pace konstan, nyaman",int:"Sedang"},
  ],
  advanced:[
    {day:"Senin",type:"Recovery",dur:"40 min",detail:"Zone 2, sangat ringan",int:"Rendah"},
    {day:"Selasa",type:"Speed Work",dur:"50 min",detail:"12x400m @ 5K pace",int:"Sangat Tinggi"},
    {day:"Kamis",type:"Tempo Run",dur:"50 min",detail:"20 min @ threshold pace",int:"Tinggi"},
    {day:"Sabtu",type:"Long Run",dur:"90 min",detail:"Pace percakapan, aerobik",int:"Sedang"},
  ]
};
const INT_COL={"Sangat Rendah":"#a3e635","Rendah":"#4ade80","Sedang":"#facc15","Sedang-Tinggi":"#fb923c","Tinggi":"#f87171","Sangat Tinggi":"#e879f9"};

/* ═══════════ ACHIEVEMENTS ═══════════ */
const BADGES=[
  {id:"first_log",name:"First Log",desc:"Log makanan pertama",Icon:Utensils,c:T.green,check:d=>d.totalLogged>=1},
  {id:"day_complete",name:"Full Day",desc:"Log 3+ makanan dalam sehari",Icon:CheckCircle,c:T.teal,check:d=>d.todayLog>=3},
  {id:"week_streak",name:"7 Day Streak",desc:"Log makanan 7 hari berturut",Icon:Flame,c:T.coral,check:d=>d.streak>=7},
  {id:"cal_target",name:"On Target",desc:"Kalori harian tepat sasaran",Icon:Target,c:T.amber,check:d=>d.onTarget},
  {id:"weight_log",name:"Scale Check",desc:"Catat berat badan pertama",Icon:TrendingUp,c:T.blue,check:d=>d.weightLogs>=1},
  {id:"protein_king",name:"High Protein",desc:"Protein harian > 100g",Icon:Zap,c:T.purple,check:d=>d.proteinToday>=100},
  {id:"hydration",name:"Hydrated",desc:"Minum 8 gelas per hari",Icon:Droplets,c:T.blue,check:d=>d.hydration>=8},
  {id:"meal_plan",name:"Planner",desc:"Generate meal plan pertama",Icon:BarChart3,c:T.green,check:d=>d.mealPlanGenerated},
];

/* ═══════════ INIT ═══════════ */
const INIT={age:"22",gender:"male",weight:"65",height:"168",fitnessLevel:"intermediate",activityLevel:"light",goal:"maintain",runGoal:"5k",name:"Runner"};

/* ═══════════ CALCULATIONS ═══════════ */
const calcBMR=d=>{const w=+(d.weight)||65,h=+(d.height)||168,a=+(d.age)||22;return d.gender==="male"?10*w+6.25*h-5*a+5:10*w+6.25*h-5*a-161};
const calcTDEE=(bmr,l)=>Math.round(bmr*({sedentary:1.2,light:1.375,moderate:1.55,active:1.725}[l]||1.375));
const calcGoal=(tdee,g)=>g==="lose"?tdee-500:g==="gain"?tdee+300:tdee;
const calcBMI=d=>{const w=+(d.weight)||65,h=((+(d.height)||168)/100);return(w/(h*h)).toFixed(1)};
const bmiLabel=b=>b<18.5?{l:"Underweight",c:T.blue}:b<25?{l:"Normal",c:T.green}:b<30?{l:"Overweight",c:T.amber}:{l:"Obese",c:T.red};

/* ═══════════ MEAL PLANNER ═══════════ */
function generateMealPlan(targetCal){
  const slots=[
    {name:"Sarapan",time:"07:00",target:.25,cats:["Karbohidrat","Protein","Snack","Minuman"]},
    {name:"Snack Pagi",time:"10:00",target:.1,cats:["Snack","Minuman","Minimarket"]},
    {name:"Makan Siang",time:"12:30",target:.3,cats:["Karbohidrat","Protein","Sayuran","Warung"]},
    {name:"Snack Sore",time:"15:30",target:.1,cats:["Snack","Minuman","Minimarket"]},
    {name:"Makan Malam",time:"18:30",target:.25,cats:["Karbohidrat","Protein","Sayuran","Warung"]},
  ];
  const plan=[];let total=0;
  slots.forEach(slot=>{
    const budget=Math.round(targetCal*slot.target);
    const pool=FOOD_DB.filter(f=>slot.cats.includes(f.cat));
    const shuffled=[...pool].sort(()=>Math.random()-.5);
    let slotCal=0,items=[];
    for(const f of shuffled){if(slotCal+f.cal<=budget+80&&items.length<3){items.push(f);slotCal+=f.cal;}if(slotCal>=budget-100||items.length>=2)break;}
    if(items.length===0&&shuffled.length>0)items.push(shuffled[0]);
    const sc=items.reduce((s,i)=>s+i.cal,0);total+=sc;
    plan.push({...slot,items,cal:sc});
  });
  return{slots:plan,total};
}

/* ═══════════ STYLES ═══════════ */
const S={
  scr:{width:390,height:844,background:T.bg,color:T.tx,fontFamily:F.b,position:"relative",overflow:"hidden",display:"flex",flexDirection:"column"},
  card:{background:T.s,border:`1px solid ${T.b}`,borderRadius:16,padding:14},
  ct:{display:"flex",alignItems:"center",gap:8,fontFamily:F.d,fontWeight:700,fontSize:13,color:T.tx},
  lbl:{display:"block",fontSize:10,color:T.tx3,textTransform:"uppercase",letterSpacing:1.5,marginBottom:8,fontFamily:F.d,fontWeight:700},
  inp:{width:"100%",background:T.s,border:`1px solid ${T.b}`,borderRadius:12,padding:"12px 14px",color:T.tx,fontSize:14,fontFamily:F.b,outline:"none",boxSizing:"border-box"},
  btn:{width:"100%",padding:"15px",borderRadius:14,border:"none",background:`linear-gradient(135deg,${T.teal},${T.purple})`,color:T.bg,fontFamily:F.d,fontWeight:800,fontSize:14,cursor:"pointer",boxShadow:`0 6px 20px ${T.teal}30`,display:"flex",alignItems:"center",justifyContent:"center",gap:8},
  btnOff:{background:T.s,color:T.tx4,boxShadow:"none",cursor:"not-allowed"},
  chip:(a,c=T.teal)=>({padding:"8px 12px",borderRadius:10,border:`1px solid ${a?c+"60":T.b}`,background:a?c+"18":T.s,color:a?c:T.tx3,cursor:"pointer",fontSize:12,fontFamily:F.d,fontWeight:700,transition:"all .2s"}),
};

function CatDot({cat,size=8}){return<div style={{width:size,height:size,borderRadius:"50%",background:CAT_COL[cat]||T.tx3,flexShrink:0}}/>}

/* ═══════════ STATUS BAR / HOME INDICATOR / LOGO / AVATAR ═══════════ */
function SBar(){return(<div style={{height:50,position:"relative",flexShrink:0,width:"100%"}}><div style={{position:"absolute",top:11,left:"50%",transform:"translateX(-50%)",width:118,height:32,background:"#000",borderRadius:18,zIndex:100}}/><div style={{position:"absolute",top:17,left:28,zIndex:99,fontSize:15,fontWeight:700,color:"#fff",fontFamily:F.b}}>9:41</div><div style={{position:"absolute",top:18,right:26,display:"flex",gap:5,alignItems:"center",zIndex:99,color:"#fff"}}><Signal size={14}/><Wifi size={14}/><BatteryFull size={20}/></div></div>)}
function HI(){return<div style={{position:"absolute",bottom:8,left:"50%",transform:"translateX(-50%)",width:134,height:5,background:"#fff",borderRadius:3,opacity:.95,zIndex:100}}/>}
function Logo({s:sz=36}){return(<div style={{width:sz,height:sz,borderRadius:sz*.28,background:`linear-gradient(135deg,${T.teal},${T.purple})`,display:"flex",alignItems:"center",justifyContent:"center",boxShadow:`0 4px 14px ${T.teal}50`,flexShrink:0,position:"relative",overflow:"hidden"}}><div style={{position:"absolute",inset:0,background:"linear-gradient(180deg,rgba(255,255,255,.22),transparent 55%)",pointerEvents:"none"}}/><svg width={sz*.7} height={sz*.7} viewBox="0 0 24 24" fill="none" stroke="#0a0a0f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{position:"relative"}}><circle cx="16" cy="4.5" r="2" fill="#0a0a0f" stroke="none"/><path d="M15.5 7 L11 13"/><path d="M14 8.5 L17.5 12"/><path d="M13 9 L8.5 7.5"/><path d="M11 13 L14 16.5 L14 21"/><path d="M11 13 L8 17.5 L7 21"/><path d="M2 6 L5 6" strokeWidth="1.8" opacity=".55"/><path d="M1 10 L4 10" strokeWidth="1.8" opacity=".45"/></svg></div>)}
function Avatar({name,gender,size=50}){const seed=encodeURIComponent(name&&name!=="Runner"?name:gender==="female"?"Aria42":"Kai28");return(<div style={{width:size,height:size,borderRadius:"50%",background:`linear-gradient(135deg,${T.teal},${T.purple})`,padding:2.5,boxShadow:`0 6px 16px ${T.teal}40`,flexShrink:0}}><img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=64e8de,a78bfa&backgroundType=gradientLinear&radius=50`} alt="" loading="lazy" style={{width:"100%",height:"100%",borderRadius:"50%",background:T.bg,display:"block"}}/></div>)}

/* ═══════════ LANDING ═══════════ */
function LandingScreen({onNext}){
  return(<div style={S.scr}>
    <div style={{position:"absolute",inset:0,overflow:"hidden",pointerEvents:"none"}}>
      <div style={{position:"absolute",top:-80,right:-100,width:360,height:360,borderRadius:"50%",background:`radial-gradient(circle,${T.teal}25,transparent 65%)`,filter:"blur(20px)"}}/>
      <div style={{position:"absolute",bottom:-120,left:-100,width:380,height:380,borderRadius:"50%",background:`radial-gradient(circle,${T.purple}30,transparent 65%)`,filter:"blur(30px)"}}/>
    </div>
    <SBar/>
    <div style={{flex:1,padding:"16px 28px 0",display:"flex",flexDirection:"column",position:"relative",zIndex:1}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><Logo s={36}/><div style={{fontSize:11,color:T.teal,letterSpacing:4,fontFamily:F.d,fontWeight:700}}>RUNSYNC</div></div>
      <div style={{marginTop:48}}>
        <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${T.teal}15`,border:`1px solid ${T.teal}30`,borderRadius:100,padding:"5px 12px",marginBottom:14}}>
          <Sparkles size={11} color={T.teal}/><span style={{fontSize:10,color:T.teal,fontFamily:F.d,fontWeight:700,letterSpacing:1}}>SMART NUTRITION</span>
        </div>
        <h1 style={{fontFamily:F.d,fontWeight:800,fontSize:36,lineHeight:1.05,color:T.tx,margin:0,letterSpacing:-1}}>
          Lari jadi<br/><span style={{background:`linear-gradient(90deg,${T.teal},${T.purple} 60%,${T.coral})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>terstruktur.</span>
        </h1>
        <p style={{color:T.tx2,fontSize:13,lineHeight:1.6,marginTop:14}}>Hitung kalori, susun meal plan, track progress,<br/>dan atur jadwal makan — semua dipersonalisasi.</p>
      </div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8,marginTop:24}}>
        {[{I:Flame,l:"Kalori &\nMakro",c:T.coral},{I:Calendar,l:"Meal Plan\nOtomatis",c:T.teal},{I:Apple,l:"60+ Makanan\nIndonesia",c:T.green},{I:BarChart3,l:"Progress\nTracker",c:T.blue}].map((f,i)=>(
          <div key={i} style={{background:T.s,border:`1px solid ${T.b}`,borderRadius:14,padding:"12px 12px 10px",display:"flex",flexDirection:"column",gap:5}}>
            <div style={{width:30,height:30,borderRadius:8,background:`${f.c}18`,border:`1px solid ${f.c}30`,display:"flex",alignItems:"center",justifyContent:"center"}}><f.I size={15} color={f.c}/></div>
            <div style={{fontFamily:F.d,fontWeight:700,fontSize:11,color:T.tx,lineHeight:1.2,whiteSpace:"pre-line"}}>{f.l}</div>
          </div>
        ))}
      </div>
      <div style={{flex:1}}/>
      <div style={{paddingBottom:28}}>
        <button onClick={onNext} style={S.btn}>Mulai Sekarang <ArrowRight size={16} strokeWidth={3}/></button>
        <div style={{fontSize:11,color:T.tx4,marginTop:10,textAlign:"center"}}>Gratis · Tanpa registrasi · Mulai sekarang</div>
      </div>
    </div><HI/></div>);
}

/* ═══════════ ONBOARDING ═══════════ */
function StepHdr({step,title,sub,onBack}){
  return(<div style={{padding:"8px 20px 0"}}>
    <div style={{display:"flex",gap:4,marginBottom:16}}>{[1,2,3].map(n=><div key={n} style={{flex:1,height:4,borderRadius:2,background:n<=step?`linear-gradient(90deg,${T.teal},${T.purple})`:T.s}}/>)}</div>
    <div style={{display:"flex",alignItems:"center",gap:12}}>
      {onBack&&<button onClick={onBack} style={{background:T.s,border:`1px solid ${T.b}`,borderRadius:10,padding:10,cursor:"pointer",color:T.tx2,display:"flex"}}><ChevronLeft size={18}/></button>}
      <div><div style={{fontSize:10,color:T.teal,letterSpacing:2,fontFamily:F.d,fontWeight:700}}>LANGKAH {step} / 3</div><div style={{fontFamily:F.d,fontWeight:800,fontSize:20,color:T.tx,marginTop:2}}>{title}</div><div style={{fontSize:11,color:T.tx3,marginTop:2}}>{sub}</div></div>
    </div>
  </div>);
}

function Step1({data:d,setData:sd,onBack,onNext}){
  const ok=d.age&&d.weight&&d.height;
  return(<div style={S.scr}><SBar/><StepHdr step={1} title="Data Diri" sub="Lengkapi informasi dasar kamu" onBack={onBack}/>
    <div style={{flex:1,padding:"20px",overflowY:"auto",display:"flex",flexDirection:"column",gap:16}}>
      <div><label style={S.lbl}>Usia</label><input style={S.inp} type="number" placeholder="22" value={d.age} onChange={e=>sd({...d,age:e.target.value})}/></div>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10}}>
        <div><label style={S.lbl}>Berat Badan (kg)</label><input style={S.inp} type="number" placeholder="65" value={d.weight} onChange={e=>sd({...d,weight:e.target.value})}/></div>
        <div><label style={S.lbl}>Tinggi Badan (cm)</label><input style={S.inp} type="number" placeholder="168" value={d.height} onChange={e=>sd({...d,height:e.target.value})}/></div>
      </div>
      <div><label style={S.lbl}>Gender</label><div style={{display:"flex",gap:8}}>{[{v:"male",l:"Laki-laki"},{v:"female",l:"Perempuan"}].map(g=><button key={g.v} onClick={()=>sd({...d,gender:g.v})} style={{...S.chip(d.gender===g.v,T.teal),flex:1,padding:"14px 8px",fontSize:14}}>{g.l}</button>)}</div></div>
      {ok&&<div style={{background:`${T.teal}12`,border:`1px solid ${T.teal}30`,borderRadius:14,padding:12}}>
        <div style={{fontSize:10,color:T.teal,fontFamily:F.d,fontWeight:700,letterSpacing:1.5,marginBottom:6}}>LIVE PREVIEW</div>
        <div style={{display:"flex",gap:16}}><div><div style={{fontSize:9,color:T.tx3}}>BMI</div><div style={{fontFamily:F.d,fontWeight:800,fontSize:20,color:T.tx}}>{calcBMI(d)}</div></div><div><div style={{fontSize:9,color:T.tx3}}>BMR</div><div style={{fontFamily:F.d,fontWeight:800,fontSize:20,color:T.purple}}>{Math.round(calcBMR(d))}</div></div></div>
      </div>}
    </div>
    <div style={{padding:"14px 20px 24px"}}><button onClick={onNext} disabled={!ok} style={{...S.btn,...(ok?{}:S.btnOff)}}>Lanjut <ArrowRight size={16}/></button></div><HI/></div>);
}

function Step2({data:d,setData:sd,onBack,onNext}){
  return(<div style={S.scr}><SBar/><StepHdr step={2} title="Fitness Level" sub="Tentukan level dan aktivitas harian kamu" onBack={onBack}/>
    <div style={{flex:1,padding:"16px 20px",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
      <div><label style={S.lbl}>Level Fitness</label><div style={{display:"flex",flexDirection:"column",gap:8}}>
        {[{v:"beginner",l:"Pemula",dd:"Baru mulai atau jarang olahraga"},{v:"intermediate",l:"Menengah",dd:"Rutin olahraga, ingin meningkat"},{v:"advanced",l:"Lanjutan",dd:"Berpengalaman, performa maksimal"}].map(l=>{const a=d.fitnessLevel===l.v;return(<button key={l.v} onClick={()=>sd({...d,fitnessLevel:l.v})} style={{display:"flex",alignItems:"center",gap:10,padding:12,borderRadius:14,border:`1px solid ${a?T.teal:T.b}`,background:a?`linear-gradient(135deg,${T.teal},${T.purple}aa)`:T.s,color:a?T.bg:T.tx,cursor:"pointer",textAlign:"left",width:"100%",transition:"all .2s"}}><div style={{width:34,height:34,borderRadius:10,background:a?"rgba(0,0,0,.15)":"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Activity size={15}/></div><div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.d,fontWeight:800,fontSize:13}}>{l.l}</div><div style={{fontSize:10,opacity:.7}}>{l.dd}</div></div>{a&&<CheckCircle size={15}/>}</button>)})}
      </div></div>
      <div><label style={S.lbl}>Aktivitas Harian</label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[{v:"sedentary",l:"Sedentary",d:"Jarang bergerak"},{v:"light",l:"Ringan",d:"1–3x per minggu"},{v:"moderate",l:"Moderat",d:"3–5x per minggu"},{v:"active",l:"Aktif",d:"6–7x per minggu"}].map(a=><button key={a.v} onClick={()=>sd({...d,activityLevel:a.v})} style={{...S.chip(d.activityLevel===a.v),padding:"12px 10px",textAlign:"left",display:"flex",flexDirection:"column",gap:3}}><span style={{fontSize:12,fontWeight:700}}>{a.l}</span><span style={{fontSize:10,opacity:.6}}>{a.d}</span></button>)}
      </div></div>
    </div>
    <div style={{padding:"14px 20px 24px"}}><button onClick={onNext} style={S.btn}>Lanjut <ArrowRight size={16}/></button></div><HI/></div>);
}

function Step3({data:d,setData:sd,onBack,onNext}){
  const cg=calcGoal(calcTDEE(calcBMR(d),d.activityLevel),d.goal);
  return(<div style={S.scr}><SBar/><StepHdr step={3} title="Tujuan" sub="Pilih target yang ingin dicapai" onBack={onBack}/>
    <div style={{flex:1,padding:"16px 20px",overflowY:"auto",display:"flex",flexDirection:"column",gap:14}}>
      <div><label style={S.lbl}>Target Tubuh</label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:6}}>
        {[{v:"lose",l:"Defisit",d:"Turun berat",c:T.coral},{v:"maintain",l:"Maintain",d:"Jaga berat",c:T.green},{v:"gain",l:"Surplus",d:"Naik massa",c:T.blue}].map(g=>{const a=d.goal===g.v;return(<button key={g.v} onClick={()=>sd({...d,goal:g.v})} style={{padding:"12px 4px",borderRadius:12,border:`1.5px solid ${a?g.c:T.b}`,background:a?`${g.c}22`:T.s,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,overflow:"hidden"}}><div style={{width:24,height:24,borderRadius:"50%",background:`${g.c}25`,border:`1px solid ${g.c}50`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}><Target size={10} color={g.c}/></div><span style={{fontFamily:F.d,fontWeight:800,fontSize:10,color:a?g.c:T.tx,textAlign:"center"}}>{g.l}</span><span style={{fontSize:8,color:T.tx3,textAlign:"center"}}>{g.d}</span></button>)})}
      </div></div>
      <div><label style={S.lbl}>Target Lari</label><div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        {[{v:"5k",l:"Finish 5K"},{v:"10k",l:"Target 10K"},{v:"halfMarathon",l:"Half Marathon"},{v:"fitness",l:"General Fitness"}].map(g=>{const a=d.runGoal===g.v;return(<button key={g.v} onClick={()=>sd({...d,runGoal:g.v})} style={{...S.chip(a),padding:"12px",textAlign:"center"}}>{g.l}</button>)})}
      </div></div>
      <div><label style={S.lbl}>Nama</label><input style={S.inp} placeholder="Nama kamu" value={d.name} onChange={e=>sd({...d,name:e.target.value})}/></div>
      <div style={{background:`${T.purple}18`,border:`1px solid ${T.purple}30`,borderRadius:14,padding:12}}>
        <div style={{fontFamily:F.d,fontWeight:800,fontSize:11,color:T.purple,letterSpacing:1.5,marginBottom:8}}>PREVIEW PROGRAM</div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
          <div><div style={{fontSize:9,color:T.tx3}}>Target Kalori</div><div style={{fontFamily:F.d,fontWeight:800,fontSize:20,color:T.teal}}>{cg.toLocaleString()} <span style={{fontSize:10,color:T.tx3}}>kcal</span></div></div>
          <div><div style={{fontSize:9,color:T.tx3}}>Sesi Latihan</div><div style={{fontFamily:F.d,fontWeight:800,fontSize:20,color:T.purple}}>{(TRAIN[d.fitnessLevel]||TRAIN.intermediate).length}x <span style={{fontSize:10,color:T.tx3}}>/minggu</span></div></div>
        </div>
      </div>
    </div>
    <div style={{padding:"14px 20px 24px"}}><button onClick={onNext} style={S.btn}>Lihat Program <ArrowRight size={14}/></button></div><HI/></div>);
}

/* ═══════════ DASHBOARD SHARED ═══════════ */
function DashHdr({data:d,accent=T.teal}){
  return(<div style={{background:`linear-gradient(135deg,${T.bg},#15151f 50%,#0f0a1f)`,padding:"14px 20px",borderBottom:`1px solid ${T.b}`,position:"relative",overflow:"hidden"}}>
    <div style={{position:"absolute",top:-30,right:-30,width:140,height:140,borderRadius:"50%",background:`radial-gradient(circle,${accent}25,transparent 70%)`,pointerEvents:"none"}}/>
    <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",position:"relative"}}>
      <div><div style={{fontSize:10,color:accent,letterSpacing:2.5,fontFamily:F.d,fontWeight:700}}>RUNSYNC</div><div style={{fontFamily:F.d,fontWeight:800,fontSize:20,color:T.tx,marginTop:2}}>Halo, {d.name||"Runner"}</div></div>
      <Avatar name={d.name} gender={d.gender} size={46}/>
    </div>
  </div>);
}

function TabBar({active,onTab}){
  const tabs=[{id:"home",l:"Home",I:TrendingUp,c:T.teal},{id:"makan",l:"Makan",I:Utensils,c:T.green},{id:"latihan",l:"Latihan",I:Activity,c:T.purple},{id:"progress",l:"Progress",I:BarChart3,c:T.blue}];
  return(<div style={{display:"flex",padding:"8px 10px 0",gap:4,borderBottom:`1px solid ${T.b}`,background:T.bg}}>
    {tabs.map(t=>{const a=active===t.id;return(<button key={t.id} onClick={()=>onTab(t.id)} style={{flex:1,padding:"8px 4px",border:"none",background:"transparent",color:a?t.c:T.tx4,cursor:"pointer",display:"flex",flexDirection:"column",alignItems:"center",gap:3,position:"relative"}}>
      <t.I size={14} strokeWidth={a?2.5:2}/><span style={{fontSize:9,fontFamily:F.d,fontWeight:700}}>{t.l}</span>{a&&<div style={{position:"absolute",bottom:-1,left:"20%",right:"20%",height:2,background:t.c,borderRadius:2,boxShadow:`0 0 6px ${t.c}`}}/>}</button>)})}</div>);
}

/* ═══════════ TAB 1: HOME ═══════════ */
function DashHome({data:d,foodLog,hydration,setHydration,onTab}){
  const bmr=calcBMR(d),tdee=calcTDEE(bmr,d.activityLevel),target=calcGoal(tdee,d.goal);
  const consumed=foodLog.reduce((s,f)=>s+f.cal,0);
  const remaining=target-consumed;
  const pct=Math.min(consumed/target,1.2);
  const carbT=foodLog.reduce((s,f)=>s+f.carb,0),proT=foodLog.reduce((s,f)=>s+f.protein,0),fatT=foodLog.reduce((s,f)=>s+f.fat,0);
  const bmi=calcBMI(d),bI=bmiLabel(+bmi);
  const waterG=Math.round((+(d.weight)||65)*.033*10)/10;

  return(<div style={S.scr}><SBar/><DashHdr data={d}/><TabBar active="home" onTab={onTab}/>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px 24px",display:"flex",flexDirection:"column",gap:10}}>
      <div style={{...S.card,background:`linear-gradient(135deg,${remaining>0?T.green:T.red}10,${T.bg})`,border:`1px solid ${remaining>0?T.green:T.red}30`}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start"}}>
          <div>
            <div style={{fontSize:10,color:T.tx3,fontFamily:F.d,fontWeight:700,letterSpacing:1.5}}>SISA KALORI HARI INI</div>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:32,color:remaining>0?T.green:T.red,lineHeight:1,marginTop:4}}>{remaining>0?remaining.toLocaleString():0}</div>
            <div style={{fontSize:11,color:T.tx3,marginTop:4}}>dari {target.toLocaleString()} kcal target</div>
          </div>
          <div style={{textAlign:"right"}}><div style={{fontFamily:F.d,fontWeight:800,fontSize:18,color:T.coral}}>{consumed.toLocaleString()}</div><div style={{fontSize:10,color:T.tx3}}>dikonsumsi</div></div>
        </div>
        <div style={{height:8,background:"rgba(255,255,255,.05)",borderRadius:4,marginTop:12,overflow:"hidden"}}>
          <div style={{height:"100%",width:`${Math.min(pct*100,100)}%`,background:pct>1?T.red:`linear-gradient(90deg,${T.green},${T.teal})`,borderRadius:4,transition:"width .4s"}}/>
        </div>
        <div style={{display:"flex",justifyContent:"space-between",marginTop:6}}>
          <span style={{fontSize:9,color:T.tx3}}>{Math.round(pct*100)}% tercapai</span>
          {pct>1&&<span style={{fontSize:9,color:T.red,fontWeight:700}}>Melebihi target</span>}
        </div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6}}>
        {[{v:consumed,u:"kcal",l:"Dikonsumsi",c:T.coral},{v:carbT,u:"g",l:"Karbo",c:T.amber},{v:proT,u:"g",l:"Protein",c:T.green},{v:fatT,u:"g",l:"Lemak",c:T.purple}].map((s,i)=>
          <div key={i} style={{background:T.s,border:`1px solid ${T.b}`,borderRadius:12,padding:"8px 4px",textAlign:"center"}}>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:16,color:s.c}}>{s.v}</div>
            <div style={{fontSize:8,color:T.tx3}}>{s.u}</div><div style={{fontSize:8,color:T.tx4}}>{s.l}</div>
          </div>)}
      </div>

      <button onClick={()=>onTab("makan")} style={{...S.card,display:"flex",alignItems:"center",gap:10,cursor:"pointer",border:`1px dashed ${T.teal}40`}}>
        <div style={{width:36,height:36,borderRadius:10,background:`${T.teal}18`,display:"flex",alignItems:"center",justifyContent:"center"}}><Plus size={18} color={T.teal}/></div>
        <div><div style={{fontFamily:F.d,fontWeight:700,fontSize:12,color:T.teal}}>Log Makanan</div><div style={{fontSize:10,color:T.tx3}}>Cari dari 60+ database makanan Indonesia</div></div>
      </button>

      {foodLog.length>0&&<div style={S.card}>
        <div style={S.ct}><Utensils size={14} color={T.green}/> Log Hari Ini ({foodLog.length})</div>
        <div style={{marginTop:8,display:"flex",flexDirection:"column",gap:4}}>
          {foodLog.slice(-5).map((f,i)=><div key={i} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"6px 0",borderBottom:`1px solid ${T.b}`}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}><CatDot cat={f.cat}/><span style={{fontSize:11,color:T.tx}}>{f.name}</span></div>
            <span style={{fontSize:11,color:T.coral,fontFamily:F.d,fontWeight:700}}>{f.cal}</span>
          </div>)}
          {foodLog.length>5&&<div style={{fontSize:10,color:T.tx3,textAlign:"center"}}>+{foodLog.length-5} lainnya</div>}
        </div>
      </div>}

      <div style={S.card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={S.ct}><Droplets size={14} color={T.blue}/> Hidrasi</div>
          <span style={{fontSize:11,color:T.blue,fontFamily:F.d,fontWeight:700}}>{hydration}/8</span>
        </div>
        <div style={{display:"flex",gap:6,marginTop:8}}>
          {Array.from({length:8},(_,i)=><button key={i} onClick={()=>setHydration(i<hydration?i:i+1)} style={{width:28,height:28,borderRadius:"50%",border:`2px solid ${i<hydration?T.blue:T.b}`,background:i<hydration?`${T.blue}25`:"transparent",cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",transition:"all .2s"}}><Droplets size={12} color={i<hydration?T.blue:T.tx4}/></button>)}
        </div>
        <div style={{height:5,background:"rgba(255,255,255,.05)",borderRadius:3,marginTop:6}}>
          <div style={{height:"100%",width:`${(hydration/8)*100}%`,background:`linear-gradient(90deg,#3b82f6,${T.blue})`,borderRadius:3,transition:"width .4s"}}/>
        </div>
        <div style={{fontSize:10,color:T.tx3,marginTop:4}}>250ml per gelas — Target: {waterG}L/hari</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:6}}>
        {[{l:"BMI",v:bmi,s:bI.l,c:bI.c},{l:"Target",v:`${target}`,s:"kcal/hari",c:T.teal},{l:"BMR",v:`${Math.round(bmr)}`,s:"kcal",c:T.purple},{l:"Sesi",v:`${(TRAIN[d.fitnessLevel]||TRAIN.intermediate).length}x`,s:"/minggu",c:T.amber}].map((s,i)=>
          <div key={i} style={{background:`${s.c}10`,border:`1px solid ${s.c}25`,borderRadius:12,padding:"10px 12px"}}>
            <div style={{fontFamily:F.d,fontWeight:800,fontSize:18,color:s.c}}>{s.v}</div>
            <div style={{fontSize:10,color:T.tx}}>{s.l}</div><div style={{fontSize:9,color:T.tx3}}>{s.s}</div>
          </div>)}
      </div>
    </div><HI/></div>);
}

/* ═══════════ TAB 2: MAKAN ═══════════ */
function DashMakan({data:d,foodLog,setFoodLog,mealPlan,setMealPlan,onTab}){
  const [search,setSearch]=useState("");const [cat,setCat]=useState("Semua");const [view,setView]=useState("log");
  const target=calcGoal(calcTDEE(calcBMR(d),d.activityLevel),d.goal);
  const consumed=foodLog.reduce((s,f)=>s+f.cal,0);
  const filtered=FOOD_DB.filter(f=>(cat==="Semua"||f.cat===cat)&&(search===""||f.name.toLowerCase().includes(search.toLowerCase())));
  const addFood=f=>{setFoodLog([...foodLog,f]);setView("log")};
  const removeFood=i=>{const n=[...foodLog];n.splice(i,1);setFoodLog(n)};
  const genPlan=()=>{setMealPlan(generateMealPlan(target));setView("plan")};

  return(<div style={S.scr}><SBar/><DashHdr data={d} accent={T.green}/><TabBar active="makan" onTab={onTab}/>
    <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column"}}>
      <div style={{display:"flex",gap:4,padding:"10px 14px 0"}}>
        {[{id:"log",l:"Log Harian",I:CheckCircle},{id:"search",l:"Cari Makanan",I:Search},{id:"plan",l:"Meal Plan",I:Calendar}].map(t=>
          <button key={t.id} onClick={()=>setView(t.id)} style={{flex:1,padding:"8px",borderRadius:10,border:`1px solid ${view===t.id?T.green:T.b}`,background:view===t.id?`${T.green}18`:T.s,color:view===t.id?T.green:T.tx3,fontSize:10,fontFamily:F.d,fontWeight:700,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><t.I size={10}/>{t.l}</button>)}
      </div>
      <div style={{padding:"10px 14px 24px",display:"flex",flexDirection:"column",gap:10}}>
        {view==="log"&&<>
          <div style={{...S.card,padding:12}}>
            <div style={{display:"flex",justifyContent:"space-between",marginBottom:6}}>
              <span style={{fontSize:11,color:T.tx2}}>Dikonsumsi hari ini</span>
              <span style={{fontFamily:F.d,fontWeight:800,fontSize:13,color:T.coral}}>{consumed} / {target} kcal</span>
            </div>
            <div style={{height:6,background:"rgba(255,255,255,.05)",borderRadius:3}}>
              <div style={{height:"100%",width:`${Math.min((consumed/target)*100,100)}%`,background:consumed>target?T.red:`linear-gradient(90deg,${T.green},${T.teal})`,borderRadius:3}}/>
            </div>
          </div>
          {foodLog.length===0?
            <div style={{textAlign:"center",padding:"30px 0",color:T.tx3}}>
              <Utensils size={32} style={{marginBottom:8,opacity:.3}}/><div style={{fontFamily:F.d,fontWeight:700,fontSize:14}}>Belum ada log hari ini</div><div style={{fontSize:11,marginTop:4}}>Tap "Cari Makanan" untuk mulai</div>
            </div>:
            foodLog.map((f,i)=><div key={i} style={{...S.card,display:"flex",alignItems:"center",gap:10,padding:10}}>
              <CatDot cat={f.cat} size={10}/>
              <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.d,fontWeight:700,fontSize:12,color:T.tx}}>{f.name}</div><div style={{fontSize:10,color:T.tx3}}>{f.portion} — {f.carb}c / {f.protein}p / {f.fat}f</div></div>
              <div style={{textAlign:"right",marginRight:4}}><div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:T.coral}}>{f.cal}</div><div style={{fontSize:8,color:T.tx3}}>kcal</div></div>
              <button onClick={()=>removeFood(i)} style={{background:"none",border:"none",cursor:"pointer",color:T.tx4,padding:4}}><X size={14}/></button>
            </div>)}
          <button onClick={()=>setView("search")} style={{...S.btn,background:T.green,boxShadow:`0 4px 16px ${T.green}30`}}><Plus size={16}/> Tambah Makanan</button>
        </>}

        {view==="search"&&<>
          <div style={{position:"relative"}}><Search size={16} style={{position:"absolute",left:12,top:13,color:T.tx3}}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Cari makanan..." style={{...S.inp,paddingLeft:36}}/></div>
          <div style={{display:"flex",gap:4,flexWrap:"wrap"}}>
            {FOOD_CATS.map(c=><button key={c} onClick={()=>setCat(c)} style={{...S.chip(cat===c,T.green),padding:"6px 10px",fontSize:10}}>{c}</button>)}
          </div>
          <div style={{fontSize:10,color:T.tx3}}>{filtered.length} hasil</div>
          {filtered.slice(0,15).map(f=><div key={f.id} style={{...S.card,display:"flex",alignItems:"center",gap:10,padding:10,cursor:"pointer"}} onClick={()=>addFood(f)}>
            <CatDot cat={f.cat} size={10}/>
            <div style={{flex:1,minWidth:0}}><div style={{fontFamily:F.d,fontWeight:700,fontSize:12,color:T.tx}}>{f.name}</div><div style={{fontSize:10,color:T.tx3}}>{f.portion} — {f.cat}</div></div>
            <div style={{textAlign:"right"}}><div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:T.coral}}>{f.cal}</div><div style={{fontSize:8,color:T.tx3}}>kcal</div></div>
            <Plus size={16} color={T.green}/>
          </div>)}
        </>}

        {view==="plan"&&<>
          <button onClick={genPlan} style={{...S.btn,background:`linear-gradient(135deg,${T.teal},${T.green})`}}><RefreshCw size={14}/> Generate Meal Plan ({target} kcal)</button>
          {mealPlan?<>
            <div style={{...S.card,background:`${T.green}10`,border:`1px solid ${T.green}30`}}>
              <div style={{display:"flex",justifyContent:"space-between"}}><div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:T.green}}>Meal Plan Hari Ini</div><div style={{fontFamily:F.d,fontWeight:700,fontSize:12,color:T.tx2}}>Total: {mealPlan.total} kcal</div></div>
            </div>
            {mealPlan.slots.map((slot,si)=><div key={si} style={S.card}>
              <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}>
                <div><div style={{fontFamily:F.d,fontWeight:800,fontSize:13,color:T.teal}}>{slot.name}</div><div style={{fontSize:10,color:T.tx3}}>{slot.time}</div></div>
                <div style={{fontFamily:F.d,fontWeight:700,fontSize:12,color:T.coral}}>{slot.cal} kcal</div>
              </div>
              {slot.items.map((f,fi)=><div key={fi} style={{display:"flex",alignItems:"center",gap:8,padding:"6px 0",borderTop:`1px solid ${T.b}`}}>
                <CatDot cat={f.cat}/>
                <div style={{flex:1}}><div style={{fontSize:11,color:T.tx}}>{f.name}</div><div style={{fontSize:9,color:T.tx3}}>{f.portion} — {f.cal} kcal</div></div>
                <button onClick={()=>addFood(f)} style={{background:`${T.green}18`,border:`1px solid ${T.green}40`,borderRadius:8,padding:"4px 8px",cursor:"pointer",color:T.green,fontSize:9,fontFamily:F.d,fontWeight:700}}>+ Log</button>
              </div>)}
            </div>)}
            <div style={{...S.card,background:`${T.amber}10`,border:`1px solid ${T.amber}30`}}>
              <div style={S.ct}><ShoppingCart size={14} color={T.amber}/> Daftar Belanja</div>
              <div style={{marginTop:8,fontSize:11,color:T.tx2,lineHeight:1.6}}>{[...new Set(mealPlan.slots.flatMap(s=>s.items.map(i=>i.name)))].join(" · ")}</div>
            </div>
          </>:<div style={{textAlign:"center",padding:"30px 0",color:T.tx3}}>
            <Calendar size={32} style={{marginBottom:8,opacity:.3}}/><div style={{fontFamily:F.d,fontWeight:700,fontSize:14}}>Tap tombol di atas untuk generate</div><div style={{fontSize:11,marginTop:4}}>Meal plan otomatis sesuai target kalori</div>
          </div>}
        </>}
      </div>
    </div><HI/></div>);
}

/* ═══════════ TAB 3: LATIHAN ═══════════ */
function DashLatihan({data:d,onTab}){
  const [done,setDone]=useState({});const sess=TRAIN[d.fitnessLevel]||TRAIN.intermediate;
  return(<div style={S.scr}><SBar/><DashHdr data={d} accent={T.purple}/><TabBar active="latihan" onTab={onTab}/>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px 24px",display:"flex",flexDirection:"column",gap:10}}>
      <div style={S.card}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={S.ct}><Activity size={14} color={T.purple}/> Program Latihan</div>
          <div style={{background:`${T.purple}20`,color:T.purple,padding:"3px 10px",borderRadius:20,fontSize:10,fontFamily:F.d,fontWeight:700}}>
            {d.fitnessLevel==="beginner"?"Pemula":d.fitnessLevel==="advanced"?"Lanjutan":"Menengah"}
          </div>
        </div>
      </div>
      {sess.map((s,i)=>{const dn=done[i];return(<div key={i} style={{...S.card,borderColor:dn?`${T.green}40`:T.b,background:dn?`${T.green}08`:T.s}}>
        <div style={{display:"flex",alignItems:"flex-start",gap:10}}>
          <div style={{width:44,height:44,borderRadius:12,background:`${INT_COL[s.int]}18`,border:`1px solid ${INT_COL[s.int]}40`,display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
            <Activity size={18} color={INT_COL[s.int]}/>
          </div>
          <div style={{flex:1,minWidth:0}}>
            <div style={{display:"flex",alignItems:"center",gap:6,flexWrap:"wrap"}}>
              <span style={{fontFamily:F.d,fontWeight:800,fontSize:13}}>{s.day}</span>
              <span style={{fontSize:11,color:T.teal}}>{s.type}</span>
              {dn&&<span style={{fontSize:10,color:T.green}}>Selesai</span>}
            </div>
            <div style={{fontSize:10,color:T.tx2,marginTop:3}}>{s.detail}</div>
            <div style={{display:"flex",gap:4,marginTop:6}}>
              <span style={{fontSize:9,color:T.tx3,background:T.s,padding:"2px 8px",borderRadius:20,border:`1px solid ${T.b}`}}>{s.dur}</span>
              <span style={{fontSize:9,color:INT_COL[s.int],background:`${INT_COL[s.int]}20`,padding:"2px 8px",borderRadius:20}}>{s.int}</span>
            </div>
          </div>
          <button onClick={()=>setDone({...done,[i]:!dn})} style={{background:dn?`${T.green}25`:T.s,border:`1px solid ${dn?T.green:T.b}`,borderRadius:10,padding:8,cursor:"pointer",color:dn?T.green:T.tx4}}>
            {dn?<CheckCircle size={16}/>:<Play size={14}/>}
          </button>
        </div>
      </div>)})}
      <div style={{...S.card,background:`${T.amber}10`,border:`1px solid ${T.amber}30`}}>
        <div style={S.ct}><Zap size={14} color={T.amber}/> Tips</div>
        <div style={{display:"flex",flexDirection:"column",gap:4,marginTop:6}}>
          {["Warmup 5–10 menit sebelum setiap sesi","Ikuti prinsip 80/20: 80% ringan, 20% intense","Istirahat jika mengalami cedera atau kelelahan berlebih","Pastikan tidur 7–9 jam untuk pemulihan optimal"].map((t,i)=>
            <div key={i} style={{fontSize:10,color:T.tx2}}>• {t}</div>)}
        </div>
      </div>
    </div><HI/></div>);
}

/* ═══════════ TAB 4: PROGRESS ═══════════ */
function DashProgress({data:d,foodLog,weightHistory,setWeightHistory,streak,hydration,mealPlan,onTab}){
  const [newWeight,setNewWeight]=useState("");const [showRem,setShowRem]=useState(false);
  const target=calcGoal(calcTDEE(calcBMR(d),d.activityLevel),d.goal);
  const consumed=foodLog.reduce((s,f)=>s+f.cal,0),proT=foodLog.reduce((s,f)=>s+f.protein,0);
  const addW=()=>{if(!newWeight)return;setWeightHistory([...weightHistory,{date:new Date().toLocaleDateString("id-ID",{day:"numeric",month:"short"}),weight:+newWeight}]);setNewWeight("")};
  const bd={totalLogged:foodLog.length,todayLog:foodLog.length,streak,onTarget:Math.abs(consumed-target)<100&&consumed>0,weightLogs:weightHistory.length-1,proteinToday:proT,hydration,mealPlanGenerated:!!mealPlan};
  const earned=BADGES.filter(b=>b.check(bd));
  const chartW=320,chartH=120;const wts=weightHistory.slice(-10);
  const minW=Math.min(...wts.map(w=>w.weight))-2,maxW=Math.max(...wts.map(w=>w.weight))+2;
  const pts=wts.map((w,i)=>{const x=wts.length>1?(i/(wts.length-1))*chartW:chartW/2;const y=chartH-((w.weight-minW)/(maxW-minW))*chartH;return`${x},${y}`});

  return(<div style={S.scr}><SBar/><DashHdr data={d} accent={T.blue}/><TabBar active="progress" onTab={onTab}/>
    <div style={{flex:1,overflowY:"auto",padding:"12px 14px 24px",display:"flex",flexDirection:"column",gap:10}}>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:8}}>
        <div style={{...S.card,background:`${T.coral}10`,border:`1px solid ${T.coral}30`,textAlign:"center"}}>
          <Flame size={22} color={T.coral} style={{margin:"0 auto 4px"}}/>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:24,color:T.coral}}>{streak}</div>
          <div style={{fontSize:10,color:T.tx3}}>hari streak</div>
        </div>
        <div style={{...S.card,background:`${T.green}10`,border:`1px solid ${T.green}30`,textAlign:"center"}}>
          <Award size={22} color={T.green} style={{margin:"0 auto 4px"}}/>
          <div style={{fontFamily:F.d,fontWeight:800,fontSize:24,color:T.green}}>{earned.length}/{BADGES.length}</div>
          <div style={{fontSize:10,color:T.tx3}}>badge earned</div>
        </div>
      </div>

      <div style={S.card}>
        <div style={S.ct}><TrendingUp size={14} color={T.blue}/> Grafik Berat Badan</div>
        <svg width={chartW} height={chartH+30} style={{marginTop:10}} viewBox={`-10 -5 ${chartW+20} ${chartH+35}`}>
          {[0,.25,.5,.75,1].map(p=><line key={p} x1={0} y1={chartH*p} x2={chartW} y2={chartH*p} stroke="rgba(255,255,255,.06)" strokeDasharray="4"/>)}
          {wts.length>1&&<polyline points={pts.join(" ")} fill="none" stroke={T.blue} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>}
          {wts.map((w,i)=>{const x=wts.length>1?(i/(wts.length-1))*chartW:chartW/2;const y=chartH-((w.weight-minW)/(maxW-minW))*chartH;return(<g key={i}><circle cx={x} cy={y} r={4} fill={T.blue} stroke={T.bg} strokeWidth={2}/><text x={x} y={y-10} textAnchor="middle" fill={T.tx2} fontSize={9} fontFamily={F.d}>{w.weight}</text><text x={x} y={chartH+18} textAnchor="middle" fill={T.tx4} fontSize={8}>{w.date}</text></g>)})}
          <text x={-8} y={8} fill={T.tx4} fontSize={8} textAnchor="end">{maxW}</text>
          <text x={-8} y={chartH} fill={T.tx4} fontSize={8} textAnchor="end">{minW}</text>
        </svg>
      </div>

      <div style={{...S.card,display:"flex",gap:8,alignItems:"center"}}>
        <input value={newWeight} onChange={e=>setNewWeight(e.target.value)} type="number" placeholder="Berat hari ini (kg)" style={{...S.inp,flex:1}}/>
        <button onClick={addW} style={{background:T.blue,border:"none",borderRadius:10,padding:"12px 16px",color:"#fff",fontFamily:F.d,fontWeight:700,fontSize:12,cursor:"pointer",whiteSpace:"nowrap"}}>Catat</button>
      </div>

      <div style={S.card}>
        <button onClick={()=>setShowRem(!showRem)} style={{width:"100%",background:"none",border:"none",cursor:"pointer",padding:0,display:"flex",justifyContent:"space-between",alignItems:"center"}}>
          <div style={S.ct}><Bell size={14} color={T.amber}/> Reminder Makan</div>
          <ChevronDown size={14} color={T.tx3} style={{transform:showRem?"rotate(180deg)":"none",transition:"transform .2s"}}/>
        </button>
        {showRem&&<div style={{marginTop:10,display:"flex",flexDirection:"column",gap:6}}>
          {[{t:"07:00",l:"Sarapan"},{t:"10:00",l:"Snack Pagi"},{t:"12:30",l:"Makan Siang"},{t:"15:30",l:"Snack Sore"},{t:"18:30",l:"Makan Malam"},{t:"21:00",l:"Evaluasi Harian"}].map((r,i)=>
            <div key={i} style={{display:"flex",alignItems:"center",gap:10,padding:"8px 10px",background:T.s,borderRadius:10,border:`1px solid ${T.b}`}}>
              <Clock size={14} color={T.tx3}/>
              <div style={{flex:1}}><div style={{fontFamily:F.d,fontWeight:700,fontSize:12,color:T.tx}}>{r.l}</div><div style={{fontSize:10,color:T.tx3}}>Setiap hari pukul {r.t}</div></div>
              <div style={{width:36,height:20,borderRadius:10,background:T.teal,position:"relative",cursor:"pointer"}}><div style={{width:16,height:16,borderRadius:"50%",background:"#fff",position:"absolute",top:2,right:2}}/></div>
            </div>)}
          <div style={{fontSize:10,color:T.tx3,textAlign:"center",marginTop:4}}>Aktif saat aplikasi terinstall sebagai PWA</div>
        </div>}
      </div>

      <div style={S.card}>
        <div style={S.ct}><Award size={14} color={T.amber}/> Achievements</div>
        <div style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:6,marginTop:10}}>
          {BADGES.map(b=>{const got=earned.find(e=>e.id===b.id);const I=b.Icon;return(
            <div key={b.id} style={{textAlign:"center",padding:"8px 2px",borderRadius:10,background:got?`${b.c}15`:T.s,border:`1px solid ${got?b.c+"40":T.b}`,opacity:got?1:.4}}>
              <div style={{width:28,height:28,borderRadius:"50%",background:got?`${b.c}25`:"rgba(255,255,255,.04)",display:"flex",alignItems:"center",justifyContent:"center",margin:"0 auto 4px"}}>
                <I size={14} color={got?b.c:T.tx4}/>
              </div>
              <div style={{fontSize:8,color:got?b.c:T.tx3,fontFamily:F.d,fontWeight:700,lineHeight:1.2}}>{b.name}</div>
            </div>)})}
        </div>
      </div>

      <div style={{...S.card,background:`linear-gradient(135deg,${T.purple}12,${T.teal}08)`,border:`1px solid ${T.purple}30`}}>
        <div style={S.ct}><Star size={14} color={T.purple}/> Ringkasan Harian</div>
        <div style={{marginTop:8,fontSize:11,color:T.tx2,lineHeight:1.8}}>
          {consumed>0?<>
            Kalori: <strong style={{color:T.coral}}>{consumed}</strong> / {target} kcal<br/>
            Protein: <strong style={{color:T.green}}>{proT}g</strong>{proT<(+(d.weight)||65)?` — kurang, target minimal ${Math.round(+(d.weight)||65)}g`:""}<br/>
            Hidrasi: {hydration}/8 gelas<br/>
            Streak: {streak} hari berturut-turut
          </>:<>Mulai log makanan untuk melihat ringkasan harian.</>}
        </div>
      </div>
    </div><HI/></div>);
}

/* ═══════════ SCREEN ROUTER ═══════════ */
const ALL_SCREENS=[
  {id:"landing",title:"Landing",category:"Intro",color:T.teal},
  {id:"step1",title:"Data Diri",category:"Onboarding",color:T.purple},
  {id:"step2",title:"Fitness Level",category:"Onboarding",color:T.purple},
  {id:"step3",title:"Tujuan",category:"Onboarding",color:T.purple},
  {id:"home",title:"Home",category:"Main App",color:T.teal},
  {id:"makan",title:"Makan",category:"Main App",color:T.green},
  {id:"latihan",title:"Latihan",category:"Main App",color:T.purple},
  {id:"progress",title:"Progress",category:"Main App",color:T.blue},
];

function renderScreen(id,d,sd,nav,inter,ex={}){
  const no=()=>{};const n=inter?nav:no;const s=inter?sd:no;
  switch(id){
    case"landing":return<LandingScreen onNext={()=>n("step1")}/>;
    case"step1":return<Step1 data={d} setData={s} onBack={()=>n("landing")} onNext={()=>n("step2")}/>;
    case"step2":return<Step2 data={d} setData={s} onBack={()=>n("step1")} onNext={()=>n("step3")}/>;
    case"step3":return<Step3 data={d} setData={s} onBack={()=>n("step2")} onNext={()=>n("home")}/>;
    case"home":return<DashHome data={d} foodLog={ex.foodLog||[]} hydration={ex.hydration||0} setHydration={ex.setHydration||no} onTab={n}/>;
    case"makan":return<DashMakan data={d} foodLog={ex.foodLog||[]} setFoodLog={ex.setFoodLog||no} mealPlan={ex.mealPlan} setMealPlan={ex.setMealPlan||no} onTab={n}/>;
    case"latihan":return<DashLatihan data={d} onTab={n}/>;
    case"progress":return<DashProgress data={d} foodLog={ex.foodLog||[]} weightHistory={ex.weightHistory||[{date:"Awal",weight:65}]} setWeightHistory={ex.setWeightHistory||no} streak={ex.streak||1} hydration={ex.hydration||0} mealPlan={ex.mealPlan} onTab={n}/>;
    default:return<LandingScreen onNext={()=>n("step1")}/>;
  }
}

/* ═══════════ PHONE FRAME ═══════════ */
function PhoneFrame({children,scale=1,active=false}){
  return(<div style={{width:390*scale+14,height:844*scale+14,background:"linear-gradient(135deg,#2a2a36,#0f0f15)",borderRadius:40*scale+7,padding:7,boxShadow:active?`0 0 0 2px ${T.teal},0 30px 80px ${T.teal}40`:"0 25px 60px rgba(0,0,0,.65),inset 0 0 0 1px rgba(255,255,255,.06)",transition:"all .3s",flexShrink:0}}>
    <div style={{width:390*scale,height:844*scale,borderRadius:36*scale,overflow:"hidden",background:T.bg}}>
      <div style={{transform:`scale(${scale})`,transformOrigin:"top left",width:390,height:844}}>{children}</div>
    </div></div>);
}

/* ═══════════ BOARD VIEW ═══════════ */
function BoardView({data:d,onSelect,extra}){
  const [hov,setHov]=useState(null);
  const cats=[{n:"Intro",d:"Welcome screen"},{n:"Onboarding",d:"Personalisasi"},{n:"Main App",d:"Dashboard"}];
  return(<div style={{padding:"24px 20px 50px",background:T.bg2,minHeight:"100%"}}>
    <div style={{marginBottom:28,textAlign:"center"}}>
      <div style={{display:"inline-flex",alignItems:"center",gap:6,background:`${T.teal}15`,border:`1px solid ${T.teal}30`,borderRadius:100,padding:"5px 12px",marginBottom:10}}>
        <LayoutGrid size={11} color={T.teal}/><span style={{fontSize:10,color:T.teal,fontFamily:F.d,fontWeight:700,letterSpacing:1.5}}>DESIGN BOARD</span>
      </div>
      <h2 style={{fontFamily:F.d,fontWeight:800,fontSize:28,color:T.tx,margin:0}}>RunSync — <span style={{background:`linear-gradient(90deg,${T.teal},${T.purple})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>8 Screens</span></h2>
      <p style={{color:T.tx3,fontSize:12,marginTop:8}}>Klik screen untuk masuk <strong style={{color:T.purple}}>Prototype Mode</strong></p>
    </div>
    {cats.map((cat,ci)=>{const scrs=ALL_SCREENS.filter(s=>s.category===cat.n);const si=ALL_SCREENS.findIndex(s=>s.category===cat.n);
      return(<div key={cat.n} style={{marginBottom:40}}>
        <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
          <div style={{width:28,height:28,borderRadius:7,background:`${[T.teal,T.purple,T.green][ci]}20`,border:`1px solid ${[T.teal,T.purple,T.green][ci]}40`,display:"flex",alignItems:"center",justifyContent:"center",fontFamily:F.d,fontWeight:800,fontSize:11,color:[T.teal,T.purple,T.green][ci]}}>{ci+1}</div>
          <div><div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:T.tx}}>{cat.n}</div><div style={{fontSize:10,color:T.tx3}}>{cat.d} — {scrs.length} screens</div></div>
          <div style={{flex:1,height:1,background:T.b}}/>
        </div>
        <div style={{display:"flex",gap:20,flexWrap:"wrap"}}>
          {scrs.map((scr,i)=>{const gi=si+i+1;const isH=hov===scr.id;return(
            <div key={scr.id} style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8}}>
              <div style={{display:"flex",alignItems:"center",gap:6,padding:"4px 10px",borderRadius:100,background:isH?`${scr.color}20`:T.s,border:`1px solid ${isH?scr.color+"60":T.b}`,transition:"all .25s"}}>
                <span style={{fontFamily:F.d,fontWeight:800,fontSize:9,color:isH?scr.color:T.tx3}}>{String(gi).padStart(2,"0")}</span>
                <span style={{width:1,height:8,background:T.b}}/>
                <span style={{fontFamily:F.d,fontWeight:700,fontSize:10,color:isH?T.tx:T.tx2}}>{scr.title}</span>
              </div>
              <div onMouseEnter={()=>setHov(scr.id)} onMouseLeave={()=>setHov(null)} onClick={()=>onSelect(scr.id)} style={{cursor:"pointer",transform:isH?"translateY(-6px)":"none",transition:"transform .3s",position:"relative"}}>
                <PhoneFrame scale={0.32} active={isH}>{renderScreen(scr.id,d,()=>{},()=>{},false,extra)}</PhoneFrame>
                {isH&&<div style={{position:"absolute",bottom:-8,left:"50%",transform:"translateX(-50%)",background:T.teal,color:T.bg,fontFamily:F.d,fontWeight:800,fontSize:9,padding:"3px 8px",borderRadius:100,whiteSpace:"nowrap"}}>Prototype</div>}
              </div>
            </div>)})}
        </div>
      </div>)})}
    <div style={{background:`${T.teal}10`,border:`1px solid ${T.teal}25`,borderRadius:16,padding:20,textAlign:"center",marginTop:10}}>
      <button onClick={()=>onSelect("landing")} style={{padding:"10px 24px",borderRadius:12,border:"none",background:`linear-gradient(135deg,${T.teal},${T.purple})`,color:T.bg,fontFamily:F.d,fontWeight:800,fontSize:13,cursor:"pointer",display:"inline-flex",alignItems:"center",gap:8}}>Start Prototype <ArrowRight size={14}/></button>
    </div>
  </div>);
}

/* ═══════════ PROTOTYPE VIEW ═══════════ */
function ProtoView({data:d,setData:sd,screen,setScreen,onExit,onReset,extra}){
  const [trans,setTrans]=useState(false);
  const nav=next=>{setTrans(true);setTimeout(()=>{setScreen(next);setTimeout(()=>setTrans(false),50)},150)};
  const ci=ALL_SCREENS.findIndex(s=>s.id===screen);const cur=ALL_SCREENS[ci];
  return(<div style={{minHeight:"100%",background:`radial-gradient(ellipse at top,#1a0a2e,${T.bg2} 60%)`,padding:"20px 16px 40px",display:"flex",flexDirection:"column",alignItems:"center"}}>
    <div style={{display:"flex",alignItems:"center",gap:4,marginBottom:14,flexWrap:"wrap",justifyContent:"center"}}>
      {ALL_SCREENS.map((s,i)=><div key={s.id} style={{display:"flex",alignItems:"center",gap:3}}>
        <button onClick={()=>nav(s.id)} style={{width:26,height:26,borderRadius:"50%",background:screen===s.id?T.teal:i<=ci?`${T.teal}20`:T.s,border:`1px solid ${screen===s.id?T.teal:i<=ci?`${T.teal}50`:T.b}`,color:screen===s.id?T.bg:i<=ci?T.teal:T.tx4,fontFamily:F.d,fontWeight:800,fontSize:10,cursor:"pointer",display:"flex",alignItems:"center",justifyContent:"center"}}>{i+1}</button>
        {i<ALL_SCREENS.length-1&&<div style={{width:6,height:1,background:i<ci?`${T.teal}40`:T.b}}/>}</div>)}
    </div>
    <div style={{marginBottom:12,textAlign:"center"}}>
      <div style={{fontFamily:F.d,fontWeight:800,fontSize:18,color:T.tx}}>{cur?.title}</div>
      <div style={{fontSize:10,color:T.tx3,marginTop:4,display:"flex",alignItems:"center",justifyContent:"center",gap:4}}><MousePointerClick size={10}/> Interactive prototype</div>
    </div>
    <div style={{opacity:trans?.4:1,transform:trans?"scale(.97)":"scale(1)",transition:"all .2s"}}>
      <PhoneFrame scale={0.78}>{renderScreen(screen,d,sd,nav,true,extra)}</PhoneFrame>
    </div>
    <div style={{marginTop:20,display:"flex",gap:8}}>
      <button onClick={onExit} style={{padding:"10px 16px",borderRadius:10,border:`1px solid ${T.b}`,background:T.s,color:T.tx2,fontFamily:F.d,fontWeight:700,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><LayoutGrid size={12}/> Board</button>
      <button onClick={onReset} style={{padding:"10px 16px",borderRadius:10,border:`1px solid ${T.coral}40`,background:`${T.coral}10`,color:T.coral,fontFamily:F.d,fontWeight:700,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:6}}><RotateCcw size={12}/> Reset</button>
    </div>
  </div>);
}

/* ═══════════ MAIN APP ═══════════ */
export default function RunSync(){
  const [mode,setMode]=useState("board");const [screen,setScreen]=useState("landing");
  const [data,setData]=useState({...INIT});const [foodLog,setFoodLog]=useState([]);
  const [hydration,setHydration]=useState(0);const [weightHistory,setWeightHistory]=useState([{date:"Awal",weight:65}]);
  const [mealPlan,setMealPlan]=useState(null);const [streak]=useState(1);
  const extra={foodLog,setFoodLog,hydration,setHydration,weightHistory,setWeightHistory,mealPlan,setMealPlan,streak};
  const handleSelect=id=>{setScreen(id);setMode("prototype")};
  const handleReset=()=>{setData({...INIT});setFoodLog([]);setHydration(0);setWeightHistory([{date:"Awal",weight:65}]);setMealPlan(null);setScreen("landing")};

  return(<div style={{minHeight:"100vh",background:T.bg2,fontFamily:F.b}}>
    <div style={{position:"sticky",top:0,zIndex:100,background:"rgba(5,5,7,.85)",backdropFilter:"blur(20px)",borderBottom:`1px solid ${T.b}`,padding:"12px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:10}}>
      <div style={{display:"flex",alignItems:"center",gap:10}}><Logo s={34}/><div><div style={{fontFamily:F.d,fontWeight:800,fontSize:14,color:T.tx}}>RunSync</div><div style={{fontSize:9,color:T.tx3}}>Smart Running & Nutrition Platform</div></div></div>
      <div style={{display:"flex",background:T.s,borderRadius:10,padding:3,border:`1px solid ${T.b}`}}>
        {[{id:"board",I:LayoutGrid,l:"Board",c:T.teal},{id:"prototype",I:Smartphone,l:"Prototype",c:T.purple}].map(t=>{const a=mode===t.id;return(
          <button key={t.id} onClick={()=>setMode(t.id)} style={{padding:"7px 12px",borderRadius:7,border:"none",background:a?`${t.c}20`:"transparent",color:a?t.c:T.tx3,fontFamily:F.d,fontWeight:700,fontSize:11,cursor:"pointer",display:"flex",alignItems:"center",gap:5}}><t.I size={12}/>{t.l}</button>)})}
      </div>
    </div>
    {mode==="board"?<BoardView data={data} onSelect={handleSelect} extra={extra}/>:
      <ProtoView data={data} setData={setData} screen={screen} setScreen={setScreen} onExit={()=>setMode("board")} onReset={handleReset} extra={extra}/>}
  </div>);
}
