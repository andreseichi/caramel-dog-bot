import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("user")
  .setDescription("Provides information about the user.");

export async function execute(interaction: ChatInputCommandInteraction) {
  if (interaction.inCachedGuild()) {
    await interaction.reply(
      `Your username: ${interaction.user}\nYour ID: ${interaction.user.id}\nServer name: ${interaction.guild.name}\nGuild ID: ${interaction.guildId}`
    );
  } else {
    await interaction.reply(
      `Your username: ${interaction.user}\nYour ID: ${interaction.user.id}`
    );
  }
}
