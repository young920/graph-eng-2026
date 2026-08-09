# Graph Engineering 2026 · AURORA 风格讲解视频

> **目标**：把《被概念词"Graph Engineering"搞的晕头转向？》12 章文章做成 540×720 横版、198s、13 段、AURORA 柔雾渐变风格的讲解视频
> **状态**：v25 完成 ✅ · 13 段全部按真实音频时长渲染 ✅ · 段间气口 + 音画对位已修复 ✅
> **下一步**：GitHub 开源 + SOP 沉淀

---

## 1. 项目目标（一句话）

把 12 章文章做成 **AURORA 柔雾渐变 + 极简编辑排版**风格的讲解视频。13 段（封面 + 12 章对应内容）。每段真实配音驱动时长（9~18s），段间 1s 静止画面做气口。

---

## 2. 关键决策（锁定项）

| 决策 | 值 | 来源 |
|---|---|---|
| 画幅 | 540×720 横版（3:4） | 适配小红书 + 视频号 |
| 风格 | AURORA 柔雾渐变（紫粉蓝） + 米白底 + 现代粗 sans | `analysis/ref_analysis_full.md` |
| 配色 | 米白 #FAF7F2 + 黑字 #1A1A1A + 紫色高亮 + 红 #C53F3F 强调 | 豆包视觉分析 |
| 段时长 | 按配音实际 1.6x 加速（9~18s/段）+ 1s 气口 | `timeline.json` |
| 总时长 | 198s（3:18） | 实测 |
| 动效 | 仅 fade-up 类（opacity + translateY）+ PopIn（弹簧 scale） + DrawLine（宽度展开） | 见 §4 教训 |
| 字体 | 纤细无衬线 + 少量粗黑字 + 英文小标 | 豆包视觉分析 |
| 配音 | Edge TTS `zh-CN-YunjianNeural` + 1.6x atempo 加速 | 平衡听感 + 时长 |
| 内容来源 | 飞书 wiki 文章 12 章 | 用户发的文章 URL |
| 段落数 | 13 段（封面 + 11 章 + 彩蛋） | 按文章结构拆 |

---

## 3. 当前状态

| 任务 | 状态 | 产出 |
|---|---|---|
| 参考视频沉淀 | ✅ | `reference/ref_video.mp4` |
| 风格分析 | ✅ | `analysis/ref_analysis_full.md` |
| 文章内容 | ✅ | `assets/article_full.md` |
| 13 段分镜 | ✅ | `process/storyboard.md` |
| 配音生成（Edge TTS） | ✅ | `public/audio/` (13 段) |
| 配音加速（1.6x atempo） | ✅ | `public/audio/` 1.6x 文件 |
| timeline + subtitles | ✅ | `src/timeline.json` + `src/subtitles.json` |
| 13 段组件（React + Remotion） | ✅ | `src/scenes/S00-S12.tsx` |
| v25 渲染（带音视频） | ✅ | `out/v25_full.mp4` (11.3MB / 198s) |
| SOP 沉淀 | ⏳ | `SOP.md`（待补完） |
| GitHub 开源 | ⏳ | （待 push） |

---

## 4. 关键教训（避免后人踩坑）

### 4.1 动效必须用 fade-up 类

Remotion headless 渲染时，**CSS `@keyframes` 复杂动画（clip-path/typewriter/scale 呼吸等）会被压缩到 1 帧内完成**——视频里看不到过程。

**真正可用动效**：
- `FadeUp` · opacity + translateY（24→0）
- `SlideIn` · opacity + translateX（±30→0）
- `PopIn` · 弹簧 scale（0.7→1）
- `DrawLine` · width 0→N

**通过多元素错开 delay 实现层次感**——不是依赖单元素复杂 keyframes。

### 4.2 timeline 必须按真实音频时长

**早期 v23 用固定 8~12s/段**——但配音实测 13~28s/段——**导致配音念到一半就被切到下一段，画面元素和音频内容完全对不上**。

**正确做法**：
1. 用 Edge TTS 生成 13 段配音
2. `ffprobe` 测每段实际时长
3. timeline `duration = 实际时长` + 1s 气口
4. 如果总时长过长，用 `ffmpeg atempo=1.6x` 加速（保持音调，≤1.6x 听感自然）

### 4.3 FadeUp 等组件必须支持 delayRatio

**早期所有 fade 延迟是绝对帧数**（如 `delay={140}`），硬编码按 10s 段时长设计。**改成 1.6x 加速音频后段时长变 9~18s**，原 delay 占比从 14% 涨到 43%——元素过早 fade in，段末长期静止。

**修复**：
1. `_layout.tsx` 加 `SegDurationContext`，Stage 把 `segDuration` 传给所有子组件
2. `FadeUp` / `SlideIn` / `PopIn` / `DrawLine` 都支持 `delayRatio`（0~1），按段时长自动缩放
3. 13 段组件批量 `delay={N}` → `delayRatio={(N/maxDelay) * 0.7}`

### 4.4 段间气口用 Sequence 自然实现

**Sequence `from=startFrame, durationInFrames=duration`** — 当下一段 `from` 大于当前段 `from + durationInFrames` 时，**旧段保留渲染**直到下段 from。

**段间 1s 静止画面是 Sequence 默认行为**——不需要额外 fadeOut 组件。

---

## 5. 文件索引

```
graph-eng-2026/
├── README.md                   ← 本文件
├── requirements.md             ← 用户需求 + 调整记录
├── process.md                  ← 项目进程时间线
├── process/
│   └── storyboard.md           ← 13 段分镜（含配音文案）
├── reference/
│   └── ref_video.mp4           ← 参考视频
├── analysis/
│   └── ref_analysis_full.md    ← AURORA 风格分析
├── assets/
│   ├── article_full.md         ← 飞书文章全文
│   └── article_imgs/           ← 文章原图
├── public/
│   └── audio/                  ← Edge TTS 13 段配音（含 1.6x 加速）
├── src/
│   ├── index.tsx               ← Remotion 入口
│   ├── Root.tsx                ← Composition 注册
│   ├── _root_helper.tsx        ← 13 段 Sequence 调度
│   ├── _layout.tsx             ← Stage + FadeUp/SlideIn/PopIn/DrawLine
│   ├── scenes/                 ← S00-S12 段组件
│   ├── subtitles.json          ← 26 条字幕时间戳
│   └── timeline.json           ← 13 段时间线
├── scripts/
│   └── gen_*.py                ← 配音/字幕生成脚本
├── out/
│   └── v25_full.mp4            ← 最终视频（11.3MB / 198s）
└── SOP.md                      ← 视频项目 SOP（待补完）
```

---

## 6. 13 段分镜（一览）

| # | 章节 | 主题 | 时长 |
|---|---|---|---|
| 00 | 封面 | Graph Engineering 别再晕 | 10.5s |
| 01 | §1 | 图=点+边（欧拉七桥引入） | 15.8s |
| 02 | §2 | 表格思维极限 vs 图思维 | 13.6s |
| 03 | §3 | 数据图工程 6 层生命周期 | 15.4s |
| 04 | §3 | 4 个易混词辨析 | 18.7s |
| 05 | §4 | 2026 新含义：AI Agent 图工程 | 15.8s |
| 06 | §5 | 三维框架总图 | 15.5s |
| 07 | §6 | 第一维 Scope | 15.7s |
| 08 | §7 | 第二维 Plane（5 个平面） | 16.7s |
| 09 | §7 | Adaptation 6 级 + 治理铁律 | 15.0s |
| 10 | §8 | 第三维 Dynamism | 15.8s |
| 11 | §9 | 理想参考架构（8 区块） | 16.5s |
| 12 | 彩蛋 | CodexLoom + 结语 | 8.4s |

**详情见** `process/storyboard.md`

---

## 7. 渲染

```bash
npx remotion render src/index.tsx GraphEng out/v25_full.mp4 --concurrency=8
```

输出：`out/v25_full.mp4` · 11.3MB · 198s · 540×720 · h264+aac · 已含配音