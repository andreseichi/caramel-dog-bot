import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";

const stringChoices = [
  {
    name: "Hello",
    value: "Hello",
  },
  {
    name: "World",
    value: "World",
  },
];

export const data = new SlashCommandBuilder()
  .setName("echo")
  .setDescription("Replies with your input!")
  .addStringOption((option) =>
    option
      .setName("input")
      .setDescription("The input to echo back")
      .setRequired(true)
      .addChoices(...stringChoices)
  )
  .addChannelOption((option) =>
    option
      .setName("channel")
      .setDescription("The channel to echo into")
      .setRequired(true)
  )
  .addAttachmentOption((option) =>
    option
      .setName("attachment")
      .setDescription("The attachment to echo back")
      .setRequired(true)
  )
  .addBooleanOption((option) =>
    option
      .setName("ephemeral")
      .setDescription("Whether the message should be ephemeral")
  );

export async function execute(interaction: ChatInputCommandInteraction) {
  const isEphemeral = interaction.options.getBoolean("ephemeral");
  const attachment = interaction.options.getAttachment("attachment");

  if (isEphemeral) {
    return await interaction.reply({
      content: `You said: ${interaction.options.getString(
        "input"
      )} and you want to echo it in ${interaction.options.getChannel(
        "channel"
      )} in secret with the attachment ${attachment?.name} and the url ${
        attachment?.url
      }`,
      ephemeral: true,
    });
  }

  await interaction.reply(
    `You said: ${interaction.options.getString(
      "input"
    )} and you want to echo it in ${interaction.options.getChannel(
      "channel"
    )} with the attachment ${attachment?.name} and the url ${attachment?.url}`
  );
}
