import axios from 'axios'
import { store } from '../store/store'

export const mainApi = axios.create({
    baseURL:
        'http://ec2-3-122-253-30.eu-central-1.compute.amazonaws.com:5500/api/v1',
})

mainApi.interceptors.request.use(
    function (config) {
        config.headers.set('Authorization', store.getState().auth.token)
        return config
    },
    function (error) {
        return error
    }
)
