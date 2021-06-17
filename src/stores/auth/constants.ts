const root = 'auth_'

export type State = {
    token: string,
    csrf_token: string,
    user:{
        id:string,
        code:string,
        name:string,
    },
}


