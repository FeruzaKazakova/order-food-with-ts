import { SignInPayload, SignUpPayload, UserRoles } from '../common/utils/types'
import { mainApi } from './instances'

type SignInResponse = {
    data: {
        token: string
        user: {
            name: string
            email: string
            role: UserRoles
        }
    }
}

const signInReq = (dataa: SignInPayload) => {
    return mainApi.post<SignInResponse>('auth/login', dataa)
}

const signUpReq = (data: SignUpPayload) => {
    return mainApi.post<SignInResponse>('auth/register', data)
}

export default { signInReq, signUpReq }
