
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
    getDate(dateString?: string) {
        const date = new Date(dateString ?? '');
        if (isNaN(date.getTime()))
            return dateString;
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0');
        var yyyy = date.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    },
    getDateTime(dateString?: string) {
        const date = new Date(dateString ?? '');
        if (isNaN(date.getTime()))
            return dateString;
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
    },
    getCurrentDate(dateString?: string) {
        const date = dateString ? new Date(dateString) : new Date();
        if (isNaN(date.getTime()))
            return dateString;
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        return dd + '/' + mm + '/' + yyyy;
    },
    getCurrentDateTime(dateString?: string) {
        const date = dateString ? new Date(dateString) : new Date();
        const dd = String(date.getDate()).padStart(2, '0');
        const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        const yyyy = date.getFullYear();

        const h = String(date.getHours()).padStart(2, '0');
        const m = String(date.getMinutes()).padStart(2, '0');
        const s = String(date.getSeconds()).padStart(2, '0');
        return `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
    },
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
    // convertMonthTo2digits(month: string | number) {
    //     return month < 10 ? `0${month}` : month;
    // },
    // convertDayTo2digits(day: string | number) {
    //     return day < 10 ? `0${day}` : day;
    // },
    // convertTo2digits(month: string | number) {
    //     return month < 10 ? `0${month}` : month;
    // },
    convertDateDDMMYYYtoYYYYMMDD(dateString?: string) {
        return dateString?.slice(6, dateString.length) + '-' + dateString?.slice(3, 5) + '-' + dateString?.slice(0, 2);
    },
    convertDateTimeDDMMYYYtoYYYYMMDD(dateString?: string) {
        return dateString?.slice(6, 10) + '-' + dateString?.slice(3, 5) + '-' + dateString?.slice(0, 2) + dateString?.slice(10, dateString.length);
    },
    convertDateTimeMMDDYYYtoDDMMYYY(dateString?: string) {
        return dateString?.slice(3, 5) + '/' + dateString?.slice(0, 2) + dateString?.slice(10, dateString.length) + '/' + dateString?.slice(6, 10);
    },
    isMatchDateDD_MM_YYY(date: string) {
        return date?.match(/^([0-2][0-9]|(3)[0-1])(-)(((0)[0-9])|((1)[0-2]))(-)\d{4}$/g);
    },
    isMatchDateTimeDD_MM_YYY(date: string) {
        return date?.toString().match(/^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/g)
            || date?.toString().match(/^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/g);
    },
    convertDataToYYYY_MM_DD(dateString?: string) {
        const date = dateString ? new Date(dateString) : new Date();
        var dd = String(date.getDate()).padStart(2, '0');
        var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = date.getFullYear();
        return yyyy + '-' + mm + '-' + dd;
    },
    convertFromDateTimeDDMMYYYtoYYYYMMDD(dateString?: string) {
        return dateString?.slice(6, 10) + '-' + dateString?.slice(3, 5) + '-' + dateString?.slice(0, 2) + ' 00:00:00.0';
    }
    ,
    convertToDateTimeDDMMYYYtoYYYYMMDD(dateString?: string) {
        return dateString?.slice(6, 10) + '-' + dateString?.slice(3, 5) + '-' + dateString?.slice(0, 2) + ' 23:59:00.0';
    }
};

export const getCurrentDate = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
};
export const getCurrentDateTime = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = date.getFullYear();

    const h = date.getHours();
    const m = date.getMinutes();
    const s = date.getSeconds();
    return `${dd}/${mm}/${yyyy} ${h}:${m}:${s}`;
};
export const getDateString = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return dd + '/' + mm + '/' + yyyy;
};

//is match dd-mm-yyyy
export const isMatchDateDD_MM_YYYY = (date: string) => {
    return date?.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/g);
}
export const isMatchDateTimeDD_MM_YYY = (date: string) => {
    return date?.match(/^([1-9]|([012][0-9])|(3[01]))-([0]{0,1}[1-9]|1[012])-\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/g)
        || date?.match(/^([1-9]|([012][0-9])|(3[01]))\/([0]{0,1}[1-9]|1[012])\/\d\d\d\d (20|21|22|23|[0-1]?\d):[0-5]?\d:[0-5]?\d$/g);
}

export const convertDataToYYYY_MM_DD = (dateString?: string) => {
    const date = dateString ? new Date(dateString) : new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    return yyyy + '-' + mm + '-' + dd;
};

export const convertDateDDMMYYYtoYYYYMMDD = (dateString?: string) => {
    return dateString?.slice(6, dateString.length) + '-' + dateString?.slice(3, 5) + '-' + dateString?.slice(0, 2);
};

export function thousandSeparator(v) {
    if (!v)
        return v;
    var numParts = v?.toString().replaceAll(',', '')?.toString().split(".");
    numParts[0] = numParts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return numParts.join(".");
}