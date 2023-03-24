import { styled } from '@mui/system'
import { Meal } from '../../../common/utils/types'
import MealItemForm from './MealItemForm'

type Props = {
    meal: Meal
}

const MealItem = ({ meal }: Props) => {
    return (
        <Container>
            <StyledItemInfo>
                <StyledTitle>{meal.title}</StyledTitle>
                <p>{meal.description}</p>
                <StyledPrice>${meal.price}</StyledPrice>
            </StyledItemInfo>
            <MealItemForm id={meal._id} price={meal.price} title={meal.title}/>
        </Container>
    )
}

export default MealItem

const Container = styled('li')(() => ({
    listStyle: 'none',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: '1px solid #D6D6D6',
    marginBottom: '20px',
}))

const StyledItemInfo = styled('div')(() => ({
    marginBottom: '20px',
    p: {
    fontFamily: 'Poppins',
    fontStyle: 'italic',
    fontWeight: '400',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#222222',
    margin: '0px 0px 4px 0px',
    }
}))

const StyledPrice = styled('span')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '30px',
    color: '#AD5502',
}))

const StyledTitle = styled('h4')(() => ({
    fontFamily: 'Poppins',
    fontStyle: 'normal',
    fontWeight: '600',
    fontSize: '18px',
    lineHeight: '27px',
    color: '#222222',
    margin: '0px 0px 4px 0px',
}))