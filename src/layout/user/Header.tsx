import { Button } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import BasketButton from '../../components/user/BasketButton'
import { signOut } from '../../store/auth/auth.thunk'
import { AppDispatch, RootState } from '../../store/store'

type Props = {
    onShowBasket: () => void
}

function Header({ onShowBasket }: Props) {
    const navigate = useNavigate()
    const isAuthorized = useSelector(
        (state: RootState) => state.auth.isAuthorized
    )
    const dispatch = useDispatch<AppDispatch>()
    const [animationClass, setAnimationClass] = useState('')

    // useEffect(() => {
    //     'hjkhk'
    // }, [dispatch])

    // useEffect(() => {
    //     setAnimationClass('bump')

    //     const id = setTimeout(() => {
    //         setAnimationClass('')
    //     }, 300)

    //     return () => {
    //         clearTimeout(id)
    //     }
    // }, [])

    const signOutHandler = () => {
        dispatch(signOut())
        navigate('/')
    }

    const signInHandler = () => {
        navigate('/signin')
    }

    const showBasketHandler = () => {
        return onShowBasket()
    }

    return (
        <Container>
            <Logo>ReactMeals</Logo>
            {isAuthorized ? (
                <StyledButton onClick={signOutHandler}>Sign Out</StyledButton>
            ) : (
                <StyledButton onClick={signInHandler}>Sign In</StyledButton>
            )}
            <BasketButton
                className={animationClass}
                count={0}
                onClick={showBasketHandler}
            />
        </Container>
    )
}

export default Header

const StyledButton = styled(Button)(() => ({
    padding: '10px 26px',
    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    color: 'white',
    border: 'none',
    backgroundColor: '#5A1F08',

    '&:hover': {
        backgroundColor: '#AD5502',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#2c0d00',
        color: '#fff',
    },
}))

const Container = styled('div')(() => ({
    width: '100%',
    height: '101px',
    backgroundColor: '#8A2B06',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: '120px',
    paddingRight: '120px',
    position: 'fixed',
    zIndex: '1',
    top: '0',
}))

const Logo = styled('p')(() => ({
    fontWeight: '600',
    fontSize: '38px',
    lineHeight: '57px',
    color: '#fff',
    margin: '0',
}))
