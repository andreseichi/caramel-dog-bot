import dotenv from "dotenv";
dotenv.config();

import { Client, Collection, Events, GatewayIntentBits } from "discord.js";
import { ApplicationCommandModule } from "./@types";
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

client.once(Events.ClientReady, (c) => {
  console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  console.log(interaction);
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);
  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
});

client.login(process.env.DISCORD_TOKEN);
