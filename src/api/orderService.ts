import { Order } from '../common/utils/types'
import { mainApi } from './instances'

type AllOrdersResponse = {
    data: Order[]
}

const getAllOrders = () => {
    return mainApi.get<AllOrdersResponse>('/orders/all')
}

const getOrder = () => {
    return mainApi.get<AllOrdersResponse>('orders')
}

export const postOrderRequest = (totalPrice: { totalPrice: number }) => {
    return mainApi.post('/orders', totalPrice)
}

export default { getAllOrders, getOrder, postOrderRequest }
