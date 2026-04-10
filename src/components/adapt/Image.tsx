/* eslint-disable @next/next/no-img-element */
import type { ImgHTMLAttributes } from "react";
import type { CommonProps, TapEventHandler } from "./types";

export type ImageProps = CommonProps & {
  src: string;
  alt?: string;
  mode?: "aspectFill" | "aspectFit" | "widthFix";
  onClick?: ImgHTMLAttributes<HTMLImageElement>["onClick"];
  onTap?: TapEventHandler;
};

function mapObjectFit(mode: ImageProps["mode"]): React.CSSProperties["objectFit"] {
  switch (mode) {
    case "aspectFill":
      return "cover";
    case "aspectFit":
      return "contain";
    case "widthFix":
    default:
      return "contain";
  }
}

export function Image({
  src,
  alt = "",
  mode = "aspectFit",
  style,
  onTap,
  onClick,
  ...rest
}: ImageProps) {
  const hasHandler = Boolean(onClick || onTap);
  return (
    <img
      {...rest}
      src={src}
      alt={alt}
      style={{ objectFit: mapObjectFit(mode), ...style }}
      onClick={
        hasHandler
          ? (e) => {
              onClick?.(e);
              onTap?.(e);
            }
          : undefined
      }
    />
  );
}
