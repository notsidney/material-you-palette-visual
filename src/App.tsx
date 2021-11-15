import { useState } from "react";

import "./App.css";
import { generateCorePalette, TONES } from "./generate";
import { HCT } from "./material-color-utilities/typescript/hct/hct";
import Swatch from "./Swatch";

export default function App() {
  const [color, setColor] = useState("#3a6920");
  const colorAsNum = parseInt(color.replace("#", ""), 16);
  const colorAsHct = HCT.fromInt(colorAsNum);

  const generated = generateCorePalette(colorAsNum);
  console.log(generated);

  const [display, setDisplay] = useState<"hex" | "lch" | "hct">("hex");
  const handleDisplayChange: React.ChangeEventHandler<HTMLInputElement> = (e) =>
    setDisplay(e.target.id as typeof display);

  return (
    <div className="App">
      <header>
        <form>
          <label htmlFor="color">Key color:</label>
          <input
            id="color"
            type="color"
            defaultValue={color}
            onChange={(e) => setColor(e.target.value)}
          />
        </form>

        <fieldset>
          <legend>Display:</legend>
          <input
            type="radio"
            name="display"
            id="hex"
            checked={display === "hex"}
            onChange={handleDisplayChange}
          />
          <label htmlFor="hex">Hex</label>
          <input
            type="radio"
            name="display"
            id="lch"
            checked={display === "lch"}
            onChange={handleDisplayChange}
          />
          <label htmlFor="lch">LCH</label>
          <input
            type="radio"
            name="display"
            id="hct"
            checked={display === "hct"}
            onChange={handleDisplayChange}
          />
          <label htmlFor="hct">HCT</label>
        </fieldset>
      </header>

      <table>
        <tbody>
          <tr>
            <th>Key color</th>
            {new Array(TONES.length)
              .fill(0)
              .map((_, i) =>
                i === Math.round(colorAsHct.tone / 10) ? (
                  <Swatch
                    key={i}
                    hex={color}
                    h={colorAsHct.hue}
                    c={colorAsHct.chroma}
                    t={colorAsHct.tone}
                    display={display}
                  />
                ) : (
                  <td key={i} className="swatch" />
                )
              )}
          </tr>
        </tbody>
      </table>

      <table>
        <thead>
          <tr>
            <th>Palette</th>
            {TONES.map((tone) => (
              <Swatch
                key={tone}
                component="th"
                hex={"#" + HCT.from(0, 0, tone).toInt().toString(16).substr(2)}
                h={0}
                c={0}
                t={tone}
              >
                {tone}
              </Swatch>
            ))}
          </tr>
        </thead>

        <tbody>
          {generated.map(({ name, palette }) => (
            <tr key={name}>
              <th scope="row">{name}</th>
              {palette.map((tone) => (
                <Swatch key={tone.t} {...tone} display={display} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
