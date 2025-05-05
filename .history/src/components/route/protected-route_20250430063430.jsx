
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const {user, isLoading} = useSelector((store) => store.auth);

	const location = useLocation();
	const from = location.state?.from || '/';

	console.log(isLoading);
	if (isLoading) {
		console.log('!!!!');
		return (<div>загрузка</div>);
	}
	console.log(isNeedAuth);
	console.log(user);
	if (!isNeedAuth && user) {
		console.log('!!!!');
		debugger;
	 	return <Navigate to={ from } />;
	}

	if (isNeedAuth && !user) {
		console.log('!!!!2');
		return <Navigate to='/login' replace />;
	}
	console.log('!!!!4');
debugger;
	return component;

};
