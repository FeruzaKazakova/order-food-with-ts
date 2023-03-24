import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import mealService from '../../api/mealService'
import { FormSchema } from '../../components/admin/pages/meals/MealModal'

type EditData = {
    id: string
    values: {
        title: string
        price: number
        description: string
    }
}

export const getAllMeals = createAsyncThunk(
    'meals/getAll',
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await mealService.getAllMeals()
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

export const addMeals = createAsyncThunk(
    'meals/addMeal',
    async (data: FormSchema, { rejectWithValue, dispatch }) => {
        try {
            await mealService.postMealRequest(data)
            return dispatch(getAllMeals())
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

export const editMeals = createAsyncThunk(
    'meals/editMeals',
    async ({ id, values }: EditData, { dispatch, rejectWithValue }) => {
        try {
            const { data } = await mealService.editMealRequest(id, values)
            dispatch(getAllMeals())
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

export const deleteMeals = createAsyncThunk(
    'meals/deleteMeal',
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await mealService.deleteMealRequest(id)
            return dispatch(getAllMeals())
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
