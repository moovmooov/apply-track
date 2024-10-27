import type { PlasmoMessaging } from "@plasmohq/messaging";
import { Storage } from "@plasmohq/storage";
import { addJobToDatabase } from "@/services/api/notion";
import type { Database, PageData } from "@/types";

const storage = new Storage();

const handler: PlasmoMessaging.MessageHandler = async (req, res) => {
  console.log("Received message:", req.body);
  const database = await storage.get<Database>("database");
  const { title, company, url } = req.body;

  try {
    const pageData: PageData = {
      Company: {
        title: [{ text: { content: company } }],
      },
      Position: {
        rich_text: [{ text: { content: title } }],
      },
      Stage: {
        status: { name: "Ready to apply" },
      },
      "Posting URL": {
        url: url,
      },
      "Due Date": {
        date: {
          start:
            new Date().toISOString().split("T")[0] || new Date().toISOString(),
        },
      },
    };

    if (!database?.id) {
      throw new Error("Database ID is undefined");
    }

    const response = await addJobToDatabase(database?.id, pageData);
    console.log("New row added:", response);
    res.send({ success: true, data: response });
  } catch (error) {
    console.error("Error adding new row:", error);
    res.send({ success: false, error: error });
  }
};

export default handler;
