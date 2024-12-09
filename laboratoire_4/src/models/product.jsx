import ProductForm from "../components/form/productForm.jsx";

const keyID = 'product_id';

class Product {
    constructor(product_id, seller_id, name, description, price, filament_type) {
        this.product_id = product_id;
        this.seller_id = seller_id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.filament_type = filament_type;
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
        console.log("bonjour ici product.jsx voici dataupdate:" +dataUpdate);
        return <ProductForm dataUpdate={dataUpdate}/>;
    }
}

export default Product;
