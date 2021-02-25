(this.webpackJsonptensorflow=this.webpackJsonptensorflow||[]).push([[0],{299:function(e,t){},300:function(e,t){},308:function(e,t){},311:function(e,t){},312:function(e,t){},329:function(e){e.exports=JSON.parse('{"name":"tensorflow","version":"0.1.0","homepage":"/","private":true,"dependencies":{"@tensorflow-models/coco-ssd":"^2.2.1","@tensorflow-models/face-landmarks-detection":"0.0.1","@tensorflow-models/handpose":"^0.0.7","@tensorflow-models/knn-classifier":"^1.2.2","@tensorflow-models/mobilenet":"^2.0.4","@tensorflow-models/toxicity":"^1.2.2","@tensorflow/tfjs":"^3.1.0","@testing-library/jest-dom":"^5.11.4","@testing-library/react":"^11.1.0","@testing-library/user-event":"^12.1.10","@types/jest":"^26.0.15","@types/node":"^12.0.0","@types/react":"^17.0.0","@types/react-dom":"^17.0.0","dat.gui":"^0.7.7","react":"^17.0.1","react-dom":"^17.0.1","react-router-dom":"^5.2.0","react-scripts":"4.0.2","theme-ui":"^0.3.5","three":"^0.125.2","typescript":"^4.1.2","web-vitals":"^1.0.1"},"scripts":{"start":"react-scripts start","build":"rm -rf docs && react-scripts build && mv build docs","test":"react-scripts test","eject":"react-scripts eject"},"eslintConfig":{"extends":["react-app","react-app/jest"]},"browserslist":{"production":[">0.2%","not dead","not op_mini all"],"development":["last 1 chrome version","last 1 firefox version","last 1 safari version"]},"devDependencies":{"@types/dat.gui":"^0.7.6","@types/react-router-dom":"^5.1.7","@types/theme-ui":"^0.3.7"}}')},330:function(e,t,n){"use strict";n.r(t);var r,a,c,s,o,i,l,u,b,j,d,h,f=n(12),p=n.n(f),x=n(261),m=n.n(x),O=n(332),g=n(99),v=n(165),y=n(49),w=n(331),k=n(18),S=function(){return Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Hello World"}),Object(k.jsxs)(w.m,{children:["This is a series of Machine Learning experiments using"," ",Object(k.jsx)(w.j,{href:"https://www.tensorflow.org/js",target:"_blank",children:"TensorFlow.js"}),","," ",Object(k.jsx)(w.j,{href:"https://reactjs.org",target:"_blank",children:"React"})," ","and"," ",Object(k.jsx)(w.j,{href:"https://theme-ui.com",target:"_blank",children:"Theme-ui"})," ","by"," ",Object(k.jsx)(w.j,{variant:"text",href:"https://s2paganini.com",target:"_blank",children:"Silvio Paganini"}),"."]}),Object(k.jsxs)(w.m,{children:[Object(k.jsx)(w.m,{as:"span",sx:{color:"green"},children:"\u2190"})," ","Choose the experiments on the left menu to start \u26a1"]}),Object(k.jsx)(w.d,{}),Object(k.jsx)(w.f,{as:"h3",variant:"styles.h3",sx:{mt:4},children:"How to run it locally"}),Object(k.jsxs)(w.m,{children:[Object(k.jsx)(w.m,{as:"span",sx:{color:"green"},children:"1)"})," ","Clone the git repository"," ",Object(k.jsx)(w.a,{as:"pre",variant:"styles.pre",children:Object(k.jsx)("code",{children:"$ git clone git@github.com:silviopaganini/tensorflow-study.git"})})]}),Object(k.jsxs)(w.m,{children:[Object(k.jsx)(w.m,{as:"span",sx:{color:"green"},children:"2)"})," ","Install the packages and run",Object(k.jsx)(w.a,{as:"pre",variant:"styles.pre",children:Object(k.jsxs)("code",{children:["$ yarn install",Object(k.jsx)("br",{}),"$ yarn start"]})})]}),Object(k.jsx)(w.f,{as:"h3",variant:"styles.h3",sx:{mt:4},children:"Contribute"}),Object(k.jsxs)(w.m,{children:["PRs are welcome! Don't forget to fill out a description of your PR. ",Object(k.jsx)("br",{}),"View source on"," ",Object(k.jsx)(w.j,{href:"https://github.com/silviopaganini/tensorflow-study",target:"_blank",children:"Github"}),"."]}),Object(k.jsx)(w.f,{as:"h3",variant:"styles.h3",sx:{mt:4},children:"\u2757 Disclaimer"}),Object(k.jsxs)(w.m,{children:["All experiments were heavily tested on a good spec machine on Chrome and Opera.",Object(k.jsx)("br",{}),"Some experimemts might make your machine fans go crazy \ud83d\ude01 or just not work at all depending on your configuration."]})]})},C=n(1),F=n.n(C),E=n(11),R=n(6),A=n(156),M=n(116),H=n(289),z=w.k,L=function(e){var t=e.children,n=Object(H.a)(e,["children"]);return Object(k.jsx)(z,Object(M.a)(Object(M.a)({as:v.b},n),{},{children:t}))},T=function(){var e=Object(y.f)();return Object(k.jsx)(w.e,{as:"nav",sx:{flexDirection:"column",px:3,py:4,background:"linear-gradient(180deg, #111 0%, #222 100%)",minHeight:"100vh",minWidth:"230px",width:"230px"},children:we.map((function(t){return Object(k.jsx)(L,{variant:"links.nav",sx:{color:e.pathname===t.path?"green":"primary",pointerEvents:e.pathname===t.path?"none":"visible"},to:t.path,children:t.name},t.name)}))})},W=function(e){var t=e.text,n=void 0===t?"Loading":t;return Object(k.jsx)(w.e,{children:Object(k.jsxs)(w.e,{sx:{alignItems:"center",py:2},children:[Object(k.jsx)(w.l,{variant:"styles.spinner"}),Object(k.jsx)(w.i,{children:n})]})})},D=function(e){var t=e.text,n=void 0===t?"Some error has occurred, please refresh your page":t;return Object(k.jsx)(w.a,{children:Object(k.jsx)(w.e,{sx:{alignItems:"center",py:2},children:Object(k.jsx)(w.m,{children:n})})})},I=function(){var e=Object(f.useRef)(null),t=Object(f.useState)(),n=Object(R.a)(t,2),r=n[0],a=n[1],c=Object(f.useState)(!1),s=Object(R.a)(c,2),o=s[0],i=s[1],l=Object(f.useState)(!1),u=Object(R.a)(l,2),b=u[0],j=u[1],d=Object(f.useState)(),h=Object(R.a)(d,2),p=h[0],x=h[1],m=Object(f.useCallback)((function(e){(function(){var e=Object(E.a)(F.a.mark((function e(t){var n,a;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r){e.next=3;break}return x(void 0),e.abrupt("return");case 3:return e.prev=3,i(!0),e.next=7,r.classify(t);case 7:n=e.sent,a=n.map((function(e,t){return Object(k.jsxs)(w.a,{children:[Object(k.jsx)("b",{children:e.className})," - ","".concat(Math.round(100*e.probability),"%")]},t)})),x(a),i(!1),t.dispose(),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(3),i(!1),x(void 0),console.log(e.t0);case 19:case"end":return e.stop()}}),e,null,[[3,14]])})));return function(t){return e.apply(this,arguments)}})()(e)}),[r]),O=function(){var t=Object(E.a)(F.a.mark((function t(){var n,r;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(e.current){t.next=2;break}return t.abrupt("return");case 2:return t.prev=2,t.next=5,g.a.webcam(e.current);case 5:return n=t.sent,t.next=8,n.capture();case 8:r=t.sent,m(r),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(2),console.log(t.t0);case 15:case"end":return t.stop()}}),t,null,[[2,12]])})));return function(){return t.apply(this,arguments)}}(),v=function(){var t=Object(E.a)(F.a.mark((function t(){var n;return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=a,t.next=4,A.a();case 4:t.t1=t.sent,(0,t.t0)(t.t1),n=function(){var e=Object(E.a)(F.a.mark((function e(t){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.webcam(t);case 2:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),e.current&&n(e.current),i(!1),t.next=15;break;case 11:t.prev=11,t.t2=t.catch(0),console.log(t.t2),j(!0);case 15:case"end":return t.stop()}}),t,null,[[0,11]])})));return function(){return t.apply(this,arguments)}}();return Object(f.useEffect)((function(){v()}),[e]),Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Webcam object detection"}),Object(k.jsx)(w.f,{as:"h4",variant:"styles.h4",children:'Hold an object in front of your camera and click on "Capture" to analyse the camera feed'}),b?Object(k.jsx)(D,{}):r?Object(k.jsxs)(k.Fragment,{children:[Object(k.jsx)(w.a,{mb:4,children:Object(k.jsx)("video",{style:{transform:"scaleX(-1)"},width:768,height:576,ref:e})}),Object(k.jsx)(w.b,{onClick:O,variant:"primary",children:"Capture"}),o&&Object(k.jsx)(W,{text:"Analysing"}),p&&Object(k.jsx)(w.a,{mt:3,children:p})]}):Object(k.jsx)(W,{text:"Loading Mobilenet Tensorflow Models"})]})},_=function(){var e=Object(f.useRef)(null),t=Object(f.useState)(!1),n=Object(R.a)(t,2),r=n[0],a=n[1],c=Object(f.useState)(),s=Object(R.a)(c,2),o=s[0],i=s[1],l=Object(f.useState)(!1),u=Object(R.a)(l,2),b=u[0],j=u[1],d=Object(f.useState)(0),h=Object(R.a)(d,2),p=h[0],x=h[1],m=Object(f.useState)(),O=Object(R.a)(m,2),g=O[0],v=O[1],y=Object(f.useCallback)((function(e){(function(){var e=Object(E.a)(F.a.mark((function e(t){var n,r;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o){e.next=4;break}return a(!1),v(void 0),e.abrupt("return");case 4:return e.prev=4,a(!0),e.next=8,o.classify(t);case 8:n=e.sent,r=n.map((function(e,t){return Object(k.jsxs)(w.a,{children:[Object(k.jsx)("b",{children:e.className})," - ","".concat(Math.round(100*e.probability),"%")]},t)})),v(r),a(!1),e.next=19;break;case 14:e.prev=14,e.t0=e.catch(4),a(!1),v(void 0),console.log(e.t0);case 19:case"end":return e.stop()}}),e,null,[[4,14]])})));return function(t){return e.apply(this,arguments)}})()(e)}),[o]),S=function(){var e=Object(E.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=i,e.next=4,A.a();case 4:e.t1=e.sent,(0,e.t0)(e.t1),a(!1),e.next=13;break;case 9:e.prev=9,e.t2=e.catch(0),console.log(e.t2),j(!0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}();return Object(f.useEffect)((function(){S()}),[]),Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Random Image Detection"}),b?Object(k.jsx)(D,{}):o?Object(k.jsxs)(w.c,{children:[Object(k.jsx)(w.g,{onLoad:function(){e.current&&y(e.current)},ref:e,alt:"cat",crossOrigin:"anonymous",src:"https://loremflickr.com/1000/700/nature?lock=".concat(p),sx:{maxHeight:700,width:"100%"}},p),g&&Object(k.jsx)(w.a,{mt:3,children:g}),Object(k.jsx)(w.b,{mt:3,variant:"primary",sx:{pointerEvents:r?"none":"visible",opacity:r?.5:1},onClick:function(){a(!0),v(void 0),x(p+1)},children:r?"Loading...":"Try a new image"})]}):Object(k.jsx)(W,{text:"Loading Mobilenet Tensorflow Models"})]})},P=n(21),U=n(283),X=["left","up","down","center","right"].sort((function(e,t){return e.localeCompare(t)})),B=function(){var e=Object(f.useRef)(null),t=Object(f.useState)(),n=Object(R.a)(t,2),a=n[0],c=n[1],s=Object(f.useState)(),o=Object(R.a)(s,2),i=o[0],l=o[1],u=Object(f.useState)(),b=Object(R.a)(u,2),j=b[0],d=b[1],h=Object(f.useState)(),p=Object(R.a)(h,2),x=p[0],m=p[1],O=Object(f.useState)(!1),v=Object(R.a)(O,2),y=v[0],S=v[1],C=Object(f.useState)([]),M=Object(R.a)(C,2),H=M[0],z=M[1],L=Object(f.useState)(!1),T=Object(R.a)(L,2),I=T[0],_=T[1],B=Object(f.useState)(!1),N=Object(R.a)(B,2),q=N[0],J=N[1],Y=function(){var e=Object(E.a)(F.a.mark((function e(t){var n,r,c,s;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:S(!0),n=0;case 2:if(!(n<15)){e.next=14;break}return e.next=5,j.capture();case 5:return r=e.sent,(c=null===a||void 0===a?void 0:a.infer(r))&&(null===i||void 0===i||i.addExample(c,t)),r.dispose(),n++,e.next=12,Object(g.c)();case 12:e.next=2;break;case 14:s=[].concat(Object(P.a)(H),[t]).sort((function(e,t){return e.localeCompare(t)})),z(s),S(!1),s.toString()===X.toString()&&_(!0);case 18:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),$=function(){var e=Object(E.a)(F.a.mark((function e(){var t,n,c;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(i){e.next=2;break}return e.abrupt("return");case 2:if(!(i.getNumClasses()>0)){e.next=12;break}return e.next=5,j.capture();case 5:return t=e.sent,n=null===a||void 0===a?void 0:a.infer(t),e.next=9,null===i||void 0===i?void 0:i.predictClass(n);case 9:c=e.sent,m(Object(k.jsxs)(w.a,{children:[Object(k.jsx)(w.a,{mb:2,sx:{fontWeight:"bold"},children:c.label}),Object.keys(c.confidences).map((function(e,t){return Object(k.jsxs)(w.a,{children:[e,": ",c.confidences[e]]},t)}))]})),t.dispose();case 12:r=window.requestAnimationFrame($);case 13:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),G=function(){var e=Object(E.a)(F.a.mark((function e(t){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.t0=c,e.next=4,A.a();case 4:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=l,e.next=9,U.a();case 9:return e.t3=e.sent,(0,e.t2)(e.t3),e.t4=d,e.next=14,g.a.webcam(t);case 14:e.t5=e.sent,(0,e.t4)(e.t5),e.next=22;break;case 18:e.prev=18,e.t6=e.catch(0),console.log(e.t6),J(!0);case 22:case"end":return e.stop()}}),e,null,[[0,18]])})));return function(t){return e.apply(this,arguments)}}();return Object(f.useEffect)((function(){return e.current&&G(e.current),function(){r&&window.cancelAnimationFrame(r),r=void 0}}),[e]),Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Transfer Learning"}),Object(k.jsx)(w.f,{as:"h4",variant:"styles.h4",children:"Teach the machine all five head positions to start the position analysis."}),q?Object(k.jsx)(D,{}):Object(k.jsxs)(k.Fragment,{children:[(!i||!a)&&Object(k.jsx)(W,{text:"Loading Mobilenet and KNN Tensorflow Models"}),Object(k.jsxs)(w.a,{sx:{maxWidth:768},children:[Object(k.jsx)(w.a,{children:Object(k.jsx)("video",{style:{transform:"scaleX(-1)"},width:768,height:576,ref:e})}),i&&a&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(w.a,{mt:3,sx:{opacity:y?.5:1,pointerEvents:y?"none":"visible"},children:[!I&&Object(k.jsx)(w.a,{children:Object(k.jsxs)(w.e,{sx:{mt:3,justifyContent:"space-between"},children:[Object(k.jsx)(w.b,{onClick:function(){return Y("left")},variant:"secondary",children:"Left"}),Object(k.jsx)(w.b,{onClick:function(){return Y("up")},variant:"secondary",children:"Up"}),Object(k.jsx)(w.b,{onClick:function(){return Y("center")},variant:"secondary",children:"Center"}),Object(k.jsx)(w.b,{onClick:function(){return Y("down")},variant:"secondary",children:"Down"}),Object(k.jsx)(w.b,{onClick:function(){return Y("right")},variant:"secondary",children:"Right"})]})}),I&&Object(k.jsx)(w.b,{variant:"primary",onClick:function(){$()},mt:2,children:"Detect head position"})]}),Object(k.jsx)(w.a,{mt:3,children:x})]})]})]})]})},N=n(220),q=n(157),J=n(48),Y=function(e){var t=Object(f.useState)(),n=Object(R.a)(t,2),r=n[0],a=n[1],c=Object(f.useState)(),s=Object(R.a)(c,2),o=s[0],i=s[1];return Object(f.useEffect)((function(){r||function(){var t=Object(E.a)(F.a.mark((function t(){return F.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.t0=a,t.next=4,navigator.mediaDevices.getUserMedia(e);case 4:t.t1=t.sent,(0,t.t0)(t.t1),t.next=11;break;case 8:t.prev=8,t.t2=t.catch(0),i(t.t2);case 11:case"end":return t.stop()}}),t,null,[[0,8]])})));return function(){return t.apply(this,arguments)}}()()}),[e,r]),[r,o]},$=[15576649,13715803,31116,3171214,15707,4931442,15276303,16210947,15844367,16670549],G=0,K=new J.g,V=new J.a,Q=[],Z=new J.b,ee=[],te={position:"absolute",bottom:0,right:0,"& > div":{position:"static !important"}},ne=function(){var e=Object(f.useRef)(null),t=Object(f.useRef)(null),n=Object(f.useRef)(null),r=Object(f.useState)(!1),l=Object(R.a)(r,2),u=l[0],b=l[1],j=Object(f.useState)(!1),d=Object(R.a)(j,2),h=d[0],p=d[1],x=Y({video:{facingMode:"user",width:800,height:450}}),m=Object(R.a)(x,1)[0],O=Object(f.useCallback)(Object(E.a)(F.a.mark((function n(){var r,l,u,b;return F.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,a&&e.current&&t.current){n.next=4;break}return G=requestAnimationFrame(O),n.abrupt("return");case 4:return n.next=6,a.estimateFaces({returnTensors:!1,flipHorizontal:!1,input:e.current});case 6:r=n.sent,Q=[],ee=[],l=t.current,u=l.width,b=l.height,null===r||void 0===r||r.forEach((function(e){var t=e.annotations;Object.keys(t).forEach((function(e,n){Z.setHex($[n%($.length-1)]),t[e].forEach((function(e){Q.push(e[0]-u/2,b/2-e[1],-e[2]),ee.push(Z.r,Z.g,Z.b)}))}))})),V.setAttribute("position",new J.c(Q,3)),V.setAttribute("color",new J.c(ee,3)),V.computeBoundingSphere(),o.geometry.attributes.position.needsUpdate=!0,s.render(K,c),i.update(),n.next=22;break;case 19:n.prev=19,n.t0=n.catch(0),console.log(n.t0);case 22:G=requestAnimationFrame(O);case 23:case"end":return n.stop()}}),n,null,[[0,19]])}))),[]),g=Object(f.useCallback)(Object(E.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),e.next=4,N.b(N.a.mediapipeFacemesh);case 4:a=e.sent,p(!1),O(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),p(!1),b(!0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])}))),[O]);return Object(f.useEffect)((function(){if(e.current)return e.current.srcObject=m,e.current.onloadedmetadata=function(){var r;if(null===(r=e.current)||void 0===r||r.play(),t.current){var a=t.current,l=a.width,u=a.height;(c=new J.d(60,l/u,.1,1e3)).position.z=l/2;var b=(new J.h).load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png");(s=new J.i({canvas:t.current,alpha:!0})).setSize(l,u);var j,d=new J.f({size:10,vertexColors:!0,map:b});if(o=new J.e(V,d),K.add(o),!i)i=Object(q.a)(),null===(j=n.current)||void 0===j||j.appendChild(i.dom);g()}},function(){var e;cancelAnimationFrame(G),null===(e=i)||void 0===e||e.end()}}),[m,g,e,t,n]),Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Face Mesh"}),Object(k.jsxs)(w.f,{as:"h4",variant:"styles.h4",children:["Create the face mesh of the detected face on the camera feed. ",Object(k.jsx)("br",{}),"Each color group represents one feature of the face being mapped, which means we can get the positons individually."]}),u?Object(k.jsx)(D,{}):Object(k.jsxs)(k.Fragment,{children:[h&&Object(k.jsx)(W,{text:"Loading Face Landmarks Model"}),Object(k.jsxs)(w.a,{sx:{position:"relative"},children:[Object(k.jsx)("video",{style:{opacity:.4},autoPlay:!0,ref:e,width:800,height:450}),Object(k.jsx)("canvas",{ref:t,style:{position:"absolute",top:0,left:0},width:800,height:450})]})]}),Object(k.jsx)(w.a,{sx:te,ref:n})]})},re=n(284),ae=function(){var e=Object(f.useState)(),t=Object(R.a)(e,2),n=t[0],r=t[1],a=Object(f.useState)(),c=Object(R.a)(a,2),s=c[0],o=c[1],i=Object(f.useState)(),l=Object(R.a)(i,2),u=l[0],b=l[1],j=Object(f.useState)(!1),d=Object(R.a)(j,2),h=d[0],p=d[1],x=Object(f.useState)(!1),m=Object(R.a)(x,2),O=m[0],v=m[1],y=Object(f.useState)(),S=Object(R.a)(y,2),C=S[0],A=S[1],M=Object(f.useState)(),H=Object(R.a)(M,2),z=H[0],L=H[1],T=Object(f.useState)("This is really the most useless talk I have ever watched"),I=Object(R.a)(T,2),_=I[0],P=I[1],U=Object(f.useState)(!1),X=Object(R.a)(U,2),B=X[0],N=X[1],q=function(){var e=Object(E.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,p(!0),e.t0=o,e.next=5,Object(re.a)(.9,[]);case 5:return e.t1=e.sent,(0,e.t0)(e.t1),e.t2=r,e.next=10,Object(g.b)("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/model.json");case 10:return e.t3=e.sent,(0,e.t2)(e.t3),e.t4=b,e.next=15,fetch("https://storage.googleapis.com/tfjs-models/tfjs/sentiment_cnn_v1/metadata.json");case 15:return e.next=17,e.sent.json();case 17:e.t5=e.sent,(0,e.t4)(e.t5),p(!1),e.next=25;break;case 22:e.prev=22,e.t6=e.catch(0),N(!0);case 25:case"end":return e.stop()}}),e,null,[[0,22]])})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=Object(E.a)(F.a.mark((function e(t){var r,a,c,o,i;return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.preventDefault(),u&&n){e.next=3;break}return e.abrupt("return");case 3:return v(!0),A(void 0),L(void 0),r=_.trim().toLowerCase().replace(/(\.|,|!\?)/g,"").split(" "),a=r.map((function(e){var t=u.word_index[e];return"undefined"===typeof t?2:t+u.index_from})),c=new Array(u.max_len-a.length).fill(0).concat(a),o=Object(g.d)(c,[1,u.max_len]),i=n.predict(o),A(i.dataSync()[0]),i.dispose(),e.t0=L,e.next=16,null===s||void 0===s?void 0:s.classify([_]);case 16:e.t1=e.sent,(0,e.t0)(e.t1),v(!1);case 19:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(f.useEffect)((function(){q()}),[]),Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Sentiment analysis"}),Object(k.jsx)(w.f,{as:"h4",variant:"styles.h4",children:"Analyse text sentiment and toxicity."}),B?Object(k.jsx)(D,{}):Object(k.jsxs)(k.Fragment,{children:[h&&Object(k.jsx)(W,{text:"Loading Sentiment and Toxicity models"}),!h&&Object(k.jsxs)(k.Fragment,{children:[Object(k.jsxs)(w.a,{as:"form",sx:{position:"relative"},onSubmit:J,children:[Object(k.jsx)(w.h,{maxLength:100,autoComplete:"off",mt:3,onChange:function(e){P(e.currentTarget.value)},value:_,name:"input"}),Object(k.jsxs)(w.a,{sx:{position:"absolute",bottom:-25,right:"2px",fontSize:0},children:[_.length,"/100"]})]}),C&&z&&Object(k.jsxs)(w.a,{mt:2,children:[Object(k.jsxs)(w.m,{children:[Object(k.jsx)(w.f,{mt:4,as:"h3",children:"Sentiment Score:"}),Object(k.jsx)(w.m,{as:"span",mt:3,sx:{color:C>.66?"green":C<.33?"red":"orange"},children:C})]}),Object(k.jsxs)(w.m,{mt:2,children:[Object(k.jsx)(w.f,{mt:4,as:"h3",children:"Toxicity:"}),null===z||void 0===z?void 0:z.map((function(e,t){return Object(k.jsxs)(w.a,{mt:2,pl:3,sx:{opacity:e.results.every((function(e){return e.match}))?1:.4},children:[Object(k.jsx)("b",{children:e.label}),":",e.results.map((function(e,t){return Object(k.jsxs)(w.a,{mt:2,children:[Object(k.jsxs)(w.m,{sx:{pl:4},children:["Probabilities: ",JSON.stringify(e.probabilities)]}),Object(k.jsxs)(w.m,{sx:{pl:4},children:["Match:"," ",Object(k.jsx)(w.m,{as:"span",sx:{color:e.match?"green":"text",fontWeight:e.match?"bold":"normal"},children:JSON.stringify(e.match)})]})]},t)}))]},t)}))]})]}),Object(k.jsx)(w.b,{sx:{opacity:O?.4:1,pointerEvents:O?"none":"visible"},mt:4,onClick:J,children:O?"Loading...":"Analyse"})]})]})]})},ce=n(285),se=n(286),oe=void 0,ie=0,le=new J.g,ue=new J.a,be=[],je=new J.b,de=[],he={position:"absolute",bottom:0,right:0,"& > div":{position:"static !important"}},fe={offsetX:-215,offsetY:137},pe=function(){var e=Object(f.useRef)(null),t=Object(f.useRef)(null),n=Object(f.useRef)(null),r=Object(f.useState)(!0),a=Object(R.a)(r,2),c=a[0],s=a[1],o=Y({video:!0}),i=Object(R.a)(o,1)[0],d=Object(f.useState)(!1),h=Object(R.a)(d,2),p=h[0],x=h[1],m=Object(f.useCallback)(Object(E.a)(F.a.mark((function n(){var r,a,c,s,o;return F.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,n.t0=t.current,!n.t0){n.next=6;break}return n.next=5,null===(r=oe)||void 0===r?void 0:r.estimateHands(t.current);case 5:n.t0=n.sent;case 6:a=n.t0,e.current&&(be=[],de=[],c=e.current,s=c.width,o=c.height,null===a||void 0===a||a.forEach((function(e){Object.keys(e.annotations).forEach((function(t,n){je.setHex($[n%($.length-1)]),e.annotations[t].forEach((function(e){be.push(e[0]-s/2+fe.offsetX,o/2-e[1]+fe.offsetY,-e[2]),de.push(je.r,je.g,je.b)}))}))})),ue.setAttribute("position",new J.c(be,3)),ue.setAttribute("color",new J.c(de,3)),ue.computeBoundingSphere(),b.geometry.attributes.position.needsUpdate=!0),u.render(le,l),j.update(),ie=requestAnimationFrame(m),n.next=16;break;case 13:n.prev=13,n.t1=n.catch(0),console.log(n.t1);case 16:case"end":return n.stop()}}),n,null,[[0,13]])}))),[]),O=Object(f.useCallback)(Object(E.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s(!0),e.next=4,ce.a();case 4:oe=e.sent,s(!1),m(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),x(!0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])}))),[s,m]);return Object(f.useEffect)((function(){if(t.current&&e.current){t.current.srcObject=i,t.current.onloadedmetadata=function(){t.current.play(),O()};var r=e.current,a=r.width,c=r.height;(l=new J.d(90,a/c,.1,1e3)).position.z=a/2;var s=(new J.h).load("https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/sprites/disc.png");(u=new J.i({canvas:e.current,alpha:!0})).setSize(a,c);var o,d=new J.f({size:20,vertexColors:!0,map:s});if(b=new J.e(ue,d),le.add(b),!j)j=Object(q.a)(),null===(o=n.current)||void 0===o||o.appendChild(j.dom);var h=new se.a;return h.add(fe,"offsetX",-300,300,1),h.add(fe,"offsetY",-300,300,1),function(){h.destroy(),cancelAnimationFrame(ie),ie=0,j.end()}}}),[e,t,i,O]),Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Hand Mesh"}),Object(k.jsxs)(w.f,{as:"h4",variant:"styles.h4",children:["Put your hand where the camera can see and start tracking and tracing your hand mesh.",Object(k.jsx)("br",{}),"Each color group represents one feature of the hand being mapped, which means we can get the positons individually."]}),p?Object(k.jsx)(D,{}):Object(k.jsxs)(k.Fragment,{children:[c&&Object(k.jsx)(W,{text:"Loading Hand Pose Model"}),Object(k.jsxs)(w.a,{sx:{position:"relative"},children:[Object(k.jsx)("video",{style:{opacity:.4,transform:"scaleX(-1)"},ref:t,width:800,height:450}),Object(k.jsx)("canvas",{style:{transform:"scaleX(-1)",position:"absolute",top:0,left:0},ref:e,width:800,height:450})]})]}),Object(k.jsx)(w.a,{sx:he,ref:n})]})},xe=n(287),me=0,Oe=null,ge={position:"absolute",bottom:0,right:0,"& > div":{position:"static !important"}},ve=function(){var e=Object(f.useRef)(null),t=Object(f.useRef)(null),n=Object(f.useRef)(null),r=Object(f.useState)(!0),a=Object(R.a)(r,2),c=a[0],s=a[1],o=Y({video:!0}),i=Object(R.a)(o,1)[0],l=Object(f.useState)(!1),u=Object(R.a)(l,2),b=u[0],j=u[1],p=Object(f.useCallback)(Object(E.a)(F.a.mark((function n(){return F.a.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(n.prev=0,!(Oe&&t.current&&e.current)){n.next=10;break}return Oe.save(),Oe.scale(-1,1),Oe.drawImage(t.current,0,0,-960,540),Oe.restore(),n.next=8,d.detect(e.current);case 8:n.sent.forEach((function(e){if(Oe){Oe.beginPath(),Oe.strokeStyle="0x00FF00",Oe.strokeRect(e.bbox[0],e.bbox[1],e.bbox[2],e.bbox[3]),Oe.stroke(),Oe.font='14px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';var t="".concat(e.class,": ").concat(Math.round(100*e.score),"%"),n=Oe.measureText(t).width;Oe.fillStyle="#000",Oe.fillRect(e.bbox[0],e.bbox[1]-30,n+10,30),Oe.fillStyle="#fff",Oe.fillText(t,e.bbox[0]+5,e.bbox[1]-10)}}));case 10:h.update(),me=requestAnimationFrame(p),n.next=17;break;case 14:n.prev=14,n.t0=n.catch(0),console.log(n.t0);case 17:case"end":return n.stop()}}),n,null,[[0,14]])}))),[]),x=Object(f.useCallback)(Object(E.a)(F.a.mark((function e(){return F.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,s(!0),e.next=4,xe.load();case 4:d=e.sent,s(!1),p(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(0),j(!0),console.log(e.t0);case 13:case"end":return e.stop()}}),e,null,[[0,9]])}))),[s,p]);return Object(f.useEffect)((function(){if(t.current&&e.current){var r;if(t.current.srcObject=i,t.current.onloadedmetadata=function(){var e;null===t||void 0===t||null===(e=t.current)||void 0===e||e.play(),x()},Oe=e.current.getContext("2d"),!h)h=Object(q.a)(),null===(r=n.current)||void 0===r||r.appendChild(h.dom);return function(){cancelAnimationFrame(me),me=0}}}),[e,t,i,x]),Object(k.jsxs)(w.c,{as:"section",variant:"layout.section",children:[Object(k.jsx)(w.f,{as:"h2",children:"Real-time Object Detection"}),Object(k.jsx)(w.f,{as:"h4",variant:"styles.h4",children:"Real-time object detection through webcam feed using coco-ssd Model"}),b?Object(k.jsx)(D,{}):Object(k.jsxs)(k.Fragment,{children:[c&&Object(k.jsx)(W,{text:"Loading Coco-SSD Model"}),Object(k.jsxs)(w.a,{sx:{position:"relative"},children:[Object(k.jsx)("video",{style:{opacity:.4,transform:"scaleX(-1)"},ref:t,width:960,height:540}),Object(k.jsx)("canvas",{style:{position:"absolute",top:0,left:0},ref:e,width:960,height:540})]})]}),Object(k.jsx)(w.a,{sx:ge,ref:n})]})},ye=n(329).homepage,we=[{path:ye,component:S,name:"Home",exact:!0},{path:"".concat(ye,"image-detection"),component:_,name:"Random Image Detection"},{path:"".concat(ye,"webcam"),component:I,name:"Object Detection"},{path:"".concat(ye,"transfer-learning"),component:B,name:"Transfer Learning"},{path:"".concat(ye,"sentiment"),component:ae,name:"Sentiment Analysis"},{path:"".concat(ye,"facemesh"),component:ne,name:"Face Mesh"},{path:"".concat(ye,"hand-pose"),component:pe,name:"Hand Mesh"},{path:"".concat(ye,"realtime-obj-detection"),component:ve,name:"Real-time Detection"}],ke=function(){return Object(k.jsx)(v.a,{children:Object(k.jsxs)(w.e,{children:[Object(k.jsx)(T,{}),Object(k.jsx)(y.c,{children:we.map((function(e,t){var n=e.exact,r=e.path,a=e.component;return Object(k.jsx)(y.a,{exact:n,path:r,children:Object(k.jsx)(a,{})},t)}))})]})})},Se=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,333)).then((function(t){var n=t.getCLS,r=t.getFID,a=t.getFCP,c=t.getLCP,s=t.getTTFB;n(e),r(e),a(e),c(e),s(e)}))},Ce={outline:"none"},Fe={space:[0,4,8,16,32,64,128,256,512],fonts:{body:'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',heading:"inherit",monospace:"Menlo, monospace"},fontSizes:[12,14,16,20,24,32,48,64,96],fontWeights:{body:400,heading:700,bold:700},lineHeights:{body:1.5,heading:2},sizes:{container:"100%"},layout:{section:{p:4,width:"100%"}},buttons:{primary:Object(M.a)(Object(M.a)({},Ce),{},{cursor:"pointer",bg:"green",color:"secondary",transition:"all .1s ease-out","&:hover":{bg:"secondary",color:"green"}}),secondary:Object(M.a)(Object(M.a)({},Ce),{},{bg:"secondary",color:"white",cursor:"pointer"})},colors:{text:"#FFF",background:"#333",primary:"#FFF",gray:"#f0f0f0",secondary:"#333",green:"rgb(99, 255, 203)",muted:"#999",code:"#444"},links:{text:{color:"green","&:hover":{textDecoration:"none"}},nav:{fontSize:0,mr:4,my:2,color:"primary",transition:"all 0.15s ease-out","&:active":{color:"green"},"&:focus":{color:"green"},"&:hover":{opacity:.5}}},text:{heading:{mb:3},default:{mb:3}},styles:{root:{fontFamily:"body",lineHeight:"body",fontWeight:"body",letterSpacing:"0.6px",bg:"black"},h1:{color:"text",fontFamily:"heading",lineHeight:"heading",fontWeight:"heading",fontSize:5},h2:{fontFamily:"heading",lineHeight:"heading",fontWeight:"heading",fontSize:4},h3:{color:"muted",fontFamily:"heading",lineHeight:"heading",fontWeight:"heading",fontSize:3,variant:"text.heading"},h4:{color:"muted",fontFamily:"heading",lineHeight:"heading",fontWeight:"body",fontSize:2,variant:"text.heading"},h5:{color:"text",fontFamily:"heading",lineHeight:"heading",fontWeight:"heading",fontSize:1},h6:{color:"text",fontFamily:"heading",lineHeight:"heading",fontWeight:"heading",fontSize:0},p:{color:"text",fontFamily:"body",fontWeight:"body",lineHeight:"body"},a:{color:"primary"},pre:{my:3,p:3,fontFamily:"monospace",overflowX:"auto",code:{color:"code"},maxWidth:"700px",borderRadius:"7px",bg:"gray",color:"black"},spinner:{size:20,mr:2},code:{fontFamily:"monospace",fontSize:"inherit"},table:{width:"100%",borderCollapse:"separate",borderSpacing:0},th:{textAlign:"left",borderBottomStyle:"solid"},td:{textAlign:"left",borderBottomStyle:"solid"},img:{maxWidth:"100%"},hr:{my:4,bg:"muted",opacity:.3,height:"1px"}}};m.a.render(Object(k.jsx)(p.a.StrictMode,{children:Object(k.jsx)(O.a,{theme:Fe,children:Object(k.jsx)(ke,{})})}),document.getElementById("root")),Se()}},[[330,1,2]]]);
//# sourceMappingURL=main.c2915a33.chunk.js.map