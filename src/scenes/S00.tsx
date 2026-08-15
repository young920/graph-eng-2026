import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s00 · 封面 · v37 · 杂志封面感 · 信息密度从 8 块降到 5 块
// 上半 65%：主标 Graph/Engineering + 别再晕（核心视觉）
// 下半 35%：5 重点横排一行（信息索引）
const highlights = [
  { n: '01', zh: '点和边',     en: 'NODES' },
  { n: '02', zh: '表格 vs 图', en: 'vs TABLE' },
  { n: '03', zh: 'Agent 图',   en: 'AGENT GRAPH' },
  { n: '04', zh: '三维框架',   en: '3-AXIS' },
  { n: '05', zh: 'CodexLoom',  en: 'REAL CASE' },
];

export const S00: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      height: '100%',
      padding: '0',
    }}>
      {/* ===== 顶部期刊号 ===== */}
      <FadeUp delayRatio={0.0}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: styles.ink50,
          letterSpacing: '0.32em', fontFamily: styles.fontEn,
          textAlign: 'left',
          marginBottom: 18,
        }}>
          VOL · 01 / 2026
        </div>
      </FadeUp>

      {/* ===== 上半部 · 主视觉 · 65% 高度 ===== */}
      <FadeUp delayRatio={0.08}>
        <div style={{
          fontSize: 11, fontWeight: 600, color: styles.ink50,
          letterSpacing: '0.22em', fontFamily: styles.fontEn,
          marginBottom: 14,
        }}>
          PRISM · GRAPH ENGINEERING
        </div>
      </FadeUp>

      {/* 主标 · 单列大字 · 杂志封面感 */}
      <FadeUp delayRatio={0.14}>
        <div style={{
          fontSize: 78, fontWeight: 900, color: styles.ink,
          lineHeight: 0.92, letterSpacing: '-0.045em',
          fontFamily: styles.fontFamily,
          marginBottom: 0,
        }}>
          Graph
        </div>
      </FadeUp>

      <FadeUp delayRatio={0.20}>
        <div style={{
          fontSize: 78, fontWeight: 900, color: styles.ink,
          lineHeight: 0.92, letterSpacing: '-0.045em',
          fontFamily: styles.fontFamily,
          marginBottom: 12,
        }}>
          Engineering
        </div>
      </FadeUp>

      {/* 红色钩子 · 单独一行 · 大字 */}
      <FadeUp delayRatio={0.28}>
        <div style={{
          fontSize: 42, fontWeight: 800, color: styles.red,
          lineHeight: 1.0, letterSpacing: '-0.02em',
          fontFamily: styles.fontFamily,
          marginBottom: 14,
        }}>
          别再晕
        </div>
      </FadeUp>

      {/* 强调线 + 副标 · 一行紧凑 */}
      <FadeUp delayRatio={0.38}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 12,
          marginBottom: 8,
        }}>
          <div style={{
            width: 32, height: 2,
            background: `linear-gradient(90deg, ${styles.red}, transparent)`,
            borderRadius: 1, flexShrink: 0,
          }} />
          <span style={{
            fontSize: 13, fontWeight: 600, color: styles.ink,
            letterSpacing: '0.04em',
          }}>
            把<span style={{ color: styles.red, fontWeight: 800 }}>「关系」</span>做成可执行
          </span>
        </div>
      </FadeUp>

      <FadeUp delayRatio={0.46}>
        <div style={{
          fontSize: 9, fontWeight: 500, color: styles.ink50,
          letterSpacing: '0.28em', fontFamily: styles.fontEn,
          marginLeft: 44,
        }}>
          TURN RELATIONSHIPS INTO EXECUTABLE GRAPHS
        </div>
      </FadeUp>

      {/* ===== 分隔线 · 视觉转场 ===== */}
      <FadeUp delayRatio={0.56}>
        <div style={{
          marginTop: 'auto',
          marginBottom: 14,
          height: 1, backgroundColor: styles.ink30,
        }} />
      </FadeUp>

      {/* ===== 下半部 · 5 重点横排 · 紧凑一行 ===== */}
      <FadeUp delayRatio={0.62}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          marginBottom: 16,
        }}>
          <span style={{
            fontSize: 9, fontWeight: 700, color: styles.ink70,
            letterSpacing: '0.22em', fontFamily: styles.fontEn,
          }}>
            FIVE HIGHLIGHTS
          </span>
          <span style={{
            fontSize: 9, fontWeight: 500, color: styles.ink50,
            fontFamily: styles.fontEn, letterSpacing: '0.12em',
          }}>
            ↓ 拆解
          </span>
        </div>
      </FadeUp>

      <div style={{
        display: 'flex',
        gap: 6,
        alignItems: 'stretch',
      }}>
        {highlights.map((h, i) => (
          <FadeUp key={h.n} delayRatio={0.66 + i * 0.04}>
            <div style={{
              flex: 1,
              display: 'flex', flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '10px 6px',
              borderTop: `2px solid ${i === 0 ? styles.red : styles.ink}`,
              gap: 4,
            }}>
              <span style={{
                fontSize: 11, fontWeight: 800,
                color: i === 0 ? styles.red : styles.ink,
                fontFamily: styles.fontEn,
                lineHeight: 1,
                letterSpacing: '0.05em',
              }}>
                {h.n}
              </span>
              <span style={{
                fontSize: 11, fontWeight: 700,
                color: styles.ink,
                lineHeight: 1.15,
              }}>
                {h.zh}
              </span>
              <span style={{
                fontSize: 7, fontWeight: 600,
                color: styles.ink50,
                letterSpacing: '0.1em',
                fontFamily: styles.fontEn,
                lineHeight: 1.2,
              }}>
                {h.en}
              </span>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
};