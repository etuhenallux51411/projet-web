import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';
import { create, update } from "../../data/crud.js";
import { usePopup } from "../../context/PopupContext";
import flattenObject from "../../Utils/flattenOject.js";
import '../../assets/style/formStyle.css'

const ProfileForm = (dataUpdate) => {
    dataUpdate = flattenObject(dataUpdate);
    const { hidePopup } = usePopup();

    const validationSchema = Yup.object().shape({
        balance: Yup.number().integer("Must be an integer").nullable()
            .transform((value, originalValue) => (originalValue === "" ? null : value))
            .test("is-valid-id", "Balance must be a valid integer or 0",
                (value) => value === null || value === 0 || value > 0),
        bank_account: Yup.string()
            .matches(/^[A-Za-z]{2}\d+$/, 'invalid')
            .min(6, 'bank_account must be at least 6 characters')
            .max(20, 'bank_account must not exceed 20 characters')
            .required('bank_account is required'),
        address: Yup.string().required('Address is required').max(100, 'Address max 100 digits'),
        password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
        email: Yup.string().email('Invalid email format').required('Email is required'),
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        user_id: Yup.number().integer("must be entire").nullable()
            .transform((value, originalValue) => (originalValue === "" ? null : value))
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = (data) => {
        dataUpdate.user_id !== undefined
            ? update('profile', (e) => (e.user_id === dataUpdate.user_id), data)
            : create("profile", data);
        hidePopup();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>user_id</label>
                <p className="readonly-field">{dataUpdate?.user_id || "Not available"}</p>
            </div>
            <InputField type="text" label="Name" defaultValue={dataUpdate?.name || ''} {...register('name')} error={errors.name?.message} />
            <InputField type="text" label="Email" defaultValue={dataUpdate?.email || ''} {...register('email')} error={errors.email?.message} />
            <InputField type="text" label="password" defaultValue={dataUpdate?.password} {...register('password')} error={errors.password?.message} />
            <InputField type="text" label="address" defaultValue={dataUpdate?.address || ''} {...register('address')} error={errors.address?.message} />
            <InputField type="text" label="bank_account" defaultValue={dataUpdate?.bank_account || ''} {...register('bank_account')} error={errors.bank_account?.message} />
            <InputField type="text" label="balance" defaultValue={dataUpdate?.balance || "0.0"} {...register('balance')} error={errors.balance?.message} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;
