import { Button as MuiButton, styled, ButtonProps } from '@mui/material'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

type Props = ButtonProps & {
    count: number
}

const BasketButton = ({ count, ...restProps }: Props) => {
    return (
        <StyledButton {...restProps}>
            <ShoppingCartIcon />
            <StyledTitle>Your Cart </StyledTitle>
            <StyledCounter id="counter">{count || 0}</StyledCounter>
        </StyledButton>
    )
}

export default BasketButton

const StyledButton = styled(MuiButton)(() => ({
    backgroundColor: '#5A1F08',
    borderRadius: '30px',
    padding: '12px 32px',
    border: 'none',

    fontWeight: '600',
    fontSize: '16px',
    lineHeight: '24px',
    color: '#FFFFFF',
    cursor: 'pointer',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',

    '&:hover': {
        backgroundColor: '#2c0d00',
    },
    '&:hover > #counter': {
        backgroundColor: '#5e2913',
    },
    '&.bump': {
        animation: 'bump 300ms ease-out',
    },
    '@keyframes bump': {
        '0%': {
            transform: 'scale(1)',
        },
        '10%': {
            transform: 'scale(0.9)',
        },
        '30% ': {
            transform: 'scale(1.1)',
        },
        '50%': {
            transform: 'scale(1.15)',
        },
        '100%': {
            transform: 'scale(1)',
        },
    },
}))

const StyledTitle = styled('span')(() => ({
    marginLeft: '12px',
    marginRight: '24px',
    color: '#fff',
}))

const StyledCounter = styled('span')(() => ({
    backgroundColor: '#8A2B06',
    borderRadius: '30px',
    fontWeight: 700,
    fontSize: '20px',
    lineHeight: '27px',
    padding: '4px 20px',
}))
