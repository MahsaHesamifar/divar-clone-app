export interface CreateCategoryRes {
  message: string;
}
export interface CreateCategoryReq {
  name: string;
  slug?: string;
  icon: string;
  parent?: string;
}

export interface GetCategoriesRes {
  name: string;
  slug: string;
  icon: string;
}
[];
