(this["webpackJsonpplatform-arena"]=this["webpackJsonpplatform-arena"]||[]).push([[0],{130:function(e,t){},133:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(27),c=a.n(l),o=(a(75),a(2)),s=a(13),i=(a(76),a(29)),u=a.n(i),m=a(12),E=a.n(m),p=function(e){e?E.a.defaults.headers.common.Authorization=e:delete E.a.defaults.headers.common.Authorization},d=function(){return function(e){e({type:"GET_ERRORS",payload:{}})}},h=function(e){return{type:"SET_CURRENT_USER",payload:e}},f=function(){return function(e){localStorage.removeItem("jwtToken"),p(!1),e(h({}))}},g=a(3),b=a(14),v=a(66),O=a(21),y=a(99),R={isAuthenticated:!1,user:{},loading:!1},w={},T={user:"",room:"",character:""},_={handler:{}},L=Object(b.c)({auth:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:R,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"SET_CURRENT_USER":return Object(O.a)({},e,{isAuthenticated:!y(t.payload),user:t.payload});case"USER_LOADING":return Object(O.a)({},e,{loading:!0});default:return e}},errors:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:w,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_ERRORS":return t.payload;default:return e}},player:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:T,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_USER_ROOM":return{user:t.payload.user,room:t.payload.room};case"RESET_ROOM":return Object(O.a)({},e,{room:""});default:return e}},network:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:_,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case"GET_NETWORK_HANDLER":return{handler:t.payload};default:return e}}}),I=Object(b.d)(L,{},Object(b.a)(v.a)),P=Object(g.b)((function(e){return{auth:e.auth}}))((function(e){return r.a.createElement("div",{className:"navbar-fixed"},r.a.createElement("nav",{className:"z-depth-0"},r.a.createElement("div",{className:"nav-wrapper light-blue lighten-4"},r.a.createElement(o.b,{to:"/",style:{fontFamily:"Verdana, Geneva, sans-serif"},className:"col s5 brand-logo center black-text"},r.a.createElement("i",{className:"material-icons"},"horizontal_split"),"Platform Arena"),r.a.createElement("ul",{className:"right hide-on-med-and-down"},r.a.createElement("li",null,r.a.createElement(o.b,{to:"/how-to-play",style:{fontFamily:"Verdana, Geneva, sans-serif"},className:"col s5 black-text"},"How To Play")),!e.auth.isAuthenticated&&r.a.createElement(r.a.Fragment,null,r.a.createElement("li",null,r.a.createElement(o.b,{to:"/register",style:{fontFamily:"Verdana, Geneva, sans-serif"},className:"col s5 black-text"},"Register")),r.a.createElement("li",null,r.a.createElement(o.b,{to:"/login",style:{fontFamily:"Verdana, Geneva, sans-serif"},className:"col s5 black-text"},"Login"))),e.auth.isAuthenticated&&r.a.createElement("li",null,r.a.createElement(o.b,{to:"/profile",style:{fontFamily:"Verdana, Geneva, sans-serif"},className:"col s5 black-text"},"Profile"))))))})),A=a(4),N=a(10),H=a.n(N),S=Object(g.b)((function(e){return{auth:e.auth,errors:e.errors}}),{registerUser:function(e,t){return function(a){E.a.post("/users/register",e).then((function(e){a({type:"GET_ERRORS",payload:{}}),t.push("/login")})).catch((function(e){return a({type:"GET_ERRORS",payload:e.response.data})}))}},resetErrors:d})(Object(s.g)((function(e){var t=Object(n.useState)(""),a=Object(A.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)(""),i=Object(A.a)(s,2),u=i[0],m=i[1],E=Object(n.useState)(""),p=Object(A.a)(E,2),d=p[0],h=p[1],f=Object(n.useState)(""),g=Object(A.a)(f,2),b=g[0],v=g[1],O=Object(n.useState)({}),y=Object(A.a)(O,2),R=y[0],w=y[1],T=e.resetErrors;Object(n.useEffect)((function(){T()}),[T]),Object(n.useEffect)((function(){e.errors&&w(e.errors)}),[e.errors]),Object(n.useEffect)((function(){e.auth.isAuthenticated&&e.history.push("/join")}),[e.auth.isAuthenticated,e.history]);return r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s8 offset-s2"},r.a.createElement(o.b,{to:"/",className:"btn-flat waves-effect"},r.a.createElement("i",{className:"material-icons left"},"keyboard_backspace"),"Back to Home"),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("h4",null,"Register below"),r.a.createElement("p",{className:"grey-text text-darken-1"},"Already have an account?",r.a.createElement(o.b,{to:"/login"}," Log in "))),r.a.createElement("form",{noValidate:!0,onSubmit:function(t){t.preventDefault();var a={username:l,email:u,password:d,password2:b};e.registerUser(a,e.history)}},r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return c(e.target.value)},value:l,error:R.username,id:"name",type:"text",className:H()("",{invalid:R.username})}),r.a.createElement("label",{htmlFor:"name"},"Username"),r.a.createElement("span",{className:"red-text"},R.username)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return m(e.target.value)},value:u,error:R.email,id:"email",type:"email",className:H()("",{invalid:R.email})}),r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("span",{className:"red-text"},R.email)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return h(e.target.value)},value:d,error:R.password,id:"password",type:"password",className:H()("",{invalid:R.password})}),r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("span",{className:"red-text"},R.password)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return v(e.target.value)},value:b,error:R.password2,className:H()("",{invalid:R.password2}),id:"password2",type:"password"}),r.a.createElement("label",{htmlFor:"password2"},"Confirm Password"),r.a.createElement("span",{className:"red-text"},R.password2)),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("button",{style:{width:"150px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},type:"submit",className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Sign up"))))))}))),k=Object(g.b)((function(e){return{auth:e.auth,errors:e.errors}}),{loginUser:function(e){return function(t){E.a.post("/users/login",e).then((function(e){var a=e.data.token;localStorage.setItem("jwtToken",a),p(a);var n=u()(a);console.log(n),t(h(n))})).catch((function(e){return t({type:"GET_ERRORS",payload:e.response.data})}))}},resetErrors:d})((function(e){var t=Object(n.useState)(""),a=Object(A.a)(t,2),l=a[0],c=a[1],s=Object(n.useState)(""),i=Object(A.a)(s,2),u=i[0],m=i[1],E=Object(n.useState)({}),p=Object(A.a)(E,2),d=p[0],h=p[1],f=e.resetErrors;Object(n.useEffect)((function(){f()}),[f]),Object(n.useEffect)((function(){e.auth.isAuthenticated&&e.history.push("/"),e.errors&&h(e.errors)}),[e.errors,e.auth.isAuthenticated,e.history]);return r.a.createElement("div",{className:"container"},r.a.createElement("div",{style:{marginTop:"4rem"},className:"row"},r.a.createElement("div",{className:"col s8 offset-s2"},r.a.createElement(o.b,{to:"/",className:"btn-flat waves-effect"},r.a.createElement("i",{className:"material-icons left"},"keyboard_backspace")," Back to home"),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("h4",null,"Login below"),r.a.createElement("p",{className:"grey-text text-darken-1"},"Don't have an account? ",r.a.createElement(o.b,{to:"/register"},"Register"))),r.a.createElement("form",{noValidate:!0,onSubmit:function(t){t.preventDefault();var a={email:l,password:u};e.loginUser(a)}},r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return c(e.target.value)},value:l,error:d.email,id:"email",type:"email",className:H()("",{invalid:d.email||d.emailNotFound})}),r.a.createElement("label",{htmlFor:"email"},"Email"),r.a.createElement("span",{className:"red-text"},d.email,d.emailNotFound)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return m(e.target.value)},value:u,error:d.password,id:"password",type:"password",className:H()("",{invalid:d.password||d.passwordIncorrect})}),r.a.createElement("label",{htmlFor:"password"},"Password"),r.a.createElement("span",{className:"red-text"},d.password,d.passwordIncorrect)),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("button",{style:{width:"150px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},type:"submit",className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Login"))))))})),B=Object(g.b)((function(e){return{auth:e.auth}}),{logoutUser:f})((function(e){return r.a.createElement("div",{style:{height:"75vh"},className:"container valign-wrapper"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col s12 center-align"},r.a.createElement("h4",null,r.a.createElement("p",{className:"flow-text grey-text text-darken-1"},"Welcome to your profile. Stats coming soon!")),r.a.createElement("button",{style:{width:"150px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},onClick:function(t){t.preventDefault(),e.logoutUser()},className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Logout"))))})),D=a(6),x=a.n(D),M=a(18),G=a(68),j=a.n(G),U=a(19),C=[],W={},Y=!1,F=0,K=0;function V(){return W}function X(e){W=e}function z(){return Y}function J(e){Y=e}function Q(e){K||(K=e.t,F=Date.now()),C.push(e);var t=Z();t>0&&C.splice(0,t)}function q(){return K+(Date.now()-F)-100}function Z(){for(var e=q(),t=C.length-1;t>=0;t--)if(C[t].t<=e)return t;return-1}function $(e,t,a){if(!t)return e;var n={};return Object.keys(e).forEach((function(r){n[r]="direction"===r?function(e,t,a){return Math.abs(t-e)>=Math.PI?e>t?e+(t+2*Math.PI-e)*a:e-(t-2*Math.PI-e)*a:e+(t-e)*a}(e[r],t[r],a):"specialAmmo"===r||"username"===r?e[r]:e[r]+(t[r]-e[r])*a})),n}function ee(e,t,a){return e.map((function(e){return $(e,t.find((function(t){return e.id===t.id})),a)}))}var te=a(64),ae=function e(){var t=this;Object(M.a)(this,e),this.connectToServer=function(){return new Promise((function(e){t.socket.on("connect",(function(){console.log("Connected to server!"),e()}))})).then((function(){t.socket.on(te.MSG_TYPES.LOBBY_UPDATE,X),t.socket.on(te.MSG_TYPES.GAME_UPDATE,Q),t.socket.on(te.MSG_TYPES.START_GAME,J),t.socket.on("disconnect",(function(){console.log("Disconnected from server.")}))}))},this.joinLobby=function(e,a){t.socket.emit(te.MSG_TYPES.JOIN_LOBBY,e,a)},this.updateLobby=function(e,a){t.socket.emit(te.MSG_TYPES.LOBBY_UPDATE,e,a)},this.disconnect=function(){t.socket.disconnect()},this.startGame=function(e){t.socket.emit(te.MSG_TYPES.START_GAME,e)},this.sendClick=Object(U.b)(20,(function(e,a,n){t.socket.emit(te.MSG_TYPES.CLICK,e,a,n,te.MSG_TYPES.CLICK)})),this.sendKeyPress=Object(U.b)(20,(function(e,a){t.socket.emit(te.MSG_TYPES.KEYPRESS,e,a,te.MSG_TYPES.KEYPRESS)})),this.sendKeyUp=Object(U.b)(20,(function(e,a){t.socket.emit(te.MSG_TYPES.KEYUP,e,a,te.MSG_TYPES.KEYUP)})),this.socketProtocol=window.location.protocol.includes("https")?"wss":"ws",this.socket=j()("".concat(this.socketProtocol,"://localhost:5000"),{reconnection:!1})},ne=Object(g.b)((function(e){return{player:e.player,network:e.network}}),{setNetworkHandler:function(e){return function(t){t({type:"GET_NETWORK_HANDLER",payload:e})}}})((function(e){var t=Object(n.useRef)(),a=Object(n.useState)({}),l=Object(A.a)(a,2),c=l[0],s=l[1],i=Object(n.useState)(!1),u=Object(A.a)(i,2),m=u[0],E=u[1],p=Object(n.useRef)(),d=Object.keys(c).map((function(e){return r.a.createElement("li",{key:e},r.a.createElement("div",{className:"card col s1"},c[e].username,r.a.createElement("div",{className:"card-image"},c[e].character===x.a.PANDA&&r.a.createElement("img",{src:"/assets/pandaRight.png",alt:"Panda"}),c[e].character===x.a.SEAL&&r.a.createElement("img",{src:"/assets/sealRight.png",alt:"Seal"}),c[e].character===x.a.DINO&&r.a.createElement("img",{src:"/assets/dinoRight.png",alt:"Dino"}),c[e].character===x.a.EAGLE&&r.a.createElement("img",{src:"/assets/eagleRight.png",alt:"Eagle"})),c[e].character===x.a.PANDA&&"Panda",c[e].character===x.a.SEAL&&"Seal",c[e].character===x.a.DINO&&"Dino",c[e].character===x.a.EAGLE&&"Eagle"))}));Object(n.useEffect)((function(){""!==e.player.room?(0===Object.keys(e.network.handler).length?(t.current=new ae,e.setNetworkHandler(t.current),t.current.connectToServer().then((function(){t.current.joinLobby(e.player.user,e.player.room)}))):t.current=e.network.handler,p.current=setInterval((function(){s(V),E(z)}),1e3/60)):e.history.push("/")}),[]),Object(n.useEffect)((function(){m&&(clearInterval(p.current),e.history.push("/game"))}),[m]);var h=function(a){t.current.updateLobby(a,e.player.room)};return r.a.createElement("div",{style:{height:"75vh"},className:"container valign-wrapper"},r.a.createElement("div",{style:{marginTop:"4rem"},className:"row"},r.a.createElement("div",{className:"col s12 center-align"},r.a.createElement(o.b,{to:"/",className:"btn-flat waves-effect"},r.a.createElement("i",{className:"material-icons left"},"keyboard_backspace"),"Leave"),r.a.createElement("div",{className:"col s12"},r.a.createElement("h4",null,r.a.createElement("span",{style:{fontFamily:"Verdana, Geneva, sans-serif"}},"Lobby")),r.a.createElement("br",null)),r.a.createElement("div",{className:"col s12 center-align"},r.a.createElement("div",{className:"card col s1 hoverable"},r.a.createElement("div",{className:"card-image",onClick:function(e){return h(x.a.PANDA)}},r.a.createElement("img",{src:"/assets/pandaRight.png",alt:"Panda"})),"Panda"),r.a.createElement("div",{className:"card col s1 hoverable"},r.a.createElement("div",{className:"card-image",onClick:function(e){return h(x.a.SEAL)}},r.a.createElement("img",{src:"/assets/sealRight.png",alt:"Seal"})),"Seal"),r.a.createElement("div",{className:"card col s1 hoverable"},r.a.createElement("div",{className:"card-image",onClick:function(e){return h(x.a.DINO)}},r.a.createElement("img",{src:"/assets/dinoRight.png",alt:"Dino"})),"Dino"),r.a.createElement("div",{className:"card col s1 hoverable"},r.a.createElement("div",{className:"card-image",onClick:function(e){return h(x.a.EAGLE)}},r.a.createElement("img",{src:"/assets/eagleRight.png",alt:"Eagle"})),"Eagle")),r.a.createElement("div",{className:"col s12 center-align"},r.a.createElement("ul",null,d)),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("button",{onClick:function(){t.current.startGame(e.player.room)},style:{width:"250px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},"Start")))))})),re=a(30),le={},ce=Promise.all(["ship.svg","bullet.svg","greenBullet.png","blueBullet.png","redBullet.png","yellowBullet.png","pandaRight.png","pandaLeft.png","sealLeft.png","sealRight.png","dinoLeft.png","dinoRight.png","eagleLeft.png","eagleRight.png","explosion.png","drillRight.png","bomb.png","mine.png","drillPowerup.png","minePowerup.png","bombPowerup.png","reflectPowerup.png","crown.png","bamboo.png","laser.png","fireCloud.png","teleportBulletRight.png","teleportBulletLeft.png"].map((function(e){return new Promise((function(t){var a=new Image;a.onload=function(){console.log("Downloaded ".concat(e)),le[e]=a,t()},a.src="/assets/".concat(e)}))})));var oe=function(e){return le[e]},se=a(6),ie=a(64),ue=ie.PLAYER_WIDTH,me=ie.PLAYER_HEIGHT,Ee=ie.BULLET_WIDTH,pe=ie.BULLET_HEIGHT,de=ie.DRILL_WIDTH,he=ie.DRILL_HEIGHT,fe=ie.EXPLOSION_WIDTH,ge=ie.EXPLOSION_HEIGHT,be=ie.BOMB_WIDTH,ve=ie.BOMB_HEIGHT,Oe=ie.MINE_WIDTH,ye=ie.MINE_HEIGHT,Re=ie.POWERUP_WIDTH,we=ie.POWERUP_HEIGHT,Te=ie.PLAYER_POWERUP_WIDTH,_e=ie.PLAYER_POWERUP_HEIGHT,Le=function(){function e(t){var a=this;Object(M.a)(this,e),this.canvas=t,this.context=t.getContext("2d"),Ie(t),window.addEventListener("resize",Object(U.a)(40,Ie)),this.renderInterval=setInterval((function(){return Pe(a.canvas,a.context)}),1e3/60)}return Object(re.a)(e,[{key:"startRendering",value:function(){var e=this;clearInterval(this.renderInterval),this.renderInterval=setInterval((function(){return Pe(e.canvas,e.context)}),1e3/60),console.log("Starting rendering")}},{key:"stopRendering",value:function(){clearInterval(this.renderInterval),console.log("Stopping rendering")}}]),e}();function Ie(e){e.width=ie.WIDTH,e.height=ie.HEIGHT}function Pe(e,t){var a=function(){if(!K)return{};var e=Z(),t=q();if(e<0||e===C.length-1)return C[C.length-1];var a=C[e],n=C[e+1],r=(t-a.t)/(n.t-a.t);return{me:$(a.me,n.me,r),others:ee(a.others,n.others,r),platforms:a.platforms,weapons:ee(a.weapons,n.weapons,r),powerups:a.powerups}}(),n=a.me,r=a.others,l=a.platforms,c=a.weapons,o=a.powerups;n&&(!function(e){e.fillStyle="#b0b0f5",e.fillRect(0,0,ie.WIDTH,ie.HEIGHT)}(t),l.forEach((function(e){!function(e,t){var a=e.createLinearGradient(t.x,t.y+t.height,t.x+t.width,t.y);a.addColorStop(0,"#1d5e8c"),a.addColorStop(1,"#57a4da"),e.fillStyle=a,e.fillRect(t.x,t.y,t.width,t.height)}(t,e)})),c.forEach((function(e){switch(e.type){case se.BULLET:!function(e,t){if(t.character===se.SEAL)return void e.drawImage(oe("blueBullet.png"),t.x,t.y,Ee,pe);var a=oe("greenBullet.png");t.character===se.PANDA?a=oe("greenBullet.png"):t.character===se.DINO?a=oe("yellowBullet.png"):t.character===se.EAGLE&&(a=oe("redBullet.png"));e.save(),e.translate(t.x+Ee/2,t.y+pe/2),e.rotate(Math.PI/2-t.dir),e.drawImage(a,-Ee/2,-pe/2,Ee,pe),e.restore()}(t,e);break;case se.DRILL:!function(e,t){e.save(),e.translate(t.x+de/2,t.y+he/2),e.rotate(Math.PI/2-t.dir),e.drawImage(oe("drillRight.png"),-de/2,-he/2,de,he),e.restore()}(t,e);break;case se.BOMB:!function(e,t){e.drawImage(oe("bomb.png"),t.x,t.y,be,ve)}(t,e);break;case se.MINE:!function(e,t){e.drawImage(oe("mine.png"),t.x,t.y,Oe,ye)}(t,e);break;case se.TELEPORT_BULLET:!function(e,t){var a=oe("teleportBulletRight.png");t.dir>Math.PI&&(a=oe("teleportBulletLeft.png"));e.drawImage(a,t.x,t.y,ie.TELEPORT_BULLET_WIDTH,ie.TELEPORT_BULLET_HEIGHT)}(t,e);break;case se.FIRE_CLOUD:!function(e,t){t.cooldown<=5?e.globalAlpha=.75:e.globalAlpha=.3;e.drawImage(oe("fireCloud.png"),t.x,t.y,t.width,t.height),e.globalAlpha=1}(t,e)}})),o.forEach((function(e){!function(e,t){switch(t.type){case se.DRILL_POWERUP:e.drawImage(oe("drillPowerup.png"),t.x,t.y,Re,we);break;case se.MINE_POWERUP:e.drawImage(oe("minePowerup.png"),t.x,t.y,Re,we);break;case se.BOMB_POWERUP:e.drawImage(oe("bombPowerup.png"),t.x,t.y,Re,we);break;case se.REFLECT_POWERUP:e.drawImage(oe("reflectPowerup.png"),t.x,t.y,Re,we)}}(t,e)})),0!==Object.keys(n).length?(Ae(t,n),Ne(t,n),He(t,n),0===r.length&&Se(t,n)):1===r.length&&Se(t,r[0]),r.forEach((function(e){Ae(t,e),Ne(t,e),He(t,e)})),c.forEach((function(e){e.type===se.EXPLOSION?function(e,t){e.drawImage(oe("explosion.png"),t.x,t.y,fe,ge)}(t,e):e.type===se.LASER?function(e,t){0!==t.cooldown&&(e.globalAlpha=.5);t.dir>0?e.drawImage(oe("laser.png"),t.x,t.y,t.width,ie.LASER_HEIGHT):e.drawImage(oe("laser.png"),t.x-t.width,t.y,t.width,ie.LASER_HEIGHT);e.globalAlpha=1}(t,e):e.type===se.BAMBOO&&function(e,t){Math.abs(Math.sin(t.dir))>.5?e.drawImage(oe("bamboo.png"),t.x,t.y,ie.BAMBOO_WIDTH,ie.BAMBOO_HEIGHT):(e.save(),e.translate(t.x+ie.BAMBOO_HEIGHT/2,t.y+ie.BAMBOO_WIDTH/2),e.rotate(Math.PI/2),e.drawImage(oe("bamboo.png"),-ie.BAMBOO_WIDTH/2,-ie.BAMBOO_HEIGHT/2,ie.BAMBOO_WIDTH,ie.BAMBOO_HEIGHT),e.restore())}(t,e)})))}function Ae(e,t){var a=oe("pandaRight.png");t.character===se.PANDA?a=t.faceRight?oe("pandaRight.png"):oe("pandaLeft.png"):t.character===se.SEAL?a=t.faceRight?oe("sealRight.png"):oe("sealLeft.png"):t.character===se.DINO?a=t.faceRight?oe("dinoRight.png"):oe("dinoLeft.png"):t.character===se.EAGLE&&(a=t.faceRight?oe("eagleRight.png"):oe("eagleLeft.png")),e.drawImage(a,t.x,t.y,ue,me)}function Ne(e,t){var a="rgb(".concat(20+135*(100-t.health)/50,", 155, 20)");t.health<=50&&(a="rgb(155, ".concat(155-135*(50-t.health)/50,", 20)")),t.abilityMeter>=100&&(e.fillStyle="white",e.fillRect(t.x-2,t.y-ie.HEALTHBAR_HEIGHT-7,ie.HEALTHBAR_WIDTH*t.health/100+4,ie.HEALTHBAR_HEIGHT+4)),e.fillStyle=a,e.fillRect(t.x,t.y-ie.HEALTHBAR_HEIGHT-5,ie.HEALTHBAR_WIDTH*t.health/100,ie.HEALTHBAR_HEIGHT),e.fillStyle="black",e.textAlign="center",e.fillText(t.username,t.x+ie.PLAYER_WIDTH/2,t.y-ie.HEALTHBAR_HEIGHT-10)}function He(e,t){switch(t.powerup){case se.DRILL_POWERUP:e.drawImage(oe("drillPowerup.png"),t.x+5,t.y+me+5,Te,_e);break;case se.MINE_POWERUP:e.drawImage(oe("minePowerup.png"),t.x+5,t.y+me+5,Te,_e);break;case se.BOMB_POWERUP:e.drawImage(oe("bombPowerup.png"),t.x+5,t.y+me+5,Te,_e);break;case se.REFLECT_POWERUP:e.drawImage(oe("reflectPowerup.png"),t.x+5,t.y+me+5,Te,_e)}t.powerup!==se.NO_POWERUP&&(e.font="12px Arial",e.fillStyle="black",e.fillText(t.specialAmmo,t.x+20,t.y+me+15))}function Se(e,t){e.drawImage(oe("crown.png"),t.x,t.y-ie.HEALTHBAR_HEIGHT-40,ie.PLAYER_WIDTH,18)}var ke=function(){function e(t,a,n){Object(M.a)(this,e),this.room=t,this.networkHandler=a,this.canvas=n,this.props={room:this.room,networkHandler:this.networkHandler,canvas:this.canvas},this.onClickEvent=this.onClick.bind(this.props),this.onKeyPressEvent=this.onKeyPress.bind(this.props),this.onKeyUpEvent=this.onKeyUp.bind(this.props)}return Object(re.a)(e,[{key:"onClick",value:function(e){if(0===e.button){var t=this.canvas.offsetLeft+this.canvas.clientLeft,a=this.canvas.offsetTop+this.canvas.clientTop;this.networkHandler.sendClick(e.pageX-t,e.pageY-a,this.room)}}},{key:"onKeyPress",value:function(e){var t=String.fromCharCode(e.keyCode).toUpperCase();["W","A","D","Q"].includes(t)&&this.networkHandler.sendKeyPress(t,this.room)}},{key:"onKeyUp",value:function(e){var t=String.fromCharCode(e.keyCode).toUpperCase();["A","D"].includes(t)&&this.networkHandler.sendKeyUp(t,this.room)}},{key:"startCapturingInput",value:function(){this.canvas.addEventListener("click",this.onClickEvent),window.addEventListener("keypress",this.onKeyPressEvent),window.addEventListener("keyup",this.onKeyUpEvent),console.log("Starting to capture input")}},{key:"stopCapturingInput",value:function(){this.canvas.removeEventListener("click",this.onClickEvent),window.removeEventListener("keypress",this.onKeyPressEvent),window.removeEventListener("keyup",this.onKeyUpEvent),console.log("Stopping capture input")}}]),e}(),Be=function(){return function(e){e({type:"RESET_ROOM",payload:{}})}},De=Object(g.b)((function(e){return{player:e.player,network:e.network}}),{resetRoom:Be})((function(e){var t=Object(n.useRef)(null),a=Object(n.useRef)(),l=Object(n.useRef)();return Object(n.useEffect)((function(){if(""!==e.player.room)return ce.then((function(){F=0,K=0,t.current&&(a.current=new Le(t.current),a.current.startRendering())})).catch(console.error),l.current=new ke(e.player.room,e.network.handler,t.current),l.current.startCapturingInput(),e.resetRoom(),Y=!1,function(){l.current instanceof ke&&l.current.stopCapturingInput(),a.current instanceof Le&&a.current.stopRendering()};e.history.push("/")}),[]),r.a.createElement("canvas",{ref:t})})),xe=function(){return r.a.createElement("div",{style:{height:"75vh"},className:"container"},r.a.createElement("div",{style:{marginTop:"4rem"},className:"row"},r.a.createElement("div",{className:"col s12 center-align"},r.a.createElement(o.b,{to:"/",className:"btn-flat waves-effect"},r.a.createElement("i",{className:"material-icons left"},"keyboard_backspace"),"Back"),r.a.createElement("div",{className:"col s12"},r.a.createElement("h4",null,r.a.createElement("span",{style:{fontFamily:"Verdana, Geneva, sans-serif"}},"How To Play")),r.a.createElement("br",null)),r.a.createElement("div",{class:"col s12"},r.a.createElement("div",{class:"card-panel"},r.a.createElement("p",null,"Platform Arena is a platformer fighting game. Eliminate all your enemies to win! ",r.a.createElement("br",null),"When your healthbar is glowing, you can use your ability! These are the controls: ",r.a.createElement("br",null),"W - Jump ",r.a.createElement("br",null),"A - Left ",r.a.createElement("br",null),"D - Right ",r.a.createElement("br",null),"Left Mouse Click - Shoot or Use Powerup ",r.a.createElement("br",null),"Q - Ability ",r.a.createElement("br",null)))),r.a.createElement("div",{class:"col s12"},r.a.createElement("div",{class:"card-panel"},r.a.createElement("p",null,"There are 4 playable characters, each with unique bullets and abilities."),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/pandaRight.png",alt:"Panda"}),"\u2002- Panda has a fast bullet with a high fire rate. Their special ability is to launch a bamboo storm."),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/sealRight.png",alt:"Seal"}),"\u2002- Seal has a very slow water bullet with a slow fire rate. Their special ability is a laser."),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/dinoRight.png",alt:"Dino"}),"\u2002- Dino has a slow explosive bullet with a slow fire rate. Their special ability is a fire cloud"),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/eagleRight.png",alt:"Eagle"}),"\u2002- Eagle has a very fast weaker bullet with a very high fire rate. Their special ability is a teleporting bullet."))),r.a.createElement("div",{class:"col s12"},r.a.createElement("div",{class:"card-panel"},r.a.createElement("p",null,"Collect powerups to gain special weapons."),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/drillPowerup.png",alt:"Drill"}),"\u2002- Drill breaks through platforms and explodes"),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/minePowerup.png",alt:"Mine"}),"\u2002- Mine stays on the ground and explodes when stepped on"),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/bombPowerup.png",alt:"Bomb"}),"\u2002- Bomb bounces around like a projectile and explodes"),r.a.createElement("p",null,r.a.createElement("img",{src:"/assets/reflectPowerup.png",alt:"Reflect"}),"\u2002- Reflecting bullets bounce around before disappearing"))))))},Me=Object(g.b)((function(e){return{auth:e.auth,errors:e.errors,network:e.network}}),{joinRoom:function(e,t){return function(a){E.a.post("/game/join",e).then((function(n){a({type:"GET_ERRORS",payload:{}}),a({type:"GET_USER_ROOM",payload:{user:e.username,room:e.room}}),t.push("/lobby")})).catch((function(e){console.log(e.response.data),a({type:"GET_ERRORS",payload:e.response.data})}))}},resetErrors:d,resetRoom:Be,resetNetworkHandler:function(){return function(e){e({type:"GET_NETWORK_HANDLER",payload:{}})}}})((function(e){var t=Object(n.useState)(""),a=Object(A.a)(t,2),l=a[0],c=a[1],o=Object(n.useState)(""),s=Object(A.a)(o,2),i=s[0],u=s[1],m=Object(n.useState)({}),E=Object(A.a)(m,2),p=E[0],d=E[1];Object(n.useEffect)((function(){e.auth.isAuthenticated&&c(e.auth.user.username),e.resetRoom(),0!==Object.keys(e.network.handler).length&&e.network.handler.disconnect(),e.resetNetworkHandler()}),[]),Object(n.useEffect)((function(){e.errors&&d(e.errors)}),[e.errors]);return r.a.createElement("div",{style:{height:"75vh"},className:"container valign-wrapper"},r.a.createElement("div",{style:{marginTop:"4rem"},className:"row"},r.a.createElement("div",{className:"col s8 offset-s2 center-align"},r.a.createElement("div",{className:"col s12"},r.a.createElement("h4",null,r.a.createElement("span",{style:{fontFamily:"Verdana, Geneva, sans-serif"}},"Platform Arena")),r.a.createElement("p",{className:"flow-text grey-text text-darken-1"},"A multiplayer fighting game."),r.a.createElement("br",null)),r.a.createElement("form",{noValidate:!0,onSubmit:function(t){t.preventDefault();var a={username:l,room:i};e.joinRoom(a,e.history)}},e.auth.isAuthenticated?r.a.createElement("p",{className:"flow-text grey-text text-darken-1"},"Welcome back ",e.auth.user.username,"!"):r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return c(e.target.value)},value:l,error:p.username,id:"name",type:"text",className:H()("",{invalid:p.username})}),r.a.createElement("label",{htmlFor:"username"},"Username"),r.a.createElement("span",{className:"red-text"},p.username)),r.a.createElement("div",{className:"input-field col s12"},r.a.createElement("input",{onChange:function(e){return u(e.target.value)},value:i,error:p.room,id:"email",type:"email",className:H()("",{invalid:p.room})}),r.a.createElement("label",{htmlFor:"room"},"Room"),r.a.createElement("span",{className:"red-text"},p.room)),r.a.createElement("div",{className:"col s12",style:{paddingLeft:"11.250px"}},r.a.createElement("button",{style:{width:"250px",borderRadius:"3px",letterSpacing:"1.5px",marginTop:"1rem"},type:"submit",className:"btn btn-large waves-effect waves-light hoverable blue accent-3"},e.auth.isAuthenticated?"Play":"Play as Guest"))))))})),Ge=a(69),je=Object(g.b)((function(e){return{auth:e.auth}}))((function(e){var t=e.component,a=e.auth,n=Object(Ge.a)(e,["component","auth"]);return r.a.createElement(s.b,Object.assign({},n,{render:function(e){return!0===a.isAuthenticated?r.a.createElement(t,e):r.a.createElement(s.a,{to:"/login"})}}))}));if(localStorage.jwtToken){var Ue=localStorage.jwtToken;p(Ue);var Ce=u()(Ue);I.dispatch(h(Ce));var We=Date.now()/1e3;Ce.exp<We&&(I.dispatch(f()),window.location.href="./login")}var Ye=function(){return r.a.createElement("div",null,r.a.createElement(P,null),r.a.createElement(s.b,{exact:!0,path:"/",component:Me}),r.a.createElement(s.b,{exact:!0,path:"/register",component:S}),r.a.createElement(s.b,{exact:!0,path:"/login",component:k}),r.a.createElement(s.b,{exact:!0,path:"/how-to-play",component:xe}),r.a.createElement(s.d,null,r.a.createElement(je,{exact:!0,path:"/profile",component:B})))},Fe=function(){return r.a.createElement(g.a,{store:I},r.a.createElement(o.a,null,r.a.createElement("div",{className:"App"},r.a.createElement(s.d,null,r.a.createElement(s.b,{exact:!0,path:"/lobby",component:ne}),r.a.createElement(s.b,{exact:!0,path:"/game",component:De}),r.a.createElement(s.b,{component:Ye})))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(Fe,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},6:function(e,t){e.exports=Object.freeze({PLAYER:1,BULLET:2,PLATFORM:3,POWERUP:4,NO_POWERUP:5,SHIELD_POWERUP:6,DRILL_POWERUP:7,BOMB_POWERUP:8,MINE_POWERUP:9,REFLECT_POWERUP:10,DRILL:11,BOMB:12,MINE:13,EXPLOSION:14,NO_CHARACTER:15,PANDA:16,SEAL:17,DINO:18,EAGLE:19,BAMBOO_STORM:20,BAMBOO:21,LASER:22,FIRE_CLOUD:23,TELEPORT_BULLET:24})},64:function(e,t){e.exports=Object.freeze({PLAYER_WIDTH:32,PLAYER_HEIGHT:32,PLAYER_MAX_HP:100,PLAYER_SPEED:400,PLAYER_JUMP:800,PLAYER_GRAVITY:50,PLAYER_FIRE_COOLDOWN:.5,BULLET_WIDTH:32,BULLET_HEIGHT:10,BULLET_SPEED:600,BULLET_DAMAGE:10,REFLECT_BULLET_BOUNCES:5,REFLECT_BULLET_COOLDOWN:10,DRILL_WIDTH:32,DRILL_HEIGHT:24,DRILL_SPEED:300,BOMB_WIDTH:32,BOMB_HEIGHT:32,BOMB_SPEED:600,BOMB_GRAVITY:10,BOMB_COOLDOWN:10,BOMB_LIFETIME:100,MINE_WIDTH:32,MINE_HEIGHT:8,MINE_SPEED:100,MINE_COOLDOWN:50,EXPLOSION_WIDTH:64,EXPLOSION_HEIGHT:64,EXPLOSION_DAMAGE:10,BAMBOO_STORM_COOLDOWN:25,BAMBOO_STORM_TIMES:16,BAMBOO_WIDTH:256,BAMBOO_HEIGHT:64,BAMBOO_SPEED:600,BAMBOO_COOLDOWN:40,BAMBOO_DAMAGE:20,LASER_HEIGHT:32,LASER_COOLDOWN:20,LASER_LIFETIME:60,LASER_DAMAGE:20,FIRE_CLOUD_WIDTH:300,FIRE_CLOUD_HEIGHT:300,FIRE_CLOUD_COOLDOWN:50,FIRE_CLOUD_LIFETIME:500,FIRE_CLOUD_DAMAGE:15,TELEPORT_BULLET_WIDTH:32,TELEPORT_BULLET_HEIGHT:10,TELEPORT_BULLET_SPEED:1200,TELEPORT_BULLET_DAMAGE:15,PLATFORM_WIDTH:32,PLATFORM_HEIGHT:32,PLATFORM_RESPAWN:500,POWERUP_WIDTH:20,POWERUP_HEIGHT:20,PLAYER_POWERUP_WIDTH:10,PLAYER_POWERUP_HEIGHT:10,HEALTHBAR_WIDTH:32,HEALTHBAR_HEIGHT:8,SCORE_BULLET_HIT:20,SCORE_PER_SECOND:1,WIDTH:1024,HEIGHT:736,MAP_SIZE:3e3,MSG_TYPES:{JOIN_LOBBY:"join_lobby",START_GAME:"start_game",LOBBY_UPDATE:"lobby_update",GAME_UPDATE:"update",KEYPRESS:"keypress",KEYUP:"keyup",CLICK:"click",GAME_OVER:"dead"}})},70:function(e,t,a){e.exports=a(133)},75:function(e,t,a){},76:function(e,t,a){}},[[70,1,2]]]);
//# sourceMappingURL=main.588aa225.chunk.js.map