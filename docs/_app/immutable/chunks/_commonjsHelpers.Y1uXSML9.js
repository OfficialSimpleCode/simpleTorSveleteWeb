var a=function(t,r){return a=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(n,e){n.__proto__=e}||function(n,e){for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(n[o]=e[o])},a(t,r)};function f(t,r){if(typeof r!="function"&&r!==null)throw new TypeError("Class extends value "+String(r)+" is not a constructor or null");a(t,r);function n(){this.constructor=t}t.prototype=r===null?Object.create(r):(n.prototype=r.prototype,new n)}var c=function(){return c=Object.assign||function(r){for(var n,e=1,o=arguments.length;e<o;e++){n=arguments[e];for(var u in n)Object.prototype.hasOwnProperty.call(n,u)&&(r[u]=n[u])}return r},c.apply(this,arguments)};function s(t,r){var n={};for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&r.indexOf(e)<0&&(n[e]=t[e]);if(t!=null&&typeof Object.getOwnPropertySymbols=="function")for(var o=0,e=Object.getOwnPropertySymbols(t);o<e.length;o++)r.indexOf(e[o])<0&&Object.prototype.propertyIsEnumerable.call(t,e[o])&&(n[e[o]]=t[e[o]]);return n}function l(t,r,n){if(n||arguments.length===2)for(var e=0,o=r.length,u;e<o;e++)(u||!(e in r))&&(u||(u=Array.prototype.slice.call(r,0,e)),u[e]=r[e]);return t.concat(u||Array.prototype.slice.call(r))}var p=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function i(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}function y(t){if(t.__esModule)return t;var r=t.default;if(typeof r=="function"){var n=function e(){return this instanceof e?Reflect.construct(r,arguments,this.constructor):r.apply(this,arguments)};n.prototype=r.prototype}else n={};return Object.defineProperty(n,"__esModule",{value:!0}),Object.keys(t).forEach(function(e){var o=Object.getOwnPropertyDescriptor(t,e);Object.defineProperty(n,e,o.get?o:{enumerable:!0,get:function(){return t[e]}})}),n}export{c as _,f as a,s as b,l as c,y as d,p as e,i as g};
