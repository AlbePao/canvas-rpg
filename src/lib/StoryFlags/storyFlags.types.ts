export interface TextContentConfig {
  string: string;
  requires?: string[];
  bypass?: string[];
  addsFlag?: string;
}

export interface TextContent {
  portraitFrame?: number;
  string: string;
  addsFlag: string | null;
}
