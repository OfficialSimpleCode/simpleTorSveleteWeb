import{s as W,e as o,a as I,c as i,b as h,g as w,l as k,f as p,m as t,i as X,h as e,q as S,r as F,v as Y}from"../chunks/scheduler.y3swz5Q-.js";import{S as Z,i as ee,c as R,a as z,m as G,t as J,b as K,d as Q}from"../chunks/index.XAwjLm8o.js";import{B as te}from"../chunks/BackButton.8Fu4J7op.js";import{I as ae}from"../chunks/InfoTooltipButton.6mJZLQAl.js";function ne(T){let n,s,r,y,_,H='<h1 class="text-xl text-center">Update Profile Name</h1>',B,v,C,$,b,c,m,u,O='<span class="label-text">New Name</span>',L,l,M,x,f,P="Update Name",E,V,U;return r=new ae({props:{message:"Placeholder TODO"}}),v=new te({}),{c(){n=o("main"),s=o("div"),R(r.$$.fragment),y=I(),_=o("div"),_.innerHTML=H,B=I(),R(v.$$.fragment),C=I(),$=o("div"),b=o("div"),c=o("form"),m=o("div"),u=o("label"),u.innerHTML=O,L=I(),l=o("input"),M=I(),x=o("div"),f=o("button"),f.textContent=P,this.h()},l(a){n=i(a,"MAIN",{class:!0});var d=h(n);s=i(d,"DIV",{class:!0});var g=h(s);z(r.$$.fragment,g),y=w(g),_=i(g,"DIV",{"data-svelte-h":!0}),k(_)!=="svelte-17bx7ik"&&(_.innerHTML=H),B=w(g),z(v.$$.fragment,g),g.forEach(p),C=w(d),$=i(d,"DIV",{class:!0});var q=h($);b=i(q,"DIV",{class:!0});var j=h(b);c=i(j,"FORM",{class:!0});var N=h(c);m=i(N,"DIV",{class:!0});var D=h(m);u=i(D,"LABEL",{class:!0,for:!0,"data-svelte-h":!0}),k(u)!=="svelte-1no17i9"&&(u.innerHTML=O),L=w(D),l=i(D,"INPUT",{name:!0,type:!0,placeholder:!0,class:!0}),D.forEach(p),M=w(N),x=i(N,"DIV",{class:!0});var A=h(x);f=i(A,"BUTTON",{class:!0,"data-svelte-h":!0}),k(f)!=="svelte-1yrmn0i"&&(f.textContent=P),A.forEach(p),N.forEach(p),j.forEach(p),q.forEach(p),d.forEach(p),this.h()},h(){t(s,"class","flex items-center justify-between w-full pt-4"),t(u,"class","label"),t(u,"for","name"),t(l,"name","name"),t(l,"type","name"),t(l,"placeholder","profile name"),t(l,"class","input input-bordered"),l.required=!0,t(m,"class","form-control"),t(f,"class","btn btn-primary"),t(x,"class","form-control mt-6"),t(c,"class","card-body"),t(b,"class","card shrink-0 w-full max-w-sm shadow-2xl bg-base-100"),t($,"class","flex items-center justify-center w-full h-[60%]"),t(n,"class","flex flex-col items-center mx-4 mt-0 gap-10 h-full")},m(a,d){X(a,n,d),e(n,s),G(r,s,null),e(s,y),e(s,_),e(s,B),G(v,s,null),e(n,C),e(n,$),e($,b),e(b,c),e(c,m),e(m,u),e(m,L),e(m,l),S(l,T[0]),e(c,M),e(c,x),e(x,f),E=!0,V||(U=[F(l,"input",T[1]),F(f,"click",se)],V=!0)},p(a,[d]){d&1&&S(l,a[0])},i(a){E||(J(r.$$.fragment,a),J(v.$$.fragment,a),E=!0)},o(a){K(r.$$.fragment,a),K(v.$$.fragment,a),E=!1},d(a){a&&p(n),Q(r),Q(v),V=!1,Y(U)}}}function se(){}function re(T,n,s){let r="";function y(){r=this.value,s(0,r)}return[r,y]}class me extends Z{constructor(n){super(),ee(this,n,re,ne,W,{})}}export{me as component};