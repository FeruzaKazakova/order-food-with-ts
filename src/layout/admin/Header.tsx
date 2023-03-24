import { AppBar, Button, Grid, Toolbar } from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { signOut } from '../../store/auth/auth.thunk'
import { AppDispatch } from '../../store/store'

const menus = [
    {
        path: 'meals',
        title: 'Meals',
    },
    {
        path: 'orders',
        title: 'Orders',
    },
]

export const AdminHeader = () => {
    const dispatch = useDispatch<AppDispatch>()

    const signOutHandler = () => {
        dispatch(signOut())
    }

    return (
        <>
            <AppBar position="static">
                <StyledToolbar>
                    <Container>
                        <GridContainer>
                            {menus.map((item) => (
                                <StyledLink key={item.path} to={item.path}>
                                    {item.title}
                                </StyledLink>
                            ))}
                        </GridContainer>
                        <StyledButton color="inherit" onClick={signOutHandler}>
                            Log out
                        </StyledButton>
                    </Container>
                </StyledToolbar>
            </AppBar>
        </>
    )
}

const Container = styled(Toolbar)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#8A2B06',
    width: '100%',
    alignItems: 'center',
    position: 'fixed',
    zIndex: '800',
    height: '6rem',
    marginLeft: '-1.5rem',
}))

const StyledToolbar = styled(Toolbar)(() => ({
    backgroundColor: '#8A2B06'
}))

const GridContainer = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
    padding: '1rem',
    marginTop: '1rem',
}))

const StyledLink = styled(NavLink)(() => ({
    textDecoration: 'none',
    borderRadius: '4px',
    padding: '10px',
    backgroundColor: '#5A1F08',
    color: '#fff',
    '&:hover': {
        backgroundColor: '#451807',
    },
    '&:active': {
        backgroundColor: '#AD5502',
    },
}))

const StyledButton = styled(Button)(() => ({
    backgroundColor: '#5A1F08',
    padding: '10px',
    marginRight: '1rem',
    marginTop: '1rem',
    '&:hover': {
        backgroundColor: '#451807',
    },
    '&:active': {
        color: '#AD5502',
    },
}))