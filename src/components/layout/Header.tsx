"use client";

import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useGetUserRoleQuery } from "@/services/auth";
import { logOut, setRole } from "@/rtk/features/authSlice";
import { RootState } from "@/rtk/store";
import { HeaderItem } from "@/components/layout";
import { paths } from "@/utils/paths";
import { roles } from "@/constants";

export const Header = () => {
  const { accessToken, role } = useSelector((state: RootState) => state.auth);
  const { data, isLoading } = useGetUserRoleQuery();

  const router = useRouter();
  const dispatch = useDispatch();

  // ----------------- must be removed later
  const state = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    console.log("auth state:");
    console.log(state);
  }, [state]);
  // -----------------

  useEffect(() => {
    if (data && accessToken) {
      dispatch(setRole({ role: data.role }));
    }
  }, [accessToken, data, dispatch]);

  const logOutHandler = () => {
    dispatch(logOut());

    router.push(paths.home());
  };

  return (
    <div className="flex items-center justify-between py-2 px-20 lg:px-60 border-b-2 border-grey-200">
      <Link href={paths.home()}>
        <Image
          src="/divarLogo.svg"
          alt="divar"
          width={50}
          height={50}
          priority
        />
      </Link>
      <div className="flex items-center justify-between w-1/2 xl:w-1/4">
        <div className="group relative">
          <span className="hover:bg-grey-200 py-2 px-4 rounded">دیوار من</span>

          <div className="hidden group-hover:flex flex-col absolute top-5 bg-white rounded w-[200px] overflow-hidden shadow-md">
            {accessToken && accessToken !== "" ? (
              <>
                {role === roles.admin && !isLoading && (
                  <HeaderItem href={paths.adminPanel()} text="پنل ادمین" />
                )}
                <HeaderItem href={paths.userPanel()} text={"پنل کاربر"} />
                <HeaderItem onClick={logOutHandler} text={"خروج"} />
              </>
            ) : (
              <HeaderItem href={paths.auth()} text={"ورود"} />
            )}
          </div>
        </div>
        <Link
          href={paths.userPanel()}
          className="bg-primary rounded py-2 px-4 text-white"
        >
          ثبت آگهی
        </Link>
      </div>
    </div>
  );
};
