import pandas as pd 
import csv
from user_roles_generation import managersIds

# Get unique apps in the incidents
record = pd.read_csv(r'C:\Users\ajawahdou\python ETL\data\transformed_dataset.csv') 
uniqueApps = record['project_name'].unique()
nbApps = uniqueApps.size

# Add roles for all new users
with open(r'C:\Users\ajawahdou\python ETL\data\synthetic_apps.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    i = 22
    j = 0
    # Add defaiult role for all new users
    # Generate 4000 rows of data
    for _ in range(140):
        i = i + 1
        app_id = i
        app_name = uniqueApps[j]
        app_manager = managersIds[j]
        j = j + 1        
        
        writer.writerow([
            app_id,
            app_name,
            app_manager
        ])