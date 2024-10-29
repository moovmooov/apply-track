import { useState, useCallback } from "react";
import { checkRequiredElements } from "../utils/dom-utils";

export const usePageReady = () => {
  const [isPageReady, setIsPageReady] = useState(false);
  const waitForElements = useCallback(async () => {
    return new Promise<void>((resolve) => {
      if (checkRequiredElements()) {
        resolve();
        return;
      }

      const observer = new MutationObserver((mutations, obs) => {
        if (checkRequiredElements()) {
          obs.disconnect();
          resolve();
        }
      });

      observer.observe(document, {
        childList: true,
        subtree: true,
      });

      setTimeout(() => {
        observer.disconnect();
        resolve();
      }, 10000);
    });
  }, []);

  return {
    isPageReady,
    setIsPageReady,
    waitForElements,
  };
};
