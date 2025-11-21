import React, { type Key } from 'react';

export interface ItemListProps<T> {
  readonly items: readonly T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  getKey?: (item: T, index: number) => Key;
  className?: string;
  role?: string;
}

export function ItemList<T>({ items, renderItem, getKey, className, role }: ItemListProps<T>) {
  return (
    <ul className={className} role={role}>
      {items.map((item, index) => {
        const key = getKey ? getKey(item, index) : index;
        return (
          <li key={key}>
            {renderItem(item, index)}
          </li>
        );
      })}
    </ul>
  );
}

export default ItemList;


