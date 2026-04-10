import type { HTMLAttributes } from "react";
import type { CommonProps, TapEventHandler } from "./types";

export type ViewProps = CommonProps & {
  onClick?: HTMLAttributes<HTMLDivElement>["onClick"];
  onTap?: TapEventHandler;
};

export function View({ onTap, onClick, ...rest }: ViewProps) {
  const hasHandler = Boolean(onClick || onTap);
  return (
    <div
      {...rest}
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
