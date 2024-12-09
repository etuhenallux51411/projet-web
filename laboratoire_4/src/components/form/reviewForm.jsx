import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import InputField from './InputField';
import {create, update} from "../../data/crud.js";

import { usePopup } from "../../context/PopupContext";



const ReviewForm = ({dataUpdate, keyId, tableName}) => {


    const { hidePopup } = usePopup();

    const validationSchema = Yup.object().shape({
        review_date: Yup.date().required("La date est obligatoire"),
        comment: Yup.string().required("need it").max(1024,"maximum 1024 carateres"),
        rating: Yup.number()
            .required("Rating est obligatoire")
            .max(5, "La note ne peut pas dépasser 5")
            .min(1, "La note doit être au moins 1"),
        seller_id: Yup.number().integer("must be entire").required("need it"),
        reviewer_id: Yup.number().integer("must be entire").required("need it")

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
        (dataUpdate !== undefined) ? update(tableName,(e) => (e[keyId] === dataUpdate[keyId]),data) :create(tableName,data);
        hidePopup();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <InputField
                label="reviewer_id"
                type="number"
                defaultValue={dataUpdate?.reviewer_id|| 0}
                {...register('reviewer_id')}  // Enregistrement de l'input dans useForm
                error={errors.reviewer_id?.message}  // Affichage des erreurs
            />
            <InputField
                label="seller_id"
                type="number"
                defaultValue={dataUpdate?.seller_id || 0}
                {...register('seller_id')}  // Enregistrement de l'input dans useForm
                error={errors.seller_id?.message}  // Affichage des erreurs
            />
            <InputField
                type="number"
                label="rating"
                defaultValue={dataUpdate?.rating || 0}
                {...register('rating')}  // Enregistrement de l'input dans useForm
                error={errors.rating?.message}  // Affichage des erreurs
            />

            <InputField
                label="comment"
                defaultValue={dataUpdate?.comment || ''}
                {...register('comment')}  // Enregistrement de l'input dans useForm
                error={errors.comment?.message}  // Affichage des erreurs
            />

            <InputField
                type="date"
                label="review_date"
                defaultValue={
                    dataUpdate?.review_date
                        ? new Date(dataUpdate.review_date).toISOString().split('T')[0]
                        : new Date().toISOString().split('T')[0]
                }
                {...register('review_date')}
                error={errors.review_date?.message}
            />


            <button type="submit">Submit</button>
        </form>
    );
};

export default ReviewForm;
