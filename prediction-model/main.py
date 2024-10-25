import joblib
import sys

# Load the model
model = joblib.load('text_classification_model.pkl')

# Define label mapping
label_map = {
    0: 'Error',
    1: 'Configuration Issue',
    2: 'Functionality Issue',
    3: 'Performance Issue',
    4: 'Bug',
    5: 'Security Issue',
    6: 'Crash',
    7: 'Warning',
    8: 'Timeout',
    9: 'General Issue'
}

def predict(description):
    prediction = model.predict([description])
    return prediction[0]

if __name__ == '__main__':
    # Default test description
    if len(sys.argv) > 1:
        description = sys.argv[1]
    else:
        description = "The server is down due to a configuration issue."  # Default description for testing

    result_label = predict(description)
    result_type = label_map.get(result_label, 'Unknown')  # Decode label
    print(f'Predicted Incident Type: {result_type}')



