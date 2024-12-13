import { Link, useNavigate } from "react-router-dom";

function Header() {
    const navigate = useNavigate();

    return (
        <div className="header-fixed">
            <Link to="/">Home</Link>
            <button className="back-button" onClick={() => navigate(-1)}>
                Back
            </button>
        </div>
    );
}

export default Header;
