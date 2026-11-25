"""Git msg-filter helper: drop Cursor co-author trailers from commit messages."""
import sys

msg = sys.stdin.read()
lines = [line for line in msg.splitlines(keepends=True) if "Co-authored-by: Cursor" not in line]
sys.stdout.write("".join(lines))