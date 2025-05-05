
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const {user, isLoading} = useSelector((state) => state.auth);

	const location = useLocation();
	const from = location.state?.from || '/';

	console.log(isLoading);
	if (isLoading) {
		console.log('!!!!');
		return null;
	}
	console.log(isNeedAuth);
	console.log(isNeedAuth);
	if (!isNeedAuth && user) {
		console.log('!!!!');
	 	return <Navigate to={ from } />;
	}

	if (isNeedAuth && !user) {
		console.log('!!!!2');
		return <Navigate to='/login' replace />;
	}
	console.log('!!!!4');

	return component;

};
