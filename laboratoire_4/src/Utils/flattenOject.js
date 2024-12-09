
//TODO : retiré parzntkey
const flattenObject = (obj, parentKey = "") => {
    let result = {};
    Object.entries(obj).forEach(([key, value]) => {
        const fullKey = parentKey ? `${key}` : key;
        if (typeof value === "object" && value !== null) {
            Object.assign(result, flattenObject(value, fullKey));
        } else {
            result[fullKey] = value;
        }
    });
    return result;
};

export default flattenObject;