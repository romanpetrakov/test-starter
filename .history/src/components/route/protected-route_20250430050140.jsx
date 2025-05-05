
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const user = useSelector((store) => store.auth.user);
	const location = useLocation();
	const from = location.state?.from || '/';
console.log(isNeedAuth);
console.log(user);
console.log(from);
	if (!isNeedAuth && !user) {
		console.log('!!!!');
		debugger;
	 	return <Navigate to={ from } />;
	}

	if (isNeedAuth && !user) {
		console.log('!!!!2');
		return <Navigate to='/login' state={{ from: location }} />;
	}
	console.log('!!!!4');
	return component;

};
