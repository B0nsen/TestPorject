import { useState } from "react";

type StepMode = "form" | "card";

export function useEditableList<T>(
  onSelectAfterSave?: (index: number) => void,
) {
  const [items, setItems] = useState<T[]>([]);
  const [mode, setMode] = useState<StepMode>("card");
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  const saveItem = (data: T) => {
    let savedIndex: number;

    setItems((prev) => {
      if (editingIndex !== null) {
        const updated = [...prev];
        updated[editingIndex] = data;
        savedIndex = editingIndex;
        return updated;
      }

      savedIndex = prev.length;
      return [...prev, data];
    });

    setEditingIndex(null);
    setMode("card");
    setTimeout(() => {
      onSelectAfterSave?.(savedIndex);
    }, 0);
  };

  const editItem = (index: number) => {
    setEditingIndex(index);
    setMode("form");
  };

  const addNew = () => {
    setEditingIndex(null);
    setMode("form");
  };

  return {
    items,
    mode,
    editingIndex,
    setMode,
    saveItem,
    editItem,
    addNew,
  };
}
