import{n as le,s as st,K as it}from"./scheduler.qq0X-z8z.js";new URL("sveltekit-internal://");function ct(e,t){return e==="/"||t==="ignore"?e:t==="never"?e.endsWith("/")?e.slice(0,-1):e:t==="always"&&!e.endsWith("/")?e+"/":e}function lt(e){return e.split("%25").map(decodeURI).join("%25")}function ft(e){for(const t in e)e[t]=decodeURIComponent(e[t]);return e}function fe({href:e}){return e.split("#")[0]}const ut=["href","pathname","search","toString","toJSON"];function dt(e,t,n){const r=new URL(e);Object.defineProperty(r,"searchParams",{value:new Proxy(r.searchParams,{get(a,s){if(s==="get"||s==="getAll"||s==="has")return o=>(n(o),a[s](o));t();const i=Reflect.get(a,s);return typeof i=="function"?i.bind(a):i}}),enumerable:!0,configurable:!0});for(const a of ut)Object.defineProperty(r,a,{get(){return t(),e[a]},enumerable:!0,configurable:!0});return r}const ht="/__data.json",pt=".html__data.json";function gt(e){return e.endsWith(".html")?e.replace(/\.html$/,pt):e.replace(/\/$/,"")+ht}function _t(...e){let t=5381;for(const n of e)if(typeof n=="string"){let r=n.length;for(;r;)t=t*33^n.charCodeAt(--r)}else if(ArrayBuffer.isView(n)){const r=new Uint8Array(n.buffer,n.byteOffset,n.byteLength);let a=r.length;for(;a;)t=t*33^r[--a]}else throw new TypeError("value must be a string or TypedArray");return(t>>>0).toString(36)}const je=window.fetch;window.fetch=(e,t)=>((e instanceof Request?e.method:t?.method||"GET")!=="GET"&&V.delete(_e(e)),je(e,t));const V=new Map;function mt(e){const t=atob(e),n=new Uint8Array(t.length);for(let r=0;r<t.length;r++)n[r]=t.charCodeAt(r);return n.buffer}function yt(e,t){const n=_e(e,t),r=document.querySelector(n);if(r?.textContent){let{body:a,...s}=JSON.parse(r.textContent);const i=r.getAttribute("data-ttl");return i&&V.set(n,{body:a,init:s,ttl:1e3*Number(i)}),r.getAttribute("data-b64")!==null&&(a=mt(a)),Promise.resolve(new Response(a,s))}return window.fetch(e,t)}function wt(e,t,n){if(V.size>0){const r=_e(e,n),a=V.get(r);if(a){if(performance.now()<a.ttl&&["default","force-cache","only-if-cached",void 0].includes(n?.cache))return new Response(a.body,a.init);V.delete(r)}}return window.fetch(t,n)}function _e(e,t){let r=`script[data-sveltekit-fetched][data-url=${JSON.stringify(e instanceof Request?e.url:e)}]`;if(t?.headers||t?.body){const a=[];t.headers&&a.push([...new Headers(t.headers)].join(",")),t.body&&(typeof t.body=="string"||ArrayBuffer.isView(t.body))&&a.push(t.body),r+=`[data-hash="${_t(...a)}"]`}return r}const vt=/^(\[)?(\.\.\.)?(\w+)(?:=(\w+))?(\])?$/;function bt(e){const t=[];return{pattern:e==="/"?/^\/$/:new RegExp(`^${kt(e).map(r=>{const a=/^\[\.\.\.(\w+)(?:=(\w+))?\]$/.exec(r);if(a)return t.push({name:a[1],matcher:a[2],optional:!1,rest:!0,chained:!0}),"(?:/(.*))?";const s=/^\[\[(\w+)(?:=(\w+))?\]\]$/.exec(r);if(s)return t.push({name:s[1],matcher:s[2],optional:!0,rest:!1,chained:!0}),"(?:/([^/]+))?";if(!r)return;const i=r.split(/\[(.+?)\](?!\])/);return"/"+i.map((c,l)=>{if(l%2){if(c.startsWith("x+"))return ue(String.fromCharCode(parseInt(c.slice(2),16)));if(c.startsWith("u+"))return ue(String.fromCharCode(...c.slice(2).split("-").map(p=>parseInt(p,16))));const d=vt.exec(c),[,g,u,f,h]=d;return t.push({name:f,matcher:h,optional:!!g,rest:!!u,chained:u?l===1&&i[0]==="":!1}),u?"(.*?)":g?"([^/]*)?":"([^/]+?)"}return ue(c)}).join("")}).join("")}/?$`),params:t}}function Et(e){return!/^\([^)]+\)$/.test(e)}function kt(e){return e.slice(1).split("/").filter(Et)}function St(e,t,n){const r={},a=e.slice(1),s=a.filter(o=>o!==void 0);let i=0;for(let o=0;o<t.length;o+=1){const c=t[o];let l=a[o-i];if(c.chained&&c.rest&&i&&(l=a.slice(o-i,o+1).filter(d=>d).join("/"),i=0),l===void 0){c.rest&&(r[c.name]="");continue}if(!c.matcher||n[c.matcher](l)){r[c.name]=l;const d=t[o+1],g=a[o+1];d&&!d.rest&&d.optional&&g&&c.chained&&(i=0),!d&&!g&&Object.keys(r).length===s.length&&(i=0);continue}if(c.optional&&c.chained){i++;continue}return}if(!i)return r}function ue(e){return e.normalize().replace(/[[\]]/g,"\\$&").replace(/%/g,"%25").replace(/\//g,"%2[Ff]").replace(/\?/g,"%3[Ff]").replace(/#/g,"%23").replace(/[.*+?^${}()|\\]/g,"\\$&")}function At({nodes:e,server_loads:t,dictionary:n,matchers:r}){const a=new Set(t);return Object.entries(n).map(([o,[c,l,d]])=>{const{pattern:g,params:u}=bt(o),f={id:o,exec:h=>{const p=g.exec(h);if(p)return St(p,u,r)},errors:[1,...d||[]].map(h=>e[h]),layouts:[0,...l||[]].map(i),leaf:s(c)};return f.errors.length=f.layouts.length=Math.max(f.errors.length,f.layouts.length),f});function s(o){const c=o<0;return c&&(o=~o),[c,e[o]]}function i(o){return o===void 0?o:[a.has(o),e[o]]}}function $e(e,t=JSON.parse){try{return t(sessionStorage[e])}catch{}}function Le(e,t,n=JSON.stringify){const r=n(t);try{sessionStorage[e]=r}catch{}}const x=[];function me(e,t=le){let n;const r=new Set;function a(o){if(st(e,o)&&(e=o,n)){const c=!x.length;for(const l of r)l[1](),x.push(l,e);if(c){for(let l=0;l<x.length;l+=2)x[l][0](x[l+1]);x.length=0}}}function s(o){a(o(e))}function i(o,c=le){const l=[o,c];return r.add(l),r.size===1&&(n=t(a,s)||le),o(e),()=>{r.delete(l),r.size===0&&n&&(n(),n=null)}}return{set:a,update:s,subscribe:i}}const A=globalThis.__sveltekit_1h8hrq6?.base??"/your-repo-name",Rt=globalThis.__sveltekit_1h8hrq6?.assets??A,It="1705782602526",De="sveltekit:snapshot",Ce="sveltekit:scroll",ye="sveltekit:states",Ve="sveltekit:pageurl",T="sveltekit:history",j="sveltekit:navigation",z={tap:1,hover:2,viewport:3,eager:4,off:-1,false:-1},H=location.origin;function we(e){if(e instanceof URL)return e;let t=document.baseURI;if(!t){const n=document.getElementsByTagName("base");t=n.length?n[0].href:document.URL}return new URL(e,t)}function ve(){return{x:pageXOffset,y:pageYOffset}}function N(e,t){return e.getAttribute(`data-sveltekit-${t}`)}const Pe={...z,"":z.hover};function qe(e){let t=e.assignedSlot??e.parentNode;return t?.nodeType===11&&(t=t.host),t}function Fe(e,t){for(;e&&e!==t;){if(e.nodeName.toUpperCase()==="A"&&e.hasAttribute("href"))return e;e=qe(e)}}function he(e,t){let n;try{n=new URL(e instanceof SVGAElement?e.href.baseVal:e.href,document.baseURI)}catch{}const r=e instanceof SVGAElement?e.target.baseVal:e.target,a=!n||!!r||te(n,t)||(e.getAttribute("rel")||"").split(/\s+/).includes("external"),s=n?.origin===H&&e.hasAttribute("download");return{url:n,external:a,target:r,download:s}}function Y(e){let t=null,n=null,r=null,a=null,s=null,i=null,o=e;for(;o&&o!==document.documentElement;)r===null&&(r=N(o,"preload-code")),a===null&&(a=N(o,"preload-data")),t===null&&(t=N(o,"keepfocus")),n===null&&(n=N(o,"noscroll")),s===null&&(s=N(o,"reload")),i===null&&(i=N(o,"replacestate")),o=qe(o);function c(l){switch(l){case"":case"true":return!0;case"off":case"false":return!1;default:return}}return{preload_code:Pe[r??"off"],preload_data:Pe[a??"off"],keepfocus:c(t),noscroll:c(n),reload:c(s),replace_state:c(i)}}function Te(e){const t=me(e);let n=!0;function r(){n=!0,t.update(i=>i)}function a(i){n=!1,t.set(i)}function s(i){let o;return t.subscribe(c=>{(o===void 0||n&&c!==o)&&i(o=c)})}return{notify:r,set:a,subscribe:s}}function Lt(){const{set:e,subscribe:t}=me(!1);let n;async function r(){clearTimeout(n);try{const a=await fetch(`${Rt}/_app/version.json`,{headers:{pragma:"no-cache","cache-control":"no-cache"}});if(!a.ok)return!1;const i=(await a.json()).version!==It;return i&&(e(!0),clearTimeout(n)),i}catch{return!1}}return{subscribe:t,check:r}}function te(e,t){return e.origin!==H||!e.pathname.startsWith(t)}const Pt=-1,Tt=-2,Ut=-3,xt=-4,Nt=-5,Ot=-6;function jt(e,t){if(typeof e=="number")return a(e,!0);if(!Array.isArray(e)||e.length===0)throw new Error("Invalid input");const n=e,r=Array(n.length);function a(s,i=!1){if(s===Pt)return;if(s===Ut)return NaN;if(s===xt)return 1/0;if(s===Nt)return-1/0;if(s===Ot)return-0;if(i)throw new Error("Invalid input");if(s in r)return r[s];const o=n[s];if(!o||typeof o!="object")r[s]=o;else if(Array.isArray(o))if(typeof o[0]=="string"){const c=o[0],l=t?.[c];if(l)return r[s]=l(a(o[1]));switch(c){case"Date":r[s]=new Date(o[1]);break;case"Set":const d=new Set;r[s]=d;for(let f=1;f<o.length;f+=1)d.add(a(o[f]));break;case"Map":const g=new Map;r[s]=g;for(let f=1;f<o.length;f+=2)g.set(a(o[f]),a(o[f+1]));break;case"RegExp":r[s]=new RegExp(o[1],o[2]);break;case"Object":r[s]=Object(o[1]);break;case"BigInt":r[s]=BigInt(o[1]);break;case"null":const u=Object.create(null);r[s]=u;for(let f=1;f<o.length;f+=2)u[o[f]]=a(o[f+1]);break;default:throw new Error(`Unknown type ${c}`)}}else{const c=new Array(o.length);r[s]=c;for(let l=0;l<o.length;l+=1){const d=o[l];d!==Tt&&(c[l]=a(d))}}else{const c={};r[s]=c;for(const l in o){const d=o[l];c[l]=a(d)}}return r[s]}return a(0)}const Ge=new Set(["load","prerender","csr","ssr","trailingSlash","config"]);[...Ge];const $t=new Set([...Ge]);[...$t];function Dt(e){return e.filter(t=>t!=null)}class ne{constructor(t,n){this.status=t,typeof n=="string"?this.body={message:n}:n?this.body=n:this.body={message:`Error: ${t}`}}toString(){return JSON.stringify(this.body)}}class Me{constructor(t,n){this.status=t,this.location=n}}class be extends Error{constructor(t,n,r){super(r),this.status=t,this.text=n}}const Ct="x-sveltekit-invalidated",Vt="x-sveltekit-trailing-slash";function J(e){return e instanceof ne||e instanceof be?e.status:500}function qt(e){return e instanceof be?e.text:"Internal Error"}const U=$e(Ce)??{},F=$e(De)??{},He=history.pushState,Ee=history.replaceState,L={url:Te({}),page:Te({}),navigating:me(null),updated:Lt()};function re(e){U[e]=ve()}function Ke(e,t){let n=e+1;for(;U[n];)delete U[n],n+=1;for(n=t+1;F[n];)delete F[n],n+=1}function $(e){return location.href=e.href,new Promise(()=>{})}function Ue(){}let ae,pe,W,I,ge,D;const Be=[],X=[];let O=null;const ze=[],Ft=[];let q=[],y={branch:[],error:null,url:null},ke=!1,Z=!1,xe=!0,G=!1,C=!1,Ye=!1,Se=!1,oe,w,S,E,Q;async function Xt(e,t,n){document.URL!==location.href&&(location.href=location.href),D=e,ae=At(e),I=document.documentElement,ge=t,pe=e.nodes[0],W=e.nodes[1],pe(),W(),w=history.state?.[T],S=history.state?.[j],w||(w=S=Date.now(),Ee.call(history,{...history.state,[T]:w,[j]:S},""));const r=U[w];r&&(history.scrollRestoration="manual",scrollTo(r.x,r.y)),n?await Yt(ge,n):Bt(location.href,{replaceState:!0}),zt()}function Je(e){X.some(t=>t?.snapshot)&&(F[e]=X.map(t=>t?.snapshot?.capture()))}function We(e){F[e]?.forEach((t,n)=>{X[n]?.snapshot?.restore(t)})}function Ne(){re(w),Le(Ce,U),Je(S),Le(De,F)}async function Xe(e,t,n,r){return B({type:"goto",url:we(e),keepfocus:t.keepFocus,noscroll:t.noScroll,replace_state:t.replaceState,state:t.state,redirect_count:n,nav_token:r,accept:()=>{t.invalidateAll&&(Se=!0)}})}async function Gt(e){return O={id:e.id,promise:Qe(e).then(t=>(t.type==="loaded"&&t.state.error&&(O=null),t))},O.promise}async function de(e){const t=ae.find(n=>n.exec(et(e)));t&&await Promise.all([...t.layouts,t.leaf].map(n=>n?.[1]()))}function Ze(e,t){y=e.state;const n=document.querySelector("style[data-sveltekit]");n&&n.remove(),E=e.props.page,oe=new D.root({target:t,props:{...e.props,stores:L,components:X},hydrate:!0}),We(S);const r={from:null,to:{params:y.params,route:{id:y.route?.id??null},url:new URL(location.href)},willUnload:!1,type:"enter",complete:Promise.resolve()};q.forEach(a=>a(r)),Z=!0}async function ee({url:e,params:t,branch:n,status:r,error:a,route:s,form:i}){let o="never";if(A&&(e.pathname===A||e.pathname===A+"/"))o="always";else for(const f of n)f?.slash!==void 0&&(o=f.slash);e.pathname=ct(e.pathname,o),e.search=e.search;const c={type:"loaded",state:{url:e,params:t,branch:n,error:a,route:s},props:{constructors:Dt(n).map(f=>f.node.component),page:E}};i!==void 0&&(c.props.form=i);let l={},d=!E,g=0;for(let f=0;f<Math.max(n.length,y.branch.length);f+=1){const h=n[f],p=y.branch[f];h?.data!==p?.data&&(d=!0),h&&(l={...l,...h.data},d&&(c.props[`data_${g}`]=l),g+=1)}return(!y.url||e.href!==y.url.href||y.error!==a||i!==void 0&&i!==E.form||d)&&(c.props.page={error:a,params:t,route:{id:s?.id??null},state:{},status:r,url:new URL(e),form:i??null,data:d?l:E.data}),c}async function Ae({loader:e,parent:t,url:n,params:r,route:a,server_data_node:s}){let i=null,o=!0;const c={dependencies:new Set,params:new Set,parent:!1,route:!1,url:!1,search_params:new Set},l=await e();if(l.universal?.load){let d=function(...u){for(const f of u){const{href:h}=new URL(f,n);c.dependencies.add(h)}};const g={route:new Proxy(a,{get:(u,f)=>(o&&(c.route=!0),u[f])}),params:new Proxy(r,{get:(u,f)=>(o&&c.params.add(f),u[f])}),data:s?.data??null,url:dt(n,()=>{o&&(c.url=!0)},u=>{o&&c.search_params.add(u)}),async fetch(u,f){let h;u instanceof Request?(h=u.url,f={body:u.method==="GET"||u.method==="HEAD"?void 0:await u.blob(),cache:u.cache,credentials:u.credentials,headers:u.headers,integrity:u.integrity,keepalive:u.keepalive,method:u.method,mode:u.mode,redirect:u.redirect,referrer:u.referrer,referrerPolicy:u.referrerPolicy,signal:u.signal,...f}):h=u;const p=new URL(h,n);return o&&d(p.href),p.origin===n.origin&&(h=p.href.slice(n.origin.length)),Z?wt(h,p.href,f):yt(h,f)},setHeaders:()=>{},depends:d,parent(){return o&&(c.parent=!0),t()},untrack(u){o=!1;try{return u()}finally{o=!0}}};i=await l.universal.load.call(null,g)??null}return{node:l,loader:e,server:s,universal:l.universal?.load?{type:"data",data:i,uses:c}:null,data:i??s?.data??null,slash:l.universal?.trailingSlash??s?.slash}}function Oe(e,t,n,r,a,s){if(Se)return!0;if(!a)return!1;if(a.parent&&e||a.route&&t||a.url&&n)return!0;for(const i of a.search_params)if(r.has(i))return!0;for(const i of a.params)if(s[i]!==y.params[i])return!0;for(const i of a.dependencies)if(Be.some(o=>o(new URL(i))))return!0;return!1}function Re(e,t){return e?.type==="data"?e:e?.type==="skip"?t??null:null}function Mt(e,t){if(!e)return new Set(t.searchParams.keys());const n=new Set([...e.searchParams.keys(),...t.searchParams.keys()]);for(const r of n){const a=e.searchParams.getAll(r),s=t.searchParams.getAll(r);a.every(i=>s.includes(i))&&s.every(i=>a.includes(i))&&n.delete(r)}return n}async function Qe({id:e,invalidating:t,url:n,params:r,route:a}){if(O?.id===e)return O.promise;const{errors:s,layouts:i,leaf:o}=a,c=[...i,o];s.forEach(_=>_?.().catch(()=>{})),c.forEach(_=>_?.[1]().catch(()=>{}));let l=null;const d=y.url?e!==y.url.pathname+y.url.search:!1,g=y.route?a.id!==y.route.id:!1,u=Mt(y.url,n);let f=!1;const h=c.map((_,m)=>{const v=y.branch[m],b=!!_?.[0]&&(v?.loader!==_[1]||Oe(f,g,d,u,v.server?.uses,r));return b&&(f=!0),b});if(h.some(Boolean)){try{l=await rt(n,h)}catch(_){return se({status:J(_),error:await M(_,{url:n,params:r,route:{id:a.id}}),url:n,route:a})}if(l.type==="redirect")return l}const p=l?.nodes;let R=!1;const k=c.map(async(_,m)=>{if(!_)return;const v=y.branch[m],b=p?.[m];if((!b||b.type==="skip")&&_[1]===v?.loader&&!Oe(R,g,d,u,v.universal?.uses,r))return v;if(R=!0,b?.type==="error")throw b;return Ae({loader:_[1],url:n,params:r,route:a,parent:async()=>{const ie={};for(let ce=0;ce<m;ce+=1)Object.assign(ie,(await k[ce])?.data);return ie},server_data_node:Re(b===void 0&&_[0]?{type:"skip"}:b??null,_[0]?v?.server:void 0)})});for(const _ of k)_.catch(()=>{});const P=[];for(let _=0;_<c.length;_+=1)if(c[_])try{P.push(await k[_])}catch(m){if(m instanceof Me)return{type:"redirect",location:m.location};let v=J(m),b;if(p?.includes(m))v=m.status??v,b=m.error;else if(m instanceof ne)b=m.body;else{if(await L.updated.check())return await $(n);b=await M(m,{params:r,url:n,route:{id:a.id}})}const K=await Ht(_,P,s);return K?await ee({url:n,params:r,branch:P.slice(0,K.idx).concat(K.node),status:v,error:b,route:a}):await nt(n,{id:a.id},b,v)}else P.push(void 0);return await ee({url:n,params:r,branch:P,status:200,error:null,route:a,form:t?void 0:null})}async function Ht(e,t,n){for(;e--;)if(n[e]){let r=e;for(;!t[r];)r-=1;try{return{idx:r+1,node:{node:await n[e](),loader:n[e],data:{},server:null,universal:null}}}catch{continue}}}async function se({status:e,error:t,url:n,route:r}){const a={};let s=null;if(D.server_loads[0]===0)try{const l=await rt(n,[!0]);if(l.type!=="data"||l.nodes[0]&&l.nodes[0].type!=="data")throw 0;s=l.nodes[0]??null}catch{(n.origin!==H||n.pathname!==location.pathname||ke)&&await $(n)}const o=await Ae({loader:pe,url:n,params:a,route:r,parent:()=>Promise.resolve({}),server_data_node:Re(s)}),c={node:await W(),loader:W,universal:null,server:null,data:null};return await ee({url:n,params:a,branch:[o,c],status:e,error:t,route:null})}function Ie(e,t){if(!e||te(e,A))return;let n;try{n=D.hooks.reroute({url:new URL(e)})??e.pathname}catch{return}const r=et(n);for(const a of ae){const s=a.exec(r);if(s)return{id:e.pathname+e.search,invalidating:t,route:a,params:ft(s),url:e}}}function et(e){return lt(e.slice(A.length)||"/")}function tt({url:e,type:t,intent:n,delta:r}){let a=!1;const s=ot(y,n,e,t);r!==void 0&&(s.navigation.delta=r);const i={...s.navigation,cancel:()=>{a=!0,s.reject(new Error("navigation cancelled"))}};return G||ze.forEach(o=>o(i)),a?null:s}async function B({type:e,url:t,popped:n,keepfocus:r,noscroll:a,replace_state:s,state:i={},redirect_count:o=0,nav_token:c={},accept:l=Ue,block:d=Ue}){const g=Ie(t,!1),u=tt({url:t,type:e,delta:n?.delta,intent:g});if(!u){d();return}const f=w,h=S;l(),G=!0,Z&&L.navigating.set(u.navigation),Q=c;let p=g&&await Qe(g);if(!p){if(te(t,A))return await $(t);p=await nt(t,{id:null},await M(new be(404,"Not Found",`Not found: ${t.pathname}`),{url:t,params:{},route:{id:null}}),404)}if(t=g?.url||t,Q!==c)return u.reject(new Error("navigation aborted")),!1;if(p.type==="redirect")if(o>=20)p=await se({status:500,error:await M(new Error("Redirect loop"),{url:t,params:{},route:{id:null}}),url:t,route:{id:null}});else return Xe(new URL(p.location,t).href,{},o+1,c),!1;else p.props.page.status>=400&&await L.updated.check()&&await $(t);if(Be.length=0,Se=!1,re(f),Je(h),p.props.page.url.pathname!==t.pathname&&(t.pathname=p.props.page.url.pathname),i=n?n.state:i,!n){const _=s?0:1,m={[T]:w+=_,[j]:S+=_,[ye]:i};(s?Ee:He).call(history,m,"",t),s||Ke(w,S)}if(O=null,p.props.page.state=i,Z){y=p.state,p.props.page&&(p.props.page.url=t);const _=(await Promise.all(Ft.map(m=>m(u.navigation)))).filter(m=>typeof m=="function");if(_.length>0){let m=function(){q=q.filter(v=>!_.includes(v))};_.push(m),callbacks.after_navigate.push(..._)}oe.$set(p.props),Ye=!0}else Ze(p,ge);const{activeElement:R}=document;await it();const k=n?n.scroll:a?ve():null;if(xe){const _=t.hash&&document.getElementById(decodeURIComponent(t.hash.slice(1)));k?scrollTo(k.x,k.y):_?_.scrollIntoView():scrollTo(0,0)}const P=document.activeElement!==R&&document.activeElement!==document.body;!r&&!P&&Jt(),xe=!0,p.props.page&&(E=p.props.page),G=!1,e==="popstate"&&We(S),u.fulfil(void 0),q.forEach(_=>_(u.navigation)),L.navigating.set(null)}async function nt(e,t,n,r){return e.origin===H&&e.pathname===location.pathname&&!ke?await se({status:r,error:n,url:e,route:t}):await $(e)}function Kt(){let e;I.addEventListener("mousemove",s=>{const i=s.target;clearTimeout(e),e=setTimeout(()=>{r(i,2)},20)});function t(s){r(s.composedPath()[0],1)}I.addEventListener("mousedown",t),I.addEventListener("touchstart",t,{passive:!0});const n=new IntersectionObserver(s=>{for(const i of s)i.isIntersecting&&(de(i.target.href),n.unobserve(i.target))},{threshold:0});function r(s,i){const o=Fe(s,I);if(!o)return;const{url:c,external:l,download:d}=he(o,A);if(l||d)return;const g=Y(o);if(!g.reload)if(i<=g.preload_data){const u=Ie(c,!1);u&&Gt(u)}else i<=g.preload_code&&de(c.pathname)}function a(){n.disconnect();for(const s of I.querySelectorAll("a")){const{url:i,external:o,download:c}=he(s,A);if(o||c)continue;const l=Y(s);l.reload||(l.preload_code===z.viewport&&n.observe(s),l.preload_code===z.eager&&de(i.pathname))}}q.push(a),a()}function M(e,t){if(e instanceof ne)return e.body;const n=J(e),r=qt(e);return D.hooks.handleError({error:e,event:t,status:n,message:r})??{message:r}}function Bt(e,t={}){return e=we(e),e.origin!==H?Promise.reject(new Error("goto: invalid URL")):Xe(e,t,0)}function Zt(e,t){re(w);const n={[T]:w+=1,[j]:S,[Ve]:E.url.href,[ye]:t};He.call(history,n,"",we(e)),E={...E,state:t},oe.$set({page:E}),Ke(w,S)}function zt(){history.scrollRestoration="manual",addEventListener("beforeunload",t=>{let n=!1;if(Ne(),!G){const r=ot(y,void 0,null,"leave"),a={...r.navigation,cancel:()=>{n=!0,r.reject(new Error("navigation cancelled"))}};ze.forEach(s=>s(a))}n?(t.preventDefault(),t.returnValue=""):history.scrollRestoration="auto"}),addEventListener("visibilitychange",()=>{document.visibilityState==="hidden"&&Ne()}),navigator.connection?.saveData||Kt(),I.addEventListener("click",t=>{if(t.button||t.which!==1||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.defaultPrevented)return;const n=Fe(t.composedPath()[0],I);if(!n)return;const{url:r,external:a,target:s,download:i}=he(n,A);if(!r)return;if(s==="_parent"||s==="_top"){if(window.parent!==window)return}else if(s&&s!=="_self")return;const o=Y(n);if(!(n instanceof SVGAElement)&&r.protocol!==location.protocol&&!(r.protocol==="https:"||r.protocol==="http:")||i)return;if(a||o.reload){tt({url:r,type:"link"})?G=!0:t.preventDefault();return}const[l,d]=r.href.split("#");if(d!==void 0&&l===fe(location)){const[,g]=y.url.href.split("#");if(g===d){t.preventDefault(),d===""||d==="top"&&n.ownerDocument.getElementById("top")===null?window.scrollTo({top:0}):n.ownerDocument.getElementById(d)?.scrollIntoView();return}if(C=!0,re(w),e(r),!o.replace_state)return;C=!1}t.preventDefault(),B({type:"link",url:r,keepfocus:o.keepfocus,noscroll:o.noscroll,replace_state:o.replace_state??r.href===location.href})}),I.addEventListener("submit",t=>{if(t.defaultPrevented)return;const n=HTMLFormElement.prototype.cloneNode.call(t.target),r=t.submitter;if((r?.formMethod||n.method)!=="get")return;const s=new URL(r?.hasAttribute("formaction")&&r?.formAction||n.action);if(te(s,A))return;const i=t.target,o=Y(i);if(o.reload)return;t.preventDefault(),t.stopPropagation();const c=new FormData(i),l=r?.getAttribute("name");l&&c.append(l,r?.getAttribute("value")??""),s.search=new URLSearchParams(c).toString(),B({type:"form",url:s,keepfocus:o.keepfocus,noscroll:o.noscroll,replace_state:o.replace_state??s.href===location.href})}),addEventListener("popstate",async t=>{if(t.state?.[T]){const n=t.state[T];if(Q={},n===w)return;const r=U[n],a=t.state[ye]??{},s=new URL(t.state[Ve]??location.href),i=t.state[j],o=fe(location)===fe(y.url);if(i===S&&(Ye||o)){e(s),U[w]=ve(),r&&scrollTo(r.x,r.y),a!==E.state&&(E={...E,state:a},oe.$set({page:E})),w=n;return}const l=n-w;await B({type:"popstate",url:s,popped:{state:a,scroll:r,delta:l},accept:()=>{w=n,S=i},block:()=>{history.go(-l)},nav_token:Q})}else if(!C){const n=new URL(location.href);e(n)}}),addEventListener("hashchange",()=>{C&&(C=!1,Ee.call(history,{...history.state,[T]:++w,[j]:S},"",location.href))});for(const t of document.querySelectorAll("link"))t.rel==="icon"&&(t.href=t.href);addEventListener("pageshow",t=>{t.persisted&&L.navigating.set(null)});function e(t){y.url=t,L.page.set({...E,url:t}),L.page.notify()}}async function Yt(e,{status:t=200,error:n,node_ids:r,params:a,route:s,data:i,form:o}){ke=!0;const c=new URL(location.href);({params:a={},route:s={id:null}}=Ie(c,!1)||{});let l;try{const d=r.map(async(f,h)=>{const p=i[h];return p?.uses&&(p.uses=at(p.uses)),Ae({loader:D.nodes[f],url:c,params:a,route:s,parent:async()=>{const R={};for(let k=0;k<h;k+=1)Object.assign(R,(await d[k]).data);return R},server_data_node:Re(p)})}),g=await Promise.all(d),u=ae.find(({id:f})=>f===s.id);if(u){const f=u.layouts;for(let h=0;h<f.length;h++)f[h]||g.splice(h,0,void 0)}l=await ee({url:c,params:a,branch:g,status:t,error:n,form:o,route:u??null})}catch(d){if(d instanceof Me){await $(new URL(d.location,location.href));return}l=await se({status:J(d),error:await M(d,{url:c,params:a,route:s}),url:c,route:s})}l.props.page&&(l.props.page.state={}),Ze(l,e)}async function rt(e,t){const n=new URL(e);n.pathname=gt(e.pathname),e.pathname.endsWith("/")&&n.searchParams.append(Vt,"1"),n.searchParams.append(Ct,t.map(a=>a?"1":"0").join(""));const r=await je(n.href);if(!r.ok){let a;throw r.headers.get("content-type")?.includes("application/json")?a=await r.json():r.status===404?a="Not Found":r.status===500&&(a="Internal Error"),new ne(r.status,a)}return new Promise(async a=>{const s=new Map,i=r.body.getReader(),o=new TextDecoder;function c(d){return jt(d,{Promise:g=>new Promise((u,f)=>{s.set(g,{fulfil:u,reject:f})})})}let l="";for(;;){const{done:d,value:g}=await i.read();if(d&&!l)break;for(l+=!g&&l?`
`:o.decode(g,{stream:!0});;){const u=l.indexOf(`
`);if(u===-1)break;const f=JSON.parse(l.slice(0,u));if(l=l.slice(u+1),f.type==="redirect")return a(f);if(f.type==="data")f.nodes?.forEach(h=>{h?.type==="data"&&(h.uses=at(h.uses),h.data=c(h.data))}),a(f);else if(f.type==="chunk"){const{id:h,data:p,error:R}=f,k=s.get(h);s.delete(h),R?k.reject(c(R)):k.fulfil(c(p))}}}})}function at(e){return{dependencies:new Set(e?.dependencies??[]),params:new Set(e?.params??[]),parent:!!e?.parent,route:!!e?.route,url:!!e?.url,search_params:new Set(e?.search_params??[])}}function Jt(){const e=document.querySelector("[autofocus]");if(e)e.focus();else{const t=document.body,n=t.getAttribute("tabindex");t.tabIndex=-1,t.focus({preventScroll:!0,focusVisible:!1}),n!==null?t.setAttribute("tabindex",n):t.removeAttribute("tabindex");const r=getSelection();if(r&&r.type!=="None"){const a=[];for(let s=0;s<r.rangeCount;s+=1)a.push(r.getRangeAt(s));setTimeout(()=>{if(r.rangeCount===a.length){for(let s=0;s<r.rangeCount;s+=1){const i=a[s],o=r.getRangeAt(s);if(i.commonAncestorContainer!==o.commonAncestorContainer||i.startContainer!==o.startContainer||i.endContainer!==o.endContainer||i.startOffset!==o.startOffset||i.endOffset!==o.endOffset)return}r.removeAllRanges()}})}}}function ot(e,t,n,r){let a,s;const i=new Promise((c,l)=>{a=c,s=l});return i.catch(()=>{}),{navigation:{from:{params:e.params,route:{id:e.route?.id??null},url:e.url},to:n&&{params:t?.params??null,route:{id:t?.route?.id??null},url:n},willUnload:!t,type:r,complete:i},fulfil:a,reject:s}}export{Xt as a,A as b,Bt as g,Zt as p,L as s,me as w};
