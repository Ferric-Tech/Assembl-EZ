export enum MenuOptionType {
  URL,
  VIEWSTATE,
}

export interface MenuOption {
  display: string;
  optionType: MenuOptionType;
  link?: string;
  viewState?: number;
}
