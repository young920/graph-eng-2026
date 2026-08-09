import React from 'react';
import { FadeUp, SlideIn, DrawLine, PopIn, styles } from './_layout';

// s02 · §2 表格 vs 图 · 10s · 流式布局
// 主内容：左右分屏对比（左表格 / 右图 + VS 标） + 底部 4 条问题网格
export const S02: React.FC<any> = () => {
  const tableHeader = ['姓名', '部门', '职级'];
  const tableRows = [
    ['张三', '工程', 'P5'],
    ['李四', '产品', 'P4'],
    ['王五', '设计', 'P4'],
    ['赵六', '运营', 'P3'],
  ];
  const questions = [
    { q: '二度人脉', en: '2ND-DEGREE' },
    { q: '欺诈藏网络', en: 'FRAUD RING' },
    { q: '故障扩散', en: 'FAILURE SPREAD' },
    { q: '任务回退', en: 'TASK FALLBACK' },
  ];

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 12,
      padding: '4px 0 12px', height: '100%',
      position: 'relative',
    }}>
      {/* 主标题组 */}
      <div style={{ position: 'relative' }}>
        
      </div>

      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.078} width={120} height={3} />
      </div>

      {/* 副标 */}
      <div style={{ position: 'relative' }}>
        <FadeUp delayRatio={0.117}>
          <div style={{
            fontSize: 13, fontWeight: 500, color: styles.ink70,
            lineHeight: 1.5,
          }}>
            两种思维 · 两种查询<br />
            <span style={{ fontSize: 10, color: styles.ink50, fontFamily: styles.fontEn, letterSpacing: '0.1em' }}>
              TWO MODELS · TWO QUESTIONS
            </span>
          </div>
        </FadeUp>
      </div>

      {/* 左右分屏 + 中央 VS */}
      <div style={{
        position: 'relative',
        display: 'flex', alignItems: 'stretch', gap: 6,
        paddingTop: 6,
      }}>
        {/* 左：表格 */}
        <div style={{ position: 'relative', flex: 1 }}>
          <SlideIn delayRatio={0.194} from="left">
            <div>
              {/* 标签 */}
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6,
              }}>
                <div style={{
                  fontSize: 9, fontWeight: 700, color: styles.ink50,
                  letterSpacing: '0.18em', fontFamily: styles.fontEn,
                }}>
                  TABLE · 行列
                </div>
                <div style={{ flex: 1, height: 1, backgroundColor: styles.ink30 }} />
              </div>
              {/* 表 */}
              <div style={{
                backgroundColor: styles.paperDeep,
                border: `1px solid ${styles.ink30}`,
                borderRadius: 6,
                overflow: 'hidden',
              }}>
                <div style={{
                  display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                  backgroundColor: styles.ink, color: styles.paper,
                }}>
                  {tableHeader.map(h => (
                    <div key={h} style={{
                      padding: '6px 4px', fontSize: 9, fontWeight: 700,
                      textAlign: 'center',
                      borderRight: `1px solid ${styles.ink70}`,
                    }}>{h}</div>
                  ))}
                </div>
                {tableRows.map((row, ri) => (
                  <div key={ri} style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr 1fr',
                    borderTop: ri === 0 ? `1px solid ${styles.ink30}` : 'none',
                    borderBottom: ri < tableRows.length - 1 ? `1px solid ${styles.ink30}` : 'none',
                  }}>
                    {row.map((cell, ci) => (
                      <div key={ci} style={{
                        padding: '6px 4px', fontSize: 10, fontWeight: 500,
                        textAlign: 'center', color: styles.ink,
                        borderRight: ci < row.length - 1 ? `1px solid ${styles.ink30}` : 'none',
                        fontFamily: styles.fontMono,
                      }}>{cell}</div>
                    ))}
                  </div>
                ))}
              </div>
              {/* ✕ 不能答 */}
              <div style={{ position: 'relative', marginTop: 8 }}>
                <FadeUp delayRatio={0.467}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 8px',
                    backgroundColor: styles.red15,
                    border: `1px solid ${styles.red}`,
                    borderRadius: 4,
                  }}>
                    <span style={{
                      fontSize: 14, fontWeight: 800, color: styles.red,
                      fontFamily: styles.fontEn,
                    }}>✕</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: styles.red, lineHeight: 1.3,
                    }}>
                      关系查询 · 答不出
                    </span>
                  </div>
                </FadeUp>
              </div>
            </div>
          </SlideIn>
        </div>

        {/* 中央 VS 圈 */}
        <div style={{
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0, width: 36,
        }}>
          <PopIn delayRatio={0.389}>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              backgroundColor: styles.paper,
              border: `2px solid ${styles.red}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 13, fontWeight: 800, color: styles.red,
              fontFamily: styles.fontEn,
              boxShadow: '0 0 0 3px rgba(232, 228, 220, 1)',
            }}>VS</div>
          </PopIn>
        </div>

        {/* 右：图 */}
        <div style={{ position: 'relative', flex: 1 }}>
          <SlideIn delayRatio={0.311} from="right">
            <div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 6, marginBottom: 6,
              }}>
                <div style={{ flex: 1, height: 1, backgroundColor: styles.ink30 }} />
                <div style={{
                  fontSize: 9, fontWeight: 700, color: styles.ink,
                  letterSpacing: '0.18em', fontFamily: styles.fontEn,
                }}>
                  GRAPH · 节点+边
                </div>
              </div>
              {/* 网络图（div + border 模拟节点连线） */}
              <div style={{
                position: 'relative',
                backgroundColor: styles.paperDeep,
                border: `1px solid ${styles.ink30}`,
                borderRadius: 6,
                height: 132,
                padding: 8,
              }}>
                {/* 边 */}
                <div style={{
                  position: 'absolute', top: 36, left: 22, width: 48, height: 1,
                  backgroundColor: styles.ink70,
                }} />
                <div style={{
                  position: 'absolute', top: 36, left: 70, width: 48, height: 1,
                  backgroundColor: styles.ink70,
                }} />
                <div style={{
                  position: 'absolute', top: 64, left: 46, width: 1, height: 28,
                  backgroundColor: styles.ink70,
                }} />
                <div style={{
                  position: 'absolute', top: 64, left: 94, width: 1, height: 28,
                  backgroundColor: styles.ink70,
                }} />
                <div style={{
                  position: 'absolute', top: 92, left: 22, width: 96, height: 1,
                  backgroundColor: styles.ink70,
                }} />
                {/* 节点 */}
                {[
                  { left: 14, top: 28, color: styles.ink, label: 'A', textColor: '#FFF' },
                  { left: 62, top: 28, color: styles.red, label: 'B', textColor: '#FFF', big: true },
                  { left: 110, top: 28, color: styles.ink, label: 'C', textColor: '#FFF' },
                  { left: 38, top: 56, color: styles.ink, label: 'D', textColor: '#FFF' },
                  { left: 86, top: 56, color: styles.ink, label: 'E', textColor: '#FFF' },
                  { left: 14, top: 84, color: styles.ink, label: 'F', textColor: '#FFF' },
                  { left: 110, top: 84, color: styles.ink, label: 'G', textColor: '#FFF' },
                ].map((n, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    left: n.left, top: n.top,
                    width: n.big ? 18 : 14, height: n.big ? 18 : 14,
                    borderRadius: '50%',
                    backgroundColor: n.color, color: n.textColor,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: n.big ? 9 : 8, fontWeight: 700,
                    fontFamily: styles.fontEn,
                  }}>{n.label}</div>
                ))}
              </div>
              {/* → 一次跳转 */}
              <div style={{ position: 'relative', marginTop: 8 }}>
                <FadeUp delayRatio={0.583}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 6,
                    padding: '6px 8px',
                    backgroundColor: styles.paperDeep,
                    border: `1px solid ${styles.ink}`,
                    borderRadius: 4,
                  }}>
                    <span style={{
                      fontSize: 14, fontWeight: 800, color: styles.ink,
                      fontFamily: styles.fontEn,
                    }}>→</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600, color: styles.ink, lineHeight: 1.3,
                    }}>
                      一次跳转 · 关系直达
                    </span>
                  </div>
                </FadeUp>
              </div>
            </div>
          </SlideIn>
        </div>
      </div>

      {/* 底部问题列表（4 条 2 列网格） */}
      <div style={{ position: 'relative', paddingTop: 4 }}>
        <FadeUp delayRatio={0.700}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10,
            }}>
              <div style={{
                width: 3, height: 14, backgroundColor: styles.red, borderRadius: 2,
              }} />
              <div style={{
                fontSize: 11, fontWeight: 700, color: styles.ink,
                fontFamily: styles.fontEn, letterSpacing: '0.1em',
              }}>
                GRAPH WINS · 图擅长回答
              </div>
            </div>
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8,
            }}>
              {questions.map((q, i) => (
                <FadeUp key={q.en} delay={190 + i * 8}>
                  <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    padding: '8px 10px',
                    backgroundColor: styles.paper,
                    border: `1px solid ${styles.ink30}`,
                    borderRadius: 4,
                  }}>
                    <span style={{
                      fontSize: 10, fontWeight: 700, color: styles.red,
                      fontFamily: styles.fontEn, letterSpacing: '0.05em',
                    }}>{String(i + 1).padStart(2, '0')}</span>
                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: 12, fontWeight: 600, color: styles.ink, lineHeight: 1.2,
                      }}>{q.q}</div>
                      <div style={{
                        fontSize: 8, fontWeight: 600, color: styles.ink50,
                        letterSpacing: '0.08em', marginTop: 2,
                        fontFamily: styles.fontEn,
                      }}>{q.en}</div>
                    </div>
                  </div>
                </FadeUp>
              ))}
            </div>
          </div>
        </FadeUp>
      </div>
    </div>
  );
};