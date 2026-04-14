"use client";

import { View } from "@/components/adapt";
import type { PropsWithChildren } from "react";

export type PageProps = PropsWithChildren<{
 
}>;

export function Page({ children }: PageProps) {
  return (
    <View className="ffj-page">
      {children}
    </View>
  );
}
