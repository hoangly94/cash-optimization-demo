
export const _Object = {
    //remove key have falsy values
    removeEmptyValue(object: { [key: string]: any }) {
        return Object.fromEntries(Object.entries(object).filter(([_, v]) => v));
    }
};

export const getCurrentDate = () => {
    const date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return mm + '/' + dd + '/' + yyyy;
};
