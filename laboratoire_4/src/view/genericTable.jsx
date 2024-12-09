import React from "react";
import AutoTable from "../components/autoTable.jsx";
import Header from "../components/header.jsx";


function GenericTable ({ObjectLigne,tableName, profileForm}) {

    console.log(ObjectLigne.getKeys());

    return (
        <>
            <Header />
            <AutoTable ObjectLigne={ObjectLigne} tableName={tableName} profileForm={profileForm} />
        </>

    )
}

export default GenericTable;