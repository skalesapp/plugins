# Page Watch

A list of web pages that matter to you, checked on a schedule, with a short
report of what changed since last time.

## What it does

You add the address of a page: a competitor's pricing page, a supplier's terms,
a public tender list, your own site. Skales reads the text of that page, keeps a
copy inside this plugin's own folder, and on the next check compares the two
line by line. The screen shows the lines that appeared and the lines that
disappeared, marked with a plus and a minus. Every Monday morning the plugin's
agent does the same round and writes one report in plain language about what
moved: a price, a name, a clause, a new product, a promise that is gone.

This is not an uptime check. It watches the wording, the prices and the
promises, which is the part nobody notices moving.

## What "no change" means here

A timestamp, a visitor counter, a rotating quote and a cache-busting token move
on every single visit, and a watch that reported those would mark every page as
changed forever. So:

- A line that is only a number or only a date is ignored.
- A line whose only difference from the stored one is its digits is treated as
  unchanged, unless the line carries a currency symbol or a currency code. A
  price that moved is exactly what is being watched, so it is never filtered.
- Anything else you want ignored goes in the per-page **Ignore lines
  containing** field, as a comma separated list.

## A page that could not be read is not a page that changed

If the address fails, answers with an error page, or comes back with no text at
all, the stored copy is kept exactly as it is and the row says **Could not be
read** with the reason. A page behind a login or a bot wall says that in words.
It is never reported as having lost its content.

## The four states a row can show

- **First check** means a copy has just been taken and there was nothing yet to
  compare it against. The next check is the first one that can report anything.
- **No change** means nothing moved beyond the noise described above.
- **Changed** means the lines shown under **What changed** appeared or
  disappeared since the last check.
- **Could not be read** means the address failed, answered with an error page,
  or came back with no text. The stored copy was kept.

A fifth state, **Not compared**, shows when a stored copy exists but could not
be read back onto this screen, most often because the weekly run refreshed it in
the meantime. Nothing is reported as changed in that case, the text just read
becomes the new copy, and the next check compares against it. What moved in the
meantime is in that week's report.

## What it may do

- **No network.** The page cannot reach the internet on its own.
- **Its own folder only.** Every file it reads or writes is under this plugin's
  folder: `data/pages.json`, `snapshots/`, `reports/`. It cannot see your
  workspace and it cannot see another plugin.
- **Four tools:** `extract_web_text` reads the text of an address you added and
  nothing else; `list_directory` lists this plugin's own folders;
  `read_file` reads back the stored copies and the reports; `write_file`
  writes the watch list, the stored copies and the reports.

It sends nothing and publishes nothing. The Monday run has nobody at the screen,
so anything that would send, publish or spend would have to wait for a click,
and this plugin asks for none of those tools in the first place.

## Without a model provider

Adding a page, checking it, and seeing what changed all work with no provider,
no key and no account. Only the written weekly report needs a model. With no
provider configured, the Reports tab stays empty and says where to add one,
rather than showing an error.

## Turning it off

Switch the plugin off on the Plugins page and the Monday schedule stops with it.
The watch list, the stored copies and the reports already written stay where
they are.
