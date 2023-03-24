import { useSelector } from 'react-redux'
import { Route, Routes } from 'react-router-dom'
import { UserRoles } from '../common/utils/types'
import Meals from '../components/user/meals/Meals'
import { AdminLayout } from '../layout/admin'
import { UserLayout } from '../layout/user'
import MealsPage from '../pages/admin/Meals.page'
import Orders from '../pages/admin/Orders.pages'
import { SignInPage } from '../pages/guest/SignIn'
import { SignUpPage } from '../pages/guest/SignUp'
import { RootState } from '../store/store'
import ProtectedRoute from './ProtectedRoutes'

export const AppRoutes = () => {
    const role = useSelector((state: RootState) => state.auth.user.role)
    const isAllowed = (roles: string[]) => {
        return roles.includes(role)
    }

    return (
        <Routes>
            <Route
                path="/"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.GUEST, UserRoles.USER])}
                        fallBackPath="admin/meals"
                        component={UserLayout}
                    />
                }
            >
                <Route
                    index
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="admin/meals"
                            component={Meals}
                        />
                    }
                />
                <Route
                    path="signup"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? 'admin/meals' : '/'
                            }
                            component={SignUpPage}
                        />
                    }
                />
                <Route
                    path="signin"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath={
                                role === UserRoles.ADMIN ? 'admin/meals' : '/'
                            }
                            component={SignInPage}
                        />
                    }
                />
                <Route
                    path="myorders"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([
                                UserRoles.GUEST,
                                UserRoles.USER,
                            ])}
                            fallBackPath="admin/meals"
                            component={() => <p>Orders</p>}
                        />
                    }
                />
            </Route>

            <Route
                path="/admin"
                element={
                    <ProtectedRoute
                        isAllowed={isAllowed([UserRoles.ADMIN])}
                        fallBackPath="/"
                        component={AdminLayout}
                    />
                }
            >
                <Route
                    path="meals"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={MealsPage}
                        />
                    }
                />
                <Route
                    path="orders"
                    element={
                        <ProtectedRoute
                            isAllowed={isAllowed([UserRoles.ADMIN])}
                            fallBackPath="/"
                            component={Orders}
                        />
                    }
                />
            </Route>
            <Route path="*" element={<p>error</p>} />
        </Routes>
    )
}
