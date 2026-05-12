export interface TextContentConfig {
  string: string;
  requires?: string[];
  bypass?: string[];
  addsFlag?: string;
}

export interface TextContent {
  string: string;
  addsFlag: string | null;
}
