export function validateName(name: string): string | null {
  if (!name.trim()) return 'Full name is required.';
  if (name.trim().length < 3) return 'Name must be at least 3 characters.';
  return null;
}

export function validateEmail(email: string): string | null {
  if (!email.trim()) return 'Email is required.';
  const normalized = email.trim().toLowerCase();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(normalized)) return 'Enter a valid email address.';
  return null;
}

export function validatePassword(password: string): string | null {
  if (!password) return 'Password is required.';
  if (password.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Z]/.test(password)) return 'Password must contain at least one uppercase letter.';
  if (!/[a-z]/.test(password)) return 'Password must contain at least one lowercase letter.';
  if (!/[0-9]/.test(password)) return 'Password must contain at least one number.';
  return null;
}

export function validateConfirmPassword(password: string, confirm: string): string | null {
  if (!confirm) return 'Confirm password is required.';
  if (password !== confirm) return 'Passwords do not match.';
  return null;
}

export function validateAge(age: string): string | null {
  if (!age.trim()) return 'Age is required.';
  const value = Number(age.trim());
  if (!Number.isInteger(value) || value < 10 || value > 100) return 'Age must be a number between 10 and 100.';
  return null;
}

export function validateGender(gender: string): string | null {
  const normalized = gender.trim();
  const allowed = ['Male', 'Female', 'Other'];
  if (!normalized) return 'Gender is required.';
  if (!allowed.includes(normalized)) return 'Gender must be Male, Female, or Other.';
  return null;
}
