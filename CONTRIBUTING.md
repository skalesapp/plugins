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

   **`memory` is the one to think hardest about.** `"own"` gives your plugin a
   memory store of its own that nothing else reads, and it is what you get if
   you leave the field out. `"shared"` gives it the memory the user shares with
   the chat, which is everything they have ever asked Skales to remember - their
   notes, their people, their circumstances. Ask for it only when working on
   that material IS the plugin, say why in your README, and expect to be asked.
   A plugin that keeps its own notes wants `"own"`, and a card that says so is
   a card people install.

   **What you may ask for.** The calendar, the address book, e-mail and the
   messengers are all open to a plugin: a small CRM that reads the week's
   appointments, writes a follow-up to a contact and ticks it off is exactly
   what this surface is for. The protection is not a ban, it is the approval —
   any tool the app classes as `confirm` produces a real card naming the
   recipient and the content, and a person has to press it. Nothing
   auto-approves that card, on any machine, in any mode, including a run on a
   schedule.

   A tool that sends outward but carries no `confirm` class is refused by
   name rather than granted quietly, because there would be no card to press.
   So `list_calendar_events` runs freely, `create_calendar_event`,
   `send_email`, `whatsapp_send`, `slack_send_message`, `signal_send_message`
   and `send_discord_message` run behind a card, and the Telegram send tools
   (which post to the paired chat without asking) are not available to plugins
   at all.

   **What no plugin gets, whatever the manifest says.** The shell and arbitrary
   code (`execute_command`, `run_script`, `register_tool`); anything that
   writes skills or plugins, or lists them (`create_skill`, `create_plugin`,
   `update_plugin`, `delete_plugin`, `list_plugins`, and their siblings);
   delegation to a child run (`dispatch_subtasks`, `delegate_swarm_task`);
   remote control of the screen and keyboard (`computer_*`,
   `screenshot_desktop`); and `ask_user`, because a schedule has nobody at the
   screen to answer. Listing one of these does not fail your submission, it
   simply never runs — but a reviewer will ask you to take it off the line.
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
13. **If you sign your releases, name your public key.** Optional `publicKey`
    field on your entry (ed25519, base64 SPKI DER). Signing works without it -
    but the key is what turns "not modified since signing" into "published by
    you": with it, Skales shows your name on the green signature line at
    install time. Generate the pair with the Skales DevKit or any ed25519
    tool; the private half never leaves your machine.

## What the app gives your page

A plugin page is a sandboxed document. It has no bundler, no imports, no CDN and
no `fetch`, and `localStorage` does not survive - the app's own store does.
Everything it can reach is on `window.skales`:

```js
window.skales.storage.get(key)         // -> Promise<value | undefined>
window.skales.storage.set(key, value)  // -> Promise
window.skales.storage.remove(key)      // -> Promise
window.skales.storage.keys()           // -> Promise<string[]>
window.skales.tools.run(name, args)    // -> Promise<result>
```

`tools.run` runs one named Skales tool. Only the names in your `permissions.tools`
run; anything else rejects with the refusal by name. A tool the app classes as
needing approval makes the app draw a card the user presses, and the promise
stays pending until they answer - so show that as work in progress, never as a
hang.

**Your page is required.** A plugin whose page is missing or blank is refused
rather than put on the shelf as an empty frame.

**Your plugin's memory is its own unless it asked otherwise.** `memory_write`
and `memory_search` reach a store beside your plugin's folder that nothing else
reads. With `permissions.memory: "shared"` they reach the memory the user shares
with the chat instead. Whichever it is, the same store answers your page and
your scheduled runs, so the two halves cannot end up with different notes.

**Use the app's theme, not your own colours.** The frame writes the colours the
user actually chose into your page as seven CSS variables on `:root`:

| Variable | Role |
|---|---|
| `--sk-bg` | the page |
| `--sk-surface` | cards and fields |
| `--sk-line` | borders |
| `--sk-text` | text |
| `--sk-muted` | secondary text |
| `--sk-accent` | the accent the user picked |
| `--sk-accent-text` | text that sits ON the accent |

Use only those for every background, border, text and accent, and declare your
own fallback values for the same seven names at the top of your stylesheet so
the page also stands on its own. A hardcoded white, black or hex in one of those
roles is the one thing that makes a plugin ignore the theme the rest of the app
follows. Type comes from the app the same way: `font-family: inherit` rather
than a family of your own.

**A page and an agent meet in a file, never in the store.** A page reaches the
store and an agent cannot; both reach the plugin's own folder. So a plugin whose
page and agent share state keeps that state in a named file - `data/whatever.json`
- written with `write_file` and read with `read_file`, and keeps the store for
page preferences. `read_file` hands a page the file's text as `result.content`.
Have the agent write its own files rather than `store.json`, which belongs to the
bridge.

**Tools you ask for and this build does not have are dropped, and the app now
says which and why.** A name on the never-grantable list can never be given to a
plugin whatever the manifest says, and a name this version has no tool for is
usually a misspelling of one it does. Neither fails your install; both cost you
the tool, so read what the app tells you rather than assuming the list you wrote
is the list you got.

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
