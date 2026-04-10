import type { HTMLAttributes } from "react";
import type { CommonProps, TapEventHandler } from "./types";

export type TextProps = CommonProps & {
  as?: "span" | "p" | "strong";
  onClick?: HTMLAttributes<HTMLElement>["onClick"];
  onTap?: TapEventHandler;
};

export function Text({ as = "span", onTap, onClick, ...rest }: TextProps) {
  const Comp = as;
  const hasHandler = Boolean(onClick || onTap);
  return (
    <Comp
      {...rest}
      onClick={
        hasHandler
          ? (e) => {
              onClick?.(e as unknown as never);
              onTap?.(e);
            }
          : undefined
      }
    />
  );
}
