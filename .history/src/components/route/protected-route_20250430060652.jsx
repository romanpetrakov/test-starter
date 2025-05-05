
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const auth = useSelector((state) => state.auth);
	const store = useSelector((store) => state.auth);
	const user = useSelector((state) => state.auth.user);
	const location = useLocation();
	const from = location.state?.from || '/';
console.log(auth);
console.log(user);
console.log(from);
	if (!isNeedAuth && user) {
		console.log('!!!!');
		debugger;
	 	return <Navigate to={ from } />;
	}

	if (isNeedAuth && !user) {
		console.log('!!!!2');
		debugger;
		return <Navigate to='/login' replace />;
	}
	console.log('!!!!4');
debugger;
	return component;

};
