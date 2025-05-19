import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientGroupsData } from '../../utils/ingredient-groups-data';
import styles from './tabs.module.scss';
import { FC } from 'react';
import { TCuttentTabWithSetter, TGroup } from '../../utils/types';
export const Tabs: FC<TCuttentTabWithSetter> = ({
	currentTab,
	setCurrentTab,
}) => {
	return (
		<div className={styles.tabs + ' mb-10'}>
			{ingredientGroupsData &&
				ingredientGroupsData.map((item: TGroup) => (
					<Tab
						key={item.id}
						value={item.value}
						active={currentTab === item.name}
						onClick={() => setCurrentTab(item.name)}>
						{item.title}
					</Tab>
				))}
		</div>
	);
};
