export interface JWTPayload{
    sub:number, 
    role:string
}

export interface UserDto{
    username:string
    email:string
    password:string
    role?:string
}
