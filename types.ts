
export interface ColorInfo {
  name: string;
  hex: string;
  usage: string;
}

export interface Typography {
  headerFont: string;
  bodyFont: string;
}

export interface LogoPrompts {
  primary: string;
  secondaryMark: string;
  wordmark: string;
}

export interface BrandBibleData {
  logoPrompts: LogoPrompts;
  colorPalette: ColorInfo[];
  typography: Typography;
}

export interface GeneratedLogos {
  primary: string;
  secondaryMark: string;
  wordmark: string;
}
