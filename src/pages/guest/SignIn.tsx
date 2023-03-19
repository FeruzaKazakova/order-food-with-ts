import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
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

    const { getValues, handleSubmit, register, formState } = useForm({
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
                        <Button type="submit">Sign In</Button>
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
