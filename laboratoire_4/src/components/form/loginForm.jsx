import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';
import { usePopup } from "../../context/PopupContext";
import '../../assets/style/formStyle.css'




const LoginForm = () => {

    const { hidePopup } = usePopup();

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required("username or email is required"),
        password: Yup.string()
            .required("Password is required")

    });


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Fonction de soumission du formulaire
    const onSubmit = (data) => {
        console.log("Log in a faire ici : " + data.username + data.password);

        hidePopup();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                type="text"
                label="Username"
                {...register('username')}  // Enregistrement de l'input dans useForm
                error={errors.username?.message}  // Affichage des erreurs
            />
            <InputField
                type="text"
                label="Password"
                {...register('password')}  // Enregistrement de l'input dans useForm
                error={errors.password?.message}  // Affichage des erreurs
            />

            <button type="submit">Submit</button>
        </form>
    );
};

export default LoginForm;
