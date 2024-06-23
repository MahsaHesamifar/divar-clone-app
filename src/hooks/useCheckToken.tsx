"use client";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

import { setIsTokenValid } from "@/rtk/features/authSlice";
import { useCheckRefreshTokenMutation } from "@/services/auth";

interface DecodedToken {
  mobile: string;
  id: string;
  iat: number;
  exp: number;
}
export const useCheckToken = () => {
  const [checkRefreshToken] = useCheckRefreshTokenMutation();

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const maxRetries = 3;
    let retryCount = 0;

    const logOut = () => {
      Cookies.remove("accessToken");
      Cookies.remove("refreshToken");
      Cookies.remove("role");

      dispatch(setIsTokenValid(false));
    };

    const getNewTokens = async () => {
      const refreshToken = Cookies.get("refreshToken") as string;

      console.log("getting New Tokens");

      try {
        const result = await checkRefreshToken({
          refreshToken,
        });
        if (result.data) {
          Cookies.set("accessToken", result.data.accessToken);
          Cookies.set("refreshToken", result.data.refreshToken);

          dispatch(setIsTokenValid(true));
          retryCount = 0;
        } else {
          handleRetry();
        }
      } catch (err) {
        handleRetry();
        throw err;
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
        const decoded: DecodedToken = jwtDecode(token);
        if (decoded.exp) {
          const currentTime = Date.now();
          const expTime = decoded.exp * 1000;

          const timeLeft = expTime - currentTime;

          if (timeLeft > 5 * 1000) {
            console.log("token is valid");
            dispatch(setIsTokenValid(true));
          } else {
            console.log("token expired -> getNewTokens");
            getNewTokens();
          }
        }
      } else {
        const refreshToken = Cookies.get("refreshToken") as string;
        if (refreshToken) {
          console.log("No accessToken -> getNewTokens");
          getNewTokens();
        } else {
          console.log("logged out");
          logOut();
        }
      }
    };

    const intervalId = setInterval(checkToken, 5 * 1000);
    checkToken();

    return () => clearInterval(intervalId);
  }, [checkRefreshToken, dispatch, router]);
};
