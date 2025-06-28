// commands/samples/schedule.mjs
import { SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
  .setName('schedule-today')
  .setDescription('今日の日付から入力');

export async function execute(interaction) {
  const now = new Date();
  now.setHours(now.getHours() + 9); // JST

  const arr = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];

  // 📅 今日から7日分の日付を送信＋リアクション
  for (let i = 0; i < 7; i++) {
    const future = new Date(now);
    future.setDate(now.getDate() + i);

    const dateStr =
      future.getFullYear() +
      "年" +
      (future.getMonth() + 1) +
      "月" +
      future.getDate() +
      "日" +
      arr[future.getDay()];

    const sentMsg = await interaction.channel.send(dateStr);

    // ⭕❌🔺❓リアクションを付ける
    await sentMsg.react("⭕");
    await sentMsg.react("❌");
    await sentMsg.react("🔺");
    await sentMsg.react("❓");
  }

  // 🔔 案内メッセージ
  const finalMsg = await interaction.channel.send("@everyone \n交流戦日程にリアクションをお願いします！");
 
}
