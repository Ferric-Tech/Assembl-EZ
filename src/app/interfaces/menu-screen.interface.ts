export enum MenuOptionType {
  HOME,
  URL,
  VIEWSTATE,
}

export enum MenuOptionStyle {
  PRIMARY,
  SECONDARY,
}

export interface MenuOption {
  style: MenuOptionStyle;
  display: string;
  optionType: MenuOptionType;
  link?: string;
  viewState?: number;
}
