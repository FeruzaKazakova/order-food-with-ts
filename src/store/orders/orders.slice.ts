import { createSlice } from '@reduxjs/toolkit'
import { Order } from '../../common/utils/types'
import { getAllOrders, getOrder } from './orders.thunk'

type OrdersState = {
    items: Order[]
    order: Order[]
}

const initialState: OrdersState = {
    items: [],
    order: [],
}

export const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.items = action.payload
        })
        builder.addCase(getOrder.fulfilled, (state, action) => {
            state.order = action.payload
        })
    },
})
