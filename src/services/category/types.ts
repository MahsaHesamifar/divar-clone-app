export interface CreateCategoryRes {
  message: string;
}

export interface CreateCategoryReq {
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

export interface DeleteCategoryReq {
  id: string;
}

export interface DeleteCategoryRes {
  message: string;
}
