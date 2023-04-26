import { BrowserRouter, Navigate, Outlet, Route, RouteProps, Routes } from 'react-router-dom';
import { WelcomeScreen } from '../pages/welcome/WelcomePage';
import UserLoginScreen from '../pages/user-login/UserLoginScreen';
import { UserRegisterScreen } from '../pages/user-register/UserRegister';

// const PrivateRoute = () => {
//     const { access_token } = useAppSelector(selectAuthenticatedUser)
//     return access_token ? <Outlet /> : <Navigate to="/" />
// }

const RootNavigation = () => {
    return (
        <Routes>
            <Route path="/" element={<WelcomeScreen />} />
            <Route path="/user-login" element={<UserLoginScreen />} />
            <Route path="/user-register" element={<UserRegisterScreen />} />
        </Routes>
    )
}

export default RootNavigation