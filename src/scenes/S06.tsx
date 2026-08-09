import React from 'react';
import { FadeUp, SlideIn, PopIn, styles } from './_layout';

// s06 · §6 Scope 维度 · 12s · 流式布局
// 左右对比卡（SlideIn 错开）+ 中部红色桥接层 PopIn + 底部总结
const LEFT_FLOW = ['用户目标', '需求', '调研', '验证', '输出'];
const RIGHT_FLOW = ['剧本', '互动', '分镜', '资产', '质量'];

export const S06: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      padding: '4px 0 8px', height: '100%',
    }}>
      {/* 顶部英文小标 */}
      <div style={{ position: 'relative' }}>
        
      </div>

      {/* 主标题 + 副标 */}
      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.023}>
          <div>
            <div style={{
              fontSize: 24, fontWeight: 800, color: styles.ink,
              lineHeight: 1.15, letterSpacing: '-0.01em',
              fontFamily: styles.fontFamily,
            }}>
              <span>Work</span>
              <span style={{
                fontSize: 16, color: styles.ink50,
                fontFamily: styles.fontEn, margin: '0 6px',
              }}>vs</span>
              <span>Org</span>
              <span style={{ color: styles.red }}> Graph</span>
            </div>
            <div style={{
              fontSize: 12, fontWeight: 500, color: styles.ink70,
              lineHeight: 1.4, marginTop: 4,
            }}>
              两种语义不同的图 · 不是大小关系
            </div>
          </div>
        </FadeUp>
      </div>

      {/* 左右卡 + 中部桥接 */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 64px 1fr',
        gap: 8,
        alignItems: 'stretch',
        paddingTop: 8,
      }}>
        {/* 左卡：Work Graph */}
        <div style={{ position: 'relative' }}>
          <SlideIn delayRatio={0.194} from="left">
            <div style={{
              padding: '12px 12px 10px',
              backgroundColor: styles.paperDeep,
              borderTop: `2px solid ${styles.ink}`,
              borderLeft: `1px solid ${styles.ink30}`,
              borderRight: `1px solid ${styles.ink30}`,
              borderBottom: `1px solid ${styles.ink30}`,
              height: '100%',
            }}>
              <div style={{
                fontSize: 9, fontWeight: 700, color: styles.ink50,
                letterSpacing: '0.2em', marginBottom: 4,
                fontFamily: styles.fontEn,
              }}>
                LEFT · 01
              </div>
              <div style={{
                fontSize: 17, fontWeight: 800, color: styles.ink,
                letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 4,
              }}>
                Work Graph
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: styles.ink70, marginBottom: 8,
              }}>
                项目执行计划 · 短生命周期
              </div>
              <div style={{
                display: 'flex', flexDirection: 'column', gap: 4,
                paddingTop: 8, borderTop: `1px dashed ${styles.ink30}`,
              }}>
                {LEFT_FLOW.map((step, i) => (
                  <div key={step} style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    fontSize: 12, fontWeight: 600, color: styles.ink,
                  }}>
                    <span style={{
                      width: 14, textAlign: 'center',
                      fontSize: 10, fontWeight: 700, color: styles.ink50,
                      fontFamily: styles.fontEn,
                    }}>{i + 1}</span>
                    <span>{step}</span>
                    {i < LEFT_FLOW.length - 1 && (
                      <span style={{
                        marginLeft: 'auto', color: styles.ink30, fontSize: 10,
                      }}>↓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </SlideIn>
        </div>

        {/* 中央桥接区 */}
        <div style={{
          position: 'relative',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: 8,
        }}>
          <div style={{ position: 'relative' }}>
            <PopIn delayRatio={0.428}>
              <div style={{
                width: 64,
                padding: '10px 6px',
                backgroundColor: styles.red,
                textAlign: 'center',
                boxShadow: '0 2px 8px rgba(197, 63, 63, 0.25)',
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: '#FFFFFF',
                  letterSpacing: '0.15em', marginBottom: 2,
                  fontFamily: styles.fontEn,
                }}>
                  BRIDGE
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 800, color: '#FFFFFF',
                  letterSpacing: '0.02em', lineHeight: 1.2,
                }}>
                  Assignment
                </div>
                <div style={{
                  fontSize: 10, fontWeight: 600, color: 'rgba(255,255,255,0.85)', marginTop: 1,
                }}>
                  / Staffing
                </div>
              </div>
            </PopIn>
          </div>
          <div style={{ position: 'relative' }}>
            <FadeUp delayRatio={0.544}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4,
                fontSize: 10, fontWeight: 700, color: styles.ink50,
                fontFamily: styles.fontEn, letterSpacing: '0.15em',
              }}>
                <span style={{ color: styles.red }}>↤</span>
                STAFF
                <span style={{ color: styles.red }}>↦</span>
              </div>
            </FadeUp>
          </div>
        </div>

        {/* 右卡：Org Graph */}
        <div style={{ position: 'relative' }}>
          <SlideIn delayRatio={0.264} from="right">
            <div style={{
              padding: '12px 12px 10px',
              backgroundColor: styles.paperDeep,
              borderTop: `2px solid ${styles.ink}`,
              borderLeft: `1px solid ${styles.ink30}`,
              borderRight: `1px solid ${styles.ink30}`,
              borderBottom: `1px solid ${styles.ink30}`,
              height: '100%',
            }}>
              <div style={{
                fontSize: 9, fontWeight: 700, color: styles.ink50,
                letterSpacing: '0.2em', marginBottom: 4,
                fontFamily: styles.fontEn,
              }}>
                RIGHT · 02
              </div>
              <div style={{
                fontSize: 17, fontWeight: 800, color: styles.ink,
                letterSpacing: '-0.01em', lineHeight: 1.15, marginBottom: 4,
              }}>
                Org Graph
              </div>
              <div style={{
                fontSize: 11, fontWeight: 600, color: styles.ink70, marginBottom: 8,
              }}>
                公司组织架构 · 长生命周期
              </div>
              <div style={{
                paddingTop: 8, borderTop: `1px dashed ${styles.ink30}`,
              }}>
                <div style={{
                  fontSize: 12, fontWeight: 700, color: styles.ink,
                  marginBottom: 8, paddingBottom: 6,
                  borderBottom: `1px solid ${styles.ink30}`,
                }}>
                  制作总监
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 4,
                }}>
                  {RIGHT_FLOW.map((role) => (
                    <div key={role} style={{
                      fontSize: 11, fontWeight: 600, color: styles.ink,
                      padding: '4px 6px',
                      backgroundColor: styles.appBg,
                      border: `1px solid ${styles.ink30}`,
                      textAlign: 'center',
                    }}>{role}</div>
                  ))}
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* 底部总结 */}
      <div style={{ position: 'relative', paddingTop: 8 }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            padding: '14px 16px',
            backgroundColor: styles.appBg,
            borderLeft: `3px solid ${styles.red}`,
            borderRight: `1px solid ${styles.ink30}`,
            borderTop: `1px solid ${styles.ink30}`,
            borderBottom: `1px solid ${styles.ink30}`,
          }}>
            <div style={{
              fontSize: 13, fontWeight: 700, color: styles.ink,
              lineHeight: 1.45, marginBottom: 4,
            }}>
              Org Graph 不是更大的 Work Graph<br />
              <span style={{ color: styles.red }}>是语义不同的图</span>
            </div>
            <div style={{
              fontSize: 10, fontWeight: 600, color: styles.ink50,
              letterSpacing: '0.12em', fontFamily: styles.fontEn,
            }}>
              DIFFERENT SEMANTICS · NOT DIFFERENT SCALE
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};