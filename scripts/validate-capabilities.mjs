#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(new URL("..", import.meta.url).pathname);
const dirs = [
  path.join(root, "capabilities"),
  path.join(root, "skills", "gstack", "capabilities")
];
const required = [
  "id",
  "type",
  "target",
  "best_for",
  "triggers",
  "required_inputs",
  "fallback",
  "verification",
  "when_not_to_use"
];

let failures = 0;

function listCards(dir) {
  return fs.existsSync(dir)
    ? fs.readdirSync(dir).filter((name) => name.endsWith(".json")).sort()
    : [];
}

function validateDir(dir) {
  const rel = path.relative(root, dir);
  for (const file of listCards(dir)) {
    const full = path.join(dir, file);
    let card;
    try {
      card = JSON.parse(fs.readFileSync(full, "utf8"));
    } catch (error) {
      console.error(`fail   ${rel}/${file}: invalid JSON: ${error.message}`);
      failures++;
      continue;
    }

    const missing = required.filter((key) => !(key in card));
    if (missing.length) {
      console.error(`fail   ${rel}/${file}: missing ${missing.join(", ")}`);
      failures++;
      continue;
    }

    for (const key of ["best_for", "triggers", "required_inputs", "fallback", "verification", "when_not_to_use"]) {
      if (!Array.isArray(card[key])) {
        console.error(`fail   ${rel}/${file}: ${key} must be an array`);
        failures++;
      }
    }

    if (!["skill", "plugin", "mcp", "cli", "local-script", "subthread", "built-in", "workflow"].includes(card.type)) {
      console.error(`fail   ${rel}/${file}: unknown type ${card.type}`);
      failures++;
    }

    console.log(`ok     ${rel}/${file}: ${card.id}`);
  }
}

for (const dir of dirs) validateDir(dir);

const [rootCards, skillCards] = dirs.map(listCards);
if (rootCards.join("\n") !== skillCards.join("\n")) {
  console.error("fail   root capabilities and skill capabilities have different file sets");
  failures++;
}

if (failures) {
  process.exit(1);
}

console.log("done");
