# 视频项目 SOP · 通用流程

> **目标**：沉淀"用 AURORA 风格做 13 段讲解视频"的完整流程，让后人/AI 能复用
> **来源**：graph-eng-2026 项目 v1→v25 全部踩坑教训

---

## 1. 项目结构

```
video-project/
├── README.md              ← 项目主文档（目标 + 决策 + 状态）
├── requirements.md        ← 用户原始需求 + 调整记录
├── process.md             ← 项目进程时间线（重要决策点）
├── process/
│   └── storyboard.md      ← 分镜（每段配音 + 视觉元素）
├── reference/             ← 参考视频（风格基准）
├── analysis/              ← 风格分析报告
├── assets/                ← 文章/原图素材
├── public/audio/          ← Edge TTS 生成的配音
├── src/
│   ├── index.tsx          ← Remotion 入口
│   ├── Root.tsx           ← Composition 注册
│   ├── _root_helper.tsx   ← 段 Sequence 调度
│   ├── _layout.tsx        ← Stage + 动效组件库
│   ├── scenes/            ← S00-S12 段组件
│   ├── timeline.json      ← 13 段时间线（按真实音频时长）
│   └── subtitles.json     ← 字幕时间戳（按 timeline 重新映射）
├── scripts/               ← 配音/字幕生成脚本
└── out/                   ← 渲染输出
```

---

## 2. 完整流程

### 阶段 1：规划（1~2 天）

1. **确认文章结构** — 飞书导出全文 → 拆章节
2. **写分镜** `process/storyboard.md` — 每段主题 + 配音文案 + 视觉元素清单
3. **分析参考视频** `analysis/ref_analysis_full.md` — 拆色彩/字体/动效/节奏
4. **锁定决策** — 画幅/总时长/段数/动效语言/字体/配色

### 阶段 2：生成配音（1~2 小时）

```bash
# 1. Edge TTS 生成（中文用 zh-CN-YunjianNeural）
for i in {0..12}; do
  edge-tts --voice zh-CN-YunjianNeural \
    --text "$(cat process/segments/s$i.txt)" \
    --write-media public/audio_raw/s$(printf '%02d' $i).mp3
done

# 2. 测每段实际时长
for i in $(seq 0 12); do
  fn=$(printf "s%02d.mp3" $i)
  dur=$(ffprobe -v quiet -show_entries format=duration -of csv=p=0 public/audio_raw/$fn)
  echo "$fn: ${dur}s"
done

# 3. 1.6x 加速（保持音调，平衡听感 + 时长）
mkdir -p public/audio
for f in public/audio_raw/*.mp3; do
  base=$(basename $f)
  ffmpeg -y -i $f -filter:a "atempo=1.6" public/audio/$base
done
```

### 阶段 3：timeline + 字幕（30 分钟）

```bash
# 1. 按 1.6x 加速音频时长生成 timeline.json
# 每段 duration = 加速后音频时长 + 1s 气口
# 段间 start 累加

# 2. subtitles.json 按新 timeline 重新映射
# 旧字幕时间戳比例映射到新段时长
```

### 阶段 4：组件开发（4~8 小时）

#### 4.1 Stage wrapper

```tsx
// _layout.tsx
export const SegDurationContext = React.createContext<number>(10);

export const Stage = ({ segIndex, segId, startTime, segDuration, zh, en, caption, children }) => (
  <SegDurationContext.Provider value={segDuration}>
    {/* 540×720 米白底 + AURORA 柔光带 */}
    {children}
  </SegDurationContext.Provider>
);
```

#### 4.2 动效组件库（全部支持 delayRatio）

```tsx
// FadeUp · opacity + translateY
export const FadeUp = ({ delayRatio, delay, duration = 15, children, style }) => {
  const frame = useCurrentFrame();
  const config = useVideoConfig();
  const segDuration = React.useContext(SegDurationContext);
  const realDelay = (delayRatio !== undefined)
    ? Math.round(delayRatio * segDuration * config.fps)
    : (delay || 0);
  // interpolate...
};

// SlideIn / PopIn / DrawLine 同样支持 delayRatio
```

#### 4.3 段组件

```tsx
// scenes/S00.tsx
export const S00 = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
    <FadeUp delayRatio={0.0}>{/* 顶部小标 */}</FadeUp>
    <FadeUp delayRatio={0.05}>{/* 主标 */}</FadeUp>
    <FadeUp delayRatio={0.3}>{/* 副标 */}</FadeUp>
    {highlights.map((h, i) => (
      <FadeUp key={h.n} delayRatio={0.4 + i * 0.08}>{/* 列表项 */}</FadeUp>
    ))}
  </div>
);
```

#### 4.4 批量转换 delay → delayRatio

```python
# 把所有 delay={N} 按段 maxDelay × 0.7 缩放
import re, os
RATIO_END = 0.7
for f in os.listdir('src/scenes'):
    if re.match(r'S\d{2}\.tsx$', f):
        max_d = old_max_delay[f.replace('.tsx', '')]
        content = open(f'src/scenes/{f}').read()
        new_content = re.sub(r'delay=\{(\d+)\}',
            lambda m: f'delayRatio={{{(int(m.group(1))/max_d)*RATIO_END:.3f}}}',
            content)
        open(f'src/scenes/{f}', 'w').write(new_content)
```

### 阶段 5：渲染（5 分钟）

```bash
npx remotion render src/index.tsx GraphEng out/full.mp4 --concurrency=8
```

### 阶段 6：验证（30 分钟）

```bash
# 1. 抽 6 张关键帧拼预览
for t in 2 8 18 35 70 130; do
  ffmpeg -ss $t -i out/full.mp4 -frames:v 1 /tmp/t$t.jpg
done
ffmpeg -i /tmp/t2.jpg -i /tmp/t8.jpg ... -filter_complex "tile=3x2" /tmp/preview.jpg

# 2. OCR 验证每段标题正确
for t in $(seq 0 12); do
  start=$(jq -r ".segments[$t].start" src/timeline.json)
  mid=$(echo "$start + $(jq -r ".segments[$t].duration" src/timeline.json) / 2" | bc)
  ffmpeg -ss $mid -i out/full.mp4 -frames:v 1 /tmp/s$t.jpg
done
# 用 /tmp/ocr-bin/ocr_frame 验证每段标题
```

### 阶段 7：开源 + 文档（30 分钟）

```bash
git init && git add -A && git commit -m "..."
gh repo create graph-eng-2026 --public --source=. --remote=upstream --push
```

---

## 3. 关键教训（避坑）

### 3.1 ❌ 固定每段时长

**错误**：timeline 每段写死 8~12s
**后果**：配音 13~28s 念到一半被切，音画对不上
**正解**：必须按 `ffprobe` 实测音频时长排 timeline

### 3.2 ❌ 硬编码 delay={N}

**错误**：所有 fade delay 写绝对帧数
**后果**：段时长调整后所有 fade 错位
**正解**：用 `delayRatio={0.X}`（0~1 相对段时长），通过 Context 自动缩放

### 3.3 ❌ 复杂 CSS @keyframes

**错误**：写 clip-path 动画 / typewriter / 呼吸 scale
**后果**：Remotion headless 把复杂 keyframes 压到 1 帧，视频里看不到过程
**正解**：只用 fade-up 类（opacity + transform），靠 stagger delay 做层次

### 3.4 ❌ 不用 Sequence 默认行为

**错误**：自己写 fadeOut 组件做段间过渡
**后果**：增加复杂度，可能与 Sequence 冲突
**正解**：让 Sequence from 自然超出旧段 duration，旧段保留 1s 静止画面

### 3.5 ❌ 配音太长不加速

**错误**：13 段共 250s+，视频过长
**后果**：用户看完率低
**正解**：`atempo=1.6x` 加速（保持音调），平衡听感和时长

### 3.6 ❌ DrawLine/PopIn 忘记支持 delayRatio

**错误**：只改 FadeUp，其他动效保持硬编码
**后果**：编译报错 `inputRange must contain only numbers`
**正解**：所有自定义动效组件都加 `delayRatio` 支持

---

## 4. 验证清单

每段视频必须验证：
- [ ] 段起始时间 = timeline `start`
- [ ] 段中点画面 = 该段核心概念
- [ ] 配音 = 该段配音文案（前 3 句 + 中点句 + 最后 1 句）
- [ ] 字幕 = 时间戳与配音对齐（错位 ≤ 0.5s）
- [ ] 段末淡入下一段时无突然跳变
- [ ] 所有元素在 0~0.7 段时长内 fade in 完成，0.7~1.0 保持显示

---

## 5. 性能优化

```bash
# 并发 8 核 + 跳过 chromium 字体子集化
npx remotion render src/index.tsx GraphEng out/full.mp4 --concurrency=8

# 渲染前清理旧输出
rm -f out/*.mp4
```

13 段 / 198s / 30fps / 540×720 ≈ **198 × 30 = 5940 帧** → 渲染 ~5 分钟（8 核）