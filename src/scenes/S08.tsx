import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s08 · §8 Dynamism 维度 · 12s · 流式布局
// 4 行等级表 · stagger 入场
const LEVELS = [
  { num: 'L1', cn: '静态图',       stage: '创业初期',   desc: '一套固定流程' },
  { num: 'L2', cn: '条件图',       stage: '成长期',     desc: '区分项目类型' },
  { num: 'L3', cn: '运行时生成图', stage: '成熟期',     desc: '项目经理当场拆任务' },
  { num: 'L4', cn: '自适应图',     stage: '学习型组织', desc: '改流程模板' },
];

export const S08: React.FC<any> = () => {
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
        <FadeUp delayRatio={0.054}>
          <div style={{
            fontSize: 28, fontWeight: 800, color: styles.ink,
            lineHeight: 1.1, letterSpacing: '-0.02em',
          }}>
            图有多<span style={{ color: styles.red }}>"动态"</span>
          </div>
        </FadeUp>
      </div>

      {/* 强调线 */}
      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.129} width={56} height={2} />
      </div>

      {/* 4 行等级表 */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 8,
        paddingTop: 8,
        flex: 1, minHeight: 0,
      }}>
        {LEVELS.map((lv, i) => (
          <div key={lv.num} style={{ position: 'relative' }}>
            <FadeUp delay={40 + i * 11}>
              <div style={{
                display: 'flex', alignItems: 'center',
                padding: '12px 14px',
                backgroundColor: i === LEVELS.length - 1 ? styles.red15 : 'transparent',
                borderRadius: 12,
                borderLeft: `3px solid ${i === LEVELS.length - 1 ? styles.red : styles.ink30}`,
                minHeight: 64,
              }}>
                <div style={{
                  minWidth: 56,
                  fontSize: 24, fontWeight: 800,
                  color: i === LEVELS.length - 1 ? styles.red : styles.ink,
                  fontFamily: styles.fontEn,
                  letterSpacing: '-0.02em',
                  flexShrink: 0,
                }}>{lv.num}</div>
                <div style={{
                  flex: 1, paddingLeft: 14,
                  borderLeft: `1px solid ${styles.ink30}`,
                  minWidth: 0,
                }}>
                  <div style={{
                    fontSize: 17, fontWeight: 700,
                    color: i === LEVELS.length - 1 ? styles.red : styles.ink,
                    letterSpacing: '-0.01em', marginBottom: 4,
                  }}>{lv.cn}</div>
                  <div style={{
                    fontSize: 10, fontWeight: 500, color: styles.ink70,
                    letterSpacing: '0.02em',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{
                      padding: '2px 6px',
                      backgroundColor: styles.appCard,
                      boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
                      border: `1px solid ${styles.ink30}`,
                      borderRadius: 3,
                      fontFamily: styles.fontFamily,
                    }}>{lv.stage}</span>
                    <span>{lv.desc}</span>
                  </div>
                </div>
                <div style={{
                  width: 8, height: 8, borderRadius: '50%',
                  backgroundColor: i === LEVELS.length - 1 ? styles.red : styles.ink30,
                  marginLeft: 8, flexShrink: 0,
                }} />
              </div>
            </FadeUp>
          </div>
        ))}
      </div>

      {/* 底部结论红字 */}
      <div style={{ position: 'relative', paddingTop: 8 }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            fontSize: 12, fontWeight: 600, color: styles.ink70,
            lineHeight: 1.5, textAlign: 'center',
            padding: '12px 14px',
            backgroundColor: styles.appCard,
            boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
            borderRadius: 12,
            border: `1px solid ${styles.ink30}`,
          }}>
            动态性 <span style={{ color: styles.red, fontWeight: 800 }}>不是</span> 图工程的必要条件<br />
            <span style={{ fontSize: 11, color: styles.ink50 }}>静态 DAG 也是图工程</span>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};