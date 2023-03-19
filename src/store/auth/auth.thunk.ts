import { createAsyncThunk } from '@reduxjs/toolkit'
import { AxiosError, isAxiosError } from 'axios'
import authService from '../../api/authService'
import { STORAGE_KEYS } from '../../common/constants'
import { SignInPayload, SignUpPayload } from '../../common/utils/types'

export const signIn = createAsyncThunk(
    'auth/signin',
    async (payload: SignInPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.signInReq(payload)
            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
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

export const signOut = createAsyncThunk('auth/signout', async () => {
    return localStorage.removeItem(STORAGE_KEYS.AUTH)
})

export const signUp = createAsyncThunk(
    'auth/signUp',
    async (payload: SignUpPayload, { rejectWithValue }) => {
        try {
            const { data } = await authService.signUpReq(payload)
            localStorage.setItem(STORAGE_KEYS.AUTH, JSON.stringify(data.data))
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
