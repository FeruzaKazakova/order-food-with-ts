import { styled } from '@mui/system'
import Modal from '../Modal'
import BasketItem from './BasketItem'
import TotalAmount from './TotalAmount'
import { useSelector } from 'react-redux'
import { useAppDispatch } from '../../../hooks/useAppDispatch'
import { RootState } from '../../../store/store'
import {
    deleteBasketItem,
    getBasket,
    updateBasketItem,
} from '../../../store/basket/basket.thunk'
import { postOrders } from '../../../store/orders/orders.thunk'

type Props = {
    onClose: () => void
    open: boolean
}

const Basket = ({ onClose, open }: Props) => {
    const items = useSelector((state: RootState) => state.basket.items)
    const dispatch = useAppDispatch()

    const getTotalPrice = () => {
        return items.reduce((sum, { price, amount }) => sum + amount * price, 0)
    }

    const decreaseAmount = (id: string, amount: number) => {
        if (amount > 1) {
            dispatch(
                updateBasketItem({
                    amount: amount - 1,
                    id,
                    title: '',
                    price: 0,
                })
            )
        } else {
            dispatch(deleteBasketItem(id))
        }
    }
    const increaseAmount = (id: string, amount: number) => {
        dispatch(
            updateBasketItem({
                amount: amount + 1,
                id,
                title: '',
                price: 0,
            })
        )
    }

    const price = {
        totalPrice: getTotalPrice(),
    }

    const orederSubmitHandler = async () => {
        try {
            await dispatch(postOrders(price)).unwrap()
            dispatch(getBasket())
        } catch (error) {
            console.log(error)
        } finally {
            onClose()
        }
    }

    return (
        <>
            <Modal open={open} onClose={onClose}>
                <Content>
                    {items.length ? (
                        <FixedHeightContainer>
                            {items.map((item) => {
                                return (
                                    <BasketItem
                                        key={item._id}
                                        increaseAmount={() =>
                                            increaseAmount(
                                                item._id,
                                                item.amount
                                            )
                                        }
                                        decreaseAmount={() =>
                                            decreaseAmount(
                                                item._id,
                                                item.amount
                                            )
                                        }
                                        title={item.title}
                                        price={item.price}
                                        amount={item.amount}
                                    />
                                )
                            })}
                        </FixedHeightContainer>
                    ) : null}
                    <TotalAmount
                        price={getTotalPrice()}
                        onClose={onClose}
                        onOrder={orederSubmitHandler}
                    />
                </Content>
            </Modal>
        </>
    )
}

export default Basket

const Content = styled('div')(() => ({
    width: '100%',
    height: '100%',
    padding: '0 1rem 1.5rem',
}))
const FixedHeightContainer = styled('div')(() => ({
    maxHeight: '228px',
    overflowY: 'scroll',
}))
