"use client";

import { useState } from "react";

export function useSelectableList<T>() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const select = (index: number) => {
    setSelectedIndex(index);
    console.log("Selected index:", index);
  };

  const clearSelection = () => {
    setSelectedIndex(null);
    console.log("Selection cleared");
  };

  return {
    selectedIndex,
    select,
    clearSelection,
  };
}