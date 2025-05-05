
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const user = useSelector((store) => store.auth.user);
	const location = useLocation();
	const from = location.state?.from || '/';
console.log(isNeedAuth)
	if (!isNeedAuth && !user) {
	 	return <Navigate to={ from } />;
	}

	if (isNeedAuth && !user) {
		return <Navigate to='/login' state={{ from: location }} />;
	}

	return component;

};
