import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Ligne from "./ligne.jsx";
import CrudController from "../controller/crudController.js"
import {usePopup} from "../context/PopupContext.jsx";



// Fonctions utilitaires pour extraire les clés et types dynamiquement
const extrudeType = (dataLigne) => {
    if (typeof dataLigne !== "object" || dataLigne === null) {
        throw new Error("dataLigne must be a non-null object");
    }
    return Object.keys(dataLigne).map((key) => typeof dataLigne[key]);
};

const extrudeName = (dataLigne) => {
    if (typeof dataLigne !== "object" || dataLigne === null) {
        throw new Error("dataLigne must be a non-null object");
    }
    return Object.keys(dataLigne);
};


function AutoTable({ObjectLigne,tableName}) {

    if (!tableName) {
        tableName = useParams();
    }
    const crud = new CrudController(tableName);

    const [data, setData] = useState([]);
    const { showPopup } = usePopup();

    const handleCreate = () => {
        showPopup(
            <div>
                <h2>New ligne for &#39;{tableName}&#39;</h2>
                {ObjectLigne.getForm()}
            </div>
        );
    }

    const handleRead = () => {setData(crud.readItems().data)}


    const handleDelete = (id) => {
        crud.deleteItem((item) => item[ObjectLigne.getKeyId()]=== id);
        //remove(tableName, (item) => item[ObjectLigne.getKeyId()]=== id);
        setData((prevData) => prevData.filter((row) => row[ObjectLigne.getKeyId()] !== id));
    };

    //hhmmmmmm
    useEffect(() => {
        handleRead();
    }, [tableName]);


    if (data.length === 0) {
        return <p>Aucune donnée disponible pour la table : {tableName}</p>;
    }

    const keys = ObjectLigne ? ObjectLigne.getKeys(): extrudeName(data[0] || {});
    const types = extrudeType(data[0] || {});

    return (
        <>
            <h1 id="ma-boite">{tableName}</h1>
            <table className="table table-striped">
                <thead>
                <tr>
                    <td className="crud"></td>
                    {keys.map((key, index) => (
                        <td key={index}>{key} ({types[index]})</td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {data.map((row, index) => (
                    <Ligne
                        key={row.id || index}
                        ObjectLigne={ObjectLigne}
                        data={row}
                        onDelete={handleDelete}
                    />
                ))}
                </tbody>

            </table>
            <button onClick={handleCreate}>+</button>
            <button onClick={handleRead}>Refresh</button>
        </>
    );
}

export default AutoTable;