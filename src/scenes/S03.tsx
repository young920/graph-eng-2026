import React from 'react';
import { FadeUp, SlideIn, DrawLine, styles } from './_layout';

// s03 · §3 数据图工程 6 层 · 10s · 流式布局
// 6 行垂直栈：编号 + 名称 + 例子
const LAYERS = [
  { n: '01', name: '基础',     nameEn: 'FOUNDATION',   examples: '点 + 边 · G = (V, E)' },
  { n: '02', name: '建模',     nameEn: 'MODELING',     examples: '本体 / Schema' },
  { n: '03', name: '存储',     nameEn: 'STORAGE',      examples: 'Neo4j / TigerGraph' },
  { n: '04', name: '查询算法', nameEn: 'QUERY',        examples: 'Cypher / Gremlin' },
  { n: '05', name: '图智能',   nameEn: 'INTELLIGENCE', examples: 'GNN / GraphRAG' },
  { n: '06', name: '应用',     nameEn: 'APPLICATION',  examples: '反欺诈 · 推荐 · 知识图谱' },
];

export const S03: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: '4px 0 8px', height: '100%',
    }}>
      {/* 主标题组 */}
      <div style={{ position: 'relative' }}>
        
      </div>

      <div style={{ position: 'relative' }}>
        <DrawLine delayRatio={0.093} width={120} height={3} />
      </div>

      {/* 副标 */}
      <div style={{ position: 'relative', paddingBottom: 4 }}>
        <FadeUp delayRatio={0.140}>
          <div style={{
            fontSize: 12, fontWeight: 500, color: styles.ink70, lineHeight: 1.5,
          }}>
            从结构到智能 · 逐层递进<br />
            <span style={{
              fontSize: 10, color: styles.ink50,
              fontFamily: styles.fontEn, letterSpacing: '0.1em',
            }}>
              STRUCTURE → INTELLIGENCE
            </span>
          </div>
        </FadeUp>
      </div>

      {/* 6 行垂直栈 · stagger */}
      <div style={{
        display: 'flex', flexDirection: 'column', gap: 6,
        paddingTop: 4,
      }}>
        {LAYERS.map((row, i) => (
          <div key={row.n} style={{ position: 'relative' }}>
            <SlideIn delay={50 + i * 6} from="left">
              <div style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '8px 12px',
                backgroundColor: i === 0 ? styles.paperDeep : styles.paper,
                border: `1px solid ${styles.ink30}`,
                borderRadius: 6,
                fontFamily: styles.fontFamily,
                minHeight: 50,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 5,
                  backgroundColor: styles.red, color: '#FFFFFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 800,
                  fontFamily: styles.fontEn, letterSpacing: '0.05em',
                  flexShrink: 0,
                }}>{row.n}</div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{
                    fontSize: 15, fontWeight: 700, color: styles.ink,
                    lineHeight: 1.2, letterSpacing: '-0.01em',
                  }}>{row.name}</div>
                  <div style={{
                    fontSize: 9, fontWeight: 600, color: styles.ink50,
                    letterSpacing: '0.12em', marginTop: 2,
                    fontFamily: styles.fontEn,
                  }}>{row.nameEn}</div>
                </div>
                <div style={{
                  fontSize: 11, fontWeight: 600, color: styles.ink70,
                  textAlign: 'right', flexShrink: 0,
                  fontFamily: styles.fontMono, letterSpacing: '0.01em',
                }}>{row.examples}</div>
              </div>
            </SlideIn>
          </div>
        ))}
      </div>

      {/* 底部小标 · 应用是落点 */}
      <div style={{ position: 'relative', paddingTop: 4 }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
          }}>
            <div style={{ flex: 1, height: 1, backgroundColor: styles.ink30 }} />
            <span style={{
              fontSize: 10, fontWeight: 700, color: styles.red,
              fontFamily: styles.fontEn, letterSpacing: '0.15em',
            }}>06 · 应用落地</span>
            <div style={{ flex: 1, height: 1, backgroundColor: styles.ink30 }} />
          </div>
        </FadeUp>
      </div>
    </div>
  );
};