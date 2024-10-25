import pandas as pd
import numpy as np
from extraction import dataset

# Load dataset
df = pd.read_csv(r"C:\Users\ajawahdou\python ETL\data\synthetic_apps.csv")

# Delete not useful data from the CSV resource
columns_to_drop = ['id', 'project', 'key', 'repositoryname', 'votes', 'watchers', 'resolution']
dataset.drop(columns=columns_to_drop, inplace=True)

# Replace the priority values
priority_replacements = {
    'Major': 'High',
    'Critical': 'Critical',
    'Minor': 'Medium',
    'Optional': 'Low'
}
dataset['priority'] = dataset['priority'].replace(priority_replacements)

# Filter out rows where 'priority' values are not in the specified replacements
valid_priorities = ['High', 'Critical', 'Medium', 'Low']
dataset = dataset[dataset['priority'].isin(valid_priorities)]

# Refactor Status values
status_replacements = {
    'Coding In Progress': 'In_Progress',
    'Closed': 'Resolved',
    'Done': 'Resolved',
}
dataset['status'] = dataset['status'].replace(status_replacements)

# Filter out rows where 'status' values are not in the specified replacements
valid_status = ['Resolved', 'In_Progress', 'Open']
dataset = dataset[dataset['status'].isin(valid_status)]

# Additional filtering based on the 'status' and 'assignee_id' conditions
dataset = dataset.loc[~(
    ((dataset['status'].isin(['Resolved', 'In_Progress'])) & (dataset['assignee_id'].isnull())) |
    ((dataset['status'].isin(['Resolved', 'In_Progress'])) & (dataset['reporter_id'].isnull())) |
    ((dataset['status'] == 'Open') & (dataset['assignee_id'].notnull())) |
    ((dataset['status'] == 'Open') & (dataset['reporter_id'].isnull())) |
    (dataset['description'].isnull())
)]

# Reassign the reporter_id and assignee_id between 50 and 4050 for non-null values
def generate_random_id(low, high):
    return np.random.randint(low, high + 1)

dataset['reporter_id'] = dataset['reporter_id'].apply(
    lambda x: int(generate_random_id(50, 4050)) if pd.notnull(x) else np.nan
)

dataset['assignee_id'] = dataset['assignee_id'].apply(
    lambda x: int(generate_random_id(50, 4050)) if pd.notnull(x) else np.nan
)




# Filter out rows where 'status' values are not in the specified replacements
valid_type = ['Error', 'Fail', 'Not working','Slow','Bug']
dataset = dataset[dataset['type'].isin(valid_type)]
print(dataset.size)

# Add new column 'solutionDescription' with short solutions based on 'description'
def suggest_solution(description):
    if 'error' in description.lower():
        return 'Check error logs and stack trace.'
    elif 'fail' in description.lower():
        return 'Verify configurations and retry.'
    elif 'not working' in description.lower():
        return 'Restart the application and check settings.'
    elif 'slow' in description.lower():
        return 'Optimize performance and check resource usage.'
    elif 'bug' in description.lower():
        return 'Review code for bugs and apply fixes.'
    else:
        return 'Investigate the issue thoroughly.'


dataset['solutionDescription'] = dataset['description'].apply(suggest_solution)
print(dataset['solutionDescription'])
dataset.drop(columns=['type'], inplace=True)

# Add new app_id column
def fetch_app_id(app_name):
    app_id = df[df['name'] == app_name]['id']
    return app_id.iloc[0] if not app_id.empty else None

dataset['app_id'] = dataset['project_name'].apply(fetch_app_id)
dataset['app_id'].fillna(1, inplace=True)
dataset['app_id'] = dataset['app_id'].astype(int)
dataset.drop(columns=['project_name'], inplace=True)

# Add new 'id' column
dataset['id'] = range(len(dataset))

# Reorder the columns
final_columns = ['id', 'title', 'description', 'created', 'resolved', 'solutionDescription', 'status', 'priority', 'app_id', 'reporter_id', 'assignee_id']
dataset = dataset[final_columns]

# Save the filtered data to a new CSV file
output_csv_path = r"C:\Users\ajawahdou\python ETL\data\transformed_dataset.csv"
sampled_dataset = dataset.sample(n=2808, random_state=1)
sampled_dataset.to_csv(output_csv_path, index=False)

# Display CSV Data after transformation
print("\nCSV Data after transformations:\n")
print(dataset.head())