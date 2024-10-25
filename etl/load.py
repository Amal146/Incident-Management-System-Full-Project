import pandas as pd
from sqlalchemy import create_engine


conn = create_engine('postgresql+psycopg2://postgres:system@localhost:5432/IncidentManager')


#Import newData from csv files to the postegres database
#Import new users 
# newUsers = pd.read_csv(r'C:\Users\ajawahdou\python ETL\data\synthetic_users.csv')
# newUsers.to_sql("contributor",con=conn,if_exists='append',index=False)

#Import new users Roles
# newUsersRoles = pd.read_csv(r'C:\Users\ajawahdou\python ETL\data\synthetic_users_roles.csv')
# newUsersRoles.to_sql("user_roles", con = conn, if_exists='append',index=False)

#Import new projects 
# newProject = pd.read_csv(r'C:\Users\ajawahdou\python ETL\data\synthetic_apps.csv')
# newProject.to_sql("application", con = conn, if_exists='append',index=False)

#Import new incidents
newIncidents = pd.read_csv(r'C:\Users\ajawahdou\python ETL\data\transformed_dataset.csv')
newIncidents.to_sql("incident", con = conn, if_exists='append',index=False)
