import { useSelector } from 'react-redux';
import { useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './ingredients.module.scss';
import { ingredientGroupsData } from '../../utils/ingredient-groups-data';
import { BurgerIngredientsGroup } from '../burget-ingredients-group/burger-ingredients-group';
import { func } from 'prop-types';

export const Ingredients = ({ setCurrentTab }) => {
	const ingredients = useSelector((state) => state.ingredients.ingredients);
	const containerRef = useRef(null);

	const bunRef = useRef(null);
	const sauceRef = useRef(null);
	const mainRef = useRef(null);

	const groups = useMemo(() => {
		return ingredientGroupsData.map((item) => {
			if (item.name === 'bun') {
				item.ref = bunRef;
			}
			if (item.name === 'sauce') {
				item.ref = sauceRef;
			}
			if (item.name === 'main') {
				item.ref = mainRef;
			}

			return item;
		});
	}, []);

	const handleScroll = useCallback(() => {
		if (!containerRef.current) {
			return;
		}
		const containerTop = containerRef.current.getBoundingClientRect().top;
		const selected = groups[0].id;
		const min = Infinity;

		groups.forEach((group) => {
			if (group.ref.current) {
				const distance = Math.abs(
					group.ref.current.getBoundingClientRect().top - containerTop
				);
				if (distance < min) {
					min = distance;
					selected = group.name;
				}
			}
		});
		setCurrentTab(selected);
	}, [groups, setCurrentTab]);

	useEffect(() => {
		const container = containerRef.current;
		if (!container) {
			return;
		}
		container.addEventListener('scroll', () => handleScroll());
		return () => container.removeEventListener('scroll', () => handleScroll());
	}, [handleScroll]);

	return (
		<div className={styles.groups} ref={containerRef}>
			{ingredients &&
				ingredientGroupsData &&
				groups.map((item, id) => (
					<div ref={item.ref} key={id}>
						<BurgerIngredientsGroup
							key={item.id}
							groupItem={item}
							ingredients={ingredients}
						/>
					</div>
				))}
		</div>
	);
};

Ingredients.propTypes = {
	setCurrentTab: func.isRequired,
};
