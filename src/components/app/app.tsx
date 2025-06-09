import {
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
import { IngredientDetailsPage } from '../../pages/ingredient-details/ingredient-details';
import { NotFoundPage } from '../../pages/not-found/not-found';
import { IngredientDetail } from '../burger-ingredients/ingredient-detail/ingredient-detail';
import { Modal } from '../modal/modal';
import { removeIngredient } from '../../services/ingredient/action';
import { useEffect } from 'react';
import { getIngredients } from '../../services/ingredients/action';
import { useAppDispatch } from '../../hooks/hooks';
import { ProfilePage } from '../../pages/profile/profile';
import { FeedPage } from '../../pages/feed/feed';
import { OrderInfo } from '../orders/order-info';
import { OrdersPage } from '../../pages/profile/orders';
import { OrderInfoPage } from '../../pages/order-info/order-info';
import { removeFromStorage } from '../utils/storage';

export const App = () => {
	const location = useLocation();
	const navigate: NavigateFunction = useNavigate();
	const dispatch = useAppDispatch();
	const backgroundLocation = location.state?.backgroundLocation;

	const handleModalClose = () => {
		dispatch(removeIngredient());
		removeFromStorage('modalState');
		navigate(backgroundLocation || -1);
	};

	useEffect(() => {
		dispatch(getIngredients());
	}, [dispatch]);

	useEffect(() => {
		console.log('Location changed:', location);
	}, [location]);

	return (
		<>
			<AppHeader />
			<Routes location={backgroundLocation || location}>
				{/* Общедоступные маршруты */}
				<Route path='/' element={<MainPage />} />
				<Route path='/ingredients/:id' element={<IngredientDetailsPage />} />
				<Route path='feed' element={<FeedPage />} />
				<Route path='feed/:number' element={<OrderInfoPage />} />
				<Route element={<ProtectedRoute isNeedAuth={true} />}>
					<Route path='profile/orders/:number' element={<OrderInfoPage />} />
				</Route>

				<Route element={<Layout />}>
					{/* Незащищенные маршруты (только для неавторизованных) */}
					<Route element={<ProtectedRoute isNeedAuth={false} />}>
						<Route path='login' element={<LoginPage />} />
						<Route path='register' element={<RegisterPage />} />
						<Route path='forgot-password' element={<ForgotPasswordPage />} />
						<Route path='reset-password' element={<ResetPasswordPage />} />
					</Route>

					{/* Защищенные маршруты (только для авторизованных) */}
					<Route element={<ProtectedRoute isNeedAuth={true} />}>
						<Route path='/profile' element={<ProfilePage />}>
							<Route index element={<Profile />} />
							<Route path='orders' element={<OrdersPage />} />
						</Route>
						<Route path='profile/orders/:number' element={<OrderInfoPage />} />
					</Route>
				</Route>
				<Route path='*' element={<NotFoundPage />} />
			</Routes>
			{backgroundLocation && (
				<Routes>
					<Route
						path='/ingredients/:id'
						element={
							<Modal closeModal={handleModalClose} header='Детали ингредиента'>
								<IngredientDetail />
							</Modal>
						}
					/>
					<Route
						path='/feed/:number'
						element={
							<Modal header='' closeModal={handleModalClose}>
								<OrderInfo />
							</Modal>
						}
					/>
					<Route
						path='/profile/orders/:number'
						element={
							<Modal header='' closeModal={handleModalClose}>
								<OrderInfo />
							</Modal>
						}
					/>
				</Routes>
			)}
		</>
	);
};
