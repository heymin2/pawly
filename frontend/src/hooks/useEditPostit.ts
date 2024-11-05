// src/hooks/useUserRollingpapers.ts
import { useState } from "react";
import { axiosInstance } from "../apis/axiosInstance";

export const useEditPostit = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const editPostit = async (postitData: FormData) => {
    setLoading(true);
    try {
      await axiosInstance.put(`/postit`, postitData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setLoading(false);
      setError(null);
    } catch (err) {
      setLoading(false);
      setError("포스트잇 수정 중 오류가 발생했습니다.");
      console.error("포스트잇 수정 오류:", err);
    }
  };

  return { editPostit, loading, error };
};
