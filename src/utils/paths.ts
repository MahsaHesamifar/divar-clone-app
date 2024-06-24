export const paths = {
  home() {
    return "/";
  },
  auth() {
    return "/auth";
  },
  userPanel() {
    return "/dashboard/user-panel";
  },
  adminPanel() {
    return "/dashboard/admin-panel";
  },
  postShow(id: string) {
    return `/posts/${id}`;
  },
  unauthorized() {
    return "/unauthorized";
  },
};
