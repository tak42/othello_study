(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[231],{1193:function(n,e,t){"use strict";t.r(e);var r=t(5785),i=t(9008),o=t(7294),a=t(8804),c=t(5893);function l(n,e){var t="undefined"!==typeof Symbol&&n[Symbol.iterator]||n["@@iterator"];if(!t){if(Array.isArray(n)||(t=function(n,e){if(!n)return;if("string"===typeof n)return u(n,e);var t=Object.prototype.toString.call(n).slice(8,-1);"Object"===t&&n.constructor&&(t=n.constructor.name);if("Map"===t||"Set"===t)return Array.from(n);if("Arguments"===t||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t))return u(n,e)}(n))||e&&n&&"number"===typeof n.length){t&&(n=t);var r=0,i=function(){};return{s:i,n:function(){return r>=n.length?{done:!0}:{done:!1,value:n[r++]}},e:function(n){throw n},f:i}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,a=!0,c=!1;return{s:function(){t=t.call(n)},n:function(){var n=t.next();return a=n.done,n},e:function(n){c=!0,o=n},f:function(){try{a||null==t.return||t.return()}finally{if(c)throw o}}}}function u(n,e){(null==e||e>n.length)&&(e=n.length);for(var t=0,r=new Array(e);t<e;t++)r[t]=n[t];return r}var f=a.ZP.div.withConfig({displayName:"stage2_index__Container",componentId:"sc-16ivtku-0"})(["display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;min-height:100vh;padding:0 0.5rem;background-color:green;"]),s=a.ZP.main.withConfig({displayName:"stage2_index__Main",componentId:"sc-16ivtku-1"})(["display:flex;flex:1;flex-direction:column;align-items:center;justify-content:center;padding:5rem 0;"]),d=a.ZP.div.withConfig({displayName:"stage2_index__Grid",componentId:"sc-16ivtku-2"})(["display:flex;flex-wrap:wrap;align-items:center;justify-content:center;max-width:800px;margin-top:3rem;@media (max-width:600px){flex-direction:column;width:100%;}"]),h=a.ZP.div.withConfig({displayName:"stage2_index__Block",componentId:"sc-16ivtku-3"})(["width:100px;height:100px;background-color:",";border:1px solid white;"],(function(n){return 1===n.val?"yellow":"green"})),p=a.ZP.div.withConfig({displayName:"stage2_index__Stone",componentId:"sc-16ivtku-4"})(["height:60px;margin:1rem;background-color:",";border-radius:50%;"],(function(n){return 1===n.val?"black":"white"}));e.default=function(){var n=(0,o.useState)({row:8,col:8}),e=n[0],t=(n[1],function(){var n=(0,r.Z)(Array(e.row)).map((function(){return(0,r.Z)(Array(e.col)).map((function(){return 0}))}));return n[3][3]=1,n[3][4]=2,n[4][3]=2,n[4][4]=1,n}),a=(0,o.useState)(t),u=a[0],m=a[1],v=(0,o.useMemo)((function(){return{whiteCount:u.flat().filter((function(n){return 2===n})).length,blackCount:u.flat().filter((function(n){return 1===n})).length}}),[u]),g=v.whiteCount,y=v.blackCount,w=(0,o.useState)(1),x=w[0],_=w[1],b=(0,o.useState)(0),k=b[0],j=b[1],C=(0,o.useMemo)((function(){return 1===x?2:1}),[x]),N=[[-1,0],[-1,1],[0,1],[1,1],[1,0],[1,-1],[0,-1],[-1,-1]],S=(0,o.useMemo)((function(){for(var n=(0,r.Z)(Array(e.row)).map((function(){return(0,r.Z)(Array(e.col)).map((function(){return 0}))})),t=[],i=0;i<8;i++)for(var o=0;o<8;o++)if(0===u[i][o]){var a,c=l(N);try{for(c.s();!(a=c.n()).done;){for(var f=a.value,s=1;s<8;s++){var d=i+f[0]*s,h=o+f[1]*s;if(d<0||h<0||d>7||h>7)break;if(u[d][h]!==C){if(u[d][h]===x){t.push({row:d,col:h});break}break}t.push({row:d,col:h})}if(t.length>1){var p=t[t.length-1];u[p.row][p.col]===x&&(n[i][o]=1)}t.splice(0,t.length)}}catch(m){c.e(m)}finally{c.f()}}return n}),[u,x]),A=(0,o.useMemo)((function(){return!S.flat(2).includes(1)}),[S]);(0,o.useEffect)((function(){var n=A?k+1:0;console.log(n),j(n),A&&g+y<64&&(alert("\u6253\u3066\u308b\u3068\u3053\u308d\u304c\u306a\u3044\u305f\u3081\u30d1\u30b9\u3057\u307e\u3059\u3002"),_(C)),n>1&&(alert("\u30d1\u30b9\u304c\uff12\u56de\u7d9a\u3044\u305f\u306e\u3067\u7d42\u4e86\u3057\u307e\u3059\u3002"),g>y?alert("\u767d\u306e\u52dd\u3061\u3067\u3059\u3002"):alert("\u9ed2\u306e\u52dd\u3061\u3067\u3059\u3002"),Z())}),[S]),(0,o.useEffect)((function(){g+y===64&&(g>y?alert("\u767d\u306e\u52dd\u3061\u3067\u3059\u3002"):alert("\u9ed2\u306e\u52dd\u3061\u3067\u3059\u3002"),Z())}),[g,y]);var Z=function(){m(t)};return(0,c.jsxs)(f,{children:[(0,c.jsxs)(i.default,{children:[(0,c.jsx)("title",{children:"Create Next App"}),(0,c.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,c.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,c.jsxs)(s,{children:[(0,c.jsx)("h1",{children:1===x?"\u9ed2\u306e\u756a\u3067\u3059\u3002":"\u767d\u306e\u756a\u3067\u3059\u3002"}),(0,c.jsx)(d,{children:u.map((function(n,e){return n.map((function(n,t){return(0,c.jsxs)(h,{onClick:function(){return function(n,e){var t,r=JSON.parse(JSON.stringify(u)),i=[],o=l(N);try{for(o.s();!(t=o.n()).done;){for(var a=t.value,c=1;c<8;c++){var f=n+a[0]*c,s=e+a[1]*c;if(f<0||s<0||f>7||s>7)break;if(r[f][s]!==C){if(r[f][s]===x){i.push({row:f,col:s});break}break}i.push({row:f,col:s})}if(i.length>1){var d=i[i.length-1];if(r[d.row][d.col]===x){i.splice(i.length-1,0);var h,p=l(i);try{for(p.s();!(h=p.n()).done;){var v=h.value;r[v.row][v.col]=x}}catch(g){p.e(g)}finally{p.f()}r[n][e]=x}}i.splice(0,i.length)}}catch(g){o.e(g)}finally{o.f()}r[n][e]===x&&(m(r),_(C))}(e,t)},val:S[e][t],children:[e,", ",t,n>0&&(0,c.jsx)(p,{val:n})]},"".concat(e,"-").concat(t))}))}))})]})]})}},9749:function(n,e,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/stage2_index",function(){return t(1193)}])}},function(n){n.O(0,[549,774,888,179],(function(){return e=9749,n(n.s=e);var e}));var e=n.O();_N_E=e}]);