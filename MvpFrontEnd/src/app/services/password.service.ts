import { AbstractControl, ValidationErrors } from '@angular/forms';

export function passwordValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.value;

  if (!password) {
    return null; // If the password is empty, let the required validator handle it
  }

  // Regular expression checks
  const hasNumber = /[0-9]/.test(password);
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasSpecialCharacter = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const passwordValid = hasNumber && hasUpperCase && hasLowerCase && hasSpecialCharacter;

  return !passwordValid ? { passwordStrength: true } : null;
}
