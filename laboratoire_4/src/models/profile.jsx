import ProfileForm from "../components/form/profileForm.jsx";

const keyID ='user_id';
const tableName ='profile';

class Profile {
    constructor(user_id, name, email, password, address, bank_account, balance) {
        this.user_id = user_id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.bank_account = bank_account;
        this.balance = balance;
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

        return <ProfileForm dataUpdate={dataUpdate} tableName={tableName} keyId={keyID}/>;
    }
}

export default Profile;

