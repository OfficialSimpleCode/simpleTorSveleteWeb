


class SettingItemModel {
  icon?: IconData;
  name: string = "";
  needBeConected: boolean = false;
  children: SettingItemModel[][] = [];
  permissionLimit: number = 0;
  needBeDisconected: boolean = false;
  disposeOnTapCallback?: () => boolean;
  index: number = 0;
  isLast: boolean = false;
  showPrefix: boolean = true;
  canAccessWhenDisable: boolean = false;
  canAccessWhenCrossLimit: boolean = false;
  isFirst: boolean = false;
  onTap?: () => PromiseOrValue;
  suffix?: Widget;
  showSuffixWithTrailing: boolean = false;
  subtitleWidget?: Widget;
  subtitleNeedGender: boolean = true;
  subtitleNeedTranslate: boolean = true;
  titleNeedTransalate: boolean = true;
  subtitle?: string;
  trailing?: Widget;
  isFather: boolean = false;
  isChild: boolean = false;
  searchModePath: string[] = [];
  middleSearchPath: string[] = [];
  showInSearch?: () => boolean;

  showcaseKey?: GlobalKey<State<StatefulWidget>>;
  onFinishShowcase?: () => PromiseOrValue;
  onPreviousShowcase?: () => PromiseOrValue;
  showcaseToolTipPosition?: TooltipPosition;

  constructor({
    name,
    index,
    titleNeedTransalate = true,
    showPrefix = true,
    children = [],
    permissionLimit = 0,
    needBeConected = false,
    disposeOnTapCallback,
    icon,
    onFinishShowcase,
    onPreviousShowcase,
    needBeDisconected = false,
    showSuffixWithTrailing = false,
    subtitleWidget,
    showInSearch,
    middleSearchPath = [],
    subtitleNeedGender = true,
    showcaseKey,
    subtitleNeedTranslate = true,
    isLast = false,
    isFirst = false,
    canAccessWhenDisable = false,
    canAccessWhenCrossLimit = false,
    subtitle,
    onTap,
    suffix,
    showcaseToolTipPosition,
    trailing,
  }: {
    name: string;
    index: number;
    titleNeedTransalate?: boolean;
    showPrefix?: boolean;
    children?: SettingItemModel[][];
    permissionLimit?: number;
    needBeConected?: boolean;
    disposeOnTapCallback?: () => boolean;
    icon?: IconData;
    onFinishShowcase?: () => PromiseOrValue;
    onPreviousShowcase?: () => PromiseOrValue;
    needBeDisconected?: boolean;
    showSuffixWithTrailing?: boolean;
    subtitleWidget?: Widget;
    showInSearch?: () => boolean;
    middleSearchPath?: string[];
    subtitleNeedGender?: boolean;
    showcaseKey?: GlobalKey<State<StatefulWidget>>;
    subtitleNeedTranslate?: boolean;
    isLast?: boolean;
    isFirst?: boolean;
    canAccessWhenDisable?: boolean;
    canAccessWhenCrossLimit?: boolean;
    subtitle?: string;
    onTap?: () => PromiseOrValue;
    suffix?: Widget;
    showcaseToolTipPosition?: TooltipPosition;
    trailing?: Widget;
  }) {
    this.name = name;
    this.index = index;
    this.titleNeedTransalate = titleNeedTransalate;
    this.showPrefix = showPrefix;
    this.children = children;
    this.permissionLimit = permissionLimit;
    this.needBeConected = needBeConected;
    this.disposeOnTapCallback = disposeOnTapCallback;
    this.icon = icon;
    this.onFinishShowcase = onFinishShowcase;
    this.onPreviousShowcase = onPreviousShowcase;
    this.needBeDisconected = needBeDisconected;
    this.showSuffixWithTrailing = showSuffixWithTrailing;
    this.subtitleWidget = subtitleWidget;
    this.showInSearch = showInSearch;
    this.middleSearchPath = middleSearchPath;
    this.subtitleNeedGender = subtitleNeedGender;
    this.showcaseKey = showcaseKey;
    this.subtitleNeedTranslate = subtitleNeedTranslate;
    this.isLast = isLast;
    this.isFirst = isFirst;
    this.canAccessWhenDisable = canAccessWhenDisable;
    this.canAccessWhenCrossLimit = canAccessWhenCrossLimit;
    this.subtitle = subtitle;
    this.onTap = onTap;
    this.suffix = suffix;
    this.showcaseToolTipPosition = showcaseToolTipPosition;
    this.trailing = trailing;
  }

  static fromSettingItemModel(setting: SettingItemModel): SettingItemModel {
    return new SettingItemModel({
      icon: setting.icon,
      name: setting.name,
      disposeOnTapCallback: setting.disposeOnTapCallback,
      index: setting.index,
      onPreviousShowcase: setting.onPreviousShowcase,
      showcaseToolTipPosition: setting.showcaseToolTipPosition,
      onFinishShowcase: setting.onFinishShowcase,
      searchModePath: [...setting.searchModePath],
      children: setting.children,
      showInSearch: setting.showInSearch,
      middleSearchPath: [...setting.middleSearchPath],
      isLast: setting.isLast,
      customPrefix: setting.customPrefix,
      showcaseKey: setting.showcaseKey,
      canAccessWhenDisable: setting.canAccessWhenDisable,
      canAccessWhenCrossLimit: setting.canAccessWhenCrossLimit,
      isFirst: setting.isFirst,
      showSuffixWithTrailing: setting.showSuffixWithTrailing,
      onTap: setting.onTap,
      isChild: setting.isChild,
      titleNeedTransalate: setting.titleNeedTransalate,
      showPrefix: setting.showPrefix,
      showcaseToolTipPosition: setting.showcaseToolTipPosition,
      isFather: setting.isFather,
      suffix: setting.suffix,
      subtitleWidget: setting.subtitleWidget,
      subtitleNeedGender: setting.subtitleNeedGender,
      subtitleNeedTranslate: setting.subtitleNeedTranslate,
      subtitle: setting.subtitle,
      trailing: setting.trailing,
    });
  }

  get isBasicBusinessRestrictSetting(): boolean {
    return (
      BusinessInitializer().business.businessId !== "" &&
      BusinessInitializer().businessSubtype === SubType.basic &&
      advanceOrHigherSettings.includes(this.name)
    );
  }

  get isLandingPageRestrictSetting(): boolean {
    return (
      BusinessInitializer().business.businessId !== "" &&
      BusinessInitializer().businessSubtype === SubType.landingPage &&
      landingPageSubRestrictions.includes(this.name)
    );
  }

  get isDisable(): boolean {
    // add the chance to change this settings when the business passes the limit
    const changeableSettings = ["productsImages", "changingImages", "businessPage", "story"];

    if (GeneralData.currentBusinesssId === "") {
      return false;
    }

    // add the chance to change the workers amount
    // only for subtypes with queue management
    if (BusinessInitializer().businessSubtype !== SubType.landingPage) {
      changeableSettings.push("myWorkers");
    }

    if (!this.canAccessWhenDisable && !BusinessInitializer().activeBusiness) {
      return true;
    }

    if (!this.canAccessWhenCrossLimit && BusinessInitializer().isPassedLimit) {
      return true;
    }

    return false;
  }

  
}
