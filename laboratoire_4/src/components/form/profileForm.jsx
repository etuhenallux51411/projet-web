import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';
import {create, read, update} from "../../data/crud.js";
import {data} from "react-router-dom";
import { usePopup } from "../../context/PopupContext";
import flattenObject from "../../Utils/flattenOject.js";


const ProfileForm = (dataUpdate) => {

    dataUpdate = flattenObject(dataUpdate);

    const { hidePopup } = usePopup();

    const validationSchema = Yup.object().shape({
        balance: Yup.number().integer("Must be an integer")
            .nullable()
            .transform((value, originalValue) => (originalValue === "" ? null : value))
            .test(
                "is-valid-id",
                "Balance must be a valid integer or 0",
                (value) => value === null || value === 0 || value > 0 // Autorise 0 ou des nombres positifs
            ),
        bank_account: Yup.string()
            .matches(/^[A-Za-z]{2}\d+$/, 'invalid')  // Permet uniquement les chiffres
            .min(6, 'bank_account must be at least 6 characters')
            .max(20, 'bank_account must not exceed 20 characters')
            .required('bank_account is required'),
        address: Yup.string().required('Address is required').max(100, 'Address max 100 digits'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        user_id: Yup.number().integer("must be entire").nullable().transform((value, originalValue) => (originalValue === "" ? null : value))

    });

    // Utilisation de useForm avec validation
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    // Fonction de soumission du formulaire
    const onSubmit = (data) => {
        (dataUpdate.user_id !== undefined) ? update('profile',(e) => (e.user_id === dataUpdate.user_id),data) :create("profile",data);
        hidePopup();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                label="user_id"
                type="number"
                defaultValue={dataUpdate?.user_id}
                {...register('user_id')}  // Enregistrement de l'input dans useForm
                error={errors.user_id?.message}  // Affichage des erreurs
            />
            <InputField
                label="Name"
                defaultValue={dataUpdate?.name || ''}
                {...register('name')}  // Enregistrement de l'input dans useForm
                error={errors.name?.message}  // Affichage des erreurs
            />
            <InputField
                type="email"
                label="Email"
                defaultValue={dataUpdate?.email || ''}
                {...register('email')}  // Enregistrement de l'input dans useForm
                error={errors.email?.message}  // Affichage des erreurs
            />
            <InputField
                type="password"
                label="password"
                defaultValue={dataUpdate?.password}
                {...register('password')}  // Enregistrement de l'input dans useForm
                error={errors.password?.message}  // Affichage des erreurs
            />

            <InputField
                label="address"
                defaultValue={dataUpdate?.address || ''}
                {...register('address')}  // Enregistrement de l'input dans useForm
                error={errors.address?.message}  // Affichage des erreurs
            />

            <InputField
                label="bank_account"
                defaultValue={dataUpdate?.bank_account || ''}
                {...register('bank_account')}  // Enregistrement de l'input dans useForm
                error={errors.bank_account?.message}  // Affichage des erreurs
            />

            <InputField
                type="number"
                label="balance"
                defaultValue={dataUpdate?.balance || "0.0"}
                {...register('balance')}  // Enregistrement de l'input dans useForm
                error={errors.balance?.message}  // Affichage des erreurs
            />



            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;
