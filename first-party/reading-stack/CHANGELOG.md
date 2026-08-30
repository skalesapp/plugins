# Changelog

## 1.1.0

Summaries are real now. The list moved out of the plugin store and into
`data/stack.json`, which the agent can read as well, so a daily run writes two
or three sentences about each new link instead of the page pasting the first
four hundred characters of the text. Nothing that was already on the stack is
lost: the old list is carried into the file the first time the page opens.

## 1.0.0

First release. A link list with title, note and read state, stored in the
plugin's own storage and usable offline, plus an optional button that hangs a
short summary on the unread entries.
