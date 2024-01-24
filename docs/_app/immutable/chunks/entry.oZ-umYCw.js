import{M as rt}from"./scheduler.9PBM3dH7.js";import{w as pe}from"./index.6-72uIJN.js";new URL("sveltekit-internal://");function ot(e,t){return e==="/"||t==="ignore"?e:t==="never"?e.endsWith("/")?e.slice(0,-1):e:t==="always"&&!e.endsWith("/")?e+"/":e}function st(e){return e.split("%25").map(decodeURI).join("%25")}function it(e){for(const t in e)e[t]=decodeURIComponent(e[t]);return e}function ce({href:e}){return e.split("#")[0]}const ct=["href","pathname","search","toString","toJSON"];function lt(e,t,n){const a=new URL(e);Object.defineProperty(a,"searchParams",{value:new Proxy(a.searchParams,{get(r,o){if(o==="get"||o==="getAll"||o==="has")return s=>(n(s),r[o](s));t();const i=Reflect.get(r,o);return typeof i=="function"?i.bind(r):i}}),enumerable:!0,configurable:!0});for(const r of ct)Object.defineProperty(a,r,{get(){return t(),e[r]},enumerable:!0,configurable:!0});return a}const ft="/__data.json",ut=".html__data.json";function dt(e){return e.endsWith(".html")?e.replace(/\.html$/,ut):e.replace(/\/$/,"")+ft}function ht(...e){let t=5381;for(const n of e)if(typeof n=="string"){let a=n.length;for(;a;)t=t*33^n.charCodeAt(--a)}else if(ArrayBuffer.isView(n)){const a=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let r=a.length;for(;r;)t=t*33^a[--r]}else throw new TypeError("value must be a string or TypedArray");return(t>>>0).toString(36)}const Ne=window.fetch;window.fetch=(e,t)=>((e instanceof Request?e.method:t?.method||"GET")!=="GET"&&C.delete(ge(e)),Ne(e,t));const C=new Map;function pt(e){const t=atob(e),n=new Uint8Array(t.length);for(let a=0;a<t.length;a++)n[a]=t.charCodeAt(a);return n.buffer}function gt(e,t){const n=ge(e,t),a=document.querySelector(n);if(a?.textContent){let{body:r,...o}=JSON.parse(a.textContent);const i=a.getAttribute("data-ttl");return i&&C.set(n,{body:r,init:o,ttl:1e3*Number(i)}),a.getAttribute("data-b64")!==null&&(r=pt(r)),Promise.resolve(new Response(r,o))}return window.fetch(e,t)}function _t(e,t,n){if(C.size>0){const a=ge(e,n),r=C.get(a);if(r){if(performance.now()<r.ttl&&["default","force-cache","only-if-cached",void 0].includes(n?.cache))return new Response(r.body,r.init);C.delete(a)}}return window.fetch(t,n)}function ge(e,t){let a=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(t?.headers||t?.body){const r=[];t.headers&&r.push([...new Headers(t.headers)].join(",")),t.body&&(typeof t.body=="string"||ArrayBuffer.isView(t.body))&&r.push(t.body),a+=`[data-hash="${ht(...r)}"]`}return a}const mt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function yt(e){const t=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${vt(e).map(a=>{const r=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(a);if(r)return t.push({name:r[1],matcher:r[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(a);if(o)return t.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!a)return;const i=a.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,l)=>{if(l%2){if(c.startsWith("x+"))return le(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return le(String.fromCharCode(...c.slice(2).split("-").map(p=>parseInt(p,16))));const d=mt.exec(c),[,g,u,f,h]=d;return t.push({name:f,matcher:h,optional:!!g,rest:!!u,chained:u?l===1&&i[0]==="":!1}),u?"(.*?)":g?"([^/]*)?":"([^/]+?)"}return le(c)}).join("")}).join("")}/?$`),params:t}}function wt(e){return!/^\([^)]+\)$/.test(e)}function vt(e){return e.slice(1).split("/").filter(wt)}function bt(e,t,n){const a={},r=e.slice(1),o=r.filter(s=>s!==void 0);let i=0;for(let s=0;s<t.length;s+=1){const c=t[s];let l=r[s-i];if(c.chained&&c.rest&&i&&(l=r.slice(s-i,s+1).filter(d=>d).join("/"),i=0),l===void 0){c.rest&&(a[c.name]="");continue}if(!c.matcher||n[c.matcher](l)){a[c.name]=l;const d=t[s+1],g=r[s+1];d&&!d.rest&&d.optional&&g&&c.chained&&(i=0),!d&&!g&&Object.keys(a).length===o.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return a}function le(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Et({nodes:e,server_loads:t,dictionary:n,matchers:a}){const r=new Set(t);return Object.entries(n).map(([s,[c,l,d]])=>{const{pattern:g,params:u}=yt(s),f={id:s,exec:h=>{const p=g.exec(h);if(p)return bt(p,u,a)},errors:[1,...d||[]].map(h=>e[h]),layouts:[0,...l||[]].map(i),leaf:o(c)};return f.errors.length=f.layouts.length=Math.max(f.errors.length,f.layouts.length),f});function o(s){const c=s<0;return c&&(s=~s),[c,e[s]]}function i(s){return s===void 0?s:[r.has(s),e[s]]}}function Oe(e,t=JSON.parse){try{return t(sessionStorage[e])}catch{}}function Re(e,t,n=JSON.stringify){const a=n(t);try{sessionStorage[e]=a}catch{}}const A=globalThis.__sveltekit_9prc7m?.base??"/your-repo-name",kt=globalThis.__sveltekit_9prc7m?.assets??A,St="1706125992344",je="sveltekit:snapshot",$e="sveltekit:scroll",_e="sveltekit:states",De="sveltekit:pageurl",T="sveltekit:history",O="sveltekit:navigation",K={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},q=location.origin;function me(e){if(e instanceof URL)return e;let t=document.baseURI;if(!t){const n=document.getElementsByTagName("base");t=n.length?n[0].href:document.URL}return new URL(e,t)}function ye(){return{x:pageXOffset,y:pageYOffset}}function x(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const Ie={...K,"":K.hover};function Ce(e){let t=e.assignedSlot??e.parentNode;return t?.nodeType===11&&(t=t.host),t}function Ve(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=Ce(e)}}function ue(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const a=e instanceof SVGAElement?e.target.baseVal:e.target,r=!n||!!a||ee(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),o=n?.origin===q&&e.hasAttribute("download");return{url:n,external:r,target:a,download:o}}function Y(e){let t=null,n=null,a=null,r=null,o=null,i=null,s=e;for(;s&&s!==document.documentElement;)a===null&&(a=x(s,"preload-code")),r===null&&(r=x(s,"preload-data")),t===null&&(t=x(s,"keepfocus")),n===null&&(n=x(s,"noscroll")),o===null&&(o=x(s,"reload")),i===null&&(i=x(s,"replacestate")),s=Ce(s);function c(l){switch(l){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Ie[a??"off"],preload_data:Ie[r??"off"],keepfocus:c(t),noscroll:c(n),reload:c(o),replace_state:c(i)}}function Le(e){const t=pe(e);let n=!0;function a(){n=!0,t.update(i=>i)}function r(i){n=!1,t.set(i)}function o(i){let s;return t.subscribe(c=>{(s===void 0||n&&c!==s)&&i(s=c)})}return{notify:a,set:r,subscribe:o}}function At(){const{set:e,subscribe:t}=pe(!1);let n;async function a(){clearTimeout(n);try{const r=await fetch(`${kt}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!r.ok)return!1;const i=(await r.json()).version!==St;return i&&(e(!0),clearTimeout(n)),i}catch{return!1}}return{subscribe:t,check:a}}function ee(e,t){return e.origin!==q||!e.pathname.startsWith(t)}const Rt=-1,It=-2,Lt=-3,Pt=-4,Tt=-5,Ut=-6;function xt(e,t){if(typeof e=="number")return r(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const n=e,a=Array(n.length);function r(o,i=!1){if(o===Rt)return;if(o===Lt)return NaN;if(o===Pt)return 1/0;if(o===Tt)return-1/0;if(o===Ut)return-0;if(i)throw new Error("Invalid input");if(o in a)return a[o];const s=n[o];if(!s||typeof s!="object")a[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const c=s[0],l=t?.[c];if(l)return a[o]=l(r(s[1]));switch(c){case"Date":a[o]=new Date(s[1]);break;case"Set":const d=new Set;a[o]=d;for(let f=1;f<s.length;f+=1)d.add(r(s[f]));break;case"Map":const g=new Map;a[o]=g;for(let f=1;f<s.length;f+=2)g.set(r(s[f]),r(s[f+1]));break;case"RegExp":a[o]=new RegExp(s[1],s[2]);break;case"Object":a[o]=Object(s[1]);break;case"BigInt":a[o]=BigInt(s[1]);break;case"null":const u=Object.create(null);a[o]=u;for(let f=1;f<s.length;f+=2)u[s[f]]=r(s[f+1]);break;default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(s.length);a[o]=c;for(let l=0;l<s.length;l+=1){const d=s[l];d!==It&&(c[l]=r(d))}}else{const c={};a[o]=c;for(const l in s){const d=s[l];c[l]=r(d)}}return a[o]}return r(0)}const Fe=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...Fe];const Nt=new Set([...Fe]);[...Nt];function Ot(e){return e.filter(t=>t!=null)}class te{constructor(t,n){this.status=t,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${t}`}}toString(){return JSON.stringify(this.body)}}class Me{constructor(t,n){this.status=t,this.location=n}}class we extends Error{constructor(t,n,a){super(a),this.status=t,this.text=n}}const jt="x-sveltekit-invalidated",$t="x-sveltekit-trailing-slash";function J(e){return e instanceof te||e instanceof we?e.status:500}function Dt(e){return e instanceof we?e.text:"Internal Error"}const U=Oe($e)??{},F=Oe(je)??{},Ge=history.pushState,ve=history.replaceState,L={url:Le({}),page:Le({}),navigating:pe(null),updated:At()};function ne(e){U[e]=ye()}function qe(e,t){let n=e+1;for(;U[n];)delete U[n],n+=1;for(n=t+1;F[n];)delete F[n],n+=1}function j(e){return location.href=e.href,new Promise(()=>{})}function Pe(){}let ae,de,W,I,he,$;const He=[],z=[];let N=null;const Be=[],Ct=[];let V=[],y={branch:[],error:null,url:null},be=!1,X=!1,Te=!0,M=!1,D=!1,Ke=!1,Ee=!1,re,w,S,E,Z;async function Wt(e,t,n){document.URL!==location.href&&(location.href=location.href),$=e,ae=Et(e),I=document.documentElement,he=t,de=e.nodes[0],W=e.nodes[1],de(),W(),w=history.state?.[T],S=history.state?.[O],w||(w=S=Date.now(),ve.call(history,{...history.state,[T]:w,[O]:S},""));const a=U[w];a&&(history.scrollRestoration="manual",scrollTo(a.x,a.y)),n?await Bt(he,n):qt(location.href,{replaceState:!0}),Ht()}function Ye(e){z.some(t=>t?.snapshot)&&(F[e]=z.map(t=>t?.snapshot?.capture()))}function Je(e){F[e]?.forEach((t,n)=>{z[n]?.snapshot?.restore(t)})}function Ue(){ne(w),Re($e,U),Ye(S),Re(je,F)}async function We(e,t,n,a){return B({type:"goto",url:me(e),keepfocus:t.keepFocus,noscroll:t.noScroll,replace_state:t.replaceState,state:t.state,redirect_count:n,nav_token:a,accept:()=>{t.invalidateAll&&(Ee=!0)}})}async function Vt(e){return N={id:e.id,promise:Xe(e).then(t=>(t.type==="loaded"&&t.state.error&&(N=null),t))},N.promise}async function fe(e){const t=ae.find(n=>n.exec(Ze(e)));t&&await Promise.all([...t.layouts,t.leaf].map(n=>n?.[1]()))}function ze(e,t){y=e.state;const n=document.querySelector("style[data-sveltekit]");n&&n.remove(),E=e.props.page,re=new $.root({target:t,props:{...e.props,stores:L,components:z},hydrate:!0}),Je(S);const a={from:null,to:{params:y.params,route:{id:y.route?.id??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};V.forEach(r=>r(a)),X=!0}async function Q({url:e,params:t,branch:n,status:a,error:r,route:o,form:i}){let s="never";if(A&&(e.pathname===A||e.pathname===A+"/"))s="always";else for(const f of n)f?.slash!==void 0&&(s=f.slash);e.pathname=ot(e.pathname,s),e.search=e.search;const c={type:"loaded",state:{url:e,params:t,branch:n,error:r,route:o},props:{constructors:Ot(n).map(f=>f.node.component),page:E}};i!==void 0&&(c.props.form=i);let l={},d=!E,g=0;for(let f=0;f<Math.max(n.length,y.branch.length);f+=1){const h=n[f],p=y.branch[f];h?.data!==p?.data&&(d=!0),h&&(l={...l,...h.data},d&&(c.props[`data_${g}`]=l),g+=1)}return(!y.url||e.href!==y.url.href||y.error!==r||i!==void 0&&i!==E.form||d)&&(c.props.page={error:r,params:t,route:{id:o?.id??null},state:{},status:a,url:new URL(e),form:i??null,data:d?l:E.data}),c}async function ke({loader:e,parent:t,url:n,params:a,route:r,server_data_node:o}){let i=null,s=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},l=await e();if(l.universal?.load){let d=function(...u){for(const f of u){const{href:h}=new URL(f,n);c.dependencies.add(h)}};const g={route:new Proxy(r,{get:(u,f)=>(s&&(c.route=!0),u[f])}),params:new Proxy(a,{get:(u,f)=>(s&&c.params.add(f),u[f])}),data:o?.data??null,url:lt(n,()=>{s&&(c.url=!0)},u=>{s&&c.search_params.add(u)}),async fetch(u,f){let h;u instanceof Request?(h=u.url,f={body:u.method==="GET"||u.method==="HEAD"?void 0:await u.blob(),cache:u.cache,credentials:u.credentials,headers:u.headers,integrity:u.integrity,keepalive:u.keepalive,method:u.method,mode:u.mode,redirect:u.redirect,referrer:u.referrer,referrerPolicy:u.referrerPolicy,signal:u.signal,...f}):h=u;const p=new URL(h,n);return s&&d(p.href),p.origin===n.origin&&(h=p.href.slice(n.origin.length)),X?_t(h,p.href,f):gt(h,f)},setHeaders:()=>{},depends:d,parent(){return s&&(c.parent=!0),t()},untrack(u){s=!1;try{return u()}finally{s=!0}}};i=await l.universal.load.call(null,g)??null}return{node:l,loader:e,server:o,universal:l.universal?.load?{type:"data",data:i,uses:c}:null,data:i??o?.data??null,slash:l.universal?.trailingSlash??o?.slash}}function xe(e,t,n,a,r,o){if(Ee)return!0;if(!r)return!1;if(r.parent&&e||r.route&&t||r.url&&n)return!0;for(const i of r.search_params)if(a.has(i))return!0;for(const i of r.params)if(o[i]!==y.params[i])return!0;for(const i of r.dependencies)if(He.some(s=>s(new URL(i))))return!0;return!1}function Se(e,t){return e?.type==="data"?e:e?.type==="skip"?t??null:null}function Ft(e,t){if(!e)return new Set(t.searchParams.keys());const n=new Set([...e.searchParams.keys(),...t.searchParams.keys()]);for(const a of n){const r=e.searchParams.getAll(a),o=t.searchParams.getAll(a);r.every(i=>o.includes(i))&&o.every(i=>r.includes(i))&&n.delete(a)}return n}async function Xe({id:e,invalidating:t,url:n,params:a,route:r}){if(N?.id===e)return N.promise;const{errors:o,layouts:i,leaf:s}=r,c=[...i,s];o.forEach(_=>_?.().catch(()=>{})),c.forEach(_=>_?.[1]().catch(()=>{}));let l=null;const d=y.url?e!==y.url.pathname+y.url.search:!1,g=y.route?r.id!==y.route.id:!1,u=Ft(y.url,n);let f=!1;const h=c.map((_,m)=>{const v=y.branch[m],b=!!_?.[0]&&(v?.loader!==_[1]||xe(f,g,d,u,v.server?.uses,a));return b&&(f=!0),b});if(h.some(Boolean)){try{l=await tt(n,h)}catch(_){return oe({status:J(_),error:await G(_,{url:n,params:a,route:{id:r.id}}),url:n,route:r})}if(l.type==="redirect")return l}const p=l?.nodes;let R=!1;const k=c.map(async(_,m)=>{if(!_)return;const v=y.branch[m],b=p?.[m];if((!b||b.type==="skip")&&_[1]===v?.loader&&!xe(R,g,d,u,v.universal?.uses,a))return v;if(R=!0,b?.type==="error")throw b;return ke({loader:_[1],url:n,params:a,route:r,parent:async()=>{const se={};for(let ie=0;ie<m;ie+=1)Object.assign(se,(await k[ie])?.data);return se},server_data_node:Se(b===void 0&&_[0]?{type:"skip"}:b??null,_[0]?v?.server:void 0)})});for(const _ of k)_.catch(()=>{});const P=[];for(let _=0;_<c.length;_+=1)if(c[_])try{P.push(await k[_])}catch(m){if(m instanceof Me)return{type:"redirect",location:m.location};let v=J(m),b;if(p?.includes(m))v=m.status??v,b=m.error;else if(m instanceof te)b=m.body;else{if(await L.updated.check())return await j(n);b=await G(m,{params:a,url:n,route:{id:r.id}})}const H=await Mt(_,P,o);return H?await Q({url:n,params:a,branch:P.slice(0,H.idx).concat(H.node),status:v,error:b,route:r}):await et(n,{id:r.id},b,v)}else P.push(void 0);return await Q({url:n,params:a,branch:P,status:200,error:null,route:r,form:t?void 0:null})}async function Mt(e,t,n){for(;e--;)if(n[e]){let a=e;for(;!t[a];)a-=1;try{return{idx:a+1,node:{node:await n[e](),loader:n[e],data:{},server:null,universal:null}}}catch{continue}}}async function oe({status:e,error:t,url:n,route:a}){const r={};let o=null;if($.server_loads[0]===0)try{const l=await tt(n,[!0]);if(l.type!=="data"||l.nodes[0]&&l.nodes[0].type!=="data")throw 0;o=l.nodes[0]??null}catch{(n.origin!==q||n.pathname!==location.pathname||be)&&await j(n)}const s=await ke({loader:de,url:n,params:r,route:a,parent:()=>Promise.resolve({}),server_data_node:Se(o)}),c={node:await W(),loader:W,universal:null,server:null,data:null};return await Q({url:n,params:r,branch:[s,c],status:e,error:t,route:null})}function Ae(e,t){if(!e||ee(e,A))return;let n;try{n=$.hooks.reroute({url:new URL(e)})??e.pathname}catch{return}const a=Ze(n);for(const r of ae){const o=r.exec(a);if(o)return{id:e.pathname+e.search,invalidating:t,route:r,params:it(o),url:e}}}function Ze(e){return st(e.slice(A.length)||"/")}function Qe({url:e,type:t,intent:n,delta:a}){let r=!1;const o=at(y,n,e,t);a!==void 0&&(o.navigation.delta=a);const i={...o.navigation,cancel:()=>{r=!0,o.reject(new Error("navigation cancelled"))}};return M||Be.forEach(s=>s(i)),r?null:o}async function B({type:e,url:t,popped:n,keepfocus:a,noscroll:r,replace_state:o,state:i={},redirect_count:s=0,nav_token:c={},accept:l=Pe,block:d=Pe}){const g=Ae(t,!1),u=Qe({url:t,type:e,delta:n?.delta,intent:g});if(!u){d();return}const f=w,h=S;l(),M=!0,X&&L.navigating.set(u.navigation),Z=c;let p=g&&await Xe(g);if(!p){if(ee(t,A))return await j(t);p=await et(t,{id:null},await G(new we(404,"Not Found",`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)}if(t=g?.url||t,Z!==c)return u.reject(new Error("navigation aborted")),!1;if(p.type==="redirect")if(s>=20)p=await oe({status:500,error:await G(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return We(new URL(p.location,t).href,{},s+1,c),!1;else p.props.page.status>=400&&await L.updated.check()&&await j(t);if(He.length=0,Ee=!1,ne(f),Ye(h),p.props.page.url.pathname!==t.pathname&&(t.pathname=p.props.page.url.pathname),i=n?n.state:i,!n){const _=o?0:1,m={[T]:w+=_,[O]:S+=_,[_e]:i};(o?ve:Ge).call(history,m,"",t),o||qe(w,S)}if(N=null,p.props.page.state=i,X){y=p.state,p.props.page&&(p.props.page.url=t);const _=(await Promise.all(Ct.map(m=>m(u.navigation)))).filter(m=>typeof m=="function");if(_.length>0){let m=function(){V=V.filter(v=>!_.includes(v))};_.push(m),callbacks.after_navigate.push(..._)}re.$set(p.props),Ke=!0}else ze(p,he);const{activeElement:R}=document;await rt();const k=n?n.scroll:r?ye():null;if(Te){const _=t.hash&&document.getElementById(decodeURIComponent(t.hash.slice(1)));k?scrollTo(k.x,k.y):_?_.scrollIntoView():scrollTo(0,0)}const P=document.activeElement!==R&&document.activeElement!==document.body;!a&&!P&&Kt(),Te=!0,p.props.page&&(E=p.props.page),M=!1,e==="popstate"&&Je(S),u.fulfil(void 0),V.forEach(_=>_(u.navigation)),L.navigating.set(null)}async function et(e,t,n,a){return e.origin===q&&e.pathname===location.pathname&&!be?await oe({status:a,error:n,url:e,route:t}):await j(e)}function Gt(){let e;I.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(e),e=setTimeout(()=>{a(i,2)},20)});function t(o){a(o.composedPath()[0],1)}I.addEventListener("mousedown",t),I.addEventListener("touchstart",t,{passive:!0});const n=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(fe(i.target.href),n.unobserve(i.target))},{threshold:0});function a(o,i){const s=Ve(o,I);if(!s)return;const{url:c,external:l,download:d}=ue(s,A);if(l||d)return;const g=Y(s);if(!g.reload)if(i<=g.preload_data){const u=Ae(c,!1);u&&Vt(u)}else i<=g.preload_code&&fe(c.pathname)}function r(){n.disconnect();for(const o of I.querySelectorAll("a")){const{url:i,external:s,download:c}=ue(o,A);if(s||c)continue;const l=Y(o);l.reload||(l.preload_code===K.viewport&&n.observe(o),l.preload_code===K.eager&&fe(i.pathname))}}V.push(r),r()}function G(e,t){if(e instanceof te)return e.body;const n=J(e),a=Dt(e);return $.hooks.handleError({error:e,event:t,status:n,message:a})??{message:a}}function qt(e,t={}){return e=me(e),e.origin!==q?Promise.reject(new Error("goto: invalid URL")):We(e,t,0)}function zt(e,t){ne(w);const n={[T]:w+=1,[O]:S,[De]:E.url.href,[_e]:t};Ge.call(history,n,"",me(e)),E={...E,state:t},re.$set({page:E}),qe(w,S)}function Ht(){history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let n=!1;if(Ue(),!M){const a=at(y,void 0,null,"leave"),r={...a.navigation,cancel:()=>{n=!0,a.reject(new Error("navigation cancelled"))}};Be.forEach(o=>o(r))}n?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ue()}),navigator.connection?.saveData||Gt(),I.addEventListener("click",t=>{if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const n=Ve(t.composedPath()[0],I);if(!n)return;const{url:a,external:r,target:o,download:i}=ue(n,A);if(!a)return;if(o==="_parent"||o==="_top"){if(window.parent!==window)return}else if(o&&o!=="_self")return;const s=Y(n);if(!(n instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||i)return;if(r||s.reload){Qe({url:a,type:"link"})?M=!0:t.preventDefault();return}const[l,d]=a.href.split("#");if(d!==void 0&&l===ce(location)){const[,g]=y.url.href.split("#");if(g===d){t.preventDefault(),d===""||d==="top"&&n.ownerDocument.getElementById("top")===null?window.scrollTo({top:0}):n.ownerDocument.getElementById(d)?.scrollIntoView();return}if(D=!0,ne(w),e(a),!s.replace_state)return;D=!1}t.preventDefault(),B({type:"link",url:a,keepfocus:s.keepfocus,noscroll:s.noscroll,replace_state:s.replace_state??a.href===location.href})}),I.addEventListener("submit",t=>{if(t.defaultPrevented)return;const n=HTMLFormElement.prototype.cloneNode.call(t.target),a=t.submitter;if((a?.formMethod||n.method)!=="get")return;const o=new URL(a?.hasAttribute("formaction")&&a?.formAction||n.action);if(ee(o,A))return;const i=t.target,s=Y(i);if(s.reload)return;t.preventDefault(),t.stopPropagation();const c=new FormData(i),l=a?.getAttribute("name");l&&c.append(l,a?.getAttribute("value")??""),o.search=new URLSearchParams(c).toString(),B({type:"form",url:o,keepfocus:s.keepfocus,noscroll:s.noscroll,replace_state:s.replace_state??o.href===location.href})}),addEventListener("popstate",async t=>{if(t.state?.[T]){const n=t.state[T];if(Z={},n===w)return;const a=U[n],r=t.state[_e]??{},o=new URL(t.state[De]??location.href),i=t.state[O],s=ce(location)===ce(y.url);if(i===S&&(Ke||s)){e(o),U[w]=ye(),a&&scrollTo(a.x,a.y),r!==E.state&&(E={...E,state:r},re.$set({page:E})),w=n;return}const l=n-w;await B({type:"popstate",url:o,popped:{state:r,scroll:a,delta:l},accept:()=>{w=n,S=i},block:()=>{history.go(-l)},nav_token:Z})}else if(!D){const n=new URL(location.href);e(n)}}),addEventListener("hashchange",()=>{D&&(D=!1,ve.call(history,{...history.state,[T]:++w,[O]:S},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&L.navigating.set(null)});function e(t){y.url=t,L.page.set({...E,url:t}),L.page.notify()}}async function Bt(e,{status:t=200,error:n,node_ids:a,params:r,route:o,data:i,form:s}){be=!0;const c=new URL(location.href);({params:r={},route:o={id:null}}=Ae(c,!1)||{});let l;try{const d=a.map(async(f,h)=>{const p=i[h];return p?.uses&&(p.uses=nt(p.uses)),ke({loader:$.nodes[f],url:c,params:r,route:o,parent:async()=>{const R={};for(let k=0;k<h;k+=1)Object.assign(R,(await d[k]).data);return R},server_data_node:Se(p)})}),g=await Promise.all(d),u=ae.find(({id:f})=>f===o.id);if(u){const f=u.layouts;for(let h=0;h<f.length;h++)f[h]||g.splice(h,0,void 0)}l=await Q({url:c,params:r,branch:g,status:t,error:n,form:s,route:u??null})}catch(d){if(d instanceof Me){await j(new URL(d.location,location.href));return}l=await oe({status:J(d),error:await G(d,{url:c,params:r,route:o}),url:c,route:o})}l.props.page&&(l.props.page.state={}),ze(l,e)}async function tt(e,t){const n=new URL(e);n.pathname=dt(e.pathname),e.pathname.endsWith("/")&&n.searchParams.append($t,"1"),n.searchParams.append(jt,t.map(r=>r?"1":"0").join(""));const a=await Ne(n.href);if(!a.ok){let r;throw a.headers.get("content-type")?.includes("application/json")?r=await a.json():a.status===404?r="Not Found":a.status===500&&(r="Internal Error"),new te(a.status,r)}return new Promise(async r=>{const o=new Map,i=a.body.getReader(),s=new TextDecoder;function c(d){return xt(d,{Promise:g=>new Promise((u,f)=>{o.set(g,{fulfil:u,reject:f})})})}let l="";for(;;){const{done:d,value:g}=await i.read();if(d&&!l)break;for(l+=!g&&l?`
`:s.decode(g,{stream:!0});;){const u=l.indexOf(`
`);if(u===-1)break;const f=JSON.parse(l.slice(0,u));if(l=l.slice(u+1),f.type==="redirect")return r(f);if(f.type==="data")f.nodes?.forEach(h=>{h?.type==="data"&&(h.uses=nt(h.uses),h.data=c(h.data))}),r(f);else if(f.type==="chunk"){const{id:h,data:p,error:R}=f,k=o.get(h);o.delete(h),R?k.reject(c(R)):k.fulfil(c(p))}}}})}function nt(e){return{dependencies:new Set(e?.dependencies??[]),params:new Set(e?.params??[]),parent:!!e?.parent,route:!!e?.route,url:!!e?.url,search_params:new Set(e?.search_params??[])}}function Kt(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const t=document.body,n=t.getAttribute("tabindex");t.tabIndex=-1,t.focus({preventScroll:!0,focusVisible:!1}),n!==null?t.setAttribute("tabindex",n):t.removeAttribute("tabindex");const a=getSelection();if(a&&a.type!=="None"){const r=[];for(let o=0;o<a.rangeCount;o+=1)r.push(a.getRangeAt(o));setTimeout(()=>{if(a.rangeCount===r.length){for(let o=0;o<a.rangeCount;o+=1){const i=r[o],s=a.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}a.removeAllRanges()}})}}}function at(e,t,n,a){let r,o;const i=new Promise((c,l)=>{r=c,o=l});return i.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:e.route?.id??null},url:e.url},to:n&&{params:t?.params??null,route:{id:t?.route?.id??null},url:n},willUnload:!t,type:a,complete:i},fulfil:r,reject:o}}export{Wt as a,A as b,qt as g,zt as p,L as s};
