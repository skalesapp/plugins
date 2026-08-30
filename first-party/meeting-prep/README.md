# Meeting Prep

You have a meeting at ten with a company you half remember. This plugin reads
the day's calendar, works out who you are actually meeting, looks them up, and
leaves a one page briefing waiting before the meeting starts.

## What it does

Twice a day, at 06:00 and at 12:00, so both halves of the day are covered, the
plugin's agent reads the meetings of today and tomorrow. For each one it works
out the counterpart from the title, the attendees and the location. An internal
meeting, a personal entry, a reminder or a block of focus time gets no briefing
and is recorded as skipped, with the reason. Everything else is looked up with a
web search and two or three pages read in full, plus a search of what you have
already told Skales to remember. Your own notes outrank the web, and the
briefing says which is which.

The briefing is a Markdown file in this plugin's own folder, under 350 words:
when and where the meeting is, who is on it, what the company appears to do and
how big it looks, anything recent worth knowing, what your notes say, three or
four questions worth asking, and one line on what stayed unclear. Every claim
that came off the web carries its source address on the same line.

The page shows today and tomorrow in time order, each meeting with its state:
prepared, skipped with the reason, nothing found, or not yet. A **Prepare now**
button sits on every meeting that has no briefing, for the one you need in ten
minutes: it gathers the sources on the spot, without a model, and saving what it
gathered stops at a card you press. The last twenty briefings are listed
underneath and can be searched by name.

A briefing the page gathered itself is shown in full on the page. A briefing
written by a scheduled run is a file in the plugin's folder, and the card names
that file: this version of Skales hands a plugin page the listing of a folder
but not the text inside a file, so the page reports where the briefing is rather
than showing an empty one.

## What it will not look up about a person

When the counterpart is a person rather than a company, the briefing is limited
to their public professional role, and it says that it is limited. The plugin
does not infer anybody's employer, salary, age, household or private
circumstances, and it does not assemble a profile of a private individual out of
scattered sources. It reports what the sources actually say and nothing else:
where there is nothing, it writes "nothing found" rather than a sentence that
sounds right. A briefing that invents a fact about somebody you are about to sit
across from is the worst thing this plugin could do, so it is built to say less
rather than more.

## What it may do

- **No network.** The page cannot reach the internet on its own.
- **Its own folder only.** Every file it reads or writes is under this plugin's
  folder. It cannot see your workspace and it cannot see another plugin.
- **Seven tools:** `extract_web_text` reads the text of a page the search
  found; `list_calendar_events` reads the meetings of today and tomorrow and
  cannot create, move or delete anything; `list_directory` lists this plugin's
  own briefings folder; `memory_search` searches what you asked Skales to
  remember; `read_file` reads this plugin's own files; `search_web` looks up
  the counterpart by name; `write_file` writes the briefings inside this
  plugin's folder.

It sends nothing and publishes nothing. Writing a file is a step that Skales
confirms with you, on any machine and in any mode, so a save started from the
page waits at a card you press.

## Without a calendar

With no calendar connected the page says so and names the screen that has the
setting, rather than showing an error. Nothing is written.

## Without a provider

The briefings are written by a model, so with no provider configured the
scheduled runs write nothing. The page still lists your meetings for today and
tomorrow, because reading the calendar needs no model, and **Prepare now** still
gathers the sources.

## Turning it off

Switch the plugin off on the Plugins page and both schedules stop with it. The
briefings already written stay where they are.
