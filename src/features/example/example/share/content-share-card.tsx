"use client";

import { Button } from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { createStyles } from "@/lib/styles/create-styles";
import { Toast } from "@/lib/arco-imperative";

type ContentShareCardProps = {
  title: string;
  summary: string;
  body: string[];
  imageUrl: string;
  imageAlt: string;
};

const useStyles = createStyles((t) => ({
  root: {
    padding: t.space16,
    background: t.colorPageBg,
    color: t.colorText,
  },
  card: {
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    padding: t.space12,
  },
  title: { margin: 0, fontSize: t.fontSizeLg, lineHeight: t.lineHeightTight },
  summary: {
    marginTop: t.space8,
    marginBottom: t.space12,
    color: t.colorTextSecondary,
    fontSize: t.fontSizeSm,
    lineHeight: t.lineHeightLoose,
  },
  cover: {
    width: "100%",
    display: "block",
    borderRadius: t.radiusMd,
    border: `1px solid ${t.colorBorder}`,
    marginBottom: t.space12,
    aspectRatio: "1200 / 630",
    objectFit: "cover",
  },
  paragraph: {
    marginTop: t.space8,
    marginBottom: 0,
    fontSize: t.fontSizeSm,
    lineHeight: t.lineHeightLoose,
  },
  actionRow: { marginTop: t.space16, display: "flex", gap: t.space8 },
}));

export function ContentShareCard({ title, summary, body, imageUrl, imageAlt }: ContentShareCardProps) {
  const styles = useStyles();

  async function handleShare() {
    const url = window.location.href;
    const payload = { title, text: summary, url };

    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share(payload);
        return;
      } catch (error) {
        // 用户取消分享时不提示错误，避免打扰。
        if (error instanceof Error && error.name === "AbortError") return;
      }
    }

    if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(url);
      Toast.success("已复制链接，可直接粘贴分享");
      return;
    }

    Toast.error("当前环境不支持分享或复制，请手动复制地址栏链接");
  }

  return (
    <View className={styles.root}>
      <View className={styles.card}>
        <h1 className={styles.title}>{title}</h1>
        <p className={styles.summary}>{summary}</p>
        <img className={styles.cover} src={imageUrl} alt={imageAlt} />
        {body.map((item) => (
          <p key={item} className={styles.paragraph}>
            {item}
          </p>
        ))}

        <View className={styles.actionRow}>
          <Button color="primary" onClick={handleShare}>
            分享当前内容页
          </Button>
        </View>
      </View>
    </View>
  );
}
