import React from 'react';
import { useForm } from 'react-hook-form';

function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Email:  </label>
                <input
                    type="email"
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <span>{errors.email.message}</span>}
            </div>

            <div>
                <label>Password:  </label>
                <input
                    type="password"
                    {...register("password", { required: "Password is required" })}
                />
                {errors.password && <span>{errors.password.message}</span>}
            </div>

            <button type="submit">Login</button>
        </form>
    );
}

export default LoginForm;