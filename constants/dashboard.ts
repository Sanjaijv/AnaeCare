import { HEALTH_TIPS } from './healthTips';

export const DASHBOARD_CONSTANTS = {
  USER_PLACEHOLDER: "John Doe",
  GREETING_SUBTITLE: "Stay healthy.\nEarly detection saves lives.",
  PREDICTION_PLACEHOLDER: {
    risk: "No Prediction Yet",
    message: "Take your first eye scan.",
  },
  QUICK_ACTIONS: [
    {
      id: 'scan',
      title: 'Scan Eye',
      subtitle: 'Capture a conjunctiva image',
      icon: 'camera-outline',
      route: 'Camera',
    },
    {
      id: 'upload',
      title: 'Upload Image',
      subtitle: 'Select from gallery',
      icon: 'image-outline',
      route: 'Camera', // As per specs, upload also goes to Camera screen, maybe Camera screen handles gallery? Wait, the spec says "Upload Screen" or Camera Screen depending on the flow. I will route both to Camera or a placeholder.
    },
    {
      id: 'history',
      title: 'Prediction History',
      subtitle: 'View past results',
      icon: 'time-outline',
      route: 'History',
    },
    {
      id: 'diet',
      title: 'Diet Recommendations',
      subtitle: 'Food suggestions',
      icon: 'restaurant-outline',
      route: 'Diet',
    },
  ],
};

export const getRandomHealthTip = () => {
  const randomIndex = Math.floor(Math.random() * HEALTH_TIPS.length);
  return HEALTH_TIPS[randomIndex];
};
