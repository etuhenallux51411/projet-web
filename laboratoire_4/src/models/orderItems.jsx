import OrderItemForm from "../components/form/orderItemForm.jsx";

let keyID = 'order_id';
let tableName = "order_items";

class OrderItem {

    constructor(order_id, product_id, quantity) {
        this.order_id = order_id;
        this.product_id = product_id;
        this.quantity = quantity;
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
        return <OrderItemForm dataUpdate={dataUpdate} tableName={tableName} keyId={keyID}/>;
    }
}

export default OrderItem;
