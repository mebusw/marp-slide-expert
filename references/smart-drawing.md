# Smart Drawing — 咨询级关系图（Marp 内联 SVG）

画出咨询顾问那种 smart drawing / relation diagram：阶梯、箭头串、矩阵、关系树、闭环。

**为什么不用图片：** 一张 PNG 改一个数字就要重画；而内联 SVG 直接写在 `.md` 里，跟着文件走，文字可搜索，PDF 里是矢量不糊，改一个颜色只动一个十六进制值。

**本文件是自足的：** §4 给出完整的选图路由（关系类型 → 图形 → SVG 模板）和叙事隐喻的几何底座，§5 给出可直接抄的模板，§6–§8 给出连线语义、视觉层级和 QA 清单。不需要先去别处查分类。

---

## 1. 前置条件（不满足就是一页纯文本）

Marp 默认**转义**内联 HTML。写了 `<svg>` 却没开开关，渲染出来是一整页肉眼可见的 SVG 源码。

```bash
# 必须带 --html
marp deck.marp.md --html --pdf --allow-local-files
```

因此：

- 含关系图的 deck，**渲染命令必须带 `--html`**。在 deck 顶部（frontmatter 之后）用注释写死这条命令，避免下次渲染忘。
- `SKILL.md` 硬规则里的「No `<div>` wrappers」是**不加 `--html` 时**的行为。加上 `--html` 后 div 也能用，但仍然别用 div 做布局——SVG 表达几何关系更直接。
- 加了 `--html` 之后 deck 可以被任意工具链消费，代价只是要记得这个开关。

### SVG 三条铁律

| 铁律 | 后果 |
|---|---|
| **SVG 内部不能有空行** | markdown 会把 HTML 块从空行处切断，图形直接消失（不是报错，是静默消失） |
| **每张图的 `marker`/`clipPath` id 必须唯一** | 导出合并 HTML（`--html` 单文件）时所有 SVG 共享一个 DOM，后面的 marker 全部串到第一个的定义上 |
| **SVG 内不写 `---`** | 会被当成 marp 的分页符，这页直接裂成两页 |

id 命名约定：`a1` / `a2` / `a3`…（第 N 张图用第 N 个前缀），全文唯一即可。

---

## 2. 画布坐标系约定

Marp 幻灯片是 1280×720，正文区约 **1140px 宽**（左右各 70px padding），可用高度约 500px。

| 约定 | 值 | 说明 |
|---|---|---|
| viewBox 宽度 | `1020` | 缩放到 1140px，比例 ≈ 1.12，`font-size: 22` 的 SVG 文字实际约 25px |
| viewBox 高度 | `300`–`540` | 按图形复杂度；高度决定图形占多高 |
| 图形宽度 | `width="100%"` | 配合 `max-width: 100%` 自适应，不要写死像素 |
| 底部安全线 | viewBox `y ≤ 500` | 超过就侵入 footer 区（footer 绝对定位在 `bottom: 25px`） |

**footer 冲突：** X 轴标题、图例这类要贴底的元素，很容易压到 footer 上。给这类页加 `<!-- _class: diagram -->`，再在 style 里 `section.diagram footer { display: none; }`（已包含在 style-bootstrap 里）。

---

## 3. CSS 复用类（已包含在 style-bootstrap）

SVG 的 `<text>` 会继承 deck 的 `<style>`，所以字号可以抽成类，四张图共用一套：

```css
svg        { display: block; margin: 0 auto; max-width: 100%; height: auto; }
svg text   { font-family: 'PingFang SC', 'Microsoft YaHei', 'Noto Sans CJK SC', sans-serif; }
svg .t     { font-size: 26px; font-weight: 700; }   /* 图形主标题 */
svg .tb    { font-size: 19px; font-weight: 700; }   /* 节点/序号 */
svg .sm    { font-size: 15px; }                     /* 副标签 */
svg .qt    { font-size: 20px; font-weight: 700; }   /* 象限标题 */
svg .lbl   { font-size: 15px; fill: #7f8c8d; }     /* 底部浅灰注脚 */
```

**不要**在 SVG 里写死 `font-size` 属性——那样改主题时四张图要挨个改。字号只走 class。

字号底线：`.sm` 15 是下限。低于 14px 在投影上基本看不清；宁可缩短文案也不要缩字号。

---

## 4. 选图路由

### 4.1 第一步：判断信息之间的关系

**不要凭感觉选图。** 先问"这些节点之间到底是什么关系"——关系类型决定图形家族：

| 关系 | 判定问句 | 图形家族 |
|---|---|---|
| **Hierarchy** 层级 / 包含 | A 包含 B？A 是 B 的上级？ | 树 / 金字塔 / 分层 |
| **Sequence** 时序 | A 发生在 B 之后？ | 箭头串 / 时间线 |
| **Cycle** 循环 | A 强化 A？流程回到起点？ | 环形 / 闭环 |
| **Comparison** 对比 | A 与 B 相比？现状 vs 目标？ | 左右对比 / 前后 |
| **Matrix** 矩阵 | 两个维度交叉分类？ | 2×2 / 3×3 |
| **Framework** 框架 | 3 层 / 4 支柱 / 5 维度的结构化模型？ | 分层 / 支柱 |
| **Strategy** 战略 | 愿景 → 战略 → 执行的承接？ | 金字塔 / 战略屋 |
| **Mapping** 映射 | 两组实体之间的对应？ | 树（单边）/ 追溯矩阵 |
| **Growth** 演进 | 我们在哪，下一步去哪？ | 阶梯 / 曲线 |

**关键区分：** 节点多且**多对多双向**（A↔B↔C 都相连）时，不要硬塞进中心辐射（Hub & Spoke）——那会丢掉交叉关联，退化成一张关系网或拆成分组矩阵。

### 4.2 第二步：关系 → 本文件的模板

| 关系类型 | 讲什么 | 用这个模板 |
|---|---|---|
| Sequence / 时序 | 先做什么后做什么 | §5.2 箭头串 |
| Hierarchy / 层级（深度 3+） | 价值从哪来、怎么拆 | §5.4 关系树 |
| Matrix / 双维度分类 | 资源给谁、不给谁 | §5.3 2×2 矩阵 |
| Growth / 演进 | 我们在哪、下一步去哪 | §5.1 阶梯图 |
| Feedback / 闭环 | 持续改进、结果反哺 | §5.5 闭环虚线（叠加在上面任意一张图下） |
| Mapping / 一对多 | 目标 ↔ 举措的对应 | §5.4 关系树（单边分支） |

### 4.3 叙事型隐喻 → 几何底座

隐喻是**情绪层**，结构是**骨架层**。同一张图可以先按 §4.1 选结构，再按叙事需要换外壳。左边是要讲的故事，右边是基于本文件哪个模板改：

| 隐喻 | 核心语义 | 几何底座 | 改动量 |
|---|---|---|---|
| **Staircase** 阶梯 | 逐级跃迁、进阶 | §5.1 阶梯图 | 原生 |
| **Pyramid** 金字塔 | 战略层 → 执行层收敛 | 阶梯图镜像（层宽递减 + 顶部单点） | 小 |
| **Wave timeline** 波浪时间线 | 有起伏的演进 | 阶梯图 + 节点间改 `C` 曲线 | 小 |
| **S-Curve** 成熟曲线 | 技术从试验到普及 | 三段折线 polyline + 三个阶段底色 | 中 |
| **Growth curve** 上升曲线 | 增长不是线性 | 折线 + 面积填充 `opacity` | 小 |
| **Mountain** 山峰 | 攻坚到高点再回落 | 三角折线 + 顶点强调 | 中 |
| **Bridge / Gap jump** 跨越鸿沟 | 现状与目标之间的断裂 | 水平带 + 缺口 + 跃起曲线 | 中 |
| **Funnel** 漏斗 | 大量到少量、转化 | 逐层收缩的 `polygon` + 层间箭头 | 小 |
| **Flywheel** 飞轮 | 势能自我积累 | 环形（闭合 `<circle>` + 弧形箭头 `A` 命令） | 中 |
| **Cycle** 循环 | PDCA、持续改进 | 环形四象限 + 环形箭头 | 中 |
| **Iceberg** 冰山 | 显性 vs 隐性成本 | 水位线矩形 + 上下两块 | 中 |
| **Onion** 洋葱 | 层层包裹 | 同心圆 / 同心圆角矩形递减 | 小 |
| **Tree / Root system** 根系 | 因果向下发散 | §5.4 关系树（上向下镜像） | 原生 |
| **Foundation blocks** 基础块 | 能力垫底 | 分层堆叠矩形，底部最宽 | 小 |
| **Convergence / Divergence** 汇聚/分叉 | 多流合一 / 一分为多 | 多条 `<path>` 汇聚到一点 / 从一点发散 | 中 |
| **Focus / Spotlight** 聚焦 | 资源集中一点 | 椭圆高亮 + 放射细线 | 中 |
| **Railway** 轨道 | 不可逆的既定方向 | 双平行线 + 枕木短线 + 里程碑节点 | 中 |

**用法：** 先按 §4.1 定结构 → 再问"这页要什么情绪" → 查上表换外壳 → 按 §5 的坐标公式和 §7 的配色规则填内容。一页只讲一个隐喻，不要结构叠隐喻。

### 4.4 硬约束

- **单图节点数 ≤ 7 是黄金法则。** 超了就拆页、聚合，或降级成表格——不要把 12 个节点挤进一张 SVG，听众会当场放弃。
- **树的层级 ≤ 3。** 第 4 层开始线索就断了。
- **一页一个 Pattern。** 不要把诊断（问题树）、战略（金字塔）、转型（前后对比）混在一张图里。
- **没匹配就降级。** 找不到合适的关系类型时，用最接近的通用结构（箭头串 / 关系树 / 2×2），不要硬画。

---

## 5. 五个模板（可直接抄）

### 5.1 阶梯图 Staircase

**语义：** 现状 → 目标的逐级跃迁。天然带方向感，适合成熟度、演进路径、转型阶段。

**坐标公式**（5 级）：`x_i = 20 + i*196`，`width = 176`，`height_i = 90 + i*60`，`y_i = 420 - height_i`。等差递增 = 台阶感；**高度不要等比**（等比会变成柱状图，失去阶梯的叙事）。

```html
<svg viewBox="0 0 1020 470" width="100%">
  <defs>
    <marker id="a1" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/>
    </marker>
  </defs>
  <text x="20" y="30" font-size="16" fill="#c0392b" font-weight="700">能力成熟度递进 →</text>
  <line x1="20" y1="48" x2="990" y2="48" stroke="#c0392b" stroke-width="2" marker-end="url(#a1)"/>
  <line x1="10" y1="420" x2="1010" y2="420" stroke="#dcdcdc" stroke-width="1.5"/>
  <rect x="20"  y="330" width="176" height="90"  fill="#95a5a6"/>
  <rect x="216" y="270" width="176" height="150" fill="#7f8c8d"/>
  <rect x="412" y="210" width="176" height="210" fill="#2c3e50"/>
  <rect x="608" y="150" width="176" height="270" fill="#a93226"/>
  <rect x="804" y="90"  width="176" height="330" fill="#c0392b"/>
  <text x="108" y="382" class="t" fill="#ffffff" text-anchor="middle">L1</text>
  <text x="108" y="404" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">个人英雄</text>
  <!-- …L2-L5 同构 -->
  <text x="108" y="446" class="lbl" text-anchor="middle">靠个人</text>
  <text x="892" y="446" class="lbl" text-anchor="middle">可自愈</text>
</svg>
```

**要点**
- 色阶由灰 `#95a5a6` → 藏青 `#2c3e50` → 红 `#c0392b`，**一色族走完**，视觉焦点自然落在终点。
- 文字纵向位置：主标题 `y_i + 52`，副标签 `y_i + 74`（相对块底部往上），不要按整块居中——块高不等，居中会飘。
- 底部 `y=446` 是注脚行，基线 `y=420`。

### 5.2 箭头串 Arrow Process

**语义：** 流程叙事，横向阅读。**这是最容易画错的一张图。**

**正确形状：5 点 path = 矩形 + 右侧三角尖。** 文字只放在矩形部分。

```html
<svg viewBox="0 0 1040 300" width="100%">
  <defs>
    <marker id="a2" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/>
    </marker>
  </defs>
  <!-- x=10, 箭身高 114 (88→202), 尖长 34, 步距 204 -->
  <path d="M10,88  L172,88  L206,145  L172,202  L10,202 Z" fill="#95a5a6"/>
  <path d="M214,88 L376,88 L410,145 L376,202 L214,202 Z" fill="#7f8c8d"/>
  <path d="M418,88 L580,88 L614,145 L580,202 L418,202 Z" fill="#2c3e50"/>
  <path d="M622,88 L784,88 L818,145 L784,202 L622,202 Z" fill="#a93226"/>
  <path d="M826,88 L988,88 L1022,145 L988,202 L826,202 Z" fill="#c0392b"/>
  <circle cx="108" cy="46" r="23" fill="#ffffff" stroke="#95a5a6" stroke-width="2.5"/>
  <text x="108" y="54" class="tb" fill="#95a5a6" text-anchor="middle">1</text>
  <!-- …2-5 同构 -->
  <text x="91"  y="140" class="t" fill="#ffffff" text-anchor="middle">愿景</text>
  <text x="91"  y="168" class="sm" fill="#ffffff" text-anchor="middle" opacity=".85">统一共识</text>
  <line x1="108" y1="252" x2="914" y2="252" stroke="#c0392b" stroke-width="2"
        stroke-dasharray="6 5" marker-end="url(#a2)"/>
  <text x="512" y="282" class="sm" fill="#7f8c8d" text-anchor="middle">每一步都有可交付物</text>
</svg>
```

**坐标公式**：`x_i = 10 + i*204`，`width = 196`，尖长 `34`，中线 `y=145`，**文字中心 `x_i + 81`**（= 矩形部分中心，不是整个 196 的中心——差 17px，看起来就是没对齐）。

**⚠️ 反面教材：** 做成 6 点的空心 `>` 形（左右各退 40px 咬合），左半边是**镂空的三角形空洞**，白字浮在洞里完全看不见。见过太多次，不要画成 chevron band。

**要点**
- 步距 204 > 宽度 196 = 8px 缝隙。缝隙是必须的，箭头串读起来靠间隙分隔。
- 序号圆圈放箭头上方 `cy=46`，不要嵌在箭头里。
- 底部虚线（§5.5）把线性流程变成闭环。

### 5.3 2×2 矩阵

**语义：** 双维度分类 + 资源取舍。象限要给**行动指令**（加投 / 攻坚 / 收割 / 放弃），不是只写名字。

```html
<svg viewBox="0 0 1000 530" width="100%">
  <defs>
    <marker id="a3x" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#1a1a2e"/>
    </marker>
    <marker id="a3y" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto">
      <path d="M0,0 L10,4 L0,8 z" fill="#1a1a2e"/>
    </marker>
  </defs>
  <rect x="120" y="70"  width="375" height="200" fill="#f2f7fa"/>
  <rect x="495" y="70"  width="375" height="200" fill="#fdecea"/>
  <rect x="120" y="270" width="375" height="200" fill="#f7f7f7"/>
  <rect x="495" y="270" width="375" height="200" fill="#fdf6e8"/>
  <line x1="120" y1="470" x2="895" y2="470" stroke="#1a1a2e" stroke-width="2" marker-end="url(#a3x)"/>
  <line x1="120" y1="470" x2="120" y2="55"  stroke="#1a1a2e" stroke-width="2" marker-end="url(#a3y)"/>
  <line x1="495" y1="70" x2="495" y2="470" stroke="#ffffff" stroke-width="3"/>
  <line x1="120" y1="270" x2="870" y2="270" stroke="#ffffff" stroke-width="3"/>
  <text x="500" y="505" class="sm" fill="#1a1a2e" text-anchor="middle" font-weight="700">相对市场份额 →</text>
  <text x="60" y="270" class="sm" fill="#1a1a2e" text-anchor="middle" font-weight="700"
        transform="rotate(-90,60,270)">相对增长率 →</text>
  <text x="520" y="98" class="qt" fill="#c0392b">明星业务</text>
  <text x="520" y="120" class="sm" fill="#e74c3c">高增长 · 高份额</text>
  <circle cx="700" cy="200" r="26" fill="#c0392b" opacity=".85"/>
  <text x="735" y="206" class="sm" fill="#1a1a2e" font-weight="700">AI 助手</text>
  <text x="880" y="30" class="sm" fill="#7f8c8d" text-anchor="end">气泡大小 = 收入贡献</text>
</svg>
```

**坐标公式**（留出轴标注空间）：原点 `(120, 470)`，象限 375×200，分割线 `x=495` / `y=270`。X 轴标题 `y=505`（**已超出安全线，必须配 `_class: diagram` 隐藏 footer**）。

**要点**
- 象限底色**极淡**（`#f2f7fa` / `#fdecea`），只有要强调的象限才给红调。文字用重色，气泡才是主体。
- 象限分隔线用**白色** 3px——灰色在浅底上显脏。
- 气泡标签放右侧 `cx + r + 9`，不要压在圆上。
- 旋转的 Y 轴标题用 `transform="rotate(-90,x,y)"`，rotate 中心必须和文本的 `x,y` 完全一致，否则会飞出画布。

### 5.4 关系树 Tree / Value Tree

**语义：** 讲「价值从哪来」「问题怎么拆」。菱形向上收敛，天然回答「所以呢」。

```html
<svg viewBox="0 0 1020 460" width="100%">
  <defs>
    <marker id="a4" markerWidth="9" markerHeight="8" refX="8" refY="4" orient="auto">
      <path d="M0,0 L9,4 L0,8 z" fill="#c0392b"/>
    </marker>
  </defs>
  <rect x="425" y="12" width="200" height="62" rx="6" fill="#1a1a2e"/>
  <text x="525" y="52" class="t" fill="#ffffff" text-anchor="middle">企业价值</text>
  <rect x="175" y="150" width="160" height="56" rx="6" fill="#2c3e50"/>
  <text x="255" y="186" class="tb" fill="#ffffff" text-anchor="middle">客户价值</text>
  <!-- 直角连接器：父底 → 下探 → 横移 → 子顶 -->
  <path d="M525,74 V108 H255 V146" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M255,206 V238 H105 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <path d="M255,206 V238 H245 V284" fill="none" stroke="#b9c3cc" stroke-width="2"/>
  <rect x="40"  y="290" width="130" height="54" rx="4" fill="#fdecea" stroke="#e74c3c" stroke-width="1.5"/>
  <text x="105" y="323" class="sm" fill="#1a1a2e" text-anchor="middle">客户洞察</text>
  <line x1="255" y1="392" x2="780" y2="392" stroke="#c0392b" stroke-width="2"
        stroke-dasharray="6 5" marker-end="url(#a4)"/>
  <text x="510" y="422" class="sm" fill="#7f8c8d" text-anchor="middle">闭环：客户反馈 → 能力迭代</text>
</svg>
```

**直角连接器公式**：`M 父cx,父底 V 中继y H 子cx V 子顶`。一行一个子节点，共享父节点的中继 y。

**要点**
- **最多 3 层。** 第 4 层开始听众就断了，宁可拆页。
- 父节点用深色实心 + 白字，叶子用浅底 + 描边（`#e74c3c` 属客户侧、`#7f8c8d` 属内部侧），靠描边色区分归属。
- 叶子之间留 10px 间隙（`x=40 / 180 / 320`，宽 130）。
- 底部虚线（§5.5）把树变成闭环。

### 5.5 闭环虚线（叠加件）

任何图下面加这一条，「一次性流程」就变成「持续演进」——这是这类图最容易被忽略、但最值钱的一笔。

```html
<line x1="255" y1="392" x2="780" y2="392" stroke="#c0392b" stroke-width="2"
      stroke-dasharray="6 5" marker-end="url(#a4)"/>
<text x="510" y="422" class="sm" fill="#7f8c8d" text-anchor="middle">闭环：反馈 → 迭代 → 新价值</text>
```

虚线（`stroke-dasharray`）在 Marp 关系图里默认表示**反馈 / 依赖 / 可选路径**，实线箭头表示**流程 / 因果**。见 §6。

---

## 6. Connector 语义编码

线不是装饰。**每一条线都应该能让人不查图例就读出语义**：

| 关系 | SVG 画法 |
|---|---|
| `causes` / `drives` 因果驱动 | `stroke-width="2.5"` 实线 + 粗箭头 |
| `supports` 支撑 | `stroke-width="2"` 实线 + 细箭头 |
| `depends_on` 依赖 | `stroke-dasharray="6 5"` 虚线箭头 |
| `feedback` 反馈 | 虚线 + `marker-start` + `marker-end` 双向 |
| `maps_to` 映射 | 细实线**不带箭头**（`stroke-width="1.5"`） |
| 层级连接 | `stroke="#b9c3cc"` 浅灰直角折线，不带箭头（方向已由上下位置表达） |

**不要用颜色代替语义。** 灰度投影、色弱、单色打印都会丢掉颜色信息。颜色只用来做分类 / 强调 / 风险 / 优先级。

---

## 7. 视觉层级：importance 驱动

不要所有节点一样大——那是没有重点，等于没有咨询味。

```text
importance 1.0  →  26px 粗体 + 最深色 + 最大节点    （核心结论）
importance 0.7  →  19px 粗体 + 中间色               （一级信息）
importance 0.4  →  15px 常规 + 浅色 + 描边          （支撑细节）
```

对应 CSS 类就是 §3 的 `.t` / `.tb` / `.sm`。

**配色铁律：一色族 + 一个强调色。** 阶梯图 5 级全在灰→藏青→红这一个色相里推进，强调色（`#c0392b`）只给终点或关键节点。超过三个色相就散了，投影上一片脏。

---

## 8. Visual QA（每张图都要过）

渲染成 PNG 逐页看，不要凭 SVG 源码脑补。

```bash
marp deck.marp.md --html --images png -o p    # 输出 p.001, p.002 …
```

| 维度 | 检查项 |
|---|---|
| **几何** | 元素重叠？超出 viewBox？同级对齐？间距一致？连线穿过节点？ |
| **排版** | 文字溢出节点？字号 < 14px？文字压在图形外（箭头串的经典翻车）？标签互相压？ |
| **语义** | 有没有孤立的节点？声明了关系却没画线？读者不用图例能读懂线的关系吗？ |

**底部 footer 冲突是几何 QA 的一部分。** X 轴标题、图例、注脚贴底的图，一律加 `<!-- _class: diagram -->`。

发现任何问题 → 改 → 重新渲染 → 再看。**不要相信"代码看起来对"。**

---

## 9. 陷阱速查

| 现象 | 原因 |
|---|---|
| 整页显示 SVG 源码 | 渲染命令漏了 `--html` |
| 图形完全消失 | SVG 内部有空行，HTML 块被切断 |
| 一页裂成两页 | SVG 内部写了 `---` |
| 白字看不见 | 箭头画成了空心 `>` 形，文字落在镂空区（见 §5.2 反面教材） |
| 箭头串文字整体偏移 | 按整个 196 外框居中，应该按矩形部分（`x+81`）居中 |
| 多个 SVG 的箭头样式一样 | `marker id` 重复，合并成单个 HTML 时全部串到第一个 |
| SVG 文字不认 CSS 类 | 类名写在了 SVG 内部 `<style>`；应写在 deck 的 frontmatter `style:` 块里 |
| 表格只有半宽 | marp default 主题给 `table` 设了 `display: block`；见 style-bootstrap 的修正 |
| X 轴标题压住 footer | 给该页加 `<!-- _class: diagram -->` |
| 改了字号四张图没同步 | SVG 里写死了 `font-size` 属性；应只用 class |

---

## 10. 可运行样例

`examples/smart-drawing-deck.marp.md` —— 8 页，四张图（阶梯 / 箭头串 / 2×2 矩阵 / 关系树）+ 选型表 + 做法要点，每张图都配了演讲者备注（写清了画法和踩过的坑）。

```bash
marp examples/smart-drawing-deck.marp.md --html --pdf --allow-local-files
```

---

配套：`references/layout-patterns.md`（页级骨架）、`references/style-bootstrap.md`（含 svg 类与 footer 规则）、`references/slide-density.md`（图形页正文仍受 15 行约束）。
