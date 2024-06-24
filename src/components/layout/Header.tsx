"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { HeaderItem } from "@/components/layout";
import { roles } from "@/constants";
import { useCheckToken } from "@/hooks";
import { useGetUserRoleQuery } from "@/services/auth";
import { destroyTokens, paths, setRole } from "@/utils";

export const Header = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const router = useRouter();

  useCheckToken(setIsTokenValid);

  const { data, isLoading } = useGetUserRoleQuery(undefined, {
    skip: !isTokenValid,
    // refetchOnMountOrArgChange: true,
    // refetchOnReconnect: true,
  });

  useEffect(() => {
    if (!isLoading) {
      if (data && isTokenValid) {
        const { role } = data;
        setRole(role);
      }
    }
  }, [isTokenValid, data, isLoading]);

  const logOutHandler = () => {
    destroyTokens();

    setIsTokenValid(false);

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
            {isTokenValid ? (
              <>
                {data && data?.role === roles.admin && !isLoading && (
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
