# 适配说明（From Claude Opus 5.5 → DeepSeek V4.1 Flash）

本仓库的两个技能正文来自 [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills)。
上游按 **Claude Opus 5.5** 的能力与习惯编写：英文、长句、依赖设计师直觉来补齐省略步骤，并且 `figma-designer` 默认绑定 Claude 生态的 Figma 官方技能（`figma-use`、`figma-generate-design`、`figma-generate-library`）。

本版本按 **DeepSeek V4.1 Flash + DeepSeek Harness (DSH)** 重制，目标不是「把英文翻成中文」，而是让模型**少靠猜、按步骤稳定交付**。

## 设计假设的差异

| 维度 | 上游（Opus 5.5 向） | 本适配版（DeepSeek V4.1 Flash 向） |
|---|---|---|
| 语言 | 英文为主 | 中文指令，技术名词/类名保留英文 |
| 隐含判断 | 依赖模型自行补齐步骤 | 把步骤、顺序、默认值写死，禁止跳步 |
| 长文本 | 段落叙述，规则藏在行文里 | 表格 + 清单 + 模板，一条规则一个可检查项 |
| 自检 | 文末 checklist，靠模型自觉 | 分区块自检 + 全量自检表，要求逐项执行并贴结果 |
| 工具依赖 | 默认有 Figma 官方技能与 MCP | 先探测环境；无 MCP 走降级模式，禁止假装调用 |
| 产出 | 描述为主 | 默认交付真实文件（落地页三件套 / Figma 规格文件） |
| 事实处理 | 提醒不要编造 | 强制占位符 `{{price}}` 并列入「需确认」 |
| 失败模式 | 未列 | 明确列「禁止事项」，违反即返工 |

## landing-page-design 的重制

- 新增第 1 节「使用协议」：问卷 → 方案卡 → 逐区块 → 自检 → 交付，串联成状态机。
- 需求收集表补默认值（缺信息即假设，不阻塞）。
- 文案章加入中文「差 → 好」改写示例、中文禁用词表、CTA 中文推荐写法。
- 视觉系统保留全部原始令牌（字体黑白名单、13 档 Tailwind 字号、26 个命名文字样式、13 档间距、嵌套圆角公式、深色背景 6 色、Hero 680px、动效曲线、Tagline Reveal）。
- 新增构建章：文件骨架、CSS 令牌定义示例、HTML 区块骨架、逐区块自检卡。
- 新增全量自检表：将规则转为可执行检查（搜索禁用字体/任意值/渐变/单边边框/禁用词/占位符，390px 检查，状态覆盖）。
- 新增交付回复模板与「未完成/需确认」清单。

## figma-designer 的重制

- 新增第 1 节「使用协议」：检查文件 → Foundations → 逐区块 → 绑定 → 自检 → 汇报。
- 新增前置探测：有 Figma MCP 走主流程；无 MCP 走第 16 节降级模式（输出 `tokens.json`、`components.md`、`screens.md`、可选的 `foundations-preview.html`）。
- 新增第 7.2 节 **Core Colors 色阶生成配方**（L 目标表），把上游「从品牌基色生成色阶」变成可执行步骤；Grayscale 深色档固定为 #000000/#181818/#1F1F1F/#272727/#313131。
- 新增第 7.4 节 **Light 列生成规则**（镜像色阶 + 对比度校验）。
- 新增第 10 节 **按钮 5 类型 × 5 状态 = 25 变体矩阵**，每格写明应绑定的 `Action/*` 令牌。
- 明确标注 Figma 版 Heading 字重为 **Regular**，网页版为 **Semibold**，避免跨技能混用。
- 保留：两层颜色令牌结构、全部 Color System 别名、spacing/radius/文字样式固定值、组件状态、动效、文件卫生、完整 Token 参考。

## 保留的不变量（未改动的设计值）

- 字体：允许 Geist / Manrope / Geist Mono / Poppins；禁止 Inter / Roboto / Arial / Open Sans / Helvetica；禁斜体、禁 ultra bold。
- 字号：Tailwind 比例 12/14/16/18/20/24/30/36/48/60/72/96/128，落档取下方。
- 间距：0/2/4/8/12/16/24/32/40/48/64/80/96；主按钮 8×12。
- 圆角：0/2/4/6/8/12/16/24/full；嵌套 `inner = outer − gap` 且 >2。
- 深色背景：`#000000` `#181818` `#1F1F1F` `#272727` `#313131` `#131209`；背景禁渐变；Hero 标题渐变 `#FFFFFF→#9B9B9B` / `#000000→#666666`。
- Hero 文字 max-width 680；Tagline Reveal 强制存在且逐词点亮。
- 动效曲线 `0.22, 1, 0.36, 1`；布局 500ms、颜色/透明度 300ms；只动 transform/opacity。
- Color System 的 Border/Surface/Action/Text/Icon/Overlay 全部别名与 Dark 映射。
- 内容真实感规则与中英文禁用词表。

## 以后怎么继续演进

1. **升级模型**：把第 1 节「使用协议」当作可替换的策略层；若未来模型更强的自主规划能力，可放宽步骤约束，但保留自检与令牌值。
2. **换语言**：如需英文版，复制两个 `SKILL.md` 并把指令层翻译为英文即可，令牌表无需改动。
3. **版本策略**：技能正文发生行为变化时递增插件 minor 版本；仅修文字/示例时递增 patch；结构性重写时递增 major（当前 2.0.0 为面向 DeepSeek 的结构性重制）。
