# dsh-plugin-ai-design-skills（AI 设计技能插件 · DeepSeek 适配版）

> GitHub 仓库：<https://github.com/hutao48/dsh-plugin-ai-design-skills>
>
> 本仓库是从 [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills)（原版面向 Claude Opus 5.5 编写）**重制**的 DeepSeek 适配版本：保留原版全部设计规则与令牌，改写为中文、补充显式工作流、可执行自检、交付模板与降级模式，面向 **DeepSeek V4.1 Flash + DeepSeek Harness（DSH）**。

## 技能

| 技能 | 适用场景 |
|---|---|
| `landing-page-design` | 把落地页/营销页/产品页/官网首页需求，从需求收集、页面结构、转化文案做到可交付的 HTML/CSS/React 页面；强制应用确定的视觉系统（Tailwind 字号与 26 个命名文字样式、13 档间距、圆角嵌套公式、动效曲线、图标与内容真实感规则、强制 Tagline 逐词揭示区块）；交付前跑可执行自检。 |
| `figma-designer` | 在 Figma 中按体系搭建：两层颜色令牌（Core Colors / Color System）、spacing/radius 变量、Tailwind 字号与命名文字样式、auto layout、全状态组件（按钮 5×5 矩阵）、Foundations 令牌展示页、文件卫生；**没有 Figma MCP 时降级**输出 tokens/组件/页面规格文件。 |

## 实现方式

插件把一行 Host 插件（`ai-design-skills`）插入当前 profile 的 Cordis 组合；该插件在 Harness 的 `skills` 服务上注册 skill provider（`ctx.skills.registerProvider`），提供插件自带的两个 `SKILL.md`：

- `skills/landing-page-design/SKILL.md`
- `skills/figma-designer/SKILL.md`

每次刷新技能目录都会实时读取这两个文件，因此**修改 `SKILL.md` 立即生效，无需重新打包或重装**。技能内容为正文，`resourceBase` 指向各技能目录。

优先级 rank = `300`（Harness 的 custom 档）：项目级 `.dsh/skills`（100/200）或用户级技能副本（400/500）中若出现同名技能，会优先于本插件。

## 安装

在 DSH 中按绝对目录安装（解压后的目录亦可）：

```text
plugin_manager action=install_bundle target=<本插件目录的绝对路径>
```

本插件为本地 bundle（`private: true`），除 Node.js 内置模块外没有运行时依赖。安装后 profile 以链接（junction/symlink）方式引用该目录，因此**不要移动或删除该目录**；需要更换位置时在新位置重新安装。

## 验证

- `plugin_manager list_bundles` 能看到 `dsh-plugin-ai-design-skills`；
- `plugin_manager list_plugins` 能看到 `ai-design-skills` 行已启用；
- 技能目录中出现 `landing-page-design` 与 `figma-designer`，用 `skill` 工具加载任一技能可返回完整正文。

## 适配了什么（相对上游）

完整说明见 [ADAPTATION.md](ADAPTATION.md)，摘要：

- **中文指令**：面向中文使用场景与 DeepSeek 输出习惯；设计术语与 Tailwind 类名保留英文。
- **显式工作流**：需求问卷 → 方案卡 → 逐区块构建 → 全量自检 → 交付，禁止跳步。
- **可执行自检**：把「设计规则」转成可检查项（搜索禁用字体/任意值/渐变/禁用词、390px 检查、状态覆盖等），要求贴出自检结果表。
- **交付模板**：落地页默认交付 `index.html` / `styles.css` / `app.js`；固定回复结构。
- **降级模式**：Figma 技能在无 Figma MCP 时输出 `tokens.json`、`components.md`、`screens.md`、`foundations-preview.html`，不假装调用工具。
- **补全配方**：Core Colors 色阶生成、Light 列生成、按钮 5×5 矩阵、Foundations 验收标准。
- **修正**：明确 Figma 版 Heading 字重为 Regular、网页版为 Semibold，避免混用。

## 目录结构

```text
dsh-plugin-ai-design-skills/
├── package.json            # 包清单（v2.0.0）：dsh.bundle.patch、显示元数据、icon 导出
├── cordis.patch.yml        # Cordis 组合补丁：插入 ai-design-skills 插件行
├── index.js                # Host 插件：注册 AI 设计技能 provider
├── skills/
│   ├── landing-page-design/SKILL.md
│   └── figma-designer/SKILL.md
├── locale/
│   ├── en.json             # 英文标题/描述
│   └── zh.json             # 中文标题/描述
├── icon.svg                # 插件图标（原创矢量图）
├── README.md               # 本说明
├── ADAPTATION.md           # 上游 → DeepSeek 适配说明
├── CHANGELOG.md            # 版本记录
├── LICENSE                 # 插件自身许可证（MIT）
├── THIRD_PARTY_NOTICES.md  # 第三方内容归属
└── licenses/
    ├── plugin-LICENSE.txt
    └── ai-design-skills-LICENSE.txt
```

## 技能来源与许可证

- 插件打包代码（`index.js`、`cordis.patch.yml`、locale、图标、说明文档）：MIT。
- 技能正文：基于 [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills) 重制，上游 MIT，版权归 Elaya（2026）。完整许可文本见 `licenses/ai-design-skills-LICENSE.txt`，摘要见 `THIRD_PARTY_NOTICES.md`。

## 卸载

```text
plugin_manager action=remove_bundle target=dsh-plugin-ai-design-skills
```
