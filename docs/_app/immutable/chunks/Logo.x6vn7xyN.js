import{s as g,e as h,c as u,b as x,f,l as r,i as c,n as m,m as _,o as d,p as a,h as v}from"./scheduler.gdM_c-iG.js";import{S as b,i as p}from"./index.pbpye073.js";function k(s){let e,i='<h1 class="text-lg font-bold font-mono text-black text-center">ST</h1>';return{c(){e=h("div"),e.innerHTML=i,this.h()},l(n){e=u(n,"DIV",{class:!0,"data-svelte-h":!0}),_(e)!=="svelte-168v7hi"&&(e.innerHTML=i),this.h()},h(){d(e,"class","h-full w-full bg-white flex items-center justify-center rounded-full"),a(e,"text-lg",s[1]<60),a(e,"text-xl",s[1]<80),a(e,"text-2xl",s[1]<120)},m(n,t){c(n,e,t)},p(n,t){t&2&&a(e,"text-lg",n[1]<60),t&2&&a(e,"text-xl",n[1]<80),t&2&&a(e,"text-2xl",n[1]<120)},d(n){n&&f(e)}}}function w(s){let e,i,n="ST";return{c(){e=h("div"),i=h("h1"),i.textContent=n,this.h()},l(t){e=u(t,"DIV",{class:!0});var l=x(e);i=u(l,"H1",{class:!0,"data-svelte-h":!0}),_(i)!=="svelte-1cwihq7"&&(i.textContent=n),l.forEach(f),this.h()},h(){d(i,"class","font-bold font-mono text-white text-center"),a(i,"text-lg",s[1]<60),a(i,"text-xl",s[1]<80),a(i,"text-2xl",s[1]<120),d(e,"class","h-full w-full bg-black flex items-center justify-center rounded-full")},m(t,l){c(t,e,l),v(e,i)},p(t,l){l&2&&a(i,"text-lg",t[1]<60),l&2&&a(i,"text-xl",t[1]<80),l&2&&a(i,"text-2xl",t[1]<120)},d(t){t&&f(e)}}}function C(s){let e;function i(l,o){return l[0]=="light"?w:k}let n=i(s),t=n(s);return{c(){e=h("div"),t.c(),this.h()},l(l){e=u(l,"DIV",{style:!0});var o=x(e);t.l(o),o.forEach(f),this.h()},h(){r(e,"width",s[1]+"px"),r(e,"height",s[1]+"px")},m(l,o){c(l,e,o),t.m(e,null)},p(l,[o]){n===(n=i(l))&&t?t.p(l,o):(t.d(1),t=n(l),t&&(t.c(),t.m(e,null))),o&2&&r(e,"width",l[1]+"px"),o&2&&r(e,"height",l[1]+"px")},i:m,o:m,d(l){l&&f(e),t.d()}}}function L(s,e,i){let{mode:n="light"}=e,{radius:t=48}=e;return s.$$set=l=>{"mode"in l&&i(0,n=l.mode),"radius"in l&&i(1,t=l.radius)},[n,t]}class y extends b{constructor(e){super(),p(this,e,L,C,g,{mode:0,radius:1})}}export{y as L};
