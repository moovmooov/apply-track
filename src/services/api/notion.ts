import type { PageData } from "@/types";
import api from ".";
import browser from "webextension-polyfill";

const CLIENT_ID = process.env.PLASMO_PUBLIC_NOTION_CLIENT_ID;
const clientSecret = process.env.PLASMO_PUBLIC_NOTION_CLIENT_SECRET;
const REDIRECT_URI = browser.identity.getRedirectURL();

export const getNotionToken = async (tempAuthToken: string) => {
  try {
    const encodedToken = Buffer.from(`${CLIENT_ID}:${clientSecret}`).toString(
      "base64",
    );

    const response = await api.post(
      "/oauth/token",
      {
        grant_type: "authorization_code",
        redirect_uri: REDIRECT_URI,
        code: tempAuthToken,
      },
      {
        headers: {
          Authorization: `Basic ${encodedToken}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching notion token:", error);
    throw error;
  }
};

export const getUserDatabase = async () => {
  try {
    const response = await api.post("/search", {
      query: "Applications",
      filter: {
        value: "database",
        property: "object",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching user database:", error);
    throw error;
  }
};

export const addJobToDatabase = async (
  databaseId: string,
  pageData: PageData,
) => {
  try {
    const response = await api.post("/pages", {
      parent: { database_id: databaseId },
      properties: pageData,
    });
    return response.data;
  } catch (error) {
    console.error("Error adding new row:", error);
    throw error;
  }
};

export const getUrlJobsDatabase = async (databaseId: string, url: string) => {
  try {
    const response = await api.post(`/databases/${databaseId}/query`, {
      filter: {
        property: "Posting URL",
        url: {
          equals: url,
        },
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error trying to search the URL on database:", error);
    throw error;
  }
};

export const getAuthUrl = () => {
  return `https://api.notion.com/v1/oauth/authorize?client_id=${CLIENT_ID}&response_type=code&owner=user&redirect_uri=${REDIRECT_URI}`;
};
