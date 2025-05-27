import {
	Location,
	NavigateFunction,
	Route,
	Routes,
	useLocation,
	useNavigate,
} from 'react-router-dom';
import { MainPage } from '../../pages/main/main';
import { LoginPage } from '../../pages/login/login';
import { ProtectedRoute } from '../route/protected-route';
import { AppHeader } from '../app-header/app-header';
import { Layout } from '../../pages/layout/layout';
import { RegisterPage } from '../../pages/register/register';
import { ForgotPasswordPage } from '../../pages/forgot-password/forgot-password';
import { ResetPasswordPage } from '../../pages/reset-password/reset-password';
import { Profile } from '../profile/profile';
import { Orders } from '../orders/orders';
import { Order } from '../order-detail/order';
import { IngredientDetailsPage } from '../../pages/ingredient-details/ingredient-details';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { IngredientDetail } from '../burger-ingredients/ingredient-detail/ingredient-detail';
import { Modal } from '../modal/modal';
import { removeIngredient } from '../../services/ingredient/action';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/action';
import { useAppDispatch } from '../../hooks/hooks';
import { ProfilePage } from '../../pages/profile/profile';

interface ILocationState {
	backgroundLocation?: Location;
}

export const App = () => {
	const location = useLocation();
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useAppDispatch();
	const backgroundLocation = (location.state as ILocationState)
		?.backgroundLocation;

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	const handleModalClose = () => {
		dispatch(removeIngredient());
		navigate(-1);
	};

	return (
		<>
			<AppHeader />
			<Routes location={backgroundLocation || location}>
				<Route path='/' element={<MainPage />} />
				<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />

				<Route
					element={
						<ProtectedRoute isNeedAuth={false} component={<Layout />} />
					}>
					<Route path='/login' element={<LoginPage />} />
					<Route path='/register' element={<RegisterPage />} />
					<Route path='/forgot-password' element={<ForgotPasswordPage />} />
					<Route path='/reset-password' element={<ResetPasswordPage />} />
				</Route>
				<Route
					element={<ProtectedRoute isNeedAuth={true} component={<Layout />} />}>
					<Route path='/orders' element={<Orders />} />
					<Route
						path='profile'
						element={
							<ProtectedRoute isNeedAuth={true} component={<ProfilePage />} />
						}>
						<Route index element={<Profile />} />
						<Route path='orders' element={<Orders />} />
						<Route path='orders/:id' element={<Order />} />
					</Route>
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			{backgroundLocation && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal
								//		isActive={true}
								closeModal={handleModalClose}
								header={'Детали ингредиента'}>
								<IngredientDetail />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
