# Exposure Check

Whether the passwords and the addresses your business runs on have already
turned up in a breach.

## What it does

Three answers, on three tabs.

**A password, checked without sending it.** Type a password and the page hashes
it here, in the page. The first five characters of that hash go to the Pwned
Passwords range service, which answers with every hash it holds that starts the
same way. The remaining 35 characters are matched here, against that list. The
answer is a count: how many times this exact string has turned up in breach
data. It is not a score, not a strength meter, and not advice about capital
letters. A password with a count is one an attacker already has on a list.

**The services you use.** List the services your business depends on, a domain
each, and each one is checked against the public breach list. The answer says
whether it has been breached, when, how many accounts, and exactly which
categories of data came out, worst first. "Passwords and physical addresses" is
a different morning from "email addresses", and the page sorts on that before it
sorts on the counts. The whole list can also be loaded and searched.

**An address, with your own key.** Looking up an address is the one paid part of
the service. With a key pasted in, an address you control is checked against
every breach on the list.

## What leaves this machine

This is the reason to install it, so it is written out in full.

- **The password half sends five characters.** They are the first five of the
  SHA-1 of the password, and nothing else goes out. The password is never sent,
  never stored, and not kept in the page after the answer. The reply is padded
  to a common size on request, so even how much comes back says nothing about
  which five characters were asked for. The service is never told which of its
  answers was the one being looked for.
- **The services half sends a domain.** A domain is public. Asking whether
  dropbox.com has been breached says nothing about you.
- **The address half sends the address.** There is no way around that: it is
  what the endpoint answers on. It happens only when you press the button, only
  with a key you pasted yourself, and the key travels in a header rather than in
  an address, so it does not end up in a log. Check only addresses you control.

The record kept on this page holds the services, the addresses and their last
answer. For a password it holds only the fact that a check ran and how it came
out, never the password and never its hash.

## What it may do

- **No network.** The page itself cannot reach the internet. Every request is
  made by Skales, on the page's behalf, through the one tool below.
- **Its own folder only.** It reads and writes nothing outside this plugin's
  folder, and it asks for no file tools at all.
- **One tool:** `http_request`, GET only, to two hosts:
  api.pwnedpasswords.com for the hash prefix, and haveibeenpwned.com for the
  breach list and the address lookup.
- **No model provider.** Nothing here is written by a model. Two of the three
  halves need no key of any kind.

It sends no mail, writes no calendar, and spends nothing.

## Without a Have I Been Pwned key

The password half and the services half need no key, no account and no
provider, and they work the moment the plugin is installed. The address half is
the paid endpoint: the cheapest tier is about USD 4.39 a month for ten requests
a minute, and the key comes from haveibeenpwned.com/API/Key. Without one that
tab says so and names where to get it, and the rest of the page is unaffected.

## What an answer can and cannot say

A count from the Pwned Passwords corpus means the password is in that corpus.
No count means it is not in that corpus on that day. Neither is a promise about
the password. The same holds for the breach list: a service with nothing against
its name is a service that is not on the list, which is not the same as a
service that was never breached.

Skales hands a page only the opening of a reply, and the range answer for a
password is far longer than that. A password whose line is not in the part that
arrives, and that sorts past the part that arrived, is reported as unanswered
rather than as clean: a false "not found" would be a false reassurance, and this
page does not give one. Checking a service by domain is unaffected, because
those answers are small.

## Turning it off

Switch the plugin off on the Plugins page. Nothing runs on a schedule, so
switching it off stops everything it can do. The record and the saved key stay
in the plugin's own storage until you press "Clear the record" or remove the
plugin.
