import{C as d}from"./cosmwasm-OHcxD9uL.onexuz19.js";import{cN as p,cb as l,t as h,bT as w,ab as u}from"./Bridge.lzhc31h3.js";import"./index.h3lt6w5e.js";import"./vue.ij1rt9yd.js";import"./lodash-es.bp0zmem9.js";import"./axios.i01mok01.js";import"./dayjs.pb8a0t5b.js";import"./swiper.jxnsts7f.js";import"./vuex.i01hmc51.js";import"./vue-router.ii2ni9cp.js";import"./svg-icons.nc57d0by.js";import"./pako.esm-lVs1CJLi.lfavptyy.js";import"./pbkdf2-GOwpKNWv.gdwk31q4.js";import"./index-hiyXKwf7.iyrp3opy.js";import"./index-8PG1lc1N.k1lk5lc8.js";import"./utils-pv08uqEp.gxvxacxx.js";import"./index-Dtqiiobd.b9amm3kf.js";var g=Object.defineProperty,f=(i,e,r)=>e in i?g(i,e,{enumerable:!0,configurable:!0,writable:!0,value:r}):i[e]=r,m=(i,e,r)=>f(i,typeof e!="symbol"?e+"":e,r);class a{constructor(e,r,o,t){m(this,"network"),m(this,"chain"),m(this,"rpc"),m(this,"contracts"),m(this,"coreAddress"),this.network=e,this.chain=r,this.rpc=o,this.contracts=t;const s=this.contracts.coreBridge;if(!s)throw new Error(`Wormhole Token Bridge contract for domain ${r} not found`);this.coreAddress=s}getGuardianSet(e){throw new Error("Method not implemented.")}getGuardianSetIndex(){throw new Error("Method not implemented.")}getMessageFee(){throw new Error("Method not implemented.")}static async fromRpc(e,r){const[o,t]=await d.chainFromRpc(e),s=r[t];if(s.network!==o)throw new Error(`Network mismatch: ${s.network} != ${o}`);return new a(o,t,e,s.contracts)}async*publishMessage(e,r,o,t){throw new Error("Method not implemented.")}async*verifyMessage(e,r){throw new Error("Not implemented.")}async parseTransaction(e){const r=await this.rpc.getTx(e);if(!r)throw new Error("No transaction found for txid: "+e);return[a.parseWormholeMessageId(this.chain,this.coreAddress,r)]}async parseMessages(e){const r=await this.rpc.getTx(e);if(!r)throw new Error("No transaction found for txid: "+e);return[a.parseWormholeMessage(this.chain,this.coreAddress,r)]}static parseWormholeMessage(e,r,o){const t=o.events.filter(n=>n.type==="wasm"&&n.attributes[0].key==="_contract_address"&&n.attributes[0].value===r);if(t.length===0)throw new Error("No wormhole message found in tx");t.length>1&&console.error(`Expected single message, found ${t.length}`);const[s]=t,c=Object.fromEntries(s.attributes.map(n=>[n.key.split(".")[1],n.value]));return p("Uint8Array",{emitterChain:e,emitterAddress:new l(h.decode(c.sender)),sequence:BigInt(c.sequence),guardianSet:0,timestamp:Number(c.block_time),consistencyLevel:0,nonce:Number(c.nonce),signatures:[],payload:h.decode(c.message)})}static parseWormholeMessageId(e,r,o){const t=a.parseWormholeMessage(e,r,o);return{chain:t.emitterChain,emitter:t.emitterAddress,sequence:t.sequence}}}w(u,"WormholeCore",a);export{a as CosmwasmWormholeCore};