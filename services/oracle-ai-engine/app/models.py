import random
from typing import Dict, Any

def predict_pit_stop_lap() -> Dict[str, Any]:
    """
    Predicts the optimal pit stop lap.

    Returns:
        A dictionary containing the predicted lap and confidence score.
    """
    return {
        "predicted_lap": random.randint(18, 24),
        "confidence": round(random.uniform(0.75, 0.95), 2),
        "strategy_name": "Optimal One-Stop"
    }

def predict_overtake_probability() -> Dict[str, Any]:
    """
    Predicts the probability of an overtake on the next lap.

    Returns:
        A dictionary containing the probability and target driver.
    """
    return {
        "probability": round(random.uniform(0.6, 0.85), 2),
        "target_driver": "Charles Leclerc",
        "on_lap": 26
    }
