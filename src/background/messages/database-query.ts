import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { getUrlJobsDatabase } from "@/services/api/notion";
import type { Database } from "@/types";

const storage = new Storage();

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  const { url } = req.body;

  try {
    const databaseId = await storage.get<Database>("database");

    if (!databaseId?.id) {
      throw new Error(
        "Database configuration is missing or invalid. Please check your settings.",
      );
    }
    console.log("Query job into database...");
    const result = await getUrlJobsDatabase(databaseId?.id, url);
    const hasJobDatabase = result.results.length > 0;
    res.send(hasJobDatabase);
  } catch (error) {
    console.error("Error searching for the current job:", error);
    res.send({ success: false, error: error });
  }
};

export default handler;
