import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { styled } from '@mui/system'
import Header from './Header'

export const UserLayout = () => {
    const [isBasketVisible, setBasketVisible] = useState<boolean>(false)

    const showBasketHandler = () => {
        setBasketVisible((prevState) => !prevState)
    }

    return (
        <>
            <Header onShowBasket={showBasketHandler}/>
            <Content>
                <Outlet />
            </Content>
        </>
    )
}

const Content = styled('div')(() => ({
    marginTop: '101px',
}))