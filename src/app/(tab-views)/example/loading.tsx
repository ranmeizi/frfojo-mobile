"use client";

import { Skeleton } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";

export default function ExampleLoading() {
  return (
    <View style={{ padding: 16 }}>
      <Skeleton title={{ width: 170 }} paragraph={false} />
      <View style={{ marginTop: 8 }}>
        <Skeleton title={{ width: 240 }} paragraph={false} />
      </View>

      <View
        style={{
          marginTop: 16,
          background: "var(--token-color-card)",
          border: "1px solid var(--token-color-border)",
          borderRadius: 14,
          boxShadow: "var(--token-shadow-1)",
          overflow: "hidden",
        }}
      >
        {[0, 1, 2, 3].map((item) => (
          <View
            key={item}
            style={{
              minHeight: 68,
              padding: "12px 16px",
              borderBottom: item !== 3 ? "1px solid var(--token-color-border)" : "none",
            }}
          >
            <Skeleton title={{ width: 116 }} paragraph={false} />
            <View style={{ marginTop: 8 }}>
              <Skeleton title={{ width: 260 }} paragraph={false} />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
