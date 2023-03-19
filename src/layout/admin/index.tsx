import { Grid } from '@mui/material'
import { Outlet } from 'react-router-dom'
import { AdminHeader } from './Header'

export const AdminLayout = () => {
    return (
        <div>
            <AdminHeader />
            <Grid>
                <Outlet/>
            </Grid>
        </div>
  )
}
