import os
import random
import datetime
import subprocess

FILE_NAME = "activity_log.txt"
DAYS_TO_FILL = (datetime.datetime.today() - datetime.datetime(2025, 2, 1)).days  # Days since Feb 1, 2025

# Random commit distribution settings
HEAVY_RANGE = (20, 30)  # One day per week gets 20-30 commits
MEDIUM_RANGE = (10, 20)  # One day per week gets 10-20 commits
LIGHT_RANGE = (0, 10)    # Other days get 0-10 commits


def commit_changes(commit_date, commit_count):
    """Make a commit with the specified date and count."""
    with open(FILE_NAME, "a") as file:
        for _ in range(commit_count):
            file.write(f"Commit on {commit_date}\n")
            subprocess.run(["git", "add", FILE_NAME], check=True)
            subprocess.run(["git", "commit", "--date", commit_date, "-m", f"Auto commit for {commit_date}"], check=True)


def reset_git_history():
    """Resets Git history (removes all previous contributions)."""
    subprocess.run(["git", "checkout", "--orphan", "new_branch"], check=True)
    subprocess.run(["git", "add", "-A"], check=True)
    subprocess.run(["git", "commit", "-m", "Reset history"], check=True)
    subprocess.run(["git", "branch", "-D", "master"], check=True)
    subprocess.run(["git", "branch", "-m", "master"], check=True)
    subprocess.run(["git", "push", "-f", "origin", "master"], check=True)


def main():
    """Generate commits with varied frequency while skipping one day per week."""
    reset_git_history()  # Clear previous contributions
    start_date = datetime.datetime(2025, 2, 1)
    
    for week in range(DAYS_TO_FILL // 7 + 1):
        week_start = start_date + datetime.timedelta(days=week * 7)
        days = list(range(7))
        
        heavy_day = days.pop(random.randint(0, len(days) - 1))  # 20-30 commits
        medium_day = days.pop(random.randint(0, len(days) - 1))  # 10-20 commits
        skip_day = days.pop(random.randint(0, len(days) - 1))  # No commits
        
        for day in range(7):
            commit_date = (week_start + datetime.timedelta(days=day)).strftime("%Y-%m-%dT12:00:00")
            if day == heavy_day:
                commit_count = random.randint(*HEAVY_RANGE)
            elif day == medium_day:
                commit_count = random.randint(*MEDIUM_RANGE)
            elif day == skip_day:
                commit_count = 0
            else:
                commit_count = random.randint(*LIGHT_RANGE)
                
            commit_changes(commit_date, commit_count)
    
    # Push to GitHub
    subprocess.run(["git", "push", "origin", "master"], check=True)


if __name__ == "__main__":
    main()
