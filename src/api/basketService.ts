import { Basket } from '../common/utils/types'
import { mainApi } from './instances'

export const addToBasketRequest = (newItem: Basket) => {
    return mainApi.post(`/foods/${newItem.id}/addToBasket`, {
        amount: newItem.amount,
    })
}

export const getBasketRequest = () => {
    return mainApi.get('/basket')
}

export const updateBasketItemRequest = (id: string, basketAmount: number) => {
    return mainApi.put(`/basketItem/${id}/update`, {
        amount: basketAmount,
    })
}

export const deleteBasketItemRequest = (id: string) => {
    return mainApi.delete(`/basketItem/${id}/delete`)
}
