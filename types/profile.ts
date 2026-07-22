export interface NotificationSettings {
  daily_health_tips: boolean;
  weekly_reminder: boolean;
  monthly_screening_reminder: boolean;
  diet_reminder: boolean;
}

export interface PrivacySettings {
  store_images: boolean;
  store_prediction_history: boolean;
  share_anonymous_data: boolean;
  allow_analytics: boolean;
}

export interface HealthProfile {
  blood_group: string | null;
  known_medical_conditions: string[];
  current_medications: string[];
  previous_anemia_diagnosis: boolean;
  iron_supplement_usage: boolean;
  pregnancy_status: boolean;
  is_vegetarian: boolean;
  smoking_status: boolean;
  alcohol_consumption: boolean;
}

export interface Profile {
  id: string;
  full_name: string;
  age: number;
  gender: string;
  height: number;
  weight: number;
  phone_number: string | null;
  email: string | null;
  profile_photo: string | null;
  health_profile: HealthProfile;
  symptoms: string[];
  notification_settings: NotificationSettings;
  privacy_settings: PrivacySettings;
  created_at: string;
  updated_at: string;
}

export type ProfileCreate = Omit<Profile, 'id' | 'created_at' | 'updated_at'>;
export type ProfileUpdate = Partial<ProfileCreate>;
