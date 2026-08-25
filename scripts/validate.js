#!/usr/bin/env node
/**
 * Registry validation.
 *
 * Checks every entry in plugins.json against schema/plugin.schema.json and
 * against the registry rules that a schema cannot express:
 *
 *   - the owner segment of the id matches the owner of the repo it is served from
 *   - the id is not listed in removed.json (ids are never handed out twice)
 *   - "skales" as a name or slug prefix is reserved for skalesapp
 *   - firstParty is reserved for skalesapp
 *   - ids are unique, featured.json only points at ids that exist
 *
 * Usage: node scripts/validate.js [--diff <base-ref>]
 * With --diff it additionally asserts that the change adds exactly one entry,
 * which is what a submission PR looks like.
 */

const fs = require("fs");
const path = require("path");
const { execFileSync } = require("child_process");
const Ajv = require("ajv");

const root = path.join(__dirname, "..");
const read = (f) => JSON.parse(fs.readFileSync(path.join(root, f), "utf8"));

const errors = [];
const fail = (msg) => errors.push(msg);

const schema = read("schema/plugin.schema.json");
const plugins = read("plugins.json");
const featured = read("featured.json");
const removedFile = read("removed.json");

if (!Array.isArray(plugins)) fail("plugins.json must be an array of entries.");
if (!Array.isArray(featured)) fail("featured.json must be an array of ids.");
const removed = Array.isArray(removedFile) ? removedFile : removedFile.removed;
if (!Array.isArray(removed)) fail("removed.json must carry a removed array.");

const ajv = new Ajv({ allErrors: true, strict: false });
const validate = ajv.compile(schema);

const removedIds = new Set((removed || []).map((r) => (typeof r === "string" ? r : r.id)));
const seen = new Set();

for (const entry of Array.isArray(plugins) ? plugins : []) {
  const label = entry && entry.id ? entry.id : JSON.stringify(entry).slice(0, 60);

  if (!validate(entry)) {
    for (const e of validate.errors) fail(`${label}: ${e.instancePath || "/"} ${e.message}`);
    continue;
  }

  if (seen.has(entry.id)) fail(`${entry.id}: duplicate id.`);
  seen.add(entry.id);

  if (removedIds.has(entry.id)) {
    fail(`${entry.id}: this id is listed in removed.json and is retired for good.`);
  }

  const idOwner = entry.id.slice("com.github.".length).split("/")[0];
  const repoOwner = entry.repo.split("/")[0];
  if (idOwner.toLowerCase() !== repoOwner.toLowerCase()) {
    fail(`${entry.id}: id owner "${idOwner}" does not match repo owner "${repoOwner}".`);
  }

  const isSkales = repoOwner.toLowerCase() === "skalesapp";
  const slug = entry.id.split("/")[1];
  const claimsSkales = /skales/i.test(slug) || /\bskales\b/i.test(entry.name);
  if (claimsSkales && !isSkales) {
    fail(`${entry.id}: the name "skales" is reserved for skalesapp.`);
  }
  if (entry.firstParty && !isSkales) {
    fail(`${entry.id}: firstParty is reserved for skalesapp.`);
  }
}

for (const id of Array.isArray(featured) ? featured : []) {
  if (!seen.has(id)) fail(`featured.json: "${id}" is not an entry in plugins.json.`);
}

// Regex scan for known-bad patterns in the submitted plugin source.
// TODO: not implemented. The scan runs against a plugin's release archive, and
// the release-fetch step does not exist yet. It is deliberately absent rather
// than stubbed green, so nobody reads a passing run as "the source was scanned".
console.log("source regex scan: NOT RUN (release fetch not implemented yet)");

const diffIndex = process.argv.indexOf("--diff");
if (diffIndex !== -1 && process.argv[diffIndex + 1]) {
  const base = process.argv[diffIndex + 1];
  let before;
  try {
    before = JSON.parse(execFileSync("git", ["show", `${base}:plugins.json`], { encoding: "utf8" }));
  } catch (e) {
    console.log(`diff check: skipped (no plugins.json at ${base})`);
    before = null;
  }
  if (before) {
    const beforeIds = new Set(before.map((p) => p.id));
    const added = plugins.filter((p) => !beforeIds.has(p.id));
    const dropped = before.filter((p) => !seen.has(p.id));
    if (dropped.length) {
      fail(`this change removes ${dropped.map((p) => p.id).join(", ")} - removals go through a maintainer, with a removed.json entry.`);
    }
    if (added.length !== 1) {
      fail(`a submission adds exactly one entry, this change adds ${added.length}.`);
    }
    const changed = before.filter((p) => {
      const now = plugins.find((q) => q.id === p.id);
      return now && JSON.stringify(now) !== JSON.stringify(p);
    });
    if (changed.length > 1) {
      fail(`this change edits ${changed.length} existing entries - update one at a time.`);
    }
  }
}

if (errors.length) {
  console.error(`\n${errors.length} problem(s):`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}

console.log(`OK: ${plugins.length} entries, ${featured.length} featured, ${removedIds.size} retired ids.`);
