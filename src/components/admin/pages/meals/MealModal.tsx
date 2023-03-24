import { Modal as MuiModal, TextField, Button, Box } from '@mui/material'
import { styled } from '@mui/system'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import mealService from '../../../../api/mealService'
import { addMeals } from '../../../../store/meals/meals.thunk'
import { useAppDispatch } from '../../../../hooks/useAppDispatch'

const schema = z.object({
    title: z.string().nonempty(),
    description: z.string().nonempty(),
    price: z.number().min(1),
})

export type FormSchema = (typeof schema)['_output']

type Props = {
    open: boolean
    onClose: () => void
    onSubmit: (id: string, values: FormSchema) => void
}

const MealModal = ({ open, onClose, onSubmit }: Props) => {
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams()

    const { register, handleSubmit, reset, formState } = useForm({
        defaultValues: {
            price: 1,
            title: '',
            description: '',
        },
        resolver: zodResolver(schema),
    })

    useEffect(() => {
        const mealId = searchParams.get('mealId')
        if (open && searchParams.get('modal') === 'edit' && mealId) {
            mealService.getMealById(mealId).then(({ data }) => {
                reset(data.data)
            })
        }
    }, [open])

    const id = searchParams.get('mealId') || '1'

    const submitHandler = (values: FormSchema) => {
        open && searchParams.get('modal') === 'edit'
            ? onSubmit(id, values)
            : dispatch(addMeals(values)).then(() => onClose())
    }

    return (
        <>
            <MuiModal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <form onSubmit={handleSubmit(submitHandler)}>
                        <StyledModalContent>
                            <TextField
                                error={!!formState.errors.title}
                                {...register('title')}
                                name="title"
                                label="Name"
                                type="text"
                            />
                            <TextField
                                error={!!formState.errors.description}
                                {...register('description')}
                                sx={{ marginTop: '1rem' }}
                                name="description"
                                label="Description"
                                type="text"
                            />
                            <TextField
                                error={!!formState.errors.price}
                                {...register('price', { valueAsNumber: true })}
                                sx={{ marginTop: '1rem' }}
                                name="price"
                                label="Price"
                                type="number"
                            />
                            <ButtonContainer>
                                <StyledAddButton type="submit">Add</StyledAddButton>
                                <StyledCloseButton
                                    style={{ marginLeft: '1rem' }}
                                    onClick={onClose}
                                >
                                    Close
                                </StyledCloseButton>
                            </ButtonContainer>
                        </StyledModalContent>
                    </form>
                </Box>
            </MuiModal>
        </>
    )
}

export default MealModal

const StyledModalContent = styled('div')(() => ({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    top: '20vh',
    backgroundColor: 'white',
    padding: '1rem',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    zIndex: '30',
    animation: 'slide-down 300ms ease-out forwards',

    width: '40rem',
    left: 'calc(50% - 20rem)',
}))

const ButtonContainer = styled('div')(() => ({
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'flex-end',
}))

const StyledAddButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#b43d0e',
    marginRight: '2rem',
    marginBottom: '1rem',
    width: '15%',

    '&:hover': {
        backgroundColor: '#eb892e',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#8d401f',
        color: '#fff',
    },
}))

const StyledCloseButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#958985',
    marginRight: '2rem',
    marginBottom: '1rem',
    width: '15%',

    '&:hover': {
        backgroundColor: '#84786d',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#555454',
        color: '#fff',
    },
}))