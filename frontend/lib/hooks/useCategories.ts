import { useEffect, useState } from "react";
import {
  Category,
  RecommendedItem,
} from "../types/menu";

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [recommended, setRecommended] = useState<
    RecommendedItem[]
  >([]);

  useEffect(() => {
    fetch("/data/categories.json")
      .then((res) => res.json())
      .then((json) => {
        setCategories(json.categories);
        setRecommended(json.recommended);
      });
  }, []);

  return {
    categories,
    recommended,
  };
}

export function resolveCategoryTitle(
  categories: Category[],
  key?: string | null
) {
  if (!key) return null;

  for (const category of categories) {
    for (const subsection of category.subsections) {
      for (const item of subsection.items) {
        if (item.key === key) {
          return {
            categoryTitle: category.title,
            subsectionTitle: subsection.title,
            itemLabel: item.label,
          };
        }
      }
    }
  }

  return null;
}