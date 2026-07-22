import json
import os
from typing import Optional, Dict, Any, List

DATA_FILE = os.path.join(os.path.dirname(__file__), '..', 'data', 'sync_queue.json')

class SyncService:
    def _read_sync_data(self) -> Dict[str, Any]:
        if not os.path.exists(DATA_FILE):
            return {}
        try:
            with open(DATA_FILE, 'r') as f:
                return json.load(f)
        except json.JSONDecodeError:
            return {}

    def _write_sync_data(self, data: Dict[str, Any]) -> None:
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, 'w') as f:
            json.dump(data, f, indent=4)

    def process_sync_batch(self, user_id: str, batch: List[Dict[str, Any]]) -> bool:
        """
        Process a batch of sync operations from the client.
        In this mocked phase, we just store them in sync_queue.json under the user_id.
        """
        data = self._read_sync_data()
        if user_id not in data:
            data[user_id] = []
            
        # Append all operations in the batch to the user's sync log
        for op in batch:
            op["server_timestamp"] = "NOW"  # In a real app use datetime.utcnow().isoformat()
            data[user_id].append(op)
            
        self._write_sync_data(data)
        
        # In a real app we'd dispatch to User Profile, History, or Settings updates here based on op["type"]
        return True

sync_service = SyncService()
