import {
	ConstructorElement,
	DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import style from './burger-constructor-item.module.scss';
import { FC, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { removeItem } from '../../../services/selected-ingredients/action';
import {
	TDropCollectedProps,
	TDragCollectedProps,
	TConstructorItem,
	TDragItem,
} from '../../utils/types';

import { useAppDispatch } from '../../../hooks/hooks';
import type { DropTargetMonitor } from 'react-dnd/src/types';

export const BurgerConstructorItem: FC<TConstructorItem> = ({
	item = null,
	type = null,
	uuid = null,
	indexInArray = null,
	moveIngredient = null,
}) => {
	const dispatch = useAppDispatch();
	const ref = useRef<HTMLDivElement>(null);

	const [{ handlerId }, drop] = useDrop<TDragItem, void, TDropCollectedProps>({
		accept: 'constructorItem',
		collect(monitor) {
			return {
				handlerId: monitor.getHandlerId(),
			};
		},
		hover(item: TDragItem, monitor: DropTargetMonitor<TDragItem, HTMLElement>) {
			if (!ref.current) {
				return;
			}
			const dragIndex = item.indexInArray;
			const hoverIndex = indexInArray;

			if (!dragIndex || !hoverIndex || dragIndex === hoverIndex) {
				return;
			}
			const hoverBoundingRect = ref.current?.getBoundingClientRect();
			const hoverMiddleY =
				(hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

			const clientOffset = monitor.getClientOffset();

			if (!clientOffset) {
				return;
			}

			const hoverClientY = clientOffset.y - hoverBoundingRect.top;

			if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
				return;
			}

			if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
				return;
			}

			moveIngredient && moveIngredient(dragIndex, hoverIndex);

			item.indexInArray = hoverIndex;
		},
	});

	const [{ isDragging }, drag] = useDrag<
		TDragItem,
		unknown,
		TDragCollectedProps
	>({
		type: 'constructorItem',
		item: () => {
			return {
				uuid: uuid ?? '',
				indexInArray: indexInArray ?? 0,
			};
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
						style={{ opacity: opacity }}
						data-testid={'constructor-item-' + item._id}>
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
	return (
		<div
			className={style.bunItem + ' ml-8 mr-8 '}
			style={{ opacity: opacity }}
			data-testid={
				item && type === 'top'
					? 'constructor-bun-top'
					: item && type === 'bottom'
						? 'constructor-bun-bottom'
						: undefined
			}>
			{item ? (
				<ConstructorElement
					type={item.type === 'bun' ? type || undefined : undefined}
					isLocked={item.type === 'bun'}
					text={item?.name + (type === 'top' ? ' (верх)' : ' (низ)')}
					price={item.price}
					thumbnail={item.image}
					extraClass=' pl-8 pt-4 pb-4 pr-8 '
				/>
			) : (
				<div
					className={
						style.addIngredients +
						' ' +
						(type === 'top' ? style.addBunFirst : style.addBunLast) +
						' ml-16 mr-8 '
					}>
					<p>Выберите булки</p>
				</div>
			)}
		</div>
	);
};
