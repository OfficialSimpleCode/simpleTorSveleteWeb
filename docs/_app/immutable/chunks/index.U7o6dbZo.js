import{v as $,n as _,N as y,b as S,f as b,O as E,z as w,P as O,Q as x,R as C,S as I,T as p,U as N,V as P,W as R,X as U,Y as V}from"./scheduler.9PBM3dH7.js";const o=new Set;let f;function T(){f={r:0,c:[],p:f}}function W(){f.r||$(f.c),f=f.p}function j(t,e){t&&t.i&&(o.delete(t),t.i(e))}function X(t,e,n,s){if(t&&t.o){if(o.has(t))return;o.add(t),f.c.push(()=>{o.delete(t),s&&(n&&t.d(1),s())}),t.o(e)}else s&&s()}function Y(t,e,n){const s=t.$$.props[e];s!==void 0&&(t.$$.bound[s]=n,n(t.$$.ctx[s]))}function A(t){t&&t.c()}function D(t,e){t&&t.l(e)}function z(t,e,n){const{fragment:s,after_update:i}=t.$$;s&&s.m(e,n),x(()=>{const d=t.$$.on_mount.map(N).filter(w);t.$$.on_destroy?t.$$.on_destroy.push(...d):$(d),t.$$.on_mount=[]}),i.forEach(x)}function B(t,e){const n=t.$$;n.fragment!==null&&(C(n.after_update),$(n.on_destroy),n.fragment&&n.fragment.d(e),n.on_destroy=n.fragment=null,n.ctx=[])}function L(t,e){t.$$.dirty[0]===-1&&(P.push(t),R(),t.$$.dirty.fill(0)),t.$$.dirty[e/31|0]|=1<<e%31}function F(t,e,n,s,i,d,c=null,v=[-1]){const u=I;p(t);const a=t.$$={fragment:null,ctx:[],props:d,update:_,not_equal:i,bound:y(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(e.context||(u?u.$$.context:[])),callbacks:y(),dirty:v,skip_bound:!1,root:e.target||u.$$.root};c&&c(a.root);let h=!1;if(a.ctx=n?n(t,e.props||{},(r,l,...g)=>{const m=g.length?g[0]:l;return a.ctx&&i(a.ctx[r],a.ctx[r]=m)&&(!a.skip_bound&&a.bound[r]&&a.bound[r](m),h&&L(t,r)),l}):[],a.update(),h=!0,$(a.before_update),a.fragment=s?s(a.ctx):!1,e.target){if(e.hydrate){U();const r=S(e.target);a.fragment&&a.fragment.l(r),r.forEach(b)}else a.fragment&&a.fragment.c();e.intro&&j(t.$$.fragment),z(t,e.target,e.anchor),V(),E()}p(u)}class G{$$=void 0;$$set=void 0;$destroy(){B(this,1),this.$destroy=_}$on(e,n){if(!w(n))return _;const s=this.$$.callbacks[e]||(this.$$.callbacks[e]=[]);return s.push(n),()=>{const i=s.indexOf(n);i!==-1&&s.splice(i,1)}}$set(e){this.$$set&&!O(e)&&(this.$$.skip_bound=!0,this.$$set(e),this.$$.skip_bound=!1)}}const M="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(M);export{G as S,D as a,X as b,A as c,B as d,W as e,Y as f,T as g,F as i,z as m,j as t};