import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import LoginForm from "../components/form/loginForm.jsx";
import { usePopup } from "../context/PopupContext.jsx";
import "../assets/style/acceuilStyle.css"
import logo from "../assets/logo.png";

function Acceuil() {
    const navigate = useNavigate();
    const { showPopup } = usePopup();

    return (
        <div className="acceuil-container">

            <h1 className="acceuil-title">Back-office PrintIt</h1>
            <img src={logo} alt="" />
            <div className="menu-item">
                <Link to="/table/profile">Table profile</Link>
            </div>
            <div className="menu-item">
                <Link to="/table/orders">Table orders</Link>
            </div>
            <div className="menu-item">
                <Link to="/table/review">Table review</Link>
            </div>
            <div className="menu-item">
                <Link to="/table/product">Table product</Link>
            </div>
            <div className="menu-item">
                <Link to="/table/order_items">Table order_items</Link>
            </div>

            <div className="button-container">
                <button onClick={() => navigate('/table/orders')}>Livraison</button>
                <button onClick={() => showPopup(<LoginForm/>)}>Log in</button>
            </div>
        </div>
    );
}

export default Acceuil;
