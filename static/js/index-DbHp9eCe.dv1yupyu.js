import"./index-BLx-SiXw.btq8m3t9.js";import{C as l,G as _}from"./cosmwasm-OHcxD9uL.nivyhs4o.js";import{T as o,h as w,F as C}from"./unsignedTransaction-klyxzttV.nmpbm1a4.js";import{l as f,F as c,a7 as A,cg as b,a2 as a,ca as W,cb as x,bN as y,bT as E,ab as $}from"./Bridge.h4n5wvxp.js";import"./index.b6958rkx.js";import"./vue.b07x8a6i.js";import"./lodash-es.bp0zmem9.js";import"./axios.i01mok01.js";import"./dayjs.pb8a0t5b.js";import"./vuex.mhvm3vav.js";import"./vue-router.br17c2da.js";import"./svg-icons.nc57d0by.js";import"./pako.esm-lVs1CJLi.i08ikdwa.js";import"./pbkdf2-GOwpKNWv.hkdcir5p.js";import"./index-hiyXKwf7.o1tmoqak.js";import"./index-8PG1lc1N.gd4qy2bx.js";import"./utils-pv08uqEp.cz42hbtx.js";import"./index-Dtqiiobd.b9amm3kf.js";var q=Object.defineProperty,D=(h,t,e)=>t in h?q(h,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):h[t]=e,d=(h,t,e)=>D(h,typeof t!="symbol"?t+"":t,e);class k{constructor(t,e,r,n){d(this,"network"),d(this,"chain"),d(this,"rpc"),d(this,"contracts"),d(this,"tokenBridge"),d(this,"translator"),this.network=t,this.chain=e,this.rpc=r,this.contracts=n;const s=this.contracts.tokenBridge;if(!s)throw new Error(`Wormhole Token Bridge contract for domain ${e} not found`);if(this.tokenBridge=s,this.translator=this.contracts.translator,this.translator!==void 0&&this.translator==="")throw new Error("Translator address may be undefined but not empty string")}static async fromRpc(t,e){const[r,n]=await l.chainFromRpc(t),s=e[n];if(s.network!==r)throw new Error(`Network mismatch: ${s.network} != ${r}`);return new k(r,n,t,e[n].contracts)}async isWrappedAsset(t){try{return await this.getOriginalAsset(t),!0}catch{}return!1}async hasWrappedAsset(t){try{return await this.getWrappedAsset(t),!0}catch{}return!1}async getWrappedAsset(t){if(t.chain===this.chain)throw new Error(`Expected foreign chain, got ${t.chain}`);if(f(t.address))throw new Error("Native asset cannot be a wrapped asset");const e=c.encode(t.address.toUniversalAddress().toUint8Array()),{address:r}=await this.rpc.queryContractSmart(this.tokenBridge,{wrapped_registry:{chain:A(t.chain),address:e}});return b(this.chain,r)}async getOriginalAsset(t){let e=new a(t);e.denomType==="factory"&&(e=_.factoryToCw20(e));const r=await this.rpc.queryContractSmart(e.toString(),{wrapped_asset_info:{}}),n=W(r.asset_chain),s=c.decode(r.asset_address);return{chain:n,address:new x(new Uint8Array(s))}}async getTokenUniversalAddress(t){return new a(t).toUniversalAddress()}async getTokenNativeAddress(t,e){return new a(e).toNative()}async isTransferCompleted(t){const e=c.encode(y(t));return(await this.rpc.queryContractSmart(this.tokenBridge,{is_vaa_redeemed:{vaa:e}})).is_redeemed}async*createAttestation(t,e){if(!e)throw new Error("Payer required to create attestation");const r=new a(t).toString(),n=new a(e).toString(),s=0,m=f(t)?{native_token:{denom:l.getNativeDenom(this.network,this.chain)}}:{token:{contract_addr:r}};yield this.createUnsignedTx({msgs:[o(n,this.tokenBridge,{create_asset_meta:{asset_info:m,nonce:s}})],fee:w(this.network,this.chain),memo:"Wormhole - Create Attestation"},"TokenBridge.createAttestation")}async*submitAttestation(t,e){if(!e)throw new Error("Payer required to submit attestation");const r=new a(e).toString();yield this.createUnsignedTx({msgs:[o(r,this.tokenBridge,{submit_vaa:{data:y(t)}})],fee:w(this.network,this.chain),memo:"Wormhole - Submit Attestation"},"TokenBridge.submitAttestation")}async*transfer(t,e,r,n,s){const m=Math.round(Math.random()*1e5),B="0",S=A(e.chain),U=c.encode(e.address.toUniversalAddress().toUint8Array()),N=l.getNativeDenom(this.network,this.chain),u=f(r);let i=u?N:r.toString();i.startsWith("factory")&&(i=_.factoryToCw20(new a(i)).toString());const p=new a(t).toString(),v=g=>{const T={asset:{amount:n.toString(),info:g},recipient_chain:S,recipient:U,fee:B,nonce:m};return s?{initiate_transfer_with_payload:{...T,payload:c.encode(s)}}:{initiate_transfer:T}};if(u){const g=[o(p,this.tokenBridge,{deposit_tokens:{}},[{amount:n.toString(),denom:i}]),o(p,this.tokenBridge,v({native_token:{denom:i}}))];yield this.createUnsignedTx({msgs:g,fee:w(this.network,this.chain),memo:"Wormhole - Initiate Native Transfer"},"TokenBridge.transferNative")}else{const g=[o(p,i,{increase_allowance:{spender:this.tokenBridge,amount:n.toString(),expires:{never:{}}}}),o(p,this.tokenBridge,v({token:{contract_addr:i}}),[{amount:n.toString(),denom:i}])];yield this.createUnsignedTx({msgs:g,fee:w(this.network,this.chain),memo:"Wormhole - Initiate Transfer"},"TokenBridge.transfer")}}async*redeem(t,e,r=!0){const n=c.encode(y(e)),s=new a(t).toString(),m=this.translator&&new a(this.translator).toUniversalAddress().equals(e.payload.to.address)?o(s,this.translator,{complete_transfer_and_convert:{vaa:n}}):o(s,this.tokenBridge,{submit_vaa:{data:n}});yield this.createUnsignedTx({msgs:[m],fee:w(this.network,this.chain),memo:"Wormhole - Complete Transfer"},"TokenBridge.redeem")}async parseTransactionDetails(t){throw new Error("Not implemented")}async getWrappedNative(){return b(this.chain,l.getNativeDenom(this.network,this.chain))}createUnsignedTx(t,e,r=!1){return new C(t,this.network,this.chain,e,r)}}E($,"TokenBridge",k);export{k as CosmwasmTokenBridge};