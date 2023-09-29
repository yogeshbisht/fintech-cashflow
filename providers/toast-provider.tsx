"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = () => {
  return (
    <Toaster
      toastOptions={{
        style: {
          background: "#363636",
          color: "#fafafa",
        },
      }}
    />
  );
};
