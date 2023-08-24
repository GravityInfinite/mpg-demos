"use strict";function _typeof(e){return(_typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function _classCallCheck(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function _defineProperties(e,n){for(var t=0;t<n.length;t++){var i=n[t];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}function _createClass(e,n,t){return n&&_defineProperties(e.prototype,n),t&&_defineProperties(e,t),e}function _possibleConstructorReturn(e,n){return!n||"object"!==_typeof(n)&&"function"!=typeof n?_assertThisInitialized(e):n}function _getPrototypeOf(e){return(_getPrototypeOf=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)})(e)}function _assertThisInitialized(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}function _inherits(e,n){if("function"!=typeof n&&null!==n)throw new TypeError("Super expression must either be null or a function");e.prototype=Object.create(n&&n.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),n&&_setPrototypeOf(e,n)}function _setPrototypeOf(e,n){return(_setPrototypeOf=Object.setPrototypeOf||function(e,n){return e.__proto__=n,e})(e,n)}!function(){var e,n=Laya.Event,t=function(t){function Demo(){var e;return _classCallCheck(this,Demo),e=_possibleConstructorReturn(this,_getPrototypeOf(Demo).call(this)),Demo.instance=_assertThisInitialized(e),e.loadScene("DemoScene.json"),e}return _inherits(Demo,Laya.Scene),_createClass(Demo,[{key:"onEnable",value:function(){(e=new ThinkingAnalyticsAPI({accessToken:"gZGljPsq7I4wc3BMvkAUsevQznx1jahi",clientId:"your_client_id",autoTrack:{appLaunch:!0,appShow:!0,appHide:!0},name:"gravityEngine"})).init(),this.scene.btn1.on(n.CLICK,this,this.handleRegister),this.scene.btn2.on(n.CLICK,this,this.handleEvent),this.scene.btn3.on(n.CLICK,this,this.handleGetUser),this.scene.btn4.on(n.CLICK,this,this.handleUserSet),this.scene.btn5.on(n.CLICK,this,this.handleUserSetOnce),this.scene.btn6.on(n.CLICK,this,this.handleUserAdd),this.scene.btn7.on(n.CLICK,this,this.handleUserDel),this.scene.btn8.on(n.CLICK,this,this.handleUserAppend),this.scene.btn9.on(n.CLICK,this,this.handleUserUnset),this.scene.btn10.on(n.CLICK,this,this.handleRegisterApp),this.scene.btn11.on(n.CLICK,this,this.handleRegisterEvent),this.scene.btn12.on(n.CLICK,this,this.handleLoginEvent),this.scene.btn13.on(n.CLICK,this,this.handleLogoutEvent),this.scene.btn14.on(n.CLICK,this,this.handleCustomTrack)}},{key:"handleRegister",value:function(){e.register({name:"your_name",channel:"your_channel",version:123,click_id:"your_click_id",wx_openid:"your_wx_openid",wx_unionid:"your_wx_unionid"})}},{key:"handleEvent",value:function(){e.handleEvent({event_type:"pay",properties:{amount:100,real_amount:200},timestamp:Date.now(),use_client_time:!0,trace_id:"test"})}},{key:"handleGetUser",value:function(){e.getUser().then(function(e){console.log(e)})}},{key:"handleUserSet",value:function(){e.userSet({$first_visit_time:"2000-12-11 10:42:20",$name:"bob"})}},{key:"handleUserSetOnce",value:function(){e.userSetOnce({$first_visit_time:"2000-12-11 10:42:20"})}},{key:"handleUserAdd",value:function(){e.userAdd({friends_num:2})}},{key:"handleUserDel",value:function(){e.userDel()}},{key:"handleUserAppend",value:function(){e.userAppend({arr:[3,4]})}},{key:"handleUserUnset",value:function(){e.userUnset("arr")}},{key:"handleRegisterApp",value:function(){e.registerApp({test_register_app_key:"test_register_app_value"})}},{key:"handleRegisterEvent",value:function(){e.registerEvent()}},{key:"handleLoginEvent",value:function(){e.loginEvent()}},{key:"handleLogoutEvent",value:function(){e.logoutEvent()}},{key:"handleCustomTrack",value:function(){e.track("test",{$pay_type:"rmb"})}}]),Demo}(),i=function(){function GameConfig(){_classCallCheck(this,GameConfig)}return _createClass(GameConfig,null,[{key:"init",value:function(){(0,Laya.ClassUtils.regClass)("script/Demo.ts",t)}}]),GameConfig}();i.width=640,i.height=1136,i.scaleMode="fixedwidth",i.screenMode="none",i.alignV="top",i.alignH="left",i.startScene="DemoScene.scene",i.sceneRoot="",i.debug=!1,i.stat=!1,i.physicsDebug=!1,i.exportSceneToJson=!0,i.init(),new(function(){function Main(){_classCallCheck(this,Main),window.Laya3D?Laya3D.init(i.width,i.height):Laya.init(i.width,i.height,Laya.WebGL),Laya.Physics&&Laya.Physics.enable(),Laya.DebugPanel&&Laya.DebugPanel.enable(),Laya.stage.scaleMode=i.scaleMode,Laya.stage.screenMode=i.screenMode,Laya.stage.alignV=i.alignV,Laya.stage.alignH=i.alignH,Laya.URL.exportSceneToJson=i.exportSceneToJson,(i.debug||"true"==Laya.Utils.getQueryString("debug"))&&Laya.enableDebugPanel(),i.physicsDebug&&Laya.PhysicsDebugDraw&&Laya.PhysicsDebugDraw.enable(),i.stat&&Laya.Stat.show(),Laya.alertGlobalError(!0),Laya.ResourceVersion.enable("version.json",Laya.Handler.create(this,this.onVersionLoaded),Laya.ResourceVersion.FILENAME_VERSION)}return _createClass(Main,[{key:"onVersionLoaded",value:function(){Laya.AtlasInfoManager.enable("fileconfig.json",Laya.Handler.create(this,this.onConfigLoaded))}},{key:"onConfigLoaded",value:function(){i.startScene&&Laya.Scene.open(i.startScene)}}]),Main}())}();