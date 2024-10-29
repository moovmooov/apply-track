import { useState, useCallback } from "react";
import { sendToBackground } from "@plasmohq/messaging";
import type { ButtonState, UserData } from "@/types";
import { useStorage } from "@plasmohq/storage/hook";

export const useButtonState = () => {
  const [buttonState, setButtonState] = useState<ButtonState>({
    text: "Add to Notion Database",
    status: "default",
  });
  const [userData] = useStorage<UserData>("user_data");
  const isAuthenticated = userData ?? false;

  const updateButtonStatus = useCallback(
    async (url: string) => {
      setButtonState((prev) => ({ ...prev, status: "loading" }));

      try {
        const isJobExistInNotionDatabase = await sendToBackground({
          name: "database-query",
          body: { url },
        });

        if (!isAuthenticated) {
          setButtonState({
            text: "Authenticate on extension",
            status: "disabled",
          });
          return;
        }

        if (isJobExistInNotionDatabase) {
          setButtonState({
            text: "Already Added",
            status: "disabled",
          });
          return;
        }

        setButtonState({
          text: "Add to Notion Database",
          status: "default",
        });
      } catch (error) {
        console.error("Error checking status:", error);
        setButtonState({
          text: "Error checking status",
          status: "error",
        });
      }
    },
    [isAuthenticated],
  );

  return {
    buttonState,
    setButtonState,
    updateButtonStatus,
  };
};
