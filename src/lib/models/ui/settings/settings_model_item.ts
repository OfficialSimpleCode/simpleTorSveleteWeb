export class SettingItemModel {
  icon?: string;
  name: string = "";
  needBeConected: boolean = false;
  children: SettingItemModel[][] = [];
  permissionLimit: number = 0;
  needBeDisconected: boolean = false;
  disposeOnTapCallback?: (() => boolean) | null;
  index: number = 0;
  isLast: boolean = false;
  showPrefix: boolean = true;
  canAccessWhenDisable: boolean = false;
  canAccessWhenCrossLimit: boolean = false;
  isFirst: boolean = false;
  onTap?: (() => void | Promise<void>) | null;
  suffix?: HTMLBodyElement;
  showSuffixWithTrailing: boolean = false;
  subtitleWidget?: HTMLBodyElement;
  subtitleNeedGender: boolean = true;
  subtitleNeedTranslate: boolean = true;
  titleNeedTransalate: boolean = true;
  subtitle?: string;
  trailing?: HTMLBodyElement;
  customPrefix?: HTMLBodyElement;
  isFather: boolean = false;
  isChild: boolean = false;
  searchModePath: string[] = [];
  middleSearchPath: string[] = [];
  showInSearch?: (() => boolean) | null;

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
    customPrefix,
    needBeDisconected = false,
    showSuffixWithTrailing = false,
    subtitleWidget,
    showInSearch,
    middleSearchPath = [],
    subtitleNeedGender = true,
    subtitleNeedTranslate = true,
    isLast = false,
    isFirst = false,
    canAccessWhenDisable = false,
    canAccessWhenCrossLimit = false,
    subtitle,
    onTap,
    suffix,
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
    icon?: string;
    customPrefix?: HTMLBodyElement;
    needBeDisconected?: boolean;
    showSuffixWithTrailing?: boolean;
    subtitleWidget?: HTMLBodyElement;
    showInSearch?: () => boolean;
    middleSearchPath?: string[];
    subtitleNeedGender?: boolean;
    subtitleNeedTranslate?: boolean;
    isLast?: boolean;
    isFirst?: boolean;
    canAccessWhenDisable?: boolean;
    canAccessWhenCrossLimit?: boolean;
    subtitle?: string;
    onTap?: () => void | Promise<void>;
    suffix?: HTMLBodyElement;
    trailing?: HTMLBodyElement;
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
    this.customPrefix = customPrefix;

    this.needBeDisconected = needBeDisconected;
    this.showSuffixWithTrailing = showSuffixWithTrailing;
    this.subtitleWidget = subtitleWidget;
    this.showInSearch = showInSearch;
    this.middleSearchPath = middleSearchPath;
    this.subtitleNeedGender = subtitleNeedGender;

    this.subtitleNeedTranslate = subtitleNeedTranslate;
    this.isLast = isLast;
    this.isFirst = isFirst;
    this.canAccessWhenDisable = canAccessWhenDisable;
    this.canAccessWhenCrossLimit = canAccessWhenCrossLimit;
    this.subtitle = subtitle;
    this.onTap = onTap;
    this.suffix = suffix;

    this.trailing = trailing;
  }
}
