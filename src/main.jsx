import React,{useEffect,useMemo,useState} from "react";
import{createRoot}from"react-dom/client";
import"./style.css";
const KEY="hisabpro-history-v1";
const roundRupee=n=>Math.floor(n+0.5);
const money=n=>new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR",maximumFractionDigits:0}).format(n);
function calculate(raw){
 const original=Number(raw);if(!Number.isFinite(original)||original<0)return null;
 const p13=roundRupee(original*.13),after13=roundRupee(original+p13);
 const p10=roundRupee(original*.10),after10=roundRupee(after13+p10);
 const p18=roundRupee(after10*.18),final=roundRupee(after10+p18);
 return{original,p13,after13,p10,after10,p18,final,increase:final-original};
}
function App(){
 const[amount,setAmount]=useState("10000");
 const[history,setHistory]=useState(()=>{try{return JSON.parse(localStorage.getItem(KEY)||"[]")}catch{return[]}});
 const[copied,setCopied]=useState(false);
 const result=useMemo(()=>amount.trim()===""?null:calculate(amount),[amount]);
 const valid=Boolean(result&&Number.isFinite(result.original));
 useEffect(()=>{localStorage.setItem(KEY,JSON.stringify(history))},[history]);
 function save(){if(!valid)return;const item={id:globalThis.crypto?.randomUUID?.()||String(Date.now()),amount:result.original,final:result.final,createdAt:new Date().toISOString()};setHistory(old=>[item,...old].slice(0,50))}
 async function copy(){if(!valid)return;const body=`HisabPro Calculation\nमूल राशि: ${money(result.original)}\n13% जोड़ने के बाद: ${money(result.after13)}\n10% जोड़ने के बाद: ${money(result.after10)}\n18% जोड़ने के बाद अंतिम राशि: ${money(result.final)}`;try{await navigator.clipboard.writeText(body);setCopied(true);window.setTimeout(()=>setCopied(false),1800)}catch{window.prompt("इस परिणाम को कॉपी करें:",body)}}
 function exportCsv(){if(!history.length)return;const rows=[["Date","Original Amount","Final Amount"],...history.map(x=>[new Date(x.createdAt).toLocaleString("en-IN"),x.amount,x.final])];const csv=rows.map(row=>row.map(v=>'"'+String(v).replaceAll('"','""')+'"').join(",")).join("\n");const url=URL.createObjectURL(new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8"}));const a=document.createElement("a");a.href=url;a.download="hisabpro-history.csv";a.click();URL.revokeObjectURL(url)}
 return <div className="app-shell">
 <header className="topbar"><a className="brand" href="#"><span className="brand-mark">₹</span><span>hisab<span className="brand-accent">pro</span><small>SMART CALCULATOR</small></span></a><div className="top-pill"><span className="live-dot"/>आसान हिसाब, एकदम साफ़</div></header>
 <main className="main-wrap">
 <section className="hero"><div className="eyebrow"><span className="eyebrow-line"/>YOUR EVERYDAY CALCULATION TOOL</div><h1>हिसाब अब होगा <span>आसान।</span></h1><p>राशि डालिए और तीन आसान चरणों में पूरा कैलकुलेशन देखिए — हर स्टेप का हिसाब हिंदी में।</p></section>
 <section className="workspace">
 <div className="calculator-card"><div className="card-heading"><div><span className="section-kicker">STEP 01</span><h2>शुरुआती राशि दर्ज करें</h2><p>वह मूल रकम डालें जिस पर कैलकुलेशन करना है।</p></div><div className="rupee-icon">₹</div></div>
 <label className="amount-label" htmlFor="amount">मूल राशि (Original Amount)</label><div className="amount-input-wrap"><span>₹</span><input id="amount" inputMode="decimal" type="number" min="0" step="any" placeholder="जैसे 10000" value={amount} onChange={e=>setAmount(e.target.value)} onKeyDown={e=>{if(e.key==="-"||e.key==="e")e.preventDefault()}}/></div>
 <div className="input-hint"><span className="hint-dot"/>केवल शून्य या उससे बड़ी राशि दर्ज करें।</div>{!valid&&amount.trim()!==""&&<div className="error-text">कृपया एक सही और शून्य से बड़ी राशि दर्ज करें।</div>}
 <div className="rule-note"><span className="note-icon">↗</span><span><b>Rounding rule:</b> हर प्रतिशत की राशि और नया कुल, अगले चरण से पहले नज़दीकी पूरे रुपये में राउंड होगा। 50 पैसे या उससे अधिक होने पर अगला रुपया माना जाएगा।</span></div></div>
 <div className="result-card"><div className="result-top"><div><span className="section-kicker light">YOUR FINAL AMOUNT</span><h2>अंतिम राशि</h2></div><span className="result-check">✓</span></div><div className="final-amount">{valid?money(result.final):"₹ —"}</div><div className="result-caption">तीनों चरण पूरे होने के बाद</div><div className="result-divider"/>
 <div className="result-stats"><div><span>मूल राशि</span><b>{valid?money(result.original):"—"}</b></div><div><span>कुल बढ़ोतरी</span><b className="gain">{valid?"+ "+money(result.increase):"—"}</b></div></div>
 <div className="result-actions"><button className="btn-primary" onClick={copy} disabled={!valid}>{copied?"✓ कॉपी हो गया":"↗ परिणाम कॉपी करें"}</button><button className="btn-ghost" onClick={()=>window.print()} disabled={!valid}>प्रिंट / PDF</button></div><button className="save-button" onClick={save} disabled={!valid}>＋ हिस्ट्री में सेव करें</button></div></section>
 <section className="steps-section"><div className="section-title-row"><div><span className="section-kicker">CALCULATION BREAKDOWN</span><h2>पूरा हिसाब, चरण-दर-चरण</h2><p>हर प्रतिशत मूल राशि या पिछले अपडेटेड टोटल पर कैसे लागू हुआ, यहाँ देखें।</p></div><span className="steps-badge">3 STEPS</span></div>
 <div className="steps-grid">
 <article className="step-card"><div className="step-head"><span className="step-number">01</span><span className="percent-chip">+13%</span></div><h3>पहले 13% जोड़ें</h3><p className="step-hindi">मूल राशि का 13% निकालकर मूल राशि में जोड़ें।</p><div className="formula"><span>13% की राशि</span><b>{valid?money(result.p13):"—"}</b></div><div className="formula total"><span>नया कुल</span><b>{valid?money(result.after13):"—"}</b></div><div className="math-line">{valid?`${money(result.original)} + ${money(result.p13)} = ${money(result.after13)}`:"राशि दर्ज करने पर हिसाब दिखेगा"}</div></article>
 <article className="step-card"><div className="step-head"><span className="step-number">02</span><span className="percent-chip">+10%</span></div><h3>फिर 10% जोड़ें</h3><p className="step-hindi">10% फिर से मूल राशि का निकालें और पहले चरण के कुल में जोड़ें।</p><div className="formula"><span>मूल राशि का 10%</span><b>{valid?money(result.p10):"—"}</b></div><div className="formula total"><span>नया कुल</span><b>{valid?money(result.after10):"—"}</b></div><div className="math-line">{valid?`${money(result.after13)} + ${money(result.p10)} = ${money(result.after10)}`:"राशि दर्ज करने पर हिसाब दिखेगा"}</div></article>
 <article className="step-card final-step"><div className="step-head"><span className="step-number">03</span><span className="percent-chip">+18%</span></div><h3>अंत में 18% जोड़ें</h3><p className="step-hindi">दूसरे चरण के अपडेटेड कुल का 18% निकालकर उसी में जोड़ें।</p><div className="formula"><span>अपडेटेड कुल का 18%</span><b>{valid?money(result.p18):"—"}</b></div><div className="formula total"><span>अंतिम राशि</span><b>{valid?money(result.final):"—"}</b></div><div className="math-line">{valid?`${money(result.after10)} + ${money(result.p18)} = ${money(result.final)}`:"राशि दर्ज करने पर हिसाब दिखेगा"}</div></article>
 </div></section>
 <section className="history-section"><div className="section-title-row history-heading"><div><span className="section-kicker">RECENT ACTIVITY</span><h2>कैलकुलेशन हिस्ट्री</h2><p>आपकी पिछली सेव की गई गणनाएँ इसी डिवाइस पर रहेंगी।</p></div><div className="history-tools"><button className="small-btn" onClick={exportCsv} disabled={!history.length}>↓ CSV Export</button><button className="small-btn danger" onClick={()=>{if(history.length&&window.confirm("क्या आप पूरी हिस्ट्री हटाना चाहते हैं?"))setHistory([])}} disabled={!history.length}>हिस्ट्री हटाएँ</button></div></div>
 {history.length?<div className="history-table-wrap"><table><thead><tr><th>तारीख और समय</th><th>मूल राशि</th><th>अंतिम राशि</th><th/></tr></thead><tbody>{history.map(item=><tr key={item.id}><td>{new Date(item.createdAt).toLocaleString("hi-IN",{dateStyle:"medium",timeStyle:"short"})}</td><td>{money(item.amount)}</td><td className="history-final">{money(item.final)}</td><td><button className="reopen-btn" onClick={()=>{setAmount(String(item.amount));window.scrollTo({top:0,behavior:"smooth"})}}>फिर खोलें ↗</button></td></tr>)}</tbody></table></div>:<div className="empty-history"><span className="empty-icon">◷</span><b>अभी कोई हिस्ट्री नहीं है</b><span>अपनी पहली गणना सेव करें — वह यहाँ दिखाई देगी।</span></div>}</section>
 <footer><div className="footer-brand">₹ hisabpro</div><span>सरल गणना। स्पष्ट परिणाम।</span><span className="footer-right">आपका डेटा इसी ब्राउज़र में सेव रहता है।</span></footer>
 </main></div>
}
createRoot(document.getElementById("root")).render(<React.StrictMode><App/></React.StrictMode>);