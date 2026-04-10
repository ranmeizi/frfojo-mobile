"use client";

import { Skeleton } from "@arco-design/mobile-react";

export default function TestingLoading() {
  return (
    <div style={{ padding: 16 }}>
      <Skeleton title={{ width: 92 }} paragraph={false} />
      <div style={{ marginTop: 8 }}>
        <Skeleton title={{ width: 168 }} paragraph={false} />
      </div>
      <div style={{ marginTop: 16 }}>
        <div
          style={{
            background: "var(--token-color-card)",
            border: "1px solid var(--token-color-border)",
            borderRadius: "14px",
            boxShadow: "var(--token-shadow-1)",
            overflow: "hidden",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              minHeight: 56,
              padding: "12px 16px",
            }}
          >
            <div style={{ flex: 1 }}>
              <Skeleton title={{ width: 80 }} paragraph={false} />
              <div style={{ marginTop: 6 }}>
                <Skeleton title={{ width: 150 }} paragraph={false} />
              </div>
            </div>
            <div style={{ width: 42, marginLeft: 12 }}>
              <Skeleton title={{ width: 42 }} paragraph={false} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
