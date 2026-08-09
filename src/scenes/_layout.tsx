// Stage · 540×1172 竖版 · "杂志页 + 抖音小红书外框" 套娃版式
// 风格：米白底 + 黑文字 + 红色 #C53F3F 点睛 + 抖音/小红书 App UI 固定外层
// 排版：左上对齐为主 · 中英双语 · 编辑感
//
// === 版式（严格分区）===
// 1172 总高
//  0  ~  28 : 抖音状态栏（黑底白字，时间随段递增）
// 28  ~  72 : 顶头条（dot + 中文标 + VOL 期号）
// 72  ~ 130 : 杂志头版眉（中文小标 + 英文 sans 双行）
// 130 ~ 870 : 主内容区（每段不同版式：卡片/分屏/栈/三栏/对比/矩阵）
// 870 ~ 920 : 强调线 + 大数字底纹（如有）
// 920 ~1010 : 底部小红书卡片（作者 + 一句总结 + 互动数据）
// 1010~1100 : tabbar 区
// 1100~1172 : 字幕条（窄条左对齐）

import React from 'react';
import { useCurrentFrame, interpolate, spring, useVideoConfig, AbsoluteFill } from 'remotion';
import subtitles from '../subtitles.json';

// === SegDuration Context（让 FadeUp 等子组件自动按段时长缩放）===
export const SegDurationContext = React.createContext<number>(10);

// === 配色（AURORA · 紫粉蓝渐变 + 米白 + 黑灰）===
const PAPER = '#FAF7F2';          // 米白底（AURORA）
const PAPER_DEEP = '#F0EBE2';     // 米白深（卡片底）
const INK = '#1A1A1F';            // 主黑（标题）
const INK_70 = 'rgba(26, 26, 31, 0.7)'; // 副灰
const INK_50 = 'rgba(26, 26, 31, 0.5)'; // 辅助灰
const INK_30 = 'rgba(26, 26, 31, 0.18)'; // 分割线灰
const AURORA_PINK = '#E8B4D8';    // 极光粉
const AURORA_PURPLE = '#9B8FD9';  // 极光紫
const AURORA_BLUE = '#B4D4E8';    // 极光蓝
const AURORA_ACCENT = '#9B8FD9';  // 强调紫（替代红）
const AURORA_PINK_15 = 'rgba(232, 180, 216, 0.45)';
const AURORA_PURPLE_15 = 'rgba(155, 143, 217, 0.4)';
const AURORA_BLUE_15 = 'rgba(180, 212, 232, 0.45)';
const APP_BG = '#FFFFFF';         // App 外框白底
const APP_CARD = 'rgba(255, 255, 255, 0.7)'; // 玻璃拟态卡（半透明白）
const GLASS_SHADOW = '0 2px 12px rgba(155, 143, 217, 0.08), 0 8px 32px rgba(232, 180, 216, 0.06)';

export const styles = {
  width: 540,
  height: 1172,
  paper: PAPER,
  paperDeep: PAPER_DEEP,
  ink: INK,
  ink70: INK_70,
  ink50: INK_50,
  ink30: INK_30,
  red: AURORA_ACCENT,           // 兼容旧名 = 强调紫
  red15: AURORA_PURPLE_15,      // 兼容旧名 = 紫块浅（中等透明度）
  accent: AURORA_ACCENT,        // 新名
  accentPurple15: AURORA_PURPLE_15,
  accentPink15: AURORA_PINK_15,
  accentBlue15: AURORA_BLUE_15,
  auroraPink: AURORA_PINK,
  auroraPurple: AURORA_PURPLE,
  auroraBlue: AURORA_BLUE,
  appBg: APP_BG,
  appCard: APP_CARD,
  glassShadow: GLASS_SHADOW,
  fontFamily: '"PingFang SC", "Helvetica Neue", "Inter", "Noto Sans SC", sans-serif',
  fontEn: '"Inter", "Helvetica Neue", "Arial Black", sans-serif',
  fontMono: '"SF Mono", "JetBrains Mono", "Menlo", monospace',
  // AURORA 预设组合（段文件可用）
  glassCard: `${GLASS_SHADOW} 0 0 0 1px rgba(155, 143, 217, 0.08)`,
};

// === 13 段标题（按文章 12 章 + 封面/结语映射）===
export const TOP_NAMES: string[] = [
  '封面 · 别再晕',           // s00
  '图=点+边',               // s01 §1
  '表格 vs 图',             // s02 §2
  '6 层数据栈',             // s03 §3
  'Agent 图工程',           // s04 §4
  '三维框架',               // s05 §5
  'Scope 维度',             // s06 §6
  'Plane 维度',             // s07 §7
  'Dynamism 维度',          // s08 §8
  '理想架构',               // s09 §9
  'Scope×Plane 矩阵',       // s10 §10
  'CodexLoom 案例',         // s11 §11
  '带走三把尺子',           // s12 §12+结语
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




export const TopBar: React.FC<{ segIndex: number }> = ({ segIndex }) => {
  const frame = useCurrentFrame();
  const op = interpolate(frame, [0, 14], [0, 1], { extrapolateRight: 'clamp' });
  return (
    <div style={{
      height: 44,
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

// === 杂志版头（中英双行小标 + 主标题）===
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
      padding: '14px 24px 12px',
      opacity: op, transform: `translateY(${slideY}px)`,
    }}>
      <div style={{
        fontSize: 11, fontWeight: 500, color: styles.ink50,
        letterSpacing: '0.18em', marginBottom: 4,
        fontFamily: styles.fontFamily,
        textTransform: 'uppercase',
      }}>
        {zh}
      </div>
      <div style={{
        fontSize: 10, fontWeight: 700, color: styles.ink70,
        letterSpacing: '0.22em', textTransform: 'uppercase',
        fontFamily: styles.fontEn,
      }}>
        {en}
      </div>
      {/* AURORA 装饰线（紫粉渐变细线，呼应参考视频的横向柔光带） */}
      <div style={{
        marginTop: 10,
        width: 36, height: 2,
        background: `linear-gradient(90deg, ${AURORA_PURPLE}, ${AURORA_PINK}, transparent)`,
        borderRadius: 1,
      }} />
    </div>
  );
};



// === 字幕条（窄条 · 左对齐 · 半透明黑底 · ≤ 2 行）===
export const SubtitleBar: React.FC<{ segId: string; startTime: number }> = ({ segId, startTime }) => {
  const frame = useCurrentFrame();
  const currentTime = startTime + frame / 30;
  const segSubs = (subtitles as any)[segId] || [];
  const idx = segSubs.findIndex((s: any) => currentTime >= s.start && currentTime < s.end);
  if (idx < 0) {
    if (segSubs.length > 0 && currentTime >= segSubs[segSubs.length - 1].end) {
      return <SubtitleLine text={segSubs[segSubs.length - 1].text} active={false} />;
    }
    return null;
  }
  return <SubtitleLine text={segSubs[idx].text} active={true} />;
};

const SubtitleLine: React.FC<{ text: string; active: boolean }> = ({ text, active }) => (
  <div style={{
    margin: '0 18px 14px',
    minHeight: 40, maxHeight: 72,
    display: 'flex', alignItems: 'center',
    padding: '10px 14px',
    backgroundColor: 'rgba(26, 26, 31, 0.78)',
    color: '#FFFFFF',
    fontSize: 13, fontWeight: active ? 600 : 400, lineHeight: 1.5,
    letterSpacing: '0.04em',
    textAlign: 'left',
    borderRadius: 10,
    borderLeft: active ? `3px solid ${AURORA_PURPLE}` : '3px solid transparent',
    boxShadow: active ? `0 4px 20px ${AURORA_PURPLE_15}` : 'none',
    transition: 'border-color 0.2s, box-shadow 0.2s',
    fontFamily: styles.fontFamily,
  }}>
    {text}
  </div>
);

// === Stage wrapper（v17 流式布局 · 上下垂直堆叠，无 absolute 重叠）===
export const Stage: React.FC<{
  segIndex: number;
  segId: string;
  startTime: number;
  segDuration: number;  // 秒 · 段时长（含气口）
  zh: string;
  en: string;
  caption: string;
  children: React.ReactNode;
}> = ({ segIndex, segId, startTime, segDuration, zh, en, caption, children }) => (
  <SegDurationContext.Provider value={segDuration}>
  <div style={{
    width: 540,
    height: 720,
    backgroundColor: PAPER,
    fontFamily: styles.fontFamily,
    color: styles.ink,
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
    position: 'relative',
    // AURORA 柔光带：从右上到左下的紫粉蓝渐变光晕 + 横向条纹
    backgroundImage: `
      radial-gradient(ellipse 70% 40% at 90% 10%, ${AURORA_PINK_15}, transparent 70%),
      radial-gradient(ellipse 60% 35% at 10% 90%, ${AURORA_BLUE_15}, transparent 70%),
      radial-gradient(ellipse 50% 30% at 50% 60%, ${AURORA_PURPLE_15}, transparent 70%),
      linear-gradient(120deg, transparent 0%, ${AURORA_PINK_15} 30%, ${AURORA_PURPLE_15} 50%, ${AURORA_BLUE_15} 70%, transparent 100%)
    `,
  }}>
    <TopBar segIndex={segIndex} />
    <SectionLabel segIndex={segIndex} zh={zh} en={en} />
    {/* 主内容区：flex 1 自适应填满中间，无 absolute 不重叠 */}
    <div style={{
      flex: 1,
      padding: '0 24px',
      display: 'flex',
      flexDirection: 'column',
      minHeight: 0,
      position: 'relative',
    }}>
      {children}
    </div>
    <SubtitleBar segId={segId} startTime={startTime} />
  </div>
</SegDurationContext.Provider>
);

// === 极简动效工具集（统一语言：fade + 小幅 slide）===

// FadeUp · 流式 · opacity + translateY 动效
// delayRatio（0~1）相对段时长自动缩放；delay 接受帧数（绝对）
export const FadeUp: React.FC<{ delay?: number; delayRatio?: number; duration?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ delay, delayRatio, duration = 15, children, style }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const segDuration = React.useContext(SegDurationContext);
  // 如果传了 delayRatio，按比例缩放到段时长
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
// delay 接受帧数（绝对）或 delayRatio（0~1，相对段时长）
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

// PopIn · 弹性缩放 · 关键强调（数字/标题）· ≤ 1 次/段
// delay 接受帧数（绝对）或 delayRatio（0~1，相对段时长）
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
// delay 接受帧数（绝对）或 delayRatio（0~1，相对段时长）
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