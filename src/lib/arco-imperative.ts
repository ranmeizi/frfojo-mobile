"use client";

import {
  Dialog as ArcoDialog,
  Notify as ArcoNotify,
  Toast as ArcoToast,
} from "@arco-design/mobile-react";
import { arcoImperativeContext } from "@/lib/arco-imperative-context";

function withArcoContext<Args extends unknown[], ReturnValue>(
  fn: (...args: [...Args, typeof arcoImperativeContext?]) => ReturnValue,
) {
  return (...args: Args): ReturnValue => fn(...args, arcoImperativeContext);
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
};

export const arcoDialog = {
  alert: withArcoContext(ArcoDialog.alert),
  confirm: withArcoContext(ArcoDialog.confirm),
};
