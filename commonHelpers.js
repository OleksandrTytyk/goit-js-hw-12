import{S as w,i as u,a as v}from"./assets/vendor-982b5302.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))i(t);new MutationObserver(t=>{for(const o of t)if(o.type==="childList")for(const n of o.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&i(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const o={};return t.integrity&&(o.integrity=t.integrity),t.referrerPolicy&&(o.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?o.credentials="include":t.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function i(t){if(t.ep)return;t.ep=!0;const o=e(t);fetch(t.href,o)}})();const M="https://pixabay.com/api/",S="41901135-804299004675a38bc43612a92",r={form:document.querySelector(".js-form"),input:document.querySelector(".js-form-input"),btn:document.querySelector(".js-form-btn"),card:document.querySelector(".js-card-container"),loader:document.querySelector(".loader"),loadMore:document.querySelector(".load-more")},l="is-hidden";let d=1,c="",m=0;r.loader.style.display="none";const f=new w(".gallery a",{captionsData:"alt",captionDelay:250});r.form.addEventListener("submit",q);async function q(a){if(a.preventDefault(),j(),r.loader.style.display="block",c=a.currentTarget.elements.query.value.trim(),c===""){r.loader.style.display="none",r.loadMore.classList.add(l),u.warning({message:"Please enter a search query",position:"topRight"});return}try{const{hits:e,totalHits:i}=await p(c);m=Math.ceil(i/40),h(e),f.refresh(),e.length>0&&e.length!==i?(r.loadMore.classList.remove(l),r.loadMore.addEventListener("click",y)):r.loadMore.classList.add(l)}catch(e){console.error(e)}finally{r.loader.style.display="none",r.form.reset()}}async function p(a,s=1){try{const e=await v.get(`${M}/`,{params:{key:S,q:a,image_type:"photo",orientation:"horizontal",safesearch:"true",page:s,per_page:40}});return e.data.hits.length||u.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),e.data}catch(e){throw console.error(e),new Error(e)}}async function y(a){a.preventDefault(),r.loadMore.disabled=!0,d+=1;try{const{hits:s}=await p(c,d);h(s),f.refresh();const e=document.querySelector(".card-item").getBoundingClientRect();window.scrollBy({top:e.height*2,left:0,behavior:"smooth"})}catch(s){console.error(s)}finally{r.loadMore.disabled=!1,d===m&&(r.loadMore.classList.add(l),r.loadMore.removeEventListener("click",y),u.warning({message:"We're sorry, but you've reached the end of search results.",position:"topRight"}))}}function h(a){const s=a.map(e=>{const{webformatURL:i,largeImageURL:t,tags:o,likes:n,views:g,comments:b,downloads:L}=e;return`
        <li class="card-item">
          <div class="card-img js-card-img gallery">
            <a href="${t}" class="big-img js-big-img">
              <img
                src="${i}"
                alt="${o}"
                class="small-img js-small-img"
                width="360px"
                height="260px"
              />
            </a>
          </div>
          <div class="stats-container js-stats-container">
            <p class="stats"><b>Likes:</b> ${n}</p>
            <p class="stats"><b>Views:</b> ${g}</p>
            <p class="stats"><b>Comments:</b> ${b}</p>
            <p class="stats"><b>Downloads:</b> ${L}</p>
          </div>
        </li>`}).join("");r.card.insertAdjacentHTML("beforeend",s)}function j(){r.card.innerHTML=""}
//# sourceMappingURL=commonHelpers.js.map
