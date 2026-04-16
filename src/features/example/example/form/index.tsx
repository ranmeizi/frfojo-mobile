"use client";

import { Button, Form, Input, Switch } from "@arco-design/mobile-react";
import useForm from "@arco-design/mobile-react/esm/form/useForm";
import { View } from "@/components/adapt";
import { FormInternalComponentType } from "@arco-design/mobile-react/esm/form/type";
import { ValidatorType } from "@arco-design/mobile-utils";
import { Toast } from "@/lib/arco-imperative";
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: { padding: t.space16, background: t.colorPageBg, color: t.colorText },
  card: {
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    padding: t.space12,
  },
  row: { display: "flex", gap: t.space8, marginTop: t.space12 },
  helper: { marginTop: t.space12, color: t.colorTextSecondary, fontSize: t.fontSizeSm },
}));

const usernameRules = [
  { type: ValidatorType.String, required: true, message: "请输入用户名" },
  {
    type: ValidatorType.Custom,
    validator: (...args: unknown[]) => {
      const value = String(args[1] ?? "");
      const callback = args[2] as ((error?: string) => void) | undefined;
      if (value.trim().length >= 2) {
        callback?.();
        return;
      }
      callback?.("用户名至少 2 个字符");
    },
  },
];

const emailRules = [
  { type: ValidatorType.String, required: true, message: "请输入邮箱" },
  {
    type: ValidatorType.Custom,
    validator: (...args: unknown[]) => {
      const value = String(args[1] ?? "");
      const callback = args[2] as ((error?: string) => void) | undefined;
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (ok) {
        callback?.();
        return;
      }
      callback?.("邮箱格式不正确");
    },
  },
];

export default function ExampleForm() {
  const styles = useStyles();
  const [form] = useForm();

  return (
    <View className={styles.root}>
      <View className={styles.card}>
        <Form
          form={form}
          initialValues={{ username: "", email: "", agree: false }}
          onSubmit={(values) => {
            Toast.success(`提交成功: ${values.username}`);
          }}
          onSubmitFailed={(_values, errorFields) => {
            const firstError = Array.isArray(errorFields) ? errorFields[0] : null;
            const msg = firstError?.errors?.[0] ? String(firstError.errors[0]) : "请检查表单项";
            Toast.error(msg);
          }}
        >
          <Form.Item field="username" label="用户名" rules={usernameRules}>
            <Input placeholder="请输入用户名" border="none" />
          </Form.Item>

          <Form.Item field="email" label="邮箱" rules={emailRules}>
            <Input placeholder="demo@example.com" border="none"/>
          </Form.Item>

          <Form.Item
            field="agree"
            label="同意协议"
            displayType={FormInternalComponentType.Switch}
            layout="inline"
          >
            <Switch platform="ios" />
          </Form.Item>

          <View className={styles.row}>
            <Button type="ghost" onClick={() => form.resetFields()}>
              重置
            </Button>
            <Button color="primary" onClick={() => form.submit()}>
              提交
            </Button>
          </View>
        </Form>

        <View className={styles.helper}>
          官方风格基础示例：原生 Form.Item + Input/Switch + 提交/重置。
        </View>
      </View>
    </View>
  );
}
