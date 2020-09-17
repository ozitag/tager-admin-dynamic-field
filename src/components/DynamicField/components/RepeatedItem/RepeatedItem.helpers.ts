import { RepeaterField } from '../../../../typings/model';

export function removeItem(
  parentField: RepeaterField,
  itemIndex: number
): void {
  parentField.value.splice(itemIndex, 1);
}

export function moveItem(
  parentField: RepeaterField,
  itemIndex: number,
  direction: 'up' | 'down'
) {
  const itemList = parentField.value;

  if (
    (direction === 'up' && itemIndex === 0) ||
    (direction === 'down' && itemIndex === itemList.length - 1)
  ) {
    return;
  }

  const item = itemList[itemIndex];

  itemList.splice(itemIndex, 1);
  itemList.splice(direction === 'up' ? itemIndex - 1 : itemIndex + 1, 0, item);
}
