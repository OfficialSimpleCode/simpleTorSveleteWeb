import{s as F,e as v,a as T,t as S,c as $,b as y,g as k,d as z,f as d,o as h,i as B,h as p,q as H,j as L,k as O}from"../chunks/scheduler.FRfybdjT.js";import{S as G,i as J,c as x,a as D,m as M,t as N,b as j,d as q}from"../chunks/index.Fw8Tm96U.js";import{g as K,b as Q}from"../chunks/entry.C8sEKgsb.js";import{U as R}from"../chunks/UpdatePageHeader.A0GRGzKH.js";import{C as W}from"../chunks/CustomPhoneField.eYf7Ohi5.js";import{t as _}from"../chunks/business_initializer.oBGNpB1Q.js";import{$ as X}from"../chunks/runtime.HsTUf-wZ.js";function Y(t){let n,a,f,i,r,o,g,m,s,b=(t[0]?"Invalid phoner number":_("pressToVerify",t[2]))+"",U,w,c,I,V;return a=new R({props:{title:A(_("phoneUpdate",t[2])),helpMessage:_("phoneUpdateExplain",t[2])}}),o=new W({}),o.$on("phoneChange",t[4]),{c(){n=v("main"),x(a.$$.fragment),f=T(),i=v("div"),r=v("div"),x(o.$$.fragment),g=T(),m=v("div"),s=v("button"),U=S(b),this.h()},l(e){n=$(e,"MAIN",{class:!0});var l=y(n);D(a.$$.fragment,l),f=k(l),i=$(l,"DIV",{class:!0});var u=y(i);r=$(u,"DIV",{class:!0});var E=y(r);D(o.$$.fragment,E),g=k(E),m=$(E,"DIV",{class:!0});var C=y(m);s=$(C,"BUTTON",{class:!0});var P=y(s);U=z(P,b),P.forEach(d),C.forEach(d),E.forEach(d),u.forEach(d),l.forEach(d),this.h()},h(){h(s,"class",w="btn btn-primary "+(t[1]?"":"opacity-60")),h(m,"class","form-control mt-6"),h(r,"class","card shrink-0 w-full max-w-sm shadow-2xl bg-base-200 py-3 px-6"),h(i,"class","flex items-center justify-center w-full h-[60%]"),h(n,"class","flex flex-col items-center mx-4 mt-0 gap-10 h-full")},m(e,l){B(e,n,l),M(a,n,null),p(n,f),p(n,i),p(i,r),M(o,r,null),p(r,g),p(r,m),p(m,s),p(s,U),c=!0,I||(V=H(s,"click",t[3]),I=!0)},p(e,[l]){const u={};l&4&&(u.title=A(_("phoneUpdate",e[2]))),l&4&&(u.helpMessage=_("phoneUpdateExplain",e[2])),a.$set(u),(!c||l&5)&&b!==(b=(e[0]?"Invalid phoner number":_("pressToVerify",e[2]))+"")&&L(U,b),(!c||l&2&&w!==(w="btn btn-primary "+(e[1]?"":"opacity-60")))&&h(s,"class",w)},i(e){c||(N(a.$$.fragment,e),N(o.$$.fragment,e),c=!0)},o(e){j(a.$$.fragment,e),j(o.$$.fragment,e),c=!1},d(e){e&&d(n),q(a),q(o),I=!1,V()}}}function A(t){return t.charAt(0).toUpperCase()+t.slice(1)}function Z(t,n,a){let f;O(t,X,s=>a(2,f=s));let i=!1,r=!1,o;function g(){r&&o?K(`${Q}/verify-phone-number`):(a(0,i=!0),setTimeout(()=>a(0,i=!1),1500))}function m(s){o=s.detail.value??"",a(1,r=s.detail.isValid)}return[i,r,f,g,m]}class le extends G{constructor(n){super(),J(this,n,Z,Y,F,{})}}export{le as component};
