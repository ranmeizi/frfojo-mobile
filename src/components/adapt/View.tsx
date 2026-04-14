import { forwardRef } from "react";
import type { HTMLAttributes } from "react";
import type { CommonProps, TapEventHandler } from "./types";

export type ViewProps = CommonProps & {
  onClick?: HTMLAttributes<HTMLDivElement>["onClick"];
  onTap?: TapEventHandler;
};

export const View = forwardRef<HTMLDivElement, ViewProps>(
  ({ onTap, onClick, ...rest }, ref) => {
    const hasHandler = Boolean(onClick || onTap);
    return (
      <div
        {...rest}
        ref={ref}
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
);

View.displayName = "View";
