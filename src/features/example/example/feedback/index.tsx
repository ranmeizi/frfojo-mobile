"use client";

import { useState } from "react";
import {
  ActionSheet,
  Button,
  Cell,
  Dialog,
  Divider,
  Loading,
  NoticeBar,
  Notify,
  Popup,
  Toast,
} from "@arco-design/mobile-react";
import { View } from "@/components/adapt";
import { arcoImperativeContext } from "@/lib/arco-imperative-context";
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: { padding: t.space16, background: t.colorPageBg, color: t.colorText },
  block: {
    marginTop: t.space12,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    padding: t.space12,
  },
  row: { display: "flex", gap: t.space8, alignItems: "center", flexWrap: "wrap" },
  popupInner: { padding: t.space16 },
}));

export default function ExampleFeedback() {
  const styles = useStyles();
  const [popupVisible, setPopupVisible] = useState(false);
  const [actionVisible, setActionVisible] = useState(false);

  return (
    <View className={styles.root}>
      <View className={styles.block}>
        <NoticeBar>Theme check: notice, loading, toast, dialog, popup, action-sheet.</NoticeBar>
        <Divider />
        <Cell.Group bordered={false}>
          <Cell
            label="Notify"
            desc="顶部通知"
            onClick={() => Notify.success("Notify success", arcoImperativeContext)}
            showArrow
            clickable
          />
          <Cell
            label="Toast"
            desc="轻提示"
            onClick={() => Toast.success("Toast success", arcoImperativeContext)}
            showArrow
            clickable
          />
        </Cell.Group>
      </View>

      <View className={styles.block}>
        <View className={styles.row}>
          <Button type="primary" onClick={() => setPopupVisible(true)}>
            Open Popup
          </Button>
          <Button onClick={() => setActionVisible(true)}>ActionSheet</Button>
          <Button
            type="ghost"
            onClick={() =>
              Dialog.confirm(
                {
                  title: "Confirm",
                  children: "检查 Dialog 的主题是否同步",
                },
                arcoImperativeContext,
              )
            }
          >
            Dialog
          </Button>
          <Loading />
        </View>
      </View>

      <Popup
        visible={popupVisible}
        close={() => setPopupVisible(false)}
        onMaskClick={() => setPopupVisible(false)}
      >
        <View className={styles.popupInner}>
          <h3>Popup Content</h3>
          <p>用于检查弹层背景、文字、遮罩。</p>
          <Button type="primary" onClick={() => setPopupVisible(false)}>
            Close
          </Button>
        </View>
      </Popup>

      <ActionSheet
        visible={actionVisible}
        close={() => setActionVisible(false)}
        items={[
          { content: "Action 1", onClick: () => setActionVisible(false) },
          { content: "Action 2", onClick: () => setActionVisible(false) },
        ]}
        cancelText="取消"
      />
    </View>
  );
}
