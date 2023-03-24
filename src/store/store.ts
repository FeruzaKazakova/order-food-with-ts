import { configureStore } from '@reduxjs/toolkit'
import { authSlice } from './auth/auth.slice'
import { basketSlice } from './basket/basket.slice'
import { mealsSlice } from './meals/meals.slice'
import { ordersSlice } from './orders/orders.slice'

export const store = configureStore({
    reducer: {
        [authSlice.name]: authSlice.reducer,
        [mealsSlice.name]: mealsSlice.reducer,
        [ordersSlice.name]: ordersSlice.reducer,
        [basketSlice.name]: basketSlice.reducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
