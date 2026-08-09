import React from 'react';
import { AbsoluteFill, Audio, Sequence, staticFile } from 'remotion';
import timeline from './timeline.json';
import { scenes } from './scenes';
import { Stage, TOP_NAMES, TOP_EN } from './scenes/_layout';

const FPS = 30;

// 段号的中英小标 + 一句话总结（与 storyboard 对齐）
const SEG_META = [
  { zh: '封面 · PRISM 一图读懂', en: 'COVER · STOP CONFUSION',
    caption: '图谱工程这词今年被吹上天了，但你真的知道它指什么吗？这次给你一把尺子。' },
  { zh: '第 01 章 · 最浅的一层', en: 'CHAPTER · NODES + EDGES',
    caption: '图是什么？点加线。从"东西是什么"转向"东西之间怎么连"。' },
  { zh: '第 02 章 · 为什么需要图', en: 'CHAPTER · TABLE vs GRAPH',
    caption: 'HR 能告诉你公司有多少人，但问"张三请假谁能顶"——表格不会答。' },
  { zh: '第 03 章 · 数据图工程', en: 'CHAPTER · 6-LAYER STACK',
    caption: '从基础到应用六层：基础 / 建模 / 存储 / 查询 / 图智能 / 应用。' },
  { zh: '第 04 章 · Agent 图工程', en: 'CHAPTER · MULTI-AGENT GRAPH',
    caption: '把多 Agent 系统设计成一张显式图——图是引擎，也是真相源。' },
  { zh: '第 05 章 · 三维框架', en: 'CHAPTER · 3D FRAMEWORK',
    caption: 'Scope × Plane × Dynamism = 一把能消除概念混乱的尺子。' },
  { zh: '第 06 章 · Scope 维度', en: 'CHAPTER · WORK vs ORG',
    caption: 'Work Graph（这次任务）vs Org Graph（长期能力）——语义不同。' },
  { zh: '第 07 章 · Plane 维度', en: 'CHAPTER · 5 PLANES',
    caption: 'Control / Execution / Evaluation / Adaptation / Governance 五个平面。' },
  { zh: '第 08 章 · Dynamism 维度', en: 'CHAPTER · 4 LEVELS',
    caption: '静态 / 条件 / 运行时生成 / 自适应——动态性不是必要条件。' },
  { zh: '第 09 章 · 理想参考架构', en: 'CHAPTER · ARCHITECTURE',
    caption: '八个区块 + 九个原语：Router、Reducer、Verifier 是质量闸门。' },
  { zh: '第 10 章 · 三维统一矩阵', en: 'CHAPTER · SCOPE × PLANE',
    caption: 'Scope × Plane 铺成矩阵，每一格都是一个真实设计问题。' },
  { zh: '第 11 章 · CodexLoom 案例', en: 'CHAPTER · CODEXLOOM',
    caption: '它不是半成品图引擎，是故意只做 Org 那半的平台。' },
  { zh: '结语 · 带着三把尺子离开', en: 'CHAPTER · TAKE AWAYS',
    caption: '先 Loop 再 Graph；Verifier 是真瓶颈；会判断"不用图"更高级。' },
];

export const Root: React.FC = () => {
  return (
    <AbsoluteFill>
      {timeline.segments.map((seg: any, idx: number) => {
        const SceneComp = scenes[idx].component;
        const startFrame = Math.floor(seg.start * FPS);
        const durationFrames = Math.ceil(seg.duration * FPS);
        const audioFile = staticFile(`audio/${seg.id}.mp3`);
        const meta = SEG_META[idx] || SEG_META[0];
        return (
          <Sequence
            key={seg.id}
            from={startFrame}
            durationInFrames={durationFrames}
            name={seg.id}
          >
            <Stage
              segIndex={idx}
              segId={seg.id}
              startTime={seg.start}
              segDuration={seg.duration}
              zh={meta.zh}
              en={meta.en}
              caption={meta.caption}
            >
              <SceneComp
                segId={seg.id}
                segIndex={idx}
                text={null}
                startTime={seg.start}
                segDuration={seg.duration}
              />
            </Stage>
            <Audio src={audioFile} />
          </Sequence>
        );
      })}
    </AbsoluteFill>
  );
};