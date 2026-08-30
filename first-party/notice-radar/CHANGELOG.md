# Changelog

## 1.0.0

First release. A list of contracts and subscriptions with term, notice period,
next renewal and the last day notice can still be given, computed with month
arithmetic that clamps the day of the month and survives leap years. A daily run
rolls past renewal dates forward, writes one warning and one draft cancellation
letter per contract per cycle, and adds a task. Writing the calendar is offered
on the page, behind a card a person presses.
