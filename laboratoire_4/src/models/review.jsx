import ReviewForm from "../components/form/ReviewForm.jsx";

const keyID = 'reviewer_id';
const tableName = 'review';

class Review {
    constructor(reviewer_id, seller_id, rating, comment, review_date) {
        this.reviewer_id = reviewer_id;
        this.seller_id = seller_id;
        this.rating = rating;
        this.comment = comment;
        this.review_date = review_date;
    }

    // Retourne la clé utilisée comme identifiant
    static getKeyId() {
        return keyID;
    }

    // Retourne les clés de l'objet sous forme de tableau
    static getKeys() {
        return Object.keys(new this());
    }

    static getForm(dataUpdate) {
        console.log(keyID, tableName + "apapapapappapapapapp");
        return <ReviewForm dataUpdate={dataUpdate} tableName={tableName} keyId={keyID}/>;
    }
}

export default Review;
