import { styled } from '@mui/system'
import { Button, TextField } from '@mui/material'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { addToBasket } from '../../../store/basket/basket.thunk'
import { useSelector } from 'react-redux'
import { RootState } from '../../../store/store'

type Props = {
    id: string
    title: string
    price: number
}

const MealItemForm = ({ id, title, price }: Props) => {
    const dispatch = useAppDispatch()

    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )

    const [amount, setAmount] = useState(1)

    const amountChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setAmount(+event.target.value)
    }

    const submitHandler = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        const basketItem = {
            id,
            price,
            title,
            amount,
        }

        dispatch(addToBasket(basketItem))
    }

    const alertHandler = () => {
        if(!isAuthorized){
            return alert('You are not logged in yet! Time to fix it ))')
        }
    }

    return (
        <>
            <StyledForm onSubmit={submitHandler}>
                <Container>
                    <label htmlFor={id}>Amount</label>
                    <StyledTextField
                        value={amount}
                        onChange={amountChangeHandler}
                        id={id}
                        type="number"
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Container>
                <AddButton onClick={alertHandler} type='submit'>
                    <p>+</p>
                    Add
                </AddButton>
            </StyledForm>
        </>
    )
}

export default MealItemForm

const AddButton = styled(Button)(() => ({
    color: '#fff',
    fontSize: '14px',
    backgroundColor: '#8A2B06',
    width: '10%',
    marginBottom: '1rem',
    borderRadius: '30px',
    padding: '1px 50px 1px 50px',

    '&:hover': {
        backgroundColor: '#5A1F08',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#8d401f',
        color: '#fff',
    },
}))

const StyledTextField = styled(TextField)(() => ({
    width: '60px',
    marginTop: '-0.6rem',
}))

const Container = styled('div')(() => ({
    marginBottom: '12px',
    label: {
        fontFamily: 'Poppins',
        fontStyle: 'normal',
        fontWeight: '600',
        fontSize: '18px',
        lineHeight: '27px',
        color: '#222222',
        marginRight: '20px',
    },
    input: {
        width: '60px',
        height: '32px',
        borderRadius: '6px',
        border: '1px solid #d6d6d6',
        outline: 'none',
        padding: '4px 12px',
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: '24px',
    },
}))

const StyledForm = styled('form')(() => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end',
}))
