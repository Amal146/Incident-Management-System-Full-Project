import pandas as pd 
import csv
from extraction import dataset

# Get unique apps in the incidents
uniqueApps = dataset['project_name'].unique()
nbApps = uniqueApps.size
managersIds = []

# Add roles for all new users
with open(r'C:\Users\ajawahdou\python ETL\data\synthetic_users_roles.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    i = 65
    j = 1
    # Add defaiult role for all new users
    # Generate 4000 rows of data
    for _ in range(3099):
        i = i + 1
        user_id = i
        role_id = j
        
        
        writer.writerow([
            user_id,
            role_id
        ])

    i = 100
    role_id = 2
    # Add manager role for random new users
    for _ in range(nbApps):
        if (dataset['assignee_id'].eq(i).any()) : 
            i = i + 14
        else:
            user_id = i
            managersIds.append(i)
            i = i + 14
        writer.writerow([
            user_id,
            role_id
        ])

   


