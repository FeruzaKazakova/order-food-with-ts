import { styled } from '@mui/system'
import SummaryInfoCard from './SummaryInfoCard'
import BackgroundImg from '../../../assets/images/summary-img.jpg'

const Summary = () => {
    return (
        <Container>
            <StyledImg src={BackgroundImg} alt="summary" />
            <SummaryInfoCard />
        </Container>
    )
}

export default Summary

const Container = styled('div')(() => ({
    height: '527px',
}))

const StyledImg = styled('img')(() => ({
    width: '100%',
    height: '432px',
}))