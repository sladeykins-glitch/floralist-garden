(()=>{
  const seed=document.getElementById('seedToken');
  const drop=document.getElementById('skullDrop');
  if(!seed||!drop) return;

  const css=document.createElement('style');
  css.textContent=`
    .seed-token{z-index:40!important;touch-action:none!important;pointer-events:auto!important;user-select:none!important;-webkit-user-select:none!important}
    .seed-token.dragging-now{position:fixed!important;z-index:9999!important;bottom:auto!important;margin:0!important;transform:translate(-50%,-50%) rotate(-12deg)!important;cursor:grabbing!important;box-shadow:0 0 34px #c285d6cc,inset -7px -9px 12px #0006!important}
    .drag-label{pointer-events:none!important}
    @media(max-width:760px){
      .garden{overflow:visible!important}
      .seed-token:not(.dragging-now){left:12%!important;bottom:86px!important;width:62px!important;height:78px!important;z-index:45!important}
      .drag-label{left:4%!important;bottom:54px!important;max-width:170px!important;line-height:1.25!important;background:#0b0e0ccf!important;padding:5px 7px!important;border-radius:8px!important}
      .effects{z-index:9!important}
    }
  `;
  document.head.appendChild(css);

  let dragging=false;
  let pid=null;

  function overDrop(x,y){
    const r=drop.getBoundingClientRect();
    return x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom;
  }
  function place(x,y){
    seed.style.setProperty('left',x+'px','important');
    seed.style.setProperty('top',y+'px','important');
    seed.style.setProperty('bottom','auto','important');
    drop.classList.toggle('hot',overDrop(x,y));
  }
  function reset(){
    seed.classList.remove('dragging-now');
    seed.style.removeProperty('top');
    seed.style.removeProperty('bottom');
    seed.style.removeProperty('left');
    drop.classList.remove('hot');
    document.body.style.removeProperty('overscroll-behavior');
  }

  document.addEventListener('pointerdown',e=>{
    if(e.target!==seed || seed.classList.contains('hidden')) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    dragging=true; pid=e.pointerId;
    seed.classList.add('dragging-now');
    document.body.style.overscrollBehavior='none';
    try{seed.setPointerCapture(pid)}catch(_){}
    place(e.clientX,e.clientY);
  },true);

  document.addEventListener('pointermove',e=>{
    if(!dragging||e.pointerId!==pid) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    place(e.clientX,e.clientY);
  },true);

  document.addEventListener('pointerup',e=>{
    if(!dragging||e.pointerId!==pid) return;
    e.preventDefault();
    e.stopImmediatePropagation();
    const planted=overDrop(e.clientX,e.clientY);
    dragging=false;
    try{seed.releasePointerCapture(pid)}catch(_){}
    pid=null;
    reset();
    if(planted) drop.click();
  },true);

  document.addEventListener('pointercancel',e=>{
    if(!dragging||e.pointerId!==pid) return;
    e.stopImmediatePropagation();
    dragging=false; pid=null; reset();
  },true);
})();