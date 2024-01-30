var ne=Object.defineProperty;var le=(i,e,t)=>e in i?ne(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var P=(i,e,t)=>(le(i,typeof e!="symbol"?e+"":e,t),t);import{s as T,e as y,b,d as C,g as G,i as m,j as k,k as L,a as se,t as oe,h as re,f as ue,z as W,l as v,n as ce,o as de,p as Z,c as ae,K as fe}from"./scheduler.C3TCnZHI.js";import{S as F,i as j,c as B,a as S,m as z,t as D,b as E,d as O,g as he,e as pe}from"./index.Lhnxl_wK.js";import{I as me,a as ge,e as q}from"./Icon.5AMkhErR.js";import{t as I,a9 as M,aa as U,ab as K,n as Ie,ac as Ge,ad as _e,V as ve,ae as H,af as J,K as x,L as V,ag as ye,A as be,ah as ke,m as h,u as A,ai as Q,H as Ce,I as we,a as Re,c as De,l as Ae,e as Ee,f as Ne,B as w,aj as Pe,a6 as X,Z as Y,p as Ue}from"./business_initializer.urx4IAss.js";import{$ as ie}from"./runtime.oGXtuNGk.js";function xe(i){let e,t,s,r;return t=new me({props:{src:ge,size:"26px"}}),{c(){e=y("div"),B(t.$$.fragment),this.h()},l(a){e=b(a,"DIV",{class:!0,"data-tip":!0});var n=C(e);S(t.$$.fragment,n),n.forEach(G),this.h()},h(){m(e,"class",s=i[2]?"absolute top-4 tooltip":""),m(e,"data-tip",i[0]),k(e,"right-4",i[1]=="right"),k(e,"tooltip-left",i[1]=="right"),k(e,"left-4",i[1]=="left"),k(e,"tooltip-right",i[1]=="left")},m(a,n){L(a,e,n),z(t,e,null),r=!0},p(a,[n]){(!r||n&4&&s!==(s=a[2]?"absolute top-4 tooltip":""))&&m(e,"class",s),(!r||n&1)&&m(e,"data-tip",a[0]),(!r||n&6)&&k(e,"right-4",a[1]=="right"),(!r||n&6)&&k(e,"tooltip-left",a[1]=="right"),(!r||n&6)&&k(e,"left-4",a[1]=="left"),(!r||n&6)&&k(e,"tooltip-right",a[1]=="left")},i(a){r||(D(t.$$.fragment,a),r=!0)},o(a){E(t.$$.fragment,a),r=!1},d(a){a&&G(e),O(t)}}}function Ve(i,e,t){let{message:s}=e,{location:r="right"}=e,{useAbsolute:a=!0}=e;return i.$$set=n=>{"message"in n&&t(0,s=n.message),"location"in n&&t(1,r=n.location),"useAbsolute"in n&&t(2,a=n.useAbsolute)},[s,r,a]}class Me extends F{constructor(e){super(),j(this,e,Ve,xe,T,{message:0,location:1,useAbsolute:2})}}function Te(i){let e,t,s,r,a,n,l,c=I(M[i[0]],i[3])+"",o,g,u,p;return{c(){e=y("div"),t=y("button"),s=y("img"),n=se(),l=y("p"),o=oe(c),this.h()},l(f){e=b(f,"DIV",{class:!0});var d=C(e);t=b(d,"BUTTON",{class:!0});var _=C(t);s=b(_,"IMG",{class:!0,src:!0,alt:!0}),n=re(_),l=b(_,"P",{class:!0});var R=C(l);o=ue(R,c),R.forEach(G),_.forEach(G),d.forEach(G),this.h()},h(){m(s,"class","w-full h-full object-scale-down rounded-lg p-3"),W(s.src,r=U[i[0]])||m(s,"src",r),m(s,"alt",a=U[i[0]]),m(l,"class","xs:text-md text-sm"),m(t,"class",g="rounded-lg btn-outline px-1 bg-base-300 border xs:h-[80px] xs:w-[80px] h-[60px] :w-[60px] hover:bg-primary "+(i[1]===i[0]?"border-primary":"border-gray-500")),m(e,"class","flex flex-col items-center justify-centers icon")},m(f,d){L(f,e,d),v(e,t),v(t,s),v(t,n),v(t,l),v(l,o),u||(p=ce(t,"click",i[4]),u=!0)},p(f,[d]){d&1&&!W(s.src,r=U[f[0]])&&m(s,"src",r),d&1&&a!==(a=U[f[0]])&&m(s,"alt",a),d&9&&c!==(c=I(M[f[0]],f[3])+"")&&de(o,c),d&3&&g!==(g="rounded-lg btn-outline px-1 bg-base-300 border xs:h-[80px] xs:w-[80px] h-[60px] :w-[60px] hover:bg-primary "+(f[1]===f[0]?"border-primary":"border-gray-500"))&&m(t,"class",g)},i:Z,o:Z,d(f){f&&G(e),u=!1,p()}}}function Le(i,e,t){let s;ae(i,ie,c=>t(3,s=c));let{gender:r}=e,{pickedGender:a}=e,{handleClick:n}=e;const l=()=>n(r);return i.$$set=c=>{"gender"in c&&t(0,r=c.gender),"pickedGender"in c&&t(1,a=c.pickedGender),"handleClick"in c&&t(2,n=c.handleClick)},[r,a,n,s,l]}class Fe extends F{constructor(e){super(),j(this,e,Le,Te,T,{gender:0,pickedGender:1,handleClick:2})}}function $(i,e,t){const s=i.slice();return s[4]=e[t],s[6]=t,s}function ee(i){let e,t;return e=new Fe({props:{pickedGender:i[0],gender:i[4],handleClick:i[2]}}),{c(){B(e.$$.fragment)},l(s){S(e.$$.fragment,s)},m(s,r){z(e,s,r),t=!0},p(s,r){const a={};r&1&&(a.pickedGender=s[0]),e.$set(a)},i(s){t||(D(e.$$.fragment,s),t=!0)},o(s){E(e.$$.fragment,s),t=!1},d(s){O(e,s)}}}function je(i){let e,t,s,r,a,n,l;r=new Me({props:{useAbsolute:!1,message:I("genderInfo",i[1],!1)}});let c=q(K),o=[];for(let u=0;u<c.length;u+=1)o[u]=ee($(i,c,u));const g=u=>E(o[u],1,1,()=>{o[u]=null});return{c(){e=y("div"),t=y("section"),s=y("div"),B(r.$$.fragment),a=se(),n=y("div");for(let u=0;u<o.length;u+=1)o[u].c();this.h()},l(u){e=b(u,"DIV",{class:!0});var p=C(e);t=b(p,"SECTION",{class:!0});var f=C(t);s=b(f,"DIV",{class:!0});var d=C(s);S(r.$$.fragment,d),d.forEach(G),a=re(f),n=b(f,"DIV",{class:!0});var _=C(n);for(let R=0;R<o.length;R+=1)o[R].l(_);_.forEach(G),f.forEach(G),p.forEach(G),this.h()},h(){m(s,"class","absolute top-1 w-full p-1"),m(n,"class","flex flex-row gap-2 px-4 xs:py-4 py-6 items-center justify-center"),m(t,"class","relative rounded-lg bg-base-100 xs:p-3 p-2 flex items-center justify-center gap-10 w-full"),m(e,"class","form-control")},m(u,p){L(u,e,p),v(e,t),v(t,s),z(r,s,null),v(t,a),v(t,n);for(let f=0;f<o.length;f+=1)o[f]&&o[f].m(n,null);l=!0},p(u,[p]){const f={};if(p&2&&(f.message=I("genderInfo",u[1],!1)),r.$set(f),p&5){c=q(K);let d;for(d=0;d<c.length;d+=1){const _=$(u,c,d);o[d]?(o[d].p(_,p),D(o[d],1)):(o[d]=ee(_),o[d].c(),D(o[d],1),o[d].m(n,null))}for(he(),d=c.length;d<o.length;d+=1)g(d);pe()}},i(u){if(!l){D(r.$$.fragment,u);for(let p=0;p<c.length;p+=1)D(o[p]);l=!0}},o(u){E(r.$$.fragment,u),o=o.filter(Boolean);for(let p=0;p<o.length;p+=1)E(o[p]);l=!1},d(u){u&&G(e),O(r),fe(o,u)}}}function Be(i,e,t){let s;ae(i,ie,l=>t(1,s=l));let{pickedGender:r=Ie.male}=e,{onChanged:a=void 0}=e;function n(l){t(0,r=l),a!=null&&a(l)}return i.$$set=l=>{"pickedGender"in l&&t(0,r=l.pickedGender),"onChanged"in l&&t(3,a=l.onChanged)},[r,s,n,a]}class Je extends F{constructor(e){super(),j(this,e,Be,je,T,{pickedGender:0,onChanged:3})}}function Se(i){return i===null||i===""||/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(i)?null:I("invalidEmail")}function Qe(i){return i==null?null:i.trim().length>Ge?I("tooLongNote"):""}function Xe(i,e={}){const t=e.withoutTranslate||!1;if(i===null)return i;if(i.includes("&&"))return t?"":I("illegalName")+" - &&";if(i.includes("~"))return t?"":I("illegalName")+" - ~";if(i==="guest")return t?"":I("illegalName")+" - guest";if(i.length>30||i.length<2)return t?"":I("illegalName");if(i.length>15&&!i.includes(" "))return t?"":I("illegalName");for(let s=0;s<Math.min(i.length,2);s++)if(i[s]===" ")return t?"":I("illegalName");return null}const{v4:ze}=Ue,N=class N{constructor(){P(this,"userRepo",new _e);P(this,"verificationRepo",new ve)}static GI(){return N._singleton}async createUser({gender:e,phone:t,email:s,isVerifiedPhone:r,isVerifiedEmail:a,userName:n,authProvider:l,userId:c}){const o=await this.userRepo.getDocSRV({path:H,docId:J(t)});if(o===void 0||o.exists()){x.GI().error=V.alreadyExistPhone;return}const g=new ye({id:c,name:n,email:s,isVerifiedPhone:r,isVerifiedEmail:a,phoneNumber:t,myBuisnessesIds:[],productsIds:{},lastVisitedBuisnessesRemoved:[],lastVisitedBuisnesses:[],revenueCatId:ze(),gender:e});console.log("currentUser",g),g.authProviders=l?new Map([[l,new Date]]):new Map;let u;if(l===be.Phone&&r&&(u=await this.mergePhoneCollectionWithUser(g,t,{fromCreateUser:!0}),u||(g.isVerifiedPhone=!1)),!!await this.userRepo.createUser({user:g}))return u||new ke}async mergePhoneCollectionWithUser(e,t,{fromCreateUser:s=!1}){const r=await this.userRepo.mergePhoneDataWithUser({phone:t,userId:e.id,name:e.name});if(!(r===void 0&&x.GI().error===V.alreadyExistPhone))return r}async updateCreditCardsPassword(e,t){const s={},r={};return e!==""&&Object.entries(h.GI().user.paymentCards).forEach(([a,n])=>{Object.entries(n).forEach(([l,c])=>{const g=c.decryptCard(e).encryptCard(t);s[a]??(s[a]={}),s[a][l]=g,r[a]??(r[a]={}),r[a][l]=g.toJson()})}),await this.userRepo.updateMultipleFieldsInsideDocAsMapRepo({docId:h.GI().user.id,path:A,data:{cardPaymentsPass:Q(t),paymentCards:r}}).then(async a=>(a&&(h.GI().user.cardPaymentsPass=Q(t),h.GI().user.paymentCards=s),a))}async updateEmail(e,{isVerified:t=!1}={}){return Se(e)!==null?(x.GI().error=V.illegalFields,!1):e===h.GI().user.userPublicData.email?!0:Ce(h.GI().user.lastTimeUpdateEmail,new we({days:1}))>new Date?(x.GI().error=V.cantUpdateEmailTooShortTimeBetween,!1):(h.GI().user.userPublicData.email=e,await this.userRepo.updateMultipleFieldsInsideDocAsMapRepo({path:`${A}/${h.GI().user.id}/${Re}`,docId:De,data:{email:e,isVerifiedEmail:t}}).then(async s=>{if(s){h.GI().user.userPublicData.isVerifiedEmail=t;const r=new Date;return await this.userRepo.updateFieldInsideDocAsMapRepo({path:A,docId:h.GI().user.id,fieldName:"lastTimeUpdateEmail",value:r.toString()}).then(a=>(a&&(h.GI().user.lastTimeUpdateEmail=r),a))}return s}))}async updateSeenUpdates(e,t){return new Set([...h.GI().user.seenUpdates[e]].filter(r=>t.has(r))).size===t.size?!0:(h.GI().user.seenUpdates[e]=new Set([...t]),await this.userRepo.updateFieldInsideDocAsMapRepo({path:A,docId:h.GI().user.id,fieldName:`seenUpdates.${e}`,value:Array.from(t)}))}async setGender(e){return e===h.GI().user.gender?(console.log("22222222222222222222"),!0):(console.log("eeeeeeeeeeeeeeeee"),h.GI().user.gender=e,Ae.set(h.GI().user),await this.userRepo.updatePublicUserField({userId:h.GI().user.id,fieldName:"gender",value:M[e],businessesIds:Object.keys(h.GI().user.userPublicData.permission)}).then(t=>(console.log("33333333333",t),t)))}async updateName(e){if(e===h.GI().user.name)return!0;const t=h.GI().user;return t.name=e,await this.userRepo.updatePublicUserField({userId:t.id,businessesIds:Object.keys(t.userPublicData.permission),fieldName:"name",value:e}).then(async s=>{if(s){const r=[];t.userPublicData.myBuisnessesIds.forEach(a=>{r.push(this.userRepo.updateFieldInsideDocAsMapRepo({fieldName:"ownersName",docId:a,path:Ee,value:e}).then(n=>{n&&a==Ne.currentBusinesssId&&(w.GI().business.ownersName=e)}))}),t.isVerifiedPhone&&r.push(this.userRepo.updateFieldInsideDocAsMapRepo({fieldName:"name",docId:J(t.phoneNumber),path:H,value:e})),await Promise.all(r)}return s})}async addOrRemoveLikeForStoryImage(e,t,s,r){var n;const a=await this.userRepo.updateFieldInsideDocAsArrayRepo({path:A,docId:s,fieldName:"storyLikes",value:e,command:r});if(a){const l=((n=w.GI().workers[t])==null?void 0:n.storylikesAmount[e])??0;r===Pe.add?(await this.userRepo.incrementNumberChild({childPath:X.GI().getLisksChildPath(t),valueId:e,delta:1,command:Y.increment}),h.GI().user.storyLikes.push(e),w.GI().workers[t]&&(w.GI().workers[t].storylikesAmount[e]=l+1)):(l>=0&&(await this.userRepo.incrementNumberChild({childPath:X.GI().getLisksChildPath(t),valueId:e,delta:1,command:Y.decrement}),w.GI().workers[t]&&(w.GI().workers[t].storylikesAmount[e]=Math.max(w.GI().workers[t].storylikesAmount[e]-1,0))),h.GI().user.storyLikes=h.GI().user.storyLikes.filter(c=>c!=e))}return a}};P(N,"_singleton",new N);let te=N;export{Je as G,Me as I,te as U,Qe as a,Se as e,Xe as n};
