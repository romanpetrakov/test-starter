
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const isLogged = useSelector((store) => store.user.isLogged);
	const location = useLocation();
	const from = location.state?.from || '/';

	// if (!isNeedAuth && isLogged) {
	// 	return <Navigate to={ from } />;
	// }

	if (isNeedAuth && !isLogged) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return component;

};
