function T(){}function C(t,n){for(const e in n)t[e]=n[e];return t}function Q(t){return!!t&&(typeof t=="object"||typeof t=="function")&&typeof t.then=="function"}function q(t){return t()}function V(){return Object.create(null)}function H(t){t.forEach(q)}function X(t){return typeof t=="function"}function Y(t,n){return t!=t?n==n:t!==n||t&&typeof t=="object"||typeof t=="function"}let h;function Z(t,n){return t===n?!0:(h||(h=document.createElement("a")),h.href=n,t===h.href)}function $(t){return Object.keys(t).length===0}function P(t,...n){if(t==null){for(const i of n)i(void 0);return T}const e=t.subscribe(...n);return e.unsubscribe?()=>e.unsubscribe():e}function tt(t,n,e){t.$$.on_destroy.push(P(n,e))}function nt(t,n,e,i){if(t){const c=N(t,n,e,i);return t[0](c)}}function N(t,n,e,i){return t[1]&&i?C(e.ctx.slice(),t[1](i(n))):e.ctx}function et(t,n,e,i){if(t[2]&&i){const c=t[2](i(e));if(n.dirty===void 0)return c;if(typeof c=="object"){const u=[],r=Math.max(n.dirty.length,c.length);for(let s=0;s<r;s+=1)u[s]=n.dirty[s]|c[s];return u}return n.dirty|c}return n.dirty}function it(t,n,e,i,c,u){if(c){const r=N(n,e,i,u);t.p(r,c)}}function ct(t){if(t.ctx.length>32){const n=[],e=t.ctx.length/32;for(let i=0;i<e;i++)n[i]=-1;return n}return-1}function rt(t){const n={};for(const e in t)e[0]!=="$"&&(n[e]=t[e]);return n}function lt(t,n){const e={};n=new Set(n);for(const i in t)!n.has(i)&&i[0]!=="$"&&(e[i]=t[i]);return e}let p=!1;function st(){p=!0}function ut(){p=!1}function B(t,n,e,i){for(;t<n;){const c=t+(n-t>>1);e(c)<=i?t=c+1:n=c}return t}function L(t){if(t.hydrate_init)return;t.hydrate_init=!0;let n=t.childNodes;if(t.nodeName==="HEAD"){const l=[];for(let o=0;o<n.length;o++){const a=n[o];a.claim_order!==void 0&&l.push(a)}n=l}const e=new Int32Array(n.length+1),i=new Int32Array(n.length);e[0]=-1;let c=0;for(let l=0;l<n.length;l++){const o=n[l].claim_order,a=(c>0&&n[e[c]].claim_order<=o?c+1:B(1,c,D=>n[e[D]].claim_order,o))-1;i[l]=e[a]+1;const w=a+1;e[w]=l,c=Math.max(w,c)}const u=[],r=[];let s=n.length-1;for(let l=e[c]+1;l!=0;l=i[l-1]){for(u.push(n[l-1]);s>=l;s--)r.push(n[s]);s--}for(;s>=0;s--)r.push(n[s]);u.reverse(),r.sort((l,o)=>l.claim_order-o.claim_order);for(let l=0,o=0;l<r.length;l++){for(;o<u.length&&r[l].claim_order>=u[o].claim_order;)o++;const a=o<u.length?u[o]:null;t.insertBefore(r[l],a)}}function M(t,n){if(p){for(L(t),(t.actual_end_child===void 0||t.actual_end_child!==null&&t.actual_end_child.parentNode!==t)&&(t.actual_end_child=t.firstChild);t.actual_end_child!==null&&t.actual_end_child.claim_order===void 0;)t.actual_end_child=t.actual_end_child.nextSibling;n!==t.actual_end_child?(n.claim_order!==void 0||n.parentNode!==t)&&t.insertBefore(n,t.actual_end_child):t.actual_end_child=n.nextSibling}else(n.parentNode!==t||n.nextSibling!==null)&&t.appendChild(n)}function ot(t,n,e){p&&!e?M(t,n):(n.parentNode!==t||n.nextSibling!=e)&&t.insertBefore(n,e||null)}function at(t){t.parentNode&&t.parentNode.removeChild(t)}function ft(t,n){for(let e=0;e<t.length;e+=1)t[e]&&t[e].d(n)}function O(t){return document.createElement(t)}function z(t){return document.createElementNS("http://www.w3.org/2000/svg",t)}function E(t){return document.createTextNode(t)}function _t(){return E(" ")}function dt(){return E("")}function ht(t,n,e,i){return t.addEventListener(n,e,i),()=>t.removeEventListener(n,e,i)}function mt(t){return function(n){return n.preventDefault(),t.call(this,n)}}function F(t,n,e){e==null?t.removeAttribute(n):t.getAttribute(n)!==e&&t.setAttribute(n,e)}function pt(t,n){for(const e in n)F(t,e,n[e])}function bt(t){return t.dataset.svelteH}function yt(t){return t===""?null:+t}function gt(t){return Array.from(t.childNodes)}function I(t){t.claim_info===void 0&&(t.claim_info={last_index:0,total_claimed:0})}function A(t,n,e,i,c=!1){I(t);const u=(()=>{for(let r=t.claim_info.last_index;r<t.length;r++){const s=t[r];if(n(s)){const l=e(s);return l===void 0?t.splice(r,1):t[r]=l,c||(t.claim_info.last_index=r),s}}for(let r=t.claim_info.last_index-1;r>=0;r--){const s=t[r];if(n(s)){const l=e(s);return l===void 0?t.splice(r,1):t[r]=l,c?l===void 0&&t.claim_info.last_index--:t.claim_info.last_index=r,s}}return i()})();return u.claim_order=t.claim_info.total_claimed,t.claim_info.total_claimed+=1,u}function j(t,n,e,i){return A(t,c=>c.nodeName===n,c=>{const u=[];for(let r=0;r<c.attributes.length;r++){const s=c.attributes[r];e[s.name]||u.push(s.name)}u.forEach(r=>c.removeAttribute(r))},()=>i(n))}function xt(t,n,e){return j(t,n,e,O)}function Et(t,n,e){return j(t,n,e,z)}function R(t,n){return A(t,e=>e.nodeType===3,e=>{const i=""+n;if(e.data.startsWith(i)){if(e.data.length!==i.length)return e.splitText(i.length)}else e.data=i},()=>E(n),!0)}function vt(t){return R(t," ")}function wt(t,n){n=""+n,t.data!==n&&(t.data=n)}function kt(t,n){t.value=n??""}function Nt(t,n,e,i){e==null?t.style.removeProperty(n):t.style.setProperty(n,e,i?"important":"")}function At(t,n,e){t.classList.toggle(n,!!e)}function U(t,n,{bubbles:e=!1,cancelable:i=!1}={}){return new CustomEvent(t,{detail:n,bubbles:e,cancelable:i})}function jt(t,n){const e=[];let i=0;for(const c of n.childNodes)if(c.nodeType===8){const u=c.textContent.trim();u===`HEAD_${t}_END`?(i-=1,e.push(c)):u===`HEAD_${t}_START`&&(i+=1,e.push(c))}else i>0&&e.push(c);return e}function St(t,n){return new t(n)}let m;function b(t){m=t}function v(){if(!m)throw new Error("Function called outside component initialization");return m}function Dt(t){v().$$.on_mount.push(t)}function Tt(t){v().$$.after_update.push(t)}function Ct(){const t=v();return(n,e,{cancelable:i=!1}={})=>{const c=t.$$.callbacks[n];if(c){const u=U(n,e,{cancelable:i});return c.slice().forEach(r=>{r.call(t,u)}),!u.defaultPrevented}return!0}}function qt(t,n){const e=t.$$.callbacks[n.type];e&&e.slice().forEach(i=>i.call(this,n))}const d=[],k=[];let _=[];const g=[],S=Promise.resolve();let x=!1;function W(){x||(x=!0,S.then(J))}function Ht(){return W(),S}function G(t){_.push(t)}function Pt(t){g.push(t)}const y=new Set;let f=0;function J(){if(f!==0)return;const t=m;do{try{for(;f<d.length;){const n=d[f];f++,b(n),K(n.$$)}}catch(n){throw d.length=0,f=0,n}for(b(null),d.length=0,f=0;k.length;)k.pop()();for(let n=0;n<_.length;n+=1){const e=_[n];y.has(e)||(y.add(e),e())}_.length=0}while(d.length);for(;g.length;)g.pop()();x=!1,y.clear(),b(t)}function K(t){if(t.fragment!==null){t.update(),H(t.before_update);const n=t.dirty;t.dirty=[-1],t.fragment&&t.fragment.p(t.ctx,n),t.after_update.forEach(G)}}function Bt(t){const n=[],e=[];_.forEach(i=>t.indexOf(i)===-1?n.push(i):e.push(i)),e.forEach(i=>i()),_=n}export{yt as $,Et as A,pt as B,lt as C,rt as D,dt as E,Tt as F,Dt as G,Nt as H,k as I,St as J,Ht as K,V as L,J as M,X as N,$ as O,G as P,Bt as Q,m as R,b as S,q as T,d as U,W as V,st as W,ut as X,Pt as Y,Ct as Z,qt as _,_t as a,Q as a0,v as a1,nt as a2,it as a3,ct as a4,et as a5,gt as b,xt as c,R as d,O as e,at as f,vt as g,M as h,ot as i,wt as j,tt as k,bt as l,F as m,T as n,Z as o,At as p,kt as q,ht as r,Y as s,E as t,mt as u,H as v,jt as w,ft as x,C as y,z};
