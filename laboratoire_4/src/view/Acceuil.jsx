import App from "../App.jsx";
import {Link} from "react-router-dom";
import {useNavigate} from "react-router";
import LoginForm from "../components/loginForm.jsx";
import Popup from "../components/popup.jsx";
import {useState} from "react";
import {usePopup} from "../context/PopupContext.jsx";
import order from "../models/order.jsx";

function Acceuil(){
    const navigate = useNavigate();

    const { showPopup,hidePopup } = usePopup();

    return (
        <>
            <div id="ma-boite"><Link to="/table/profile">Table profile</Link></div>
            <div id="ma-boite"><Link to="/table/orders">Table orders</Link></div>
            <div id="ma-boite"><Link to="/table/review">Table review</Link></div>
            <div id="ma-boite"><Link to="/table/product">Table product</Link></div>
            <div id="ma-boite"><Link to="/table/order_items">Table order_items</Link></div>
            <button onClick={() => navigate('/table/orders')}>Livraison</button>

            <button onClick={() => showPopup(<LoginForm/>)}>Log in</button>

        </>
    );
}

export default Acceuil;