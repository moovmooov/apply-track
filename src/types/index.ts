export interface UserData {
  access_token: string;
  bot_id: string;
  duplicated_template_id: string;
  owner: {
    type: string;
    user: {
      name: string;
      avatar_url: string;
    };
  };
  workspace_name: string;
  workspace_icon: string;
}

export interface Database {
  id: string;
  url: string;
}

export interface PageData {
  Company: {
    title: { text: { content: string } }[];
  };
  Position: {
    rich_text: { text: { content: string } }[];
  };
  Stage: {
    status: { name: string };
  };
  "Posting URL": {
    url: string;
  };
  "Due Date": {
    date: { start: string };
  };
}

export type ButtonStatusProps =
  | "default"
  | "disabled"
  | "loading"
  | "added"
  | "error";

export interface ButtonState {
  text: string;
  status: ButtonStatusProps;
}

export interface JobInfo {
  title: string;
  company: string;
  url: string;
}
