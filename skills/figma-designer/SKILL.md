---
name: figma-designer
description: "DSH Figma 设计技能（适配 DeepSeek V4.1 Flash / DeepSeek Harness）。在 Figma 中按固定设计体系搭建页面与组件：两层颜色令牌（Core Colors / Color System）、spacing 与 radius 变量、Tailwind 字号与命名文字样式、auto layout、全状态组件与 Foundations 令牌展示页；没有 Figma MCP 时降级输出可直接落地的 tokens/组件/页面规格。用于创建、修改或评审 Figma 页面、落地页、组件、Design System、令牌与 mockup，或用户说在 Figma 里设计、做按钮组件、照这个 figma.com 链接做时使用。"
---

# Figma Designer（DSH / DeepSeek V4.1 Flash 适配版）

这是一套「设计执行规则」，叠加在 Figma 官方技能之上：官方技能负责 Plugin API 细节，本文件负责设计体系与交付标准。

## 0. 前置条件与交付物

**前置检查（每次开始前必做一次）**

1. 当前环境是否有 Figma MCP 工具（`use_figma`、`figma.resolve`、`figma.listAvailableFontsAsync` 等）？
   - **有** → 走主流程（第 2~15 节）。
   - **没有** → 立即走**降级模式**（第 16 节）：输出 tokens/组件/页面规格文件，不要假装调用 Figma。
2. 是否有官方 Figma 技能（`figma-use`、`figma-generate-design`、`figma-generate-library`）？
   - 有 → 调用 `use_figma` 前先加载 `figma-use`。
   - 没有 → 按本文件第 14 节的 API 约定执行，并把缺失的 API 细节列入「需确认」。

**交付物**

- Figma 文件内：`Foundations` / `Components` / `Screens` 三个页面，变量、文字样式、组件与页面。
- 回复中：构建清单、令牌使用摘要、自检结果、未完成项。

## 1. 使用协议（硬性规则，按顺序执行）

1. **先检查文件**：列出本地变量集合与文字样式，搜索库中的变量/样式/组件；能复用就复用。
2. **缺基础先建 Foundations**：spacing、radius 变量 → 两层颜色（Core Colors、Color System 含 Light/Dark 模式）→ 文字样式 → Foundations 展示页（见第 3 节）。
3. **逐区块构建**：先 Hero，再每段一个区块；每段截图检查后再继续。禁止一次画完整页。
4. **处处 auto layout**：所有有子元素的 frame 使用 auto layout；padding/gap 绑定 spacing 变量，禁止手输数字。
5. **绑定不手打**：fill/stroke/radius/padding/gap 绑定变量；文字层全部使用命名文字样式；设计只绑 `Color System`，不直接绑 `Core Colors`。
6. **自检**：执行第 14 节清单，全部通过或修复后再汇报；失败项不能口头放过。
7. 用户明确要求 > 本技能规则；偏离时在汇报中列「偏离项」。

## 2. 前置检查（具体动作）

- 列出文件内所有 collection：`spacing`、`radius`、`Core Colors`、`Color System` 是否齐全。
- 列出本地 text styles，是否已有 Heading/Title/Body/Button/Caption 分组。
- 搜索设计系统库：与现有变量/组件重名的，优先复用；不要重复创建。
- 记录当前 frame 尺寸与容器（桌面 1440 / 内容 1200~1280；响应式补 768、390）。

## 3. Foundations 构建（顺序固定）

### 3.1 变量

- `spacing` collection：FLOAT，1 模式，scope=GAP，13 个令牌（见第 17 节）。
- `radius` collection：FLOAT，1 模式，scope=CORNER_RADIUS，9 个令牌。
- `Core Colors` collection：1 模式，原始色阶（见 7.2 生成配方）。
- `Color System` collection：2 模式（Light/Dark），全部为 Core Colors 的**别名**，按角色命名（Border/Surface/Action/Text/Icon/Overlay）。

### 3.2 文字样式

按第 4.2 节创建 26 个命名样式，用 `Heading / Heading 1`、`Body / Body 4`、`Button / Button-md` 这类文件夹分组，名称大小写固定。

### 3.3 Foundations 展示页（必须存在且可自动更新）

- 在 `Foundations` 页面放一个 `Foundations` frame，每个 collection 一个 auto layout 区块：
  - `Core Colors`：每个 palette 一行，每个 shade 一个色块；
  - `Color System`：每行一个 group，Light/Dark 两列并排（列上显式设置变量模式）；
  - `spacing`：每个令牌一根与数值等宽的条；
  - `radius`：每个令牌一个带对应圆角的方块；
  - 文字样式：每种样式一行示例。
- **所有样例绑定到变量/样式**（改令牌时自动更新）；标签写令牌名；Color System 标签写别名（`Surface/Primary → Grayscale/870`）。
- 文字标签不会自动跟着变量值变，改令牌/改名后要重新同步标签。

## 4. 排版

### 4.1 字体

- 任意字体均可；必须先用 `figma.listAvailableFontsAsync()` 确认可用，再加载。
- 一个文件一种字族（用户要求配对时除外）；Geist Mono 只用于代码/数据/数字。
- 禁止斜体；字重不超过 bold（禁止 900/black）。
- 字号只用 Tailwind 比例：12、14、16、18、20、24、30、36、48、60、72、96、128；落在两档之间向下吸附并沿用其行高。

### 4.2 文字样式（名称固定；Figma 版 Heading 字重为 Regular）

| 文件夹 / 样式 | 比例档 | 字号/行高 | 字重 |
|---|---|---|---|
| Heading / Heading 1 | text-6xl | 60 / 60 | Regular |
| Heading / Heading 2 | text-5xl | 48 / 48 | Regular |
| Heading / Heading 3 | text-4xl | 36 / 40 | Regular |
| Heading / Heading 4 | text-3xl | 30 / 36 | Regular |
| Heading / Heading 5 | text-2xl | 24 / 32 | Regular |
| Heading / Heading 6 | text-xl | 20 / 28 | Regular |
| Title / Title 1 | text-xl | 20 / 28 | Medium |
| Title / Title 2 | text-lg | 18 / 28 | Medium |
| Title / Title 3 | text-base | 16 / 24 | Medium |
| Title / Title 4 | text-sm | 14 / 20 | Medium |
| Title / Title 5 | text-xs | 12 / 16 | Medium |
| Body / Body 1 | text-base | 16 / 24 | Semibold |
| Body / Body 2 | text-base | 16 / 24 | Medium |
| Body / Body 3 | text-base | 16 / 24 | Regular |
| Body / Body 4 | text-sm | 14 / 20 | Semibold |
| Body / Body 5 | text-sm | 14 / 20 | Medium |
| Body / Body 6 | text-sm | 14 / 20 | Regular |
| Button / Button-lg | text-lg | 18 / 28 | Semibold |
| Button / Button-md | text-base | 16 / 24 | Semibold |
| Button / Button-sm | text-sm | 14 / 20 | Semibold |
| Button / Button-Xsm | text-xs | 12 / 16 | Semibold |
| Caption / Caption 1 | text-sm | 14 / 20 | Medium |
| Caption / Caption 2 | text-sm | 14 / 20 | Regular |
| Caption / Caption 3 | text-xs | 12 / 16 | Semibold |
| Caption / Caption 4 | text-xs | 12 / 16 | Medium |
| Caption / Caption 5 | text-xs | 12 / 16 | Regular |

> 与网页版 `landing-page-design` 的差异：Figma 版 Heading 用 Regular，网页版 Heading 用 Semibold。各自按本文与网页版执行，不要混用。

### 4.3 排版规则

- 每个文字层必须使用上面某个命名样式；禁止裸设字号/字重。
- 复制规则：正文与标签内不用连字符；标题不出现孤字（手动断行，不缩窄 frame）；Hero 标题不加句号，两个观点用换行分隔。
- 新样式只能按组内递增编号（如 Body 7），值必须来自比例档。

## 5. 间距

- 只用 `spacing/*` 变量：0、2、4、8、12、16、24、32、40、48、64、80、96。
- `paddingTop/Right/Bottom/Left` 与 `itemSpacing` 必须用 `setBoundVariable` 绑定，禁止输入数字。
- 设计值落在两个令牌之间时，吸附到最近的令牌并绑定。
- 主按钮：垂直 8（spacing/75）、水平 12（spacing/100）。

## 6. 圆角

- 只用 `radius/*` 变量：0、2、4、6、8、12、16、24、full，scope=CORNER_RADIUS，逐角绑定。
- **嵌套规则**：内层与外层间隙 < 32 时，`内圆角 = 外圆角 − 间隙`；结果必须 > 2 才应用。
- 例：卡片 16、内边距 8 → 内层 8；计算结果 ≤2 → 内层不设圆角。

## 7. 颜色（两层结构，文件名固定）

### 7.1 设计绑定规则

- 设计稿只绑定 `Color System` 令牌；Core Colors 仅作为底层原始色。
- 变量 scope 按用途限制：`FRAME_FILL`/`SHAPE_FILL`（表面）、`TEXT_FILL`（文字）、`STROKE_COLOR`（边框）；禁止 `ALL_SCOPES`。
- 令牌按角色命名，不按颜色命名（不要 `Surface/Blue 500`）。

### 7.2 Core Colors 生成配方（可执行）

品牌主色即 `Primary/500`；其余色调按 Hue 不变、Sat/略调、Lightness（L）目标生成：

| Shade | L 目标 | 用途提示 |
|---|---|---|
| 00 | 99% | 近白底/反色文字 |
| 50 | 96% | 浅色背景 |
| 100 | 92% | subtle 背景 |
| 150 | 88% | subtle hover |
| 200 | 84% | 浅色边框/次级文字 |
| 300 | 76% | 浅色强调 |
| 350 | 72% | 次级强调 |
| 400 | 66% | 强调/边框 |
| 450 | 60% | 强调 hover |
| 500 | 品牌基色 | 主色 |
| 600 | 42% | hover/按压 |
| 700 | 34% | 深色强调 |
| 800 | 27% | 深色边 |
| 850 | 23% | 深色表面 |
| 900 | 19% | 更深表面 |
| 950 | 15% | 近黑表面 |
| 1000 | 8% | 近黑 |

- Grayscale 用相同 L 目标、S=0；并固定这几个值以匹配深色背景：`1000=#000000`、`870=#181818`、`850=#1F1F1F`、`800=#272727`、`750=#313131`。
- 每个 palette 至少 10 档，需含 00 与 1000；`Grayscale-Alpha` 存 700-16/24/40/64/80（透明度存在变量自身 opacity 字段，别名不能加透明度）。
- `Red`=错误、`Green`=成功、`Yellow`=警告；`Primary/Secondary/Accent` 为品牌三色。

### 7.3 Color System（Dark 映射参考；Light 列按 7.4 生成）

**Border**

| 令牌 | Dark 别名 |
|---|---|
| Border/Primary | Grayscale/750 |
| Border/Primary-Disabled | Grayscale/800 |
| Border/Primary-light | Grayscale/700 |
| Border/Secondary | Grayscale/750 |
| Border/Tertiary | Grayscale/600 |
| Border/Action-Primary | Primary/400 |
| Border/Action-Disabled | Primary/600 |
| Border/Action-Secondary | Grayscale/500 |
| Border/Error | Red/400 |
| Border/Error-disabled | Red/700 |
| Border/Success | Green/400 |
| Border/Warning | Yellow/300 |
| Border/Warning-Disabled | Yellow/700 |

**Surface**

| 令牌 | Dark 别名 |
|---|---|
| Surface/Primary | Grayscale/870 |
| Surface/Primary-Hover | Grayscale/800 |
| Surface/Primary-Selected | Grayscale/700 |
| Surface/Primary-subtle | Grayscale/850 |
| Surface/Secondary | Grayscale/800 |
| Surface/Secondary-Hover | Grayscale/700 |
| Surface/Secondary-Selected | Grayscale/700 |
| Surface/Secondary-Subtle | Grayscale/750 |
| Surface/Tertiary | Grayscale/600 |
| Surface/Tertiary-Hover | Grayscale/450 |
| Surface/Accent | Accent/500 |
| Surface/Accent-subtle | Accent/200 |
| Surface/Info | Primary/400 |
| Surface/Info-subtle | Primary/150 |
| Surface/Error | Red/500 |
| Surface/Error-subtle | Red/100 |
| Surface/Error-Darker | Red/700 |
| Surface/Inverted | Grayscale/00 |
| Surface/Inverted-Hover | Grayscale/250 |
| Surface/Inverted-Disabled | Grayscale/450 |
| Surface/Warning | Yellow/500 |
| Surface/Warning-subtle | Yellow/100 |
| Surface/Warning-Hover | Yellow/700 |
| Surface/Success | Green/500 |
| Surface/Success-Subtle | Green/100 |

**Action**（按钮/控件填充）

| 令牌 | Dark 别名 |
|---|---|
| Action/Primary | Primary/500 |
| Action/Primary-Hover | Primary/700 |
| Action/Primary-Click | Primary/600 |
| Action/Primary-Disabled | Primary/700 |
| Action/Secondary | Grayscale/600 |
| Action/Secondary-Hover | Grayscale/750 |
| Action/Secondary-Click | Grayscale/700 |
| Action/Error | Red/700 |
| Action/Error-Hover | Red/800 |
| Action/Error-Disabled | Red/800 |
| Action/Error-Subtle | Red/150 |
| Action/Warning | Yellow/500 |
| Action/Warning-Hover | Yellow/700 |
| Action/Warning-Disabled | Yellow/800 |
| Action/Warning-Subtle | Yellow/100 |

**Text**

| 令牌 | Dark 别名 |
|---|---|
| Text/Primary | Grayscale/50 |
| Text/Primary-Disabled | Grayscale/750 |
| Text/Primary-Subtle | Grayscale/500 |
| Text/Secondary | Grayscale/200 |
| Text/Secondary-Disabled | Grayscale/500 |
| Text/Tertiary | Grayscale/400 |
| Text/Inverted | Grayscale/850 |
| Text/Error | Red/500 |
| Text/Error-Disabled | Red/800 |
| Text/Error-Inverted | Red/800 |
| Text/Error-Inverted-Disabled | Red/200 |
| Text/Success | Green/600 |
| Text/Success-Inverted | Green/700 |
| Text/Success-Inverted-Disabled | Green/300 |
| Text/Info | Primary/350 |
| Text/Info-Inverted | Primary/700 |
| Text/Info-Inverted-Disabled | Primary/200 |
| Text/Warning | Yellow/500 |
| Text/Warning-Disabled | Yellow/800 |
| Text/Warning-Inverted | Yellow/800 |
| Text/Warning-Inverted-Disabled | Yellow/300 |

**Icon**

| 令牌 | Dark 别名 |
|---|---|
| Icon/Default | Grayscale/50 |
| Icon/Secondary | Grayscale/200 |
| Icon/Subtle | Grayscale/500 |
| Icon/Inverted | Grayscale/850 |
| Icon/Disabled | Grayscale/750 |
| Icon/Error | Red/500 |
| Icon/Error-Disabled | Red/800 |
| Icon/Error-Inverted-Disabled | Red/200 |
| Icon/Info | Primary/350 |
| Icon/Info-Disabled | Primary/200 |
| Icon/Warning | Yellow/500 |
| Icon/Warning-Inverted | Yellow/700 |
| Icon/Warning-Disabled | Yellow/800 |
| Icon/Warning-Inverted-Disabled | Yellow/300 |
| Icon/Success | Green/400 |
| Icon/Success-Inverted-Disabled | Green/300 |

**Overlay**

| 令牌 | 值 |
|---|---|
| Overlay/xs | Grayscale-Alpha/700-16 |
| Overlay/sm | Grayscale-Alpha/700-24 |
| Overlay/md | Grayscale-Alpha/700-40 |
| Overlay/lg | Grayscale-Alpha/700-64 |
| Overlay/xlg | Grayscale-Alpha/700-80 |

### 7.4 Light 列生成规则（可执行）

对每个 Dark 别名，取镜像色阶：`Light = Grayscale/(1000 − N)`，取最近的已定义档位，然后核对对比度：

| Dark | Light（初始） |
|---|---|
| Grayscale/50 | Grayscale/950 |
| Grayscale/870 | Grayscale/150（130 取最近档） |
| Grayscale/850 | Grayscale/150 |
| Grayscale/800 | Grayscale/200 |
| Grayscale/750 | Grayscale/250 |
| Grayscale/700 | Grayscale/300 |
| Grayscale/600 | Grayscale/400 |
| Grayscale/500 | Grayscale/450 |
| Red/700 | Red/300 |
| Primary/500 | Primary/600 |

然后用第 7.5 节对比度规则逐对校验；不满足就换相邻档，直到通过。浅色主题的背景类令牌取 Grayscale/00~100，文字取 Grayscale/800~1000。

### 7.5 表面、对比度与渐变

- 深色背景只用：`#000000`、`#181818`、`#1F1F1F`、`#272727`、`#313131`、`#131209`；背景一律纯色，禁止渐变（按钮、遮罩也不行）。
- 唯一渐变例外：Hero 标题文字左→右，深色 `#FFFFFF → #9B9B9B`，浅色 `#000000 → #666666`；渐变两端也要绑定颜色变量。
- 一个强调色，饱和度 < 80%。
- 对比度：正文 ≥ 4.5:1；大字（≥24 或 ≥18 粗）与 UI 部件（图标、输入边框、焦点环）≥ 3:1；渐变标题按最亮端校验。
- 不能只靠颜色表达状态：同时用图标/文字/字重。
- 触控目标 ≥ 44×44（移动 frame）。
- 边框四周全有或全无；分隔行用 1px rectangle 填 `Border/*`，不用单边 stroke。

## 8. 布局

- Hero 标题与副标题最大宽度 680；Hero 标题不加句号。
- 默认不加 eyebrow 小标签（用户要求或灵感图里有才加）。
- 桌面 frame 1440 宽，居中内容容器 1200~1280；需要响应式时补 768、390 frame。
- 不要默认三列等宽卡片：优先两列 zig zag、非对称网格或 bento。
- 并排卡片的标题、价格、列表、按钮起始 Y 对齐。
- 新 frame 放在空白区域，不覆盖已有内容；不删除/移动用户图层（除非要求）。

## 9. 图标

- 只用 Phosphor、Solar、Iconamoon；禁止 Material Icons/Symbols。
- 全文件统一线宽；尺寸对齐字号比例。
- 用 `createNodeFromSvg` 导入 SVG，用绑定的 `Icon/*` 令牌改色；禁止用图元重画图标。

## 10. 组件与状态

- 复用超过一次的元素必须做成组件；组件文字暴露为 component properties。
- 交互组件必须有：Default、Hover、Pressed、Focus、Disabled；输入框额外有 Error、Filled。
- 按钮组件矩阵（每个尺寸都要齐全 = 5 类型 × 5 状态 = 25 个变体）：

| Type \ State | Default | Hover | Pressed | Focus | Disabled |
|---|---|---|---|---|---|
| Primary | Action/Primary | Action/Primary-Hover | Action/Primary-Click | Action/Primary + 焦点环 | Action/Primary-Disabled |
| Secondary | Action/Secondary | Action/Secondary-Hover | Action/Secondary-Click | + 焦点环 | Action/Secondary-Disabled |
| Tertiary | 透明底 + Border | Surface/Tertiary-Hover | Surface/Tertiary | + 焦点环 | Text/Primary-Disabled |
| Error | Action/Error | Action/Error-Hover | Action/Error | + 焦点环 | Action/Error-Disabled |
| Warning | Action/Warning | Action/Warning-Hover | Action/Warning | + 焦点环 | Action/Warning-Disabled |

填充绑 `Action/*`，描边绑 `Border/*`，文字绑 `Text/*`；Focus 必须有 2px 外描边（≥3:1），不能只换颜色。
- 数据视图必备：Loading（与真实布局同形的骨架）、Empty（有引导的起步视图）、Error（内联具体错误）。

## 11. 动效（仅原型）

- 使用 Smart Animate + 自定义贝塞尔 `0.22, 1, 0.36, 1`。
- 布局变化 500ms；颜色/透明度 300ms。
- 禁止 Figma 默认 linear / ease 预设。

## 12. 内容

- 真实草稿文案，禁止占位拉丁文与模板句。
- 人名/品牌/数字要符合行业与地区；避免整数堆砌与 "Acme" 式命名。
- 禁用词：revolutionize、supercharge、cutting edge、effortless、transform your workflow、take it to the next level、harness the power、world class。
- 标题与按钮用 sentence case（中文不加句号/不空格）。

## 13. 文件卫生

- 图层命名要有意义（`Pricing / Card / Pro`），禁止 `Frame 427`、`Group 3`、`Vector`、`Rectangle 1`。
- 变量集合固定：`spacing`、`radius`、`Core Colors`、`Color System`（后两者含 Light/Dark 模式）。
- 页面固定：`Foundations`、`Components`、`Screens`。
- 文字样式按类型放入文件夹；组件集中放在 `Components` 页。

## 14. 自检清单（汇报前逐项执行）

- [ ] 每个文字层使用命名文字样式，且在 Tailwind 比例档上。
- [ ] 每个 padding 与 gap 绑定 spacing 变量，无手输数字。
- [ ] 每个圆角绑定 radius 变量，嵌套圆角符合公式。
- [ ] 每个 fill/stroke 绑定 `Color System` 令牌（无裸色值、无 Core Colors 直绑），Light/Dark 两种模式都正常。
- [ ] 每个 palette ≥10 档；Color System 全是别名。
- [ ] `Foundations` 展示了全部令牌与文字样式，样例已绑定、标签已同步。
- [ ] 对比度：正文 4.5:1、大字/UI 3:1。
- [ ] 无背景渐变、无单边边框、无斜体。
- [ ] Hero 文字 ≤680、标题无句号、无未要求的 eyebrow。
- [ ] 交互组件状态齐全；按钮 5×5 矩阵齐全。
- [ ] 图标来自 Phosphor/Solar/Iconamoon 且线宽统一。
- [ ] 无占位文案；无 `Frame`/`Group` 这类图层名。

## 15. 汇报格式

```text
## 构建结果
- 页面/区块：…
- 变量集合：spacing（13）/ radius（9）/ Core Colors（n 个 palette）/ Color System（Light+Dark）
- 文字样式：26 个（已分组）
- 组件：…（变体数）
## 自检
- 14 节清单逐项 PASS/已修复
## 未完成/需确认
- （缺失的 API、需要用户提供的信息、无法验证的视觉项）
```

## 16. 降级模式（当前环境没有 Figma MCP 时）

不要假装操作 Figma；按以下格式输出可直接落地的规格文件：

1. `tokens.json`：spacing、radius、textStyles、colors（Core Colors 调色板 + Color System 别名 + Light/Dark 两套值）。
2. `components.md`：组件清单 + 按钮 5×5 矩阵 + 输入框状态 + 数据视图状态。
3. `screens.md`：桌面 1440（容器 1200~1280）、768、390 三个尺寸的区块结构与关键尺寸标注（宽度、间距、字号样式、颜色令牌）。
4. `foundations-preview.html`（可选）：用 CSS 变量复刻 Foundations 展示页，作为视觉校验。

降级模式下仍需执行第 14 节中可验证的项目（令牌数量、文字样式、颜色别名完整性、对比度、无渐变/无单边边框），并在汇报中说明「Figma 内渲染未验证」。

## 17. Token 参考（固定值）

### Spacing（collection `spacing`，FLOAT，scope GAP）

| 令牌 | 值 | 令牌 | 值 |
|---|---|---|---|
| spacing/0 | 0 | spacing/500 | 40 |
| spacing/25 | 2 | spacing/600 | 48 |
| spacing/50 | 4 | spacing/700 | 64 |
| spacing/75 | 8 | spacing/800 | 80 |
| spacing/100 | 12 | spacing/900 | 96 |
| spacing/200 | 16 | | |
| spacing/300 | 24 | | |
| spacing/400 | 32 | | |

### Radius（collection `radius`，FLOAT，scope CORNER_RADIUS）

| 令牌 | 值 |
|---|---|
| radius/0 | 0 |
| radius/2 | 2 |
| radius/4 | 4 |
| radius/6 | 6 |
| radius/8 | 8 |
| radius/12 | 12 |
| radius/16 | 16 |
| radius/24 | 24 |
| radius/full | 9999 |

### Core Colors（每个 palette 的档位）

| Palette | 角色 | 档位 |
|---|---|---|
| Primary | 品牌主色 | 00, 50, 100, 150, 200, 300, 350, 400, 450, 500, 600, 700, 800, 850, 900, 950, 1000 |
| Secondary | 品牌次色 | 00, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950, 1000 |
| Accent | 强调色 | 00, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950, 1000 |
| Grayscale | 中性色 | 00, 50, 100, 150, 200, 250, 300, 400, 450, 500, 600, 700, 750, 800, 850, 870, 900, 950, 1000 |
| Red | 错误 | 00, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950, 1000 |
| Green | 成功 | 00, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950, 1000 |
| Yellow | 警告 | 00, 50, 100, 150, 200, 300, 400, 500, 600, 700, 800, 850, 900, 950, 1000 |
| Grayscale-Alpha | 半透明中性色 | 700-16, 700-24, 700-40, 700-64, 700-80（Grayscale/700 的 16/24/40/64/80% 不透明度） |

### 字号比例（与网页版一致）

12、14、16、18、20、24、30、36、48、60、72、96、128（下行高：16、20、24、28、28、32、36、40、48、60、72、96、128）。

## 18. 本适配版与上游的差异

- 面向 DSH + DeepSeek V4.1 Flash：中文指令、显式步骤、可执行自检、汇报模板。
- 新增：无 Figma MCP 的降级模式与输出文件规格、Core Colors 色阶生成配方、Light 列生成规则、按钮 5×5 矩阵表、Foundations 验收标准。
- 修正：Figma 版 Heading 字重为 Regular，并在文中标注与网页版 (Semibold) 的差异，避免混用。
- 保留：两层颜色令牌结构、全部 Color System 别名、spacing/radius/文字样式固定值、组件状态、动效、文件卫生规则。
- 上游：elayadesign/ai-design-skills（MIT，Copyright (c) 2026 Elaya）。
