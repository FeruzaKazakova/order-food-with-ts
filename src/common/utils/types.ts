export enum UserRoles {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}


export type SignInPayload = {
    email: string
    password: string
}

export type SignUpPayload = {
    name: string
    email: string
    password: string
    role: string
    confirm: string
}