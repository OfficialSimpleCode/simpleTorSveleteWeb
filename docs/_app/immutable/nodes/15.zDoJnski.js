import{s as G,e as c,a as k,t as O,c as m,b as _,g as q,d as C,f as u,o as n,i as J,h as t,v as F,q as H,j as R,r as K,k as z}from"../chunks/scheduler.rZl0nx9x.js";import{S as Q,i as W,c as X,a as Y,m as Z,t as ee,b as te,d as ae}from"../chunks/index.y9_4rGtT.js";import{l as se}from"../chunks/business_initializer.rkF3vozn.js";import{$ as re}from"../chunks/runtime.O5IRQp7y.js";import{U as ne}from"../chunks/UpdatePageHeader.hBlPc9xM.js";function le(f){let a,s,b,p,o,i,r,h,g,I=f[1]("name")+"",N,P,d,U,E,v,w=f[1]("save")+"",S,$,V,A;return s=new ne({props:{title:f[1]("name"),helpMessage:""}}),{c(){a=c("main"),X(s.$$.fragment),b=k(),p=c("div"),o=c("div"),i=c("form"),r=c("div"),h=c("label"),g=c("span"),N=O(I),P=k(),d=c("input"),U=k(),E=c("div"),v=c("button"),S=O(w),this.h()},l(e){a=m(e,"MAIN",{class:!0});var l=_(a);Y(s.$$.fragment,l),b=q(l),p=m(l,"DIV",{class:!0});var y=_(p);o=m(y,"DIV",{class:!0});var M=_(o);i=m(M,"FORM",{class:!0});var x=_(i);r=m(x,"DIV",{class:!0});var D=_(r);h=m(D,"LABEL",{class:!0,for:!0});var T=_(h);g=m(T,"SPAN",{class:!0});var j=_(g);N=C(j,I),j.forEach(u),T.forEach(u),P=q(D),d=m(D,"INPUT",{type:!0,class:!0}),D.forEach(u),U=q(x),E=m(x,"DIV",{class:!0});var B=_(E);v=m(B,"BUTTON",{class:!0});var L=_(v);S=C(L,w),L.forEach(u),B.forEach(u),x.forEach(u),M.forEach(u),y.forEach(u),l.forEach(u),this.h()},h(){n(g,"class","label-text"),n(h,"class","label"),n(h,"for","name"),n(d,"type","name"),n(d,"class","input input-bordered"),d.required=!0,n(r,"class","form-control"),n(v,"class","btn btn-primary"),n(E,"class","form-control mt-6"),n(i,"class","card-body"),n(o,"class","card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"),n(p,"class","flex items-center justify-center w-full h-[60%]"),n(a,"class","flex flex-col items-center mx-4 mt-0 gap-10 h-full")},m(e,l){J(e,a,l),Z(s,a,null),t(a,b),t(a,p),t(p,o),t(o,i),t(i,r),t(r,h),t(h,g),t(g,N),t(r,P),t(r,d),F(d,f[0]),t(i,U),t(i,E),t(E,v),t(v,S),$=!0,V||(A=[H(d,"input",f[2]),H(v,"click",oe)],V=!0)},p(e,[l]){const y={};l&2&&(y.title=e[1]("name")),s.$set(y),(!$||l&2)&&I!==(I=e[1]("name")+"")&&R(N,I),l&1&&F(d,e[0]),(!$||l&2)&&w!==(w=e[1]("save")+"")&&R(S,w)},i(e){$||(ee(s.$$.fragment,e),$=!0)},o(e){te(s.$$.fragment,e),$=!1},d(e){e&&u(a),ae(s),V=!1,K(A)}}}function oe(){}function ie(f,a,s){let b,p;z(f,se,r=>s(3,b=r)),z(f,re,r=>s(1,p=r));let o=b.name;function i(){o=this.value,s(0,o)}return[o,p,i]}class de extends Q{constructor(a){super(),W(this,a,ie,le,G,{})}}export{de as component};