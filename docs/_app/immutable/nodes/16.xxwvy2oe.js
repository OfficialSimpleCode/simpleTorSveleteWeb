import{s as S,e as v,a as T,t as j,b as $,d as y,h as k,f as q,g as d,i as h,k as z,l as p,n as H,o as L,c as O}from"../chunks/scheduler.C3TCnZHI.js";import{S as G,i as J,c as D,a as x,m as M,t as N,b as A,d as B}from"../chunks/index.Lhnxl_wK.js";import{g as K,b as Q}from"../chunks/entry.Zg_Hl4ct.js";import{o as R}from"../chunks/ui_utils.e2n3WFww.js";import{U as W}from"../chunks/UpdatePageHeader._8IESaKl.js";import{C as X}from"../chunks/CustomPhoneField.prwarJJJ.js";import{t as _}from"../chunks/business_initializer.urx4IAss.js";import{$ as Y}from"../chunks/runtime.oGXtuNGk.js";function Z(t){let n,a,f,i,o,r,g,m,s,b=(t[0]?"Invalid phoner number":_("pressToVerify",t[2]))+"",U,w,c,I,P;return a=new W({props:{title:F(_("phoneUpdate",t[2])),helpMessage:_("phoneUpdateExplain",t[2]),onBack:R}}),r=new X({}),r.$on("phoneChange",t[4]),{c(){n=v("main"),D(a.$$.fragment),f=T(),i=v("div"),o=v("div"),D(r.$$.fragment),g=T(),m=v("div"),s=v("button"),U=j(b),this.h()},l(e){n=$(e,"MAIN",{class:!0});var l=y(n);x(a.$$.fragment,l),f=k(l),i=$(l,"DIV",{class:!0});var u=y(i);o=$(u,"DIV",{class:!0});var E=y(o);x(r.$$.fragment,E),g=k(E),m=$(E,"DIV",{class:!0});var V=y(m);s=$(V,"BUTTON",{class:!0});var C=y(s);U=q(C,b),C.forEach(d),V.forEach(d),E.forEach(d),u.forEach(d),l.forEach(d),this.h()},h(){h(s,"class",w="btn btn-primary "+(t[1]?"":"opacity-60")),h(m,"class","form-control mt-6"),h(o,"class","card shrink-0 w-full max-w-sm shadow-2xl bg-base-200 py-3 px-6"),h(i,"class","flex items-center justify-center w-full h-[60%]"),h(n,"class","flex flex-col items-center mx-4 mt-0 gap-10 h-full")},m(e,l){z(e,n,l),M(a,n,null),p(n,f),p(n,i),p(i,o),M(r,o,null),p(o,g),p(o,m),p(m,s),p(s,U),c=!0,I||(P=H(s,"click",t[3]),I=!0)},p(e,[l]){const u={};l&4&&(u.title=F(_("phoneUpdate",e[2]))),l&4&&(u.helpMessage=_("phoneUpdateExplain",e[2])),a.$set(u),(!c||l&5)&&b!==(b=(e[0]?"Invalid phoner number":_("pressToVerify",e[2]))+"")&&L(U,b),(!c||l&2&&w!==(w="btn btn-primary "+(e[1]?"":"opacity-60")))&&h(s,"class",w)},i(e){c||(N(a.$$.fragment,e),N(r.$$.fragment,e),c=!0)},o(e){A(a.$$.fragment,e),A(r.$$.fragment,e),c=!1},d(e){e&&d(n),B(a),B(r),I=!1,P()}}}function F(t){return t.charAt(0).toUpperCase()+t.slice(1)}function ee(t,n,a){let f;O(t,Y,s=>a(2,f=s));let i=!1,o=!1,r;function g(){o&&r?K(`${Q}/verify-phone-number`):(a(0,i=!0),setTimeout(()=>a(0,i=!1),1500))}function m(s){r=s.detail.value??"",a(1,o=s.detail.isValid)}return[i,o,f,g,m]}class me extends G{constructor(n){super(),J(this,n,ee,Z,S,{})}}export{me as component};
