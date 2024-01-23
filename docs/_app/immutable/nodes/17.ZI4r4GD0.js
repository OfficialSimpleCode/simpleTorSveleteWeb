import{s as se,e as f,a as S,t as z,c as d,b as p,g as V,d as B,f as u,m as i,i as K,h as s,q as ae,r as J,u as ne,j as H,v as le,k as re,w as oe,l as ie,n as ce}from"../chunks/scheduler.9PBM3dH7.js";import{S as ue,i as fe,c as de,a as pe,m as me,t as he,b as _e,d as ve}from"../chunks/index.U7o6dbZo.js";import{g as be,b as ge}from"../chunks/entry.1t6NTrIJ.js";import{$ as Ee}from"../chunks/runtime.aQ20cKaW.js";import{U as Pe}from"../chunks/UpdatePageHeader.MmIIszhL.js";function $e(o){let e,a='<div class="loading loading-spinner loading-xs"></div>';return{c(){e=f("div"),e.innerHTML=a,this.h()},l(l){e=d(l,"DIV",{class:!0,"data-svelte-h":!0}),ie(e)!=="svelte-16wznfg"&&(e.innerHTML=a),this.h()},h(){i(e,"class","badge badge-warning")},m(l,n){K(l,e,n)},p:ce,d(l){l&&u(e)}}}function ye(o){let e,a=o[2]("sendSuccess")+"",l;return{c(){e=f("div"),l=z(a),this.h()},l(n){e=d(n,"DIV",{class:!0});var r=p(e);l=B(r,a),r.forEach(u),this.h()},h(){i(e,"class","badge badge-success")},m(n,r){K(n,e,r),s(e,l)},p(n,r){r&4&&a!==(a=n[2]("sendSuccess")+"")&&H(l,a)},d(n){n&&u(e)}}}function ke(o){let e,a,l,n,r,_,v,m,k,T=o[2]("pressOpt")+"",N,j,E,F,b,R,g,P,w=o[2]("verifyPhone")+"",U,x,$,I=o[2]("phoneUpdate")+"",D,y,G,Q;a=new Pe({props:{title:o[2]("verifyPhoneMechanizem"),helpMessage:o[2]("phoneVerificationPageExplain")}});function W(t,c){return t[0]?ye:$e}let O=W(o),h=O(o);return{c(){e=f("main"),de(a.$$.fragment),l=S(),n=f("div"),r=f("div"),_=f("form"),v=f("div"),m=f("label"),k=f("span"),N=z(T),j=S(),E=f("span"),h.c(),F=S(),b=f("input"),R=S(),g=f("div"),P=f("button"),U=z(w),x=S(),$=f("button"),D=z(I),this.h()},l(t){e=d(t,"MAIN",{class:!0});var c=p(e);pe(a.$$.fragment,c),l=V(c),n=d(c,"DIV",{class:!0});var M=p(n);r=d(M,"DIV",{class:!0});var X=p(r);_=d(X,"FORM",{class:!0});var A=p(_);v=d(A,"DIV",{class:!0});var C=p(v);m=d(C,"LABEL",{class:!0,for:!0});var L=p(m);k=d(L,"SPAN",{class:!0});var Y=p(k);N=B(Y,T),Y.forEach(u),j=V(L),E=d(L,"SPAN",{class:!0});var Z=p(E);h.l(Z),Z.forEach(u),L.forEach(u),F=V(C),b=d(C,"INPUT",{type:!0,class:!0}),C.forEach(u),R=V(A),g=d(A,"DIV",{class:!0});var q=p(g);P=d(q,"BUTTON",{class:!0});var ee=p(P);U=B(ee,w),ee.forEach(u),x=V(q),$=d(q,"BUTTON",{class:!0});var te=p($);D=B(te,I),te.forEach(u),q.forEach(u),A.forEach(u),X.forEach(u),M.forEach(u),c.forEach(u),this.h()},h(){i(k,"class","label-text"),i(E,"class","label-text-alt"),i(m,"class","label"),i(m,"for","one-time-code"),i(b,"type","text"),i(b,"class","input input-bordered"),b.required=!0,i(v,"class","form-control"),i(P,"class","btn btn-primary"),i($,"class","btn btn-outline"),i(g,"class","form-control mt-6 gap-1"),i(_,"class","card-body"),i(r,"class","card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"),i(n,"class","flex items-center justify-center w-full h-[60%]"),i(e,"class","flex flex-col items-center mx-4 mt-0 gap-10 h-full")},m(t,c){K(t,e,c),me(a,e,null),s(e,l),s(e,n),s(n,r),s(r,_),s(_,v),s(v,m),s(m,k),s(k,N),s(m,j),s(m,E),h.m(E,null),s(v,F),s(v,b),ae(b,o[1]),s(_,R),s(_,g),s(g,P),s(P,U),s(g,x),s(g,$),s($,D),y=!0,G||(Q=[J(b,"input",o[4]),J(P,"click",Me),J($,"click",ne(o[3]))],G=!0)},p(t,[c]){const M={};c&4&&(M.title=t[2]("verifyPhoneMechanizem")),c&4&&(M.helpMessage=t[2]("phoneVerificationPageExplain")),a.$set(M),(!y||c&4)&&T!==(T=t[2]("pressOpt")+"")&&H(N,T),O===(O=W(t))&&h?h.p(t,c):(h.d(1),h=O(t),h&&(h.c(),h.m(E,null))),c&2&&b.value!==t[1]&&ae(b,t[1]),(!y||c&4)&&w!==(w=t[2]("verifyPhone")+"")&&H(U,w),(!y||c&4)&&I!==(I=t[2]("phoneUpdate")+"")&&H(D,I)},i(t){y||(he(a.$$.fragment,t),y=!0)},o(t){_e(a.$$.fragment,t),y=!1},d(t){t&&u(e),ve(a),h.d(),G=!1,le(Q)}}}function Me(){}function Te(o,e,a){let l;re(o,Ee,m=>a(2,l=m));let n=!1,r="";oe(()=>{setTimeout(()=>a(0,n=!0),2e3)});function _(){be(`${ge}/update-profile-phone`,{replaceState:!0})}function v(){r=this.value,a(1,r)}return[n,r,l,_,v]}class Ue extends ue{constructor(e){super(),fe(this,e,Te,ke,se,{})}}export{Ue as component};
