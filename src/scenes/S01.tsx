import React from 'react';
import { FadeUp, SlideIn, DrawLine, styles } from './_layout';

// s01 · §1 图=点+边 · 10s · 流式布局
export const S01: React.FC<any> = () => {
  const cards = [
    { icon: '◇', zh: '公司组织', en: 'ORG CHART', line: '汇报 · 协作 · 汇报树' },
    { icon: '☰', zh: '家族族谱', en: 'FAMILY TREE', line: '血缘 · 辈分 · 姻亲' },
    { icon: '◐', zh: '地铁线路', en: 'METRO LINE', line: '站点 · 换乘 · 路径' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 14,
      padding: '8px 0 12px', height: '100%',
    }}>
      

      <div>
        <DrawLine delayRatio={0.100} width={120} height={3} />
      </div>

      <FadeUp delayRatio={0.150}>
        <div style={{
          fontSize: 13, fontWeight: 500, color: styles.ink70,
          lineHeight: 1.5, letterSpacing: '0.01em',
        }}>
          从"东西是什么"转向<br />
          <span style={{ fontSize: 10, color: styles.ink50, fontFamily: styles.fontEn, letterSpacing: '0.1em' }}>
            WHAT + HOW THEY CONNECT
          </span>
        </div>
      </FadeUp>

      {/* 3 张卡片横排 */}
      <div style={{
        display: 'flex', gap: 9, paddingTop: 8,
      }}>
        {cards.map((c, i) => {
          const delay = 50 + i * 9;
          return (
            <SlideIn key={c.en} delay={delay} from={i === 0 ? 'left' : i === 2 ? 'right' : 'left'}>
              <div style={{
                flex: 1,
                backgroundColor: styles.paperDeep,
                border: `1px solid ${styles.ink30}`,
                borderRadius: 8,
                padding: '14px 12px',
                display: 'flex', flexDirection: 'column', gap: 8,
                fontFamily: styles.fontFamily,
                minHeight: 200,
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: styles.ink50,
                  letterSpacing: '0.15em', fontFamily: styles.fontEn,
                }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{
                  height: 50,
                  backgroundColor: styles.paper,
                  borderRadius: 4,
                  border: `1px dashed ${styles.ink30}`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 26, fontWeight: 700, color: styles.ink,
                  fontFamily: styles.fontEn,
                }}>
                  {c.icon}
                </div>
                <div style={{
                  fontSize: 15, fontWeight: 700, color: styles.ink,
                }}>
                  {c.zh}
                </div>
                <div style={{
                  fontSize: 8, fontWeight: 600, color: styles.ink50,
                  letterSpacing: '0.1em',
                  fontFamily: styles.fontEn,
                }}>
                  {c.en}
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 500, color: styles.ink70,
                  lineHeight: 1.5,
                  marginTop: 'auto',
                }}>
                  {c.line}
                </div>
              </div>
            </SlideIn>
          );
        })}
      </div>

      <div style={{ paddingTop: 4 }}>
        <DrawLine delayRatio={0.450} width={492} height={2} color={styles.red} />
      </div>

      <FadeUp delayRatio={0.550}>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <span style={{
            fontSize: 12, fontWeight: 700, color: styles.red,
            fontFamily: styles.fontEn, letterSpacing: '0.1em',
          }}>
            EDGE
          </span>
          <span style={{
            fontSize: 11, fontWeight: 500, color: styles.ink70,
          }}>
            关系把它们连成一张网
          </span>
        </div>
      </FadeUp>

      <FadeUp delayRatio={0.700}>
        <div style={{
          padding: '12px 14px',
          backgroundColor: styles.paper,
          border: `1px solid ${styles.ink30}`,
          borderRadius: 6,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12,
          fontFamily: styles.fontMono,
        }}>
          <span style={{ fontSize: 18, fontWeight: 700, color: styles.ink }}>G</span>
          <span style={{ fontSize: 18, fontWeight: 500, color: styles.ink70 }}>=</span>
          <span style={{ fontSize: 16, fontWeight: 700, color: styles.ink }}>(V, E)</span>
          <span style={{ fontSize: 10, fontWeight: 500, color: styles.ink50, marginLeft: 4 }}>
            V = vertices · E = edges
          </span>
        </div>
      </FadeUp>
    </div>
  );
};