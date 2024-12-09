import OrderForm from "../components/form/orderForm.jsx";

const keyID ='order_id';

class Order {
    constructor(order_id, buyer_id, payment_status, shipping_status, order_date) {
        this.order_id = order_id;
        this.buyer_id = buyer_id;
        this.payment_status = payment_status;
        this.shipping_status = shipping_status;
        this.order_date = order_date;
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
        return <OrderForm dataUpdate={dataUpdate}/>;
    }

}

export default Order;