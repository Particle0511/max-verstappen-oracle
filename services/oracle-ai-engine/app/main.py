"""
Main entry point for the Oracle AI Engine service.

This service provides API endpoints to serve predictions from the ML models.
"""

import logging
from fastapi import FastAPI
# Corrected import: Changed from relative to absolute
from app import models

# Configure logging
logging.basicConfig(level=logging.INFO)
LOG = logging.getLogger(__name__)

app = FastAPI(
    title="Max Verstappen Oracle - AI Engine",
    description="Serves real-time F1 strategy predictions.",
    version="1.0.0"
)

@app.get("/", tags=["Health Check"])
def read_root() -> dict:
    """
    Root endpoint providing a simple health check.
    """
    return {"status": "Oracle AI Engine is running"}

@app.get("/predict/pit-stop", tags=["Predictions"])
def get_pit_stop_prediction() -> dict:
    """
    Provides a prediction for the optimal pit stop lap.
    """
    LOG.info("Generating pit stop prediction...")
    prediction = models.predict_pit_stop_lap()
    return prediction

@app.get("/predict/overtake", tags=["Predictions"])
def get_overtake_prediction() -> dict:
    """
    Provides a prediction for an upcoming overtake probability.
    """
    LOG.info("Generating overtake prediction...")
    prediction = models.predict_overtake_probability()
    return prediction
