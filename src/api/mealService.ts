import { Meal } from '../common/utils/types'
import { FormSchema } from '../components/admin/pages/meals/MealModal'
import { mainApi } from './instances'

type AllMealsResponse = {
    data: Meal[]
}

const getAllMeals = () => {
    return mainApi.get<AllMealsResponse>('foods')
}

type MealResponse = {
    data: Meal
}

const getMealById = (id: string) => {
    return mainApi.get<MealResponse>(`foods/${id}`)
}

const postMealRequest = (data: FormSchema) => {
    return mainApi.post('/foods', data)
}

const editMealRequest = (id: string, data: FormSchema) => {
    return mainApi.put(`/foods/${id}`, data)
}

const deleteMealRequest = (id: string) => {
    return mainApi.delete(`/foods/${id}`)
}

export default {
    getAllMeals,
    getMealById,
    postMealRequest,
    editMealRequest,
    deleteMealRequest,
}
