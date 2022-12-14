import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("deferred")
  .setDescription("I will reply to you after a time!");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.deferReply();
  setTimeout(async () => {
    await interaction.editReply("I thinked about it, and this is my answer!");
  }, 5000);
}
