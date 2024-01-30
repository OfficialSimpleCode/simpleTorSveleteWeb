import{s as R,e as $,a as y,t as H,c as w,b as x,g as S,d as N,f as p,o as _,i as G,h,q as z,n as ge,r as pe,A as Ee,m as _e,u as be,z as ve,K as Te,k as Q,$ as ye}from"../chunks/scheduler.rZl0nx9x.js";import{S as Y,i as J,c as L,a as B,m as W,t as V,b as P,d as A,g as $e,e as we,f as Se}from"../chunks/index.y9_4rGtT.js";import{I as ke,X as xe,e as ae}from"../chunks/Icon.gnLuK2y7.js";import{g as re,b as ie,p as Ce}from"../chunks/entry.1Qi4GdoU.js";import{p as De}from"../chunks/stores.VWddXf6c.js";import{t as O,ak as ee,al as Ge,a2 as Oe,am as ce,an as Ve,A as Z,ao as ue,ap as Pe,aq as Me,m as fe}from"../chunks/business_initializer.rkF3vozn.js";import{V as q}from"../chunks/verification_helper.2Gox-Fua.js";import{I as Ie}from"../chunks/InfoTooltipButton.MP1Khm4-.js";import{D as He}from"../chunks/developer_helper.gKCPxwjO.js";import{$ as Ne}from"../chunks/runtime.O5IRQp7y.js";function Ue(o){let e,l,t,n,c,r=O("loginWithPhone")+"",f,g,b,I=O("enterPhoneNumber")+"",a,m,u,s,d,i,C=O("weSendYouCode")+"",j,M,D,X=O("login")+"",k,E,U,K;return l=new Ie({props:{message:O("loginWithPhoneExplain")}}),s=new ke({props:{src:xe,size:"24px"}}),{c(){e=$("div"),L(l.$$.fragment),t=y(),n=$("div"),c=$("h3"),f=H(r),g=y(),b=$("h3"),a=H(I),m=y(),u=$("button"),L(s.$$.fragment),d=y(),i=$("h3"),j=H(C),M=y(),D=$("button"),k=H(X),this.h()},l(v){e=w(v,"DIV",{class:!0});var T=x(e);B(l.$$.fragment,T),t=S(T),n=w(T,"DIV",{class:!0});var F=x(n);c=w(F,"H3",{class:!0});var te=x(c);f=N(te,r),te.forEach(p),g=S(F),b=w(F,"H3",{class:!0});var le=x(b);a=N(le,I),le.forEach(p),F.forEach(p),m=S(T),u=w(T,"BUTTON",{class:!0});var ne=x(u);B(s.$$.fragment,ne),ne.forEach(p),T.forEach(p),d=S(v),i=w(v,"H3",{class:!0});var se=x(i);j=N(se,C),se.forEach(p),M=S(v),D=w(v,"BUTTON",{class:!0});var oe=x(D);k=N(oe,X),oe.forEach(p),this.h()},h(){_(c,"class","font-bold text-lg"),_(b,"class","text-me"),_(n,"class","center"),_(u,"class","btn btn-ghost"),_(e,"class","flex justify-between items-center mb-[1rem]"),_(i,"class","text-xs"),_(D,"class","btn xs:btn-lg btn-outline w-full")},m(v,T){G(v,e,T),W(l,e,null),h(e,t),h(e,n),h(n,c),h(c,f),h(n,g),h(n,b),h(b,a),h(e,m),h(e,u),W(s,u,null),G(v,d,T),G(v,i,T),h(i,j),G(v,M,T),G(v,D,T),h(D,k),E=!0,U||(K=[z(u,"click",o[1]),z(D,"click",je)],U=!0)},p:ge,i(v){E||(V(l.$$.fragment,v),V(s.$$.fragment,v),E=!0)},o(v){P(l.$$.fragment,v),P(s.$$.fragment,v),E=!1},d(v){v&&(p(e),p(d),p(i),p(M),p(D)),A(l),A(s),U=!1,pe(K)}}}const je=()=>{};function Fe(o,e,l){let{dialog:t}=e;const n=()=>t.close();return o.$$set=c=>{"dialog"in c&&l(0,t=c.dialog)},[t,n]}class Le extends Y{constructor(e){super(),J(this,e,Fe,Ue,R,{dialog:0})}}function Be(o){ee({status:"success",text:O("theCodeSentSuccessfully")}),q.GI().verificationID=o}async function We(o,e,l,t){await He.GI().logErrorToDb({userId:o,errorType:Ge.login,exceptions:[e],errorCode:e.message,extras:{codeSendTime:l?Oe(l):"",beforeSendTime:t}})}function Ae({phone:o}){o!==""&&(ee({status:"info",text:O("theCodeIsSending")}),q.GI().lastVerificationUnix=Math.ceil(Date.now()/1e3),q.GI().submitedPhone=o,q.GI().phoneVerificationWithFirebase&&q.GI().sendSmsForFirebaseVerification(o,e=>Be(e),We))}function qe(o){let e,l,t,n,c,r=O("loginWithPhone")+"",f,g,b,I=O("beforeStartWeNeewToConfirmPhone")+"",a,m,u,s,d,i,C=O("verify")+"",j,M,D,X;return l=new Ie({props:{message:O("loginWithPhoneExplain")}}),s=new ke({props:{src:xe,size:"24px"}}),{c(){e=$("div"),L(l.$$.fragment),t=y(),n=$("div"),c=$("h3"),f=H(r),g=y(),b=$("h3"),a=H(I),m=y(),u=$("button"),L(s.$$.fragment),d=y(),i=$("button"),j=H(C),this.h()},l(k){e=w(k,"DIV",{class:!0});var E=x(e);B(l.$$.fragment,E),t=S(E),n=w(E,"DIV",{class:!0});var U=x(n);c=w(U,"H3",{class:!0});var K=x(c);f=N(K,r),K.forEach(p),g=S(U),b=w(U,"H3",{class:!0});var v=x(b);a=N(v,I),v.forEach(p),U.forEach(p),m=S(E),u=w(E,"BUTTON",{class:!0});var T=x(u);B(s.$$.fragment,T),T.forEach(p),E.forEach(p),d=S(k),i=w(k,"BUTTON",{class:!0});var F=x(i);j=N(F,C),F.forEach(p),this.h()},h(){_(c,"class","font-bold text-lg"),_(b,"class","text-me"),_(n,"class","center"),_(u,"class","btn btn-ghost"),_(e,"class","flex justify-between items-center mb-[1rem]"),_(i,"class","btn xs:btn-lg btn-outline w-full")},m(k,E){G(k,e,E),W(l,e,null),h(e,t),h(e,n),h(n,c),h(c,f),h(n,g),h(n,b),h(b,a),h(e,m),h(e,u),W(s,u,null),G(k,d,E),G(k,i,E),h(i,j),M=!0,D||(X=[z(u,"click",o[2]),z(i,"click",o[1])],D=!0)},p:ge,i(k){M||(V(l.$$.fragment,k),V(s.$$.fragment,k),M=!0)},o(k){P(l.$$.fragment,k),P(s.$$.fragment,k),M=!1},d(k){k&&(p(e),p(d),p(i)),A(l),A(s),D=!1,pe(X)}}}function ze(o,e,l){const t=Ee();let{dialog:n}=e;function c(){Ae({phone:"+972-525656377"}),t("navigateOtp")}const r=()=>n.close();return o.$$set=f=>{"dialog"in f&&l(0,n=f.dialog)},[n,c,r]}class Xe extends Y{constructor(e){super(),J(this,e,ze,qe,R,{dialog:0})}}function Ke(o){let e,l;return e=new Le({props:{dialog:o[0]}}),{c(){L(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){W(e,t,n),l=!0},p(t,n){const c={};n&1&&(c.dialog=t[0]),e.$set(c)},i(t){l||(V(e.$$.fragment,t),l=!0)},o(t){P(e.$$.fragment,t),l=!1},d(t){A(e,t)}}}function Re(o){let e,l;return e=new Xe({props:{dialog:o[0]}}),e.$on("navigateOtp",o[2]),{c(){L(e.$$.fragment)},l(t){B(e.$$.fragment,t)},m(t,n){W(e,t,n),l=!0},p(t,n){const c={};n&1&&(c.dialog=t[0]),e.$set(c)},i(t){l||(V(e.$$.fragment,t),l=!0)},o(t){P(e.$$.fragment,t),l=!1},d(t){A(e,t)}}}function Ye(o){let e,l,t,n,c,r,f="<button>close</button>",g,b,I;const a=[Re,Ke],m=[];function u(s,d){return s[1]?1:0}return t=u(o),n=m[t]=a[t](o),{c(){e=$("dialog"),l=$("div"),n.c(),c=y(),r=$("form"),r.innerHTML=f,this.h()},l(s){e=w(s,"DIALOG",{class:!0});var d=x(e);l=w(d,"DIV",{class:!0});var i=x(l);n.l(i),i.forEach(p),c=S(d),r=w(d,"FORM",{method:!0,class:!0,"data-svelte-h":!0}),_e(r)!=="svelte-povsts"&&(r.innerHTML=f),d.forEach(p),this.h()},h(){_(l,"class","modal-box bg-base-200 pb-10"),_(r,"method","dialog"),_(r,"class","modal-backdrop"),_(e,"class","modal modal-bottom sm:modal-middle")},m(s,d){G(s,e,d),h(e,l),m[t].m(l,null),h(e,c),h(e,r),o[3](e),g=!0,b||(I=z(e,"close",o[4]),b=!0)},p(s,[d]){let i=t;t=u(s),t===i?m[t].p(s,d):($e(),P(m[i],1,1,()=>{m[i]=null}),we(),n=m[t],n?n.p(s,d):(n=m[t]=a[t](s),n.c()),V(n,1),n.m(l,null))},i(s){g||(V(n),g=!0)},o(s){P(n),g=!1},d(s){s&&p(e),m[t].d(),o[3](null),b=!1,I()}}}function Je(o,e,l){let{dialog:t}=e,n=!1;const c=g=>{l(1,n=!0)};function r(g){be[g?"unshift":"push"](()=>{t=g,l(0,t)})}const f=()=>{l(1,n=!1),history.back()};return o.$$set=g=>{"dialog"in g&&l(0,t=g.dialog)},[t,n,c,r,f]}class Qe extends Y{constructor(e){super(),J(this,e,Je,Ye,R,{dialog:0})}}function de(o,e,l){const t=o.slice();return t[8]=e[l],t[10]=l,t}function he(o){let e,l,t;function n(r){o[3](r)}let c={};return o[0]!==void 0&&(c.dialog=o[0]),e=new Qe({props:c}),be.push(()=>Se(e,"dialog",n)),{c(){L(e.$$.fragment)},l(r){B(e.$$.fragment,r)},m(r,f){W(e,r,f),t=!0},p(r,f){const g={};!l&&f&1&&(l=!0,g.dialog=r[0],ye(()=>l=!1)),e.$set(g)},i(r){t||(V(e.$$.fragment,r),t=!0)},o(r){P(e.$$.fragment,r),t=!1},d(r){A(e,r)}}}function me(o){let e,l,t,n,c=ce[o[8]]+"",r,f,g,b;function I(){return o[4](o[8])}return{c(){e=$("button"),l=$("img"),n=H(`
        Signin with `),r=H(c),f=y(),this.h()},l(a){e=w(a,"BUTTON",{class:!0});var m=x(e);l=w(m,"IMG",{class:!0,src:!0,alt:!0}),n=N(m,`
        Signin with `),r=N(m,c),f=S(m),m.forEach(p),this.h()},h(){_(l,"class","w-10 h-10"),ve(l.src,t=Ve[o[8]])||_(l,"src",t),_(l,"alt",ce[o[8]]),_(e,"class","btn xs:btn-lg btn-outline w-full "+(o[8]===Z.Facebook?"opacity-50":""))},m(a,m){G(a,e,m),h(e,l),h(e,n),h(e,r),h(e,f),g||(b=z(e,"click",I),g=!0)},p(a,m){o=a},d(a){a&&p(e),g=!1,b()}}}function Ze(o){let e,l,t,n,c,r,f,g="Login Or Signup",b,I,a=o[1].state.showModal&&he(o),m=ae(ue),u=[];for(let s=0;s<m.length;s+=1)u[s]=me(de(o,m,s));return{c(){a&&a.c(),e=y(),l=$("main"),t=$("img"),c=y(),r=$("div"),f=$("h1"),f.textContent=g,b=y();for(let s=0;s<u.length;s+=1)u[s].c();this.h()},l(s){a&&a.l(s),e=S(s),l=w(s,"MAIN",{class:!0});var d=x(l);t=w(d,"IMG",{class:!0,src:!0,alt:!0}),c=S(d),r=w(d,"DIV",{class:!0});var i=x(r);f=w(i,"H1",{class:!0,"data-svelte-h":!0}),_e(f)!=="svelte-1ih2mwd"&&(f.textContent=g),b=S(i);for(let C=0;C<u.length;C+=1)u[C].l(i);i.forEach(p),d.forEach(p),this.h()},h(){_(t,"class","flex-[1] object-cover !max-w-[50%] hidden lg:flex"),ve(t.src,n="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg")||_(t,"src",n),_(t,"alt","simpletor"),_(f,"class","text-3xl text-center"),_(r,"class","flex-[1] flex flex-col justify-center items-center xs:gap-8 gap-5 sm:mx-[70px] mx-3 my-[100px]"),_(l,"class","flex w-full h-full")},m(s,d){a&&a.m(s,d),G(s,e,d),G(s,l,d),h(l,t),h(l,c),h(l,r),h(r,f),h(r,b);for(let i=0;i<u.length;i+=1)u[i]&&u[i].m(r,null);I=!0},p(s,[d]){if(s[1].state.showModal?a?(a.p(s,d),d&2&&V(a,1)):(a=he(s),a.c(),V(a,1),a.m(e.parentNode,e)):a&&($e(),P(a,1,1,()=>{a=null}),we()),d&4){m=ae(ue);let i;for(i=0;i<m.length;i+=1){const C=de(s,m,i);u[i]?u[i].p(C,d):(u[i]=me(C),u[i].c(),u[i].m(r,null))}for(;i<u.length;i+=1)u[i].d(1);u.length=m.length}},i(s){I||(V(a),I=!0)},o(s){P(a),I=!1},d(s){s&&(p(e),p(l)),a&&a.d(s),Te(u,s)}}}function et(o,e,l){let t,n,c;Q(o,Pe,a=>l(5,t=a)),Q(o,Ne,a=>l(6,n=a)),Q(o,De,a=>l(1,c=a));let r;async function f(a){if(Z.Facebook===a){ee({text:O("soon",n),status:"info"});return}if(Z.Phone===a){g();return}if(await q.GI().handleLogin({provider:a,loginType:Me.login}),await fe.GI().setupUser({newUserId:fe.GI().userId}),!t){re(`${ie}/account-setup`);return}re(`${ie}/business`)}function g(){Ce("",{showModal:!0}),setTimeout(()=>r.showModal(),200)}function b(a){r=a,l(0,r)}return[r,c,f,b,a=>f(a)]}class ft extends Y{constructor(e){super(),J(this,e,et,Ze,R,{})}}export{ft as component};