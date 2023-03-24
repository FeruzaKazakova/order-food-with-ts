import {styled} from '@mui/system'
import { Button } from '@mui/material'

type Props = {
    title: string
    price: number
    amount: number
    decreaseAmount: () => void
    increaseAmount: () => void
}

const BasketItem = ({title, price, amount, decreaseAmount, increaseAmount}: Props) => {

  return (
    <Container>
        <Title>
            {title}
        </Title>
        <Content>
            <PriceAndAmountContainer>
                <Price>${price}</Price>
                <Amount>x{amount}</Amount>
            </PriceAndAmountContainer>
            <CounterContainer>
                <DecreaseIncreaseButton onClick={decreaseAmount}>-</DecreaseIncreaseButton>
                <DecreaseIncreaseButton onClick={increaseAmount}>+</DecreaseIncreaseButton>
            </CounterContainer>
        </Content>
    </Container>
  )
}

export default BasketItem

const DecreaseIncreaseButton = styled(Button)(() => ({
    color: '#fff',
    fontSize: '16px',
    backgroundColor: '#8A2B06',
    width: '10%',
    marginBottom: '1rem',
    borderRadius: '10px',

    '&:hover': {
        backgroundColor: '#5A1F08',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#8d401f',
        color: '#fff',
    },
}))

const Container = styled('div')(() => ({
    padding: '24px 0px',
    width: '95%',
    borderBottom: '1px solid #D6D6D6',
}))

const Title = styled('p')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '20px',
    lineHeight: '30px',
    color: '#222222',
    margin: '0 0 -10px 0'
}))

const Price = styled('p')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '22px',
    lineHeight: '33px',
    color: '#8A2B06',
}))

const Amount = styled('span')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '500',
    fontSize: '16px',
    lineHeight: '24px',
    display: 'block',
    color: '#222222',
    border: '1px solid #D6D6D6',
    padding: '6px 14px',
    borderRadius: '6px',
}))

const PriceAndAmountContainer = styled('div')(() => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '153px',
}))

const CounterContainer = styled('div')(() => ({
    display: 'flex',
    gap: '14px'
}))

const Content = styled('div')(() => ({
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
}))