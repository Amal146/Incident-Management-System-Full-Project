import pandas as pd
import psycopg2


# Database connection parameters
db_params = {
    'dbname': 'IncidentManager',
    'user': 'postgres',
    'password': 'system',
    'host': 'localhost',
    'port': '5432'
}

# Establishing the connection
conn = psycopg2.connect(**db_params)

# Creating a cursor object
cursor = conn.cursor()

# Query to extract data
query = "SELECT * FROM incident;"

# Executing the query and fetching data into a DataFrame
df = pd.read_sql_query(query, conn)

# Extraction of data from the csv file
csv = pd.read_csv(r"C:\Users\ajawahdou\Downloads\archive (1)\jira_issues.csv")

# Convert the 'created' column to datetime
csv['created'] = pd.to_datetime(csv['created'], format='%Y-%m-%d %H:%M:%S', errors='coerce')

# Filter the data to keep only rows where the 'created' date is in the year 2013
dataset = csv[csv['created'].dt.year == 2013]



# Print Data for Test purposes
print(dataset)
print(df.head())
print(dataset.describe())
