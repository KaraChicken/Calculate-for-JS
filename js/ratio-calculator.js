(()=>{"use strict";
const forms=document.querySelectorAll("[data-ratio-form]");
const numberFormat=new Intl.NumberFormat("zh-TW",{maximumFractionDigits:8});
function gcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){const t=b;b=a%b;a=t}return a}
function decimalPlaces(value){const text=String(value).toLowerCase();if(text.includes("e-"))return Number(text.split("e-")[1]);return (text.split(".")[1]||"").length}
function simplify(a,b){
  if(!Number.isFinite(a)||!Number.isFinite(b)||a<0||b<0||(a===0&&b===0))throw new Error("請輸入有效的非負數，且兩個數字不可同時為 0。");
  const places=Math.min(8,Math.max(decimalPlaces(a),decimalPlaces(b)));
  const factor=10**places,ia=Math.round(a*factor),ib=Math.round(b*factor),divisor=gcd(ia,ib);
  if(!divisor)throw new Error("這組數字無法化簡。");
  return [ia/divisor,ib/divisor];
}
function read(form,name){const value=Number(form.elements[name].value);if(!Number.isFinite(value))throw new Error("請確認所有欄位都填入有效數字。");return value}
function format(value){return numberFormat.format(Number(value.toPrecision(10)))}
function show(form,message,isError=false){const output=form.querySelector(".ratio-result");output.textContent=message;output.dataset.error=String(isError)}
const handlers={
  simplify(form){const [a,b]=simplify(read(form,"a"),read(form,"b"));return "最簡比例："+a+" : "+b},
  proportion(form){const a=read(form,"a"),b=read(form,"b"),c=read(form,"c");if(a===0)throw new Error("A 不可為 0，否則無法求出唯一的 X。");return "X = B × C ÷ A = "+format(b*c/a)},
  percentage(form){const a=read(form,"a"),b=read(form,"b"),sum=a+b;if(a<0||b<0||sum===0)throw new Error("請輸入非負數，且兩個數字不可同時為 0。");return "前項："+format(a/sum*100)+"%；後項："+format(b/sum*100)+"%"},
  "percent-to-ratio"(form){const p=read(form,"percent");if(p<0||p>100)throw new Error("百分比必須介於 0 到 100 之間。");const [a,b]=simplify(p,100-p);return format(p)+"% = "+a+" : "+b},
  split(form){const total=read(form,"total"),a=read(form,"a"),b=read(form,"b");if(total<0)throw new Error("總量不可小於 0。");if(a<0||b<0||a+b===0)throw new Error("比例必須是非負數，且不可同時為 0。");const sum=a+b,partA=total*a/sum,partB=total*b/sum;return "前項分配："+format(partA)+"；後項分配："+format(partB)+"（合計 "+format(partA+partB)+"）"}
};
forms.forEach(form=>form.addEventListener("submit",event=>{event.preventDefault();try{show(form,handlers[form.dataset.ratioForm](form))}catch(error){show(form,error.message,true)}}));
})();