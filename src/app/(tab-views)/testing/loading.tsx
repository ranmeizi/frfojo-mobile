"use client";

import { Skeleton } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";

export default function TestingLoading() {
  return (
    <View style={{ padding: 16 }}>
      <Skeleton title={{ width: 92 }} paragraph={false} />
      <View style={{ marginTop: 8 }}>
        <Skeleton title={{ width: 168 }} paragraph={false} />
      </View>
      <View style={{ marginTop: 16 }}>
        <View
          style={{
            background: "var(--token-color-card)",
            border: "1px solid var(--token-color-border)",
            borderRadius: "14px",
            boxShadow: "var(--token-shadow-1)",
            overflow: "hidden",
          }}
        >
          <View
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 56,
              padding: "12px 16px",
            }}
          >
            <View style={{ flex: 1 }}>
              <Skeleton title={{ width: 80 }} paragraph={false} />
              <View style={{ marginTop: 6 }}>
                <Skeleton title={{ width: 150 }} paragraph={false} />
              </View>
            </View>
            <View style={{ width: 42, marginLeft: 12 }}>
              <Skeleton title={{ width: 42 }} paragraph={false} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
