# metaphor — 叙事外壳层

> **本文件自足**：骨架决定「这些节点是什么关系」，隐喻决定「这页要讲什么故事」。两者正交：**同一副骨架换壳，不改变路由。**

## 怎么用

```
1. 先按 skeletons/INDEX.md 定骨架        ← 结构关系
2. 再问「这页要什么情绪」               ← 叙事意图
3. 查下表换外壳                          ← 只改几何形状，不改连接关系
4. 遵守「一页一个隐喻」
```

**为什么这两层要分开**：骨架层可以随需求无限扩充（加一个新 layout 只是往 [skeletons/](skeletons/) 里加一份规格），而隐喻表**永远不用动**——新骨架会自动继承全部隐喻。反过来把隐喻混进骨架文件里，扩一个骨架就会牵动一堆不相干的叙事，模块立刻失控。

## 核心原则

**一页只讲一个隐喻。不要结构叠隐喻。**

阶梯图上再加飞轮、再加金字塔，听众一个都记不住。选一个，换到位，讲透。

---

## 隐喻速查表

| 隐喻 | 核心语义 | 几何底座（骨架） | 改动量 | 关键提醒 |
|---|---|---|---|---|
| **Staircase 阶梯** | 逐级跃迁、进阶 | [linear-sequence](skeletons/linear-sequence.md) 阶梯 | 原生 | 高度用等差不用等比，等比就变柱状图了 |
| **Pyramid 金字塔** | 战略层 → 执行层收敛 | 阶梯镜像，层宽 `w_i = 220 - i*40`，顶部收成单点 | 小 | 顶层必须收成一个点，否则还是阶梯 |
| **Wave timeline 波浪时间线** | 有起伏的演进 | 阶梯 + 节点间改 `C` 贝塞尔曲线 | 小 | 起伏幅度别超过层高差，否则失去递进感 |
| **S-Curve** | 技术从试验到普及 | 三段折线 polyline + 三个阶段底色 | 中 | 三段斜率必须递增（1:2:4），否则不像 S |
| **Growth curve 增长曲线** | 增长不是线性 | 折线 + 面积填充 `opacity="0.15"` | 小 | 面积填充只用 1 个色，透明度 ≤ 0.2 |
| **Mountain 山峰** | 攻坚到高点再回落 | 三角折线 + 顶点强调 | 中 | 顶点加实心圆或加粗，回落段用虚线区分「已发生/预期」 |
| **Bridge / Gap jump 跨越鸿沟** | 现状与目标之间的断裂 | 水平带 + 中间缺口 + 跃起曲线 | 中 | 缺口宽度本身要表达难度，别画成装饰性缺口 |
| **Funnel 漏斗** | 大量到少量、转化 | [flow-cycle](skeletons/flow-cycle.md) 漏斗 | 原生 | 层宽用平方根尺度，等差会替数据说谎 |
| **Flywheel 飞轮** | 势能自我积累 | 环形 + 弧线 `stroke-width` 逐段递增（2.5→6） | 中 | 线宽递增是「飞轮」的唯一识别特征，不能省 |
| **Cycle 循环** | PDCA、持续改进 | 环形四象限 + 环形箭头 | 原生 | 箭头方向全图统一（都顺时针或都逆时针） |
| **Iceberg 冰山** | 显性 vs 隐性成本 | 水位线矩形 + 上小下大两块 | 中 | 水位线用虚线；**水下部分面积要明显大于水上**（通常 3:1），否则失去「隐藏量大」的隐喻 |
| **Onion 洋葱** | 层层包裹 | 同心圆 / 同心圆角矩形递减 | 小 | 每层间距一致（8–12px），层数 ≤ 4 |
| **Tree / Root 根系** | 因果向下发散 | [hierarchy-tree](skeletons/hierarchy-tree.md) 上下镜像 | 原生 | 根在下、枝在上；连线无箭头 |
| **Foundation blocks 基础块** | 能力垫底 | 分层堆叠矩形，底部最宽，向上递减 | 小 | 底层最宽 = 地基，与金字塔方向相反，别搞混 |
| **Convergence 汇聚** | 多流合一 | 多条 `Q` 贝塞尔 path 汇到一点 | 中 | 汇聚点用实心圆强调；控制点在垂直平分线上 |
| **Divergence 发散** | 一分为多 | 多条 `Q` path 从一点散开 | 中 | 同上；一页里汇聚和发散可以各出现一次，但不要超过 2 组 |
| **Focus / Spotlight 聚焦** | 资源集中一点 | 椭圆高亮 + 向内放射细线 | 中 | 高亮椭圆用半透明填充 + 描边，不要用不透明色块 |
| **Railway 轨道** | 不可逆的既定方向 | 双平行线 + 枕木短线 + 里程碑节点 | 中 | 双线间距固定 12–16px；里程碑节点压在轨道上 |
| **Winding roadmap 蜿蜒路线** | 有曲折的推进路径 | 主轴 + 上下交错的事件点 + 转折处加弧 | 中 | 转折点要标原因（虚线 + 注释），否则读者以为只是画歪了 |
| **Story mountain 故事山** | 冲突—高潮—解决 | 分段折线（爬升 / 高原 / 下降） | 中 | 中段高原要有内容（通常是最高潮的冲突），空着就散 |

---

## 改动量说明

| 改动量 | 含义 |
|---|---|
| **原生** | 该隐喻就是这副骨架本身，不用改 |
| **小** | 改 1–2 个几何参数（宽度公式 / 形状 / 颜色） |
| **中** | 换一类图元（线→曲线、矩形→菱形）或重排一部分坐标 |

超过「中」就该重新考虑骨架选错了——隐喻是给骨架穿衣服，不是给它做器官移植。

## 选隐喻的三个问题

1. **这页要让听众产生什么感觉？** 有压力 → 冰山 / 山峰；有希望 → 阶梯 / 飞轮；看清楚全貌 → 便当格 / 洋葱
2. **数据本身适合这个形状吗？** 冰山要求你能拆出「水上/水下」两类成本；金字塔要求各层有明确的收敛关系。数据不支持就换隐喻，别硬套
3. **听众以前见过吗？** 阶梯和飞轮是通用语汇，读者秒懂；S-Curve 和战略屋需要一点铺垫。图例是给陌生隐喻用的

## 反面做法

- ❌ 阶梯图上再叠一个闭环虚线 + 一个金字塔顶 → 三个隐喻，没有一个讲得清
- ❌ 漏斗每一层宽度随手画 → 视觉在说谎（见 [flow-cycle](skeletons/flow-cycle.md) 漏斗硬规则）
- ❌ 冰山的水下部分比水上还小 → 隐喻反了，变成「大部分是显性的」
- ❌ 为了「有设计感」给每张图换一个隐喻 → 全篇没有视觉一致性

## 配色

隐喻不决定配色。**默认用 deck 自己的调色板**（[../style-bootstrap.md](../style-bootstrap.md)），保证图和正文属于同一份 deck。8 个备选风格见 [styles/INDEX.md](styles/INDEX.md)。

---

# 隐喻模板

> 下面 6 个是最常用的换壳实例，可以直接抄改。坐标参数在上面的速查表里。

## 1. Pyramid 金字塔

阶梯镜像，层宽递减，顶部最窄。`w_i = 220 - i*40`，层高 `56`，`y_i = 60 + i*74`。

```html
<svg viewBox="0 0 1020 400" width="100%">
<rect x="410" y="60"  width="200" height="56" rx="4" fill="#1a1a2e"/>
<text x="510" y="96"  class="tb" fill="#ffffff" text-anchor="middle">愿景</text>
<rect x="370" y="134" width="280" height="56" rx="4" fill="#2c3e50"/>
<text x="510" y="170" class="tb" fill="#ffffff" text-anchor="middle">战略</text>
<rect x="330" y="208" width="360" height="56" rx="4" fill="#5d7d95"/>
<text x="510" y="244" class="tb" fill="#ffffff" text-anchor="middle">举措</text>
<rect x="290" y="282" width="440" height="56" rx="4" fill="#95a5a6"/>
<text x="510" y="318" class="tb" fill="#ffffff" text-anchor="middle">执行动作</text>
<text x="510" y="374" class="lbl" text-anchor="middle">自上而下拆解，越往下越具体</text>
</svg>
```

**别和 Foundation blocks 搞混**：金字塔**顶层最窄**（收敛到一点），基础块**底层最宽**（地基承重）。方向相反。

## 2. Flywheel 飞轮

环形，**弧线 `stroke-width` 逐段递增**（2.5 → 4 → 5.5 → 7）——线宽递增是「势能自我积累」的唯一识别特征，不能省。

**几何要点**：
- 圆心 `(510, 250)`，弧半径 `R = 170`，节点半径 `40`，节点中心**也在半径 170 上**
- 弧段两端**切于节点圆**，不穿过圆心。切点角偏移 `asin(40/170) ≈ 13.6°`
- **四段弧要用四个独立的 marker**，尺寸随线宽递增（13 → 15 → 17 → 19），视觉上箭头和线一起变重

**⚠️ `markerUnits` 必须显式写 `"userSpaceOnUse"`。** 它默认是 `"strokeWidth"`——marker 会按线的粗细整体缩放。`stroke-width="7"` 那段箭头会被放大 7 倍，变成一个比节点圆还大的红色三角，把整张图压垮。这个坑很隐蔽：线越粗箭头越大，看起来「像是故意的」，其实完全失控。

```html
<svg viewBox="0 0 1020 500" width="100%">
<defs>
<marker id="a1" markerUnits="userSpaceOnUse" markerWidth="13" markerHeight="10" refX="12" refY="5" orient="auto"><path d="M0,0 L13,5 L0,10 z" fill="#c0392b"/></marker>
<marker id="a2" markerUnits="userSpaceOnUse" markerWidth="15" markerHeight="11" refX="14" refY="5.5" orient="auto"><path d="M0,0 L15,5.5 L0,11 z" fill="#c0392b"/></marker>
<marker id="a3" markerUnits="userSpaceOnUse" markerWidth="17" markerHeight="12" refX="16" refY="6" orient="auto"><path d="M0,0 L17,6 L0,12 z" fill="#c0392b"/></marker>
<marker id="a4" markerUnits="userSpaceOnUse" markerWidth="19" markerHeight="14" refX="18" refY="7" orient="auto"><path d="M0,0 L19,7 L0,14 z" fill="#c0392b"/></marker>
</defs>
<path d="M598.6,395.1 A170,170 0 0 1 421.2,394.9" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1)"/>
<path d="M365.1,338.8 A170,170 0 0 1 360.6,168.9" fill="none" stroke="#c0392b" stroke-width="4" marker-end="url(#a2)"/>
<path d="M421.4,104.9 A170,170 0 0 1 591.1,100.6" fill="none" stroke="#c0392b" stroke-width="5.5" marker-end="url(#a3)"/>
<path d="M654.9,161.2 A170,170 0 0 1 659.4,331.1" fill="none" stroke="#c0392b" stroke-width="7" marker-end="url(#a4)"/>
<circle cx="630" cy="130" r="40" fill="#2c3e50"/><text x="630" y="137" class="sm" fill="#ffffff" text-anchor="middle">用户</text>
<circle cx="630" cy="370" r="40" fill="#34495e"/><text x="630" y="377" class="sm" fill="#ffffff" text-anchor="middle">价值</text>
<circle cx="390" cy="370" r="40" fill="#5d7d95"/><text x="390" y="377" class="sm" fill="#ffffff" text-anchor="middle">规模</text>
<circle cx="390" cy="130" r="40" fill="#95a5a6"/><text x="390" y="137" class="sm" fill="#ffffff" text-anchor="middle">效率</text>
<text x="510" y="258" class="t" fill="#1a1a2e" text-anchor="middle">飞轮</text>
<text x="510" y="470" class="lbl" text-anchor="middle">线宽与箭头同步递增 = 势能自我积累；弧段切于节点圆</text>
</svg>
```

## 3. Iceberg 冰山

**几何要点**：
- 水上部分用**等腰三角形**（两侧斜率相同，`斜率 = 半宽 / 水上高`），否则左右不对称
- 水下部分用 **5 边以上的多边形**，不是简单的梯形或倒三角。真实冰山在水下是先外扩再收尖，梯形看不出来
- **水下面积要明显大于水上（通常 3–5 倍）**，否则隐喻反了——变成「大部分是显性的」

```html
<svg viewBox="0 0 1020 510" width="100%">
<text x="510" y="34" class="sm" fill="#7f8c8d" text-anchor="middle">显性成本只占冰山一角</text>
<path d="M330,180 L510,60 L690,180 Z" fill="#B5DEDE"/>
<text x="510" y="150" class="sm" fill="#1a1a2e" text-anchor="middle">显性：预算 / 人力 / 迁移</text>
<rect x="20" y="179" width="980" height="2" fill="#2563EB"/>
<path d="M330,180 L690,180 L770,290 L620,450 L400,450 L250,290 Z" fill="#1E3A5F"/>
<text x="510" y="235" class="sm" fill="#93C5FD">隐性：组织惯性 / 切换成本 / 学习曲线</text>
<text x="510" y="285" class="sm" fill="#93C5FD">数据一致性风险 / 长期运维债</text>
<text x="510" y="410" class="tb" fill="#FFFFFF" text-anchor="middle">水下体积约为水上的 5 倍</text>
</svg>
```

**六边形的读法**：`330,180 → 690,180`（水面宽）→ `770,290`（水下外扩）→ `620,450`（收尖）→ `400,450`（底）→ `250,290`（外扩）→ 闭合。外扩再收尖的两段折线是冰山的识别特征，直接用倒三角会看成一座山。

## 4. Onion 洋葱

**用椭圆，不用圆角矩形。** 洋葱是圆的——圆角矩形会读成「套娃盒子」，不是洋葱。同心椭圆从外到内等距递减，层数 ≤ 4。

- 外层 `rx=250 ry=170`，中层 `rx=205 ry=135`，内层 `rx=152 ry=98`，核心 `r=64`
- 每一层的 `ry` 按固定比例递减（0.79 / 0.73），保持视觉同心
- 中心圆用**实色**（本 deck 用 `#c0392b`），和外层描边形成对比

```html
<svg viewBox="0 0 1020 460" width="100%">
<ellipse cx="510" cy="230" rx="250" ry="170" fill="#eef1f4" stroke="#9CA3AF" stroke-width="1.5"/>
<ellipse cx="510" cy="230" rx="205" ry="135" fill="#CDDDD8" stroke="#7f8c8d" stroke-width="1.5"/>
<ellipse cx="510" cy="230" rx="152" ry="98" fill="#5d7d95" stroke="#4a6fa5" stroke-width="1.5"/>
<circle cx="510" cy="230" r="64" fill="#c0392b"/>
<text x="510" y="222" class="tb" fill="#ffffff" text-anchor="middle">核心价值</text>
<text x="510" y="252" class="sm" fill="#ffd9d4" text-anchor="middle">动机</text>
<text x="510" y="122" class="sm" fill="#1a1a2e" text-anchor="middle">手段</text>
<text x="510" y="88"  class="sm" fill="#1a1a2e" text-anchor="middle">外层语境</text>
<text x="510" y="436" class="lbl" text-anchor="middle">越往内越核心</text>
</svg>
```

## 5. Focus / Spotlight 聚焦

半透明椭圆高亮 + 向内放射细线。**不透明色块会挡住内容**，用 `fill-opacity="0.10"`。

```html
<svg viewBox="0 0 1020 400" width="100%">
<ellipse cx="330" cy="200" rx="220" ry="120" fill="#c0392b" fill-opacity="0.10" stroke="#c0392b" stroke-width="2"/>
<circle cx="330" cy="200" r="46" fill="#c0392b"/>
<text x="330" y="208" class="t" fill="#ffffff" text-anchor="middle">核心</text>
<line x1="450" y1="180" x2="700" y2="120" stroke="#dcdcdc" stroke-width="1.5"/>
<line x1="450" y1="200" x2="700" y2="200" stroke="#dcdcdc" stroke-width="1.5"/>
<line x1="450" y1="220" x2="700" y2="280" stroke="#dcdcdc" stroke-width="1.5"/>
<circle cx="730" cy="115" r="30" fill="#eef1f4"/><text x="730" y="122" class="sm" fill="#1a1a2e" text-anchor="middle">资源 A</text>
<circle cx="730" cy="200" r="30" fill="#eef1f4"/><text x="730" y="207" class="sm" fill="#1a1a2e" text-anchor="middle">资源 B</text>
<circle cx="730" cy="285" r="30" fill="#eef1f4"/><text x="730" y="292" class="sm" fill="#1a1a2e" text-anchor="middle">资源 C</text>
</svg>
```

## 6. Convergence / Divergence 汇聚与发散

控制点放在两端连线的**垂直平分线上**，曲度才对称。

```html
<svg viewBox="0 0 1020 380" width="100%">
<defs>
<marker id="a1" markerWidth="10" markerHeight="8" refX="9" refY="4" orient="auto"><path d="M0,0 L10,4 L0,8 z" fill="#c0392b"/></marker>
</defs>
<path d="M150,80 Q340,80 500,190" fill="none" stroke="#95a5a6" stroke-width="2.5" marker-end="url(#a1)"/>
<path d="M150,190 Q340,190 500,190" fill="none" stroke="#5d7d95" stroke-width="2.5" marker-end="url(#a1)"/>
<path d="M150,300 Q340,300 500,190" fill="none" stroke="#2c3e50" stroke-width="2.5" marker-end="url(#a1)"/>
<circle cx="500" cy="190" r="44" fill="#c0392b"/>
<text x="500" y="197" class="t" fill="#ffffff" text-anchor="middle">汇聚</text>
<path d="M544,190 Q640,90 850,90" fill="none" stroke="#c0392b" stroke-width="2.5" marker-end="url(#a1)"/>
<path d="M544,190 Q640,190 850,190" fill="none" stroke="#e74c3c" stroke-width="2.5" marker-end="url(#a1)"/>
<path d="M544,190 Q640,290 850,290" fill="none" stroke="#a93226" stroke-width="2.5" marker-end="url(#a1)"/>
<circle cx="880" cy="90"  r="28" fill="#eef1f4"/><text x="880" y="97" class="sm" fill="#1a1a2e" text-anchor="middle">A</text>
<circle cx="880" cy="190" r="28" fill="#eef1f4"/><text x="880" y="197" class="sm" fill="#1a1a2e" text-anchor="middle">B</text>
<circle cx="880" cy="290" r="28" fill="#eef1f4"/><text x="880" y="297" class="sm" fill="#1a1a2e" text-anchor="middle">C</text>
<circle cx="110" cy="80"  r="26" fill="#eef1f4"/><text x="110" y="87" class="sm" fill="#1a1a2e" text-anchor="middle">x1</text>
<circle cx="110" cy="190" r="26" fill="#eef1f4"/><text x="110" y="197" class="sm" fill="#1a1a2e" text-anchor="middle">x2</text>
<circle cx="110" cy="300" r="26" fill="#eef1f4"/><text x="110" y="307" class="sm" fill="#1a1a2e" text-anchor="middle">x3</text>
</svg>
```

<!--
  svg-lint-ignore: duplicate-id
  本文件是模板库：各模板故意复用 a1 这类占位 id，
  实际放进 deck 时由 scripts/build-diagram-deck.mjs 按图序自动重编号。
-->
