# dsh-plugin-ai-design-skills（AI 设计技能插件）

> GitHub 仓库：<https://github.com/hutao48/dsh-plugin-ai-design-skills>

一个 DeepSeek Harness 本地插件（bundle），向 Harness 的技能目录中加入两个设计技能：

| 技能 | 适用场景 |
|---|---|
| `landing-page-design` | 构建、修改、评审落地页、营销站、Web UI、页面区块、组件、原型，以及撰写转化文案。包含策略层（需求问卷、页面结构、转化规则）与不可协商的视觉系统（Tailwind 字号比例与命名文字样式、间距令牌、圆角公式、动效曲线、内容真实感规则、强制的大标语逐词揭示区块）。 |
| `figma-designer` | 通过 Figma MCP 在 Figma 中设计：两层颜色令牌、变量、文字样式、自动布局、全状态组件、Foundations 令牌展示页与文件卫生。 |

## 实现方式

插件把一行 Host 插件（`ai-design-skills`）插入当前 profile 的 Cordis 组合中。该插件在 Harness 的 `skills` 服务上注册一个技能 provider（`ctx.skills.registerProvider`），由它提供插件自带的两个 `SKILL.md`：

- `skills/landing-page-design/SKILL.md`
- `skills/figma-designer/SKILL.md`

每次刷新技能目录时都会实时读取这两个文件，因此**直接修改本插件里的 `SKILL.md` 即可立即生效，无需重新打包或重装**。技能内容为正文，`resourceBase` 指向各技能目录，便于相对路径引用。

优先级 rank = `300`（Harness 的 custom 档）：项目级 `.dsh/skills`（100/200）或用户级技能副本（400/500）中若出现同名技能，会优先于本插件。

## 安装

在 Harness 中按绝对目录安装本插件（解压后的目录亦可）：

```text
plugin_manager action=install_bundle target=<本插件目录的绝对路径>
```

本插件为本地 bundle（`private: true`），除 Node.js 内置模块外没有运行时依赖。安装后 profile 会以链接（junction/symlink）方式引用该目录，因此**不要移动或删除该目录**；需要更换位置时，在新位置重新安装即可。

## 验证

- `plugin_manager list_bundles` 能看到 `dsh-plugin-ai-design-skills`；
- `plugin_manager list_plugins` 能看到 `ai-design-skills` 行已启用；
- 技能目录中出现 `landing-page-design` 与 `figma-designer`，用 `skill` 工具加载任一技能可返回完整正文。

## 目录结构

```text
dsh-plugin-ai-design-skills/
├── package.json            # 包清单：dsh.bundle.patch、显示元数据、icon 导出
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
├── LICENSE                 # 插件自身许可证（MIT，见 licenses/plugin-LICENSE.txt）
├── THIRD_PARTY_NOTICES.md  # 第三方内容归属
└── licenses/
    ├── plugin-LICENSE.txt
    └── ai-design-skills-LICENSE.txt
```

## 技能来源与许可证

- 插件打包代码（`index.js`、`cordis.patch.yml`、locale、图标、说明文档）：MIT。
- 两个技能正文：改编自 [elayadesign/ai-design-skills](https://github.com/elayadesign/ai-design-skills)，MIT 许可，版权归 Elaya（2026）。完整许可文本见 `licenses/ai-design-skills-LICENSE.txt`，摘要见 `THIRD_PARTY_NOTICES.md`。

## 卸载

```text
plugin_manager action=remove_bundle target=dsh-plugin-ai-design-skills
```
