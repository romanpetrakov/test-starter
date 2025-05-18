import { useEffect, ReactElement, FC } from 'react';
import { getUser } from '../../services/auth/action';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';

export const ProtectedRoute: FC<{
	isNeedAuth: boolean;
	component: ReactElement;
}> = ({ isNeedAuth, component }) => {
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getUser());
	}, [dispatch]);

	const { user, isLoading } = useAppSelector((store) => store.auth);

	const location = useLocation();
	const from = location.state?.from || '/';

	if (isLoading) {
		return <div>загрузка</div>;
	}
	if (!isNeedAuth && user) {
		return <Navigate to={from} />;
	}

	if (isNeedAuth && !user) {
		return <Navigate to='/login' replace />;
	}

	return component;
};
