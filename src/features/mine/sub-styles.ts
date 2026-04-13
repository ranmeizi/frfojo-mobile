import { createStyles } from "@/lib/styles/create-styles";

const fontSans = `system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", sans-serif`;

/**
 * 加在 `Cell.Group` 的 `className` 上，与 `sub.card` 并列。
 * Arco Cell 用 rem 跟随 flexible 根字号，往往比页面说明字大一号；由 `style.css` 内选择器压到 14/13/12px。
 */
export const MINE_CELL_SCOPE_CLASS = "mine-cell-scope";

export function mineCellGroupClass(cardClassName: string) {
  return `${MINE_CELL_SCOPE_CLASS} ${cardClassName}`;
}

/** Mine 模块：统一字体、字阶、版面节奏（主页 + 二级栈页） */
export const useMineSubStyles = createStyles((t) => ({
  /** 与主页一致的页面壳：渐变底 + 系统字体栈 + 水平安全边距 */
  pageRoot: {
    padding: `${t.space16} ${t.space16} ${t.space32}`,
    minHeight: "100%",
    boxSizing: "border-box",
    background: `linear-gradient(180deg, ${t.colorBgSecondary} 0%, ${t.colorPageBg} 26%, ${t.colorPageBg} 100%)`,
    color: t.colorText,
    fontFamily: fontSans,
    WebkitFontSmoothing: "antialiased",
  },
  /** 区块标题：中文场景略收紧字距，保证可读性 */
  sectionLabel: {
    marginTop: t.space20,
    marginBottom: t.space8,
    paddingLeft: 2,
    fontSize: t.fontSizeSm,
    fontWeight: 600,
    lineHeight: t.lineHeightTight,
    letterSpacing: "0.02em",
    color: t.colorTextTertiary,
  },
  sectionLabelFirst: {
    marginTop: t.space12,
  },
  /** 列表/表单卡片 */
  card: {
    marginTop: t.space12,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusXl,
    overflow: "hidden",
    boxShadow: t.shadow1,
  },
  cardFirst: {
    marginTop: 0,
  },
  /** 页顶说明性段落 */
  intro: {
    marginTop: 0,
    marginBottom: t.space12,
    fontSize: t.fontSizeSm,
    lineHeight: 1.65,
    color: t.colorTextSecondary,
  },
  /** 辅助说明（法律/演示提示） */
  hint: {
    marginTop: t.space16,
    fontSize: t.fontSizeSm,
    lineHeight: 1.65,
    color: t.colorTextSecondary,
  },
  /** 内容块标题（如「热门问题」） */
  blockTitle: {
    marginTop: t.space20,
    marginBottom: t.space8,
    fontSize: t.fontSizeMd,
    fontWeight: 600,
    lineHeight: t.lineHeightTight,
    letterSpacing: "-0.02em",
    color: t.colorText,
  },
  /** 紧跟卡片后的标题（略收紧上间距） */
  sectionHeading: {
    marginTop: t.space16,
    marginBottom: t.space8,
    fontSize: t.fontSizeMd,
    fontWeight: 600,
    lineHeight: t.lineHeightTight,
    letterSpacing: "-0.02em",
    color: t.colorText,
  },
  footerCaption: {
    textAlign: "center",
    marginTop: t.space24,
    fontSize: t.fontSizeXs,
    lineHeight: 1.5,
    color: t.colorTextTertiary,
  },
  /** 列表行左侧图标槽（与主页一致） */
  listIconWrap: {
    width: 32,
    height: 32,
    borderRadius: t.radiusMd,
    background: t.colorBgTertiary,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: t.colorTextSecondary,
  },
  listIconGlyph: {
    fontSize: 18,
    lineHeight: 1,
  },
  /** 反馈等多行输入外壳 */
  inputShell: {
    marginTop: t.space12,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    padding: t.space12,
    boxShadow: t.shadow1,
  },
  /** 关于页头图 */
  aboutHero: {
    textAlign: "center",
    padding: `${t.space24} ${t.space16}`,
    background: `linear-gradient(160deg, ${t.colorCard} 0%, ${t.colorBgTertiary} 100%)`,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusXl,
    boxShadow: t.shadow1,
  },
  aboutTitle: {
    fontSize: "22px",
    fontWeight: 700,
    letterSpacing: "-0.03em",
    lineHeight: 1.25,
    color: t.colorText,
  },
  aboutVersion: {
    marginTop: t.space8,
    fontSize: t.fontSizeSm,
    lineHeight: t.lineHeightNormal,
    color: t.colorTextSecondary,
  },
  /** FAQ 条目 */
  faqCard: {
    marginTop: t.space8,
    padding: `${t.space12} ${t.space16}`,
    background: t.colorCard,
    border: `1px solid ${t.colorBorder}`,
    borderRadius: t.radiusLg,
    boxShadow: t.shadow1,
  },
  faqQ: {
    fontSize: t.fontSizeMd,
    fontWeight: 600,
    lineHeight: 1.45,
    color: t.colorText,
    marginBottom: t.space8,
  },
  faqA: {
    fontSize: t.fontSizeSm,
    lineHeight: 1.65,
    color: t.colorTextSecondary,
  },
  /** 会员页权益说明卡内文 */
  membershipBody: {
    padding: t.space16,
  },
  membershipSectionTitle: {
    fontSize: t.fontSizeMd,
    fontWeight: 600,
    letterSpacing: "-0.01em",
    marginBottom: t.space8,
    color: t.colorText,
  },
  membershipBullet: {
    fontSize: t.fontSizeSm,
    lineHeight: 1.65,
    color: t.colorTextSecondary,
  },
  /** 空状态 */
  emptyWrap: {
    padding: `${t.space32} ${t.space16}`,
    textAlign: "center",
  },
  emptyTitle: {
    fontSize: t.fontSizeLg,
    fontWeight: 600,
    letterSpacing: "-0.02em",
    lineHeight: t.lineHeightTight,
    color: t.colorText,
    marginBottom: t.space8,
  },
  emptyDesc: {
    fontSize: t.fontSizeSm,
    lineHeight: 1.65,
    color: t.colorTextTertiary,
    maxWidth: 280,
    marginLeft: "auto",
    marginRight: "auto",
  },
  /** 兼容旧名：二级页根（与 pageRoot 相同） */
  root: {
    padding: `${t.space16} ${t.space16} ${t.space32}`,
    minHeight: "100%",
    boxSizing: "border-box",
    background: `linear-gradient(180deg, ${t.colorBgSecondary} 0%, ${t.colorPageBg} 26%, ${t.colorPageBg} 100%)`,
    color: t.colorText,
    fontFamily: fontSans,
    WebkitFontSmoothing: "antialiased",
  },
  empty: {
    padding: t.space32,
    textAlign: "center",
    color: t.colorTextTertiary,
    fontSize: t.fontSizeSm,
    lineHeight: 1.65,
  },
}));
