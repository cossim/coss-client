import{r as e,j as t,M as s,I as a,S as l,D as n,t as r,A as i,v as o,w as c,x as d,y as x,T as m,E as u,G as h,e as p,H as g,J as j,K as f,O as b,F as y,P as v,Q as w,U as N,V as k,W as I,X as S,g as C,Y as T,Z as _,u as D,a0 as F}from"./.pnpm-DxDKAttv.js";import{$ as M,u as E,a as z,b as O,T as R,S as H}from"./index-Dp_jhVP-.js";import{g as L,a as V,C as $,D as A,L as G,I as P,b as Y}from"./icon-button-slDc6r85.js";import{c as q}from"./fingerprint-C5ykFyRZ.js";function B(e){const t=Date.now(),s=new Date(e),a=new Date(t),l=(e,t)=>e.getFullYear()===t.getFullYear()&&e.getMonth()===t.getMonth()&&e.getDate()===t.getDate();return l(s,a)?s.toTimeString().slice(0,5):(e=>{const t=new Date(a);return t.setDate(a.getDate()-1),l(e,t)})(s)?"昨天":s.getTime()>a.getTime()-864e5*a.getDay()?(n=s,[M("星期日"),M("星期一"),M("星期二"),M("星期三"),M("星期四"),M("星期五"),M("星期六")][n.getDay()]):(e=>`${e.getFullYear()}/${(e.getMonth()+1).toString().padStart(2,"0")}/${e.getDate().toString().padStart(2,"0")}`)(s);var n}const K=a=>{const l=e.useMemo((()=>({style:{maxHeight:"80vh"},...a})),[a]);return t.jsx(s,{...l,children:a.children})},W=()=>{const[s,o]=e.useState(!1),[c,d]=e.useState({list:{},total:0}),[x,m]=e.useState([]);return e.useEffect((()=>{const e=L(10);d(e)}),[]),e.useEffect((()=>{const e=[];for(const t in c.list)Object.prototype.hasOwnProperty.call(c.list,t)&&e.push({list:c.list[t],key:t});m(e.sort(((e,t)=>e.key.localeCompare(t.key))))}),[c]),t.jsx("div",{id:"scrollableDiv",style:{height:600,width:"100%",overflow:"auto",padding:"0 16px"},children:t.jsx(a,{dataLength:c.total,next:()=>{if(s)return;o(!0);const e=L(10);d((t=>({list:{...t.list,...e.list},total:t.total+e.total}))),o(!1)},hasMore:c.total<50,loader:t.jsx(l,{avatar:!0,paragraph:{rows:1},active:!0}),endMessage:t.jsx(n,{plain:!0,children:"It is all, nothing more 🤐"}),scrollableTarget:"scrollableDiv",children:x.map(((e,s)=>t.jsxs("div",{className:"my-3",children:[e.key,t.jsx(r,{dataSource:e.list,renderItem:e=>t.jsx(r.Item,{children:t.jsx(r.Item.Meta,{avatar:t.jsx(i,{size:40,src:e.avatar}),title:e.nickname,description:e.signature})},e.email)})]},s)))})})},J={labelCol:{span:10},wrapperCol:{span:12}},Q={wrapperCol:{offset:8,span:16}},U=()=>{const[s]=o.useForm(),[a,l]=e.useState(!1),[p,g]=e.useState("public"),[j,f]=e.useState([]),[b,y]=e.useState([]);e.useEffect((()=>{const e=[],t=L(100);for(const s in t.list)Object.prototype.hasOwnProperty.call(t.list,s)&&e.push({list:t.list[s],key:s});f(e.sort(((e,t)=>e.key.localeCompare(t.key))))}),[]);return t.jsxs(o,{...J,form:s,name:"control-hooks",onFinish:e=>{},layout:"vertical",style:{maxWidth:600},children:[t.jsx(o.Item,{name:"name",label:M("名称"),rules:[{required:!0}],children:t.jsx(c,{})}),t.jsx(o.Item,{name:"type",label:M("类型"),initialValue:"public",children:t.jsxs(d.Group,{value:p,children:[t.jsx(d.Button,{value:"public",children:M("公开群")}),t.jsx(d.Button,{value:"private",children:M("私密群")})]})}),t.jsx(o.Item,{children:t.jsx(x,{type:"dashed",onClick:()=>{l(!a)},children:M("选择联系人")})}),t.jsx(i.Group,{maxCount:10,children:b.map((e=>t.jsx(m,{title:e.nickname,placement:"top",children:t.jsx(i,{src:e.avatar,onClick:()=>{return t=e.user_id,void y((e=>e.filter((e=>e.user_id!==t))));var t},style:{cursor:"pointer"}})},e.user_id)))}),t.jsx(o.Item,{...Q,className:"my-3",children:t.jsxs(u,{children:[t.jsx(x,{type:"primary",htmlType:"submit",children:M("确定")}),t.jsx(x,{htmlType:"button",onClick:()=>{s.resetFields(),l(!1),g("public"),y([])},children:M("重置")})]})}),t.jsx(n,{}),a&&t.jsx(o.Item,{name:"contact",label:M("联系人"),className:"text-nowrap",wrapperCol:{span:25},children:t.jsx(r,{itemLayout:"horizontal",dataSource:j,style:{maxHeight:300,overflow:"auto"},renderItem:e=>t.jsxs("div",{children:[e.key,t.jsx(r,{dataSource:e.list,renderItem:e=>{return t.jsxs(r.Item,{children:[t.jsx(h,{onChange:(s=e,e=>{const t=e.target.checked;y((e=>t?[...e,s]:e.filter((e=>e.user_id!==s.user_id))))}),className:"mr-3",checked:b.some((t=>t.user_id===e.user_id))}),t.jsx(r.Item.Meta,{avatar:t.jsx(i,{src:e.avatar}),title:e.nickname})]},e.user_id);var s}})]},e.key)})})]})},X=()=>t.jsx("div",{children:t.jsx("h1",{children:"SettingList List"})}),Z=V(),ee={body:{display:"flex",flexDirection:"column",padding:"24px 0px"}},te=s=>{const a=E(),l=p(),r=z(),{width:o}=O(),c=e.useMemo((()=>r.theme===R.LIGHT),[r.theme]),d=e.useMemo((()=>[{icon:g,title:M("新建群组"),component:t.jsx(U,{})},{icon:j,title:M("联系人"),component:t.jsx(W,{})},{icon:f,title:M("设置"),component:t.jsx(X,{})}]),[]),[m,u]=e.useState(0),[h,N]=e.useState(!1),[k,I]=e.useState(""),S=e.useMemo((()=>d[m].component),[m,d]),[C,T]=e.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsxs(b,{className:"p-0",placement:"left",width:o<H?"70%":"300px",closable:!1,styles:ee,...s,children:[t.jsxs(y,{className:"mobile:px-5 px-3",align:"center",children:[t.jsx(i,{className:"mr-4 min-w-[64px] min-h-[64px]",src:Z.avatar,size:64}),t.jsxs(y,{vertical:!0,children:[t.jsx(v.Text,{className:"!mb-1 font-bold mobile:text-xl text-lg",children:Z.nickname}),t.jsx(v.Text,{className:"break-all line-clamp-1 mobile:text-base text-sm",children:Z.email})]})]}),t.jsx(n,{}),t.jsxs(y,{vertical:!0,children:[d.map(((e,a)=>t.jsxs(y,{className:"mobile:py-3 py-2 mobile:px-5 px-4 select-none hover:bg-background-hover cursor-pointer rounded",gap:"middle",onClick:()=>((e,t)=>{s.setOpen&&s.setOpen(!1),I(e.title),N(!0),u(t)})(e,a),children:[t.jsx($,{className:"mobile:text-2xl text-xl text-gray-500",component:e.icon}),t.jsx(v.Text,{className:"mobile:text-lg text-base",children:e.title})]},a))),t.jsxs(y,{className:"mobile:py-3 py-2 mobile:px-5 px-4 select-none hover:bg-background-hover cursor-pointer rounded",gap:"middle",justify:"space-between",onClick:()=>r.update({theme:c?R.DARK:R.LIGHT}),children:[t.jsxs(y,{gap:"middle",children:[t.jsx($,{className:"mobile:text-2xl text-xl text-gray-500",component:c?A:G}),t.jsx(v.Text,{className:"mobile:text-lg text-base",children:M(c?"夜间模式":"日间模式")})]}),t.jsx(w,{checked:!c})]})]}),t.jsx(y,{className:"flex-1 h-fit",justify:"center",align:"flex-end",children:t.jsx(x,{className:"w-full mx-[24px] p-[20px] flex justify-center items-center",type:"primary",danger:!0,onClick:()=>T(!0),children:M("退出登陆")})})]}),t.jsx(K,{open:h,title:k,onCancel:()=>N(!1),footer:null,children:S}),t.jsx(K,{title:M("退出登陆"),centered:!0,open:C,onOk:()=>{(async()=>{try{const e=await a.logout({driver_id:q()});console.log(M("退出登录"),e)}catch(e){console.log(e)}finally{l("/account/login",{replace:!0})}})(),T(!1)},onCancel:()=>T(!1),children:t.jsx("p",{children:M("确定要退出登陆吗？")})})]})},se=()=>{const[s,a]=e.useState(!1);return t.jsxs(t.Fragment,{children:[t.jsxs(y,{className:"sticky top-0 z-10 bg-background pl-3 pr-3",style:{height:64},align:"center",children:[t.jsx(P,{className:"text-gray-500 text-xl",buttonClassName:"mr-1",component:N,onClick:()=>a(!0)}),t.jsxs(y,{className:"flex-1 bg-background2 h-10 rounded px-5 cursor-pointer",align:"center",children:[t.jsx(k,{className:"mr-2 text-gray-500 text-base"}),t.jsx(v.Text,{className:"text-gray-500 text-sm",children:M("搜索")})]})]}),t.jsx(te,{open:s,onClose:()=>a(!1),setOpen:a})]})},ae=({count:s=100,listHeight:a=400,options:l={},renderItem:n,onScroll:r,onRendering:i,onRenderFinish:o,loading:c=!1,loadingComponent:d,loadingClassName:x,isScrollToEnd:m=!1,...u},h)=>{const p=e.useRef(null),[,g]=I(p),{defer:j,isRendering:f,isRenderFinish:b}=((t=20)=>{const[s,a]=e.useState(!0),[l,n]=e.useState(!1);let r=0,i=0;const o=()=>{i=requestAnimationFrame((()=>{if(r++,r>=t)return cancelAnimationFrame(i),a(!1),void n(!0);o()}))};return e.useEffect((()=>{if(t)return()=>cancelAnimationFrame(i)}),[t]),{defer:e=>(!i&&t&&o(),e<=t),isRendering:s,isRenderFinish:l}})(s),w=S({count:s,estimateSize:()=>48,overscan:5,...l});e.useEffect((()=>{const[e]=[...w.getVirtualItems()];e&&r&&r(e)}),[w.getVirtualItems()]);const N=e=>w.scrollToIndex(e),k=()=>w.scrollToIndex(s-1);return e.useImperativeHandle(h,(()=>({scrollToIndex:N,scrollToEnd:k,virtualizer:w}))),e.useEffect((()=>{f&&i&&i(w.getVirtualItems()[0]),b&&m&&w.scrollToIndex(s-1),b&&o&&o()}),[f,b]),t.jsxs(y,{className:"ttt flex-1 w-full h-full overflow-y-auto overflow-x-hidden relative",style:{contain:"strict",height:a||g},ref:p,...u,vertical:!0,children:[c&&t.jsx(y,{className:C("flex-1 h-full bg-background absolute top-0 left-0 w-full z-10 ",f?"!flex":"!hidden",x),align:"center",justify:"center",children:d||t.jsx(v.Text,{children:"loading..."})}),t.jsx(y,{style:{height:w.getTotalSize(),width:"100%",position:"relative"},children:w.getVirtualItems().map((e=>t.jsx(y,{style:{position:"absolute",top:0,left:0,width:"100%",transform:`translateY(${e.start}px)`},"data-index":e.index,ref:w.measureElement,children:j(e.index)&&n(e.index)},e.key)))})]})};ae.displayName="VirtualizerList";const le=e.forwardRef(ae),ne=s=>{const{height:a}=O(),l=p(),n=T(),i=e.useCallback((e=>{const a=s.data[e];return t.jsx(r.Item,{className:C("!px-3 select-none w750:hover:bg-background-hover cursor-pointer w-full",Number(n.id)===a.dialog_id&&"w750:!bg-primary"),extra:t.jsx(re,{chat:a}),onClick:()=>l(`/dashboard/${a.dialog_id}`),children:t.jsx(r.Item.Meta,{avatar:t.jsx(oe,{chat:a}),title:t.jsx(ie,{chat:a}),description:t.jsx(ce,{chat:a})})},a.dialog_id)}),[n.id,s.data]);return t.jsx(r,{children:t.jsx(le,{listHeight:a-64,count:s.data.length,renderItem:i})})},re=({chat:e})=>t.jsxs(y,{vertical:!0,align:"flex-end",children:[t.jsx(v.Text,{className:"text-gray-500 text-xs mb-2",children:B(e.last_message.send_time)}),t.jsx(_,{className:"badge",count:e.dialog_unread_count})]}),ie=({chat:e})=>t.jsx(v.Paragraph,{className:"!mb-0",ellipsis:{rows:1},children:e.dialog_name}),oe=({chat:e})=>t.jsx(i,{src:e.dialog_avatar,size:48}),ce=({chat:e})=>t.jsxs(v.Paragraph,{className:"text-gray-500 !mb-0 -mt-[4px] text-base",ellipsis:{rows:1},children:[e.last_message.sender_info.name,": ",e.last_message.content]}),de=e.memo((()=>t.jsxs(y,{className:C("min-w-[250px] w-full border-r h-screen overflow-auto","mobile:w-[300px] mobile:max-w-[500px] "),vertical:!0,children:[t.jsx(se,{}),t.jsx(ne,{data:Y(30)})]})));const xe=()=>(function(){const t=T(),s=D(),a=z();e.useEffect((()=>{s.pathname.includes("dashboard")&&(null==t?void 0:t.id)&&a.update({lastDialogId:Number(t.id||0)})}),[null==t?void 0:t.id,s.pathname])}(),t.jsxs(y,{className:"w-full",align:"start",children:[t.jsx(de,{}),t.jsx(y,{className:"mobile:!flex !hidden flex-1",children:t.jsx(F,{})})]}));export{xe as default};
