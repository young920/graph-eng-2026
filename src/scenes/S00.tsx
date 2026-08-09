import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s00 · 封面 · 10.5s · 流式布局
// 全部用 delayRatio（0~1）相对段时长自动缩放
export const S00: React.FC<any> = () => {
  const highlights = [
    { n: '01', zh: '图就是点和边', en: 'NODES + EDGES' },
    { n: '02', zh: '表格 vs 图',     en: 'TABLE vs GRAPH' },
    { n: '03', zh: 'Agent 图工程',   en: 'MULTI-AGENT GRAPH' },
    { n: '04', zh: '三维框架',       en: 'SCOPE × PLANE × DYNAMISM' },
    { n: '05', zh: 'CodexLoom 案例', en: 'REAL CASE' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 16,
      padding: '8px 0 16px', height: '100%',
    }}>
      {/* 上半部主标区 */}
      <FadeUp delayRatio={0.0}>
        <div style={{
          fontSize: 10, fontWeight: 700, color: styles.ink50,
          letterSpacing: '0.2em', fontFamily: styles.fontEn,
          textAlign: 'left',
        }}>
          VOL.01 · COVER · 2026
        </div>
      </FadeUp>

      <FadeUp delayRatio={0.05}>
        <div>
          <div style={{
            fontSize: 11, fontWeight: 600, color: styles.ink50,
            letterSpacing: '0.15em', marginBottom: 8,
            fontFamily: styles.fontEn,
          }}>
            PRISM · GRAPH ENGINEERING
          </div>
          <div style={{
            fontSize: 42, fontWeight: 800, color: styles.ink,
            lineHeight: 1.05, letterSpacing: '-0.01em',
            fontFamily: styles.fontFamily,
          }}>
            Graph
            <br />
            Engineering
            <br />
            <span style={{ color: styles.red }}>别再晕</span>
          </div>
        </div>
      </FadeUp>

<div style={{ paddingTop: 4 }}>
        <DrawLine delayRatio={0.5} width={120} height={3} />
      </div>

      <FadeUp delayRatio={0.3}>
        <div style={{
          fontSize: 16, fontWeight: 500, color: styles.ink70,
          lineHeight: 1.4,
        }}>
          把"关系"做成可执行<br />
          <span style={{ fontSize: 12, color: styles.ink50, fontFamily: styles.fontEn }}>
            TURN RELATIONSHIPS INTO EXECUTABLE GRAPHS
          </span>
        </div>
      </FadeUp>

      {/* 5 大重点编号列表 - 顺序 stagger 出现 */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 10,
        paddingTop: 8,
      }}>
        {highlights.map((h, i) => (
          <FadeUp key={h.n} delayRatio={0.4 + i * 0.08}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 14,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 6,
                backgroundColor: i === 0 ? styles.red : 'transparent',
                border: i === 0 ? 'none' : `1px solid ${styles.ink30}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 13, fontWeight: 700,
                color: i === 0 ? '#FFFFFF' : styles.ink,
                fontFamily: styles.fontEn,
                flexShrink: 0,
              }}>
                {h.n}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{
                  fontSize: 14, fontWeight: 700, color: styles.ink,
                }}>
                  {h.zh}
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 600, color: styles.ink50,
                  letterSpacing: '0.08em', marginTop: 2,
                  fontFamily: styles.fontEn,
                }}>
                  {h.en}
                </div>
              </div>
            </div>
          </FadeUp>
        ))}
      </div>
    </div>
  );
};