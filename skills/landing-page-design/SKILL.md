---
name: landing-page-design
description: "DSH 落地页设计技能（适配 DeepSeek V4.1 Flash / DeepSeek Harness）。把落地页、营销页、产品页、官网首页等需求，从需求收集、页面结构、转化文案做到可交付的 HTML/CSS/React 页面，并强制应用确定的视觉系统（Tailwind 字号与命名文字样式、间距/圆角令牌、动效曲线、图标与内容真实感规则）。用于新建或修改落地页、营销站、Web UI 页面/区块/组件/原型，以及转化文案与设计评审；即使用户没有提到设计、转化或设计系统，也应使用。"
---

# 落地页设计（DSH / DeepSeek V4.1 Flash 适配版）

核心定义：**落地页不是首页**。落地页只赢一个意图：

**一个 offer → 一个人群 → 一个主行动。**

工作顺序固定：**先定策略（说什么、怎么排）→ 再定视觉（只用令牌表里的值）→ 最后写成可运行页面并自检**。

> 本文件是 [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) 中 `landing-page-design` 的 DeepSeek 适配重制版：保留原版全部设计规则与令牌值，改写为中文、补充显式流程、可执行自检与交付模板。上游归属与许可见 `THIRD_PARTY_NOTICES.md`。

## 0. 交付物

用户未指定技术栈时，默认交付：

- `index.html`：页面结构（语义化标签）
- `styles.css`：CSS 变量 + 命名文字样式类 + 组件类
- `app.js`：菜单、滚动揭示、Tagline 逐词揭示
- 回复中的**方案卡**与**自检结果表**

用户指定 React / Next / Vue 时，用对应组件实现同一套令牌与结构，不得偏离本技能的视觉规则。

## 1. 使用协议（硬性规则，按顺序执行）

1. **先问卷**：只问缺失项，合并成一批（最多 6 个问题）。
2. **缺失即假设**：用户答不上来 → 用第 2 节默认值，交付时用一行「假设：…」说明。
3. **先方案卡再代码**：按第 3、4 节产出页面蓝图与文案（≤60 行）；默认直接继续实现，不要反复追问。
4. **逐区块构建**：Hero → Tagline Reveal → Problem/Solution → Benefits → How it works → Proof → FAQ → Risk reversal → Final CTA。**禁止一次性生成整页。**
5. **区块级自检**：每完成一个区块，执行第 6.3 节对应自检卡，不通过就修。
6. **交付前全量自检**：执行第 7 节全部检查，并在回复里贴「自检结果」表（PASS / 已修复 / 不适用）。
7. **禁止事项**（违反即返工）：
   - 编造真实产品的价格、数据、证言、客户 logo、人物；
   - 使用禁用字体（Inter、Roboto、Arial、Open Sans、Helvetica）或禁用图标（Material Icons/Symbols）；
   - 背景渐变、卡片单边边框、禁用词、任意（非令牌）字号/间距/圆角值。
8. 用户明确要求优先于本技能；若偏离，在交付说明中列「偏离项」。

## 2. 需求收集（合并成一批问，附默认值）

| 字段 | 要问的问题 | 缺失时默认 |
|---|---|---|
| 主行动 | 唯一主行动是什么？（试用 / 预约演示 / 购买 / 加等待名单 / 下载） | 开始免费试用 |
| Offer | 用户具体能得到什么？ | 一句话产品价值 |
| 转化定义 | 什么算转化？（点击 / 注册 / 下单） | 点击主 CTA |
| 人群 ICP | 给谁看的？在什么场景下用？ | 已有产品文档中的目标用户 |
| 痛点/异议 | 他们为什么现在不转化？Top3 异议 | 价格、信任、上手成本 |
| 流量来源 | 广告 / 搜索 / 社交 / 邮件 | 自然流量 |
| 素材 | 有没有 logo、截图、演示视频、证言、数据？ | 用标记占位符 `{{screenshot}}` 等 |
| 品牌语气 | 专业 / 轻松 / 技术向？ | 专业但不生硬 |
| 设计方向 | 极简编辑感 / 活泼 / 玻璃拟态 / 其他 | 极简编辑感 |
| 技术栈 | 静态 HTML+CSS / React / Next / 其他 | 静态 HTML+CSS |
| 语言与市场 | 中文 / 英文 / 双语？ | 跟随用户提问语言 |

只问表中缺失且影响决策的字段，**最多 6 个问题**。

## 3. 页面蓝图

### 3.1 布局选型（选一个并写理由）

| 类型 | 适用场景 |
|---|---|
| **A. 经典英雄 + 分区**（默认） | 产品用一张主视觉就能讲清，最常见 |
| **B. 长文故事** | 需要教育市场、消除怀疑 |
| **C. 极简转化页** | 高意图流量（邮件触达老用户）或短 offer（下载/等待名单） |
| **D. 对比页** | 搜索意图包含竞品（"X vs Y"、"best for"） |

### 3.2 区块清单（顺序固定；裁剪需说明）

| # | 区块 | 必须包含 | 验收标准 |
|---|---|---|---|
| 1 | **Hero** | 标题（结果+人群）、副标题、主 CTA、一个信任信号、主视觉 | 首屏只有 1 个主 CTA；标题副标题 ≤680px |
| 2 | **Tagline Reveal**（强制） | ≥2 行的大标语，逐词滚动点亮 | 独立于 Hero 的区块；见 5.10 |
| 3 | Problem → Solution | 一段痛点描述 + 对应解法 | 承接 Hero，不讲功能清单 |
| 4 | Benefits | 3~5 条，结果导向 | 每条含证据/细节 |
| 5 | How it works | 3 步 | 每步一句动作 + 一句结果 |
| 6 | Social proof | 证言/案例/数据 | 证明紧贴它支持的论点 |
| 7 | FAQ | 6~12 个问答 | 用真实异议，不用无关问题 |
| 8 | Risk reversal | 试用/随时取消/退款 | 至少 1 项 |
| 9 | Final CTA | 与 Hero 的 CTA 完全一致 | 文案、动作一致 |

FAQ 可在「高摩擦 offer」时前移到 Proof 之前。

### 3.3 方案卡输出格式（先输出，再写代码）

```text
## 页面蓝图
布局类型：A（理由：…）
区块顺序：Hero → Tagline Reveal → … → Final CTA
假设：…
## 文案
Hero 标题：…
Hero 副标题：…
主 CTA：…
信任信号：…
Benefits：1) … 2) … 3) …
How it works：1) … 2) … 3) …
FAQ：Q1… A1…（6~12 组）
## SEO
index / noindex：…；title：…；meta description：…
```

## 4. 文案

### 4.1 标题公式（选一个，最多两个短句）

- `{结果}，不用 {痛点}`
- `给 {人群} 的 {品类}`
- `{时间} 内 {结果}`

改写示例：

| 差 | 好 |
|---|---|
| 快速提升团队效率 | 把周报时间从 4 小时压到 15 分钟 |
| 智能数据分析平台 | 每天 9 点，销售数据自动出现在邮箱 |
| 一站式解决方案 | 3 步接入，当天就能出第一份报告 |

### 4.2 副标题

1~2 句：说清「是什么 + 给谁 + 怎么做到」。不要重复标题，不要空话。

### 4.3 CTA

动词 + 得到什么。**禁止**：Learn more / Submit / 了解更多 / 提交。

推荐：`开始免费试用`、`预约 15 分钟演示`、`获取检查清单`、`下载白皮书`。

### 4.4 收益条目模板

`**收益短语** — 证据或细节。`
例：**更快的迭代** — 一次生成 3 个布局版本，10 分钟完成评审。

### 4.5 具体化（必须）

用数字、时间、人群、场景替代形容词。理想形式：「把 X 从 A 降到 B，用时 C」。

### 4.6 禁用词

中文：赋能、颠覆、极致、一站式、无缝、领先的、革命性、全方位、智能化、轻松搞定。
英文：revolutionize、supercharge、cutting edge、effortless、transform your workflow、take it to the next level、harness the power、world class。

### 4.7 文案自检

- 标题是否写了结果而不是功能？
- 主 CTA 是否是动词 + 所得？
- 每条收益是否有证据/细节？
- 是否有至少一个风险逆转？
- 是否出现真实事实的编造？

## 5. 视觉系统（不可协商；只用下列值）

### 5.1 字体

**允许**：Geist、Manrope、Geist Mono、Poppins。
**禁止**：Inter、Roboto、Arial、Open Sans、Helvetica。
**禁止斜体**；**一个站只用一种字族**（Geist Mono 仅用于代码/数据/数字）；**字重上限 bold**，禁止 900/black。

```css
font-family: "Geist", "Manrope", system-ui, -apple-system, sans-serif;
/* 等宽场景 */ font-family: "Geist Mono", ui-monospace, monospace;
```

### 5.2 字号（Tailwind 默认比例；落在两档之间就向下吸附并沿用其行高）

| 类 | 字号 | 行高 | 类 | 字号 | 行高 |
|---|---|---|---|---|---|
| text-xs | 12 | 16 | text-5xl | 48 | 1 |
| text-sm | 14 | 20 | text-6xl | 60 | 1 |
| text-base | 16 | 24 | text-7xl | 72 | 1 |
| text-lg | 18 | 28 | text-8xl | 96 | 1 |
| text-xl | 20 | 28 | text-9xl | 128 | 1 |
| text-2xl | 24 | 32 | | | |
| text-3xl | 30 | 36 | | | |
| text-4xl | 36 | 40 | | | |

禁止：`text-[19px]`、`font-size: 22px`、`1.4rem` 等任意值。

### 5.3 命名文字样式（26 个，名称大小写固定）

| 样式 | 比例档 | 字号/行高 | 字重 |
|---|---|---|---|
| Heading 1 | text-6xl | 60 / 60 | Semibold |
| Heading 2 | text-5xl | 48 / 48 | Semibold |
| Heading 3 | text-4xl | 36 / 40 | Semibold |
| Heading 4 | text-3xl | 30 / 36 | Semibold |
| Heading 5 | text-2xl | 24 / 32 | Semibold |
| Heading 6 | text-xl | 20 / 28 | Semibold |
| Title 1 | text-xl | 20 / 28 | Medium |
| Title 2 | text-lg | 18 / 28 | Medium |
| Title 3 | text-base | 16 / 24 | Medium |
| Title 4 | text-sm | 14 / 20 | Medium |
| Title 5 | text-xs | 12 / 16 | Medium |
| Body 1 | text-base | 16 / 24 | Semibold |
| Body 2 | text-base | 16 / 24 | Medium |
| Body 3 | text-base | 16 / 24 | Regular |
| Body 4 | text-sm | 14 / 20 | Semibold |
| Body 5 | text-sm | 14 / 20 | Medium |
| Body 6 | text-sm | 14 / 20 | Regular |
| Button-lg | text-lg | 18 / 28 | Semibold |
| Button-md | text-base | 16 / 24 | Semibold |
| Button-sm | text-sm | 14 / 20 | Semibold |
| Button-Xsm | text-xs | 12 / 16 | Semibold |
| Caption 1 | text-sm | 14 / 20 | Medium |
| Caption 2 | text-sm | 14 / 20 | Regular |
| Caption 3 | text-xs | 12 / 16 | Semibold |
| Caption 4 | text-xs | 12 / 16 | Medium |
| Caption 5 | text-xs | 12 / 16 | Regular |

用途：Heading=页面/区块标题（Heading 1 是 Hero）；Title=卡片/列表/导航标题；Body=正文；Button=仅按钮文字；Caption=元信息、辅助文字、徽章。

代码中每套样式只定义一次为 kebab-case 类：`heading-1`、`title-2`、`body-4`、`button-md`、`caption-2`。禁止在元素上重复堆 `text-2xl font-semibold`。

### 5.4 间距（只用这 13 档）

| 令牌 | 值 | 令牌 | 值 |
|---|---|---|---|
| Spacing-0 | 0 | Spacing-500 | 40px |
| Spacing-25 | 2px | Spacing-600 | 48px |
| Spacing-50 | 4px | Spacing-700 | 64px |
| Spacing-75 | 8px | Spacing-800 | 80px |
| Spacing-100 | 12px | Spacing-900 | 96px |
| Spacing-200 | 16px | | |
| Spacing-300 | 24px | | |
| Spacing-400 | 32px | | |

主按钮：垂直 8px（Spacing-75）+ 水平 12px（Spacing-100）。

### 5.5 圆角

只用 Tailwind 圆角值（0、2、4、6、8、12、16、24、full）。

**嵌套公式**：内层与外层间隙 < 32px 时，`内圆角 = 外圆角 − 间隙`；结果必须 **> 2** 才应用，否则保持直角。

例：外层 `rounded-2xl`(16px) + 内边距 8px → 内层 `rounded-lg`(8px)；若外层 16px、间隙 12px → 内层 4px 可用（>2）；若算出 2px 或以下 → 内层不设圆角。

### 5.6 颜色与背景

- 深色背景只用：`#000000` `#181818` `#1F1F1F` `#272727` `#313131` `#131209`
- 背景一律纯色，**禁止渐变**（唯一例外是 Hero 标题文字）。
- 一个强调色，饱和度 < 80%。
- 卡片边框**要么四周都有，要么完全没有**；分隔行用 1px 的块元素，不用单边 border。

### 5.7 Hero 区

- 标题渐变色（左→右）：深色主题 `#FFFFFF → #9B9B9B`；浅色主题 `#000000 → #666666`。只用于文字。
- 标题与副标题 **max-width: 680px**。
- 在语义断点手动换行（用 `<br>` 或 `max-width` 内的自然折行），禁止把短语切断。
- 标题不加句号；两个观点用换行分隔。

### 5.8 图标

**允许**：Phosphor、Solar、Iconamoon。
**禁止**：Material Icons、Material Symbols。全线统一线宽，尺寸对齐字号比例。

### 5.9 动效

- 基础曲线：`cubic-bezier(0.22, 1, 0.36, 1)`。
- 布局/位移 500ms；颜色/透明度 300ms（不得短于 200ms）。
- **只动 `transform` 和 `opacity`**，禁止动 top/left/width/height。
- 必须支持 `prefers-reduced-motion: reduce`：移动改为纯透明度变化。
- 导航：离顶部浮起的居中胶囊条，半透明 + 背景模糊；菜单开关图标做形变过渡；移动菜单为全高面板 + 强模糊；菜单链接依次上移 24px 淡入，间隔 60ms，总时长 ≤400ms。
- 滚动揭示：进入视口时上移 32px + 淡入，600~800ms，只播一次；用 `IntersectionObserver` 或 Framer Motion `whileInView`；**禁止未节流的 scroll 监听**。

### 5.10 Tagline Reveal（强制区块）

- 独立于 Hero 的大字号标语区，放在 Hero 之后或 Benefits 之后。
- 文案 ≥2 行，用 Heading 3~Heading 1 样式；最大宽度同 Hero（680px）。
- 初始文字约为主题文字色 25%~35% 透明度；滚动进入时**逐词**从暗到亮，按阅读顺序逐词触发（不是整块翻转）。
- 用 `IntersectionObserver` 逐词监听或 rAF 节流；reduced-motion 下直接全亮、不动画。

### 5.11 交互状态与交付硬要求

每个交互元素必须具备：hover、active（`scale(0.98)` 或 `translateY(1px)`）、focus（可见焦点环）、loading（骨架屏，不用转圈）、empty（有引导）、error（内联具体提示，禁止 `alert`）。

上线必备：隐私政策与条款链接、品牌化 404、表单校验（邮箱格式/必填）、skip-to-content 链接、Cookie 同意（如适用）、favicon、`<title>`/meta description/OG 图、图片 alt、语义化标签（nav/main/section/article）、当前导航项标示、返回路径。

**移动 390px 检查**：无横向溢出、按钮文字不溢出、首屏可见主 CTA。

## 6. 构建（可执行）

### 6.1 文件骨架与令牌定义

```css
:root {
  /* spacing */
  --space-0: 0; --space-25: 2px; --space-50: 4px; --space-75: 8px;
  --space-100: 12px; --space-200: 16px; --space-300: 24px; --space-400: 32px;
  --space-500: 40px; --space-600: 48px; --space-700: 64px; --space-800: 80px; --space-900: 96px;
  /* radius */
  --radius-2: 2px; --radius-4: 4px; --radius-6: 6px; --radius-8: 8px;
  --radius-12: 12px; --radius-16: 16px; --radius-24: 24px; --radius-full: 9999px;
  /* text styles */
  --h1-size: 60px; --h1-line: 60px; --h1-weight: 600;
  --body-size: 16px; --body-line: 24px; --body-weight: 400;
  /* colors（按品牌替换；深色背景只用允许色） */
  --bg: #181818; --bg-elevated: #1F1F1F; --text: #F5F5F5; --text-muted: #9B9B9B;
  --accent: #7C9CFF;
  --motion: cubic-bezier(0.22, 1, 0.36, 1);
}
.heading-1 { font-size: var(--h1-size); line-height: var(--h1-line); font-weight: var(--h1-weight); }
.body-3   { font-size: var(--body-size); line-height: var(--body-line); font-weight: var(--body-weight); }
```

### 6.2 HTML 区块骨架

```html
<main>
  <section class="hero" aria-labelledby="hero-title">
    <h1 id="hero-title" class="heading-1 hero-title">把周报时间从 4 小时压到 15 分钟</h1>
    <p class="body-3 hero-sub">连接现有数据源，每周一自动生成可分享的报告。</p>
    <a class="btn btn-primary button-md" href="/signup">开始免费试用</a>
    <p class="caption-2">已有 1,284 个团队在用</p>
  </section>

  <section class="tagline" aria-label="核心标语">
    <p class="heading-3">
      <span class="word">少做表格</span>
      <span class="word">多做决策</span>
    </p>
  </section>
  <!-- 其余区块按 3.2 顺序实现 -->
</main>
```

### 6.3 区块自检卡（完成每个区块后执行）

| 区块 | 自检 |
|---|---|
| Hero | 只有 1 个主 CTA；标题/副标题 ≤680px；渐变仅用于标题文字；无背景渐变 |
| Tagline | ≥2 行；逐词 span；初始透明度 25~35%；reduced-motion 有兜底 |
| Benefits | 3~5 条；每条有证据/细节；无禁用词 |
| How it works | 恰好 3 步；编号清晰 |
| Proof | 证言/数据真实或为占位符；人物名完整具体 |
| FAQ | 6~12 组；覆盖价格/信任/上手三类异议 |
| Final CTA | 与 Hero 文案完全一致 |

## 7. 全量自检（交付前逐项执行，并贴结果）

| # | 检查项 | 检查方法 | 通过标准 |
|---|---|---|---|
| 1 | 禁用字体 | 搜索 `Inter\|Roboto\|Arial\|Open Sans\|Helvetica` | 0 处使用 |
| 2 | 任意字号/间距 | 搜索 `text-\[`、`rounded-\[`、`font-size:\s*\d+px`（令牌定义除外）、`text-\d+px` | 0 处 |
| 3 | 圆角嵌套 | 抽查所有嵌套卡片/按钮 | 内圆角 = 外圆角 − 间隙，且 >2 |
| 4 | 背景渐变 | 搜索 `linear-gradient`、`radial-gradient` | 仅 Hero 标题文字一处允许 |
| 5 | 单边边框 | 搜索 `border-t\|border-b\|border-l\|border-r` | 卡片类无单边边框 |
| 6 | 禁用词 | 搜索 4.6 列表 | 0 处 |
| 7 | Tagline Reveal | 查看 DOM 与 JS | ≥2 行、逐词 span、reduced-motion 兜底 |
| 8 | 标题断行 | 浏览器缩放到 390px/768px/1440px 查看标题 | 无孤字、无难看的断行 |
| 9 | 事实占位符 | 搜索 `{{` | 所有缺失事实均为占位符，无编造 |
| 10 | 状态覆盖 | 清点每个交互元素 | hover/active/focus/loading/empty/error 齐全 |
| 11 | 移动 390px | DevTools 390px 宽 | 无横向滚动、主 CTA 首屏可见 |
| 12 | 页面元信息 | 查看 `<head>` 与图片 | title/meta/OG/favicon/alt/skip link/404/隐私条款齐全 |
| 13 | 无障碍 | 键盘 Tab 走一遍 | 焦点可见，顺序合理，skip link 可用 |

格式（贴进回复）：

```text
## 自检结果
| 检查项 | 结果 | 说明 |
|---|---|---|
| 禁用字体 | PASS | 0 处 |
| … | 已修复 | 修复了 text-[19px] → text-xl |
```

## 8. 交付回复格式

```text
## 1) 假设
- （用户未提供的信息，一行一条）

## 2) 页面蓝图
- 布局类型与理由、区块顺序

## 3) 文案
- Hero / Benefits / How it works / FAQ / Final CTA

## 4) 视觉要点
- 字体、字号、间距、圆角、动效如何落到令牌

## 5) 交付文件
- index.html / styles.css / app.js（路径）

## 6) 自检结果
- 见第 7 节表格

## 7) 未完成/需确认
- 需要真实数据、素材或品牌色的地方
```

## 9. 针对 DeepSeek V4.1 Flash 的执行提醒

- **先想清楚再写码**：先输出方案卡，再逐区块实现；不要一次性生成整页。
- **不要发明值**：任何字号/间距/圆角先查第 5 节令牌表；表里没有就取最近的档。
- **不要口头宣称通过**：自检必须实际执行（读写文件、搜索、必要时截图），失败就修，修完重跑。
- **回复要短**：正文用表格与清单，避免长篇设计解释；代码放文件里。
- **不确定的事实一律占位符**：`{{price}}`、`{{customer_logo}}`、`{{testimonial}}`，并列入「未完成/需确认」。
- **严格串联步骤**：问卷 → 方案卡 → 逐区块 → 自检 → 交付；缺一步即视为未完成。

## 10. 定制（Make it yours）

第 5 节的字体、字号、间距、圆角、动效是固定值；颜色与品牌字体可按项目替换。改令牌定义处即可整体换肤，不要在页面里散落硬编码值。

## 11. 本适配版与上游的差异

- 面向 DSH + DeepSeek V4.1 Flash：全中文指令、显式步骤状态机、可执行自检表、交付模板。
- 增加：文件级交付物与代码骨架、检查方法（搜索/DevTools）、降级与占位符规则。
- 保留：原版全部设计规则与令牌值（字体白名单/黑名单、Tailwind 字号与 26 个文字样式、13 档间距、圆角嵌套公式、深色背景 6 色、Hero 680px、动效曲线、Tagline Reveal、内容真实感与禁用词）。
- 上游：elayadesign/ai-design-skills（MIT，Copyright (c) 2026 Elaya）。
