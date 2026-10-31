# [Bug] Orders list shows the same order on two pages (and skips others)

Reported by: Priya (Support)

On the orderdesk dashboard, when I page through Orders, some orders appear
on both page 1 and page 2, and some orders never show up at all. It mostly
happens after a bulk import. Total count says 60, but I only see ~50 unique
orders when I click through all pages.

Steps:
1. Import a batch of orders (they all get the same created time)
2. Open Orders, click through page 1 -> 6
3. Compare order numbers across pages: duplicates, and some are missing

Expected: every order appears exactly once across all pages.
