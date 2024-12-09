import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';
import {create, read, update} from "../../data/crud.js";
import {data} from "react-router-dom";
import { usePopup } from "../../context/PopupContext";
import flattenObject from "../../Utils/flattenOject.js";


const OrderItemForm = ({dataUpdate, keyId, tableName}) => {

    //console.log({dataUpdate, keyId, tableName});
    //console.log(dataUpdate, keyId, tableName);


    //dataUpdate = flattenObject(dataUpdate);

    //console.log("ici" + {dataUpdate, keyId, tableName});

    const { hidePopup } = usePopup();

    const validationSchema = Yup.object().shape({
        quantity: Yup.number().integer("must be entire").required("need it"),
        product_id: Yup.number().integer("must be entire").required("need it"),
        order_id: Yup.number().integer("must be entire").required("need it")

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
        console.log(dataUpdate, keyId);
        (dataUpdate !== undefined) ? update(tableName,(e) => (e[keyId] === dataUpdate[keyId]),data) :create(tableName,data);
        hidePopup();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                label="order_id"
                type="number"
                defaultValue={dataUpdate?.order_id}
                {...register('order_id')}  // Enregistrement de l'input dans useForm
                error={errors.order_id?.message}  // Affichage des erreurs
            />
            <InputField
                label="product_id"
                type="number"
                defaultValue={dataUpdate?.product_id || null}
                {...register('product_id')}  // Enregistrement de l'input dans useForm
                error={errors.product_id?.message}  // Affichage des erreurs
            />
            <InputField
                type="number"
                label="quantity"
                defaultValue={dataUpdate?.quantity || null}
                {...register('quantity')}  // Enregistrement de l'input dans useForm
                error={errors.quantity?.message}  // Affichage des erreurs
            />
            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderItemForm;
