package com.diefthyntis.MinimumViableProduct.security;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class PasswordConstraintValidator implements ConstraintValidator<ValidPassword, String> {

    private static final String PASSWORD_PATTERN =
            "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\\-=[\\]{};':\"\\\\|,.<>/?]).{8,}$";

    @Override
    public void initialize(ValidPassword constraintAnnotation) {
        // Vous pouvez initialiser des paramètres ici si besoin
    }

    @Override
    public boolean isValid(String password, ConstraintValidatorContext context) {
        if (password == null) {
            return false; // Un mot de passe vide n'est pas valide
        }

        return password.matches(PASSWORD_PATTERN);
    }
}
