import { CorePalette } from "./material-color-utilities/typescript/palettes/core_palette";
import { TonalPalette } from "./material-color-utilities/typescript/palettes/tonal_palette";
import { HCT } from "./material-color-utilities/typescript/hct/hct";

export const TONES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100];

export function generateCorePalette(keyColor: number) {
  const corePalette = CorePalette.of(keyColor);

  const paletteValues = (palette: TonalPalette) =>
    TONES.map((tone) => {
      const argb = palette.tone(tone);
      const hct = HCT.fromInt(argb);

      return {
        hex: "#" + argb.toString(16).substr(2),
        h: hct.hue,
        c: hct.chroma,
        t: hct.tone,
      };
    });

  return [
    { name: "a1", palette: paletteValues(corePalette.a1) },
    { name: "a2", palette: paletteValues(corePalette.a2) },
    { name: "a3", palette: paletteValues(corePalette.a3) },
    { name: "n1", palette: paletteValues(corePalette.n1) },
    { name: "n2", palette: paletteValues(corePalette.n2) },
    { name: "error", palette: paletteValues(corePalette.error) },
  ] as const;
}
