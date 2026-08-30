# Reading Stack

A list of the links you meant to get back to, and a short summary of each one
waiting for you when you come back.

## What it does

Paste a link, give it a title and a note if you want one, and it stays here.
Mark one read when you are done with it. Once a day the plugin's agent reads
whatever is new and hangs two or three sentences on it, so the list tells you
what is in each link before you open it.

## Works with nothing configured

The list needs no key, no provider and no network. Adding, marking read,
removing and keeping the list are useful the moment it is installed. Only the
summaries need a model: without one the entries simply say they are waiting,
and nothing else changes.

## Where the list lives

In `data/stack.json`, inside this plugin's own folder. The page writes it and
the agent writes it, and there is only ever one copy, which is why a summary
written overnight is on screen the next time you look at the page. A stack saved
by an earlier version is carried into that file the first time the page opens.

## What it may do

- **No network.** The page cannot reach the internet. Reading a link happens in
  the agent, through the one tool below.
- **Its own folder only.** Every file it reads or writes is under this plugin's
  folder. It cannot see your workspace.
- **Three tools:** `extract_web_text` reads the text of a link you saved, and
  `read_file` and `write_file` reach this plugin's own folder and nothing
  above it.

It sends nothing and publishes nothing.

## Turning it off

Switch the plugin off on the Plugins page and the daily run stops with it. The
list stays where it is.
