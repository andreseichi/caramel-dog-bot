import { SlashCommandBuilder } from "discord.js";

export interface ApplicationCommandModule {
  readonly execute: (args?: any) => any;
  readonly data: SlashCommandBuilder;
}

export interface ApplicationEventModule {
  readonly execute: (args?: any) => any;
  readonly name: string;
  readonly once?: boolean;
}
