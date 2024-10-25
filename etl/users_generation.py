import csv
import bcrypt
import random
import string

# Common names and domains
first_names = [
    "John", "Jane", "Alice", "Bob", "Charlie", "Emily", "Michael", "Sarah", "David", "Laura",
    "James", "Olivia", "William", "Sophia", "Alexander", "Isabella", "Ethan", "Mia", "Matthew", "Ava",
    "Benjamin", "Charlotte", "Henry", "Amelia", "Jack", "Harper", "Daniel", "Evelyn", "Lucas", "Abigail",
    "Logan", "Ella", "Michael", "Grace", "Noah", "Lily", "Jacob", "Chloe", "Samuel", "Zoe",
    "Gabriel", "Natalie", "Ryan", "Avery", "Luke", "Hannah", "Isaac", "Aria", "Joshua", "Riley",
    "Elijah", "Sofia", "Owen", "Mila", "Jackson", "Emma", "Liam", "Madison", "Sebastian", "Scarlett"
]
last_names = [
    "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor",
    "Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "King", "Wright",
    "Scott", "Green", "Adams", "Baker", "Nelson", "Carter", "Mitchell", "Perez", "Roberts", "Turner",
    "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins", "Stewart", "Sanchez", "Morris", "Rogers",
    "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey", "Rivera", "Cooper", "Richardson", "Cox"
]
domains = ["example.com", "test.com", "mail.com", "email.com", "domain.com"]

# Function to generate a realistic email
def generate_email(first_name, last_name):
    return f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 999)}@{random.choice(domains)}"

# Function to generate a random string
def generate_string(length):
    return ''.join(random.choices(string.ascii_lowercase + string.digits, k=length))

# Function to hash a password using bcrypt
def hash_password(password):
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')


# List of existing email addresses to exclude
exclude_emails = [
    "user@example.com", "test@email.com", "test@example.com", "hacker@mail.com", "bob@mail.com",
    "amal@mail.com", "john.doe@example.com", "charlie.black@example.com", "bob.white@example.com",
    "yy@example.com", "tulip@eris.com", "eris@mail.com", "olive@mail.com", "jrow@example.com",
    "lopez@mail.com", "bob@example.com", "bob2@example.com", "lol@mail.com", "bob3@example.com",
    "zopa@mail.com", "hibye@mail.com", "bob4@example.com", "bobt4@example.com", "bobti4@example.com",
    "loo@example.com", "manage@mail.com", "molantoo@mail.com", "doo@mail.com", "mail@mail.tn",
    "momo@mo.mo", "hoh@hoho@fr", "hope@mail.com", "name@mail.com", "dede@mail.com",
    "rita@mail.com", "koko@mail.com", "nono@mail.com", "agil@scrum.com", "go@mail.com",
    "admin@mail.com", "mod@mail.com", "user@mail.com", "karlos@mail.com"
]

exclude_usernames = [
    # List of existing usernames to exclude
    "user1", "admin", "bob123", "jane_doe", "john_smith", "testuser"
]

# Set of emails to check for duplicates
generated_emails = set(exclude_emails)
generated_usernames = set(exclude_usernames)


# Open a CSV file to write the data
with open(r'C:\Users\ajawahdou\python ETL\data\synthetic_users.csv', 'w', newline='') as file:
    writer = csv.writer(file)
    i = 65

    # Generate 4000 rows of data
    for _ in range(4000):
        i = i + 1
        id = i
        first_name = random.choice(first_names) 
        last_name =  random.choice(last_names) 
        email = generate_email(first_name, last_name) 
        
        # Ensure email is unique
        while email in generated_emails:
            email = generate_email(first_name, last_name)
        
        # Add the email to the set of generated emails
        generated_emails.add(email)
        
        password = hash_password(generate_string(10))
        username =  f"{first_name.lower()}{random.randint(1, 300)}" 
        while username in generated_usernames:
            username =  f"{first_name.lower()}{random.randint(1, 300)}" 
        generated_usernames.add(username)
        
        writer.writerow([
            id,  # No quoting
            email,  # Quoting email
            password,  # No quoting
            first_name,  # Quoting first_name
            last_name,  # Quoting last_name
            username  # Quoting username
        ])

print("CSV file generated successfully.")
