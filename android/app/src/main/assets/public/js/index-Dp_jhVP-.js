const __vite__fileDeps=["js/_...not-found_-CFqlel_P.js","js/.pnpm-DxDKAttv.js","css/.pnpm-BjDruDbT.css","js/dashboard-BjO3EwUz.js","js/icon-button-slDc6r85.js","js/fingerprint-C5ykFyRZ.js","js/_id_-BO60Ww_J.js","css/_id_-BzEb2zE4.css","js/index-UrwNHX1w.js","js/index-K0DMfKNr.js","js/login-DbHPeUXc.js","js/qr-code-B-brESzX.js","js/register-Bj8ipXxN.js","js/index-DdhKO-Zm.js","js/index-B_L2ibVa.js","js/index-1m0elbBU.js","js/index-0yFlrKrV.js","js/index-vUQEDGN6.js","js/index-BfEGcJmv.js","js/index-DaKiGZGV.js","js/index-Blu_N8_i.js","js/index-qhtlDi8Q.js","js/index-unKl5FPN.js","js/index-BLiC-gVP.js","js/index-JAaXdYZ0.js","js/index-C730rkYH.js","js/index-DZWHrpeT.js"],__vite__mapDeps=i=>i.map(i=>__vite__fileDeps[i]);
import{_ as e,i as t,B as s,c as a,d as n,p as i,a as r,j as l,N as c,$ as o,b as d,u,e as m,r as p,f as h,g as _,R as g,F as j,h as f,A as x,k as E,z as y,l as v,C as S,m as b,n as z,o as P,q as I}from"./.pnpm-DxDKAttv.js";!function(){const e=document.createElement("link").relList;if(!(e&&e.supports&&e.supports("modulepreload"))){for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver((e=>{for(const s of e)if("childList"===s.type)for(const e of s.addedNodes)"LINK"===e.tagName&&"modulepreload"===e.rel&&t(e)})).observe(document,{childList:!0,subtree:!0})}function t(e){if(e.ep)return;e.ep=!0;const t=function(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),"use-credentials"===e.crossOrigin?t.credentials="include":"anonymous"===e.crossOrigin?t.credentials="omit":t.credentials="same-origin",t}(e);fetch(e.href,t)}}();const T=750;var k=(e=>(e.LIGHT="light",e.DARK="dark",e))(k||{}),O=(e=>(e[e.Unauthorized=401]="Unauthorized",e))(O||{}),A=(e=>(e.EN="en",e.ZH="zh",e.TC="tc",e))(A||{});const N=[{code:A.ZH,name:"中文"},{code:A.EN,name:"English"},{code:A.TC,name:"繁體中文"}].map((e=>e.code));(async()=>{const a=await Promise.all(N.map((async t=>{const s=await((e,t,s)=>{const a=e[t];return a?"function"==typeof a?a():Promise.resolve(a):new Promise(((e,a)=>{("function"==typeof queueMicrotask?queueMicrotask:setTimeout)(a.bind(null,new Error("Unknown variable dynamic import: "+t+(t.split("/").length!==s?". Note that variables only represent file names one level deep.":""))))}))})(Object.assign({"./locales/en.json":()=>e((()=>import("./en-xYtMZHu9.js")),[]),"./locales/tc.json":()=>e((()=>import("./tc-CBq18Bgs.js")),[]),"./locales/zh.json":()=>e((()=>import("./zh-CFidZPQ1.js")),[])}),`./locales/${t}.json`,3);return{[t]:{translation:s.default}}}))).then((e=>e.reduce(((e,t)=>Object.assign(e,t)),{})));t.use(s).init({detection:{lookupLocalStorage:"COSS_LANG"},resources:a,fallbackLng:"zh",interpolation:{escapeValue:!1}})})();const L=t.t,R=getComputedStyle(document.documentElement).getPropertyValue("--primary"),V={theme:k.LIGHT,themeColor:`hsl(${R})`,lang:"zh",lastDialogId:0,historyEmoji:[]},w=(e,t)=>({init:async()=>{const e=t();console.log("🚀 ~ 当前主题",e.theme)},update:async t=>e(t)}),D=a(n(i(((e,t)=>({...V,...w(e,t)})),{name:"COSS_COMMON_STORE",storage:r((()=>localStorage))}))),U=()=>l.jsx(l.Fragment,{children:L("loading...")}),C=o.lazy((()=>e((()=>import("./_...not-found_-CFqlel_P.js")),__vite__mapDeps([0,1,2])))),q=o.lazy((()=>e((()=>import("./dashboard-BjO3EwUz.js")),__vite__mapDeps([3,1,2,4,5])))),M=o.lazy((()=>e((()=>import("./_id_-BO60Ww_J.js")),__vite__mapDeps([6,1,2,4,7])))),G=o.lazy((()=>e((()=>import("./index-UrwNHX1w.js")),__vite__mapDeps([8,1,2])))),$=o.lazy((()=>e((()=>import("./index-K0DMfKNr.js")),__vite__mapDeps([9,1,2])))),H=o.lazy((()=>e((()=>import("./login-DbHPeUXc.js")),__vite__mapDeps([10,1,2,5])))),F=o.lazy((()=>e((()=>import("./qr-code-B-brESzX.js")),__vite__mapDeps([11,1,2])))),B=o.lazy((()=>e((()=>import("./register-Bj8ipXxN.js")),__vite__mapDeps([12,1,2])))),K=o.lazy((()=>e((()=>import("./index-DdhKO-Zm.js")),__vite__mapDeps([13,1,2])))),Z=o.lazy((()=>e((()=>import("./index-B_L2ibVa.js")),__vite__mapDeps([14,1,2])))),Q=o.lazy((()=>e((()=>import("./index-1m0elbBU.js")),__vite__mapDeps([15,1,2])))),J=o.lazy((()=>e((()=>import("./index-0yFlrKrV.js")),__vite__mapDeps([16,1,2])))),W=o.lazy((()=>e((()=>import("./index-vUQEDGN6.js")),__vite__mapDeps([17,1,2])))),X=o.lazy((()=>e((()=>import("./index-BfEGcJmv.js")),__vite__mapDeps([18,1,2])))),Y=o.lazy((()=>e((()=>import("./index-DaKiGZGV.js")),__vite__mapDeps([19,1,2])))),ee=o.lazy((()=>e((()=>import("./index-Blu_N8_i.js")),__vite__mapDeps([20,1,2])))),te=o.lazy((()=>e((()=>import("./index-qhtlDi8Q.js")),__vite__mapDeps([21,1,2])))),se=o.lazy((()=>e((()=>import("./index-unKl5FPN.js")),__vite__mapDeps([22,1,2])))),ae=o.lazy((()=>e((()=>import("./index-BLiC-gVP.js")),__vite__mapDeps([23,1,2])))),ne=o.lazy((()=>e((()=>import("./index-JAaXdYZ0.js")),__vite__mapDeps([24,1,2])))),ie=o.lazy((()=>e((()=>import("./index-C730rkYH.js")),__vite__mapDeps([25,1,2])))),re=o.lazy((()=>e((()=>import("./index-DZWHrpeT.js")),__vite__mapDeps([26,1,2])))),le=[{caseSensitive:!1,path:"*",element:o.createElement(C)},{caseSensitive:!1,path:"dashboard",element:o.createElement(q),children:[{caseSensitive:!1,path:":id",element:o.createElement(M)},{caseSensitive:!1,path:"",element:o.createElement(G)}]},{caseSensitive:!1,path:"/",element:o.createElement((()=>l.jsx(c,{to:"/dashboard",replace:!0})))},{caseSensitive:!1,path:"account",children:[{caseSensitive:!1,path:"",element:o.createElement($)},{caseSensitive:!1,path:"login",element:o.createElement(H)},{caseSensitive:!1,path:"qr-code",element:o.createElement(F)},{caseSensitive:!1,path:"register",element:o.createElement(B)}]},{caseSensitive:!1,path:"back-list",children:[{caseSensitive:!1,path:"",element:o.createElement(K)}]},{caseSensitive:!1,path:"chat",children:[{caseSensitive:!1,path:"",element:o.createElement(Z)}]},{caseSensitive:!1,path:"contact",children:[{caseSensitive:!1,path:"",element:o.createElement(Q)}]},{caseSensitive:!1,path:"messages",children:[{caseSensitive:!1,path:"",element:o.createElement(J)}]},{caseSensitive:!1,path:"profile",children:[{caseSensitive:!1,path:"",element:o.createElement(W)}]},{caseSensitive:!1,path:"request-list",children:[{caseSensitive:!1,path:"",element:o.createElement(X)}]},{caseSensitive:!1,path:"group",children:[{caseSensitive:!1,path:"create",children:[{caseSensitive:!1,path:"",element:o.createElement(Y)}]},{caseSensitive:!1,path:"info",children:[{caseSensitive:!1,path:"",element:o.createElement(ee)}]},{caseSensitive:!1,path:"notice",children:[{caseSensitive:!1,path:"",element:o.createElement(te)}]},{caseSensitive:!1,path:"qrcode",children:[{caseSensitive:!1,path:"",element:o.createElement(se)}]}]},{caseSensitive:!1,path:"user",children:[{caseSensitive:!1,path:"add",children:[{caseSensitive:!1,path:"",element:o.createElement(ae)}]},{caseSensitive:!1,path:"info",children:[{caseSensitive:!1,path:"",element:o.createElement(ne)}]},{caseSensitive:!1,path:"qrcode",children:[{caseSensitive:!1,path:"",element:o.createElement(ie)}]},{caseSensitive:!1,path:"set-id",children:[{caseSensitive:!1,path:"",element:o.createElement(re)}]}]}];console.log("PGP Ready...");const ce="https://coss.gezi.vip/api/v1",oe="wss://coss.gezi.vip/api/v1/push/ws",de={id:"1",baseUrl:ce,wsUrl:oe,remark:"生产环境"},ue=a(n(i((e=>({config:de,historyUrls:[{id:"1",baseUrl:"https://coss.gezi.vip/api/v1",wsUrl:"wss://coss.gezi.vip/api/v1/push/ws",remark:"测试环境"},{id:"2",baseUrl:ce,wsUrl:oe,remark:"生产环境"}],update:t=>e(t),pushHistory:(t,s,a)=>{e((e=>{const n=e.historyUrls.filter((e=>e.baseUrl!==t&&e.wsUrl!==s));return n.unshift({id:Date.now().toString(),baseUrl:t,wsUrl:s,remark:a}),{historyUrls:n}}))},deleteHistory:t=>{e((e=>({historyUrls:e.historyUrls.filter((e=>e.id!==t))})))}})),{name:"COSS_REQUEST_STORE",storage:r((()=>localStorage))}))),me={timeout:5e4,headers:{"Content-Type":"application/json;charset=UTF-8"}},pe=d.create(me);d.create(me),pe.interceptors.request.use((async e=>{const t=ue.getState();e.baseURL=t.config.baseUrl;const s=je.getState().token;return s&&(e.headers.Authorization="Bearer "+s),e}),(e=>Promise.reject(e))),pe.interceptors.response.use((async e=>{if((e.data.code||200)===O.Unauthorized)console.log("登录过期");return e.data}),(e=>e.response&&401===e.response.status?(je().update({userId:"",userInfo:"",token:""}),location.reload(),Promise.reject(e)):Promise.reject(e)));const he="/user";const _e={userId:"",userInfo:null,token:""},ge=e=>({update:async t=>e(t),login:async t=>{try{const{code:s,data:a}=await function(e){return pe({url:`${he}/login`,method:"POST",data:e})}(t);return console.log(s,a),200===s?(e({userId:a.user_info.user_id,userInfo:a.user_info,token:a.token}),Promise.resolve(a)):Promise.reject(a)}catch(s){return console.log("错误",s),Promise.reject(s)}},logout:async t=>{try{const{code:e,data:s}=await function(e){return pe({url:`${he}/logout`,method:"POST",data:e})}(t);return console.log(e,s),200===e?Promise.resolve(s):Promise.reject(s)}catch(s){return console.log("错误",s),Promise.reject(s)}finally{e({userId:"",userInfo:null,token:""})}}}),je=a(n(i((e=>({..._e,...ge(e)})),{name:"COSS_USER_STORE",storage:r((()=>localStorage))})));function fe(){const[e,t]=p.useState(!1),{width:s,height:a}=h();return p.useEffect((()=>{t(s<=750)}),[s]),{isMobile:e,width:s,height:a}}const xe={callId:"",callType:"",callStatus:"",isVideo:!1,isAudio:!1,isGroup:!1},Ee=(e,t)=>({update:async t=>e(t),create:function(e,s,a,n,i){console.log("create",e,s,a,n,i);const{update:r}=t();return r({isAudio:!a,isVideo:a}),Promise.resolve({code:200,data:{callId:e,callType:s,isVideo:a,isAudio:n,isGroup:i},msg:"success"})},join:function(e,s,a,n,i){console.log("join",e,s,a,n,i);const{update:r}=t();return r({isAudio:!a,isVideo:a}),Promise.resolve({code:0,data:{callId:"123",callType:"video",isVideo:!0,isAudio:!0,isGroup:!0},msg:"success"})},leave:function(){console.log("leave");const{update:e}=t();return e({callId:"",callType:"",callStatus:"",isVideo:!1,isAudio:!1,isGroup:!1}),Promise.resolve({code:0,data:{},msg:"success"})},reject:function(){console.log("reject");const{update:e}=t();return e({callId:"",callType:"",callStatus:"",isVideo:!1,isAudio:!1,isGroup:!1}),Promise.resolve({code:0,data:{},msg:"success"})},hangup:function(){console.log("hangup");const{update:e}=t();return e({callId:"",callType:"",callStatus:"",isVideo:!1,isAudio:!1,isGroup:!1}),Promise.resolve({code:0,data:{},msg:"success"})}}),ye=a(n(i(((e,t)=>({...xe,...Ee(e,t)})),{name:"COSS_CALL_STORE",storage:r((()=>localStorage))}))),ve=p.memo((()=>{const{isMobile:e}=fe(),t=ye(),s=p.useMemo((()=>t.isAudio||t.isVideo),[t.isAudio,t.isVideo]),a=p.useMemo((()=>"connected"===t.callStatus),[t.callStatus]),n=p.useMemo((()=>!1),[t.isVideo]),[i,r]=p.useState(!1),[c,o]=p.useState("");return p.useEffect((()=>(o("https://gw.alipayobjects.com/zos/antfincdn/LlvErxo8H9/photo-1503185912284-5271ff81b9a8.webp"),()=>{o("")})),[]),l.jsxs(l.Fragment,{children:[l.jsx("div",{className:_("size-14 text-white bg-black bg-opacity-40 flex justify-center items-center rounded-sm fixed top-1/3 right-0 z-[9999]",s&&i?"block":"hidden"),onClick:()=>r(!1),children:l.jsx(g,{className:"text-2xl"})}),l.jsx("div",{className:_("w-screen h-screen text-white bg-black bg-opacity-40 fixed top-0 left-0 z-[9999]",s&&!i?"block":"hidden"),children:l.jsxs(j,{className:_("relative p-4 rounded-sm top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 backdrop-blur overflow-hidden",e?"w-full h-full":"w-[400px] h-[600px]"),style:{backgroundColor:c?"#000":"#fff",color:c?"white":"black"},vertical:!0,justify:"flex-start",align:"center",children:[c&&l.jsx("div",{className:"absolute inset-0 z-0",style:{backgroundImage:`url(${c})`,backgroundSize:"cover",backgroundPosition:"center",backgroundRepeat:"no-repeat",filter:"blur(20px)"}}),l.jsxs(j,{className:"w-full h-full z-10",vertical:!0,justify:"center",align:"center",children:[l.jsxs(j,{className:"w-full font-bold",justify:"space-between",children:[l.jsx("div",{className:"flex-1",children:l.jsx(f,{onClick:()=>r(!0)})}),l.jsx("div",{className:"",children:"00:00"}),l.jsx("div",{className:"flex-1"})]}),l.jsxs(j,{className:"flex-1 font-bold gap-2",vertical:!0,justify:"center",children:[l.jsx(x,{size:120,src:c}),l.jsx("span",{className:"text-xl text-center",children:"ff1005"})]}),l.jsx(j,{className:"gap-[50px]",children:a?l.jsxs(l.Fragment,{children:[l.jsxs(j,{className:"gap-2",vertical:!0,align:"center",onClick:()=>t.hangup(),children:[l.jsx(j,{className:"size-16 text-2xl bg-red-500 rounded-full rotate-[-135deg]",justify:"center",children:l.jsx(g,{})}),l.jsx("span",{className:"text-sm",children:L("静音")})]}),l.jsxs(j,{className:"gap-2",vertical:!0,align:"center",onClick:()=>t.hangup(),children:[l.jsx(j,{className:"size-16 text-2xl bg-red-500 rounded-full rotate-[-135deg]",justify:"center",children:l.jsx(g,{})}),l.jsx("span",{className:"text-sm",children:L("挂断")})]}),l.jsxs(j,{className:"gap-2",vertical:!0,align:"center",onClick:()=>t.hangup(),children:[l.jsx(j,{className:"size-16 text-2xl bg-white rounded-full rotate-[-135deg]",justify:"center",children:l.jsx(g,{className:"text-gray-500"})}),l.jsx("span",{className:"text-sm",children:L("扬声器")})]})]}):l.jsxs(l.Fragment,{children:[l.jsxs(j,{className:"gap-2",vertical:!0,align:"center",onClick:()=>t.hangup(),children:[l.jsx(j,{className:"size-16 text-2xl bg-red-500 rounded-full rotate-[-135deg]",justify:"center",children:l.jsx(g,{})}),l.jsx("span",{className:"text-sm",children:L("拒绝")})]}),l.jsxs(j,{className:"gap-2",vertical:!0,align:"center",onClick:()=>t.join(`${Date.now()}`,n?"video":"audio",n,!n,!1),children:[l.jsx(j,{className:"size-16 text-2xl bg-green-500 rounded-full",justify:"center",children:l.jsx(g,{})}),l.jsx("span",{className:"text-sm",children:L("接通")})]})]})})]})]})})]})})),Se=p.memo((()=>{const e=D(),[t,s]=p.useState(E);return p.useEffect((()=>{"zh-CN"!==localStorage.getItem("locale")?(s(y),v.locale("zh-cn")):(s(E),v.locale("en"))}),[]),function(){const e=je(),t=u(),s=m();p.useEffect((()=>{if(e.token)t.pathname.includes("account")&&s("/dashboard",{replace:!0});else{if(t.pathname.includes("account"))return;s("/account/login",{replace:!0})}}),[e.token,t])}(),l.jsx(S,{theme:{token:{colorPrimary:e.themeColor,borderRadius:4,fontSize:16}},locale:t,children:l.jsxs(b,{children:[l.jsx(p.Suspense,{fallback:l.jsx(U,{}),children:z(le)}),l.jsx(ve,{})]})})}));P.createRoot(document.getElementById("root")).render(l.jsx(p.StrictMode,{children:l.jsx(I,{children:l.jsx(Se,{})})}));export{L as $,T as S,k as T,D as a,fe as b,ye as c,je as u};
