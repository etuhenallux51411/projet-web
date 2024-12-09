import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

function UserForm() {
    // Schéma de validation avec Yup
    const validationSchema = Yup.object({
        name: Yup.string().required("Name is required"),
        email: Yup.string().email("Invalid email format").required("Email is required"),
        age: Yup.number()
            .typeError("Age must be a number")
            .positive("Age must be a positive number")
            .integer("Age must be an integer")
            .required("Age is required"),
        gender: Yup.string().oneOf(["male", "female", "other"], "Invalid gender").required("Gender is required"),
        address: Yup.string().max(100, "Address cannot exceed 100 characters").required("Address is required"),
        isActive: Yup.boolean(),
        role: Yup.string().required("Role is required"),
        dob: Yup.date().typeError("Date of Birth is required").required("Date of Birth is required"),
    });

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log("Form Data Submitted:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: "600px", margin: "0 auto" }}>
            <h2>User Form</h2>

            {/* Nom */}
            <div style={{ marginBottom: "15px" }}>
                <label>Name:</label>
                <input
                    type="text"
                    {...register("name")}
                    placeholder="Enter your name"
                    style={{ display: "block", width: "100%", padding: "8px" }}
                />
                {errors.name && <span style={{ color: "red" }}>{errors.name.message}</span>}
            </div>

            {/* Email */}
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

            {/* Âge */}
            <div style={{ marginBottom: "15px" }}>
                <label>Age:</label>
                <input
                    type="number"
                    {...register("age")}
                    placeholder="Enter your age"
                    style={{ display: "block", width: "100%", padding: "8px" }}
                />
                {errors.age && <span style={{ color: "red" }}>{errors.age.message}</span>}
            </div>

            {/* Genre */}
            <div style={{ marginBottom: "15px" }}>
                <label>Gender:</label>
                <div>
                    <label>
                        <input
                            type="radio"
                            value="male"
                            {...register("gender")}
                        />
                        Male
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                        <input
                            type="radio"
                            value="female"
                            {...register("gender")}
                        />
                        Female
                    </label>
                    <label style={{ marginLeft: "10px" }}>
                        <input
                            type="radio"
                            value="other"
                            {...register("gender")}
                        />
                        Other
                    </label>
                </div>
                {errors.gender && <span style={{ color: "red" }}>{errors.gender.message}</span>}
            </div>

            {/* Adresse */}
            <div style={{ marginBottom: "15px" }}>
                <label>Address:</label>
                <textarea
                    {...register("address")}
                    placeholder="Enter your address"
                    style={{ display: "block", width: "100%", padding: "8px", resize: "vertical" }}
                ></textarea>
                {errors.address && <span style={{ color: "red" }}>{errors.address.message}</span>}
            </div>

            {/* Actif */}
            <div style={{ marginBottom: "15px" }}>
                <label>
                    <input type="checkbox" {...register("isActive")} />
                    Is Active
                </label>
            </div>

            {/* Rôle */}
            <div style={{ marginBottom: "15px" }}>
                <label>Role:</label>
                <select {...register("role")} style={{ display: "block", width: "100%", padding: "8px" }}>
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                </select>
                {errors.role && <span style={{ color: "red" }}>{errors.role.message}</span>}
            </div>

            {/* Date de naissance */}
            <div style={{ marginBottom: "15px" }}>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    {...register("dob")}
                    style={{ display: "block", width: "100%", padding: "8px" }}
                />
                {errors.dob && <span style={{ color: "red" }}>{errors.dob.message}</span>}
            </div>

            <button
                type="submit"
                style={{
                    background: "green",
                    color: "white",
                    padding: "10px 20px",
                    border: "none",
                    cursor: "pointer",
                }}
            >
                Submit
            </button>
        </form>
    );
}

export default UserForm;
