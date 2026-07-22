(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))i(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function t(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerPolicy&&(r.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?r.credentials="include":s.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(s){if(s.ep)return;s.ep=!0;const r=t(s);fetch(s.href,r)}})();const qo="modulepreload",Qo=function(n){return"/"+n},ss={},pt=function(e,t,i){let s=Promise.resolve();if(t&&t.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),a=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));s=Promise.allSettled(t.map(l=>{if(l=Qo(l),l in ss)return;ss[l]=!0;const c=l.endsWith(".css"),u=c?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${l}"]${u}`))return;const d=document.createElement("link");if(d.rel=c?"stylesheet":qo,c||(d.as="script"),d.crossOrigin="",d.href=l,a&&d.setAttribute("nonce",a),document.head.appendChild(d),c)return new Promise((h,p)=>{d.addEventListener("load",h),d.addEventListener("error",()=>p(new Error(`Unable to preload CSS for ${l}`)))})}))}function r(o){const a=new Event("vite:preloadError",{cancelable:!0});if(a.payload=o,window.dispatchEvent(a),!a.defaultPrevented)throw o}return s.then(o=>{for(const a of o||[])a.status==="rejected"&&r(a.reason);return e().catch(r)})};var rs={};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Js={NODE_ADMIN:!1,SDK_VERSION:"${JSCORE_VERSION}"};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const f=function(n,e){if(!n)throw Je(e)},Je=function(n){return new Error("Firebase Database ("+Js.SDK_VERSION+") INTERNAL ASSERT FAILED: "+n)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zs=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):(s&64512)===55296&&i+1<n.length&&(n.charCodeAt(i+1)&64512)===56320?(s=65536+((s&1023)<<10)+(n.charCodeAt(++i)&1023),e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},Yo=function(n){const e=[];let t=0,i=0;for(;t<n.length;){const s=n[t++];if(s<128)e[i++]=String.fromCharCode(s);else if(s>191&&s<224){const r=n[t++];e[i++]=String.fromCharCode((s&31)<<6|r&63)}else if(s>239&&s<365){const r=n[t++],o=n[t++],a=n[t++],l=((s&7)<<18|(r&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(l>>10)),e[i++]=String.fromCharCode(56320+(l&1023))}else{const r=n[t++],o=n[t++];e[i++]=String.fromCharCode((s&15)<<12|(r&63)<<6|o&63)}}return e.join("")},_i={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(n,e){if(!Array.isArray(n))throw Error("encodeByteArray takes an array as a parameter");this.init_();const t=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let s=0;s<n.length;s+=3){const r=n[s],o=s+1<n.length,a=o?n[s+1]:0,l=s+2<n.length,c=l?n[s+2]:0,u=r>>2,d=(r&3)<<4|a>>4;let h=(a&15)<<2|c>>6,p=c&63;l||(p=64,o||(h=64)),i.push(t[u],t[d],t[h],t[p])}return i.join("")},encodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(n):this.encodeByteArray(Zs(n),e)},decodeString(n,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(n):Yo(this.decodeStringToByteArray(n,e))},decodeStringToByteArray(n,e){this.init_();const t=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let s=0;s<n.length;){const r=t[n.charAt(s++)],a=s<n.length?t[n.charAt(s)]:0;++s;const c=s<n.length?t[n.charAt(s)]:64;++s;const d=s<n.length?t[n.charAt(s)]:64;if(++s,r==null||a==null||c==null||d==null)throw new Xo;const h=r<<2|a>>4;if(i.push(h),c!==64){const p=a<<4&240|c>>2;if(i.push(p),d!==64){const _=c<<6&192|d;i.push(_)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let n=0;n<this.ENCODED_VALS.length;n++)this.byteToCharMap_[n]=this.ENCODED_VALS.charAt(n),this.charToByteMap_[this.byteToCharMap_[n]]=n,this.byteToCharMapWebSafe_[n]=this.ENCODED_VALS_WEBSAFE.charAt(n),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[n]]=n,n>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(n)]=n,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(n)]=n)}}};class Xo extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}}const er=function(n){const e=Zs(n);return _i.encodeByteArray(e,!0)},Ht=function(n){return er(n).replace(/\./g,"")},Hn=function(n){try{return _i.decodeString(n,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Jo(n){return tr(void 0,n)}function tr(n,e){if(!(e instanceof Object))return e;switch(e.constructor){case Date:const t=e;return new Date(t.getTime());case Object:n===void 0&&(n={});break;case Array:n=[];break;default:return e}for(const t in e)!e.hasOwnProperty(t)||!Zo(t)||(n[t]=tr(n[t],e[t]));return n}function Zo(n){return n!=="__proto__"}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ea(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}/**
 * @license
 * Copyright 2022 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ta=()=>ea().__FIREBASE_DEFAULTS__,na=()=>{if(typeof process>"u"||typeof rs>"u")return;const n=rs.__FIREBASE_DEFAULTS__;if(n)return JSON.parse(n)},ia=()=>{if(typeof document>"u")return;let n;try{n=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}const e=n&&Hn(n[1]);return e&&JSON.parse(e)},nr=()=>{try{return ta()||na()||ia()}catch(n){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${n}`);return}},sa=n=>{var e,t;return(t=(e=nr())===null||e===void 0?void 0:e.emulatorHosts)===null||t===void 0?void 0:t[n]},ra=n=>{const e=sa(n);if(!e)return;const t=e.lastIndexOf(":");if(t<=0||t+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);const i=parseInt(e.substring(t+1),10);return e[0]==="["?[e.substring(1,t-1),i]:[e.substring(0,t),i]},ir=()=>{var n;return(n=nr())===null||n===void 0?void 0:n.config};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class z{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,t)=>{this.resolve=e,this.reject=t})}wrapCallback(e){return(t,i)=>{t?this.reject(t):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(t):e(t,i))}}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function oa(n,e){if(n.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');const t={alg:"none",type:"JWT"},i=e||"demo-project",s=n.iat||0,r=n.sub||n.user_id;if(!r)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");const o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:s,exp:s+3600,auth_time:s,sub:r,user_id:r,firebase:{sign_in_provider:"custom",identities:{}}},n);return[Ht(JSON.stringify(t)),Ht(JSON.stringify(o)),""].join(".")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function aa(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function sr(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(aa())}function la(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function ca(){return Js.NODE_ADMIN===!0}function da(){try{return typeof indexedDB=="object"}catch{return!1}}function ua(){return new Promise((n,e)=>{try{let t=!0;const i="validate-browser-context-for-indexeddb-analytics-module",s=self.indexedDB.open(i);s.onsuccess=()=>{s.result.close(),t||self.indexedDB.deleteDatabase(i),n(!0)},s.onupgradeneeded=()=>{t=!1},s.onerror=()=>{var r;e(((r=s.error)===null||r===void 0?void 0:r.message)||"")}}catch(t){e(t)}})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ha="FirebaseError";class St extends Error{constructor(e,t,i){super(t),this.code=e,this.customData=i,this.name=ha,Object.setPrototypeOf(this,St.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,rr.prototype.create)}}class rr{constructor(e,t,i){this.service=e,this.serviceName=t,this.errors=i}create(e,...t){const i=t[0]||{},s=`${this.service}/${e}`,r=this.errors[e],o=r?fa(r,i):"Error",a=`${this.serviceName}: ${o} (${s}).`;return new St(s,a,i)}}function fa(n,e){return n.replace(pa,(t,i)=>{const s=e[i];return s!=null?String(s):`<${i}?>`})}const pa=/\{\$([^}]+)}/g;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function mt(n){return JSON.parse(n)}function O(n){return JSON.stringify(n)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const or=function(n){let e={},t={},i={},s="";try{const r=n.split(".");e=mt(Hn(r[0])||""),t=mt(Hn(r[1])||""),s=r[2],i=t.d||{},delete t.d}catch{}return{header:e,claims:t,data:i,signature:s}},ma=function(n){const e=or(n),t=e.claims;return!!t&&typeof t=="object"&&t.hasOwnProperty("iat")},_a=function(n){const e=or(n).claims;return typeof e=="object"&&e.admin===!0};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function se(n,e){return Object.prototype.hasOwnProperty.call(n,e)}function Re(n,e){if(Object.prototype.hasOwnProperty.call(n,e))return n[e]}function jn(n){for(const e in n)if(Object.prototype.hasOwnProperty.call(n,e))return!1;return!0}function jt(n,e,t){const i={};for(const s in n)Object.prototype.hasOwnProperty.call(n,s)&&(i[s]=e.call(t,n[s],s,n));return i}function Vn(n,e){if(n===e)return!0;const t=Object.keys(n),i=Object.keys(e);for(const s of t){if(!i.includes(s))return!1;const r=n[s],o=e[s];if(os(r)&&os(o)){if(!Vn(r,o))return!1}else if(r!==o)return!1}for(const s of i)if(!t.includes(s))return!1;return!0}function os(n){return n!==null&&typeof n=="object"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function ga(n){const e=[];for(const[t,i]of Object.entries(n))Array.isArray(i)?i.forEach(s=>{e.push(encodeURIComponent(t)+"="+encodeURIComponent(s))}):e.push(encodeURIComponent(t)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class va{constructor(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=512/8,this.pad_[0]=128;for(let e=1;e<this.blockSize;++e)this.pad_[e]=0;this.reset()}reset(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0}compress_(e,t){t||(t=0);const i=this.W_;if(typeof e=="string")for(let d=0;d<16;d++)i[d]=e.charCodeAt(t)<<24|e.charCodeAt(t+1)<<16|e.charCodeAt(t+2)<<8|e.charCodeAt(t+3),t+=4;else for(let d=0;d<16;d++)i[d]=e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3],t+=4;for(let d=16;d<80;d++){const h=i[d-3]^i[d-8]^i[d-14]^i[d-16];i[d]=(h<<1|h>>>31)&4294967295}let s=this.chain_[0],r=this.chain_[1],o=this.chain_[2],a=this.chain_[3],l=this.chain_[4],c,u;for(let d=0;d<80;d++){d<40?d<20?(c=a^r&(o^a),u=1518500249):(c=r^o^a,u=1859775393):d<60?(c=r&o|a&(r|o),u=2400959708):(c=r^o^a,u=3395469782);const h=(s<<5|s>>>27)+c+l+u+i[d]&4294967295;l=a,a=o,o=(r<<30|r>>>2)&4294967295,r=s,s=h}this.chain_[0]=this.chain_[0]+s&4294967295,this.chain_[1]=this.chain_[1]+r&4294967295,this.chain_[2]=this.chain_[2]+o&4294967295,this.chain_[3]=this.chain_[3]+a&4294967295,this.chain_[4]=this.chain_[4]+l&4294967295}update(e,t){if(e==null)return;t===void 0&&(t=e.length);const i=t-this.blockSize;let s=0;const r=this.buf_;let o=this.inbuf_;for(;s<t;){if(o===0)for(;s<=i;)this.compress_(e,s),s+=this.blockSize;if(typeof e=="string"){for(;s<t;)if(r[o]=e.charCodeAt(s),++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}else for(;s<t;)if(r[o]=e[s],++o,++s,o===this.blockSize){this.compress_(r),o=0;break}}this.inbuf_=o,this.total_+=t}digest(){const e=[];let t=this.total_*8;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(let s=this.blockSize-1;s>=56;s--)this.buf_[s]=t&255,t/=256;this.compress_(this.buf_);let i=0;for(let s=0;s<5;s++)for(let r=24;r>=0;r-=8)e[i]=this.chain_[s]>>r&255,++i;return e}}function Ne(n,e){return`${n} failed: ${e} argument `}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ya=function(n){const e=[];let t=0;for(let i=0;i<n.length;i++){let s=n.charCodeAt(i);if(s>=55296&&s<=56319){const r=s-55296;i++,f(i<n.length,"Surrogate pair missing trail surrogate.");const o=n.charCodeAt(i)-56320;s=65536+(r<<10)+o}s<128?e[t++]=s:s<2048?(e[t++]=s>>6|192,e[t++]=s&63|128):s<65536?(e[t++]=s>>12|224,e[t++]=s>>6&63|128,e[t++]=s&63|128):(e[t++]=s>>18|240,e[t++]=s>>12&63|128,e[t++]=s>>6&63|128,e[t++]=s&63|128)}return e},an=function(n){let e=0;for(let t=0;t<n.length;t++){const i=n.charCodeAt(t);i<128?e++:i<2048?e+=2:i>=55296&&i<=56319?(e+=4,t++):e+=3}return e};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function j(n){return n&&n._delegate?n._delegate:n}class De{constructor(e,t,i){this.name=e,this.instanceFactory=t,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ke="[DEFAULT]";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zn{constructor(e,t){this.name=e,this.container=t,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){const t=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(t)){const i=new z;if(this.instancesDeferred.set(t,i),this.isInitialized(t)||this.shouldAutoInitialize())try{const s=this.getOrInitializeService({instanceIdentifier:t});s&&i.resolve(s)}catch{}}return this.instancesDeferred.get(t).promise}getImmediate(e){var t;const i=this.normalizeInstanceIdentifier(e==null?void 0:e.identifier),s=(t=e==null?void 0:e.optional)!==null&&t!==void 0?t:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(r){if(s)return null;throw r}else{if(s)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if(wa(e))try{this.getOrInitializeService({instanceIdentifier:ke})}catch{}for(const[t,i]of this.instancesDeferred.entries()){const s=this.normalizeInstanceIdentifier(t);try{const r=this.getOrInitializeService({instanceIdentifier:s});i.resolve(r)}catch{}}}}clearInstance(e=ke){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}async delete(){const e=Array.from(this.instances.values());await Promise.all([...e.filter(t=>"INTERNAL"in t).map(t=>t.INTERNAL.delete()),...e.filter(t=>"_delete"in t).map(t=>t._delete())])}isComponentSet(){return this.component!=null}isInitialized(e=ke){return this.instances.has(e)}getOptions(e=ke){return this.instancesOptions.get(e)||{}}initialize(e={}){const{options:t={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);const s=this.getOrInitializeService({instanceIdentifier:i,options:t});for(const[r,o]of this.instancesDeferred.entries()){const a=this.normalizeInstanceIdentifier(r);i===a&&o.resolve(s)}return s}onInit(e,t){var i;const s=this.normalizeInstanceIdentifier(t),r=(i=this.onInitCallbacks.get(s))!==null&&i!==void 0?i:new Set;r.add(e),this.onInitCallbacks.set(s,r);const o=this.instances.get(s);return o&&e(o,s),()=>{r.delete(e)}}invokeOnInitCallbacks(e,t){const i=this.onInitCallbacks.get(t);if(i)for(const s of i)try{s(e,t)}catch{}}getOrInitializeService({instanceIdentifier:e,options:t={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:ba(e),options:t}),this.instances.set(e,i),this.instancesOptions.set(e,t),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=ke){return this.component?this.component.multipleInstances?e:ke:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}}function ba(n){return n===ke?void 0:n}function wa(n){return n.instantiationMode==="EAGER"}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ar{constructor(e){this.name=e,this.providers=new Map}addComponent(e){const t=this.getProvider(e.name);if(t.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);t.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);const t=new zn(e,this);return this.providers.set(e,t),t}getProviders(){return Array.from(this.providers.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var k;(function(n){n[n.DEBUG=0]="DEBUG",n[n.VERBOSE=1]="VERBOSE",n[n.INFO=2]="INFO",n[n.WARN=3]="WARN",n[n.ERROR=4]="ERROR",n[n.SILENT=5]="SILENT"})(k||(k={}));const Ea={debug:k.DEBUG,verbose:k.VERBOSE,info:k.INFO,warn:k.WARN,error:k.ERROR,silent:k.SILENT},Ca=k.INFO,Ia={[k.DEBUG]:"log",[k.VERBOSE]:"log",[k.INFO]:"info",[k.WARN]:"warn",[k.ERROR]:"error"},Sa=(n,e,...t)=>{if(e<n.logLevel)return;const i=new Date().toISOString(),s=Ia[e];if(s)console[s](`[${i}]  ${n.name}:`,...t);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)};class lr{constructor(e){this.name=e,this._logLevel=Ca,this._logHandler=Sa,this._userLogHandler=null}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in k))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?Ea[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,k.DEBUG,...e),this._logHandler(this,k.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,k.VERBOSE,...e),this._logHandler(this,k.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,k.INFO,...e),this._logHandler(this,k.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,k.WARN,...e),this._logHandler(this,k.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,k.ERROR,...e),this._logHandler(this,k.ERROR,...e)}}const Ta=(n,e)=>e.some(t=>n instanceof t);let as,ls;function ka(){return as||(as=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function xa(){return ls||(ls=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}const cr=new WeakMap,Gn=new WeakMap,dr=new WeakMap,Rn=new WeakMap,gi=new WeakMap;function Aa(n){const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("success",r),n.removeEventListener("error",o)},r=()=>{t(me(n.result)),s()},o=()=>{i(n.error),s()};n.addEventListener("success",r),n.addEventListener("error",o)});return e.then(t=>{t instanceof IDBCursor&&cr.set(t,n)}).catch(()=>{}),gi.set(e,n),e}function Pa(n){if(Gn.has(n))return;const e=new Promise((t,i)=>{const s=()=>{n.removeEventListener("complete",r),n.removeEventListener("error",o),n.removeEventListener("abort",o)},r=()=>{t(),s()},o=()=>{i(n.error||new DOMException("AbortError","AbortError")),s()};n.addEventListener("complete",r),n.addEventListener("error",o),n.addEventListener("abort",o)});Gn.set(n,e)}let Kn={get(n,e,t){if(n instanceof IDBTransaction){if(e==="done")return Gn.get(n);if(e==="objectStoreNames")return n.objectStoreNames||dr.get(n);if(e==="store")return t.objectStoreNames[1]?void 0:t.objectStore(t.objectStoreNames[0])}return me(n[e])},set(n,e,t){return n[e]=t,!0},has(n,e){return n instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in n}};function Ra(n){Kn=n(Kn)}function Na(n){return n===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...t){const i=n.call(Nn(this),e,...t);return dr.set(i,e.sort?e.sort():[e]),me(i)}:xa().includes(n)?function(...e){return n.apply(Nn(this),e),me(cr.get(this))}:function(...e){return me(n.apply(Nn(this),e))}}function Da(n){return typeof n=="function"?Na(n):(n instanceof IDBTransaction&&Pa(n),Ta(n,ka())?new Proxy(n,Kn):n)}function me(n){if(n instanceof IDBRequest)return Aa(n);if(Rn.has(n))return Rn.get(n);const e=Da(n);return e!==n&&(Rn.set(n,e),gi.set(e,n)),e}const Nn=n=>gi.get(n);function Oa(n,e,{blocked:t,upgrade:i,blocking:s,terminated:r}={}){const o=indexedDB.open(n,e),a=me(o);return i&&o.addEventListener("upgradeneeded",l=>{i(me(o.result),l.oldVersion,l.newVersion,me(o.transaction),l)}),t&&o.addEventListener("blocked",l=>t(l.oldVersion,l.newVersion,l)),a.then(l=>{r&&l.addEventListener("close",()=>r()),s&&l.addEventListener("versionchange",c=>s(c.oldVersion,c.newVersion,c))}).catch(()=>{}),a}const Ma=["get","getKey","getAll","getAllKeys","count"],La=["put","add","delete","clear"],Dn=new Map;function cs(n,e){if(!(n instanceof IDBDatabase&&!(e in n)&&typeof e=="string"))return;if(Dn.get(e))return Dn.get(e);const t=e.replace(/FromIndex$/,""),i=e!==t,s=La.includes(t);if(!(t in(i?IDBIndex:IDBObjectStore).prototype)||!(s||Ma.includes(t)))return;const r=async function(o,...a){const l=this.transaction(o,s?"readwrite":"readonly");let c=l.store;return i&&(c=c.index(a.shift())),(await Promise.all([c[t](...a),s&&l.done]))[0]};return Dn.set(e,r),r}Ra(n=>({...n,get:(e,t,i)=>cs(e,t)||n.get(e,t,i),has:(e,t)=>!!cs(e,t)||n.has(e,t)}));/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $a{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(t=>{if(Fa(t)){const i=t.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(t=>t).join(" ")}}function Fa(n){const e=n.getComponent();return(e==null?void 0:e.type)==="VERSION"}const qn="@firebase/app",ds="0.10.13";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const de=new lr("@firebase/app"),Ba="@firebase/app-compat",Ua="@firebase/analytics-compat",Wa="@firebase/analytics",Ha="@firebase/app-check-compat",ja="@firebase/app-check",Va="@firebase/auth",za="@firebase/auth-compat",Ga="@firebase/database",Ka="@firebase/data-connect",qa="@firebase/database-compat",Qa="@firebase/functions",Ya="@firebase/functions-compat",Xa="@firebase/installations",Ja="@firebase/installations-compat",Za="@firebase/messaging",el="@firebase/messaging-compat",tl="@firebase/performance",nl="@firebase/performance-compat",il="@firebase/remote-config",sl="@firebase/remote-config-compat",rl="@firebase/storage",ol="@firebase/storage-compat",al="@firebase/firestore",ll="@firebase/vertexai-preview",cl="@firebase/firestore-compat",dl="firebase",ul="10.14.1";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Qn="[DEFAULT]",hl={[qn]:"fire-core",[Ba]:"fire-core-compat",[Wa]:"fire-analytics",[Ua]:"fire-analytics-compat",[ja]:"fire-app-check",[Ha]:"fire-app-check-compat",[Va]:"fire-auth",[za]:"fire-auth-compat",[Ga]:"fire-rtdb",[Ka]:"fire-data-connect",[qa]:"fire-rtdb-compat",[Qa]:"fire-fn",[Ya]:"fire-fn-compat",[Xa]:"fire-iid",[Ja]:"fire-iid-compat",[Za]:"fire-fcm",[el]:"fire-fcm-compat",[tl]:"fire-perf",[nl]:"fire-perf-compat",[il]:"fire-rc",[sl]:"fire-rc-compat",[rl]:"fire-gcs",[ol]:"fire-gcs-compat",[al]:"fire-fst",[cl]:"fire-fst-compat",[ll]:"fire-vertex","fire-js":"fire-js",[dl]:"fire-js-all"};/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Vt=new Map,fl=new Map,Yn=new Map;function us(n,e){try{n.container.addComponent(e)}catch(t){de.debug(`Component ${e.name} failed to register with FirebaseApp ${n.name}`,t)}}function zt(n){const e=n.name;if(Yn.has(e))return de.debug(`There were multiple attempts to register component ${e}.`),!1;Yn.set(e,n);for(const t of Vt.values())us(t,n);for(const t of fl.values())us(t,n);return!0}function pl(n,e){const t=n.container.getProvider("heartbeat").getImmediate({optional:!0});return t&&t.triggerHeartbeat(),n.container.getProvider(e)}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ml={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},_e=new rr("app","Firebase",ml);/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class _l{constructor(e,t,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},t),this._name=t.name,this._automaticDataCollectionEnabled=t.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new De("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw _e.create("app-deleted",{appName:this._name})}}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const gl=ul;function ur(n,e={}){let t=n;typeof e!="object"&&(e={name:e});const i=Object.assign({name:Qn,automaticDataCollectionEnabled:!1},e),s=i.name;if(typeof s!="string"||!s)throw _e.create("bad-app-name",{appName:String(s)});if(t||(t=ir()),!t)throw _e.create("no-options");const r=Vt.get(s);if(r){if(Vn(t,r.options)&&Vn(i,r.config))return r;throw _e.create("duplicate-app",{appName:s})}const o=new ar(s);for(const l of Yn.values())o.addComponent(l);const a=new _l(t,i,o);return Vt.set(s,a),a}function vl(n=Qn){const e=Vt.get(n);if(!e&&n===Qn&&ir())return ur();if(!e)throw _e.create("no-app",{appName:n});return e}function He(n,e,t){var i;let s=(i=hl[n])!==null&&i!==void 0?i:n;t&&(s+=`-${t}`);const r=s.match(/\s|\//),o=e.match(/\s|\//);if(r||o){const a=[`Unable to register library "${s}" with version "${e}":`];r&&a.push(`library name "${s}" contains illegal characters (whitespace or "/")`),r&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),de.warn(a.join(" "));return}zt(new De(`${s}-version`,()=>({library:s,version:e}),"VERSION"))}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const yl="firebase-heartbeat-database",bl=1,_t="firebase-heartbeat-store";let On=null;function hr(){return On||(On=Oa(yl,bl,{upgrade:(n,e)=>{switch(e){case 0:try{n.createObjectStore(_t)}catch(t){console.warn(t)}}}}).catch(n=>{throw _e.create("idb-open",{originalErrorMessage:n.message})})),On}async function wl(n){try{const t=(await hr()).transaction(_t),i=await t.objectStore(_t).get(fr(n));return await t.done,i}catch(e){if(e instanceof St)de.warn(e.message);else{const t=_e.create("idb-get",{originalErrorMessage:e==null?void 0:e.message});de.warn(t.message)}}}async function hs(n,e){try{const i=(await hr()).transaction(_t,"readwrite");await i.objectStore(_t).put(e,fr(n)),await i.done}catch(t){if(t instanceof St)de.warn(t.message);else{const i=_e.create("idb-set",{originalErrorMessage:t==null?void 0:t.message});de.warn(i.message)}}}function fr(n){return`${n.name}!${n.options.appId}`}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const El=1024,Cl=30*24*60*60*1e3;class Il{constructor(e){this.container=e,this._heartbeatsCache=null;const t=this.container.getProvider("app").getImmediate();this._storage=new Tl(t),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}async triggerHeartbeat(){var e,t;try{const s=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),r=fs();return((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=await this._heartbeatsCachePromise,((t=this._heartbeatsCache)===null||t===void 0?void 0:t.heartbeats)==null)||this._heartbeatsCache.lastSentHeartbeatDate===r||this._heartbeatsCache.heartbeats.some(o=>o.date===r)?void 0:(this._heartbeatsCache.heartbeats.push({date:r,agent:s}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{const a=new Date(o.date).valueOf();return Date.now()-a<=Cl}),this._storage.overwrite(this._heartbeatsCache))}catch(i){de.warn(i)}}async getHeartbeatsHeader(){var e;try{if(this._heartbeatsCache===null&&await this._heartbeatsCachePromise,((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";const t=fs(),{heartbeatsToSend:i,unsentEntries:s}=Sl(this._heartbeatsCache.heartbeats),r=Ht(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=t,s.length>0?(this._heartbeatsCache.heartbeats=s,await this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),r}catch(t){return de.warn(t),""}}}function fs(){return new Date().toISOString().substring(0,10)}function Sl(n,e=El){const t=[];let i=n.slice();for(const s of n){const r=t.find(o=>o.agent===s.agent);if(r){if(r.dates.push(s.date),ps(t)>e){r.dates.pop();break}}else if(t.push({agent:s.agent,dates:[s.date]}),ps(t)>e){t.pop();break}i=i.slice(1)}return{heartbeatsToSend:t,unsentEntries:i}}class Tl{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}async runIndexedDBEnvironmentCheck(){return da()?ua().then(()=>!0).catch(()=>!1):!1}async read(){if(await this._canUseIndexedDBPromise){const t=await wl(this.app);return t!=null&&t.heartbeats?t:{heartbeats:[]}}else return{heartbeats:[]}}async overwrite(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return hs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return}async add(e){var t;if(await this._canUseIndexedDBPromise){const s=await this.read();return hs(this.app,{lastSentHeartbeatDate:(t=e.lastSentHeartbeatDate)!==null&&t!==void 0?t:s.lastSentHeartbeatDate,heartbeats:[...s.heartbeats,...e.heartbeats]})}else return}}function ps(n){return Ht(JSON.stringify({version:2,heartbeats:n})).length}/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function kl(n){zt(new De("platform-logger",e=>new $a(e),"PRIVATE")),zt(new De("heartbeat",e=>new Il(e),"PRIVATE")),He(qn,ds,n),He(qn,ds,"esm2017"),He("fire-js","")}kl("");var xl="firebase",Al="10.14.1";/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */He(xl,Al,"app");var ms={};const _s="@firebase/database",gs="1.0.8";/**
 * @license
 * Copyright 2019 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let pr="";function vi(n){pr=n}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pl{constructor(e){this.domStorage_=e,this.prefix_="firebase:"}set(e,t){t==null?this.domStorage_.removeItem(this.prefixedName_(e)):this.domStorage_.setItem(this.prefixedName_(e),O(t))}get(e){const t=this.domStorage_.getItem(this.prefixedName_(e));return t==null?null:mt(t)}remove(e){this.domStorage_.removeItem(this.prefixedName_(e))}prefixedName_(e){return this.prefix_+e}toString(){return this.domStorage_.toString()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Rl{constructor(){this.cache_={},this.isInMemoryStorage=!0}set(e,t){t==null?delete this.cache_[e]:this.cache_[e]=t}get(e){return se(this.cache_,e)?this.cache_[e]:null}remove(e){delete this.cache_[e]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const mr=function(n){try{if(typeof window<"u"&&typeof window[n]<"u"){const e=window[n];return e.setItem("firebase:sentinel","cache"),e.removeItem("firebase:sentinel"),new Pl(e)}}catch{}return new Rl},Ae=mr("localStorage"),Xn=mr("sessionStorage");/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const je=new lr("@firebase/database"),_r=function(){let n=1;return function(){return n++}}(),gr=function(n){const e=ya(n),t=new va;t.update(e);const i=t.digest();return _i.encodeByteArray(i)},Tt=function(...n){let e="";for(let t=0;t<n.length;t++){const i=n[t];Array.isArray(i)||i&&typeof i=="object"&&typeof i.length=="number"?e+=Tt.apply(null,i):typeof i=="object"?e+=O(i):e+=i,e+=" "}return e};let Pe=null,vs=!0;const vr=function(n,e){f(!e||n===!0||n===!1,"Can't turn on custom loggers persistently."),n===!0?(je.logLevel=k.VERBOSE,Pe=je.log.bind(je),e&&Xn.set("logging_enabled",!0)):typeof n=="function"?Pe=n:(Pe=null,Xn.remove("logging_enabled"))},$=function(...n){if(vs===!0&&(vs=!1,Pe===null&&Xn.get("logging_enabled")===!0&&vr(!0)),Pe){const e=Tt.apply(null,n);Pe(e)}},kt=function(n){return function(...e){$(n,...e)}},Jn=function(...n){const e="FIREBASE INTERNAL ERROR: "+Tt(...n);je.error(e)},oe=function(...n){const e=`FIREBASE FATAL ERROR: ${Tt(...n)}`;throw je.error(e),new Error(e)},U=function(...n){const e="FIREBASE WARNING: "+Tt(...n);je.warn(e)},Nl=function(){typeof window<"u"&&window.location&&window.location.protocol&&window.location.protocol.indexOf("https:")!==-1&&U("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().")},ln=function(n){return typeof n=="number"&&(n!==n||n===Number.POSITIVE_INFINITY||n===Number.NEGATIVE_INFINITY)},Dl=function(n){if(document.readyState==="complete")n();else{let e=!1;const t=function(){if(!document.body){setTimeout(t,Math.floor(10));return}e||(e=!0,n())};document.addEventListener?(document.addEventListener("DOMContentLoaded",t,!1),window.addEventListener("load",t,!1)):document.attachEvent&&(document.attachEvent("onreadystatechange",()=>{document.readyState==="complete"&&t()}),window.attachEvent("onload",t))}},ye="[MIN_NAME]",ue="[MAX_NAME]",$e=function(n,e){if(n===e)return 0;if(n===ye||e===ue)return-1;if(e===ye||n===ue)return 1;{const t=ys(n),i=ys(e);return t!==null?i!==null?t-i===0?n.length-e.length:t-i:-1:i!==null?1:n<e?-1:1}},Ol=function(n,e){return n===e?0:n<e?-1:1},ot=function(n,e){if(e&&n in e)return e[n];throw new Error("Missing required key ("+n+") in object: "+O(e))},yi=function(n){if(typeof n!="object"||n===null)return O(n);const e=[];for(const i in n)e.push(i);e.sort();let t="{";for(let i=0;i<e.length;i++)i!==0&&(t+=","),t+=O(e[i]),t+=":",t+=yi(n[e[i]]);return t+="}",t},yr=function(n,e){const t=n.length;if(t<=e)return[n];const i=[];for(let s=0;s<t;s+=e)s+e>t?i.push(n.substring(s,t)):i.push(n.substring(s,s+e));return i};function F(n,e){for(const t in n)n.hasOwnProperty(t)&&e(t,n[t])}const br=function(n){f(!ln(n),"Invalid JSON number");const e=11,t=52,i=(1<<e-1)-1;let s,r,o,a,l;n===0?(r=0,o=0,s=1/n===-1/0?1:0):(s=n<0,n=Math.abs(n),n>=Math.pow(2,1-i)?(a=Math.min(Math.floor(Math.log(n)/Math.LN2),i),r=a+i,o=Math.round(n*Math.pow(2,t-a)-Math.pow(2,t))):(r=0,o=Math.round(n/Math.pow(2,1-i-t))));const c=[];for(l=t;l;l-=1)c.push(o%2?1:0),o=Math.floor(o/2);for(l=e;l;l-=1)c.push(r%2?1:0),r=Math.floor(r/2);c.push(s?1:0),c.reverse();const u=c.join("");let d="";for(l=0;l<64;l+=8){let h=parseInt(u.substr(l,8),2).toString(16);h.length===1&&(h="0"+h),d=d+h}return d.toLowerCase()},Ml=function(){return!!(typeof window=="object"&&window.chrome&&window.chrome.extension&&!/^chrome/.test(window.location.href))},Ll=function(){return typeof Windows=="object"&&typeof Windows.UI=="object"};function $l(n,e){let t="Unknown Error";n==="too_big"?t="The data requested exceeds the maximum size that can be accessed with a single request.":n==="permission_denied"?t="Client doesn't have permission to access the desired data.":n==="unavailable"&&(t="The service is unavailable");const i=new Error(n+" at "+e._path.toString()+": "+t);return i.code=n.toUpperCase(),i}const Fl=new RegExp("^-?(0*)\\d{1,10}$"),Bl=-2147483648,Ul=2147483647,ys=function(n){if(Fl.test(n)){const e=Number(n);if(e>=Bl&&e<=Ul)return e}return null},Ze=function(n){try{n()}catch(e){setTimeout(()=>{const t=e.stack||"";throw U("Exception was thrown by user callback.",t),e},Math.floor(0))}},Wl=function(){return(typeof window=="object"&&window.navigator&&window.navigator.userAgent||"").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i)>=0},dt=function(n,e){const t=setTimeout(n,e);return typeof t=="number"&&typeof Deno<"u"&&Deno.unrefTimer?Deno.unrefTimer(t):typeof t=="object"&&t.unref&&t.unref(),t};/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hl{constructor(e,t){this.appName_=e,this.appCheckProvider=t,this.appCheck=t==null?void 0:t.getImmediate({optional:!0}),this.appCheck||t==null||t.get().then(i=>this.appCheck=i)}getToken(e){return this.appCheck?this.appCheck.getToken(e):new Promise((t,i)=>{setTimeout(()=>{this.appCheck?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){var t;(t=this.appCheckProvider)===null||t===void 0||t.get().then(i=>i.addTokenListener(e))}notifyForInvalidToken(){U(`Provided AppCheck credentials for the app named "${this.appName_}" are invalid. This usually indicates your app was not initialized correctly.`)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class jl{constructor(e,t,i){this.appName_=e,this.firebaseOptions_=t,this.authProvider_=i,this.auth_=null,this.auth_=i.getImmediate({optional:!0}),this.auth_||i.onInit(s=>this.auth_=s)}getToken(e){return this.auth_?this.auth_.getToken(e).catch(t=>t&&t.code==="auth/token-not-initialized"?($("Got auth/token-not-initialized error.  Treating as null token."),null):Promise.reject(t)):new Promise((t,i)=>{setTimeout(()=>{this.auth_?this.getToken(e).then(t,i):t(null)},0)})}addTokenChangeListener(e){this.auth_?this.auth_.addAuthTokenListener(e):this.authProvider_.get().then(t=>t.addAuthTokenListener(e))}removeTokenChangeListener(e){this.authProvider_.get().then(t=>t.removeAuthTokenListener(e))}notifyForInvalidToken(){let e='Provided authentication credentials for the app named "'+this.appName_+'" are invalid. This usually indicates your app was not initialized correctly. ';"credential"in this.firebaseOptions_?e+='Make sure the "credential" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':"serviceAccount"in this.firebaseOptions_?e+='Make sure the "serviceAccount" property provided to initializeApp() is authorized to access the specified "databaseURL" and is from the correct project.':e+='Make sure the "apiKey" and "databaseURL" properties provided to initializeApp() match the values provided for your app at https://console.firebase.google.com/.',U(e)}}class Ve{constructor(e){this.accessToken=e}getToken(e){return Promise.resolve({accessToken:this.accessToken})}addTokenChangeListener(e){e(this.accessToken)}removeTokenChangeListener(e){}notifyForInvalidToken(){}}Ve.OWNER="owner";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bi="5",wr="v",Er="s",Cr="r",Ir="f",Sr=/(console\.firebase|firebase-console-\w+\.corp|firebase\.corp)\.google\.com/,Tr="ls",kr="p",Zn="ac",xr="websocket",Ar="long_polling";/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Pr{constructor(e,t,i,s,r=!1,o="",a=!1,l=!1){this.secure=t,this.namespace=i,this.webSocketOnly=s,this.nodeAdmin=r,this.persistenceKey=o,this.includeNamespaceInQueryParams=a,this.isUsingEmulator=l,this._host=e.toLowerCase(),this._domain=this._host.substr(this._host.indexOf(".")+1),this.internalHost=Ae.get("host:"+e)||this._host}isCacheableHost(){return this.internalHost.substr(0,2)==="s-"}isCustomHost(){return this._domain!=="firebaseio.com"&&this._domain!=="firebaseio-demo.com"}get host(){return this._host}set host(e){e!==this.internalHost&&(this.internalHost=e,this.isCacheableHost()&&Ae.set("host:"+this._host,this.internalHost))}toString(){let e=this.toURLString();return this.persistenceKey&&(e+="<"+this.persistenceKey+">"),e}toURLString(){const e=this.secure?"https://":"http://",t=this.includeNamespaceInQueryParams?`?ns=${this.namespace}`:"";return`${e}${this.host}/${t}`}}function Vl(n){return n.host!==n.internalHost||n.isCustomHost()||n.includeNamespaceInQueryParams}function Rr(n,e,t){f(typeof e=="string","typeof type must == string"),f(typeof t=="object","typeof params must == object");let i;if(e===xr)i=(n.secure?"wss://":"ws://")+n.internalHost+"/.ws?";else if(e===Ar)i=(n.secure?"https://":"http://")+n.internalHost+"/.lp?";else throw new Error("Unknown connection type: "+e);Vl(n)&&(t.ns=n.namespace);const s=[];return F(t,(r,o)=>{s.push(r+"="+o)}),i+s.join("&")}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zl{constructor(){this.counters_={}}incrementCounter(e,t=1){se(this.counters_,e)||(this.counters_[e]=0),this.counters_[e]+=t}get(){return Jo(this.counters_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Mn={},Ln={};function wi(n){const e=n.toString();return Mn[e]||(Mn[e]=new zl),Mn[e]}function Gl(n,e){const t=n.toString();return Ln[t]||(Ln[t]=e()),Ln[t]}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kl{constructor(e){this.onMessage_=e,this.pendingResponses=[],this.currentResponseNum=0,this.closeAfterResponse=-1,this.onClose=null}closeAfter(e,t){this.closeAfterResponse=e,this.onClose=t,this.closeAfterResponse<this.currentResponseNum&&(this.onClose(),this.onClose=null)}handleResponse(e,t){for(this.pendingResponses[e]=t;this.pendingResponses[this.currentResponseNum];){const i=this.pendingResponses[this.currentResponseNum];delete this.pendingResponses[this.currentResponseNum];for(let s=0;s<i.length;++s)i[s]&&Ze(()=>{this.onMessage_(i[s])});if(this.currentResponseNum===this.closeAfterResponse){this.onClose&&(this.onClose(),this.onClose=null);break}this.currentResponseNum++}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bs="start",ql="close",Ql="pLPCommand",Yl="pRTLPCB",Nr="id",Dr="pw",Or="ser",Xl="cb",Jl="seg",Zl="ts",ec="d",tc="dframe",Mr=1870,Lr=30,nc=Mr-Lr,ic=25e3,sc=3e4;class fe{constructor(e,t,i,s,r,o,a){this.connId=e,this.repoInfo=t,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.transportSessionId=o,this.lastSessionId=a,this.bytesSent=0,this.bytesReceived=0,this.everConnected_=!1,this.log_=kt(e),this.stats_=wi(t),this.urlFn=l=>(this.appCheckToken&&(l[Zn]=this.appCheckToken),Rr(t,Ar,l))}open(e,t){this.curSegmentNum=0,this.onDisconnect_=t,this.myPacketOrderer=new Kl(e),this.isClosed_=!1,this.connectTimeoutTimer_=setTimeout(()=>{this.log_("Timed out trying to connect."),this.onClosed_(),this.connectTimeoutTimer_=null},Math.floor(sc)),Dl(()=>{if(this.isClosed_)return;this.scriptTagHolder=new Ei((...r)=>{const[o,a,l,c,u]=r;if(this.incrementIncomingBytes_(r),!!this.scriptTagHolder)if(this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null),this.everConnected_=!0,o===bs)this.id=a,this.password=l;else if(o===ql)a?(this.scriptTagHolder.sendNewPolls=!1,this.myPacketOrderer.closeAfter(a,()=>{this.onClosed_()})):this.onClosed_();else throw new Error("Unrecognized command received: "+o)},(...r)=>{const[o,a]=r;this.incrementIncomingBytes_(r),this.myPacketOrderer.handleResponse(o,a)},()=>{this.onClosed_()},this.urlFn);const i={};i[bs]="t",i[Or]=Math.floor(Math.random()*1e8),this.scriptTagHolder.uniqueCallbackIdentifier&&(i[Xl]=this.scriptTagHolder.uniqueCallbackIdentifier),i[wr]=bi,this.transportSessionId&&(i[Er]=this.transportSessionId),this.lastSessionId&&(i[Tr]=this.lastSessionId),this.applicationId&&(i[kr]=this.applicationId),this.appCheckToken&&(i[Zn]=this.appCheckToken),typeof location<"u"&&location.hostname&&Sr.test(location.hostname)&&(i[Cr]=Ir);const s=this.urlFn(i);this.log_("Connecting via long-poll to "+s),this.scriptTagHolder.addTag(s,()=>{})})}start(){this.scriptTagHolder.startLongPoll(this.id,this.password),this.addDisconnectPingFrame(this.id,this.password)}static forceAllow(){fe.forceAllow_=!0}static forceDisallow(){fe.forceDisallow_=!0}static isAvailable(){return fe.forceAllow_?!0:!fe.forceDisallow_&&typeof document<"u"&&document.createElement!=null&&!Ml()&&!Ll()}markConnectionHealthy(){}shutdown_(){this.isClosed_=!0,this.scriptTagHolder&&(this.scriptTagHolder.close(),this.scriptTagHolder=null),this.myDisconnFrame&&(document.body.removeChild(this.myDisconnFrame),this.myDisconnFrame=null),this.connectTimeoutTimer_&&(clearTimeout(this.connectTimeoutTimer_),this.connectTimeoutTimer_=null)}onClosed_(){this.isClosed_||(this.log_("Longpoll is closing itself"),this.shutdown_(),this.onDisconnect_&&(this.onDisconnect_(this.everConnected_),this.onDisconnect_=null))}close(){this.isClosed_||(this.log_("Longpoll is being closed."),this.shutdown_())}send(e){const t=O(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=er(t),s=yr(i,nc);for(let r=0;r<s.length;r++)this.scriptTagHolder.enqueueSegment(this.curSegmentNum,s.length,s[r]),this.curSegmentNum++}addDisconnectPingFrame(e,t){this.myDisconnFrame=document.createElement("iframe");const i={};i[tc]="t",i[Nr]=e,i[Dr]=t,this.myDisconnFrame.src=this.urlFn(i),this.myDisconnFrame.style.display="none",document.body.appendChild(this.myDisconnFrame)}incrementIncomingBytes_(e){const t=O(e).length;this.bytesReceived+=t,this.stats_.incrementCounter("bytes_received",t)}}class Ei{constructor(e,t,i,s){this.onDisconnect=i,this.urlFn=s,this.outstandingRequests=new Set,this.pendingSegs=[],this.currentSerial=Math.floor(Math.random()*1e8),this.sendNewPolls=!0;{this.uniqueCallbackIdentifier=_r(),window[Ql+this.uniqueCallbackIdentifier]=e,window[Yl+this.uniqueCallbackIdentifier]=t,this.myIFrame=Ei.createIFrame_();let r="";this.myIFrame.src&&this.myIFrame.src.substr(0,11)==="javascript:"&&(r='<script>document.domain="'+document.domain+'";<\/script>');const o="<html><body>"+r+"</body></html>";try{this.myIFrame.doc.open(),this.myIFrame.doc.write(o),this.myIFrame.doc.close()}catch(a){$("frame writing exception"),a.stack&&$(a.stack),$(a)}}}static createIFrame_(){const e=document.createElement("iframe");if(e.style.display="none",document.body){document.body.appendChild(e);try{e.contentWindow.document||$("No IE domain setting required")}catch{const i=document.domain;e.src="javascript:void((function(){document.open();document.domain='"+i+"';document.close();})())"}}else throw"Document body has not initialized. Wait to initialize Firebase until after the document is ready.";return e.contentDocument?e.doc=e.contentDocument:e.contentWindow?e.doc=e.contentWindow.document:e.document&&(e.doc=e.document),e}close(){this.alive=!1,this.myIFrame&&(this.myIFrame.doc.body.textContent="",setTimeout(()=>{this.myIFrame!==null&&(document.body.removeChild(this.myIFrame),this.myIFrame=null)},Math.floor(0)));const e=this.onDisconnect;e&&(this.onDisconnect=null,e())}startLongPoll(e,t){for(this.myID=e,this.myPW=t,this.alive=!0;this.newRequest_(););}newRequest_(){if(this.alive&&this.sendNewPolls&&this.outstandingRequests.size<(this.pendingSegs.length>0?2:1)){this.currentSerial++;const e={};e[Nr]=this.myID,e[Dr]=this.myPW,e[Or]=this.currentSerial;let t=this.urlFn(e),i="",s=0;for(;this.pendingSegs.length>0&&this.pendingSegs[0].d.length+Lr+i.length<=Mr;){const o=this.pendingSegs.shift();i=i+"&"+Jl+s+"="+o.seg+"&"+Zl+s+"="+o.ts+"&"+ec+s+"="+o.d,s++}return t=t+i,this.addLongPollTag_(t,this.currentSerial),!0}else return!1}enqueueSegment(e,t,i){this.pendingSegs.push({seg:e,ts:t,d:i}),this.alive&&this.newRequest_()}addLongPollTag_(e,t){this.outstandingRequests.add(t);const i=()=>{this.outstandingRequests.delete(t),this.newRequest_()},s=setTimeout(i,Math.floor(ic)),r=()=>{clearTimeout(s),i()};this.addTag(e,r)}addTag(e,t){setTimeout(()=>{try{if(!this.sendNewPolls)return;const i=this.myIFrame.doc.createElement("script");i.type="text/javascript",i.async=!0,i.src=e,i.onload=i.onreadystatechange=function(){const s=i.readyState;(!s||s==="loaded"||s==="complete")&&(i.onload=i.onreadystatechange=null,i.parentNode&&i.parentNode.removeChild(i),t())},i.onerror=()=>{$("Long-poll script failed to load: "+e),this.sendNewPolls=!1,this.close()},this.myIFrame.doc.body.appendChild(i)}catch{}},Math.floor(1))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const rc=16384,oc=45e3;let Gt=null;typeof MozWebSocket<"u"?Gt=MozWebSocket:typeof WebSocket<"u"&&(Gt=WebSocket);class q{constructor(e,t,i,s,r,o,a){this.connId=e,this.applicationId=i,this.appCheckToken=s,this.authToken=r,this.keepaliveTimer=null,this.frames=null,this.totalFrames=0,this.bytesSent=0,this.bytesReceived=0,this.log_=kt(this.connId),this.stats_=wi(t),this.connURL=q.connectionURL_(t,o,a,s,i),this.nodeAdmin=t.nodeAdmin}static connectionURL_(e,t,i,s,r){const o={};return o[wr]=bi,typeof location<"u"&&location.hostname&&Sr.test(location.hostname)&&(o[Cr]=Ir),t&&(o[Er]=t),i&&(o[Tr]=i),s&&(o[Zn]=s),r&&(o[kr]=r),Rr(e,xr,o)}open(e,t){this.onDisconnect=t,this.onMessage=e,this.log_("Websocket connecting to "+this.connURL),this.everConnected_=!1,Ae.set("previous_websocket_failure",!0);try{let i;ca(),this.mySock=new Gt(this.connURL,[],i)}catch(i){this.log_("Error instantiating WebSocket.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_();return}this.mySock.onopen=()=>{this.log_("Websocket connected."),this.everConnected_=!0},this.mySock.onclose=()=>{this.log_("Websocket connection was disconnected."),this.mySock=null,this.onClosed_()},this.mySock.onmessage=i=>{this.handleIncomingFrame(i)},this.mySock.onerror=i=>{this.log_("WebSocket error.  Closing connection.");const s=i.message||i.data;s&&this.log_(s),this.onClosed_()}}start(){}static forceDisallow(){q.forceDisallow_=!0}static isAvailable(){let e=!1;if(typeof navigator<"u"&&navigator.userAgent){const t=/Android ([0-9]{0,}\.[0-9]{0,})/,i=navigator.userAgent.match(t);i&&i.length>1&&parseFloat(i[1])<4.4&&(e=!0)}return!e&&Gt!==null&&!q.forceDisallow_}static previouslyFailed(){return Ae.isInMemoryStorage||Ae.get("previous_websocket_failure")===!0}markConnectionHealthy(){Ae.remove("previous_websocket_failure")}appendFrame_(e){if(this.frames.push(e),this.frames.length===this.totalFrames){const t=this.frames.join("");this.frames=null;const i=mt(t);this.onMessage(i)}}handleNewFrameCount_(e){this.totalFrames=e,this.frames=[]}extractFrameCount_(e){if(f(this.frames===null,"We already have a frame buffer"),e.length<=6){const t=Number(e);if(!isNaN(t))return this.handleNewFrameCount_(t),null}return this.handleNewFrameCount_(1),e}handleIncomingFrame(e){if(this.mySock===null)return;const t=e.data;if(this.bytesReceived+=t.length,this.stats_.incrementCounter("bytes_received",t.length),this.resetKeepAlive(),this.frames!==null)this.appendFrame_(t);else{const i=this.extractFrameCount_(t);i!==null&&this.appendFrame_(i)}}send(e){this.resetKeepAlive();const t=O(e);this.bytesSent+=t.length,this.stats_.incrementCounter("bytes_sent",t.length);const i=yr(t,rc);i.length>1&&this.sendString_(String(i.length));for(let s=0;s<i.length;s++)this.sendString_(i[s])}shutdown_(){this.isClosed_=!0,this.keepaliveTimer&&(clearInterval(this.keepaliveTimer),this.keepaliveTimer=null),this.mySock&&(this.mySock.close(),this.mySock=null)}onClosed_(){this.isClosed_||(this.log_("WebSocket is closing itself"),this.shutdown_(),this.onDisconnect&&(this.onDisconnect(this.everConnected_),this.onDisconnect=null))}close(){this.isClosed_||(this.log_("WebSocket is being closed"),this.shutdown_())}resetKeepAlive(){clearInterval(this.keepaliveTimer),this.keepaliveTimer=setInterval(()=>{this.mySock&&this.sendString_("0"),this.resetKeepAlive()},Math.floor(oc))}sendString_(e){try{this.mySock.send(e)}catch(t){this.log_("Exception thrown from WebSocket.send():",t.message||t.data,"Closing connection."),setTimeout(this.onClosed_.bind(this),0)}}}q.responsesRequiredToBeHealthy=2;q.healthyTimeout=3e4;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ge{constructor(e){this.initTransports_(e)}static get ALL_TRANSPORTS(){return[fe,q]}static get IS_TRANSPORT_INITIALIZED(){return this.globalTransportInitialized_}initTransports_(e){const t=q&&q.isAvailable();let i=t&&!q.previouslyFailed();if(e.webSocketOnly&&(t||U("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."),i=!0),i)this.transports_=[q];else{const s=this.transports_=[];for(const r of Ge.ALL_TRANSPORTS)r&&r.isAvailable()&&s.push(r);Ge.globalTransportInitialized_=!0}}initialTransport(){if(this.transports_.length>0)return this.transports_[0];throw new Error("No transports available")}upgradeTransport(){return this.transports_.length>1?this.transports_[1]:null}}Ge.globalTransportInitialized_=!1;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ac=6e4,lc=5e3,cc=10*1024,dc=100*1024,$n="t",ws="d",uc="s",Es="r",hc="e",Cs="o",Is="a",Ss="n",Ts="p",fc="h";class pc{constructor(e,t,i,s,r,o,a,l,c,u){this.id=e,this.repoInfo_=t,this.applicationId_=i,this.appCheckToken_=s,this.authToken_=r,this.onMessage_=o,this.onReady_=a,this.onDisconnect_=l,this.onKill_=c,this.lastSessionId=u,this.connectionCount=0,this.pendingDataMessages=[],this.state_=0,this.log_=kt("c:"+this.id+":"),this.transportManager_=new Ge(t),this.log_("Connection created"),this.start_()}start_(){const e=this.transportManager_.initialTransport();this.conn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,null,this.lastSessionId),this.primaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.conn_),i=this.disconnReceiver_(this.conn_);this.tx_=this.conn_,this.rx_=this.conn_,this.secondaryConn_=null,this.isHealthy_=!1,setTimeout(()=>{this.conn_&&this.conn_.open(t,i)},Math.floor(0));const s=e.healthyTimeout||0;s>0&&(this.healthyTimeout_=dt(()=>{this.healthyTimeout_=null,this.isHealthy_||(this.conn_&&this.conn_.bytesReceived>dc?(this.log_("Connection exceeded healthy timeout but has received "+this.conn_.bytesReceived+" bytes.  Marking connection healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()):this.conn_&&this.conn_.bytesSent>cc?this.log_("Connection exceeded healthy timeout but has sent "+this.conn_.bytesSent+" bytes.  Leaving connection alive."):(this.log_("Closing unhealthy connection after timeout."),this.close()))},Math.floor(s)))}nextTransportId_(){return"c:"+this.id+":"+this.connectionCount++}disconnReceiver_(e){return t=>{e===this.conn_?this.onConnectionLost_(t):e===this.secondaryConn_?(this.log_("Secondary connection lost."),this.onSecondaryConnectionLost_()):this.log_("closing an old connection")}}connReceiver_(e){return t=>{this.state_!==2&&(e===this.rx_?this.onPrimaryMessageReceived_(t):e===this.secondaryConn_?this.onSecondaryMessageReceived_(t):this.log_("message on old connection"))}}sendRequest(e){const t={t:"d",d:e};this.sendData_(t)}tryCleanupConnection(){this.tx_===this.secondaryConn_&&this.rx_===this.secondaryConn_&&(this.log_("cleaning up and promoting a connection: "+this.secondaryConn_.connId),this.conn_=this.secondaryConn_,this.secondaryConn_=null)}onSecondaryControl_(e){if($n in e){const t=e[$n];t===Is?this.upgradeIfSecondaryHealthy_():t===Es?(this.log_("Got a reset on secondary, closing it"),this.secondaryConn_.close(),(this.tx_===this.secondaryConn_||this.rx_===this.secondaryConn_)&&this.close()):t===Cs&&(this.log_("got pong on secondary."),this.secondaryResponsesRequired_--,this.upgradeIfSecondaryHealthy_())}}onSecondaryMessageReceived_(e){const t=ot("t",e),i=ot("d",e);if(t==="c")this.onSecondaryControl_(i);else if(t==="d")this.pendingDataMessages.push(i);else throw new Error("Unknown protocol layer: "+t)}upgradeIfSecondaryHealthy_(){this.secondaryResponsesRequired_<=0?(this.log_("Secondary connection is healthy."),this.isHealthy_=!0,this.secondaryConn_.markConnectionHealthy(),this.proceedWithUpgrade_()):(this.log_("sending ping on secondary."),this.secondaryConn_.send({t:"c",d:{t:Ts,d:{}}}))}proceedWithUpgrade_(){this.secondaryConn_.start(),this.log_("sending client ack on secondary"),this.secondaryConn_.send({t:"c",d:{t:Is,d:{}}}),this.log_("Ending transmission on primary"),this.conn_.send({t:"c",d:{t:Ss,d:{}}}),this.tx_=this.secondaryConn_,this.tryCleanupConnection()}onPrimaryMessageReceived_(e){const t=ot("t",e),i=ot("d",e);t==="c"?this.onControl_(i):t==="d"&&this.onDataMessage_(i)}onDataMessage_(e){this.onPrimaryResponse_(),this.onMessage_(e)}onPrimaryResponse_(){this.isHealthy_||(this.primaryResponsesRequired_--,this.primaryResponsesRequired_<=0&&(this.log_("Primary connection is healthy."),this.isHealthy_=!0,this.conn_.markConnectionHealthy()))}onControl_(e){const t=ot($n,e);if(ws in e){const i=e[ws];if(t===fc){const s=Object.assign({},i);this.repoInfo_.isUsingEmulator&&(s.h=this.repoInfo_.host),this.onHandshake_(s)}else if(t===Ss){this.log_("recvd end transmission on primary"),this.rx_=this.secondaryConn_;for(let s=0;s<this.pendingDataMessages.length;++s)this.onDataMessage_(this.pendingDataMessages[s]);this.pendingDataMessages=[],this.tryCleanupConnection()}else t===uc?this.onConnectionShutdown_(i):t===Es?this.onReset_(i):t===hc?Jn("Server Error: "+i):t===Cs?(this.log_("got pong on primary."),this.onPrimaryResponse_(),this.sendPingOnPrimaryIfNecessary_()):Jn("Unknown control packet command: "+t)}}onHandshake_(e){const t=e.ts,i=e.v,s=e.h;this.sessionId=e.s,this.repoInfo_.host=s,this.state_===0&&(this.conn_.start(),this.onConnectionEstablished_(this.conn_,t),bi!==i&&U("Protocol version mismatch detected"),this.tryStartUpgrade_())}tryStartUpgrade_(){const e=this.transportManager_.upgradeTransport();e&&this.startUpgrade_(e)}startUpgrade_(e){this.secondaryConn_=new e(this.nextTransportId_(),this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,this.sessionId),this.secondaryResponsesRequired_=e.responsesRequiredToBeHealthy||0;const t=this.connReceiver_(this.secondaryConn_),i=this.disconnReceiver_(this.secondaryConn_);this.secondaryConn_.open(t,i),dt(()=>{this.secondaryConn_&&(this.log_("Timed out trying to upgrade."),this.secondaryConn_.close())},Math.floor(ac))}onReset_(e){this.log_("Reset packet received.  New host: "+e),this.repoInfo_.host=e,this.state_===1?this.close():(this.closeConnections_(),this.start_())}onConnectionEstablished_(e,t){this.log_("Realtime connection established."),this.conn_=e,this.state_=1,this.onReady_&&(this.onReady_(t,this.sessionId),this.onReady_=null),this.primaryResponsesRequired_===0?(this.log_("Primary connection is healthy."),this.isHealthy_=!0):dt(()=>{this.sendPingOnPrimaryIfNecessary_()},Math.floor(lc))}sendPingOnPrimaryIfNecessary_(){!this.isHealthy_&&this.state_===1&&(this.log_("sending ping on primary."),this.sendData_({t:"c",d:{t:Ts,d:{}}}))}onSecondaryConnectionLost_(){const e=this.secondaryConn_;this.secondaryConn_=null,(this.tx_===e||this.rx_===e)&&this.close()}onConnectionLost_(e){this.conn_=null,!e&&this.state_===0?(this.log_("Realtime connection failed."),this.repoInfo_.isCacheableHost()&&(Ae.remove("host:"+this.repoInfo_.host),this.repoInfo_.internalHost=this.repoInfo_.host)):this.state_===1&&this.log_("Realtime connection lost."),this.close()}onConnectionShutdown_(e){this.log_("Connection shutdown command received. Shutting down..."),this.onKill_&&(this.onKill_(e),this.onKill_=null),this.onDisconnect_=null,this.close()}sendData_(e){if(this.state_!==1)throw"Connection is not connected";this.tx_.send(e)}close(){this.state_!==2&&(this.log_("Closing realtime connection."),this.state_=2,this.closeConnections_(),this.onDisconnect_&&(this.onDisconnect_(),this.onDisconnect_=null))}closeConnections_(){this.log_("Shutting down all connections"),this.conn_&&(this.conn_.close(),this.conn_=null),this.secondaryConn_&&(this.secondaryConn_.close(),this.secondaryConn_=null),this.healthyTimeout_&&(clearTimeout(this.healthyTimeout_),this.healthyTimeout_=null)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $r{put(e,t,i,s){}merge(e,t,i,s){}refreshAuthToken(e){}refreshAppCheckToken(e){}onDisconnectPut(e,t,i){}onDisconnectMerge(e,t,i){}onDisconnectCancel(e,t){}reportStats(e){}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Fr{constructor(e){this.allowedEvents_=e,this.listeners_={},f(Array.isArray(e)&&e.length>0,"Requires a non-empty array")}trigger(e,...t){if(Array.isArray(this.listeners_[e])){const i=[...this.listeners_[e]];for(let s=0;s<i.length;s++)i[s].callback.apply(i[s].context,t)}}on(e,t,i){this.validateEventType_(e),this.listeners_[e]=this.listeners_[e]||[],this.listeners_[e].push({callback:t,context:i});const s=this.getInitialEvent(e);s&&t.apply(i,s)}off(e,t,i){this.validateEventType_(e);const s=this.listeners_[e]||[];for(let r=0;r<s.length;r++)if(s[r].callback===t&&(!i||i===s[r].context)){s.splice(r,1);return}}validateEventType_(e){f(this.allowedEvents_.find(t=>t===e),"Unknown event: "+e)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Kt extends Fr{constructor(){super(["online"]),this.online_=!0,typeof window<"u"&&typeof window.addEventListener<"u"&&!sr()&&(window.addEventListener("online",()=>{this.online_||(this.online_=!0,this.trigger("online",!0))},!1),window.addEventListener("offline",()=>{this.online_&&(this.online_=!1,this.trigger("online",!1))},!1))}static getInstance(){return new Kt}getInitialEvent(e){return f(e==="online","Unknown event type: "+e),[this.online_]}currentlyOnline(){return this.online_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const ks=32,xs=768;class C{constructor(e,t){if(t===void 0){this.pieces_=e.split("/");let i=0;for(let s=0;s<this.pieces_.length;s++)this.pieces_[s].length>0&&(this.pieces_[i]=this.pieces_[s],i++);this.pieces_.length=i,this.pieceNum_=0}else this.pieces_=e,this.pieceNum_=t}toString(){let e="";for(let t=this.pieceNum_;t<this.pieces_.length;t++)this.pieces_[t]!==""&&(e+="/"+this.pieces_[t]);return e||"/"}}function E(){return new C("")}function y(n){return n.pieceNum_>=n.pieces_.length?null:n.pieces_[n.pieceNum_]}function be(n){return n.pieces_.length-n.pieceNum_}function S(n){let e=n.pieceNum_;return e<n.pieces_.length&&e++,new C(n.pieces_,e)}function Ci(n){return n.pieceNum_<n.pieces_.length?n.pieces_[n.pieces_.length-1]:null}function mc(n){let e="";for(let t=n.pieceNum_;t<n.pieces_.length;t++)n.pieces_[t]!==""&&(e+="/"+encodeURIComponent(String(n.pieces_[t])));return e||"/"}function gt(n,e=0){return n.pieces_.slice(n.pieceNum_+e)}function Br(n){if(n.pieceNum_>=n.pieces_.length)return null;const e=[];for(let t=n.pieceNum_;t<n.pieces_.length-1;t++)e.push(n.pieces_[t]);return new C(e,0)}function P(n,e){const t=[];for(let i=n.pieceNum_;i<n.pieces_.length;i++)t.push(n.pieces_[i]);if(e instanceof C)for(let i=e.pieceNum_;i<e.pieces_.length;i++)t.push(e.pieces_[i]);else{const i=e.split("/");for(let s=0;s<i.length;s++)i[s].length>0&&t.push(i[s])}return new C(t,0)}function b(n){return n.pieceNum_>=n.pieces_.length}function W(n,e){const t=y(n),i=y(e);if(t===null)return e;if(t===i)return W(S(n),S(e));throw new Error("INTERNAL ERROR: innerPath ("+e+") is not within outerPath ("+n+")")}function _c(n,e){const t=gt(n,0),i=gt(e,0);for(let s=0;s<t.length&&s<i.length;s++){const r=$e(t[s],i[s]);if(r!==0)return r}return t.length===i.length?0:t.length<i.length?-1:1}function Ii(n,e){if(be(n)!==be(e))return!1;for(let t=n.pieceNum_,i=e.pieceNum_;t<=n.pieces_.length;t++,i++)if(n.pieces_[t]!==e.pieces_[i])return!1;return!0}function Q(n,e){let t=n.pieceNum_,i=e.pieceNum_;if(be(n)>be(e))return!1;for(;t<n.pieces_.length;){if(n.pieces_[t]!==e.pieces_[i])return!1;++t,++i}return!0}class gc{constructor(e,t){this.errorPrefix_=t,this.parts_=gt(e,0),this.byteLength_=Math.max(1,this.parts_.length);for(let i=0;i<this.parts_.length;i++)this.byteLength_+=an(this.parts_[i]);Ur(this)}}function vc(n,e){n.parts_.length>0&&(n.byteLength_+=1),n.parts_.push(e),n.byteLength_+=an(e),Ur(n)}function yc(n){const e=n.parts_.pop();n.byteLength_-=an(e),n.parts_.length>0&&(n.byteLength_-=1)}function Ur(n){if(n.byteLength_>xs)throw new Error(n.errorPrefix_+"has a key path longer than "+xs+" bytes ("+n.byteLength_+").");if(n.parts_.length>ks)throw new Error(n.errorPrefix_+"path specified exceeds the maximum depth that can be written ("+ks+") or object contains a cycle "+xe(n))}function xe(n){return n.parts_.length===0?"":"in property '"+n.parts_.join(".")+"'"}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Si extends Fr{constructor(){super(["visible"]);let e,t;typeof document<"u"&&typeof document.addEventListener<"u"&&(typeof document.hidden<"u"?(t="visibilitychange",e="hidden"):typeof document.mozHidden<"u"?(t="mozvisibilitychange",e="mozHidden"):typeof document.msHidden<"u"?(t="msvisibilitychange",e="msHidden"):typeof document.webkitHidden<"u"&&(t="webkitvisibilitychange",e="webkitHidden")),this.visible_=!0,t&&document.addEventListener(t,()=>{const i=!document[e];i!==this.visible_&&(this.visible_=i,this.trigger("visible",i))},!1)}static getInstance(){return new Si}getInitialEvent(e){return f(e==="visible","Unknown event type: "+e),[this.visible_]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const at=1e3,bc=60*5*1e3,As=30*1e3,wc=1.3,Ec=3e4,Cc="server_kill",Ps=3;class Y extends $r{constructor(e,t,i,s,r,o,a,l){if(super(),this.repoInfo_=e,this.applicationId_=t,this.onDataUpdate_=i,this.onConnectStatus_=s,this.onServerInfoUpdate_=r,this.authTokenProvider_=o,this.appCheckTokenProvider_=a,this.authOverride_=l,this.id=Y.nextPersistentConnectionId_++,this.log_=kt("p:"+this.id+":"),this.interruptReasons_={},this.listens=new Map,this.outstandingPuts_=[],this.outstandingGets_=[],this.outstandingPutCount_=0,this.outstandingGetCount_=0,this.onDisconnectRequestQueue_=[],this.connected_=!1,this.reconnectDelay_=at,this.maxReconnectDelay_=bc,this.securityDebugCallback_=null,this.lastSessionId=null,this.establishConnectionTimer_=null,this.visible_=!1,this.requestCBHash_={},this.requestNumber_=0,this.realtime_=null,this.authToken_=null,this.appCheckToken_=null,this.forceTokenRefresh_=!1,this.invalidAuthTokenCount_=0,this.invalidAppCheckTokenCount_=0,this.firstConnection_=!0,this.lastConnectionAttemptTime_=null,this.lastConnectionEstablishedTime_=null,l)throw new Error("Auth override specified in options, but not supported on non Node.js platforms");Si.getInstance().on("visible",this.onVisible_,this),e.host.indexOf("fblocal")===-1&&Kt.getInstance().on("online",this.onOnline_,this)}sendRequest(e,t,i){const s=++this.requestNumber_,r={r:s,a:e,b:t};this.log_(O(r)),f(this.connected_,"sendRequest call when we're not connected not allowed."),this.realtime_.sendRequest(r),i&&(this.requestCBHash_[s]=i)}get(e){this.initConnection_();const t=new z,s={action:"g",request:{p:e._path.toString(),q:e._queryObject},onComplete:o=>{const a=o.d;o.s==="ok"?t.resolve(a):t.reject(a)}};this.outstandingGets_.push(s),this.outstandingGetCount_++;const r=this.outstandingGets_.length-1;return this.connected_&&this.sendGet_(r),t.promise}listen(e,t,i,s){this.initConnection_();const r=e._queryIdentifier,o=e._path.toString();this.log_("Listen called for "+o+" "+r),this.listens.has(o)||this.listens.set(o,new Map),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"listen() called for non-default but complete query"),f(!this.listens.get(o).has(r),"listen() called twice for same path/queryId.");const a={onComplete:s,hashFn:t,query:e,tag:i};this.listens.get(o).set(r,a),this.connected_&&this.sendListen_(a)}sendGet_(e){const t=this.outstandingGets_[e];this.sendRequest("g",t.request,i=>{delete this.outstandingGets_[e],this.outstandingGetCount_--,this.outstandingGetCount_===0&&(this.outstandingGets_=[]),t.onComplete&&t.onComplete(i)})}sendListen_(e){const t=e.query,i=t._path.toString(),s=t._queryIdentifier;this.log_("Listen on "+i+" for "+s);const r={p:i},o="q";e.tag&&(r.q=t._queryObject,r.t=e.tag),r.h=e.hashFn(),this.sendRequest(o,r,a=>{const l=a.d,c=a.s;Y.warnOnListenWarnings_(l,t),(this.listens.get(i)&&this.listens.get(i).get(s))===e&&(this.log_("listen response",a),c!=="ok"&&this.removeListen_(i,s),e.onComplete&&e.onComplete(c,l))})}static warnOnListenWarnings_(e,t){if(e&&typeof e=="object"&&se(e,"w")){const i=Re(e,"w");if(Array.isArray(i)&&~i.indexOf("no_index")){const s='".indexOn": "'+t._queryParams.getIndex().toString()+'"',r=t._path.toString();U(`Using an unspecified index. Your data will be downloaded and filtered on the client. Consider adding ${s} at ${r} to your security rules for better performance.`)}}}refreshAuthToken(e){this.authToken_=e,this.log_("Auth token refreshed"),this.authToken_?this.tryAuth():this.connected_&&this.sendRequest("unauth",{},()=>{}),this.reduceReconnectDelayIfAdminCredential_(e)}reduceReconnectDelayIfAdminCredential_(e){(e&&e.length===40||_a(e))&&(this.log_("Admin auth credential detected.  Reducing max reconnect time."),this.maxReconnectDelay_=As)}refreshAppCheckToken(e){this.appCheckToken_=e,this.log_("App check token refreshed"),this.appCheckToken_?this.tryAppCheck():this.connected_&&this.sendRequest("unappeck",{},()=>{})}tryAuth(){if(this.connected_&&this.authToken_){const e=this.authToken_,t=ma(e)?"auth":"gauth",i={cred:e};this.authOverride_===null?i.noauth=!0:typeof this.authOverride_=="object"&&(i.authvar=this.authOverride_),this.sendRequest(t,i,s=>{const r=s.s,o=s.d||"error";this.authToken_===e&&(r==="ok"?this.invalidAuthTokenCount_=0:this.onAuthRevoked_(r,o))})}}tryAppCheck(){this.connected_&&this.appCheckToken_&&this.sendRequest("appcheck",{token:this.appCheckToken_},e=>{const t=e.s,i=e.d||"error";t==="ok"?this.invalidAppCheckTokenCount_=0:this.onAppCheckRevoked_(t,i)})}unlisten(e,t){const i=e._path.toString(),s=e._queryIdentifier;this.log_("Unlisten called for "+i+" "+s),f(e._queryParams.isDefault()||!e._queryParams.loadsAllData(),"unlisten() called for non-default but complete query"),this.removeListen_(i,s)&&this.connected_&&this.sendUnlisten_(i,s,e._queryObject,t)}sendUnlisten_(e,t,i,s){this.log_("Unlisten on "+e+" for "+t);const r={p:e},o="n";s&&(r.q=i,r.t=s),this.sendRequest(o,r)}onDisconnectPut(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("o",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"o",data:t,onComplete:i})}onDisconnectMerge(e,t,i){this.initConnection_(),this.connected_?this.sendOnDisconnect_("om",e,t,i):this.onDisconnectRequestQueue_.push({pathString:e,action:"om",data:t,onComplete:i})}onDisconnectCancel(e,t){this.initConnection_(),this.connected_?this.sendOnDisconnect_("oc",e,null,t):this.onDisconnectRequestQueue_.push({pathString:e,action:"oc",data:null,onComplete:t})}sendOnDisconnect_(e,t,i,s){const r={p:t,d:i};this.log_("onDisconnect "+e,r),this.sendRequest(e,r,o=>{s&&setTimeout(()=>{s(o.s,o.d)},Math.floor(0))})}put(e,t,i,s){this.putInternal("p",e,t,i,s)}merge(e,t,i,s){this.putInternal("m",e,t,i,s)}putInternal(e,t,i,s,r){this.initConnection_();const o={p:t,d:i};r!==void 0&&(o.h=r),this.outstandingPuts_.push({action:e,request:o,onComplete:s}),this.outstandingPutCount_++;const a=this.outstandingPuts_.length-1;this.connected_?this.sendPut_(a):this.log_("Buffering put: "+t)}sendPut_(e){const t=this.outstandingPuts_[e].action,i=this.outstandingPuts_[e].request,s=this.outstandingPuts_[e].onComplete;this.outstandingPuts_[e].queued=this.connected_,this.sendRequest(t,i,r=>{this.log_(t+" response",r),delete this.outstandingPuts_[e],this.outstandingPutCount_--,this.outstandingPutCount_===0&&(this.outstandingPuts_=[]),s&&s(r.s,r.d)})}reportStats(e){if(this.connected_){const t={c:e};this.log_("reportStats",t),this.sendRequest("s",t,i=>{if(i.s!=="ok"){const r=i.d;this.log_("reportStats","Error sending stats: "+r)}})}}onDataMessage_(e){if("r"in e){this.log_("from server: "+O(e));const t=e.r,i=this.requestCBHash_[t];i&&(delete this.requestCBHash_[t],i(e.b))}else{if("error"in e)throw"A server-side error has occurred: "+e.error;"a"in e&&this.onDataPush_(e.a,e.b)}}onDataPush_(e,t){this.log_("handleServerMessage",e,t),e==="d"?this.onDataUpdate_(t.p,t.d,!1,t.t):e==="m"?this.onDataUpdate_(t.p,t.d,!0,t.t):e==="c"?this.onListenRevoked_(t.p,t.q):e==="ac"?this.onAuthRevoked_(t.s,t.d):e==="apc"?this.onAppCheckRevoked_(t.s,t.d):e==="sd"?this.onSecurityDebugPacket_(t):Jn("Unrecognized action received from server: "+O(e)+`
Are you using the latest client?`)}onReady_(e,t){this.log_("connection ready"),this.connected_=!0,this.lastConnectionEstablishedTime_=new Date().getTime(),this.handleTimestamp_(e),this.lastSessionId=t,this.firstConnection_&&this.sendConnectStats_(),this.restoreState_(),this.firstConnection_=!1,this.onConnectStatus_(!0)}scheduleConnect_(e){f(!this.realtime_,"Scheduling a connect when we're already connected/ing?"),this.establishConnectionTimer_&&clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=setTimeout(()=>{this.establishConnectionTimer_=null,this.establishConnection_()},Math.floor(e))}initConnection_(){!this.realtime_&&this.firstConnection_&&this.scheduleConnect_(0)}onVisible_(e){e&&!this.visible_&&this.reconnectDelay_===this.maxReconnectDelay_&&(this.log_("Window became visible.  Reducing delay."),this.reconnectDelay_=at,this.realtime_||this.scheduleConnect_(0)),this.visible_=e}onOnline_(e){e?(this.log_("Browser went online."),this.reconnectDelay_=at,this.realtime_||this.scheduleConnect_(0)):(this.log_("Browser went offline.  Killing connection."),this.realtime_&&this.realtime_.close())}onRealtimeDisconnect_(){if(this.log_("data client disconnected"),this.connected_=!1,this.realtime_=null,this.cancelSentTransactions_(),this.requestCBHash_={},this.shouldReconnect_()){this.visible_?this.lastConnectionEstablishedTime_&&(new Date().getTime()-this.lastConnectionEstablishedTime_>Ec&&(this.reconnectDelay_=at),this.lastConnectionEstablishedTime_=null):(this.log_("Window isn't visible.  Delaying reconnect."),this.reconnectDelay_=this.maxReconnectDelay_,this.lastConnectionAttemptTime_=new Date().getTime());const e=new Date().getTime()-this.lastConnectionAttemptTime_;let t=Math.max(0,this.reconnectDelay_-e);t=Math.random()*t,this.log_("Trying to reconnect in "+t+"ms"),this.scheduleConnect_(t),this.reconnectDelay_=Math.min(this.maxReconnectDelay_,this.reconnectDelay_*wc)}this.onConnectStatus_(!1)}async establishConnection_(){if(this.shouldReconnect_()){this.log_("Making a connection attempt"),this.lastConnectionAttemptTime_=new Date().getTime(),this.lastConnectionEstablishedTime_=null;const e=this.onDataMessage_.bind(this),t=this.onReady_.bind(this),i=this.onRealtimeDisconnect_.bind(this),s=this.id+":"+Y.nextConnectionId_++,r=this.lastSessionId;let o=!1,a=null;const l=function(){a?a.close():(o=!0,i())},c=function(d){f(a,"sendRequest call when we're not connected not allowed."),a.sendRequest(d)};this.realtime_={close:l,sendRequest:c};const u=this.forceTokenRefresh_;this.forceTokenRefresh_=!1;try{const[d,h]=await Promise.all([this.authTokenProvider_.getToken(u),this.appCheckTokenProvider_.getToken(u)]);o?$("getToken() completed but was canceled"):($("getToken() completed. Creating connection."),this.authToken_=d&&d.accessToken,this.appCheckToken_=h&&h.token,a=new pc(s,this.repoInfo_,this.applicationId_,this.appCheckToken_,this.authToken_,e,t,i,p=>{U(p+" ("+this.repoInfo_.toString()+")"),this.interrupt(Cc)},r))}catch(d){this.log_("Failed to get token: "+d),o||(this.repoInfo_.nodeAdmin&&U(d),l())}}}interrupt(e){$("Interrupting connection for reason: "+e),this.interruptReasons_[e]=!0,this.realtime_?this.realtime_.close():(this.establishConnectionTimer_&&(clearTimeout(this.establishConnectionTimer_),this.establishConnectionTimer_=null),this.connected_&&this.onRealtimeDisconnect_())}resume(e){$("Resuming connection for reason: "+e),delete this.interruptReasons_[e],jn(this.interruptReasons_)&&(this.reconnectDelay_=at,this.realtime_||this.scheduleConnect_(0))}handleTimestamp_(e){const t=e-new Date().getTime();this.onServerInfoUpdate_({serverTimeOffset:t})}cancelSentTransactions_(){for(let e=0;e<this.outstandingPuts_.length;e++){const t=this.outstandingPuts_[e];t&&"h"in t.request&&t.queued&&(t.onComplete&&t.onComplete("disconnect"),delete this.outstandingPuts_[e],this.outstandingPutCount_--)}this.outstandingPutCount_===0&&(this.outstandingPuts_=[])}onListenRevoked_(e,t){let i;t?i=t.map(r=>yi(r)).join("$"):i="default";const s=this.removeListen_(e,i);s&&s.onComplete&&s.onComplete("permission_denied")}removeListen_(e,t){const i=new C(e).toString();let s;if(this.listens.has(i)){const r=this.listens.get(i);s=r.get(t),r.delete(t),r.size===0&&this.listens.delete(i)}else s=void 0;return s}onAuthRevoked_(e,t){$("Auth token revoked: "+e+"/"+t),this.authToken_=null,this.forceTokenRefresh_=!0,this.realtime_.close(),(e==="invalid_token"||e==="permission_denied")&&(this.invalidAuthTokenCount_++,this.invalidAuthTokenCount_>=Ps&&(this.reconnectDelay_=As,this.authTokenProvider_.notifyForInvalidToken()))}onAppCheckRevoked_(e,t){$("App check token revoked: "+e+"/"+t),this.appCheckToken_=null,this.forceTokenRefresh_=!0,(e==="invalid_token"||e==="permission_denied")&&(this.invalidAppCheckTokenCount_++,this.invalidAppCheckTokenCount_>=Ps&&this.appCheckTokenProvider_.notifyForInvalidToken())}onSecurityDebugPacket_(e){this.securityDebugCallback_?this.securityDebugCallback_(e):"msg"in e&&console.log("FIREBASE: "+e.msg.replace(`
`,`
FIREBASE: `))}restoreState_(){this.tryAuth(),this.tryAppCheck();for(const e of this.listens.values())for(const t of e.values())this.sendListen_(t);for(let e=0;e<this.outstandingPuts_.length;e++)this.outstandingPuts_[e]&&this.sendPut_(e);for(;this.onDisconnectRequestQueue_.length;){const e=this.onDisconnectRequestQueue_.shift();this.sendOnDisconnect_(e.action,e.pathString,e.data,e.onComplete)}for(let e=0;e<this.outstandingGets_.length;e++)this.outstandingGets_[e]&&this.sendGet_(e)}sendConnectStats_(){const e={};let t="js";e["sdk."+t+"."+pr.replace(/\./g,"-")]=1,sr()?e["framework.cordova"]=1:la()&&(e["framework.reactnative"]=1),this.reportStats(e)}shouldReconnect_(){const e=Kt.getInstance().currentlyOnline();return jn(this.interruptReasons_)&&e}}Y.nextPersistentConnectionId_=0;Y.nextConnectionId_=0;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class w{constructor(e,t){this.name=e,this.node=t}static Wrap(e,t){return new w(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class cn{getCompare(){return this.compare.bind(this)}indexedValueChanged(e,t){const i=new w(ye,e),s=new w(ye,t);return this.compare(i,s)!==0}minPost(){return w.MIN}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let $t;class Wr extends cn{static get __EMPTY_NODE(){return $t}static set __EMPTY_NODE(e){$t=e}compare(e,t){return $e(e.name,t.name)}isDefinedOn(e){throw Je("KeyIndex.isDefinedOn not expected to be called.")}indexedValueChanged(e,t){return!1}minPost(){return w.MIN}maxPost(){return new w(ue,$t)}makePost(e,t){return f(typeof e=="string","KeyIndex indexValue must always be a string."),new w(e,$t)}toString(){return".key"}}const re=new Wr;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ft{constructor(e,t,i,s,r=null){this.isReverse_=s,this.resultGenerator_=r,this.nodeStack_=[];let o=1;for(;!e.isEmpty();)if(e=e,o=t?i(e.key,t):1,s&&(o*=-1),o<0)this.isReverse_?e=e.left:e=e.right;else if(o===0){this.nodeStack_.push(e);break}else this.nodeStack_.push(e),this.isReverse_?e=e.right:e=e.left}getNext(){if(this.nodeStack_.length===0)return null;let e=this.nodeStack_.pop(),t;if(this.resultGenerator_?t=this.resultGenerator_(e.key,e.value):t={key:e.key,value:e.value},this.isReverse_)for(e=e.left;!e.isEmpty();)this.nodeStack_.push(e),e=e.right;else for(e=e.right;!e.isEmpty();)this.nodeStack_.push(e),e=e.left;return t}hasNext(){return this.nodeStack_.length>0}peek(){if(this.nodeStack_.length===0)return null;const e=this.nodeStack_[this.nodeStack_.length-1];return this.resultGenerator_?this.resultGenerator_(e.key,e.value):{key:e.key,value:e.value}}}class L{constructor(e,t,i,s,r){this.key=e,this.value=t,this.color=i??L.RED,this.left=s??H.EMPTY_NODE,this.right=r??H.EMPTY_NODE}copy(e,t,i,s,r){return new L(e??this.key,t??this.value,i??this.color,s??this.left,r??this.right)}count(){return this.left.count()+1+this.right.count()}isEmpty(){return!1}inorderTraversal(e){return this.left.inorderTraversal(e)||!!e(this.key,this.value)||this.right.inorderTraversal(e)}reverseTraversal(e){return this.right.reverseTraversal(e)||e(this.key,this.value)||this.left.reverseTraversal(e)}min_(){return this.left.isEmpty()?this:this.left.min_()}minKey(){return this.min_().key}maxKey(){return this.right.isEmpty()?this.key:this.right.maxKey()}insert(e,t,i){let s=this;const r=i(e,s.key);return r<0?s=s.copy(null,null,null,s.left.insert(e,t,i),null):r===0?s=s.copy(null,t,null,null,null):s=s.copy(null,null,null,null,s.right.insert(e,t,i)),s.fixUp_()}removeMin_(){if(this.left.isEmpty())return H.EMPTY_NODE;let e=this;return!e.left.isRed_()&&!e.left.left.isRed_()&&(e=e.moveRedLeft_()),e=e.copy(null,null,null,e.left.removeMin_(),null),e.fixUp_()}remove(e,t){let i,s;if(i=this,t(e,i.key)<0)!i.left.isEmpty()&&!i.left.isRed_()&&!i.left.left.isRed_()&&(i=i.moveRedLeft_()),i=i.copy(null,null,null,i.left.remove(e,t),null);else{if(i.left.isRed_()&&(i=i.rotateRight_()),!i.right.isEmpty()&&!i.right.isRed_()&&!i.right.left.isRed_()&&(i=i.moveRedRight_()),t(e,i.key)===0){if(i.right.isEmpty())return H.EMPTY_NODE;s=i.right.min_(),i=i.copy(s.key,s.value,null,null,i.right.removeMin_())}i=i.copy(null,null,null,null,i.right.remove(e,t))}return i.fixUp_()}isRed_(){return this.color}fixUp_(){let e=this;return e.right.isRed_()&&!e.left.isRed_()&&(e=e.rotateLeft_()),e.left.isRed_()&&e.left.left.isRed_()&&(e=e.rotateRight_()),e.left.isRed_()&&e.right.isRed_()&&(e=e.colorFlip_()),e}moveRedLeft_(){let e=this.colorFlip_();return e.right.left.isRed_()&&(e=e.copy(null,null,null,null,e.right.rotateRight_()),e=e.rotateLeft_(),e=e.colorFlip_()),e}moveRedRight_(){let e=this.colorFlip_();return e.left.left.isRed_()&&(e=e.rotateRight_(),e=e.colorFlip_()),e}rotateLeft_(){const e=this.copy(null,null,L.RED,null,this.right.left);return this.right.copy(null,null,this.color,e,null)}rotateRight_(){const e=this.copy(null,null,L.RED,this.left.right,null);return this.left.copy(null,null,this.color,null,e)}colorFlip_(){const e=this.left.copy(null,null,!this.left.color,null,null),t=this.right.copy(null,null,!this.right.color,null,null);return this.copy(null,null,!this.color,e,t)}checkMaxDepth_(){const e=this.check_();return Math.pow(2,e)<=this.count()+1}check_(){if(this.isRed_()&&this.left.isRed_())throw new Error("Red node has red child("+this.key+","+this.value+")");if(this.right.isRed_())throw new Error("Right child of ("+this.key+","+this.value+") is red");const e=this.left.check_();if(e!==this.right.check_())throw new Error("Black depths differ");return e+(this.isRed_()?0:1)}}L.RED=!0;L.BLACK=!1;class Ic{copy(e,t,i,s,r){return this}insert(e,t,i){return new L(e,t,null)}remove(e,t){return this}count(){return 0}isEmpty(){return!0}inorderTraversal(e){return!1}reverseTraversal(e){return!1}minKey(){return null}maxKey(){return null}check_(){return 0}isRed_(){return!1}}class H{constructor(e,t=H.EMPTY_NODE){this.comparator_=e,this.root_=t}insert(e,t){return new H(this.comparator_,this.root_.insert(e,t,this.comparator_).copy(null,null,L.BLACK,null,null))}remove(e){return new H(this.comparator_,this.root_.remove(e,this.comparator_).copy(null,null,L.BLACK,null,null))}get(e){let t,i=this.root_;for(;!i.isEmpty();){if(t=this.comparator_(e,i.key),t===0)return i.value;t<0?i=i.left:t>0&&(i=i.right)}return null}getPredecessorKey(e){let t,i=this.root_,s=null;for(;!i.isEmpty();)if(t=this.comparator_(e,i.key),t===0){if(i.left.isEmpty())return s?s.key:null;for(i=i.left;!i.right.isEmpty();)i=i.right;return i.key}else t<0?i=i.left:t>0&&(s=i,i=i.right);throw new Error("Attempted to find predecessor key for a nonexistent key.  What gives?")}isEmpty(){return this.root_.isEmpty()}count(){return this.root_.count()}minKey(){return this.root_.minKey()}maxKey(){return this.root_.maxKey()}inorderTraversal(e){return this.root_.inorderTraversal(e)}reverseTraversal(e){return this.root_.reverseTraversal(e)}getIterator(e){return new Ft(this.root_,null,this.comparator_,!1,e)}getIteratorFrom(e,t){return new Ft(this.root_,e,this.comparator_,!1,t)}getReverseIteratorFrom(e,t){return new Ft(this.root_,e,this.comparator_,!0,t)}getReverseIterator(e){return new Ft(this.root_,null,this.comparator_,!0,e)}}H.EMPTY_NODE=new Ic;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Sc(n,e){return $e(n.name,e.name)}function Ti(n,e){return $e(n,e)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let ei;function Tc(n){ei=n}const Hr=function(n){return typeof n=="number"?"number:"+br(n):"string:"+n},jr=function(n){if(n.isLeafNode()){const e=n.val();f(typeof e=="string"||typeof e=="number"||typeof e=="object"&&se(e,".sv"),"Priority must be a string or number.")}else f(n===ei||n.isEmpty(),"priority of unexpected type.");f(n===ei||n.getPriority().isEmpty(),"Priority nodes can't have a priority of their own.")};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Rs;class M{constructor(e,t=M.__childrenNodeConstructor.EMPTY_NODE){this.value_=e,this.priorityNode_=t,this.lazyHash_=null,f(this.value_!==void 0&&this.value_!==null,"LeafNode shouldn't be created with null/undefined value."),jr(this.priorityNode_)}static set __childrenNodeConstructor(e){Rs=e}static get __childrenNodeConstructor(){return Rs}isLeafNode(){return!0}getPriority(){return this.priorityNode_}updatePriority(e){return new M(this.value_,e)}getImmediateChild(e){return e===".priority"?this.priorityNode_:M.__childrenNodeConstructor.EMPTY_NODE}getChild(e){return b(e)?this:y(e)===".priority"?this.priorityNode_:M.__childrenNodeConstructor.EMPTY_NODE}hasChild(){return!1}getPredecessorChildName(e,t){return null}updateImmediateChild(e,t){return e===".priority"?this.updatePriority(t):t.isEmpty()&&e!==".priority"?this:M.__childrenNodeConstructor.EMPTY_NODE.updateImmediateChild(e,t).updatePriority(this.priorityNode_)}updateChild(e,t){const i=y(e);return i===null?t:t.isEmpty()&&i!==".priority"?this:(f(i!==".priority"||be(e)===1,".priority must be the last token in a path"),this.updateImmediateChild(i,M.__childrenNodeConstructor.EMPTY_NODE.updateChild(S(e),t)))}isEmpty(){return!1}numChildren(){return 0}forEachChild(e,t){return!1}val(e){return e&&!this.getPriority().isEmpty()?{".value":this.getValue(),".priority":this.getPriority().val()}:this.getValue()}hash(){if(this.lazyHash_===null){let e="";this.priorityNode_.isEmpty()||(e+="priority:"+Hr(this.priorityNode_.val())+":");const t=typeof this.value_;e+=t+":",t==="number"?e+=br(this.value_):e+=this.value_,this.lazyHash_=gr(e)}return this.lazyHash_}getValue(){return this.value_}compareTo(e){return e===M.__childrenNodeConstructor.EMPTY_NODE?1:e instanceof M.__childrenNodeConstructor?-1:(f(e.isLeafNode(),"Unknown node type"),this.compareToLeafNode_(e))}compareToLeafNode_(e){const t=typeof e.value_,i=typeof this.value_,s=M.VALUE_TYPE_ORDER.indexOf(t),r=M.VALUE_TYPE_ORDER.indexOf(i);return f(s>=0,"Unknown leaf type: "+t),f(r>=0,"Unknown leaf type: "+i),s===r?i==="object"?0:this.value_<e.value_?-1:this.value_===e.value_?0:1:r-s}withIndex(){return this}isIndexed(){return!0}equals(e){if(e===this)return!0;if(e.isLeafNode()){const t=e;return this.value_===t.value_&&this.priorityNode_.equals(t.priorityNode_)}else return!1}}M.VALUE_TYPE_ORDER=["object","boolean","number","string"];/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Vr,zr;function kc(n){Vr=n}function xc(n){zr=n}class Ac extends cn{compare(e,t){const i=e.node.getPriority(),s=t.node.getPriority(),r=i.compareTo(s);return r===0?$e(e.name,t.name):r}isDefinedOn(e){return!e.getPriority().isEmpty()}indexedValueChanged(e,t){return!e.getPriority().equals(t.getPriority())}minPost(){return w.MIN}maxPost(){return new w(ue,new M("[PRIORITY-POST]",zr))}makePost(e,t){const i=Vr(e);return new w(t,new M("[PRIORITY-POST]",i))}toString(){return".priority"}}const x=new Ac;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Pc=Math.log(2);class Rc{constructor(e){const t=r=>parseInt(Math.log(r)/Pc,10),i=r=>parseInt(Array(r+1).join("1"),2);this.count=t(e+1),this.current_=this.count-1;const s=i(this.count);this.bits_=e+1&s}nextBitIsOne(){const e=!(this.bits_&1<<this.current_);return this.current_--,e}}const qt=function(n,e,t,i){n.sort(e);const s=function(l,c){const u=c-l;let d,h;if(u===0)return null;if(u===1)return d=n[l],h=t?t(d):d,new L(h,d.node,L.BLACK,null,null);{const p=parseInt(u/2,10)+l,_=s(l,p),I=s(p+1,c);return d=n[p],h=t?t(d):d,new L(h,d.node,L.BLACK,_,I)}},r=function(l){let c=null,u=null,d=n.length;const h=function(_,I){const B=d-_,Ue=d;d-=_;const Lt=s(B+1,Ue),Pn=n[B],Ko=t?t(Pn):Pn;p(new L(Ko,Pn.node,I,null,Lt))},p=function(_){c?(c.left=_,c=_):(u=_,c=_)};for(let _=0;_<l.count;++_){const I=l.nextBitIsOne(),B=Math.pow(2,l.count-(_+1));I?h(B,L.BLACK):(h(B,L.BLACK),h(B,L.RED))}return u},o=new Rc(n.length),a=r(o);return new H(i||e,a)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Fn;const We={};class ce{constructor(e,t){this.indexes_=e,this.indexSet_=t}static get Default(){return f(We&&x,"ChildrenNode.ts has not been loaded"),Fn=Fn||new ce({".priority":We},{".priority":x}),Fn}get(e){const t=Re(this.indexes_,e);if(!t)throw new Error("No index defined for "+e);return t instanceof H?t:null}hasIndex(e){return se(this.indexSet_,e.toString())}addIndex(e,t){f(e!==re,"KeyIndex always exists and isn't meant to be added to the IndexMap.");const i=[];let s=!1;const r=t.getIterator(w.Wrap);let o=r.getNext();for(;o;)s=s||e.isDefinedOn(o.node),i.push(o),o=r.getNext();let a;s?a=qt(i,e.getCompare()):a=We;const l=e.toString(),c=Object.assign({},this.indexSet_);c[l]=e;const u=Object.assign({},this.indexes_);return u[l]=a,new ce(u,c)}addToIndexes(e,t){const i=jt(this.indexes_,(s,r)=>{const o=Re(this.indexSet_,r);if(f(o,"Missing index implementation for "+r),s===We)if(o.isDefinedOn(e.node)){const a=[],l=t.getIterator(w.Wrap);let c=l.getNext();for(;c;)c.name!==e.name&&a.push(c),c=l.getNext();return a.push(e),qt(a,o.getCompare())}else return We;else{const a=t.get(e.name);let l=s;return a&&(l=l.remove(new w(e.name,a))),l.insert(e,e.node)}});return new ce(i,this.indexSet_)}removeFromIndexes(e,t){const i=jt(this.indexes_,s=>{if(s===We)return s;{const r=t.get(e.name);return r?s.remove(new w(e.name,r)):s}});return new ce(i,this.indexSet_)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let lt;class g{constructor(e,t,i){this.children_=e,this.priorityNode_=t,this.indexMap_=i,this.lazyHash_=null,this.priorityNode_&&jr(this.priorityNode_),this.children_.isEmpty()&&f(!this.priorityNode_||this.priorityNode_.isEmpty(),"An empty node cannot have a priority")}static get EMPTY_NODE(){return lt||(lt=new g(new H(Ti),null,ce.Default))}isLeafNode(){return!1}getPriority(){return this.priorityNode_||lt}updatePriority(e){return this.children_.isEmpty()?this:new g(this.children_,e,this.indexMap_)}getImmediateChild(e){if(e===".priority")return this.getPriority();{const t=this.children_.get(e);return t===null?lt:t}}getChild(e){const t=y(e);return t===null?this:this.getImmediateChild(t).getChild(S(e))}hasChild(e){return this.children_.get(e)!==null}updateImmediateChild(e,t){if(f(t,"We should always be passing snapshot nodes"),e===".priority")return this.updatePriority(t);{const i=new w(e,t);let s,r;t.isEmpty()?(s=this.children_.remove(e),r=this.indexMap_.removeFromIndexes(i,this.children_)):(s=this.children_.insert(e,t),r=this.indexMap_.addToIndexes(i,this.children_));const o=s.isEmpty()?lt:this.priorityNode_;return new g(s,o,r)}}updateChild(e,t){const i=y(e);if(i===null)return t;{f(y(e)!==".priority"||be(e)===1,".priority must be the last token in a path");const s=this.getImmediateChild(i).updateChild(S(e),t);return this.updateImmediateChild(i,s)}}isEmpty(){return this.children_.isEmpty()}numChildren(){return this.children_.count()}val(e){if(this.isEmpty())return null;const t={};let i=0,s=0,r=!0;if(this.forEachChild(x,(o,a)=>{t[o]=a.val(e),i++,r&&g.INTEGER_REGEXP_.test(o)?s=Math.max(s,Number(o)):r=!1}),!e&&r&&s<2*i){const o=[];for(const a in t)o[a]=t[a];return o}else return e&&!this.getPriority().isEmpty()&&(t[".priority"]=this.getPriority().val()),t}hash(){if(this.lazyHash_===null){let e="";this.getPriority().isEmpty()||(e+="priority:"+Hr(this.getPriority().val())+":"),this.forEachChild(x,(t,i)=>{const s=i.hash();s!==""&&(e+=":"+t+":"+s)}),this.lazyHash_=e===""?"":gr(e)}return this.lazyHash_}getPredecessorChildName(e,t,i){const s=this.resolveIndex_(i);if(s){const r=s.getPredecessorKey(new w(e,t));return r?r.name:null}else return this.children_.getPredecessorKey(e)}getFirstChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.minKey();return i&&i.name}else return this.children_.minKey()}getFirstChild(e){const t=this.getFirstChildName(e);return t?new w(t,this.children_.get(t)):null}getLastChildName(e){const t=this.resolveIndex_(e);if(t){const i=t.maxKey();return i&&i.name}else return this.children_.maxKey()}getLastChild(e){const t=this.getLastChildName(e);return t?new w(t,this.children_.get(t)):null}forEachChild(e,t){const i=this.resolveIndex_(e);return i?i.inorderTraversal(s=>t(s.name,s.node)):this.children_.inorderTraversal(t)}getIterator(e){return this.getIteratorFrom(e.minPost(),e)}getIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getIteratorFrom(e,s=>s);{const s=this.children_.getIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)<0;)s.getNext(),r=s.peek();return s}}getReverseIterator(e){return this.getReverseIteratorFrom(e.maxPost(),e)}getReverseIteratorFrom(e,t){const i=this.resolveIndex_(t);if(i)return i.getReverseIteratorFrom(e,s=>s);{const s=this.children_.getReverseIteratorFrom(e.name,w.Wrap);let r=s.peek();for(;r!=null&&t.compare(r,e)>0;)s.getNext(),r=s.peek();return s}}compareTo(e){return this.isEmpty()?e.isEmpty()?0:-1:e.isLeafNode()||e.isEmpty()?1:e===xt?-1:0}withIndex(e){if(e===re||this.indexMap_.hasIndex(e))return this;{const t=this.indexMap_.addIndex(e,this.children_);return new g(this.children_,this.priorityNode_,t)}}isIndexed(e){return e===re||this.indexMap_.hasIndex(e)}equals(e){if(e===this)return!0;if(e.isLeafNode())return!1;{const t=e;if(this.getPriority().equals(t.getPriority()))if(this.children_.count()===t.children_.count()){const i=this.getIterator(x),s=t.getIterator(x);let r=i.getNext(),o=s.getNext();for(;r&&o;){if(r.name!==o.name||!r.node.equals(o.node))return!1;r=i.getNext(),o=s.getNext()}return r===null&&o===null}else return!1;else return!1}}resolveIndex_(e){return e===re?null:this.indexMap_.get(e.toString())}}g.INTEGER_REGEXP_=/^(0|[1-9]\d*)$/;class Nc extends g{constructor(){super(new H(Ti),g.EMPTY_NODE,ce.Default)}compareTo(e){return e===this?0:1}equals(e){return e===this}getPriority(){return this}getImmediateChild(e){return g.EMPTY_NODE}isEmpty(){return!1}}const xt=new Nc;Object.defineProperties(w,{MIN:{value:new w(ye,g.EMPTY_NODE)},MAX:{value:new w(ue,xt)}});Wr.__EMPTY_NODE=g.EMPTY_NODE;M.__childrenNodeConstructor=g;Tc(xt);xc(xt);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Dc=!0;function N(n,e=null){if(n===null)return g.EMPTY_NODE;if(typeof n=="object"&&".priority"in n&&(e=n[".priority"]),f(e===null||typeof e=="string"||typeof e=="number"||typeof e=="object"&&".sv"in e,"Invalid priority type found: "+typeof e),typeof n=="object"&&".value"in n&&n[".value"]!==null&&(n=n[".value"]),typeof n!="object"||".sv"in n){const t=n;return new M(t,N(e))}if(!(n instanceof Array)&&Dc){const t=[];let i=!1;if(F(n,(o,a)=>{if(o.substring(0,1)!=="."){const l=N(a);l.isEmpty()||(i=i||!l.getPriority().isEmpty(),t.push(new w(o,l)))}}),t.length===0)return g.EMPTY_NODE;const r=qt(t,Sc,o=>o.name,Ti);if(i){const o=qt(t,x.getCompare());return new g(r,N(e),new ce({".priority":o},{".priority":x}))}else return new g(r,N(e),ce.Default)}else{let t=g.EMPTY_NODE;return F(n,(i,s)=>{if(se(n,i)&&i.substring(0,1)!=="."){const r=N(s);(r.isLeafNode()||!r.isEmpty())&&(t=t.updateImmediateChild(i,r))}}),t.updatePriority(N(e))}}kc(N);/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ki extends cn{constructor(e){super(),this.indexPath_=e,f(!b(e)&&y(e)!==".priority","Can't create PathIndex with empty path or .priority key")}extractChild(e){return e.getChild(this.indexPath_)}isDefinedOn(e){return!e.getChild(this.indexPath_).isEmpty()}compare(e,t){const i=this.extractChild(e.node),s=this.extractChild(t.node),r=i.compareTo(s);return r===0?$e(e.name,t.name):r}makePost(e,t){const i=N(e),s=g.EMPTY_NODE.updateChild(this.indexPath_,i);return new w(t,s)}maxPost(){const e=g.EMPTY_NODE.updateChild(this.indexPath_,xt);return new w(ue,e)}toString(){return gt(this.indexPath_,0).join("/")}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oc extends cn{compare(e,t){const i=e.node.compareTo(t.node);return i===0?$e(e.name,t.name):i}isDefinedOn(e){return!0}indexedValueChanged(e,t){return!e.equals(t)}minPost(){return w.MIN}maxPost(){return w.MAX}makePost(e,t){const i=N(e);return new w(t,i)}toString(){return".value"}}const xi=new Oc;/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Gr(n){return{type:"value",snapshotNode:n}}function Ke(n,e){return{type:"child_added",snapshotNode:e,childName:n}}function vt(n,e){return{type:"child_removed",snapshotNode:e,childName:n}}function yt(n,e,t){return{type:"child_changed",snapshotNode:e,childName:n,oldSnap:t}}function Mc(n,e){return{type:"child_moved",snapshotNode:e,childName:n}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ai{constructor(e){this.index_=e}updateChild(e,t,i,s,r,o){f(e.isIndexed(this.index_),"A node must be indexed if only a child is updated");const a=e.getImmediateChild(t);return a.getChild(s).equals(i.getChild(s))&&a.isEmpty()===i.isEmpty()||(o!=null&&(i.isEmpty()?e.hasChild(t)?o.trackChildChange(vt(t,a)):f(e.isLeafNode(),"A child remove without an old child only makes sense on a leaf node"):a.isEmpty()?o.trackChildChange(Ke(t,i)):o.trackChildChange(yt(t,i,a))),e.isLeafNode()&&i.isEmpty())?e:e.updateImmediateChild(t,i).withIndex(this.index_)}updateFullNode(e,t,i){return i!=null&&(e.isLeafNode()||e.forEachChild(x,(s,r)=>{t.hasChild(s)||i.trackChildChange(vt(s,r))}),t.isLeafNode()||t.forEachChild(x,(s,r)=>{if(e.hasChild(s)){const o=e.getImmediateChild(s);o.equals(r)||i.trackChildChange(yt(s,r,o))}else i.trackChildChange(Ke(s,r))})),t.withIndex(this.index_)}updatePriority(e,t){return e.isEmpty()?g.EMPTY_NODE:e.updatePriority(t)}filtersNodes(){return!1}getIndexedFilter(){return this}getIndex(){return this.index_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class bt{constructor(e){this.indexedFilter_=new Ai(e.getIndex()),this.index_=e.getIndex(),this.startPost_=bt.getStartPost_(e),this.endPost_=bt.getEndPost_(e),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}getStartPost(){return this.startPost_}getEndPost(){return this.endPost_}matches(e){const t=this.startIsInclusive_?this.index_.compare(this.getStartPost(),e)<=0:this.index_.compare(this.getStartPost(),e)<0,i=this.endIsInclusive_?this.index_.compare(e,this.getEndPost())<=0:this.index_.compare(e,this.getEndPost())<0;return t&&i}updateChild(e,t,i,s,r,o){return this.matches(new w(t,i))||(i=g.EMPTY_NODE),this.indexedFilter_.updateChild(e,t,i,s,r,o)}updateFullNode(e,t,i){t.isLeafNode()&&(t=g.EMPTY_NODE);let s=t.withIndex(this.index_);s=s.updatePriority(g.EMPTY_NODE);const r=this;return t.forEachChild(x,(o,a)=>{r.matches(new w(o,a))||(s=s.updateImmediateChild(o,g.EMPTY_NODE))}),this.indexedFilter_.updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.indexedFilter_}getIndex(){return this.index_}static getStartPost_(e){if(e.hasStart()){const t=e.getIndexStartName();return e.getIndex().makePost(e.getIndexStartValue(),t)}else return e.getIndex().minPost()}static getEndPost_(e){if(e.hasEnd()){const t=e.getIndexEndName();return e.getIndex().makePost(e.getIndexEndValue(),t)}else return e.getIndex().maxPost()}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Lc{constructor(e){this.withinDirectionalStart=t=>this.reverse_?this.withinEndPost(t):this.withinStartPost(t),this.withinDirectionalEnd=t=>this.reverse_?this.withinStartPost(t):this.withinEndPost(t),this.withinStartPost=t=>{const i=this.index_.compare(this.rangedFilter_.getStartPost(),t);return this.startIsInclusive_?i<=0:i<0},this.withinEndPost=t=>{const i=this.index_.compare(t,this.rangedFilter_.getEndPost());return this.endIsInclusive_?i<=0:i<0},this.rangedFilter_=new bt(e),this.index_=e.getIndex(),this.limit_=e.getLimit(),this.reverse_=!e.isViewFromLeft(),this.startIsInclusive_=!e.startAfterSet_,this.endIsInclusive_=!e.endBeforeSet_}updateChild(e,t,i,s,r,o){return this.rangedFilter_.matches(new w(t,i))||(i=g.EMPTY_NODE),e.getImmediateChild(t).equals(i)?e:e.numChildren()<this.limit_?this.rangedFilter_.getIndexedFilter().updateChild(e,t,i,s,r,o):this.fullLimitUpdateChild_(e,t,i,r,o)}updateFullNode(e,t,i){let s;if(t.isLeafNode()||t.isEmpty())s=g.EMPTY_NODE.withIndex(this.index_);else if(this.limit_*2<t.numChildren()&&t.isIndexed(this.index_)){s=g.EMPTY_NODE.withIndex(this.index_);let r;this.reverse_?r=t.getReverseIteratorFrom(this.rangedFilter_.getEndPost(),this.index_):r=t.getIteratorFrom(this.rangedFilter_.getStartPost(),this.index_);let o=0;for(;r.hasNext()&&o<this.limit_;){const a=r.getNext();if(this.withinDirectionalStart(a))if(this.withinDirectionalEnd(a))s=s.updateImmediateChild(a.name,a.node),o++;else break;else continue}}else{s=t.withIndex(this.index_),s=s.updatePriority(g.EMPTY_NODE);let r;this.reverse_?r=s.getReverseIterator(this.index_):r=s.getIterator(this.index_);let o=0;for(;r.hasNext();){const a=r.getNext();o<this.limit_&&this.withinDirectionalStart(a)&&this.withinDirectionalEnd(a)?o++:s=s.updateImmediateChild(a.name,g.EMPTY_NODE)}}return this.rangedFilter_.getIndexedFilter().updateFullNode(e,s,i)}updatePriority(e,t){return e}filtersNodes(){return!0}getIndexedFilter(){return this.rangedFilter_.getIndexedFilter()}getIndex(){return this.index_}fullLimitUpdateChild_(e,t,i,s,r){let o;if(this.reverse_){const d=this.index_.getCompare();o=(h,p)=>d(p,h)}else o=this.index_.getCompare();const a=e;f(a.numChildren()===this.limit_,"");const l=new w(t,i),c=this.reverse_?a.getFirstChild(this.index_):a.getLastChild(this.index_),u=this.rangedFilter_.matches(l);if(a.hasChild(t)){const d=a.getImmediateChild(t);let h=s.getChildAfterChild(this.index_,c,this.reverse_);for(;h!=null&&(h.name===t||a.hasChild(h.name));)h=s.getChildAfterChild(this.index_,h,this.reverse_);const p=h==null?1:o(h,l);if(u&&!i.isEmpty()&&p>=0)return r!=null&&r.trackChildChange(yt(t,i,d)),a.updateImmediateChild(t,i);{r!=null&&r.trackChildChange(vt(t,d));const I=a.updateImmediateChild(t,g.EMPTY_NODE);return h!=null&&this.rangedFilter_.matches(h)?(r!=null&&r.trackChildChange(Ke(h.name,h.node)),I.updateImmediateChild(h.name,h.node)):I}}else return i.isEmpty()?e:u&&o(c,l)>=0?(r!=null&&(r.trackChildChange(vt(c.name,c.node)),r.trackChildChange(Ke(t,i))),a.updateImmediateChild(t,i).updateImmediateChild(c.name,g.EMPTY_NODE)):e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class dn{constructor(){this.limitSet_=!1,this.startSet_=!1,this.startNameSet_=!1,this.startAfterSet_=!1,this.endSet_=!1,this.endNameSet_=!1,this.endBeforeSet_=!1,this.limit_=0,this.viewFrom_="",this.indexStartValue_=null,this.indexStartName_="",this.indexEndValue_=null,this.indexEndName_="",this.index_=x}hasStart(){return this.startSet_}isViewFromLeft(){return this.viewFrom_===""?this.startSet_:this.viewFrom_==="l"}getIndexStartValue(){return f(this.startSet_,"Only valid if start has been set"),this.indexStartValue_}getIndexStartName(){return f(this.startSet_,"Only valid if start has been set"),this.startNameSet_?this.indexStartName_:ye}hasEnd(){return this.endSet_}getIndexEndValue(){return f(this.endSet_,"Only valid if end has been set"),this.indexEndValue_}getIndexEndName(){return f(this.endSet_,"Only valid if end has been set"),this.endNameSet_?this.indexEndName_:ue}hasLimit(){return this.limitSet_}hasAnchoredLimit(){return this.limitSet_&&this.viewFrom_!==""}getLimit(){return f(this.limitSet_,"Only valid if limit has been set"),this.limit_}getIndex(){return this.index_}loadsAllData(){return!(this.startSet_||this.endSet_||this.limitSet_)}isDefault(){return this.loadsAllData()&&this.index_===x}copy(){const e=new dn;return e.limitSet_=this.limitSet_,e.limit_=this.limit_,e.startSet_=this.startSet_,e.startAfterSet_=this.startAfterSet_,e.indexStartValue_=this.indexStartValue_,e.startNameSet_=this.startNameSet_,e.indexStartName_=this.indexStartName_,e.endSet_=this.endSet_,e.endBeforeSet_=this.endBeforeSet_,e.indexEndValue_=this.indexEndValue_,e.endNameSet_=this.endNameSet_,e.indexEndName_=this.indexEndName_,e.index_=this.index_,e.viewFrom_=this.viewFrom_,e}}function $c(n){return n.loadsAllData()?new Ai(n.getIndex()):n.hasLimit()?new Lc(n):new bt(n)}function Fc(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="l",t}function Bc(n,e){const t=n.copy();return t.limitSet_=!0,t.limit_=e,t.viewFrom_="r",t}function ti(n,e,t){const i=n.copy();return i.startSet_=!0,e===void 0&&(e=null),i.indexStartValue_=e,t!=null?(i.startNameSet_=!0,i.indexStartName_=t):(i.startNameSet_=!1,i.indexStartName_=""),i}function Uc(n,e,t){let i;return n.index_===re||t?i=ti(n,e,t):i=ti(n,e,ue),i.startAfterSet_=!0,i}function ni(n,e,t){const i=n.copy();return i.endSet_=!0,e===void 0&&(e=null),i.indexEndValue_=e,t!==void 0?(i.endNameSet_=!0,i.indexEndName_=t):(i.endNameSet_=!1,i.indexEndName_=""),i}function Wc(n,e,t){let i;return n.index_===re||t?i=ni(n,e,t):i=ni(n,e,ye),i.endBeforeSet_=!0,i}function un(n,e){const t=n.copy();return t.index_=e,t}function Ns(n){const e={};if(n.isDefault())return e;let t;if(n.index_===x?t="$priority":n.index_===xi?t="$value":n.index_===re?t="$key":(f(n.index_ instanceof ki,"Unrecognized index type!"),t=n.index_.toString()),e.orderBy=O(t),n.startSet_){const i=n.startAfterSet_?"startAfter":"startAt";e[i]=O(n.indexStartValue_),n.startNameSet_&&(e[i]+=","+O(n.indexStartName_))}if(n.endSet_){const i=n.endBeforeSet_?"endBefore":"endAt";e[i]=O(n.indexEndValue_),n.endNameSet_&&(e[i]+=","+O(n.indexEndName_))}return n.limitSet_&&(n.isViewFromLeft()?e.limitToFirst=n.limit_:e.limitToLast=n.limit_),e}function Ds(n){const e={};if(n.startSet_&&(e.sp=n.indexStartValue_,n.startNameSet_&&(e.sn=n.indexStartName_),e.sin=!n.startAfterSet_),n.endSet_&&(e.ep=n.indexEndValue_,n.endNameSet_&&(e.en=n.indexEndName_),e.ein=!n.endBeforeSet_),n.limitSet_){e.l=n.limit_;let t=n.viewFrom_;t===""&&(n.isViewFromLeft()?t="l":t="r"),e.vf=t}return n.index_!==x&&(e.i=n.index_.toString()),e}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Qt extends $r{constructor(e,t,i,s){super(),this.repoInfo_=e,this.onDataUpdate_=t,this.authTokenProvider_=i,this.appCheckTokenProvider_=s,this.log_=kt("p:rest:"),this.listens_={}}reportStats(e){throw new Error("Method not implemented.")}static getListenId_(e,t){return t!==void 0?"tag$"+t:(f(e._queryParams.isDefault(),"should have a tag if it's not a default query."),e._path.toString())}listen(e,t,i,s){const r=e._path.toString();this.log_("Listen called for "+r+" "+e._queryIdentifier);const o=Qt.getListenId_(e,i),a={};this.listens_[o]=a;const l=Ns(e._queryParams);this.restRequest_(r+".json",l,(c,u)=>{let d=u;if(c===404&&(d=null,c=null),c===null&&this.onDataUpdate_(r,d,!1,i),Re(this.listens_,o)===a){let h;c?c===401?h="permission_denied":h="rest_error:"+c:h="ok",s(h,null)}})}unlisten(e,t){const i=Qt.getListenId_(e,t);delete this.listens_[i]}get(e){const t=Ns(e._queryParams),i=e._path.toString(),s=new z;return this.restRequest_(i+".json",t,(r,o)=>{let a=o;r===404&&(a=null,r=null),r===null?(this.onDataUpdate_(i,a,!1,null),s.resolve(a)):s.reject(new Error(a))}),s.promise}refreshAuthToken(e){}restRequest_(e,t={},i){return t.format="export",Promise.all([this.authTokenProvider_.getToken(!1),this.appCheckTokenProvider_.getToken(!1)]).then(([s,r])=>{s&&s.accessToken&&(t.auth=s.accessToken),r&&r.token&&(t.ac=r.token);const o=(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host+e+"?ns="+this.repoInfo_.namespace+ga(t);this.log_("Sending REST request for "+o);const a=new XMLHttpRequest;a.onreadystatechange=()=>{if(i&&a.readyState===4){this.log_("REST Response for "+o+" received. status:",a.status,"response:",a.responseText);let l=null;if(a.status>=200&&a.status<300){try{l=mt(a.responseText)}catch{U("Failed to parse JSON response for "+o+": "+a.responseText)}i(null,l)}else a.status!==401&&a.status!==404&&U("Got unsuccessful REST response for "+o+" Status: "+a.status),i(a.status);i=null}},a.open("GET",o,!0),a.send()})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Hc{constructor(){this.rootNode_=g.EMPTY_NODE}getNode(e){return this.rootNode_.getChild(e)}updateSnapshot(e,t){this.rootNode_=this.rootNode_.updateChild(e,t)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function Yt(){return{value:null,children:new Map}}function et(n,e,t){if(b(e))n.value=t,n.children.clear();else if(n.value!==null)n.value=n.value.updateChild(e,t);else{const i=y(e);n.children.has(i)||n.children.set(i,Yt());const s=n.children.get(i);e=S(e),et(s,e,t)}}function ii(n,e){if(b(e))return n.value=null,n.children.clear(),!0;if(n.value!==null){if(n.value.isLeafNode())return!1;{const t=n.value;return n.value=null,t.forEachChild(x,(i,s)=>{et(n,new C(i),s)}),ii(n,e)}}else if(n.children.size>0){const t=y(e);return e=S(e),n.children.has(t)&&ii(n.children.get(t),e)&&n.children.delete(t),n.children.size===0}else return!0}function si(n,e,t){n.value!==null?t(e,n.value):jc(n,(i,s)=>{const r=new C(e.toString()+"/"+i);si(s,r,t)})}function jc(n,e){n.children.forEach((t,i)=>{e(i,t)})}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Vc{constructor(e){this.collection_=e,this.last_=null}get(){const e=this.collection_.get(),t=Object.assign({},e);return this.last_&&F(this.last_,(i,s)=>{t[i]=t[i]-s}),this.last_=e,t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Os=10*1e3,zc=30*1e3,Gc=5*60*1e3;class Kc{constructor(e,t){this.server_=t,this.statsToReport_={},this.statsListener_=new Vc(e);const i=Os+(zc-Os)*Math.random();dt(this.reportStats_.bind(this),Math.floor(i))}reportStats_(){const e=this.statsListener_.get(),t={};let i=!1;F(e,(s,r)=>{r>0&&se(this.statsToReport_,s)&&(t[s]=r,i=!0)}),i&&this.server_.reportStats(t),dt(this.reportStats_.bind(this),Math.floor(Math.random()*2*Gc))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */var ee;(function(n){n[n.OVERWRITE=0]="OVERWRITE",n[n.MERGE=1]="MERGE",n[n.ACK_USER_WRITE=2]="ACK_USER_WRITE",n[n.LISTEN_COMPLETE=3]="LISTEN_COMPLETE"})(ee||(ee={}));function Pi(){return{fromUser:!0,fromServer:!1,queryId:null,tagged:!1}}function Ri(){return{fromUser:!1,fromServer:!0,queryId:null,tagged:!1}}function Ni(n){return{fromUser:!1,fromServer:!0,queryId:n,tagged:!0}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Xt{constructor(e,t,i){this.path=e,this.affectedTree=t,this.revert=i,this.type=ee.ACK_USER_WRITE,this.source=Pi()}operationForChild(e){if(b(this.path)){if(this.affectedTree.value!=null)return f(this.affectedTree.children.isEmpty(),"affectedTree should not have overlapping affected paths."),this;{const t=this.affectedTree.subtree(new C(e));return new Xt(E(),t,this.revert)}}else return f(y(this.path)===e,"operationForChild called for unrelated child."),new Xt(S(this.path),this.affectedTree,this.revert)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class wt{constructor(e,t){this.source=e,this.path=t,this.type=ee.LISTEN_COMPLETE}operationForChild(e){return b(this.path)?new wt(this.source,E()):new wt(this.source,S(this.path))}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Oe{constructor(e,t,i){this.source=e,this.path=t,this.snap=i,this.type=ee.OVERWRITE}operationForChild(e){return b(this.path)?new Oe(this.source,E(),this.snap.getImmediateChild(e)):new Oe(this.source,S(this.path),this.snap)}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qe{constructor(e,t,i){this.source=e,this.path=t,this.children=i,this.type=ee.MERGE}operationForChild(e){if(b(this.path)){const t=this.children.subtree(new C(e));return t.isEmpty()?null:t.value?new Oe(this.source,E(),t.value):new qe(this.source,E(),t)}else return f(y(this.path)===e,"Can't get a merge for a child not on the path of the operation"),new qe(this.source,S(this.path),this.children)}toString(){return"Operation("+this.path+": "+this.source.toString()+" merge: "+this.children.toString()+")"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class we{constructor(e,t,i){this.node_=e,this.fullyInitialized_=t,this.filtered_=i}isFullyInitialized(){return this.fullyInitialized_}isFiltered(){return this.filtered_}isCompleteForPath(e){if(b(e))return this.isFullyInitialized()&&!this.filtered_;const t=y(e);return this.isCompleteForChild(t)}isCompleteForChild(e){return this.isFullyInitialized()&&!this.filtered_||this.node_.hasChild(e)}getNode(){return this.node_}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class qc{constructor(e){this.query_=e,this.index_=this.query_._queryParams.getIndex()}}function Qc(n,e,t,i){const s=[],r=[];return e.forEach(o=>{o.type==="child_changed"&&n.index_.indexedValueChanged(o.oldSnap,o.snapshotNode)&&r.push(Mc(o.childName,o.snapshotNode))}),ct(n,s,"child_removed",e,i,t),ct(n,s,"child_added",e,i,t),ct(n,s,"child_moved",r,i,t),ct(n,s,"child_changed",e,i,t),ct(n,s,"value",e,i,t),s}function ct(n,e,t,i,s,r){const o=i.filter(a=>a.type===t);o.sort((a,l)=>Xc(n,a,l)),o.forEach(a=>{const l=Yc(n,a,r);s.forEach(c=>{c.respondsTo(a.type)&&e.push(c.createEvent(l,n.query_))})})}function Yc(n,e,t){return e.type==="value"||e.type==="child_removed"||(e.prevName=t.getPredecessorChildName(e.childName,e.snapshotNode,n.index_)),e}function Xc(n,e,t){if(e.childName==null||t.childName==null)throw Je("Should only compare child_ events.");const i=new w(e.childName,e.snapshotNode),s=new w(t.childName,t.snapshotNode);return n.index_.compare(i,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hn(n,e){return{eventCache:n,serverCache:e}}function ut(n,e,t,i){return hn(new we(e,t,i),n.serverCache)}function Kr(n,e,t,i){return hn(n.eventCache,new we(e,t,i))}function Jt(n){return n.eventCache.isFullyInitialized()?n.eventCache.getNode():null}function Me(n){return n.serverCache.isFullyInitialized()?n.serverCache.getNode():null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let Bn;const Jc=()=>(Bn||(Bn=new H(Ol)),Bn);class T{constructor(e,t=Jc()){this.value=e,this.children=t}static fromObject(e){let t=new T(null);return F(e,(i,s)=>{t=t.set(new C(i),s)}),t}isEmpty(){return this.value===null&&this.children.isEmpty()}findRootMostMatchingPathAndValue(e,t){if(this.value!=null&&t(this.value))return{path:E(),value:this.value};if(b(e))return null;{const i=y(e),s=this.children.get(i);if(s!==null){const r=s.findRootMostMatchingPathAndValue(S(e),t);return r!=null?{path:P(new C(i),r.path),value:r.value}:null}else return null}}findRootMostValueAndPath(e){return this.findRootMostMatchingPathAndValue(e,()=>!0)}subtree(e){if(b(e))return this;{const t=y(e),i=this.children.get(t);return i!==null?i.subtree(S(e)):new T(null)}}set(e,t){if(b(e))return new T(t,this.children);{const i=y(e),r=(this.children.get(i)||new T(null)).set(S(e),t),o=this.children.insert(i,r);return new T(this.value,o)}}remove(e){if(b(e))return this.children.isEmpty()?new T(null):new T(null,this.children);{const t=y(e),i=this.children.get(t);if(i){const s=i.remove(S(e));let r;return s.isEmpty()?r=this.children.remove(t):r=this.children.insert(t,s),this.value===null&&r.isEmpty()?new T(null):new T(this.value,r)}else return this}}get(e){if(b(e))return this.value;{const t=y(e),i=this.children.get(t);return i?i.get(S(e)):null}}setTree(e,t){if(b(e))return t;{const i=y(e),r=(this.children.get(i)||new T(null)).setTree(S(e),t);let o;return r.isEmpty()?o=this.children.remove(i):o=this.children.insert(i,r),new T(this.value,o)}}fold(e){return this.fold_(E(),e)}fold_(e,t){const i={};return this.children.inorderTraversal((s,r)=>{i[s]=r.fold_(P(e,s),t)}),t(e,this.value,i)}findOnPath(e,t){return this.findOnPath_(e,E(),t)}findOnPath_(e,t,i){const s=this.value?i(t,this.value):!1;if(s)return s;if(b(e))return null;{const r=y(e),o=this.children.get(r);return o?o.findOnPath_(S(e),P(t,r),i):null}}foreachOnPath(e,t){return this.foreachOnPath_(e,E(),t)}foreachOnPath_(e,t,i){if(b(e))return this;{this.value&&i(t,this.value);const s=y(e),r=this.children.get(s);return r?r.foreachOnPath_(S(e),P(t,s),i):new T(null)}}foreach(e){this.foreach_(E(),e)}foreach_(e,t){this.children.inorderTraversal((i,s)=>{s.foreach_(P(e,i),t)}),this.value&&t(e,this.value)}foreachChild(e){this.children.inorderTraversal((t,i)=>{i.value&&e(t,i.value)})}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class ne{constructor(e){this.writeTree_=e}static empty(){return new ne(new T(null))}}function ht(n,e,t){if(b(e))return new ne(new T(t));{const i=n.writeTree_.findRootMostValueAndPath(e);if(i!=null){const s=i.path;let r=i.value;const o=W(s,e);return r=r.updateChild(o,t),new ne(n.writeTree_.set(s,r))}else{const s=new T(t),r=n.writeTree_.setTree(e,s);return new ne(r)}}}function ri(n,e,t){let i=n;return F(t,(s,r)=>{i=ht(i,P(e,s),r)}),i}function Ms(n,e){if(b(e))return ne.empty();{const t=n.writeTree_.setTree(e,new T(null));return new ne(t)}}function oi(n,e){return Fe(n,e)!=null}function Fe(n,e){const t=n.writeTree_.findRootMostValueAndPath(e);return t!=null?n.writeTree_.get(t.path).getChild(W(t.path,e)):null}function Ls(n){const e=[],t=n.writeTree_.value;return t!=null?t.isLeafNode()||t.forEachChild(x,(i,s)=>{e.push(new w(i,s))}):n.writeTree_.children.inorderTraversal((i,s)=>{s.value!=null&&e.push(new w(i,s.value))}),e}function ge(n,e){if(b(e))return n;{const t=Fe(n,e);return t!=null?new ne(new T(t)):new ne(n.writeTree_.subtree(e))}}function ai(n){return n.writeTree_.isEmpty()}function Qe(n,e){return qr(E(),n.writeTree_,e)}function qr(n,e,t){if(e.value!=null)return t.updateChild(n,e.value);{let i=null;return e.children.inorderTraversal((s,r)=>{s===".priority"?(f(r.value!==null,"Priority writes must always be leaf nodes"),i=r.value):t=qr(P(n,s),r,t)}),!t.getChild(n).isEmpty()&&i!==null&&(t=t.updateChild(P(n,".priority"),i)),t}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function fn(n,e){return Jr(e,n)}function Zc(n,e,t,i,s){f(i>n.lastWriteId,"Stacking an older write on top of newer ones"),s===void 0&&(s=!0),n.allWrites.push({path:e,snap:t,writeId:i,visible:s}),s&&(n.visibleWrites=ht(n.visibleWrites,e,t)),n.lastWriteId=i}function ed(n,e,t,i){f(i>n.lastWriteId,"Stacking an older merge on top of newer ones"),n.allWrites.push({path:e,children:t,writeId:i,visible:!0}),n.visibleWrites=ri(n.visibleWrites,e,t),n.lastWriteId=i}function td(n,e){for(let t=0;t<n.allWrites.length;t++){const i=n.allWrites[t];if(i.writeId===e)return i}return null}function nd(n,e){const t=n.allWrites.findIndex(a=>a.writeId===e);f(t>=0,"removeWrite called with nonexistent writeId.");const i=n.allWrites[t];n.allWrites.splice(t,1);let s=i.visible,r=!1,o=n.allWrites.length-1;for(;s&&o>=0;){const a=n.allWrites[o];a.visible&&(o>=t&&id(a,i.path)?s=!1:Q(i.path,a.path)&&(r=!0)),o--}if(s){if(r)return sd(n),!0;if(i.snap)n.visibleWrites=Ms(n.visibleWrites,i.path);else{const a=i.children;F(a,l=>{n.visibleWrites=Ms(n.visibleWrites,P(i.path,l))})}return!0}else return!1}function id(n,e){if(n.snap)return Q(n.path,e);for(const t in n.children)if(n.children.hasOwnProperty(t)&&Q(P(n.path,t),e))return!0;return!1}function sd(n){n.visibleWrites=Qr(n.allWrites,rd,E()),n.allWrites.length>0?n.lastWriteId=n.allWrites[n.allWrites.length-1].writeId:n.lastWriteId=-1}function rd(n){return n.visible}function Qr(n,e,t){let i=ne.empty();for(let s=0;s<n.length;++s){const r=n[s];if(e(r)){const o=r.path;let a;if(r.snap)Q(t,o)?(a=W(t,o),i=ht(i,a,r.snap)):Q(o,t)&&(a=W(o,t),i=ht(i,E(),r.snap.getChild(a)));else if(r.children){if(Q(t,o))a=W(t,o),i=ri(i,a,r.children);else if(Q(o,t))if(a=W(o,t),b(a))i=ri(i,E(),r.children);else{const l=Re(r.children,y(a));if(l){const c=l.getChild(S(a));i=ht(i,E(),c)}}}else throw Je("WriteRecord should have .snap or .children")}}return i}function Yr(n,e,t,i,s){if(!i&&!s){const r=Fe(n.visibleWrites,e);if(r!=null)return r;{const o=ge(n.visibleWrites,e);if(ai(o))return t;if(t==null&&!oi(o,E()))return null;{const a=t||g.EMPTY_NODE;return Qe(o,a)}}}else{const r=ge(n.visibleWrites,e);if(!s&&ai(r))return t;if(!s&&t==null&&!oi(r,E()))return null;{const o=function(c){return(c.visible||s)&&(!i||!~i.indexOf(c.writeId))&&(Q(c.path,e)||Q(e,c.path))},a=Qr(n.allWrites,o,e),l=t||g.EMPTY_NODE;return Qe(a,l)}}}function od(n,e,t){let i=g.EMPTY_NODE;const s=Fe(n.visibleWrites,e);if(s)return s.isLeafNode()||s.forEachChild(x,(r,o)=>{i=i.updateImmediateChild(r,o)}),i;if(t){const r=ge(n.visibleWrites,e);return t.forEachChild(x,(o,a)=>{const l=Qe(ge(r,new C(o)),a);i=i.updateImmediateChild(o,l)}),Ls(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}else{const r=ge(n.visibleWrites,e);return Ls(r).forEach(o=>{i=i.updateImmediateChild(o.name,o.node)}),i}}function ad(n,e,t,i,s){f(i||s,"Either existingEventSnap or existingServerSnap must exist");const r=P(e,t);if(oi(n.visibleWrites,r))return null;{const o=ge(n.visibleWrites,r);return ai(o)?s.getChild(t):Qe(o,s.getChild(t))}}function ld(n,e,t,i){const s=P(e,t),r=Fe(n.visibleWrites,s);if(r!=null)return r;if(i.isCompleteForChild(t)){const o=ge(n.visibleWrites,s);return Qe(o,i.getNode().getImmediateChild(t))}else return null}function cd(n,e){return Fe(n.visibleWrites,e)}function dd(n,e,t,i,s,r,o){let a;const l=ge(n.visibleWrites,e),c=Fe(l,E());if(c!=null)a=c;else if(t!=null)a=Qe(l,t);else return[];if(a=a.withIndex(o),!a.isEmpty()&&!a.isLeafNode()){const u=[],d=o.getCompare(),h=r?a.getReverseIteratorFrom(i,o):a.getIteratorFrom(i,o);let p=h.getNext();for(;p&&u.length<s;)d(p,i)!==0&&u.push(p),p=h.getNext();return u}else return[]}function ud(){return{visibleWrites:ne.empty(),allWrites:[],lastWriteId:-1}}function Zt(n,e,t,i){return Yr(n.writeTree,n.treePath,e,t,i)}function Di(n,e){return od(n.writeTree,n.treePath,e)}function $s(n,e,t,i){return ad(n.writeTree,n.treePath,e,t,i)}function en(n,e){return cd(n.writeTree,P(n.treePath,e))}function hd(n,e,t,i,s,r){return dd(n.writeTree,n.treePath,e,t,i,s,r)}function Oi(n,e,t){return ld(n.writeTree,n.treePath,e,t)}function Xr(n,e){return Jr(P(n.treePath,e),n.writeTree)}function Jr(n,e){return{treePath:n,writeTree:e}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class fd{constructor(){this.changeMap=new Map}trackChildChange(e){const t=e.type,i=e.childName;f(t==="child_added"||t==="child_changed"||t==="child_removed","Only child changes supported for tracking"),f(i!==".priority","Only non-priority child changes can be tracked.");const s=this.changeMap.get(i);if(s){const r=s.type;if(t==="child_added"&&r==="child_removed")this.changeMap.set(i,yt(i,e.snapshotNode,s.snapshotNode));else if(t==="child_removed"&&r==="child_added")this.changeMap.delete(i);else if(t==="child_removed"&&r==="child_changed")this.changeMap.set(i,vt(i,s.oldSnap));else if(t==="child_changed"&&r==="child_added")this.changeMap.set(i,Ke(i,e.snapshotNode));else if(t==="child_changed"&&r==="child_changed")this.changeMap.set(i,yt(i,e.snapshotNode,s.oldSnap));else throw Je("Illegal combination of changes: "+e+" occurred after "+s)}else this.changeMap.set(i,e)}getChanges(){return Array.from(this.changeMap.values())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class pd{getCompleteChild(e){return null}getChildAfterChild(e,t,i){return null}}const Zr=new pd;class Mi{constructor(e,t,i=null){this.writes_=e,this.viewCache_=t,this.optCompleteServerCache_=i}getCompleteChild(e){const t=this.viewCache_.eventCache;if(t.isCompleteForChild(e))return t.getNode().getImmediateChild(e);{const i=this.optCompleteServerCache_!=null?new we(this.optCompleteServerCache_,!0,!1):this.viewCache_.serverCache;return Oi(this.writes_,e,i)}}getChildAfterChild(e,t,i){const s=this.optCompleteServerCache_!=null?this.optCompleteServerCache_:Me(this.viewCache_),r=hd(this.writes_,s,t,1,i,e);return r.length===0?null:r[0]}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function md(n){return{filter:n}}function _d(n,e){f(e.eventCache.getNode().isIndexed(n.filter.getIndex()),"Event snap not indexed"),f(e.serverCache.getNode().isIndexed(n.filter.getIndex()),"Server snap not indexed")}function gd(n,e,t,i,s){const r=new fd;let o,a;if(t.type===ee.OVERWRITE){const c=t;c.source.fromUser?o=li(n,e,c.path,c.snap,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered()&&!b(c.path),o=tn(n,e,c.path,c.snap,i,s,a,r))}else if(t.type===ee.MERGE){const c=t;c.source.fromUser?o=yd(n,e,c.path,c.children,i,s,r):(f(c.source.fromServer,"Unknown source."),a=c.source.tagged||e.serverCache.isFiltered(),o=ci(n,e,c.path,c.children,i,s,a,r))}else if(t.type===ee.ACK_USER_WRITE){const c=t;c.revert?o=Ed(n,e,c.path,i,s,r):o=bd(n,e,c.path,c.affectedTree,i,s,r)}else if(t.type===ee.LISTEN_COMPLETE)o=wd(n,e,t.path,i,r);else throw Je("Unknown operation type: "+t.type);const l=r.getChanges();return vd(e,o,l),{viewCache:o,changes:l}}function vd(n,e,t){const i=e.eventCache;if(i.isFullyInitialized()){const s=i.getNode().isLeafNode()||i.getNode().isEmpty(),r=Jt(n);(t.length>0||!n.eventCache.isFullyInitialized()||s&&!i.getNode().equals(r)||!i.getNode().getPriority().equals(r.getPriority()))&&t.push(Gr(Jt(e)))}}function eo(n,e,t,i,s,r){const o=e.eventCache;if(en(i,t)!=null)return e;{let a,l;if(b(t))if(f(e.serverCache.isFullyInitialized(),"If change path is empty, we must have complete server data"),e.serverCache.isFiltered()){const c=Me(e),u=c instanceof g?c:g.EMPTY_NODE,d=Di(i,u);a=n.filter.updateFullNode(e.eventCache.getNode(),d,r)}else{const c=Zt(i,Me(e));a=n.filter.updateFullNode(e.eventCache.getNode(),c,r)}else{const c=y(t);if(c===".priority"){f(be(t)===1,"Can't have a priority with additional path components");const u=o.getNode();l=e.serverCache.getNode();const d=$s(i,t,u,l);d!=null?a=n.filter.updatePriority(u,d):a=o.getNode()}else{const u=S(t);let d;if(o.isCompleteForChild(c)){l=e.serverCache.getNode();const h=$s(i,t,o.getNode(),l);h!=null?d=o.getNode().getImmediateChild(c).updateChild(u,h):d=o.getNode().getImmediateChild(c)}else d=Oi(i,c,e.serverCache);d!=null?a=n.filter.updateChild(o.getNode(),c,d,u,s,r):a=o.getNode()}}return ut(e,a,o.isFullyInitialized()||b(t),n.filter.filtersNodes())}}function tn(n,e,t,i,s,r,o,a){const l=e.serverCache;let c;const u=o?n.filter:n.filter.getIndexedFilter();if(b(t))c=u.updateFullNode(l.getNode(),i,null);else if(u.filtersNodes()&&!l.isFiltered()){const p=l.getNode().updateChild(t,i);c=u.updateFullNode(l.getNode(),p,null)}else{const p=y(t);if(!l.isCompleteForPath(t)&&be(t)>1)return e;const _=S(t),B=l.getNode().getImmediateChild(p).updateChild(_,i);p===".priority"?c=u.updatePriority(l.getNode(),B):c=u.updateChild(l.getNode(),p,B,_,Zr,null)}const d=Kr(e,c,l.isFullyInitialized()||b(t),u.filtersNodes()),h=new Mi(s,d,r);return eo(n,d,t,s,h,a)}function li(n,e,t,i,s,r,o){const a=e.eventCache;let l,c;const u=new Mi(s,e,r);if(b(t))c=n.filter.updateFullNode(e.eventCache.getNode(),i,o),l=ut(e,c,!0,n.filter.filtersNodes());else{const d=y(t);if(d===".priority")c=n.filter.updatePriority(e.eventCache.getNode(),i),l=ut(e,c,a.isFullyInitialized(),a.isFiltered());else{const h=S(t),p=a.getNode().getImmediateChild(d);let _;if(b(h))_=i;else{const I=u.getCompleteChild(d);I!=null?Ci(h)===".priority"&&I.getChild(Br(h)).isEmpty()?_=I:_=I.updateChild(h,i):_=g.EMPTY_NODE}if(p.equals(_))l=e;else{const I=n.filter.updateChild(a.getNode(),d,_,h,u,o);l=ut(e,I,a.isFullyInitialized(),n.filter.filtersNodes())}}}return l}function Fs(n,e){return n.eventCache.isCompleteForChild(e)}function yd(n,e,t,i,s,r,o){let a=e;return i.foreach((l,c)=>{const u=P(t,l);Fs(e,y(u))&&(a=li(n,a,u,c,s,r,o))}),i.foreach((l,c)=>{const u=P(t,l);Fs(e,y(u))||(a=li(n,a,u,c,s,r,o))}),a}function Bs(n,e,t){return t.foreach((i,s)=>{e=e.updateChild(i,s)}),e}function ci(n,e,t,i,s,r,o,a){if(e.serverCache.getNode().isEmpty()&&!e.serverCache.isFullyInitialized())return e;let l=e,c;b(t)?c=i:c=new T(null).setTree(t,i);const u=e.serverCache.getNode();return c.children.inorderTraversal((d,h)=>{if(u.hasChild(d)){const p=e.serverCache.getNode().getImmediateChild(d),_=Bs(n,p,h);l=tn(n,l,new C(d),_,s,r,o,a)}}),c.children.inorderTraversal((d,h)=>{const p=!e.serverCache.isCompleteForChild(d)&&h.value===null;if(!u.hasChild(d)&&!p){const _=e.serverCache.getNode().getImmediateChild(d),I=Bs(n,_,h);l=tn(n,l,new C(d),I,s,r,o,a)}}),l}function bd(n,e,t,i,s,r,o){if(en(s,t)!=null)return e;const a=e.serverCache.isFiltered(),l=e.serverCache;if(i.value!=null){if(b(t)&&l.isFullyInitialized()||l.isCompleteForPath(t))return tn(n,e,t,l.getNode().getChild(t),s,r,a,o);if(b(t)){let c=new T(null);return l.getNode().forEachChild(re,(u,d)=>{c=c.set(new C(u),d)}),ci(n,e,t,c,s,r,a,o)}else return e}else{let c=new T(null);return i.foreach((u,d)=>{const h=P(t,u);l.isCompleteForPath(h)&&(c=c.set(u,l.getNode().getChild(h)))}),ci(n,e,t,c,s,r,a,o)}}function wd(n,e,t,i,s){const r=e.serverCache,o=Kr(e,r.getNode(),r.isFullyInitialized()||b(t),r.isFiltered());return eo(n,o,t,i,Zr,s)}function Ed(n,e,t,i,s,r){let o;if(en(i,t)!=null)return e;{const a=new Mi(i,e,s),l=e.eventCache.getNode();let c;if(b(t)||y(t)===".priority"){let u;if(e.serverCache.isFullyInitialized())u=Zt(i,Me(e));else{const d=e.serverCache.getNode();f(d instanceof g,"serverChildren would be complete if leaf node"),u=Di(i,d)}u=u,c=n.filter.updateFullNode(l,u,r)}else{const u=y(t);let d=Oi(i,u,e.serverCache);d==null&&e.serverCache.isCompleteForChild(u)&&(d=l.getImmediateChild(u)),d!=null?c=n.filter.updateChild(l,u,d,S(t),a,r):e.eventCache.getNode().hasChild(u)?c=n.filter.updateChild(l,u,g.EMPTY_NODE,S(t),a,r):c=l,c.isEmpty()&&e.serverCache.isFullyInitialized()&&(o=Zt(i,Me(e)),o.isLeafNode()&&(c=n.filter.updateFullNode(c,o,r)))}return o=e.serverCache.isFullyInitialized()||en(i,E())!=null,ut(e,c,o,n.filter.filtersNodes())}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Cd{constructor(e,t){this.query_=e,this.eventRegistrations_=[];const i=this.query_._queryParams,s=new Ai(i.getIndex()),r=$c(i);this.processor_=md(r);const o=t.serverCache,a=t.eventCache,l=s.updateFullNode(g.EMPTY_NODE,o.getNode(),null),c=r.updateFullNode(g.EMPTY_NODE,a.getNode(),null),u=new we(l,o.isFullyInitialized(),s.filtersNodes()),d=new we(c,a.isFullyInitialized(),r.filtersNodes());this.viewCache_=hn(d,u),this.eventGenerator_=new qc(this.query_)}get query(){return this.query_}}function Id(n){return n.viewCache_.serverCache.getNode()}function Sd(n){return Jt(n.viewCache_)}function Td(n,e){const t=Me(n.viewCache_);return t&&(n.query._queryParams.loadsAllData()||!b(e)&&!t.getImmediateChild(y(e)).isEmpty())?t.getChild(e):null}function Us(n){return n.eventRegistrations_.length===0}function kd(n,e){n.eventRegistrations_.push(e)}function Ws(n,e,t){const i=[];if(t){f(e==null,"A cancel should cancel all event registrations.");const s=n.query._path;n.eventRegistrations_.forEach(r=>{const o=r.createCancelEvent(t,s);o&&i.push(o)})}if(e){let s=[];for(let r=0;r<n.eventRegistrations_.length;++r){const o=n.eventRegistrations_[r];if(!o.matches(e))s.push(o);else if(e.hasAnyCallback()){s=s.concat(n.eventRegistrations_.slice(r+1));break}}n.eventRegistrations_=s}else n.eventRegistrations_=[];return i}function Hs(n,e,t,i){e.type===ee.MERGE&&e.source.queryId!==null&&(f(Me(n.viewCache_),"We should always have a full cache before handling merges"),f(Jt(n.viewCache_),"Missing event cache, even though we have a server cache"));const s=n.viewCache_,r=gd(n.processor_,s,e,t,i);return _d(n.processor_,r.viewCache),f(r.viewCache.serverCache.isFullyInitialized()||!s.serverCache.isFullyInitialized(),"Once a server snap is complete, it should never go back"),n.viewCache_=r.viewCache,to(n,r.changes,r.viewCache.eventCache.getNode(),null)}function xd(n,e){const t=n.viewCache_.eventCache,i=[];return t.getNode().isLeafNode()||t.getNode().forEachChild(x,(r,o)=>{i.push(Ke(r,o))}),t.isFullyInitialized()&&i.push(Gr(t.getNode())),to(n,i,t.getNode(),e)}function to(n,e,t,i){const s=i?[i]:n.eventRegistrations_;return Qc(n.eventGenerator_,e,t,s)}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let nn;class no{constructor(){this.views=new Map}}function Ad(n){f(!nn,"__referenceConstructor has already been defined"),nn=n}function Pd(){return f(nn,"Reference.ts has not been loaded"),nn}function Rd(n){return n.views.size===0}function Li(n,e,t,i){const s=e.source.queryId;if(s!==null){const r=n.views.get(s);return f(r!=null,"SyncTree gave us an op for an invalid query."),Hs(r,e,t,i)}else{let r=[];for(const o of n.views.values())r=r.concat(Hs(o,e,t,i));return r}}function io(n,e,t,i,s){const r=e._queryIdentifier,o=n.views.get(r);if(!o){let a=Zt(t,s?i:null),l=!1;a?l=!0:i instanceof g?(a=Di(t,i),l=!1):(a=g.EMPTY_NODE,l=!1);const c=hn(new we(a,l,!1),new we(i,s,!1));return new Cd(e,c)}return o}function Nd(n,e,t,i,s,r){const o=io(n,e,i,s,r);return n.views.has(e._queryIdentifier)||n.views.set(e._queryIdentifier,o),kd(o,t),xd(o,t)}function Dd(n,e,t,i){const s=e._queryIdentifier,r=[];let o=[];const a=Ee(n);if(s==="default")for(const[l,c]of n.views.entries())o=o.concat(Ws(c,t,i)),Us(c)&&(n.views.delete(l),c.query._queryParams.loadsAllData()||r.push(c.query));else{const l=n.views.get(s);l&&(o=o.concat(Ws(l,t,i)),Us(l)&&(n.views.delete(s),l.query._queryParams.loadsAllData()||r.push(l.query)))}return a&&!Ee(n)&&r.push(new(Pd())(e._repo,e._path)),{removed:r,events:o}}function so(n){const e=[];for(const t of n.views.values())t.query._queryParams.loadsAllData()||e.push(t);return e}function ve(n,e){let t=null;for(const i of n.views.values())t=t||Td(i,e);return t}function ro(n,e){if(e._queryParams.loadsAllData())return pn(n);{const i=e._queryIdentifier;return n.views.get(i)}}function oo(n,e){return ro(n,e)!=null}function Ee(n){return pn(n)!=null}function pn(n){for(const e of n.views.values())if(e.query._queryParams.loadsAllData())return e;return null}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */let sn;function Od(n){f(!sn,"__referenceConstructor has already been defined"),sn=n}function Md(){return f(sn,"Reference.ts has not been loaded"),sn}let Ld=1;class js{constructor(e){this.listenProvider_=e,this.syncPointTree_=new T(null),this.pendingWriteTree_=ud(),this.tagToQueryMap=new Map,this.queryToTagMap=new Map}}function $i(n,e,t,i,s){return Zc(n.pendingWriteTree_,e,t,i,s),s?tt(n,new Oe(Pi(),e,t)):[]}function $d(n,e,t,i){ed(n.pendingWriteTree_,e,t,i);const s=T.fromObject(t);return tt(n,new qe(Pi(),e,s))}function pe(n,e,t=!1){const i=td(n.pendingWriteTree_,e);if(nd(n.pendingWriteTree_,e)){let r=new T(null);return i.snap!=null?r=r.set(E(),!0):F(i.children,o=>{r=r.set(new C(o),!0)}),tt(n,new Xt(i.path,r,t))}else return[]}function At(n,e,t){return tt(n,new Oe(Ri(),e,t))}function Fd(n,e,t){const i=T.fromObject(t);return tt(n,new qe(Ri(),e,i))}function Bd(n,e){return tt(n,new wt(Ri(),e))}function Ud(n,e,t){const i=Fi(n,t);if(i){const s=Bi(i),r=s.path,o=s.queryId,a=W(r,e),l=new wt(Ni(o),a);return Ui(n,r,l)}else return[]}function rn(n,e,t,i,s=!1){const r=e._path,o=n.syncPointTree_.get(r);let a=[];if(o&&(e._queryIdentifier==="default"||oo(o,e))){const l=Dd(o,e,t,i);Rd(o)&&(n.syncPointTree_=n.syncPointTree_.remove(r));const c=l.removed;if(a=l.events,!s){const u=c.findIndex(h=>h._queryParams.loadsAllData())!==-1,d=n.syncPointTree_.findOnPath(r,(h,p)=>Ee(p));if(u&&!d){const h=n.syncPointTree_.subtree(r);if(!h.isEmpty()){const p=jd(h);for(let _=0;_<p.length;++_){const I=p[_],B=I.query,Ue=uo(n,I);n.listenProvider_.startListening(ft(B),Et(n,B),Ue.hashFn,Ue.onComplete)}}}!d&&c.length>0&&!i&&(u?n.listenProvider_.stopListening(ft(e),null):c.forEach(h=>{const p=n.queryToTagMap.get(_n(h));n.listenProvider_.stopListening(ft(h),p)}))}Vd(n,c)}return a}function ao(n,e,t,i){const s=Fi(n,i);if(s!=null){const r=Bi(s),o=r.path,a=r.queryId,l=W(o,e),c=new Oe(Ni(a),l,t);return Ui(n,o,c)}else return[]}function Wd(n,e,t,i){const s=Fi(n,i);if(s){const r=Bi(s),o=r.path,a=r.queryId,l=W(o,e),c=T.fromObject(t),u=new qe(Ni(a),l,c);return Ui(n,o,u)}else return[]}function di(n,e,t,i=!1){const s=e._path;let r=null,o=!1;n.syncPointTree_.foreachOnPath(s,(h,p)=>{const _=W(h,s);r=r||ve(p,_),o=o||Ee(p)});let a=n.syncPointTree_.get(s);a?(o=o||Ee(a),r=r||ve(a,E())):(a=new no,n.syncPointTree_=n.syncPointTree_.set(s,a));let l;r!=null?l=!0:(l=!1,r=g.EMPTY_NODE,n.syncPointTree_.subtree(s).foreachChild((p,_)=>{const I=ve(_,E());I&&(r=r.updateImmediateChild(p,I))}));const c=oo(a,e);if(!c&&!e._queryParams.loadsAllData()){const h=_n(e);f(!n.queryToTagMap.has(h),"View does not exist, but we have a tag");const p=zd();n.queryToTagMap.set(h,p),n.tagToQueryMap.set(p,h)}const u=fn(n.pendingWriteTree_,s);let d=Nd(a,e,t,u,r,l);if(!c&&!o&&!i){const h=ro(a,e);d=d.concat(Gd(n,e,h))}return d}function mn(n,e,t){const s=n.pendingWriteTree_,r=n.syncPointTree_.findOnPath(e,(o,a)=>{const l=W(o,e),c=ve(a,l);if(c)return c});return Yr(s,e,r,t,!0)}function Hd(n,e){const t=e._path;let i=null;n.syncPointTree_.foreachOnPath(t,(c,u)=>{const d=W(c,t);i=i||ve(u,d)});let s=n.syncPointTree_.get(t);s?i=i||ve(s,E()):(s=new no,n.syncPointTree_=n.syncPointTree_.set(t,s));const r=i!=null,o=r?new we(i,!0,!1):null,a=fn(n.pendingWriteTree_,e._path),l=io(s,e,a,r?o.getNode():g.EMPTY_NODE,r);return Sd(l)}function tt(n,e){return lo(e,n.syncPointTree_,null,fn(n.pendingWriteTree_,E()))}function lo(n,e,t,i){if(b(n.path))return co(n,e,t,i);{const s=e.get(E());t==null&&s!=null&&(t=ve(s,E()));let r=[];const o=y(n.path),a=n.operationForChild(o),l=e.children.get(o);if(l&&a){const c=t?t.getImmediateChild(o):null,u=Xr(i,o);r=r.concat(lo(a,l,c,u))}return s&&(r=r.concat(Li(s,n,i,t))),r}}function co(n,e,t,i){const s=e.get(E());t==null&&s!=null&&(t=ve(s,E()));let r=[];return e.children.inorderTraversal((o,a)=>{const l=t?t.getImmediateChild(o):null,c=Xr(i,o),u=n.operationForChild(o);u&&(r=r.concat(co(u,a,l,c)))}),s&&(r=r.concat(Li(s,n,i,t))),r}function uo(n,e){const t=e.query,i=Et(n,t);return{hashFn:()=>(Id(e)||g.EMPTY_NODE).hash(),onComplete:s=>{if(s==="ok")return i?Ud(n,t._path,i):Bd(n,t._path);{const r=$l(s,t);return rn(n,t,null,r)}}}}function Et(n,e){const t=_n(e);return n.queryToTagMap.get(t)}function _n(n){return n._path.toString()+"$"+n._queryIdentifier}function Fi(n,e){return n.tagToQueryMap.get(e)}function Bi(n){const e=n.indexOf("$");return f(e!==-1&&e<n.length-1,"Bad queryKey."),{queryId:n.substr(e+1),path:new C(n.substr(0,e))}}function Ui(n,e,t){const i=n.syncPointTree_.get(e);f(i,"Missing sync point for query tag that we're tracking");const s=fn(n.pendingWriteTree_,e);return Li(i,t,s,null)}function jd(n){return n.fold((e,t,i)=>{if(t&&Ee(t))return[pn(t)];{let s=[];return t&&(s=so(t)),F(i,(r,o)=>{s=s.concat(o)}),s}})}function ft(n){return n._queryParams.loadsAllData()&&!n._queryParams.isDefault()?new(Md())(n._repo,n._path):n}function Vd(n,e){for(let t=0;t<e.length;++t){const i=e[t];if(!i._queryParams.loadsAllData()){const s=_n(i),r=n.queryToTagMap.get(s);n.queryToTagMap.delete(s),n.tagToQueryMap.delete(r)}}}function zd(){return Ld++}function Gd(n,e,t){const i=e._path,s=Et(n,e),r=uo(n,t),o=n.listenProvider_.startListening(ft(e),s,r.hashFn,r.onComplete),a=n.syncPointTree_.subtree(i);if(s)f(!Ee(a.value),"If we're adding a query, it shouldn't be shadowed");else{const l=a.fold((c,u,d)=>{if(!b(c)&&u&&Ee(u))return[pn(u).query];{let h=[];return u&&(h=h.concat(so(u).map(p=>p.query))),F(d,(p,_)=>{h=h.concat(_)}),h}});for(let c=0;c<l.length;++c){const u=l[c];n.listenProvider_.stopListening(ft(u),Et(n,u))}}return o}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Wi{constructor(e){this.node_=e}getImmediateChild(e){const t=this.node_.getImmediateChild(e);return new Wi(t)}node(){return this.node_}}class Hi{constructor(e,t){this.syncTree_=e,this.path_=t}getImmediateChild(e){const t=P(this.path_,e);return new Hi(this.syncTree_,t)}node(){return mn(this.syncTree_,this.path_)}}const Kd=function(n){return n=n||{},n.timestamp=n.timestamp||new Date().getTime(),n},Vs=function(n,e,t){if(!n||typeof n!="object")return n;if(f(".sv"in n,"Unexpected leaf node or priority contents"),typeof n[".sv"]=="string")return qd(n[".sv"],e,t);if(typeof n[".sv"]=="object")return Qd(n[".sv"],e);f(!1,"Unexpected server value: "+JSON.stringify(n,null,2))},qd=function(n,e,t){switch(n){case"timestamp":return t.timestamp;default:f(!1,"Unexpected server value: "+n)}},Qd=function(n,e,t){n.hasOwnProperty("increment")||f(!1,"Unexpected server value: "+JSON.stringify(n,null,2));const i=n.increment;typeof i!="number"&&f(!1,"Unexpected increment value: "+i);const s=e.node();if(f(s!==null&&typeof s<"u","Expected ChildrenNode.EMPTY_NODE for nulls"),!s.isLeafNode())return i;const o=s.getValue();return typeof o!="number"?i:o+i},ho=function(n,e,t,i){return Vi(e,new Hi(t,n),i)},ji=function(n,e,t){return Vi(n,new Wi(e),t)};function Vi(n,e,t){const i=n.getPriority().val(),s=Vs(i,e.getImmediateChild(".priority"),t);let r;if(n.isLeafNode()){const o=n,a=Vs(o.getValue(),e,t);return a!==o.getValue()||s!==o.getPriority().val()?new M(a,N(s)):n}else{const o=n;return r=o,s!==o.getPriority().val()&&(r=r.updatePriority(new M(s))),o.forEachChild(x,(a,l)=>{const c=Vi(l,e.getImmediateChild(a),t);c!==l&&(r=r.updateImmediateChild(a,c))}),r}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class zi{constructor(e="",t=null,i={children:{},childCount:0}){this.name=e,this.parent=t,this.node=i}}function gn(n,e){let t=e instanceof C?e:new C(e),i=n,s=y(t);for(;s!==null;){const r=Re(i.node.children,s)||{children:{},childCount:0};i=new zi(s,i,r),t=S(t),s=y(t)}return i}function Be(n){return n.node.value}function Gi(n,e){n.node.value=e,ui(n)}function fo(n){return n.node.childCount>0}function Yd(n){return Be(n)===void 0&&!fo(n)}function vn(n,e){F(n.node.children,(t,i)=>{e(new zi(t,n,i))})}function po(n,e,t,i){t&&e(n),vn(n,s=>{po(s,e,!0)})}function Xd(n,e,t){let i=n.parent;for(;i!==null;){if(e(i))return!0;i=i.parent}return!1}function Pt(n){return new C(n.parent===null?n.name:Pt(n.parent)+"/"+n.name)}function ui(n){n.parent!==null&&Jd(n.parent,n.name,n)}function Jd(n,e,t){const i=Yd(t),s=se(n.node.children,e);i&&s?(delete n.node.children[e],n.node.childCount--,ui(n)):!i&&!s&&(n.node.children[e]=t.node,n.node.childCount++,ui(n))}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const Zd=/[\[\].#$\/\u0000-\u001F\u007F]/,eu=/[\[\].#$\u0000-\u001F\u007F]/,Un=10*1024*1024,yn=function(n){return typeof n=="string"&&n.length!==0&&!Zd.test(n)},mo=function(n){return typeof n=="string"&&n.length!==0&&!eu.test(n)},tu=function(n){return n&&(n=n.replace(/^\/*\.info(\/|$)/,"/")),mo(n)},Ct=function(n){return n===null||typeof n=="string"||typeof n=="number"&&!ln(n)||n&&typeof n=="object"&&se(n,".sv")},ae=function(n,e,t,i){i&&e===void 0||Rt(Ne(n,"value"),e,t)},Rt=function(n,e,t){const i=t instanceof C?new gc(t,n):t;if(e===void 0)throw new Error(n+"contains undefined "+xe(i));if(typeof e=="function")throw new Error(n+"contains a function "+xe(i)+" with contents = "+e.toString());if(ln(e))throw new Error(n+"contains "+e.toString()+" "+xe(i));if(typeof e=="string"&&e.length>Un/3&&an(e)>Un)throw new Error(n+"contains a string greater than "+Un+" utf8 bytes "+xe(i)+" ('"+e.substring(0,50)+"...')");if(e&&typeof e=="object"){let s=!1,r=!1;if(F(e,(o,a)=>{if(o===".value")s=!0;else if(o!==".priority"&&o!==".sv"&&(r=!0,!yn(o)))throw new Error(n+" contains an invalid key ("+o+") "+xe(i)+`.  Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`);vc(i,o),Rt(n,a,i),yc(i)}),s&&r)throw new Error(n+' contains ".value" child '+xe(i)+" in addition to actual children.")}},nu=function(n,e){let t,i;for(t=0;t<e.length;t++){i=e[t];const r=gt(i);for(let o=0;o<r.length;o++)if(!(r[o]===".priority"&&o===r.length-1)){if(!yn(r[o]))throw new Error(n+"contains an invalid key ("+r[o]+") in path "+i.toString()+`. Keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]"`)}}e.sort(_c);let s=null;for(t=0;t<e.length;t++){if(i=e[t],s!==null&&Q(s,i))throw new Error(n+"contains a path "+s.toString()+" that is ancestor of another path "+i.toString());s=i}},_o=function(n,e,t,i){const s=Ne(n,"values");if(!(e&&typeof e=="object")||Array.isArray(e))throw new Error(s+" must be an object containing the children to replace.");const r=[];F(e,(o,a)=>{const l=new C(o);if(Rt(s,a,P(t,l)),Ci(l)===".priority"&&!Ct(a))throw new Error(s+"contains an invalid value for '"+l.toString()+"', which must be a valid Firebase priority (a string, finite number, server value, or null).");r.push(l)}),nu(s,r)},Ki=function(n,e,t){if(ln(e))throw new Error(Ne(n,"priority")+"is "+e.toString()+", but must be a valid Firebase priority (a string, finite number, server value, or null).");if(!Ct(e))throw new Error(Ne(n,"priority")+"must be a valid Firebase priority (a string, finite number, server value, or null).")},Nt=function(n,e,t,i){if(t!==void 0&&!yn(t))throw new Error(Ne(n,e)+'was an invalid key = "'+t+`".  Firebase keys must be non-empty strings and can't contain ".", "#", "$", "/", "[", or "]").`)},bn=function(n,e,t,i){if(!(i&&t===void 0)&&!mo(t))throw new Error(Ne(n,e)+'was an invalid path = "'+t+`". Paths must be non-empty strings and can't contain ".", "#", "$", "[", or "]"`)},iu=function(n,e,t,i){t&&(t=t.replace(/^\/*\.info(\/|$)/,"/")),bn(n,e,t,i)},te=function(n,e){if(y(e)===".info")throw new Error(n+" failed = Can't modify data under /.info/")},go=function(n,e){const t=e.path.toString();if(typeof e.repoInfo.host!="string"||e.repoInfo.host.length===0||!yn(e.repoInfo.namespace)&&e.repoInfo.host.split(":")[0]!=="localhost"||t.length!==0&&!tu(t))throw new Error(Ne(n,"url")+`must be a valid firebase URL and the path can't contain ".", "#", "$", "[", or "]".`)};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class su{constructor(){this.eventLists_=[],this.recursionDepth_=0}}function wn(n,e){let t=null;for(let i=0;i<e.length;i++){const s=e[i],r=s.getPath();t!==null&&!Ii(r,t.path)&&(n.eventLists_.push(t),t=null),t===null&&(t={events:[],path:r}),t.events.push(s)}t&&n.eventLists_.push(t)}function vo(n,e,t){wn(n,t),yo(n,i=>Ii(i,e))}function G(n,e,t){wn(n,t),yo(n,i=>Q(i,e)||Q(e,i))}function yo(n,e){n.recursionDepth_++;let t=!0;for(let i=0;i<n.eventLists_.length;i++){const s=n.eventLists_[i];if(s){const r=s.path;e(r)?(ru(n.eventLists_[i]),n.eventLists_[i]=null):t=!1}}t&&(n.eventLists_=[]),n.recursionDepth_--}function ru(n){for(let e=0;e<n.events.length;e++){const t=n.events[e];if(t!==null){n.events[e]=null;const i=t.getEventRunner();Pe&&$("event: "+t.toString()),Ze(i)}}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const bo="repo_interrupt",ou=25;class au{constructor(e,t,i,s){this.repoInfo_=e,this.forceRestClient_=t,this.authTokenProvider_=i,this.appCheckProvider_=s,this.dataUpdateCount=0,this.statsListener_=null,this.eventQueue_=new su,this.nextWriteId_=1,this.interceptServerDataCallback_=null,this.onDisconnect_=Yt(),this.transactionQueueTree_=new zi,this.persistentConnection_=null,this.key=this.repoInfo_.toURLString()}toString(){return(this.repoInfo_.secure?"https://":"http://")+this.repoInfo_.host}}function lu(n,e,t){if(n.stats_=wi(n.repoInfo_),n.forceRestClient_||Wl())n.server_=new Qt(n.repoInfo_,(i,s,r,o)=>{zs(n,i,s,r,o)},n.authTokenProvider_,n.appCheckProvider_),setTimeout(()=>Gs(n,!0),0);else{if(typeof t<"u"&&t!==null){if(typeof t!="object")throw new Error("Only objects are supported for option databaseAuthVariableOverride");try{O(t)}catch(i){throw new Error("Invalid authOverride provided: "+i)}}n.persistentConnection_=new Y(n.repoInfo_,e,(i,s,r,o)=>{zs(n,i,s,r,o)},i=>{Gs(n,i)},i=>{cu(n,i)},n.authTokenProvider_,n.appCheckProvider_,t),n.server_=n.persistentConnection_}n.authTokenProvider_.addTokenChangeListener(i=>{n.server_.refreshAuthToken(i)}),n.appCheckProvider_.addTokenChangeListener(i=>{n.server_.refreshAppCheckToken(i.token)}),n.statsReporter_=Gl(n.repoInfo_,()=>new Kc(n.stats_,n.server_)),n.infoData_=new Hc,n.infoSyncTree_=new js({startListening:(i,s,r,o)=>{let a=[];const l=n.infoData_.getNode(i._path);return l.isEmpty()||(a=At(n.infoSyncTree_,i._path,l),setTimeout(()=>{o("ok")},0)),a},stopListening:()=>{}}),qi(n,"connected",!1),n.serverSyncTree_=new js({startListening:(i,s,r,o)=>(n.server_.listen(i,r,s,(a,l)=>{const c=o(a,l);G(n.eventQueue_,i._path,c)}),[]),stopListening:(i,s)=>{n.server_.unlisten(i,s)}})}function wo(n){const t=n.infoData_.getNode(new C(".info/serverTimeOffset")).val()||0;return new Date().getTime()+t}function Dt(n){return Kd({timestamp:wo(n)})}function zs(n,e,t,i,s){n.dataUpdateCount++;const r=new C(e);t=n.interceptServerDataCallback_?n.interceptServerDataCallback_(e,t):t;let o=[];if(s)if(i){const l=jt(t,c=>N(c));o=Wd(n.serverSyncTree_,r,l,s)}else{const l=N(t);o=ao(n.serverSyncTree_,r,l,s)}else if(i){const l=jt(t,c=>N(c));o=Fd(n.serverSyncTree_,r,l)}else{const l=N(t);o=At(n.serverSyncTree_,r,l)}let a=r;o.length>0&&(a=Ye(n,r)),G(n.eventQueue_,a,o)}function Gs(n,e){qi(n,"connected",e),e===!1&&hu(n)}function cu(n,e){F(e,(t,i)=>{qi(n,t,i)})}function qi(n,e,t){const i=new C("/.info/"+e),s=N(t);n.infoData_.updateSnapshot(i,s);const r=At(n.infoSyncTree_,i,s);G(n.eventQueue_,i,r)}function En(n){return n.nextWriteId_++}function du(n,e,t){const i=Hd(n.serverSyncTree_,e);return i!=null?Promise.resolve(i):n.server_.get(e).then(s=>{const r=N(s).withIndex(e._queryParams.getIndex());di(n.serverSyncTree_,e,t,!0);let o;if(e._queryParams.loadsAllData())o=At(n.serverSyncTree_,e._path,r);else{const a=Et(n.serverSyncTree_,e);o=ao(n.serverSyncTree_,e._path,r,a)}return G(n.eventQueue_,e._path,o),rn(n.serverSyncTree_,e,t,null,!0),r},s=>(nt(n,"get for query "+O(e)+" failed: "+s),Promise.reject(new Error(s))))}function Qi(n,e,t,i,s){nt(n,"set",{path:e.toString(),value:t,priority:i});const r=Dt(n),o=N(t,i),a=mn(n.serverSyncTree_,e),l=ji(o,a,r),c=En(n),u=$i(n.serverSyncTree_,e,l,c,!0);wn(n.eventQueue_,u),n.server_.put(e.toString(),o.val(!0),(h,p)=>{const _=h==="ok";_||U("set at "+e+" failed: "+h);const I=pe(n.serverSyncTree_,c,!_);G(n.eventQueue_,e,I),Ce(n,s,h,p)});const d=Xi(n,e);Ye(n,d),G(n.eventQueue_,d,[])}function uu(n,e,t,i){nt(n,"update",{path:e.toString(),value:t});let s=!0;const r=Dt(n),o={};if(F(t,(a,l)=>{s=!1,o[a]=ho(P(e,a),N(l),n.serverSyncTree_,r)}),s)$("update() called with empty data.  Don't do anything."),Ce(n,i,"ok",void 0);else{const a=En(n),l=$d(n.serverSyncTree_,e,o,a);wn(n.eventQueue_,l),n.server_.merge(e.toString(),t,(c,u)=>{const d=c==="ok";d||U("update at "+e+" failed: "+c);const h=pe(n.serverSyncTree_,a,!d),p=h.length>0?Ye(n,e):e;G(n.eventQueue_,p,h),Ce(n,i,c,u)}),F(t,c=>{const u=Xi(n,P(e,c));Ye(n,u)}),G(n.eventQueue_,e,[])}}function hu(n){nt(n,"onDisconnectEvents");const e=Dt(n),t=Yt();si(n.onDisconnect_,E(),(s,r)=>{const o=ho(s,r,n.serverSyncTree_,e);et(t,s,o)});let i=[];si(t,E(),(s,r)=>{i=i.concat(At(n.serverSyncTree_,s,r));const o=Xi(n,s);Ye(n,o)}),n.onDisconnect_=Yt(),G(n.eventQueue_,E(),i)}function fu(n,e,t){n.server_.onDisconnectCancel(e.toString(),(i,s)=>{i==="ok"&&ii(n.onDisconnect_,e),Ce(n,t,i,s)})}function Ks(n,e,t,i){const s=N(t);n.server_.onDisconnectPut(e.toString(),s.val(!0),(r,o)=>{r==="ok"&&et(n.onDisconnect_,e,s),Ce(n,i,r,o)})}function pu(n,e,t,i,s){const r=N(t,i);n.server_.onDisconnectPut(e.toString(),r.val(!0),(o,a)=>{o==="ok"&&et(n.onDisconnect_,e,r),Ce(n,s,o,a)})}function mu(n,e,t,i){if(jn(t)){$("onDisconnect().update() called with empty data.  Don't do anything."),Ce(n,i,"ok",void 0);return}n.server_.onDisconnectMerge(e.toString(),t,(s,r)=>{s==="ok"&&F(t,(o,a)=>{const l=N(a);et(n.onDisconnect_,P(e,o),l)}),Ce(n,i,s,r)})}function _u(n,e,t){let i;y(e._path)===".info"?i=di(n.infoSyncTree_,e,t):i=di(n.serverSyncTree_,e,t),vo(n.eventQueue_,e._path,i)}function hi(n,e,t){let i;y(e._path)===".info"?i=rn(n.infoSyncTree_,e,t):i=rn(n.serverSyncTree_,e,t),vo(n.eventQueue_,e._path,i)}function Eo(n){n.persistentConnection_&&n.persistentConnection_.interrupt(bo)}function gu(n){n.persistentConnection_&&n.persistentConnection_.resume(bo)}function nt(n,...e){let t="";n.persistentConnection_&&(t=n.persistentConnection_.id+":"),$(t,...e)}function Ce(n,e,t,i){e&&Ze(()=>{if(t==="ok")e(null);else{const s=(t||"error").toUpperCase();let r=s;i&&(r+=": "+i);const o=new Error(r);o.code=s,e(o)}})}function vu(n,e,t,i,s,r){nt(n,"transaction on "+e);const o={path:e,update:t,onComplete:i,status:null,order:_r(),applyLocally:r,retryCount:0,unwatcher:s,abortReason:null,currentWriteId:null,currentInputSnapshot:null,currentOutputSnapshotRaw:null,currentOutputSnapshotResolved:null},a=Yi(n,e,void 0);o.currentInputSnapshot=a;const l=o.update(a.val());if(l===void 0)o.unwatcher(),o.currentOutputSnapshotRaw=null,o.currentOutputSnapshotResolved=null,o.onComplete&&o.onComplete(null,!1,o.currentInputSnapshot);else{Rt("transaction failed: Data returned ",l,o.path),o.status=0;const c=gn(n.transactionQueueTree_,e),u=Be(c)||[];u.push(o),Gi(c,u);let d;typeof l=="object"&&l!==null&&se(l,".priority")?(d=Re(l,".priority"),f(Ct(d),"Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")):d=(mn(n.serverSyncTree_,e)||g.EMPTY_NODE).getPriority().val();const h=Dt(n),p=N(l,d),_=ji(p,a,h);o.currentOutputSnapshotRaw=p,o.currentOutputSnapshotResolved=_,o.currentWriteId=En(n);const I=$i(n.serverSyncTree_,e,_,o.currentWriteId,o.applyLocally);G(n.eventQueue_,e,I),Cn(n,n.transactionQueueTree_)}}function Yi(n,e,t){return mn(n.serverSyncTree_,e,t)||g.EMPTY_NODE}function Cn(n,e=n.transactionQueueTree_){if(e||In(n,e),Be(e)){const t=Io(n,e);f(t.length>0,"Sending zero length transaction queue"),t.every(s=>s.status===0)&&yu(n,Pt(e),t)}else fo(e)&&vn(e,t=>{Cn(n,t)})}function yu(n,e,t){const i=t.map(c=>c.currentWriteId),s=Yi(n,e,i);let r=s;const o=s.hash();for(let c=0;c<t.length;c++){const u=t[c];f(u.status===0,"tryToSendTransactionQueue_: items in queue should all be run."),u.status=1,u.retryCount++;const d=W(e,u.path);r=r.updateChild(d,u.currentOutputSnapshotRaw)}const a=r.val(!0),l=e;n.server_.put(l.toString(),a,c=>{nt(n,"transaction put response",{path:l.toString(),status:c});let u=[];if(c==="ok"){const d=[];for(let h=0;h<t.length;h++)t[h].status=2,u=u.concat(pe(n.serverSyncTree_,t[h].currentWriteId)),t[h].onComplete&&d.push(()=>t[h].onComplete(null,!0,t[h].currentOutputSnapshotResolved)),t[h].unwatcher();In(n,gn(n.transactionQueueTree_,e)),Cn(n,n.transactionQueueTree_),G(n.eventQueue_,e,u);for(let h=0;h<d.length;h++)Ze(d[h])}else{if(c==="datastale")for(let d=0;d<t.length;d++)t[d].status===3?t[d].status=4:t[d].status=0;else{U("transaction at "+l.toString()+" failed: "+c);for(let d=0;d<t.length;d++)t[d].status=4,t[d].abortReason=c}Ye(n,e)}},o)}function Ye(n,e){const t=Co(n,e),i=Pt(t),s=Io(n,t);return bu(n,s,i),i}function bu(n,e,t){if(e.length===0)return;const i=[];let s=[];const o=e.filter(a=>a.status===0).map(a=>a.currentWriteId);for(let a=0;a<e.length;a++){const l=e[a],c=W(t,l.path);let u=!1,d;if(f(c!==null,"rerunTransactionsUnderNode_: relativePath should not be null."),l.status===4)u=!0,d=l.abortReason,s=s.concat(pe(n.serverSyncTree_,l.currentWriteId,!0));else if(l.status===0)if(l.retryCount>=ou)u=!0,d="maxretry",s=s.concat(pe(n.serverSyncTree_,l.currentWriteId,!0));else{const h=Yi(n,l.path,o);l.currentInputSnapshot=h;const p=e[a].update(h.val());if(p!==void 0){Rt("transaction failed: Data returned ",p,l.path);let _=N(p);typeof p=="object"&&p!=null&&se(p,".priority")||(_=_.updatePriority(h.getPriority()));const B=l.currentWriteId,Ue=Dt(n),Lt=ji(_,h,Ue);l.currentOutputSnapshotRaw=_,l.currentOutputSnapshotResolved=Lt,l.currentWriteId=En(n),o.splice(o.indexOf(B),1),s=s.concat($i(n.serverSyncTree_,l.path,Lt,l.currentWriteId,l.applyLocally)),s=s.concat(pe(n.serverSyncTree_,B,!0))}else u=!0,d="nodata",s=s.concat(pe(n.serverSyncTree_,l.currentWriteId,!0))}G(n.eventQueue_,t,s),s=[],u&&(e[a].status=2,function(h){setTimeout(h,Math.floor(0))}(e[a].unwatcher),e[a].onComplete&&(d==="nodata"?i.push(()=>e[a].onComplete(null,!1,e[a].currentInputSnapshot)):i.push(()=>e[a].onComplete(new Error(d),!1,null))))}In(n,n.transactionQueueTree_);for(let a=0;a<i.length;a++)Ze(i[a]);Cn(n,n.transactionQueueTree_)}function Co(n,e){let t,i=n.transactionQueueTree_;for(t=y(e);t!==null&&Be(i)===void 0;)i=gn(i,t),e=S(e),t=y(e);return i}function Io(n,e){const t=[];return So(n,e,t),t.sort((i,s)=>i.order-s.order),t}function So(n,e,t){const i=Be(e);if(i)for(let s=0;s<i.length;s++)t.push(i[s]);vn(e,s=>{So(n,s,t)})}function In(n,e){const t=Be(e);if(t){let i=0;for(let s=0;s<t.length;s++)t[s].status!==2&&(t[i]=t[s],i++);t.length=i,Gi(e,t.length>0?t:void 0)}vn(e,i=>{In(n,i)})}function Xi(n,e){const t=Pt(Co(n,e)),i=gn(n.transactionQueueTree_,e);return Xd(i,s=>{Wn(n,s)}),Wn(n,i),po(i,s=>{Wn(n,s)}),t}function Wn(n,e){const t=Be(e);if(t){const i=[];let s=[],r=-1;for(let o=0;o<t.length;o++)t[o].status===3||(t[o].status===1?(f(r===o-1,"All SENT items should be at beginning of queue."),r=o,t[o].status=3,t[o].abortReason="set"):(f(t[o].status===0,"Unexpected transaction status in abort"),t[o].unwatcher(),s=s.concat(pe(n.serverSyncTree_,t[o].currentWriteId,!0)),t[o].onComplete&&i.push(t[o].onComplete.bind(null,new Error("set"),!1,null))));r===-1?Gi(e,void 0):t.length=r+1,G(n.eventQueue_,Pt(e),s);for(let o=0;o<i.length;o++)Ze(i[o])}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function wu(n){let e="";const t=n.split("/");for(let i=0;i<t.length;i++)if(t[i].length>0){let s=t[i];try{s=decodeURIComponent(s.replace(/\+/g," "))}catch{}e+="/"+s}return e}function Eu(n){const e={};n.charAt(0)==="?"&&(n=n.substring(1));for(const t of n.split("&")){if(t.length===0)continue;const i=t.split("=");i.length===2?e[decodeURIComponent(i[0])]=decodeURIComponent(i[1]):U(`Invalid query segment '${t}' in query '${n}'`)}return e}const fi=function(n,e){const t=Cu(n),i=t.namespace;t.domain==="firebase.com"&&oe(t.host+" is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead"),(!i||i==="undefined")&&t.domain!=="localhost"&&oe("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com"),t.secure||Nl();const s=t.scheme==="ws"||t.scheme==="wss";return{repoInfo:new Pr(t.host,t.secure,i,s,e,"",i!==t.subdomain),path:new C(t.pathString)}},Cu=function(n){let e="",t="",i="",s="",r="",o=!0,a="https",l=443;if(typeof n=="string"){let c=n.indexOf("//");c>=0&&(a=n.substring(0,c-1),n=n.substring(c+2));let u=n.indexOf("/");u===-1&&(u=n.length);let d=n.indexOf("?");d===-1&&(d=n.length),e=n.substring(0,Math.min(u,d)),u<d&&(s=wu(n.substring(u,d)));const h=Eu(n.substring(Math.min(n.length,d)));c=e.indexOf(":"),c>=0?(o=a==="https"||a==="wss",l=parseInt(e.substring(c+1),10)):c=e.length;const p=e.slice(0,c);if(p.toLowerCase()==="localhost")t="localhost";else if(p.split(".").length<=2)t=p;else{const _=e.indexOf(".");i=e.substring(0,_).toLowerCase(),t=e.substring(_+1),r=i}"ns"in h&&(r=h.ns)}return{host:e,port:l,domain:t,subdomain:i,secure:o,scheme:a,pathString:s,namespace:r}};/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const qs="-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz",Iu=function(){let n=0;const e=[];return function(t){const i=t===n;n=t;let s;const r=new Array(8);for(s=7;s>=0;s--)r[s]=qs.charAt(t%64),t=Math.floor(t/64);f(t===0,"Cannot push at time == 0");let o=r.join("");if(i){for(s=11;s>=0&&e[s]===63;s--)e[s]=0;e[s]++}else for(s=0;s<12;s++)e[s]=Math.floor(Math.random()*64);for(s=0;s<12;s++)o+=qs.charAt(e[s]);return f(o.length===20,"nextPushId: Length should be 20."),o}}();/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class To{constructor(e,t,i,s){this.eventType=e,this.eventRegistration=t,this.snapshot=i,this.prevName=s}getPath(){const e=this.snapshot.ref;return this.eventType==="value"?e._path:e.parent._path}getEventType(){return this.eventType}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.getPath().toString()+":"+this.eventType+":"+O(this.snapshot.exportVal())}}class ko{constructor(e,t,i){this.eventRegistration=e,this.error=t,this.path=i}getPath(){return this.path}getEventType(){return"cancel"}getEventRunner(){return this.eventRegistration.getEventRunner(this)}toString(){return this.path.toString()+":cancel"}}/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class Ji{constructor(e,t){this.snapshotCallback=e,this.cancelCallback=t}onValue(e,t){this.snapshotCallback.call(null,e,t)}onCancel(e){return f(this.hasCancelCallback,"Raising a cancel event on a listener with no cancel callback"),this.cancelCallback.call(null,e)}get hasCancelCallback(){return!!this.cancelCallback}matches(e){return this.snapshotCallback===e.snapshotCallback||this.snapshotCallback.userCallback!==void 0&&this.snapshotCallback.userCallback===e.snapshotCallback.userCallback&&this.snapshotCallback.context===e.snapshotCallback.context}}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class xo{constructor(e,t){this._repo=e,this._path=t}cancel(){const e=new z;return fu(this._repo,this._path,e.wrapCallback(()=>{})),e.promise}remove(){te("OnDisconnect.remove",this._path);const e=new z;return Ks(this._repo,this._path,null,e.wrapCallback(()=>{})),e.promise}set(e){te("OnDisconnect.set",this._path),ae("OnDisconnect.set",e,this._path,!1);const t=new z;return Ks(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}setWithPriority(e,t){te("OnDisconnect.setWithPriority",this._path),ae("OnDisconnect.setWithPriority",e,this._path,!1),Ki("OnDisconnect.setWithPriority",t);const i=new z;return pu(this._repo,this._path,e,t,i.wrapCallback(()=>{})),i.promise}update(e){te("OnDisconnect.update",this._path),_o("OnDisconnect.update",e,this._path);const t=new z;return mu(this._repo,this._path,e,t.wrapCallback(()=>{})),t.promise}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class V{constructor(e,t,i,s){this._repo=e,this._path=t,this._queryParams=i,this._orderByCalled=s}get key(){return b(this._path)?null:Ci(this._path)}get ref(){return new J(this._repo,this._path)}get _queryIdentifier(){const e=Ds(this._queryParams),t=yi(e);return t==="{}"?"default":t}get _queryObject(){return Ds(this._queryParams)}isEqual(e){if(e=j(e),!(e instanceof V))return!1;const t=this._repo===e._repo,i=Ii(this._path,e._path),s=this._queryIdentifier===e._queryIdentifier;return t&&i&&s}toJSON(){return this.toString()}toString(){return this._repo.toString()+mc(this._path)}}function Sn(n,e){if(n._orderByCalled===!0)throw new Error(e+": You can't combine multiple orderBy calls.")}function Te(n){let e=null,t=null;if(n.hasStart()&&(e=n.getIndexStartValue()),n.hasEnd()&&(t=n.getIndexEndValue()),n.getIndex()===re){const i="Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().",s="Query: When ordering by key, the argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() must be a string.";if(n.hasStart()){if(n.getIndexStartName()!==ye)throw new Error(i);if(typeof e!="string")throw new Error(s)}if(n.hasEnd()){if(n.getIndexEndName()!==ue)throw new Error(i);if(typeof t!="string")throw new Error(s)}}else if(n.getIndex()===x){if(e!=null&&!Ct(e)||t!=null&&!Ct(t))throw new Error("Query: When ordering by priority, the first argument passed to startAt(), startAfter() endAt(), endBefore(), or equalTo() must be a valid priority value (null, a number, or a string).")}else if(f(n.getIndex()instanceof ki||n.getIndex()===xi,"unknown index type."),e!=null&&typeof e=="object"||t!=null&&typeof t=="object")throw new Error("Query: First argument passed to startAt(), startAfter(), endAt(), endBefore(), or equalTo() cannot be an object.")}function Tn(n){if(n.hasStart()&&n.hasEnd()&&n.hasLimit()&&!n.hasAnchoredLimit())throw new Error("Query: Can't combine startAt(), startAfter(), endAt(), endBefore(), and limit(). Use limitToFirst() or limitToLast() instead.")}class J extends V{constructor(e,t){super(e,t,new dn,!1)}get parent(){const e=Br(this._path);return e===null?null:new J(this._repo,e)}get root(){let e=this;for(;e.parent!==null;)e=e.parent;return e}}class Ie{constructor(e,t,i){this._node=e,this.ref=t,this._index=i}get priority(){return this._node.getPriority().val()}get key(){return this.ref.key}get size(){return this._node.numChildren()}child(e){const t=new C(e),i=Le(this.ref,e);return new Ie(this._node.getChild(t),i,x)}exists(){return!this._node.isEmpty()}exportVal(){return this._node.val(!0)}forEach(e){return this._node.isLeafNode()?!1:!!this._node.forEachChild(this._index,(i,s)=>e(new Ie(s,Le(this.ref,i),x)))}hasChild(e){const t=new C(e);return!this._node.getChild(t).isEmpty()}hasChildren(){return this._node.isLeafNode()?!1:!this._node.isEmpty()}toJSON(){return this.exportVal()}val(){return this._node.val()}}function R(n,e){return n=j(n),n._checkNotDeleted("ref"),e!==void 0?Le(n._root,e):n._root}function Su(n,e){n=j(n),n._checkNotDeleted("refFromURL");const t=fi(e,n._repo.repoInfo_.nodeAdmin);go("refFromURL",t);const i=t.repoInfo;return!n._repo.repoInfo_.isCustomHost()&&i.host!==n._repo.repoInfo_.host&&oe("refFromURL: Host name does not match the current database: (found "+i.host+" but expected "+n._repo.repoInfo_.host+")"),R(n,t.path.toString())}function Le(n,e){return n=j(n),y(n._path)===null?iu("child","path",e,!1):bn("child","path",e,!1),new J(n._repo,P(n._path,e))}function Tu(n){return n=j(n),new xo(n._repo,n._path)}function ku(n,e){n=j(n),te("push",n._path),ae("push",e,n._path,!0);const t=wo(n._repo),i=Iu(t),s=Le(n,i),r=Le(n,i);let o;return e!=null?o=it(r,e).then(()=>r):o=Promise.resolve(r),s.then=o.then.bind(o),s.catch=o.then.bind(o,void 0),s}function kn(n){return te("remove",n._path),it(n,null)}function it(n,e){n=j(n),te("set",n._path),ae("set",e,n._path,!1);const t=new z;return Qi(n._repo,n._path,e,null,t.wrapCallback(()=>{})),t.promise}function xu(n,e){n=j(n),te("setPriority",n._path),Ki("setPriority",e);const t=new z;return Qi(n._repo,P(n._path,".priority"),e,null,t.wrapCallback(()=>{})),t.promise}function Au(n,e,t){if(te("setWithPriority",n._path),ae("setWithPriority",e,n._path,!1),Ki("setWithPriority",t),n.key===".length"||n.key===".keys")throw"setWithPriority failed: "+n.key+" is a read-only object.";const i=new z;return Qi(n._repo,n._path,e,t,i.wrapCallback(()=>{})),i.promise}function he(n,e){_o("update",e,n._path);const t=new z;return uu(n._repo,n._path,e,t.wrapCallback(()=>{})),t.promise}function Se(n){n=j(n);const e=new Ji(()=>{}),t=new Ot(e);return du(n._repo,n,t).then(i=>new Ie(i,new J(n._repo,n._path),n._queryParams.getIndex()))}class Ot{constructor(e){this.callbackContext=e}respondsTo(e){return e==="value"}createEvent(e,t){const i=t._queryParams.getIndex();return new To("value",this,new Ie(e.snapshotNode,new J(t._repo,t._path),i))}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,null)}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ko(this,e,t):null}matches(e){return e instanceof Ot?!e.callbackContext||!this.callbackContext?!0:e.callbackContext.matches(this.callbackContext):!1}hasAnyCallback(){return this.callbackContext!==null}}class xn{constructor(e,t){this.eventType=e,this.callbackContext=t}respondsTo(e){let t=e==="children_added"?"child_added":e;return t=t==="children_removed"?"child_removed":t,this.eventType===t}createCancelEvent(e,t){return this.callbackContext.hasCancelCallback?new ko(this,e,t):null}createEvent(e,t){f(e.childName!=null,"Child events should have a childName.");const i=Le(new J(t._repo,t._path),e.childName),s=t._queryParams.getIndex();return new To(e.type,this,new Ie(e.snapshotNode,i,s),e.prevName)}getEventRunner(e){return e.getEventType()==="cancel"?()=>this.callbackContext.onCancel(e.error):()=>this.callbackContext.onValue(e.snapshot,e.prevName)}matches(e){return e instanceof xn?this.eventType===e.eventType&&(!this.callbackContext||!e.callbackContext||this.callbackContext.matches(e.callbackContext)):!1}hasAnyCallback(){return!!this.callbackContext}}function Mt(n,e,t,i,s){let r;if(typeof i=="object"&&(r=void 0,s=i),typeof i=="function"&&(r=i),s&&s.onlyOnce){const l=t,c=(u,d)=>{hi(n._repo,n,a),l(u,d)};c.userCallback=t.userCallback,c.context=t.context,t=c}const o=new Ji(t,r||void 0),a=e==="value"?new Ot(o):new xn(e,o);return _u(n._repo,n,a),()=>hi(n._repo,n,a)}function Ao(n,e,t,i){return Mt(n,"value",e,t,i)}function Pu(n,e,t,i){return Mt(n,"child_added",e,t,i)}function Ru(n,e,t,i){return Mt(n,"child_changed",e,t,i)}function Nu(n,e,t,i){return Mt(n,"child_moved",e,t,i)}function Du(n,e,t,i){return Mt(n,"child_removed",e,t,i)}function Ou(n,e,t){let i=null;const s=t?new Ji(t):null;e==="value"?i=new Ot(s):e&&(i=new xn(e,s)),hi(n._repo,n,i)}class Z{}class Po extends Z{constructor(e,t){super(),this._value=e,this._key=t,this.type="endAt"}_apply(e){ae("endAt",this._value,e._path,!0);const t=ni(e._queryParams,this._value,this._key);if(Tn(t),Te(t),e._queryParams.hasEnd())throw new Error("endAt: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new V(e._repo,e._path,t,e._orderByCalled)}}function Mu(n,e){return Nt("endAt","key",e),new Po(n,e)}class Lu extends Z{constructor(e,t){super(),this._value=e,this._key=t,this.type="endBefore"}_apply(e){ae("endBefore",this._value,e._path,!1);const t=Wc(e._queryParams,this._value,this._key);if(Tn(t),Te(t),e._queryParams.hasEnd())throw new Error("endBefore: Starting point was already set (by another call to endAt, endBefore or equalTo).");return new V(e._repo,e._path,t,e._orderByCalled)}}function $u(n,e){return Nt("endBefore","key",e),new Lu(n,e)}class Ro extends Z{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAt"}_apply(e){ae("startAt",this._value,e._path,!0);const t=ti(e._queryParams,this._value,this._key);if(Tn(t),Te(t),e._queryParams.hasStart())throw new Error("startAt: Starting point was already set (by another call to startAt, startBefore or equalTo).");return new V(e._repo,e._path,t,e._orderByCalled)}}function Fu(n=null,e){return Nt("startAt","key",e),new Ro(n,e)}class Bu extends Z{constructor(e,t){super(),this._value=e,this._key=t,this.type="startAfter"}_apply(e){ae("startAfter",this._value,e._path,!1);const t=Uc(e._queryParams,this._value,this._key);if(Tn(t),Te(t),e._queryParams.hasStart())throw new Error("startAfter: Starting point was already set (by another call to startAt, startAfter, or equalTo).");return new V(e._repo,e._path,t,e._orderByCalled)}}function Uu(n,e){return Nt("startAfter","key",e),new Bu(n,e)}class Wu extends Z{constructor(e){super(),this._limit=e,this.type="limitToFirst"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToFirst: Limit was already set (by another call to limitToFirst or limitToLast).");return new V(e._repo,e._path,Fc(e._queryParams,this._limit),e._orderByCalled)}}function Hu(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToFirst: First argument must be a positive integer.");return new Wu(n)}class ju extends Z{constructor(e){super(),this._limit=e,this.type="limitToLast"}_apply(e){if(e._queryParams.hasLimit())throw new Error("limitToLast: Limit was already set (by another call to limitToFirst or limitToLast).");return new V(e._repo,e._path,Bc(e._queryParams,this._limit),e._orderByCalled)}}function Vu(n){if(typeof n!="number"||Math.floor(n)!==n||n<=0)throw new Error("limitToLast: First argument must be a positive integer.");return new ju(n)}class zu extends Z{constructor(e){super(),this._path=e,this.type="orderByChild"}_apply(e){Sn(e,"orderByChild");const t=new C(this._path);if(b(t))throw new Error("orderByChild: cannot pass in empty path. Use orderByValue() instead.");const i=new ki(t),s=un(e._queryParams,i);return Te(s),new V(e._repo,e._path,s,!0)}}function Gu(n){if(n==="$key")throw new Error('orderByChild: "$key" is invalid.  Use orderByKey() instead.');if(n==="$priority")throw new Error('orderByChild: "$priority" is invalid.  Use orderByPriority() instead.');if(n==="$value")throw new Error('orderByChild: "$value" is invalid.  Use orderByValue() instead.');return bn("orderByChild","path",n,!1),new zu(n)}class Ku extends Z{constructor(){super(...arguments),this.type="orderByKey"}_apply(e){Sn(e,"orderByKey");const t=un(e._queryParams,re);return Te(t),new V(e._repo,e._path,t,!0)}}function qu(){return new Ku}class Qu extends Z{constructor(){super(...arguments),this.type="orderByPriority"}_apply(e){Sn(e,"orderByPriority");const t=un(e._queryParams,x);return Te(t),new V(e._repo,e._path,t,!0)}}function Yu(){return new Qu}class Xu extends Z{constructor(){super(...arguments),this.type="orderByValue"}_apply(e){Sn(e,"orderByValue");const t=un(e._queryParams,xi);return Te(t),new V(e._repo,e._path,t,!0)}}function Ju(){return new Xu}class Zu extends Z{constructor(e,t){super(),this._value=e,this._key=t,this.type="equalTo"}_apply(e){if(ae("equalTo",this._value,e._path,!1),e._queryParams.hasStart())throw new Error("equalTo: Starting point was already set (by another call to startAt/startAfter or equalTo).");if(e._queryParams.hasEnd())throw new Error("equalTo: Ending point was already set (by another call to endAt/endBefore or equalTo).");return new Po(this._value,this._key)._apply(new Ro(this._value,this._key)._apply(e))}}function eh(n,e){return Nt("equalTo","key",e),new Zu(n,e)}function th(n,...e){let t=j(n);for(const i of e)t=i._apply(t);return t}Ad(J);Od(J);/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const nh="FIREBASE_DATABASE_EMULATOR_HOST",pi={};let No=!1;function ih(n,e,t,i){n.repoInfo_=new Pr(`${e}:${t}`,!1,n.repoInfo_.namespace,n.repoInfo_.webSocketOnly,n.repoInfo_.nodeAdmin,n.repoInfo_.persistenceKey,n.repoInfo_.includeNamespaceInQueryParams,!0),i&&(n.authTokenProvider_=i)}function Zi(n,e,t,i,s){let r=i||n.options.databaseURL;r===void 0&&(n.options.projectId||oe("Can't determine Firebase Database URL. Be sure to include  a Project ID when calling firebase.initializeApp()."),$("Using default host for project ",n.options.projectId),r=`${n.options.projectId}-default-rtdb.firebaseio.com`);let o=fi(r,s),a=o.repoInfo,l,c;typeof process<"u"&&ms&&(c=ms[nh]),c?(l=!0,r=`http://${c}?ns=${a.namespace}`,o=fi(r,s),a=o.repoInfo):l=!o.repoInfo.secure;const u=s&&l?new Ve(Ve.OWNER):new jl(n.name,n.options,e);go("Invalid Firebase Database URL",o),b(o.path)||oe("Database URL must point to the root of a Firebase Database (not including a child path).");const d=rh(a,n,u,new Hl(n.name,t));return new Do(d,n)}function sh(n,e){const t=pi[e];(!t||t[n.key]!==n)&&oe(`Database ${e}(${n.repoInfo_}) has already been deleted.`),Eo(n),delete t[n.key]}function rh(n,e,t,i){let s=pi[e.name];s||(s={},pi[e.name]=s);let r=s[n.toURLString()];return r&&oe("Database initialized multiple times. Please make sure the format of the database URL matches with each database() call."),r=new au(n,No,t,i),s[n.toURLString()]=r,r}function oh(n){No=n}class Do{constructor(e,t){this._repoInternal=e,this.app=t,this.type="database",this._instanceStarted=!1}get _repo(){return this._instanceStarted||(lu(this._repoInternal,this.app.options.appId,this.app.options.databaseAuthVariableOverride),this._instanceStarted=!0),this._repoInternal}get _root(){return this._rootInternal||(this._rootInternal=new J(this._repo,E())),this._rootInternal}_delete(){return this._rootInternal!==null&&(sh(this._repo,this.app.name),this._repoInternal=null,this._rootInternal=null),Promise.resolve()}_checkNotDeleted(e){this._rootInternal===null&&oe("Cannot call "+e+" on a deleted database.")}}function Oo(){Ge.IS_TRANSPORT_INITIALIZED&&U("Transport has already been initialized. Please call this function before calling ref or setting up a listener")}function ah(){Oo(),fe.forceDisallow()}function lh(){Oo(),q.forceDisallow(),fe.forceAllow()}function Mo(n=vl(),e){const t=pl(n,"database").getImmediate({identifier:e});if(!t._instanceStarted){const i=ra("database");i&&Lo(t,...i)}return t}function Lo(n,e,t,i={}){n=j(n),n._checkNotDeleted("useEmulator"),n._instanceStarted&&oe("Cannot call useEmulator() after instance has already been initialized.");const s=n._repoInternal;let r;if(s.repoInfo_.nodeAdmin)i.mockUserToken&&oe('mockUserToken is not supported by the Admin SDK. For client access with mock users, please use the "firebase" package instead of "firebase-admin".'),r=new Ve(Ve.OWNER);else if(i.mockUserToken){const o=typeof i.mockUserToken=="string"?i.mockUserToken:oa(i.mockUserToken,n.app.options.projectId);r=new Ve(o)}ih(s,e,t,r)}function ch(n){n=j(n),n._checkNotDeleted("goOffline"),Eo(n._repo)}function dh(n){n=j(n),n._checkNotDeleted("goOnline"),gu(n._repo)}function uh(n,e){vr(n,e)}/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function hh(n){vi(gl),zt(new De("database",(e,{instanceIdentifier:t})=>{const i=e.getProvider("app").getImmediate(),s=e.getProvider("auth-internal"),r=e.getProvider("app-check-internal");return Zi(i,s,r,t)},"PUBLIC").setMultipleInstances(!0)),He(_s,gs,n),He(_s,gs,"esm2017")}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */const fh={".sv":"timestamp"};function ph(){return fh}function mh(n){return{".sv":{increment:n}}}/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */class $o{constructor(e,t){this.committed=e,this.snapshot=t}toJSON(){return{committed:this.committed,snapshot:this.snapshot.toJSON()}}}function _h(n,e,t){var i;if(n=j(n),te("Reference.transaction",n._path),n.key===".length"||n.key===".keys")throw"Reference.transaction failed: "+n.key+" is a read-only object.";const s=(i=t==null?void 0:t.applyLocally)!==null&&i!==void 0?i:!0,r=new z,o=(l,c,u)=>{let d=null;l?r.reject(l):(d=new Ie(u,new J(n._repo,n._path),x),r.resolve(new $o(c,d)))},a=Ao(n,()=>{});return vu(n._repo,n._path,e,o,a,s),r.promise}Y.prototype.simpleListen=function(n,e){this.sendRequest("q",{p:n},e)};Y.prototype.echo=function(n,e){this.sendRequest("echo",{d:n},e)};const gh=function(n){const e=Y.prototype.put;return Y.prototype.put=function(t,i,s,r){r!==void 0&&(r=n()),e.call(this,t,i,s,r)},function(){Y.prototype.put=e}},vh=function(n){oh(n)};/**
 * @license
 * Copyright 2023 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function yh({app:n,url:e,version:t,customAuthImpl:i,customAppCheckImpl:s,nodeAdmin:r=!1}){vi(t);const o=new ar("database-standalone"),a=new zn("auth-internal",o);let l;return s&&(l=new zn("app-check-internal",o),l.setComponent(new De("app-check-internal",()=>s,"PRIVATE"))),a.setComponent(new De("auth-internal",()=>i,"PRIVATE")),Zi(n,a,l,e,r)}hh();const An=Object.freeze(Object.defineProperty({__proto__:null,DataSnapshot:Ie,Database:Do,OnDisconnect:xo,QueryConstraint:Z,TransactionResult:$o,_QueryImpl:V,_QueryParams:dn,_ReferenceImpl:J,_TEST_ACCESS_forceRestClient:vh,_TEST_ACCESS_hijackHash:gh,_initStandalone:yh,_repoManagerDatabaseFromApp:Zi,_setSDKVersion:vi,_validatePathString:bn,_validateWritablePath:te,child:Le,connectDatabaseEmulator:Lo,enableLogging:uh,endAt:Mu,endBefore:$u,equalTo:eh,forceLongPolling:lh,forceWebSockets:ah,get:Se,getDatabase:Mo,goOffline:ch,goOnline:dh,increment:mh,limitToFirst:Hu,limitToLast:Vu,off:Ou,onChildAdded:Pu,onChildChanged:Ru,onChildMoved:Nu,onChildRemoved:Du,onDisconnect:Tu,onValue:Ao,orderByChild:Gu,orderByKey:qu,orderByPriority:Yu,orderByValue:Ju,push:ku,query:th,ref:R,refFromURL:Su,remove:kn,runTransaction:_h,serverTimestamp:ph,set:it,setPriority:xu,setWithPriority:Au,startAfter:Uu,startAt:Fu,update:he},Symbol.toStringTag,{value:"Module"})),bh={apiKey:"AIzaSyDemoKey123456789",authDomain:"zeroixdark-marketplace-demo.firebaseapp.com",databaseURL:"https://zeroixdark-marketplace-demo-default-rtdb.firebaseio.com",projectId:"zeroixdark-marketplace-demo",storageBucket:"zeroixdark-marketplace-demo.appspot.com",messagingSenderId:"123456789",appId:"1:123456789:web:abc123def456"},Fo=ur(bh),A=Mo(Fo),wh=Object.freeze(Object.defineProperty({__proto__:null,app:Fo,database:A,default:A},Symbol.toStringTag,{value:"Module"}));function v(n,e="info",t=4e3){const i=document.getElementById("toastContainer");if(!i)return;const s=document.createElement("div");s.className=`toast toast-${e}`;const r={success:"check-circle",error:"x-circle",warning:"alert-triangle",info:"info"};s.innerHTML=`
    <i data-lucide="${r[e]||"info"}"></i>
    <span>${n}</span>
    <button class="toast-close" onclick="this.parentElement.remove()">
      <i data-lucide="x"></i>
    </button>
  `,i.appendChild(s),window.lucide&&lucide.createIcons(),setTimeout(()=>{s.parentElement&&(s.classList.add("toast-exit"),setTimeout(()=>s.remove(),300))},t)}function st(n,e,t,i){const s=document.getElementById("modalOverlay"),r=document.getElementById("modalContent");s.style.display="flex",r.innerHTML=`
    <div class="modal-header">
      <i data-lucide="alert-triangle" style="color:#ef4444;"></i>
      <h2>${n}</h2>
    </div>
    <div class="modal-body">
      <p>${e}</p>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" id="cancelConfirm">Batal</button>
      <button class="btn btn-danger" id="confirmAction">Ya, Lanjutkan</button>
    </div>
  `,window.lucide&&lucide.createIcons(),document.getElementById("cancelConfirm").onclick=()=>{s.style.display="none"},document.getElementById("confirmAction").onclick=()=>{s.style.display="none",t&&t()},s.onclick=o=>{o.target===s&&(s.style.display="none")}}function m(n){if(!n)return"";const e=document.createElement("div");return e.textContent=n,e.innerHTML}function X(n){return n?new Date(n).toLocaleDateString("id-ID",{day:"2-digit",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}):"N/A"}function Eh(){return Date.now().toString(36)+Math.random().toString(36).substr(2)}function Bo(n){const e="6281234567890",t=encodeURIComponent(n);window.open(`https://wa.me/${e}?text=${t}`,"_blank")}function Ch(n,e){const t=JSON.parse(localStorage.getItem("mp_session")||"{}");return`Halo Admin, saya mau beli Panel Pterodactyl dengan spesifikasi:
📦 Paket: RAM ${m(n)}
💰 Harga: Rp ${m(e)}
👤 Username: ${m(t.username||"")}
📧 Email: ${m(t.email||"")}
📱 WA: ${m(t.whatsapp||"")}

Mohon diproses ya, terima kasih! 🙏`}function Ih(n,e,t=!1){const i=JSON.parse(localStorage.getItem("mp_session")||"{}");return`Halo Admin, saya mau ${t?"perpanjang":"beli"} Role Panel:
🏷️ Role: ${m(n)}
💰 Harga: Rp ${m(e)} (${t?"perpanjang":"baru"})
👤 Username: ${m(i.username||"")}
📧 Email: ${m(i.email||"")}
📱 WA: ${m(i.whatsapp||"")}

Mohon diproses ya, terima kasih! 🙏`}function Uo(n){if(!n)return{expired:!0,text:"EXPIRED"};const e=Date.now(),t=n-e;if(t<=0)return{expired:!0,text:"EXPIRED"};const i=Math.floor(t/(1e3*60*60*24)),s=Math.floor(t%(1e3*60*60*24)/(1e3*60*60)),r=Math.floor(t%(1e3*60*60)/(1e3*60)),o=Math.floor(t%(1e3*60)/1e3);return{expired:!1,days:i,hours:s,minutes:r,seconds:o,text:`${i}d ${s}j ${r}m ${o}d`}}function Sh(n){if(!n)return{expired:!0,text:"EXPIRED"};const e=n-Date.now();if(e<=0)return{expired:!0,text:"EXPIRED"};const t=Math.floor(e/(1e3*60*60*24));return t>=1?{expired:!1,text:`Sisa ${t} hari`}:{expired:!1,text:`Sisa ${Math.floor(e/(1e3*60*60))} jam`}}const es=[{id:"5gb",name:"5 GB",price:"3.000",priceNum:3e3},{id:"6gb",name:"6 GB",price:"4.000",priceNum:4e3},{id:"7gb",name:"7 GB",price:"5.000",priceNum:5e3},{id:"8gb",name:"8 GB",price:"6.000",priceNum:6e3},{id:"9gb",name:"9 GB",price:"7.000",priceNum:7e3},{id:"10gb",name:"10 GB",price:"8.000",priceNum:8e3},{id:"unlimited",name:"Unlimited",price:"10.000",priceNum:1e4}],Wo=[{id:"reseller",name:"Reseller",price:"20.000",renewalPrice:"15.000"},{id:"partner_publik_v1",name:"Partner Publik V1",price:"35.000",renewalPrice:"20.000"},{id:"partner_publik_v2",name:"Partner Publik V2",price:"35.000",renewalPrice:"20.000"},{id:"reseller_private",name:"Reseller Private",price:"30.000",renewalPrice:"20.000"}];function ts(n){return{admin:"badge-admin",reseller:"badge-reseller",partner_publik_v1:"badge-partner",partner_publik_v2:"badge-partner",reseller_private:"badge-reseller-private"}[n]||"badge-user"}function Xe(n){return{admin:"Admin",reseller:"Reseller",partner_publik_v1:"Partner Publik V1",partner_publik_v2:"Partner Publik V2",reseller_private:"Reseller Private"}[n]||n}async function K(n,e,t,i){try{const{database:s}=await pt(async()=>{const{database:c}=await Promise.resolve().then(()=>wh);return{database:c}},void 0),{ref:r,push:o,set:a}=await pt(async()=>{const{ref:c,push:u,set:d}=await Promise.resolve().then(()=>An);return{ref:c,push:u,set:d}},void 0),l=o(r(s,"activityLogs"));await a(l,{uid:n,username:e,action:t,detail:i,timestamp:Date.now()})}catch(s){console.error("Failed to log activity:",s)}}const Ho="mp_session",Th=24*60*60*1e3;function D(){const n=localStorage.getItem(Ho);if(!n)return null;try{return JSON.parse(n)}catch{return null}}function jo(){const n=D();if(!n)return!1;const e=Date.now();return n.lastLoginAt&&e-n.lastLoginAt>Th?(Vo(),!1):!0}function Vo(){localStorage.removeItem(Ho)}async function kh(){const n=D();if(n)try{await he(R(A,`users/${n.uid}`),{isOnline:!1}),await K(n.uid,n.username,"logout","User berhasil logout")}catch(e){console.error("Logout error:",e)}Vo(),window.location.href="/login"}function Bt(){return jo()?D().role!=="admin"?(v("Akses ditolak. Halaman ini hanya untuk admin.","error"),setTimeout(()=>{window.location.hash="dashboard"},1500),!1):!0:(window.location.href="/login",!1)}function xh(){return jo()?!0:(window.location.href="/login",!1)}async function Ah(n){if(n)try{await he(R(A,`users/${n}`),{isOnline:!0,lastLoginAt:Date.now()})}catch(e){console.error("Set online error:",e)}}function Ph(n){var t;if(!n)return;const e=`${A.app.options.databaseURL}/users/${n}.json`;(t=navigator.sendBeacon)==null||t.call(navigator,e,JSON.stringify({isOnline:!1})),fetch(e,{method:"PATCH",body:JSON.stringify({isOnline:!1}),headers:{"Content-Type":"application/json"}}).catch(()=>{})}async function Rh(n){const e=document.getElementById("pageContent");await Nh(e)}async function Nh(n){try{const t=(await Se(R(A,"users"))).val()||{},i=Object.keys(t).length;let s=0,r=0,o=0,a=0;for(const[,h]of Object.entries(t))h.isActive!==!1&&s++,h.isOnline&&r++,h.expiredAt&&Date.now()>h.expiredAt&&o++,h.servers&&(a+=Object.keys(h.servers).length);const l=Object.entries(t).sort(([,h],[,p])=>(p.createdAt||0)-(h.createdAt||0)).slice(0,5),u=(await Se(R(A,"activityLogs"))).val()||{},d=Object.entries(u).sort(([,h],[,p])=>(p.timestamp||0)-(h.timestamp||0)).slice(0,10);n.innerHTML=`
      <!-- Stats Grid -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon cyan"><i data-lucide="users"></i></div>
          <div class="stat-value">${i}</div>
          <div class="stat-label">Total User</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i data-lucide="user-check"></i></div>
          <div class="stat-value">${s}</div>
          <div class="stat-label">User Aktif</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon violet"><i data-lucide="wifi"></i></div>
          <div class="stat-value">${r}</div>
          <div class="stat-label">User Online</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon red"><i data-lucide="user-x"></i></div>
          <div class="stat-value">${o}</div>
          <div class="stat-label">User Expired</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon cyan"><i data-lucide="server"></i></div>
          <div class="stat-value">${a}</div>
          <div class="stat-label">Total Server</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i data-lucide="banknote"></i></div>
          <div class="stat-value">~</div>
          <div class="stat-label">Revenue Estimate</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <div class="section-title"><i data-lucide="zap"></i> Quick Actions</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="openAddUserModal()">
            <i data-lucide="user-plus"></i> Tambah User
          </button>
          <button class="btn btn-secondary" onclick="window.location.hash='announcement'">
            <i data-lucide="megaphone"></i> Broadcast Pengumuman
          </button>
        </div>
      </div>

      <!-- Recent Users -->
      <div class="table-container">
        <div class="table-header">
          <h3>User Terbaru</h3>
          <button class="btn btn-sm btn-secondary" onclick="window.location.hash='manage_users'">Lihat Semua</button>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Nama</th>
              <th>Role</th>
              <th>Status</th>
              <th>Dibuat</th>
            </tr>
          </thead>
          <tbody>
            ${l.length===0?'<tr><td colspan="5" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada user</td></tr>':""}
            ${l.map(([h,p])=>`
              <tr>
                <td><strong>${m(p.username||"")}</strong></td>
                <td>${m(p.name||"-")}</td>
                <td><span class="badge ${ts(p.role)}">${Xe(p.role)}</span></td>
                <td>
                  <span class="badge ${p.isActive!==!1?"badge-active":"badge-inactive"}">
                    ${p.isActive!==!1?"Aktif":"Nonaktif"}
                  </span>
                </td>
                <td>${X(p.createdAt)}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <!-- Recent Activity -->
      <div class="table-container">
        <div class="table-header">
          <h3>Activity Log Terbaru</h3>
          <button class="btn btn-sm btn-secondary" onclick="window.location.hash='activity_logs'">Lihat Semua</button>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Waktu</th>
              <th>User</th>
              <th>Aksi</th>
              <th>Detail</th>
            </tr>
          </thead>
          <tbody>
            ${d.length===0?'<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada aktivitas</td></tr>':""}
            ${d.map(([h,p])=>`
              <tr>
                <td>${X(p.timestamp)}</td>
                <td>${m(p.username||"-")}</td>
                <td>${m(p.action||"-")}</td>
                <td>${m(p.detail||"-")}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>
    `,window.lucide&&lucide.createIcons()}catch(e){console.error("Dashboard error:",e),n.innerHTML=`<div class="empty-state"><p>Error memuat dashboard: ${m(e.message)}</p></div>`,v("Gagal memuat dashboard.","error")}}async function Dh(n){const e=document.getElementById("pageContent");try{const i=(await Se(R(A,`users/${n.uid}`))).val()||n,s=i.servers?Object.keys(i.servers).length:0,r=Uo(i.expiredAt),o=RAM_PACKAGES.find(l=>l.id===i.ramPackage)||{name:i.ramPackage,price:"?"},a=ROLE_PACKAGES.find(l=>l.id===i.panelRole)||{name:i.panelRole,price:"?"};e.innerHTML=`
      <!-- Welcome Card -->
      <div class="welcome-card">
        <div>
          <h2>Halo, ${m(i.name||i.username)}! 👋</h2>
          <p>Selamat datang kembali di ZeroixDark Marketplace. Kelola hosting Anda dengan mudah.</p>
        </div>
      </div>

      <!-- Stats -->
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon cyan"><i data-lucide="server"></i></div>
          <div class="stat-value">${s}</div>
          <div class="stat-label">Server Aktif</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon green"><i data-lucide="memory-stick"></i></div>
          <div class="stat-value">${m(o.name)}</div>
          <div class="stat-label">RAM Package</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon violet"><i data-lucide="shield"></i></div>
          <div class="stat-value" style="font-size:16px;">${Xe(i.panelRole)}</div>
          <div class="stat-label">Role Panel</div>
        </div>
        <div class="stat-card">
          <div class="stat-icon ${r.expired?"red":"cyan"}"><i data-lucide="clock"></i></div>
          <div class="stat-value" style="font-size:16px;">${r.expired?"EXPIRED":`${r.days}h ${r.hours}j`}</div>
          <div class="stat-label">Masa Aktif</div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="section">
        <div class="section-title"><i data-lucide="zap"></i> Aksi Cepat</div>
        <div style="display:flex;gap:12px;flex-wrap:wrap;">
          <button class="btn btn-primary" onclick="window.location.hash='packages'">
            <i data-lucide="upgrade"></i> Upgrade RAM
          </button>
          <button class="btn btn-secondary" onclick="window.location.hash='packages'">
            <i data-lucide="refresh-cw"></i> Perpanjang Role
          </button>
          <button class="btn btn-success" onclick="window.location.hash='packages'">
            <i data-lucide="shopping-cart"></i> Beli Role Baru
          </button>
        </div>
      </div>

      <!-- Active Package Info -->
      <div class="card">
        <div class="card-header">
          <div class="card-title"><i data-lucide="package"></i> Paket Aktif</div>
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">RAM</div>
            <div style="font-size:16px;font-weight:600;">${m(o.name)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Role Panel</div>
            <div style="font-size:16px;font-weight:600;">${Xe(i.panelRole)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Harga RAM/Bulan</div>
            <div style="font-size:16px;font-weight:600;color:var(--accent-cyan);">Rp ${m(o.price)}</div>
          </div>
          <div>
            <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;">Expire Date</div>
            <div style="font-size:16px;font-weight:600;">${X(i.expiredAt)}</div>
          </div>
        </div>
      </div>

      <!-- Servers List -->
      <div class="table-container">
        <div class="table-header">
          <h3>Server Saya</h3>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th>Nama Server</th>
              <th>RAM</th>
              <th>Status</th>
              <th>Dibuat</th>
            </tr>
          </thead>
          <tbody>
            ${!i.servers||Object.keys(i.servers).length===0?'<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada server. Hubungi admin untuk membuat server.</td></tr>':Object.entries(i.servers).map(([l,c])=>`
                <tr>
                  <td><strong>${m(c.name||l)}</strong></td>
                  <td>${m(c.ram||"-")}</td>
                  <td><span class="badge ${c.status!=="suspended"?"badge-active":"badge-inactive"}">${c.status||"active"}</span></td>
                  <td>${X(c.createdAt)}</td>
                </tr>
              `).join("")}
          </tbody>
        </table>
      </div>
    `,window.lucide&&lucide.createIcons()}catch(t){console.error("User dashboard error:",t),e.innerHTML='<div class="empty-state"><p>Error memuat dashboard.</p></div>',v("Gagal memuat dashboard.","error")}}let ie={},ze=[],le=1;const Ut=15;async function rt(){const n=document.getElementById("pageContent");try{ie=(await Se(R(A,"users"))).val()||{},ze=Object.entries(ie),le=1,ns(n)}catch(e){console.error("Manage users error:",e),n.innerHTML='<div class="empty-state"><p>Gagal memuat data user.</p></div>',v("Gagal memuat data user.","error")}}function ns(n){const e=(le-1)*Ut,t=e+Ut,i=ze.slice(e,t),s=Math.ceil(ze.length/Ut);n.innerHTML=`
    <div class="table-container">
      <div class="table-header">
        <h3>Kelola User (${ze.length})</h3>
        <div class="table-actions">
          <input type="text" class="search-input" id="userSearch" placeholder="Cari username..." 
                 oninput="filterUsers()" />
          <select class="form-select" id="roleFilter" onchange="filterUsers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Role</option>
            <option value="admin">Admin</option>
            <option value="reseller">Reseller</option>
            <option value="partner_publik_v1">Partner Publik V1</option>
            <option value="partner_publik_v2">Partner Publik V2</option>
            <option value="reseller_private">Reseller Private</option>
          </select>
          <select class="form-select" id="statusFilter" onchange="filterUsers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
            <option value="expired">Expired</option>
          </select>
          <button class="btn btn-primary" onclick="openAddUserModal()">
            <i data-lucide="user-plus"></i> Tambah User
          </button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Nama</th>
            <th>Role</th>
            <th>RAM</th>
            <th>Expired</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${i.length===0?'<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">Tidak ada data</td></tr>':""}
          ${i.map(([r,o])=>{const a=o.expiredAt&&Date.now()>o.expiredAt;return`
              <tr>
                <td><strong>${m(o.username||"")}</strong></td>
                <td>${m(o.name||"-")}</td>
                <td><span class="badge ${ts(o.role)}">${Xe(o.role)}</span></td>
                <td>${m(o.ramPackage||"-")}</td>
                <td style="font-size:12px;">${X(o.expiredAt)}</td>
                <td>
                  <span class="badge ${a?"badge-expired":o.isActive!==!1?"badge-active":"badge-inactive"}">
                    ${a?"Expired":o.isActive!==!1?"Aktif":"Nonaktif"}
                  </span>
                </td>
                <td>
                  <div class="table-actions-cell">
                    <button class="btn-icon" title="Edit" onclick="openEditUserModal('${r}')"><i data-lucide="edit-2"></i></button>
                    <button class="btn-icon" title="Perpanjang" onclick="openExtendModal('${r}')"><i data-lucide="calendar-plus"></i></button>
                    <button class="btn-icon" title="${o.isActive!==!1?"Nonaktifkan":"Aktifkan"}" onclick="toggleUserActive('${r}')">
                      <i data-lucide="${o.isActive!==!1?"user-x":"user-check"}"></i>
                    </button>
                    <button class="btn-icon" title="Lihat Server" onclick="viewUserServers('${r}')"><i data-lucide="server"></i></button>
                    <button class="btn-icon danger" title="Hapus" onclick="deleteUser('${r}')"><i data-lucide="trash-2"></i></button>
                  </div>
                </td>
              </tr>
            `}).join("")}
        </tbody>
      </table>
      ${s>1?`
        <div class="pagination">
          <button class="page-btn" onclick="goToPage(${le-1})" ${le<=1?"disabled":""}>←</button>
          ${Array.from({length:s},(r,o)=>o+1).map(r=>`
            <button class="page-btn ${r===le?"active":""}" onclick="goToPage(${r})">${r}</button>
          `).join("")}
          <button class="page-btn" onclick="goToPage(${le+1})" ${le>=s?"disabled":""}>→</button>
        </div>
      `:""}
    </div>
  `,window.lucide&&lucide.createIcons()}window.filterUsers=function(){var s,r,o;const n=(((s=document.getElementById("userSearch"))==null?void 0:s.value)||"").toLowerCase(),e=((r=document.getElementById("roleFilter"))==null?void 0:r.value)||"",t=((o=document.getElementById("statusFilter"))==null?void 0:o.value)||"";ze=Object.entries(ie).filter(([a,l])=>{const c=!n||(l.username||"").toLowerCase().includes(n)||(l.name||"").toLowerCase().includes(n),u=!e||l.role===e,d=l.expiredAt&&Date.now()>l.expiredAt;let h=!0;return t==="active"?h=l.isActive!==!1&&!d:t==="inactive"?h=l.isActive===!1:t==="expired"&&(h=d),c&&u&&h}),le=1;const i=document.getElementById("pageContent");ns(i)};window.goToPage=function(n){const e=Math.ceil(ze.length/Ut);if(n<1||n>e)return;le=n;const t=document.getElementById("pageContent");ns(t)};window.openAddUserModal=function(){const n=document.getElementById("modalOverlay"),e=document.getElementById("modalContent");n.style.display="flex";const t=es.map(i=>`<option value="${i.id}">${i.name} - Rp ${i.price}</option>`).join("");[...Wo.map(i=>`<option value="${i.id}">${i.name}</option>`)].join(""),e.innerHTML=`
    <div class="modal-header">
      <i data-lucide="user-plus" style="color:var(--accent-cyan);"></i>
      <h2>Tambah User Baru</h2>
    </div>
    <div class="modal-body">
      <form id="addUserForm">
        <div class="form-group">
          <label class="form-label">Username *</label>
          <input type="text" class="form-input" id="addUsername" required placeholder="Masukkan username" />
        </div>
        <div class="form-group">
          <label class="form-label">Password *</label>
          <input type="password" class="form-input" id="addPassword" required placeholder="Masukkan password" />
        </div>
        <div class="form-group">
          <label class="form-label">Nama Lengkap *</label>
          <input type="text" class="form-input" id="addName" required placeholder="Nama lengkap" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="addEmail" placeholder="email@example.com" />
        </div>
        <div class="form-group">
          <label class="form-label">WhatsApp</label>
          <input type="text" class="form-input" id="addWhatsapp" placeholder="08xxxxxxxxxx" />
        </div>
        <div class="form-group">
          <label class="form-label">Role *</label>
          <select class="form-select" id="addRole">
            <option value="reseller">Reseller</option>
            <option value="partner_publik_v1">Partner Publik V1</option>
            <option value="partner_publik_v2">Partner Publik V2</option>
            <option value="reseller_private">Reseller Private</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <div class="form-group">
          <label class="form-label">Paket RAM *</label>
          <select class="form-select" id="addRam">${t}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Expired At *</label>
          <input type="date" class="form-input" id="addExpired" required />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveNewUser()">Simpan</button>
    </div>
  `,window.lucide&&lucide.createIcons()};window.saveNewUser=async function(){const n=document.getElementById("addUsername").value.trim(),e=document.getElementById("addPassword").value.trim(),t=document.getElementById("addName").value.trim(),i=document.getElementById("addEmail").value.trim(),s=document.getElementById("addWhatsapp").value.trim(),r=document.getElementById("addRole").value,o=document.getElementById("addRam").value,a=document.getElementById("addExpired").value;if(!n||!e||!t){v("Mohon isi semua field yang wajib (*).","warning");return}for(const[,u]of Object.entries(ie))if(u.username&&u.username.toLowerCase()===n.toLowerCase()){v("Username sudah digunakan.","error");return}const l=Eh(),c=a?new Date(a).getTime():null;try{const u=R(A,`users/${l}`);await it(u,{username:n,password:e,role:r,name:t,email:i,whatsapp:s,profilePic:"",panelRole:r,ramPackage:o,expiredAt:c,createdAt:Date.now(),isActive:!0,isOnline:!1,lastLoginAt:0,servers:{}});const d=D();await K(d.uid,d.username,"create_user",`User baru dibuat: ${n}`),closeModal(),v(`User "${n}" berhasil ditambahkan.`,"success"),await rt()}catch(u){console.error("Create user error:",u),v("Gagal menambahkan user.","error")}};window.openEditUserModal=async function(n){const e=document.getElementById("modalOverlay"),t=document.getElementById("modalContent"),i=ie[n];if(!i)return;e.style.display="flex";const s=es.map(a=>`<option value="${a.id}" ${a.id===i.ramPackage?"selected":""}>${a.name} - Rp ${a.price}</option>`).join(""),r=["reseller","partner_publik_v1","partner_publik_v2","reseller_private","admin"].map(a=>`<option value="${a}" ${a===i.role?"selected":""}>${Xe(a)}</option>`).join(""),o=i.expiredAt?new Date(i.expiredAt).toISOString().split("T")[0]:"";t.innerHTML=`
    <div class="modal-header">
      <i data-lucide="edit-2" style="color:var(--accent-cyan);"></i>
      <h2>Edit User: ${m(i.username)}</h2>
    </div>
    <div class="modal-body">
      <form id="editUserForm">
        <div class="form-group">
          <label class="form-label">Username</label>
          <input type="text" class="form-input" value="${m(i.username)}" disabled style="opacity:0.6;" />
        </div>
        <div class="form-group">
          <label class="form-label">Nama Lengkap *</label>
          <input type="text" class="form-input" id="editName" value="${m(i.name||"")}" />
        </div>
        <div class="form-group">
          <label class="form-label">Email</label>
          <input type="email" class="form-input" id="editEmail" value="${m(i.email||"")}" />
        </div>
        <div class="form-group">
          <label class="form-label">WhatsApp</label>
          <input type="text" class="form-input" id="editWhatsapp" value="${m(i.whatsapp||"")}" />
        </div>
        <div class="form-group">
          <label class="form-label">Role *</label>
          <select class="form-select" id="editRole">${r}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Paket RAM *</label>
          <select class="form-select" id="editRam">${s}</select>
        </div>
        <div class="form-group">
          <label class="form-label">Expired At</label>
          <input type="date" class="form-input" id="editExpired" value="${o}" />
        </div>
        <div class="form-group">
          <label class="form-label">URL Foto Profil</label>
          <input type="url" class="form-input" id="editProfilePic" value="${m(i.profilePic||"")}" placeholder="https://..." />
        </div>
      </form>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="saveEditUser('${n}')">Simpan</button>
    </div>
  `,window.lucide&&lucide.createIcons()};window.saveEditUser=async function(n){const e=document.getElementById("editName").value.trim(),t=document.getElementById("editEmail").value.trim(),i=document.getElementById("editWhatsapp").value.trim(),s=document.getElementById("editRole").value,r=document.getElementById("editRam").value,o=document.getElementById("editExpired").value,a=document.getElementById("editProfilePic").value.trim();if(!e){v("Nama wajib diisi.","warning");return}const l=o?new Date(o).getTime():null;try{await he(R(A,`users/${n}`),{name:e,email:t,whatsapp:i,role:s,panelRole:s,ramPackage:r,expiredAt:l,profilePic:a});const c=D();await K(c.uid,c.username,"edit_user",`User diedit: ${n}`),closeModal(),v("User berhasil diperbarui.","success"),await rt()}catch(c){console.error("Edit user error:",c),v("Gagal memperbarui user.","error")}};window.toggleUserActive=async function(n){const e=ie[n];if(!e)return;const t=e.isActive!==!1;st(t?"Nonaktifkan User":"Aktifkan User",`Apakah Anda yakin ingin ${t?"menonaktifkan":"mengaktifkan"} user "${m(e.username)}"?`,async()=>{try{await he(R(A,`users/${n}`),{isActive:!t});const i=D();await K(i.uid,i.username,t?"deactivate_user":"activate_user",`User ${t?"dinonaktifkan":"diaktifkan"}: ${e.username}`),v(`User berhasil ${t?"dinonaktifkan":"diaktifkan"}.`,"success"),await rt()}catch(i){console.error("Toggle user error:",i),v("Gagal mengubah status user.","error")}})};window.openExtendModal=function(n){const e=document.getElementById("modalOverlay"),t=document.getElementById("modalContent"),i=ie[n];i&&(e.style.display="flex",t.innerHTML=`
    <div class="modal-header">
      <i data-lucide="calendar-plus" style="color:var(--accent-cyan);"></i>
      <h2>Perpanjang User: ${m(i.username)}</h2>
    </div>
    <div class="modal-body">
      <p style="margin-bottom:16px;color:var(--text-secondary);">
        Expired saat ini: <strong>${X(i.expiredAt)}</strong>
      </p>
      <div class="form-group">
        <label class="form-label">Tambah Hari</label>
        <input type="number" class="form-input" id="extendDays" min="1" placeholder="Jumlah hari (misal: 30)" />
      </div>
      <div class="form-group">
        <label class="form-label">Atau Tanggal Custom</label>
        <input type="date" class="form-input" id="extendDate" />
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn btn-secondary" onclick="closeModal()">Batal</button>
      <button class="btn btn-primary" onclick="extendUser('${n}')">Perpanjang</button>
    </div>
  `,window.lucide&&lucide.createIcons())};window.extendUser=async function(n){const e=parseInt(document.getElementById("extendDays").value),t=document.getElementById("extendDate").value;let i;if(t)i=new Date(t).getTime();else if(e&&e>0)i=(ie[n].expiredAt||Date.now())+e*24*60*60*1e3;else{v("Masukkan jumlah hari atau tanggal custom.","warning");return}try{await he(R(A,`users/${n}`),{expiredAt:i,isActive:!0});const s=D();await K(s.uid,s.username,"extend_user",`User diperpanjang: ${ie[n].username}`),closeModal(),v("User berhasil diperpanjang.","success"),await rt()}catch(s){console.error("Extend user error:",s),v("Gagal memperpanjang user.","error")}};window.deleteUser=function(n){const e=ie[n];e&&st("Hapus User",`Apakah Anda yakin ingin menghapus user "${m(e.username)}"? Tindakan ini tidak dapat dibatalkan.`,async()=>{try{await kn(R(A,`users/${n}`));const t=D();await K(t.uid,t.username,"delete_user",`User dihapus: ${e.username}`),v(`User "${e.username}" berhasil dihapus.`,"success"),await rt()}catch(t){console.error("Delete user error:",t),v("Gagal menghapus user.","error")}})};window.viewUserServers=function(n){const e=ie[n];if(!e||!e.servers){showInfoModal("Server User","<p>User ini belum memiliki server.</p>");return}const t=Object.entries(e.servers).map(([i,s])=>`
    <div style="padding:12px;background:var(--bg-primary);border-radius:8px;margin-bottom:8px;border:1px solid var(--border-color);">
      <div style="font-weight:600;">${m(s.name||i)}</div>
      <div style="font-size:12px;color:var(--text-muted);">RAM: ${m(s.ram||"-")} | Status: ${s.status||"active"}</div>
      <div style="font-size:11px;color:var(--text-muted);margin-top:4px;">Node: ${m(s.node||"-")}</div>
    </div>
  `).join("");showInfoModal(`Server milik ${m(e.username)}`,t)};window.closeModal=function(){document.getElementById("modalOverlay").style.display="none"};let Wt=[];async function is(){const n=document.getElementById("pageContent");try{const t=(await Se(R(A,"users"))).val()||{};Wt=[];for(const[i,s]of Object.entries(t))if(s.servers)for(const[r,o]of Object.entries(s.servers))Wt.push({uid:i,sid:r,owner:s.username||i,...o});zo(n,Wt)}catch(e){console.error("Manage servers error:",e),n.innerHTML='<div class="empty-state"><p>Gagal memuat data server.</p></div>',v("Gagal memuat data server.","error")}}function zo(n,e){const t={};e.forEach(i=>{const s=i.node||"default";t[s]||(t[s]=[]),t[s].push(i)}),n.innerHTML=`
    <!-- Stats -->
    <div class="stats-grid" style="margin-bottom:24px;">
      <div class="stat-card">
        <div class="stat-icon cyan"><i data-lucide="server"></i></div>
        <div class="stat-value">${e.length}</div>
        <div class="stat-label">Total Server</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon green"><i data-lucide="check-circle"></i></div>
        <div class="stat-value">${e.filter(i=>i.status!=="suspended").length}</div>
        <div class="stat-label">Server Aktif</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon red"><i data-lucide="x-circle"></i></div>
        <div class="stat-value">${e.filter(i=>i.status==="suspended").length}</div>
        <div class="stat-label">Server Suspend</div>
      </div>
      <div class="stat-card">
        <div class="stat-icon violet"><i data-lucide="hard-drive"></i></div>
        <div class="stat-value">${Object.keys(t).length}</div>
        <div class="stat-label">Node Aktif</div>
      </div>
    </div>

    <!-- Filter -->
    <div class="table-container">
      <div class="table-header">
        <h3>Kelola Server</h3>
        <div class="table-actions">
          <input type="text" class="search-input" id="serverSearch" placeholder="Cari server/owner..." 
                 oninput="filterServers()" />
          <select class="form-select" id="nodeFilter" onchange="filterServers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Node</option>
            ${Object.keys(t).map(i=>`<option value="${m(i)}">${m(i)}</option>`).join("")}
          </select>
          <select class="form-select" id="statusFilter" onchange="filterServers()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Status</option>
            <option value="active">Aktif</option>
            <option value="suspended">Suspend</option>
          </select>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Nama Server</th>
            <th>Owner</th>
            <th>RAM</th>
            <th>Status</th>
            <th>Node</th>
            <th>Dibuat</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          ${e.length===0?'<tr><td colspan="7" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada server</td></tr>':""}
          ${e.map(i=>`
            <tr>
              <td><strong>${m(i.name||i.sid)}</strong></td>
              <td>${m(i.owner)}</td>
              <td>${m(i.ram||"-")}</td>
              <td>
                <span class="badge ${i.status==="suspended"?"badge-inactive":"badge-active"}">
                  ${i.status==="suspended"?"Suspend":"Aktif"}
                </span>
              </td>
              <td>${m(i.node||"default")}</td>
              <td style="font-size:12px;">${X(i.createdAt)}</td>
              <td>
                <div class="table-actions-cell">
                  <button class="btn-icon" title="${i.status==="suspended"?"Unsuspend":"Suspend"}" 
                    onclick="toggleServerSuspend('${i.uid}', '${i.sid}', '${i.status||"active"}')">
                    <i data-lucide="${i.status==="suspended"?"play":"pause"}"></i>
                  </button>
                  <button class="btn-icon danger" title="Hapus" onclick="deleteServer('${i.uid}', '${i.sid}', '${m(i.name||i.sid)}')">
                    <i data-lucide="trash-2"></i>
                  </button>
                </div>
              </td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,window.lucide&&lucide.createIcons()}window.filterServers=function(){var r,o,a;const n=(((r=document.getElementById("serverSearch"))==null?void 0:r.value)||"").toLowerCase(),e=((o=document.getElementById("nodeFilter"))==null?void 0:o.value)||"",t=((a=document.getElementById("statusFilter"))==null?void 0:a.value)||"",i=Wt.filter(l=>{const c=!n||(l.name||"").toLowerCase().includes(n)||(l.owner||"").toLowerCase().includes(n),u=!e||l.node===e,d=!t||(t==="active"?l.status!=="suspended":l.status==="suspended");return c&&u&&d}),s=document.getElementById("pageContent");zo(s,i)};window.toggleServerSuspend=async function(n,e,t){const i=t==="suspended"?"active":"suspended",s=i==="suspended"?"suspend":"unsuspend";st(i==="suspended"?"Suspend Server":"Unsuspend Server",`Apakah Anda yakin ingin ${s==="suspend"?"mensuspend":"mengaktifkan kembali"} server ini?`,async()=>{try{await he(R(A,`users/${n}/servers/${e}`),{status:i});const r=D();await K(r.uid,r.username,`${s}_server`,`Server ${s}: ${e}`),v(`Server berhasil di-${s==="suspend"?"suspend":"aktifkan"}.`,"success"),await is()}catch(r){console.error("Toggle server error:",r),v("Gagal mengubah status server.","error")}})};window.deleteServer=function(n,e,t){st("Hapus Server",`Apakah Anda yakin ingin menghapus server "${m(t)}"? Tindakan ini tidak dapat dibatalkan.`,async()=>{try{await kn(R(A,`users/${n}/servers/${e}`));const i=D();await K(i.uid,i.username,"delete_server",`Server dihapus: ${t}`),v(`Server "${t}" berhasil dihapus.`,"success"),await is()}catch(i){console.error("Delete server error:",i),v("Gagal menghapus server.","error")}})};let It=[],mi=null;async function Oh(){const n=document.getElementById("pageContent");try{await Qs(),on(n,It),clearInterval(mi),mi=setInterval(()=>{Qs().then(()=>{on(n,It)}).catch(()=>{})},1e4)}catch(e){console.error("Activity logs error:",e),n.innerHTML='<div class="empty-state"><p>Gagal memuat activity logs.</p></div>',v("Gagal memuat activity logs.","error")}}async function Qs(){const e=(await Se(R(A,"activityLogs"))).val()||{};It=Object.entries(e).sort(([,t],[,i])=>(i.timestamp||0)-(t.timestamp||0)).map(([t,i])=>({id:t,...i}))}function on(n,e){n.innerHTML=`
    <div class="table-container">
      <div class="table-header">
        <h3>Activity Logs / CCTV (${e.length})</h3>
        <div class="table-actions">
          <input type="text" class="search-input" id="logSearch" placeholder="Cari log..." 
                 oninput="filterLogs()" />
          <select class="form-select" id="logUserFilter" onchange="filterLogs()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua User</option>
            ${[...new Set(e.map(t=>t.username))].map(t=>`<option value="${m(t)}">${m(t)}</option>`).join("")}
          </select>
          <select class="form-select" id="logActionFilter" onchange="filterLogs()" style="width:auto;padding:8px 36px 8px 12px;">
            <option value="">Semua Aksi</option>
            ${[...new Set(e.map(t=>t.action))].map(t=>`<option value="${m(t)}">${m(t)}</option>`).join("")}
          </select>
          <button class="btn btn-danger btn-sm" onclick="clearAllLogs()">
            <i data-lucide="trash-2"></i> Bersihkan
          </button>
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>Waktu</th>
            <th>User</th>
            <th>Aksi</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          ${e.length===0?'<tr><td colspan="4" style="text-align:center;color:var(--text-muted);padding:24px;">Belum ada aktivitas</td></tr>':""}
          ${e.slice(0,200).map(t=>`
            <tr>
              <td style="font-size:12px;white-space:nowrap;">${X(t.timestamp)}</td>
              <td><strong>${m(t.username||"-")}</strong></td>
              <td><span class="badge badge-user">${m(t.action||"-")}</span></td>
              <td>${m(t.detail||"-")}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
    </div>
  `,window.lucide&&lucide.createIcons()}window.filterLogs=function(){var r,o,a;const n=(((r=document.getElementById("logSearch"))==null?void 0:r.value)||"").toLowerCase(),e=((o=document.getElementById("logUserFilter"))==null?void 0:o.value)||"",t=((a=document.getElementById("logActionFilter"))==null?void 0:a.value)||"",i=It.filter(l=>{const c=!n||(l.action||"").toLowerCase().includes(n)||(l.detail||"").toLowerCase().includes(n)||(l.username||"").toLowerCase().includes(n),u=!e||l.username===e,d=!t||l.action===t;return c&&u&&d}),s=document.getElementById("pageContent");on(s,i)};window.clearAllLogs=async function(){st("Bersihkan Semua Log","Apakah Anda yakin ingin menghapus SEMUA activity logs? Tindakan ini tidak dapat dibatalkan.",async()=>{try{await kn(R(A,"activityLogs"));const n=D();await K(n.uid,n.username,"clear_logs","Semua activity logs dibersihkan"),v("Semua log berhasil dihapus.","success"),It=[];const e=document.getElementById("pageContent");on(e,[])}catch(n){console.error("Clear logs error:",n),v("Gagal menghapus logs.","error")}})};window.addEventListener("hashchange",()=>{clearInterval(mi)});async function Mh(){const n=document.getElementById("pageContent");D();const e=es.map((i,s)=>`
    <div class="package-card ${i.id==="unlimited"?"popular":""}">
      ${i.id==="unlimited"?'<span class="package-badge">Populer</span>':""}
      <div style="margin-bottom:8px;">
        <i data-lucide="memory-stick" style="width:32px;height:32px;color:var(--accent-cyan);"></i>
      </div>
      <div class="package-name">RAM ${m(i.name)}</div>
      <div class="package-price">Rp ${m(i.price)}</div>
      <div class="package-price-label">/bulan</div>
      <ul class="package-features">
        <li><i data-lucide="check"></i> ${m(i.name)} RAM Dedicated</li>
        <li><i data-lucide="check"></i> Panel Pterodactyl</li>
        <li><i data-lucide="check"></i> Unlimited Disk Space</li>
        <li><i data-lucide="check"></i> DDoS Protection</li>
        <li><i data-lucide="check"></i> 24/7 Support</li>
      </ul>
      <button class="btn btn-primary" style="width:100%;" 
        onclick="buyRamPackage('${m(i.name)}', '${m(i.price)}')">
        <i data-lucide="shopping-cart"></i> Beli Sekarang
      </button>
    </div>
  `).join(""),t=Wo.map((i,s)=>`
    <div class="package-card ${i.id==="partner_publik_v1"?"popular":""}">
      ${i.id==="partner_publik_v1"?'<span class="package-badge">Populer</span>':""}
      <div style="margin-bottom:8px;">
        <i data-lucide="shield" style="width:32px;height:32px;color:var(--accent-violet);"></i>
      </div>
      <div class="package-name">${m(i.name)}</div>
      <div class="package-price">Rp ${m(i.price)}</div>
      <div class="package-price-label">awal · Perpanjang: Rp ${m(i.renewalPrice)}/bulan</div>
      <ul class="package-features">
        <li><i data-lucide="check"></i> Full Panel Access</li>
        <li><i data-lucide="check"></i> Server Management</li>
        <li><i data-lucide="check"></i> ${i.id==="reseller"||i.id==="reseller_private"?"Resell ke customer":"Priority Support"}</li>
        <li><i data-lucide="check"></i> Backup & Restore</li>
        <li><i data-lucide="check"></i> API Access</li>
      </ul>
      <div style="display:flex;gap:8px;">
        <button class="btn btn-primary" style="flex:1;" 
          onclick="buyRolePackage('${m(i.name)}', '${m(i.price)}', false)">
          <i data-lucide="shopping-cart"></i> Beli Baru
        </button>
        <button class="btn btn-secondary" style="flex:1;" 
          onclick="buyRolePackage('${m(i.name)}', '${m(i.renewalPrice)}', true)">
          <i data-lucide="refresh-cw"></i> Perpanjang
        </button>
      </div>
    </div>
  `).join("");n.innerHTML=`
    <!-- RAM Packages -->
    <div class="section">
      <div class="section-title">
        <i data-lucide="memory-stick"></i> Paket RAM Panel Pterodactyl
      </div>
      <div class="card-grid">
        ${e}
      </div>
    </div>

    <!-- Role Packages -->
    <div class="section">
      <div class="section-title">
        <i data-lucide="shield"></i> Role Panel
      </div>
      <div class="card-grid">
        ${t}
      </div>
    </div>
  `,window.lucide&&lucide.createIcons()}window.buyRamPackage=function(n,e){const t=Ch(n,e);Bo(t)};window.buyRolePackage=function(n,e,t){const i=Ih(n,e,t);Bo(i)};async function Lh(n){const e=document.getElementById("pageContent");try{const{get:t}=await pt(async()=>{const{get:r}=await Promise.resolve().then(()=>An);return{get:r}},void 0),s=(await t(R(A,`users/${n.uid}`))).val()||n;e.innerHTML=`
      <div style="max-width:600px;">
        <!-- Profile Photo -->
        <div class="settings-section">
          <h3><i data-lucide="image" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Foto Profil</h3>
          <div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;">
            <img src="${s.profilePic||`https://ui-avatars.com/api/?name=${encodeURIComponent(s.name||s.username)}&background=131b33&color=38bdf8&size=96`}" 
                 alt="avatar" style="width:80px;height:80px;border-radius:50%;border:2px solid var(--border-color);object-fit:cover;" />
            <div>
              <p style="font-size:13px;color:var(--text-secondary);">Masukkan URL gambar untuk foto profil Anda.</p>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">URL Foto Profil</label>
            <input type="url" class="form-input" id="settingProfilePic" value="${m(s.profilePic||"")}" placeholder="https://example.com/avatar.jpg" />
          </div>
          <button class="btn btn-primary" onclick="saveProfilePic()">
            <i data-lucide="save"></i> Simpan Foto
          </button>
        </div>

        <!-- Password -->
        <div class="settings-section">
          <h3><i data-lucide="lock" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Ganti Password</h3>
          <div class="form-group">
            <label class="form-label">Password Baru</label>
            <input type="password" class="form-input" id="settingNewPassword" placeholder="Masukkan password baru" />
          </div>
          <div class="form-group">
            <label class="form-label">Konfirmasi Password</label>
            <input type="password" class="form-input" id="settingConfirmPassword" placeholder="Ulangi password baru" />
          </div>
          <button class="btn btn-primary" onclick="savePassword()">
            <i data-lucide="save"></i> Ganti Password
          </button>
        </div>

        <!-- Account Info (Read-only) -->
        <div class="settings-section">
          <h3><i data-lucide="user" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Info Akun</h3>
          <div style="display:grid;gap:12px;">
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Username</div>
              <div style="font-size:14px;font-weight:500;">${m(s.username)}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Role</div>
              <div style="font-size:14px;font-weight:500;">${m(s.role)}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Panel Role</div>
              <div style="font-size:14px;font-weight:500;">${m(s.panelRole||"-")}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Email</div>
              <div style="font-size:14px;font-weight:500;">${m(s.email||"-")}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">WhatsApp</div>
              <div style="font-size:14px;font-weight:500;">${m(s.whatsapp||"-")}</div>
            </div>
            <div>
              <div style="font-size:12px;color:var(--text-muted);margin-bottom:2px;">Bergabung Sejak</div>
              <div style="font-size:14px;font-weight:500;">${m(s.createdAt?new Date(s.createdAt).toLocaleDateString("id-ID",{day:"2-digit",month:"long",year:"numeric"}):"-")}</div>
            </div>
          </div>
        </div>
      </div>
    `,window.lucide&&lucide.createIcons()}catch(t){console.error("Settings error:",t),v("Gagal memuat pengaturan.","error")}}window.saveProfilePic=async function(){const n=D(),e=document.getElementById("settingProfilePic").value.trim();try{await he(R(A,`users/${n.uid}`),{profilePic:e});const t=D();t.profilePic=e,localStorage.setItem("mp_session",JSON.stringify(t)),await K(n.uid,n.username,"update_profile_pic","Foto profil diperbarui"),v("Foto profil berhasil diperbarui.","success"),setTimeout(()=>window.location.hash="settings",1e3)}catch(t){console.error("Save profile pic error:",t),v("Gagal menyimpan foto profil.","error")}};window.savePassword=async function(){const n=D(),e=document.getElementById("settingNewPassword").value.trim(),t=document.getElementById("settingConfirmPassword").value.trim();if(!e||!t){v("Mohon isi semua field password.","warning");return}if(e!==t){v("Password tidak cocok.","error");return}if(e.length<6){v("Password minimal 6 karakter.","warning");return}try{await he(R(A,`users/${n.uid}`),{password:e}),await K(n.uid,n.username,"change_password","Password berhasil diganti"),document.getElementById("settingNewPassword").value="",document.getElementById("settingConfirmPassword").value="",v("Password berhasil diganti.","success")}catch(i){console.error("Save password error:",i),v("Gagal mengganti password.","error")}};async function Go(){const n=document.getElementById("pageContent");try{const t=(await Se(R(A,"pengumuman"))).val()||{};n.innerHTML=`
      <div style="max-width:600px;">
        <div class="settings-section">
          <h3><i data-lucide="megaphone" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Kirim Pengumuman</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
            Pengumuman akan ditampilkan ke semua user saat mereka login.
          </p>
          <div class="form-group">
            <label class="form-label">Pesan Pengumuman</label>
            <textarea class="form-input" id="announcementMsg" rows="6" placeholder="Tulis pengumuman di sini..." 
                      style="resize:vertical;min-height:120px;"></textarea>
          </div>
          <button class="btn btn-primary" onclick="sendAnnouncement()">
            <i data-lucide="send"></i> Kirim Pengumuman
          </button>
        </div>

        <!-- Current Announcement -->
        <div class="settings-section">
          <h3><i data-lucide="info" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Pengumuman Saat Ini</h3>
          ${t.pesan?`
            <div class="announcement-banner" style="margin-bottom:0;">
              <i data-lucide="megaphone"></i>
              <div class="announcement-content">
                <p style="white-space:pre-wrap;">${m(t.pesan)}</p>
                <div class="announcement-meta">
                  Oleh: ${m(t.oleh||"Admin")} · ${X(t.timestamp)}
                </div>
              </div>
            </div>
          `:`
            <div class="empty-state" style="padding:24px;">
              <i data-lucide="message-square-off" style="width:32px;height:32px;display:block;margin:0 auto 8px;"></i>
              <p>Belum ada pengumuman.</p>
            </div>
          `}
        </div>

        <!-- Broadcast to all users -->
        <div class="settings-section">
          <h3><i data-lucide="radio" style="width:16px;height:16px;vertical-align:middle;margin-right:6px;"></i> Broadcast ke Semua User</h3>
          <p style="font-size:13px;color:var(--text-secondary);margin-bottom:16px;">
            Kirim pesan broadcast yang akan muncul sebagai popup saat user login.
          </p>
          <div class="form-group">
            <label class="form-label">Pesan Broadcast</label>
            <textarea class="form-input" id="broadcastMsg" rows="4" placeholder="Tulis pesan broadcast..." 
                      style="resize:vertical;min-height:100px;"></textarea>
          </div>
          <button class="btn btn-success" onclick="sendBroadcast()">
            <i data-lucide="send"></i> Broadcast ke Semua User
          </button>
        </div>
      </div>
    `,window.lucide&&lucide.createIcons()}catch(e){console.error("Announcement error:",e),v("Gagal memuat pengumuman.","error")}}window.sendAnnouncement=async function(){const n=D(),e=document.getElementById("announcementMsg").value.trim();if(!e){v("Pesan pengumuman tidak boleh kosong.","warning");return}try{await it(R(A,"pengumuman"),{pesan:e,timestamp:Date.now(),oleh:n.username}),await K(n.uid,n.username,"send_announcement","Pengumuman dikirim"),v("Pengumuman berhasil dikirim!","success"),document.getElementById("announcementMsg").value="",await Go()}catch(t){console.error("Send announcement error:",t),v("Gagal mengirim pengumuman.","error")}};window.sendBroadcast=async function(){const n=D(),e=document.getElementById("broadcastMsg").value.trim();if(!e){v("Pesan broadcast tidak boleh kosong.","warning");return}st("Kirim Broadcast",`Apakah Anda yakin ingin mengirim broadcast ke SEMUA user? Pesan: "${m(e.substring(0,50))}${e.length>50?"...":""}"`,async()=>{try{const{push:t}=await pt(async()=>{const{push:s}=await Promise.resolve().then(()=>An);return{push:s}},void 0),i=t(R(A,"broadcasts"));await it(i,{message:e,sender:n.username,senderUid:n.uid,timestamp:Date.now(),readBy:{}}),await K(n.uid,n.username,"send_broadcast","Broadcast dikirim ke semua user"),v("Broadcast berhasil dikirim ke semua user!","success"),document.getElementById("broadcastMsg").value=""}catch(t){console.error("Broadcast error:",t),v("Gagal mengirim broadcast.","error")}})};function $h(){window.lucide&&lucide.createIcons()}window.toggleSidebar=function(){document.getElementById("sidebar").classList.toggle("open")};window.logout=async function(){await kh()};function Fh(n){return n==="admin"?[{hash:"dashboard",icon:"layout-dashboard",label:"Dashboard"},{hash:"manage_users",icon:"users",label:"Kelola User"},{hash:"manage_servers",icon:"server",label:"Kelola Server"},{hash:"activity_logs",icon:"activity",label:"Activity Logs"},{hash:"announcement",icon:"megaphone",label:"Pengumuman"},{hash:"settings",icon:"settings",label:"Pengaturan"}]:[{hash:"dashboard",icon:"layout-dashboard",label:"Dashboard"},{hash:"packages",icon:"package",label:"Beli Paket"},{hash:"settings",icon:"settings",label:"Pengaturan"}]}const Bh={dashboard:"Dashboard",manage_users:"Kelola User",manage_servers:"Kelola Server",activity_logs:"Activity Logs",announcement:"Pengumuman",settings:"Pengaturan",packages:"Beli Paket"};let Ys=null,Uh=null;function Wh(n){clearInterval(Ys),clearInterval(Uh);const e=()=>{const t=document.getElementById("countdownMini"),i=document.getElementById("sidebarCountdown");if(!n){t&&(t.textContent="Tanpa expiry"),i&&(i.innerHTML="");return}const s=Uo(n),r=Sh(n);t&&(t.textContent=r.text,r.expired?t.classList.add("expired"):t.classList.remove("expired")),i&&(s.expired?i.innerHTML=`
          <div class="countdown-label">Masa Aktif</div>
          <div class="countdown-text expired">EXPIRED</div>
          <div class="countdown-label">${X(n)}</div>
        `:i.innerHTML=`
          <div class="countdown-label">Masa Aktif</div>
          <div class="countdown-text">${s.days}h ${s.hours}j ${s.minutes}m ${s.seconds}d</div>
          <div class="countdown-label">${X(n)}</div>
        `);const o=document.getElementById("expiredBanner");o&&(o.style.display=s.expired?"flex":"none")};e(),Ys=setInterval(e,1e3)}function Hh(){const n=D(),e=document.getElementById("sidebarNav"),t=document.getElementById("sidebarProfile"),i=document.getElementById("roleBadge"),s=document.getElementById("avatarImg"),r=document.getElementById("brandName");if(!e||!n)return;r.textContent="ZeroixDark Marketplace";const o=Fh(n.role);e.innerHTML=o.map(a=>`
    <div class="nav-item" data-hash="${a.hash}" onclick="navigateTo('${a.hash}')">
      <i data-lucide="${a.icon}"></i>
      <span>${m(a.label)}</span>
    </div>
  `).join(""),t.innerHTML=`
    <img src="${n.profilePic||"https://ui-avatars.com/api/?name=${encodeURIComponent(session.name || session.username)}&background=131b33&color=38bdf8&size=72"}" 
         class="profile-avatar" alt="avatar" />
    <div class="profile-info">
      <div class="profile-name">${m(n.name||n.username)}</div>
      <div class="profile-username">@${m(n.username)}</div>
    </div>
  `,i&&(i.textContent=Xe(n.role),i.className=`role-badge ${ts(n.role)}`),s&&(s.src=n.profilePic||`https://ui-avatars.com/api/?name=${encodeURIComponent(n.name||n.username)}&background=131b33&color=38bdf8&size=72`),Wh(n.expiredAt)}window.navigateTo=function(n){window.location.hash=n};async function Xs(){const n=window.location.hash.replace("#","")||"dashboard",e=D();document.getElementById("app");const t=document.getElementById("pageContent"),i=document.getElementById("pageTitle");document.querySelectorAll(".nav-item").forEach(s=>{s.classList.toggle("active",s.dataset.hash===n)}),i&&(i.textContent=Bh[n]||"Dashboard"),t&&(t.innerHTML='<div class="skeleton-loader"><div class="skeleton-row" style="width:60%;margin-bottom:12px;"></div><div class="skeleton-row" style="width:80%;margin-bottom:12px;"></div></div>');try{switch(n){case"dashboard":e.role==="admin"?await Rh("admin"):await Dh(e);break;case"manage_users":Bt()&&await rt();break;case"manage_servers":Bt()&&await is();break;case"activity_logs":Bt()&&await Oh();break;case"packages":await Mh();break;case"settings":await Lh(e);break;case"announcement":Bt()&&await Go();break;default:window.location.hash="dashboard";break}}catch(s){console.error("Page render error:",s),v("Terjadi kesalahan saat memuat halaman.","error")}$h()}async function jh(){try{const{ref:n,get:e}=await pt(async()=>{const{ref:s,get:r}=await Promise.resolve().then(()=>An);return{ref:s,get:r}},void 0),i=(await e(n(A,"pengumuman"))).val();if(i){const s=localStorage.getItem("mp_last_announcement"),r=i.timestamp||0;if(!s||parseInt(s)<r){const o=document.getElementById("modalOverlay"),a=document.getElementById("modalContent");o.style.display="flex",a.innerHTML=`
          <div class="modal-header">
            <i data-lucide="megaphone" style="color:var(--accent-violet);"></i>
            <h2>Pengumuman</h2>
          </div>
          <div class="modal-body">
            <p style="white-space:pre-wrap;">${m(i.pesan||"")}</p>
            <p style="font-size:12px;color:var(--text-muted);margin-top:12px;">
              Oleh: ${m(i.oleh||"Admin")} | ${X(i.timestamp)}
            </p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary" id="closeAnnouncement">Mengerti</button>
          </div>
        `,window.lucide&&lucide.createIcons(),document.getElementById("closeAnnouncement").onclick=()=>{o.style.display="none",localStorage.setItem("mp_last_announcement",r.toString())}}}}catch(n){console.error("Check announcement error:",n)}}async function Vh(){if(window.location.pathname.includes("login")){if(D()&&isLoggedIn()){window.location.href="/";return}document.getElementById("app").style.display="none";return}if(!xh())return;const n=D(),e=document.getElementById("app");e.style.display="flex",Ah(n.uid),window.addEventListener("beforeunload",()=>{Ph(n.uid)}),Hh(),n.role!=="admin"&&await jh(),window.addEventListener("hashchange",Xs),await Xs()}Vh();window.showToast=v;
