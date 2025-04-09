import json
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import matplotlib.pyplot as plt

# 1. Load and Parse CTI Data
def load_cti_data(file_path):
    with open(file_path, 'r') as f:
        data = json.load(f)
    df = pd.DataFrame(data)
    print("Loaded CTI Data:\n", df.head())
    return df

# 2. Preprocess Data for AI
def preprocess_data(df):
    # Encode categorical 'threat_type' for ML
    le = LabelEncoder()
    df['threat_type_encoded'] = le.fit_transform(df['threat_type'])
    
    # Features: severity, threat_type_encoded; Target: simplified risk (high=1, low=0)
    df['risk_level'] = df['severity'].apply(lambda x: 1 if x >= 7 else 0)
    return df, le

# 3. Train Simple ML Model
def train_model(df):
    X = df[['severity', 'threat_type_encoded']]
    y = df['risk_level']
    
    # Split data (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Train Random Forest Classifier
    model = RandomForestClassifier(n_estimators=10, random_state=42)
    model.fit(X_train, y_train)
    
    # Evaluate
    accuracy = model.score(X_test, y_test)
    print(f"Model Accuracy: {accuracy:.2f}")
    return model

# 4. Analyze Risks
def analyze_risks(df, model):
    X = df[['severity', 'threat_type_encoded']]
    df['predicted_risk'] = model.predict(X)
    
    # Summarize risks
    risk_summary = df.groupby('threat_type').agg({
        'predicted_risk': 'sum',
        'severity': 'mean'
    }).reset_index()
    risk_summary.columns = ['Threat Type', 'High Risk Count', 'Avg Severity']
    return risk_summary

# 5. Generate Customer Report
def generate_report(risk_summary):
    # Text report
    print("\n=== Customer Hacking Risk Report ===")
    print("Based on recent threat intelligence, here are your potential risks:")
    for _, row in risk_summary.iterrows():
        risk_text = "HIGH" if row['High Risk Count'] > 0 else "LOW"
        print(f"- {row['Threat Type']}: {risk_text} risk (Avg Severity: {row['Avg Severity']:.1f}/10)")
    print("Recommendations: Update passwords, enable 2FA, and monitor suspicious emails.")
    
    # Visualization
    plt.figure(figsize=(8, 5))
    plt.bar(risk_summary['Threat Type'], risk_summary['High Risk Count'], color='salmon')
    plt.xlabel('Threat Type')
    plt.ylabel('Number of High-Risk Incidents')
    plt.title('Your Hacking Risk Summary')
    plt.savefig('risk_chart.png')
    print("Risk chart saved as 'risk_chart.png'")

# Main Execution
if __name__ == "__main__":
    # Load data
    cti_data = load_cti_data('mock_cti_data.json')
    
    # Preprocess
    processed_data, label_encoder = preprocess_data(cti_data)
    
    # Train AI model
    risk_model = train_model(processed_data)
    
    # Analyze risks
    risk_summary = analyze_risks(processed_data, risk_model)
    
    # Generate customer report
    generate_report(risk_summary)