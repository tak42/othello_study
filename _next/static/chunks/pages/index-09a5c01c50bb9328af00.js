(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2562:function(n,t,e){"use strict";e.r(t);var r=e(4942),o=e(5785),i=e(9008),c=e(7294),u=e(8804),a=e(5893);function s(n,t){var e=Object.keys(n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(n);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),e.push.apply(e,r)}return e}function l(n){for(var t=1;t<arguments.length;t++){var e=null!=arguments[t]?arguments[t]:{};t%2?s(Object(e),!0).forEach((function(t){(0,r.Z)(n,t,e[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(e)):s(Object(e)).forEach((function(t){Object.defineProperty(n,t,Object.getOwnPropertyDescriptor(e,t))}))}return n}var f=u.ZP.div.withConfig({displayName:"pages__Container",componentId:"sc-eccczk-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;min-height:100vh;padding:0 0.5rem;background-color:green;"]),p=u.ZP.main.withConfig({displayName:"pages__Main",componentId:"sc-eccczk-1"})(["flex:1;padding:5rem 0;"]),d=u.ZP.div.withConfig({displayName:"pages__Grid",componentId:"sc-eccczk-2"})(["display:flex;flex-wrap:wrap;align-items:center;justify-content:center;max-width:800px;margin-top:3rem;"]),h=u.ZP.div.withConfig({displayName:"pages__Block",componentId:"sc-eccczk-3"})(["width:100px;height:100px;background-color:",";border:1px solid black;"],(function(n){return 1===n.val?"yellow":"green"})),m=u.ZP.div.withConfig({displayName:"pages__Stone",componentId:"sc-eccczk-4"})(["height:60px;margin:1rem;background-color:",";border-radius:50%;"],(function(n){return 1===n.val?"black":"white"}));t.default=function(){var n=(0,c.useState)({row:8,col:8,passCnt:0}),t=n[0],e=n[1],r=(0,c.useState)(1),u=r[0],s=r[1],g=(0,c.useMemo)((function(){return 1===u?2:1}),[u]),v=[-1,0,1].flatMap((function(n,t,e){return e.map((function(t){return[n,t]}))})).filter((function(n){return 0!==n[0]||0!==n[1]})),w=function(){return(0,o.Z)(Array(t.row*t.col)).map((function(n,e){return{point:[Math.floor(e/t.row),e%t.col],stone:0}}))},b=function(){var n=w();return n[27].stone=1,n[28].stone=2,n[35].stone=2,n[36].stone=1,n},y=(0,c.useState)(b),j=y[0],x=y[1],C=(0,c.useMemo)((function(){return{whiteCount:j.filter((function(n){return 2===n.stone})).length,blackCount:j.filter((function(n){return 1===n.stone})).length}}),[j]),_=C.whiteCount,k=C.blackCount,O=function(n,t){return t.sort(),n>=t[0]&&n<=t[1]},P=function(n,t){return n[0]===t[0]&&n[1]===t[1]},N=function(n){return j.filter((function(n){return n.stone===u})).map((function(t){var e,r=(e=n,v.flatMap((function(n){return(0,o.Z)(Array(8)).map((function(t,r){var o=[e[0]+n[0]*(r+1),e[1]+n[1]*(r+1)];return{dir:n,cell:o}}))})).filter((function(n){return n.cell[0]>-1&&n.cell[0]<8&&n.cell[1]>-1&&n.cell[1]<8}))),i=r.find((function(n){return P(n.cell,t.point)})),c=(void 0!==i?r.filter((function(n){return n.dir===i.dir})):[]).map((function(n){return n.cell})).filter((function(e){return O(e[0],[n[0],t.point[0]])&&O(e[1],[n[1],t.point[1]])}));c.pop();var u=c.every((function(n){var t=j.find((function(t){return P(t.point,n)}));return(null===t||void 0===t?void 0:t.stone)===g}));return{result:c.length>0&&u,Cells:c}})).filter((function(n){return n.result}))},M=function(n,t,e){return n.map((function(n){var r=t.find((function(t){return P(t.point,n.point)}))?e:n.stone;return{point:n.point,stone:r}}))},E=(0,c.useMemo)((function(){var n=j.filter((function(n){return 0===n.stone&&N(n.point).length>0}));return M(w(),n,1)}),[j,u,g]),Z=(0,c.useMemo)((function(){return!E.flatMap((function(n){return n.stone})).includes(1)&&_+k<64}),[E]);return(0,c.useEffect)((function(){var n=l({},t),r=Z&&0===t.passCnt,o=Z&&1===t.passCnt,i=_+k===64;o&&alert("".concat(_>k?"\u767d":"\u9ed2","\u306e\u52dd\u3061\u3067\u3059\u3002")),r&&alert("\u30d1\u30b9\u3057\u307e\u3059\u3002"),e(l(l({},t),{passCnt:Z?n.passCnt+=1:0})),s(r?g:u),i&&alert("".concat(_>k?"\u767d":"\u9ed2","\u306e\u52dd\u3061\u3067\u3059\u3002")),x(o||i?b:j)}),[Z,t.passCnt,u,g,_,k]),(0,a.jsxs)(f,{children:[(0,a.jsxs)(i.default,{children:[(0,a.jsx)("title",{children:"Create Next App"}),(0,a.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,a.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,a.jsxs)(p,{children:[(0,a.jsx)("h1",{children:1===u?"\u9ed2\u306e\u756a\u3067\u3059\u3002":"\u767d\u306e\u756a\u3067\u3059\u3002"}),(0,a.jsx)(d,{children:j.map((function(n,t){return(0,a.jsx)(h,{onClick:function(){return 1===E[t].stone&&function(n){var t=N(n).flatMap((function(n){return n.Cells})).map((function(n){return{point:n,stone:0}}));t.push({point:n,stone:0}),x(M(j,t,u)),s(g)}(n.point)},val:E[t].stone?E[t].stone:0,children:n.stone>0&&(0,a.jsx)(m,{val:n.stone})},"".concat(n.point[0],"-").concat(n.point[1]))}))})]})]})}},5301:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(2562)}])}},function(n){n.O(0,[549,774,888,179],(function(){return t=5301,n(n.s=t);var t}));var t=n.O();_N_E=t}]);