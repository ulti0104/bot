export default async (interaction) => {
  if (!interaction.isCommand()) return;

  await interaction.deferReply(); // 

  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    return interaction.editReply({ content: "コマンドが見つかりませんでした。" });
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.editReply({ content: "エラーが発生しました。" });
  }
};
