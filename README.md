# 🏠 AI-Powered House Price Prediction System

A full-stack Machine Learning web application that predicts house prices using an optimized XGBoost regression model.

Built with:
- 🧠 XGBoost Regressor
- ⚡ FastAPI Backend
- ⚛ React + Vite + Tailwind Frontend
- 📊 Advanced Feature Engineering
- 📈 Cross-Validated ML Pipeline

---

## 🚀 Project Overview

This project predicts residential house prices using structured housing data and advanced regression techniques.

The system includes:

- End-to-end ML pipeline (EDA → Feature Engineering → Model Training → Deployment)
- Log-transformed target variable
- Cross-validation for model stability
- REST API backend
- Interactive animated frontend

---

## 📊 Model Performance

| Metric | Score |
|--------|--------|
| R² Score (Test) | **0.90+** |
| Cross Validation R² | **0.908** |
| RMSE | 0.12 |
| Target | Log-transformed SalePrice |

The model uses XGBoost with tuned hyperparameters for optimal generalization.

---

## 🧠 Features Used

- Overall Quality
- Living Area
- Garage Capacity
- Basement Area
- Year Built
- Bathrooms & Bedrooms
- Zoning & Neighborhood
- Structural Features
- Garage Details
- And 200+ engineered features

---

## 🏗️ Project Architecture

house-price-prediction-ml/
│
├── backend/
│ ├── main.py
│ ├── best_house_price_model.pkl
│ ├── model_features.pkl
│ └── requirements.txt
│
├── frontend/
│ ├── src/
│ ├── package.json
│ └── vite.config.ts
│
├── notebook/
│ ├── EDA.ipynb
│ └── train.ipynb
│
└── README.md

---

## ⚙️ Backend Setup (FastAPI)


cd backend
python -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload

http://127.0.0.1:8000
🎨 Frontend Setup (React + Vite)
cd frontend
npm install
npm run dev

Frontend runs at:

http://localhost:5173
🔌 API Endpoint
POST /predict

Request Body Example:

{
  "OverallQual": 7,
  "GrLivArea": 1800,
  "GarageCars": 2,
  "TotalBsmtSF": 900,
  "YearBuilt": 2005,
  "FullBath": 2,
  "BedroomAbvGr": 3
}

Response:

{
  "predicted_price": 245000.32
} 

🌟 Key Highlights

Log-transformed regression for skew handling

Feature alignment for safe inference

Zero-filling for missing features

Clean backend API architecture

Production-ready folder structure

Fully integrated frontend

📌 Future Improvements

SHAP model interpretability

Deployment on Render & Vercel

Docker containerization

CI/CD pipeline

Model monitoring

👨‍💻 Author

Abdul Karim

Machine Learning & Full Stack Developer

⭐ If you like this project, give it a star!

---

# 
![Python](https://img.shields.io/badge/Python-3.12-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-blue)
![XGBoost](https://img.shields.io/badge/XGBoost-ML-orange)
![License](https://img.shields.io/badge/License-MIT-yellow)

