export interface DetailPresentationConfig {
  title: string;
  lines: DetailPresentationLine[];
}

export interface DetailPresentationLine {
  header: string;
  detail: string;
  oneliner: boolean;
}
