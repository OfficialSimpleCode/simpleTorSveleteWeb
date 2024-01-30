import{s as me,e as I,b,d as V,g as v,i as m,Z as z,k as Z,l as p,n as ue,p as oe,v as Te,K as De,A as Ne,a as B,h as L,F as Se,t as j,f as K,o as X,_ as We,r as ye,c as ke,D as Ae,u as Me}from"../chunks/scheduler.C3TCnZHI.js";import{S as he,i as pe,t as Y,g as qe,e as Ue,b as ee,c as re,a as ie,m as ce,d as fe}from"../chunks/index.Lhnxl_wK.js";import{g as Fe,b as ze}from"../chunks/entry.NnAEmM0l.js";import{e as Ee}from"../chunks/Icon.5AMkhErR.js";import{U as Be}from"../chunks/UpdatePageHeader.lgsFmURW.js";import{t as F,l as Le}from"../chunks/business_initializer.L6DfDkrJ.js";import{$ as He}from"../chunks/runtime.oGXtuNGk.js";function Re(l){let e,t,s,u,n,h;return{c(){e=I("div"),t=I("input"),this.h()},l(a){e=b(a,"DIV",{class:!0});var o=V(e);t=b(o,"INPUT",{name:!0,type:!0,placeholder:!0,maxlength:!0,class:!0,"data-testid":!0,"data-input":!0}),o.forEach(v),this.h()},h(){m(t,"name","input"),m(t,"type",l[1]),m(t,"placeholder",l[2]),t.value=l[0],m(t,"maxlength",1),m(t,"class",s=z(`${l[4]} inputclass`)+" svelte-pvp9zu"),m(t,"data-testid",l[5]),m(t,"data-input","elem"),m(e,"class",u=z(`${l[3]} textcontainer`)+" svelte-pvp9zu")},m(a,o){Z(a,e,o),p(e,t),l[11](t),n||(h=ue(t,"input",l[7]),n=!0)},p(a,[o]){o&2&&m(t,"type",a[1]),o&4&&m(t,"placeholder",a[2]),o&1&&t.value!==a[0]&&(t.value=a[0]),o&16&&s!==(s=z(`${a[4]} inputclass`)+" svelte-pvp9zu")&&m(t,"class",s),o&32&&m(t,"data-testid",a[5]),o&8&&u!==(u=z(`${a[3]} textcontainer`)+" svelte-pvp9zu")&&m(e,"class",u)},i:oe,o:oe,d(a){a&&v(e),l[11](null),n=!1,h()}}}function je(l,e,t){let{maskInput:s=!1}=e,{inputType:u=s?"password":"tel"}=e,{value:n=""}=e,{componentIndex:h}=e,{placeholder:a=""}=e,{customInputWrapperClass:o=""}=e,{customInputClass:r=""}=e,{handleChange:C}=e,{dataAttr:S=""}=e,d;function f(c){t(0,n=c.target.value),C&&C(h,c)}function _(c){Te[c?"unshift":"push"](()=>{d=c,t(6,d)})}return l.$$set=c=>{"maskInput"in c&&t(8,s=c.maskInput),"inputType"in c&&t(1,u=c.inputType),"value"in c&&t(0,n=c.value),"componentIndex"in c&&t(9,h=c.componentIndex),"placeholder"in c&&t(2,a=c.placeholder),"customInputWrapperClass"in c&&t(3,o=c.customInputWrapperClass),"customInputClass"in c&&t(4,r=c.customInputClass),"handleChange"in c&&t(10,C=c.handleChange),"dataAttr"in c&&t(5,S=c.dataAttr)},[n,u,a,o,r,S,d,f,s,h,C,_]}let Ke=class extends he{constructor(e){super(),pe(this,e,je,Re,me,{maskInput:8,inputType:1,value:0,componentIndex:9,placeholder:2,customInputWrapperClass:3,customInputClass:4,handleChange:10,dataAttr:5})}};function Oe(l,e,t){const s=l.slice();return s[20]=e[t],s[21]=e,s[22]=t,s}function Pe(l){let e,t,s;return{c(){e=I("p"),t=j(l[0]),this.h()},l(u){e=b(u,"P",{class:!0});var n=V(e);t=K(n,l[0]),n.forEach(v),this.h()},h(){m(e,"class",s=z(`${l[2]} separator`)+" svelte-18smq5r")},m(u,n){Z(u,e,n),p(e,t)},p(u,n){n&1&&X(t,u[0]),n&4&&s!==(s=z(`${u[2]} separator`)+" svelte-18smq5r")&&m(e,"class",s)},d(u){u&&v(e)}}}function we(l){let e,t,s=l[21],u=l[22],n,h,a,o;const r=()=>l[16](t,s,u),C=()=>l[16](null,s,u);let S={value:l[20].initialValue,componentIndex:l[20].componentIndex,handleChange:l[8],placeholder:l[20].placeholder,customInputClass:l[1],customInputWrapperClass:l[5],maskInput:l[6],dataAttr:`elem-${l[22]}`};t=new Ke({props:S}),r();let d=l[22]!==l[7].length-1&&Pe(l);return{c(){e=I("div"),re(t.$$.fragment),n=B(),d&&d.c(),h=B(),this.h()},l(f){e=b(f,"DIV",{class:!0});var _=V(e);ie(t.$$.fragment,_),n=L(_),d&&d.l(_),h=L(_),_.forEach(v),this.h()},h(){m(e,"class",a=z(`${l[3]} otp-row`)+" svelte-18smq5r")},m(f,_){Z(f,e,_),ce(t,e,null),p(e,n),d&&d.m(e,null),p(e,h),o=!0},p(f,_){(s!==f[21]||u!==f[22])&&(C(),s=f[21],u=f[22],r());const c={};_&128&&(c.value=f[20].initialValue),_&128&&(c.componentIndex=f[20].componentIndex),_&128&&(c.placeholder=f[20].placeholder),_&2&&(c.customInputClass=f[1]),_&32&&(c.customInputWrapperClass=f[5]),_&64&&(c.maskInput=f[6]),t.$set(c),f[22]!==f[7].length-1?d?d.p(f,_):(d=Pe(f),d.c(),d.m(e,h)):d&&(d.d(1),d=null),(!o||_&8&&a!==(a=z(`${f[3]} otp-row`)+" svelte-18smq5r"))&&m(e,"class",a)},i(f){o||(Y(t.$$.fragment,f),o=!0)},o(f){ee(t.$$.fragment,f),o=!1},d(f){f&&v(e),C(),fe(t),d&&d.d()}}}function Ze(l){let e,t,s,u=Ee(l[7]),n=[];for(let a=0;a<u.length;a+=1)n[a]=we(Oe(l,u,a));const h=a=>ee(n[a],1,1,()=>{n[a]=null});return{c(){e=I("section");for(let a=0;a<n.length;a+=1)n[a].c();this.h()},l(a){e=b(a,"SECTION",{class:!0});var o=V(e);for(let r=0;r<n.length;r+=1)n[r].l(o);o.forEach(v),this.h()},h(){m(e,"class",t=z(`${l[4]} otp-wrapper`)+" svelte-18smq5r")},m(a,o){Z(a,e,o);for(let r=0;r<n.length;r+=1)n[r]&&n[r].m(e,null);s=!0},p(a,[o]){if(o&495){u=Ee(a[7]);let r;for(r=0;r<u.length;r+=1){const C=Oe(a,u,r);n[r]?(n[r].p(C,o),Y(n[r],1)):(n[r]=we(C),n[r].c(),Y(n[r],1),n[r].m(e,null))}for(qe(),r=u.length;r<n.length;r+=1)h(r);Ue()}(!s||o&16&&t!==(t=z(`${a[4]} otp-wrapper`)+" svelte-18smq5r"))&&m(e,"class",t)},i(a){if(!s){for(let o=0;o<u.length;o+=1)Y(n[o]);s=!0}},o(a){n=n.filter(Boolean);for(let o=0;o<n.length;o+=1)ee(n[o]);s=!1},d(a){a&&v(e),De(n,a)}}}function Ge(l,e,t){let{numberOfInputs:s=4}=e,{separator:u="-"}=e,{initialValue:n=""}=e,{placeholder:h=""}=e,{customTextInputClass:a=""}=e,{customSeparatorClass:o=""}=e,{customRowClass:r=""}=e,{customWrapperClass:C=""}=e,{customInputWrapperClass:S=""}=e,{maskInput:d=!1}=e,{autoFocusNextOnInput:f=!0}=e,{focusPreviousOnDelete:_=!0}=e,{emitEventOnPrefill:c=!1}=e;function y(){return Array.from(Array(s).keys()).map(i=>{const k=n[i]||"",E=h[i]||"";return{componentIndex:`otp${i}`,ref:null,initialValue:k,placeholder:E}})}function H(i,k={}){let E="",T=!0;P.forEach(q=>{var A,U;let D=`${(U=(A=q==null?void 0:q.ref)==null?void 0:A.$$)==null?void 0:U.ctx[0]}`;D||(T=!1),E+=D||" "});let w={completevalue:E,isInputComplete:T&&E.length===s};if(k&&(w={...w,...k}),i)x("notify",w);else return w}let P=y();const x=Ne(),R=()=>H(!1),G=(i,k)=>{var q,D,A,U,W;const E=k.inputType==="deleteContentBackward",T=P.findIndex(N=>N.componentIndex===i);let w;if(E&&_){w=T===0?0:T-1;const N=(q=P[w])==null?void 0:q.ref;(A=(D=N==null?void 0:N.$$)==null?void 0:D.ctx[6])==null||A.focus()}if(!E&&f){w=T<P.length-1?T+1:T;const N=P[w].ref;(W=(U=N==null?void 0:N.$$)==null?void 0:U.ctx[6])==null||W.focus()}H(!0)};function $(i,k,E){Te[i?"unshift":"push"](()=>{k[E].ref=i,t(7,P),t(10,n),t(14,c)})}return l.$$set=i=>{"numberOfInputs"in i&&t(9,s=i.numberOfInputs),"separator"in i&&t(0,u=i.separator),"initialValue"in i&&t(10,n=i.initialValue),"placeholder"in i&&t(11,h=i.placeholder),"customTextInputClass"in i&&t(1,a=i.customTextInputClass),"customSeparatorClass"in i&&t(2,o=i.customSeparatorClass),"customRowClass"in i&&t(3,r=i.customRowClass),"customWrapperClass"in i&&t(4,C=i.customWrapperClass),"customInputWrapperClass"in i&&t(5,S=i.customInputWrapperClass),"maskInput"in i&&t(6,d=i.maskInput),"autoFocusNextOnInput"in i&&t(12,f=i.autoFocusNextOnInput),"focusPreviousOnDelete"in i&&t(13,_=i.focusPreviousOnDelete),"emitEventOnPrefill"in i&&t(14,c=i.emitEventOnPrefill)},l.$$.update=()=>{if(l.$$.dirty&17408){async function i(){n!==void 0&&n.trim().length>0&&(t(7,P=y()),await Se(),c&&H(!0,{onValueUpdateOrPrefill:!0}))}i()}},[u,a,o,r,C,S,d,P,G,s,n,h,f,_,c,R,$]}class Je extends he{constructor(e){super(),pe(this,e,Ge,Ze,me,{numberOfInputs:9,separator:0,initialValue:10,placeholder:11,customTextInputClass:1,customSeparatorClass:2,customRowClass:3,customWrapperClass:4,customInputWrapperClass:5,maskInput:6,autoFocusNextOnInput:12,focusPreviousOnDelete:13,emitEventOnPrefill:14,getValue:15})}get getValue(){return this.$$.ctx[15]}}function Qe(l){let e,t='<div class="loading loading-spinner loading-xs"></div>';return{c(){e=I("div"),e.innerHTML=t,this.h()},l(s){e=b(s,"DIV",{class:!0,"data-svelte-h":!0}),Me(e)!=="svelte-v6a9q6"&&(e.innerHTML=t),this.h()},h(){m(e,"class","badge badge-warning")},m(s,u){Z(s,e,u)},p:oe,d(s){s&&v(e)}}}function Xe(l){let e,t=F("sendSuccess",l[2])+"",s;return{c(){e=I("div"),s=j(t),this.h()},l(u){e=b(u,"DIV",{class:!0});var n=V(e);s=K(n,t),n.forEach(v),this.h()},h(){m(e,"class","badge badge-success")},m(u,n){Z(u,e,n),p(e,s)},p(u,n){n&4&&t!==(t=F("sendSuccess",u[2])+"")&&X(s,t)},d(u){u&&v(e)}}}function Ye(l){let e,t,s,u,n,h,a,o,r,C=l[2]("pressOpt")+"",S,d,f,_,c,y,H,P,x,R=l[3].phoneNumber+"",G,$,i,k,E=(l[1]?"Verifing..":F("verifyPhone",l[2]))+"",T,w,q,D,A=F("phoneUpdate",l[2])+"",U,W,N,de;t=new Be({props:{title:F("verifyPhoneMechanizem",l[2]),helpMessage:F("phoneVerificationPageExplain",l[2])}});function _e(g,O){return g[0]?Xe:Qe}let te=_e(l),M=te(l);return y=new Je({props:{autoFocusNextOnInput:!0,focusPreviousOnDelete:!0,separator:"-",placeholder:"",numberOfInputs:6}}),y.$on("notify",l[5]),{c(){e=I("main"),re(t.$$.fragment),s=B(),u=I("div"),n=I("div"),h=I("form"),a=I("div"),o=I("label"),r=I("span"),S=j(C),d=B(),f=I("span"),M.c(),_=B(),c=I("div"),re(y.$$.fragment),H=B(),P=I("p"),x=j("sent to: "),G=j(R),$=B(),i=I("div"),k=I("button"),T=j(E),q=B(),D=I("button"),U=j(A),this.h()},l(g){e=b(g,"MAIN",{class:!0});var O=V(e);ie(t.$$.fragment,O),s=L(O),u=b(O,"DIV",{class:!0});var J=V(u);n=b(J,"DIV",{class:!0});var ge=V(n);h=b(ge,"FORM",{class:!0});var Q=V(h);a=b(Q,"DIV",{class:!0});var ne=V(a);o=b(ne,"LABEL",{class:!0,for:!0});var le=V(o);r=b(le,"SPAN",{class:!0});var ve=V(r);S=K(ve,C),ve.forEach(v),d=L(le),f=b(le,"SPAN",{class:!0});var Ie=V(f);M.l(Ie),Ie.forEach(v),le.forEach(v),_=L(ne),c=b(ne,"DIV",{class:!0});var be=V(c);ie(y.$$.fragment,be),be.forEach(v),ne.forEach(v),H=L(Q),P=b(Q,"P",{});var se=V(P);x=K(se,"sent to: "),G=K(se,R),se.forEach(v),$=L(Q),i=b(Q,"DIV",{class:!0});var ae=V(i);k=b(ae,"BUTTON",{class:!0});var Ce=V(k);T=K(Ce,E),Ce.forEach(v),q=L(ae),D=b(ae,"BUTTON",{class:!0});var Ve=V(D);U=K(Ve,A),Ve.forEach(v),ae.forEach(v),Q.forEach(v),ge.forEach(v),J.forEach(v),O.forEach(v),this.h()},h(){m(r,"class","label-text"),m(f,"class","label-text-alt"),m(o,"class","label"),m(o,"for","one-time-code"),m(c,"class","text-lg"),m(a,"class","form-control"),m(k,"class",w="btn btn-primary "+(l[1]?"opacity-50":"")),m(D,"class","btn btn-outline"),m(i,"class","form-control mt-6 gap-1"),m(h,"class","card-body"),m(n,"class","card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"),m(u,"class","flex items-center justify-center w-full h-[60%]"),m(e,"class","flex flex-col items-center mx-4 mt-0 gap-10 h-full")},m(g,O){Z(g,e,O),ce(t,e,null),p(e,s),p(e,u),p(u,n),p(n,h),p(h,a),p(a,o),p(o,r),p(r,S),p(o,d),p(o,f),M.m(f,null),p(a,_),p(a,c),ce(y,c,null),p(h,H),p(h,P),p(P,x),p(P,G),p(h,$),p(h,i),p(i,k),p(k,T),p(i,q),p(i,D),p(D,U),W=!0,N||(de=[ue(k,"click",xe),ue(D,"click",We(l[4]))],N=!0)},p(g,[O]){const J={};O&4&&(J.title=F("verifyPhoneMechanizem",g[2])),O&4&&(J.helpMessage=F("phoneVerificationPageExplain",g[2])),t.$set(J),(!W||O&4)&&C!==(C=g[2]("pressOpt")+"")&&X(S,C),te===(te=_e(g))&&M?M.p(g,O):(M.d(1),M=te(g),M&&(M.c(),M.m(f,null))),(!W||O&8)&&R!==(R=g[3].phoneNumber+"")&&X(G,R),(!W||O&6)&&E!==(E=(g[1]?"Verifing..":F("verifyPhone",g[2]))+"")&&X(T,E),(!W||O&2&&w!==(w="btn btn-primary "+(g[1]?"opacity-50":"")))&&m(k,"class",w),(!W||O&4)&&A!==(A=F("phoneUpdate",g[2])+"")&&X(U,A)},i(g){W||(Y(t.$$.fragment,g),Y(y.$$.fragment,g),W=!0)},o(g){ee(t.$$.fragment,g),ee(y.$$.fragment,g),W=!1},d(g){g&&v(e),fe(t),M.d(),fe(y),N=!1,ye(de)}}}function xe(){}function $e(l,e,t){let s,u;ke(l,He,r=>t(2,s=r)),ke(l,Le,r=>t(3,u=r));let n=!1,h=!1;Ae(()=>{setTimeout(()=>t(0,n=!0),2e3)});function a(){Fe(`${ze}/update-profile-phone`,{replaceState:!0})}function o(r){r.detail.isInputComplete&&(t(1,h=!0),console.log("compleated",r.detail.completevalue)),console.log("emittedValue",r.detail)}return[n,h,s,u,a,o]}class rt extends he{constructor(e){super(),pe(this,e,$e,Ye,me,{})}}export{rt as component};
