import { Button, Grid, TextField, Typography } from '@mui/material'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { signIn } from '../../store/auth/auth.thunk'

export const SignInPage = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState('')

    const schema = z.object({
        email: z.string().email(),
        password: z.string().min(6),
    })

    type FormSchema = (typeof schema)['_output']

    const { handleSubmit, register, formState } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const submitHandler = (values: FormSchema) => {
        dispatch(signIn(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e: string) => setError(e))
    }

    return (
        <MainGridContainer>
            <StyledGrid>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <StyledGrid2>
                        <TextField
                            error={!!formState.errors.email}
                            {...register('email', {
                                required:
                                    'You need to enter your email address',
                            })}
                            label="Email"
                        />
                        {formState.errors.email && (
                            <Typography>
                                {formState.errors.email.message}
                            </Typography>
                        )}
                        <TextField
                            error={!!formState.errors.email}
                            {...register('password', {
                                required: 'You need to enter your password',
                            })}
                            label="Password"
                            sx={{ marginTop: '1rem' }}
                        />
                        {formState.errors.password && (
                            <Typography>
                                {formState.errors.password.message}
                            </Typography>
                        )}
                        <StyledSignInButton type="submit">
                            Sign In
                        </StyledSignInButton>
                        <Link to="/signup">{`Don't have an account?`}</Link>
                    </StyledGrid2>
                </form>
            </StyledGrid>
        </MainGridContainer>
    )
}

const StyledGrid = styled(Grid)(() => ({
    width: '500px',
    backgroundColor: '#fff',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '10px',
}))

const StyledGrid2 = styled(Grid)(() => ({
    display: 'flex',
    flexDirection: 'column',
}))

const MainGridContainer = styled(Grid)(() => ({
    display: 'flex',
    justifyContent: 'center',
    marginTop: '10rem',
}))

const StyledSignInButton = styled(Button)(() => ({
    color: '#fff',
    backgroundColor: '#AD5502',
    width: '30%',
    alignSelf: 'center',
    marginTop: '1.5rem',
    marginBottom: '1rem',

    '&:hover': {
        backgroundColor: '#eb892e',
        color: '#fff',
    },
    '&:active': {
        backgroundColor: '#8d401f',
        color: '#fff',
    },
}))
