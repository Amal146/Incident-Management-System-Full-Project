# 🌟 Incident Management System

Welcome to the **Incident Management System** project! This repository consolidates the front end, back end, ETL process, and incident type prediction model developed during my internship at Sofrecom. The project aims to streamline incident reporting and resolution, utilizing advanced data processing and machine learning techniques. 🚀

## 📚 Table of Contents

- [Project Overview](#project-overview)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Folder Structure](#folder-structure)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## 🔍 Project Overview

This project serves as an incident management solution that allows users to report, track, and resolve incidents efficiently. It includes a user-friendly front end, a robust back end, a Python-based ETL process for data management, and a machine learning model for predicting incident types. 

## ✨ Features

- **User-Friendly Interface:** Intuitive design for seamless user experience. 🎨
- **Incident Reporting:** Easy submission and tracking of incidents. 📝
- **Data Processing:** ETL process to handle incident data efficiently. 🔄
- **Predictive Analytics:** Machine learning model to predict incident types based on historical data. 📊
- **Role-Based Access Control:** Different functionalities for users, managers, and administrators. 🔐

## 🛠️ Technologies Used

- **Frontend:** Angular, Nebular
- **Backend:** Spring Boot, Java
- **Database:** PostgreSQL
- **ETL:** Python, Pandas, SQLAlchemy
- **Machine Learning:** Python, Scikit-learn, TensorFlow
- **Other Tools:** Git, Bruno

## 🗂️ Folder Structure

```
your-consolidated-repo/
├── frontend/                  # Angular frontend application
│   ├── src/                  # Source files
│   ├── angular.json          # Angular configuration
│   └── package.json          # Frontend dependencies
├── backend/                   # Spring Boot backend application
│   ├── src/                  # Source files
│   ├── pom.xml               # Maven configuration
│   └── application.properties # Application configuration
├── etl/                       # Python ETL process
│   ├── *.py                  # Main ETL scripts
│   └── requirements.txt      # Python dependencies
└── prediction-model/          # Machine learning model for incident type prediction
    ├── model.py              # Prediction model script
    └── requirements.txt      # Python dependencies
```

## ⚙️ Setup Instructions

To set up the project locally, follow these steps:

### Prerequisites

- **Node.js** (for the frontend) 🌐
- **Java JDK** (for the backend) ☕
- **PostgreSQL** (for the database) 🗄️
- **Python** (for ETL and prediction model) 🐍

### Clone the Repository

```bash
git clone https://github.com/Amal146/Incident-Management-System-Full-Project.git
cd Incident-Management-System-Full-Project
```

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the application:
   ```bash
   ng serve
   ```

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd ../backend
   ```

2. Build the project:
   ```bash
   mvn clean install
   ```

3. Run the application:
   ```bash
   mvn spring-boot:run
   ```

### ETL Setup

1. Navigate to the `etl` directory:
   ```bash
   cd ../etl
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the ETL scripts:
   ```bash
   python etl_script_name.py
   ```

### Prediction Model Setup

1. Navigate to the `prediction-model` directory:
   ```bash
   cd ../prediction-model
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Run the model script:
   ```bash
   python model.py
   ```

## 🚀 Usage

- Access the frontend application at `http://localhost:4200`. 🌍
- The backend API will be available at `http://localhost:8080/api`. 🔗
- Make sure the PostgreSQL database is running and configured correctly. ⚡

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or bug fixes, feel free to submit a pull request. 🙌

## 📜 License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.


---

Thank you for checking out the Incident Management System project! 🌈✨
```
