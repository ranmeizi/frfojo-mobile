'use client';
import { View } from "@/components/adapt";

export function Page({ children }: { children: React.ReactNode }) {
  return <View className='ffj-page' >{children}</View>;
}