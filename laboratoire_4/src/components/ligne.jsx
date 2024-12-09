import { usePopup } from "../context/PopupContext";
import '../assets/style/tableStyle.css'
function Ligne({ data, onDelete, ObjectLigne }) {
    if (typeof data !== "object" || data === null) {
        console.error("La prop `data` doit être un objet.");
        return <tr></tr>;
    }

    const { showPopup, hidePopup } = usePopup();

    const values = Object.values(data);

    const handlePopupUpdate = (data) => {
        showPopup(
            <div>
                {ObjectLigne.getForm(data)}
            </div>
        );
    };

    const handlePopupDelete = () => {
        showPopup(
            <div>
                <h2>Do you want to delete ?</h2>
                <button
                    onClick={() => {
                        onDelete(data[ObjectLigne.getKeyId()]); // Appelle la fonction de suppression
                        hidePopup();       // Masque le popup
                    }}
                >
                    YES
                </button>
            </div>
        );
    };

    return (
        <tr>
            <td>
                <input
                    type="button"
                    onClick={handlePopupDelete}
                    value={"Delete"}
                />
                <input
                    type="button"
                    onClick={() => handlePopupUpdate(data)}
                    value={"Update"}
                />
            </td>
            {values.map((value, index) => (
                <td key={index}>
                    {value !== null
                        ? typeof value === "boolean" ? (
                            <input type="checkbox" checked={value} readOnly />
                        ) : (
                            value.toString()
                        )
                        : "N/A"}
                </td>
            ))}
        </tr>
    );
}

export default Ligne;
