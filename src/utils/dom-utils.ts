import type { JobInfo } from "@/types";

export const SELECTORS = {
  JOB_TITLE: ".job-details-jobs-unified-top-card__job-title",
  COMPANY_NAME: ".job-details-jobs-unified-top-card__company-name",
  BUTTON_CONTAINER: ".jobs-apply-button--top-card",
};

export const checkRequiredElements = () => {
  const buttonContainer = document
    .querySelector(SELECTORS.BUTTON_CONTAINER)
    ?.closest(".display-flex");
  return buttonContainer;
};

export const getButtonContainer = () =>
  document
    .querySelector(SELECTORS.BUTTON_CONTAINER)
    ?.closest(".display-flex") as HTMLElement | null;

export const getJobInformation = (): JobInfo => ({
  title: document.querySelector(SELECTORS.JOB_TITLE)?.textContent?.trim() || "",
  company:
    document.querySelector(SELECTORS.COMPANY_NAME)?.textContent?.trim() || "",
  url: window.location.href,
});
