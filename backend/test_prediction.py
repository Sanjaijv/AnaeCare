import asyncio
from app.services.prediction.prediction_service import process_prediction

async def test():
    # 16 features matching schema
    dummy_features = [
        0.5, 0.4, 0.6, 
        120.0, 110.0, 100.0, 
        30.0, 50.0, 200.0,
        60.0, 20.0, 10.0,
        1.5, 2.5, 3.5, 4.5
    ]
    
    print("Testing prediction pipeline...")
    result, version = await process_prediction(dummy_features)
    print("Version:", version)
    print("Result:", result)

if __name__ == "__main__":
    asyncio.run(test())
