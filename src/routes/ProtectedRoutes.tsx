import { Navigate } from 'react-router-dom'
import React from 'react'

type Props = {
    component: React.FC
    fallBackPath: string
    isAllowed: boolean
}

const ProtectedRoute = ({
    component: Component,
    fallBackPath,
    isAllowed,
}: Props) => {
    if (!isAllowed) {
        return <Navigate to={fallBackPath} />
    }
    return <Component />
}

export default ProtectedRoute
