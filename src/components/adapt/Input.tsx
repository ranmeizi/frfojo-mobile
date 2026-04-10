"use client";

import { Input as ArcoInput } from "@arco-design/mobile-react";

export type InputProps = {
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  clearable?: boolean;
  /**
   * Taro 对齐：回传 value
   */
  onInput?: (value: string) => void;
  onChange?: (value: string) => void;
};

export function Input({ onInput, onChange, ...rest }: InputProps) {
  return (
    <ArcoInput
      {...(rest as unknown as Record<string, unknown>)}
      onChange={(v: unknown) => {
        const value = String(v ?? "");
        onChange?.(value);
        onInput?.(value);
      }}
    />
  );
}
