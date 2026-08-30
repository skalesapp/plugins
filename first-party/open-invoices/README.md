# Open Invoices

The list of who still owes you money, and the reminder letter already written.

## What it does

Every invoice you add is kept in one file inside this plugin's folder, with its
number, the customer, the amount and currency, the invoice date and the due
date. The page shows what is open and what is overdue, counts each currency on
its own, and sorts the overdue ones first.

Every weekday morning the plugin's agent runs. It reads the list, works out what
is past its due date, and writes the reminder letter for each one in the stage
it has reached: a friendly reminder first, then a first formal reminder, then a
second formal one. It also reads recent mail for anything that names an open
invoice number or reads as a payment confirmation, and notes that on the invoice
as a hint. It never marks anything paid, because a mail is a hint and not a bank
statement. Marking an invoice paid is yours, on the page, in one click.

## The sending waits for you

The run prepares the letter and stops. It never sends anything, on any machine,
in any mode: a run on a schedule has nobody at the screen. The page shows each
letter next to its invoice, lets you edit it and remembers your edit, and the
Send button raises an approval card naming the recipient and the whole text that
you press yourself. Nothing leaves this machine any other way.

## What it may do

- **No network.** The page cannot reach the internet.
- **Its own folder only.** Every file it reads or writes is under this plugin's
  folder. It cannot see your workspace or any other plugin.
- **Six tools:** `create_task` writes one to-do on your task list when there is
  something to do; `list_directory` and `read_file` look at this plugin's own
  files; `list_emails` reads recent mail in INBOX and nothing else, and cannot
  delete, move or reply to anything; `send_email` sends one reminder and only
  behind a card you press; `write_file` saves the invoice list and the letters
  inside this plugin's folder.

## Without a mailbox

Only the mail half needs an account. With no mailbox connected the page says so
and where to add one, and the table, the totals, the overdue count and the
letters keep working: everything except reading your mail is arithmetic.

## Without a provider

The letters are written by the morning run, which needs a model provider. With
none configured the run does nothing, the page stays useful, and the list, the
totals and the sending are unaffected.

## Turning it off

Switch the plugin off on the Plugins page and the weekday schedule stops with
it. The invoice list and the letters already written stay where they are.
