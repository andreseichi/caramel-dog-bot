import dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import myClient from "./@types/client";

import { readdirSync } from "fs";
import { join } from "path";

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
}) as myClient;

client.commands = new Collection();

const commandFiles = readdirSync(join(__dirname, "commands")).filter((file) =>
  file.endsWith(".ts")
);

for (const file of commandFiles) {
  // const command = join(__dirname, "commands", `${file}`);
  // client.commands.set(command.name, command);
}

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);
