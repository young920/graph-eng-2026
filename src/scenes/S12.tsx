import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s12 · §12 + 结语 · 4s · 流式布局
// 给实践者三条建议 · 3 大块 + 底部品牌签名
const ADVICE = [
  { num: '01', title: '先 Loop，再 Graph',  body: '员工个人循环跑不稳\n图只会制造混乱' },
  { num: '02', title: 'Verifier 是瓶颈',     body: 'Worker 与 Verifier\n绝不能共享上下文' },
  { num: '03', title: '会判断"不用图"',    body: '不是所有协作\n都该建模成图' },
];

export const S12: React.FC<any> = () => {
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
        <FadeUp delayRatio={0.060}>
          <div style={{
            fontSize: 22, fontWeight: 800, color: styles.ink,
            lineHeight: 1.15, letterSpacing: '-0.02em',
          }}>
            给实践者的<span style={{ color: styles.red }}>三条建议</span>
          </div>
        </FadeUp>
      </div>

      {/* 强调线 */}
      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.140} width={42} height={2} />
      </div>

      {/* 3 大块（紧凑） */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        paddingTop: 6,
      }}>
        {ADVICE.map((a, i) => (
          <div key={a.num} style={{ position: 'relative' }}>
            <FadeUp delay={22 + i * 10}>
              <div style={{
                padding: '10px 12px',
                backgroundColor: styles.appCard,
                boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
                border: `1px solid ${styles.ink30}`,
                borderLeft: `3px solid ${styles.red}`,
                borderRadius: 12,
                display: 'flex', alignItems: 'center',
                gap: 12,
                minHeight: 70,
              }}>
                <div style={{
                  width: 32, height: 32, borderRadius: 12,
                  backgroundColor: styles.red,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 12, fontWeight: 800, color: '#FFFFFF',
                  fontFamily: styles.fontEn,
                  flexShrink: 0,
                }}>{a.num}</div>
                <div style={{ minWidth: 152, flexShrink: 0 }}>
                  <div style={{
                    fontSize: 13, fontWeight: 800, color: styles.ink,
                    letterSpacing: '-0.01em', lineHeight: 1.2,
                  }}>{a.title}</div>
                </div>
                <div style={{
                  width: 1, height: 40,
                  backgroundColor: styles.ink30,
                  flexShrink: 0,
                }} />
                <div style={{
                  fontSize: 10, fontWeight: 500, color: styles.ink70,
                  lineHeight: 1.45, whiteSpace: 'pre-line',
                  flex: 1,
                }}>{a.body}</div>
              </div>
            </FadeUp>
          </div>
        ))}
      </div>

      {/* 底部小字品牌签名 */}
      <div style={{ position: 'relative', paddingTop: 8, alignSelf: 'stretch' }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            textAlign: 'center',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              padding: '6px 14px',
              borderTop: `1px solid ${styles.ink30}`,
            }}>
              <span style={{
                fontSize: 10, fontWeight: 700, color: styles.ink50,
                letterSpacing: '0.02em',
              }}>@Hermes</span>
              <span style={{
                width: 4, height: 4, borderRadius: '50%',
                backgroundColor: styles.red,
              }} />
              <span style={{
                fontSize: 10, fontWeight: 600, color: styles.ink70,
                letterSpacing: '0.05em',
                fontFamily: styles.fontFamily,
              }}>一图读懂 · 完</span>
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};