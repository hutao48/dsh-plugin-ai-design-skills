# 更新日志

## 2.0.0 — 2026-11-10

**为 DeepSeek V4.1 Flash / DeepSeek Harness 重制两个技能**（原版为 Claude Opus 5.5 编写）。

- `landing-page-design`：全中文重写；新增使用协议（问卷 → 方案卡 → 逐区块 → 自检 → 交付）、需求默认值表、中文文案示例与禁用词、构建章（文件骨架 / CSS 令牌 / HTML 骨架）、全量可执行自检表、交付模板、Flash 执行提醒。
- `figma-designer`：全中文重写；新增前置探测与 **无 Figma MCP 降级模式**（输出 tokens/组件/页面规格文件）、Core Colors 色阶生成配方、Light 列生成规则、按钮 5×5 矩阵、Foundations 验收标准；明确 Figma Heading=Regular / 网页 Heading=Semibold。
- 保留原版全部设计规则与令牌值（字体黑白名单、Tailwind 字号、26 个文字样式、13 档间距、圆角嵌套公式、深色背景 6 色、Hero 680px、动效曲线、Tagline Reveal、Color System 全部别名）。
- 新增 `ADAPTATION.md`（适配说明）、`CHANGELOG.md`；更新 README、package.json（v2.0.0）、中英文 locale 描述。
- 插件安装方式与 provider 行为不变（rank 300、实时读取 `SKILL.md`）。

## 1.0.0 — 2026-11-08

- 首个版本：把上游两个技能打包为 DSH 本地 bundle，注册 `ai-design-skills` skill provider。
- 提供中文 README、中英文显示元数据、图标与许可证归属。
