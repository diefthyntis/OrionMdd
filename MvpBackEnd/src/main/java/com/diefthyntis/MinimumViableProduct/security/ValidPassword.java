package com.diefthyntis.MinimumViableProduct.security;

import jakarta.validation.Constraint;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.FIELD, ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Constraint(validatedBy = PasswordConstraintValidator.class) // Lien avec le validateur
public @interface ValidPassword {
    
    String message() default "Le mot de passe ne respecte pas les contraintes de sécurité";
    
    Class<?>[] groups() default {};
    

}
