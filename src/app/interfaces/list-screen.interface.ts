export interface ListConfig {
  isInExpansionTable: boolean;
  headers: ListHeaderConfig[];
  lines: string[][];
}

export interface ListHeaderConfig {
  widthFactor: number;
  content: string;
}
