import sys
from unittest.mock import MagicMock

# Mock mediapipe to prevent import errors during test collection
mock_mp = MagicMock()
mock_mp.solutions.face_mesh = MagicMock()
sys.modules['mediapipe'] = mock_mp
