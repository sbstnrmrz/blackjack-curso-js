(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const o of r)if(o.type==="childList")for(const d of o.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&i(d)}).observe(document,{childList:!0,subtree:!0});function f(r){const o={};return r.integrity&&(o.integrity=r.integrity),r.referrerPolicy&&(o.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?o.credentials="include":r.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(r){if(r.ep)return;r.ep=!0;const o=f(r);fetch(r.href,o)}})();function E(){const u=document.querySelector("#player-cards"),a=document.querySelector("#dealer-cards"),f=document.querySelector("#player-score"),i=document.querySelector("#dealer-score"),r=document.querySelector("#game-over-msg");let o=[];const d=document.querySelector("#hit-button"),q=document.querySelector("#new-game-button"),m=document.querySelector("#stand-button"),y="/assets/cartas/",x={red:"/assets/cartas/red_back.png"};let s={cards:[],score:0},n={cards:[],score:0},P=["C","S","H","D"],w={10:"J",11:"Q",12:"K"};for(const e of P)for(let t=0;t<13;t++){const c=t%13;let l="";c<10&&(l=`${t+1}${e}`),c==0&&(l=`A${e}`),c>9&&(l=`${w[t]}${e}`),o.push(l)}console.log(o.length);function h(){s.cards=[],u.textContent="",S(),n.cards=[],a.textContent="",L(),g(),O(),C(),d.disabled=!1,m.disabled=!1,r.textContent=""}function b(){for(d.disabled=!0,m.disabled=!0,document.querySelector("#hidden-card").remove(),g();n.score<17&&s.score<=21;)g();let e="";s.score==n.score?e="Draw":s.score>21||n.score>s.score&&n.score<=21?e="Player Lose":e="Player Wins",r.textContent=e}function v(){return o[Math.floor(Math.random()*o.length)]}function p(e){let t=0;const c=e.length==3?e.slice(0,2):e.slice(0,1);return parseInt(c)<=10?t=parseInt(c):c=="A"?t=11:t=10,t}function C(){const e=v(),t=document.createElement("img");t.src=y+e+".png",t.classList.add("card"),u.appendChild(t),s.cards.push(e),S(),s.score>21&&(console.log("tralalero tralalal"),b())}function g(){const e=v(),t=document.createElement("img");t.src=y+e+".png",t.classList.add("card"),a.appendChild(t),n.cards.push(e),L(),console.log("dealer hit card: "+e),console.log("dealer cards: "+n.cards),console.log("card score: "+p(e))}function O(){const e=document.createElement("img");e.src=x.red,e.id="hidden-card",e.classList.add("card"),a.appendChild(e)}function S(){let e=0;for(const t of s.cards){const c=t.substring(0,1)=="A"&&s.score>=11;e+=c?1:p(t)}f.textContent="Jugador - "+e,s.score=e,console.warn("current player score: "+s.score)}function L(){let e=0;for(const t of n.cards)e+=p(t);n.score=e,i.textContent="Dealer - "+e}m.addEventListener("click",()=>{b()}),d.addEventListener("click",()=>{C()}),q.addEventListener("click",()=>{h()}),h()}document.querySelector("#app").innerHTML=`
  <div>
    <div class='row my-2'>
      <div class='col text-center' id='buttons-container'>
        <button id='new-game-button' class='btn btn-danger' type="button">Nuevo Juego</button> 
        <button id='hit-button' class='btn btn-primary' type="button">Pedir Carta</button> 
        <button id='stand-button' class='btn btn-primary' type="button">Detener</button> 
      </div>
    </div>
    <div class="px-5">
      <h1 id='player-score'>Jugador - 0</h1>
      <div class='d-flex' id='player-cards'> 
      </div>
    </div>

    <div class='p-5'>
      <h1 id='game-over-msg'></h1>
    </div>

    <div class="px-5">
      <h1 id='dealer-score'>Dealer - 0</h1>
      <div id='dealer-cards' class="d-flex"> 
      </div>
    </div>

  </div>
`;E();
