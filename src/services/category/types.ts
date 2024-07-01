export interface CreateCategoryPayload {
  name: string;
  slug?: string;
  icon: string;
}

export type GetCategoriesRes = {
  _id: string;
  name: string;
  slug: string;
  icon: string;
}[];
