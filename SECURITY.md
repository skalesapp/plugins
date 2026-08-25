# Security

## Reporting

Report a security problem in a listed plugin, or in this registry, privately:

- **GitHub Security Advisory** — [open a draft advisory](https://github.com/skalesapp/plugins/security/advisories/new)
- **Email** — security@skales.app

Include the plugin id, the repository and version you looked at, what the
problem is, and how to reproduce it. Please do not open a public issue for a
vulnerability in a plugin that people have installed.

## What we do with it

A credible report against a listed plugin gets the entry **removed from the
registry within 24 hours** of us confirming it. Removal is not a verdict on the
author — it stops new installs while the problem is open. We then contact the
plugin's maintainer, and the entry can come back once the fix is released.

Removal only affects the registry listing. It does not uninstall the plugin from
machines that already have it; the app surfaces removed plugins so you can
uninstall them yourself.

## Retired ids

Every removal is recorded in [`removed.json`](./removed.json). That file is
**append-only**: entries are added, never edited, never deleted. A removed id is
retired permanently and is **never handed out again** — not to a renamed
repository, not to a new owner, not to the same author. This is what keeps an id
a stable identity: a plugin id you saw last year cannot become someone else's
code this year. CI rejects any `plugins.json` entry whose id appears there.

## What listing does and does not mean

Plugins in this registry other than those published by `skalesapp` are
**community plugins**. They are not written, tested, audited or maintained by
Skales. Listing means the entry passed the checks in
[CONTRIBUTING.md](./CONTRIBUTING.md) and a maintainer read the submission — it
is not a security review of the code, and it is not a warranty. Installing a
plugin runs someone else's code on your machine, with the permissions the entry
declares. Read those permissions, and read the plugin's source, before you
install it.

## Reporting a problem in the Skales app itself

Use the app's own channel: <https://github.com/skalesapp/skales/security> or
security@skales.app.
