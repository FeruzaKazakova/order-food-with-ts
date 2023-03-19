import { Button, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { styled } from '@mui/system'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { UserRoles } from '../../common/utils/types'
import { signUp } from '../../store/auth/auth.thunk'

export const SignUpPage = () => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const [error, setError] = useState('')

    const schema = z.object({
        name: z.string(),
        email: z.string().email('You need to write your email address'),
        password: z.string().min(6),
        role: z.string(),
        confirm: z.string(),
    })

    type FormSchema = (typeof schema)['_output']

    const { getValues, handleSubmit, register, formState } = useForm({
        defaultValues: {
            name: '',
            email: '',
            password: '',
            role: UserRoles.ADMIN,
            confirm: '',
        },
        mode: 'onBlur',
        resolver: zodResolver(schema),
    })

    const submitHandler = (values: FormSchema) => {
        dispatch(signUp(values))
            .unwrap()
            .then(() => navigate('/'))
            .catch((e) => setError(e.response.data.message))
    }

    return (
        <MainGridContainer>
            <StyledGrid>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <StyledGrid2>
                        <TextField
                            error={!!formState.errors.name}
                            {...register('name', {
                                required: 'You need to write your name',
                            })}
                            label="Name"
                        />
                        {formState.errors.name && (
                            <Typography>
                                {formState.errors.name.message}
                            </Typography>
                        )}
                        <TextField
                            error={!!formState.errors.email}
                            {...register('email', {
                                required:
                                    'You need to enter your email address',
                            })}
                            label="Email"
                            sx={{ marginTop: '1rem' }}
                        />
                        {formState.errors.email && (
                            <Typography>
                                {formState.errors.email.message}
                            </Typography>
                        )}
                        <TextField
                            error={!!formState.errors.password}
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
                        <TextField
                            error={!!formState.errors.confirm}
                            {...register('confirm')}
                            label="Confirm password"
                            sx={{ marginTop: '1rem' }}
                        />
                        {formState.errors.confirm && (
                            <Typography>
                                {formState.errors.confirm.message}
                            </Typography>
                        )}
                        <Button type="submit" sx={{ marginTop: '1rem' }}>
                            Sign Up
                        </Button>
                        <Link to="/signin">Have an account?</Link>
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
