var Wh=Object.defineProperty;var Hh=(s,t,e)=>t in s?Wh(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var Te=(s,t,e)=>(Hh(s,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&n(a)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();const eu="14.7.77",yc=(s,t,e)=>({endTime:t,insertTime:e,type:"exponentialRampToValue",value:s}),Sc=(s,t,e)=>({endTime:t,insertTime:e,type:"linearRampToValue",value:s}),_a=(s,t)=>({startTime:t,type:"setValue",value:s}),nu=(s,t,e)=>({duration:e,startTime:t,type:"setValueCurve",values:s}),iu=(s,t,{startTime:e,target:n,timeConstant:i})=>n+(t-n)*Math.exp((e-s)/i),as=s=>s.type==="exponentialRampToValue",Jr=s=>s.type==="linearRampToValue",ii=s=>as(s)||Jr(s),za=s=>s.type==="setValue",zn=s=>s.type==="setValueCurve",Qr=(s,t,e,n)=>{const i=s[t];return i===void 0?n:ii(i)||za(i)?i.value:zn(i)?i.values[i.values.length-1]:iu(e,Qr(s,t-1,i.startTime,n),i)},Mc=(s,t,e,n,i)=>e===void 0?[n.insertTime,i]:ii(e)?[e.endTime,e.value]:za(e)?[e.startTime,e.value]:zn(e)?[e.startTime+e.duration,e.values[e.values.length-1]]:[e.startTime,Qr(s,t-1,e.startTime,i)],va=s=>s.type==="cancelAndHold",xa=s=>s.type==="cancelScheduledValues",Jn=s=>va(s)||xa(s)?s.cancelTime:as(s)||Jr(s)?s.endTime:s.startTime,bc=(s,t,e,{endTime:n,value:i})=>e===i?i:0<e&&0<i||e<0&&i<0?e*(i/e)**((s-t)/(n-t)):0,wc=(s,t,e,{endTime:n,value:i})=>e+(s-t)/(n-t)*(i-e),qh=(s,t)=>{const e=Math.floor(t),n=Math.ceil(t);return e===n?s[e]:(1-(t-e))*s[e]+(1-(n-t))*s[n]},Xh=(s,{duration:t,startTime:e,values:n})=>{const i=(s-e)/t*(n.length-1);return qh(n,i)},yr=s=>s.type==="setTarget";class jh{constructor(t){this._automationEvents=[],this._currenTime=0,this._defaultValue=t}[Symbol.iterator](){return this._automationEvents[Symbol.iterator]()}add(t){const e=Jn(t);if(va(t)||xa(t)){const n=this._automationEvents.findIndex(r=>xa(t)&&zn(r)?r.startTime+r.duration>=e:Jn(r)>=e),i=this._automationEvents[n];if(n!==-1&&(this._automationEvents=this._automationEvents.slice(0,n)),va(t)){const r=this._automationEvents[this._automationEvents.length-1];if(i!==void 0&&ii(i)){if(r!==void 0&&yr(r))throw new Error("The internal list is malformed.");const a=r===void 0?i.insertTime:zn(r)?r.startTime+r.duration:Jn(r),o=r===void 0?this._defaultValue:zn(r)?r.values[r.values.length-1]:r.value,c=as(i)?bc(e,a,o,i):wc(e,a,o,i),l=as(i)?yc(c,e,this._currenTime):Sc(c,e,this._currenTime);this._automationEvents.push(l)}if(r!==void 0&&yr(r)&&this._automationEvents.push(_a(this.getValue(e),e)),r!==void 0&&zn(r)&&r.startTime+r.duration>e){const a=e-r.startTime,o=(r.values.length-1)/r.duration,c=Math.max(2,1+Math.ceil(a*o)),l=a/(c-1)*o,u=r.values.slice(0,c);if(l<1)for(let h=1;h<c;h+=1){const f=l*h%1;u[h]=r.values[h-1]*(1-f)+r.values[h]*f}this._automationEvents[this._automationEvents.length-1]=nu(u,r.startTime,a)}}}else{const n=this._automationEvents.findIndex(a=>Jn(a)>e),i=n===-1?this._automationEvents[this._automationEvents.length-1]:this._automationEvents[n-1];if(i!==void 0&&zn(i)&&Jn(i)+i.duration>e)return!1;const r=as(t)?yc(t.value,t.endTime,this._currenTime):Jr(t)?Sc(t.value,e,this._currenTime):t;if(n===-1)this._automationEvents.push(r);else{if(zn(t)&&e+t.duration>Jn(this._automationEvents[n]))return!1;this._automationEvents.splice(n,0,r)}}return!0}flush(t){const e=this._automationEvents.findIndex(n=>Jn(n)>t);if(e>1){const n=this._automationEvents.slice(e-1),i=n[0];yr(i)&&n.unshift(_a(Qr(this._automationEvents,e-2,i.startTime,this._defaultValue),i.startTime)),this._automationEvents=n}}getValue(t){if(this._automationEvents.length===0)return this._defaultValue;const e=this._automationEvents.findIndex(a=>Jn(a)>t),n=this._automationEvents[e],i=(e===-1?this._automationEvents.length:e)-1,r=this._automationEvents[i];if(r!==void 0&&yr(r)&&(n===void 0||!ii(n)||n.insertTime>t))return iu(t,Qr(this._automationEvents,i-1,r.startTime,this._defaultValue),r);if(r!==void 0&&za(r)&&(n===void 0||!ii(n)))return r.value;if(r!==void 0&&zn(r)&&(n===void 0||!ii(n)||r.startTime+r.duration>t))return t<r.startTime+r.duration?Xh(t,r):r.values[r.values.length-1];if(r!==void 0&&ii(r)&&(n===void 0||!ii(n)))return r.value;if(n!==void 0&&as(n)){const[a,o]=Mc(this._automationEvents,i,r,n,this._defaultValue);return bc(t,a,o,n)}if(n!==void 0&&Jr(n)){const[a,o]=Mc(this._automationEvents,i,r,n,this._defaultValue);return wc(t,a,o,n)}return this._defaultValue}}const Yh=s=>({cancelTime:s,type:"cancelAndHold"}),$h=s=>({cancelTime:s,type:"cancelScheduledValues"}),Zh=(s,t)=>({endTime:t,type:"exponentialRampToValue",value:s}),Kh=(s,t)=>({endTime:t,type:"linearRampToValue",value:s}),Jh=(s,t,e)=>({startTime:t,target:s,timeConstant:e,type:"setTarget"}),Qh=()=>new DOMException("","AbortError"),td=s=>(t,e,[n,i,r],a)=>{s(t[i],[e,n,r],o=>o[0]===e&&o[1]===n,a)},ed=s=>(t,e,n)=>{const i=[];for(let r=0;r<n.numberOfInputs;r+=1)i.push(new Set);s.set(t,{activeInputs:i,outputs:new Set,passiveInputs:new WeakMap,renderer:e})},nd=s=>(t,e)=>{s.set(t,{activeInputs:new Set,passiveInputs:new WeakMap,renderer:e})},ms=new WeakSet,su=new WeakMap,Ba=new WeakMap,ru=new WeakMap,Ga=new WeakMap,vo=new WeakMap,ou=new WeakMap,ya=new WeakMap,Sa=new WeakMap,Ma=new WeakMap,au={construct(){return au}},id=s=>{try{const t=new Proxy(s,au);new t}catch{return!1}return!0},Tc=/^import(?:(?:[\s]+[\w]+|(?:[\s]+[\w]+[\s]*,)?[\s]*\{[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?(?:[\s]*,[\s]*[\w]+(?:[\s]+as[\s]+[\w]+)?)*[\s]*}|(?:[\s]+[\w]+[\s]*,)?[\s]*\*[\s]+as[\s]+[\w]+)[\s]+from)?(?:[\s]*)("([^"\\]|\\.)+"|'([^'\\]|\\.)+')(?:[\s]*);?/,Ec=(s,t)=>{const e=[];let n=s.replace(/^[\s]+/,""),i=n.match(Tc);for(;i!==null;){const r=i[1].slice(1,-1),a=i[0].replace(/([\s]+)?;?$/,"").replace(r,new URL(r,t).toString());e.push(a),n=n.slice(i[0].length).replace(/^[\s]+/,""),i=n.match(Tc)}return[e.join(";"),n]},Ac=s=>{if(s!==void 0&&!Array.isArray(s))throw new TypeError("The parameterDescriptors property of given value for processorCtor is not an array.")},Cc=s=>{if(!id(s))throw new TypeError("The given value for processorCtor should be a constructor.");if(s.prototype===null||typeof s.prototype!="object")throw new TypeError("The given value for processorCtor should have a prototype.")},sd=(s,t,e,n,i,r,a,o,c,l,u,h,f)=>{let p=0;return(g,_,m={credentials:"omit"})=>{const d=u.get(g);if(d!==void 0&&d.has(_))return Promise.resolve();const b=l.get(g);if(b!==void 0){const v=b.get(_);if(v!==void 0)return v}const S=r(g),y=S.audioWorklet===void 0?i(_).then(([v,T])=>{const[A,E]=Ec(v,T),x=`${A};((a,b)=>{(a[b]=a[b]||[]).push((AudioWorkletProcessor,global,registerProcessor,sampleRate,self,window)=>{${E}
})})(window,'_AWGS')`;return e(x)}).then(()=>{const v=f._AWGS.pop();if(v===void 0)throw new SyntaxError;n(S.currentTime,S.sampleRate,()=>v(class{},void 0,(T,A)=>{if(T.trim()==="")throw t();const E=Sa.get(S);if(E!==void 0){if(E.has(T))throw t();Cc(A),Ac(A.parameterDescriptors),E.set(T,A)}else Cc(A),Ac(A.parameterDescriptors),Sa.set(S,new Map([[T,A]]))},S.sampleRate,void 0,void 0))}):Promise.all([i(_),Promise.resolve(s(h,h))]).then(([[v,T],A])=>{const E=p+1;p=E;const[x,M]=Ec(v,T),I=`${x};((AudioWorkletProcessor,registerProcessor)=>{${M}
})(${A?"AudioWorkletProcessor":"class extends AudioWorkletProcessor {__b=new WeakSet();constructor(){super();(p=>p.postMessage=(q=>(m,t)=>q.call(p,m,t?t.filter(u=>!this.__b.has(u)):t))(p.postMessage))(this.port)}}"},(n,p)=>registerProcessor(n,class extends p{${A?"":"__c = (a) => a.forEach(e=>this.__b.add(e.buffer));"}process(i,o,p){${A?"":"i.forEach(this.__c);o.forEach(this.__c);this.__c(Object.values(p));"}return super.process(i.map(j=>j.some(k=>k.length===0)?[]:j),o,p)}}));registerProcessor('__sac${E}',class extends AudioWorkletProcessor{process(){return !1}})`,k=new Blob([I],{type:"application/javascript; charset=utf-8"}),F=URL.createObjectURL(k);return S.audioWorklet.addModule(F,m).then(()=>{if(o(S))return S;const z=a(S);return z.audioWorklet.addModule(F,m).then(()=>z)}).then(z=>{if(c===null)throw new SyntaxError;try{new c(z,`__sac${E}`)}catch{throw new SyntaxError}}).finally(()=>URL.revokeObjectURL(F))});return b===void 0?l.set(g,new Map([[_,y]])):b.set(_,y),y.then(()=>{const v=u.get(g);v===void 0?u.set(g,new Set([_])):v.add(_)}).finally(()=>{const v=l.get(g);v!==void 0&&v.delete(_)}),y}},vn=(s,t)=>{const e=s.get(t);if(e===void 0)throw new Error("A value with the given key could not be found.");return e},xo=(s,t)=>{const e=Array.from(s).filter(t);if(e.length>1)throw Error("More than one element was found.");if(e.length===0)throw Error("No element was found.");const[n]=e;return s.delete(n),n},cu=(s,t,e,n)=>{const i=vn(s,t),r=xo(i,a=>a[0]===e&&a[1]===n);return i.size===0&&s.delete(t),r},sr=s=>vn(ou,s),gs=s=>{if(ms.has(s))throw new Error("The AudioNode is already stored.");ms.add(s),sr(s).forEach(t=>t(!0))},lu=s=>"port"in s,rr=s=>{if(!ms.has(s))throw new Error("The AudioNode is not stored.");ms.delete(s),sr(s).forEach(t=>t(!1))},ba=(s,t)=>{!lu(s)&&t.every(e=>e.size===0)&&rr(s)},rd=(s,t,e,n,i,r,a,o,c,l,u,h,f)=>{const p=new WeakMap;return(g,_,m,d,b)=>{const{activeInputs:S,passiveInputs:y}=r(_),{outputs:v}=r(g),T=o(g),A=E=>{const x=c(_),M=c(g);if(E){const N=cu(y,g,m,d);s(S,g,N,!1),!b&&!h(g)&&e(M,x,m,d),f(_)&&gs(_)}else{const N=n(S,g,m,d);t(y,d,N,!1),!b&&!h(g)&&i(M,x,m,d);const L=a(_);if(L===0)u(_)&&ba(_,S);else{const P=p.get(_);P!==void 0&&clearTimeout(P),p.set(_,setTimeout(()=>{u(_)&&ba(_,S)},L*1e3))}}};return l(v,[_,m,d],E=>E[0]===_&&E[1]===m&&E[2]===d,!0)?(T.add(A),u(g)?s(S,g,[m,d,A],!0):t(y,d,[g,m,A],!0),!0):!1}},od=s=>(t,e,[n,i,r],a)=>{const o=t.get(n);o===void 0?t.set(n,new Set([[i,e,r]])):s(o,[i,e,r],c=>c[0]===i&&c[1]===e,a)},ad=s=>(t,e)=>{const n=s(t,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});e.connect(n).connect(t.destination);const i=()=>{e.removeEventListener("ended",i),e.disconnect(n),n.disconnect()};e.addEventListener("ended",i)},cd=s=>(t,e)=>{s(t).add(e)},ld={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",fftSize:2048,maxDecibels:-30,minDecibels:-100,smoothingTimeConstant:.8},ud=(s,t,e,n,i,r)=>class extends s{constructor(o,c){const l=i(o),u={...ld,...c},h=n(l,u),f=r(l)?t():null;super(o,!1,h,f),this._nativeAnalyserNode=h}get fftSize(){return this._nativeAnalyserNode.fftSize}set fftSize(o){this._nativeAnalyserNode.fftSize=o}get frequencyBinCount(){return this._nativeAnalyserNode.frequencyBinCount}get maxDecibels(){return this._nativeAnalyserNode.maxDecibels}set maxDecibels(o){const c=this._nativeAnalyserNode.maxDecibels;if(this._nativeAnalyserNode.maxDecibels=o,!(o>this._nativeAnalyserNode.minDecibels))throw this._nativeAnalyserNode.maxDecibels=c,e()}get minDecibels(){return this._nativeAnalyserNode.minDecibels}set minDecibels(o){const c=this._nativeAnalyserNode.minDecibels;if(this._nativeAnalyserNode.minDecibels=o,!(this._nativeAnalyserNode.maxDecibels>o))throw this._nativeAnalyserNode.minDecibels=c,e()}get smoothingTimeConstant(){return this._nativeAnalyserNode.smoothingTimeConstant}set smoothingTimeConstant(o){this._nativeAnalyserNode.smoothingTimeConstant=o}getByteFrequencyData(o){this._nativeAnalyserNode.getByteFrequencyData(o)}getByteTimeDomainData(o){this._nativeAnalyserNode.getByteTimeDomainData(o)}getFloatFrequencyData(o){this._nativeAnalyserNode.getFloatFrequencyData(o)}getFloatTimeDomainData(o){this._nativeAnalyserNode.getFloatTimeDomainData(o)}},Ie=(s,t)=>s.context===t,hd=(s,t,e)=>()=>{const n=new WeakMap,i=async(r,a)=>{let o=t(r);if(!Ie(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,fftSize:o.fftSize,maxDecibels:o.maxDecibels,minDecibels:o.minDecibels,smoothingTimeConstant:o.smoothingTimeConstant};o=s(a,l)}return n.set(a,o),await e(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):i(r,a)}}},to=s=>{try{s.copyToChannel(new Float32Array(1),0,-1)}catch{return!1}return!0},Dn=()=>new DOMException("","IndexSizeError"),Wa=s=>{s.getChannelData=(t=>e=>{try{return t.call(s,e)}catch(n){throw n.code===12?Dn():n}})(s.getChannelData)},dd={numberOfChannels:1},fd=(s,t,e,n,i,r,a,o)=>{let c=null;return class uu{constructor(u){if(i===null)throw new Error("Missing the native OfflineAudioContext constructor.");const{length:h,numberOfChannels:f,sampleRate:p}={...dd,...u};c===null&&(c=new i(1,1,44100));const g=n!==null&&t(r,r)?new n({length:h,numberOfChannels:f,sampleRate:p}):c.createBuffer(f,h,p);if(g.numberOfChannels===0)throw e();return typeof g.copyFromChannel!="function"?(a(g),Wa(g)):t(to,()=>to(g))||o(g),s.add(g),g}static[Symbol.hasInstance](u){return u!==null&&typeof u=="object"&&Object.getPrototypeOf(u)===uu.prototype||s.has(u)}}},Ge=-34028234663852886e22,Fe=-Ge,Hn=s=>ms.has(s),pd={buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1},md=(s,t,e,n,i,r,a,o)=>class extends s{constructor(l,u){const h=r(l),f={...pd,...u},p=i(h,f),g=a(h),_=g?t():null;super(l,!1,p,_),this._audioBufferSourceNodeRenderer=_,this._isBufferNullified=!1,this._isBufferSet=f.buffer!==null,this._nativeAudioBufferSourceNode=p,this._onended=null,this._playbackRate=e(this,g,p.playbackRate,Fe,Ge)}get buffer(){return this._isBufferNullified?null:this._nativeAudioBufferSourceNode.buffer}set buffer(l){if(this._nativeAudioBufferSourceNode.buffer=l,l!==null){if(this._isBufferSet)throw n();this._isBufferSet=!0}}get loop(){return this._nativeAudioBufferSourceNode.loop}set loop(l){this._nativeAudioBufferSourceNode.loop=l}get loopEnd(){return this._nativeAudioBufferSourceNode.loopEnd}set loopEnd(l){this._nativeAudioBufferSourceNode.loopEnd=l}get loopStart(){return this._nativeAudioBufferSourceNode.loopStart}set loopStart(l){this._nativeAudioBufferSourceNode.loopStart=l}get onended(){return this._onended}set onended(l){const u=typeof l=="function"?o(this,l):null;this._nativeAudioBufferSourceNode.onended=u;const h=this._nativeAudioBufferSourceNode.onended;this._onended=h!==null&&h===u?l:h}get playbackRate(){return this._playbackRate}start(l=0,u=0,h){if(this._nativeAudioBufferSourceNode.start(l,u,h),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.start=h===void 0?[l,u]:[l,u,h]),this.context.state!=="closed"){gs(this);const f=()=>{this._nativeAudioBufferSourceNode.removeEventListener("ended",f),Hn(this)&&rr(this)};this._nativeAudioBufferSourceNode.addEventListener("ended",f)}}stop(l=0){this._nativeAudioBufferSourceNode.stop(l),this._audioBufferSourceNodeRenderer!==null&&(this._audioBufferSourceNodeRenderer.stop=l)}},gd=(s,t,e,n,i)=>()=>{const r=new WeakMap;let a=null,o=null;const c=async(l,u)=>{let h=e(l);const f=Ie(h,u);if(!f){const p={buffer:h.buffer,channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,loop:h.loop,loopEnd:h.loopEnd,loopStart:h.loopStart,playbackRate:h.playbackRate.value};h=t(u,p),a!==null&&h.start(...a),o!==null&&h.stop(o)}return r.set(u,h),f?await s(u,l.playbackRate,h.playbackRate):await n(u,l.playbackRate,h.playbackRate),await i(l,u,h),h};return{set start(l){a=l},set stop(l){o=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},_d=s=>"playbackRate"in s,vd=s=>"frequency"in s&&"gain"in s,xd=s=>"offset"in s,yd=s=>!("frequency"in s)&&"gain"in s,Sd=s=>"detune"in s&&"frequency"in s,Md=s=>"pan"in s,Ve=s=>vn(su,s),or=s=>vn(ru,s),wa=(s,t)=>{const{activeInputs:e}=Ve(s);e.forEach(i=>i.forEach(([r])=>{t.includes(s)||wa(r,[...t,s])}));const n=_d(s)?[s.playbackRate]:lu(s)?Array.from(s.parameters.values()):vd(s)?[s.Q,s.detune,s.frequency,s.gain]:xd(s)?[s.offset]:yd(s)?[s.gain]:Sd(s)?[s.detune,s.frequency]:Md(s)?[s.pan]:[];for(const i of n){const r=or(i);r!==void 0&&r.activeInputs.forEach(([a])=>wa(a,t))}Hn(s)&&rr(s)},hu=s=>{wa(s.destination,[])},bd=s=>s===void 0||typeof s=="number"||typeof s=="string"&&(s==="balanced"||s==="interactive"||s==="playback"),wd=(s,t,e,n,i,r,a,o,c)=>class extends s{constructor(u={}){if(c===null)throw new Error("Missing the native AudioContext constructor.");let h;try{h=new c(u)}catch(g){throw g.code===12&&g.message==="sampleRate is not in range"?e():g}if(h===null)throw n();if(!bd(u.latencyHint))throw new TypeError(`The provided value '${u.latencyHint}' is not a valid enum value of type AudioContextLatencyCategory.`);if(u.sampleRate!==void 0&&h.sampleRate!==u.sampleRate)throw e();super(h,2);const{latencyHint:f}=u,{sampleRate:p}=h;if(this._baseLatency=typeof h.baseLatency=="number"?h.baseLatency:f==="balanced"?512/p:f==="interactive"||f===void 0?256/p:f==="playback"?1024/p:Math.max(2,Math.min(128,Math.round(f*p/128)))*128/p,this._nativeAudioContext=h,c.name==="webkitAudioContext"?(this._nativeGainNode=h.createGain(),this._nativeOscillatorNode=h.createOscillator(),this._nativeGainNode.gain.value=1e-37,this._nativeOscillatorNode.connect(this._nativeGainNode).connect(h.destination),this._nativeOscillatorNode.start()):(this._nativeGainNode=null,this._nativeOscillatorNode=null),this._state=null,h.state==="running"){this._state="suspended";const g=()=>{this._state==="suspended"&&(this._state=null),h.removeEventListener("statechange",g)};h.addEventListener("statechange",g)}}get baseLatency(){return this._baseLatency}get state(){return this._state!==null?this._state:this._nativeAudioContext.state}close(){return this.state==="closed"?this._nativeAudioContext.close().then(()=>{throw t()}):(this._state==="suspended"&&(this._state=null),this._nativeAudioContext.close().then(()=>{this._nativeGainNode!==null&&this._nativeOscillatorNode!==null&&(this._nativeOscillatorNode.stop(),this._nativeGainNode.disconnect(),this._nativeOscillatorNode.disconnect()),hu(this)}))}createMediaElementSource(u){return new i(this,{mediaElement:u})}createMediaStreamDestination(){return new r(this)}createMediaStreamSource(u){return new a(this,{mediaStream:u})}createMediaStreamTrackSource(u){return new o(this,{mediaStreamTrack:u})}resume(){return this._state==="suspended"?new Promise((u,h)=>{const f=()=>{this._nativeAudioContext.removeEventListener("statechange",f),this._nativeAudioContext.state==="running"?u():this.resume().then(u,h)};this._nativeAudioContext.addEventListener("statechange",f)}):this._nativeAudioContext.resume().catch(u=>{throw u===void 0||u.code===15?t():u})}suspend(){return this._nativeAudioContext.suspend().catch(u=>{throw u===void 0?t():u})}},Td=(s,t,e,n,i,r,a,o)=>class extends s{constructor(l,u){const h=r(l),f=a(h),p=i(h,u,f),g=f?t(o):null;super(l,!1,p,g),this._isNodeOfNativeOfflineAudioContext=f,this._nativeAudioDestinationNode=p}get channelCount(){return this._nativeAudioDestinationNode.channelCount}set channelCount(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();if(l>this._nativeAudioDestinationNode.maxChannelCount)throw e();this._nativeAudioDestinationNode.channelCount=l}get channelCountMode(){return this._nativeAudioDestinationNode.channelCountMode}set channelCountMode(l){if(this._isNodeOfNativeOfflineAudioContext)throw n();this._nativeAudioDestinationNode.channelCountMode=l}get maxChannelCount(){return this._nativeAudioDestinationNode.maxChannelCount}},Ed=s=>{const t=new WeakMap,e=async(n,i)=>{const r=i.destination;return t.set(i,r),await s(n,i,r),r};return{render(n,i){const r=t.get(i);return r!==void 0?Promise.resolve(r):e(n,i)}}},Ad=(s,t,e,n,i,r,a,o)=>(c,l)=>{const u=l.listener,h=()=>{const v=new Float32Array(1),T=t(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:9}),A=a(l);let E=!1,x=[0,0,-1,0,1,0],M=[0,0,0];const N=()=>{if(E)return;E=!0;const k=n(l,256,9,0);k.onaudioprocess=({inputBuffer:F})=>{const z=[r(F,v,0),r(F,v,1),r(F,v,2),r(F,v,3),r(F,v,4),r(F,v,5)];z.some((X,H)=>X!==x[H])&&(u.setOrientation(...z),x=z);const G=[r(F,v,6),r(F,v,7),r(F,v,8)];G.some((X,H)=>X!==M[H])&&(u.setPosition(...G),M=G)},T.connect(k)},L=k=>F=>{F!==x[k]&&(x[k]=F,u.setOrientation(...x))},P=k=>F=>{F!==M[k]&&(M[k]=F,u.setPosition(...M))},I=(k,F,z)=>{const G=e(l,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:F});G.connect(T,0,k),G.start(),Object.defineProperty(G.offset,"defaultValue",{get(){return F}});const X=s({context:c},A,G.offset,Fe,Ge);return o(X,"value",H=>()=>H.call(X),H=>ot=>{try{H.call(X,ot)}catch(Q){if(Q.code!==9)throw Q}N(),A&&z(ot)}),X.cancelAndHoldAtTime=(H=>A?()=>{throw i()}:(...ot)=>{const Q=H.apply(X,ot);return N(),Q})(X.cancelAndHoldAtTime),X.cancelScheduledValues=(H=>A?()=>{throw i()}:(...ot)=>{const Q=H.apply(X,ot);return N(),Q})(X.cancelScheduledValues),X.exponentialRampToValueAtTime=(H=>A?()=>{throw i()}:(...ot)=>{const Q=H.apply(X,ot);return N(),Q})(X.exponentialRampToValueAtTime),X.linearRampToValueAtTime=(H=>A?()=>{throw i()}:(...ot)=>{const Q=H.apply(X,ot);return N(),Q})(X.linearRampToValueAtTime),X.setTargetAtTime=(H=>A?()=>{throw i()}:(...ot)=>{const Q=H.apply(X,ot);return N(),Q})(X.setTargetAtTime),X.setValueAtTime=(H=>A?()=>{throw i()}:(...ot)=>{const Q=H.apply(X,ot);return N(),Q})(X.setValueAtTime),X.setValueCurveAtTime=(H=>A?()=>{throw i()}:(...ot)=>{const Q=H.apply(X,ot);return N(),Q})(X.setValueCurveAtTime),X};return{forwardX:I(0,0,L(0)),forwardY:I(1,0,L(1)),forwardZ:I(2,-1,L(2)),positionX:I(6,0,P(0)),positionY:I(7,0,P(1)),positionZ:I(8,0,P(2)),upX:I(3,0,L(3)),upY:I(4,1,L(4)),upZ:I(5,0,L(5))}},{forwardX:f,forwardY:p,forwardZ:g,positionX:_,positionY:m,positionZ:d,upX:b,upY:S,upZ:y}=u.forwardX===void 0?h():u;return{get forwardX(){return f},get forwardY(){return p},get forwardZ(){return g},get positionX(){return _},get positionY(){return m},get positionZ(){return d},get upX(){return b},get upY(){return S},get upZ(){return y}}},eo=s=>"context"in s,ar=s=>eo(s[0]),Vi=(s,t,e,n)=>{for(const i of s)if(e(i)){if(n)return!1;throw Error("The set contains at least one similar element.")}return s.add(t),!0},Rc=(s,t,[e,n],i)=>{Vi(s,[t,e,n],r=>r[0]===t&&r[1]===e,i)},Dc=(s,[t,e,n],i)=>{const r=s.get(t);r===void 0?s.set(t,new Set([[e,n]])):Vi(r,[e,n],a=>a[0]===e,i)},ws=s=>"inputs"in s,no=(s,t,e,n)=>{if(ws(t)){const i=t.inputs[n];return s.connect(i,e,0),[i,e,0]}return s.connect(t,e,n),[t,e,n]},du=(s,t,e)=>{for(const n of s)if(n[0]===t&&n[1]===e)return s.delete(n),n;return null},Cd=(s,t,e)=>xo(s,n=>n[0]===t&&n[1]===e),fu=(s,t)=>{if(!sr(s).delete(t))throw new Error("Missing the expected event listener.")},pu=(s,t,e)=>{const n=vn(s,t),i=xo(n,r=>r[0]===e);return n.size===0&&s.delete(t),i},io=(s,t,e,n)=>{ws(t)?s.disconnect(t.inputs[n],e,0):s.disconnect(t,e,n)},ne=s=>vn(Ba,s),Bs=s=>vn(Ga,s),Di=s=>ya.has(s),$r=s=>!ms.has(s),Pc=(s,t)=>new Promise(e=>{if(t!==null)e(!0);else{const n=s.createScriptProcessor(256,1,1),i=s.createGain(),r=s.createBuffer(1,2,44100),a=r.getChannelData(0);a[0]=1,a[1]=1;const o=s.createBufferSource();o.buffer=r,o.loop=!0,o.connect(n).connect(s.destination),o.connect(i),o.disconnect(i),n.onaudioprocess=c=>{const l=c.inputBuffer.getChannelData(0);Array.prototype.some.call(l,u=>u===1)?e(!0):e(!1),o.stop(),n.onaudioprocess=null,o.disconnect(n),n.disconnect(s.destination)},o.start()}}),Fo=(s,t)=>{const e=new Map;for(const n of s)for(const i of n){const r=e.get(i);e.set(i,r===void 0?1:r+1)}e.forEach((n,i)=>t(i,n))},so=s=>"context"in s,Rd=s=>{const t=new Map;s.connect=(e=>(n,i=0,r=0)=>{const a=so(n)?e(n,i,r):e(n,i),o=t.get(n);return o===void 0?t.set(n,[{input:r,output:i}]):o.every(c=>c.input!==r||c.output!==i)&&o.push({input:r,output:i}),a})(s.connect.bind(s)),s.disconnect=(e=>(n,i,r)=>{if(e.apply(s),n===void 0)t.clear();else if(typeof n=="number")for(const[a,o]of t){const c=o.filter(l=>l.output!==n);c.length===0?t.delete(a):t.set(a,c)}else if(t.has(n))if(i===void 0)t.delete(n);else{const a=t.get(n);if(a!==void 0){const o=a.filter(c=>c.output!==i&&(c.input!==r||r===void 0));o.length===0?t.delete(n):t.set(n,o)}}for(const[a,o]of t)o.forEach(c=>{so(a)?s.connect(a,c.output,c.input):s.connect(a,c.output)})})(s.disconnect)},Dd=(s,t,e,n)=>{const{activeInputs:i,passiveInputs:r}=or(t),{outputs:a}=Ve(s),o=sr(s),c=l=>{const u=ne(s),h=Bs(t);if(l){const f=pu(r,s,e);Rc(i,s,f,!1),!n&&!Di(s)&&u.connect(h,e)}else{const f=Cd(i,s,e);Dc(r,f,!1),!n&&!Di(s)&&u.disconnect(h,e)}};return Vi(a,[t,e],l=>l[0]===t&&l[1]===e,!0)?(o.add(c),Hn(s)?Rc(i,s,[e,c],!0):Dc(r,[s,e,c],!0),!0):!1},Pd=(s,t,e,n)=>{const{activeInputs:i,passiveInputs:r}=Ve(t),a=du(i[n],s,e);return a===null?[cu(r,s,e,n)[2],!1]:[a[2],!0]},Ld=(s,t,e)=>{const{activeInputs:n,passiveInputs:i}=or(t),r=du(n,s,e);return r===null?[pu(i,s,e)[1],!1]:[r[2],!0]},Ha=(s,t,e,n,i)=>{const[r,a]=Pd(s,e,n,i);if(r!==null&&(fu(s,r),a&&!t&&!Di(s)&&io(ne(s),ne(e),n,i)),Hn(e)){const{activeInputs:o}=Ve(e);ba(e,o)}},qa=(s,t,e,n)=>{const[i,r]=Ld(s,e,n);i!==null&&(fu(s,i),r&&!t&&!Di(s)&&ne(s).disconnect(Bs(e),n))},Id=(s,t)=>{const e=Ve(s),n=[];for(const i of e.outputs)ar(i)?Ha(s,t,...i):qa(s,t,...i),n.push(i[0]);return e.outputs.clear(),n},Nd=(s,t,e)=>{const n=Ve(s),i=[];for(const r of n.outputs)r[1]===e&&(ar(r)?Ha(s,t,...r):qa(s,t,...r),i.push(r[0]),n.outputs.delete(r));return i},Od=(s,t,e,n,i)=>{const r=Ve(s);return Array.from(r.outputs).filter(a=>a[0]===e&&(n===void 0||a[1]===n)&&(i===void 0||a[2]===i)).map(a=>(ar(a)?Ha(s,t,...a):qa(s,t,...a),r.outputs.delete(a),a[0]))},kd=(s,t,e,n,i,r,a,o,c,l,u,h,f,p,g,_)=>class extends l{constructor(d,b,S,y){super(S),this._context=d,this._nativeAudioNode=S;const v=u(d);h(v)&&e(Pc,()=>Pc(v,_))!==!0&&Rd(S),Ba.set(this,S),ou.set(this,new Set),d.state!=="closed"&&b&&gs(this),s(this,y,S)}get channelCount(){return this._nativeAudioNode.channelCount}set channelCount(d){this._nativeAudioNode.channelCount=d}get channelCountMode(){return this._nativeAudioNode.channelCountMode}set channelCountMode(d){this._nativeAudioNode.channelCountMode=d}get channelInterpretation(){return this._nativeAudioNode.channelInterpretation}set channelInterpretation(d){this._nativeAudioNode.channelInterpretation=d}get context(){return this._context}get numberOfInputs(){return this._nativeAudioNode.numberOfInputs}get numberOfOutputs(){return this._nativeAudioNode.numberOfOutputs}connect(d,b=0,S=0){if(b<0||b>=this._nativeAudioNode.numberOfOutputs)throw i();const y=u(this._context),v=g(y);if(f(d)||p(d))throw r();if(eo(d)){const E=ne(d);try{const M=no(this._nativeAudioNode,E,b,S),N=$r(this);(v||N)&&this._nativeAudioNode.disconnect(...M),this.context.state!=="closed"&&!N&&$r(d)&&gs(d)}catch(M){throw M.code===12?r():M}if(t(this,d,b,S,v)){const M=c([this],d);Fo(M,n(v))}return d}const T=Bs(d);if(T.name==="playbackRate"&&T.maxValue===1024)throw a();try{this._nativeAudioNode.connect(T,b),(v||$r(this))&&this._nativeAudioNode.disconnect(T,b)}catch(E){throw E.code===12?r():E}if(Dd(this,d,b,v)){const E=c([this],d);Fo(E,n(v))}}disconnect(d,b,S){let y;const v=u(this._context),T=g(v);if(d===void 0)y=Id(this,T);else if(typeof d=="number"){if(d<0||d>=this.numberOfOutputs)throw i();y=Nd(this,T,d)}else{if(b!==void 0&&(b<0||b>=this.numberOfOutputs)||eo(d)&&S!==void 0&&(S<0||S>=d.numberOfInputs))throw i();if(y=Od(this,T,d,b,S),y.length===0)throw r()}for(const A of y){const E=c([this],A);Fo(E,o)}}},Ud=(s,t,e,n,i,r,a,o,c,l,u,h,f)=>(p,g,_,m=null,d=null)=>{const b=_.value,S=new jh(b),y=g?n(S):null,v={get defaultValue(){return b},get maxValue(){return m===null?_.maxValue:m},get minValue(){return d===null?_.minValue:d},get value(){return _.value},set value(T){_.value=T,v.setValueAtTime(T,p.context.currentTime)},cancelAndHoldAtTime(T){if(typeof _.cancelAndHoldAtTime=="function")y===null&&S.flush(p.context.currentTime),S.add(i(T)),_.cancelAndHoldAtTime(T);else{const A=Array.from(S).pop();y===null&&S.flush(p.context.currentTime),S.add(i(T));const E=Array.from(S).pop();_.cancelScheduledValues(T),A!==E&&E!==void 0&&(E.type==="exponentialRampToValue"?_.exponentialRampToValueAtTime(E.value,E.endTime):E.type==="linearRampToValue"?_.linearRampToValueAtTime(E.value,E.endTime):E.type==="setValue"?_.setValueAtTime(E.value,E.startTime):E.type==="setValueCurve"&&_.setValueCurveAtTime(E.values,E.startTime,E.duration))}return v},cancelScheduledValues(T){return y===null&&S.flush(p.context.currentTime),S.add(r(T)),_.cancelScheduledValues(T),v},exponentialRampToValueAtTime(T,A){if(T===0)throw new RangeError;if(!Number.isFinite(A)||A<0)throw new RangeError;const E=p.context.currentTime;return y===null&&S.flush(E),Array.from(S).length===0&&(S.add(l(b,E)),_.setValueAtTime(b,E)),S.add(a(T,A)),_.exponentialRampToValueAtTime(T,A),v},linearRampToValueAtTime(T,A){const E=p.context.currentTime;return y===null&&S.flush(E),Array.from(S).length===0&&(S.add(l(b,E)),_.setValueAtTime(b,E)),S.add(o(T,A)),_.linearRampToValueAtTime(T,A),v},setTargetAtTime(T,A,E){return y===null&&S.flush(p.context.currentTime),S.add(c(T,A,E)),_.setTargetAtTime(T,A,E),v},setValueAtTime(T,A){return y===null&&S.flush(p.context.currentTime),S.add(l(T,A)),_.setValueAtTime(T,A),v},setValueCurveAtTime(T,A,E){const x=T instanceof Float32Array?T:new Float32Array(T);if(h!==null&&h.name==="webkitAudioContext"){const M=A+E,N=p.context.sampleRate,L=Math.ceil(A*N),P=Math.floor(M*N),I=P-L,k=new Float32Array(I);for(let z=0;z<I;z+=1){const G=(x.length-1)/E*((L+z)/N-A),X=Math.floor(G),H=Math.ceil(G);k[z]=X===H?x[X]:(1-(G-X))*x[X]+(1-(H-G))*x[H]}y===null&&S.flush(p.context.currentTime),S.add(u(k,A,E)),_.setValueCurveAtTime(k,A,E);const F=P/N;F<M&&f(v,k[k.length-1],F),f(v,x[x.length-1],M)}else y===null&&S.flush(p.context.currentTime),S.add(u(x,A,E)),_.setValueCurveAtTime(x,A,E);return v}};return e.set(v,_),t.set(v,p),s(v,y),v},Fd=s=>({replay(t){for(const e of s)if(e.type==="exponentialRampToValue"){const{endTime:n,value:i}=e;t.exponentialRampToValueAtTime(i,n)}else if(e.type==="linearRampToValue"){const{endTime:n,value:i}=e;t.linearRampToValueAtTime(i,n)}else if(e.type==="setTarget"){const{startTime:n,target:i,timeConstant:r}=e;t.setTargetAtTime(i,n,r)}else if(e.type==="setValue"){const{startTime:n,value:i}=e;t.setValueAtTime(i,n)}else if(e.type==="setValueCurve"){const{duration:n,startTime:i,values:r}=e;t.setValueCurveAtTime(r,i,n)}else throw new Error("Can't apply an unknown automation.")}});class mu{constructor(t){this._map=new Map(t)}get size(){return this._map.size}entries(){return this._map.entries()}forEach(t,e=null){return this._map.forEach((n,i)=>t.call(e,n,i,this))}get(t){return this._map.get(t)}has(t){return this._map.has(t)}keys(){return this._map.keys()}values(){return this._map.values()}}const Vd={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:1,numberOfOutputs:1,parameterData:{},processorOptions:{}},zd=(s,t,e,n,i,r,a,o,c,l,u,h,f,p)=>class extends t{constructor(_,m,d){var b;const S=o(_),y=c(S),v=u({...Vd,...d});f(v);const T=Sa.get(S),A=T==null?void 0:T.get(m),E=y||S.state!=="closed"?S:(b=a(S))!==null&&b!==void 0?b:S,x=i(E,y?null:_.baseLatency,l,m,A,v),M=y?n(m,v,A):null;super(_,!0,x,M);const N=[];x.parameters.forEach((P,I)=>{const k=e(this,y,P);N.push([I,k])}),this._nativeAudioWorkletNode=x,this._onprocessorerror=null,this._parameters=new mu(N),y&&s(S,this);const{activeInputs:L}=r(this);h(x,L)}get onprocessorerror(){return this._onprocessorerror}set onprocessorerror(_){const m=typeof _=="function"?p(this,_):null;this._nativeAudioWorkletNode.onprocessorerror=m;const d=this._nativeAudioWorkletNode.onprocessorerror;this._onprocessorerror=d!==null&&d===m?_:d}get parameters(){return this._parameters===null?this._nativeAudioWorkletNode.parameters:this._parameters}get port(){return this._nativeAudioWorkletNode.port}};function ro(s,t,e,n,i){if(typeof s.copyFromChannel=="function")t[e].byteLength===0&&(t[e]=new Float32Array(128)),s.copyFromChannel(t[e],n,i);else{const r=s.getChannelData(n);if(t[e].byteLength===0)t[e]=r.slice(i,i+128);else{const a=new Float32Array(r.buffer,i*Float32Array.BYTES_PER_ELEMENT,128);t[e].set(a)}}}const gu=(s,t,e,n,i)=>{typeof s.copyToChannel=="function"?t[e].byteLength!==0&&s.copyToChannel(t[e],n,i):t[e].byteLength!==0&&s.getChannelData(n).set(t[e],i)},oo=(s,t)=>{const e=[];for(let n=0;n<s;n+=1){const i=[],r=typeof t=="number"?t:t[n];for(let a=0;a<r;a+=1)i.push(new Float32Array(128));e.push(i)}return e},Bd=(s,t)=>{const e=vn(Ma,s),n=ne(t);return vn(e,n)},Gd=async(s,t,e,n,i,r,a)=>{const o=t===null?Math.ceil(s.context.length/128)*128:t.length,c=n.channelCount*n.numberOfInputs,l=i.reduce((m,d)=>m+d,0),u=l===0?null:e.createBuffer(l,o,e.sampleRate);if(r===void 0)throw new Error("Missing the processor constructor.");const h=Ve(s),f=await Bd(e,s),p=oo(n.numberOfInputs,n.channelCount),g=oo(n.numberOfOutputs,i),_=Array.from(s.parameters.keys()).reduce((m,d)=>({...m,[d]:new Float32Array(128)}),{});for(let m=0;m<o;m+=128){if(n.numberOfInputs>0&&t!==null)for(let d=0;d<n.numberOfInputs;d+=1)for(let b=0;b<n.channelCount;b+=1)ro(t,p[d],b,b,m);r.parameterDescriptors!==void 0&&t!==null&&r.parameterDescriptors.forEach(({name:d},b)=>{ro(t,_,d,c+b,m)});for(let d=0;d<n.numberOfInputs;d+=1)for(let b=0;b<i[d];b+=1)g[d][b].byteLength===0&&(g[d][b]=new Float32Array(128));try{const d=p.map((S,y)=>h.activeInputs[y].size===0?[]:S),b=a(m/e.sampleRate,e.sampleRate,()=>f.process(d,g,_));if(u!==null)for(let S=0,y=0;S<n.numberOfOutputs;S+=1){for(let v=0;v<i[S];v+=1)gu(u,g[S],v,y+v,m);y+=i[S]}if(!b)break}catch(d){s.dispatchEvent(new ErrorEvent("processorerror",{colno:d.colno,filename:d.filename,lineno:d.lineno,message:d.message}));break}}return u},Wd=(s,t,e,n,i,r,a,o,c,l,u,h,f,p,g,_)=>(m,d,b)=>{const S=new WeakMap;let y=null;const v=async(T,A)=>{let E=u(T),x=null;const M=Ie(E,A),N=Array.isArray(d.outputChannelCount)?d.outputChannelCount:Array.from(d.outputChannelCount);if(h===null){const L=N.reduce((F,z)=>F+z,0),P=i(A,{channelCount:Math.max(1,L),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,L)}),I=[];for(let F=0;F<T.numberOfOutputs;F+=1)I.push(n(A,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:N[F]}));const k=a(A,{channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,gain:1});k.connect=t.bind(null,I),k.disconnect=c.bind(null,I),x=[P,I,k]}else M||(E=new h(A,m));if(S.set(A,x===null?E:x[2]),x!==null){if(y===null){if(b===void 0)throw new Error("Missing the processor constructor.");if(f===null)throw new Error("Missing the native OfflineAudioContext constructor.");const z=T.channelCount*T.numberOfInputs,G=b.parameterDescriptors===void 0?0:b.parameterDescriptors.length,X=z+G;y=Gd(T,X===0?null:await(async()=>{const ot=new f(X,Math.ceil(T.context.length/128)*128,A.sampleRate),Q=[],q=[];for(let st=0;st<d.numberOfInputs;st+=1)Q.push(a(ot,{channelCount:d.channelCount,channelCountMode:d.channelCountMode,channelInterpretation:d.channelInterpretation,gain:1})),q.push(i(ot,{channelCount:d.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:d.channelCount}));const Z=await Promise.all(Array.from(T.parameters.values()).map(async st=>{const B=r(ot,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:st.value});return await p(ot,st,B.offset),B})),tt=n(ot,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,z+G)});for(let st=0;st<d.numberOfInputs;st+=1){Q[st].connect(q[st]);for(let B=0;B<d.channelCount;B+=1)q[st].connect(tt,B,st*d.channelCount+B)}for(const[st,B]of Z.entries())B.connect(tt,0,z+st),B.start(0);return tt.connect(ot.destination),await Promise.all(Q.map(st=>g(T,ot,st))),_(ot)})(),A,d,N,b,l)}const L=await y,P=e(A,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),[I,k,F]=x;L!==null&&(P.buffer=L,P.start(0)),P.connect(I);for(let z=0,G=0;z<T.numberOfOutputs;z+=1){const X=k[z];for(let H=0;H<N[z];H+=1)I.connect(X,G+H,H);G+=N[z]}return F}if(M)for(const[L,P]of T.parameters.entries())await s(A,P,E.parameters.get(L));else for(const[L,P]of T.parameters.entries())await p(A,P,E.parameters.get(L));return await g(T,A,E),E};return{render(T,A){o(A,T);const E=S.get(A);return E!==void 0?Promise.resolve(E):v(T,A)}}},Hd=(s,t,e,n,i,r,a,o,c,l,u,h,f,p,g,_,m,d,b,S)=>class extends g{constructor(v,T){super(v,T),this._nativeContext=v,this._audioWorklet=s===void 0?void 0:{addModule:(A,E)=>s(this,A,E)}}get audioWorklet(){return this._audioWorklet}createAnalyser(){return new t(this)}createBiquadFilter(){return new i(this)}createBuffer(v,T,A){return new e({length:T,numberOfChannels:v,sampleRate:A})}createBufferSource(){return new n(this)}createChannelMerger(v=6){return new r(this,{numberOfInputs:v})}createChannelSplitter(v=6){return new a(this,{numberOfOutputs:v})}createConstantSource(){return new o(this)}createConvolver(){return new c(this)}createDelay(v=1){return new u(this,{maxDelayTime:v})}createDynamicsCompressor(){return new h(this)}createGain(){return new f(this)}createIIRFilter(v,T){return new p(this,{feedback:T,feedforward:v})}createOscillator(){return new _(this)}createPanner(){return new m(this)}createPeriodicWave(v,T,A={disableNormalization:!1}){return new d(this,{...A,imag:T,real:v})}createStereoPanner(){return new b(this)}createWaveShaper(){return new S(this)}decodeAudioData(v,T,A){return l(this._nativeContext,v).then(E=>(typeof T=="function"&&T(E),E),E=>{throw typeof A=="function"&&A(E),E})}},qd={Q:1,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:350,gain:0,type:"lowpass"},Xd=(s,t,e,n,i,r,a,o)=>class extends s{constructor(l,u){const h=r(l),f={...qd,...u},p=i(h,f),g=a(h),_=g?e():null;super(l,!1,p,_),this._Q=t(this,g,p.Q,Fe,Ge),this._detune=t(this,g,p.detune,1200*Math.log2(Fe),-1200*Math.log2(Fe)),this._frequency=t(this,g,p.frequency,l.sampleRate/2,0),this._gain=t(this,g,p.gain,40*Math.log10(Fe),Ge),this._nativeBiquadFilterNode=p,o(this,1)}get detune(){return this._detune}get frequency(){return this._frequency}get gain(){return this._gain}get Q(){return this._Q}get type(){return this._nativeBiquadFilterNode.type}set type(l){this._nativeBiquadFilterNode.type=l}getFrequencyResponse(l,u,h){try{this._nativeBiquadFilterNode.getFrequencyResponse(l,u,h)}catch(f){throw f.code===11?n():f}if(l.length!==u.length||u.length!==h.length)throw n()}},jd=(s,t,e,n,i)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=e(o);const u=Ie(l,c);if(!u){const h={Q:l.Q.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,detune:l.detune.value,frequency:l.frequency.value,gain:l.gain.value,type:l.type};l=t(c,h)}return r.set(c,l),u?(await s(c,o.Q,l.Q),await s(c,o.detune,l.detune),await s(c,o.frequency,l.frequency),await s(c,o.gain,l.gain)):(await n(c,o.Q,l.Q),await n(c,o.detune,l.detune),await n(c,o.frequency,l.frequency),await n(c,o.gain,l.gain)),await i(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},Yd=(s,t)=>(e,n)=>{const i=t.get(e);if(i!==void 0)return i;const r=s.get(e);if(r!==void 0)return r;try{const a=n();return a instanceof Promise?(s.set(e,a),a.catch(()=>!1).then(o=>(s.delete(e),t.set(e,o),o))):(t.set(e,a),a)}catch{return t.set(e,!1),!1}},$d={channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6},Zd=(s,t,e,n,i)=>class extends s{constructor(a,o){const c=n(a),l={...$d,...o},u=e(c,l),h=i(c)?t():null;super(a,!1,u,h)}},Kd=(s,t,e)=>()=>{const n=new WeakMap,i=async(r,a)=>{let o=t(r);if(!Ie(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,numberOfInputs:o.numberOfInputs};o=s(a,l)}return n.set(a,o),await e(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):i(r,a)}}},Jd={channelCount:6,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:6},Qd=(s,t,e,n,i,r)=>class extends s{constructor(o,c){const l=n(o),u=r({...Jd,...c}),h=e(l,u),f=i(l)?t():null;super(o,!1,h,f)}},tf=(s,t,e)=>()=>{const n=new WeakMap,i=async(r,a)=>{let o=t(r);if(!Ie(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,numberOfOutputs:o.numberOfOutputs};o=s(a,l)}return n.set(a,o),await e(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):i(r,a)}}},ef=s=>(t,e,n)=>s(e,t,n),nf=s=>(t,e,n=0,i=0)=>{const r=t[n];if(r===void 0)throw s();return so(e)?r.connect(e,0,i):r.connect(e,0)},sf=s=>(t,e)=>{const n=s(t,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),i=t.createBuffer(1,2,44100);return n.buffer=i,n.loop=!0,n.connect(e),n.start(),()=>{n.stop(),n.disconnect(e)}},rf={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",offset:1},of=(s,t,e,n,i,r,a)=>class extends s{constructor(c,l){const u=i(c),h={...rf,...l},f=n(u,h),p=r(u),g=p?e():null;super(c,!1,f,g),this._constantSourceNodeRenderer=g,this._nativeConstantSourceNode=f,this._offset=t(this,p,f.offset,Fe,Ge),this._onended=null}get offset(){return this._offset}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?a(this,c):null;this._nativeConstantSourceNode.onended=l;const u=this._nativeConstantSourceNode.onended;this._onended=u!==null&&u===l?c:u}start(c=0){if(this._nativeConstantSourceNode.start(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.start=c),this.context.state!=="closed"){gs(this);const l=()=>{this._nativeConstantSourceNode.removeEventListener("ended",l),Hn(this)&&rr(this)};this._nativeConstantSourceNode.addEventListener("ended",l)}}stop(c=0){this._nativeConstantSourceNode.stop(c),this._constantSourceNodeRenderer!==null&&(this._constantSourceNodeRenderer.stop=c)}},af=(s,t,e,n,i)=>()=>{const r=new WeakMap;let a=null,o=null;const c=async(l,u)=>{let h=e(l);const f=Ie(h,u);if(!f){const p={channelCount:h.channelCount,channelCountMode:h.channelCountMode,channelInterpretation:h.channelInterpretation,offset:h.offset.value};h=t(u,p),a!==null&&h.start(a),o!==null&&h.stop(o)}return r.set(u,h),f?await s(u,l.offset,h.offset):await n(u,l.offset,h.offset),await i(l,u,h),h};return{set start(l){a=l},set stop(l){o=l},render(l,u){const h=r.get(u);return h!==void 0?Promise.resolve(h):c(l,u)}}},cf=s=>t=>(s[0]=t,s[0]),lf={buffer:null,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",disableNormalization:!1},uf=(s,t,e,n,i,r)=>class extends s{constructor(o,c){const l=n(o),u={...lf,...c},h=e(l,u),p=i(l)?t():null;super(o,!1,h,p),this._isBufferNullified=!1,this._nativeConvolverNode=h,u.buffer!==null&&r(this,u.buffer.duration)}get buffer(){return this._isBufferNullified?null:this._nativeConvolverNode.buffer}set buffer(o){if(this._nativeConvolverNode.buffer=o,o===null&&this._nativeConvolverNode.buffer!==null){const c=this._nativeConvolverNode.context;this._nativeConvolverNode.buffer=c.createBuffer(1,1,c.sampleRate),this._isBufferNullified=!0,r(this,0)}else this._isBufferNullified=!1,r(this,this._nativeConvolverNode.buffer===null?0:this._nativeConvolverNode.buffer.duration)}get normalize(){return this._nativeConvolverNode.normalize}set normalize(o){this._nativeConvolverNode.normalize=o}},hf=(s,t,e)=>()=>{const n=new WeakMap,i=async(r,a)=>{let o=t(r);if(!Ie(o,a)){const l={buffer:o.buffer,channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,disableNormalization:!o.normalize};o=s(a,l)}return n.set(a,o),ws(o)?await e(r,a,o.inputs[0]):await e(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):i(r,a)}}},df=(s,t)=>(e,n,i)=>{if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");try{return new t(e,n,i)}catch(r){throw r.name==="SyntaxError"?s():r}},ff=()=>new DOMException("","DataCloneError"),Lc=s=>{const{port1:t,port2:e}=new MessageChannel;return new Promise(n=>{const i=()=>{e.onmessage=null,t.close(),e.close(),n()};e.onmessage=()=>i();try{t.postMessage(s,[s])}catch{}finally{i()}})},pf=(s,t,e,n,i,r,a,o,c,l,u)=>(h,f)=>{const p=a(h)?h:r(h);if(i.has(f)){const g=e();return Promise.reject(g)}try{i.add(f)}catch{}return t(c,()=>c(p))?p.decodeAudioData(f).then(g=>(Lc(f).catch(()=>{}),t(o,()=>o(g))||u(g),s.add(g),g)):new Promise((g,_)=>{const m=async()=>{try{await Lc(f)}catch{}},d=b=>{_(b),m()};try{p.decodeAudioData(f,b=>{typeof b.copyFromChannel!="function"&&(l(b),Wa(b)),s.add(b),m().then(()=>g(b))},b=>{d(b===null?n():b)})}catch(b){d(b)}})},mf=(s,t,e,n,i,r,a,o)=>(c,l)=>{const u=t.get(c);if(u===void 0)throw new Error("Missing the expected cycle count.");const h=r(c.context),f=o(h);if(u===l){if(t.delete(c),!f&&a(c)){const p=n(c),{outputs:g}=e(c);for(const _ of g)if(ar(_)){const m=n(_[0]);s(p,m,_[1],_[2])}else{const m=i(_[0]);p.connect(m,_[1])}}}else t.set(c,u-l)},gf={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",delayTime:0,maxDelayTime:1},_f=(s,t,e,n,i,r,a)=>class extends s{constructor(c,l){const u=i(c),h={...gf,...l},f=n(u,h),p=r(u),g=p?e(h.maxDelayTime):null;super(c,!1,f,g),this._delayTime=t(this,p,f.delayTime),a(this,h.maxDelayTime)}get delayTime(){return this._delayTime}},vf=(s,t,e,n,i)=>r=>{const a=new WeakMap,o=async(c,l)=>{let u=e(c);const h=Ie(u,l);if(!h){const f={channelCount:u.channelCount,channelCountMode:u.channelCountMode,channelInterpretation:u.channelInterpretation,delayTime:u.delayTime.value,maxDelayTime:r};u=t(l,f)}return a.set(l,u),h?await s(l,c.delayTime,u.delayTime):await n(l,c.delayTime,u.delayTime),await i(c,l,u),u};return{render(c,l){const u=a.get(l);return u!==void 0?Promise.resolve(u):o(c,l)}}},xf=s=>(t,e,n,i)=>s(t[i],r=>r[0]===e&&r[1]===n),yf=s=>(t,e)=>{s(t).delete(e)},Sf=s=>"delayTime"in s,Mf=(s,t,e)=>function n(i,r){const a=eo(r)?r:e(s,r);if(Sf(a))return[];if(i[0]===a)return[i];if(i.includes(a))return[];const{outputs:o}=t(a);return Array.from(o).map(c=>n([...i,a],c[0])).reduce((c,l)=>c.concat(l),[])},Sr=(s,t,e)=>{const n=t[e];if(n===void 0)throw s();return n},bf=s=>(t,e=void 0,n=void 0,i=0)=>e===void 0?t.forEach(r=>r.disconnect()):typeof e=="number"?Sr(s,t,e).disconnect():so(e)?n===void 0?t.forEach(r=>r.disconnect(e)):i===void 0?Sr(s,t,n).disconnect(e,0):Sr(s,t,n).disconnect(e,0,i):n===void 0?t.forEach(r=>r.disconnect(e)):Sr(s,t,n).disconnect(e,0),wf={attack:.003,channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",knee:30,ratio:12,release:.25,threshold:-24},Tf=(s,t,e,n,i,r,a,o)=>class extends s{constructor(l,u){const h=r(l),f={...wf,...u},p=n(h,f),g=a(h),_=g?e():null;super(l,!1,p,_),this._attack=t(this,g,p.attack),this._knee=t(this,g,p.knee),this._nativeDynamicsCompressorNode=p,this._ratio=t(this,g,p.ratio),this._release=t(this,g,p.release),this._threshold=t(this,g,p.threshold),o(this,.006)}get attack(){return this._attack}get channelCount(){return this._nativeDynamicsCompressorNode.channelCount}set channelCount(l){const u=this._nativeDynamicsCompressorNode.channelCount;if(this._nativeDynamicsCompressorNode.channelCount=l,l>2)throw this._nativeDynamicsCompressorNode.channelCount=u,i()}get channelCountMode(){return this._nativeDynamicsCompressorNode.channelCountMode}set channelCountMode(l){const u=this._nativeDynamicsCompressorNode.channelCountMode;if(this._nativeDynamicsCompressorNode.channelCountMode=l,l==="max")throw this._nativeDynamicsCompressorNode.channelCountMode=u,i()}get knee(){return this._knee}get ratio(){return this._ratio}get reduction(){return typeof this._nativeDynamicsCompressorNode.reduction.value=="number"?this._nativeDynamicsCompressorNode.reduction.value:this._nativeDynamicsCompressorNode.reduction}get release(){return this._release}get threshold(){return this._threshold}},Ef=(s,t,e,n,i)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=e(o);const u=Ie(l,c);if(!u){const h={attack:l.attack.value,channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,knee:l.knee.value,ratio:l.ratio.value,release:l.release.value,threshold:l.threshold.value};l=t(c,h)}return r.set(c,l),u?(await s(c,o.attack,l.attack),await s(c,o.knee,l.knee),await s(c,o.ratio,l.ratio),await s(c,o.release,l.release),await s(c,o.threshold,l.threshold)):(await n(c,o.attack,l.attack),await n(c,o.knee,l.knee),await n(c,o.ratio,l.ratio),await n(c,o.release,l.release),await n(c,o.threshold,l.threshold)),await i(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},Af=()=>new DOMException("","EncodingError"),Cf=s=>t=>new Promise((e,n)=>{if(s===null){n(new SyntaxError);return}const i=s.document.head;if(i===null)n(new SyntaxError);else{const r=s.document.createElement("script"),a=new Blob([t],{type:"application/javascript"}),o=URL.createObjectURL(a),c=s.onerror,l=()=>{s.onerror=c,URL.revokeObjectURL(o)};s.onerror=(u,h,f,p,g)=>{if(h===o||h===s.location.href&&f===1&&p===1)return l(),n(g),!1;if(c!==null)return c(u,h,f,p,g)},r.onerror=()=>{l(),n(new SyntaxError)},r.onload=()=>{l(),e()},r.src=o,r.type="module",i.appendChild(r)}}),Rf=s=>class{constructor(e){this._nativeEventTarget=e,this._listeners=new WeakMap}addEventListener(e,n,i){if(n!==null){let r=this._listeners.get(n);r===void 0&&(r=s(this,n),typeof n=="function"&&this._listeners.set(n,r)),this._nativeEventTarget.addEventListener(e,r,i)}}dispatchEvent(e){return this._nativeEventTarget.dispatchEvent(e)}removeEventListener(e,n,i){const r=n===null?void 0:this._listeners.get(n);this._nativeEventTarget.removeEventListener(e,r===void 0?null:r,i)}},Df=s=>(t,e,n)=>{Object.defineProperties(s,{currentFrame:{configurable:!0,get(){return Math.round(t*e)}},currentTime:{configurable:!0,get(){return t}}});try{return n()}finally{s!==null&&(delete s.currentFrame,delete s.currentTime)}},Pf=s=>async t=>{try{const e=await fetch(t);if(e.ok)return[await e.text(),e.url]}catch{}throw s()},Lf={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",gain:1},If=(s,t,e,n,i,r)=>class extends s{constructor(o,c){const l=i(o),u={...Lf,...c},h=n(l,u),f=r(l),p=f?e():null;super(o,!1,h,p),this._gain=t(this,f,h.gain,Fe,Ge)}get gain(){return this._gain}},Nf=(s,t,e,n,i)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=e(o);const u=Ie(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,gain:l.gain.value};l=t(c,h)}return r.set(c,l),u?await s(c,o.gain,l.gain):await n(c,o.gain,l.gain),await i(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},Of=(s,t)=>e=>t(s,e),kf=s=>t=>{const e=s(t);if(e.renderer===null)throw new Error("Missing the renderer of the given AudioNode in the audio graph.");return e.renderer},Uf=s=>t=>{var e;return(e=s.get(t))!==null&&e!==void 0?e:0},Ff=s=>t=>{const e=s(t);if(e.renderer===null)throw new Error("Missing the renderer of the given AudioParam in the audio graph.");return e.renderer},Vf=s=>t=>s.get(t),we=()=>new DOMException("","InvalidStateError"),zf=s=>t=>{const e=s.get(t);if(e===void 0)throw we();return e},Bf=(s,t)=>e=>{let n=s.get(e);if(n!==void 0)return n;if(t===null)throw new Error("Missing the native OfflineAudioContext constructor.");return n=new t(1,1,44100),s.set(e,n),n},Gf=s=>t=>{const e=s.get(t);if(e===void 0)throw new Error("The context has no set of AudioWorkletNodes.");return e},yo=()=>new DOMException("","InvalidAccessError"),Wf=s=>{s.getFrequencyResponse=(t=>(e,n,i)=>{if(e.length!==n.length||n.length!==i.length)throw yo();return t.call(s,e,n,i)})(s.getFrequencyResponse)},Hf={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers"},qf=(s,t,e,n,i,r)=>class extends s{constructor(o,c){const l=n(o),u=i(l),h={...Hf,...c},f=t(l,u?null:o.baseLatency,h),p=u?e(h.feedback,h.feedforward):null;super(o,!1,f,p),Wf(f),this._nativeIIRFilterNode=f,r(this,1)}getFrequencyResponse(o,c,l){return this._nativeIIRFilterNode.getFrequencyResponse(o,c,l)}},_u=(s,t,e,n,i,r,a,o,c,l,u)=>{const h=l.length;let f=o;for(let p=0;p<h;p+=1){let g=e[0]*l[p];for(let _=1;_<i;_+=1){const m=f-_&c-1;g+=e[_]*r[m],g-=s[_]*a[m]}for(let _=i;_<n;_+=1)g+=e[_]*r[f-_&c-1];for(let _=i;_<t;_+=1)g-=s[_]*a[f-_&c-1];r[f]=l[p],a[f]=g,f=f+1&c-1,u[p]=g}return f},Xf=(s,t,e,n)=>{const i=e instanceof Float64Array?e:new Float64Array(e),r=n instanceof Float64Array?n:new Float64Array(n),a=i.length,o=r.length,c=Math.min(a,o);if(i[0]!==1){for(let g=0;g<a;g+=1)r[g]/=i[0];for(let g=1;g<o;g+=1)i[g]/=i[0]}const l=32,u=new Float32Array(l),h=new Float32Array(l),f=t.createBuffer(s.numberOfChannels,s.length,s.sampleRate),p=s.numberOfChannels;for(let g=0;g<p;g+=1){const _=s.getChannelData(g),m=f.getChannelData(g);u.fill(0),h.fill(0),_u(i,a,r,o,c,u,h,0,l,_,m)}return f},jf=(s,t,e,n,i)=>(r,a)=>{const o=new WeakMap;let c=null;const l=async(u,h)=>{let f=null,p=t(u);const g=Ie(p,h);if(h.createIIRFilter===void 0?f=s(h,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}):g||(p=h.createIIRFilter(a,r)),o.set(h,f===null?p:f),f!==null){if(c===null){if(e===null)throw new Error("Missing the native OfflineAudioContext constructor.");const m=new e(u.context.destination.channelCount,u.context.length,h.sampleRate);c=(async()=>{await n(u,m,m.destination);const d=await i(m);return Xf(d,h,r,a)})()}const _=await c;return f.buffer=_,f.start(0),f}return await n(u,h,p),p};return{render(u,h){const f=o.get(h);return f!==void 0?Promise.resolve(f):l(u,h)}}},Yf=(s,t,e,n,i,r)=>a=>(o,c)=>{const l=s.get(o);if(l===void 0){if(!a&&r(o)){const u=n(o),{outputs:h}=e(o);for(const f of h)if(ar(f)){const p=n(f[0]);t(u,p,f[1],f[2])}else{const p=i(f[0]);u.disconnect(p,f[1])}}s.set(o,c)}else s.set(o,l+c)},$f=(s,t)=>e=>{const n=s.get(e);return t(n)||t(e)},Zf=(s,t)=>e=>s.has(e)||t(e),Kf=(s,t)=>e=>s.has(e)||t(e),Jf=(s,t)=>e=>{const n=s.get(e);return t(n)||t(e)},Qf=s=>t=>s!==null&&t instanceof s,tp=s=>t=>s!==null&&typeof s.AudioNode=="function"&&t instanceof s.AudioNode,ep=s=>t=>s!==null&&typeof s.AudioParam=="function"&&t instanceof s.AudioParam,np=(s,t)=>e=>s(e)||t(e),ip=s=>t=>s!==null&&t instanceof s,sp=s=>s!==null&&s.isSecureContext,rp=(s,t,e,n)=>class extends s{constructor(r,a){const o=e(r),c=t(o,a);if(n(o))throw TypeError();super(r,!0,c,null),this._nativeMediaElementAudioSourceNode=c}get mediaElement(){return this._nativeMediaElementAudioSourceNode.mediaElement}},op={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers"},ap=(s,t,e,n)=>class extends s{constructor(r,a){const o=e(r);if(n(o))throw new TypeError;const c={...op,...a},l=t(o,c);super(r,!1,l,null),this._nativeMediaStreamAudioDestinationNode=l}get stream(){return this._nativeMediaStreamAudioDestinationNode.stream}},cp=(s,t,e,n)=>class extends s{constructor(r,a){const o=e(r),c=t(o,a);if(n(o))throw new TypeError;super(r,!0,c,null),this._nativeMediaStreamAudioSourceNode=c}get mediaStream(){return this._nativeMediaStreamAudioSourceNode.mediaStream}},lp=(s,t,e)=>class extends s{constructor(i,r){const a=e(i),o=t(a,r);super(i,!0,o,null)}},up=(s,t,e,n,i,r)=>class extends e{constructor(o,c){super(o),this._nativeContext=o,vo.set(this,o),n(o)&&i.set(o,new Set),this._destination=new s(this,c),this._listener=t(this,o),this._onstatechange=null}get currentTime(){return this._nativeContext.currentTime}get destination(){return this._destination}get listener(){return this._listener}get onstatechange(){return this._onstatechange}set onstatechange(o){const c=typeof o=="function"?r(this,o):null;this._nativeContext.onstatechange=c;const l=this._nativeContext.onstatechange;this._onstatechange=l!==null&&l===c?o:l}get sampleRate(){return this._nativeContext.sampleRate}get state(){return this._nativeContext.state}},Gs=s=>{const t=new Uint32Array([1179011410,40,1163280727,544501094,16,131073,44100,176400,1048580,1635017060,4,0]);try{const e=s.decodeAudioData(t.buffer,()=>{});return e===void 0?!1:(e.catch(()=>{}),!0)}catch{}return!1},hp=(s,t)=>(e,n,i)=>{const r=new Set;return e.connect=(a=>(o,c=0,l=0)=>{const u=r.size===0;if(t(o))return a.call(e,o,c,l),s(r,[o,c,l],h=>h[0]===o&&h[1]===c&&h[2]===l,!0),u&&n(),o;a.call(e,o,c),s(r,[o,c],h=>h[0]===o&&h[1]===c,!0),u&&n()})(e.connect),e.disconnect=(a=>(o,c,l)=>{const u=r.size>0;if(o===void 0)a.apply(e),r.clear();else if(typeof o=="number"){a.call(e,o);for(const f of r)f[1]===o&&r.delete(f)}else{t(o)?a.call(e,o,c,l):a.call(e,o,c);for(const f of r)f[0]===o&&(c===void 0||f[1]===c)&&(l===void 0||f[2]===l)&&r.delete(f)}const h=r.size===0;u&&h&&i()})(e.disconnect),e},se=(s,t,e)=>{const n=t[e];n!==void 0&&n!==s[e]&&(s[e]=n)},ve=(s,t)=>{se(s,t,"channelCount"),se(s,t,"channelCountMode"),se(s,t,"channelInterpretation")},Ic=s=>typeof s.getFloatTimeDomainData=="function",dp=s=>{s.getFloatTimeDomainData=t=>{const e=new Uint8Array(t.length);s.getByteTimeDomainData(e);const n=Math.max(e.length,s.fftSize);for(let i=0;i<n;i+=1)t[i]=(e[i]-128)*.0078125;return t}},fp=(s,t)=>(e,n)=>{const i=e.createAnalyser();if(ve(i,n),!(n.maxDecibels>n.minDecibels))throw t();return se(i,n,"fftSize"),se(i,n,"maxDecibels"),se(i,n,"minDecibels"),se(i,n,"smoothingTimeConstant"),s(Ic,()=>Ic(i))||dp(i),i},pp=s=>s===null?null:s.hasOwnProperty("AudioBuffer")?s.AudioBuffer:null,ae=(s,t,e)=>{const n=t[e];n!==void 0&&n!==s[e].value&&(s[e].value=n)},mp=s=>{s.start=(t=>{let e=!1;return(n=0,i=0,r)=>{if(e)throw we();t.call(s,n,i,r),e=!0}})(s.start)},Xa=s=>{s.start=(t=>(e=0,n=0,i)=>{if(typeof i=="number"&&i<0||n<0||e<0)throw new RangeError("The parameters can't be negative.");t.call(s,e,n,i)})(s.start)},ja=s=>{s.stop=(t=>(e=0)=>{if(e<0)throw new RangeError("The parameter can't be negative.");t.call(s,e)})(s.stop)},gp=(s,t,e,n,i,r,a,o,c,l,u)=>(h,f)=>{const p=h.createBufferSource();return ve(p,f),ae(p,f,"playbackRate"),se(p,f,"buffer"),se(p,f,"loop"),se(p,f,"loopEnd"),se(p,f,"loopStart"),t(e,()=>e(h))||mp(p),t(n,()=>n(h))||c(p),t(i,()=>i(h))||l(p,h),t(r,()=>r(h))||Xa(p),t(a,()=>a(h))||u(p,h),t(o,()=>o(h))||ja(p),s(h,p),p},_p=s=>s===null?null:s.hasOwnProperty("AudioContext")?s.AudioContext:s.hasOwnProperty("webkitAudioContext")?s.webkitAudioContext:null,vp=(s,t)=>(e,n,i)=>{const r=e.destination;if(r.channelCount!==n)try{r.channelCount=n}catch{}i&&r.channelCountMode!=="explicit"&&(r.channelCountMode="explicit"),r.maxChannelCount===0&&Object.defineProperty(r,"maxChannelCount",{value:n});const a=s(e,{channelCount:n,channelCountMode:r.channelCountMode,channelInterpretation:r.channelInterpretation,gain:1});return t(a,"channelCount",o=>()=>o.call(a),o=>c=>{o.call(a,c);try{r.channelCount=c}catch(l){if(c>r.maxChannelCount)throw l}}),t(a,"channelCountMode",o=>()=>o.call(a),o=>c=>{o.call(a,c),r.channelCountMode=c}),t(a,"channelInterpretation",o=>()=>o.call(a),o=>c=>{o.call(a,c),r.channelInterpretation=c}),Object.defineProperty(a,"maxChannelCount",{get:()=>r.maxChannelCount}),a.connect(r),a},xp=s=>s===null?null:s.hasOwnProperty("AudioWorkletNode")?s.AudioWorkletNode:null,yp=s=>{const{port1:t}=new MessageChannel;try{t.postMessage(s)}finally{t.close()}},Sp=(s,t,e,n,i)=>(r,a,o,c,l,u)=>{if(o!==null)try{const h=new o(r,c,u),f=new Map;let p=null;if(Object.defineProperties(h,{channelCount:{get:()=>u.channelCount,set:()=>{throw s()}},channelCountMode:{get:()=>"explicit",set:()=>{throw s()}},onprocessorerror:{get:()=>p,set:g=>{typeof p=="function"&&h.removeEventListener("processorerror",p),p=typeof g=="function"?g:null,typeof p=="function"&&h.addEventListener("processorerror",p)}}}),h.addEventListener=(g=>(..._)=>{if(_[0]==="processorerror"){const m=typeof _[1]=="function"?_[1]:typeof _[1]=="object"&&_[1]!==null&&typeof _[1].handleEvent=="function"?_[1].handleEvent:null;if(m!==null){const d=f.get(_[1]);d!==void 0?_[1]=d:(_[1]=b=>{b.type==="error"?(Object.defineProperties(b,{type:{value:"processorerror"}}),m(b)):m(new ErrorEvent(_[0],{...b}))},f.set(m,_[1]))}}return g.call(h,"error",_[1],_[2]),g.call(h,..._)})(h.addEventListener),h.removeEventListener=(g=>(..._)=>{if(_[0]==="processorerror"){const m=f.get(_[1]);m!==void 0&&(f.delete(_[1]),_[1]=m)}return g.call(h,"error",_[1],_[2]),g.call(h,_[0],_[1],_[2])})(h.removeEventListener),u.numberOfOutputs!==0){const g=e(r,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return h.connect(g).connect(r.destination),i(h,()=>g.disconnect(),()=>g.connect(r.destination))}return h}catch(h){throw h.code===11?n():h}if(l===void 0)throw n();return yp(u),t(r,a,l,u)},vu=(s,t)=>s===null?512:Math.max(512,Math.min(16384,Math.pow(2,Math.round(Math.log2(s*t))))),Mp=s=>new Promise((t,e)=>{const{port1:n,port2:i}=new MessageChannel;n.onmessage=({data:r})=>{n.close(),i.close(),t(r)},n.onmessageerror=({data:r})=>{n.close(),i.close(),e(r)},i.postMessage(s)}),bp=async(s,t)=>{const e=await Mp(t);return new s(e)},wp=(s,t,e,n)=>{let i=Ma.get(s);i===void 0&&(i=new WeakMap,Ma.set(s,i));const r=bp(e,n);return i.set(t,r),r},Tp=(s,t,e,n,i,r,a,o,c,l,u,h,f)=>(p,g,_,m)=>{if(m.numberOfInputs===0&&m.numberOfOutputs===0)throw c();const d=Array.isArray(m.outputChannelCount)?m.outputChannelCount:Array.from(m.outputChannelCount);if(d.some(at=>at<1))throw c();if(d.length!==m.numberOfOutputs)throw t();if(m.channelCountMode!=="explicit")throw c();const b=m.channelCount*m.numberOfInputs,S=d.reduce((at,ft)=>at+ft,0),y=_.parameterDescriptors===void 0?0:_.parameterDescriptors.length;if(b+y>6||S>6)throw c();const v=new MessageChannel,T=[],A=[];for(let at=0;at<m.numberOfInputs;at+=1)T.push(a(p,{channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation,gain:1})),A.push(i(p,{channelCount:m.channelCount,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:m.channelCount}));const E=[];if(_.parameterDescriptors!==void 0)for(const{defaultValue:at,maxValue:ft,minValue:kt,name:Dt}of _.parameterDescriptors){const gt=r(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:m.parameterData[Dt]!==void 0?m.parameterData[Dt]:at===void 0?0:at});Object.defineProperties(gt.offset,{defaultValue:{get:()=>at===void 0?0:at},maxValue:{get:()=>ft===void 0?Fe:ft},minValue:{get:()=>kt===void 0?Ge:kt}}),E.push(gt)}const x=n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:Math.max(1,b+y)}),M=vu(g,p.sampleRate),N=o(p,M,b+y,Math.max(1,S)),L=i(p,{channelCount:Math.max(1,S),channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:Math.max(1,S)}),P=[];for(let at=0;at<m.numberOfOutputs;at+=1)P.push(n(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:d[at]}));for(let at=0;at<m.numberOfInputs;at+=1){T[at].connect(A[at]);for(let ft=0;ft<m.channelCount;ft+=1)A[at].connect(x,ft,at*m.channelCount+ft)}const I=new mu(_.parameterDescriptors===void 0?[]:_.parameterDescriptors.map(({name:at},ft)=>{const kt=E[ft];return kt.connect(x,0,b+ft),kt.start(0),[at,kt.offset]}));x.connect(N);let k=m.channelInterpretation,F=null;const z=m.numberOfOutputs===0?[N]:P,G={get bufferSize(){return M},get channelCount(){return m.channelCount},set channelCount(at){throw e()},get channelCountMode(){return m.channelCountMode},set channelCountMode(at){throw e()},get channelInterpretation(){return k},set channelInterpretation(at){for(const ft of T)ft.channelInterpretation=at;k=at},get context(){return N.context},get inputs(){return T},get numberOfInputs(){return m.numberOfInputs},get numberOfOutputs(){return m.numberOfOutputs},get onprocessorerror(){return F},set onprocessorerror(at){typeof F=="function"&&G.removeEventListener("processorerror",F),F=typeof at=="function"?at:null,typeof F=="function"&&G.addEventListener("processorerror",F)},get parameters(){return I},get port(){return v.port2},addEventListener(...at){return N.addEventListener(at[0],at[1],at[2])},connect:s.bind(null,z),disconnect:l.bind(null,z),dispatchEvent(...at){return N.dispatchEvent(at[0])},removeEventListener(...at){return N.removeEventListener(at[0],at[1],at[2])}},X=new Map;v.port1.addEventListener=(at=>(...ft)=>{if(ft[0]==="message"){const kt=typeof ft[1]=="function"?ft[1]:typeof ft[1]=="object"&&ft[1]!==null&&typeof ft[1].handleEvent=="function"?ft[1].handleEvent:null;if(kt!==null){const Dt=X.get(ft[1]);Dt!==void 0?ft[1]=Dt:(ft[1]=gt=>{u(p.currentTime,p.sampleRate,()=>kt(gt))},X.set(kt,ft[1]))}}return at.call(v.port1,ft[0],ft[1],ft[2])})(v.port1.addEventListener),v.port1.removeEventListener=(at=>(...ft)=>{if(ft[0]==="message"){const kt=X.get(ft[1]);kt!==void 0&&(X.delete(ft[1]),ft[1]=kt)}return at.call(v.port1,ft[0],ft[1],ft[2])})(v.port1.removeEventListener);let H=null;Object.defineProperty(v.port1,"onmessage",{get:()=>H,set:at=>{typeof H=="function"&&v.port1.removeEventListener("message",H),H=typeof at=="function"?at:null,typeof H=="function"&&(v.port1.addEventListener("message",H),v.port1.start())}}),_.prototype.port=v.port1;let ot=null;wp(p,G,_,m).then(at=>ot=at);const q=oo(m.numberOfInputs,m.channelCount),Z=oo(m.numberOfOutputs,d),tt=_.parameterDescriptors===void 0?[]:_.parameterDescriptors.reduce((at,{name:ft})=>({...at,[ft]:new Float32Array(128)}),{});let st=!0;const B=()=>{m.numberOfOutputs>0&&N.disconnect(L);for(let at=0,ft=0;at<m.numberOfOutputs;at+=1){const kt=P[at];for(let Dt=0;Dt<d[at];Dt+=1)L.disconnect(kt,ft+Dt,Dt);ft+=d[at]}},et=new Map;N.onaudioprocess=({inputBuffer:at,outputBuffer:ft})=>{if(ot!==null){const kt=h(G);for(let Dt=0;Dt<M;Dt+=128){for(let gt=0;gt<m.numberOfInputs;gt+=1)for(let Ct=0;Ct<m.channelCount;Ct+=1)ro(at,q[gt],Ct,Ct,Dt);_.parameterDescriptors!==void 0&&_.parameterDescriptors.forEach(({name:gt},Ct)=>{ro(at,tt,gt,b+Ct,Dt)});for(let gt=0;gt<m.numberOfInputs;gt+=1)for(let Ct=0;Ct<d[gt];Ct+=1)Z[gt][Ct].byteLength===0&&(Z[gt][Ct]=new Float32Array(128));try{const gt=q.map(($t,R)=>{if(kt[R].size>0)return et.set(R,M/128),$t;const j=et.get(R);return j===void 0?[]:($t.every(nt=>nt.every(rt=>rt===0))&&(j===1?et.delete(R):et.set(R,j-1)),$t)});st=u(p.currentTime+Dt/p.sampleRate,p.sampleRate,()=>ot.process(gt,Z,tt));for(let $t=0,R=0;$t<m.numberOfOutputs;$t+=1){for(let w=0;w<d[$t];w+=1)gu(ft,Z[$t],w,R+w,Dt);R+=d[$t]}}catch(gt){st=!1,G.dispatchEvent(new ErrorEvent("processorerror",{colno:gt.colno,filename:gt.filename,lineno:gt.lineno,message:gt.message}))}if(!st){for(let gt=0;gt<m.numberOfInputs;gt+=1){T[gt].disconnect(A[gt]);for(let Ct=0;Ct<m.channelCount;Ct+=1)A[Dt].disconnect(x,Ct,gt*m.channelCount+Ct)}if(_.parameterDescriptors!==void 0){const gt=_.parameterDescriptors.length;for(let Ct=0;Ct<gt;Ct+=1){const $t=E[Ct];$t.disconnect(x,0,b+Ct),$t.stop()}}x.disconnect(N),N.onaudioprocess=null,Mt?B():zt();break}}}};let Mt=!1;const ct=a(p,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0}),St=()=>N.connect(ct).connect(p.destination),zt=()=>{N.disconnect(ct),ct.disconnect()},_t=()=>{if(st){zt(),m.numberOfOutputs>0&&N.connect(L);for(let at=0,ft=0;at<m.numberOfOutputs;at+=1){const kt=P[at];for(let Dt=0;Dt<d[at];Dt+=1)L.connect(kt,ft+Dt,Dt);ft+=d[at]}}Mt=!0},Ot=()=>{st&&(St(),B()),Mt=!1};return St(),f(G,_t,Ot)},xu=(s,t)=>{const e=s.createBiquadFilter();return ve(e,t),ae(e,t,"Q"),ae(e,t,"detune"),ae(e,t,"frequency"),ae(e,t,"gain"),se(e,t,"type"),e},Ep=(s,t)=>(e,n)=>{const i=e.createChannelMerger(n.numberOfInputs);return s!==null&&s.name==="webkitAudioContext"&&t(e,i),ve(i,n),i},Ap=s=>{const t=s.numberOfOutputs;Object.defineProperty(s,"channelCount",{get:()=>t,set:e=>{if(e!==t)throw we()}}),Object.defineProperty(s,"channelCountMode",{get:()=>"explicit",set:e=>{if(e!=="explicit")throw we()}}),Object.defineProperty(s,"channelInterpretation",{get:()=>"discrete",set:e=>{if(e!=="discrete")throw we()}})},cr=(s,t)=>{const e=s.createChannelSplitter(t.numberOfOutputs);return ve(e,t),Ap(e),e},Cp=(s,t,e,n,i)=>(r,a)=>{if(r.createConstantSource===void 0)return e(r,a);const o=r.createConstantSource();return ve(o,a),ae(o,a,"offset"),t(n,()=>n(r))||Xa(o),t(i,()=>i(r))||ja(o),s(r,o),o},Ts=(s,t)=>(s.connect=t.connect.bind(t),s.disconnect=t.disconnect.bind(t),s),Rp=(s,t,e,n)=>(i,{offset:r,...a})=>{const o=i.createBuffer(1,2,44100),c=t(i,{buffer:null,channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",loop:!1,loopEnd:0,loopStart:0,playbackRate:1}),l=e(i,{...a,gain:r}),u=o.getChannelData(0);u[0]=1,u[1]=1,c.buffer=o,c.loop=!0;const h={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(g){l.channelCount=g},get channelCountMode(){return l.channelCountMode},set channelCountMode(g){l.channelCountMode=g},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(g){l.channelInterpretation=g},get context(){return l.context},get inputs(){return[]},get numberOfInputs(){return c.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get offset(){return l.gain},get onended(){return c.onended},set onended(g){c.onended=g},addEventListener(...g){return c.addEventListener(g[0],g[1],g[2])},dispatchEvent(...g){return c.dispatchEvent(g[0])},removeEventListener(...g){return c.removeEventListener(g[0],g[1],g[2])},start(g=0){c.start.call(c,g)},stop(g=0){c.stop.call(c,g)}},f=()=>c.connect(l),p=()=>c.disconnect(l);return s(i,c),n(Ts(h,l),f,p)},Dp=(s,t)=>(e,n)=>{const i=e.createConvolver();if(ve(i,n),n.disableNormalization===i.normalize&&(i.normalize=!n.disableNormalization),se(i,n,"buffer"),n.channelCount>2||(t(i,"channelCount",r=>()=>r.call(i),r=>a=>{if(a>2)throw s();return r.call(i,a)}),n.channelCountMode==="max"))throw s();return t(i,"channelCountMode",r=>()=>r.call(i),r=>a=>{if(a==="max")throw s();return r.call(i,a)}),i},yu=(s,t)=>{const e=s.createDelay(t.maxDelayTime);return ve(e,t),ae(e,t,"delayTime"),e},Pp=s=>(t,e)=>{const n=t.createDynamicsCompressor();if(ve(n,e),e.channelCount>2||e.channelCountMode==="max")throw s();return ae(n,e,"attack"),ae(n,e,"knee"),ae(n,e,"ratio"),ae(n,e,"release"),ae(n,e,"threshold"),n},Xe=(s,t)=>{const e=s.createGain();return ve(e,t),ae(e,t,"gain"),e},Lp=s=>(t,e,n)=>{if(t.createIIRFilter===void 0)return s(t,e,n);const i=t.createIIRFilter(n.feedforward,n.feedback);return ve(i,n),i};function Ip(s,t){const e=t[0]*t[0]+t[1]*t[1];return[(s[0]*t[0]+s[1]*t[1])/e,(s[1]*t[0]-s[0]*t[1])/e]}function Np(s,t){return[s[0]*t[0]-s[1]*t[1],s[0]*t[1]+s[1]*t[0]]}function Nc(s,t){let e=[0,0];for(let n=s.length-1;n>=0;n-=1)e=Np(e,t),e[0]+=s[n];return e}const Op=(s,t,e,n)=>(i,r,{channelCount:a,channelCountMode:o,channelInterpretation:c,feedback:l,feedforward:u})=>{const h=vu(r,i.sampleRate),f=l instanceof Float64Array?l:new Float64Array(l),p=u instanceof Float64Array?u:new Float64Array(u),g=f.length,_=p.length,m=Math.min(g,_);if(g===0||g>20)throw n();if(f[0]===0)throw t();if(_===0||_>20)throw n();if(p[0]===0)throw t();if(f[0]!==1){for(let E=0;E<_;E+=1)p[E]/=f[0];for(let E=1;E<g;E+=1)f[E]/=f[0]}const d=e(i,h,a,a);d.channelCount=a,d.channelCountMode=o,d.channelInterpretation=c;const b=32,S=[],y=[],v=[];for(let E=0;E<a;E+=1){S.push(0);const x=new Float32Array(b),M=new Float32Array(b);x.fill(0),M.fill(0),y.push(x),v.push(M)}d.onaudioprocess=E=>{const x=E.inputBuffer,M=E.outputBuffer,N=x.numberOfChannels;for(let L=0;L<N;L+=1){const P=x.getChannelData(L),I=M.getChannelData(L);S[L]=_u(f,g,p,_,m,y[L],v[L],S[L],b,P,I)}};const T=i.sampleRate/2;return Ts({get bufferSize(){return h},get channelCount(){return d.channelCount},set channelCount(E){d.channelCount=E},get channelCountMode(){return d.channelCountMode},set channelCountMode(E){d.channelCountMode=E},get channelInterpretation(){return d.channelInterpretation},set channelInterpretation(E){d.channelInterpretation=E},get context(){return d.context},get inputs(){return[d]},get numberOfInputs(){return d.numberOfInputs},get numberOfOutputs(){return d.numberOfOutputs},addEventListener(...E){return d.addEventListener(E[0],E[1],E[2])},dispatchEvent(...E){return d.dispatchEvent(E[0])},getFrequencyResponse(E,x,M){if(E.length!==x.length||x.length!==M.length)throw s();const N=E.length;for(let L=0;L<N;L+=1){const P=-Math.PI*(E[L]/T),I=[Math.cos(P),Math.sin(P)],k=Nc(p,I),F=Nc(f,I),z=Ip(k,F);x[L]=Math.sqrt(z[0]*z[0]+z[1]*z[1]),M[L]=Math.atan2(z[1],z[0])}},removeEventListener(...E){return d.removeEventListener(E[0],E[1],E[2])}},d)},kp=(s,t)=>s.createMediaElementSource(t.mediaElement),Up=(s,t)=>{const e=s.createMediaStreamDestination();return ve(e,t),e.numberOfOutputs===1&&Object.defineProperty(e,"numberOfOutputs",{get:()=>0}),e},Fp=(s,{mediaStream:t})=>{const e=t.getAudioTracks();e.sort((r,a)=>r.id<a.id?-1:r.id>a.id?1:0);const n=e.slice(0,1),i=s.createMediaStreamSource(new MediaStream(n));return Object.defineProperty(i,"mediaStream",{value:t}),i},Vp=(s,t)=>(e,{mediaStreamTrack:n})=>{if(typeof e.createMediaStreamTrackSource=="function")return e.createMediaStreamTrackSource(n);const i=new MediaStream([n]),r=e.createMediaStreamSource(i);if(n.kind!=="audio")throw s();if(t(e))throw new TypeError;return r},zp=s=>s===null?null:s.hasOwnProperty("OfflineAudioContext")?s.OfflineAudioContext:s.hasOwnProperty("webkitOfflineAudioContext")?s.webkitOfflineAudioContext:null,Bp=(s,t,e,n,i,r)=>(a,o)=>{const c=a.createOscillator();return ve(c,o),ae(c,o,"detune"),ae(c,o,"frequency"),o.periodicWave!==void 0?c.setPeriodicWave(o.periodicWave):se(c,o,"type"),t(e,()=>e(a))||Xa(c),t(n,()=>n(a))||r(c,a),t(i,()=>i(a))||ja(c),s(a,c),c},Gp=s=>(t,e)=>{const n=t.createPanner();return n.orientationX===void 0?s(t,e):(ve(n,e),ae(n,e,"orientationX"),ae(n,e,"orientationY"),ae(n,e,"orientationZ"),ae(n,e,"positionX"),ae(n,e,"positionY"),ae(n,e,"positionZ"),se(n,e,"coneInnerAngle"),se(n,e,"coneOuterAngle"),se(n,e,"coneOuterGain"),se(n,e,"distanceModel"),se(n,e,"maxDistance"),se(n,e,"panningModel"),se(n,e,"refDistance"),se(n,e,"rolloffFactor"),n)},Wp=(s,t,e,n,i,r,a,o,c,l)=>(u,{coneInnerAngle:h,coneOuterAngle:f,coneOuterGain:p,distanceModel:g,maxDistance:_,orientationX:m,orientationY:d,orientationZ:b,panningModel:S,positionX:y,positionY:v,positionZ:T,refDistance:A,rolloffFactor:E,...x})=>{const M=u.createPanner();if(x.channelCount>2||x.channelCountMode==="max")throw a();ve(M,x);const N={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},L=e(u,{...N,channelInterpretation:"speakers",numberOfInputs:6}),P=n(u,{...x,gain:1}),I=n(u,{...N,gain:1}),k=n(u,{...N,gain:0}),F=n(u,{...N,gain:0}),z=n(u,{...N,gain:0}),G=n(u,{...N,gain:0}),X=n(u,{...N,gain:0}),H=i(u,256,6,1),ot=r(u,{...N,curve:new Float32Array([1,1]),oversample:"none"});let Q=[m,d,b],q=[y,v,T];const Z=new Float32Array(1);H.onaudioprocess=({inputBuffer:et})=>{const Mt=[c(et,Z,0),c(et,Z,1),c(et,Z,2)];Mt.some((St,zt)=>St!==Q[zt])&&(M.setOrientation(...Mt),Q=Mt);const ct=[c(et,Z,3),c(et,Z,4),c(et,Z,5)];ct.some((St,zt)=>St!==q[zt])&&(M.setPosition(...ct),q=ct)},Object.defineProperty(k.gain,"defaultValue",{get:()=>0}),Object.defineProperty(F.gain,"defaultValue",{get:()=>0}),Object.defineProperty(z.gain,"defaultValue",{get:()=>0}),Object.defineProperty(G.gain,"defaultValue",{get:()=>0}),Object.defineProperty(X.gain,"defaultValue",{get:()=>0});const tt={get bufferSize(){},get channelCount(){return M.channelCount},set channelCount(et){if(et>2)throw a();P.channelCount=et,M.channelCount=et},get channelCountMode(){return M.channelCountMode},set channelCountMode(et){if(et==="max")throw a();P.channelCountMode=et,M.channelCountMode=et},get channelInterpretation(){return M.channelInterpretation},set channelInterpretation(et){P.channelInterpretation=et,M.channelInterpretation=et},get coneInnerAngle(){return M.coneInnerAngle},set coneInnerAngle(et){M.coneInnerAngle=et},get coneOuterAngle(){return M.coneOuterAngle},set coneOuterAngle(et){M.coneOuterAngle=et},get coneOuterGain(){return M.coneOuterGain},set coneOuterGain(et){if(et<0||et>1)throw t();M.coneOuterGain=et},get context(){return M.context},get distanceModel(){return M.distanceModel},set distanceModel(et){M.distanceModel=et},get inputs(){return[P]},get maxDistance(){return M.maxDistance},set maxDistance(et){if(et<0)throw new RangeError;M.maxDistance=et},get numberOfInputs(){return M.numberOfInputs},get numberOfOutputs(){return M.numberOfOutputs},get orientationX(){return I.gain},get orientationY(){return k.gain},get orientationZ(){return F.gain},get panningModel(){return M.panningModel},set panningModel(et){M.panningModel=et},get positionX(){return z.gain},get positionY(){return G.gain},get positionZ(){return X.gain},get refDistance(){return M.refDistance},set refDistance(et){if(et<0)throw new RangeError;M.refDistance=et},get rolloffFactor(){return M.rolloffFactor},set rolloffFactor(et){if(et<0)throw new RangeError;M.rolloffFactor=et},addEventListener(...et){return P.addEventListener(et[0],et[1],et[2])},dispatchEvent(...et){return P.dispatchEvent(et[0])},removeEventListener(...et){return P.removeEventListener(et[0],et[1],et[2])}};h!==tt.coneInnerAngle&&(tt.coneInnerAngle=h),f!==tt.coneOuterAngle&&(tt.coneOuterAngle=f),p!==tt.coneOuterGain&&(tt.coneOuterGain=p),g!==tt.distanceModel&&(tt.distanceModel=g),_!==tt.maxDistance&&(tt.maxDistance=_),m!==tt.orientationX.value&&(tt.orientationX.value=m),d!==tt.orientationY.value&&(tt.orientationY.value=d),b!==tt.orientationZ.value&&(tt.orientationZ.value=b),S!==tt.panningModel&&(tt.panningModel=S),y!==tt.positionX.value&&(tt.positionX.value=y),v!==tt.positionY.value&&(tt.positionY.value=v),T!==tt.positionZ.value&&(tt.positionZ.value=T),A!==tt.refDistance&&(tt.refDistance=A),E!==tt.rolloffFactor&&(tt.rolloffFactor=E),(Q[0]!==1||Q[1]!==0||Q[2]!==0)&&M.setOrientation(...Q),(q[0]!==0||q[1]!==0||q[2]!==0)&&M.setPosition(...q);const st=()=>{P.connect(M),s(P,ot,0,0),ot.connect(I).connect(L,0,0),ot.connect(k).connect(L,0,1),ot.connect(F).connect(L,0,2),ot.connect(z).connect(L,0,3),ot.connect(G).connect(L,0,4),ot.connect(X).connect(L,0,5),L.connect(H).connect(u.destination)},B=()=>{P.disconnect(M),o(P,ot,0,0),ot.disconnect(I),I.disconnect(L),ot.disconnect(k),k.disconnect(L),ot.disconnect(F),F.disconnect(L),ot.disconnect(z),z.disconnect(L),ot.disconnect(G),G.disconnect(L),ot.disconnect(X),X.disconnect(L),L.disconnect(H),H.disconnect(u.destination)};return l(Ts(tt,M),st,B)},Hp=s=>(t,{disableNormalization:e,imag:n,real:i})=>{const r=n instanceof Float32Array?n:new Float32Array(n),a=i instanceof Float32Array?i:new Float32Array(i),o=t.createPeriodicWave(a,r,{disableNormalization:e});if(Array.from(n).length<2)throw s();return o},lr=(s,t,e,n)=>s.createScriptProcessor(t,e,n),qp=(s,t)=>(e,n)=>{const i=n.channelCountMode;if(i==="clamped-max")throw t();if(e.createStereoPanner===void 0)return s(e,n);const r=e.createStereoPanner();return ve(r,n),ae(r,n,"pan"),Object.defineProperty(r,"channelCountMode",{get:()=>i,set:a=>{if(a!==i)throw t()}}),r},Xp=(s,t,e,n,i,r)=>{const o=new Float32Array([1,1]),c=Math.PI/2,l={channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete"},u={...l,oversample:"none"},h=(g,_,m,d)=>{const b=new Float32Array(16385),S=new Float32Array(16385);for(let x=0;x<16385;x+=1){const M=x/16384*c;b[x]=Math.cos(M),S[x]=Math.sin(M)}const y=e(g,{...l,gain:0}),v=n(g,{...u,curve:b}),T=n(g,{...u,curve:o}),A=e(g,{...l,gain:0}),E=n(g,{...u,curve:S});return{connectGraph(){_.connect(y),_.connect(T.inputs===void 0?T:T.inputs[0]),_.connect(A),T.connect(m),m.connect(v.inputs===void 0?v:v.inputs[0]),m.connect(E.inputs===void 0?E:E.inputs[0]),v.connect(y.gain),E.connect(A.gain),y.connect(d,0,0),A.connect(d,0,1)},disconnectGraph(){_.disconnect(y),_.disconnect(T.inputs===void 0?T:T.inputs[0]),_.disconnect(A),T.disconnect(m),m.disconnect(v.inputs===void 0?v:v.inputs[0]),m.disconnect(E.inputs===void 0?E:E.inputs[0]),v.disconnect(y.gain),E.disconnect(A.gain),y.disconnect(d,0,0),A.disconnect(d,0,1)}}},f=(g,_,m,d)=>{const b=new Float32Array(16385),S=new Float32Array(16385),y=new Float32Array(16385),v=new Float32Array(16385),T=Math.floor(16385/2);for(let z=0;z<16385;z+=1)if(z>T){const G=(z-T)/(16384-T)*c;b[z]=Math.cos(G),S[z]=Math.sin(G),y[z]=0,v[z]=1}else{const G=z/(16384-T)*c;b[z]=1,S[z]=0,y[z]=Math.cos(G),v[z]=Math.sin(G)}const A=t(g,{channelCount:2,channelCountMode:"explicit",channelInterpretation:"discrete",numberOfOutputs:2}),E=e(g,{...l,gain:0}),x=n(g,{...u,curve:b}),M=e(g,{...l,gain:0}),N=n(g,{...u,curve:S}),L=n(g,{...u,curve:o}),P=e(g,{...l,gain:0}),I=n(g,{...u,curve:y}),k=e(g,{...l,gain:0}),F=n(g,{...u,curve:v});return{connectGraph(){_.connect(A),_.connect(L.inputs===void 0?L:L.inputs[0]),A.connect(E,0),A.connect(M,0),A.connect(P,1),A.connect(k,1),L.connect(m),m.connect(x.inputs===void 0?x:x.inputs[0]),m.connect(N.inputs===void 0?N:N.inputs[0]),m.connect(I.inputs===void 0?I:I.inputs[0]),m.connect(F.inputs===void 0?F:F.inputs[0]),x.connect(E.gain),N.connect(M.gain),I.connect(P.gain),F.connect(k.gain),E.connect(d,0,0),P.connect(d,0,0),M.connect(d,0,1),k.connect(d,0,1)},disconnectGraph(){_.disconnect(A),_.disconnect(L.inputs===void 0?L:L.inputs[0]),A.disconnect(E,0),A.disconnect(M,0),A.disconnect(P,1),A.disconnect(k,1),L.disconnect(m),m.disconnect(x.inputs===void 0?x:x.inputs[0]),m.disconnect(N.inputs===void 0?N:N.inputs[0]),m.disconnect(I.inputs===void 0?I:I.inputs[0]),m.disconnect(F.inputs===void 0?F:F.inputs[0]),x.disconnect(E.gain),N.disconnect(M.gain),I.disconnect(P.gain),F.disconnect(k.gain),E.disconnect(d,0,0),P.disconnect(d,0,0),M.disconnect(d,0,1),k.disconnect(d,0,1)}}},p=(g,_,m,d,b)=>{if(_===1)return h(g,m,d,b);if(_===2)return f(g,m,d,b);throw i()};return(g,{channelCount:_,channelCountMode:m,pan:d,...b})=>{if(m==="max")throw i();const S=s(g,{...b,channelCount:1,channelCountMode:m,numberOfInputs:2}),y=e(g,{...b,channelCount:_,channelCountMode:m,gain:1}),v=e(g,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:d});let{connectGraph:T,disconnectGraph:A}=p(g,_,y,v,S);Object.defineProperty(v.gain,"defaultValue",{get:()=>0}),Object.defineProperty(v.gain,"maxValue",{get:()=>1}),Object.defineProperty(v.gain,"minValue",{get:()=>-1});const E={get bufferSize(){},get channelCount(){return y.channelCount},set channelCount(L){y.channelCount!==L&&(x&&A(),{connectGraph:T,disconnectGraph:A}=p(g,L,y,v,S),x&&T()),y.channelCount=L},get channelCountMode(){return y.channelCountMode},set channelCountMode(L){if(L==="clamped-max"||L==="max")throw i();y.channelCountMode=L},get channelInterpretation(){return y.channelInterpretation},set channelInterpretation(L){y.channelInterpretation=L},get context(){return y.context},get inputs(){return[y]},get numberOfInputs(){return y.numberOfInputs},get numberOfOutputs(){return y.numberOfOutputs},get pan(){return v.gain},addEventListener(...L){return y.addEventListener(L[0],L[1],L[2])},dispatchEvent(...L){return y.dispatchEvent(L[0])},removeEventListener(...L){return y.removeEventListener(L[0],L[1],L[2])}};let x=!1;const M=()=>{T(),x=!0},N=()=>{A(),x=!1};return r(Ts(E,S),M,N)}},jp=(s,t,e,n,i,r,a)=>(o,c)=>{const l=o.createWaveShaper();if(r!==null&&r.name==="webkitAudioContext"&&o.createGain().gain.automationRate===void 0)return e(o,c);ve(l,c);const u=c.curve===null||c.curve instanceof Float32Array?c.curve:new Float32Array(c.curve);if(u!==null&&u.length<2)throw t();se(l,{curve:u},"curve"),se(l,c,"oversample");let h=null,f=!1;return a(l,"curve",_=>()=>_.call(l),_=>m=>(_.call(l,m),f&&(n(m)&&h===null?h=s(o,l):!n(m)&&h!==null&&(h(),h=null)),m)),i(l,()=>{f=!0,n(l.curve)&&(h=s(o,l))},()=>{f=!1,h!==null&&(h(),h=null)})},Yp=(s,t,e,n,i)=>(r,{curve:a,oversample:o,...c})=>{const l=r.createWaveShaper(),u=r.createWaveShaper();ve(l,c),ve(u,c);const h=e(r,{...c,gain:1}),f=e(r,{...c,gain:-1}),p=e(r,{...c,gain:1}),g=e(r,{...c,gain:-1});let _=null,m=!1,d=null;const b={get bufferSize(){},get channelCount(){return l.channelCount},set channelCount(v){h.channelCount=v,f.channelCount=v,l.channelCount=v,p.channelCount=v,u.channelCount=v,g.channelCount=v},get channelCountMode(){return l.channelCountMode},set channelCountMode(v){h.channelCountMode=v,f.channelCountMode=v,l.channelCountMode=v,p.channelCountMode=v,u.channelCountMode=v,g.channelCountMode=v},get channelInterpretation(){return l.channelInterpretation},set channelInterpretation(v){h.channelInterpretation=v,f.channelInterpretation=v,l.channelInterpretation=v,p.channelInterpretation=v,u.channelInterpretation=v,g.channelInterpretation=v},get context(){return l.context},get curve(){return d},set curve(v){if(v!==null&&v.length<2)throw t();if(v===null)l.curve=v,u.curve=v;else{const T=v.length,A=new Float32Array(T+2-T%2),E=new Float32Array(T+2-T%2);A[0]=v[0],E[0]=-v[T-1];const x=Math.ceil((T+1)/2),M=(T+1)/2-1;for(let N=1;N<x;N+=1){const L=N/x*M,P=Math.floor(L),I=Math.ceil(L);A[N]=P===I?v[P]:(1-(L-P))*v[P]+(1-(I-L))*v[I],E[N]=P===I?-v[T-1-P]:-((1-(L-P))*v[T-1-P])-(1-(I-L))*v[T-1-I]}A[x]=T%2===1?v[x-1]:(v[x-2]+v[x-1])/2,l.curve=A,u.curve=E}d=v,m&&(n(d)&&_===null?_=s(r,h):_!==null&&(_(),_=null))},get inputs(){return[h]},get numberOfInputs(){return l.numberOfInputs},get numberOfOutputs(){return l.numberOfOutputs},get oversample(){return l.oversample},set oversample(v){l.oversample=v,u.oversample=v},addEventListener(...v){return h.addEventListener(v[0],v[1],v[2])},dispatchEvent(...v){return h.dispatchEvent(v[0])},removeEventListener(...v){return h.removeEventListener(v[0],v[1],v[2])}};a!==null&&(b.curve=a instanceof Float32Array?a:new Float32Array(a)),o!==b.oversample&&(b.oversample=o);const S=()=>{h.connect(l).connect(p),h.connect(f).connect(u).connect(g).connect(p),m=!0,n(d)&&(_=s(r,h))},y=()=>{h.disconnect(l),l.disconnect(p),h.disconnect(f),f.disconnect(u),u.disconnect(g),g.disconnect(p),m=!1,_!==null&&(_(),_=null)};return i(Ts(b,p),S,y)},Be=()=>new DOMException("","NotSupportedError"),$p={numberOfChannels:1},Zp=(s,t,e,n,i)=>class extends s{constructor(a,o,c){let l;if(typeof a=="number"&&o!==void 0&&c!==void 0)l={length:o,numberOfChannels:a,sampleRate:c};else if(typeof a=="object")l=a;else throw new Error("The given parameters are not valid.");const{length:u,numberOfChannels:h,sampleRate:f}={...$p,...l},p=n(h,u,f);t(Gs,()=>Gs(p))||p.addEventListener("statechange",(()=>{let g=0;const _=m=>{this._state==="running"&&(g>0?(p.removeEventListener("statechange",_),m.stopImmediatePropagation(),this._waitForThePromiseToSettle(m)):g+=1)};return _})()),super(p,h),this._length=u,this._nativeOfflineAudioContext=p,this._state=null}get length(){return this._nativeOfflineAudioContext.length===void 0?this._length:this._nativeOfflineAudioContext.length}get state(){return this._state===null?this._nativeOfflineAudioContext.state:this._state}startRendering(){return this._state==="running"?Promise.reject(e()):(this._state="running",i(this.destination,this._nativeOfflineAudioContext).finally(()=>{this._state=null,hu(this)}))}_waitForThePromiseToSettle(a){this._state===null?this._nativeOfflineAudioContext.dispatchEvent(a):setTimeout(()=>this._waitForThePromiseToSettle(a))}},Kp={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",detune:0,frequency:440,periodicWave:void 0,type:"sine"},Jp=(s,t,e,n,i,r,a)=>class extends s{constructor(c,l){const u=i(c),h={...Kp,...l},f=e(u,h),p=r(u),g=p?n():null,_=c.sampleRate/2;super(c,!1,f,g),this._detune=t(this,p,f.detune,153600,-153600),this._frequency=t(this,p,f.frequency,_,-_),this._nativeOscillatorNode=f,this._onended=null,this._oscillatorNodeRenderer=g,this._oscillatorNodeRenderer!==null&&h.periodicWave!==void 0&&(this._oscillatorNodeRenderer.periodicWave=h.periodicWave)}get detune(){return this._detune}get frequency(){return this._frequency}get onended(){return this._onended}set onended(c){const l=typeof c=="function"?a(this,c):null;this._nativeOscillatorNode.onended=l;const u=this._nativeOscillatorNode.onended;this._onended=u!==null&&u===l?c:u}get type(){return this._nativeOscillatorNode.type}set type(c){this._nativeOscillatorNode.type=c,this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=null)}setPeriodicWave(c){this._nativeOscillatorNode.setPeriodicWave(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.periodicWave=c)}start(c=0){if(this._nativeOscillatorNode.start(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.start=c),this.context.state!=="closed"){gs(this);const l=()=>{this._nativeOscillatorNode.removeEventListener("ended",l),Hn(this)&&rr(this)};this._nativeOscillatorNode.addEventListener("ended",l)}}stop(c=0){this._nativeOscillatorNode.stop(c),this._oscillatorNodeRenderer!==null&&(this._oscillatorNodeRenderer.stop=c)}},Qp=(s,t,e,n,i)=>()=>{const r=new WeakMap;let a=null,o=null,c=null;const l=async(u,h)=>{let f=e(u);const p=Ie(f,h);if(!p){const g={channelCount:f.channelCount,channelCountMode:f.channelCountMode,channelInterpretation:f.channelInterpretation,detune:f.detune.value,frequency:f.frequency.value,periodicWave:a===null?void 0:a,type:f.type};f=t(h,g),o!==null&&f.start(o),c!==null&&f.stop(c)}return r.set(h,f),p?(await s(h,u.detune,f.detune),await s(h,u.frequency,f.frequency)):(await n(h,u.detune,f.detune),await n(h,u.frequency,f.frequency)),await i(u,h,f),f};return{set periodicWave(u){a=u},set start(u){o=u},set stop(u){c=u},render(u,h){const f=r.get(h);return f!==void 0?Promise.resolve(f):l(u,h)}}},tm={channelCount:2,channelCountMode:"clamped-max",channelInterpretation:"speakers",coneInnerAngle:360,coneOuterAngle:360,coneOuterGain:0,distanceModel:"inverse",maxDistance:1e4,orientationX:1,orientationY:0,orientationZ:0,panningModel:"equalpower",positionX:0,positionY:0,positionZ:0,refDistance:1,rolloffFactor:1},em=(s,t,e,n,i,r,a)=>class extends s{constructor(c,l){const u=i(c),h={...tm,...l},f=e(u,h),p=r(u),g=p?n():null;super(c,!1,f,g),this._nativePannerNode=f,this._orientationX=t(this,p,f.orientationX,Fe,Ge),this._orientationY=t(this,p,f.orientationY,Fe,Ge),this._orientationZ=t(this,p,f.orientationZ,Fe,Ge),this._positionX=t(this,p,f.positionX,Fe,Ge),this._positionY=t(this,p,f.positionY,Fe,Ge),this._positionZ=t(this,p,f.positionZ,Fe,Ge),a(this,1)}get coneInnerAngle(){return this._nativePannerNode.coneInnerAngle}set coneInnerAngle(c){this._nativePannerNode.coneInnerAngle=c}get coneOuterAngle(){return this._nativePannerNode.coneOuterAngle}set coneOuterAngle(c){this._nativePannerNode.coneOuterAngle=c}get coneOuterGain(){return this._nativePannerNode.coneOuterGain}set coneOuterGain(c){this._nativePannerNode.coneOuterGain=c}get distanceModel(){return this._nativePannerNode.distanceModel}set distanceModel(c){this._nativePannerNode.distanceModel=c}get maxDistance(){return this._nativePannerNode.maxDistance}set maxDistance(c){this._nativePannerNode.maxDistance=c}get orientationX(){return this._orientationX}get orientationY(){return this._orientationY}get orientationZ(){return this._orientationZ}get panningModel(){return this._nativePannerNode.panningModel}set panningModel(c){this._nativePannerNode.panningModel=c}get positionX(){return this._positionX}get positionY(){return this._positionY}get positionZ(){return this._positionZ}get refDistance(){return this._nativePannerNode.refDistance}set refDistance(c){this._nativePannerNode.refDistance=c}get rolloffFactor(){return this._nativePannerNode.rolloffFactor}set rolloffFactor(c){this._nativePannerNode.rolloffFactor=c}},nm=(s,t,e,n,i,r,a,o,c,l)=>()=>{const u=new WeakMap;let h=null;const f=async(p,g)=>{let _=null,m=r(p);const d={channelCount:m.channelCount,channelCountMode:m.channelCountMode,channelInterpretation:m.channelInterpretation},b={...d,coneInnerAngle:m.coneInnerAngle,coneOuterAngle:m.coneOuterAngle,coneOuterGain:m.coneOuterGain,distanceModel:m.distanceModel,maxDistance:m.maxDistance,panningModel:m.panningModel,refDistance:m.refDistance,rolloffFactor:m.rolloffFactor},S=Ie(m,g);if("bufferSize"in m)_=n(g,{...d,gain:1});else if(!S){const y={...b,orientationX:m.orientationX.value,orientationY:m.orientationY.value,orientationZ:m.orientationZ.value,positionX:m.positionX.value,positionY:m.positionY.value,positionZ:m.positionZ.value};m=i(g,y)}if(u.set(g,_===null?m:_),_!==null){if(h===null){if(a===null)throw new Error("Missing the native OfflineAudioContext constructor.");const N=new a(6,p.context.length,g.sampleRate),L=t(N,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"speakers",numberOfInputs:6});L.connect(N.destination),h=(async()=>{const P=await Promise.all([p.orientationX,p.orientationY,p.orientationZ,p.positionX,p.positionY,p.positionZ].map(async(I,k)=>{const F=e(N,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",offset:k===0?1:0});return await o(N,I,F.offset),F}));for(let I=0;I<6;I+=1)P[I].connect(L,0,I),P[I].start(0);return l(N)})()}const y=await h,v=n(g,{...d,gain:1});await c(p,g,v);const T=[];for(let N=0;N<y.numberOfChannels;N+=1)T.push(y.getChannelData(N));let A=[T[0][0],T[1][0],T[2][0]],E=[T[3][0],T[4][0],T[5][0]],x=n(g,{...d,gain:1}),M=i(g,{...b,orientationX:A[0],orientationY:A[1],orientationZ:A[2],positionX:E[0],positionY:E[1],positionZ:E[2]});v.connect(x).connect(M.inputs[0]),M.connect(_);for(let N=128;N<y.length;N+=128){const L=[T[0][N],T[1][N],T[2][N]],P=[T[3][N],T[4][N],T[5][N]];if(L.some((I,k)=>I!==A[k])||P.some((I,k)=>I!==E[k])){A=L,E=P;const I=N/g.sampleRate;x.gain.setValueAtTime(0,I),x=n(g,{...d,gain:0}),M=i(g,{...b,orientationX:A[0],orientationY:A[1],orientationZ:A[2],positionX:E[0],positionY:E[1],positionZ:E[2]}),x.gain.setValueAtTime(1,I),v.connect(x).connect(M.inputs[0]),M.connect(_)}}return _}return S?(await s(g,p.orientationX,m.orientationX),await s(g,p.orientationY,m.orientationY),await s(g,p.orientationZ,m.orientationZ),await s(g,p.positionX,m.positionX),await s(g,p.positionY,m.positionY),await s(g,p.positionZ,m.positionZ)):(await o(g,p.orientationX,m.orientationX),await o(g,p.orientationY,m.orientationY),await o(g,p.orientationZ,m.orientationZ),await o(g,p.positionX,m.positionX),await o(g,p.positionY,m.positionY),await o(g,p.positionZ,m.positionZ)),ws(m)?await c(p,g,m.inputs[0]):await c(p,g,m),m};return{render(p,g){const _=u.get(g);return _!==void 0?Promise.resolve(_):f(p,g)}}},im={disableNormalization:!1},sm=(s,t,e,n)=>class Su{constructor(r,a){const o=t(r),c=n({...im,...a}),l=s(o,c);return e.add(l),l}static[Symbol.hasInstance](r){return r!==null&&typeof r=="object"&&Object.getPrototypeOf(r)===Su.prototype||e.has(r)}},rm=(s,t)=>(e,n,i)=>(s(n).replay(i),t(n,e,i)),om=(s,t,e)=>async(n,i,r)=>{const a=s(n);await Promise.all(a.activeInputs.map((o,c)=>Array.from(o).map(async([l,u])=>{const f=await t(l).render(l,i),p=n.context.destination;!e(l)&&(n!==p||!e(n))&&f.connect(r,u,c)})).reduce((o,c)=>[...o,...c],[]))},am=(s,t,e)=>async(n,i,r)=>{const a=t(n);await Promise.all(Array.from(a.activeInputs).map(async([o,c])=>{const u=await s(o).render(o,i);e(o)||u.connect(r,c)}))},cm=(s,t,e,n)=>i=>s(Gs,()=>Gs(i))?Promise.resolve(s(n,n)).then(r=>{if(!r){const a=e(i,512,0,1);i.oncomplete=()=>{a.onaudioprocess=null,a.disconnect()},a.onaudioprocess=()=>i.currentTime,a.connect(i.destination)}return i.startRendering()}):new Promise(r=>{const a=t(i,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});i.oncomplete=o=>{a.disconnect(),r(o.renderedBuffer)},a.connect(i.destination),i.startRendering()}),lm=s=>(t,e)=>{s.set(t,e)},um=s=>(t,e)=>s.set(t,e),hm=(s,t,e,n,i,r,a,o)=>(c,l)=>e(c).render(c,l).then(()=>Promise.all(Array.from(n(l)).map(u=>e(u).render(u,l)))).then(()=>i(l)).then(u=>(typeof u.copyFromChannel!="function"?(a(u),Wa(u)):t(r,()=>r(u))||o(u),s.add(u),u)),dm={channelCount:2,channelCountMode:"explicit",channelInterpretation:"speakers",pan:0},fm=(s,t,e,n,i,r)=>class extends s{constructor(o,c){const l=i(o),u={...dm,...c},h=e(l,u),f=r(l),p=f?n():null;super(o,!1,h,p),this._pan=t(this,f,h.pan)}get pan(){return this._pan}},pm=(s,t,e,n,i)=>()=>{const r=new WeakMap,a=async(o,c)=>{let l=e(o);const u=Ie(l,c);if(!u){const h={channelCount:l.channelCount,channelCountMode:l.channelCountMode,channelInterpretation:l.channelInterpretation,pan:l.pan.value};l=t(c,h)}return r.set(c,l),u?await s(c,o.pan,l.pan):await n(c,o.pan,l.pan),ws(l)?await i(o,c,l.inputs[0]):await i(o,c,l),l};return{render(o,c){const l=r.get(c);return l!==void 0?Promise.resolve(l):a(o,c)}}},mm=s=>()=>{if(s===null)return!1;try{new s({length:1,sampleRate:44100})}catch{return!1}return!0},gm=(s,t)=>async()=>{if(s===null)return!0;if(t===null)return!1;const e=new Blob(['class A extends AudioWorkletProcessor{process(i){this.port.postMessage(i,[i[0][0].buffer])}}registerProcessor("a",A)'],{type:"application/javascript; charset=utf-8"}),n=new t(1,128,44100),i=URL.createObjectURL(e);let r=!1,a=!1;try{await n.audioWorklet.addModule(i);const o=new s(n,"a",{numberOfOutputs:0}),c=n.createOscillator();o.port.onmessage=()=>r=!0,o.onprocessorerror=()=>a=!0,c.connect(o),c.start(0),await n.startRendering(),await new Promise(l=>setTimeout(l))}catch{}finally{URL.revokeObjectURL(i)}return r&&!a},_m=(s,t)=>()=>{if(t===null)return Promise.resolve(!1);const e=new t(1,1,44100),n=s(e,{channelCount:1,channelCountMode:"explicit",channelInterpretation:"discrete",gain:0});return new Promise(i=>{e.oncomplete=()=>{n.disconnect(),i(e.currentTime!==0)},e.startRendering()})},vm=()=>new DOMException("","UnknownError"),xm={channelCount:2,channelCountMode:"max",channelInterpretation:"speakers",curve:null,oversample:"none"},ym=(s,t,e,n,i,r,a)=>class extends s{constructor(c,l){const u=i(c),h={...xm,...l},f=e(u,h),g=r(u)?n():null;super(c,!0,f,g),this._isCurveNullified=!1,this._nativeWaveShaperNode=f,a(this,1)}get curve(){return this._isCurveNullified?null:this._nativeWaveShaperNode.curve}set curve(c){if(c===null)this._isCurveNullified=!0,this._nativeWaveShaperNode.curve=new Float32Array([0,0]);else{if(c.length<2)throw t();this._isCurveNullified=!1,this._nativeWaveShaperNode.curve=c}}get oversample(){return this._nativeWaveShaperNode.oversample}set oversample(c){this._nativeWaveShaperNode.oversample=c}},Sm=(s,t,e)=>()=>{const n=new WeakMap,i=async(r,a)=>{let o=t(r);if(!Ie(o,a)){const l={channelCount:o.channelCount,channelCountMode:o.channelCountMode,channelInterpretation:o.channelInterpretation,curve:o.curve,oversample:o.oversample};o=s(a,l)}return n.set(a,o),ws(o)?await e(r,a,o.inputs[0]):await e(r,a,o),o};return{render(r,a){const o=n.get(a);return o!==void 0?Promise.resolve(o):i(r,a)}}},Mm=()=>typeof window>"u"?null:window,bm=(s,t)=>e=>{e.copyFromChannel=(n,i,r=0)=>{const a=s(r),o=s(i);if(o>=e.numberOfChannels)throw t();const c=e.length,l=e.getChannelData(o),u=n.length;for(let h=a<0?-a:0;h+a<c&&h<u;h+=1)n[h]=l[h+a]},e.copyToChannel=(n,i,r=0)=>{const a=s(r),o=s(i);if(o>=e.numberOfChannels)throw t();const c=e.length,l=e.getChannelData(o),u=n.length;for(let h=a<0?-a:0;h+a<c&&h<u;h+=1)l[h+a]=n[h]}},wm=s=>t=>{t.copyFromChannel=(e=>(n,i,r=0)=>{const a=s(r),o=s(i);if(a<t.length)return e.call(t,n,o,a)})(t.copyFromChannel),t.copyToChannel=(e=>(n,i,r=0)=>{const a=s(r),o=s(i);if(a<t.length)return e.call(t,n,o,a)})(t.copyToChannel)},Tm=s=>(t,e)=>{const n=e.createBuffer(1,1,44100);t.buffer===null&&(t.buffer=n),s(t,"buffer",i=>()=>{const r=i.call(t);return r===n?null:r},i=>r=>i.call(t,r===null?n:r))},Em=(s,t)=>(e,n)=>{n.channelCount=1,n.channelCountMode="explicit",Object.defineProperty(n,"channelCount",{get:()=>1,set:()=>{throw s()}}),Object.defineProperty(n,"channelCountMode",{get:()=>"explicit",set:()=>{throw s()}});const i=e.createBufferSource();t(n,()=>{const o=n.numberOfInputs;for(let c=0;c<o;c+=1)i.connect(n,0,c)},()=>i.disconnect(n))},Mu=(s,t,e)=>s.copyFromChannel===void 0?s.getChannelData(e)[0]:(s.copyFromChannel(t,e),t[0]),bu=s=>{if(s===null)return!1;const t=s.length;return t%2!==0?s[Math.floor(t/2)]!==0:s[t/2-1]+s[t/2]!==0},ur=(s,t,e,n)=>{let i=s;for(;!i.hasOwnProperty(t);)i=Object.getPrototypeOf(i);const{get:r,set:a}=Object.getOwnPropertyDescriptor(i,t);Object.defineProperty(s,t,{get:e(r),set:n(a)})},Am=s=>({...s,outputChannelCount:s.outputChannelCount!==void 0?s.outputChannelCount:s.numberOfInputs===1&&s.numberOfOutputs===1?[s.channelCount]:Array.from({length:s.numberOfOutputs},()=>1)}),Cm=s=>({...s,channelCount:s.numberOfOutputs}),Rm=s=>{const{imag:t,real:e}=s;return t===void 0?e===void 0?{...s,imag:[0,0],real:[0,0]}:{...s,imag:Array.from(e,()=>0),real:e}:e===void 0?{...s,imag:t,real:Array.from(t,()=>0)}:{...s,imag:t,real:e}},wu=(s,t,e)=>{try{s.setValueAtTime(t,e)}catch(n){if(n.code!==9)throw n;wu(s,t,e+1e-7)}},Dm=s=>{const t=s.createBufferSource();t.start();try{t.start()}catch{return!0}return!1},Pm=s=>{const t=s.createBufferSource(),e=s.createBuffer(1,1,44100);t.buffer=e;try{t.start(0,1)}catch{return!1}return!0},Lm=s=>{const t=s.createBufferSource();t.start();try{t.stop()}catch{return!1}return!0},Ya=s=>{const t=s.createOscillator();try{t.start(-1)}catch(e){return e instanceof RangeError}return!1},Tu=s=>{const t=s.createBuffer(1,1,44100),e=s.createBufferSource();e.buffer=t,e.start(),e.stop();try{return e.stop(),!0}catch{return!1}},$a=s=>{const t=s.createOscillator();try{t.stop(-1)}catch(e){return e instanceof RangeError}return!1},Im=s=>{const{port1:t,port2:e}=new MessageChannel;try{t.postMessage(s)}finally{t.close(),e.close()}},Nm=s=>{s.start=(t=>(e=0,n=0,i)=>{const r=s.buffer,a=r===null?n:Math.min(r.duration,n);r!==null&&a>r.duration-.5/s.context.sampleRate?t.call(s,e,0,0):t.call(s,e,a,i)})(s.start)},Eu=(s,t)=>{const e=t.createGain();s.connect(e);const n=(i=>()=>{i.call(s,e),s.removeEventListener("ended",n)})(s.disconnect);s.addEventListener("ended",n),Ts(s,e),s.stop=(i=>{let r=!1;return(a=0)=>{if(r)try{i.call(s,a)}catch{e.gain.setValueAtTime(0,a)}else i.call(s,a),r=!0}})(s.stop)},Es=(s,t)=>e=>{const n={value:s};return Object.defineProperties(e,{currentTarget:n,target:n}),typeof t=="function"?t.call(s,e):t.handleEvent.call(s,e)},Om=td(Vi),km=od(Vi),Um=xf(xo),Au=new WeakMap,Fm=Uf(Au),yn=Yd(new Map,new WeakMap),Rn=Mm(),Cu=fp(yn,Dn),Za=kf(Ve),Ce=om(Ve,Za,Di),Vm=hd(Cu,ne,Ce),Jt=zf(vo),Yn=zp(Rn),Yt=ip(Yn),Ru=new WeakMap,Du=Rf(Es),hr=_p(Rn),Ka=Qf(hr),Ja=tp(Rn),Pu=ep(Rn),Ws=xp(Rn),pe=kd(ed(su),rd(Om,km,no,Um,io,Ve,Fm,sr,ne,Vi,Hn,Di,$r),yn,Yf(ya,io,Ve,ne,Bs,Hn),Dn,yo,Be,mf(no,ya,Ve,ne,Bs,Jt,Hn,Yt),Mf(Ru,Ve,vn),Du,Jt,Ka,Ja,Pu,Yt,Ws),zm=ud(pe,Vm,Dn,Cu,Jt,Yt),Qa=new WeakSet,Oc=pp(Rn),Lu=cf(new Uint32Array(1)),tc=bm(Lu,Dn),ec=wm(Lu),Bm=fd(Qa,yn,Be,Oc,Yn,mm(Oc),tc,ec),So=ad(Xe),Iu=am(Za,or,Di),Pn=ef(Iu),As=gp(So,yn,Dm,Pm,Lm,Ya,Tu,$a,Nm,Tm(ur),Eu),Ln=rm(Ff(or),Iu),Gm=gd(Pn,As,ne,Ln,Ce),Sn=Ud(nd(ru),Ru,Ga,Fd,Yh,$h,Zh,Kh,Jh,_a,nu,hr,wu),Wm=md(pe,Gm,Sn,we,As,Jt,Yt,Es),Hm=Td(pe,Ed,Dn,we,vp(Xe,ur),Jt,Yt,Ce),qm=jd(Pn,xu,ne,Ln,Ce),zi=um(Au),Xm=Xd(pe,Sn,qm,yo,xu,Jt,Yt,zi),di=hp(Vi,Ja),jm=Em(we,di),fi=Ep(hr,jm),Ym=Kd(fi,ne,Ce),$m=Zd(pe,Ym,fi,Jt,Yt),Zm=tf(cr,ne,Ce),Km=Qd(pe,Zm,cr,Jt,Yt,Cm),Jm=Rp(So,As,Xe,di),Cs=Cp(So,yn,Jm,Ya,$a),Qm=af(Pn,Cs,ne,Ln,Ce),tg=of(pe,Sn,Qm,Cs,Jt,Yt,Es),Nu=Dp(Be,ur),eg=hf(Nu,ne,Ce),ng=uf(pe,eg,Nu,Jt,Yt,zi),ig=vf(Pn,yu,ne,Ln,Ce),sg=_f(pe,Sn,ig,yu,Jt,Yt,zi),Ou=Pp(Be),rg=Ef(Pn,Ou,ne,Ln,Ce),og=Tf(pe,Sn,rg,Ou,Be,Jt,Yt,zi),ag=Nf(Pn,Xe,ne,Ln,Ce),cg=If(pe,Sn,ag,Xe,Jt,Yt),lg=Op(yo,we,lr,Be),Mo=cm(yn,Xe,lr,_m(Xe,Yn)),ug=jf(As,ne,Yn,Ce,Mo),hg=Lp(lg),dg=qf(pe,hg,ug,Jt,Yt,zi),fg=Ad(Sn,fi,Cs,lr,Be,Mu,Yt,ur),ku=new WeakMap,pg=up(Hm,fg,Du,Yt,ku,Es),Uu=Bp(So,yn,Ya,Tu,$a,Eu),mg=Qp(Pn,Uu,ne,Ln,Ce),gg=Jp(pe,Sn,Uu,mg,Jt,Yt,Es),Fu=sf(As),_g=Yp(Fu,we,Xe,bu,di),bo=jp(Fu,we,_g,bu,di,hr,ur),vg=Wp(no,we,fi,Xe,lr,bo,Be,io,Mu,di),Vu=Gp(vg),xg=nm(Pn,fi,Cs,Xe,Vu,ne,Yn,Ln,Ce,Mo),yg=em(pe,Sn,Vu,xg,Jt,Yt,zi),Sg=Hp(Dn),Mg=sm(Sg,Jt,new WeakSet,Rm),bg=Xp(fi,cr,Xe,bo,Be,di),zu=qp(bg,Be),wg=pm(Pn,zu,ne,Ln,Ce),Tg=fm(pe,Sn,zu,wg,Jt,Yt),Eg=Sm(bo,ne,Ce),Ag=ym(pe,we,bo,Eg,Jt,Yt,zi),Bu=sp(Rn),nc=Df(Rn),Gu=new WeakMap,Cg=Bf(Gu,Yn),Rg=Bu?sd(yn,Be,Cf(Rn),nc,Pf(Qh),Jt,Cg,Yt,Ws,new WeakMap,new WeakMap,gm(Ws,Yn),Rn):void 0,Dg=np(Ka,Yt),Pg=pf(Qa,yn,ff,Af,new WeakSet,Jt,Dg,to,Gs,tc,ec),Wu=Hd(Rg,zm,Bm,Wm,Xm,$m,Km,tg,ng,Pg,sg,og,cg,dg,pg,gg,yg,Mg,Tg,Ag),Lg=rp(pe,kp,Jt,Yt),Ig=ap(pe,Up,Jt,Yt),Ng=cp(pe,Fp,Jt,Yt),Og=Vp(we,Yt),kg=lp(pe,Og,Jt),Ug=wd(Wu,we,Be,vm,Lg,Ig,Ng,kg,hr),ic=Gf(ku),Fg=cd(ic),Hu=nf(Dn),Vg=yf(ic),qu=bf(Dn),Xu=new WeakMap,zg=Of(Xu,vn),Bg=Tp(Hu,Dn,we,fi,cr,Cs,Xe,lr,Be,qu,nc,zg,di),Gg=Sp(we,Bg,Xe,Be,di),Wg=Wd(Pn,Hu,As,fi,cr,Cs,Xe,Vg,qu,nc,ne,Ws,Yn,Ln,Ce,Mo),Hg=Vf(Gu),qg=lm(Xu),kc=Bu?zd(Fg,pe,Sn,Wg,Gg,Ve,Hg,Jt,Yt,Ws,Am,qg,Im,Es):void 0,Xg=df(Be,Yn),jg=hm(Qa,yn,Za,ic,Mo,to,tc,ec),Yg=Zp(Wu,yn,we,Xg,jg),$g=$f(vo,Ka),Zg=Zf(Ba,Ja),Kg=Kf(Ga,Pu),Jg=Jf(vo,Yt);function Pt(s,t){if(!s)throw new Error(t)}function ai(s,t,e=1/0){if(!(t<=s&&s<=e))throw new RangeError(`Value must be within [${t}, ${e}], got: ${s}`)}function ju(s){!s.isOffline&&s.state!=="running"&&$u('The AudioContext is "suspended". Invoke Tone.start() from a user action to start the audio.')}let Yu=console;function Qg(...s){Yu.log(...s)}function $u(...s){Yu.warn(...s)}function Je(s){return typeof s>"u"}function Nt(s){return!Je(s)}function t_(s){return typeof s=="function"}function Xn(s){return typeof s=="number"}function si(s){return Object.prototype.toString.call(s)==="[object Object]"&&s.constructor===Object}function Zu(s){return typeof s=="boolean"}function He(s){return Array.isArray(s)}function xn(s){return typeof s=="string"}function Mr(s){return xn(s)&&/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i.test(s)}function e_(s){return new Ug(s)}function n_(s,t,e){return new Yg(s,t,e)}const Ai=typeof self=="object"?self:null,i_=Ai&&(Ai.hasOwnProperty("AudioContext")||Ai.hasOwnProperty("webkitAudioContext"));function s_(s,t,e){return Pt(Nt(kc),"This node only works in a secure context (https or localhost)"),new kc(s,t,e)}function Mn(s,t,e,n){var i=arguments.length,r=i<3?t:n===null?n=Object.getOwnPropertyDescriptor(t,e):n,a;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")r=Reflect.decorate(s,t,e,n);else for(var o=s.length-1;o>=0;o--)(a=s[o])&&(r=(i<3?a(r):i>3?a(t,e,r):a(t,e))||r);return i>3&&r&&Object.defineProperty(t,e,r),r}function _e(s,t,e,n){function i(r){return r instanceof e?r:new e(function(a){a(r)})}return new(e||(e=Promise))(function(r,a){function o(u){try{l(n.next(u))}catch(h){a(h)}}function c(u){try{l(n.throw(u))}catch(h){a(h)}}function l(u){u.done?r(u.value):i(u.value).then(o,c)}l((n=n.apply(s,t||[])).next())})}class r_{constructor(t,e,n){this._callback=t,this._type=e,this._updateInterval=n,this._createClock()}_createWorker(){const t=new Blob([`
			// the initial timeout time
			let timeoutTime =  ${(this._updateInterval*1e3).toFixed(1)};
			// onmessage callback
			self.onmessage = function(msg){
				timeoutTime = parseInt(msg.data);
			};
			// the tick function which posts a message
			// and schedules a new tick
			function tick(){
				setTimeout(tick, timeoutTime);
				self.postMessage('tick');
			}
			// call tick initially
			tick();
			`],{type:"text/javascript"}),e=URL.createObjectURL(t),n=new Worker(e);n.onmessage=this._callback.bind(this),this._worker=n}_createTimeout(){this._timeout=setTimeout(()=>{this._createTimeout(),this._callback()},this._updateInterval*1e3)}_createClock(){if(this._type==="worker")try{this._createWorker()}catch{this._type="timeout",this._createClock()}else this._type==="timeout"&&this._createTimeout()}_disposeClock(){this._timeout&&(clearTimeout(this._timeout),this._timeout=0),this._worker&&(this._worker.terminate(),this._worker.onmessage=null)}get updateInterval(){return this._updateInterval}set updateInterval(t){this._updateInterval=Math.max(t,128/44100),this._type==="worker"&&this._worker.postMessage(Math.max(t*1e3,1))}get type(){return this._type}set type(t){this._disposeClock(),this._type=t,this._createClock()}dispose(){this._disposeClock()}}function Pi(s){return Kg(s)}function ri(s){return Zg(s)}function Zr(s){return Jg(s)}function rs(s){return $g(s)}function Ku(s){return s instanceof AudioBuffer}function o_(s,t){return s==="value"||Pi(t)||ri(t)||Ku(t)}function ls(s,...t){if(!t.length)return s;const e=t.shift();if(si(s)&&si(e))for(const n in e)o_(n,e[n])?s[n]=e[n]:si(e[n])?(s[n]||Object.assign(s,{[n]:{}}),ls(s[n],e[n])):Object.assign(s,{[n]:e[n]});return ls(s,...t)}function a_(s,t){return s.length===t.length&&s.every((e,n)=>t[n]===e)}function lt(s,t,e=[],n){const i={},r=Array.from(t);if(si(r[0])&&n&&!Reflect.has(r[0],n)&&(Object.keys(r[0]).some(o=>Reflect.has(s,o))||(ls(i,{[n]:r[0]}),e.splice(e.indexOf(n),1),r.shift())),r.length===1&&si(r[0]))ls(i,r[0]);else for(let a=0;a<e.length;a++)Nt(r[a])&&(i[e[a]]=r[a]);return ls(s,i)}function c_(s){return s.constructor.getDefaults()}function An(s,t){return Je(s)?t:s}function Ta(s,t){return t.forEach(e=>{Reflect.has(s,e)&&delete s[e]}),s}/**
 * Tone.js
 * @author Yotam Mann
 * @license http://opensource.org/licenses/MIT MIT License
 * @copyright 2014-2019 Yotam Mann
 */class $n{constructor(){this.debug=!1,this._wasDisposed=!1}static getDefaults(){return{}}log(...t){(this.debug||Ai&&this.toString()===Ai.TONE_DEBUG_CLASS)&&Qg(this,...t)}dispose(){return this._wasDisposed=!0,this}get disposed(){return this._wasDisposed}toString(){return this.name}}$n.version=eu;const sc=1e-6;function ao(s,t){return s>t+sc}function Ea(s,t){return ao(s,t)||pn(s,t)}function Ju(s,t){return s+sc<t}function pn(s,t){return Math.abs(s-t)<sc}function l_(s,t,e){return Math.max(Math.min(s,e),t)}class In extends $n{constructor(){super(),this.name="Timeline",this._timeline=[];const t=lt(In.getDefaults(),arguments,["memory"]);this.memory=t.memory,this.increasing=t.increasing}static getDefaults(){return{memory:1/0,increasing:!1}}get length(){return this._timeline.length}add(t){if(Pt(Reflect.has(t,"time"),"Timeline: events must have a time attribute"),t.time=t.time.valueOf(),this.increasing&&this.length){const e=this._timeline[this.length-1];Pt(Ea(t.time,e.time),"The time must be greater than or equal to the last scheduled time"),this._timeline.push(t)}else{const e=this._search(t.time);this._timeline.splice(e+1,0,t)}if(this.length>this.memory){const e=this.length-this.memory;this._timeline.splice(0,e)}return this}remove(t){const e=this._timeline.indexOf(t);return e!==-1&&this._timeline.splice(e,1),this}get(t,e="time"){const n=this._search(t,e);return n!==-1?this._timeline[n]:null}peek(){return this._timeline[0]}shift(){return this._timeline.shift()}getAfter(t,e="time"){const n=this._search(t,e);return n+1<this._timeline.length?this._timeline[n+1]:null}getBefore(t){const e=this._timeline.length;if(e>0&&this._timeline[e-1].time<t)return this._timeline[e-1];const n=this._search(t);return n-1>=0?this._timeline[n-1]:null}cancel(t){if(this._timeline.length>1){let e=this._search(t);if(e>=0)if(pn(this._timeline[e].time,t)){for(let n=e;n>=0&&pn(this._timeline[n].time,t);n--)e=n;this._timeline=this._timeline.slice(0,e)}else this._timeline=this._timeline.slice(0,e+1);else this._timeline=[]}else this._timeline.length===1&&Ea(this._timeline[0].time,t)&&(this._timeline=[]);return this}cancelBefore(t){const e=this._search(t);return e>=0&&(this._timeline=this._timeline.slice(e+1)),this}previousEvent(t){const e=this._timeline.indexOf(t);return e>0?this._timeline[e-1]:null}_search(t,e="time"){if(this._timeline.length===0)return-1;let n=0;const i=this._timeline.length;let r=i;if(i>0&&this._timeline[i-1][e]<=t)return i-1;for(;n<r;){let a=Math.floor(n+(r-n)/2);const o=this._timeline[a],c=this._timeline[a+1];if(pn(o[e],t)){for(let l=a;l<this._timeline.length;l++){const u=this._timeline[l];if(pn(u[e],t))a=l;else break}return a}else{if(Ju(o[e],t)&&ao(c[e],t))return a;ao(o[e],t)?r=a:n=a+1}}return-1}_iterate(t,e=0,n=this._timeline.length-1){this._timeline.slice(e,n+1).forEach(t)}forEach(t){return this._iterate(t),this}forEachBefore(t,e){const n=this._search(t);return n!==-1&&this._iterate(e,0,n),this}forEachAfter(t,e){const n=this._search(t);return this._iterate(e,n+1),this}forEachBetween(t,e,n){let i=this._search(t),r=this._search(e);return i!==-1&&r!==-1?(this._timeline[i].time!==t&&(i+=1),this._timeline[r].time===e&&(r-=1),this._iterate(n,i,r)):i===-1&&this._iterate(n,0,r),this}forEachFrom(t,e){let n=this._search(t);for(;n>=0&&this._timeline[n].time>=t;)n--;return this._iterate(e,n+1),this}forEachAtTime(t,e){const n=this._search(t);if(n!==-1&&pn(this._timeline[n].time,t)){let i=n;for(let r=n;r>=0&&pn(this._timeline[r].time,t);r--)i=r;this._iterate(r=>{e(r)},i,n)}return this}dispose(){return super.dispose(),this._timeline=[],this}}const Qu=[];function wo(s){Qu.push(s)}function u_(s){Qu.forEach(t=>t(s))}const th=[];function To(s){th.push(s)}function h_(s){th.forEach(t=>t(s))}class dr extends $n{constructor(){super(...arguments),this.name="Emitter"}on(t,e){return t.split(/\W+/).forEach(i=>{Je(this._events)&&(this._events={}),this._events.hasOwnProperty(i)||(this._events[i]=[]),this._events[i].push(e)}),this}once(t,e){const n=(...i)=>{e(...i),this.off(t,n)};return this.on(t,n),this}off(t,e){return t.split(/\W+/).forEach(i=>{if(Je(this._events)&&(this._events={}),this._events.hasOwnProperty(t))if(Je(e))this._events[t]=[];else{const r=this._events[t];for(let a=r.length-1;a>=0;a--)r[a]===e&&r.splice(a,1)}}),this}emit(t,...e){if(this._events&&this._events.hasOwnProperty(t)){const n=this._events[t].slice(0);for(let i=0,r=n.length;i<r;i++)n[i].apply(this,e)}return this}static mixin(t){["on","once","off","emit"].forEach(e=>{const n=Object.getOwnPropertyDescriptor(dr.prototype,e);Object.defineProperty(t.prototype,e,n)})}dispose(){return super.dispose(),this._events=void 0,this}}class eh extends dr{constructor(){super(...arguments),this.isOffline=!1}toJSON(){return{}}}class fr extends eh{constructor(){super(),this.name="Context",this._constants=new Map,this._timeouts=new In,this._timeoutIds=0,this._initialized=!1,this.isOffline=!1,this._workletModules=new Map;const t=lt(fr.getDefaults(),arguments,["context"]);t.context?this._context=t.context:this._context=e_({latencyHint:t.latencyHint}),this._ticker=new r_(this.emit.bind(this,"tick"),t.clockSource,t.updateInterval),this.on("tick",this._timeoutLoop.bind(this)),this._context.onstatechange=()=>{this.emit("statechange",this.state)},this._setLatencyHint(t.latencyHint),this.lookAhead=t.lookAhead}static getDefaults(){return{clockSource:"worker",latencyHint:"interactive",lookAhead:.1,updateInterval:.05}}initialize(){return this._initialized||(u_(this),this._initialized=!0),this}createAnalyser(){return this._context.createAnalyser()}createOscillator(){return this._context.createOscillator()}createBufferSource(){return this._context.createBufferSource()}createBiquadFilter(){return this._context.createBiquadFilter()}createBuffer(t,e,n){return this._context.createBuffer(t,e,n)}createChannelMerger(t){return this._context.createChannelMerger(t)}createChannelSplitter(t){return this._context.createChannelSplitter(t)}createConstantSource(){return this._context.createConstantSource()}createConvolver(){return this._context.createConvolver()}createDelay(t){return this._context.createDelay(t)}createDynamicsCompressor(){return this._context.createDynamicsCompressor()}createGain(){return this._context.createGain()}createIIRFilter(t,e){return this._context.createIIRFilter(t,e)}createPanner(){return this._context.createPanner()}createPeriodicWave(t,e,n){return this._context.createPeriodicWave(t,e,n)}createStereoPanner(){return this._context.createStereoPanner()}createWaveShaper(){return this._context.createWaveShaper()}createMediaStreamSource(t){return Pt(rs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamSource(t)}createMediaElementSource(t){return Pt(rs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaElementSource(t)}createMediaStreamDestination(){return Pt(rs(this._context),"Not available if OfflineAudioContext"),this._context.createMediaStreamDestination()}decodeAudioData(t){return this._context.decodeAudioData(t)}get currentTime(){return this._context.currentTime}get state(){return this._context.state}get sampleRate(){return this._context.sampleRate}get listener(){return this.initialize(),this._listener}set listener(t){Pt(!this._initialized,"The listener cannot be set after initialization."),this._listener=t}get transport(){return this.initialize(),this._transport}set transport(t){Pt(!this._initialized,"The transport cannot be set after initialization."),this._transport=t}get draw(){return this.initialize(),this._draw}set draw(t){Pt(!this._initialized,"Draw cannot be set after initialization."),this._draw=t}get destination(){return this.initialize(),this._destination}set destination(t){Pt(!this._initialized,"The destination cannot be set after initialization."),this._destination=t}createAudioWorkletNode(t,e){return s_(this.rawContext,t,e)}addAudioWorkletModule(t,e){return _e(this,void 0,void 0,function*(){Pt(Nt(this.rawContext.audioWorklet),"AudioWorkletNode is only available in a secure context (https or localhost)"),this._workletModules.has(e)||this._workletModules.set(e,this.rawContext.audioWorklet.addModule(t)),yield this._workletModules.get(e)})}workletsAreReady(){return _e(this,void 0,void 0,function*(){const t=[];this._workletModules.forEach(e=>t.push(e)),yield Promise.all(t)})}get updateInterval(){return this._ticker.updateInterval}set updateInterval(t){this._ticker.updateInterval=t}get clockSource(){return this._ticker.type}set clockSource(t){this._ticker.type=t}get latencyHint(){return this._latencyHint}_setLatencyHint(t){let e=0;if(this._latencyHint=t,xn(t))switch(t){case"interactive":e=.1;break;case"playback":e=.5;break;case"balanced":e=.25;break}this.lookAhead=e,this.updateInterval=e/2}get rawContext(){return this._context}now(){return this._context.currentTime+this.lookAhead}immediate(){return this._context.currentTime}resume(){return rs(this._context)?this._context.resume():Promise.resolve()}close(){return _e(this,void 0,void 0,function*(){rs(this._context)&&(yield this._context.close()),this._initialized&&h_(this)})}getConstant(t){if(this._constants.has(t))return this._constants.get(t);{const e=this._context.createBuffer(1,128,this._context.sampleRate),n=e.getChannelData(0);for(let r=0;r<n.length;r++)n[r]=t;const i=this._context.createBufferSource();return i.channelCount=1,i.channelCountMode="explicit",i.buffer=e,i.loop=!0,i.start(0),this._constants.set(t,i),i}}dispose(){return super.dispose(),this._ticker.dispose(),this._timeouts.dispose(),Object.keys(this._constants).map(t=>this._constants[t].disconnect()),this}_timeoutLoop(){const t=this.now();let e=this._timeouts.peek();for(;this._timeouts.length&&e&&e.time<=t;)e.callback(),this._timeouts.shift(),e=this._timeouts.peek()}setTimeout(t,e){this._timeoutIds++;const n=this.now();return this._timeouts.add({callback:t,id:this._timeoutIds,time:n+e}),this._timeoutIds}clearTimeout(t){return this._timeouts.forEach(e=>{e.id===t&&this._timeouts.remove(e)}),this}clearInterval(t){return this.clearTimeout(t)}setInterval(t,e){const n=++this._timeoutIds,i=()=>{const r=this.now();this._timeouts.add({callback:()=>{t(),i()},id:n,time:r+e})};return i(),n}}class d_ extends eh{constructor(){super(...arguments),this.lookAhead=0,this.latencyHint=0,this.isOffline=!1}createAnalyser(){return{}}createOscillator(){return{}}createBufferSource(){return{}}createBiquadFilter(){return{}}createBuffer(t,e,n){return{}}createChannelMerger(t){return{}}createChannelSplitter(t){return{}}createConstantSource(){return{}}createConvolver(){return{}}createDelay(t){return{}}createDynamicsCompressor(){return{}}createGain(){return{}}createIIRFilter(t,e){return{}}createPanner(){return{}}createPeriodicWave(t,e,n){return{}}createStereoPanner(){return{}}createWaveShaper(){return{}}createMediaStreamSource(t){return{}}createMediaElementSource(t){return{}}createMediaStreamDestination(){return{}}decodeAudioData(t){return Promise.resolve({})}createAudioWorkletNode(t,e){return{}}get rawContext(){return{}}addAudioWorkletModule(t,e){return _e(this,void 0,void 0,function*(){return Promise.resolve()})}resume(){return Promise.resolve()}setTimeout(t,e){return 0}clearTimeout(t){return this}setInterval(t,e){return 0}clearInterval(t){return this}getConstant(t){return{}}get currentTime(){return 0}get state(){return{}}get sampleRate(){return 0}get listener(){return{}}get transport(){return{}}get draw(){return{}}set draw(t){}get destination(){return{}}set destination(t){}now(){return 0}immediate(){return 0}}function le(s,t){He(t)?t.forEach(e=>le(s,e)):Object.defineProperty(s,t,{enumerable:!0,writable:!1})}function nh(s,t){He(t)?t.forEach(e=>nh(s,e)):Object.defineProperty(s,t,{writable:!0})}const jt=()=>{};class Kt extends $n{constructor(){super(),this.name="ToneAudioBuffer",this.onload=jt;const t=lt(Kt.getDefaults(),arguments,["url","onload","onerror"]);this.reverse=t.reverse,this.onload=t.onload,t.url&&Ku(t.url)||t.url instanceof Kt?this.set(t.url):xn(t.url)&&this.load(t.url).catch(t.onerror)}static getDefaults(){return{onerror:jt,onload:jt,reverse:!1}}get sampleRate(){return this._buffer?this._buffer.sampleRate:an().sampleRate}set(t){return t instanceof Kt?t.loaded?this._buffer=t.get():t.onload=()=>{this.set(t),this.onload(this)}:this._buffer=t,this._reversed&&this._reverse(),this}get(){return this._buffer}load(t){return _e(this,void 0,void 0,function*(){const e=Kt.load(t).then(n=>{this.set(n),this.onload(this)});Kt.downloads.push(e);try{yield e}finally{const n=Kt.downloads.indexOf(e);Kt.downloads.splice(n,1)}return this})}dispose(){return super.dispose(),this._buffer=void 0,this}fromArray(t){const e=He(t)&&t[0].length>0,n=e?t.length:1,i=e?t[0].length:t.length,r=an(),a=r.createBuffer(n,i,r.sampleRate),o=!e&&n===1?[t]:t;for(let c=0;c<n;c++)a.copyToChannel(o[c],c);return this._buffer=a,this}toMono(t){if(Xn(t))this.fromArray(this.toArray(t));else{let e=new Float32Array(this.length);const n=this.numberOfChannels;for(let i=0;i<n;i++){const r=this.toArray(i);for(let a=0;a<r.length;a++)e[a]+=r[a]}e=e.map(i=>i/n),this.fromArray(e)}return this}toArray(t){if(Xn(t))return this.getChannelData(t);if(this.numberOfChannels===1)return this.toArray(0);{const e=[];for(let n=0;n<this.numberOfChannels;n++)e[n]=this.getChannelData(n);return e}}getChannelData(t){return this._buffer?this._buffer.getChannelData(t):new Float32Array(0)}slice(t,e=this.duration){const n=Math.floor(t*this.sampleRate),i=Math.floor(e*this.sampleRate);Pt(n<i,"The start time must be less than the end time");const r=i-n,a=an().createBuffer(this.numberOfChannels,r,this.sampleRate);for(let o=0;o<this.numberOfChannels;o++)a.copyToChannel(this.getChannelData(o).subarray(n,i),o);return new Kt(a)}_reverse(){if(this.loaded)for(let t=0;t<this.numberOfChannels;t++)this.getChannelData(t).reverse();return this}get loaded(){return this.length>0}get duration(){return this._buffer?this._buffer.duration:0}get length(){return this._buffer?this._buffer.length:0}get numberOfChannels(){return this._buffer?this._buffer.numberOfChannels:0}get reverse(){return this._reversed}set reverse(t){this._reversed!==t&&(this._reversed=t,this._reverse())}static fromArray(t){return new Kt().fromArray(t)}static fromUrl(t){return _e(this,void 0,void 0,function*(){return yield new Kt().load(t)})}static load(t){return _e(this,void 0,void 0,function*(){const e=t.match(/\[([^\]\[]+\|.+)\]$/);if(e){const o=e[1].split("|");let c=o[0];for(const l of o)if(Kt.supportsType(l)){c=l;break}t=t.replace(e[0],c)}const n=Kt.baseUrl===""||Kt.baseUrl.endsWith("/")?Kt.baseUrl:Kt.baseUrl+"/",i=yield fetch(n+t);if(!i.ok)throw new Error(`could not load url: ${t}`);const r=yield i.arrayBuffer();return yield an().decodeAudioData(r)})}static supportsType(t){const e=t.split("."),n=e[e.length-1];return document.createElement("audio").canPlayType("audio/"+n)!==""}static loaded(){return _e(this,void 0,void 0,function*(){for(yield Promise.resolve();Kt.downloads.length;)yield Kt.downloads[0]})}}Kt.baseUrl="";Kt.downloads=[];class rc extends fr{constructor(){super({clockSource:"offline",context:Zr(arguments[0])?arguments[0]:n_(arguments[0],arguments[1]*arguments[2],arguments[2]),lookAhead:0,updateInterval:Zr(arguments[0])?128/arguments[0].sampleRate:128/arguments[2]}),this.name="OfflineContext",this._currentTime=0,this.isOffline=!0,this._duration=Zr(arguments[0])?arguments[0].length/arguments[0].sampleRate:arguments[1]}now(){return this._currentTime}get currentTime(){return this._currentTime}_renderClock(t){return _e(this,void 0,void 0,function*(){let e=0;for(;this._duration-this._currentTime>=0;){this.emit("tick"),this._currentTime+=128/this.sampleRate,e++;const n=Math.floor(this.sampleRate/128);t&&e%n===0&&(yield new Promise(i=>setTimeout(i,1)))}})}render(t=!0){return _e(this,void 0,void 0,function*(){yield this.workletsAreReady(),yield this._renderClock(t);const e=yield this._context.startRendering();return new Kt(e)})}close(){return Promise.resolve()}}const ih=new d_;let us=ih;function an(){return us===ih&&i_&&f_(new fr),us}function f_(s){rs(s)?us=new fr(s):Zr(s)?us=new rc(s):us=s}function p_(){return us.resume()}if(Ai&&!Ai.TONE_SILENCE_LOGGING){const t=` * Tone.js v${eu} * `;console.log(`%c${t}`,"background: #000; color: #fff")}function m_(s){return Math.pow(10,s/20)}function g_(s){return 20*(Math.log(s)/Math.LN10)}function sh(s){return Math.pow(2,s/12)}let Eo=440;function __(){return Eo}function v_(s){Eo=s}function Aa(s){return Math.round(rh(s))}function rh(s){return 69+12*Math.log2(s/Eo)}function x_(s){return Eo*Math.pow(2,(s-69)/12)}class oc extends $n{constructor(t,e,n){super(),this.defaultUnits="s",this._val=e,this._units=n,this.context=t,this._expressions=this._getExpressions()}_getExpressions(){return{hz:{method:t=>this._frequencyToUnits(parseFloat(t)),regexp:/^(\d+(?:\.\d+)?)hz$/i},i:{method:t=>this._ticksToUnits(parseInt(t,10)),regexp:/^(\d+)i$/i},m:{method:t=>this._beatsToUnits(parseInt(t,10)*this._getTimeSignature()),regexp:/^(\d+)m$/i},n:{method:(t,e)=>{const n=parseInt(t,10),i=e==="."?1.5:1;return n===1?this._beatsToUnits(this._getTimeSignature())*i:this._beatsToUnits(4/n)*i},regexp:/^(\d+)n(\.?)$/i},number:{method:t=>this._expressions[this.defaultUnits].method.call(this,t),regexp:/^(\d+(?:\.\d+)?)$/},s:{method:t=>this._secondsToUnits(parseFloat(t)),regexp:/^(\d+(?:\.\d+)?)s$/},samples:{method:t=>parseInt(t,10)/this.context.sampleRate,regexp:/^(\d+)samples$/},t:{method:t=>{const e=parseInt(t,10);return this._beatsToUnits(8/(Math.floor(e)*3))},regexp:/^(\d+)t$/i},tr:{method:(t,e,n)=>{let i=0;return t&&t!=="0"&&(i+=this._beatsToUnits(this._getTimeSignature()*parseFloat(t))),e&&e!=="0"&&(i+=this._beatsToUnits(parseFloat(e))),n&&n!=="0"&&(i+=this._beatsToUnits(parseFloat(n)/4)),i},regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?$/}}}valueOf(){if(this._val instanceof oc&&this.fromType(this._val),Je(this._val))return this._noArg();if(xn(this._val)&&Je(this._units)){for(const t in this._expressions)if(this._expressions[t].regexp.test(this._val.trim())){this._units=t;break}}else if(si(this._val)){let t=0;for(const e in this._val)if(Nt(this._val[e])){const n=this._val[e],i=new this.constructor(this.context,e).valueOf()*n;t+=i}return t}if(Nt(this._units)){const t=this._expressions[this._units],e=this._val.toString().trim().match(t.regexp);return e?t.method.apply(this,e.slice(1)):t.method.call(this,this._val)}else return xn(this._val)?parseFloat(this._val):this._val}_frequencyToUnits(t){return 1/t}_beatsToUnits(t){return 60/this._getBpm()*t}_secondsToUnits(t){return t}_ticksToUnits(t){return t*this._beatsToUnits(1)/this._getPPQ()}_noArg(){return this._now()}_getBpm(){return this.context.transport.bpm.value}_getTimeSignature(){return this.context.transport.timeSignature}_getPPQ(){return this.context.transport.PPQ}fromType(t){switch(this._units=void 0,this.defaultUnits){case"s":this._val=t.toSeconds();break;case"i":this._val=t.toTicks();break;case"hz":this._val=t.toFrequency();break;case"midi":this._val=t.toMidi();break}return this}toFrequency(){return 1/this.toSeconds()}toSamples(){return this.toSeconds()*this.context.sampleRate}toMilliseconds(){return this.toSeconds()*1e3}}class cn extends oc{constructor(){super(...arguments),this.name="TimeClass"}_getExpressions(){return Object.assign(super._getExpressions(),{now:{method:t=>this._now()+new this.constructor(this.context,t).valueOf(),regexp:/^\+(.+)/},quantize:{method:t=>{const e=new cn(this.context,t).valueOf();return this._secondsToUnits(this.context.transport.nextSubdivision(e))},regexp:/^@(.+)/}})}quantize(t,e=1){const n=new this.constructor(this.context,t).valueOf(),i=this.valueOf(),o=Math.round(i/n)*n-i;return i+o*e}toNotation(){const t=this.toSeconds(),e=["1m"];for(let r=1;r<9;r++){const a=Math.pow(2,r);e.push(a+"n."),e.push(a+"n"),e.push(a+"t")}e.push("0");let n=e[0],i=new cn(this.context,e[0]).toSeconds();return e.forEach(r=>{const a=new cn(this.context,r).toSeconds();Math.abs(a-t)<Math.abs(i-t)&&(n=r,i=a)}),n}toBarsBeatsSixteenths(){const t=this._beatsToUnits(1);let e=this.valueOf()/t;e=parseFloat(e.toFixed(4));const n=Math.floor(e/this._getTimeSignature());let i=e%1*4;e=Math.floor(e)%this._getTimeSignature();const r=i.toString();return r.length>3&&(i=parseFloat(parseFloat(r).toFixed(3))),[n,e,i].join(":")}toTicks(){const t=this._beatsToUnits(1),e=this.valueOf()/t;return Math.round(e*this._getPPQ())}toSeconds(){return this.valueOf()}toMidi(){return Aa(this.toFrequency())}_now(){return this.context.now()}}function ac(s,t){return new cn(an(),s,t)}class ln extends cn{constructor(){super(...arguments),this.name="Frequency",this.defaultUnits="hz"}static get A4(){return __()}static set A4(t){v_(t)}_getExpressions(){return Object.assign({},super._getExpressions(),{midi:{regexp:/^(\d+(?:\.\d+)?midi)/,method(t){return this.defaultUnits==="midi"?t:ln.mtof(t)}},note:{regexp:/^([a-g]{1}(?:b|#|x|bb)?)(-?[0-9]+)/i,method(t,e){const i=y_[t.toLowerCase()]+(parseInt(e,10)+1)*12;return this.defaultUnits==="midi"?i:ln.mtof(i)}},tr:{regexp:/^(\d+(?:\.\d+)?):(\d+(?:\.\d+)?):?(\d+(?:\.\d+)?)?/,method(t,e,n){let i=1;return t&&t!=="0"&&(i*=this._beatsToUnits(this._getTimeSignature()*parseFloat(t))),e&&e!=="0"&&(i*=this._beatsToUnits(parseFloat(e))),n&&n!=="0"&&(i*=this._beatsToUnits(parseFloat(n)/4)),i}}})}transpose(t){return new ln(this.context,this.valueOf()*sh(t))}harmonize(t){return t.map(e=>this.transpose(e))}toMidi(){return Aa(this.valueOf())}toNote(){const t=this.toFrequency(),e=Math.log2(t/ln.A4);let n=Math.round(12*e)+57;const i=Math.floor(n/12);return i<0&&(n+=-12*i),S_[n%12]+i.toString()}toSeconds(){return 1/super.toSeconds()}toTicks(){const t=this._beatsToUnits(1),e=this.valueOf()/t;return Math.floor(e*this._getPPQ())}_noArg(){return 0}_frequencyToUnits(t){return t}_ticksToUnits(t){return 1/(t*60/(this._getBpm()*this._getPPQ()))}_beatsToUnits(t){return 1/super._beatsToUnits(t)}_secondsToUnits(t){return 1/t}static mtof(t){return x_(t)}static ftom(t){return Aa(t)}}const y_={cbb:-2,cb:-1,c:0,"c#":1,cx:2,dbb:0,db:1,d:2,"d#":3,dx:4,ebb:2,eb:3,e:4,"e#":5,ex:6,fbb:3,fb:4,f:5,"f#":6,fx:7,gbb:5,gb:6,g:7,"g#":8,gx:9,abb:7,ab:8,a:9,"a#":10,ax:11,bbb:9,bb:10,b:11,"b#":12,bx:13},S_=["C","C#","D","D#","E","F","F#","G","G#","A","A#","B"];class hs extends cn{constructor(){super(...arguments),this.name="TransportTime"}_now(){return this.context.transport.seconds}}class Le extends $n{constructor(){super();const t=lt(Le.getDefaults(),arguments,["context"]);this.defaultContext?this.context=this.defaultContext:this.context=t.context}static getDefaults(){return{context:an()}}now(){return this.context.currentTime+this.context.lookAhead}immediate(){return this.context.currentTime}get sampleTime(){return 1/this.context.sampleRate}get blockTime(){return 128/this.context.sampleRate}toSeconds(t){return new cn(this.context,t).toSeconds()}toFrequency(t){return new ln(this.context,t).toFrequency()}toTicks(t){return new hs(this.context,t).toTicks()}_getPartialProperties(t){const e=this.get();return Object.keys(e).forEach(n=>{Je(t[n])&&delete e[n]}),e}get(){const t=c_(this);return Object.keys(t).forEach(e=>{if(Reflect.has(this,e)){const n=this[e];Nt(n)&&Nt(n.value)&&Nt(n.setValueAtTime)?t[e]=n.value:n instanceof Le?t[e]=n._getPartialProperties(t[e]):He(n)||Xn(n)||xn(n)||Zu(n)?t[e]=n:delete t[e]}}),t}set(t){return Object.keys(t).forEach(e=>{Reflect.has(this,e)&&Nt(this[e])&&(this[e]&&Nt(this[e].value)&&Nt(this[e].setValueAtTime)?this[e].value!==t[e]&&(this[e].value=t[e]):this[e]instanceof Le?this[e].set(t[e]):this[e]=t[e])}),this}}class pr extends In{constructor(t="stopped"){super(),this.name="StateTimeline",this._initial=t,this.setStateAtTime(this._initial,0)}getValueAtTime(t){const e=this.get(t);return e!==null?e.state:this._initial}setStateAtTime(t,e,n){return ai(e,0),this.add(Object.assign({},n,{state:t,time:e})),this}getLastState(t,e){const n=this._search(e);for(let i=n;i>=0;i--){const r=this._timeline[i];if(r.state===t)return r}}getNextState(t,e){const n=this._search(e);if(n!==-1)for(let i=n;i<this._timeline.length;i++){const r=this._timeline[i];if(r.state===t)return r}}}class ie extends Le{constructor(){super(lt(ie.getDefaults(),arguments,["param","units","convert"])),this.name="Param",this.overridden=!1,this._minOutput=1e-7;const t=lt(ie.getDefaults(),arguments,["param","units","convert"]);for(Pt(Nt(t.param)&&(Pi(t.param)||t.param instanceof ie),"param must be an AudioParam");!Pi(t.param);)t.param=t.param._param;this._swappable=Nt(t.swappable)?t.swappable:!1,this._swappable?(this.input=this.context.createGain(),this._param=t.param,this.input.connect(this._param)):this._param=this.input=t.param,this._events=new In(1e3),this._initialValue=this._param.defaultValue,this.units=t.units,this.convert=t.convert,this._minValue=t.minValue,this._maxValue=t.maxValue,Nt(t.value)&&t.value!==this._toType(this._initialValue)&&this.setValueAtTime(t.value,0)}static getDefaults(){return Object.assign(Le.getDefaults(),{convert:!0,units:"number"})}get value(){const t=this.now();return this.getValueAtTime(t)}set value(t){this.cancelScheduledValues(this.now()),this.setValueAtTime(t,this.now())}get minValue(){return Nt(this._minValue)?this._minValue:this.units==="time"||this.units==="frequency"||this.units==="normalRange"||this.units==="positive"||this.units==="transportTime"||this.units==="ticks"||this.units==="bpm"||this.units==="hertz"||this.units==="samples"?0:this.units==="audioRange"?-1:this.units==="decibels"?-1/0:this._param.minValue}get maxValue(){return Nt(this._maxValue)?this._maxValue:this.units==="normalRange"||this.units==="audioRange"?1:this._param.maxValue}_is(t,e){return this.units===e}_assertRange(t){return Nt(this.maxValue)&&Nt(this.minValue)&&ai(t,this._fromType(this.minValue),this._fromType(this.maxValue)),t}_fromType(t){return this.convert&&!this.overridden?this._is(t,"time")?this.toSeconds(t):this._is(t,"decibels")?m_(t):this._is(t,"frequency")?this.toFrequency(t):t:this.overridden?0:t}_toType(t){return this.convert&&this.units==="decibels"?g_(t):t}setValueAtTime(t,e){const n=this.toSeconds(e),i=this._fromType(t);return Pt(isFinite(i)&&isFinite(n),`Invalid argument(s) to setValueAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`),this._assertRange(i),this.log(this.units,"setValueAtTime",t,n),this._events.add({time:n,type:"setValueAtTime",value:i}),this._param.setValueAtTime(i,n),this}getValueAtTime(t){const e=Math.max(this.toSeconds(t),0),n=this._events.getAfter(e),i=this._events.get(e);let r=this._initialValue;if(i===null)r=this._initialValue;else if(i.type==="setTargetAtTime"&&(n===null||n.type==="setValueAtTime")){const a=this._events.getBefore(i.time);let o;a===null?o=this._initialValue:o=a.value,i.type==="setTargetAtTime"&&(r=this._exponentialApproach(i.time,o,i.value,i.constant,e))}else if(n===null)r=i.value;else if(n.type==="linearRampToValueAtTime"||n.type==="exponentialRampToValueAtTime"){let a=i.value;if(i.type==="setTargetAtTime"){const o=this._events.getBefore(i.time);o===null?a=this._initialValue:a=o.value}n.type==="linearRampToValueAtTime"?r=this._linearInterpolate(i.time,a,n.time,n.value,e):r=this._exponentialInterpolate(i.time,a,n.time,n.value,e)}else r=i.value;return this._toType(r)}setRampPoint(t){t=this.toSeconds(t);let e=this.getValueAtTime(t);return this.cancelAndHoldAtTime(t),this._fromType(e)===0&&(e=this._toType(this._minOutput)),this.setValueAtTime(e,t),this}linearRampToValueAtTime(t,e){const n=this._fromType(t),i=this.toSeconds(e);return Pt(isFinite(n)&&isFinite(i),`Invalid argument(s) to linearRampToValueAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`),this._assertRange(n),this._events.add({time:i,type:"linearRampToValueAtTime",value:n}),this.log(this.units,"linearRampToValueAtTime",t,i),this._param.linearRampToValueAtTime(n,i),this}exponentialRampToValueAtTime(t,e){let n=this._fromType(t);n=pn(n,0)?this._minOutput:n,this._assertRange(n);const i=this.toSeconds(e);return Pt(isFinite(n)&&isFinite(i),`Invalid argument(s) to exponentialRampToValueAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`),this._events.add({time:i,type:"exponentialRampToValueAtTime",value:n}),this.log(this.units,"exponentialRampToValueAtTime",t,i),this._param.exponentialRampToValueAtTime(n,i),this}exponentialRampTo(t,e,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialRampToValueAtTime(t,n+this.toSeconds(e)),this}linearRampTo(t,e,n){return n=this.toSeconds(n),this.setRampPoint(n),this.linearRampToValueAtTime(t,n+this.toSeconds(e)),this}targetRampTo(t,e,n){return n=this.toSeconds(n),this.setRampPoint(n),this.exponentialApproachValueAtTime(t,n,e),this}exponentialApproachValueAtTime(t,e,n){e=this.toSeconds(e),n=this.toSeconds(n);const i=Math.log(n+1)/Math.log(200);return this.setTargetAtTime(t,e,i),this.cancelAndHoldAtTime(e+n*.9),this.linearRampToValueAtTime(t,e+n),this}setTargetAtTime(t,e,n){const i=this._fromType(t);Pt(isFinite(n)&&n>0,"timeConstant must be a number greater than 0");const r=this.toSeconds(e);return this._assertRange(i),Pt(isFinite(i)&&isFinite(r),`Invalid argument(s) to setTargetAtTime: ${JSON.stringify(t)}, ${JSON.stringify(e)}`),this._events.add({constant:n,time:r,type:"setTargetAtTime",value:i}),this.log(this.units,"setTargetAtTime",t,r,n),this._param.setTargetAtTime(i,r,n),this}setValueCurveAtTime(t,e,n,i=1){n=this.toSeconds(n),e=this.toSeconds(e);const r=this._fromType(t[0])*i;this.setValueAtTime(this._toType(r),e);const a=n/(t.length-1);for(let o=1;o<t.length;o++){const c=this._fromType(t[o])*i;this.linearRampToValueAtTime(this._toType(c),e+o*a)}return this}cancelScheduledValues(t){const e=this.toSeconds(t);return Pt(isFinite(e),`Invalid argument to cancelScheduledValues: ${JSON.stringify(t)}`),this._events.cancel(e),this._param.cancelScheduledValues(e),this.log(this.units,"cancelScheduledValues",e),this}cancelAndHoldAtTime(t){const e=this.toSeconds(t),n=this._fromType(this.getValueAtTime(e));Pt(isFinite(e),`Invalid argument to cancelAndHoldAtTime: ${JSON.stringify(t)}`),this.log(this.units,"cancelAndHoldAtTime",e,"value="+n);const i=this._events.get(e),r=this._events.getAfter(e);return i&&pn(i.time,e)?r?(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time)):(this._param.cancelAndHoldAtTime(e),this._events.cancel(e+this.sampleTime)):r&&(this._param.cancelScheduledValues(r.time),this._events.cancel(r.time),r.type==="linearRampToValueAtTime"?this.linearRampToValueAtTime(this._toType(n),e):r.type==="exponentialRampToValueAtTime"&&this.exponentialRampToValueAtTime(this._toType(n),e)),this._events.add({time:e,type:"setValueAtTime",value:n}),this._param.setValueAtTime(n,e),this}rampTo(t,e=.1,n){return this.units==="frequency"||this.units==="bpm"||this.units==="decibels"?this.exponentialRampTo(t,e,n):this.linearRampTo(t,e,n),this}apply(t){const e=this.context.currentTime;t.setValueAtTime(this.getValueAtTime(e),e);const n=this._events.get(e);if(n&&n.type==="setTargetAtTime"){const i=this._events.getAfter(n.time),r=i?i.time:e+2,a=(r-e)/10;for(let o=e;o<r;o+=a)t.linearRampToValueAtTime(this.getValueAtTime(o),o)}return this._events.forEachAfter(this.context.currentTime,i=>{i.type==="cancelScheduledValues"?t.cancelScheduledValues(i.time):i.type==="setTargetAtTime"?t.setTargetAtTime(i.value,i.time,i.constant):t[i.type](i.value,i.time)}),this}setParam(t){Pt(this._swappable,"The Param must be assigned as 'swappable' in the constructor");const e=this.input;return e.disconnect(this._param),this.apply(t),this._param=t,e.connect(this._param),this}dispose(){return super.dispose(),this._events.dispose(),this}get defaultValue(){return this._toType(this._param.defaultValue)}_exponentialApproach(t,e,n,i,r){return n+(e-n)*Math.exp(-(r-t)/i)}_linearInterpolate(t,e,n,i,r){return e+(i-e)*((r-t)/(n-t))}_exponentialInterpolate(t,e,n,i,r){return e*Math.pow(i/e,(r-t)/(n-t))}}class Vt extends Le{constructor(){super(...arguments),this.name="ToneAudioNode",this._internalChannels=[]}get numberOfInputs(){return Nt(this.input)?Pi(this.input)||this.input instanceof ie?1:this.input.numberOfInputs:0}get numberOfOutputs(){return Nt(this.output)?this.output.numberOfOutputs:0}_isAudioNode(t){return Nt(t)&&(t instanceof Vt||ri(t))}_getInternalNodes(){const t=this._internalChannels.slice(0);return this._isAudioNode(this.input)&&t.push(this.input),this._isAudioNode(this.output)&&this.input!==this.output&&t.push(this.output),t}_setChannelProperties(t){this._getInternalNodes().forEach(n=>{n.channelCount=t.channelCount,n.channelCountMode=t.channelCountMode,n.channelInterpretation=t.channelInterpretation})}_getChannelProperties(){const t=this._getInternalNodes();Pt(t.length>0,"ToneAudioNode does not have any internal nodes");const e=t[0];return{channelCount:e.channelCount,channelCountMode:e.channelCountMode,channelInterpretation:e.channelInterpretation}}get channelCount(){return this._getChannelProperties().channelCount}set channelCount(t){const e=this._getChannelProperties();this._setChannelProperties(Object.assign(e,{channelCount:t}))}get channelCountMode(){return this._getChannelProperties().channelCountMode}set channelCountMode(t){const e=this._getChannelProperties();this._setChannelProperties(Object.assign(e,{channelCountMode:t}))}get channelInterpretation(){return this._getChannelProperties().channelInterpretation}set channelInterpretation(t){const e=this._getChannelProperties();this._setChannelProperties(Object.assign(e,{channelInterpretation:t}))}connect(t,e=0,n=0){return Rs(this,t,e,n),this}toDestination(){return this.connect(this.context.destination),this}toMaster(){return $u("toMaster() has been renamed toDestination()"),this.toDestination()}disconnect(t,e=0,n=0){return M_(this,t,e,n),this}chain(...t){return Ca(this,...t),this}fan(...t){return t.forEach(e=>this.connect(e)),this}dispose(){return super.dispose(),Nt(this.input)&&(this.input instanceof Vt?this.input.dispose():ri(this.input)&&this.input.disconnect()),Nt(this.output)&&(this.output instanceof Vt?this.output.dispose():ri(this.output)&&this.output.disconnect()),this._internalChannels=[],this}}function Ca(...s){const t=s.shift();s.reduce((e,n)=>(e instanceof Vt?e.connect(n):ri(e)&&Rs(e,n),n),t)}function Rs(s,t,e=0,n=0){for(Pt(Nt(s),"Cannot connect from undefined node"),Pt(Nt(t),"Cannot connect to undefined node"),(t instanceof Vt||ri(t))&&Pt(t.numberOfInputs>0,"Cannot connect to node with no inputs"),Pt(s.numberOfOutputs>0,"Cannot connect from node with no outputs");t instanceof Vt||t instanceof ie;)Nt(t.input)&&(t=t.input);for(;s instanceof Vt;)Nt(s.output)&&(s=s.output);Pi(t)?s.connect(t,e):s.connect(t,e,n)}function M_(s,t,e=0,n=0){if(Nt(t))for(;t instanceof Vt;)t=t.input;for(;!ri(s);)Nt(s.output)&&(s=s.output);Pi(t)?s.disconnect(t,e):ri(t)?s.disconnect(t,e,n):s.disconnect()}class ze extends Vt{constructor(){super(lt(ze.getDefaults(),arguments,["gain","units"])),this.name="Gain",this._gainNode=this.context.createGain(),this.input=this._gainNode,this.output=this._gainNode;const t=lt(ze.getDefaults(),arguments,["gain","units"]);this.gain=new ie({context:this.context,convert:t.convert,param:this._gainNode.gain,units:t.units,value:t.gain,minValue:t.minValue,maxValue:t.maxValue}),le(this,"gain")}static getDefaults(){return Object.assign(Vt.getDefaults(),{convert:!0,gain:1,units:"gain"})}dispose(){return super.dispose(),this._gainNode.disconnect(),this.gain.dispose(),this}}class _s extends Vt{constructor(t){super(t),this.onended=jt,this._startTime=-1,this._stopTime=-1,this._timeout=-1,this.output=new ze({context:this.context,gain:0}),this._gainNode=this.output,this.getStateAtTime=function(e){const n=this.toSeconds(e);return this._startTime!==-1&&n>=this._startTime&&(this._stopTime===-1||n<=this._stopTime)?"started":"stopped"},this._fadeIn=t.fadeIn,this._fadeOut=t.fadeOut,this._curve=t.curve,this.onended=t.onended}static getDefaults(){return Object.assign(Vt.getDefaults(),{curve:"linear",fadeIn:0,fadeOut:0,onended:jt})}_startGain(t,e=1){Pt(this._startTime===-1,"Source cannot be started more than once");const n=this.toSeconds(this._fadeIn);return this._startTime=t+n,this._startTime=Math.max(this._startTime,this.context.currentTime),n>0?(this._gainNode.gain.setValueAtTime(0,t),this._curve==="linear"?this._gainNode.gain.linearRampToValueAtTime(e,t+n):this._gainNode.gain.exponentialApproachValueAtTime(e,t,n)):this._gainNode.gain.setValueAtTime(e,t),this}stop(t){return this.log("stop",t),this._stopGain(this.toSeconds(t)),this}_stopGain(t){Pt(this._startTime!==-1,"'start' must be called before 'stop'"),this.cancelStop();const e=this.toSeconds(this._fadeOut);return this._stopTime=this.toSeconds(t)+e,this._stopTime=Math.max(this._stopTime,this.context.currentTime),e>0?this._curve==="linear"?this._gainNode.gain.linearRampTo(0,e,t):this._gainNode.gain.targetRampTo(0,e,t):(this._gainNode.gain.cancelAndHoldAtTime(t),this._gainNode.gain.setValueAtTime(0,t)),this.context.clearTimeout(this._timeout),this._timeout=this.context.setTimeout(()=>{const n=this._curve==="exponential"?e*2:0;this._stopSource(this.now()+n),this._onended()},this._stopTime-this.context.currentTime),this}_onended(){if(this.onended!==jt&&(this.onended(this),this.onended=jt,!this.context.isOffline)){const t=()=>this.dispose();typeof window.requestIdleCallback<"u"?window.requestIdleCallback(t):setTimeout(t,1e3)}}get state(){return this.getStateAtTime(this.now())}cancelStop(){return this.log("cancelStop"),Pt(this._startTime!==-1,"Source is not started"),this._gainNode.gain.cancelScheduledValues(this._startTime+this.sampleTime),this.context.clearTimeout(this._timeout),this._stopTime=-1,this}dispose(){return super.dispose(),this._gainNode.disconnect(),this}}class co extends _s{constructor(){super(lt(co.getDefaults(),arguments,["offset"])),this.name="ToneConstantSource",this._source=this.context.createConstantSource();const t=lt(co.getDefaults(),arguments,["offset"]);Rs(this._source,this._gainNode),this.offset=new ie({context:this.context,convert:t.convert,param:this._source.offset,units:t.units,value:t.offset,minValue:t.minValue,maxValue:t.maxValue})}static getDefaults(){return Object.assign(_s.getDefaults(),{convert:!0,offset:1,units:"number"})}start(t){const e=this.toSeconds(t);return this.log("start",e),this._startGain(e),this._source.start(e),this}_stopSource(t){this._source.stop(t)}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._source.disconnect(),this.offset.dispose(),this}}class xe extends Vt{constructor(){super(lt(xe.getDefaults(),arguments,["value","units"])),this.name="Signal",this.override=!0;const t=lt(xe.getDefaults(),arguments,["value","units"]);this.output=this._constantSource=new co({context:this.context,convert:t.convert,offset:t.value,units:t.units,minValue:t.minValue,maxValue:t.maxValue}),this._constantSource.start(0),this.input=this._param=this._constantSource.offset}static getDefaults(){return Object.assign(Vt.getDefaults(),{convert:!0,units:"number",value:0})}connect(t,e=0,n=0){return cc(this,t,e,n),this}dispose(){return super.dispose(),this._param.dispose(),this._constantSource.dispose(),this}setValueAtTime(t,e){return this._param.setValueAtTime(t,e),this}getValueAtTime(t){return this._param.getValueAtTime(t)}setRampPoint(t){return this._param.setRampPoint(t),this}linearRampToValueAtTime(t,e){return this._param.linearRampToValueAtTime(t,e),this}exponentialRampToValueAtTime(t,e){return this._param.exponentialRampToValueAtTime(t,e),this}exponentialRampTo(t,e,n){return this._param.exponentialRampTo(t,e,n),this}linearRampTo(t,e,n){return this._param.linearRampTo(t,e,n),this}targetRampTo(t,e,n){return this._param.targetRampTo(t,e,n),this}exponentialApproachValueAtTime(t,e,n){return this._param.exponentialApproachValueAtTime(t,e,n),this}setTargetAtTime(t,e,n){return this._param.setTargetAtTime(t,e,n),this}setValueCurveAtTime(t,e,n,i){return this._param.setValueCurveAtTime(t,e,n,i),this}cancelScheduledValues(t){return this._param.cancelScheduledValues(t),this}cancelAndHoldAtTime(t){return this._param.cancelAndHoldAtTime(t),this}rampTo(t,e,n){return this._param.rampTo(t,e,n),this}get value(){return this._param.value}set value(t){this._param.value=t}get convert(){return this._param.convert}set convert(t){this._param.convert=t}get units(){return this._param.units}get overridden(){return this._param.overridden}set overridden(t){this._param.overridden=t}get maxValue(){return this._param.maxValue}get minValue(){return this._param.minValue}apply(t){return this._param.apply(t),this}}function cc(s,t,e,n){(t instanceof ie||Pi(t)||t instanceof xe&&t.override)&&(t.cancelScheduledValues(0),t.setValueAtTime(0,0),t instanceof xe&&(t.overridden=!0)),Rs(s,t,e,n)}class lo extends ie{constructor(){super(lt(lo.getDefaults(),arguments,["value"])),this.name="TickParam",this._events=new In(1/0),this._multiplier=1;const t=lt(lo.getDefaults(),arguments,["value"]);this._multiplier=t.multiplier,this._events.cancel(0),this._events.add({ticks:0,time:0,type:"setValueAtTime",value:this._fromType(t.value)}),this.setValueAtTime(t.value,0)}static getDefaults(){return Object.assign(ie.getDefaults(),{multiplier:1,units:"hertz",value:1})}setTargetAtTime(t,e,n){e=this.toSeconds(e),this.setRampPoint(e);const i=this._fromType(t),r=this._events.get(e),a=Math.round(Math.max(1/n,1));for(let o=0;o<=a;o++){const c=n*o+e,l=this._exponentialApproach(r.time,r.value,i,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}setValueAtTime(t,e){const n=this.toSeconds(e);super.setValueAtTime(t,e);const i=this._events.get(n),r=this._events.previousEvent(i),a=this._getTicksUntilEvent(r,n);return i.ticks=Math.max(a,0),this}linearRampToValueAtTime(t,e){const n=this.toSeconds(e);super.linearRampToValueAtTime(t,e);const i=this._events.get(n),r=this._events.previousEvent(i),a=this._getTicksUntilEvent(r,n);return i.ticks=Math.max(a,0),this}exponentialRampToValueAtTime(t,e){e=this.toSeconds(e);const n=this._fromType(t),i=this._events.get(e),r=Math.round(Math.max((e-i.time)*10,1)),a=(e-i.time)/r;for(let o=0;o<=r;o++){const c=a*o+i.time,l=this._exponentialInterpolate(i.time,i.value,e,n,c);this.linearRampToValueAtTime(this._toType(l),c)}return this}_getTicksUntilEvent(t,e){if(t===null)t={ticks:0,time:0,type:"setValueAtTime",value:0};else if(Je(t.ticks)){const a=this._events.previousEvent(t);t.ticks=this._getTicksUntilEvent(a,t.time)}const n=this._fromType(this.getValueAtTime(t.time));let i=this._fromType(this.getValueAtTime(e));const r=this._events.get(e);return r&&r.time===e&&r.type==="setValueAtTime"&&(i=this._fromType(this.getValueAtTime(e-this.sampleTime))),.5*(e-t.time)*(n+i)+t.ticks}getTicksAtTime(t){const e=this.toSeconds(t),n=this._events.get(e);return Math.max(this._getTicksUntilEvent(n,e),0)}getDurationOfTicks(t,e){const n=this.toSeconds(e),i=this.getTicksAtTime(e);return this.getTimeOfTick(i+t)-n}getTimeOfTick(t){const e=this._events.get(t,"ticks"),n=this._events.getAfter(t,"ticks");if(e&&e.ticks===t)return e.time;if(e&&n&&n.type==="linearRampToValueAtTime"&&e.value!==n.value){const i=this._fromType(this.getValueAtTime(e.time)),a=(this._fromType(this.getValueAtTime(n.time))-i)/(n.time-e.time),o=Math.sqrt(Math.pow(i,2)-2*a*(e.ticks-t)),c=(-i+o)/a,l=(-i-o)/a;return(c>0?c:l)+e.time}else return e?e.value===0?1/0:e.time+(t-e.ticks)/e.value:t/this._initialValue}ticksToTime(t,e){return this.getDurationOfTicks(t,e)}timeToTicks(t,e){const n=this.toSeconds(e),i=this.toSeconds(t),r=this.getTicksAtTime(n);return this.getTicksAtTime(n+i)-r}_fromType(t){return this.units==="bpm"&&this.multiplier?1/(60/t/this.multiplier):super._fromType(t)}_toType(t){return this.units==="bpm"&&this.multiplier?t/this.multiplier*60:super._toType(t)}get multiplier(){return this._multiplier}set multiplier(t){const e=this.value;this._multiplier=t,this.cancelScheduledValues(0),this.setValueAtTime(e,0)}}class uo extends xe{constructor(){super(lt(uo.getDefaults(),arguments,["value"])),this.name="TickSignal";const t=lt(uo.getDefaults(),arguments,["value"]);this.input=this._param=new lo({context:this.context,convert:t.convert,multiplier:t.multiplier,param:this._constantSource.offset,units:t.units,value:t.value})}static getDefaults(){return Object.assign(xe.getDefaults(),{multiplier:1,units:"hertz",value:1})}ticksToTime(t,e){return this._param.ticksToTime(t,e)}timeToTicks(t,e){return this._param.timeToTicks(t,e)}getTimeOfTick(t){return this._param.getTimeOfTick(t)}getDurationOfTicks(t,e){return this._param.getDurationOfTicks(t,e)}getTicksAtTime(t){return this._param.getTicksAtTime(t)}get multiplier(){return this._param.multiplier}set multiplier(t){this._param.multiplier=t}dispose(){return super.dispose(),this._param.dispose(),this}}class ho extends Le{constructor(){super(lt(ho.getDefaults(),arguments,["frequency"])),this.name="TickSource",this._state=new pr,this._tickOffset=new In;const t=lt(ho.getDefaults(),arguments,["frequency"]);this.frequency=new uo({context:this.context,units:t.units,value:t.frequency}),le(this,"frequency"),this._state.setStateAtTime("stopped",0),this.setTicksAtTime(0,0)}static getDefaults(){return Object.assign({frequency:1,units:"hertz"},Le.getDefaults())}get state(){return this.getStateAtTime(this.now())}start(t,e){const n=this.toSeconds(t);return this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),Nt(e)&&this.setTicksAtTime(e,n)),this}stop(t){const e=this.toSeconds(t);if(this._state.getValueAtTime(e)==="stopped"){const n=this._state.get(e);n&&n.time>0&&(this._tickOffset.cancel(n.time),this._state.cancel(n.time))}return this._state.cancel(e),this._state.setStateAtTime("stopped",e),this.setTicksAtTime(0,e),this}pause(t){const e=this.toSeconds(t);return this._state.getValueAtTime(e)==="started"&&this._state.setStateAtTime("paused",e),this}cancel(t){return t=this.toSeconds(t),this._state.cancel(t),this._tickOffset.cancel(t),this}getTicksAtTime(t){const e=this.toSeconds(t),n=this._state.getLastState("stopped",e),i={state:"paused",time:e};this._state.add(i);let r=n,a=0;return this._state.forEachBetween(n.time,e+this.sampleTime,o=>{let c=r.time;const l=this._tickOffset.get(o.time);l&&l.time>=r.time&&(a=l.ticks,c=l.time),r.state==="started"&&o.state!=="started"&&(a+=this.frequency.getTicksAtTime(o.time)-this.frequency.getTicksAtTime(c)),r=o}),this._state.remove(i),a}get ticks(){return this.getTicksAtTime(this.now())}set ticks(t){this.setTicksAtTime(t,this.now())}get seconds(){return this.getSecondsAtTime(this.now())}set seconds(t){const e=this.now(),n=this.frequency.timeToTicks(t,e);this.setTicksAtTime(n,e)}getSecondsAtTime(t){t=this.toSeconds(t);const e=this._state.getLastState("stopped",t),n={state:"paused",time:t};this._state.add(n);let i=e,r=0;return this._state.forEachBetween(e.time,t+this.sampleTime,a=>{let o=i.time;const c=this._tickOffset.get(a.time);c&&c.time>=i.time&&(r=c.seconds,o=c.time),i.state==="started"&&a.state!=="started"&&(r+=a.time-o),i=a}),this._state.remove(n),r}setTicksAtTime(t,e){return e=this.toSeconds(e),this._tickOffset.cancel(e),this._tickOffset.add({seconds:this.frequency.getDurationOfTicks(t,e),ticks:t,time:e}),this}getStateAtTime(t){return t=this.toSeconds(t),this._state.getValueAtTime(t)}getTimeOfTick(t,e=this.now()){const n=this._tickOffset.get(e),i=this._state.get(e),r=Math.max(n.time,i.time),a=this.frequency.getTicksAtTime(r)+t-n.ticks;return this.frequency.getTimeOfTick(a)}forEachTickBetween(t,e,n){let i=this._state.get(t);this._state.forEachBetween(t,e,a=>{i&&i.state==="started"&&a.state!=="started"&&this.forEachTickBetween(Math.max(i.time,t),a.time-this.sampleTime,n),i=a});let r=null;if(i&&i.state==="started"){const a=Math.max(i.time,t),o=this.frequency.getTicksAtTime(a),c=this.frequency.getTicksAtTime(i.time),l=o-c;let u=Math.ceil(l)-l;u=pn(u,1)?0:u;let h=this.frequency.getTimeOfTick(o+u);for(;h<e;){try{n(h,Math.round(this.getTicksAtTime(h)))}catch(f){r=f;break}h+=this.frequency.getDurationOfTicks(1,h)}}if(r)throw r;return this}dispose(){return super.dispose(),this._state.dispose(),this._tickOffset.dispose(),this.frequency.dispose(),this}}let oh=class Ra extends Le{constructor(){super(lt(Ra.getDefaults(),arguments,["callback","frequency"])),this.name="Clock",this.callback=jt,this._lastUpdate=0,this._state=new pr("stopped"),this._boundLoop=this._loop.bind(this);const t=lt(Ra.getDefaults(),arguments,["callback","frequency"]);this.callback=t.callback,this._tickSource=new ho({context:this.context,frequency:t.frequency,units:t.units}),this._lastUpdate=0,this.frequency=this._tickSource.frequency,le(this,"frequency"),this._state.setStateAtTime("stopped",0),this.context.on("tick",this._boundLoop)}static getDefaults(){return Object.assign(Le.getDefaults(),{callback:jt,frequency:1,units:"hertz"})}get state(){return this._state.getValueAtTime(this.now())}start(t,e){ju(this.context);const n=this.toSeconds(t);return this.log("start",n),this._state.getValueAtTime(n)!=="started"&&(this._state.setStateAtTime("started",n),this._tickSource.start(n,e),n<this._lastUpdate&&this.emit("start",n,e)),this}stop(t){const e=this.toSeconds(t);return this.log("stop",e),this._state.cancel(e),this._state.setStateAtTime("stopped",e),this._tickSource.stop(e),e<this._lastUpdate&&this.emit("stop",e),this}pause(t){const e=this.toSeconds(t);return this._state.getValueAtTime(e)==="started"&&(this._state.setStateAtTime("paused",e),this._tickSource.pause(e),e<this._lastUpdate&&this.emit("pause",e)),this}get ticks(){return Math.ceil(this.getTicksAtTime(this.now()))}set ticks(t){this._tickSource.ticks=t}get seconds(){return this._tickSource.seconds}set seconds(t){this._tickSource.seconds=t}getSecondsAtTime(t){return this._tickSource.getSecondsAtTime(t)}setTicksAtTime(t,e){return this._tickSource.setTicksAtTime(t,e),this}getTimeOfTick(t,e=this.now()){return this._tickSource.getTimeOfTick(t,e)}getTicksAtTime(t){return this._tickSource.getTicksAtTime(t)}nextTickTime(t,e){const n=this.toSeconds(e),i=this.getTicksAtTime(n);return this._tickSource.getTimeOfTick(i+t,n)}_loop(){const t=this._lastUpdate,e=this.now();this._lastUpdate=e,this.log("loop",t,e),t!==e&&(this._state.forEachBetween(t,e,n=>{switch(n.state){case"started":const i=this._tickSource.getTicksAtTime(n.time);this.emit("start",n.time,i);break;case"stopped":n.time!==0&&this.emit("stop",n.time);break;case"paused":this.emit("pause",n.time);break}}),this._tickSource.forEachTickBetween(t,e,(n,i)=>{this.callback(n,i)}))}getStateAtTime(t){const e=this.toSeconds(t);return this._state.getValueAtTime(e)}dispose(){return super.dispose(),this.context.off("tick",this._boundLoop),this._tickSource.dispose(),this._state.dispose(),this}};dr.mixin(oh);class lc extends $n{constructor(){super(),this.name="ToneAudioBuffers",this._buffers=new Map,this._loadingCount=0;const t=lt(lc.getDefaults(),arguments,["urls","onload","baseUrl"],"urls");this.baseUrl=t.baseUrl,Object.keys(t.urls).forEach(e=>{this._loadingCount++;const n=t.urls[e];this.add(e,n,this._bufferLoaded.bind(this,t.onload),t.onerror)})}static getDefaults(){return{baseUrl:"",onerror:jt,onload:jt,urls:{}}}has(t){return this._buffers.has(t.toString())}get(t){return Pt(this.has(t),`ToneAudioBuffers has no buffer named: ${t}`),this._buffers.get(t.toString())}_bufferLoaded(t){this._loadingCount--,this._loadingCount===0&&t&&t()}get loaded(){return Array.from(this._buffers).every(([t,e])=>e.loaded)}add(t,e,n=jt,i=jt){return xn(e)?this._buffers.set(t.toString(),new Kt(this.baseUrl+e,n,i)):this._buffers.set(t.toString(),new Kt(e,n,i)),this}dispose(){return super.dispose(),this._buffers.forEach(t=>t.dispose()),this._buffers.clear(),this}}class ee extends hs{constructor(){super(...arguments),this.name="Ticks",this.defaultUnits="i"}_now(){return this.context.transport.ticks}_beatsToUnits(t){return this._getPPQ()*t}_secondsToUnits(t){return Math.floor(t/(60/this._getBpm())*this._getPPQ())}_ticksToUnits(t){return t}toTicks(){return this.valueOf()}toSeconds(){return this.valueOf()/this._getPPQ()*(60/this._getBpm())}}let b_=class extends Le{constructor(){super(...arguments),this.name="Draw",this.expiration=.25,this.anticipation=.008,this._events=new In,this._boundDrawLoop=this._drawLoop.bind(this),this._animationFrame=-1}schedule(t,e){return this._events.add({callback:t,time:this.toSeconds(e)}),this._events.length===1&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop)),this}cancel(t){return this._events.cancel(this.toSeconds(t)),this}_drawLoop(){const t=this.context.currentTime;for(;this._events.length&&this._events.peek().time-this.anticipation<=t;){const e=this._events.shift();e&&t-e.time<=this.expiration&&e.callback()}this._events.length>0&&(this._animationFrame=requestAnimationFrame(this._boundDrawLoop))}dispose(){return super.dispose(),this._events.dispose(),cancelAnimationFrame(this._animationFrame),this}};wo(s=>{s.draw=new b_({context:s})});To(s=>{s.draw.dispose()});class w_ extends $n{constructor(){super(...arguments),this.name="IntervalTimeline",this._root=null,this._length=0}add(t){Pt(Nt(t.time),"Events must have a time property"),Pt(Nt(t.duration),"Events must have a duration parameter"),t.time=t.time.valueOf();let e=new T_(t.time,t.time+t.duration,t);for(this._root===null?this._root=e:this._root.insert(e),this._length++;e!==null;)e.updateHeight(),e.updateMax(),this._rebalance(e),e=e.parent;return this}remove(t){if(this._root!==null){const e=[];this._root.search(t.time,e);for(const n of e)if(n.event===t){this._removeNode(n),this._length--;break}}return this}get length(){return this._length}cancel(t){return this.forEachFrom(t,e=>this.remove(e)),this}_setRoot(t){this._root=t,this._root!==null&&(this._root.parent=null)}_replaceNodeInParent(t,e){t.parent!==null?(t.isLeftChild()?t.parent.left=e:t.parent.right=e,this._rebalance(t.parent)):this._setRoot(e)}_removeNode(t){if(t.left===null&&t.right===null)this._replaceNodeInParent(t,null);else if(t.right===null)this._replaceNodeInParent(t,t.left);else if(t.left===null)this._replaceNodeInParent(t,t.right);else{const e=t.getBalance();let n,i=null;if(e>0)if(t.left.right===null)n=t.left,n.right=t.right,i=n;else{for(n=t.left.right;n.right!==null;)n=n.right;n.parent&&(n.parent.right=n.left,i=n.parent,n.left=t.left,n.right=t.right)}else if(t.right.left===null)n=t.right,n.left=t.left,i=n;else{for(n=t.right.left;n.left!==null;)n=n.left;n.parent&&(n.parent.left=n.right,i=n.parent,n.left=t.left,n.right=t.right)}t.parent!==null?t.isLeftChild()?t.parent.left=n:t.parent.right=n:this._setRoot(n),i&&this._rebalance(i)}t.dispose()}_rotateLeft(t){const e=t.parent,n=t.isLeftChild(),i=t.right;i&&(t.right=i.left,i.left=t),e!==null?n?e.left=i:e.right=i:this._setRoot(i)}_rotateRight(t){const e=t.parent,n=t.isLeftChild(),i=t.left;i&&(t.left=i.right,i.right=t),e!==null?n?e.left=i:e.right=i:this._setRoot(i)}_rebalance(t){const e=t.getBalance();e>1&&t.left?t.left.getBalance()<0?this._rotateLeft(t.left):this._rotateRight(t):e<-1&&t.right&&(t.right.getBalance()>0?this._rotateRight(t.right):this._rotateLeft(t))}get(t){if(this._root!==null){const e=[];if(this._root.search(t,e),e.length>0){let n=e[0];for(let i=1;i<e.length;i++)e[i].low>n.low&&(n=e[i]);return n.event}}return null}forEach(t){if(this._root!==null){const e=[];this._root.traverse(n=>e.push(n)),e.forEach(n=>{n.event&&t(n.event)})}return this}forEachAtTime(t,e){if(this._root!==null){const n=[];this._root.search(t,n),n.forEach(i=>{i.event&&e(i.event)})}return this}forEachFrom(t,e){if(this._root!==null){const n=[];this._root.searchAfter(t,n),n.forEach(i=>{i.event&&e(i.event)})}return this}dispose(){return super.dispose(),this._root!==null&&this._root.traverse(t=>t.dispose()),this._root=null,this}}class T_{constructor(t,e,n){this._left=null,this._right=null,this.parent=null,this.height=0,this.event=n,this.low=t,this.high=e,this.max=this.high}insert(t){t.low<=this.low?this.left===null?this.left=t:this.left.insert(t):this.right===null?this.right=t:this.right.insert(t)}search(t,e){t>this.max||(this.left!==null&&this.left.search(t,e),this.low<=t&&this.high>t&&e.push(this),!(this.low>t)&&this.right!==null&&this.right.search(t,e))}searchAfter(t,e){this.low>=t&&(e.push(this),this.left!==null&&this.left.searchAfter(t,e)),this.right!==null&&this.right.searchAfter(t,e)}traverse(t){t(this),this.left!==null&&this.left.traverse(t),this.right!==null&&this.right.traverse(t)}updateHeight(){this.left!==null&&this.right!==null?this.height=Math.max(this.left.height,this.right.height)+1:this.right!==null?this.height=this.right.height+1:this.left!==null?this.height=this.left.height+1:this.height=0}updateMax(){this.max=this.high,this.left!==null&&(this.max=Math.max(this.max,this.left.max)),this.right!==null&&(this.max=Math.max(this.max,this.right.max))}getBalance(){let t=0;return this.left!==null&&this.right!==null?t=this.left.height-this.right.height:this.left!==null?t=this.left.height+1:this.right!==null&&(t=-(this.right.height+1)),t}isLeftChild(){return this.parent!==null&&this.parent.left===this}get left(){return this._left}set left(t){this._left=t,t!==null&&(t.parent=this),this.updateHeight(),this.updateMax()}get right(){return this._right}set right(t){this._right=t,t!==null&&(t.parent=this),this.updateHeight(),this.updateMax()}dispose(){this.parent=null,this._left=null,this._right=null,this.event=null}}class Li extends Vt{constructor(){super(lt(Li.getDefaults(),arguments,["volume"])),this.name="Volume";const t=lt(Li.getDefaults(),arguments,["volume"]);this.input=this.output=new ze({context:this.context,gain:t.volume,units:"decibels"}),this.volume=this.output.gain,le(this,"volume"),this._unmutedVolume=t.volume,this.mute=t.mute}static getDefaults(){return Object.assign(Vt.getDefaults(),{mute:!1,volume:0})}get mute(){return this.volume.value===-1/0}set mute(t){!this.mute&&t?(this._unmutedVolume=this.volume.value,this.volume.value=-1/0):this.mute&&!t&&(this.volume.value=this._unmutedVolume)}dispose(){return super.dispose(),this.input.dispose(),this.volume.dispose(),this}}class fo extends Vt{constructor(){super(lt(fo.getDefaults(),arguments)),this.name="Destination",this.input=new Li({context:this.context}),this.output=new ze({context:this.context}),this.volume=this.input.volume;const t=lt(fo.getDefaults(),arguments);Ca(this.input,this.output,this.context.rawContext.destination),this.mute=t.mute,this._internalChannels=[this.input,this.context.rawContext.destination,this.output]}static getDefaults(){return Object.assign(Vt.getDefaults(),{mute:!1,volume:0})}get mute(){return this.input.mute}set mute(t){this.input.mute=t}chain(...t){return this.input.disconnect(),t.unshift(this.input),t.push(this.output),Ca(...t),this}get maxChannelCount(){return this.context.rawContext.destination.maxChannelCount}dispose(){return super.dispose(),this.volume.dispose(),this}}wo(s=>{s.destination=new fo({context:s})});To(s=>{s.destination.dispose()});class E_ extends $n{constructor(t){super(),this.name="TimelineValue",this._timeline=new In({memory:10}),this._initialValue=t}set(t,e){return this._timeline.add({value:t,time:e}),this}get(t){const e=this._timeline.get(t);return e?e.value:this._initialValue}}class ci{constructor(t,e){this.id=ci._eventId++;const n=Object.assign(ci.getDefaults(),e);this.transport=t,this.callback=n.callback,this._once=n.once,this.time=n.time}static getDefaults(){return{callback:jt,once:!1,time:0}}invoke(t){this.callback&&(this.callback(t),this._once&&this.transport.clear(this.id))}dispose(){return this.callback=void 0,this}}ci._eventId=0;class uc extends ci{constructor(t,e){super(t,e),this._currentId=-1,this._nextId=-1,this._nextTick=this.time,this._boundRestart=this._restart.bind(this);const n=Object.assign(uc.getDefaults(),e);this.duration=new ee(t.context,n.duration).valueOf(),this._interval=new ee(t.context,n.interval).valueOf(),this._nextTick=n.time,this.transport.on("start",this._boundRestart),this.transport.on("loopStart",this._boundRestart),this.context=this.transport.context,this._restart()}static getDefaults(){return Object.assign({},ci.getDefaults(),{duration:1/0,interval:1,once:!1})}invoke(t){this._createEvents(t),super.invoke(t)}_createEvents(t){const e=this.transport.getTicksAtTime(t);e>=this.time&&e>=this._nextTick&&this._nextTick+this._interval<this.time+this.duration&&(this._nextTick+=this._interval,this._currentId=this._nextId,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new ee(this.context,this._nextTick).toSeconds()))}_restart(t){this.transport.clear(this._currentId),this.transport.clear(this._nextId),this._nextTick=this.time;const e=this.transport.getTicksAtTime(t);e>this.time&&(this._nextTick=this.time+Math.ceil((e-this.time)/this._interval)*this._interval),this._currentId=this.transport.scheduleOnce(this.invoke.bind(this),new ee(this.context,this._nextTick).toSeconds()),this._nextTick+=this._interval,this._nextId=this.transport.scheduleOnce(this.invoke.bind(this),new ee(this.context,this._nextTick).toSeconds())}dispose(){return super.dispose(),this.transport.clear(this._currentId),this.transport.clear(this._nextId),this.transport.off("start",this._boundRestart),this.transport.off("loopStart",this._boundRestart),this}}let ah=class Da extends Le{constructor(){super(lt(Da.getDefaults(),arguments)),this.name="Transport",this._loop=new E_(!1),this._loopStart=0,this._loopEnd=0,this._scheduledEvents={},this._timeline=new In,this._repeatedEvents=new w_,this._syncedSignals=[],this._swingAmount=0;const t=lt(Da.getDefaults(),arguments);this._ppq=t.ppq,this._clock=new oh({callback:this._processTick.bind(this),context:this.context,frequency:0,units:"bpm"}),this._bindClockEvents(),this.bpm=this._clock.frequency,this._clock.frequency.multiplier=t.ppq,this.bpm.setValueAtTime(t.bpm,0),le(this,"bpm"),this._timeSignature=t.timeSignature,this._swingTicks=t.ppq/2}static getDefaults(){return Object.assign(Le.getDefaults(),{bpm:120,loopEnd:"4m",loopStart:0,ppq:192,swing:0,swingSubdivision:"8n",timeSignature:4})}_processTick(t,e){if(this._loop.get(t)&&e>=this._loopEnd&&(this.emit("loopEnd",t),this._clock.setTicksAtTime(this._loopStart,t),e=this._loopStart,this.emit("loopStart",t,this._clock.getSecondsAtTime(t)),this.emit("loop",t)),this._swingAmount>0&&e%this._ppq!==0&&e%(this._swingTicks*2)!==0){const n=e%(this._swingTicks*2)/(this._swingTicks*2),i=Math.sin(n*Math.PI)*this._swingAmount;t+=new ee(this.context,this._swingTicks*2/3).toSeconds()*i}this._timeline.forEachAtTime(e,n=>n.invoke(t))}schedule(t,e){const n=new ci(this,{callback:t,time:new hs(this.context,e).toTicks()});return this._addEvent(n,this._timeline)}scheduleRepeat(t,e,n,i=1/0){const r=new uc(this,{callback:t,duration:new cn(this.context,i).toTicks(),interval:new cn(this.context,e).toTicks(),time:new hs(this.context,n).toTicks()});return this._addEvent(r,this._repeatedEvents)}scheduleOnce(t,e){const n=new ci(this,{callback:t,once:!0,time:new hs(this.context,e).toTicks()});return this._addEvent(n,this._timeline)}clear(t){if(this._scheduledEvents.hasOwnProperty(t)){const e=this._scheduledEvents[t.toString()];e.timeline.remove(e.event),e.event.dispose(),delete this._scheduledEvents[t.toString()]}return this}_addEvent(t,e){return this._scheduledEvents[t.id.toString()]={event:t,timeline:e},e.add(t),t.id}cancel(t=0){const e=this.toTicks(t);return this._timeline.forEachFrom(e,n=>this.clear(n.id)),this._repeatedEvents.forEachFrom(e,n=>this.clear(n.id)),this}_bindClockEvents(){this._clock.on("start",(t,e)=>{e=new ee(this.context,e).toSeconds(),this.emit("start",t,e)}),this._clock.on("stop",t=>{this.emit("stop",t)}),this._clock.on("pause",t=>{this.emit("pause",t)})}get state(){return this._clock.getStateAtTime(this.now())}start(t,e){let n;return Nt(e)&&(n=this.toTicks(e)),this._clock.start(t,n),this}stop(t){return this._clock.stop(t),this}pause(t){return this._clock.pause(t),this}toggle(t){return t=this.toSeconds(t),this._clock.getStateAtTime(t)!=="started"?this.start(t):this.stop(t),this}get timeSignature(){return this._timeSignature}set timeSignature(t){He(t)&&(t=t[0]/t[1]*4),this._timeSignature=t}get loopStart(){return new cn(this.context,this._loopStart,"i").toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t)}get loopEnd(){return new cn(this.context,this._loopEnd,"i").toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t)}get loop(){return this._loop.get(this.now())}set loop(t){this._loop.set(t,this.now())}setLoopPoints(t,e){return this.loopStart=t,this.loopEnd=e,this}get swing(){return this._swingAmount}set swing(t){this._swingAmount=t}get swingSubdivision(){return new ee(this.context,this._swingTicks).toNotation()}set swingSubdivision(t){this._swingTicks=this.toTicks(t)}get position(){const t=this.now(),e=this._clock.getTicksAtTime(t);return new ee(this.context,e).toBarsBeatsSixteenths()}set position(t){const e=this.toTicks(t);this.ticks=e}get seconds(){return this._clock.seconds}set seconds(t){const e=this.now(),n=this._clock.frequency.timeToTicks(t,e);this.ticks=n}get progress(){if(this.loop){const t=this.now();return(this._clock.getTicksAtTime(t)-this._loopStart)/(this._loopEnd-this._loopStart)}else return 0}get ticks(){return this._clock.ticks}set ticks(t){if(this._clock.ticks!==t){const e=this.now();if(this.state==="started"){const n=this._clock.getTicksAtTime(e),i=this._clock.frequency.getDurationOfTicks(Math.ceil(n)-n,e),r=e+i;this.emit("stop",r),this._clock.setTicksAtTime(t,r),this.emit("start",r,this._clock.getSecondsAtTime(r))}else this._clock.setTicksAtTime(t,e)}}getTicksAtTime(t){return Math.round(this._clock.getTicksAtTime(t))}getSecondsAtTime(t){return this._clock.getSecondsAtTime(t)}get PPQ(){return this._clock.frequency.multiplier}set PPQ(t){this._clock.frequency.multiplier=t}nextSubdivision(t){if(t=this.toTicks(t),this.state!=="started")return 0;{const e=this.now(),n=this.getTicksAtTime(e),i=t-n%t;return this._clock.nextTickTime(i,e)}}syncSignal(t,e){if(!e){const i=this.now();if(t.getValueAtTime(i)!==0){const a=1/(60/this.bpm.getValueAtTime(i)/this.PPQ);e=t.getValueAtTime(i)/a}else e=0}const n=new ze(e);return this.bpm.connect(n),n.connect(t._param),this._syncedSignals.push({initial:t.value,ratio:n,signal:t}),t.value=0,this}unsyncSignal(t){for(let e=this._syncedSignals.length-1;e>=0;e--){const n=this._syncedSignals[e];n.signal===t&&(n.ratio.dispose(),n.signal.value=n.initial,this._syncedSignals.splice(e,1))}return this}dispose(){return super.dispose(),this._clock.dispose(),nh(this,"bpm"),this._timeline.dispose(),this._repeatedEvents.dispose(),this}};dr.mixin(ah);wo(s=>{s.transport=new ah({context:s})});To(s=>{s.transport.dispose()});let en=class extends Vt{constructor(t){super(t),this.input=void 0,this._state=new pr("stopped"),this._synced=!1,this._scheduled=[],this._syncedStart=jt,this._syncedStop=jt,this._state.memory=100,this._state.increasing=!0,this._volume=this.output=new Li({context:this.context,mute:t.mute,volume:t.volume}),this.volume=this._volume.volume,le(this,"volume"),this.onstop=t.onstop}static getDefaults(){return Object.assign(Vt.getDefaults(),{mute:!1,onstop:jt,volume:0})}get state(){return this._synced?this.context.transport.state==="started"?this._state.getValueAtTime(this.context.transport.seconds):"stopped":this._state.getValueAtTime(this.now())}get mute(){return this._volume.mute}set mute(t){this._volume.mute=t}_clampToCurrentTime(t){return this._synced?t:Math.max(t,this.context.currentTime)}start(t,e,n){let i=Je(t)&&this._synced?this.context.transport.seconds:this.toSeconds(t);if(i=this._clampToCurrentTime(i),!this._synced&&this._state.getValueAtTime(i)==="started")Pt(ao(i,this._state.get(i).time),"Start time must be strictly greater than previous start time"),this._state.cancel(i),this._state.setStateAtTime("started",i),this.log("restart",i),this.restart(i,e,n);else if(this.log("start",i),this._state.setStateAtTime("started",i),this._synced){const r=this._state.get(i);r&&(r.offset=this.toSeconds(An(e,0)),r.duration=n?this.toSeconds(n):void 0);const a=this.context.transport.schedule(o=>{this._start(o,e,n)},i);this._scheduled.push(a),this.context.transport.state==="started"&&this.context.transport.getSecondsAtTime(this.immediate())>i&&this._syncedStart(this.now(),this.context.transport.seconds)}else ju(this.context),this._start(i,e,n);return this}stop(t){let e=Je(t)&&this._synced?this.context.transport.seconds:this.toSeconds(t);if(e=this._clampToCurrentTime(e),this._state.getValueAtTime(e)==="started"||Nt(this._state.getNextState("started",e))){if(this.log("stop",e),!this._synced)this._stop(e);else{const n=this.context.transport.schedule(this._stop.bind(this),e);this._scheduled.push(n)}this._state.cancel(e),this._state.setStateAtTime("stopped",e)}return this}restart(t,e,n){return t=this.toSeconds(t),this._state.getValueAtTime(t)==="started"&&(this._state.cancel(t),this._restart(t,e,n)),this}sync(){return this._synced||(this._synced=!0,this._syncedStart=(t,e)=>{if(e>0){const n=this._state.get(e);if(n&&n.state==="started"&&n.time!==e){const i=e-this.toSeconds(n.time);let r;n.duration&&(r=this.toSeconds(n.duration)-i),this._start(t,this.toSeconds(n.offset)+i,r)}}},this._syncedStop=t=>{const e=this.context.transport.getSecondsAtTime(Math.max(t-this.sampleTime,0));this._state.getValueAtTime(e)==="started"&&this._stop(t)},this.context.transport.on("start",this._syncedStart),this.context.transport.on("loopStart",this._syncedStart),this.context.transport.on("stop",this._syncedStop),this.context.transport.on("pause",this._syncedStop),this.context.transport.on("loopEnd",this._syncedStop)),this}unsync(){return this._synced&&(this.context.transport.off("stop",this._syncedStop),this.context.transport.off("pause",this._syncedStop),this.context.transport.off("loopEnd",this._syncedStop),this.context.transport.off("start",this._syncedStart),this.context.transport.off("loopStart",this._syncedStart)),this._synced=!1,this._scheduled.forEach(t=>this.context.transport.clear(t)),this._scheduled=[],this._state.cancel(0),this._stop(0),this}dispose(){return super.dispose(),this.onstop=jt,this.unsync(),this._volume.dispose(),this._state.dispose(),this}};class Hs extends _s{constructor(){super(lt(Hs.getDefaults(),arguments,["url","onload"])),this.name="ToneBufferSource",this._source=this.context.createBufferSource(),this._internalChannels=[this._source],this._sourceStarted=!1,this._sourceStopped=!1;const t=lt(Hs.getDefaults(),arguments,["url","onload"]);Rs(this._source,this._gainNode),this._source.onended=()=>this._stopSource(),this.playbackRate=new ie({context:this.context,param:this._source.playbackRate,units:"positive",value:t.playbackRate}),this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this._buffer=new Kt(t.url,t.onload,t.onerror),this._internalChannels.push(this._source)}static getDefaults(){return Object.assign(_s.getDefaults(),{url:new Kt,loop:!1,loopEnd:0,loopStart:0,onload:jt,onerror:jt,playbackRate:1})}get fadeIn(){return this._fadeIn}set fadeIn(t){this._fadeIn=t}get fadeOut(){return this._fadeOut}set fadeOut(t){this._fadeOut=t}get curve(){return this._curve}set curve(t){this._curve=t}start(t,e,n,i=1){Pt(this.buffer.loaded,"buffer is either not set or not loaded");const r=this.toSeconds(t);this._startGain(r,i),this.loop?e=An(e,this.loopStart):e=An(e,0);let a=Math.max(this.toSeconds(e),0);if(this.loop){const o=this.toSeconds(this.loopEnd)||this.buffer.duration,c=this.toSeconds(this.loopStart),l=o-c;Ea(a,o)&&(a=(a-c)%l+c),pn(a,this.buffer.duration)&&(a=0)}if(this._source.buffer=this.buffer.get(),this._source.loopEnd=this.toSeconds(this.loopEnd)||this.buffer.duration,Ju(a,this.buffer.duration)&&(this._sourceStarted=!0,this._source.start(r,a)),Nt(n)){let o=this.toSeconds(n);o=Math.max(o,0),this.stop(r+o)}return this}_stopSource(t){!this._sourceStopped&&this._sourceStarted&&(this._sourceStopped=!0,this._source.stop(this.toSeconds(t)),this._onended())}get loopStart(){return this._source.loopStart}set loopStart(t){this._source.loopStart=this.toSeconds(t)}get loopEnd(){return this._source.loopEnd}set loopEnd(t){this._source.loopEnd=this.toSeconds(t)}get buffer(){return this._buffer}set buffer(t){this._buffer.set(t)}get loop(){return this._source.loop}set loop(t){this._source.loop=t,this._sourceStarted&&this.cancelStop()}dispose(){return super.dispose(),this._source.onended=null,this._source.disconnect(),this._buffer.dispose(),this.playbackRate.dispose(),this}}function Bi(s,t){return _e(this,void 0,void 0,function*(){const e=t/s.context.sampleRate,n=new rc(1,e,s.context.sampleRate);return new s.constructor(Object.assign(s.get(),{frequency:2/e,detune:0,context:n})).toDestination().start(0),(yield n.render()).getChannelData(0)})}class po extends _s{constructor(){super(lt(po.getDefaults(),arguments,["frequency","type"])),this.name="ToneOscillatorNode",this._oscillator=this.context.createOscillator(),this._internalChannels=[this._oscillator];const t=lt(po.getDefaults(),arguments,["frequency","type"]);Rs(this._oscillator,this._gainNode),this.type=t.type,this.frequency=new ie({context:this.context,param:this._oscillator.frequency,units:"frequency",value:t.frequency}),this.detune=new ie({context:this.context,param:this._oscillator.detune,units:"cents",value:t.detune}),le(this,["frequency","detune"])}static getDefaults(){return Object.assign(_s.getDefaults(),{detune:0,frequency:440,type:"sine"})}start(t){const e=this.toSeconds(t);return this.log("start",e),this._startGain(e),this._oscillator.start(e),this}_stopSource(t){this._oscillator.stop(t)}setPeriodicWave(t){return this._oscillator.setPeriodicWave(t),this}get type(){return this._oscillator.type}set type(t){this._oscillator.type=t}dispose(){return super.dispose(),this.state==="started"&&this.stop(),this._oscillator.disconnect(),this.frequency.dispose(),this.detune.dispose(),this}}class fe extends en{constructor(){super(lt(fe.getDefaults(),arguments,["frequency","type"])),this.name="Oscillator",this._oscillator=null;const t=lt(fe.getDefaults(),arguments,["frequency","type"]);this.frequency=new xe({context:this.context,units:"frequency",value:t.frequency}),le(this,"frequency"),this.detune=new xe({context:this.context,units:"cents",value:t.detune}),le(this,"detune"),this._partials=t.partials,this._partialCount=t.partialCount,this._type=t.type,t.partialCount&&t.type!=="custom"&&(this._type=this.baseType+t.partialCount.toString()),this.phase=t.phase}static getDefaults(){return Object.assign(en.getDefaults(),{detune:0,frequency:440,partialCount:0,partials:[],phase:0,type:"sine"})}_start(t){const e=this.toSeconds(t),n=new po({context:this.context,onended:()=>this.onstop(this)});this._oscillator=n,this._wave?this._oscillator.setPeriodicWave(this._wave):this._oscillator.type=this._type,this._oscillator.connect(this.output),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.start(e)}_stop(t){const e=this.toSeconds(t);this._oscillator&&this._oscillator.stop(e)}_restart(t){const e=this.toSeconds(t);return this.log("restart",e),this._oscillator&&this._oscillator.cancelStop(),this._state.cancel(e),this}syncFrequency(){return this.context.transport.syncSignal(this.frequency),this}unsyncFrequency(){return this.context.transport.unsyncSignal(this.frequency),this}_getCachedPeriodicWave(){if(this._type==="custom")return fe._periodicWaveCache.find(e=>e.phase===this._phase&&a_(e.partials,this._partials));{const t=fe._periodicWaveCache.find(e=>e.type===this._type&&e.phase===this._phase);return this._partialCount=t?t.partialCount:this._partialCount,t}}get type(){return this._type}set type(t){this._type=t;const e=["sine","square","sawtooth","triangle"].indexOf(t)!==-1;if(this._phase===0&&e)this._wave=void 0,this._partialCount=0,this._oscillator!==null&&(this._oscillator.type=t);else{const n=this._getCachedPeriodicWave();if(Nt(n)){const{partials:i,wave:r}=n;this._wave=r,this._partials=i,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave)}else{const[i,r]=this._getRealImaginary(t,this._phase),a=this.context.createPeriodicWave(i,r);this._wave=a,this._oscillator!==null&&this._oscillator.setPeriodicWave(this._wave),fe._periodicWaveCache.push({imag:r,partialCount:this._partialCount,partials:this._partials,phase:this._phase,real:i,type:this._type,wave:this._wave}),fe._periodicWaveCache.length>100&&fe._periodicWaveCache.shift()}}}get baseType(){return this._type.replace(this.partialCount.toString(),"")}set baseType(t){this.partialCount&&this._type!=="custom"&&t!=="custom"?this.type=t+this.partialCount:this.type=t}get partialCount(){return this._partialCount}set partialCount(t){ai(t,0);let e=this._type;const n=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(this._type);if(n&&(e=n[1]),this._type!=="custom")t===0?this.type=e:this.type=e+t.toString();else{const i=new Float32Array(t);this._partials.forEach((r,a)=>i[a]=r),this._partials=Array.from(i),this.type=this._type}}_getRealImaginary(t,e){let i=2048;const r=new Float32Array(i),a=new Float32Array(i);let o=1;if(t==="custom"){if(o=this._partials.length+1,this._partialCount=this._partials.length,i=o,this._partials.length===0)return[r,a]}else{const c=/^(sine|triangle|square|sawtooth)(\d+)$/.exec(t);c?(o=parseInt(c[2],10)+1,this._partialCount=parseInt(c[2],10),t=c[1],o=Math.max(o,2),i=o):this._partialCount=0,this._partials=[]}for(let c=1;c<i;++c){const l=2/(c*Math.PI);let u;switch(t){case"sine":u=c<=o?1:0,this._partials[c-1]=u;break;case"square":u=c&1?2*l:0,this._partials[c-1]=u;break;case"sawtooth":u=l*(c&1?1:-1),this._partials[c-1]=u;break;case"triangle":c&1?u=2*(l*l)*(c-1>>1&1?-1:1):u=0,this._partials[c-1]=u;break;case"custom":u=this._partials[c-1];break;default:throw new TypeError("Oscillator: invalid type: "+t)}u!==0?(r[c]=-u*Math.sin(e*c),a[c]=u*Math.cos(e*c)):(r[c]=0,a[c]=0)}return[r,a]}_inverseFFT(t,e,n){let i=0;const r=t.length;for(let a=0;a<r;a++)i+=t[a]*Math.cos(a*n)+e[a]*Math.sin(a*n);return i}getInitialValue(){const[t,e]=this._getRealImaginary(this._type,0);let n=0;const i=Math.PI*2,r=32;for(let a=0;a<r;a++)n=Math.max(this._inverseFFT(t,e,a/r*i),n);return l_(-this._inverseFFT(t,e,this._phase)/n,-1,1)}get partials(){return this._partials.slice(0,this.partialCount)}set partials(t){this._partials=t,this._partialCount=this._partials.length,t.length&&(this.type="custom")}get phase(){return this._phase*(180/Math.PI)}set phase(t){this._phase=t*Math.PI/180,this.type=this._type}asArray(t=1024){return _e(this,void 0,void 0,function*(){return Bi(this,t)})}dispose(){return super.dispose(),this._oscillator!==null&&this._oscillator.dispose(),this._wave=void 0,this.frequency.dispose(),this.detune.dispose(),this}}fe._periodicWaveCache=[];class Ao extends Vt{constructor(){super(Object.assign(lt(Ao.getDefaults(),arguments,["context"])))}connect(t,e=0,n=0){return cc(this,t,e,n),this}}class qs extends Ao{constructor(){super(Object.assign(lt(qs.getDefaults(),arguments,["mapping","length"]))),this.name="WaveShaper",this._shaper=this.context.createWaveShaper(),this.input=this._shaper,this.output=this._shaper;const t=lt(qs.getDefaults(),arguments,["mapping","length"]);He(t.mapping)||t.mapping instanceof Float32Array?this.curve=Float32Array.from(t.mapping):t_(t.mapping)&&this.setMap(t.mapping,t.length)}static getDefaults(){return Object.assign(xe.getDefaults(),{length:1024})}setMap(t,e=1024){const n=new Float32Array(e);for(let i=0,r=e;i<r;i++){const a=i/(r-1)*2-1;n[i]=t(a,i)}return this.curve=n,this}get curve(){return this._shaper.curve}set curve(t){this._shaper.curve=t}get oversample(){return this._shaper.oversample}set oversample(t){const e=["none","2x","4x"].some(n=>n.includes(t));Pt(e,"oversampling must be either 'none', '2x', or '4x'"),this._shaper.oversample=t}dispose(){return super.dispose(),this._shaper.disconnect(),this}}class A_ extends Ao{constructor(){super(...arguments),this.name="AudioToGain",this._norm=new qs({context:this.context,mapping:t=>(t+1)/2}),this.input=this._norm,this.output=this._norm}dispose(){return super.dispose(),this._norm.dispose(),this}}class Ii extends xe{constructor(){super(Object.assign(lt(Ii.getDefaults(),arguments,["value"]))),this.name="Multiply",this.override=!1;const t=lt(Ii.getDefaults(),arguments,["value"]);this._mult=this.input=this.output=new ze({context:this.context,minValue:t.minValue,maxValue:t.maxValue}),this.factor=this._param=this._mult.gain,this.factor.setValueAtTime(t.value,0)}static getDefaults(){return Object.assign(xe.getDefaults(),{value:0})}dispose(){return super.dispose(),this._mult.dispose(),this}}class Xs extends en{constructor(){super(lt(Xs.getDefaults(),arguments,["frequency","type","modulationType"])),this.name="AMOscillator",this._modulationScale=new A_({context:this.context}),this._modulationNode=new ze({context:this.context});const t=lt(Xs.getDefaults(),arguments,["frequency","type","modulationType"]);this._carrier=new fe({context:this.context,detune:t.detune,frequency:t.frequency,onstop:()=>this.onstop(this),phase:t.phase,type:t.type}),this.frequency=this._carrier.frequency,this.detune=this._carrier.detune,this._modulator=new fe({context:this.context,phase:t.phase,type:t.modulationType}),this.harmonicity=new Ii({context:this.context,units:"positive",value:t.harmonicity}),this.frequency.chain(this.harmonicity,this._modulator.frequency),this._modulator.chain(this._modulationScale,this._modulationNode.gain),this._carrier.chain(this._modulationNode,this.output),le(this,["frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(fe.getDefaults(),{harmonicity:1,modulationType:"square"})}_start(t){this._modulator.start(t),this._carrier.start(t)}_stop(t){this._modulator.stop(t),this._carrier.stop(t)}_restart(t){this._modulator.restart(t),this._carrier.restart(t)}get type(){return this._carrier.type}set type(t){this._carrier.type=t}get baseType(){return this._carrier.baseType}set baseType(t){this._carrier.baseType=t}get partialCount(){return this._carrier.partialCount}set partialCount(t){this._carrier.partialCount=t}get modulationType(){return this._modulator.type}set modulationType(t){this._modulator.type=t}get phase(){return this._carrier.phase}set phase(t){this._carrier.phase=t,this._modulator.phase=t}get partials(){return this._carrier.partials}set partials(t){this._carrier.partials=t}asArray(t=1024){return _e(this,void 0,void 0,function*(){return Bi(this,t)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this._modulationScale.dispose(),this}}class js extends en{constructor(){super(lt(js.getDefaults(),arguments,["frequency","type","modulationType"])),this.name="FMOscillator",this._modulationNode=new ze({context:this.context,gain:0});const t=lt(js.getDefaults(),arguments,["frequency","type","modulationType"]);this._carrier=new fe({context:this.context,detune:t.detune,frequency:0,onstop:()=>this.onstop(this),phase:t.phase,type:t.type}),this.detune=this._carrier.detune,this.frequency=new xe({context:this.context,units:"frequency",value:t.frequency}),this._modulator=new fe({context:this.context,phase:t.phase,type:t.modulationType}),this.harmonicity=new Ii({context:this.context,units:"positive",value:t.harmonicity}),this.modulationIndex=new Ii({context:this.context,units:"positive",value:t.modulationIndex}),this.frequency.connect(this._carrier.frequency),this.frequency.chain(this.harmonicity,this._modulator.frequency),this.frequency.chain(this.modulationIndex,this._modulationNode),this._modulator.connect(this._modulationNode.gain),this._modulationNode.connect(this._carrier.frequency),this._carrier.connect(this.output),this.detune.connect(this._modulator.detune),le(this,["modulationIndex","frequency","detune","harmonicity"])}static getDefaults(){return Object.assign(fe.getDefaults(),{harmonicity:1,modulationIndex:2,modulationType:"square"})}_start(t){this._modulator.start(t),this._carrier.start(t)}_stop(t){this._modulator.stop(t),this._carrier.stop(t)}_restart(t){return this._modulator.restart(t),this._carrier.restart(t),this}get type(){return this._carrier.type}set type(t){this._carrier.type=t}get baseType(){return this._carrier.baseType}set baseType(t){this._carrier.baseType=t}get partialCount(){return this._carrier.partialCount}set partialCount(t){this._carrier.partialCount=t}get modulationType(){return this._modulator.type}set modulationType(t){this._modulator.type=t}get phase(){return this._carrier.phase}set phase(t){this._carrier.phase=t,this._modulator.phase=t}get partials(){return this._carrier.partials}set partials(t){this._carrier.partials=t}asArray(t=1024){return _e(this,void 0,void 0,function*(){return Bi(this,t)})}dispose(){return super.dispose(),this.frequency.dispose(),this.harmonicity.dispose(),this._carrier.dispose(),this._modulator.dispose(),this._modulationNode.dispose(),this.modulationIndex.dispose(),this}}class vs extends en{constructor(){super(lt(vs.getDefaults(),arguments,["frequency","width"])),this.name="PulseOscillator",this._widthGate=new ze({context:this.context,gain:0}),this._thresh=new qs({context:this.context,mapping:e=>e<=0?-1:1});const t=lt(vs.getDefaults(),arguments,["frequency","width"]);this.width=new xe({context:this.context,units:"audioRange",value:t.width}),this._triangle=new fe({context:this.context,detune:t.detune,frequency:t.frequency,onstop:()=>this.onstop(this),phase:t.phase,type:"triangle"}),this.frequency=this._triangle.frequency,this.detune=this._triangle.detune,this._triangle.chain(this._thresh,this.output),this.width.chain(this._widthGate,this._thresh),le(this,["width","frequency","detune"])}static getDefaults(){return Object.assign(en.getDefaults(),{detune:0,frequency:440,phase:0,type:"pulse",width:.2})}_start(t){t=this.toSeconds(t),this._triangle.start(t),this._widthGate.gain.setValueAtTime(1,t)}_stop(t){t=this.toSeconds(t),this._triangle.stop(t),this._widthGate.gain.cancelScheduledValues(t),this._widthGate.gain.setValueAtTime(0,t)}_restart(t){this._triangle.restart(t),this._widthGate.gain.cancelScheduledValues(t),this._widthGate.gain.setValueAtTime(1,t)}get phase(){return this._triangle.phase}set phase(t){this._triangle.phase=t}get type(){return"pulse"}get baseType(){return"pulse"}get partials(){return[]}get partialCount(){return 0}set carrierType(t){this._triangle.type=t}asArray(t=1024){return _e(this,void 0,void 0,function*(){return Bi(this,t)})}dispose(){return super.dispose(),this._triangle.dispose(),this.width.dispose(),this._widthGate.dispose(),this._thresh.dispose(),this}}class Ys extends en{constructor(){super(lt(Ys.getDefaults(),arguments,["frequency","type","spread"])),this.name="FatOscillator",this._oscillators=[];const t=lt(Ys.getDefaults(),arguments,["frequency","type","spread"]);this.frequency=new xe({context:this.context,units:"frequency",value:t.frequency}),this.detune=new xe({context:this.context,units:"cents",value:t.detune}),this._spread=t.spread,this._type=t.type,this._phase=t.phase,this._partials=t.partials,this._partialCount=t.partialCount,this.count=t.count,le(this,["frequency","detune"])}static getDefaults(){return Object.assign(fe.getDefaults(),{count:3,spread:20,type:"sawtooth"})}_start(t){t=this.toSeconds(t),this._forEach(e=>e.start(t))}_stop(t){t=this.toSeconds(t),this._forEach(e=>e.stop(t))}_restart(t){this._forEach(e=>e.restart(t))}_forEach(t){for(let e=0;e<this._oscillators.length;e++)t(this._oscillators[e],e)}get type(){return this._type}set type(t){this._type=t,this._forEach(e=>e.type=t)}get spread(){return this._spread}set spread(t){if(this._spread=t,this._oscillators.length>1){const e=-t/2,n=t/(this._oscillators.length-1);this._forEach((i,r)=>i.detune.value=e+n*r)}}get count(){return this._oscillators.length}set count(t){if(ai(t,1),this._oscillators.length!==t){this._forEach(e=>e.dispose()),this._oscillators=[];for(let e=0;e<t;e++){const n=new fe({context:this.context,volume:-6-t*1.1,type:this._type,phase:this._phase+e/t*360,partialCount:this._partialCount,onstop:e===0?()=>this.onstop(this):jt});this.type==="custom"&&(n.partials=this._partials),this.frequency.connect(n.frequency),this.detune.connect(n.detune),n.detune.overridden=!1,n.connect(this.output),this._oscillators[e]=n}this.spread=this._spread,this.state==="started"&&this._forEach(e=>e.start())}}get phase(){return this._phase}set phase(t){this._phase=t,this._forEach((e,n)=>e.phase=this._phase+n/this.count*360)}get baseType(){return this._oscillators[0].baseType}set baseType(t){this._forEach(e=>e.baseType=t),this._type=this._oscillators[0].type}get partials(){return this._oscillators[0].partials}set partials(t){this._partials=t,this._partialCount=this._partials.length,t.length&&(this._type="custom",this._forEach(e=>e.partials=t))}get partialCount(){return this._oscillators[0].partialCount}set partialCount(t){this._partialCount=t,this._forEach(e=>e.partialCount=t),this._type=this._oscillators[0].type}asArray(t=1024){return _e(this,void 0,void 0,function*(){return Bi(this,t)})}dispose(){return super.dispose(),this.frequency.dispose(),this.detune.dispose(),this._forEach(t=>t.dispose()),this}}class $s extends en{constructor(){super(lt($s.getDefaults(),arguments,["frequency","modulationFrequency"])),this.name="PWMOscillator",this.sourceType="pwm",this._scale=new Ii({context:this.context,value:2});const t=lt($s.getDefaults(),arguments,["frequency","modulationFrequency"]);this._pulse=new vs({context:this.context,frequency:t.modulationFrequency}),this._pulse.carrierType="sine",this.modulationFrequency=this._pulse.frequency,this._modulator=new fe({context:this.context,detune:t.detune,frequency:t.frequency,onstop:()=>this.onstop(this),phase:t.phase}),this.frequency=this._modulator.frequency,this.detune=this._modulator.detune,this._modulator.chain(this._scale,this._pulse.width),this._pulse.connect(this.output),le(this,["modulationFrequency","frequency","detune"])}static getDefaults(){return Object.assign(en.getDefaults(),{detune:0,frequency:440,modulationFrequency:.4,phase:0,type:"pwm"})}_start(t){t=this.toSeconds(t),this._modulator.start(t),this._pulse.start(t)}_stop(t){t=this.toSeconds(t),this._modulator.stop(t),this._pulse.stop(t)}_restart(t){this._modulator.restart(t),this._pulse.restart(t)}get type(){return"pwm"}get baseType(){return"pwm"}get partials(){return[]}get partialCount(){return 0}get phase(){return this._modulator.phase}set phase(t){this._modulator.phase=t}asArray(t=1024){return _e(this,void 0,void 0,function*(){return Bi(this,t)})}dispose(){return super.dispose(),this._pulse.dispose(),this._scale.dispose(),this._modulator.dispose(),this}}const Uc={am:Xs,fat:Ys,fm:js,oscillator:fe,pulse:vs,pwm:$s};class Zs extends en{constructor(){super(lt(Zs.getDefaults(),arguments,["frequency","type"])),this.name="OmniOscillator";const t=lt(Zs.getDefaults(),arguments,["frequency","type"]);this.frequency=new xe({context:this.context,units:"frequency",value:t.frequency}),this.detune=new xe({context:this.context,units:"cents",value:t.detune}),le(this,["frequency","detune"]),this.set(t)}static getDefaults(){return Object.assign(fe.getDefaults(),js.getDefaults(),Xs.getDefaults(),Ys.getDefaults(),vs.getDefaults(),$s.getDefaults())}_start(t){this._oscillator.start(t)}_stop(t){this._oscillator.stop(t)}_restart(t){return this._oscillator.restart(t),this}get type(){let t="";return["am","fm","fat"].some(e=>this._sourceType===e)&&(t=this._sourceType),t+this._oscillator.type}set type(t){t.substr(0,2)==="fm"?(this._createNewOscillator("fm"),this._oscillator=this._oscillator,this._oscillator.type=t.substr(2)):t.substr(0,2)==="am"?(this._createNewOscillator("am"),this._oscillator=this._oscillator,this._oscillator.type=t.substr(2)):t.substr(0,3)==="fat"?(this._createNewOscillator("fat"),this._oscillator=this._oscillator,this._oscillator.type=t.substr(3)):t==="pwm"?(this._createNewOscillator("pwm"),this._oscillator=this._oscillator):t==="pulse"?this._createNewOscillator("pulse"):(this._createNewOscillator("oscillator"),this._oscillator=this._oscillator,this._oscillator.type=t)}get partials(){return this._oscillator.partials}set partials(t){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partials=t)}get partialCount(){return this._oscillator.partialCount}set partialCount(t){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&(this._oscillator.partialCount=t)}set(t){return Reflect.has(t,"type")&&t.type&&(this.type=t.type),super.set(t),this}_createNewOscillator(t){if(t!==this._sourceType){this._sourceType=t;const e=Uc[t],n=this.now();if(this._oscillator){const i=this._oscillator;i.stop(n),this.context.setTimeout(()=>i.dispose(),this.blockTime)}this._oscillator=new e({context:this.context}),this.frequency.connect(this._oscillator.frequency),this.detune.connect(this._oscillator.detune),this._oscillator.connect(this.output),this._oscillator.onstop=()=>this.onstop(this),this.state==="started"&&this._oscillator.start(n)}}get phase(){return this._oscillator.phase}set phase(t){this._oscillator.phase=t}get sourceType(){return this._sourceType}set sourceType(t){let e="sine";this._oscillator.type!=="pwm"&&this._oscillator.type!=="pulse"&&(e=this._oscillator.type),t==="fm"?this.type="fm"+e:t==="am"?this.type="am"+e:t==="fat"?this.type="fat"+e:t==="oscillator"?this.type=e:t==="pulse"?this.type="pulse":t==="pwm"&&(this.type="pwm")}_getOscType(t,e){return t instanceof Uc[e]}get baseType(){return this._oscillator.baseType}set baseType(t){!this._getOscType(this._oscillator,"pulse")&&!this._getOscType(this._oscillator,"pwm")&&t!=="pulse"&&t!=="pwm"&&(this._oscillator.baseType=t)}get width(){if(this._getOscType(this._oscillator,"pulse"))return this._oscillator.width}get count(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.count}set count(t){this._getOscType(this._oscillator,"fat")&&Xn(t)&&(this._oscillator.count=t)}get spread(){if(this._getOscType(this._oscillator,"fat"))return this._oscillator.spread}set spread(t){this._getOscType(this._oscillator,"fat")&&Xn(t)&&(this._oscillator.spread=t)}get modulationType(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.modulationType}set modulationType(t){(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))&&xn(t)&&(this._oscillator.modulationType=t)}get modulationIndex(){if(this._getOscType(this._oscillator,"fm"))return this._oscillator.modulationIndex}get harmonicity(){if(this._getOscType(this._oscillator,"fm")||this._getOscType(this._oscillator,"am"))return this._oscillator.harmonicity}get modulationFrequency(){if(this._getOscType(this._oscillator,"pwm"))return this._oscillator.modulationFrequency}asArray(t=1024){return _e(this,void 0,void 0,function*(){return Bi(this,t)})}dispose(){return super.dispose(),this.detune.dispose(),this.frequency.dispose(),this._oscillator.dispose(),this}}function ch(s,t=1/0){const e=new WeakMap;return function(n,i){Reflect.defineProperty(n,i,{configurable:!0,enumerable:!0,get:function(){return e.get(this)},set:function(r){ai(r,s,t),e.set(this,r)}})}}function Zn(s,t=1/0){const e=new WeakMap;return function(n,i){Reflect.defineProperty(n,i,{configurable:!0,enumerable:!0,get:function(){return e.get(this)},set:function(r){ai(this.toSeconds(r),s,t),e.set(this,r)}})}}class Ks extends en{constructor(){super(lt(Ks.getDefaults(),arguments,["url","onload"])),this.name="Player",this._activeSources=new Set;const t=lt(Ks.getDefaults(),arguments,["url","onload"]);this._buffer=new Kt({onload:this._onload.bind(this,t.onload),onerror:t.onerror,reverse:t.reverse,url:t.url}),this.autostart=t.autostart,this._loop=t.loop,this._loopStart=t.loopStart,this._loopEnd=t.loopEnd,this._playbackRate=t.playbackRate,this.fadeIn=t.fadeIn,this.fadeOut=t.fadeOut}static getDefaults(){return Object.assign(en.getDefaults(),{autostart:!1,fadeIn:0,fadeOut:0,loop:!1,loopEnd:0,loopStart:0,onload:jt,onerror:jt,playbackRate:1,reverse:!1})}load(t){return _e(this,void 0,void 0,function*(){return yield this._buffer.load(t),this._onload(),this})}_onload(t=jt){t(),this.autostart&&this.start()}_onSourceEnd(t){this.onstop(this),this._activeSources.delete(t),this._activeSources.size===0&&!this._synced&&this._state.getValueAtTime(this.now())==="started"&&(this._state.cancel(this.now()),this._state.setStateAtTime("stopped",this.now()))}start(t,e,n){return super.start(t,e,n),this}_start(t,e,n){this._loop?e=An(e,this._loopStart):e=An(e,0);const i=this.toSeconds(e),r=n;n=An(n,Math.max(this._buffer.duration-i,0));let a=this.toSeconds(n);a=a/this._playbackRate,t=this.toSeconds(t);const o=new Hs({url:this._buffer,context:this.context,fadeIn:this.fadeIn,fadeOut:this.fadeOut,loop:this._loop,loopEnd:this._loopEnd,loopStart:this._loopStart,onended:this._onSourceEnd.bind(this),playbackRate:this._playbackRate}).connect(this.output);!this._loop&&!this._synced&&(this._state.cancel(t+a),this._state.setStateAtTime("stopped",t+a,{implicitEnd:!0})),this._activeSources.add(o),this._loop&&Je(r)?o.start(t,i):o.start(t,i,a-this.toSeconds(this.fadeOut))}_stop(t){const e=this.toSeconds(t);this._activeSources.forEach(n=>n.stop(e))}restart(t,e,n){return super.restart(t,e,n),this}_restart(t,e,n){this._stop(t),this._start(t,e,n)}seek(t,e){const n=this.toSeconds(e);if(this._state.getValueAtTime(n)==="started"){const i=this.toSeconds(t);this._stop(n),this._start(n,i)}return this}setLoopPoints(t,e){return this.loopStart=t,this.loopEnd=e,this}get loopStart(){return this._loopStart}set loopStart(t){this._loopStart=t,this.buffer.loaded&&ai(this.toSeconds(t),0,this.buffer.duration),this._activeSources.forEach(e=>{e.loopStart=t})}get loopEnd(){return this._loopEnd}set loopEnd(t){this._loopEnd=t,this.buffer.loaded&&ai(this.toSeconds(t),0,this.buffer.duration),this._activeSources.forEach(e=>{e.loopEnd=t})}get buffer(){return this._buffer}set buffer(t){this._buffer.set(t)}get loop(){return this._loop}set loop(t){if(this._loop!==t&&(this._loop=t,this._activeSources.forEach(e=>{e.loop=t}),t)){const e=this._state.getNextState("stopped",this.now());e&&this._state.cancel(e.time)}}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t;const e=this.now(),n=this._state.getNextState("stopped",e);n&&n.implicitEnd&&(this._state.cancel(n.time),this._activeSources.forEach(i=>i.cancelStop())),this._activeSources.forEach(i=>{i.playbackRate.setValueAtTime(t,e)})}get reverse(){return this._buffer.reverse}set reverse(t){this._buffer.reverse=t}get loaded(){return this._buffer.loaded}dispose(){return super.dispose(),this._activeSources.forEach(t=>t.dispose()),this._activeSources.clear(),this._buffer.dispose(),this}}Mn([Zn(0)],Ks.prototype,"fadeIn",void 0);Mn([Zn(0)],Ks.prototype,"fadeOut",void 0);class jn extends Vt{constructor(){super(lt(jn.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="Envelope",this._sig=new xe({context:this.context,value:0}),this.output=this._sig,this.input=void 0;const t=lt(jn.getDefaults(),arguments,["attack","decay","sustain","release"]);this.attack=t.attack,this.decay=t.decay,this.sustain=t.sustain,this.release=t.release,this.attackCurve=t.attackCurve,this.releaseCurve=t.releaseCurve,this.decayCurve=t.decayCurve}static getDefaults(){return Object.assign(Vt.getDefaults(),{attack:.01,attackCurve:"linear",decay:.1,decayCurve:"exponential",release:1,releaseCurve:"exponential",sustain:.5})}get value(){return this.getValueAtTime(this.now())}_getCurve(t,e){if(xn(t))return t;{let n;for(n in br)if(br[n][e]===t)return n;return t}}_setCurve(t,e,n){if(xn(n)&&Reflect.has(br,n)){const i=br[n];si(i)?t!=="_decayCurve"&&(this[t]=i[e]):this[t]=i}else if(He(n)&&t!=="_decayCurve")this[t]=n;else throw new Error("Envelope: invalid curve: "+n)}get attackCurve(){return this._getCurve(this._attackCurve,"In")}set attackCurve(t){this._setCurve("_attackCurve","In",t)}get releaseCurve(){return this._getCurve(this._releaseCurve,"Out")}set releaseCurve(t){this._setCurve("_releaseCurve","Out",t)}get decayCurve(){return this._decayCurve}set decayCurve(t){Pt(["linear","exponential"].some(e=>e===t),`Invalid envelope curve: ${t}`),this._decayCurve=t}triggerAttack(t,e=1){this.log("triggerAttack",t,e),t=this.toSeconds(t);let i=this.toSeconds(this.attack);const r=this.toSeconds(this.decay),a=this.getValueAtTime(t);if(a>0){const o=1/i;i=(1-a)/o}if(i<this.sampleTime)this._sig.cancelScheduledValues(t),this._sig.setValueAtTime(e,t);else if(this._attackCurve==="linear")this._sig.linearRampTo(e,i,t);else if(this._attackCurve==="exponential")this._sig.targetRampTo(e,i,t);else{this._sig.cancelAndHoldAtTime(t);let o=this._attackCurve;for(let c=1;c<o.length;c++)if(o[c-1]<=a&&a<=o[c]){o=this._attackCurve.slice(c),o[0]=a;break}this._sig.setValueCurveAtTime(o,t,i,e)}if(r&&this.sustain<1){const o=e*this.sustain,c=t+i;this.log("decay",c),this._decayCurve==="linear"?this._sig.linearRampToValueAtTime(o,r+c):this._sig.exponentialApproachValueAtTime(o,c,r)}return this}triggerRelease(t){this.log("triggerRelease",t),t=this.toSeconds(t);const e=this.getValueAtTime(t);if(e>0){const n=this.toSeconds(this.release);n<this.sampleTime?this._sig.setValueAtTime(0,t):this._releaseCurve==="linear"?this._sig.linearRampTo(0,n,t):this._releaseCurve==="exponential"?this._sig.targetRampTo(0,n,t):(Pt(He(this._releaseCurve),"releaseCurve must be either 'linear', 'exponential' or an array"),this._sig.cancelAndHoldAtTime(t),this._sig.setValueCurveAtTime(this._releaseCurve,t,n,e))}return this}getValueAtTime(t){return this._sig.getValueAtTime(t)}triggerAttackRelease(t,e,n=1){return e=this.toSeconds(e),this.triggerAttack(e,n),this.triggerRelease(e+this.toSeconds(t)),this}cancel(t){return this._sig.cancelScheduledValues(this.toSeconds(t)),this}connect(t,e=0,n=0){return cc(this,t,e,n),this}asArray(t=1024){return _e(this,void 0,void 0,function*(){const e=t/this.context.sampleRate,n=new rc(1,e,this.context.sampleRate),i=this.toSeconds(this.attack)+this.toSeconds(this.decay),r=i+this.toSeconds(this.release),a=r*.1,o=r+a,c=new this.constructor(Object.assign(this.get(),{attack:e*this.toSeconds(this.attack)/o,decay:e*this.toSeconds(this.decay)/o,release:e*this.toSeconds(this.release)/o,context:n}));return c._sig.toDestination(),c.triggerAttackRelease(e*(i+a)/o,0),(yield n.render()).getChannelData(0)})}dispose(){return super.dispose(),this._sig.dispose(),this}}Mn([Zn(0)],jn.prototype,"attack",void 0);Mn([Zn(0)],jn.prototype,"decay",void 0);Mn([ch(0,1)],jn.prototype,"sustain",void 0);Mn([Zn(0)],jn.prototype,"release",void 0);const br=(()=>{let t,e;const n=[];for(t=0;t<128;t++)n[t]=Math.sin(t/(128-1)*(Math.PI/2));const i=[],r=6.4;for(t=0;t<128-1;t++){e=t/(128-1);const f=Math.sin(e*(Math.PI*2)*r-Math.PI/2)+1;i[t]=f/10+e*.83}i[128-1]=1;const a=[],o=5;for(t=0;t<128;t++)a[t]=Math.ceil(t/(128-1)*o)/o;const c=[];for(t=0;t<128;t++)e=t/(128-1),c[t]=.5*(1-Math.cos(Math.PI*e));const l=[];for(t=0;t<128;t++){e=t/(128-1);const f=Math.pow(e,3)*4+.2,p=Math.cos(f*Math.PI*2*e);l[t]=Math.abs(p*(1-e))}function u(f){const p=new Array(f.length);for(let g=0;g<f.length;g++)p[g]=1-f[g];return p}function h(f){return f.slice(0).reverse()}return{bounce:{In:u(l),Out:l},cosine:{In:n,Out:h(n)},exponential:"exponential",linear:"linear",ripple:{In:i,Out:u(i)},sine:{In:c,Out:u(c)},step:{In:a,Out:u(a)}}})();class Ni extends Vt{constructor(){super(lt(Ni.getDefaults(),arguments)),this._scheduledEvents=[],this._synced=!1,this._original_triggerAttack=this.triggerAttack,this._original_triggerRelease=this.triggerRelease;const t=lt(Ni.getDefaults(),arguments);this._volume=this.output=new Li({context:this.context,volume:t.volume}),this.volume=this._volume.volume,le(this,"volume")}static getDefaults(){return Object.assign(Vt.getDefaults(),{volume:0})}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",0)),this}_syncState(){let t=!1;return this._synced||(this._synced=!0,t=!0),t}_syncMethod(t,e){const n=this["_original_"+t]=this[t];this[t]=(...i)=>{const r=i[e],a=this.context.transport.schedule(o=>{i[e]=o,n.apply(this,i)},r);this._scheduledEvents.push(a)}}unsync(){return this._scheduledEvents.forEach(t=>this.context.transport.clear(t)),this._scheduledEvents=[],this._synced&&(this._synced=!1,this.triggerAttack=this._original_triggerAttack,this.triggerRelease=this._original_triggerRelease),this}triggerAttackRelease(t,e,n,i){const r=this.toSeconds(n),a=this.toSeconds(e);return this.triggerAttack(t,r,i),this.triggerRelease(r+a),this}dispose(){return super.dispose(),this._volume.dispose(),this.unsync(),this._scheduledEvents=[],this}}class Oi extends Ni{constructor(){super(lt(Oi.getDefaults(),arguments));const t=lt(Oi.getDefaults(),arguments);this.portamento=t.portamento,this.onsilence=t.onsilence}static getDefaults(){return Object.assign(Ni.getDefaults(),{detune:0,onsilence:jt,portamento:0})}triggerAttack(t,e,n=1){this.log("triggerAttack",t,e,n);const i=this.toSeconds(e);return this._triggerEnvelopeAttack(i,n),this.setNote(t,i),this}triggerRelease(t){this.log("triggerRelease",t);const e=this.toSeconds(t);return this._triggerEnvelopeRelease(e),this}setNote(t,e){const n=this.toSeconds(e),i=t instanceof ln?t.toFrequency():t;if(this.portamento>0&&this.getLevelAtTime(n)>.05){const r=this.toSeconds(this.portamento);this.frequency.exponentialRampTo(i,r,n)}else this.frequency.setValueAtTime(i,n);return this}}Mn([Zn(0)],Oi.prototype,"portamento",void 0);class hc extends jn{constructor(){super(lt(hc.getDefaults(),arguments,["attack","decay","sustain","release"])),this.name="AmplitudeEnvelope",this._gainNode=new ze({context:this.context,gain:0}),this.output=this._gainNode,this.input=this._gainNode,this._sig.connect(this._gainNode.gain),this.output=this._gainNode,this.input=this._gainNode}dispose(){return super.dispose(),this._gainNode.dispose(),this}}class li extends Oi{constructor(){super(lt(li.getDefaults(),arguments)),this.name="Synth";const t=lt(li.getDefaults(),arguments);this.oscillator=new Zs(Object.assign({context:this.context,detune:t.detune,onstop:()=>this.onsilence(this)},t.oscillator)),this.frequency=this.oscillator.frequency,this.detune=this.oscillator.detune,this.envelope=new hc(Object.assign({context:this.context},t.envelope)),this.oscillator.chain(this.envelope,this.output),le(this,["oscillator","frequency","detune","envelope"])}static getDefaults(){return Object.assign(Oi.getDefaults(),{envelope:Object.assign(Ta(jn.getDefaults(),Object.keys(Vt.getDefaults())),{attack:.005,decay:.1,release:1,sustain:.3}),oscillator:Object.assign(Ta(Zs.getDefaults(),[...Object.keys(en.getDefaults()),"frequency","detune"]),{type:"triangle"})})}_triggerEnvelopeAttack(t,e){if(this.envelope.triggerAttack(t,e),this.oscillator.start(t),this.envelope.sustain===0){const n=this.toSeconds(this.envelope.attack),i=this.toSeconds(this.envelope.decay);this.oscillator.stop(t+n+i)}}_triggerEnvelopeRelease(t){this.envelope.triggerRelease(t),this.oscillator.stop(t+this.toSeconds(this.envelope.release))}getLevelAtTime(t){return t=this.toSeconds(t),this.envelope.getValueAtTime(t)}dispose(){return super.dispose(),this.oscillator.dispose(),this.envelope.dispose(),this}}class Js extends li{constructor(){super(lt(Js.getDefaults(),arguments)),this.name="MembraneSynth",this.portamento=0;const t=lt(Js.getDefaults(),arguments);this.pitchDecay=t.pitchDecay,this.octaves=t.octaves,le(this,["oscillator","envelope"])}static getDefaults(){return ls(Oi.getDefaults(),li.getDefaults(),{envelope:{attack:.001,attackCurve:"exponential",decay:.4,release:1.4,sustain:.01},octaves:10,oscillator:{type:"sine"},pitchDecay:.05})}setNote(t,e){const n=this.toSeconds(e),i=this.toFrequency(t instanceof ln?t.toFrequency():t),r=i*this.octaves;return this.oscillator.frequency.setValueAtTime(r,n),this.oscillator.frequency.exponentialRampToValueAtTime(i,n+this.toSeconds(this.pitchDecay)),this}dispose(){return super.dispose(),this}}Mn([ch(0)],Js.prototype,"octaves",void 0);Mn([Zn(0)],Js.prototype,"pitchDecay",void 0);const lh=new Set;function dc(s){lh.add(s)}function uh(s,t){const e=`registerProcessor("${s}", ${t})`;lh.add(e)}const C_=`
	/**
	 * The base AudioWorkletProcessor for use in Tone.js. Works with the [[ToneAudioWorklet]]. 
	 */
	class ToneAudioWorkletProcessor extends AudioWorkletProcessor {

		constructor(options) {
			
			super(options);
			/**
			 * If the processor was disposed or not. Keep alive until it's disposed.
			 */
			this.disposed = false;
		   	/** 
			 * The number of samples in the processing block
			 */
			this.blockSize = 128;
			/**
			 * the sample rate
			 */
			this.sampleRate = sampleRate;

			this.port.onmessage = (event) => {
				// when it receives a dispose 
				if (event.data === "dispose") {
					this.disposed = true;
				}
			};
		}
	}
`;dc(C_);const R_=`
	/**
	 * Abstract class for a single input/output processor. 
	 * has a 'generate' function which processes one sample at a time
	 */
	class SingleIOProcessor extends ToneAudioWorkletProcessor {

		constructor(options) {
			super(Object.assign(options, {
				numberOfInputs: 1,
				numberOfOutputs: 1
			}));
			/**
			 * Holds the name of the parameter and a single value of that
			 * parameter at the current sample
			 * @type { [name: string]: number }
			 */
			this.params = {}
		}

		/**
		 * Generate an output sample from the input sample and parameters
		 * @abstract
		 * @param input number
		 * @param channel number
		 * @param parameters { [name: string]: number }
		 * @returns number
		 */
		generate(){}

		/**
		 * Update the private params object with the 
		 * values of the parameters at the given index
		 * @param parameters { [name: string]: Float32Array },
		 * @param index number
		 */
		updateParams(parameters, index) {
			for (const paramName in parameters) {
				const param = parameters[paramName];
				if (param.length > 1) {
					this.params[paramName] = parameters[paramName][index];
				} else {
					this.params[paramName] = parameters[paramName][0];
				}
			}
		}

		/**
		 * Process a single frame of the audio
		 * @param inputs Float32Array[][]
		 * @param outputs Float32Array[][]
		 */
		process(inputs, outputs, parameters) {
			const input = inputs[0];
			const output = outputs[0];
			// get the parameter values
			const channelCount = Math.max(input && input.length || 0, output.length);
			for (let sample = 0; sample < this.blockSize; sample++) {
				this.updateParams(parameters, sample);
				for (let channel = 0; channel < channelCount; channel++) {
					const inputSample = input && input.length ? input[channel][sample] : 0;
					output[channel][sample] = this.generate(inputSample, channel, this.params);
				}
			}
			return !this.disposed;
		}
	};
`;dc(R_);const D_=`
	/**
	 * A multichannel buffer for use within an AudioWorkletProcessor as a delay line
	 */
	class DelayLine {
		
		constructor(size, channels) {
			this.buffer = [];
			this.writeHead = []
			this.size = size;

			// create the empty channels
			for (let i = 0; i < channels; i++) {
				this.buffer[i] = new Float32Array(this.size);
				this.writeHead[i] = 0;
			}
		}

		/**
		 * Push a value onto the end
		 * @param channel number
		 * @param value number
		 */
		push(channel, value) {
			this.writeHead[channel] += 1;
			if (this.writeHead[channel] > this.size) {
				this.writeHead[channel] = 0;
			}
			this.buffer[channel][this.writeHead[channel]] = value;
		}

		/**
		 * Get the recorded value of the channel given the delay
		 * @param channel number
		 * @param delay number delay samples
		 */
		get(channel, delay) {
			let readHead = this.writeHead[channel] - Math.floor(delay);
			if (readHead < 0) {
				readHead += this.size;
			}
			return this.buffer[channel][readHead];
		}
	}
`;dc(D_);const P_="feedback-comb-filter",L_=`
	class FeedbackCombFilterWorklet extends SingleIOProcessor {

		constructor(options) {
			super(options);
			this.delayLine = new DelayLine(this.sampleRate, options.channelCount || 2);
		}

		static get parameterDescriptors() {
			return [{
				name: "delayTime",
				defaultValue: 0.1,
				minValue: 0,
				maxValue: 1,
				automationRate: "k-rate"
			}, {
				name: "feedback",
				defaultValue: 0.5,
				minValue: 0,
				maxValue: 0.9999,
				automationRate: "k-rate"
			}];
		}

		generate(input, channel, parameters) {
			const delayedSample = this.delayLine.get(channel, parameters.delayTime * this.sampleRate);
			this.delayLine.push(channel, input + delayedSample * parameters.feedback);
			return delayedSample;
		}
	}
`;uh(P_,L_);class Qs extends Ni{constructor(){super(lt(Qs.getDefaults(),arguments,["urls","onload","baseUrl"],"urls")),this.name="Sampler",this._activeSources=new Map;const t=lt(Qs.getDefaults(),arguments,["urls","onload","baseUrl"],"urls"),e={};Object.keys(t.urls).forEach(n=>{const i=parseInt(n,10);if(Pt(Mr(n)||Xn(i)&&isFinite(i),`url key is neither a note or midi pitch: ${n}`),Mr(n)){const r=new ln(this.context,n).toMidi();e[r]=t.urls[n]}else Xn(i)&&isFinite(i)&&(e[i]=t.urls[i])}),this._buffers=new lc({urls:e,onload:t.onload,baseUrl:t.baseUrl,onerror:t.onerror}),this.attack=t.attack,this.release=t.release,this.curve=t.curve,this._buffers.loaded&&Promise.resolve().then(t.onload)}static getDefaults(){return Object.assign(Ni.getDefaults(),{attack:0,baseUrl:"",curve:"exponential",onload:jt,onerror:jt,release:.1,urls:{}})}_findClosest(t){let n=0;for(;n<96;){if(this._buffers.has(t+n))return-n;if(this._buffers.has(t-n))return n;n++}throw new Error(`No available buffers for note: ${t}`)}triggerAttack(t,e,n=1){return this.log("triggerAttack",t,e,n),Array.isArray(t)||(t=[t]),t.forEach(i=>{const r=rh(new ln(this.context,i).toFrequency()),a=Math.round(r),o=r-a,c=this._findClosest(a),l=a-c,u=this._buffers.get(l),h=sh(c+o),f=new Hs({url:u,context:this.context,curve:this.curve,fadeIn:this.attack,fadeOut:this.release,playbackRate:h}).connect(this.output);f.start(e,0,u.duration/h,n),He(this._activeSources.get(a))||this._activeSources.set(a,[]),this._activeSources.get(a).push(f),f.onended=()=>{if(this._activeSources&&this._activeSources.has(a)){const p=this._activeSources.get(a),g=p.indexOf(f);g!==-1&&p.splice(g,1)}}}),this}triggerRelease(t,e){return this.log("triggerRelease",t,e),Array.isArray(t)||(t=[t]),t.forEach(n=>{const i=new ln(this.context,n).toMidi();if(this._activeSources.has(i)&&this._activeSources.get(i).length){const r=this._activeSources.get(i);e=this.toSeconds(e),r.forEach(a=>{a.stop(e)}),this._activeSources.set(i,[])}}),this}releaseAll(t){const e=this.toSeconds(t);return this._activeSources.forEach(n=>{for(;n.length;)n.shift().stop(e)}),this}sync(){return this._syncState()&&(this._syncMethod("triggerAttack",1),this._syncMethod("triggerRelease",1)),this}triggerAttackRelease(t,e,n,i=1){const r=this.toSeconds(n);return this.triggerAttack(t,r,i),He(e)?(Pt(He(t),"notes must be an array when duration is array"),t.forEach((a,o)=>{const c=e[Math.min(o,e.length-1)];this.triggerRelease(a,r+this.toSeconds(c))})):this.triggerRelease(t,r+this.toSeconds(e)),this}add(t,e,n){if(Pt(Mr(t)||isFinite(t),`note must be a pitch or midi: ${t}`),Mr(t)){const i=new ln(this.context,t).toMidi();this._buffers.add(i,e,n)}else this._buffers.add(t,e,n);return this}get loaded(){return this._buffers.loaded}dispose(){return super.dispose(),this._buffers.dispose(),this._activeSources.forEach(t=>{t.forEach(e=>e.dispose())}),this._activeSources.clear(),this}}Mn([Zn(0)],Qs.prototype,"attack",void 0);Mn([Zn(0)],Qs.prototype,"release",void 0);class Gn extends Le{constructor(){super(lt(Gn.getDefaults(),arguments,["callback","value"])),this.name="ToneEvent",this._state=new pr("stopped"),this._startOffset=0;const t=lt(Gn.getDefaults(),arguments,["callback","value"]);this._loop=t.loop,this.callback=t.callback,this.value=t.value,this._loopStart=this.toTicks(t.loopStart),this._loopEnd=this.toTicks(t.loopEnd),this._playbackRate=t.playbackRate,this._probability=t.probability,this._humanize=t.humanize,this.mute=t.mute,this._playbackRate=t.playbackRate,this._state.increasing=!0,this._rescheduleEvents()}static getDefaults(){return Object.assign(Le.getDefaults(),{callback:jt,humanize:!1,loop:!1,loopEnd:"1m",loopStart:0,mute:!1,playbackRate:1,probability:1,value:null})}_rescheduleEvents(t=-1){this._state.forEachFrom(t,e=>{let n;if(e.state==="started"){e.id!==-1&&this.context.transport.clear(e.id);const i=e.time+Math.round(this.startOffset/this._playbackRate);if(this._loop===!0||Xn(this._loop)&&this._loop>1){n=1/0,Xn(this._loop)&&(n=this._loop*this._getLoopDuration());const r=this._state.getAfter(i);r!==null&&(n=Math.min(n,r.time-i)),n!==1/0&&(this._state.setStateAtTime("stopped",i+n+1,{id:-1}),n=new ee(this.context,n));const a=new ee(this.context,this._getLoopDuration());e.id=this.context.transport.scheduleRepeat(this._tick.bind(this),a,new ee(this.context,i),n)}else e.id=this.context.transport.schedule(this._tick.bind(this),new ee(this.context,i))}})}get state(){return this._state.getValueAtTime(this.context.transport.ticks)}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t}get probability(){return this._probability}set probability(t){this._probability=t}get humanize(){return this._humanize}set humanize(t){this._humanize=t}start(t){const e=this.toTicks(t);return this._state.getValueAtTime(e)==="stopped"&&(this._state.add({id:-1,state:"started",time:e}),this._rescheduleEvents(e)),this}stop(t){this.cancel(t);const e=this.toTicks(t);if(this._state.getValueAtTime(e)==="started"){this._state.setStateAtTime("stopped",e,{id:-1});const n=this._state.getBefore(e);let i=e;n!==null&&(i=n.time),this._rescheduleEvents(i)}return this}cancel(t){t=An(t,-1/0);const e=this.toTicks(t);return this._state.forEachFrom(e,n=>{this.context.transport.clear(n.id)}),this._state.cancel(e),this}_tick(t){const e=this.context.transport.getTicksAtTime(t);if(!this.mute&&this._state.getValueAtTime(e)==="started"){if(this.probability<1&&Math.random()>this.probability)return;if(this.humanize){let n=.02;Zu(this.humanize)||(n=this.toSeconds(this.humanize)),t+=(Math.random()*2-1)*n}this.callback(t,this.value)}}_getLoopDuration(){return Math.round((this._loopEnd-this._loopStart)/this._playbackRate)}get loop(){return this._loop}set loop(t){this._loop=t,this._rescheduleEvents()}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._rescheduleEvents()}get loopEnd(){return new ee(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._rescheduleEvents()}get loopStart(){return new ee(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._rescheduleEvents()}get progress(){if(this._loop){const t=this.context.transport.ticks,e=this._state.get(t);if(e!==null&&e.state==="started"){const n=this._getLoopDuration();return(t-e.time)%n/n}else return 0}else return 0}dispose(){return super.dispose(),this.cancel(),this._state.dispose(),this}}class zs extends Gn{constructor(){super(lt(zs.getDefaults(),arguments,["callback","events"])),this.name="Part",this._state=new pr("stopped"),this._events=new Set;const t=lt(zs.getDefaults(),arguments,["callback","events"]);this._state.increasing=!0,t.events.forEach(e=>{He(e)?this.add(e[0],e[1]):this.add(e)})}static getDefaults(){return Object.assign(Gn.getDefaults(),{events:[]})}start(t,e){const n=this.toTicks(t);if(this._state.getValueAtTime(n)!=="started"){e=An(e,this._loop?this._loopStart:0),this._loop?e=An(e,this._loopStart):e=An(e,0);const i=this.toTicks(e);this._state.add({id:-1,offset:i,state:"started",time:n}),this._forEach(r=>{this._startNote(r,n,i)})}return this}_startNote(t,e,n){e-=n,this._loop?t.startOffset>=this._loopStart&&t.startOffset<this._loopEnd?(t.startOffset<n&&(e+=this._getLoopDuration()),t.start(new ee(this.context,e))):t.startOffset<this._loopStart&&t.startOffset>=n&&(t.loop=!1,t.start(new ee(this.context,e))):t.startOffset>=n&&t.start(new ee(this.context,e))}get startOffset(){return this._startOffset}set startOffset(t){this._startOffset=t,this._forEach(e=>{e.startOffset+=this._startOffset})}stop(t){const e=this.toTicks(t);return this._state.cancel(e),this._state.setStateAtTime("stopped",e),this._forEach(n=>{n.stop(t)}),this}at(t,e){const n=new hs(this.context,t).toTicks(),i=new ee(this.context,1).toSeconds(),r=this._events.values();let a=r.next();for(;!a.done;){const o=a.value;if(Math.abs(n-o.startOffset)<i)return Nt(e)&&(o.value=e),o;a=r.next()}return Nt(e)?(this.add(t,e),this.at(t)):null}add(t,e){t instanceof Object&&Reflect.has(t,"time")&&(e=t,t=e.time);const n=this.toTicks(t);let i;return e instanceof Gn?(i=e,i.callback=this._tick.bind(this)):i=new Gn({callback:this._tick.bind(this),context:this.context,value:e}),i.startOffset=n,i.set({humanize:this.humanize,loop:this.loop,loopEnd:this.loopEnd,loopStart:this.loopStart,playbackRate:this.playbackRate,probability:this.probability}),this._events.add(i),this._restartEvent(i),this}_restartEvent(t){this._state.forEach(e=>{e.state==="started"?this._startNote(t,e.time,e.offset):t.stop(new ee(this.context,e.time))})}remove(t,e){return si(t)&&t.hasOwnProperty("time")&&(e=t,t=e.time),t=this.toTicks(t),this._events.forEach(n=>{n.startOffset===t&&(Je(e)||Nt(e)&&n.value===e)&&(this._events.delete(n),n.dispose())}),this}clear(){return this._forEach(t=>t.dispose()),this._events.clear(),this}cancel(t){return this._forEach(e=>e.cancel(t)),this._state.cancel(this.toTicks(t)),this}_forEach(t){return this._events&&this._events.forEach(e=>{e instanceof zs?e._forEach(t):t(e)}),this}_setAll(t,e){this._forEach(n=>{n[t]=e})}_tick(t,e){this.mute||this.callback(t,e)}_testLoopBoundries(t){this._loop&&(t.startOffset<this._loopStart||t.startOffset>=this._loopEnd)?t.cancel(0):t.state==="stopped"&&this._restartEvent(t)}get probability(){return this._probability}set probability(t){this._probability=t,this._setAll("probability",t)}get humanize(){return this._humanize}set humanize(t){this._humanize=t,this._setAll("humanize",t)}get loop(){return this._loop}set loop(t){this._loop=t,this._forEach(e=>{e.loopStart=this.loopStart,e.loopEnd=this.loopEnd,e.loop=t,this._testLoopBoundries(e)})}get loopEnd(){return new ee(this.context,this._loopEnd).toSeconds()}set loopEnd(t){this._loopEnd=this.toTicks(t),this._loop&&this._forEach(e=>{e.loopEnd=t,this._testLoopBoundries(e)})}get loopStart(){return new ee(this.context,this._loopStart).toSeconds()}set loopStart(t){this._loopStart=this.toTicks(t),this._loop&&this._forEach(e=>{e.loopStart=this.loopStart,this._testLoopBoundries(e)})}get playbackRate(){return this._playbackRate}set playbackRate(t){this._playbackRate=t,this._setAll("playbackRate",t)}get length(){return this._events.size}dispose(){return super.dispose(),this.clear(),this}}class xs extends Gn{constructor(){super(lt(xs.getDefaults(),arguments,["callback","events","subdivision"])),this.name="Sequence",this._part=new zs({callback:this._seqCallback.bind(this),context:this.context}),this._events=[],this._eventsArray=[];const t=lt(xs.getDefaults(),arguments,["callback","events","subdivision"]);this._subdivision=this.toTicks(t.subdivision),this.events=t.events,this.loop=t.loop,this.loopStart=t.loopStart,this.loopEnd=t.loopEnd,this.playbackRate=t.playbackRate,this.probability=t.probability,this.humanize=t.humanize,this.mute=t.mute,this.playbackRate=t.playbackRate}static getDefaults(){return Object.assign(Ta(Gn.getDefaults(),["value"]),{events:[],loop:!0,loopEnd:0,loopStart:0,subdivision:"8n"})}_seqCallback(t,e){e!==null&&this.callback(t,e)}get events(){return this._events}set events(t){this.clear(),this._eventsArray=t,this._events=this._createSequence(this._eventsArray),this._eventsUpdated()}start(t,e){return this._part.start(t,e&&this._indexTime(e)),this}stop(t){return this._part.stop(t),this}get subdivision(){return new ee(this.context,this._subdivision).toSeconds()}_createSequence(t){return new Proxy(t,{get:(e,n)=>e[n],set:(e,n,i)=>(xn(n)&&isFinite(parseInt(n,10))&&He(i)?e[n]=this._createSequence(i):e[n]=i,this._eventsUpdated(),!0)})}_eventsUpdated(){this._part.clear(),this._rescheduleSequence(this._eventsArray,this._subdivision,this.startOffset),this.loopEnd=this.loopEnd}_rescheduleSequence(t,e,n){t.forEach((i,r)=>{const a=r*e+n;if(He(i))this._rescheduleSequence(i,e/i.length,a);else{const o=new ee(this.context,a,"i").toSeconds();this._part.add(o,i)}})}_indexTime(t){return new ee(this.context,t*this._subdivision+this.startOffset).toSeconds()}clear(){return this._part.clear(),this}dispose(){return super.dispose(),this._part.dispose(),this}get loop(){return this._part.loop}set loop(t){this._part.loop=t}get loopStart(){return this._loopStart}set loopStart(t){this._loopStart=t,this._part.loopStart=this._indexTime(t)}get loopEnd(){return this._loopEnd}set loopEnd(t){this._loopEnd=t,t===0?this._part.loopEnd=this._indexTime(this._eventsArray.length):this._part.loopEnd=this._indexTime(t)}get startOffset(){return this._part.startOffset}set startOffset(t){this._part.startOffset=t}get playbackRate(){return this._part.playbackRate}set playbackRate(t){this._part.playbackRate=t}get probability(){return this._part.probability}set probability(t){this._part.probability=t}get progress(){return this._part.progress}get humanize(){return this._part.humanize}set humanize(t){this._part.humanize=t}get length(){return this._part.length}}class mo extends Vt{constructor(){super(Object.assign(lt(mo.getDefaults(),arguments,["pan"]))),this.name="Panner",this._panner=this.context.createStereoPanner(),this.input=this._panner,this.output=this._panner;const t=lt(mo.getDefaults(),arguments,["pan"]);this.pan=new ie({context:this.context,param:this._panner.pan,value:t.pan,minValue:-1,maxValue:1}),this._panner.channelCount=t.channelCount,this._panner.channelCountMode="explicit",le(this,"pan")}static getDefaults(){return Object.assign(Vt.getDefaults(),{pan:0,channelCount:1})}dispose(){return super.dispose(),this._panner.disconnect(),this.pan.dispose(),this}}const I_="bit-crusher",N_=`
	class BitCrusherWorklet extends SingleIOProcessor {

		static get parameterDescriptors() {
			return [{
				name: "bits",
				defaultValue: 12,
				minValue: 1,
				maxValue: 16,
				automationRate: 'k-rate'
			}];
		}

		generate(input, _channel, parameters) {
			const step = Math.pow(0.5, parameters.bits - 1);
			const val = step * Math.floor(input / step + 0.5);
			return val;
		}
	}
`;uh(I_,N_);class de extends Vt{constructor(){super(lt(de.getDefaults(),arguments,["solo"])),this.name="Solo";const t=lt(de.getDefaults(),arguments,["solo"]);this.input=this.output=new ze({context:this.context}),de._allSolos.has(this.context)||de._allSolos.set(this.context,new Set),de._allSolos.get(this.context).add(this),this.solo=t.solo}static getDefaults(){return Object.assign(Vt.getDefaults(),{solo:!1})}get solo(){return this._isSoloed()}set solo(t){t?this._addSolo():this._removeSolo(),de._allSolos.get(this.context).forEach(e=>e._updateSolo())}get muted(){return this.input.gain.value===0}_addSolo(){de._soloed.has(this.context)||de._soloed.set(this.context,new Set),de._soloed.get(this.context).add(this)}_removeSolo(){de._soloed.has(this.context)&&de._soloed.get(this.context).delete(this)}_isSoloed(){return de._soloed.has(this.context)&&de._soloed.get(this.context).has(this)}_noSolos(){return!de._soloed.has(this.context)||de._soloed.has(this.context)&&de._soloed.get(this.context).size===0}_updateSolo(){this._isSoloed()?this.input.gain.value=1:this._noSolos()?this.input.gain.value=1:this.input.gain.value=0}dispose(){return super.dispose(),de._allSolos.get(this.context).delete(this),this._removeSolo(),this}}de._allSolos=new Map;de._soloed=new Map;class go extends Vt{constructor(){super(lt(go.getDefaults(),arguments,["pan","volume"])),this.name="PanVol";const t=lt(go.getDefaults(),arguments,["pan","volume"]);this._panner=this.input=new mo({context:this.context,pan:t.pan,channelCount:t.channelCount}),this.pan=this._panner.pan,this._volume=this.output=new Li({context:this.context,volume:t.volume}),this.volume=this._volume.volume,this._panner.connect(this._volume),this.mute=t.mute,le(this,["pan","volume"])}static getDefaults(){return Object.assign(Vt.getDefaults(),{mute:!1,pan:0,volume:0,channelCount:1})}get mute(){return this._volume.mute}set mute(t){this._volume.mute=t}dispose(){return super.dispose(),this._panner.dispose(),this.pan.dispose(),this._volume.dispose(),this.volume.dispose(),this}}class bi extends Vt{constructor(){super(lt(bi.getDefaults(),arguments,["volume","pan"])),this.name="Channel";const t=lt(bi.getDefaults(),arguments,["volume","pan"]);this._solo=this.input=new de({solo:t.solo,context:this.context}),this._panVol=this.output=new go({context:this.context,pan:t.pan,volume:t.volume,mute:t.mute,channelCount:t.channelCount}),this.pan=this._panVol.pan,this.volume=this._panVol.volume,this._solo.connect(this._panVol),le(this,["pan","volume"])}static getDefaults(){return Object.assign(Vt.getDefaults(),{pan:0,volume:0,mute:!1,solo:!1,channelCount:1})}get solo(){return this._solo.solo}set solo(t){this._solo.solo=t}get muted(){return this._solo.muted||this.mute}get mute(){return this._panVol.mute}set mute(t){this._panVol.mute=t}_getBus(t){return bi.buses.has(t)||bi.buses.set(t,new ze({context:this.context})),bi.buses.get(t)}send(t,e=0){const n=this._getBus(t),i=new ze({context:this.context,units:"decibels",gain:e});return this.connect(i),i.connect(n),i}receive(t){return this._getBus(t).connect(this),this}dispose(){return super.dispose(),this._panVol.dispose(),this.pan.dispose(),this.volume.dispose(),this._solo.dispose(),this}}bi.buses=new Map;class O_ extends Vt{constructor(){super(...arguments),this.name="Listener",this.positionX=new ie({context:this.context,param:this.context.rawContext.listener.positionX}),this.positionY=new ie({context:this.context,param:this.context.rawContext.listener.positionY}),this.positionZ=new ie({context:this.context,param:this.context.rawContext.listener.positionZ}),this.forwardX=new ie({context:this.context,param:this.context.rawContext.listener.forwardX}),this.forwardY=new ie({context:this.context,param:this.context.rawContext.listener.forwardY}),this.forwardZ=new ie({context:this.context,param:this.context.rawContext.listener.forwardZ}),this.upX=new ie({context:this.context,param:this.context.rawContext.listener.upX}),this.upY=new ie({context:this.context,param:this.context.rawContext.listener.upY}),this.upZ=new ie({context:this.context,param:this.context.rawContext.listener.upZ})}static getDefaults(){return Object.assign(Vt.getDefaults(),{positionX:0,positionY:0,positionZ:0,forwardX:0,forwardY:0,forwardZ:-1,upX:0,upY:1,upZ:0})}dispose(){return super.dispose(),this.positionX.dispose(),this.positionY.dispose(),this.positionZ.dispose(),this.forwardX.dispose(),this.forwardY.dispose(),this.forwardZ.dispose(),this.upX.dispose(),this.upY.dispose(),this.upZ.dispose(),this}}wo(s=>{s.listener=new O_({context:s})});To(s=>{s.listener.dispose()});const Pa=an().transport;an().destination;an().destination;an().listener;const hh=an().draw;an();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const fc="151",k_=0,Fc=1,U_=2,dh=1,F_=2,Us=3,ui=0,qe=1,Bn=2,oi=0,ds=1,Vc=2,zc=3,Bc=4,V_=5,os=100,z_=101,B_=102,Gc=103,Wc=104,G_=200,W_=201,H_=202,q_=203,fh=204,ph=205,X_=206,j_=207,Y_=208,$_=209,Z_=210,K_=0,J_=1,Q_=2,La=3,tv=4,ev=5,nv=6,iv=7,mh=0,sv=1,rv=2,qn=0,ov=1,av=2,cv=3,lv=4,uv=5,gh=300,ys=301,Ss=302,Ia=303,Na=304,Co=306,Oa=1e3,gn=1001,ka=1002,Ue=1003,Hc=1004,Vo=1005,rn=1006,hv=1007,tr=1008,ki=1009,dv=1010,fv=1011,_h=1012,pv=1013,Ti=1014,Ei=1015,er=1016,mv=1017,gv=1018,fs=1020,_v=1021,_n=1023,vv=1024,xv=1025,Ci=1026,Ms=1027,yv=1028,Sv=1029,Mv=1030,bv=1031,wv=1033,zo=33776,Bo=33777,Go=33778,Wo=33779,qc=35840,Xc=35841,jc=35842,Yc=35843,Tv=36196,$c=37492,Zc=37496,Kc=37808,Jc=37809,Qc=37810,tl=37811,el=37812,nl=37813,il=37814,sl=37815,rl=37816,ol=37817,al=37818,cl=37819,ll=37820,ul=37821,Ho=36492,Ev=36283,hl=36284,dl=36285,fl=36286,Ui=3e3,te=3001,Av=3200,Cv=3201,Rv=0,Dv=1,Tn="srgb",nr="srgb-linear",vh="display-p3",qo=7680,Pv=519,pl=35044,ml="300 es",Ua=1035;class Ds{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,a=i.length;r<a;r++)i[r].call(this,t);t.target=null}}}const De=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Xo=Math.PI/180,Fa=180/Math.PI;function mr(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(De[s&255]+De[s>>8&255]+De[s>>16&255]+De[s>>24&255]+"-"+De[t&255]+De[t>>8&255]+"-"+De[t>>16&15|64]+De[t>>24&255]+"-"+De[e&63|128]+De[e>>8&255]+"-"+De[e>>16&255]+De[e>>24&255]+De[n&255]+De[n>>8&255]+De[n>>16&255]+De[n>>24&255]).toLowerCase()}function We(s,t,e){return Math.max(t,Math.min(e,s))}function Lv(s,t){return(s%t+t)%t}function jo(s,t,e){return(1-e)*s+e*t}function gl(s){return(s&s-1)===0&&s!==0}function Iv(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function wr(s,t){switch(t.constructor){case Float32Array:return s;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ye(s,t){switch(t.constructor){case Float32Array:return s;case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}class Zt{constructor(t=0,e=0){Zt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(We(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,a=this.y-t.y;return this.x=r*n-a*i+t.x,this.y=r*i+a*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Gt{constructor(){Gt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1]}set(t,e,n,i,r,a,o,c,l){const u=this.elements;return u[0]=t,u[1]=i,u[2]=o,u[3]=e,u[4]=r,u[5]=c,u[6]=n,u[7]=a,u[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[3],c=n[6],l=n[1],u=n[4],h=n[7],f=n[2],p=n[5],g=n[8],_=i[0],m=i[3],d=i[6],b=i[1],S=i[4],y=i[7],v=i[2],T=i[5],A=i[8];return r[0]=a*_+o*b+c*v,r[3]=a*m+o*S+c*T,r[6]=a*d+o*y+c*A,r[1]=l*_+u*b+h*v,r[4]=l*m+u*S+h*T,r[7]=l*d+u*y+h*A,r[2]=f*_+p*b+g*v,r[5]=f*m+p*S+g*T,r[8]=f*d+p*y+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8];return e*a*u-e*o*l-n*r*u+n*o*c+i*r*l-i*a*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=u*a-o*l,f=o*c-u*r,p=l*r-a*c,g=e*h+n*f+i*p;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=h*_,t[1]=(i*l-u*n)*_,t[2]=(o*n-i*a)*_,t[3]=f*_,t[4]=(u*e-i*c)*_,t[5]=(i*r-o*e)*_,t[6]=p*_,t[7]=(n*c-l*e)*_,t[8]=(a*e-n*r)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,a,o){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*a+l*o)+a+t,-i*l,i*c,-i*(-l*a+c*o)+o+e,0,0,1),this}scale(t,e){return this.premultiply(Yo.makeScale(t,e)),this}rotate(t){return this.premultiply(Yo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Yo.makeTranslation(t,e)),this}makeTranslation(t,e){return this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Yo=new Gt;function xh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function _o(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function ps(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function $o(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}const Nv=new Gt().fromArray([.8224621,.0331941,.0170827,.177538,.9668058,.0723974,-1e-7,1e-7,.9105199]),Ov=new Gt().fromArray([1.2249401,-.0420569,-.0196376,-.2249404,1.0420571,-.0786361,1e-7,0,1.0982735]);function kv(s){return s.convertSRGBToLinear().applyMatrix3(Ov)}function Uv(s){return s.applyMatrix3(Nv).convertLinearToSRGB()}const Fv={[nr]:s=>s,[Tn]:s=>s.convertSRGBToLinear(),[vh]:kv},Vv={[nr]:s=>s,[Tn]:s=>s.convertLinearToSRGB(),[vh]:Uv},$e={enabled:!1,get legacyMode(){return console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),!this.enabled},set legacyMode(s){console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150."),this.enabled=!s},get workingColorSpace(){return nr},set workingColorSpace(s){console.warn("THREE.ColorManagement: .workingColorSpace is readonly.")},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Fv[t],i=Vv[e];if(n===void 0||i===void 0)throw new Error(`Unsupported color space conversion, "${t}" to "${e}".`);return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this.workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this.workingColorSpace)}};let Wi;class yh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Wi===void 0&&(Wi=_o("canvas")),Wi.width=t.width,Wi.height=t.height;const n=Wi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Wi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=_o("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let a=0;a<r.length;a++)r[a]=ps(r[a]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ps(e[n]/255)*255):e[n]=ps(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}class Sh{constructor(t=null){this.isSource=!0,this.uuid=mr(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?r.push(Zo(i[a].image)):r.push(Zo(i[a]))}else r=Zo(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Zo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?yh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zv=0;class Qe extends Ds{constructor(t=Qe.DEFAULT_IMAGE,e=Qe.DEFAULT_MAPPING,n=gn,i=gn,r=rn,a=tr,o=_n,c=ki,l=Qe.DEFAULT_ANISOTROPY,u=Ui){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zv++}),this.uuid=mr(),this.name="",this.source=new Sh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=a,this.anisotropy=l,this.format=o,this.internalFormat=null,this.type=c,this.offset=new Zt(0,0),this.repeat=new Zt(1,1),this.center=new Zt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Gt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.encoding=u,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.encoding=t.encoding,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.5,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,encoding:this.encoding,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==gh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Oa:t.x=t.x-Math.floor(t.x);break;case gn:t.x=t.x<0?0:1;break;case ka:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Oa:t.y=t.y-Math.floor(t.y);break;case gn:t.y=t.y<0?0:1;break;case ka:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}}Qe.DEFAULT_IMAGE=null;Qe.DEFAULT_MAPPING=gh;Qe.DEFAULT_ANISOTROPY=1;class Ee{constructor(t=0,e=0,n=0,i=1){Ee.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,a=t.elements;return this.x=a[0]*e+a[4]*n+a[8]*i+a[12]*r,this.y=a[1]*e+a[5]*n+a[9]*i+a[13]*r,this.z=a[2]*e+a[6]*n+a[10]*i+a[14]*r,this.w=a[3]*e+a[7]*n+a[11]*i+a[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],u=c[4],h=c[8],f=c[1],p=c[5],g=c[9],_=c[2],m=c[6],d=c[10];if(Math.abs(u-f)<.01&&Math.abs(h-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(u+f)<.1&&Math.abs(h+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+p+d-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const S=(l+1)/2,y=(p+1)/2,v=(d+1)/2,T=(u+f)/4,A=(h+_)/4,E=(g+m)/4;return S>y&&S>v?S<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(S),i=T/n,r=A/n):y>v?y<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(y),n=T/i,r=E/i):v<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(v),n=A/r,i=E/r),this.set(n,i,r,e),this}let b=Math.sqrt((m-g)*(m-g)+(h-_)*(h-_)+(f-u)*(f-u));return Math.abs(b)<.001&&(b=1),this.x=(m-g)/b,this.y=(h-_)/b,this.z=(f-u)/b,this.w=Math.acos((l+p+d-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this.w=this.w<0?Math.ceil(this.w):Math.floor(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Fi extends Ds{constructor(t=1,e=1,n={}){super(),this.isWebGLRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ee(0,0,t,e),this.scissorTest=!1,this.viewport=new Ee(0,0,t,e);const i={width:t,height:e,depth:1};this.texture=new Qe(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.encoding),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps!==void 0?n.generateMipmaps:!1,this.texture.internalFormat=n.internalFormat!==void 0?n.internalFormat:null,this.texture.minFilter=n.minFilter!==void 0?n.minFilter:rn,this.depthBuffer=n.depthBuffer!==void 0?n.depthBuffer:!0,this.stencilBuffer=n.stencilBuffer!==void 0?n.stencilBuffer:!1,this.depthTexture=n.depthTexture!==void 0?n.depthTexture:null,this.samples=n.samples!==void 0?n.samples:0}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Sh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Mh extends Qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bv extends Qe{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=gn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class gr{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,a,o){let c=n[i+0],l=n[i+1],u=n[i+2],h=n[i+3];const f=r[a+0],p=r[a+1],g=r[a+2],_=r[a+3];if(o===0){t[e+0]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h;return}if(o===1){t[e+0]=f,t[e+1]=p,t[e+2]=g,t[e+3]=_;return}if(h!==_||c!==f||l!==p||u!==g){let m=1-o;const d=c*f+l*p+u*g+h*_,b=d>=0?1:-1,S=1-d*d;if(S>Number.EPSILON){const v=Math.sqrt(S),T=Math.atan2(v,d*b);m=Math.sin(m*T)/v,o=Math.sin(o*T)/v}const y=o*b;if(c=c*m+f*y,l=l*m+p*y,u=u*m+g*y,h=h*m+_*y,m===1-o){const v=1/Math.sqrt(c*c+l*l+u*u+h*h);c*=v,l*=v,u*=v,h*=v}}t[e]=c,t[e+1]=l,t[e+2]=u,t[e+3]=h}static multiplyQuaternionsFlat(t,e,n,i,r,a){const o=n[i],c=n[i+1],l=n[i+2],u=n[i+3],h=r[a],f=r[a+1],p=r[a+2],g=r[a+3];return t[e]=o*g+u*h+c*p-l*f,t[e+1]=c*g+u*f+l*h-o*p,t[e+2]=l*g+u*p+o*f-c*h,t[e+3]=u*g-o*h-c*f-l*p,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e){const n=t._x,i=t._y,r=t._z,a=t._order,o=Math.cos,c=Math.sin,l=o(n/2),u=o(i/2),h=o(r/2),f=c(n/2),p=c(i/2),g=c(r/2);switch(a){case"XYZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"YXZ":this._x=f*u*h+l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"ZXY":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h-f*p*g;break;case"ZYX":this._x=f*u*h-l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h+f*p*g;break;case"YZX":this._x=f*u*h+l*p*g,this._y=l*p*h+f*u*g,this._z=l*u*g-f*p*h,this._w=l*u*h-f*p*g;break;case"XZY":this._x=f*u*h-l*p*g,this._y=l*p*h-f*u*g,this._z=l*u*g+f*p*h,this._w=l*u*h+f*p*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return e!==!1&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],a=e[1],o=e[5],c=e[9],l=e[2],u=e[6],h=e[10],f=n+o+h;if(f>0){const p=.5/Math.sqrt(f+1);this._w=.25/p,this._x=(u-c)*p,this._y=(r-l)*p,this._z=(a-i)*p}else if(n>o&&n>h){const p=2*Math.sqrt(1+n-o-h);this._w=(u-c)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(r+l)/p}else if(o>h){const p=2*Math.sqrt(1+o-n-h);this._w=(r-l)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(c+u)/p}else{const p=2*Math.sqrt(1+h-n-o);this._w=(a-i)/p,this._x=(r+l)/p,this._y=(c+u)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(We(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,a=t._w,o=e._x,c=e._y,l=e._z,u=e._w;return this._x=n*u+a*o+i*l-r*c,this._y=i*u+a*c+r*o-n*l,this._z=r*u+a*l+n*c-i*o,this._w=a*u-n*o-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,a=this._w;let o=a*t._w+n*t._x+i*t._y+r*t._z;if(o<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,o=-o):this.copy(t),o>=1)return this._w=a,this._x=n,this._y=i,this._z=r,this;const c=1-o*o;if(c<=Number.EPSILON){const p=1-e;return this._w=p*a+e*this._w,this._x=p*n+e*this._x,this._y=p*i+e*this._y,this._z=p*r+e*this._z,this.normalize(),this._onChangeCallback(),this}const l=Math.sqrt(c),u=Math.atan2(l,o),h=Math.sin((1-e)*u)/l,f=Math.sin(e*u)/l;return this._w=a*h+this._w*f,this._x=n*h+this._x*f,this._y=i*h+this._y*f,this._z=r*h+this._z*f,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class W{constructor(t=0,e=0,n=0){W.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_l.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_l.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,a=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*a,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*a,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*a,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,a=t.y,o=t.z,c=t.w,l=c*e+a*i-o*n,u=c*n+o*e-r*i,h=c*i+r*n-a*e,f=-r*e-a*n-o*i;return this.x=l*c+f*-r+u*-o-h*-a,this.y=u*c+f*-a+h*-r-l*-o,this.z=h*c+f*-o+l*-a-u*-r,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=this.x<0?Math.ceil(this.x):Math.floor(this.x),this.y=this.y<0?Math.ceil(this.y):Math.floor(this.y),this.z=this.z<0?Math.ceil(this.z):Math.floor(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,a=e.x,o=e.y,c=e.z;return this.x=i*c-r*o,this.y=r*a-n*c,this.z=n*o-i*a,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Ko.copy(this).projectOnVector(t),this.sub(Ko)}reflect(t){return this.sub(Ko.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(We(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Ko=new W,_l=new gr;class _r{constructor(t=new W(1/0,1/0,1/0),e=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(On.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(On.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=On.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){if(t.updateWorldMatrix(!1,!1),t.boundingBox!==void 0)t.boundingBox===null&&t.computeBoundingBox(),Hi.copy(t.boundingBox),Hi.applyMatrix4(t.matrixWorld),this.union(Hi);else{const i=t.geometry;if(i!==void 0)if(e&&i.attributes!==void 0&&i.attributes.position!==void 0){const r=i.attributes.position;for(let a=0,o=r.count;a<o;a++)On.fromBufferAttribute(r,a).applyMatrix4(t.matrixWorld),this.expandByPoint(On)}else i.boundingBox===null&&i.computeBoundingBox(),Hi.copy(i.boundingBox),Hi.applyMatrix4(t.matrixWorld),this.union(Hi)}const n=t.children;for(let i=0,r=n.length;i<r;i++)this.expandByObject(n[i],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,On),On.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Is),Tr.subVectors(this.max,Is),qi.subVectors(t.a,Is),Xi.subVectors(t.b,Is),ji.subVectors(t.c,Is),Qn.subVectors(Xi,qi),ti.subVectors(ji,Xi),_i.subVectors(qi,ji);let e=[0,-Qn.z,Qn.y,0,-ti.z,ti.y,0,-_i.z,_i.y,Qn.z,0,-Qn.x,ti.z,0,-ti.x,_i.z,0,-_i.x,-Qn.y,Qn.x,0,-ti.y,ti.x,0,-_i.y,_i.x,0];return!Jo(e,qi,Xi,ji,Tr)||(e=[1,0,0,0,1,0,0,0,1],!Jo(e,qi,Xi,ji,Tr))?!1:(Er.crossVectors(Qn,ti),e=[Er.x,Er.y,Er.z],Jo(e,qi,Xi,ji,Tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,On).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(On).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Nn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Nn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Nn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Nn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Nn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Nn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Nn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Nn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Nn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Nn=[new W,new W,new W,new W,new W,new W,new W,new W],On=new W,Hi=new _r,qi=new W,Xi=new W,ji=new W,Qn=new W,ti=new W,_i=new W,Is=new W,Tr=new W,Er=new W,vi=new W;function Jo(s,t,e,n,i){for(let r=0,a=s.length-3;r<=a;r+=3){vi.fromArray(s,r);const o=i.x*Math.abs(vi.x)+i.y*Math.abs(vi.y)+i.z*Math.abs(vi.z),c=t.dot(vi),l=e.dot(vi),u=n.dot(vi);if(Math.max(-Math.max(c,l,u),Math.min(c,l,u))>o)return!1}return!0}const Gv=new _r,Ns=new W,Qo=new W;class pc{constructor(t=new W,e=-1){this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Gv.setFromPoints(t).getCenter(n);let i=0;for(let r=0,a=t.length;r<a;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Ns.subVectors(t,this.center);const e=Ns.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Ns,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Qo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Ns.copy(t.center).add(Qo)),this.expandByPoint(Ns.copy(t.center).sub(Qo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const kn=new W,ta=new W,Ar=new W,ei=new W,ea=new W,Cr=new W,na=new W;class Wv{constructor(t=new W,e=new W(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,kn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=kn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(kn.copy(this.origin).addScaledVector(this.direction,e),kn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){ta.copy(t).add(e).multiplyScalar(.5),Ar.copy(e).sub(t).normalize(),ei.copy(this.origin).sub(ta);const r=t.distanceTo(e)*.5,a=-this.direction.dot(Ar),o=ei.dot(this.direction),c=-ei.dot(Ar),l=ei.lengthSq(),u=Math.abs(1-a*a);let h,f,p,g;if(u>0)if(h=a*c-o,f=a*o-c,g=r*u,h>=0)if(f>=-g)if(f<=g){const _=1/u;h*=_,f*=_,p=h*(h+a*f+2*o)+f*(a*h+f+2*c)+l}else f=r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;else f=-r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;else f<=-g?(h=Math.max(0,-(-a*r+o)),f=h>0?-r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l):f<=g?(h=0,f=Math.min(Math.max(-r,-c),r),p=f*(f+2*c)+l):(h=Math.max(0,-(a*r+o)),f=h>0?r:Math.min(Math.max(-r,-c),r),p=-h*h+f*(f+2*c)+l);else f=a>0?-r:r,h=Math.max(0,-(a*f+o)),p=-h*h+f*(f+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,h),i&&i.copy(ta).addScaledVector(Ar,f),p}intersectSphere(t,e){kn.subVectors(t.center,this.origin);const n=kn.dot(this.direction),i=kn.dot(kn)-n*n,r=t.radius*t.radius;if(i>r)return null;const a=Math.sqrt(r-i),o=n-a,c=n+a;return c<0?null:o<0?this.at(c,e):this.at(o,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,a,o,c;const l=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,f=this.origin;return l>=0?(n=(t.min.x-f.x)*l,i=(t.max.x-f.x)*l):(n=(t.max.x-f.x)*l,i=(t.min.x-f.x)*l),u>=0?(r=(t.min.y-f.y)*u,a=(t.max.y-f.y)*u):(r=(t.max.y-f.y)*u,a=(t.min.y-f.y)*u),n>a||r>i||((r>n||isNaN(n))&&(n=r),(a<i||isNaN(i))&&(i=a),h>=0?(o=(t.min.z-f.z)*h,c=(t.max.z-f.z)*h):(o=(t.max.z-f.z)*h,c=(t.min.z-f.z)*h),n>c||o>i)||((o>n||n!==n)&&(n=o),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,kn)!==null}intersectTriangle(t,e,n,i,r){ea.subVectors(e,t),Cr.subVectors(n,t),na.crossVectors(ea,Cr);let a=this.direction.dot(na),o;if(a>0){if(i)return null;o=1}else if(a<0)o=-1,a=-a;else return null;ei.subVectors(this.origin,t);const c=o*this.direction.dot(Cr.crossVectors(ei,Cr));if(c<0)return null;const l=o*this.direction.dot(ea.cross(ei));if(l<0||c+l>a)return null;const u=-o*ei.dot(na);return u<0?null:this.at(u/a,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ae{constructor(){Ae.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]}set(t,e,n,i,r,a,o,c,l,u,h,f,p,g,_,m){const d=this.elements;return d[0]=t,d[4]=e,d[8]=n,d[12]=i,d[1]=r,d[5]=a,d[9]=o,d[13]=c,d[2]=l,d[6]=u,d[10]=h,d[14]=f,d[3]=p,d[7]=g,d[11]=_,d[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ae().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Yi.setFromMatrixColumn(t,0).length(),r=1/Yi.setFromMatrixColumn(t,1).length(),a=1/Yi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*a,e[9]=n[9]*a,e[10]=n[10]*a,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,a=Math.cos(n),o=Math.sin(n),c=Math.cos(i),l=Math.sin(i),u=Math.cos(r),h=Math.sin(r);if(t.order==="XYZ"){const f=a*u,p=a*h,g=o*u,_=o*h;e[0]=c*u,e[4]=-c*h,e[8]=l,e[1]=p+g*l,e[5]=f-_*l,e[9]=-o*c,e[2]=_-f*l,e[6]=g+p*l,e[10]=a*c}else if(t.order==="YXZ"){const f=c*u,p=c*h,g=l*u,_=l*h;e[0]=f+_*o,e[4]=g*o-p,e[8]=a*l,e[1]=a*h,e[5]=a*u,e[9]=-o,e[2]=p*o-g,e[6]=_+f*o,e[10]=a*c}else if(t.order==="ZXY"){const f=c*u,p=c*h,g=l*u,_=l*h;e[0]=f-_*o,e[4]=-a*h,e[8]=g+p*o,e[1]=p+g*o,e[5]=a*u,e[9]=_-f*o,e[2]=-a*l,e[6]=o,e[10]=a*c}else if(t.order==="ZYX"){const f=a*u,p=a*h,g=o*u,_=o*h;e[0]=c*u,e[4]=g*l-p,e[8]=f*l+_,e[1]=c*h,e[5]=_*l+f,e[9]=p*l-g,e[2]=-l,e[6]=o*c,e[10]=a*c}else if(t.order==="YZX"){const f=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=_-f*h,e[8]=g*h+p,e[1]=h,e[5]=a*u,e[9]=-o*u,e[2]=-l*u,e[6]=p*h+g,e[10]=f-_*h}else if(t.order==="XZY"){const f=a*c,p=a*l,g=o*c,_=o*l;e[0]=c*u,e[4]=-h,e[8]=l*u,e[1]=f*h+_,e[5]=a*u,e[9]=p*h-g,e[2]=g*h-p,e[6]=o*u,e[10]=_*h+f}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hv,t,qv)}lookAt(t,e,n){const i=this.elements;return Ze.subVectors(t,e),Ze.lengthSq()===0&&(Ze.z=1),Ze.normalize(),ni.crossVectors(n,Ze),ni.lengthSq()===0&&(Math.abs(n.z)===1?Ze.x+=1e-4:Ze.z+=1e-4,Ze.normalize(),ni.crossVectors(n,Ze)),ni.normalize(),Rr.crossVectors(Ze,ni),i[0]=ni.x,i[4]=Rr.x,i[8]=Ze.x,i[1]=ni.y,i[5]=Rr.y,i[9]=Ze.y,i[2]=ni.z,i[6]=Rr.z,i[10]=Ze.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,a=n[0],o=n[4],c=n[8],l=n[12],u=n[1],h=n[5],f=n[9],p=n[13],g=n[2],_=n[6],m=n[10],d=n[14],b=n[3],S=n[7],y=n[11],v=n[15],T=i[0],A=i[4],E=i[8],x=i[12],M=i[1],N=i[5],L=i[9],P=i[13],I=i[2],k=i[6],F=i[10],z=i[14],G=i[3],X=i[7],H=i[11],ot=i[15];return r[0]=a*T+o*M+c*I+l*G,r[4]=a*A+o*N+c*k+l*X,r[8]=a*E+o*L+c*F+l*H,r[12]=a*x+o*P+c*z+l*ot,r[1]=u*T+h*M+f*I+p*G,r[5]=u*A+h*N+f*k+p*X,r[9]=u*E+h*L+f*F+p*H,r[13]=u*x+h*P+f*z+p*ot,r[2]=g*T+_*M+m*I+d*G,r[6]=g*A+_*N+m*k+d*X,r[10]=g*E+_*L+m*F+d*H,r[14]=g*x+_*P+m*z+d*ot,r[3]=b*T+S*M+y*I+v*G,r[7]=b*A+S*N+y*k+v*X,r[11]=b*E+S*L+y*F+v*H,r[15]=b*x+S*P+y*z+v*ot,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],a=t[1],o=t[5],c=t[9],l=t[13],u=t[2],h=t[6],f=t[10],p=t[14],g=t[3],_=t[7],m=t[11],d=t[15];return g*(+r*c*h-i*l*h-r*o*f+n*l*f+i*o*p-n*c*p)+_*(+e*c*p-e*l*f+r*a*f-i*a*p+i*l*u-r*c*u)+m*(+e*l*h-e*o*p-r*a*h+n*a*p+r*o*u-n*l*u)+d*(-i*o*u-e*c*h+e*o*f+i*a*h-n*a*f+n*c*u)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],a=t[4],o=t[5],c=t[6],l=t[7],u=t[8],h=t[9],f=t[10],p=t[11],g=t[12],_=t[13],m=t[14],d=t[15],b=h*m*l-_*f*l+_*c*p-o*m*p-h*c*d+o*f*d,S=g*f*l-u*m*l-g*c*p+a*m*p+u*c*d-a*f*d,y=u*_*l-g*h*l+g*o*p-a*_*p-u*o*d+a*h*d,v=g*h*c-u*_*c-g*o*f+a*_*f+u*o*m-a*h*m,T=e*b+n*S+i*y+r*v;if(T===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/T;return t[0]=b*A,t[1]=(_*f*r-h*m*r-_*i*p+n*m*p+h*i*d-n*f*d)*A,t[2]=(o*m*r-_*c*r+_*i*l-n*m*l-o*i*d+n*c*d)*A,t[3]=(h*c*r-o*f*r-h*i*l+n*f*l+o*i*p-n*c*p)*A,t[4]=S*A,t[5]=(u*m*r-g*f*r+g*i*p-e*m*p-u*i*d+e*f*d)*A,t[6]=(g*c*r-a*m*r-g*i*l+e*m*l+a*i*d-e*c*d)*A,t[7]=(a*f*r-u*c*r+u*i*l-e*f*l-a*i*p+e*c*p)*A,t[8]=y*A,t[9]=(g*h*r-u*_*r-g*n*p+e*_*p+u*n*d-e*h*d)*A,t[10]=(a*_*r-g*o*r+g*n*l-e*_*l-a*n*d+e*o*d)*A,t[11]=(u*o*r-a*h*r-u*n*l+e*h*l+a*n*p-e*o*p)*A,t[12]=v*A,t[13]=(u*_*i-g*h*i+g*n*f-e*_*f-u*n*m+e*h*m)*A,t[14]=(g*o*i-a*_*i-g*n*c+e*_*c+a*n*m-e*o*m)*A,t[15]=(a*h*i-u*o*i+u*n*c-e*h*c-a*n*f+e*o*f)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,a=t.x,o=t.y,c=t.z,l=r*a,u=r*o;return this.set(l*a+n,l*o-i*c,l*c+i*o,0,l*o+i*c,u*o+n,u*c-i*a,0,l*c-i*o,u*c+i*a,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,a){return this.set(1,n,r,0,t,1,a,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,a=e._y,o=e._z,c=e._w,l=r+r,u=a+a,h=o+o,f=r*l,p=r*u,g=r*h,_=a*u,m=a*h,d=o*h,b=c*l,S=c*u,y=c*h,v=n.x,T=n.y,A=n.z;return i[0]=(1-(_+d))*v,i[1]=(p+y)*v,i[2]=(g-S)*v,i[3]=0,i[4]=(p-y)*T,i[5]=(1-(f+d))*T,i[6]=(m+b)*T,i[7]=0,i[8]=(g+S)*A,i[9]=(m-b)*A,i[10]=(1-(f+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Yi.set(i[0],i[1],i[2]).length();const a=Yi.set(i[4],i[5],i[6]).length(),o=Yi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],hn.copy(this);const l=1/r,u=1/a,h=1/o;return hn.elements[0]*=l,hn.elements[1]*=l,hn.elements[2]*=l,hn.elements[4]*=u,hn.elements[5]*=u,hn.elements[6]*=u,hn.elements[8]*=h,hn.elements[9]*=h,hn.elements[10]*=h,e.setFromRotationMatrix(hn),n.x=r,n.y=a,n.z=o,this}makePerspective(t,e,n,i,r,a){const o=this.elements,c=2*r/(e-t),l=2*r/(n-i),u=(e+t)/(e-t),h=(n+i)/(n-i),f=-(a+r)/(a-r),p=-2*a*r/(a-r);return o[0]=c,o[4]=0,o[8]=u,o[12]=0,o[1]=0,o[5]=l,o[9]=h,o[13]=0,o[2]=0,o[6]=0,o[10]=f,o[14]=p,o[3]=0,o[7]=0,o[11]=-1,o[15]=0,this}makeOrthographic(t,e,n,i,r,a){const o=this.elements,c=1/(e-t),l=1/(n-i),u=1/(a-r),h=(e+t)*c,f=(n+i)*l,p=(a+r)*u;return o[0]=2*c,o[4]=0,o[8]=0,o[12]=-h,o[1]=0,o[5]=2*l,o[9]=0,o[13]=-f,o[2]=0,o[6]=0,o[10]=-2*u,o[14]=-p,o[3]=0,o[7]=0,o[11]=0,o[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Yi=new W,hn=new Ae,Hv=new W(0,0,0),qv=new W(1,1,1),ni=new W,Rr=new W,Ze=new W,vl=new Ae,xl=new gr;class Ro{constructor(t=0,e=0,n=0,i=Ro.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],a=i[4],o=i[8],c=i[1],l=i[5],u=i[9],h=i[2],f=i[6],p=i[10];switch(e){case"XYZ":this._y=Math.asin(We(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,p),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(f,l),this._z=0);break;case"YXZ":this._x=Math.asin(-We(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(We(f,-1,1)),Math.abs(f)<.9999999?(this._y=Math.atan2(-h,p),this._z=Math.atan2(-a,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-We(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(f,p),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-a,l));break;case"YZX":this._z=Math.asin(We(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-u,l),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-We(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(f,l),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return vl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(vl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return xl.setFromEuler(this),this.setFromQuaternion(xl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Ro.DEFAULT_ORDER="XYZ";class bh{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Xv=0;const yl=new W,$i=new gr,Un=new Ae,Dr=new W,Os=new W,jv=new W,Yv=new gr,Sl=new W(1,0,0),Ml=new W(0,1,0),bl=new W(0,0,1),$v={type:"added"},wl={type:"removed"};class tn extends Ds{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Xv++}),this.uuid=mr(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=tn.DEFAULT_UP.clone();const t=new W,e=new Ro,n=new gr,i=new W(1,1,1);function r(){n.setFromEuler(e,!1)}function a(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ae},normalMatrix:{value:new Gt}}),this.matrix=new Ae,this.matrixWorld=new Ae,this.matrixAutoUpdate=tn.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.matrixWorldAutoUpdate=tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.layers=new bh,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.multiply($i),this}rotateOnWorldAxis(t,e){return $i.setFromAxisAngle(t,e),this.quaternion.premultiply($i),this}rotateX(t){return this.rotateOnAxis(Sl,t)}rotateY(t){return this.rotateOnAxis(Ml,t)}rotateZ(t){return this.rotateOnAxis(bl,t)}translateOnAxis(t,e){return yl.copy(t).applyQuaternion(this.quaternion),this.position.add(yl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(Sl,t)}translateY(t){return this.translateOnAxis(Ml,t)}translateZ(t){return this.translateOnAxis(bl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Un.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Dr.copy(t):Dr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Un.lookAt(Os,Dr,this.up):Un.lookAt(Dr,Os,this.up),this.quaternion.setFromRotationMatrix(Un),i&&(Un.extractRotation(i.matrixWorld),$i.setFromRotationMatrix(Un),this.quaternion.premultiply($i.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent($v)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(wl)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){for(let t=0;t<this.children.length;t++){const e=this.children[t];e.parent=null,e.dispatchEvent(wl)}return this.children.length=0,this}attach(t){return this.updateWorldMatrix(!0,!1),Un.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Un.multiply(t.parent.matrixWorld)),t.applyMatrix4(Un),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const a=this.children[n].getObjectByProperty(t,e);if(a!==void 0)return a}}getObjectsByProperty(t,e){let n=[];this[t]===e&&n.push(this);for(let i=0,r=this.children.length;i<r;i++){const a=this.children[i].getObjectsByProperty(t,e);a.length>0&&(n=n.concat(a))}return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,t,jv),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,Yv,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,a=i.length;r<a;r++){const o=i[r];o.matrixWorldAutoUpdate===!0&&o.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.5,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON()));function r(o,c){return o[c.uuid]===void 0&&(o[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){const c=o.shapes;if(Array.isArray(c))for(let l=0,u=c.length;l<u;l++){const h=c[l];r(t.shapes,h)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const o=[];for(let c=0,l=this.material.length;c<l;c++)o.push(r(t.materials,this.material[c]));i.material=o}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){const c=this.animations[o];i.animations.push(r(t.animations,c))}}if(e){const o=a(t.geometries),c=a(t.materials),l=a(t.textures),u=a(t.images),h=a(t.shapes),f=a(t.skeletons),p=a(t.animations),g=a(t.nodes);o.length>0&&(n.geometries=o),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),u.length>0&&(n.images=u),h.length>0&&(n.shapes=h),f.length>0&&(n.skeletons=f),p.length>0&&(n.animations=p),g.length>0&&(n.nodes=g)}return n.object=i,n;function a(o){const c=[];for(const l in o){const u=o[l];delete u.metadata,c.push(u)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}tn.DEFAULT_UP=new W(0,1,0);tn.DEFAULT_MATRIX_AUTO_UPDATE=!0;tn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new W,Fn=new W,ia=new W,Vn=new W,Zi=new W,Ki=new W,Tl=new W,sa=new W,ra=new W,oa=new W;let Pr=!1;class mn{constructor(t=new W,e=new W,n=new W){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),dn.subVectors(t,e),i.cross(dn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){dn.subVectors(i,e),Fn.subVectors(n,e),ia.subVectors(t,e);const a=dn.dot(dn),o=dn.dot(Fn),c=dn.dot(ia),l=Fn.dot(Fn),u=Fn.dot(ia),h=a*l-o*o;if(h===0)return r.set(-2,-1,-1);const f=1/h,p=(l*c-o*u)*f,g=(a*u-o*c)*f;return r.set(1-p-g,g,p)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Vn),Vn.x>=0&&Vn.y>=0&&Vn.x+Vn.y<=1}static getUV(t,e,n,i,r,a,o,c){return Pr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Pr=!0),this.getInterpolation(t,e,n,i,r,a,o,c)}static getInterpolation(t,e,n,i,r,a,o,c){return this.getBarycoord(t,e,n,i,Vn),c.setScalar(0),c.addScaledVector(r,Vn.x),c.addScaledVector(a,Vn.y),c.addScaledVector(o,Vn.z),c}static isFrontFacing(t,e,n,i){return dn.subVectors(n,e),Fn.subVectors(t,e),dn.cross(Fn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Fn.subVectors(this.a,this.b),dn.cross(Fn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return mn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return mn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return Pr===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),Pr=!0),mn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return mn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return mn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return mn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let a,o;Zi.subVectors(i,n),Ki.subVectors(r,n),sa.subVectors(t,n);const c=Zi.dot(sa),l=Ki.dot(sa);if(c<=0&&l<=0)return e.copy(n);ra.subVectors(t,i);const u=Zi.dot(ra),h=Ki.dot(ra);if(u>=0&&h<=u)return e.copy(i);const f=c*h-u*l;if(f<=0&&c>=0&&u<=0)return a=c/(c-u),e.copy(n).addScaledVector(Zi,a);oa.subVectors(t,r);const p=Zi.dot(oa),g=Ki.dot(oa);if(g>=0&&p<=g)return e.copy(r);const _=p*l-c*g;if(_<=0&&l>=0&&g<=0)return o=l/(l-g),e.copy(n).addScaledVector(Ki,o);const m=u*g-p*h;if(m<=0&&h-u>=0&&p-g>=0)return Tl.subVectors(r,i),o=(h-u)/(h-u+(p-g)),e.copy(i).addScaledVector(Tl,o);const d=1/(m+_+f);return a=_*d,o=f*d,e.copy(n).addScaledVector(Zi,a).addScaledVector(Ki,o)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}let Zv=0;class Do extends Ds{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zv++}),this.uuid=mr(),this.name="",this.type="Material",this.blending=ds,this.side=ui,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.blendSrc=fh,this.blendDst=ph,this.blendEquation=os,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.depthFunc=La,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pv,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=qo,this.stencilZFail=qo,this.stencilZPass=qo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.5,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ds&&(n.blending=this.blending),this.side!==ui&&(n.side=this.side),this.vertexColors&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=this.transparent),n.depthFunc=this.depthFunc,n.depthTest=this.depthTest,n.depthWrite=this.depthWrite,n.colorWrite=this.colorWrite,n.stencilWrite=this.stencilWrite,n.stencilWriteMask=this.stencilWriteMask,n.stencilFunc=this.stencilFunc,n.stencilRef=this.stencilRef,n.stencilFuncMask=this.stencilFuncMask,n.stencilFail=this.stencilFail,n.stencilZFail=this.stencilZFail,n.stencilZPass=this.stencilZPass,this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaToCoverage===!0&&(n.alphaToCoverage=this.alphaToCoverage),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=this.premultipliedAlpha),this.forceSinglePass===!0&&(n.forceSinglePass=this.forceSinglePass),this.wireframe===!0&&(n.wireframe=this.wireframe),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=this.flatShading),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const a=[];for(const o in r){const c=r[o];delete c.metadata,a.push(c)}return a}if(e){const r=i(t.textures),a=i(t.images);r.length>0&&(n.textures=r),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}const wh={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},fn={h:0,s:0,l:0},Lr={h:0,s:0,l:0};function aa(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class re{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,e===void 0&&n===void 0?this.set(t):this.setRGB(t,e,n)}set(t){return t&&t.isColor?this.copy(t):typeof t=="number"?this.setHex(t):typeof t=="string"&&this.setStyle(t),this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Tn){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,$e.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=$e.workingColorSpace){return this.r=t,this.g=e,this.b=n,$e.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=$e.workingColorSpace){if(t=Lv(t,1),e=We(e,0,1),n=We(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,a=2*n-r;this.r=aa(a,r,t+1/3),this.g=aa(a,r,t),this.b=aa(a,r,t-1/3)}return $e.toWorkingColorSpace(this,i),this}setStyle(t,e=Tn){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(255,parseInt(r[1],10))/255,this.g=Math.min(255,parseInt(r[2],10))/255,this.b=Math.min(255,parseInt(r[3],10))/255,$e.toWorkingColorSpace(this,e),n(r[4]),this;if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return this.r=Math.min(100,parseInt(r[1],10))/100,this.g=Math.min(100,parseInt(r[2],10))/100,this.b=Math.min(100,parseInt(r[3],10))/100,$e.toWorkingColorSpace(this,e),n(r[4]),this;break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o)){const c=parseFloat(r[1])/360,l=parseFloat(r[2])/100,u=parseFloat(r[3])/100;return n(r[4]),this.setHSL(c,l,u,e)}break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(a===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Tn){const n=wh[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ps(t.r),this.g=ps(t.g),this.b=ps(t.b),this}copyLinearToSRGB(t){return this.r=$o(t.r),this.g=$o(t.g),this.b=$o(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Tn){return $e.fromWorkingColorSpace(Pe.copy(this),t),We(Pe.r*255,0,255)<<16^We(Pe.g*255,0,255)<<8^We(Pe.b*255,0,255)<<0}getHexString(t=Tn){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=$e.workingColorSpace){$e.fromWorkingColorSpace(Pe.copy(this),e);const n=Pe.r,i=Pe.g,r=Pe.b,a=Math.max(n,i,r),o=Math.min(n,i,r);let c,l;const u=(o+a)/2;if(o===a)c=0,l=0;else{const h=a-o;switch(l=u<=.5?h/(a+o):h/(2-a-o),a){case n:c=(i-r)/h+(i<r?6:0);break;case i:c=(r-n)/h+2;break;case r:c=(n-i)/h+4;break}c/=6}return t.h=c,t.s=l,t.l=u,t}getRGB(t,e=$e.workingColorSpace){return $e.fromWorkingColorSpace(Pe.copy(this),e),t.r=Pe.r,t.g=Pe.g,t.b=Pe.b,t}getStyle(t=Tn){$e.fromWorkingColorSpace(Pe.copy(this),t);const e=Pe.r,n=Pe.g,i=Pe.b;return t!==Tn?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${e*255|0},${n*255|0},${i*255|0})`}offsetHSL(t,e,n){return this.getHSL(fn),fn.h+=t,fn.s+=e,fn.l+=n,this.setHSL(fn.h,fn.s,fn.l),this}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(fn),t.getHSL(Lr);const n=jo(fn.h,Lr.h,e),i=jo(fn.s,Lr.s,e),r=jo(fn.l,Lr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Pe=new re;re.NAMES=wh;class Th extends Do{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new re(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=mh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ge=new W,Ir=new Zt;class Cn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=pl,this.updateRange={offset:0,count:-1},this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}setUsage(t){return this.usage=t,this}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ir.fromBufferAttribute(this,e),Ir.applyMatrix3(t),this.setXY(e,Ir.x,Ir.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix3(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyMatrix4(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.applyNormalMatrix(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ge.fromBufferAttribute(this,e),ge.transformDirection(t),this.setXYZ(e,ge.x,ge.y,ge.z);return this}set(t,e=0){return this.array.set(t,e),this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wr(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wr(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wr(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wr(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ye(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array),i=Ye(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=Ye(e,this.array),n=Ye(n,this.array),i=Ye(i,this.array),r=Ye(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==pl&&(t.usage=this.usage),(this.updateRange.offset!==0||this.updateRange.count!==-1)&&(t.updateRange=this.updateRange),t}copyColorsArray(){console.error("THREE.BufferAttribute: copyColorsArray() was removed in r144.")}copyVector2sArray(){console.error("THREE.BufferAttribute: copyVector2sArray() was removed in r144.")}copyVector3sArray(){console.error("THREE.BufferAttribute: copyVector3sArray() was removed in r144.")}copyVector4sArray(){console.error("THREE.BufferAttribute: copyVector4sArray() was removed in r144.")}}class Eh extends Cn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Ah extends Cn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Ri extends Cn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Kv=0;const sn=new Ae,ca=new tn,Ji=new W,Ke=new _r,ks=new _r,be=new W;class Gi extends Ds{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kv++}),this.uuid=mr(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(xh(t)?Ah:Eh)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Gt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return sn.makeRotationFromQuaternion(t),this.applyMatrix4(sn),this}rotateX(t){return sn.makeRotationX(t),this.applyMatrix4(sn),this}rotateY(t){return sn.makeRotationY(t),this.applyMatrix4(sn),this}rotateZ(t){return sn.makeRotationZ(t),this.applyMatrix4(sn),this}translate(t,e,n){return sn.makeTranslation(t,e,n),this.applyMatrix4(sn),this}scale(t,e,n){return sn.makeScale(t,e,n),this.applyMatrix4(sn),this}lookAt(t){return ca.lookAt(t),ca.updateMatrix(),this.applyMatrix4(ca.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ji).negate(),this.translate(Ji.x,Ji.y,Ji.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Ri(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _r);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Ke.setFromBufferAttribute(r),this.morphTargetsRelative?(be.addVectors(this.boundingBox.min,Ke.min),this.boundingBox.expandByPoint(be),be.addVectors(this.boundingBox.max,Ke.max),this.boundingBox.expandByPoint(be)):(this.boundingBox.expandByPoint(Ke.min),this.boundingBox.expandByPoint(Ke.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new pc);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new W,1/0);return}if(t){const n=this.boundingSphere.center;if(Ke.setFromBufferAttribute(t),e)for(let r=0,a=e.length;r<a;r++){const o=e[r];ks.setFromBufferAttribute(o),this.morphTargetsRelative?(be.addVectors(Ke.min,ks.min),Ke.expandByPoint(be),be.addVectors(Ke.max,ks.max),Ke.expandByPoint(be)):(Ke.expandByPoint(ks.min),Ke.expandByPoint(ks.max))}Ke.getCenter(n);let i=0;for(let r=0,a=t.count;r<a;r++)be.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(be));if(e)for(let r=0,a=e.length;r<a;r++){const o=e[r],c=this.morphTargetsRelative;for(let l=0,u=o.count;l<u;l++)be.fromBufferAttribute(o,l),c&&(Ji.fromBufferAttribute(t,l),be.add(Ji)),i=Math.max(i,n.distanceToSquared(be))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,a=e.uv.array,o=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new Cn(new Float32Array(4*o),4));const c=this.getAttribute("tangent").array,l=[],u=[];for(let M=0;M<o;M++)l[M]=new W,u[M]=new W;const h=new W,f=new W,p=new W,g=new Zt,_=new Zt,m=new Zt,d=new W,b=new W;function S(M,N,L){h.fromArray(i,M*3),f.fromArray(i,N*3),p.fromArray(i,L*3),g.fromArray(a,M*2),_.fromArray(a,N*2),m.fromArray(a,L*2),f.sub(h),p.sub(h),_.sub(g),m.sub(g);const P=1/(_.x*m.y-m.x*_.y);isFinite(P)&&(d.copy(f).multiplyScalar(m.y).addScaledVector(p,-_.y).multiplyScalar(P),b.copy(p).multiplyScalar(_.x).addScaledVector(f,-m.x).multiplyScalar(P),l[M].add(d),l[N].add(d),l[L].add(d),u[M].add(b),u[N].add(b),u[L].add(b))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let M=0,N=y.length;M<N;++M){const L=y[M],P=L.start,I=L.count;for(let k=P,F=P+I;k<F;k+=3)S(n[k+0],n[k+1],n[k+2])}const v=new W,T=new W,A=new W,E=new W;function x(M){A.fromArray(r,M*3),E.copy(A);const N=l[M];v.copy(N),v.sub(A.multiplyScalar(A.dot(N))).normalize(),T.crossVectors(E,N);const P=T.dot(u[M])<0?-1:1;c[M*4]=v.x,c[M*4+1]=v.y,c[M*4+2]=v.z,c[M*4+3]=P}for(let M=0,N=y.length;M<N;++M){const L=y[M],P=L.start,I=L.count;for(let k=P,F=P+I;k<F;k+=3)x(n[k+0]),x(n[k+1]),x(n[k+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new Cn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let f=0,p=n.count;f<p;f++)n.setXYZ(f,0,0,0);const i=new W,r=new W,a=new W,o=new W,c=new W,l=new W,u=new W,h=new W;if(t)for(let f=0,p=t.count;f<p;f+=3){const g=t.getX(f+0),_=t.getX(f+1),m=t.getX(f+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,_),a.fromBufferAttribute(e,m),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),o.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),o.add(u),c.add(u),l.add(u),n.setXYZ(g,o.x,o.y,o.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let f=0,p=e.count;f<p;f+=3)i.fromBufferAttribute(e,f+0),r.fromBufferAttribute(e,f+1),a.fromBufferAttribute(e,f+2),u.subVectors(a,r),h.subVectors(i,r),u.cross(h),n.setXYZ(f+0,u.x,u.y,u.z),n.setXYZ(f+1,u.x,u.y,u.z),n.setXYZ(f+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}merge(){return console.error("THREE.BufferGeometry.merge() has been removed. Use THREE.BufferGeometryUtils.mergeGeometries() instead."),this}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)be.fromBufferAttribute(t,e),be.normalize(),t.setXYZ(e,be.x,be.y,be.z)}toNonIndexed(){function t(o,c){const l=o.array,u=o.itemSize,h=o.normalized,f=new l.constructor(c.length*u);let p=0,g=0;for(let _=0,m=c.length;_<m;_++){o.isInterleavedBufferAttribute?p=c[_]*o.data.stride+o.offset:p=c[_]*u;for(let d=0;d<u;d++)f[g++]=l[p++]}return new Cn(f,u,h)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new Gi,n=this.index.array,i=this.attributes;for(const o in i){const c=i[o],l=t(c,n);e.setAttribute(o,l)}const r=this.morphAttributes;for(const o in r){const c=[],l=r[o];for(let u=0,h=l.length;u<h;u++){const f=l[u],p=t(f,n);c.push(p)}e.morphAttributes[o]=c}e.morphTargetsRelative=this.morphTargetsRelative;const a=this.groups;for(let o=0,c=a.length;o<c;o++){const l=a[o];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.5,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],u=[];for(let h=0,f=l.length;h<f;h++){const p=l[h];u.push(p.toJSON(t.data))}u.length>0&&(i[c]=u,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const a=this.groups;a.length>0&&(t.data.groups=JSON.parse(JSON.stringify(a)));const o=this.boundingSphere;return o!==null&&(t.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const u=i[l];this.setAttribute(l,u.clone(e))}const r=t.morphAttributes;for(const l in r){const u=[],h=r[l];for(let f=0,p=h.length;f<p;f++)u.push(h[f].clone(e));this.morphAttributes[l]=u}this.morphTargetsRelative=t.morphTargetsRelative;const a=t.groups;for(let l=0,u=a.length;l<u;l++){const h=a[l];this.addGroup(h.start,h.count,h.materialIndex)}const o=t.boundingBox;o!==null&&(this.boundingBox=o.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const El=new Ae,wn=new Wv,Nr=new pc,Al=new W,Qi=new W,ts=new W,es=new W,la=new W,Or=new W,kr=new Zt,Ur=new Zt,Fr=new Zt,Cl=new W,Rl=new W,Dl=new W,Vr=new W,zr=new W;class Wn extends tn{constructor(t=new Gi,e=new Th){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=i.length;r<a;r++){const o=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,a=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const o=this.morphTargetInfluences;if(r&&o){Or.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const u=o[c],h=r[c];u!==0&&(la.fromBufferAttribute(h,t),a?Or.addScaledVector(la,u):Or.addScaledVector(la.sub(e),u))}e.add(Or)}return this.isSkinnedMesh&&this.applyBoneTransform(t,e),e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;if(i===void 0||(n.boundingSphere===null&&n.computeBoundingSphere(),Nr.copy(n.boundingSphere),Nr.applyMatrix4(r),wn.copy(t.ray).recast(t.near),Nr.containsPoint(wn.origin)===!1&&(wn.intersectSphere(Nr,Al)===null||wn.origin.distanceToSquared(Al)>(t.far-t.near)**2))||(El.copy(r).invert(),wn.copy(t.ray).applyMatrix4(El),n.boundingBox!==null&&wn.intersectsBox(n.boundingBox)===!1))return;let a;const o=n.index,c=n.attributes.position,l=n.attributes.uv,u=n.attributes.uv2,h=n.attributes.normal,f=n.groups,p=n.drawRange;if(o!==null)if(Array.isArray(i))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=i[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,v=S;y<v;y+=3){const T=o.getX(y),A=o.getX(y+1),E=o.getX(y+2);a=Br(this,d,t,wn,l,u,h,T,A,E),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,e.push(a))}}else{const g=Math.max(0,p.start),_=Math.min(o.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=o.getX(m),S=o.getX(m+1),y=o.getX(m+2);a=Br(this,i,t,wn,l,u,h,b,S,y),a&&(a.faceIndex=Math.floor(m/3),e.push(a))}}else if(c!==void 0)if(Array.isArray(i))for(let g=0,_=f.length;g<_;g++){const m=f[g],d=i[m.materialIndex],b=Math.max(m.start,p.start),S=Math.min(c.count,Math.min(m.start+m.count,p.start+p.count));for(let y=b,v=S;y<v;y+=3){const T=y,A=y+1,E=y+2;a=Br(this,d,t,wn,l,u,h,T,A,E),a&&(a.faceIndex=Math.floor(y/3),a.face.materialIndex=m.materialIndex,e.push(a))}}else{const g=Math.max(0,p.start),_=Math.min(c.count,p.start+p.count);for(let m=g,d=_;m<d;m+=3){const b=m,S=m+1,y=m+2;a=Br(this,i,t,wn,l,u,h,b,S,y),a&&(a.faceIndex=Math.floor(m/3),e.push(a))}}}}function Jv(s,t,e,n,i,r,a,o){let c;if(t.side===qe?c=n.intersectTriangle(a,r,i,!0,o):c=n.intersectTriangle(i,r,a,t.side===ui,o),c===null)return null;zr.copy(o),zr.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(zr);return l<e.near||l>e.far?null:{distance:l,point:zr.clone(),object:s}}function Br(s,t,e,n,i,r,a,o,c,l){s.getVertexPosition(o,Qi),s.getVertexPosition(c,ts),s.getVertexPosition(l,es);const u=Jv(s,t,e,n,Qi,ts,es,Vr);if(u){i&&(kr.fromBufferAttribute(i,o),Ur.fromBufferAttribute(i,c),Fr.fromBufferAttribute(i,l),u.uv=mn.getInterpolation(Vr,Qi,ts,es,kr,Ur,Fr,new Zt)),r&&(kr.fromBufferAttribute(r,o),Ur.fromBufferAttribute(r,c),Fr.fromBufferAttribute(r,l),u.uv2=mn.getInterpolation(Vr,Qi,ts,es,kr,Ur,Fr,new Zt)),a&&(Cl.fromBufferAttribute(a,o),Rl.fromBufferAttribute(a,c),Dl.fromBufferAttribute(a,l),u.normal=mn.getInterpolation(Vr,Qi,ts,es,Cl,Rl,Dl,new W),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a:o,b:c,c:l,normal:new W,materialIndex:0};mn.getNormal(Qi,ts,es,h.normal),u.face=h}return u}class vr extends Gi{constructor(t=1,e=1,n=1,i=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:a};const o=this;i=Math.floor(i),r=Math.floor(r),a=Math.floor(a);const c=[],l=[],u=[],h=[];let f=0,p=0;g("z","y","x",-1,-1,n,e,t,a,r,0),g("z","y","x",1,-1,n,e,-t,a,r,1),g("x","z","y",1,1,t,n,e,i,a,2),g("x","z","y",1,-1,t,n,-e,i,a,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Ri(l,3)),this.setAttribute("normal",new Ri(u,3)),this.setAttribute("uv",new Ri(h,2));function g(_,m,d,b,S,y,v,T,A,E,x){const M=y/A,N=v/E,L=y/2,P=v/2,I=T/2,k=A+1,F=E+1;let z=0,G=0;const X=new W;for(let H=0;H<F;H++){const ot=H*N-P;for(let Q=0;Q<k;Q++){const q=Q*M-L;X[_]=q*b,X[m]=ot*S,X[d]=I,l.push(X.x,X.y,X.z),X[_]=0,X[m]=0,X[d]=T>0?1:-1,u.push(X.x,X.y,X.z),h.push(Q/A),h.push(1-H/E),z+=1}}for(let H=0;H<E;H++)for(let ot=0;ot<A;ot++){const Q=f+ot+k*H,q=f+ot+k*(H+1),Z=f+(ot+1)+k*(H+1),tt=f+(ot+1)+k*H;c.push(Q,q,tt),c.push(q,Z,tt),G+=6}o.addGroup(p,G,x),p+=G,f+=z}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new vr(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function bs(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ke(s){const t={};for(let e=0;e<s.length;e++){const n=bs(s[e]);for(const i in n)t[i]=n[i]}return t}function Qv(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Ch(s){return s.getRenderTarget()===null&&s.outputEncoding===te?Tn:nr}const t0={clone:bs,merge:ke};var e0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,n0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class hi extends Do{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=e0,this.fragmentShader=n0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv2:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=bs(t.uniforms),this.uniformsGroups=Qv(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const a=this.uniforms[i].value;a&&a.isTexture?e.uniforms[i]={type:"t",value:a.toJSON(t).uuid}:a&&a.isColor?e.uniforms[i]={type:"c",value:a.getHex()}:a&&a.isVector2?e.uniforms[i]={type:"v2",value:a.toArray()}:a&&a.isVector3?e.uniforms[i]={type:"v3",value:a.toArray()}:a&&a.isVector4?e.uniforms[i]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?e.uniforms[i]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?e.uniforms[i]={type:"m4",value:a.toArray()}:e.uniforms[i]={value:a}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}let Rh=class extends tn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ae,this.projectionMatrix=new Ae,this.projectionMatrixInverse=new Ae}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(-e[8],-e[9],-e[10]).normalize()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};class on extends Rh{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Fa*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Xo*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Fa*2*Math.atan(Math.tan(Xo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,a){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Xo*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const a=this.view;if(this.view!==null&&this.view.enabled){const c=a.fullWidth,l=a.fullHeight;r+=a.offsetX*i/c,e-=a.offsetY*n/l,i*=a.width/c,n*=a.height/l}const o=this.filmOffset;o!==0&&(r+=t*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ns=-90,is=1;class i0 extends tn{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n;const i=new on(ns,is,t,e);i.layers=this.layers,i.up.set(0,1,0),i.lookAt(1,0,0),this.add(i);const r=new on(ns,is,t,e);r.layers=this.layers,r.up.set(0,1,0),r.lookAt(-1,0,0),this.add(r);const a=new on(ns,is,t,e);a.layers=this.layers,a.up.set(0,0,-1),a.lookAt(0,1,0),this.add(a);const o=new on(ns,is,t,e);o.layers=this.layers,o.up.set(0,0,1),o.lookAt(0,-1,0),this.add(o);const c=new on(ns,is,t,e);c.layers=this.layers,c.up.set(0,1,0),c.lookAt(0,0,1),this.add(c);const l=new on(ns,is,t,e);l.layers=this.layers,l.up.set(0,1,0),l.lookAt(0,0,-1),this.add(l)}update(t,e){this.parent===null&&this.updateMatrixWorld();const n=this.renderTarget,[i,r,a,o,c,l]=this.children,u=t.getRenderTarget(),h=t.toneMapping,f=t.xr.enabled;t.toneMapping=qn,t.xr.enabled=!1;const p=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0),t.render(e,i),t.setRenderTarget(n,1),t.render(e,r),t.setRenderTarget(n,2),t.render(e,a),t.setRenderTarget(n,3),t.render(e,o),t.setRenderTarget(n,4),t.render(e,c),n.texture.generateMipmaps=p,t.setRenderTarget(n,5),t.render(e,l),t.setRenderTarget(u),t.toneMapping=h,t.xr.enabled=f,n.texture.needsPMREMUpdate=!0}}class Dh extends Qe{constructor(t,e,n,i,r,a,o,c,l,u){t=t!==void 0?t:[],e=e!==void 0?e:ys,super(t,e,n,i,r,a,o,c,l,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class s0 extends Fi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Dh(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.encoding),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:rn}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.encoding=e.encoding,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new vr(5,5,5),r=new hi({name:"CubemapFromEquirect",uniforms:bs(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:qe,blending:oi});r.uniforms.tEquirect.value=e;const a=new Wn(i,r),o=e.minFilter;return e.minFilter===tr&&(e.minFilter=rn),new i0(1,10,this).update(t,a),e.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let a=0;a<6;a++)t.setRenderTarget(this,a),t.clear(e,n,i);t.setRenderTarget(r)}}const ua=new W,r0=new W,o0=new Gt;class yi{constructor(t=new W(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ua.subVectors(n,e).cross(r0.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ua),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||o0.getNormalMatrix(t),i=this.coplanarPoint(ua).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const xi=new pc,Gr=new W;class Ph{constructor(t=new yi,e=new yi,n=new yi,i=new yi,r=new yi,a=new yi){this.planes=[t,e,n,i,r,a]}set(t,e,n,i,r,a){const o=this.planes;return o[0].copy(t),o[1].copy(e),o[2].copy(n),o[3].copy(i),o[4].copy(r),o[5].copy(a),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t){const e=this.planes,n=t.elements,i=n[0],r=n[1],a=n[2],o=n[3],c=n[4],l=n[5],u=n[6],h=n[7],f=n[8],p=n[9],g=n[10],_=n[11],m=n[12],d=n[13],b=n[14],S=n[15];return e[0].setComponents(o-i,h-c,_-f,S-m).normalize(),e[1].setComponents(o+i,h+c,_+f,S+m).normalize(),e[2].setComponents(o+r,h+l,_+p,S+d).normalize(),e[3].setComponents(o-r,h-l,_-p,S-d).normalize(),e[4].setComponents(o-a,h-u,_-g,S-b).normalize(),e[5].setComponents(o+a,h+u,_+g,S+b).normalize(),this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),xi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),xi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(xi)}intersectsSprite(t){return xi.center.set(0,0,0),xi.radius=.7071067811865476,xi.applyMatrix4(t.matrixWorld),this.intersectsSphere(xi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Gr.x=i.normal.x>0?t.max.x:t.min.x,Gr.y=i.normal.y>0?t.max.y:t.min.y,Gr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Gr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Lh(){let s=null,t=!1,e=null,n=null;function i(r,a){e(r,a),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function a0(s,t){const e=t.isWebGL2,n=new WeakMap;function i(l,u){const h=l.array,f=l.usage,p=s.createBuffer();s.bindBuffer(u,p),s.bufferData(u,h,f),l.onUploadCallback();let g;if(h instanceof Float32Array)g=5126;else if(h instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)g=5131;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else g=5123;else if(h instanceof Int16Array)g=5122;else if(h instanceof Uint32Array)g=5125;else if(h instanceof Int32Array)g=5124;else if(h instanceof Int8Array)g=5120;else if(h instanceof Uint8Array)g=5121;else if(h instanceof Uint8ClampedArray)g=5121;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+h);return{buffer:p,type:g,bytesPerElement:h.BYTES_PER_ELEMENT,version:l.version}}function r(l,u,h){const f=u.array,p=u.updateRange;s.bindBuffer(h,l),p.count===-1?s.bufferSubData(h,0,f):(e?s.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f,p.offset,p.count):s.bufferSubData(h,p.offset*f.BYTES_PER_ELEMENT,f.subarray(p.offset,p.offset+p.count)),p.count=-1),u.onUploadCallback()}function a(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function o(l){l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);u&&(s.deleteBuffer(u.buffer),n.delete(l))}function c(l,u){if(l.isGLBufferAttribute){const f=n.get(l);(!f||f.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h===void 0?n.set(l,i(l,u)):h.version<l.version&&(r(h.buffer,l,u),h.version=l.version)}return{get:a,remove:o,update:c}}class Po extends Gi{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,a=e/2,o=Math.floor(n),c=Math.floor(i),l=o+1,u=c+1,h=t/o,f=e/c,p=[],g=[],_=[],m=[];for(let d=0;d<u;d++){const b=d*f-a;for(let S=0;S<l;S++){const y=S*h-r;g.push(y,-b,0),_.push(0,0,1),m.push(S/o),m.push(1-d/c)}}for(let d=0;d<c;d++)for(let b=0;b<o;b++){const S=b+l*d,y=b+l*(d+1),v=b+1+l*(d+1),T=b+1+l*d;p.push(S,y,T),p.push(y,v,T)}this.setIndex(p),this.setAttribute("position",new Ri(g,3)),this.setAttribute("normal",new Ri(_,3)),this.setAttribute("uv",new Ri(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Po(t.width,t.height,t.widthSegments,t.heightSegments)}}var c0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,l0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,u0=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,h0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,d0=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometry.normal, geometry.viewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,f0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,p0="vec3 transformed = vec3( position );",m0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,g0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			 return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float R21 = R12;
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,v0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = dFdx( surf_pos.xyz );
		vec3 vSigmaY = dFdy( surf_pos.xyz );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,x0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,y0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,S0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,M0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,b0=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,w0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,T0=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,E0=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,A0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
struct GeometricContext {
	vec3 position;
	vec3 normal;
	vec3 viewDir;
#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal;
#endif
};
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,C0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,R0=`vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,D0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,P0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,L0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,I0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,N0="gl_FragColor = linearToOutputTexel( gl_FragColor );",O0=`vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,k0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,U0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,F0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,V0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,z0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,B0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,G0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,W0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,H0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,q0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,X0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,j0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Y0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,$0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in GeometricContext geometry, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Z0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
uniform vec3 lightProbe[ 9 ];
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, const in GeometricContext geometry, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometry.position;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in GeometricContext geometry, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometry.position;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,K0=`#if defined( USE_ENVMAP )
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#if defined( ENVMAP_TYPE_CUBE_UV )
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
#endif`,J0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Q0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometry.normal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in GeometricContext geometry, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,tx=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,ex=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometry.viewDir, geometry.normal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in GeometricContext geometry, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,nx=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( geometryNormal ) ), abs( dFdy( geometryNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif`,ix=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
};
vec3 clearcoatSpecular = vec3( 0.0 );
vec3 sheenSpecular = vec3( 0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
	float D = D_GGX( alpha, dotNH );
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometry.normal;
		vec3 viewDir = geometry.viewDir;
		vec3 position = geometry.position;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometry.normal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometry.clearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecular += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometry.viewDir, geometry.clearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * BRDF_Sheen( directLight.direction, geometry.viewDir, geometry.normal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometry.viewDir, geometry.normal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in GeometricContext geometry, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecular += clearcoatRadiance * EnvironmentBRDF( geometry.clearcoatNormal, geometry.viewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecular += irradiance * material.sheenColor * IBLSheenBRDF( geometry.normal, geometry.viewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometry.normal, geometry.viewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,sx=`
GeometricContext geometry;
geometry.position = - vViewPosition;
geometry.normal = normal;
geometry.viewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
#ifdef USE_CLEARCOAT
	geometry.clearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometry.viewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometry, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, geometry, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometry, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	irradiance += getLightProbeIrradiance( lightProbe, geometry.normal );
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometry.normal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,rx=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometry.normal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	radiance += getIBLRadiance( geometry.viewDir, geometry.normal, material.roughness );
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometry.viewDir, geometry.clearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,ox=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometry, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometry, material, reflectedLight );
#endif`,ax=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,cx=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lx=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,ux=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,hx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,dx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,fx=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,px=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,mx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,gx=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,_x=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,vx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,xx=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,yx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,Sx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#ifdef USE_NORMALMAP_TANGENTSPACE
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal, vNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 geometryNormal = normal;`,Mx=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,bx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Ex=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ax=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = geometryNormal;
#endif`,Cx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Dx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Px=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha + 0.1;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Lx=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Ix=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Nx=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Ox=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,kx=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Ux=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Vx=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,zx=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Bx=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gx=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Wx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Hx=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`,qx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xx=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,jx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Yx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,$x=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Zx=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return toneMappingExposure * color;
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Kx=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmission = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmission.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmission.rgb, material.transmission );
#endif`,Jx=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, vec2 fullSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		
		vec2 lodFudge = pow( 1.95, lod ) / fullSize;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec2 fullSize = vec2( textureSize( sampler, 0 ) );
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), fullSize, floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), fullSize, ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 applyVolumeAttenuation( const in vec3 radiance, const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return radiance;
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance * radiance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 attenuatedColor = applyVolumeAttenuation( transmittedLight.rgb, length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		return vec4( ( 1.0 - F ) * attenuatedColor * diffuseColor, transmittedLight.a );
	}
#endif`,Qx=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ty=`#ifdef USE_UV
	varying vec2 vUv;
#endif
#ifdef USE_UV2
	attribute vec2 uv2;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ey=`#ifdef USE_UV
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,ny=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const iy=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,sy=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ry=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,oy=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ay=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cy=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,ly=`#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uy=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,hy=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dy=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,fy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,py=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
}`,my=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,gy=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,_y=`#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vy=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,xy=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yy=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sy=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,My=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,by=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,wy=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Ty=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ey=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ay=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Cy=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecular;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometry.clearcoatNormal, geometry.viewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + clearcoatSpecular * material.clearcoat;
	#endif
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ry=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dy=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Py=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ly=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Iy=`#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Ny=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,Oy=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ky=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <output_fragment>
	#include <tonemapping_fragment>
	#include <encodings_fragment>
	#include <fog_fragment>
}`,It={alphamap_fragment:c0,alphamap_pars_fragment:l0,alphatest_fragment:u0,alphatest_pars_fragment:h0,aomap_fragment:d0,aomap_pars_fragment:f0,begin_vertex:p0,beginnormal_vertex:m0,bsdfs:g0,iridescence_fragment:_0,bumpmap_pars_fragment:v0,clipping_planes_fragment:x0,clipping_planes_pars_fragment:y0,clipping_planes_pars_vertex:S0,clipping_planes_vertex:M0,color_fragment:b0,color_pars_fragment:w0,color_pars_vertex:T0,color_vertex:E0,common:A0,cube_uv_reflection_fragment:C0,defaultnormal_vertex:R0,displacementmap_pars_vertex:D0,displacementmap_vertex:P0,emissivemap_fragment:L0,emissivemap_pars_fragment:I0,encodings_fragment:N0,encodings_pars_fragment:O0,envmap_fragment:k0,envmap_common_pars_fragment:U0,envmap_pars_fragment:F0,envmap_pars_vertex:V0,envmap_physical_pars_fragment:K0,envmap_vertex:z0,fog_vertex:B0,fog_pars_vertex:G0,fog_fragment:W0,fog_pars_fragment:H0,gradientmap_pars_fragment:q0,lightmap_fragment:X0,lightmap_pars_fragment:j0,lights_lambert_fragment:Y0,lights_lambert_pars_fragment:$0,lights_pars_begin:Z0,lights_toon_fragment:J0,lights_toon_pars_fragment:Q0,lights_phong_fragment:tx,lights_phong_pars_fragment:ex,lights_physical_fragment:nx,lights_physical_pars_fragment:ix,lights_fragment_begin:sx,lights_fragment_maps:rx,lights_fragment_end:ox,logdepthbuf_fragment:ax,logdepthbuf_pars_fragment:cx,logdepthbuf_pars_vertex:lx,logdepthbuf_vertex:ux,map_fragment:hx,map_pars_fragment:dx,map_particle_fragment:fx,map_particle_pars_fragment:px,metalnessmap_fragment:mx,metalnessmap_pars_fragment:gx,morphcolor_vertex:_x,morphnormal_vertex:vx,morphtarget_pars_vertex:xx,morphtarget_vertex:yx,normal_fragment_begin:Sx,normal_fragment_maps:Mx,normal_pars_fragment:bx,normal_pars_vertex:wx,normal_vertex:Tx,normalmap_pars_fragment:Ex,clearcoat_normal_fragment_begin:Ax,clearcoat_normal_fragment_maps:Cx,clearcoat_pars_fragment:Rx,iridescence_pars_fragment:Dx,output_fragment:Px,packing:Lx,premultiplied_alpha_fragment:Ix,project_vertex:Nx,dithering_fragment:Ox,dithering_pars_fragment:kx,roughnessmap_fragment:Ux,roughnessmap_pars_fragment:Fx,shadowmap_pars_fragment:Vx,shadowmap_pars_vertex:zx,shadowmap_vertex:Bx,shadowmask_pars_fragment:Gx,skinbase_vertex:Wx,skinning_pars_vertex:Hx,skinning_vertex:qx,skinnormal_vertex:Xx,specularmap_fragment:jx,specularmap_pars_fragment:Yx,tonemapping_fragment:$x,tonemapping_pars_fragment:Zx,transmission_fragment:Kx,transmission_pars_fragment:Jx,uv_pars_fragment:Qx,uv_pars_vertex:ty,uv_vertex:ey,worldpos_vertex:ny,background_vert:iy,background_frag:sy,backgroundCube_vert:ry,backgroundCube_frag:oy,cube_vert:ay,cube_frag:cy,depth_vert:ly,depth_frag:uy,distanceRGBA_vert:hy,distanceRGBA_frag:dy,equirect_vert:fy,equirect_frag:py,linedashed_vert:my,linedashed_frag:gy,meshbasic_vert:_y,meshbasic_frag:vy,meshlambert_vert:xy,meshlambert_frag:yy,meshmatcap_vert:Sy,meshmatcap_frag:My,meshnormal_vert:by,meshnormal_frag:wy,meshphong_vert:Ty,meshphong_frag:Ey,meshphysical_vert:Ay,meshphysical_frag:Cy,meshtoon_vert:Ry,meshtoon_frag:Dy,points_vert:Py,points_frag:Ly,shadow_vert:Iy,shadow_frag:Ny,sprite_vert:Oy,sprite_frag:ky},ut={common:{diffuse:{value:new re(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaMapTransform:{value:new Gt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Gt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Gt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Gt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Gt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Gt},normalScale:{value:new Zt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Gt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Gt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Gt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Gt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new re(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new re(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaTest:{value:0},uvTransform:{value:new Gt}},sprite:{diffuse:{value:new re(16777215)},opacity:{value:1},center:{value:new Zt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Gt},alphaMap:{value:null},alphaTest:{value:0}}},En={basic:{uniforms:ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.fog]),vertexShader:It.meshbasic_vert,fragmentShader:It.meshbasic_frag},lambert:{uniforms:ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new re(0)}}]),vertexShader:It.meshlambert_vert,fragmentShader:It.meshlambert_frag},phong:{uniforms:ke([ut.common,ut.specularmap,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,ut.lights,{emissive:{value:new re(0)},specular:{value:new re(1118481)},shininess:{value:30}}]),vertexShader:It.meshphong_vert,fragmentShader:It.meshphong_frag},standard:{uniforms:ke([ut.common,ut.envmap,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.roughnessmap,ut.metalnessmap,ut.fog,ut.lights,{emissive:{value:new re(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag},toon:{uniforms:ke([ut.common,ut.aomap,ut.lightmap,ut.emissivemap,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.gradientmap,ut.fog,ut.lights,{emissive:{value:new re(0)}}]),vertexShader:It.meshtoon_vert,fragmentShader:It.meshtoon_frag},matcap:{uniforms:ke([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,ut.fog,{matcap:{value:null}}]),vertexShader:It.meshmatcap_vert,fragmentShader:It.meshmatcap_frag},points:{uniforms:ke([ut.points,ut.fog]),vertexShader:It.points_vert,fragmentShader:It.points_frag},dashed:{uniforms:ke([ut.common,ut.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:It.linedashed_vert,fragmentShader:It.linedashed_frag},depth:{uniforms:ke([ut.common,ut.displacementmap]),vertexShader:It.depth_vert,fragmentShader:It.depth_frag},normal:{uniforms:ke([ut.common,ut.bumpmap,ut.normalmap,ut.displacementmap,{opacity:{value:1}}]),vertexShader:It.meshnormal_vert,fragmentShader:It.meshnormal_frag},sprite:{uniforms:ke([ut.sprite,ut.fog]),vertexShader:It.sprite_vert,fragmentShader:It.sprite_frag},background:{uniforms:{uvTransform:{value:new Gt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:It.background_vert,fragmentShader:It.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:It.backgroundCube_vert,fragmentShader:It.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:It.cube_vert,fragmentShader:It.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:It.equirect_vert,fragmentShader:It.equirect_frag},distanceRGBA:{uniforms:ke([ut.common,ut.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:It.distanceRGBA_vert,fragmentShader:It.distanceRGBA_frag},shadow:{uniforms:ke([ut.lights,ut.fog,{color:{value:new re(0)},opacity:{value:1}}]),vertexShader:It.shadow_vert,fragmentShader:It.shadow_frag}};En.physical={uniforms:ke([En.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Gt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Gt},clearcoatNormalScale:{value:new Zt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Gt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Gt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Gt},sheen:{value:0},sheenColor:{value:new re(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Gt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Gt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Gt},transmissionSamplerSize:{value:new Zt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Gt},attenuationDistance:{value:0},attenuationColor:{value:new re(0)},specularColor:{value:new re(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Gt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Gt}}]),vertexShader:It.meshphysical_vert,fragmentShader:It.meshphysical_frag};const Wr={r:0,b:0,g:0};function Uy(s,t,e,n,i,r,a){const o=new re(0);let c=r===!0?0:1,l,u,h=null,f=0,p=null;function g(m,d){let b=!1,S=d.isScene===!0?d.background:null;S&&S.isTexture&&(S=(d.backgroundBlurriness>0?e:t).get(S));const y=s.xr,v=y.getSession&&y.getSession();v&&v.environmentBlendMode==="additive"&&(S=null),S===null?_(o,c):S&&S.isColor&&(_(S,1),b=!0),(s.autoClear||b)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),S&&(S.isCubeTexture||S.mapping===Co)?(u===void 0&&(u=new Wn(new vr(1,1,1),new hi({name:"BackgroundCubeMaterial",uniforms:bs(En.backgroundCube.uniforms),vertexShader:En.backgroundCube.vertexShader,fragmentShader:En.backgroundCube.fragmentShader,side:qe,depthTest:!1,depthWrite:!1,fog:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(T,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),u.material.uniforms.envMap.value=S,u.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=d.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,u.material.toneMapped=S.encoding!==te,(h!==S||f!==S.version||p!==s.toneMapping)&&(u.material.needsUpdate=!0,h=S,f=S.version,p=s.toneMapping),u.layers.enableAll(),m.unshift(u,u.geometry,u.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new Wn(new Po(2,2),new hi({name:"BackgroundMaterial",uniforms:bs(En.background.uniforms),vertexShader:En.background.vertexShader,fragmentShader:En.background.fragmentShader,side:ui,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=d.backgroundIntensity,l.material.toneMapped=S.encoding!==te,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(h!==S||f!==S.version||p!==s.toneMapping)&&(l.material.needsUpdate=!0,h=S,f=S.version,p=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function _(m,d){m.getRGB(Wr,Ch(s)),n.buffers.color.setClear(Wr.r,Wr.g,Wr.b,d,a)}return{getClearColor:function(){return o},setClearColor:function(m,d=1){o.set(m),c=d,_(o,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,_(o,c)},render:g}}function Fy(s,t,e,n){const i=s.getParameter(34921),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),a=n.isWebGL2||r!==null,o={},c=m(null);let l=c,u=!1;function h(I,k,F,z,G){let X=!1;if(a){const H=_(z,F,k);l!==H&&(l=H,p(l.object)),X=d(I,z,F,G),X&&b(I,z,F,G)}else{const H=k.wireframe===!0;(l.geometry!==z.id||l.program!==F.id||l.wireframe!==H)&&(l.geometry=z.id,l.program=F.id,l.wireframe=H,X=!0)}G!==null&&e.update(G,34963),(X||u)&&(u=!1,E(I,k,F,z),G!==null&&s.bindBuffer(34963,e.get(G).buffer))}function f(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function p(I){return n.isWebGL2?s.bindVertexArray(I):r.bindVertexArrayOES(I)}function g(I){return n.isWebGL2?s.deleteVertexArray(I):r.deleteVertexArrayOES(I)}function _(I,k,F){const z=F.wireframe===!0;let G=o[I.id];G===void 0&&(G={},o[I.id]=G);let X=G[k.id];X===void 0&&(X={},G[k.id]=X);let H=X[z];return H===void 0&&(H=m(f()),X[z]=H),H}function m(I){const k=[],F=[],z=[];for(let G=0;G<i;G++)k[G]=0,F[G]=0,z[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:k,enabledAttributes:F,attributeDivisors:z,object:I,attributes:{},index:null}}function d(I,k,F,z){const G=l.attributes,X=k.attributes;let H=0;const ot=F.getAttributes();for(const Q in ot)if(ot[Q].location>=0){const Z=G[Q];let tt=X[Q];if(tt===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(tt=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(tt=I.instanceColor)),Z===void 0||Z.attribute!==tt||tt&&Z.data!==tt.data)return!0;H++}return l.attributesNum!==H||l.index!==z}function b(I,k,F,z){const G={},X=k.attributes;let H=0;const ot=F.getAttributes();for(const Q in ot)if(ot[Q].location>=0){let Z=X[Q];Z===void 0&&(Q==="instanceMatrix"&&I.instanceMatrix&&(Z=I.instanceMatrix),Q==="instanceColor"&&I.instanceColor&&(Z=I.instanceColor));const tt={};tt.attribute=Z,Z&&Z.data&&(tt.data=Z.data),G[Q]=tt,H++}l.attributes=G,l.attributesNum=H,l.index=z}function S(){const I=l.newAttributes;for(let k=0,F=I.length;k<F;k++)I[k]=0}function y(I){v(I,0)}function v(I,k){const F=l.newAttributes,z=l.enabledAttributes,G=l.attributeDivisors;F[I]=1,z[I]===0&&(s.enableVertexAttribArray(I),z[I]=1),G[I]!==k&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](I,k),G[I]=k)}function T(){const I=l.newAttributes,k=l.enabledAttributes;for(let F=0,z=k.length;F<z;F++)k[F]!==I[F]&&(s.disableVertexAttribArray(F),k[F]=0)}function A(I,k,F,z,G,X){n.isWebGL2===!0&&(F===5124||F===5125)?s.vertexAttribIPointer(I,k,F,G,X):s.vertexAttribPointer(I,k,F,z,G,X)}function E(I,k,F,z){if(n.isWebGL2===!1&&(I.isInstancedMesh||z.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;S();const G=z.attributes,X=F.getAttributes(),H=k.defaultAttributeValues;for(const ot in X){const Q=X[ot];if(Q.location>=0){let q=G[ot];if(q===void 0&&(ot==="instanceMatrix"&&I.instanceMatrix&&(q=I.instanceMatrix),ot==="instanceColor"&&I.instanceColor&&(q=I.instanceColor)),q!==void 0){const Z=q.normalized,tt=q.itemSize,st=e.get(q);if(st===void 0)continue;const B=st.buffer,et=st.type,Mt=st.bytesPerElement;if(q.isInterleavedBufferAttribute){const ct=q.data,St=ct.stride,zt=q.offset;if(ct.isInstancedInterleavedBuffer){for(let _t=0;_t<Q.locationSize;_t++)v(Q.location+_t,ct.meshPerAttribute);I.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=ct.meshPerAttribute*ct.count)}else for(let _t=0;_t<Q.locationSize;_t++)y(Q.location+_t);s.bindBuffer(34962,B);for(let _t=0;_t<Q.locationSize;_t++)A(Q.location+_t,tt/Q.locationSize,et,Z,St*Mt,(zt+tt/Q.locationSize*_t)*Mt)}else{if(q.isInstancedBufferAttribute){for(let ct=0;ct<Q.locationSize;ct++)v(Q.location+ct,q.meshPerAttribute);I.isInstancedMesh!==!0&&z._maxInstanceCount===void 0&&(z._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ct=0;ct<Q.locationSize;ct++)y(Q.location+ct);s.bindBuffer(34962,B);for(let ct=0;ct<Q.locationSize;ct++)A(Q.location+ct,tt/Q.locationSize,et,Z,tt*Mt,tt/Q.locationSize*ct*Mt)}}else if(H!==void 0){const Z=H[ot];if(Z!==void 0)switch(Z.length){case 2:s.vertexAttrib2fv(Q.location,Z);break;case 3:s.vertexAttrib3fv(Q.location,Z);break;case 4:s.vertexAttrib4fv(Q.location,Z);break;default:s.vertexAttrib1fv(Q.location,Z)}}}}T()}function x(){L();for(const I in o){const k=o[I];for(const F in k){const z=k[F];for(const G in z)g(z[G].object),delete z[G];delete k[F]}delete o[I]}}function M(I){if(o[I.id]===void 0)return;const k=o[I.id];for(const F in k){const z=k[F];for(const G in z)g(z[G].object),delete z[G];delete k[F]}delete o[I.id]}function N(I){for(const k in o){const F=o[k];if(F[I.id]===void 0)continue;const z=F[I.id];for(const G in z)g(z[G].object),delete z[G];delete F[I.id]}}function L(){P(),u=!0,l!==c&&(l=c,p(l.object))}function P(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:h,reset:L,resetDefaultState:P,dispose:x,releaseStatesOfGeometry:M,releaseStatesOfProgram:N,initAttributes:S,enableAttribute:y,disableUnusedAttributes:T}}function Vy(s,t,e,n){const i=n.isWebGL2;let r;function a(l){r=l}function o(l,u){s.drawArrays(r,l,u),e.update(u,r,1)}function c(l,u,h){if(h===0)return;let f,p;if(i)f=s,p="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](r,l,u,h),e.update(u,r,h)}this.setMode=a,this.render=o,this.renderInstances=c}function zy(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(A){if(A==="highp"){if(s.getShaderPrecisionFormat(35633,36338).precision>0&&s.getShaderPrecisionFormat(35632,36338).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(35633,36337).precision>0&&s.getShaderPrecisionFormat(35632,36337).precision>0?"mediump":"lowp"}const a=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let o=e.precision!==void 0?e.precision:"highp";const c=r(o);c!==o&&(console.warn("THREE.WebGLRenderer:",o,"not supported, using",c,"instead."),o=c);const l=a||t.has("WEBGL_draw_buffers"),u=e.logarithmicDepthBuffer===!0,h=s.getParameter(34930),f=s.getParameter(35660),p=s.getParameter(3379),g=s.getParameter(34076),_=s.getParameter(34921),m=s.getParameter(36347),d=s.getParameter(36348),b=s.getParameter(36349),S=f>0,y=a||t.has("OES_texture_float"),v=S&&y,T=a?s.getParameter(36183):0;return{isWebGL2:a,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:o,logarithmicDepthBuffer:u,maxTextures:h,maxVertexTextures:f,maxTextureSize:p,maxCubemapSize:g,maxAttributes:_,maxVertexUniforms:m,maxVaryings:d,maxFragmentUniforms:b,vertexTextures:S,floatFragmentTextures:y,floatVertexTextures:v,maxSamples:T}}function By(s){const t=this;let e=null,n=0,i=!1,r=!1;const a=new yi,o=new Gt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(h,f){const p=h.length!==0||f||n!==0||i;return i=f,n=h.length,p},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,f){e=u(h,f,0)},this.setState=function(h,f,p){const g=h.clippingPlanes,_=h.clipIntersection,m=h.clipShadows,d=s.get(h);if(!i||g===null||g.length===0||r&&!m)r?u(null):l();else{const b=r?0:n,S=b*4;let y=d.clippingState||null;c.value=y,y=u(g,f,S,p);for(let v=0;v!==S;++v)y[v]=e[v];d.clippingState=y,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=b}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function u(h,f,p,g){const _=h!==null?h.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const d=p+_*4,b=f.matrixWorldInverse;o.getNormalMatrix(b),(m===null||m.length<d)&&(m=new Float32Array(d));for(let S=0,y=p;S!==_;++S,y+=4)a.copy(h[S]).applyMatrix4(b,o),a.normal.toArray(m,y),m[y+3]=a.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Gy(s){let t=new WeakMap;function e(a,o){return o===Ia?a.mapping=ys:o===Na&&(a.mapping=Ss),a}function n(a){if(a&&a.isTexture&&a.isRenderTargetTexture===!1){const o=a.mapping;if(o===Ia||o===Na)if(t.has(a)){const c=t.get(a).texture;return e(c,a.mapping)}else{const c=a.image;if(c&&c.height>0){const l=new s0(c.height/2);return l.fromEquirectangularTexture(s,a),t.set(a,l),a.addEventListener("dispose",i),e(l.texture,a.mapping)}else return null}}return a}function i(a){const o=a.target;o.removeEventListener("dispose",i);const c=t.get(o);c!==void 0&&(t.delete(o),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Wy extends Rh{constructor(t=-1,e=1,n=1,i=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,a=n+t,o=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,a=r+l*this.view.width,o-=u*this.view.offsetY,c=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,c,this.near,this.far),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const cs=4,Pl=[.125,.215,.35,.446,.526,.582],wi=20,ha=new Wy,Ll=new re;let da=null;const Si=(1+Math.sqrt(5))/2,ss=1/Si,Il=[new W(1,1,1),new W(-1,1,1),new W(1,1,-1),new W(-1,1,-1),new W(0,Si,ss),new W(0,Si,-ss),new W(ss,0,Si),new W(-ss,0,Si),new W(Si,ss,0),new W(-Si,ss,0)];class Nl{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){da=this._renderer.getRenderTarget(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ul(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=kl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(da),t.scissorTest=!1,Hr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ys||t.mapping===Ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),da=this._renderer.getRenderTarget();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:rn,minFilter:rn,generateMipmaps:!1,type:er,format:_n,encoding:Ui,depthBuffer:!1},i=Ol(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ol(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Hy(r)),this._blurMaterial=qy(r,t,e)}return i}_compileMaterial(t){const e=new Wn(this._lodPlanes[0],t);this._renderer.compile(e,ha)}_sceneToCubeUV(t,e,n,i){const o=new on(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],u=this._renderer,h=u.autoClear,f=u.toneMapping;u.getClearColor(Ll),u.toneMapping=qn,u.autoClear=!1;const p=new Th({name:"PMREM.Background",side:qe,depthWrite:!1,depthTest:!1}),g=new Wn(new vr,p);let _=!1;const m=t.background;m?m.isColor&&(p.color.copy(m),t.background=null,_=!0):(p.color.copy(Ll),_=!0);for(let d=0;d<6;d++){const b=d%3;b===0?(o.up.set(0,c[d],0),o.lookAt(l[d],0,0)):b===1?(o.up.set(0,0,c[d]),o.lookAt(0,l[d],0)):(o.up.set(0,c[d],0),o.lookAt(0,0,l[d]));const S=this._cubeSize;Hr(i,b*S,d>2?S:0,S,S),u.setRenderTarget(i),_&&u.render(g,o),u.render(t,o)}g.geometry.dispose(),g.material.dispose(),u.toneMapping=f,u.autoClear=h,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ys||t.mapping===Ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ul()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=kl());const r=i?this._cubemapMaterial:this._equirectMaterial,a=new Wn(this._lodPlanes[0],r),o=r.uniforms;o.envMap.value=t;const c=this._cubeSize;Hr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(a,ha)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),a=Il[(i-1)%Il.length];this._blur(t,i-1,i,r,a)}e.autoClear=n}_blur(t,e,n,i,r){const a=this._pingPongRenderTarget;this._halfBlur(t,a,e,n,i,"latitudinal",r),this._halfBlur(a,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,a,o){const c=this._renderer,l=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,h=new Wn(this._lodPlanes[i],l),f=l.uniforms,p=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*p):2*Math.PI/(2*wi-1),_=r/g,m=isFinite(r)?1+Math.floor(u*_):wi;m>wi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${wi}`);const d=[];let b=0;for(let A=0;A<wi;++A){const E=A/_,x=Math.exp(-E*E/2);d.push(x),A===0?b+=x:A<m&&(b+=2*x)}for(let A=0;A<d.length;A++)d[A]=d[A]/b;f.envMap.value=t.texture,f.samples.value=m,f.weights.value=d,f.latitudinal.value=a==="latitudinal",o&&(f.poleAxis.value=o);const{_lodMax:S}=this;f.dTheta.value=g,f.mipInt.value=S-n;const y=this._sizeLods[i],v=3*y*(i>S-cs?i-S+cs:0),T=4*(this._cubeSize-y);Hr(e,v,T,3*y,2*y),c.setRenderTarget(e),c.render(h,ha)}}function Hy(s){const t=[],e=[],n=[];let i=s;const r=s-cs+1+Pl.length;for(let a=0;a<r;a++){const o=Math.pow(2,i);e.push(o);let c=1/o;a>s-cs?c=Pl[a-s+cs-1]:a===0&&(c=0),n.push(c);const l=1/(o-2),u=-l,h=1+l,f=[u,u,h,u,h,h,u,u,h,h,u,h],p=6,g=6,_=3,m=2,d=1,b=new Float32Array(_*g*p),S=new Float32Array(m*g*p),y=new Float32Array(d*g*p);for(let T=0;T<p;T++){const A=T%3*2/3-1,E=T>2?0:-1,x=[A,E,0,A+2/3,E,0,A+2/3,E+1,0,A,E,0,A+2/3,E+1,0,A,E+1,0];b.set(x,_*g*T),S.set(f,m*g*T);const M=[T,T,T,T,T,T];y.set(M,d*g*T)}const v=new Gi;v.setAttribute("position",new Cn(b,_)),v.setAttribute("uv",new Cn(S,m)),v.setAttribute("faceIndex",new Cn(y,d)),t.push(v),i>cs&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ol(s,t,e){const n=new Fi(s,t,e);return n.texture.mapping=Co,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function qy(s,t,e){const n=new Float32Array(wi),i=new W(0,1,0);return new hi({name:"SphericalGaussianBlur",defines:{n:wi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function kl(){return new hi({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function Ul(){return new hi({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:mc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:oi,depthTest:!1,depthWrite:!1})}function mc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Xy(s){let t=new WeakMap,e=null;function n(o){if(o&&o.isTexture){const c=o.mapping,l=c===Ia||c===Na,u=c===ys||c===Ss;if(l||u)if(o.isRenderTargetTexture&&o.needsPMREMUpdate===!0){o.needsPMREMUpdate=!1;let h=t.get(o);return e===null&&(e=new Nl(s)),h=l?e.fromEquirectangular(o,h):e.fromCubemap(o,h),t.set(o,h),h.texture}else{if(t.has(o))return t.get(o).texture;{const h=o.image;if(l&&h&&h.height>0||u&&h&&i(h)){e===null&&(e=new Nl(s));const f=l?e.fromEquirectangular(o):e.fromCubemap(o);return t.set(o,f),o.addEventListener("dispose",r),f.texture}else return null}}}return o}function i(o){let c=0;const l=6;for(let u=0;u<l;u++)o[u]!==void 0&&c++;return c===l}function r(o){const c=o.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function a(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:a}}function jy(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?e("EXT_color_buffer_float"):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Yy(s,t,e,n){const i={},r=new WeakMap;function a(h){const f=h.target;f.index!==null&&t.remove(f.index);for(const g in f.attributes)t.remove(f.attributes[g]);f.removeEventListener("dispose",a),delete i[f.id];const p=r.get(f);p&&(t.remove(p),r.delete(f)),n.releaseStatesOfGeometry(f),f.isInstancedBufferGeometry===!0&&delete f._maxInstanceCount,e.memory.geometries--}function o(h,f){return i[f.id]===!0||(f.addEventListener("dispose",a),i[f.id]=!0,e.memory.geometries++),f}function c(h){const f=h.attributes;for(const g in f)t.update(f[g],34962);const p=h.morphAttributes;for(const g in p){const _=p[g];for(let m=0,d=_.length;m<d;m++)t.update(_[m],34962)}}function l(h){const f=[],p=h.index,g=h.attributes.position;let _=0;if(p!==null){const b=p.array;_=p.version;for(let S=0,y=b.length;S<y;S+=3){const v=b[S+0],T=b[S+1],A=b[S+2];f.push(v,T,T,A,A,v)}}else{const b=g.array;_=g.version;for(let S=0,y=b.length/3-1;S<y;S+=3){const v=S+0,T=S+1,A=S+2;f.push(v,T,T,A,A,v)}}const m=new(xh(f)?Ah:Eh)(f,1);m.version=_;const d=r.get(h);d&&t.remove(d),r.set(h,m)}function u(h){const f=r.get(h);if(f){const p=h.index;p!==null&&f.version<p.version&&l(h)}else l(h);return r.get(h)}return{get:o,update:c,getWireframeAttribute:u}}function $y(s,t,e,n){const i=n.isWebGL2;let r;function a(f){r=f}let o,c;function l(f){o=f.type,c=f.bytesPerElement}function u(f,p){s.drawElements(r,p,o,f*c),e.update(p,r,1)}function h(f,p,g){if(g===0)return;let _,m;if(i)_=s,m="drawElementsInstanced";else if(_=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",_===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}_[m](r,p,o,f*c,g),e.update(p,r,g)}this.setMode=a,this.setIndex=l,this.render=u,this.renderInstances=h}function Zy(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,a,o){switch(e.calls++,a){case 4:e.triangles+=o*(r/3);break;case 1:e.lines+=o*(r/2);break;case 3:e.lines+=o*(r-1);break;case 2:e.lines+=o*r;break;case 0:e.points+=o*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",a);break}}function i(){e.frame++,e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Ky(s,t){return s[0]-t[0]}function Jy(s,t){return Math.abs(t[1])-Math.abs(s[1])}function Qy(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,a=new Ee,o=[];for(let l=0;l<8;l++)o[l]=[l,0];function c(l,u,h){const f=l.morphTargetInfluences;if(t.isWebGL2===!0){const g=u.morphAttributes.position||u.morphAttributes.normal||u.morphAttributes.color,_=g!==void 0?g.length:0;let m=r.get(u);if(m===void 0||m.count!==_){let k=function(){P.dispose(),r.delete(u),u.removeEventListener("dispose",k)};var p=k;m!==void 0&&m.texture.dispose();const S=u.morphAttributes.position!==void 0,y=u.morphAttributes.normal!==void 0,v=u.morphAttributes.color!==void 0,T=u.morphAttributes.position||[],A=u.morphAttributes.normal||[],E=u.morphAttributes.color||[];let x=0;S===!0&&(x=1),y===!0&&(x=2),v===!0&&(x=3);let M=u.attributes.position.count*x,N=1;M>t.maxTextureSize&&(N=Math.ceil(M/t.maxTextureSize),M=t.maxTextureSize);const L=new Float32Array(M*N*4*_),P=new Mh(L,M,N,_);P.type=Ei,P.needsUpdate=!0;const I=x*4;for(let F=0;F<_;F++){const z=T[F],G=A[F],X=E[F],H=M*N*4*F;for(let ot=0;ot<z.count;ot++){const Q=ot*I;S===!0&&(a.fromBufferAttribute(z,ot),L[H+Q+0]=a.x,L[H+Q+1]=a.y,L[H+Q+2]=a.z,L[H+Q+3]=0),y===!0&&(a.fromBufferAttribute(G,ot),L[H+Q+4]=a.x,L[H+Q+5]=a.y,L[H+Q+6]=a.z,L[H+Q+7]=0),v===!0&&(a.fromBufferAttribute(X,ot),L[H+Q+8]=a.x,L[H+Q+9]=a.y,L[H+Q+10]=a.z,L[H+Q+11]=X.itemSize===4?a.w:1)}}m={count:_,texture:P,size:new Zt(M,N)},r.set(u,m),u.addEventListener("dispose",k)}let d=0;for(let S=0;S<f.length;S++)d+=f[S];const b=u.morphTargetsRelative?1:1-d;h.getUniforms().setValue(s,"morphTargetBaseInfluence",b),h.getUniforms().setValue(s,"morphTargetInfluences",f),h.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),h.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=f===void 0?0:f.length;let _=n[u.id];if(_===void 0||_.length!==g){_=[];for(let y=0;y<g;y++)_[y]=[y,0];n[u.id]=_}for(let y=0;y<g;y++){const v=_[y];v[0]=y,v[1]=f[y]}_.sort(Jy);for(let y=0;y<8;y++)y<g&&_[y][1]?(o[y][0]=_[y][0],o[y][1]=_[y][1]):(o[y][0]=Number.MAX_SAFE_INTEGER,o[y][1]=0);o.sort(Ky);const m=u.morphAttributes.position,d=u.morphAttributes.normal;let b=0;for(let y=0;y<8;y++){const v=o[y],T=v[0],A=v[1];T!==Number.MAX_SAFE_INTEGER&&A?(m&&u.getAttribute("morphTarget"+y)!==m[T]&&u.setAttribute("morphTarget"+y,m[T]),d&&u.getAttribute("morphNormal"+y)!==d[T]&&u.setAttribute("morphNormal"+y,d[T]),i[y]=A,b+=A):(m&&u.hasAttribute("morphTarget"+y)===!0&&u.deleteAttribute("morphTarget"+y),d&&u.hasAttribute("morphNormal"+y)===!0&&u.deleteAttribute("morphNormal"+y),i[y]=0)}const S=u.morphTargetsRelative?1:1-b;h.getUniforms().setValue(s,"morphTargetBaseInfluence",S),h.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function tS(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,u=c.geometry,h=t.get(c,u);return i.get(h)!==l&&(t.update(h),i.set(h,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",o)===!1&&c.addEventListener("dispose",o),e.update(c.instanceMatrix,34962),c.instanceColor!==null&&e.update(c.instanceColor,34962)),h}function a(){i=new WeakMap}function o(c){const l=c.target;l.removeEventListener("dispose",o),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:a}}const Ih=new Qe,Nh=new Mh,Oh=new Bv,kh=new Dh,Fl=[],Vl=[],zl=new Float32Array(16),Bl=new Float32Array(9),Gl=new Float32Array(4);function Ps(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Fl[i];if(r===void 0&&(r=new Float32Array(i),Fl[i]=r),t!==0){n.toArray(r,0);for(let a=1,o=0;a!==t;++a)o+=e,s[a].toArray(r,o)}return r}function ye(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Se(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Lo(s,t){let e=Vl[t];e===void 0&&(e=new Int32Array(t),Vl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function eS(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function nS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2fv(this.addr,t),Se(e,t)}}function iS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(ye(e,t))return;s.uniform3fv(this.addr,t),Se(e,t)}}function sS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4fv(this.addr,t),Se(e,t)}}function rS(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Gl.set(n),s.uniformMatrix2fv(this.addr,!1,Gl),Se(e,n)}}function oS(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;Bl.set(n),s.uniformMatrix3fv(this.addr,!1,Bl),Se(e,n)}}function aS(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(ye(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Se(e,t)}else{if(ye(e,n))return;zl.set(n),s.uniformMatrix4fv(this.addr,!1,zl),Se(e,n)}}function cS(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function lS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2iv(this.addr,t),Se(e,t)}}function uS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;s.uniform3iv(this.addr,t),Se(e,t)}}function hS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4iv(this.addr,t),Se(e,t)}}function dS(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function fS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(ye(e,t))return;s.uniform2uiv(this.addr,t),Se(e,t)}}function pS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(ye(e,t))return;s.uniform3uiv(this.addr,t),Se(e,t)}}function mS(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(ye(e,t))return;s.uniform4uiv(this.addr,t),Se(e,t)}}function gS(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2D(t||Ih,i)}function _S(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Oh,i)}function vS(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||kh,i)}function xS(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Nh,i)}function yS(s){switch(s){case 5126:return eS;case 35664:return nS;case 35665:return iS;case 35666:return sS;case 35674:return rS;case 35675:return oS;case 35676:return aS;case 5124:case 35670:return cS;case 35667:case 35671:return lS;case 35668:case 35672:return uS;case 35669:case 35673:return hS;case 5125:return dS;case 36294:return fS;case 36295:return pS;case 36296:return mS;case 35678:case 36198:case 36298:case 36306:case 35682:return gS;case 35679:case 36299:case 36307:return _S;case 35680:case 36300:case 36308:case 36293:return vS;case 36289:case 36303:case 36311:case 36292:return xS}}function SS(s,t){s.uniform1fv(this.addr,t)}function MS(s,t){const e=Ps(t,this.size,2);s.uniform2fv(this.addr,e)}function bS(s,t){const e=Ps(t,this.size,3);s.uniform3fv(this.addr,e)}function wS(s,t){const e=Ps(t,this.size,4);s.uniform4fv(this.addr,e)}function TS(s,t){const e=Ps(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function ES(s,t){const e=Ps(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function AS(s,t){const e=Ps(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function CS(s,t){s.uniform1iv(this.addr,t)}function RS(s,t){s.uniform2iv(this.addr,t)}function DS(s,t){s.uniform3iv(this.addr,t)}function PS(s,t){s.uniform4iv(this.addr,t)}function LS(s,t){s.uniform1uiv(this.addr,t)}function IS(s,t){s.uniform2uiv(this.addr,t)}function NS(s,t){s.uniform3uiv(this.addr,t)}function OS(s,t){s.uniform4uiv(this.addr,t)}function kS(s,t,e){const n=this.cache,i=t.length,r=Lo(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTexture2D(t[a]||Ih,r[a])}function US(s,t,e){const n=this.cache,i=t.length,r=Lo(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTexture3D(t[a]||Oh,r[a])}function FS(s,t,e){const n=this.cache,i=t.length,r=Lo(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTextureCube(t[a]||kh,r[a])}function VS(s,t,e){const n=this.cache,i=t.length,r=Lo(e,i);ye(n,r)||(s.uniform1iv(this.addr,r),Se(n,r));for(let a=0;a!==i;++a)e.setTexture2DArray(t[a]||Nh,r[a])}function zS(s){switch(s){case 5126:return SS;case 35664:return MS;case 35665:return bS;case 35666:return wS;case 35674:return TS;case 35675:return ES;case 35676:return AS;case 5124:case 35670:return CS;case 35667:case 35671:return RS;case 35668:case 35672:return DS;case 35669:case 35673:return PS;case 5125:return LS;case 36294:return IS;case 36295:return NS;case 36296:return OS;case 35678:case 36198:case 36298:case 36306:case 35682:return kS;case 35679:case 36299:case 36307:return US;case 35680:case 36300:case 36308:case 36293:return FS;case 36289:case 36303:case 36311:case 36292:return VS}}class BS{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.setValue=yS(e.type)}}class GS{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.size=e.size,this.setValue=zS(e.type)}}class WS{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,a=i.length;r!==a;++r){const o=i[r];o.setValue(t,e[o.id],n)}}}const fa=/(\w+)(\])?(\[|\.)?/g;function Wl(s,t){s.seq.push(t),s.map[t.id]=t}function HS(s,t,e){const n=s.name,i=n.length;for(fa.lastIndex=0;;){const r=fa.exec(n),a=fa.lastIndex;let o=r[1];const c=r[2]==="]",l=r[3];if(c&&(o=o|0),l===void 0||l==="["&&a+2===i){Wl(e,l===void 0?new BS(o,s,t):new GS(o,s,t));break}else{let h=e.map[o];h===void 0&&(h=new WS(o),Wl(e,h)),e=h}}}class Kr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,35718);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),a=t.getUniformLocation(e,r.name);HS(r,a,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,a=e.length;r!==a;++r){const o=e[r],c=n[o.id];c.needsUpdate!==!1&&o.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const a=t[i];a.id in e&&n.push(a)}return n}}function Hl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}let qS=0;function XS(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let a=i;a<r;a++){const o=a+1;n.push(`${o===t?">":" "} ${o}: ${e[a]}`)}return n.join(`
`)}function jS(s){switch(s){case Ui:return["Linear","( value )"];case te:return["sRGB","( value )"];default:return console.warn("THREE.WebGLProgram: Unsupported encoding:",s),["Linear","( value )"]}}function ql(s,t,e){const n=s.getShaderParameter(t,35713),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const a=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+XS(s.getShaderSource(t),a)}else return i}function YS(s,t){const e=jS(t);return"vec4 "+s+"( vec4 value ) { return LinearTo"+e[0]+e[1]+"; }"}function $S(s,t){let e;switch(t){case ov:e="Linear";break;case av:e="Reinhard";break;case cv:e="OptimizedCineon";break;case lv:e="ACESFilmic";break;case uv:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ZS(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Fs).join(`
`)}function KS(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function JS(s,t){const e={},n=s.getProgramParameter(t,35721);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),a=r.name;let o=1;r.type===35674&&(o=2),r.type===35675&&(o=3),r.type===35676&&(o=4),e[a]={type:r.type,location:s.getAttribLocation(t,a),locationSize:o}}return e}function Fs(s){return s!==""}function Xl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function jl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const QS=/^[ \t]*#include +<([\w\d./]+)>/gm;function Va(s){return s.replace(QS,tM)}function tM(s,t){const e=It[t];if(e===void 0)throw new Error("Can not resolve #include <"+t+">");return Va(e)}const eM=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(s){return s.replace(eM,nM)}function nM(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function $l(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function iM(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===dh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===F_?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Us&&(t="SHADOWMAP_TYPE_VSM"),t}function sM(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ys:case Ss:t="ENVMAP_TYPE_CUBE";break;case Co:t="ENVMAP_TYPE_CUBE_UV";break}return t}function rM(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Ss:t="ENVMAP_MODE_REFRACTION";break}return t}function oM(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case mh:t="ENVMAP_BLENDING_MULTIPLY";break;case sv:t="ENVMAP_BLENDING_MIX";break;case rv:t="ENVMAP_BLENDING_ADD";break}return t}function aM(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function cM(s,t,e,n){const i=s.getContext(),r=e.defines;let a=e.vertexShader,o=e.fragmentShader;const c=iM(e),l=sM(e),u=rM(e),h=oM(e),f=aM(e),p=e.isWebGL2?"":ZS(e),g=KS(r),_=i.createProgram();let m,d,b=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=[g].filter(Fs).join(`
`),m.length>0&&(m+=`
`),d=[p,g].filter(Fs).join(`
`),d.length>0&&(d+=`
`)):(m=[$l(e),"#define SHADER_NAME "+e.shaderName,g,e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+u:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs2?"#define USE_UV2":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Fs).join(`
`),d=[p,$l(e),"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+u:"",e.envMap?"#define "+h:"",f?"#define CUBEUV_TEXEL_WIDTH "+f.texelWidth:"",f?"#define CUBEUV_TEXEL_HEIGHT "+f.texelHeight:"",f?"#define CUBEUV_MAX_MIP "+f.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.vertexTangents?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUvs2?"#define USE_UV2":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==qn?"#define TONE_MAPPING":"",e.toneMapping!==qn?It.tonemapping_pars_fragment:"",e.toneMapping!==qn?$S("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",It.encodings_pars_fragment,YS("linearToOutputTexel",e.outputEncoding),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Fs).join(`
`)),a=Va(a),a=Xl(a,e),a=jl(a,e),o=Va(o),o=Xl(o,e),o=jl(o,e),a=Yl(a),o=Yl(o),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(b=`#version 300 es
`,m=["precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,d=["#define varying in",e.glslVersion===ml?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===ml?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+d);const S=b+m+a,y=b+d+o,v=Hl(i,35633,S),T=Hl(i,35632,y);if(i.attachShader(_,v),i.attachShader(_,T),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_),s.debug.checkShaderErrors){const x=i.getProgramInfoLog(_).trim(),M=i.getShaderInfoLog(v).trim(),N=i.getShaderInfoLog(T).trim();let L=!0,P=!0;if(i.getProgramParameter(_,35714)===!1)if(L=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,v,T);else{const I=ql(i,v,"vertex"),k=ql(i,T,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,35715)+`

Program Info Log: `+x+`
`+I+`
`+k)}else x!==""?console.warn("THREE.WebGLProgram: Program Info Log:",x):(M===""||N==="")&&(P=!1);P&&(this.diagnostics={runnable:L,programLog:x,vertexShader:{log:M,prefix:m},fragmentShader:{log:N,prefix:d}})}i.deleteShader(v),i.deleteShader(T);let A;this.getUniforms=function(){return A===void 0&&(A=new Kr(i,_)),A};let E;return this.getAttributes=function(){return E===void 0&&(E=JS(i,_)),E},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.name=e.shaderName,this.id=qS++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=v,this.fragmentShader=T,this}let lM=0;class uM{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),a=this._getShaderCacheForMaterial(t);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(r)===!1&&(a.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new hM(t),e.set(t,n)),n}}class hM{constructor(t){this.id=lM++,this.code=t,this.usedTimes=0}}function dM(s,t,e,n,i,r,a){const o=new bh,c=new uM,l=[],u=i.isWebGL2,h=i.logarithmicDepthBuffer,f=i.vertexTextures;let p=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(x){return x===1?"uv2":"uv"}function m(x,M,N,L,P){const I=L.fog,k=P.geometry,F=x.isMeshStandardMaterial?L.environment:null,z=(x.isMeshStandardMaterial?e:t).get(x.envMap||F),G=z&&z.mapping===Co?z.image.height:null,X=g[x.type];x.precision!==null&&(p=i.getMaxPrecision(x.precision),p!==x.precision&&console.warn("THREE.WebGLProgram.getParameters:",x.precision,"not supported, using",p,"instead."));const H=k.morphAttributes.position||k.morphAttributes.normal||k.morphAttributes.color,ot=H!==void 0?H.length:0;let Q=0;k.morphAttributes.position!==void 0&&(Q=1),k.morphAttributes.normal!==void 0&&(Q=2),k.morphAttributes.color!==void 0&&(Q=3);let q,Z,tt,st;if(X){const dt=En[X];q=dt.vertexShader,Z=dt.fragmentShader}else q=x.vertexShader,Z=x.fragmentShader,c.update(x),tt=c.getVertexShaderID(x),st=c.getFragmentShaderID(x);const B=s.getRenderTarget(),et=P.isInstancedMesh===!0,Mt=!!x.map,ct=!!x.matcap,St=!!z,zt=!!x.aoMap,_t=!!x.lightMap,Ot=!!x.bumpMap,at=!!x.normalMap,ft=!!x.displacementMap,kt=!!x.emissiveMap,Dt=!!x.metalnessMap,gt=!!x.roughnessMap,Ct=x.clearcoat>0,$t=x.iridescence>0,R=x.sheen>0,w=x.transmission>0,j=Ct&&!!x.clearcoatMap,nt=Ct&&!!x.clearcoatNormalMap,rt=Ct&&!!x.clearcoatRoughnessMap,ht=$t&&!!x.iridescenceMap,Et=$t&&!!x.iridescenceThicknessMap,mt=R&&!!x.sheenColorMap,K=R&&!!x.sheenRoughnessMap,vt=!!x.specularMap,bt=!!x.specularColorMap,Tt=!!x.specularIntensityMap,pt=w&&!!x.transmissionMap,xt=w&&!!x.thicknessMap,Wt=!!x.gradientMap,qt=!!x.alphaMap,ue=x.alphaTest>0,O=!!x.extensions,$=!!k.attributes.uv2;return{isWebGL2:u,shaderID:X,shaderName:x.type,vertexShader:q,fragmentShader:Z,defines:x.defines,customVertexShaderID:tt,customFragmentShaderID:st,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:p,instancing:et,instancingColor:et&&P.instanceColor!==null,supportsVertexTextures:f,outputEncoding:B===null?s.outputEncoding:B.isXRRenderTarget===!0?B.texture.encoding:Ui,map:Mt,matcap:ct,envMap:St,envMapMode:St&&z.mapping,envMapCubeUVHeight:G,aoMap:zt,lightMap:_t,bumpMap:Ot,normalMap:at,displacementMap:f&&ft,emissiveMap:kt,normalMapObjectSpace:at&&x.normalMapType===Dv,normalMapTangentSpace:at&&x.normalMapType===Rv,decodeVideoTexture:Mt&&x.map.isVideoTexture===!0&&x.map.encoding===te,metalnessMap:Dt,roughnessMap:gt,clearcoat:Ct,clearcoatMap:j,clearcoatNormalMap:nt,clearcoatRoughnessMap:rt,iridescence:$t,iridescenceMap:ht,iridescenceThicknessMap:Et,sheen:R,sheenColorMap:mt,sheenRoughnessMap:K,specularMap:vt,specularColorMap:bt,specularIntensityMap:Tt,transmission:w,transmissionMap:pt,thicknessMap:xt,gradientMap:Wt,opaque:x.transparent===!1&&x.blending===ds,alphaMap:qt,alphaTest:ue,combine:x.combine,mapUv:Mt&&_(x.map.channel),aoMapUv:zt&&_(x.aoMap.channel),lightMapUv:_t&&_(x.lightMap.channel),bumpMapUv:Ot&&_(x.bumpMap.channel),normalMapUv:at&&_(x.normalMap.channel),displacementMapUv:ft&&_(x.displacementMap.channel),emissiveMapUv:kt&&_(x.emissiveMap.channel),metalnessMapUv:Dt&&_(x.metalnessMap.channel),roughnessMapUv:gt&&_(x.roughnessMap.channel),clearcoatMapUv:j&&_(x.clearcoatMap.channel),clearcoatNormalMapUv:nt&&_(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:rt&&_(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ht&&_(x.iridescenceMap.channel),iridescenceThicknessMapUv:Et&&_(x.iridescenceThicknessMap.channel),sheenColorMapUv:mt&&_(x.sheenColorMap.channel),sheenRoughnessMapUv:K&&_(x.sheenRoughnessMap.channel),specularMapUv:vt&&_(x.specularMap.channel),specularColorMapUv:bt&&_(x.specularColorMap.channel),specularIntensityMapUv:Tt&&_(x.specularIntensityMap.channel),transmissionMapUv:pt&&_(x.transmissionMap.channel),thicknessMapUv:xt&&_(x.thicknessMap.channel),alphaMapUv:qt&&_(x.alphaMap.channel),vertexTangents:at&&!!k.attributes.tangent,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!k.attributes.color&&k.attributes.color.itemSize===4,vertexUvs2:$,pointsUvs:P.isPoints===!0&&!!k.attributes.uv&&(Mt||qt),fog:!!I,useFog:x.fog===!0,fogExp2:I&&I.isFogExp2,flatShading:x.flatShading===!0,sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:h,skinning:P.isSkinnedMesh===!0,morphTargets:k.morphAttributes.position!==void 0,morphNormals:k.morphAttributes.normal!==void 0,morphColors:k.morphAttributes.color!==void 0,morphTargetsCount:ot,morphTextureStride:Q,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:x.dithering,shadowMapEnabled:s.shadowMap.enabled&&N.length>0,shadowMapType:s.shadowMap.type,toneMapping:x.toneMapped?s.toneMapping:qn,useLegacyLights:s.useLegacyLights,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Bn,flipSided:x.side===qe,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionDerivatives:O&&x.extensions.derivatives===!0,extensionFragDepth:O&&x.extensions.fragDepth===!0,extensionDrawBuffers:O&&x.extensions.drawBuffers===!0,extensionShaderTextureLOD:O&&x.extensions.shaderTextureLOD===!0,rendererExtensionFragDepth:u||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:u||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:u||n.has("EXT_shader_texture_lod"),customProgramCacheKey:x.customProgramCacheKey()}}function d(x){const M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(const N in x.defines)M.push(N),M.push(x.defines[N]);return x.isRawShaderMaterial===!1&&(b(M,x),S(M,x),M.push(s.outputEncoding)),M.push(x.customProgramCacheKey),M.join()}function b(x,M){x.push(M.precision),x.push(M.outputEncoding),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function S(x,M){o.disableAll(),M.isWebGL2&&o.enable(0),M.supportsVertexTextures&&o.enable(1),M.instancing&&o.enable(2),M.instancingColor&&o.enable(3),M.matcap&&o.enable(4),M.envMap&&o.enable(5),M.normalMapObjectSpace&&o.enable(6),M.normalMapTangentSpace&&o.enable(7),M.clearcoat&&o.enable(8),M.iridescence&&o.enable(9),M.alphaTest&&o.enable(10),M.vertexColors&&o.enable(11),M.vertexAlphas&&o.enable(12),M.vertexUvs2&&o.enable(13),M.vertexTangents&&o.enable(14),x.push(o.mask),o.disableAll(),M.fog&&o.enable(0),M.useFog&&o.enable(1),M.flatShading&&o.enable(2),M.logarithmicDepthBuffer&&o.enable(3),M.skinning&&o.enable(4),M.morphTargets&&o.enable(5),M.morphNormals&&o.enable(6),M.morphColors&&o.enable(7),M.premultipliedAlpha&&o.enable(8),M.shadowMapEnabled&&o.enable(9),M.useLegacyLights&&o.enable(10),M.doubleSided&&o.enable(11),M.flipSided&&o.enable(12),M.useDepthPacking&&o.enable(13),M.dithering&&o.enable(14),M.transmission&&o.enable(15),M.sheen&&o.enable(16),M.decodeVideoTexture&&o.enable(17),M.opaque&&o.enable(18),M.pointsUvs&&o.enable(19),x.push(o.mask)}function y(x){const M=g[x.type];let N;if(M){const L=En[M];N=t0.clone(L.uniforms)}else N=x.uniforms;return N}function v(x,M){let N;for(let L=0,P=l.length;L<P;L++){const I=l[L];if(I.cacheKey===M){N=I,++N.usedTimes;break}}return N===void 0&&(N=new cM(s,M,x,r),l.push(N)),N}function T(x){if(--x.usedTimes===0){const M=l.indexOf(x);l[M]=l[l.length-1],l.pop(),x.destroy()}}function A(x){c.remove(x)}function E(){c.dispose()}return{getParameters:m,getProgramCacheKey:d,getUniforms:y,acquireProgram:v,releaseProgram:T,releaseShaderCache:A,programs:l,dispose:E}}function fM(){let s=new WeakMap;function t(r){let a=s.get(r);return a===void 0&&(a={},s.set(r,a)),a}function e(r){s.delete(r)}function n(r,a,o){s.get(r)[a]=o}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function pM(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Zl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Kl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function a(h,f,p,g,_,m){let d=s[t];return d===void 0?(d={id:h.id,object:h,geometry:f,material:p,groupOrder:g,renderOrder:h.renderOrder,z:_,group:m},s[t]=d):(d.id=h.id,d.object=h,d.geometry=f,d.material=p,d.groupOrder=g,d.renderOrder=h.renderOrder,d.z=_,d.group=m),t++,d}function o(h,f,p,g,_,m){const d=a(h,f,p,g,_,m);p.transmission>0?n.push(d):p.transparent===!0?i.push(d):e.push(d)}function c(h,f,p,g,_,m){const d=a(h,f,p,g,_,m);p.transmission>0?n.unshift(d):p.transparent===!0?i.unshift(d):e.unshift(d)}function l(h,f){e.length>1&&e.sort(h||pM),n.length>1&&n.sort(f||Zl),i.length>1&&i.sort(f||Zl)}function u(){for(let h=t,f=s.length;h<f;h++){const p=s[h];if(p.id===null)break;p.id=null,p.object=null,p.geometry=null,p.material=null,p.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:o,unshift:c,finish:u,sort:l}}function mM(){let s=new WeakMap;function t(n,i){const r=s.get(n);let a;return r===void 0?(a=new Kl,s.set(n,[a])):i>=r.length?(a=new Kl,r.push(a)):a=r[i],a}function e(){s=new WeakMap}return{get:t,dispose:e}}function gM(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new W,color:new re};break;case"SpotLight":e={position:new W,direction:new W,color:new re,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new W,color:new re,distance:0,decay:0};break;case"HemisphereLight":e={direction:new W,skyColor:new re,groundColor:new re};break;case"RectAreaLight":e={color:new re,position:new W,halfWidth:new W,halfHeight:new W};break}return s[t.id]=e,e}}}function _M(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Zt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let vM=0;function xM(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function yM(s,t){const e=new gM,n=_M(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0};for(let u=0;u<9;u++)i.probe.push(new W);const r=new W,a=new Ae,o=new Ae;function c(u,h){let f=0,p=0,g=0;for(let N=0;N<9;N++)i.probe[N].set(0,0,0);let _=0,m=0,d=0,b=0,S=0,y=0,v=0,T=0,A=0,E=0;u.sort(xM);const x=h===!0?Math.PI:1;for(let N=0,L=u.length;N<L;N++){const P=u[N],I=P.color,k=P.intensity,F=P.distance,z=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)f+=I.r*k*x,p+=I.g*k*x,g+=I.b*k*x;else if(P.isLightProbe)for(let G=0;G<9;G++)i.probe[G].addScaledVector(P.sh.coefficients[G],k);else if(P.isDirectionalLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity*x),P.castShadow){const X=P.shadow,H=n.get(P);H.shadowBias=X.bias,H.shadowNormalBias=X.normalBias,H.shadowRadius=X.radius,H.shadowMapSize=X.mapSize,i.directionalShadow[_]=H,i.directionalShadowMap[_]=z,i.directionalShadowMatrix[_]=P.shadow.matrix,y++}i.directional[_]=G,_++}else if(P.isSpotLight){const G=e.get(P);G.position.setFromMatrixPosition(P.matrixWorld),G.color.copy(I).multiplyScalar(k*x),G.distance=F,G.coneCos=Math.cos(P.angle),G.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),G.decay=P.decay,i.spot[d]=G;const X=P.shadow;if(P.map&&(i.spotLightMap[A]=P.map,A++,X.updateMatrices(P),P.castShadow&&E++),i.spotLightMatrix[d]=X.matrix,P.castShadow){const H=n.get(P);H.shadowBias=X.bias,H.shadowNormalBias=X.normalBias,H.shadowRadius=X.radius,H.shadowMapSize=X.mapSize,i.spotShadow[d]=H,i.spotShadowMap[d]=z,T++}d++}else if(P.isRectAreaLight){const G=e.get(P);G.color.copy(I).multiplyScalar(k),G.halfWidth.set(P.width*.5,0,0),G.halfHeight.set(0,P.height*.5,0),i.rectArea[b]=G,b++}else if(P.isPointLight){const G=e.get(P);if(G.color.copy(P.color).multiplyScalar(P.intensity*x),G.distance=P.distance,G.decay=P.decay,P.castShadow){const X=P.shadow,H=n.get(P);H.shadowBias=X.bias,H.shadowNormalBias=X.normalBias,H.shadowRadius=X.radius,H.shadowMapSize=X.mapSize,H.shadowCameraNear=X.camera.near,H.shadowCameraFar=X.camera.far,i.pointShadow[m]=H,i.pointShadowMap[m]=z,i.pointShadowMatrix[m]=P.shadow.matrix,v++}i.point[m]=G,m++}else if(P.isHemisphereLight){const G=e.get(P);G.skyColor.copy(P.color).multiplyScalar(k*x),G.groundColor.copy(P.groundColor).multiplyScalar(k*x),i.hemi[S]=G,S++}}b>0&&(t.isWebGL2||s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_FLOAT_1,i.rectAreaLTC2=ut.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ut.LTC_HALF_1,i.rectAreaLTC2=ut.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=f,i.ambient[1]=p,i.ambient[2]=g;const M=i.hash;(M.directionalLength!==_||M.pointLength!==m||M.spotLength!==d||M.rectAreaLength!==b||M.hemiLength!==S||M.numDirectionalShadows!==y||M.numPointShadows!==v||M.numSpotShadows!==T||M.numSpotMaps!==A)&&(i.directional.length=_,i.spot.length=d,i.rectArea.length=b,i.point.length=m,i.hemi.length=S,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=v,i.pointShadowMap.length=v,i.spotShadow.length=T,i.spotShadowMap.length=T,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=v,i.spotLightMatrix.length=T+A-E,i.spotLightMap.length=A,i.numSpotLightShadowsWithMaps=E,M.directionalLength=_,M.pointLength=m,M.spotLength=d,M.rectAreaLength=b,M.hemiLength=S,M.numDirectionalShadows=y,M.numPointShadows=v,M.numSpotShadows=T,M.numSpotMaps=A,i.version=vM++)}function l(u,h){let f=0,p=0,g=0,_=0,m=0;const d=h.matrixWorldInverse;for(let b=0,S=u.length;b<S;b++){const y=u[b];if(y.isDirectionalLight){const v=i.directional[f];v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(d),f++}else if(y.isSpotLight){const v=i.spot[g];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(d),v.direction.setFromMatrixPosition(y.matrixWorld),r.setFromMatrixPosition(y.target.matrixWorld),v.direction.sub(r),v.direction.transformDirection(d),g++}else if(y.isRectAreaLight){const v=i.rectArea[_];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(d),o.identity(),a.copy(y.matrixWorld),a.premultiply(d),o.extractRotation(a),v.halfWidth.set(y.width*.5,0,0),v.halfHeight.set(0,y.height*.5,0),v.halfWidth.applyMatrix4(o),v.halfHeight.applyMatrix4(o),_++}else if(y.isPointLight){const v=i.point[p];v.position.setFromMatrixPosition(y.matrixWorld),v.position.applyMatrix4(d),p++}else if(y.isHemisphereLight){const v=i.hemi[m];v.direction.setFromMatrixPosition(y.matrixWorld),v.direction.transformDirection(d),m++}}}return{setup:c,setupView:l,state:i}}function Jl(s,t){const e=new yM(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function a(h){n.push(h)}function o(h){i.push(h)}function c(h){e.setup(n,h)}function l(h){e.setupView(n,h)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:a,pushShadow:o}}function SM(s,t){let e=new WeakMap;function n(r,a=0){const o=e.get(r);let c;return o===void 0?(c=new Jl(s,t),e.set(r,[c])):a>=o.length?(c=new Jl(s,t),o.push(c)):c=o[a],c}function i(){e=new WeakMap}return{get:n,dispose:i}}class MM extends Do{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Av,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class bM extends Do{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const wM=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,TM=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function EM(s,t,e){let n=new Ph;const i=new Zt,r=new Zt,a=new Ee,o=new MM({depthPacking:Cv}),c=new bM,l={},u=e.maxTextureSize,h={[ui]:qe,[qe]:ui,[Bn]:Bn},f=new hi({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Zt},radius:{value:4}},vertexShader:wM,fragmentShader:TM}),p=f.clone();p.defines.HORIZONTAL_PASS=1;const g=new Gi;g.setAttribute("position",new Cn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new Wn(g,f),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=dh,this.render=function(y,v,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||y.length===0)return;const A=s.getRenderTarget(),E=s.getActiveCubeFace(),x=s.getActiveMipmapLevel(),M=s.state;M.setBlending(oi),M.buffers.color.setClear(1,1,1,1),M.buffers.depth.setTest(!0),M.setScissorTest(!1);for(let N=0,L=y.length;N<L;N++){const P=y[N],I=P.shadow;if(I===void 0){console.warn("THREE.WebGLShadowMap:",P,"has no shadow.");continue}if(I.autoUpdate===!1&&I.needsUpdate===!1)continue;i.copy(I.mapSize);const k=I.getFrameExtents();if(i.multiply(k),r.copy(I.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/k.x),i.x=r.x*k.x,I.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/k.y),i.y=r.y*k.y,I.mapSize.y=r.y)),I.map===null){const z=this.type!==Us?{minFilter:Ue,magFilter:Ue}:{};I.map=new Fi(i.x,i.y,z),I.map.texture.name=P.name+".shadowMap",I.camera.updateProjectionMatrix()}s.setRenderTarget(I.map),s.clear();const F=I.getViewportCount();for(let z=0;z<F;z++){const G=I.getViewport(z);a.set(r.x*G.x,r.y*G.y,r.x*G.z,r.y*G.w),M.viewport(a),I.updateMatrices(P,z),n=I.getFrustum(),S(v,T,I.camera,P,this.type)}I.isPointLightShadow!==!0&&this.type===Us&&d(I,T),I.needsUpdate=!1}m.needsUpdate=!1,s.setRenderTarget(A,E,x)};function d(y,v){const T=t.update(_);f.defines.VSM_SAMPLES!==y.blurSamples&&(f.defines.VSM_SAMPLES=y.blurSamples,p.defines.VSM_SAMPLES=y.blurSamples,f.needsUpdate=!0,p.needsUpdate=!0),y.mapPass===null&&(y.mapPass=new Fi(i.x,i.y)),f.uniforms.shadow_pass.value=y.map.texture,f.uniforms.resolution.value=y.mapSize,f.uniforms.radius.value=y.radius,s.setRenderTarget(y.mapPass),s.clear(),s.renderBufferDirect(v,null,T,f,_,null),p.uniforms.shadow_pass.value=y.mapPass.texture,p.uniforms.resolution.value=y.mapSize,p.uniforms.radius.value=y.radius,s.setRenderTarget(y.map),s.clear(),s.renderBufferDirect(v,null,T,p,_,null)}function b(y,v,T,A){let E=null;const x=T.isPointLight===!0?y.customDistanceMaterial:y.customDepthMaterial;if(x!==void 0)E=x;else if(E=T.isPointLight===!0?c:o,s.localClippingEnabled&&v.clipShadows===!0&&Array.isArray(v.clippingPlanes)&&v.clippingPlanes.length!==0||v.displacementMap&&v.displacementScale!==0||v.alphaMap&&v.alphaTest>0||v.map&&v.alphaTest>0){const M=E.uuid,N=v.uuid;let L=l[M];L===void 0&&(L={},l[M]=L);let P=L[N];P===void 0&&(P=E.clone(),L[N]=P),E=P}if(E.visible=v.visible,E.wireframe=v.wireframe,A===Us?E.side=v.shadowSide!==null?v.shadowSide:v.side:E.side=v.shadowSide!==null?v.shadowSide:h[v.side],E.alphaMap=v.alphaMap,E.alphaTest=v.alphaTest,E.map=v.map,E.clipShadows=v.clipShadows,E.clippingPlanes=v.clippingPlanes,E.clipIntersection=v.clipIntersection,E.displacementMap=v.displacementMap,E.displacementScale=v.displacementScale,E.displacementBias=v.displacementBias,E.wireframeLinewidth=v.wireframeLinewidth,E.linewidth=v.linewidth,T.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const M=s.properties.get(E);M.light=T}return E}function S(y,v,T,A,E){if(y.visible===!1)return;if(y.layers.test(v.layers)&&(y.isMesh||y.isLine||y.isPoints)&&(y.castShadow||y.receiveShadow&&E===Us)&&(!y.frustumCulled||n.intersectsObject(y))){y.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,y.matrixWorld);const N=t.update(y),L=y.material;if(Array.isArray(L)){const P=N.groups;for(let I=0,k=P.length;I<k;I++){const F=P[I],z=L[F.materialIndex];if(z&&z.visible){const G=b(y,z,A,E);s.renderBufferDirect(T,null,N,G,y,F)}}}else if(L.visible){const P=b(y,L,A,E);s.renderBufferDirect(T,null,N,P,y,null)}}const M=y.children;for(let N=0,L=M.length;N<L;N++)S(M[N],v,T,A,E)}}function AM(s,t,e){const n=e.isWebGL2;function i(){let O=!1;const $=new Ee;let it=null;const dt=new Ee(0,0,0,0);return{setMask:function(yt){it!==yt&&!O&&(s.colorMask(yt,yt,yt,yt),it=yt)},setLocked:function(yt){O=yt},setClear:function(yt,Qt,oe,Re,Kn){Kn===!0&&(yt*=Re,Qt*=Re,oe*=Re),$.set(yt,Qt,oe,Re),dt.equals($)===!1&&(s.clearColor(yt,Qt,oe,Re),dt.copy($))},reset:function(){O=!1,it=null,dt.set(-1,0,0,0)}}}function r(){let O=!1,$=null,it=null,dt=null;return{setTest:function(yt){yt?B(2929):et(2929)},setMask:function(yt){$!==yt&&!O&&(s.depthMask(yt),$=yt)},setFunc:function(yt){if(it!==yt){switch(yt){case K_:s.depthFunc(512);break;case J_:s.depthFunc(519);break;case Q_:s.depthFunc(513);break;case La:s.depthFunc(515);break;case tv:s.depthFunc(514);break;case ev:s.depthFunc(518);break;case nv:s.depthFunc(516);break;case iv:s.depthFunc(517);break;default:s.depthFunc(515)}it=yt}},setLocked:function(yt){O=yt},setClear:function(yt){dt!==yt&&(s.clearDepth(yt),dt=yt)},reset:function(){O=!1,$=null,it=null,dt=null}}}function a(){let O=!1,$=null,it=null,dt=null,yt=null,Qt=null,oe=null,Re=null,Kn=null;return{setTest:function(he){O||(he?B(2960):et(2960))},setMask:function(he){$!==he&&!O&&(s.stencilMask(he),$=he)},setFunc:function(he,nn,bn){(it!==he||dt!==nn||yt!==bn)&&(s.stencilFunc(he,nn,bn),it=he,dt=nn,yt=bn)},setOp:function(he,nn,bn){(Qt!==he||oe!==nn||Re!==bn)&&(s.stencilOp(he,nn,bn),Qt=he,oe=nn,Re=bn)},setLocked:function(he){O=he},setClear:function(he){Kn!==he&&(s.clearStencil(he),Kn=he)},reset:function(){O=!1,$=null,it=null,dt=null,yt=null,Qt=null,oe=null,Re=null,Kn=null}}}const o=new i,c=new r,l=new a,u=new WeakMap,h=new WeakMap;let f={},p={},g=new WeakMap,_=[],m=null,d=!1,b=null,S=null,y=null,v=null,T=null,A=null,E=null,x=!1,M=null,N=null,L=null,P=null,I=null;const k=s.getParameter(35661);let F=!1,z=0;const G=s.getParameter(7938);G.indexOf("WebGL")!==-1?(z=parseFloat(/^WebGL (\d)/.exec(G)[1]),F=z>=1):G.indexOf("OpenGL ES")!==-1&&(z=parseFloat(/^OpenGL ES (\d)/.exec(G)[1]),F=z>=2);let X=null,H={};const ot=s.getParameter(3088),Q=s.getParameter(2978),q=new Ee().fromArray(ot),Z=new Ee().fromArray(Q);function tt(O,$,it){const dt=new Uint8Array(4),yt=s.createTexture();s.bindTexture(O,yt),s.texParameteri(O,10241,9728),s.texParameteri(O,10240,9728);for(let Qt=0;Qt<it;Qt++)s.texImage2D($+Qt,0,6408,1,1,0,6408,5121,dt);return yt}const st={};st[3553]=tt(3553,3553,1),st[34067]=tt(34067,34069,6),o.setClear(0,0,0,1),c.setClear(1),l.setClear(0),B(2929),c.setFunc(La),ft(!1),kt(Fc),B(2884),Ot(oi);function B(O){f[O]!==!0&&(s.enable(O),f[O]=!0)}function et(O){f[O]!==!1&&(s.disable(O),f[O]=!1)}function Mt(O,$){return p[O]!==$?(s.bindFramebuffer(O,$),p[O]=$,n&&(O===36009&&(p[36160]=$),O===36160&&(p[36009]=$)),!0):!1}function ct(O,$){let it=_,dt=!1;if(O)if(it=g.get($),it===void 0&&(it=[],g.set($,it)),O.isWebGLMultipleRenderTargets){const yt=O.texture;if(it.length!==yt.length||it[0]!==36064){for(let Qt=0,oe=yt.length;Qt<oe;Qt++)it[Qt]=36064+Qt;it.length=yt.length,dt=!0}}else it[0]!==36064&&(it[0]=36064,dt=!0);else it[0]!==1029&&(it[0]=1029,dt=!0);dt&&(e.isWebGL2?s.drawBuffers(it):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(it))}function St(O){return m!==O?(s.useProgram(O),m=O,!0):!1}const zt={[os]:32774,[z_]:32778,[B_]:32779};if(n)zt[Gc]=32775,zt[Wc]=32776;else{const O=t.get("EXT_blend_minmax");O!==null&&(zt[Gc]=O.MIN_EXT,zt[Wc]=O.MAX_EXT)}const _t={[G_]:0,[W_]:1,[H_]:768,[fh]:770,[Z_]:776,[Y_]:774,[X_]:772,[q_]:769,[ph]:771,[$_]:775,[j_]:773};function Ot(O,$,it,dt,yt,Qt,oe,Re){if(O===oi){d===!0&&(et(3042),d=!1);return}if(d===!1&&(B(3042),d=!0),O!==V_){if(O!==b||Re!==x){if((S!==os||T!==os)&&(s.blendEquation(32774),S=os,T=os),Re)switch(O){case ds:s.blendFuncSeparate(1,771,1,771);break;case Vc:s.blendFunc(1,1);break;case zc:s.blendFuncSeparate(0,769,0,1);break;case Bc:s.blendFuncSeparate(0,768,0,770);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}else switch(O){case ds:s.blendFuncSeparate(770,771,1,771);break;case Vc:s.blendFunc(770,1);break;case zc:s.blendFuncSeparate(0,769,0,1);break;case Bc:s.blendFunc(0,768);break;default:console.error("THREE.WebGLState: Invalid blending: ",O);break}y=null,v=null,A=null,E=null,b=O,x=Re}return}yt=yt||$,Qt=Qt||it,oe=oe||dt,($!==S||yt!==T)&&(s.blendEquationSeparate(zt[$],zt[yt]),S=$,T=yt),(it!==y||dt!==v||Qt!==A||oe!==E)&&(s.blendFuncSeparate(_t[it],_t[dt],_t[Qt],_t[oe]),y=it,v=dt,A=Qt,E=oe),b=O,x=!1}function at(O,$){O.side===Bn?et(2884):B(2884);let it=O.side===qe;$&&(it=!it),ft(it),O.blending===ds&&O.transparent===!1?Ot(oi):Ot(O.blending,O.blendEquation,O.blendSrc,O.blendDst,O.blendEquationAlpha,O.blendSrcAlpha,O.blendDstAlpha,O.premultipliedAlpha),c.setFunc(O.depthFunc),c.setTest(O.depthTest),c.setMask(O.depthWrite),o.setMask(O.colorWrite);const dt=O.stencilWrite;l.setTest(dt),dt&&(l.setMask(O.stencilWriteMask),l.setFunc(O.stencilFunc,O.stencilRef,O.stencilFuncMask),l.setOp(O.stencilFail,O.stencilZFail,O.stencilZPass)),gt(O.polygonOffset,O.polygonOffsetFactor,O.polygonOffsetUnits),O.alphaToCoverage===!0?B(32926):et(32926)}function ft(O){M!==O&&(O?s.frontFace(2304):s.frontFace(2305),M=O)}function kt(O){O!==k_?(B(2884),O!==N&&(O===Fc?s.cullFace(1029):O===U_?s.cullFace(1028):s.cullFace(1032))):et(2884),N=O}function Dt(O){O!==L&&(F&&s.lineWidth(O),L=O)}function gt(O,$,it){O?(B(32823),(P!==$||I!==it)&&(s.polygonOffset($,it),P=$,I=it)):et(32823)}function Ct(O){O?B(3089):et(3089)}function $t(O){O===void 0&&(O=33984+k-1),X!==O&&(s.activeTexture(O),X=O)}function R(O,$,it){it===void 0&&(X===null?it=33984+k-1:it=X);let dt=H[it];dt===void 0&&(dt={type:void 0,texture:void 0},H[it]=dt),(dt.type!==O||dt.texture!==$)&&(X!==it&&(s.activeTexture(it),X=it),s.bindTexture(O,$||st[O]),dt.type=O,dt.texture=$)}function w(){const O=H[X];O!==void 0&&O.type!==void 0&&(s.bindTexture(O.type,null),O.type=void 0,O.texture=void 0)}function j(){try{s.compressedTexImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function nt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function rt(){try{s.texSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function ht(){try{s.texSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Et(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function mt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function K(){try{s.texStorage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function vt(){try{s.texStorage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function bt(){try{s.texImage2D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function Tt(){try{s.texImage3D.apply(s,arguments)}catch(O){console.error("THREE.WebGLState:",O)}}function pt(O){q.equals(O)===!1&&(s.scissor(O.x,O.y,O.z,O.w),q.copy(O))}function xt(O){Z.equals(O)===!1&&(s.viewport(O.x,O.y,O.z,O.w),Z.copy(O))}function Wt(O,$){let it=h.get($);it===void 0&&(it=new WeakMap,h.set($,it));let dt=it.get(O);dt===void 0&&(dt=s.getUniformBlockIndex($,O.name),it.set(O,dt))}function qt(O,$){const dt=h.get($).get(O);u.get($)!==dt&&(s.uniformBlockBinding($,dt,O.__bindingPointIndex),u.set($,dt))}function ue(){s.disable(3042),s.disable(2884),s.disable(2929),s.disable(32823),s.disable(3089),s.disable(2960),s.disable(32926),s.blendEquation(32774),s.blendFunc(1,0),s.blendFuncSeparate(1,0,1,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(513),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(519,0,4294967295),s.stencilOp(7680,7680,7680),s.clearStencil(0),s.cullFace(1029),s.frontFace(2305),s.polygonOffset(0,0),s.activeTexture(33984),s.bindFramebuffer(36160,null),n===!0&&(s.bindFramebuffer(36009,null),s.bindFramebuffer(36008,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),f={},X=null,H={},p={},g=new WeakMap,_=[],m=null,d=!1,b=null,S=null,y=null,v=null,T=null,A=null,E=null,x=!1,M=null,N=null,L=null,P=null,I=null,q.set(0,0,s.canvas.width,s.canvas.height),Z.set(0,0,s.canvas.width,s.canvas.height),o.reset(),c.reset(),l.reset()}return{buffers:{color:o,depth:c,stencil:l},enable:B,disable:et,bindFramebuffer:Mt,drawBuffers:ct,useProgram:St,setBlending:Ot,setMaterial:at,setFlipSided:ft,setCullFace:kt,setLineWidth:Dt,setPolygonOffset:gt,setScissorTest:Ct,activeTexture:$t,bindTexture:R,unbindTexture:w,compressedTexImage2D:j,compressedTexImage3D:nt,texImage2D:bt,texImage3D:Tt,updateUBOMapping:Wt,uniformBlockBinding:qt,texStorage2D:K,texStorage3D:vt,texSubImage2D:rt,texSubImage3D:ht,compressedTexSubImage2D:Et,compressedTexSubImage3D:mt,scissor:pt,viewport:xt,reset:ue}}function CM(s,t,e,n,i,r,a){const o=i.isWebGL2,c=i.maxTextures,l=i.maxCubemapSize,u=i.maxTextureSize,h=i.maxSamples,f=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,p=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),g=new WeakMap;let _;const m=new WeakMap;let d=!1;try{d=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function b(R,w){return d?new OffscreenCanvas(R,w):_o("canvas")}function S(R,w,j,nt){let rt=1;if((R.width>nt||R.height>nt)&&(rt=nt/Math.max(R.width,R.height)),rt<1||w===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const ht=w?Iv:Math.floor,Et=ht(rt*R.width),mt=ht(rt*R.height);_===void 0&&(_=b(Et,mt));const K=j?b(Et,mt):_;return K.width=Et,K.height=mt,K.getContext("2d").drawImage(R,0,0,Et,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+Et+"x"+mt+")."),K}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function y(R){return gl(R.width)&&gl(R.height)}function v(R){return o?!1:R.wrapS!==gn||R.wrapT!==gn||R.minFilter!==Ue&&R.minFilter!==rn}function T(R,w){return R.generateMipmaps&&w&&R.minFilter!==Ue&&R.minFilter!==rn}function A(R){s.generateMipmap(R)}function E(R,w,j,nt,rt=!1){if(o===!1)return w;if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let ht=w;return w===6403&&(j===5126&&(ht=33326),j===5131&&(ht=33325),j===5121&&(ht=33321)),w===33319&&(j===5126&&(ht=33328),j===5131&&(ht=33327),j===5121&&(ht=33323)),w===6408&&(j===5126&&(ht=34836),j===5131&&(ht=34842),j===5121&&(ht=nt===te&&rt===!1?35907:32856),j===32819&&(ht=32854),j===32820&&(ht=32855)),(ht===33325||ht===33326||ht===33327||ht===33328||ht===34842||ht===34836)&&t.get("EXT_color_buffer_float"),ht}function x(R,w,j){return T(R,j)===!0||R.isFramebufferTexture&&R.minFilter!==Ue&&R.minFilter!==rn?Math.log2(Math.max(w.width,w.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?w.mipmaps.length:1}function M(R){return R===Ue||R===Hc||R===Vo?9728:9729}function N(R){const w=R.target;w.removeEventListener("dispose",N),P(w),w.isVideoTexture&&g.delete(w)}function L(R){const w=R.target;w.removeEventListener("dispose",L),k(w)}function P(R){const w=n.get(R);if(w.__webglInit===void 0)return;const j=R.source,nt=m.get(j);if(nt){const rt=nt[w.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&I(R),Object.keys(nt).length===0&&m.delete(j)}n.remove(R)}function I(R){const w=n.get(R);s.deleteTexture(w.__webglTexture);const j=R.source,nt=m.get(j);delete nt[w.__cacheKey],a.memory.textures--}function k(R){const w=R.texture,j=n.get(R),nt=n.get(w);if(nt.__webglTexture!==void 0&&(s.deleteTexture(nt.__webglTexture),a.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++)s.deleteFramebuffer(j.__webglFramebuffer[rt]),j.__webglDepthbuffer&&s.deleteRenderbuffer(j.__webglDepthbuffer[rt]);else{if(s.deleteFramebuffer(j.__webglFramebuffer),j.__webglDepthbuffer&&s.deleteRenderbuffer(j.__webglDepthbuffer),j.__webglMultisampledFramebuffer&&s.deleteFramebuffer(j.__webglMultisampledFramebuffer),j.__webglColorRenderbuffer)for(let rt=0;rt<j.__webglColorRenderbuffer.length;rt++)j.__webglColorRenderbuffer[rt]&&s.deleteRenderbuffer(j.__webglColorRenderbuffer[rt]);j.__webglDepthRenderbuffer&&s.deleteRenderbuffer(j.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let rt=0,ht=w.length;rt<ht;rt++){const Et=n.get(w[rt]);Et.__webglTexture&&(s.deleteTexture(Et.__webglTexture),a.memory.textures--),n.remove(w[rt])}n.remove(w),n.remove(R)}let F=0;function z(){F=0}function G(){const R=F;return R>=c&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+c),F+=1,R}function X(R){const w=[];return w.push(R.wrapS),w.push(R.wrapT),w.push(R.wrapR||0),w.push(R.magFilter),w.push(R.minFilter),w.push(R.anisotropy),w.push(R.internalFormat),w.push(R.format),w.push(R.type),w.push(R.generateMipmaps),w.push(R.premultiplyAlpha),w.push(R.flipY),w.push(R.unpackAlignment),w.push(R.encoding),w.join()}function H(R,w){const j=n.get(R);if(R.isVideoTexture&&Ct(R),R.isRenderTargetTexture===!1&&R.version>0&&j.__version!==R.version){const nt=R.image;if(nt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(nt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{et(j,R,w);return}}e.bindTexture(3553,j.__webglTexture,33984+w)}function ot(R,w){const j=n.get(R);if(R.version>0&&j.__version!==R.version){et(j,R,w);return}e.bindTexture(35866,j.__webglTexture,33984+w)}function Q(R,w){const j=n.get(R);if(R.version>0&&j.__version!==R.version){et(j,R,w);return}e.bindTexture(32879,j.__webglTexture,33984+w)}function q(R,w){const j=n.get(R);if(R.version>0&&j.__version!==R.version){Mt(j,R,w);return}e.bindTexture(34067,j.__webglTexture,33984+w)}const Z={[Oa]:10497,[gn]:33071,[ka]:33648},tt={[Ue]:9728,[Hc]:9984,[Vo]:9986,[rn]:9729,[hv]:9985,[tr]:9987};function st(R,w,j){if(j?(s.texParameteri(R,10242,Z[w.wrapS]),s.texParameteri(R,10243,Z[w.wrapT]),(R===32879||R===35866)&&s.texParameteri(R,32882,Z[w.wrapR]),s.texParameteri(R,10240,tt[w.magFilter]),s.texParameteri(R,10241,tt[w.minFilter])):(s.texParameteri(R,10242,33071),s.texParameteri(R,10243,33071),(R===32879||R===35866)&&s.texParameteri(R,32882,33071),(w.wrapS!==gn||w.wrapT!==gn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(R,10240,M(w.magFilter)),s.texParameteri(R,10241,M(w.minFilter)),w.minFilter!==Ue&&w.minFilter!==rn&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),t.has("EXT_texture_filter_anisotropic")===!0){const nt=t.get("EXT_texture_filter_anisotropic");if(w.magFilter===Ue||w.minFilter!==Vo&&w.minFilter!==tr||w.type===Ei&&t.has("OES_texture_float_linear")===!1||o===!1&&w.type===er&&t.has("OES_texture_half_float_linear")===!1)return;(w.anisotropy>1||n.get(w).__currentAnisotropy)&&(s.texParameterf(R,nt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy)}}function B(R,w){let j=!1;R.__webglInit===void 0&&(R.__webglInit=!0,w.addEventListener("dispose",N));const nt=w.source;let rt=m.get(nt);rt===void 0&&(rt={},m.set(nt,rt));const ht=X(w);if(ht!==R.__cacheKey){rt[ht]===void 0&&(rt[ht]={texture:s.createTexture(),usedTimes:0},a.memory.textures++,j=!0),rt[ht].usedTimes++;const Et=rt[R.__cacheKey];Et!==void 0&&(rt[R.__cacheKey].usedTimes--,Et.usedTimes===0&&I(w)),R.__cacheKey=ht,R.__webglTexture=rt[ht].texture}return j}function et(R,w,j){let nt=3553;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(nt=35866),w.isData3DTexture&&(nt=32879);const rt=B(R,w),ht=w.source;e.bindTexture(nt,R.__webglTexture,33984+j);const Et=n.get(ht);if(ht.version!==Et.__version||rt===!0){e.activeTexture(33984+j),s.pixelStorei(37440,w.flipY),s.pixelStorei(37441,w.premultiplyAlpha),s.pixelStorei(3317,w.unpackAlignment),s.pixelStorei(37443,0);const mt=v(w)&&y(w.image)===!1;let K=S(w.image,mt,!1,u);K=$t(w,K);const vt=y(K)||o,bt=r.convert(w.format,w.encoding);let Tt=r.convert(w.type),pt=E(w.internalFormat,bt,Tt,w.encoding,w.isVideoTexture);st(nt,w,vt);let xt;const Wt=w.mipmaps,qt=o&&w.isVideoTexture!==!0,ue=Et.__version===void 0||rt===!0,O=x(w,K,vt);if(w.isDepthTexture)pt=6402,o?w.type===Ei?pt=36012:w.type===Ti?pt=33190:w.type===fs?pt=35056:pt=33189:w.type===Ei&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),w.format===Ci&&pt===6402&&w.type!==_h&&w.type!==Ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),w.type=Ti,Tt=r.convert(w.type)),w.format===Ms&&pt===6402&&(pt=34041,w.type!==fs&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),w.type=fs,Tt=r.convert(w.type))),ue&&(qt?e.texStorage2D(3553,1,pt,K.width,K.height):e.texImage2D(3553,0,pt,K.width,K.height,0,bt,Tt,null));else if(w.isDataTexture)if(Wt.length>0&&vt){qt&&ue&&e.texStorage2D(3553,O,pt,Wt[0].width,Wt[0].height);for(let $=0,it=Wt.length;$<it;$++)xt=Wt[$],qt?e.texSubImage2D(3553,$,0,0,xt.width,xt.height,bt,Tt,xt.data):e.texImage2D(3553,$,pt,xt.width,xt.height,0,bt,Tt,xt.data);w.generateMipmaps=!1}else qt?(ue&&e.texStorage2D(3553,O,pt,K.width,K.height),e.texSubImage2D(3553,0,0,0,K.width,K.height,bt,Tt,K.data)):e.texImage2D(3553,0,pt,K.width,K.height,0,bt,Tt,K.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){qt&&ue&&e.texStorage3D(35866,O,pt,Wt[0].width,Wt[0].height,K.depth);for(let $=0,it=Wt.length;$<it;$++)xt=Wt[$],w.format!==_n?bt!==null?qt?e.compressedTexSubImage3D(35866,$,0,0,0,xt.width,xt.height,K.depth,bt,xt.data,0,0):e.compressedTexImage3D(35866,$,pt,xt.width,xt.height,K.depth,0,xt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?e.texSubImage3D(35866,$,0,0,0,xt.width,xt.height,K.depth,bt,Tt,xt.data):e.texImage3D(35866,$,pt,xt.width,xt.height,K.depth,0,bt,Tt,xt.data)}else{qt&&ue&&e.texStorage2D(3553,O,pt,Wt[0].width,Wt[0].height);for(let $=0,it=Wt.length;$<it;$++)xt=Wt[$],w.format!==_n?bt!==null?qt?e.compressedTexSubImage2D(3553,$,0,0,xt.width,xt.height,bt,xt.data):e.compressedTexImage2D(3553,$,pt,xt.width,xt.height,0,xt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):qt?e.texSubImage2D(3553,$,0,0,xt.width,xt.height,bt,Tt,xt.data):e.texImage2D(3553,$,pt,xt.width,xt.height,0,bt,Tt,xt.data)}else if(w.isDataArrayTexture)qt?(ue&&e.texStorage3D(35866,O,pt,K.width,K.height,K.depth),e.texSubImage3D(35866,0,0,0,0,K.width,K.height,K.depth,bt,Tt,K.data)):e.texImage3D(35866,0,pt,K.width,K.height,K.depth,0,bt,Tt,K.data);else if(w.isData3DTexture)qt?(ue&&e.texStorage3D(32879,O,pt,K.width,K.height,K.depth),e.texSubImage3D(32879,0,0,0,0,K.width,K.height,K.depth,bt,Tt,K.data)):e.texImage3D(32879,0,pt,K.width,K.height,K.depth,0,bt,Tt,K.data);else if(w.isFramebufferTexture){if(ue)if(qt)e.texStorage2D(3553,O,pt,K.width,K.height);else{let $=K.width,it=K.height;for(let dt=0;dt<O;dt++)e.texImage2D(3553,dt,pt,$,it,0,bt,Tt,null),$>>=1,it>>=1}}else if(Wt.length>0&&vt){qt&&ue&&e.texStorage2D(3553,O,pt,Wt[0].width,Wt[0].height);for(let $=0,it=Wt.length;$<it;$++)xt=Wt[$],qt?e.texSubImage2D(3553,$,0,0,bt,Tt,xt):e.texImage2D(3553,$,pt,bt,Tt,xt);w.generateMipmaps=!1}else qt?(ue&&e.texStorage2D(3553,O,pt,K.width,K.height),e.texSubImage2D(3553,0,0,0,bt,Tt,K)):e.texImage2D(3553,0,pt,bt,Tt,K);T(w,vt)&&A(nt),Et.__version=ht.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function Mt(R,w,j){if(w.image.length!==6)return;const nt=B(R,w),rt=w.source;e.bindTexture(34067,R.__webglTexture,33984+j);const ht=n.get(rt);if(rt.version!==ht.__version||nt===!0){e.activeTexture(33984+j),s.pixelStorei(37440,w.flipY),s.pixelStorei(37441,w.premultiplyAlpha),s.pixelStorei(3317,w.unpackAlignment),s.pixelStorei(37443,0);const Et=w.isCompressedTexture||w.image[0].isCompressedTexture,mt=w.image[0]&&w.image[0].isDataTexture,K=[];for(let $=0;$<6;$++)!Et&&!mt?K[$]=S(w.image[$],!1,!0,l):K[$]=mt?w.image[$].image:w.image[$],K[$]=$t(w,K[$]);const vt=K[0],bt=y(vt)||o,Tt=r.convert(w.format,w.encoding),pt=r.convert(w.type),xt=E(w.internalFormat,Tt,pt,w.encoding),Wt=o&&w.isVideoTexture!==!0,qt=ht.__version===void 0||nt===!0;let ue=x(w,vt,bt);st(34067,w,bt);let O;if(Et){Wt&&qt&&e.texStorage2D(34067,ue,xt,vt.width,vt.height);for(let $=0;$<6;$++){O=K[$].mipmaps;for(let it=0;it<O.length;it++){const dt=O[it];w.format!==_n?Tt!==null?Wt?e.compressedTexSubImage2D(34069+$,it,0,0,dt.width,dt.height,Tt,dt.data):e.compressedTexImage2D(34069+$,it,xt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Wt?e.texSubImage2D(34069+$,it,0,0,dt.width,dt.height,Tt,pt,dt.data):e.texImage2D(34069+$,it,xt,dt.width,dt.height,0,Tt,pt,dt.data)}}}else{O=w.mipmaps,Wt&&qt&&(O.length>0&&ue++,e.texStorage2D(34067,ue,xt,K[0].width,K[0].height));for(let $=0;$<6;$++)if(mt){Wt?e.texSubImage2D(34069+$,0,0,0,K[$].width,K[$].height,Tt,pt,K[$].data):e.texImage2D(34069+$,0,xt,K[$].width,K[$].height,0,Tt,pt,K[$].data);for(let it=0;it<O.length;it++){const yt=O[it].image[$].image;Wt?e.texSubImage2D(34069+$,it+1,0,0,yt.width,yt.height,Tt,pt,yt.data):e.texImage2D(34069+$,it+1,xt,yt.width,yt.height,0,Tt,pt,yt.data)}}else{Wt?e.texSubImage2D(34069+$,0,0,0,Tt,pt,K[$]):e.texImage2D(34069+$,0,xt,Tt,pt,K[$]);for(let it=0;it<O.length;it++){const dt=O[it];Wt?e.texSubImage2D(34069+$,it+1,0,0,Tt,pt,dt.image[$]):e.texImage2D(34069+$,it+1,xt,Tt,pt,dt.image[$])}}}T(w,bt)&&A(34067),ht.__version=rt.version,w.onUpdate&&w.onUpdate(w)}R.__version=w.version}function ct(R,w,j,nt,rt){const ht=r.convert(j.format,j.encoding),Et=r.convert(j.type),mt=E(j.internalFormat,ht,Et,j.encoding);n.get(w).__hasExternalTextures||(rt===32879||rt===35866?e.texImage3D(rt,0,mt,w.width,w.height,w.depth,0,ht,Et,null):e.texImage2D(rt,0,mt,w.width,w.height,0,ht,Et,null)),e.bindFramebuffer(36160,R),gt(w)?f.framebufferTexture2DMultisampleEXT(36160,nt,rt,n.get(j).__webglTexture,0,Dt(w)):(rt===3553||rt>=34069&&rt<=34074)&&s.framebufferTexture2D(36160,nt,rt,n.get(j).__webglTexture,0),e.bindFramebuffer(36160,null)}function St(R,w,j){if(s.bindRenderbuffer(36161,R),w.depthBuffer&&!w.stencilBuffer){let nt=33189;if(j||gt(w)){const rt=w.depthTexture;rt&&rt.isDepthTexture&&(rt.type===Ei?nt=36012:rt.type===Ti&&(nt=33190));const ht=Dt(w);gt(w)?f.renderbufferStorageMultisampleEXT(36161,ht,nt,w.width,w.height):s.renderbufferStorageMultisample(36161,ht,nt,w.width,w.height)}else s.renderbufferStorage(36161,nt,w.width,w.height);s.framebufferRenderbuffer(36160,36096,36161,R)}else if(w.depthBuffer&&w.stencilBuffer){const nt=Dt(w);j&&gt(w)===!1?s.renderbufferStorageMultisample(36161,nt,35056,w.width,w.height):gt(w)?f.renderbufferStorageMultisampleEXT(36161,nt,35056,w.width,w.height):s.renderbufferStorage(36161,34041,w.width,w.height),s.framebufferRenderbuffer(36160,33306,36161,R)}else{const nt=w.isWebGLMultipleRenderTargets===!0?w.texture:[w.texture];for(let rt=0;rt<nt.length;rt++){const ht=nt[rt],Et=r.convert(ht.format,ht.encoding),mt=r.convert(ht.type),K=E(ht.internalFormat,Et,mt,ht.encoding),vt=Dt(w);j&&gt(w)===!1?s.renderbufferStorageMultisample(36161,vt,K,w.width,w.height):gt(w)?f.renderbufferStorageMultisampleEXT(36161,vt,K,w.width,w.height):s.renderbufferStorage(36161,K,w.width,w.height)}}s.bindRenderbuffer(36161,null)}function zt(R,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(36160,R),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),H(w.depthTexture,0);const nt=n.get(w.depthTexture).__webglTexture,rt=Dt(w);if(w.depthTexture.format===Ci)gt(w)?f.framebufferTexture2DMultisampleEXT(36160,36096,3553,nt,0,rt):s.framebufferTexture2D(36160,36096,3553,nt,0);else if(w.depthTexture.format===Ms)gt(w)?f.framebufferTexture2DMultisampleEXT(36160,33306,3553,nt,0,rt):s.framebufferTexture2D(36160,33306,3553,nt,0);else throw new Error("Unknown depthTexture format")}function _t(R){const w=n.get(R),j=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!w.__autoAllocateDepthBuffer){if(j)throw new Error("target.depthTexture not supported in Cube render targets");zt(w.__webglFramebuffer,R)}else if(j){w.__webglDepthbuffer=[];for(let nt=0;nt<6;nt++)e.bindFramebuffer(36160,w.__webglFramebuffer[nt]),w.__webglDepthbuffer[nt]=s.createRenderbuffer(),St(w.__webglDepthbuffer[nt],R,!1)}else e.bindFramebuffer(36160,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),St(w.__webglDepthbuffer,R,!1);e.bindFramebuffer(36160,null)}function Ot(R,w,j){const nt=n.get(R);w!==void 0&&ct(nt.__webglFramebuffer,R,R.texture,36064,3553),j!==void 0&&_t(R)}function at(R){const w=R.texture,j=n.get(R),nt=n.get(w);R.addEventListener("dispose",L),R.isWebGLMultipleRenderTargets!==!0&&(nt.__webglTexture===void 0&&(nt.__webglTexture=s.createTexture()),nt.__version=w.version,a.memory.textures++);const rt=R.isWebGLCubeRenderTarget===!0,ht=R.isWebGLMultipleRenderTargets===!0,Et=y(R)||o;if(rt){j.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)j.__webglFramebuffer[mt]=s.createFramebuffer()}else{if(j.__webglFramebuffer=s.createFramebuffer(),ht)if(i.drawBuffers){const mt=R.texture;for(let K=0,vt=mt.length;K<vt;K++){const bt=n.get(mt[K]);bt.__webglTexture===void 0&&(bt.__webglTexture=s.createTexture(),a.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(o&&R.samples>0&&gt(R)===!1){const mt=ht?w:[w];j.__webglMultisampledFramebuffer=s.createFramebuffer(),j.__webglColorRenderbuffer=[],e.bindFramebuffer(36160,j.__webglMultisampledFramebuffer);for(let K=0;K<mt.length;K++){const vt=mt[K];j.__webglColorRenderbuffer[K]=s.createRenderbuffer(),s.bindRenderbuffer(36161,j.__webglColorRenderbuffer[K]);const bt=r.convert(vt.format,vt.encoding),Tt=r.convert(vt.type),pt=E(vt.internalFormat,bt,Tt,vt.encoding,R.isXRRenderTarget===!0),xt=Dt(R);s.renderbufferStorageMultisample(36161,xt,pt,R.width,R.height),s.framebufferRenderbuffer(36160,36064+K,36161,j.__webglColorRenderbuffer[K])}s.bindRenderbuffer(36161,null),R.depthBuffer&&(j.__webglDepthRenderbuffer=s.createRenderbuffer(),St(j.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(36160,null)}}if(rt){e.bindTexture(34067,nt.__webglTexture),st(34067,w,Et);for(let mt=0;mt<6;mt++)ct(j.__webglFramebuffer[mt],R,w,36064,34069+mt);T(w,Et)&&A(34067),e.unbindTexture()}else if(ht){const mt=R.texture;for(let K=0,vt=mt.length;K<vt;K++){const bt=mt[K],Tt=n.get(bt);e.bindTexture(3553,Tt.__webglTexture),st(3553,bt,Et),ct(j.__webglFramebuffer,R,bt,36064+K,3553),T(bt,Et)&&A(3553)}e.unbindTexture()}else{let mt=3553;(R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(o?mt=R.isWebGL3DRenderTarget?32879:35866:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(mt,nt.__webglTexture),st(mt,w,Et),ct(j.__webglFramebuffer,R,w,36064,mt),T(w,Et)&&A(mt),e.unbindTexture()}R.depthBuffer&&_t(R)}function ft(R){const w=y(R)||o,j=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let nt=0,rt=j.length;nt<rt;nt++){const ht=j[nt];if(T(ht,w)){const Et=R.isWebGLCubeRenderTarget?34067:3553,mt=n.get(ht).__webglTexture;e.bindTexture(Et,mt),A(Et),e.unbindTexture()}}}function kt(R){if(o&&R.samples>0&&gt(R)===!1){const w=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],j=R.width,nt=R.height;let rt=16384;const ht=[],Et=R.stencilBuffer?33306:36096,mt=n.get(R),K=R.isWebGLMultipleRenderTargets===!0;if(K)for(let vt=0;vt<w.length;vt++)e.bindFramebuffer(36160,mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+vt,36161,null),e.bindFramebuffer(36160,mt.__webglFramebuffer),s.framebufferTexture2D(36009,36064+vt,3553,null,0);e.bindFramebuffer(36008,mt.__webglMultisampledFramebuffer),e.bindFramebuffer(36009,mt.__webglFramebuffer);for(let vt=0;vt<w.length;vt++){ht.push(36064+vt),R.depthBuffer&&ht.push(Et);const bt=mt.__ignoreDepthValues!==void 0?mt.__ignoreDepthValues:!1;if(bt===!1&&(R.depthBuffer&&(rt|=256),R.stencilBuffer&&(rt|=1024)),K&&s.framebufferRenderbuffer(36008,36064,36161,mt.__webglColorRenderbuffer[vt]),bt===!0&&(s.invalidateFramebuffer(36008,[Et]),s.invalidateFramebuffer(36009,[Et])),K){const Tt=n.get(w[vt]).__webglTexture;s.framebufferTexture2D(36009,36064,3553,Tt,0)}s.blitFramebuffer(0,0,j,nt,0,0,j,nt,rt,9728),p&&s.invalidateFramebuffer(36008,ht)}if(e.bindFramebuffer(36008,null),e.bindFramebuffer(36009,null),K)for(let vt=0;vt<w.length;vt++){e.bindFramebuffer(36160,mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(36160,36064+vt,36161,mt.__webglColorRenderbuffer[vt]);const bt=n.get(w[vt]).__webglTexture;e.bindFramebuffer(36160,mt.__webglFramebuffer),s.framebufferTexture2D(36009,36064+vt,3553,bt,0)}e.bindFramebuffer(36009,mt.__webglMultisampledFramebuffer)}}function Dt(R){return Math.min(h,R.samples)}function gt(R){const w=n.get(R);return o&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function Ct(R){const w=a.render.frame;g.get(R)!==w&&(g.set(R,w),R.update())}function $t(R,w){const j=R.encoding,nt=R.format,rt=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Ua||j!==Ui&&(j===te?o===!1?t.has("EXT_sRGB")===!0&&nt===_n?(R.format=Ua,R.minFilter=rn,R.generateMipmaps=!1):w=yh.sRGBToLinear(w):(nt!==_n||rt!==ki)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture encoding:",j)),w}this.allocateTextureUnit=G,this.resetTextureUnits=z,this.setTexture2D=H,this.setTexture2DArray=ot,this.setTexture3D=Q,this.setTextureCube=q,this.rebindTextures=Ot,this.setupRenderTarget=at,this.updateRenderTargetMipmap=ft,this.updateMultisampleRenderTarget=kt,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=ct,this.useMultisampledRTT=gt}function RM(s,t,e){const n=e.isWebGL2;function i(r,a=null){let o;if(r===ki)return 5121;if(r===mv)return 32819;if(r===gv)return 32820;if(r===dv)return 5120;if(r===fv)return 5122;if(r===_h)return 5123;if(r===pv)return 5124;if(r===Ti)return 5125;if(r===Ei)return 5126;if(r===er)return n?5131:(o=t.get("OES_texture_half_float"),o!==null?o.HALF_FLOAT_OES:null);if(r===_v)return 6406;if(r===_n)return 6408;if(r===vv)return 6409;if(r===xv)return 6410;if(r===Ci)return 6402;if(r===Ms)return 34041;if(r===Ua)return o=t.get("EXT_sRGB"),o!==null?o.SRGB_ALPHA_EXT:null;if(r===yv)return 6403;if(r===Sv)return 36244;if(r===Mv)return 33319;if(r===bv)return 33320;if(r===wv)return 36249;if(r===zo||r===Bo||r===Go||r===Wo)if(a===te)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(r===zo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Bo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Go)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Wo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(r===zo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Bo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Go)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Wo)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===qc||r===Xc||r===jc||r===Yc)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(r===qc)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Xc)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===jc)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Yc)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Tv)return o=t.get("WEBGL_compressed_texture_etc1"),o!==null?o.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===$c||r===Zc)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(r===$c)return a===te?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(r===Zc)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Kc||r===Jc||r===Qc||r===tl||r===el||r===nl||r===il||r===sl||r===rl||r===ol||r===al||r===cl||r===ll||r===ul)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(r===Kc)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Jc)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Qc)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===tl)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===el)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===nl)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===il)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===sl)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===rl)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===ol)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===al)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===cl)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===ll)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===ul)return a===te?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===Ho)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(r===Ho)return a===te?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT}else return null;if(r===Ev||r===hl||r===dl||r===fl)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(r===Ho)return o.COMPRESSED_RED_RGTC1_EXT;if(r===hl)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===dl)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===fl)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===fs?n?34042:(o=t.get("WEBGL_depth_texture"),o!==null?o.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class DM extends on{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class qr extends tn{constructor(){super(),this.isGroup=!0,this.type="Group"}}const PM={type:"move"};class pa{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new qr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new qr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new qr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,a=null;const o=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){a=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),d=this._getHandJoint(l,_);m!==null&&(d.matrix.fromArray(m.transform.matrix),d.matrix.decompose(d.position,d.rotation,d.scale),d.jointRadius=m.radius),d.visible=m!==null}const u=l.joints["index-finger-tip"],h=l.joints["thumb-tip"],f=u.position.distanceTo(h.position),p=.02,g=.005;l.inputState.pinching&&f>p+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&f<=p-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));o!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(PM)))}return o!==null&&(o.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=a!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new qr;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class LM extends Qe{constructor(t,e,n,i,r,a,o,c,l,u){if(u=u!==void 0?u:Ci,u!==Ci&&u!==Ms)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&u===Ci&&(n=Ti),n===void 0&&u===Ms&&(n=fs),super(null,i,r,a,o,c,u,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=o!==void 0?o:Ue,this.minFilter=c!==void 0?c:Ue,this.flipY=!1,this.generateMipmaps=!1}}class IM extends Ds{constructor(t,e){super();const n=this;let i=null,r=1,a=null,o="local-floor",c=1,l=null,u=null,h=null,f=null,p=null,g=null;const _=e.getContextAttributes();let m=null,d=null;const b=[],S=[],y=new Set,v=new Map,T=new on;T.layers.enable(1),T.viewport=new Ee;const A=new on;A.layers.enable(2),A.viewport=new Ee;const E=[T,A],x=new DM;x.layers.enable(1),x.layers.enable(2);let M=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let Z=b[q];return Z===void 0&&(Z=new pa,b[q]=Z),Z.getTargetRaySpace()},this.getControllerGrip=function(q){let Z=b[q];return Z===void 0&&(Z=new pa,b[q]=Z),Z.getGripSpace()},this.getHand=function(q){let Z=b[q];return Z===void 0&&(Z=new pa,b[q]=Z),Z.getHandSpace()};function L(q){const Z=S.indexOf(q.inputSource);if(Z===-1)return;const tt=b[Z];tt!==void 0&&tt.dispatchEvent({type:q.type,data:q.inputSource})}function P(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",P),i.removeEventListener("inputsourceschange",I);for(let q=0;q<b.length;q++){const Z=S[q];Z!==null&&(S[q]=null,b[q].disconnect(Z))}M=null,N=null,t.setRenderTarget(m),p=null,f=null,h=null,i=null,d=null,Q.stop(),n.isPresenting=!1,n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){o=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||a},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return f!==null?f:p},this.getBinding=function(){return h},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",P),i.addEventListener("inputsourceschange",I),_.xrCompatible!==!0&&await e.makeXRCompatible(),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const Z={antialias:i.renderState.layers===void 0?_.antialias:!0,alpha:_.alpha,depth:_.depth,stencil:_.stencil,framebufferScaleFactor:r};p=new XRWebGLLayer(i,e,Z),i.updateRenderState({baseLayer:p}),d=new Fi(p.framebufferWidth,p.framebufferHeight,{format:_n,type:ki,encoding:t.outputEncoding,stencilBuffer:_.stencil})}else{let Z=null,tt=null,st=null;_.depth&&(st=_.stencil?35056:33190,Z=_.stencil?Ms:Ci,tt=_.stencil?fs:Ti);const B={colorFormat:32856,depthFormat:st,scaleFactor:r};h=new XRWebGLBinding(i,e),f=h.createProjectionLayer(B),i.updateRenderState({layers:[f]}),d=new Fi(f.textureWidth,f.textureHeight,{format:_n,type:ki,depthTexture:new LM(f.textureWidth,f.textureHeight,tt,void 0,void 0,void 0,void 0,void 0,void 0,Z),stencilBuffer:_.stencil,encoding:t.outputEncoding,samples:_.antialias?4:0});const et=t.properties.get(d);et.__ignoreDepthValues=f.ignoreDepthValues}d.isXRRenderTarget=!0,this.setFoveation(c),l=null,a=await i.requestReferenceSpace(o),Q.setContext(i),Q.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}};function I(q){for(let Z=0;Z<q.removed.length;Z++){const tt=q.removed[Z],st=S.indexOf(tt);st>=0&&(S[st]=null,b[st].disconnect(tt))}for(let Z=0;Z<q.added.length;Z++){const tt=q.added[Z];let st=S.indexOf(tt);if(st===-1){for(let et=0;et<b.length;et++)if(et>=S.length){S.push(tt),st=et;break}else if(S[et]===null){S[et]=tt,st=et;break}if(st===-1)break}const B=b[st];B&&B.connect(tt)}}const k=new W,F=new W;function z(q,Z,tt){k.setFromMatrixPosition(Z.matrixWorld),F.setFromMatrixPosition(tt.matrixWorld);const st=k.distanceTo(F),B=Z.projectionMatrix.elements,et=tt.projectionMatrix.elements,Mt=B[14]/(B[10]-1),ct=B[14]/(B[10]+1),St=(B[9]+1)/B[5],zt=(B[9]-1)/B[5],_t=(B[8]-1)/B[0],Ot=(et[8]+1)/et[0],at=Mt*_t,ft=Mt*Ot,kt=st/(-_t+Ot),Dt=kt*-_t;Z.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(Dt),q.translateZ(kt),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const gt=Mt+kt,Ct=ct+kt,$t=at-Dt,R=ft+(st-Dt),w=St*ct/Ct*gt,j=zt*ct/Ct*gt;q.projectionMatrix.makePerspective($t,R,w,j,gt,Ct),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function G(q,Z){Z===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(Z.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;x.near=A.near=T.near=q.near,x.far=A.far=T.far=q.far,(M!==x.near||N!==x.far)&&(i.updateRenderState({depthNear:x.near,depthFar:x.far}),M=x.near,N=x.far);const Z=q.parent,tt=x.cameras;G(x,Z);for(let st=0;st<tt.length;st++)G(tt[st],Z);tt.length===2?z(x,T,A):x.projectionMatrix.copy(T.projectionMatrix),X(q,x,Z)};function X(q,Z,tt){tt===null?q.matrix.copy(Z.matrixWorld):(q.matrix.copy(tt.matrixWorld),q.matrix.invert(),q.matrix.multiply(Z.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0);const st=q.children;for(let B=0,et=st.length;B<et;B++)st[B].updateMatrixWorld(!0);q.projectionMatrix.copy(Z.projectionMatrix),q.projectionMatrixInverse.copy(Z.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Fa*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return x},this.getFoveation=function(){if(!(f===null&&p===null))return c},this.setFoveation=function(q){c=q,f!==null&&(f.fixedFoveation=q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=q)},this.getPlanes=function(){return y};let H=null;function ot(q,Z){if(u=Z.getViewerPose(l||a),g=Z,u!==null){const tt=u.views;p!==null&&(t.setRenderTargetFramebuffer(d,p.framebuffer),t.setRenderTarget(d));let st=!1;tt.length!==x.cameras.length&&(x.cameras.length=0,st=!0);for(let B=0;B<tt.length;B++){const et=tt[B];let Mt=null;if(p!==null)Mt=p.getViewport(et);else{const St=h.getViewSubImage(f,et);Mt=St.viewport,B===0&&(t.setRenderTargetTextures(d,St.colorTexture,f.ignoreDepthValues?void 0:St.depthStencilTexture),t.setRenderTarget(d))}let ct=E[B];ct===void 0&&(ct=new on,ct.layers.enable(B),ct.viewport=new Ee,E[B]=ct),ct.matrix.fromArray(et.transform.matrix),ct.matrix.decompose(ct.position,ct.quaternion,ct.scale),ct.projectionMatrix.fromArray(et.projectionMatrix),ct.projectionMatrixInverse.copy(ct.projectionMatrix).invert(),ct.viewport.set(Mt.x,Mt.y,Mt.width,Mt.height),B===0&&(x.matrix.copy(ct.matrix),x.matrix.decompose(x.position,x.quaternion,x.scale)),st===!0&&x.cameras.push(ct)}}for(let tt=0;tt<b.length;tt++){const st=S[tt],B=b[tt];st!==null&&B!==void 0&&B.update(st,Z,l||a)}if(H&&H(q,Z),Z.detectedPlanes){n.dispatchEvent({type:"planesdetected",data:Z.detectedPlanes});let tt=null;for(const st of y)Z.detectedPlanes.has(st)||(tt===null&&(tt=[]),tt.push(st));if(tt!==null)for(const st of tt)y.delete(st),v.delete(st),n.dispatchEvent({type:"planeremoved",data:st});for(const st of Z.detectedPlanes)if(!y.has(st))y.add(st),v.set(st,Z.lastChangedTime),n.dispatchEvent({type:"planeadded",data:st});else{const B=v.get(st);st.lastChangedTime>B&&(v.set(st,st.lastChangedTime),n.dispatchEvent({type:"planechanged",data:st}))}}g=null}const Q=new Lh;Q.setAnimationLoop(ot),this.setAnimationLoop=function(q){H=q},this.dispose=function(){}}}function NM(s,t){function e(m,d){m.matrixAutoUpdate===!0&&m.updateMatrix(),d.value.copy(m.matrix)}function n(m,d){d.color.getRGB(m.fogColor.value,Ch(s)),d.isFog?(m.fogNear.value=d.near,m.fogFar.value=d.far):d.isFogExp2&&(m.fogDensity.value=d.density)}function i(m,d,b,S,y){d.isMeshBasicMaterial||d.isMeshLambertMaterial?r(m,d):d.isMeshToonMaterial?(r(m,d),h(m,d)):d.isMeshPhongMaterial?(r(m,d),u(m,d)):d.isMeshStandardMaterial?(r(m,d),f(m,d),d.isMeshPhysicalMaterial&&p(m,d,y)):d.isMeshMatcapMaterial?(r(m,d),g(m,d)):d.isMeshDepthMaterial?r(m,d):d.isMeshDistanceMaterial?(r(m,d),_(m,d)):d.isMeshNormalMaterial?r(m,d):d.isLineBasicMaterial?(a(m,d),d.isLineDashedMaterial&&o(m,d)):d.isPointsMaterial?c(m,d,b,S):d.isSpriteMaterial?l(m,d):d.isShadowMaterial?(m.color.value.copy(d.color),m.opacity.value=d.opacity):d.isShaderMaterial&&(d.uniformsNeedUpdate=!1)}function r(m,d){m.opacity.value=d.opacity,d.color&&m.diffuse.value.copy(d.color),d.emissive&&m.emissive.value.copy(d.emissive).multiplyScalar(d.emissiveIntensity),d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap,e(d.alphaMap,m.alphaMapTransform)),d.bumpMap&&(m.bumpMap.value=d.bumpMap,e(d.bumpMap,m.bumpMapTransform),m.bumpScale.value=d.bumpScale,d.side===qe&&(m.bumpScale.value*=-1)),d.normalMap&&(m.normalMap.value=d.normalMap,e(d.normalMap,m.normalMapTransform),m.normalScale.value.copy(d.normalScale),d.side===qe&&m.normalScale.value.negate()),d.displacementMap&&(m.displacementMap.value=d.displacementMap,e(d.displacementMap,m.displacementMapTransform),m.displacementScale.value=d.displacementScale,m.displacementBias.value=d.displacementBias),d.emissiveMap&&(m.emissiveMap.value=d.emissiveMap,e(d.emissiveMap,m.emissiveMapTransform)),d.specularMap&&(m.specularMap.value=d.specularMap,e(d.specularMap,m.specularMapTransform)),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest);const b=t.get(d).envMap;if(b&&(m.envMap.value=b,m.flipEnvMap.value=b.isCubeTexture&&b.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=d.reflectivity,m.ior.value=d.ior,m.refractionRatio.value=d.refractionRatio),d.lightMap){m.lightMap.value=d.lightMap;const S=s.useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=d.lightMapIntensity*S,e(d.lightMap,m.lightMapTransform)}d.aoMap&&(m.aoMap.value=d.aoMap,m.aoMapIntensity.value=d.aoMapIntensity,e(d.aoMap,m.aoMapTransform))}function a(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform))}function o(m,d){m.dashSize.value=d.dashSize,m.totalSize.value=d.dashSize+d.gapSize,m.scale.value=d.scale}function c(m,d,b,S){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.size.value=d.size*b,m.scale.value=S*.5,d.map&&(m.map.value=d.map,e(d.map,m.uvTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function l(m,d){m.diffuse.value.copy(d.color),m.opacity.value=d.opacity,m.rotation.value=d.rotation,d.map&&(m.map.value=d.map,e(d.map,m.mapTransform)),d.alphaMap&&(m.alphaMap.value=d.alphaMap),d.alphaTest>0&&(m.alphaTest.value=d.alphaTest)}function u(m,d){m.specular.value.copy(d.specular),m.shininess.value=Math.max(d.shininess,1e-4)}function h(m,d){d.gradientMap&&(m.gradientMap.value=d.gradientMap)}function f(m,d){m.metalness.value=d.metalness,d.metalnessMap&&(m.metalnessMap.value=d.metalnessMap,e(d.metalnessMap,m.metalnessMapTransform)),m.roughness.value=d.roughness,d.roughnessMap&&(m.roughnessMap.value=d.roughnessMap,e(d.roughnessMap,m.roughnessMapTransform)),t.get(d).envMap&&(m.envMapIntensity.value=d.envMapIntensity)}function p(m,d,b){m.ior.value=d.ior,d.sheen>0&&(m.sheenColor.value.copy(d.sheenColor).multiplyScalar(d.sheen),m.sheenRoughness.value=d.sheenRoughness,d.sheenColorMap&&(m.sheenColorMap.value=d.sheenColorMap,e(d.sheenColorMap,m.sheenColorMapTransform)),d.sheenRoughnessMap&&(m.sheenRoughnessMap.value=d.sheenRoughnessMap,e(d.sheenRoughnessMap,m.sheenRoughnessMapTransform))),d.clearcoat>0&&(m.clearcoat.value=d.clearcoat,m.clearcoatRoughness.value=d.clearcoatRoughness,d.clearcoatMap&&(m.clearcoatMap.value=d.clearcoatMap,e(d.clearcoatMap,m.clearcoatMapTransform)),d.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=d.clearcoatRoughnessMap,e(d.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),d.clearcoatNormalMap&&(m.clearcoatNormalMap.value=d.clearcoatNormalMap,e(d.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(d.clearcoatNormalScale),d.side===qe&&m.clearcoatNormalScale.value.negate())),d.iridescence>0&&(m.iridescence.value=d.iridescence,m.iridescenceIOR.value=d.iridescenceIOR,m.iridescenceThicknessMinimum.value=d.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=d.iridescenceThicknessRange[1],d.iridescenceMap&&(m.iridescenceMap.value=d.iridescenceMap,e(d.iridescenceMap,m.iridescenceMapTransform)),d.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=d.iridescenceThicknessMap,e(d.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),d.transmission>0&&(m.transmission.value=d.transmission,m.transmissionSamplerMap.value=b.texture,m.transmissionSamplerSize.value.set(b.width,b.height),d.transmissionMap&&(m.transmissionMap.value=d.transmissionMap,e(d.transmissionMap,m.transmissionMapTransform)),m.thickness.value=d.thickness,d.thicknessMap&&(m.thicknessMap.value=d.thicknessMap,e(d.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=d.attenuationDistance,m.attenuationColor.value.copy(d.attenuationColor)),m.specularIntensity.value=d.specularIntensity,m.specularColor.value.copy(d.specularColor),d.specularColorMap&&(m.specularColorMap.value=d.specularColorMap,e(d.specularColorMap,m.specularColorMapTransform)),d.specularIntensityMap&&(m.specularIntensityMap.value=d.specularIntensityMap,e(d.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,d){d.matcap&&(m.matcap.value=d.matcap)}function _(m,d){const b=t.get(d).light;m.referencePosition.value.setFromMatrixPosition(b.matrixWorld),m.nearDistance.value=b.shadow.camera.near,m.farDistance.value=b.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function OM(s,t,e,n){let i={},r={},a=[];const o=e.isWebGL2?s.getParameter(35375):0;function c(b,S){const y=S.program;n.uniformBlockBinding(b,y)}function l(b,S){let y=i[b.id];y===void 0&&(g(b),y=u(b),i[b.id]=y,b.addEventListener("dispose",m));const v=S.program;n.updateUBOMapping(b,v);const T=t.render.frame;r[b.id]!==T&&(f(b),r[b.id]=T)}function u(b){const S=h();b.__bindingPointIndex=S;const y=s.createBuffer(),v=b.__size,T=b.usage;return s.bindBuffer(35345,y),s.bufferData(35345,v,T),s.bindBuffer(35345,null),s.bindBufferBase(35345,S,y),y}function h(){for(let b=0;b<o;b++)if(a.indexOf(b)===-1)return a.push(b),b;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function f(b){const S=i[b.id],y=b.uniforms,v=b.__cache;s.bindBuffer(35345,S);for(let T=0,A=y.length;T<A;T++){const E=y[T];if(p(E,T,v)===!0){const x=E.__offset,M=Array.isArray(E.value)?E.value:[E.value];let N=0;for(let L=0;L<M.length;L++){const P=M[L],I=_(P);typeof P=="number"?(E.__data[0]=P,s.bufferSubData(35345,x+N,E.__data)):P.isMatrix3?(E.__data[0]=P.elements[0],E.__data[1]=P.elements[1],E.__data[2]=P.elements[2],E.__data[3]=P.elements[0],E.__data[4]=P.elements[3],E.__data[5]=P.elements[4],E.__data[6]=P.elements[5],E.__data[7]=P.elements[0],E.__data[8]=P.elements[6],E.__data[9]=P.elements[7],E.__data[10]=P.elements[8],E.__data[11]=P.elements[0]):(P.toArray(E.__data,N),N+=I.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(35345,x,E.__data)}}s.bindBuffer(35345,null)}function p(b,S,y){const v=b.value;if(y[S]===void 0){if(typeof v=="number")y[S]=v;else{const T=Array.isArray(v)?v:[v],A=[];for(let E=0;E<T.length;E++)A.push(T[E].clone());y[S]=A}return!0}else if(typeof v=="number"){if(y[S]!==v)return y[S]=v,!0}else{const T=Array.isArray(y[S])?y[S]:[y[S]],A=Array.isArray(v)?v:[v];for(let E=0;E<T.length;E++){const x=T[E];if(x.equals(A[E])===!1)return x.copy(A[E]),!0}}return!1}function g(b){const S=b.uniforms;let y=0;const v=16;let T=0;for(let A=0,E=S.length;A<E;A++){const x=S[A],M={boundary:0,storage:0},N=Array.isArray(x.value)?x.value:[x.value];for(let L=0,P=N.length;L<P;L++){const I=N[L],k=_(I);M.boundary+=k.boundary,M.storage+=k.storage}if(x.__data=new Float32Array(M.storage/Float32Array.BYTES_PER_ELEMENT),x.__offset=y,A>0){T=y%v;const L=v-T;T!==0&&L-M.boundary<0&&(y+=v-T,x.__offset=y)}y+=M.storage}return T=y%v,T>0&&(y+=v-T),b.__size=y,b.__cache={},this}function _(b){const S={boundary:0,storage:0};return typeof b=="number"?(S.boundary=4,S.storage=4):b.isVector2?(S.boundary=8,S.storage=8):b.isVector3||b.isColor?(S.boundary=16,S.storage=12):b.isVector4?(S.boundary=16,S.storage=16):b.isMatrix3?(S.boundary=48,S.storage=48):b.isMatrix4?(S.boundary=64,S.storage=64):b.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",b),S}function m(b){const S=b.target;S.removeEventListener("dispose",m);const y=a.indexOf(S.__bindingPointIndex);a.splice(y,1),s.deleteBuffer(i[S.id]),delete i[S.id],delete r[S.id]}function d(){for(const b in i)s.deleteBuffer(i[b]);a=[],i={},r={}}return{bind:c,update:l,dispose:d}}function kM(){const s=_o("canvas");return s.style.display="block",s}class Uh{constructor(t={}){const{canvas:e=kM(),context:n=null,depth:i=!0,stencil:r=!0,alpha:a=!1,antialias:o=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1}=t;this.isWebGLRenderer=!0;let f;n!==null?f=n.getContextAttributes().alpha:f=a;let p=null,g=null;const _=[],m=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.outputEncoding=Ui,this.useLegacyLights=!0,this.toneMapping=qn,this.toneMappingExposure=1;const d=this;let b=!1,S=0,y=0,v=null,T=-1,A=null;const E=new Ee,x=new Ee;let M=null,N=e.width,L=e.height,P=1,I=null,k=null;const F=new Ee(0,0,N,L),z=new Ee(0,0,N,L);let G=!1;const X=new Ph;let H=!1,ot=!1,Q=null;const q=new Ae,Z=new W,tt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function st(){return v===null?P:1}let B=n;function et(C,V){for(let Y=0;Y<C.length;Y++){const U=C[Y],J=e.getContext(U,V);if(J!==null)return J}return null}try{const C={alpha:!0,depth:i,stencil:r,antialias:o,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${fc}`),e.addEventListener("webglcontextlost",xt,!1),e.addEventListener("webglcontextrestored",Wt,!1),e.addEventListener("webglcontextcreationerror",qt,!1),B===null){const V=["webgl2","webgl","experimental-webgl"];if(d.isWebGL1Renderer===!0&&V.shift(),B=et(V,C),B===null)throw et(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}B.getShaderPrecisionFormat===void 0&&(B.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(C){throw console.error("THREE.WebGLRenderer: "+C.message),C}let Mt,ct,St,zt,_t,Ot,at,ft,kt,Dt,gt,Ct,$t,R,w,j,nt,rt,ht,Et,mt,K,vt,bt;function Tt(){Mt=new jy(B),ct=new zy(B,Mt,t),Mt.init(ct),K=new RM(B,Mt,ct),St=new AM(B,Mt,ct),zt=new Zy,_t=new fM,Ot=new CM(B,Mt,St,_t,ct,K,zt),at=new Gy(d),ft=new Xy(d),kt=new a0(B,ct),vt=new Fy(B,Mt,kt,ct),Dt=new Yy(B,kt,zt,vt),gt=new tS(B,Dt,kt,zt),ht=new Qy(B,ct,Ot),j=new By(_t),Ct=new dM(d,at,ft,Mt,ct,vt,j),$t=new NM(d,_t),R=new mM,w=new SM(Mt,ct),rt=new Uy(d,at,ft,St,gt,f,c),nt=new EM(d,gt,ct),bt=new OM(B,zt,ct,St),Et=new Vy(B,Mt,zt,ct),mt=new $y(B,Mt,zt,ct),zt.programs=Ct.programs,d.capabilities=ct,d.extensions=Mt,d.properties=_t,d.renderLists=R,d.shadowMap=nt,d.state=St,d.info=zt}Tt();const pt=new IM(d,B);this.xr=pt,this.getContext=function(){return B},this.getContextAttributes=function(){return B.getContextAttributes()},this.forceContextLoss=function(){const C=Mt.get("WEBGL_lose_context");C&&C.loseContext()},this.forceContextRestore=function(){const C=Mt.get("WEBGL_lose_context");C&&C.restoreContext()},this.getPixelRatio=function(){return P},this.setPixelRatio=function(C){C!==void 0&&(P=C,this.setSize(N,L,!1))},this.getSize=function(C){return C.set(N,L)},this.setSize=function(C,V,Y=!0){if(pt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}N=C,L=V,e.width=Math.floor(C*P),e.height=Math.floor(V*P),Y===!0&&(e.style.width=C+"px",e.style.height=V+"px"),this.setViewport(0,0,C,V)},this.getDrawingBufferSize=function(C){return C.set(N*P,L*P).floor()},this.setDrawingBufferSize=function(C,V,Y){N=C,L=V,P=Y,e.width=Math.floor(C*Y),e.height=Math.floor(V*Y),this.setViewport(0,0,C,V)},this.getCurrentViewport=function(C){return C.copy(E)},this.getViewport=function(C){return C.copy(F)},this.setViewport=function(C,V,Y,U){C.isVector4?F.set(C.x,C.y,C.z,C.w):F.set(C,V,Y,U),St.viewport(E.copy(F).multiplyScalar(P).floor())},this.getScissor=function(C){return C.copy(z)},this.setScissor=function(C,V,Y,U){C.isVector4?z.set(C.x,C.y,C.z,C.w):z.set(C,V,Y,U),St.scissor(x.copy(z).multiplyScalar(P).floor())},this.getScissorTest=function(){return G},this.setScissorTest=function(C){St.setScissorTest(G=C)},this.setOpaqueSort=function(C){I=C},this.setTransparentSort=function(C){k=C},this.getClearColor=function(C){return C.copy(rt.getClearColor())},this.setClearColor=function(){rt.setClearColor.apply(rt,arguments)},this.getClearAlpha=function(){return rt.getClearAlpha()},this.setClearAlpha=function(){rt.setClearAlpha.apply(rt,arguments)},this.clear=function(C=!0,V=!0,Y=!0){let U=0;C&&(U|=16384),V&&(U|=256),Y&&(U|=1024),B.clear(U)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",xt,!1),e.removeEventListener("webglcontextrestored",Wt,!1),e.removeEventListener("webglcontextcreationerror",qt,!1),R.dispose(),w.dispose(),_t.dispose(),at.dispose(),ft.dispose(),gt.dispose(),vt.dispose(),bt.dispose(),Ct.dispose(),pt.dispose(),pt.removeEventListener("sessionstart",yt),pt.removeEventListener("sessionend",Qt),Q&&(Q.dispose(),Q=null),oe.stop()};function xt(C){C.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),b=!0}function Wt(){console.log("THREE.WebGLRenderer: Context Restored."),b=!1;const C=zt.autoReset,V=nt.enabled,Y=nt.autoUpdate,U=nt.needsUpdate,J=nt.type;Tt(),zt.autoReset=C,nt.enabled=V,nt.autoUpdate=Y,nt.needsUpdate=U,nt.type=J}function qt(C){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",C.statusMessage)}function ue(C){const V=C.target;V.removeEventListener("dispose",ue),O(V)}function O(C){$(C),_t.remove(C)}function $(C){const V=_t.get(C).programs;V!==void 0&&(V.forEach(function(Y){Ct.releaseProgram(Y)}),C.isShaderMaterial&&Ct.releaseShaderCache(C))}this.renderBufferDirect=function(C,V,Y,U,J,wt){V===null&&(V=tt);const At=J.isMesh&&J.matrixWorld.determinant()<0,Rt=Vh(C,V,Y,U,J);St.setMaterial(U,At);let Lt=Y.index,Ut=1;U.wireframe===!0&&(Lt=Dt.getWireframeAttribute(Y),Ut=2);const Ft=Y.drawRange,Bt=Y.attributes.position;let Xt=Ft.start*Ut,Ne=(Ft.start+Ft.count)*Ut;wt!==null&&(Xt=Math.max(Xt,wt.start*Ut),Ne=Math.min(Ne,(wt.start+wt.count)*Ut)),Lt!==null?(Xt=Math.max(Xt,0),Ne=Math.min(Ne,Lt.count)):Bt!=null&&(Xt=Math.max(Xt,0),Ne=Math.min(Ne,Bt.count));const un=Ne-Xt;if(un<0||un===1/0)return;vt.setup(J,U,Rt,Y,Lt);let pi,me=Et;if(Lt!==null&&(pi=kt.get(Lt),me=mt,me.setIndex(pi)),J.isMesh)U.wireframe===!0?(St.setLineWidth(U.wireframeLinewidth*st()),me.setMode(1)):me.setMode(4);else if(J.isLine){let Ht=U.linewidth;Ht===void 0&&(Ht=1),St.setLineWidth(Ht*st()),J.isLineSegments?me.setMode(1):J.isLineLoop?me.setMode(2):me.setMode(3)}else J.isPoints?me.setMode(0):J.isSprite&&me.setMode(4);if(J.isInstancedMesh)me.renderInstances(Xt,un,J.count);else if(Y.isInstancedBufferGeometry){const Ht=Y._maxInstanceCount!==void 0?Y._maxInstanceCount:1/0,No=Math.min(Y.instanceCount,Ht);me.renderInstances(Xt,un,No)}else me.render(Xt,un)},this.compile=function(C,V){function Y(U,J,wt){U.transparent===!0&&U.side===Bn&&U.forceSinglePass===!1?(U.side=qe,U.needsUpdate=!0,xr(U,J,wt),U.side=ui,U.needsUpdate=!0,xr(U,J,wt),U.side=Bn):xr(U,J,wt)}g=w.get(C),g.init(),m.push(g),C.traverseVisible(function(U){U.isLight&&U.layers.test(V.layers)&&(g.pushLight(U),U.castShadow&&g.pushShadow(U))}),g.setupLights(d.useLegacyLights),C.traverse(function(U){const J=U.material;if(J)if(Array.isArray(J))for(let wt=0;wt<J.length;wt++){const At=J[wt];Y(At,C,U)}else Y(J,C,U)}),m.pop(),g=null};let it=null;function dt(C){it&&it(C)}function yt(){oe.stop()}function Qt(){oe.start()}const oe=new Lh;oe.setAnimationLoop(dt),typeof self<"u"&&oe.setContext(self),this.setAnimationLoop=function(C){it=C,pt.setAnimationLoop(C),C===null?oe.stop():oe.start()},pt.addEventListener("sessionstart",yt),pt.addEventListener("sessionend",Qt),this.render=function(C,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(b===!0)return;C.matrixWorldAutoUpdate===!0&&C.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),pt.enabled===!0&&pt.isPresenting===!0&&(pt.cameraAutoUpdate===!0&&pt.updateCamera(V),V=pt.getCamera()),C.isScene===!0&&C.onBeforeRender(d,C,V,v),g=w.get(C,m.length),g.init(),m.push(g),q.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),X.setFromProjectionMatrix(q),ot=this.localClippingEnabled,H=j.init(this.clippingPlanes,ot),p=R.get(C,_.length),p.init(),_.push(p),Re(C,V,0,d.sortObjects),p.finish(),d.sortObjects===!0&&p.sort(I,k),H===!0&&j.beginShadows();const Y=g.state.shadowsArray;if(nt.render(Y,C,V),H===!0&&j.endShadows(),this.info.autoReset===!0&&this.info.reset(),rt.render(p,C),g.setupLights(d.useLegacyLights),V.isArrayCamera){const U=V.cameras;for(let J=0,wt=U.length;J<wt;J++){const At=U[J];Kn(p,C,At,At.viewport)}}else Kn(p,C,V);v!==null&&(Ot.updateMultisampleRenderTarget(v),Ot.updateRenderTargetMipmap(v)),C.isScene===!0&&C.onAfterRender(d,C,V),vt.resetDefaultState(),T=-1,A=null,m.pop(),m.length>0?g=m[m.length-1]:g=null,_.pop(),_.length>0?p=_[_.length-1]:p=null};function Re(C,V,Y,U){if(C.visible===!1)return;if(C.layers.test(V.layers)){if(C.isGroup)Y=C.renderOrder;else if(C.isLOD)C.autoUpdate===!0&&C.update(V);else if(C.isLight)g.pushLight(C),C.castShadow&&g.pushShadow(C);else if(C.isSprite){if(!C.frustumCulled||X.intersectsSprite(C)){U&&Z.setFromMatrixPosition(C.matrixWorld).applyMatrix4(q);const At=gt.update(C),Rt=C.material;Rt.visible&&p.push(C,At,Rt,Y,Z.z,null)}}else if((C.isMesh||C.isLine||C.isPoints)&&(C.isSkinnedMesh&&C.skeleton.frame!==zt.render.frame&&(C.skeleton.update(),C.skeleton.frame=zt.render.frame),!C.frustumCulled||X.intersectsObject(C))){U&&Z.setFromMatrixPosition(C.matrixWorld).applyMatrix4(q);const At=gt.update(C),Rt=C.material;if(Array.isArray(Rt)){const Lt=At.groups;for(let Ut=0,Ft=Lt.length;Ut<Ft;Ut++){const Bt=Lt[Ut],Xt=Rt[Bt.materialIndex];Xt&&Xt.visible&&p.push(C,At,Xt,Y,Z.z,Bt)}}else Rt.visible&&p.push(C,At,Rt,Y,Z.z,null)}}const wt=C.children;for(let At=0,Rt=wt.length;At<Rt;At++)Re(wt[At],V,Y,U)}function Kn(C,V,Y,U){const J=C.opaque,wt=C.transmissive,At=C.transparent;g.setupLightsView(Y),H===!0&&j.setGlobalState(d.clippingPlanes,Y),wt.length>0&&he(J,wt,V,Y),U&&St.viewport(E.copy(U)),J.length>0&&nn(J,V,Y),wt.length>0&&nn(wt,V,Y),At.length>0&&nn(At,V,Y),St.buffers.depth.setTest(!0),St.buffers.depth.setMask(!0),St.buffers.color.setMask(!0),St.setPolygonOffset(!1)}function he(C,V,Y,U){if(Q===null){const Rt=ct.isWebGL2;Q=new Fi(1024,1024,{generateMipmaps:!0,type:Mt.has("EXT_color_buffer_half_float")?er:ki,minFilter:tr,samples:Rt&&o===!0?4:0})}const J=d.getRenderTarget();d.setRenderTarget(Q),d.clear();const wt=d.toneMapping;d.toneMapping=qn,nn(C,Y,U),Ot.updateMultisampleRenderTarget(Q),Ot.updateRenderTargetMipmap(Q);let At=!1;for(let Rt=0,Lt=V.length;Rt<Lt;Rt++){const Ut=V[Rt],Ft=Ut.object,Bt=Ut.geometry,Xt=Ut.material,Ne=Ut.group;if(Xt.side===Bn&&Ft.layers.test(U.layers)){const un=Xt.side;Xt.side=qe,Xt.needsUpdate=!0,bn(Ft,Y,U,Bt,Xt,Ne),Xt.side=un,Xt.needsUpdate=!0,At=!0}}At===!0&&(Ot.updateMultisampleRenderTarget(Q),Ot.updateRenderTargetMipmap(Q)),d.setRenderTarget(J),d.toneMapping=wt}function nn(C,V,Y){const U=V.isScene===!0?V.overrideMaterial:null;for(let J=0,wt=C.length;J<wt;J++){const At=C[J],Rt=At.object,Lt=At.geometry,Ut=U===null?At.material:U,Ft=At.group;Rt.layers.test(Y.layers)&&bn(Rt,V,Y,Lt,Ut,Ft)}}function bn(C,V,Y,U,J,wt){C.onBeforeRender(d,V,Y,U,J,wt),C.modelViewMatrix.multiplyMatrices(Y.matrixWorldInverse,C.matrixWorld),C.normalMatrix.getNormalMatrix(C.modelViewMatrix),J.onBeforeRender(d,V,Y,U,C,wt),J.transparent===!0&&J.side===Bn&&J.forceSinglePass===!1?(J.side=qe,J.needsUpdate=!0,d.renderBufferDirect(Y,V,U,J,C,wt),J.side=ui,J.needsUpdate=!0,d.renderBufferDirect(Y,V,U,J,C,wt),J.side=Bn):d.renderBufferDirect(Y,V,U,J,C,wt),C.onAfterRender(d,V,Y,U,J,wt)}function xr(C,V,Y){V.isScene!==!0&&(V=tt);const U=_t.get(C),J=g.state.lights,wt=g.state.shadowsArray,At=J.state.version,Rt=Ct.getParameters(C,J.state,wt,V,Y),Lt=Ct.getProgramCacheKey(Rt);let Ut=U.programs;U.environment=C.isMeshStandardMaterial?V.environment:null,U.fog=V.fog,U.envMap=(C.isMeshStandardMaterial?ft:at).get(C.envMap||U.environment),Ut===void 0&&(C.addEventListener("dispose",ue),Ut=new Map,U.programs=Ut);let Ft=Ut.get(Lt);if(Ft!==void 0){if(U.currentProgram===Ft&&U.lightsStateVersion===At)return _c(C,Rt),Ft}else Rt.uniforms=Ct.getUniforms(C),C.onBuild(Y,Rt,d),C.onBeforeCompile(Rt,d),Ft=Ct.acquireProgram(Rt,Lt),Ut.set(Lt,Ft),U.uniforms=Rt.uniforms;const Bt=U.uniforms;(!C.isShaderMaterial&&!C.isRawShaderMaterial||C.clipping===!0)&&(Bt.clippingPlanes=j.uniform),_c(C,Rt),U.needsLights=Bh(C),U.lightsStateVersion=At,U.needsLights&&(Bt.ambientLightColor.value=J.state.ambient,Bt.lightProbe.value=J.state.probe,Bt.directionalLights.value=J.state.directional,Bt.directionalLightShadows.value=J.state.directionalShadow,Bt.spotLights.value=J.state.spot,Bt.spotLightShadows.value=J.state.spotShadow,Bt.rectAreaLights.value=J.state.rectArea,Bt.ltc_1.value=J.state.rectAreaLTC1,Bt.ltc_2.value=J.state.rectAreaLTC2,Bt.pointLights.value=J.state.point,Bt.pointLightShadows.value=J.state.pointShadow,Bt.hemisphereLights.value=J.state.hemi,Bt.directionalShadowMap.value=J.state.directionalShadowMap,Bt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,Bt.spotShadowMap.value=J.state.spotShadowMap,Bt.spotLightMatrix.value=J.state.spotLightMatrix,Bt.spotLightMap.value=J.state.spotLightMap,Bt.pointShadowMap.value=J.state.pointShadowMap,Bt.pointShadowMatrix.value=J.state.pointShadowMatrix);const Xt=Ft.getUniforms(),Ne=Kr.seqWithValue(Xt.seq,Bt);return U.currentProgram=Ft,U.uniformsList=Ne,Ft}function _c(C,V){const Y=_t.get(C);Y.outputEncoding=V.outputEncoding,Y.instancing=V.instancing,Y.skinning=V.skinning,Y.morphTargets=V.morphTargets,Y.morphNormals=V.morphNormals,Y.morphColors=V.morphColors,Y.morphTargetsCount=V.morphTargetsCount,Y.numClippingPlanes=V.numClippingPlanes,Y.numIntersection=V.numClipIntersection,Y.vertexAlphas=V.vertexAlphas,Y.vertexTangents=V.vertexTangents,Y.toneMapping=V.toneMapping}function Vh(C,V,Y,U,J){V.isScene!==!0&&(V=tt),Ot.resetTextureUnits();const wt=V.fog,At=U.isMeshStandardMaterial?V.environment:null,Rt=v===null?d.outputEncoding:v.isXRRenderTarget===!0?v.texture.encoding:Ui,Lt=(U.isMeshStandardMaterial?ft:at).get(U.envMap||At),Ut=U.vertexColors===!0&&!!Y.attributes.color&&Y.attributes.color.itemSize===4,Ft=!!U.normalMap&&!!Y.attributes.tangent,Bt=!!Y.morphAttributes.position,Xt=!!Y.morphAttributes.normal,Ne=!!Y.morphAttributes.color,un=U.toneMapped?d.toneMapping:qn,pi=Y.morphAttributes.position||Y.morphAttributes.normal||Y.morphAttributes.color,me=pi!==void 0?pi.length:0,Ht=_t.get(U),No=g.state.lights;if(H===!0&&(ot===!0||C!==A)){const je=C===A&&U.id===T;j.setState(U,C,je)}let Me=!1;U.version===Ht.__version?(Ht.needsLights&&Ht.lightsStateVersion!==No.state.version||Ht.outputEncoding!==Rt||J.isInstancedMesh&&Ht.instancing===!1||!J.isInstancedMesh&&Ht.instancing===!0||J.isSkinnedMesh&&Ht.skinning===!1||!J.isSkinnedMesh&&Ht.skinning===!0||Ht.envMap!==Lt||U.fog===!0&&Ht.fog!==wt||Ht.numClippingPlanes!==void 0&&(Ht.numClippingPlanes!==j.numPlanes||Ht.numIntersection!==j.numIntersection)||Ht.vertexAlphas!==Ut||Ht.vertexTangents!==Ft||Ht.morphTargets!==Bt||Ht.morphNormals!==Xt||Ht.morphColors!==Ne||Ht.toneMapping!==un||ct.isWebGL2===!0&&Ht.morphTargetsCount!==me)&&(Me=!0):(Me=!0,Ht.__version=U.version);let mi=Ht.currentProgram;Me===!0&&(mi=xr(U,V,J));let vc=!1,Ls=!1,Oo=!1;const Oe=mi.getUniforms(),gi=Ht.uniforms;if(St.useProgram(mi.program)&&(vc=!0,Ls=!0,Oo=!0),U.id!==T&&(T=U.id,Ls=!0),vc||A!==C){if(Oe.setValue(B,"projectionMatrix",C.projectionMatrix),ct.logarithmicDepthBuffer&&Oe.setValue(B,"logDepthBufFC",2/(Math.log(C.far+1)/Math.LN2)),A!==C&&(A=C,Ls=!0,Oo=!0),U.isShaderMaterial||U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshStandardMaterial||U.envMap){const je=Oe.map.cameraPosition;je!==void 0&&je.setValue(B,Z.setFromMatrixPosition(C.matrixWorld))}(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial)&&Oe.setValue(B,"isOrthographic",C.isOrthographicCamera===!0),(U.isMeshPhongMaterial||U.isMeshToonMaterial||U.isMeshLambertMaterial||U.isMeshBasicMaterial||U.isMeshStandardMaterial||U.isShaderMaterial||U.isShadowMaterial||J.isSkinnedMesh)&&Oe.setValue(B,"viewMatrix",C.matrixWorldInverse)}if(J.isSkinnedMesh){Oe.setOptional(B,J,"bindMatrix"),Oe.setOptional(B,J,"bindMatrixInverse");const je=J.skeleton;je&&(ct.floatVertexTextures?(je.boneTexture===null&&je.computeBoneTexture(),Oe.setValue(B,"boneTexture",je.boneTexture,Ot),Oe.setValue(B,"boneTextureSize",je.boneTextureSize)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}const ko=Y.morphAttributes;if((ko.position!==void 0||ko.normal!==void 0||ko.color!==void 0&&ct.isWebGL2===!0)&&ht.update(J,Y,mi),(Ls||Ht.receiveShadow!==J.receiveShadow)&&(Ht.receiveShadow=J.receiveShadow,Oe.setValue(B,"receiveShadow",J.receiveShadow)),U.isMeshGouraudMaterial&&U.envMap!==null&&(gi.envMap.value=Lt,gi.flipEnvMap.value=Lt.isCubeTexture&&Lt.isRenderTargetTexture===!1?-1:1),Ls&&(Oe.setValue(B,"toneMappingExposure",d.toneMappingExposure),Ht.needsLights&&zh(gi,Oo),wt&&U.fog===!0&&$t.refreshFogUniforms(gi,wt),$t.refreshMaterialUniforms(gi,U,P,L,Q),Kr.upload(B,Ht.uniformsList,gi,Ot)),U.isShaderMaterial&&U.uniformsNeedUpdate===!0&&(Kr.upload(B,Ht.uniformsList,gi,Ot),U.uniformsNeedUpdate=!1),U.isSpriteMaterial&&Oe.setValue(B,"center",J.center),Oe.setValue(B,"modelViewMatrix",J.modelViewMatrix),Oe.setValue(B,"normalMatrix",J.normalMatrix),Oe.setValue(B,"modelMatrix",J.matrixWorld),U.isShaderMaterial||U.isRawShaderMaterial){const je=U.uniformsGroups;for(let Uo=0,Gh=je.length;Uo<Gh;Uo++)if(ct.isWebGL2){const xc=je[Uo];bt.update(xc,mi),bt.bind(xc,mi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return mi}function zh(C,V){C.ambientLightColor.needsUpdate=V,C.lightProbe.needsUpdate=V,C.directionalLights.needsUpdate=V,C.directionalLightShadows.needsUpdate=V,C.pointLights.needsUpdate=V,C.pointLightShadows.needsUpdate=V,C.spotLights.needsUpdate=V,C.spotLightShadows.needsUpdate=V,C.rectAreaLights.needsUpdate=V,C.hemisphereLights.needsUpdate=V}function Bh(C){return C.isMeshLambertMaterial||C.isMeshToonMaterial||C.isMeshPhongMaterial||C.isMeshStandardMaterial||C.isShadowMaterial||C.isShaderMaterial&&C.lights===!0}this.getActiveCubeFace=function(){return S},this.getActiveMipmapLevel=function(){return y},this.getRenderTarget=function(){return v},this.setRenderTargetTextures=function(C,V,Y){_t.get(C.texture).__webglTexture=V,_t.get(C.depthTexture).__webglTexture=Y;const U=_t.get(C);U.__hasExternalTextures=!0,U.__hasExternalTextures&&(U.__autoAllocateDepthBuffer=Y===void 0,U.__autoAllocateDepthBuffer||Mt.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),U.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(C,V){const Y=_t.get(C);Y.__webglFramebuffer=V,Y.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(C,V=0,Y=0){v=C,S=V,y=Y;let U=!0,J=null,wt=!1,At=!1;if(C){const Lt=_t.get(C);Lt.__useDefaultFramebuffer!==void 0?(St.bindFramebuffer(36160,null),U=!1):Lt.__webglFramebuffer===void 0?Ot.setupRenderTarget(C):Lt.__hasExternalTextures&&Ot.rebindTextures(C,_t.get(C.texture).__webglTexture,_t.get(C.depthTexture).__webglTexture);const Ut=C.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(At=!0);const Ft=_t.get(C).__webglFramebuffer;C.isWebGLCubeRenderTarget?(J=Ft[V],wt=!0):ct.isWebGL2&&C.samples>0&&Ot.useMultisampledRTT(C)===!1?J=_t.get(C).__webglMultisampledFramebuffer:J=Ft,E.copy(C.viewport),x.copy(C.scissor),M=C.scissorTest}else E.copy(F).multiplyScalar(P).floor(),x.copy(z).multiplyScalar(P).floor(),M=G;if(St.bindFramebuffer(36160,J)&&ct.drawBuffers&&U&&St.drawBuffers(C,J),St.viewport(E),St.scissor(x),St.setScissorTest(M),wt){const Lt=_t.get(C.texture);B.framebufferTexture2D(36160,36064,34069+V,Lt.__webglTexture,Y)}else if(At){const Lt=_t.get(C.texture),Ut=V||0;B.framebufferTextureLayer(36160,36064,Lt.__webglTexture,Y||0,Ut)}T=-1},this.readRenderTargetPixels=function(C,V,Y,U,J,wt,At){if(!(C&&C.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Rt=_t.get(C).__webglFramebuffer;if(C.isWebGLCubeRenderTarget&&At!==void 0&&(Rt=Rt[At]),Rt){St.bindFramebuffer(36160,Rt);try{const Lt=C.texture,Ut=Lt.format,Ft=Lt.type;if(Ut!==_n&&K.convert(Ut)!==B.getParameter(35739)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Bt=Ft===er&&(Mt.has("EXT_color_buffer_half_float")||ct.isWebGL2&&Mt.has("EXT_color_buffer_float"));if(Ft!==ki&&K.convert(Ft)!==B.getParameter(35738)&&!(Ft===Ei&&(ct.isWebGL2||Mt.has("OES_texture_float")||Mt.has("WEBGL_color_buffer_float")))&&!Bt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=C.width-U&&Y>=0&&Y<=C.height-J&&B.readPixels(V,Y,U,J,K.convert(Ut),K.convert(Ft),wt)}finally{const Lt=v!==null?_t.get(v).__webglFramebuffer:null;St.bindFramebuffer(36160,Lt)}}},this.copyFramebufferToTexture=function(C,V,Y=0){const U=Math.pow(2,-Y),J=Math.floor(V.image.width*U),wt=Math.floor(V.image.height*U);Ot.setTexture2D(V,0),B.copyTexSubImage2D(3553,Y,0,0,C.x,C.y,J,wt),St.unbindTexture()},this.copyTextureToTexture=function(C,V,Y,U=0){const J=V.image.width,wt=V.image.height,At=K.convert(Y.format),Rt=K.convert(Y.type);Ot.setTexture2D(Y,0),B.pixelStorei(37440,Y.flipY),B.pixelStorei(37441,Y.premultiplyAlpha),B.pixelStorei(3317,Y.unpackAlignment),V.isDataTexture?B.texSubImage2D(3553,U,C.x,C.y,J,wt,At,Rt,V.image.data):V.isCompressedTexture?B.compressedTexSubImage2D(3553,U,C.x,C.y,V.mipmaps[0].width,V.mipmaps[0].height,At,V.mipmaps[0].data):B.texSubImage2D(3553,U,C.x,C.y,At,Rt,V.image),U===0&&Y.generateMipmaps&&B.generateMipmap(3553),St.unbindTexture()},this.copyTextureToTexture3D=function(C,V,Y,U,J=0){if(d.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const wt=C.max.x-C.min.x+1,At=C.max.y-C.min.y+1,Rt=C.max.z-C.min.z+1,Lt=K.convert(U.format),Ut=K.convert(U.type);let Ft;if(U.isData3DTexture)Ot.setTexture3D(U,0),Ft=32879;else if(U.isDataArrayTexture)Ot.setTexture2DArray(U,0),Ft=35866;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}B.pixelStorei(37440,U.flipY),B.pixelStorei(37441,U.premultiplyAlpha),B.pixelStorei(3317,U.unpackAlignment);const Bt=B.getParameter(3314),Xt=B.getParameter(32878),Ne=B.getParameter(3316),un=B.getParameter(3315),pi=B.getParameter(32877),me=Y.isCompressedTexture?Y.mipmaps[0]:Y.image;B.pixelStorei(3314,me.width),B.pixelStorei(32878,me.height),B.pixelStorei(3316,C.min.x),B.pixelStorei(3315,C.min.y),B.pixelStorei(32877,C.min.z),Y.isDataTexture||Y.isData3DTexture?B.texSubImage3D(Ft,J,V.x,V.y,V.z,wt,At,Rt,Lt,Ut,me.data):Y.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),B.compressedTexSubImage3D(Ft,J,V.x,V.y,V.z,wt,At,Rt,Lt,me.data)):B.texSubImage3D(Ft,J,V.x,V.y,V.z,wt,At,Rt,Lt,Ut,me),B.pixelStorei(3314,Bt),B.pixelStorei(32878,Xt),B.pixelStorei(3316,Ne),B.pixelStorei(3315,un),B.pixelStorei(32877,pi),J===0&&U.generateMipmaps&&B.generateMipmap(Ft),St.unbindTexture()},this.initTexture=function(C){C.isCubeTexture?Ot.setTextureCube(C,0):C.isData3DTexture?Ot.setTexture3D(C,0):C.isDataArrayTexture||C.isCompressedArrayTexture?Ot.setTexture2DArray(C,0):Ot.setTexture2D(C,0),St.unbindTexture()},this.resetState=function(){S=0,y=0,v=null,St.reset(),vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get physicallyCorrectLights(){return console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),!this.useLegacyLights}set physicallyCorrectLights(t){console.warn("THREE.WebGLRenderer: the property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead."),this.useLegacyLights=!t}}class UM extends Uh{}UM.prototype.isWebGL1Renderer=!0;class FM extends tn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}get autoUpdate(){return console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate}set autoUpdate(t){console.warn("THREE.Scene: autoUpdate was renamed to matrixWorldAutoUpdate in r144."),this.matrixWorldAutoUpdate=t}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:fc}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=fc);var Fh=class extends EventTarget{dispatchTypedEvent(s,t){return super.dispatchEvent(t)}};class VM extends Fh{constructor(){super();Te(this,"elapsed",0);Te(this,"delta",16);Te(this,"id");requestAnimationFrame(e=>{this.tick(e)})}tick(e){this.delta=e-this.elapsed,this.elapsed=e,this.dispatchTypedEvent("tick",new CustomEvent("tick",{detail:this})),this.id=requestAnimationFrame(n=>{this.tick(n)})}dispose(){this.id!=null&&cancelAnimationFrame(this.id)}}const Mi=new VM;class zM extends Fh{constructor(){super();Te(this,"width",window.innerWidth);Te(this,"height",window.innerHeight);Te(this,"pixelRatio",Math.min(window.devicePixelRatio,2));Te(this,"abortController",new AbortController);window.addEventListener("resize",this.update.bind(this),{signal:this.abortController.signal})}update(){this.width=window.innerWidth,this.height=window.innerHeight,this.pixelRatio=Math.min(window.devicePixelRatio,2),this.dispatchTypedEvent("resize",new CustomEvent("resize",{detail:this}))}dispose(){this.abortController.abort()}}const ce=new zM;var BM=`vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

float cnoise(vec2 P){
  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
  Pi = mod(Pi, 289.0); 
  vec4 ix = Pi.xzxz;
  vec4 iy = Pi.yyww;
  vec4 fx = Pf.xzxz;
  vec4 fy = Pf.yyww;
  vec4 i = permute(permute(ix) + iy);
  vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; 
  vec4 gy = abs(gx) - 0.5;
  vec4 tx = floor(gx + 0.5);
  gx = gx - tx;
  vec2 g00 = vec2(gx.x,gy.x);
  vec2 g10 = vec2(gx.y,gy.y);
  vec2 g01 = vec2(gx.z,gy.z);
  vec2 g11 = vec2(gx.w,gy.w);
  vec4 norm = 1.79284291400159 - 0.85373472095314 * 
    vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
  g00 *= norm.x;
  g01 *= norm.y;
  g10 *= norm.z;
  g11 *= norm.w;
  float n00 = dot(g00, vec2(fx.x, fy.x));
  float n10 = dot(g10, vec2(fx.y, fy.y));
  float n01 = dot(g01, vec2(fx.z, fy.z));
  float n11 = dot(g11, vec2(fx.w, fy.w));
  vec2 fade_xy = fade(Pf.xy);
  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
  return 2.3 * n_xy;
}
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uBounce;
uniform float uMouthClosedness;

const float PI = 3.14159265;
const vec3 cameraPos = vec3(0., 1.5, 4.6);
const vec3 cameraDir = vec3(0., -0.2, -1.);
const vec3 cameraUp = vec3(0., 1., 0.);
const vec3 cameraSide = cross(cameraDir, cameraUp);

vec3 bgColor = vec3(0.8);
vec3 bodyColor = vec3(.35);
vec3 eyeColor = vec3(1.);
vec3 pupilColor = vec3(0.);

mat4 rotationMatrix(vec3 axis, float angle) {
    axis = normalize(axis);
    float s = sin(angle);
    float c = cos(angle);
    float oc = 1.0 - c;
    
    return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
                oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
                oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
                0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}

float smin( float a, float b, float k ) {
  float h = max( k-abs(a-b), 0.0 )/k;
  return min( a, b ) - h*h*k*(1.0/4.0);
}

float smax( float d1, float d2, float k ) {
  float h = clamp( 0.5 - 0.5*(d2-d1)/k, 0.0, 1.0 );
  return mix( d2, d1, h ) + k*h*(1.0-h);
}

float sdSphere( vec3 p, float s ) {
  return length(p) - s;
}

float sdCappedTorus( vec3 p, vec2 sc, float ra, float rb) {
  p.x = abs(p.x);
  float k = (sc.y*p.x>sc.x*p.y) ? dot(p.xy,sc) : length(p.xy);
  return sqrt( dot(p,p) + ra*ra - 2.0*ra*k ) - rb;
}

float sdCutSphere( vec3 p, float r, float h )
{
  float w = sqrt(r*r-h*h);
  vec2 q = vec2( length(p.xz), p.y );
  float s = max( (h-r)*q.x*q.x+w*w*(h+r-2.0*q.y), h*q.x-w*q.y );
  return (s<0.0) ? length(q)-r :
         (q.x<w) ? h - q.y     :
                   length(q-vec2(w,h));
}

float sdRoundedCylinder( vec3 p, float ra, float rb, float h ) {
  vec2 d = vec2( length(p.xz)-2.0*ra+rb, abs(p.y) - h );
  return min(max(d.x,d.y),0.0) + length(max(d,0.0)) - rb;
}

float cylinderRadiusNoise = 0.;
vec3 headPos = vec3(0.);
float bodyScale = 1.;
vec3 pupilPos = vec3(0.);

float rand(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

struct Intersect {
  float dist;
  vec3 color;
};

Intersect sdf(vec3 p) {
  float sphere = sdCutSphere(p + vec3(0., 0.4, -0.1) + headPos, 1.4, 0.4);
  float s = .6;

  float cylinder = sdRoundedCylinder(p, 1.2 + bodyScale + cylinderRadiusNoise, 0.08, .0);
  float body = smin(sphere, cylinder, 0.6);
  vec3 mouthPos = rotate(p + vec3(0., -0.7, -0.42) + headPos, vec3(0, 0, -1.), PI);
  mouthPos = rotate(mouthPos, vec3(1., 0., 0.), PI * 0.42);
  float mouth = sdCappedTorus(mouthPos, vec2(sin(s), cos(s)), .8, .04 - 0.4 * uMouthClosedness);
  float final = smax(body, -mouth, .05);
  for (float i = 0.; i < 6.; i++) {
    float rand = rand(vec2(i, 0));
    float r = rand * 30. + uTime * 0.0003 * (mod(i, 2.) - .5);
    float progress = fract(uTime * 0.0004 * mix(0.7, 1.3, rand) + rand);
    vec3 pos = vec3(sin(r), 0., cos(r)) * 1.65 * mix(0.8, 1.2, rand) + vec3(0., .05, 0.);
    float bubbleToTop = sdSphere(p + pos + vec3(0., -5., 0.) * pow(progress, 1.75), (.5 + rand) * .15 * (1.0 - smoothstep(.7, 1., progress)));
    final = smin(final, bubbleToTop, .2);
  }

  float leftEye = sdRoundedCylinder(rotate(p + vec3(-0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.06, 0.0005, 0.0005);
  float rightEye = sdRoundedCylinder(rotate(p + vec3(0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.06, 0.0005, 0.0005);

  float leftPupil = sdRoundedCylinder(rotate(p + pupilPos + vec3(-0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.03, 0.001, 0.001);
  float rightPupil = sdRoundedCylinder(rotate(p + pupilPos + vec3(0.21, -0.76, -1.) + headPos, vec3(1., 0., 0.), PI / 3.8), 0.03, 0.001, 0.001);

  final = min(rightPupil, min(leftPupil, min(rightEye, min(leftEye, final))));

  Intersect i;
  i.dist = final;
  i.color = (min(leftEye, rightEye) <= final) ? eyeColor : bodyColor;
  i.color = (min(leftPupil, rightPupil) <= final) ? pupilColor : i.color;
  i.color = mouth - .03 <= final ? pupilColor : i.color;
  return i;
}

vec3 getNormal(in vec3 p) {
  const float eps = .0001;
  const vec2 h = vec2(eps, 0);
  return normalize(vec3(
    sdf(p + h.xyy).dist - sdf(p - h.xyy).dist,
    sdf(p + h.yxy).dist - sdf(p - h.yxy).dist,
    sdf(p + h.yyx).dist - sdf(p - h.yyx).dist
  ));
}

void main() {
  float aspectRatio = uResolution.x / uResolution.y;
  vec2 m = vec2(uMouse.x * (1. / aspectRatio), uMouse.y);
  vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.x;

  vec3 lightDir = -normalize(vec3(-m.x * 2., -2.8 - m.y, -1.));
  vec3 ray = normalize(cameraSide * p.x + cameraUp * p.y + cameraDir);

  vec3 rayPos = cameraPos;
  float offsetY = 0.11 * sin(uTime * 0.002);
  cylinderRadiusNoise = cnoise(p * 3.2 + uTime * .0005) * 0.1;
  headPos = vec3(0.25 * sin(uTime * 0.0012), offsetY + uBounce, 0.15 * cos(uTime * 0.003));
  bodyScale = offsetY * .6;
  vec2 nm = length(m) > 1. ? normalize(m) : m;
  pupilPos = vec3(nm.x * -0.05, nm.y * -0.05 - .015, -.05);
  float tmp = 0.;
  float dist = 0.;
  vec3 color;
  for(int i = 0; i < 64; i++){
    rayPos = cameraPos + tmp * ray;
    Intersect result = sdf(rayPos);
    dist = result.dist;
    color = result.color;
    if (dist < 0.003 || tmp > 8.) break;
    tmp += dist;
  }

  if (dist < 0.5) {
    vec3 normal = getNormal(rayPos);
    float diffuse = clamp(dot(normal, lightDir), 0., 1.);
    float specular = pow(diffuse, 38.);
    color = color * diffuse + vec3(specular);
  } else {
    color = bgColor;
  }

  gl_FragColor = vec4(color, 1.0);
}`,GM=`void main() {
  gl_Position = vec4(position, 1.0);
}`;const WM=new Po(2,2,1,1),ma=new Zt(ce.width*ce.pixelRatio,ce.height*ce.pixelRatio),ir=new Zt;window.addEventListener("mousemove",({clientX:s,clientY:t})=>{ir.x=s/ce.width*2-1,ir.y=-(t/ce.height)*2+1});window.addEventListener("touchmove",s=>{s.preventDefault(),ir.x=s.touches[0].clientX/ce.width*2-1,ir.y=-(s.touches[0].clientY/ce.height)*2+1},{passive:!1});function Xr(s,t,e){return s+(t-s)*e}function jr(s,t){return 1-Math.pow(1-s,60*(t/1e3))}class HM{constructor(){Te(this,"mesh");Te(this,"material");Te(this,"abortController",new AbortController);Te(this,"bounceStrength",0);Te(this,"mouthClosedness",0);this.material=new hi({vertexShader:GM,fragmentShader:BM,uniforms:{uTime:{value:Mi.elapsed},uMouse:{value:ir},uResolution:{value:ma},uBounce:{value:0},uMouthClosedness:{value:0}}}),this.mesh=new Wn(WM,this.material),ce.addEventListener("resize",()=>{ma.x=ce.width*ce.pixelRatio,ma.y=ce.height*ce.pixelRatio},{signal:this.abortController.signal})}update(){this.material.uniforms.uTime.value=Mi.elapsed,this.bounceStrength=Xr(this.bounceStrength,0,jr(.2,Mi.delta)),this.material.uniforms.uBounce.value=Xr(this.material.uniforms.uBounce.value,this.bounceStrength,jr(.3,Mi.delta)),this.mouthClosedness=Xr(this.mouthClosedness,0,jr(.3,Mi.delta)),this.material.uniforms.uMouthClosedness.value=Xr(this.material.uniforms.uMouthClosedness.value,this.mouthClosedness,jr(.8,Mi.delta))}bounce(){this.bounceStrength=.225}openMouth(){this.mouthClosedness=.4}dispose(){this.material.dispose(),this.abortController.abort()}}const Io=new HM;let Yr=!1;var tu;(tu=document.querySelector("button"))==null||tu.addEventListener("click",async s=>{await p_(),Yr=!Yr,Yr?(qM.start(),jM.start(),$M.start(),Pa.start()):Pa.stop(),s.target.textContent=Yr?"♪ Stop":"♪ Play"});function D(s,t){return{note:s,duration:t}}const Vs=new li({volume:-8,oscillator:{type:"fmsquare8"}}).toDestination(),qM=new xs((s,t)=>{if(!t)return;const{note:e,duration:n}=t;Vs.triggerAttackRelease(e,ac(n).toSeconds()/2.5,s),hh.schedule(()=>{Io.openMouth()},s)},[[D("E4","8t"),D("E4","8t"),D("E4","8t")],D("A4","4n."),[null,[null,D("B4","16t"),D("C5","16t")]],D("B4","4n."),[null,[null,D("C5","16t"),D("D5","16t")]],D("C5","4n."),[null,[null,D("B4","16t"),D("A4","16t")]],D("B4","8n"),[D("E4","8n"),null,D("E4","8n")],[D("A4","8t"),D("C#5","8t"),D("E5","8t")],D("G5","2n"),null,[D("G5","8t"),D("F5","8t"),D("E5","8t")],D("D5","2n."),null,null,[D("D5","8t"),D("D5","8t"),D("E5","8t")],D("F5","2n."),null,null,[D("B4","8t"),D("E5","8t"),D("D5","8t")],D("C5","2n."),null,null,[D("C5","8t"),D("C5","8t"),D("E5","8t")],D("D5","4n"),[D("A4","8t"),D("A4","8t"),D("A4","8t")],D("A4","4n"),D("C5","4n"),D("C5","2n"),null,D("B4","4n"),D("E5","4n"),D("F5","2n."),null,null,D("A4","4n"),D("B4","2n"),null,[null,null,D("A5","8t")],[D("G5","4t"),null,D("F5","8t")],D("E5","2n."),null,null,D("G4","4n"),D("A4","2n."),null,[null,null,D("B4","8t")],[D("C5","4t"),null,D("D5","8t")],[D("E5","8t"),D("C5","8t"),D("C5","8t")],[D("D5","8t"),null,D("C5","8t")],[D("E5","8t"),D("C5","8t"),D("C5","8t")],[D("D5","8t"),null,D("C5","8t")],[D("E5","8t"),D("C5","8t"),D("C5","8t")],[D("D5","8t"),null,D("C5","8t")],[D("A5","8t"),D("C5","8t"),D("C5","8t")],[D("D5","8t"),null,D("C5","8t")],[D("C5","8t"),null,D("C5","8t")],D("B4","4n"),[D("B4","8t"),null,D("B4","8t")],D("A4","4n"),[D("A4","8t"),null,D("A4","8t")],D("G4","4n"),[D("G4","8t"),null,D("G4","8t")],D("F4","4n"),D("E4","4n."),[null,[null,D("E4","16t"),D("E4","16t")]],D("E4","4n."),[null,[null,D("E4","16t"),D("E4","16t")]],D("E4","4n."),[null,[null,D("E4","16t"),D("E4","16t")]],D("E4","8n")]),XM=new li({volume:-10,oscillator:{type:"fmsquare8"},envelope:{attack:Vs.envelope.attack,decay:Vs.envelope.decay,sustain:Vs.envelope.sustain,release:Vs.envelope.release}}).toDestination(),jM=new xs((s,t)=>{if(!t)return;const{note:e,duration:n}=t;XM.triggerAttackRelease(e,ac(n).toSeconds()/2.5,s)},[null,D("C4","4n"),D("C4","4n"),D("E4","4n"),D("E4","4n"),D("E4","4n"),D("E4","4n"),D("E4","4n"),D("D4","4n"),D("C#4","4n"),D("D4","4n"),D("E4","4n"),D("C#4","4n"),[D("F4","8n"),[D("A4","16t"),D("A4","16t"),D("A4","16t")]],[D("Bb4","8t"),D("Bb4","8t"),D("Bb4","8t")],[D("B4","8t"),D("B4","8t"),D("B4","8t")],[D("Bb4","8t"),D("Bb4","8t"),D("Bb4","8t")],D("A4","2n."),null,null,D("G#4","4n"),D("E4","2n."),null,null,[D("E4","8t"),D("E4","8t"),D("G4","8t")],D("A4","4n"),[D("D4","8t"),D("D4","8t"),D("D4","8t")],D("F#4","4n"),D("F#4","4n"),D("F4","2n"),null,D("E4","4n"),D("G#4","4n"),null,[D("A3","8t"),D("A3","8t"),D("A3","8t")],D("A3","4n"),null,null,[D("D4","8t"),D("D4","8t"),D("D4","8t")],[D("D4","4n"),null,D("F4","8t")],[D("E4","8n"),null,D("D4","8t")],D("C4","4n"),[D("G3","8t"),D("G3","8t"),D("G3","8t")],D("G3","4n"),null,null,[D("C4","8t"),D("C4","8t"),D("C4","8t")],D("C4","4n"),null,D("A4","2n"),null,D("Ab4","2n"),null,D("G4","2n"),null,D("Gb4","2n"),null,D("F4","2n"),null,D("E4","2n"),null,D("Eb4","2n"),null,D("D4","2n"),null,null,D("B3","4n"),null,D("B3","4n"),null,D("B3","4n"),D("B3","4n")]),YM=new li({volume:-4,oscillator:{type:"triangle"}}).toDestination(),$M=new xs((s,t)=>{if(!t)return;const{note:e,duration:n}=t;YM.triggerAttackRelease(e,ac(n).toSeconds()/2,s),hh.schedule(()=>{Io.bounce()},s)},[null,D("A2","4n"),D("A3","4n"),D("G#3","4n"),D("G#2","4n"),D("A2","4n"),D("A3","4n"),D("G#3","4n"),D("G#2","4n"),D("A2","4n"),D("B2","4n"),D("C#3","4n"),D("A2","4n"),[D("D3","4n"),[D("F4","16t"),D("F4","16t"),D("F4","16t")]],[D("F4","8t"),D("F4","8t"),D("F4","8t")],[D("F4","8t"),D("F4","8t"),D("F4","8t")],[D("F4","8t"),D("F4","8t"),D("F4","8t")],D("B3","4n"),D("D4","4n"),D("D3","4n"),D("E3","4n"),D("A2","4n"),D("A3","4n"),D("G3","4n"),D("G3","4n"),D("F#3","4n"),D("F#3","4n"),D("D3","4n"),D("D3","4n"),D("G3","4n"),D("G3","4n"),D("G#3","4n"),D("E3","4n"),null,[D("D3","8t"),D("D3","8t"),D("D3","8t")],D("D3","4n"),null,null,[D("G3","8t"),D("G3","8t"),D("G3","8t")],D("G3","4n"),null,null,[D("C3","8t"),D("C3","8t"),D("C3","8t")],D("C3","4n"),null,null,[D("F3","8t"),D("F3","8t"),D("F3","8t")],D("F3","4n"),null,D("F#4","2n"),null,D("F4","2n"),null,D("E4","2n"),null,D("Eb4","2n"),null,D("D4","2n"),null,D("C#4","2n"),null,D("C4","2n"),null,D("B3","2n"),null,null,D("A3","4n"),null,D("G#3","4n"),null,D("A3","4n"),D("G#3","4n")]);Pa.bpm.value=60;const ga=1e3;class ZM{constructor(){Te(this,"camera");this.camera=this.createCamera()}createCamera(){const t=new on(this.calcFov(),ce.width/ce.height,.1,ga*2);return t.position.z=ga,t}calcFov(){const{height:t}=ce,n=t/2/ga;return Math.atan(n)*2*(180/Math.PI)}resize(){this.camera.fov=this.calcFov(),this.camera.aspect=ce.width/ce.height,this.camera.updateProjectionMatrix()}}const Ql=new ZM;class KM{constructor(){Te(this,"canvas",document.createElement("canvas"));Te(this,"renderer",new Uh({canvas:this.canvas}));Te(this,"scene",new FM);this.initCanvas(),this.resize()}initCanvas(){this.canvas.style.display="block",document.body.appendChild(this.canvas)}resize(){Ql.resize(),this.renderer.setSize(ce.width,ce.height),this.renderer.setPixelRatio(ce.pixelRatio)}update(){this.renderer.render(this.scene,Ql.camera)}dispose(){this.renderer.dispose(),this.canvas.remove()}}const gc=new KM;ce.addEventListener("resize",JM);Mi.addEventListener("tick",QM);gc.scene.add(Io.mesh);function JM(){gc.resize()}function QM(){Io.update(),gc.update()}
