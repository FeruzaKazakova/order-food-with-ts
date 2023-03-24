import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import orderService from '../../api/orderService'
import { getBasket } from '../basket/basket.thunk'

export const getAllOrders = createAsyncThunk(
    'order/getAllOrders',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getAllOrders()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)

export const getOrder = createAsyncThunk(
    'order/getOrder',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await orderService.getOrder()
            return data.data
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)

export const postOrders = createAsyncThunk(
    'order/postOrder',
    async (
        totalPrice: { totalPrice: number },
        { dispatch, rejectWithValue }
    ) => {
        try {
            await orderService.postOrderRequest(totalPrice)
            dispatch(getBasket())
        } catch (e) {
            if (isAxiosError(e)) {
                const error = e as AxiosError<{
                    status: number
                    message: string
                }>
                return rejectWithValue(error.response?.data.message)
            }
            return rejectWithValue('Something went wrong')
        }
    }
)
