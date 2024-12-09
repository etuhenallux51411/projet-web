import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function LoginForm() {
    const [isConfirmPasswordRequired, setIsConfirmPasswordRequired] = useState(false);

    // Schéma de validation avec Yup
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .required("Password is required"),
        confirmPassword: Yup.string().when("password", {
            is: () => isConfirmPasswordRequired,
            then: Yup.string()
                .oneOf([Yup.ref("password")], "Passwords must match")
                .required("Please confirm your password"),
        }),
    });

    // Utilisation de React Hook Form avec Yup
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log("Form Submitted:", data);
    };

    // Fonction pour afficher/masquer le champ de confirmation
    const toggleConfirmPassword = () => {
        setIsConfirmPasswordRequired((prev) => !prev);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "400px", margin: "0 auto" }}>
            <h2>Login Form</h2>

            {/* Champ Email */}
            <div style={{ marginBottom: "15px" }}>
                <label>Email:</label>
                <input
                    type="email"
                    {...register("email")}
                    placeholder="Enter your email"
                    style={{ display: "block", width: "100%", padding: "8px" }}
                />
                {errors.email && <span style={{ color: "red" }}>{errors.email.message}</span>}
            </div>

            {/* Champ Mot de passe */}
            <div style={{ marginBottom: "15px" }}>
                <label>Password:</label>
                <input
                    type="password"
                    {...register("password")}
                    placeholder="Enter your password"
                    style={{ display: "block", width: "100%", padding: "8px" }}
                />
                {errors.password && <span style={{ color: "red" }}>{errors.password.message}</span>}
            </div>

            {/* Case à cocher pour confirmation */}
            <div style={{ marginBottom: "15px" }}>
                <label>
                    <input type="checkbox" onChange={toggleConfirmPassword} />
                    Confirm password
                </label>
            </div>

            {/* Champ Confirmation du mot de passe */}
            {isConfirmPasswordRequired && (
                <div style={{ marginBottom: "15px" }}>
                    <label>Confirm Password:</label>
                    <input
                        type="password"
                        {...register("confirmPassword")}
                        placeholder="Re-enter your password"
                        style={{ display: "block", width: "100%", padding: "8px" }}
                    />
                    {errors.confirmPassword && (
                        <span style={{ color: "red" }}>{errors.confirmPassword.message}</span>
                    )}
                </div>
            )}

            <button
                type="submit"
                style={{
                    background: "blue",
                    color: "white",
                    padding: "10px 15px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Login
            </button>
        </form>
    );
}

export default LoginForm;
