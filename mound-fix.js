(()=>{
const style=document.createElement('style');style.textContent=`
.mound-stage{position:absolute!important;left:41%!important;bottom:-12px!important;transform:translateX(-50%)!important;width:min(86vw,470px)!important;height:300px!important;z-index:4!important;pointer-events:none!important}
.mound-stage .hole-target{left:50%!important;top:35px!important;transform:translateX(-50%)!important;width:132px!important;height:76px!important;pointer-events:auto!important}
.mound-stage .plant{left:50%!important;top:2px!important}
@media(max-width:760px){.mound-stage{left:50%!important;width:min(96vw,450px)!important;height:285px!important;bottom:-6px!important}.mound-stage .hole-target{left:50%!important;top:40px!important;width:138px!important;height:80px!important}.mound-stage .plant{left:50%!important;top:8px!important}}
`;document.head.appendChild(style);
const desc=document.getElementById('seedDesc');const label=document.getElementById('dragLabel');const token=document.getElementById('seedToken');const drop=document.getElementById('skullDrop');
function cleanText(){if(desc&&/skull/i.test(desc.textContent))desc.textContent='Prepare a seed from your bag, then drag it into the planting hollow in the earth.';if(label)label.textContent='Drag or tap the little seed into the planting hollow';if(token)token.setAttribute('aria-label','Prepared seed. Drag into the earth to plant.');if(drop)drop.setAttribute('aria-label','Planting hollow');}
cleanText();
if(desc)new MutationObserver(cleanText).observe(desc,{childList:true,characterData:true,subtree:true});
})();