import { Interaction } from "discord.js";
import myClient from "./client";

export type MyInteraction = Interaction & {
  client: myClient;
};
