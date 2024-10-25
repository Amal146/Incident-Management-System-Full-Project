import pandas as pd
import re
from sklearn.model_selection import train_test_split
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
from sklearn.pipeline import Pipeline
from sklearn import metrics

# Load the dataset
df = pd.read_csv('transformed_dataset.csv')

# Function to clean and preprocess text
def clean_text(text):
    # Remove special characters and extra spaces
    text = re.sub(r'[^A-Za-z0-9\s.,]', '', text)
    # Convert text to lowercase
    text = text.lower().strip()
    return text

# Apply preprocessing to relevant columns
df['description'] = df['description'].apply(clean_text)
df['solution_description'] = df['solution_description'].apply(lambda x: clean_text(x) if pd.notnull(x) else 'Not resolved')

# Define incident classification and solution suggestion functions
def classify_incident(description):
    description = description.lower()
    incident_types = {
        'error': 'Error',
        'fail': 'Configuration Issue',
        'not working': 'Functionality Issue',
        'slow': 'Performance Issue',
        'bug': 'Bug',
        'security': 'Security Issue',
        'crash': 'Crash',
        'warning': 'Warning',
        'timeout': 'Timeout'
    }
    for keyword, incident_type in incident_types.items():
        if keyword in description:
            return incident_type
    return 'General Issue'

def suggest_solution(description):
    description = description.lower()
    solutions = {
        'error': 'Check error logs and stack trace.',
        'fail': 'Verify configurations and retry.',
        'not working': 'Restart the application and check settings.',
        'slow': 'Optimize performance and check resource usage.',
        'bug': 'Review code for bugs and apply fixes.'
    }
    for keyword, solution in solutions.items():
        if keyword in description:
            return solution
    return 'Investigate the issue thoroughly.'

# Apply incident classification and solution suggestion
df['incident_type'] = df['description'].apply(classify_incident)
df['solution_hint'] = df['description'].apply(suggest_solution)

# Save to JSON
data = df[['description', 'incident_type', 'solution_hint']].rename(columns={'description': 'incident_description'})
data.to_json('processed_incidents.json', orient='records', indent=2)

# Load data
data = pd.read_json('processed_incidents.json')

# Separate features and labels
descriptions = data['incident_description']
types = data['incident_type']

# Encode labels
label_map = {label: idx for idx, label in enumerate(set(types))}
labels = [label_map[label] for label in types]

# Split data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(descriptions, labels, test_size=0.2, random_state=42)

# Define a pipeline with TF-IDF vectorizer and Naive Bayes classifier
pipeline = Pipeline([
    ('tfidf', TfidfVectorizer()),
    ('clf', MultinomialNB())
])

# Train the model
pipeline.fit(X_train, y_train)

# Make predictions
y_pred = pipeline.predict(X_test)

# Evaluate the model
print("Classification Report:\n", metrics.classification_report(y_test, y_pred, target_names=label_map.keys()))

# Save the model
import joblib
joblib.dump(pipeline, 'text_classification_model.pkl')
