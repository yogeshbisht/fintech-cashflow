import axios from "axios";
import axiosRetry, { exponentialDelay } from "axios-retry";
import Cookies from "js-cookie";

const SERVER_URL_MAP = {
  development: "http://localhost:8080",
  production: "https://api.financiallence.com",
  staging: "https://staging-api.financiallence.com",
};

export const SERVER_URL =
  SERVER_URL_MAP[
    process.env.NODE_ENV as "development" | "production" | "staging"
  ];

export const APIConfig = {
  apiUrl: `${SERVER_URL}/api/v1`,
};

const axiosInstance = axios.create({
  baseURL: `${APIConfig.apiUrl}`,
});

axiosRetry(axiosInstance, { retries: 4, retryDelay: exponentialDelay });

axiosInstance.interceptors.request.use((config) => {
  const JWT = Cookies.get("jwt");
  if (JWT) {
    config.headers.authorization = `Bearer ${JWT}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.code === "ERR_NETWORK") {
      const message = `The service is currently unavailable. Please try in a few minutes.`;
      const APIError = {
        isAPIError: true,
        APIErrorMessage: message,
        message,
        originalError: error,
      };

      return Promise.reject(APIError);
    }

    const response = error.response;

    const requestBody = response.data
      ? ` Response body: ${
          response.data.message || JSON.stringify(response.data, null, 4)
        }`
      : "";

    const errorMessage = `Error by URL: ${response.config.method.toUpperCase()} ${
      response.status
    } ${response.config.url}. ${requestBody}`;

    if (!response.data) {
      response.data = {};
    }

    const isStringResponse = typeof response.data === "string";

    if (isStringResponse) {
      const APIError = {
        isAPIError: true,
        APIErrorMessage: errorMessage,
      };

      return Promise.reject(APIError);
    }

    response.data.isAPIError = true;
    response.data.APIErrorMessage = errorMessage;

    return Promise.reject(response.data);
  }
);

export default axiosInstance;
