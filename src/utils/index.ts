
export const _Object = {
    removeEmptyValue(object: {[key: string]: any}){
        return Object.fromEntries(Object.entries(object).filter(([_, v]) => v));
    }

    
};

