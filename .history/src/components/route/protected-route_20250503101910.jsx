
import { useEffect } from 'react';
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
		return (<div>загрузка</div>);
	}
	if (!isNeedAuth && user) {
	 	return <Navigate to={ from } />;
	}

	if (isNeedAuth && !user) {
		return <Navigate to='/login' replace />;
	}

	return component;
};

ProtectedRoute.propTypes = {
	isNeedAuth: func.isRequired,
	header: string,
	children: element
};
