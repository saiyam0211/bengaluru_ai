import os
import random
import datetime
import subprocess

FILE_NAME = "activity_log.txt"
START_DATE = datetime.datetime(2025, 2, 1)  # Start from Feb 1, 2025
DAYS_TO_FILL = 365  # One year of commits

# Define commit ranges
LOW_COMMIT_RANGE = (0, 10)
MID_COMMIT_RANGE = (10, 20)
HIGH_COMMIT_RANGE = (20, 30)

def reset_repository():
    """Remove previous contributions."""
    subprocess.run(["git", "rm", "-rf", "--cached", FILE_NAME], check=False)
    subprocess.run(["git", "commit", "-m", "Reset previous contributions"], check=False)
    subprocess.run(["git", "push", "origin", "--force"], check=False)

def commit_changes(commit_date, commit_count):
    """Make the specified number of commits on the given date."""
    for _ in range(commit_count):
        with open(FILE_NAME, "a") as file:
            file.write(f"Commit on {commit_date}\n")
        
        subprocess.run(["git", "add", FILE_NAME], check=True)
        subprocess.run(["git", "commit", "--date", commit_date, "-m", f"Auto commit for {commit_date}"], check=True)

def generate_commit_pattern():
    """Generates a random weekly pattern."""
    days = list(range(7))
    skip_day = random.choice(days)  # One random day with no commits
    days.remove(skip_day)
    
    high_commit_day = random.choice(days)
    days.remove(high_commit_day)
    mid_commit_day = random.choice(days)
    
    return skip_day, high_commit_day, mid_commit_day

def main():
    reset_repository()  # Remove old contributions
    
    for week in range(DAYS_TO_FILL // 7):
        skip_day, high_commit_day, mid_commit_day = generate_commit_pattern()
        
        for day in range(7):
            commit_date = (START_DATE + datetime.timedelta(days=week * 7 + day)).strftime("%Y-%m-%dT12:00:00")
            
            if day == skip_day:
                continue  # Skip this day
            elif day == high_commit_day:
                commit_count = random.randint(*HIGH_COMMIT_RANGE)
            elif day == mid_commit_day:
                commit_count = random.randint(*MID_COMMIT_RANGE)
            else:
                commit_count = random.randint(*LOW_COMMIT_RANGE)
            
            commit_changes(commit_date, commit_count)
    
    subprocess.run(["git", "push", "origin", "master"], check=True)

if __name__ == "__main__":
    main()
