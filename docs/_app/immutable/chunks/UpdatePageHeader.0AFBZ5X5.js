import{s as j,e as _,a as $,t as k,c as p,b as g,g as b,d as D,f as h,m as x,x as H,i as S,h as f,j as U}from"./scheduler.509A42hq.js";import{S as V,i as q,c as y,a as w,m as B,t as I,b as M,d as E}from"./index.RcSBkeD6.js";import{B as C}from"./BackButton.XHIt2Rhg.js";import{I as P}from"./InfoTooltipButton.pTCbcR6O.js";function T(o){let t,a,l,i,s,u,d,r,m;return a=new P({props:{message:o[1]}}),r=new C({}),{c(){t=_("div"),y(a.$$.fragment),l=$(),i=_("div"),s=_("h1"),u=k(o[0]),d=$(),y(r.$$.fragment),this.h()},l(e){t=p(e,"DIV",{class:!0,style:!0});var n=g(t);w(a.$$.fragment,n),l=b(n),i=p(n,"DIV",{});var c=g(i);s=p(c,"H1",{class:!0});var v=g(s);u=D(v,o[0]),v.forEach(h),c.forEach(h),d=b(n),w(r.$$.fragment,n),n.forEach(h),this.h()},h(){x(s,"class","text-xl text-center"),x(t,"class","flex items-center justify-between w-full pt-4"),H(t,"direction","ltr")},m(e,n){S(e,t,n),B(a,t,null),f(t,l),f(t,i),f(i,s),f(s,u),f(t,d),B(r,t,null),m=!0},p(e,[n]){const c={};n&2&&(c.message=e[1]),a.$set(c),(!m||n&1)&&U(u,e[0])},i(e){m||(I(a.$$.fragment,e),I(r.$$.fragment,e),m=!0)},o(e){M(a.$$.fragment,e),M(r.$$.fragment,e),m=!1},d(e){e&&h(t),E(a),E(r)}}}function z(o,t,a){let{title:l}=t,{helpMessage:i}=t;return o.$$set=s=>{"title"in s&&a(0,l=s.title),"helpMessage"in s&&a(1,i=s.helpMessage)},[l,i]}class K extends V{constructor(t){super(),q(this,t,z,T,j,{title:0,helpMessage:1})}}export{K as U};