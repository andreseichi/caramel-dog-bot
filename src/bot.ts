import dotenv from "dotenv";
dotenv.config();

import { Client, Collection, GatewayIntentBits } from "discord.js";
import { ApplicationCommandModule, ApplicationEventModule } from "./@types";
import myClient from "./@types/client";

import { readdirSync } from "fs";
import { join } from "path";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as myClient;
client.commands = new Collection();

// command handler
const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) =>
  file.endsWith(".ts")
);

for (const file of commandFiles) {
  const filePath = join(__dirname, "commands", `${file}`);
  const command: ApplicationCommandModule = require(filePath);

  if ("data" in command && "execute" in command) {
    client.commands.set(command.data.name, command);
  } else {
    console.log(
      `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
    );
  }
}

// event handler
const eventFiles = readdirSync(join(__dirname, "events")).filter((file) =>
  file.endsWith(".ts")
);

for (const file of eventFiles) {
  const filePath = join(__dirname, "events", `${file}`);
  const event: ApplicationEventModule = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

client.login(process.env.DISCORD_TOKEN);
