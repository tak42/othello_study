(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{2562:function(n,t,e){"use strict";e.r(t);var r=e(5785),i=e(9008),c=e(7294),u=e(8804),o=e(5893),a=u.ZP.div.withConfig({displayName:"pages__Container",componentId:"sc-eccczk-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;min-height:100vh;padding:0 0.5rem;background-color:green;"]),l=u.ZP.main.withConfig({displayName:"pages__Main",componentId:"sc-eccczk-1"})(["display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;padding:5rem 0;"]),f=u.ZP.div.withConfig({displayName:"pages__Grid",componentId:"sc-eccczk-2"})(["display:flex;flex-wrap:wrap;align-items:center;justify-content:center;max-width:800px;margin-top:3rem;@media (max-width:600px){flex-direction:column;width:100%;}"]),s=u.ZP.div.withConfig({displayName:"pages__Block",componentId:"sc-eccczk-3"})(["width:100px;height:100px;background-color:",";border:1px solid white;"],(function(n){return 1===n.val?"yellow":"green"})),d=u.ZP.div.withConfig({displayName:"pages__Stone",componentId:"sc-eccczk-4"})(["height:60px;margin:1rem;background-color:",";border-radius:50%;"],(function(n){return 1===n.val?"black":"white"}));t.default=function(){var n=(0,c.useState)({row:8,col:8,passCnt:0}),t=n[0],e=n[1],u=(0,c.useState)(1),p=u[0],m=u[1],h=(0,c.useMemo)((function(){return 1===p?2:1}),[p]),g=[-1,0,1].flatMap((function(n,t,e){return e.map((function(t){return[n,t]}))})).filter((function(n){return 0!==n[0]||0!==n[1]})),x=function(){var n=(0,r.Z)(Array(t.row)).map((function(){return(0,r.Z)(Array(t.col)).map((function(){return 0}))}));return n[3][3]=1,n[3][4]=2,n[4][3]=2,n[4][4]=1,n},v=(0,c.useState)(x),w=v[0],_=v[1],y=(0,c.useMemo)((function(){return{whiteCount:w.flat().filter((function(n){return 2===n})).length,blackCount:w.flat().filter((function(n){return 1===n})).length}}),[w]),C=y.whiteCount,k=y.blackCount,j=function(n,t){return t.sort(),n>=t[0]&&n<=t[1]},N=(0,c.useMemo)((function(){return w.flat().map((function(n,e){return[Math.floor(e/t.row),e%t.col]}))}),[w,t]),b=function(n){return g.flatMap((function(t){return(0,r.Z)(Array(8)).map((function(e,r){var i=n[0]+t[0]*(r+1),c=n[1]+t[1]*(r+1);return{dir:t,cell:[i,c]}}))})).filter((function(n){return n.cell[0]>-1&&n.cell[0]<8&&n.cell[1]>-1&&n.cell[1]<8}))},Z=function(n){return N.filter((function(n){return w[n[0]][n[1]]===p})).map((function(t){var e=t,r=function(n,t){var e=b(n).find((function(n){return n.cell[0]===t[0]&&n.cell[1]===t[1]}));return void 0!==e?b(n).filter((function(n){return n.dir===e.dir})):[]}(n,e).map((function(n){return n.cell})).filter((function(t){return j(t[0],[n[0],e[0]])&&j(t[1],[n[1],e[1]])}));r.pop();var i=r.every((function(n){return w[n[0]][n[1]]===h}));return{result:r.length>0&&i,Cells:r}}))},M=(0,c.useMemo)((function(){var n=N,e=n.filter((function(n){return 0===w[n[0]][n[1]]})),i=(n.filter((function(n){return w[n[0]][n[1]]===p})),n.filter((function(n){return w[n[0]][n[1]]===h}))),c=e.filter((function(n){var t=n;return i.map((function(n){var e=n,r=e[0]-t[0],i=e[1]-t[1];return!!g.find((function(n){return n[0]===r&&n[1]===i}))})).includes(!0)})).filter((function(n){return Z(n).map((function(n){return n.result})).includes(!0)}));return(0,r.Z)(Array(t.row)).map((function(n,e){return(0,r.Z)(Array(t.col)).map((function(n,t){return c.find((function(n){return n[0]===e&&n[1]===t}))?1:0}))}))}),[w,p,h]),E=(0,c.useMemo)((function(){return!M.flat(2).includes(1)}),[M]),P=function(){_(x)},A=function(n,t){JSON.parse(JSON.stringify(w)),N.filter((function(n){return w[n[0]][n[1]]===p})),Z([n,t]).filter((function(n){return n.result}))};return(0,c.useEffect)((function(){var n=t.passCnt,r=E?n+1:0;t.passCnt=r,E&&C+k<64&&(alert("\u6253\u3066\u308b\u3068\u3053\u308d\u304c\u306a\u3044\u305f\u3081\u30d1\u30b9\u3057\u307e\u3059\u3002"),m(h)),r>1&&(alert("\u30d1\u30b9\u304c\uff12\u56de\u7d9a\u3044\u305f\u306e\u3067\u7d42\u4e86\u3057\u307e\u3059\u3002"),C>k?alert("\u767d\u306e\u52dd\u3061\u3067\u3059\u3002"):alert("\u9ed2\u306e\u52dd\u3061\u3067\u3059\u3002"),P()),e(t)}),[E,t.passCnt,p,h]),(0,c.useEffect)((function(){C+k===64&&(C>k?alert("\u767d\u306e\u52dd\u3061\u3067\u3059\u3002"):alert("\u9ed2\u306e\u52dd\u3061\u3067\u3059\u3002"),P())}),[C,k]),(0,o.jsxs)(a,{children:[(0,o.jsxs)(i.default,{children:[(0,o.jsx)("title",{children:"Create Next App"}),(0,o.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,o.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,o.jsxs)(l,{children:[(0,o.jsx)("h1",{children:1===p?"\u9ed2\u306e\u756a\u3067\u3059\u3002":"\u767d\u306e\u756a\u3067\u3059\u3002"}),(0,o.jsx)(f,{children:w.map((function(n,t){return n.map((function(n,e){return(0,o.jsx)(s,{onClick:function(){return 1===M[t][e]&&A(t,e)},val:M[t][e],children:n>0&&(0,o.jsx)(d,{val:n})},"".concat(t,"-").concat(e))}))}))})]})]})}},5301:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return e(2562)}])}},function(n){n.O(0,[549,774,888,179],(function(){return t=5301,n(n.s=t);var t}));var t=n.O();_N_E=t}]);