"use strict";function _interopDefault(e){return e&&"object"==typeof e&&"default"in e?e.default:e}var fetch=_interopDefault(require("@system.fetch")),device=_interopDefault(require("@system.device")),network=_interopDefault(require("@system.network")),storage=_interopDefault(require("@system.storage")),prompt=_interopDefault(require("@system.prompt"));function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,_toPropertyKey(r.key),r)}}function _createClass(e,t,n){return t&&_defineProperties(e.prototype,t),n&&_defineProperties(e,n),Object.defineProperty(e,"prototype",{writable:!1}),e}function _defineProperty(e,t,n){return(t=_toPropertyKey(t))in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function _toPrimitive(e,t){if("object"!=typeof e||null===e)return e;var n=e[Symbol.toPrimitive];if(void 0===n)return("string"===t?String:Number)(e);n=n.call(e,t||"default");if("object"!=typeof n)return n;throw new TypeError("@@toPrimitive must return a primitive value.")}function _toPropertyKey(e){e=_toPrimitive(e,"string");return"symbol"==typeof e?e:String(e)}var Config={LIB_VERSION:"3.2.7",LIB_NAME:"MP",BASE_URL:"https://turbo.api.plutus-cat.com/event_center/api/v1"},_={},ArrayProto=Array.prototype,ObjProto=Object.prototype,slice=ArrayProto.slice,nativeToString=ObjProto.toString,nativeHasOwnProperty=Object.prototype.hasOwnProperty,nativeForEach=ArrayProto.forEach,nativeIsArray=Array.isArray,breaker={},logger=(_.isNumber=function(e){return"number"==typeof e?0==e-e:"string"==typeof e&&""!==e.trim()&&(Number.isFinite?Number.isFinite(+e):isFinite(+e))},_.each=function(e,t,n){if(null==e)return!1;if(nativeForEach&&e.forEach===nativeForEach)e.forEach(t,n);else if(e.length===+e.length){for(var r=0,i=e.length;r<i;r++)if(r in e&&t.call(n,e[r],r,e)===breaker)return!1}else for(var s in e)if(nativeHasOwnProperty.call(e,s)&&t.call(n,e[s],s,e)===breaker)return!1},_.extend=function(n){return _.each(slice.call(arguments,1),function(e){for(var t in e)void 0!==e[t]&&(n[t]=e[t])}),n},_.extend2Layers=function(n){return _.each(slice.call(arguments,1),function(e){for(var t in e)void 0!==e[t]&&(_.isObject(e[t])&&_.isObject(n[t])?_.extend(n[t],e[t]):n[t]=e[t])}),n},_.isArray=nativeIsArray||function(e){return"[object Array]"===nativeToString.call(e)},_.isFunction=function(e){try{return"function"==typeof e}catch(e){return!1}},_.isPromise=function(e){return"[object Promise]"===nativeToString.call(e)&&null!=e},_.isObject=function(e){return"[object Object]"===nativeToString.call(e)&&null!=e},_.isEmptyObject=function(e){if(_.isObject(e)){for(var t in e)if(nativeHasOwnProperty.call(e,t))return!1;return!0}return!1},_.isUndefined=function(e){return void 0===e},_.isString=function(e){return"[object String]"===nativeToString.call(e)},_.isDate=function(e){return"[object Date]"===nativeToString.call(e)},_.isBoolean=function(e){return"[object Boolean]"===nativeToString.call(e)},_.isNumber=function(e){return"[object Number]"===nativeToString.call(e)&&/[\d\.]+/.test(String(e))},_.isJSONString=function(e){try{JSON.parse(e)}catch(e){return!1}return!0},_.decodeURIComponent=function(t){var n="";try{n=decodeURIComponent(t)}catch(e){n=t}return n},_.encodeURIComponent=function(t){var n="";try{n=encodeURIComponent(t)}catch(e){n=t}return n},_.utf8Encode=function(e){for(var t,n="",r=t=0,i=(e=(e+"").replace(/\r\n/g,"\n").replace(/\r/g,"\n")).length,s=0;s<i;s++){var o=e.charCodeAt(s),a=null;o<128?t++:a=127<o&&o<2048?String.fromCharCode(o>>6|192,63&o|128):String.fromCharCode(o>>12|224,o>>6&63|128,63&o|128),null!==a&&(r<t&&(n+=e.substring(r,t)),n+=a,r=t=s+1)}return r<t&&(n+=e.substring(r,e.length)),n},_.base64Encode=function(e){var t,n,r,i,s="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",o=0,a=0,c="",u=[];if(!e)return e;for(e=_.utf8Encode(e);t=(i=e.charCodeAt(o++)<<16|e.charCodeAt(o++)<<8|e.charCodeAt(o++))>>12&63,n=i>>6&63,r=63&i,u[a++]=s.charAt(i>>18&63)+s.charAt(t)+s.charAt(n)+s.charAt(r),o<e.length;);switch(c=u.join(""),e.length%3){case 1:c=c.slice(0,-2)+"==";break;case 2:c=c.slice(0,-1)+"="}return c},_.encodeDates=function(r){return _.each(r,function(e,t){if(_.isDate(e))r[t]=_.formatDate(e);else if(_.isObject(e))r[t]=_.encodeDates(e);else if(_.isArray(e))for(var n=0;n<e.length;n++)_.isDate(e[n])&&(r[t][n]=_.formatDate(e[n]))}),r},_.formatDate=function(e){function t(e){return e<10?"0"+e:e}return e.getFullYear()+"-"+t(e.getMonth()+1)+"-"+t(e.getDate())+" "+t(e.getHours())+":"+t(e.getMinutes())+":"+t(e.getSeconds())+"."+((e=e.getMilliseconds())<100&&9<e?"0"+e:e<10?"00"+e:e)},_.searchObjDate=function(n){try{(_.isObject(n)||_.isArray(n))&&_.each(n,function(e,t){_.isObject(e)||_.isArray(e)?_.searchObjDate(n[t]):_.isDate(e)&&(n[t]=_.formatDate(e))})}catch(e){logger.warn(e)}},_.UUID=function(){var e=(new Date).getTime();return String(Math.random()).replace(".","").slice(1,11)+"-"+e},_.UUIDv4=function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"===e?t:3&t|8).toString(16)})},_.setMpPlatform=function(e){_.mpPlatform=e},_.getMpPlatform=function(){return _.mpPlatform},_.createExtraHeaders=function(){return{"GE-Integration-Type":Config.LIB_NAME,"GE-Integration-Version":Config.LIB_VERSION,"GE-Integration-Count":"1","GE-Integration-Extra":_.getMpPlatform()}},_.checkAppId=function(e){return e=e.replace(/\s*/g,"")},_.checkUrl=function(e){return e=e.replace(/\s*/g,""),e=_.url("basic",e)},_.url=function(){function i(){return new RegExp(/(.*?)\.?([^.]*?)\.(com|net|org|biz|ws|in|me|co\.uk|co|org\.uk|ltd\.uk|plc\.uk|me\.uk|edu|mil|br\.com|cn\.com|eu\.com|hu\.com|no\.com|qc\.com|sa\.com|se\.com|se\.net|us\.com|uy\.com|ac|co\.ac|gv\.ac|or\.ac|ac\.ac|af|am|as|at|ac\.at|co\.at|gv\.at|or\.at|asn\.au|com\.au|edu\.au|org\.au|net\.au|id\.au|be|ac\.be|adm\.br|adv\.br|am\.br|arq\.br|art\.br|bio\.br|cng\.br|cnt\.br|com\.br|ecn\.br|eng\.br|esp\.br|etc\.br|eti\.br|fm\.br|fot\.br|fst\.br|g12\.br|gov\.br|ind\.br|inf\.br|jor\.br|lel\.br|med\.br|mil\.br|net\.br|nom\.br|ntr\.br|odo\.br|org\.br|ppg\.br|pro\.br|psc\.br|psi\.br|rec\.br|slg\.br|tmp\.br|tur\.br|tv\.br|vet\.br|zlg\.br|br|ab\.ca|bc\.ca|mb\.ca|nb\.ca|nf\.ca|ns\.ca|nt\.ca|on\.ca|pe\.ca|qc\.ca|sk\.ca|yk\.ca|ca|cc|ac\.cn|net\.cn|com\.cn|edu\.cn|gov\.cn|org\.cn|bj\.cn|sh\.cn|tj\.cn|cq\.cn|he\.cn|nm\.cn|ln\.cn|jl\.cn|hl\.cn|js\.cn|zj\.cn|ah\.cn|gd\.cn|gx\.cn|hi\.cn|sc\.cn|gz\.cn|yn\.cn|xz\.cn|sn\.cn|gs\.cn|qh\.cn|nx\.cn|xj\.cn|tw\.cn|hk\.cn|mo\.cn|cn|cx|cz|de|dk|fo|com\.ec|tm\.fr|com\.fr|asso\.fr|presse\.fr|fr|gf|gs|co\.il|net\.il|ac\.il|k12\.il|gov\.il|muni\.il|ac\.in|co\.in|org\.in|ernet\.in|gov\.in|net\.in|res\.in|is|it|ac\.jp|co\.jp|go\.jp|or\.jp|ne\.jp|ac\.kr|co\.kr|go\.kr|ne\.kr|nm\.kr|or\.kr|li|lt|lu|asso\.mc|tm\.mc|com\.mm|org\.mm|net\.mm|edu\.mm|gov\.mm|ms|nl|no|nu|pl|ro|org\.ro|store\.ro|tm\.ro|firm\.ro|www\.ro|arts\.ro|rec\.ro|info\.ro|nom\.ro|nt\.ro|se|si|com\.sg|org\.sg|net\.sg|gov\.sg|sk|st|tf|ac\.th|co\.th|go\.th|mi\.th|net\.th|or\.th|tm|to|com\.tr|edu\.tr|gov\.tr|k12\.tr|net\.tr|org\.tr|com\.tw|org\.tw|net\.tw|ac\.uk|uk\.com|uk\.net|gb\.com|gb\.net|vg|sh|kz|ch|info|ua|gov|name|pro|ie|hk|com\.hk|org\.hk|net\.hk|edu\.hk|us|tk|cd|by|ad|lv|eu\.lv|bz|es|jp|cl|ag|mobi|eu|co\.nz|org\.nz|net\.nz|maori\.nz|iwi\.nz|io|la|md|sc|sg|vc|tw|travel|my|se|tv|pt|com\.pt|edu\.pt|asia|fi|com\.ve|net\.ve|fi|org\.ve|web\.ve|info\.ve|co\.ve|tel|im|gr|ru|net\.ru|org\.ru|hr|com\.hr|ly|xyz)$/)}function s(e,t){var n=e.charAt(0),t=t.split(n);return n===e?t:t[(e=parseInt(e.substring(1),10))<0?t.length+e:e-1]}function o(e,t){for(var n,r=e.charAt(0),i=t.split("&"),s=[],o={},a=e.substring(1),c=0,u=i.length;c<u;c++)if(""!==(s=(s=i[c].match(/(.*?)=(.*)/))||[i[c],i[c],""])[1].replace(/\s/g,"")){if(s[2]=(n=s[2]||"",_.decodeURIComponent(n.replace(/\+/g," "))),a===s[1])return s[2];(n=s[1].match(/(.*)\[([0-9]+)\]/))?(o[n[1]]=o[n[1]]||[],o[n[1]][n[2]]=s[2]):o[s[1]]=s[2]}return r===e?o:o[a]}return function(e,t){var n,r={};if("tld?"===e)return i();if(t=t||window.location.toString(),!e)return t;if(e=e.toString(),t.match(/^mailto:([^/].+)/))n=t.match(/^mailto:([^/].+)/),r.protocol="mailto",r.email=n[1];else{if((t=t.match(/(.*?)\/#!(.*)/)?(n=t.match(/(.*?)\/#!(.*)/))[1]+n[2]:t).match(/(.*?)#(.*)/)&&(n=t.match(/(.*?)#(.*)/),r.hash=n[2],t=n[1]),r.hash&&e.match(/^#/))return o(e,r.hash);if(t.match(/(.*?)\?(.*)/)&&(n=t.match(/(.*?)\?(.*)/),r.query=n[2],t=n[1]),r.query&&e.match(/^\?/))return o(e,r.query);if(t.match(/(.*?):?\/\/(.*)/)&&(n=t.match(/(.*?):?\/\/(.*)/),r.protocol=n[1].toLowerCase(),t=n[2]),t.match(/(.*?)(\/.*)/)&&(n=t.match(/(.*?)(\/.*)/),r.path=n[2],t=n[1]),r.path=(r.path||"").replace(/^([^/])/,"/$1").replace(/\/$/,""),(e=e.match(/^[-0-9]+$/)?e.replace(/^([^/])/,"/$1"):e).match(/^\//))return s(e,r.path.substring(1));if((n=(n=s("/-1",r.path.substring(1)))&&n.match(/(.*?)\.(.*)/))&&(r.file=n[0],r.filename=n[1],r.fileext=n[2]),t.match(/(.*):([0-9]+)$/)&&(n=t.match(/(.*):([0-9]+)$/),r.port=n[2],t=n[1]),t.match(/(.*?)@(.*)/)&&(n=t.match(/(.*?)@(.*)/),r.auth=n[1],t=n[2]),r.auth&&(n=r.auth.match(/(.*):(.*)/),r.user=n?n[1]:r.auth,r.pass=n?n[2]:void 0),r.hostname=t.toLowerCase(),"."===e.charAt(0))return s(e,r.hostname);i()&&(n=r.hostname.match(i()))&&(r.tld=n[3],r.domain=n[2]?n[2]+"."+n[3]:void 0,r.sub=n[1]||void 0);t=r.port?":"+r.port:"";r.protocol=r.protocol||window.location.protocol.replace(":",""),r.port=r.port||("https"===r.protocol?"443":"80"),r.protocol=r.protocol||("443"===r.port?"https":"http"),r.basic=r.protocol+"://"+r.hostname+t}return e in r?r[e]:"{}"===e?r:""}}(),_.createString=function(e){for(var t=e,n=Math.random().toString(36).substr(2);n.length<t;)n+=Math.random().toString(36).substr(2);return n=n.substr(0,e)},_.createAesKey=function(){return _.createString(16)},_.setQuery=function(e){var t,n=[];for(t in e)e.hasOwnProperty(t)&&n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&")},_.generateEncryptyData=function(e,t){if(void 0!==t){var n=t.publicKey,t=t.version;if(void 0!==n&&void 0!==t&&"undefined"!=typeof CryptoJS&&"undefined"!=typeof JSEncrypt){var r=_.createAesKey();try{var i=CryptoJS.enc.Utf8.parse(r),s=CryptoJS.enc.Utf8.parse(JSON.stringify(e)),o=_.isUndefined(CryptoJS.pad.Pkcs7)?CryptoJS.pad.PKCS7:CryptoJS.pad.Pkcs7,a=CryptoJS.AES.encrypt(s,i,{mode:CryptoJS.mode.ECB,padding:o}).toString(),c=new JSEncrypt,u=(c.setPublicKey(n),c.encrypt(r));return!1===u?(logger.warn("私钥加密失败，返回原数据"),e):{pkv:t,ekey:u,payload:a}}catch(e){logger.warn("数据加密失败，返回原数据: "+e)}}}return e},"object"===_typeof(logger)?logger:{}),KEY_NAME_MATCH_REGEX=(logger.info=function(){if("object"===("undefined"==typeof console?"undefined":_typeof(console))&&console.log&&logger.enabled)try{return console.log.apply(console,arguments)}catch(e){console.log(arguments[0])}},logger.warn=function(){if("object"===("undefined"==typeof console?"undefined":_typeof(console))&&console.log&&logger.enabled)try{return console.warn.apply(console,arguments)}catch(e){console.warn(arguments[0])}},/^[a-zA-Z][a-zA-Z0-9_]{0,49}$/),PropertyChecker=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"stripProperties",value:function(e){return _.isObject(e)&&_.each(e,function(e,t){_.isString(e)||_.isNumber(e)||_.isDate(e)||_.isBoolean(e)||_.isArray(e)||_.isObject(e)||logger.warn("Your data -",t,e,"- format does not meet requirements and may not be stored correctly. Attribute values only support String, Number, Date, Boolean, Array, Object")}),e}},{key:"_checkPropertiesKey",value:function(e){var n=!0;return _.each(e,function(e,t){KEY_NAME_MATCH_REGEX.test(t)||(logger.warn("Invalid KEY: "+t),n=!1)}),n}},{key:"event",value:function(e){return!(!_.isString(e)||!KEY_NAME_MATCH_REGEX.test(e))||(logger.warn("Check the parameter format. The eventName must start with an English letter and contain no more than 50 characters including letters, digits, and underscores: "+e),!1)}},{key:"propertyName",value:function(e){return!(!_.isString(e)||!KEY_NAME_MATCH_REGEX.test(e))||(logger.warn("Check the parameter format. PropertyName must start with a letter and contain letters, digits, and underscores (_). The value is a string of no more than 50 characters: "+e),!1)}},{key:"properties",value:function(e){return this.stripProperties(e),!(e&&(_.isObject(e)?!this._checkPropertiesKey(e)&&(logger.warn("Check the parameter format. The properties key must start with a letter, contain digits, letters, and underscores (_), and contain a maximum of 50 characters"),1):(logger.warn("properties can be none, but it must be an object"),1)))}},{key:"propertiesMust",value:function(e){return this.stripProperties(e),void 0===e||!_.isObject(e)||_.isEmptyObject(e)?(logger.warn("properties must be an object with a value"),!1):!!this._checkPropertiesKey(e)||(logger.warn("Check the parameter format. The properties key must start with a letter, contain digits, letters, and underscores (_), and contain a maximum of 50 characters"),!1)}},{key:"userId",value:function(e){return!(!_.isString(e)||!/^.{1,64}$/.test(e))||(logger.warn("The user ID must be a string of less than 64 characters and cannot be null"),!1)}},{key:"userAddProperties",value:function(e){if(!this.propertiesMust(e))return!1;for(var t in e)if(!_.isNumber(e[t]))return logger.warn("The attributes of userAdd need to be Number"),!1;return!0}},{key:"userAppendProperties",value:function(e){if(!this.propertiesMust(e))return!1;for(var t in e)if(!_.isArray(e[t]))return logger.warn("The attribute of userAppend must be Array"),!1;return!0}}]),e}(),PlatformProxy=function(){function e(){_classCallCheck(this,e),this.config={persistenceName:"GravityEngine",persistenceNameOld:"GravityEngine_quick_mp",asyncPersistence:!0}}return _createClass(e,[{key:"getConfig",value:function(){return this.config||{}}},{key:"getStorage",value:function(e,t,n){t||logger.warn("GravityAnalytics: invalid storage configuration"),storage.get({key:e,success:function(e){e=_.isJSONString(e)?JSON.parse(e):{};n(e)},fail:function(){logger.warn("GravityAnalytics: getStorage faild"),n({})}})}},{key:"setStorage",value:function(e,t){storage.set({key:e,value:t})}},{key:"getSystemInfo",value:function(r){device.getInfo({success:function(e){var t=e,n=[e.osType,e.osVersionName].join(" ");t.system=n,t.screenWidth=e.screenWidth/(0<e.screenDensity?e.screenDensity:1),t.screenHeight=e.screenHeight/(0<e.screenDensity?e.screenDensity:1),t.mp_platform="quickapp",r.success(t)},complete:function(){r.complete()}})}},{key:"getNetworkType",value:function(t){network.getType({success:function(e){t.success({networkType:e.type})},complete:function(){t.complete()}})}},{key:"onNetworkStatusChange",value:function(t){network.subscribe({callback:function(e){t({networkType:e.type})}})}},{key:"request",value:function(n){return fetch.fetch({url:n.url,data:n.data,method:n.method,header:n.header,success:function(e){var t={};t.statusCode=e.code,_.isJSONString(e.data)&&(t.data=JSON.parse(e.data)),n.success(t)},fail:function(e){var t={};t.errMsg=e.message,n.fail(t)}})}},{key:"initAutoTrackInstance",value:function(){logger.warn("GravityAnalytics: Quick App does not support automatic collection. You can contact GE support personnel to collect related events")}},{key:"setGlobal",value:function(e,t){globalThis[t]=e}},{key:"getAppOptions",value:function(){return{}}},{key:"showToast",value:function(e){prompt.showToast({message:e,duration:2e3})}}],[{key:"createInstance",value:function(){return new e}}]),e}(),PlatformAPI=function(){function e(){_classCallCheck(this,e)}return _createClass(e,null,[{key:"_getCurrentPlatform",value:function(){return this.currentPlatform||(this.currentPlatform=PlatformProxy.createInstance())}},{key:"getConfig",value:function(){return this._getCurrentPlatform().getConfig()}},{key:"getStorage",value:function(e,t,n){return this._getCurrentPlatform().getStorage(e,t,n)}},{key:"setStorage",value:function(e,t){return this._getCurrentPlatform().setStorage(e,t)}},{key:"getSystemInfo",value:function(e){return this._getCurrentPlatform().getSystemInfo(e)}},{key:"getNetworkType",value:function(e){return this._getCurrentPlatform().getNetworkType(e)}},{key:"onNetworkStatusChange",value:function(e){this._getCurrentPlatform().onNetworkStatusChange(e)}},{key:"request",value:function(e){return this._getCurrentPlatform().request(e)}},{key:"initAutoTrackInstance",value:function(e,t){return this._getCurrentPlatform().initAutoTrackInstance(e,t)}},{key:"setGlobal",value:function(e,t){e&&t&&this._getCurrentPlatform().setGlobal(e,t)}},{key:"getAppOptions",value:function(e){return this._getCurrentPlatform().getAppOptions(e)}},{key:"showDebugToast",value:function(e){this._getCurrentPlatform().showToast(e)}}]),e}(),HttpTask=function(){function o(e,t,n,r,i,s){_classCallCheck(this,o),this.data=e,this.serverUrl=t,this.callback=s,this.debugMode=i,this.tryCount=_.isNumber(n)?n:1,this.permissionTryCount=6,this.timeout=_.isNumber(r)?r:3e3,this.taClassName="HttpTask"}return _createClass(o,[{key:"run",value:function(){var t=this,e=_.createExtraHeaders(),n=(e["content-type"]="application/json","debug"===this.debugMode&&(e["Turbo-Debug-Mode"]=1),PlatformAPI.request({url:this.serverUrl,method:"POST",data:this.data,header:e,success:function(e){0!==e.data.code?t.onFailed(e):t.onSuccess(e)},fail:function(e){t.onFailed(e)}}));setTimeout(function(){(_.isObject(n)||_.isPromise(n))&&_.isFunction(n.abort)&&n.abort()},this.timeout)}},{key:"onSuccess",value:function(e){var t;200===e.statusCode?("debug"===this.debugMode&&null!=(t=e.data.extra.errors)&&t.length&&logger.info("Debug data",e.data.extra.errors),this.callback({code:e.data.code,msg:"success"})):this.callback({code:-3,msg:e.statusCode})}},{key:"onFailed",value:function(e){var t=this,n="".concat(e.data.msg,"：").concat(e.data.extra.error);2e3===e.data.code&&0<--this.permissionTryCount?setTimeout(function(){t.run()},6e3):0<--this.tryCount?setTimeout(function(){t.run()},1e3):this.callback({code:-3,msg:n})}}]),o}(),SenderQueue=function(){function e(){_classCallCheck(this,e),this.items=[],this.isRunning=!1,this.showDebug=!1}return _createClass(e,[{key:"enqueue",value:function(e,t,n){var r=!(3<arguments.length&&void 0!==arguments[3])||arguments[3],i=this,e=new HttpTask(JSON.stringify(e),t,n.maxRetries,n.sendTimeout,n.debugMode,function(e){i.isRunning=!1,_.isFunction(n.callback)&&n.callback(e),i._runNext(),!1!==i.showDebug||"debug"!==n.debugMode||0!==e.code&&1!==e.code&&2!==e.code||(i.showDebug=!0,_.isFunction(PlatformAPI.showDebugToast)&&PlatformAPI.showDebugToast("The current mode is Debug"))});!0===r?(this.items.push(e),this._runNext()):e.run()}},{key:"_dequeue",value:function(){return this.items.shift()}},{key:"_runNext",value:function(){if(0<this.items.length&&!this.isRunning)if(this.isRunning=!0,"HttpTask"!==this.items[0].taClassName)this._dequeue().run();else{for(var e=this.items.splice(0,this.items.length),t=e[0],n=JSON.parse(t.data),r=n.client_id,i=1;i<e.length;i++){var s=e[i],o=JSON.parse(s.data);o.client_id===r&&t.serverUrl===s.serverUrl?n.event_list=n.event_list.concat(o.event_list):this.items.push(s)}new HttpTask(JSON.stringify(n),t.serverUrl,t.tryCount,t.timeout,null==t?void 0:t.debugMode,t.callback).run()}}}]),e}(),senderQueue=new SenderQueue,DEFAULT_CONFIG={name:"GravityEngine",is_plugin:!1,maxRetries:3,sendTimeout:5e3,enablePersistence:!0,asyncPersistence:!1,enableLog:!0,strict:!1,debugMode:"none"},systemInformation={properties:{$lib_version:Config.LIB_VERSION},getSystemInfo:function(e){var n=this;PlatformAPI.onNetworkStatusChange(function(e){n.properties.$network_type=e.networkType}),PlatformAPI.getNetworkType({success:function(e){n.properties.$network_type=e.networkType},complete:function(){PlatformAPI.getSystemInfo({success:function(e){logger.info(JSON.stringify(e,null,4));var t={$manufacturer:e.brand,$model:e.model,$screen_width:Number(e.screenWidth),$screen_height:Number(e.screenHeight),$os:e.platform,$os_version:e.system};_.extend(n.properties,t),_.setMpPlatform(e.mp_platform)},complete:function(){e()}})}})}},GravityEnginePersistence=function(){function e(t,n){var r=this;_classCallCheck(this,e),this.enabled=t.enablePersistence,this.enabled?(t.isChildInstance?(this.name=t.persistenceName+"_"+t.name,this.nameOld=t.persistenceNameOld+"_"+t.name):(this.name=t.persistenceName,this.nameOld=t.persistenceNameOld),t.asyncPersistence?(this._state={},PlatformAPI.getStorage(this.name,!0,function(e){_.isEmptyObject(e)?PlatformAPI.getStorage(r.nameOld,!0,function(e){r._state=_.extend2Layers({},e,r._state),r._init(t,n),r._save()}):(r._state=_.extend2Layers({},e,r._state),r._init(t,n),r._save())})):(this._state=PlatformAPI.getStorage(this.name)||{},_.isEmptyObject(this._state)&&(this._state=PlatformAPI.getStorage(this.nameOld)||{}),this._init(t,n))):(this._state={},this._init(t,n))}return _createClass(e,[{key:"_init",value:function(e,t){this.getDistinctId()||this.setDistinctId(_.UUID()),e.isChildInstance||this.getDeviceId()||this._setDeviceId(_.UUID()),this.initComplete=!0,"function"==typeof t&&t(),this._save()}},{key:"_save",value:function(){this.enabled&&this.initComplete&&PlatformAPI.setStorage(this.name,JSON.stringify(this._state))}},{key:"_set",value:function(e,t){var n,r=this;"string"==typeof e?(n={})[e]=t:"object"===_typeof(e)&&(n=e),_.each(n,function(e,t){r._state[t]=e}),this._save()}},{key:"_get",value:function(e){return this._state[e]}},{key:"setEventTimer",value:function(e,t){var n=this._state.event_timers||{};n[e]=t,this._set("event_timers",n)}},{key:"removeEventTimer",value:function(e){var t=(this._state.event_timers||{})[e];return _.isUndefined(t)||(delete this._state.event_timers[e],this._save()),t}},{key:"getDeviceId",value:function(){return this._state.device_id}},{key:"_setDeviceId",value:function(e){this.getDeviceId()?logger.warn("cannot modify the device id."):this._set("device_id",e)}},{key:"getDistinctId",value:function(){return this._state.distinct_id}},{key:"setDistinctId",value:function(e){this._set("distinct_id",e)}},{key:"getAccountId",value:function(){return this._state.account_id}},{key:"setAccountId",value:function(e){this._set("account_id",e)}},{key:"getSuperProperties",value:function(){return this._state.props||{}}},{key:"setSuperProperties",value:function(e,t){t=t?e:_.extend(this.getSuperProperties(),e);this._set("props",t)}}]),e}();function getPlatFormName(){return PlatformAPI.getConfig().persistenceNameOld}var GravityEngineAPI=function(){function n(e){_classCallCheck(this,n),e.appId=e.clientId?_.checkAppId(e.clientId):_.checkAppId(e.appid),e.accessToken=e.accessToken,e.serverUrl="".concat(Config.BASE_URL,"/event/collect/?access_token=").concat(e.accessToken);var t=_.extend({},DEFAULT_CONFIG,PlatformAPI.getConfig());_.isObject(e)?this.config=_.extend(t,e):this.config=t,this._init(this.config)}return _createClass(n,[{key:"_init",value:function(e){var t=this,n=(this.name=e.name,this.appId=e.clientId||e.appid,this.accessToken=e.accessToken,e.serverUrl||e.server_url);this.serverUrl=n,this.serverDebugUrl=n,this.configUrl=n+"/config",this.autoTrackProperties={},this._queue=[],this.config.syncBatchSize=100,this.config.syncInterval=60,e.isChildInstance?this._state={}:(logger.enabled=e.enableLog,this.instances=[],this._state={getSystemInfo:!1,initComplete:!1},systemInformation.getSystemInfo(function(){t._updateState({getSystemInfo:!0})}),PlatformAPI.setGlobal(this,this.name)),this.store=new GravityEnginePersistence(e,function(){t.config.asyncPersistence&&_.isFunction(t.config.persistenceComplete)&&t.config.persistenceComplete(t),t._updateState()}),this.enabled=!_.isBoolean(this.store._get("ge_enabled"))||this.store._get("ge_enabled"),this.isOptOut=!!_.isBoolean(this.store._get("ge_isOptOut"))&&this.store._get("ge_isOptOut"),"GravityEngine_wechat_game"===getPlatFormName()&&e.autoTrack.appLaunch&&this.track("$MPLaunch",{$url_query:this.setQuery(this.getQuery()),$scene:PlatformAPI.getAppOptions().scene}),!e.isChildInstance&&e.autoTrack&&(this.autoTrack=PlatformAPI.initAutoTrackInstance(this,e))}},{key:"updateConfig",value:function(e,t){}},{key:"initInstance",value:function(e,t){if(!this.config.isChildInstance)return _.isString(e)&&e!==this.name&&_.isUndefined(this[e])?(t=new n(_.extend({},this.config,{enablePersistence:!1,isChildInstance:!0,name:e},t)),this[e]=t,this.instances.push(e),this[e]._state=this._state,t):void logger.warn("initInstance() failed due to the name is invalid: "+e);logger.warn("initInstance() cannot be called on child instance")}},{key:"lightInstance",value:function(e){return this[e]}},{key:"_setAutoTrackProperties",value:function(e){_.extend(this.autoTrackProperties,e)}},{key:"init",value:function(){if(this._state.initComplete)return!1;this._updateState({initComplete:!0})}},{key:"_isReady",value:function(){return this._state.getSystemInfo&&this._state.initComplete&&this.store.initComplete}},{key:"_updateState",value:function(e){var t=this;_.isObject(e)&&_.extend(this._state,e),this._onStateChange(),_.each(this.instances,function(e){t[e]._onStateChange()})}},{key:"_onStateChange",value:function(){var t=this;this._isReady()&&this._queue&&0<this._queue.length&&(_.each(this._queue,function(e){t[e[0]].apply(t,slice.call(e[1]))}),this._queue=[])}},{key:"_hasDisabled",value:function(){var e=!this.enabled||this.isOptOut;return e&&logger.info("GravityEngine is Pause or Stop!"),e}},{key:"_sendRequest",value:function(e,t,n){var r,i;this._hasDisabled()||(!_.isUndefined(this.config.disableEventList)&&this.config.disableEventList.includes(e.eventName)?logger.info("disabled Event : "+e.eventName):(t=_.isDate(t)?t:new Date,(t={event_list:[{type:e.type,time:Date.now()}]}).event_list[0].event=e.eventName,"track"===e.type?(t.event_list[0].properties=_.extend({},systemInformation.properties,this.autoTrackProperties,this.store.getSuperProperties(),this.dynamicProperties?this.dynamicProperties():{}),r=this.store.removeEventTimer(e.eventName),_.isUndefined(r)||(r=(new Date).getTime()-r,86400<(r=parseFloat((r/1e3).toFixed(3)))?r=86400:r<0&&(r=0),t.event_list[0].properties.$event_duration=r)):t.event_list[0].properties={},_.isObject(e.properties)&&!_.isEmptyObject(e.properties)&&_.extend(t.event_list[0].properties,e.properties),_.searchObjDate(t.event_list[0]),t.client_id=this.appId,logger.info(JSON.stringify(t,null,4)),r=this.serverUrl,_.isBoolean(this.config.enableEncrypt)&&1==this.config.enableEncrypt&&(t.event_list[0]=_.generateEncryptyData(t.event_list[0],void 0)),n?(n=new FormData,"debug"===this.config.debugMode?(n.append("source","client"),n.append("appid",this.appId),n.append("deviceId",this.getDeviceId()),n.append("data",JSON.stringify(t.event_list[0]))):(i=_.base64Encode(JSON.stringify(t)),n.append("data",i)),navigator.sendBeacon(r,n),_.isFunction(e.onComplete)&&e.onComplete({statusCode:200})):senderQueue.enqueue(t,r,{maxRetries:this.config.maxRetries,sendTimeout:this.config.sendTimeout,callback:e.onComplete,debugMode:this.config.debugMode})))}},{key:"_isObjectParams",value:function(e){return _.isObject(e)&&_.isFunction(e.onComplete)}},{key:"track",value:function(e,t,n,r){var i;this._hasDisabled()||(this._isObjectParams(e)&&(e=(i=e).eventName,t=i.properties,n=i.time,r=i.onComplete),PropertyChecker.event(e)&&PropertyChecker.properties(t)||!this.config.strict?this._internalTrack(e,t,n,r):_.isFunction(r)&&r({code:-1,msg:"invalid parameters"}))}},{key:"_internalTrack",value:function(e,t,n,r,i){this._hasDisabled()||(n=_.isDate(n)?n:new Date,this._isReady()?this._sendRequest({type:"track",eventName:e,properties:t,onComplete:r},n,i):this._queue.push(["_internalTrack",[e,t,n,r]]))}},{key:"userSet",value:function(e,t,n){var r;this._hasDisabled()||(this._isObjectParams(e)&&(e=(r=e).properties,t=r.time,n=r.onComplete),PropertyChecker.propertiesMust(e)||!this.config.strict?(t=_.isDate(t)?t:new Date,this._isReady()?this._sendRequest({type:"profile",eventName:"profile_set",properties:e,onComplete:n},t):this._queue.push(["userSet",[e,t,n]])):(logger.warn("calling userSet failed due to invalid arguments"),_.isFunction(n)&&n({code:-1,msg:"invalid parameters"})))}},{key:"userSetOnce",value:function(e,t,n){var r;this._hasDisabled()||(this._isObjectParams(e)&&(e=(r=e).properties,t=r.time,n=r.onComplete),PropertyChecker.propertiesMust(e)||!this.config.strict?(t=_.isDate(t)?t:new Date,this._isReady()?this._sendRequest({type:"profile",eventName:"profile_set_once",properties:e,onComplete:n},t):this._queue.push(["userSetOnce",[e,t,n]])):(logger.warn("calling userSetOnce failed due to invalid arguments"),_.isFunction(n)&&n({code:-1,msg:"invalid parameters"})))}},{key:"userAdd",value:function(e,t,n){var r;this._hasDisabled()||(this._isObjectParams(e)&&(e=(r=e).properties,t=r.time,n=r.onComplete),PropertyChecker.propertiesMust(e)||!this.config.strict?(t=_.isDate(t)?t:new Date,this._isReady()?this._sendRequest({type:"profile",eventName:"profile_increment",properties:e,onComplete:n},t):this._queue.push(["userAdd",[e,t,n]])):(logger.warn("calling userAdd failed due to invalid arguments"),_.isFunction(n)&&n({code:-1,msg:"invalid parameters"})))}},{key:"userDel",value:function(e,t){var n,r={};this._hasDisabled()||(this._isObjectParams(r)&&(r=(n=r).properties,e=n.time,t=n.onComplete),PropertyChecker.propertiesMust(r)||!this.config.strict?(e=_.isDate(e)?e:new Date,this._isReady()?this._sendRequest({type:"profile",eventName:"profile_delete",properties:r,onComplete:t},e):this._queue.push(["userDel",[r,e,t]])):(logger.warn("calling userDel failed due to invalid arguments"),_.isFunction(t)&&t({code:-1,msg:"invalid parameters"})))}},{key:"userAppend",value:function(e,t,n){var r;this._hasDisabled()||(this._isObjectParams(e)&&(e=(r=e).properties,t=r.time,n=r.onComplete),PropertyChecker.propertiesMust(e)||!this.config.strict?(t=_.isDate(t)?t:new Date,this._isReady()?this._sendRequest({type:"profile",eventName:"profile_append",properties:e,onComplete:n},t):this._queue.push(["userAppend",[e,t,n]])):(logger.warn("calling userAppend failed due to invalid arguments"),_.isFunction(n)&&n({code:-1,msg:"invalid parameters"})))}},{key:"userUnset",value:function(e,t,n){var r,e=_defineProperty({},e,null);this._hasDisabled()||(this._isObjectParams(e)&&(e=(r=e).properties,t=r.time,n=r.onComplete),PropertyChecker.propertiesMust(e)||!this.config.strict?(t=_.isDate(t)?t:new Date,this._isReady()?this._sendRequest({type:"profile",eventName:"profile_unset",properties:e,onComplete:n},t):this._queue.push(["userUnset",[e,t,n]])):(logger.warn("calling userUnset failed due to invalid arguments"),_.isFunction(n)&&n({code:-1,msg:"invalid parameters"})))}},{key:"logoutEvent",value:function(){this.track("$MPLogout",{})}},{key:"loginEvent",value:function(){this.track("$MPLogin",{})}},{key:"registerEvent",value:function(){this.track("$MPRegister",{})}},{key:"getQuery",value:function(){return PlatformAPI.getAppOptions().query||{}}},{key:"setQuery",value:function(e){var t,n=[];for(t in e)e.hasOwnProperty(t)&&n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));return n.join("&")}},{key:"getPlatForm",value:function(){var e=this.getQuery();return e.ksUnitId||e.ksCampaignId||e.ksChannel?"kuaishou":e.clue_token||e.ad_id||e.creative_id||e.request_id||e.advertiser_id?"bytedance":e.gdt_vid?"tencent":""}},{key:"sendNetWork",value:function(e,r){return new Promise(function(t,n){PlatformAPI.request({url:e,method:"POST",data:r,header:{"content-type":"application/json"},success:function(e){200===e.statusCode?t(e.data):n(e)},fail:function(e){n(e)}})})}},{key:"register",value:function(){var e,t,n=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(this._isReady()){if(null==n||!n.name)throw new Error("name must be required");if(null==n||!n.channel)throw new Error("channel must be required");if((null==n||!n.version)&&0!==(null==n?void 0:n.version))throw new Error("version must be required");if(_.isNumber(null==n?void 0:n.version)&&"number"==typeof(null==n?void 0:n.version))return t=this.getPlatForm(),n={client_id:this.appId,name:n.name,channel:n.channel,version:n.version,media_type:t||"tencent",wx_openid:(null==n?void 0:n.wx_openid)||"",wx_unionid:(null==n?void 0:n.wx_unionid)||"",click_id:(null==n?void 0:n.click_id)||"",ad_data:{}},e=this.getQuery(),"kuaishou"===t?n.ad_data={callback:(null==e?void 0:e.callback)||"",ksCampaignId:(null==e?void 0:e.ksCampaignId)||"",ksUnitId:(null==e?void 0:e.ksUnitId)||"",ksCreativeId:(null==e?void 0:e.ksCreativeId)||"",ksChannel:(null==e?void 0:e.ksChannel)||""}:"bytedance"===t?n.ad_data={clue_token:(null==e?void 0:e.clue_token)||"",ad_id:(null==e?void 0:e.ad_id)||"",creative_id:(null==e?void 0:e.creative_id)||"",advertiser_id:(null==e?void 0:e.advertiser_id)||"",request_id:(null==e?void 0:e.request_id)||"",req_id:(null==e?void 0:e.req_id)||"",project_id:(null==e?void 0:e.project_id)||"",promotion_id:(null==e?void 0:e.promotion_id)||"",mid1:(null==e?void 0:e.mid1)||"",mid2:(null==e?void 0:e.mid2)||"",mid3:(null==e?void 0:e.mid3)||"",mid4:(null==e?void 0:e.mid4)||"",mid5:(null==e?void 0:e.mid5)||""}:"tencent"===t&&(n.ad_data={gdt_vid:(null==e?void 0:e.gdt_vid)||""}),null!=e&&e.turbo_promoted_object_id&&(n.promoted_object_id=e.turbo_promoted_object_id),t="".concat(Config.BASE_URL,"/user/register/?access_token=").concat(this.accessToken),this.sendNetWork(t,n);throw new Error("version must be type: Number")}}},{key:"handleEvent",value:function(){var e=0<arguments.length&&void 0!==arguments[0]?arguments[0]:{};if(this._isReady()){var t={event_type:e.event_type};if(null!=e&&e.properties&&(t.properties=e.properties),t.use_client_time=(null==e?void 0:e.use_client_time)||!1,t.use_client_time&&(null==e||!e.timestamp))throw new Error("timestamp must be required");null!=e&&e.timestamp&&(t.timestamp=e.timestamp),null!=e&&e.trace_id&&(t.trace_id=e.trace_id),t.timestamp=(null==e?void 0:e.timestamp)||(new Date).getTime();e="".concat(Config.BASE_URL,"/event/handle_event/?access_token=").concat(this.accessToken,"&client_id=").concat(this.appId);return this.sendNetWork(e,t)}}},{key:"queryUser",value:function(){var e,t;if(this._isReady())return e={user_list:[this.appId]},t="".concat(Config.BASE_URL,"/user/get/?access_token=").concat(this.accessToken),this.sendNetWork(t,e)}},{key:"authorizeOpenID",value:function(e){this.identify(e)}},{key:"identify",value:function(e){if(!this._hasDisabled()){if("number"==typeof e)e=String(e);else if("string"!=typeof e)return!1;this.store.setDistinctId(e)}}},{key:"getDistinctId",value:function(){return this.store.getDistinctId()}},{key:"login",value:function(e){if(!this._hasDisabled()){if("number"==typeof e)e=String(e);else if("string"!=typeof e)return!1;this.store.setAccountId(e)}}},{key:"getAccountId",value:function(){return this.store.getAccountId()}},{key:"logout",value:function(){this._hasDisabled()||this.store.setAccountId(null)}},{key:"setSuperProperties",value:function(e){this._hasDisabled()||(PropertyChecker.propertiesMust(e)||!this.config.strict?this.store.setSuperProperties(e):logger.warn("setSuperProperties parameter must be a valid property value"))}},{key:"registerApp",value:function(e){this.setSuperProperties(e)}},{key:"clearSuperProperties",value:function(){this._hasDisabled()||this.store.setSuperProperties({},!0)}},{key:"unsetSuperProperty",value:function(e){var t;this._hasDisabled()||_.isString(e)&&(delete(t=this.getSuperProperties())[e],this.store.setSuperProperties(t,!0))}},{key:"getSuperProperties",value:function(){return this.store.getSuperProperties()}},{key:"getPresetProperties",value:function(){var e=systemInformation.properties,t={},n=e.$os,n=(t.os=_.isUndefined(n)?"":n,e.$screen_width),n=(t.screenWidth=_.isUndefined(n)?0:n,e.$screen_height),n=(t.screenHeight=_.isUndefined(n)?0:n,e.$network_type),n=(t.networkType=_.isUndefined(n)?"":n,e.$model),n=(t.deviceModel=_.isUndefined(n)?"":n,e.$os_version),n=(t.osVersion=_.isUndefined(n)?"":n,t.deviceId=this.getDeviceId(),0-(new Date).getTimezoneOffset()/60),n=(t.zoneOffset=n,e.$manufacturer);return t.manufacturer=_.isUndefined(n)?"":n,t.toEventPresetProperties=function(){return{$app_id:this.appId,$model:t.deviceModel,$screen_width:t.screenWidth,$screen_height:t.screenHeight,$os:t.os,$os_version:t.osVersion,$network_type:t.networkType,$manufacturer:t.manufacturer}},t}},{key:"setDynamicSuperProperties",value:function(e){this._hasDisabled()||("function"==typeof e?PropertyChecker.properties(e())||!this.config.strict?this.dynamicProperties=e:logger.warn("A dynamic public property must return a valid property value"):logger.warn("setDynamicSuperProperties parameter must be a function type"))}},{key:"timeEvent",value:function(e,t){this._hasDisabled()||(t=_.isDate(t)?t:new Date,this._isReady()?PropertyChecker.event(e)||!this.config.strict?this.store.setEventTimer(e,t.getTime()):logger.warn("calling timeEvent failed due to invalid eventName: "+e):this._queue.push(["timeEvent",[e,t]]))}},{key:"getDeviceId",value:function(){return systemInformation.properties.$device_id}},{key:"enableTracking",value:function(e){this.enabled=e,this.store._set("ta_enabled",e)}},{key:"optOutTracking",value:function(){this.store.setSuperProperties({},!0),this.store.setDistinctId(_.UUID()),this.store.setAccountId(null),this._queue.splice(0,this._queue.length),this.isOptOut=!0,this.store._set("ge_isOptOut",!0)}},{key:"optOutTrackingAndDeleteUser",value:function(){var e=new Date;this._sendRequest({type:"user_del"},e),this.optOutTracking()}},{key:"optInTracking",value:function(){this.isOptOut=!1,this.store._set("ge_isOptOut",!1)}},{key:"setTrackStatus",value:function(e){switch(e){case"PAUSE":this.eventSaveOnly=!1,this.optInTracking(),this.enableTracking(!1);break;case"STOP":this.eventSaveOnly=!1,this.optOutTracking(!0);break;default:this.eventSaveOnly=!1,this.optInTracking(),this.enableTracking(!0)}}}]),n}();module.exports=GravityEngineAPI;