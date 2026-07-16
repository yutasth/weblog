---
name: publish-diary-entry
description: Add or update a dated Markdown diary entry in this Weblog repository, sanity-check the date against today and yesterday, validate it, commit only the intended diary change, and push it to origin. Use when the user provides diary text and a date, asks to update or publish a diary entry, or requests the recurring diary-update/commit/push workflow for files under `_diary/`.
---

# Publish Diary Entry

Turn a date and supplied diary text into a correctly formatted entry in this repository, then publish the change through Git.

## Workflow

1. Confirm that the working directory is this Weblog repository by checking for `README.md`, `_diary/`, and the diary naming convention. Read `README.md` and one or two nearby entries when the format may have changed.
2. Resolve the requested date:
   - Determine today's date in the user's `Asia/Tokyo` timezone and calculate yesterday's date before interpreting the request.
   - Strongly expect a new request to be for today or yesterday. Resolve relative phrases such as `今日` and `昨日` from those dates.
   - Convert the date to `YYYYMMDD`. When the year is omitted, first map the month and day to the most plausible recent date rather than blindly combining them with the repository chronology.
   - If the requested or inferred date is neither today nor yesterday, pause before editing and ask the user to confirm the exact date. Mention today and yesterday in the confirmation so likely month/day slips are visible.
   - Skip that extra confirmation when the user explicitly says the entry is a backfill, names an older date and confirms it is intentional, or is correcting a previously confirmed date.
   - Ask the user if the year or target entry still cannot be resolved safely.
   - List `_diary/YYYYMMDD*.md` before choosing the target.
   - If no entry exists, create `_diary/YYYYMMDD1.md`.
   - If exactly one entry exists and the user asks to update that day's diary, update it.
   - If multiple entries exist and the intended sequence number is unclear, ask before editing.
3. Check `git status --short` before editing. Preserve all unrelated user changes.
4. Format the entry as:

   ```markdown
   ---
   ---

   本文
   ```

   Use blank lines between paragraphs and Markdown `---` for major section breaks. Treat surrounding triple quotes in the prompt as delimiters, not diary content. Preserve the supplied Japanese wording, spelling, punctuation, capitalization, and paragraph structure unless the user explicitly asks for editing or proofreading.
5. Apply the smallest possible patch. Do not modify generated archives or other files; Jekyll derives titles, URLs, daily pages, and monthly pages from the filename.
6. Verify the final file, run `git diff --check`, and inspect the exact change. A full Jekyll build is unnecessary for a content-only diary entry unless repository structure or rendering behavior also changed.
7. Publish the entry:
   - Stage only the intended `_diary/...md` path with an explicit path argument.
   - Recheck the staged diff and ensure unrelated changes are absent.
   - Commit with a concise Japanese message such as `5月16日の日記を追加` or `5月16日の日記を更新`.
   - Push the current branch to its configured `origin` branch. For the normal repository workflow, push `main` with `git push origin main`.
8. Never amend an existing commit, force-push, discard changes, or include unrelated files. If a normal push is rejected, stop and report the exact reason rather than rewriting history.
9. Report the diary path, commit hash and subject, pushed branch, and final working-tree status.

## Authorization boundary

Invoking this skill requests the complete add-or-update, commit, and push workflow for the supplied diary entry. Keep every mutation limited to that entry. Ask for confirmation only when required by the execution environment or when the date, target file, or publication scope is genuinely ambiguous.
