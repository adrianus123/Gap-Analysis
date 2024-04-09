import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
    
const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/">
            <Route index element={<LoginPage />} />
            <Route path="sign-in" element={<LoginPage />} />
            <Route path="sign-up" element={<RegisterPage />} />
            <Route path="home" element={<HomePage /> } />
        </Route>
    )
)

export default router;