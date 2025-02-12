import os
import random
import datetime
import subprocess

# Number of days to commit in the past (adjust as needed)
DAYS_TO_FILL = 365  

# Commit frequency per day (random to look natural)
MIN_COMMITS = 1  
MAX_COMMITS = 5  

# File to modify
FILE_NAME = "activity_log.txt"

def commit_changes(commit_date):
    """Make a commit with the specified date."""
    with open(FILE_NAME, "a") as file:
        file.write(f"Commit on {commit_date}\n")
    
    subprocess.run(["git", "add", FILE_NAME], check=True)
    subprocess.run(["git", "commit", "--date", commit_date, "-m", f"Auto commit for {commit_date}"], check=True)

def main():
    """Generate commits for the past DAYS_TO_FILL days."""
    start_date = datetime.datetime.today() - datetime.timedelta(days=DAYS_TO_FILL)

    for i in range(DAYS_TO_FILL):
        commit_date = (start_date + datetime.timedelta(days=i)).strftime("%Y-%m-%dT12:00:00")
        
        for _ in range(random.randint(MIN_COMMITS, MAX_COMMITS)):
            commit_changes(commit_date)

    # Push to GitHub
    subprocess.run(["git", "push", "origin", "main"], check=True)

if __name__ == "__main__":
    main()
