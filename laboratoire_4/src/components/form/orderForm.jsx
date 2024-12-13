import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';
import { usePopup } from "../../context/PopupContext";
import '../../assets/style/formStyle.css'
import CrudController from "../../controller/crudController.js"



const OrderForm = ({dataUpdate, keyId, tableName}) => {

    const { hidePopup } = usePopup();
    const crud = new CrudController(tableName);

    const validationSchema = Yup.object().shape({
        //TODO : voir comment régler la date. Ca fonctionne tres bien grace a type = "date" de limite passé et futur
        //oder_date: Yup.date().required("La date est obligatoire"),
        shipping_status: Yup.string().required('status is required'),
        payment_status: Yup.string().required('status is required'),
        buyer_id: Yup.number().positive("must be positive").integer("must be entire").required("need it"),
        order_id: Yup.number().positive("must be positive").integer("must be entire")

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
        if (data.review_date) {
            data.review_date = new Date(data.review_date).toISOString().split('T')[0];
        }
        (dataUpdate !== undefined) ? crud.updateItem((e) => (e[keyId] === dataUpdate[keyId]),data) :crud.createItem(data);

        hidePopup();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                type="text"
                label="order_id"
                defaultValue={dataUpdate?.order_id}
                {...register('order_id')}  // Enregistrement de l'input dans useForm
                error={errors.order_id?.message}  // Affichage des erreurs
            />
            <InputField
                type="text"
                label="buyer_id"
                defaultValue={dataUpdate?.buyer_id || ''}
                {...register('buyer_id')}  // Enregistrement de l'input dans useForm
                error={errors.buyer_id?.message}  // Affichage des erreurs
            />
            <InputField
                type = "text"
                label="payment_status"
                defaultValue={dataUpdate?.payment_status || ''}
                {...register('payment_status')}  // Enregistrement de l'input dans useForm
                error={errors.payment_status?.message}  // Affichage des erreurs
            />
            <InputField
                type="text"
                label="shipping_status"
                defaultValue={dataUpdate?.shipping_status}
                {...register('shipping_status')}  // Enregistrement de l'input dans useForm
                error={errors.shipping_status?.message}  // Affichage des erreurs
            />

            <InputField
                type="date"
                label="order_date"
                defaultValue={
                    dataUpdate?.order_date
                        ? new Date(dataUpdate.order_date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]
                }
                {...register('order_date')}  // Enregistrement de l'input dans useForm
                error={errors.order_date?.message}  // Affichage des erreurs
            />




            <button type="submit">Submit</button>
        </form>
    );
};

export default OrderForm;
