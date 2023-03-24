import { styled } from '@mui/system'
import { Modal as MuiModal } from '@mui/material'
import { Box } from '@mui/material'

type Props1 = {
    children?: JSX.Element | JSX.Element[]
}

const ModalContent = ({ children }: Props1) => {
    return <StyledModalContent>{children}</StyledModalContent>
}

const StyledModalContent = styled('div')(() => ({
    position: 'fixed',
    display: 'flex',
    flexDirection: 'column',
    top: '20vh',
    backgroundColor: '#fff',
    padding: '1rem',
    borderRadius: '14px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.25)',
    zIndex: '30',
    animation: 'slide-down 300ms ease-out forwards',

    width: '40rem',
    left: 'calc(50% -  20rem)',
}))

type Props = {
    onClose: () => void
    open: boolean
    children?: JSX.Element | JSX.Element[]
}

const Modal = ({ children, onClose, open }: Props) => {
    return (
        <>
            <MuiModal
                open={open}
                onClose={onClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box>
                    <ModalContent>{children}</ModalContent>
                </Box>
            </MuiModal>
        </>
    )
}

export default Modal
