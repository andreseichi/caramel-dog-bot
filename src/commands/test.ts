import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("test")
  .setDescription("Test command.");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply("tested!");
}
