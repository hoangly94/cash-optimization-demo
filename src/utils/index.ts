
export const _Object = {
    //remove key have falsy values
    removeEmptyValue(object: { [key: string]: any }) {
        return Object.fromEntries(Object.entries(object).filter(([_, v]) => v));
    }
};

export const _Array = {
    getArrayValueByKey(array: [], keys: string[]): any {
        return keys.reduce(
            (item, key) => item[key],
            array
        )
    },
    initArrayByIndex(lenth: number, plus: number = 0, month?: string | number, year?: string | number) {
        return Array.from({ length: lenth }, (_, i) => ({ day: i + plus, month: month, year: year }));
    }
};


export const _Date = {
    getNumberDaysOfMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
    },
    getNumberDaysOfPreviousMonth(date) {
        return new Date(date.getFullYear(), date.getMonth(), 0).getDate();
    },
    getNumberDaysOfNextMonth(date) {
        return new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();
    },
    getLastDay(date) {
        return new Date(date.getFullYear(), date.getMonth() + 2, 0).getDate();
    },
    convertMonthTo2digits(month: string | number) {
        return month < 10 ? `0${month}` : month;
    },
    convertDayTo2digits(day: string | number) {
        return day < 10 ? `0${day}` : day;
    },
    convertDataDDMMYYYtoYYYYMMDD(dateString?: string) {
        return dateString?.slice(6, dateString.length) + '-' + dateString?.slice(3, 5) + '-' + dateString?.slice(0, 2);
    },
    isMatchDateDD_MM_YYY(date: string) {
        return date?.match(/^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/g);
    },
    convertDataToYYYY_MM_DD(dateString?: string) {
        const date = dateString ? new Date(dateString) : new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    },

};

export const getCurrentDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return dd + '-' + mm + '-' + yyyy;
};
export const getDateString = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
};

//is match dd-mm-yyyy
export const isMatchDateDD_MM_YYY = (date: string) => {
    return date?.match(/^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/g);
}

export const convertDataToYYYY_MM_DD = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
};

export const convertDataDDMMYYYtoYYYYMMDD = (dateString?: string) => {
    return dateString?.slice(6, dateString.length) + '-' + dateString?.slice(3, 5) + '-' + dateString?.slice(0, 2);
};