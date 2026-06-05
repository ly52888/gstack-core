#!/usr/bin/env node
const prompt = process.argv.slice(2).join(" ").trim();

if (!prompt) {
  console.error("Usage: scripts/route-preview.mjs <plain-language task>");
  process.exit(1);
}

const rules = [
  {
    intent: "planning.multi-ai-council",
    test: /https?:\/\/\S+.*(这样的网站|类似项目|参考这个|复刻|仿站|开始启动)|\/skill.*https?:\/\/\S+/i,
    tools: ["browser evidence intake", "multi-AI council", "planning review"],
    required: []
  },
  {
    intent: "development.page-bug",
    test: /(这个页面|当前页面|这里).*(bug|失败|报错|不对|异常|没反应)|这里有\s*bug|有bug|看截图.*(修|处理)|截图.*(修|处理)|任务执行失败|流程失败|按钮没反应|提交失败|页面报错|这里不对/i,
    tools: ["natural-command-router", "investigate", "browser QA", "logs/tests"],
    required: []
  },
  {
    intent: "qa.browser",
    test: /验收|跑一遍|看.*有没有问题|页面检查|smoke|回归/i,
    tools: ["qa", "browser QA", "HTTP/build checks"],
    required: []
  },
  {
    intent: "review",
    test: /代码审查|审查.*改动|看看代码|review|diff/i,
    tools: ["review", "git diff", "tests"],
    required: []
  },
  {
    intent: "closeout.ship",
    test: /收尾|清理垃圾|临时垃圾|更新文档|整理文档|写交接|完成了/i,
    tools: ["closeout", "document-release", "qa"],
    required: []
  },
  {
    intent: "creative.video",
    test: /视频|video|动画|字幕|配音|口播|短片|reel/i,
    tools: ["HyperFrames", "Remotion", "HeyGen"],
    required: ["duration", "aspect_ratio", "script_or_message", "style"]
  },
  {
    intent: "creative.image",
    test: /图片|image|海报|广告图|插画|logo|视觉|banner/i,
    tools: ["imagegen", "Canva", "Picsart", "Shutterstock"],
    required: ["use_case", "subject", "aspect_ratio_or_destination", "style_or_reference"]
  },
  {
    intent: "github.workflow",
    test: /github|pull request|\bPR\b|issue|\bCI\b|release|fork/i,
    tools: ["GitHub plugin", "gh CLI", "local git"],
    required: ["repo_or_url", "desired_action"]
  },
  {
    intent: "development.debug",
    test: /bug|报错|修复|debug|失败|日志|异常|root cause|定位/i,
    tools: ["investigate", "codegraph", "tests", "logs"],
    required: ["symptom", "expected_behavior", "repro_or_evidence"]
  },
  {
    intent: "development.implementation",
    test: /开发|实现|重构|代码|feature|build|implement/i,
    tools: ["codegraph", "tests", "review", "docs"],
    required: ["goal", "scope", "acceptance"]
  },
  {
    intent: "recovery.handoff",
    test: /上下文|交接|handoff|额度|断网|恢复|继续/i,
    tools: ["recovery", "handoff", "route trace"],
    required: ["current_goal"]
  }
];

const route = rules.find((rule) => rule.test.test(prompt)) ?? {
  intent: "general",
  tools: ["native reasoning", "clarification gate"],
  required: ["goal", "success_criteria"]
};

const missing = route.required.filter((field) => !new RegExp(field.replaceAll("_", ".*"), "i").test(prompt));

console.log(`Route: ${route.intent}`);
console.log(`Mode: ${route.tools.length > 1 ? "combo" : "native"}`);
console.log(`Tools: ${route.tools.join(" -> ")}`);
console.log(`Need: ${missing.length ? missing.join(", ") : "none"}`);
console.log(`Next: ${missing.length ? "ask clarification before execution" : "execute with focused verification"}`);
