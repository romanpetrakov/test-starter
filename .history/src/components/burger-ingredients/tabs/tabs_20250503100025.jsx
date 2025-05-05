import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { ingredientGroupsData } from '../../utils/ingredient-groups-data';
import styles from './tabs.module.scss';

export const Tabs = ({ currentTab, setCurrentTab }) => {
	return (
		<div className={styles.tabs + ' mb-10'}>
			{ingredientGroupsData &&
				ingredientGroupsData.map((item) => (
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

Ingredients.propTypes = {
	currentTab
	setCurrentTab: func.isRequired,
};
