import React, { useEffect } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { getAllMeals } from '../../../store/meals/meals.thunk'
import { styled } from '@mui/system'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'
import MealItem from './MealItem'
import Summary from '../summary/Summary'

const Meals = () => {
    const dispatch = useAppDispatch()
    const meals = useSelector((state: RootState) => state.meals.items)

    useEffect(() => {
        dispatch(getAllMeals())
    }, [dispatch])

    return (
        <>
        <Summary />
        <Card>
            {meals.map((meal) => {
                return <MealItem meal={meal} key={meal._id} />
            })}
        </Card>
        </>
    )
}

export default Meals

const Card = styled('div')(() => ({
    background: '#fff',
    borderRadius: '16px',
    width: '75%',
    margin: '60px auto',
    padding: '40px',
}))
