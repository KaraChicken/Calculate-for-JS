(()=>{"use strict";
const forms=document.querySelectorAll("[data-percent-form]");
const fmt=new Intl.NumberFormat("zh-TW",{maximumFractionDigits:8});
const read=(form,name)=>{const value=Number(form.elements[name].value);if(!Number.isFinite(value))throw new Error("請輸入有效數字。");return value};
const out=value=>fmt.format(Number(value.toPrecision(10)));
const show=(form,message,isError=false)=>{const el=form.querySelector(".ratio-result");el.textContent=message;el.dataset.error=String(isError)};
const handlers={
  of(form){const base=read(form,"base"),rate=read(form,"rate");return out(base)+" 的 "+out(rate)+"% = "+out(base*rate/100)},
  what(form){const part=read(form,"part"),whole=read(form,"whole");if(whole===0)throw new Error("整體數值不可為 0。");return out(part)+" 是 "+out(whole)+" 的 "+out(part/whole*100)+"%"},
  change(form){const old=read(form,"old"),next=read(form,"next");if(old===0)throw new Error("原始數值不可為 0，否則百分比變化率無法定義。");const rate=(next-old)/Math.abs(old)*100;const status=rate>0?"增加":rate<0?"減少":"沒有變化";return "從 "+out(old)+" 到 "+out(next)+"："+status+" "+out(Math.abs(rate))+"%（變化率 "+(rate>0?"+":"")+out(rate)+"%）"},
  adjust(form){const base=read(form,"base"),rate=read(form,"rate");if(rate<0)throw new Error("變動百分比請輸入 0 或正數，方向由選單決定。");const increase=form.elements.direction.value==="increase",result=base*(1+(increase?1:-1)*rate/100);return "變動後："+out(result)+"（"+(increase?"增加":"減少")+out(rate)+"%，差額 "+(result-base>=0?"+":"")+out(result-base)+"）"},
  reverse(form){const known=read(form,"known"),rate=read(form,"rate");if(rate<=0)throw new Error("所占百分比必須大於 0%。");return "原始數值 = "+out(known)+" ÷ "+out(rate)+"% = "+out(known/(rate/100))},
  discount(form){const price=read(form,"price"),rate=read(form,"rate");if(price<0||rate<0||rate>100)throw new Error("原價不可小於 0，折扣率必須介於 0% 到 100%。");return "折扣後價格："+out(price*(1-rate/100))+"；省下："+out(price*rate/100)},
  sequence(form){const base=read(form,"base"),first=read(form,"first"),second=read(form,"second");if(first<=-100||second<=-100)throw new Error("單次減少幅度不可達到或超過 100%。");const result=base*(1+first/100)*(1+second/100),net=(result/base-1)*100;return "最終數值："+out(result)+"；整體變化："+(net>0?"增加 ":net<0?"減少 ":"")+out(Math.abs(net))+"%"},
  points(form){const a=read(form,"a"),b=read(form,"b"),delta=b-a;return "百分點差異："+(delta>0?"+":"")+out(delta)+" 個百分點（pp）"}
};
forms.forEach(form=>form.addEventListener("submit",event=>{event.preventDefault();try{show(form,handlers[form.dataset.percentForm](form))}catch(error){show(form,error.message,true)}}));
})();