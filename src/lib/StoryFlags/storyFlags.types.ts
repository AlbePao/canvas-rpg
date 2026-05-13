export interface TextConfig {
  portraitFrame?: number | null;
  content: TextContentConfig[];
}

export interface TextContentConfig {
  string: string[];
  requires?: string[];
  bypass?: string[];
  addsFlag?: string;
}

export interface TextContent {
  portraitFrame: number | null;
  string: string[];
  addsFlag: string | null;
}
