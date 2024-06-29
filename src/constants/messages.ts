const defaultErrorMessage = "خطایی رخ داده است";

export const messages = {
  post: {
    create: { success: "آگهی با موفقیت ثبت شد", error: defaultErrorMessage },
    delete: { success: "آکهی با موفقیت حذف شد", error: defaultErrorMessage },
  },

  category: {
    create: {
      success: "گروه با موفقیت ثبت شد",
      error: defaultErrorMessage,
    },
    delete: { success: "گروه با موفقیت حذف شد", error: defaultErrorMessage },
  },
};
