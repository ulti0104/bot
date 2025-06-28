import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule-tomorrow')
  .setDescription('明日の日付から入力');

export async function execute(interaction) {
  const now = new Date();
  now.setHours(now.getHours() + 9); // JST対応

  const arr = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];

  const messages = [];

  for (let i = 1; i <= 7; i++) {
    const date = new Date(now);
    date.setDate(now.getDate() + i); // 明日から開始

    const youbi = arr[date.getDay()];
    const formatted = `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日${youbi}`;

    const sentMessage = await interaction.channel.send(formatted);
    messages.push(sentMessage);

    await sentMessage.react("⭕");
    await sentMessage.react("❌");
    await sentMessage.react("🔺");
    await sentMessage.react("❓");
  }

  await interaction.channel.send('@everyone \n交流戦日程⭕❌してほしいでありんす');
}
