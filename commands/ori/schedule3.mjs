import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule-any')
  .setDescription('今日の日付から任意の日数入力')
  .addIntegerOption(option =>
    option.setName('days')
      .setDescription('何日入力する？（例: 5）')
      .setRequired(true)
  );

export async function execute(interaction) {
  const days = interaction.options.getInteger('days');
  const now = new Date();
  now.setHours(now.getHours() + 9); // JST調整

  const weekdays = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];

  for (let i = 0; i < days; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i);

    const weekday = weekdays[date.getDay()];
    const dateString = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${weekday}`;

    const msg = await interaction.channel.send(dateString);

    await msg.react("⭕");
    await msg.react("❌");
    await msg.react("🔺");
    await msg.react("❓");
  }

  await interaction.channel.send('@everyone n交流戦日程⭕❌してほしいでありんす');
}
