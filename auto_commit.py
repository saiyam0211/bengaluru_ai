import os
import random
import datetime
import subprocess

# Constants
FILE_NAME = "activity_log.txt"
DAYS_TO_FILL = (datetime.datetime.today() - datetime.datetime(2025, 2, 1)).days  # From Feb 1, 2025, till today

# Weekly contribution pattern
def get_commit_count(day_index):
    """Randomly determine the number of commits based on the weekly pattern."""
    week_day = day_index % 7  # Get day index in a week

    if week_day == random.randint(0, 6):  # Skip one random day per week
        return 0
    elif week_day == random.randint(0, 6):  # One heavy commit day
        return random.randint(20, 30)
    elif week_day == random.randint(0, 6):  # One medium commit day
        return random.randint(10, 20)
    else:  # Rest of the days (light commits)
        return random.randint(0, 10)

# Commit function
def commit_changes(commit_date, commit_count):
    """Create commits with changes."""
    for _ in range(commit_count):
        with open(FILE_NAME, "a") as file:
            file.write(f"Commit on {commit_date}\n")

        subprocess.run(["git", "add", FILE_NAME], check=True)
        subprocess.run(["git", "commit", "--date", commit_date, "-m", f"Auto commit for {commit_date}"], check=True)

# Main function
def main():
    """Generate commits based on weekly pattern."""
    if DAYS_TO_FILL <= 0:
        print("No past contributions needed. Start committing daily now.")
        return

    start_date = datetime.datetime(2025, 2, 1)

    # Remove old contributions
    subprocess.run(["rm", "-f", FILE_NAME], check=False)
    subprocess.run(["git", "rm", "--cached", FILE_NAME], check=False)
    subprocess.run(["git", "commit", "-m", "Reset previous contributions"], check=False)
    subprocess.run(["git", "push", "origin", "master", "--force"], check=True)  # Force push

    # Generate past commits
    for i in range(DAYS_TO_FILL):
        commit_date = (start_date + datetime.timedelta(days=i)).strftime("%Y-%m-%dT12:00:00")
        commit_count = get_commit_count(i)

        if commit_count > 0:
            commit_changes(commit_date, commit_count)

    # Push all changes
    subprocess.run(["git", "push", "origin", "master"], check=True)

if __name__ == "__main__":
    main()
