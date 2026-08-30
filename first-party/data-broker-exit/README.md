# Data Broker Exit

Hundreds of companies sell your name, your address, your telephone number and
your relatives without ever having met you. Getting out is not difficult, it is
long. This does the long part.

## What it does

It fetches the California data broker registry, the list every company that
brokers personal data has to be on: 603 entities, each with the trading names
it uses, the sites it actually operates, a contact address and an address for
exercising privacy rights. One request to a parent company reaches the dozen
resold people-search brands underneath it, which is why the registry is the
backbone here and why there is no hand-maintained list of brokers in this
plugin: that list would be wrong within a season.

From there:

- **The California DROP request comes first**, if you live there. Since
  1 January 2026 one request at <https://privacy.ca.gov/drop/> reaches every
  registered broker, and since 1 August 2026 each of them has to check that
  list at least every 45 days and delete what matches. For a Californian that
  single step does more than hundreds of separate letters. It is a consumer web
  platform, so this plugin cannot file it. It puts it at the top of the page
  and marks it done when you say so.
- **The letter lane.** For each broker you select, a request written to the
  contact address the registry records for that company, sent from your own
  mailbox. GDPR Articles 15 and 17 if you are in the EU or the UK, the
  California delete and opt-out sections if you are in the United States, and a
  plainly worded request citing no statute anywhere else.
- **The form lane.** Where the only route is the company's own page, you get
  the exact address and what it will ask you for, as one task you do yourself.
- **The deadline.** One month under GDPR, 45 days under the California
  statute, counted from the day the letter actually went out. Anything past it
  with no substantive answer gets a follow-up drafted that names how many days
  late it is and which article set the period.
- **The re-check.** Every Tuesday morning it reads your mailbox for replies,
  classifies what came back, and writes one digest. Not a stream of
  interruptions: one file per run.

## What it does not attempt, and why

**It never fills in a web form.** Most people-search opt-out forms sit behind
anti-bot walls. Probing 28 of them returned 403 for the majority, Whitepages,
BeenVerified, Intelius, TruthFinder, Instant Checkmate, Radaris, MyLife,
PeopleFinders, FastPeopleSearch and TruePeopleSearch among them. A plain HTTP
client cannot drive those pages and this plugin does not pretend otherwise. It
never touches a CAPTCHA and never tries to look like a browser. This is a
design decision rather than an apology: the letter lane and the registry lane
are lawful, reliable and auditable, and the form lane is two minutes of your
own time in your own browser, which is the only client those sites answer.

For the same reason it never checks whether an opt-out page is alive. A 403
from one of those sites proves nothing at all, not even that the address
exists, so no broker here is ever shown as unreachable or retired on the
strength of an HTTP status.

**It never handles an identity document, and never a Social Security number.**
Several brokers demand a driving licence or a passport scan, and Enformion is
reported to ask for a Social Security number. There is no field for any of
those, nothing of the kind is stored, and none of it goes into a letter. Where
a broker demands one, that is recorded as a decision for you, with one line
noting that under GDPR such a demand is often disproportionate: a controller
who already has an authenticated channel usually may not require a copy of an
identity document. The choice is entirely yours.

**Public records are out of scope.** Voter rolls, property records and court
filings are not broker data. Nobody can remove them and promising to would be
a lie.

**It only does your own data.** Acting for a partner, a parent or a client
needs their written authorisation, which is outside what this does. It is also
practical: PeopleConnect is reported to refuse requests filed by a removal
service even with a signed authorisation, which is exactly why the requests
here come from your own mailbox as the data subject rather than from a piece of
software acting for you.

## Nothing is sent without you

A letter goes out only when you press an approval card naming the recipient and
the text. That is true on any machine, in any mode, and in the Tuesday run,
which has nobody at the screen: it prepares and the sending waits. The agent
half has no way to send at all.

The recipient of a letter is always the contact address the registry records
for that company. Never an address that turned up in a reply, in a web page, or
anywhere else. A reply asking you to write somewhere else is kept as a note and
acted on by nobody. That rule is what stops a dossier of your personal data
being posted to whoever asks for it.

## What it may do

- **No network.** The page cannot reach the internet.
- **Its own folder only.** Every file it reads or writes is under this
  plugin's folder. It cannot see your workspace or any other plugin.
- **Six tools:** `http_request` fetches the regulator's registry file and,
  if you ask for it, the community list, and nothing else; `list_directory`
  and `read_file` look at this plugin's own folder; `write_file` writes the
  letters, the digests and the case files there; `list_emails` reads your
  inbox to find replies; `send_email` sends one letter, and only behind the
  approval card above.

## Without a mailbox

Everything except sending and reading replies works with no mailbox at all: the
registry, the selection, the letters, the deadlines and the human list. With no
account configured the page says which screen has one and carries on, rather
than showing a blank panel.

## What an opt-out is actually worth

An opt-out is not a deletion, and neither of them is permanent. Brokers rebuild
their files from fresh public-records feeds, and a suppression can be quietly
reversed. Re-listing is not a risk, it is the norm: MyLife is reported to
re-list within three to six months and PeopleConnect within six to twelve. That
is the only reason the weekly re-check exists, and it is why nothing here ever
declares victory.

Two things follow. **Never close your account at a broker to get removed:**
deleting an account can wipe the suppressions you already have, so this plugin
never advises it. And a request can be lawfully refused, on grounds a
controller is entitled to rely on, among them a legal obligation to keep the
data, a claim being established or defended, and in the United States the
statutory exemptions. Nothing here promises an outcome.

Two more traps worth knowing. LiveRamp owns Acxiom and their opt-outs are
separate, so doing one does not do the other. And truepeoplesearch.net and
fastpeoplesearch.io are different companies from the .com sites of nearly the
same name: opting out of one does nothing for the other.

Guides still circulate two dead ends. corelogic.com/privacy is gone and the
company is now Cotality, whose portal is at
<https://www.cotality.com/legal/online-privacy-portal>. Oracle shut its data
broker business in September 2024 and its opt-out registry no longer exists, so
there is nothing there to do.

The community list this page can fetch is the Big Ass Data Broker Opt-Out List
by Yael Grauer, licensed CC BY-NC-SA. It is a volunteer list rather than a
regulator's, it is shown apart from the registry, it is never merged into it,
and no letter is ever written from it.

## Turning it off

Switch the plugin off on the Plugins page and the Tuesday run stops with it.
Everything already written stays where it is: your details, the working list,
every letter and every digest are plain files in this plugin's folder.
