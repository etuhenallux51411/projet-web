
function tableToJson(table) {
    if (typeof table !== "object" || table === null) {
        console.error("L'entrée doit être un objet non nul.");
        return null;
    }

    const json = {};
    Object.keys(table).forEach((key) => {
        json[key] = table[key]; // Associe chaque clé à sa valeur
    });

    return json;
}

export default tableToJson;