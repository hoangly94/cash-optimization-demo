
export const _Object = {
    //remove key have falsy values
    removeEmptyValue(object: {[key: string]: any}){
        return Object.fromEntries(Object.entries(object).filter(([_, v]) => v));
    }

    
};
