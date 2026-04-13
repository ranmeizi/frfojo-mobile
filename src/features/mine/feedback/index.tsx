"use client";

import { useState } from "react";
import { Button, Textarea, Toast } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { arcoImperativeContext } from "@/lib/arco-imperative-context";
import { useMineSubStyles } from "@/features/mine/sub-styles";

export default function MineFeedback() {
  const sub = useMineSubStyles();
  const [text, setText] = useState("");

  const submit = () => {
    const v = text.trim();
    if (!v) {
      Toast.error("请先填写反馈内容", arcoImperativeContext);
      return;
    }
    Toast.success("感谢反馈，我们已记录（演示）", arcoImperativeContext);
    setText("");
  };

  return (
    <View className={sub.pageRoot}>
      <View className={sub.intro}>
        描述问题现象、复现步骤或建议。信息越具体，我们越能高效跟进。
      </View>
      <View className={sub.inputShell}>
        <Textarea
          value={text}
          onChange={(_, v) => setText(v)}
          placeholder="请输入反馈内容（不少于 10 字）"
          maxLength={500}
          showStatistics
          rows={6}
        />
      </View>
      <View style={{ marginTop: 20, width: "100%" }}>
        <Button type="primary" size="large" style={{ width: "100%" }} onClick={submit}>
          提交反馈
        </Button>
      </View>
    </View>
  );
}
