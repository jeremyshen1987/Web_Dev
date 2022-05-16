(()=>{"use strict";var e={426:(e,t,n)=>{n.d(t,{Z:()=>p});var r=n(81),o=n.n(r),a=n(645),c=n.n(a),i=n(667),s=n.n(i),d=new URL(n(302),n.b),l=c()(o()),u=s()(d);l.push([e.id,"body {\r\n    background:  url("+u+")  no-repeat;\r\n    background-size: cover;\r\n\r\n}\r\n\r\nheader {\r\n\r\n    margin-bottom: 10vh;\r\n}\r\n\r\n#content {\r\n    width: 80vw;\r\n    margin: auto;\r\n    text-align: center;\r\n}   \r\n\r\n\r\nul {\r\n    display: flex;\r\n    justify-content: center;\r\n    list-style: none;\r\n    padding: 0;\r\n    margin: 0;\r\n    text-align: center;\r\n  }\r\n\r\n\r\nul > li {\r\n\r\n    width: 5%;\r\n    \r\n    text-align: center;\r\n    font-size: 1.3rem;\r\n    border: 2px solid black;\r\n    border-radius: 5px;\r\n    margin: 10px;\r\n    padding: 10px;\r\n}\r\n\r\n.lime {\r\n    background-color: #F9D923;\r\n    border: 2px solid #FF4949;\r\n}\r\n\r\n.menu_container {\r\n\r\n    width: 80vw;\r\n    height: 43vw;\r\n\r\n    display: grid;\r\n    grid-template-columns: 1fr 1fr;\r\n    grid-template-rows: 1fr 1fr;\r\n    grid-auto-flow: row;\r\n    justify-content: center;\r\n    gap: 15px;\r\n\r\n    font-size: 2.5rem;\r\n}\r\n\r\n.menu_container p {\r\n    font-size: 1.5rem;\r\n}\r\n\r\n.map {\r\n    margin-bottom: 5vh;\r\n}\r\n\r\n.item_container {\r\n\r\n    border: #FF8D29 4px solid;\r\n    border-radius: 2%;\r\n\r\n    display: grid;\r\n    grid-template-columns: 3fr 2fr;\r\n    grid-template-rows: repeat(3, 1fr);\r\n    place-items: center;\r\n    padding: 15px;\r\n}\r\n\r\n.item_container img {\r\n\r\n    grid-column: 1;\r\n    grid-row: 1/-1;\r\n    width: 280px;\r\n    aspect-ratio: 1;\r\n    padding: 15px;\r\n}",""]);const p=l},645:e=>{e.exports=function(e){var t=[];return t.toString=function(){return this.map((function(t){var n="",r=void 0!==t[5];return t[4]&&(n+="@supports (".concat(t[4],") {")),t[2]&&(n+="@media ".concat(t[2]," {")),r&&(n+="@layer".concat(t[5].length>0?" ".concat(t[5]):""," {")),n+=e(t),r&&(n+="}"),t[2]&&(n+="}"),t[4]&&(n+="}"),n})).join("")},t.i=function(e,n,r,o,a){"string"==typeof e&&(e=[[null,e,void 0]]);var c={};if(r)for(var i=0;i<this.length;i++){var s=this[i][0];null!=s&&(c[s]=!0)}for(var d=0;d<e.length;d++){var l=[].concat(e[d]);r&&c[l[0]]||(void 0!==a&&(void 0===l[5]||(l[1]="@layer".concat(l[5].length>0?" ".concat(l[5]):""," {").concat(l[1],"}")),l[5]=a),n&&(l[2]?(l[1]="@media ".concat(l[2]," {").concat(l[1],"}"),l[2]=n):l[2]=n),o&&(l[4]?(l[1]="@supports (".concat(l[4],") {").concat(l[1],"}"),l[4]=o):l[4]="".concat(o)),t.push(l))}},t}},667:e=>{e.exports=function(e,t){return t||(t={}),e?(e=String(e.__esModule?e.default:e),/^['"].*['"]$/.test(e)&&(e=e.slice(1,-1)),t.hash&&(e+=t.hash),/["'() \t\n]|(%20)/.test(e)||t.needQuotes?'"'.concat(e.replace(/"/g,'\\"').replace(/\n/g,"\\n"),'"'):e):e}},81:e=>{e.exports=function(e){return e[1]}},379:e=>{var t=[];function n(e){for(var n=-1,r=0;r<t.length;r++)if(t[r].identifier===e){n=r;break}return n}function r(e,r){for(var a={},c=[],i=0;i<e.length;i++){var s=e[i],d=r.base?s[0]+r.base:s[0],l=a[d]||0,u="".concat(d," ").concat(l);a[d]=l+1;var p=n(u),m={css:s[1],media:s[2],sourceMap:s[3],supports:s[4],layer:s[5]};if(-1!==p)t[p].references++,t[p].updater(m);else{var f=o(m,r);r.byIndex=i,t.splice(i,0,{identifier:u,updater:f,references:1})}c.push(u)}return c}function o(e,t){var n=t.domAPI(t);return n.update(e),function(t){if(t){if(t.css===e.css&&t.media===e.media&&t.sourceMap===e.sourceMap&&t.supports===e.supports&&t.layer===e.layer)return;n.update(e=t)}else n.remove()}}e.exports=function(e,o){var a=r(e=e||[],o=o||{});return function(e){e=e||[];for(var c=0;c<a.length;c++){var i=n(a[c]);t[i].references--}for(var s=r(e,o),d=0;d<a.length;d++){var l=n(a[d]);0===t[l].references&&(t[l].updater(),t.splice(l,1))}a=s}}},569:e=>{var t={};e.exports=function(e,n){var r=function(e){if(void 0===t[e]){var n=document.querySelector(e);if(window.HTMLIFrameElement&&n instanceof window.HTMLIFrameElement)try{n=n.contentDocument.head}catch(e){n=null}t[e]=n}return t[e]}(e);if(!r)throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");r.appendChild(n)}},216:e=>{e.exports=function(e){var t=document.createElement("style");return e.setAttributes(t,e.attributes),e.insert(t,e.options),t}},565:(e,t,n)=>{e.exports=function(e){var t=n.nc;t&&e.setAttribute("nonce",t)}},795:e=>{e.exports=function(e){var t=e.insertStyleElement(e);return{update:function(n){!function(e,t,n){var r="";n.supports&&(r+="@supports (".concat(n.supports,") {")),n.media&&(r+="@media ".concat(n.media," {"));var o=void 0!==n.layer;o&&(r+="@layer".concat(n.layer.length>0?" ".concat(n.layer):""," {")),r+=n.css,o&&(r+="}"),n.media&&(r+="}"),n.supports&&(r+="}");var a=n.sourceMap;a&&"undefined"!=typeof btoa&&(r+="\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(a))))," */")),t.styleTagTransform(r,e,t.options)}(t,e,n)},remove:function(){!function(e){if(null===e.parentNode)return!1;e.parentNode.removeChild(e)}(t)}}}},589:e=>{e.exports=function(e,t){if(t.styleSheet)t.styleSheet.cssText=e;else{for(;t.firstChild;)t.removeChild(t.firstChild);t.appendChild(document.createTextNode(e))}}},302:(e,t,n)=>{e.exports=n.p+"f34661c6021da7e21a99.jpg"}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var a=t[r]={id:r,exports:{}};return e[r](a,a.exports,n),a.exports}n.m=e,n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var r=t.getElementsByTagName("script");r.length&&(e=r[r.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e})(),n.b=document.baseURI||self.location.href,n.nc=void 0,(()=>{const e=n.p+"7e2a4fcefa3d778601a9.jpg",t=n.p+"24f463cbdf0a32442e3e.jpeg",r=n.p+"ed086814006d2736cc94.jpg",o=n.p+"c0366de1c02db076899b.jpg",a=n.p+"54732958d2636db0af39.jpg";var c=n(379),i=n.n(c),s=n(795),d=n.n(s),l=n(569),u=n.n(l),p=n(565),m=n.n(p),f=n(216),g=n.n(f),h=n(589),v=n.n(h),y=n(426),b={};function x(){console.log("function running");const e=document.querySelector("#content");e.innerHTML="";const t=document.createElement("h1");t.textContent="About Fastfood",e.append(t);const n=document.createElement("p"),r=document.createElement("p");n.style.fontSize="2rem",r.style.fontSize="2rem",n.textContent='Fast food is a type of mass-produced food designed for commercial resale and with a strong priority placed on "speed of service" versus other relevant factors involved in culinary science. Fast food was created as a commercial strategy to accommodate the larger numbers of busy commuters, travelers and wage workers who often did not have the time to sit down at a public house or diner and wait for their meal. In 2018, the fast food industry was worth an estimated $570 billion globally.',r.textContent='The fastest form of "fast food" consists of pre-cooked meals kept in readiness for a customer\'s arrival (Boston Market rotisserie chicken, Little Caesars pizza, etc.), with waiting time reduced to mere seconds. Other fast food outlets, primarily the hamburger outlets (McDonald\'s, Burger King, etc.) use mass-produced pre-prepared ingredients (bagged buns and condiments, frozen beef patties, vegetables which are prewashed, pre-sliced, or both; etc.) but the hamburgers and french fries are always cooked fresh (or at least relatively recently) and assembled "to order" (like at a diner).',e.append(n,r),document.body.append(e)}b.styleTagTransform=v(),b.setAttributes=m(),b.insert=u().bind(null,"head"),b.domAPI=d(),b.insertStyleElement=g(),i()(y.Z,b),y.Z&&y.Z.locals&&y.Z.locals,x();const w=()=>{const e=document.getElementsByTagName("li");for(let t=0;t<e.length;t++)e[t].classList.remove("lime")},C=document.querySelector(".home"),E=document.querySelector(".menu"),S=document.querySelector(".contact");C.onclick=function(){x(),w(),this.classList.add("lime")},E.onclick=function(){(()=>{console.log("menu");const e=document.querySelector("#content");e.innerHTML="";const n=document.createElement("div");n.classList.add("menu_container");const c=document.createElement("div"),i=document.createElement("div"),s=document.createElement("div"),d=document.createElement("div");c.classList.add("item_container"),i.classList.add("item_container"),s.classList.add("item_container"),d.classList.add("item_container");const l=document.createElement("div"),u=document.createElement("div"),p=document.createElement("div"),m=document.createElement("div"),f=document.createElement("p"),g=document.createElement("p"),h=document.createElement("p"),v=document.createElement("p"),y=document.createElement("p"),b=document.createElement("p"),x=document.createElement("p"),w=document.createElement("p");l.textContent="BLT",y.textContent="$ 7.99 (1 LB)",f.textContent="Bread, Bacon, lettuce, tomato, avocado ",u.textContent="Hawaiian Pizza",b.textContent="$ 3.99 (1 slice)",g.textContent="Pizza, Pineapple, Ham, Cheese, Mozzarella ",p.textContent="Greek Salad",x.textContent="$ 12.99 (340g)",h.textContent="Bell Pepper, Feta Cheese, Cucumber, Cherry Tomato ",m.textContent="Cheesecake",w.textContent="$ 2.99 (1 slice)",v.textContent="Sugar, Cream, Cheese, Egg, Sour Cream ";const C=new Image;C.src=t;const E=new Image;E.src=r;const S=new Image;S.src=o;const T=new Image;T.src=a,c.append(C,l,y,f),i.append(E,u,b,g),s.append(S,p,x,h),d.append(T,m,w,v),n.append(c,i,s,d),e.append(n)})(),w(),this.classList.add("lime")},S.onclick=function(){(()=>{console.log("contact");const t=document.querySelector("#content");t.innerHTML="";const n=document.createElement("h1");n.textContent="Contact Us";const r=document.createElement("h2");r.textContent="Tel: 123-456-7890";const o=document.createElement("h2");o.textContent="Address: 1 Main St, Toronto,ON";const a=new Image(600,400);a.classList.add="map",a.src=e,t.append(a,n,r,o)})(),w(),this.classList.add("lime")}})()})();