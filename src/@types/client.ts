import { Client, ClientOptions, Collection } from "discord.js";
import { ApplicationCommandModule } from ".";

export default class myClient extends Client {
  public commands: Collection<string, ApplicationCommandModule>;

  constructor(options: ClientOptions) {
    super(options);
    this.commands = new Collection();
  }
}
