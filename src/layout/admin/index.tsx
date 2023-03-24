import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { AdminHeader } from './Header'
import { styled } from '@mui/system'
import BackgroundImg from '../../assets/images/orders-page-img.png'

export const AdminLayout = () => {
    return (
        <div>
            <AdminHeader />
            <Container>
                <StyledImg src={BackgroundImg} alt="orders" />
                <Card>
                    <StyledTitle>Dear Admin you are welcome!</StyledTitle>
                </Card>
            </Container>
            <Grid>
                <Outlet />
            </Grid>
        </div>
    )
}

const Container = styled('div')(() => ({
    height: '510px',
}))

const Card = styled('div')(() => ({
    maxWidth: '52.375rem',
    backgroundColor: '#313131',
    padding: '36px 54px',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
    borderRadius: '16px',
    position: 'relative',
    margin: '-9rem auto',

    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 500,
    fontSize: '16px',
    lineHeight: '24px',
    textAlign: 'center',
    color: '#fff',
}))

const StyledTitle = styled('h2')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 600,
    fontSize: '36px',
    lineHeight: '54px',

    color: '#fff',
}))

const StyledImg = styled('img')(() => ({
    width: '100%',
    height: '500px',
}))
