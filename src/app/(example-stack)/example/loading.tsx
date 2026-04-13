"use client";

import { Skeleton } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";

export default function ExampleStackLoading() {
  return (
    <View style={{ padding: 16 }}>
      <Skeleton title={{ width: 140 }} paragraph={false} />
      <View style={{ marginTop: 16 }}>
        <Skeleton title paragraph={{ rows: 4 }} />
      </View>
    </View>
  );
}
