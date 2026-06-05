# Community Strategy

GitHub is the source of truth. Other communities are distribution, feedback, examples, and early-user discovery channels. Avoid one-shot promotion blasts; publish useful examples and route people back to the repository, issues, and discussions.

## Channel Roles

### GitHub

- Primary home for code, issues, discussions, examples, roadmap, and releases.
- Use issues for capability-card requests, failed route reports, and bug reproduction.
- Use discussions for workflow ideas, community packs, and adoption notes.
- Keep release notes practical: what route improved, what commands changed, what verification ran.

### China Developer Communities

- V2EX: practical builder feedback. Best for honest posts about "I built this to solve my own Codex workflow pain." Avoid corporate marketing tone.
- Juejin: longer technical articles. Best for tutorials, before/after workflows, route trace examples, and implementation notes.
- OSCHINA: open-source project exposure. Best for release notes, project introduction, and community contribution calls.
- SegmentFault: Q&A and tutorial content. Best for "how to install", "how capability cards work", and "how to write a new route."
- Zhihu: thought-leadership essays. Best for explaining AI coding workflow failures, external AI council boundaries, and why verification matters.
- WeChat public account: serialized Chinese documentation and launch updates. Best for a founder/build-in-public narrative.
- Bilibili: short demos. Best for screen recordings: reference-site planning, page bug fix, context recovery, route preview.
- Gitee mirror: optional China-friendly mirror after GitHub is stable. Keep GitHub canonical to avoid split issues.
- GitCode / GitHub Chinese communities: repost polished releases after there is enough documentation and demo evidence.

### Global Communities

- Hacker News: only after install, examples, and README are polished. Use "Show HN" with a technical angle and a clear demo.
- Reddit: use practical subreddits sparingly; share demos and ask for feedback, not stars.
- X/Twitter: build-in-public updates, short route examples, release clips.
- LinkedIn: team governance and AI-assisted development process angle.
- Product Hunt: later, after a small demo video, website, install path, and use cases are clean.
- YouTube: demos and workflow explainers.
- Discord/Slack communities: only participate where AI coding tools are already discussed; answer questions instead of dropping links.

## Launch Order

1. GitHub README, docs, examples, issues, and discussions.
2. Short Chinese launch post on V2EX or Juejin with one real demo.
3. A longer Juejin article explaining the workflow model.
4. X/Twitter build-in-public thread with route examples.
5. Bilibili or YouTube demo video.
6. OSCHINA / GitHub Chinese community repost after docs mature.
7. Hacker News / Product Hunt only after the project has clearer install success and public examples.

## Content Pillars

- Workflow pain: context waste, wrong tool routing, repeated instructions, weak closeout.
- Natural commands: show how plain Chinese or English maps to routes.
- Evidence-first development: local inspection, browser proof, tests, route trace.
- Reference-site planning: inspired and differentiated, never clone.
- Multi-AI council: useful for requirement hardening, with disclosure and source constraints.
- Recovery: context overflow, network failure, quota limit, interrupted task handoff.
- Extensibility: capability cards, maintained packs, project profiles.

## Chinese Post Template

```text
标题：我开源了一个 Codex 工作流路由 skill，用来减少跑偏、重复上下文和无证据完成

背景：
我在真实项目里反复遇到几个问题：需求没讨论清楚就写、页面 bug 没复现就改、上下文爆了以后任务断掉、最后没有测试和文档收尾。

项目：
gstack-core 是一个 Codex-first 的智能 workflow router。它让你用一个入口说大白话，然后自动路由到开发、调试、GitHub、浏览器验收、多 AI 方案讨论、图片/视频生成、恢复和收尾流程。

例子：
`$gstack-skills https://example.com 我需要开发一个这样的网站，开始启动`

它应该先整理页面证据、列出不能照抄的部分、做差异化方案、多轮讨论，再进入开发计划。

我想收集反馈：
- 哪些任务最容易让 Codex 跑偏？
- 你们现在怎么处理上下文超限和任务中断？
- 你们希望 capability card 支持哪些工具或 skill？

仓库：
https://github.com/ly52888/gstack-core
```

## Community Rules

- Do not ask for stars directly.
- Do not claim official Codex or OpenAI affiliation.
- Do not promise autonomous completion without verification.
- Do not call reference-site work "clone" or "copy"; use "inspired, differentiated implementation."
- Do not publish private project screenshots, credentials, customer data, or internal prompts.
- Do not overstate enterprise readiness before policy enforcement, analytics, and registry features exist.

## Feedback Capture

Track every useful community reply as one of:

- `bug`: installation, doctor, validation, routing, docs.
- `route-request`: a new natural command or tool route.
- `workflow-gap`: missing closeout, recovery, review, planning, or creative gate.
- `docs-gap`: unclear install, examples, brand, governance, contribution.
- `sustainability-signal`: team setup, private registry, maintained pack, support, governance.

Turn repeated feedback into issues or discussions before implementing.
