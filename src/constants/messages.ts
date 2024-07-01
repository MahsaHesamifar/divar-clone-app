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

  auth: {
    sendOtp: { success: "کد با موفقیت ارسال شد", error: defaultErrorMessage },
    checkOtp: { error: defaultErrorMessage },
    getRole: { error: "نقش کاربر دریافت نشد" },
  },

  errors: {
    error401: "عدم دسترسی! لطفا دوباره وارد شوید",
    error404: "منبع یافت نشد",
    default: defaultErrorMessage,
  },
};
