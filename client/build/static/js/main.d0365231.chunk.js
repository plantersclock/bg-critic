(this.webpackJsonpclient=this.webpackJsonpclient||[]).push([[0],{66:function(e,t,a){e.exports=a(95)},94:function(e,t,a){},95:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(8),c=a.n(o),l=a(31),i=a(10),s=a(17),u=a(18),m=a(19),p=a(20),d=a(130),h=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",{style:{backgroundColor:"gray",height:80}},r.a.createElement(d.a,{container:!0},r.a.createElement(d.a,{item:!0,lg:2}),r.a.createElement(d.a,{container:!0,item:!0,lg:8},r.a.createElement(d.a,{container:!0,item:!0,alignItems:"center",justify:"center",lg:4},r.a.createElement(l.b,{to:"/top10/list"},"list")),r.a.createElement(d.a,{container:!0,item:!0,alignItems:"center",justify:"center",lg:4},r.a.createElement(l.b,{to:"/top10/create"},"create")),r.a.createElement(d.a,{container:!0,item:!0,alignItems:"center",justify:"center",lg:4},r.a.createElement(l.b,{to:"/top10/update/1"},"update"))),r.a.createElement(d.a,{item:!0,lg:2})))}}]),a}(n.Component),g=a(25),f=a(134),b=a(135),v=a(139),E=a(137),y=a(136),j=a(140),O=a(138),I={264241:"https://amzn.to/3iPNaSK",281259:"https://amzn.to/38zJOOM",271088:"https://amzn.to/2DlwLoL",280480:"https://amzn.to/3e9y32E",269207:"https://amzn.to/3ec4AoS",219100:"https://amzn.to/32783mz",274364:"https://amzn.to/31QZsnP",266192:"https://amzn.to/3fa54NI",276025:"https://amzn.to/2Z7JUdz",285774:"https://amzn.to/2O3lk7f"},T=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).state={},n.convert=n.convert.bind(Object(g.a)(n)),n}return Object(u.a)(a,[{key:"convert",value:function(e){try{var t={"&amp;":"&","&ndash;":"-","&nbsp;":" ","&mdash;":" - ","&lt;":"<","&gt;":">","&quot;":'"',"&apos;":"`","&#10;":" "};for(var a in t){var n=t[a],r=new RegExp(a,"g");e=e.replace(r,n)}return e}catch(o){return null}}},{key:"render",value:function(){var e=!1,t=this.props,a=t.bg,n=t.order,o="",c=void 0;return void 0!==this.props.bg&&null!==this.props.bg&&(e=!0,o=a.description,console.log(a),c=I[a.bgg_id],console.log(c)),r.a.createElement("div",null,e?r.a.createElement(f.a,null,r.a.createElement(b.a,null,r.a.createElement(y.a,{component:"img",alt:a.name,height:"200",image:a.image,title:a.name}),r.a.createElement(E.a,{zeroMinWidth:!0},r.a.createElement(O.a,{gutterBottom:!0,variant:"h5",component:"h2"},10-n,". ",a.name),r.a.createElement(O.a,{style:{maxHeight:120,overflow:"hidden"},variant:"body2",color:"textSecondary",component:"p"},this.convert(o)))),r.a.createElement(v.a,null,void 0!==c?r.a.createElement(j.a,{size:"small",color:"primary",href:c},"Buy"):r.a.createElement("div",null),r.a.createElement(j.a,{size:"small",color:"primary"},"Learn More"))):r.a.createElement("div",null))}}]),a}(n.Component),C=a(22),k=a.n(C),x=a(33),w=a(56),G=a.n(w).a.create({baseURL:"http://localhost:3000/api"}),z={insertTop10Item:function(e){return G.post("/top10",e)},getAllTop10Items:function(){return G.get("/top10items")},updateTop10ItemById:function(e,t){return G.put("/top10/".concat(e),t)},deleteTop10ItemById:function(e){return G.delete("/top10/".concat(e))},getTop10ItemById:function(e){return G.get("/top10/".concat(e))}},B=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).componentDidMount=Object(x.a)(k.a.mark((function e(){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n.setState({isLoading:!0}),e.next=3,z.getAllTop10Items().then((function(e){n.setState({top10items:e.data.data,isLoading:!1,listLoaded:!0},(function(){return n.getTopX(n.state.top10items,n.state.topX)}))}));case 3:n.getBGGArray().then((function(e){n.setState({structuredTop10:e})}));case 4:case"end":return e.stop()}}),e)}))),n.addBGGData=function(){var e=Object(x.a)(k.a.mark((function e(t){var a,n;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("https://bgg-json.azurewebsites.net/thing/".concat(t.bgg_id));case 2:return a=e.sent,e.next=5,a.json();case 5:return n=e.sent,e.abrupt("return",Object.assign({},t,n));case 7:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.getBGGArray=Object(x.a)(k.a.mark((function e(){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.abrupt("return",Promise.all(n.state.sortedTop10Items.map((function(e){return n.addBGGData(e)}))));case 1:case"end":return e.stop()}}),e)}))),n.state={isLoading:!1,top10items:[],listLoaded:!1,structuredTop10:[],sortedTop10Items:[],topX:10},n.getTopX=n.getTopX.bind(Object(g.a)(n)),n.addBGGData=n.addBGGData.bind(Object(g.a)(n)),n.getBGGArray=n.getBGGArray.bind(Object(g.a)(n)),n}return Object(u.a)(a,[{key:"componentDidUpdate",value:function(){}},{key:"getTopX",value:function(e,t){var a=e.map((function(e){return e.bgg_id})).filter((function(e,t,a){return a.indexOf(e)===t}));console.log(a);var n=a.map((function(t){var a=e.filter((function(e){return e.bgg_id===t}));if(a.length>0){for(var n=0,r=0;r<a.length;r++)n+=11-a[r].rating;return{bgg_id:a[0].bgg_id,score:n}}return null}));return n=(n=(n=n.sort((function(e,t){return t.score-e.score}))).slice(0,t)).sort((function(e,t){return e.score-t.score})),this.setState({sortedTop10Items:n}),null}},{key:"render",value:function(){var e=this.state.structuredTop10.map((function(e){return r.a.createElement("div",{key:e.bgg_id},e.name," - ",e.bgg_id," - ",e.score)})),t=!1;return this.state.structuredTop10.length>0&&(t=!0),console.log(this.state.structuredTop10[0]),console.log(this.state.top10items),r.a.createElement("div",{style:{width:"100%"}},r.a.createElement("p",null,"The Top 10 Board Games Are:")," ",r.a.createElement("br",null),r.a.createElement(d.a,{xs:12,container:!0,justify:"center",direction:"row"},r.a.createElement(d.a,{xs:0,sm:0,md:1,lg:2}),r.a.createElement(d.a,{xs:12,sm:12,md:10,lg:8,container:!0,direction:"row",spacing:4},t?this.state.structuredTop10.map((function(e,t){return r.a.createElement(d.a,{item:!0,xs:12,sm:6,md:4,lg:4,xl:3},r.a.createElement(T,{bg:e,order:t}))})):r.a.createElement("div",null)),r.a.createElement(d.a,{xs:0,sm:0,md:1,lg:2})),e)}}]),a}(n.Component),_=a(57),S=a(141),A=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(e){var n;return Object(s.a)(this,a),(n=t.call(this,e)).handleChange=function(e){console.log("CHANGED"),n.setState(Object(_.a)({},e.target.name,e.target.value))},n.postTop10Items=function(){var e=Object(x.a)(k.a.mark((function e(t){return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,z.insertTop10Item(t).then((function(e){window.alert("Items inserted successfully")}));case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),n.handleSubmit=function(e){e.preventDefault();var t=n.state.games.split(/\r?\n/).map((function(e){var t=e.split(".")[0],a=e.split(". ")[1],r=a.split(" - ")[0],o=a.split(" - ")[1];return{author:n.state.author,channel:n.state.channel,channel_link:n.state.channel_link,source:n.state.source,year:parseInt(n.state.year),game:r,rating:parseInt(t),bgg_id:parseInt(o)}}));console.log(t),n.postTop10Items(t)},n.state={},n}return Object(u.a)(a,[{key:"render",value:function(){var e=this.state,t=e.author,a=e.channel,n=e.channel_link,o=e.source,c=e.year,l=e.games;return r.a.createElement("form",{onSubmit:this.handleSubmit,noValidate:!0,autoComplete:"off"},r.a.createElement(d.a,{item:!0,lg:12,container:!0},r.a.createElement(d.a,{item:!0,lg:1}),r.a.createElement(d.a,{item:!0,lg:10,container:!0,direction:"column"},r.a.createElement(S.a,{id:"standard-basic",label:"Author",value:t,name:"author",onChange:this.handleChange}),r.a.createElement(S.a,{id:"standard-basic",label:"Channel",value:a,name:"channel",onChange:this.handleChange}),r.a.createElement(S.a,{id:"standard-basic",label:"Channel Link",value:n,name:"channel_link",onChange:this.handleChange}),r.a.createElement(S.a,{id:"standard-basic",label:"Source",value:o,name:"source",onChange:this.handleChange}),r.a.createElement(S.a,{id:"standard-basic",label:"Year",value:c,name:"year",onChange:this.handleChange}),r.a.createElement(S.a,{id:"standard-basic",label:"Games",multiline:!0,rows:10,value:l,name:"games",onChange:this.handleChange}),r.a.createElement("input",{style:{marginTop:10,float:"right",width:150},type:"submit",value:"Add Itinerary Item"})),r.a.createElement(d.a,{item:!0,lg:1})))}}]),a}(n.Component),L=function(e){Object(p.a)(a,e);var t=Object(m.a)(a);function a(){return Object(s.a)(this,a),t.apply(this,arguments)}return Object(u.a)(a,[{key:"render",value:function(){return r.a.createElement("div",null,r.a.createElement("p",null,"In this page you'll see the form to update the top 10s"))}}]),a}(n.Component);a(94);var D=function(){return r.a.createElement(l.a,null,r.a.createElement(h,null),r.a.createElement(i.c,null,r.a.createElement(i.a,{path:"/top10/list",exact:!0,component:B}),r.a.createElement(i.a,{path:"/top10/create",exact:!0,component:A}),r.a.createElement(i.a,{path:"/top10/update/:id",exact:!0,component:L})))};c.a.render(r.a.createElement(D,null),document.getElementById("root"))}},[[66,1,2]]]);
//# sourceMappingURL=main.d0365231.chunk.js.map