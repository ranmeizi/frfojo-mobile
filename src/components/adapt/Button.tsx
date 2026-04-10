"use client";

import type { ReactNode } from "react";
import { Button as ArcoButton } from "@arco-design/mobile-react";

export type ButtonProps = {
  children?: ReactNode;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  loading?: boolean;
  /**
   * 对齐 Taro 的语义（可逐步扩展）。
   * H5 侧映射到 Arco 的 Button。
   */
  type?: "default" | "primary" | "warning" | "danger";
  size?: "mini" | "small" | "default" | "large";
  onClick?: () => void;
  onTap?: () => void;
};

type ArcoButtonType = "default" | "primary" | "ghost";

function mapType(type: ButtonProps["type"]): ArcoButtonType {
  switch (type) {
    case "primary":
      return "primary";
    case "danger":
    case "warning":
      return "primary";
    case "default":
    default:
      return "default";
  }
}

export function Button({
  onTap,
  onClick,
  type = "default",
  ...rest
}: ButtonProps) {
  return (
    <ArcoButton
      {...(rest as unknown as Record<string, unknown>)}
      type={mapType(type)}
      onClick={() => {
        onClick?.();
        onTap?.();
      }}
    />
  );
}
