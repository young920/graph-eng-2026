// Stage · 540×720 竖版（抖音比例）· 编辑感杂志版式
// 风格：米白底 + 黑文字 + 紫粉蓝渐变光晕 + 玻璃拟态
// 排版：左上对齐为主 · 中英双语
//
// Stage 严格分区（v35）· 锁死每个区域高度，子元素不得溢出
// 720 总高固定分区（v35 终极版）：
//   0   ~  36 : TopBar（顶部标题栏）
//  36   ~  90 : SectionLabel（章节小标）
//  90   ~ 560 : 主内容（470px，给 s00 5 重点完整空间）
// 560   ~ 580 : 间隔（20px 视觉呼吸，主内容和字幕彻底分离）
// 580   ~ 700 : SubtitleBar（120px，往下挪到屏幕底部 1/5）
// 700   ~ 720 : 极简 Footer（20px，仅章节号 + 数字）
const STAGE_TOP = 36;
const STAGE_SECTION = 54;
const STAGE_CONTENT = 470;
const STAGE_CONTENT_GAP = 20;
const STAGE_SUBTITLE = 120;
const STAGE_FOOTER = 20;
const STAGE_TOTAL = STAGE_TOP + STAGE_SECTION + STAGE_CONTENT + STAGE_CONTENT_GAP + STAGE_SUBTITLE + STAGE_FOOTER; // = 720
// A1 质感元素：BigNumber + ChapterTag + AuthorCard
// 关键修复 v29：移除 AuthorCard summary 字段（避免和 SubtitleBar 双字幕）
// 关键修复 v29：BigNumber 不再带 label 文本（避免大数字里塞整段话）

import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig } from 'remotion';
import subtitles from '../subtitles.json';

// === SegDuration Context（让 FadeUp 等子组件自动按段时长缩放）===
export const SegDurationContext = React.createContext<number>(10);

// === 配色（AURORA · 紫粉蓝渐变 + 米白 + 黑灰）===
const PAPER = '#FAF7F2';
const INK = '#1A1A1F';
const INK_70 = 'rgba(26, 26, 31, 0.7)';
const INK_50 = 'rgba(26, 26, 31, 0.5)';
const INK_30 = 'rgba(26, 26, 31, 0.18)';
const AURORA_PINK = '#E8B4D8';
const AURORA_PURPLE = '#9B8FD9';
const AURORA_BLUE = '#B4D4E8';
const AURORA_ACCENT = '#9B8FD9';
const AURORA_PINK_15 = 'rgba(232, 180, 216, 0.45)';
const AURORA_PURPLE_15 = 'rgba(155, 143, 217, 0.4)';
const AURORA_BLUE_15 = 'rgba(180, 212, 232, 0.45)';

export const styles = {
  width: 540,
  height: 720,
  paper: PAPER,
  paperDeep: '#F0EBE2',
  ink: INK,
  ink70: INK_70,
  ink50: INK_50,
  ink30: INK_30,
  red: AURORA_ACCENT,
  red15: AURORA_PURPLE_15,
  accent: AURORA_ACCENT,
  accentPurple15: AURORA_PURPLE_15,
  accentPink15: AURORA_PINK_15,
  accentBlue15: AURORA_BLUE_15,
  auroraPink: AURORA_PINK,
  auroraPurple: AURORA_PURPLE,
  auroraBlue: AURORA_BLUE,
  appBg: '#FFFFFF',
  appCard: 'rgba(255, 255, 255, 0.7)',
  glassShadow: '0 2px 12px rgba(155, 143, 217, 0.08), 0 8px 32px rgba(232, 180, 216, 0.06)',
  fontFamily: '"PingFang SC", "Helvetica Neue", "Inter", "Noto Sans SC", sans-serif',
  fontEn: '"Inter", "Helvetica Neue", "Arial Black", sans-serif',
  fontMono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
};

// === 13 段标题 ===
export const TOP_NAMES: string[] = [
  '封面 · 别再晕',
  '图=点+边',
  '表格 vs 图',
  '6 层数据栈',
  'Agent 图工程',
  '三维框架',
  'Scope 维度',
  'Plane 维度',
  'Dynamism 维度',
  '理想架构',
  'Scope×Plane 矩阵',
  'CodexLoom 案例',
  '带走三把尺子',
];

export const TOP_EN: string[] = [
  'COVER · STOP CONFUSION',
  'CHAPTER · NODES+EDGES',
  'CHAPTER · TABLE vs GRAPH',
  'CHAPTER · 6-LAYER STACK',
  'CHAPTER · MULTI-AGENT GRAPH',
  'CHAPTER · 3D FRAMEWORK',
  'CHAPTER · SCOPE',
  'CHAPTER · PLANE',
  'CHAPTER · DYNAMISM',
  'CHAPTER · ARCHITECTURE',
  'CHAPTER · MATRIX',
  'CHAPTER · CODEXLOOM',
  'CHAPTER · TAKE AWAYS',
];

// === TopBar · 顶部标题栏 · v34 缩到 36px ===
export const TopBar: React.FC<{ segIndex: number }> = ({ segIndex }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{
      height: 36,
      flexShrink: 0,
      backgroundColor: 'rgba(255, 255, 255, 0.4)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 24px',
      borderBottom: `1px solid ${styles.ink30}`,
      fontSize: 11, fontWeight: 600, letterSpacing: '0.08em',
      color: styles.ink, opacity: op,
      fontFamily: styles.fontFamily,
    }}>
      <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 10, height: 10, borderRadius: '50%',
          background: `linear-gradient(135deg, ${AURORA_PINK}, ${AURORA_PURPLE})`,
          display: 'inline-block',
          boxShadow: `0 0 12px ${AURORA_PINK_15}, 0 0 6px ${AURORA_PURPLE_15}`,
        }} />
        <span style={{ letterSpacing: '0.15em' }}>Graph Engineering · 一图读懂</span>
      </span>
      <span style={{
        fontFamily: styles.fontEn, fontSize: 10,
        color: styles.ink50, letterSpacing: '0.2em', fontWeight: 600,
      }}>
        VOL.01 / 2026
      </span>
    </div>
  );
};

// === SectionLabel · 杂志版头（中英双行小标 + 主标题）· v34 padding 收紧到 8+8 ===
export const SectionLabel: React.FC<{
  segIndex: number;
  zh: string;
  en: string;
}> = ({ segIndex, zh, en }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [3, 18], [0, 1], { extrapolateRight: 'clamp' });
  const slideY = interpolate(frame, [3, 18], [16, 0], { extrapolateRight: 'clamp' });
  return (
    <div style={{
      flexShrink: 0,
      padding: '8px 24px 8px',
      opacity: op, transform: `translateY(${slideY}px)`,
    }}>
      <div style={{
        fontSize: 10, fontWeight: 500, color: styles.ink50,
        letterSpacing: '0.18em', marginBottom: 3,
        fontFamily: styles.fontFamily,
        textTransform: 'uppercase',
      }}>
        {zh}
      </div>
      <div style={{
        fontSize: 9, fontWeight: 700, color: styles.ink70,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        fontFamily: styles.fontEn,
      }}>
        {en}
      </div>
      <div style={{
        marginTop: 8,
        width: 36, height: 2,
        background: `linear-gradient(90deg, ${AURORA_PURPLE}, ${AURORA_PINK}, transparent)`,
        borderRadius: 1,
      }} />
    </div>
  );
};

// === SubtitleBar · 玻璃拟态字幕条（v33 重写：外层 wrapper 锁死 80px，内层 lineClamp 2）===
export const SubtitleBar: React.FC<{ segId: string; startTime: number }> = ({ segId, startTime }) => {
  const frame = useCurrentFrame();
  const currentTime = startTime + frame / 30;
  const segSubs = (subtitles as any)[segId] || [];
  // 当前字幕：findIndex 找匹配；末尾 fallback 显示最后一句
  let cur = segSubs.findIndex((s: any) => currentTime >= (s.start + startTime) && currentTime < (s.end + startTime));
  let text: string;
  let active: boolean;
  if (cur < 0) {
    if (segSubs.length > 0 && currentTime >= (segSubs[segSubs.length - 1].end + startTime)) {
      text = segSubs[segSubs.length - 1].text;
      active = false;
    } else {
      // 段开头没字幕时显示空占位（玻璃条仍可见）
      text = '';
      active = false;
    }
  } else {
    text = segSubs[cur].text;
    active = true;
  }
  return (
    <div style={{
      margin: '0 18px',
      padding: '0',
      height: STAGE_SUBTITLE,        // 100px 锁死，更大更靠下
      display: 'flex', alignItems: 'center',
      overflow: 'hidden',
    }}>
      <div style={{
        width: '100%',
        minHeight: 0, maxHeight: 92,
        display: '-webkit-box', alignItems: 'center',
        WebkitLineClamp: 3,
        WebkitBoxOrient: 'vertical',
        padding: '12px 18px',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(24px) saturate(180%)',
        WebkitBackdropFilter: 'blur(24px) saturate(180%)',
        color: styles.ink,
        fontSize: 14, fontWeight: active ? 700 : 500, lineHeight: 1.45,
        letterSpacing: '0.02em',
        textAlign: 'left',
        borderRadius: 14,
        borderLeft: active ? `4px solid ${AURORA_PURPLE}` : '4px solid transparent',
        borderTop: `1px solid rgba(255, 255, 255, 0.6)`,
        borderRight: `1px solid rgba(155, 143, 217, 0.14)`,
        borderBottom: `1px solid rgba(155, 143, 217, 0.14)`,
        boxShadow: active
          ? `0 8px 28px ${AURORA_PURPLE_15}, 0 2px 6px rgba(155, 143, 217, 0.08), inset 0 1px 0 rgba(255, 255, 255, 0.6)`
          : `0 2px 10px rgba(155, 143, 217, 0.06)`,
        fontFamily: styles.fontFamily,
        overflow: 'hidden',
      }}>
        {text}
      </div>
    </div>
  );
};

// === Stage wrapper · 严格的垂直分区，无 absolute 重叠 ===
export const Stage: React.FC<{
  segIndex: number;
  segId: string;
  startTime: number;
  segDuration: number;
  zh: string;
  en: string;
  caption: string;
  children: React.ReactNode;
}> = ({ segIndex, segId, startTime, segDuration, zh, en, caption, children }) => (
  <SegDurationContext.Provider value={segDuration}>
  <div style={{
    width: 540,
    height: 720,  // STAGE_TOTAL 锁死 720
    backgroundColor: PAPER,
    fontFamily: styles.fontFamily,
    color: styles.ink,
    display: 'grid',
    gridTemplateRows: `${STAGE_TOP}px ${STAGE_SECTION}px ${STAGE_CONTENT}px ${STAGE_CONTENT_GAP}px ${STAGE_SUBTITLE}px ${STAGE_FOOTER}px`,
    overflow: 'hidden',
    position: 'relative',
    backgroundImage: `
      radial-gradient(ellipse 70% 40% at 90% 10%, ${AURORA_PINK_15}, transparent 70%),
      radial-gradient(ellipse 60% 35% at 10% 90%, ${AURORA_BLUE_15}, transparent 70%),
      radial-gradient(ellipse 50% 30% at 50% 60%, ${AURORA_PURPLE_15}, transparent 70%),
      linear-gradient(120deg, transparent 0%, ${AURORA_PINK_15} 30%, ${AURORA_PURPLE_15} 50%, ${AURORA_BLUE_15} 70%, transparent 100%)
    `,
  }}>
    <TopBar segIndex={segIndex} />
    <SectionLabel segIndex={segIndex} zh={zh} en={en} />
    {/* 主内容 · 严格 420px 高 · overflow:hidden 裁掉任何溢出 */}
    <div style={{
      padding: `0 24px`,
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
      minHeight: 0,
    }}>
      {children}
    </div>
    {/* 间隔 20px · 视觉呼吸 */}
    <div />
    {/* SubtitleBar · 100px，往下挪更靠下 */}
    <SubtitleBar segId={segId} startTime={startTime} />
    {/* Footer · 装饰条（大数字 + 章节号）· 占位不抢空间 */}
    <BottomDecor segIndex={segIndex} />
  </div>
</SegDurationContext.Provider>
);

// v31 删除 AuthorCard 组件（PRISM 头像无意义，仅是冗余装饰）

// === BottomDecor · 底部装饰条（大数字 + 章节号 · 水平分布不重叠）· v33 改成 Grid 占位 footer ===
const BottomDecor: React.FC<{ segIndex: number }> = ({ segIndex }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const numStr = String(segIndex).padStart(2, '0');
  const variant = segIndex === 0 ? 'COVER'
    : segIndex === 12 ? 'TAKEAWAY'
    : segIndex <= 4 ? 'CHAPTER'
    : segIndex <= 8 ? 'FRAMEWORK'
    : 'CASE';
  return (
    <div style={{
      // v35: 极简 Footer，20px 高度，仅章节号 + 大数字横排
      height: STAGE_FOOTER,
      padding: '0 24px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      opacity: op,
      pointerEvents: 'none',
      fontFamily: styles.fontEn,
    }}>
      {/* 左：章节号标牌 */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
      }}>
        <div style={{
          width: 2, height: 10,
          background: `linear-gradient(180deg, ${AURORA_PINK}, ${AURORA_PURPLE})`,
          borderRadius: 1,
        }} />
        <span style={{
          fontSize: 9, fontWeight: 700,
          color: styles.ink50, letterSpacing: '0.18em',
        }}>
          {variant}
        </span>
        <span style={{
          fontSize: 9, fontWeight: 800,
          color: styles.ink, letterSpacing: '0.04em',
        }}>
          −{numStr}
        </span>
      </div>
      {/* 右：大数字 */}
      <span style={{
        fontSize: 14, fontWeight: 800,
        color: styles.ink, opacity: 0.35,
        letterSpacing: '-0.02em',
      }}>
        {numStr}/13
      </span>
    </div>
  );
};

// === 动效工具集 ===

// FadeUp · 流式 · opacity + translateY
export const FadeUp: React.FC<{ delay?: number; delayRatio?: number; duration?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, delayRatio, duration = 15, children, style }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const segDuration = React.useContext(SegDurationContext);
  const realDelay = (delayRatio !== undefined)
    ? Math.round(delayRatio * segDuration * config.fps)
    : (delay || 0);
  const op = interpolate(frame, [realDelay, realDelay + duration], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const y = interpolate(frame, [realDelay, realDelay + duration], [24, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      opacity: op,
      transform: `translateY(${y}px)`,
      ...style,
    }}>{children}</div>
  );
};

// SlideIn · 横向 · 0.5s · 30px
export const SlideIn: React.FC<{ delay?: number; delayRatio?: number; from?: 'left' | 'right'; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, delayRatio, from = 'left', children, style }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const segDuration = React.useContext(SegDurationContext);
  const realDelay = (delayRatio !== undefined)
    ? Math.round(delayRatio * segDuration * config.fps)
    : (delay || 0);
  const dx = from === 'left' ? -30 : 30;
  const tx = interpolate(frame, [realDelay, realDelay + 15], [dx, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const op = interpolate(frame, [realDelay, realDelay + 15], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ opacity: op, transform: `translateX(${tx}px)`, ...style }}>{children}</div>;
};

// PopIn · 弹性缩放 · 关键强调（数字/标题）
export const PopIn: React.FC<{ delay?: number; delayRatio?: number; children: React.ReactNode; style?: React.CSSProperties; from?: number }> = ({ delay, delayRatio, children, style, from = 0.7 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const segDuration = React.useContext(SegDurationContext);
  const realDelay = (delayRatio !== undefined)
    ? Math.round(delayRatio * segDuration * fps)
    : (delay || 0);
  const s = spring({
    frame: Math.max(0, frame - realDelay),
    fps,
    config: { damping: 14, stiffness: 180, mass: 0.6 },
  });
  const scale = s * (1 - from) + from;
  return <div style={{ transform: `scale(${scale})`, opacity: Math.max(0, s), ...style }}>{children}</div>;
};

// DrawLine · 强调线（横向延展 · 0.4s）
export const DrawLine: React.FC<{ delay?: number; delayRatio?: number; width: number; height?: number; color?: string; style?: React.CSSProperties }> = ({ delay, delayRatio, width, height = 2, color, style }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const segDuration = React.useContext(SegDurationContext);
  const realDelay = (delayRatio !== undefined)
    ? Math.round(delayRatio * segDuration * config.fps)
    : (delay || 0);
  const w = interpolate(frame, [realDelay, realDelay + 12], [0, width], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  return <div style={{ width: w, height, backgroundColor: color || AURORA_ACCENT, borderRadius: height / 2, ...style }} />;
};