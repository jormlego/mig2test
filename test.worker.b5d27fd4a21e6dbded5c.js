!function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);class o extends Worker{constructor(){super(void 0)}}var r=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{d(o.next(e))}catch(e){i(e)}}function s(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}d((o=o.apply(e,t||[])).next())}))};const i=navigator.usb;const c=[{vendorId:9025,productId:32822},{vendorId:9025,productId:32823},{vendorId:9025,productId:32845},{vendorId:9025,productId:32846},{vendorId:9025,productId:32847},{vendorId:9025,productId:32848},{vendorId:9025,productId:32850},{vendorId:9025,productId:32851},{vendorId:9025,productId:32852},{vendorId:9025,productId:32853},{vendorId:9025,productId:32854},{vendorId:9025,productId:32855},{vendorId:9025,productId:66},{vendorId:9114}],s=c;function d(e,t){var n,o,r,i,c,s;return e.vendorId==(null!=(n=t.vendorId)?n:e.vendorId)&&e.productId==(null!=(o=t.productId)?o:e.productId)&&e.deviceClass==(null!=(r=t.classCode)?r:e.deviceClass)&&e.deviceSubclass==(null!=(i=t.subclassCode)?i:e.deviceSubclass)&&e.deviceProtocol==(null!=(c=t.protocolCode)?c:e.deviceProtocol)&&e.serialNumber==(null!=(s=t.serialNumber)?s:e.serialNumber)}function l(e){return r(this,void 0,void 0,(function*(){const t=yield function(e){return r(this,void 0,void 0,(function*(){let t=yield i.getDevices();const n=[];for(const o of e||[])t.forEach(e=>{d(e,o)&&n.push(e)});return n}))}([e]);if(t.length>1)throw new Error("Found more than one matching port for filter");return new a(t[0])}))}class a{constructor(e,t,n){this.device=e,this.onReceive=t,this.onReceiveError=n,this.interfaceClass_}get filter(){return{vendorId:(e=this.device).vendorId,productId:e.productId,classCode:e.deviceClass,subclassCode:e.deviceSubclass,protocolCode:e.deviceProtocol,serialNumber:e.serialNumber};var e}connect(){return r(this,void 0,void 0,(function*(){const e=()=>{this.device.transferIn(this.endpointIn_,64).then(t=>{"ok"==t.status?this.onReceive(t.data):console.log(t),e()},e=>{this.onReceiveError(e)})};yield this.device.open(),null===this.device.configuration&&(yield this.device.selectConfiguration(1));const t=this.device.configuration.interfaces;t.forEach(e=>{const t=e.alternates.find(e=>255==e.interfaceClass);t&&(this.interfaceNumber_=e.interfaceNumber,this.interfaceClass_=t.interfaceClass,this.endpointOut_=t.endpoints.find(e=>"out"===e.direction).endpointNumber,this.endpointIn_=t.endpoints.find(e=>"in"===e.direction).endpointNumber,this.interfaceNumber_,this.interfaceClass_,this.endpointOut_,this.endpointIn_)}),this.interfaceNumber_,yield this.device.claimInterface(this.interfaceNumber_),255==this.interfaceClass_&&this.interfaceNumber_,yield this.device.controlTransferOut({requestType:"class",recipient:"interface",request:34,value:1,index:this.interfaceNumber_}),e()}))}disconnect(){return r(this,void 0,void 0,(function*(){yield this.device.controlTransferOut({requestType:"class",recipient:"interface",request:34,value:0,index:this.interfaceNumber_}),yield this.device.close()}))}send(e){return this.device.transferOut(this.endpointOut_,(new TextEncoder).encode(e))}}class u{constructor(e){this.port=e}startPoll(e){this.port&&(this.pollInterval=setInterval(()=>{this.port.send(e.command)},e.interval))}stopPoll(){console.log("stopPoll"),this.pollInterval&&(clearInterval(this.pollInterval),this.pollInterval=null)}raw(e){this.port.send(e.endsWith("\r\n")?e:e+"\r\n")}openPort(){this.port.connect()}closePort(){console.log("closePort"),this.stopPoll(),this.port&&(this.port.onReceive=null,this.port.disconnect().then(()=>{},e=>{console.log("error on disconnect",e)}),this.port=null)}}var f=function(e,t,n,o){return new(n||(n=Promise))((function(r,i){function c(e){try{d(o.next(e))}catch(e){i(e)}}function s(e){try{d(o.throw(e))}catch(e){i(e)}}function d(e){var t;e.done?r(e.value):(t=e.value,t instanceof n?t:new n((function(e){e(t)}))).then(c,s)}d((o=o.apply(e,t||[])).next())}))};const v=self;let p;function h(e){v.postMessage(e)}let I="";function b(e){try{const t=JSON.parse(e);if(t.ADC){const e=t;for(const t of e.ADC){if(t.error)return void h({action:"error",payload:e});t.values=t.values.map((e,n)=>{const o=255&e,r=5*(((65280&e)>>8)-o)/255;return t.chip,r>.15?-e:5*o/255})}h({action:"adc",payload:e})}else h({action:"log",payload:t})}catch(t){h({action:"error",payload:{command:e,error:t}})}}function m(e){return f(this,void 0,void 0,(function*(){I="",p&&y();const t=yield l(e);t.onReceive=e=>{const t=(new TextDecoder).decode(e),n=t.split("");if(n.length>1)do{const e=n.shift(),t=I+e;I="",t.length>0&&b(t)}while(n.length>0);else I+=t},t.onReceiveError=e=>{console.log(e),y()},p=new u(t),p.openPort(),h({action:"port-opened",filter:t.filter})}))}function y(){p&&(p.closePort(),p=null),h({action:"port-closed"})}v.onmessage=function(e){var t,n,o;return f(this,void 0,void 0,(function*(){const r=e.data;switch(r.action){case"enumerate":v.postMessage((yield i.getDevices().then(e=>(console.log("found devices",e),e.map(e=>`Product ${e.productName} manufacturer ${e.manufacturerName}`)))).join("\n"));break;case"open-port":m(r.filter);break;case"close-port":y();break;case"start-poll":null===(t=p)||void 0===t||t.startPoll(r);break;case"stop-poll":null===(n=p)||void 0===n||n.stopPoll();break;case"raw":null===(o=p)||void 0===o||o.raw(r.value)}}))},h({action:"worker-ready"}),navigator.usb.addEventListener("disconnect",e=>{y()}),navigator.usb.addEventListener("connect",e=>{for(const t of s)d(e.device,t)&&m(t)});t.default=o}]);
//# sourceMappingURL=test.worker.b5d27fd4a21e6dbded5c.js.map