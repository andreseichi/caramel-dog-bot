import { SlashCommandBuilder, CommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("secret")
  .setDescription("Only you can see it!");

export async function execute(interaction: CommandInteraction) {
  await interaction.reply({
    content: "This is a secret message!",
    ephemeral: true,
  });
}
