---
name: gstack-skills
description: >
  中文优先的智能 gstack 总控技能。用于在一个入口后面用大白话下达开发、调试、代码审查、
  GitHub、需求讨论、多 AI 评审、图片/视频/设计、文档、QA、发布收尾、上下文交接、额度/断网恢复等任务；
  支持“这个页面有 bug / 任务执行失败 / 看截图修一下 / 帮我验收 / 收尾清理 / 更新文档”等自然语言入口；
  会根据需要选择相关 skill/plugin/MCP/CLI/local script，缺少关键条件时先向用户提问，
  工具不可用时说明并回退。兼容旧命令 `/启动`、`/gstack`、`/review`、`/qa`、`/ship`、
  `/local-codex`、`开启本地全自动目标开发模式`。
version: 3.0.0
author: gstack-core contributors
tags: [codex, skills, workflow, tool-routing, development, creative, github, qa, recovery]
---

# gstack-skills

gstack-skills 是一个智能路由入口。用户可以在 `$gstack-skills` 后面用自然语言描述目标；本技能先判断任务类型、缺失条件、风险和可用能力，再选择最小足够的 skill、plugin、MCP、CLI、本地脚本或交接流程。

## Core Rules

1. 用户显式点名的 skill、plugin、工具、URL、项目规则、`只本地`、`不要联网`、`先问我` 优先。
2. 先分类再执行：开发、调试、审查、GitHub、文档、创作、浏览器/QA、恢复、清理、规划、研究。
3. 只加载最相关的 reference 或 capability card，避免无意义消耗上下文。
4. 缺少关键条件时先问，不要生成四不像图片/视频/方案/代码/PR 操作。
5. 优先用本地事实：项目文件、route trace、codegraph、测试、日志、浏览器证据、官方文档。
6. 高风险任务先做范围、影响面、回滚、验证和收尾标准。
7. 开工前多 AI council 任务必须先完成证据整理、多轮互审、最终方案复核和用户确认；不得跳过讨论直接开发。
8. 完成时必须报告验证证据、改动路径、未解决 blocker 和临时文件清理状态。

## Natural Language Usage

可以直接这样用：

```text
$gstack-skills https://example.com 我需要开发一个这样的网站，开始启动
$gstack-skills https://example.com 我要做类似项目，开始启动
$gstack-skills /skill https://example.com 我需要开发一个这样的网站
$gstack-skills 这个页面的任务执行失败了，帮我定位并修复
$gstack-skills 这里有 bug，看截图处理一下
$gstack-skills 帮我验收当前页面，有问题就修
$gstack-skills 当前改动帮我做代码审查
$gstack-skills 这个功能完成了，帮我收尾、清理临时垃圾并更新文档
$gstack-skills 帮我生成一张 Telegram 广告图，缺条件先问我
$gstack-skills 我给你一个网站，先用浏览器整理证据，再开至少 3 个外部 AI 多轮讨论，互相攻击完善，最后确认方案再开发
$gstack-skills 修复这个 GitHub PR 的 CI，自己判断需要哪些工具
$gstack-skills 当前上下文快满了，生成新对话交接包
$gstack-skills 继续开发这个项目，先用 codegraph 看影响面，再动手
$gstack-skills 做一个 15 秒宣传视频，工具不够就先问我
```

对于复杂任务，先给出简短 route preview：

```text
Route: <intent> | Mode: <native|single-tool|combo|subthread> | Need: <missing inputs or none> | Tools: <candidates> | Verify: <evidence>
```

如果 `Need` 中有关键缺失项，先问 1-3 个短问题并停止，不要盲目执行。

## Simple Startup Trigger

当用户在 `$gstack-skills` 后面给出网站地址，并说“我需要开发一个这样的网站 / 类似项目 / 参考这个做 / 复刻 / 仿站 / 开始启动”时，默认路由为：

```text
Route: planning.multi-ai-council | Mode: external-browser-first
```

默认动作：

1. 先用可用浏览器/Chrome 整理参考网站证据。
2. 建立 evidence pack 和 do-not-copy 清单。
3. 若已说明“浏览器已登录”或账号态可用，优先使用该账号态浏览器；否则只读取公开页面或询问。
4. 启动至少 3 个外部 AI 的多轮 council；工具不可用时明确 fallback。
5. 多轮互审、交叉攻击、最终方案复核完成前，不进入开发。

这种简单启动不要求用户一次性提供目标用户、成功指标、技术栈。缺失项由 Codex 在整理证据后用 1-3 个问题补齐。

## Quick Router

- **需要选择 skill/plugin/tool：**读 `references/router-kernel.md`。
- **大白话任务路由、页面 bug、截图、任务失败、收尾：**读 `references/natural-command-router.md`。
- **判断该问还是该做：**读 `references/clarification-gate.md`。
- **图片/视频/设计/PPT：**读 `references/creative-router.md`。
- **系统/网站开工前需求讨论、多 AI 多轮互审：**读 `references/multi-ai-council.md`。
- **开发/调试/审查/测试：**读 `references/development-router.md`。
- **大代码库定位/影响面：**优先用 `scripts/codex-codegraph/bin/codex-codegraph.js`。
- **上下文、额度、断网、中断恢复：**读 `references/recovery.md`。
- **验收、文档回写、垃圾清理、收尾：**读 `references/closeout.md`。
- **工具可用性检查：**运行 `scripts/gstack-doctor.sh` 或读 `references/doctor.md`。

## Legacy Command Compatibility

旧命令继续兼容：

| Command | Route |
|---|---|
| `/启动` | 先读项目根资料，再进入智能路由 |
| `/gstack` | 显示/解释当前 gstack 路由和可用能力 |
| `/review` | 本地 diff / PR / 运行态风险审查 |
| `/qa` | 快速验收或完整 QA |
| `/ship` | 本地重建、验证、文档回写、闭环汇报 |
| `/investigate` | 系统性根因分析 |
| `/multi-ai-council` | 开工前多 AI 需求讨论、红队攻击、方案收口 |
| `/test-generator` | 生成最小必要测试并验证 |
| `/local-codex` | 低风险任务委派给本地模型/本地 Codex |
| `/careful` `/freeze` `/guard` | 高风险操作护栏 |
| `开启本地全自动目标开发模式` | Local-First Cloud-Gate：本地执行，云端审批和验收 |

当旧命令映射到已安装的专门 skill 时，优先使用专门 skill；缺失时用 gstack 的通用路由作为 fallback。

## Local-First Cloud-Gate

当用户要求减少云端 token、本地模型开发、Ollama/Qwen/codex-local，或直接说“开启本地全自动目标开发模式”时：

1. 主线程负责澄清目标、风险分级、任务拆包和最终验收。
2. 低风险、边界清楚的实现任务可以委派给本地 Codex。
3. 本地报告必须压缩，禁止完整日志/大段 diff 回灌。
4. 数据库迁移、认证、支付、生产恢复、安全边界等高风险决策仍由主线程守门。

## Browser Tool Routing Guard

浏览器验收必须服从项目级规则。若项目要求特定内置浏览器，就不要擅自换成外部 Chrome、Safari、独立 Playwright 或新窗口。无法确认浏览器工具连接正确时，降级为构建、HTTP/API smoke、日志和命令验证。

## Capability Cards

能力卡位于 `capabilities/*.json`，用于描述每个 skill/plugin/tool 的触发场景、必填条件、fallback 和验收标准。新增工具时优先新增能力卡，而不是扩大主 `SKILL.md`。

## Open-Source Discipline

核心技能保持通用，不写死某个项目。项目专属行为应放在项目 profile、AGENTS.md、handoff 文档或单独 capability card 中。
