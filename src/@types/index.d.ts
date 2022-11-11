import { PermissionString, SlashCommandBuilder } from "discord.js";

export interface ApplicationCommandModule {
  readonly execute: (args?: any) => any;
  readonly data: SlashCommandBuilder;
}
