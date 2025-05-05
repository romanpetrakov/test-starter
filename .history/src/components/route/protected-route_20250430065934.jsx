
import { getUser } from '../../services/auth/action';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

export const ProtectedRoute = ({ isNeedAuth , component }) => {

	const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUser());
    }, [])
	const {user, isLoading} = useSelector((store) => store.auth);

	const location = useLocation();
	const from = location.state?.from || '/';

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
		debugger;
		return <Navigate to='/login' replace />;
	}
	console.log('!!!!4');
debugger;
	return component;

};
