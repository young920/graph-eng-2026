import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s04 · §4 Agent 图工程 · 12s · 流式布局
// 4 张定义卡 2x2 网格 + 顶部主副标 + 底部红线划重点
const DEFS = [
  { n: '01', cn: '节点',   en: 'NODE',    body: 'Agent 或确定性步骤' },
  { n: '02', cn: '边',     en: 'EDGE',    body: '路由 · 顺序 / 条件 / 并行 / 扇入' },
  { n: '03', cn: '状态',   en: 'STATE',   body: '沿边流动的共享对象' },
  { n: '04', cn: '引擎',   en: 'ENGINE',  body: '遍历 · 路由 · 重试 · 回滚', red: true },
];

export const S04: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 10,
      padding: '4px 0 8px', height: '100%',
    }}>
      {/* 顶部小标 */}
      <div style={{ position: 'relative' }}>
        
      </div>

      {/* 主标题 */}
      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.025}>
          <div style={{
            fontSize: 24, fontWeight: 800, color: styles.ink,
            lineHeight: 1.15, letterSpacing: '-0.01em',
            fontFamily: styles.fontFamily,
          }}>
            把多 Agent 系统<br />
            设计成一张<span style={{ color: styles.red }}>显式图</span>
          </div>
        </FadeUp>
      </div>

      {/* 强调线 */}
      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.115} width={36} height={2} />
      </div>

      {/* 副标 */}
      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.132}>
          <div style={{
            fontSize: 12, fontWeight: 500, color: styles.ink70,
            letterSpacing: '0.02em', lineHeight: 1.4,
          }}>
            图是引擎，也是真相源<br />
            <span style={{
              fontSize: 9, color: styles.ink50,
              fontFamily: styles.fontEn, letterSpacing: '0.15em',
            }}>
              GRAPH IS ENGINE & SOURCE OF TRUTH
            </span>
          </div>
        </FadeUp>
      </div>

      {/* 2x2 网格定义卡 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 8,
        paddingTop: 6,
        flex: 1, minHeight: 0,
      }}>
        {DEFS.map((d, i) => (
          <div key={d.n} style={{ position: 'relative' }}>
            <FadeUp delay={64 + i * 12}>
              <div style={{
                padding: '12px 12px 14px',
                backgroundColor: d.red ? styles.red15 : styles.paperDeep,
                borderTop: `2px solid ${d.red ? styles.red : styles.ink}`,
                borderLeft: d.red ? `1px solid ${styles.red}` : `1px solid ${styles.ink30}`,
                borderRight: d.red ? `1px solid ${styles.red}` : `1px solid ${styles.ink30}`,
                borderBottom: d.red ? `1px solid ${styles.red}` : `1px solid ${styles.ink30}`,
                fontFamily: styles.fontFamily,
                height: '100%',
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
                    fontSize: 9, fontWeight: 600, color: styles.ink50,
                    letterSpacing: '0.18em', fontFamily: styles.fontEn,
                  }}>{d.en}</span>
                </div>
                <div style={{
                  fontSize: 20, fontWeight: 800,
                  color: d.red ? styles.red : styles.ink,
                  letterSpacing: '-0.01em', lineHeight: 1.1,
                  marginBottom: 6,
                }}>{d.cn}</div>
                <div style={{
                  fontSize: 11, fontWeight: 500, color: styles.ink70,
                  lineHeight: 1.45, letterSpacing: '0.01em',
                }}>{d.body}</div>
              </div>
            </FadeUp>
          </div>
        ))}
      </div>

      {/* 底部红线划重点 */}
      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.576} width={504} height={3} />
      </div>

      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.618}>
          <div style={{
            textAlign: 'center', fontSize: 13, fontWeight: 700,
            color: styles.red, letterSpacing: '0.04em',
          }}>
            节点 · 边 · 状态 · 引擎 = 图的四原语
          </div>
        </FadeUp>
      </div>

      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            textAlign: 'center', fontSize: 10, fontWeight: 600,
            color: styles.ink50, letterSpacing: '0.18em',
            fontFamily: styles.fontEn,
          }}>
            FOUR PRIMITIVES OF AGENT GRAPH
          </div>
        </FadeUp>
      </div>
    </div>
  );
};