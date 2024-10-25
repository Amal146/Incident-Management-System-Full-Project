
# 🚀 Jira Issues Reports ETL Project 🐍


## 📊 Jira Issue Reports - Python ETL Project

Welcome to the **Jira Issue Reports ETL Project**! 🎉 This project extracts, transforms, and loads (ETL) data from the Jira Issue Reports dataset, available on [Kaggle](https://www.kaggle.com/datasets/antonyjr/jira-issue-reports-v1).

We clean and process this dataset to make it analysis-ready! 🛠️ You'll get a clear pipeline that you can extend for further data analytics and visualization. 📈

---

## 📝 Project Overview

This ETL pipeline follows these key steps:

1. **Extract**: 🚚 Load the Jira Issue Reports data from CSV files.
2. **Transform**: 🔄 Clean, filter, and structure the data for analysis:
   - Handle missing values 🤕
   - Normalize text data 📑
   - Parse dates 🗓️
3. **Load**: 🛢️ Save the cleaned data into a local database or as a CSV file for further analysis.

---

## 📂 Dataset

- **Name**: Jira Issue Reports - V1
- **Source**: [Kaggle Dataset](https://www.kaggle.com/datasets/antonyjr/jira-issue-reports-v1)
- **Size**: ~2MB
- **Format**: CSV

The dataset contains the following columns:
- `issue_key`: Unique identifier for each issue
- `summary`: Brief description of the issue
- `description`: Detailed description of the issue
- `issuetype`: Type of the issue (e.g., Bug, Task)
- `priority`: Priority level of the issue (e.g., High, Low)
- `status`: Current status of the issue (e.g., Open, Closed)
- `created`: Date when the issue was created
- `updated`: Date when the issue was last updated
- `resolution`: Resolution type (e.g., Fixed, Won't Fix)
- `assignee`: Person assigned to the issue

---

## ⚙️ Setup and Installation

### 1. Clone the repository:

```bash
git clone https://github.com/yourusername/jira-etl-project.git
cd jira-etl-project
```

### 2. Install dependencies:

```bash
pip install -r requirements.txt
```

### 3. Download the dataset:

- Visit the [Kaggle Dataset page](https://www.kaggle.com/datasets/antonyjr/jira-issue-reports-v1) and download the CSV file.
- Place it in the `data/` directory of your project.

---

## 🛠️ Usage

Run the ETL pipeline by executing the following command:

```bash
python etl_pipeline.py
```

This script will:
- Extract the data from the CSV file.
- Clean and transform the data.
- Load the processed data into a specified output format (e.g., CSV, SQLite).

---


## 📊 Sample Insights After ETL

Here are a few potential insights you can gather after the ETL process:

- **Most common issue types**: Are bugs the most frequent issue, or tasks? 🐛📝
- **Top priorities**: What are the most frequent priorities in your Jira dataset? 🚨
- **Issue resolution trends**: How often are issues resolved as "Fixed" vs "Won't Fix"? 🤔

---

## 🎨 Data Visualization

Use tools like **Matplotlib**, **Seaborn**, or **Tableau** to visualize:

- Issue types distribution 🍰
- Resolutions over time 📊
- Assignee workload ⚙️

---

## 🛡️ License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Feel free to fork this repository, create a branch, and submit a pull request with any improvements or new features!

1. Fork the project
2. Create your feature branch: `git checkout -b feature/AmazingFeature`
3. Commit your changes: `git commit -m 'Add some AmazingFeature'`
4. Push to the branch: `git push origin feature/AmazingFeature`
5. Open a pull request

---

## 👨‍💻 Authors

- **Amal** - [GitHub Profile](https://github.com/Amal146))

---

## 💬 Contact

For any questions or suggestions, feel free to open an issue or contact me via email at: **amaljw2002@gmail.com** 📧.

Happy coding! 🎉🐍

---

