# Notice Radar

Every contract and subscription you pay for, with its term, its notice period,
and the last day you can still cancel it.

## What it does

You record a contract once: what it is, who bills you, what it costs, when it
started, how long the term runs and how much notice it needs. From that the page
computes the next renewal date and the date that actually matters - the last day
notice can still be given, which is the renewal minus the notice period. The
list is sorted by whichever deadline is closest, and a deadline inside 45 days
is marked, inside 14 days more sharply.

A contract whose deadline has already gone by has renewed. It is not left in the
past: the entry names the renewal that now stands and cannot be stopped, and
gives you the deadline of the next cycle instead, because a contract that rolled
over is still a contract.

Once a day, early, the plugin's agent rolls any renewal date that has passed
forward, and for anything whose deadline falls inside the next 45 days it writes
a note into `notices/` - the exact last day, how many days that is, where to
cancel, and a draft cancellation letter you can send or post. It also puts one
task on your task list. Each contract is warned once per cycle, never twice.

## Writing the calendar always waits for a click

The page offers, per contract, **Put the deadline in my calendar**. That raises
a card you press, and the entry is written only then. The scheduled run never
calls it: a run at six in the morning has nobody at the screen, so it prepares
the warning and the letter, and the calendar waits for you.

## What it may do

- **No network.** The page cannot reach the internet.
- **Its own folder only.** Every file it reads or writes is under this plugin's
  folder. It cannot see your workspace or any other plugin.
- **Five tools:** `create_calendar_event` writes ONE entry, from the page,
  behind a card you press; `create_task` adds a todo to your task list;
  `list_directory`, `read_file` and `write_file` reach only this plugin's
  own folder.

It sends no mail, publishes nothing and cancels nothing on your behalf. The
letter is a draft in a file; sending it is yours.

## Without a model provider

The list, the arithmetic, the deadlines, the pills and the calendar button all
work with no provider, no key and no network. The only part that needs a model
is the drafted cancellation letter, and without one the page says where to add a
provider rather than showing an error.

## Turning it off

Switch the plugin off on the Plugins page and the daily run stops with it. The
contracts file and the notes already written stay where they are.
