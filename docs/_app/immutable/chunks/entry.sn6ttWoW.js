import{M as se}from"./scheduler.xMnZeRYy.js";import{w as pt}from"./index.5OULvqcs.js";new URL("sveltekit-internal://");function ie(t,e){return t==="/"||e==="ignore"?t:e==="never"?t.endsWith("/")?t.slice(0,-1):t:e==="always"&&!t.endsWith("/")?t+"/":t}function ce(t){return t.split("%25").map(decodeURI).join("%25")}function le(t){for(const e in t)t[e]=decodeURIComponent(t[e]);return t}function ct({href:t}){return t.split("#")[0]}const fe=["href","pathname","search","toString","toJSON"];function ue(t,e,n){const r=new URL(t);Object.defineProperty(r,"searchParams",{value:new Proxy(r.searchParams,{get(a,o){if(o==="get"||o==="getAll"||o==="has")return s=>(n(s),a[o](s));e();const i=Reflect.get(a,o);return typeof i=="function"?i.bind(a):i}}),enumerable:!0,configurable:!0});for(const a of fe)Object.defineProperty(r,a,{get(){return e(),t[a]},enumerable:!0,configurable:!0});return r}const de="/__data.json",he=".html__data.json";function pe(t){return t.endsWith(".html")?t.replace(/\.html$/,he):t.replace(/\/$/,"")+de}function ge(...t){let e=5381;for(const n of t)if(typeof n=="string"){let r=n.length;for(;r;)e=e*33^n.charCodeAt(--r)}else if(ArrayBuffer.isView(n)){const r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let a=r.length;for(;a;)e=e*33^r[--a]}else throw new TypeError("value must be a string or TypedArray");return(e>>>0).toString(36)}function me(t){const e=atob(t),n=new Uint8Array(e.length);for(let r=0;r<e.length;r++)n[r]=e.charCodeAt(r);return n.buffer}const $t=window.fetch;window.fetch=(t,e)=>((t instanceof Request?t.method:(e==null?void 0:e.method)||"GET")!=="GET"&&F.delete(gt(t)),$t(t,e));const F=new Map;function _e(t,e){const n=gt(t,e),r=document.querySelector(n);if(r!=null&&r.textContent){let{body:a,...o}=JSON.parse(r.textContent);const i=r.getAttribute("data-ttl");return i&&F.set(n,{body:a,init:o,ttl:1e3*Number(i)}),r.getAttribute("data-b64")!==null&&(a=me(a)),Promise.resolve(new Response(a,o))}return window.fetch(t,e)}function ye(t,e,n){if(F.size>0){const r=gt(t,n),a=F.get(r);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n==null?void 0:n.cache))return new Response(a.body,a.init);F.delete(r)}}return window.fetch(e,n)}function gt(t,e){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(t instanceof Request?t.url:t)}]`;if(e!=null&&e.headers||e!=null&&e.body){const a=[];e.headers&&a.push([...new Headers(e.headers)].join(",")),e.body&&(typeof e.body=="string"||ArrayBuffer.isView(e.body))&&a.push(e.body),r+=`[data-hash="${ge(...a)}"]`}return r}const we=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function ve(t){const e=[];return{pattern:t==="/"?/^\/$/:new RegExp(`^${Ee(t).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return e.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const o=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(o)return e.push({name:o[1],matcher:o[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const i=r.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,f)=>{if(f%2){if(c.startsWith("x+"))return lt(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return lt(String.fromCharCode(...c.slice(2).split("-").map(l=>parseInt(l,16))));const u=we.exec(c),[,h,g,d,m]=u;return e.push({name:d,matcher:m,optional:!!h,rest:!!g,chained:g?f===1&&i[0]==="":!1}),g?"(.*?)":h?"([^/]*)?":"([^/]+?)"}return lt(c)}).join("")}).join("")}/?$`),params:e}}function be(t){return!/^\([^)]+\)$/.test(t)}function Ee(t){return t.slice(1).split("/").filter(be)}function ke(t,e,n){const r={},a=t.slice(1),o=a.filter(s=>s!==void 0);let i=0;for(let s=0;s<e.length;s+=1){const c=e[s];let f=a[s-i];if(c.chained&&c.rest&&i&&(f=a.slice(s-i,s+1).filter(u=>u).join("/"),i=0),f===void 0){c.rest&&(r[c.name]="");continue}if(!c.matcher||n[c.matcher](f)){r[c.name]=f;const u=e[s+1],h=a[s+1];u&&!u.rest&&u.optional&&h&&c.chained&&(i=0),!u&&!h&&Object.keys(r).length===o.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return r}function lt(t){return t.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function Se({nodes:t,server_loads:e,dictionary:n,matchers:r}){const a=new Set(e);return Object.entries(n).map(([s,[c,f,u]])=>{const{pattern:h,params:g}=ve(s),d={id:s,exec:m=>{const l=h.exec(m);if(l)return ke(l,g,r)},errors:[1,...u||[]].map(m=>t[m]),layouts:[0,...f||[]].map(i),leaf:o(c)};return d.errors.length=d.layouts.length=Math.max(d.errors.length,d.layouts.length),d});function o(s){const c=s<0;return c&&(s=~s),[c,t[s]]}function i(s){return s===void 0?s:[a.has(s),t[s]]}}function Dt(t,e=JSON.parse){try{return e(sessionStorage[t])}catch{}}function It(t,e,n=JSON.stringify){const r=n(e);try{sessionStorage[t]=r}catch{}}var Ot;const I=((Ot=globalThis.__sveltekit_7nglh8)==null?void 0:Ot.base)??"/your-repo-name";var jt;const Ae=((jt=globalThis.__sveltekit_7nglh8)==null?void 0:jt.assets)??I,Re="1706385453050",Ct="sveltekit:snapshot",Vt="sveltekit:scroll",mt="sveltekit:states",Ft="sveltekit:pageurl",x="sveltekit:history",$="sveltekit:navigation",K={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},H=location.origin;function _t(t){if(t instanceof URL)return t;let e=document.baseURI;if(!e){const n=document.getElementsByTagName("base");e=n.length?n[0].href:document.URL}return new URL(t,e)}function yt(){return{x:pageXOffset,y:pageYOffset}}function O(t,e){return t.getAttribute(`data-sveltekit-${e}`)}const Lt={...K,"":K.hover};function Mt(t){let e=t.assignedSlot??t.parentNode;return(e==null?void 0:e.nodeType)===11&&(e=e.host),e}function Gt(t,e){for(;t&&t!==e;){if(t.nodeName.toUpperCase()==="A"&&t.hasAttribute("href"))return t;t=Mt(t)}}function ut(t,e){let n;try{n=new URL(t instanceof SVGAElement?t.href.baseVal:t.href,document.baseURI)}catch{}const r=t instanceof SVGAElement?t.target.baseVal:t.target,a=!n||!!r||tt(n,e)||(t.getAttribute("rel")||"").split(/\s+/).includes("external"),o=(n==null?void 0:n.origin)===H&&t.hasAttribute("download");return{url:n,external:a,target:r,download:o}}function Y(t){let e=null,n=null,r=null,a=null,o=null,i=null,s=t;for(;s&&s!==document.documentElement;)r===null&&(r=O(s,"preload-code")),a===null&&(a=O(s,"preload-data")),e===null&&(e=O(s,"keepfocus")),n===null&&(n=O(s,"noscroll")),o===null&&(o=O(s,"reload")),i===null&&(i=O(s,"replacestate")),s=Mt(s);function c(f){switch(f){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Lt[r??"off"],preload_data:Lt[a??"off"],keepfocus:c(e),noscroll:c(n),reload:c(o),replace_state:c(i)}}function Pt(t){const e=pt(t);let n=!0;function r(){n=!0,e.update(i=>i)}function a(i){n=!1,e.set(i)}function o(i){let s;return e.subscribe(c=>{(s===void 0||n&&c!==s)&&i(s=c)})}return{notify:r,set:a,subscribe:o}}function Ie(){const{set:t,subscribe:e}=pt(!1);let n;async function r(){clearTimeout(n);try{const a=await fetch(`${Ae}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const i=(await a.json()).version!==Re;return i&&(t(!0),clearTimeout(n)),i}catch{return!1}}return{subscribe:e,check:r}}function tt(t,e){return t.origin!==H||!t.pathname.startsWith(e)}const Le=-1,Pe=-2,Te=-3,Ue=-4,xe=-5,Ne=-6;function Oe(t,e){if(typeof t=="number")return a(t,!0);if(!Array.isArray(t)||t.length===0)throw new Error("Invalid input");const n=t,r=Array(n.length);function a(o,i=!1){if(o===Le)return;if(o===Te)return NaN;if(o===Ue)return 1/0;if(o===xe)return-1/0;if(o===Ne)return-0;if(i)throw new Error("Invalid input");if(o in r)return r[o];const s=n[o];if(!s||typeof s!="object")r[o]=s;else if(Array.isArray(s))if(typeof s[0]=="string"){const c=s[0],f=e==null?void 0:e[c];if(f)return r[o]=f(a(s[1]));switch(c){case"Date":r[o]=new Date(s[1]);break;case"Set":const u=new Set;r[o]=u;for(let d=1;d<s.length;d+=1)u.add(a(s[d]));break;case"Map":const h=new Map;r[o]=h;for(let d=1;d<s.length;d+=2)h.set(a(s[d]),a(s[d+1]));break;case"RegExp":r[o]=new RegExp(s[1],s[2]);break;case"Object":r[o]=Object(s[1]);break;case"BigInt":r[o]=BigInt(s[1]);break;case"null":const g=Object.create(null);r[o]=g;for(let d=1;d<s.length;d+=2)g[s[d]]=a(s[d+1]);break;default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(s.length);r[o]=c;for(let f=0;f<s.length;f+=1){const u=s[f];u!==Pe&&(c[f]=a(u))}}else{const c={};r[o]=c;for(const f in s){const u=s[f];c[f]=a(u)}}return r[o]}return a(0)}const qt=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...qt];const je=new Set([...qt]);[...je];function $e(t){return t.filter(e=>e!=null)}class et{constructor(e,n){this.status=e,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${e}`}}toString(){return JSON.stringify(this.body)}}class Ht{constructor(e,n){this.status=e,this.location=n}}class wt extends Error{constructor(e,n,r){super(r),this.status=e,this.text=n}}const De="x-sveltekit-invalidated",Ce="x-sveltekit-trailing-slash";function J(t){return t instanceof et||t instanceof wt?t.status:500}function Ve(t){return t instanceof wt?t.text:"Internal Error"}const N=Dt(Vt)??{},M=Dt(Ct)??{},T={url:Pt({}),page:Pt({}),navigating:pt(null),updated:Ie()};function nt(t){N[t]=yt()}function Bt(t,e){let n=t+1;for(;N[n];)delete N[n],n+=1;for(n=e+1;M[n];)delete M[n],n+=1}function D(t){return location.href=t.href,new Promise(()=>{})}function Tt(){}let at,dt,W,L,ht,C;const Kt=[],z=[];let P=null;const Yt=[],Fe=[];let j=[],w={branch:[],error:null,url:null},vt=!1,X=!1,Ut=!0,G=!1,V=!1,Jt=!1,bt=!1,rt,E,R,A,Z;async function Xe(t,e,n){var a,o;document.URL!==location.href&&(location.href=location.href),C=t,at=Se(t),L=document.documentElement,ht=e,dt=t.nodes[0],W=t.nodes[1],dt(),W(),E=(a=history.state)==null?void 0:a[x],R=(o=history.state)==null?void 0:o[$],E||(E=R=Date.now(),history.replaceState({...history.state,[x]:E,[$]:R},""));const r=N[E];r&&(history.scrollRestoration="manual",scrollTo(r.x,r.y)),n?await Ye(ht,n):Be(location.href,{replaceState:!0}),Ke()}function Wt(t){z.some(e=>e==null?void 0:e.snapshot)&&(M[t]=z.map(e=>{var n;return(n=e==null?void 0:e.snapshot)==null?void 0:n.capture()}))}function zt(t){var e;(e=M[t])==null||e.forEach((n,r)=>{var a,o;(o=(a=z[r])==null?void 0:a.snapshot)==null||o.restore(n)})}function xt(){nt(E),It(Vt,N),Wt(R),It(Ct,M)}async function Xt(t,e,n,r){return B({type:"goto",url:_t(t),keepfocus:e.keepFocus,noscroll:e.noScroll,replace_state:e.replaceState,state:e.state,redirect_count:n,nav_token:r,accept:()=>{e.invalidateAll&&(bt=!0)}})}async function Me(t){return P={id:t.id,promise:Qt(t).then(e=>(e.type==="loaded"&&e.state.error&&(P=null),e))},P.promise}async function ft(t){const e=at.find(n=>n.exec(te(t)));e&&await Promise.all([...e.layouts,e.leaf].map(n=>n==null?void 0:n[1]()))}function Zt(t,e){var a;w=t.state;const n=document.querySelector("style[data-sveltekit]");n&&n.remove(),A=t.props.page,rt=new C.root({target:e,props:{...t.props,stores:T,components:z},hydrate:!0}),zt(R);const r={from:null,to:{params:w.params,route:{id:((a=w.route)==null?void 0:a.id)??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};j.forEach(o=>o(r)),X=!0}async function Q({url:t,params:e,branch:n,status:r,error:a,route:o,form:i}){let s="never";if(I&&(t.pathname===I||t.pathname===I+"/"))s="always";else for(const d of n)(d==null?void 0:d.slash)!==void 0&&(s=d.slash);t.pathname=ie(t.pathname,s),t.search=t.search;const c={type:"loaded",state:{url:t,params:e,branch:n,error:a,route:o},props:{constructors:$e(n).map(d=>d.node.component),page:A}};i!==void 0&&(c.props.form=i);let f={},u=!A,h=0;for(let d=0;d<Math.max(n.length,w.branch.length);d+=1){const m=n[d],l=w.branch[d];(m==null?void 0:m.data)!==(l==null?void 0:l.data)&&(u=!0),m&&(f={...f,...m.data},u&&(c.props[`data_${h}`]=f),h+=1)}return(!w.url||t.href!==w.url.href||w.error!==a||i!==void 0&&i!==A.form||u)&&(c.props.page={error:a,params:e,route:{id:(o==null?void 0:o.id)??null},state:{},status:r,url:new URL(t),form:i??null,data:u?f:A.data}),c}async function Et({loader:t,parent:e,url:n,params:r,route:a,server_data_node:o}){var u,h,g;let i=null,s=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},f=await t();if((u=f.universal)!=null&&u.load){let d=function(...l){for(const _ of l){const{href:v}=new URL(_,n);c.dependencies.add(v)}};const m={route:new Proxy(a,{get:(l,_)=>(s&&(c.route=!0),l[_])}),params:new Proxy(r,{get:(l,_)=>(s&&c.params.add(_),l[_])}),data:(o==null?void 0:o.data)??null,url:ue(n,()=>{s&&(c.url=!0)},l=>{s&&c.search_params.add(l)}),async fetch(l,_){let v;l instanceof Request?(v=l.url,_={body:l.method==="GET"||l.method==="HEAD"?void 0:await l.blob(),cache:l.cache,credentials:l.credentials,headers:l.headers,integrity:l.integrity,keepalive:l.keepalive,method:l.method,mode:l.mode,redirect:l.redirect,referrer:l.referrer,referrerPolicy:l.referrerPolicy,signal:l.signal,..._}):v=l;const S=new URL(v,n);return s&&d(S.href),S.origin===n.origin&&(v=S.href.slice(n.origin.length)),X?ye(v,S.href,_):_e(v,_)},setHeaders:()=>{},depends:d,parent(){return s&&(c.parent=!0),e()},untrack(l){s=!1;try{return l()}finally{s=!0}}};i=await f.universal.load.call(null,m)??null}return{node:f,loader:t,server:o,universal:(h=f.universal)!=null&&h.load?{type:"data",data:i,uses:c}:null,data:i??(o==null?void 0:o.data)??null,slash:((g=f.universal)==null?void 0:g.trailingSlash)??(o==null?void 0:o.slash)}}function Nt(t,e,n,r,a,o){if(bt)return!0;if(!a)return!1;if(a.parent&&t||a.route&&e||a.url&&n)return!0;for(const i of a.search_params)if(r.has(i))return!0;for(const i of a.params)if(o[i]!==w.params[i])return!0;for(const i of a.dependencies)if(Kt.some(s=>s(new URL(i))))return!0;return!1}function kt(t,e){return(t==null?void 0:t.type)==="data"?t:(t==null?void 0:t.type)==="skip"?e??null:null}function Ge(t,e){if(!t)return new Set(e.searchParams.keys());const n=new Set([...t.searchParams.keys(),...e.searchParams.keys()]);for(const r of n){const a=t.searchParams.getAll(r),o=e.searchParams.getAll(r);a.every(i=>o.includes(i))&&o.every(i=>a.includes(i))&&n.delete(r)}return n}async function Qt({id:t,invalidating:e,url:n,params:r,route:a}){if((P==null?void 0:P.id)===t)return P.promise;const{errors:o,layouts:i,leaf:s}=a,c=[...i,s];o.forEach(p=>p==null?void 0:p().catch(()=>{})),c.forEach(p=>p==null?void 0:p[1]().catch(()=>{}));let f=null;const u=w.url?t!==w.url.pathname+w.url.search:!1,h=w.route?a.id!==w.route.id:!1,g=Ge(w.url,n);let d=!1;const m=c.map((p,y)=>{var U;const b=w.branch[y],k=!!(p!=null&&p[0])&&((b==null?void 0:b.loader)!==p[1]||Nt(d,h,u,g,(U=b.server)==null?void 0:U.uses,r));return k&&(d=!0),k});if(m.some(Boolean)){try{f=await ae(n,m)}catch(p){return ot({status:J(p),error:await q(p,{url:n,params:r,route:{id:a.id}}),url:n,route:a})}if(f.type==="redirect")return f}const l=f==null?void 0:f.nodes;let _=!1;const v=c.map(async(p,y)=>{var st;if(!p)return;const b=w.branch[y],k=l==null?void 0:l[y];if((!k||k.type==="skip")&&p[1]===(b==null?void 0:b.loader)&&!Nt(_,h,u,g,(st=b.universal)==null?void 0:st.uses,r))return b;if(_=!0,(k==null?void 0:k.type)==="error")throw k;return Et({loader:p[1],url:n,params:r,route:a,parent:async()=>{var Rt;const At={};for(let it=0;it<y;it+=1)Object.assign(At,(Rt=await v[it])==null?void 0:Rt.data);return At},server_data_node:kt(k===void 0&&p[0]?{type:"skip"}:k??null,p[0]?b==null?void 0:b.server:void 0)})});for(const p of v)p.catch(()=>{});const S=[];for(let p=0;p<c.length;p+=1)if(c[p])try{S.push(await v[p])}catch(y){if(y instanceof Ht)return{type:"redirect",location:y.location};let b=J(y),k;if(l!=null&&l.includes(y))b=y.status??b,k=y.error;else if(y instanceof et)k=y.body;else{if(await T.updated.check())return await D(n);k=await q(y,{params:r,url:n,route:{id:a.id}})}const U=await qe(p,S,o);return U?await Q({url:n,params:r,branch:S.slice(0,U.idx).concat(U.node),status:b,error:k,route:a}):await ne(n,{id:a.id},k,b)}else S.push(void 0);return await Q({url:n,params:r,branch:S,status:200,error:null,route:a,form:e?void 0:null})}async function qe(t,e,n){for(;t--;)if(n[t]){let r=t;for(;!e[r];)r-=1;try{return{idx:r+1,node:{node:await n[t](),loader:n[t],data:{},server:null,universal:null}}}catch{continue}}}async function ot({status:t,error:e,url:n,route:r}){const a={};let o=null;if(C.server_loads[0]===0)try{const f=await ae(n,[!0]);if(f.type!=="data"||f.nodes[0]&&f.nodes[0].type!=="data")throw 0;o=f.nodes[0]??null}catch{(n.origin!==H||n.pathname!==location.pathname||vt)&&await D(n)}const s=await Et({loader:dt,url:n,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:kt(o)}),c={node:await W(),loader:W,universal:null,server:null,data:null};return await Q({url:n,params:a,branch:[s,c],status:t,error:e,route:null})}function St(t,e){if(!t||tt(t,I))return;let n;try{n=C.hooks.reroute({url:new URL(t)})??t.pathname}catch{return}const r=te(n);for(const a of at){const o=a.exec(r);if(o)return{id:t.pathname+t.search,invalidating:e,route:a,params:le(o),url:t}}}function te(t){return ce(t.slice(I.length)||"/")}function ee({url:t,type:e,intent:n,delta:r}){let a=!1;const o=oe(w,n,t,e);r!==void 0&&(o.navigation.delta=r);const i={...o.navigation,cancel:()=>{a=!0,o.reject(new Error("navigation cancelled"))}};return G||Yt.forEach(s=>s(i)),a?null:o}async function B({type:t,url:e,popped:n,keepfocus:r,noscroll:a,replace_state:o,state:i={},redirect_count:s=0,nav_token:c={},accept:f=Tt,block:u=Tt}){const h=St(e,!1),g=ee({url:e,type:t,delta:n==null?void 0:n.delta,intent:h});if(!g){u();return}const d=E,m=R;f(),G=!0,X&&T.navigating.set(g.navigation),Z=c;let l=h&&await Qt(h);if(!l){if(tt(e,I))return await D(e);l=await ne(e,{id:null},await q(new wt(404,"Not Found",`Not found: ${e.pathname}`),{url:e,params:{},route:{id:null}}),404)}if(e=(h==null?void 0:h.url)||e,Z!==c)return g.reject(new Error("navigation aborted")),!1;if(l.type==="redirect")if(s>=20)l=await ot({status:500,error:await q(new Error("Redirect loop"),{url:e,params:{},route:{id:null}}),url:e,route:{id:null}});else return Xt(new URL(l.location,e).href,{},s+1,c),!1;else l.props.page.status>=400&&await T.updated.check()&&await D(e);if(Kt.length=0,bt=!1,nt(d),Wt(m),l.props.page.url.pathname!==e.pathname&&(e.pathname=l.props.page.url.pathname),i=n?n.state:i,!n){const p=o?0:1,y={[x]:E+=p,[$]:R+=p,[mt]:i};(o?history.replaceState:history.pushState).call(history,y,"",e),o||Bt(E,R)}if(P=null,l.props.page.state=i,X){w=l.state,l.props.page&&(l.props.page.url=e);const p=(await Promise.all(Fe.map(y=>y(g.navigation)))).filter(y=>typeof y=="function");if(p.length>0){let y=function(){j=j.filter(b=>!p.includes(b))};p.push(y),j.push(...p)}rt.$set(l.props),Jt=!0}else Zt(l,ht);const{activeElement:_}=document;await se();const v=n?n.scroll:a?yt():null;if(Ut){const p=e.hash&&document.getElementById(decodeURIComponent(e.hash.slice(1)));v?scrollTo(v.x,v.y):p?p.scrollIntoView():scrollTo(0,0)}const S=document.activeElement!==_&&document.activeElement!==document.body;!r&&!S&&Je(),Ut=!0,l.props.page&&(A=l.props.page),G=!1,t==="popstate"&&zt(R),g.fulfil(void 0),j.forEach(p=>p(g.navigation)),T.navigating.set(null)}async function ne(t,e,n,r){return t.origin===H&&t.pathname===location.pathname&&!vt?await ot({status:r,error:n,url:t,route:e}):await D(t)}function He(){let t;L.addEventListener("mousemove",o=>{const i=o.target;clearTimeout(t),t=setTimeout(()=>{r(i,2)},20)});function e(o){r(o.composedPath()[0],1)}L.addEventListener("mousedown",e),L.addEventListener("touchstart",e,{passive:!0});const n=new IntersectionObserver(o=>{for(const i of o)i.isIntersecting&&(ft(i.target.href),n.unobserve(i.target))},{threshold:0});function r(o,i){const s=Gt(o,L);if(!s)return;const{url:c,external:f,download:u}=ut(s,I);if(f||u)return;const h=Y(s);if(!h.reload)if(i<=h.preload_data){const g=St(c,!1);g&&Me(g)}else i<=h.preload_code&&ft(c.pathname)}function a(){n.disconnect();for(const o of L.querySelectorAll("a")){const{url:i,external:s,download:c}=ut(o,I);if(s||c)continue;const f=Y(o);f.reload||(f.preload_code===K.viewport&&n.observe(o),f.preload_code===K.eager&&ft(i.pathname))}}j.push(a),a()}function q(t,e){if(t instanceof et)return t.body;const n=J(t),r=Ve(t);return C.hooks.handleError({error:t,event:e,status:n,message:r})??{message:r}}function Be(t,e={}){return t=_t(t),t.origin!==H?Promise.reject(new Error("goto: invalid URL")):Xt(t,e,0)}function Ze(t,e){nt(E);const n={[x]:E+=1,[$]:R,[Ft]:A.url.href,[mt]:e};history.pushState(n,"",_t(t)),A={...A,state:e},rt.$set({page:A}),Bt(E,R)}function Ke(){var e;history.scrollRestoration="manual",addEventListener("beforeunload",n=>{let r=!1;if(xt(),!G){const a=oe(w,void 0,null,"leave"),o={...a.navigation,cancel:()=>{r=!0,a.reject(new Error("navigation cancelled"))}};Yt.forEach(i=>i(o))}r?(n.preventDefault(),n.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&xt()}),(e=navigator.connection)!=null&&e.saveData||He(),L.addEventListener("click",n=>{var g;if(n.button||n.which!==1||n.metaKey||n.ctrlKey||n.shiftKey||n.altKey||n.defaultPrevented)return;const r=Gt(n.composedPath()[0],L);if(!r)return;const{url:a,external:o,target:i,download:s}=ut(r,I);if(!a)return;if(i==="_parent"||i==="_top"){if(window.parent!==window)return}else if(i&&i!=="_self")return;const c=Y(r);if(!(r instanceof SVGAElement)&&a.protocol!==location.protocol&&!(a.protocol==="https:"||a.protocol==="http:")||s)return;if(o||c.reload){ee({url:a,type:"link"})?G=!0:n.preventDefault();return}const[u,h]=a.href.split("#");if(h!==void 0&&u===ct(location)){const[,d]=w.url.href.split("#");if(d===h){n.preventDefault(),h===""||h==="top"&&r.ownerDocument.getElementById("top")===null?window.scrollTo({top:0}):(g=r.ownerDocument.getElementById(h))==null||g.scrollIntoView();return}if(V=!0,nt(E),t(a),!c.replace_state)return;V=!1}n.preventDefault(),B({type:"link",url:a,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??a.href===location.href})}),L.addEventListener("submit",n=>{if(n.defaultPrevented)return;const r=HTMLFormElement.prototype.cloneNode.call(n.target),a=n.submitter;if(((a==null?void 0:a.formMethod)||r.method)!=="get")return;const i=new URL((a==null?void 0:a.hasAttribute("formaction"))&&(a==null?void 0:a.formAction)||r.action);if(tt(i,I))return;const s=n.target,c=Y(s);if(c.reload)return;n.preventDefault(),n.stopPropagation();const f=new FormData(s),u=a==null?void 0:a.getAttribute("name");u&&f.append(u,(a==null?void 0:a.getAttribute("value"))??""),i.search=new URLSearchParams(f).toString(),B({type:"form",url:i,keepfocus:c.keepfocus,noscroll:c.noscroll,replace_state:c.replace_state??i.href===location.href})}),addEventListener("popstate",async n=>{var r;if((r=n.state)!=null&&r[x]){const a=n.state[x];if(Z={},a===E)return;const o=N[a],i=n.state[mt]??{},s=new URL(n.state[Ft]??location.href),c=n.state[$],f=ct(location)===ct(w.url);if(c===R&&(Jt||f)){t(s),N[E]=yt(),o&&scrollTo(o.x,o.y),i!==A.state&&(A={...A,state:i},rt.$set({page:A})),E=a;return}const h=a-E;await B({type:"popstate",url:s,popped:{state:i,scroll:o,delta:h},accept:()=>{E=a,R=c},block:()=>{history.go(-h)},nav_token:Z})}else if(!V){const a=new URL(location.href);t(a)}}),addEventListener("hashchange",()=>{V&&(V=!1,history.replaceState({...history.state,[x]:++E,[$]:R},"",location.href))});for(const n of document.querySelectorAll("link"))n.rel==="icon"&&(n.href=n.href);addEventListener("pageshow",n=>{n.persisted&&T.navigating.set(null)});function t(n){w.url=n,T.page.set({...A,url:n}),T.page.notify()}}async function Ye(t,{status:e=200,error:n,node_ids:r,params:a,route:o,data:i,form:s}){vt=!0;const c=new URL(location.href);({params:a={},route:o={id:null}}=St(c,!1)||{});let f;try{const u=r.map(async(d,m)=>{const l=i[m];return l!=null&&l.uses&&(l.uses=re(l.uses)),Et({loader:C.nodes[d],url:c,params:a,route:o,parent:async()=>{const _={};for(let v=0;v<m;v+=1)Object.assign(_,(await u[v]).data);return _},server_data_node:kt(l)})}),h=await Promise.all(u),g=at.find(({id:d})=>d===o.id);if(g){const d=g.layouts;for(let m=0;m<d.length;m++)d[m]||h.splice(m,0,void 0)}f=await Q({url:c,params:a,branch:h,status:e,error:n,form:s,route:g??null})}catch(u){if(u instanceof Ht){await D(new URL(u.location,location.href));return}f=await ot({status:J(u),error:await q(u,{url:c,params:a,route:o}),url:c,route:o})}f.props.page&&(f.props.page.state={}),Zt(f,t)}async function ae(t,e){var a;const n=new URL(t);n.pathname=pe(t.pathname),t.pathname.endsWith("/")&&n.searchParams.append(Ce,"1"),n.searchParams.append(De,e.map(o=>o?"1":"0").join(""));const r=await $t(n.href);if(!r.ok){let o;throw(a=r.headers.get("content-type"))!=null&&a.includes("application/json")?o=await r.json():r.status===404?o="Not Found":r.status===500&&(o="Internal Error"),new et(r.status,o)}return new Promise(async o=>{var h;const i=new Map,s=r.body.getReader(),c=new TextDecoder;function f(g){return Oe(g,{Promise:d=>new Promise((m,l)=>{i.set(d,{fulfil:m,reject:l})})})}let u="";for(;;){const{done:g,value:d}=await s.read();if(g&&!u)break;for(u+=!d&&u?`
`:c.decode(d,{stream:!0});;){const m=u.indexOf(`
`);if(m===-1)break;const l=JSON.parse(u.slice(0,m));if(u=u.slice(m+1),l.type==="redirect")return o(l);if(l.type==="data")(h=l.nodes)==null||h.forEach(_=>{(_==null?void 0:_.type)==="data"&&(_.uses=re(_.uses),_.data=f(_.data))}),o(l);else if(l.type==="chunk"){const{id:_,data:v,error:S}=l,p=i.get(_);i.delete(_),S?p.reject(f(S)):p.fulfil(f(v))}}}})}function re(t){return{dependencies:new Set((t==null?void 0:t.dependencies)??[]),params:new Set((t==null?void 0:t.params)??[]),parent:!!(t!=null&&t.parent),route:!!(t!=null&&t.route),url:!!(t!=null&&t.url),search_params:new Set((t==null?void 0:t.search_params)??[])}}function Je(){const t=document.querySelector("[autofocus]");if(t)t.focus();else{const e=document.body,n=e.getAttribute("tabindex");e.tabIndex=-1,e.focus({preventScroll:!0,focusVisible:!1}),n!==null?e.setAttribute("tabindex",n):e.removeAttribute("tabindex");const r=getSelection();if(r&&r.type!=="None"){const a=[];for(let o=0;o<r.rangeCount;o+=1)a.push(r.getRangeAt(o));setTimeout(()=>{if(r.rangeCount===a.length){for(let o=0;o<r.rangeCount;o+=1){const i=a[o],s=r.getRangeAt(o);if(i.commonAncestorContainer!==s.commonAncestorContainer||i.startContainer!==s.startContainer||i.endContainer!==s.endContainer||i.startOffset!==s.startOffset||i.endOffset!==s.endOffset)return}r.removeAllRanges()}})}}}function oe(t,e,n,r){var c,f;let a,o;const i=new Promise((u,h)=>{a=u,o=h});return i.catch(()=>{}),{navigation:{from:{params:t.params,route:{id:((c=t.route)==null?void 0:c.id)??null},url:t.url},to:n&&{params:(e==null?void 0:e.params)??null,route:{id:((f=e==null?void 0:e.route)==null?void 0:f.id)??null},url:n},willUnload:!e,type:r,complete:i},fulfil:a,reject:o}}export{Xe as a,I as b,Be as g,Ze as p,T as s};
