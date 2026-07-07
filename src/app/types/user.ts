export type User={
    id:string,
    email:string,
    token:string,
    displayName:string,
    imageUrl?:string
}
export type LoginCreds={
    email:string,
    password:string
}
export type RegisterCreds={
    email:string,
    password:string,
    displayName:string,
    gender:string,
    dateOfBirth:string,
    city:string,
    country:string
}