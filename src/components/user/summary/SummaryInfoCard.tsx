import { styled } from '@mui/system'

const SummaryInfoCard = () => {
    return (
        <Card>
            <StyledTitle>Delicious Food, delivered to you</StyledTitle>
            <p>
                Choose your favorite meal from our broad selection of available
                meals and enjoy a delicious lunch or dinner at home.
            </p>
            <p>
                All our meals are cooked with high-quality ingredients,
                just-in-time and of course by experienced chefs!
            </p>
        </Card>
    )
}

export default SummaryInfoCard

const Card = styled('div')(() => ({
    maxWidth: '52.375rem',
    backgroundColor: '#383838',
    padding: '36px 54px',
    boxShadow: '0px 6px 16px rgba(0, 0, 0, 0.3)',
    borderRadius: '16px',
    position: 'relative',
    margin: '-12rem auto',

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
