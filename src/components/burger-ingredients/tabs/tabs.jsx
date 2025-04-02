import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientGroupsData } from '../../utils/ingredient-groups-data';
import { useState } from 'react';
import styles from './tabs.module.scss';
export const Tabs = () => {
	const [current, setCurrent] = useState('one');

	return (
		<div className={styles.tabs + ' mb-10'}>
			{ingredientGroupsData.map((item) => (
				<Tab
					key={item.id}
					value={item.value}
					active={current === item.value}
					onClick={setCurrent}>
					{item.title}
				</Tab>
			))}
		</div>
	);
};
