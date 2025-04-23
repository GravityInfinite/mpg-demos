declare class GravityAnalyticsAPI {
  constructor(config: any);
  setupAndStart(options?: { clientId?: string; openId?: string }): void;
  track(eventName: string): void;
  preInit(): void;
  track(eventName: string, properties: any): void;
  track(eventName: string, properties: any, time: any): void;
  track(eventName: string, properties: any, time: any, onComplete: any): void;
  track(taEvent: any): void;
  timeEvent(eventName: string): void;
  login(accoundId: string): void;
  logout(): void;
  setSuperProperties(properties: any): void;
  unsetSuperProperty(properties: any): void;
  clearSuperProperties(): void;
  getSuperProperties(): any;
  getSendProperties(): any;
  registerEvent(): void;
  loginEvent(): void;
  logoutEvent(): void;
  payEvent(
    pay_amount: number,
    pay_type: string,
    order_id: string,
    pay_reason: string,
    pay_method: string
  ): void;
  payEventToTencent(pay_amount: number): void;
  tryPayEventDryRun(pay_amount: number): void;
  tryTutorialFinishEventDryRun(): void;
  tryRegisterEventDryRun(): void;
  tryCreateRoleEventDryRun(role_name: string): void;
  adShowEvent(ad_type: string, ad_unit_id: string, otherProperties: any): void;
  bindTAThirdPlatform(taAccountId: string, taDistinctId: string): void;
  initialize(data: any): any;
  initializeWithHistoryUserInfo(
    data: any,
    history_info: {
      company: string;
      create_time: number;
    }
  ): any;
  userSet(properties: any): void;
  userSetOnce(properties: any): void;
  userAppend(properties: any): void;
  userUniqAppend(properties: any): void;
  userAdd(properties: any): void;
  userUnset(property: string): void;
  userDel(): void;
  authorizeOpenID(distinctId: string): void;
  identify(distinctId: string): void;
  initInstance(name: string): GravityAnalyticsAPI;
  initInstance(name: string, config: any): GravityAnalyticsAPI;
  lightInstance(name: string): any;
  setDynamicSuperProperties(properties: any): void;
  getDeviceId(callback?: any): string;
  getDistinctId(callback?: any): string;
  getAccountId(callback?: any): string;
  getPresetProperties(callback?: any): any;
  getWechatOpenId(
    code: string
  ): Promise<{ session_key: string; openid: string; unionid: string }>;

  sendDryRunResult(
    traceId: string,
    action: string
  ): Promise<{
    extra: {
      error: string;
    };
    code: number;
    msg: string;
  }>;

  onPayEvent(
    pay_amount: number,
    pay_type: string,
    order_id: string,
    pay_reason: string,
    pay_method: string
  ): void;
  onRegisterEvent(): void;
  onCreateRoleEvent(role_name: string): void;
  onCreateRoleEventWithParams(role_name: string, params: any): void;
  onTutorialFinishEvent(): void;
  onTutorialFinishEventWithParams(params: any): void;
  onViewMallContentEvent(): void;
  onViewMallContentEventWithParams(params: any): void;
  onViewActivityContentEvent(): void;
  onViewActivityContentEventWithParams(params: any): void;
  onAddToWishListEvent(wishType: string): void;
  onAddToWishListEventWithParams(wishType: string, params: any): void;
  onShareEvent(shareType: "APP_MESSAGE" | "TIME_LINE"): void;
  onShareEventWithParams(
    shareType: "APP_MESSAGE" | "TIME_LINE",
    params: any
  ): void;
  onUpdateLevelEvent(userLevel: number, userPower: number): void;
  onUpdateLevelEventWithParams(
    userLevel: number,
    userPower: number,
    params: any
  ): void;

  getKuaishouOpenId(
    code: string
  ): Promise<{ session_key: string; openid: string; unionid: string }>;
  getDouyinOpenId(
    code: string
  ): Promise<{ session_key: string; openid: string; unionid: string }>;
  getBilibiliOpenId(
    code: string
  ): Promise<{ session_key: string; openid: string; unionid: string }>;
  /**
   * 暂停/开启上报
   * @param {bool} enabled YES：开启上报 NO：暂停上报
   * @deprecated This method is deprecated, use setTrackStatus() instand.
   */
  enableTracking(enabled: boolean): void;
  /**
   * 停止上报，后续的上报和设置都无效，数据将清空
   * @deprecated This method is deprecated, use setTrackStatus() instand.
   */
  optOutTracking(): void;
  /**
   * 停止上报，后续的上报和设置都无效，数据将清空，并且发送 user_del
   * @deprecated This method is deprecated, use setTrackStatus() instand.
   */
  optOutTrackingAndDeleteUser(): void;
  /**
   * 允许上报
   * @deprecated This method is deprecated, use setTrackStatus() instand.
   */
  optInTracking(): void;
  /**
   * 设置数据上报状态
   * PAUSE 暂停数据上报
   * STOP 停止数据上报，并清除缓存
   * SAVE_ONLY 数据入库，但不上报 (接入Native原生可支持，JS暂不支持此状态，默认等同 NORMAL)
   * NORMAL 恢复数据上报
   * @param {string} status 上报状态
   */
  setTrackStatus(status: string): void;
}
