from fastapi import FastAPI, HTTPException, Request
from pydantic import BaseModel
import google.generativeai as genai
import pandas as pd
import joblib
import numpy as np
import os
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()

# Secure API key usagee
genai.configure(api_key="AIzaSyCcXsT36P3Uyxu-CCmG3VIXwFflPRUAU2A")

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load models and feature columns
model_path = "satej/models/linear_regression.pkl"
feature_columns_path = "satej/models/feature_columns.pkl"
lr_model = joblib.load(model_path)
feature_columns = joblib.load(feature_columns_path)

class InputData(BaseModel):
    expense_ratio: float
    sharpe: float
    sortino: float
    fund_size_cr: float
    fund_age_yr: float
    sd: float
    beta: float
    alpha: float
    risk_level_2: bool
    risk_level_3: bool
    risk_level_4: bool
    risk_level_5: bool
    risk_level_6: bool

def preprocess_input(input_data):
    df = pd.DataFrame([input_data.dict()])
    
    for col in feature_columns:
        if col not in df.columns:
            df[col] = 0  

    numeric_cols = df.select_dtypes(include=np.number).columns
    df[numeric_cols] = df[numeric_cols].apply(pd.to_numeric, errors='coerce')
    
    X = df[feature_columns]
    X = X.fillna(0)  # Better handling of NaN values

    return X

@app.post('/chatbot')
async def chatbot(request: Request):
    body = await request.json()
    user_input = body.get('message', '')

    if not user_input:
        return JSONResponse(content={'response': "Please provide a message."})

    try:
        model = genai.GenerativeModel("gemini-1.5-flash", system_instruction="You are a financial assistant. Provide helpful financial advice, budgeting tips, and investment guidance based on user queries.")
        response = model.generate_content(user_input)
        bot_reply = response.text
    except Exception as e:
        bot_reply = "Sorry, there was an error processing your request."

    return JSONResponse(content={'response': bot_reply})

@app.post('/predict')
def predict(input_data: InputData):
    try:
        processed_data = preprocess_input(input_data)
        predicted_1yr_return = lr_model.predict(processed_data)[0]
        predicted_3yr_return = predicted_1yr_return * 3
        predicted_5yr_return = predicted_1yr_return * 5

        return {
            "status": "success",
            "predictions": {
                "1_year_return": float(predicted_1yr_return),
                "3_year_return": float(predicted_3yr_return),
                "5_year_return": float(predicted_5yr_return),
            }
        }

    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == '__main__':
    import uvicorn
    uvicorn.run(app, host='0.0.0.0', port=8000)