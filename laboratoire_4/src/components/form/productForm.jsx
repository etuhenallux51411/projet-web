import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';

import { usePopup } from "../../context/PopupContext";
import CrudController from "../../controller/crudController.js"



const ProductForm = ({dataUpdate, keyId, tableName}) => {

    const { hidePopup } = usePopup();
    const crud = new CrudController(tableName);
    const validationSchema = Yup.object().shape({
        filament_type: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        price: Yup.number().positive().required('Balance is required'),
        description: Yup.string().nullable().max(1024, 'Maximum 1024 characters '),
        name: Yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
        seller_id: Yup.number().required("need it").positive("must be positive").integer("must be entire"),
        product_id: Yup.number().positive("must be positive").integer("must be entire").nullable("must be entire")

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

        (dataUpdate !== undefined) ? crud.updateItem((e) => (e[keyId] === dataUpdate[keyId]),data) :crud.createItem(data);

        hidePopup();
    };

    return (
    <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                type="number"
                label="product_id"
                defaultValue={dataUpdate?.product_id || ''}
                readOnly
                {...register('product_id')}
                error={errors.product_id?.message}
            />

            <InputField
                type="number"
                label="seller_id"
                defaultValue={dataUpdate?.seller_id || ''}
                {...register('seller_id')} // Enregistrement de l'input dans useForm
                error={errors.seller_id?.message}  // Affichage des erreurs
            />
            <InputField
                type="text"
                label="name"
                defaultValue={dataUpdate?.name || ''}
                {...register('name')} // Enregistrement de l'input dans useForm
                error={errors.name?.message}  // Affichage des erreurs
            />
            <InputField
                type="text"
                label="description"
                defaultValue={dataUpdate?.description}
                {...register('description')} // Enregistrement de l'input dans useForm
                error={errors.description?.message}  // Affichage des erreurs
            />

            <InputField
                type="text"
                label="filament_type"
                defaultValue={dataUpdate?.filament_type || ''}
                {...register('filament_type')} // Enregistrement de l'input dans useForm
                error={errors.filament_type?.message}  // Affichage des erreurs
            />

            <InputField
                type="number"
                label="price"
                defaultValue={dataUpdate?.price || "0.0"}
                {...register('price')} // Enregistrement de l'input dans useForm
                error={errors.price?.message}  // Affichage des erreurs
            />


            <button type="submit">Submit</button>
        </form>
    );
};

export default ProductForm;
