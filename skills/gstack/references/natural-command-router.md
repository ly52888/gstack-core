# Natural Command Router

Use this reference when the user gives a plain-language instruction instead of a formal command. Do not force the user to remember `/review`, `/qa`, `/investigate`, `/ship`, or `/multi-ai-council`.

## Core Behavior

If the user says "这个页面", "这里", "看截图", "当前浏览器", or provides an image/screenshot, treat the visible page, selected text, screenshot, or current browser context as valid task evidence. Do not ask for a URL first if the page/screenshot is available.

For non-trivial routes, emit a compact route preview and continue unless a critical condition is missing.

## Natural Trigger Map

| User phrasing | Route | First action |
|---|---|---|
| `<url> 我需要开发一个这样的网站，开始启动` | `planning.multi-ai-council` | Browser evidence intake, then multi-round external AI council |
| `这个页面有 bug` / `这里有 bug` / `看截图修一下` | `development.page-bug` | Inspect screenshot/browser evidence, reproduce, route to investigate + browser QA |
| `任务执行失败` / `流程失败` / `按钮没反应` / `提交失败` | `development.task-failure` | Gather error text, current page state, logs/network if available, then root-cause |
| `报错了` / `控制台报错` / `接口失败` | `development.debug` | Capture error, find source, reproduce, fix, verify |
| `帮我验收` / `看这个页面有没有问题` / `跑一遍` | `qa.browser` | Run focused browser/HTTP/build validation |
| `当前改动审查一下` / `看看代码有没有问题` | `review` | Inspect diff/worktree, prioritize bugs and risks |
| `帮我补测试` / `加回归测试` | `test-generator` | Identify behavior and add minimal tests |
| `这个功能完成了` / `收尾` / `清理垃圾` | `closeout.ship` | Verify, remove temporary artifacts, update docs/handoff |
| `更新文档` / `整理项目文档` / `写交接` | `document-release` | Update progress/handoff/runbook docs from facts |
| `上下文快满` / `断网了继续` / `额度限制继续` | `recovery.handoff` | Produce/consume handoff and resume from verified facts |
| `生成图片` / `广告图` / `海报` | `creative.image` | Ask missing creative constraints, then route to image/design tools |
| `生成视频` / `短视频` / `动画` | `creative.video` | Ask duration/script/style, then route to video tools |
| `GitHub PR/CI/issue` | `github.workflow` | Use GitHub plugin/CLI and verify remote state |

## Page Bug / Screenshot Intake

For page or screenshot bug reports, gather in this order:

1. Visible evidence: screenshot/appshot/current browser page, selected text, URL/route if available.
2. User symptom: what failed, what was expected, what actually happened.
3. Reproduction path: clicks, form inputs, task id, account role, data state.
4. Technical evidence: console, network, server logs, test failure, route/API response, local runtime status.
5. Scope: same page only, related flow, backend API, data/model, or deployment/runtime.

Proceed with existing evidence first. Ask only if the missing detail blocks reproduction or risks editing the wrong area.

## Route Defaults

- Page issue with screenshot/current browser: default `development.page-bug`.
- Page issue without accessible page/screenshot: ask for URL, screenshot, or error text.
- "Task failed" in an app: default to root-cause investigation, not blind UI patching.
- Visual/UI bug: include browser/visual verification.
- Data/API failure: include logs/API probes/tests.
- Auth/payment/security/data-loss issue: escalate to guard/security review before edits.

## Output Expectations

For bug/failure tasks:

```text
Route:
Evidence used:
Reproduction:
Root cause:
Fix:
Verification:
Remaining risk:
```

For QA/closeout tasks:

```text
Route:
Checks run:
Issues found/fixed:
Docs/handoff updated:
Temporary files cleaned:
Remaining blockers:
```

