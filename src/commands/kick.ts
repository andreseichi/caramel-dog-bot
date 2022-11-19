import {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  PermissionFlagsBits,
} from "discord.js";

export const data = new SlashCommandBuilder()
  .setName("kick")
  .setDescription("Select a member to kick!")
  .setDefaultMemberPermissions(
    PermissionFlagsBits.BanMembers | PermissionFlagsBits.KickMembers
  )
  .setDMPermission(false)
  .addUserOption((option) =>
    option
      .setName("target")
      .setDescription("The member to kick")
      .setRequired(true)
  )
  .addStringOption((option) =>
    option.setName("reason").setDescription("The reason for kicking the member")
  )
  .addAttachmentOption((option) =>
    option
      .setName("attachment")
      .setDescription("Optional attachment to send to the kicked member")
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const target = interaction.options.getUser("target");
  if (!target) return await interaction.reply("No target provided!");

  const reason =
    interaction.options.getString("reason") ?? "No reason provided";
  const attachment = interaction.options.getAttachment("attachment");

  if (interaction.inCachedGuild()) {
    const member = await interaction.guild.members
      .fetch(target.id)
      .catch((err) => {
        return err.code;
      });
    if (member === 10007) {
      return await interaction.reply(`User ${target} is not in the server!`);
    }

    if (target === interaction.user) {
      return await interaction.reply("Do you really want to kick yourself!?");
    }

    if (!interaction.guild.members.cache.get(target.id)?.bannable) {
      return await interaction.reply(
        `I do not have permission to kick ${target}!`
      );
    }

    await interaction.reply(`Kicking ${target} for reason: ${reason}`);
    await interaction.guild.members.kick(target, reason);
    await target.send({
      content: `You were kicked from the server: ${interaction.guild.name} for reason: ${reason}`,
      files: attachment ? [attachment] : [],
    });
  }
}
