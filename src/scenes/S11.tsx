import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s11 · §11 CodexLoom 案例 · 12s · 流式布局
// 三维定位卡（3 张横排）+ 底部结论
const POSITIONING: Array<{
  dim: string;
  zh: string;
  en: string;
  verdict: string;
  body: string;
}> = [
  { dim: '01', zh: 'Scope',    en: 'ENTITY DOMAIN',  verdict: '认真做 Org',    body: '不做 Work Graph\n专攻组织架构长期层' },
  { dim: '02', zh: 'Plane',    en: 'SYSTEM PLANE',   verdict: 'Exec + Gov 强', body: 'Execution 与 Governance 强\nEvaluation 与 Adaptation 缺' },
  { dim: '03', zh: 'Dynamism', en: 'GRAPH MOTION',   verdict: 'Level 1~2',     body: '只读投影，不运行时生成\n静态 DAG 路线' },
];

export const S11: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      padding: '4px 0 8px', height: '100%',
    }}>
      {/* 副标 */}
      <div style={{ position: 'relative' }}>
        
      </div>

      {/* 主标题 */}
      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.064}>
          <div style={{
            fontSize: 24, fontWeight: 800, color: styles.ink,
            lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            它处在图工程的<span style={{ color: styles.red }}>哪一层</span>
          </div>
        </FadeUp>
      </div>

      {/* 强调线 */}
      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.153} width={56} height={2} />
      </div>

      {/* 3 张定位卡（横排） */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 8,
        paddingTop: 8,
        flex: 1, minHeight: 0,
      }}>
        {POSITIONING.map((p, i) => (
          <div key={p.dim} style={{ position: 'relative' }}>
            <FadeUp delay={40 + i * 14}>
              <div style={{
                backgroundColor: styles.appCard,
                boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
                border: `1px solid ${styles.ink30}`,
                borderRadius: 8,
                padding: '14px 12px',
                display: 'flex', flexDirection: 'column',
                height: '100%',
                minHeight: 240,
              }}>
                <div style={{
                  display: 'flex', alignItems: 'baseline', gap: 6,
                  marginBottom: 4,
                }}>
                  <span style={{
                    fontSize: 11, fontWeight: 700, color: styles.ink50,
                    fontFamily: styles.fontEn, letterSpacing: '0.15em',
                  }}>{p.dim}</span>
                  <span style={{
                    fontSize: 18, fontWeight: 800, color: styles.ink,
                    letterSpacing: '-0.01em',
                  }}>{p.zh}</span>
                </div>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: styles.ink50,
                  letterSpacing: '0.15em', textTransform: 'uppercase',
                  fontFamily: styles.fontEn,
                  marginBottom: 12,
                  paddingBottom: 8,
                  borderBottom: `1px solid ${styles.ink30}`,
                }}>{p.en}</div>
                <div style={{
                  padding: '8px 8px',
                  backgroundColor: styles.red15,
                  borderRadius: 4,
                  marginBottom: 10,
                }}>
                  <div style={{
                    fontSize: 14, fontWeight: 800, color: styles.red,
                    textAlign: 'center',
                    letterSpacing: '0.02em', lineHeight: 1.2,
                  }}>{p.verdict}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 500, color: styles.ink70,
                  lineHeight: 1.5, whiteSpace: 'pre-line',
                  flex: 1,
                }}>{p.body}</div>
                <div style={{
                  marginTop: 8,
                  display: 'flex', justifyContent: 'center',
                }}>
                  <div style={{
                    width: 24, height: 2, borderRadius: 1,
                    backgroundColor: styles.red,
                  }} />
                </div>
              </div>
            </FadeUp>
          </div>
        ))}
      </div>

      {/* 底部结论 */}
      <div style={{ position: 'relative', paddingTop: 6 }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            textAlign: 'center',
            padding: '12px 14px',
            backgroundColor: styles.appCard,
            boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
            border: `1px solid ${styles.ink30}`,
            borderRadius: 12,
          }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: styles.ink,
              lineHeight: 1.5, letterSpacing: '0.02em',
            }}>
              故意只做图工程 <span style={{ color: styles.red, fontWeight: 800 }}>Org 那半</span> 的平台
            </div>
            <div style={{
              fontSize: 10, fontWeight: 500, color: styles.ink50,
              marginTop: 4,
              fontFamily: styles.fontEn,
              letterSpacing: '0.05em',
            }}>
              NOT A HALF-BAKED ENGINE · A DELIBERATE ORG-PLANE PLATFORM
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};