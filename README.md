# 小程序/小游戏/快应用 SDK 使用指南

**GravityAnalytics MP Library** 是为小程序、小游戏、快应用等平台实现的代码埋点+买量归因的工具 SDK，我们通过打包时对部分代码的替换，实现多个平台的适配，目前 SDK 的兼容性如下：

支持平台

- 微信小程序
- 微信小游戏
- 快应用

支持媒体

- 头条巨量引擎
- 快手磁力引擎
- 腾讯广告
- 百度营销

支持游戏引擎

- [CocosCreator](https://www.cocos.com/)
- [Egret 白鹭引擎](https://www.egret.com/)
- [Laya](https://layaair.layabox.com/#/)

> 更多平台正在支持中，详细的使用说明，请参考我们的[官方使用手册](https://doc.gravity-engine.com/)。

## 一、集成与初始化

开始接入工作之前，您需要先[下载 SDK](https://github.com/GravityInfinite/mpg-demos/releases)，然后再根据您的技术栈选择不同的接入方式。

<!-- tabs:start -->

#### **微信小游戏原生**

下载 `gravityengine.mg.wx.min.js`，放入与 `app.js` 相同的目录中，在 `app.js` 中添加以下代码初始化 SDK:

```js
import GravityEngine from "./js/utils/gravityengine.mg.wx.min";
const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->管理中心-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
  clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
  },
  name: "ge", // 全局变量名称, 默认为 gravityengine
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
new GravityEngine(config);
ge.init();
```

#### **微信小程序原生**

将 `gravityengine.wx.min.js` 导入工程，并添加如下代码初始化 SDK：

```js
import GravityEngine from "./utils/gravityengine.wx.min.js";
const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->管理中心-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
  clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
    pageShow: true, // 自动采集 $MPViewScreen
    pageShare: true, // 自动采集 $MPShare
  },
  name: "ge", // 全局变量名称, 默认为 gravityengine
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
// var app = getApp();
// app.ge = new GE(config);
const ge = new GravityEngine(config);
ge.init();
```

#### **CocosCreator **

导入 SDK：

<!-- tabs:start -->

##### **TypeScript 项目：**

- 将声明文件 `GravityAnalyticsSDK.d.ts` 放入项目根目录下 `assets` 下级的 `libs` 目录，如果 `libs` 不存在，新建 `libs` 目录
- 将 SDK 文件 `gravityengine.mg.cocoscreator.min.js` 放入 `assets/Script` 目录中

##### **JavaScript 项目：**

- 将 SDK 文件 `gravityengine.mg.cocoscreator.min.js` 放入 `assets/Script` 目录中
<!-- tabs:end -->

配置初始化参数：

```javascript
const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->管理中心-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
  clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
  },
  name: "ge", // 全局变量名称
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
const ge = new GravityAnalyticsAPI(config);
ge.init();
```

#### **Laya **

导入 SDK：

<!-- tabs:start -->

##### **TypeScript 项目**

- 将声明文件 `GravityAnalyticsSDK.d.ts` 放入 `libs`目录；
- 将 SDK 文件 `gravityengine.mg.layats.min.js` 放入 bin/js 目录中
- 修改 `bin/index.js` 文件，加载 SDK：

```javascript
// sdk必须在bundle.js之前加载
loadLib("js/gravityengine.mg.layats.min.js");
loadLib("js/bundle.js");
```

##### **JavaScript 项目**

- 将 `gravityengine.mg.laya.min.js` 导入工程：

  ```javascript
  import GravityAnalyticsAPI from "gravityengine.mg.laya.min.js";
  ```

  <!-- tabs:end -->

引入 SDK 后，即可进行 SDK 初始化参数配置：

```javascript
const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->管理中心-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
  clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
    pageShow: true, // 自动采集 $MPViewScreen
    pageShare: true, // 自动采集 $MPShare
  },
  name: "ge", // 全局变量名称
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
const ge = new GravityAnalyticsAPI(config);
ge.init();
```

#### **Egret **

导入 SDK：

`GravityAnalyticsSDK` 目录放入您项目的 `libs` 目录下。然后在您项目的配置文件 `egretProperties.json` 中引入 SDK:

```json
{
  "name": "GravityAnalyticsSDK",
  "path": "./libs/GravityAnalyticsSDK"
}
```

集成 SDK 后，您可以在代码中直接使用 `GravityAnalyticsAPI`:

```javascript
const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->管理中心-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
  clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPHide
  },
  name: "ge", // 全局变量名称，可使用getApp().ge获取ge
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
const ge = new GravityEngine(config);
ge.init();
```

#### **快应用**

导入 SDK:

- 将 `gravityengine.quick.js` 文件导入快应用项目中；
- 在 `app.ux` 文件中引入 SDK：

```javascript
import ge from "./helper/gravityengine.quick";
```

引入 SDK 后，即可进行 SDK 初始化参数配置：

```javascript
const config = {
  accessToken: "gZGljPsq7I4wc3BMvkAUsevQznx1jahi", // 项目通行证，在：网站后台-->管理中心-->应用列表中找到Access Token列 复制（首次使用可能需要先新增应用）
  clientId: "your_client_id", // 用户唯一标识，如微信小程序的openid
  name: "ge", // 全局变量名称，可使用getApp().ge获取ge
  enablePersistence: true, // 是否缓存
  debugMode: "debug", // debug or none
};
const ge = new GravityEngine(config);
ge.init();
```

<!-- tabs:end -->

其他可能会用到的配置有：

```javascript
debugMode: "debug", // 是否开启测试模式，开启测试模式后，可以在 网站后台--管理中心--元数据--事件流中查看实时数据上报结果
sendTimeout: 3000, // 网络请求超时时间，单位毫秒，默认值 3000 ms
maxRetries: 3, // 网络请求失败时的重试次数，1 表示不重试。默认值是 3
enablePersistence: true, // 是否使用本地缓存，主实例默认为 true，子实例默认为 false
asyncPersistence: false, // 是否使用异步存储，默认为 false
```

### 配置项目合法域名

将 https://turbo.api.plutus-cat.com 配置到微信后台 request 合法域名列表中。

## 二、配置 SDK

### 2.1 用户注册

在用户注册或者可以获取到用户唯一性信息时调用此方法，推荐首次安装启动时调用，后续其他接口，均需要等 `register` 接口完成之后才能继续调用。

```javascript
/**
 * @param {string} name         用户名（必填）
 * @param {string} channel      用户注册渠道（必填）
 * @param {number} version      用户注册的程序版本（必填）
 * @param {string} click_id     用户点击广告id 微信小程序选填
 * @param {string} wx_openid    微信open id (微信小程序必填)
 * @param {string} wx_unionid   微信union id（微信小程序选填）
 */

ge.register({
  name: "your_name",
  channel: "your_channel",
  version: 123,
  click_id: "your_click_id",
  wx_openid: "your_wx_openid",
  wx_unionid: "your_wx_unionid",
});
```

> [!ATTENTION]
> 此方法为必须调用的，不然无法完成其他方法的正常调用！

### 2.2 公共属性

> [!Tip]
> 公共事件属性是所有事件（包括自动采集事件）都会包含的属性，用户属性中不会包含。
>
> 本节会介绍如何设置公共事件属性和动态公共属性。如果公共属性与事件中设置的自定义属性有相同 key 值，则最终的属性会根据下述优先级取值：
>
> 用户自定义事件属性 > 动态公共属性 > 事件公共属性

您可以调用 `setSuperProperties`来设置公共事件属性，公共事件属性的格式要求与事件属性一致。在设置时只能传入常量，适合设置变化不频繁的属性。

> [!Tip]
> 根据属性优先级，自定义属性优先级高于事件公共属性，因此事件公共属性也可以作为某个属性的缺省值，在需要修改的事件中设置同名 Key 覆盖缺省值。

```js
//设置公共事件属性
ge.setSuperProperties({ channel: "渠道" });

//使用track上传事件，此时事件中会带有公共事件属性
ge.track(
  "Purchase", //追踪事件的名称
  {
    Item: "商品A",
    ItemNum: 1,
    Cost: 100,
  } //需要上传的事件属性
);

/* 等价于在事件中加入这些公共属性
ge.track(
    'Purchase', //追踪事件的名称
    {
        Item:'商品A',
        ItemNum:1,
        Cost:100,
        channel:'渠道' //相当于在事件中加入这个属性
    } 
);
*/
```

如果多次调用 `setSuperProperties` 设置公共事件属性，则同名字段后面的调用会覆盖之前的，不同名字段。

如果您需要删除某个公共事件属性，可以调用 `unsetSuperProperty()` 清除其中一个公共事件属性；如果您想要清空所有公共事件属性，则可以调用 `clearSuperProperties()`;如果您想要获取所有公共事件属性，可以调用 `getSuperProperties`;

```javascript
// 清除属性名为 CHANNEL 的公共属性
ge.unsetSuperProperty("CHANNEL");

//清除公共事件属性
ge.clearSuperProperties();

//获取静态公共事件属性
ge.getSuperProperties();
```

## 三、发送事件

您可以直接调用 `track`上传自定义事件，建议您根据先前梳理的文档来设置事件的属性以及发送信息的条件，此处以购买商品为范例：

```javascript
ge.track(
  "$purchase", //追踪事件的名称
  {
    Item: "商品A",
    ItemNum: 1,
    Cost: 100,
    Elements: ["apple", "ball", "cat"],
  } //需要上传的事件属性
);
```

- `track` 接口共有两个参数，第一个参数为事件的名称，第二个参数为事件的属性
- 事件的名称是字符串，只能以字母开头，可包含数字，字母和下划线“\_”，长度最大为 50 个字符，对字母大小写不敏感。
- 事件的属性是 JS 对象，每个元素代表一个属性。
- 元素的 name 对应属性的名称，规定只能以字母开头，包含数字，字母和下划线“\_”，长度最大为 50 个字符，对字母大小写不敏感。
- 元素的 Value 为该属性的值，支持 `String`、`Integer`、`Float`、`Boolean`、`Date`、`DateTime`和 `Array`;`Array`中的内容可以为 `String`

引力引擎后台内置了一些预置事件，您可以通过以下方法分别上报：注册、登录、登出事件。

### 3.1 注册事件上报

当用户注册成功时，需要调用 `registerEvent` 方法记录用户注册事件

```javascript
ge.registerEvent();
```

### 3.2 登录事件上报

当用户登录成功时，需要调用 `loginEvent` 方法记录用户登录事件

```javascript
ge.loginEvent();
```

### 3.3 注销登录事件上报

当用户注销登录时，需要调用 `logoutEvent` 方法记录用户登出事件

```javascript
ge.logoutEvent();
```

### 3.4 付费事件上报

当用户发生付费行为时，需要调用 `payEvent` 方法记录用户付费事件，此事件非常重要，会影响买量和 ROI 统计，请务必重点测试

```javascript
ge.payEvent(300, "CNY", "your_order_id", "月卡", "支付宝", true);
```

### 3.5 广告观看事件上报

在用户观看完广告之后调用 `adShowEvent` 方法记录用户广告观看事件

```javascript
ge.adShowEvent("reward", "your_ad_unit_id");
```

### 3.6 设置事件上报时间

事件触发的时间默认取本机时间，但在一些情况下，可能需要手动设置事件的时间，可以使用以下方法进行调用：

```js
//第三个参数，可以输入Date类型的参数，替换事件触发时间
ge.track("event", { parakey: "paravalue" }, new Date());

//如果没有properties需要上传，请传入一个空对象
ge.track("event", {}, new Date());
```

- 第三个参数为事件触发时间，必须是 Date 类型，将会替换事件触发的时间，如果不传该参数，则事件触发时间默认选取用户的本机时间

### 3.7 记录事件时长

您可以调用 `timeEvent`来开始计时，配置您想要计时的事件名称，当您上传该事件时，将会自动在您的事件属性中加入 `$event_duration`这一属性来表示记录的时长，单位为秒。

```js
//用户进入商品页面，开始计时，记录的事件为"Enter_Shop"
ge.timeEvent("Enter_Shop");

//...

//上传事件，计时结束，"Enter_Shop"这一事件中将会带有表示事件时长的属性$event_duration
ge.track("Enter_Shop", { product_id: "A1354" });
```

## 四、用户属性

### 4.1 设置用户属性（userSet）

对于一般的用户属性，您可以调用 `userSet`来进行设置，使用该接口上传的属性将会覆盖原有的属性值，如果之前不存在该用户属性，则会新建该用户属性

```js
//设置用户属性，会员等级
ge.userSet({ vip_level: "钻石会员" });
```

> [!Tip]
> 属性格式要求与事件属性保持一致。

### 4.2 初始化用户属性（userSetOnce）

如果您要上传的用户属性只要设置一次，则可以调用 `userSetOnce`来进行设置，当该属性之前已经有值的时候，将会忽略这条信息。

```js
//以设置用户名为例，如果用户名已设置，则忽略本次设置，如果不存在，则设置为传入值
ge.userSetOnce({ user_name: "TestUser" });
```

> [!Tip]
> 属性格式要求与事件属性保持一致。

### 4.3 累加用户属性（userAdd）

当您要上传数值型的属性时，您可以调用 `userAdd`来对该属性进行累加操作，如果该属性还未被设置，则会赋值 0 后再进行计算

```js
//以付费为例，用户每次付费时调用此接口，则'total_revenue'字段每次会做累加付费金额的处理
ge.userAdd({ total_revenue: 50 });
```

> [!Tip]
> 设置的属性 key 为字符串，Value 只允许为数值。

### 4.4 重置用户属性（userUnset）

当您要清空用户的某个用户属性值时，您可以调用 `userUnset`来对指定属性进行清空操作，如果该属性还未在集群中被创建，则 `userUnset`不会创建该属性

```js
//清空属性名为userPropertyKey的用户属性值该用户，即设置成NULL
ge.userUnset("userPropertyKey");
```

> [!Tip]
> userUnset: 的传入值为被清空属性的 Key 值。

### 4.5 清空用户属性（userDel）

如果您要删除某个用户，可以调用 `userDel`将这名用户删除，您将无法再查询该名用户的用户属性，但该用户产生的事件仍然可以被查询到

```js
ge.userDel();
```

### 4.6 为 Array 类型的用户属性追加元素 (userAppend)

您可以调用 `userAppend` 对 Array (List) 类型的用户数据追加元素。

```js
ge.userAppend({ Elements: [("a": 1), ("b": 2)] });
```

### 4.7 为 Array 类型的用户属性去重追加元素 (userUniqAppend)

`userUniqAppend` 用来对 Array (List) 类型的用户数据**去重**追加元素。

```js
ge.userUniqAppend({ Elements: [("a": 1), ("b": 2)] });
```

## 五、自动采集事件

我们提供了自动采集功能，只需在创建实例的 config 中开启您需要自动采集的事件，SDK 将会自动采集小程序的一些行为，现在主要有以下几种事件支持自动采集：

现在支持的自动化收集数据有：

1. 小程序初始化，用户一次使用只会触发一次
2. 小程序启动，包括启动与后台调回前台
3. 小程序调入后台，并记录本次访问（启动至调入后台）的时间
4. 小程序页面显示或切入前台，自动记录页面的路径以及前向路径
5. 小程序进行转发分享，自动记录转发时的页面

接下来将会详细介绍每种数据的采集方法。

### 5.1 开启自动采集事件

在 config 中，参数 `autoTrack`中的元素表示每个自动采集事件的开关，设置为 `true`为开启自动采集：

```js
var config = {
  autoTrack: {
    appLaunch: true, // 自动采集 $MPLaunch
    appShow: true, // 自动采集 $MPShow
    appHide: true, // 自动采集 $MPhide
    pageShow: true, // 自动采集 $MPViewScreen
    pageShare: true, // 自动采集 $MPShare
  },
};
```

- `appLaunch`：自动采集小程序初始化
- `appShow`：自动采集小程序启动，或从后台进入前台
- `appHide`：自动采集小程序从前台进入后台
- `pageShow`：自动采集小程序页面显示或切入前台
- `pageShare`：自动采集小程序进行转发分享

不同平台由于运行环境以及结构原因，支持不同的自动采集事件，支持列表如下：

| 平台   | appLaunch | appShow | appHide | pageShow | pageShare |
| ------ | --------- | ------- | ------- | -------- | --------- |
| 小程序 | ✅        | ✅      | ✅      | ✅       | ✅        |
| 小游戏 |           | ✅      | ✅      |          |           |

### 5.2 自动采集事件详解

#### 5.2.1 小程序初始化

小程序初始化将会在小程序被首次打开时，或用户杀死进程再重新开启时触发，在进程的生命周期内只会触发一次，详细的事件介绍如下：

- 事件名：$MPLaunch
- 自动采集属性： `$scene`，场景值，取自微信提供的场景值

通过小程序初始化事件，您可以计算每天的用户使用次数、人均使用次数，包括以场景值做分组，查看不同场景值的用户的使用情况。

#### 5.2.2 小程序启动

小程序启动将会在小程序被启动、或小程序被从后台调回前台时触发，详细的事件介绍如下：

- 事件名：$MPShow
- 自动采集属性：
- `$scene`，场景值，取自微信提供的场景值
- `$url_path`，页面路径，小程序启动被展示页面的路径
- `$url_query`，页面参数

小程序启动由于会受到调出前后台的影响（条数较多），因此不太适合直接进行分析，但是可以在行为路径中标识用户的一次使用，可以作为用户行为路径的初始行为

#### 5.2.3 小程序隐藏

小程序隐藏将会在小程序被调入后台时触发，并记录本次使用的时长，详细的事件介绍如下：

- 事件名：$MPHide
- 自动采集属性：
  - `$scene`，场景值，取自微信提供的场景值
  - `$event_duration`，数值型，表示本次启动（$MPShow）到隐藏的持续时长

小程序隐藏事件会记录使用时长（单位为秒），因此可以直接计算用户使用总时长以及人均时长，也可以除以初始化次数计算单次使用时长。

#### 5.2.4 小程序页面浏览

小程序页面浏览将会在小程序的页面被打开时，或小程序从后台调回前台的页面展示时触发，会记录页面的路径以及访问的前向路径，详细的事件介绍如下：

- 事件名：$MPViewScreen
- 自动采集属性：
  - `#scene`，场景值，取自微信提供的场景值
  - `#url_path`，页面路径，也就是被展示页面的路径
  - `$url_query`，页面参数

通过小程序页面浏览事件，您可以计算每个页面的 pv、uv，以及用户访问小程序的使用路径。

#### 5.2.5 小程序页面转发分享

小程序页面转发分享将会在转发按钮被点击时触发（包括右上角导航栏的转发按钮，以及页面中的转发按钮），详细的事件介绍如下：

- 事件名：$MPShare
- 自动采集属性：
  - `$scene`，场景值，取自微信提供的场景值
  - `$url_path`，页面路径，也就是转发时所在的页面路径
  - `$share_method`，分享途径
  - `$share_depth`，页面层级

小程序页面转发分享事件，适合对页面的分享率进行分析，可以帮助您优化页面转发。

## 六、其他功能

### 6.1 onComplete 回调函数

对于 track, userSet, userSetOnce, userAdd, userDel, userAppend, userUniqAppend 等接口，支持传入 onComplete 回调. 可以直接在原参数列表后传入 onComplete,

也可以使用参数对象的方式. 如果使用参数对象，参数对象中必须包含 onComplete, 否则会出现参数错误.

以上传事件为例：

```js
// 以参数列表的形式传入回调
ge.track("test", { testkey: 123 }, new Date(), (res) => {
  console.log(res);
});

// 以参数对象的形式传入回调
ge.track({
  eventName: "test", // 必填
  properties: { testkey: 123 }, // 可选
  time: new Date(), // 可选
  onComplete: (res) => {
    console.log(res);
  }, // 必填
});
```

onComplete 的参数 res 为 object 类型，有两个属性 code 和 msg.

res.code 为 int 类型，定义如下:

- 0: 成功
- -3: 网络或服务端异常
- 2001 应用未授权或已过期
- 2000 权限不足 该用户尚未注册
- 1004 参数错误 一般是参数类型错误，或者缺失参数
- 1001 数据错误 json 解析错误

res.msg 是对 res.code 的文字说明。

### 6.2 开启 Debug 模式

Debug 模式可能会影响数据采集质量和 App 的稳定性，只用于集成阶段数据验证，不要在线上环境使用。

当前 SDK 实例支持两种运行模式：

- "none": 不开启 Debug
- "debug": 开启 Debug 模式，并入库

可以在 SDK 初始化的时候配置 Debug 模式：

```js
var config = {
  debugMode: "debug",
};
var ge = new GE(config);
```

### 6.3 查询用户信息

您可以通过调用 `queryUser` 方法获知当前用户的买量信息，具体参数如下。

```javascript
/**
 * 查询用户信息，包括
 * 1. client_id       用户ID
 * 2. channel         用户渠道
 * 3. click_company   用户买量来源，枚举值 为：tencent、bytedance、kuaishou  为空则为自然量用户
 * 4. aid             广告计划ID
 * 5. cid             广告创意ID
 * 6. advertiser_id   广告账户ID
 * 7. bytedance_v2    头条体验版数据（用户如果为头条体验版投放获取的，bytedance_v2才有值）
 *    1. project_id   项目ID
 *    2. promotion_id 广告ID
 *    3. mid1         图片ID
 *    4. mid2         标题ID
 *    5. mid3         视频ID
 *    6. mid4         试完ID
 *    7. mid5         落地页ID
 *
 * 返回示例如下，具体可以打印返回的data查看
 * "user_list": [
      {
        "create_time": "2022-09-09 14:50:04",
        "client_id": "Bn2RhTcU",
        "advertiser_id": "12948974294275",
        "channel": "wechat_mini_program",
        "click_company": "gdt",
        "aid": "65802182823",
        "cid": "65580218538",
 	      "bytedance_v2": {
          "project_id":"924563792",
          "promotion_id":"93795753",
          "mid1":"3256634642",
          "mid2":"2353252367",
          "mid3":"3245235236",
          "mid4":"6346347623",
          "mid5":"7345232424"
        }
      },
    ]
 */
ge.queryUser().then((data) => {
  console.log(data);
});
```
