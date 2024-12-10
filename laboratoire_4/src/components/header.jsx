import { Link, useNavigate } from "react-router-dom";
function Header() {
    const navigate = useNavigate();

    return (
        <div className="header-fixed">
            <Link to="/">Home</Link>
            <div className="back-arrow" onClick={() => navigate(-1)}>
                <i className="fa fa-arrow-left"></i> Back
            </div>
        </div>
    );
}

export default Header;
