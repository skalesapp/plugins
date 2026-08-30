# Skales Plugins

The community plugin registry for [Skales](https://skales.app), the local-first
AI desktop agent. One JSON file — [`plugins.json`](./plugins.json) — that the
app reads to show what is available and where to get it.

Plugins stay in the repositories of the people who write them. This registry
carries the pointer and the metadata: what a plugin is called, what class it is,
which platforms it runs on, and what it is allowed to touch.

## Installing from the app

1. Open **Plugins** in Skales.
2. Pick one and press install.

That is the whole flow. The app fetches the plugin from the repository the entry
names, shows you the permissions it declares, and installs it locally. Nothing
is installed without you pressing install.

### Install from a repository

You are not limited to this list. **Install from repo** in the app takes any
GitHub repository that carries a valid `plugin.json` and installs it directly.
The registry is a curated front door, not a gate — if a plugin is not listed
here, or you wrote it yourself, or the author does not want to submit it, you
can still install it. The app warns you louder for an unlisted source, and
that is the only difference.

## Submitting a plugin

Open a pull request that adds one entry to `plugins.json`, and work through the
twelve-point checklist in [CONTRIBUTING.md](./CONTRIBUTING.md) first. CI checks
the mechanical rules — schema, id shape, owner match, retired ids, one entry per
PR — and a maintainer reads the rest.

## Plugin ids

An id is `com.github.<owner>/<slug>`: reverse-DNS, derived from where the plugin
is served from. `com.github.skalesapp/daily-brief` can only be published by
`skalesapp`, because CI matches the owner segment against the repository owner.
Ids that are removed are recorded in [`removed.json`](./removed.json) and are
never handed out again — see [SECURITY.md](./SECURITY.md).

## What is in this repository

| File | What it is |
|---|---|
| [`plugins.json`](./plugins.json) | The registry. One entry per plugin. |
| [`featured.json`](./featured.json) | Ids the app highlights. Curated by maintainers. |
| [`removed.json`](./removed.json) | Retired ids. Append-only, never reused. |
| [`schema/plugin.schema.json`](./schema/plugin.schema.json) | The manifest schema every entry validates against. |
| [`first-party/`](./first-party) | Plugins published by Skales. Generated from the app bundle, never edited here. |
| [`scripts/validate.js`](./scripts/validate.js) | The validator CI runs. Run it locally too. |

## First-party plugins

The entries under `first-party/` ship inside Skales itself. Their pages, their
prompts and their prose live in the app, and their rows here, their README and
their CHANGELOG are written out of that one source by
`scripts/emit-first-party-registry.js` in the app repository. Two consequences
worth knowing:

- Installing one of them makes **no network call**. The registry confirms the
  version and the metadata; the content comes out of the app. They work on a
  fresh machine, offline, before any provider is configured.
- Editing a file under `first-party/` here does nothing and will be overwritten.
  The change belongs in the app.

## Disclaimer

Community plugins are **not written, tested, audited or maintained by Skales**.
They are third-party code, published by their authors, under their own licences.
Listing a plugin here means its submission passed the checks in CONTRIBUTING.md
and a maintainer read it — it is not a security review, not an endorsement, and
not a warranty of any kind.

Installing a plugin runs someone else's code on your machine with the
permissions the entry declares. Read the permissions, read the source, and
decide for yourself. Bugs, data loss and support for a community plugin are
matters for its author, in its own repository. Plugins under `first-party/` are
the exception: those are ours, and they are supported through the Skales
channels below.

## Links

- [Skales](https://skales.app)
- [Skales App repository](https://github.com/skalesapp/skales)
- [Skales DevKit](https://github.com/skalesapp/devkit)
- [Skales Connector for WordPress](https://github.com/skalesapp/wordpress)
- [Discussions](https://github.com/skalesapp/skales/discussions)

## License

The registry data and tooling in this repository are MIT. Each listed plugin
carries its own licence, in its own repository.
