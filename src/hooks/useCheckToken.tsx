"use client";

import { useEffect, useState } from "react";

import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { useCheckRefreshTokenMutation } from "@/services/auth";
import { destroyTokens, setTokens } from "@/utils";

import type { DecodedToken } from "./types";

export const useCheckToken = () => {
  const [isTokenValid, setIsTokenValid] = useState(false);
  const [checkRefreshToken] = useCheckRefreshTokenMutation();
  const router = useRouter();

  useEffect(() => {
    const maxRetries = 3;
    let retryCount = 0;

    const logOut = () => {
      destroyTokens();
      setIsTokenValid(false);
    };

    const getNewTokens = async () => {
      const refreshToken = Cookies.get("refreshToken");

      if (refreshToken) {
        try {
          const result = await checkRefreshToken({
            refreshToken,
          });
          if (result.data) {
            setTokens({
              accessToken: result.data.accessToken,
              refreshToken: result.data.refreshToken,
            });

            setIsTokenValid(true);
            retryCount = 0;
          } else {
            handleRetry();
          }
        } catch (err) {
          handleRetry();
          throw err;
        }
      } else {
        logOut();
      }
    };

    const handleRetry = () => {
      retryCount += 1;
      if (retryCount >= maxRetries) {
        logOut();
      }
    };

    const checkToken = (): void => {
      const token = Cookies.get("accessToken");

      if (token) {
        try {
          const decoded: DecodedToken = jwtDecode(token);
          if (decoded.exp) {
            const currentTime = Date.now();
            const expTime = decoded.exp * 1000;

            const timeLeft = expTime - currentTime;

            if (timeLeft > 5 * 1000) {
              setIsTokenValid(true);
            } else {
              getNewTokens();
            }
          }
        } catch (error) {
          getNewTokens();
        }
      } else {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          getNewTokens();
        } else {
          logOut();
        }
      }
    };

    const intervalId = setInterval(checkToken, 5 * 1000);
    checkToken();

    return () => clearInterval(intervalId);
  }, [checkRefreshToken, router, setIsTokenValid]);

  return isTokenValid;
};
