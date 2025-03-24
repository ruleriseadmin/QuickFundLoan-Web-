'use client';
import { useLayoutEffect, useState, useEffect } from "react";
import { decryptToken, clearToken } from "@/utils/protect";
import { useRouter } from "next/navigation";
import LoadingPage from "@/app/loading";
import apiClient from "@/utils/apiClient";

export const withAuth = (WrappedComponent: any) => {
  return function WithAuth(props: any) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const router = useRouter();

    // Verify session and authenticate user
    useLayoutEffect(() => {
      const verifySession = async () => {
        const token = await decryptToken();
        if (!token) {
          // Redirect to login with error message
          const status = "error";
          const title = "Oops!";
          const message = "Please log in to continue.";
          const url = `/?status=${encodeURIComponent(status)}&title=${encodeURIComponent(title)}&message=${encodeURIComponent(message)}`;

          router.push(url);
        } else {
          setIsAuthenticated(true);
        }
      };
      verifySession();
    }, [router]);

    // Fetch user data after authentication check
    useEffect(() => {
      const fetchUserData = async () => {
        try {
          
          await apiClient.get(`/profile`);
        } catch (error: any) {
          console.error(error);
          if (error?.response?.status === 401) {
            clearToken('token');
            setIsAuthenticated(false); // Redirect in useLayoutEffect will handle this
          }
        }
      };

      if (isAuthenticated) {
        fetchUserData();
      }
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
      return <LoadingPage />; // Show loading while authentication status is checking
    }

    if (!isAuthenticated) {
      return null; // Prevent component render if unauthenticated
    }

    return <WrappedComponent {...props} />;
  };
};
