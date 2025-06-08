import { useState } from "react";

export function useGenericList<T>(initial: T[] = []) {
  const [items, setItems] = useState<T[]>(initial);

  const addItem = (item: T) => {
    setItems((prev) => [...prev, item]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const setAll = (newItems: T[]) => {
    setItems(newItems);
  };

  return {
    items,
    addItem,
    removeItem,
    setAll,
  };
}
