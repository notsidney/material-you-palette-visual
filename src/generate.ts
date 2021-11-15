import { CorePalette } from "./material-color-utilities/typescript/palettes/core_palette";
import { TonalPalette } from "./material-color-utilities/typescript/palettes/tonal_palette";

const TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

export function generateCorePalette(rootColor: number) {
  const corePalette = CorePalette.of(rootColor);
  const paletteToHex = (palette: TonalPalette) =>
    TONES.map((tone) => palette.tone(tone).toString(16).substr(2));

  return paletteToHex(corePalette.a1);
}
