import React from 'react';
import { FadeUp, PopIn, styles } from './_layout';

// s05 · §5 三维框架 · 10s · 流式布局
// 中央公式 PopIn 弹入 + 3 栏说明 + 底部总结
const DIMS = [
  { n: '01', en: 'SCOPE',     cn: '实体域', body: 'Work Graph\nvs\nOrg Graph' },
  { n: '02', en: 'PLANE',     cn: '视角层', body: 'Control · Execution\nEvaluation\nAdaptation · Governance', red: true },
  { n: '03', en: 'DYNAMISM',  cn: '动态度', body: '静态 · 条件\n生成\n自适应' },
];

export const S05: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      padding: '4px 0 8px', height: '100%',
      alignItems: 'center',
    }}>
      {/* 顶部小标 + 主标 */}
      <div style={{ position: 'relative', alignSelf: 'stretch' }}>
        
      </div>

      {/* 中央公式 */}
      <div style={{ position: 'relative', paddingTop: 8 }}>
        <PopIn delayRatio={0.175}>
          <div style={{
            textAlign: 'center',
            fontSize: 34, fontWeight: 800, color: styles.ink,
            letterSpacing: '-0.02em', lineHeight: 1.05,
            fontFamily: styles.fontFamily,
          }}>
            <span style={{ color: styles.red }}>Scope</span>
            <span style={{ color: styles.ink30, margin: '0 10px' }}>×</span>
            <span style={{ color: styles.red }}>Plane</span>
            <span style={{ color: styles.ink30, margin: '0 10px' }}>×</span>
            <span style={{ color: styles.red }}>Dynamism</span>
          </div>
        </PopIn>
      </div>

      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.280}>
          <div style={{
            textAlign: 'center',
            fontSize: 10, fontWeight: 600, color: styles.ink50,
            letterSpacing: '0.2em', fontFamily: styles.fontEn,
          }}>
            A THREE-AXIS RULER
          </div>
        </FadeUp>
      </div>

      {/* 中央分隔横线 */}
      <div style={{
        position: 'relative',
        alignSelf: 'stretch',
        height: 1, backgroundColor: styles.ink30, margin: '4px 18px',
      }} />

      {/* 3 栏说明 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 12,
        alignSelf: 'stretch',
        paddingTop: 6,
      }}>
        {DIMS.map((d, i) => (
          <div key={d.n} style={{ position: 'relative' }}>
            <FadeUp delay={100 + i * 14}>
              <div style={{
                paddingTop: 10,
                borderTop: `2px solid ${d.red ? styles.red : styles.ink}`,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
                  marginBottom: 8,
                }}>
                  <span style={{
                    fontSize: 10, fontWeight: 700,
                    color: d.red ? styles.red : styles.ink50,
                    letterSpacing: '0.15em', fontFamily: styles.fontEn,
                  }}>{d.n}</span>
                  <span style={{
                    fontSize: 9, fontWeight: 700, color: styles.ink50,
                    letterSpacing: '0.18em', fontFamily: styles.fontEn,
                  }}>{d.en}</span>
                </div>
                <div style={{
                  fontSize: 18, fontWeight: 800, color: styles.ink,
                  letterSpacing: '-0.01em', lineHeight: 1.15,
                  marginBottom: 8,
                }}>{d.cn}</div>
                <div style={{
                  fontSize: 11, fontWeight: 500, color: styles.ink70,
                  lineHeight: 1.5, letterSpacing: '0.01em',
                  whiteSpace: 'pre-line',
                }}>{d.body}</div>
              </div>
            </FadeUp>
          </div>
        ))}
      </div>

      {/* 底部一句话总结 */}
      <div style={{ position: 'relative', paddingTop: 8, alignSelf: 'stretch' }}>
        <FadeUp delayRatio={0.595}>
          <div style={{
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 16px',
              backgroundColor: styles.red15,
              borderRadius: 4,
              fontSize: 12, fontWeight: 700, color: styles.red,
              letterSpacing: '0.04em',
            }}>
              每次看到 Graph · 先问这三个问题
            </div>
          </div>
        </FadeUp>
      </div>

      <div style={{ position: 'relative', alignSelf: 'stretch' }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            textAlign: 'center', fontSize: 9, fontWeight: 600,
            color: styles.ink50, letterSpacing: '0.2em',
            fontFamily: styles.fontEn,
          }}>
            THREE QUESTIONS BEFORE YOU DRAW
          </div>
        </FadeUp>
      </div>
    </div>
  );
};