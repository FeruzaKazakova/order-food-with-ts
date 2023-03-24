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

export interface Meal {
    readonly _id: string
    price: number
    title: string
    amount: number
    description: string
}

type Item = {
    title: string
    amount: number
    price: number
    _id: string
}

export interface Order {
    readonly _id: string
    totalPrice: number
    items: Item[]
    user: {
        name: string
        _id: string
    }
}

export type Basket = {
    title: string
    price: number
    id: string
    amount: number
}

export type Column<T> = {
    header: string
    key: string
    minWidth?: string | number
    align?: 'left' | 'right' | 'center'
    index?: boolean
    render?: (meal: T) => JSX.Element
}