## Plugin

- **Id:** `com.github.<owner>/<slug>`
- **Repository:** <link>
- **Version:** <x.y.z> · **minAppVersion:** <x.y.z>
- **Class:** page / agent / automation
- **Platforms:** desktop / mobile

**What it does, in one sentence:**

**Why it needs the permissions it declares:**

## Checklist

Tick each one. A reviewer works through the same list — see
[CONTRIBUTING.md](../CONTRIBUTING.md).

- [ ] The plugin lives in a public GitHub repository I own.
- [ ] The repository has a `plugin.json` at the submitted path, and it validates against `schema/plugin.schema.json`.
- [ ] The id is `com.github.<owner>/<slug>`, with the owner spelled exactly as the GitHub repository owner.
- [ ] The id is new and does not appear in `removed.json`.
- [ ] The name does not use "Skales".
- [ ] `version` is semver and matches a tag or release; `minAppVersion` is a version I actually tested against.
- [ ] `description` is one factual sentence, no marketing.
- [ ] `class` describes the plugin's main job.
- [ ] `permissions` is the smallest set that works.
- [ ] No secrets in the repository, no telemetry, no code loaded and executed at runtime.
- [ ] If the plugin is paid or freemium, `business` says so.
- [ ] **I commit to maintaining this plugin**: keeping it working against current Skales releases, answering issues in my repository, and telling you when I stop. I understand an unmaintained entry is removed and its id retired.

- [ ] This PR adds exactly one entry, at the end of `plugins.json`, and touches nothing else.
- [ ] `node scripts/validate.js` passes locally.
