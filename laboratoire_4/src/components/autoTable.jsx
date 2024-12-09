import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Ligne from "./ligne.jsx";
import { read, remove, create} from "../data/crud.js";
import Profile from "../models/profile.jsx";
import tableToJson from "../controler/tableToJson.js";
import {usePopup} from "../context/PopupContext.jsx";

import UserForm from "./userForm.jsx";

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


function AutoTable({ObjectLigne,tableName, profileForm }) {
    console.log("test ici" + tableName);
    if (!tableName) {
        console.log("test ici" + tableName);
        tableName = useParams();
        console.log("test ici" + tableName);
    }
    const [data, setData] = useState([]);
    const { showPopup,hidePopup } = usePopup();

    const handleCreate = () => {
        showPopup(
            <div>
                add is nice
                {ObjectLigne.getForm()}
            </div>
        );
    }

    const handleRead = () => {setData(read(tableName))}


    const handleDelete = (id) => {
        console.log("handleDelete ==" + id);
        remove(tableName, (item) => item[ObjectLigne.getKeyId()]=== id);
        setData((prevData) => prevData.filter((row) => row[ObjectLigne.getKeyId()] !== id));
    };


    useEffect(() => {
        const fetchedData = read(tableName); // Lecture des données pour la table dynamique
        if (Array.isArray(fetchedData)) {
            setData(fetchedData);
        } else {
            console.error("Expected data to be an array.");
        }
    }, [tableName]);

    // Suppression d'une ligne par ID


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
