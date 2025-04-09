import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-item.module.css';
import { ingredientTypes } from '../../utils/ingredient-types';
import { func, number, string } from 'prop-types';
import { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { removeItem } from '../../../services/selected-ingredients/action';
import { useDispatch } from 'react-redux';

export const BurgerConstructorItem = ({
	item,
	type,
	uuid,
	indexInArray,
	moveIngredient,
}) => {
	const dispatch = useDispatch();
	const ref = useRef(null);

	const [{ handlerId }, drop] = useDrop({
		accept: 'constructorItem',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item, monitor) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.indexInArray;
			const hoverIndex = indexInArray;

			if (dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			// Time to actually perform the action
			moveIngredient(dragIndex, hoverIndex);

			item.indexInArray = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag({
		type: 'constructorItem',
		item: () => {
			return { uuid, indexInArray };
		},
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
	});
	const opacity = isDragging ? 0.4 : 1;
	drag(drop(ref));

	if (!type) {
		return (
			<div className={style.item + ' ml-8 mr-4 mb-4'}>
				{item ? (
					<div
						className={style.droppable}
						ref={ref}
						data-handler-id={handlerId}
						style={{ opacity: opacity }}>
						<DragIcon type='primary' className={style.dragImg + ' mt-8'} />

						<ConstructorElement
							text={item.name}
							price={item.price}
							thumbnail={item.image}
							extraClass={style.constructorElement + ' pl-2 pt-4 pb-4 pr-12'}
							handleClose={() => dispatch(removeItem(item))}
						/>
					</div>
				) : (
					<div className={style.addIngredients}>
						<p>Выберите начинку</p>
					</div>
				)}
			</div>
		);
	}
	if (type == 'top') {
		return (
			<div className={style.bunItem + ' ml-8 mr-8'}>
				{item ? (
					<ConstructorElement
						type={item.type === 'bun' && type}
						isLocked={item.type === 'bun'}
						text={item.name + ' (верх)'}
						price={item.price}
						thumbnail={item.image}
						extraClass='pl-8 pt-4 pb-4 pr-8'
					/>
				) : (
					<div className={style.addIngredients + ' ' + style.addBunFirst}>
						<p>Выберите булки</p>
					</div>
				)}
			</div>
		);
	}
	return (
		<div className={style.bunItem + ' ml-8  mr-8'}>
			{item ? (
				<ConstructorElement
					type={item.type === 'bun' && type}
					isLocked={item.type === 'bun'}
					text={item.name + ' (низ)'}
					price={item.price}
					thumbnail={item.image}
					extraClass='pl-8 pt-4 pb-4 pr-8 '
				/>
			) : (
				<div
					className={
						style.addIngredients + ' ' + style.addBunLast + ' ml-16  mr-8'
					}>
					<p>Выберите булки</p>
				</div>
			)}
		</div>
	);
};

BurgerConstructorItem.propTypes = {
	item: ingredientTypes,
	type: string,
	uuid: string,
	indexInArray: number,
	moveIngredient: func,
};
