import json
import os
from typing import List, Dict, Any

def get_all_hospitals() -> List[Dict[str, Any]]:
    # Path to mock_hospitals.json
    base_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
    json_path = os.path.join(base_dir, "data", "mock_hospitals.json")
    
    if not os.path.exists(json_path):
        return []
        
    with open(json_path, 'r') as f:
        data = json.load(f)
        
    return data
