# 13 段分镜 · Graph Engineering 视频（v2 重写版）

> **基准**：`reference/ref_video.mp4` 实际视觉（OCR + 像素分析）
> **总时长**：~130s / **段数**：13 段 / **画幅**：540×1172 竖屏
> **风格**：**黑白杂志页 + 抖音小红书 App 外层框 + 中英双语排版**
> **配色**：米白 #E0E0E0 + 黑 #000000 + 紫红 #C53F3F（点睛）+ 极少浅紫 #E0C0E0
> **字体**：中文无衬线粗体（PingFang SC Heavy）+ 英文 sans（Inter Black）+ 数字 sans-serif
> **架构**：内层杂志页（米白底，文字/表格/数字居中）+ 外层 App 框架（抖音/小红书 UI，固定不变）

---

## ⚠️ 关键认知修正（v15 → v16）

| 旧理解（错的） | 实际 |
|---|---|
| AURORA 柔雾渐变 | **米白 + 黑**，极少紫 |
| 玻璃拟态 | **无**，是硬边杂志 |
| 紫色高亮 | **红色 #C53F3F** 点睛 |
| 整体紫粉蓝 | 上半亮、下半暗的杂志分层 |

参考视频是 **「抖音视频 + 杂志封面」套娃**，外层 App 框不动，内层换杂志页。

---

## 全局视觉规范（锁定）

```
┌─────────────────────────────────────┐
│ [抖音状态栏] 🕐 视频时间            │ ← 6:14（数字随段递增）
├─────────────────────────────────────┤
│  ● 视须Skill·开源盘点    VOL.02    │ ← 顶头条（黑色细线分隔）
│                                     │
│   ▸ Prism 视频SKILL 开源盘点       │ ← 中英标题（小标灰字）
│   ▸ 8个视频Skill                   │ ← 主标题（粗黑大字）
│     装上直接出片                    │ ← 副标题
│                                     │
│        📊 主内容区（米白底）        │
│        三栏编号 / 表格 / 图示       │
│                                     │
│   @西米 [推荐] 6:14 R %红9 50      │ ← 底部小红书/抖音卡片文案
├─────────────────────────────────────┤
│ × 首页 朋友1 消息 99+ 我           │ ← 底部 tabbar
└─────────────────────────────────────┘
```

---

## 13 段分镜 · 严格按文章 12 章映射

| 段 | 时长 | 章节 | 主题 | 版式 |
|---|---|---|---|---|
| s00 | 8s | 封面 | Graph Engineering 别再晕 | 期刊封面：大字标题 + 副标 + 数字 |
| s01 | 9s | §1 图=点+边 | 图就是点和边 | 3 卡片横向 + 解释 |
| s02 | 10s | §2 表格 vs 图 | 表格思维的极限 | 左右分屏对比 |
| s03 | 10s | §3 数据图工程 6 层 | 最古老的一层 | 6 行垂直栈 |
| s04 | 11s | §4 Agent 图工程 | 2026 新含义 | 概念定义 + 公司类比 |
| s05 | 9s | §5 三维框架 | 三维 = 尺子 | 三栏编号 + 中央公式 |
| s06 | 10s | §6 Scope 维度 | Work vs Org | 左右对比卡 + 桥接层 |
| s07 | 11s | §7 Plane 维度 | 5 个系统平面 | 5 行编号列表 |
| s08 | 10s | §8 Dynamism 维度 | 4 级动态性 | 4 行编号表 |
| s09 | 11s | §9 理想架构 | 三维坐标展开 | 8 区块图 + 9 原语 |
| s10 | 10s | §10 矩阵统一 | Scope×Plane 矩阵 | 4×5 矩阵表格 |
| s11 | 9s | §11 CodexLoom | 真实案例定位 | 三维定位卡 |
| s12 | 12s | §12 + 结语 | 清单 + 三条建议 | 清单 + 三条带走建议 |

**总时长** = 8+9+10+10+11+9+10+11+10+11+10+9+12 = **130s** ✓

---

## 通用元素规范

### 顶部条（所有段）
```html
<div class="topbar">
  <span class="dot"></span>
  <span class="tag">Graph Engineering · 一图读懂</span>
  <span class="vol">VOL.01 / 2026</span>
</div>
```
- 高度 36px，左对齐黑色细体，中文在前英文在后
- 右侧 `VOL.01 / 2026` 灰色小字

### 中部小标（章节锚点）
```html
<div class="sec-label">
  <span class="zh">第 X 章 · 章节名</span>
  <span class="en">CHAPTER · ENG</span>
</div>
```
- 左对齐，灰黑色，14px 中英对照

### 主标题区
```html
<h1 class="hero">主标题</h1>
<p class="sub">副标题/释义</p>
```
- 字号 36-48px 中文粗黑，24px 英文 sans
- 副标 18px 细灰
- 行距 1.2

### 主内容区（每段不同）
按段类型区分：卡片 / 表格 / 编号 / 分屏 / 矩阵 / 列表

### 底部小红书卡片（所有段）
```html
<div class="card-bottom">
  <div class="user">@Hermes · <span>AI 探索</span></div>
  <div class="caption">本段核心一句话</div>
  <div class="meta">6:14 R 2451 50</div>
</div>
```
- 高度 80px，米白磨砂卡，圆角 12px
- 三行：作者/标签 / 核心一句话 / 互动数据

### 底部 Tabbar（所有段相同）
```html
<div class="tabbar">
  <span>×</span><span>首页</span><span>朋友</span><span>消息</span><span>99+</span><span>我</span>
</div>
```
- 高度 32px，黑色细体，居中分散

### 抖音状态栏（所有段）
- 高度 24px，黑色背景，白字
- 左 `🕐 6:14`，右 `📶 R %红9 50`

---

## 段详情

### s00 · 封面 · 8s
```
顶部条：Graph Engineering · 一图读懂    VOL.01 / 2026
中部小标：PRISM GRAPH ENGINEERING
主标题：8 个核心概念
副标题：图就是点和边 / 表格思维的极限 / 三维框架
中央：大数字底纹"01"（半透明，280px）
下方：5 大重点编号列表（01-05）
底部卡：本期帮你用一把尺子，下次再见这词能精确定位
```
**配色重点**：用 #C53F3F 强调"尺子"
**动效**：主标题字符 stagger（60ms 间隔）+ 中央数字缩放弹入 + 编号 stagger

### s01 · §1 图=点+边 · 9s
```
顶部条
中部小标：第 01 章 · 最浅的一层   CHAPTER · NODES+EDGES
主标题：图就是点和边
副标题：1736 年欧拉解决柯尼斯堡七桥
主内容：3 张卡片横排（公司组织 / 家族族谱 / 地铁线路）
       每卡：图标 + 名称 + 一句话
底部卡：从"东西是什么"转向"东西之间怎么连"
```
**动效**：3 卡 stagger（0.2s 间隔）从下滑入 + 卡片底部红色细线延展

### s02 · §2 表格 vs 图 · 10s
```
顶部条
中部小标：第 02 章 · 为什么需要图   CHAPTER · TABLE vs GRAPH
主标题：表格思维的极限
主内容：左右分屏
  左（表格）：5×3 灰色单元格 + 红色 × 不能答
  右（图）：节点 + 边的小型网络
中央分割线：中间"VS"
底部问题列表（4 条 stagger）：二度人脉 / 欺诈藏网络 / 故障扩散 / 任务回退
底部卡：不懂图算法，就会写出推荐系统宕机 6 小时的查询
```

### s03 · §3 数据图工程 6 层 · 10s
```
顶部条
中部小标：第 03 章 · 数据图工程   CHAPTER · 6-LAYER STACK
主标题：最古老的一层
主内容：6 行垂直栈
  ① 基础    点+边 G=(V,E)
  ② 建模    本体 / Schema
  ③ 存储    Neo4j / TigerGraph
  ④ 查询算法 Cypher / Gremlin
  ⑤ 图智能  GNN / GraphRAG
  ⑥ 应用    反欺诈 / 推荐 / 知识图谱
底部卡：四个最容易混的词 — 图数据库 ≠ 知识图谱 ≠ GraphRAG ≠ LangGraph
```
**动效**：每行 stagger 滑入（0.15s 间隔），左侧编号红色方块 pulse 一次

### s04 · §4 Agent 图工程 · 11s
```
顶部条
中部小标：第 04 章 · Agent 图工程   CHAPTER · MULTI-AGENT GRAPH
主标题：把多 Agent 系统设计成一张显式图
主内容：定义卡 4 张
  节点 = Agent 或确定性步骤
  边 = 路由（顺序/条件/并行/扇入）
  状态 = 沿边流动共享对象
  引擎 = 遍历/路由/重试/回滚
底部卡：图是引擎，也是真相源 — 先 Loop，再 Graph
```
**动效**：4 张定义卡 stagger 入场（0.2s 间隔），底部红线划重点

### s05 · §5 三维框架 · 9s
```
顶部条
中部小标：第 05 章 · 三维框架   CHAPTER · SCOPE×PLANE×DYNAMISM
主标题：把发散的概念收拢成一把尺子
中央公式（大字）：Scope × Plane × Dynamism
主内容：3 栏说明
  Scope: Work Graph vs Org Graph
  Plane: Control / Execution / Evaluation / Adaptation / Governance
  Dynamism: 静态 / 条件 / 生成 / 自适应
底部卡：每次看到 Graph Engineering，先问这三个问题
```

### s06 · §6 Scope · 10s
```
顶部条
中部小标：第 06 章 · Scope 维度   CHAPTER · WORK vs ORG
主标题：Work Graph vs Org Graph
主内容：左右对比卡
  左：Work Graph（项目执行计划）— 短生命周期
    用户目标 → 需求 → 调研 → 验证 → 输出
  右：Org Graph（公司组织架构）— 长生命周期
    制作总监 → 剧本 / 互动 / 分镜 / 资产 / 质量
中部桥接层（红字）：Assignment / Staffing
底部卡：Org Graph 不是更大的 Work Graph — 是语义不同
```

### s07 · §7 Plane · 11s
```
顶部条
中部小标：第 07 章 · Plane 维度   CHAPTER · 5 PLANES
主标题：五个系统平面
主内容：5 行编号
  ① Control    指挥（Planner/Router/Orchestrator）
  ② Execution  做出来（Agent 推理 / 工具 / 代码）
  ③ Evaluation 验收（多维检查，Worker/Verifier 不可共享上下文）
  ④ Adaptation 学习（6 级修改：Context → Org Graph）
  ⑤ Governance 定边界（预算 / 权限 / 不可修改的 Anchor）
底部卡：图工程之后不是更大的图，而是围绕图建立的评价/学习/治理回路
```

### s08 · §8 Dynamism · 10s
```
顶部条
中部小标：第 08 章 · Dynamism 维度   CHAPTER · 4 LEVELS
主标题：图有多"动态"
主内容：4 行等级表
  L1 静态图         创业初期 一套固定流程
  L2 条件图         成长期 区分项目类型
  L3 运行时生成图   成熟期 项目经理当场拆任务
  L4 自适应图       学习型组织 改流程模板
底部卡：动态性不是 Graph Engineering 的必要条件 — 静态 DAG 也是图工程
```

### s09 · §9 理想参考架构 · 11s
```
顶部条
中部小标：第 09 章 · 理想架构   CHAPTER · REFERENCE ARCHITECTURE
主标题：它是三维坐标里一格的展开
主内容：8 区块简化图（用色块标 I-VIII）
  I. OVERVIEW       实体+关系的图
  II. ARCHITECTURE  User Goal → Orchestrator → Components → Execution → Feedback
  III. PRINCIPLES   图优于线 / 局部决策 / 全局一致
  IV. TOPOLOGY      8 种：Linear Fan-out Fan-in Diamond Loop Hub Mesh Hybrid
  V. PRIMITIVES     9 原语：Node Edge State Context Memory Tools Router Reducer Verifier
  VI. OPERATIONS    Plan → Dispatch → Execute → Observe → Adapt
  VII. FLOW EXAMPLE Diamond：Planner → Research×2 → Analysis → Reducer → Verifier
  VIII. OUTCOMES    扩展 / 抗变化 / 并行 / 可观测 / 适应
底部卡：Observability 反馈回 Orchestrator 是活图和死图的分水岭
```

### s10 · §10 矩阵统一 · 10s
```
顶部条
中部小标：第 10 章 · 三维统一   CHAPTER · MATRIX
主标题：Scope × Plane 矩阵
主内容：4×4 矩阵表格
        执行    评价    自适应    治理
节点   完成任务  判断完成  改 Prompt  工具权限
Work   任务依赖  阶段验收  动态增删  预算审批
Org    多团队协作 部门评估  增减角色  权限配额
跨组织  系统协作  信任认证  选合作方  协议合规
底部卡：每个格子都是一个真实的设计问题
```

### s11 · §11 CodexLoom · 9s
```
顶部条
中部小标：第 11 章 · 真实案例   CHAPTER · CODEXLOOM
主标题：它处在图工程的哪一层
主内容：三维定位卡
  Scope   认真做 Org，不做 Work
  Plane   Execution + Governance 强，Evaluation + Adaptation 缺
  Dynamism Level 1~2（只读投影，不运行时生成）
底部卡：CodexLoom 不是半成品图引擎 — 是故意只做 Org 那半的平台
```

### s12 · §12 + 结语 · 12s
```
顶部条
中部小标：结语 · 带着三把尺子离开   CHAPTER · TAKE AWAYS
主标题：给实践者三条建议
主内容：3 大块建议
  ① 先 Loop，再 Graph   员工个人循环跑不稳，图也只会制造混乱
  ② Verifier 是瓶颈     Worker 和 Verifier 绝不能共享上下文
  ③ 会判断"不用图"      不是所有协作都该建模成图
下方：开源清单分类（5 个代表库 + 5 篇代表文章）
底部卡：三个问题答完，你对任何 Graph Engineering 都能精确定位
```

---

## 动效配方（按段类型）

| 版式类型 | 动效 |
|---|---|
| 期刊封面（s00） | 字符 stagger 上滑 + 中央数字缩放弹入 |
| 卡片横向（s01） | 卡片 stagger 下滑 + 底部红线延展 |
| 左右分屏（s02, s06） | 左右各 stagger 0.3s 错开渐入 |
| 垂直栈（s03, s07, s08） | 每行 stagger 0.15s 滑入 + 左侧编号 pulse |
| 定义卡（s04） | 4 张卡 stagger 入场 + 底部红线划重点 |
| 三栏（s05） | 三栏 stagger 入场 + 中央公式单独缩放弹入 |
| 对比卡（s06） | 左右卡 stagger + 中部桥接层延展 |
| 矩阵（s10） | 表格按行 stagger 渐显 |
| 清单（s12） | 三大块 stagger 滑入 + 编号红色 pulse |

**通用基础动效**：
- 入场：`opacity 0→1` + `translateY 20→0`，500ms `cubic-bezier(0.25,0.46,0.45,0.94)`
- 编号：`scale 1→1.2→1`，300ms（仅一次）
- 红线：`width 0→100%`，500ms `ease-out`
- 段切换：上段 `opacity 1→0` + `translateY 0→-20` 同时下段反向

---

## 配音脚本（130s / 13 段）

> **风格**：知识播客，节奏稳，无情绪起伏，关键术语稍停顿
> **TTS**：Edge TTS `YunyangNeural`，rate `-15%`
> **关键术语**："Graph Engineering"、"Scope×Plane×Dynamism"、"Worker/Verifier"、"CodexLoom" 等用英文

| 段 | 配音 | 时长 |
|---|---|---|
| s00 | 图谱工程这词今年被吹上天了，但你真的知道它指什么吗？这次给你一把尺子。 | 8s |
| s01 | 图是什么？点加线。公司组织架构、家族族谱、地铁线路，都是图。它答的是'连不连得上、怎么连、连多远'，不是单个东西长什么样。 | 9s |
| s02 | HR 系统能告诉你公司有多少人，但问'张三请假谁能顶？顶的人又请假了呢'？表格不会答，这是图问题。 | 10s |
| s03 | 数据图工程最早不是 AI 圈的词。从基础到应用有六层：基础、建模、存储、查询与算法、图智能、应用。其中最容易混的是图数据库、知识图谱、GraphRAG、LangGraph。 | 10s |
| s04 | 但 2026 年大家说的图工程，主要不是数据这一层，而是把多 Agent 系统设计成一张显式图。节点是 Agent，边是路由，状态沿边流动共享。图是引擎，也是真相源。 | 11s |
| s05 | 但真要讲清楚，得用三把尺子：Scope（图作用在哪个层级）、Plane（同一层级有哪些系统平面）、Dynamism（图有多动态）。 | 9s |
| s06 | Scope 维度拆两张图：Work Graph 是这次任务怎么完成——短生命周期；Org Graph 是系统里长期存在哪些能力和责任——长生命周期。中间还有 Assignment 层把两者桥接起来。 | 10s |
| s07 | Plane 维度拆五个平面：控制、做出来、验收、学习、定边界。最容易被忽视的一条铁律：Worker 和 Verifier 绝不能共享上下文。 | 11s |
| s08 | Dynamism 维度拆四级：静态、条件、运行时生成、自适应。重要的事：动态性不是图工程的必要条件，静态 DAG 也是图工程。 | 10s |
| s09 | 社区流传一份理想参考架构，八个区块：OVERVIEW / ARCHITECTURE / PRINCIPLES / TOPOLOGY / PRIMITIVES / OPERATIONS / FLOW / OUTCOMES。其中最该记住的三条原语：Router、Reducer、Verifier。 | 11s |
| s10 | 把 Scope 和 Plane 铺成矩阵，每一格都是一个真实设计问题：从节点级到跨组织，从执行到治理，全图视图。 | 10s |
| s11 | CodexLoom 是最近开源的案例。它认真做 Org Graph，但不做 Work Graph；Execution 和 Governance 强，Evaluation 和 Adaptation 缺。结论：它是故意只做图工程 Org 那半的平台。 | 9s |
| s12 | 最后三条带走：先 Loop 再 Graph；Verifier 是真瓶颈；会判断'不用图'比会画图更高级。三把尺子拿好，下次再看到 Graph Engineering 就能精确定位。 | 12s |

**总时长** = 8+9+10+10+11+9+10+11+10+11+10+9+12 = **130s** ✓