
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const {user, isLoadiing} = useSelector((state) => state.auth);

	const location = useLocation();
	const from = location.state?.from || '/';

	if (isLoadiing) {
		return null;
	}
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
