export function alignToGrid(val: number, alignTo: number): number {
  const remainder = val % alignTo;
  const halfway = alignTo / 2;

  if (remainder > halfway) {
    // Ci troviamo nella metà superiore: avviciniamoci al multiplo successivo
    return alignTo - remainder;
  } else {
    // Ci troviamo nella metà inferiore: avviciniamoci al multiplo precedente
    return -remainder;
  }
}
