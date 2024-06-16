"use client";

import React, { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

import { paths } from "@/utils/paths";
import { RootState } from "@/rtk/store";
import { logOut } from "@/rtk/features/authSlice";

export const Header = () => {
  const accessToken = useSelector((state: RootState) => state.auth.accessToken);
  const state = useSelector((state: RootState) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    console.log("access token has changed to:");
    console.log(accessToken);
  }, [accessToken]);
  useEffect(() => {
    console.log("auth state:");
    console.log(state);
  }, [state]);

  const logOutHandler = () => {
    // dispatch(logOut());
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

          <div className="hidden group-hover:flex flex-col absolute top-5 bg-white rounded w-[200px]">
            {accessToken && accessToken !== "" ? (
              <>
                <Link href={paths.adminPanel()} className="p-4">
                  پنل ادمین
                </Link>
                <hr className="border-grey-200" />
                <Link href={paths.userPanel()} className="p-4">
                  پنل کاربر
                </Link>
                <button onClick={logOutHandler} className="p-4">
                  خروج
                </button>
              </>
            ) : (
              <Link href={paths.auth()} className="p-4">
                ورود
              </Link>
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
