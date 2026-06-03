export type Coords = `${number},${number}`;
export type Walls = Set<Coords>;
export type TileCoords = [x: number, y: number];

export interface Coords2D {
  x: number;
  y: number;
}
