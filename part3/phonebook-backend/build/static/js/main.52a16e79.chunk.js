(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,t,n){},39:function(e,t,n){"use strict";n.r(t);var c=n(0),u=n(1),a=n.n(u),r=n(15),s=n.n(r),o=n(5),i=n(4),d=n(3),l=n.n(d),j=function(e){var t=e.contacts,n=e.handleDelete;return Object(c.jsx)("div",{children:t.map((function(e){return Object(c.jsxs)("div",{children:[Object(c.jsxs)("span",{children:[e.name,": ",e.number]}),Object(c.jsx)("button",{onClick:function(){return n(e)},children:"DELETE"})]},e.id)}))})},b=function(e){var t=e.addContact,n=e.newName,u=e.handleNameInput,a=e.newNumber,r=e.handleNumberInput;return Object(c.jsxs)("form",{onSubmit:t,children:[Object(c.jsxs)("div",{children:["Name: ",Object(c.jsx)("input",{value:n,onInput:u})]}),Object(c.jsxs)("div",{children:["Number: ",Object(c.jsx)("input",{value:a,onInput:r})]}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{type:"submit",children:"Add"})})]})},f=function(e){var t=e.searchQuery,n=e.setSearchQuery;return Object(c.jsxs)("div",{children:[Object(c.jsx)("span",{children:"Search Contacts"}),Object(c.jsx)("input",{type:"search",value:t,onInput:function(e){return n(e.target.value)}})]})},h="/api/contacts",m=function(){return l.a.get(h).then((function(e){return e.data}))},O=function(e){return l.a.post(h,e).then((function(e){return e.data}))},p=function(e,t){return l.a.put("".concat(h,"/").concat(e),t).then((function(e){return e.data}))},x=function(e){return l.a.delete("".concat(h,"/").concat(e)).then((function(e){return e.data}))},v=function(e){var t=e.announcement;return t?Object(c.jsx)("div",{className:"announcement ".concat(t.style),children:t.message}):null},y=function(){var e=Object(u.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1],r=Object(u.useState)(""),s=Object(i.a)(r,2),d=s[0],l=s[1],h=Object(u.useState)(""),y=Object(i.a)(h,2),w=y[0],g=y[1],N=Object(u.useState)(""),S=Object(i.a)(N,2),I=S[0],k=S[1],T=Object(u.useState)(null),C=Object(i.a)(T,2),D=C[0],E=C[1];Object(u.useEffect)((function(){m().then((function(e){return a(e)}))}),[]);var Q=I.trim().length>0?n.filter((function(e){return e.name.toLowerCase().includes(I.toLowerCase())})):n;return Object(c.jsxs)("div",{children:[Object(c.jsx)("h2",{children:"Phonebook"}),Object(c.jsx)(v,Object(o.a)({},{announcement:D})),Object(c.jsx)(f,Object(o.a)({},{searchQuery:I,setSearchQuery:k})),Object(c.jsx)("h3",{children:"Add New"}),Object(c.jsx)(b,Object(o.a)({},{addContact:function(e){e.preventDefault();var t=n.find((function(e){return e.name===d})),c={name:d,number:w};t?window.confirm("".concat(c.name," is already in the phonebook, update his number?"))&&p(t.id,c).then((function(e){E({message:"".concat(c.name," was successfully updated"),style:"success"}),setTimeout((function(){E(null)}),3e3),a(n.map((function(t){return t.id===e.id?e:t}))),l(""),g("")})).catch((function(e){E({message:e.response.data.error,style:"error"}),setTimeout((function(){E(null)}),3e3)})):O(c).then((function(e){E({message:"".concat(c.name," was successfully added"),style:"success"}),setTimeout((function(){E(null)}),3e3),a(n.concat(e)),l(""),g("")})).catch((function(e){E({message:e.response.data.error,style:"error"}),setTimeout((function(){E(null)}),3e3)}))},newName:d,handleNameInput:function(e){l(e.target.value)},newNumber:w,handleNumberInput:function(e){g(e.target.value)}})),Object(c.jsx)("h3",{children:"Numbers"}),Object(c.jsx)(j,{contacts:Q,handleDelete:function(e){window.confirm("Delete ".concat(e.name,"?"))&&x(e.id).then((function(){E({message:"".concat(e.name," was successfully deleted"),style:"success"}),setTimeout((function(){E(null)}),3e3),a(n.filter((function(t){return t.id!=e.id})))})).catch((function(){E({message:"".concat(e.name," was already deleted from server"),style:"error"}),setTimeout((function(){E(null)}),3e3),a(n.filter((function(t){return t.id!=e.id})))}))}})]})};n(38);s.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(y,{})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.52a16e79.chunk.js.map