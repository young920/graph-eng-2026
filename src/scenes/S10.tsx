import React from 'react';
import { FadeUp, DrawLine, styles } from './_layout';

// s10 · §10 矩阵统一 · 10s · 流式布局
// Scope × Plane 矩阵 · 5x5 · 表头红色
const COL_HEADERS = ['执行', '评价', '自适应', '治理'];
const ROWS: Array<{ label: string; cells: string[] }> = [
  { label: '节点',   cells: ['完成任务', '判断完成', '改 Prompt', '工具权限'] },
  { label: 'Work',   cells: ['任务依赖', '阶段验收', '动态增删', '预算审批'] },
  { label: 'Org',    cells: ['多团队协作', '部门评估', '增减角色', '权限配额'] },
  { label: '跨组织', cells: ['系统协作', '信任认证', '选合作方', '协议合规'] },
];

export const S10: React.FC<any> = () => {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', gap: 8,
      padding: '4px 0 8px', height: '100%',
      alignItems: 'center',
    }}>
      {/* 副标 */}
      <div style={{ position: 'relative', alignSelf: 'stretch' }}>
        
      </div>

      {/* 主标题 */}
      <div style={{ position: 'relative', alignSelf: 'stretch' }}>
        <FadeUp delayRatio={0.054}>
          <div style={{
            fontSize: 26, fontWeight: 800, color: styles.ink,
            lineHeight: 1.1, letterSpacing: '-0.02em',
            display: 'flex', alignItems: 'baseline', gap: 8,
          }}>
            Scope <span style={{ color: styles.red, fontSize: 20 }}>×</span> Plane <span style={{ fontSize: 18, color: styles.ink70, fontWeight: 600 }}>矩阵</span>
          </div>
        </FadeUp>
      </div>

      {/* 强调线 */}
      <div style={{ position: 'relative', alignSelf: 'flex-start' }}>
        <DrawLine delayRatio={0.129} width={56} height={2} />
      </div>

      {/* 表头提示 */}
      <div style={{ position: 'relative', alignSelf: 'stretch' }}>
        <FadeUp delayRatio={0.162}>
          <div style={{
            fontSize: 10, fontWeight: 600, color: styles.ink50, letterSpacing: '0.02em',
          }}>
            每个格子都是一个真实设计问题
          </div>
        </FadeUp>
      </div>

      {/* 矩阵表格 */}
      <div style={{ position: 'relative', paddingTop: 6 }}>
        <FadeUp delayRatio={0.242}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '60px repeat(4, 1fr)',
            borderTop: `2px solid ${styles.ink}`,
            borderLeft: `1px solid ${styles.ink30}`,
            borderRight: `1px solid ${styles.ink30}`,
            borderBottom: `1px solid ${styles.ink30}`,
          }}>
            {/* 角落（空） */}
            <div style={{
              borderRight: `1px solid ${styles.ink}`,
              borderBottom: `2px solid ${styles.ink}`,
              minHeight: 28,
            }} />
            {/* 列头（红色背景） */}
            {COL_HEADERS.map((h, i) => (
              <div key={`ch-${i}`} style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                backgroundColor: styles.red,
                color: '#FFFFFF',
                fontSize: 12, fontWeight: 800,
                letterSpacing: '0.05em',
                borderRight: i < 3 ? `1px solid #FFFFFF` : 'none',
                borderBottom: `2px solid ${styles.ink}`,
                fontFamily: styles.fontFamily,
                minHeight: 28,
              }}>{h}</div>
            ))}

            {/* 行 + 数据单元格 */}
            {ROWS.map((r, ri) => (
              <React.Fragment key={`row-${ri}`}>
                <div style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  backgroundColor: styles.appCard,
                  boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
                  color: styles.ink,
                  fontSize: 12, fontWeight: 800,
                  letterSpacing: '0.02em',
                  borderRight: `1px solid ${styles.ink}`,
                  borderBottom: ri < ROWS.length - 1 ? `1px solid ${styles.ink30}` : 'none',
                  fontFamily: styles.fontFamily,
                  minHeight: 56,
                }}>{r.label}</div>
                {r.cells.map((c, ci) => (
                  <div key={`c-${ri}-${ci}`} style={{
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backgroundColor: '#FFFFFF',
                    color: styles.ink,
                    fontSize: 10, fontWeight: 600,
                    textAlign: 'center',
                    padding: '6px 4px',
                    lineHeight: 1.25,
                    borderRight: ci < 3 ? `1px solid ${styles.ink30}` : 'none',
                    borderBottom: ri < ROWS.length - 1 ? `1px solid ${styles.ink30}` : 'none',
                    fontFamily: styles.fontFamily,
                    minHeight: 56,
                  }}>{c}</div>
                ))}
              </React.Fragment>
            ))}
          </div>
        </FadeUp>
      </div>

      {/* 底部红字总结 */}
      <div style={{ position: 'relative', alignSelf: 'stretch', paddingTop: 6 }}>
        <FadeUp delayRatio={0.700}>
          <div style={{
            textAlign: 'center',
            fontSize: 11, fontWeight: 600, color: styles.ink70,
            letterSpacing: '0.02em', lineHeight: 1.5,
            padding: '10px 14px',
            borderLeft: `3px solid ${styles.red}`,
            backgroundColor: styles.red15,
            borderRadius: 12,
            boxShadow: '0 4px 16px rgba(155, 143, 217, 0.12), 0 1px 4px rgba(232, 180, 216, 0.1)',
          }}>
            从<span style={{ color: styles.red, fontWeight: 800 }}> 节点级 </span>到<span style={{ color: styles.red, fontWeight: 800 }}> 跨组织</span><br />
            从<span style={{ color: styles.red, fontWeight: 800 }}> 执行 </span>到<span style={{ color: styles.red, fontWeight: 800 }}> 治理</span> · 全图视图
          </div>
        </FadeUp>
      </div>
    </div>
  );
};