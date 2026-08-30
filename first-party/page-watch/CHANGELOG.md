# Changelog

## 1.0.0

First release. A watch list of web pages, stored as `data/pages.json` with one
text copy per page under `snapshots/`, compared line by line with a longest
common subsequence over the lines. Timestamps, counters and lines that differ
only in their digits are treated as noise, currency lines are never filtered,
and a fetch that failed keeps the stored copy rather than reporting the page as
emptied. A Monday morning run writes one report per day to `reports/`.
