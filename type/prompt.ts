import { UserType } from "./user";

export type PromptType = {
  _id: string;
  prompt: string;
  tag: string;
  creator: UserType;
};
