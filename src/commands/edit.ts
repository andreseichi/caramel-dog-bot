import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("edit")
  .setDescription("I will edit that message after a time!");

export async function execute(interaction: ChatInputCommandInteraction) {
  await interaction.reply("This is a normal message!");
  setTimeout(async () => {
    await interaction.editReply("This message has been edited!");
  }, 5000);
}
