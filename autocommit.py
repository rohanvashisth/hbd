import os
import subprocess
import sys
import time

PROJECT_DIR = os.path.dirname(os.path.abspath(__file__))
CHECK_INTERVAL_SECONDS = 10

def run_cmd(args):
    try:
        result = subprocess.run(
            args,
            cwd=PROJECT_DIR,
            capture_output=True,
            text=True,
            check=True
        )
        return 0, result.stdout.strip(), result.stderr.strip()
    except subprocess.CalledProcessError as e:
        return e.returncode, e.stdout.strip(), e.stderr.strip()

def has_upstream():
    code, out, _ = run_cmd(["git", "rev-parse", "--abbrev-ref", "--symbolic-full-name", "@{u}"])
    return code == 0 and bool(out)

def get_current_branch():
    code, out, _ = run_cmd(["git", "branch", "--show-current"])
    return out if (code == 0 and out) else "main"

def main():
    print(f"[Auto-Commit] Service started for hbd at: {PROJECT_DIR}", flush=True)
    print(f"[Auto-Commit] Monitoring workspace every {CHECK_INTERVAL_SECONDS}s...", flush=True)

    code, stdout, stderr = run_cmd(["git", "rev-parse", "--is-inside-work-tree"])
    if code != 0 or stdout != "true":
        print(f"[Auto-Commit] Error: Not inside a git repository: {stderr}", file=sys.stderr, flush=True)
        sys.exit(1)

    while True:
        try:
            code, status_out, status_err = run_cmd(["git", "status", "--porcelain"])
            if code == 0 and status_out:
                print(f"\n[Auto-Commit] Changes detected:\n{status_out}", flush=True)

                # Stage changes
                add_code, _, add_err = run_cmd(["git", "add", "-A"])
                if add_code != 0:
                    print(f"[Auto-Commit] Failed to stage changes: {add_err}", file=sys.stderr, flush=True)
                    time.sleep(CHECK_INTERVAL_SECONDS)
                    continue

                # Commit
                timestamp = time.strftime('%Y-%m-%d %H:%M:%S')
                commit_msg = f"Auto-commit: changes detected at {timestamp}"
                commit_code, commit_out, commit_err = run_cmd(["git", "commit", "-m", commit_msg])

                if commit_code == 0:
                    print(f"[Auto-Commit] Successfully committed: '{commit_msg}'", flush=True)

                    # Push to origin
                    branch = get_current_branch()
                    print(f"[Auto-Commit] Pushing changes to origin/{branch}...", flush=True)

                    push_args = ["git", "push", "-u", "origin", branch] if not has_upstream() else ["git", "push", "origin", branch]
                    push_code, push_out, push_err = run_cmd(push_args)
                    if push_code == 0:
                        print("[Auto-Commit] Successfully pushed changes to GitHub remote.", flush=True)
                        # Also keep gh-pages branch in sync for instant GitHub Pages hosting
                        sync_code, _, _ = run_cmd(["git", "push", "origin", f"{branch}:gh-pages"])
                        if sync_code == 0:
                            print("[Auto-Commit] Successfully updated origin/gh-pages.", flush=True)
                    else:
                        print(f"[Auto-Commit] Push to remote failed: {push_err}", file=sys.stderr, flush=True)
                else:
                    print(f"[Auto-Commit] Commit failed: {commit_err}", file=sys.stderr, flush=True)
            elif code != 0:
                print(f"[Auto-Commit] Error checking git status: {status_err}", file=sys.stderr, flush=True)
        except Exception as e:
            print(f"[Auto-Commit] Unexpected error in loop: {e}", file=sys.stderr, flush=True)

        time.sleep(CHECK_INTERVAL_SECONDS)

if __name__ == "__main__":
    main()
