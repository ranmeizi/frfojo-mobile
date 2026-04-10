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
import { createStyles } from "@/lib/styles/create-styles";

const useStyles = createStyles((t) => ({
  root: { padding: t.space16, background: t.colorPageBg, color: t.colorText },
  title: { margin: 0, fontSize: t.fontSizeLg },
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
    <div className={styles.root}>
      <h2 className={styles.title}>Feedback & Overlay</h2>

      <div className={styles.block}>
        <NoticeBar>Theme check: notice, loading, toast, dialog, popup, action-sheet.</NoticeBar>
        <Divider />
        <Cell.Group bordered={false}>
          <Cell
            label="Notify"
            desc="顶部通知"
            onClick={() => Notify.success("Notify success")}
            showArrow
            clickable
          />
          <Cell
            label="Toast"
            desc="轻提示"
            onClick={() => Toast.success("Toast success")}
            showArrow
            clickable
          />
        </Cell.Group>
      </div>

      <div className={styles.block}>
        <div className={styles.row}>
          <Button type="primary" onClick={() => setPopupVisible(true)}>
            Open Popup
          </Button>
          <Button onClick={() => setActionVisible(true)}>ActionSheet</Button>
          <Button
            type="ghost"
            onClick={() =>
              Dialog.confirm({
                title: "Confirm",
                children: "检查 Dialog 的主题是否同步",
              })
            }
          >
            Dialog
          </Button>
          <Loading />
        </div>
      </div>

      <Popup
        visible={popupVisible}
        close={() => setPopupVisible(false)}
        onMaskClick={() => setPopupVisible(false)}
      >
        <div className={styles.popupInner}>
          <h3>Popup Content</h3>
          <p>用于检查弹层背景、文字、遮罩。</p>
          <Button type="primary" onClick={() => setPopupVisible(false)}>
            Close
          </Button>
        </div>
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
    </div>
  );
}
