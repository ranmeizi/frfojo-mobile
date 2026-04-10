import type { UIEventHandler } from "react";
import type { CommonProps } from "./types";

export type ScrollViewProps = CommonProps & {
  scrollY?: boolean;
  scrollX?: boolean;
  onScroll?: UIEventHandler<HTMLDivElement>;
};

export function ScrollView({
  scrollY = false,
  scrollX = false,
  style,
  ...rest
}: ScrollViewProps) {
  const overflowY = scrollY ? "auto" : undefined;
  const overflowX = scrollX ? "auto" : undefined;

  return (
    <div
      {...rest}
      style={{
        overflowY,
        overflowX,
        WebkitOverflowScrolling: "touch",
        ...style,
      }}
    />
  );
}
