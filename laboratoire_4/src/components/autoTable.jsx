import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import Ligne from "./ligne.jsx";
import CrudController from "../controller/crudController.js";
import { usePopup } from "../context/PopupContext.jsx";
import SearchBar from "./searchBar.jsx";
import Pagination from "./pagination.jsx";

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

function AutoTable({ ObjectLigne, tableName }) {
    if (!tableName) {
        tableName = useParams();
    }

    const crud = new CrudController(tableName);
    const [data, setData] = useState([]); // Données d'origine
    const [filteredData, setFilteredData] = useState([]); // Données filtrées
    const { showPopup } = usePopup();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5; // Nombre d'éléments par page

    const handleCreate = () => {
        showPopup(
            <div>
                <h2>New ligne for &#39;{tableName}&#39;</h2>
                {ObjectLigne.getForm()}
            </div>
        );
    };

    const handleRead = () => {
        const fetchedData = crud.readItems().data;
        setData(fetchedData);
        setFilteredData(fetchedData);
    };

    const handleDelete = (id) => {
        crud.deleteItem((item) => item[ObjectLigne.getKeyId()] === id);
        setData((prevData) => prevData.filter((row) => row[ObjectLigne.getKeyId()] !== id));
        setFilteredData((prevData) => prevData.filter((row) => row[ObjectLigne.getKeyId()] !== id));
    };

    const handleSearch = (query) => {
        const lowerCaseQuery = query.toLowerCase();
        const filtered = data.filter((item) =>
            Object.values(item).some((value) =>
                String(value).toLowerCase().includes(lowerCaseQuery)
            )
        );
        setFilteredData(filtered);
        setCurrentPage(1);
    };

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    const currentData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    useEffect(() => {
        handleRead();
    }, [tableName]);

    if (data.length === 0) {
        return <p>Aucune donnée disponible pour la table : {tableName}</p>;
    }

    const keys = ObjectLigne ? ObjectLigne.getKeys() : extrudeName(data[0] || {});
    const types = extrudeType(data[0] || {});

    return (
        <div className="table-container">
            <h1 id="ma-boite">{tableName}</h1>
            <SearchBar placeholder="Rechercher dans la table..." onSearch={handleSearch} />
            <table className="table table-striped">
                <thead>
                <tr>
                    <td className="crud"></td>
                    {keys.map((key, index) => (
                        <td key={index}>
                            <strong>{key}</strong> ({types[index]})
                        </td>
                    ))}
                </tr>
                </thead>
                <tbody>
                {currentData.map((row, index) => (
                    <Ligne
                        key={row.id || index}
                        ObjectLigne={ObjectLigne}
                        data={row}
                        onDelete={handleDelete}
                    />
                ))}
                </tbody>
            </table>
            {/* Pagination */}
            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
            <button onClick={handleCreate}>Add</button>
            <button onClick={handleRead}>Refresh</button>
        </div>
    );
}

export default AutoTable;
