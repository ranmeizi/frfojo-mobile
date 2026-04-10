import type { CSSProperties, ReactNode } from "react";

export type CommonProps = {
  id?: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export type TapEventHandler = (event: unknown) => void;
