# Submitting a plugin

A submission is a pull request that adds **one line** to [`plugins.json`](./plugins.json).
The plugin itself stays in your own repository, under your own licence. This
registry only carries the pointer and the metadata the app needs to show and
install it.

Work through the checklist before you open the PR. A reviewer works through the
same twelve points, in the same order.

## The checklist

1. **The plugin lives in a public GitHub repository you own.** The registry
   points at your repository; it never vendors a copy of your code.
2. **The repository has a `plugin.json` at the path you submit**, and it
   validates against [`schema/plugin.schema.json`](./schema/plugin.schema.json).
   The entry you add to `plugins.json` carries the same values.
3. **The id is `com.github.<owner>/<slug>`**, with `<owner>` spelled exactly as
   the GitHub owner of that repository, and `<slug>` lowercase with hyphens.
   CI rejects an id whose owner does not match the repository owner.
4. **The id is new.** Ids in [`removed.json`](./removed.json) are retired for
   good and are never handed out again — not for a rename, not for a new owner.
   If you rename your plugin, you take a new id and the old entry is removed.
5. **The name does not say "Skales".** That name is reserved for plugins
   published by `skalesapp`. "for Skales" in your description is fine; a plugin
   called "Skales Something" is not.
6. **`version` is semver**, no leading `v`, and it matches a tag or release in
   your repository. `minAppVersion` names the lowest Skales version it runs on;
   do not guess — install that version and try it.
7. **`description` is one sentence about what it does.** Not what it will do,
   not what it promises, no marketing. 200 characters is the ceiling.
8. **`class` is honest.** `page` renders a surface, `agent` answers with a
   model, `automation` runs on a schedule or a trigger. Pick the one that
   describes the plugin's main job.
9. **`permissions` is the smallest set that works.** `network: false` unless the
   plugin genuinely reaches a host outside the app; `filesystem: "pluginRoot"`
   rather than anything wider; list only the tools you actually call. A
   permission you do not need is a permission a reviewer will ask you to drop.
10. **No secrets, no telemetry, no remote code loading.** No API keys in the
    repository, no phoning home, and nothing that downloads and executes code at
    runtime. A plugin that fetches its own logic at runtime is out of scope for
    this registry.
11. **If money is involved, say so in `business`.** Paid, freemium, who the
    vendor is, where the price is written. A paid plugin is welcome; a paid
    plugin that reads as free is not.
12. **You commit to maintaining it.** You keep it working against current Skales
    releases, you answer issues in your repository, and you tell us when you
    stop. An unmaintained entry gets removed, and its id is retired with it.

## Opening the PR

- Add your entry at the **end** of `plugins.json`. One entry per PR.
- `addedAt` is the date you open the PR, `YYYY-MM-DD`.
- Do not touch `featured.json` — that list is curated by maintainers.
- Do not touch `removed.json` — it is append-only and maintainer-only.
- CI runs [`scripts/validate.js`](./scripts/validate.js). Run it yourself first:

```bash
npm install --no-save ajv@8
node scripts/validate.js
```

## What review looks at

CI covers the mechanical rules: schema, id shape, owner match, retired ids,
reserved name, one entry per PR. A human reads the plugin: what it does, what it
touches, whether the permissions match the code, and whether the repository
looks maintained. Expect questions. Expect to be asked for less than you asked
for, on permissions.

## After it is merged

The app picks the registry up on its next refresh. If you ship a new version,
open a small PR that bumps `version` (and `minAppVersion`, if it moved) on your
entry — everything else on the line stays as it is.
