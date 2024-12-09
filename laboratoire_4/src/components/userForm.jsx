import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import "../assets/style/userFormStyle.css";

function UserForm() {
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
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        console.log("Form Data Submitted:", data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2>User Form</h2>

            <div>
                <label>Name:</label>
                <input type="text" {...register("name")} placeholder="Enter your name" />
                {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div>
                <label>Email:</label>
                <input type="email" {...register("email")} placeholder="Enter your email" />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
                <label>Age:</label>
                <input type="number" {...register("age")} placeholder="Enter your age" />
                {errors.age && <span>{errors.age.message}</span>}
            </div>

            <div className="radio-group">
                <label>Gender:</label>
                <label>
                    <input type="radio" value="male" {...register("gender")} /> Male
                </label>
                <label>
                    <input type="radio" value="female" {...register("gender")} /> Female
                </label>
                <label>
                    <input type="radio" value="other" {...register("gender")} /> Other
                </label>
                {errors.gender && <span>{errors.gender.message}</span>}
            </div>

            <div>
                <label>Address:</label>
                <textarea {...register("address")} placeholder="Enter your address"></textarea>
                {errors.address && <span>{errors.address.message}</span>}
            </div>

            <div className="checkbox-group">
                <label>
                    <input type="checkbox" {...register("isActive")} />
                    Is Active
                </label>
            </div>

            <div>
                <label>Role:</label>
                <select {...register("role")}>
                    <option value="">Select a role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                    <option value="guest">Guest</option>
                </select>
                {errors.role && <span>{errors.role.message}</span>}
            </div>

            <div>
                <label>Date of Birth:</label>
                <input type="date" {...register("dob")} />
                {errors.dob && <span>{errors.dob.message}</span>}
            </div>

            <button type="submit">Submit</button>
        </form>
    );
}

export default UserForm;
