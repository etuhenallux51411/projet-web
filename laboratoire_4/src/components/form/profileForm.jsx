import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';
import { usePopup } from "../../context/PopupContext";
import '../../assets/style/formStyle.css'
import CrudController from "../../controller/crudController.js"


const ProfileForm = ({dataUpdate, keyId, tableName}) => {
    const { hidePopup } = usePopup();
    const crud = new CrudController(tableName);
    const idExist = dataUpdate?.user_id !== undefined;
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
        (dataUpdate !== undefined) ? crud.updateItem((e) => (e[keyId] === dataUpdate[keyId]),data) :crud.createItem(data);
        hidePopup();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {
                (idExist === true) && <InputField
                    type="number"
                    label="user_id"
                    defaultValue={dataUpdate?.user_id || ''}
                    readOnly={true}
                    error={errors.user_id?.message}
                />

            }
            <InputField type="text" label="Name" defaultValue={dataUpdate?.name || ''} {...register('name')} error={errors.name?.message} />
            <InputField type="email" label="Email" defaultValue={dataUpdate?.email || ''} {...register('email')} error={errors.email?.message} />
            <InputField type="text" label="password" defaultValue={dataUpdate?.password} {...register('password')} error={errors.password?.message} />
            <InputField type="text" label="address" defaultValue={dataUpdate?.address || ''} {...register('address')} error={errors.address?.message} />
            <InputField type="text" label="bank_account" defaultValue={dataUpdate?.bank_account || ''} {...register('bank_account')} error={errors.bank_account?.message} />
            <InputField type="number" label="balance" defaultValue={dataUpdate?.balance || null} {...register('balance')} error={errors.balance?.message} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default ProfileForm;
