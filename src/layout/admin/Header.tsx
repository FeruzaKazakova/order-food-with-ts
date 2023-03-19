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
                <Toolbar>
                    <Container>
                        <GridContainer>
                            {menus.map((item) => (
                                <StyledLink key={item.path} to={item.path}>
                                    {item.title}
                                </StyledLink>
                            ))}
                        </GridContainer>
                        <Button color="inherit" onClick={signOutHandler}>
                            Log out
                        </Button>
                    </Container>
                </Toolbar>
            </AppBar>
        </>
    )
}

const Container = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#8A2B06',
    width: '97%',
    alignItems: 'center',
    position: 'fixed',
    zIndex: '800',
    marginTop: '-10rem',
    height: '5rem',
}))

const GridContainer = styled(Grid)(() => ({
    display: 'flex',
    alignItems: 'center',
    gap: '2rem',
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
        color: '#AD5502',
    },
}))
