import{w as fu}from"./entry.dT7oCYI-.js";import{_ as mu,C as gu,r as Ws,F as pu,g as ct,a as _u,b as yu,c as Eu,L as Rt,d as Tu,S as vu,e as Iu}from"./google.o7afagPn.js";var wu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},p,Xr=Xr||{},w=wu||self;function Un(n){var t=typeof n;return t=t!="object"?t:n?Array.isArray(n)?"array":t:"null",t=="array"||t=="object"&&typeof n.length=="number"}function $e(n){var t=typeof n;return t=="object"&&n!=null||t=="function"}function Au(n){return Object.prototype.hasOwnProperty.call(n,pr)&&n[pr]||(n[pr]=++Ru)}var pr="closure_uid_"+(1e9*Math.random()>>>0),Ru=0;function Pu(n,t,e){return n.call.apply(n.bind,arguments)}function Vu(n,t,e){if(!n)throw Error();if(2<arguments.length){var r=Array.prototype.slice.call(arguments,2);return function(){var s=Array.prototype.slice.call(arguments);return Array.prototype.unshift.apply(s,r),n.apply(t,s)}}return function(){return n.apply(t,arguments)}}function tt(n,t,e){return Function.prototype.bind&&Function.prototype.bind.toString().indexOf("native code")!=-1?tt=Pu:tt=Vu,tt.apply(null,arguments)}function dn(n,t){var e=Array.prototype.slice.call(arguments,1);return function(){var r=e.slice();return r.push.apply(r,arguments),n.apply(this,r)}}function G(n,t){function e(){}e.prototype=t.prototype,n.$=t.prototype,n.prototype=new e,n.prototype.constructor=n,n.ac=function(r,s,i){for(var o=Array(arguments.length-2),a=2;a<arguments.length;a++)o[a-2]=arguments[a];return t.prototype[s].apply(r,o)}}function xt(){this.s=this.s,this.o=this.o}var Su=0;xt.prototype.s=!1;xt.prototype.sa=function(){!this.s&&(this.s=!0,this.N(),Su!=0)&&Au(this)};xt.prototype.N=function(){if(this.o)for(;this.o.length;)this.o.shift()()};const zi=Array.prototype.indexOf?function(n,t){return Array.prototype.indexOf.call(n,t,void 0)}:function(n,t){if(typeof n=="string")return typeof t!="string"||t.length!=1?-1:n.indexOf(t,0);for(let e=0;e<n.length;e++)if(e in n&&n[e]===t)return e;return-1};function Yr(n){const t=n.length;if(0<t){const e=Array(t);for(let r=0;r<t;r++)e[r]=n[r];return e}return[]}function Hs(n,t){for(let e=1;e<arguments.length;e++){const r=arguments[e];if(Un(r)){const s=n.length||0,i=r.length||0;n.length=s+i;for(let o=0;o<i;o++)n[s+o]=r[o]}else n.push(r)}}function et(n,t){this.type=n,this.g=this.target=t,this.defaultPrevented=!1}et.prototype.h=function(){this.defaultPrevented=!0};var Cu=function(){if(!w.addEventListener||!Object.defineProperty)return!1;var n=!1,t=Object.defineProperty({},"passive",{get:function(){n=!0}});try{const e=()=>{};w.addEventListener("test",e,t),w.removeEventListener("test",e,t)}catch{}return n}();function Ce(n){return/^[\s\xa0]*$/.test(n)}function qn(){var n=w.navigator;return n&&(n=n.userAgent)?n:""}function ft(n){return qn().indexOf(n)!=-1}function Jr(n){return Jr[" "](n),n}Jr[" "]=function(){};function Du(n,t){var e=Il;return Object.prototype.hasOwnProperty.call(e,n)?e[n]:e[n]=t(n)}var ku=ft("Opera"),re=ft("Trident")||ft("MSIE"),Gi=ft("Edge"),Vr=Gi||re,$i=ft("Gecko")&&!(qn().toLowerCase().indexOf("webkit")!=-1&&!ft("Edge"))&&!(ft("Trident")||ft("MSIE"))&&!ft("Edge"),Nu=qn().toLowerCase().indexOf("webkit")!=-1&&!ft("Edge");function Ki(){var n=w.document;return n?n.documentMode:void 0}var Sr;t:{var _r="",yr=function(){var n=qn();if($i)return/rv:([^\);]+)(\)|;)/.exec(n);if(Gi)return/Edge\/([\d\.]+)/.exec(n);if(re)return/\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/.exec(n);if(Nu)return/WebKit\/(\S+)/.exec(n);if(ku)return/(?:Version)[ \/]?(\S+)/.exec(n)}();if(yr&&(_r=yr?yr[1]:""),re){var Er=Ki();if(Er!=null&&Er>parseFloat(_r)){Sr=String(Er);break t}}Sr=_r}var Cr;if(w.document&&re){var Xs=Ki();Cr=Xs||parseInt(Sr,10)||void 0}else Cr=void 0;var xu=Cr;function De(n,t){if(et.call(this,n?n.type:""),this.relatedTarget=this.g=this.target=null,this.button=this.screenY=this.screenX=this.clientY=this.clientX=0,this.key="",this.metaKey=this.shiftKey=this.altKey=this.ctrlKey=!1,this.state=null,this.pointerId=0,this.pointerType="",this.i=null,n){var e=this.type=n.type,r=n.changedTouches&&n.changedTouches.length?n.changedTouches[0]:null;if(this.target=n.target||n.srcElement,this.g=t,t=n.relatedTarget){if($i){t:{try{Jr(t.nodeName);var s=!0;break t}catch{}s=!1}s||(t=null)}}else e=="mouseover"?t=n.fromElement:e=="mouseout"&&(t=n.toElement);this.relatedTarget=t,r?(this.clientX=r.clientX!==void 0?r.clientX:r.pageX,this.clientY=r.clientY!==void 0?r.clientY:r.pageY,this.screenX=r.screenX||0,this.screenY=r.screenY||0):(this.clientX=n.clientX!==void 0?n.clientX:n.pageX,this.clientY=n.clientY!==void 0?n.clientY:n.pageY,this.screenX=n.screenX||0,this.screenY=n.screenY||0),this.button=n.button,this.key=n.key||"",this.ctrlKey=n.ctrlKey,this.altKey=n.altKey,this.shiftKey=n.shiftKey,this.metaKey=n.metaKey,this.pointerId=n.pointerId||0,this.pointerType=typeof n.pointerType=="string"?n.pointerType:Mu[n.pointerType]||"",this.state=n.state,this.i=n,n.defaultPrevented&&De.$.h.call(this)}}G(De,et);var Mu={2:"touch",3:"pen",4:"mouse"};De.prototype.h=function(){De.$.h.call(this);var n=this.i;n.preventDefault?n.preventDefault():n.returnValue=!1};var Ke="closure_listenable_"+(1e6*Math.random()|0),Ou=0;function Fu(n,t,e,r,s){this.listener=n,this.proxy=null,this.src=t,this.type=e,this.capture=!!r,this.la=s,this.key=++Ou,this.fa=this.ia=!1}function Bn(n){n.fa=!0,n.listener=null,n.proxy=null,n.src=null,n.la=null}function Zr(n,t,e){for(const r in n)t.call(e,n[r],r,n)}function Lu(n,t){for(const e in n)t.call(void 0,n[e],e,n)}function Qi(n){const t={};for(const e in n)t[e]=n[e];return t}const Ys="constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");function Wi(n,t){let e,r;for(let s=1;s<arguments.length;s++){r=arguments[s];for(e in r)n[e]=r[e];for(let i=0;i<Ys.length;i++)e=Ys[i],Object.prototype.hasOwnProperty.call(r,e)&&(n[e]=r[e])}}function jn(n){this.src=n,this.g={},this.h=0}jn.prototype.add=function(n,t,e,r,s){var i=n.toString();n=this.g[i],n||(n=this.g[i]=[],this.h++);var o=kr(n,t,r,s);return-1<o?(t=n[o],e||(t.ia=!1)):(t=new Fu(t,this.src,i,!!r,s),t.ia=e,n.push(t)),t};function Dr(n,t){var e=t.type;if(e in n.g){var r=n.g[e],s=zi(r,t),i;(i=0<=s)&&Array.prototype.splice.call(r,s,1),i&&(Bn(t),n.g[e].length==0&&(delete n.g[e],n.h--))}}function kr(n,t,e,r){for(var s=0;s<n.length;++s){var i=n[s];if(!i.fa&&i.listener==t&&i.capture==!!e&&i.la==r)return s}return-1}var ts="closure_lm_"+(1e6*Math.random()|0),Tr={};function Hi(n,t,e,r,s){if(r&&r.once)return Yi(n,t,e,r,s);if(Array.isArray(t)){for(var i=0;i<t.length;i++)Hi(n,t[i],e,r,s);return null}return e=rs(e),n&&n[Ke]?n.O(t,e,$e(r)?!!r.capture:!!r,s):Xi(n,t,e,!1,r,s)}function Xi(n,t,e,r,s,i){if(!t)throw Error("Invalid event type");var o=$e(s)?!!s.capture:!!s,a=ns(n);if(a||(n[ts]=a=new jn(n)),e=a.add(t,e,r,o,i),e.proxy)return e;if(r=bu(),e.proxy=r,r.src=n,r.listener=e,n.addEventListener)Cu||(s=o),s===void 0&&(s=!1),n.addEventListener(t.toString(),r,s);else if(n.attachEvent)n.attachEvent(Zi(t.toString()),r);else if(n.addListener&&n.removeListener)n.addListener(r);else throw Error("addEventListener and attachEvent are unavailable.");return e}function bu(){function n(e){return t.call(n.src,n.listener,e)}const t=Uu;return n}function Yi(n,t,e,r,s){if(Array.isArray(t)){for(var i=0;i<t.length;i++)Yi(n,t[i],e,r,s);return null}return e=rs(e),n&&n[Ke]?n.P(t,e,$e(r)?!!r.capture:!!r,s):Xi(n,t,e,!0,r,s)}function Ji(n,t,e,r,s){if(Array.isArray(t))for(var i=0;i<t.length;i++)Ji(n,t[i],e,r,s);else r=$e(r)?!!r.capture:!!r,e=rs(e),n&&n[Ke]?(n=n.i,t=String(t).toString(),t in n.g&&(i=n.g[t],e=kr(i,e,r,s),-1<e&&(Bn(i[e]),Array.prototype.splice.call(i,e,1),i.length==0&&(delete n.g[t],n.h--)))):n&&(n=ns(n))&&(t=n.g[t.toString()],n=-1,t&&(n=kr(t,e,r,s)),(e=-1<n?t[n]:null)&&es(e))}function es(n){if(typeof n!="number"&&n&&!n.fa){var t=n.src;if(t&&t[Ke])Dr(t.i,n);else{var e=n.type,r=n.proxy;t.removeEventListener?t.removeEventListener(e,r,n.capture):t.detachEvent?t.detachEvent(Zi(e),r):t.addListener&&t.removeListener&&t.removeListener(r),(e=ns(t))?(Dr(e,n),e.h==0&&(e.src=null,t[ts]=null)):Bn(n)}}}function Zi(n){return n in Tr?Tr[n]:Tr[n]="on"+n}function Uu(n,t){if(n.fa)n=!0;else{t=new De(t,this);var e=n.listener,r=n.la||n.src;n.ia&&es(n),n=e.call(r,t)}return n}function ns(n){return n=n[ts],n instanceof jn?n:null}var vr="__closure_events_fn_"+(1e9*Math.random()>>>0);function rs(n){return typeof n=="function"?n:(n[vr]||(n[vr]=function(t){return n.handleEvent(t)}),n[vr])}function z(){xt.call(this),this.i=new jn(this),this.S=this,this.J=null}G(z,xt);z.prototype[Ke]=!0;z.prototype.removeEventListener=function(n,t,e,r){Ji(this,n,t,e,r)};function H(n,t){var e,r=n.J;if(r)for(e=[];r;r=r.J)e.push(r);if(n=n.S,r=t.type||t,typeof t=="string")t=new et(t,n);else if(t instanceof et)t.target=t.target||n;else{var s=t;t=new et(r,n),Wi(t,s)}if(s=!0,e)for(var i=e.length-1;0<=i;i--){var o=t.g=e[i];s=fn(o,r,!0,t)&&s}if(o=t.g=n,s=fn(o,r,!0,t)&&s,s=fn(o,r,!1,t)&&s,e)for(i=0;i<e.length;i++)o=t.g=e[i],s=fn(o,r,!1,t)&&s}z.prototype.N=function(){if(z.$.N.call(this),this.i){var n=this.i,t;for(t in n.g){for(var e=n.g[t],r=0;r<e.length;r++)Bn(e[r]);delete n.g[t],n.h--}}this.J=null};z.prototype.O=function(n,t,e,r){return this.i.add(String(n),t,!1,e,r)};z.prototype.P=function(n,t,e,r){return this.i.add(String(n),t,!0,e,r)};function fn(n,t,e,r){if(t=n.i.g[String(t)],!t)return!0;t=t.concat();for(var s=!0,i=0;i<t.length;++i){var o=t[i];if(o&&!o.fa&&o.capture==e){var a=o.listener,u=o.la||o.src;o.ia&&Dr(n.i,o),s=a.call(u,r)!==!1&&s}}return s&&!r.defaultPrevented}var ss=w.JSON.stringify;class qu{constructor(t,e){this.i=t,this.j=e,this.h=0,this.g=null}get(){let t;return 0<this.h?(this.h--,t=this.g,this.g=t.next,t.next=null):t=this.i(),t}}function Bu(){var n=is;let t=null;return n.g&&(t=n.g,n.g=n.g.next,n.g||(n.h=null),t.next=null),t}class ju{constructor(){this.h=this.g=null}add(t,e){const r=to.get();r.set(t,e),this.h?this.h.next=r:this.g=r,this.h=r}}var to=new qu(()=>new zu,n=>n.reset());class zu{constructor(){this.next=this.g=this.h=null}set(t,e){this.h=t,this.g=e,this.next=null}reset(){this.next=this.g=this.h=null}}function Gu(n){var t=1;n=n.split(":");const e=[];for(;0<t&&n.length;)e.push(n.shift()),t--;return n.length&&e.push(n.join(":")),e}function $u(n){w.setTimeout(()=>{throw n},0)}let ke,Ne=!1,is=new ju,eo=()=>{const n=w.Promise.resolve(void 0);ke=()=>{n.then(Ku)}};var Ku=()=>{for(var n;n=Bu();){try{n.h.call(n.g)}catch(e){$u(e)}var t=to;t.j(n),100>t.h&&(t.h++,n.next=t.g,t.g=n)}Ne=!1};function zn(n,t){z.call(this),this.h=n||1,this.g=t||w,this.j=tt(this.qb,this),this.l=Date.now()}G(zn,z);p=zn.prototype;p.ga=!1;p.T=null;p.qb=function(){if(this.ga){var n=Date.now()-this.l;0<n&&n<.8*this.h?this.T=this.g.setTimeout(this.j,this.h-n):(this.T&&(this.g.clearTimeout(this.T),this.T=null),H(this,"tick"),this.ga&&(os(this),this.start()))}};p.start=function(){this.ga=!0,this.T||(this.T=this.g.setTimeout(this.j,this.h),this.l=Date.now())};function os(n){n.ga=!1,n.T&&(n.g.clearTimeout(n.T),n.T=null)}p.N=function(){zn.$.N.call(this),os(this),delete this.g};function as(n,t,e){if(typeof n=="function")e&&(n=tt(n,e));else if(n&&typeof n.handleEvent=="function")n=tt(n.handleEvent,n);else throw Error("Invalid listener argument");return 2147483647<Number(t)?-1:w.setTimeout(n,t||0)}function no(n){n.g=as(()=>{n.g=null,n.i&&(n.i=!1,no(n))},n.j);const t=n.h;n.h=null,n.m.apply(null,t)}class Qu extends xt{constructor(t,e){super(),this.m=t,this.j=e,this.h=null,this.i=!1,this.g=null}l(t){this.h=arguments,this.g?this.i=!0:no(this)}N(){super.N(),this.g&&(w.clearTimeout(this.g),this.g=null,this.i=!1,this.h=null)}}function xe(n){xt.call(this),this.h=n,this.g={}}G(xe,xt);var Js=[];function ro(n,t,e,r){Array.isArray(e)||(e&&(Js[0]=e.toString()),e=Js);for(var s=0;s<e.length;s++){var i=Hi(t,e[s],r||n.handleEvent,!1,n.h||n);if(!i)break;n.g[i.key]=i}}function so(n){Zr(n.g,function(t,e){this.g.hasOwnProperty(e)&&es(t)},n),n.g={}}xe.prototype.N=function(){xe.$.N.call(this),so(this)};xe.prototype.handleEvent=function(){throw Error("EventHandler.handleEvent not implemented")};function Gn(){this.g=!0}Gn.prototype.Ea=function(){this.g=!1};function Wu(n,t,e,r,s,i){n.info(function(){if(n.g)if(i)for(var o="",a=i.split("&"),u=0;u<a.length;u++){var l=a[u].split("=");if(1<l.length){var h=l[0];l=l[1];var c=h.split("_");o=2<=c.length&&c[1]=="type"?o+(h+"="+l+"&"):o+(h+"=redacted&")}}else o=null;else o=i;return"XMLHTTP REQ ("+r+") [attempt "+s+"]: "+t+`
`+e+`
`+o})}function Hu(n,t,e,r,s,i,o){n.info(function(){return"XMLHTTP RESP ("+r+") [ attempt "+s+"]: "+t+`
`+e+`
`+i+" "+o})}function Jt(n,t,e,r){n.info(function(){return"XMLHTTP TEXT ("+t+"): "+Yu(n,e)+(r?" "+r:"")})}function Xu(n,t){n.info(function(){return"TIMEOUT: "+t})}Gn.prototype.info=function(){};function Yu(n,t){if(!n.g)return t;if(!t)return null;try{var e=JSON.parse(t);if(e){for(n=0;n<e.length;n++)if(Array.isArray(e[n])){var r=e[n];if(!(2>r.length)){var s=r[1];if(Array.isArray(s)&&!(1>s.length)){var i=s[0];if(i!="noop"&&i!="stop"&&i!="close")for(var o=1;o<s.length;o++)s[o]=""}}}}return ss(e)}catch{return t}}var Gt={},Zs=null;function $n(){return Zs=Zs||new z}Gt.Ta="serverreachability";function io(n){et.call(this,Gt.Ta,n)}G(io,et);function Me(n){const t=$n();H(t,new io(t))}Gt.STAT_EVENT="statevent";function oo(n,t){et.call(this,Gt.STAT_EVENT,n),this.stat=t}G(oo,et);function st(n){const t=$n();H(t,new oo(t,n))}Gt.Ua="timingevent";function ao(n,t){et.call(this,Gt.Ua,n),this.size=t}G(ao,et);function Qe(n,t){if(typeof n!="function")throw Error("Fn must not be null and must be a function");return w.setTimeout(function(){n()},t)}var Kn={NO_ERROR:0,rb:1,Eb:2,Db:3,yb:4,Cb:5,Fb:6,Qa:7,TIMEOUT:8,Ib:9},uo={wb:"complete",Sb:"success",Ra:"error",Qa:"abort",Kb:"ready",Lb:"readystatechange",TIMEOUT:"timeout",Gb:"incrementaldata",Jb:"progress",zb:"downloadprogress",$b:"uploadprogress"};function us(){}us.prototype.h=null;function ti(n){return n.h||(n.h=n.i())}function lo(){}var We={OPEN:"a",vb:"b",Ra:"c",Hb:"d"};function ls(){et.call(this,"d")}G(ls,et);function hs(){et.call(this,"c")}G(hs,et);var Nr;function Qn(){}G(Qn,us);Qn.prototype.g=function(){return new XMLHttpRequest};Qn.prototype.i=function(){return{}};Nr=new Qn;function He(n,t,e,r){this.l=n,this.j=t,this.m=e,this.W=r||1,this.U=new xe(this),this.P=Ju,n=Vr?125:void 0,this.V=new zn(n),this.I=null,this.i=!1,this.u=this.B=this.A=this.L=this.G=this.Y=this.C=null,this.F=[],this.g=null,this.o=0,this.s=this.v=null,this.ca=-1,this.J=!1,this.O=0,this.M=null,this.ba=this.K=this.aa=this.S=!1,this.h=new ho}function ho(){this.i=null,this.g="",this.h=!1}var Ju=45e3,co={},xr={};p=He.prototype;p.setTimeout=function(n){this.P=n};function Mr(n,t,e){n.L=1,n.A=Hn(It(t)),n.u=e,n.S=!0,fo(n,null)}function fo(n,t){n.G=Date.now(),Xe(n),n.B=It(n.A);var e=n.B,r=n.W;Array.isArray(r)||(r=[String(r)]),vo(e.i,"t",r),n.o=0,e=n.l.J,n.h=new ho,n.g=jo(n.l,e?t:null,!n.u),0<n.O&&(n.M=new Qu(tt(n.Pa,n,n.g),n.O)),ro(n.U,n.g,"readystatechange",n.nb),t=n.I?Qi(n.I):{},n.u?(n.v||(n.v="POST"),t["Content-Type"]="application/x-www-form-urlencoded",n.g.ha(n.B,n.v,n.u,t)):(n.v="GET",n.g.ha(n.B,n.v,null,t)),Me(),Wu(n.j,n.v,n.B,n.m,n.W,n.u)}p.nb=function(n){n=n.target;const t=this.M;t&&mt(n)==3?t.l():this.Pa(n)};p.Pa=function(n){try{if(n==this.g)t:{const h=mt(this.g);var t=this.g.Ia();const c=this.g.da();if(!(3>h)&&(h!=3||Vr||this.g&&(this.h.h||this.g.ja()||si(this.g)))){this.J||h!=4||t==7||(t==8||0>=c?Me(3):Me(2)),Wn(this);var e=this.g.da();this.ca=e;e:if(mo(this)){var r=si(this.g);n="";var s=r.length,i=mt(this.g)==4;if(!this.h.i){if(typeof TextDecoder>"u"){Ft(this),we(this);var o="";break e}this.h.i=new w.TextDecoder}for(t=0;t<s;t++)this.h.h=!0,n+=this.h.i.decode(r[t],{stream:i&&t==s-1});r.length=0,this.h.g+=n,this.o=0,o=this.h.g}else o=this.g.ja();if(this.i=e==200,Hu(this.j,this.v,this.B,this.m,this.W,h,e),this.i){if(this.aa&&!this.K){e:{if(this.g){var a,u=this.g;if((a=u.g?u.g.getResponseHeader("X-HTTP-Initial-Response"):null)&&!Ce(a)){var l=a;break e}}l=null}if(e=l)Jt(this.j,this.m,e,"Initial handshake response via X-HTTP-Initial-Response"),this.K=!0,Or(this,e);else{this.i=!1,this.s=3,st(12),Ft(this),we(this);break t}}this.S?(go(this,h,o),Vr&&this.i&&h==3&&(ro(this.U,this.V,"tick",this.mb),this.V.start())):(Jt(this.j,this.m,o,null),Or(this,o)),h==4&&Ft(this),this.i&&!this.J&&(h==4?bo(this.l,this):(this.i=!1,Xe(this)))}else El(this.g),e==400&&0<o.indexOf("Unknown SID")?(this.s=3,st(12)):(this.s=0,st(13)),Ft(this),we(this)}}}catch{}finally{}};function mo(n){return n.g?n.v=="GET"&&n.L!=2&&n.l.Ha:!1}function go(n,t,e){let r=!0,s;for(;!n.J&&n.o<e.length;)if(s=Zu(n,e),s==xr){t==4&&(n.s=4,st(14),r=!1),Jt(n.j,n.m,null,"[Incomplete Response]");break}else if(s==co){n.s=4,st(15),Jt(n.j,n.m,e,"[Invalid Chunk]"),r=!1;break}else Jt(n.j,n.m,s,null),Or(n,s);mo(n)&&n.o!=0&&(n.h.g=n.h.g.slice(n.o),n.o=0),t!=4||e.length!=0||n.h.h||(n.s=1,st(16),r=!1),n.i=n.i&&r,r?0<e.length&&!n.ba&&(n.ba=!0,t=n.l,t.g==n&&t.ca&&!t.M&&(t.l.info("Great, no buffering proxy detected. Bytes received: "+e.length),ps(t),t.M=!0,st(11))):(Jt(n.j,n.m,e,"[Invalid Chunked Response]"),Ft(n),we(n))}p.mb=function(){if(this.g){var n=mt(this.g),t=this.g.ja();this.o<t.length&&(Wn(this),go(this,n,t),this.i&&n!=4&&Xe(this))}};function Zu(n,t){var e=n.o,r=t.indexOf(`
`,e);return r==-1?xr:(e=Number(t.substring(e,r)),isNaN(e)?co:(r+=1,r+e>t.length?xr:(t=t.slice(r,r+e),n.o=r+e,t)))}p.cancel=function(){this.J=!0,Ft(this)};function Xe(n){n.Y=Date.now()+n.P,po(n,n.P)}function po(n,t){if(n.C!=null)throw Error("WatchDog timer not null");n.C=Qe(tt(n.lb,n),t)}function Wn(n){n.C&&(w.clearTimeout(n.C),n.C=null)}p.lb=function(){this.C=null;const n=Date.now();0<=n-this.Y?(Xu(this.j,this.B),this.L!=2&&(Me(),st(17)),Ft(this),this.s=2,we(this)):po(this,this.Y-n)};function we(n){n.l.H==0||n.J||bo(n.l,n)}function Ft(n){Wn(n);var t=n.M;t&&typeof t.sa=="function"&&t.sa(),n.M=null,os(n.V),so(n.U),n.g&&(t=n.g,n.g=null,t.abort(),t.sa())}function Or(n,t){try{var e=n.l;if(e.H!=0&&(e.g==n||Fr(e.i,n))){if(!n.K&&Fr(e.i,n)&&e.H==3){try{var r=e.Ja.g.parse(t)}catch{r=null}if(Array.isArray(r)&&r.length==3){var s=r;if(s[0]==0){t:if(!e.u){if(e.g)if(e.g.G+3e3<n.G)Pn(e),Zn(e);else break t;gs(e),st(18)}}else e.Fa=s[1],0<e.Fa-e.V&&37500>s[2]&&e.G&&e.A==0&&!e.v&&(e.v=Qe(tt(e.ib,e),6e3));if(1>=Ao(e.i)&&e.oa){try{e.oa()}catch{}e.oa=void 0}}else Lt(e,11)}else if((n.K||e.g==n)&&Pn(e),!Ce(t))for(s=e.Ja.g.parse(t),t=0;t<s.length;t++){let l=s[t];if(e.V=l[0],l=l[1],e.H==2)if(l[0]=="c"){e.K=l[1],e.pa=l[2];const h=l[3];h!=null&&(e.ra=h,e.l.info("VER="+e.ra));const c=l[4];c!=null&&(e.Ga=c,e.l.info("SVER="+e.Ga));const d=l[5];d!=null&&typeof d=="number"&&0<d&&(r=1.5*d,e.L=r,e.l.info("backChannelRequestTimeoutMs_="+r)),r=e;const g=n.g;if(g){const R=g.g?g.g.getResponseHeader("X-Client-Wire-Protocol"):null;if(R){var i=r.i;i.g||R.indexOf("spdy")==-1&&R.indexOf("quic")==-1&&R.indexOf("h2")==-1||(i.j=i.l,i.g=new Set,i.h&&(cs(i,i.h),i.h=null))}if(r.F){const P=g.g?g.g.getResponseHeader("X-HTTP-Session-Id"):null;P&&(r.Da=P,N(r.I,r.F,P))}}e.H=3,e.h&&e.h.Ba(),e.ca&&(e.S=Date.now()-n.G,e.l.info("Handshake RTT: "+e.S+"ms")),r=e;var o=n;if(r.wa=Bo(r,r.J?r.pa:null,r.Y),o.K){Ro(r.i,o);var a=o,u=r.L;u&&a.setTimeout(u),a.C&&(Wn(a),Xe(a)),r.g=o}else Fo(r);0<e.j.length&&tr(e)}else l[0]!="stop"&&l[0]!="close"||Lt(e,7);else e.H==3&&(l[0]=="stop"||l[0]=="close"?l[0]=="stop"?Lt(e,7):ms(e):l[0]!="noop"&&e.h&&e.h.Aa(l),e.A=0)}}Me(4)}catch{}}function tl(n){if(n.Z&&typeof n.Z=="function")return n.Z();if(typeof Map<"u"&&n instanceof Map||typeof Set<"u"&&n instanceof Set)return Array.from(n.values());if(typeof n=="string")return n.split("");if(Un(n)){for(var t=[],e=n.length,r=0;r<e;r++)t.push(n[r]);return t}t=[],e=0;for(r in n)t[e++]=n[r];return t}function el(n){if(n.ta&&typeof n.ta=="function")return n.ta();if(!n.Z||typeof n.Z!="function"){if(typeof Map<"u"&&n instanceof Map)return Array.from(n.keys());if(!(typeof Set<"u"&&n instanceof Set)){if(Un(n)||typeof n=="string"){var t=[];n=n.length;for(var e=0;e<n;e++)t.push(e);return t}t=[],e=0;for(const r in n)t[e++]=r;return t}}}function _o(n,t){if(n.forEach&&typeof n.forEach=="function")n.forEach(t,void 0);else if(Un(n)||typeof n=="string")Array.prototype.forEach.call(n,t,void 0);else for(var e=el(n),r=tl(n),s=r.length,i=0;i<s;i++)t.call(void 0,r[i],e&&e[i],n)}var yo=RegExp("^(?:([^:/?#.]+):)?(?://(?:([^\\\\/?#]*)@)?([^\\\\/?#]*?)(?::([0-9]+))?(?=[\\\\/?#]|$))?([^?#]+)?(?:\\?([^#]*))?(?:#([\\s\\S]*))?$");function nl(n,t){if(n){n=n.split("&");for(var e=0;e<n.length;e++){var r=n[e].indexOf("="),s=null;if(0<=r){var i=n[e].substring(0,r);s=n[e].substring(r+1)}else i=n[e];t(i,s?decodeURIComponent(s.replace(/\+/g," ")):"")}}}function Ut(n){if(this.g=this.s=this.j="",this.m=null,this.o=this.l="",this.h=!1,n instanceof Ut){this.h=n.h,An(this,n.j),this.s=n.s,this.g=n.g,Rn(this,n.m),this.l=n.l;var t=n.i,e=new Oe;e.i=t.i,t.g&&(e.g=new Map(t.g),e.h=t.h),ei(this,e),this.o=n.o}else n&&(t=String(n).match(yo))?(this.h=!1,An(this,t[1]||"",!0),this.s=Ee(t[2]||""),this.g=Ee(t[3]||"",!0),Rn(this,t[4]),this.l=Ee(t[5]||"",!0),ei(this,t[6]||"",!0),this.o=Ee(t[7]||"")):(this.h=!1,this.i=new Oe(null,this.h))}Ut.prototype.toString=function(){var n=[],t=this.j;t&&n.push(Te(t,ni,!0),":");var e=this.g;return(e||t=="file")&&(n.push("//"),(t=this.s)&&n.push(Te(t,ni,!0),"@"),n.push(encodeURIComponent(String(e)).replace(/%25([0-9a-fA-F]{2})/g,"%$1")),e=this.m,e!=null&&n.push(":",String(e))),(e=this.l)&&(this.g&&e.charAt(0)!="/"&&n.push("/"),n.push(Te(e,e.charAt(0)=="/"?il:sl,!0))),(e=this.i.toString())&&n.push("?",e),(e=this.o)&&n.push("#",Te(e,al)),n.join("")};function It(n){return new Ut(n)}function An(n,t,e){n.j=e?Ee(t,!0):t,n.j&&(n.j=n.j.replace(/:$/,""))}function Rn(n,t){if(t){if(t=Number(t),isNaN(t)||0>t)throw Error("Bad port number "+t);n.m=t}else n.m=null}function ei(n,t,e){t instanceof Oe?(n.i=t,ul(n.i,n.h)):(e||(t=Te(t,ol)),n.i=new Oe(t,n.h))}function N(n,t,e){n.i.set(t,e)}function Hn(n){return N(n,"zx",Math.floor(2147483648*Math.random()).toString(36)+Math.abs(Math.floor(2147483648*Math.random())^Date.now()).toString(36)),n}function Ee(n,t){return n?t?decodeURI(n.replace(/%25/g,"%2525")):decodeURIComponent(n):""}function Te(n,t,e){return typeof n=="string"?(n=encodeURI(n).replace(t,rl),e&&(n=n.replace(/%25([0-9a-fA-F]{2})/g,"%$1")),n):null}function rl(n){return n=n.charCodeAt(0),"%"+(n>>4&15).toString(16)+(n&15).toString(16)}var ni=/[#\/\?@]/g,sl=/[#\?:]/g,il=/[#\?]/g,ol=/[#\?@]/g,al=/#/g;function Oe(n,t){this.h=this.g=null,this.i=n||null,this.j=!!t}function Mt(n){n.g||(n.g=new Map,n.h=0,n.i&&nl(n.i,function(t,e){n.add(decodeURIComponent(t.replace(/\+/g," ")),e)}))}p=Oe.prototype;p.add=function(n,t){Mt(this),this.i=null,n=ce(this,n);var e=this.g.get(n);return e||this.g.set(n,e=[]),e.push(t),this.h+=1,this};function Eo(n,t){Mt(n),t=ce(n,t),n.g.has(t)&&(n.i=null,n.h-=n.g.get(t).length,n.g.delete(t))}function To(n,t){return Mt(n),t=ce(n,t),n.g.has(t)}p.forEach=function(n,t){Mt(this),this.g.forEach(function(e,r){e.forEach(function(s){n.call(t,s,r,this)},this)},this)};p.ta=function(){Mt(this);const n=Array.from(this.g.values()),t=Array.from(this.g.keys()),e=[];for(let r=0;r<t.length;r++){const s=n[r];for(let i=0;i<s.length;i++)e.push(t[r])}return e};p.Z=function(n){Mt(this);let t=[];if(typeof n=="string")To(this,n)&&(t=t.concat(this.g.get(ce(this,n))));else{n=Array.from(this.g.values());for(let e=0;e<n.length;e++)t=t.concat(n[e])}return t};p.set=function(n,t){return Mt(this),this.i=null,n=ce(this,n),To(this,n)&&(this.h-=this.g.get(n).length),this.g.set(n,[t]),this.h+=1,this};p.get=function(n,t){return n?(n=this.Z(n),0<n.length?String(n[0]):t):t};function vo(n,t,e){Eo(n,t),0<e.length&&(n.i=null,n.g.set(ce(n,t),Yr(e)),n.h+=e.length)}p.toString=function(){if(this.i)return this.i;if(!this.g)return"";const n=[],t=Array.from(this.g.keys());for(var e=0;e<t.length;e++){var r=t[e];const i=encodeURIComponent(String(r)),o=this.Z(r);for(r=0;r<o.length;r++){var s=i;o[r]!==""&&(s+="="+encodeURIComponent(String(o[r]))),n.push(s)}}return this.i=n.join("&")};function ce(n,t){return t=String(t),n.j&&(t=t.toLowerCase()),t}function ul(n,t){t&&!n.j&&(Mt(n),n.i=null,n.g.forEach(function(e,r){var s=r.toLowerCase();r!=s&&(Eo(this,r),vo(this,s,e))},n)),n.j=t}var ll=class{constructor(n,t){this.g=n,this.map=t}};function Io(n){this.l=n||hl,w.PerformanceNavigationTiming?(n=w.performance.getEntriesByType("navigation"),n=0<n.length&&(n[0].nextHopProtocol=="hq"||n[0].nextHopProtocol=="h2")):n=!!(w.g&&w.g.Ka&&w.g.Ka()&&w.g.Ka().dc),this.j=n?this.l:1,this.g=null,1<this.j&&(this.g=new Set),this.h=null,this.i=[]}var hl=10;function wo(n){return n.h?!0:n.g?n.g.size>=n.j:!1}function Ao(n){return n.h?1:n.g?n.g.size:0}function Fr(n,t){return n.h?n.h==t:n.g?n.g.has(t):!1}function cs(n,t){n.g?n.g.add(t):n.h=t}function Ro(n,t){n.h&&n.h==t?n.h=null:n.g&&n.g.has(t)&&n.g.delete(t)}Io.prototype.cancel=function(){if(this.i=Po(this),this.h)this.h.cancel(),this.h=null;else if(this.g&&this.g.size!==0){for(const n of this.g.values())n.cancel();this.g.clear()}};function Po(n){if(n.h!=null)return n.i.concat(n.h.F);if(n.g!=null&&n.g.size!==0){let t=n.i;for(const e of n.g.values())t=t.concat(e.F);return t}return Yr(n.i)}var cl=class{stringify(n){return w.JSON.stringify(n,void 0)}parse(n){return w.JSON.parse(n,void 0)}};function dl(){this.g=new cl}function fl(n,t,e){const r=e||"";try{_o(n,function(s,i){let o=s;$e(s)&&(o=ss(s)),t.push(r+i+"="+encodeURIComponent(o))})}catch(s){throw t.push(r+"type="+encodeURIComponent("_badmap")),s}}function ml(n,t){const e=new Gn;if(w.Image){const r=new Image;r.onload=dn(mn,e,r,"TestLoadImage: loaded",!0,t),r.onerror=dn(mn,e,r,"TestLoadImage: error",!1,t),r.onabort=dn(mn,e,r,"TestLoadImage: abort",!1,t),r.ontimeout=dn(mn,e,r,"TestLoadImage: timeout",!1,t),w.setTimeout(function(){r.ontimeout&&r.ontimeout()},1e4),r.src=n}else t(!1)}function mn(n,t,e,r,s){try{t.onload=null,t.onerror=null,t.onabort=null,t.ontimeout=null,s(r)}catch{}}function Xn(n){this.l=n.ec||null,this.j=n.ob||!1}G(Xn,us);Xn.prototype.g=function(){return new Yn(this.l,this.j)};Xn.prototype.i=function(n){return function(){return n}}({});function Yn(n,t){z.call(this),this.F=n,this.u=t,this.m=void 0,this.readyState=ds,this.status=0,this.responseType=this.responseText=this.response=this.statusText="",this.onreadystatechange=null,this.v=new Headers,this.h=null,this.C="GET",this.B="",this.g=!1,this.A=this.j=this.l=null}G(Yn,z);var ds=0;p=Yn.prototype;p.open=function(n,t){if(this.readyState!=ds)throw this.abort(),Error("Error reopening a connection");this.C=n,this.B=t,this.readyState=1,Fe(this)};p.send=function(n){if(this.readyState!=1)throw this.abort(),Error("need to call open() first. ");this.g=!0;const t={headers:this.v,method:this.C,credentials:this.m,cache:void 0};n&&(t.body=n),(this.F||w).fetch(new Request(this.B,t)).then(this.$a.bind(this),this.ka.bind(this))};p.abort=function(){this.response=this.responseText="",this.v=new Headers,this.status=0,this.j&&this.j.cancel("Request was aborted.").catch(()=>{}),1<=this.readyState&&this.g&&this.readyState!=4&&(this.g=!1,Ye(this)),this.readyState=ds};p.$a=function(n){if(this.g&&(this.l=n,this.h||(this.status=this.l.status,this.statusText=this.l.statusText,this.h=n.headers,this.readyState=2,Fe(this)),this.g&&(this.readyState=3,Fe(this),this.g)))if(this.responseType==="arraybuffer")n.arrayBuffer().then(this.Ya.bind(this),this.ka.bind(this));else if(typeof w.ReadableStream<"u"&&"body"in n){if(this.j=n.body.getReader(),this.u){if(this.responseType)throw Error('responseType must be empty for "streamBinaryChunks" mode responses.');this.response=[]}else this.response=this.responseText="",this.A=new TextDecoder;Vo(this)}else n.text().then(this.Za.bind(this),this.ka.bind(this))};function Vo(n){n.j.read().then(n.Xa.bind(n)).catch(n.ka.bind(n))}p.Xa=function(n){if(this.g){if(this.u&&n.value)this.response.push(n.value);else if(!this.u){var t=n.value?n.value:new Uint8Array(0);(t=this.A.decode(t,{stream:!n.done}))&&(this.response=this.responseText+=t)}n.done?Ye(this):Fe(this),this.readyState==3&&Vo(this)}};p.Za=function(n){this.g&&(this.response=this.responseText=n,Ye(this))};p.Ya=function(n){this.g&&(this.response=n,Ye(this))};p.ka=function(){this.g&&Ye(this)};function Ye(n){n.readyState=4,n.l=null,n.j=null,n.A=null,Fe(n)}p.setRequestHeader=function(n,t){this.v.append(n,t)};p.getResponseHeader=function(n){return this.h&&this.h.get(n.toLowerCase())||""};p.getAllResponseHeaders=function(){if(!this.h)return"";const n=[],t=this.h.entries();for(var e=t.next();!e.done;)e=e.value,n.push(e[0]+": "+e[1]),e=t.next();return n.join(`\r
`)};function Fe(n){n.onreadystatechange&&n.onreadystatechange.call(n)}Object.defineProperty(Yn.prototype,"withCredentials",{get:function(){return this.m==="include"},set:function(n){this.m=n?"include":"same-origin"}});var gl=w.JSON.parse;function F(n){z.call(this),this.headers=new Map,this.u=n||null,this.h=!1,this.C=this.g=null,this.I="",this.m=0,this.j="",this.l=this.G=this.v=this.F=!1,this.B=0,this.A=null,this.K=So,this.L=this.M=!1}G(F,z);var So="",pl=/^https?$/i,_l=["POST","PUT"];p=F.prototype;p.Oa=function(n){this.M=n};p.ha=function(n,t,e,r){if(this.g)throw Error("[goog.net.XhrIo] Object is active with another request="+this.I+"; newUri="+n);t=t?t.toUpperCase():"GET",this.I=n,this.j="",this.m=0,this.F=!1,this.h=!0,this.g=this.u?this.u.g():Nr.g(),this.C=this.u?ti(this.u):ti(Nr),this.g.onreadystatechange=tt(this.La,this);try{this.G=!0,this.g.open(t,String(n),!0),this.G=!1}catch(i){ri(this,i);return}if(n=e||"",e=new Map(this.headers),r)if(Object.getPrototypeOf(r)===Object.prototype)for(var s in r)e.set(s,r[s]);else if(typeof r.keys=="function"&&typeof r.get=="function")for(const i of r.keys())e.set(i,r.get(i));else throw Error("Unknown input type for opt_headers: "+String(r));r=Array.from(e.keys()).find(i=>i.toLowerCase()=="content-type"),s=w.FormData&&n instanceof w.FormData,!(0<=zi(_l,t))||r||s||e.set("Content-Type","application/x-www-form-urlencoded;charset=utf-8");for(const[i,o]of e)this.g.setRequestHeader(i,o);this.K&&(this.g.responseType=this.K),"withCredentials"in this.g&&this.g.withCredentials!==this.M&&(this.g.withCredentials=this.M);try{ko(this),0<this.B&&((this.L=yl(this.g))?(this.g.timeout=this.B,this.g.ontimeout=tt(this.ua,this)):this.A=as(this.ua,this.B,this)),this.v=!0,this.g.send(n),this.v=!1}catch(i){ri(this,i)}};function yl(n){return re&&typeof n.timeout=="number"&&n.ontimeout!==void 0}p.ua=function(){typeof Xr<"u"&&this.g&&(this.j="Timed out after "+this.B+"ms, aborting",this.m=8,H(this,"timeout"),this.abort(8))};function ri(n,t){n.h=!1,n.g&&(n.l=!0,n.g.abort(),n.l=!1),n.j=t,n.m=5,Co(n),Jn(n)}function Co(n){n.F||(n.F=!0,H(n,"complete"),H(n,"error"))}p.abort=function(n){this.g&&this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1,this.m=n||7,H(this,"complete"),H(this,"abort"),Jn(this))};p.N=function(){this.g&&(this.h&&(this.h=!1,this.l=!0,this.g.abort(),this.l=!1),Jn(this,!0)),F.$.N.call(this)};p.La=function(){this.s||(this.G||this.v||this.l?Do(this):this.kb())};p.kb=function(){Do(this)};function Do(n){if(n.h&&typeof Xr<"u"&&(!n.C[1]||mt(n)!=4||n.da()!=2)){if(n.v&&mt(n)==4)as(n.La,0,n);else if(H(n,"readystatechange"),mt(n)==4){n.h=!1;try{const o=n.da();t:switch(o){case 200:case 201:case 202:case 204:case 206:case 304:case 1223:var t=!0;break t;default:t=!1}var e;if(!(e=t)){var r;if(r=o===0){var s=String(n.I).match(yo)[1]||null;!s&&w.self&&w.self.location&&(s=w.self.location.protocol.slice(0,-1)),r=!pl.test(s?s.toLowerCase():"")}e=r}if(e)H(n,"complete"),H(n,"success");else{n.m=6;try{var i=2<mt(n)?n.g.statusText:""}catch{i=""}n.j=i+" ["+n.da()+"]",Co(n)}}finally{Jn(n)}}}}function Jn(n,t){if(n.g){ko(n);const e=n.g,r=n.C[0]?()=>{}:null;n.g=null,n.C=null,t||H(n,"ready");try{e.onreadystatechange=r}catch{}}}function ko(n){n.g&&n.L&&(n.g.ontimeout=null),n.A&&(w.clearTimeout(n.A),n.A=null)}p.isActive=function(){return!!this.g};function mt(n){return n.g?n.g.readyState:0}p.da=function(){try{return 2<mt(this)?this.g.status:-1}catch{return-1}};p.ja=function(){try{return this.g?this.g.responseText:""}catch{return""}};p.Wa=function(n){if(this.g){var t=this.g.responseText;return n&&t.indexOf(n)==0&&(t=t.substring(n.length)),gl(t)}};function si(n){try{if(!n.g)return null;if("response"in n.g)return n.g.response;switch(n.K){case So:case"text":return n.g.responseText;case"arraybuffer":if("mozResponseArrayBuffer"in n.g)return n.g.mozResponseArrayBuffer}return null}catch{return null}}function El(n){const t={};n=(n.g&&2<=mt(n)&&n.g.getAllResponseHeaders()||"").split(`\r
`);for(let r=0;r<n.length;r++){if(Ce(n[r]))continue;var e=Gu(n[r]);const s=e[0];if(e=e[1],typeof e!="string")continue;e=e.trim();const i=t[s]||[];t[s]=i,i.push(e)}Lu(t,function(r){return r.join(", ")})}p.Ia=function(){return this.m};p.Sa=function(){return typeof this.j=="string"?this.j:String(this.j)};function No(n){let t="";return Zr(n,function(e,r){t+=r,t+=":",t+=e,t+=`\r
`}),t}function fs(n,t,e){t:{for(r in e){var r=!1;break t}r=!0}r||(e=No(e),typeof n=="string"?e!=null&&encodeURIComponent(String(e)):N(n,t,e))}function pe(n,t,e){return e&&e.internalChannelParams&&e.internalChannelParams[n]||t}function xo(n){this.Ga=0,this.j=[],this.l=new Gn,this.pa=this.wa=this.I=this.Y=this.g=this.Da=this.F=this.na=this.o=this.U=this.s=null,this.fb=this.W=0,this.cb=pe("failFast",!1,n),this.G=this.v=this.u=this.m=this.h=null,this.aa=!0,this.Fa=this.V=-1,this.ba=this.A=this.C=0,this.ab=pe("baseRetryDelayMs",5e3,n),this.hb=pe("retryDelaySeedMs",1e4,n),this.eb=pe("forwardChannelMaxRetries",2,n),this.xa=pe("forwardChannelRequestTimeoutMs",2e4,n),this.va=n&&n.xmlHttpFactory||void 0,this.Ha=n&&n.useFetchStreams||!1,this.L=void 0,this.J=n&&n.supportsCrossDomainXhr||!1,this.K="",this.i=new Io(n&&n.concurrentRequestLimit),this.Ja=new dl,this.P=n&&n.fastHandshake||!1,this.O=n&&n.encodeInitMessageHeaders||!1,this.P&&this.O&&(this.O=!1),this.bb=n&&n.bc||!1,n&&n.Ea&&this.l.Ea(),n&&n.forceLongPolling&&(this.aa=!1),this.ca=!this.P&&this.aa&&n&&n.detectBufferingProxy||!1,this.qa=void 0,n&&n.longPollingTimeout&&0<n.longPollingTimeout&&(this.qa=n.longPollingTimeout),this.oa=void 0,this.S=0,this.M=!1,this.ma=this.B=null}p=xo.prototype;p.ra=8;p.H=1;function ms(n){if(Mo(n),n.H==3){var t=n.W++,e=It(n.I);if(N(e,"SID",n.K),N(e,"RID",t),N(e,"TYPE","terminate"),Je(n,e),t=new He(n,n.l,t),t.L=2,t.A=Hn(It(e)),e=!1,w.navigator&&w.navigator.sendBeacon)try{e=w.navigator.sendBeacon(t.A.toString(),"")}catch{}!e&&w.Image&&(new Image().src=t.A,e=!0),e||(t.g=jo(t.l,null),t.g.ha(t.A)),t.G=Date.now(),Xe(t)}qo(n)}function Zn(n){n.g&&(ps(n),n.g.cancel(),n.g=null)}function Mo(n){Zn(n),n.u&&(w.clearTimeout(n.u),n.u=null),Pn(n),n.i.cancel(),n.m&&(typeof n.m=="number"&&w.clearTimeout(n.m),n.m=null)}function tr(n){if(!wo(n.i)&&!n.m){n.m=!0;var t=n.Na;ke||eo(),Ne||(ke(),Ne=!0),is.add(t,n),n.C=0}}function Tl(n,t){return Ao(n.i)>=n.i.j-(n.m?1:0)?!1:n.m?(n.j=t.F.concat(n.j),!0):n.H==1||n.H==2||n.C>=(n.cb?0:n.eb)?!1:(n.m=Qe(tt(n.Na,n,t),Uo(n,n.C)),n.C++,!0)}p.Na=function(n){if(this.m)if(this.m=null,this.H==1){if(!n){this.W=Math.floor(1e5*Math.random()),n=this.W++;const s=new He(this,this.l,n);let i=this.s;if(this.U&&(i?(i=Qi(i),Wi(i,this.U)):i=this.U),this.o!==null||this.O||(s.I=i,i=null),this.P)t:{for(var t=0,e=0;e<this.j.length;e++){e:{var r=this.j[e];if("__data__"in r.map&&(r=r.map.__data__,typeof r=="string")){r=r.length;break e}r=void 0}if(r===void 0)break;if(t+=r,4096<t){t=e;break t}if(t===4096||e===this.j.length-1){t=e+1;break t}}t=1e3}else t=1e3;t=Oo(this,s,t),e=It(this.I),N(e,"RID",n),N(e,"CVER",22),this.F&&N(e,"X-HTTP-Session-Id",this.F),Je(this,e),i&&(this.O?t="headers="+encodeURIComponent(String(No(i)))+"&"+t:this.o&&fs(e,this.o,i)),cs(this.i,s),this.bb&&N(e,"TYPE","init"),this.P?(N(e,"$req",t),N(e,"SID","null"),s.aa=!0,Mr(s,e,null)):Mr(s,e,t),this.H=2}}else this.H==3&&(n?ii(this,n):this.j.length==0||wo(this.i)||ii(this))};function ii(n,t){var e;t?e=t.m:e=n.W++;const r=It(n.I);N(r,"SID",n.K),N(r,"RID",e),N(r,"AID",n.V),Je(n,r),n.o&&n.s&&fs(r,n.o,n.s),e=new He(n,n.l,e,n.C+1),n.o===null&&(e.I=n.s),t&&(n.j=t.F.concat(n.j)),t=Oo(n,e,1e3),e.setTimeout(Math.round(.5*n.xa)+Math.round(.5*n.xa*Math.random())),cs(n.i,e),Mr(e,r,t)}function Je(n,t){n.na&&Zr(n.na,function(e,r){N(t,r,e)}),n.h&&_o({},function(e,r){N(t,r,e)})}function Oo(n,t,e){e=Math.min(n.j.length,e);var r=n.h?tt(n.h.Va,n.h,n):null;t:{var s=n.j;let i=-1;for(;;){const o=["count="+e];i==-1?0<e?(i=s[0].g,o.push("ofs="+i)):i=0:o.push("ofs="+i);let a=!0;for(let u=0;u<e;u++){let l=s[u].g;const h=s[u].map;if(l-=i,0>l)i=Math.max(0,s[u].g-100),a=!1;else try{fl(h,o,"req"+l+"_")}catch{r&&r(h)}}if(a){r=o.join("&");break t}}}return n=n.j.splice(0,e),t.F=n,r}function Fo(n){if(!n.g&&!n.u){n.ba=1;var t=n.Ma;ke||eo(),Ne||(ke(),Ne=!0),is.add(t,n),n.A=0}}function gs(n){return n.g||n.u||3<=n.A?!1:(n.ba++,n.u=Qe(tt(n.Ma,n),Uo(n,n.A)),n.A++,!0)}p.Ma=function(){if(this.u=null,Lo(this),this.ca&&!(this.M||this.g==null||0>=this.S)){var n=2*this.S;this.l.info("BP detection timer enabled: "+n),this.B=Qe(tt(this.jb,this),n)}};p.jb=function(){this.B&&(this.B=null,this.l.info("BP detection timeout reached."),this.l.info("Buffering proxy detected and switch to long-polling!"),this.G=!1,this.M=!0,st(10),Zn(this),Lo(this))};function ps(n){n.B!=null&&(w.clearTimeout(n.B),n.B=null)}function Lo(n){n.g=new He(n,n.l,"rpc",n.ba),n.o===null&&(n.g.I=n.s),n.g.O=0;var t=It(n.wa);N(t,"RID","rpc"),N(t,"SID",n.K),N(t,"AID",n.V),N(t,"CI",n.G?"0":"1"),!n.G&&n.qa&&N(t,"TO",n.qa),N(t,"TYPE","xmlhttp"),Je(n,t),n.o&&n.s&&fs(t,n.o,n.s),n.L&&n.g.setTimeout(n.L);var e=n.g;n=n.pa,e.L=1,e.A=Hn(It(t)),e.u=null,e.S=!0,fo(e,n)}p.ib=function(){this.v!=null&&(this.v=null,Zn(this),gs(this),st(19))};function Pn(n){n.v!=null&&(w.clearTimeout(n.v),n.v=null)}function bo(n,t){var e=null;if(n.g==t){Pn(n),ps(n),n.g=null;var r=2}else if(Fr(n.i,t))e=t.F,Ro(n.i,t),r=1;else return;if(n.H!=0){if(t.i)if(r==1){e=t.u?t.u.length:0,t=Date.now()-t.G;var s=n.C;r=$n(),H(r,new ao(r,e)),tr(n)}else Fo(n);else if(s=t.s,s==3||s==0&&0<t.ca||!(r==1&&Tl(n,t)||r==2&&gs(n)))switch(e&&0<e.length&&(t=n.i,t.i=t.i.concat(e)),s){case 1:Lt(n,5);break;case 4:Lt(n,10);break;case 3:Lt(n,6);break;default:Lt(n,2)}}}function Uo(n,t){let e=n.ab+Math.floor(Math.random()*n.hb);return n.isActive()||(e*=2),e*t}function Lt(n,t){if(n.l.info("Error code "+t),t==2){var e=null;n.h&&(e=null);var r=tt(n.pb,n);e||(e=new Ut("//www.google.com/images/cleardot.gif"),w.location&&w.location.protocol=="http"||An(e,"https"),Hn(e)),ml(e.toString(),r)}else st(2);n.H=0,n.h&&n.h.za(t),qo(n),Mo(n)}p.pb=function(n){n?(this.l.info("Successfully pinged google.com"),st(2)):(this.l.info("Failed to ping google.com"),st(1))};function qo(n){if(n.H=0,n.ma=[],n.h){const t=Po(n.i);(t.length!=0||n.j.length!=0)&&(Hs(n.ma,t),Hs(n.ma,n.j),n.i.i.length=0,Yr(n.j),n.j.length=0),n.h.ya()}}function Bo(n,t,e){var r=e instanceof Ut?It(e):new Ut(e);if(r.g!="")t&&(r.g=t+"."+r.g),Rn(r,r.m);else{var s=w.location;r=s.protocol,t=t?t+"."+s.hostname:s.hostname,s=+s.port;var i=new Ut(null);r&&An(i,r),t&&(i.g=t),s&&Rn(i,s),e&&(i.l=e),r=i}return e=n.F,t=n.Da,e&&t&&N(r,e,t),N(r,"VER",n.ra),Je(n,r),r}function jo(n,t,e){if(t&&!n.J)throw Error("Can't create secondary domain capable XhrIo object.");return t=n.Ha&&!n.va?new F(new Xn({ob:e})):new F(n.va),t.Oa(n.J),t}p.isActive=function(){return!!this.h&&this.h.isActive(this)};function zo(){}p=zo.prototype;p.Ba=function(){};p.Aa=function(){};p.za=function(){};p.ya=function(){};p.isActive=function(){return!0};p.Va=function(){};function Vn(){if(re&&!(10<=Number(xu)))throw Error("Environmental error: no available transport.")}Vn.prototype.g=function(n,t){return new lt(n,t)};function lt(n,t){z.call(this),this.g=new xo(t),this.l=n,this.h=t&&t.messageUrlParams||null,n=t&&t.messageHeaders||null,t&&t.clientProtocolHeaderRequired&&(n?n["X-Client-Protocol"]="webchannel":n={"X-Client-Protocol":"webchannel"}),this.g.s=n,n=t&&t.initMessageHeaders||null,t&&t.messageContentType&&(n?n["X-WebChannel-Content-Type"]=t.messageContentType:n={"X-WebChannel-Content-Type":t.messageContentType}),t&&t.Ca&&(n?n["X-WebChannel-Client-Profile"]=t.Ca:n={"X-WebChannel-Client-Profile":t.Ca}),this.g.U=n,(n=t&&t.cc)&&!Ce(n)&&(this.g.o=n),this.A=t&&t.supportsCrossDomainXhr||!1,this.v=t&&t.sendRawJson||!1,(t=t&&t.httpSessionIdParam)&&!Ce(t)&&(this.g.F=t,n=this.h,n!==null&&t in n&&(n=this.h,t in n&&delete n[t])),this.j=new de(this)}G(lt,z);lt.prototype.m=function(){this.g.h=this.j,this.A&&(this.g.J=!0);var n=this.g,t=this.l,e=this.h||void 0;st(0),n.Y=t,n.na=e||{},n.G=n.aa,n.I=Bo(n,null,n.Y),tr(n)};lt.prototype.close=function(){ms(this.g)};lt.prototype.u=function(n){var t=this.g;if(typeof n=="string"){var e={};e.__data__=n,n=e}else this.v&&(e={},e.__data__=ss(n),n=e);t.j.push(new ll(t.fb++,n)),t.H==3&&tr(t)};lt.prototype.N=function(){this.g.h=null,delete this.j,ms(this.g),delete this.g,lt.$.N.call(this)};function Go(n){ls.call(this),n.__headers__&&(this.headers=n.__headers__,this.statusCode=n.__status__,delete n.__headers__,delete n.__status__);var t=n.__sm__;if(t){t:{for(const e in t){n=e;break t}n=void 0}(this.i=n)&&(n=this.i,t=t!==null&&n in t?t[n]:void 0),this.data=t}else this.data=n}G(Go,ls);function $o(){hs.call(this),this.status=1}G($o,hs);function de(n){this.g=n}G(de,zo);de.prototype.Ba=function(){H(this.g,"a")};de.prototype.Aa=function(n){H(this.g,new Go(n))};de.prototype.za=function(n){H(this.g,new $o)};de.prototype.ya=function(){H(this.g,"b")};function vl(){this.blockSize=-1}function dt(){this.blockSize=-1,this.blockSize=64,this.g=Array(4),this.m=Array(this.blockSize),this.i=this.h=0,this.reset()}G(dt,vl);dt.prototype.reset=function(){this.g[0]=1732584193,this.g[1]=4023233417,this.g[2]=2562383102,this.g[3]=271733878,this.i=this.h=0};function Ir(n,t,e){e||(e=0);var r=Array(16);if(typeof t=="string")for(var s=0;16>s;++s)r[s]=t.charCodeAt(e++)|t.charCodeAt(e++)<<8|t.charCodeAt(e++)<<16|t.charCodeAt(e++)<<24;else for(s=0;16>s;++s)r[s]=t[e++]|t[e++]<<8|t[e++]<<16|t[e++]<<24;t=n.g[0],e=n.g[1],s=n.g[2];var i=n.g[3],o=t+(i^e&(s^i))+r[0]+3614090360&4294967295;t=e+(o<<7&4294967295|o>>>25),o=i+(s^t&(e^s))+r[1]+3905402710&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(e^i&(t^e))+r[2]+606105819&4294967295,s=i+(o<<17&4294967295|o>>>15),o=e+(t^s&(i^t))+r[3]+3250441966&4294967295,e=s+(o<<22&4294967295|o>>>10),o=t+(i^e&(s^i))+r[4]+4118548399&4294967295,t=e+(o<<7&4294967295|o>>>25),o=i+(s^t&(e^s))+r[5]+1200080426&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(e^i&(t^e))+r[6]+2821735955&4294967295,s=i+(o<<17&4294967295|o>>>15),o=e+(t^s&(i^t))+r[7]+4249261313&4294967295,e=s+(o<<22&4294967295|o>>>10),o=t+(i^e&(s^i))+r[8]+1770035416&4294967295,t=e+(o<<7&4294967295|o>>>25),o=i+(s^t&(e^s))+r[9]+2336552879&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(e^i&(t^e))+r[10]+4294925233&4294967295,s=i+(o<<17&4294967295|o>>>15),o=e+(t^s&(i^t))+r[11]+2304563134&4294967295,e=s+(o<<22&4294967295|o>>>10),o=t+(i^e&(s^i))+r[12]+1804603682&4294967295,t=e+(o<<7&4294967295|o>>>25),o=i+(s^t&(e^s))+r[13]+4254626195&4294967295,i=t+(o<<12&4294967295|o>>>20),o=s+(e^i&(t^e))+r[14]+2792965006&4294967295,s=i+(o<<17&4294967295|o>>>15),o=e+(t^s&(i^t))+r[15]+1236535329&4294967295,e=s+(o<<22&4294967295|o>>>10),o=t+(s^i&(e^s))+r[1]+4129170786&4294967295,t=e+(o<<5&4294967295|o>>>27),o=i+(e^s&(t^e))+r[6]+3225465664&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^e&(i^t))+r[11]+643717713&4294967295,s=i+(o<<14&4294967295|o>>>18),o=e+(i^t&(s^i))+r[0]+3921069994&4294967295,e=s+(o<<20&4294967295|o>>>12),o=t+(s^i&(e^s))+r[5]+3593408605&4294967295,t=e+(o<<5&4294967295|o>>>27),o=i+(e^s&(t^e))+r[10]+38016083&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^e&(i^t))+r[15]+3634488961&4294967295,s=i+(o<<14&4294967295|o>>>18),o=e+(i^t&(s^i))+r[4]+3889429448&4294967295,e=s+(o<<20&4294967295|o>>>12),o=t+(s^i&(e^s))+r[9]+568446438&4294967295,t=e+(o<<5&4294967295|o>>>27),o=i+(e^s&(t^e))+r[14]+3275163606&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^e&(i^t))+r[3]+4107603335&4294967295,s=i+(o<<14&4294967295|o>>>18),o=e+(i^t&(s^i))+r[8]+1163531501&4294967295,e=s+(o<<20&4294967295|o>>>12),o=t+(s^i&(e^s))+r[13]+2850285829&4294967295,t=e+(o<<5&4294967295|o>>>27),o=i+(e^s&(t^e))+r[2]+4243563512&4294967295,i=t+(o<<9&4294967295|o>>>23),o=s+(t^e&(i^t))+r[7]+1735328473&4294967295,s=i+(o<<14&4294967295|o>>>18),o=e+(i^t&(s^i))+r[12]+2368359562&4294967295,e=s+(o<<20&4294967295|o>>>12),o=t+(e^s^i)+r[5]+4294588738&4294967295,t=e+(o<<4&4294967295|o>>>28),o=i+(t^e^s)+r[8]+2272392833&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^e)+r[11]+1839030562&4294967295,s=i+(o<<16&4294967295|o>>>16),o=e+(s^i^t)+r[14]+4259657740&4294967295,e=s+(o<<23&4294967295|o>>>9),o=t+(e^s^i)+r[1]+2763975236&4294967295,t=e+(o<<4&4294967295|o>>>28),o=i+(t^e^s)+r[4]+1272893353&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^e)+r[7]+4139469664&4294967295,s=i+(o<<16&4294967295|o>>>16),o=e+(s^i^t)+r[10]+3200236656&4294967295,e=s+(o<<23&4294967295|o>>>9),o=t+(e^s^i)+r[13]+681279174&4294967295,t=e+(o<<4&4294967295|o>>>28),o=i+(t^e^s)+r[0]+3936430074&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^e)+r[3]+3572445317&4294967295,s=i+(o<<16&4294967295|o>>>16),o=e+(s^i^t)+r[6]+76029189&4294967295,e=s+(o<<23&4294967295|o>>>9),o=t+(e^s^i)+r[9]+3654602809&4294967295,t=e+(o<<4&4294967295|o>>>28),o=i+(t^e^s)+r[12]+3873151461&4294967295,i=t+(o<<11&4294967295|o>>>21),o=s+(i^t^e)+r[15]+530742520&4294967295,s=i+(o<<16&4294967295|o>>>16),o=e+(s^i^t)+r[2]+3299628645&4294967295,e=s+(o<<23&4294967295|o>>>9),o=t+(s^(e|~i))+r[0]+4096336452&4294967295,t=e+(o<<6&4294967295|o>>>26),o=i+(e^(t|~s))+r[7]+1126891415&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~e))+r[14]+2878612391&4294967295,s=i+(o<<15&4294967295|o>>>17),o=e+(i^(s|~t))+r[5]+4237533241&4294967295,e=s+(o<<21&4294967295|o>>>11),o=t+(s^(e|~i))+r[12]+1700485571&4294967295,t=e+(o<<6&4294967295|o>>>26),o=i+(e^(t|~s))+r[3]+2399980690&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~e))+r[10]+4293915773&4294967295,s=i+(o<<15&4294967295|o>>>17),o=e+(i^(s|~t))+r[1]+2240044497&4294967295,e=s+(o<<21&4294967295|o>>>11),o=t+(s^(e|~i))+r[8]+1873313359&4294967295,t=e+(o<<6&4294967295|o>>>26),o=i+(e^(t|~s))+r[15]+4264355552&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~e))+r[6]+2734768916&4294967295,s=i+(o<<15&4294967295|o>>>17),o=e+(i^(s|~t))+r[13]+1309151649&4294967295,e=s+(o<<21&4294967295|o>>>11),o=t+(s^(e|~i))+r[4]+4149444226&4294967295,t=e+(o<<6&4294967295|o>>>26),o=i+(e^(t|~s))+r[11]+3174756917&4294967295,i=t+(o<<10&4294967295|o>>>22),o=s+(t^(i|~e))+r[2]+718787259&4294967295,s=i+(o<<15&4294967295|o>>>17),o=e+(i^(s|~t))+r[9]+3951481745&4294967295,n.g[0]=n.g[0]+t&4294967295,n.g[1]=n.g[1]+(s+(o<<21&4294967295|o>>>11))&4294967295,n.g[2]=n.g[2]+s&4294967295,n.g[3]=n.g[3]+i&4294967295}dt.prototype.j=function(n,t){t===void 0&&(t=n.length);for(var e=t-this.blockSize,r=this.m,s=this.h,i=0;i<t;){if(s==0)for(;i<=e;)Ir(this,n,i),i+=this.blockSize;if(typeof n=="string"){for(;i<t;)if(r[s++]=n.charCodeAt(i++),s==this.blockSize){Ir(this,r),s=0;break}}else for(;i<t;)if(r[s++]=n[i++],s==this.blockSize){Ir(this,r),s=0;break}}this.h=s,this.i+=t};dt.prototype.l=function(){var n=Array((56>this.h?this.blockSize:2*this.blockSize)-this.h);n[0]=128;for(var t=1;t<n.length-8;++t)n[t]=0;var e=8*this.i;for(t=n.length-8;t<n.length;++t)n[t]=e&255,e/=256;for(this.j(n),n=Array(16),t=e=0;4>t;++t)for(var r=0;32>r;r+=8)n[e++]=this.g[t]>>>r&255;return n};function k(n,t){this.h=t;for(var e=[],r=!0,s=n.length-1;0<=s;s--){var i=n[s]|0;r&&i==t||(e[s]=i,r=!1)}this.g=e}var Il={};function _s(n){return-128<=n&&128>n?Du(n,function(t){return new k([t|0],0>t?-1:0)}):new k([n|0],0>n?-1:0)}function gt(n){if(isNaN(n)||!isFinite(n))return te;if(0>n)return Q(gt(-n));for(var t=[],e=1,r=0;n>=e;r++)t[r]=n/e|0,e*=Lr;return new k(t,0)}function Ko(n,t){if(n.length==0)throw Error("number format error: empty string");if(t=t||10,2>t||36<t)throw Error("radix out of range: "+t);if(n.charAt(0)=="-")return Q(Ko(n.substring(1),t));if(0<=n.indexOf("-"))throw Error('number format error: interior "-" character');for(var e=gt(Math.pow(t,8)),r=te,s=0;s<n.length;s+=8){var i=Math.min(8,n.length-s),o=parseInt(n.substring(s,s+i),t);8>i?(i=gt(Math.pow(t,i)),r=r.R(i).add(gt(o))):(r=r.R(e),r=r.add(gt(o)))}return r}var Lr=4294967296,te=_s(0),br=_s(1),oi=_s(16777216);p=k.prototype;p.ea=function(){if(ht(this))return-Q(this).ea();for(var n=0,t=1,e=0;e<this.g.length;e++){var r=this.D(e);n+=(0<=r?r:Lr+r)*t,t*=Lr}return n};p.toString=function(n){if(n=n||10,2>n||36<n)throw Error("radix out of range: "+n);if(Tt(this))return"0";if(ht(this))return"-"+Q(this).toString(n);for(var t=gt(Math.pow(n,6)),e=this,r="";;){var s=Cn(e,t).g;e=Sn(e,s.R(t));var i=((0<e.g.length?e.g[0]:e.h)>>>0).toString(n);if(e=s,Tt(e))return i+r;for(;6>i.length;)i="0"+i;r=i+r}};p.D=function(n){return 0>n?0:n<this.g.length?this.g[n]:this.h};function Tt(n){if(n.h!=0)return!1;for(var t=0;t<n.g.length;t++)if(n.g[t]!=0)return!1;return!0}function ht(n){return n.h==-1}p.X=function(n){return n=Sn(this,n),ht(n)?-1:Tt(n)?0:1};function Q(n){for(var t=n.g.length,e=[],r=0;r<t;r++)e[r]=~n.g[r];return new k(e,~n.h).add(br)}p.abs=function(){return ht(this)?Q(this):this};p.add=function(n){for(var t=Math.max(this.g.length,n.g.length),e=[],r=0,s=0;s<=t;s++){var i=r+(this.D(s)&65535)+(n.D(s)&65535),o=(i>>>16)+(this.D(s)>>>16)+(n.D(s)>>>16);r=o>>>16,i&=65535,o&=65535,e[s]=o<<16|i}return new k(e,e[e.length-1]&-2147483648?-1:0)};function Sn(n,t){return n.add(Q(t))}p.R=function(n){if(Tt(this)||Tt(n))return te;if(ht(this))return ht(n)?Q(this).R(Q(n)):Q(Q(this).R(n));if(ht(n))return Q(this.R(Q(n)));if(0>this.X(oi)&&0>n.X(oi))return gt(this.ea()*n.ea());for(var t=this.g.length+n.g.length,e=[],r=0;r<2*t;r++)e[r]=0;for(r=0;r<this.g.length;r++)for(var s=0;s<n.g.length;s++){var i=this.D(r)>>>16,o=this.D(r)&65535,a=n.D(s)>>>16,u=n.D(s)&65535;e[2*r+2*s]+=o*u,gn(e,2*r+2*s),e[2*r+2*s+1]+=i*u,gn(e,2*r+2*s+1),e[2*r+2*s+1]+=o*a,gn(e,2*r+2*s+1),e[2*r+2*s+2]+=i*a,gn(e,2*r+2*s+2)}for(r=0;r<t;r++)e[r]=e[2*r+1]<<16|e[2*r];for(r=t;r<2*t;r++)e[r]=0;return new k(e,0)};function gn(n,t){for(;(n[t]&65535)!=n[t];)n[t+1]+=n[t]>>>16,n[t]&=65535,t++}function _e(n,t){this.g=n,this.h=t}function Cn(n,t){if(Tt(t))throw Error("division by zero");if(Tt(n))return new _e(te,te);if(ht(n))return t=Cn(Q(n),t),new _e(Q(t.g),Q(t.h));if(ht(t))return t=Cn(n,Q(t)),new _e(Q(t.g),t.h);if(30<n.g.length){if(ht(n)||ht(t))throw Error("slowDivide_ only works with positive integers.");for(var e=br,r=t;0>=r.X(n);)e=ai(e),r=ai(r);var s=Wt(e,1),i=Wt(r,1);for(r=Wt(r,2),e=Wt(e,2);!Tt(r);){var o=i.add(r);0>=o.X(n)&&(s=s.add(e),i=o),r=Wt(r,1),e=Wt(e,1)}return t=Sn(n,s.R(t)),new _e(s,t)}for(s=te;0<=n.X(t);){for(e=Math.max(1,Math.floor(n.ea()/t.ea())),r=Math.ceil(Math.log(e)/Math.LN2),r=48>=r?1:Math.pow(2,r-48),i=gt(e),o=i.R(t);ht(o)||0<o.X(n);)e-=r,i=gt(e),o=i.R(t);Tt(i)&&(i=br),s=s.add(i),n=Sn(n,o)}return new _e(s,n)}p.gb=function(n){return Cn(this,n).h};p.and=function(n){for(var t=Math.max(this.g.length,n.g.length),e=[],r=0;r<t;r++)e[r]=this.D(r)&n.D(r);return new k(e,this.h&n.h)};p.or=function(n){for(var t=Math.max(this.g.length,n.g.length),e=[],r=0;r<t;r++)e[r]=this.D(r)|n.D(r);return new k(e,this.h|n.h)};p.xor=function(n){for(var t=Math.max(this.g.length,n.g.length),e=[],r=0;r<t;r++)e[r]=this.D(r)^n.D(r);return new k(e,this.h^n.h)};function ai(n){for(var t=n.g.length+1,e=[],r=0;r<t;r++)e[r]=n.D(r)<<1|n.D(r-1)>>>31;return new k(e,n.h)}function Wt(n,t){var e=t>>5;t%=32;for(var r=n.g.length-e,s=[],i=0;i<r;i++)s[i]=0<t?n.D(i+e)>>>t|n.D(i+e+1)<<32-t:n.D(i+e);return new k(s,n.h)}Vn.prototype.createWebChannel=Vn.prototype.g;lt.prototype.send=lt.prototype.u;lt.prototype.open=lt.prototype.m;lt.prototype.close=lt.prototype.close;Kn.NO_ERROR=0;Kn.TIMEOUT=8;Kn.HTTP_ERROR=6;uo.COMPLETE="complete";lo.EventType=We;We.OPEN="a";We.CLOSE="b";We.ERROR="c";We.MESSAGE="d";z.prototype.listen=z.prototype.O;F.prototype.listenOnce=F.prototype.P;F.prototype.getLastError=F.prototype.Sa;F.prototype.getLastErrorCode=F.prototype.Ia;F.prototype.getStatus=F.prototype.da;F.prototype.getResponseJson=F.prototype.Wa;F.prototype.getResponseText=F.prototype.ja;F.prototype.send=F.prototype.ha;F.prototype.setWithCredentials=F.prototype.Oa;dt.prototype.digest=dt.prototype.l;dt.prototype.reset=dt.prototype.reset;dt.prototype.update=dt.prototype.j;k.prototype.add=k.prototype.add;k.prototype.multiply=k.prototype.R;k.prototype.modulo=k.prototype.gb;k.prototype.compare=k.prototype.X;k.prototype.toNumber=k.prototype.ea;k.prototype.toString=k.prototype.toString;k.prototype.getBits=k.prototype.D;k.fromNumber=gt;k.fromString=Ko;var wl=function(){return new Vn},Al=function(){return $n()},wr=Kn,Rl=uo,Pl=Gt,ui={xb:0,Ab:1,Bb:2,Ub:3,Zb:4,Wb:5,Xb:6,Vb:7,Tb:8,Yb:9,PROXY:10,NOPROXY:11,Rb:12,Nb:13,Ob:14,Mb:15,Pb:16,Qb:17,tb:18,sb:19,ub:20},pn=lo,Vl=F,Sl=dt,ee=k;const li="@firebase/firestore";/**
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
 */class J{constructor(t){this.uid=t}isAuthenticated(){return this.uid!=null}toKey(){return this.isAuthenticated()?"uid:"+this.uid:"anonymous-user"}isEqual(t){return t.uid===this.uid}}J.UNAUTHENTICATED=new J(null),J.GOOGLE_CREDENTIALS=new J("google-credentials-uid"),J.FIRST_PARTY=new J("first-party-uid"),J.MOCK_USER=new J("mock-user");/**
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
 */let fe="10.7.0";/**
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
 */const qt=new Iu("@firebase/firestore");function ye(){return qt.logLevel}function _(n,...t){if(qt.logLevel<=Rt.DEBUG){const e=t.map(ys);qt.debug(`Firestore (${fe}): ${n}`,...e)}}function wt(n,...t){if(qt.logLevel<=Rt.ERROR){const e=t.map(ys);qt.error(`Firestore (${fe}): ${n}`,...e)}}function se(n,...t){if(qt.logLevel<=Rt.WARN){const e=t.map(ys);qt.warn(`Firestore (${fe}): ${n}`,...e)}}function ys(n){if(typeof n=="string")return n;try{/**
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
*/return function(e){return JSON.stringify(e)}(n)}catch{return n}}/**
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
 */function v(n="Unexpected state"){const t=`FIRESTORE (${fe}) INTERNAL ASSERTION FAILED: `+n;throw wt(t),new Error(t)}function D(n,t){n||v()}function A(n,t){return n}/**
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
 */const f={OK:"ok",CANCELLED:"cancelled",UNKNOWN:"unknown",INVALID_ARGUMENT:"invalid-argument",DEADLINE_EXCEEDED:"deadline-exceeded",NOT_FOUND:"not-found",ALREADY_EXISTS:"already-exists",PERMISSION_DENIED:"permission-denied",UNAUTHENTICATED:"unauthenticated",RESOURCE_EXHAUSTED:"resource-exhausted",FAILED_PRECONDITION:"failed-precondition",ABORTED:"aborted",OUT_OF_RANGE:"out-of-range",UNIMPLEMENTED:"unimplemented",INTERNAL:"internal",UNAVAILABLE:"unavailable",DATA_LOSS:"data-loss"};class y extends pu{constructor(t,e){super(t,e),this.code=t,this.message=e,this.toString=()=>`${this.name}: [code=${this.code}]: ${this.message}`}}/**
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
 */class vt{constructor(){this.promise=new Promise((t,e)=>{this.resolve=t,this.reject=e})}}/**
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
 */class Qo{constructor(t,e){this.user=e,this.type="OAuth",this.headers=new Map,this.headers.set("Authorization",`Bearer ${t}`)}}class Cl{getToken(){return Promise.resolve(null)}invalidateToken(){}start(t,e){t.enqueueRetryable(()=>e(J.UNAUTHENTICATED))}shutdown(){}}class Dl{constructor(t){this.token=t,this.changeListener=null}getToken(){return Promise.resolve(this.token)}invalidateToken(){}start(t,e){this.changeListener=e,t.enqueueRetryable(()=>e(this.token.user))}shutdown(){this.changeListener=null}}class kl{constructor(t){this.t=t,this.currentUser=J.UNAUTHENTICATED,this.i=0,this.forceRefresh=!1,this.auth=null}start(t,e){let r=this.i;const s=u=>this.i!==r?(r=this.i,e(u)):Promise.resolve();let i=new vt;this.o=()=>{this.i++,this.currentUser=this.u(),i.resolve(),i=new vt,t.enqueueRetryable(()=>s(this.currentUser))};const o=()=>{const u=i;t.enqueueRetryable(async()=>{await u.promise,await s(this.currentUser)})},a=u=>{_("FirebaseAuthCredentialsProvider","Auth detected"),this.auth=u,this.auth.addAuthTokenListener(this.o),o()};this.t.onInit(u=>a(u)),setTimeout(()=>{if(!this.auth){const u=this.t.getImmediate({optional:!0});u?a(u):(_("FirebaseAuthCredentialsProvider","Auth not yet detected"),i.resolve(),i=new vt)}},0),o()}getToken(){const t=this.i,e=this.forceRefresh;return this.forceRefresh=!1,this.auth?this.auth.getToken(e).then(r=>this.i!==t?(_("FirebaseAuthCredentialsProvider","getToken aborted due to token change."),this.getToken()):r?(D(typeof r.accessToken=="string"),new Qo(r.accessToken,this.currentUser)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.auth&&this.auth.removeAuthTokenListener(this.o)}u(){const t=this.auth&&this.auth.getUid();return D(t===null||typeof t=="string"),new J(t)}}class Nl{constructor(t,e,r){this.l=t,this.h=e,this.P=r,this.type="FirstParty",this.user=J.FIRST_PARTY,this.I=new Map}T(){return this.P?this.P():null}get headers(){this.I.set("X-Goog-AuthUser",this.l);const t=this.T();return t&&this.I.set("Authorization",t),this.h&&this.I.set("X-Goog-Iam-Authorization-Token",this.h),this.I}}class xl{constructor(t,e,r){this.l=t,this.h=e,this.P=r}getToken(){return Promise.resolve(new Nl(this.l,this.h,this.P))}start(t,e){t.enqueueRetryable(()=>e(J.FIRST_PARTY))}shutdown(){}invalidateToken(){}}class Ml{constructor(t){this.value=t,this.type="AppCheck",this.headers=new Map,t&&t.length>0&&this.headers.set("x-firebase-appcheck",this.value)}}class Ol{constructor(t){this.A=t,this.forceRefresh=!1,this.appCheck=null,this.R=null}start(t,e){const r=i=>{i.error!=null&&_("FirebaseAppCheckTokenProvider",`Error getting App Check token; using placeholder token instead. Error: ${i.error.message}`);const o=i.token!==this.R;return this.R=i.token,_("FirebaseAppCheckTokenProvider",`Received ${o?"new":"existing"} token.`),o?e(i.token):Promise.resolve()};this.o=i=>{t.enqueueRetryable(()=>r(i))};const s=i=>{_("FirebaseAppCheckTokenProvider","AppCheck detected"),this.appCheck=i,this.appCheck.addTokenListener(this.o)};this.A.onInit(i=>s(i)),setTimeout(()=>{if(!this.appCheck){const i=this.A.getImmediate({optional:!0});i?s(i):_("FirebaseAppCheckTokenProvider","AppCheck not yet detected")}},0)}getToken(){const t=this.forceRefresh;return this.forceRefresh=!1,this.appCheck?this.appCheck.getToken(t).then(e=>e?(D(typeof e.token=="string"),this.R=e.token,new Ml(e.token)):null):Promise.resolve(null)}invalidateToken(){this.forceRefresh=!0}shutdown(){this.appCheck&&this.appCheck.removeTokenListener(this.o)}}/**
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
 */function Fl(n){const t=typeof self<"u"&&(self.crypto||self.msCrypto),e=new Uint8Array(n);if(t&&typeof t.getRandomValues=="function")t.getRandomValues(e);else for(let r=0;r<n;r++)e[r]=Math.floor(256*Math.random());return e}/**
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
 */class Wo{static newId(){const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",e=Math.floor(256/t.length)*t.length;let r="";for(;r.length<20;){const s=Fl(40);for(let i=0;i<s.length;++i)r.length<20&&s[i]<e&&(r+=t.charAt(s[i]%t.length))}return r}}function C(n,t){return n<t?-1:n>t?1:0}function ie(n,t,e){return n.length===t.length&&n.every((r,s)=>e(r,t[s]))}/**
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
 */class q{constructor(t,e){if(this.seconds=t,this.nanoseconds=e,e<0)throw new y(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(e>=1e9)throw new y(f.INVALID_ARGUMENT,"Timestamp nanoseconds out of range: "+e);if(t<-62135596800)throw new y(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t);if(t>=253402300800)throw new y(f.INVALID_ARGUMENT,"Timestamp seconds out of range: "+t)}static now(){return q.fromMillis(Date.now())}static fromDate(t){return q.fromMillis(t.getTime())}static fromMillis(t){const e=Math.floor(t/1e3),r=Math.floor(1e6*(t-1e3*e));return new q(e,r)}toDate(){return new Date(this.toMillis())}toMillis(){return 1e3*this.seconds+this.nanoseconds/1e6}_compareTo(t){return this.seconds===t.seconds?C(this.nanoseconds,t.nanoseconds):C(this.seconds,t.seconds)}isEqual(t){return t.seconds===this.seconds&&t.nanoseconds===this.nanoseconds}toString(){return"Timestamp(seconds="+this.seconds+", nanoseconds="+this.nanoseconds+")"}toJSON(){return{seconds:this.seconds,nanoseconds:this.nanoseconds}}valueOf(){const t=this.seconds- -62135596800;return String(t).padStart(12,"0")+"."+String(this.nanoseconds).padStart(9,"0")}}/**
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
 */class I{constructor(t){this.timestamp=t}static fromTimestamp(t){return new I(t)}static min(){return new I(new q(0,0))}static max(){return new I(new q(253402300799,999999999))}compareTo(t){return this.timestamp._compareTo(t.timestamp)}isEqual(t){return this.timestamp.isEqual(t.timestamp)}toMicroseconds(){return 1e6*this.timestamp.seconds+this.timestamp.nanoseconds/1e3}toString(){return"SnapshotVersion("+this.timestamp.toString()+")"}toTimestamp(){return this.timestamp}}/**
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
 */class Le{constructor(t,e,r){e===void 0?e=0:e>t.length&&v(),r===void 0?r=t.length-e:r>t.length-e&&v(),this.segments=t,this.offset=e,this.len=r}get length(){return this.len}isEqual(t){return Le.comparator(this,t)===0}child(t){const e=this.segments.slice(this.offset,this.limit());return t instanceof Le?t.forEach(r=>{e.push(r)}):e.push(t),this.construct(e)}limit(){return this.offset+this.length}popFirst(t){return t=t===void 0?1:t,this.construct(this.segments,this.offset+t,this.length-t)}popLast(){return this.construct(this.segments,this.offset,this.length-1)}firstSegment(){return this.segments[this.offset]}lastSegment(){return this.get(this.length-1)}get(t){return this.segments[this.offset+t]}isEmpty(){return this.length===0}isPrefixOf(t){if(t.length<this.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}isImmediateParentOf(t){if(this.length+1!==t.length)return!1;for(let e=0;e<this.length;e++)if(this.get(e)!==t.get(e))return!1;return!0}forEach(t){for(let e=this.offset,r=this.limit();e<r;e++)t(this.segments[e])}toArray(){return this.segments.slice(this.offset,this.limit())}static comparator(t,e){const r=Math.min(t.length,e.length);for(let s=0;s<r;s++){const i=t.get(s),o=e.get(s);if(i<o)return-1;if(i>o)return 1}return t.length<e.length?-1:t.length>e.length?1:0}}class M extends Le{construct(t,e,r){return new M(t,e,r)}canonicalString(){return this.toArray().join("/")}toString(){return this.canonicalString()}static fromString(...t){const e=[];for(const r of t){if(r.indexOf("//")>=0)throw new y(f.INVALID_ARGUMENT,`Invalid segment (${r}). Paths must not contain // in them.`);e.push(...r.split("/").filter(s=>s.length>0))}return new M(e)}static emptyPath(){return new M([])}}const Ll=/^[_a-zA-Z][_a-zA-Z0-9]*$/;class W extends Le{construct(t,e,r){return new W(t,e,r)}static isValidIdentifier(t){return Ll.test(t)}canonicalString(){return this.toArray().map(t=>(t=t.replace(/\\/g,"\\\\").replace(/`/g,"\\`"),W.isValidIdentifier(t)||(t="`"+t+"`"),t)).join(".")}toString(){return this.canonicalString()}isKeyField(){return this.length===1&&this.get(0)==="__name__"}static keyField(){return new W(["__name__"])}static fromServerFormat(t){const e=[];let r="",s=0;const i=()=>{if(r.length===0)throw new y(f.INVALID_ARGUMENT,`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`);e.push(r),r=""};let o=!1;for(;s<t.length;){const a=t[s];if(a==="\\"){if(s+1===t.length)throw new y(f.INVALID_ARGUMENT,"Path has trailing escape character: "+t);const u=t[s+1];if(u!=="\\"&&u!=="."&&u!=="`")throw new y(f.INVALID_ARGUMENT,"Path has invalid escape sequence: "+t);r+=u,s+=2}else a==="`"?(o=!o,s++):a!=="."||o?(r+=a,s++):(i(),s++)}if(i(),o)throw new y(f.INVALID_ARGUMENT,"Unterminated ` in path: "+t);return new W(e)}static emptyPath(){return new W([])}}/**
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
 */class E{constructor(t){this.path=t}static fromPath(t){return new E(M.fromString(t))}static fromName(t){return new E(M.fromString(t).popFirst(5))}static empty(){return new E(M.emptyPath())}get collectionGroup(){return this.path.popLast().lastSegment()}hasCollectionId(t){return this.path.length>=2&&this.path.get(this.path.length-2)===t}getCollectionGroup(){return this.path.get(this.path.length-2)}getCollectionPath(){return this.path.popLast()}isEqual(t){return t!==null&&M.comparator(this.path,t.path)===0}toString(){return this.path.toString()}static comparator(t,e){return M.comparator(t.path,e.path)}static isDocumentKey(t){return t.length%2==0}static fromSegments(t){return new E(new M(t.slice()))}}function bl(n,t){const e=n.toTimestamp().seconds,r=n.toTimestamp().nanoseconds+1,s=I.fromTimestamp(r===1e9?new q(e+1,0):new q(e,r));return new Dt(s,E.empty(),t)}function Ul(n){return new Dt(n.readTime,n.key,-1)}class Dt{constructor(t,e,r){this.readTime=t,this.documentKey=e,this.largestBatchId=r}static min(){return new Dt(I.min(),E.empty(),-1)}static max(){return new Dt(I.max(),E.empty(),-1)}}function ql(n,t){let e=n.readTime.compareTo(t.readTime);return e!==0?e:(e=E.comparator(n.documentKey,t.documentKey),e!==0?e:C(n.largestBatchId,t.largestBatchId))}/**
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
 */const Bl="The current tab is not in the required state to perform this operation. It might be necessary to refresh the browser tab.";class jl{constructor(){this.onCommittedListeners=[]}addOnCommittedListener(t){this.onCommittedListeners.push(t)}raiseOnCommittedEvent(){this.onCommittedListeners.forEach(t=>t())}}/**
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
 */async function Ze(n){if(n.code!==f.FAILED_PRECONDITION||n.message!==Bl)throw n;_("LocalStore","Unexpectedly lost primary lease")}/**
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
 */class m{constructor(t){this.nextCallback=null,this.catchCallback=null,this.result=void 0,this.error=void 0,this.isDone=!1,this.callbackAttached=!1,t(e=>{this.isDone=!0,this.result=e,this.nextCallback&&this.nextCallback(e)},e=>{this.isDone=!0,this.error=e,this.catchCallback&&this.catchCallback(e)})}catch(t){return this.next(void 0,t)}next(t,e){return this.callbackAttached&&v(),this.callbackAttached=!0,this.isDone?this.error?this.wrapFailure(e,this.error):this.wrapSuccess(t,this.result):new m((r,s)=>{this.nextCallback=i=>{this.wrapSuccess(t,i).next(r,s)},this.catchCallback=i=>{this.wrapFailure(e,i).next(r,s)}})}toPromise(){return new Promise((t,e)=>{this.next(t,e)})}wrapUserFunction(t){try{const e=t();return e instanceof m?e:m.resolve(e)}catch(e){return m.reject(e)}}wrapSuccess(t,e){return t?this.wrapUserFunction(()=>t(e)):m.resolve(e)}wrapFailure(t,e){return t?this.wrapUserFunction(()=>t(e)):m.reject(e)}static resolve(t){return new m((e,r)=>{e(t)})}static reject(t){return new m((e,r)=>{r(t)})}static waitFor(t){return new m((e,r)=>{let s=0,i=0,o=!1;t.forEach(a=>{++s,a.next(()=>{++i,o&&i===s&&e()},u=>r(u))}),o=!0,i===s&&e()})}static or(t){let e=m.resolve(!1);for(const r of t)e=e.next(s=>s?m.resolve(s):r());return e}static forEach(t,e){const r=[];return t.forEach((s,i)=>{r.push(e.call(this,s,i))}),this.waitFor(r)}static mapArray(t,e){return new m((r,s)=>{const i=t.length,o=new Array(i);let a=0;for(let u=0;u<i;u++){const l=u;e(t[l]).next(h=>{o[l]=h,++a,a===i&&r(o)},h=>s(h))}})}static doWhile(t,e){return new m((r,s)=>{const i=()=>{t()===!0?e().next(()=>{i()},s):r()};i()})}}function tn(n){return n.name==="IndexedDbTransactionError"}/**
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
 */class Es{constructor(t,e){this.previousValue=t,e&&(e.sequenceNumberHandler=r=>this.se(r),this.oe=r=>e.writeSequenceNumber(r))}se(t){return this.previousValue=Math.max(t,this.previousValue),this.previousValue}next(){const t=++this.previousValue;return this.oe&&this.oe(t),t}}Es._e=-1;function en(n){return n==null}function Dn(n){return n===0&&1/n==-1/0}function zl(n){return typeof n=="number"&&Number.isInteger(n)&&!Dn(n)&&n<=Number.MAX_SAFE_INTEGER&&n>=Number.MIN_SAFE_INTEGER}/**
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
 */function hi(n){let t=0;for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t++;return t}function $t(n,t){for(const e in n)Object.prototype.hasOwnProperty.call(n,e)&&t(e,n[e])}function Ho(n){for(const t in n)if(Object.prototype.hasOwnProperty.call(n,t))return!1;return!0}/**
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
 */class O{constructor(t,e){this.comparator=t,this.root=e||K.EMPTY}insert(t,e){return new O(this.comparator,this.root.insert(t,e,this.comparator).copy(null,null,K.BLACK,null,null))}remove(t){return new O(this.comparator,this.root.remove(t,this.comparator).copy(null,null,K.BLACK,null,null))}get(t){let e=this.root;for(;!e.isEmpty();){const r=this.comparator(t,e.key);if(r===0)return e.value;r<0?e=e.left:r>0&&(e=e.right)}return null}indexOf(t){let e=0,r=this.root;for(;!r.isEmpty();){const s=this.comparator(t,r.key);if(s===0)return e+r.left.size;s<0?r=r.left:(e+=r.left.size+1,r=r.right)}return-1}isEmpty(){return this.root.isEmpty()}get size(){return this.root.size}minKey(){return this.root.minKey()}maxKey(){return this.root.maxKey()}inorderTraversal(t){return this.root.inorderTraversal(t)}forEach(t){this.inorderTraversal((e,r)=>(t(e,r),!1))}toString(){const t=[];return this.inorderTraversal((e,r)=>(t.push(`${e}:${r}`),!1)),`{${t.join(", ")}}`}reverseTraversal(t){return this.root.reverseTraversal(t)}getIterator(){return new _n(this.root,null,this.comparator,!1)}getIteratorFrom(t){return new _n(this.root,t,this.comparator,!1)}getReverseIterator(){return new _n(this.root,null,this.comparator,!0)}getReverseIteratorFrom(t){return new _n(this.root,t,this.comparator,!0)}}class _n{constructor(t,e,r,s){this.isReverse=s,this.nodeStack=[];let i=1;for(;!t.isEmpty();)if(i=e?r(t.key,e):1,e&&s&&(i*=-1),i<0)t=this.isReverse?t.left:t.right;else{if(i===0){this.nodeStack.push(t);break}this.nodeStack.push(t),t=this.isReverse?t.right:t.left}}getNext(){let t=this.nodeStack.pop();const e={key:t.key,value:t.value};if(this.isReverse)for(t=t.left;!t.isEmpty();)this.nodeStack.push(t),t=t.right;else for(t=t.right;!t.isEmpty();)this.nodeStack.push(t),t=t.left;return e}hasNext(){return this.nodeStack.length>0}peek(){if(this.nodeStack.length===0)return null;const t=this.nodeStack[this.nodeStack.length-1];return{key:t.key,value:t.value}}}class K{constructor(t,e,r,s,i){this.key=t,this.value=e,this.color=r??K.RED,this.left=s??K.EMPTY,this.right=i??K.EMPTY,this.size=this.left.size+1+this.right.size}copy(t,e,r,s,i){return new K(t??this.key,e??this.value,r??this.color,s??this.left,i??this.right)}isEmpty(){return!1}inorderTraversal(t){return this.left.inorderTraversal(t)||t(this.key,this.value)||this.right.inorderTraversal(t)}reverseTraversal(t){return this.right.reverseTraversal(t)||t(this.key,this.value)||this.left.reverseTraversal(t)}min(){return this.left.isEmpty()?this:this.left.min()}minKey(){return this.min().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(t,e,r){let s=this;const i=r(t,s.key);return s=i<0?s.copy(null,null,null,s.left.insert(t,e,r),null):i===0?s.copy(null,e,null,null,null):s.copy(null,null,null,null,s.right.insert(t,e,r)),s.fixUp()}removeMin(){if(this.left.isEmpty())return K.EMPTY;let t=this;return t.left.isRed()||t.left.left.isRed()||(t=t.moveRedLeft()),t=t.copy(null,null,null,t.left.removeMin(),null),t.fixUp()}remove(t,e){let r,s=this;if(e(t,s.key)<0)s.left.isEmpty()||s.left.isRed()||s.left.left.isRed()||(s=s.moveRedLeft()),s=s.copy(null,null,null,s.left.remove(t,e),null);else{if(s.left.isRed()&&(s=s.rotateRight()),s.right.isEmpty()||s.right.isRed()||s.right.left.isRed()||(s=s.moveRedRight()),e(t,s.key)===0){if(s.right.isEmpty())return K.EMPTY;r=s.right.min(),s=s.copy(r.key,r.value,null,null,s.right.removeMin())}s=s.copy(null,null,null,null,s.right.remove(t,e))}return s.fixUp()}isRed(){return this.color}fixUp(){let t=this;return t.right.isRed()&&!t.left.isRed()&&(t=t.rotateLeft()),t.left.isRed()&&t.left.left.isRed()&&(t=t.rotateRight()),t.left.isRed()&&t.right.isRed()&&(t=t.colorFlip()),t}moveRedLeft(){let t=this.colorFlip();return t.right.left.isRed()&&(t=t.copy(null,null,null,null,t.right.rotateRight()),t=t.rotateLeft(),t=t.colorFlip()),t}moveRedRight(){let t=this.colorFlip();return t.left.left.isRed()&&(t=t.rotateRight(),t=t.colorFlip()),t}rotateLeft(){const t=this.copy(null,null,K.RED,null,this.right.left);return this.right.copy(null,null,this.color,t,null)}rotateRight(){const t=this.copy(null,null,K.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,t)}colorFlip(){const t=this.left.copy(null,null,!this.left.color,null,null),e=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,t,e)}checkMaxDepth(){const t=this.check();return Math.pow(2,t)<=this.size+1}check(){if(this.isRed()&&this.left.isRed()||this.right.isRed())throw v();const t=this.left.check();if(t!==this.right.check())throw v();return t+(this.isRed()?0:1)}}K.EMPTY=null,K.RED=!0,K.BLACK=!1;K.EMPTY=new class{constructor(){this.size=0}get key(){throw v()}get value(){throw v()}get color(){throw v()}get left(){throw v()}get right(){throw v()}copy(t,e,r,s,i){return this}insert(t,e,r){return new K(t,e)}remove(t,e){return this}isEmpty(){return!0}inorderTraversal(t){return!1}reverseTraversal(t){return!1}minKey(){return null}maxKey(){return null}isRed(){return!1}checkMaxDepth(){return!0}check(){return 0}};/**
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
 */class X{constructor(t){this.comparator=t,this.data=new O(this.comparator)}has(t){return this.data.get(t)!==null}first(){return this.data.minKey()}last(){return this.data.maxKey()}get size(){return this.data.size}indexOf(t){return this.data.indexOf(t)}forEach(t){this.data.inorderTraversal((e,r)=>(t(e),!1))}forEachInRange(t,e){const r=this.data.getIteratorFrom(t[0]);for(;r.hasNext();){const s=r.getNext();if(this.comparator(s.key,t[1])>=0)return;e(s.key)}}forEachWhile(t,e){let r;for(r=e!==void 0?this.data.getIteratorFrom(e):this.data.getIterator();r.hasNext();)if(!t(r.getNext().key))return}firstAfterOrEqual(t){const e=this.data.getIteratorFrom(t);return e.hasNext()?e.getNext().key:null}getIterator(){return new ci(this.data.getIterator())}getIteratorFrom(t){return new ci(this.data.getIteratorFrom(t))}add(t){return this.copy(this.data.remove(t).insert(t,!0))}delete(t){return this.has(t)?this.copy(this.data.remove(t)):this}isEmpty(){return this.data.isEmpty()}unionWith(t){let e=this;return e.size<t.size&&(e=t,t=this),t.forEach(r=>{e=e.add(r)}),e}isEqual(t){if(!(t instanceof X)||this.size!==t.size)return!1;const e=this.data.getIterator(),r=t.data.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(this.comparator(s,i)!==0)return!1}return!0}toArray(){const t=[];return this.forEach(e=>{t.push(e)}),t}toString(){const t=[];return this.forEach(e=>t.push(e)),"SortedSet("+t.toString()+")"}copy(t){const e=new X(this.comparator);return e.data=t,e}}class ci{constructor(t){this.iter=t}getNext(){return this.iter.getNext().key}hasNext(){return this.iter.hasNext()}}/**
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
 */class at{constructor(t){this.fields=t,t.sort(W.comparator)}static empty(){return new at([])}unionWith(t){let e=new X(W.comparator);for(const r of this.fields)e=e.add(r);for(const r of t)e=e.add(r);return new at(e.toArray())}covers(t){for(const e of this.fields)if(e.isPrefixOf(t))return!0;return!1}isEqual(t){return ie(this.fields,t.fields,(e,r)=>e.isEqual(r))}}/**
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
 */class Xo extends Error{constructor(){super(...arguments),this.name="Base64DecodeError"}}/**
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
 */class nt{constructor(t){this.binaryString=t}static fromBase64String(t){const e=function(s){try{return atob(s)}catch(i){throw typeof DOMException<"u"&&i instanceof DOMException?new Xo("Invalid base64 string: "+i):i}}(t);return new nt(e)}static fromUint8Array(t){const e=function(s){let i="";for(let o=0;o<s.length;++o)i+=String.fromCharCode(s[o]);return i}(t);return new nt(e)}[Symbol.iterator](){let t=0;return{next:()=>t<this.binaryString.length?{value:this.binaryString.charCodeAt(t++),done:!1}:{value:void 0,done:!0}}}toBase64(){return function(e){return btoa(e)}(this.binaryString)}toUint8Array(){return function(e){const r=new Uint8Array(e.length);for(let s=0;s<e.length;s++)r[s]=e.charCodeAt(s);return r}(this.binaryString)}approximateByteSize(){return 2*this.binaryString.length}compareTo(t){return C(this.binaryString,t.binaryString)}isEqual(t){return this.binaryString===t.binaryString}}nt.EMPTY_BYTE_STRING=new nt("");const Gl=new RegExp(/^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(?:\.(\d+))?Z$/);function kt(n){if(D(!!n),typeof n=="string"){let t=0;const e=Gl.exec(n);if(D(!!e),e[1]){let s=e[1];s=(s+"000000000").substr(0,9),t=Number(s)}const r=new Date(n);return{seconds:Math.floor(r.getTime()/1e3),nanos:t}}return{seconds:b(n.seconds),nanos:b(n.nanos)}}function b(n){return typeof n=="number"?n:typeof n=="string"?Number(n):0}function Bt(n){return typeof n=="string"?nt.fromBase64String(n):nt.fromUint8Array(n)}/**
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
 */function Ts(n){var t,e;return((e=(((t=n?.mapValue)===null||t===void 0?void 0:t.fields)||{}).__type__)===null||e===void 0?void 0:e.stringValue)==="server_timestamp"}function vs(n){const t=n.mapValue.fields.__previous_value__;return Ts(t)?vs(t):t}function be(n){const t=kt(n.mapValue.fields.__local_write_time__.timestampValue);return new q(t.seconds,t.nanos)}/**
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
 */class $l{constructor(t,e,r,s,i,o,a,u,l){this.databaseId=t,this.appId=e,this.persistenceKey=r,this.host=s,this.ssl=i,this.forceLongPolling=o,this.autoDetectLongPolling=a,this.longPollingOptions=u,this.useFetchStreams=l}}class Ue{constructor(t,e){this.projectId=t,this.database=e||"(default)"}static empty(){return new Ue("","")}get isDefaultDatabase(){return this.database==="(default)"}isEqual(t){return t instanceof Ue&&t.projectId===this.projectId&&t.database===this.database}}/**
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
 */const yn={mapValue:{fields:{__type__:{stringValue:"__max__"}}}};function jt(n){return"nullValue"in n?0:"booleanValue"in n?1:"integerValue"in n||"doubleValue"in n?2:"timestampValue"in n?3:"stringValue"in n?5:"bytesValue"in n?6:"referenceValue"in n?7:"geoPointValue"in n?8:"arrayValue"in n?9:"mapValue"in n?Ts(n)?4:Kl(n)?9007199254740991:10:v()}function _t(n,t){if(n===t)return!0;const e=jt(n);if(e!==jt(t))return!1;switch(e){case 0:case 9007199254740991:return!0;case 1:return n.booleanValue===t.booleanValue;case 4:return be(n).isEqual(be(t));case 3:return function(s,i){if(typeof s.timestampValue=="string"&&typeof i.timestampValue=="string"&&s.timestampValue.length===i.timestampValue.length)return s.timestampValue===i.timestampValue;const o=kt(s.timestampValue),a=kt(i.timestampValue);return o.seconds===a.seconds&&o.nanos===a.nanos}(n,t);case 5:return n.stringValue===t.stringValue;case 6:return function(s,i){return Bt(s.bytesValue).isEqual(Bt(i.bytesValue))}(n,t);case 7:return n.referenceValue===t.referenceValue;case 8:return function(s,i){return b(s.geoPointValue.latitude)===b(i.geoPointValue.latitude)&&b(s.geoPointValue.longitude)===b(i.geoPointValue.longitude)}(n,t);case 2:return function(s,i){if("integerValue"in s&&"integerValue"in i)return b(s.integerValue)===b(i.integerValue);if("doubleValue"in s&&"doubleValue"in i){const o=b(s.doubleValue),a=b(i.doubleValue);return o===a?Dn(o)===Dn(a):isNaN(o)&&isNaN(a)}return!1}(n,t);case 9:return ie(n.arrayValue.values||[],t.arrayValue.values||[],_t);case 10:return function(s,i){const o=s.mapValue.fields||{},a=i.mapValue.fields||{};if(hi(o)!==hi(a))return!1;for(const u in o)if(o.hasOwnProperty(u)&&(a[u]===void 0||!_t(o[u],a[u])))return!1;return!0}(n,t);default:return v()}}function qe(n,t){return(n.values||[]).find(e=>_t(e,t))!==void 0}function oe(n,t){if(n===t)return 0;const e=jt(n),r=jt(t);if(e!==r)return C(e,r);switch(e){case 0:case 9007199254740991:return 0;case 1:return C(n.booleanValue,t.booleanValue);case 2:return function(i,o){const a=b(i.integerValue||i.doubleValue),u=b(o.integerValue||o.doubleValue);return a<u?-1:a>u?1:a===u?0:isNaN(a)?isNaN(u)?0:-1:1}(n,t);case 3:return di(n.timestampValue,t.timestampValue);case 4:return di(be(n),be(t));case 5:return C(n.stringValue,t.stringValue);case 6:return function(i,o){const a=Bt(i),u=Bt(o);return a.compareTo(u)}(n.bytesValue,t.bytesValue);case 7:return function(i,o){const a=i.split("/"),u=o.split("/");for(let l=0;l<a.length&&l<u.length;l++){const h=C(a[l],u[l]);if(h!==0)return h}return C(a.length,u.length)}(n.referenceValue,t.referenceValue);case 8:return function(i,o){const a=C(b(i.latitude),b(o.latitude));return a!==0?a:C(b(i.longitude),b(o.longitude))}(n.geoPointValue,t.geoPointValue);case 9:return function(i,o){const a=i.values||[],u=o.values||[];for(let l=0;l<a.length&&l<u.length;++l){const h=oe(a[l],u[l]);if(h)return h}return C(a.length,u.length)}(n.arrayValue,t.arrayValue);case 10:return function(i,o){if(i===yn.mapValue&&o===yn.mapValue)return 0;if(i===yn.mapValue)return 1;if(o===yn.mapValue)return-1;const a=i.fields||{},u=Object.keys(a),l=o.fields||{},h=Object.keys(l);u.sort(),h.sort();for(let c=0;c<u.length&&c<h.length;++c){const d=C(u[c],h[c]);if(d!==0)return d;const g=oe(a[u[c]],l[h[c]]);if(g!==0)return g}return C(u.length,h.length)}(n.mapValue,t.mapValue);default:throw v()}}function di(n,t){if(typeof n=="string"&&typeof t=="string"&&n.length===t.length)return C(n,t);const e=kt(n),r=kt(t),s=C(e.seconds,r.seconds);return s!==0?s:C(e.nanos,r.nanos)}function ae(n){return Ur(n)}function Ur(n){return"nullValue"in n?"null":"booleanValue"in n?""+n.booleanValue:"integerValue"in n?""+n.integerValue:"doubleValue"in n?""+n.doubleValue:"timestampValue"in n?function(e){const r=kt(e);return`time(${r.seconds},${r.nanos})`}(n.timestampValue):"stringValue"in n?n.stringValue:"bytesValue"in n?function(e){return Bt(e).toBase64()}(n.bytesValue):"referenceValue"in n?function(e){return E.fromName(e).toString()}(n.referenceValue):"geoPointValue"in n?function(e){return`geo(${e.latitude},${e.longitude})`}(n.geoPointValue):"arrayValue"in n?function(e){let r="[",s=!0;for(const i of e.values||[])s?s=!1:r+=",",r+=Ur(i);return r+"]"}(n.arrayValue):"mapValue"in n?function(e){const r=Object.keys(e.fields||{}).sort();let s="{",i=!0;for(const o of r)i?i=!1:s+=",",s+=`${o}:${Ur(e.fields[o])}`;return s+"}"}(n.mapValue):v()}function qr(n){return!!n&&"integerValue"in n}function Is(n){return!!n&&"arrayValue"in n}function fi(n){return!!n&&"nullValue"in n}function mi(n){return!!n&&"doubleValue"in n&&isNaN(Number(n.doubleValue))}function Tn(n){return!!n&&"mapValue"in n}function Ae(n){if(n.geoPointValue)return{geoPointValue:Object.assign({},n.geoPointValue)};if(n.timestampValue&&typeof n.timestampValue=="object")return{timestampValue:Object.assign({},n.timestampValue)};if(n.mapValue){const t={mapValue:{fields:{}}};return $t(n.mapValue.fields,(e,r)=>t.mapValue.fields[e]=Ae(r)),t}if(n.arrayValue){const t={arrayValue:{values:[]}};for(let e=0;e<(n.arrayValue.values||[]).length;++e)t.arrayValue.values[e]=Ae(n.arrayValue.values[e]);return t}return Object.assign({},n)}function Kl(n){return(((n.mapValue||{}).fields||{}).__type__||{}).stringValue==="__max__"}/**
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
 */class rt{constructor(t){this.value=t}static empty(){return new rt({mapValue:{}})}field(t){if(t.isEmpty())return this.value;{let e=this.value;for(let r=0;r<t.length-1;++r)if(e=(e.mapValue.fields||{})[t.get(r)],!Tn(e))return null;return e=(e.mapValue.fields||{})[t.lastSegment()],e||null}}set(t,e){this.getFieldsMap(t.popLast())[t.lastSegment()]=Ae(e)}setAll(t){let e=W.emptyPath(),r={},s=[];t.forEach((o,a)=>{if(!e.isImmediateParentOf(a)){const u=this.getFieldsMap(e);this.applyChanges(u,r,s),r={},s=[],e=a.popLast()}o?r[a.lastSegment()]=Ae(o):s.push(a.lastSegment())});const i=this.getFieldsMap(e);this.applyChanges(i,r,s)}delete(t){const e=this.field(t.popLast());Tn(e)&&e.mapValue.fields&&delete e.mapValue.fields[t.lastSegment()]}isEqual(t){return _t(this.value,t.value)}getFieldsMap(t){let e=this.value;e.mapValue.fields||(e.mapValue={fields:{}});for(let r=0;r<t.length;++r){let s=e.mapValue.fields[t.get(r)];Tn(s)&&s.mapValue.fields||(s={mapValue:{fields:{}}},e.mapValue.fields[t.get(r)]=s),e=s}return e.mapValue.fields}applyChanges(t,e,r){$t(e,(s,i)=>t[s]=i);for(const s of r)delete t[s]}clone(){return new rt(Ae(this.value))}}function Yo(n){const t=[];return $t(n.fields,(e,r)=>{const s=new W([e]);if(Tn(r)){const i=Yo(r.mapValue).fields;if(i.length===0)t.push(s);else for(const o of i)t.push(s.child(o))}else t.push(s)}),new at(t)}/**
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
 */class j{constructor(t,e,r,s,i,o,a){this.key=t,this.documentType=e,this.version=r,this.readTime=s,this.createTime=i,this.data=o,this.documentState=a}static newInvalidDocument(t){return new j(t,0,I.min(),I.min(),I.min(),rt.empty(),0)}static newFoundDocument(t,e,r,s){return new j(t,1,e,I.min(),r,s,0)}static newNoDocument(t,e){return new j(t,2,e,I.min(),I.min(),rt.empty(),0)}static newUnknownDocument(t,e){return new j(t,3,e,I.min(),I.min(),rt.empty(),2)}convertToFoundDocument(t,e){return!this.createTime.isEqual(I.min())||this.documentType!==2&&this.documentType!==0||(this.createTime=t),this.version=t,this.documentType=1,this.data=e,this.documentState=0,this}convertToNoDocument(t){return this.version=t,this.documentType=2,this.data=rt.empty(),this.documentState=0,this}convertToUnknownDocument(t){return this.version=t,this.documentType=3,this.data=rt.empty(),this.documentState=2,this}setHasCommittedMutations(){return this.documentState=2,this}setHasLocalMutations(){return this.documentState=1,this.version=I.min(),this}setReadTime(t){return this.readTime=t,this}get hasLocalMutations(){return this.documentState===1}get hasCommittedMutations(){return this.documentState===2}get hasPendingWrites(){return this.hasLocalMutations||this.hasCommittedMutations}isValidDocument(){return this.documentType!==0}isFoundDocument(){return this.documentType===1}isNoDocument(){return this.documentType===2}isUnknownDocument(){return this.documentType===3}isEqual(t){return t instanceof j&&this.key.isEqual(t.key)&&this.version.isEqual(t.version)&&this.documentType===t.documentType&&this.documentState===t.documentState&&this.data.isEqual(t.data)}mutableCopy(){return new j(this.key,this.documentType,this.version,this.readTime,this.createTime,this.data.clone(),this.documentState)}toString(){return`Document(${this.key}, ${this.version}, ${JSON.stringify(this.data.value)}, {createTime: ${this.createTime}}), {documentType: ${this.documentType}}), {documentState: ${this.documentState}})`}}/**
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
 */class kn{constructor(t,e){this.position=t,this.inclusive=e}}function gi(n,t,e){let r=0;for(let s=0;s<n.position.length;s++){const i=t[s],o=n.position[s];if(i.field.isKeyField()?r=E.comparator(E.fromName(o.referenceValue),e.key):r=oe(o,e.data.field(i.field)),i.dir==="desc"&&(r*=-1),r!==0)break}return r}function pi(n,t){if(n===null)return t===null;if(t===null||n.inclusive!==t.inclusive||n.position.length!==t.position.length)return!1;for(let e=0;e<n.position.length;e++)if(!_t(n.position[e],t.position[e]))return!1;return!0}/**
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
 */class Nn{constructor(t,e="asc"){this.field=t,this.dir=e}}function Ql(n,t){return n.dir===t.dir&&n.field.isEqual(t.field)}/**
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
 */class Jo{}class U extends Jo{constructor(t,e,r){super(),this.field=t,this.op=e,this.value=r}static create(t,e,r){return t.isKeyField()?e==="in"||e==="not-in"?this.createKeyFieldInFilter(t,e,r):new Hl(t,e,r):e==="array-contains"?new Jl(t,r):e==="in"?new Zl(t,r):e==="not-in"?new th(t,r):e==="array-contains-any"?new eh(t,r):new U(t,e,r)}static createKeyFieldInFilter(t,e,r){return e==="in"?new Xl(t,r):new Yl(t,r)}matches(t){const e=t.data.field(this.field);return this.op==="!="?e!==null&&this.matchesComparison(oe(e,this.value)):e!==null&&jt(this.value)===jt(e)&&this.matchesComparison(oe(e,this.value))}matchesComparison(t){switch(this.op){case"<":return t<0;case"<=":return t<=0;case"==":return t===0;case"!=":return t!==0;case">":return t>0;case">=":return t>=0;default:return v()}}isInequality(){return["<","<=",">",">=","!=","not-in"].indexOf(this.op)>=0}getFlattenedFilters(){return[this]}getFilters(){return[this]}}class yt extends Jo{constructor(t,e){super(),this.filters=t,this.op=e,this.ue=null}static create(t,e){return new yt(t,e)}matches(t){return Zo(this)?this.filters.find(e=>!e.matches(t))===void 0:this.filters.find(e=>e.matches(t))!==void 0}getFlattenedFilters(){return this.ue!==null||(this.ue=this.filters.reduce((t,e)=>t.concat(e.getFlattenedFilters()),[])),this.ue}getFilters(){return Object.assign([],this.filters)}}function Zo(n){return n.op==="and"}function ta(n){return Wl(n)&&Zo(n)}function Wl(n){for(const t of n.filters)if(t instanceof yt)return!1;return!0}function Br(n){if(n instanceof U)return n.field.canonicalString()+n.op.toString()+ae(n.value);if(ta(n))return n.filters.map(t=>Br(t)).join(",");{const t=n.filters.map(e=>Br(e)).join(",");return`${n.op}(${t})`}}function ea(n,t){return n instanceof U?function(r,s){return s instanceof U&&r.op===s.op&&r.field.isEqual(s.field)&&_t(r.value,s.value)}(n,t):n instanceof yt?function(r,s){return s instanceof yt&&r.op===s.op&&r.filters.length===s.filters.length?r.filters.reduce((i,o,a)=>i&&ea(o,s.filters[a]),!0):!1}(n,t):void v()}function na(n){return n instanceof U?function(e){return`${e.field.canonicalString()} ${e.op} ${ae(e.value)}`}(n):n instanceof yt?function(e){return e.op.toString()+" {"+e.getFilters().map(na).join(" ,")+"}"}(n):"Filter"}class Hl extends U{constructor(t,e,r){super(t,e,r),this.key=E.fromName(r.referenceValue)}matches(t){const e=E.comparator(t.key,this.key);return this.matchesComparison(e)}}class Xl extends U{constructor(t,e){super(t,"in",e),this.keys=ra("in",e)}matches(t){return this.keys.some(e=>e.isEqual(t.key))}}class Yl extends U{constructor(t,e){super(t,"not-in",e),this.keys=ra("not-in",e)}matches(t){return!this.keys.some(e=>e.isEqual(t.key))}}function ra(n,t){var e;return(((e=t.arrayValue)===null||e===void 0?void 0:e.values)||[]).map(r=>E.fromName(r.referenceValue))}class Jl extends U{constructor(t,e){super(t,"array-contains",e)}matches(t){const e=t.data.field(this.field);return Is(e)&&qe(e.arrayValue,this.value)}}class Zl extends U{constructor(t,e){super(t,"in",e)}matches(t){const e=t.data.field(this.field);return e!==null&&qe(this.value.arrayValue,e)}}class th extends U{constructor(t,e){super(t,"not-in",e)}matches(t){if(qe(this.value.arrayValue,{nullValue:"NULL_VALUE"}))return!1;const e=t.data.field(this.field);return e!==null&&!qe(this.value.arrayValue,e)}}class eh extends U{constructor(t,e){super(t,"array-contains-any",e)}matches(t){const e=t.data.field(this.field);return!(!Is(e)||!e.arrayValue.values)&&e.arrayValue.values.some(r=>qe(this.value.arrayValue,r))}}/**
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
 */class nh{constructor(t,e=null,r=[],s=[],i=null,o=null,a=null){this.path=t,this.collectionGroup=e,this.orderBy=r,this.filters=s,this.limit=i,this.startAt=o,this.endAt=a,this.ce=null}}function _i(n,t=null,e=[],r=[],s=null,i=null,o=null){return new nh(n,t,e,r,s,i,o)}function ws(n){const t=A(n);if(t.ce===null){let e=t.path.canonicalString();t.collectionGroup!==null&&(e+="|cg:"+t.collectionGroup),e+="|f:",e+=t.filters.map(r=>Br(r)).join(","),e+="|ob:",e+=t.orderBy.map(r=>function(i){return i.field.canonicalString()+i.dir}(r)).join(","),en(t.limit)||(e+="|l:",e+=t.limit),t.startAt&&(e+="|lb:",e+=t.startAt.inclusive?"b:":"a:",e+=t.startAt.position.map(r=>ae(r)).join(",")),t.endAt&&(e+="|ub:",e+=t.endAt.inclusive?"a:":"b:",e+=t.endAt.position.map(r=>ae(r)).join(",")),t.ce=e}return t.ce}function As(n,t){if(n.limit!==t.limit||n.orderBy.length!==t.orderBy.length)return!1;for(let e=0;e<n.orderBy.length;e++)if(!Ql(n.orderBy[e],t.orderBy[e]))return!1;if(n.filters.length!==t.filters.length)return!1;for(let e=0;e<n.filters.length;e++)if(!ea(n.filters[e],t.filters[e]))return!1;return n.collectionGroup===t.collectionGroup&&!!n.path.isEqual(t.path)&&!!pi(n.startAt,t.startAt)&&pi(n.endAt,t.endAt)}function jr(n){return E.isDocumentKey(n.path)&&n.collectionGroup===null&&n.filters.length===0}/**
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
 */class er{constructor(t,e=null,r=[],s=[],i=null,o="F",a=null,u=null){this.path=t,this.collectionGroup=e,this.explicitOrderBy=r,this.filters=s,this.limit=i,this.limitType=o,this.startAt=a,this.endAt=u,this.le=null,this.he=null,this.Pe=null,this.startAt,this.endAt}}function rh(n,t,e,r,s,i,o,a){return new er(n,t,e,r,s,i,o,a)}function nr(n){return new er(n)}function yi(n){return n.filters.length===0&&n.limit===null&&n.startAt==null&&n.endAt==null&&(n.explicitOrderBy.length===0||n.explicitOrderBy.length===1&&n.explicitOrderBy[0].field.isKeyField())}function sh(n){return n.collectionGroup!==null}function Re(n){const t=A(n);if(t.le===null){t.le=[];const e=new Set;for(const i of t.explicitOrderBy)t.le.push(i),e.add(i.field.canonicalString());const r=t.explicitOrderBy.length>0?t.explicitOrderBy[t.explicitOrderBy.length-1].dir:"asc";(function(o){let a=new X(W.comparator);return o.filters.forEach(u=>{u.getFlattenedFilters().forEach(l=>{l.isInequality()&&(a=a.add(l.field))})}),a})(t).forEach(i=>{e.has(i.canonicalString())||i.isKeyField()||t.le.push(new Nn(i,r))}),e.has(W.keyField().canonicalString())||t.le.push(new Nn(W.keyField(),r))}return t.le}function pt(n){const t=A(n);return t.he||(t.he=ih(t,Re(n))),t.he}function ih(n,t){if(n.limitType==="F")return _i(n.path,n.collectionGroup,t,n.filters,n.limit,n.startAt,n.endAt);{t=t.map(s=>{const i=s.dir==="desc"?"asc":"desc";return new Nn(s.field,i)});const e=n.endAt?new kn(n.endAt.position,n.endAt.inclusive):null,r=n.startAt?new kn(n.startAt.position,n.startAt.inclusive):null;return _i(n.path,n.collectionGroup,t,n.filters,n.limit,e,r)}}function zr(n,t,e){return new er(n.path,n.collectionGroup,n.explicitOrderBy.slice(),n.filters.slice(),t,e,n.startAt,n.endAt)}function rr(n,t){return As(pt(n),pt(t))&&n.limitType===t.limitType}function sa(n){return`${ws(pt(n))}|lt:${n.limitType}`}function Ht(n){return`Query(target=${function(e){let r=e.path.canonicalString();return e.collectionGroup!==null&&(r+=" collectionGroup="+e.collectionGroup),e.filters.length>0&&(r+=`, filters: [${e.filters.map(s=>na(s)).join(", ")}]`),en(e.limit)||(r+=", limit: "+e.limit),e.orderBy.length>0&&(r+=`, orderBy: [${e.orderBy.map(s=>function(o){return`${o.field.canonicalString()} (${o.dir})`}(s)).join(", ")}]`),e.startAt&&(r+=", startAt: ",r+=e.startAt.inclusive?"b:":"a:",r+=e.startAt.position.map(s=>ae(s)).join(",")),e.endAt&&(r+=", endAt: ",r+=e.endAt.inclusive?"a:":"b:",r+=e.endAt.position.map(s=>ae(s)).join(",")),`Target(${r})`}(pt(n))}; limitType=${n.limitType})`}function sr(n,t){return t.isFoundDocument()&&function(r,s){const i=s.key.path;return r.collectionGroup!==null?s.key.hasCollectionId(r.collectionGroup)&&r.path.isPrefixOf(i):E.isDocumentKey(r.path)?r.path.isEqual(i):r.path.isImmediateParentOf(i)}(n,t)&&function(r,s){for(const i of Re(r))if(!i.field.isKeyField()&&s.data.field(i.field)===null)return!1;return!0}(n,t)&&function(r,s){for(const i of r.filters)if(!i.matches(s))return!1;return!0}(n,t)&&function(r,s){return!(r.startAt&&!function(o,a,u){const l=gi(o,a,u);return o.inclusive?l<=0:l<0}(r.startAt,Re(r),s)||r.endAt&&!function(o,a,u){const l=gi(o,a,u);return o.inclusive?l>=0:l>0}(r.endAt,Re(r),s))}(n,t)}function oh(n){return n.collectionGroup||(n.path.length%2==1?n.path.lastSegment():n.path.get(n.path.length-2))}function ia(n){return(t,e)=>{let r=!1;for(const s of Re(n)){const i=ah(s,t,e);if(i!==0)return i;r=r||s.field.isKeyField()}return 0}}function ah(n,t,e){const r=n.field.isKeyField()?E.comparator(t.key,e.key):function(i,o,a){const u=o.data.field(i),l=a.data.field(i);return u!==null&&l!==null?oe(u,l):v()}(n.field,t,e);switch(n.dir){case"asc":return r;case"desc":return-1*r;default:return v()}}/**
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
 */class me{constructor(t,e){this.mapKeyFn=t,this.equalsFn=e,this.inner={},this.innerSize=0}get(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r!==void 0){for(const[s,i]of r)if(this.equalsFn(s,t))return i}}has(t){return this.get(t)!==void 0}set(t,e){const r=this.mapKeyFn(t),s=this.inner[r];if(s===void 0)return this.inner[r]=[[t,e]],void this.innerSize++;for(let i=0;i<s.length;i++)if(this.equalsFn(s[i][0],t))return void(s[i]=[t,e]);s.push([t,e]),this.innerSize++}delete(t){const e=this.mapKeyFn(t),r=this.inner[e];if(r===void 0)return!1;for(let s=0;s<r.length;s++)if(this.equalsFn(r[s][0],t))return r.length===1?delete this.inner[e]:r.splice(s,1),this.innerSize--,!0;return!1}forEach(t){$t(this.inner,(e,r)=>{for(const[s,i]of r)t(s,i)})}isEmpty(){return Ho(this.inner)}size(){return this.innerSize}}/**
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
 */const uh=new O(E.comparator);function At(){return uh}const oa=new O(E.comparator);function ve(...n){let t=oa;for(const e of n)t=t.insert(e.key,e);return t}function aa(n){let t=oa;return n.forEach((e,r)=>t=t.insert(e,r.overlayedDocument)),t}function bt(){return Pe()}function ua(){return Pe()}function Pe(){return new me(n=>n.toString(),(n,t)=>n.isEqual(t))}const lh=new O(E.comparator),hh=new X(E.comparator);function V(...n){let t=hh;for(const e of n)t=t.add(e);return t}const ch=new X(C);function dh(){return ch}/**
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
 */function la(n,t){if(n.useProto3Json){if(isNaN(t))return{doubleValue:"NaN"};if(t===1/0)return{doubleValue:"Infinity"};if(t===-1/0)return{doubleValue:"-Infinity"}}return{doubleValue:Dn(t)?"-0":t}}function ha(n){return{integerValue:""+n}}function ca(n,t){return zl(t)?ha(t):la(n,t)}/**
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
 */class ir{constructor(){this._=void 0}}function fh(n,t,e){return n instanceof xn?function(s,i){const o={fields:{__type__:{stringValue:"server_timestamp"},__local_write_time__:{timestampValue:{seconds:s.seconds,nanos:s.nanoseconds}}}};return i&&Ts(i)&&(i=vs(i)),i&&(o.fields.__previous_value__=i),{mapValue:o}}(e,t):n instanceof Be?fa(n,t):n instanceof je?ma(n,t):function(s,i){const o=da(s,i),a=Ei(o)+Ei(s.Ie);return qr(o)&&qr(s.Ie)?ha(a):la(s.serializer,a)}(n,t)}function mh(n,t,e){return n instanceof Be?fa(n,t):n instanceof je?ma(n,t):e}function da(n,t){return n instanceof ze?function(r){return qr(r)||function(i){return!!i&&"doubleValue"in i}(r)}(t)?t:{integerValue:0}:null}class xn extends ir{}class Be extends ir{constructor(t){super(),this.elements=t}}function fa(n,t){const e=ga(t);for(const r of n.elements)e.some(s=>_t(s,r))||e.push(r);return{arrayValue:{values:e}}}class je extends ir{constructor(t){super(),this.elements=t}}function ma(n,t){let e=ga(t);for(const r of n.elements)e=e.filter(s=>!_t(s,r));return{arrayValue:{values:e}}}class ze extends ir{constructor(t,e){super(),this.serializer=t,this.Ie=e}}function Ei(n){return b(n.integerValue||n.doubleValue)}function ga(n){return Is(n)&&n.arrayValue.values?n.arrayValue.values.slice():[]}/**
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
 */class gh{constructor(t,e){this.field=t,this.transform=e}}function ph(n,t){return n.field.isEqual(t.field)&&function(r,s){return r instanceof Be&&s instanceof Be||r instanceof je&&s instanceof je?ie(r.elements,s.elements,_t):r instanceof ze&&s instanceof ze?_t(r.Ie,s.Ie):r instanceof xn&&s instanceof xn}(n.transform,t.transform)}class _h{constructor(t,e){this.version=t,this.transformResults=e}}class Z{constructor(t,e){this.updateTime=t,this.exists=e}static none(){return new Z}static exists(t){return new Z(void 0,t)}static updateTime(t){return new Z(t)}get isNone(){return this.updateTime===void 0&&this.exists===void 0}isEqual(t){return this.exists===t.exists&&(this.updateTime?!!t.updateTime&&this.updateTime.isEqual(t.updateTime):!t.updateTime)}}function vn(n,t){return n.updateTime!==void 0?t.isFoundDocument()&&t.version.isEqual(n.updateTime):n.exists===void 0||n.exists===t.isFoundDocument()}class or{}function pa(n,t){if(!n.hasLocalMutations||t&&t.fields.length===0)return null;if(t===null)return n.isNoDocument()?new ar(n.key,Z.none()):new nn(n.key,n.data,Z.none());{const e=n.data,r=rt.empty();let s=new X(W.comparator);for(let i of t.fields)if(!s.has(i)){let o=e.field(i);o===null&&i.length>1&&(i=i.popLast(),o=e.field(i)),o===null?r.delete(i):r.set(i,o),s=s.add(i)}return new Ot(n.key,r,new at(s.toArray()),Z.none())}}function yh(n,t,e){n instanceof nn?function(s,i,o){const a=s.value.clone(),u=vi(s.fieldTransforms,i,o.transformResults);a.setAll(u),i.convertToFoundDocument(o.version,a).setHasCommittedMutations()}(n,t,e):n instanceof Ot?function(s,i,o){if(!vn(s.precondition,i))return void i.convertToUnknownDocument(o.version);const a=vi(s.fieldTransforms,i,o.transformResults),u=i.data;u.setAll(_a(s)),u.setAll(a),i.convertToFoundDocument(o.version,u).setHasCommittedMutations()}(n,t,e):function(s,i,o){i.convertToNoDocument(o.version).setHasCommittedMutations()}(0,t,e)}function Ve(n,t,e,r){return n instanceof nn?function(i,o,a,u){if(!vn(i.precondition,o))return a;const l=i.value.clone(),h=Ii(i.fieldTransforms,u,o);return l.setAll(h),o.convertToFoundDocument(o.version,l).setHasLocalMutations(),null}(n,t,e,r):n instanceof Ot?function(i,o,a,u){if(!vn(i.precondition,o))return a;const l=Ii(i.fieldTransforms,u,o),h=o.data;return h.setAll(_a(i)),h.setAll(l),o.convertToFoundDocument(o.version,h).setHasLocalMutations(),a===null?null:a.unionWith(i.fieldMask.fields).unionWith(i.fieldTransforms.map(c=>c.field))}(n,t,e,r):function(i,o,a){return vn(i.precondition,o)?(o.convertToNoDocument(o.version).setHasLocalMutations(),null):a}(n,t,e)}function Eh(n,t){let e=null;for(const r of n.fieldTransforms){const s=t.data.field(r.field),i=da(r.transform,s||null);i!=null&&(e===null&&(e=rt.empty()),e.set(r.field,i))}return e||null}function Ti(n,t){return n.type===t.type&&!!n.key.isEqual(t.key)&&!!n.precondition.isEqual(t.precondition)&&!!function(r,s){return r===void 0&&s===void 0||!(!r||!s)&&ie(r,s,(i,o)=>ph(i,o))}(n.fieldTransforms,t.fieldTransforms)&&(n.type===0?n.value.isEqual(t.value):n.type!==1||n.data.isEqual(t.data)&&n.fieldMask.isEqual(t.fieldMask))}class nn extends or{constructor(t,e,r,s=[]){super(),this.key=t,this.value=e,this.precondition=r,this.fieldTransforms=s,this.type=0}getFieldMask(){return null}}class Ot extends or{constructor(t,e,r,s,i=[]){super(),this.key=t,this.data=e,this.fieldMask=r,this.precondition=s,this.fieldTransforms=i,this.type=1}getFieldMask(){return this.fieldMask}}function _a(n){const t=new Map;return n.fieldMask.fields.forEach(e=>{if(!e.isEmpty()){const r=n.data.field(e);t.set(e,r)}}),t}function vi(n,t,e){const r=new Map;D(n.length===e.length);for(let s=0;s<e.length;s++){const i=n[s],o=i.transform,a=t.data.field(i.field);r.set(i.field,mh(o,a,e[s]))}return r}function Ii(n,t,e){const r=new Map;for(const s of n){const i=s.transform,o=e.data.field(s.field);r.set(s.field,fh(i,o,t))}return r}class ar extends or{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=2,this.fieldTransforms=[]}getFieldMask(){return null}}class ya extends or{constructor(t,e){super(),this.key=t,this.precondition=e,this.type=3,this.fieldTransforms=[]}getFieldMask(){return null}}/**
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
 */class Th{constructor(t,e,r,s){this.batchId=t,this.localWriteTime=e,this.baseMutations=r,this.mutations=s}applyToRemoteDocument(t,e){const r=e.mutationResults;for(let s=0;s<this.mutations.length;s++){const i=this.mutations[s];i.key.isEqual(t.key)&&yh(i,t,r[s])}}applyToLocalView(t,e){for(const r of this.baseMutations)r.key.isEqual(t.key)&&(e=Ve(r,t,e,this.localWriteTime));for(const r of this.mutations)r.key.isEqual(t.key)&&(e=Ve(r,t,e,this.localWriteTime));return e}applyToLocalDocumentSet(t,e){const r=ua();return this.mutations.forEach(s=>{const i=t.get(s.key),o=i.overlayedDocument;let a=this.applyToLocalView(o,i.mutatedFields);a=e.has(s.key)?null:a;const u=pa(o,a);u!==null&&r.set(s.key,u),o.isValidDocument()||o.convertToNoDocument(I.min())}),r}keys(){return this.mutations.reduce((t,e)=>t.add(e.key),V())}isEqual(t){return this.batchId===t.batchId&&ie(this.mutations,t.mutations,(e,r)=>Ti(e,r))&&ie(this.baseMutations,t.baseMutations,(e,r)=>Ti(e,r))}}class Rs{constructor(t,e,r,s){this.batch=t,this.commitVersion=e,this.mutationResults=r,this.docVersions=s}static from(t,e,r){D(t.mutations.length===r.length);let s=function(){return lh}();const i=t.mutations;for(let o=0;o<i.length;o++)s=s.insert(i[o].key,r[o].version);return new Rs(t,e,r,s)}}/**
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
 */class vh{constructor(t,e){this.largestBatchId=t,this.mutation=e}getKey(){return this.mutation.key}isEqual(t){return t!==null&&this.mutation===t.mutation}toString(){return`Overlay{
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
 */class Ih{constructor(t,e){this.count=t,this.unchangedNames=e}}/**
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
 */var L,S;function Ea(n){switch(n){default:return v();case f.CANCELLED:case f.UNKNOWN:case f.DEADLINE_EXCEEDED:case f.RESOURCE_EXHAUSTED:case f.INTERNAL:case f.UNAVAILABLE:case f.UNAUTHENTICATED:return!1;case f.INVALID_ARGUMENT:case f.NOT_FOUND:case f.ALREADY_EXISTS:case f.PERMISSION_DENIED:case f.FAILED_PRECONDITION:case f.ABORTED:case f.OUT_OF_RANGE:case f.UNIMPLEMENTED:case f.DATA_LOSS:return!0}}function Ta(n){if(n===void 0)return wt("GRPC error has no .code"),f.UNKNOWN;switch(n){case L.OK:return f.OK;case L.CANCELLED:return f.CANCELLED;case L.UNKNOWN:return f.UNKNOWN;case L.DEADLINE_EXCEEDED:return f.DEADLINE_EXCEEDED;case L.RESOURCE_EXHAUSTED:return f.RESOURCE_EXHAUSTED;case L.INTERNAL:return f.INTERNAL;case L.UNAVAILABLE:return f.UNAVAILABLE;case L.UNAUTHENTICATED:return f.UNAUTHENTICATED;case L.INVALID_ARGUMENT:return f.INVALID_ARGUMENT;case L.NOT_FOUND:return f.NOT_FOUND;case L.ALREADY_EXISTS:return f.ALREADY_EXISTS;case L.PERMISSION_DENIED:return f.PERMISSION_DENIED;case L.FAILED_PRECONDITION:return f.FAILED_PRECONDITION;case L.ABORTED:return f.ABORTED;case L.OUT_OF_RANGE:return f.OUT_OF_RANGE;case L.UNIMPLEMENTED:return f.UNIMPLEMENTED;case L.DATA_LOSS:return f.DATA_LOSS;default:return v()}}(S=L||(L={}))[S.OK=0]="OK",S[S.CANCELLED=1]="CANCELLED",S[S.UNKNOWN=2]="UNKNOWN",S[S.INVALID_ARGUMENT=3]="INVALID_ARGUMENT",S[S.DEADLINE_EXCEEDED=4]="DEADLINE_EXCEEDED",S[S.NOT_FOUND=5]="NOT_FOUND",S[S.ALREADY_EXISTS=6]="ALREADY_EXISTS",S[S.PERMISSION_DENIED=7]="PERMISSION_DENIED",S[S.UNAUTHENTICATED=16]="UNAUTHENTICATED",S[S.RESOURCE_EXHAUSTED=8]="RESOURCE_EXHAUSTED",S[S.FAILED_PRECONDITION=9]="FAILED_PRECONDITION",S[S.ABORTED=10]="ABORTED",S[S.OUT_OF_RANGE=11]="OUT_OF_RANGE",S[S.UNIMPLEMENTED=12]="UNIMPLEMENTED",S[S.INTERNAL=13]="INTERNAL",S[S.UNAVAILABLE=14]="UNAVAILABLE",S[S.DATA_LOSS=15]="DATA_LOSS";/**
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
 */function wh(){return new TextEncoder}/**
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
 */const Ah=new ee([4294967295,4294967295],0);function wi(n){const t=wh().encode(n),e=new Sl;return e.update(t),new Uint8Array(e.digest())}function Ai(n){const t=new DataView(n.buffer),e=t.getUint32(0,!0),r=t.getUint32(4,!0),s=t.getUint32(8,!0),i=t.getUint32(12,!0);return[new ee([e,r],0),new ee([s,i],0)]}class Ps{constructor(t,e,r){if(this.bitmap=t,this.padding=e,this.hashCount=r,e<0||e>=8)throw new Ie(`Invalid padding: ${e}`);if(r<0)throw new Ie(`Invalid hash count: ${r}`);if(t.length>0&&this.hashCount===0)throw new Ie(`Invalid hash count: ${r}`);if(t.length===0&&e!==0)throw new Ie(`Invalid padding when bitmap length is 0: ${e}`);this.Te=8*t.length-e,this.Ee=ee.fromNumber(this.Te)}de(t,e,r){let s=t.add(e.multiply(ee.fromNumber(r)));return s.compare(Ah)===1&&(s=new ee([s.getBits(0),s.getBits(1)],0)),s.modulo(this.Ee).toNumber()}Ae(t){return(this.bitmap[Math.floor(t/8)]&1<<t%8)!=0}mightContain(t){if(this.Te===0)return!1;const e=wi(t),[r,s]=Ai(e);for(let i=0;i<this.hashCount;i++){const o=this.de(r,s,i);if(!this.Ae(o))return!1}return!0}static create(t,e,r){const s=t%8==0?0:8-t%8,i=new Uint8Array(Math.ceil(t/8)),o=new Ps(i,s,e);return r.forEach(a=>o.insert(a)),o}insert(t){if(this.Te===0)return;const e=wi(t),[r,s]=Ai(e);for(let i=0;i<this.hashCount;i++){const o=this.de(r,s,i);this.Re(o)}}Re(t){const e=Math.floor(t/8),r=t%8;this.bitmap[e]|=1<<r}}class Ie extends Error{constructor(){super(...arguments),this.name="BloomFilterError"}}/**
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
 */class ur{constructor(t,e,r,s,i){this.snapshotVersion=t,this.targetChanges=e,this.targetMismatches=r,this.documentUpdates=s,this.resolvedLimboDocuments=i}static createSynthesizedRemoteEventForCurrentChange(t,e,r){const s=new Map;return s.set(t,rn.createSynthesizedTargetChangeForCurrentChange(t,e,r)),new ur(I.min(),s,new O(C),At(),V())}}class rn{constructor(t,e,r,s,i){this.resumeToken=t,this.current=e,this.addedDocuments=r,this.modifiedDocuments=s,this.removedDocuments=i}static createSynthesizedTargetChangeForCurrentChange(t,e,r){return new rn(r,e,V(),V(),V())}}/**
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
 */class In{constructor(t,e,r,s){this.Ve=t,this.removedTargetIds=e,this.key=r,this.me=s}}class va{constructor(t,e){this.targetId=t,this.fe=e}}class Ia{constructor(t,e,r=nt.EMPTY_BYTE_STRING,s=null){this.state=t,this.targetIds=e,this.resumeToken=r,this.cause=s}}class Ri{constructor(){this.ge=0,this.pe=Vi(),this.ye=nt.EMPTY_BYTE_STRING,this.we=!1,this.Se=!0}get current(){return this.we}get resumeToken(){return this.ye}get be(){return this.ge!==0}get De(){return this.Se}Ce(t){t.approximateByteSize()>0&&(this.Se=!0,this.ye=t)}ve(){let t=V(),e=V(),r=V();return this.pe.forEach((s,i)=>{switch(i){case 0:t=t.add(s);break;case 2:e=e.add(s);break;case 1:r=r.add(s);break;default:v()}}),new rn(this.ye,this.we,t,e,r)}Fe(){this.Se=!1,this.pe=Vi()}Me(t,e){this.Se=!0,this.pe=this.pe.insert(t,e)}xe(t){this.Se=!0,this.pe=this.pe.remove(t)}Oe(){this.ge+=1}Ne(){this.ge-=1,D(this.ge>=0)}Be(){this.Se=!0,this.we=!0}}class Rh{constructor(t){this.Le=t,this.ke=new Map,this.qe=At(),this.Qe=Pi(),this.Ke=new O(C)}$e(t){for(const e of t.Ve)t.me&&t.me.isFoundDocument()?this.Ue(e,t.me):this.We(e,t.key,t.me);for(const e of t.removedTargetIds)this.We(e,t.key,t.me)}Ge(t){this.forEachTarget(t,e=>{const r=this.ze(e);switch(t.state){case 0:this.je(e)&&r.Ce(t.resumeToken);break;case 1:r.Ne(),r.be||r.Fe(),r.Ce(t.resumeToken);break;case 2:r.Ne(),r.be||this.removeTarget(e);break;case 3:this.je(e)&&(r.Be(),r.Ce(t.resumeToken));break;case 4:this.je(e)&&(this.He(e),r.Ce(t.resumeToken));break;default:v()}})}forEachTarget(t,e){t.targetIds.length>0?t.targetIds.forEach(e):this.ke.forEach((r,s)=>{this.je(s)&&e(s)})}Je(t){const e=t.targetId,r=t.fe.count,s=this.Ye(e);if(s){const i=s.target;if(jr(i))if(r===0){const o=new E(i.path);this.We(e,o,j.newNoDocument(o,I.min()))}else D(r===1);else{const o=this.Ze(e);if(o!==r){const a=this.Xe(t),u=a?this.et(a,t,o):1;if(u!==0){this.He(e);const l=u===2?"TargetPurposeExistenceFilterMismatchBloom":"TargetPurposeExistenceFilterMismatch";this.Ke=this.Ke.insert(e,l)}}}}}Xe(t){const e=t.fe.unchangedNames;if(!e||!e.bits)return null;const{bits:{bitmap:r="",padding:s=0},hashCount:i=0}=e;let o,a;try{o=Bt(r).toUint8Array()}catch(u){if(u instanceof Xo)return se("Decoding the base64 bloom filter in existence filter failed ("+u.message+"); ignoring the bloom filter and falling back to full re-query."),null;throw u}try{a=new Ps(o,s,i)}catch(u){return se(u instanceof Ie?"BloomFilter error: ":"Applying bloom filter failed: ",u),null}return a.Te===0?null:a}et(t,e,r){return e.fe.count===r-this.rt(t,e.targetId)?0:2}rt(t,e){const r=this.Le.getRemoteKeysForTarget(e);let s=0;return r.forEach(i=>{const o=this.Le.nt(),a=`projects/${o.projectId}/databases/${o.database}/documents/${i.path.canonicalString()}`;t.mightContain(a)||(this.We(e,i,null),s++)}),s}it(t){const e=new Map;this.ke.forEach((i,o)=>{const a=this.Ye(o);if(a){if(i.current&&jr(a.target)){const u=new E(a.target.path);this.qe.get(u)!==null||this.st(o,u)||this.We(o,u,j.newNoDocument(u,t))}i.De&&(e.set(o,i.ve()),i.Fe())}});let r=V();this.Qe.forEach((i,o)=>{let a=!0;o.forEachWhile(u=>{const l=this.Ye(u);return!l||l.purpose==="TargetPurposeLimboResolution"||(a=!1,!1)}),a&&(r=r.add(i))}),this.qe.forEach((i,o)=>o.setReadTime(t));const s=new ur(t,e,this.Ke,this.qe,r);return this.qe=At(),this.Qe=Pi(),this.Ke=new O(C),s}Ue(t,e){if(!this.je(t))return;const r=this.st(t,e.key)?2:0;this.ze(t).Me(e.key,r),this.qe=this.qe.insert(e.key,e),this.Qe=this.Qe.insert(e.key,this.ot(e.key).add(t))}We(t,e,r){if(!this.je(t))return;const s=this.ze(t);this.st(t,e)?s.Me(e,1):s.xe(e),this.Qe=this.Qe.insert(e,this.ot(e).delete(t)),r&&(this.qe=this.qe.insert(e,r))}removeTarget(t){this.ke.delete(t)}Ze(t){const e=this.ze(t).ve();return this.Le.getRemoteKeysForTarget(t).size+e.addedDocuments.size-e.removedDocuments.size}Oe(t){this.ze(t).Oe()}ze(t){let e=this.ke.get(t);return e||(e=new Ri,this.ke.set(t,e)),e}ot(t){let e=this.Qe.get(t);return e||(e=new X(C),this.Qe=this.Qe.insert(t,e)),e}je(t){const e=this.Ye(t)!==null;return e||_("WatchChangeAggregator","Detected inactive target",t),e}Ye(t){const e=this.ke.get(t);return e&&e.be?null:this.Le._t(t)}He(t){this.ke.set(t,new Ri),this.Le.getRemoteKeysForTarget(t).forEach(e=>{this.We(t,e,null)})}st(t,e){return this.Le.getRemoteKeysForTarget(t).has(e)}}function Pi(){return new O(E.comparator)}function Vi(){return new O(E.comparator)}const Ph={asc:"ASCENDING",desc:"DESCENDING"},Vh={"<":"LESS_THAN","<=":"LESS_THAN_OR_EQUAL",">":"GREATER_THAN",">=":"GREATER_THAN_OR_EQUAL","==":"EQUAL","!=":"NOT_EQUAL","array-contains":"ARRAY_CONTAINS",in:"IN","not-in":"NOT_IN","array-contains-any":"ARRAY_CONTAINS_ANY"},Sh={and:"AND",or:"OR"};class Ch{constructor(t,e){this.databaseId=t,this.useProto3Json=e}}function Gr(n,t){return n.useProto3Json||en(t)?t:{value:t}}function Mn(n,t){return n.useProto3Json?`${new Date(1e3*t.seconds).toISOString().replace(/\.\d*/,"").replace("Z","")}.${("000000000"+t.nanoseconds).slice(-9)}Z`:{seconds:""+t.seconds,nanos:t.nanoseconds}}function wa(n,t){return n.useProto3Json?t.toBase64():t.toUint8Array()}function Dh(n,t){return Mn(n,t.toTimestamp())}function ut(n){return D(!!n),I.fromTimestamp(function(e){const r=kt(e);return new q(r.seconds,r.nanos)}(n))}function Vs(n,t){return function(r){return new M(["projects",r.projectId,"databases",r.database])}(n).child("documents").child(t).canonicalString()}function Aa(n){const t=M.fromString(n);return D(Ca(t)),t}function On(n,t){return Vs(n.databaseId,t.path)}function Se(n,t){const e=Aa(t);if(e.get(1)!==n.databaseId.projectId)throw new y(f.INVALID_ARGUMENT,"Tried to deserialize key from different project: "+e.get(1)+" vs "+n.databaseId.projectId);if(e.get(3)!==n.databaseId.database)throw new y(f.INVALID_ARGUMENT,"Tried to deserialize key from different database: "+e.get(3)+" vs "+n.databaseId.database);return new E(Ra(e))}function $r(n,t){return Vs(n.databaseId,t)}function kh(n){const t=Aa(n);return t.length===4?M.emptyPath():Ra(t)}function Ge(n){return new M(["projects",n.databaseId.projectId,"databases",n.databaseId.database]).canonicalString()}function Ra(n){return D(n.length>4&&n.get(4)==="documents"),n.popFirst(5)}function Si(n,t,e){return{name:On(n,t),fields:e.value.mapValue.fields}}function Nh(n,t){return"found"in t?function(r,s){D(!!s.found),s.found.name,s.found.updateTime;const i=Se(r,s.found.name),o=ut(s.found.updateTime),a=s.found.createTime?ut(s.found.createTime):I.min(),u=new rt({mapValue:{fields:s.found.fields}});return j.newFoundDocument(i,o,a,u)}(n,t):"missing"in t?function(r,s){D(!!s.missing),D(!!s.readTime);const i=Se(r,s.missing),o=ut(s.readTime);return j.newNoDocument(i,o)}(n,t):v()}function xh(n,t){let e;if("targetChange"in t){t.targetChange;const r=function(l){return l==="NO_CHANGE"?0:l==="ADD"?1:l==="REMOVE"?2:l==="CURRENT"?3:l==="RESET"?4:v()}(t.targetChange.targetChangeType||"NO_CHANGE"),s=t.targetChange.targetIds||[],i=function(l,h){return l.useProto3Json?(D(h===void 0||typeof h=="string"),nt.fromBase64String(h||"")):(D(h===void 0||h instanceof Uint8Array),nt.fromUint8Array(h||new Uint8Array))}(n,t.targetChange.resumeToken),o=t.targetChange.cause,a=o&&function(l){const h=l.code===void 0?f.UNKNOWN:Ta(l.code);return new y(h,l.message||"")}(o);e=new Ia(r,s,i,a||null)}else if("documentChange"in t){t.documentChange;const r=t.documentChange;r.document,r.document.name,r.document.updateTime;const s=Se(n,r.document.name),i=ut(r.document.updateTime),o=r.document.createTime?ut(r.document.createTime):I.min(),a=new rt({mapValue:{fields:r.document.fields}}),u=j.newFoundDocument(s,i,o,a),l=r.targetIds||[],h=r.removedTargetIds||[];e=new In(l,h,u.key,u)}else if("documentDelete"in t){t.documentDelete;const r=t.documentDelete;r.document;const s=Se(n,r.document),i=r.readTime?ut(r.readTime):I.min(),o=j.newNoDocument(s,i),a=r.removedTargetIds||[];e=new In([],a,o.key,o)}else if("documentRemove"in t){t.documentRemove;const r=t.documentRemove;r.document;const s=Se(n,r.document),i=r.removedTargetIds||[];e=new In([],i,s,null)}else{if(!("filter"in t))return v();{t.filter;const r=t.filter;r.targetId;const{count:s=0,unchangedNames:i}=r,o=new Ih(s,i),a=r.targetId;e=new va(a,o)}}return e}function Pa(n,t){let e;if(t instanceof nn)e={update:Si(n,t.key,t.value)};else if(t instanceof ar)e={delete:On(n,t.key)};else if(t instanceof Ot)e={update:Si(n,t.key,t.data),updateMask:jh(t.fieldMask)};else{if(!(t instanceof ya))return v();e={verify:On(n,t.key)}}return t.fieldTransforms.length>0&&(e.updateTransforms=t.fieldTransforms.map(r=>function(i,o){const a=o.transform;if(a instanceof xn)return{fieldPath:o.field.canonicalString(),setToServerValue:"REQUEST_TIME"};if(a instanceof Be)return{fieldPath:o.field.canonicalString(),appendMissingElements:{values:a.elements}};if(a instanceof je)return{fieldPath:o.field.canonicalString(),removeAllFromArray:{values:a.elements}};if(a instanceof ze)return{fieldPath:o.field.canonicalString(),increment:a.Ie};throw v()}(0,r))),t.precondition.isNone||(e.currentDocument=function(s,i){return i.updateTime!==void 0?{updateTime:Dh(s,i.updateTime)}:i.exists!==void 0?{exists:i.exists}:v()}(n,t.precondition)),e}function Mh(n,t){return n&&n.length>0?(D(t!==void 0),n.map(e=>function(s,i){let o=s.updateTime?ut(s.updateTime):ut(i);return o.isEqual(I.min())&&(o=ut(i)),new _h(o,s.transformResults||[])}(e,t))):[]}function Oh(n,t){return{documents:[$r(n,t.path)]}}function Fh(n,t){const e={structuredQuery:{}},r=t.path;t.collectionGroup!==null?(e.parent=$r(n,r),e.structuredQuery.from=[{collectionId:t.collectionGroup,allDescendants:!0}]):(e.parent=$r(n,r.popLast()),e.structuredQuery.from=[{collectionId:r.lastSegment()}]);const s=function(u){if(u.length!==0)return Sa(yt.create(u,"and"))}(t.filters);s&&(e.structuredQuery.where=s);const i=function(u){if(u.length!==0)return u.map(l=>function(c){return{field:Xt(c.field),direction:Uh(c.dir)}}(l))}(t.orderBy);i&&(e.structuredQuery.orderBy=i);const o=Gr(n,t.limit);return o!==null&&(e.structuredQuery.limit=o),t.startAt&&(e.structuredQuery.startAt=function(u){return{before:u.inclusive,values:u.position}}(t.startAt)),t.endAt&&(e.structuredQuery.endAt=function(u){return{before:!u.inclusive,values:u.position}}(t.endAt)),e}function Lh(n){let t=kh(n.parent);const e=n.structuredQuery,r=e.from?e.from.length:0;let s=null;if(r>0){D(r===1);const h=e.from[0];h.allDescendants?s=h.collectionId:t=t.child(h.collectionId)}let i=[];e.where&&(i=function(c){const d=Va(c);return d instanceof yt&&ta(d)?d.getFilters():[d]}(e.where));let o=[];e.orderBy&&(o=function(c){return c.map(d=>function(R){return new Nn(Yt(R.field),function(T){switch(T){case"ASCENDING":return"asc";case"DESCENDING":return"desc";default:return}}(R.direction))}(d))}(e.orderBy));let a=null;e.limit&&(a=function(c){let d;return d=typeof c=="object"?c.value:c,en(d)?null:d}(e.limit));let u=null;e.startAt&&(u=function(c){const d=!!c.before,g=c.values||[];return new kn(g,d)}(e.startAt));let l=null;return e.endAt&&(l=function(c){const d=!c.before,g=c.values||[];return new kn(g,d)}(e.endAt)),rh(t,s,o,i,a,"F",u,l)}function bh(n,t){const e=function(s){switch(s){case"TargetPurposeListen":return null;case"TargetPurposeExistenceFilterMismatch":return"existence-filter-mismatch";case"TargetPurposeExistenceFilterMismatchBloom":return"existence-filter-mismatch-bloom";case"TargetPurposeLimboResolution":return"limbo-document";default:return v()}}(t.purpose);return e==null?null:{"goog-listen-tags":e}}function Va(n){return n.unaryFilter!==void 0?function(e){switch(e.unaryFilter.op){case"IS_NAN":const r=Yt(e.unaryFilter.field);return U.create(r,"==",{doubleValue:NaN});case"IS_NULL":const s=Yt(e.unaryFilter.field);return U.create(s,"==",{nullValue:"NULL_VALUE"});case"IS_NOT_NAN":const i=Yt(e.unaryFilter.field);return U.create(i,"!=",{doubleValue:NaN});case"IS_NOT_NULL":const o=Yt(e.unaryFilter.field);return U.create(o,"!=",{nullValue:"NULL_VALUE"});default:return v()}}(n):n.fieldFilter!==void 0?function(e){return U.create(Yt(e.fieldFilter.field),function(s){switch(s){case"EQUAL":return"==";case"NOT_EQUAL":return"!=";case"GREATER_THAN":return">";case"GREATER_THAN_OR_EQUAL":return">=";case"LESS_THAN":return"<";case"LESS_THAN_OR_EQUAL":return"<=";case"ARRAY_CONTAINS":return"array-contains";case"IN":return"in";case"NOT_IN":return"not-in";case"ARRAY_CONTAINS_ANY":return"array-contains-any";default:return v()}}(e.fieldFilter.op),e.fieldFilter.value)}(n):n.compositeFilter!==void 0?function(e){return yt.create(e.compositeFilter.filters.map(r=>Va(r)),function(s){switch(s){case"AND":return"and";case"OR":return"or";default:return v()}}(e.compositeFilter.op))}(n):v()}function Uh(n){return Ph[n]}function qh(n){return Vh[n]}function Bh(n){return Sh[n]}function Xt(n){return{fieldPath:n.canonicalString()}}function Yt(n){return W.fromServerFormat(n.fieldPath)}function Sa(n){return n instanceof U?function(e){if(e.op==="=="){if(mi(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NAN"}};if(fi(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NULL"}}}else if(e.op==="!="){if(mi(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NOT_NAN"}};if(fi(e.value))return{unaryFilter:{field:Xt(e.field),op:"IS_NOT_NULL"}}}return{fieldFilter:{field:Xt(e.field),op:qh(e.op),value:e.value}}}(n):n instanceof yt?function(e){const r=e.getFilters().map(s=>Sa(s));return r.length===1?r[0]:{compositeFilter:{op:Bh(e.op),filters:r}}}(n):v()}function jh(n){const t=[];return n.fields.forEach(e=>t.push(e.canonicalString())),{fieldPaths:t}}function Ca(n){return n.length>=4&&n.get(0)==="projects"&&n.get(2)==="databases"}/**
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
 */class Vt{constructor(t,e,r,s,i=I.min(),o=I.min(),a=nt.EMPTY_BYTE_STRING,u=null){this.target=t,this.targetId=e,this.purpose=r,this.sequenceNumber=s,this.snapshotVersion=i,this.lastLimboFreeSnapshotVersion=o,this.resumeToken=a,this.expectedCount=u}withSequenceNumber(t){return new Vt(this.target,this.targetId,this.purpose,t,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,this.expectedCount)}withResumeToken(t,e){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,e,this.lastLimboFreeSnapshotVersion,t,null)}withExpectedCount(t){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,this.lastLimboFreeSnapshotVersion,this.resumeToken,t)}withLastLimboFreeSnapshotVersion(t){return new Vt(this.target,this.targetId,this.purpose,this.sequenceNumber,this.snapshotVersion,t,this.resumeToken,this.expectedCount)}}/**
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
 */class zh{constructor(t){this.ut=t}}function Gh(n){const t=Lh({parent:n.parent,structuredQuery:n.structuredQuery});return n.limitType==="LAST"?zr(t,t.limit,"L"):t}/**
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
 */class $h{constructor(){this.on=new Kh}addToCollectionParentIndex(t,e){return this.on.add(e),m.resolve()}getCollectionParents(t,e){return m.resolve(this.on.getEntries(e))}addFieldIndex(t,e){return m.resolve()}deleteFieldIndex(t,e){return m.resolve()}deleteAllFieldIndexes(t){return m.resolve()}createTargetIndexes(t,e){return m.resolve()}getDocumentsMatchingTarget(t,e){return m.resolve(null)}getIndexType(t,e){return m.resolve(0)}getFieldIndexes(t,e){return m.resolve([])}getNextCollectionGroupToUpdate(t){return m.resolve(null)}getMinOffset(t,e){return m.resolve(Dt.min())}getMinOffsetFromCollectionGroup(t,e){return m.resolve(Dt.min())}updateCollectionGroup(t,e,r){return m.resolve()}updateIndexEntries(t,e){return m.resolve()}}class Kh{constructor(){this.index={}}add(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e]||new X(M.comparator),i=!s.has(r);return this.index[e]=s.add(r),i}has(t){const e=t.lastSegment(),r=t.popLast(),s=this.index[e];return s&&s.has(r)}getEntries(t){return(this.index[t]||new X(M.comparator)).toArray()}}/**
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
 */class ue{constructor(t){this.xn=t}next(){return this.xn+=2,this.xn}static On(){return new ue(0)}static Nn(){return new ue(-1)}}/**
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
 */class Qh{constructor(){this.changes=new me(t=>t.toString(),(t,e)=>t.isEqual(e)),this.changesApplied=!1}addEntry(t){this.assertNotApplied(),this.changes.set(t.key,t)}removeEntry(t,e){this.assertNotApplied(),this.changes.set(t,j.newInvalidDocument(t).setReadTime(e))}getEntry(t,e){this.assertNotApplied();const r=this.changes.get(e);return r!==void 0?m.resolve(r):this.getFromCache(t,e)}getEntries(t,e){return this.getAllFromCache(t,e)}apply(t){return this.assertNotApplied(),this.changesApplied=!0,this.applyChanges(t)}assertNotApplied(){}}/**
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
 */class Wh{constructor(t,e){this.overlayedDocument=t,this.mutatedFields=e}}/**
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
 */class Hh{constructor(t,e,r,s){this.remoteDocumentCache=t,this.mutationQueue=e,this.documentOverlayCache=r,this.indexManager=s}getDocument(t,e){let r=null;return this.documentOverlayCache.getOverlay(t,e).next(s=>(r=s,this.remoteDocumentCache.getEntry(t,e))).next(s=>(r!==null&&Ve(r.mutation,s,at.empty(),q.now()),s))}getDocuments(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.getLocalViewOfDocuments(t,r,V()).next(()=>r))}getLocalViewOfDocuments(t,e,r=V()){const s=bt();return this.populateOverlays(t,s,e).next(()=>this.computeViews(t,e,s,r).next(i=>{let o=ve();return i.forEach((a,u)=>{o=o.insert(a,u.overlayedDocument)}),o}))}getOverlayedDocuments(t,e){const r=bt();return this.populateOverlays(t,r,e).next(()=>this.computeViews(t,e,r,V()))}populateOverlays(t,e,r){const s=[];return r.forEach(i=>{e.has(i)||s.push(i)}),this.documentOverlayCache.getOverlays(t,s).next(i=>{i.forEach((o,a)=>{e.set(o,a)})})}computeViews(t,e,r,s){let i=At();const o=Pe(),a=function(){return Pe()}();return e.forEach((u,l)=>{const h=r.get(l.key);s.has(l.key)&&(h===void 0||h.mutation instanceof Ot)?i=i.insert(l.key,l):h!==void 0?(o.set(l.key,h.mutation.getFieldMask()),Ve(h.mutation,l,h.mutation.getFieldMask(),q.now())):o.set(l.key,at.empty())}),this.recalculateAndSaveOverlays(t,i).next(u=>(u.forEach((l,h)=>o.set(l,h)),e.forEach((l,h)=>{var c;return a.set(l,new Wh(h,(c=o.get(l))!==null&&c!==void 0?c:null))}),a))}recalculateAndSaveOverlays(t,e){const r=Pe();let s=new O((o,a)=>o-a),i=V();return this.mutationQueue.getAllMutationBatchesAffectingDocumentKeys(t,e).next(o=>{for(const a of o)a.keys().forEach(u=>{const l=e.get(u);if(l===null)return;let h=r.get(u)||at.empty();h=a.applyToLocalView(l,h),r.set(u,h);const c=(s.get(a.batchId)||V()).add(u);s=s.insert(a.batchId,c)})}).next(()=>{const o=[],a=s.getReverseIterator();for(;a.hasNext();){const u=a.getNext(),l=u.key,h=u.value,c=ua();h.forEach(d=>{if(!i.has(d)){const g=pa(e.get(d),r.get(d));g!==null&&c.set(d,g),i=i.add(d)}}),o.push(this.documentOverlayCache.saveOverlays(t,l,c))}return m.waitFor(o)}).next(()=>r)}recalculateAndSaveOverlaysForDocumentKeys(t,e){return this.remoteDocumentCache.getEntries(t,e).next(r=>this.recalculateAndSaveOverlays(t,r))}getDocumentsMatchingQuery(t,e,r,s){return function(o){return E.isDocumentKey(o.path)&&o.collectionGroup===null&&o.filters.length===0}(e)?this.getDocumentsMatchingDocumentQuery(t,e.path):sh(e)?this.getDocumentsMatchingCollectionGroupQuery(t,e,r,s):this.getDocumentsMatchingCollectionQuery(t,e,r,s)}getNextDocuments(t,e,r,s){return this.remoteDocumentCache.getAllFromCollectionGroup(t,e,r,s).next(i=>{const o=s-i.size>0?this.documentOverlayCache.getOverlaysForCollectionGroup(t,e,r.largestBatchId,s-i.size):m.resolve(bt());let a=-1,u=i;return o.next(l=>m.forEach(l,(h,c)=>(a<c.largestBatchId&&(a=c.largestBatchId),i.get(h)?m.resolve():this.remoteDocumentCache.getEntry(t,h).next(d=>{u=u.insert(h,d)}))).next(()=>this.populateOverlays(t,l,i)).next(()=>this.computeViews(t,u,l,V())).next(h=>({batchId:a,changes:aa(h)})))})}getDocumentsMatchingDocumentQuery(t,e){return this.getDocument(t,new E(e)).next(r=>{let s=ve();return r.isFoundDocument()&&(s=s.insert(r.key,r)),s})}getDocumentsMatchingCollectionGroupQuery(t,e,r,s){const i=e.collectionGroup;let o=ve();return this.indexManager.getCollectionParents(t,i).next(a=>m.forEach(a,u=>{const l=function(c,d){return new er(d,null,c.explicitOrderBy.slice(),c.filters.slice(),c.limit,c.limitType,c.startAt,c.endAt)}(e,u.child(i));return this.getDocumentsMatchingCollectionQuery(t,l,r,s).next(h=>{h.forEach((c,d)=>{o=o.insert(c,d)})})}).next(()=>o))}getDocumentsMatchingCollectionQuery(t,e,r,s){let i;return this.documentOverlayCache.getOverlaysForCollection(t,e.path,r.largestBatchId).next(o=>(i=o,this.remoteDocumentCache.getDocumentsMatchingQuery(t,e,r,i,s))).next(o=>{i.forEach((u,l)=>{const h=l.getKey();o.get(h)===null&&(o=o.insert(h,j.newInvalidDocument(h)))});let a=ve();return o.forEach((u,l)=>{const h=i.get(u);h!==void 0&&Ve(h.mutation,l,at.empty(),q.now()),sr(e,l)&&(a=a.insert(u,l))}),a})}}/**
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
 */class Xh{constructor(t){this.serializer=t,this.ur=new Map,this.cr=new Map}getBundleMetadata(t,e){return m.resolve(this.ur.get(e))}saveBundleMetadata(t,e){return this.ur.set(e.id,function(s){return{id:s.id,version:s.version,createTime:ut(s.createTime)}}(e)),m.resolve()}getNamedQuery(t,e){return m.resolve(this.cr.get(e))}saveNamedQuery(t,e){return this.cr.set(e.name,function(s){return{name:s.name,query:Gh(s.bundledQuery),readTime:ut(s.readTime)}}(e)),m.resolve()}}/**
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
 */class Yh{constructor(){this.overlays=new O(E.comparator),this.lr=new Map}getOverlay(t,e){return m.resolve(this.overlays.get(e))}getOverlays(t,e){const r=bt();return m.forEach(e,s=>this.getOverlay(t,s).next(i=>{i!==null&&r.set(s,i)})).next(()=>r)}saveOverlays(t,e,r){return r.forEach((s,i)=>{this.lt(t,e,i)}),m.resolve()}removeOverlaysForBatchId(t,e,r){const s=this.lr.get(r);return s!==void 0&&(s.forEach(i=>this.overlays=this.overlays.remove(i)),this.lr.delete(r)),m.resolve()}getOverlaysForCollection(t,e,r){const s=bt(),i=e.length+1,o=new E(e.child("")),a=this.overlays.getIteratorFrom(o);for(;a.hasNext();){const u=a.getNext().value,l=u.getKey();if(!e.isPrefixOf(l.path))break;l.path.length===i&&u.largestBatchId>r&&s.set(u.getKey(),u)}return m.resolve(s)}getOverlaysForCollectionGroup(t,e,r,s){let i=new O((l,h)=>l-h);const o=this.overlays.getIterator();for(;o.hasNext();){const l=o.getNext().value;if(l.getKey().getCollectionGroup()===e&&l.largestBatchId>r){let h=i.get(l.largestBatchId);h===null&&(h=bt(),i=i.insert(l.largestBatchId,h)),h.set(l.getKey(),l)}}const a=bt(),u=i.getIterator();for(;u.hasNext()&&(u.getNext().value.forEach((l,h)=>a.set(l,h)),!(a.size()>=s)););return m.resolve(a)}lt(t,e,r){const s=this.overlays.get(r.key);if(s!==null){const o=this.lr.get(s.largestBatchId).delete(r.key);this.lr.set(s.largestBatchId,o)}this.overlays=this.overlays.insert(r.key,new vh(e,r));let i=this.lr.get(e);i===void 0&&(i=V(),this.lr.set(e,i)),this.lr.set(e,i.add(r.key))}}/**
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
 */class Ss{constructor(){this.hr=new X(B.Pr),this.Ir=new X(B.Tr)}isEmpty(){return this.hr.isEmpty()}addReference(t,e){const r=new B(t,e);this.hr=this.hr.add(r),this.Ir=this.Ir.add(r)}Er(t,e){t.forEach(r=>this.addReference(r,e))}removeReference(t,e){this.dr(new B(t,e))}Ar(t,e){t.forEach(r=>this.removeReference(r,e))}Rr(t){const e=new E(new M([])),r=new B(e,t),s=new B(e,t+1),i=[];return this.Ir.forEachInRange([r,s],o=>{this.dr(o),i.push(o.key)}),i}Vr(){this.hr.forEach(t=>this.dr(t))}dr(t){this.hr=this.hr.delete(t),this.Ir=this.Ir.delete(t)}mr(t){const e=new E(new M([])),r=new B(e,t),s=new B(e,t+1);let i=V();return this.Ir.forEachInRange([r,s],o=>{i=i.add(o.key)}),i}containsKey(t){const e=new B(t,0),r=this.hr.firstAfterOrEqual(e);return r!==null&&t.isEqual(r.key)}}class B{constructor(t,e){this.key=t,this.gr=e}static Pr(t,e){return E.comparator(t.key,e.key)||C(t.gr,e.gr)}static Tr(t,e){return C(t.gr,e.gr)||E.comparator(t.key,e.key)}}/**
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
 */class Jh{constructor(t,e){this.indexManager=t,this.referenceDelegate=e,this.mutationQueue=[],this.pr=1,this.yr=new X(B.Pr)}checkEmpty(t){return m.resolve(this.mutationQueue.length===0)}addMutationBatch(t,e,r,s){const i=this.pr;this.pr++,this.mutationQueue.length>0&&this.mutationQueue[this.mutationQueue.length-1];const o=new Th(i,e,r,s);this.mutationQueue.push(o);for(const a of s)this.yr=this.yr.add(new B(a.key,i)),this.indexManager.addToCollectionParentIndex(t,a.key.path.popLast());return m.resolve(o)}lookupMutationBatch(t,e){return m.resolve(this.wr(e))}getNextMutationBatchAfterBatchId(t,e){const r=e+1,s=this.Sr(r),i=s<0?0:s;return m.resolve(this.mutationQueue.length>i?this.mutationQueue[i]:null)}getHighestUnacknowledgedBatchId(){return m.resolve(this.mutationQueue.length===0?-1:this.pr-1)}getAllMutationBatches(t){return m.resolve(this.mutationQueue.slice())}getAllMutationBatchesAffectingDocumentKey(t,e){const r=new B(e,0),s=new B(e,Number.POSITIVE_INFINITY),i=[];return this.yr.forEachInRange([r,s],o=>{const a=this.wr(o.gr);i.push(a)}),m.resolve(i)}getAllMutationBatchesAffectingDocumentKeys(t,e){let r=new X(C);return e.forEach(s=>{const i=new B(s,0),o=new B(s,Number.POSITIVE_INFINITY);this.yr.forEachInRange([i,o],a=>{r=r.add(a.gr)})}),m.resolve(this.br(r))}getAllMutationBatchesAffectingQuery(t,e){const r=e.path,s=r.length+1;let i=r;E.isDocumentKey(i)||(i=i.child(""));const o=new B(new E(i),0);let a=new X(C);return this.yr.forEachWhile(u=>{const l=u.key.path;return!!r.isPrefixOf(l)&&(l.length===s&&(a=a.add(u.gr)),!0)},o),m.resolve(this.br(a))}br(t){const e=[];return t.forEach(r=>{const s=this.wr(r);s!==null&&e.push(s)}),e}removeMutationBatch(t,e){D(this.Dr(e.batchId,"removed")===0),this.mutationQueue.shift();let r=this.yr;return m.forEach(e.mutations,s=>{const i=new B(s.key,e.batchId);return r=r.delete(i),this.referenceDelegate.markPotentiallyOrphaned(t,s.key)}).next(()=>{this.yr=r})}Fn(t){}containsKey(t,e){const r=new B(e,0),s=this.yr.firstAfterOrEqual(r);return m.resolve(e.isEqual(s&&s.key))}performConsistencyCheck(t){return this.mutationQueue.length,m.resolve()}Dr(t,e){return this.Sr(t)}Sr(t){return this.mutationQueue.length===0?0:t-this.mutationQueue[0].batchId}wr(t){const e=this.Sr(t);return e<0||e>=this.mutationQueue.length?null:this.mutationQueue[e]}}/**
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
 */class Zh{constructor(t){this.Cr=t,this.docs=function(){return new O(E.comparator)}(),this.size=0}setIndexManager(t){this.indexManager=t}addEntry(t,e){const r=e.key,s=this.docs.get(r),i=s?s.size:0,o=this.Cr(e);return this.docs=this.docs.insert(r,{document:e.mutableCopy(),size:o}),this.size+=o-i,this.indexManager.addToCollectionParentIndex(t,r.path.popLast())}removeEntry(t){const e=this.docs.get(t);e&&(this.docs=this.docs.remove(t),this.size-=e.size)}getEntry(t,e){const r=this.docs.get(e);return m.resolve(r?r.document.mutableCopy():j.newInvalidDocument(e))}getEntries(t,e){let r=At();return e.forEach(s=>{const i=this.docs.get(s);r=r.insert(s,i?i.document.mutableCopy():j.newInvalidDocument(s))}),m.resolve(r)}getDocumentsMatchingQuery(t,e,r,s){let i=At();const o=e.path,a=new E(o.child("")),u=this.docs.getIteratorFrom(a);for(;u.hasNext();){const{key:l,value:{document:h}}=u.getNext();if(!o.isPrefixOf(l.path))break;l.path.length>o.length+1||ql(Ul(h),r)<=0||(s.has(h.key)||sr(e,h))&&(i=i.insert(h.key,h.mutableCopy()))}return m.resolve(i)}getAllFromCollectionGroup(t,e,r,s){v()}vr(t,e){return m.forEach(this.docs,r=>e(r))}newChangeBuffer(t){return new tc(this)}getSize(t){return m.resolve(this.size)}}class tc extends Qh{constructor(t){super(),this._r=t}applyChanges(t){const e=[];return this.changes.forEach((r,s)=>{s.isValidDocument()?e.push(this._r.addEntry(t,s)):this._r.removeEntry(r)}),m.waitFor(e)}getFromCache(t,e){return this._r.getEntry(t,e)}getAllFromCache(t,e){return this._r.getEntries(t,e)}}/**
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
 */class ec{constructor(t){this.persistence=t,this.Fr=new me(e=>ws(e),As),this.lastRemoteSnapshotVersion=I.min(),this.highestTargetId=0,this.Mr=0,this.Or=new Ss,this.targetCount=0,this.Nr=ue.On()}forEachTarget(t,e){return this.Fr.forEach((r,s)=>e(s)),m.resolve()}getLastRemoteSnapshotVersion(t){return m.resolve(this.lastRemoteSnapshotVersion)}getHighestSequenceNumber(t){return m.resolve(this.Mr)}allocateTargetId(t){return this.highestTargetId=this.Nr.next(),m.resolve(this.highestTargetId)}setTargetsMetadata(t,e,r){return r&&(this.lastRemoteSnapshotVersion=r),e>this.Mr&&(this.Mr=e),m.resolve()}kn(t){this.Fr.set(t.target,t);const e=t.targetId;e>this.highestTargetId&&(this.Nr=new ue(e),this.highestTargetId=e),t.sequenceNumber>this.Mr&&(this.Mr=t.sequenceNumber)}addTargetData(t,e){return this.kn(e),this.targetCount+=1,m.resolve()}updateTargetData(t,e){return this.kn(e),m.resolve()}removeTargetData(t,e){return this.Fr.delete(e.target),this.Or.Rr(e.targetId),this.targetCount-=1,m.resolve()}removeTargets(t,e,r){let s=0;const i=[];return this.Fr.forEach((o,a)=>{a.sequenceNumber<=e&&r.get(a.targetId)===null&&(this.Fr.delete(o),i.push(this.removeMatchingKeysForTargetId(t,a.targetId)),s++)}),m.waitFor(i).next(()=>s)}getTargetCount(t){return m.resolve(this.targetCount)}getTargetData(t,e){const r=this.Fr.get(e)||null;return m.resolve(r)}addMatchingKeys(t,e,r){return this.Or.Er(e,r),m.resolve()}removeMatchingKeys(t,e,r){this.Or.Ar(e,r);const s=this.persistence.referenceDelegate,i=[];return s&&e.forEach(o=>{i.push(s.markPotentiallyOrphaned(t,o))}),m.waitFor(i)}removeMatchingKeysForTargetId(t,e){return this.Or.Rr(e),m.resolve()}getMatchingKeysForTargetId(t,e){const r=this.Or.mr(e);return m.resolve(r)}containsKey(t,e){return m.resolve(this.Or.containsKey(e))}}/**
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
 */class nc{constructor(t,e){this.Br={},this.overlays={},this.Lr=new Es(0),this.kr=!1,this.kr=!0,this.referenceDelegate=t(this),this.qr=new ec(this),this.indexManager=new $h,this.remoteDocumentCache=function(s){return new Zh(s)}(r=>this.referenceDelegate.Qr(r)),this.serializer=new zh(e),this.Kr=new Xh(this.serializer)}start(){return Promise.resolve()}shutdown(){return this.kr=!1,Promise.resolve()}get started(){return this.kr}setDatabaseDeletedListener(){}setNetworkEnabled(){}getIndexManager(t){return this.indexManager}getDocumentOverlayCache(t){let e=this.overlays[t.toKey()];return e||(e=new Yh,this.overlays[t.toKey()]=e),e}getMutationQueue(t,e){let r=this.Br[t.toKey()];return r||(r=new Jh(e,this.referenceDelegate),this.Br[t.toKey()]=r),r}getTargetCache(){return this.qr}getRemoteDocumentCache(){return this.remoteDocumentCache}getBundleCache(){return this.Kr}runTransaction(t,e,r){_("MemoryPersistence","Starting transaction:",t);const s=new rc(this.Lr.next());return this.referenceDelegate.$r(),r(s).next(i=>this.referenceDelegate.Ur(s).next(()=>i)).toPromise().then(i=>(s.raiseOnCommittedEvent(),i))}Wr(t,e){return m.or(Object.values(this.Br).map(r=>()=>r.containsKey(t,e)))}}class rc extends jl{constructor(t){super(),this.currentSequenceNumber=t}}class Cs{constructor(t){this.persistence=t,this.Gr=new Ss,this.zr=null}static jr(t){return new Cs(t)}get Hr(){if(this.zr)return this.zr;throw v()}addReference(t,e,r){return this.Gr.addReference(r,e),this.Hr.delete(r.toString()),m.resolve()}removeReference(t,e,r){return this.Gr.removeReference(r,e),this.Hr.add(r.toString()),m.resolve()}markPotentiallyOrphaned(t,e){return this.Hr.add(e.toString()),m.resolve()}removeTarget(t,e){this.Gr.Rr(e.targetId).forEach(s=>this.Hr.add(s.toString()));const r=this.persistence.getTargetCache();return r.getMatchingKeysForTargetId(t,e.targetId).next(s=>{s.forEach(i=>this.Hr.add(i.toString()))}).next(()=>r.removeTargetData(t,e))}$r(){this.zr=new Set}Ur(t){const e=this.persistence.getRemoteDocumentCache().newChangeBuffer();return m.forEach(this.Hr,r=>{const s=E.fromPath(r);return this.Jr(t,s).next(i=>{i||e.removeEntry(s,I.min())})}).next(()=>(this.zr=null,e.apply(t)))}updateLimboDocument(t,e){return this.Jr(t,e).next(r=>{r?this.Hr.delete(e.toString()):this.Hr.add(e.toString())})}Qr(t){return 0}Jr(t,e){return m.or([()=>m.resolve(this.Gr.containsKey(e)),()=>this.persistence.getTargetCache().containsKey(t,e),()=>this.persistence.Wr(t,e)])}}/**
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
 */class Ds{constructor(t,e,r,s){this.targetId=t,this.fromCache=e,this.ki=r,this.qi=s}static Qi(t,e){let r=V(),s=V();for(const i of e.docChanges)switch(i.type){case 0:r=r.add(i.doc.key);break;case 1:s=s.add(i.doc.key)}return new Ds(t,e.fromCache,r,s)}}/**
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
 */class sc{constructor(){this._documentReadCount=0}get documentReadCount(){return this._documentReadCount}incrementDocumentReadCount(t){this._documentReadCount+=t}}/**
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
 */class ic{constructor(){this.Ki=!1,this.$i=!1,this.Ui=100,this.Wi=8}initialize(t,e){this.Gi=t,this.indexManager=e,this.Ki=!0}getDocumentsMatchingQuery(t,e,r,s){const i={result:null};return this.zi(t,e).next(o=>{i.result=o}).next(()=>{if(!i.result)return this.ji(t,e,s,r).next(o=>{i.result=o})}).next(()=>{if(i.result)return;const o=new sc;return this.Hi(t,e,o).next(a=>{if(i.result=a,this.$i)return this.Ji(t,e,o,a.size)})}).next(()=>i.result)}Ji(t,e,r,s){return r.documentReadCount<this.Ui?(ye()<=Rt.DEBUG&&_("QueryEngine","SDK will not create cache indexes for query:",Ht(e),"since it only creates cache indexes for collection contains","more than or equal to",this.Ui,"documents"),m.resolve()):(ye()<=Rt.DEBUG&&_("QueryEngine","Query:",Ht(e),"scans",r.documentReadCount,"local documents and returns",s,"documents as results."),r.documentReadCount>this.Wi*s?(ye()<=Rt.DEBUG&&_("QueryEngine","The SDK decides to create cache indexes for query:",Ht(e),"as using cache indexes may help improve performance."),this.indexManager.createTargetIndexes(t,pt(e))):m.resolve())}zi(t,e){if(yi(e))return m.resolve(null);let r=pt(e);return this.indexManager.getIndexType(t,r).next(s=>s===0?null:(e.limit!==null&&s===1&&(e=zr(e,null,"F"),r=pt(e)),this.indexManager.getDocumentsMatchingTarget(t,r).next(i=>{const o=V(...i);return this.Gi.getDocuments(t,o).next(a=>this.indexManager.getMinOffset(t,r).next(u=>{const l=this.Yi(e,a);return this.Zi(e,l,o,u.readTime)?this.zi(t,zr(e,null,"F")):this.Xi(t,l,e,u)}))})))}ji(t,e,r,s){return yi(e)||s.isEqual(I.min())?m.resolve(null):this.Gi.getDocuments(t,r).next(i=>{const o=this.Yi(e,i);return this.Zi(e,o,r,s)?m.resolve(null):(ye()<=Rt.DEBUG&&_("QueryEngine","Re-using previous result from %s to execute query: %s",s.toString(),Ht(e)),this.Xi(t,o,e,bl(s,-1)).next(a=>a))})}Yi(t,e){let r=new X(ia(t));return e.forEach((s,i)=>{sr(t,i)&&(r=r.add(i))}),r}Zi(t,e,r,s){if(t.limit===null)return!1;if(r.size!==e.size)return!0;const i=t.limitType==="F"?e.last():e.first();return!!i&&(i.hasPendingWrites||i.version.compareTo(s)>0)}Hi(t,e,r){return ye()<=Rt.DEBUG&&_("QueryEngine","Using full collection scan to execute query:",Ht(e)),this.Gi.getDocumentsMatchingQuery(t,e,Dt.min(),r)}Xi(t,e,r,s){return this.Gi.getDocumentsMatchingQuery(t,r,s).next(i=>(e.forEach(o=>{i=i.insert(o.key,o)}),i))}}/**
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
 */class oc{constructor(t,e,r,s){this.persistence=t,this.es=e,this.serializer=s,this.ts=new O(C),this.ns=new me(i=>ws(i),As),this.rs=new Map,this.ss=t.getRemoteDocumentCache(),this.qr=t.getTargetCache(),this.Kr=t.getBundleCache(),this.os(r)}os(t){this.documentOverlayCache=this.persistence.getDocumentOverlayCache(t),this.indexManager=this.persistence.getIndexManager(t),this.mutationQueue=this.persistence.getMutationQueue(t,this.indexManager),this.localDocuments=new Hh(this.ss,this.mutationQueue,this.documentOverlayCache,this.indexManager),this.ss.setIndexManager(this.indexManager),this.es.initialize(this.localDocuments,this.indexManager)}collectGarbage(t){return this.persistence.runTransaction("Collect garbage","readwrite-primary",e=>t.collect(e,this.ts))}}function ac(n,t,e,r){return new oc(n,t,e,r)}async function Da(n,t){const e=A(n);return await e.persistence.runTransaction("Handle user change","readonly",r=>{let s;return e.mutationQueue.getAllMutationBatches(r).next(i=>(s=i,e.os(t),e.mutationQueue.getAllMutationBatches(r))).next(i=>{const o=[],a=[];let u=V();for(const l of s){o.push(l.batchId);for(const h of l.mutations)u=u.add(h.key)}for(const l of i){a.push(l.batchId);for(const h of l.mutations)u=u.add(h.key)}return e.localDocuments.getDocuments(r,u).next(l=>({_s:l,removedBatchIds:o,addedBatchIds:a}))})})}function uc(n,t){const e=A(n);return e.persistence.runTransaction("Acknowledge batch","readwrite-primary",r=>{const s=t.batch.keys(),i=e.ss.newChangeBuffer({trackRemovals:!0});return function(a,u,l,h){const c=l.batch,d=c.keys();let g=m.resolve();return d.forEach(R=>{g=g.next(()=>h.getEntry(u,R)).next(P=>{const T=l.docVersions.get(R);D(T!==null),P.version.compareTo(T)<0&&(c.applyToRemoteDocument(P,l),P.isValidDocument()&&(P.setReadTime(l.commitVersion),h.addEntry(P)))})}),g.next(()=>a.mutationQueue.removeMutationBatch(u,c))}(e,r,t,i).next(()=>i.apply(r)).next(()=>e.mutationQueue.performConsistencyCheck(r)).next(()=>e.documentOverlayCache.removeOverlaysForBatchId(r,s,t.batch.batchId)).next(()=>e.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(r,function(a){let u=V();for(let l=0;l<a.mutationResults.length;++l)a.mutationResults[l].transformResults.length>0&&(u=u.add(a.batch.mutations[l].key));return u}(t))).next(()=>e.localDocuments.getDocuments(r,s))})}function ka(n){const t=A(n);return t.persistence.runTransaction("Get last remote snapshot version","readonly",e=>t.qr.getLastRemoteSnapshotVersion(e))}function lc(n,t){const e=A(n),r=t.snapshotVersion;let s=e.ts;return e.persistence.runTransaction("Apply remote event","readwrite-primary",i=>{const o=e.ss.newChangeBuffer({trackRemovals:!0});s=e.ts;const a=[];t.targetChanges.forEach((h,c)=>{const d=s.get(c);if(!d)return;a.push(e.qr.removeMatchingKeys(i,h.removedDocuments,c).next(()=>e.qr.addMatchingKeys(i,h.addedDocuments,c)));let g=d.withSequenceNumber(i.currentSequenceNumber);t.targetMismatches.get(c)!==null?g=g.withResumeToken(nt.EMPTY_BYTE_STRING,I.min()).withLastLimboFreeSnapshotVersion(I.min()):h.resumeToken.approximateByteSize()>0&&(g=g.withResumeToken(h.resumeToken,r)),s=s.insert(c,g),function(P,T,x){return P.resumeToken.approximateByteSize()===0||T.snapshotVersion.toMicroseconds()-P.snapshotVersion.toMicroseconds()>=3e8?!0:x.addedDocuments.size+x.modifiedDocuments.size+x.removedDocuments.size>0}(d,g,h)&&a.push(e.qr.updateTargetData(i,g))});let u=At(),l=V();if(t.documentUpdates.forEach(h=>{t.resolvedLimboDocuments.has(h)&&a.push(e.persistence.referenceDelegate.updateLimboDocument(i,h))}),a.push(hc(i,o,t.documentUpdates).next(h=>{u=h.us,l=h.cs})),!r.isEqual(I.min())){const h=e.qr.getLastRemoteSnapshotVersion(i).next(c=>e.qr.setTargetsMetadata(i,i.currentSequenceNumber,r));a.push(h)}return m.waitFor(a).next(()=>o.apply(i)).next(()=>e.localDocuments.getLocalViewOfDocuments(i,u,l)).next(()=>u)}).then(i=>(e.ts=s,i))}function hc(n,t,e){let r=V(),s=V();return e.forEach(i=>r=r.add(i)),t.getEntries(n,r).next(i=>{let o=At();return e.forEach((a,u)=>{const l=i.get(a);u.isFoundDocument()!==l.isFoundDocument()&&(s=s.add(a)),u.isNoDocument()&&u.version.isEqual(I.min())?(t.removeEntry(a,u.readTime),o=o.insert(a,u)):!l.isValidDocument()||u.version.compareTo(l.version)>0||u.version.compareTo(l.version)===0&&l.hasPendingWrites?(t.addEntry(u),o=o.insert(a,u)):_("LocalStore","Ignoring outdated watch update for ",a,". Current version:",l.version," Watch version:",u.version)}),{us:o,cs:s}})}function cc(n,t){const e=A(n);return e.persistence.runTransaction("Get next mutation batch","readonly",r=>(t===void 0&&(t=-1),e.mutationQueue.getNextMutationBatchAfterBatchId(r,t)))}function dc(n,t){const e=A(n);return e.persistence.runTransaction("Allocate target","readwrite",r=>{let s;return e.qr.getTargetData(r,t).next(i=>i?(s=i,m.resolve(s)):e.qr.allocateTargetId(r).next(o=>(s=new Vt(t,o,"TargetPurposeListen",r.currentSequenceNumber),e.qr.addTargetData(r,s).next(()=>s))))}).then(r=>{const s=e.ts.get(r.targetId);return(s===null||r.snapshotVersion.compareTo(s.snapshotVersion)>0)&&(e.ts=e.ts.insert(r.targetId,r),e.ns.set(t,r.targetId)),r})}async function Kr(n,t,e){const r=A(n),s=r.ts.get(t),i=e?"readwrite":"readwrite-primary";try{e||await r.persistence.runTransaction("Release target",i,o=>r.persistence.referenceDelegate.removeTarget(o,s))}catch(o){if(!tn(o))throw o;_("LocalStore",`Failed to update sequence numbers for target ${t}: ${o}`)}r.ts=r.ts.remove(t),r.ns.delete(s.target)}function Ci(n,t,e){const r=A(n);let s=I.min(),i=V();return r.persistence.runTransaction("Execute query","readwrite",o=>function(u,l,h){const c=A(u),d=c.ns.get(h);return d!==void 0?m.resolve(c.ts.get(d)):c.qr.getTargetData(l,h)}(r,o,pt(t)).next(a=>{if(a)return s=a.lastLimboFreeSnapshotVersion,r.qr.getMatchingKeysForTargetId(o,a.targetId).next(u=>{i=u})}).next(()=>r.es.getDocumentsMatchingQuery(o,t,e?s:I.min(),e?i:V())).next(a=>(fc(r,oh(t),a),{documents:a,ls:i})))}function fc(n,t,e){let r=n.rs.get(t)||I.min();e.forEach((s,i)=>{i.readTime.compareTo(r)>0&&(r=i.readTime)}),n.rs.set(t,r)}class Di{constructor(){this.activeTargetIds=dh()}ds(t){this.activeTargetIds=this.activeTargetIds.add(t)}As(t){this.activeTargetIds=this.activeTargetIds.delete(t)}Es(){const t={activeTargetIds:this.activeTargetIds.toArray(),updateTimeMs:Date.now()};return JSON.stringify(t)}}class mc{constructor(){this.eo=new Di,this.no={},this.onlineStateHandler=null,this.sequenceNumberHandler=null}addPendingMutation(t){}updateMutationState(t,e,r){}addLocalQueryTarget(t){return this.eo.ds(t),this.no[t]||"not-current"}updateQueryState(t,e,r){this.no[t]=e}removeLocalQueryTarget(t){this.eo.As(t)}isLocalQueryTarget(t){return this.eo.activeTargetIds.has(t)}clearQueryState(t){delete this.no[t]}getAllActiveQueryTargets(){return this.eo.activeTargetIds}isActiveQueryTarget(t){return this.eo.activeTargetIds.has(t)}start(){return this.eo=new Di,Promise.resolve()}handleUserChange(t,e,r){}setOnlineState(t){}shutdown(){}writeSequenceNumber(t){}notifyBundleLoaded(t){}}/**
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
 */class gc{ro(t){}shutdown(){}}/**
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
 */class ki{constructor(){this.io=()=>this.so(),this.oo=()=>this._o(),this.ao=[],this.uo()}ro(t){this.ao.push(t)}shutdown(){window.removeEventListener("online",this.io),window.removeEventListener("offline",this.oo)}uo(){window.addEventListener("online",this.io),window.addEventListener("offline",this.oo)}so(){_("ConnectivityMonitor","Network connectivity changed: AVAILABLE");for(const t of this.ao)t(0)}_o(){_("ConnectivityMonitor","Network connectivity changed: UNAVAILABLE");for(const t of this.ao)t(1)}static D(){return typeof window<"u"&&window.addEventListener!==void 0&&window.removeEventListener!==void 0}}/**
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
 */let En=null;function Ar(){return En===null?En=function(){return 268435456+Math.round(2147483648*Math.random())}():En++,"0x"+En.toString(16)}/**
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
 */const pc={BatchGetDocuments:"batchGet",Commit:"commit",RunQuery:"runQuery",RunAggregationQuery:"runAggregationQuery"};/**
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
 */class _c{constructor(t){this.co=t.co,this.lo=t.lo}ho(t){this.Po=t}Io(t){this.To=t}onMessage(t){this.Eo=t}close(){this.lo()}send(t){this.co(t)}Ao(){this.Po()}Ro(t){this.To(t)}Vo(t){this.Eo(t)}}/**
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
 */const Y="WebChannelConnection";class yc extends class{constructor(e){this.databaseInfo=e,this.databaseId=e.databaseId;const r=e.ssl?"https":"http",s=encodeURIComponent(this.databaseId.projectId),i=encodeURIComponent(this.databaseId.database);this.mo=r+"://"+e.host,this.fo=`projects/${s}/databases/${i}`,this.po=this.databaseId.database==="(default)"?`project_id=${s}`:`project_id=${s}&database_id=${i}`}get yo(){return!1}wo(e,r,s,i,o){const a=Ar(),u=this.So(e,r);_("RestConnection",`Sending RPC '${e}' ${a}:`,u,s);const l={"google-cloud-resource-prefix":this.fo,"x-goog-request-params":this.po};return this.bo(l,i,o),this.Do(e,u,l,s).then(h=>(_("RestConnection",`Received RPC '${e}' ${a}: `,h),h),h=>{throw se("RestConnection",`RPC '${e}' ${a} failed with error: `,h,"url: ",u,"request:",s),h})}Co(e,r,s,i,o,a){return this.wo(e,r,s,i,o)}bo(e,r,s){e["X-Goog-Api-Client"]=function(){return"gl-js/ fire/"+fe}(),e["Content-Type"]="text/plain",this.databaseInfo.appId&&(e["X-Firebase-GMPID"]=this.databaseInfo.appId),r&&r.headers.forEach((i,o)=>e[o]=i),s&&s.headers.forEach((i,o)=>e[o]=i)}So(e,r){const s=pc[e];return`${this.mo}/v1/${r}:${s}`}}{constructor(t){super(t),this.forceLongPolling=t.forceLongPolling,this.autoDetectLongPolling=t.autoDetectLongPolling,this.useFetchStreams=t.useFetchStreams,this.longPollingOptions=t.longPollingOptions}Do(t,e,r,s){const i=Ar();return new Promise((o,a)=>{const u=new Vl;u.setWithCredentials(!0),u.listenOnce(Rl.COMPLETE,()=>{try{switch(u.getLastErrorCode()){case wr.NO_ERROR:const h=u.getResponseJson();_(Y,`XHR for RPC '${t}' ${i} received:`,JSON.stringify(h)),o(h);break;case wr.TIMEOUT:_(Y,`RPC '${t}' ${i} timed out`),a(new y(f.DEADLINE_EXCEEDED,"Request time out"));break;case wr.HTTP_ERROR:const c=u.getStatus();if(_(Y,`RPC '${t}' ${i} failed with status:`,c,"response text:",u.getResponseText()),c>0){let d=u.getResponseJson();Array.isArray(d)&&(d=d[0]);const g=d?.error;if(g&&g.status&&g.message){const R=function(T){const x=T.toLowerCase().replace(/_/g,"-");return Object.values(f).indexOf(x)>=0?x:f.UNKNOWN}(g.status);a(new y(R,g.message))}else a(new y(f.UNKNOWN,"Server responded with status "+u.getStatus()))}else a(new y(f.UNAVAILABLE,"Connection failed."));break;default:v()}}finally{_(Y,`RPC '${t}' ${i} completed.`)}});const l=JSON.stringify(s);_(Y,`RPC '${t}' ${i} sending request:`,s),u.send(e,"POST",l,r,15)})}vo(t,e,r){const s=Ar(),i=[this.mo,"/","google.firestore.v1.Firestore","/",t,"/channel"],o=wl(),a=Al(),u={httpSessionIdParam:"gsessionid",initMessageHeaders:{},messageUrlParams:{database:`projects/${this.databaseId.projectId}/databases/${this.databaseId.database}`},sendRawJson:!0,supportsCrossDomainXhr:!0,internalChannelParams:{forwardChannelRequestTimeoutMs:6e5},forceLongPolling:this.forceLongPolling,detectBufferingProxy:this.autoDetectLongPolling},l=this.longPollingOptions.timeoutSeconds;l!==void 0&&(u.longPollingTimeout=Math.round(1e3*l)),this.useFetchStreams&&(u.useFetchStreams=!0),this.bo(u.initMessageHeaders,e,r),u.encodeInitMessageHeaders=!0;const h=i.join("");_(Y,`Creating RPC '${t}' stream ${s}: ${h}`,u);const c=o.createWebChannel(h,u);let d=!1,g=!1;const R=new _c({co:T=>{g?_(Y,`Not sending because RPC '${t}' stream ${s} is closed:`,T):(d||(_(Y,`Opening RPC '${t}' stream ${s} transport.`),c.open(),d=!0),_(Y,`RPC '${t}' stream ${s} sending:`,T),c.send(T))},lo:()=>c.close()}),P=(T,x,$)=>{T.listen(x,ot=>{try{$(ot)}catch(Et){setTimeout(()=>{throw Et},0)}})};return P(c,pn.EventType.OPEN,()=>{g||_(Y,`RPC '${t}' stream ${s} transport opened.`)}),P(c,pn.EventType.CLOSE,()=>{g||(g=!0,_(Y,`RPC '${t}' stream ${s} transport closed`),R.Ro())}),P(c,pn.EventType.ERROR,T=>{g||(g=!0,se(Y,`RPC '${t}' stream ${s} transport errored:`,T),R.Ro(new y(f.UNAVAILABLE,"The operation could not be completed")))}),P(c,pn.EventType.MESSAGE,T=>{var x;if(!g){const $=T.data[0];D(!!$);const ot=$,Et=ot.error||((x=ot[0])===null||x===void 0?void 0:x.error);if(Et){_(Y,`RPC '${t}' stream ${s} received error:`,Et);const hn=Et.status;let Qt=function(du){const Qs=L[du];if(Qs!==void 0)return Ta(Qs)}(hn),cn=Et.message;Qt===void 0&&(Qt=f.INTERNAL,cn="Unknown error status: "+hn+" with message "+Et.message),g=!0,R.Ro(new y(Qt,cn)),c.close()}else _(Y,`RPC '${t}' stream ${s} received:`,$),R.Vo($)}}),P(a,Pl.STAT_EVENT,T=>{T.stat===ui.PROXY?_(Y,`RPC '${t}' stream ${s} detected buffering proxy`):T.stat===ui.NOPROXY&&_(Y,`RPC '${t}' stream ${s} detected no buffering proxy`)}),setTimeout(()=>{R.Ao()},0),R}}function Rr(){return typeof document<"u"?document:null}/**
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
 */function lr(n){return new Ch(n,!0)}/**
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
 */class ks{constructor(t,e,r=1e3,s=1.5,i=6e4){this.si=t,this.timerId=e,this.Fo=r,this.Mo=s,this.xo=i,this.Oo=0,this.No=null,this.Bo=Date.now(),this.reset()}reset(){this.Oo=0}Lo(){this.Oo=this.xo}ko(t){this.cancel();const e=Math.floor(this.Oo+this.qo()),r=Math.max(0,Date.now()-this.Bo),s=Math.max(0,e-r);s>0&&_("ExponentialBackoff",`Backing off for ${s} ms (base delay: ${this.Oo} ms, delay with jitter: ${e} ms, last attempt: ${r} ms ago)`),this.No=this.si.enqueueAfterDelay(this.timerId,s,()=>(this.Bo=Date.now(),t())),this.Oo*=this.Mo,this.Oo<this.Fo&&(this.Oo=this.Fo),this.Oo>this.xo&&(this.Oo=this.xo)}Qo(){this.No!==null&&(this.No.skipDelay(),this.No=null)}cancel(){this.No!==null&&(this.No.cancel(),this.No=null)}qo(){return(Math.random()-.5)*this.Oo}}/**
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
 */class Na{constructor(t,e,r,s,i,o,a,u){this.si=t,this.Ko=r,this.$o=s,this.connection=i,this.authCredentialsProvider=o,this.appCheckCredentialsProvider=a,this.listener=u,this.state=0,this.Uo=0,this.Wo=null,this.Go=null,this.stream=null,this.zo=new ks(t,e)}jo(){return this.state===1||this.state===5||this.Ho()}Ho(){return this.state===2||this.state===3}start(){this.state!==4?this.auth():this.Jo()}async stop(){this.jo()&&await this.close(0)}Yo(){this.state=0,this.zo.reset()}Zo(){this.Ho()&&this.Wo===null&&(this.Wo=this.si.enqueueAfterDelay(this.Ko,6e4,()=>this.Xo()))}e_(t){this.t_(),this.stream.send(t)}async Xo(){if(this.Ho())return this.close(0)}t_(){this.Wo&&(this.Wo.cancel(),this.Wo=null)}n_(){this.Go&&(this.Go.cancel(),this.Go=null)}async close(t,e){this.t_(),this.n_(),this.zo.cancel(),this.Uo++,t!==4?this.zo.reset():e&&e.code===f.RESOURCE_EXHAUSTED?(wt(e.toString()),wt("Using maximum backoff delay to prevent overloading the backend."),this.zo.Lo()):e&&e.code===f.UNAUTHENTICATED&&this.state!==3&&(this.authCredentialsProvider.invalidateToken(),this.appCheckCredentialsProvider.invalidateToken()),this.stream!==null&&(this.r_(),this.stream.close(),this.stream=null),this.state=t,await this.listener.Io(e)}r_(){}auth(){this.state=1;const t=this.i_(this.Uo),e=this.Uo;Promise.all([this.authCredentialsProvider.getToken(),this.appCheckCredentialsProvider.getToken()]).then(([r,s])=>{this.Uo===e&&this.s_(r,s)},r=>{t(()=>{const s=new y(f.UNKNOWN,"Fetching auth token failed: "+r.message);return this.o_(s)})})}s_(t,e){const r=this.i_(this.Uo);this.stream=this.__(t,e),this.stream.ho(()=>{r(()=>(this.state=2,this.Go=this.si.enqueueAfterDelay(this.$o,1e4,()=>(this.Ho()&&(this.state=3),Promise.resolve())),this.listener.ho()))}),this.stream.Io(s=>{r(()=>this.o_(s))}),this.stream.onMessage(s=>{r(()=>this.onMessage(s))})}Jo(){this.state=5,this.zo.ko(async()=>{this.state=0,this.start()})}o_(t){return _("PersistentStream",`close with error: ${t}`),this.stream=null,this.close(4,t)}i_(t){return e=>{this.si.enqueueAndForget(()=>this.Uo===t?e():(_("PersistentStream","stream callback skipped by getCloseGuardedDispatcher."),Promise.resolve()))}}}class Ec extends Na{constructor(t,e,r,s,i,o){super(t,"listen_stream_connection_backoff","listen_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i}__(t,e){return this.connection.vo("Listen",t,e)}onMessage(t){this.zo.reset();const e=xh(this.serializer,t),r=function(i){if(!("targetChange"in i))return I.min();const o=i.targetChange;return o.targetIds&&o.targetIds.length?I.min():o.readTime?ut(o.readTime):I.min()}(t);return this.listener.a_(e,r)}u_(t){const e={};e.database=Ge(this.serializer),e.addTarget=function(i,o){let a;const u=o.target;if(a=jr(u)?{documents:Oh(i,u)}:{query:Fh(i,u)},a.targetId=o.targetId,o.resumeToken.approximateByteSize()>0){a.resumeToken=wa(i,o.resumeToken);const l=Gr(i,o.expectedCount);l!==null&&(a.expectedCount=l)}else if(o.snapshotVersion.compareTo(I.min())>0){a.readTime=Mn(i,o.snapshotVersion.toTimestamp());const l=Gr(i,o.expectedCount);l!==null&&(a.expectedCount=l)}return a}(this.serializer,t);const r=bh(this.serializer,t);r&&(e.labels=r),this.e_(e)}c_(t){const e={};e.database=Ge(this.serializer),e.removeTarget=t,this.e_(e)}}class Tc extends Na{constructor(t,e,r,s,i,o){super(t,"write_stream_connection_backoff","write_stream_idle","health_check_timeout",e,r,s,o),this.serializer=i,this.l_=!1}get h_(){return this.l_}start(){this.l_=!1,this.lastStreamToken=void 0,super.start()}r_(){this.l_&&this.P_([])}__(t,e){return this.connection.vo("Write",t,e)}onMessage(t){if(D(!!t.streamToken),this.lastStreamToken=t.streamToken,this.l_){this.zo.reset();const e=Mh(t.writeResults,t.commitTime),r=ut(t.commitTime);return this.listener.I_(r,e)}return D(!t.writeResults||t.writeResults.length===0),this.l_=!0,this.listener.T_()}E_(){const t={};t.database=Ge(this.serializer),this.e_(t)}P_(t){const e={streamToken:this.lastStreamToken,writes:t.map(r=>Pa(this.serializer,r))};this.e_(e)}}/**
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
 */class vc extends class{}{constructor(t,e,r,s){super(),this.authCredentials=t,this.appCheckCredentials=e,this.connection=r,this.serializer=s,this.d_=!1}A_(){if(this.d_)throw new y(f.FAILED_PRECONDITION,"The client has already been terminated.")}wo(t,e,r){return this.A_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([s,i])=>this.connection.wo(t,e,r,s,i)).catch(s=>{throw s.name==="FirebaseError"?(s.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),s):new y(f.UNKNOWN,s.toString())})}Co(t,e,r,s){return this.A_(),Promise.all([this.authCredentials.getToken(),this.appCheckCredentials.getToken()]).then(([i,o])=>this.connection.Co(t,e,r,i,o,s)).catch(i=>{throw i.name==="FirebaseError"?(i.code===f.UNAUTHENTICATED&&(this.authCredentials.invalidateToken(),this.appCheckCredentials.invalidateToken()),i):new y(f.UNKNOWN,i.toString())})}terminate(){this.d_=!0}}class Ic{constructor(t,e){this.asyncQueue=t,this.onlineStateHandler=e,this.state="Unknown",this.V_=0,this.m_=null,this.f_=!0}g_(){this.V_===0&&(this.p_("Unknown"),this.m_=this.asyncQueue.enqueueAfterDelay("online_state_timeout",1e4,()=>(this.m_=null,this.y_("Backend didn't respond within 10 seconds."),this.p_("Offline"),Promise.resolve())))}w_(t){this.state==="Online"?this.p_("Unknown"):(this.V_++,this.V_>=1&&(this.S_(),this.y_(`Connection failed 1 times. Most recent error: ${t.toString()}`),this.p_("Offline")))}set(t){this.S_(),this.V_=0,t==="Online"&&(this.f_=!1),this.p_(t)}p_(t){t!==this.state&&(this.state=t,this.onlineStateHandler(t))}y_(t){const e=`Could not reach Cloud Firestore backend. ${t}
This typically indicates that your device does not have a healthy Internet connection at the moment. The client will operate in offline mode until it is able to successfully connect to the backend.`;this.f_?(wt(e),this.f_=!1):_("OnlineStateTracker",e)}S_(){this.m_!==null&&(this.m_.cancel(),this.m_=null)}}/**
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
 */class wc{constructor(t,e,r,s,i){this.localStore=t,this.datastore=e,this.asyncQueue=r,this.remoteSyncer={},this.b_=[],this.D_=new Map,this.C_=new Set,this.v_=[],this.F_=i,this.F_.ro(o=>{r.enqueueAndForget(async()=>{Kt(this)&&(_("RemoteStore","Restarting streams for network reachability change."),await async function(u){const l=A(u);l.C_.add(4),await sn(l),l.M_.set("Unknown"),l.C_.delete(4),await hr(l)}(this))})}),this.M_=new Ic(r,s)}}async function hr(n){if(Kt(n))for(const t of n.v_)await t(!0)}async function sn(n){for(const t of n.v_)await t(!1)}function xa(n,t){const e=A(n);e.D_.has(t.targetId)||(e.D_.set(t.targetId,t),Ms(e)?xs(e):ge(e).Ho()&&Ns(e,t))}function Ma(n,t){const e=A(n),r=ge(e);e.D_.delete(t),r.Ho()&&Oa(e,t),e.D_.size===0&&(r.Ho()?r.Zo():Kt(e)&&e.M_.set("Unknown"))}function Ns(n,t){if(n.x_.Oe(t.targetId),t.resumeToken.approximateByteSize()>0||t.snapshotVersion.compareTo(I.min())>0){const e=n.remoteSyncer.getRemoteKeysForTarget(t.targetId).size;t=t.withExpectedCount(e)}ge(n).u_(t)}function Oa(n,t){n.x_.Oe(t),ge(n).c_(t)}function xs(n){n.x_=new Rh({getRemoteKeysForTarget:t=>n.remoteSyncer.getRemoteKeysForTarget(t),_t:t=>n.D_.get(t)||null,nt:()=>n.datastore.serializer.databaseId}),ge(n).start(),n.M_.g_()}function Ms(n){return Kt(n)&&!ge(n).jo()&&n.D_.size>0}function Kt(n){return A(n).C_.size===0}function Fa(n){n.x_=void 0}async function Ac(n){n.D_.forEach((t,e)=>{Ns(n,t)})}async function Rc(n,t){Fa(n),Ms(n)?(n.M_.w_(t),xs(n)):n.M_.set("Unknown")}async function Pc(n,t,e){if(n.M_.set("Online"),t instanceof Ia&&t.state===2&&t.cause)try{await async function(s,i){const o=i.cause;for(const a of i.targetIds)s.D_.has(a)&&(await s.remoteSyncer.rejectListen(a,o),s.D_.delete(a),s.x_.removeTarget(a))}(n,t)}catch(r){_("RemoteStore","Failed to remove targets %s: %s ",t.targetIds.join(","),r),await Fn(n,r)}else if(t instanceof In?n.x_.$e(t):t instanceof va?n.x_.Je(t):n.x_.Ge(t),!e.isEqual(I.min()))try{const r=await ka(n.localStore);e.compareTo(r)>=0&&await function(i,o){const a=i.x_.it(o);return a.targetChanges.forEach((u,l)=>{if(u.resumeToken.approximateByteSize()>0){const h=i.D_.get(l);h&&i.D_.set(l,h.withResumeToken(u.resumeToken,o))}}),a.targetMismatches.forEach((u,l)=>{const h=i.D_.get(u);if(!h)return;i.D_.set(u,h.withResumeToken(nt.EMPTY_BYTE_STRING,h.snapshotVersion)),Oa(i,u);const c=new Vt(h.target,u,l,h.sequenceNumber);Ns(i,c)}),i.remoteSyncer.applyRemoteEvent(a)}(n,e)}catch(r){_("RemoteStore","Failed to raise snapshot:",r),await Fn(n,r)}}async function Fn(n,t,e){if(!tn(t))throw t;n.C_.add(1),await sn(n),n.M_.set("Offline"),e||(e=()=>ka(n.localStore)),n.asyncQueue.enqueueRetryable(async()=>{_("RemoteStore","Retrying IndexedDB access"),await e(),n.C_.delete(1),await hr(n)})}function La(n,t){return t().catch(e=>Fn(n,e,t))}async function cr(n){const t=A(n),e=Nt(t);let r=t.b_.length>0?t.b_[t.b_.length-1].batchId:-1;for(;Vc(t);)try{const s=await cc(t.localStore,r);if(s===null){t.b_.length===0&&e.Zo();break}r=s.batchId,Sc(t,s)}catch(s){await Fn(t,s)}ba(t)&&Ua(t)}function Vc(n){return Kt(n)&&n.b_.length<10}function Sc(n,t){n.b_.push(t);const e=Nt(n);e.Ho()&&e.h_&&e.P_(t.mutations)}function ba(n){return Kt(n)&&!Nt(n).jo()&&n.b_.length>0}function Ua(n){Nt(n).start()}async function Cc(n){Nt(n).E_()}async function Dc(n){const t=Nt(n);for(const e of n.b_)t.P_(e.mutations)}async function kc(n,t,e){const r=n.b_.shift(),s=Rs.from(r,t,e);await La(n,()=>n.remoteSyncer.applySuccessfulWrite(s)),await cr(n)}async function Nc(n,t){t&&Nt(n).h_&&await async function(r,s){if(function(o){return Ea(o)&&o!==f.ABORTED}(s.code)){const i=r.b_.shift();Nt(r).Yo(),await La(r,()=>r.remoteSyncer.rejectFailedWrite(i.batchId,s)),await cr(r)}}(n,t),ba(n)&&Ua(n)}async function Ni(n,t){const e=A(n);e.asyncQueue.verifyOperationInProgress(),_("RemoteStore","RemoteStore received new credentials");const r=Kt(e);e.C_.add(3),await sn(e),r&&e.M_.set("Unknown"),await e.remoteSyncer.handleCredentialChange(t),e.C_.delete(3),await hr(e)}async function xc(n,t){const e=A(n);t?(e.C_.delete(2),await hr(e)):t||(e.C_.add(2),await sn(e),e.M_.set("Unknown"))}function ge(n){return n.O_||(n.O_=function(e,r,s){const i=A(e);return i.A_(),new Ec(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{ho:Ac.bind(null,n),Io:Rc.bind(null,n),a_:Pc.bind(null,n)}),n.v_.push(async t=>{t?(n.O_.Yo(),Ms(n)?xs(n):n.M_.set("Unknown")):(await n.O_.stop(),Fa(n))})),n.O_}function Nt(n){return n.N_||(n.N_=function(e,r,s){const i=A(e);return i.A_(),new Tc(r,i.connection,i.authCredentials,i.appCheckCredentials,i.serializer,s)}(n.datastore,n.asyncQueue,{ho:Cc.bind(null,n),Io:Nc.bind(null,n),T_:Dc.bind(null,n),I_:kc.bind(null,n)}),n.v_.push(async t=>{t?(n.N_.Yo(),await cr(n)):(await n.N_.stop(),n.b_.length>0&&(_("RemoteStore",`Stopping write stream with ${n.b_.length} pending writes`),n.b_=[]))})),n.N_}/**
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
 */class Os{constructor(t,e,r,s,i){this.asyncQueue=t,this.timerId=e,this.targetTimeMs=r,this.op=s,this.removalCallback=i,this.deferred=new vt,this.then=this.deferred.promise.then.bind(this.deferred.promise),this.deferred.promise.catch(o=>{})}get promise(){return this.deferred.promise}static createAndSchedule(t,e,r,s,i){const o=Date.now()+r,a=new Os(t,e,o,s,i);return a.start(r),a}start(t){this.timerHandle=setTimeout(()=>this.handleDelayElapsed(),t)}skipDelay(){return this.handleDelayElapsed()}cancel(t){this.timerHandle!==null&&(this.clearTimeout(),this.deferred.reject(new y(f.CANCELLED,"Operation cancelled"+(t?": "+t:""))))}handleDelayElapsed(){this.asyncQueue.enqueueAndForget(()=>this.timerHandle!==null?(this.clearTimeout(),this.op().then(t=>this.deferred.resolve(t))):Promise.resolve())}clearTimeout(){this.timerHandle!==null&&(this.removalCallback(this),clearTimeout(this.timerHandle),this.timerHandle=null)}}function Fs(n,t){if(wt("AsyncQueue",`${t}: ${n}`),tn(n))return new y(f.UNAVAILABLE,`${t}: ${n}`);throw n}/**
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
 */class ne{constructor(t){this.comparator=t?(e,r)=>t(e,r)||E.comparator(e.key,r.key):(e,r)=>E.comparator(e.key,r.key),this.keyedMap=ve(),this.sortedSet=new O(this.comparator)}static emptySet(t){return new ne(t.comparator)}has(t){return this.keyedMap.get(t)!=null}get(t){return this.keyedMap.get(t)}first(){return this.sortedSet.minKey()}last(){return this.sortedSet.maxKey()}isEmpty(){return this.sortedSet.isEmpty()}indexOf(t){const e=this.keyedMap.get(t);return e?this.sortedSet.indexOf(e):-1}get size(){return this.sortedSet.size}forEach(t){this.sortedSet.inorderTraversal((e,r)=>(t(e),!1))}add(t){const e=this.delete(t.key);return e.copy(e.keyedMap.insert(t.key,t),e.sortedSet.insert(t,null))}delete(t){const e=this.get(t);return e?this.copy(this.keyedMap.remove(t),this.sortedSet.remove(e)):this}isEqual(t){if(!(t instanceof ne)||this.size!==t.size)return!1;const e=this.sortedSet.getIterator(),r=t.sortedSet.getIterator();for(;e.hasNext();){const s=e.getNext().key,i=r.getNext().key;if(!s.isEqual(i))return!1}return!0}toString(){const t=[];return this.forEach(e=>{t.push(e.toString())}),t.length===0?"DocumentSet ()":`DocumentSet (
  `+t.join(`  
`)+`
)`}copy(t,e){const r=new ne;return r.comparator=this.comparator,r.keyedMap=t,r.sortedSet=e,r}}/**
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
 */class xi{constructor(){this.B_=new O(E.comparator)}track(t){const e=t.doc.key,r=this.B_.get(e);r?t.type!==0&&r.type===3?this.B_=this.B_.insert(e,t):t.type===3&&r.type!==1?this.B_=this.B_.insert(e,{type:r.type,doc:t.doc}):t.type===2&&r.type===2?this.B_=this.B_.insert(e,{type:2,doc:t.doc}):t.type===2&&r.type===0?this.B_=this.B_.insert(e,{type:0,doc:t.doc}):t.type===1&&r.type===0?this.B_=this.B_.remove(e):t.type===1&&r.type===2?this.B_=this.B_.insert(e,{type:1,doc:r.doc}):t.type===0&&r.type===1?this.B_=this.B_.insert(e,{type:2,doc:t.doc}):v():this.B_=this.B_.insert(e,t)}L_(){const t=[];return this.B_.inorderTraversal((e,r)=>{t.push(r)}),t}}class le{constructor(t,e,r,s,i,o,a,u,l){this.query=t,this.docs=e,this.oldDocs=r,this.docChanges=s,this.mutatedKeys=i,this.fromCache=o,this.syncStateChanged=a,this.excludesMetadataChanges=u,this.hasCachedResults=l}static fromInitialDocuments(t,e,r,s,i){const o=[];return e.forEach(a=>{o.push({type:0,doc:a})}),new le(t,e,ne.emptySet(e),o,r,s,!0,!1,i)}get hasPendingWrites(){return!this.mutatedKeys.isEmpty()}isEqual(t){if(!(this.fromCache===t.fromCache&&this.hasCachedResults===t.hasCachedResults&&this.syncStateChanged===t.syncStateChanged&&this.mutatedKeys.isEqual(t.mutatedKeys)&&rr(this.query,t.query)&&this.docs.isEqual(t.docs)&&this.oldDocs.isEqual(t.oldDocs)))return!1;const e=this.docChanges,r=t.docChanges;if(e.length!==r.length)return!1;for(let s=0;s<e.length;s++)if(e[s].type!==r[s].type||!e[s].doc.isEqual(r[s].doc))return!1;return!0}}/**
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
 */class Mc{constructor(){this.k_=void 0,this.listeners=[]}}class Oc{constructor(){this.queries=new me(t=>sa(t),rr),this.onlineState="Unknown",this.q_=new Set}}async function qa(n,t){const e=A(n),r=t.query;let s=!1,i=e.queries.get(r);if(i||(s=!0,i=new Mc),s)try{i.k_=await e.onListen(r)}catch(o){const a=Fs(o,`Initialization of query '${Ht(t.query)}' failed`);return void t.onError(a)}e.queries.set(r,i),i.listeners.push(t),t.Q_(e.onlineState),i.k_&&t.K_(i.k_)&&Ls(e)}async function Ba(n,t){const e=A(n),r=t.query;let s=!1;const i=e.queries.get(r);if(i){const o=i.listeners.indexOf(t);o>=0&&(i.listeners.splice(o,1),s=i.listeners.length===0)}if(s)return e.queries.delete(r),e.onUnlisten(r)}function Fc(n,t){const e=A(n);let r=!1;for(const s of t){const i=s.query,o=e.queries.get(i);if(o){for(const a of o.listeners)a.K_(s)&&(r=!0);o.k_=s}}r&&Ls(e)}function Lc(n,t,e){const r=A(n),s=r.queries.get(t);if(s)for(const i of s.listeners)i.onError(e);r.queries.delete(t)}function Ls(n){n.q_.forEach(t=>{t.next()})}class ja{constructor(t,e,r){this.query=t,this.U_=e,this.W_=!1,this.G_=null,this.onlineState="Unknown",this.options=r||{}}K_(t){if(!this.options.includeMetadataChanges){const r=[];for(const s of t.docChanges)s.type!==3&&r.push(s);t=new le(t.query,t.docs,t.oldDocs,r,t.mutatedKeys,t.fromCache,t.syncStateChanged,!0,t.hasCachedResults)}let e=!1;return this.W_?this.z_(t)&&(this.U_.next(t),e=!0):this.j_(t,this.onlineState)&&(this.H_(t),e=!0),this.G_=t,e}onError(t){this.U_.error(t)}Q_(t){this.onlineState=t;let e=!1;return this.G_&&!this.W_&&this.j_(this.G_,t)&&(this.H_(this.G_),e=!0),e}j_(t,e){if(!t.fromCache)return!0;const r=e!=="Offline";return(!this.options.J_||!r)&&(!t.docs.isEmpty()||t.hasCachedResults||e==="Offline")}z_(t){if(t.docChanges.length>0)return!0;const e=this.G_&&this.G_.hasPendingWrites!==t.hasPendingWrites;return!(!t.syncStateChanged&&!e)&&this.options.includeMetadataChanges===!0}H_(t){t=le.fromInitialDocuments(t.query,t.docs,t.mutatedKeys,t.fromCache,t.hasCachedResults),this.W_=!0,this.U_.next(t)}}/**
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
 */class za{constructor(t){this.key=t}}class Ga{constructor(t){this.key=t}}class bc{constructor(t,e){this.query=t,this.ia=e,this.sa=null,this.hasCachedResults=!1,this.current=!1,this.oa=V(),this.mutatedKeys=V(),this._a=ia(t),this.aa=new ne(this._a)}get ua(){return this.ia}ca(t,e){const r=e?e.la:new xi,s=e?e.aa:this.aa;let i=e?e.mutatedKeys:this.mutatedKeys,o=s,a=!1;const u=this.query.limitType==="F"&&s.size===this.query.limit?s.last():null,l=this.query.limitType==="L"&&s.size===this.query.limit?s.first():null;if(t.inorderTraversal((h,c)=>{const d=s.get(h),g=sr(this.query,c)?c:null,R=!!d&&this.mutatedKeys.has(d.key),P=!!g&&(g.hasLocalMutations||this.mutatedKeys.has(g.key)&&g.hasCommittedMutations);let T=!1;d&&g?d.data.isEqual(g.data)?R!==P&&(r.track({type:3,doc:g}),T=!0):this.ha(d,g)||(r.track({type:2,doc:g}),T=!0,(u&&this._a(g,u)>0||l&&this._a(g,l)<0)&&(a=!0)):!d&&g?(r.track({type:0,doc:g}),T=!0):d&&!g&&(r.track({type:1,doc:d}),T=!0,(u||l)&&(a=!0)),T&&(g?(o=o.add(g),i=P?i.add(h):i.delete(h)):(o=o.delete(h),i=i.delete(h)))}),this.query.limit!==null)for(;o.size>this.query.limit;){const h=this.query.limitType==="F"?o.last():o.first();o=o.delete(h.key),i=i.delete(h.key),r.track({type:1,doc:h})}return{aa:o,la:r,Zi:a,mutatedKeys:i}}ha(t,e){return t.hasLocalMutations&&e.hasCommittedMutations&&!e.hasLocalMutations}applyChanges(t,e,r,s){const i=this.aa;this.aa=t.aa,this.mutatedKeys=t.mutatedKeys;const o=t.la.L_();o.sort((h,c)=>function(g,R){const P=T=>{switch(T){case 0:return 1;case 2:case 3:return 2;case 1:return 0;default:return v()}};return P(g)-P(R)}(h.type,c.type)||this._a(h.doc,c.doc)),this.Pa(r),s=s!=null&&s;const a=e&&!s?this.Ia():[],u=this.oa.size===0&&this.current&&!s?1:0,l=u!==this.sa;return this.sa=u,o.length!==0||l?{snapshot:new le(this.query,t.aa,i,o,t.mutatedKeys,u===0,l,!1,!!r&&r.resumeToken.approximateByteSize()>0),Ta:a}:{Ta:a}}Q_(t){return this.current&&t==="Offline"?(this.current=!1,this.applyChanges({aa:this.aa,la:new xi,mutatedKeys:this.mutatedKeys,Zi:!1},!1)):{Ta:[]}}Ea(t){return!this.ia.has(t)&&!!this.aa.has(t)&&!this.aa.get(t).hasLocalMutations}Pa(t){t&&(t.addedDocuments.forEach(e=>this.ia=this.ia.add(e)),t.modifiedDocuments.forEach(e=>{}),t.removedDocuments.forEach(e=>this.ia=this.ia.delete(e)),this.current=t.current)}Ia(){if(!this.current)return[];const t=this.oa;this.oa=V(),this.aa.forEach(r=>{this.Ea(r.key)&&(this.oa=this.oa.add(r.key))});const e=[];return t.forEach(r=>{this.oa.has(r)||e.push(new Ga(r))}),this.oa.forEach(r=>{t.has(r)||e.push(new za(r))}),e}da(t){this.ia=t.ls,this.oa=V();const e=this.ca(t.documents);return this.applyChanges(e,!0)}Aa(){return le.fromInitialDocuments(this.query,this.aa,this.mutatedKeys,this.sa===0,this.hasCachedResults)}}class Uc{constructor(t,e,r){this.query=t,this.targetId=e,this.view=r}}class qc{constructor(t){this.key=t,this.Ra=!1}}class Bc{constructor(t,e,r,s,i,o){this.localStore=t,this.remoteStore=e,this.eventManager=r,this.sharedClientState=s,this.currentUser=i,this.maxConcurrentLimboResolutions=o,this.Va={},this.ma=new me(a=>sa(a),rr),this.fa=new Map,this.ga=new Set,this.pa=new O(E.comparator),this.ya=new Map,this.wa=new Ss,this.Sa={},this.ba=new Map,this.Da=ue.Nn(),this.onlineState="Unknown",this.Ca=void 0}get isPrimaryClient(){return this.Ca===!0}}async function jc(n,t){const e=Jc(n);let r,s;const i=e.ma.get(t);if(i)r=i.targetId,e.sharedClientState.addLocalQueryTarget(r),s=i.view.Aa();else{const o=await dc(e.localStore,pt(t)),a=e.sharedClientState.addLocalQueryTarget(o.targetId);r=o.targetId,s=await zc(e,t,r,a==="current",o.resumeToken),e.isPrimaryClient&&xa(e.remoteStore,o)}return s}async function zc(n,t,e,r,s){n.va=(c,d,g)=>async function(P,T,x,$){let ot=T.view.ca(x);ot.Zi&&(ot=await Ci(P.localStore,T.query,!1).then(({documents:cn})=>T.view.ca(cn,ot)));const Et=$&&$.targetChanges.get(T.targetId),hn=$&&$.targetMismatches.get(T.targetId)!=null,Qt=T.view.applyChanges(ot,P.isPrimaryClient,Et,hn);return Oi(P,T.targetId,Qt.Ta),Qt.snapshot}(n,c,d,g);const i=await Ci(n.localStore,t,!0),o=new bc(t,i.ls),a=o.ca(i.documents),u=rn.createSynthesizedTargetChangeForCurrentChange(e,r&&n.onlineState!=="Offline",s),l=o.applyChanges(a,n.isPrimaryClient,u);Oi(n,e,l.Ta);const h=new Uc(t,e,o);return n.ma.set(t,h),n.fa.has(e)?n.fa.get(e).push(t):n.fa.set(e,[t]),l.snapshot}async function Gc(n,t){const e=A(n),r=e.ma.get(t),s=e.fa.get(r.targetId);if(s.length>1)return e.fa.set(r.targetId,s.filter(i=>!rr(i,t))),void e.ma.delete(t);e.isPrimaryClient?(e.sharedClientState.removeLocalQueryTarget(r.targetId),e.sharedClientState.isActiveQueryTarget(r.targetId)||await Kr(e.localStore,r.targetId,!1).then(()=>{e.sharedClientState.clearQueryState(r.targetId),Ma(e.remoteStore,r.targetId),Qr(e,r.targetId)}).catch(Ze)):(Qr(e,r.targetId),await Kr(e.localStore,r.targetId,!0))}async function $c(n,t,e){const r=Zc(n);try{const s=await function(o,a){const u=A(o),l=q.now(),h=a.reduce((g,R)=>g.add(R.key),V());let c,d;return u.persistence.runTransaction("Locally write mutations","readwrite",g=>{let R=At(),P=V();return u.ss.getEntries(g,h).next(T=>{R=T,R.forEach((x,$)=>{$.isValidDocument()||(P=P.add(x))})}).next(()=>u.localDocuments.getOverlayedDocuments(g,R)).next(T=>{c=T;const x=[];for(const $ of a){const ot=Eh($,c.get($.key).overlayedDocument);ot!=null&&x.push(new Ot($.key,ot,Yo(ot.value.mapValue),Z.exists(!0)))}return u.mutationQueue.addMutationBatch(g,l,x,a)}).next(T=>{d=T;const x=T.applyToLocalDocumentSet(c,P);return u.documentOverlayCache.saveOverlays(g,T.batchId,x)})}).then(()=>({batchId:d.batchId,changes:aa(c)}))}(r.localStore,t);r.sharedClientState.addPendingMutation(s.batchId),function(o,a,u){let l=o.Sa[o.currentUser.toKey()];l||(l=new O(C)),l=l.insert(a,u),o.Sa[o.currentUser.toKey()]=l}(r,s.batchId,e),await on(r,s.changes),await cr(r.remoteStore)}catch(s){const i=Fs(s,"Failed to persist write");e.reject(i)}}async function $a(n,t){const e=A(n);try{const r=await lc(e.localStore,t);t.targetChanges.forEach((s,i)=>{const o=e.ya.get(i);o&&(D(s.addedDocuments.size+s.modifiedDocuments.size+s.removedDocuments.size<=1),s.addedDocuments.size>0?o.Ra=!0:s.modifiedDocuments.size>0?D(o.Ra):s.removedDocuments.size>0&&(D(o.Ra),o.Ra=!1))}),await on(e,r,t)}catch(r){await Ze(r)}}function Mi(n,t,e){const r=A(n);if(r.isPrimaryClient&&e===0||!r.isPrimaryClient&&e===1){const s=[];r.ma.forEach((i,o)=>{const a=o.view.Q_(t);a.snapshot&&s.push(a.snapshot)}),function(o,a){const u=A(o);u.onlineState=a;let l=!1;u.queries.forEach((h,c)=>{for(const d of c.listeners)d.Q_(a)&&(l=!0)}),l&&Ls(u)}(r.eventManager,t),s.length&&r.Va.a_(s),r.onlineState=t,r.isPrimaryClient&&r.sharedClientState.setOnlineState(t)}}async function Kc(n,t,e){const r=A(n);r.sharedClientState.updateQueryState(t,"rejected",e);const s=r.ya.get(t),i=s&&s.key;if(i){let o=new O(E.comparator);o=o.insert(i,j.newNoDocument(i,I.min()));const a=V().add(i),u=new ur(I.min(),new Map,new O(C),o,a);await $a(r,u),r.pa=r.pa.remove(i),r.ya.delete(t),bs(r)}else await Kr(r.localStore,t,!1).then(()=>Qr(r,t,e)).catch(Ze)}async function Qc(n,t){const e=A(n),r=t.batch.batchId;try{const s=await uc(e.localStore,t);Qa(e,r,null),Ka(e,r),e.sharedClientState.updateMutationState(r,"acknowledged"),await on(e,s)}catch(s){await Ze(s)}}async function Wc(n,t,e){const r=A(n);try{const s=await function(o,a){const u=A(o);return u.persistence.runTransaction("Reject batch","readwrite-primary",l=>{let h;return u.mutationQueue.lookupMutationBatch(l,a).next(c=>(D(c!==null),h=c.keys(),u.mutationQueue.removeMutationBatch(l,c))).next(()=>u.mutationQueue.performConsistencyCheck(l)).next(()=>u.documentOverlayCache.removeOverlaysForBatchId(l,h,a)).next(()=>u.localDocuments.recalculateAndSaveOverlaysForDocumentKeys(l,h)).next(()=>u.localDocuments.getDocuments(l,h))})}(r.localStore,t);Qa(r,t,e),Ka(r,t),r.sharedClientState.updateMutationState(t,"rejected",e),await on(r,s)}catch(s){await Ze(s)}}function Ka(n,t){(n.ba.get(t)||[]).forEach(e=>{e.resolve()}),n.ba.delete(t)}function Qa(n,t,e){const r=A(n);let s=r.Sa[r.currentUser.toKey()];if(s){const i=s.get(t);i&&(e?i.reject(e):i.resolve(),s=s.remove(t)),r.Sa[r.currentUser.toKey()]=s}}function Qr(n,t,e=null){n.sharedClientState.removeLocalQueryTarget(t);for(const r of n.fa.get(t))n.ma.delete(r),e&&n.Va.Fa(r,e);n.fa.delete(t),n.isPrimaryClient&&n.wa.Rr(t).forEach(r=>{n.wa.containsKey(r)||Wa(n,r)})}function Wa(n,t){n.ga.delete(t.path.canonicalString());const e=n.pa.get(t);e!==null&&(Ma(n.remoteStore,e),n.pa=n.pa.remove(t),n.ya.delete(e),bs(n))}function Oi(n,t,e){for(const r of e)r instanceof za?(n.wa.addReference(r.key,t),Hc(n,r)):r instanceof Ga?(_("SyncEngine","Document no longer in limbo: "+r.key),n.wa.removeReference(r.key,t),n.wa.containsKey(r.key)||Wa(n,r.key)):v()}function Hc(n,t){const e=t.key,r=e.path.canonicalString();n.pa.get(e)||n.ga.has(r)||(_("SyncEngine","New document in limbo: "+e),n.ga.add(r),bs(n))}function bs(n){for(;n.ga.size>0&&n.pa.size<n.maxConcurrentLimboResolutions;){const t=n.ga.values().next().value;n.ga.delete(t);const e=new E(M.fromString(t)),r=n.Da.next();n.ya.set(r,new qc(e)),n.pa=n.pa.insert(e,r),xa(n.remoteStore,new Vt(pt(nr(e.path)),r,"TargetPurposeLimboResolution",Es._e))}}async function on(n,t,e){const r=A(n),s=[],i=[],o=[];r.ma.isEmpty()||(r.ma.forEach((a,u)=>{o.push(r.va(u,t,e).then(l=>{if((l||e)&&r.isPrimaryClient&&r.sharedClientState.updateQueryState(u.targetId,l?.fromCache?"not-current":"current"),l){s.push(l);const h=Ds.Qi(u.targetId,l);i.push(h)}}))}),await Promise.all(o),r.Va.a_(s),await async function(u,l){const h=A(u);try{await h.persistence.runTransaction("notifyLocalViewChanges","readwrite",c=>m.forEach(l,d=>m.forEach(d.ki,g=>h.persistence.referenceDelegate.addReference(c,d.targetId,g)).next(()=>m.forEach(d.qi,g=>h.persistence.referenceDelegate.removeReference(c,d.targetId,g)))))}catch(c){if(!tn(c))throw c;_("LocalStore","Failed to update sequence numbers: "+c)}for(const c of l){const d=c.targetId;if(!c.fromCache){const g=h.ts.get(d),R=g.snapshotVersion,P=g.withLastLimboFreeSnapshotVersion(R);h.ts=h.ts.insert(d,P)}}}(r.localStore,i))}async function Xc(n,t){const e=A(n);if(!e.currentUser.isEqual(t)){_("SyncEngine","User change. New user:",t.toKey());const r=await Da(e.localStore,t);e.currentUser=t,function(i,o){i.ba.forEach(a=>{a.forEach(u=>{u.reject(new y(f.CANCELLED,o))})}),i.ba.clear()}(e,"'waitForPendingWrites' promise is rejected due to a user change."),e.sharedClientState.handleUserChange(t,r.removedBatchIds,r.addedBatchIds),await on(e,r._s)}}function Yc(n,t){const e=A(n),r=e.ya.get(t);if(r&&r.Ra)return V().add(r.key);{let s=V();const i=e.fa.get(t);if(!i)return s;for(const o of i){const a=e.ma.get(o);s=s.unionWith(a.view.ua)}return s}}function Jc(n){const t=A(n);return t.remoteStore.remoteSyncer.applyRemoteEvent=$a.bind(null,t),t.remoteStore.remoteSyncer.getRemoteKeysForTarget=Yc.bind(null,t),t.remoteStore.remoteSyncer.rejectListen=Kc.bind(null,t),t.Va.a_=Fc.bind(null,t.eventManager),t.Va.Fa=Lc.bind(null,t.eventManager),t}function Zc(n){const t=A(n);return t.remoteStore.remoteSyncer.applySuccessfulWrite=Qc.bind(null,t),t.remoteStore.remoteSyncer.rejectFailedWrite=Wc.bind(null,t),t}class Fi{constructor(){this.synchronizeTabs=!1}async initialize(t){this.serializer=lr(t.databaseInfo.databaseId),this.sharedClientState=this.createSharedClientState(t),this.persistence=this.createPersistence(t),await this.persistence.start(),this.localStore=this.createLocalStore(t),this.gcScheduler=this.createGarbageCollectionScheduler(t,this.localStore),this.indexBackfillerScheduler=this.createIndexBackfillerScheduler(t,this.localStore)}createGarbageCollectionScheduler(t,e){return null}createIndexBackfillerScheduler(t,e){return null}createLocalStore(t){return ac(this.persistence,new ic,t.initialUser,this.serializer)}createPersistence(t){return new nc(Cs.jr,this.serializer)}createSharedClientState(t){return new mc}async terminate(){this.gcScheduler&&this.gcScheduler.stop(),await this.sharedClientState.shutdown(),await this.persistence.shutdown()}}class td{async initialize(t,e){this.localStore||(this.localStore=t.localStore,this.sharedClientState=t.sharedClientState,this.datastore=this.createDatastore(e),this.remoteStore=this.createRemoteStore(e),this.eventManager=this.createEventManager(e),this.syncEngine=this.createSyncEngine(e,!t.synchronizeTabs),this.sharedClientState.onlineStateHandler=r=>Mi(this.syncEngine,r,1),this.remoteStore.remoteSyncer.handleCredentialChange=Xc.bind(null,this.syncEngine),await xc(this.remoteStore,this.syncEngine.isPrimaryClient))}createEventManager(t){return function(){return new Oc}()}createDatastore(t){const e=lr(t.databaseInfo.databaseId),r=function(i){return new yc(i)}(t.databaseInfo);return function(i,o,a,u){return new vc(i,o,a,u)}(t.authCredentials,t.appCheckCredentials,r,e)}createRemoteStore(t){return function(r,s,i,o,a){return new wc(r,s,i,o,a)}(this.localStore,this.datastore,t.asyncQueue,e=>Mi(this.syncEngine,e,0),function(){return ki.D()?new ki:new gc}())}createSyncEngine(t,e){return function(s,i,o,a,u,l,h){const c=new Bc(s,i,o,a,u,l);return h&&(c.Ca=!0),c}(this.localStore,this.remoteStore,this.eventManager,this.sharedClientState,t.initialUser,t.maxConcurrentLimboResolutions,e)}terminate(){return async function(e){const r=A(e);_("RemoteStore","RemoteStore shutting down."),r.C_.add(5),await sn(r),r.F_.shutdown(),r.M_.set("Unknown")}(this.remoteStore)}}/**
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
 */class Ha{constructor(t){this.observer=t,this.muted=!1}next(t){this.observer.next&&this.Oa(this.observer.next,t)}error(t){this.observer.error?this.Oa(this.observer.error,t):wt("Uncaught Error in snapshot listener:",t.toString())}Na(){this.muted=!0}Oa(t,e){this.muted||setTimeout(()=>{this.muted||t(e)},0)}}/**
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
 */class ed{constructor(t){this.datastore=t,this.readVersions=new Map,this.mutations=[],this.committed=!1,this.lastWriteError=null,this.writtenDocs=new Set}async lookup(t){if(this.ensureCommitNotCalled(),this.mutations.length>0)throw new y(f.INVALID_ARGUMENT,"Firestore transactions require all reads to be executed before all writes.");const e=await async function(s,i){const o=A(s),a=Ge(o.serializer)+"/documents",u={documents:i.map(d=>On(o.serializer,d))},l=await o.Co("BatchGetDocuments",a,u,i.length),h=new Map;l.forEach(d=>{const g=Nh(o.serializer,d);h.set(g.key.toString(),g)});const c=[];return i.forEach(d=>{const g=h.get(d.toString());D(!!g),c.push(g)}),c}(this.datastore,t);return e.forEach(r=>this.recordVersion(r)),e}set(t,e){this.write(e.toMutation(t,this.precondition(t))),this.writtenDocs.add(t.toString())}update(t,e){try{this.write(e.toMutation(t,this.preconditionForUpdate(t)))}catch(r){this.lastWriteError=r}this.writtenDocs.add(t.toString())}delete(t){this.write(new ar(t,this.precondition(t))),this.writtenDocs.add(t.toString())}async commit(){if(this.ensureCommitNotCalled(),this.lastWriteError)throw this.lastWriteError;const t=this.readVersions;this.mutations.forEach(e=>{t.delete(e.key.toString())}),t.forEach((e,r)=>{const s=E.fromPath(r);this.mutations.push(new ya(s,this.precondition(s)))}),await async function(r,s){const i=A(r),o=Ge(i.serializer)+"/documents",a={writes:s.map(u=>Pa(i.serializer,u))};await i.wo("Commit",o,a)}(this.datastore,this.mutations),this.committed=!0}recordVersion(t){let e;if(t.isFoundDocument())e=t.version;else{if(!t.isNoDocument())throw v();e=I.min()}const r=this.readVersions.get(t.key.toString());if(r){if(!e.isEqual(r))throw new y(f.ABORTED,"Document version changed between two reads.")}else this.readVersions.set(t.key.toString(),e)}precondition(t){const e=this.readVersions.get(t.toString());return!this.writtenDocs.has(t.toString())&&e?e.isEqual(I.min())?Z.exists(!1):Z.updateTime(e):Z.none()}preconditionForUpdate(t){const e=this.readVersions.get(t.toString());if(!this.writtenDocs.has(t.toString())&&e){if(e.isEqual(I.min()))throw new y(f.INVALID_ARGUMENT,"Can't update a document that doesn't exist.");return Z.updateTime(e)}return Z.exists(!0)}write(t){this.ensureCommitNotCalled(),this.mutations.push(t)}ensureCommitNotCalled(){}}/**
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
 */class nd{constructor(t,e,r,s,i){this.asyncQueue=t,this.datastore=e,this.options=r,this.updateFunction=s,this.deferred=i,this.Wa=r.maxAttempts,this.zo=new ks(this.asyncQueue,"transaction_retry")}run(){this.Wa-=1,this.Ga()}Ga(){this.zo.ko(async()=>{const t=new ed(this.datastore),e=this.za(t);e&&e.then(r=>{this.asyncQueue.enqueueAndForget(()=>t.commit().then(()=>{this.deferred.resolve(r)}).catch(s=>{this.ja(s)}))}).catch(r=>{this.ja(r)})})}za(t){try{const e=this.updateFunction(t);return!en(e)&&e.catch&&e.then?e:(this.deferred.reject(Error("Transaction callback must return a Promise")),null)}catch(e){return this.deferred.reject(e),null}}ja(t){this.Wa>0&&this.Ha(t)?(this.Wa-=1,this.asyncQueue.enqueueAndForget(()=>(this.Ga(),Promise.resolve()))):this.deferred.reject(t)}Ha(t){if(t.name==="FirebaseError"){const e=t.code;return e==="aborted"||e==="failed-precondition"||e==="already-exists"||!Ea(e)}return!1}}/**
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
 */class rd{constructor(t,e,r,s){this.authCredentials=t,this.appCheckCredentials=e,this.asyncQueue=r,this.databaseInfo=s,this.user=J.UNAUTHENTICATED,this.clientId=Wo.newId(),this.authCredentialListener=()=>Promise.resolve(),this.appCheckCredentialListener=()=>Promise.resolve(),this.authCredentials.start(r,async i=>{_("FirestoreClient","Received user=",i.uid),await this.authCredentialListener(i),this.user=i}),this.appCheckCredentials.start(r,i=>(_("FirestoreClient","Received new app check token=",i),this.appCheckCredentialListener(i,this.user)))}async getConfiguration(){return{asyncQueue:this.asyncQueue,databaseInfo:this.databaseInfo,clientId:this.clientId,authCredentials:this.authCredentials,appCheckCredentials:this.appCheckCredentials,initialUser:this.user,maxConcurrentLimboResolutions:100}}setCredentialChangeListener(t){this.authCredentialListener=t}setAppCheckTokenChangeListener(t){this.appCheckCredentialListener=t}verifyNotTerminated(){if(this.asyncQueue.isShuttingDown)throw new y(f.FAILED_PRECONDITION,"The client has already been terminated.")}terminate(){this.asyncQueue.enterRestrictedMode();const t=new vt;return this.asyncQueue.enqueueAndForgetEvenWhileRestricted(async()=>{try{this._onlineComponents&&await this._onlineComponents.terminate(),this._offlineComponents&&await this._offlineComponents.terminate(),this.authCredentials.shutdown(),this.appCheckCredentials.shutdown(),t.resolve()}catch(e){const r=Fs(e,"Failed to shutdown persistence");t.reject(r)}}),t.promise}}async function Pr(n,t){n.asyncQueue.verifyOperationInProgress(),_("FirestoreClient","Initializing OfflineComponentProvider");const e=await n.getConfiguration();await t.initialize(e);let r=e.initialUser;n.setCredentialChangeListener(async s=>{r.isEqual(s)||(await Da(t.localStore,s),r=s)}),t.persistence.setDatabaseDeletedListener(()=>n.terminate()),n._offlineComponents=t}async function Li(n,t){n.asyncQueue.verifyOperationInProgress();const e=await id(n);_("FirestoreClient","Initializing OnlineComponentProvider");const r=await n.getConfiguration();await t.initialize(e,r),n.setCredentialChangeListener(s=>Ni(t.remoteStore,s)),n.setAppCheckTokenChangeListener((s,i)=>Ni(t.remoteStore,i)),n._onlineComponents=t}function sd(n){return n.name==="FirebaseError"?n.code===f.FAILED_PRECONDITION||n.code===f.UNIMPLEMENTED:!(typeof DOMException<"u"&&n instanceof DOMException)||n.code===22||n.code===20||n.code===11}async function id(n){if(!n._offlineComponents)if(n._uninitializedComponentsProvider){_("FirestoreClient","Using user provided OfflineComponentProvider");try{await Pr(n,n._uninitializedComponentsProvider._offline)}catch(t){const e=t;if(!sd(e))throw e;se("Error using user provided cache. Falling back to memory cache: "+e),await Pr(n,new Fi)}}else _("FirestoreClient","Using default OfflineComponentProvider"),await Pr(n,new Fi);return n._offlineComponents}async function Us(n){return n._onlineComponents||(n._uninitializedComponentsProvider?(_("FirestoreClient","Using user provided OnlineComponentProvider"),await Li(n,n._uninitializedComponentsProvider._online)):(_("FirestoreClient","Using default OnlineComponentProvider"),await Li(n,new td))),n._onlineComponents}function od(n){return Us(n).then(t=>t.syncEngine)}function ad(n){return Us(n).then(t=>t.datastore)}async function Wr(n){const t=await Us(n),e=t.eventManager;return e.onListen=jc.bind(null,t.syncEngine),e.onUnlisten=Gc.bind(null,t.syncEngine),e}function ud(n,t,e={}){const r=new vt;return n.asyncQueue.enqueueAndForget(async()=>function(i,o,a,u,l){const h=new Ha({next:d=>{o.enqueueAndForget(()=>Ba(i,c));const g=d.docs.has(a);!g&&d.fromCache?l.reject(new y(f.UNAVAILABLE,"Failed to get document because the client is offline.")):g&&d.fromCache&&u&&u.source==="server"?l.reject(new y(f.UNAVAILABLE,'Failed to get document from server. (However, this document does exist in the local cache. Run again without setting source to "server" to retrieve the cached document.)')):l.resolve(d)},error:d=>l.reject(d)}),c=new ja(nr(a.path),h,{includeMetadataChanges:!0,J_:!0});return qa(i,c)}(await Wr(n),n.asyncQueue,t,e,r)),r.promise}/**
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
 */function Xa(n){const t={};return n.timeoutSeconds!==void 0&&(t.timeoutSeconds=n.timeoutSeconds),t}/**
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
 */const bi=new Map;/**
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
 */function Ya(n,t,e){if(!e)throw new y(f.INVALID_ARGUMENT,`Function ${n}() cannot be called with an empty ${t}.`)}function ld(n,t,e,r){if(t===!0&&r===!0)throw new y(f.INVALID_ARGUMENT,`${n} and ${e} cannot be used together.`)}function Ui(n){if(!E.isDocumentKey(n))throw new y(f.INVALID_ARGUMENT,`Invalid document reference. Document references must have an even number of segments, but ${n} has ${n.length}.`)}function qi(n){if(E.isDocumentKey(n))throw new y(f.INVALID_ARGUMENT,`Invalid collection reference. Collection references must have an odd number of segments, but ${n} has ${n.length}.`)}function qs(n){if(n===void 0)return"undefined";if(n===null)return"null";if(typeof n=="string")return n.length>20&&(n=`${n.substring(0,20)}...`),JSON.stringify(n);if(typeof n=="number"||typeof n=="boolean")return""+n;if(typeof n=="object"){if(n instanceof Array)return"an array";{const t=function(r){return r.constructor?r.constructor.name:null}(n);return t?`a custom ${t} object`:"an object"}}return typeof n=="function"?"a function":v()}function St(n,t){if("_delegate"in n&&(n=n._delegate),!(n instanceof t)){if(t.name===n.constructor.name)throw new y(f.INVALID_ARGUMENT,"Type does not match the expected instance. Did you pass a reference from a different Firestore SDK?");{const e=qs(n);throw new y(f.INVALID_ARGUMENT,`Expected type '${t.name}', but it was: ${e}`)}}return n}/**
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
 */class Bi{constructor(t){var e,r;if(t.host===void 0){if(t.ssl!==void 0)throw new y(f.INVALID_ARGUMENT,"Can't provide ssl option if host option is not set");this.host="firestore.googleapis.com",this.ssl=!0}else this.host=t.host,this.ssl=(e=t.ssl)===null||e===void 0||e;if(this.credentials=t.credentials,this.ignoreUndefinedProperties=!!t.ignoreUndefinedProperties,this.localCache=t.localCache,t.cacheSizeBytes===void 0)this.cacheSizeBytes=41943040;else{if(t.cacheSizeBytes!==-1&&t.cacheSizeBytes<1048576)throw new y(f.INVALID_ARGUMENT,"cacheSizeBytes must be at least 1048576");this.cacheSizeBytes=t.cacheSizeBytes}ld("experimentalForceLongPolling",t.experimentalForceLongPolling,"experimentalAutoDetectLongPolling",t.experimentalAutoDetectLongPolling),this.experimentalForceLongPolling=!!t.experimentalForceLongPolling,this.experimentalForceLongPolling?this.experimentalAutoDetectLongPolling=!1:t.experimentalAutoDetectLongPolling===void 0?this.experimentalAutoDetectLongPolling=!0:this.experimentalAutoDetectLongPolling=!!t.experimentalAutoDetectLongPolling,this.experimentalLongPollingOptions=Xa((r=t.experimentalLongPollingOptions)!==null&&r!==void 0?r:{}),function(i){if(i.timeoutSeconds!==void 0){if(isNaN(i.timeoutSeconds))throw new y(f.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (must not be NaN)`);if(i.timeoutSeconds<5)throw new y(f.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (minimum allowed value is 5)`);if(i.timeoutSeconds>30)throw new y(f.INVALID_ARGUMENT,`invalid long polling timeout: ${i.timeoutSeconds} (maximum allowed value is 30)`)}}(this.experimentalLongPollingOptions),this.useFetchStreams=!!t.useFetchStreams}isEqual(t){return this.host===t.host&&this.ssl===t.ssl&&this.credentials===t.credentials&&this.cacheSizeBytes===t.cacheSizeBytes&&this.experimentalForceLongPolling===t.experimentalForceLongPolling&&this.experimentalAutoDetectLongPolling===t.experimentalAutoDetectLongPolling&&function(r,s){return r.timeoutSeconds===s.timeoutSeconds}(this.experimentalLongPollingOptions,t.experimentalLongPollingOptions)&&this.ignoreUndefinedProperties===t.ignoreUndefinedProperties&&this.useFetchStreams===t.useFetchStreams}}class dr{constructor(t,e,r,s){this._authCredentials=t,this._appCheckCredentials=e,this._databaseId=r,this._app=s,this.type="firestore-lite",this._persistenceKey="(lite)",this._settings=new Bi({}),this._settingsFrozen=!1}get app(){if(!this._app)throw new y(f.FAILED_PRECONDITION,"Firestore was not initialized using the Firebase SDK. 'app' is not available");return this._app}get _initialized(){return this._settingsFrozen}get _terminated(){return this._terminateTask!==void 0}_setSettings(t){if(this._settingsFrozen)throw new y(f.FAILED_PRECONDITION,"Firestore has already been started and its settings can no longer be changed. You can only modify settings before calling any other methods on a Firestore object.");this._settings=new Bi(t),t.credentials!==void 0&&(this._authCredentials=function(r){if(!r)return new Cl;switch(r.type){case"firstParty":return new xl(r.sessionIndex||"0",r.iamToken||null,r.authTokenFactory||null);case"provider":return r.client;default:throw new y(f.INVALID_ARGUMENT,"makeAuthCredentialsProvider failed due to invalid credential type")}}(t.credentials))}_getSettings(){return this._settings}_freezeSettings(){return this._settingsFrozen=!0,this._settings}_delete(){return this._terminateTask||(this._terminateTask=this._terminate()),this._terminateTask}toJSON(){return{app:this._app,databaseId:this._databaseId,settings:this._settings}}_terminate(){return function(e){const r=bi.get(e);r&&(_("ComponentProvider","Removing Datastore"),bi.delete(e),r.terminate())}(this),Promise.resolve()}}function hd(n,t,e,r={}){var s;const i=(n=St(n,dr))._getSettings(),o=`${t}:${e}`;if(i.host!=="firestore.googleapis.com"&&i.host!==o&&se("Host has been set in both settings() and connectFirestoreEmulator(), emulator host will be used."),n._setSettings(Object.assign(Object.assign({},i),{host:o,ssl:!1})),r.mockUserToken){let a,u;if(typeof r.mockUserToken=="string")a=r.mockUserToken,u=J.MOCK_USER;else{a=Tu(r.mockUserToken,(s=n._app)===null||s===void 0?void 0:s.options.projectId);const l=r.mockUserToken.sub||r.mockUserToken.user_id;if(!l)throw new y(f.INVALID_ARGUMENT,"mockUserToken must contain 'sub' or 'user_id' field!");u=new J(l)}n._authCredentials=new Dl(new Qo(a,u))}}/**
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
 */class fr{constructor(t,e,r){this.converter=e,this._query=r,this.type="query",this.firestore=t}withConverter(t){return new fr(this.firestore,t,this._query)}}class it{constructor(t,e,r){this.converter=e,this._key=r,this.type="document",this.firestore=t}get _path(){return this._key.path}get id(){return this._key.path.lastSegment()}get path(){return this._key.path.canonicalString()}get parent(){return new Ct(this.firestore,this.converter,this._key.path.popLast())}withConverter(t){return new it(this.firestore,t,this._key)}}class Ct extends fr{constructor(t,e,r){super(t,e,nr(r)),this._path=r,this.type="collection"}get id(){return this._query.path.lastSegment()}get path(){return this._query.path.canonicalString()}get parent(){const t=this._path.popLast();return t.isEmpty()?null:new it(this.firestore,null,new E(t))}withConverter(t){return new Ct(this.firestore,t,this._path)}}function Nd(n,t,...e){if(n=ct(n),Ya("collection","path",t),n instanceof dr){const r=M.fromString(t,...e);return qi(r),new Ct(n,null,r)}{if(!(n instanceof it||n instanceof Ct))throw new y(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(M.fromString(t,...e));return qi(r),new Ct(n.firestore,null,r)}}function xd(n,t,...e){if(n=ct(n),arguments.length===1&&(t=Wo.newId()),Ya("doc","path",t),n instanceof dr){const r=M.fromString(t,...e);return Ui(r),new it(n,null,new E(r))}{if(!(n instanceof it||n instanceof Ct))throw new y(f.INVALID_ARGUMENT,"Expected first argument to collection() to be a CollectionReference, a DocumentReference or FirebaseFirestore");const r=n._path.child(M.fromString(t,...e));return Ui(r),new it(n.firestore,n instanceof Ct?n.converter:null,new E(r))}}/**
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
 */class cd{constructor(){this.Ja=Promise.resolve(),this.Ya=[],this.Za=!1,this.Xa=[],this.eu=null,this.tu=!1,this.nu=!1,this.ru=[],this.zo=new ks(this,"async_queue_retry"),this.iu=()=>{const e=Rr();e&&_("AsyncQueue","Visibility state changed to "+e.visibilityState),this.zo.Qo()};const t=Rr();t&&typeof t.addEventListener=="function"&&t.addEventListener("visibilitychange",this.iu)}get isShuttingDown(){return this.Za}enqueueAndForget(t){this.enqueue(t)}enqueueAndForgetEvenWhileRestricted(t){this.su(),this.ou(t)}enterRestrictedMode(t){if(!this.Za){this.Za=!0,this.nu=t||!1;const e=Rr();e&&typeof e.removeEventListener=="function"&&e.removeEventListener("visibilitychange",this.iu)}}enqueue(t){if(this.su(),this.Za)return new Promise(()=>{});const e=new vt;return this.ou(()=>this.Za&&this.nu?Promise.resolve():(t().then(e.resolve,e.reject),e.promise)).then(()=>e.promise)}enqueueRetryable(t){this.enqueueAndForget(()=>(this.Ya.push(t),this._u()))}async _u(){if(this.Ya.length!==0){try{await this.Ya[0](),this.Ya.shift(),this.zo.reset()}catch(t){if(!tn(t))throw t;_("AsyncQueue","Operation failed with retryable error: "+t)}this.Ya.length>0&&this.zo.ko(()=>this._u())}}ou(t){const e=this.Ja.then(()=>(this.tu=!0,t().catch(r=>{this.eu=r,this.tu=!1;const s=function(o){let a=o.message||"";return o.stack&&(a=o.stack.includes(o.message)?o.stack:o.message+`
`+o.stack),a}(r);throw wt("INTERNAL UNHANDLED ERROR: ",s),r}).then(r=>(this.tu=!1,r))));return this.Ja=e,e}enqueueAfterDelay(t,e,r){this.su(),this.ru.indexOf(t)>-1&&(e=0);const s=Os.createAndSchedule(this,t,e,r,i=>this.au(i));return this.Xa.push(s),s}su(){this.eu&&v()}verifyOperationInProgress(){}async uu(){let t;do t=this.Ja,await t;while(t!==this.Ja)}cu(t){for(const e of this.Xa)if(e.timerId===t)return!0;return!1}lu(t){return this.uu().then(()=>{this.Xa.sort((e,r)=>e.targetTimeMs-r.targetTimeMs);for(const e of this.Xa)if(e.skipDelay(),t!=="all"&&e.timerId===t)break;return this.uu()})}hu(t){this.ru.push(t)}au(t){const e=this.Xa.indexOf(t);this.Xa.splice(e,1)}}function ji(n){return function(e,r){if(typeof e!="object"||e===null)return!1;const s=e;for(const i of r)if(i in s&&typeof s[i]=="function")return!0;return!1}(n,["next","error","complete"])}class he extends dr{constructor(t,e,r,s){super(t,e,r,s),this.type="firestore",this._queue=function(){return new cd}(),this._persistenceKey=s?.name||"[DEFAULT]"}_terminate(){return this._firestoreClient||Ja(this),this._firestoreClient.terminate()}}function Md(n,t){const e=typeof n=="object"?n:_u(),r=typeof n=="string"?n:t||"(default)",s=yu(e,"firestore").getImmediate({identifier:r});if(!s._initialized){const i=Eu("firestore");i&&hd(s,...i)}return s}function an(n){return n._firestoreClient||Ja(n),n._firestoreClient.verifyNotTerminated(),n._firestoreClient}function Ja(n){var t,e,r;const s=n._freezeSettings(),i=function(a,u,l,h){return new $l(a,u,l,h.host,h.ssl,h.experimentalForceLongPolling,h.experimentalAutoDetectLongPolling,Xa(h.experimentalLongPollingOptions),h.useFetchStreams)}(n._databaseId,((t=n._app)===null||t===void 0?void 0:t.options.appId)||"",n._persistenceKey,s);n._firestoreClient=new rd(n._authCredentials,n._appCheckCredentials,n._queue,i),!((e=s.localCache)===null||e===void 0)&&e._offlineComponentProvider&&(!((r=s.localCache)===null||r===void 0)&&r._onlineComponentProvider)&&(n._firestoreClient._uninitializedComponentsProvider={_offlineKind:s.localCache.kind,_offline:s.localCache._offlineComponentProvider,_online:s.localCache._onlineComponentProvider})}/**
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
 */class zt{constructor(t){this._byteString=t}static fromBase64String(t){try{return new zt(nt.fromBase64String(t))}catch(e){throw new y(f.INVALID_ARGUMENT,"Failed to construct data from Base64 string: "+e)}}static fromUint8Array(t){return new zt(nt.fromUint8Array(t))}toBase64(){return this._byteString.toBase64()}toUint8Array(){return this._byteString.toUint8Array()}toString(){return"Bytes(base64: "+this.toBase64()+")"}isEqual(t){return this._byteString.isEqual(t._byteString)}}/**
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
 */class un{constructor(...t){for(let e=0;e<t.length;++e)if(t[e].length===0)throw new y(f.INVALID_ARGUMENT,"Invalid field name at argument $(i + 1). Field names must not be empty.");this._internalPath=new W(t)}isEqual(t){return this._internalPath.isEqual(t._internalPath)}}/**
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
 */class mr{constructor(t){this._methodName=t}}/**
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
 */class Bs{constructor(t,e){if(!isFinite(t)||t<-90||t>90)throw new y(f.INVALID_ARGUMENT,"Latitude must be a number between -90 and 90, but was: "+t);if(!isFinite(e)||e<-180||e>180)throw new y(f.INVALID_ARGUMENT,"Longitude must be a number between -180 and 180, but was: "+e);this._lat=t,this._long=e}get latitude(){return this._lat}get longitude(){return this._long}isEqual(t){return this._lat===t._lat&&this._long===t._long}toJSON(){return{latitude:this._lat,longitude:this._long}}_compareTo(t){return C(this._lat,t._lat)||C(this._long,t._long)}}/**
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
 */const dd=/^__.*__$/;class fd{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return this.fieldMask!==null?new Ot(t,this.data,this.fieldMask,e,this.fieldTransforms):new nn(t,this.data,e,this.fieldTransforms)}}class Za{constructor(t,e,r){this.data=t,this.fieldMask=e,this.fieldTransforms=r}toMutation(t,e){return new Ot(t,this.data,this.fieldMask,e,this.fieldTransforms)}}function tu(n){switch(n){case 0:case 2:case 1:return!0;case 3:case 4:return!1;default:throw v()}}class js{constructor(t,e,r,s,i,o){this.settings=t,this.databaseId=e,this.serializer=r,this.ignoreUndefinedProperties=s,i===void 0&&this.Pu(),this.fieldTransforms=i||[],this.fieldMask=o||[]}get path(){return this.settings.path}get Iu(){return this.settings.Iu}Tu(t){return new js(Object.assign(Object.assign({},this.settings),t),this.databaseId,this.serializer,this.ignoreUndefinedProperties,this.fieldTransforms,this.fieldMask)}Eu(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Tu({path:r,du:!1});return s.Au(t),s}Ru(t){var e;const r=(e=this.path)===null||e===void 0?void 0:e.child(t),s=this.Tu({path:r,du:!1});return s.Pu(),s}Vu(t){return this.Tu({path:void 0,du:!0})}mu(t){return Ln(t,this.settings.methodName,this.settings.fu||!1,this.path,this.settings.gu)}contains(t){return this.fieldMask.find(e=>t.isPrefixOf(e))!==void 0||this.fieldTransforms.find(e=>t.isPrefixOf(e.field))!==void 0}Pu(){if(this.path)for(let t=0;t<this.path.length;t++)this.Au(this.path.get(t))}Au(t){if(t.length===0)throw this.mu("Document fields must not be empty");if(tu(this.Iu)&&dd.test(t))throw this.mu('Document fields cannot begin and end with "__"')}}class md{constructor(t,e,r){this.databaseId=t,this.ignoreUndefinedProperties=e,this.serializer=r||lr(t)}pu(t,e,r,s=!1){return new js({Iu:t,methodName:e,gu:r,path:W.emptyPath(),du:!1,fu:s},this.databaseId,this.serializer,this.ignoreUndefinedProperties)}}function eu(n){const t=n._freezeSettings(),e=lr(n._databaseId);return new md(n._databaseId,!!t.ignoreUndefinedProperties,e)}function nu(n,t,e,r,s,i={}){const o=n.pu(i.merge||i.mergeFields?2:0,t,e,s);zs("Data must be an object, but it was:",o,r);const a=iu(r,o);let u,l;if(i.merge)u=new at(o.fieldMask),l=o.fieldTransforms;else if(i.mergeFields){const h=[];for(const c of i.mergeFields){const d=Hr(t,c,e);if(!o.contains(d))throw new y(f.INVALID_ARGUMENT,`Field '${d}' is specified in your field mask but missing from your input data.`);au(h,d)||h.push(d)}u=new at(h),l=o.fieldTransforms.filter(c=>u.covers(c.field))}else u=null,l=o.fieldTransforms;return new fd(new rt(a),u,l)}class ln extends mr{_toFieldTransform(t){if(t.Iu!==2)throw t.Iu===1?t.mu(`${this._methodName}() can only appear at the top level of your update data`):t.mu(`${this._methodName}() cannot be used with set() unless you pass {merge:true}`);return t.fieldMask.push(t.path),null}isEqual(t){return t instanceof ln}}class gd extends mr{constructor(t,e){super(t),this.wu=e}_toFieldTransform(t){const e=new ze(t.serializer,ca(t.serializer,this.wu));return new gh(t.path,e)}isEqual(t){return this===t}}function ru(n,t,e,r){const s=n.pu(1,t,e);zs("Data must be an object, but it was:",s,r);const i=[],o=rt.empty();$t(r,(u,l)=>{const h=Gs(t,u,e);l=ct(l);const c=s.Ru(h);if(l instanceof ln)i.push(h);else{const d=gr(l,c);d!=null&&(i.push(h),o.set(h,d))}});const a=new at(i);return new Za(o,a,s.fieldTransforms)}function su(n,t,e,r,s,i){const o=n.pu(1,t,e),a=[Hr(t,r,e)],u=[s];if(i.length%2!=0)throw new y(f.INVALID_ARGUMENT,`Function ${t}() needs to be called with an even number of arguments that alternate between field names and values.`);for(let d=0;d<i.length;d+=2)a.push(Hr(t,i[d])),u.push(i[d+1]);const l=[],h=rt.empty();for(let d=a.length-1;d>=0;--d)if(!au(l,a[d])){const g=a[d];let R=u[d];R=ct(R);const P=o.Ru(g);if(R instanceof ln)l.push(g);else{const T=gr(R,P);T!=null&&(l.push(g),h.set(g,T))}}const c=new at(l);return new Za(h,c,o.fieldTransforms)}function gr(n,t){if(ou(n=ct(n)))return zs("Unsupported field value:",t,n),iu(n,t);if(n instanceof mr)return function(r,s){if(!tu(s.Iu))throw s.mu(`${r._methodName}() can only be used with update() and set()`);if(!s.path)throw s.mu(`${r._methodName}() is not currently supported inside arrays`);const i=r._toFieldTransform(s);i&&s.fieldTransforms.push(i)}(n,t),null;if(n===void 0&&t.ignoreUndefinedProperties)return null;if(t.path&&t.fieldMask.push(t.path),n instanceof Array){if(t.settings.du&&t.Iu!==4)throw t.mu("Nested arrays are not supported");return function(r,s){const i=[];let o=0;for(const a of r){let u=gr(a,s.Vu(o));u==null&&(u={nullValue:"NULL_VALUE"}),i.push(u),o++}return{arrayValue:{values:i}}}(n,t)}return function(r,s){if((r=ct(r))===null)return{nullValue:"NULL_VALUE"};if(typeof r=="number")return ca(s.serializer,r);if(typeof r=="boolean")return{booleanValue:r};if(typeof r=="string")return{stringValue:r};if(r instanceof Date){const i=q.fromDate(r);return{timestampValue:Mn(s.serializer,i)}}if(r instanceof q){const i=new q(r.seconds,1e3*Math.floor(r.nanoseconds/1e3));return{timestampValue:Mn(s.serializer,i)}}if(r instanceof Bs)return{geoPointValue:{latitude:r.latitude,longitude:r.longitude}};if(r instanceof zt)return{bytesValue:wa(s.serializer,r._byteString)};if(r instanceof it){const i=s.databaseId,o=r.firestore._databaseId;if(!o.isEqual(i))throw s.mu(`Document reference is for database ${o.projectId}/${o.database} but should be for database ${i.projectId}/${i.database}`);return{referenceValue:Vs(r.firestore._databaseId||s.databaseId,r._key.path)}}throw s.mu(`Unsupported field value: ${qs(r)}`)}(n,t)}function iu(n,t){const e={};return Ho(n)?t.path&&t.path.length>0&&t.fieldMask.push(t.path):$t(n,(r,s)=>{const i=gr(s,t.Eu(r));i!=null&&(e[r]=i)}),{mapValue:{fields:e}}}function ou(n){return!(typeof n!="object"||n===null||n instanceof Array||n instanceof Date||n instanceof q||n instanceof Bs||n instanceof zt||n instanceof it||n instanceof mr)}function zs(n,t,e){if(!ou(e)||!function(s){return typeof s=="object"&&s!==null&&(Object.getPrototypeOf(s)===Object.prototype||Object.getPrototypeOf(s)===null)}(e)){const r=qs(e);throw r==="an object"?t.mu(n+" a custom object"):t.mu(n+" "+r)}}function Hr(n,t,e){if((t=ct(t))instanceof un)return t._internalPath;if(typeof t=="string")return Gs(n,t);throw Ln("Field path arguments must be of type string or ",n,!1,void 0,e)}const pd=new RegExp("[~\\*/\\[\\]]");function Gs(n,t,e){if(t.search(pd)>=0)throw Ln(`Invalid field path (${t}). Paths must not contain '~', '*', '/', '[', or ']'`,n,!1,void 0,e);try{return new un(...t.split("."))._internalPath}catch{throw Ln(`Invalid field path (${t}). Paths must not be empty, begin with '.', end with '.', or contain '..'`,n,!1,void 0,e)}}function Ln(n,t,e,r,s){const i=r&&!r.isEmpty(),o=s!==void 0;let a=`Function ${t}() called with invalid data`;e&&(a+=" (via `toFirestore()`)"),a+=". ";let u="";return(i||o)&&(u+=" (found",i&&(u+=` in field ${r}`),o&&(u+=` in document ${s}`),u+=")"),new y(f.INVALID_ARGUMENT,a+n+u)}function au(n,t){return n.some(e=>e.isEqual(t))}/**
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
 */class bn{constructor(t,e,r,s,i){this._firestore=t,this._userDataWriter=e,this._key=r,this._document=s,this._converter=i}get id(){return this._key.path.lastSegment()}get ref(){return new it(this._firestore,this._converter,this._key)}exists(){return this._document!==null}data(){if(this._document){if(this._converter){const t=new _d(this._firestore,this._userDataWriter,this._key,this._document,null);return this._converter.fromFirestore(t)}return this._userDataWriter.convertValue(this._document.data.value)}}get(t){if(this._document){const e=this._document.data.field(uu("DocumentSnapshot.get",t));if(e!==null)return this._userDataWriter.convertValue(e)}}}class _d extends bn{data(){return super.data()}}function uu(n,t){return typeof t=="string"?Gs(n,t):t instanceof un?t._internalPath:t._delegate._internalPath}/**
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
 */function yd(n){if(n.limitType==="L"&&n.explicitOrderBy.length===0)throw new y(f.UNIMPLEMENTED,"limitToLast() queries require specifying at least one orderBy() clause")}class lu{convertValue(t,e="none"){switch(jt(t)){case 0:return null;case 1:return t.booleanValue;case 2:return b(t.integerValue||t.doubleValue);case 3:return this.convertTimestamp(t.timestampValue);case 4:return this.convertServerTimestamp(t,e);case 5:return t.stringValue;case 6:return this.convertBytes(Bt(t.bytesValue));case 7:return this.convertReference(t.referenceValue);case 8:return this.convertGeoPoint(t.geoPointValue);case 9:return this.convertArray(t.arrayValue,e);case 10:return this.convertObject(t.mapValue,e);default:throw v()}}convertObject(t,e){return this.convertObjectMap(t.fields,e)}convertObjectMap(t,e="none"){const r={};return $t(t,(s,i)=>{r[s]=this.convertValue(i,e)}),r}convertGeoPoint(t){return new Bs(b(t.latitude),b(t.longitude))}convertArray(t,e){return(t.values||[]).map(r=>this.convertValue(r,e))}convertServerTimestamp(t,e){switch(e){case"previous":const r=vs(t);return r==null?null:this.convertValue(r,e);case"estimate":return this.convertTimestamp(be(t));default:return null}}convertTimestamp(t){const e=kt(t);return new q(e.seconds,e.nanos)}convertDocumentKey(t,e){const r=M.fromString(t);D(Ca(r));const s=new Ue(r.get(1),r.get(3)),i=new E(r.popFirst(5));return s.isEqual(e)||wt(`Document ${i} contains a document reference within a different database (${s.projectId}/${s.database}) which is not supported. It will be treated as a reference in the current database (${e.projectId}/${e.database}) instead.`),i}}/**
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
 */function hu(n,t,e){let r;return r=n?e&&(e.merge||e.mergeFields)?n.toFirestore(t,e):n.toFirestore(t):t,r}class Ed extends lu{constructor(t){super(),this.firestore=t}convertBytes(t){return new zt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new it(this.firestore,null,e)}}/**
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
 */class Zt{constructor(t,e){this.hasPendingWrites=t,this.fromCache=e}isEqual(t){return this.hasPendingWrites===t.hasPendingWrites&&this.fromCache===t.fromCache}}class $s extends bn{constructor(t,e,r,s,i,o){super(t,e,r,s,o),this._firestore=t,this._firestoreImpl=t,this.metadata=i}exists(){return super.exists()}data(t={}){if(this._document){if(this._converter){const e=new wn(this._firestore,this._userDataWriter,this._key,this._document,this.metadata,null);return this._converter.fromFirestore(e,t)}return this._userDataWriter.convertValue(this._document.data.value,t.serverTimestamps)}}get(t,e={}){if(this._document){const r=this._document.data.field(uu("DocumentSnapshot.get",t));if(r!==null)return this._userDataWriter.convertValue(r,e.serverTimestamps)}}}class wn extends $s{data(t={}){return super.data(t)}}class Td{constructor(t,e,r,s){this._firestore=t,this._userDataWriter=e,this._snapshot=s,this.metadata=new Zt(s.hasPendingWrites,s.fromCache),this.query=r}get docs(){const t=[];return this.forEach(e=>t.push(e)),t}get size(){return this._snapshot.docs.size}get empty(){return this.size===0}forEach(t,e){this._snapshot.docs.forEach(r=>{t.call(e,new wn(this._firestore,this._userDataWriter,r.key,r,new Zt(this._snapshot.mutatedKeys.has(r.key),this._snapshot.fromCache),this.query.converter))})}docChanges(t={}){const e=!!t.includeMetadataChanges;if(e&&this._snapshot.excludesMetadataChanges)throw new y(f.INVALID_ARGUMENT,"To include metadata changes with your document changes, you must also pass { includeMetadataChanges:true } to onSnapshot().");return this._cachedChanges&&this._cachedChangesIncludeMetadataChanges===e||(this._cachedChanges=function(s,i){if(s._snapshot.oldDocs.isEmpty()){let o=0;return s._snapshot.docChanges.map(a=>{const u=new wn(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Zt(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);return a.doc,{type:"added",doc:u,oldIndex:-1,newIndex:o++}})}{let o=s._snapshot.oldDocs;return s._snapshot.docChanges.filter(a=>i||a.type!==3).map(a=>{const u=new wn(s._firestore,s._userDataWriter,a.doc.key,a.doc,new Zt(s._snapshot.mutatedKeys.has(a.doc.key),s._snapshot.fromCache),s.query.converter);let l=-1,h=-1;return a.type!==0&&(l=o.indexOf(a.doc.key),o=o.delete(a.doc.key)),a.type!==1&&(o=o.add(a.doc),h=o.indexOf(a.doc.key)),{type:vd(a.type),doc:u,oldIndex:l,newIndex:h}})}}(this,e),this._cachedChangesIncludeMetadataChanges=e),this._cachedChanges}}function vd(n){switch(n){case 0:return"added";case 2:case 3:return"modified";case 1:return"removed";default:return v()}}/**
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
 */function Od(n){n=St(n,it);const t=St(n.firestore,he);return ud(an(t),n._key).then(e=>cu(t,n,e))}class Ks extends lu{constructor(t){super(),this.firestore=t}convertBytes(t){return new zt(t)}convertReference(t){const e=this.convertDocumentKey(t,this.firestore._databaseId);return new it(this.firestore,null,e)}}function Fd(n,...t){var e,r,s;n=ct(n);let i={includeMetadataChanges:!1},o=0;typeof t[o]!="object"||ji(t[o])||(i=t[o],o++);const a={includeMetadataChanges:i.includeMetadataChanges};if(ji(t[o])){const c=t[o];t[o]=(e=c.next)===null||e===void 0?void 0:e.bind(c),t[o+1]=(r=c.error)===null||r===void 0?void 0:r.bind(c),t[o+2]=(s=c.complete)===null||s===void 0?void 0:s.bind(c)}let u,l,h;if(n instanceof it)l=St(n.firestore,he),h=nr(n._key.path),u={next:c=>{t[o]&&t[o](cu(l,n,c))},error:t[o+1],complete:t[o+2]};else{const c=St(n,fr);l=St(c.firestore,he),h=c._query;const d=new Ks(l);u={next:g=>{t[o]&&t[o](new Td(l,d,c,g))},error:t[o+1],complete:t[o+2]},yd(n._query)}return function(d,g,R,P){const T=new Ha(P),x=new ja(g,T,R);return d.asyncQueue.enqueueAndForget(async()=>qa(await Wr(d),x)),()=>{T.Na(),d.asyncQueue.enqueueAndForget(async()=>Ba(await Wr(d),x))}}(an(l),h,a,u)}function Id(n,t){return function(r,s){const i=new vt;return r.asyncQueue.enqueueAndForget(async()=>$c(await od(r),s,i)),i.promise}(an(n),t)}function cu(n,t,e){const r=e.docs.get(t._key),s=new Ks(n);return new $s(n,s,t._key,r,new Zt(e.hasPendingWrites,e.fromCache),t.converter)}/**
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
 */const wd={maxAttempts:5};/**
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
 */class Ad{constructor(t,e){this._firestore=t,this._commitHandler=e,this._mutations=[],this._committed=!1,this._dataReader=eu(t)}set(t,e,r){this._verifyNotCommitted();const s=Pt(t,this._firestore),i=hu(s.converter,e,r),o=nu(this._dataReader,"WriteBatch.set",s._key,i,s.converter!==null,r);return this._mutations.push(o.toMutation(s._key,Z.none())),this}update(t,e,r,...s){this._verifyNotCommitted();const i=Pt(t,this._firestore);let o;return o=typeof(e=ct(e))=="string"||e instanceof un?su(this._dataReader,"WriteBatch.update",i._key,e,r,s):ru(this._dataReader,"WriteBatch.update",i._key,e),this._mutations.push(o.toMutation(i._key,Z.exists(!0))),this}delete(t){this._verifyNotCommitted();const e=Pt(t,this._firestore);return this._mutations=this._mutations.concat(new ar(e._key,Z.none())),this}commit(){return this._verifyNotCommitted(),this._committed=!0,this._mutations.length>0?this._commitHandler(this._mutations):Promise.resolve()}_verifyNotCommitted(){if(this._committed)throw new y(f.FAILED_PRECONDITION,"A write batch can no longer be used after commit() has been called.")}}function Pt(n,t){if((n=ct(n)).firestore!==t)throw new y(f.INVALID_ARGUMENT,"Provided document reference is from a different Firestore instance.");return n}/**
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
 */class Rd extends class{constructor(e,r){this._firestore=e,this._transaction=r,this._dataReader=eu(e)}get(e){const r=Pt(e,this._firestore),s=new Ed(this._firestore);return this._transaction.lookup([r._key]).then(i=>{if(!i||i.length!==1)return v();const o=i[0];if(o.isFoundDocument())return new bn(this._firestore,s,o.key,o,r.converter);if(o.isNoDocument())return new bn(this._firestore,s,r._key,null,r.converter);throw v()})}set(e,r,s){const i=Pt(e,this._firestore),o=hu(i.converter,r,s),a=nu(this._dataReader,"Transaction.set",i._key,o,i.converter!==null,s);return this._transaction.set(i._key,a),this}update(e,r,s,...i){const o=Pt(e,this._firestore);let a;return a=typeof(r=ct(r))=="string"||r instanceof un?su(this._dataReader,"Transaction.update",o._key,r,s,i):ru(this._dataReader,"Transaction.update",o._key,r),this._transaction.update(o._key,a),this}delete(e){const r=Pt(e,this._firestore);return this._transaction.delete(r._key),this}}{constructor(t,e){super(t,e),this._firestore=t}get(t){const e=Pt(t,this._firestore),r=new Ks(this._firestore);return super.get(t).then(s=>new $s(this._firestore,r,e._key,s._document,new Zt(!1,!1),e.converter))}}function bd(n,t,e){n=St(n,he);const r=Object.assign(Object.assign({},wd),e);return function(i){if(i.maxAttempts<1)throw new y(f.INVALID_ARGUMENT,"Max attempts must be at least 1")}(r),function(i,o,a){const u=new vt;return i.asyncQueue.enqueueAndForget(async()=>{const l=await ad(i);new nd(i.asyncQueue,l,a,o,u).run()}),u.promise}(an(n),s=>t(new Rd(n,s)),r)}/**
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
 */function Ud(){return new ln("deleteField")}function qd(n){return new gd("increment",n)}/**
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
 */function Bd(n){return an(n=St(n,he)),new Ad(n,t=>Id(n,t))}(function(t,e=!0){(function(s){fe=s})(vu),mu(new gu("firestore",(r,{instanceIdentifier:s,options:i})=>{const o=r.getProvider("app").getImmediate(),a=new he(new kl(r.getProvider("auth-internal")),new Ol(r.getProvider("app-check-internal")),function(l,h){if(!Object.prototype.hasOwnProperty.apply(l.options,["projectId"]))throw new y(f.INVALID_ARGUMENT,'"projectId" not provided in firebase.initializeApp.');return new Ue(l.options.projectId,h)}(o,s),o);return i=Object.assign({useFetchStreams:e},i),a._setSettings(i),a},"PUBLIC").setMultipleInstances(!0)),Ws(li,"4.4.0",t),Ws(li,"4.4.0","esm2017")})();let jd=fu();export{q as T,Od as a,jd as b,Nd as c,xd as d,Ud as e,Md as g,qd as i,Fd as o,bd as r,Bd as w};
