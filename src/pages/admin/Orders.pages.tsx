import { Grid } from '@mui/material'
import { styled } from '@mui/system'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Column, Order } from '../../common/utils/types'
import AppTable from '../../components/UI/Table'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { getAllOrders } from '../../store/orders/orders.thunk'
import { RootState } from '../../store/store'

const Orders = () => {
    const dispatch = useAppDispatch()
    const items = useSelector((state: RootState) => state.orders.items)

    useEffect(() => {
        dispatch(getAllOrders())
    }, [dispatch])

    const columns: Column<Order>[] = [
        {
            header: '№',
            key: '_id',
            index: true,
        },
        {
            header: 'Name',
            key: 'name',
            render: (meal: Order) => <h4>{meal.user.name}</h4>,
        },
        {
            header: 'Meals',
            key: 'title',
            render: (meal: Order) => (
                <>
                    {meal.items.map((item) => (
                        <p key={item._id}>{item.title}</p>
                    ))}
                </>
            ),
        },
        {
            header: 'Amount',
            key: 'amount',
            render: (meal: Order) => (
                <>
                    {meal.items.map((item) => (
                        <h5 key={item._id}>x{item.amount}</h5>
                    ))}
                </>
            ),
        },
        {
            header: 'Total Price',
            key: 'totalPrice',
            render: (meal: Order) => <Grid>${meal.totalPrice}</Grid>,
        },
    ]
    return (
        <StyledGrid>
            <AppTable
                columns={columns}
                rows={items}
                getUniqueId={(val) => val._id}
                withPagination={true}
            />
        </StyledGrid>
    )
}

export default Orders

const StyledGrid = styled(Grid)(() => ({
    margin: '4rem 2rem 10rem 2rem',
}))
