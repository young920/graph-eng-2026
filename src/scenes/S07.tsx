import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s07 · §7 Plane 维度 · 10s · 流式布局
// 五个系统平面 · 5 行编号 · stagger 入场
const PLANES = [
  { num: '01', en: 'Control',    cn: '指挥',   desc: 'Planner / Router / Orchestrator' },
  { num: '02', en: 'Execution',  cn: '做出来', desc: 'Agent 推理 / 工具 / 代码' },
  { num: '03', en: 'Evaluation', cn: '验收',   desc: '多维检查 · Worker/Verifier 不可共享上下文' },
  { num: '04', en: 'Adaptation', cn: '学习',   desc: '6 级修改：Context → Org Graph' },
  { num: '05', en: 'Governance', cn: '定边界', desc: '预算 / 权限 / 不可修改的 Anchor' },
];

export const S07: React.FC<any> = () => {
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
        <FadeUp delayRatio={0.058}>
          <div style={{
            fontSize: 30, fontWeight: 800, color: styles.ink,
            lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            五个<span style={{ color: styles.red }}>系统平面</span>
          </div>
        </FadeUp>
      </div>

      {/* 强调线 */}
      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.140} width={56} height={2} />
      </div>

      {/* 5 行编号 */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 4,
        paddingTop: 4,
        flex: 1, minHeight: 0,
      }}>
        {PLANES.map((p, i) => (
          <div key={p.num} style={{ position: 'relative' }}>
            <FadeUp delay={40 + i * 9}>
              <div style={{
                display: 'flex', alignItems: 'center',
                padding: '8px 10px',
                minHeight: 52,
                borderBottom: `1px solid ${styles.ink30}`,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 6,
                  backgroundColor: i === 2 ? styles.red : 'transparent',
                  border: i === 2 ? 'none' : `1.5px solid ${styles.ink}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 700,
                  color: i === 2 ? '#FFFFFF' : styles.ink,
                  fontFamily: styles.fontEn,
                  flexShrink: 0, marginRight: 12,
                }}>{p.num}</div>
                <div style={{ minWidth: 86, flexShrink: 0 }}>
                  <div style={{
                    fontSize: 17, fontWeight: 700, color: styles.ink,
                    letterSpacing: '-0.01em',
                  }}>{p.en}</div>
                </div>
                <div style={{
                  flex: 1, paddingLeft: 12, borderLeft: `1px solid ${styles.ink30}`,
                  minWidth: 0,
                }}>
                  <div style={{
                    fontSize: 13, fontWeight: 700, color: styles.red,
                    marginBottom: 2, letterSpacing: '0.02em',
                  }}>{p.cn}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 500, color: styles.ink70, lineHeight: 1.3,
                  }}>{p.desc}</div>
                </div>
              </div>
            </FadeUp>
          </div>
        ))}
      </div>

      {/* 铁律红字 */}
      <div style={{ position: 'relative', paddingTop: 4 }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            padding: '10px 12px',
            backgroundColor: styles.red15,
            borderLeft: `3px solid ${styles.red}`,
            borderRadius: 4,
          }}>
            <div style={{
              fontSize: 12, fontWeight: 700, color: styles.red,
              letterSpacing: '0.02em', lineHeight: 1.5,
            }}>
              铁律 · Worker 与 Verifier<br />
              <span style={{ color: styles.ink, fontWeight: 600 }}>绝不能共享上下文</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};