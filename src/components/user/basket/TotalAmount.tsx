import { Button } from '@mui/material'
import { styled } from '@mui/system'

type Props = {
    price: number
    onClose: () => void
    onOrder: () => void
}

const TotalAmount = ({ price, onClose, onOrder }: Props) => {
    const orderButton = price > 0 ? <OrderCloseButton onClick={onOrder}>Order</OrderCloseButton> : null

    const fixedPrice = price.toFixed(2)

    return (
        <div style={{ paddingTop: 30 }}>
            <InfoContainer>
                <Label>Total amount</Label>
                <Price>${fixedPrice}</Price>
            </InfoContainer>
            <ActionButtonsCpntainer>
                <OrderCloseButton onClick={onClose}>
                    Close
                </OrderCloseButton>
                {orderButton}
            </ActionButtonsCpntainer>
        </div>
    )
}

export default TotalAmount

const OrderCloseButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#8A2B06',
    width: '15%',
    alignSelf: 'center',
    marginTop: '1.5rem',
    marginBottom: '1rem',
    borderRadius: '20px',

    '&:hover': {
        backgroundColor: '#eb892e',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#8d401f',
        color: '#fff',
    },
}))


const Label = styled('p')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '700',
    fontSize: '20px',
    lineHeight: '30px',
    textAlign: 'center',
    color: '#222222',
    margin: '0',
}))

const Price = styled('p')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '33px',
    margin: 0,
    color: '#8A2B06',
}))

const InfoContainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
}))
const ActionButtonsCpntainer = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: '24px',
    gap: '16px',
}))
