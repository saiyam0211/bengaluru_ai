import os
import random
import datetime
import subprocess

FILE_NAME = "activity_log.txt"
DAYS_TO_FILL = 365  
MIN_COMMITS = 5  
MAX_COMMITS = 50  

def commit_changes(commit_date):
    """Make a commit with the specified date."""
    with open(FILE_NAME, "a") as file:
        file.write(f"Commit on {commit_date}\n")

    subprocess.run(["git", "add", FILE_NAME], check=True)
    subprocess.run(["git", "commit", "--date", commit_date, "-m", f"Auto commit for {commit_date}"], check=True)

def main():
    """Generate commits with a random number each day."""
    start_date = datetime.datetime.today() - datetime.timedelta(days=DAYS_TO_FILL)

    for i in range(DAYS_TO_FILL):
        commit_date = (start_date + datetime.timedelta(days=i)).strftime("%Y-%m-%dT12:00:00")
        commit_count = random.randint(MIN_COMMITS, MAX_COMMITS)

        for _ in range(commit_count):
            commit_changes(commit_date)

    # Push to GitHub
    subprocess.run(["git", "push", "origin", "main"], check=True)

if __name__ == "__main__":
    main()
