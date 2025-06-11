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

	const isModalBackground = Boolean(backgroundLocation);
	const isPersistedModal = Boolean(modalLocation);

	if (isModalBackground || isPersistedModal) {
		return <Outlet />;
	}

	if (!isNeedAuth && user) {
		return <Navigate to={from} replace />;
	}

	if (isNeedAuth && !user) {
		return (
			<Navigate
				to='/login'
				state={{
					from: location,
					backgroundLocation: location.state?.backgroundLocation,
				}}
				replace
			/>
		);
	}

	return <Outlet />;
};
