import { useEffect, FC } from 'react';
import { getUser } from '../../services/auth/action';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import { usePersistedModal } from '../../hooks/usePersistedModal';

export const ProtectedRoute: FC<{ isNeedAuth: boolean }> = ({ isNeedAuth }) => {
	const dispatch = useAppDispatch();
	const { user, isLoading } = useAppSelector((store) => store.auth);
	const location = useLocation();
	const modalLocation = usePersistedModal();

	// Получаем backgroundLocation из разных источников с приоритетом на текущий location
	const backgroundLocation =
		location.state?.backgroundLocation ||
		modalLocation?.state?.backgroundLocation;
	const from = location.state?.from || '/';

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	if (isLoading) {
		return <div>Загрузка...</div>;
	}

	// Особые случаи для модальных окон:
	// 1. Если это фоновая локация для модалки - пропускаем проверки
	// 2. Если это сохранённое состояние модалки - пропускаем проверки
	const isModalBackground = Boolean(backgroundLocation);
	const isPersistedModal = Boolean(modalLocation);

	if (isModalBackground || isPersistedModal) {
		return <Outlet />;
	}

	// Стандартные проверки для защищённых маршрутов:
	if (!isNeedAuth && user) {
		// Для незащищённых маршрутов, когда пользователь авторизован
		return <Navigate to={from} replace />;
	}

	if (isNeedAuth && !user) {
		// Для защищённых маршрутов, когда пользователь не авторизован
		return (
			<Navigate
				to='/login'
				state={{
					from: location,
					// Сохраняем backgroundLocation для возврата после авторизации
					backgroundLocation: location.state?.backgroundLocation,
				}}
				replace
			/>
		);
	}

	// Все проверки пройдены - рендерим дочерние элементы
	return <Outlet />;
};
