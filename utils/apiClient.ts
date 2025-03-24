import axios from "axios";
import { encryptToken, clearToken, decryptToken } from "@/utils/protect";
import { useRouter } from "next/navigation";

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_LENDING_SERVICE_URL,
  headers: {
    "x-api-key": `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`,
  },
});

apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await decryptToken();
      if (token) {
        console.log("Token:", token);
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Failed to decrypt token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    if (error.response?.status === 401) {
      try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
          clearToken("token");
          window.location.href = "/";
          return Promise.reject(error);
        }

        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_LENDING_SERVICE_URL}/auth/refresh`,
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`,
              "x-api-key": `${process.env.NEXT_PUBLIC_LENDING_SERVICE_API_KEY}`,
            },
          }
        );

        const newAccessToken = res.data.data.access_token;
        await encryptToken(newAccessToken);

        const originalRequest = error.config;
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token. Logging out...");
        clearToken("token");
        window.location.href = "/";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;