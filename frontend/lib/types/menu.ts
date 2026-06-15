export type Item = {
  label: string;
  key: string;
};

export type Subsection = {
  title: string;
  items: Item[];
};

export type Category = {
  title: string;
  icon?: string;
  subsections: Subsection[];
};

export type RecommendedItem = {
  key: string;
  title: string;
  image: string;
};