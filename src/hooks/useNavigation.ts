import { useEffect } from "react";
import type { MutableRefObject } from "react";

interface UseNavigationProps {
  urlRef: MutableRefObject<string>;
  setIsPageReady: (ready: boolean) => void;
  waitForElements: () => Promise<void>;
  updateButtonStatus: (url: string) => Promise<void>;
}

export const useNavigation = ({
  urlRef,
  setIsPageReady,
  waitForElements,
  updateButtonStatus,
}: UseNavigationProps) => {
  useEffect(() => {
    const handleNavigation = async (event: any) => {
      const newUrl = event.destination.url;
      if (newUrl && newUrl !== urlRef.current) {
        setIsPageReady(false);
        urlRef.current = newUrl;
        await waitForElements();
        await updateButtonStatus(newUrl);
        setIsPageReady(true);
      }
    };

    window.navigation.addEventListener("navigate", handleNavigation);
    return () => {
      window.navigation.removeEventListener("navigate", handleNavigation);
    };
  }, [urlRef, setIsPageReady, waitForElements, updateButtonStatus]);
};
