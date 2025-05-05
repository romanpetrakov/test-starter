
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const user = useSelector((state) => state.auth.user);
	const location = useLocation();
	const from = location.state?.from || '/';
	if (!isNeedAuth && user) {
	 	return <Navigate to={ from } />;
	}

	if (isNeedAuth && !user) {
		return <Navigate to='/login' replace />;
	}
	return component;

};
