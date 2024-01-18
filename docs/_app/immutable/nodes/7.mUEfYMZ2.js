import{s as F,e as m,a as b,c as _,b as x,g as y,l as S,f as I,m as h,o as D,i as G,h as g,n as R,x as V,t as P,d as k,r as j}from"../chunks/scheduler.RwZki40E.js";import{e as W}from"../chunks/each.-oqiv04n.js";import{S as N,i as O}from"../chunks/index.WLek1-PI.js";import{V as T,A as w,a as E,b as L,c as M,g as U,L as q}from"../chunks/auth.WngGw762.js";class H{static _singleton=new this;constructor(){}static GI(){return this._singleton}signInUserId="";currentAuthProvider=null;verificationID="";submitedPhone="";lastVerificationUnix=0;currentCredential=null;phoneVerificationWithFirebase=!0;verificationRepo=new T;updateFinishLogIn(e){}async logoutIfSignUpNotCompleted(){}get userLoggedIn(){return this.verificationRepo.isLoggedIn}async getUserClaims(){return await this.verificationRepo.userClaims}async saveUserName(e){return await this.verificationRepo.updateUserName({name:e})}setupLoggin(){this.verificationID="",this.currentAuthProvider=null,this.currentCredential=null,this.submitedPhone="",this.phoneVerificationWithFirebase=!0}get userId(){return this.verificationRepo.userId}get userData(){return this.verificationRepo.userData}get existsLoginProviders(){return this.verificationRepo.existsProviders}get lastLoginDate(){return this.verificationRepo.lastLoginDate}async unlinkProvider(e){const t=E[e]||"";return await this.verificationRepo.unlinkProvider({providerId:t})}async logout(){return await this.verificationRepo.logout()}async handleLogin({provider:e,loginType:t}){switch(e){case w.Apple:return await this._signInWithApple(t);case w.Google:return await this._signInWithGoogle(t);case w.Facebook:return await this._signInWithFacebook(t);case w.Phone:return!1}}async _signInWithGoogle(e){return await this.verificationRepo.signInWithGoogle(e)}async _signInWithApple(e){return await this.verificationRepo.signInWithApple(e)}async _signInWithFacebook(e){return await this.verificationRepo.signInWithFacebook(e)}async _loginWithOtp({loginType:e,otp:t,autocredential:r}){return await this.verificationRepo.signInWithOtp({loginType:e,verificationId:this.verificationID,otp:t,autocredential:r})}async deleteUser(){return await this.verificationRepo.deleteUser()}async reloadUser(){await this.verificationRepo.reloadUser()}}function C(o,e,t){const r=o.slice();return r[2]=e[t],r[4]=t,r}function A(o){let e,t,r,f,l=L[o[2]]+"",c,d,p,u;function a(){return o[1](o[2])}return{c(){e=m("button"),t=m("img"),f=P(`
                Signin with `),c=P(l),d=b(),this.h()},l(i){e=_(i,"BUTTON",{class:!0});var s=x(e);t=_(s,"IMG",{class:!0,src:!0,alt:!0}),f=k(s,`
                Signin with `),c=k(s,l),d=y(s),s.forEach(I),this.h()},h(){h(t,"class","w-10 h-10"),D(t.src,r=M[o[2]])||h(t,"src",r),h(t,"alt",L[o[2]]),h(e,"class","btn sm:btn-lg btn-outline w-full")},m(i,s){G(i,e,s),g(e,t),g(e,f),g(e,c),g(e,d),p||(u=j(e,"click",a),p=!0)},p(i,s){o=i},d(i){i&&I(e),p=!1,u()}}}function $(o){let e,t,r,f,l,c,d="Login Or Signup",p,u=W(U),a=[];for(let i=0;i<u.length;i+=1)a[i]=A(C(o,u,i));return{c(){e=m("main"),t=m("img"),f=b(),l=m("div"),c=m("h1"),c.textContent=d,p=b();for(let i=0;i<a.length;i+=1)a[i].c();this.h()},l(i){e=_(i,"MAIN",{class:!0});var s=x(e);t=_(s,"IMG",{class:!0,src:!0,alt:!0}),f=y(s),l=_(s,"DIV",{class:!0});var n=x(l);c=_(n,"H1",{class:!0,"data-svelte-h":!0}),S(c)!=="svelte-1x8fwlv"&&(c.textContent=d),p=y(n);for(let v=0;v<a.length;v+=1)a[v].l(n);n.forEach(I),s.forEach(I),this.h()},h(){h(t,"class","flex-[1] object-cover !max-w-[50%] hidden lg:flex"),D(t.src,r="https://images.pexels.com/photos/841130/pexels-photo-841130.jpeg?cs=srgb&dl=action-athlete-barbell-841130.jpg&fm=jpg")||h(t,"src",r),h(t,"alt","simpletor"),h(c,"class","text-4xl"),h(l,"class","flex-[1] flex flex-col justify-center items-center gap-8"),h(e,"class","flex w-full h-full")},m(i,s){G(i,e,s),g(e,t),g(e,f),g(e,l),g(l,c),g(l,p);for(let n=0;n<a.length;n+=1)a[n]&&a[n].m(l,null)},p(i,[s]){if(s&1){u=W(U);let n;for(n=0;n<u.length;n+=1){const v=C(i,u,n);a[n]?a[n].p(v,s):(a[n]=A(v),a[n].c(),a[n].m(l,null))}for(;n<a.length;n+=1)a[n].d(1);a.length=u.length}},i:R,o:R,d(i){i&&I(e),V(a,i)}}}function B(o){function e(r){H.GI().handleLogin({provider:r,loginType:q.login})}return[e,r=>e(r)]}class X extends N{constructor(e){super(),O(this,e,B,$,F,{})}}export{X as component};
