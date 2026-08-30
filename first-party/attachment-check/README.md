# Attachment Check

Somebody mailed you a PDF, or a line with a link in it. This page looks at
either one before you do, and it opens neither.

## What it does

**A file, in two steps.** Drop it on the page, or pick it. Step one computes the
file's SHA-256 on this machine and asks VirusTotal whether it has ever seen that
fingerprint. Only the 64 characters of the fingerprint travel; the file stays
where it is. If VirusTotal knows the file, you get the counts, the engines that
flagged it and what each of them called it, next to what VirusTotal holds about
it: the name it knows it by, the type, the size, when it was first submitted and
how often. If VirusTotal has never seen it, the page says so plainly, because
that is the normal answer for a document somebody wrote for you and it is not a
verdict either way.

Step two is the upload, and it happens only when you press its own button.

**A link.** Paste the address, or the whole line it arrived in. No browser
window opens. The address is fetched, and the page reports where it ends up,
what host that really is, and what the page says about itself, read as text and
never rendered. Six things are named when they apply: the final host is not the
one you pasted, the address is a raw IP, the connection is not https, the host is
punycode, there is a name in front of an at sign, and the visible link text
disagrees with the target it actually carries. With a key saved, the final host
is looked up at VirusTotal as well; that lookup is a read and publishes nothing.

Nothing is scored and nothing is called safe. The page reports facts.

The last ten checks are kept on this machine so a reload shows what has already
been looked at, and one button clears them.

## Uploading a file publishes it

This is why the file half has two steps and why the order is what it is.
VirusTotal shares the files submitted to it with the security industry, and
their subscribers can download those files. An upload cannot be taken back. An
invoice, a contract, a payslip or a draft is exactly the kind of file that must
not be handed over just because somebody wanted to know whether it was safe.

So this page never uploads on its own. It never uploads as a fallback when a
lookup fails. It uploads one file, the one you just pressed the button for, and
the button carries that consequence in its own words directly above it. The
offer only appears where an upload is the only remaining option: when
VirusTotal has never seen the fingerprint, when there is no key to look one up
with, or when this machine cannot compute a fingerprint inside the page at all.

## What it may do

- **No network.** The page itself cannot reach the internet. Everything it
  learns comes back through the three tools below.
- **Its own folder only.** It reads and writes inside this plugin's own folder
  and cannot see your workspace.
- **Three tools:** `http_request` fetches with GET and nothing else, which is
  how the pasted address is followed and how the VirusTotal lookups are made;
  `extract_web_text` reads the text of the address you pasted;
  `scan_file_virustotal` is the upload, and it runs only on the second press.

It sends no mail, posts nothing and buys nothing.

## The key, and what it is for

The lookups use your own VirusTotal key, pasted into the box on the page and
kept in this plugin's own storage on this machine. It travels in the
`x-apikey` header and never in an address, because a key in an address ends up
in logs. Get one at https://www.virustotal.com/gui/my-apikey.

The free tier allows 4 requests a minute and 500 a day, and VirusTotal states
that its public API is not for use in commercial products or services. The key
here is yours, used for your own lookups on your own machine, which is what that
tier is for.

The upload in step two is a different path: it runs through the app's own scan
tool, which reads its VirusTotal key from Settings, then Integrations. If you
want both steps to work, a key belongs in both places.

## Without a key

The link half needs no key and keeps working with none: redirects, hosts, flags
and page text all come back without one. The file half says where a key comes
from instead of failing at a dead control, and it still offers the upload as the
one thing it can do without a key, with the same warning as always.

## Turning it off

Switch the plugin off on the Plugins page. Nothing is left running. The key and
the last ten checks stay in this plugin's folder until you remove them on the
page or remove the plugin.
