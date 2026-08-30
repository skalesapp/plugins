# Receipt Inbox

The month-end job, done in the background: every receipt and invoice that
arrived by mail, collected into one month sheet you can correct and hand on.

## What it does

Once a day in the evening the plugin's agent reads your inbox, works out which
mails are receipts, invoices or payment confirmations, and pulls out the vendor,
the date, the document number, the gross amount, the currency and the VAT when
the mail states it. Everything lands in one file inside the plugin's own folder,
`data/receipts.json`, keyed so the same mail read on two evenings is one row
rather than two.

The page shows one month at a time: a table you can edit in every cell, a total
per currency, a count, and a marker on the rows the run was not sure about. The
moment you change a cell, that row is yours and no later run touches it again.
You can add a receipt that never came by mail, and you can remove one.

From there the month leaves in two shapes: a CSV you can copy or write to
`exports/<year>-<month>.csv`, and a mail to your accountant with the table in
its body.

## What it may do

- **No network.** The page cannot reach the internet.
- **Its own folder only.** Every file it reads or writes is under this plugin's
  folder. It cannot see your workspace and it cannot see another plugin.
- **Five tools:** `list_directory` lists the CSV files this plugin has already
  written; `list_emails` reads recent mail from INBOX, and reading is all it
  can do, so nothing is moved, marked or deleted; `read_file` reads the
  ledger; `send_email` sends the month to the address you typed;
  `write_file` writes the ledger and the CSV, inside this folder.

## Sending stops at a card

The one outward step is the mail to the accountant, and it never happens on its
own. Pressing the button asks Skales to show you a card naming the recipient and
the content, and nothing leaves the machine until you answer it. That is true on
any machine, in any mode, and in a scheduled run as well: the agent is told not
to send at all, and a run has nobody at the screen to press anything.

A plugin cannot attach a file of its own to a mail, so the month's table travels
in the body of the mail. That is also why the CSV on the page is there to copy
and to save.

## Without a mailbox

With no IMAP account configured, nothing is read from mail. The page says so and
stays a ledger you fill in by hand: the form, the table, the totals, the CSV and
the mail all keep working on what is in the file.

## Without a provider

Reading new mail needs a model to do the reading. With no provider configured
the evening run does nothing at all, and the page keeps working on what is
already in the ledger rather than showing an error.

## Turning it off

Switch the plugin off on the Plugins page and the evening run stops with it. The
ledger and any CSV already written stay where they are.
