# Daily Brief

A morning brief, written for you at 07:30 and kept on this machine.

## What it does

Once a day the plugin's agent looks at today's calendar, the weather, your open
tasks, the schedule for the day, the mail that plainly wants an answer, and
anything you asked Skales to remember, and writes a short brief. The brief is
saved as a Markdown file inside this plugin's own folder. The page shows the
last seven.

## What it may do

- **No network.** The page cannot reach the internet.
- **Its own folder only.** Every file it reads or writes is under this plugin's
  folder. It cannot see your workspace.
- **Nine tools, and every one of them only READS:** `list_calendar_events`
  reads the day ahead and cannot create, move or delete an appointment;
  `get_weather`; `list_emails` reads the inbox and cannot answer, move or
  delete a message; `list_tasks`; `list_scheduled_tasks`; `memory_search`;
  and `read_file`, `write_file` and `list_directory` inside this plugin's
  own folder.

It sends nothing and publishes nothing. A run on the schedule has nobody at the
screen, so anything that would send, publish or spend would wait for a click -
and this plugin asks for none of those tools in the first place.

## What it does with your mail

It reads subjects and senders to name the few that want an answer today. It
never quotes a body into the brief and it never does what a message asks. Text
inside an email is somebody else's writing, not an instruction to this plugin.

## Without a provider

The brief needs a model to write it. With no provider configured the run does
nothing and the page stays empty and says where to add one, rather than showing
an error. The calendar, the weather and the mailbox each need their own setup;
a missing one costs a line in the brief and nothing else.

## Turning it off

Switch the plugin off on the Plugins page and its schedule stops with it. The
briefs already written stay where they are.
