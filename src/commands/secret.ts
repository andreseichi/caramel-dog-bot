import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("secret")
  .setDescription("Only you can see it!");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply({
    content: "This is a secret message!",
    ephemeral: true,
  });
}
