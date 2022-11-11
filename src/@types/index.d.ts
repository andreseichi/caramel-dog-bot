import { PermissionString } from "discord.js";

export type ApplicationCommandOptionChoice = {
  readonly name: string;
  readonly value: string | number;
};

export type ApplicationCommandOption = {
  readonly type: number;
  readonly name: string;
  readonly description: string;
  readonly required?: boolean;
  readonly choices?: Array<ApplicationCommandOptionChoice>;
  readonly options?: Array<ApplicationCommandOption>;
};

export interface ApplicationCommandModule {
  readonly name: string;
  readonly description: string;
  readonly options?: Array<ApplicationCommandOption>;
  readonly default_permission?: boolean;
  readonly permissions: PermissionString = "SEND_MESSAGES";
  readonly usage: string;
  readonly devOnly?: boolean;
  readonly execute: (args?: Array<T>) => any;
}
