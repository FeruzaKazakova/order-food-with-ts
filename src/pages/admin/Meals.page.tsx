import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteMeals,
    editMeals,
    getAllMeals,
} from '../../store/meals/meals.thunk'
import { styled } from '@mui/system'
import { AppDispatch, RootState } from '../../store/store'
import { Grid, Button } from '@mui/material'
import IconButton from '@mui/material/IconButton/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import AppTable from '../../components/UI/Table'
import { Column, Meal } from '../../common/utils/types'
import MealModal, {
    FormSchema,
} from '../../components/admin/pages/meals/MealModal'
import { useSearchParams } from 'react-router-dom'

const MealsPage = () => {
    const dispatch = useDispatch<AppDispatch>()
    const meals = useSelector((state: RootState) => state.meals.items)

    const [searchParams, setSearchParams] = useSearchParams()

    useEffect(() => {
        dispatch(getAllMeals())
    }, [])

    const showModalHandler = (mode: 'add' | 'edit') => {
        searchParams.set('modal', mode)
        setSearchParams(searchParams)
    }

    const closeModalHandler = () => {
        searchParams.delete('modal')
        setSearchParams(searchParams)
    }

    const deleteMealHandler = (id: string) => {
        console.log(id)
        dispatch(deleteMeals(id))
    }

    const editMealHandler = (id: string) => {
        showModalHandler('edit')
        searchParams.set('mealId', id)
        setSearchParams(searchParams)
    }

    const columns: Column<Meal>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },

        {
            header: 'Title',
            key: 'title',
        },

        {
            header: 'Price ($)',
            key: 'price',
        },

        {
            header: 'Description',
            key: 'description',
        },

        {
            header: 'Actions',
            key: 'actions',
            render: (meal: Meal) => (
                <Grid>
                    <IconButton onClick={() => editMealHandler(meal._id)}>
                        <EditIcon />
                    </IconButton>

                    <IconButton onClick={() => deleteMealHandler(meal._id)}>
                        <DeleteIcon />
                    </IconButton>
                </Grid>
            ),
        },
    ]

    const saveHandler = (id: string, values: FormSchema) => {
        dispatch(editMeals({ id, values })).then(() => closeModalHandler())
    }

    const isModalOpen = !!searchParams.get('modal')

    return (
        <Grid sx={{marginBottom: '10rem'}}>
            <AddNewMealButton onClick={() => showModalHandler('add')}>
                Add new meal
            </AddNewMealButton>
            <MealModal
                onSubmit={saveHandler}
                open={isModalOpen}
                onClose={closeModalHandler}
            />
            <StyledGrid>
                <AppTable
                    columns={columns}
                    rows={meals}
                    getUniqueId={(val) => val._id}
                    withPagination={true}
                />
            </StyledGrid>
        </Grid>
    )
}

export default MealsPage

const AddNewMealButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#b43d0e',
    width: '10%',
    alignSelf: 'center',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    marginLeft: '2rem',

    '&:hover': {
        backgroundColor: '#c67427',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#8d401f',
        color: '#fff',
    },
}))

const StyledGrid = styled(Grid)(() => ({
    marginLeft: '2rem',
    marginRight: '2rem',
}))