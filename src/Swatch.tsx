import { createElement } from "react";
import { HCT } from "./material-color-utilities/typescript/hct/hct";

import "./Swatch.css";

import { colord, extend } from "colord";
import lchPlugin from "colord/plugins/lch";
extend([lchPlugin]);

export interface ISwatchProps {
  component?: "td" | "th";
  hex: string;
  h: number;
  c: number;
  t: number;
  display?: "hex" | "lch" | "hct";
  children?: React.ReactNode;
}

export default function Swatch({
  component = "td",
  hex,
  h,
  c,
  t,
  display = "hex",
  children,
}: ISwatchProps) {
  const contrastColor =
    "#" +
    HCT.from(h, c, t > 50 ? t - 80 : t + 80)
      .toInt()
      .toString(16)
      .substr(2);

  let render: React.ReactNode;
  if (display === "hex") render = hex;
  if (display === "hct")
    render = (
      <dl>
        <dt>H</dt>
        <dd>{h.toFixed(0)}</dd>
        <dt>C</dt>
        <dd>{c.toFixed(0)}</dd>
        <dt>T</dt>
        <dd>{t.toFixed(0)}</dd>
      </dl>
    );
  if (display === "lch") {
    const lch = colord(hex).toLch();
    render = (
      <dl>
        <dt>L</dt>
        <dd>{lch.l.toFixed(0)}</dd>
        <dt>C</dt>
        <dd>{lch.c.toFixed(0)}</dd>
        <dt>H</dt>
        <dd>{lch.h.toFixed(0)}</dd>
      </dl>
    );
  }

  return createElement(component, {
    style: { backgroundColor: hex, color: contrastColor },
    className: "swatch",
    children: children ?? render,
  });
}
