from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import joblib
import numpy as np
import pandas as pd

# -----------------------------------
# Create FastAPI app
# -----------------------------------
app = FastAPI(title="House Price Prediction API")

# -----------------------------------
# Enable CORS (Allow Frontend Access)
# -----------------------------------
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # For production, replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# -----------------------------------
# Load Model and Feature Columns
# -----------------------------------
model = joblib.load("best_house_price_model.pkl")
model_features = joblib.load("model_features.pkl")

# -----------------------------------
# Health Check Route
# -----------------------------------
@app.get("/")
def home():
    return {"message": "House Price Prediction API is running"}

# -----------------------------------
# Prediction Route
# -----------------------------------
@app.post("/predict")
def predict(data: dict):

    

    # Initialize all features to 0
    input_data = {feature: 0 for feature in model_features}

    # Update only provided features
    for key, value in data.items():
        if key in input_data:
            input_data[key] = value

    # Convert to DataFrame
    input_df = pd.DataFrame([input_data])

    # Make prediction (log scale)
    prediction_log = model.predict(input_df)[0]

    # Convert back to real price
    prediction_real = np.expm1(prediction_log)

    return {
        "predicted_price": float(round(prediction_real, 2))
    }
