import { FC, useCallback, useEffect, useMemo, useRef } from 'react';
import styles from './ingredients.module.scss';
import { ingredientGroupsData } from '../../utils/ingredient-groups-data';
import { BurgerIngredientsGroup } from '../burget-ingredients-group/burger-ingredients-group';
import { useAppSelector } from '../../../hooks/hooks';
import { TGroup, TGroupWithRef } from '../../utils/types';

export const Ingredients: FC<{ setCurrentTab: (tabName: string) => void }> = ({
	setCurrentTab,
}) => {
	const ingredients = useAppSelector((state) => state.ingredients.ingredients);
	const containerRef = useRef<HTMLDivElement>(null);

	const bunRef = useRef<HTMLDivElement>(null);
	const sauceRef = useRef<HTMLDivElement>(null);
	const mainRef = useRef<HTMLDivElement>(null);

	const groups = useMemo(() => {
		return ingredientGroupsData.map((item: TGroup) => {
			const groupWithRef: TGroupWithRef = {
				...item,
				ref: bunRef, // временное значение, будет переопределено ниже
			};

			if (item.name === 'bun') {
				groupWithRef.ref = bunRef;
			} else if (item.name === 'sauce') {
				groupWithRef.ref = sauceRef;
			} else if (item.name === 'main') {
				groupWithRef.ref = mainRef;
			}

			return groupWithRef;
		});
	}, []);

	const handleScroll = useCallback(() => {
		if (!containerRef.current) {
			return;
		}
		const containerTop = containerRef.current.getBoundingClientRect().top;
		let selected = groups[0].name;
		let min = Infinity;

		groups.forEach((group: TGroupWithRef) => {
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
