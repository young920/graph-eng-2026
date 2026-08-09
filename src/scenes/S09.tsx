import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s09 · §9 理想参考架构 · 10s · 流式布局
// 8 区块 2x4 网格
const BLOCKS = [
  { roman: 'I',    title: 'OVERVIEW',      body: '实体 + 关系的图' },
  { roman: 'II',   title: 'ARCHITECTURE',  body: 'Goal → Component → Feedback' },
  { roman: 'III',  title: 'PRINCIPLES',    body: '图优于线 · 局部决策' },
  { roman: 'IV',   title: 'TOPOLOGY',      body: 'Linear · Fan · Diamond · Mesh' },
  { roman: 'V',    title: 'PRIMITIVES',    body: '9 原语：Node · Edge · State · Memory · Router · Verifier', highlight: true },
  { roman: 'VI',   title: 'OPERATIONS',    body: 'Plan → Execute → Adapt' },
  { roman: 'VII',  title: 'FLOW',          body: 'Diamond 路由示例' },
  { roman: 'VIII', title: 'OUTCOMES',      body: '扩展 · 抗变化 · 可观测', highlight: true },
];

export const S09: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: '4px 0 8px', height: '100%',
    }}>
      {/* 副标 */}
      <div style={{ position: 'relative' }}>
        
      </div>

      {/* 主标题 */}
      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.064}>
          <div style={{
            fontSize: 22, fontWeight: 800, color: styles.ink,
            lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            三维坐标里<span style={{ color: styles.red }}>一格</span>的展开
          </div>
        </FadeUp>
      </div>

      {/* 强调线 */}
      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.153} width={56} height={2} />
      </div>

      {/* 8 区块 2 列网格 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 6,
        paddingTop: 4,
        flex: 1, minHeight: 0,
      }}>
        {BLOCKS.map((b, i) => (
          <div key={b.roman} style={{ position: 'relative' }}>
            <FadeUp delay={40 + i * 7}>
              <div style={{
                padding: '6px 8px',
                backgroundColor: b.highlight ? styles.red15 : styles.appCard,
                boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
                border: `1px solid ${b.highlight ? styles.red : styles.ink30}`,
                borderRadius: 12,
                display: 'flex', flexDirection: 'column',
                minHeight: 60,
                height: '100%',
              }}>
                <div style={{
                  display: 'flex', alignItems: 'center', gap: 6,
                  marginBottom: 5, paddingBottom: 4,
                  borderBottom: `1px solid ${styles.ink30}`,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: b.highlight ? styles.red : styles.ink50,
                    fontFamily: styles.fontEn, letterSpacing: '0.1em',
                  }}>{b.roman}.</span>
                  <span style={{
                    fontSize: 11, fontWeight: 800,
                    color: b.highlight ? styles.red : styles.ink,
                    letterSpacing: '0.02em',
                  }}>{b.title}</span>
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 500, color: styles.ink70,
                  lineHeight: 1.35, whiteSpace: 'pre-line',
                  flex: 1,
                }}>{b.body}</div>
              </div>
            </FadeUp>
          </div>
        ))}
      </div>

      {/* 底部红线总结 */}
      <div style={{ position: 'relative', paddingTop: 6 }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            textAlign: 'center',
            fontSize: 11, fontWeight: 600, color: styles.ink70,
            letterSpacing: '0.02em', lineHeight: 1.5,
            padding: '8px 12px',
            borderTop: `1px solid ${styles.ink30}`,
            borderBottom: `1px solid ${styles.ink30}`,
          }}>
            最该记住的三条原语<br />
            <span style={{
              fontSize: 13, fontWeight: 800, color: styles.red,
              letterSpacing: '0.05em',
            }}>Router · Reducer · Verifier</span>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};