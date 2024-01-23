import{s as S,e as m,a as x,c as _,b as y,g as R,l as V,f as w,m as u,o as D,i as F,h as f,n as P,B as j,t as U,d as k,r as N}from"../chunks/scheduler.9PBM3dH7.js";import{e as G}from"../chunks/each.-oqiv04n.js";import{S as O,i as T}from"../chunks/index.U7o6dbZo.js";import{V as E,A as b,a as M,b as W,c as q,g as L,L as B,U as I}from"../chunks/business_initializer.l6UkpdXT.js";import{u as H}from"../chunks/User.XWUydFvV.js";class ${static _singleton=new this;constructor(){}static GI(){return this._singleton}signInUserId="";currentAuthProvider=null;verificationID="";submitedPhone="";lastVerificationUnix=0;currentCredential=null;phoneVerificationWithFirebase=!0;verificationRepo=new E;updateFinishLogIn(e){}async logoutIfSignUpNotCompleted(){}get userLoggedIn(){return this.verificationRepo.isLoggedIn}async getUserClaims(){return await this.verificationRepo.userClaims}async saveUserName(e){return await this.verificationRepo.updateUserName({name:e})}setupLoggin(){this.verificationID="",this.currentAuthProvider=null,this.currentCredential=null,this.submitedPhone="",this.phoneVerificationWithFirebase=!0}get userId(){return this.verificationRepo.userId}get userData(){return this.verificationRepo.userData}get existsLoginProviders(){return this.verificationRepo.existsProviders}get lastLoginDate(){return this.verificationRepo.lastLoginDate}async unlinkProvider(e){const t=M[e]||"";return await this.verificationRepo.unlinkProvider({providerId:t})}async logout(){return await this.verificationRepo.logout()}async handleLogin({provider:e,loginType:t}){switch(e){case b.Apple:return await this._signInWithApple(t);case b.Google:return await this._signInWithGoogle(t);case b.Facebook:return await this._signInWithFacebook(t);case b.Phone:return!1}}async _signInWithGoogle(e){return await this.verificationRepo.signInWithGoogle(e)}async _signInWithApple(e){return await this.verificationRepo.signInWithApple(e)}async _signInWithFacebook(e){return await this.verificationRepo.signInWithFacebook(e)}async _loginWithOtp({loginType:e,otp:t,autocredential:a}){return await this.verificationRepo.signInWithOtp({loginType:e,verificationId:this.verificationID,otp:t,autocredential:a})}async deleteUser(){return await this.verificationRepo.deleteUser()}async reloadUser(){await this.verificationRepo.reloadUser()}}function C(o,e,t){const a=o.slice();return a[2]=e[t],a[4]=t,a}function A(o){let e,t,a,h,l=W[o[2]]+"",c,p,d,g;function n(){return o[1](o[2])}return{c(){e=m("button"),t=m("img"),h=U(`
                Signin with `),c=U(l),p=x(),this.h()},l(i){e=_(i,"BUTTON",{class:!0});var r=y(e);t=_(r,"IMG",{class:!0,src:!0,alt:!0}),h=k(r,`
                Signin with `),c=k(r,l),p=R(r),r.forEach(w),this.h()},h(){u(t,"class","w-10 h-10"),D(t.src,a=q[o[2]])||u(t,"src",a),u(t,"alt",W[o[2]]),u(e,"class","btn sm:btn-lg btn-outline w-full")},m(i,r){F(i,e,r),f(e,t),f(e,h),f(e,c),f(e,p),d||(g=N(e,"click",n),d=!0)},p(i,r){o=i},d(i){i&&w(e),d=!1,g()}}}function z(o){let e,t,a,h,l,c,p="Login Or Signup",d,g=G(L),n=[];for(let i=0;i<g.length;i+=1)n[i]=A(C(o,g,i));return{c(){e=m("main"),t=m("img"),h=x(),l=m("div"),c=m("h1"),c.textContent=p,d=x();for(let i=0;i<n.length;i+=1)n[i].c();this.h()},l(i){e=_(i,"MAIN",{class:!0});var r=y(e);t=_(r,"IMG",{class:!0,src:!0,alt:!0}),h=R(r),l=_(r,"DIV",{class:!0});var s=y(l);c=_(s,"H1",{class:!0,"data-svelte-h":!0}),V(c)!=="svelte-1x8fwlv"&&(c.textContent=p),d=R(s);for(let v=0;v<n.length;v+=1)n[v].l(s);s.forEach(w),r.forEach(w),this.h()},h(){u(t,"class","flex-[1] object-cover !max-w-[50%] hidden lg:flex"),D(t.src,a="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg")||u(t,"src",a),u(t,"alt","simpletor"),u(c,"class","text-4xl"),u(l,"class","flex-[1] flex flex-col justify-center items-center gap-8 svelte-gchouu"),u(e,"class","flex w-full h-full")},m(i,r){F(i,e,r),f(e,t),f(e,h),f(e,l),f(l,c),f(l,d);for(let s=0;s<n.length;s+=1)n[s]&&n[s].m(l,null)},p(i,[r]){if(r&1){g=G(L);let s;for(s=0;s<g.length;s+=1){const v=C(i,g,s);n[s]?n[s].p(v,r):(n[s]=A(v),n[s].c(),n[s].m(l,null))}for(;s<n.length;s+=1)n[s].d(1);n.length=g.length}},i:P,o:P,d(i){i&&w(e),j(n,i)}}}function J(o){async function e(a){await $.GI().handleLogin({provider:a,loginType:B.login}),console.log(I.GI().userId),await I.GI().setupUser({newUserId:I.GI().userId}),console.log(I.GI().user);const h=I.GI().user;H.set(h)}return[e,a=>e(a)]}class ee extends O{constructor(e){super(),T(this,e,J,z,S,{})}}export{ee as component};
