import{w as T_}from"./index.5OULvqcs.js";var Ml={};/**
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
 */const vu={NODE_CLIENT:!1,NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
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
 */const g=function(n,e){if(!n)throw wn(e)},wn=function(n){return new Error("Firebase Database ("+vu.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
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
 */const Eu=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):(i&64512)===55296&&s+1<n.length&&(n.charCodeAt(s+1)&64512)===56320?(i=65536+((i&1023)<<10)+(n.charCodeAt(++s)&1023),e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},I_=function(n){const e=[];let t=0,s=0;for(;t<n.length;){const i=n[t++];if(i<128)e[s++]=String.fromCharCode(i);else if(i>191&&i<224){const r=n[t++];e[s++]=String.fromCharCode((i&31)<<6|r&63)}else if(i>239&&i<365){const r=n[t++],o=n[t++],a=n[t++],l=((i&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[s++]=String.fromCharCode(55296+(l>>10)),e[s++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[s++]=String.fromCharCode((i&15)<<12|(r&63)<<6|o&63)}}return e.join("")},Yo={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,s=[];for(let i=0;i<n.length;i+=3){const r=n[i],o=i+1<n.length,a=o?n[i+1]:0,l=i+2<n.length,c=l?n[i+2]:0,u=r>>2,h=(r&3)<<4|a>>4;let d=(a&15)<<2|c>>6,f=c&63;l||(f=64,o||(d=64)),s.push(t[u],t[h],t[d],t[f])}return s.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Eu(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):I_(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,s=[];for(let i=0;i<n.length;){const r=t[n.charAt(i++)],a=i<n.length?t[n.charAt(i)]:0;++i;const c=i<n.length?t[n.charAt(i)]:64;++i;const h=i<n.length?t[n.charAt(i)]:64;if(++i,r==null||a==null||c==null||h==null)throw new w_;const d=r<<2|a>>4;if(s.push(d),c!==64){const f=a<<4&240|c>>2;if(s.push(f),h!==64){const m=c<<6&192|h;s.push(m)}}}return s},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class w_ extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const Tu=function(n){const e=Eu(n);return Yo.encodeByteArray(e,!0)},pi=function(n){return Tu(n).replace(/\./g,"")},ro=function(n){try{return Yo.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
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
 */function C_(n){return Iu(void 0,n)}function Iu(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!A_(t)||(n[t]=Iu(n[t],e[t]));return n}function A_(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
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
 */function R_(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
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
 */const S_=()=>R_().__FIREBASE_DEFAULTS__,P_=()=>{if(typeof process>"u"||typeof Ml>"u")return;const n=Ml.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},N_=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&ro(n[1]);return e&&JSON.parse(e)},Xo=()=>{try{return S_()||P_()||N_()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},b_=n=>{var e,t;return(t=(e=Xo())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},wu=n=>{const e=b_(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const s=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),s]:[e.substring(0,t),s]},Cu=()=>{var n;return(n=Xo())===null||n===void 0?void 0:n.config},uw=n=>{var e;return(e=Xo())===null||e===void 0?void 0:e[`_${n}`]};/**
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
 */class Ps{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,s)=>{t?this.reject(t):this.resolve(s),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,s))}}}/**
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
 */function Au(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},s=e||"demo-project",i=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${s}`,aud:s,iat:i,exp:i+3600,auth_time:i,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[pi(JSON.stringify(t)),pi(JSON.stringify(o)),""].join(".")}/**
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
 */function Ru(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Su(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Ru())}function hw(){const n=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof n=="object"&&n.id!==void 0}function D_(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function dw(){const n=Ru();return n.indexOf("MSIE ")>=0||n.indexOf("Trident/")>=0}function Pu(){return vu.NODE_ADMIN===!0}function k_(){try{return typeof indexedDB=="object"}catch{return!1}}function V_(){return new Promise((n,e)=>{try{let t=!0;const s="validate-browser-context-for-indexeddb-analytics-module",i=self.indexedDB.open(s);i.onsuccess=()=>{i.result.close(),t||self.indexedDB.deleteDatabase(s),n(!0)},i.onupgradeneeded=()=>{t=!1},i.onerror=()=>{var r;e(((r=i.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
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
 */const x_="FirebaseError";class Cn extends Error{constructor(e,t,s){super(t),this.code=e,this.customData=s,this.name=x_,Object.setPrototypeOf(this,Cn.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,Nu.prototype.create)}}class Nu{constructor(e,t,s){this.service=e,this.serviceName=t,this.errors=s}create(e,...t){const s=t[0]||{},i=`${this.service}/${e}`,r=this.errors[e],o=r?M_(r,s):"Error",a=`${this.serviceName}: ${o} (${i}).`;return new Cn(i,a,s)}}function M_(n,e){return n.replace(O_,(t,s)=>{const i=e[s];return i!=null?String(i):`<${s}?>`})}const O_=/\{\$([^}]+)}/g;/**
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
 */function ss(n){return JSON.parse(n)}function Z(n){return JSON.stringify(n)}/**
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
 */const bu=function(n){let e={},t={},s={},i="";try{const r=n.split(".");e=ss(ro(r[0])||""),t=ss(ro(r[1])||""),i=r[2],s=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:s,signature:i}},L_=function(n){const e=bu(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},F_=function(n){const e=bu(n).claims;return typeof e=="object"&&e.admin===!0};/**
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
 */function He(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function on(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function Ol(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function mi(n,e,t){const s={};for(const i in n)Object.prototype.hasOwnProperty.call(n,i)&&(s[i]=e.call(t,n[i],i,n));return s}function oo(n,e){if(n===e)return!0;const t=Object.keys(n),s=Object.keys(e);for(const i of t){if(!s.includes(i))return!1;const r=n[i],o=e[i];if(Ll(r)&&Ll(o)){if(!oo(r,o))return!1}else if(r!==o)return!1}for(const i of s)if(!t.includes(i))return!1;return!0}function Ll(n){return n!==null&&typeof n=="object"}/**
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
 */function U_(n){const e=[];for(const[t,s]of Object.entries(n))Array.isArray(s)?s.forEach(i=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(i))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(s));return e.length?"&"+e.join("&"):""}/**
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
 */class B_{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const s=this.W_;if(typeof e=="string")for(let h=0;h<16;h++)s[h]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let h=0;h<16;h++)s[h]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let h=16;h<80;h++){const d=s[h-3]^s[h-8]^s[h-14]^s[h-16];s[h]=(d<<1|d>>>31)&4294967295}let i=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let h=0;h<80;h++){h<40?h<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):h<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const d=(i<<5|i>>>27)+c+l+u+s[h]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=i,i=d}this.chain_[0]=this.chain_[0]+i&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const s=t-this.blockSize;let i=0;const r=this.buf_;let o=this.inbuf_;for(;i<t;){if(o===0)for(;i<=s;)this.compress_(e,i),i+=this.blockSize;if(typeof e=="string"){for(;i<t;)if(r[o]=e.charCodeAt(i),++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}else for(;i<t;)if(r[o]=e[i],++o,++i,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let i=this.blockSize-1;i>=56;i--)this.buf_[i]=t&255,t/=256;this.compress_(this.buf_);let s=0;for(let i=0;i<5;i++)for(let r=24;r>=0;r-=8)e[s]=this.chain_[i]>>r&255,++s;return e}}function fw(n,e){const t=new q_(n,e);return t.subscribe.bind(t)}class q_{constructor(e,t){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=t,this.task.then(()=>{e(this)}).catch(s=>{this.error(s)})}next(e){this.forEachObserver(t=>{t.next(e)})}error(e){this.forEachObserver(t=>{t.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,t,s){let i;if(e===void 0&&t===void 0&&s===void 0)throw new Error("Missing Observer.");W_(e,["next","error","complete"])?i=e:i={next:e,error:t,complete:s},i.next===void 0&&(i.next=Or),i.error===void 0&&(i.error=Or),i.complete===void 0&&(i.complete=Or);const r=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?i.error(this.finalError):i.complete()}catch{}}),this.observers.push(i),r}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let t=0;t<this.observers.length;t++)this.sendOne(t,e)}sendOne(e,t){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{t(this.observers[e])}catch(s){typeof console<"u"&&console.error&&console.error(s)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}}function W_(n,e){if(typeof n!="object"||n===null)return!1;for(const t of e)if(t in n&&typeof n[t]=="function")return!0;return!1}function Or(){}function Hi(n,e){return`${n} failed: ${e} argument `}/**
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
 */const j_=function(n){const e=[];let t=0;for(let s=0;s<n.length;s++){let i=n.charCodeAt(s);if(i>=55296&&i<=56319){const r=i-55296;s++,g(s<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(s)-56320;i=65536+(r<<10)+o}i<128?e[t++]=i:i<2048?(e[t++]=i>>6|192,e[t++]=i&63|128):i<65536?(e[t++]=i>>12|224,e[t++]=i>>6&63|128,e[t++]=i&63|128):(e[t++]=i>>18|240,e[t++]=i>>12&63|128,e[t++]=i>>6&63|128,e[t++]=i&63|128)}return e},Ki=function(n){let e=0;for(let t=0;t<n.length;t++){const s=n.charCodeAt(t);s<128?e++:s<2048?e+=2:s>=55296&&s<=56319?(e+=4,t++):e+=3}return e};/**
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
 */function _e(n){return n&&n._delegate?n._delegate:n}class an{constructor(e,t,s){this.name=e,this.instanceFactory=t,this.type=s,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
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
 */const Tt="[DEFAULT]";/**
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
 */class z_{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const s=new Ps;if(this.instancesDeferred.set(t,s),this.isInitialized(t)||this.shouldAutoInitialize())try{const i=this.getOrInitializeService({instanceIdentifier:t});i&&s.resolve(i)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const s=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),i=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(s)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:s})}catch(r){if(i)return null;throw r}else{if(i)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(G_(e))try{this.getOrInitializeService({instanceIdentifier:Tt})}catch{}for(const[t,s]of this.instancesDeferred.entries()){const i=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:i});s.resolve(r)}catch{}}}}clearInstance(e=Tt){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=Tt){return this.instances.has(e)}getOptions(e=Tt){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,s=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(s))throw Error(`${this.name}(${s}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const i=this.getOrInitializeService({instanceIdentifier:s,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);s===a&&o.resolve(i)}return i}onInit(e,t){var s;const i=this.normalizeInstanceIdentifier(t),r=(s=this.onInitCallbacks.get(i))!==null&&s!==void 0?s:new Set;r.add(e),this.onInitCallbacks.set(i,r);const o=this.instances.get(i);return o&&e(o,i),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const s=this.onInitCallbacks.get(t);if(s)for(const i of s)try{i(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let s=this.instances.get(e);if(!s&&this.component&&(s=this.component.instanceFactory(this.container,{instanceIdentifier:$_(e),options:t}),this.instances.set(e,s),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(s,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,s)}catch{}return s||null}normalizeInstanceIdentifier(e=Tt){return this.component?this.component.multipleInstances?e:Tt:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function $_(n){return n===Tt?void 0:n}function G_(n){return n.instantiationMode==="EAGER"}/**
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
 */class H_{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new z_(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
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
 */var x;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(x||(x={}));const K_={debug:x.DEBUG,verbose:x.VERBOSE,info:x.INFO,warn:x.WARN,error:x.ERROR,silent:x.SILENT},Q_=x.INFO,Y_={[x.DEBUG]:"log",[x.VERBOSE]:"log",[x.INFO]:"info",[x.WARN]:"warn",[x.ERROR]:"error"},X_=(n,e,...t)=>{if(e<n.logLevel)return;const s=new Date().toISOString(),i=Y_[e];if(i)console[i](`[${s}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class Jo{constructor(e){this.name=e,this._logLevel=Q_,this._logHandler=X_,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in x))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?K_[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,x.DEBUG,...e),this._logHandler(this,x.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,x.VERBOSE,...e),this._logHandler(this,x.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,x.INFO,...e),this._logHandler(this,x.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,x.WARN,...e),this._logHandler(this,x.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,x.ERROR,...e),this._logHandler(this,x.ERROR,...e)}}const J_=(n,e)=>e.some(t=>n instanceof t);let Fl,Ul;function Z_(){return Fl||(Fl=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function ep(){return Ul||(Ul=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const Du=new WeakMap,ao=new WeakMap,ku=new WeakMap,Lr=new WeakMap,Zo=new WeakMap;function tp(n){const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(ot(n.result)),i()},o=()=>{s(n.error),i()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&Du.set(t,n)}).catch(()=>{}),Zo.set(e,n),e}function np(n){if(ao.has(n))return;const e=new Promise((t,s)=>{const i=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),i()},o=()=>{s(n.error||new DOMException("AbortError","AbortError")),i()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});ao.set(n,e)}let lo={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return ao.get(n);if(e==="objectStoreNames")return n.objectStoreNames||ku.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return ot(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function sp(n){lo=n(lo)}function ip(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const s=n.call(Fr(this),e,...t);return ku.set(s,e.sort?e.sort():[e]),ot(s)}:ep().includes(n)?function(...e){return n.apply(Fr(this),e),ot(Du.get(this))}:function(...e){return ot(n.apply(Fr(this),e))}}function rp(n){return typeof n=="function"?ip(n):(n instanceof IDBTransaction&&np(n),J_(n,Z_())?new Proxy(n,lo):n)}function ot(n){if(n instanceof IDBRequest)return tp(n);if(Lr.has(n))return Lr.get(n);const e=rp(n);return e!==n&&(Lr.set(n,e),Zo.set(e,n)),e}const Fr=n=>Zo.get(n);function op(n,e,{blocked:t,upgrade:s,blocking:i,terminated:r}={}){const o=indexedDB.open(n,e),a=ot(o);return s&&o.addEventListener("upgradeneeded",l=>{s(ot(o.result),l.oldVersion,l.newVersion,ot(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),i&&l.addEventListener("versionchange",c=>i(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const ap=["get","getKey","getAll","getAllKeys","count"],lp=["put","add","delete","clear"],Ur=new Map;function Bl(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Ur.get(e))return Ur.get(e);const t=e.replace(/FromIndex$/,""),s=e!==t,i=lp.includes(t);if(!(t in(s?IDBIndex:IDBObjectStore).prototype)||!(i||ap.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,i?"readwrite":"readonly");let c=l.store;return s&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),i&&l.done]))[0]};return Ur.set(e,r),r}sp(n=>({...n,get:(e,t,s)=>Bl(e,t)||n.get(e,t,s),has:(e,t)=>!!Bl(e,t)||n.has(e,t)}));/**
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
 */class cp{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(up(t)){const s=t.getImmediate();return`${s.library}/${s.version}`}else return null}).filter(t=>t).join(" ")}}function up(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const co="@firebase/app",ql="0.9.25";/**
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
 */const bt=new Jo("@firebase/app"),hp="@firebase/app-compat",dp="@firebase/analytics-compat",fp="@firebase/analytics",_p="@firebase/app-check-compat",pp="@firebase/app-check",mp="@firebase/auth",gp="@firebase/auth-compat",yp="@firebase/database",vp="@firebase/database-compat",Ep="@firebase/functions",Tp="@firebase/functions-compat",Ip="@firebase/installations",wp="@firebase/installations-compat",Cp="@firebase/messaging",Ap="@firebase/messaging-compat",Rp="@firebase/performance",Sp="@firebase/performance-compat",Pp="@firebase/remote-config",Np="@firebase/remote-config-compat",bp="@firebase/storage",Dp="@firebase/storage-compat",kp="@firebase/firestore",Vp="@firebase/firestore-compat",xp="firebase",Mp="10.7.1";/**
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
 */const uo="[DEFAULT]",Op={[co]:"fire-core",[hp]:"fire-core-compat",[fp]:"fire-analytics",[dp]:"fire-analytics-compat",[pp]:"fire-app-check",[_p]:"fire-app-check-compat",[mp]:"fire-auth",[gp]:"fire-auth-compat",[yp]:"fire-rtdb",[vp]:"fire-rtdb-compat",[Ep]:"fire-fn",[Tp]:"fire-fn-compat",[Ip]:"fire-iid",[wp]:"fire-iid-compat",[Cp]:"fire-fcm",[Ap]:"fire-fcm-compat",[Rp]:"fire-perf",[Sp]:"fire-perf-compat",[Pp]:"fire-rc",[Np]:"fire-rc-compat",[bp]:"fire-gcs",[Dp]:"fire-gcs-compat",[kp]:"fire-fst",[Vp]:"fire-fst-compat","fire-js":"fire-js",[xp]:"fire-js-all"};/**
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
 */const is=new Map,ho=new Map;function Lp(n,e){try{n.container.addComponent(e)}catch(t){bt.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function rs(n){const e=n.name;if(ho.has(e))return bt.debug(`There were multiple attempts to register component ${e}.`),!1;ho.set(e,n);for(const t of is.values())Lp(t,n);return!0}function Vu(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
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
 */const Fp={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}."},at=new Nu("app","Firebase",Fp);/**
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
 */class Up{constructor(e,t,s){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=s,this.container.addComponent(new an("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw at.create("app-deleted",{appName:this._name})}}/**
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
 */const xu=Mp;function Bp(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const s=Object.assign({name:uo,automaticDataCollectionEnabled:!1},e),i=s.name;if(typeof i!="string"||!i)throw at.create("bad-app-name",{appName:String(i)});if(t||(t=Cu()),!t)throw at.create("no-options");const r=is.get(i);if(r){if(oo(t,r.options)&&oo(s,r.config))return r;throw at.create("duplicate-app",{appName:i})}const o=new H_(i);for(const l of ho.values())o.addComponent(l);const a=new Up(t,s,o);return is.set(i,a),a}function Mu(n=uo){const e=is.get(n);if(!e&&n===uo&&Cu())return Bp();if(!e)throw at.create("no-app",{appName:n});return e}function _w(){return Array.from(is.values())}function St(n,e,t){var s;let i=(s=Op[n])!==null&&s!==void 0?s:n;t&&(i+=`-${t}`);const r=i.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${i}" with version "${e}":`];r&&a.push(`library name "${i}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),bt.warn(a.join(" "));return}rs(new an(`${i}-version`,()=>({library:i,version:e}),"VERSION"))}/**
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
 */const qp="firebase-heartbeat-database",Wp=1,os="firebase-heartbeat-store";let Br=null;function Ou(){return Br||(Br=op(qp,Wp,{upgrade:(n,e)=>{switch(e){case 0:n.createObjectStore(os)}}}).catch(n=>{throw at.create("idb-open",{originalErrorMessage:n.message})})),Br}async function jp(n){try{return await(await Ou()).transaction(os).objectStore(os).get(Lu(n))}catch(e){if(e instanceof Cn)bt.warn(e.message);else{const t=at.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});bt.warn(t.message)}}}async function Wl(n,e){try{const s=(await Ou()).transaction(os,"readwrite");await s.objectStore(os).put(e,Lu(n)),await s.done}catch(t){if(t instanceof Cn)bt.warn(t.message);else{const s=at.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});bt.warn(s.message)}}}function Lu(n){return`${n.name}!${n.options.appId}`}/**
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
 */const zp=1024,$p=30*24*60*60*1e3;class Gp{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Kp(t),this._heartbeatsCachePromise=this._storage.read().then(s=>(this._heartbeatsCache=s,s))}async triggerHeartbeat(){var e,t;const i=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=jl();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)))return this._heartbeatsCache.heartbeats.push({date:r,agent:i}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=$p}),this._storage.overwrite(this._heartbeatsCache)}async getHeartbeatsHeader(){var e;if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=jl(),{heartbeatsToSend:s,unsentEntries:i}=Hp(this._heartbeatsCache.heartbeats),r=pi(JSON.stringify({version:2,heartbeats:s}));return this._heartbeatsCache.lastSentHeartbeatDate=t,i.length>0?(this._heartbeatsCache.heartbeats=i,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}}function jl(){return new Date().toISOString().substring(0,10)}function Hp(n,e=zp){const t=[];let s=n.slice();for(const i of n){const r=t.find(o=>o.agent===i.agent);if(r){if(r.dates.push(i.date),zl(t)>e){r.dates.pop();break}}else if(t.push({agent:i.agent,dates:[i.date]}),zl(t)>e){t.pop();break}s=s.slice(1)}return{heartbeatsToSend:t,unsentEntries:s}}class Kp{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return k_()?V_().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await jp(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Wl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const i=await this.read();return Wl(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:i.lastSentHeartbeatDate,heartbeats:[...i.heartbeats,...e.heartbeats]})}else return}}function zl(n){return pi(JSON.stringify({version:2,heartbeats:n})).length}/**
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
 */function Qp(n){rs(new an("platform-logger",e=>new cp(e),"PRIVATE")),rs(new an("heartbeat",e=>new Gp(e),"PRIVATE")),St(co,ql,n),St(co,ql,"esm2017"),St("fire-js","")}Qp("");var Yp=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},y,ea=ea||{},S=Yp||self;function Qi(n){var e=typeof n;return e=e!="object"?e:n?Array.isArray(n)?"array":e:"null",e=="array"||e=="object"&&typeof n.length=="number"}function Ns(n){var e=typeof n;return e=="object"&&n!=null||e=="function"}function Xp(n){return Object.prototype.hasOwnProperty.call(n,qr)&&n[qr]||(n[qr]=++Jp)}var qr="closure_uid_"+(1e9*Math.random()>>>0),Jp=0;function Zp(n,e,t){return n.call.apply(n.bind,arguments)}function em(n,e,t){if(!n)throw Error();if(2<arguments.length){var s=Array.prototype.slice.call(arguments,2);return function(){var i=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(i,s),n.apply(e,i)}}return function(){return n.apply(e,arguments)}}function ve(n,e,t){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?ve=Zp:ve=em,ve.apply(null,arguments)}function ti(n,e){var t=Array.prototype.slice.call(arguments,1);return function(){var s=t.slice();return s.push.apply(s,arguments),n.apply(this,s)}}function ae(n,e){function t(){}t.prototype=e.prototype,n.$=e.prototype,n.prototype=new t,n.prototype.constructor=n,n.ac=function(s,i,r){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return e.prototype[i].apply(s,o)}}function yt(){this.s=this.s,this.o=this.o}var tm=0;yt.prototype.s=!1;yt.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),tm!=0)&&Xp(this)};yt.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const Fu=Array.prototype.indexOf?function(n,e){return Array.prototype.indexOf.call(n,e,void 0)}:function(n,e){if(typeof n=="string")return typeof e!="string"||e.length!=1?-1:n.indexOf(e,0);for(let t=0;t<n.length;t++)if(t in n&&n[t]===e)return t;return-1};function ta(n){const e=n.length;if(0<e){const t=Array(e);for(let s=0;s<e;s++)t[s]=n[s];return t}return[]}function $l(n,e){for(let t=1;t<arguments.length;t++){const s=arguments[t];if(Qi(s)){const i=n.length||0,r=s.length||0;n.length=i+r;for(let o=0;o<r;o++)n[i+o]=s[o]}else n.push(s)}}function Ee(n,e){this.type=n,this.g=this.target=e,this.defaultPrevented=!1}Ee.prototype.h=function(){this.defaultPrevented=!0};var nm=function(){if(!S.addEventListener||!Object.defineProperty)return!1;var n=!1,e=Object.defineProperty({},"passive",{get:function(){n=!0}});try{const t=()=>{};S.addEventListener("test",t,e),S.removeEventListener("test",t,e)}catch{}return n}();function as(n){return/^[\s\xa0]*$/.test(n)}function Yi(){var n=S.navigator;return n&&(n=n.userAgent)?n:""}function Ue(n){return Yi().indexOf(n)!=-1}function na(n){return na[" "](n),n}na[" "]=function(){};function sm(n,e){var t=Qm;return Object.prototype.hasOwnProperty.call(t,n)?t[n]:t[n]=e(n)}var im=Ue("Opera"),ln=Ue("Trident")||Ue("MSIE"),Uu=Ue("Edge"),fo=Uu||ln,Bu=Ue("Gecko")&&!(Yi().toLowerCase().indexOf("webkit")!=-1&&!Ue("Edge"))&&!(Ue("Trident")||Ue("MSIE"))&&!Ue("Edge"),rm=Yi().toLowerCase().indexOf("webkit")!=-1&&!Ue("Edge");function qu(){var n=S.document;return n?n.documentMode:void 0}var _o;e:{var Wr="",jr=function(){var n=Yi();if(Bu)return/rv:([^\);]+)(\)|;)/.exec(n);if(Uu)return/Edge\/([\d\.]+)/.exec(n);if(ln)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(rm)return/WebKit\/(\S+)/.exec(n);if(im)return/(?:Version)[ \/]?(\S+)/.exec(n)}();if(jr&&(Wr=jr?jr[1]:""),ln){var zr=qu();if(zr!=null&&zr>parseFloat(Wr)){_o=String(zr);break e}}_o=Wr}var po;if(S.document&&ln){var Gl=qu();po=Gl||parseInt(_o,10)||void 0}else po=void 0;var om=po;function ls(n,e){if(Ee.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var t=this.type=n.type,s=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=e,e=n.relatedTarget){if(Bu){e:{try{na(e.nodeName);var i=!0;break e}catch{}i=!1}i||(e=null)}}else t=="mouseover"?e=n.fromElement:t=="mouseout"&&(e=n.toElement);this.relatedTarget=e,s?(this.clientX=s.clientX!==void 0?s.clientX:s.pageX,this.clientY=s.clientY!==void 0?s.clientY:s.pageY,this.screenX=s.screenX||0,this.screenY=s.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:am[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&ls.$.h.call(this)}}ae(ls,Ee);var am={2:"touch",3:"pen",4:"mouse"};ls.prototype.h=function(){ls.$.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var bs="closure_listenable_"+(1e6*Math.random()|0),lm=0;function cm(n,e,t,s,i){this.listener=n,this.proxy=null,this.src=e,this.type=t,this.capture=!!s,this.la=i,this.key=++lm,this.fa=this.ia=!1}function Xi(n){n.fa=!0,n.listener=null,n.proxy=null,n.src=null,n.la=null}function sa(n,e,t){for(const s in n)e.call(t,n[s],s,n)}function um(n,e){for(const t in n)e.call(void 0,n[t],t,n)}function Wu(n){const e={};for(const t in n)e[t]=n[t];return e}const Hl="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function ju(n,e){let t,s;for(let i=1;i<arguments.length;i++){s=arguments[i];for(t in s)n[t]=s[t];for(let r=0;r<Hl.length;r++)t=Hl[r],Object.prototype.hasOwnProperty.call(s,t)&&(n[t]=s[t])}}function Ji(n){this.src=n,this.g={},this.h=0}Ji.prototype.add=function(n,e,t,s,i){var r=n.toString();n=this.g[r],n||(n=this.g[r]=[],this.h++);var o=go(n,e,s,i);return-1<o?(e=n[o],t||(e.ia=!1)):(e=new cm(e,this.src,r,!!s,i),e.ia=t,n.push(e)),e};function mo(n,e){var t=e.type;if(t in n.g){var s=n.g[t],i=Fu(s,e),r;(r=0<=i)&&Array.prototype.splice.call(s,i,1),r&&(Xi(e),n.g[t].length==0&&(delete n.g[t],n.h--))}}function go(n,e,t,s){for(var i=0;i<n.length;++i){var r=n[i];if(!r.fa&&r.listener==e&&r.capture==!!t&&r.la==s)return i}return-1}var ia="closure_lm_"+(1e6*Math.random()|0),$r={};function zu(n,e,t,s,i){if(s&&s.once)return Gu(n,e,t,s,i);if(Array.isArray(e)){for(var r=0;r<e.length;r++)zu(n,e[r],t,s,i);return null}return t=aa(t),n&&n[bs]?n.O(e,t,Ns(s)?!!s.capture:!!s,i):$u(n,e,t,!1,s,i)}function $u(n,e,t,s,i,r){if(!e)throw Error("Invalid event type");var o=Ns(i)?!!i.capture:!!i,a=oa(n);if(a||(n[ia]=a=new Ji(n)),t=a.add(e,t,s,o,r),t.proxy)return t;if(s=hm(),t.proxy=s,s.src=n,s.listener=t,n.addEventListener)nm||(i=o),i===void 0&&(i=!1),n.addEventListener(e.toString(),s,i);else if(n.attachEvent)n.attachEvent(Ku(e.toString()),s);else if(n.addListener&&n.removeListener)n.addListener(s);else throw Error("addEventListener and attachEvent are unavailable.");return t}function hm(){function n(t){return e.call(n.src,n.listener,t)}const e=dm;return n}function Gu(n,e,t,s,i){if(Array.isArray(e)){for(var r=0;r<e.length;r++)Gu(n,e[r],t,s,i);return null}return t=aa(t),n&&n[bs]?n.P(e,t,Ns(s)?!!s.capture:!!s,i):$u(n,e,t,!0,s,i)}function Hu(n,e,t,s,i){if(Array.isArray(e))for(var r=0;r<e.length;r++)Hu(n,e[r],t,s,i);else s=Ns(s)?!!s.capture:!!s,t=aa(t),n&&n[bs]?(n=n.i,e=String(e).toString(),e in n.g&&(r=n.g[e],t=go(r,t,s,i),-1<t&&(Xi(r[t]),Array.prototype.splice.call(r,t,1),r.length==0&&(delete n.g[e],n.h--)))):n&&(n=oa(n))&&(e=n.g[e.toString()],n=-1,e&&(n=go(e,t,s,i)),(t=-1<n?e[n]:null)&&ra(t))}function ra(n){if(typeof n!="number"&&n&&!n.fa){var e=n.src;if(e&&e[bs])mo(e.i,n);else{var t=n.type,s=n.proxy;e.removeEventListener?e.removeEventListener(t,s,n.capture):e.detachEvent?e.detachEvent(Ku(t),s):e.addListener&&e.removeListener&&e.removeListener(s),(t=oa(e))?(mo(t,n),t.h==0&&(t.src=null,e[ia]=null)):Xi(n)}}}function Ku(n){return n in $r?$r[n]:$r[n]="on"+n}function dm(n,e){if(n.fa)n=!0;else{e=new ls(e,this);var t=n.listener,s=n.la||n.src;n.ia&&ra(n),n=t.call(s,e)}return n}function oa(n){return n=n[ia],n instanceof Ji?n:null}var Gr="__closure_events_fn_"+(1e9*Math.random()>>>0);function aa(n){return typeof n=="function"?n:(n[Gr]||(n[Gr]=function(e){return n.handleEvent(e)}),n[Gr])}function oe(){yt.call(this),this.i=new Ji(this),this.S=this,this.J=null}ae(oe,yt);oe.prototype[bs]=!0;oe.prototype.removeEventListener=function(n,e,t,s){Hu(this,n,e,t,s)};function de(n,e){var t,s=n.J;if(s)for(t=[];s;s=s.J)t.push(s);if(n=n.S,s=e.type||e,typeof e=="string")e=new Ee(e,n);else if(e instanceof Ee)e.target=e.target||n;else{var i=e;e=new Ee(s,n),ju(e,i)}if(i=!0,t)for(var r=t.length-1;0<=r;r--){var o=e.g=t[r];i=ni(o,s,!0,e)&&i}if(o=e.g=n,i=ni(o,s,!0,e)&&i,i=ni(o,s,!1,e)&&i,t)for(r=0;r<t.length;r++)o=e.g=t[r],i=ni(o,s,!1,e)&&i}oe.prototype.N=function(){if(oe.$.N.call(this),this.i){var n=this.i,e;for(e in n.g){for(var t=n.g[e],s=0;s<t.length;s++)Xi(t[s]);delete n.g[e],n.h--}}this.J=null};oe.prototype.O=function(n,e,t,s){return this.i.add(String(n),e,!1,t,s)};oe.prototype.P=function(n,e,t,s){return this.i.add(String(n),e,!0,t,s)};function ni(n,e,t,s){if(e=n.i.g[String(e)],!e)return!0;e=e.concat();for(var i=!0,r=0;r<e.length;++r){var o=e[r];if(o&&!o.fa&&o.capture==t){var a=o.listener,l=o.la||o.src;o.ia&&mo(n.i,o),i=a.call(l,s)!==!1&&i}}return i&&!s.defaultPrevented}var la=S.JSON.stringify;class fm{constructor(e,t){this.i=e,this.j=t,this.h=0,this.g=null}get(){let e;return 0<this.h?(this.h--,e=this.g,this.g=e.next,e.next=null):e=this.i(),e}}function _m(){var n=ca;let e=null;return n.g&&(e=n.g,n.g=n.g.next,n.g||(n.h=null),e.next=null),e}class pm{constructor(){this.h=this.g=null}add(e,t){const s=Qu.get();s.set(e,t),this.h?this.h.next=s:this.g=s,this.h=s}}var Qu=new fm(()=>new mm,n=>n.reset());class mm{constructor(){this.next=this.g=this.h=null}set(e,t){this.h=e,this.g=t,this.next=null}reset(){this.next=this.g=this.h=null}}function gm(n){var e=1;n=n.split(":");const t=[];for(;0<e&&n.length;)t.push(n.shift()),e--;return n.length&&t.push(n.join(":")),t}function ym(n){S.setTimeout(()=>{throw n},0)}let cs,us=!1,ca=new pm,Yu=()=>{const n=S.Promise.resolve(void 0);cs=()=>{n.then(vm)}};var vm=()=>{for(var n;n=_m();){try{n.h.call(n.g)}catch(t){ym(t)}var e=Qu;e.j(n),100>e.h&&(e.h++,n.next=e.g,e.g=n)}us=!1};function Zi(n,e){oe.call(this),this.h=n||1,this.g=e||S,this.j=ve(this.qb,this),this.l=Date.now()}ae(Zi,oe);y=Zi.prototype;y.ga=!1;y.T=null;y.qb=function(){if(this.ga){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-n):(this.T&&(this.g.clearTimeout(this.T),this.T=null),de(this,"tick"),this.ga&&(ua(this),this.start()))}};y.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function ua(n){n.ga=!1,n.T&&(n.g.clearTimeout(n.T),n.T=null)}y.N=function(){Zi.$.N.call(this),ua(this),delete this.g};function ha(n,e,t){if(typeof n=="function")t&&(n=ve(n,t));else if(n&&typeof n.handleEvent=="function")n=ve(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(e)?-1:S.setTimeout(n,e||0)}function Xu(n){n.g=ha(()=>{n.g=null,n.i&&(n.i=!1,Xu(n))},n.j);const e=n.h;n.h=null,n.m.apply(null,e)}class Em extends yt{constructor(e,t){super(),this.m=e,this.j=t,this.h=null,this.i=!1,this.g=null}l(e){this.h=arguments,this.g?this.i=!0:Xu(this)}N(){super.N(),this.g&&(S.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function hs(n){yt.call(this),this.h=n,this.g={}}ae(hs,yt);var Kl=[];function Ju(n,e,t,s){Array.isArray(t)||(t&&(Kl[0]=t.toString()),t=Kl);for(var i=0;i<t.length;i++){var r=zu(e,t[i],s||n.handleEvent,!1,n.h||n);if(!r)break;n.g[r.key]=r}}function Zu(n){sa(n.g,function(e,t){this.g.hasOwnProperty(t)&&ra(e)},n),n.g={}}hs.prototype.N=function(){hs.$.N.call(this),Zu(this)};hs.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function er(){this.g=!0}er.prototype.Ea=function(){this.g=!1};function Tm(n,e,t,s,i,r){n.info(function(){if(n.g)if(r)for(var o="",a=r.split("&"),l=0;l<a.length;l++){var c=a[l].split("=");if(1<c.length){var u=c[0];c=c[1];var h=u.split("_");o=2<=h.length&&h[1]=="type"?o+(u+"="+c+"&"):o+(u+"=redacted&")}}else o=null;else o=r;return"XMLHTTP REQ ("+s+") [attempt "+i+"]: "+e+`
`+t+`
`+o})}function Im(n,e,t,s,i,r,o){n.info(function(){return"XMLHTTP RESP ("+s+") [ attempt "+i+"]: "+e+`
`+t+`
`+r+" "+o})}function Yt(n,e,t,s){n.info(function(){return"XMLHTTP TEXT ("+e+"): "+Cm(n,t)+(s?" "+s:"")})}function wm(n,e){n.info(function(){return"TIMEOUT: "+e})}er.prototype.info=function(){};function Cm(n,e){if(!n.g)return e;if(!e)return null;try{var t=JSON.parse(e);if(t){for(n=0;n<t.length;n++)if(Array.isArray(t[n])){var s=t[n];if(!(2>s.length)){var i=s[1];if(Array.isArray(i)&&!(1>i.length)){var r=i[0];if(r!="noop"&&r!="stop"&&r!="close")for(var o=1;o<i.length;o++)i[o]=""}}}}return la(t)}catch{return e}}var Ut={},Ql=null;function tr(){return Ql=Ql||new oe}Ut.Ta="serverreachability";function eh(n){Ee.call(this,Ut.Ta,n)}ae(eh,Ee);function ds(n){const e=tr();de(e,new eh(e))}Ut.STAT_EVENT="statevent";function th(n,e){Ee.call(this,Ut.STAT_EVENT,n),this.stat=e}ae(th,Ee);function we(n){const e=tr();de(e,new th(e,n))}Ut.Ua="timingevent";function nh(n,e){Ee.call(this,Ut.Ua,n),this.size=e}ae(nh,Ee);function Ds(n,e){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return S.setTimeout(function(){n()},e)}var nr={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},sh={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function da(){}da.prototype.h=null;function Yl(n){return n.h||(n.h=n.i())}function ih(){}var ks={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function fa(){Ee.call(this,"d")}ae(fa,Ee);function _a(){Ee.call(this,"c")}ae(_a,Ee);var yo;function sr(){}ae(sr,da);sr.prototype.g=function(){return new XMLHttpRequest};sr.prototype.i=function(){return{}};yo=new sr;function Vs(n,e,t,s){this.l=n,this.j=e,this.m=t,this.W=s||1,this.U=new hs(this),this.P=Am,n=fo?125:void 0,this.V=new Zi(n),this.I=null,this.i=!1,this.u=this.B=this.A=this.L=this.G=this.Y=this.C=null,this.F=[],this.g=null,this.o=0,this.s=this.v=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new rh}function rh(){this.i=null,this.g="",this.h=!1}var Am=45e3,oh={},vo={};y=Vs.prototype;y.setTimeout=function(n){this.P=n};function Eo(n,e,t){n.L=1,n.A=rr(Ze(e)),n.u=t,n.S=!0,ah(n,null)}function ah(n,e){n.G=Date.now(),xs(n),n.B=Ze(n.A);var t=n.B,s=n.W;Array.isArray(s)||(s=[String(s)]),ph(t.i,"t",s),n.o=0,t=n.l.J,n.h=new rh,n.g=Oh(n.l,t?e:null,!n.u),0<n.O&&(n.M=new Em(ve(n.Pa,n,n.g),n.O)),Ju(n.U,n.g,"readystatechange",n.nb),e=n.I?Wu(n.I):{},n.u?(n.v||(n.v="POST"),e["Content-Type"]="application/x-www-form-urlencoded",n.g.ha(n.B,n.v,n.u,e)):(n.v="GET",n.g.ha(n.B,n.v,null,e)),ds(),Tm(n.j,n.v,n.B,n.m,n.W,n.u)}y.nb=function(n){n=n.target;const e=this.M;e&&Be(n)==3?e.l():this.Pa(n)};y.Pa=function(n){try{if(n==this.g)e:{const u=Be(this.g);var e=this.g.Ia();const h=this.g.da();if(!(3>u)&&(u!=3||fo||this.g&&(this.h.h||this.g.ja()||ec(this.g)))){this.J||u!=4||e==7||(e==8||0>=h?ds(3):ds(2)),ir(this);var t=this.g.da();this.ca=t;t:if(lh(this)){var s=ec(this.g);n="";var i=s.length,r=Be(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){wt(this),Hn(this);var o="";break t}this.h.i=new S.TextDecoder}for(e=0;e<i;e++)this.h.h=!0,n+=this.h.i.decode(s[e],{stream:r&&e==i-1});s.length=0,this.h.g+=n,this.o=0,o=this.h.g}else o=this.g.ja();if(this.i=t==200,Im(this.j,this.v,this.B,this.m,this.W,u,t),this.i){if(this.aa&&!this.K){t:{if(this.g){var a,l=this.g;if((a=l.g?l.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!as(a)){var c=a;break t}}c=null}if(t=c)Yt(this.j,this.m,t,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,To(this,t);else{this.i=!1,this.s=3,we(12),wt(this),Hn(this);break e}}this.S?(ch(this,u,o),fo&&this.i&&u==3&&(Ju(this.U,this.V,"tick",this.mb),this.V.start())):(Yt(this.j,this.m,o,null),To(this,o)),u==4&&wt(this),this.i&&!this.J&&(u==4?kh(this.l,this):(this.i=!1,xs(this)))}else Gm(this.g),t==400&&0<o.indexOf("Unknown SID")?(this.s=3,we(12)):(this.s=0,we(13)),wt(this),Hn(this)}}}catch{}finally{}};function lh(n){return n.g?n.v=="GET"&&n.L!=2&&n.l.Ha:!1}function ch(n,e,t){let s=!0,i;for(;!n.J&&n.o<t.length;)if(i=Rm(n,t),i==vo){e==4&&(n.s=4,we(14),s=!1),Yt(n.j,n.m,null,"[Incomplete Response]");break}else if(i==oh){n.s=4,we(15),Yt(n.j,n.m,t,"[Invalid Chunk]"),s=!1;break}else Yt(n.j,n.m,i,null),To(n,i);lh(n)&&n.o!=0&&(n.h.g=n.h.g.slice(n.o),n.o=0),e!=4||t.length!=0||n.h.h||(n.s=1,we(16),s=!1),n.i=n.i&&s,s?0<t.length&&!n.ba&&(n.ba=!0,e=n.l,e.g==n&&e.ca&&!e.M&&(e.l.info("Great, no buffering proxy detected. Bytes received: "+t.length),Ea(e),e.M=!0,we(11))):(Yt(n.j,n.m,t,"[Invalid Chunked Response]"),wt(n),Hn(n))}y.mb=function(){if(this.g){var n=Be(this.g),e=this.g.ja();this.o<e.length&&(ir(this),ch(this,n,e),this.i&&n!=4&&xs(this))}};function Rm(n,e){var t=n.o,s=e.indexOf(`
`,t);return s==-1?vo:(t=Number(e.substring(t,s)),isNaN(t)?oh:(s+=1,s+t>e.length?vo:(e=e.slice(s,s+t),n.o=s+t,e)))}y.cancel=function(){this.J=!0,wt(this)};function xs(n){n.Y=Date.now()+n.P,uh(n,n.P)}function uh(n,e){if(n.C!=null)throw Error("WatchDog timer not null");n.C=Ds(ve(n.lb,n),e)}function ir(n){n.C&&(S.clearTimeout(n.C),n.C=null)}y.lb=function(){this.C=null;const n=Date.now();0<=n-this.Y?(wm(this.j,this.B),this.L!=2&&(ds(),we(17)),wt(this),this.s=2,Hn(this)):uh(this,this.Y-n)};function Hn(n){n.l.H==0||n.J||kh(n.l,n)}function wt(n){ir(n);var e=n.M;e&&typeof e.sa=="function"&&e.sa(),n.M=null,ua(n.V),Zu(n.U),n.g&&(e=n.g,n.g=null,e.abort(),e.sa())}function To(n,e){try{var t=n.l;if(t.H!=0&&(t.g==n||Io(t.i,n))){if(!n.K&&Io(t.i,n)&&t.H==3){try{var s=t.Ja.g.parse(e)}catch{s=null}if(Array.isArray(s)&&s.length==3){var i=s;if(i[0]==0){e:if(!t.u){if(t.g)if(t.g.G+3e3<n.G)vi(t),cr(t);else break e;va(t),we(18)}}else t.Fa=i[1],0<t.Fa-t.V&&37500>i[2]&&t.G&&t.A==0&&!t.v&&(t.v=Ds(ve(t.ib,t),6e3));if(1>=yh(t.i)&&t.oa){try{t.oa()}catch{}t.oa=void 0}}else Ct(t,11)}else if((n.K||t.g==n)&&vi(t),!as(e))for(i=t.Ja.g.parse(e),e=0;e<i.length;e++){let c=i[e];if(t.V=c[0],c=c[1],t.H==2)if(c[0]=="c"){t.K=c[1],t.pa=c[2];const u=c[3];u!=null&&(t.ra=u,t.l.info("VER="+t.ra));const h=c[4];h!=null&&(t.Ga=h,t.l.info("SVER="+t.Ga));const d=c[5];d!=null&&typeof d=="number"&&0<d&&(s=1.5*d,t.L=s,t.l.info("backChannelRequestTimeoutMs_="+s)),s=t;const f=n.g;if(f){const m=f.g?f.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(m){var r=s.i;r.g||m.indexOf("spdy")==-1&&m.indexOf("quic")==-1&&m.indexOf("h2")==-1||(r.j=r.l,r.g=new Set,r.h&&(pa(r,r.h),r.h=null))}if(s.F){const v=f.g?f.g.getResponseHeader("X-HTTP-Session-Id"):null;v&&(s.Da=v,j(s.I,s.F,v))}}t.H=3,t.h&&t.h.Ba(),t.ca&&(t.S=Date.now()-n.G,t.l.info("Handshake RTT: "+t.S+"ms")),s=t;var o=n;if(s.wa=Mh(s,s.J?s.pa:null,s.Y),o.K){vh(s.i,o);var a=o,l=s.L;l&&a.setTimeout(l),a.C&&(ir(a),xs(a)),s.g=o}else bh(s);0<t.j.length&&ur(t)}else c[0]!="stop"&&c[0]!="close"||Ct(t,7);else t.H==3&&(c[0]=="stop"||c[0]=="close"?c[0]=="stop"?Ct(t,7):ya(t):c[0]!="noop"&&t.h&&t.h.Aa(c),t.A=0)}}ds(4)}catch{}}function Sm(n){if(n.Z&&typeof n.Z=="function")return n.Z();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(Qi(n)){for(var e=[],t=n.length,s=0;s<t;s++)e.push(n[s]);return e}e=[],t=0;for(s in n)e[t++]=n[s];return e}function Pm(n){if(n.ta&&typeof n.ta=="function")return n.ta();if(!n.Z||typeof n.Z!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(Qi(n)||typeof n=="string"){var e=[];n=n.length;for(var t=0;t<n;t++)e.push(t);return e}e=[],t=0;for(const s in n)e[t++]=s;return e}}}function hh(n,e){if(n.forEach&&typeof n.forEach=="function")n.forEach(e,void 0);else if(Qi(n)||typeof n=="string")Array.prototype.forEach.call(n,e,void 0);else for(var t=Pm(n),s=Sm(n),i=s.length,r=0;r<i;r++)e.call(void 0,s[r],t&&t[r],n)}var dh=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function Nm(n,e){if(n){n=n.split("&");for(var t=0;t<n.length;t++){var s=n[t].indexOf("="),i=null;if(0<=s){var r=n[t].substring(0,s);i=n[t].substring(s+1)}else r=n[t];e(r,i?decodeURIComponent(i.replace(/\+/g," ")):"")}}}function Pt(n){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof Pt){this.h=n.h,gi(this,n.j),this.s=n.s,this.g=n.g,yi(this,n.m),this.l=n.l;var e=n.i,t=new fs;t.i=e.i,e.g&&(t.g=new Map(e.g),t.h=e.h),Xl(this,t),this.o=n.o}else n&&(e=String(n).match(dh))?(this.h=!1,gi(this,e[1]||"",!0),this.s=jn(e[2]||""),this.g=jn(e[3]||"",!0),yi(this,e[4]),this.l=jn(e[5]||"",!0),Xl(this,e[6]||"",!0),this.o=jn(e[7]||"")):(this.h=!1,this.i=new fs(null,this.h))}Pt.prototype.toString=function(){var n=[],e=this.j;e&&n.push(zn(e,Jl,!0),":");var t=this.g;return(t||e=="file")&&(n.push("//"),(e=this.s)&&n.push(zn(e,Jl,!0),"@"),n.push(encodeURIComponent(String(t)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),t=this.m,t!=null&&n.push(":",String(t))),(t=this.l)&&(this.g&&t.charAt(0)!="/"&&n.push("/"),n.push(zn(t,t.charAt(0)=="/"?km:Dm,!0))),(t=this.i.toString())&&n.push("?",t),(t=this.o)&&n.push("#",zn(t,xm)),n.join("")};function Ze(n){return new Pt(n)}function gi(n,e,t){n.j=t?jn(e,!0):e,n.j&&(n.j=n.j.replace(/:$/,""))}function yi(n,e){if(e){if(e=Number(e),isNaN(e)||0>e)throw Error("Bad port number "+e);n.m=e}else n.m=null}function Xl(n,e,t){e instanceof fs?(n.i=e,Mm(n.i,n.h)):(t||(e=zn(e,Vm)),n.i=new fs(e,n.h))}function j(n,e,t){n.i.set(e,t)}function rr(n){return j(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function jn(n,e){return n?e?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function zn(n,e,t){return typeof n=="string"?(n=encodeURI(n).replace(e,bm),t&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function bm(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var Jl=/[#\/\?@]/g,Dm=/[#\?:]/g,km=/[#\?]/g,Vm=/[#\?@]/g,xm=/#/g;function fs(n,e){this.h=this.g=null,this.i=n||null,this.j=!!e}function vt(n){n.g||(n.g=new Map,n.h=0,n.i&&Nm(n.i,function(e,t){n.add(decodeURIComponent(e.replace(/\+/g," ")),t)}))}y=fs.prototype;y.add=function(n,e){vt(this),this.i=null,n=An(this,n);var t=this.g.get(n);return t||this.g.set(n,t=[]),t.push(e),this.h+=1,this};function fh(n,e){vt(n),e=An(n,e),n.g.has(e)&&(n.i=null,n.h-=n.g.get(e).length,n.g.delete(e))}function _h(n,e){return vt(n),e=An(n,e),n.g.has(e)}y.forEach=function(n,e){vt(this),this.g.forEach(function(t,s){t.forEach(function(i){n.call(e,i,s,this)},this)},this)};y.ta=function(){vt(this);const n=Array.from(this.g.values()),e=Array.from(this.g.keys()),t=[];for(let s=0;s<e.length;s++){const i=n[s];for(let r=0;r<i.length;r++)t.push(e[s])}return t};y.Z=function(n){vt(this);let e=[];if(typeof n=="string")_h(this,n)&&(e=e.concat(this.g.get(An(this,n))));else{n=Array.from(this.g.values());for(let t=0;t<n.length;t++)e=e.concat(n[t])}return e};y.set=function(n,e){return vt(this),this.i=null,n=An(this,n),_h(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[e]),this.h+=1,this};y.get=function(n,e){return n?(n=this.Z(n),0<n.length?String(n[0]):e):e};function ph(n,e,t){fh(n,e),0<t.length&&(n.i=null,n.g.set(An(n,e),ta(t)),n.h+=t.length)}y.toString=function(){if(this.i)return this.i;if(!this.g)return"";const n=[],e=Array.from(this.g.keys());for(var t=0;t<e.length;t++){var s=e[t];const r=encodeURIComponent(String(s)),o=this.Z(s);for(s=0;s<o.length;s++){var i=r;o[s]!==""&&(i+="="+encodeURIComponent(String(o[s]))),n.push(i)}}return this.i=n.join("&")};function An(n,e){return e=String(e),n.j&&(e=e.toLowerCase()),e}function Mm(n,e){e&&!n.j&&(vt(n),n.i=null,n.g.forEach(function(t,s){var i=s.toLowerCase();s!=i&&(fh(this,s),ph(this,i,t))},n)),n.j=e}var Om=class{constructor(n,e){this.g=n,this.map=e}};function mh(n){this.l=n||Lm,S.PerformanceNavigationTiming?(n=S.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(S.g&&S.g.Ka&&S.g.Ka()&&S.g.Ka().dc),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var Lm=10;function gh(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function yh(n){return n.h?1:n.g?n.g.size:0}function Io(n,e){return n.h?n.h==e:n.g?n.g.has(e):!1}function pa(n,e){n.g?n.g.add(e):n.h=e}function vh(n,e){n.h&&n.h==e?n.h=null:n.g&&n.g.has(e)&&n.g.delete(e)}mh.prototype.cancel=function(){if(this.i=Eh(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function Eh(n){if(n.h!=null)return n.i.concat(n.h.F);if(n.g!=null&&n.g.size!==0){let e=n.i;for(const t of n.g.values())e=e.concat(t.F);return e}return ta(n.i)}var Fm=class{stringify(n){return S.JSON.stringify(n,void 0)}parse(n){return S.JSON.parse(n,void 0)}};function Um(){this.g=new Fm}function Bm(n,e,t){const s=t||"";try{hh(n,function(i,r){let o=i;Ns(i)&&(o=la(i)),e.push(s+r+"="+encodeURIComponent(o))})}catch(i){throw e.push(s+"type="+encodeURIComponent("_badmap")),i}}function qm(n,e){const t=new er;if(S.Image){const s=new Image;s.onload=ti(si,t,s,"TestLoadImage: loaded",!0,e),s.onerror=ti(si,t,s,"TestLoadImage: error",!1,e),s.onabort=ti(si,t,s,"TestLoadImage: abort",!1,e),s.ontimeout=ti(si,t,s,"TestLoadImage: timeout",!1,e),S.setTimeout(function(){s.ontimeout&&s.ontimeout()},1e4),s.src=n}else e(!1)}function si(n,e,t,s,i){try{e.onload=null,e.onerror=null,e.onabort=null,e.ontimeout=null,i(s)}catch{}}function or(n){this.l=n.ec||null,this.j=n.ob||!1}ae(or,da);or.prototype.g=function(){return new ar(this.l,this.j)};or.prototype.i=function(n){return function(){return n}}({});function ar(n,e){oe.call(this),this.F=n,this.u=e,this.m=void 0,this.readyState=ma,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}ae(ar,oe);var ma=0;y=ar.prototype;y.open=function(n,e){if(this.readyState!=ma)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=e,this.readyState=1,_s(this)};y.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const e={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(e.body=n),(this.F||S).fetch(new Request(this.B,e)).then(this.$a.bind(this),this.ka.bind(this))};y.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ms(this)),this.readyState=ma};y.$a=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,_s(this)),this.g&&(this.readyState=3,_s(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof S.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Th(this)}else n.text().then(this.Za.bind(this),this.ka.bind(this))};function Th(n){n.j.read().then(n.Xa.bind(n)).catch(n.ka.bind(n))}y.Xa=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var e=n.value?n.value:new Uint8Array(0);(e=this.A.decode(e,{stream:!n.done}))&&(this.response=this.responseText+=e)}n.done?Ms(this):_s(this),this.readyState==3&&Th(this)}};y.Za=function(n){this.g&&(this.response=this.responseText=n,Ms(this))};y.Ya=function(n){this.g&&(this.response=n,Ms(this))};y.ka=function(){this.g&&Ms(this)};function Ms(n){n.readyState=4,n.l=null,n.j=null,n.A=null,_s(n)}y.setRequestHeader=function(n,e){this.v.append(n,e)};y.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};y.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],e=this.h.entries();for(var t=e.next();!t.done;)t=t.value,n.push(t[0]+": "+t[1]),t=e.next();return n.join(`\r
`)};function _s(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(ar.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var Wm=S.JSON.parse;function K(n){oe.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=Ih,this.L=this.M=!1}ae(K,oe);var Ih="",jm=/^https?$/i,zm=["POST","PUT"];y=K.prototype;y.Oa=function(n){this.M=n};y.ha=function(n,e,t,s){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+n);e=e?e.toUpperCase():"GET",this.I=n,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():yo.g(),this.C=this.u?Yl(this.u):Yl(yo),this.g.onreadystatechange=ve(this.La,this);try{this.G=!0,this.g.open(e,String(n),!0),this.G=!1}catch(r){Zl(this,r);return}if(n=t||"",t=new Map(this.headers),s)if(Object.getPrototypeOf(s)===Object.prototype)for(var i in s)t.set(i,s[i]);else if(typeof s.keys=="function"&&typeof s.get=="function")for(const r of s.keys())t.set(r,s.get(r));else throw Error("Unknown input type for opt_headers: "+String(s));s=Array.from(t.keys()).find(r=>r.toLowerCase()=="content-type"),i=S.FormData&&n instanceof S.FormData,!(0<=Fu(zm,e))||s||i||t.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[r,o]of t)this.g.setRequestHeader(r,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{Ah(this),0<this.B&&((this.L=$m(this.g))?(this.g.timeout=this.B,this.g.ontimeout=ve(this.ua,this)):this.A=ha(this.ua,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(r){Zl(this,r)}};function $m(n){return ln&&typeof n.timeout=="number"&&n.ontimeout!==void 0}y.ua=function(){typeof ea<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,de(this,"timeout"),this.abort(8))};function Zl(n,e){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=e,n.m=5,wh(n),lr(n)}function wh(n){n.F||(n.F=!0,de(n,"complete"),de(n,"error"))}y.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,de(this,"complete"),de(this,"abort"),lr(this))};y.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),lr(this,!0)),K.$.N.call(this)};y.La=function(){this.s||(this.G||this.v||this.l?Ch(this):this.kb())};y.kb=function(){Ch(this)};function Ch(n){if(n.h&&typeof ea<"u"&&(!n.C[1]||Be(n)!=4||n.da()!=2)){if(n.v&&Be(n)==4)ha(n.La,0,n);else if(de(n,"readystatechange"),Be(n)==4){n.h=!1;try{const o=n.da();e:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var e=!0;break e;default:e=!1}var t;if(!(t=e)){var s;if(s=o===0){var i=String(n.I).match(dh)[1]||null;!i&&S.self&&S.self.location&&(i=S.self.location.protocol.slice(0,-1)),s=!jm.test(i?i.toLowerCase():"")}t=s}if(t)de(n,"complete"),de(n,"success");else{n.m=6;try{var r=2<Be(n)?n.g.statusText:""}catch{r=""}n.j=r+" ["+n.da()+"]",wh(n)}}finally{lr(n)}}}}function lr(n,e){if(n.g){Ah(n);const t=n.g,s=n.C[0]?()=>{}:null;n.g=null,n.C=null,e||de(n,"ready");try{t.onreadystatechange=s}catch{}}}function Ah(n){n.g&&n.L&&(n.g.ontimeout=null),n.A&&(S.clearTimeout(n.A),n.A=null)}y.isActive=function(){return!!this.g};function Be(n){return n.g?n.g.readyState:0}y.da=function(){try{return 2<Be(this)?this.g.status:-1}catch{return-1}};y.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};y.Wa=function(n){if(this.g){var e=this.g.responseText;return n&&e.indexOf(n)==0&&(e=e.substring(n.length)),Wm(e)}};function ec(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.K){case Ih:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}function Gm(n){const e={};n=(n.g&&2<=Be(n)&&n.g.getAllResponseHeaders()||"").split(`\r
`);for(let s=0;s<n.length;s++){if(as(n[s]))continue;var t=gm(n[s]);const i=t[0];if(t=t[1],typeof t!="string")continue;t=t.trim();const r=e[i]||[];e[i]=r,r.push(t)}um(e,function(s){return s.join(", ")})}y.Ia=function(){return this.m};y.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function Rh(n){let e="";return sa(n,function(t,s){e+=s,e+=":",e+=t,e+=`\r
`}),e}function ga(n,e,t){e:{for(s in t){var s=!1;break e}s=!0}s||(t=Rh(t),typeof n=="string"?t!=null&&encodeURIComponent(String(t)):j(n,e,t))}function On(n,e,t){return t&&t.internalChannelParams&&t.internalChannelParams[n]||e}function Sh(n){this.Ga=0,this.j=[],this.l=new er,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=On("failFast",!1,n),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=On("baseRetryDelayMs",5e3,n),this.hb=On("retryDelaySeedMs",1e4,n),this.eb=On("forwardChannelMaxRetries",2,n),this.xa=On("forwardChannelRequestTimeoutMs",2e4,n),this.va=n&&n.xmlHttpFactory||void 0,this.Ha=n&&n.useFetchStreams||!1,this.L=void 0,this.J=n&&n.supportsCrossDomainXhr||!1,this.K="",this.i=new mh(n&&n.concurrentRequestLimit),this.Ja=new Um,this.P=n&&n.fastHandshake||!1,this.O=n&&n.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=n&&n.bc||!1,n&&n.Ea&&this.l.Ea(),n&&n.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&n&&n.detectBufferingProxy||!1,this.qa=void 0,n&&n.longPollingTimeout&&0<n.longPollingTimeout&&(this.qa=n.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}y=Sh.prototype;y.ra=8;y.H=1;function ya(n){if(Ph(n),n.H==3){var e=n.W++,t=Ze(n.I);if(j(t,"SID",n.K),j(t,"RID",e),j(t,"TYPE","terminate"),Os(n,t),e=new Vs(n,n.l,e),e.L=2,e.A=rr(Ze(t)),t=!1,S.navigator&&S.navigator.sendBeacon)try{t=S.navigator.sendBeacon(e.A.toString(),"")}catch{}!t&&S.Image&&(new Image().src=e.A,t=!0),t||(e.g=Oh(e.l,null),e.g.ha(e.A)),e.G=Date.now(),xs(e)}xh(n)}function cr(n){n.g&&(Ea(n),n.g.cancel(),n.g=null)}function Ph(n){cr(n),n.u&&(S.clearTimeout(n.u),n.u=null),vi(n),n.i.cancel(),n.m&&(typeof n.m=="number"&&S.clearTimeout(n.m),n.m=null)}function ur(n){if(!gh(n.i)&&!n.m){n.m=!0;var e=n.Na;cs||Yu(),us||(cs(),us=!0),ca.add(e,n),n.C=0}}function Hm(n,e){return yh(n.i)>=n.i.j-(n.m?1:0)?!1:n.m?(n.j=e.F.concat(n.j),!0):n.H==1||n.H==2||n.C>=(n.cb?0:n.eb)?!1:(n.m=Ds(ve(n.Na,n,e),Vh(n,n.C)),n.C++,!0)}y.Na=function(n){if(this.m)if(this.m=null,this.H==1){if(!n){this.W=Math.floor(1e5*Math.random()),n=this.W++;const i=new Vs(this,this.l,n);let r=this.s;if(this.U&&(r?(r=Wu(r),ju(r,this.U)):r=this.U),this.o!==null||this.O||(i.I=r,r=null),this.P)e:{for(var e=0,t=0;t<this.j.length;t++){t:{var s=this.j[t];if("__data__"in s.map&&(s=s.map.__data__,typeof s=="string")){s=s.length;break t}s=void 0}if(s===void 0)break;if(e+=s,4096<e){e=t;break e}if(e===4096||t===this.j.length-1){e=t+1;break e}}e=1e3}else e=1e3;e=Nh(this,i,e),t=Ze(this.I),j(t,"RID",n),j(t,"CVER",22),this.F&&j(t,"X-HTTP-Session-Id",this.F),Os(this,t),r&&(this.O?e="headers="+encodeURIComponent(String(Rh(r)))+"&"+e:this.o&&ga(t,this.o,r)),pa(this.i,i),this.bb&&j(t,"TYPE","init"),this.P?(j(t,"$req",e),j(t,"SID","null"),i.aa=!0,Eo(i,t,null)):Eo(i,t,e),this.H=2}}else this.H==3&&(n?tc(this,n):this.j.length==0||gh(this.i)||tc(this))};function tc(n,e){var t;e?t=e.m:t=n.W++;const s=Ze(n.I);j(s,"SID",n.K),j(s,"RID",t),j(s,"AID",n.V),Os(n,s),n.o&&n.s&&ga(s,n.o,n.s),t=new Vs(n,n.l,t,n.C+1),n.o===null&&(t.I=n.s),e&&(n.j=e.F.concat(n.j)),e=Nh(n,t,1e3),t.setTimeout(Math.round(.5*n.xa)+Math.round(.5*n.xa*Math.random())),pa(n.i,t),Eo(t,s,e)}function Os(n,e){n.na&&sa(n.na,function(t,s){j(e,s,t)}),n.h&&hh({},function(t,s){j(e,s,t)})}function Nh(n,e,t){t=Math.min(n.j.length,t);var s=n.h?ve(n.h.Va,n.h,n):null;e:{var i=n.j;let r=-1;for(;;){const o=["count="+t];r==-1?0<t?(r=i[0].g,o.push("ofs="+r)):r=0:o.push("ofs="+r);let a=!0;for(let l=0;l<t;l++){let c=i[l].g;const u=i[l].map;if(c-=r,0>c)r=Math.max(0,i[l].g-100),a=!1;else try{Bm(u,o,"req"+c+"_")}catch{s&&s(u)}}if(a){s=o.join("&");break e}}}return n=n.j.splice(0,t),e.F=n,s}function bh(n){if(!n.g&&!n.u){n.ba=1;var e=n.Ma;cs||Yu(),us||(cs(),us=!0),ca.add(e,n),n.A=0}}function va(n){return n.g||n.u||3<=n.A?!1:(n.ba++,n.u=Ds(ve(n.Ma,n),Vh(n,n.A)),n.A++,!0)}y.Ma=function(){if(this.u=null,Dh(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var n=2*this.S;this.l.info("BP detection timer enabled: "+n),this.B=Ds(ve(this.jb,this),n)}};y.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,we(10),cr(this),Dh(this))};function Ea(n){n.B!=null&&(S.clearTimeout(n.B),n.B=null)}function Dh(n){n.g=new Vs(n,n.l,"rpc",n.ba),n.o===null&&(n.g.I=n.s),n.g.O=0;var e=Ze(n.wa);j(e,"RID","rpc"),j(e,"SID",n.K),j(e,"AID",n.V),j(e,"CI",n.G?"0":"1"),!n.G&&n.qa&&j(e,"TO",n.qa),j(e,"TYPE","xmlhttp"),Os(n,e),n.o&&n.s&&ga(e,n.o,n.s),n.L&&n.g.setTimeout(n.L);var t=n.g;n=n.pa,t.L=1,t.A=rr(Ze(e)),t.u=null,t.S=!0,ah(t,n)}y.ib=function(){this.v!=null&&(this.v=null,cr(this),va(this),we(19))};function vi(n){n.v!=null&&(S.clearTimeout(n.v),n.v=null)}function kh(n,e){var t=null;if(n.g==e){vi(n),Ea(n),n.g=null;var s=2}else if(Io(n.i,e))t=e.F,vh(n.i,e),s=1;else return;if(n.H!=0){if(e.i)if(s==1){t=e.u?e.u.length:0,e=Date.now()-e.G;var i=n.C;s=tr(),de(s,new nh(s,t)),ur(n)}else bh(n);else if(i=e.s,i==3||i==0&&0<e.ca||!(s==1&&Hm(n,e)||s==2&&va(n)))switch(t&&0<t.length&&(e=n.i,e.i=e.i.concat(t)),i){case 1:Ct(n,5);break;case 4:Ct(n,10);break;case 3:Ct(n,6);break;default:Ct(n,2)}}}function Vh(n,e){let t=n.ab+Math.floor(Math.random()*n.hb);return n.isActive()||(t*=2),t*e}function Ct(n,e){if(n.l.info("Error code "+e),e==2){var t=null;n.h&&(t=null);var s=ve(n.pb,n);t||(t=new Pt("//www.google.com/images/cleardot.gif"),S.location&&S.location.protocol=="http"||gi(t,"https"),rr(t)),qm(t.toString(),s)}else we(2);n.H=0,n.h&&n.h.za(e),xh(n),Ph(n)}y.pb=function(n){n?(this.l.info("Successfully pinged google.com"),we(2)):(this.l.info("Failed to ping google.com"),we(1))};function xh(n){if(n.H=0,n.ma=[],n.h){const e=Eh(n.i);(e.length!=0||n.j.length!=0)&&($l(n.ma,e),$l(n.ma,n.j),n.i.i.length=0,ta(n.j),n.j.length=0),n.h.ya()}}function Mh(n,e,t){var s=t instanceof Pt?Ze(t):new Pt(t);if(s.g!="")e&&(s.g=e+"."+s.g),yi(s,s.m);else{var i=S.location;s=i.protocol,e=e?e+"."+i.hostname:i.hostname,i=+i.port;var r=new Pt(null);s&&gi(r,s),e&&(r.g=e),i&&yi(r,i),t&&(r.l=t),s=r}return t=n.F,e=n.Da,t&&e&&j(s,t,e),j(s,"VER",n.ra),Os(n,s),s}function Oh(n,e,t){if(e&&!n.J)throw Error("Can't create secondary domain capable XhrIo object.");return e=n.Ha&&!n.va?new K(new or({ob:t})):new K(n.va),e.Oa(n.J),e}y.isActive=function(){return!!this.h&&this.h.isActive(this)};function Lh(){}y=Lh.prototype;y.Ba=function(){};y.Aa=function(){};y.za=function(){};y.ya=function(){};y.isActive=function(){return!0};y.Va=function(){};function Ei(){if(ln&&!(10<=Number(om)))throw Error("Environmental error: no available transport.")}Ei.prototype.g=function(n,e){return new be(n,e)};function be(n,e){oe.call(this),this.g=new Sh(e),this.l=n,this.h=e&&e.messageUrlParams||null,n=e&&e.messageHeaders||null,e&&e.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=e&&e.initMessageHeaders||null,e&&e.messageContentType&&(n?n["X-WebChannel-Content-Type"]=e.messageContentType:n={"X-WebChannel-Content-Type":e.messageContentType}),e&&e.Ca&&(n?n["X-WebChannel-Client-Profile"]=e.Ca:n={"X-WebChannel-Client-Profile":e.Ca}),this.g.U=n,(n=e&&e.cc)&&!as(n)&&(this.g.o=n),this.A=e&&e.supportsCrossDomainXhr||!1,this.v=e&&e.sendRawJson||!1,(e=e&&e.httpSessionIdParam)&&!as(e)&&(this.g.F=e,n=this.h,n!==null&&e in n&&(n=this.h,e in n&&delete n[e])),this.j=new Rn(this)}ae(be,oe);be.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var n=this.g,e=this.l,t=this.h||void 0;we(0),n.Y=e,n.na=t||{},n.G=n.aa,n.I=Mh(n,null,n.Y),ur(n)};be.prototype.close=function(){ya(this.g)};be.prototype.u=function(n){var e=this.g;if(typeof n=="string"){var t={};t.__data__=n,n=t}else this.v&&(t={},t.__data__=la(n),n=t);e.j.push(new Om(e.fb++,n)),e.H==3&&ur(e)};be.prototype.N=function(){this.g.h=null,delete this.j,ya(this.g),delete this.g,be.$.N.call(this)};function Fh(n){fa.call(this),n.__headers__&&(this.headers=n.__headers__,this.statusCode=n.__status__,delete n.__headers__,delete n.__status__);var e=n.__sm__;if(e){e:{for(const t in e){n=t;break e}n=void 0}(this.i=n)&&(n=this.i,e=e!==null&&n in e?e[n]:void 0),this.data=e}else this.data=n}ae(Fh,fa);function Uh(){_a.call(this),this.status=1}ae(Uh,_a);function Rn(n){this.g=n}ae(Rn,Lh);Rn.prototype.Ba=function(){de(this.g,"a")};Rn.prototype.Aa=function(n){de(this.g,new Fh(n))};Rn.prototype.za=function(n){de(this.g,new Uh)};Rn.prototype.ya=function(){de(this.g,"b")};function Km(){this.blockSize=-1}function Fe(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}ae(Fe,Km);Fe.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function Hr(n,e,t){t||(t=0);var s=Array(16);if(typeof e=="string")for(var i=0;16>i;++i)s[i]=e.charCodeAt(t++)|e.charCodeAt(t++)<<8|e.charCodeAt(t++)<<16|e.charCodeAt(t++)<<24;else for(i=0;16>i;++i)s[i]=e[t++]|e[t++]<<8|e[t++]<<16|e[t++]<<24;e=n.g[0],t=n.g[1],i=n.g[2];var r=n.g[3],o=e+(r^t&(i^r))+s[0]+3614090360&4294967295;e=t+(o<<7&4294967295|o>>>25),o=r+(i^e&(t^i))+s[1]+3905402710&4294967295,r=e+(o<<12&4294967295|o>>>20),o=i+(t^r&(e^t))+s[2]+606105819&4294967295,i=r+(o<<17&4294967295|o>>>15),o=t+(e^i&(r^e))+s[3]+3250441966&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(r^t&(i^r))+s[4]+4118548399&4294967295,e=t+(o<<7&4294967295|o>>>25),o=r+(i^e&(t^i))+s[5]+1200080426&4294967295,r=e+(o<<12&4294967295|o>>>20),o=i+(t^r&(e^t))+s[6]+2821735955&4294967295,i=r+(o<<17&4294967295|o>>>15),o=t+(e^i&(r^e))+s[7]+4249261313&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(r^t&(i^r))+s[8]+1770035416&4294967295,e=t+(o<<7&4294967295|o>>>25),o=r+(i^e&(t^i))+s[9]+2336552879&4294967295,r=e+(o<<12&4294967295|o>>>20),o=i+(t^r&(e^t))+s[10]+4294925233&4294967295,i=r+(o<<17&4294967295|o>>>15),o=t+(e^i&(r^e))+s[11]+2304563134&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(r^t&(i^r))+s[12]+1804603682&4294967295,e=t+(o<<7&4294967295|o>>>25),o=r+(i^e&(t^i))+s[13]+4254626195&4294967295,r=e+(o<<12&4294967295|o>>>20),o=i+(t^r&(e^t))+s[14]+2792965006&4294967295,i=r+(o<<17&4294967295|o>>>15),o=t+(e^i&(r^e))+s[15]+1236535329&4294967295,t=i+(o<<22&4294967295|o>>>10),o=e+(i^r&(t^i))+s[1]+4129170786&4294967295,e=t+(o<<5&4294967295|o>>>27),o=r+(t^i&(e^t))+s[6]+3225465664&4294967295,r=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(r^e))+s[11]+643717713&4294967295,i=r+(o<<14&4294967295|o>>>18),o=t+(r^e&(i^r))+s[0]+3921069994&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^r&(t^i))+s[5]+3593408605&4294967295,e=t+(o<<5&4294967295|o>>>27),o=r+(t^i&(e^t))+s[10]+38016083&4294967295,r=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(r^e))+s[15]+3634488961&4294967295,i=r+(o<<14&4294967295|o>>>18),o=t+(r^e&(i^r))+s[4]+3889429448&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^r&(t^i))+s[9]+568446438&4294967295,e=t+(o<<5&4294967295|o>>>27),o=r+(t^i&(e^t))+s[14]+3275163606&4294967295,r=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(r^e))+s[3]+4107603335&4294967295,i=r+(o<<14&4294967295|o>>>18),o=t+(r^e&(i^r))+s[8]+1163531501&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(i^r&(t^i))+s[13]+2850285829&4294967295,e=t+(o<<5&4294967295|o>>>27),o=r+(t^i&(e^t))+s[2]+4243563512&4294967295,r=e+(o<<9&4294967295|o>>>23),o=i+(e^t&(r^e))+s[7]+1735328473&4294967295,i=r+(o<<14&4294967295|o>>>18),o=t+(r^e&(i^r))+s[12]+2368359562&4294967295,t=i+(o<<20&4294967295|o>>>12),o=e+(t^i^r)+s[5]+4294588738&4294967295,e=t+(o<<4&4294967295|o>>>28),o=r+(e^t^i)+s[8]+2272392833&4294967295,r=e+(o<<11&4294967295|o>>>21),o=i+(r^e^t)+s[11]+1839030562&4294967295,i=r+(o<<16&4294967295|o>>>16),o=t+(i^r^e)+s[14]+4259657740&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^r)+s[1]+2763975236&4294967295,e=t+(o<<4&4294967295|o>>>28),o=r+(e^t^i)+s[4]+1272893353&4294967295,r=e+(o<<11&4294967295|o>>>21),o=i+(r^e^t)+s[7]+4139469664&4294967295,i=r+(o<<16&4294967295|o>>>16),o=t+(i^r^e)+s[10]+3200236656&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^r)+s[13]+681279174&4294967295,e=t+(o<<4&4294967295|o>>>28),o=r+(e^t^i)+s[0]+3936430074&4294967295,r=e+(o<<11&4294967295|o>>>21),o=i+(r^e^t)+s[3]+3572445317&4294967295,i=r+(o<<16&4294967295|o>>>16),o=t+(i^r^e)+s[6]+76029189&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(t^i^r)+s[9]+3654602809&4294967295,e=t+(o<<4&4294967295|o>>>28),o=r+(e^t^i)+s[12]+3873151461&4294967295,r=e+(o<<11&4294967295|o>>>21),o=i+(r^e^t)+s[15]+530742520&4294967295,i=r+(o<<16&4294967295|o>>>16),o=t+(i^r^e)+s[2]+3299628645&4294967295,t=i+(o<<23&4294967295|o>>>9),o=e+(i^(t|~r))+s[0]+4096336452&4294967295,e=t+(o<<6&4294967295|o>>>26),o=r+(t^(e|~i))+s[7]+1126891415&4294967295,r=e+(o<<10&4294967295|o>>>22),o=i+(e^(r|~t))+s[14]+2878612391&4294967295,i=r+(o<<15&4294967295|o>>>17),o=t+(r^(i|~e))+s[5]+4237533241&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~r))+s[12]+1700485571&4294967295,e=t+(o<<6&4294967295|o>>>26),o=r+(t^(e|~i))+s[3]+2399980690&4294967295,r=e+(o<<10&4294967295|o>>>22),o=i+(e^(r|~t))+s[10]+4293915773&4294967295,i=r+(o<<15&4294967295|o>>>17),o=t+(r^(i|~e))+s[1]+2240044497&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~r))+s[8]+1873313359&4294967295,e=t+(o<<6&4294967295|o>>>26),o=r+(t^(e|~i))+s[15]+4264355552&4294967295,r=e+(o<<10&4294967295|o>>>22),o=i+(e^(r|~t))+s[6]+2734768916&4294967295,i=r+(o<<15&4294967295|o>>>17),o=t+(r^(i|~e))+s[13]+1309151649&4294967295,t=i+(o<<21&4294967295|o>>>11),o=e+(i^(t|~r))+s[4]+4149444226&4294967295,e=t+(o<<6&4294967295|o>>>26),o=r+(t^(e|~i))+s[11]+3174756917&4294967295,r=e+(o<<10&4294967295|o>>>22),o=i+(e^(r|~t))+s[2]+718787259&4294967295,i=r+(o<<15&4294967295|o>>>17),o=t+(r^(i|~e))+s[9]+3951481745&4294967295,n.g[0]=n.g[0]+e&4294967295,n.g[1]=n.g[1]+(i+(o<<21&4294967295|o>>>11))&4294967295,n.g[2]=n.g[2]+i&4294967295,n.g[3]=n.g[3]+r&4294967295}Fe.prototype.j=function(n,e){e===void 0&&(e=n.length);for(var t=e-this.blockSize,s=this.m,i=this.h,r=0;r<e;){if(i==0)for(;r<=t;)Hr(this,n,r),r+=this.blockSize;if(typeof n=="string"){for(;r<e;)if(s[i++]=n.charCodeAt(r++),i==this.blockSize){Hr(this,s),i=0;break}}else for(;r<e;)if(s[i++]=n[r++],i==this.blockSize){Hr(this,s),i=0;break}}this.h=i,this.i+=e};Fe.prototype.l=function(){var n=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);n[0]=128;for(var e=1;e<n.length-8;++e)n[e]=0;var t=8*this.i;for(e=n.length-8;e<n.length;++e)n[e]=t&255,t/=256;for(this.j(n),n=Array(16),e=t=0;4>e;++e)for(var s=0;32>s;s+=8)n[t++]=this.g[e]>>>s&255;return n};function U(n,e){this.h=e;for(var t=[],s=!0,i=n.length-1;0<=i;i--){var r=n[i]|0;s&&r==e||(t[i]=r,s=!1)}this.g=t}var Qm={};function Ta(n){return-128<=n&&128>n?sm(n,function(e){return new U([e|0],0>e?-1:0)}):new U([n|0],0>n?-1:0)}function qe(n){if(isNaN(n)||!isFinite(n))return Zt;if(0>n)return ce(qe(-n));for(var e=[],t=1,s=0;n>=t;s++)e[s]=n/t|0,t*=wo;return new U(e,0)}function Bh(n,e){if(n.length==0)throw Error("number format error: empty string");if(e=e||10,2>e||36<e)throw Error("radix out of range: "+e);if(n.charAt(0)=="-")return ce(Bh(n.substring(1),e));if(0<=n.indexOf("-"))throw Error('number format error: interior "-" character');for(var t=qe(Math.pow(e,8)),s=Zt,i=0;i<n.length;i+=8){var r=Math.min(8,n.length-i),o=parseInt(n.substring(i,i+r),e);8>r?(r=qe(Math.pow(e,r)),s=s.R(r).add(qe(o))):(s=s.R(t),s=s.add(qe(o)))}return s}var wo=4294967296,Zt=Ta(0),Co=Ta(1),nc=Ta(16777216);y=U.prototype;y.ea=function(){if(De(this))return-ce(this).ea();for(var n=0,e=1,t=0;t<this.g.length;t++){var s=this.D(t);n+=(0<=s?s:wo+s)*e,e*=wo}return n};y.toString=function(n){if(n=n||10,2>n||36<n)throw Error("radix out of range: "+n);if(Ye(this))return"0";if(De(this))return"-"+ce(this).toString(n);for(var e=qe(Math.pow(n,6)),t=this,s="";;){var i=Ii(t,e).g;t=Ti(t,i.R(e));var r=((0<t.g.length?t.g[0]:t.h)>>>0).toString(n);if(t=i,Ye(t))return r+s;for(;6>r.length;)r="0"+r;s=r+s}};y.D=function(n){return 0>n?0:n<this.g.length?this.g[n]:this.h};function Ye(n){if(n.h!=0)return!1;for(var e=0;e<n.g.length;e++)if(n.g[e]!=0)return!1;return!0}function De(n){return n.h==-1}y.X=function(n){return n=Ti(this,n),De(n)?-1:Ye(n)?0:1};function ce(n){for(var e=n.g.length,t=[],s=0;s<e;s++)t[s]=~n.g[s];return new U(t,~n.h).add(Co)}y.abs=function(){return De(this)?ce(this):this};y.add=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],s=0,i=0;i<=e;i++){var r=s+(this.D(i)&65535)+(n.D(i)&65535),o=(r>>>16)+(this.D(i)>>>16)+(n.D(i)>>>16);s=o>>>16,r&=65535,o&=65535,t[i]=o<<16|r}return new U(t,t[t.length-1]&-2147483648?-1:0)};function Ti(n,e){return n.add(ce(e))}y.R=function(n){if(Ye(this)||Ye(n))return Zt;if(De(this))return De(n)?ce(this).R(ce(n)):ce(ce(this).R(n));if(De(n))return ce(this.R(ce(n)));if(0>this.X(nc)&&0>n.X(nc))return qe(this.ea()*n.ea());for(var e=this.g.length+n.g.length,t=[],s=0;s<2*e;s++)t[s]=0;for(s=0;s<this.g.length;s++)for(var i=0;i<n.g.length;i++){var r=this.D(s)>>>16,o=this.D(s)&65535,a=n.D(i)>>>16,l=n.D(i)&65535;t[2*s+2*i]+=o*l,ii(t,2*s+2*i),t[2*s+2*i+1]+=r*l,ii(t,2*s+2*i+1),t[2*s+2*i+1]+=o*a,ii(t,2*s+2*i+1),t[2*s+2*i+2]+=r*a,ii(t,2*s+2*i+2)}for(s=0;s<e;s++)t[s]=t[2*s+1]<<16|t[2*s];for(s=e;s<2*e;s++)t[s]=0;return new U(t,0)};function ii(n,e){for(;(n[e]&65535)!=n[e];)n[e+1]+=n[e]>>>16,n[e]&=65535,e++}function Ln(n,e){this.g=n,this.h=e}function Ii(n,e){if(Ye(e))throw Error("division by zero");if(Ye(n))return new Ln(Zt,Zt);if(De(n))return e=Ii(ce(n),e),new Ln(ce(e.g),ce(e.h));if(De(e))return e=Ii(n,ce(e)),new Ln(ce(e.g),e.h);if(30<n.g.length){if(De(n)||De(e))throw Error("slowDivide_ only works with positive integers.");for(var t=Co,s=e;0>=s.X(n);)t=sc(t),s=sc(s);var i=$t(t,1),r=$t(s,1);for(s=$t(s,2),t=$t(t,2);!Ye(s);){var o=r.add(s);0>=o.X(n)&&(i=i.add(t),r=o),s=$t(s,1),t=$t(t,1)}return e=Ti(n,i.R(e)),new Ln(i,e)}for(i=Zt;0<=n.X(e);){for(t=Math.max(1,Math.floor(n.ea()/e.ea())),s=Math.ceil(Math.log(t)/Math.LN2),s=48>=s?1:Math.pow(2,s-48),r=qe(t),o=r.R(e);De(o)||0<o.X(n);)t-=s,r=qe(t),o=r.R(e);Ye(r)&&(r=Co),i=i.add(r),n=Ti(n,o)}return new Ln(i,n)}y.gb=function(n){return Ii(this,n).h};y.and=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],s=0;s<e;s++)t[s]=this.D(s)&n.D(s);return new U(t,this.h&n.h)};y.or=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],s=0;s<e;s++)t[s]=this.D(s)|n.D(s);return new U(t,this.h|n.h)};y.xor=function(n){for(var e=Math.max(this.g.length,n.g.length),t=[],s=0;s<e;s++)t[s]=this.D(s)^n.D(s);return new U(t,this.h^n.h)};function sc(n){for(var e=n.g.length+1,t=[],s=0;s<e;s++)t[s]=n.D(s)<<1|n.D(s-1)>>>31;return new U(t,n.h)}function $t(n,e){var t=e>>5;e%=32;for(var s=n.g.length-t,i=[],r=0;r<s;r++)i[r]=0<e?n.D(r+t)>>>e|n.D(r+t+1)<<32-e:n.D(r+t);return new U(i,n.h)}Ei.prototype.createWebChannel=Ei.prototype.g;be.prototype.send=be.prototype.u;be.prototype.open=be.prototype.m;be.prototype.close=be.prototype.close;nr.NO_ERROR=0;nr.TIMEOUT=8;nr.HTTP_ERROR=6;sh.COMPLETE="complete";ih.EventType=ks;ks.OPEN="a";ks.CLOSE="b";ks.ERROR="c";ks.MESSAGE="d";oe.prototype.listen=oe.prototype.O;K.prototype.listenOnce=K.prototype.P;K.prototype.getLastError=K.prototype.Sa;K.prototype.getLastErrorCode=K.prototype.Ia;K.prototype.getStatus=K.prototype.da;K.prototype.getResponseJson=K.prototype.Wa;K.prototype.getResponseText=K.prototype.ja;K.prototype.send=K.prototype.ha;K.prototype.setWithCredentials=K.prototype.Oa;Fe.prototype.digest=Fe.prototype.l;Fe.prototype.reset=Fe.prototype.reset;Fe.prototype.update=Fe.prototype.j;U.prototype.add=U.prototype.add;U.prototype.multiply=U.prototype.R;U.prototype.modulo=U.prototype.gb;U.prototype.compare=U.prototype.X;U.prototype.toNumber=U.prototype.ea;U.prototype.toString=U.prototype.toString;U.prototype.getBits=U.prototype.D;U.fromNumber=qe;U.fromString=Bh;var Ym=function(){return new Ei},Xm=function(){return tr()},Kr=nr,Jm=sh,Zm=Ut,ic={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},ri=ih,eg=K,tg=Fe,en=U;const rc="@firebase/firestore";/**
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
 */class ge{constructor(e){this.uid=e}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(e){return e.uid===this.uid}}ge.UNAUTHENTICATED=new ge(null),ge.GOOGLE_CREDENTIALS=new ge("google-credentials-uid"),ge.FIRST_PARTY=new ge("first-party-uid"),ge.MOCK_USER=new ge("mock-user");/**
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
 */let Sn="10.7.0";/**
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
 */const Dt=new Jo("@firebase/firestore");function Fn(){return Dt.logLevel}function T(n,...e){if(Dt.logLevel<=x.DEBUG){const t=e.map(Ia);Dt.debug(`Firestore (${Sn}): ${n}`,...t)}}function et(n,...e){if(Dt.logLevel<=x.ERROR){const t=e.map(Ia);Dt.error(`Firestore (${Sn}): ${n}`,...t)}}function cn(n,...e){if(Dt.logLevel<=x.WARN){const t=e.map(Ia);Dt.warn(`Firestore (${Sn}): ${n}`,...t)}}function Ia(n){if(typeof n=="string")return n;try{/**
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
*/return function(t){return JSON.stringify(t)}(n)}catch{return n}}/**
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
 */function C(n="Unexpected state"){const e=`FIRESTORE (${Sn}) INTERNAL ASSERTION FAILED: `+n;throw et(e),new Error(e)}function F(n,e){n||C()}function P(n,e){return n}/**
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
 */const _={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class I extends Cn{constructor(e,t){super(e,t),this.code=e,this.message=t,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class We{constructor(){this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}}/**
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
 */class qh{constructor(e,t){this.user=t,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${e}`)}}class ng{getToken(){return Promise.resolve(null)}invalidateToken(){}start(e,t){e.enqueueRetryable(()=>t(ge.UNAUTHENTICATED))}shutdown(){}}class sg{constructor(e){this.token=e,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(e,t){this.changeListener=t,e.enqueueRetryable(()=>t(this.token.user))}shutdown(){this.changeListener=null}}class ig{constructor(e){this.t=e,this.currentUser=ge.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(e,t){let s=this.i;const i=l=>this.i!==s?(s=this.i,t(l)):Promise.resolve();let r=new We;this.o=()=>{this.i++,this.currentUser=this.u(),r.resolve(),r=new We,e.enqueueRetryable(()=>i(this.currentUser))};const o=()=>{const l=r;e.enqueueRetryable(async()=>{await l.promise,await i(this.currentUser)})},a=l=>{T("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=l,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(l=>a(l)),setTimeout(()=>{if(!this.auth){const l=this.t.getImmediate({optional:!0});l?a(l):(T("FirebaseAuthCredentialsProvider","Auth not yet detected"),r.resolve(),r=new We)}},0),o()}getToken(){const e=this.i,t=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(t).then(s=>this.i!==e?(T("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):s?(F(typeof s.accessToken=="string"),new qh(s.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const e=this.auth&&this.auth.getUid();return F(e===null||typeof e=="string"),new ge(e)}}class rg{constructor(e,t,s){this.l=e,this.h=t,this.P=s,this.type="FirstParty",this.user=ge.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const e=this.T();return e&&this.I.set("Authorization",e),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class og{constructor(e,t,s){this.l=e,this.h=t,this.P=s}getToken(){return Promise.resolve(new rg(this.l,this.h,this.P))}start(e,t){e.enqueueRetryable(()=>t(ge.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class ag{constructor(e){this.value=e,this.type="AppCheck",this.headers=new Map,e&&e.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class lg{constructor(e){this.A=e,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(e,t){const s=r=>{r.error!=null&&T("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${r.error.message}`);const o=r.token!==this.R;return this.R=r.token,T("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?t(r.token):Promise.resolve()};this.o=r=>{e.enqueueRetryable(()=>s(r))};const i=r=>{T("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=r,this.appCheck.addTokenListener(this.o)};this.A.onInit(r=>i(r)),setTimeout(()=>{if(!this.appCheck){const r=this.A.getImmediate({optional:!0});r?i(r):T("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const e=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(e).then(t=>t?(F(typeof t.token=="string"),this.R=t.token,new ag(t.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */function cg(n){const e=typeof self<"u"&&(self.crypto||self.msCrypto),t=new Uint8Array(n);if(e&&typeof e.getRandomValues=="function")e.getRandomValues(t);else for(let s=0;s<n;s++)t[s]=Math.floor(256*Math.random());return t}/**
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
 */class Wh{static newId(){const e="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",t=Math.floor(256/e.length)*e.length;let s="";for(;s.length<20;){const i=cg(40);for(let r=0;r<i.length;++r)s.length<20&&i[r]<t&&(s+=e.charAt(i[r]%e.length))}return s}}function L(n,e){return n<e?-1:n>e?1:0}function un(n,e,t){return n.length===e.length&&n.every((s,i)=>t(s,e[i]))}/**
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
 */class te{constructor(e,t){if(this.seconds=e,this.nanoseconds=t,t<0)throw new I(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(t>=1e9)throw new I(_.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+t);if(e<-62135596800)throw new I(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e);if(e>=253402300800)throw new I(_.INVALID_ARGUMENT,"Timestamp seconds out of range: "+e)}static now(){return te.fromMillis(Date.now())}static fromDate(e){return te.fromMillis(e.getTime())}static fromMillis(e){const t=Math.floor(e/1e3),s=Math.floor(1e6*(e-1e3*t));return new te(t,s)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(e){return this.seconds===e.seconds?L(this.nanoseconds,e.nanoseconds):L(this.seconds,e.seconds)}isEqual(e){return e.seconds===this.seconds&&e.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const e=this.seconds- -62135596800;return String(e).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class R{constructor(e){this.timestamp=e}static fromTimestamp(e){return new R(e)}static min(){return new R(new te(0,0))}static max(){return new R(new te(253402300799,999999999))}compareTo(e){return this.timestamp._compareTo(e.timestamp)}isEqual(e){return this.timestamp.isEqual(e.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class ps{constructor(e,t,s){t===void 0?t=0:t>e.length&&C(),s===void 0?s=e.length-t:s>e.length-t&&C(),this.segments=e,this.offset=t,this.len=s}get length(){return this.len}isEqual(e){return ps.comparator(this,e)===0}child(e){const t=this.segments.slice(this.offset,this.limit());return e instanceof ps?e.forEach(s=>{t.push(s)}):t.push(e),this.construct(t)}limit(){return this.offset+this.length}popFirst(e){return e=e===void 0?1:e,this.construct(this.segments,this.offset+e,this.length-e)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(e){return this.segments[this.offset+e]}isEmpty(){return this.length===0}isPrefixOf(e){if(e.length<this.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}isImmediateParentOf(e){if(this.length+1!==e.length)return!1;for(let t=0;t<this.length;t++)if(this.get(t)!==e.get(t))return!1;return!0}forEach(e){for(let t=this.offset,s=this.limit();t<s;t++)e(this.segments[t])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(e,t){const s=Math.min(e.length,t.length);for(let i=0;i<s;i++){const r=e.get(i),o=t.get(i);if(r<o)return-1;if(r>o)return 1}return e.length<t.length?-1:e.length>t.length?1:0}}class z extends ps{construct(e,t,s){return new z(e,t,s)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...e){const t=[];for(const s of e){if(s.indexOf("//")>=0)throw new I(_.INVALID_ARGUMENT,`Invalid segment (${s}). Paths must not contain // in them.`);t.push(...s.split("/").filter(i=>i.length>0))}return new z(t)}static emptyPath(){return new z([])}}const ug=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class he extends ps{construct(e,t,s){return new he(e,t,s)}static isValidIdentifier(e){return ug.test(e)}canonicalString(){return this.toArray().map(e=>(e=e.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),he.isValidIdentifier(e)||(e="`"+e+"`"),e)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new he(["__name__"])}static fromServerFormat(e){const t=[];let s="",i=0;const r=()=>{if(s.length===0)throw new I(_.INVALID_ARGUMENT,`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);t.push(s),s=""};let o=!1;for(;i<e.length;){const a=e[i];if(a==="\\"){if(i+1===e.length)throw new I(_.INVALID_ARGUMENT,"Path has trailing escape character: "+e);const l=e[i+1];if(l!=="\\"&&l!=="."&&l!=="`")throw new I(_.INVALID_ARGUMENT,"Path has invalid escape sequence: "+e);s+=l,i+=2}else a==="`"?(o=!o,i++):a!=="."||o?(s+=a,i++):(r(),i++)}if(r(),o)throw new I(_.INVALID_ARGUMENT,"Unterminated ` in path: "+e);return new he(t)}static emptyPath(){return new he([])}}/**
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
 */class w{constructor(e){this.path=e}static fromPath(e){return new w(z.fromString(e))}static fromName(e){return new w(z.fromString(e).popFirst(5))}static empty(){return new w(z.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(e){return this.path.length>=2&&this.path.get(this.path.length-2)===e}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(e){return e!==null&&z.comparator(this.path,e.path)===0}toString(){return this.path.toString()}static comparator(e,t){return z.comparator(e.path,t.path)}static isDocumentKey(e){return e.length%2==0}static fromSegments(e){return new w(new z(e.slice()))}}function hg(n,e){const t=n.toTimestamp().seconds,s=n.toTimestamp().nanoseconds+1,i=R.fromTimestamp(s===1e9?new te(t+1,0):new te(t,s));return new dt(i,w.empty(),e)}function dg(n){return new dt(n.readTime,n.key,-1)}class dt{constructor(e,t,s){this.readTime=e,this.documentKey=t,this.largestBatchId=s}static min(){return new dt(R.min(),w.empty(),-1)}static max(){return new dt(R.max(),w.empty(),-1)}}function fg(n,e){let t=n.readTime.compareTo(e.readTime);return t!==0?t:(t=w.comparator(n.documentKey,e.documentKey),t!==0?t:L(n.largestBatchId,e.largestBatchId))}/**
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
 */const _g="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class pg{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(e){this.onCommittedListeners.push(e)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(e=>e())}}/**
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
 */async function Ls(n){if(n.code!==_.FAILED_PRECONDITION||n.message!==_g)throw n;T("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class p{constructor(e){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,e(t=>{this.isDone=!0,this.result=t,this.nextCallback&&this.nextCallback(t)},t=>{this.isDone=!0,this.error=t,this.catchCallback&&this.catchCallback(t)})}catch(e){return this.next(void 0,e)}next(e,t){return this.callbackAttached&&C(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(t,this.error):this.wrapSuccess(e,this.result):new p((s,i)=>{this.nextCallback=r=>{this.wrapSuccess(e,r).next(s,i)},this.catchCallback=r=>{this.wrapFailure(t,r).next(s,i)}})}toPromise(){return new Promise((e,t)=>{this.next(e,t)})}wrapUserFunction(e){try{const t=e();return t instanceof p?t:p.resolve(t)}catch(t){return p.reject(t)}}wrapSuccess(e,t){return e?this.wrapUserFunction(()=>e(t)):p.resolve(t)}wrapFailure(e,t){return e?this.wrapUserFunction(()=>e(t)):p.reject(t)}static resolve(e){return new p((t,s)=>{t(e)})}static reject(e){return new p((t,s)=>{s(e)})}static waitFor(e){return new p((t,s)=>{let i=0,r=0,o=!1;e.forEach(a=>{++i,a.next(()=>{++r,o&&r===i&&t()},l=>s(l))}),o=!0,r===i&&t()})}static or(e){let t=p.resolve(!1);for(const s of e)t=t.next(i=>i?p.resolve(i):s());return t}static forEach(e,t){const s=[];return e.forEach((i,r)=>{s.push(t.call(this,i,r))}),this.waitFor(s)}static mapArray(e,t){return new p((s,i)=>{const r=e.length,o=new Array(r);let a=0;for(let l=0;l<r;l++){const c=l;t(e[c]).next(u=>{o[c]=u,++a,a===r&&s(o)},u=>i(u))}})}static doWhile(e,t){return new p((s,i)=>{const r=()=>{e()===!0?t().next(()=>{r()},i):s()};r()})}}function Fs(n){return n.name==="IndexedDbTransactionError"}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class wa{constructor(e,t){this.previousValue=e,t&&(t.sequenceNumberHandler=s=>this.se(s),this.oe=s=>t.writeSequenceNumber(s))}se(e){return this.previousValue=Math.max(e,this.previousValue),this.previousValue}next(){const e=++this.previousValue;return this.oe&&this.oe(e),e}}wa._e=-1;function Us(n){return n==null}function wi(n){return n===0&&1/n==-1/0}function mg(n){return typeof n=="number"&&Number.isInteger(n)&&!wi(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function oc(n){let e=0;for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e++;return e}function Bt(n,e){for(const t in n)Object.prototype.hasOwnProperty.call(n,t)&&e(t,n[t])}function jh(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}/**
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
 */let X=class Ao{constructor(e,t){this.comparator=e,this.root=t||lt.EMPTY}insert(e,t){return new Ao(this.comparator,this.root.insert(e,t,this.comparator).copy(null,null,lt.BLACK,null,null))}remove(e){return new Ao(this.comparator,this.root.remove(e,this.comparator).copy(null,null,lt.BLACK,null,null))}get(e){let t=this.root;for(;!t.isEmpty();){const s=this.comparator(e,t.key);if(s===0)return t.value;s<0?t=t.left:s>0&&(t=t.right)}return null}indexOf(e){let t=0,s=this.root;for(;!s.isEmpty();){const i=this.comparator(e,s.key);if(i===0)return t+s.left.size;i<0?s=s.left:(t+=s.left.size+1,s=s.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(e){return this.root.inorderTraversal(e)}forEach(e){this.inorderTraversal((t,s)=>(e(t,s),!1))}toString(){const e=[];return this.inorderTraversal((t,s)=>(e.push(`${t}:${s}`),!1)),`{${e.join(", ")}}`}reverseTraversal(e){return this.root.reverseTraversal(e)}getIterator(){return new oi(this.root,null,this.comparator,!1)}getIteratorFrom(e){return new oi(this.root,e,this.comparator,!1)}getReverseIterator(){return new oi(this.root,null,this.comparator,!0)}getReverseIteratorFrom(e){return new oi(this.root,e,this.comparator,!0)}},oi=class{constructor(e,t,s,i){this.isReverse=i,this.nodeStack=[];let r=1;for(;!e.isEmpty();)if(r=t?s(e.key,t):1,t&&i&&(r*=-1),r<0)e=this.isReverse?e.left:e.right;else{if(r===0){this.nodeStack.push(e);break}this.nodeStack.push(e),e=this.isReverse?e.right:e.left}}getNext(){let e=this.nodeStack.pop();const t={key:e.key,value:e.value};if(this.isReverse)for(e=e.left;!e.isEmpty();)this.nodeStack.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack.push(e),e=e.left;return t}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const e=this.nodeStack[this.nodeStack.length-1];return{key:e.key,value:e.value}}},lt=class Qe{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??Qe.RED,this.left=i??Qe.EMPTY,this.right=r??Qe.EMPTY,this.size=this.left.size+1+this.right.size}copy(e,t,s,i,r){return new Qe(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return i=r<0?i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i.copy(null,t,null,null,null):i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp()}removeMin(){if(this.left.isEmpty())return Qe.EMPTY;let e=this;return e.left.isRed()||e.left.left.isRed()||(e=e.moveRedLeft()),e=e.copy(null,null,null,e.left.removeMin(),null),e.fixUp()}remove(e,t){let s,i=this;if(t(e,i.key)<0)i.left.isEmpty()||i.left.isRed()||i.left.left.isRed()||(i=i.moveRedLeft()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed()&&(i=i.rotateRight()),i.right.isEmpty()||i.right.isRed()||i.right.left.isRed()||(i=i.moveRedRight()),t(e,i.key)===0){if(i.right.isEmpty())return Qe.EMPTY;s=i.right.min(),i=i.copy(s.key,s.value,null,null,i.right.removeMin())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp()}isRed(){return this.color}fixUp(){let e=this;return e.right.isRed()&&!e.left.isRed()&&(e=e.rotateLeft()),e.left.isRed()&&e.left.left.isRed()&&(e=e.rotateRight()),e.left.isRed()&&e.right.isRed()&&(e=e.colorFlip()),e}moveRedLeft(){let e=this.colorFlip();return e.right.left.isRed()&&(e=e.copy(null,null,null,null,e.right.rotateRight()),e=e.rotateLeft(),e=e.colorFlip()),e}moveRedRight(){let e=this.colorFlip();return e.left.left.isRed()&&(e=e.rotateRight(),e=e.colorFlip()),e}rotateLeft(){const e=this.copy(null,null,Qe.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight(){const e=this.copy(null,null,Qe.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth(){const e=this.check();return Math.pow(2,e)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw C();const e=this.left.check();if(e!==this.right.check())throw C();return e+(this.isRed()?0:1)}};lt.EMPTY=null,lt.RED=!0,lt.BLACK=!1;lt.EMPTY=new class{constructor(){this.size=0}get key(){throw C()}get value(){throw C()}get color(){throw C()}get left(){throw C()}get right(){throw C()}copy(e,t,s,i,r){return this}insert(e,t,s){return new lt(e,t)}remove(e,t){return this}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class fe{constructor(e){this.comparator=e,this.data=new X(this.comparator)}has(e){return this.data.get(e)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(e){return this.data.indexOf(e)}forEach(e){this.data.inorderTraversal((t,s)=>(e(t),!1))}forEachInRange(e,t){const s=this.data.getIteratorFrom(e[0]);for(;s.hasNext();){const i=s.getNext();if(this.comparator(i.key,e[1])>=0)return;t(i.key)}}forEachWhile(e,t){let s;for(s=t!==void 0?this.data.getIteratorFrom(t):this.data.getIterator();s.hasNext();)if(!e(s.getNext().key))return}firstAfterOrEqual(e){const t=this.data.getIteratorFrom(e);return t.hasNext()?t.getNext().key:null}getIterator(){return new ac(this.data.getIterator())}getIteratorFrom(e){return new ac(this.data.getIteratorFrom(e))}add(e){return this.copy(this.data.remove(e).insert(e,!0))}delete(e){return this.has(e)?this.copy(this.data.remove(e)):this}isEmpty(){return this.data.isEmpty()}unionWith(e){let t=this;return t.size<e.size&&(t=e,e=this),e.forEach(s=>{t=t.add(s)}),t}isEqual(e){if(!(e instanceof fe)||this.size!==e.size)return!1;const t=this.data.getIterator(),s=e.data.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=s.getNext().key;if(this.comparator(i,r)!==0)return!1}return!0}toArray(){const e=[];return this.forEach(t=>{e.push(t)}),e}toString(){const e=[];return this.forEach(t=>e.push(t)),"SortedSet("+e.toString()+")"}copy(e){const t=new fe(this.comparator);return t.data=e,t}}class ac{constructor(e){this.iter=e}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class Pe{constructor(e){this.fields=e,e.sort(he.comparator)}static empty(){return new Pe([])}unionWith(e){let t=new fe(he.comparator);for(const s of this.fields)t=t.add(s);for(const s of e)t=t.add(s);return new Pe(t.toArray())}covers(e){for(const t of this.fields)if(t.isPrefixOf(e))return!0;return!1}isEqual(e){return un(this.fields,e.fields,(t,s)=>t.isEqual(s))}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */class zh extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class Te{constructor(e){this.binaryString=e}static fromBase64String(e){const t=function(i){try{return atob(i)}catch(r){throw typeof DOMException<"u"&&r instanceof DOMException?new zh("Invalid base64 string: "+r):r}}(e);return new Te(t)}static fromUint8Array(e){const t=function(i){let r="";for(let o=0;o<i.length;++o)r+=String.fromCharCode(i[o]);return r}(e);return new Te(t)}[Symbol.iterator](){let e=0;return{next:()=>e<this.binaryString.length?{value:this.binaryString.charCodeAt(e++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(t){return btoa(t)}(this.binaryString)}toUint8Array(){return function(t){const s=new Uint8Array(t.length);for(let i=0;i<t.length;i++)s[i]=t.charCodeAt(i);return s}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(e){return L(this.binaryString,e.binaryString)}isEqual(e){return this.binaryString===e.binaryString}}Te.EMPTY_BYTE_STRING=new Te("");const gg=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function ft(n){if(F(!!n),typeof n=="string"){let e=0;const t=gg.exec(n);if(F(!!t),t[1]){let i=t[1];i=(i+"000000000").substr(0,9),e=Number(i)}const s=new Date(n);return{seconds:Math.floor(s.getTime()/1e3),nanos:e}}return{seconds:Y(n.seconds),nanos:Y(n.nanos)}}function Y(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function kt(n){return typeof n=="string"?Te.fromBase64String(n):Te.fromUint8Array(n)}/**
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
 */function Ca(n){var e,t;return((t=(((e=n==null?void 0:n.mapValue)===null||e===void 0?void 0:e.fields)||{}).__type__)===null||t===void 0?void 0:t.stringValue)==="server_timestamp"}function Aa(n){const e=n.mapValue.fields.__previous_value__;return Ca(e)?Aa(e):e}function ms(n){const e=ft(n.mapValue.fields.__local_write_time__.timestampValue);return new te(e.seconds,e.nanos)}/**
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
 */class yg{constructor(e,t,s,i,r,o,a,l,c){this.databaseId=e,this.appId=t,this.persistenceKey=s,this.host=i,this.ssl=r,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=l,this.useFetchStreams=c}}class gs{constructor(e,t){this.projectId=e,this.database=t||"(default)"}static empty(){return new gs("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(e){return e instanceof gs&&e.projectId===this.projectId&&e.database===this.database}}/**
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
 */const ai={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function Vt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ca(n)?4:vg(n)?9007199254740991:10:C()}function $e(n,e){if(n===e)return!0;const t=Vt(n);if(t!==Vt(e))return!1;switch(t){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===e.booleanValue;case 4:return ms(n).isEqual(ms(e));case 3:return function(i,r){if(typeof i.timestampValue=="string"&&typeof r.timestampValue=="string"&&i.timestampValue.length===r.timestampValue.length)return i.timestampValue===r.timestampValue;const o=ft(i.timestampValue),a=ft(r.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,e);case 5:return n.stringValue===e.stringValue;case 6:return function(i,r){return kt(i.bytesValue).isEqual(kt(r.bytesValue))}(n,e);case 7:return n.referenceValue===e.referenceValue;case 8:return function(i,r){return Y(i.geoPointValue.latitude)===Y(r.geoPointValue.latitude)&&Y(i.geoPointValue.longitude)===Y(r.geoPointValue.longitude)}(n,e);case 2:return function(i,r){if("integerValue"in i&&"integerValue"in r)return Y(i.integerValue)===Y(r.integerValue);if("doubleValue"in i&&"doubleValue"in r){const o=Y(i.doubleValue),a=Y(r.doubleValue);return o===a?wi(o)===wi(a):isNaN(o)&&isNaN(a)}return!1}(n,e);case 9:return un(n.arrayValue.values||[],e.arrayValue.values||[],$e);case 10:return function(i,r){const o=i.mapValue.fields||{},a=r.mapValue.fields||{};if(oc(o)!==oc(a))return!1;for(const l in o)if(o.hasOwnProperty(l)&&(a[l]===void 0||!$e(o[l],a[l])))return!1;return!0}(n,e);default:return C()}}function ys(n,e){return(n.values||[]).find(t=>$e(t,e))!==void 0}function hn(n,e){if(n===e)return 0;const t=Vt(n),s=Vt(e);if(t!==s)return L(t,s);switch(t){case 0:case 9007199254740991:return 0;case 1:return L(n.booleanValue,e.booleanValue);case 2:return function(r,o){const a=Y(r.integerValue||r.doubleValue),l=Y(o.integerValue||o.doubleValue);return a<l?-1:a>l?1:a===l?0:isNaN(a)?isNaN(l)?0:-1:1}(n,e);case 3:return lc(n.timestampValue,e.timestampValue);case 4:return lc(ms(n),ms(e));case 5:return L(n.stringValue,e.stringValue);case 6:return function(r,o){const a=kt(r),l=kt(o);return a.compareTo(l)}(n.bytesValue,e.bytesValue);case 7:return function(r,o){const a=r.split("/"),l=o.split("/");for(let c=0;c<a.length&&c<l.length;c++){const u=L(a[c],l[c]);if(u!==0)return u}return L(a.length,l.length)}(n.referenceValue,e.referenceValue);case 8:return function(r,o){const a=L(Y(r.latitude),Y(o.latitude));return a!==0?a:L(Y(r.longitude),Y(o.longitude))}(n.geoPointValue,e.geoPointValue);case 9:return function(r,o){const a=r.values||[],l=o.values||[];for(let c=0;c<a.length&&c<l.length;++c){const u=hn(a[c],l[c]);if(u)return u}return L(a.length,l.length)}(n.arrayValue,e.arrayValue);case 10:return function(r,o){if(r===ai.mapValue&&o===ai.mapValue)return 0;if(r===ai.mapValue)return 1;if(o===ai.mapValue)return-1;const a=r.fields||{},l=Object.keys(a),c=o.fields||{},u=Object.keys(c);l.sort(),u.sort();for(let h=0;h<l.length&&h<u.length;++h){const d=L(l[h],u[h]);if(d!==0)return d;const f=hn(a[l[h]],c[u[h]]);if(f!==0)return f}return L(l.length,u.length)}(n.mapValue,e.mapValue);default:throw C()}}function lc(n,e){if(typeof n=="string"&&typeof e=="string"&&n.length===e.length)return L(n,e);const t=ft(n),s=ft(e),i=L(t.seconds,s.seconds);return i!==0?i:L(t.nanos,s.nanos)}function dn(n){return Ro(n)}function Ro(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(t){const s=ft(t);return`time(${s.seconds},${s.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(t){return kt(t).toBase64()}(n.bytesValue):"referenceValue"in n?function(t){return w.fromName(t).toString()}(n.referenceValue):"geoPointValue"in n?function(t){return`geo(${t.latitude},${t.longitude})`}(n.geoPointValue):"arrayValue"in n?function(t){let s="[",i=!0;for(const r of t.values||[])i?i=!1:s+=",",s+=Ro(r);return s+"]"}(n.arrayValue):"mapValue"in n?function(t){const s=Object.keys(t.fields||{}).sort();let i="{",r=!0;for(const o of s)r?r=!1:i+=",",i+=`${o}:${Ro(t.fields[o])}`;return i+"}"}(n.mapValue):C()}function So(n){return!!n&&"integerValue"in n}function Ra(n){return!!n&&"arrayValue"in n}function cc(n){return!!n&&"nullValue"in n}function uc(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function hi(n){return!!n&&"mapValue"in n}function Kn(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const e={mapValue:{fields:{}}};return Bt(n.mapValue.fields,(t,s)=>e.mapValue.fields[t]=Kn(s)),e}if(n.arrayValue){const e={arrayValue:{values:[]}};for(let t=0;t<(n.arrayValue.values||[]).length;++t)e.arrayValue.values[t]=Kn(n.arrayValue.values[t]);return e}return Object.assign({},n)}function vg(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class Ie{constructor(e){this.value=e}static empty(){return new Ie({mapValue:{}})}field(e){if(e.isEmpty())return this.value;{let t=this.value;for(let s=0;s<e.length-1;++s)if(t=(t.mapValue.fields||{})[e.get(s)],!hi(t))return null;return t=(t.mapValue.fields||{})[e.lastSegment()],t||null}}set(e,t){this.getFieldsMap(e.popLast())[e.lastSegment()]=Kn(t)}setAll(e){let t=he.emptyPath(),s={},i=[];e.forEach((o,a)=>{if(!t.isImmediateParentOf(a)){const l=this.getFieldsMap(t);this.applyChanges(l,s,i),s={},i=[],t=a.popLast()}o?s[a.lastSegment()]=Kn(o):i.push(a.lastSegment())});const r=this.getFieldsMap(t);this.applyChanges(r,s,i)}delete(e){const t=this.field(e.popLast());hi(t)&&t.mapValue.fields&&delete t.mapValue.fields[e.lastSegment()]}isEqual(e){return $e(this.value,e.value)}getFieldsMap(e){let t=this.value;t.mapValue.fields||(t.mapValue={fields:{}});for(let s=0;s<e.length;++s){let i=t.mapValue.fields[e.get(s)];hi(i)&&i.mapValue.fields||(i={mapValue:{fields:{}}},t.mapValue.fields[e.get(s)]=i),t=i}return t.mapValue.fields}applyChanges(e,t,s){Bt(t,(i,r)=>e[i]=r);for(const i of s)delete e[i]}clone(){return new Ie(Kn(this.value))}}function $h(n){const e=[];return Bt(n.fields,(t,s)=>{const i=new he([t]);if(hi(s)){const r=$h(s.mapValue).fields;if(r.length===0)e.push(i);else for(const o of r)e.push(i.child(o))}else e.push(i)}),new Pe(e)}/**
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
 */class re{constructor(e,t,s,i,r,o,a){this.key=e,this.documentType=t,this.version=s,this.readTime=i,this.createTime=r,this.data=o,this.documentState=a}static newInvalidDocument(e){return new re(e,0,R.min(),R.min(),R.min(),Ie.empty(),0)}static newFoundDocument(e,t,s,i){return new re(e,1,t,R.min(),s,i,0)}static newNoDocument(e,t){return new re(e,2,t,R.min(),R.min(),Ie.empty(),0)}static newUnknownDocument(e,t){return new re(e,3,t,R.min(),R.min(),Ie.empty(),2)}convertToFoundDocument(e,t){return!this.createTime.isEqual(R.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=e),this.version=e,this.documentType=1,this.data=t,this.documentState=0,this}convertToNoDocument(e){return this.version=e,this.documentType=2,this.data=Ie.empty(),this.documentState=0,this}convertToUnknownDocument(e){return this.version=e,this.documentType=3,this.data=Ie.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=R.min(),this}setReadTime(e){return this.readTime=e,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(e){return e instanceof re&&this.key.isEqual(e.key)&&this.version.isEqual(e.version)&&this.documentType===e.documentType&&this.documentState===e.documentState&&this.data.isEqual(e.data)}mutableCopy(){return new re(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
 * @license
 * Copyright 2022 Google LLC
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
 */class Ci{constructor(e,t){this.position=e,this.inclusive=t}}function hc(n,e,t){let s=0;for(let i=0;i<n.position.length;i++){const r=e[i],o=n.position[i];if(r.field.isKeyField()?s=w.comparator(w.fromName(o.referenceValue),t.key):s=hn(o,t.data.field(r.field)),r.dir==="desc"&&(s*=-1),s!==0)break}return s}function dc(n,e){if(n===null)return e===null;if(e===null||n.inclusive!==e.inclusive||n.position.length!==e.position.length)return!1;for(let t=0;t<n.position.length;t++)if(!$e(n.position[t],e.position[t]))return!1;return!0}/**
 * @license
 * Copyright 2022 Google LLC
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
 */class Ai{constructor(e,t="asc"){this.field=e,this.dir=t}}function Eg(n,e){return n.dir===e.dir&&n.field.isEqual(e.field)}/**
 * @license
 * Copyright 2022 Google LLC
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
 */class Gh{}class ee extends Gh{constructor(e,t,s){super(),this.field=e,this.op=t,this.value=s}static create(e,t,s){return e.isKeyField()?t==="in"||t==="not-in"?this.createKeyFieldInFilter(e,t,s):new Ig(e,t,s):t==="array-contains"?new Ag(e,s):t==="in"?new Rg(e,s):t==="not-in"?new Sg(e,s):t==="array-contains-any"?new Pg(e,s):new ee(e,t,s)}static createKeyFieldInFilter(e,t,s){return t==="in"?new wg(e,s):new Cg(e,s)}matches(e){const t=e.data.field(this.field);return this.op==="!="?t!==null&&this.matchesComparison(hn(t,this.value)):t!==null&&Vt(this.value)===Vt(t)&&this.matchesComparison(hn(t,this.value))}matchesComparison(e){switch(this.op){case"<":return e<0;case"<=":return e<=0;case"==":return e===0;case"!=":return e!==0;case">":return e>0;case">=":return e>=0;default:return C()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class Ge extends Gh{constructor(e,t){super(),this.filters=e,this.op=t,this.ue=null}static create(e,t){return new Ge(e,t)}matches(e){return Hh(this)?this.filters.find(t=>!t.matches(e))===void 0:this.filters.find(t=>t.matches(e))!==void 0}getFlattenedFilters(){return this.ue!==null||(this.ue=this.filters.reduce((e,t)=>e.concat(t.getFlattenedFilters()),[])),this.ue}getFilters(){return Object.assign([],this.filters)}}function Hh(n){return n.op==="and"}function Kh(n){return Tg(n)&&Hh(n)}function Tg(n){for(const e of n.filters)if(e instanceof Ge)return!1;return!0}function Po(n){if(n instanceof ee)return n.field.canonicalString()+n.op.toString()+dn(n.value);if(Kh(n))return n.filters.map(e=>Po(e)).join(",");{const e=n.filters.map(t=>Po(t)).join(",");return`${n.op}(${e})`}}function Qh(n,e){return n instanceof ee?function(s,i){return i instanceof ee&&s.op===i.op&&s.field.isEqual(i.field)&&$e(s.value,i.value)}(n,e):n instanceof Ge?function(s,i){return i instanceof Ge&&s.op===i.op&&s.filters.length===i.filters.length?s.filters.reduce((r,o,a)=>r&&Qh(o,i.filters[a]),!0):!1}(n,e):void C()}function Yh(n){return n instanceof ee?function(t){return`${t.field.canonicalString()} ${t.op} ${dn(t.value)}`}(n):n instanceof Ge?function(t){return t.op.toString()+" {"+t.getFilters().map(Yh).join(" ,")+"}"}(n):"Filter"}class Ig extends ee{constructor(e,t,s){super(e,t,s),this.key=w.fromName(s.referenceValue)}matches(e){const t=w.comparator(e.key,this.key);return this.matchesComparison(t)}}class wg extends ee{constructor(e,t){super(e,"in",t),this.keys=Xh("in",t)}matches(e){return this.keys.some(t=>t.isEqual(e.key))}}class Cg extends ee{constructor(e,t){super(e,"not-in",t),this.keys=Xh("not-in",t)}matches(e){return!this.keys.some(t=>t.isEqual(e.key))}}function Xh(n,e){var t;return(((t=e.arrayValue)===null||t===void 0?void 0:t.values)||[]).map(s=>w.fromName(s.referenceValue))}class Ag extends ee{constructor(e,t){super(e,"array-contains",t)}matches(e){const t=e.data.field(this.field);return Ra(t)&&ys(t.arrayValue,this.value)}}class Rg extends ee{constructor(e,t){super(e,"in",t)}matches(e){const t=e.data.field(this.field);return t!==null&&ys(this.value.arrayValue,t)}}class Sg extends ee{constructor(e,t){super(e,"not-in",t)}matches(e){if(ys(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const t=e.data.field(this.field);return t!==null&&!ys(this.value.arrayValue,t)}}class Pg extends ee{constructor(e,t){super(e,"array-contains-any",t)}matches(e){const t=e.data.field(this.field);return!(!Ra(t)||!t.arrayValue.values)&&t.arrayValue.values.some(s=>ys(this.value.arrayValue,s))}}/**
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
 */class Ng{constructor(e,t=null,s=[],i=[],r=null,o=null,a=null){this.path=e,this.collectionGroup=t,this.orderBy=s,this.filters=i,this.limit=r,this.startAt=o,this.endAt=a,this.ce=null}}function fc(n,e=null,t=[],s=[],i=null,r=null,o=null){return new Ng(n,e,t,s,i,r,o)}function Sa(n){const e=P(n);if(e.ce===null){let t=e.path.canonicalString();e.collectionGroup!==null&&(t+="|cg:"+e.collectionGroup),t+="|f:",t+=e.filters.map(s=>Po(s)).join(","),t+="|ob:",t+=e.orderBy.map(s=>function(r){return r.field.canonicalString()+r.dir}(s)).join(","),Us(e.limit)||(t+="|l:",t+=e.limit),e.startAt&&(t+="|lb:",t+=e.startAt.inclusive?"b:":"a:",t+=e.startAt.position.map(s=>dn(s)).join(",")),e.endAt&&(t+="|ub:",t+=e.endAt.inclusive?"a:":"b:",t+=e.endAt.position.map(s=>dn(s)).join(",")),e.ce=t}return e.ce}function Pa(n,e){if(n.limit!==e.limit||n.orderBy.length!==e.orderBy.length)return!1;for(let t=0;t<n.orderBy.length;t++)if(!Eg(n.orderBy[t],e.orderBy[t]))return!1;if(n.filters.length!==e.filters.length)return!1;for(let t=0;t<n.filters.length;t++)if(!Qh(n.filters[t],e.filters[t]))return!1;return n.collectionGroup===e.collectionGroup&&!!n.path.isEqual(e.path)&&!!dc(n.startAt,e.startAt)&&dc(n.endAt,e.endAt)}function No(n){return w.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class hr{constructor(e,t=null,s=[],i=[],r=null,o="F",a=null,l=null){this.path=e,this.collectionGroup=t,this.explicitOrderBy=s,this.filters=i,this.limit=r,this.limitType=o,this.startAt=a,this.endAt=l,this.le=null,this.he=null,this.Pe=null,this.startAt,this.endAt}}function bg(n,e,t,s,i,r,o,a){return new hr(n,e,t,s,i,r,o,a)}function dr(n){return new hr(n)}function _c(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function Dg(n){return n.collectionGroup!==null}function Qn(n){const e=P(n);if(e.le===null){e.le=[];const t=new Set;for(const r of e.explicitOrderBy)e.le.push(r),t.add(r.field.canonicalString());const s=e.explicitOrderBy.length>0?e.explicitOrderBy[e.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new fe(he.comparator);return o.filters.forEach(l=>{l.getFlattenedFilters().forEach(c=>{c.isInequality()&&(a=a.add(c.field))})}),a})(e).forEach(r=>{t.has(r.canonicalString())||r.isKeyField()||e.le.push(new Ai(r,s))}),t.has(he.keyField().canonicalString())||e.le.push(new Ai(he.keyField(),s))}return e.le}function je(n){const e=P(n);return e.he||(e.he=kg(e,Qn(n))),e.he}function kg(n,e){if(n.limitType==="F")return fc(n.path,n.collectionGroup,e,n.filters,n.limit,n.startAt,n.endAt);{e=e.map(i=>{const r=i.dir==="desc"?"asc":"desc";return new Ai(i.field,r)});const t=n.endAt?new Ci(n.endAt.position,n.endAt.inclusive):null,s=n.startAt?new Ci(n.startAt.position,n.startAt.inclusive):null;return fc(n.path,n.collectionGroup,e,n.filters,n.limit,t,s)}}function bo(n,e,t){return new hr(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),e,t,n.startAt,n.endAt)}function fr(n,e){return Pa(je(n),je(e))&&n.limitType===e.limitType}function Jh(n){return`${Sa(je(n))}|lt:${n.limitType}`}function Ht(n){return`Query(target=${function(t){let s=t.path.canonicalString();return t.collectionGroup!==null&&(s+=" collectionGroup="+t.collectionGroup),t.filters.length>0&&(s+=`, filters: [${t.filters.map(i=>Yh(i)).join(", ")}]`),Us(t.limit)||(s+=", limit: "+t.limit),t.orderBy.length>0&&(s+=`, orderBy: [${t.orderBy.map(i=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(i)).join(", ")}]`),t.startAt&&(s+=", startAt: ",s+=t.startAt.inclusive?"b:":"a:",s+=t.startAt.position.map(i=>dn(i)).join(",")),t.endAt&&(s+=", endAt: ",s+=t.endAt.inclusive?"a:":"b:",s+=t.endAt.position.map(i=>dn(i)).join(",")),`Target(${s})`}(je(n))}; limitType=${n.limitType})`}function _r(n,e){return e.isFoundDocument()&&function(s,i){const r=i.key.path;return s.collectionGroup!==null?i.key.hasCollectionId(s.collectionGroup)&&s.path.isPrefixOf(r):w.isDocumentKey(s.path)?s.path.isEqual(r):s.path.isImmediateParentOf(r)}(n,e)&&function(s,i){for(const r of Qn(s))if(!r.field.isKeyField()&&i.data.field(r.field)===null)return!1;return!0}(n,e)&&function(s,i){for(const r of s.filters)if(!r.matches(i))return!1;return!0}(n,e)&&function(s,i){return!(s.startAt&&!function(o,a,l){const c=hc(o,a,l);return o.inclusive?c<=0:c<0}(s.startAt,Qn(s),i)||s.endAt&&!function(o,a,l){const c=hc(o,a,l);return o.inclusive?c>=0:c>0}(s.endAt,Qn(s),i))}(n,e)}function Vg(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function Zh(n){return(e,t)=>{let s=!1;for(const i of Qn(n)){const r=xg(i,e,t);if(r!==0)return r;s=s||i.field.isKeyField()}return 0}}function xg(n,e,t){const s=n.field.isKeyField()?w.comparator(e.key,t.key):function(r,o,a){const l=o.data.field(r),c=a.data.field(r);return l!==null&&c!==null?hn(l,c):C()}(n.field,e,t);switch(n.dir){case"asc":return s;case"desc":return-1*s;default:return C()}}/**
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
 */class Pn{constructor(e,t){this.mapKeyFn=e,this.equalsFn=t,this.inner={},this.innerSize=0}get(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s!==void 0){for(const[i,r]of s)if(this.equalsFn(i,e))return r}}has(e){return this.get(e)!==void 0}set(e,t){const s=this.mapKeyFn(e),i=this.inner[s];if(i===void 0)return this.inner[s]=[[e,t]],void this.innerSize++;for(let r=0;r<i.length;r++)if(this.equalsFn(i[r][0],e))return void(i[r]=[e,t]);i.push([e,t]),this.innerSize++}delete(e){const t=this.mapKeyFn(e),s=this.inner[t];if(s===void 0)return!1;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],e))return s.length===1?delete this.inner[t]:s.splice(i,1),this.innerSize--,!0;return!1}forEach(e){Bt(this.inner,(t,s)=>{for(const[i,r]of s)e(i,r)})}isEmpty(){return jh(this.inner)}size(){return this.innerSize}}/**
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
 */const Mg=new X(w.comparator);function tt(){return Mg}const ed=new X(w.comparator);function $n(...n){let e=ed;for(const t of n)e=e.insert(t.key,t);return e}function td(n){let e=ed;return n.forEach((t,s)=>e=e.insert(t,s.overlayedDocument)),e}function At(){return Yn()}function nd(){return Yn()}function Yn(){return new Pn(n=>n.toString(),(n,e)=>n.isEqual(e))}const Og=new X(w.comparator),Lg=new fe(w.comparator);function k(...n){let e=Lg;for(const t of n)e=e.add(t);return e}const Fg=new fe(L);function Ug(){return Fg}/**
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
 */function sd(n,e){if(n.useProto3Json){if(isNaN(e))return{doubleValue:"NaN"};if(e===1/0)return{doubleValue:"Infinity"};if(e===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:wi(e)?"-0":e}}function id(n){return{integerValue:""+n}}function rd(n,e){return mg(e)?id(e):sd(n,e)}/**
 * @license
 * Copyright 2018 Google LLC
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
 */class pr{constructor(){this._=void 0}}function Bg(n,e,t){return n instanceof Ri?function(i,r){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:i.seconds,nanos:i.nanoseconds}}}};return r&&Ca(r)&&(r=Aa(r)),r&&(o.fields.__previous_value__=r),{mapValue:o}}(t,e):n instanceof fn?ad(n,e):n instanceof _n?ld(n,e):function(i,r){const o=od(i,r),a=pc(o)+pc(i.Ie);return So(o)&&So(i.Ie)?id(a):sd(i.serializer,a)}(n,e)}function qg(n,e,t){return n instanceof fn?ad(n,e):n instanceof _n?ld(n,e):t}function od(n,e){return n instanceof vs?function(s){return So(s)||function(r){return!!r&&"doubleValue"in r}(s)}(e)?e:{integerValue:0}:null}class Ri extends pr{}class fn extends pr{constructor(e){super(),this.elements=e}}function ad(n,e){const t=cd(e);for(const s of n.elements)t.some(i=>$e(i,s))||t.push(s);return{arrayValue:{values:t}}}class _n extends pr{constructor(e){super(),this.elements=e}}function ld(n,e){let t=cd(e);for(const s of n.elements)t=t.filter(i=>!$e(i,s));return{arrayValue:{values:t}}}class vs extends pr{constructor(e,t){super(),this.serializer=e,this.Ie=t}}function pc(n){return Y(n.integerValue||n.doubleValue)}function cd(n){return Ra(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class Na{constructor(e,t){this.field=e,this.transform=t}}function Wg(n,e){return n.field.isEqual(e.field)&&function(s,i){return s instanceof fn&&i instanceof fn||s instanceof _n&&i instanceof _n?un(s.elements,i.elements,$e):s instanceof vs&&i instanceof vs?$e(s.Ie,i.Ie):s instanceof Ri&&i instanceof Ri}(n.transform,e.transform)}class jg{constructor(e,t){this.version=e,this.transformResults=t}}class ye{constructor(e,t){this.updateTime=e,this.exists=t}static none(){return new ye}static exists(e){return new ye(void 0,e)}static updateTime(e){return new ye(e)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(e){return this.exists===e.exists&&(this.updateTime?!!e.updateTime&&this.updateTime.isEqual(e.updateTime):!e.updateTime)}}function di(n,e){return n.updateTime!==void 0?e.isFoundDocument()&&e.version.isEqual(n.updateTime):n.exists===void 0||n.exists===e.isFoundDocument()}class mr{}function ud(n,e){if(!n.hasLocalMutations||e&&e.fields.length===0)return null;if(e===null)return n.isNoDocument()?new gr(n.key,ye.none()):new Bs(n.key,n.data,ye.none());{const t=n.data,s=Ie.empty();let i=new fe(he.comparator);for(let r of e.fields)if(!i.has(r)){let o=t.field(r);o===null&&r.length>1&&(r=r.popLast(),o=t.field(r)),o===null?s.delete(r):s.set(r,o),i=i.add(r)}return new Et(n.key,s,new Pe(i.toArray()),ye.none())}}function zg(n,e,t){n instanceof Bs?function(i,r,o){const a=i.value.clone(),l=gc(i.fieldTransforms,r,o.transformResults);a.setAll(l),r.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,e,t):n instanceof Et?function(i,r,o){if(!di(i.precondition,r))return void r.convertToUnknownDocument(o.version);const a=gc(i.fieldTransforms,r,o.transformResults),l=r.data;l.setAll(hd(i)),l.setAll(a),r.convertToFoundDocument(o.version,l).setHasCommittedMutations()}(n,e,t):function(i,r,o){r.convertToNoDocument(o.version).setHasCommittedMutations()}(0,e,t)}function Xn(n,e,t,s){return n instanceof Bs?function(r,o,a,l){if(!di(r.precondition,o))return a;const c=r.value.clone(),u=yc(r.fieldTransforms,l,o);return c.setAll(u),o.convertToFoundDocument(o.version,c).setHasLocalMutations(),null}(n,e,t,s):n instanceof Et?function(r,o,a,l){if(!di(r.precondition,o))return a;const c=yc(r.fieldTransforms,l,o),u=o.data;return u.setAll(hd(r)),u.setAll(c),o.convertToFoundDocument(o.version,u).setHasLocalMutations(),a===null?null:a.unionWith(r.fieldMask.fields).unionWith(r.fieldTransforms.map(h=>h.field))}(n,e,t,s):function(r,o,a){return di(r.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,e,t)}function $g(n,e){let t=null;for(const s of n.fieldTransforms){const i=e.data.field(s.field),r=od(s.transform,i||null);r!=null&&(t===null&&(t=Ie.empty()),t.set(s.field,r))}return t||null}function mc(n,e){return n.type===e.type&&!!n.key.isEqual(e.key)&&!!n.precondition.isEqual(e.precondition)&&!!function(s,i){return s===void 0&&i===void 0||!(!s||!i)&&un(s,i,(r,o)=>Wg(r,o))}(n.fieldTransforms,e.fieldTransforms)&&(n.type===0?n.value.isEqual(e.value):n.type!==1||n.data.isEqual(e.data)&&n.fieldMask.isEqual(e.fieldMask))}class Bs extends mr{constructor(e,t,s,i=[]){super(),this.key=e,this.value=t,this.precondition=s,this.fieldTransforms=i,this.type=0}getFieldMask(){return null}}class Et extends mr{constructor(e,t,s,i,r=[]){super(),this.key=e,this.data=t,this.fieldMask=s,this.precondition=i,this.fieldTransforms=r,this.type=1}getFieldMask(){return this.fieldMask}}function hd(n){const e=new Map;return n.fieldMask.fields.forEach(t=>{if(!t.isEmpty()){const s=n.data.field(t);e.set(t,s)}}),e}function gc(n,e,t){const s=new Map;F(n.length===t.length);for(let i=0;i<t.length;i++){const r=n[i],o=r.transform,a=e.data.field(r.field);s.set(r.field,qg(o,a,t[i]))}return s}function yc(n,e,t){const s=new Map;for(const i of n){const r=i.transform,o=t.data.field(i.field);s.set(i.field,Bg(r,o,e))}return s}class gr extends mr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class dd extends mr{constructor(e,t){super(),this.key=e,this.precondition=t,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Gg{constructor(e,t,s,i){this.batchId=e,this.localWriteTime=t,this.baseMutations=s,this.mutations=i}applyToRemoteDocument(e,t){const s=t.mutationResults;for(let i=0;i<this.mutations.length;i++){const r=this.mutations[i];r.key.isEqual(e.key)&&zg(r,e,s[i])}}applyToLocalView(e,t){for(const s of this.baseMutations)s.key.isEqual(e.key)&&(t=Xn(s,e,t,this.localWriteTime));for(const s of this.mutations)s.key.isEqual(e.key)&&(t=Xn(s,e,t,this.localWriteTime));return t}applyToLocalDocumentSet(e,t){const s=nd();return this.mutations.forEach(i=>{const r=e.get(i.key),o=r.overlayedDocument;let a=this.applyToLocalView(o,r.mutatedFields);a=t.has(i.key)?null:a;const l=ud(o,a);l!==null&&s.set(i.key,l),o.isValidDocument()||o.convertToNoDocument(R.min())}),s}keys(){return this.mutations.reduce((e,t)=>e.add(t.key),k())}isEqual(e){return this.batchId===e.batchId&&un(this.mutations,e.mutations,(t,s)=>mc(t,s))&&un(this.baseMutations,e.baseMutations,(t,s)=>mc(t,s))}}class ba{constructor(e,t,s,i){this.batch=e,this.commitVersion=t,this.mutationResults=s,this.docVersions=i}static from(e,t,s){F(e.mutations.length===s.length);let i=function(){return Og}();const r=e.mutations;for(let o=0;o<r.length;o++)i=i.insert(r[o].key,s[o].version);return new ba(e,t,s,i)}}/**
 * @license
 * Copyright 2022 Google LLC
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
 */class Hg{constructor(e,t){this.largestBatchId=e,this.mutation=t}getKey(){return this.mutation.key}isEqual(e){return e!==null&&this.mutation===e.mutation}toString(){return`Overlay{
      largestBatchId: ${this.largestBatchId},
      mutation: ${this.mutation.toString()}
    }`}}/**
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
 */class Kg{constructor(e,t){this.count=e,this.unchangedNames=t}}/**
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
 */var Q,V;function fd(n){switch(n){default:return C();case _.CANCELLED:case _.UNKNOWN:case _.DEADLINE_EXCEEDED:case _.RESOURCE_EXHAUSTED:case _.INTERNAL:case _.UNAVAILABLE:case _.UNAUTHENTICATED:return!1;case _.INVALID_ARGUMENT:case _.NOT_FOUND:case _.ALREADY_EXISTS:case _.PERMISSION_DENIED:case _.FAILED_PRECONDITION:case _.ABORTED:case _.OUT_OF_RANGE:case _.UNIMPLEMENTED:case _.DATA_LOSS:return!0}}function _d(n){if(n===void 0)return et("GRPC error has no .code"),_.UNKNOWN;switch(n){case Q.OK:return _.OK;case Q.CANCELLED:return _.CANCELLED;case Q.UNKNOWN:return _.UNKNOWN;case Q.DEADLINE_EXCEEDED:return _.DEADLINE_EXCEEDED;case Q.RESOURCE_EXHAUSTED:return _.RESOURCE_EXHAUSTED;case Q.INTERNAL:return _.INTERNAL;case Q.UNAVAILABLE:return _.UNAVAILABLE;case Q.UNAUTHENTICATED:return _.UNAUTHENTICATED;case Q.INVALID_ARGUMENT:return _.INVALID_ARGUMENT;case Q.NOT_FOUND:return _.NOT_FOUND;case Q.ALREADY_EXISTS:return _.ALREADY_EXISTS;case Q.PERMISSION_DENIED:return _.PERMISSION_DENIED;case Q.FAILED_PRECONDITION:return _.FAILED_PRECONDITION;case Q.ABORTED:return _.ABORTED;case Q.OUT_OF_RANGE:return _.OUT_OF_RANGE;case Q.UNIMPLEMENTED:return _.UNIMPLEMENTED;case Q.DATA_LOSS:return _.DATA_LOSS;default:return C()}}(V=Q||(Q={}))[V.OK=0]="OK",V[V.CANCELLED=1]="CANCELLED",V[V.UNKNOWN=2]="UNKNOWN",V[V.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",V[V.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",V[V.NOT_FOUND=5]="NOT_FOUND",V[V.ALREADY_EXISTS=6]="ALREADY_EXISTS",V[V.PERMISSION_DENIED=7]="PERMISSION_DENIED",V[V.UNAUTHENTICATED=16]="UNAUTHENTICATED",V[V.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",V[V.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",V[V.ABORTED=10]="ABORTED",V[V.OUT_OF_RANGE=11]="OUT_OF_RANGE",V[V.UNIMPLEMENTED=12]="UNIMPLEMENTED",V[V.INTERNAL=13]="INTERNAL",V[V.UNAVAILABLE=14]="UNAVAILABLE",V[V.DATA_LOSS=15]="DATA_LOSS";/**
 * @license
 * Copyright 2023 Google LLC
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
 */function Qg(){return new TextEncoder}/**
 * @license
 * Copyright 2022 Google LLC
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
 */const Yg=new en([4294967295,4294967295],0);function vc(n){const e=Qg().encode(n),t=new tg;return t.update(e),new Uint8Array(t.digest())}function Ec(n){const e=new DataView(n.buffer),t=e.getUint32(0,!0),s=e.getUint32(4,!0),i=e.getUint32(8,!0),r=e.getUint32(12,!0);return[new en([t,s],0),new en([i,r],0)]}class Da{constructor(e,t,s){if(this.bitmap=e,this.padding=t,this.hashCount=s,t<0||t>=8)throw new Gn(`Invalid padding: ${t}`);if(s<0)throw new Gn(`Invalid hash count: ${s}`);if(e.length>0&&this.hashCount===0)throw new Gn(`Invalid hash count: ${s}`);if(e.length===0&&t!==0)throw new Gn(`Invalid padding when bitmap length is 0: ${t}`);this.Te=8*e.length-t,this.Ee=en.fromNumber(this.Te)}de(e,t,s){let i=e.add(t.multiply(en.fromNumber(s)));return i.compare(Yg)===1&&(i=new en([i.getBits(0),i.getBits(1)],0)),i.modulo(this.Ee).toNumber()}Ae(e){return(this.bitmap[Math.floor(e/8)]&1<<e%8)!=0}mightContain(e){if(this.Te===0)return!1;const t=vc(e),[s,i]=Ec(t);for(let r=0;r<this.hashCount;r++){const o=this.de(s,i,r);if(!this.Ae(o))return!1}return!0}static create(e,t,s){const i=e%8==0?0:8-e%8,r=new Uint8Array(Math.ceil(e/8)),o=new Da(r,i,t);return s.forEach(a=>o.insert(a)),o}insert(e){if(this.Te===0)return;const t=vc(e),[s,i]=Ec(t);for(let r=0;r<this.hashCount;r++){const o=this.de(s,i,r);this.Re(o)}}Re(e){const t=Math.floor(e/8),s=e%8;this.bitmap[t]|=1<<s}}class Gn extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class yr{constructor(e,t,s,i,r){this.snapshotVersion=e,this.targetChanges=t,this.targetMismatches=s,this.documentUpdates=i,this.resolvedLimboDocuments=r}static createSynthesizedRemoteEventForCurrentChange(e,t,s){const i=new Map;return i.set(e,qs.createSynthesizedTargetChangeForCurrentChange(e,t,s)),new yr(R.min(),i,new X(L),tt(),k())}}class qs{constructor(e,t,s,i,r){this.resumeToken=e,this.current=t,this.addedDocuments=s,this.modifiedDocuments=i,this.removedDocuments=r}static createSynthesizedTargetChangeForCurrentChange(e,t,s){return new qs(s,t,k(),k(),k())}}/**
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
 */class fi{constructor(e,t,s,i){this.Ve=e,this.removedTargetIds=t,this.key=s,this.me=i}}class pd{constructor(e,t){this.targetId=e,this.fe=t}}class md{constructor(e,t,s=Te.EMPTY_BYTE_STRING,i=null){this.state=e,this.targetIds=t,this.resumeToken=s,this.cause=i}}class Tc{constructor(){this.ge=0,this.pe=wc(),this.ye=Te.EMPTY_BYTE_STRING,this.we=!1,this.Se=!0}get current(){return this.we}get resumeToken(){return this.ye}get be(){return this.ge!==0}get De(){return this.Se}Ce(e){e.approximateByteSize()>0&&(this.Se=!0,this.ye=e)}ve(){let e=k(),t=k(),s=k();return this.pe.forEach((i,r)=>{switch(r){case 0:e=e.add(i);break;case 2:t=t.add(i);break;case 1:s=s.add(i);break;default:C()}}),new qs(this.ye,this.we,e,t,s)}Fe(){this.Se=!1,this.pe=wc()}Me(e,t){this.Se=!0,this.pe=this.pe.insert(e,t)}xe(e){this.Se=!0,this.pe=this.pe.remove(e)}Oe(){this.ge+=1}Ne(){this.ge-=1,F(this.ge>=0)}Be(){this.Se=!0,this.we=!0}}class Xg{constructor(e){this.Le=e,this.ke=new Map,this.qe=tt(),this.Qe=Ic(),this.Ke=new X(L)}$e(e){for(const t of e.Ve)e.me&&e.me.isFoundDocument()?this.Ue(t,e.me):this.We(t,e.key,e.me);for(const t of e.removedTargetIds)this.We(t,e.key,e.me)}Ge(e){this.forEachTarget(e,t=>{const s=this.ze(t);switch(e.state){case 0:this.je(t)&&s.Ce(e.resumeToken);break;case 1:s.Ne(),s.be||s.Fe(),s.Ce(e.resumeToken);break;case 2:s.Ne(),s.be||this.removeTarget(t);break;case 3:this.je(t)&&(s.Be(),s.Ce(e.resumeToken));break;case 4:this.je(t)&&(this.He(t),s.Ce(e.resumeToken));break;default:C()}})}forEachTarget(e,t){e.targetIds.length>0?e.targetIds.forEach(t):this.ke.forEach((s,i)=>{this.je(i)&&t(i)})}Je(e){const t=e.targetId,s=e.fe.count,i=this.Ye(t);if(i){const r=i.target;if(No(r))if(s===0){const o=new w(r.path);this.We(t,o,re.newNoDocument(o,R.min()))}else F(s===1);else{const o=this.Ze(t);if(o!==s){const a=this.Xe(e),l=a?this.et(a,e,o):1;if(l!==0){this.He(t);const c=l===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(t,c)}}}}}Xe(e){const t=e.fe.unchangedNames;if(!t||!t.bits)return null;const{bits:{bitmap:s="",padding:i=0},hashCount:r=0}=t;let o,a;try{o=kt(s).toUint8Array()}catch(l){if(l instanceof zh)return cn("Decoding the base64 bloom filter in existence filter failed ("+l.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw l}try{a=new Da(o,i,r)}catch(l){return cn(l instanceof Gn?"BloomFilter error: ":"Applying bloom filter failed: ",l),null}return a.Te===0?null:a}et(e,t,s){return t.fe.count===s-this.rt(e,t.targetId)?0:2}rt(e,t){const s=this.Le.getRemoteKeysForTarget(t);let i=0;return s.forEach(r=>{const o=this.Le.nt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${r.path.canonicalString()}`;e.mightContain(a)||(this.We(t,r,null),i++)}),i}it(e){const t=new Map;this.ke.forEach((r,o)=>{const a=this.Ye(o);if(a){if(r.current&&No(a.target)){const l=new w(a.target.path);this.qe.get(l)!==null||this.st(o,l)||this.We(o,l,re.newNoDocument(l,e))}r.De&&(t.set(o,r.ve()),r.Fe())}});let s=k();this.Qe.forEach((r,o)=>{let a=!0;o.forEachWhile(l=>{const c=this.Ye(l);return!c||c.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(s=s.add(r))}),this.qe.forEach((r,o)=>o.setReadTime(e));const i=new yr(e,t,this.Ke,this.qe,s);return this.qe=tt(),this.Qe=Ic(),this.Ke=new X(L),i}Ue(e,t){if(!this.je(e))return;const s=this.st(e,t.key)?2:0;this.ze(e).Me(t.key,s),this.qe=this.qe.insert(t.key,t),this.Qe=this.Qe.insert(t.key,this.ot(t.key).add(e))}We(e,t,s){if(!this.je(e))return;const i=this.ze(e);this.st(e,t)?i.Me(t,1):i.xe(t),this.Qe=this.Qe.insert(t,this.ot(t).delete(e)),s&&(this.qe=this.qe.insert(t,s))}removeTarget(e){this.ke.delete(e)}Ze(e){const t=this.ze(e).ve();return this.Le.getRemoteKeysForTarget(e).size+t.addedDocuments.size-t.removedDocuments.size}Oe(e){this.ze(e).Oe()}ze(e){let t=this.ke.get(e);return t||(t=new Tc,this.ke.set(e,t)),t}ot(e){let t=this.Qe.get(e);return t||(t=new fe(L),this.Qe=this.Qe.insert(e,t)),t}je(e){const t=this.Ye(e)!==null;return t||T("WatchChangeAggregator","Detected inactive target",e),t}Ye(e){const t=this.ke.get(e);return t&&t.be?null:this.Le._t(e)}He(e){this.ke.set(e,new Tc),this.Le.getRemoteKeysForTarget(e).forEach(t=>{this.We(e,t,null)})}st(e,t){return this.Le.getRemoteKeysForTarget(e).has(t)}}function Ic(){return new X(w.comparator)}function wc(){return new X(w.comparator)}const Jg={asc:"ASCENDING",desc:"DESCENDING"},Zg={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},ey={and:"AND",or:"OR"};class ty{constructor(e,t){this.databaseId=e,this.useProto3Json=t}}function Do(n,e){return n.useProto3Json||Us(e)?e:{value:e}}function Si(n,e){return n.useProto3Json?`${new Date(1e3*e.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+e.nanoseconds).slice(-9)}Z`:{seconds:""+e.seconds,nanos:e.nanoseconds}}function gd(n,e){return n.useProto3Json?e.toBase64():e.toUint8Array()}function ny(n,e){return Si(n,e.toTimestamp())}function Ne(n){return F(!!n),R.fromTimestamp(function(t){const s=ft(t);return new te(s.seconds,s.nanos)}(n))}function ka(n,e){return function(s){return new z(["projects",s.projectId,"databases",s.database])}(n).child("documents").child(e).canonicalString()}function yd(n){const e=z.fromString(n);return F(wd(e)),e}function Pi(n,e){return ka(n.databaseId,e.path)}function Jn(n,e){const t=yd(e);if(t.get(1)!==n.databaseId.projectId)throw new I(_.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+t.get(1)+" vs "+n.databaseId.projectId);if(t.get(3)!==n.databaseId.database)throw new I(_.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+t.get(3)+" vs "+n.databaseId.database);return new w(vd(t))}function ko(n,e){return ka(n.databaseId,e)}function sy(n){const e=yd(n);return e.length===4?z.emptyPath():vd(e)}function Es(n){return new z(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function vd(n){return F(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Cc(n,e,t){return{name:Pi(n,e),fields:t.value.mapValue.fields}}function iy(n,e){return"found"in e?function(s,i){F(!!i.found),i.found.name,i.found.updateTime;const r=Jn(s,i.found.name),o=Ne(i.found.updateTime),a=i.found.createTime?Ne(i.found.createTime):R.min(),l=new Ie({mapValue:{fields:i.found.fields}});return re.newFoundDocument(r,o,a,l)}(n,e):"missing"in e?function(s,i){F(!!i.missing),F(!!i.readTime);const r=Jn(s,i.missing),o=Ne(i.readTime);return re.newNoDocument(r,o)}(n,e):C()}function ry(n,e){let t;if("targetChange"in e){e.targetChange;const s=function(c){return c==="NO_CHANGE"?0:c==="ADD"?1:c==="REMOVE"?2:c==="CURRENT"?3:c==="RESET"?4:C()}(e.targetChange.targetChangeType||"NO_CHANGE"),i=e.targetChange.targetIds||[],r=function(c,u){return c.useProto3Json?(F(u===void 0||typeof u=="string"),Te.fromBase64String(u||"")):(F(u===void 0||u instanceof Uint8Array),Te.fromUint8Array(u||new Uint8Array))}(n,e.targetChange.resumeToken),o=e.targetChange.cause,a=o&&function(c){const u=c.code===void 0?_.UNKNOWN:_d(c.code);return new I(u,c.message||"")}(o);t=new md(s,i,r,a||null)}else if("documentChange"in e){e.documentChange;const s=e.documentChange;s.document,s.document.name,s.document.updateTime;const i=Jn(n,s.document.name),r=Ne(s.document.updateTime),o=s.document.createTime?Ne(s.document.createTime):R.min(),a=new Ie({mapValue:{fields:s.document.fields}}),l=re.newFoundDocument(i,r,o,a),c=s.targetIds||[],u=s.removedTargetIds||[];t=new fi(c,u,l.key,l)}else if("documentDelete"in e){e.documentDelete;const s=e.documentDelete;s.document;const i=Jn(n,s.document),r=s.readTime?Ne(s.readTime):R.min(),o=re.newNoDocument(i,r),a=s.removedTargetIds||[];t=new fi([],a,o.key,o)}else if("documentRemove"in e){e.documentRemove;const s=e.documentRemove;s.document;const i=Jn(n,s.document),r=s.removedTargetIds||[];t=new fi([],r,i,null)}else{if(!("filter"in e))return C();{e.filter;const s=e.filter;s.targetId;const{count:i=0,unchangedNames:r}=s,o=new Kg(i,r),a=s.targetId;t=new pd(a,o)}}return t}function Ed(n,e){let t;if(e instanceof Bs)t={update:Cc(n,e.key,e.value)};else if(e instanceof gr)t={delete:Pi(n,e.key)};else if(e instanceof Et)t={update:Cc(n,e.key,e.data),updateMask:_y(e.fieldMask)};else{if(!(e instanceof dd))return C();t={verify:Pi(n,e.key)}}return e.fieldTransforms.length>0&&(t.updateTransforms=e.fieldTransforms.map(s=>function(r,o){const a=o.transform;if(a instanceof Ri)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof fn)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof _n)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof vs)return{fieldPath:o.field.canonicalString(),increment:a.Ie};throw C()}(0,s))),e.precondition.isNone||(t.currentDocument=function(i,r){return r.updateTime!==void 0?{updateTime:ny(i,r.updateTime)}:r.exists!==void 0?{exists:r.exists}:C()}(n,e.precondition)),t}function oy(n,e){return n&&n.length>0?(F(e!==void 0),n.map(t=>function(i,r){let o=i.updateTime?Ne(i.updateTime):Ne(r);return o.isEqual(R.min())&&(o=Ne(r)),new jg(o,i.transformResults||[])}(t,e))):[]}function ay(n,e){return{documents:[ko(n,e.path)]}}function ly(n,e){const t={structuredQuery:{}},s=e.path;e.collectionGroup!==null?(t.parent=ko(n,s),t.structuredQuery.from=[{collectionId:e.collectionGroup,allDescendants:!0}]):(t.parent=ko(n,s.popLast()),t.structuredQuery.from=[{collectionId:s.lastSegment()}]);const i=function(l){if(l.length!==0)return Id(Ge.create(l,"and"))}(e.filters);i&&(t.structuredQuery.where=i);const r=function(l){if(l.length!==0)return l.map(c=>function(h){return{field:Kt(h.field),direction:hy(h.dir)}}(c))}(e.orderBy);r&&(t.structuredQuery.orderBy=r);const o=Do(n,e.limit);return o!==null&&(t.structuredQuery.limit=o),e.startAt&&(t.structuredQuery.startAt=function(l){return{before:l.inclusive,values:l.position}}(e.startAt)),e.endAt&&(t.structuredQuery.endAt=function(l){return{before:!l.inclusive,values:l.position}}(e.endAt)),t}function cy(n){let e=sy(n.parent);const t=n.structuredQuery,s=t.from?t.from.length:0;let i=null;if(s>0){F(s===1);const u=t.from[0];u.allDescendants?i=u.collectionId:e=e.child(u.collectionId)}let r=[];t.where&&(r=function(h){const d=Td(h);return d instanceof Ge&&Kh(d)?d.getFilters():[d]}(t.where));let o=[];t.orderBy&&(o=function(h){return h.map(d=>function(m){return new Ai(Qt(m.field),function(E){switch(E){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(m.direction))}(d))}(t.orderBy));let a=null;t.limit&&(a=function(h){let d;return d=typeof h=="object"?h.value:h,Us(d)?null:d}(t.limit));let l=null;t.startAt&&(l=function(h){const d=!!h.before,f=h.values||[];return new Ci(f,d)}(t.startAt));let c=null;return t.endAt&&(c=function(h){const d=!h.before,f=h.values||[];return new Ci(f,d)}(t.endAt)),bg(e,i,o,r,a,"F",l,c)}function uy(n,e){const t=function(i){switch(i){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return C()}}(e.purpose);return t==null?null:{"goog-listen-tags":t}}function Td(n){return n.unaryFilter!==void 0?function(t){switch(t.unaryFilter.op){case"IS_NAN":const s=Qt(t.unaryFilter.field);return ee.create(s,"==",{doubleValue:NaN});case"IS_NULL":const i=Qt(t.unaryFilter.field);return ee.create(i,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const r=Qt(t.unaryFilter.field);return ee.create(r,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Qt(t.unaryFilter.field);return ee.create(o,"!=",{nullValue:"NULL_VALUE"});default:return C()}}(n):n.fieldFilter!==void 0?function(t){return ee.create(Qt(t.fieldFilter.field),function(i){switch(i){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return C()}}(t.fieldFilter.op),t.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(t){return Ge.create(t.compositeFilter.filters.map(s=>Td(s)),function(i){switch(i){case"AND":return"and";case"OR":return"or";default:return C()}}(t.compositeFilter.op))}(n):C()}function hy(n){return Jg[n]}function dy(n){return Zg[n]}function fy(n){return ey[n]}function Kt(n){return{fieldPath:n.canonicalString()}}function Qt(n){return he.fromServerFormat(n.fieldPath)}function Id(n){return n instanceof ee?function(t){if(t.op==="=="){if(uc(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NAN"}};if(cc(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NULL"}}}else if(t.op==="!="){if(uc(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NOT_NAN"}};if(cc(t.value))return{unaryFilter:{field:Kt(t.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Kt(t.field),op:dy(t.op),value:t.value}}}(n):n instanceof Ge?function(t){const s=t.getFilters().map(i=>Id(i));return s.length===1?s[0]:{compositeFilter:{op:fy(t.op),filters:s}}}(n):C()}function _y(n){const e=[];return n.fields.forEach(t=>e.push(t.canonicalString())),{fieldPaths:e}}function wd(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class it{constructor(e,t,s,i,r=R.min(),o=R.min(),a=Te.EMPTY_BYTE_STRING,l=null){this.target=e,this.targetId=t,this.purpose=s,this.sequenceNumber=i,this.snapshotVersion=r,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=l}withSequenceNumber(e){return new it(this.target,this.targetId,this.purpose,e,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(e,t){return new it(this.target,this.targetId,this.purpose,this.sequenceNumber,t,this.lastLimboFreeSnapshotVersion,e,null)}withExpectedCount(e){return new it(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,e)}withLastLimboFreeSnapshotVersion(e){return new it(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,e,this.resumeToken,this.expectedCount)}}/**
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
 */class py{constructor(e){this.ut=e}}function my(n){const e=cy({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?bo(e,e.limit,"L"):e}/**
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
 */class gy{constructor(){this.on=new yy}addToCollectionParentIndex(e,t){return this.on.add(t),p.resolve()}getCollectionParents(e,t){return p.resolve(this.on.getEntries(t))}addFieldIndex(e,t){return p.resolve()}deleteFieldIndex(e,t){return p.resolve()}deleteAllFieldIndexes(e){return p.resolve()}createTargetIndexes(e,t){return p.resolve()}getDocumentsMatchingTarget(e,t){return p.resolve(null)}getIndexType(e,t){return p.resolve(0)}getFieldIndexes(e,t){return p.resolve([])}getNextCollectionGroupToUpdate(e){return p.resolve(null)}getMinOffset(e,t){return p.resolve(dt.min())}getMinOffsetFromCollectionGroup(e,t){return p.resolve(dt.min())}updateCollectionGroup(e,t,s){return p.resolve()}updateIndexEntries(e,t){return p.resolve()}}class yy{constructor(){this.index={}}add(e){const t=e.lastSegment(),s=e.popLast(),i=this.index[t]||new fe(z.comparator),r=!i.has(s);return this.index[t]=i.add(s),r}has(e){const t=e.lastSegment(),s=e.popLast(),i=this.index[t];return i&&i.has(s)}getEntries(e){return(this.index[e]||new fe(z.comparator)).toArray()}}/**
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
 */class pn{constructor(e){this.xn=e}next(){return this.xn+=2,this.xn}static On(){return new pn(0)}static Nn(){return new pn(-1)}}/**
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
 */class vy{constructor(){this.changes=new Pn(e=>e.toString(),(e,t)=>e.isEqual(t)),this.changesApplied=!1}addEntry(e){this.assertNotApplied(),this.changes.set(e.key,e)}removeEntry(e,t){this.assertNotApplied(),this.changes.set(e,re.newInvalidDocument(e).setReadTime(t))}getEntry(e,t){this.assertNotApplied();const s=this.changes.get(t);return s!==void 0?p.resolve(s):this.getFromCache(e,t)}getEntries(e,t){return this.getAllFromCache(e,t)}apply(e){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(e)}assertNotApplied(){}}/**
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
 *//**
 * @license
 * Copyright 2022 Google LLC
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
 */class Ey{constructor(e,t){this.overlayedDocument=e,this.mutatedFields=t}}/**
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
 */class Ty{constructor(e,t,s,i){this.remoteDocumentCache=e,this.mutationQueue=t,this.documentOverlayCache=s,this.indexManager=i}getDocument(e,t){let s=null;return this.documentOverlayCache.getOverlay(e,t).next(i=>(s=i,this.remoteDocumentCache.getEntry(e,t))).next(i=>(s!==null&&Xn(s.mutation,i,Pe.empty(),te.now()),i))}getDocuments(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.getLocalViewOfDocuments(e,s,k()).next(()=>s))}getLocalViewOfDocuments(e,t,s=k()){const i=At();return this.populateOverlays(e,i,t).next(()=>this.computeViews(e,t,i,s).next(r=>{let o=$n();return r.forEach((a,l)=>{o=o.insert(a,l.overlayedDocument)}),o}))}getOverlayedDocuments(e,t){const s=At();return this.populateOverlays(e,s,t).next(()=>this.computeViews(e,t,s,k()))}populateOverlays(e,t,s){const i=[];return s.forEach(r=>{t.has(r)||i.push(r)}),this.documentOverlayCache.getOverlays(e,i).next(r=>{r.forEach((o,a)=>{t.set(o,a)})})}computeViews(e,t,s,i){let r=tt();const o=Yn(),a=function(){return Yn()}();return t.forEach((l,c)=>{const u=s.get(c.key);i.has(c.key)&&(u===void 0||u.mutation instanceof Et)?r=r.insert(c.key,c):u!==void 0?(o.set(c.key,u.mutation.getFieldMask()),Xn(u.mutation,c,u.mutation.getFieldMask(),te.now())):o.set(c.key,Pe.empty())}),this.recalculateAndSaveOverlays(e,r).next(l=>(l.forEach((c,u)=>o.set(c,u)),t.forEach((c,u)=>{var h;return a.set(c,new Ey(u,(h=o.get(c))!==null&&h!==void 0?h:null))}),a))}recalculateAndSaveOverlays(e,t){const s=Yn();let i=new X((o,a)=>o-a),r=k();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(e,t).next(o=>{for(const a of o)a.keys().forEach(l=>{const c=t.get(l);if(c===null)return;let u=s.get(l)||Pe.empty();u=a.applyToLocalView(c,u),s.set(l,u);const h=(i.get(a.batchId)||k()).add(l);i=i.insert(a.batchId,h)})}).next(()=>{const o=[],a=i.getReverseIterator();for(;a.hasNext();){const l=a.getNext(),c=l.key,u=l.value,h=nd();u.forEach(d=>{if(!r.has(d)){const f=ud(t.get(d),s.get(d));f!==null&&h.set(d,f),r=r.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(e,c,h))}return p.waitFor(o)}).next(()=>s)}recalculateAndSaveOverlaysForDocumentKeys(e,t){return this.remoteDocumentCache.getEntries(e,t).next(s=>this.recalculateAndSaveOverlays(e,s))}getDocumentsMatchingQuery(e,t,s,i){return function(o){return w.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(t)?this.getDocumentsMatchingDocumentQuery(e,t.path):Dg(t)?this.getDocumentsMatchingCollectionGroupQuery(e,t,s,i):this.getDocumentsMatchingCollectionQuery(e,t,s,i)}getNextDocuments(e,t,s,i){return this.remoteDocumentCache.getAllFromCollectionGroup(e,t,s,i).next(r=>{const o=i-r.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(e,t,s.largestBatchId,i-r.size):p.resolve(At());let a=-1,l=r;return o.next(c=>p.forEach(c,(u,h)=>(a<h.largestBatchId&&(a=h.largestBatchId),r.get(u)?p.resolve():this.remoteDocumentCache.getEntry(e,u).next(d=>{l=l.insert(u,d)}))).next(()=>this.populateOverlays(e,c,r)).next(()=>this.computeViews(e,l,c,k())).next(u=>({batchId:a,changes:td(u)})))})}getDocumentsMatchingDocumentQuery(e,t){return this.getDocument(e,new w(t)).next(s=>{let i=$n();return s.isFoundDocument()&&(i=i.insert(s.key,s)),i})}getDocumentsMatchingCollectionGroupQuery(e,t,s,i){const r=t.collectionGroup;let o=$n();return this.indexManager.getCollectionParents(e,r).next(a=>p.forEach(a,l=>{const c=function(h,d){return new hr(d,null,h.explicitOrderBy.slice(),h.filters.slice(),h.limit,h.limitType,h.startAt,h.endAt)}(t,l.child(r));return this.getDocumentsMatchingCollectionQuery(e,c,s,i).next(u=>{u.forEach((h,d)=>{o=o.insert(h,d)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(e,t,s,i){let r;return this.documentOverlayCache.getOverlaysForCollection(e,t.path,s.largestBatchId).next(o=>(r=o,this.remoteDocumentCache.getDocumentsMatchingQuery(e,t,s,r,i))).next(o=>{r.forEach((l,c)=>{const u=c.getKey();o.get(u)===null&&(o=o.insert(u,re.newInvalidDocument(u)))});let a=$n();return o.forEach((l,c)=>{const u=r.get(l);u!==void 0&&Xn(u.mutation,c,Pe.empty(),te.now()),_r(t,c)&&(a=a.insert(l,c))}),a})}}/**
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
 */class Iy{constructor(e){this.serializer=e,this.ur=new Map,this.cr=new Map}getBundleMetadata(e,t){return p.resolve(this.ur.get(t))}saveBundleMetadata(e,t){return this.ur.set(t.id,function(i){return{id:i.id,version:i.version,createTime:Ne(i.createTime)}}(t)),p.resolve()}getNamedQuery(e,t){return p.resolve(this.cr.get(t))}saveNamedQuery(e,t){return this.cr.set(t.name,function(i){return{name:i.name,query:my(i.bundledQuery),readTime:Ne(i.readTime)}}(t)),p.resolve()}}/**
 * @license
 * Copyright 2022 Google LLC
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
 */class wy{constructor(){this.overlays=new X(w.comparator),this.lr=new Map}getOverlay(e,t){return p.resolve(this.overlays.get(t))}getOverlays(e,t){const s=At();return p.forEach(t,i=>this.getOverlay(e,i).next(r=>{r!==null&&s.set(i,r)})).next(()=>s)}saveOverlays(e,t,s){return s.forEach((i,r)=>{this.lt(e,t,r)}),p.resolve()}removeOverlaysForBatchId(e,t,s){const i=this.lr.get(s);return i!==void 0&&(i.forEach(r=>this.overlays=this.overlays.remove(r)),this.lr.delete(s)),p.resolve()}getOverlaysForCollection(e,t,s){const i=At(),r=t.length+1,o=new w(t.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const l=a.getNext().value,c=l.getKey();if(!t.isPrefixOf(c.path))break;c.path.length===r&&l.largestBatchId>s&&i.set(l.getKey(),l)}return p.resolve(i)}getOverlaysForCollectionGroup(e,t,s,i){let r=new X((c,u)=>c-u);const o=this.overlays.getIterator();for(;o.hasNext();){const c=o.getNext().value;if(c.getKey().getCollectionGroup()===t&&c.largestBatchId>s){let u=r.get(c.largestBatchId);u===null&&(u=At(),r=r.insert(c.largestBatchId,u)),u.set(c.getKey(),c)}}const a=At(),l=r.getIterator();for(;l.hasNext()&&(l.getNext().value.forEach((c,u)=>a.set(c,u)),!(a.size()>=i)););return p.resolve(a)}lt(e,t,s){const i=this.overlays.get(s.key);if(i!==null){const o=this.lr.get(i.largestBatchId).delete(s.key);this.lr.set(i.largestBatchId,o)}this.overlays=this.overlays.insert(s.key,new Hg(t,s));let r=this.lr.get(t);r===void 0&&(r=k(),this.lr.set(t,r)),this.lr.set(t,r.add(s.key))}}/**
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
 */class Va{constructor(){this.hr=new fe(se.Pr),this.Ir=new fe(se.Tr)}isEmpty(){return this.hr.isEmpty()}addReference(e,t){const s=new se(e,t);this.hr=this.hr.add(s),this.Ir=this.Ir.add(s)}Er(e,t){e.forEach(s=>this.addReference(s,t))}removeReference(e,t){this.dr(new se(e,t))}Ar(e,t){e.forEach(s=>this.removeReference(s,t))}Rr(e){const t=new w(new z([])),s=new se(t,e),i=new se(t,e+1),r=[];return this.Ir.forEachInRange([s,i],o=>{this.dr(o),r.push(o.key)}),r}Vr(){this.hr.forEach(e=>this.dr(e))}dr(e){this.hr=this.hr.delete(e),this.Ir=this.Ir.delete(e)}mr(e){const t=new w(new z([])),s=new se(t,e),i=new se(t,e+1);let r=k();return this.Ir.forEachInRange([s,i],o=>{r=r.add(o.key)}),r}containsKey(e){const t=new se(e,0),s=this.hr.firstAfterOrEqual(t);return s!==null&&e.isEqual(s.key)}}class se{constructor(e,t){this.key=e,this.gr=t}static Pr(e,t){return w.comparator(e.key,t.key)||L(e.gr,t.gr)}static Tr(e,t){return L(e.gr,t.gr)||w.comparator(e.key,t.key)}}/**
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
 */class Cy{constructor(e,t){this.indexManager=e,this.referenceDelegate=t,this.mutationQueue=[],this.pr=1,this.yr=new fe(se.Pr)}checkEmpty(e){return p.resolve(this.mutationQueue.length===0)}addMutationBatch(e,t,s,i){const r=this.pr;this.pr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Gg(r,t,s,i);this.mutationQueue.push(o);for(const a of i)this.yr=this.yr.add(new se(a.key,r)),this.indexManager.addToCollectionParentIndex(e,a.key.path.popLast());return p.resolve(o)}lookupMutationBatch(e,t){return p.resolve(this.wr(t))}getNextMutationBatchAfterBatchId(e,t){const s=t+1,i=this.Sr(s),r=i<0?0:i;return p.resolve(this.mutationQueue.length>r?this.mutationQueue[r]:null)}getHighestUnacknowledgedBatchId(){return p.resolve(this.mutationQueue.length===0?-1:this.pr-1)}getAllMutationBatches(e){return p.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(e,t){const s=new se(t,0),i=new se(t,Number.POSITIVE_INFINITY),r=[];return this.yr.forEachInRange([s,i],o=>{const a=this.wr(o.gr);r.push(a)}),p.resolve(r)}getAllMutationBatchesAffectingDocumentKeys(e,t){let s=new fe(L);return t.forEach(i=>{const r=new se(i,0),o=new se(i,Number.POSITIVE_INFINITY);this.yr.forEachInRange([r,o],a=>{s=s.add(a.gr)})}),p.resolve(this.br(s))}getAllMutationBatchesAffectingQuery(e,t){const s=t.path,i=s.length+1;let r=s;w.isDocumentKey(r)||(r=r.child(""));const o=new se(new w(r),0);let a=new fe(L);return this.yr.forEachWhile(l=>{const c=l.key.path;return!!s.isPrefixOf(c)&&(c.length===i&&(a=a.add(l.gr)),!0)},o),p.resolve(this.br(a))}br(e){const t=[];return e.forEach(s=>{const i=this.wr(s);i!==null&&t.push(i)}),t}removeMutationBatch(e,t){F(this.Dr(t.batchId,"removed")===0),this.mutationQueue.shift();let s=this.yr;return p.forEach(t.mutations,i=>{const r=new se(i.key,t.batchId);return s=s.delete(r),this.referenceDelegate.markPotentiallyOrphaned(e,i.key)}).next(()=>{this.yr=s})}Fn(e){}containsKey(e,t){const s=new se(t,0),i=this.yr.firstAfterOrEqual(s);return p.resolve(t.isEqual(i&&i.key))}performConsistencyCheck(e){return this.mutationQueue.length,p.resolve()}Dr(e,t){return this.Sr(e)}Sr(e){return this.mutationQueue.length===0?0:e-this.mutationQueue[0].batchId}wr(e){const t=this.Sr(e);return t<0||t>=this.mutationQueue.length?null:this.mutationQueue[t]}}/**
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
 */class Ay{constructor(e){this.Cr=e,this.docs=function(){return new X(w.comparator)}(),this.size=0}setIndexManager(e){this.indexManager=e}addEntry(e,t){const s=t.key,i=this.docs.get(s),r=i?i.size:0,o=this.Cr(t);return this.docs=this.docs.insert(s,{document:t.mutableCopy(),size:o}),this.size+=o-r,this.indexManager.addToCollectionParentIndex(e,s.path.popLast())}removeEntry(e){const t=this.docs.get(e);t&&(this.docs=this.docs.remove(e),this.size-=t.size)}getEntry(e,t){const s=this.docs.get(t);return p.resolve(s?s.document.mutableCopy():re.newInvalidDocument(t))}getEntries(e,t){let s=tt();return t.forEach(i=>{const r=this.docs.get(i);s=s.insert(i,r?r.document.mutableCopy():re.newInvalidDocument(i))}),p.resolve(s)}getDocumentsMatchingQuery(e,t,s,i){let r=tt();const o=t.path,a=new w(o.child("")),l=this.docs.getIteratorFrom(a);for(;l.hasNext();){const{key:c,value:{document:u}}=l.getNext();if(!o.isPrefixOf(c.path))break;c.path.length>o.length+1||fg(dg(u),s)<=0||(i.has(u.key)||_r(t,u))&&(r=r.insert(u.key,u.mutableCopy()))}return p.resolve(r)}getAllFromCollectionGroup(e,t,s,i){C()}vr(e,t){return p.forEach(this.docs,s=>t(s))}newChangeBuffer(e){return new Ry(this)}getSize(e){return p.resolve(this.size)}}class Ry extends vy{constructor(e){super(),this._r=e}applyChanges(e){const t=[];return this.changes.forEach((s,i)=>{i.isValidDocument()?t.push(this._r.addEntry(e,i)):this._r.removeEntry(s)}),p.waitFor(t)}getFromCache(e,t){return this._r.getEntry(e,t)}getAllFromCache(e,t){return this._r.getEntries(e,t)}}/**
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
 */class Sy{constructor(e){this.persistence=e,this.Fr=new Pn(t=>Sa(t),Pa),this.lastRemoteSnapshotVersion=R.min(),this.highestTargetId=0,this.Mr=0,this.Or=new Va,this.targetCount=0,this.Nr=pn.On()}forEachTarget(e,t){return this.Fr.forEach((s,i)=>t(i)),p.resolve()}getLastRemoteSnapshotVersion(e){return p.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(e){return p.resolve(this.Mr)}allocateTargetId(e){return this.highestTargetId=this.Nr.next(),p.resolve(this.highestTargetId)}setTargetsMetadata(e,t,s){return s&&(this.lastRemoteSnapshotVersion=s),t>this.Mr&&(this.Mr=t),p.resolve()}kn(e){this.Fr.set(e.target,e);const t=e.targetId;t>this.highestTargetId&&(this.Nr=new pn(t),this.highestTargetId=t),e.sequenceNumber>this.Mr&&(this.Mr=e.sequenceNumber)}addTargetData(e,t){return this.kn(t),this.targetCount+=1,p.resolve()}updateTargetData(e,t){return this.kn(t),p.resolve()}removeTargetData(e,t){return this.Fr.delete(t.target),this.Or.Rr(t.targetId),this.targetCount-=1,p.resolve()}removeTargets(e,t,s){let i=0;const r=[];return this.Fr.forEach((o,a)=>{a.sequenceNumber<=t&&s.get(a.targetId)===null&&(this.Fr.delete(o),r.push(this.removeMatchingKeysForTargetId(e,a.targetId)),i++)}),p.waitFor(r).next(()=>i)}getTargetCount(e){return p.resolve(this.targetCount)}getTargetData(e,t){const s=this.Fr.get(t)||null;return p.resolve(s)}addMatchingKeys(e,t,s){return this.Or.Er(t,s),p.resolve()}removeMatchingKeys(e,t,s){this.Or.Ar(t,s);const i=this.persistence.referenceDelegate,r=[];return i&&t.forEach(o=>{r.push(i.markPotentiallyOrphaned(e,o))}),p.waitFor(r)}removeMatchingKeysForTargetId(e,t){return this.Or.Rr(t),p.resolve()}getMatchingKeysForTargetId(e,t){const s=this.Or.mr(t);return p.resolve(s)}containsKey(e,t){return p.resolve(this.Or.containsKey(t))}}/**
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
 */class Py{constructor(e,t){this.Br={},this.overlays={},this.Lr=new wa(0),this.kr=!1,this.kr=!0,this.referenceDelegate=e(this),this.qr=new Sy(this),this.indexManager=new gy,this.remoteDocumentCache=function(i){return new Ay(i)}(s=>this.referenceDelegate.Qr(s)),this.serializer=new py(t),this.Kr=new Iy(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.kr=!1,Promise.resolve()}get started(){return this.kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(e){return this.indexManager}getDocumentOverlayCache(e){let t=this.overlays[e.toKey()];return t||(t=new wy,this.overlays[e.toKey()]=t),t}getMutationQueue(e,t){let s=this.Br[e.toKey()];return s||(s=new Cy(t,this.referenceDelegate),this.Br[e.toKey()]=s),s}getTargetCache(){return this.qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Kr}runTransaction(e,t,s){T("MemoryPersistence","Starting transaction:",e);const i=new Ny(this.Lr.next());return this.referenceDelegate.$r(),s(i).next(r=>this.referenceDelegate.Ur(i).next(()=>r)).toPromise().then(r=>(i.raiseOnCommittedEvent(),r))}Wr(e,t){return p.or(Object.values(this.Br).map(s=>()=>s.containsKey(e,t)))}}class Ny extends pg{constructor(e){super(),this.currentSequenceNumber=e}}class xa{constructor(e){this.persistence=e,this.Gr=new Va,this.zr=null}static jr(e){return new xa(e)}get Hr(){if(this.zr)return this.zr;throw C()}addReference(e,t,s){return this.Gr.addReference(s,t),this.Hr.delete(s.toString()),p.resolve()}removeReference(e,t,s){return this.Gr.removeReference(s,t),this.Hr.add(s.toString()),p.resolve()}markPotentiallyOrphaned(e,t){return this.Hr.add(t.toString()),p.resolve()}removeTarget(e,t){this.Gr.Rr(t.targetId).forEach(i=>this.Hr.add(i.toString()));const s=this.persistence.getTargetCache();return s.getMatchingKeysForTargetId(e,t.targetId).next(i=>{i.forEach(r=>this.Hr.add(r.toString()))}).next(()=>s.removeTargetData(e,t))}$r(){this.zr=new Set}Ur(e){const t=this.persistence.getRemoteDocumentCache().newChangeBuffer();return p.forEach(this.Hr,s=>{const i=w.fromPath(s);return this.Jr(e,i).next(r=>{r||t.removeEntry(i,R.min())})}).next(()=>(this.zr=null,t.apply(e)))}updateLimboDocument(e,t){return this.Jr(e,t).next(s=>{s?this.Hr.delete(t.toString()):this.Hr.add(t.toString())})}Qr(e){return 0}Jr(e,t){return p.or([()=>p.resolve(this.Gr.containsKey(t)),()=>this.persistence.getTargetCache().containsKey(e,t),()=>this.persistence.Wr(e,t)])}}/**
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
 */class Ma{constructor(e,t,s,i){this.targetId=e,this.fromCache=t,this.ki=s,this.qi=i}static Qi(e,t){let s=k(),i=k();for(const r of t.docChanges)switch(r.type){case 0:s=s.add(r.doc.key);break;case 1:i=i.add(r.doc.key)}return new Ma(e,t.fromCache,s,i)}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */class by{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(e){this._documentReadCount+=e}}/**
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
 */class Dy{constructor(){this.Ki=!1,this.$i=!1,this.Ui=100,this.Wi=8}initialize(e,t){this.Gi=e,this.indexManager=t,this.Ki=!0}getDocumentsMatchingQuery(e,t,s,i){const r={result:null};return this.zi(e,t).next(o=>{r.result=o}).next(()=>{if(!r.result)return this.ji(e,t,i,s).next(o=>{r.result=o})}).next(()=>{if(r.result)return;const o=new by;return this.Hi(e,t,o).next(a=>{if(r.result=a,this.$i)return this.Ji(e,t,o,a.size)})}).next(()=>r.result)}Ji(e,t,s,i){return s.documentReadCount<this.Ui?(Fn()<=x.DEBUG&&T("QueryEngine","SDK will not create cache indexes for query:",Ht(t),"since it only creates cache indexes for collection contains","more than or equal to",this.Ui,"documents"),p.resolve()):(Fn()<=x.DEBUG&&T("QueryEngine","Query:",Ht(t),"scans",s.documentReadCount,"local documents and returns",i,"documents as results."),s.documentReadCount>this.Wi*i?(Fn()<=x.DEBUG&&T("QueryEngine","The SDK decides to create cache indexes for query:",Ht(t),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(e,je(t))):p.resolve())}zi(e,t){if(_c(t))return p.resolve(null);let s=je(t);return this.indexManager.getIndexType(e,s).next(i=>i===0?null:(t.limit!==null&&i===1&&(t=bo(t,null,"F"),s=je(t)),this.indexManager.getDocumentsMatchingTarget(e,s).next(r=>{const o=k(...r);return this.Gi.getDocuments(e,o).next(a=>this.indexManager.getMinOffset(e,s).next(l=>{const c=this.Yi(t,a);return this.Zi(t,c,o,l.readTime)?this.zi(e,bo(t,null,"F")):this.Xi(e,c,t,l)}))})))}ji(e,t,s,i){return _c(t)||i.isEqual(R.min())?p.resolve(null):this.Gi.getDocuments(e,s).next(r=>{const o=this.Yi(t,r);return this.Zi(t,o,s,i)?p.resolve(null):(Fn()<=x.DEBUG&&T("QueryEngine","Re-using previous result from %s to execute query: %s",i.toString(),Ht(t)),this.Xi(e,o,t,hg(i,-1)).next(a=>a))})}Yi(e,t){let s=new fe(Zh(e));return t.forEach((i,r)=>{_r(e,r)&&(s=s.add(r))}),s}Zi(e,t,s,i){if(e.limit===null)return!1;if(s.size!==t.size)return!0;const r=e.limitType==="F"?t.last():t.first();return!!r&&(r.hasPendingWrites||r.version.compareTo(i)>0)}Hi(e,t,s){return Fn()<=x.DEBUG&&T("QueryEngine","Using full collection scan to execute query:",Ht(t)),this.Gi.getDocumentsMatchingQuery(e,t,dt.min(),s)}Xi(e,t,s,i){return this.Gi.getDocumentsMatchingQuery(e,s,i).next(r=>(t.forEach(o=>{r=r.insert(o.key,o)}),r))}}/**
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
 */class ky{constructor(e,t,s,i){this.persistence=e,this.es=t,this.serializer=i,this.ts=new X(L),this.ns=new Pn(r=>Sa(r),Pa),this.rs=new Map,this.ss=e.getRemoteDocumentCache(),this.qr=e.getTargetCache(),this.Kr=e.getBundleCache(),this.os(s)}os(e){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(e),this.indexManager=this.persistence.getIndexManager(e),this.mutationQueue=this.persistence.getMutationQueue(e,this.indexManager),this.localDocuments=new Ty(this.ss,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ss.setIndexManager(this.indexManager),this.es.initialize(this.localDocuments,this.indexManager)}collectGarbage(e){return this.persistence.runTransaction("Collect garbage","readwrite-primary",t=>e.collect(t,this.ts))}}function Vy(n,e,t,s){return new ky(n,e,t,s)}async function Cd(n,e){const t=P(n);return await t.persistence.runTransaction("Handle user change","readonly",s=>{let i;return t.mutationQueue.getAllMutationBatches(s).next(r=>(i=r,t.os(e),t.mutationQueue.getAllMutationBatches(s))).next(r=>{const o=[],a=[];let l=k();for(const c of i){o.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}for(const c of r){a.push(c.batchId);for(const u of c.mutations)l=l.add(u.key)}return t.localDocuments.getDocuments(s,l).next(c=>({_s:c,removedBatchIds:o,addedBatchIds:a}))})})}function xy(n,e){const t=P(n);return t.persistence.runTransaction("Acknowledge batch","readwrite-primary",s=>{const i=e.batch.keys(),r=t.ss.newChangeBuffer({trackRemovals:!0});return function(a,l,c,u){const h=c.batch,d=h.keys();let f=p.resolve();return d.forEach(m=>{f=f.next(()=>u.getEntry(l,m)).next(v=>{const E=c.docVersions.get(m);F(E!==null),v.version.compareTo(E)<0&&(h.applyToRemoteDocument(v,c),v.isValidDocument()&&(v.setReadTime(c.commitVersion),u.addEntry(v)))})}),f.next(()=>a.mutationQueue.removeMutationBatch(l,h))}(t,s,e,r).next(()=>r.apply(s)).next(()=>t.mutationQueue.performConsistencyCheck(s)).next(()=>t.documentOverlayCache.removeOverlaysForBatchId(s,i,e.batch.batchId)).next(()=>t.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(s,function(a){let l=k();for(let c=0;c<a.mutationResults.length;++c)a.mutationResults[c].transformResults.length>0&&(l=l.add(a.batch.mutations[c].key));return l}(e))).next(()=>t.localDocuments.getDocuments(s,i))})}function Ad(n){const e=P(n);return e.persistence.runTransaction("Get last remote snapshot version","readonly",t=>e.qr.getLastRemoteSnapshotVersion(t))}function My(n,e){const t=P(n),s=e.snapshotVersion;let i=t.ts;return t.persistence.runTransaction("Apply remote event","readwrite-primary",r=>{const o=t.ss.newChangeBuffer({trackRemovals:!0});i=t.ts;const a=[];e.targetChanges.forEach((u,h)=>{const d=i.get(h);if(!d)return;a.push(t.qr.removeMatchingKeys(r,u.removedDocuments,h).next(()=>t.qr.addMatchingKeys(r,u.addedDocuments,h)));let f=d.withSequenceNumber(r.currentSequenceNumber);e.targetMismatches.get(h)!==null?f=f.withResumeToken(Te.EMPTY_BYTE_STRING,R.min()).withLastLimboFreeSnapshotVersion(R.min()):u.resumeToken.approximateByteSize()>0&&(f=f.withResumeToken(u.resumeToken,s)),i=i.insert(h,f),function(v,E,O){return v.resumeToken.approximateByteSize()===0||E.snapshotVersion.toMicroseconds()-v.snapshotVersion.toMicroseconds()>=3e8?!0:O.addedDocuments.size+O.modifiedDocuments.size+O.removedDocuments.size>0}(d,f,u)&&a.push(t.qr.updateTargetData(r,f))});let l=tt(),c=k();if(e.documentUpdates.forEach(u=>{e.resolvedLimboDocuments.has(u)&&a.push(t.persistence.referenceDelegate.updateLimboDocument(r,u))}),a.push(Oy(r,o,e.documentUpdates).next(u=>{l=u.us,c=u.cs})),!s.isEqual(R.min())){const u=t.qr.getLastRemoteSnapshotVersion(r).next(h=>t.qr.setTargetsMetadata(r,r.currentSequenceNumber,s));a.push(u)}return p.waitFor(a).next(()=>o.apply(r)).next(()=>t.localDocuments.getLocalViewOfDocuments(r,l,c)).next(()=>l)}).then(r=>(t.ts=i,r))}function Oy(n,e,t){let s=k(),i=k();return t.forEach(r=>s=s.add(r)),e.getEntries(n,s).next(r=>{let o=tt();return t.forEach((a,l)=>{const c=r.get(a);l.isFoundDocument()!==c.isFoundDocument()&&(i=i.add(a)),l.isNoDocument()&&l.version.isEqual(R.min())?(e.removeEntry(a,l.readTime),o=o.insert(a,l)):!c.isValidDocument()||l.version.compareTo(c.version)>0||l.version.compareTo(c.version)===0&&c.hasPendingWrites?(e.addEntry(l),o=o.insert(a,l)):T("LocalStore","Ignoring outdated watch update for ",a,". Current version:",c.version," Watch version:",l.version)}),{us:o,cs:i}})}function Ly(n,e){const t=P(n);return t.persistence.runTransaction("Get next mutation batch","readonly",s=>(e===void 0&&(e=-1),t.mutationQueue.getNextMutationBatchAfterBatchId(s,e)))}function Fy(n,e){const t=P(n);return t.persistence.runTransaction("Allocate target","readwrite",s=>{let i;return t.qr.getTargetData(s,e).next(r=>r?(i=r,p.resolve(i)):t.qr.allocateTargetId(s).next(o=>(i=new it(e,o,"TargetPurposeListen",s.currentSequenceNumber),t.qr.addTargetData(s,i).next(()=>i))))}).then(s=>{const i=t.ts.get(s.targetId);return(i===null||s.snapshotVersion.compareTo(i.snapshotVersion)>0)&&(t.ts=t.ts.insert(s.targetId,s),t.ns.set(e,s.targetId)),s})}async function Vo(n,e,t){const s=P(n),i=s.ts.get(e),r=t?"readwrite":"readwrite-primary";try{t||await s.persistence.runTransaction("Release target",r,o=>s.persistence.referenceDelegate.removeTarget(o,i))}catch(o){if(!Fs(o))throw o;T("LocalStore",`Failed to update sequence numbers for target ${e}: ${o}`)}s.ts=s.ts.remove(e),s.ns.delete(i.target)}function Ac(n,e,t){const s=P(n);let i=R.min(),r=k();return s.persistence.runTransaction("Execute query","readwrite",o=>function(l,c,u){const h=P(l),d=h.ns.get(u);return d!==void 0?p.resolve(h.ts.get(d)):h.qr.getTargetData(c,u)}(s,o,je(e)).next(a=>{if(a)return i=a.lastLimboFreeSnapshotVersion,s.qr.getMatchingKeysForTargetId(o,a.targetId).next(l=>{r=l})}).next(()=>s.es.getDocumentsMatchingQuery(o,e,t?i:R.min(),t?r:k())).next(a=>(Uy(s,Vg(e),a),{documents:a,ls:r})))}function Uy(n,e,t){let s=n.rs.get(e)||R.min();t.forEach((i,r)=>{r.readTime.compareTo(s)>0&&(s=r.readTime)}),n.rs.set(e,s)}class Rc{constructor(){this.activeTargetIds=Ug()}ds(e){this.activeTargetIds=this.activeTargetIds.add(e)}As(e){this.activeTargetIds=this.activeTargetIds.delete(e)}Es(){const e={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(e)}}class By{constructor(){this.eo=new Rc,this.no={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(e){}updateMutationState(e,t,s){}addLocalQueryTarget(e){return this.eo.ds(e),this.no[e]||"not-current"}updateQueryState(e,t,s){this.no[e]=t}removeLocalQueryTarget(e){this.eo.As(e)}isLocalQueryTarget(e){return this.eo.activeTargetIds.has(e)}clearQueryState(e){delete this.no[e]}getAllActiveQueryTargets(){return this.eo.activeTargetIds}isActiveQueryTarget(e){return this.eo.activeTargetIds.has(e)}start(){return this.eo=new Rc,Promise.resolve()}handleUserChange(e,t,s){}setOnlineState(e){}shutdown(){}writeSequenceNumber(e){}notifyBundleLoaded(e){}}/**
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
 */class qy{ro(e){}shutdown(){}}/**
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
 */class Sc{constructor(){this.io=()=>this.so(),this.oo=()=>this._o(),this.ao=[],this.uo()}ro(e){this.ao.push(e)}shutdown(){window.removeEventListener("online",this.io),window.removeEventListener("offline",this.oo)}uo(){window.addEventListener("online",this.io),window.addEventListener("offline",this.oo)}so(){T("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const e of this.ao)e(0)}_o(){T("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const e of this.ao)e(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
 * @license
 * Copyright 2023 Google LLC
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
 */let li=null;function Qr(){return li===null?li=function(){return 268435456+Math.round(2147483648*Math.random())}():li++,"0x"+li.toString(16)}/**
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
 */const Wy={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class jy{constructor(e){this.co=e.co,this.lo=e.lo}ho(e){this.Po=e}Io(e){this.To=e}onMessage(e){this.Eo=e}close(){this.lo()}send(e){this.co(e)}Ao(){this.Po()}Ro(e){this.To(e)}Vo(e){this.Eo(e)}}/**
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
 */const me="WebChannelConnection";class zy extends class{constructor(t){this.databaseInfo=t,this.databaseId=t.databaseId;const s=t.ssl?"https":"http",i=encodeURIComponent(this.databaseId.projectId),r=encodeURIComponent(this.databaseId.database);this.mo=s+"://"+t.host,this.fo=`projects/${i}/databases/${r}`,this.po=this.databaseId.database==="(default)"?`project_id=${i}`:`project_id=${i}&database_id=${r}`}get yo(){return!1}wo(t,s,i,r,o){const a=Qr(),l=this.So(t,s);T("RestConnection",`Sending RPC '${t}' ${a}:`,l,i);const c={"google-cloud-resource-prefix":this.fo,"x-goog-request-params":this.po};return this.bo(c,r,o),this.Do(t,l,c,i).then(u=>(T("RestConnection",`Received RPC '${t}' ${a}: `,u),u),u=>{throw cn("RestConnection",`RPC '${t}' ${a} failed with error: `,u,"url: ",l,"request:",i),u})}Co(t,s,i,r,o,a){return this.wo(t,s,i,r,o)}bo(t,s,i){t["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+Sn}(),t["Content-Type"]="text/plain",this.databaseInfo.appId&&(t["X-Firebase-GMPID"]=this.databaseInfo.appId),s&&s.headers.forEach((r,o)=>t[o]=r),i&&i.headers.forEach((r,o)=>t[o]=r)}So(t,s){const i=Wy[t];return`${this.mo}/v1/${s}:${i}`}}{constructor(e){super(e),this.forceLongPolling=e.forceLongPolling,this.autoDetectLongPolling=e.autoDetectLongPolling,this.useFetchStreams=e.useFetchStreams,this.longPollingOptions=e.longPollingOptions}Do(e,t,s,i){const r=Qr();return new Promise((o,a)=>{const l=new eg;l.setWithCredentials(!0),l.listenOnce(Jm.COMPLETE,()=>{try{switch(l.getLastErrorCode()){case Kr.NO_ERROR:const u=l.getResponseJson();T(me,`XHR for RPC '${e}' ${r} received:`,JSON.stringify(u)),o(u);break;case Kr.TIMEOUT:T(me,`RPC '${e}' ${r} timed out`),a(new I(_.DEADLINE_EXCEEDED,"Request time out"));break;case Kr.HTTP_ERROR:const h=l.getStatus();if(T(me,`RPC '${e}' ${r} failed with status:`,h,"response text:",l.getResponseText()),h>0){let d=l.getResponseJson();Array.isArray(d)&&(d=d[0]);const f=d==null?void 0:d.error;if(f&&f.status&&f.message){const m=function(E){const O=E.toLowerCase().replace(/_/g,"-");return Object.values(_).indexOf(O)>=0?O:_.UNKNOWN}(f.status);a(new I(m,f.message))}else a(new I(_.UNKNOWN,"Server responded with status "+l.getStatus()))}else a(new I(_.UNAVAILABLE,"Connection failed."));break;default:C()}}finally{T(me,`RPC '${e}' ${r} completed.`)}});const c=JSON.stringify(i);T(me,`RPC '${e}' ${r} sending request:`,i),l.send(t,"POST",c,s,15)})}vo(e,t,s){const i=Qr(),r=[this.mo,"/","google.firestore.v1.Firestore","/",e,"/channel"],o=Ym(),a=Xm(),l={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},c=this.longPollingOptions.timeoutSeconds;c!==void 0&&(l.longPollingTimeout=Math.round(1e3*c)),this.useFetchStreams&&(l.useFetchStreams=!0),this.bo(l.initMessageHeaders,t,s),l.encodeInitMessageHeaders=!0;const u=r.join("");T(me,`Creating RPC '${e}' stream ${i}: ${u}`,l);const h=o.createWebChannel(u,l);let d=!1,f=!1;const m=new jy({co:E=>{f?T(me,`Not sending because RPC '${e}' stream ${i} is closed:`,E):(d||(T(me,`Opening RPC '${e}' stream ${i} transport.`),h.open(),d=!0),T(me,`RPC '${e}' stream ${i} sending:`,E),h.send(E))},lo:()=>h.close()}),v=(E,O,$)=>{E.listen(O,le=>{try{$(le)}catch(xe){setTimeout(()=>{throw xe},0)}})};return v(h,ri.EventType.OPEN,()=>{f||T(me,`RPC '${e}' stream ${i} transport opened.`)}),v(h,ri.EventType.CLOSE,()=>{f||(f=!0,T(me,`RPC '${e}' stream ${i} transport closed`),m.Ro())}),v(h,ri.EventType.ERROR,E=>{f||(f=!0,cn(me,`RPC '${e}' stream ${i} transport errored:`,E),m.Ro(new I(_.UNAVAILABLE,"The operation could not be completed")))}),v(h,ri.EventType.MESSAGE,E=>{var O;if(!f){const $=E.data[0];F(!!$);const le=$,xe=le.error||((O=le[0])===null||O===void 0?void 0:O.error);if(xe){T(me,`RPC '${e}' stream ${i} received error:`,xe);const Zs=xe.status;let zt=function(E_){const xl=Q[E_];if(xl!==void 0)return _d(xl)}(Zs),ei=xe.message;zt===void 0&&(zt=_.INTERNAL,ei="Unknown error status: "+Zs+" with message "+xe.message),f=!0,m.Ro(new I(zt,ei)),h.close()}else T(me,`RPC '${e}' stream ${i} received:`,$),m.Vo($)}}),v(a,Zm.STAT_EVENT,E=>{E.stat===ic.PROXY?T(me,`RPC '${e}' stream ${i} detected buffering proxy`):E.stat===ic.NOPROXY&&T(me,`RPC '${e}' stream ${i} detected no buffering proxy`)}),setTimeout(()=>{m.Ao()},0),m}}function Yr(){return typeof document<"u"?document:null}/**
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
 */function vr(n){return new ty(n,!0)}/**
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
 */class Oa{constructor(e,t,s=1e3,i=1.5,r=6e4){this.si=e,this.timerId=t,this.Fo=s,this.Mo=i,this.xo=r,this.Oo=0,this.No=null,this.Bo=Date.now(),this.reset()}reset(){this.Oo=0}Lo(){this.Oo=this.xo}ko(e){this.cancel();const t=Math.floor(this.Oo+this.qo()),s=Math.max(0,Date.now()-this.Bo),i=Math.max(0,t-s);i>0&&T("ExponentialBackoff",`Backing off for ${i} ms (base delay: ${this.Oo} ms, delay with jitter: ${t} ms, last attempt: ${s} ms ago)`),this.No=this.si.enqueueAfterDelay(this.timerId,i,()=>(this.Bo=Date.now(),e())),this.Oo*=this.Mo,this.Oo<this.Fo&&(this.Oo=this.Fo),this.Oo>this.xo&&(this.Oo=this.xo)}Qo(){this.No!==null&&(this.No.skipDelay(),this.No=null)}cancel(){this.No!==null&&(this.No.cancel(),this.No=null)}qo(){return(Math.random()-.5)*this.Oo}}/**
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
 */class Rd{constructor(e,t,s,i,r,o,a,l){this.si=e,this.Ko=s,this.$o=i,this.connection=r,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=l,this.state=0,this.Uo=0,this.Wo=null,this.Go=null,this.stream=null,this.zo=new Oa(e,t)}jo(){return this.state===1||this.state===5||this.Ho()}Ho(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Jo()}async stop(){this.jo()&&await this.close(0)}Yo(){this.state=0,this.zo.reset()}Zo(){this.Ho()&&this.Wo===null&&(this.Wo=this.si.enqueueAfterDelay(this.Ko,6e4,()=>this.Xo()))}e_(e){this.t_(),this.stream.send(e)}async Xo(){if(this.Ho())return this.close(0)}t_(){this.Wo&&(this.Wo.cancel(),this.Wo=null)}n_(){this.Go&&(this.Go.cancel(),this.Go=null)}async close(e,t){this.t_(),this.n_(),this.zo.cancel(),this.Uo++,e!==4?this.zo.reset():t&&t.code===_.RESOURCE_EXHAUSTED?(et(t.toString()),et("Using maximum backoff delay to prevent overloading the backend."),this.zo.Lo()):t&&t.code===_.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.r_(),this.stream.close(),this.stream=null),this.state=e,await this.listener.Io(t)}r_(){}auth(){this.state=1;const e=this.i_(this.Uo),t=this.Uo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([s,i])=>{this.Uo===t&&this.s_(s,i)},s=>{e(()=>{const i=new I(_.UNKNOWN,"Fetching auth token failed: "+s.message);return this.o_(i)})})}s_(e,t){const s=this.i_(this.Uo);this.stream=this.__(e,t),this.stream.ho(()=>{s(()=>(this.state=2,this.Go=this.si.enqueueAfterDelay(this.$o,1e4,()=>(this.Ho()&&(this.state=3),Promise.resolve())),this.listener.ho()))}),this.stream.Io(i=>{s(()=>this.o_(i))}),this.stream.onMessage(i=>{s(()=>this.onMessage(i))})}Jo(){this.state=5,this.zo.ko(async()=>{this.state=0,this.start()})}o_(e){return T("PersistentStream",`close with error: ${e}`),this.stream=null,this.close(4,e)}i_(e){return t=>{this.si.enqueueAndForget(()=>this.Uo===e?t():(T("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class $y extends Rd{constructor(e,t,s,i,r,o){super(e,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",t,s,i,o),this.serializer=r}__(e,t){return this.connection.vo("Listen",e,t)}onMessage(e){this.zo.reset();const t=ry(this.serializer,e),s=function(r){if(!("targetChange"in r))return R.min();const o=r.targetChange;return o.targetIds&&o.targetIds.length?R.min():o.readTime?Ne(o.readTime):R.min()}(e);return this.listener.a_(t,s)}u_(e){const t={};t.database=Es(this.serializer),t.addTarget=function(r,o){let a;const l=o.target;if(a=No(l)?{documents:ay(r,l)}:{query:ly(r,l)},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=gd(r,o.resumeToken);const c=Do(r,o.expectedCount);c!==null&&(a.expectedCount=c)}else if(o.snapshotVersion.compareTo(R.min())>0){a.readTime=Si(r,o.snapshotVersion.toTimestamp());const c=Do(r,o.expectedCount);c!==null&&(a.expectedCount=c)}return a}(this.serializer,e);const s=uy(this.serializer,e);s&&(t.labels=s),this.e_(t)}c_(e){const t={};t.database=Es(this.serializer),t.removeTarget=e,this.e_(t)}}class Gy extends Rd{constructor(e,t,s,i,r,o){super(e,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",t,s,i,o),this.serializer=r,this.l_=!1}get h_(){return this.l_}start(){this.l_=!1,this.lastStreamToken=void 0,super.start()}r_(){this.l_&&this.P_([])}__(e,t){return this.connection.vo("Write",e,t)}onMessage(e){if(F(!!e.streamToken),this.lastStreamToken=e.streamToken,this.l_){this.zo.reset();const t=oy(e.writeResults,e.commitTime),s=Ne(e.commitTime);return this.listener.I_(s,t)}return F(!e.writeResults||e.writeResults.length===0),this.l_=!0,this.listener.T_()}E_(){const e={};e.database=Es(this.serializer),this.e_(e)}P_(e){const t={streamToken:this.lastStreamToken,writes:e.map(s=>Ed(this.serializer,s))};this.e_(t)}}/**
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
 */class Hy extends class{}{constructor(e,t,s,i){super(),this.authCredentials=e,this.appCheckCredentials=t,this.connection=s,this.serializer=i,this.d_=!1}A_(){if(this.d_)throw new I(_.FAILED_PRECONDITION,"The client has already been terminated.")}wo(e,t,s){return this.A_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,r])=>this.connection.wo(e,t,s,i,r)).catch(i=>{throw i.name==="FirebaseError"?(i.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new I(_.UNKNOWN,i.toString())})}Co(e,t,s,i){return this.A_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([r,o])=>this.connection.Co(e,t,s,r,o,i)).catch(r=>{throw r.name==="FirebaseError"?(r.code===_.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),r):new I(_.UNKNOWN,r.toString())})}terminate(){this.d_=!0}}class Ky{constructor(e,t){this.asyncQueue=e,this.onlineStateHandler=t,this.state="Unknown",this.V_=0,this.m_=null,this.f_=!0}g_(){this.V_===0&&(this.p_("Unknown"),this.m_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.m_=null,this.y_("Backend didn't respond within 10 seconds."),this.p_("Offline"),Promise.resolve())))}w_(e){this.state==="Online"?this.p_("Unknown"):(this.V_++,this.V_>=1&&(this.S_(),this.y_(`Connection failed 1 times. Most recent error: ${e.toString()}`),this.p_("Offline")))}set(e){this.S_(),this.V_=0,e==="Online"&&(this.f_=!1),this.p_(e)}p_(e){e!==this.state&&(this.state=e,this.onlineStateHandler(e))}y_(e){const t=`Could not reach Cloud Firestore backend. ${e}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.f_?(et(t),this.f_=!1):T("OnlineStateTracker",t)}S_(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}}/**
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
 */class Qy{constructor(e,t,s,i,r){this.localStore=e,this.datastore=t,this.asyncQueue=s,this.remoteSyncer={},this.b_=[],this.D_=new Map,this.C_=new Set,this.v_=[],this.F_=r,this.F_.ro(o=>{s.enqueueAndForget(async()=>{qt(this)&&(T("RemoteStore","Restarting streams for network reachability change."),await async function(l){const c=P(l);c.C_.add(4),await Ws(c),c.M_.set("Unknown"),c.C_.delete(4),await Er(c)}(this))})}),this.M_=new Ky(s,i)}}async function Er(n){if(qt(n))for(const e of n.v_)await e(!0)}async function Ws(n){for(const e of n.v_)await e(!1)}function Sd(n,e){const t=P(n);t.D_.has(e.targetId)||(t.D_.set(e.targetId,e),Ua(t)?Fa(t):Nn(t).Ho()&&La(t,e))}function Pd(n,e){const t=P(n),s=Nn(t);t.D_.delete(e),s.Ho()&&Nd(t,e),t.D_.size===0&&(s.Ho()?s.Zo():qt(t)&&t.M_.set("Unknown"))}function La(n,e){if(n.x_.Oe(e.targetId),e.resumeToken.approximateByteSize()>0||e.snapshotVersion.compareTo(R.min())>0){const t=n.remoteSyncer.getRemoteKeysForTarget(e.targetId).size;e=e.withExpectedCount(t)}Nn(n).u_(e)}function Nd(n,e){n.x_.Oe(e),Nn(n).c_(e)}function Fa(n){n.x_=new Xg({getRemoteKeysForTarget:e=>n.remoteSyncer.getRemoteKeysForTarget(e),_t:e=>n.D_.get(e)||null,nt:()=>n.datastore.serializer.databaseId}),Nn(n).start(),n.M_.g_()}function Ua(n){return qt(n)&&!Nn(n).jo()&&n.D_.size>0}function qt(n){return P(n).C_.size===0}function bd(n){n.x_=void 0}async function Yy(n){n.D_.forEach((e,t)=>{La(n,e)})}async function Xy(n,e){bd(n),Ua(n)?(n.M_.w_(e),Fa(n)):n.M_.set("Unknown")}async function Jy(n,e,t){if(n.M_.set("Online"),e instanceof md&&e.state===2&&e.cause)try{await async function(i,r){const o=r.cause;for(const a of r.targetIds)i.D_.has(a)&&(await i.remoteSyncer.rejectListen(a,o),i.D_.delete(a),i.x_.removeTarget(a))}(n,e)}catch(s){T("RemoteStore","Failed to remove targets %s: %s ",e.targetIds.join(","),s),await Ni(n,s)}else if(e instanceof fi?n.x_.$e(e):e instanceof pd?n.x_.Je(e):n.x_.Ge(e),!t.isEqual(R.min()))try{const s=await Ad(n.localStore);t.compareTo(s)>=0&&await function(r,o){const a=r.x_.it(o);return a.targetChanges.forEach((l,c)=>{if(l.resumeToken.approximateByteSize()>0){const u=r.D_.get(c);u&&r.D_.set(c,u.withResumeToken(l.resumeToken,o))}}),a.targetMismatches.forEach((l,c)=>{const u=r.D_.get(l);if(!u)return;r.D_.set(l,u.withResumeToken(Te.EMPTY_BYTE_STRING,u.snapshotVersion)),Nd(r,l);const h=new it(u.target,l,c,u.sequenceNumber);La(r,h)}),r.remoteSyncer.applyRemoteEvent(a)}(n,t)}catch(s){T("RemoteStore","Failed to raise snapshot:",s),await Ni(n,s)}}async function Ni(n,e,t){if(!Fs(e))throw e;n.C_.add(1),await Ws(n),n.M_.set("Offline"),t||(t=()=>Ad(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{T("RemoteStore","Retrying IndexedDB access"),await t(),n.C_.delete(1),await Er(n)})}function Dd(n,e){return e().catch(t=>Ni(n,t,e))}async function Tr(n){const e=P(n),t=_t(e);let s=e.b_.length>0?e.b_[e.b_.length-1].batchId:-1;for(;Zy(e);)try{const i=await Ly(e.localStore,s);if(i===null){e.b_.length===0&&t.Zo();break}s=i.batchId,ev(e,i)}catch(i){await Ni(e,i)}kd(e)&&Vd(e)}function Zy(n){return qt(n)&&n.b_.length<10}function ev(n,e){n.b_.push(e);const t=_t(n);t.Ho()&&t.h_&&t.P_(e.mutations)}function kd(n){return qt(n)&&!_t(n).jo()&&n.b_.length>0}function Vd(n){_t(n).start()}async function tv(n){_t(n).E_()}async function nv(n){const e=_t(n);for(const t of n.b_)e.P_(t.mutations)}async function sv(n,e,t){const s=n.b_.shift(),i=ba.from(s,e,t);await Dd(n,()=>n.remoteSyncer.applySuccessfulWrite(i)),await Tr(n)}async function iv(n,e){e&&_t(n).h_&&await async function(s,i){if(function(o){return fd(o)&&o!==_.ABORTED}(i.code)){const r=s.b_.shift();_t(s).Yo(),await Dd(s,()=>s.remoteSyncer.rejectFailedWrite(r.batchId,i)),await Tr(s)}}(n,e),kd(n)&&Vd(n)}async function Pc(n,e){const t=P(n);t.asyncQueue.verifyOperationInProgress(),T("RemoteStore","RemoteStore received new credentials");const s=qt(t);t.C_.add(3),await Ws(t),s&&t.M_.set("Unknown"),await t.remoteSyncer.handleCredentialChange(e),t.C_.delete(3),await Er(t)}async function rv(n,e){const t=P(n);e?(t.C_.delete(2),await Er(t)):e||(t.C_.add(2),await Ws(t),t.M_.set("Unknown"))}function Nn(n){return n.O_||(n.O_=function(t,s,i){const r=P(t);return r.A_(),new $y(s,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(n.datastore,n.asyncQueue,{ho:Yy.bind(null,n),Io:Xy.bind(null,n),a_:Jy.bind(null,n)}),n.v_.push(async e=>{e?(n.O_.Yo(),Ua(n)?Fa(n):n.M_.set("Unknown")):(await n.O_.stop(),bd(n))})),n.O_}function _t(n){return n.N_||(n.N_=function(t,s,i){const r=P(t);return r.A_(),new Gy(s,r.connection,r.authCredentials,r.appCheckCredentials,r.serializer,i)}(n.datastore,n.asyncQueue,{ho:tv.bind(null,n),Io:iv.bind(null,n),T_:nv.bind(null,n),I_:sv.bind(null,n)}),n.v_.push(async e=>{e?(n.N_.Yo(),await Tr(n)):(await n.N_.stop(),n.b_.length>0&&(T("RemoteStore",`Stopping write stream with ${n.b_.length} pending writes`),n.b_=[]))})),n.N_}/**
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
 */class Ba{constructor(e,t,s,i,r){this.asyncQueue=e,this.timerId=t,this.targetTimeMs=s,this.op=i,this.removalCallback=r,this.deferred=new We,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(e,t,s,i,r){const o=Date.now()+s,a=new Ba(e,t,o,i,r);return a.start(s),a}start(e){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),e)}skipDelay(){return this.handleDelayElapsed()}cancel(e){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new I(_.CANCELLED,"Operation cancelled"+(e?": "+e:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(e=>this.deferred.resolve(e))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function qa(n,e){if(et("AsyncQueue",`${e}: ${n}`),Fs(n))return new I(_.UNAVAILABLE,`${e}: ${n}`);throw n}/**
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
 */class tn{constructor(e){this.comparator=e?(t,s)=>e(t,s)||w.comparator(t.key,s.key):(t,s)=>w.comparator(t.key,s.key),this.keyedMap=$n(),this.sortedSet=new X(this.comparator)}static emptySet(e){return new tn(e.comparator)}has(e){return this.keyedMap.get(e)!=null}get(e){return this.keyedMap.get(e)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(e){const t=this.keyedMap.get(e);return t?this.sortedSet.indexOf(t):-1}get size(){return this.sortedSet.size}forEach(e){this.sortedSet.inorderTraversal((t,s)=>(e(t),!1))}add(e){const t=this.delete(e.key);return t.copy(t.keyedMap.insert(e.key,e),t.sortedSet.insert(e,null))}delete(e){const t=this.get(e);return t?this.copy(this.keyedMap.remove(e),this.sortedSet.remove(t)):this}isEqual(e){if(!(e instanceof tn)||this.size!==e.size)return!1;const t=this.sortedSet.getIterator(),s=e.sortedSet.getIterator();for(;t.hasNext();){const i=t.getNext().key,r=s.getNext().key;if(!i.isEqual(r))return!1}return!0}toString(){const e=[];return this.forEach(t=>{e.push(t.toString())}),e.length===0?"DocumentSet ()":`DocumentSet (
  `+e.join(`  
`)+`
)`}copy(e,t){const s=new tn;return s.comparator=this.comparator,s.keyedMap=e,s.sortedSet=t,s}}/**
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
 */class Nc{constructor(){this.B_=new X(w.comparator)}track(e){const t=e.doc.key,s=this.B_.get(t);s?e.type!==0&&s.type===3?this.B_=this.B_.insert(t,e):e.type===3&&s.type!==1?this.B_=this.B_.insert(t,{type:s.type,doc:e.doc}):e.type===2&&s.type===2?this.B_=this.B_.insert(t,{type:2,doc:e.doc}):e.type===2&&s.type===0?this.B_=this.B_.insert(t,{type:0,doc:e.doc}):e.type===1&&s.type===0?this.B_=this.B_.remove(t):e.type===1&&s.type===2?this.B_=this.B_.insert(t,{type:1,doc:s.doc}):e.type===0&&s.type===1?this.B_=this.B_.insert(t,{type:2,doc:e.doc}):C():this.B_=this.B_.insert(t,e)}L_(){const e=[];return this.B_.inorderTraversal((t,s)=>{e.push(s)}),e}}class mn{constructor(e,t,s,i,r,o,a,l,c){this.query=e,this.docs=t,this.oldDocs=s,this.docChanges=i,this.mutatedKeys=r,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=l,this.hasCachedResults=c}static fromInitialDocuments(e,t,s,i,r){const o=[];return t.forEach(a=>{o.push({type:0,doc:a})}),new mn(e,t,tn.emptySet(t),o,s,i,!0,!1,r)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(e){if(!(this.fromCache===e.fromCache&&this.hasCachedResults===e.hasCachedResults&&this.syncStateChanged===e.syncStateChanged&&this.mutatedKeys.isEqual(e.mutatedKeys)&&fr(this.query,e.query)&&this.docs.isEqual(e.docs)&&this.oldDocs.isEqual(e.oldDocs)))return!1;const t=this.docChanges,s=e.docChanges;if(t.length!==s.length)return!1;for(let i=0;i<t.length;i++)if(t[i].type!==s[i].type||!t[i].doc.isEqual(s[i].doc))return!1;return!0}}/**
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
 */class ov{constructor(){this.k_=void 0,this.listeners=[]}}class av{constructor(){this.queries=new Pn(e=>Jh(e),fr),this.onlineState="Unknown",this.q_=new Set}}async function Wa(n,e){const t=P(n),s=e.query;let i=!1,r=t.queries.get(s);if(r||(i=!0,r=new ov),i)try{r.k_=await t.onListen(s)}catch(o){const a=qa(o,`Initialization of query '${Ht(e.query)}' failed`);return void e.onError(a)}t.queries.set(s,r),r.listeners.push(e),e.Q_(t.onlineState),r.k_&&e.K_(r.k_)&&za(t)}async function ja(n,e){const t=P(n),s=e.query;let i=!1;const r=t.queries.get(s);if(r){const o=r.listeners.indexOf(e);o>=0&&(r.listeners.splice(o,1),i=r.listeners.length===0)}if(i)return t.queries.delete(s),t.onUnlisten(s)}function lv(n,e){const t=P(n);let s=!1;for(const i of e){const r=i.query,o=t.queries.get(r);if(o){for(const a of o.listeners)a.K_(i)&&(s=!0);o.k_=i}}s&&za(t)}function cv(n,e,t){const s=P(n),i=s.queries.get(e);if(i)for(const r of i.listeners)r.onError(t);s.queries.delete(e)}function za(n){n.q_.forEach(e=>{e.next()})}class $a{constructor(e,t,s){this.query=e,this.U_=t,this.W_=!1,this.G_=null,this.onlineState="Unknown",this.options=s||{}}K_(e){if(!this.options.includeMetadataChanges){const s=[];for(const i of e.docChanges)i.type!==3&&s.push(i);e=new mn(e.query,e.docs,e.oldDocs,s,e.mutatedKeys,e.fromCache,e.syncStateChanged,!0,e.hasCachedResults)}let t=!1;return this.W_?this.z_(e)&&(this.U_.next(e),t=!0):this.j_(e,this.onlineState)&&(this.H_(e),t=!0),this.G_=e,t}onError(e){this.U_.error(e)}Q_(e){this.onlineState=e;let t=!1;return this.G_&&!this.W_&&this.j_(this.G_,e)&&(this.H_(this.G_),t=!0),t}j_(e,t){if(!e.fromCache)return!0;const s=t!=="Offline";return(!this.options.J_||!s)&&(!e.docs.isEmpty()||e.hasCachedResults||t==="Offline")}z_(e){if(e.docChanges.length>0)return!0;const t=this.G_&&this.G_.hasPendingWrites!==e.hasPendingWrites;return!(!e.syncStateChanged&&!t)&&this.options.includeMetadataChanges===!0}H_(e){e=mn.fromInitialDocuments(e.query,e.docs,e.mutatedKeys,e.fromCache,e.hasCachedResults),this.W_=!0,this.U_.next(e)}}/**
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
 */class xd{constructor(e){this.key=e}}class Md{constructor(e){this.key=e}}class uv{constructor(e,t){this.query=e,this.ia=t,this.sa=null,this.hasCachedResults=!1,this.current=!1,this.oa=k(),this.mutatedKeys=k(),this._a=Zh(e),this.aa=new tn(this._a)}get ua(){return this.ia}ca(e,t){const s=t?t.la:new Nc,i=t?t.aa:this.aa;let r=t?t.mutatedKeys:this.mutatedKeys,o=i,a=!1;const l=this.query.limitType==="F"&&i.size===this.query.limit?i.last():null,c=this.query.limitType==="L"&&i.size===this.query.limit?i.first():null;if(e.inorderTraversal((u,h)=>{const d=i.get(u),f=_r(this.query,h)?h:null,m=!!d&&this.mutatedKeys.has(d.key),v=!!f&&(f.hasLocalMutations||this.mutatedKeys.has(f.key)&&f.hasCommittedMutations);let E=!1;d&&f?d.data.isEqual(f.data)?m!==v&&(s.track({type:3,doc:f}),E=!0):this.ha(d,f)||(s.track({type:2,doc:f}),E=!0,(l&&this._a(f,l)>0||c&&this._a(f,c)<0)&&(a=!0)):!d&&f?(s.track({type:0,doc:f}),E=!0):d&&!f&&(s.track({type:1,doc:d}),E=!0,(l||c)&&(a=!0)),E&&(f?(o=o.add(f),r=v?r.add(u):r.delete(u)):(o=o.delete(u),r=r.delete(u)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const u=this.query.limitType==="F"?o.last():o.first();o=o.delete(u.key),r=r.delete(u.key),s.track({type:1,doc:u})}return{aa:o,la:s,Zi:a,mutatedKeys:r}}ha(e,t){return e.hasLocalMutations&&t.hasCommittedMutations&&!t.hasLocalMutations}applyChanges(e,t,s,i){const r=this.aa;this.aa=e.aa,this.mutatedKeys=e.mutatedKeys;const o=e.la.L_();o.sort((u,h)=>function(f,m){const v=E=>{switch(E){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return C()}};return v(f)-v(m)}(u.type,h.type)||this._a(u.doc,h.doc)),this.Pa(s),i=i!=null&&i;const a=t&&!i?this.Ia():[],l=this.oa.size===0&&this.current&&!i?1:0,c=l!==this.sa;return this.sa=l,o.length!==0||c?{snapshot:new mn(this.query,e.aa,r,o,e.mutatedKeys,l===0,c,!1,!!s&&s.resumeToken.approximateByteSize()>0),Ta:a}:{Ta:a}}Q_(e){return this.current&&e==="Offline"?(this.current=!1,this.applyChanges({aa:this.aa,la:new Nc,mutatedKeys:this.mutatedKeys,Zi:!1},!1)):{Ta:[]}}Ea(e){return!this.ia.has(e)&&!!this.aa.has(e)&&!this.aa.get(e).hasLocalMutations}Pa(e){e&&(e.addedDocuments.forEach(t=>this.ia=this.ia.add(t)),e.modifiedDocuments.forEach(t=>{}),e.removedDocuments.forEach(t=>this.ia=this.ia.delete(t)),this.current=e.current)}Ia(){if(!this.current)return[];const e=this.oa;this.oa=k(),this.aa.forEach(s=>{this.Ea(s.key)&&(this.oa=this.oa.add(s.key))});const t=[];return e.forEach(s=>{this.oa.has(s)||t.push(new Md(s))}),this.oa.forEach(s=>{e.has(s)||t.push(new xd(s))}),t}da(e){this.ia=e.ls,this.oa=k();const t=this.ca(e.documents);return this.applyChanges(t,!0)}Aa(){return mn.fromInitialDocuments(this.query,this.aa,this.mutatedKeys,this.sa===0,this.hasCachedResults)}}class hv{constructor(e,t,s){this.query=e,this.targetId=t,this.view=s}}class dv{constructor(e){this.key=e,this.Ra=!1}}class fv{constructor(e,t,s,i,r,o){this.localStore=e,this.remoteStore=t,this.eventManager=s,this.sharedClientState=i,this.currentUser=r,this.maxConcurrentLimboResolutions=o,this.Va={},this.ma=new Pn(a=>Jh(a),fr),this.fa=new Map,this.ga=new Set,this.pa=new X(w.comparator),this.ya=new Map,this.wa=new Va,this.Sa={},this.ba=new Map,this.Da=pn.Nn(),this.onlineState="Unknown",this.Ca=void 0}get isPrimaryClient(){return this.Ca===!0}}async function _v(n,e){const t=Cv(n);let s,i;const r=t.ma.get(e);if(r)s=r.targetId,t.sharedClientState.addLocalQueryTarget(s),i=r.view.Aa();else{const o=await Fy(t.localStore,je(e)),a=t.sharedClientState.addLocalQueryTarget(o.targetId);s=o.targetId,i=await pv(t,e,s,a==="current",o.resumeToken),t.isPrimaryClient&&Sd(t.remoteStore,o)}return i}async function pv(n,e,t,s,i){n.va=(h,d,f)=>async function(v,E,O,$){let le=E.view.ca(O);le.Zi&&(le=await Ac(v.localStore,E.query,!1).then(({documents:ei})=>E.view.ca(ei,le)));const xe=$&&$.targetChanges.get(E.targetId),Zs=$&&$.targetMismatches.get(E.targetId)!=null,zt=E.view.applyChanges(le,v.isPrimaryClient,xe,Zs);return Dc(v,E.targetId,zt.Ta),zt.snapshot}(n,h,d,f);const r=await Ac(n.localStore,e,!0),o=new uv(e,r.ls),a=o.ca(r.documents),l=qs.createSynthesizedTargetChangeForCurrentChange(t,s&&n.onlineState!=="Offline",i),c=o.applyChanges(a,n.isPrimaryClient,l);Dc(n,t,c.Ta);const u=new hv(e,t,o);return n.ma.set(e,u),n.fa.has(t)?n.fa.get(t).push(e):n.fa.set(t,[e]),c.snapshot}async function mv(n,e){const t=P(n),s=t.ma.get(e),i=t.fa.get(s.targetId);if(i.length>1)return t.fa.set(s.targetId,i.filter(r=>!fr(r,e))),void t.ma.delete(e);t.isPrimaryClient?(t.sharedClientState.removeLocalQueryTarget(s.targetId),t.sharedClientState.isActiveQueryTarget(s.targetId)||await Vo(t.localStore,s.targetId,!1).then(()=>{t.sharedClientState.clearQueryState(s.targetId),Pd(t.remoteStore,s.targetId),xo(t,s.targetId)}).catch(Ls)):(xo(t,s.targetId),await Vo(t.localStore,s.targetId,!0))}async function gv(n,e,t){const s=Av(n);try{const i=await function(o,a){const l=P(o),c=te.now(),u=a.reduce((f,m)=>f.add(m.key),k());let h,d;return l.persistence.runTransaction("Locally write mutations","readwrite",f=>{let m=tt(),v=k();return l.ss.getEntries(f,u).next(E=>{m=E,m.forEach((O,$)=>{$.isValidDocument()||(v=v.add(O))})}).next(()=>l.localDocuments.getOverlayedDocuments(f,m)).next(E=>{h=E;const O=[];for(const $ of a){const le=$g($,h.get($.key).overlayedDocument);le!=null&&O.push(new Et($.key,le,$h(le.value.mapValue),ye.exists(!0)))}return l.mutationQueue.addMutationBatch(f,c,O,a)}).next(E=>{d=E;const O=E.applyToLocalDocumentSet(h,v);return l.documentOverlayCache.saveOverlays(f,E.batchId,O)})}).then(()=>({batchId:d.batchId,changes:td(h)}))}(s.localStore,e);s.sharedClientState.addPendingMutation(i.batchId),function(o,a,l){let c=o.Sa[o.currentUser.toKey()];c||(c=new X(L)),c=c.insert(a,l),o.Sa[o.currentUser.toKey()]=c}(s,i.batchId,t),await js(s,i.changes),await Tr(s.remoteStore)}catch(i){const r=qa(i,"Failed to persist write");t.reject(r)}}async function Od(n,e){const t=P(n);try{const s=await My(t.localStore,e);e.targetChanges.forEach((i,r)=>{const o=t.ya.get(r);o&&(F(i.addedDocuments.size+i.modifiedDocuments.size+i.removedDocuments.size<=1),i.addedDocuments.size>0?o.Ra=!0:i.modifiedDocuments.size>0?F(o.Ra):i.removedDocuments.size>0&&(F(o.Ra),o.Ra=!1))}),await js(t,s,e)}catch(s){await Ls(s)}}function bc(n,e,t){const s=P(n);if(s.isPrimaryClient&&t===0||!s.isPrimaryClient&&t===1){const i=[];s.ma.forEach((r,o)=>{const a=o.view.Q_(e);a.snapshot&&i.push(a.snapshot)}),function(o,a){const l=P(o);l.onlineState=a;let c=!1;l.queries.forEach((u,h)=>{for(const d of h.listeners)d.Q_(a)&&(c=!0)}),c&&za(l)}(s.eventManager,e),i.length&&s.Va.a_(i),s.onlineState=e,s.isPrimaryClient&&s.sharedClientState.setOnlineState(e)}}async function yv(n,e,t){const s=P(n);s.sharedClientState.updateQueryState(e,"rejected",t);const i=s.ya.get(e),r=i&&i.key;if(r){let o=new X(w.comparator);o=o.insert(r,re.newNoDocument(r,R.min()));const a=k().add(r),l=new yr(R.min(),new Map,new X(L),o,a);await Od(s,l),s.pa=s.pa.remove(r),s.ya.delete(e),Ga(s)}else await Vo(s.localStore,e,!1).then(()=>xo(s,e,t)).catch(Ls)}async function vv(n,e){const t=P(n),s=e.batch.batchId;try{const i=await xy(t.localStore,e);Fd(t,s,null),Ld(t,s),t.sharedClientState.updateMutationState(s,"acknowledged"),await js(t,i)}catch(i){await Ls(i)}}async function Ev(n,e,t){const s=P(n);try{const i=await function(o,a){const l=P(o);return l.persistence.runTransaction("Reject batch","readwrite-primary",c=>{let u;return l.mutationQueue.lookupMutationBatch(c,a).next(h=>(F(h!==null),u=h.keys(),l.mutationQueue.removeMutationBatch(c,h))).next(()=>l.mutationQueue.performConsistencyCheck(c)).next(()=>l.documentOverlayCache.removeOverlaysForBatchId(c,u,a)).next(()=>l.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(c,u)).next(()=>l.localDocuments.getDocuments(c,u))})}(s.localStore,e);Fd(s,e,t),Ld(s,e),s.sharedClientState.updateMutationState(e,"rejected",t),await js(s,i)}catch(i){await Ls(i)}}function Ld(n,e){(n.ba.get(e)||[]).forEach(t=>{t.resolve()}),n.ba.delete(e)}function Fd(n,e,t){const s=P(n);let i=s.Sa[s.currentUser.toKey()];if(i){const r=i.get(e);r&&(t?r.reject(t):r.resolve(),i=i.remove(e)),s.Sa[s.currentUser.toKey()]=i}}function xo(n,e,t=null){n.sharedClientState.removeLocalQueryTarget(e);for(const s of n.fa.get(e))n.ma.delete(s),t&&n.Va.Fa(s,t);n.fa.delete(e),n.isPrimaryClient&&n.wa.Rr(e).forEach(s=>{n.wa.containsKey(s)||Ud(n,s)})}function Ud(n,e){n.ga.delete(e.path.canonicalString());const t=n.pa.get(e);t!==null&&(Pd(n.remoteStore,t),n.pa=n.pa.remove(e),n.ya.delete(t),Ga(n))}function Dc(n,e,t){for(const s of t)s instanceof xd?(n.wa.addReference(s.key,e),Tv(n,s)):s instanceof Md?(T("SyncEngine","Document no longer in limbo: "+s.key),n.wa.removeReference(s.key,e),n.wa.containsKey(s.key)||Ud(n,s.key)):C()}function Tv(n,e){const t=e.key,s=t.path.canonicalString();n.pa.get(t)||n.ga.has(s)||(T("SyncEngine","New document in limbo: "+t),n.ga.add(s),Ga(n))}function Ga(n){for(;n.ga.size>0&&n.pa.size<n.maxConcurrentLimboResolutions;){const e=n.ga.values().next().value;n.ga.delete(e);const t=new w(z.fromString(e)),s=n.Da.next();n.ya.set(s,new dv(t)),n.pa=n.pa.insert(t,s),Sd(n.remoteStore,new it(je(dr(t.path)),s,"TargetPurposeLimboResolution",wa._e))}}async function js(n,e,t){const s=P(n),i=[],r=[],o=[];s.ma.isEmpty()||(s.ma.forEach((a,l)=>{o.push(s.va(l,e,t).then(c=>{if((c||t)&&s.isPrimaryClient&&s.sharedClientState.updateQueryState(l.targetId,c!=null&&c.fromCache?"not-current":"current"),c){i.push(c);const u=Ma.Qi(l.targetId,c);r.push(u)}}))}),await Promise.all(o),s.Va.a_(i),await async function(l,c){const u=P(l);try{await u.persistence.runTransaction("notifyLocalViewChanges","readwrite",h=>p.forEach(c,d=>p.forEach(d.ki,f=>u.persistence.referenceDelegate.addReference(h,d.targetId,f)).next(()=>p.forEach(d.qi,f=>u.persistence.referenceDelegate.removeReference(h,d.targetId,f)))))}catch(h){if(!Fs(h))throw h;T("LocalStore","Failed to update sequence numbers: "+h)}for(const h of c){const d=h.targetId;if(!h.fromCache){const f=u.ts.get(d),m=f.snapshotVersion,v=f.withLastLimboFreeSnapshotVersion(m);u.ts=u.ts.insert(d,v)}}}(s.localStore,r))}async function Iv(n,e){const t=P(n);if(!t.currentUser.isEqual(e)){T("SyncEngine","User change. New user:",e.toKey());const s=await Cd(t.localStore,e);t.currentUser=e,function(r,o){r.ba.forEach(a=>{a.forEach(l=>{l.reject(new I(_.CANCELLED,o))})}),r.ba.clear()}(t,"'waitForPendingWrites' promise is rejected due to a user change."),t.sharedClientState.handleUserChange(e,s.removedBatchIds,s.addedBatchIds),await js(t,s._s)}}function wv(n,e){const t=P(n),s=t.ya.get(e);if(s&&s.Ra)return k().add(s.key);{let i=k();const r=t.fa.get(e);if(!r)return i;for(const o of r){const a=t.ma.get(o);i=i.unionWith(a.view.ua)}return i}}function Cv(n){const e=P(n);return e.remoteStore.remoteSyncer.applyRemoteEvent=Od.bind(null,e),e.remoteStore.remoteSyncer.getRemoteKeysForTarget=wv.bind(null,e),e.remoteStore.remoteSyncer.rejectListen=yv.bind(null,e),e.Va.a_=lv.bind(null,e.eventManager),e.Va.Fa=cv.bind(null,e.eventManager),e}function Av(n){const e=P(n);return e.remoteStore.remoteSyncer.applySuccessfulWrite=vv.bind(null,e),e.remoteStore.remoteSyncer.rejectFailedWrite=Ev.bind(null,e),e}class kc{constructor(){this.synchronizeTabs=!1}async initialize(e){this.serializer=vr(e.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(e),this.persistence=this.createPersistence(e),await this.persistence.start(),this.localStore=this.createLocalStore(e),this.gcScheduler=this.createGarbageCollectionScheduler(e,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(e,this.localStore)}createGarbageCollectionScheduler(e,t){return null}createIndexBackfillerScheduler(e,t){return null}createLocalStore(e){return Vy(this.persistence,new Dy,e.initialUser,this.serializer)}createPersistence(e){return new Py(xa.jr,this.serializer)}createSharedClientState(e){return new By}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class Rv{async initialize(e,t){this.localStore||(this.localStore=e.localStore,this.sharedClientState=e.sharedClientState,this.datastore=this.createDatastore(t),this.remoteStore=this.createRemoteStore(t),this.eventManager=this.createEventManager(t),this.syncEngine=this.createSyncEngine(t,!e.synchronizeTabs),this.sharedClientState.onlineStateHandler=s=>bc(this.syncEngine,s,1),this.remoteStore.remoteSyncer.handleCredentialChange=Iv.bind(null,this.syncEngine),await rv(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(e){return function(){return new av}()}createDatastore(e){const t=vr(e.databaseInfo.databaseId),s=function(r){return new zy(r)}(e.databaseInfo);return function(r,o,a,l){return new Hy(r,o,a,l)}(e.authCredentials,e.appCheckCredentials,s,t)}createRemoteStore(e){return function(s,i,r,o,a){return new Qy(s,i,r,o,a)}(this.localStore,this.datastore,e.asyncQueue,t=>bc(this.syncEngine,t,0),function(){return Sc.D()?new Sc:new qy}())}createSyncEngine(e,t){return function(i,r,o,a,l,c,u){const h=new fv(i,r,o,a,l,c);return u&&(h.Ca=!0),h}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,e.initialUser,e.maxConcurrentLimboResolutions,t)}terminate(){return async function(t){const s=P(t);T("RemoteStore","RemoteStore shutting down."),s.C_.add(5),await Ws(s),s.F_.shutdown(),s.M_.set("Unknown")}(this.remoteStore)}}/**
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
 *//**
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
 */class Ha{constructor(e){this.observer=e,this.muted=!1}next(e){this.observer.next&&this.Oa(this.observer.next,e)}error(e){this.observer.error?this.Oa(this.observer.error,e):et("Uncaught Error in snapshot listener:",e.toString())}Na(){this.muted=!0}Oa(e,t){this.muted||setTimeout(()=>{this.muted||e(t)},0)}}/**
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
 */class Sv{constructor(e){this.datastore=e,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(e){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new I(_.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const t=await async function(i,r){const o=P(i),a=Es(o.serializer)+"/documents",l={documents:r.map(d=>Pi(o.serializer,d))},c=await o.Co("BatchGetDocuments",a,l,r.length),u=new Map;c.forEach(d=>{const f=iy(o.serializer,d);u.set(f.key.toString(),f)});const h=[];return r.forEach(d=>{const f=u.get(d.toString());F(!!f),h.push(f)}),h}(this.datastore,e);return t.forEach(s=>this.recordVersion(s)),t}set(e,t){this.write(t.toMutation(e,this.precondition(e))),this.writtenDocs.add(e.toString())}update(e,t){try{this.write(t.toMutation(e,this.preconditionForUpdate(e)))}catch(s){this.lastWriteError=s}this.writtenDocs.add(e.toString())}delete(e){this.write(new gr(e,this.precondition(e))),this.writtenDocs.add(e.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const e=this.readVersions;this.mutations.forEach(t=>{e.delete(t.key.toString())}),e.forEach((t,s)=>{const i=w.fromPath(s);this.mutations.push(new dd(i,this.precondition(i)))}),await async function(s,i){const r=P(s),o=Es(r.serializer)+"/documents",a={writes:i.map(l=>Ed(r.serializer,l))};await r.wo("Commit",o,a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(e){let t;if(e.isFoundDocument())t=e.version;else{if(!e.isNoDocument())throw C();t=R.min()}const s=this.readVersions.get(e.key.toString());if(s){if(!t.isEqual(s))throw new I(_.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(e.key.toString(),t)}precondition(e){const t=this.readVersions.get(e.toString());return!this.writtenDocs.has(e.toString())&&t?t.isEqual(R.min())?ye.exists(!1):ye.updateTime(t):ye.none()}preconditionForUpdate(e){const t=this.readVersions.get(e.toString());if(!this.writtenDocs.has(e.toString())&&t){if(t.isEqual(R.min()))throw new I(_.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return ye.updateTime(t)}return ye.exists(!0)}write(e){this.ensureCommitNotCalled(),this.mutations.push(e)}ensureCommitNotCalled(){}}/**
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
 */class Pv{constructor(e,t,s,i,r){this.asyncQueue=e,this.datastore=t,this.options=s,this.updateFunction=i,this.deferred=r,this.Wa=s.maxAttempts,this.zo=new Oa(this.asyncQueue,"transaction_retry")}run(){this.Wa-=1,this.Ga()}Ga(){this.zo.ko(async()=>{const e=new Sv(this.datastore),t=this.za(e);t&&t.then(s=>{this.asyncQueue.enqueueAndForget(()=>e.commit().then(()=>{this.deferred.resolve(s)}).catch(i=>{this.ja(i)}))}).catch(s=>{this.ja(s)})})}za(e){try{const t=this.updateFunction(e);return!Us(t)&&t.catch&&t.then?t:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(t){return this.deferred.reject(t),null}}ja(e){this.Wa>0&&this.Ha(e)?(this.Wa-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ga(),Promise.resolve()))):this.deferred.reject(e)}Ha(e){if(e.name==="FirebaseError"){const t=e.code;return t==="aborted"||t==="failed-precondition"||t==="already-exists"||!fd(t)}return!1}}/**
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
 */class Nv{constructor(e,t,s,i){this.authCredentials=e,this.appCheckCredentials=t,this.asyncQueue=s,this.databaseInfo=i,this.user=ge.UNAUTHENTICATED,this.clientId=Wh.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(s,async r=>{T("FirestoreClient","Received user=",r.uid),await this.authCredentialListener(r),this.user=r}),this.appCheckCredentials.start(s,r=>(T("FirestoreClient","Received new app check token=",r),this.appCheckCredentialListener(r,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(e){this.authCredentialListener=e}setAppCheckTokenChangeListener(e){this.appCheckCredentialListener=e}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new I(_.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const e=new We;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),e.resolve()}catch(t){const s=qa(t,"Failed to shutdown persistence");e.reject(s)}}),e.promise}}async function Xr(n,e){n.asyncQueue.verifyOperationInProgress(),T("FirestoreClient","Initializing OfflineComponentProvider");const t=await n.getConfiguration();await e.initialize(t);let s=t.initialUser;n.setCredentialChangeListener(async i=>{s.isEqual(i)||(await Cd(e.localStore,i),s=i)}),e.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=e}async function Vc(n,e){n.asyncQueue.verifyOperationInProgress();const t=await Dv(n);T("FirestoreClient","Initializing OnlineComponentProvider");const s=await n.getConfiguration();await e.initialize(t,s),n.setCredentialChangeListener(i=>Pc(e.remoteStore,i)),n.setAppCheckTokenChangeListener((i,r)=>Pc(e.remoteStore,r)),n._onlineComponents=e}function bv(n){return n.name==="FirebaseError"?n.code===_.FAILED_PRECONDITION||n.code===_.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function Dv(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){T("FirestoreClient","Using user provided OfflineComponentProvider");try{await Xr(n,n._uninitializedComponentsProvider._offline)}catch(e){const t=e;if(!bv(t))throw t;cn("Error using user provided cache. Falling back to memory cache: "+t),await Xr(n,new kc)}}else T("FirestoreClient","Using default OfflineComponentProvider"),await Xr(n,new kc);return n._offlineComponents}async function Ka(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(T("FirestoreClient","Using user provided OnlineComponentProvider"),await Vc(n,n._uninitializedComponentsProvider._online)):(T("FirestoreClient","Using default OnlineComponentProvider"),await Vc(n,new Rv))),n._onlineComponents}function kv(n){return Ka(n).then(e=>e.syncEngine)}function Vv(n){return Ka(n).then(e=>e.datastore)}async function bi(n){const e=await Ka(n),t=e.eventManager;return t.onListen=_v.bind(null,e.syncEngine),t.onUnlisten=mv.bind(null,e.syncEngine),t}function xv(n,e,t={}){const s=new We;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,a,l,c){const u=new Ha({next:d=>{o.enqueueAndForget(()=>ja(r,h));const f=d.docs.has(a);!f&&d.fromCache?c.reject(new I(_.UNAVAILABLE,"Failed to get document because the client is offline.")):f&&d.fromCache&&l&&l.source==="server"?c.reject(new I(_.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):c.resolve(d)},error:d=>c.reject(d)}),h=new $a(dr(a.path),u,{includeMetadataChanges:!0,J_:!0});return Wa(r,h)}(await bi(n),n.asyncQueue,e,t,s)),s.promise}function Mv(n,e,t={}){const s=new We;return n.asyncQueue.enqueueAndForget(async()=>function(r,o,a,l,c){const u=new Ha({next:d=>{o.enqueueAndForget(()=>ja(r,h)),d.fromCache&&l.source==="server"?c.reject(new I(_.UNAVAILABLE,'Failed to get documents from server. (However, these documents may exist in the local cache. Run again without setting source to "server" to retrieve the cached documents.)')):c.resolve(d)},error:d=>c.reject(d)}),h=new $a(a,u,{includeMetadataChanges:!0,J_:!0});return Wa(r,h)}(await bi(n),n.asyncQueue,e,t,s)),s.promise}/**
 * @license
 * Copyright 2023 Google LLC
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
 */function Bd(n){const e={};return n.timeoutSeconds!==void 0&&(e.timeoutSeconds=n.timeoutSeconds),e}/**
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
 */const xc=new Map;/**
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
 */function qd(n,e,t){if(!t)throw new I(_.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${e}.`)}function Ov(n,e,t,s){if(e===!0&&s===!0)throw new I(_.INVALID_ARGUMENT,`${n} and ${t} cannot be used together.`)}function Mc(n){if(!w.isDocumentKey(n))throw new I(_.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function Oc(n){if(w.isDocumentKey(n))throw new I(_.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function Qa(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const e=function(s){return s.constructor?s.constructor.name:null}(n);return e?`a custom ${e} object`:"an object"}}return typeof n=="function"?"a function":C()}function ze(n,e){if("_delegate"in n&&(n=n._delegate),!(n instanceof e)){if(e.name===n.constructor.name)throw new I(_.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const t=Qa(n);throw new I(_.INVALID_ARGUMENT,`Expected type '${e.name}', but it was: ${t}`)}}return n}/**
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
 */class Lc{constructor(e){var t,s;if(e.host===void 0){if(e.ssl!==void 0)throw new I(_.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=e.host,this.ssl=(t=e.ssl)===null||t===void 0||t;if(this.credentials=e.credentials,this.ignoreUndefinedProperties=!!e.ignoreUndefinedProperties,this.localCache=e.localCache,e.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(e.cacheSizeBytes!==-1&&e.cacheSizeBytes<1048576)throw new I(_.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=e.cacheSizeBytes}Ov("experimentalForceLongPolling",e.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",e.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!e.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:e.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!e.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Bd((s=e.experimentalLongPollingOptions)!==null&&s!==void 0?s:{}),function(r){if(r.timeoutSeconds!==void 0){if(isNaN(r.timeoutSeconds))throw new I(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (must not be NaN)`);if(r.timeoutSeconds<5)throw new I(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (minimum allowed value is 5)`);if(r.timeoutSeconds>30)throw new I(_.INVALID_ARGUMENT,`invalid long polling timeout: ${r.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!e.useFetchStreams}isEqual(e){return this.host===e.host&&this.ssl===e.ssl&&this.credentials===e.credentials&&this.cacheSizeBytes===e.cacheSizeBytes&&this.experimentalForceLongPolling===e.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===e.experimentalAutoDetectLongPolling&&function(s,i){return s.timeoutSeconds===i.timeoutSeconds}(this.experimentalLongPollingOptions,e.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===e.ignoreUndefinedProperties&&this.useFetchStreams===e.useFetchStreams}}class Ir{constructor(e,t,s,i){this._authCredentials=e,this._appCheckCredentials=t,this._databaseId=s,this._app=i,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Lc({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new I(_.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(e){if(this._settingsFrozen)throw new I(_.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Lc(e),e.credentials!==void 0&&(this._authCredentials=function(s){if(!s)return new ng;switch(s.type){case"firstParty":return new og(s.sessionIndex||"0",s.iamToken||null,s.authTokenFactory||null);case"provider":return s.client;default:throw new I(_.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(e.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(t){const s=xc.get(t);s&&(T("ComponentProvider","Removing Datastore"),xc.delete(t),s.terminate())}(this),Promise.resolve()}}function Lv(n,e,t,s={}){var i;const r=(n=ze(n,Ir))._getSettings(),o=`${e}:${t}`;if(r.host!=="firestore.googleapis.com"&&r.host!==o&&cn("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},r),{host:o,ssl:!1})),s.mockUserToken){let a,l;if(typeof s.mockUserToken=="string")a=s.mockUserToken,l=ge.MOCK_USER;else{a=Au(s.mockUserToken,(i=n._app)===null||i===void 0?void 0:i.options.projectId);const c=s.mockUserToken.sub||s.mockUserToken.user_id;if(!c)throw new I(_.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");l=new ge(c)}n._authCredentials=new sg(new qh(a,l))}}/**
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
 */class zs{constructor(e,t,s){this.converter=t,this._query=s,this.type="query",this.firestore=e}withConverter(e){return new zs(this.firestore,e,this._query)}}class Se{constructor(e,t,s){this.converter=t,this._key=s,this.type="document",this.firestore=e}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(e){return new Se(this.firestore,e,this._key)}}class ct extends zs{constructor(e,t,s){super(e,t,dr(s)),this._path=s,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const e=this._path.popLast();return e.isEmpty()?null:new Se(this.firestore,null,new w(e))}withConverter(e){return new ct(this.firestore,e,this._path)}}function vw(n,e,...t){if(n=_e(n),qd("collection","path",e),n instanceof Ir){const s=z.fromString(e,...t);return Oc(s),new ct(n,null,s)}{if(!(n instanceof Se||n instanceof ct))throw new I(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(z.fromString(e,...t));return Oc(s),new ct(n.firestore,null,s)}}function Ew(n,e,...t){if(n=_e(n),arguments.length===1&&(e=Wh.newId()),qd("doc","path",e),n instanceof Ir){const s=z.fromString(e,...t);return Mc(s),new Se(n,null,new w(s))}{if(!(n instanceof Se||n instanceof ct))throw new I(_.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const s=n._path.child(z.fromString(e,...t));return Mc(s),new Se(n.firestore,n instanceof ct?n.converter:null,new w(s))}}/**
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
 */class Fv{constructor(){this.Ja=Promise.resolve(),this.Ya=[],this.Za=!1,this.Xa=[],this.eu=null,this.tu=!1,this.nu=!1,this.ru=[],this.zo=new Oa(this,"async_queue_retry"),this.iu=()=>{const t=Yr();t&&T("AsyncQueue","Visibility state changed to "+t.visibilityState),this.zo.Qo()};const e=Yr();e&&typeof e.addEventListener=="function"&&e.addEventListener("visibilitychange",this.iu)}get isShuttingDown(){return this.Za}enqueueAndForget(e){this.enqueue(e)}enqueueAndForgetEvenWhileRestricted(e){this.su(),this.ou(e)}enterRestrictedMode(e){if(!this.Za){this.Za=!0,this.nu=e||!1;const t=Yr();t&&typeof t.removeEventListener=="function"&&t.removeEventListener("visibilitychange",this.iu)}}enqueue(e){if(this.su(),this.Za)return new Promise(()=>{});const t=new We;return this.ou(()=>this.Za&&this.nu?Promise.resolve():(e().then(t.resolve,t.reject),t.promise)).then(()=>t.promise)}enqueueRetryable(e){this.enqueueAndForget(()=>(this.Ya.push(e),this._u()))}async _u(){if(this.Ya.length!==0){try{await this.Ya[0](),this.Ya.shift(),this.zo.reset()}catch(e){if(!Fs(e))throw e;T("AsyncQueue","Operation failed with retryable error: "+e)}this.Ya.length>0&&this.zo.ko(()=>this._u())}}ou(e){const t=this.Ja.then(()=>(this.tu=!0,e().catch(s=>{this.eu=s,this.tu=!1;const i=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(s);throw et("INTERNAL UNHANDLED ERROR: ",i),s}).then(s=>(this.tu=!1,s))));return this.Ja=t,t}enqueueAfterDelay(e,t,s){this.su(),this.ru.indexOf(e)>-1&&(t=0);const i=Ba.createAndSchedule(this,e,t,s,r=>this.au(r));return this.Xa.push(i),i}su(){this.eu&&C()}verifyOperationInProgress(){}async uu(){let e;do e=this.Ja,await e;while(e!==this.Ja)}cu(e){for(const t of this.Xa)if(t.timerId===e)return!0;return!1}lu(e){return this.uu().then(()=>{this.Xa.sort((t,s)=>t.targetTimeMs-s.targetTimeMs);for(const t of this.Xa)if(t.skipDelay(),e!=="all"&&t.timerId===e)break;return this.uu()})}hu(e){this.ru.push(e)}au(e){const t=this.Xa.indexOf(e);this.Xa.splice(t,1)}}function Fc(n){return function(t,s){if(typeof t!="object"||t===null)return!1;const i=t;for(const r of s)if(r in i&&typeof i[r]=="function")return!0;return!1}(n,["next","error","complete"])}class xt extends Ir{constructor(e,t,s,i){super(e,t,s,i),this.type="firestore",this._queue=function(){return new Fv}(),this._persistenceKey=(i==null?void 0:i.name)||"[DEFAULT]"}_terminate(){return this._firestoreClient||Wd(this),this._firestoreClient.terminate()}}function Tw(n,e){const t=typeof n=="object"?n:Mu(),s=typeof n=="string"?n:e||"(default)",i=Vu(t,"firestore").getImmediate({identifier:s});if(!i._initialized){const r=wu("firestore");r&&Lv(i,...r)}return i}function bn(n){return n._firestoreClient||Wd(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Wd(n){var e,t,s;const i=n._freezeSettings(),r=function(a,l,c,u){return new yg(a,l,c,u.host,u.ssl,u.experimentalForceLongPolling,u.experimentalAutoDetectLongPolling,Bd(u.experimentalLongPollingOptions),u.useFetchStreams)}(n._databaseId,((e=n._app)===null||e===void 0?void 0:e.options.appId)||"",n._persistenceKey,i);n._firestoreClient=new Nv(n._authCredentials,n._appCheckCredentials,n._queue,r),!((t=i.localCache)===null||t===void 0)&&t._offlineComponentProvider&&(!((s=i.localCache)===null||s===void 0)&&s._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:i.localCache.kind,_offline:i.localCache._offlineComponentProvider,_online:i.localCache._onlineComponentProvider})}/**
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
 */class Mt{constructor(e){this._byteString=e}static fromBase64String(e){try{return new Mt(Te.fromBase64String(e))}catch(t){throw new I(_.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+t)}}static fromUint8Array(e){return new Mt(Te.fromUint8Array(e))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(e){return this._byteString.isEqual(e._byteString)}}/**
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
 */class $s{constructor(...e){for(let t=0;t<e.length;++t)if(e[t].length===0)throw new I(_.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new he(e)}isEqual(e){return this._internalPath.isEqual(e._internalPath)}}/**
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
 */class Dn{constructor(e){this._methodName=e}}/**
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
 */class Ya{constructor(e,t){if(!isFinite(e)||e<-90||e>90)throw new I(_.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+e);if(!isFinite(t)||t<-180||t>180)throw new I(_.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+t);this._lat=e,this._long=t}get latitude(){return this._lat}get longitude(){return this._long}isEqual(e){return this._lat===e._lat&&this._long===e._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(e){return L(this._lat,e._lat)||L(this._long,e._long)}}/**
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
 */const Uv=/^__.*__$/;class Bv{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return this.fieldMask!==null?new Et(e,this.data,this.fieldMask,t,this.fieldTransforms):new Bs(e,this.data,t,this.fieldTransforms)}}class jd{constructor(e,t,s){this.data=e,this.fieldMask=t,this.fieldTransforms=s}toMutation(e,t){return new Et(e,this.data,this.fieldMask,t,this.fieldTransforms)}}function zd(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw C()}}class wr{constructor(e,t,s,i,r,o){this.settings=e,this.databaseId=t,this.serializer=s,this.ignoreUndefinedProperties=i,r===void 0&&this.Pu(),this.fieldTransforms=r||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Iu(){return this.settings.Iu}Tu(e){return new wr(Object.assign(Object.assign({},this.settings),e),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Eu(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Tu({path:s,du:!1});return i.Au(e),i}Ru(e){var t;const s=(t=this.path)===null||t===void 0?void 0:t.child(e),i=this.Tu({path:s,du:!1});return i.Pu(),i}Vu(e){return this.Tu({path:void 0,du:!0})}mu(e){return Di(e,this.settings.methodName,this.settings.fu||!1,this.path,this.settings.gu)}contains(e){return this.fieldMask.find(t=>e.isPrefixOf(t))!==void 0||this.fieldTransforms.find(t=>e.isPrefixOf(t.field))!==void 0}Pu(){if(this.path)for(let e=0;e<this.path.length;e++)this.Au(this.path.get(e))}Au(e){if(e.length===0)throw this.mu("Document fields must not be empty");if(zd(this.Iu)&&Uv.test(e))throw this.mu('Document fields cannot begin and end with "__"')}}class qv{constructor(e,t,s){this.databaseId=e,this.ignoreUndefinedProperties=t,this.serializer=s||vr(e)}pu(e,t,s,i=!1){return new wr({Iu:e,methodName:t,gu:s,path:he.emptyPath(),du:!1,fu:i},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function $d(n){const e=n._freezeSettings(),t=vr(n._databaseId);return new qv(n._databaseId,!!e.ignoreUndefinedProperties,t)}function Gd(n,e,t,s,i,r={}){const o=n.pu(r.merge||r.mergeFields?2:0,e,t,i);Xa("Data must be an object, but it was:",o,s);const a=Yd(s,o);let l,c;if(r.merge)l=new Pe(o.fieldMask),c=o.fieldTransforms;else if(r.mergeFields){const u=[];for(const h of r.mergeFields){const d=Mo(e,h,t);if(!o.contains(d))throw new I(_.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);Jd(u,d)||u.push(d)}l=new Pe(u),c=o.fieldTransforms.filter(h=>l.covers(h.field))}else l=null,c=o.fieldTransforms;return new Bv(new Ie(a),l,c)}class Gs extends Dn{_toFieldTransform(e){if(e.Iu!==2)throw e.Iu===1?e.mu(`${this._methodName}() can only appear at the top level of your update data`):e.mu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return e.fieldMask.push(e.path),null}isEqual(e){return e instanceof Gs}}function Hd(n,e,t){return new wr({Iu:3,gu:e.settings.gu,methodName:n._methodName,du:t},e.databaseId,e.serializer,e.ignoreUndefinedProperties)}class Wv extends Dn{constructor(e,t){super(e),this.yu=t}_toFieldTransform(e){const t=Hd(this,e,!0),s=this.yu.map(r=>kn(r,t)),i=new fn(s);return new Na(e.path,i)}isEqual(e){return this===e}}class jv extends Dn{constructor(e,t){super(e),this.yu=t}_toFieldTransform(e){const t=Hd(this,e,!0),s=this.yu.map(r=>kn(r,t)),i=new _n(s);return new Na(e.path,i)}isEqual(e){return this===e}}class zv extends Dn{constructor(e,t){super(e),this.wu=t}_toFieldTransform(e){const t=new vs(e.serializer,rd(e.serializer,this.wu));return new Na(e.path,t)}isEqual(e){return this===e}}function Kd(n,e,t,s){const i=n.pu(1,e,t);Xa("Data must be an object, but it was:",i,s);const r=[],o=Ie.empty();Bt(s,(l,c)=>{const u=Ja(e,l,t);c=_e(c);const h=i.Ru(u);if(c instanceof Gs)r.push(u);else{const d=kn(c,h);d!=null&&(r.push(u),o.set(u,d))}});const a=new Pe(r);return new jd(o,a,i.fieldTransforms)}function Qd(n,e,t,s,i,r){const o=n.pu(1,e,t),a=[Mo(e,s,t)],l=[i];if(r.length%2!=0)throw new I(_.INVALID_ARGUMENT,`Function ${e}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<r.length;d+=2)a.push(Mo(e,r[d])),l.push(r[d+1]);const c=[],u=Ie.empty();for(let d=a.length-1;d>=0;--d)if(!Jd(c,a[d])){const f=a[d];let m=l[d];m=_e(m);const v=o.Ru(f);if(m instanceof Gs)c.push(f);else{const E=kn(m,v);E!=null&&(c.push(f),u.set(f,E))}}const h=new Pe(c);return new jd(u,h,o.fieldTransforms)}function kn(n,e){if(Xd(n=_e(n)))return Xa("Unsupported field value:",e,n),Yd(n,e);if(n instanceof Dn)return function(s,i){if(!zd(i.Iu))throw i.mu(`${s._methodName}() can only be used with update() and set()`);if(!i.path)throw i.mu(`${s._methodName}() is not currently supported inside arrays`);const r=s._toFieldTransform(i);r&&i.fieldTransforms.push(r)}(n,e),null;if(n===void 0&&e.ignoreUndefinedProperties)return null;if(e.path&&e.fieldMask.push(e.path),n instanceof Array){if(e.settings.du&&e.Iu!==4)throw e.mu("Nested arrays are not supported");return function(s,i){const r=[];let o=0;for(const a of s){let l=kn(a,i.Vu(o));l==null&&(l={nullValue:"NULL_VALUE"}),r.push(l),o++}return{arrayValue:{values:r}}}(n,e)}return function(s,i){if((s=_e(s))===null)return{nullValue:"NULL_VALUE"};if(typeof s=="number")return rd(i.serializer,s);if(typeof s=="boolean")return{booleanValue:s};if(typeof s=="string")return{stringValue:s};if(s instanceof Date){const r=te.fromDate(s);return{timestampValue:Si(i.serializer,r)}}if(s instanceof te){const r=new te(s.seconds,1e3*Math.floor(s.nanoseconds/1e3));return{timestampValue:Si(i.serializer,r)}}if(s instanceof Ya)return{geoPointValue:{latitude:s.latitude,longitude:s.longitude}};if(s instanceof Mt)return{bytesValue:gd(i.serializer,s._byteString)};if(s instanceof Se){const r=i.databaseId,o=s.firestore._databaseId;if(!o.isEqual(r))throw i.mu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${r.projectId}/${r.database}`);return{referenceValue:ka(s.firestore._databaseId||i.databaseId,s._key.path)}}throw i.mu(`Unsupported field value: ${Qa(s)}`)}(n,e)}function Yd(n,e){const t={};return jh(n)?e.path&&e.path.length>0&&e.fieldMask.push(e.path):Bt(n,(s,i)=>{const r=kn(i,e.Eu(s));r!=null&&(t[s]=r)}),{mapValue:{fields:t}}}function Xd(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof te||n instanceof Ya||n instanceof Mt||n instanceof Se||n instanceof Dn)}function Xa(n,e,t){if(!Xd(t)||!function(i){return typeof i=="object"&&i!==null&&(Object.getPrototypeOf(i)===Object.prototype||Object.getPrototypeOf(i)===null)}(t)){const s=Qa(t);throw s==="an object"?e.mu(n+" a custom object"):e.mu(n+" "+s)}}function Mo(n,e,t){if((e=_e(e))instanceof $s)return e._internalPath;if(typeof e=="string")return Ja(n,e);throw Di("Field path arguments must be of type string or ",n,!1,void 0,t)}const $v=new RegExp("[~\\*/\\[\\]]");function Ja(n,e,t){if(e.search($v)>=0)throw Di(`Invalid field path (${e}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,t);try{return new $s(...e.split("."))._internalPath}catch{throw Di(`Invalid field path (${e}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,t)}}function Di(n,e,t,s,i){const r=s&&!s.isEmpty(),o=i!==void 0;let a=`Function ${e}() called with invalid data`;t&&(a+=" (via `toFirestore()`)"),a+=". ";let l="";return(r||o)&&(l+=" (found",r&&(l+=` in field ${s}`),o&&(l+=` in document ${i}`),l+=")"),new I(_.INVALID_ARGUMENT,a+n+l)}function Jd(n,e){return n.some(t=>t.isEqual(e))}/**
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
 */class ki{constructor(e,t,s,i,r){this._firestore=e,this._userDataWriter=t,this._key=s,this._document=i,this._converter=r}get id(){return this._key.path.lastSegment()}get ref(){return new Se(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const e=new Gv(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(e)}return this._userDataWriter.convertValue(this._document.data.value)}}get(e){if(this._document){const t=this._document.data.field(Zd("DocumentSnapshot.get",e));if(t!==null)return this._userDataWriter.convertValue(t)}}}class Gv extends ki{data(){return super.data()}}function Zd(n,e){return typeof e=="string"?Ja(n,e):e instanceof $s?e._internalPath:e._delegate._internalPath}/**
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
 */function ef(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new I(_.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class tf{convertValue(e,t="none"){switch(Vt(e)){case 0:return null;case 1:return e.booleanValue;case 2:return Y(e.integerValue||e.doubleValue);case 3:return this.convertTimestamp(e.timestampValue);case 4:return this.convertServerTimestamp(e,t);case 5:return e.stringValue;case 6:return this.convertBytes(kt(e.bytesValue));case 7:return this.convertReference(e.referenceValue);case 8:return this.convertGeoPoint(e.geoPointValue);case 9:return this.convertArray(e.arrayValue,t);case 10:return this.convertObject(e.mapValue,t);default:throw C()}}convertObject(e,t){return this.convertObjectMap(e.fields,t)}convertObjectMap(e,t="none"){const s={};return Bt(e,(i,r)=>{s[i]=this.convertValue(r,t)}),s}convertGeoPoint(e){return new Ya(Y(e.latitude),Y(e.longitude))}convertArray(e,t){return(e.values||[]).map(s=>this.convertValue(s,t))}convertServerTimestamp(e,t){switch(t){case"previous":const s=Aa(e);return s==null?null:this.convertValue(s,t);case"estimate":return this.convertTimestamp(ms(e));default:return null}}convertTimestamp(e){const t=ft(e);return new te(t.seconds,t.nanos)}convertDocumentKey(e,t){const s=z.fromString(e);F(wd(s));const i=new gs(s.get(1),s.get(3)),r=new w(s.popFirst(5));return i.isEqual(t)||et(`Document ${r} contains a document reference within a different database (${i.projectId}/${i.database}) which is not supported. It will be treated as a reference in the current database (${t.projectId}/${t.database}) instead.`),r}}/**
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
 */function nf(n,e,t){let s;return s=n?t&&(t.merge||t.mergeFields)?n.toFirestore(e,t):n.toFirestore(e):e,s}class Hv extends tf{constructor(e){super(),this.firestore=e}convertBytes(e){return new Mt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}}/**
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
 */class Xt{constructor(e,t){this.hasPendingWrites=e,this.fromCache=t}isEqual(e){return this.hasPendingWrites===e.hasPendingWrites&&this.fromCache===e.fromCache}}class Za extends ki{constructor(e,t,s,i,r,o){super(e,t,s,i,o),this._firestore=e,this._firestoreImpl=e,this.metadata=r}exists(){return super.exists()}data(e={}){if(this._document){if(this._converter){const t=new _i(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(t,e)}return this._userDataWriter.convertValue(this._document.data.value,e.serverTimestamps)}}get(e,t={}){if(this._document){const s=this._document.data.field(Zd("DocumentSnapshot.get",e));if(s!==null)return this._userDataWriter.convertValue(s,t.serverTimestamps)}}}class _i extends Za{data(e={}){return super.data(e)}}class sf{constructor(e,t,s,i){this._firestore=e,this._userDataWriter=t,this._snapshot=i,this.metadata=new Xt(i.hasPendingWrites,i.fromCache),this.query=s}get docs(){const e=[];return this.forEach(t=>e.push(t)),e}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(e,t){this._snapshot.docs.forEach(s=>{e.call(t,new _i(this._firestore,this._userDataWriter,s.key,s,new Xt(this._snapshot.mutatedKeys.has(s.key),this._snapshot.fromCache),this.query.converter))})}docChanges(e={}){const t=!!e.includeMetadataChanges;if(t&&this._snapshot.excludesMetadataChanges)throw new I(_.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===t||(this._cachedChanges=function(i,r){if(i._snapshot.oldDocs.isEmpty()){let o=0;return i._snapshot.docChanges.map(a=>{const l=new _i(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Xt(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);return a.doc,{type:"added",doc:l,oldIndex:-1,newIndex:o++}})}{let o=i._snapshot.oldDocs;return i._snapshot.docChanges.filter(a=>r||a.type!==3).map(a=>{const l=new _i(i._firestore,i._userDataWriter,a.doc.key,a.doc,new Xt(i._snapshot.mutatedKeys.has(a.doc.key),i._snapshot.fromCache),i.query.converter);let c=-1,u=-1;return a.type!==0&&(c=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),u=o.indexOf(a.doc.key)),{type:Kv(a.type),doc:l,oldIndex:c,newIndex:u}})}}(this,t),this._cachedChangesIncludeMetadataChanges=t),this._cachedChanges}}function Kv(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return C()}}/**
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
 */function Iw(n){n=ze(n,Se);const e=ze(n.firestore,xt);return xv(bn(e),n._key).then(t=>rf(e,n,t))}class Cr extends tf{constructor(e){super(),this.firestore=e}convertBytes(e){return new Mt(e)}convertReference(e){const t=this.convertDocumentKey(e,this.firestore._databaseId);return new Se(this.firestore,null,t)}}function ww(n){n=ze(n,zs);const e=ze(n.firestore,xt),t=bn(e),s=new Cr(e);return ef(n._query),Mv(t,n._query).then(i=>new sf(e,s,n,i))}function Cw(n,...e){var t,s,i;n=_e(n);let r={includeMetadataChanges:!1},o=0;typeof e[o]!="object"||Fc(e[o])||(r=e[o],o++);const a={includeMetadataChanges:r.includeMetadataChanges};if(Fc(e[o])){const h=e[o];e[o]=(t=h.next)===null||t===void 0?void 0:t.bind(h),e[o+1]=(s=h.error)===null||s===void 0?void 0:s.bind(h),e[o+2]=(i=h.complete)===null||i===void 0?void 0:i.bind(h)}let l,c,u;if(n instanceof Se)c=ze(n.firestore,xt),u=dr(n._key.path),l={next:h=>{e[o]&&e[o](rf(c,n,h))},error:e[o+1],complete:e[o+2]};else{const h=ze(n,zs);c=ze(h.firestore,xt),u=h._query;const d=new Cr(c);l={next:f=>{e[o]&&e[o](new sf(c,d,h,f))},error:e[o+1],complete:e[o+2]},ef(n._query)}return function(d,f,m,v){const E=new Ha(v),O=new $a(f,E,m);return d.asyncQueue.enqueueAndForget(async()=>Wa(await bi(d),O)),()=>{E.Na(),d.asyncQueue.enqueueAndForget(async()=>ja(await bi(d),O))}}(bn(c),u,a,l)}function Qv(n,e){return function(s,i){const r=new We;return s.asyncQueue.enqueueAndForget(async()=>gv(await kv(s),i,r)),r.promise}(bn(n),e)}function rf(n,e,t){const s=t.docs.get(e._key),i=new Cr(n);return new Za(n,i,e._key,s,new Xt(t.hasPendingWrites,t.fromCache),e.converter)}/**
 * @license
 * Copyright 2022 Google LLC
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
 */const Yv={maxAttempts:5};/**
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
 */class Xv{constructor(e,t){this._firestore=e,this._commitHandler=t,this._mutations=[],this._committed=!1,this._dataReader=$d(e)}set(e,t,s){this._verifyNotCommitted();const i=st(e,this._firestore),r=nf(i.converter,t,s),o=Gd(this._dataReader,"WriteBatch.set",i._key,r,i.converter!==null,s);return this._mutations.push(o.toMutation(i._key,ye.none())),this}update(e,t,s,...i){this._verifyNotCommitted();const r=st(e,this._firestore);let o;return o=typeof(t=_e(t))=="string"||t instanceof $s?Qd(this._dataReader,"WriteBatch.update",r._key,t,s,i):Kd(this._dataReader,"WriteBatch.update",r._key,t),this._mutations.push(o.toMutation(r._key,ye.exists(!0))),this}delete(e){this._verifyNotCommitted();const t=st(e,this._firestore);return this._mutations=this._mutations.concat(new gr(t._key,ye.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new I(_.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function st(n,e){if((n=_e(n)).firestore!==e)throw new I(_.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 *//**
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
 */class Jv extends class{constructor(t,s){this._firestore=t,this._transaction=s,this._dataReader=$d(t)}get(t){const s=st(t,this._firestore),i=new Hv(this._firestore);return this._transaction.lookup([s._key]).then(r=>{if(!r||r.length!==1)return C();const o=r[0];if(o.isFoundDocument())return new ki(this._firestore,i,o.key,o,s.converter);if(o.isNoDocument())return new ki(this._firestore,i,s._key,null,s.converter);throw C()})}set(t,s,i){const r=st(t,this._firestore),o=nf(r.converter,s,i),a=Gd(this._dataReader,"Transaction.set",r._key,o,r.converter!==null,i);return this._transaction.set(r._key,a),this}update(t,s,i,...r){const o=st(t,this._firestore);let a;return a=typeof(s=_e(s))=="string"||s instanceof $s?Qd(this._dataReader,"Transaction.update",o._key,s,i,r):Kd(this._dataReader,"Transaction.update",o._key,s),this._transaction.update(o._key,a),this}delete(t){const s=st(t,this._firestore);return this._transaction.delete(s._key),this}}{constructor(e,t){super(e,t),this._firestore=e}get(e){const t=st(e,this._firestore),s=new Cr(this._firestore);return super.get(e).then(i=>new Za(this._firestore,s,t._key,i._document,new Xt(!1,!1),t.converter))}}function Rw(n,e,t){n=ze(n,xt);const s=Object.assign(Object.assign({},Yv),t);return function(r){if(r.maxAttempts<1)throw new I(_.INVALID_ARGUMENT,"Max attempts must be at least 1")}(s),function(r,o,a){const l=new We;return r.asyncQueue.enqueueAndForget(async()=>{const c=await Vv(r);new Pv(r.asyncQueue,c,a,o,l).run()}),l.promise}(bn(n),i=>e(new Jv(n,i)),s)}/**
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
 */function Sw(){return new Gs("deleteField")}function Pw(...n){return new Wv("arrayUnion",n)}function Nw(...n){return new jv("arrayRemove",n)}function bw(n){return new zv("increment",n)}/**
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
 */function Dw(n){return bn(n=ze(n,xt)),new Xv(n,e=>Qv(n,e))}(function(e,t=!0){(function(i){Sn=i})(xu),rs(new an("firestore",(s,{instanceIdentifier:i,options:r})=>{const o=s.getProvider("app").getImmediate(),a=new xt(new ig(s.getProvider("auth-internal")),new lg(s.getProvider("app-check-internal")),function(c,u){if(!Object.prototype.hasOwnProperty.apply(c.options,["projectId"]))throw new I(_.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new gs(c.options.projectId,u)}(o,i),o);return r=Object.assign({useFetchStreams:t},r),a._setSettings(r),a},"PUBLIC").setMultipleInstances(!0)),St(rc,"4.4.0",e),St(rc,"4.4.0","esm2017")})();var Uc={};const Bc="@firebase/database",qc="1.0.2";/**
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
 */let of="";function Zv(n){of=n}/**
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
 */class eE{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),Z(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:ss(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
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
 */class tE{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return He(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
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
 */const af=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new eE(e)}}catch{}return new tE},Rt=af("localStorage"),Oo=af("sessionStorage");/**
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
 */const nn=new Jo("@firebase/database"),nE=function(){let n=1;return function(){return n++}}(),lf=function(n){const e=j_(n),t=new B_;t.update(e);const s=t.digest();return Yo.encodeByteArray(s)},Hs=function(...n){let e="";for(let t=0;t<n.length;t++){const s=n[t];Array.isArray(s)||s&&typeof s=="object"&&typeof s.length=="number"?e+=Hs.apply(null,s):typeof s=="object"?e+=Z(s):e+=s,e+=" "}return e};let Nt=null,Wc=!0;const sE=function(n,e){g(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(nn.logLevel=x.VERBOSE,Nt=nn.log.bind(nn),e&&Oo.set("logging_enabled",!0)):typeof n=="function"?Nt=n:(Nt=null,Oo.remove("logging_enabled"))},ue=function(...n){if(Wc===!0&&(Wc=!1,Nt===null&&Oo.get("logging_enabled")===!0&&sE(!0)),Nt){const e=Hs.apply(null,n);Nt(e)}},Ks=function(n){return function(...e){ue(n,...e)}},Lo=function(...n){const e="FIREBASE INTERNAL ERROR: "+Hs(...n);nn.error(e)},nt=function(...n){const e=`FIREBASE FATAL ERROR: ${Hs(...n)}`;throw nn.error(e),new Error(e)},Ae=function(...n){const e="FIREBASE WARNING: "+Hs(...n);nn.warn(e)},iE=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&Ae("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},el=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},rE=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},gn="[MIN_NAME]",Ot="[MAX_NAME]",Wt=function(n,e){if(n===e)return 0;if(n===gn||e===Ot)return-1;if(e===gn||n===Ot)return 1;{const t=jc(n),s=jc(e);return t!==null?s!==null?t-s===0?n.length-e.length:t-s:-1:s!==null?1:n<e?-1:1}},oE=function(n,e){return n===e?0:n<e?-1:1},Un=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+Z(e))},tl=function(n){if(typeof n!="object"||n===null)return Z(n);const e=[];for(const s in n)e.push(s);e.sort();let t="{";for(let s=0;s<e.length;s++)s!==0&&(t+=","),t+=Z(e[s]),t+=":",t+=tl(n[e[s]]);return t+="}",t},cf=function(n,e){const t=n.length;if(t<=e)return[n];const s=[];for(let i=0;i<t;i+=e)i+e>t?s.push(n.substring(i,t)):s.push(n.substring(i,i+e));return s};function pe(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const uf=function(n){g(!el(n),"Invalid JSON number");const e=11,t=52,s=(1<<e-1)-1;let i,r,o,a,l;n===0?(r=0,o=0,i=1/n===-1/0?1:0):(i=n<0,n=Math.abs(n),n>=Math.pow(2,1-s)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),s),r=a+s,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-s-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(i?1:0),c.reverse();const u=c.join("");let h="";for(l=0;l<64;l+=8){let d=parseInt(u.substr(l,8),2).toString(16);d.length===1&&(d="0"+d),h=h+d}return h.toLowerCase()},aE=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},lE=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function cE(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const s=new Error(n+" at "+e._path.toString()+": "+t);return s.code=n.toUpperCase(),s}const uE=new RegExp("^-?(0*)\\d{1,10}$"),hE=-2147483648,dE=2147483647,jc=function(n){if(uE.test(n)){const e=Number(n);if(e>=hE&&e<=dE)return e}return null},Vn=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw Ae("Exception was thrown by user callback.",t),e},Math.floor(0))}},fE=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},Zn=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
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
 */class _E{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(s=>this.appCheck=s)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,s)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(s=>s.addTokenListener(e))}notifyForInvalidToken(){Ae(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
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
 */class pE{constructor(e,t,s){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=s,this.auth_=null,this.auth_=s.getImmediate({optional:!0}),this.auth_||s.onInit(i=>this.auth_=i)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?(ue("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,s)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,s):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',Ae(e)}}class sn{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}sn.OWNER="owner";/**
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
 */const nl="5",hf="v",df="s",ff="r",_f="f",pf=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,mf="ls",gf="p",Fo="ac",yf="websocket",vf="long_polling";/**
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
 */class Ef{constructor(e,t,s,i,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=s,this.webSocketOnly=i,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Rt.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Rt.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function mE(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Tf(n,e,t){g(typeof e=="string","typeof type must == string"),g(typeof t=="object","typeof params must == object");let s;if(e===yf)s=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===vf)s=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);mE(n)&&(t.ns=n.namespace);const i=[];return pe(t,(r,o)=>{i.push(r+"="+o)}),s+i.join("&")}/**
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
 */class gE{constructor(){this.counters_={}}incrementCounter(e,t=1){He(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return C_(this.counters_)}}/**
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
 */const Jr={},Zr={};function sl(n){const e=n.toString();return Jr[e]||(Jr[e]=new gE),Jr[e]}function yE(n,e){const t=n.toString();return Zr[t]||(Zr[t]=e()),Zr[t]}/**
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
 */class vE{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const s=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let i=0;i<s.length;++i)s[i]&&Vn(()=>{this.onMessage_(s[i])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
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
 */const zc="start",EE="close",TE="pLPCommand",IE="pRTLPCB",If="id",wf="pw",Cf="ser",wE="cb",CE="seg",AE="ts",RE="d",SE="dframe",Af=1870,Rf=30,PE=Af-Rf,NE=25e3,bE=3e4;class Jt{constructor(e,t,s,i,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=Ks(e),this.stats_=sl(t),this.urlFn=l=>(this.appCheckToken&&(l[Fo]=this.appCheckToken),Tf(t,vf,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new vE(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(bE)),rE(()=>{if(this.isClosed_)return;this.scriptTagHolder=new il((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===zc)this.id=a,this.password=l;else if(o===EE)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const s={};s[zc]="t",s[Cf]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(s[wE]=this.scriptTagHolder.uniqueCallbackIdentifier),s[hf]=nl,this.transportSessionId&&(s[df]=this.transportSessionId),this.lastSessionId&&(s[mf]=this.lastSessionId),this.applicationId&&(s[gf]=this.applicationId),this.appCheckToken&&(s[Fo]=this.appCheckToken),typeof location<"u"&&location.hostname&&pf.test(location.hostname)&&(s[ff]=_f);const i=this.urlFn(s);this.log_("Connecting via long-poll to "+i),this.scriptTagHolder.addTag(i,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){Jt.forceAllow_=!0}static forceDisallow(){Jt.forceDisallow_=!0}static isAvailable(){return Jt.forceAllow_?!0:!Jt.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!aE()&&!lE()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=Z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=Tu(t),i=cf(s,PE);for(let r=0;r<i.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,i.length,i[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const s={};s[SE]="t",s[If]=e,s[wf]=t,this.myDisconnFrame.src=this.urlFn(s),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=Z(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class il{constructor(e,t,s,i){this.onDisconnect=s,this.urlFn=i,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=nE(),window[TE+this.uniqueCallbackIdentifier]=e,window[IE+this.uniqueCallbackIdentifier]=t,this.myIFrame=il.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){ue("frame writing exception"),a.stack&&ue(a.stack),ue(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||ue("No IE domain setting required")}catch{const s=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+s+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[If]=this.myID,e[wf]=this.myPW,e[Cf]=this.currentSerial;let t=this.urlFn(e),s="",i=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Rf+s.length<=Af;){const o=this.pendingSegs.shift();s=s+"&"+CE+i+"="+o.seg+"&"+AE+i+"="+o.ts+"&"+RE+i+"="+o.d,i++}return t=t+s,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,s){this.pendingSegs.push({seg:e,ts:t,d:s}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const s=()=>{this.outstandingRequests.delete(t),this.newRequest_()},i=setTimeout(s,Math.floor(NE)),r=()=>{clearTimeout(i),s()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const s=this.myIFrame.doc.createElement("script");s.type="text/javascript",s.async=!0,s.src=e,s.onload=s.onreadystatechange=function(){const i=s.readyState;(!i||i==="loaded"||i==="complete")&&(s.onload=s.onreadystatechange=null,s.parentNode&&s.parentNode.removeChild(s),t())},s.onerror=()=>{ue("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(s)}catch{}},Math.floor(1))}}/**
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
 */const DE=16384,kE=45e3;let Vi=null;typeof MozWebSocket<"u"?Vi=MozWebSocket:typeof WebSocket<"u"&&(Vi=WebSocket);class Me{constructor(e,t,s,i,r,o,a){this.connId=e,this.applicationId=s,this.appCheckToken=i,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=Ks(this.connId),this.stats_=sl(t),this.connURL=Me.connectionURL_(t,o,a,i,s),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,s,i,r){const o={};return o[hf]=nl,typeof location<"u"&&location.hostname&&pf.test(location.hostname)&&(o[ff]=_f),t&&(o[df]=t),s&&(o[mf]=s),i&&(o[Fo]=i),r&&(o[gf]=r),Tf(e,yf,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Rt.set("previous_websocket_failure",!0);try{let s;Pu(),this.mySock=new Vi(this.connURL,[],s)}catch(s){this.log_("Error instantiating WebSocket.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=s=>{this.handleIncomingFrame(s)},this.mySock.onerror=s=>{this.log_("WebSocket error.  Closing connection.");const i=s.message||s.data;i&&this.log_(i),this.onClosed_()}}start(){}static forceDisallow(){Me.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,s=navigator.userAgent.match(t);s&&s.length>1&&parseFloat(s[1])<4.4&&(e=!0)}return!e&&Vi!==null&&!Me.forceDisallow_}static previouslyFailed(){return Rt.isInMemoryStorage||Rt.get("previous_websocket_failure")===!0}markConnectionHealthy(){Rt.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const s=ss(t);this.onMessage(s)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(g(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const s=this.extractFrameCount_(t);s!==null&&this.appendFrame_(s)}}send(e){this.resetKeepAlive();const t=Z(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const s=cf(t,DE);s.length>1&&this.sendString_(String(s.length));for(let i=0;i<s.length;i++)this.sendString_(s[i])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(kE))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}Me.responsesRequiredToBeHealthy=2;Me.healthyTimeout=3e4;/**
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
 */class Ts{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[Jt,Me]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=Me&&Me.isAvailable();let s=t&&!Me.previouslyFailed();if(e.webSocketOnly&&(t||Ae("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),s=!0),s)this.transports_=[Me];else{const i=this.transports_=[];for(const r of Ts.ALL_TRANSPORTS)r&&r.isAvailable()&&i.push(r);Ts.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ts.globalTransportInitialized_=!1;/**
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
 */const VE=6e4,xE=5e3,ME=10*1024,OE=100*1024,eo="t",$c="d",LE="s",Gc="r",FE="e",Hc="o",Kc="a",Qc="n",Yc="p",UE="h";class BE{constructor(e,t,s,i,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=s,this.appCheckToken_=i,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=Ks("c:"+this.id+":"),this.transportManager_=new Ts(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),s=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,s)},Math.floor(0));const i=e.healthyTimeout||0;i>0&&(this.healthyTimeout_=Zn(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>OE?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>ME?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(i)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if(eo in e){const t=e[eo];t===Kc?this.upgradeIfSecondaryHealthy_():t===Gc?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Hc&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=Un("t",e),s=Un("d",e);if(t==="c")this.onSecondaryControl_(s);else if(t==="d")this.pendingDataMessages.push(s);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Yc,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Kc,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Qc,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=Un("t",e),s=Un("d",e);t==="c"?this.onControl_(s):t==="d"&&this.onDataMessage_(s)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=Un(eo,e);if($c in e){const s=e[$c];if(t===UE){const i=Object.assign({},s);this.repoInfo_.isUsingEmulator&&(i.h=this.repoInfo_.host),this.onHandshake_(i)}else if(t===Qc){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let i=0;i<this.pendingDataMessages.length;++i)this.onDataMessage_(this.pendingDataMessages[i]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===LE?this.onConnectionShutdown_(s):t===Gc?this.onReset_(s):t===FE?Lo("Server Error: "+s):t===Hc?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Lo("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,s=e.v,i=e.h;this.sessionId=e.s,this.repoInfo_.host=i,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),nl!==s&&Ae("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),s=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,s),Zn(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(VE))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):Zn(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(xE))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Yc,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Rt.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
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
 */class Sf{put(e,t,s,i){}merge(e,t,s,i){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,s){}onDisconnectMerge(e,t,s){}onDisconnectCancel(e,t){}reportStats(e){}}/**
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
 */class Pf{constructor(e){this.allowedEvents_=e,this.listeners_={},g(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const s=[...this.listeners_[e]];for(let i=0;i<s.length;i++)s[i].callback.apply(s[i].context,t)}}on(e,t,s){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:s});const i=this.getInitialEvent(e);i&&t.apply(s,i)}off(e,t,s){this.validateEventType_(e);const i=this.listeners_[e]||[];for(let r=0;r<i.length;r++)if(i[r].callback===t&&(!s||s===i[r].context)){i.splice(r,1);return}}validateEventType_(e){g(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
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
 */class xi extends Pf{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!Su()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new xi}getInitialEvent(e){return g(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
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
 */const Xc=32,Jc=768;class B{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let s=0;for(let i=0;i<this.pieces_.length;i++)this.pieces_[i].length>0&&(this.pieces_[s]=this.pieces_[i],s++);this.pieces_.length=s,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function M(){return new B("")}function N(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function pt(n){return n.pieces_.length-n.pieceNum_}function W(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new B(n.pieces_,e)}function rl(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function qE(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function Is(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Nf(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new B(e,0)}function G(n,e){const t=[];for(let s=n.pieceNum_;s<n.pieces_.length;s++)t.push(n.pieces_[s]);if(e instanceof B)for(let s=e.pieceNum_;s<e.pieces_.length;s++)t.push(e.pieces_[s]);else{const s=e.split("/");for(let i=0;i<s.length;i++)s[i].length>0&&t.push(s[i])}return new B(t,0)}function D(n){return n.pieceNum_>=n.pieces_.length}function Ce(n,e){const t=N(n),s=N(e);if(t===null)return e;if(t===s)return Ce(W(n),W(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function WE(n,e){const t=Is(n,0),s=Is(e,0);for(let i=0;i<t.length&&i<s.length;i++){const r=Wt(t[i],s[i]);if(r!==0)return r}return t.length===s.length?0:t.length<s.length?-1:1}function ol(n,e){if(pt(n)!==pt(e))return!1;for(let t=n.pieceNum_,s=e.pieceNum_;t<=n.pieces_.length;t++,s++)if(n.pieces_[t]!==e.pieces_[s])return!1;return!0}function ke(n,e){let t=n.pieceNum_,s=e.pieceNum_;if(pt(n)>pt(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[s])return!1;++t,++s}return!0}class jE{constructor(e,t){this.errorPrefix_=t,this.parts_=Is(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let s=0;s<this.parts_.length;s++)this.byteLength_+=Ki(this.parts_[s]);bf(this)}}function zE(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=Ki(e),bf(n)}function $E(n){const e=n.parts_.pop();n.byteLength_-=Ki(e),n.parts_.length>0&&(n.byteLength_-=1)}function bf(n){if(n.byteLength_>Jc)throw new Error(n.errorPrefix_+"has a key path longer than "+Jc+" bytes ("+n.byteLength_+").");if(n.parts_.length>Xc)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+Xc+") or object contains a cycle "+It(n))}function It(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
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
 */class al extends Pf{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const s=!document[e];s!==this.visible_&&(this.visible_=s,this.trigger("visible",s))},!1)}static getInstance(){return new al}getInitialEvent(e){return g(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
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
 */const Bn=1e3,GE=60*5*1e3,Zc=30*1e3,HE=1.3,KE=3e4,QE="server_kill",eu=3;class Je extends Sf{constructor(e,t,s,i,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=s,this.onConnectStatus_=i,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Je.nextPersistentConnectionId_++,this.log_=Ks("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=Bn,this.maxReconnectDelay_=GE,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l&&!Pu())throw new Error("Auth override specified in options, but not supported on non Node.js platforms");al.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&xi.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,s){const i=++this.requestNumber_,r={r:i,a:e,b:t};this.log_(Z(r)),g(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),s&&(this.requestCBHash_[i]=s)}get(e){this.initConnection_();const t=new Ps,i={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(i),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,s,i){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),g(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:i,hashFn:t,query:e,tag:s};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,s=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(s)})}sendListen_(e){const t=e.query,s=t._path.toString(),i=t._queryIdentifier;this.log_("Listen on "+s+" for "+i);const r={p:s},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Je.warnOnListenWarnings_(l,t),(this.listens.get(s)&&this.listens.get(s).get(i))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(s,i),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&He(e,"w")){const s=on(e,"w");if(Array.isArray(s)&&~s.indexOf("no_index")){const i='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();Ae(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${i} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||F_(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=Zc)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=L_(e)?"auth":"gauth",s={cred:e};this.authOverride_===null?s.noauth=!0:typeof this.authOverride_=="object"&&(s.authvar=this.authOverride_),this.sendRequest(t,s,i=>{const r=i.s,o=i.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,s=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,s)})}unlisten(e,t){const s=e._path.toString(),i=e._queryIdentifier;this.log_("Unlisten called for "+s+" "+i),g(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(s,i)&&this.connected_&&this.sendUnlisten_(s,i,e._queryObject,t)}sendUnlisten_(e,t,s,i){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";i&&(r.q=s,r.t=i),this.sendRequest(o,r)}onDisconnectPut(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:s})}onDisconnectMerge(e,t,s){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,s):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:s})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,s,i){const r={p:t,d:s};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{i&&setTimeout(()=>{i(o.s,o.d)},Math.floor(0))})}put(e,t,s,i){this.putInternal("p",e,t,s,i)}merge(e,t,s,i){this.putInternal("m",e,t,s,i)}putInternal(e,t,s,i,r){this.initConnection_();const o={p:t,d:s};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:i}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,s=this.outstandingPuts_[e].request,i=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,s,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),i&&i(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,s=>{if(s.s!=="ok"){const r=s.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+Z(e));const t=e.r,s=this.requestCBHash_[t];s&&(delete this.requestCBHash_[t],s(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Lo("Unrecognized action received from server: "+Z(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){g(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=Bn,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=Bn,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>KE&&(this.reconnectDelay_=Bn),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*HE)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),s=this.onRealtimeDisconnect_.bind(this),i=this.id+":"+Je.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,s())},c=function(h){g(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(h)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[h,d]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?ue("getToken() completed but was canceled"):(ue("getToken() completed. Creating connection."),this.authToken_=h&&h.accessToken,this.appCheckToken_=d&&d.token,a=new BE(i,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,s,f=>{Ae(f+" ("+this.repoInfo_.toString()+")"),this.interrupt(QE)},r))}catch(h){this.log_("Failed to get token: "+h),o||(this.repoInfo_.nodeAdmin&&Ae(h),l())}}}interrupt(e){ue("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){ue("Resuming connection for reason: "+e),delete this.interruptReasons_[e],Ol(this.interruptReasons_)&&(this.reconnectDelay_=Bn,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let s;t?s=t.map(r=>tl(r)).join("$"):s="default";const i=this.removeListen_(e,s);i&&i.onComplete&&i.onComplete("permission_denied")}removeListen_(e,t){const s=new B(e).toString();let i;if(this.listens.has(s)){const r=this.listens.get(s);i=r.get(t),r.delete(t),r.size===0&&this.listens.delete(s)}else i=void 0;return i}onAuthRevoked_(e,t){ue("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=eu&&(this.reconnectDelay_=Zc,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){ue("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=eu&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+of.replace(/\./g,"-")]=1,Su()?e["framework.cordova"]=1:D_()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=xi.getInstance().currentlyOnline();return Ol(this.interruptReasons_)&&e}}Je.nextPersistentConnectionId_=0;Je.nextConnectionId_=0;/**
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
 */class b{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new b(e,t)}}/**
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
 */class Ar{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const s=new b(gn,e),i=new b(gn,t);return this.compare(s,i)!==0}minPost(){return b.MIN}}/**
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
 */let ci;class Df extends Ar{static get __EMPTY_NODE(){return ci}static set __EMPTY_NODE(e){ci=e}compare(e,t){return Wt(e.name,t.name)}isDefinedOn(e){throw wn("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return b.MIN}maxPost(){return new b(Ot,ci)}makePost(e,t){return g(typeof e=="string","KeyIndex indexValue must always be a string."),new b(e,ci)}toString(){return".key"}}const rn=new Df;/**
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
 */class ui{constructor(e,t,s,i,r=null){this.isReverse_=i,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?s(e.key,t):1,i&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class ie{constructor(e,t,s,i,r){this.key=e,this.value=t,this.color=s??ie.RED,this.left=i??Re.EMPTY_NODE,this.right=r??Re.EMPTY_NODE}copy(e,t,s,i,r){return new ie(e??this.key,t??this.value,s??this.color,i??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,s){let i=this;const r=s(e,i.key);return r<0?i=i.copy(null,null,null,i.left.insert(e,t,s),null):r===0?i=i.copy(null,t,null,null,null):i=i.copy(null,null,null,null,i.right.insert(e,t,s)),i.fixUp_()}removeMin_(){if(this.left.isEmpty())return Re.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let s,i;if(s=this,t(e,s.key)<0)!s.left.isEmpty()&&!s.left.isRed_()&&!s.left.left.isRed_()&&(s=s.moveRedLeft_()),s=s.copy(null,null,null,s.left.remove(e,t),null);else{if(s.left.isRed_()&&(s=s.rotateRight_()),!s.right.isEmpty()&&!s.right.isRed_()&&!s.right.left.isRed_()&&(s=s.moveRedRight_()),t(e,s.key)===0){if(s.right.isEmpty())return Re.EMPTY_NODE;i=s.right.min_(),s=s.copy(i.key,i.value,null,null,s.right.removeMin_())}s=s.copy(null,null,null,null,s.right.remove(e,t))}return s.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,ie.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,ie.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}ie.RED=!0;ie.BLACK=!1;class YE{copy(e,t,s,i,r){return this}insert(e,t,s){return new ie(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class Re{constructor(e,t=Re.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new Re(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,ie.BLACK,null,null))}remove(e){return new Re(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,ie.BLACK,null,null))}get(e){let t,s=this.root_;for(;!s.isEmpty();){if(t=this.comparator_(e,s.key),t===0)return s.value;t<0?s=s.left:t>0&&(s=s.right)}return null}getPredecessorKey(e){let t,s=this.root_,i=null;for(;!s.isEmpty();)if(t=this.comparator_(e,s.key),t===0){if(s.left.isEmpty())return i?i.key:null;for(s=s.left;!s.right.isEmpty();)s=s.right;return s.key}else t<0?s=s.left:t>0&&(i=s,s=s.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new ui(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new ui(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new ui(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new ui(this.root_,null,this.comparator_,!0,e)}}Re.EMPTY_NODE=new YE;/**
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
 */function XE(n,e){return Wt(n.name,e.name)}function ll(n,e){return Wt(n,e)}/**
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
 */let Uo;function JE(n){Uo=n}const kf=function(n){return typeof n=="number"?"number:"+uf(n):"string:"+n},Vf=function(n){if(n.isLeafNode()){const e=n.val();g(typeof e=="string"||typeof e=="number"||typeof e=="object"&&He(e,".sv"),"Priority must be a string or number.")}else g(n===Uo||n.isEmpty(),"priority of unexpected type.");g(n===Uo||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
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
 */let tu;class ne{constructor(e,t=ne.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,g(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),Vf(this.priorityNode_)}static set __childrenNodeConstructor(e){tu=e}static get __childrenNodeConstructor(){return tu}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new ne(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:ne.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return D(e)?this:N(e)===".priority"?this.priorityNode_:ne.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:ne.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const s=N(e);return s===null?t:t.isEmpty()&&s!==".priority"?this:(g(s!==".priority"||pt(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(s,ne.__childrenNodeConstructor.EMPTY_NODE.updateChild(W(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+kf(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=uf(this.value_):e+=this.value_,this.lazyHash_=lf(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===ne.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof ne.__childrenNodeConstructor?-1:(g(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,s=typeof this.value_,i=ne.VALUE_TYPE_ORDER.indexOf(t),r=ne.VALUE_TYPE_ORDER.indexOf(s);return g(i>=0,"Unknown leaf type: "+t),g(r>=0,"Unknown leaf type: "+s),i===r?s==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-i}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}ne.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
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
 */let xf,Mf;function ZE(n){xf=n}function eT(n){Mf=n}class tT extends Ar{compare(e,t){const s=e.node.getPriority(),i=t.node.getPriority(),r=s.compareTo(i);return r===0?Wt(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return b.MIN}maxPost(){return new b(Ot,new ne("[PRIORITY-POST]",Mf))}makePost(e,t){const s=xf(e);return new b(t,new ne("[PRIORITY-POST]",s))}toString(){return".priority"}}const H=new tT;/**
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
 */const nT=Math.log(2);class sT{constructor(e){const t=r=>parseInt(Math.log(r)/nT,10),s=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const i=s(this.count);this.bits_=e+1&i}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const Mi=function(n,e,t,s){n.sort(e);const i=function(l,c){const u=c-l;let h,d;if(u===0)return null;if(u===1)return h=n[l],d=t?t(h):h,new ie(d,h.node,ie.BLACK,null,null);{const f=parseInt(u/2,10)+l,m=i(l,f),v=i(f+1,c);return h=n[f],d=t?t(h):h,new ie(d,h.node,ie.BLACK,m,v)}},r=function(l){let c=null,u=null,h=n.length;const d=function(m,v){const E=h-m,O=h;h-=m;const $=i(E+1,O),le=n[E],xe=t?t(le):le;f(new ie(xe,le.node,v,null,$))},f=function(m){c?(c.left=m,c=m):(u=m,c=m)};for(let m=0;m<l.count;++m){const v=l.nextBitIsOne(),E=Math.pow(2,l.count-(m+1));v?d(E,ie.BLACK):(d(E,ie.BLACK),d(E,ie.RED))}return u},o=new sT(n.length),a=r(o);return new Re(s||e,a)};/**
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
 */let to;const Gt={};class Xe{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return g(Gt&&H,"ChildrenNode.ts has not been loaded"),to=to||new Xe({".priority":Gt},{".priority":H}),to}get(e){const t=on(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof Re?t:null}hasIndex(e){return He(this.indexSet_,e.toString())}addIndex(e,t){g(e!==rn,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const s=[];let i=!1;const r=t.getIterator(b.Wrap);let o=r.getNext();for(;o;)i=i||e.isDefinedOn(o.node),s.push(o),o=r.getNext();let a;i?a=Mi(s,e.getCompare()):a=Gt;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new Xe(u,c)}addToIndexes(e,t){const s=mi(this.indexes_,(i,r)=>{const o=on(this.indexSet_,r);if(g(o,"Missing index implementation for "+r),i===Gt)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(b.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),Mi(a,o.getCompare())}else return Gt;else{const a=t.get(e.name);let l=i;return a&&(l=l.remove(new b(e.name,a))),l.insert(e,e.node)}});return new Xe(s,this.indexSet_)}removeFromIndexes(e,t){const s=mi(this.indexes_,i=>{if(i===Gt)return i;{const r=t.get(e.name);return r?i.remove(new b(e.name,r)):i}});return new Xe(s,this.indexSet_)}}/**
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
 */let qn;class A{constructor(e,t,s){this.children_=e,this.priorityNode_=t,this.indexMap_=s,this.lazyHash_=null,this.priorityNode_&&Vf(this.priorityNode_),this.children_.isEmpty()&&g(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return qn||(qn=new A(new Re(ll),null,Xe.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||qn}updatePriority(e){return this.children_.isEmpty()?this:new A(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?qn:t}}getChild(e){const t=N(e);return t===null?this:this.getImmediateChild(t).getChild(W(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(g(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const s=new b(e,t);let i,r;t.isEmpty()?(i=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(s,this.children_)):(i=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(s,this.children_));const o=i.isEmpty()?qn:this.priorityNode_;return new A(i,o,r)}}updateChild(e,t){const s=N(e);if(s===null)return t;{g(N(e)!==".priority"||pt(e)===1,".priority must be the last token in a path");const i=this.getImmediateChild(s).updateChild(W(e),t);return this.updateImmediateChild(s,i)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let s=0,i=0,r=!0;if(this.forEachChild(H,(o,a)=>{t[o]=a.val(e),s++,r&&A.INTEGER_REGEXP_.test(o)?i=Math.max(i,Number(o)):r=!1}),!e&&r&&i<2*s){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+kf(this.getPriority().val())+":"),this.forEachChild(H,(t,s)=>{const i=s.hash();i!==""&&(e+=":"+t+":"+i)}),this.lazyHash_=e===""?"":lf(e)}return this.lazyHash_}getPredecessorChildName(e,t,s){const i=this.resolveIndex_(s);if(i){const r=i.getPredecessorKey(new b(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.minKey();return s&&s.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new b(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const s=t.maxKey();return s&&s.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new b(t,this.children_.get(t)):null}forEachChild(e,t){const s=this.resolveIndex_(e);return s?s.inorderTraversal(i=>t(i.name,i.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getIteratorFrom(e,i=>i);{const i=this.children_.getIteratorFrom(e.name,b.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)<0;)i.getNext(),r=i.peek();return i}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const s=this.resolveIndex_(t);if(s)return s.getReverseIteratorFrom(e,i=>i);{const i=this.children_.getReverseIteratorFrom(e.name,b.Wrap);let r=i.peek();for(;r!=null&&t.compare(r,e)>0;)i.getNext(),r=i.peek();return i}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===Qs?-1:0}withIndex(e){if(e===rn||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new A(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===rn||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const s=this.getIterator(H),i=t.getIterator(H);let r=s.getNext(),o=i.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=s.getNext(),o=i.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===rn?null:this.indexMap_.get(e.toString())}}A.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class iT extends A{constructor(){super(new Re(ll),A.EMPTY_NODE,Xe.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return A.EMPTY_NODE}isEmpty(){return!1}}const Qs=new iT;Object.defineProperties(b,{MIN:{value:new b(gn,A.EMPTY_NODE)},MAX:{value:new b(Ot,Qs)}});Df.__EMPTY_NODE=A.EMPTY_NODE;ne.__childrenNodeConstructor=A;JE(Qs);eT(Qs);/**
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
 */const rT=!0;function J(n,e=null){if(n===null)return A.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),g(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new ne(t,J(e))}if(!(n instanceof Array)&&rT){const t=[];let s=!1;if(pe(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=J(a);l.isEmpty()||(s=s||!l.getPriority().isEmpty(),t.push(new b(o,l)))}}),t.length===0)return A.EMPTY_NODE;const r=Mi(t,XE,o=>o.name,ll);if(s){const o=Mi(t,H.getCompare());return new A(r,J(e),new Xe({".priority":o},{".priority":H}))}else return new A(r,J(e),Xe.Default)}else{let t=A.EMPTY_NODE;return pe(n,(s,i)=>{if(He(n,s)&&s.substring(0,1)!=="."){const r=J(i);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(s,r))}}),t.updatePriority(J(e))}}ZE(J);/**
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
 */class oT extends Ar{constructor(e){super(),this.indexPath_=e,g(!D(e)&&N(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const s=this.extractChild(e.node),i=this.extractChild(t.node),r=s.compareTo(i);return r===0?Wt(e.name,t.name):r}makePost(e,t){const s=J(e),i=A.EMPTY_NODE.updateChild(this.indexPath_,s);return new b(t,i)}maxPost(){const e=A.EMPTY_NODE.updateChild(this.indexPath_,Qs);return new b(Ot,e)}toString(){return Is(this.indexPath_,0).join("/")}}/**
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
 */class aT extends Ar{compare(e,t){const s=e.node.compareTo(t.node);return s===0?Wt(e.name,t.name):s}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return b.MIN}maxPost(){return b.MAX}makePost(e,t){const s=J(e);return new b(t,s)}toString(){return".value"}}const lT=new aT;/**
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
 */function Of(n){return{type:"value",snapshotNode:n}}function yn(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function ws(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function Cs(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function cT(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
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
 */class cl{constructor(e){this.index_=e}updateChild(e,t,s,i,r,o){g(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(i).equals(s.getChild(i))&&a.isEmpty()===s.isEmpty()||(o!=null&&(s.isEmpty()?e.hasChild(t)?o.trackChildChange(ws(t,a)):g(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(yn(t,s)):o.trackChildChange(Cs(t,s,a))),e.isLeafNode()&&s.isEmpty())?e:e.updateImmediateChild(t,s).withIndex(this.index_)}updateFullNode(e,t,s){return s!=null&&(e.isLeafNode()||e.forEachChild(H,(i,r)=>{t.hasChild(i)||s.trackChildChange(ws(i,r))}),t.isLeafNode()||t.forEachChild(H,(i,r)=>{if(e.hasChild(i)){const o=e.getImmediateChild(i);o.equals(r)||s.trackChildChange(Cs(i,r,o))}else s.trackChildChange(yn(i,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?A.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
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
 */class As{constructor(e){this.indexedFilter_=new cl(e.getIndex()),this.index_=e.getIndex(),this.startPost_=As.getStartPost_(e),this.endPost_=As.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,s=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&s}updateChild(e,t,s,i,r,o){return this.matches(new b(t,s))||(s=A.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,s,i,r,o)}updateFullNode(e,t,s){t.isLeafNode()&&(t=A.EMPTY_NODE);let i=t.withIndex(this.index_);i=i.updatePriority(A.EMPTY_NODE);const r=this;return t.forEachChild(H,(o,a)=>{r.matches(new b(o,a))||(i=i.updateImmediateChild(o,A.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
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
 */class uT{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const s=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?s<=0:s<0},this.withinEndPost=t=>{const s=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?s<=0:s<0},this.rangedFilter_=new As(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,s,i,r,o){return this.rangedFilter_.matches(new b(t,s))||(s=A.EMPTY_NODE),e.getImmediateChild(t).equals(s)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,s,i,r,o):this.fullLimitUpdateChild_(e,t,s,r,o)}updateFullNode(e,t,s){let i;if(t.isLeafNode()||t.isEmpty())i=A.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){i=A.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))i=i.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{i=t.withIndex(this.index_),i=i.updatePriority(A.EMPTY_NODE);let r;this.reverse_?r=i.getReverseIterator(this.index_):r=i.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:i=i.updateImmediateChild(a.name,A.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,i,s)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,s,i,r){let o;if(this.reverse_){const h=this.index_.getCompare();o=(d,f)=>h(f,d)}else o=this.index_.getCompare();const a=e;g(a.numChildren()===this.limit_,"");const l=new b(t,s),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const h=a.getImmediateChild(t);let d=i.getChildAfterChild(this.index_,c,this.reverse_);for(;d!=null&&(d.name===t||a.hasChild(d.name));)d=i.getChildAfterChild(this.index_,d,this.reverse_);const f=d==null?1:o(d,l);if(u&&!s.isEmpty()&&f>=0)return r!=null&&r.trackChildChange(Cs(t,s,h)),a.updateImmediateChild(t,s);{r!=null&&r.trackChildChange(ws(t,h));const v=a.updateImmediateChild(t,A.EMPTY_NODE);return d!=null&&this.rangedFilter_.matches(d)?(r!=null&&r.trackChildChange(yn(d.name,d.node)),v.updateImmediateChild(d.name,d.node)):v}}else return s.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(ws(c.name,c.node)),r.trackChildChange(yn(t,s))),a.updateImmediateChild(t,s).updateImmediateChild(c.name,A.EMPTY_NODE)):e}}/**
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
 */class ul{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=H}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return g(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return g(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:gn}hasEnd(){return this.endSet_}getIndexEndValue(){return g(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return g(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:Ot}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return g(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===H}copy(){const e=new ul;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function hT(n){return n.loadsAllData()?new cl(n.getIndex()):n.hasLimit()?new uT(n):new As(n)}function nu(n){const e={};if(n.isDefault())return e;let t;if(n.index_===H?t="$priority":n.index_===lT?t="$value":n.index_===rn?t="$key":(g(n.index_ instanceof oT,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=Z(t),n.startSet_){const s=n.startAfterSet_?"startAfter":"startAt";e[s]=Z(n.indexStartValue_),n.startNameSet_&&(e[s]+=","+Z(n.indexStartName_))}if(n.endSet_){const s=n.endBeforeSet_?"endBefore":"endAt";e[s]=Z(n.indexEndValue_),n.endNameSet_&&(e[s]+=","+Z(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function su(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==H&&(e.i=n.index_.toString()),e}/**
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
 */class Oi extends Sf{constructor(e,t,s,i){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=s,this.appCheckTokenProvider_=i,this.log_=Ks("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(g(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,s,i){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Oi.getListenId_(e,s),a={};this.listens_[o]=a;const l=nu(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let h=u;if(c===404&&(h=null,c=null),c===null&&this.onDataUpdate_(r,h,!1,s),on(this.listens_,o)===a){let d;c?c===401?d="permission_denied":d="rest_error:"+c:d="ok",i(d,null)}})}unlisten(e,t){const s=Oi.getListenId_(e,t);delete this.listens_[s]}get(e){const t=nu(e._queryParams),s=e._path.toString(),i=new Ps;return this.restRequest_(s+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(s,a,!1,null),i.resolve(a)):i.reject(new Error(a))}),i.promise}refreshAuthToken(e){}restRequest_(e,t={},s){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([i,r])=>{i&&i.accessToken&&(t.auth=i.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+U_(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(s&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=ss(a.responseText)}catch{Ae("Failed to parse JSON response for "+o+": "+a.responseText)}s(null,l)}else a.status!==401&&a.status!==404&&Ae("Got unsuccessful REST response for "+o+" Status: "+a.status),s(a.status);s=null}},a.open("GET",o,!0),a.send()})}}/**
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
 */class dT{constructor(){this.rootNode_=A.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
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
 */function Li(){return{value:null,children:new Map}}function Lf(n,e,t){if(D(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const s=N(e);n.children.has(s)||n.children.set(s,Li());const i=n.children.get(s);e=W(e),Lf(i,e,t)}}function Bo(n,e,t){n.value!==null?t(e,n.value):fT(n,(s,i)=>{const r=new B(e.toString()+"/"+s);Bo(i,r,t)})}function fT(n,e){n.children.forEach((t,s)=>{e(s,t)})}/**
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
 */class _T{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&pe(this.last_,(s,i)=>{t[s]=t[s]-i}),this.last_=e,t}}/**
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
 */const iu=10*1e3,pT=30*1e3,mT=5*60*1e3;class gT{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new _T(e);const s=iu+(pT-iu)*Math.random();Zn(this.reportStats_.bind(this),Math.floor(s))}reportStats_(){const e=this.statsListener_.get(),t={};let s=!1;pe(e,(i,r)=>{r>0&&He(this.statsToReport_,i)&&(t[i]=r,s=!0)}),s&&this.server_.reportStats(t),Zn(this.reportStats_.bind(this),Math.floor(Math.random()*2*mT))}}/**
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
 */var Oe;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(Oe||(Oe={}));function hl(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function dl(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function fl(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
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
 */class Fi{constructor(e,t,s){this.path=e,this.affectedTree=t,this.revert=s,this.type=Oe.ACK_USER_WRITE,this.source=hl()}operationForChild(e){if(D(this.path)){if(this.affectedTree.value!=null)return g(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new B(e));return new Fi(M(),t,this.revert)}}else return g(N(this.path)===e,"operationForChild called for unrelated child."),new Fi(W(this.path),this.affectedTree,this.revert)}}/**
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
 */class Rs{constructor(e,t){this.source=e,this.path=t,this.type=Oe.LISTEN_COMPLETE}operationForChild(e){return D(this.path)?new Rs(this.source,M()):new Rs(this.source,W(this.path))}}/**
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
 */class Lt{constructor(e,t,s){this.source=e,this.path=t,this.snap=s,this.type=Oe.OVERWRITE}operationForChild(e){return D(this.path)?new Lt(this.source,M(),this.snap.getImmediateChild(e)):new Lt(this.source,W(this.path),this.snap)}}/**
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
 */class vn{constructor(e,t,s){this.source=e,this.path=t,this.children=s,this.type=Oe.MERGE}operationForChild(e){if(D(this.path)){const t=this.children.subtree(new B(e));return t.isEmpty()?null:t.value?new Lt(this.source,M(),t.value):new vn(this.source,M(),t)}else return g(N(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new vn(this.source,W(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
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
 */class mt{constructor(e,t,s){this.node_=e,this.fullyInitialized_=t,this.filtered_=s}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(D(e))return this.isFullyInitialized()&&!this.filtered_;const t=N(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
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
 */class yT{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function vT(n,e,t,s){const i=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(cT(o.childName,o.snapshotNode))}),Wn(n,i,"child_removed",e,s,t),Wn(n,i,"child_added",e,s,t),Wn(n,i,"child_moved",r,s,t),Wn(n,i,"child_changed",e,s,t),Wn(n,i,"value",e,s,t),i}function Wn(n,e,t,s,i,r){const o=s.filter(a=>a.type===t);o.sort((a,l)=>TT(n,a,l)),o.forEach(a=>{const l=ET(n,a,r);i.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function ET(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function TT(n,e,t){if(e.childName==null||t.childName==null)throw wn("Should only compare child_ events.");const s=new b(e.childName,e.snapshotNode),i=new b(t.childName,t.snapshotNode);return n.index_.compare(s,i)}/**
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
 */function Rr(n,e){return{eventCache:n,serverCache:e}}function es(n,e,t,s){return Rr(new mt(e,t,s),n.serverCache)}function Ff(n,e,t,s){return Rr(n.eventCache,new mt(e,t,s))}function Ui(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Ft(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
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
 */let no;const IT=()=>(no||(no=new Re(oE)),no);class q{constructor(e,t=IT()){this.value=e,this.children=t}static fromObject(e){let t=new q(null);return pe(e,(s,i)=>{t=t.set(new B(s),i)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:M(),value:this.value};if(D(e))return null;{const s=N(e),i=this.children.get(s);if(i!==null){const r=i.findRootMostMatchingPathAndValue(W(e),t);return r!=null?{path:G(new B(s),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(D(e))return this;{const t=N(e),s=this.children.get(t);return s!==null?s.subtree(W(e)):new q(null)}}set(e,t){if(D(e))return new q(t,this.children);{const s=N(e),r=(this.children.get(s)||new q(null)).set(W(e),t),o=this.children.insert(s,r);return new q(this.value,o)}}remove(e){if(D(e))return this.children.isEmpty()?new q(null):new q(null,this.children);{const t=N(e),s=this.children.get(t);if(s){const i=s.remove(W(e));let r;return i.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,i),this.value===null&&r.isEmpty()?new q(null):new q(this.value,r)}else return this}}get(e){if(D(e))return this.value;{const t=N(e),s=this.children.get(t);return s?s.get(W(e)):null}}setTree(e,t){if(D(e))return t;{const s=N(e),r=(this.children.get(s)||new q(null)).setTree(W(e),t);let o;return r.isEmpty()?o=this.children.remove(s):o=this.children.insert(s,r),new q(this.value,o)}}fold(e){return this.fold_(M(),e)}fold_(e,t){const s={};return this.children.inorderTraversal((i,r)=>{s[i]=r.fold_(G(e,i),t)}),t(e,this.value,s)}findOnPath(e,t){return this.findOnPath_(e,M(),t)}findOnPath_(e,t,s){const i=this.value?s(t,this.value):!1;if(i)return i;if(D(e))return null;{const r=N(e),o=this.children.get(r);return o?o.findOnPath_(W(e),G(t,r),s):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,M(),t)}foreachOnPath_(e,t,s){if(D(e))return this;{this.value&&s(t,this.value);const i=N(e),r=this.children.get(i);return r?r.foreachOnPath_(W(e),G(t,i),s):new q(null)}}foreach(e){this.foreach_(M(),e)}foreach_(e,t){this.children.inorderTraversal((s,i)=>{i.foreach_(G(e,s),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,s)=>{s.value&&e(t,s.value)})}}/**
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
 */class Le{constructor(e){this.writeTree_=e}static empty(){return new Le(new q(null))}}function ts(n,e,t){if(D(e))return new Le(new q(t));{const s=n.writeTree_.findRootMostValueAndPath(e);if(s!=null){const i=s.path;let r=s.value;const o=Ce(i,e);return r=r.updateChild(o,t),new Le(n.writeTree_.set(i,r))}else{const i=new q(t),r=n.writeTree_.setTree(e,i);return new Le(r)}}}function qo(n,e,t){let s=n;return pe(t,(i,r)=>{s=ts(s,G(e,i),r)}),s}function ru(n,e){if(D(e))return Le.empty();{const t=n.writeTree_.setTree(e,new q(null));return new Le(t)}}function Wo(n,e){return jt(n,e)!=null}function jt(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(Ce(t.path,e)):null}function ou(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(H,(s,i)=>{e.push(new b(s,i))}):n.writeTree_.children.inorderTraversal((s,i)=>{i.value!=null&&e.push(new b(s,i.value))}),e}function ut(n,e){if(D(e))return n;{const t=jt(n,e);return t!=null?new Le(new q(t)):new Le(n.writeTree_.subtree(e))}}function jo(n){return n.writeTree_.isEmpty()}function En(n,e){return Uf(M(),n.writeTree_,e)}function Uf(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let s=null;return e.children.inorderTraversal((i,r)=>{i===".priority"?(g(r.value!==null,"Priority writes must always be leaf nodes"),s=r.value):t=Uf(G(n,i),r,t)}),!t.getChild(n).isEmpty()&&s!==null&&(t=t.updateChild(G(n,".priority"),s)),t}}/**
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
 */function Sr(n,e){return jf(e,n)}function wT(n,e,t,s,i){g(s>n.lastWriteId,"Stacking an older write on top of newer ones"),i===void 0&&(i=!0),n.allWrites.push({path:e,snap:t,writeId:s,visible:i}),i&&(n.visibleWrites=ts(n.visibleWrites,e,t)),n.lastWriteId=s}function CT(n,e,t,s){g(s>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:s,visible:!0}),n.visibleWrites=qo(n.visibleWrites,e,t),n.lastWriteId=s}function AT(n,e){for(let t=0;t<n.allWrites.length;t++){const s=n.allWrites[t];if(s.writeId===e)return s}return null}function RT(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);g(t>=0,"removeWrite called with nonexistent writeId.");const s=n.allWrites[t];n.allWrites.splice(t,1);let i=s.visible,r=!1,o=n.allWrites.length-1;for(;i&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&ST(a,s.path)?i=!1:ke(s.path,a.path)&&(r=!0)),o--}if(i){if(r)return PT(n),!0;if(s.snap)n.visibleWrites=ru(n.visibleWrites,s.path);else{const a=s.children;pe(a,l=>{n.visibleWrites=ru(n.visibleWrites,G(s.path,l))})}return!0}else return!1}function ST(n,e){if(n.snap)return ke(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&ke(G(n.path,t),e))return!0;return!1}function PT(n){n.visibleWrites=Bf(n.allWrites,NT,M()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function NT(n){return n.visible}function Bf(n,e,t){let s=Le.empty();for(let i=0;i<n.length;++i){const r=n[i];if(e(r)){const o=r.path;let a;if(r.snap)ke(t,o)?(a=Ce(t,o),s=ts(s,a,r.snap)):ke(o,t)&&(a=Ce(o,t),s=ts(s,M(),r.snap.getChild(a)));else if(r.children){if(ke(t,o))a=Ce(t,o),s=qo(s,a,r.children);else if(ke(o,t))if(a=Ce(o,t),D(a))s=qo(s,M(),r.children);else{const l=on(r.children,N(a));if(l){const c=l.getChild(W(a));s=ts(s,M(),c)}}}else throw wn("WriteRecord should have .snap or .children")}}return s}function qf(n,e,t,s,i){if(!s&&!i){const r=jt(n.visibleWrites,e);if(r!=null)return r;{const o=ut(n.visibleWrites,e);if(jo(o))return t;if(t==null&&!Wo(o,M()))return null;{const a=t||A.EMPTY_NODE;return En(o,a)}}}else{const r=ut(n.visibleWrites,e);if(!i&&jo(r))return t;if(!i&&t==null&&!Wo(r,M()))return null;{const o=function(c){return(c.visible||i)&&(!s||!~s.indexOf(c.writeId))&&(ke(c.path,e)||ke(e,c.path))},a=Bf(n.allWrites,o,e),l=t||A.EMPTY_NODE;return En(a,l)}}}function bT(n,e,t){let s=A.EMPTY_NODE;const i=jt(n.visibleWrites,e);if(i)return i.isLeafNode()||i.forEachChild(H,(r,o)=>{s=s.updateImmediateChild(r,o)}),s;if(t){const r=ut(n.visibleWrites,e);return t.forEachChild(H,(o,a)=>{const l=En(ut(r,new B(o)),a);s=s.updateImmediateChild(o,l)}),ou(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}else{const r=ut(n.visibleWrites,e);return ou(r).forEach(o=>{s=s.updateImmediateChild(o.name,o.node)}),s}}function DT(n,e,t,s,i){g(s||i,"Either existingEventSnap or existingServerSnap must exist");const r=G(e,t);if(Wo(n.visibleWrites,r))return null;{const o=ut(n.visibleWrites,r);return jo(o)?i.getChild(t):En(o,i.getChild(t))}}function kT(n,e,t,s){const i=G(e,t),r=jt(n.visibleWrites,i);if(r!=null)return r;if(s.isCompleteForChild(t)){const o=ut(n.visibleWrites,i);return En(o,s.getNode().getImmediateChild(t))}else return null}function VT(n,e){return jt(n.visibleWrites,e)}function xT(n,e,t,s,i,r,o){let a;const l=ut(n.visibleWrites,e),c=jt(l,M());if(c!=null)a=c;else if(t!=null)a=En(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],h=o.getCompare(),d=r?a.getReverseIteratorFrom(s,o):a.getIteratorFrom(s,o);let f=d.getNext();for(;f&&u.length<i;)h(f,s)!==0&&u.push(f),f=d.getNext();return u}else return[]}function MT(){return{visibleWrites:Le.empty(),allWrites:[],lastWriteId:-1}}function Bi(n,e,t,s){return qf(n.writeTree,n.treePath,e,t,s)}function _l(n,e){return bT(n.writeTree,n.treePath,e)}function au(n,e,t,s){return DT(n.writeTree,n.treePath,e,t,s)}function qi(n,e){return VT(n.writeTree,G(n.treePath,e))}function OT(n,e,t,s,i,r){return xT(n.writeTree,n.treePath,e,t,s,i,r)}function pl(n,e,t){return kT(n.writeTree,n.treePath,e,t)}function Wf(n,e){return jf(G(n.treePath,e),n.writeTree)}function jf(n,e){return{treePath:n,writeTree:e}}/**
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
 */class LT{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,s=e.childName;g(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),g(s!==".priority","Only non-priority child changes can be tracked.");const i=this.changeMap.get(s);if(i){const r=i.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(s,Cs(s,e.snapshotNode,i.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(s);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(s,ws(s,i.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(s,yn(s,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(s,Cs(s,e.snapshotNode,i.oldSnap));else throw wn("Illegal combination of changes: "+e+" occurred after "+i)}else this.changeMap.set(s,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
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
 */class FT{getCompleteChild(e){return null}getChildAfterChild(e,t,s){return null}}const zf=new FT;class ml{constructor(e,t,s=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=s}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const s=this.optCompleteServerCache_!=null?new mt(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return pl(this.writes_,e,s)}}getChildAfterChild(e,t,s){const i=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Ft(this.viewCache_),r=OT(this.writes_,i,t,1,s,e);return r.length===0?null:r[0]}}/**
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
 */function UT(n){return{filter:n}}function BT(n,e){g(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),g(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function qT(n,e,t,s,i){const r=new LT;let o,a;if(t.type===Oe.OVERWRITE){const c=t;c.source.fromUser?o=zo(n,e,c.path,c.snap,s,i,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!D(c.path),o=Wi(n,e,c.path,c.snap,s,i,a,r))}else if(t.type===Oe.MERGE){const c=t;c.source.fromUser?o=jT(n,e,c.path,c.children,s,i,r):(g(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=$o(n,e,c.path,c.children,s,i,a,r))}else if(t.type===Oe.ACK_USER_WRITE){const c=t;c.revert?o=GT(n,e,c.path,s,i,r):o=zT(n,e,c.path,c.affectedTree,s,i,r)}else if(t.type===Oe.LISTEN_COMPLETE)o=$T(n,e,t.path,s,r);else throw wn("Unknown operation type: "+t.type);const l=r.getChanges();return WT(e,o,l),{viewCache:o,changes:l}}function WT(n,e,t){const s=e.eventCache;if(s.isFullyInitialized()){const i=s.getNode().isLeafNode()||s.getNode().isEmpty(),r=Ui(n);(t.length>0||!n.eventCache.isFullyInitialized()||i&&!s.getNode().equals(r)||!s.getNode().getPriority().equals(r.getPriority()))&&t.push(Of(Ui(e)))}}function $f(n,e,t,s,i,r){const o=e.eventCache;if(qi(s,t)!=null)return e;{let a,l;if(D(t))if(g(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Ft(e),u=c instanceof A?c:A.EMPTY_NODE,h=_l(s,u);a=n.filter.updateFullNode(e.eventCache.getNode(),h,r)}else{const c=Bi(s,Ft(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=N(t);if(c===".priority"){g(pt(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const h=au(s,t,u,l);h!=null?a=n.filter.updatePriority(u,h):a=o.getNode()}else{const u=W(t);let h;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const d=au(s,t,o.getNode(),l);d!=null?h=o.getNode().getImmediateChild(c).updateChild(u,d):h=o.getNode().getImmediateChild(c)}else h=pl(s,c,e.serverCache);h!=null?a=n.filter.updateChild(o.getNode(),c,h,u,i,r):a=o.getNode()}}return es(e,a,o.isFullyInitialized()||D(t),n.filter.filtersNodes())}}function Wi(n,e,t,s,i,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if(D(t))c=u.updateFullNode(l.getNode(),s,null);else if(u.filtersNodes()&&!l.isFiltered()){const f=l.getNode().updateChild(t,s);c=u.updateFullNode(l.getNode(),f,null)}else{const f=N(t);if(!l.isCompleteForPath(t)&&pt(t)>1)return e;const m=W(t),E=l.getNode().getImmediateChild(f).updateChild(m,s);f===".priority"?c=u.updatePriority(l.getNode(),E):c=u.updateChild(l.getNode(),f,E,m,zf,null)}const h=Ff(e,c,l.isFullyInitialized()||D(t),u.filtersNodes()),d=new ml(i,h,r);return $f(n,h,t,i,d,a)}function zo(n,e,t,s,i,r,o){const a=e.eventCache;let l,c;const u=new ml(i,e,r);if(D(t))c=n.filter.updateFullNode(e.eventCache.getNode(),s,o),l=es(e,c,!0,n.filter.filtersNodes());else{const h=N(t);if(h===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),s),l=es(e,c,a.isFullyInitialized(),a.isFiltered());else{const d=W(t),f=a.getNode().getImmediateChild(h);let m;if(D(d))m=s;else{const v=u.getCompleteChild(h);v!=null?rl(d)===".priority"&&v.getChild(Nf(d)).isEmpty()?m=v:m=v.updateChild(d,s):m=A.EMPTY_NODE}if(f.equals(m))l=e;else{const v=n.filter.updateChild(a.getNode(),h,m,d,u,o);l=es(e,v,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function lu(n,e){return n.eventCache.isCompleteForChild(e)}function jT(n,e,t,s,i,r,o){let a=e;return s.foreach((l,c)=>{const u=G(t,l);lu(e,N(u))&&(a=zo(n,a,u,c,i,r,o))}),s.foreach((l,c)=>{const u=G(t,l);lu(e,N(u))||(a=zo(n,a,u,c,i,r,o))}),a}function cu(n,e,t){return t.foreach((s,i)=>{e=e.updateChild(s,i)}),e}function $o(n,e,t,s,i,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;D(t)?c=s:c=new q(null).setTree(t,s);const u=e.serverCache.getNode();return c.children.inorderTraversal((h,d)=>{if(u.hasChild(h)){const f=e.serverCache.getNode().getImmediateChild(h),m=cu(n,f,d);l=Wi(n,l,new B(h),m,i,r,o,a)}}),c.children.inorderTraversal((h,d)=>{const f=!e.serverCache.isCompleteForChild(h)&&d.value===null;if(!u.hasChild(h)&&!f){const m=e.serverCache.getNode().getImmediateChild(h),v=cu(n,m,d);l=Wi(n,l,new B(h),v,i,r,o,a)}}),l}function zT(n,e,t,s,i,r,o){if(qi(i,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(s.value!=null){if(D(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return Wi(n,e,t,l.getNode().getChild(t),i,r,a,o);if(D(t)){let c=new q(null);return l.getNode().forEachChild(rn,(u,h)=>{c=c.set(new B(u),h)}),$o(n,e,t,c,i,r,a,o)}else return e}else{let c=new q(null);return s.foreach((u,h)=>{const d=G(t,u);l.isCompleteForPath(d)&&(c=c.set(u,l.getNode().getChild(d)))}),$o(n,e,t,c,i,r,a,o)}}function $T(n,e,t,s,i){const r=e.serverCache,o=Ff(e,r.getNode(),r.isFullyInitialized()||D(t),r.isFiltered());return $f(n,o,t,s,zf,i)}function GT(n,e,t,s,i,r){let o;if(qi(s,t)!=null)return e;{const a=new ml(s,e,i),l=e.eventCache.getNode();let c;if(D(t)||N(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Bi(s,Ft(e));else{const h=e.serverCache.getNode();g(h instanceof A,"serverChildren would be complete if leaf node"),u=_l(s,h)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=N(t);let h=pl(s,u,e.serverCache);h==null&&e.serverCache.isCompleteForChild(u)&&(h=l.getImmediateChild(u)),h!=null?c=n.filter.updateChild(l,u,h,W(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,A.EMPTY_NODE,W(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Bi(s,Ft(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||qi(s,M())!=null,es(e,c,o,n.filter.filtersNodes())}}/**
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
 */class HT{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const s=this.query_._queryParams,i=new cl(s.getIndex()),r=hT(s);this.processor_=UT(r);const o=t.serverCache,a=t.eventCache,l=i.updateFullNode(A.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(A.EMPTY_NODE,a.getNode(),null),u=new mt(l,o.isFullyInitialized(),i.filtersNodes()),h=new mt(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=Rr(h,u),this.eventGenerator_=new yT(this.query_)}get query(){return this.query_}}function KT(n){return n.viewCache_.serverCache.getNode()}function QT(n){return Ui(n.viewCache_)}function YT(n,e){const t=Ft(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!D(e)&&!t.getImmediateChild(N(e)).isEmpty())?t.getChild(e):null}function uu(n){return n.eventRegistrations_.length===0}function XT(n,e){n.eventRegistrations_.push(e)}function hu(n,e,t){const s=[];if(t){g(e==null,"A cancel should cancel all event registrations.");const i=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,i);o&&s.push(o)})}if(e){let i=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))i.push(o);else if(e.hasAnyCallback()){i=i.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=i}else n.eventRegistrations_=[];return s}function du(n,e,t,s){e.type===Oe.MERGE&&e.source.queryId!==null&&(g(Ft(n.viewCache_),"We should always have a full cache before handling merges"),g(Ui(n.viewCache_),"Missing event cache, even though we have a server cache"));const i=n.viewCache_,r=qT(n.processor_,i,e,t,s);return BT(n.processor_,r.viewCache),g(r.viewCache.serverCache.isFullyInitialized()||!i.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,Gf(n,r.changes,r.viewCache.eventCache.getNode(),null)}function JT(n,e){const t=n.viewCache_.eventCache,s=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(H,(r,o)=>{s.push(yn(r,o))}),t.isFullyInitialized()&&s.push(Of(t.getNode())),Gf(n,s,t.getNode(),e)}function Gf(n,e,t,s){const i=s?[s]:n.eventRegistrations_;return vT(n.eventGenerator_,e,t,i)}/**
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
 */let ji;class Hf{constructor(){this.views=new Map}}function ZT(n){g(!ji,"__referenceConstructor has already been defined"),ji=n}function eI(){return g(ji,"Reference.ts has not been loaded"),ji}function tI(n){return n.views.size===0}function gl(n,e,t,s){const i=e.source.queryId;if(i!==null){const r=n.views.get(i);return g(r!=null,"SyncTree gave us an op for an invalid query."),du(r,e,t,s)}else{let r=[];for(const o of n.views.values())r=r.concat(du(o,e,t,s));return r}}function Kf(n,e,t,s,i){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Bi(t,i?s:null),l=!1;a?l=!0:s instanceof A?(a=_l(t,s),l=!1):(a=A.EMPTY_NODE,l=!1);const c=Rr(new mt(a,l,!1),new mt(s,i,!1));return new HT(e,c)}return o}function nI(n,e,t,s,i,r){const o=Kf(n,e,s,i,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),XT(o,t),JT(o,t)}function sI(n,e,t,s){const i=e._queryIdentifier,r=[];let o=[];const a=gt(n);if(i==="default")for(const[l,c]of n.views.entries())o=o.concat(hu(c,t,s)),uu(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(i);l&&(o=o.concat(hu(l,t,s)),uu(l)&&(n.views.delete(i),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!gt(n)&&r.push(new(eI())(e._repo,e._path)),{removed:r,events:o}}function Qf(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ht(n,e){let t=null;for(const s of n.views.values())t=t||YT(s,e);return t}function Yf(n,e){if(e._queryParams.loadsAllData())return Pr(n);{const s=e._queryIdentifier;return n.views.get(s)}}function Xf(n,e){return Yf(n,e)!=null}function gt(n){return Pr(n)!=null}function Pr(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
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
 */let zi;function iI(n){g(!zi,"__referenceConstructor has already been defined"),zi=n}function rI(){return g(zi,"Reference.ts has not been loaded"),zi}let oI=1;class fu{constructor(e){this.listenProvider_=e,this.syncPointTree_=new q(null),this.pendingWriteTree_=MT(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function Jf(n,e,t,s,i){return wT(n.pendingWriteTree_,e,t,s,i),i?xn(n,new Lt(hl(),e,t)):[]}function aI(n,e,t,s){CT(n.pendingWriteTree_,e,t,s);const i=q.fromObject(t);return xn(n,new vn(hl(),e,i))}function rt(n,e,t=!1){const s=AT(n.pendingWriteTree_,e);if(RT(n.pendingWriteTree_,e)){let r=new q(null);return s.snap!=null?r=r.set(M(),!0):pe(s.children,o=>{r=r.set(new B(o),!0)}),xn(n,new Fi(s.path,r,t))}else return[]}function Ys(n,e,t){return xn(n,new Lt(dl(),e,t))}function lI(n,e,t){const s=q.fromObject(t);return xn(n,new vn(dl(),e,s))}function cI(n,e){return xn(n,new Rs(dl(),e))}function uI(n,e,t){const s=vl(n,t);if(s){const i=El(s),r=i.path,o=i.queryId,a=Ce(r,e),l=new Rs(fl(o),a);return Tl(n,r,l)}else return[]}function $i(n,e,t,s,i=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||Xf(o,e))){const l=sI(o,e,t,s);tI(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!i){const u=c.findIndex(d=>d._queryParams.loadsAllData())!==-1,h=n.syncPointTree_.findOnPath(r,(d,f)=>gt(f));if(u&&!h){const d=n.syncPointTree_.subtree(r);if(!d.isEmpty()){const f=fI(d);for(let m=0;m<f.length;++m){const v=f[m],E=v.query,O=n_(n,v);n.listenProvider_.startListening(ns(E),Ss(n,E),O.hashFn,O.onComplete)}}}!h&&c.length>0&&!s&&(u?n.listenProvider_.stopListening(ns(e),null):c.forEach(d=>{const f=n.queryToTagMap.get(Nr(d));n.listenProvider_.stopListening(ns(d),f)}))}_I(n,c)}return a}function Zf(n,e,t,s){const i=vl(n,s);if(i!=null){const r=El(i),o=r.path,a=r.queryId,l=Ce(o,e),c=new Lt(fl(a),l,t);return Tl(n,o,c)}else return[]}function hI(n,e,t,s){const i=vl(n,s);if(i){const r=El(i),o=r.path,a=r.queryId,l=Ce(o,e),c=q.fromObject(t),u=new vn(fl(a),l,c);return Tl(n,o,u)}else return[]}function Go(n,e,t,s=!1){const i=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(i,(d,f)=>{const m=Ce(d,i);r=r||ht(f,m),o=o||gt(f)});let a=n.syncPointTree_.get(i);a?(o=o||gt(a),r=r||ht(a,M())):(a=new Hf,n.syncPointTree_=n.syncPointTree_.set(i,a));let l;r!=null?l=!0:(l=!1,r=A.EMPTY_NODE,n.syncPointTree_.subtree(i).foreachChild((f,m)=>{const v=ht(m,M());v&&(r=r.updateImmediateChild(f,v))}));const c=Xf(a,e);if(!c&&!e._queryParams.loadsAllData()){const d=Nr(e);g(!n.queryToTagMap.has(d),"View does not exist, but we have a tag");const f=pI();n.queryToTagMap.set(d,f),n.tagToQueryMap.set(f,d)}const u=Sr(n.pendingWriteTree_,i);let h=nI(a,e,t,u,r,l);if(!c&&!o&&!s){const d=Yf(a,e);h=h.concat(mI(n,e,d))}return h}function yl(n,e,t){const i=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=Ce(o,e),c=ht(a,l);if(c)return c});return qf(i,e,r,t,!0)}function dI(n,e){const t=e._path;let s=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const h=Ce(c,t);s=s||ht(u,h)});let i=n.syncPointTree_.get(t);i?s=s||ht(i,M()):(i=new Hf,n.syncPointTree_=n.syncPointTree_.set(t,i));const r=s!=null,o=r?new mt(s,!0,!1):null,a=Sr(n.pendingWriteTree_,e._path),l=Kf(i,e,a,r?o.getNode():A.EMPTY_NODE,r);return QT(l)}function xn(n,e){return e_(e,n.syncPointTree_,null,Sr(n.pendingWriteTree_,M()))}function e_(n,e,t,s){if(D(n.path))return t_(n,e,t,s);{const i=e.get(M());t==null&&i!=null&&(t=ht(i,M()));let r=[];const o=N(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=Wf(s,o);r=r.concat(e_(a,l,c,u))}return i&&(r=r.concat(gl(i,n,s,t))),r}}function t_(n,e,t,s){const i=e.get(M());t==null&&i!=null&&(t=ht(i,M()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Wf(s,o),u=n.operationForChild(o);u&&(r=r.concat(t_(u,a,l,c)))}),i&&(r=r.concat(gl(i,n,s,t))),r}function n_(n,e){const t=e.query,s=Ss(n,t);return{hashFn:()=>(KT(e)||A.EMPTY_NODE).hash(),onComplete:i=>{if(i==="ok")return s?uI(n,t._path,s):cI(n,t._path);{const r=cE(i,t);return $i(n,t,null,r)}}}}function Ss(n,e){const t=Nr(e);return n.queryToTagMap.get(t)}function Nr(n){return n._path.toString()+"$"+n._queryIdentifier}function vl(n,e){return n.tagToQueryMap.get(e)}function El(n){const e=n.indexOf("$");return g(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new B(n.substr(0,e))}}function Tl(n,e,t){const s=n.syncPointTree_.get(e);g(s,"Missing sync point for query tag that we're tracking");const i=Sr(n.pendingWriteTree_,e);return gl(s,t,i,null)}function fI(n){return n.fold((e,t,s)=>{if(t&&gt(t))return[Pr(t)];{let i=[];return t&&(i=Qf(t)),pe(s,(r,o)=>{i=i.concat(o)}),i}})}function ns(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(rI())(n._repo,n._path):n}function _I(n,e){for(let t=0;t<e.length;++t){const s=e[t];if(!s._queryParams.loadsAllData()){const i=Nr(s),r=n.queryToTagMap.get(i);n.queryToTagMap.delete(i),n.tagToQueryMap.delete(r)}}}function pI(){return oI++}function mI(n,e,t){const s=e._path,i=Ss(n,e),r=n_(n,t),o=n.listenProvider_.startListening(ns(e),i,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(s);if(i)g(!gt(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,h)=>{if(!D(c)&&u&&gt(u))return[Pr(u).query];{let d=[];return u&&(d=d.concat(Qf(u).map(f=>f.query))),pe(h,(f,m)=>{d=d.concat(m)}),d}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(ns(u),Ss(n,u))}}return o}/**
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
 */class Il{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Il(t)}node(){return this.node_}}class wl{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=G(this.path_,e);return new wl(this.syncTree_,t)}node(){return yl(this.syncTree_,this.path_)}}const gI=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},_u=function(n,e,t){if(!n||typeof n!="object")return n;if(g(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return yI(n[".sv"],e,t);if(typeof n[".sv"]=="object")return vI(n[".sv"],e);g(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},yI=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:g(!1,"Unexpected server value: "+n)}},vI=function(n,e,t){n.hasOwnProperty("increment")||g(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const s=n.increment;typeof s!="number"&&g(!1,"Unexpected increment value: "+s);const i=e.node();if(g(i!==null&&typeof i<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!i.isLeafNode())return s;const o=i.getValue();return typeof o!="number"?s:o+s},s_=function(n,e,t,s){return Cl(e,new wl(t,n),s)},i_=function(n,e,t){return Cl(n,new Il(e),t)};function Cl(n,e,t){const s=n.getPriority().val(),i=_u(s,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=_u(o.getValue(),e,t);return a!==o.getValue()||i!==o.getPriority().val()?new ne(a,J(i)):n}else{const o=n;return r=o,i!==o.getPriority().val()&&(r=r.updatePriority(new ne(i))),o.forEachChild(H,(a,l)=>{const c=Cl(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
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
 */class Al{constructor(e="",t=null,s={children:{},childCount:0}){this.name=e,this.parent=t,this.node=s}}function Rl(n,e){let t=e instanceof B?e:new B(e),s=n,i=N(t);for(;i!==null;){const r=on(s.node.children,i)||{children:{},childCount:0};s=new Al(i,s,r),t=W(t),i=N(t)}return s}function Mn(n){return n.node.value}function r_(n,e){n.node.value=e,Ho(n)}function o_(n){return n.node.childCount>0}function EI(n){return Mn(n)===void 0&&!o_(n)}function br(n,e){pe(n.node.children,(t,s)=>{e(new Al(t,n,s))})}function a_(n,e,t,s){t&&!s&&e(n),br(n,i=>{a_(i,e,!0,s)}),t&&s&&e(n)}function TI(n,e,t){let s=t?n:n.parent;for(;s!==null;){if(e(s))return!0;s=s.parent}return!1}function Xs(n){return new B(n.parent===null?n.name:Xs(n.parent)+"/"+n.name)}function Ho(n){n.parent!==null&&II(n.parent,n.name,n)}function II(n,e,t){const s=EI(t),i=He(n.node.children,e);s&&i?(delete n.node.children[e],n.node.childCount--,Ho(n)):!s&&!i&&(n.node.children[e]=t.node,n.node.childCount++,Ho(n))}/**
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
 */const wI=/[\[\].#$\/\u0000-\u001F\u007F]/,CI=/[\[\].#$\u0000-\u001F\u007F]/,so=10*1024*1024,Sl=function(n){return typeof n=="string"&&n.length!==0&&!wI.test(n)},l_=function(n){return typeof n=="string"&&n.length!==0&&!CI.test(n)},AI=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),l_(n)},RI=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!el(n)||n&&typeof n=="object"&&He(n,".sv")},SI=function(n,e,t,s){s&&e===void 0||Dr(Hi(n,"value"),e,t)},Dr=function(n,e,t){const s=t instanceof B?new jE(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+It(s));if(typeof e=="function")throw new Error(n+"contains a function "+It(s)+" with contents = "+e.toString());if(el(e))throw new Error(n+"contains "+e.toString()+" "+It(s));if(typeof e=="string"&&e.length>so/3&&Ki(e)>so)throw new Error(n+"contains a string greater than "+so+" utf8 bytes "+It(s)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let i=!1,r=!1;if(pe(e,(o,a)=>{if(o===".value")i=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!Sl(o)))throw new Error(n+" contains an invalid key ("+o+") "+It(s)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);zE(s,o),Dr(n,a,s),$E(s)}),i&&r)throw new Error(n+' contains ".value" child '+It(s)+" in addition to actual children.")}},PI=function(n,e){let t,s;for(t=0;t<e.length;t++){s=e[t];const r=Is(s);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!Sl(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+s.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(WE);let i=null;for(t=0;t<e.length;t++){if(s=e[t],i!==null&&ke(i,s))throw new Error(n+"contains a path "+i.toString()+" that is ancestor of another path "+s.toString());i=s}},NI=function(n,e,t,s){if(s&&e===void 0)return;const i=Hi(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(i+" must be an object containing the children to replace.");const r=[];pe(e,(o,a)=>{const l=new B(o);if(Dr(i,a,G(t,l)),rl(l)===".priority"&&!RI(a))throw new Error(i+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),PI(i,r)},c_=function(n,e,t,s){if(!(s&&t===void 0)&&!l_(t))throw new Error(Hi(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},bI=function(n,e,t,s){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),c_(n,e,t,s)},u_=function(n,e){if(N(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},DI=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!Sl(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!AI(t))throw new Error(Hi(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
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
 */class kI{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function kr(n,e){let t=null;for(let s=0;s<e.length;s++){const i=e[s],r=i.getPath();t!==null&&!ol(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(i)}t&&n.eventLists_.push(t)}function h_(n,e,t){kr(n,t),d_(n,s=>ol(s,e))}function Ve(n,e,t){kr(n,t),d_(n,s=>ke(s,e)||ke(e,s))}function d_(n,e){n.recursionDepth_++;let t=!0;for(let s=0;s<n.eventLists_.length;s++){const i=n.eventLists_[s];if(i){const r=i.path;e(r)?(VI(n.eventLists_[s]),n.eventLists_[s]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function VI(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const s=t.getEventRunner();Nt&&ue("event: "+t.toString()),Vn(s)}}}/**
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
 */const xI="repo_interrupt",MI=25;class OI{constructor(e,t,s,i){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=s,this.appCheckProvider_=i,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new kI,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Li(),this.transactionQueueTree_=new Al,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function LI(n,e,t){if(n.stats_=sl(n.repoInfo_),n.forceRestClient_||fE())n.server_=new Oi(n.repoInfo_,(s,i,r,o)=>{pu(n,s,i,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>mu(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{Z(t)}catch(s){throw new Error("Invalid authOverride provided: "+s)}}n.persistentConnection_=new Je(n.repoInfo_,e,(s,i,r,o)=>{pu(n,s,i,r,o)},s=>{mu(n,s)},s=>{UI(n,s)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(s=>{n.server_.refreshAuthToken(s)}),n.appCheckProvider_.addTokenChangeListener(s=>{n.server_.refreshAppCheckToken(s.token)}),n.statsReporter_=yE(n.repoInfo_,()=>new gT(n.stats_,n.server_)),n.infoData_=new dT,n.infoSyncTree_=new fu({startListening:(s,i,r,o)=>{let a=[];const l=n.infoData_.getNode(s._path);return l.isEmpty()||(a=Ys(n.infoSyncTree_,s._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),Pl(n,"connected",!1),n.serverSyncTree_=new fu({startListening:(s,i,r,o)=>(n.server_.listen(s,r,i,(a,l)=>{const c=o(a,l);Ve(n.eventQueue_,s._path,c)}),[]),stopListening:(s,i)=>{n.server_.unlisten(s,i)}})}function FI(n){const t=n.infoData_.getNode(new B(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Vr(n){return gI({timestamp:FI(n)})}function pu(n,e,t,s,i){n.dataUpdateCount++;const r=new B(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(i)if(s){const l=mi(t,c=>J(c));o=hI(n.serverSyncTree_,r,l,i)}else{const l=J(t);o=Zf(n.serverSyncTree_,r,l,i)}else if(s){const l=mi(t,c=>J(c));o=lI(n.serverSyncTree_,r,l)}else{const l=J(t);o=Ys(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Tn(n,r)),Ve(n.eventQueue_,a,o)}function mu(n,e){Pl(n,"connected",e),e===!1&&jI(n)}function UI(n,e){pe(e,(t,s)=>{Pl(n,t,s)})}function Pl(n,e,t){const s=new B("/.info/"+e),i=J(t);n.infoData_.updateSnapshot(s,i);const r=Ys(n.infoSyncTree_,s,i);Ve(n.eventQueue_,s,r)}function Nl(n){return n.nextWriteId_++}function BI(n,e,t){const s=dI(n.serverSyncTree_,e);return s!=null?Promise.resolve(s):n.server_.get(e).then(i=>{const r=J(i).withIndex(e._queryParams.getIndex());Go(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=Ys(n.serverSyncTree_,e._path,r);else{const a=Ss(n.serverSyncTree_,e);o=Zf(n.serverSyncTree_,e._path,r,a)}return Ve(n.eventQueue_,e._path,o),$i(n.serverSyncTree_,e,t,null,!0),r},i=>(Js(n,"get for query "+Z(e)+" failed: "+i),Promise.reject(new Error(i))))}function qI(n,e,t,s,i){Js(n,"set",{path:e.toString(),value:t,priority:s});const r=Vr(n),o=J(t,s),a=yl(n.serverSyncTree_,e),l=i_(o,a,r),c=Nl(n),u=Jf(n.serverSyncTree_,e,l,c,!0);kr(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(d,f)=>{const m=d==="ok";m||Ae("set at "+e+" failed: "+d);const v=rt(n.serverSyncTree_,c,!m);Ve(n.eventQueue_,e,v),Ko(n,i,d,f)});const h=Dl(n,e);Tn(n,h),Ve(n.eventQueue_,h,[])}function WI(n,e,t,s){Js(n,"update",{path:e.toString(),value:t});let i=!0;const r=Vr(n),o={};if(pe(t,(a,l)=>{i=!1,o[a]=s_(G(e,a),J(l),n.serverSyncTree_,r)}),i)ue("update() called with empty data.  Don't do anything."),Ko(n,s,"ok",void 0);else{const a=Nl(n),l=aI(n.serverSyncTree_,e,o,a);kr(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,u)=>{const h=c==="ok";h||Ae("update at "+e+" failed: "+c);const d=rt(n.serverSyncTree_,a,!h),f=d.length>0?Tn(n,e):e;Ve(n.eventQueue_,f,d),Ko(n,s,c,u)}),pe(t,c=>{const u=Dl(n,G(e,c));Tn(n,u)}),Ve(n.eventQueue_,e,[])}}function jI(n){Js(n,"onDisconnectEvents");const e=Vr(n),t=Li();Bo(n.onDisconnect_,M(),(i,r)=>{const o=s_(i,r,n.serverSyncTree_,e);Lf(t,i,o)});let s=[];Bo(t,M(),(i,r)=>{s=s.concat(Ys(n.serverSyncTree_,i,r));const o=Dl(n,i);Tn(n,o)}),n.onDisconnect_=Li(),Ve(n.eventQueue_,M(),s)}function zI(n,e,t){let s;N(e._path)===".info"?s=Go(n.infoSyncTree_,e,t):s=Go(n.serverSyncTree_,e,t),h_(n.eventQueue_,e._path,s)}function gu(n,e,t){let s;N(e._path)===".info"?s=$i(n.infoSyncTree_,e,t):s=$i(n.serverSyncTree_,e,t),h_(n.eventQueue_,e._path,s)}function $I(n){n.persistentConnection_&&n.persistentConnection_.interrupt(xI)}function Js(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),ue(t,...e)}function Ko(n,e,t,s){e&&Vn(()=>{if(t==="ok")e(null);else{const i=(t||"error").toUpperCase();let r=i;s&&(r+=": "+s);const o=new Error(r);o.code=i,e(o)}})}function f_(n,e,t){return yl(n.serverSyncTree_,e,t)||A.EMPTY_NODE}function bl(n,e=n.transactionQueueTree_){if(e||xr(n,e),Mn(e)){const t=p_(n,e);g(t.length>0,"Sending zero length transaction queue"),t.every(i=>i.status===0)&&GI(n,Xs(e),t)}else o_(e)&&br(e,t=>{bl(n,t)})}function GI(n,e,t){const s=t.map(c=>c.currentWriteId),i=f_(n,e,s);let r=i;const o=i.hash();for(let c=0;c<t.length;c++){const u=t[c];g(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const h=Ce(e,u.path);r=r.updateChild(h,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{Js(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const h=[];for(let d=0;d<t.length;d++)t[d].status=2,u=u.concat(rt(n.serverSyncTree_,t[d].currentWriteId)),t[d].onComplete&&h.push(()=>t[d].onComplete(null,!0,t[d].currentOutputSnapshotResolved)),t[d].unwatcher();xr(n,Rl(n.transactionQueueTree_,e)),bl(n,n.transactionQueueTree_),Ve(n.eventQueue_,e,u);for(let d=0;d<h.length;d++)Vn(h[d])}else{if(c==="datastale")for(let h=0;h<t.length;h++)t[h].status===3?t[h].status=4:t[h].status=0;else{Ae("transaction at "+l.toString()+" failed: "+c);for(let h=0;h<t.length;h++)t[h].status=4,t[h].abortReason=c}Tn(n,e)}},o)}function Tn(n,e){const t=__(n,e),s=Xs(t),i=p_(n,t);return HI(n,i,s),s}function HI(n,e,t){if(e.length===0)return;const s=[];let i=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=Ce(t,l.path);let u=!1,h;if(g(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,h=l.abortReason,i=i.concat(rt(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=MI)u=!0,h="maxretry",i=i.concat(rt(n.serverSyncTree_,l.currentWriteId,!0));else{const d=f_(n,l.path,o);l.currentInputSnapshot=d;const f=e[a].update(d.val());if(f!==void 0){Dr("transaction failed: Data returned ",f,l.path);let m=J(f);typeof f=="object"&&f!=null&&He(f,".priority")||(m=m.updatePriority(d.getPriority()));const E=l.currentWriteId,O=Vr(n),$=i_(m,d,O);l.currentOutputSnapshotRaw=m,l.currentOutputSnapshotResolved=$,l.currentWriteId=Nl(n),o.splice(o.indexOf(E),1),i=i.concat(Jf(n.serverSyncTree_,l.path,$,l.currentWriteId,l.applyLocally)),i=i.concat(rt(n.serverSyncTree_,E,!0))}else u=!0,h="nodata",i=i.concat(rt(n.serverSyncTree_,l.currentWriteId,!0))}Ve(n.eventQueue_,t,i),i=[],u&&(e[a].status=2,function(d){setTimeout(d,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(h==="nodata"?s.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):s.push(()=>e[a].onComplete(new Error(h),!1,null))))}xr(n,n.transactionQueueTree_);for(let a=0;a<s.length;a++)Vn(s[a]);bl(n,n.transactionQueueTree_)}function __(n,e){let t,s=n.transactionQueueTree_;for(t=N(e);t!==null&&Mn(s)===void 0;)s=Rl(s,t),e=W(e),t=N(e);return s}function p_(n,e){const t=[];return m_(n,e,t),t.sort((s,i)=>s.order-i.order),t}function m_(n,e,t){const s=Mn(e);if(s)for(let i=0;i<s.length;i++)t.push(s[i]);br(e,i=>{m_(n,i,t)})}function xr(n,e){const t=Mn(e);if(t){let s=0;for(let i=0;i<t.length;i++)t[i].status!==2&&(t[s]=t[i],s++);t.length=s,r_(e,t.length>0?t:void 0)}br(e,s=>{xr(n,s)})}function Dl(n,e){const t=Xs(__(n,e)),s=Rl(n.transactionQueueTree_,e);return TI(s,i=>{io(n,i)}),io(n,s),a_(s,i=>{io(n,i)}),t}function io(n,e){const t=Mn(e);if(t){const s=[];let i=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(g(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(g(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),i=i.concat(rt(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&s.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?r_(e,void 0):t.length=r+1,Ve(n.eventQueue_,Xs(e),i);for(let o=0;o<s.length;o++)Vn(s[o])}}/**
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
 */function KI(n){let e="";const t=n.split("/");for(let s=0;s<t.length;s++)if(t[s].length>0){let i=t[s];try{i=decodeURIComponent(i.replace(/\+/g," "))}catch{}e+="/"+i}return e}function QI(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const s=t.split("=");s.length===2?e[decodeURIComponent(s[0])]=decodeURIComponent(s[1]):Ae(`Invalid query segment '${t}' in query '${n}'`)}return e}const yu=function(n,e){const t=YI(n),s=t.namespace;t.domain==="firebase.com"&&nt(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!s||s==="undefined")&&t.domain!=="localhost"&&nt("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||iE();const i=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Ef(t.host,t.secure,s,i,e,"",s!==t.subdomain),path:new B(t.pathString)}},YI=function(n){let e="",t="",s="",i="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let h=n.indexOf("?");h===-1&&(h=n.length),e=n.substring(0,Math.min(u,h)),u<h&&(i=KI(n.substring(u,h)));const d=QI(n.substring(Math.min(n.length,h)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const f=e.slice(0,c);if(f.toLowerCase()==="localhost")t="localhost";else if(f.split(".").length<=2)t=f;else{const m=e.indexOf(".");s=e.substring(0,m).toLowerCase(),t=e.substring(m+1),r=s}"ns"in d&&(r=d.ns)}return{host:e,port:l,domain:t,subdomain:s,secure:o,scheme:a,pathString:i,namespace:r}};/**
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
 */class g_{constructor(e,t,s,i){this.eventType=e,this.eventRegistration=t,this.snapshot=s,this.prevName=i}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+Z(this.snapshot.exportVal())}}class y_{constructor(e,t,s){this.eventRegistration=e,this.error=t,this.path=s}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
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
 */class v_{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return g(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
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
 */class kl{constructor(e,t,s,i){this._repo=e,this._path=t,this._queryParams=s,this._orderByCalled=i}get key(){return D(this._path)?null:rl(this._path)}get ref(){return new Ke(this._repo,this._path)}get _queryIdentifier(){const e=su(this._queryParams),t=tl(e);return t==="{}"?"default":t}get _queryObject(){return su(this._queryParams)}isEqual(e){if(e=_e(e),!(e instanceof kl))return!1;const t=this._repo===e._repo,s=ol(this._path,e._path),i=this._queryIdentifier===e._queryIdentifier;return t&&s&&i}toJSON(){return this.toString()}toString(){return this._repo.toString()+qE(this._path)}}class Ke extends kl{constructor(e,t){super(e,t,new ul,!1)}get parent(){const e=Nf(this._path);return e===null?null:new Ke(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class In{constructor(e,t,s){this._node=e,this.ref=t,this._index=s}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new B(e),s=Gi(this.ref,e);return new In(this._node.getChild(t),s,H)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(s,i)=>e(new In(i,Gi(this.ref,s),H)))}hasChild(e){const t=new B(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function kw(n,e){return n=_e(n),n._checkNotDeleted("ref"),e!==void 0?Gi(n._root,e):n._root}function Gi(n,e){return n=_e(n),N(n._path)===null?bI("child","path",e,!1):c_("child","path",e,!1),new Ke(n._repo,G(n._path,e))}function Vw(n){return u_("remove",n._path),XI(n,null)}function XI(n,e){n=_e(n),u_("set",n._path),SI("set",e,n._path,!1);const t=new Ps;return qI(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function xw(n,e){NI("update",e,n._path,!1);const t=new Ps;return WI(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Mw(n){n=_e(n);const e=new v_(()=>{}),t=new Mr(e);return BI(n._repo,n,t).then(s=>new In(s,new Ke(n._repo,n._path),n._queryParams.getIndex()))}class Mr{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const s=t._queryParams.getIndex();return new g_("value",this,new In(e.snapshotNode,new Ke(t._repo,t._path),s))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new y_(this,e,t):null}matches(e){return e instanceof Mr?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class Vl{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new y_(this,e,t):null}createEvent(e,t){g(e.childName!=null,"Child events should have a childName.");const s=Gi(new Ke(t._repo,t._path),e.childName),i=t._queryParams.getIndex();return new g_(e.type,this,new In(e.snapshotNode,s,i),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof Vl?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function JI(n,e,t,s,i){let r;if(typeof s=="object"&&(r=void 0,i=s),typeof s=="function"&&(r=s),i&&i.onlyOnce){const l=t,c=(u,h)=>{gu(n._repo,n,a),l(u,h)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new v_(t,r||void 0),a=e==="value"?new Mr(o):new Vl(e,o);return zI(n._repo,n,a),()=>gu(n._repo,n,a)}function Ow(n,e,t,s){return JI(n,"value",e,t,s)}ZT(Ke);iI(Ke);/**
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
 */const ZI="FIREBASE_DATABASE_EMULATOR_HOST",Qo={};let ew=!1;function tw(n,e,t,s){n.repoInfo_=new Ef(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),s&&(n.authTokenProvider_=s)}function nw(n,e,t,s,i){let r=s||n.options.databaseURL;r===void 0&&(n.options.projectId||nt("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),ue("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=yu(r,i),a=o.repoInfo,l,c;typeof process<"u"&&Uc&&(c=Uc[ZI]),c?(l=!0,r=`http://${c}?ns=${a.namespace}`,o=yu(r,i),a=o.repoInfo):l=!o.repoInfo.secure;const u=i&&l?new sn(sn.OWNER):new pE(n.name,n.options,e);DI("Invalid Firebase Database URL",o),D(o.path)||nt("Database URL must point to the root of a Firebase Database (not including a child path).");const h=iw(a,n,u,new _E(n.name,t));return new rw(h,n)}function sw(n,e){const t=Qo[e];(!t||t[n.key]!==n)&&nt(`Database ${e}(${n.repoInfo_}) has already been deleted.`),$I(n),delete t[n.key]}function iw(n,e,t,s){let i=Qo[e.name];i||(i={},Qo[e.name]=i);let r=i[n.toURLString()];return r&&nt("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new OI(n,ew,t,s),i[n.toURLString()]=r,r}class rw{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(LI(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new Ke(this._repo,M())),this._rootInternal}_delete(){return this._rootInternal!==null&&(sw(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&nt("Cannot call "+e+" on a deleted database.")}}function Lw(n=Mu(),e){const t=Vu(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const s=wu("database");s&&ow(t,...s)}return t}function ow(n,e,t,s={}){n=_e(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&nt("Cannot call useEmulator() after instance has already been initialized.");const i=n._repoInternal;let r;if(i.repoInfo_.nodeAdmin)s.mockUserToken&&nt('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new sn(sn.OWNER);else if(s.mockUserToken){const o=typeof s.mockUserToken=="string"?s.mockUserToken:Au(s.mockUserToken,n.app.options.projectId);r=new sn(o)}tw(i,e,t,r)}/**
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
 */function aw(n){Zv(xu),rs(new an("database",(e,{instanceIdentifier:t})=>{const s=e.getProvider("app").getImmediate(),i=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return nw(s,i,r,t)},"PUBLIC").setMultipleInstances(!0)),St(Bc,qc,n),St(Bc,qc,"esm2017")}function Fw(n){return{".sv":{increment:n}}}Je.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Je.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};aw();let Uw=T_();export{Su as A,D_ as B,an as C,hw as D,_e as E,Nu as F,fw as G,Ru as H,Vu as I,b_ as J,Jo as K,x as L,Cn as M,oo as N,U_ as O,ro as P,dw as Q,Ol as R,xu as S,te as T,rs as _,Mu as a,Uw as b,Lw as c,kw as d,Mw as e,Vw as f,_w as g,Fw as h,Bp as i,Tw as j,vw as k,Ew as l,Iw as m,ww as n,Ow as o,Rw as p,Sw as q,St as r,XI as s,bw as t,xw as u,Nw as v,Dw as w,Pw as x,Cw as y,uw as z};
