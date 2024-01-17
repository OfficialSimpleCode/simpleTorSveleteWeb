import{$ as Nr,a0 as kr,S as yt,M as Rr,s as rs,e as J,c as Q,b as O,f as E,m as g,i as H,n as G,a as oe,E as fi,g as le,z as he,t as Gt,A as ue,d as Ht,h as R,j as qt,k as Pr,a1 as xr,a2 as Ar,a3 as Dr,a4 as Or,l as Mr}from"../chunks/scheduler.4VumOUtm.js";import{g as Lr,b as Et,e as Fr,t as It,S as os,i as ls,c as Wr,a as Ur,m as Vr,d as Gr}from"../chunks/index.w0pDqxea.js";import{c as Hr}from"../chunks/ToastManager.2kikC1Of.js";import{g as qr,w as $r,c as pe,d as me,a as Kr,r as Yr,e as _i,i as pi,T as _n,b as zr}from"../chunks/Business.VXCc1EVD.js";import{t as f,_ as Jr,C as Qr,r as pn,u as x,v as xn,w as X,x as Xr,y as Br,z as Zr,A as Me,B as St,D as ht,G as $t,a as jr,L as eo,H as as,I as Kt,J as to,K as no,s as mi,i as cs,h as io,q as so,M as Yt,g as $e,N as ro,c as oo,d as lo,b as ao,e as co,S as ho,O as uo,P as fo}from"../chunks/index.esm2017._8xOdYI8.js";import{p as _o}from"../chunks/stores.s24Dzysu.js";function po(n,e){const t=e.token={};function i(s,r,o,l){if(e.token!==t)return;e.resolved=l;let a=e.ctx;o!==void 0&&(a=a.slice(),a[o]=l);const c=s&&(e.current=s)(a);let h=!1;e.block&&(e.blocks?e.blocks.forEach((u,d)=>{d!==r&&u&&(Lr(),Et(u,1,1,()=>{e.blocks[d]===u&&(e.blocks[d]=null)}),Fr())}):e.block.d(1),c.c(),It(c,1),c.m(e.mount(),e.anchor),h=!0),e.block=c,e.blocks&&(e.blocks[r]=c),h&&Rr()}if(Nr(n)){const s=kr();if(n.then(r=>{yt(s),i(e.then,1,e.value,r),yt(null)},r=>{if(yt(s),i(e.catch,2,e.error,r),yt(null),!e.hasCatch)throw r}),e.current!==e.pending)return i(e.pending,0),!0}else{if(e.current!==e.then)return i(e.then,1,e.value,n),!0;e.resolved=n}}function mo(n,e,t){const i=e.slice(),{resolved:s}=n;n.current===n.then&&(i[n.value]=s),n.current===n.catch&&(i[n.error]=s),n.block.p(i,t)}const go=!0,oh=Object.freeze(Object.defineProperty({__proto__:null,prerender:go},Symbol.toStringTag,{value:"Module"}));function gi(n){let e,t,i,s,r=n[0].status=="info"&&vi(n),o=n[0].status=="success"&&yi(n),l=n[0].status=="fail"&&Ci(n),a=n[0].status=="warning"&&wi(n);return{c(){r&&r.c(),e=oe(),o&&o.c(),t=oe(),l&&l.c(),i=oe(),a&&a.c(),s=fi()},l(c){r&&r.l(c),e=le(c),o&&o.l(c),t=le(c),l&&l.l(c),i=le(c),a&&a.l(c),s=fi()},m(c,h){r&&r.m(c,h),H(c,e,h),o&&o.m(c,h),H(c,t,h),l&&l.m(c,h),H(c,i,h),a&&a.m(c,h),H(c,s,h)},p(c,h){c[0].status=="info"?r?r.p(c,h):(r=vi(c),r.c(),r.m(e.parentNode,e)):r&&(r.d(1),r=null),c[0].status=="success"?o?o.p(c,h):(o=yi(c),o.c(),o.m(t.parentNode,t)):o&&(o.d(1),o=null),c[0].status=="fail"?l?l.p(c,h):(l=Ci(c),l.c(),l.m(i.parentNode,i)):l&&(l.d(1),l=null),c[0].status=="warning"?a?a.p(c,h):(a=wi(c),a.c(),a.m(s.parentNode,s)):a&&(a.d(1),a=null)},d(c){c&&(E(e),E(t),E(i),E(s)),r&&r.d(c),o&&o.d(c),l&&l.d(c),a&&a.d(c)}}}function vi(n){let e,t,i,s,r,o=n[0].text+"",l;return{c(){e=J("div"),t=he("svg"),i=he("path"),s=oe(),r=J("span"),l=Gt(o),this.h()},l(a){e=Q(a,"DIV",{role:!0,class:!0});var c=O(e);t=ue(c,"svg",{xmlns:!0,fill:!0,viewBox:!0,class:!0});var h=O(t);i=ue(h,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),O(i).forEach(E),h.forEach(E),s=le(c),r=Q(c,"SPAN",{});var u=O(r);l=Ht(u,o),u.forEach(E),c.forEach(E),this.h()},h(){g(i,"stroke-linecap","round"),g(i,"stroke-linejoin","round"),g(i,"stroke-width","2"),g(i,"d","M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"),g(t,"xmlns","http://www.w3.org/2000/svg"),g(t,"fill","none"),g(t,"viewBox","0 0 24 24"),g(t,"class","stroke-current shrink-0 w-6 h-6"),g(e,"role","alert"),g(e,"class","alert alert-info")},m(a,c){H(a,e,c),R(e,t),R(t,i),R(e,s),R(e,r),R(r,l)},p(a,c){c&1&&o!==(o=a[0].text+"")&&qt(l,o)},d(a){a&&E(e)}}}function yi(n){let e,t,i,s,r,o=n[0].text+"",l;return{c(){e=J("div"),t=he("svg"),i=he("path"),s=oe(),r=J("span"),l=Gt(o),this.h()},l(a){e=Q(a,"DIV",{role:!0,class:!0});var c=O(e);t=ue(c,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0});var h=O(t);i=ue(h,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),O(i).forEach(E),h.forEach(E),s=le(c),r=Q(c,"SPAN",{});var u=O(r);l=Ht(u,o),u.forEach(E),c.forEach(E),this.h()},h(){g(i,"stroke-linecap","round"),g(i,"stroke-linejoin","round"),g(i,"stroke-width","2"),g(i,"d","M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"),g(t,"xmlns","http://www.w3.org/2000/svg"),g(t,"class","stroke-current shrink-0 h-6 w-6"),g(t,"fill","none"),g(t,"viewBox","0 0 24 24"),g(e,"role","alert"),g(e,"class","alert alert-success")},m(a,c){H(a,e,c),R(e,t),R(t,i),R(e,s),R(e,r),R(r,l)},p(a,c){c&1&&o!==(o=a[0].text+"")&&qt(l,o)},d(a){a&&E(e)}}}function Ci(n){let e,t,i,s,r,o=n[0].text+"",l;return{c(){e=J("div"),t=he("svg"),i=he("path"),s=oe(),r=J("span"),l=Gt(o),this.h()},l(a){e=Q(a,"DIV",{role:!0,class:!0});var c=O(e);t=ue(c,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0});var h=O(t);i=ue(h,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),O(i).forEach(E),h.forEach(E),s=le(c),r=Q(c,"SPAN",{});var u=O(r);l=Ht(u,o),u.forEach(E),c.forEach(E),this.h()},h(){g(i,"stroke-linecap","round"),g(i,"stroke-linejoin","round"),g(i,"stroke-width","2"),g(i,"d","M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"),g(t,"xmlns","http://www.w3.org/2000/svg"),g(t,"class","stroke-current shrink-0 h-6 w-6"),g(t,"fill","none"),g(t,"viewBox","0 0 24 24"),g(e,"role","alert"),g(e,"class","alert alert-error")},m(a,c){H(a,e,c),R(e,t),R(t,i),R(e,s),R(e,r),R(r,l)},p(a,c){c&1&&o!==(o=a[0].text+"")&&qt(l,o)},d(a){a&&E(e)}}}function wi(n){let e,t,i,s,r,o=n[0].text+"",l;return{c(){e=J("div"),t=he("svg"),i=he("path"),s=oe(),r=J("span"),l=Gt(o),this.h()},l(a){e=Q(a,"DIV",{role:!0,class:!0});var c=O(e);t=ue(c,"svg",{xmlns:!0,class:!0,fill:!0,viewBox:!0});var h=O(t);i=ue(h,"path",{"stroke-linecap":!0,"stroke-linejoin":!0,"stroke-width":!0,d:!0}),O(i).forEach(E),h.forEach(E),s=le(c),r=Q(c,"SPAN",{});var u=O(r);l=Ht(u,o),u.forEach(E),c.forEach(E),this.h()},h(){g(i,"stroke-linecap","round"),g(i,"stroke-linejoin","round"),g(i,"stroke-width","2"),g(i,"d","M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"),g(t,"xmlns","http://www.w3.org/2000/svg"),g(t,"class","stroke-current shrink-0 h-6 w-6"),g(t,"fill","none"),g(t,"viewBox","0 0 24 24"),g(e,"role","alert"),g(e,"class","alert alert-warning")},m(a,c){H(a,e,c),R(e,t),R(t,i),R(e,s),R(e,r),R(r,l)},p(a,c){c&1&&o!==(o=a[0].text+"")&&qt(l,o)},d(a){a&&E(e)}}}function vo(n){let e,t=n[0]!==null&&gi(n);return{c(){e=J("div"),t&&t.c(),this.h()},l(i){e=Q(i,"DIV",{id:!0,class:!0});var s=O(e);t&&t.l(s),s.forEach(E),this.h()},h(){g(e,"id","toast"),g(e,"class","fixed bottom-8 right-12 min-w-[250px] z-50")},m(i,s){H(i,e,s),t&&t.m(e,null)},p(i,[s]){i[0]!==null?t?t.p(i,s):(t=gi(i),t.c(),t.m(e,null)):t&&(t.d(1),t=null)},i:G,o:G,d(i){i&&E(e),t&&t.d()}}}function yo(n,e,t){let i;return Hr.subscribe(s=>t(0,i=s)),[i]}class Co extends os{constructor(e){super(),ls(this,e,yo,vo,rs,{})}}const wo={apiKey:"AIzaSyCSIQHCC23Z7ul639fD8JLMHu4yN77_0VA",authDomain:"managementsystemapp-c1fda.firebaseapp.com",databaseURL:"https://managementsystemapp-c1fda-default-rtdb.europe-west1.firebasedatabase.app",projectId:"managementsystemapp-c1fda",storageBucket:"managementsystemapp-c1fda.appspot.com",messagingSenderId:"670820779934",appId:"1:670820779934:web:fdcf77a952b59c3090788f",measurementId:"G-WP8J044JN9"},Eo="production",ge=`enviroments/${Eo}`,Io="Businesses";var Ei={};const Ii="@firebase/database",Si="1.0.2";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hs="";function So(n){hs=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bo{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),x(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:xn(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return X(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const us=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new bo(e)}}catch{}return new To},Ce=us("localStorage"),mn=us("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ae=new jr("@firebase/database"),No=function(){let n=1;return function(){return n++}}(),ds=function(n){const e=Xr(n),t=new Br;t.update(e);const i=t.digest();return Zr.encodeByteArray(i)},ut=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=ut.apply(null,i):typeof i=="object"?e+=x(i):e+=i,e+=" "}return e};let Ee=null,bi=!0;const ko=function(n,e){f(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(Ae.logLevel=eo.VERBOSE,Ee=Ae.log.bind(Ae),e&&mn.set("logging_enabled",!0)):typeof n=="function"?Ee=n:(Ee=null,mn.remove("logging_enabled"))},M=function(...n){if(bi===!0&&(bi=!1,Ee===null&&mn.get("logging_enabled")===!0&&ko(!0)),Ee){const e=ut.apply(null,n);Ee(e)}},dt=function(n){return function(...e){M(n,...e)}},gn=function(...n){const e="FIREBASE INTERNAL ERROR: "+ut(...n);Ae.error(e)},ie=function(...n){const e=`FIREBASE FATAL ERROR: ${ut(...n)}`;throw Ae.error(e),new Error(e)},U=function(...n){const e="FIREBASE WARNING: "+ut(...n);Ae.warn(e)},Ro=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&U("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},An=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Po=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},Le="[MIN_NAME]",Ie="[MAX_NAME]",Te=function(n,e){if(n===e)return 0;if(n===Le||e===Ie)return-1;if(e===Le||n===Ie)return 1;{const t=Ti(n),i=Ti(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},xo=function(n,e){return n===e?0:n<e?-1:1},Je=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+x(e))},Dn=function(n){if(typeof n!="object"||n===null)return x(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=x(e[i]),t+=":",t+=Dn(n[e[i]]);return t+="}",t},fs=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function L(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const _s=function(n){f(!An(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,l,a;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(l=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=l+i,o=Math.round(n*Math.pow(2,t-l)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(a=t;a;a-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(a=e;a;a-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const h=c.join("");let u="";for(a=0;a<64;a+=8){let d=parseInt(h.substr(a,8),2).toString(16);d.length===1&&(d="0"+d),u=u+d}return u.toLowerCase()},Ao=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Do=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function Oo(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Mo=new RegExp("^-?(0*)\\d{1,10}$"),Lo=-2147483648,Fo=2147483647,Ti=function(n){if(Mo.test(n)){const e=Number(n);if(e>=Lo&&e<=Fo)return e}return null},Ke=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw U("Exception was thrown by user callback.",t),e},Math.floor(0))}},Wo=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Ze=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Uo{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t?.getImmediate({optional:!0}),this.appCheck||t?.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){U(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vo{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(M("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',U(e)}}class De{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}De.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const On="5",ps="v",ms="s",gs="r",vs="f",ys=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Cs="ls",ws="p",vn="ac",Es="websocket",Is="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ss{constructor(e,t,i,s,r=!1,o="",l=!1,a=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=l,this.isUsingEmulator=a,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ce.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ce.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Go(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function bs(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===Es)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Is)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Go(n)&&(t.ns=n.namespace);const s=[];return L(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ho{constructor(){this.counters_={}}incrementCounter(e,t=1){X(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return ro(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const on={},ln={};function Mn(n){const e=n.toString();return on[e]||(on[e]=new Ho),on[e]}function qo(n,e){const t=n.toString();return ln[t]||(ln[t]=e()),ln[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ke(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ni="start",Ko="close",Yo="pLPCommand",zo="pRTLPCB",Ts="id",Ns="pw",ks="ser",Jo="cb",Qo="seg",Xo="ts",Bo="d",Zo="dframe",Rs=1870,Ps=30,jo=Rs-Ps,el=25e3,tl=3e4;class Pe{constructor(e,t,i,s,r,o,l){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=l,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=dt(e),this.stats_=Mn(t),this.urlFn=a=>(this.appCheckToken&&(a[vn]=this.appCheckToken),bs(t,Is,a))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new $o(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(tl)),Po(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ln((...r)=>{const[o,l,a,c,h]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===Ni)this.id=l,this.password=a;else if(o===Ko)l?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(l,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,l]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,l)},()=>{this.onClosed_()},this.urlFn);const i={};i[Ni]="t",i[ks]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Jo]=this.scriptTagHolder.uniqueCallbackIdentifier),i[ps]=On,this.transportSessionId&&(i[ms]=this.transportSessionId),this.lastSessionId&&(i[Cs]=this.lastSessionId),this.applicationId&&(i[ws]=this.applicationId),this.appCheckToken&&(i[vn]=this.appCheckToken),typeof location<"u"&&location.hostname&&ys.test(location.hostname)&&(i[gs]=vs);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Pe.forceAllow_=!0}static forceDisallow(){Pe.forceDisallow_=!0}static isAvailable(){return Pe.forceAllow_?!0:!Pe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ao()&&!Do()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=uo(t),s=fs(i,jo);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[Zo]="t",i[Ts]=e,i[Ns]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=x(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Ln{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=No(),window[Yo+this.uniqueCallbackIdentifier]=e,window[zo+this.uniqueCallbackIdentifier]=t,this.myIFrame=Ln.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(l){M("frame writing exception"),l.stack&&M(l.stack),M(l)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||M("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Ts]=this.myID,e[Ns]=this.myPW,e[ks]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Ps+i.length<=Rs;){const o=this.pendingSegs.shift();i=i+"&"+Qo+s+"="+o.seg+"&"+Xo+s+"="+o.ts+"&"+Bo+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(el)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{M("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nl=16384,il=45e3;let bt=null;typeof MozWebSocket<"u"?bt=MozWebSocket:typeof WebSocket<"u"&&(bt=WebSocket);class K{constructor(e,t,i,s,r,o,l){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=dt(this.connId),this.stats_=Mn(t),this.connURL=K.connectionURL_(t,o,l,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[ps]=On,typeof location<"u"&&location.hostname&&ys.test(location.hostname)&&(o[gs]=vs),t&&(o[ms]=t),i&&(o[Cs]=i),s&&(o[vn]=s),r&&(o[ws]=r),bs(e,Es,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ce.set("previous_websocket_failure",!0);try{let i;as(),this.mySock=new bt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){K.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&bt!==null&&!K.forceDisallow_}static previouslyFailed(){return Ce.isInMemoryStorage||Ce.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ce.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=xn(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=x(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=fs(t,nl);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(il))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}K.responsesRequiredToBeHealthy=2;K.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class nt{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Pe,K]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=K&&K.isAvailable();let i=t&&!K.previouslyFailed();if(e.webSocketOnly&&(t||U("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[K];else{const s=this.transports_=[];for(const r of nt.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);nt.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}nt.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const sl=6e4,rl=5e3,ol=10*1024,ll=100*1024,an="t",ki="d",al="s",Ri="r",cl="e",Pi="o",xi="a",Ai="n",Di="p",hl="h";class ul{constructor(e,t,i,s,r,o,l,a,c,h){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=l,this.onDisconnect_=a,this.onKill_=c,this.lastSessionId=h,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=dt("c:"+this.id+":"),this.transportManager_=new nt(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=Ze(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>ll?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ol?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(an in e){const t=e[an];t===xi?this.upgradeIfSecondaryHealthy_():t===Ri?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Pi&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Je("t",e),i=Je("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Di,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:xi,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ai,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Je("t",e),i=Je("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Je(an,e);if(ki in e){const i=e[ki];if(t===hl){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Ai){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===al?this.onConnectionShutdown_(i):t===Ri?this.onReset_(i):t===cl?gn("Server Error: "+i):t===Pi?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):gn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),On!==i&&U("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),Ze(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(sl))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Ze(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(rl))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Di,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ce.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xs{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class As{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Tt extends As{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!cs()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Tt}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Oi=32,Mi=768;class I{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function w(){return new I("")}function v(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function de(n){return n.pieces_.length-n.pieceNum_}function T(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new I(n.pieces_,e)}function Fn(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function dl(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function it(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Ds(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new I(e,0)}function N(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof I)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new I(t,0)}function C(n){return n.pieceNum_>=n.pieces_.length}function W(n,e){const t=v(n),i=v(e);if(t===null)return e;if(t===i)return W(T(n),T(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function fl(n,e){const t=it(n,0),i=it(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=Te(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Wn(n,e){if(de(n)!==de(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function q(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(de(n)>de(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class _l{constructor(e,t){this.errorPrefix_=t,this.parts_=it(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=Yt(this.parts_[i]);Os(this)}}function pl(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Yt(e),Os(n)}function ml(n){const e=n.parts_.pop();n.byteLength_-=Yt(e),n.parts_.length>0&&(n.byteLength_-=1)}function Os(n){if(n.byteLength_>Mi)throw new Error(n.errorPrefix_+"has a key path longer than "+Mi+" bytes ("+n.byteLength_+").");if(n.parts_.length>Oi)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Oi+") or object contains a cycle "+ye(n))}function ye(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Un extends As{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Un}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qe=1e3,gl=60*5*1e3,Li=30*1e3,vl=1.3,yl=3e4,Cl="server_kill",Fi=3;class ne extends xs{constructor(e,t,i,s,r,o,l,a){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=l,this.authOverride_=a,this.id=ne.nextPersistentConnectionId_++,this.log_=dt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Qe,this.maxReconnectDelay_=gl,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,a&&!as())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Un.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Tt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(x(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new Kt,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const l=o.d;o.s==="ok"?t.resolve(l):t.reject(l)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const l={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,l),this.connected_&&this.sendListen_(l)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,l=>{const a=l.d,c=l.s;ne.warnOnListenWarnings_(a,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",l),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,a))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&X(e,"w")){const i=Me(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();U(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||to(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Li)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=no(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const l=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(l):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+x(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):gn("Unrecognized action received from server: "+x(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Qe,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Qe,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>yl&&(this.reconnectDelay_=Qe),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*vl)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+ne.nextConnectionId_++,r=this.lastSessionId;let o=!1,l=null;const a=function(){l?l.close():(o=!0,i())},c=function(u){f(l,"sendRequest call when we're not connected not allowed."),l.sendRequest(u)};this.realtime_={close:a,sendRequest:c};const h=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[u,d]=await Promise.all([this.authTokenProvider_.getToken(h),this.appCheckTokenProvider_.getToken(h)]);o?M("getToken() completed but was canceled"):(M("getToken() completed. Creating connection."),this.authToken_=u&&u.accessToken,this.appCheckToken_=d&&d.token,l=new ul(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,_=>{U(_+" ("+this.repoInfo_.toString()+")"),this.interrupt(Cl)},r))}catch(u){this.log_("Failed to get token: "+u),o||(this.repoInfo_.nodeAdmin&&U(u),a())}}}interrupt(e){M("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){M("Resuming connection for reason: "+e),delete this.interruptReasons_[e],mi(this.interruptReasons_)&&(this.reconnectDelay_=Qe,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>Dn(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new I(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){M("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Fi&&(this.reconnectDelay_=Li,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){M("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Fi&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+hs.replace(/\./g,"-")]=1,cs()?e["framework.cordova"]=1:io()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Tt.getInstance().currentlyOnline();return mi(this.interruptReasons_)&&e}}ne.nextPersistentConnectionId_=0;ne.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class y{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new y(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zt{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new y(Le,e),s=new y(Le,t);return this.compare(i,s)!==0}minPost(){return y.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ct;class Ms extends zt{static get __EMPTY_NODE(){return Ct}static set __EMPTY_NODE(e){Ct=e}compare(e,t){return Te(e.name,t.name)}isDefinedOn(e){throw ht("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return y.MIN}maxPost(){return new y(Ie,Ct)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new y(e,Ct)}toString(){return".key"}}const Oe=new Ms;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class D{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??D.RED,this.left=s??V.EMPTY_NODE,this.right=r??V.EMPTY_NODE}copy(e,t,i,s,r){return new D(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return V.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return V.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,D.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,D.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}D.RED=!0;D.BLACK=!1;class wl{copy(e,t,i,s,r){return this}insert(e,t,i){return new D(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class V{constructor(e,t=V.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new V(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,D.BLACK,null,null))}remove(e){return new V(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,D.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new wt(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new wt(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new wt(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new wt(this.root_,null,this.comparator_,!0,e)}}V.EMPTY_NODE=new wl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function El(n,e){return Te(n.name,e.name)}function Vn(n,e){return Te(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let yn;function Il(n){yn=n}const Ls=function(n){return typeof n=="number"?"number:"+_s(n):"string:"+n},Fs=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&X(e,".sv"),"Priority must be a string or number.")}else f(n===yn||n.isEmpty(),"priority of unexpected type.");f(n===yn||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Wi;class A{constructor(e,t=A.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Fs(this.priorityNode_)}static set __childrenNodeConstructor(e){Wi=e}static get __childrenNodeConstructor(){return Wi}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new A(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:A.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return C(e)?this:v(e)===".priority"?this.priorityNode_:A.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:A.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=v(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||de(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,A.__childrenNodeConstructor.EMPTY_NODE.updateChild(T(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Ls(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=_s(this.value_):e+=this.value_,this.lazyHash_=ds(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===A.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof A.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=A.VALUE_TYPE_ORDER.indexOf(t),r=A.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}A.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Ws,Us;function Sl(n){Ws=n}function bl(n){Us=n}class Tl extends zt{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?Te(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return y.MIN}maxPost(){return new y(Ie,new A("[PRIORITY-POST]",Us))}makePost(e,t){const i=Ws(e);return new y(t,new A("[PRIORITY-POST]",i))}toString(){return".priority"}}const k=new Tl;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Nl=Math.log(2);class kl{constructor(e){const t=r=>parseInt(Math.log(r)/Nl,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Nt=function(n,e,t,i){n.sort(e);const s=function(a,c){const h=c-a;let u,d;if(h===0)return null;if(h===1)return u=n[a],d=t?t(u):u,new D(d,u.node,D.BLACK,null,null);{const _=parseInt(h/2,10)+a,p=s(a,_),S=s(_+1,c);return u=n[_],d=t?t(u):u,new D(d,u.node,D.BLACK,p,S)}},r=function(a){let c=null,h=null,u=n.length;const d=function(p,S){const F=u-p,ke=u;u-=p;const vt=s(F+1,ke),rn=n[F],Tr=t?t(rn):rn;_(new D(Tr,rn.node,S,null,vt))},_=function(p){c?(c.left=p,c=p):(h=p,c=p)};for(let p=0;p<a.count;++p){const S=a.nextBitIsOne(),F=Math.pow(2,a.count-(p+1));S?d(F,D.BLACK):(d(F,D.BLACK),d(F,D.RED))}return h},o=new kl(n.length),l=r(o);return new V(i||e,l)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let cn;const Re={};class j{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return f(Re&&k,"ChildrenNode.ts has not been loaded"),cn=cn||new j({".priority":Re},{".priority":k}),cn}get(e){const t=Me(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof V?t:null}hasIndex(e){return X(this.indexSet_,e.toString())}addIndex(e,t){f(e!==Oe,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(y.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let l;s?l=Nt(i,e.getCompare()):l=Re;const a=e.toString(),c=Object.assign({},this.indexSet_);c[a]=e;const h=Object.assign({},this.indexes_);return h[a]=l,new j(h,c)}addToIndexes(e,t){const i=St(this.indexes_,(s,r)=>{const o=Me(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===Re)if(o.isDefinedOn(e.node)){const l=[],a=t.getIterator(y.Wrap);let c=a.getNext();for(;c;)c.name!==e.name&&l.push(c),c=a.getNext();return l.push(e),Nt(l,o.getCompare())}else return Re;else{const l=t.get(e.name);let a=s;return l&&(a=a.remove(new y(e.name,l))),a.insert(e,e.node)}});return new j(i,this.indexSet_)}removeFromIndexes(e,t){const i=St(this.indexes_,s=>{if(s===Re)return s;{const r=t.get(e.name);return r?s.remove(new y(e.name,r)):s}});return new j(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Xe;class m{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&Fs(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return Xe||(Xe=new m(new V(Vn),null,j.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||Xe}updatePriority(e){return this.children_.isEmpty()?this:new m(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?Xe:t}}getChild(e){const t=v(e);return t===null?this:this.getImmediateChild(t).getChild(T(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new y(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?Xe:this.priorityNode_;return new m(s,o,r)}}updateChild(e,t){const i=v(e);if(i===null)return t;{f(v(e)!==".priority"||de(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(T(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(k,(o,l)=>{t[o]=l.val(e),i++,r&&m.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const l in t)o[l]=t[l];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Ls(this.getPriority().val())+":"),this.forEachChild(k,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":ds(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new y(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new y(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new y(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,y.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===ft?-1:0}withIndex(e){if(e===Oe||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new m(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===Oe||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(k),s=t.getIterator(k);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===Oe?null:this.indexMap_.get(e.toString())}}m.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Rl extends m{constructor(){super(new V(Vn),m.EMPTY_NODE,j.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return m.EMPTY_NODE}isEmpty(){return!1}}const ft=new Rl;Object.defineProperties(y,{MIN:{value:new y(Le,m.EMPTY_NODE)},MAX:{value:new y(Ie,ft)}});Ms.__EMPTY_NODE=m.EMPTY_NODE;A.__childrenNodeConstructor=m;Il(ft);bl(ft);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pl=!0;function P(n,e=null){if(n===null)return m.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new A(t,P(e))}if(!(n instanceof Array)&&Pl){const t=[];let i=!1;if(L(n,(o,l)=>{if(o.substring(0,1)!=="."){const a=P(l);a.isEmpty()||(i=i||!a.getPriority().isEmpty(),t.push(new y(o,a)))}}),t.length===0)return m.EMPTY_NODE;const r=Nt(t,El,o=>o.name,Vn);if(i){const o=Nt(t,k.getCompare());return new m(r,P(e),new j({".priority":o},{".priority":k}))}else return new m(r,P(e),j.Default)}else{let t=m.EMPTY_NODE;return L(n,(i,s)=>{if(X(n,i)&&i.substring(0,1)!=="."){const r=P(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(P(e))}}Sl(P);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xl extends zt{constructor(e){super(),this.indexPath_=e,f(!C(e)&&v(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?Te(e.name,t.name):r}makePost(e,t){const i=P(e),s=m.EMPTY_NODE.updateChild(this.indexPath_,i);return new y(t,s)}maxPost(){const e=m.EMPTY_NODE.updateChild(this.indexPath_,ft);return new y(Ie,e)}toString(){return it(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Al extends zt{compare(e,t){const i=e.node.compareTo(t.node);return i===0?Te(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return y.MIN}maxPost(){return y.MAX}makePost(e,t){const i=P(e);return new y(t,i)}toString(){return".value"}}const Dl=new Al;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Vs(n){return{type:"value",snapshotNode:n}}function Fe(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function st(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function rt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Ol(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Gn{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const l=e.getImmediateChild(t);return l.getChild(s).equals(i.getChild(s))&&l.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(st(t,l)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):l.isEmpty()?o.trackChildChange(Fe(t,i)):o.trackChildChange(rt(t,i,l))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(k,(s,r)=>{t.hasChild(s)||i.trackChildChange(st(s,r))}),t.isLeafNode()||t.forEachChild(k,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(rt(s,r,o))}else i.trackChildChange(Fe(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?m.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ot{constructor(e){this.indexedFilter_=new Gn(e.getIndex()),this.index_=e.getIndex(),this.startPost_=ot.getStartPost_(e),this.endPost_=ot.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new y(t,i))||(i=m.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=m.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(m.EMPTY_NODE);const r=this;return t.forEachChild(k,(o,l)=>{r.matches(new y(o,l))||(s=s.updateImmediateChild(o,m.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ml{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new ot(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new y(t,i))||(i=m.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=m.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=m.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const l=r.getNext();if(this.withinDirectionalStart(l))if(this.withinDirectionalEnd(l))s=s.updateImmediateChild(l.name,l.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(m.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const l=r.getNext();o<this.limit_&&this.withinDirectionalStart(l)&&this.withinDirectionalEnd(l)?o++:s=s.updateImmediateChild(l.name,m.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const u=this.index_.getCompare();o=(d,_)=>u(_,d)}else o=this.index_.getCompare();const l=e;f(l.numChildren()===this.limit_,"");const a=new y(t,i),c=this.reverse_?l.getFirstChild(this.index_):l.getLastChild(this.index_),h=this.rangedFilter_.matches(a);if(l.hasChild(t)){const u=l.getImmediateChild(t);let d=s.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||l.hasChild(d.name));)d=s.getChildAfterChild(this.index_,d,this.reverse_);const _=d==null?1:o(d,a);if(h&&!i.isEmpty()&&_>=0)return r?.trackChildChange(rt(t,i,u)),l.updateImmediateChild(t,i);{r?.trackChildChange(st(t,u));const S=l.updateImmediateChild(t,m.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r?.trackChildChange(Fe(d.name,d.node)),S.updateImmediateChild(d.name,d.node)):S}}else return i.isEmpty()?e:h&&o(c,a)>=0?(r!=null&&(r.trackChildChange(st(c.name,c.node)),r.trackChildChange(Fe(t,i))),l.updateImmediateChild(t,i).updateImmediateChild(c.name,m.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=k}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:Le}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ie}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===k}copy(){const e=new Hn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function Ll(n){return n.loadsAllData()?new Gn(n.getIndex()):n.hasLimit()?new Ml(n):new ot(n)}function Ui(n){const e={};if(n.isDefault())return e;let t;if(n.index_===k?t="$priority":n.index_===Dl?t="$value":n.index_===Oe?t="$key":(f(n.index_ instanceof xl,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=x(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=x(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+x(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=x(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+x(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Vi(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==k&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class kt extends xs{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=dt("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=kt.getListenId_(e,i),l={};this.listens_[o]=l;const a=Ui(e._queryParams);this.restRequest_(r+".json",a,(c,h)=>{let u=h;if(c===404&&(u=null,c=null),c===null&&this.onDataUpdate_(r,u,!1,i),Me(this.listens_,o)===l){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",s(d,null)}})}unlisten(e,t){const i=kt.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Ui(e._queryParams),i=e._path.toString(),s=new Kt;return this.restRequest_(i+".json",t,(r,o)=>{let l=o;r===404&&(l=null,r=null),r===null?(this.onDataUpdate_(i,l,!1,null),s.resolve(l)):s.reject(new Error(l))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+so(t);this.log_("Sending REST request for "+o);const l=new XMLHttpRequest;l.onreadystatechange=()=>{if(i&&l.readyState===4){this.log_("REST Response for "+o+" received. status:",l.status,"response:",l.responseText);let a=null;if(l.status>=200&&l.status<300){try{a=xn(l.responseText)}catch{U("Failed to parse JSON response for "+o+": "+l.responseText)}i(null,a)}else l.status!==401&&l.status!==404&&U("Got unsuccessful REST response for "+o+" Status: "+l.status),i(l.status);i=null}},l.open("GET",o,!0),l.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fl{constructor(){this.rootNode_=m.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Rt(){return{value:null,children:new Map}}function Gs(n,e,t){if(C(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=v(e);n.children.has(i)||n.children.set(i,Rt());const s=n.children.get(i);e=T(e),Gs(s,e,t)}}function Cn(n,e,t){n.value!==null?t(e,n.value):Wl(n,(i,s)=>{const r=new I(e.toString()+"/"+i);Cn(s,r,t)})}function Wl(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ul{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&L(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Gi=10*1e3,Vl=30*1e3,Gl=5*60*1e3;class Hl{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Ul(e);const i=Gi+(Vl-Gi)*Math.random();Ze(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;L(e,(s,r)=>{r>0&&X(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),Ze(this.reportStats_.bind(this),Math.floor(Math.random()*2*Gl))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var Y;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Y||(Y={}));function qn(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function $n(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Kn(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pt{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=Y.ACK_USER_WRITE,this.source=qn()}operationForChild(e){if(C(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new I(e));return new Pt(w(),t,this.revert)}}else return f(v(this.path)===e,"operationForChild called for unrelated child."),new Pt(T(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class lt{constructor(e,t){this.source=e,this.path=t,this.type=Y.LISTEN_COMPLETE}operationForChild(e){return C(this.path)?new lt(this.source,w()):new lt(this.source,T(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Se{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=Y.OVERWRITE}operationForChild(e){return C(this.path)?new Se(this.source,w(),this.snap.getImmediateChild(e)):new Se(this.source,T(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class We{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=Y.MERGE}operationForChild(e){if(C(this.path)){const t=this.children.subtree(new I(e));return t.isEmpty()?null:t.value?new Se(this.source,w(),t.value):new We(this.source,w(),t)}else return f(v(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new We(this.source,T(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fe{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(C(e))return this.isFullyInitialized()&&!this.filtered_;const t=v(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ql{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function $l(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Ol(o.childName,o.snapshotNode))}),Be(n,s,"child_removed",e,i,t),Be(n,s,"child_added",e,i,t),Be(n,s,"child_moved",r,i,t),Be(n,s,"child_changed",e,i,t),Be(n,s,"value",e,i,t),s}function Be(n,e,t,i,s,r){const o=i.filter(l=>l.type===t);o.sort((l,a)=>Yl(n,l,a)),o.forEach(l=>{const a=Kl(n,l,r);s.forEach(c=>{c.respondsTo(l.type)&&e.push(c.createEvent(a,n.query_))})})}function Kl(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Yl(n,e,t){if(e.childName==null||t.childName==null)throw ht("Should only compare child_ events.");const i=new y(e.childName,e.snapshotNode),s=new y(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jt(n,e){return{eventCache:n,serverCache:e}}function je(n,e,t,i){return Jt(new fe(e,t,i),n.serverCache)}function Hs(n,e,t,i){return Jt(n.eventCache,new fe(e,t,i))}function xt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function be(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let hn;const zl=()=>(hn||(hn=new V(xo)),hn);class b{constructor(e,t=zl()){this.value=e,this.children=t}static fromObject(e){let t=new b(null);return L(e,(i,s)=>{t=t.set(new I(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:w(),value:this.value};if(C(e))return null;{const i=v(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(T(e),t);return r!=null?{path:N(new I(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(C(e))return this;{const t=v(e),i=this.children.get(t);return i!==null?i.subtree(T(e)):new b(null)}}set(e,t){if(C(e))return new b(t,this.children);{const i=v(e),r=(this.children.get(i)||new b(null)).set(T(e),t),o=this.children.insert(i,r);return new b(this.value,o)}}remove(e){if(C(e))return this.children.isEmpty()?new b(null):new b(null,this.children);{const t=v(e),i=this.children.get(t);if(i){const s=i.remove(T(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new b(null):new b(this.value,r)}else return this}}get(e){if(C(e))return this.value;{const t=v(e),i=this.children.get(t);return i?i.get(T(e)):null}}setTree(e,t){if(C(e))return t;{const i=v(e),r=(this.children.get(i)||new b(null)).setTree(T(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new b(this.value,o)}}fold(e){return this.fold_(w(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(N(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,w(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(C(e))return null;{const r=v(e),o=this.children.get(r);return o?o.findOnPath_(T(e),N(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,w(),t)}foreachOnPath_(e,t,i){if(C(e))return this;{this.value&&i(t,this.value);const s=v(e),r=this.children.get(s);return r?r.foreachOnPath_(T(e),N(t,s),i):new b(null)}}foreach(e){this.foreach_(w(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(N(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(e){this.writeTree_=e}static empty(){return new z(new b(null))}}function et(n,e,t){if(C(e))return new z(new b(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=W(s,e);return r=r.updateChild(o,t),new z(n.writeTree_.set(s,r))}else{const s=new b(t),r=n.writeTree_.setTree(e,s);return new z(r)}}}function wn(n,e,t){let i=n;return L(t,(s,r)=>{i=et(i,N(e,s),r)}),i}function Hi(n,e){if(C(e))return z.empty();{const t=n.writeTree_.setTree(e,new b(null));return new z(t)}}function En(n,e){return Ne(n,e)!=null}function Ne(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(W(t.path,e)):null}function qi(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(k,(i,s)=>{e.push(new y(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new y(i,s.value))}),e}function ae(n,e){if(C(e))return n;{const t=Ne(n,e);return t!=null?new z(new b(t)):new z(n.writeTree_.subtree(e))}}function In(n){return n.writeTree_.isEmpty()}function Ue(n,e){return qs(w(),n.writeTree_,e)}function qs(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=qs(N(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(N(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Qt(n,e){return zs(e,n)}function Jl(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=et(n.visibleWrites,e,t)),n.lastWriteId=i}function Ql(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=wn(n.visibleWrites,e,t),n.lastWriteId=i}function Xl(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function Bl(n,e){const t=n.allWrites.findIndex(l=>l.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const l=n.allWrites[o];l.visible&&(o>=t&&Zl(l,i.path)?s=!1:q(i.path,l.path)&&(r=!0)),o--}if(s){if(r)return jl(n),!0;if(i.snap)n.visibleWrites=Hi(n.visibleWrites,i.path);else{const l=i.children;L(l,a=>{n.visibleWrites=Hi(n.visibleWrites,N(i.path,a))})}return!0}else return!1}function Zl(n,e){if(n.snap)return q(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&q(N(n.path,t),e))return!0;return!1}function jl(n){n.visibleWrites=$s(n.allWrites,ea,w()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function ea(n){return n.visible}function $s(n,e,t){let i=z.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let l;if(r.snap)q(t,o)?(l=W(t,o),i=et(i,l,r.snap)):q(o,t)&&(l=W(o,t),i=et(i,w(),r.snap.getChild(l)));else if(r.children){if(q(t,o))l=W(t,o),i=wn(i,l,r.children);else if(q(o,t))if(l=W(o,t),C(l))i=wn(i,w(),r.children);else{const a=Me(r.children,v(l));if(a){const c=a.getChild(T(l));i=et(i,w(),c)}}}else throw ht("WriteRecord should have .snap or .children")}}return i}function Ks(n,e,t,i,s){if(!i&&!s){const r=Ne(n.visibleWrites,e);if(r!=null)return r;{const o=ae(n.visibleWrites,e);if(In(o))return t;if(t==null&&!En(o,w()))return null;{const l=t||m.EMPTY_NODE;return Ue(o,l)}}}else{const r=ae(n.visibleWrites,e);if(!s&&In(r))return t;if(!s&&t==null&&!En(r,w()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(q(c.path,e)||q(e,c.path))},l=$s(n.allWrites,o,e),a=t||m.EMPTY_NODE;return Ue(l,a)}}}function ta(n,e,t){let i=m.EMPTY_NODE;const s=Ne(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(k,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=ae(n.visibleWrites,e);return t.forEachChild(k,(o,l)=>{const a=Ue(ae(r,new I(o)),l);i=i.updateImmediateChild(o,a)}),qi(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=ae(n.visibleWrites,e);return qi(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function na(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=N(e,t);if(En(n.visibleWrites,r))return null;{const o=ae(n.visibleWrites,r);return In(o)?s.getChild(t):Ue(o,s.getChild(t))}}function ia(n,e,t,i){const s=N(e,t),r=Ne(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=ae(n.visibleWrites,s);return Ue(o,i.getNode().getImmediateChild(t))}else return null}function sa(n,e){return Ne(n.visibleWrites,e)}function ra(n,e,t,i,s,r,o){let l;const a=ae(n.visibleWrites,e),c=Ne(a,w());if(c!=null)l=c;else if(t!=null)l=Ue(a,t);else return[];if(l=l.withIndex(o),!l.isEmpty()&&!l.isLeafNode()){const h=[],u=o.getCompare(),d=r?l.getReverseIteratorFrom(i,o):l.getIteratorFrom(i,o);let _=d.getNext();for(;_&&h.length<s;)u(_,i)!==0&&h.push(_),_=d.getNext();return h}else return[]}function oa(){return{visibleWrites:z.empty(),allWrites:[],lastWriteId:-1}}function At(n,e,t,i){return Ks(n.writeTree,n.treePath,e,t,i)}function Yn(n,e){return ta(n.writeTree,n.treePath,e)}function $i(n,e,t,i){return na(n.writeTree,n.treePath,e,t,i)}function Dt(n,e){return sa(n.writeTree,N(n.treePath,e))}function la(n,e,t,i,s,r){return ra(n.writeTree,n.treePath,e,t,i,s,r)}function zn(n,e,t){return ia(n.writeTree,n.treePath,e,t)}function Ys(n,e){return zs(N(n.treePath,e),n.writeTree)}function zs(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class aa{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,rt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,st(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Fe(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,rt(i,e.snapshotNode,s.oldSnap));else throw ht("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ca{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Js=new ca;class Jn{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new fe(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return zn(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:be(this.viewCache_),r=la(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ha(n){return{filter:n}}function ua(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function da(n,e,t,i,s){const r=new aa;let o,l;if(t.type===Y.OVERWRITE){const c=t;c.source.fromUser?o=Sn(n,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered()&&!C(c.path),o=Ot(n,e,c.path,c.snap,i,s,l,r))}else if(t.type===Y.MERGE){const c=t;c.source.fromUser?o=_a(n,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),l=c.source.tagged||e.serverCache.isFiltered(),o=bn(n,e,c.path,c.children,i,s,l,r))}else if(t.type===Y.ACK_USER_WRITE){const c=t;c.revert?o=ga(n,e,c.path,i,s,r):o=pa(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===Y.LISTEN_COMPLETE)o=ma(n,e,t.path,i,r);else throw ht("Unknown operation type: "+t.type);const a=r.getChanges();return fa(e,o,a),{viewCache:o,changes:a}}function fa(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=xt(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Vs(xt(e)))}}function Qs(n,e,t,i,s,r){const o=e.eventCache;if(Dt(i,t)!=null)return e;{let l,a;if(C(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=be(e),h=c instanceof m?c:m.EMPTY_NODE,u=Yn(i,h);l=n.filter.updateFullNode(e.eventCache.getNode(),u,r)}else{const c=At(i,be(e));l=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=v(t);if(c===".priority"){f(de(t)===1,"Can't have a priority with additional path components");const h=o.getNode();a=e.serverCache.getNode();const u=$i(i,t,h,a);u!=null?l=n.filter.updatePriority(h,u):l=o.getNode()}else{const h=T(t);let u;if(o.isCompleteForChild(c)){a=e.serverCache.getNode();const d=$i(i,t,o.getNode(),a);d!=null?u=o.getNode().getImmediateChild(c).updateChild(h,d):u=o.getNode().getImmediateChild(c)}else u=zn(i,c,e.serverCache);u!=null?l=n.filter.updateChild(o.getNode(),c,u,h,s,r):l=o.getNode()}}return je(e,l,o.isFullyInitialized()||C(t),n.filter.filtersNodes())}}function Ot(n,e,t,i,s,r,o,l){const a=e.serverCache;let c;const h=o?n.filter:n.filter.getIndexedFilter();if(C(t))c=h.updateFullNode(a.getNode(),i,null);else if(h.filtersNodes()&&!a.isFiltered()){const _=a.getNode().updateChild(t,i);c=h.updateFullNode(a.getNode(),_,null)}else{const _=v(t);if(!a.isCompleteForPath(t)&&de(t)>1)return e;const p=T(t),F=a.getNode().getImmediateChild(_).updateChild(p,i);_===".priority"?c=h.updatePriority(a.getNode(),F):c=h.updateChild(a.getNode(),_,F,p,Js,null)}const u=Hs(e,c,a.isFullyInitialized()||C(t),h.filtersNodes()),d=new Jn(s,u,r);return Qs(n,u,t,s,d,l)}function Sn(n,e,t,i,s,r,o){const l=e.eventCache;let a,c;const h=new Jn(s,e,r);if(C(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),a=je(e,c,!0,n.filter.filtersNodes());else{const u=v(t);if(u===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),a=je(e,c,l.isFullyInitialized(),l.isFiltered());else{const d=T(t),_=l.getNode().getImmediateChild(u);let p;if(C(d))p=i;else{const S=h.getCompleteChild(u);S!=null?Fn(d)===".priority"&&S.getChild(Ds(d)).isEmpty()?p=S:p=S.updateChild(d,i):p=m.EMPTY_NODE}if(_.equals(p))a=e;else{const S=n.filter.updateChild(l.getNode(),u,p,d,h,o);a=je(e,S,l.isFullyInitialized(),n.filter.filtersNodes())}}}return a}function Ki(n,e){return n.eventCache.isCompleteForChild(e)}function _a(n,e,t,i,s,r,o){let l=e;return i.foreach((a,c)=>{const h=N(t,a);Ki(e,v(h))&&(l=Sn(n,l,h,c,s,r,o))}),i.foreach((a,c)=>{const h=N(t,a);Ki(e,v(h))||(l=Sn(n,l,h,c,s,r,o))}),l}function Yi(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function bn(n,e,t,i,s,r,o,l){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let a=e,c;C(t)?c=i:c=new b(null).setTree(t,i);const h=e.serverCache.getNode();return c.children.inorderTraversal((u,d)=>{if(h.hasChild(u)){const _=e.serverCache.getNode().getImmediateChild(u),p=Yi(n,_,d);a=Ot(n,a,new I(u),p,s,r,o,l)}}),c.children.inorderTraversal((u,d)=>{const _=!e.serverCache.isCompleteForChild(u)&&d.value===null;if(!h.hasChild(u)&&!_){const p=e.serverCache.getNode().getImmediateChild(u),S=Yi(n,p,d);a=Ot(n,a,new I(u),S,s,r,o,l)}}),a}function pa(n,e,t,i,s,r,o){if(Dt(s,t)!=null)return e;const l=e.serverCache.isFiltered(),a=e.serverCache;if(i.value!=null){if(C(t)&&a.isFullyInitialized()||a.isCompleteForPath(t))return Ot(n,e,t,a.getNode().getChild(t),s,r,l,o);if(C(t)){let c=new b(null);return a.getNode().forEachChild(Oe,(h,u)=>{c=c.set(new I(h),u)}),bn(n,e,t,c,s,r,l,o)}else return e}else{let c=new b(null);return i.foreach((h,u)=>{const d=N(t,h);a.isCompleteForPath(d)&&(c=c.set(h,a.getNode().getChild(d)))}),bn(n,e,t,c,s,r,l,o)}}function ma(n,e,t,i,s){const r=e.serverCache,o=Hs(e,r.getNode(),r.isFullyInitialized()||C(t),r.isFiltered());return Qs(n,o,t,i,Js,s)}function ga(n,e,t,i,s,r){let o;if(Dt(i,t)!=null)return e;{const l=new Jn(i,e,s),a=e.eventCache.getNode();let c;if(C(t)||v(t)===".priority"){let h;if(e.serverCache.isFullyInitialized())h=At(i,be(e));else{const u=e.serverCache.getNode();f(u instanceof m,"serverChildren would be complete if leaf node"),h=Yn(i,u)}h=h,c=n.filter.updateFullNode(a,h,r)}else{const h=v(t);let u=zn(i,h,e.serverCache);u==null&&e.serverCache.isCompleteForChild(h)&&(u=a.getImmediateChild(h)),u!=null?c=n.filter.updateChild(a,h,u,T(t),l,r):e.eventCache.getNode().hasChild(h)?c=n.filter.updateChild(a,h,m.EMPTY_NODE,T(t),l,r):c=a,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=At(i,be(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||Dt(i,w())!=null,je(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Gn(i.getIndex()),r=Ll(i);this.processor_=ha(r);const o=t.serverCache,l=t.eventCache,a=s.updateFullNode(m.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(m.EMPTY_NODE,l.getNode(),null),h=new fe(a,o.isFullyInitialized(),s.filtersNodes()),u=new fe(c,l.isFullyInitialized(),r.filtersNodes());this.viewCache_=Jt(u,h),this.eventGenerator_=new ql(this.query_)}get query(){return this.query_}}function ya(n){return n.viewCache_.serverCache.getNode()}function Ca(n){return xt(n.viewCache_)}function wa(n,e){const t=be(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!C(e)&&!t.getImmediateChild(v(e)).isEmpty())?t.getChild(e):null}function zi(n){return n.eventRegistrations_.length===0}function Ea(n,e){n.eventRegistrations_.push(e)}function Ji(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Qi(n,e,t,i){e.type===Y.MERGE&&e.source.queryId!==null&&(f(be(n.viewCache_),"We should always have a full cache before handling merges"),f(xt(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=da(n.processor_,s,e,t,i);return ua(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Xs(n,r.changes,r.viewCache.eventCache.getNode(),null)}function Ia(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(k,(r,o)=>{i.push(Fe(r,o))}),t.isFullyInitialized()&&i.push(Vs(t.getNode())),Xs(n,i,t.getNode(),e)}function Xs(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return $l(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Mt;class Bs{constructor(){this.views=new Map}}function Sa(n){f(!Mt,"__referenceConstructor has already been defined"),Mt=n}function ba(){return f(Mt,"Reference.ts has not been loaded"),Mt}function Ta(n){return n.views.size===0}function Qn(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),Qi(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Qi(o,e,t,i));return r}}function Zs(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let l=At(t,s?i:null),a=!1;l?a=!0:i instanceof m?(l=Yn(t,i),a=!1):(l=m.EMPTY_NODE,a=!1);const c=Jt(new fe(l,a,!1),new fe(i,s,!1));return new va(e,c)}return o}function Na(n,e,t,i,s,r){const o=Zs(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),Ea(o,t),Ia(o,t)}function ka(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const l=_e(n);if(s==="default")for(const[a,c]of n.views.entries())o=o.concat(Ji(c,t,i)),zi(c)&&(n.views.delete(a),c.query._queryParams.loadsAllData()||r.push(c.query));else{const a=n.views.get(s);a&&(o=o.concat(Ji(a,t,i)),zi(a)&&(n.views.delete(s),a.query._queryParams.loadsAllData()||r.push(a.query)))}return l&&!_e(n)&&r.push(new(ba())(e._repo,e._path)),{removed:r,events:o}}function js(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ce(n,e){let t=null;for(const i of n.views.values())t=t||wa(i,e);return t}function er(n,e){if(e._queryParams.loadsAllData())return Xt(n);{const i=e._queryIdentifier;return n.views.get(i)}}function tr(n,e){return er(n,e)!=null}function _e(n){return Xt(n)!=null}function Xt(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Lt;function Ra(n){f(!Lt,"__referenceConstructor has already been defined"),Lt=n}function Pa(){return f(Lt,"Reference.ts has not been loaded"),Lt}let xa=1;class Xi{constructor(e){this.listenProvider_=e,this.syncPointTree_=new b(null),this.pendingWriteTree_=oa(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function nr(n,e,t,i,s){return Jl(n.pendingWriteTree_,e,t,i,s),s?Ye(n,new Se(qn(),e,t)):[]}function Aa(n,e,t,i){Ql(n.pendingWriteTree_,e,t,i);const s=b.fromObject(t);return Ye(n,new We(qn(),e,s))}function se(n,e,t=!1){const i=Xl(n.pendingWriteTree_,e);if(Bl(n.pendingWriteTree_,e)){let r=new b(null);return i.snap!=null?r=r.set(w(),!0):L(i.children,o=>{r=r.set(new I(o),!0)}),Ye(n,new Pt(i.path,r,t))}else return[]}function _t(n,e,t){return Ye(n,new Se($n(),e,t))}function Da(n,e,t){const i=b.fromObject(t);return Ye(n,new We($n(),e,i))}function Oa(n,e){return Ye(n,new lt($n(),e))}function Ma(n,e,t){const i=Bn(n,t);if(i){const s=Zn(i),r=s.path,o=s.queryId,l=W(r,e),a=new lt(Kn(o),l);return jn(n,r,a)}else return[]}function Ft(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let l=[];if(o&&(e._queryIdentifier==="default"||tr(o,e))){const a=ka(o,e,t,i);Ta(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=a.removed;if(l=a.events,!s){const h=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,u=n.syncPointTree_.findOnPath(r,(d,_)=>_e(_));if(h&&!u){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const _=Wa(d);for(let p=0;p<_.length;++p){const S=_[p],F=S.query,ke=or(n,S);n.listenProvider_.startListening(tt(F),at(n,F),ke.hashFn,ke.onComplete)}}}!u&&c.length>0&&!i&&(h?n.listenProvider_.stopListening(tt(e),null):c.forEach(d=>{const _=n.queryToTagMap.get(Bt(d));n.listenProvider_.stopListening(tt(d),_)}))}Ua(n,c)}return l}function ir(n,e,t,i){const s=Bn(n,i);if(s!=null){const r=Zn(s),o=r.path,l=r.queryId,a=W(o,e),c=new Se(Kn(l),a,t);return jn(n,o,c)}else return[]}function La(n,e,t,i){const s=Bn(n,i);if(s){const r=Zn(s),o=r.path,l=r.queryId,a=W(o,e),c=b.fromObject(t),h=new We(Kn(l),a,c);return jn(n,o,h)}else return[]}function Tn(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(d,_)=>{const p=W(d,s);r=r||ce(_,p),o=o||_e(_)});let l=n.syncPointTree_.get(s);l?(o=o||_e(l),r=r||ce(l,w())):(l=new Bs,n.syncPointTree_=n.syncPointTree_.set(s,l));let a;r!=null?a=!0:(a=!1,r=m.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((_,p)=>{const S=ce(p,w());S&&(r=r.updateImmediateChild(_,S))}));const c=tr(l,e);if(!c&&!e._queryParams.loadsAllData()){const d=Bt(e);f(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const _=Va();n.queryToTagMap.set(d,_),n.tagToQueryMap.set(_,d)}const h=Qt(n.pendingWriteTree_,s);let u=Na(l,e,t,h,r,a);if(!c&&!o&&!i){const d=er(l,e);u=u.concat(Ga(n,e,d))}return u}function Xn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,l)=>{const a=W(o,e),c=ce(l,a);if(c)return c});return Ks(s,e,r,t,!0)}function Fa(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,h)=>{const u=W(c,t);i=i||ce(h,u)});let s=n.syncPointTree_.get(t);s?i=i||ce(s,w()):(s=new Bs,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new fe(i,!0,!1):null,l=Qt(n.pendingWriteTree_,e._path),a=Zs(s,e,l,r?o.getNode():m.EMPTY_NODE,r);return Ca(a)}function Ye(n,e){return sr(e,n.syncPointTree_,null,Qt(n.pendingWriteTree_,w()))}function sr(n,e,t,i){if(C(n.path))return rr(n,e,t,i);{const s=e.get(w());t==null&&s!=null&&(t=ce(s,w()));let r=[];const o=v(n.path),l=n.operationForChild(o),a=e.children.get(o);if(a&&l){const c=t?t.getImmediateChild(o):null,h=Ys(i,o);r=r.concat(sr(l,a,c,h))}return s&&(r=r.concat(Qn(s,n,i,t))),r}}function rr(n,e,t,i){const s=e.get(w());t==null&&s!=null&&(t=ce(s,w()));let r=[];return e.children.inorderTraversal((o,l)=>{const a=t?t.getImmediateChild(o):null,c=Ys(i,o),h=n.operationForChild(o);h&&(r=r.concat(rr(h,l,a,c)))}),s&&(r=r.concat(Qn(s,n,i,t))),r}function or(n,e){const t=e.query,i=at(n,t);return{hashFn:()=>(ya(e)||m.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Ma(n,t._path,i):Oa(n,t._path);{const r=Oo(s,t);return Ft(n,t,null,r)}}}}function at(n,e){const t=Bt(e);return n.queryToTagMap.get(t)}function Bt(n){return n._path.toString()+"$"+n._queryIdentifier}function Bn(n,e){return n.tagToQueryMap.get(e)}function Zn(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new I(n.substr(0,e))}}function jn(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=Qt(n.pendingWriteTree_,e);return Qn(i,t,s,null)}function Wa(n){return n.fold((e,t,i)=>{if(t&&_e(t))return[Xt(t)];{let s=[];return t&&(s=js(t)),L(i,(r,o)=>{s=s.concat(o)}),s}})}function tt(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Pa())(n._repo,n._path):n}function Ua(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=Bt(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function Va(){return xa++}function Ga(n,e,t){const i=e._path,s=at(n,e),r=or(n,t),o=n.listenProvider_.startListening(tt(e),s,r.hashFn,r.onComplete),l=n.syncPointTree_.subtree(i);if(s)f(!_e(l.value),"If we're adding a query, it shouldn't be shadowed");else{const a=l.fold((c,h,u)=>{if(!C(c)&&h&&_e(h))return[Xt(h).query];{let d=[];return h&&(d=d.concat(js(h).map(_=>_.query))),L(u,(_,p)=>{d=d.concat(p)}),d}});for(let c=0;c<a.length;++c){const h=a[c];n.listenProvider_.stopListening(tt(h),at(n,h))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ei{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new ei(t)}node(){return this.node_}}class ti{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=N(this.path_,e);return new ti(this.syncTree_,t)}node(){return Xn(this.syncTree_,this.path_)}}const Ha=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Bi=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return qa(n[".sv"],e,t);if(typeof n[".sv"]=="object")return $a(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},qa=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},$a=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},lr=function(n,e,t,i){return ni(e,new ti(t,n),i)},ar=function(n,e,t){return ni(n,new ei(e),t)};function ni(n,e,t){const i=n.getPriority().val(),s=Bi(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,l=Bi(o.getValue(),e,t);return l!==o.getValue()||s!==o.getPriority().val()?new A(l,P(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new A(s))),o.forEachChild(k,(l,a)=>{const c=ni(a,e.getImmediateChild(l),t);c!==a&&(r=r.updateImmediateChild(l,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ii{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function si(n,e){let t=e instanceof I?e:new I(e),i=n,s=v(t);for(;s!==null;){const r=Me(i.node.children,s)||{children:{},childCount:0};i=new ii(s,i,r),t=T(t),s=v(t)}return i}function ze(n){return n.node.value}function cr(n,e){n.node.value=e,Nn(n)}function hr(n){return n.node.childCount>0}function Ka(n){return ze(n)===void 0&&!hr(n)}function Zt(n,e){L(n.node.children,(t,i)=>{e(new ii(t,n,i))})}function ur(n,e,t,i){t&&!i&&e(n),Zt(n,s=>{ur(s,e,!0,i)}),t&&i&&e(n)}function Ya(n,e,t){let i=t?n:n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function pt(n){return new I(n.parent===null?n.name:pt(n.parent)+"/"+n.name)}function Nn(n){n.parent!==null&&za(n.parent,n.name,n)}function za(n,e,t){const i=Ka(t),s=X(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,Nn(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,Nn(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Ja=/[\[\].#$\/\u0000-\u001F\u007F]/,Qa=/[\[\].#$\u0000-\u001F\u007F]/,un=10*1024*1024,ri=function(n){return typeof n=="string"&&n.length!==0&&!Ja.test(n)},dr=function(n){return typeof n=="string"&&n.length!==0&&!Qa.test(n)},Xa=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),dr(n)},Ba=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!An(n)||n&&typeof n=="object"&&X(n,".sv")},Za=function(n,e,t,i){i&&e===void 0||jt($t(n,"value"),e,t)},jt=function(n,e,t){const i=t instanceof I?new _l(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+ye(i));if(typeof e=="function")throw new Error(n+"contains a function "+ye(i)+" with contents = "+e.toString());if(An(e))throw new Error(n+"contains "+e.toString()+" "+ye(i));if(typeof e=="string"&&e.length>un/3&&Yt(e)>un)throw new Error(n+"contains a string greater than "+un+" utf8 bytes "+ye(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(L(e,(o,l)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!ri(o)))throw new Error(n+" contains an invalid key ("+o+") "+ye(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);pl(i,o),jt(n,l,i),ml(i)}),s&&r)throw new Error(n+' contains ".value" child '+ye(i)+" in addition to actual children.")}},ja=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=it(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!ri(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(fl);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&q(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},ec=function(n,e,t,i){if(i&&e===void 0)return;const s=$t(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];L(e,(o,l)=>{const a=new I(o);if(jt(s,l,N(t,a)),Fn(a)===".priority"&&!Ba(l))throw new Error(s+"contains an invalid value for '"+a.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(a)}),ja(s,r)},fr=function(n,e,t,i){if(!(i&&t===void 0)&&!dr(t))throw new Error($t(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},tc=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),fr(n,e,t,i)},_r=function(n,e){if(v(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},nc=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!ri(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!Xa(t))throw new Error($t(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ic{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function en(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Wn(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function pr(n,e,t){en(n,t),mr(n,i=>Wn(i,e))}function $(n,e,t){en(n,t),mr(n,i=>q(i,e)||q(e,i))}function mr(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(sc(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function sc(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Ee&&M("event: "+t.toString()),Ke(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc="repo_interrupt",oc=25;class lc{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new ic,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Rt(),this.transactionQueueTree_=new ii,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function ac(n,e,t){if(n.stats_=Mn(n.repoInfo_),n.forceRestClient_||Wo())n.server_=new kt(n.repoInfo_,(i,s,r,o)=>{Zi(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>ji(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{x(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new ne(n.repoInfo_,e,(i,s,r,o)=>{Zi(n,i,s,r,o)},i=>{ji(n,i)},i=>{hc(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=qo(n.repoInfo_,()=>new Hl(n.stats_,n.server_)),n.infoData_=new Fl,n.infoSyncTree_=new Xi({startListening:(i,s,r,o)=>{let l=[];const a=n.infoData_.getNode(i._path);return a.isEmpty()||(l=_t(n.infoSyncTree_,i._path,a),setTimeout(()=>{o("ok")},0)),l},stopListening:()=>{}}),oi(n,"connected",!1),n.serverSyncTree_=new Xi({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(l,a)=>{const c=o(l,a);$(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function cc(n){const t=n.infoData_.getNode(new I(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function tn(n){return Ha({timestamp:cc(n)})}function Zi(n,e,t,i,s){n.dataUpdateCount++;const r=new I(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const a=St(t,c=>P(c));o=La(n.serverSyncTree_,r,a,s)}else{const a=P(t);o=ir(n.serverSyncTree_,r,a,s)}else if(i){const a=St(t,c=>P(c));o=Da(n.serverSyncTree_,r,a)}else{const a=P(t);o=_t(n.serverSyncTree_,r,a)}let l=r;o.length>0&&(l=Ve(n,r)),$(n.eventQueue_,l,o)}function ji(n,e){oi(n,"connected",e),e===!1&&_c(n)}function hc(n,e){L(e,(t,i)=>{oi(n,t,i)})}function oi(n,e,t){const i=new I("/.info/"+e),s=P(t);n.infoData_.updateSnapshot(i,s);const r=_t(n.infoSyncTree_,i,s);$(n.eventQueue_,i,r)}function li(n){return n.nextWriteId_++}function uc(n,e,t){const i=Fa(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=P(s).withIndex(e._queryParams.getIndex());Tn(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=_t(n.serverSyncTree_,e._path,r);else{const l=at(n.serverSyncTree_,e);o=ir(n.serverSyncTree_,e._path,r,l)}return $(n.eventQueue_,e._path,o),Ft(n.serverSyncTree_,e,t,null,!0),r},s=>(mt(n,"get for query "+x(e)+" failed: "+s),Promise.reject(new Error(s))))}function dc(n,e,t,i,s){mt(n,"set",{path:e.toString(),value:t,priority:i});const r=tn(n),o=P(t,i),l=Xn(n.serverSyncTree_,e),a=ar(o,l,r),c=li(n),h=nr(n.serverSyncTree_,e,a,c,!0);en(n.eventQueue_,h),n.server_.put(e.toString(),o.val(!0),(d,_)=>{const p=d==="ok";p||U("set at "+e+" failed: "+d);const S=se(n.serverSyncTree_,c,!p);$(n.eventQueue_,e,S),kn(n,s,d,_)});const u=ci(n,e);Ve(n,u),$(n.eventQueue_,u,[])}function fc(n,e,t,i){mt(n,"update",{path:e.toString(),value:t});let s=!0;const r=tn(n),o={};if(L(t,(l,a)=>{s=!1,o[l]=lr(N(e,l),P(a),n.serverSyncTree_,r)}),s)M("update() called with empty data.  Don't do anything."),kn(n,i,"ok",void 0);else{const l=li(n),a=Aa(n.serverSyncTree_,e,o,l);en(n.eventQueue_,a),n.server_.merge(e.toString(),t,(c,h)=>{const u=c==="ok";u||U("update at "+e+" failed: "+c);const d=se(n.serverSyncTree_,l,!u),_=d.length>0?Ve(n,e):e;$(n.eventQueue_,_,d),kn(n,i,c,h)}),L(t,c=>{const h=ci(n,N(e,c));Ve(n,h)}),$(n.eventQueue_,e,[])}}function _c(n){mt(n,"onDisconnectEvents");const e=tn(n),t=Rt();Cn(n.onDisconnect_,w(),(s,r)=>{const o=lr(s,r,n.serverSyncTree_,e);Gs(t,s,o)});let i=[];Cn(t,w(),(s,r)=>{i=i.concat(_t(n.serverSyncTree_,s,r));const o=ci(n,s);Ve(n,o)}),n.onDisconnect_=Rt(),$(n.eventQueue_,w(),i)}function pc(n,e,t){let i;v(e._path)===".info"?i=Tn(n.infoSyncTree_,e,t):i=Tn(n.serverSyncTree_,e,t),pr(n.eventQueue_,e._path,i)}function es(n,e,t){let i;v(e._path)===".info"?i=Ft(n.infoSyncTree_,e,t):i=Ft(n.serverSyncTree_,e,t),pr(n.eventQueue_,e._path,i)}function mc(n){n.persistentConnection_&&n.persistentConnection_.interrupt(rc)}function mt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),M(t,...e)}function kn(n,e,t,i){e&&Ke(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function gr(n,e,t){return Xn(n.serverSyncTree_,e,t)||m.EMPTY_NODE}function ai(n,e=n.transactionQueueTree_){if(e||nn(n,e),ze(e)){const t=yr(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&gc(n,pt(e),t)}else hr(e)&&Zt(e,t=>{ai(n,t)})}function gc(n,e,t){const i=t.map(c=>c.currentWriteId),s=gr(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const h=t[c];f(h.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),h.status=1,h.retryCount++;const u=W(e,h.path);r=r.updateChild(u,h.currentOutputSnapshotRaw)}const l=r.val(!0),a=e;n.server_.put(a.toString(),l,c=>{mt(n,"transaction put response",{path:a.toString(),status:c});let h=[];if(c==="ok"){const u=[];for(let d=0;d<t.length;d++)t[d].status=2,h=h.concat(se(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&u.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();nn(n,si(n.transactionQueueTree_,e)),ai(n,n.transactionQueueTree_),$(n.eventQueue_,e,h);for(let d=0;d<u.length;d++)Ke(u[d])}else{if(c==="datastale")for(let u=0;u<t.length;u++)t[u].status===3?t[u].status=4:t[u].status=0;else{U("transaction at "+a.toString()+" failed: "+c);for(let u=0;u<t.length;u++)t[u].status=4,t[u].abortReason=c}Ve(n,e)}},o)}function Ve(n,e){const t=vr(n,e),i=pt(t),s=yr(n,t);return vc(n,s,i),i}function vc(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(l=>l.status===0).map(l=>l.currentWriteId);for(let l=0;l<e.length;l++){const a=e[l],c=W(t,a.path);let h=!1,u;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),a.status===4)h=!0,u=a.abortReason,s=s.concat(se(n.serverSyncTree_,a.currentWriteId,!0));else if(a.status===0)if(a.retryCount>=oc)h=!0,u="maxretry",s=s.concat(se(n.serverSyncTree_,a.currentWriteId,!0));else{const d=gr(n,a.path,o);a.currentInputSnapshot=d;const _=e[l].update(d.val());if(_!==void 0){jt("transaction failed: Data returned ",_,a.path);let p=P(_);typeof _=="object"&&_!=null&&X(_,".priority")||(p=p.updatePriority(d.getPriority()));const F=a.currentWriteId,ke=tn(n),vt=ar(p,d,ke);a.currentOutputSnapshotRaw=p,a.currentOutputSnapshotResolved=vt,a.currentWriteId=li(n),o.splice(o.indexOf(F),1),s=s.concat(nr(n.serverSyncTree_,a.path,vt,a.currentWriteId,a.applyLocally)),s=s.concat(se(n.serverSyncTree_,F,!0))}else h=!0,u="nodata",s=s.concat(se(n.serverSyncTree_,a.currentWriteId,!0))}$(n.eventQueue_,t,s),s=[],h&&(e[l].status=2,function(d){setTimeout(d,Math.floor(0))}(e[l].unwatcher),e[l].onComplete&&(u==="nodata"?i.push(()=>e[l].onComplete(null,!1,e[l].currentInputSnapshot)):i.push(()=>e[l].onComplete(new Error(u),!1,null))))}nn(n,n.transactionQueueTree_);for(let l=0;l<i.length;l++)Ke(i[l]);ai(n,n.transactionQueueTree_)}function vr(n,e){let t,i=n.transactionQueueTree_;for(t=v(e);t!==null&&ze(i)===void 0;)i=si(i,t),e=T(e),t=v(e);return i}function yr(n,e){const t=[];return Cr(n,e,t),t.sort((i,s)=>i.order-s.order),t}function Cr(n,e,t){const i=ze(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);Zt(e,s=>{Cr(n,s,t)})}function nn(n,e){const t=ze(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,cr(e,t.length>0?t:void 0)}Zt(e,i=>{nn(n,i)})}function ci(n,e){const t=pt(vr(n,e)),i=si(n.transactionQueueTree_,e);return Ya(i,s=>{dn(n,s)}),dn(n,i),ur(i,s=>{dn(n,s)}),t}function dn(n,e){const t=ze(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(se(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?cr(e,void 0):t.length=r+1,$(n.eventQueue_,pt(e),s);for(let o=0;o<i.length;o++)Ke(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yc(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Cc(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):U(`Invalid query segment '${t}' in query '${n}'`)}return e}const ts=function(n,e){const t=wc(n),i=t.namespace;t.domain==="firebase.com"&&ie(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&ie("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Ro();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ss(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new I(t.pathString)}},wc=function(n){let e="",t="",i="",s="",r="",o=!0,l="https",a=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(l=n.substring(0,c-1),n=n.substring(c+2));let h=n.indexOf("/");h===-1&&(h=n.length);let u=n.indexOf("?");u===-1&&(u=n.length),e=n.substring(0,Math.min(h,u)),h<u&&(s=yc(n.substring(h,u)));const d=Cc(n.substring(Math.min(n.length,u)));c=e.indexOf(":"),c>=0?(o=l==="https"||l==="wss",a=parseInt(e.substring(c+1),10)):c=e.length;const _=e.slice(0,c);if(_.toLowerCase()==="localhost")t="localhost";else if(_.split(".").length<=2)t=_;else{const p=e.indexOf(".");i=e.substring(0,p).toLowerCase(),t=e.substring(p+1),r=i}"ns"in d&&(r=d.ns)}return{host:e,port:a,domain:t,subdomain:i,secure:o,scheme:l,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wr{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+x(this.snapshot.exportVal())}}class Er{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ir{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class hi{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return C(this._path)?null:Fn(this._path)}get ref(){return new B(this._repo,this._path)}get _queryIdentifier(){const e=Vi(this._queryParams),t=Dn(e);return t==="{}"?"default":t}get _queryObject(){return Vi(this._queryParams)}isEqual(e){if(e=$e(e),!(e instanceof hi))return!1;const t=this._repo===e._repo,i=Wn(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+dl(this._path)}}class B extends hi{constructor(e,t){super(e,t,new Hn,!1)}get parent(){const e=Ds(this._path);return e===null?null:new B(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ge{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new I(e),i=Wt(this.ref,e);return new Ge(this._node.getChild(t),i,k)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Ge(s,Wt(this.ref,i),k)))}hasChild(e){const t=new I(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function ve(n,e){return n=$e(n),n._checkNotDeleted("ref"),e!==void 0?Wt(n._root,e):n._root}function Wt(n,e){return n=$e(n),v(n._path)===null?tc("child","path",e,!1):fr("child","path",e,!1),new B(n._repo,N(n._path,e))}function Ec(n){return _r("remove",n._path),Sr(n,null)}function Sr(n,e){n=$e(n),_r("set",n._path),Za("set",e,n._path,!1);const t=new Kt;return dc(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function fn(n,e){ec("update",e,n._path,!1);const t=new Kt;return fc(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Ic(n){n=$e(n);const e=new Ir(()=>{}),t=new sn(e);return uc(n._repo,n,t).then(i=>new Ge(i,new B(n._repo,n._path),n._queryParams.getIndex()))}class sn{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new wr("value",this,new Ge(e.snapshotNode,new B(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Er(this,e,t):null}matches(e){return e instanceof sn?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class ui{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new Er(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const i=Wt(new B(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new wr(e.type,this,new Ge(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof ui?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Sc(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const a=t,c=(h,u)=>{es(n._repo,n,l),a(h,u)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Ir(t,r||void 0),l=e==="value"?new sn(o):new ui(e,o);return pc(n._repo,n,l),()=>es(n._repo,n,l)}function bc(n,e,t,i){return Sc(n,"value",e,t,i)}Sa(B);Ra(B);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Tc="FIREBASE_DATABASE_EMULATOR_HOST",Rn={};let Nc=!1;function kc(n,e,t,i){n.repoInfo_=new Ss(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Rc(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||ie("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),M("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=ts(r,s),l=o.repoInfo,a,c;typeof process<"u"&&Ei&&(c=Ei[Tc]),c?(a=!0,r=`http://${c}?ns=${l.namespace}`,o=ts(r,s),l=o.repoInfo):a=!o.repoInfo.secure;const h=s&&a?new De(De.OWNER):new Vo(n.name,n.options,e);nc("Invalid Firebase Database URL",o),C(o.path)||ie("Database URL must point to the root of a Firebase Database (not including a child path).");const u=xc(l,n,h,new Uo(n.name,t));return new Ac(u,n)}function Pc(n,e){const t=Rn[e];(!t||t[n.key]!==n)&&ie(`Database ${e}(${n.repoInfo_}) has already been deleted.`),mc(n),delete t[n.key]}function xc(n,e,t,i){let s=Rn[e.name];s||(s={},Rn[e.name]=s);let r=s[n.toURLString()];return r&&ie("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new lc(n,Nc,t,i),s[n.toURLString()]=r,r}class Ac{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(ac(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new B(this._repo,w())),this._rootInternal}_delete(){return this._rootInternal!==null&&(Pc(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&ie("Cannot call "+e+" on a deleted database.")}}function Dc(n=ao(),e){const t=oo(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=lo("database");i&&Oc(t,...i)}return t}function Oc(n,e,t,i={}){n=$e(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&ie("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&ie('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new De(De.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:co(i.mockUserToken,n.app.options.projectId);r=new De(o)}kc(s,e,t,r)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Mc(n){So(ho),Jr(new Qr("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Rc(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),pn(Ii,Si,n),pn(Ii,Si,"esm2017")}function ns(n){return{".sv":{increment:n}}}ne.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};ne.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};Mc();class Lc{_db;constructor(){this._db=Dc()}async getChild({childPath:e}){try{const t=ve(this._db,`${envKey}/${e}`);return await Ic(t)}catch(t){throw t}}async updateChild({childPath:e,data:t}){try{const i=ve(this._db,`${envKey}/${e}`);return await fn(i,t),!0}catch{return!1}}async removeChild({childPath:e}){try{const t=ve(this._db,`${envKey}/${e}`);return await Ec(t),!0}catch{return!1}}async incrementNumberChild({childPath:e,valueId:t,delta:i,command:s}){try{s==="decrement"&&(i=-i);const r={[t]:ns(i)},o=ve(this._db,`${envKey}/${e}`);return await fn(o,r),!0}catch{return!1}}async incrementMultipleNumberChild({childPath:e,data:t}){try{const i={};for(const[r,o]of Object.entries(t))i[r]=ns(o);const s=ve(this._db,`${envKey}/${e}`);return await fn(s,i),!0}catch{return!1}}listenToChild({childPath:e,callback:t}){const i=ve(this._db,`${envKey}/${e}`);return bc(i,t)}async setChild({childPath:e,data:t}){try{const i=ve(this._db,`${envKey}/${e}`);return await Sr(i,t),!0}catch{return!1}}}class Fc extends Lc{_firestore;constructor(){super(),this._firestore=qr()}get getBatch(){return $r(this._firestore)}async getDocSRV({path:e,docId:t,insideEnviroments:i=!0}){try{const s=pe(this._firestore,i?`${ge}/${e}`:e),r=me(s,t);return await Kr(r)}catch(s){if(s instanceof Error)throw console.log(s.message),AppErrorsHelper.GI().addError({error:Errors.serverError,details:s.message}),s}}async commmitBatch(e){try{return await e.commit(),!0}catch(t){throw console.error("Error while commit batch -->",t),new Error(`Server Error: ${t}`)}}async runTransaction(e){try{return await Yr(this._firestore,async i=>await e(i))}catch(t){throw console.error("Error while run transaction -->",t),new Error(`Server Error: ${t}`)}}async transactionGet(e,t,i){try{const s=pe(this._firestore,`${ge}/${t}`),r=me(s,i);return await e.get(r)}catch(s){throw console.error("Error while getting document in transaction -->",s),new Error(`Server Error: ${s}`)}}async transactionUpdateAsMap(e,t,i,s,r){try{const o=pe(this._firestore,`${ge}/${t}`),l=me(o,i),a={[s]:r||_i()};e.update(l,a)}catch(o){throw console.error("Error while updating document in transaction -->",o),new Error(`Server Error: ${o}`)}}async transactionUpdateMultipleFieldsAsMap(e,t,i,s,r=!0){try{const o=pe(this._firestore,r?`${ge}/${t}`:t),l=me(o,i),a=this.organizeData(s);e.update(l,a)}catch(o){throw console.error("Error while updating multiple fields in transaction -->",o),new Error(`Server Error: ${o}`)}}async transactionCreateDoc(e,t,i,s){try{const r=pe(this._firestore,`${ge}/${t}`),o=me(r,i);e.set(o,s)}catch(r){throw console.error("Error while creating document in transaction -->",r),new Error(`Server Error: ${r}`)}}async transactionSetAsMap(e,t,i,s){try{const r=pe(this._firestore,`${ge}/${t}`),o=me(r,i),l=this.organizeData(s);e.set(o,l,{merge:!0})}catch(r){throw console.error("Error while setting document as map in transaction -->",r),new Error(`Server Error: ${r}`)}}async updateMultipleFieldsInsideDocAsMap(e,t,i,s,r=!0){try{const o=pe(this._firestore,r?`${ge}/${t}`:t),l=me(o,i);e.update(l,this.organizeData(s))}catch(o){throw console.error("Error while updating the batch -->",o),new Error(`Server Error: ${o}`)}}organizeData(e){var t={};return Object.entries(e).forEach(([i,s])=>{let r=s;r===null&&(r=_i()),r===1&&(r=pi(1)),r===0&&(r=pi(-1)),t[i]=r}),t}get currentTimestamp(){return _n.now()}}class xe extends Fc{constructor(){super()}static instance;static GI(){return xe.instance||(xe.instance=new xe),xe.instance}async getDocRepo({path:e,docId:t,insideEnviroments:i=!0}){return await super.getDocSRV({path:e,docId:t,insideEnviroments:i})}}class gt{code="";name="";symbol="";constructor({code:e="",name:t="",symbol:i=""}={}){this.code=e,this.name=t,this.symbol=i}static fromJson(e){return new gt({code:e.code||"",name:e.name||"",symbol:e.symbol||""})}toJson(){return{code:this.code,name:this.name,symbol:this.symbol}}isEqual(e){return e.code===this.code}toString(){return JSON.stringify(this.toJson(),null,2)}}const br=new gt({code:"USD",name:"US Dollar",symbol:"$"}),Wc=5;class Uc{static currentBusinesssId="";static hasPaddingFromTop=!1;static paddingFromTop=0;static attemptsLeftForCardPassword=Wc;static productionVersion=!0}class ee{background=0;primary=0;surface=0;inverseSurface=0;tertiary=0;id="";fontName="";themeName="";constructor({background:e=0,primary:t=0,surface:i=0,inverseSurface:s=0,tertiary:r=0,id:o,fontName:l="",themeName:a=""}){this.background=e,this.primary=t,this.surface=i,this.inverseSurface=s,this.tertiary=r,this.id=o,this.fontName=l,this.themeName=a}static fromJson(e,t){return new ee({background:e.background||0,primary:e.primary||0,id:t,themeName:e.themeName||"",surface:e.surface||0,tertiary:e.tertiary||0,inverseSurface:e.inverseSurface||0,fontName:e.fontName||""})}static fromBusinessTheme(e){return new ee({themeName:e.themeName,background:e.background,primary:e.primary,tertiary:e.tertiary,id:e.id,surface:e.surface,inverseSurface:e.inverseSurface,fontName:e.fontName})}isEqual(e,t=!0){const i=e.toJson();t&&(i.id=e.id);const s=this.toJson();return t&&(s.id=this.id),JSON.stringify(i)===JSON.stringify(s)}toJson(){const e={};return this.fontName!==""&&(e.fontName=this.fontName),this.surface!==0&&(e.surface=this.surface),this.inverseSurface!==0&&(e.inverseSurface=this.inverseSurface),e.tertiary=this.tertiary,e.themeName=this.themeName,this.background!==0&&(e.background=this.background),this.primary!==0&&(e.primary=this.primary),e}}var Z=(n=>(n[n.Grid=0]="Grid",n[n.Carousel=1]="Carousel",n[n.EndlessCarousel=2]="EndlessCarousel",n))(Z||{});const is={0:"grid",1:"carousel",2:"endlessCarousel"},ss={grid:0,carousel:1,endlessCarousel:2},Vc={dark:new ee({fontName:"Varela Round",themeName:"Original",id:"dark",inverseSurface:4279637532,background:4280229673,surface:4280690225,tertiary:4279834916,primary:4294940672}),darkIos:new ee({fontName:"Varela Round",themeName:"Dark",id:"darkIos",inverseSurface:4281084974,background:4279637528,surface:4280361252,tertiary:4278190080,primary:4278225100}),light:new ee({fontName:"Varela Round",themeName:"Pink",id:"light",inverseSurface:4294831859,background:4294375158,surface:4294967295,tertiary:4294243315,primary:4294936498}),lightIos:new ee({fontName:"Varela Round",themeName:"Light",id:"lightIos",inverseSurface:4292664541,background:4294111991,surface:4294967295,tertiary:4293322471,primary:4278221567})};class te{id="";token="";constructor(e){e&&(this.id=e.I||"",this.token=e.T||"")}static fromShopIconUrl(e){const t=new te;try{const i=e.split("SHOPICON");t.id=i[1].split("?alt")[0];const s=e.split("&token=");return t.token=s[1],t}catch{return new te}}static fromJson(e){const t=new te;return t.id=e.I||"",t.token=e.T||"",t}static fromJsonStr(e){const t=JSON.parse(e),i=new te;return i.id=t.I||"",i.token=t.T||"",i}get isEmpty(){return this.token===""||this.id===""}get isNotEmpty(){return this.token!==""&&this.id!==""}isEqual(e){return e.id==this.id&&e.token==this.token}getShopIconPath(e){return this.token===""||this.id===""?"":`https://firebasestorage.googleapis.com/v0/b/managementsystemapp-c1fda.appspot.com/o/enviroments%2F${envKey.replace("enviroments/","")}%2F${e}%2Fimages%2Flogos%2FSHOPICON${this.id}?alt=media&token=${this.token}`}toJsonStr(){const e={I:this.id,T:this.token};return JSON.stringify(e)}toJson(){return{I:this.id,T:this.token}}}class di{amount=0;currency=br;constructor(e,t){const i=parseFloat(e)||0;this.amount=parseFloat(i.toFixed(2)),this.currency=t}static fromJson(e){const t=new di("0.0",gt.fromJson(e.currency));return e.amount!=null&&(t.amount=typeof e.amount=="number"?e.amount:parseFloat(e.amount)),t}add(e){e.currency.code===this.currency.code&&(this.amount+=e.amount)}isEqual(e){return this.amount===e.amount&&this.currency.code===e.currency.code}toString(){return new Intl.NumberFormat("en-US",{style:"currency",currency:this.currency.code}).format(this.amount)}toJson(){return{amount:this.amount,currency:this.currency.toJson()}}}class He{description="";price;imageUrl="";id="";name="";createdAt=new Date;constructor({name:e="",description:t="",id:i="",price:s,imageUrl:r=""}={}){this.name=e||"",this.description=t||"",this.id=i||"",this.price=s,this.imageUrl=r||""}static fromProduct(e){const t=new He({id:e.id,description:e.description,price:e.price,imageUrl:e.imageUrl,name:e.name});return t.createdAt=e.createdAt,t}static fromJson(e,t){const i=new He({id:t,description:e.description,price:di.fromJson(e.price),imageUrl:e.imageUrl,name:e.name});return i.createdAt=e.createdAt,i}toJson(){return{description:this.description,price:this.price?this.price.toJson():null,imageUrl:this.imageUrl,name:this.name,createdAt:this.createdAt}}toString(){return JSON.stringify(this.toJson())}}class qe{title="";content="";lastModified="";index="";id="";popOnEnter=!1;constructor(e,t,i,s,r,o=!1){this.title=e,this.content=t,this.id=i,this.lastModified=s,this.index=r,this.popOnEnter=o}static fromJson(e,t){return new qe(e.title??"",e.content??"",e.id??"",e.lastModified??"",t,e.popOnEnter??!1)}static fromUpdate(e){return new qe(e.title,e.content,e.id,e.lastModified,e.index,e.popOnEnter)}toJson(){const e={};return e.title=this.title,e.id=this.id,e.content=this.content,this.lastModified!==""&&(e.lastModified=this.lastModified),this.popOnEnter&&(e.popOnEnter=this.popOnEnter),e}isValid(){return this.title!==""&&this.content!==""}toString(){return JSON.stringify(this,null,2)}}class re{storyView=Z.Grid;productView=Z.Grid;changingImages=[];products={};updates={};storyTitle="";shopIconUrl="";productsTitle="";bottomIcons=!1;changingImagesSwapSeconds=6;pickedThemeKey="darkIos";lastTimeToUpdateTerm=new Date(0);businessThemes={};term="";mustConfirmTerm=!1;popTermOnFirstEneter=!1;isPrivateTheme=!1;constructor({storyView:e=Z.Grid,productView:t=Z.Grid,changingImagesSwapSeconds:i=6,shopIconUrl:s="",pickedThemeKey:r="darkIos"}={}){this.changingImagesSwapSeconds=i,this.shopIconUrl=s,this.pickedThemeKey=r}static fromJson(e){const t=new re;return Object.entries(e.products).forEach(([i,s])=>{t.products[i]=He.fromJson(s,i)}),e.changingImages&&(t.changingImages=e.changingImages.map(i=>i)),e.updates&&Object.entries(e.updates).forEach(([i,s])=>{t.updates[i]=qe.fromJson(s,i)}),e.storyView&&(t.storyView=ss[e.storyView]||Z.EndlessCarousel),e.productView&&(t.productView=ss[e.productView]||Z.Grid),e.businessThemes&&Object.entries(e.businessThemes).forEach(([i,s])=>{t.businessThemes[i]=ee.fromJson(s,i)}),e.lastTimeToUpdateTerm&&(t.lastTimeToUpdateTerm=new Date(e.lastTimeToUpdateTerm)||new Date(0)),t.pickedThemeKey=e.pickedThemeKey||"darkIoss",t.term=e.term||"",t.bottomIcons=e.bottomIcons||!1,t.changingImagesSwapSeconds=e.changingImagesSwapSeconds||6,t.productsTitle=e.productsTitle||"",t.storyTitle=e.storyTitle||"",t.shopIconUrl=e.shopIcon||"",t.mustConfirmTerm=e.mustConfirmTerm||!1,t.popTermOnFirstEneter=e.popTermOnFirstEneter||!1,t.isPrivateTheme=e.isPrivateTheme||!1,t}get shopIconData(){return te.fromShopIconUrl(this.shopIconUrl)}static fromBusinessDesign(e){const t=new re;return Object.entries(e.products).forEach(([i,s])=>{t.products[i]=He.fromProduct(s)}),t.changingImages=[...e.changingImages],Object.entries(e.updates).forEach(([i,s])=>{t.updates[i]=qe.fromUpdate(s)}),t.storyView=e.storyView,Object.entries(e.businessThemes).forEach(([i,s])=>{t.businessThemes[i]=ee.fromBusinessTheme(s)}),t.shopIconUrl=e.shopIconUrl,t.pickedThemeKey=e.pickedThemeKey,t.lastTimeToUpdateTerm=e.lastTimeToUpdateTerm,t.changingImagesSwapSeconds=e.changingImagesSwapSeconds,t.term=e.term,t.bottomIcons=e.bottomIcons,t.productsTitle=e.productsTitle,t.productView=e.productView,t.storyTitle=e.storyTitle,t.mustConfirmTerm=e.mustConfirmTerm,t.popTermOnFirstEneter=e.popTermOnFirstEneter,t.isPrivateTheme=e.isPrivateTheme,t}toJson(){const e={};return this.storyView!==Z.EndlessCarousel&&(e.storyView=is[this.storyView]),this.productView!==Z.Grid&&(e.productView=is[this.storyView]),e.changingImages=this.changingImages,e.products={},Object.entries(this.products).forEach(([t,i])=>{e.products[t]=i.toJson()}),e.updates={},Object.entries(this.updates).forEach(([t,i])=>{e.updates[t]=i.toJson()}),this.mustConfirmTerm&&(e.mustConfirmTerm=this.mustConfirmTerm),this.popTermOnFirstEneter&&(e.popTermOnFirstEneter=this.popTermOnFirstEneter),this.term!==""&&(e.term=this.term),this.lastTimeToUpdateTerm!==new Date(0)&&(e.lastTimeToUpdateTerm=this.lastTimeToUpdateTerm.toISOString()),e.bottomIcons=this.bottomIcons,e.changingImagesSwapSeconds=this.changingImagesSwapSeconds,e.storyTitle=this.storyTitle,e.productsTitle=this.productsTitle,e.businessThemes={},Object.entries(this.businessThemes).forEach(([t,i])=>{Vc.hasOwnProperty(t)||(e.businessThemes[t]=i.toJson())}),e.pickedThemeKey=this.pickedThemeKey,e.shopIcon=this.shopIconUrl,e.isPrivateTheme=this.isPrivateTheme,e}}class Ut{businessId="";shopIcon=new te;businessName="";constructor({businessId:e="",businessName:t="",shopIcon:i=new te}={}){this.businessId=e,this.shopIcon=i,this.businessName=t}static empty(){return new Ut}static fromJsonStr(e){const t=JSON.parse(e),i=Ut.empty();return i.businessId=t.businessId,i.businessName=t.businessName,t.shopIcon&&(i.shopIcon=te.fromJsonStr(t.shopIcon)),i}toJsonStr(){const e={businessId:this.businessId,shopIcon:this.shopIcon.toJsonStr(),businessName:this.businessName};return JSON.stringify(e)}}var Pn=(n=>(n[n.Barber=0]="Barber",n[n.Polish=1]="Polish",n[n.Beautician=2]="Beautician",n[n.ManicurePedicure=3]="ManicurePedicure",n[n.Eyelashes=4]="Eyelashes",n[n.Eyebrows=5]="Eyebrows",n[n.Braids=6]="Braids",n[n.MakeUpArtist=7]="MakeUpArtist",n[n.TattooArtist=8]="TattooArtist",n[n.HairRemoval=9]="HairRemoval",n[n.Masseur=10]="Masseur",n[n.Physiotherapy=11]="Physiotherapy",n[n.Cobblers=12]="Cobblers",n[n.Clown=13]="Clown",n[n.SocialWorker=14]="SocialWorker",n[n.Magician=15]="Magician",n[n.Doctor=16]="Doctor",n[n.Veterinarian=17]="Veterinarian",n[n.CommunicationTherapist=18]="CommunicationTherapist",n[n.DogGroomer=19]="DogGroomer",n[n.DJ=20]="DJ",n[n.Psychologist=21]="Psychologist",n[n.Tutor=22]="Tutor",n[n.WeddingDresses=23]="WeddingDresses",n[n.DanceTeacher=24]="DanceTeacher",n[n.Babysitter=25]="Babysitter",n[n.Reflexologist=26]="Reflexologist",n[n.Dietitian=27]="Dietitian",n[n.CarWash=28]="CarWash",n[n.Photographer=29]="Photographer",n[n.SwimmingTeacher=30]="SwimmingTeacher",n[n.Counselor=31]="Counselor",n[n.Mentor=32]="Mentor",n[n.TennisCoach=33]="TennisCoach",n[n.PrivateChef=34]="PrivateChef",n[n.PersonalTrainer=35]="PersonalTrainer",n[n.Lawyer=36]="Lawyer",n[n.Sales=37]="Sales",n[n.RealEstate=38]="RealEstate",n[n.DrivingTeacher=39]="DrivingTeacher",n[n.InvestmentAdvice=40]="InvestmentAdvice",n[n.Library=41]="Library",n[n.Tailor=42]="Tailor",n[n.Restaurant=43]="Restaurant",n[n.NailConstruction=44]="NailConstruction",n[n.Dentist=45]="Dentist",n[n.BeautysSalon=46]="BeautysSalon",n[n.Washer=47]="Washer",n[n.CleaningSofas=48]="CleaningSofas",n[n.Other=49]="Other",n))(Pn||{});const Gc={barber:0,cleaningSofas:48,polish:1,beautician:2,manicurePedicure:3,eyelashes:4,eyebrows:5,babysitter:25,braids:6,makeUpArtist:7,tattooArtist:8,hairRemoval:9,masseur:10,cobblers:12,clown:13,socialWorker:14,magician:15,doctor:16,veterinarian:17,communicationTherapist:18,dogGroomer:19,psychologist:21,physiotherapy:11,Tutor:22,weddingDresses:23,danceTeacher:24,reflexologist:26,dietitian:27,carWash:28,photographer:29,swimmingTeacher:30,counselor:31,mentor:32,dj:20,tennisCoach:33,privateChef:34,personalTrainer:35,lawyer:36,sales:37,realEstate:38,drivingTeacher:39,investmentAdvice:40,library:41,other:49,restaurant:43,tailor:42,nailConstruction:44,dentist:45,beautysSalon:46,washer:47},Hc={noPayNoPayment:0,noPayNoPaymentWithReceipts:1,pay100For30WithReceipts:2,pay70For700Actiions:3},qc=15,$c=20,Kc={simpletor_golden_business_month_1:1e3,simpletor_advanced_business_month_1:200,simpletor_basic_business_month_1:0,simpletor_landing_business_month_1:0},Yc={simpletor_golden_business_month_1:100,simpletor_advanced_business_month_1:20,simpletor_basic_business_month_1:10,simpletor_landing_business_month_1:10};class Vt{messagesCounter=0;paymentRequestCounter=0;constructor(e=0,t=0){this.messagesCounter=e,this.paymentRequestCounter=t}static forNewBusiness(){return new Vt($c,qc)}static fromProductId(e){return new Vt(Kc[e]||0,Yc[e]||0)}setBusinessData(e){this.messagesCounter=parseInt(e.child("messagesCounter").value.toString())||0,this.paymentRequestCounter=parseInt(e.child("paymentRequestCounter").value.toString())||0}toJson(){const e={};return e.messagesCounter=this.messagesCounter,e.paymentRequestCounter=this.paymentRequestCounter,e}}class ct{businesseType=Pn.Other;currency=br;notifyOnNewCustomer=!0;searchable=!0;billingIssue={};isLandingPageMode=!1;allWorkersIds={};workersIds={};hypPath;expiredDate=new Date;shopPhone="";ownersName="";companyNumber="";ownersPhone="";masofNumber="";previewDoc="";instagramAccount="";revenueCatId="";pendingWorkersProductsId="";adress="";workersProductsId="";pendingProductId="";dynamicLink="";shopName="";productId="";businessId="";createdAt=new Date;blockedUsersTemp={};lastTimeConnected=new Date;businessData=new Vt;design=new re;constructor({shopName:e="",businessId:t,productId:i="",adress:s="",dynamicLink:r="",revenueCatId:o="",ownersName:l="",instagramAccount:a="",shopPhone:c="",design:h}){this.shopName=e,this.businessId=t,this.productId=i,this.adress=s,this.dynamicLink=r,this.revenueCatId=o,this.ownersName=l,this.instagramAccount=a,this.shopPhone=c,this.design=h}static empty(){return new ct({design:new re,businessId:""})}get businessPayLoadData(){return new Ut({businessId:this.businessId,businessName:this.shopName,shopIcon:this.design.shopIconData})}static fromJson(e,t){const i=new ct({businessId:t,design:new re});return i.setData(e,t),i}setData(e,t){if(this.businessId=t,e.currency!=null&&(this.currency=gt.fromJson(e.currency)),e.design!=null)this.design=re.fromJson(e.design);else{const s=e.theme;this.design.pickedThemeKey=s,Object.entries(e.products).forEach(([r,o])=>{this.design.products[r]=He.fromJson(o,r)}),e.changingImages!=null&&(this.design.changingImages=e.changingImages.map(r=>r)),e.updates!=null&&e.updates.forEach((r,o)=>{this.design.updates[o.toString()]=qe.fromJson(r,o.toString())}),this.design.bottomIcons=e.bottomIcons??!1,this.design.storyTitle=e.storyTitle??"",this.design.changingImagesSwapSeconds=e.changingImagesSwapSeconds??6,this.design.shopIconUrl=e.shopIcon??""}this.previewDoc=e.previewDoc??"",this.workersProductsId=e.workersProductsId??"",this.pendingWorkersProductsId=e.pendingWorkersProductsId??"",this.shopName=e.shopName??"",this.isLandingPageMode=e.isLandingPageMode??!1,this.searchable=e.searchable??!0,e.expiredDate!=null&&(this.expiredDate=new Date(e.expiredDate)),this.notifyOnNewCustomer=e.notifyOnNewCustomer??!0,this.companyNumber=e.companyNumber??"",e.hypPath!=null&&(this.hypPath=Hc[e.hypPath]),this.allWorkersIds={},e.allWorkersIds!=null&&Object.entries(e.allWorkersIds).forEach(([s,r])=>{this.allWorkersIds[s]=r});const i=this.businessId.split("--")[0];this.allWorkersIds.hasOwnProperty("+"+i)||(this.allWorkersIds["+"+i]=""),this.workersIds={},e.workersIds!=null&&Object.entries(e.workersIds).forEach(([s,r])=>{this.workersIds[s]=r}),this.workersIds.hasOwnProperty(i)||(this.workersIds[i]=""),this.dynamicLink=e.dynamicLink??"",this.masofNumber=e.masofNumber??"",this.ownersName=e.ownersName??"",this.revenueCatId=e.revenueCatId??"",this.productId=e.productId??"",this.pendingProductId=e.pendingProductId??"",this.businesseType=Gc[e.businesseType]??Pn.Other,this.instagramAccount=e.instagramAccount??"",this.adress=e.adress??"",this.shopPhone=e.shopPhone??"";try{e.billingIssue!=null&&Object.entries(e.billingIssue).forEach(([s,r])=>{this.billingIssue[s]=r.toDate()})}catch{}e.createdAt instanceof _n?this.createdAt=e.createdAt.toDate():typeof e.createdAt=="string"&&(this.createdAt=new Date(e.createdAt)||new Date),e.lastTimeConnected!=null&&(this.lastTimeConnected=new Date(e.lastTimeConnected)||new Date)}toJson(){const e={};return e.notifyOnNewCustomer=this.notifyOnNewCustomer,e.currency=this.currency.toJson(),e.searchable=this.searchable,e.workersProductsId=this.workersProductsId,e.pendingWorkersProductsId=this.pendingWorkersProductsId,e.previewDoc=this.previewDoc,e.masofNumber=this.masofNumber,e.revenueCatId=this.revenueCatId,e.pendingProductId=this.pendingProductId,e.productId=this.productId,e.shopName=this.shopName,this.hypPath&&(e.hypPath=this.hypPath),Object.keys(this.billingIssue).length>0&&(e.billingIssue={},Object.entries(this.billingIssue).forEach(([t,i])=>{e.billingIssue[t]=_n.fromDate(i)})),this.dynamicLink!==""&&(e.dynamicLink=this.dynamicLink),e.companyNumber=this.companyNumber,e.expiredDate=this.expiredDate,e.businesseType=this.businesseType,e.ownersName=this.ownersName,e.instagramAccount=this.instagramAccount,e.adress=this.adress,e.shopPhone=this.shopPhone,e.workersIds=this.workersIds,e.createdAt=this.createdAt,e.lastTimeConnected=this.lastTimeConnected,this.isLandingPageMode&&(e.isLandingPageMode=this.isLandingPageMode),e.design=this.design.toJson(),e}toString(){return JSON.stringify(this.toJson())}}class we{static instance;constructor(){}static GI(){return we.instance||(we.instance=new we),we.instance}generalRepo=xe.GI();business=new ct({businessId:"",design:new re});workers={};async initSettings(e,{fromLoading:t=!1}={}){try{this.workers={},Uc.currentBusinesssId=e;const i=await Promise.all([this._loadSettingsDoc(e)]);return!0}catch{return!1}}async loadBusiness(e,t,{fromLoading:i=!1,fromSearch:s=!1}={}){try{const r=await this.initSettings(e,{fromLoading:i});return!0}catch{return!1}}async _loadSettingsDoc(e){try{const t=await this.generalRepo.getDocRepo({path:Io,docId:e});return t===void 0||!t.exists||t.data()===null?(AppErrorsHelper.GI().error=Errors.notFoundBusiness,!1):(this.business=ct.fromJson(t.data(),e),!0)}catch{return!1}}}var zc="firebase",Jc="10.7.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */pn(zc,Jc,"app");function Qc(n){return{c:G,l:G,m:G,p:G,i:G,o:G,d:G}}function Xc(n){let e;const t=n[2].default,i=xr(t,n,n[1],null);return{c(){i&&i.c()},l(s){i&&i.l(s)},m(s,r){i&&i.m(s,r),e=!0},p(s,r){i&&i.p&&(!e||r&2)&&Ar(i,t,s,s[1],e?Or(t,s[1],r,null):Dr(s[1]),null)},i(s){e||(It(i,s),e=!0)},o(s){Et(i,s),e=!1},d(s){i&&i.d(s)}}}function Bc(n){let e,t='<h1 class="text-4xl text-white">Loading Business</h1> <div class="loading loading-spinner loading-lg bg-white"></div>';return{c(){e=J("div"),e.innerHTML=t,this.h()},l(i){e=Q(i,"DIV",{class:!0,"data-svelte-h":!0}),Mr(e)!=="svelte-1ws00so"&&(e.innerHTML=t),this.h()},h(){g(e,"class","h-full w-full flex flex-col items-center justify-center gap-8 bg-black")},m(i,s){H(i,e,s)},p:G,i:G,o:G,d(i){i&&E(e)}}}function Zc(n){let e,t,i,s;e=new Co({});let r={ctx:n,current:null,token:null,hasCatch:!1,pending:Bc,then:Xc,catch:Qc,value:5,blocks:[,,,]};return po(n[0],r),{c(){Wr(e.$$.fragment),t=oe(),i=J("div"),r.block.c(),this.h()},l(o){Ur(e.$$.fragment,o),t=le(o),i=Q(o,"DIV",{class:!0});var l=O(i);r.block.l(l),l.forEach(E),this.h()},h(){g(i,"class","h-screen w-screen")},m(o,l){Vr(e,o,l),H(o,t,l),H(o,i,l),r.block.m(i,r.anchor=null),r.mount=()=>i,r.anchor=null,s=!0},p(o,[l]){n=o,mo(r,n,l)},i(o){s||(It(e.$$.fragment,o),It(r.block),s=!0)},o(o){Et(e.$$.fragment,o);for(let l=0;l<3;l+=1){const a=r.blocks[l];Et(a)}s=!1},d(o){o&&(E(t),E(i)),Gr(e,o),r.block.d(),r.token=null,r=null}}}function jc(n,e,t){let i;Pr(n,_o,a=>t(3,i=a));let{$$slots:s={},$$scope:r}=e;async function o(){let a=i.data.businessID||"972-525656377--857e6680-b863-11ed-89a5-05ff99923d7e";if(a==null)return;fo(wo),await we.GI().loadBusiness(a,"");const c=we.GI().business;console.log(c),zr.set(c)}let l=o();return n.$$set=a=>{"$$scope"in a&&t(1,r=a.$$scope)},[l,r,s]}class lh extends os{constructor(e){super(),ls(this,e,jc,Zc,rs,{})}}export{lh as component,oh as universal};
