import{s as le,e as r,a as T,c as o,b as h,g as V,l as k,f as c,m as l,i as H,h as a,q as X,r as Y,v as re,w as oe}from"../chunks/scheduler.y3swz5Q-.js";import{S as ie,i as ce,c as Z,a as ee,m as te,t as ne,b as se,d as ae}from"../chunks/index.XAwjLm8o.js";import{B as ue}from"../chunks/BackButton.8Fu4J7op.js";import{I as de}from"../chunks/InfoTooltipButton.6mJZLQAl.js";function fe(p){let e,n="Sending";return{c(){e=r("div"),e.textContent=n,this.h()},l(t){e=o(t,"DIV",{class:!0,"data-svelte-h":!0}),k(e)!=="svelte-1ywje7e"&&(e.textContent=n),this.h()},h(){l(e,"class","badge badge-warning")},m(t,u){H(t,e,u)},d(t){t&&c(e)}}}function me(p){let e,n="Sent";return{c(){e=r("div"),e.textContent=n,this.h()},l(t){e=o(t,"DIV",{class:!0,"data-svelte-h":!0}),k(e)!=="svelte-gu23bd"&&(e.textContent=n),this.h()},h(){l(e,"class","badge badge-success")},m(t,u){H(t,e,u)},d(t){t&&c(e)}}}function he(p){let e,n,t,u,v,U='<h1 class="text-xl text-center">Verify Phone Number</h1>',q,g,M,y,I,_,b,d,$,F="One Time Code",O,C,A,i,L,w,x,R="Verify Phone Number",D,j,z;t=new de({props:{message:"Placeholder TODO"}}),g=new ue({});function G(s,m){return s[0]?me:fe}let N=G(p),f=N(p);return{c(){e=r("main"),n=r("div"),Z(t.$$.fragment),u=T(),v=r("div"),v.innerHTML=U,q=T(),Z(g.$$.fragment),M=T(),y=r("div"),I=r("div"),_=r("form"),b=r("div"),d=r("label"),$=r("span"),$.textContent=F,O=T(),C=r("span"),f.c(),A=T(),i=r("input"),L=T(),w=r("div"),x=r("button"),x.textContent=R,this.h()},l(s){e=o(s,"MAIN",{class:!0});var m=h(e);n=o(m,"DIV",{class:!0});var E=h(n);ee(t.$$.fragment,E),u=V(E),v=o(E,"DIV",{"data-svelte-h":!0}),k(v)!=="svelte-15l9q8n"&&(v.innerHTML=U),q=V(E),ee(g.$$.fragment,E),E.forEach(c),M=V(m),y=o(m,"DIV",{class:!0});var J=h(y);I=o(J,"DIV",{class:!0});var K=h(I);_=o(K,"FORM",{class:!0});var P=h(_);b=o(P,"DIV",{class:!0});var S=h(b);d=o(S,"LABEL",{class:!0,for:!0});var B=h(d);$=o(B,"SPAN",{class:!0,"data-svelte-h":!0}),k($)!=="svelte-1qortf9"&&($.textContent=F),O=V(B),C=o(B,"SPAN",{class:!0});var Q=h(C);f.l(Q),Q.forEach(c),B.forEach(c),A=V(S),i=o(S,"INPUT",{name:!0,type:!0,placeholder:!0,class:!0}),S.forEach(c),L=V(P),w=o(P,"DIV",{class:!0});var W=h(w);x=o(W,"BUTTON",{class:!0,"data-svelte-h":!0}),k(x)!=="svelte-p91ohe"&&(x.textContent=R),W.forEach(c),P.forEach(c),K.forEach(c),J.forEach(c),m.forEach(c),this.h()},h(){l(n,"class","flex items-center justify-between w-full pt-4"),l($,"class","label-text"),l(C,"class","label-text-alt"),l(d,"class","label"),l(d,"for","one-time-code"),l(i,"name","one-time-code"),l(i,"type","text"),l(i,"placeholder","verfication code"),l(i,"class","input input-bordered"),i.required=!0,l(b,"class","form-control"),l(x,"class","btn btn-primary"),l(w,"class","form-control mt-6"),l(_,"class","card-body"),l(I,"class","card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"),l(y,"class","flex items-center justify-center w-full h-[60%]"),l(e,"class","flex flex-col items-center mx-4 mt-0 gap-10 h-full")},m(s,m){H(s,e,m),a(e,n),te(t,n,null),a(n,u),a(n,v),a(n,q),te(g,n,null),a(e,M),a(e,y),a(y,I),a(I,_),a(_,b),a(b,d),a(d,$),a(d,O),a(d,C),f.m(C,null),a(b,A),a(b,i),X(i,p[1]),a(_,L),a(_,w),a(w,x),D=!0,j||(z=[Y(i,"input",p[2]),Y(x,"click",pe)],j=!0)},p(s,[m]){N!==(N=G(s))&&(f.d(1),f=N(s),f&&(f.c(),f.m(C,null))),m&2&&i.value!==s[1]&&X(i,s[1])},i(s){D||(ne(t.$$.fragment,s),ne(g.$$.fragment,s),D=!0)},o(s){se(t.$$.fragment,s),se(g.$$.fragment,s),D=!1},d(s){s&&c(e),ae(t),ae(g),f.d(),j=!1,re(z)}}}function pe(){}function ve(p,e,n){let t=!1,u="";oe(()=>{setTimeout(()=>n(0,t=!0),2e3)});function v(){u=this.value,n(1,u)}return[t,u,v]}class $e extends ie{constructor(e){super(),ce(this,e,ve,he,le,{})}}export{$e as component};