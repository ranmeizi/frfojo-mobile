"use client";

import {
  Dialog as ArcoDialog,
  Notify as ArcoNotify,
  Toast as ArcoToast,
} from "@arco-design/mobile-react";
import { arcoImperativeContext } from "@/lib/arco-imperative-context";

type AnyFunc = (...args: unknown[]) => unknown;

function withArcoContext<T extends AnyFunc>(fn: T) {
  return (...args: Parameters<T>): ReturnType<T> =>
    (fn as (...innerArgs: unknown[]) => unknown)(
      ...args,
      arcoImperativeContext,
    ) as ReturnType<T>;
}

export const Toast = {
  success: withArcoContext(ArcoToast.success),
  error: withArcoContext(ArcoToast.error),
  info: withArcoContext(ArcoToast.info),
  loading: withArcoContext(ArcoToast.loading),
};

export const arcoNotify = {
  success: withArcoContext(ArcoNotify.success),
  error: withArcoContext(ArcoNotify.error),
  info: withArcoContext(ArcoNotify.info),
  warning: withArcoContext(ArcoNotify.warning),
};

export const arcoDialog = {
  alert: withArcoContext(ArcoDialog.alert),
  confirm: withArcoContext(ArcoDialog.confirm),
};
