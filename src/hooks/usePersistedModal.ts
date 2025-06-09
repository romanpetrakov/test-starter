import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import { removeFromStorage, setToStorage } from '../components/utils/storage';

export const usePersistedModal = () => {
	const location = useLocation();
	const [savedLocation, setSavedLocation] = useState(() => {
		const saved = localStorage.getItem('modalState');
		return saved ? JSON.parse(saved) : null;
	});

	useEffect(() => {
		if (location.state?.backgroundLocation) {
			const stateToSave = {
				state: {
					backgroundLocation: location.state.backgroundLocation,
				},
			};
			setToStorage('modalState', stateToSave);
			setSavedLocation(stateToSave);
		} else {
			// Удаляем только если нет флага modal в текущем location
			if (!location.state?.modal) {
				removeFromStorage('modalState');
				setSavedLocation(null);
			}
		}
	}, [location]);

	return savedLocation;
};
