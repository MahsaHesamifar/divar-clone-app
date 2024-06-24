"use client";

import { useEffect } from "react";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { useCheckRefreshTokenMutation } from "@/services/auth";
import { destroyTokens, setTokens } from "@/utils";

import type { DecodedToken, useCheckTokenProps } from "./types";

export const useCheckToken = (setIsTokenValid: useCheckTokenProps) => {
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

      console.log("getting New Tokens");
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
        console.log("No refresh token -> logged out");
        logOut();
      }
    };

    const handleRetry = () => {
      retryCount += 1;
      if (retryCount >= maxRetries) {
        console.log("Maximum retries reached -> logging out");
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
              console.log("token is valid");
              setIsTokenValid(true);
            } else {
              console.log("token expired -> getNewTokens");
              getNewTokens();
            }
          }
        } catch (error) {
          console.log("token can't be decoded -> getNewTokens");
          getNewTokens();
        }
      } else {
        const refreshToken = Cookies.get("refreshToken");
        if (refreshToken) {
          console.log("No accessToken -> getNewTokens");
          getNewTokens();
        } else {
          console.log("No accessToken and no refreshToken -> logged out");
          logOut();
        }
      }
    };

    const intervalId = setInterval(checkToken, 5 * 1000);
    checkToken();

    return () => clearInterval(intervalId);
  }, [checkRefreshToken, router, setIsTokenValid]);
};
